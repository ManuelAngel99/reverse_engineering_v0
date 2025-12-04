/**
 * ES Module Shim Configuration
 * Source: module_448763 (Lines 1920-2167)
 *
 * Configures window.esmsInitOptions for es-module-shims library.
 * Handles custom module resolution, import hooks, fetch interception,
 * CSS-to-JS transformation, and JSON module conversion.
 */

import { createModuleBlob, createRuntimeModule } from "./registry";
import { lazyModules, resolveModule, isModuleAvailable } from "./lazy-loaders";
import { packageMappings, pathTransforms } from "./bundle-mappings";
import { isFeatureEnabled } from "../features/featureFlags";
import { processJSONFile } from "../pipeline/static-assets-json";

// ============================================================================
// Types
// ============================================================================

declare global {
  interface Window {
    esmsInitOptions?: ESMSInitOptions;
    importShim?: ImportShim;
    process?: {
      env: Record<string, string | undefined>;
    };
  }
}

export interface ESMSInitOptions {
  mapOverrides?: boolean;
  shimMode?: boolean;
  resolve?: (
    specifier: string,
    parentUrl: string,
    defaultResolve: (specifier: string, parentUrl: string) => string
  ) => string | Promise<string>;
  onimport?: (url: string) => void | Promise<void>;
  fetch?: (url: string | Request, options?: RequestInit) => Promise<Response>;
}

export interface ImportShim {
  getImportMap(): { imports: Record<string, string> };
  (specifier: string): Promise<any>;
}

export interface PackageVersions {
  [packageName: string]: string;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * ESM.sh base URL for CDN fallback
 */
const ESMSH_BASE_URL = "https://esm.sh";

/**
 * Core modules that shouldn't be fetched externally
 */
const CORE_MODULES = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "next/navigation",
  "next/headers",
  "next/cache",
  "next/image",
  "next/link",
  "next/font/google",
  "next/font/local",
]);

/**
 * Modules with special subpath handling
 */
const SUBPATH_MODULES = new Set(["lucide-react", "@radix-ui"]);

/**
 * Hardcoded version overrides for specific packages
 */
const VERSION_OVERRIDES = new Map<string, string>([
  ["ai", "5.0.62"],
  ["recharts", "latest"],
]);

/**
 * CSS content-type pattern
 */
const CSS_CONTENT_TYPE = /^text\/css/i;

/**
 * JavaScript content-type pattern
 */
const JS_CONTENT_TYPE = /^(application|text)\/(javascript|ecmascript)/i;

/**
 * JSON content-type pattern
 */
const JSON_CONTENT_TYPE = /^application\/json/i;

/**
 * document.cookie assignment pattern
 */
const COOKIE_ASSIGNMENT_PATTERN = /document\.cookie\s*=/g;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create esm.sh URL for a package
 *
 * @param packageSpec - Package name with optional version
 * @param version - Optional version override
 * @returns ESM.sh URL
 */
export function createEsmShUrl(packageSpec: string, version?: string): string {
  // Handle URLs
  if (packageSpec.startsWith("http://") || packageSpec.startsWith("https://")) {
    return `${ESMSH_BASE_URL}/${encodeURIComponent(packageSpec)}`;
  }

  // Handle version
  if (version) {
    return `${ESMSH_BASE_URL}/${packageSpec}@${version}`;
  }

  return `${ESMSH_BASE_URL}/${packageSpec}`;
}

/**
 * Get package versions from package.json in the virtual filesystem
 *
 * @returns Package versions map
 */
function getPackageVersions(): PackageVersions {
  const versions: PackageVersions = {};

  try {
    const globals = (window as any).__v0_globals__;
    const fs = globals?.internal_fs;

    if (!fs) return versions;

    const packageJsonEntry = fs.find(
      (entry: [string, any]) => entry[0] === "package.json"
    );

    if (!packageJsonEntry) return versions;

    const packageJson = JSON.parse(packageJsonEntry[1].data);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    for (const [name, version] of Object.entries(allDeps)) {
      if (typeof version === "string" && !name.startsWith("@types/")) {
        versions[name] = version;
      }
    }
  } catch {
    // Ignore errors
  }

  return versions;
}

