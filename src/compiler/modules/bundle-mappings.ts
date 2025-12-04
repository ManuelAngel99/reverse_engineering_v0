/**
 * Bundle Mappings & Transforms
 * Source: module_448763 (Lines 594-636)
 *
 * Package aliasing and transformation rules for module resolution.
 * Handles special cases like bundling, CSS imports, and version overrides.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Package mapping value
 * Can be a string or array of strings (for multiple imports)
 */
export type PackageMapping = string | string[];

/**
 * Package mappings registry
 * Maps package names to their CDN/bundle configurations
 */
export type PackageMappings = Record<string, PackageMapping>;

/**
 * Transform function
 * Takes a module path and optional parent path, returns transformed path or null
 */
export type TransformFunction = (
  modulePath: string,
  parentPath?: string
) => string | null;

// ============================================================================
// Package Mappings (DP)
// ============================================================================

/**
 * Package-level mappings for special bundling configurations
 *
 * These mappings are applied during module resolution to:
 * - Add bundling flags (?bundle)
 * - Configure external dependencies (?external=...)
 * - Handle CSS imports
 * - Apply raw/no-bundle flags
 *
 * Source: Lines 594-608 (DP object)
 */
export const packageMappings: PackageMappings = {
  // React Email - requires bundling
  "@react-email/components": "@react-email/components?bundle",

  // Authentication libraries - require bundling
  "@privy-io/react-auth": "@privy-io/react-auth?bundle",
  "@clerk/nextjs": "@clerk/nextjs?bundle",

  // UI Libraries - require bundling
  "@chakra-ui/react": "@chakra-ui/react?bundle",
  "@chakra-ui/icons": "@chakra-ui/icons?bundle&external=@chakra-ui/react",
  "@mui/material": "@mui/material?bundle",

  // Social embeds - bundle with CSS
  "react-tweet": ["react-tweet?bundle", "react-tweet?bundle&css"],

  // Ant Design - requires bundling
  antd: "antd?bundle",

  // React Confetti - use raw version
  "react-confetti": "react-confetti?raw",

  // URL query state - no bundling
  nuqs: "nuqs?no-bundle",
  "nuqs/adapters/next/app": "nuqs/adapters/next/app?no-bundle",

  // Swiper CSS imports
  "swiper/css": "swiper/swiper.css",
  "swiper/css/bundle": "swiper/swiper-bundle.css",
};

// ============================================================================
// Path Transform Functions (DM)
// ============================================================================

/**
 * Transform Swiper CSS module imports
 * Converts swiper/css/[module] to swiper/modules/[module].css
 *
 * @example
 * swiper/css/navigation → swiper/modules/navigation.css
 * swiper/css/pagination → swiper/modules/pagination.css
 */
const transformSwiperCSS: TransformFunction = (modulePath: string) => {
  if (modulePath.startsWith("swiper/css/")) {
    return `swiper/modules/${modulePath.slice(11)}.css`;
  }
  return null;
};

/**
 * Fix Firebase version mismatch
 * Upgrades @firebase/app@0.10.16 to @0.10.17
 *
 * @example
 * /@firebase/app@0.10.16/es2022/app.mjs → @firebase/app@0.10.17/es2022/app.mjs
 */
const transformFirebaseVersion: TransformFunction = (modulePath: string) => {
  if (modulePath === "/@firebase/app@0.10.16/es2022/app.mjs") {
    return "@firebase/app@0.10.17/es2022/app.mjs";
  }
  return null;
};

/**
 * Transform UI5 webcomponents to use nobundle version
 * Adds .nobundle.mjs extension or ?no-bundle query param
 *
 * @example
 * /@ui5/webcomponents-base@.../webcomponents-base.mjs → .../webcomponents-base.nobundle.mjs
 * /@ui5/webcomponents-base@.../Button.mjs → .../Button.mjs?no-bundle
 */
