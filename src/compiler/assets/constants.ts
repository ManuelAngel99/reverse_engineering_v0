/**
 * Asset Constants
 * Source: module_448763_wo_first_layer.js (LOC 266-299)
 *
 * File extensions for static assets that should be handled specially
 * during module resolution and URL transformation.
 */

/**
 * Static asset file extensions
 * These extensions are recognized as static assets and may be:
 * - Transformed to resource URIs
 * - Loaded via the service worker
 * - Cached differently than code modules
 */
export const STATIC_ASSET_EXTENSIONS = [
  // Images
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "avif",
  "bmp",
  "svg",
  "ico",

  // Video
  "mp4",
  "webm",

  // Audio
  "mp3",
  "wav",
  "ogg",
  "flac",
  "m4a",
  "aac",

  // 3D Models
  "gltf",
  "glb",
  "obj",
  "fbx",
  "mtl",
  "stl",

  // Fonts
  "ttf",
  "woff",
  "woff2",
  "otf",

  // Other
  "wasm",
  "pdf",
  "exe",
  "dll",
  "bin",
] as const;

/**
 * Type for static asset extensions
 */
export type StaticAssetExtension = (typeof STATIC_ASSET_EXTENSIONS)[number];

/**
 * Check if a file path has a static asset extension
 */
export function isStaticAsset(path: string): boolean {
  const extension = path.split(".").pop()?.toLowerCase();
  return extension
    ? STATIC_ASSET_EXTENSIONS.includes(extension as StaticAssetExtension)
    : false;
}

/**
 * Check if a URL points to a static asset based on common path patterns
 */
export function isStaticAssetPath(path: string): boolean {
  const staticPaths = ["/models/", "/assets/", "/textures/", "/images/"];
  return staticPaths.some((prefix) => path.startsWith(prefix));
}
