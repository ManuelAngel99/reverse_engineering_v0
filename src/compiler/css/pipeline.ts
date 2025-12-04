/**
 * CSS Processing Pipeline
 * Source: module_448763_wo_first_layer.js (LOC 7086-7268)
 *
 * Complete CSS processing pipeline that handles:
 * - CSS modules with scoped class names
 * - Tailwind v4 @theme extraction
 * - Google Fonts injection
 * - Runtime code generation for style injection
 * - HMR support with cleanup
 */

import { serializeCSSValue } from "./serialization";
import {
  normalizePath,
  getOrCreateModuleEntry,
  trackDependency,
  joinPaths,
  resolveImportPath,
  type ModuleEntry,
} from "../modules/utilities";
import { dirname } from "../../shared/utils/module-exports";
import {
  registerDesignTokens,
  unregisterDesignTokens,
  type DesignSystemTokens,
} from "./design-tokens";

/**
 * LightningCSS transform function type
 * This will be the actual lightningcss.transform function
 */
type LightningCSSTransform = (options: any) => Promise<any>;

/**
 * CSS processing context
 */
interface CSSProcessingContext {
  cssModuleRawContent: Record<string, string>;
  [key: string]: any;
}

/**
 * CSS processing result
 */
interface CSSProcessingResult {
  runtime: string;
  exports?: Record<string, { name: string }>;
}

/**
 * Process CSS file with LightningCSS
 *
 * This is the main CSS processing function that matches v0's implementation
 *
 * @param options - Processing options
 * @returns CSS processing result
 */
export async function processCSSFile(options: {
  modules: Record<string, ModuleEntry>;
  path: string;
  source: string;
  context: CSSProcessingContext;
  callbacks: Array<() => Promise<void>>;
  tsconfigPaths: Record<string, string[]>;
  lightningCSS: LightningCSSTransform;
}): Promise<void> {
  const {
    modules,
    path,
    source,
    context,
    callbacks,
    tsconfigPaths,
    lightningCSS,
  } = options;

  // Normalize path (remove leading slash)
  const normalizedPath = normalizePath(path, tsconfigPaths);
  const moduleEntry = getOrCreateModuleEntry(normalizedPath, modules);
  const isCSSModule = path.endsWith(".module.css");

  // Store raw content for resolver
  context.cssModuleRawContent = context.cssModuleRawContent || {};
  context.cssModuleRawContent[normalizedPath] = source;

  // Add async processing callback
  callbacks.push(async () => {
    const cssImports = new Set<string>();
    const googleFonts = new Set<string>();
    let isRootSelector = false;
    let isDarkSelector = false;

    // Design system tokens for Tailwind v4
    const designTokens: DesignSystemTokens = {
      dark: {},
      default: {},
      theme: {},
    };

    // Extract @theme block (Tailwind v4)
    const themeMatch = source.match(
      /@theme\s+(?:inline\s*)?\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/s
    );

    if (themeMatch) {
      const [, themeContent] = themeMatch;
      if (themeContent) {
        const varPattern = /--([^:]+):\s*([^;]+);/g;
        let match;

        while ((match = varPattern.exec(themeContent)) !== null) {
          if (match[1] && match[2]) {
            const varName = `--${match[1].trim()}`;
            const varValue = match[2].trim();
            designTokens.theme[varName] = varValue;
          }
        }
      }
    }

    // Get the LightningCSS transform function
    const transformFn = await lightningCSS();

    // Transform CSS with LightningCSS
    const result = await transformFn({
      filename: normalizedPath,
      cssModules: isCSSModule,
      minify: true,
      sourceMap: false,
      errorRecovery: true,
      resolver: {
        read: (filePath: string) => {
          return (filePath && context.cssModuleRawContent[filePath]) || "";
        },
        resolve(importPath: string, fromPath: string) {
          // Handle Google Fonts
          if (importPath.startsWith("https://fonts.googleapis.com")) {
            googleFonts.add(importPath);
            return "";
          }

          // Handle external URLs
          if (
            importPath.startsWith("http://") ||
            importPath.startsWith("https://")
          ) {
            return "";
          }

          // Handle package imports
          if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
            const importedModule = getOrCreateModuleEntry(importPath, modules);
            trackDependency(moduleEntry, importPath);

            if (!importedModule.used.includes("*")) {
              importedModule.used.push("*");
            }

            cssImports.add(importPath);
            return importPath;
          }

          // Handle relative imports
          return importPath.startsWith("@/")
            ? `@v0/${importPath.slice(2)}`
            : joinPaths(dirname(fromPath), importPath);
        },
      },
      visitor: isCSSModule
        ? undefined
        : {
            Selector(selector: any) {
              // Detect :root selector
              if (
                selector.length === 1 &&
                selector[0] &&
                selector[0].type === "pseudo-class" &&
                selector[0].kind === "root"
              ) {
                isRootSelector = true;
                isDarkSelector = false;
              }
              // Detect .dark selector
              else if (
                selector.length === 1 &&
                selector[0] &&
                selector[0].type === "class" &&
                selector[0].name === "dark"
              ) {
                isDarkSelector = true;
                isRootSelector = false;
              } else {
                isRootSelector = false;
                isDarkSelector = false;
              }
            },
            Declaration(declaration: any) {
              // Extract CSS custom properties
              if (declaration.property === "custom") {
                if (isRootSelector) {
                  designTokens.default[declaration.value.name] =
                    serializeCSSValue(declaration.value.value);
                } else if (isDarkSelector) {
                  designTokens.dark[declaration.value.name] = serializeCSSValue(
                    declaration.value.value
                  );
                }
              }
            },
          },
    });

    // Generate runtime code
    const runtime = generateCSSRuntime({
      code: result.code.toString(),
      exports: result.exports,
      cssImports,
      googleFonts,
      designTokens,
      isCSSModule,
      modulePath: normalizedPath,
    });

    // Update module entry
    moduleEntry.type = "script";
    moduleEntry.runtime = runtime;
  });
}

