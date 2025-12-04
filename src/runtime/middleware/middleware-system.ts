/**
 * Middleware System
 * Source: module_448763 (Lines 708-792)
 *
 * Next.js middleware support with cookie handling, request/response transformations,
 * header overrides, rewrites, and redirects.
 */

import { isFeatureEnabled } from "../../compiler/features/featureFlags";
import { executeInServerContext } from "../context/execution-context";

// ============================================================================
// Types
// ============================================================================

/**
 * Middleware configuration
 */
export interface MiddlewareConfig {
  /** Path matcher configuration */
  matcher?: string | string[];
  /** Other middleware config options */
  [key: string]: unknown;
}

/**
 * Middleware handler function
 */
export type MiddlewareHandler = (
  request: Request
) => Response | Promise<Response | undefined> | undefined;

/**
 * Middleware module exports
 */
export interface MiddlewareModule {
  /** Main middleware handler */
  middleware?: MiddlewareHandler;
  /** Alternative export name */
  proxy?: MiddlewareHandler;
  /** Default export */
  default?: MiddlewareHandler;
  /** Middleware configuration */
  config?: MiddlewareConfig;
}

/**
 * Loaded middleware state
 */
interface LoadedMiddleware {
  /** Middleware configuration */
  config?: MiddlewareConfig;
  /** Middleware handler function */
  handler: MiddlewareHandler;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * HTTP redirect status codes
 * Used to detect redirect responses from middleware
 */
const REDIRECT_STATUS_CODES = new Set([301, 302, 303, 307, 308]);

// ============================================================================
// State
// ============================================================================

/**
 * Currently loaded middleware
 * Null if no middleware is loaded
 */
let loadedMiddleware: LoadedMiddleware | null = null;

// ============================================================================
// Cookie Handling
// ============================================================================

/**
 * Apply cookies from middleware response
 * Reads x-middleware-set-cookie header and updates document.cookie
 *
 * @param response - Middleware response
 */
function applyCookiesFromMiddleware(response: Response): void {
  const setCookieHeader = response.headers.get("x-middleware-set-cookie");

  if (setCookieHeader) {
    // Update sandboxed cookie document
    if (typeof window !== "undefined" && (window as any).__v0_cookie_doc) {
      (window as any).__v0_cookie_doc.cookie = setCookieHeader;
    }
  }
}

// ============================================================================
// Header Management
// ============================================================================

/**
 * Merge middleware response headers with request headers
 * Handles x-middleware-override-headers and x-middleware-request-* headers
 *
 * @param originalRequest - Original request
 * @param middlewareResponse - Middleware response
 * @returns Merged headers
 */
function mergeMiddlewareHeaders(
  originalRequest: Request,
  middlewareResponse: Response
): Headers {
  const overrideHeadersValue = middlewareResponse.headers.get(
    "x-middleware-override-headers"
  );
  const mergedHeaders = new Headers(originalRequest.headers);

  // Copy non-middleware headers from response to request
  for (const [key, value] of middlewareResponse.headers.entries()) {
    if (
      key !== "x-middleware-override-headers" &&
      key !== "x-middleware-set-cookie" &&
      !key.startsWith("x-middleware-request-")
    ) {
      mergedHeaders.set(key, value);
    }
  }

  // Handle header overrides
  if (overrideHeadersValue) {
    const headersToOverride = overrideHeadersValue.split(",");

    for (const headerName of headersToOverride) {
      if (headerName) {
        const overrideValue = middlewareResponse.headers.get(
          `x-middleware-request-${headerName}`
        );
        mergedHeaders.set(headerName, overrideValue || "");
        originalRequest.headers.set(headerName, overrideValue || "");
      }
    }
  }

  // Set request headers from middleware (if function exists)
  if (
    typeof (globalThis as any).setRequestHeadersFromMiddleware === "function"
  ) {
    (globalThis as any).setRequestHeadersFromMiddleware(mergedHeaders);
  }

  return mergedHeaders;
}

// ============================================================================
// Middleware Loading
// ============================================================================

/**
 * Load middleware from a module
 * Extracts the handler function and configuration
 *
 * @param moduleEntry - Module entry point (file path or module object)
 */
export async function loadMiddleware(
  moduleEntry: string | MiddlewareModule
): Promise<void> {
  // Check if middleware feature is enabled
  if (!isFeatureEnabled("middleware")) {
    return;
  }

  // Import the module if it's a string path
  let middlewareModule: MiddlewareModule;
  if (typeof moduleEntry === "string") {
    // Dynamic import would happen here
    // For now, we'll assume it's already imported
    middlewareModule = (await import(moduleEntry)) as MiddlewareModule;
  } else {
    middlewareModule = moduleEntry;
  }

  // Extract handler (try different export names)
  const handler =
    middlewareModule.proxy ||
    middlewareModule.middleware ||
    middlewareModule.default;

  if (handler) {
    loadedMiddleware = {
      config: middlewareModule.config,
      handler,
    };
  }
}

/**
 * Get the currently loaded middleware
 *
 * @returns Loaded middleware or null
 */
export function getLoadedMiddleware(): LoadedMiddleware | null {
  return loadedMiddleware;
}

/**
 * Clear the loaded middleware
 */
export function clearMiddleware(): void {
  loadedMiddleware = null;
}

// ============================================================================
// Middleware Execution
// ============================================================================

/**
 * Execute middleware for a request
 * Handles cookie synchronization, header merging, rewrites, and redirects
 *
 * @param request - Original request
 * @returns Modified request, Response, or undefined
 */
export async function executeMiddleware(
  request: Request
): Promise<Request | Response | undefined> {
  // Initialize middleware headers (if function exists)
  if (typeof (globalThis as any).getInitialMiddlewareHeaders === "function") {
    const initialHeaders = (globalThis as any).getInitialMiddlewareHeaders();
    if (
      typeof (globalThis as any).setRequestHeadersFromMiddleware === "function"
    ) {
      (globalThis as any).setRequestHeadersFromMiddleware(initialHeaders);
    }
  }

  // No middleware loaded
  if (!loadedMiddleware) {
    return undefined;
  }

  // Create NextRequest wrapper (if available)
  let middlewareRequest: any;
  if (typeof (globalThis as any).NextRequest !== "undefined") {
    const NextRequest = (globalThis as any).NextRequest;
    middlewareRequest = new NextRequest(request.clone());

    // Clear and sync cookies
    middlewareRequest.cookies.clear();

    // Get cookies from RequestCookie (if available)
    if (typeof (globalThis as any).RequestCookie !== "undefined") {
      const RequestCookie = (globalThis as any).RequestCookie;
      const cookieStore = new RequestCookie();

      for (const cookie of cookieStore.getAll()) {
        middlewareRequest.cookies.set(cookie.name, cookie.value);
      }
    }
  } else {
    // Fallback to regular Request
    middlewareRequest = request.clone();
  }

  // Execute middleware in server context
  const middlewareResponse = await executeInServerContext(() =>
    loadedMiddleware!.handler(middlewareRequest)
  );

  // No response from middleware
  if (!middlewareResponse) {
    return undefined;
  }

  // Merge headers
  const mergedHeaders = mergeMiddlewareHeaders(request, middlewareResponse);

  // Handle rewrite
  const rewriteUrl = middlewareResponse.headers.get("x-middleware-rewrite");
  if (rewriteUrl) {
    return new Request(rewriteUrl, {
      method: request.method,
      headers: mergedHeaders,
      body: request.body,
      // @ts-ignore - duplex is needed for streaming
      duplex: "half",
    });
  }

  // Handle next (continue with modified headers)
  if (middlewareResponse.headers.get("x-middleware-next") === "1") {
    applyCookiesFromMiddleware(middlewareResponse);
    return undefined;
  }

  // Handle redirect
  if (REDIRECT_STATUS_CODES.has(middlewareResponse.status)) {
    const location = middlewareResponse.headers.get("location");

    if (location) {
      applyCookiesFromMiddleware(middlewareResponse);

      // Trigger navigation (if function exists)
      if (typeof (globalThis as any).relocationWhileBlocking === "function") {
        (globalThis as any).relocationWhileBlocking(location, mergedHeaders);
      }

      // Return redirect response
      return new Response(null, {
        status: middlewareResponse.status,
        headers: {
          Location: location,
        },
      });
    }
  }

  // Return the middleware response as-is
  return middlewareResponse;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if middleware is loaded
 *
 * @returns True if middleware is loaded
 */
export function hasMiddleware(): boolean {
  return loadedMiddleware !== null;
}

/**
 * Get middleware configuration
 *
 * @returns Middleware config or undefined
 */
export function getMiddlewareConfig(): MiddlewareConfig | undefined {
  return loadedMiddleware?.config;
}

/**
 * Check if a path matches middleware matcher
 *
 * @param path - Request path
 * @param config - Middleware configuration
 * @returns True if path matches
 */
export function matchesMiddlewarePath(
  path: string,
  config?: MiddlewareConfig
): boolean {
  if (!config?.matcher) {
    return true; // No matcher means match all
  }

  const matchers = Array.isArray(config.matcher)
    ? config.matcher
    : [config.matcher];

  for (const matcher of matchers) {
    // Simple glob matching (can be enhanced)
    const regex = new RegExp(
      "^" + matcher.replace(/\*/g, ".*").replace(/\?/g, ".") + "$"
    );

    if (regex.test(path)) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// Exports
// ============================================================================

export default {
  loadMiddleware,
  executeMiddleware,
  getLoadedMiddleware,
  clearMiddleware,
  hasMiddleware,
  getMiddlewareConfig,
  matchesMiddlewarePath,
  applyCookiesFromMiddleware,
  mergeMiddlewareHeaders,
};