const transformUI5Webcomponents: TransformFunction = (modulePath: string) => {
  // Skip if not UI5 webcomponents
  if (!modulePath.startsWith("/@ui5/webcomponents-base@")) {
    return null;
  }

  // Skip if already has nobundle or no-bundle
  if (
    modulePath.endsWith(".nobundle.mjs") ||
    modulePath.endsWith("?no-bundle")
  ) {
    return null;
  }

  // Main entry point - use .nobundle.mjs
  if (modulePath.endsWith("/es2022/webcomponents-base.mjs")) {
    return modulePath.slice(1).replace(".mjs", ".nobundle.mjs");
  }

  // Other files - add ?no-bundle query param
  return `${modulePath.slice(1).replace("/es2022/", "/")}?no-bundle`;
};

/**
 * Add bundle flag to RxJS imports
 * Ensures RxJS modules are bundled unless already specified
 *
 * @example
 * /rxjs@7.8.1/operators/map → rxjs@7.8.1/operators/map?bundle
 */
const transformRxJS: TransformFunction = (modulePath: string) => {
  if (modulePath.startsWith("/rxjs@") && !/[?&]bundle/.test(modulePath)) {
    const separator = modulePath.includes("?") ? "&" : "?";
    return `${modulePath.slice(1)}${separator}bundle`;
  }
  return null;
};

/**
 * Resolve Clerk safe-node-apis from parent module
 * When importing #safe-node-apis from @clerk/nextjs, resolve to actual path
 *
 * @example
 * /#safe-node-apis (from @clerk/nextjs@5.0.0/dist/...) →
 *   @clerk/nextjs@5.0.0/dist/esm/runtime/browser/safe-node-apis.mjs
 */
const transformClerkSafeNodeApis: TransformFunction = (
  modulePath: string,
  parentPath?: string
) => {
  if (
    modulePath.startsWith("/#safe-node-apis") &&
    parentPath?.includes("/@clerk/nextjs@")
  ) {
    // Extract @clerk/nextjs@version from parent path
    const clerkStart = parentPath.indexOf("@clerk/nextjs@");
    const distIndex = parentPath.indexOf("/dist/");

    if (clerkStart !== -1 && distIndex !== -1) {
      const clerkPackage = parentPath.slice(clerkStart, distIndex);
      return `${clerkPackage}/dist/esm/runtime/browser/safe-node-apis.mjs`;
    }
  }
  return null;
};

/**
 * Array of transform functions
 * Applied in order during module resolution
 *
 * Source: Lines 610-636 (DM array)
 */
export const pathTransforms: TransformFunction[] = [
  transformSwiperCSS,
  transformFirebaseVersion,
  transformUI5Webcomponents,
  transformRxJS,
  transformClerkSafeNodeApis,
];

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Apply package mappings to a module path
 *
 * @param modulePath - Module path to transform
 * @returns Transformed path(s) or original path
 */
export function applyPackageMapping(modulePath: string): string | string[] {
  // Check if module has a direct mapping
  if (modulePath in packageMappings) {
    return packageMappings[modulePath];
  }

  return modulePath;
}

/**
 * Apply all path transforms to a module path
 * Returns the first successful transformation or the original path
 *
 * @param modulePath - Module path to transform
 * @param parentPath - Optional parent module path for context
 * @returns Transformed path or original path
 */
export function applyPathTransforms(
  modulePath: string,
  parentPath?: string
): string {
  for (const transform of pathTransforms) {
    const result = transform(modulePath, parentPath);
    if (result !== null) {
      return result;
    }
  }

  return modulePath;
}

/**
 * Apply both package mappings and path transforms
 * This is the main entry point for module resolution
 *
 * @param modulePath - Module path to resolve
 * @param parentPath - Optional parent module path for context
 * @returns Resolved path(s)
 */
export function resolveModulePath(
  modulePath: string,
  parentPath?: string
): string | string[] {
  // First apply package mappings
  const mapped = applyPackageMapping(modulePath);

  // If mapping returned multiple paths, transform each
  if (Array.isArray(mapped)) {
    return mapped.map((path) => applyPathTransforms(path, parentPath));
  }

  // Otherwise transform the single path
  return applyPathTransforms(mapped, parentPath);
}

// ============================================================================
// Exports
// ============================================================================

export default {
  packageMappings,
  pathTransforms,
  applyPackageMapping,
  applyPathTransforms,
  resolveModulePath,
};
