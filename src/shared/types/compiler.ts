/**
 * Compiler Types
 *
 * Type definitions for the v0 compiler system including module loading,
 * TypeScript compilation, and code transformation.
 *
 * Source: module_448763 (b114f950a0cd6ced.js)
 */

// ============================================================================
// Module System Types
// ============================================================================

/**
 * Module exports stored in the global registry
 */
export interface ModuleExports {
  default?: any;
  [key: string]: any;
}

/**
 * Module metadata stored in window.__v0_modules__
 */
export interface V0Module {
  /** Blob URL for dynamic import */
  url?: string;
  /** Module exports */
  exports: ModuleExports | null;
  /** Hot Module Replacement API */
  hot?: {
    accept: () => void;
    decline: () => void;
    dispose: (callback: () => void) => void;
  };
}

/**
 * Global module registry
 * Maps module IDs to their exports and metadata
 */
export interface ModuleRegistry {
  [moduleId: string]: ModuleExports;
}

/**
 * Lazy module loader function
 * Returns a promise that resolves to module exports
 */
export type LazyModuleLoader = (() => Promise<ModuleExports>) & {
  __lazy?: boolean;
};

/**
 * Lazy module registry
 * Maps package names to their lazy loader functions
 */
export interface LazyModuleRegistry {
  [packageName: string]: LazyModuleLoader;
}

/**
 * Blob URL cache for modules
 * Maps module IDs to their blob URLs
 */
export interface BlobUrlCache {
  [moduleId: string]: string;
}

/**
 * Source code cache for HMR comparison
 * Maps module IDs to their source code
 */
export type SourceCodeCache = Map<string, string>;

/**
 * Blob to module name mapping for debugging
 */
export interface BlobToModuleMap {
  [blobUrl: string]: string;
}

// ============================================================================
// TypeScript Compilation Types
// ============================================================================

/**
 * TypeScript compilation options
 */
export interface CompilationOptions {
  /** Source filename */
  filename: string;
  /** Source code */
  code: string;
  /** Enable React Refresh transformation */
  reactRefresh?: boolean;
  /** Enable source maps */
  sourceMap?: boolean;
  /** Target ECMAScript version */
  target?: string;
  /** Module system (ESNext, CommonJS, etc.) */
  module?: string;
  /** JSX transformation mode */
  jsx?: "react" | "react-jsx" | "react-jsxdev";
}

/**
 * Compilation result
 */
export interface CompilationResult {
  /** Transformed code */
  code: string;
  /** Source map (base64 encoded) */
  sourceMap?: string;
  /** Blob URL for dynamic import */
  blobUrl?: string;
  /** Compilation errors */
  errors?: CompilationError[];
}

/**
 * TypeScript diagnostic error
 */
export interface CompilationError {
  /** Error code */
  code: number;
  /** Error message */
  message: string;
  /** File name */
  fileName: string;
  /** Line number (1-indexed) */
  line: number;
  /** Column number (1-indexed) */
  column: number;
  /** Error length in characters */
  length: number;
  /** Error context (surrounding code) */
  context?: string;
}

/**
 * React Refresh registration function
 */
export type RefreshRegFunction = (type: any, id: string) => void;

/**
 * React Refresh signature function
 */
export type RefreshSigFunction = () => (type: any, key: string) => void;

/**
 * File content with metadata
 */
export interface FileContent {
  /** File data/code */
  data: string;
  /** File type */
  type?: string;
  /** File metadata */
  metadata?: Record<string, any>;
}

/**
 * Compiled module output
 */
export interface CompiledModule {
  /** Module path */
  path: string;
  /** Compiled JavaScript code */
  code: string;
  /** Runtime wrapper with HMR */
  runtime?: string;
  /** Source map */
  sourceMap?: string;
  /** Module exports */
  exports?: string[];
}

/**
 * Compilation context
 */
export interface CompilationContext {
  /** Input files */
  files: Map<string, FileContent>;
  /** Default entry path */
  defaultPath?: string;
  /** Creation timestamp */
  createdAt?: number;
  /** Existing project for incremental compilation */
  existingProject?: any;
  /** tsconfig.json paths */
  tsconfigPaths?: Record<string, string[]>;
}

// ============================================================================
// Module Creation Types
// ============================================================================

/**
 * Options for creating a module blob
 */
export interface CreateModuleOptions {
  /** Module ID */
  moduleId: string;
  /** Module exports */
  exports: ModuleExports;
  /** Whether to track in HMR system */
  shouldTrack?: boolean;
}

/**
 * Options for creating a runtime module
 */
