/**
 * Compilation Pipeline - Complete Implementation
 *
 * This matches the original v0 compilation pipeline structure (IV function)
 * with the correct API: add(), addStyle(), addStaticFile(), addEnvFile(), addJSON(), seal()
 *
 * Original: Lines 6175-7408 from module_448763
 */

import { Project, SourceFile, SyntaxKind, Node } from "ts-morph";
import MagicString from "magic-string";
import {
  createTypeScriptProject,
  type FileEntry,
} from "../typescript/project-setup";
import { injectJSXMetadata } from "./jsx-metadata-injection";
import { processDirectives } from "./use-server-transform";

// ============================================================================
// Types
// ============================================================================

export interface ModuleResult {
  type: "script" | "style" | "static";
  runtime?: string;
  dependencies: Record<string, string[]>;
  exported: string[];
  used: string[];
  meta: {
    topLevelUseServer?: boolean;
    topLevelUseClient?: boolean;
  };
  path: string;
  originalPath?: string;
}

export interface StaticFileResult {
  type: "raw" | "url";
  content: string;
}

export interface CompilationPipeline {
  project: Project;
  add: (
    path: string,
    source: string,
    originalPath: string,
    skipProcessing?: boolean
  ) => void;
  addStyle: (params: { path: string; source: string }) => void;
  addStaticFile: (
    path: string,
    file: [string, { type: "raw" | "url"; data: string }]
  ) => void;
  addEnvFile: (path: string, source: string) => void;
  addJSON: (path: string, source: string) => void;
  seal: (skipEmit?: boolean) => Promise<{
    entryModules: string[];
    modules: Record<string, ModuleResult>;
    staticFiles: Record<string, StaticFileResult>;
    envs: Record<string, string>;
  }>;
}

// ============================================================================
// Constants
// ============================================================================

