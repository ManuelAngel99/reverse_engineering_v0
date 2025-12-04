/**
 * Code Transformers
 * Source: module_448763 (Lines 738-790)
 *
 * Applies code transformations during compilation:
 * - document.cookie → __v0_cookie_doc.cookie
 * - Import path resolution
 * - "use server" directive handling
 * - CommonJS to ESM conversion
 * - JSX tracking metadata injection
 */

import type { SourceFile, FunctionDeclaration, SyntaxKind } from "ts-morph";
import MagicString from "magic-string";

// ============================================================================
// Types
// ============================================================================

/**
 * Transformation context
 */
export interface TransformContext {
  /** Source file being transformed */
  sourceFile: SourceFile;
  /** MagicString instance for modifications */
  magicString: MagicString;
  /** File path */
  filePath: string;
  /** tsconfig.json paths */
  tsconfigPaths?: Record<string, string[]>;
}

/**
 * Transformation result
 */
export interface TransformResult {
  /** Transformed code */
  code: string;
  /** Whether code was modified */
  modified: boolean;
}

// ============================================================================
// 1. document.cookie Transformation
// ============================================================================

/**
 * Replace document.cookie with __v0_cookie_doc.cookie
 * Sandboxes cookie access for security
 *
 * @param context - Transformation context
 * @returns True if any replacements were made
 */
export function transformDocumentCookie(context: TransformContext): boolean {
  const { sourceFile, magicString } = context;
  let modified = false;

  // Find all property access expressions
  const propertyAccesses = sourceFile.getDescendantsOfKind(
    259 as SyntaxKind // PropertyAccessExpression
  );

  for (const expr of propertyAccesses) {
    const text = expr.getText();

    if (text === "document.cookie") {
      const start = expr.getStart();
      const end = expr.getEnd();

      magicString.overwrite(start, end, "__v0_cookie_doc.cookie");
      modified = true;
    }
  }

  return modified;
}

// ============================================================================
// 2. Import Path Resolution
// ============================================================================

/**
 * Resolve import path based on tsconfig paths and relative resolution
 *
 * @param specifier - Import specifier
 * @param currentFile - Current file path
 * @param tsconfigPaths - tsconfig.json paths mapping
 * @returns Resolved path
 */
export function resolveImportPath(
  specifier: string,
  _currentFile: string,
  tsconfigPaths?: Record<string, string[]>
): string {
  // Don't transform external packages
  if (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("@/")
  ) {
    return specifier;
  }

  // Handle @/* paths from tsconfig
  if (specifier.startsWith("@/") && tsconfigPaths) {
    const paths = tsconfigPaths["@/*"];
    if (paths && paths.length > 0) {
      // Replace @/ with the first path mapping
      const basePath = paths[0].replace("/*", "");
      return specifier.replace("@/", `./${basePath}/`);
    }
  }

  // Relative paths are kept as-is
  return specifier;
}

/**
 * Transform import declarations
 * Resolves import paths according to tsconfig and project structure
 *
 * @param context - Transformation context
 * @returns True if any imports were modified
 */
export function transformImports(context: TransformContext): boolean {
  const { sourceFile, magicString, filePath, tsconfigPaths } = context;
  let modified = false;

  const imports = sourceFile.getImportDeclarations();

  for (const importDecl of imports) {
    const specifier = importDecl.getModuleSpecifierValue();
    const resolved = resolveImportPath(specifier, filePath, tsconfigPaths);

    if (resolved !== specifier) {
      const specifierNode = importDecl.getModuleSpecifier();
      const start = specifierNode.getStart() + 1; // Skip opening quote
      const end = specifierNode.getEnd() - 1; // Skip closing quote

      magicString.overwrite(start, end, resolved);
      modified = true;
    }
  }

  return modified;
}

// ============================================================================
// 3. "use server" Directive Handling
// ============================================================================

/**
 * Check if file has "use server" directive at the top
 *
 * @param sourceFile - Source file to check
 * @returns True if has "use server" directive
 */
export function hasUseServerDirective(sourceFile: SourceFile): boolean {
  const statements = sourceFile.getStatements();

  if (statements.length === 0) return false;

  const firstStatement = statements[0];
  const text = firstStatement.getText().trim();

  return text === '"use server"' || text === "'use server'";
}

/**
 * Check if function has "use server" in its body
 *
 * @param fn - Function declaration
 * @returns True if has "use server" in body
 */
export function hasUseServerInBody(fn: FunctionDeclaration): boolean {
  const body = fn.getBody();
  if (!body) return false;

  const statements = body.getStatements();
  if (statements.length === 0) return false;

  const firstStatement = statements[0];
  const text = firstStatement.getText().trim();

  return text === '"use server"' || text === "'use server'";
}

/**
 * Transform "use server" functions
 * Wraps server functions with __v0_createServerRef for client-side stubs
 *
 * @param context - Transformation context
 * @returns True if any functions were transformed
 */
