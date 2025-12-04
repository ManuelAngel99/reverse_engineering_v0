/**
 * Build Helper Utilities
 * Source: module_448763 (Lines 7972-8002)
 *
 * Utility functions for build operations:
 * - I3: Extract static files from compilation result
 * - I6: Wrap compilation with context management
 * - I8: Create error page for build failures
 * - I5: Build file path mapping
 * - I7: LRU cache for build optimization
 * - I9/Pe: Pending promise map for deduplication
 */

import { LRUCache } from "lru-cache";
import type { SealedBuild } from "./build-seal";
import type { StaticFilesRegistry } from "./static-assets-json";
import type { ModuleCompilationResult } from "./compilation-pipeline";

// ============================================================================
// Types
// ============================================================================

/**
 * Cached build entry
 * The compiled promise returns a tuple of [SealedBuild, CompilerContext]
 */
export interface CachedBuild {
  compiled: Promise<[SealedBuild, unknown]>;
  files: Array<[string, { type: string; data: string }]>;
}

/**
 * File path mapping (compiled path -> original path)
 */
export type FilePathMapping = Record<string, string>;

// ============================================================================
// Static File Extraction (I3)
// ============================================================================

/**
 * Extract static files from a sealed build result
 *
 * This is used to send static files to the service worker.
 *
 * @param build - Sealed build result
 * @returns Object containing only staticFiles
 */
export function extractStaticFilesForSW(build: SealedBuild): {
  staticFiles: StaticFilesRegistry;
} {
  return { staticFiles: build.staticFiles };
}

// ============================================================================
// Compilation Wrapper (I6)
// ============================================================================

/**
 * Wrap compilation with context management
 *
 * Ensures compilation runs with proper globals and timestamp.
 *
 * @param files - Files to compile
 * @param timestamp - Feature flag timestamp
 * @param compileFn - Compilation function
 * @returns Compilation result
 */
export async function wrapCompilation<T>(
  files: Array<[string, { type: string; data: string }]>,
  timestamp: number | undefined,
  compileFn: (
    files: Array<[string, { type: string; data: string }]>,
    defaultPath: string | undefined,
    timestamp: number
  ) => Promise<T>
): Promise<T> {
  const effectiveTimestamp = timestamp || Date.now();
  return await compileFn(files, undefined, effectiveTimestamp);
}

// ============================================================================
// Error Page Generation (I8)
// ============================================================================

/**
 * Create an error page component for build failures
 *
 * @param error - Error that occurred
 * @returns Error message string
 */
export function createErrorMessage(error: Error): string {
  return `Failed to initialize v0: ${error.message || "An error occurred"}`;
}

/**
 * Create error page props
 *
 * @param error - Error that occurred
 * @returns Props for error page component
 */
export function createErrorPageProps(error: Error): {
  code: string;
  message: string;
  error: Error;
} {
  return {
    code: "Application Error",
    message: createErrorMessage(error),
    error,
  };
}

// ============================================================================
// File Path Mapping (I5)
// ============================================================================

/**
 * Build file path mapping from modules
 *
 * Creates a mapping from compiled paths to original paths.
 * Used for source map resolution and error reporting.
 *
 * @param modules - Compiled modules
 * @returns Path mapping object
 */
export function buildFilePathMapping(
  modules: Record<string, ModuleCompilationResult>
): FilePathMapping {
  const mapping: FilePathMapping = {};

  for (const module of Object.values(modules)) {
    if (module.originalPath !== undefined) {
      mapping[module.path] = module.originalPath;
    }
  }

  return mapping;
}

// ============================================================================
// LRU Cache (I7)
// ============================================================================

/**
 * Build cache for compiled results
 *
 * Caches up to 50 builds to avoid recompilation.
 */
export const buildCache = new LRUCache<string, CachedBuild>({
  max: 50,
});

/**
 * Get cached build or undefined
 *
 * @param id - Build ID
 * @returns Cached build or undefined
 */
export function getCachedBuild(id: string): CachedBuild | undefined {
  return buildCache.get(id);
}

/**
 * Set cached build
 *
 * @param id - Build ID
 * @param build - Build to cache
 */
export function setCachedBuild(id: string, build: CachedBuild): void {
  buildCache.set(id, build);
}

/**
 * Check if build is cached
 *
 * @param id - Build ID
 * @returns True if cached
 */
export function hasCachedBuild(id: string): boolean {
  return buildCache.has(id);
}

// ============================================================================
// Pending Promise Map (I9/Pe)
// ============================================================================

/**
 * Map of pending promises for deduplication
 *
 * Prevents duplicate async operations for the same key.
 */
const pendingPromises = new Map<string, Promise<any>>();

/**
 * Get or create a pending promise
 *
 * If a promise for the given key already exists, returns it.
 * Otherwise, creates a new promise using the factory function.
 *
 * @param key - Unique key for the operation
 * @param factory - Factory function to create the promise
 * @returns Promise for the operation
 */
export function getOrCreatePendingPromise<T>(
  key: string,
  factory: (key: string) => Promise<T>
): Promise<T> {
  if (pendingPromises.has(key)) {
    return pendingPromises.get(key) as Promise<T>;
  }

  const promise = factory(key).finally(() => {
    pendingPromises.delete(key);
  });

  pendingPromises.set(key, promise);
  return promise;
}

/**
 * Check if a promise is pending for the given key
 *
 * @param key - Key to check
 * @returns True if pending
 */
export function hasPendingPromise(key: string): boolean {
  return pendingPromises.has(key);
}

/**
 * Clear all pending promises
 *
 * Use with caution - may cause issues if promises are still in flight.
 */
export function clearPendingPromises(): void {
  pendingPromises.clear();
}

// ============================================================================
// Exports
// ============================================================================

export default {
  extractStaticFilesForSW,
  wrapCompilation,
  createErrorMessage,
  createErrorPageProps,
  buildFilePathMapping,
  buildCache,
  getCachedBuild,
  setCachedBuild,
  hasCachedBuild,
  getOrCreatePendingPromise,
  hasPendingPromise,
  clearPendingPromises,
};
