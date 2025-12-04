/**
 * Tailwind Configuration System
 * Source: module_448763_wo_first_layer.js (LOC 1579-1600)
 *
 * Handles loading and processing Tailwind configuration for both v3 and v4.
 * - v3: Uses tailwind.config.js/ts files
 * - v4: Uses CSS-based @theme directives
 */

import type {
  TailwindConfig,
  TailwindConfigV3,
  TailwindConfigV4,
  TailwindVersion,
  ThemeVariables,
} from "@/shared/types/css";
import { extractThemeVariables as extractThemeVariablesFromTokens } from "./design-tokens";

/**
 * Global Tailwind configuration (set by setGlobalTailwindConfig)
 */
let globalTailwindConfig: TailwindConfig | null = null;

/**
 * Detect Tailwind version from available files
 *
 * v3: Has tailwind.config.js/ts file
 * v4: Uses CSS-based configuration with @theme
 *
 * @param modules - Available module map
 * @returns Tailwind version info
 */
export function detectTailwindVersion(
  modules: Record<string, any>
): TailwindVersion {
  // Check for v3 config file
  if (
    modules["@v0/tailwind.config"] ||
    modules["@v0/tailwind.config.js"] ||
    modules["@v0/tailwind.config.ts"]
  ) {
    return {
      version: 3,
      configPath: "@v0/tailwind.config",
    };
  }

  // Check for v4 CSS-based config in globals.css
  const globalsPath = modules["@v0/app/globals.css"]
    ? "@v0/app/globals.css"
    : modules["@v0/src/app/globals.css"]
    ? "@v0/src/app/globals.css"
    : null;

  if (globalsPath) {
    const content = modules[globalsPath]?.data || "";
    // v4 uses @theme directive
    if (
      content.includes("@theme") ||
      (content.includes("@import") && content.includes("tailwindcss"))
    ) {
      return {
        version: 4,
        cssPath: globalsPath,
      };
    }
  }

  // Default to v3 if unclear
  return {
    version: 3,
  };
}

/**
 * Get Tailwind version from getTailwindVersion() global
 *
 * This is set by the parent frame based on the project
 */
export function getTailwindVersion(): 3 | 4 {
  // Check if global function exists
  if (typeof (window as any).getTailwindVersion === "function") {
    return (window as any).getTailwindVersion();
  }

  // Default to v3
  return 3;
}

/**
 * Load Tailwind v3 configuration from tailwind.config file
 *
 * @param importEntry - Function to dynamically import modules
 * @returns Tailwind v3 config
 */
export async function loadV3Config(
  importEntry: (path: string) => Promise<any>
): Promise<TailwindConfigV3 | null> {
  try {
    const configModule = await importEntry("@v0/tailwind.config");

    if (configModule && configModule.default) {
      return configModule.default as TailwindConfigV3;
    }

    return null;
  } catch (error) {
    console.warn("Failed to load Tailwind v3 config:", error);
    return null;
  }
}

/**
 * Load Tailwind v4 configuration from CSS @theme
 *
 * v4 uses CSS custom properties defined in @theme blocks
 * Extracts theme variables from the global design token registry
 *
 * @returns Tailwind v4 config
 */
export async function loadV4Config(): Promise<TailwindConfigV4> {
  const themeVars = extractThemeVariablesFromTokens();

  return {
    version: 4,
    theme: themeVars,
    source: "css",
  };
}

/**
 * Extract theme variables from Tailwind config
 *
 * Converts Tailwind theme config to flat key-value pairs
 *
 * @param config - Tailwind configuration
 * @returns Theme variables
 */
