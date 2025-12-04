/**
 * CommonJS to ESM Transformation
 *
 * Converts CommonJS module.exports and require() calls to ESM syntax
 * Lines 7014-7086 from module_448763
 */

import { Node, type SourceFile, SyntaxKind } from "ts-morph";
import type { CompilationContext, ModuleInfo } from "../types";

// Regex patterns for CommonJS detection
const HAS_MODULE_EXPORTS = /module\.exports/;
const HAS_REQUIRE = /\brequire\s*\(/;

/**
 * Transform CommonJS syntax to ESM
 * @param sourceFile - ts-morph SourceFile to transform
 * @param context - Compilation context
 * @param moduleInfo - Module information for tracking exports
 */
export function transformCommonJSToESM(
  sourceFile: SourceFile,
  context: CompilationContext,
  moduleInfo?: ModuleInfo
): void {
  const code = sourceFile.getFullText();

  // Only process if file contains CommonJS patterns
  if (!HAS_MODULE_EXPORTS.test(code) && !HAS_REQUIRE.test(code)) {
    return;
  }

  // Transform module.exports to export default
  if (HAS_MODULE_EXPORTS.test(code)) {
    transformModuleExports(sourceFile, moduleInfo);
  }

  // Transform require() to import statements
  if (HAS_REQUIRE.test(code)) {
    transformRequireCalls(sourceFile, context, moduleInfo);
  }
}

/**
 * Transform module.exports = ... to export default ...
 */
function transformModuleExports(
  sourceFile: SourceFile,
  moduleInfo?: ModuleInfo
): void {
  const expressionStatements = sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  );

  for (const statement of expressionStatements) {
    const expression = statement.getExpression();

    // Check if it's a binary expression: module.exports = ...
    if (
      Node.isBinaryExpression(expression) &&
      expression.getLeft().getText() === "module.exports"
    ) {
      const rightSide = expression.getRight().getText();
      statement.replaceWithText(`export default ${rightSide}`);

      // Track the default export
      if (moduleInfo && !moduleInfo.exported.includes("default")) {
        moduleInfo.exported.push("default");
      }
    }
  }
}

/**
 * Transform require() calls to import statements
 */
function transformRequireCalls(
  sourceFile: SourceFile,
  context: CompilationContext,
  moduleInfo?: ModuleInfo
): void {
  const callExpressions = sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression
  );

  let requireCounter = 0;

  for (const callExpr of callExpressions) {
    const expression = callExpr.getExpression();

    // Check if it's a require() call
    if (!Node.isIdentifier(expression) || expression.getText() !== "require") {
      continue;
    }

    const args = callExpr.getArguments();
    if (args.length !== 1) {
      continue;
    }

    const [arg] = args;
    if (!Node.isStringLiteral(arg)) {
      continue;
    }

    const modulePath = arg.getLiteralText();

    // Resolve the module path (handle relative paths, aliases, etc.)
    const resolvedPath = resolveModulePath(
      modulePath,
      sourceFile.getFilePath(),
      context
    );

    // Only transform require() calls that are NOT inside a block
    // (i.e., top-level require calls)
    const isInsideBlock = callExpr
      .getAncestors()
      .some((ancestor) => Node.isBlock(ancestor));

    if (!isInsideBlock) {
      requireCounter++;
      const importName = `__req_mod_${requireCounter}`;

      try {
        // Replace require() with the imported module
        // Handle both default and namespace exports
        callExpr.replaceWithText(`(${importName}.default || ${importName})`);

        // Add import declaration at the top of the file
        sourceFile.addImportDeclaration({
          moduleSpecifier: resolvedPath,
          namespaceImport: importName,
        });

        // Track the dependency
        if (moduleInfo) {
          const depInfo = getOrCreateModuleInfo(resolvedPath, context);
          depInfo.used.push("*");
        }
      } catch (error) {
        console.warn(
          `[compiler error] Failed to add import declaration for ${resolvedPath}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  }
}

/**
 * Resolve a module path (handle relative paths, aliases, tsconfig paths)
 * @param modulePath - The module specifier from require()
 * @param _currentFile - Current file path (unused for now)
 * @param _context - Compilation context (unused for now)
 * @returns Resolved module path
 */
function resolveModulePath(
  modulePath: string,
  _currentFile: string,
  _context: CompilationContext
): string {
  // If it's an absolute URL, return as-is
  if (modulePath.startsWith("http://") || modulePath.startsWith("https://")) {
    return modulePath;
  }

  // TODO: Implement path resolution with tsconfig paths
  // For now, return the module path as-is
  // This should use the same resolution logic as the main compiler
  return modulePath;
}

/**
 * Get or create module info for tracking dependencies
 */
function getOrCreateModuleInfo(
  modulePath: string,
  context: CompilationContext
): ModuleInfo {
  if (!context.modules[modulePath]) {
    context.modules[modulePath] = {
      path: modulePath,
      exported: [],
      used: [],
      dependencies: [],
    };
  }
  return context.modules[modulePath];
}
