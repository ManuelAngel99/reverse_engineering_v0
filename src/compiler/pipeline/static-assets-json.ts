/**
 * Static Assets & JSON Processing
 * Source: module_448763 (Lines 7269-7346)
 *
 * Handles static file registration and JSON file processing.
 * Static files are stored with type (raw/url) and content.
 * JSON files are converted to ES modules with both default and named exports.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Static file entry - can be raw content or URL reference
 */
export interface StaticFileEntry {
  type: "raw" | "url";
  content: string;
}

/**
 * Static files registry
 */
export type StaticFilesRegistry = Record<string, StaticFileEntry>;

/**
 * File tuple from compilation input
 * [path, { type: 'url' | 'file', data: string }]
 */
export type FileTuple = [string, { type: "url" | "file"; data: string }];

/**
 * Environment variables parsed from .env files
 */
export type EnvVars = Record<string, string>;

// ============================================================================
// Constants
// ============================================================================

/**
 * MIME types by extension
 */
export const MIME_TYPES: Record<string, string> = {
  // Images
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  avif: "image/avif",
  bmp: "image/bmp",

  // Video
  mp4: "video/mp4",
  webm: "video/webm",

  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  flac: "audio/flac",
  m4a: "audio/mp4",
  aac: "audio/aac",

  // Fonts
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
  otf: "font/otf",

  // Other
  pdf: "application/pdf",
  wasm: "application/wasm",
  json: "application/json",
};

/**
 * Regex for parsing .env files
 * Matches: KEY=value or KEY="value" or KEY='value'
 */
const ENV_VAR_PATTERN = /^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/gim;

// ============================================================================
// Static File Processing
// ============================================================================

/**
 * Add a static file to the registry
 *
 * @param staticFiles - Static files registry
 * @param path - File path (without /@v0 prefix)
 * @param fileTuple - File tuple with type and data
 */
export function addStaticFile(
  staticFiles: StaticFilesRegistry,
  path: string,
  fileTuple: FileTuple
): void {
  const [, fileData] = fileTuple;

  if (fileData.type === "url") {
    staticFiles[path] = { type: "url", content: fileData.data };
  } else {
    staticFiles[path] = { type: "raw", content: fileData.data };
  }
}

/**
 * Get MIME type for a file path
 *
 * @param path - File path
 * @returns MIME type string
 */
export function getMimeType(path: string): string {
  const ext = path.slice(path.lastIndexOf(".") + 1).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

/**
 * Create a data URL for binary content
 *
 * @param path - File path (for MIME type detection)
 * @param data - Binary data as string
 * @returns Data URL
 */
export function createDataURL(path: string, data: string): string {
  const mimeType = getMimeType(path);
  const base64 = btoa(data);
  return `data:${mimeType};base64,${base64}`;
}

// ============================================================================
// JSON Processing
// ============================================================================

/**
 * Process a JSON file into an ES module
 *
 * Converts JSON to a module with:
 * - Default export of the entire object
 * - Named exports for each top-level key
 *
 * @param path - Module path
 * @param source - JSON source string
 * @returns ES module code
 */
export function processJSONFile(path: string, source: string): string {
  // Parse JSON to validate and get keys
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(source);
  } catch (e) {
    console.error(
      `addJSONDependency: Invalid JSON in ${path}:`,
      e,
      ". Source:",
      source
    );
  }

  // Escape line/paragraph separators for security
  const escapedSource = source
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  // Generate named exports for each key
  const namedExports = Object.keys(parsed)
    .map((key, index) => {
      const jsonKey = JSON.stringify(key);
      return `const v_${index} = v[${jsonKey}]; export { v_${index} as ${jsonKey} };`;
    })
    .join("\n");

  return `\
const v = ${escapedSource}
export default v
${namedExports}`;
}

// ============================================================================
// Environment File Processing
// ============================================================================

/**
 * Parse an .env file into key-value pairs
 *
 * Handles:
 * - KEY=value
 * - KEY="quoted value"
 * - KEY='single quoted'
 * - export KEY=value
 * - Escape sequences in double-quoted values
 *
 * @param source - .env file content
 * @returns Parsed environment variables
 */
export function parseEnvFile(source: string): EnvVars {
  const envs: EnvVars = {};

  // Normalize line endings
  const normalized = source.replace(/\r\n?/gm, "\n");

  let match: RegExpExecArray | null;
  while ((match = ENV_VAR_PATTERN.exec(normalized)) !== null) {
    const [, key] = match;
    if (!key) continue;

    let value = match[2] || "";
    value = value.trim();

    const firstChar = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

    // Handle escape sequences in double-quoted strings
    if (firstChar === '"') {
      value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    }

    envs[key] = value;
  }

  return envs;
}

/**
 * Add environment variables from an .env file
 *
 * @param envs - Existing environment variables
 * @param source - .env file content
 */
export function addEnvFile(envs: EnvVars, source: string): void {
  Object.assign(envs, parseEnvFile(source));
}

// ============================================================================
// Image Asset Module Generation
// ============================================================================

/**
 * Generate an ES module for an image asset
 *
 * Creates a module that exports image metadata compatible with next/image:
 * - src: URL or data URL
 * - height/width: Placeholder dimensions
 * - blurDataURL: Placeholder blur image
 *
 * @param fileTuple - File tuple with type and data
 * @param path - File path
 * @returns ES module code
 */
export function generateImageModule(
  fileTuple: FileTuple,
  path: string
): string {
  const [, fileData] = fileTuple;

  const src =
    fileData.type === "url"
      ? fileData.data
      : createDataURL(path, fileData.data);

  return `\
export default {
  src: ${JSON.stringify(src)},
  height: 100,
  width: 100,
  blurDataURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
}`;
}

// ============================================================================
// Exports
// ============================================================================

export default {
  addStaticFile,
  getMimeType,
  createDataURL,
  processJSONFile,
  parseEnvFile,
  addEnvFile,
  generateImageModule,
  MIME_TYPES,
};