export function extractThemeVariables(config: TailwindConfig): ThemeVariables {
  const variables: ThemeVariables = {
    colors: {},
    spacing: {},
    fontSize: {},
    fontFamily: {},
    borderRadius: {},
  };

  if ("version" in config && config.version === 4) {
    // v4: Theme is already flat CSS custom properties
    if (!config.theme) return variables;
    for (const [key, value] of Object.entries(config.theme)) {
      // Categorize by prefix
      if (key.startsWith("--color-")) {
        variables.colors[key] = value;
      } else if (key.startsWith("--spacing-")) {
        variables.spacing[key] = value;
      } else if (key.startsWith("--font-size-")) {
        variables.fontSize[key] = value;
      } else if (key.startsWith("--font-family-")) {
        variables.fontFamily[key] = value;
      } else if (key.startsWith("--border-radius-")) {
        variables.borderRadius[key] = value;
      }
    }
  } else {
    // v3: Extract from theme object
    const v3Config = config as TailwindConfigV3;

    if (v3Config.theme) {
      // Extract colors
      if (v3Config.theme.colors) {
        variables.colors = flattenObject(v3Config.theme.colors);
      }
      if (v3Config.theme.extend?.colors) {
        Object.assign(
          variables.colors,
          flattenObject(v3Config.theme.extend.colors)
        );
      }

      // Extract spacing
      if (v3Config.theme.spacing) {
        variables.spacing = flattenObject(v3Config.theme.spacing);
      }
      if (v3Config.theme.extend?.spacing) {
        Object.assign(
          variables.spacing,
          flattenObject(v3Config.theme.extend.spacing)
        );
      }

      // Extract fontSize
      if (v3Config.theme.fontSize) {
        variables.fontSize = flattenObject(v3Config.theme.fontSize);
      }
      if (v3Config.theme.extend?.fontSize) {
        Object.assign(
          variables.fontSize,
          flattenObject(v3Config.theme.extend.fontSize)
        );
      }

      // Extract fontFamily
      if (v3Config.theme.fontFamily) {
        variables.fontFamily = flattenObject(v3Config.theme.fontFamily);
      }
      if (v3Config.theme.extend?.fontFamily) {
        Object.assign(
          variables.fontFamily,
          flattenObject(v3Config.theme.extend.fontFamily)
        );
      }

      // Extract borderRadius
      if (v3Config.theme.borderRadius) {
        variables.borderRadius = flattenObject(v3Config.theme.borderRadius);
      }
      if (v3Config.theme.extend?.borderRadius) {
        Object.assign(
          variables.borderRadius,
          flattenObject(v3Config.theme.extend.borderRadius)
        );
      }
    }
  }

  return variables;
}

/**
 * Flatten nested object to dot notation
 *
 * Example: { primary: { 500: '#fff' } } → { 'primary.500': '#fff' }
 */
function flattenObject(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}

/**
 * Merge multiple Tailwind configs
 *
 * Later configs override earlier ones
 *
 * @param configs - Array of configs to merge
 * @returns Merged configuration
 */
export function mergeTailwindConfigs(
  ...configs: TailwindConfigV3[]
): TailwindConfigV3 {
  const merged: TailwindConfigV3 = {
    theme: {
      extend: {},
    },
  };

  for (const config of configs) {
    // Merge theme
    if (config.theme) {
      if (!merged.theme) merged.theme = {};
      Object.assign(merged.theme, config.theme);

      // Merge extend separately
      if (config.theme.extend) {
        if (!merged.theme.extend) merged.theme.extend = {};
        Object.assign(merged.theme.extend, config.theme.extend);
      }
    }

    // Merge other top-level properties
    if (config.content) merged.content = config.content;
    if (config.plugins) merged.plugins = config.plugins;
    if (config.darkMode) merged.darkMode = config.darkMode;
    if (config.prefix) merged.prefix = config.prefix;
    if (config.important !== undefined) merged.important = config.important;
    if (config.separator) merged.separator = config.separator;
    if (config.corePlugins) merged.corePlugins = config.corePlugins;
  }

  return merged;
}