export function transformUseServer(context: TransformContext): boolean {
  const { sourceFile, magicString } = context;
  let modified = false;

  // Check for file-level "use server"
  const hasFileDirective = hasUseServerDirective(sourceFile);

  if (hasFileDirective) {
    // Transform all exported functions
    const functions = sourceFile.getFunctions();

    for (const fn of functions) {
      if (!fn.isExported()) continue;

      const name = fn.getName();
      if (!name) continue;

      const internalName = `__v0_${name}_internal`;
      const fnStart = fn.getStart();
      const fnEnd = fn.getEnd();

      // Rename function to internal version
      const fnText = fn.getText();
      const modifiedFn = fnText.replace(
        new RegExp(`\\bfunction\\s+${name}\\b`),
        `function ${internalName}`
      );

      // Create wrapper
      const wrapper = `
${modifiedFn}

export const ${name} = __v0_createServerRef(${internalName});
`;

      magicString.overwrite(fnStart, fnEnd, wrapper);
      modified = true;
    }
  } else {
    // Check individual functions
    const functions = sourceFile.getFunctions();

    for (const fn of functions) {
      if (!fn.isExported() || !hasUseServerInBody(fn)) continue;

      const name = fn.getName();
      if (!name) continue;

      const internalName = `__v0_${name}_internal`;
      const fnStart = fn.getStart();
      const fnEnd = fn.getEnd();

      const fnText = fn.getText();
      const modifiedFn = fnText.replace(
        new RegExp(`\\bfunction\\s+${name}\\b`),
        `function ${internalName}`
      );

      const wrapper = `
${modifiedFn}

export const ${name} = __v0_createServerRef(${internalName});
`;

      magicString.overwrite(fnStart, fnEnd, wrapper);
      modified = true;
    }
  }

  return modified;
}

// ============================================================================
// 4. CommonJS to ESM Conversion
// ============================================================================

/**
 * Check if file uses CommonJS (module.exports or exports.*)
 *
 * @param sourceFile - Source file to check
 * @returns True if uses CommonJS
 */
export function hasCommonJS(sourceFile: SourceFile): boolean {
  const text = sourceFile.getFullText();
  return text.includes("module.exports") || /\bexports\.\w+/.test(text);
}

/**
 * Convert CommonJS exports to ESM
 * - module.exports = X → export default X
 * - exports.foo = X → export const foo = X
 *
 * @param context - Transformation context
 * @returns True if any conversions were made
 */
export function convertCommonJSToESM(context: TransformContext): boolean {
  const { sourceFile, magicString } = context;
  let modified = false;

  const text = sourceFile.getFullText();

  // Convert module.exports = ...
  const moduleExportsRegex = /module\.exports\s*=\s*/g;
  let match: RegExpExecArray | null;

  while ((match = moduleExportsRegex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    magicString.overwrite(start, end, "export default ");
    modified = true;
  }

  // Convert exports.foo = ...
  const exportsRegex = /exports\.(\w+)\s*=\s*/g;
  let match2: RegExpExecArray | null;

  while ((match2 = exportsRegex.exec(text)) !== null) {
    const start = match2.index;
    const end = start + match2[0].length;
    const name = match2[1];

    magicString.overwrite(start, end, `export const ${name} = `);
    modified = true;
  }

  return modified;
}

/**
 * Convert top-level require() to import statements
 * Only converts simple cases: const X = require('Y')
 *
 * @param context - Transformation context
 * @returns True if any conversions were made
 */
export function convertRequireToImport(context: TransformContext): boolean {
  const { sourceFile, magicString } = context;
  let modified = false;

  const text = sourceFile.getFullText();

  // Match: const X = require('Y')
  const requireRegex = /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g;
  let match: RegExpExecArray | null;

  while ((match = requireRegex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    const varName = match[1];
    const moduleName = match[2];

    magicString.overwrite(start, end, `import ${varName} from '${moduleName}'`);
    modified = true;
  }

  // Match: const { X, Y } = require('Z')
  const destructureRegex =
    /const\s*\{([^}]+)\}\s*=\s*require\(['"]([^'"]+)['"]\)/g;
  let match3: RegExpExecArray | null;

  while ((match3 = destructureRegex.exec(text)) !== null) {
    const start = match3.index;
    const end = start + match3[0].length;
    const imports = match3[1].trim();
    const moduleName = match3[2];

    magicString.overwrite(
      start,
      end,
      `import { ${imports} } from '${moduleName}'`
    );
    modified = true;
  }

  return modified;
}

// ============================================================================
// Combined Transformer
// ============================================================================

/**
 * Apply all transformations to a source file
 *
 * @param context - Transformation context
 * @returns Transformation result
 */
export function applyAllTransformations(
  context: TransformContext
): TransformResult {
  let modified = false;

  // Apply transformations in order
  modified = transformDocumentCookie(context) || modified;
  modified = transformImports(context) || modified;
  modified = transformUseServer(context) || modified;

  if (hasCommonJS(context.sourceFile)) {
    modified = convertCommonJSToESM(context) || modified;
    modified = convertRequireToImport(context) || modified;
  }

  return {
    code: context.magicString.toString(),
    modified,
  };
}

// ============================================================================
// Exports
// ============================================================================

// All exports are already declared above with export keyword