/**
 * Extract package name from esm.sh URL
 *
 * @param url - URL to parse
 * @param parentUrl - Parent URL for context
 * @returns Package name or undefined
 */
function extractPackageFromUrl(
  url: string,
  parentUrl: string
): string | undefined {
  const isEsmSh = parentUrl.startsWith(ESMSH_BASE_URL);
  if (!isEsmSh) return undefined;

  // Match package name pattern
  const match = url.match(/\/(@?[^@]+)(@|$)/);
  if (!match) return undefined;

  let packageName = match[1].replace(/\?.+/, "");
  return packageName;
}

/**
 * Transform CSS to JavaScript that injects styles
 *
 * @param cssText - CSS source code
 * @returns JavaScript code
 */
export function transformCSSToJS(cssText: string): string {
  return `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify(
    cssText
  )});document.adoptedStyleSheets.push(s)`;
}

/**
 * Rewrite document.cookie assignments
 *
 * @param code - JavaScript source code
 * @returns Transformed code
 */
export function rewriteCookieAccess(code: string): string {
  return code.replace(COOKIE_ASSIGNMENT_PATTERN, "__v0_cookie_doc.cookie=");
}

// ============================================================================
// Main Configuration
// ============================================================================

/**
 * Configure ES Module Shims
 *
 * Sets up window.esmsInitOptions with custom resolution, import hooks,
 * and fetch interception for the v0 runtime.
 */
