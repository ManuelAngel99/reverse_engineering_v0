/**
 * Font System Shims
 * Source: module_448763 (Lines 557-592)
 *
 * Provides Next.js font system compatibility in the browser.
 * Shims next/font/google and next/font/local APIs.
 */

import type {
  NextFontConfig,
  NextLocalFontConfig,
  FontModuleExports,
} from "../../shared/types/compiler";

// ============================================================================
// Font Shim Creation
// ============================================================================

/**
 * Create a Next.js font shim object
 * Returns className and variable for CSS integration
 *
 * @param config - Font configuration
 * @returns Font module exports
 */
export function createNextFontShim(config: {
  family: string;
  variable: string;
}): FontModuleExports {
  return {
    className: config.family.replace(/var\((.*?)\)/, "$1"),
    variable: config.variable,
    style: {
      fontFamily: config.family,
    },
  };
}

/**
 * Create a Google Font loader shim
 * Mimics next/font/google API
 *
 * @param config - Google font configuration
 * @returns Font module exports
 */
export function createGoogleFontLoader(
  config: NextFontConfig
): FontModuleExports {
  const fontFamily = config.family || "Inter";
  const variable = config.variable || `--font-${fontFamily.toLowerCase()}`;

  return {
    className: variable,
    variable,
    style: {
      fontFamily: `var(${variable})`,
      fontWeight: Array.isArray(config.weight)
        ? config.weight[0]
        : config.weight,
      fontStyle: Array.isArray(config.style) ? config.style[0] : config.style,
    },
  };
}

/**
 * Create a local font loader shim
 * Mimics next/font/local API
 *
 * @param config - Local font configuration
 * @returns Font module exports
 */
export function createLocalFontLoader(
  config: NextLocalFontConfig
): FontModuleExports {
  const variable = config.variable || "--font-local";

  return {
    className: variable,
    variable,
    style: {
      fontFamily: `var(${variable})`,
      fontWeight: Array.isArray(config.weight)
        ? config.weight[0]
        : config.weight,
      fontStyle: Array.isArray(config.style) ? config.style[0] : config.style,
    },
  };
}

// ============================================================================
// Font Loading Utilities
// ============================================================================

/**
 * Load a Google Font dynamically
 * Injects a <link> tag into the document head
 *
 * @param family - Font family name
 * @param weights - Font weights to load
 * @param subsets - Font subsets to load
 */
export function loadGoogleFont(
  family: string,
  weights: string[] = ["400"],
  subsets: string[] = ["latin"]
): void {
  if (typeof document === "undefined") return;

  const weightsParam = weights.join(";");
  const subsetsParam = subsets.join(",");
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weightsParam}&subset=${subsetsParam}&display=swap`;

  // Check if already loaded
  const existing = document.querySelector(`link[href="${url}"]`);
  if (existing) return;

  // Create and inject link tag
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Load a local font using @font-face
 * Injects a <style> tag into the document head
 *
 * @param config - Local font configuration
 */
export function loadLocalFont(config: NextLocalFontConfig): void {
  if (typeof document === "undefined") return;

  const variable = config.variable || "--font-local";
  const sources = Array.isArray(config.src)
    ? config.src
    : [{ path: config.src }];

  const fontFaceRules = sources
    .map((source) => {
      const path = typeof source === "string" ? source : source.path;
      const weight = typeof source === "object" ? source.weight : config.weight;
      const style = typeof source === "object" ? source.style : config.style;

      return `
@font-face {
  font-family: '${variable}';
  src: url('${path}');
  ${weight ? `font-weight: ${weight};` : ""}
  ${style ? `font-style: ${style};` : ""}
  ${config.display ? `font-display: ${config.display};` : ""}
}
      `.trim();
    })
    .join("\n\n");

  // Create and inject style tag
  const style = document.createElement("style");
  style.textContent = fontFaceRules;
  document.head.appendChild(style);
}
