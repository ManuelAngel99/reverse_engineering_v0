/**
 * Asset & Module Utilities
 * Source: 0eea3dbce56890c9.js (module 608367, Lines 4470-4516)
 *
 * Utilities for static asset URL transformation and async component caching.
 * These enable browser-based resource management and React Server Components support.
 */

import type { ComponentType } from "react";
import { useState, useEffect } from "react";
import { trackHMRPromise, isHMRActive } from "../hmr/utilities";

// ============================================================================
// Types
// ============================================================================

/**
 * Static file entry in the internal registry
 */
export type StaticFileEntry =
  | ["raw", string] // Raw content with MIME type detection
  | ["url", string]; // External URL

/**
 * Static files registry
 */
export type StaticFilesRegistry = Record<string, StaticFileEntry>;

/**
 * Global state interface
 */
interface V0Globals {
  internal_static?: StaticFilesRegistry;
  internal_ts?: number;
  internal_fs?: any;
  internal_fs_vol?: any;
  internal_location_change?: () => void;
}

// ============================================================================
// Globals Access
// ============================================================================

/**
 * Get v0 globals from window
 *
 * @returns V0 globals object
 */
function getGlobals(): V0Globals {
  if (typeof window === "undefined") return {};
  return (window as any).__v0_globals__ || {};
}

/**
 * Set v0 globals on window
 *
 * @param globals - Globals to set
 */
export function setGlobals(globals: Partial<V0Globals>): void {
  if (typeof window === "undefined") return;
  (window as any).__v0_globals__ = {
    ...getGlobals(),
    ...globals,
  };
}

// ============================================================================
// Static Asset URL Transformation
// ============================================================================

/**
 * Blob URL cache for static assets
 * Prevents recreating blob URLs for the same content
 */
const blobUrlCache = new WeakMap<StaticFileEntry, string>();

/**
 * Get MIME type from file extension
 *
 * @param pathname - File pathname
 * @returns MIME type string
 */
function getMimeType(pathname: string): string {
  const lower = pathname.toLowerCase();

  if (lower.endsWith(".html")) return "text/html";
  if (lower.endsWith(".js")) return "text/javascript";
  if (lower.endsWith(".css")) return "text/css";
  if (lower.endsWith(".json")) return "application/json";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".xml")) return "application/xml";
  if (lower.endsWith(".txt")) return "text/plain";
  if (lower.endsWith(".md")) return "text/markdown";
  if (lower.endsWith(".csv")) return "text/csv";

  return "text/plain";
}

/**
 * Transform static asset URL to resource URI
 *
 * This function converts relative asset URLs to blob URLs or external URLs
 * based on the internal static files registry. It's used to serve assets
 * from the virtual filesystem or CDN.
 *
 * @param url - Asset URL to transform
 * @returns Transformed URL (blob: or https:) or null if not found
 *
 * @example
 * ```typescript
 * // For a file in the static registry
 * staticAssetUrlToResourceUri('/image.png')
 * // Returns: 'blob:http://localhost:3000/abc-123'
 *
 * // For an external URL
 * staticAssetUrlToResourceUri('https://example.com/image.png')
 * // Returns: null (already external)
 *
 * // For a data URL
 * staticAssetUrlToResourceUri('data:image/png;base64,...')
 * // Returns: null (already a data URL)
 * ```
 */