/**
 * Generate CSS runtime code
 *
 * Creates JavaScript code that injects styles and manages HMR
 * Matches v0's implementation (LOC 7220-7267)
 */
function generateCSSRuntime(options: {
  code: string;
  exports?: Record<string, { name: string }>;
  cssImports: Set<string>;
  googleFonts: Set<string>;
  designTokens: DesignSystemTokens;
  isCSSModule: boolean;
  modulePath: string;
}): string {
  const {
    code,
    exports,
    cssImports,
    googleFonts,
    designTokens,
    isCSSModule,
    modulePath,
  } = options;

  // Register design tokens in the global registry
  if (!isCSSModule) {
    registerDesignTokens(designTokens);
  }

  // Generate CSS import statements
  let importStatements = "";
  cssImports.forEach((importPath) => {
    if (importPath !== "tailwindcss" && importPath !== "tw-animate-css") {
      importStatements += `import '${importPath}';\n`;
    }
  });

  // Generate Google Fonts injection
  let fontInjection = "";
  googleFonts.forEach((fontUrl) => {
    const urlJson = JSON.stringify(fontUrl);
    fontInjection += `
// Inject Google Fonts link tag
if (!document.querySelector('link[href=${urlJson}]')) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = ${urlJson}
  document.head.appendChild(link)
}
`;
  });

  // Generate style injection code
  const styleInjection = `
${importStatements}${fontInjection}
const styleTag = document.createElement('style')
styleTag.setAttribute('type', 'text/tailwindcss')
styleTag.innerHTML = ${JSON.stringify(code)}
document.head.appendChild(styleTag)
`;

  // Generate design token registration (for non-module CSS)
  const tokenRegistration = isCSSModule
    ? ""
    : `
var __dst = ${JSON.stringify(designTokens)}
globalThis.__v0_dst.push(__dst)`;

  // Generate design token cleanup (for HMR)
  const tokenCleanup = isCSSModule
    ? ""
    : `
var index = globalThis.__v0_dst.indexOf(__dst)
if (index !== -1) globalThis.__v0_dst.splice(index, 1)`;

  // Generate HMR code
  const hmrCode = `
var __mod_id=${JSON.stringify(modulePath)}
globalThis.__v0_hmr=globalThis.__v0_hmr||{}
globalThis.__v0_dst=globalThis.__v0_dst||[]
${tokenRegistration}
var __unload=globalThis.__v0_hmr[__mod_id]
if (__unload) __unload()

globalThis.__v0_hmr[__mod_id]=()=>{
  styleTag.innerHTML = ''
  styleTag.remove()
  ${tokenCleanup}
}
`;

  // Generate exports (for CSS modules)
  const exportsCode = exports
    ? `
export default {
${Object.entries(exports)
  .sort(([a], [b]) => (a < b ? -1 : 1))
  .map(
    ([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value.name)}`
  )
  .join(",\n")}
}`
    : "";

  return styleInjection + hmrCode + exportsCode;
}