export function configureESMShims(): void {
  if (typeof window === "undefined") return;

  window.esmsInitOptions = {
    mapOverrides: true,
    shimMode: true,

    /**
     * Custom module resolution
     */
    async resolve(specifier, parentUrl, defaultResolve) {
      // Check bundle mappings first
      if (specifier in packageMappings) {
        const mapping = packageMappings[specifier];
        if (typeof mapping === "string") {
          return createEsmShUrl(mapping);
        }
        // Array of re-exports
        const code = mapping
          .map((pkg: string) => `export * from '${createEsmShUrl(pkg)}'`)
          .join("\n");
        return createRuntimeModule({ name: specifier, sourceCode: code });
      }

      // Apply path transforms
      for (const transform of pathTransforms) {
        const result = transform(specifier, parentUrl);
        if (result) {
          return createEsmShUrl(result);
        }
      }

      // Check for core module override from esm.sh
      const packageName = extractPackageFromUrl(specifier, parentUrl);
      if (packageName && CORE_MODULES.has(packageName)) {
        return defaultResolve(packageName, parentUrl);
      }

      // Check package.json versions
      if (isFeatureEnabled("package-json")) {
        const versions = getPackageVersions();

        if (specifier.includes("/")) {
          const [pkg, ...rest] = specifier.split("/");
          const version = versions[pkg];
          if (version) {
            return createEsmShUrl(`${pkg}@${version}/${rest.join("/")}`);
          }
        } else {
          const version = versions[specifier];
          if (version) {
            // Special handling for AI SDK
            if (specifier === "ai" && shouldUseLazyLoader(version)) {
              return loadLazyModule(specifier);
            }
            return createEsmShUrl(`${specifier}@${version}`);
          }
        }

        // Check version overrides
        const override = VERSION_OVERRIDES.get(specifier);
        if (override) {
          return createEsmShUrl(`${specifier}@${override}`);
        }
      }

      // Handle server-only/client-only
      if (specifier === "server-only" || specifier === "client-only") {
        const layer = parentUrl.match(/\?(server_layer|client_layer)$/)?.[1];
        return defaultResolve(
          `${specifier}?${layer || "server_layer"}`,
          parentUrl
        );
      }

      // Handle @v0/ prefixed modules with layer propagation
      if (specifier.startsWith("@v0/")) {
        const parentLayer = parentUrl.match(
          /\?(server_layer|client_layer)$/
        )?.[1];
        const specifierLayer = specifier.match(
          /\?(server_layer|client_layer)$/
        )?.[1];

        if (parentLayer && !specifierLayer) {
          try {
            return defaultResolve(`${specifier}?${parentLayer}`, parentUrl);
          } catch {
            // Fall through
          }
        }
      }

      // Try default resolution
      try {
        return defaultResolve(specifier, parentUrl);
      } catch (error) {
        // Check lazy loaders
        if (isModuleAvailable(specifier)) {
          return loadLazyModule(specifier);
        }

        // Fallback to esm.sh for npm packages
        if (/^[@a-z]/.test(specifier)) {
          return createEsmShUrl(specifier);
        }

        throw error;
      }
    },

    /**
     * Import hook for tracking module loads
     */
    async onimport(url) {
      // This hook is called when a module is imported
      // Can be used for analytics, preloading, etc.
    },

    /**
     * Custom fetch for module requests
     */
    async fetch(url, options) {
      let fetchUrl = typeof url === "string" ? url : url.url;

      // Handle NPM token for private packages
      if (
        fetchUrl.startsWith(ESMSH_BASE_URL) &&
        (window.process?.env?.NPM_RC || window.process?.env?.NPM_TOKEN)
      ) {
        try {
          const tokenData = JSON.stringify({
            NPM_RC: window.process.env.NPM_RC,
            NPM_TOKEN: window.process.env.NPM_TOKEN,
            NPM_REGISTRY: window.process.env.NPM_REGISTRY,
          });

          const encryptResponse = await fetch("/api/encrypt-npm-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tokenData }),
          });

          if (encryptResponse.ok) {
            const { encryptedToken } = await encryptResponse.json();
            const urlObj = new URL(fetchUrl);
            urlObj.searchParams.set("nt", encryptedToken);
            fetchUrl = urlObj.toString();
          }
        } catch {
          // Ignore encryption errors
        }
      }

      // Fetch the resource
      const response = await fetch(fetchUrl, options);
      if (!response.ok) return response;

      // Skip blob URLs
      if (typeof url === "string" && url.startsWith("blob:")) {
        return response;
      }

      const contentType = response.headers.get("content-type") || "";

      // Transform CSS to JS
      if (CSS_CONTENT_TYPE.test(contentType)) {
        const cssText = await response.clone().text();
        const jsCode = transformCSSToJS(cssText);

        return new Response(jsCode, {
          headers: {
            "content-type": "application/javascript",
          },
          status: response.status,
        });
      }

      // Rewrite cookie access in JS
      if (JS_CONTENT_TYPE.test(contentType)) {
        const originalText = response.text.bind(response);
        (response as any).text = async () => {
          let text = await originalText();
          if (COOKIE_ASSIGNMENT_PATTERN.test(text)) {
            text = rewriteCookieAccess(text);
          }
          return text;
        };
      }

      // Transform JSON to ES module
      if (JSON_CONTENT_TYPE.test(contentType)) {
        const jsonText = await response.clone().text();
        const jsCode = processJSONFile(fetchUrl, jsonText);

        return new Response(jsCode, {
          headers: {
            "content-type": "application/javascript",
          },
          status: response.status,
        });
      }

      return response;
    },
  };
}

/**
 * Check if we should use the lazy loader for a package version
 */
function shouldUseLazyLoader(version: string): boolean {
  if (version === "latest") return true;

  // Compare versions (simplified)
  const cleanVersion = version.replace(/[^0-9.]/g, "");
  const targetVersion = "5.0.62";

  const vParts = cleanVersion.split(".").map(Number);
  const tParts = targetVersion.split(".").map(Number);

  for (let i = 0; i < Math.max(vParts.length, tParts.length); i++) {
    const v = vParts[i] || 0;
    const t = tParts[i] || 0;
    if (v > t) return true;
    if (v < t) return false;
  }

  return true;
}

/**
 * Load a module via lazy loader
 */
async function loadLazyModule(specifier: string): Promise<string> {
  const exports = await resolveModule(specifier);
  if (!exports) {
    throw new Error(`No lazy loader for ${specifier}`);
  }
  return createModuleBlob({
    moduleId: specifier,
    exports,
  });
}

// ============================================================================
// Exports
// ============================================================================

export default {
  configureESMShims,
  createEsmShUrl,
  transformCSSToJS,
  rewriteCookieAccess,
  ESMSH_BASE_URL,
  CORE_MODULES,
};
