/**
 * TypeScript Compiler Setup
 * Source: module_448763 (Lines 6175-6236)
 *
 * Initializes ts-morph Project with compiler options for v0 environment.
 * Configures TypeScript compiler for React JSX, path mapping, and type checking.
 */

import { Project, ScriptTarget, ts } from "ts-morph";
import { isFeatureEnabled } from "../features/featureFlags";

// ============================================================================
// Types
// ============================================================================

/**
 * TypeScript configuration from tsconfig.json
 */
export interface TSConfig {
  compilerOptions?: {
    paths?: Record<string, string[]>;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * File entry for tsconfig parsing
 * Tuple of [path, fileData]
 */
export type FileEntry = [
  path: string,
  fileData: {
    data: string;
    [key: string]: any;
  }
];

// ============================================================================
// Project Initialization
// ============================================================================

/**
 * Parse tsconfig.json from file entries
 *
 * @param files - Array of file entries
 * @param timestamp - Feature flag timestamp
 * @returns Parsed tsconfig or empty object
 */
function parseTSConfig(files: FileEntry[], timestamp?: number): TSConfig {
  const tsconfigEntry = files.find(
    ([path]) => path.toLowerCase() === "tsconfig.json"
  );

  if (!tsconfigEntry) {
    return {};
  }

  // Check if tsconfig-paths feature is enabled
  if (!isFeatureEnabled("tsconfig-paths", timestamp)) {
    return {};
  }

  try {
    return JSON.parse(tsconfigEntry[1].data);
  } catch (error) {
    console.warn("Failed to parse tsconfig.json", error);
    return {};
  }
}

/**
 * Create React type definitions for v0 environment
 * Provides minimal React types with use() hook support
 *
 * @returns Type definition string
 */
function createReactTypeDefinitions(): string {
  return `\
type __V0TaintedString<T> = string & {__v0tag:T}

declare module 'react' {
export function use<T>(p: Promise<T>): T
export function useState<T>(initial: T | (() => T)): [T, (v: T) => void]
export function useRef<T>(initial: T): {current: T}
export function useReducer<S, A>(reducer: (s: S, a: A) => S, initial: S): [S, (a: A) => void]
export function useMemo<T>(fn: () => T, deps: any[]): T
export function useCallback<T>(fn: T, deps: any[]): T
}
`;
}

/**
 * Initialize ts-morph Project with v0 compiler options
 *
 * Creates a TypeScript project configured for:
 * - React JSX with __v0__ import source
 * - In-memory file system
 * - Path mapping from tsconfig.json
 * - Isolated modules and declarations
 * - Minimal type checking for performance
 *
 * @param files - File entries (for tsconfig.json parsing)
 * @param timestamp - Feature flag timestamp
 * @returns Configured ts-morph Project
 *
 * @example
 * ```typescript
 * const project = createTypeScriptProject(files);
 * const sourceFile = project.createSourceFile('app.tsx', code);
 * ```
 */
export function createTypeScriptProject(
  files: FileEntry[],
  timestamp?: number
): Project {
  // Parse tsconfig.json if available
  const tsconfig = parseTSConfig(files, timestamp);

  // Extract path mappings
  const paths = tsconfig.compilerOptions?.paths || { "@/*": ["./*"] };

  // Create project with compiler options
  const project = new Project({
    compilerOptions: {
      // Target latest ECMAScript
      target: ScriptTarget.ESNext,

      // React JSX with custom import source
      jsx: ts.JsxEmit.ReactJSXDev,
      jsxImportSource: "__v0__",

      // Skip type checking for performance
      skipDefaultLibCheck: true,
      skipLibCheck: true,

      // Minimal lib for browser environment
      lib: ["lib.es5.d.ts"],

      // Don't emit helper functions
      noEmitHelpers: true,

      // Allow JavaScript files
      allowJs: true,
      checkJs: true,

      // Don't resolve external modules
      noResolve: true,

      // Path mappings from tsconfig.json
      paths,

      // No external types
      types: [],

      // Isolated compilation for performance
      isolatedDeclarations: true,
      isolatedModules: true,
    },

    // Use in-memory file system
    useInMemoryFileSystem: true,

    // Skip dependency resolution
    skipFileDependencyResolution: true,
    skipAddingFilesFromTsConfig: true,

    // Manipulation settings
    manipulationSettings: {
      usePrefixAndSuffixTextForRename: true,
    },
  });

  // Add React type definitions
  project.createSourceFile("__v0.d.ts", createReactTypeDefinitions());

  return project;
}

/**
 * Get compiler options from project
 *
 * @param project - ts-morph Project
 * @returns Compiler options
 */
export function getCompilerOptions(project: Project) {
  return project.getCompilerOptions();
}

/**
 * Get path mappings from project
 *
 * @param project - ts-morph Project
 * @returns Path mappings or undefined
 */
export function getPathMappings(
  project: Project
): Record<string, string[]> | undefined {
  return project.getCompilerOptions().paths;
}

/**
 * Create source file in project
 *
 * @param project - ts-morph Project
 * @param filePath - File path
 * @param sourceCode - Source code
 * @returns Created source file
 */
export function createSourceFile(
  project: Project,
  filePath: string,
  sourceCode: string
) {
  return project.createSourceFile(filePath, sourceCode, { overwrite: true });
}

/**
 * Get all source files from project
 *
 * @param project - ts-morph Project
 * @returns Array of source files
 */
export function getSourceFiles(project: Project) {
  return project.getSourceFiles();
}

/**
 * Get source file by path
 *
 * @param project - ts-morph Project
 * @param filePath - File path
 * @returns Source file or undefined
 */
export function getSourceFile(project: Project, filePath: string) {
  return project.getSourceFile(filePath);
}

// ============================================================================
// Exports
// ============================================================================

export default {
  createTypeScriptProject,
  getCompilerOptions,
  getPathMappings,
  createSourceFile,
  getSourceFiles,
  getSourceFile,
  parseTSConfig,
  createReactTypeDefinitions,
};
