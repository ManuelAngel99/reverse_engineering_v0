/**
 * File System Hydration
 * Source: module_448763 (Lines 517-555)
 *
 * Hydrates an in-memory file system (memfs) from file data or URLs.
 * Enables browser-based filesystem operations for Node.js compatibility.
 */

import type { IFs } from "memfs";

// ============================================================================
// Types
// ============================================================================

/**
 * File entry in the virtual filesystem
 */
export type FileEntry =
  | { type: "file"; data: string }
  | { type: "url"; data: string };

/**
 * File map for hydration
 */
export type FileMap = Map<string, FileEntry>;

/**
 * JSON representation of filesystem
 */
export type FileSystemJSON = Record<string, string>;

// ============================================================================
// File System Hydration
// ============================================================================

/**
 * Hydrate an in-memory file system from file entries
 *
 * This function populates a memfs volume with files from two sources:
 * 1. Direct file data (type: "file") - loaded synchronously
 * 2. URL-based files (type: "url") - fetched asynchronously
 *
 * @param vol - memfs volume instance
 * @param files - Map of file paths to file entries
 * @returns Promise that resolves when all files are loaded
 *
 * @example
 * ```typescript
 * import { vol } from 'memfs';
 *
 * const files = new Map([
 *   ['page.tsx', { type: 'file', data: 'export default () => <div/>' }],
 *   ['image.png', { type: 'url', data: 'https://example.com/image.png' }]
 * ]);
 *
 * await hydrateFileSystem(vol, files);
 * ```
 */
export async function hydrateFileSystem(
  vol: IFs,
  files: FileMap
): Promise<void> {
  // Separate synchronous and asynchronous file loading
  const syncFiles: FileSystemJSON = {};
  const asyncPromises: Promise<void>[] = [];

  for (const [filePath, entry] of files) {
    if (entry.type === "file") {
      // Direct file data - load synchronously
      syncFiles[filePath] = entry.data;
    } else if (entry.type === "url") {
      // URL-based file - fetch asynchronously
      asyncPromises.push(
        fetch(entry.data).then(async (response) => {
          if (!response.ok) {
            console.error(
              `Failed to load file ${filePath} from ${entry.data}.`
            );
            throw new Error(
              `Failed to load file "${filePath}" from the file system.`
            );
          }

          // Get file content as ArrayBuffer
          const arrayBuffer = await response.arrayBuffer();

          // Create parent directories if they don't exist
          const dirPath = filePath.split("/").slice(0, -1).join("/");
          if (dirPath) {
            vol.mkdirSync(dirPath, { recursive: true });
          }

          // Write file to virtual filesystem
          vol.writeFileSync(filePath, new Uint8Array(arrayBuffer));
        })
      );
    }
  }

  // Reset volume and load synchronous files
  vol.reset();
  vol.fromJSON(syncFiles, "/");

  // Wait for all asynchronous file loads to complete
  await Promise.all(asyncPromises);
}

/**
 * Initialize memfs and hydrate with files
 *
 * This is the main entry point for setting up the virtual filesystem.
 * It dynamically imports memfs and populates it with the provided files.
 *
 * @param files - Optional file map to hydrate
 * @returns Promise resolving to memfs module with initialized volume
 *
 * @example
 * ```typescript
 * const memfs = await initializeMemfs(files);
 * const fs = memfs.fs;
 * const vol = memfs.vol;
 *
 * // Use fs like Node.js fs module
 * fs.readFileSync('/page.tsx', 'utf-8');
 * ```
 */
export async function initializeMemfs(files?: FileMap): Promise<any> {
  // Dynamically import memfs
  const memfs = await import("memfs");

  // Store volume in globals for access across modules
  if (typeof window !== "undefined") {
    (window as any).__v0_internal_fs_vol = memfs.vol;
  }

  // Hydrate filesystem if files provided
  if (files && files.size > 0) {
    await hydrateFileSystem(memfs.vol, files);
  }

  return memfs;
}

/**
 * Get the current memfs volume
 *
 * @returns memfs volume instance or undefined
 */
export function getVolume(): IFs | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as any).__v0_internal_fs_vol;
}

/**
 * Check if memfs is initialized
 *
 * @returns True if memfs volume exists
 */
export function isMemfsInitialized(): boolean {
  return getVolume() !== undefined;
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Create a file map from a simple object
 *
 * @param files - Object mapping file paths to content
 * @returns FileMap for hydration
 *
 * @example
 * ```typescript
 * const fileMap = createFileMap({
 *   'page.tsx': 'export default () => <div/>',
 *   'layout.tsx': 'export default ({ children }) => <html>{children}</html>'
 * });
 * ```
 */
export function createFileMap(files: Record<string, string>): FileMap {
  const fileMap = new Map<string, FileEntry>();

  for (const [path, content] of Object.entries(files)) {
    fileMap.set(path, { type: "file", data: content });
  }

  return fileMap;
}

/**
 * Add a file to an existing volume
 *
 * @param vol - memfs volume
 * @param filePath - File path
 * @param content - File content
 */
export function addFile(vol: IFs, filePath: string, content: string): void {
  // Create parent directories
  const dirPath = filePath.split("/").slice(0, -1).join("/");
  if (dirPath) {
    vol.mkdirSync(dirPath, { recursive: true });
  }

  // Write file
  vol.writeFileSync(filePath, content, "utf-8");
}

/**
 * Remove a file from the volume
 *
 * @param vol - memfs volume
 * @param filePath - File path
 */
export function removeFile(vol: IFs, filePath: string): void {
  if (vol.existsSync(filePath)) {
    vol.unlinkSync(filePath);
  }
}

/**
 * List all files in the volume
 *
 * @param vol - memfs volume
 * @param dirPath - Directory path (default: '/')
 * @returns Array of file paths
 */
export function listFiles(vol: IFs, dirPath: string = "/"): string[] {
  const files: string[] = [];

  function traverse(currentPath: string): void {
    const entries = vol.readdirSync(currentPath);

    for (const entry of entries) {
      const fullPath = `${currentPath}/${entry}`.replace(/\/+/g, "/");
      const stats = vol.statSync(fullPath);

      if (stats.isDirectory()) {
        traverse(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  if (vol.existsSync(dirPath)) {
    traverse(dirPath);
  }

  return files;
}
