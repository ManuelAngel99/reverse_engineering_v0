/**
 * Build Sealing System
 * Source: module_448763 (Lines 7347-7547)
 *
 * Finalizes the compilation by:
 * - Running TypeScript emit with React Refresh transformers
 * - Filtering entry modules (removes middleware, CSS, internal deps)
 * - Collecting static files and environment variables
 * - Generating the final build manifest
 */

import type { Project } from "ts-morph";
import type { ModuleCompilationResult } from "./compilation-pipeline";
import type { StaticFilesRegistry, EnvVars } from "./static-assets-json";

// ============================================================================
// Types
// ============================================================================

/**
 * Sealed build result
 */
export interface SealedBuild {
  /** Entry module paths (pages, routes, layouts) */
  entryModules: string[];
  /** All compiled modules */
  modules: Record<string, ModuleCompilationResult>;
  /** Static files registry */
  staticFiles: StaticFilesRegistry;
  /** Environment variables */
  envs: EnvVars;
  /** Build timestamp */
  createdAt?: number;
}

/**
 * Seal options
 */
export interface SealOptions {
  /** Skip TypeScript emit (for HMR) */
  skipEmit?: boolean;
  /** React Refresh transformer factory */
  refreshTransformer?: (options: RefreshTransformerOptions) => any;
}

/**
 * React Refresh transformer options
 */
export interface RefreshTransformerOptions {
  refreshReg: string;
  refreshSig: string;
  ts: any;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Pattern to match middleware files
 */
const MIDDLEWARE_PATTERN = /\/middleware\.(ts|js|tsx|jsx)$/;

/**
 * Pattern to match CSS files
 */
const CSS_PATTERN = /\.css$/i;

// ============================================================================
// Entry Module Filtering
// ============================================================================

/**
 * Filter entry modules from all modules
 *
 * Entry modules are modules that:
 * - Are not middleware
 * - Are not dependencies of other modules (except page/route files)
 *
 * @param modules - All compiled modules
 * @returns Array of entry module paths
 */
export function filterEntryModules(
  modules: Record<string, ModuleCompilationResult>
): string[] {
  const allModules = new Set(Object.keys(modules));

  for (const [modulePath, module] of Object.entries(modules)) {
    // Remove middleware from entry modules
    if (MIDDLEWARE_PATTERN.test(modulePath)) {
      allModules.delete(modulePath);
      continue;
    }

    // Remove dependencies (unless they're page/route files)
    Object.keys(module.dependencies).forEach((dep) => {
      if (!dep.endsWith("page") && !dep.endsWith("route")) {
        allModules.delete(dep);
      }
    });
  }

  return Array.from(allModules);
}

// ============================================================================
// React Refresh Wrapping
// ============================================================================

/**
 * Wrap module code with React Refresh registration
 *
 * @param modulePath - Module path
 * @param code - Compiled code
 * @returns Wrapped code with refresh registration
 */
export function wrapWithRefresh(modulePath: string, code: string): string {
  return `\
var prevRefreshReg = self.__v0_$RefreshReg$
var prevRefreshSig = self.__v0_$RefreshSig$
self.__v0_$RefreshReg$ = (type, id) => {
  id = ${JSON.stringify(modulePath)} + ' ' + id
  self.__v0_rscRefreshRegister(type, id)
  self.__v0_refreshRuntime.register(type, id)
}
self.__v0_$RefreshSig$ = typeof __v0_refreshRuntime !== 'undefined' ? __v0_refreshRuntime.createSignatureFunctionForTransform : () => {}

${code}

self.__v0_$RefreshReg$ = prevRefreshReg
self.__v0_$RefreshSig$ = prevRefreshSig`;
}

// ============================================================================
// Build Sealing
// ============================================================================

/**
 * Seal the build
 *
 * Finalizes compilation by:
 * 1. Optionally running TypeScript emit with React Refresh
 * 2. Wrapping emitted code with refresh registration
 * 3. Filtering entry modules
 * 4. Collecting static files and env vars
 *
 * @param project - ts-morph Project
 * @param modules - Compiled modules
 * @param staticFiles - Static files registry
 * @param envs - Environment variables
 * @param callbacks - Deferred callbacks to execute
 * @param options - Seal options
 * @returns Sealed build result
 */
export async function sealBuild(
  project: Project,
  modules: Record<string, ModuleCompilationResult>,
  staticFiles: StaticFilesRegistry,
  envs: EnvVars,
  callbacks: Array<() => Promise<void> | void>,
  options: SealOptions = {}
): Promise<SealedBuild> {
  const { skipEmit = false, refreshTransformer } = options;

  if (!skipEmit) {
    // Emit TypeScript with React Refresh transformer
    const customTransformers: any = {};

    if (refreshTransformer) {
      customTransformers.before = [
        refreshTransformer({
          refreshReg: "__v0_$RefreshReg$",
          refreshSig: "__v0_$RefreshSig$",
          ts: (await import("ts-morph")).ts,
        }),
      ];
    }

    const emitResult = project.emitToMemory({ customTransformers });

    // Process emitted files
    emitResult.getFiles().forEach((file) => {
      // Normalize path
      const filePath = normalizeModulePath(
        file.filePath,
        project.getCompilerOptions().paths
      );

      const module = modules[filePath];
      if (module) {
        // Wrap with React Refresh registration
        module.runtime = wrapWithRefresh(filePath, file.text);
      }
    });

    // Execute deferred callbacks
    for (const callback of callbacks) {
      await callback();
    }

    // Clear callbacks
    callbacks.length = 0;
  }

  return {
    entryModules: filterEntryModules(modules),
    modules,
    staticFiles,
    envs,
  };
}

/**
 * Normalize module path for consistent lookup
 *
 * @param filePath - File path from emit
 * @param paths - TypeScript path mappings
 * @returns Normalized path
 */
function normalizeModulePath(
  filePath: string,
  paths?: Record<string, string[]>
): string {
  // Remove leading slash if present
  let normalized = filePath.startsWith("/") ? filePath.slice(1) : filePath;

  // Apply path mappings in reverse (if needed)
  // This is a simplified version - full implementation would need
  // to reverse the path alias resolution

  return normalized;
}

// ============================================================================
// Static File Extraction
// ============================================================================

/**
 * Extract static files from a sealed build
 *
 * @param build - Sealed build result
 * @returns Static files registry
 */
export function extractStaticFiles(build: SealedBuild): StaticFilesRegistry {
  return build.staticFiles;
}

/**
 * Create a build manifest for the service worker
 *
 * @param build - Sealed build result
 * @returns Manifest object for SW initialization
 */
export function createBuildManifest(build: SealedBuild): {
  staticFiles: StaticFilesRegistry;
} {
  return {
    staticFiles: build.staticFiles,
  };
}

// ============================================================================
// Exports
// ============================================================================

export default {
  filterEntryModules,
  wrapWithRefresh,
  sealBuild,
  extractStaticFiles,
  createBuildManifest,
};
