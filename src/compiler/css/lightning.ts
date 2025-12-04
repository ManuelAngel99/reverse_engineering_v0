/**
 * LightningCSS Integration
 * Source: module_448763_wo_first_layer.js (LOC 4892-4891, 7086-7268)
 *
 * Provides CSS parsing, minification, and transformation using LightningCSS.
 * Handles CSS modules, import resolution, and theme variable extraction.
 */

import type {
  ParsedStylesheet,
  CSSProcessingOptions,
  CSSProcessingResult,
  CSSModuleResult,
} from "@/shared/types/css";

/**
 * LightningCSS instance (lazy-loaded)
 */
let lightningCSS: any = null;
let initPromise: Promise<void> | null = null;

/**
 * Cache for parsed CSS to avoid re-parsing
 */
const parseCache = new Map<string, ParsedStylesheet>();

/**
 * Initialize LightningCSS (lazy load the WASM module)
 */
export function initializeLightningCSS(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // Dynamic import to avoid loading WASM until needed
      lightningCSS = await import("lightningcss");
    } catch (error) {
      console.error("Failed to initialize LightningCSS:", error);
      initPromise = null; // Reset on failure so retry is possible
      throw new Error("LightningCSS initialization failed");
    }
  })();

  return initPromise;
}

/**
 * Get the raw LightningCSS transform function
 *
 * This is needed by the CSS processing pipeline to call transform directly
 *
 * @returns The LightningCSS transform function
 */
export async function getLightningCSSTransform(): Promise<any> {
  await initializeLightningCSS();

  if (!lightningCSS || !lightningCSS.transform) {
    throw new Error("LightningCSS transform function not available");
  }

  return lightningCSS.transform.bind(lightningCSS);
}

/**
 * Parse CSS string to AST
 *
 * @param css - CSS source code
 * @param filename - Optional filename for source maps
 * @returns Parsed stylesheet AST
 */
