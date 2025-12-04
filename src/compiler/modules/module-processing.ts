/**
 * Module Processing Pipeline
 * Source: module_448763 (Lines 1444-1697)
 *
 * Processes modules and creates import maps. Handles runtime module creation,
 * code generation, special module resolution, HMR, and dynamic imports.
 * Manages both user modules and system dependencies.
 *
 * Note: Module blob creation functions are imported from registry.ts
 * (which implements the Module Cache - LOC 1622-1697)
 */

import {
  createModuleBlob as createModuleBlobFromRegistry,
  createRuntimeModule as createRuntimeModuleFromRegistry,
  blobUrlCache as registryBlobCache,
  sourceCodeCache as registrySourceCache,
  blobToModuleMap as registryBlobToModuleMap,
} from "./registry";

// ============================================================================
// Types
// ============================================================================

/**
 * Module entry from compilation
 */
export interface ModuleEntry {
  /** Module type */
  type: "script" | "style" | "static";
  /** Runtime code (for script modules) */
  runtime?: string;
  /** Module metadata */
  meta?: {
    topLevelUseServer?: boolean;
    topLevelUseClient?: boolean;
  };
  /** Exported names */
  exported?: string[];
  /** Used exports */
  used?: string[];
}

/**
 * Compiled modules map
 */
export type CompiledModules = Record<string, ModuleEntry>;

/**
 * Import map
 */
export type ImportMap = Record<string, string>;

/**
 * Module registry
 */
export interface ModuleRegistry {
  [key: string]: any;
}

/**
 * Blob URL cache
 */
export type BlobUrlCache = Record<string, string>;

/**
 * Source code cache for HMR
 */
export type SourceCodeCache = Map<string, string>;

// ============================================================================
// Global State
// ============================================================================

/**
 * Current import map
 */
let currentImportMap: ImportMap | null = null;

// Re-export caches from registry for convenience
export const blobUrlCache = registryBlobCache;
export const sourceCodeCache = registrySourceCache;
export const blobToModuleName = registryBlobToModuleMap;

// ============================================================================
// Module Blob Creation (Wrapper Functions)
// ============================================================================

/**
 * Create blob URL for a module with exports
 * Wrapper around registry.createModuleBlob
 *
 * @param moduleName - Module name
 * @param exports - Module exports object
 * @param forceUpdate - Force update even if exists
 * @returns Blob URL
 */
export function createModuleBlob(
  moduleName: string,
  exports: any,
  forceUpdate = false
): string {
  return createModuleBlobFromRegistry({
    moduleId: moduleName,
    exports,
    shouldTrack: !forceUpdate,
  });
}

/**
 * Create blob URL for runtime module with source code
 * Wrapper around registry.createRuntimeModule
 *
 * @param moduleName - Module name
 * @param sourceCode - Source code
 * @param forceUpdate - Force update even if exists
 * @param hmrCallback - Optional HMR callback
 * @returns Blob URL
 */
export function createRuntimeModuleBlob(
  moduleName: string,
  sourceCode: string,
  forceUpdate = false,
  hmrCallback?: (moduleName: string) => void
): string {
  return createRuntimeModuleFromRegistry({
    name: moduleName,
    sourceCode,
    isRuntime: false,
    hmrCallback: hmrCallback ? () => hmrCallback(moduleName) : undefined,
  });
}

// ============================================================================
// Import Map Generation
// ============================================================================

/**
 * Generate client/server layer wrapper code
 * Creates wrapper that imports from layer and re-exports with ref
 *
 * @param layerName - Layer module name
 * @param exportedNames - Names to export
 * @param refConfig - Reference creation config
 * @returns Wrapper code
 */
function generateLayerWrapper(
  layerName: string,
  exportedNames: string[],
  refConfig: { import: string; api: string }
): string {
  const exports = exportedNames
    .map((name) => {
      if (name === "default") {
        return `export default ${refConfig.api}(mod.default);`;
      }
      return `export const ${name} = ${refConfig.api}(mod.${name});`;
    })
    .join("\n");

  return `
${refConfig.import}
import * as mod from '${layerName}';
${exports}
`.trim();
}