export interface CreateRuntimeModuleOptions {
  /** Module name/ID */
  name: string;
  /** Source code */
  sourceCode: string;
  /** Whether this is a runtime module (vs user module) */
  isRuntime?: boolean;
  /** HMR invalidation callback */
  hmrCallback?: (newCode: string) => void;
}

/**
 * Module wrapper format options
 */
export interface ModuleWrapperOptions {
  /** Module ID */
  moduleId: string;
  /** Module exports object */
  exports: ModuleExports;
  /** Source file name for source maps */
  sourceFileName?: string;
}

// ============================================================================
// Font System Types
// ============================================================================

/**
 * Next.js font configuration
 */
export interface NextFontConfig {
  /** Font family name */
  family?: string;
  /** Font weights */
  weight?: string | string[];
  /** Font styles */
  style?: string | string[];
  /** Font subsets */
  subsets?: string[];
  /** Font display strategy */
  display?: "auto" | "block" | "swap" | "fallback" | "optional";
  /** Preload font */
  preload?: boolean;
  /** Fallback fonts */
  fallback?: string[];
  /** Adjust font metrics */
  adjustFontFallback?: boolean;
  /** Variable font */
  variable?: string;
}

/**
 * Next.js local font configuration
 */
export interface NextLocalFontConfig extends NextFontConfig {
  /** Font source file paths */
  src:
    | string
    | Array<{
        path: string;
        weight?: string;
        style?: string;
      }>;
}

/**
 * Font module exports (Geist Sans/Mono)
 */
export interface FontModuleExports {
  /** CSS class name */
  className: string;
  /** CSS variable name */
  variable: string;
  /** Font style object */
  style?: {
    fontFamily: string;
    fontWeight?: string | number;
    fontStyle?: string;
  };
}

// ============================================================================
// Virtual File System Types
// ============================================================================

/**
 * memfs volume interface (simplified)
 */
export interface MemfsVolume {
  /** File system promises API */
  promises: {
    readFile: (path: string, encoding?: string) => Promise<string | Buffer>;
    writeFile: (path: string, data: string | Buffer) => Promise<void>;
    readdir: (path: string) => Promise<string[]>;
    mkdir: (path: string, options?: { recursive?: boolean }) => Promise<void>;
    stat: (path: string) => Promise<any>;
    unlink: (path: string) => Promise<void>;
    rmdir: (path: string) => Promise<void>;
  };
  /** Synchronous file system API */
  readFileSync: (path: string, encoding?: string) => string | Buffer;
  writeFileSync: (path: string, data: string | Buffer) => void;
  readdirSync: (path: string) => string[];
  mkdirSync: (path: string, options?: { recursive?: boolean }) => void;
  statSync: (path: string) => any;
  unlinkSync: (path: string) => void;
  rmdirSync: (path: string) => void;
  existsSync: (path: string) => boolean;
}

/**
 * File metadata for virtual file system
 */
export interface VirtualFileMetadata {
  /** File path */
  path: string;
  /** File content */
  content: string;
  /** File type */
  type: "file" | "directory";
  /** Last modified timestamp */
  mtime?: number;
}

// ============================================================================
// Package Resolution Types
// ============================================================================

/**
 * CDN package configuration
 */
export interface CDNPackageConfig {
  /** Package name */
  name: string;
  /** Package version */
  version: string;
  /** CDN URL */
  url: string;
  /** Package exports */
  exports?: Record<string, string>;
}

/**
 * Package alias mapping
 */
export interface PackageAliases {
  [packageName: string]: string | CDNPackageConfig;
}

/**
 * Import map for module resolution
 */
export interface ImportMap {
  imports: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

// ============================================================================
// Global Window Extensions
// ============================================================================

declare global {
  interface Window {
    /** Global module registry */
    __v0_modules__: ModuleRegistry;
    /** React reference */
    React: any;
    /** Timestamp for feature flags */
    __v0_ts?: number;
    /** Internal timestamp */
    internal_ts?: number;
    /** React Refresh registration */
    __v0_$RefreshReg$?: RefreshRegFunction;
    /** React Refresh signature */
    __v0_$RefreshSig$?: RefreshSigFunction;
    /** React Refresh runtime */
    __v0_refreshRuntime?: {
      register: (type: any, id: string) => void;
      createSignatureFunctionForTransform: RefreshSigFunction;
      performReactRefresh: () => void;
    };
    /** RSC Refresh registration */
    __v0_rscRefreshRegister?: (type: any, id: string) => void;
    /** Next.js middleware function */
    __v0_middleware?: (request: any) => Promise<any> | any;
  }
}

export {};
