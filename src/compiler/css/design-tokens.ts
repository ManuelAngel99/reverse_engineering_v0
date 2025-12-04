/**
 * Design System Token Registry
 * Source: module_448763_wo_first_layer.js (LOC 7243-7244, 7237-7238)
 *
 * Global registry for CSS custom properties extracted from :root and .dark selectors.
 * Used by Tailwind v4 to build theme configuration from CSS variables.
 */

/**
 * Design system tokens structure
 */
export interface DesignSystemTokens {
  dark: Record<string, string>;
  default: Record<string, string>;
  theme: Record<string, string>;
}

/**
 * Extend global window interface
 */
declare global {
  interface Window {
    __v0_dst?: DesignSystemTokens[];
  }
}

/**
 * Initialize the global design token registry
 *
 * Creates the __v0_dst array if it doesn't exist
 */
export function initializeDesignTokenRegistry(): void {
  if (typeof window !== "undefined" && !window.__v0_dst) {
    window.__v0_dst = [];
  }
}

/**
 * Register design tokens from a CSS file
 *
 * Adds tokens to the global registry for theme extraction
 *
 * @param tokens - Design tokens extracted from CSS
 */
export function registerDesignTokens(tokens: DesignSystemTokens): void {
  if (typeof window === "undefined") return;

  initializeDesignTokenRegistry();
  window.__v0_dst!.push(tokens);
}

/**
 * Unregister design tokens (for HMR cleanup)
 *
 * Removes tokens from the global registry when a module is hot-reloaded
 *
 * @param tokens - Design tokens to remove
 */
export function unregisterDesignTokens(tokens: DesignSystemTokens): void {
  if (typeof window === "undefined" || !window.__v0_dst) return;

  const index = window.__v0_dst.indexOf(tokens);
  if (index !== -1) {
    window.__v0_dst.splice(index, 1);
  }
}

/**
 * Extract theme variables from the DOM
 * Source: module_819757 (LOC 2110-2134)
 *
 * Scans for <style type="text/tailwindcss"> elements, extracts --color-* variables,
 * and resolves their computed values using the browser.
 *
 * @returns Record of resolved color values
 */
export function extractThemeVariables(): Record<string, string> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {};
  }

  // Select all Tailwind style elements
  const styles = document.querySelectorAll('style[type="text/tailwindcss"]');
  const themeRegex = /@theme(?:\s+[^{\s]+)?(?:\s+[^{\s]+)*\s*{([\s\S]*?)}/g;
  const varRegex = /--(color-[\w-]+):\s*([^;]+)/g;
  const rawColors: Record<string, string> = {};

  // Extract raw color definitions from style text content
  for (const style of styles) {
    let content = style.textContent || "";
    let themeMatch;

    // Find all @theme blocks
    while ((themeMatch = themeRegex.exec(content)) !== null) {
      const themeBlock = themeMatch[1];
      let varMatch;

      // Find all --color-* declarations within the block
      while ((varMatch = varRegex.exec(themeBlock)) !== null) {
        const colorName = varMatch[1].replace("color-", "");
        rawColors[colorName] = varMatch[2].trim();
      }
    }
  }

  // Create a temporary element to resolve computed values
  const tempDiv = document.createElement("div");
  const cssText = Object.entries(rawColors)
    .map(([name, value]) => `--color-${name}: ${value};`)
    .join("");

  tempDiv.style.cssText = cssText;
  document.body.appendChild(tempDiv);

  const computedStyle = getComputedStyle(tempDiv);
  const resolvedColors: Record<string, string> = {};

  // Resolve each color value
  for (const name of Object.keys(rawColors)) {
    resolvedColors[name] = computedStyle
      .getPropertyValue(`--color-${name}`)
      .trim();
  }

  tempDiv.remove();
  return resolvedColors;
}

/**
 * Get all registered design token sets
 *
 * @returns Array of all registered token sets
 */
export function getAllDesignTokens(): DesignSystemTokens[] {
  if (typeof window === "undefined") {
    return [];
  }

  initializeDesignTokenRegistry();
  return [...window.__v0_dst!];
}

/**
 * Clear all design tokens
 *
 * Useful for testing or full resets
 */
export function clearDesignTokens(): void {
  if (typeof window === "undefined") return;

  window.__v0_dst = [];
}

/**
 * Get design tokens count
 *
 * @returns Number of registered token sets
 */
export function getDesignTokensCount(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.__v0_dst?.length || 0;
}
