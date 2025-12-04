/**
 * Sandboxed document.cookie Proxy
 * Source: module_448763 (Lines 36,200-36,306)
 *
 * Provides a sandboxed cookie implementation that isolates preview cookies
 * from the parent window. Supports Next.js middleware cookie manipulation.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Parsed cookie object
 */
interface ParsedCookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Cookie document interface
 */
interface CookieDocument {
  cookie: string;
}

// ============================================================================
// Cookie Storage
// ============================================================================

/**
 * In-memory cookie storage
 * Maps cookie names to their values and attributes
 */
const cookieStore = new Map<string, ParsedCookie>();

// ============================================================================
// Cookie Parsing
// ============================================================================

/**
 * Parse a cookie string into name-value pairs
 *
 * @param cookieString - Cookie string from document.cookie
 * @returns Array of parsed cookies
 */
function parseCookieString(cookieString: string): ParsedCookie[] {
  if (!cookieString || cookieString.trim() === "") {
    return [];
  }

  const cookies: ParsedCookie[] = [];
  const pairs = cookieString.split(";");

  for (const pair of pairs) {
    const trimmed = pair.trim();
    if (!trimmed) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) {
      // Cookie without value
      cookies.push({
        name: trimmed,
        value: "",
      });
    } else {
      const name = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();

      cookies.push({
        name,
        value,
      });
    }
  }

  return cookies;
}

/**
 * Parse a Set-Cookie header value
 * Includes attributes like path, domain, expires, etc.
 *
 * @param setCookieValue - Set-Cookie header value
 * @returns Parsed cookie with attributes
 */
function parseSetCookie(setCookieValue: string): ParsedCookie | null {
  if (!setCookieValue || setCookieValue.trim() === "") {
    return null;
  }

  const parts = setCookieValue.split(";").map((p) => p.trim());
  const firstPart = parts[0];
  const eqIndex = firstPart.indexOf("=");

  if (eqIndex === -1) {
    return null;
  }

  const cookie: ParsedCookie = {
    name: firstPart.substring(0, eqIndex).trim(),
    value: firstPart.substring(eqIndex + 1).trim(),
  };

  // Parse attributes
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const attrEqIndex = part.indexOf("=");

    if (attrEqIndex === -1) {
      // Boolean attribute
      const attrName = part.toLowerCase();
      if (attrName === "secure") {
        cookie.secure = true;
      } else if (attrName === "httponly") {
        cookie.httpOnly = true;
      }
    } else {
      // Key-value attribute
      const attrName = part.substring(0, attrEqIndex).trim().toLowerCase();
      const attrValue = part.substring(attrEqIndex + 1).trim();

      switch (attrName) {
        case "path":
          cookie.path = attrValue;
          break;
        case "domain":
          cookie.domain = attrValue;
          break;
        case "expires":
          cookie.expires = new Date(attrValue);
          break;
        case "max-age":
          cookie.maxAge = parseInt(attrValue, 10);
          break;
        case "samesite":
          const sameSite = attrValue.toLowerCase();
          if (
            sameSite === "strict" ||
            sameSite === "lax" ||
            sameSite === "none"
          ) {
            cookie.sameSite = (sameSite.charAt(0).toUpperCase() +
              sameSite.slice(1)) as "Strict" | "Lax" | "None";
          }
          break;
      }
    }
  }

  return cookie;
}

// ============================================================================
// Cookie Serialization
// ============================================================================

/**
 * Serialize cookies to document.cookie format
 * Returns only name=value pairs (no attributes)
 *
 * @returns Cookie string
 */
function serializeCookies(): string {
  const now = Date.now();
  const validCookies: string[] = [];

  cookieStore.forEach((cookie) => {
    // Check if cookie is expired
    if (cookie.expires && cookie.expires.getTime() < now) {
      return;
    }

    if (cookie.maxAge !== undefined && cookie.maxAge <= 0) {
      return;
    }

    // Add to valid cookies
    validCookies.push(`${cookie.name}=${cookie.value}`);
  });

  return validCookies.join("; ");
}

/**
 * Serialize a single cookie with all attributes
 * Used for Set-Cookie header format
 *
 * @param cookie - Cookie to serialize
 * @returns Set-Cookie header value
 */
function serializeSetCookie(cookie: ParsedCookie): string {
  let result = `${cookie.name}=${cookie.value}`;

  if (cookie.path) {
    result += `; Path=${cookie.path}`;
  }

  if (cookie.domain) {
    result += `; Domain=${cookie.domain}`;
  }

  if (cookie.expires) {
    result += `; Expires=${cookie.expires.toUTCString()}`;
  }

  if (cookie.maxAge !== undefined) {
    result += `; Max-Age=${cookie.maxAge}`;
  }

  if (cookie.secure) {
    result += "; Secure";
  }

  if (cookie.httpOnly) {
    result += "; HttpOnly";
  }

  if (cookie.sameSite) {
    result += `; SameSite=${cookie.sameSite}`;
  }

  return result;
}

// ============================================================================
// Cookie Operations
// ============================================================================

/**
 * Set a cookie from a Set-Cookie header value
 *
 * @param setCookieValue - Set-Cookie header value
 */
function setCookie(setCookieValue: string): void {
  const cookie = parseSetCookie(setCookieValue);

  if (!cookie) {
    return;
  }

  // Handle deletion (Max-Age=0 or Expires in past)
  if (
    cookie.maxAge === 0 ||
    (cookie.expires && cookie.expires.getTime() < Date.now())
  ) {
    cookieStore.delete(cookie.name);
    return;
  }

  // Store cookie
  cookieStore.set(cookie.name, cookie);
}