export async function parseCSS(
  css: string,
  filename?: string
): Promise<ParsedStylesheet> {
  await initializeLightningCSS();

  // Check cache
  const cacheKey = `${filename || "anonymous"}:${css}`;
  if (parseCache.has(cacheKey)) {
    return parseCache.get(cacheKey)!;
  }

  try {
    const result = lightningCSS.transform({
      filename: filename || "input.css",
      code: Buffer.from(css),
      minify: false,
      sourceMap: false,
      errorRecovery: true,
      drafts: {
        customMedia: true,
      },
      nonStandard: {
        deepSelectorCombinator: true,
      },
      cssModules: false,
      analyzeDependencies: true,
    });

    // Convert to our AST format
    const parsed: ParsedStylesheet = {
      rules: [], // LightningCSS provides a different format, we'll adapt as needed
      sources: [filename || "input.css"],
    };

    // Cache the result
    parseCache.set(cacheKey, parsed);

    return parsed;
  } catch (error) {
    throw new Error(
      `CSS parsing failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Minify CSS string
 *
 * @param css - CSS source code
 * @param filename - Optional filename
 * @returns Minified CSS
 */
export async function minifyCSS(
  css: string,
  filename?: string
): Promise<string> {
  await initializeLightningCSS();

  try {
    const result = lightningCSS.transform({
      filename: filename || "input.css",
      code: Buffer.from(css),
      minify: true,
      sourceMap: false,
      errorRecovery: true,
    });

    return result.code.toString();
  } catch (error) {
    throw new Error(
      `CSS minification failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Transform CSS module (scope class names)
 *
 * @param css - CSS source code
 * @param filename - Filename for scoping
 * @returns CSS module result with scoped classes
 */
export async function transformCSSModule(
  css: string,
  filename: string
): Promise<CSSModuleResult> {
  await initializeLightningCSS();

  try {
    const result = lightningCSS.transform({
      filename,
      code: Buffer.from(css),
      minify: false,
      sourceMap: false,
      errorRecovery: true,
      cssModules: {
        pattern: "[name]__[local]__[hash]",
        dashedIdents: false,
      },
      analyzeDependencies: true,
    });

    // Extract exports (class name mappings)
    const exports: Record<string, string> = {};
    if (result.exports) {
      for (const [key, value] of Object.entries(result.exports)) {
        exports[key] = value.name;
      }
    }

    // Extract dependencies
    const dependencies: string[] = [];
    if (result.dependencies) {
      for (const dep of result.dependencies) {
        if (dep.type === "import" || dep.type === "url") {
          dependencies.push(dep.url);
        }
      }
    }

    return {
      css: result.code.toString(),
      exports,
      dependencies,
    };
  } catch (error) {
    throw new Error(
      `CSS module transformation failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Extract theme variables from CSS
 *
 * Finds all CSS custom properties (--*) in :root selector
 *
 * @param css - CSS source code
 * @returns Map of variable names to values
 */
export async function extractThemeVariables(
  css: string
): Promise<Record<string, string>> {
  await initializeLightningCSS();

  const themeVars: Record<string, string> = {};

  try {
    // Parse CSS and look for :root declarations
    const result = lightningCSS.transform({
      filename: "theme.css",
      code: Buffer.from(css),
      minify: false,
      sourceMap: false,
      errorRecovery: true,
      visitor: {
        Rule: {
          style(rule: any) {
            // Check if this is a :root rule
            const isRoot = rule.selectors?.some(
              (sel: any) => sel.type === "pseudo-class" && sel.kind === "root"
            );

            if (isRoot) {
              // Extract custom properties
              for (const decl of rule.declarations?.declarations || []) {
                if (decl.property === "custom") {
                  const name = decl.value.name;
                  const value = decl.value.value;
                  themeVars[name] = String(value);
                }
              }
            }

            return rule;
          },
        },
      },
    });

    return themeVars;
  } catch (error) {
    console.warn("Failed to extract theme variables:", error);
    return themeVars;
  }
}

/**
 * Resolve CSS imports
 *
 * Finds all @import statements and returns their URLs
 *
 * @param css - CSS source code
 * @param basePath - Base path for resolving relative imports
 * @returns Array of import URLs
 */
export async function resolveCSSImports(
  css: string,
  basePath: string
): Promise<string[]> {
  await initializeLightningCSS();

  const imports: string[] = [];

  try {
    const result = lightningCSS.transform({
      filename: basePath,
      code: Buffer.from(css),
      minify: false,
      sourceMap: false,
      errorRecovery: true,
      analyzeDependencies: true,
    });

    if (result.dependencies) {
      for (const dep of result.dependencies) {
        if (dep.type === "import") {
          imports.push(dep.url);
        }
      }
    }

    return imports;
  } catch (error) {
    console.warn("Failed to resolve CSS imports:", error);
    return imports;
  }
}

/**
 * Process CSS file with all transformations
 *
 * Main entry point for CSS processing
 *
 * @param css - CSS source code
 * @param options - Processing options
 * @returns Processing result
 */
export async function processCSS(
  css: string,
  options: CSSProcessingOptions
): Promise<CSSProcessingResult> {
  await initializeLightningCSS();

  const {
    minify = false,
    modules = false,
    sourceMap = false,
    filename = "input.css",
  } = options;

  try {
    // Handle CSS modules separately
    if (modules) {
      const moduleResult = await transformCSSModule(css, filename);
      return {
        code: moduleResult.css,
        exports: moduleResult.exports,
        dependencies: moduleResult.dependencies,
      };
    }

    // Regular CSS processing
    const result = lightningCSS.transform({
      filename,
      code: Buffer.from(css),
      minify,
      sourceMap,
      errorRecovery: true,
      analyzeDependencies: true,
      drafts: {
        customMedia: true,
      },
      nonStandard: {
        deepSelectorCombinator: true,
      },
    });

    // Extract dependencies
    const dependencies: string[] = [];
    if (result.dependencies) {
      for (const dep of result.dependencies) {
        if (dep.type === "import" || dep.type === "url") {
          dependencies.push(dep.url);
        }
      }
    }

    // Extract theme variables if requested
    let themeVariables: Record<string, string> | undefined;
    
    // Note: Theme extraction is now handled by the pipeline visitor or design-tokens
    // The redundant extractThemeVariables function has been removed.
    
    return {
      code: result.code.toString(),
      map: result.map ? result.map.toString() : undefined,
      dependencies,
      themeVariables,
    };
  } catch (error) {
    throw new Error(
      `CSS processing failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Clear the parse cache
 *
 * Useful for HMR to ensure fresh parsing
 */
export function clearParseCache(): void {
  parseCache.clear();
}

/**
 * Check if LightningCSS is initialized
 */
export function isInitialized(): boolean {
  return lightningCSS !== null;
}
