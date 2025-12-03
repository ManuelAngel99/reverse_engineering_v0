/**
 * Utility Functions
 *
 * Common utility functions used across the v0 preview runtime system.
 */

// Import cn from the standard shadcn location
export { cn } from "@/lib/utils";

// ============================================================================
// Path Utilities
// ============================================================================

/**
 * Resolves a path relative to a base path
 */
export function resolvePath(...paths: string[]): string {
  // Simple implementation - would use path.resolve in Node.js
  return paths.filter(Boolean).reduce((acc, path) => {
    if (path.startsWith("/")) return path;
    if (acc.endsWith("/")) return acc + path;
    return acc + "/" + path;
  }, "");
}

/**
 * Gets the directory name from a path
 */
export function dirname(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return ".";
  if (lastSlash === 0) return "/";
  return path.slice(0, lastSlash);
}

/**
 * Joins path segments
 */
export function joinPath(...paths: string[]): string {
  return paths
    .filter(Boolean)
    .map((path, index) => {
      if (index === 0) return path;
      return path.replace(/^\/+/, "");
    })
    .join("/")
    .replace(/\/+/g, "/");
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Escapes a string for use in JSON
 */
export function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

/**
 * Checks if a value is a primitive
 */
export function isPrimitive(value: any): boolean {
  return Object(value) !== value;
}

// ============================================================================
// URL Utilities
// ============================================================================

/**
 * Checks if a URL is from a CDN
 */
export function isFromCDN(url: string): boolean {
  return (
    url.includes("esm.sh") ||
    url.includes("cdn.jsdelivr.net") ||
    url.includes("unpkg.com")
  );
}

/**
 * Checks if a URL is a blob or data URL
 */
export function isBlobOrDataURL(url: string): boolean {
  return url.startsWith("blob:") || url.startsWith("data:");
}

// ============================================================================
// Object Utilities
// ============================================================================

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
  if (obj instanceof Set) return new Set(Array.from(obj).map(deepClone)) as any;
  if (obj instanceof Map) {
    return new Map(
      Array.from(obj.entries()).map(([k, v]) => [deepClone(k), deepClone(v)])
    ) as any;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Checks if a value is non-nullable
 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

/**
 * Checks if a value is a promise
 */
export function isPromise<T = any>(value: any): value is Promise<T> {
  return value && typeof value === "object" && typeof value.then === "function";
}
