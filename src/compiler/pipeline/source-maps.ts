/**
 * Source Map Generation
 * Source: module_448763 (Lines 832-838)
 *
 * Generates and encodes source maps for compiled JavaScript.
 * Enables accurate error locations and debugger breakpoints.
 */

import { encode } from "@jridgewell/sourcemap-codec";

// ============================================================================
// Types
// ============================================================================

/**
 * Source map options
 */
export interface SourceMapOptions {
  /** Source file name */
  source: string;
  /** Original source code */
  sourceContent: string;
  /** Generated code */
  generatedCode: string;
  /** Source root (optional) */
  sourceRoot?: string;
}

/**
 * Source map object (simplified)
 */
export interface SourceMap {
  version: number;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
}

// ============================================================================
// Source Map Generation
// ============================================================================

/**
 * Generate a basic source map
 * Creates a 1:1 mapping between source and generated code
 *
 * @param options - Source map options
 * @returns Source map object
 */
export function generateSourceMap(options: SourceMapOptions): SourceMap {
  const { source, sourceContent, generatedCode, sourceRoot } = options;

  // For now, create a simple identity mapping
  // In a full implementation, this would track actual transformations
  const sourceLines = sourceContent.split("\n");
  const generatedLines = generatedCode.split("\n");

  // Create mappings array (one per generated line)
  // Format: [generatedColumn, sourceIndex, sourceLine, sourceColumn, nameIndex]
  const mappings: [number, number, number, number, number][][] = [];

  for (let i = 0; i < generatedLines.length; i++) {
    // Each line maps to the same line in source
    mappings.push([[0, 0, Math.min(i, sourceLines.length - 1), 0, 0]]);
  }

  return {
    version: 3,
    sources: [source],
    sourcesContent: [sourceContent],
    names: [],
    mappings: encode(mappings),
    sourceRoot,
  };
}

/**
 * Encode source map to base64 string
 *
 * @param sourceMap - Source map object
 * @returns Base64 encoded source map
 */
export function encodeSourceMapToBase64(sourceMap: SourceMap): string {
  const json = JSON.stringify(sourceMap);

  // In browser environment
  if (typeof btoa !== "undefined") {
    return btoa(json);
  }

  // In Node.js environment
  if (typeof Buffer !== "undefined") {
    return Buffer.from(json).toString("base64");
  }

  throw new Error("No base64 encoding available");
}

/**
 * Create inline source map comment
 *
 * @param sourceMap - Source map object
 * @returns Source map comment string
 */
export function createInlineSourceMapComment(sourceMap: SourceMap): string {
  const base64 = encodeSourceMapToBase64(sourceMap);
  return `//# sourceMappingURL=data:application/json;base64,${base64}`;
}

/**
 * Create external source map comment
 *
 * @param sourceMapPath - Path to external source map file
 * @returns Source map comment string
 */
export function createExternalSourceMapComment(sourceMapPath: string): string {
  return `//# sourceMappingURL=${sourceMapPath}`;
}

/**
 * Append source map to code
 *
 * @param code - Generated code
 * @param sourceMap - Source map object
 * @param inline - Whether to inline the source map (default: true)
 * @returns Code with source map comment
 */
export function appendSourceMap(
  code: string,
  sourceMap: SourceMap,
  inline: boolean = true
): string {
  const comment = inline
    ? createInlineSourceMapComment(sourceMap)
    : createExternalSourceMapComment(`${sourceMap.file}.map`);

  return `${code}\n${comment}`;
}

// ============================================================================
// Source Map Utilities
// ============================================================================

/**
 * Extract source map comment from code
 *
 * @param code - Code with source map comment
 * @returns Source map comment or null
 */
export function extractSourceMapComment(code: string): string | null {
  const match = code.match(/\/\/# sourceMappingURL=(.+)$/m);
  return match ? match[1] : null;
}

/**
 * Remove source map comment from code
 *
 * @param code - Code with source map comment
 * @returns Code without source map comment
 */
export function removeSourceMapComment(code: string): string {
  return code.replace(/\/\/# sourceMappingURL=.+$/m, "").trim();
}

/**
 * Decode inline source map from comment
 *
 * @param comment - Source map comment
 * @returns Decoded source map or null
 */
export function decodeInlineSourceMap(comment: string): SourceMap | null {
  const match = comment.match(/^data:application\/json;base64,(.+)$/);
  if (!match) return null;

  try {
    const base64 = match[1];
    let json: string;

    // In browser environment
    if (typeof atob !== "undefined") {
      json = atob(base64);
    }
    // In Node.js environment
    else if (typeof Buffer !== "undefined") {
      json = Buffer.from(base64, "base64").toString("utf-8");
    } else {
      return null;
    }

    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ============================================================================
// Exports
// ============================================================================

// All exports are already declared above with export keyword