/**
 * Process modules and create import map
 * Main entry point for module processing
 *
 * @param modules - Compiled modules
 * @param isHMR - Whether this is an HMR update
 * @param moduleRegistry - Module registry (lazy loaders, etc.)
 * @param runtimeShims - Runtime shims
 * @returns Promise that resolves when processing complete
 */
export async function processModules(
  modules: CompiledModules,
  isHMR = false,
  moduleRegistry?: ModuleRegistry,
  runtimeShims?: ModuleRegistry
): Promise<void> {
  // Merge registries
  const registry: ModuleRegistry = {
    ...moduleRegistry,
    ...runtimeShims,
  };

  // Initialize import map if needed
  const importMap: ImportMap = currentImportMap || {
    react: createModuleBlob("React", (globalThis as any).React),
    "react-dom": createModuleBlob("ReactDOM", (globalThis as any).ReactDOM),
    "react/jsx-runtime": createModuleBlob(
      "ReactJSXRuntime",
      (globalThis as any).ReactJSXRuntime
    ),
    __v0__: createModuleBlob("__v0__", (globalThis as any).__v0__),
    "__v0__/internal": createModuleBlob(
      "__v0__/internal",
      (globalThis as any).__v0__internal
    ),
    "__v0__/jsx-dev-runtime": createModuleBlob(
      "__v0__/jsx-dev-runtime",
      (globalThis as any).__v0__jsxDevRuntime
    ),
  };

  // HMR callbacks
  const hmrCallbacks: Array<() => Promise<void>> = [];

  const addHMRCallback = (moduleName: string) => {
    hmrCallbacks.push(async () => {
      try {
        if (typeof (window as any).importShim === "function") {
          await (window as any).importShim(moduleName);
        }
      } catch (error) {
        console.info(`Failed to apply HMR update for ${moduleName}:`, error);
      }
    });
  };

  // Process each module
  const processingTasks: Promise<void>[] = [];

  for (const [moduleName, moduleEntry] of Object.entries(modules)) {
    // Skip non-script modules and core modules
    if (
      moduleEntry.type !== "script" ||
      ["react", "react-dom"].includes(moduleName)
    ) {
      continue;
    }

    // Handle @v0/ modules with runtime code
    if (moduleName.startsWith("@v0/")) {
      if (typeof moduleEntry.runtime === "string") {
        // Handle "use server" directive
        if (moduleEntry.meta?.topLevelUseServer) {
          const serverLayer = `${moduleName}?server_layer`;
          const clientLayer = `${moduleName}?client_layer`;

          const refConfig = {
            import: "import { createServerRef } from '__v0__/internal'",
            api: "createServerRef",
          };

          // Server layer - actual implementation
          importMap[serverLayer] = createRuntimeModuleBlob(
            serverLayer,
            moduleEntry.runtime,
            isHMR,
            addHMRCallback
          );

          // Client layer - wrapper with refs
          const clientWrapper = generateLayerWrapper(
            serverLayer,
            moduleEntry.exported || [],
            refConfig
          );

          importMap[clientLayer] = createRuntimeModuleBlob(
            clientLayer,
            clientWrapper,
            isHMR,
            addHMRCallback
          );

          // Main module - same as client layer
          importMap[moduleName] = createRuntimeModuleBlob(
            moduleName,
            clientWrapper,
            isHMR,
            addHMRCallback
          );
        }
        // Handle "use client" directive
        else if (moduleEntry.meta?.topLevelUseClient) {
          const serverLayer = `${moduleName}?server_layer`;
          const clientLayer = `${moduleName}?client_layer`;

          const refConfig = {
            import: "import { createClientRef } from '__v0__/internal'",
            api: "createClientRef",
          };

          // Client layer - actual implementation
          importMap[clientLayer] = createRuntimeModuleBlob(
            clientLayer,
            moduleEntry.runtime,
            isHMR,
            addHMRCallback
          );

          // Server layer - wrapper with refs
          const serverWrapper = generateLayerWrapper(
            clientLayer,
            moduleEntry.exported || [],
            refConfig
          );

          importMap[serverLayer] = createRuntimeModuleBlob(
            serverLayer,
            serverWrapper,
            isHMR,
            addHMRCallback
          );

          // Main module - same as server layer
          importMap[moduleName] = createRuntimeModuleBlob(
            moduleName,
            serverWrapper,
            isHMR,
            addHMRCallback
          );
        }
        // Regular module
        else {
          importMap[moduleName] = createRuntimeModuleBlob(
            moduleName,
            moduleEntry.runtime,
            isHMR,
            addHMRCallback
          );

          importMap[`${moduleName}?server_layer`] = createRuntimeModuleBlob(
            `${moduleName}?server_layer`,
            moduleEntry.runtime,
            isHMR,
            addHMRCallback
          );

          importMap[`${moduleName}?client_layer`] = createRuntimeModuleBlob(
            `${moduleName}?client_layer`,
            moduleEntry.runtime,
            isHMR,
            addHMRCallback
          );
        }
        continue;
      } else if (!registry[moduleName]) {
        continue;
      }
    }

    // Handle registry modules (lazy loaders, etc.)
    const registryEntry = registry[moduleName];

    if (registryEntry) {
      const task = (async () => {
        // Handle dynamic loaders
        const resolved = registryEntry.__dynamic
          ? registryEntry(moduleEntry.used)
          : registryEntry.__lazy
          ? await registryEntry()
          : registryEntry;

        // Handle runtime modules
        if (resolved?.__runtime) {
          importMap[moduleName] = createRuntimeModuleBlob(
            moduleName,
            resolved.__runtime,
            isHMR,
            addHMRCallback
          );
        } else {
          importMap[moduleName] = createModuleBlob(
            moduleName,
            resolved,
            isHMR || registryEntry.__dynamic || !isHMR
          );
        }
      })();

      processingTasks.push(task);
    } else {
      // Fallback to CDN
      importMap[moduleName] = generateCDNUrl(moduleName, {
        used: moduleEntry.used,
      });
    }
  }

  // Wait for all processing
  await Promise.all(processingTasks);

  // Update global import map
  currentImportMap = importMap;

  if (typeof (window as any).importShim?.addImportMap === "function") {
    (window as any).importShim.addImportMap({ imports: importMap });
  }

  // Execute HMR callbacks
  if (isHMR) {
    await Promise.all(hmrCallbacks.map((cb) => cb()));
  }
}