/**
 * Load Tailwind configuration
 *
 * Main entry point that detects version and loads appropriate config
 * Matches v0's Ns() function (LOC 1579-1600)
 *
 * @param modules - Available modules
 * @param importEntry - Function to import modules
 * @param timestamp - Optional timestamp for feature flag checking
 * @returns Loaded configuration
 */
export async function loadTailwindConfig(
  modules: Record<string, any>,
  importEntry: (path: string) => Promise<any>,
  timestamp?: number
): Promise<TailwindConfig | null> {
  // Check feature flag (matches v0's Dv("tailwind-config", t) check)
  // Feature flag timestamp: 1737680400000 (Jan 24, 2025)
  const TAILWIND_CONFIG_FLAG = 1737680400000;
  const isEnabled = timestamp ? timestamp > TAILWIND_CONFIG_FLAG : true;

  if (!isEnabled) {
    return null;
  }

  try {
    const version = getTailwindVersion();

    if (version === 3) {
      // v3: Load from tailwind.config file
      if (modules["@v0/tailwind.config"]) {
        const configModule = await importEntry("@v0/tailwind.config");

        if (configModule && configModule.default) {
          setGlobalTailwindConfig(configModule.default);
          return configModule.default;
        }
      }
      return null;
    } else {
      // v4: Load from global design tokens
      // Matches v0's implementation (LOC 1592-1594)
      const config: TailwindConfigV3 = {
        theme: {
          extend: {
            colors: extractThemeVariablesFromTokens(),
          },
        },
      };

      setGlobalTailwindConfig(config);
      return config;
    }
  } catch (error) {
    console.warn("Failed to load global configs:", error);
    return null;
  }
}

/**
 * Set global Tailwind configuration
 * Source: module_819757 (LOC 2138)
 *
 * @param config - Tailwind configuration to set globally
 */
export function setGlobalTailwindConfig(config: TailwindConfig): void {
  globalTailwindConfig = config;

  // Update timestamp (matches original 't = Date.now()')
  configTimestamp = Date.now();

  // Also set on window for compatibility
  if (typeof window !== "undefined") {
    if ((window as any).tailwind) {
      const newConfig = { ...config };
      // Remove safelist as per original implementation
      // (delete n.safelist)
      delete (newConfig as any).safelist;
      
      (window as any).tailwind.config = newConfig;
    }
    
    if (typeof (window as any).setGlobalTailwindConfig === "function") {
      (window as any).setGlobalTailwindConfig(config);
    }
  }
}

/**
 * Get global Tailwind configuration
 *
 * @returns Current global config
 */
export function getGlobalTailwindConfig(): TailwindConfig | null {
  return globalTailwindConfig;
}

/**
 * Validate Tailwind configuration
 *
 * Checks for common issues and returns warnings
 *
 * @param config - Configuration to validate
 * @returns Array of warning messages
 */
export function validateTailwindConfig(config: TailwindConfig): string[] {
  const warnings: string[] = [];

  if ("version" in config && config.version === 4) {
    // v4 validation
    if (Object.keys(config.theme).length === 0) {
      warnings.push("Tailwind v4 config has no theme variables");
    }
  } else {
    // v3 validation
    const v3Config = config as TailwindConfigV3;

    if (!v3Config.theme && !v3Config.content) {
      warnings.push("Tailwind v3 config is missing both theme and content");
    }

    if (
      v3Config.content &&
      Array.isArray(v3Config.content) &&
      v3Config.content.length === 0
    ) {
      warnings.push("Tailwind v3 content array is empty");
    }
  }

  return warnings;
}

/**
 * Get default Tailwind v3 configuration
 *
 * Provides sensible defaults when no config is found
 */
export function getDefaultTailwindConfig(): TailwindConfigV3 {
  return {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
}

/**
 * Extract theme variables from global design system tokens
 *
 * Re-exported from design-tokens module for compatibility with v0's API
 * This is the function that v0 imports from module 819757
 */
export { extractThemeVariablesFromTokens as extractThemeVariables };