const SCRIPT_FILE_PATTERN = /\.(tsx?|jsx?)$/i;
const COMMONJS_PATTERN = /(module\.exports|require\()/;
const UPPERCASE_PATTERN = /[A-Z]/;
const ERROR_CODES = new Set([1005, 2304, 2307]);
const ENV_VAR_PATTERN =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^\r\n#]+)?\s*(?:#.*)?(?:$|$)/gm;
const MIDDLEWARE_PATTERN = /\/middleware\.(tsx?|jsx?)$/;

// Package replacements
const PACKAGE_ALIASES: Record<string, string> = {
  bcrypt: "bcryptjs",
};

// ============================================================================
// Helper Functions
// ============================================================================

function normalizeModulePath(
  path: string,
  isAbsolute: boolean,
  paths?: Record<string, string[]>
): string {
  if (isAbsolute && path.startsWith("/")) {
    return path;
  }
  return `/@v0${path.startsWith("/") ? "" : "/"}${path}`;
}

function getOrCreateModule(
  path: string,
  modules: Record<string, ModuleResult>
): ModuleResult {
  if (!modules[path]) {
    modules[path] = {
      type: "script",
      dependencies: {},
      exported: [],
      used: [],
      meta: {},
      path: "",
    };
  }
  return modules[path];
}

function getModuleDependencies(
  path: string,
  dependencies: Record<string, Record<string, string[]>>
): string[] {
  if (!dependencies[path]) {
    dependencies[path] = {};
  }
  return [];
}

function resolveImportPath(
  basePath: string,
  specifier: string,
  paths?: Record<string, string[]>
): string {
  // Apply package aliases
  if (PACKAGE_ALIASES[specifier]) {
    specifier = PACKAGE_ALIASES[specifier];
  }

  // Handle absolute URLs
  if (specifier.startsWith("http://") || specifier.startsWith("https://")) {
    return specifier;
  }

  // Handle relative paths
  if (specifier.startsWith(".")) {
    const baseParts = basePath.split("/").slice(0, -1);
    const specifierParts = specifier.split("/");

    for (const part of specifierParts) {
      if (part === "..") {
        baseParts.pop();
      } else if (part !== ".") {
        baseParts.push(part);
      }
    }

    return baseParts.join("/");
  }

  // Handle path mappings (tsconfig paths)
  if (paths) {
    for (const [pattern, targets] of Object.entries(paths)) {
      const patternPrefix = pattern.replace("/*", "");
      if (specifier.startsWith(patternPrefix)) {
        const target = targets[0]?.replace("/*", "") || "";
        const resolved = specifier.replace(patternPrefix, target);
        return normalizeModulePath(resolved, true, paths);
      }
    }
  }

  return specifier;
}

function parseEnvFile(source: string): Record<string, string> {
  const envVars: Record<string, string> = {};
  const normalized = source.replace(/\r\n?/gm, "\n");
  let match;

  while ((match = ENV_VAR_PATTERN.exec(normalized)) !== null) {
    const [, key] = match;
    if (!key) continue;

    let value = match[2] || "";
    value = value.trim();
    const firstChar = value[0];

    // Remove quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

    // Handle escape sequences in double quotes
    if (firstChar === '"') {
      value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    }

    envVars[key] = value;
  }

  return envVars;
}

// ============================================================================
// Main Pipeline Function
// ============================================================================

export async function createCompilationPipeline(
  files: FileEntry[],
  options?: { timestamp?: number },
  existingProject?: Project
): Promise<CompilationPipeline> {
  // Initialize TypeScript project
  const project =
    existingProject || createTypeScriptProject(files, options?.timestamp);
  const modules: Record<string, ModuleResult> = {};
  const dependencies: Record<string, Record<string, string[]>> = {};
  const callbacks: Array<() => Promise<void>> = [];
  const staticFiles: Record<string, StaticFileResult> = {};
  const envs: Record<string, string> = {};

  const paths = project.getCompilerOptions().paths;

  // ============================================================================
  // add() - Add and compile a source file
  // ============================================================================
  const add = (
    path: string,
    source: string,
    originalPath: string,
    skipProcessing?: boolean
  ): void => {
    const normalizedPath = normalizeModulePath(path, true, paths);
    const module = getOrCreateModule(normalizedPath, modules);
    module.path = path;
    module.originalPath = originalPath;

    if (skipProcessing) {
      return;
    }

    // Create source file
    const sourceFile = project.createSourceFile(normalizedPath, source, {
      overwrite: true,
    });

    const magicString = new MagicString(source);
    const originalCode = source;

    // Get existing files for import resolution
    const existingFiles = project
      .getSourceFiles()
      .map((sf) => normalizeModulePath(sf.getFilePath(), true, paths).slice(1));

    // Transform document.cookie access
    sourceFile
      .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
      .forEach((expr) => {
        if (expr.getText() === "document.cookie") {
          magicString.overwrite(
            expr.getStart(),
            expr.getEnd(),
            "__v0_cookie_doc.cookie"
          );
        }
      });

    // Process imports
    sourceFile.getImportDeclarations().forEach((importDecl) => {
      const specifier = importDecl.getModuleSpecifierValue();
      const resolved = resolveImportPath(path, specifier, paths);

      // Track dependencies
      if (!module.dependencies[resolved]) {
        module.dependencies[resolved] = [];
      }
      const deps = module.dependencies[resolved];

      // Update import specifier
      const specifierNode = importDecl.getModuleSpecifier();
      magicString.overwrite(
        specifierNode.getStart(),
        specifierNode.getEnd(),
        JSON.stringify(resolved)
      );

      const targetModule = getOrCreateModule(resolved, modules);

      // Track named imports
      importDecl.getNamedImports().forEach((namedImport) => {
        const name = namedImport.getName();
        if (!deps.includes(name)) deps.push(name);
        if (!targetModule.used.includes(name)) targetModule.used.push(name);
      });

      // Track namespace imports
      if (importDecl.getNamespaceImport()) {
        if (!deps.includes("*")) deps.push("*");
        if (!targetModule.used.includes("*")) targetModule.used.push("*");
      }

      // Track default imports
      if (importDecl.getDefaultImport()) {
        if (!deps.includes("default")) deps.push("default");
        if (!targetModule.used.includes("default"))
          targetModule.used.push("default");
      }
    });

    // Process dynamic imports
    sourceFile
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .forEach((callExpr) => {
        const expr = callExpr.getExpression();
        if (expr.getKind() !== SyntaxKind.ImportKeyword) return;

        const args = callExpr.getArguments();
        if (args.length !== 1) return;

        const [arg] = args;
        if (!Node.isStringLiteral(arg)) return;

        const specifier = arg.getLiteralValue();
        const resolved = resolveImportPath(path, specifier, paths);

        if (!module.dependencies[resolved]) {
          module.dependencies[resolved] = [];
        }
        module.dependencies[resolved].push("*");

        magicString.overwrite(
          arg.getStart(),
          arg.getEnd(),
          JSON.stringify(resolved)
        );

        const targetModule = getOrCreateModule(resolved, modules);
        if (!targetModule.used.includes("*")) targetModule.used.push("*");
      });

    // Handle syntax errors
    try {
      const diagnostics = project
        .getProgram()
        .getSyntacticDiagnostics(sourceFile);

      for (const diagnostic of diagnostics) {
        if (ERROR_CODES.has(diagnostic.getCode())) {
          const messageText = diagnostic.getMessageText();
          const message =
            typeof messageText === "string"
              ? messageText
              : messageText.getMessageText();

          let errorContext = "";
          const start = diagnostic.getStart();
          if (typeof start === "number") {
            const { line, column } = sourceFile.getLineAndColumnAtPos(start);
            const lines = source.split("\n");
            const errorLine = lines[line - 1];
            const length = diagnostic.getLength() || 1;
            errorContext = `> ${errorLine}\n> ${" ".repeat(
              column - 1
            )}${"^".repeat(length)}`;
          }

          const errorCode = `throw new Error(${JSON.stringify(
            message
          )}, { cause: ${JSON.stringify(errorContext)} })`;
          sourceFile.replaceWithText(
            `${errorCode}\n\nexport * from "__v0__/internal";export default from "__v0__/internal"`
          );

          console.error(
            `[compiler error] Syntax error in ${originalPath}:\n${message}\n${errorContext}`
          );
          return;
        }
      }
    } catch (error) {
      // Ignore diagnostic errors
    }

    // Process "use server"/"use client" directives
    const directiveMeta = processDirectives(sourceFile, magicString);
    module.meta = directiveMeta;

    // Apply JSX metadata injection
    if (/\.(tsx|jsx)$/i.test(path)) {
      try {
        injectJSXMetadata(sourceFile, magicString, originalCode);
      } catch (error) {
        console.warn(`Failed to inject JSX metadata in ${path}:`, error);
      }
    }

    // Extract exports
    sourceFile.getExportSymbols().forEach((symbol) => {
      const name = symbol.getName();
      if (!module.exported.includes(name)) {
        module.exported.push(name);
      }
    });

    // Store transformed code
    module.runtime = magicString.toString();
  };

  // ============================================================================
  // addStyle() - Add and compile a CSS file
  // ============================================================================
  const addStyle = ({
    path,
    source,
  }: {
    path: string;
    source: string;
  }): void => {
    const normalizedPath = normalizeModulePath(path, true, paths);
    const module = getOrCreateModule(normalizedPath, modules);
    module.type = "style";
    module.path = path;

    // Store raw CSS for resolver
    const cssModuleRawContent: Record<string, string> = {};
    cssModuleRawContent[normalizedPath] = source;

    // Add CSS processing callback
    callbacks.push(async () => {
      try {
        const isCSSModule = path.endsWith(".module.css");
        const cssImports = new Set<string>();
        const googleFonts = new Set<string>();
        let isRootSelector = false;
        let isDarkSelector = false;

        // Design system tokens for Tailwind v4
        const designTokens: {
          dark: Record<string, string>;
          default: Record<string, string>;
          theme: Record<string, string>;
        } = {
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

        // Try to use LightningCSS if available
        try {
          // Dynamic import of LightningCSS
          const { transform } = await import("lightningcss");

          const result = await transform({
            filename: normalizedPath,
            code: Buffer.from(source),
            cssModules: isCSSModule,
            minify: true,
            sourceMap: false,
            errorRecovery: true,
            targets: {
              chrome: 90 << 16,
            },
            visitor: isCSSModule
              ? undefined
              : {
                  Rule: {
                    style(rule: any) {
                      // Track :root and .dark selectors for design tokens
                      if (rule.value.selectors) {
                        for (const selector of rule.value.selectors) {
                          if (
                            selector.length === 1 &&
                            selector[0]?.type === "pseudo-class" &&
                            selector[0]?.kind === "root"
                          ) {
                            isRootSelector = true;
                            isDarkSelector = false;
                          } else if (
                            selector.length === 1 &&
                            selector[0]?.type === "class" &&
                            selector[0]?.name === "dark"
                          ) {
                            isDarkSelector = true;
                            isRootSelector = false;
                          } else {
                            isRootSelector = false;
                            isDarkSelector = false;
                          }
                        }
                      }

                      // Extract CSS variables
                      if (rule.value.declarations) {
                        for (const decl of rule.value.declarations) {
                          if (
                            decl.property === "custom" &&
                            decl.value &&
                            typeof decl.value === "object"
                          ) {
                            const varName = decl.property;
                            const varValue = String(decl.value);

                            if (isDarkSelector) {
                              designTokens.dark[varName] = varValue;
                            } else if (isRootSelector) {
                              designTokens.default[varName] = varValue;
                            }
                          }
                        }
                      }

                      return rule;
                    },
                  },
                },
          });

          const cssCode = result.code.toString();
          const cssExports = result.exports || {};

          // Generate runtime code
          const styleInjection = `
const styleTag = document.createElement('style');
styleTag.textContent = ${JSON.stringify(cssCode)};
document.head.appendChild(styleTag);
`;

          // Generate design token registration
          const hasTokens =
            Object.keys(designTokens.dark).length > 0 ||
            Object.keys(designTokens.default).length > 0 ||
            Object.keys(designTokens.theme).length > 0;

          const tokenRegistration = hasTokens
            ? `
const __dst = ${JSON.stringify(designTokens)}
globalThis.__v0_dst = globalThis.__v0_dst || []
globalThis.__v0_dst.push(__dst)
`
            : "";

          // Generate design token cleanup (for HMR)
          const tokenCleanup = hasTokens
            ? `
  const index = globalThis.__v0_dst.indexOf(__dst)
  if (index !== -1) globalThis.__v0_dst.splice(index, 1)
`
            : "";

          // Generate HMR code
          const hmrCode = `
const __mod_id = ${JSON.stringify(normalizedPath)}
globalThis.__v0_hmr = globalThis.__v0_hmr || {}
globalThis.__v0_dst = globalThis.__v0_dst || []
${tokenRegistration}
const __unload = globalThis.__v0_hmr[__mod_id]
if (__unload) __unload()

globalThis.__v0_hmr[__mod_id] = () => {
  styleTag.innerHTML = ''
  styleTag.remove()
  ${tokenCleanup}
}
`;

          // Generate exports (for CSS modules)
          const exportsCode =
            isCSSModule && Object.keys(cssExports).length > 0
              ? `
export default {
${Object.entries(cssExports)
  .sort(([a], [b]) => (a < b ? -1 : 1))
  .map(
    ([key, value]: [string, any]) =>
      `  ${JSON.stringify(key)}: ${JSON.stringify(value.name)}`
  )
  .join(",\n")}
}
`
              : "";

          module.runtime = styleInjection + hmrCode + exportsCode;
        } catch (lightningError) {
          console.warn(
            `LightningCSS not available for ${path}, using fallback:`,
            lightningError
          );

          // Fallback: basic CSS injection
          module.runtime = `
const styleTag = document.createElement('style');
styleTag.textContent = ${JSON.stringify(source)};
document.head.appendChild(styleTag);

const __mod_id = ${JSON.stringify(normalizedPath)};
globalThis.__v0_hmr = globalThis.__v0_hmr || {};
const __unload = globalThis.__v0_hmr[__mod_id];
if (__unload) __unload();

globalThis.__v0_hmr[__mod_id] = () => {
  styleTag.innerHTML = '';
  styleTag.remove();
};
${isCSSModule ? "export default {};" : ""}
`;
        }
      } catch (error) {
        console.error(`CSS processing failed for ${path}:`, error);
        module.runtime = `/* Error processing CSS: ${error} */`;
      }
    });
  };

  // ============================================================================
  // addStaticFile() - Register a static file
  // ============================================================================
  const addStaticFile = (
    path: string,
    file: [string, { type: "raw" | "url"; data: string }]
  ): void => {
    const [, fileData] = file;
    staticFiles[path] = {
      type: fileData.type,
      content: fileData.data,
    };
  };

  // ============================================================================
  // addEnvFile() - Parse and register environment variables
  // ============================================================================
  const addEnvFile = (path: string, source: string): void => {
    const parsed = parseEnvFile(source);
    Object.assign(envs, parsed);
  };

  // ============================================================================
  // addJSON() - Convert JSON to ES module
  // ============================================================================
  const addJSON = (path: string, source: string): void => {
    const normalizedPath = normalizeModulePath(path, true, paths);
    const module = getOrCreateModule(normalizedPath, modules);
    module.type = "script";
    module.path = path;

    let parsed: any = {};
    try {
      parsed = JSON.parse(source);
    } catch (error) {
      console.error(`Invalid JSON in ${path}:`, error);
    }

    // Escape line/paragraph separators
    const escapedSource = source
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");

    // Generate ES module with named exports
    const namedExports = Object.keys(parsed)
      .map((key, index) => {
        const jsonKey = JSON.stringify(key);
        return `const v_${index} = v[${jsonKey}]; export { v_${index} as ${jsonKey} };`;
      })
      .join("\n");

    module.runtime = `const v = ${escapedSource}
export default v
${namedExports}`;
  };

  // ============================================================================
  // seal() - Finalize compilation and generate output
  // ============================================================================
  const seal = async (
    skipEmit?: boolean
  ): Promise<{
    entryModules: string[];
    modules: Record<string, ModuleResult>;
    staticFiles: Record<string, StaticFileResult>;
    envs: Record<string, string>;
  }> => {
    // Emit TypeScript with React Refresh transformer if not skipped
    if (!skipEmit) {
      try {
        // Import React Refresh transformer dynamically
        const reactRefreshModule = await import("react-refresh/babel");
        const ReactRefreshPlugin = reactRefreshModule.default;

        // Note: ts-morph doesn't directly support React Refresh transformer
        // We'll wrap the emitted code instead, matching the original approach
        const emitResult = project.emitToMemory();
        const emittedFiles = emitResult.getFiles();

        for (const emittedFile of emittedFiles) {
          const filePath = emittedFile.filePath;
          const normalizedPath = normalizeModulePath(
            filePath,
            true,
            paths
          ).slice(1);
          const module = modules[normalizedPath];

          if (module && module.type === "script") {
            // Wrap with React Refresh runtime
            module.runtime = `
var prevRefreshReg = self.__v0_$RefreshReg$
var prevRefreshSig = self.__v0_$RefreshSig$
self.__v0_$RefreshReg$ = (type, id) => {
  id = ${JSON.stringify(normalizedPath)} + ' ' + id
  self.__v0_rscRefreshRegister(type, id)
  self.__v0_refreshRuntime.register(type, id)
}
self.__v0_$RefreshSig$ = typeof __v0_refreshRuntime !== 'undefined' ? __v0_refreshRuntime.createSignatureFunctionForTransform : () => {}

${emittedFile.text}

self.__v0_$RefreshReg$ = prevRefreshReg
self.__v0_$RefreshSig$ = prevRefreshSig`;
          }
        }
      } catch (error) {
        console.warn(
          "React Refresh integration failed, using fallback:",
          error
        );
        // Fallback: wrap existing runtime code
        for (const [modulePath, module] of Object.entries(modules)) {
          if (module.type === "script" && module.runtime) {
            if (/\.(tsx|jsx)$/i.test(modulePath)) {
              module.runtime = `
var prevRefreshReg = self.__v0_$RefreshReg$
var prevRefreshSig = self.__v0_$RefreshSig$
self.__v0_$RefreshReg$ = (type, id) => {
  id = ${JSON.stringify(modulePath)} + ' ' + id
  self.__v0_rscRefreshRegister(type, id)
  self.__v0_refreshRuntime.register(type, id)
}
self.__v0_$RefreshSig$ = typeof __v0_refreshRuntime !== 'undefined' ? __v0_refreshRuntime.createSignatureFunctionForTransform : () => {}

${module.runtime}

self.__v0_$RefreshReg$ = prevRefreshReg
self.__v0_$RefreshSig$ = prevRefreshSig`;
            }
          }
        }
      }
    }

    // Execute all pending callbacks (CSS processing, etc.)
    for (const callback of callbacks) {
      await callback();
    }
    callbacks.length = 0;

    // Determine entry modules (filter out middleware, CSS, and dependencies)
    const entryModules = Array.from(
      new Set(
        Object.keys(modules).filter((modulePath) => {
          // Skip middleware
          if (MIDDLEWARE_PATTERN.test(modulePath)) {
            return false;
          }

          // Skip CSS
          if (modulePath.endsWith(".css")) {
            return false;
          }

          // Check if it's a dependency of another module
          const isDependency = Object.values(modules).some((mod) =>
            Object.keys(mod.dependencies).some((dep) => {
              if (!dep.endsWith("page") && !dep.endsWith("route")) {
                return false;
              }
              return dep === modulePath;
            })
          );

          return !isDependency;
        })
      )
    );

    return {
      entryModules,
      modules,
      staticFiles,
      envs,
    };
  };

  return {
    project,
    add,
    addStyle,
    addStaticFile,
    addEnvFile,
    addJSON,
    seal,
  };
}

// ============================================================================
// Default Export
// ============================================================================

export default createCompilationPipeline;
