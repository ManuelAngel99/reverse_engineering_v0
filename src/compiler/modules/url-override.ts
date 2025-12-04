/**
 * URL Class Override
 * Source: module_448763 (Lines 2168-2189)
 *
 * Extends the native URL class to handle blob: URLs in import contexts.
 * When constructing URLs with blob: base URLs, resolves module names
 * through the import map to find original file paths.
 */

import { resolve, dirname } from "path";

// ============================================================================
// Types
// ============================================================================

// Note: Window.importShim is already declared in esm-shim-config.ts
// We use the same interface here for consistency

// ============================================================================
// Constants
// ============================================================================

/**
 * Pattern to match script file extensions
 */
const SCRIPT_EXTENSION_PATTERN = /\.(ts|tsx|js|jsx|mjs|cjs)$/i;

// ============================================================================
// Original URL Reference
// ============================================================================

/**
 * Store reference to the original URL class before overriding
 */
const OriginalURL = typeof window !== "undefined" ? window.URL : URL;

// ============================================================================
// V0 URL Class
// ============================================================================

/**
 * Extended URL class that handles blob: URLs in import contexts
 *
 * When a URL is constructed with a blob: base URL (common in dynamic imports),
 * this class looks up the blob URL in the import map to find the original
 * module path, then resolves the relative specifier against that path.
 */
export class V0URL extends OriginalURL {
  constructor(url: string | URL, base?: string | URL) {
    // Handle blob: base URLs specially
    if (base && typeof base === "string" && base.startsWith("blob:")) {
      const importMap = window.importShim?.getImportMap()?.imports;

      if (importMap) {
        // Find the original module path for this blob URL
        for (const [modulePath, blobUrl] of Object.entries(importMap)) {
          if (base === blobUrl) {
            // Resolve the relative path against the original module path
            const resolvedPath = resolve(dirname(modulePath), String(url));

            // Look up the resolved path in the import map
            // Try with and without extension
            const withoutExt = resolvedPath.replace(
              SCRIPT_EXTENSION_PATTERN,
              ""
            );
            const mappedUrl = importMap[withoutExt] || importMap[resolvedPath];

            if (mappedUrl) {
              // Use the mapped URL instead
              super(mappedUrl);
              return;
            }
          }
        }
      }
    }

    // Default behavior
    super(url, base);
  }

  /**
   * Preserve the URL string tag
   */
  get [Symbol.toStringTag](): string {
    return "URL";
  }
}

// ============================================================================
// URL Override Installation
// ============================================================================

/**
 * Install the V0URL override
 *
 * Replaces window.URL with V0URL to handle blob: URLs in imports.
 * Should be called early in the runtime initialization.
 */
export function installURLOverride(): void {
  if (typeof window === "undefined") return;

  // Store original for potential restoration
  (window as any).__v0_OriginalURL = window.URL;

  // Override
  (window as any).URL = V0URL;
}

/**
 * Restore the original URL class
 *
 * Undoes the URL override, restoring the native URL class.
 */
export function restoreOriginalURL(): void {
  if (typeof window === "undefined") return;

  const original = (window as any).__v0_OriginalURL;
  if (original) {
    (window as any).URL = original;
    delete (window as any).__v0_OriginalURL;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Resolve a blob URL to its original module name
 *
 * @param blobUrl - Blob URL to resolve
 * @returns Original module name or undefined
 */
export function resolveBlobToModuleName(blobUrl: string): string | undefined {
  const importMap = window.importShim?.getImportMap()?.imports;
  if (!importMap) return undefined;

  for (const [modulePath, mappedUrl] of Object.entries(importMap)) {
    if (blobUrl === mappedUrl) {
      return modulePath;
    }
  }

  return undefined;
}

/**
 * Find the original file path for a blob URL
 *
 * @param blobUrl - Blob URL
 * @returns Original file path or undefined
 */
export function findOriginalPath(blobUrl: string): string | undefined {
  const moduleName = resolveBlobToModuleName(blobUrl);
  if (!moduleName) return undefined;

  // Remove @v0/ prefix if present
  return moduleName.replace(/^@v0\//, "");
}

/**
 * Check if a URL is a blob URL
 *
 * @param url - URL to check
 * @returns True if blob URL
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith("blob:");
}

/**
 * Get the import map from es-module-shims
 *
 * @returns Import map or empty object
 */
export function getImportMap(): Record<string, string> {
  return window.importShim?.getImportMap()?.imports || {};
}

// ============================================================================
// Exports
// ============================================================================

export { OriginalURL };

export default {
  V0URL,
  installURLOverride,
  restoreOriginalURL,
  resolveBlobToModuleName,
  findOriginalPath,
  isBlobUrl,
  getImportMap,
  OriginalURL,
};