// ============================================================================
// CDN URL Generation
// ============================================================================

/**
 * Generate CDN URL for a module
 *
 * @param moduleName - Module name
 * @param options - Options (used exports, version)
 * @returns CDN URL
 */
function generateCDNUrl(
  moduleName: string,
  options: { used?: string[]; version?: string } = {}
): string {
  // Handle HTTP URLs
  if (moduleName.startsWith("http://") || moduleName.startsWith("https://")) {
    const baseUrl = (globalThis as any).ESMSH_BASE_URL || "https://esm.sh";
    return `${baseUrl}/${encodeURIComponent(moduleName)}`;
  }

  // Handle special cases
  if (moduleName.startsWith("recharts@2.")) {
    return generateESMSHUrl("recharts@latest");
  }

  // Default to esm.sh
  return generateESMSHUrl(moduleName, options.version);
}

/**
 * Generate esm.sh URL
 *
 * @param moduleName - Module name
 * @param version - Optional version
 * @returns esm.sh URL
 */
function generateESMSHUrl(moduleName: string, version?: string): string {
  const baseUrl = (globalThis as any).ESMSH_BASE_URL || "https://esm.sh";
  const moduleSpec = version ? `${moduleName}@${version}` : moduleName;
  return `${baseUrl}/${moduleSpec}`;
}

// ============================================================================
// Exports
// ============================================================================

export { currentImportMap as importMap };

export default {
  processModules,
  createModuleBlob,
  createRuntimeModuleBlob,
  generateCDNUrl,
};