export function staticAssetUrlToResourceUri(url: string): string | null {
  // Skip if already an absolute URL or data/blob URL
  if (
    !url ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return null;
  }

  // Get static files registry
  const staticFiles = getGlobals().internal_static;
  if (!staticFiles) {
    return null;
  }

  // Resolve URL to pathname
  const pathname = new URL(url, window.location.href).pathname;

  // Check if file exists in registry
  const entry = staticFiles[pathname];
  if (!entry) {
    return null;
  }

  // Handle raw content - create blob URL
  if (entry[0] === "raw") {
    const content = entry[1];

    // Check cache first
    if (blobUrlCache.has(entry)) {
      return blobUrlCache.get(entry)!;
    }

    // Create blob URL with appropriate MIME type
    const mimeType = getMimeType(pathname);
    const blob = new Blob([content], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    // Cache for future use
    blobUrlCache.set(entry, blobUrl);

    return blobUrl;
  }

  // Handle external URL
  if (entry[0] === "url") {
    return entry[1];
  }

  return null;
}

/**
 * Register static files in the global registry
 *
 * @param files - Static files to register
 */
export function registerStaticFiles(files: StaticFilesRegistry): void {
  setGlobals({ internal_static: files });
}

/**
 * Get static file from registry
 *
 * @param pathname - File pathname
 * @returns Static file entry or undefined
 */
export function getStaticFile(pathname: string): StaticFileEntry | undefined {
  const staticFiles = getGlobals().internal_static;
  return staticFiles?.[pathname];
}

/**
 * Check if a pathname has a static file registered
 *
 * @param pathname - File pathname
 * @returns True if file exists
 */
export function hasStaticFile(pathname: string): boolean {
  return getStaticFile(pathname) !== undefined;
}

/**
 * Clear all blob URLs from cache
 * Should be called when cleaning up or resetting
 */
export function clearBlobCache(): void {
  // WeakMap doesn't have a clear method, but entries will be garbage collected
  // when the StaticFileEntry objects are no longer referenced
}

// ============================================================================
// Async Component Caching (React Server Components)
// ============================================================================

/**
 * Component cache for async components
 * Maps component functions to their cached wrapper components
 */
const asyncComponentCache = new Map<ComponentType<any>, ComponentType<any>>();

/**
 * Hook cache for async component state
 * Maps component functions to their state hook implementations
 */
const asyncComponentHooks = new Map<
  ComponentType<any>,
  () => ComponentType<any>
>();

/**
 * Pending promises for HMR tracking
 * Allows waiting for all async components to resolve before HMR
 */
let pendingPromises: Promise<any>[] | null = null;

/**
 * Create an async component with caching
 *
 * This wraps an async component (React Server Component) with a synchronous
 * wrapper that handles the promise resolution and caching. The component
 * will suspend until the promise resolves, then render the resolved component.
 *
 * @param promise - Promise that resolves to the component result
 * @param component - Original async component function
 * @returns Cached wrapper component
 *
 * @example
 * ```typescript
 * async function AsyncComponent() {
 *   const data = await fetchData();
 *   return <div>{data}</div>;
 * }
 *
 * const WrappedComponent = createAsyncComponentWithCache(
 *   AsyncComponent(),
 *   AsyncComponent
 * );
 *
 * // Use in JSX
 * <Suspense fallback={<Loading />}>
 *   <WrappedComponent />
 * </Suspense>
 * ```
 */
export function createAsyncComponentWithCache<P = any>(
  promise: Promise<any>,
  component: ComponentType<P>
): ComponentType<P> {
  // Track initial resolved value
  let resolvedValue: any = null;

  // Store resolved value when promise completes
  promise.then((value) => {
    resolvedValue = value;
  });

  // Track promise for HMR (both local and global tracking)
  if (pendingPromises) {
    pendingPromises.push(promise);
  }

  // Also track in global HMR system if active
  if (isHMRActive()) {
    trackHMRPromise(promise);
  }

  // Create state hook for this component if not already cached
  if (!asyncComponentHooks.has(component)) {
    asyncComponentHooks.set(component, () => {
      const [value, setValue] = useState(resolvedValue);

      useEffect(() => {
        let cancelled = false;

        promise.then((resolved) => {
          if (!cancelled) {
            setValue(resolved);
          }
        });

        return () => {
          cancelled = true;
        };
      }, [promise]);

      return value;
    });
  }

  // Create wrapper component if not already cached
  if (!asyncComponentCache.has(component)) {
    const AsyncComponentWrapper: ComponentType<P> = () => {
      const hook = asyncComponentHooks.get(component)!;
      return hook() as any;
    };
    asyncComponentCache.set(component, AsyncComponentWrapper);
  }

  return asyncComponentCache.get(component)!;
}

/**
 * Start tracking async component promises for HMR
 * Call this before loading new code
 */
export function startAsyncTracking(): void {
  pendingPromises = [];
}

/**
 * Stop tracking and wait for all pending async components
 * Call this after loading new code to ensure all components are ready
 *
 * @returns Promise that resolves when all async components are ready
 */
export async function waitForAsyncComponents(): Promise<void> {
  if (pendingPromises) {
    await Promise.allSettled(pendingPromises);
    pendingPromises = null;
  }
}

/**
 * Clear async component cache
 * Useful for HMR or when resetting the application
 */
export function clearAsyncComponentCache(): void {
  asyncComponentCache.clear();
  asyncComponentHooks.clear();
}

// ============================================================================
// Exports
// ============================================================================

export { getGlobals };
