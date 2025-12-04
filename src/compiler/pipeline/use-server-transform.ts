/**
 * "use server" and "use client" Directive Handler
 *
 * Handles React Server Components directives:
 * - Detects top-level "use server" and "use client" directives
 * - Transforms inline "use server" functions into server actions
 * - Wraps server functions with createServerRef
 * - Validates that inline server actions aren't in client components
 *
 * Original: Lines 6383-6473 from module_448763
 */

import { SourceFile, SyntaxKind, Node } from "ts-morph";
import MagicString from "magic-string";

/**
 * Error message for inline "use server" in client components
 */
const INLINE_USE_SERVER_ERROR = `It is not allowed to define inline "use server" annotated Server Actions in Client Components.
To use Server Actions in a Client Component, you can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.`;

/**
 * Module metadata for directives
 */
export interface DirectiveMetadata {
  topLevelUseServer: boolean;
  topLevelUseClient: boolean;
}

/**
 * Check if a function body has "use server" directive
 */
function hasUseServerInBody(body: Node): boolean {
  if (!body) return false;

  const text = body.getFullText().trim();

  // Check if starts with "use server"
  if (text.startsWith('"use server"') || text.startsWith("'use server'")) {
    return true;
  }

  // Check first statement
  if (Node.isBlock(body)) {
    const statements = body.getStatements();
    if (statements.length > 0) {
      const firstStmt = statements[0];
      if (Node.isExpressionStatement(firstStmt)) {
        const expr = firstStmt.getExpression();
        if (Node.isStringLiteral(expr)) {
          const value = expr.getLiteralValue();
          return value === "use server";
        }
      }
    }
  }

  return false;
}

/**
 * Wrap a server function with createServerRef
 * For named functions: renames original and creates wrapper
 * For anonymous functions: wraps inline
 */
function wrapServerFunction(
  magicString: MagicString,
  functionNode: Node,
  actionCounter: { value: number }
): void {
  if (
    Node.isFunctionDeclaration(functionNode) ||
    Node.isFunctionExpression(functionNode) ||
    Node.isArrowFunction(functionNode)
  ) {
    const nameNode =
      Node.isFunctionDeclaration(functionNode) ||
      Node.isFunctionExpression(functionNode)
        ? functionNode.getNameNode()
        : undefined;

    if (nameNode) {
      // Named function: rename and create wrapper
      const originalName = nameNode.getText();
      const internalName = `__v0_action_${actionCounter.value++}`;

      // Rename the function
      magicString.overwrite(
        nameNode.getStart(),
        nameNode.getEnd(),
        internalName
      );

      // Add wrapper function after the original
      const wrapperCode = `\nfunction ${originalName}(...args) { return __v0_createServerRef(${internalName})(...args) }`;
      magicString.appendRight(functionNode.getEnd(), wrapperCode);
    } else {
      // Anonymous function: wrap inline
      const internalName = `__v0_action_${actionCounter.value++}`;
      const start = functionNode.getStart();
      const end = functionNode.getEnd();
      const functionCode = functionNode.getText();

      // Create internal function and wrapper
      const wrappedCode = `(function ${internalName}${functionCode.slice(
        functionCode.indexOf("(")
      )}, __v0_createServerRef(${internalName}))`;

      magicString.overwrite(start, end, wrappedCode);
    }
  }
}

/**
 * Process "use server" and "use client" directives
 *
 * @param sourceFile - ts-morph SourceFile
 * @param magicString - MagicString for code transformations
 * @returns Directive metadata
 */
export function processDirectives(
  sourceFile: SourceFile,
  magicString: MagicString
): DirectiveMetadata {
  let topLevelUseServer = false;
  let topLevelUseClient = false;
  let hasInlineServerActions = false;
  const actionCounter = { value: 0 };

  const fullText = sourceFile.getFullText();
  const hasAnyServerDirective =
    fullText.includes('"use server"') || fullText.includes("'use server'");

  // Check for top-level directives
  if (
    fullText.startsWith('"use server"') ||
    fullText.startsWith("'use server'")
  ) {
    topLevelUseServer = true;
  } else if (
    fullText.startsWith('"use client"') ||
    fullText.startsWith("'use client'")
  ) {
    topLevelUseClient = true;
  } else {
    // Check first statements
    for (const statement of sourceFile.getStatements()) {
      if (Node.isExpressionStatement(statement)) {
        const text = statement.getText();
        if (/^['"]use server['"]$/.test(text)) {
          topLevelUseServer = true;
          break;
        } else if (/^['"]use client['"]$/.test(text)) {
          topLevelUseClient = true;
          break;
        }
      } else {
        break; // Directives must be at the top
      }
    }
  }

  // Process inline "use server" in functions (if file has any server directives)
  if (hasAnyServerDirective) {
    // Process function declarations
    for (const funcDecl of sourceFile.getDescendantsOfKind(
      SyntaxKind.FunctionDeclaration
    )) {
      const body = funcDecl.getBody();
      if (body && hasUseServerInBody(body)) {
        hasInlineServerActions = true;
        wrapServerFunction(magicString, funcDecl, actionCounter);
      }
    }

    // Process function expressions
    for (const funcExpr of sourceFile.getDescendantsOfKind(
      SyntaxKind.FunctionExpression
    )) {
      const body = funcExpr.getBody();
      if (body && hasUseServerInBody(body)) {
        hasInlineServerActions = true;
        wrapServerFunction(magicString, funcExpr, actionCounter);
      }
    }

    // Process arrow functions
    for (const arrowFunc of sourceFile.getDescendantsOfKind(
      SyntaxKind.ArrowFunction
    )) {
      const body = arrowFunc.getBody();
      if (body && hasUseServerInBody(body)) {
        hasInlineServerActions = true;
        wrapServerFunction(magicString, arrowFunc, actionCounter);
      }
    }
  }

  // Add createServerRef import if we have inline server actions
  if (hasInlineServerActions) {
    magicString.append(`
import { createServerRef as __v0_createServerRef } from '__v0__/internal'
`);

    // If this is a client component with inline server actions, throw error
    if (topLevelUseClient) {
      magicString.append(`
throw new Error(${JSON.stringify(INLINE_USE_SERVER_ERROR)})
`);
    }
  }

  return {
    topLevelUseServer,
    topLevelUseClient,
  };
}

/**
 * Check if a source file has "use server" directive
 */
export function hasUseServerDirective(sourceFile: SourceFile): boolean {
  const text = sourceFile.getFullText();

  if (text.startsWith('"use server"') || text.startsWith("'use server'")) {
    return true;
  }

  for (const statement of sourceFile.getStatements()) {
    if (Node.isExpressionStatement(statement)) {
      if (/^['"]use server['"]$/.test(statement.getText())) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;
}

/**
 * Check if a source file has "use client" directive
 */
export function hasUseClientDirective(sourceFile: SourceFile): boolean {
  const text = sourceFile.getFullText();

  if (text.startsWith('"use client"') || text.startsWith("'use client'")) {
    return true;
  }

  for (const statement of sourceFile.getStatements()) {
    if (Node.isExpressionStatement(statement)) {
      if (/^['"]use client['"]$/.test(statement.getText())) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;
}
