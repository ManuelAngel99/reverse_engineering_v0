/**
 * Navigation and Module Loading Utilities
 *
 * Provides functions for module entry loading, navigation blocking,
 * URL resolution, and CDN detection.
 */

import { ESMSH_BASE_URL } from "../modules/constants";

// Type for importShim global
interface ImportShim {
  (specifier: string): Promise<any>;
  _r?: Record<string, { b: string }>;
}

declare global {
  interface Window {
    importShim?: ImportShim;
  }
  const importShim: ImportShim | undefined;
}

// Blob URL to module name mapping
const blobToModuleName: Record<string, string> = {};

/**
 * Import a module entry point with server layer suffix
 * @param modulePath - Path to the module to import
 * @returns Promise resolving to the imported module
 */
export function importEntry(modulePath: string): Promise<any> {
  if (!window.importShim) {
    throw new Error("importShim is not available");
  }
  return window.importShim(modulePath + "?server_layer");
}

/**
 * Check if a URL is from a CDN (esm.sh)
 * @param url - URL to check
 * @returns True if the URL is from a CDN
 */
export function isFromCDN(url: string): boolean {
  return url.startsWith(ESMSH_BASE_URL);
}

/**
 * Find the original module name from a blob URL or CDN URL
 * @param url - URL to resolve
 * @param keepLayer - Whether to keep the server/client layer suffix
 * @returns Original module name
 */
export function findOriginalModuleNameFromURL(
  url: string,
  keepLayer: boolean = false
): string {
  if (!window.importShim) {
    return url;
  }

  let result = url;

  // Check if we have a cached mapping for this URL
  if (blobToModuleName[url]) {
    result = blobToModuleName[url];
  }
  // If it's a blob URL, try to find the original module name
  else if (url.startsWith("blob:") && window.importShim._r) {
    for (const [moduleName, moduleData] of Object.entries(
      window.importShim._r
    )) {
      if (moduleData.b === url) {
        const cachedName = blobToModuleName[moduleName];
        if (cachedName) {
          blobToModuleName[url] = cachedName;
          result = cachedName;
        } else {
          result = moduleName;
        }
        break;
      }
    }
  }

  // Clean up CDN URLs to extract package name
  result = cleanCDNUrl(result);

  // Remove @v0/ prefix
  result = result.replace(/^@v0\//, "/");

  // Remove layer suffix unless explicitly requested
  if (!keepLayer) {
    result = result.replace(/\?(server|client)_layer$/, "");
  }

  return result;
}

/**
 * Clean up CDN URLs to extract the package name
 * @param url - URL to clean
 * @returns Cleaned package name
 */
function cleanCDNUrl(url: string): string {
  if (isFromCDN(url)) {
    const isEsmSh = url.startsWith(ESMSH_BASE_URL);
    try {
      const pathParts = new URL(url).pathname.split("/").filter(Boolean);

      // Skip the first part if not esm.sh (for other CDNs)
      if (pathParts.length >= 4 && (isEsmSh || pathParts.shift())) {
        // Handle scoped packages (@org/package) vs regular packages
        const packageName = pathParts[0]?.startsWith("@")
          ? pathParts.slice(0, 2).join("/")
          : pathParts[0];

        // Remove version suffix (e.g., package@1.0.0 -> package)
        return packageName.replace(/(.)@.*/, "$1");
      }
    } catch {
      // If URL parsing fails, return original
    }
  }
  return url;
}

/**
 * Get the module name from a blob URL
 * @param blobUrl - Blob URL to look up
 * @returns Module name if found, undefined otherwise
 */
export function getModuleNameFromBlob(blobUrl: string): string | undefined {
  if (!window.importShim || blobToModuleName[blobUrl]) {
    return blobToModuleName[blobUrl];
  }

  if (blobUrl.startsWith("blob:") && window.importShim._r) {
    for (const [moduleName, moduleData] of Object.entries(
      window.importShim._r
    )) {
      if (moduleData.b === blobUrl) {
        const cachedName = blobToModuleName[moduleName];
        if (cachedName) {
          blobToModuleName[blobUrl] = cachedName;
          return cachedName;
        }
      }
    }
  }
  return undefined;
}

/**
 * Register a blob URL to module name mapping
 * @param blobUrl - Blob URL
 * @param moduleName - Original module name
 */
export function registerBlobToModuleName(
  blobUrl: string,
  moduleName: string
): void {
  blobToModuleName[blobUrl] = moduleName;
}

// Navigation blocking state
let isNavigationBlocked = false;

/**
 * Check if navigation is currently blocked
 * @returns True if navigation is blocked
 */
export function getIsNavigationBlocked(): boolean {
  return isNavigationBlocked;
}

/**
 * Perform a navigation while blocking further navigation
 * Used for middleware redirects to prevent race conditions
 * @param url - URL to navigate to
 * @param headers - Optional headers to store in sessionStorage
 */
export function relocationWhileBlocking(url: string, headers?: Headers): void {
  // Set the blocking flag
  isNavigationBlocked = true;

  // Navigate to the new URL
  window.location.href = url;

  // Hide the body to prevent flashing during navigation
  document.body.style.visibility = "hidden";

  // Store headers in sessionStorage if provided (for middleware)
  if (headers) {
    const headerObj: Record<string, string> = {};
    for (const [key, value] of headers.entries()) {
      headerObj[key] = value;
    }
    try {
      sessionStorage.setItem("__v0_init_headers", JSON.stringify(headerObj));
    } catch {
      // Ignore sessionStorage errors
    }
  }
}

/**
 * Resolve a URL from a string or Request object
 * @param input - URL string or Request object
 * @param base - Base URL for relative URLs
 * @returns Resolved URL object
 */
export function resolveUrl(input: string | Request, base?: string | URL): URL {
  if (typeof input === "string") {
    return new URL(input, base);
  } else if (input instanceof Request) {
    return new URL(input.url, base);
  }
  return input as URL;
}
