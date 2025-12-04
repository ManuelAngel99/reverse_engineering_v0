/**
 * Module Utilities
 *
 * Helper functions for module processing, path resolution, and dependency tracking.
 */

import { dirname, joinPath } from "../../shared/utils/module-exports";

/**
 * Module entry interface (extended from module-processing)
 */
export interface ModuleEntry {
  type: string;
  runtime?: string;
  used: string[];
  dependencies?: string[];
  [key: string]: any;
}

/**
 * Normalize module path
 *
 * Removes leading slashes and applies tsconfig path mappings
 *
 * @param path - Module path to normalize
 * @param tsconfigPaths - TypeScript path mappings
 * @returns Normalized path
 */
export function normalizePath(
  path: string,
  tsconfigPaths?: Record<string, string[]>
): string {
  // Remove leading slash
  let normalized = path.startsWith("/") ? path.slice(1) : path;

  // Apply tsconfig path mappings if provided
  if (tsconfigPaths) {
    for (const [pattern, replacements] of Object.entries(tsconfigPaths)) {
      // Handle @/* pattern
      if (pattern === "@/*" && normalized.startsWith("@/")) {
        const replacement = replacements[0]?.replace("/*", "") || ".";
        normalized = normalized.replace("@/", `${replacement}/`);
        break;
      }

      // Handle other patterns
      const patternRegex = new RegExp(
        "^" + pattern.replace("*", "(.*)").replace("/", "\\/") + "$"
      );
      const match = normalized.match(patternRegex);
      if (match && replacements[0]) {
        normalized = replacements[0].replace("*", match[1] || "");
        break;
      }
    }
  }

  return normalized;
}

/**
 * Get or create module entry
 *
 * Ensures a module entry exists in the modules map
 *
 * @param path - Module path
 * @param modules - Modules map
 * @returns Module entry
 */
export function getOrCreateModuleEntry(
  path: string,
  modules: Record<string, ModuleEntry>
): ModuleEntry {
  if (!modules[path]) {
    modules[path] = {
      type: "script",
      used: [],
    };
  }
  return modules[path];
}

/**
 * Track dependency between modules
 *
 * Adds a dependency to a module's dependency list
 *
 * @param module - Module entry
 * @param dependency - Dependency path
 */
export function trackDependency(module: ModuleEntry, dependency: string): void {
  if (!module.dependencies) {
    module.dependencies = [];
  }
  if (!module.dependencies.includes(dependency)) {
    module.dependencies.push(dependency);
  }
}

/**
 * Join path segments with proper normalization
 *
 * Wrapper around joinPath that also handles:
 * - Removing duplicate slashes
 * - Resolving . and .. segments
 *
 * @param segments - Path segments to join
 * @returns Joined path
 */
export function joinPaths(...segments: string[]): string {
  return joinPath(...segments)
    .replace(/\/\.\//g, "/") // Remove /./ segments
    .replace(/\/[^/]+\/\.\.\//g, "/") // Resolve /../ segments
    .replace(/^\.\//, ""); // Remove leading ./
}

/**
 * Resolve import path relative to current file
 *
 * Handles:
 * - Relative imports (./file, ../file)
 * - Absolute imports (@/file)
 * - Package imports (package-name)
 *
 * @param importPath - Import specifier
 * @param fromPath - Current file path
 * @returns Resolved path
 */
export function resolveImportPath(
  importPath: string,
  fromPath: string
): string {
  // Handle absolute imports
  if (importPath.startsWith("@/")) {
    return `@v0/${importPath.slice(2)}`;
  }

  // Handle relative imports
  if (importPath.startsWith(".")) {
    return joinPaths(dirname(fromPath), importPath);
  }

  // Package imports remain unchanged
  return importPath;
}

/**
 * Check if a path is a CSS module
 *
 * @param path - File path
 * @returns True if path ends with .module.css
 */
export function isCSSModule(path: string): boolean {
  return path.endsWith(".module.css");
}

/**
 * Check if a path is a CSS file
 *
 * @param path - File path
 * @returns True if path ends with .css
 */
export function isCSSFile(path: string): boolean {
  return path.endsWith(".css");
}

/**
 * Check if a path is a TypeScript/JavaScript file
 *
 * @param path - File path
 * @returns True if path is a script file
 */
export function isScriptFile(path: string): boolean {
  return /\.(tsx?|jsx?|mjs|cjs)$/.test(path);
}

/**
 * Check if a path is a JSON file
 *
 * @param path - File path
 * @returns True if path ends with .json
 */
export function isJSONFile(path: string): boolean {
  return path.endsWith(".json");
}

/**
 * Get file extension from path
 *
 * @param path - File path
 * @returns File extension (without dot)
 */
export function getFileExtension(path: string): string {
  const lastDot = path.lastIndexOf(".");
  if (lastDot === -1) return "";
  return path.slice(lastDot + 1);
}