/**
 * Set multiple cookies from document.cookie format
 *
 * @param cookieString - Cookie string (name=value; name2=value2)
 */
function setCookiesFromString(cookieString: string): void {
  const cookies = parseCookieString(cookieString);

  cookies.forEach((cookie) => {
    // Simple cookies without attributes
    cookieStore.set(cookie.name, cookie);
  });
}

/**
 * Get cookie value by name
 *
 * @param name - Cookie name
 * @returns Cookie value or undefined
 */
function getCookie(name: string): string | undefined {
  const cookie = cookieStore.get(name);

  if (!cookie) {
    return undefined;
  }

  // Check if expired
  if (cookie.expires && cookie.expires.getTime() < Date.now()) {
    cookieStore.delete(name);
    return undefined;
  }

  if (cookie.maxAge !== undefined && cookie.maxAge <= 0) {
    cookieStore.delete(name);
    return undefined;
  }

  return cookie.value;
}

/**
 * Delete a cookie by name
 *
 * @param name - Cookie name
 */
function deleteCookie(name: string): void {
  cookieStore.delete(name);
}

/**
 * Clear all cookies
 */
function clearCookies(): void {
  cookieStore.clear();
}

// ============================================================================
// Sandboxed Cookie Document
// ============================================================================

/**
 * Create sandboxed cookie document
 * Mimics document.cookie getter/setter behavior
 *
 * @returns Cookie document object
 */
function createCookieDocument(): CookieDocument {
  return {
    get cookie(): string {
      return serializeCookies();
    },

    set cookie(value: string) {
      if (typeof value !== "string") {
        return;
      }

      // Handle Set-Cookie format (with attributes)
      if (value.includes(";")) {
        const firstSemicolon = value.indexOf(";");
        const firstPart = value.substring(0, firstSemicolon);

        // Check if it looks like Set-Cookie format
        if (
          value.toLowerCase().includes("path=") ||
          value.toLowerCase().includes("domain=") ||
          value.toLowerCase().includes("expires=") ||
          value.toLowerCase().includes("max-age=") ||
          value.toLowerCase().includes("secure") ||
          value.toLowerCase().includes("httponly") ||
          value.toLowerCase().includes("samesite=")
        ) {
          // Parse as Set-Cookie
          setCookie(value);
          return;
        }
      }

      // Parse as simple cookie string
      setCookiesFromString(value);
    },
  };
}

// ============================================================================
// Global Cookie Document
// ============================================================================

/**
 * Sandboxed cookie document instance
 * Replaces document.cookie in compiled code
 */
export const __v0_cookie_doc = createCookieDocument();

// ============================================================================
// Installation
// ============================================================================

/**
 * Install sandboxed cookie document as global
 * Makes __v0_cookie_doc available globally
 */
export function installCookieDocument(): void {
  if (typeof window === "undefined") return;

  try {
    // Install as global
    (window as any).__v0_cookie_doc = __v0_cookie_doc;

    // Also expose on globalThis
    if (typeof globalThis !== "undefined") {
      (globalThis as any).__v0_cookie_doc = __v0_cookie_doc;
    }
  } catch (error) {
    console.error("[v0] Failed to install cookie document:", error);
  }
}

/**
 * Check if cookie document is installed
 *
 * @returns True if installed
 */
export function isCookieDocumentInstalled(): boolean {
  return typeof window !== "undefined" && "__v0_cookie_doc" in window;
}

// ============================================================================
// Middleware Support
// ============================================================================

/**
 * Apply cookies from middleware response headers
 * Handles x-middleware-set-cookie header
 *
 * @param headers - Response headers from middleware
 */
export function applyCookiesFromMiddleware(headers: Headers): void {
  const setCookieHeader = headers.get("x-middleware-set-cookie");

  if (setCookieHeader) {
    // Can be multiple cookies separated by comma
    const cookies = setCookieHeader.split(",").map((c) => c.trim());

    cookies.forEach((cookie) => {
      setCookie(cookie);
    });
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all cookies as an object
 *
 * @returns Object with cookie names as keys
 */
export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieStore.forEach((cookie, name) => {
    // Check if expired
    if (cookie.expires && cookie.expires.getTime() < Date.now()) {
      return;
    }

    if (cookie.maxAge !== undefined && cookie.maxAge <= 0) {
      return;
    }

    cookies[name] = cookie.value;
  });

  return cookies;
}

/**
 * Get all cookies with full details
 *
 * @returns Array of parsed cookies
 */
export function getAllCookieDetails(): ParsedCookie[] {
  return Array.from(cookieStore.values());
}

/**
 * Set cookie state for testing
 *
 * @param cookies - Cookies to set
 */
export function setCookieState(cookies: Record<string, string>): void {
  cookieStore.clear();

  Object.entries(cookies).forEach(([name, value]) => {
    cookieStore.set(name, { name, value });
  });
}

/**
 * Export cookie state for debugging
 *
 * @returns Array of [name, cookie] tuples
 */
export function exportCookieState(): Array<[string, ParsedCookie]> {
  return Array.from(cookieStore.entries());
}

// ============================================================================
// Type Augmentation
// ============================================================================

declare global {
  interface Window {
    __v0_cookie_doc: CookieDocument;
  }

  var __v0_cookie_doc: CookieDocument;
}

export type { ParsedCookie, CookieDocument };
