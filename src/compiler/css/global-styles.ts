/**
 * Global Styles Handler
 * Source: module_448763_wo_first_layer.js (LOC 1601-1621)
 *
 * Handles loading and injection of global CSS files (globals.css).
 * Manages style element lifecycle and HMR cleanup.
 */

import type {
  GlobalStylesConfig,
  StyleRegistryEntry,
} from "@/shared/types/css";
import { loadTailwindConfig } from "./tailwind-config";

/**
 * Style registry for tracking injected styles (for HMR)
 */
const styleRegistry = new Map<string, StyleRegistryEntry>();

/**
 * Find globals.css file in the project
 *
 * Searches in standard Next.js locations:
 * - app/globals.css
 * - src/app/globals.css
 *
 * @param modules - Available modules map
 * @returns Path to globals.css or null if not found
 */
export function findGlobalStyles(modules: Record<string, any>): string | null {
  if ("@v0/app/globals.css" in modules) {
    return "@v0/app/globals.css";
  }

  if ("@v0/src/app/globals.css" in modules) {
    return "@v0/src/app/globals.css";
  }

  return null;
}

/**
 * Check if layout file exists
 *
 * Layout files affect how global styles are rendered
 *
 * @param modules - Available modules map
 * @returns True if layout exists
 */
export function hasLayout(modules: Record<string, any>): boolean {
  return !!(modules["@v0/app/layout"] || modules["@v0/src/app/layout"]);
}

/**
 * Load global styles configuration
 *
 * Matches v0's Nl() function (LOC 1601-1621)
 *
 * @param modules - Available modules map
 * @param importEntry - Function to dynamically import modules
 * @param timestamp - Optional timestamp for feature flags
 * @returns Global styles default export or null
 */
export async function loadGlobalStyles(
  modules: Record<string, any>,
  importEntry: (path: string) => Promise<any>,
  timestamp?: number
): Promise<any> {
  const globalsPath = findGlobalStyles(modules);
  if (!globalsPath) {
    return null;
  }

  const hasLayoutFile = hasLayout(modules);

  // If there's a layout, styles are handled by the layout
  // If no layout, import and return the default export
  const defaultExport = globalsPath
    ? hasLayoutFile
      ? null
      : (await importEntry(globalsPath)).default
    : null;

  // Clean up old default styles if no layout
  if (globalsPath && !hasLayoutFile) {
    const oldElement = document.getElementById("default-global-styles");
    if (oldElement) {
      oldElement.innerHTML = "";
      oldElement.remove();
    }
  }

  // Load Tailwind config (matches v0's Ns(e, t) call)
  await loadTailwindConfig(modules, importEntry, timestamp);

  return defaultExport;
}

/**
 * Inject styles into document head
 *
 * Creates a <style> element with the given CSS
 *
 * @param id - Unique identifier for the style element
 * @param css - CSS content to inject
 * @param path - Source path for tracking
 * @returns The created style element
 */
export function injectStyles(
  id: string,
  css: string,
  path: string
): HTMLStyleElement {
  // Check if style already exists
  let styleElement = document.getElementById(id) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = id;
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = css;

  // Register in style registry
  styleRegistry.set(id, {
    id,
    path,
    element: styleElement,
    content: css,
    dependencies: [],
    timestamp: Date.now(),
  });

  return styleElement;
}

/**
 * Cleanup styles (remove from DOM)
 *
 * Used during HMR to remove old styles before injecting new ones
 *
 * @param id - Style element ID to remove
 */
export function cleanupStyles(id: string): void {
  const entry = styleRegistry.get(id);

  if (entry) {
    // Remove from DOM
    if (entry.element.parentNode) {
      entry.element.parentNode.removeChild(entry.element);
    }

    // Remove from registry
    styleRegistry.delete(id);
  }
}

/**
 * Cleanup all styles
 *
 * Removes all registered styles from DOM
 */
export function cleanupAllStyles(): void {
  for (const [id] of styleRegistry) {
    cleanupStyles(id);
  }
}

/**
 * Get style registry
 *
 * Returns all currently registered styles
 *
 * @returns Map of style entries
 */
export function getStyleRegistry(): Map<string, StyleRegistryEntry> {
  return styleRegistry;
}

/**
 * Update style dependencies
 *
 * Tracks which files a style depends on (for HMR invalidation)
 *
 * @param id - Style element ID
 * @param dependencies - Array of dependency paths
 */
export function updateStyleDependencies(
  id: string,
  dependencies: string[]
): void {
  const entry = styleRegistry.get(id);

  if (entry) {
    entry.dependencies = dependencies;
  }
}

/**
 * Invalidate styles by dependency
 *
 * Finds all styles that depend on a given path and marks them for reload
 *
 * @param path - Dependency path that changed
 * @returns Array of style IDs that need to be reloaded
 */
export function invalidateStylesByDependency(path: string): string[] {
  const invalidated: string[] = [];

  for (const [id, entry] of styleRegistry) {
    if (entry.dependencies.includes(path)) {
      invalidated.push(id);
    }
  }

  return invalidated;
}

/**
 * Inject default global styles
 *
 * Used when no layout exists - styles are injected directly
 *
 * @param modules - Available modules map
 * @param importEntry - Function to import modules
 * @returns The imported default export (style component) or null
 */
export async function injectDefaultGlobalStyles(
  modules: Record<string, any>,
  importEntry: (path: string) => Promise<any>
): Promise<any> {
  const globalsPath = findGlobalStyles(modules);
  if (!globalsPath) {
    return null;
  }

  const hasLayoutFile = hasLayout(modules);

  // If there's a layout, styles are handled by the layout
  if (hasLayoutFile) {
    return null;
  }

  // No layout - import and inject styles directly
  try {
    const stylesModule = await importEntry(globalsPath);

    // Clean up old default styles
    const oldElement = document.getElementById("default-global-styles");
    if (oldElement) {
      oldElement.innerHTML = "";
      oldElement.remove();
    }

    return stylesModule.default || null;
  } catch (error) {
    console.warn("Failed to inject default global styles:", error);
    return null;
  }
}

/**
 * Get CSS ordering priority
 *
 * Determines the order in which styles should be injected
 * Lower numbers = higher priority (injected first)
 *
 * @param path - Style file path
 * @returns Priority number
 */
export function getStylePriority(path: string): number {
  // Global styles first
  if (path.includes("globals.css")) {
    return 0;
  }

  // Tailwind config styles
  if (path.includes("tailwind")) {
    return 1;
  }

  // Component styles
  if (path.includes("components/")) {
    return 2;
  }

  // Page styles
  if (path.includes("app/") || path.includes("pages/")) {
    return 3;
  }

  // Everything else
  return 4;
}

/**
 * Sort styles by priority
 *
 * Ensures styles are injected in the correct order
 *
 * @param styles - Array of style entries
 * @returns Sorted array
 */
export function sortStylesByPriority(
  styles: StyleRegistryEntry[]
): StyleRegistryEntry[] {
  return styles.sort((a, b) => {
    const priorityA = getStylePriority(a.path);
    const priorityB = getStylePriority(b.path);
    return priorityA - priorityB;
  });
}
