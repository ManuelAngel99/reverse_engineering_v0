/**
 * Module Registry
 * Source: module_448763 (Lines 1622-1696)
 *
 * Global module storage and management system for v0's runtime.
 * Handles module registration, blob URL creation, and HMR tracking.
 */

import type {
  ModuleRegistry,
  ModuleExports,
  BlobUrlCache,
  SourceCodeCache,
  BlobToModuleMap,
  CreateModuleOptions,
  CreateRuntimeModuleOptions,
  ModuleWrapperOptions,
} from "../../shared/types/compiler";

// ============================================================================
// Global State
// ============================================================================

/**
 * Global module registry
 * Stores all module exports by module ID
 */
if (typeof window !== "undefined" && !window.__v0_modules__) {
  window.__v0_modules__ = {};
}

/**
 * Blob URL cache
 * Maps module IDs to their blob URLs for cleanup
 */
const blobUrlCache: BlobUrlCache = {};

/**
 * Source code cache for HMR comparison
 * Tracks source code to detect changes
 */
const sourceCodeCache: SourceCodeCache = new Map();

/**
 * Blob to module name mapping
 * Used for debugging and error messages
 */
const blobToModuleMap: BlobToModuleMap = {};

// ============================================================================
// Module Registration
// ============================================================================

/**
 * Register a module in the global registry
 *
 * @param moduleId - Unique module identifier
 * @param exports - Module exports object
 */
export function registerModule(moduleId: string, exports: ModuleExports): void {
  if (typeof window === "undefined") return;
  window.__v0_modules__[moduleId] = exports;
}

/**
 * Get module exports from the registry
 *
 * @param moduleId - Module identifier
 * @returns Module exports or undefined
 */
export function getModule(moduleId: string): ModuleExports | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__v0_modules__[moduleId];
}

/**
 * Check if a module is registered
 *
 * @param moduleId - Module identifier
 * @returns True if module exists
 */
export function hasModule(moduleId: string): boolean {
  if (typeof window === "undefined") return false;
  return moduleId in window.__v0_modules__;
}

/**
 * Unregister a module from the registry
 *
 * @param moduleId - Module identifier
 */
export function unregisterModule(moduleId: string): void {
  if (typeof window === "undefined") return;
  delete window.__v0_modules__[moduleId];

  // Clean up blob URL if it exists
  if (blobUrlCache[moduleId]) {
    URL.revokeObjectURL(blobUrlCache[moduleId]);
    delete blobUrlCache[moduleId];
  }

  // Clean up source code cache
  sourceCodeCache.delete(moduleId);
}

// ============================================================================
// Module Blob Creation
// ============================================================================

/**
 * Create a module wrapper that exports from the global registry
 *
 * @param options - Module wrapper options
 * @returns JavaScript code string
 */
function createModuleWrapper({
  moduleId,
  exports,
  sourceFileName,
}: ModuleWrapperOptions): string {
  const exportKeys = Object.keys(exports);
  const hasDefault = "default" in exports;

  // Generate export statements
  const defaultExport = hasDefault
    ? "export default mod.default;"
    : "export { mod as default };";

  const namedExports = exportKeys
    .filter((key) => key !== "default")
    .map(
      (key, idx) =>
        `const __v0_${idx} = mod[${JSON.stringify(
          key
        )}]; export { __v0_${idx} as ${JSON.stringify(key)} };`
    )
    .join("\n");

  // Create source file name for debugging
  const fileName = sourceFileName || moduleId.replace(/^@v0\//, "");

  return `
const mod = window.__v0_modules__[${JSON.stringify(moduleId)}];
${defaultExport}
${namedExports}

//# sourceFileName=${fileName}
`.trim();
}

/**
 * Create a blob URL for a module
 * Stores the module in the global registry and creates a blob URL for dynamic import
 *
 * @param options - Module creation options
 * @returns Blob URL string
 */
export function createModuleBlob({
  moduleId,
  exports,
  shouldTrack = true,
}: CreateModuleOptions): string {
  // Register module in global registry
  registerModule(moduleId, exports);

  // Create module wrapper code
  const wrapperCode = createModuleWrapper({
    moduleId,
    exports,
  });

  // Create blob URL
  const blob = new Blob([wrapperCode], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);

  // Cache blob URL for cleanup
  blobUrlCache[moduleId] = blobUrl;

  // Track blob to module mapping for debugging
  if (shouldTrack) {
    blobToModuleMap[blobUrl] = moduleId;
  }

  return blobUrl;
}

/**
 * Create a runtime module with source code
 * Used for user code and dynamic modules that need HMR support
 *
 * @param options - Runtime module options
 * @returns Blob URL string
 */
export function createRuntimeModule({
  name,
  sourceCode,
  isRuntime = false,
  hmrCallback,
}: CreateRuntimeModuleOptions): string {
  // Track source code for HMR comparison
  if (hmrCallback) {
    sourceCodeCache.set(name, sourceCode);
  }

  // Create blob URL from source code
  const blob = new Blob([sourceCode], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);

  // Cache blob URL
  blobUrlCache[name] = blobUrl;

  // Track blob to module mapping
  blobToModuleMap[blobUrl] = name;

  // Track runtime module creation (for HMR)
  if (!isRuntime && typeof window !== "undefined") {
    // This would normally call trackRuntimeModuleCreation()
    // but we'll implement that in the HMR module
  }

  return blobUrl;
}

// ============================================================================
// HMR Support
// ============================================================================

/**
 * Check if module source code has changed
 *
 * @param moduleId - Module identifier
 * @param newCode - New source code
 * @returns True if code has changed
 */
export function hasModuleChanged(moduleId: string, newCode: string): boolean {
  const oldCode = sourceCodeCache.get(moduleId);
  return oldCode !== newCode;
}

/**
 * Update module source code in cache
 *
 * @param moduleId - Module identifier
 * @param newCode - New source code
 */
export function updateModuleSource(moduleId: string, newCode: string): void {
  sourceCodeCache.set(moduleId, newCode);
}

/**
 * Get module name from blob URL
 *
 * @param blobUrl - Blob URL
 * @returns Module name or undefined
 */
export function getModuleNameFromBlob(blobUrl: string): string | undefined {
  return blobToModuleMap[blobUrl];
}

// ============================================================================
// Cleanup
// ============================================================================

/**
 * Revoke all blob URLs and clear caches
 * Should be called when shutting down or resetting the environment
 */
export function cleanupModules(): void {
  // Revoke all blob URLs
  Object.values(blobUrlCache).forEach((url) => {
    URL.revokeObjectURL(url);
  });

  // Clear all caches
  Object.keys(blobUrlCache).forEach((key) => {
    delete blobUrlCache[key];
  });
  sourceCodeCache.clear();
  Object.keys(blobToModuleMap).forEach((key) => {
    delete blobToModuleMap[key];
  });

  // Clear global registry
  if (typeof window !== "undefined") {
    window.__v0_modules__ = {};
  }
}

// ============================================================================
// Exports
// ============================================================================

export { blobUrlCache, sourceCodeCache, blobToModuleMap };
