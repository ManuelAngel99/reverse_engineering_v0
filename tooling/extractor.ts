import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export interface ExtractedModule {
  id: string | number;
  code: string;
  exports: string[];
  imports: string[];
  startLine: number;
  endLine: number;
}

/**
 * Extracts modules from a Turbopack bundle.
 *
 * Turbopack format:
 * (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
 *   sourceRef,
 *   chunkId,
 *   (e) => { ...module... },
 *   moduleId,
 *   (e) => { ...module... },
 *   ...
 * ]);
 */
export function extractTurbopackModules(code: string): ExtractedModule[] {
  const modules: ExtractedModule[] = [];

  let ast: t.File;
  try {
    ast = parser.parse(code, {
      sourceType: "script",
      plugins: ["jsx"],
      errorRecovery: true,
    });
  } catch (err) {
    console.error("Failed to parse file:", err);
    return modules;
  }

  // @ts-ignore - traverse default export handling
  const traverseFn = traverse.default || traverse;

  traverseFn(ast, {
    CallExpression(path) {
      // Look for .push() calls on TURBOPACK
      if (!t.isMemberExpression(path.node.callee)) return;
      if (!t.isIdentifier(path.node.callee.property, { name: "push" })) return;

      // Check if it's TURBOPACK.push or (globalThis.TURBOPACK || ...).push
      const obj = path.node.callee.object;
      const isTurbopack =
        (t.isIdentifier(obj) && obj.name === "TURBOPACK") ||
        (t.isLogicalExpression(obj) && isTurbopackLogical(obj)) ||
        (t.isMemberExpression(obj) &&
          t.isIdentifier(obj.property, { name: "TURBOPACK" }));

      if (!isTurbopack) return;

      // The argument should be an array
      const args = path.node.arguments;
      if (args.length === 0) return;

      const arrayArg = args[0];
      if (!t.isArrayExpression(arrayArg)) return;

      const elements = arrayArg.elements;
      if (elements.length < 3) return;

      // Process elements - they come in pairs: moduleId, factory
      // First element is usually source ref, second is chunk ID
      let i = 0;

      // Skip initial non-function elements (source ref, chunk ID)
      while (i < elements.length && !isFunctionElement(elements[i])) {
        i++;
      }

      // Now process moduleId, factory pairs
      // Sometimes the ID comes before the factory, sometimes after
      while (i < elements.length) {
        const current = elements[i];

        if (isFunctionElement(current)) {
          // This is a module factory
          const factory = current as
            | t.ArrowFunctionExpression
            | t.FunctionExpression;
          const moduleCode = generate(factory).code;

          // Look for module ID - could be before or after
          let moduleId: string | number = `anonymous_${i}`;

          // Check previous element for ID
          if (i > 0) {
            const prev = elements[i - 1];
            if (t.isNumericLiteral(prev)) {
              moduleId = prev.value;
            } else if (t.isStringLiteral(prev)) {
              moduleId = prev.value;
            }
          }

          // Check next element for ID (some formats put ID after)
          if (i + 1 < elements.length) {
            const next = elements[i + 1];
            if (
              t.isNumericLiteral(next) &&
              !isFunctionElement(elements[i + 2])
            ) {
              moduleId = next.value;
            }
          }

          // Extract exports and imports from the factory
          const { exports: moduleExports, imports: moduleImports } =
            analyzeModuleFactory(factory);

          modules.push({
            id: moduleId,
            code: moduleCode,
            exports: moduleExports,
            imports: moduleImports,
            startLine: factory.loc?.start.line ?? 0,
            endLine: factory.loc?.end.line ?? 0,
          });
        }

        i++;
      }
    },
  });

  // Also look for e.s() export patterns to get named exports
  traverseFn(ast, {
    CallExpression(path) {
      if (!t.isMemberExpression(path.node.callee)) return;
      if (!t.isIdentifier(path.node.callee.property, { name: "s" })) return;

      const args = path.node.arguments;
      if (args.length < 1) return;

      // e.s([exports...], moduleId) pattern
      const exportsArray = args[0];
      const moduleIdArg = args[1];

      if (!t.isArrayExpression(exportsArray)) return;

      let moduleId: string | number | undefined;
      if (t.isNumericLiteral(moduleIdArg)) {
        moduleId = moduleIdArg.value;
      }

      if (moduleId === undefined) return;

      // Find the module and add exports
      const module = modules.find((m) => m.id === moduleId);
      if (module) {
        // Extract export names from the array
        const exportNames = extractExportNames(exportsArray);
        module.exports = [...new Set([...module.exports, ...exportNames])];
      }
    },
  });

  return modules;
}

function isTurbopackLogical(node: t.LogicalExpression): boolean {
  // (globalThis.TURBOPACK || (globalThis.TURBOPACK = []))
  if (t.isMemberExpression(node.left)) {
    return t.isIdentifier(node.left.property, { name: "TURBOPACK" });
  }
  if (t.isIdentifier(node.left, { name: "TURBOPACK" })) {
    return true;
  }
  return false;
}

function isFunctionElement(
  el: t.ArrayExpression["elements"][number]
): el is t.ArrowFunctionExpression | t.FunctionExpression {
  return (
    el !== null &&
    (t.isArrowFunctionExpression(el) || t.isFunctionExpression(el))
  );
}

function analyzeModuleFactory(
  factory: t.ArrowFunctionExpression | t.FunctionExpression
): {
  exports: string[];
  imports: string[];
} {
  const exports: string[] = [];
  const imports: string[] = [];

  // @ts-ignore
  const traverseFn = traverse.default || traverse;

  // We need to wrap in a program to traverse
  const fakeAst = t.file(
    t.program([t.expressionStatement(factory as t.Expression)])
  );

  traverseFn(fakeAst, {
    CallExpression(path) {
      const callee = path.node.callee;

      // Look for e.i(moduleId) - imports
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.property, { name: "i" })
      ) {
        const arg = path.node.arguments[0];
        if (t.isNumericLiteral(arg)) {
          imports.push(String(arg.value));
        } else if (t.isStringLiteral(arg)) {
          imports.push(arg.value);
        }
      }

      // Look for e.s([...]) - exports
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.property, { name: "s" })
      ) {
        const arg = path.node.arguments[0];
        if (t.isArrayExpression(arg)) {
          const names = extractExportNames(arg);
          exports.push(...names);
        }
      }
    },
  });

  return { exports, imports: [...new Set(imports)] };
}

function extractExportNames(arr: t.ArrayExpression): string[] {
  const names: string[] = [];

  // Export arrays look like: ["name1", () => val1, "name2", () => val2, ...]
  for (let i = 0; i < arr.elements.length; i++) {
    const el = arr.elements[i];
    if (t.isStringLiteral(el)) {
      names.push(el.value);
    }
  }

  return names;
}
