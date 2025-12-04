/**
 * Lucide React Single Reference Detection
 *
 * Detects whether a lucide-react icon has a single JSX reference.
 * This metadata is used by the JSX metadata injection system.
 *
 * IMPORTANT: This does NOT transform imports. The original v0 code only
 * tracks singleRef for metadata purposes, not for import optimization.
 *
 * Original: Lines 6532-6598 from module_448763
 */

import { Node, type SourceFile, SyntaxKind } from "ts-morph";

export interface LucideIconInfo {
  name: string;
  isSingleRef: boolean;
  declStart: number;
  declEnd: number;
}

/**
 * Detect lucide-react icons and their single-reference status
 * This is used for JSX metadata, NOT for import transformation
 *
 * @param sourceFile - ts-morph SourceFile to process
 * @param originalCode - Original source code for reference counting
 * @returns Map of icon names to their single-reference status
 */
export function detectLucideIcons(
  sourceFile: SourceFile,
  originalCode: string
): Map<string, boolean> {
  const filePath = sourceFile.getFilePath();
  const singleRefCache = new Map<string, boolean>();

  // Find all lucide-react imports
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifier().getLiteralValue();

    if (moduleSpecifier !== "lucide-react") {
      continue;
    }

    // Get all named imports from lucide-react
    const namedImports = importDecl.getNamedImports();

    for (const namedImport of namedImports) {
      const iconName = namedImport.getName();
      const tagNode = namedImport.getNameNode();

      // Check if this icon has a single reference
      const isSingleRef = checkSingleReference(
        iconName,
        tagNode,
        filePath,
        originalCode,
        singleRefCache
      );

      singleRefCache.set(iconName, isSingleRef);
    }
  }

  return singleRefCache;
}

/**
 * Check if an icon has a single JSX reference
 * This matches the original v0 logic from lines 6532-6598
 */
function checkSingleReference(
  iconName: string,
  tagNode: Node,
  filePath: string,
  originalCode: string,
  cache: Map<string, boolean>
): boolean {
  // Check cache first
  if (cache.has(iconName)) {
    return cache.get(iconName)!;
  }

  // Count occurrences in original code (should be 2-3 for single ref: import + usage)
  const occurrences = countOccurrences(originalCode, iconName);

  // Quick check: if exactly 2 or 3 occurrences, likely a single ref
  if (occurrences === 2 || occurrences === 3) {
    cache.set(iconName, true);
    return true;
  }

  // Detailed check: count JSX usages and detect non-JSX usage
  let jsxUsageCount = 0;
  let hasNonJSXUsage = false;

  if (Node.isIdentifier(tagNode)) {
    for (const refSymbol of tagNode.findReferences()) {
      // Get the first non-definition reference (the actual usage)
      const definition = refSymbol.getDefinition();
      const isAlias = definition.getKind() === "alias";
      const references = refSymbol.getReferences();

      for (let i = 0; i < references.length; i++) {
        const ref = references[i];
        if (!ref) continue;

        // Skip definition unless it's an alias or not the first reference
        if (!isAlias && ref.isDefinition() && i === 0) {
          continue;
        }

        const refNode = ref.getNode();

        if (refNode.getSourceFile().getFilePath() === filePath) {
          const parent = refNode.getParent();

          if (parent) {
            // Check if it's used in JSX
            if (
              Node.isJsxSelfClosingElement(parent) ||
              Node.isJsxOpeningElement(parent)
            ) {
              jsxUsageCount++;
              if (jsxUsageCount > 1) {
                cache.set(iconName, false);
                return false; // Multiple JSX usages
              }
            }
            // Check if it's used outside of import/JSX
            else if (!Node.isImportSpecifier(parent)) {
              hasNonJSXUsage = true;
              cache.set(iconName, false);
              return false; // Used in non-JSX context
            }
          }
        }
      }
    }
  }

  const result = jsxUsageCount === 1 && !hasNonJSXUsage;
  cache.set(iconName, result);
  return result;
}

/**
 * Count occurrences of a string in text
 */
function countOccurrences(text: string, search: string): number {
  let count = 0;
  let pos = text.indexOf(search);

  while (pos !== -1) {
    count++;
    pos = text.indexOf(search, pos + search.length);
  }

  return count;
}

/**
 * Check if a source file imports from lucide-react
 * @param sourceFile - Source file to check
 * @returns True if the file imports from lucide-react
 */
export function hasLucideImports(sourceFile: SourceFile): boolean {
  const importDeclarations = sourceFile.getImportDeclarations();

  return importDeclarations.some((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifier().getLiteralValue();
    return moduleSpecifier === "lucide-react";
  });
}
