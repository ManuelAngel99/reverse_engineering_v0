/**
 * Compiler Type Definitions
 */

export interface ModuleInfo {
  path: string;
  exported: string[];
  used: string[];
  dependencies: string[];
  code?: string;
  sourceMap?: string;
}

export interface CompilationContext {
  modules: Record<string, ModuleInfo>;
  cssModuleRawContent?: Record<string, string>;
  tsconfigPaths?: Record<string, string[]>;
  [key: string]: any;
}

export interface CompilationResult {
  modules: Record<string, ModuleInfo>;
  entryModules: string[];
  staticFiles: Record<string, { type: "raw" | "url"; content: string }>;
  errors?: string[];
}
