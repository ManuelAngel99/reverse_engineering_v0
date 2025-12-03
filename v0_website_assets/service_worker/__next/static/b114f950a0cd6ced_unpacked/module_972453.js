function r(e) {
  return e[0].toLowerCase() === e[0];
}

export default function (e = {}) {
  let e_ts = e.ts;
  if (!e_ts) {
    throw Error("Please provide typescript by options.ts");
  }
  {
    let [e] = e_ts.version.split(".");
    if (parseInt(e) < 4) {
      throw Error("TypeScript should be at least 4.0");
    }
  }
  return (i) => {
    let { factory } = i;
    let d = factory.createIdentifier(e.refreshReg || "$RefreshReg$");
    let u = factory.createIdentifier(e.refreshSig || "$RefreshSig$");
    return (d) => {
      if (
        d.isDeclarationFile ||
        !(
          d.languageVariant === e_ts.LanguageVariant.JSX ||
          d.text.includes("use")
        )
      ) {
        return d;
      }
      let b = d.text.includes("@refresh reset");
      let x = new Set();
      for (let e of d.statements) {
        if (e_ts.isFunctionDeclaration(e) && e.name) {
          x.add(e.name.text);
        }

        if (e_ts.isVariableStatement(e)) {
          for (let n of e.declarationList.declarations) {
            if (e_ts.isIdentifier(n.name)) {
              x.add(n.name.text);
            }
          }
        }
      }
      let { nextFile, usedAsJSXElement, hooksSignatureMap } = ((a, s, d) => {
        let p = new Set();
        let _ = new Map();
        let g = new Map();
        function b(e) {
          let t = [];
          for (let n of e) {
            let e = g.get(n);
            t.push(n);

            if (e) {
              t.push(factory.createExpressionStatement(e));
            }
          }
          return t;
        }
        return {
          nextFile: y(
            e_ts.visitEachChild(
              a,
              function a(x) {
                var S;
                var k;
                if (e_ts.isJsxOpeningLikeElement(x)) {
                  let x_tagName = x.tagName;
                  if (
                    e_ts.isIdentifier(x_tagName) &&
                    !(
                      (S = x_tagName).text.includes("-") ||
                      r(S.text) ||
                      S.text.includes(":")
                    )
                  ) {
                    let x_tagName_text = x_tagName.text;

                    if (s.has(x_tagName_text)) {
                      p.add(x_tagName_text);
                    }
                  }
                } else if (
                  ((e) => {
                    if (!e_ts.isCallExpression(e)) {
                      return false;
                    }
                    let e_expression = e.expression;
                    let r = "";

                    if (e_ts.isIdentifier(e_expression)) {
                      r = e_expression.text;
                    }

                    if (e_ts.isPropertyAccessExpression(e_expression)) {
                      r = e_expression.name.text;
                    }

                    return !![
                      "createElement",
                      "jsx",
                      "jsxs",
                      "jsxDEV",
                    ].includes(r);
                  })(x)
                ) {
                  let e = x.arguments[0];
                  if (e && e_ts.isIdentifier(e)) {
                    let e_text = e.text;

                    if (s.has(e_text)) {
                      p.add(e_text);
                    }
                  }
                }
                if (
                  ((e) => {
                    if (!e_ts.isCallExpression(e)) {
                      return false;
                    }
                    let e_expression = e.expression;
                    return !!(
                      (e_ts.isIdentifier(e_expression) &&
                        e_expression.text.startsWith("use")) ||
                      (e_ts.isPropertyAccessExpression(e_expression) &&
                        e_expression.name.text.startsWith("use"))
                    );
                  })(x)
                ) {
                  let e;
                  let t = o(x, l);

                  if (t) {
                    k = x;
                    (e = _.get(t) || []).push(k);
                    _.set(t, e);
                  }
                }
                let T = x;
                x = e_ts.visitEachChild(x, a, i);
                let E = _.get(T);
                if (E && l(x) && x.body) {
                  let r;
                  let a = f();

                  let s = factory.createExpressionStatement(
                    factory.createBinaryExpression(
                      a,
                      factory.createToken(e_ts.SyntaxKind.EqualsToken),
                      factory.createCallExpression(u, undefined, [])
                    )
                  );

                  i.addInitializationStatement(s);
                  let p = factory.createCallExpression(a, undefined, []);

                  let _ = e_ts.isBlock(x.body)
                    ? y(x.body, (e) => [
                        factory.createExpressionStatement(p),
                        ...e,
                      ])
                    : factory.createComma(p, x.body);

                  let b = ((e, n) => {
                    if (e_ts.isFunctionDeclaration(e)) {
                      if (!e_ts.isBlock(n)) {
                        throw TypeError();
                      }
                      return factory.updateFunctionDeclaration(
                        e,
                        e.modifiers,
                        e.asteriskToken,
                        e.name,
                        e.typeParameters,
                        e.parameters,
                        e.type,
                        n
                      );
                    }
                    if (e_ts.isFunctionExpression(e)) {
                      if (!e_ts.isBlock(n)) {
                        throw TypeError();
                      }
                      return factory.updateFunctionExpression(
                        e,
                        e.modifiers,
                        e.asteriskToken,
                        e.name,
                        e.typeParameters,
                        e.parameters,
                        e.type,
                        n
                      );
                    }
                    return e_ts.isArrowFunction(e)
                      ? factory.updateArrowFunction(
                          e,
                          e.modifiers,
                          e.typeParameters,
                          e.parameters,
                          e.type,
                          e.equalsGreaterThanToken,
                          n
                        )
                      : e;
                  })(x, _);

                  let S = (function (n) {
                    let r = n
                      .map((e) => {
                        let n = "";

                        if (e.parent && e_ts.isVariableDeclaration(e.parent)) {
                          n = m(e.parent.name);
                        }

                        let r = m(e.expression);
                        let i = 0;
                        if (e_ts.isPropertyAccessExpression(e.expression)) {
                          let n = e.expression.expression;

                          if (e_ts.isIdentifier(n) && n.text === "React") {
                            r = m(e.expression.name);
                          }
                        }

                        if (r === "useState") {
                          i = 1;
                        } else if (r === "useReducer") {
                          i = 2;
                        }

                        let a = e.arguments.reduce((e, t, n) => {
                          if ((1 << n) & i) {
                            e && (e += ",");
                            e += m(t);
                          }

                          return e;
                        }, "");
                        return `${r}{${n}${a ? `(${a})` : ""}}`;
                      })
                      .join("\n");
                    if (e.emitFullSignatures !== true && e.hashSignature) {
                      try {
                        return e.hashSignature(r);
                      } catch (e) {}
                    }
                    return r;
                  })(E);

                  let { force, hooks } = {
                    hooks: (r = []),
                    force: E.some((e) => {
                      let i = o(e, l);
                      let e_expression = e.expression;
                      if (!i) {
                        return true;
                      }
                      if (e_ts.isPropertyAccessExpression(e_expression)) {
                        let e_expression_expression = e_expression.expression;
                        if (e_ts.isIdentifier(e_expression_expression)) {
                          if (e_expression_expression.text === "React") {
                            return false;
                          }
                          let t = n(i, e_expression_expression.text);

                          if (t) {
                            r.push(e_expression);
                          }

                          return !t;
                        }
                      } else if (e_ts.isIdentifier(e_expression)) {
                        if (
                          ((e) => {
                            switch (e) {
                              case "useState":
                              case "useReducer":
                              case "useEffect":
                              case "useLayoutEffect":
                              case "useMemo":
                              case "useCallback":
                              case "useRef":
                              case "useContext":
                              case "useImperativeHandle":
                              case "useDebugValue":
                              case "useId":
                              case "useDeferredValue":
                              case "useTransition":
                              case "useInsertionEffect":
                              case "useSyncExternalStore":
                              case "useFormState":
                              case "useActionState":
                              case "useOptimistic": {
                                return true;
                              }
                              default: {
                                return false;
                              }
                            }
                          })(e_expression.text)
                        ) {
                          return false;
                        }
                        let e = n(i, e_expression.text);

                        if (e) {
                          r.push(e_expression);
                        }

                        return !e;
                      }
                      return true;
                    }),
                  };

                  let A = force || d;
                  if (e_ts.isFunctionDeclaration(b)) {
                    if (b.name) {
                      g.set(b, h(a, b.name, S, A, hooks));
                    }

                    x = b;
                  } else {
                    let e = h(a, b, S, A, hooks);
                    g.set(b, e);
                    x = b;

                    if (o(T.parent, e_ts.isFunctionLike)) {
                      x = e;
                    }
                  }
                }
                return y(x, b);
              },
              i
            ),
            b
          ),
          usedAsJSXElement: p,
          hooksSignatureMap: g,
        };
      })(d, x, b);
      return y((d = nextFile), (e) =>
        e_ts.visitLexicalEnvironment(
          e,
          (e) =>
            ((e, n, r) => {
              if (e_ts.isFunctionDeclaration(r)) {
                return r.name && r.body ? [r, ...p(r.name)] : r;
              }
              if (e_ts.isVariableStatement(r)) {
                let o = [];

                let d = e_ts.visitEachChild(
                  r.declarationList,
                  (r) => {
                    if (!e_ts.isVariableDeclaration(r)) {
                      return r;
                    }
                    let r_initializer = r.initializer;
                    if (!e_ts.isIdentifier(r.name) || !r_initializer) {
                      return r;
                    }
                    if (e.has(r.name.text) || l(r_initializer)) {
                      if (
                        !(function e(n) {
                          return (
                            !!(
                              a(n) ||
                              e_ts.isIdentifier(n) ||
                              e_ts.isPropertyAccessExpression(n)
                            ) ||
                            (!!e_ts.isConditionalExpression(n) &&
                              (e(n.condition) ||
                                e(n.whenFalse) ||
                                e(n.whenTrue)))
                          );
                        })(r_initializer)
                      ) {
                        o.push(...p(r.name));
                      }

                      if (l(r_initializer) && n.has(r_initializer)) {
                        let e = false;

                        let a = e_ts.visitEachChild(
                          n.get(r_initializer),
                          (n) =>
                            e ? n : e_ts.isFunctionLike(n) ? (e = r.name) : n,
                          i
                        );

                        o.push(factory.createExpressionStatement(a));
                      }

                      return r;
                    }
                    if (s(r_initializer)) {
                      let { registers, call } = _(
                        n,
                        r_initializer,
                        r.name.text
                      );
                      o.push(...registers, ...p(r.name));

                      return factory.updateVariableDeclaration(
                        r,
                        r.name,
                        undefined,
                        r.type,
                        call
                      );
                    }
                    return r;
                  },
                  i
                );

                return [
                  factory.updateVariableStatement(r, r.modifiers, d),
                  ...o,
                ];
              }
              if (e_ts.isExportAssignment(r)) {
                if (s(r.expression)) {
                  let { registers, call } = _(n, r.expression, "%default%");

                  let i = f();
                  return [
                    factory.updateExportAssignment(
                      r,
                      r.modifiers,
                      factory.createAssignment(i, call)
                    ),
                    g(i, "%default%"),
                    ...registers,
                  ];
                } else if (l(r.expression)) {
                  let e = n.get(r.expression);
                  if (e) {
                    return factory.updateExportAssignment(r, r.modifiers, e);
                  }
                }
              }
              return r;
            })(usedAsJSXElement, hooksSignatureMap, e),
          i
        )
      );
    };
    function p(e) {
      if (!r(e.text)) {
        let t = f();
        let n = factory.createAssignment(t, e);
        return [factory.createExpressionStatement(n), g(t, e.text)];
      }
      return [];
    }
    function _(e, n, r) {
      let i = n.arguments[0];
      if (e_ts.isCallExpression(i)) {
        let t = f();
        let a = `${r}$${m(n.expression)}`;
        let { registers, call } = _(e, i, a);
        return {
          call: factory.updateCallExpression(n, n.expression, undefined, [
            factory.createAssignment(t, call),
            ...n.arguments.slice(1),
          ]),
          registers: registers.concat(g(t, a)),
        };
      }
      if (!l(i) && !e_ts.isIdentifier(i)) {
        throw Error(
          "This is an error of react-refresh/typescript. Please report this problem: Call isHOC before register it"
        );
      }
      if (e_ts.isIdentifier(i)) {
        return { call: n, registers: [] };
      }
      let a = f();
      return {
        call: factory.updateCallExpression(n, n.expression, undefined, [
          factory.createAssignment(a, e.get(i) || i),
          ...n.arguments.slice(1),
        ]),
        registers: [g(a, `${r}$${m(n.expression)}`)],
      };
    }
    function f() {
      let e = factory.createUniqueName("_react_refresh_temp");
      i.hoistVariableDeclaration(e);
      return e;
    }
    function m(e) {
      try {
        return e.getText();
      } catch {
        return "";
      }
    }
    function h(e, n, r, i, a) {
      let o = [n];

      if (r.includes("\n")) {
        o.push(factory.createNoSubstitutionTemplateLiteral(r, r));
      } else {
        o.push(factory.createStringLiteral(r));
      }

      if (i || a.length) {
        o.push(i ? factory.createTrue() : factory.createFalse());
      }

      if (a.length) {
        o.push(
          factory.createArrowFunction(
            undefined,
            undefined,
            [],
            undefined,
            factory.createToken(e_ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createArrayLiteralExpression(a)
          )
        );
      }

      return factory.createCallExpression(e, undefined, o);
    }
    function g(e, t) {
      return factory.createExpressionStatement(
        factory.createCallExpression(d, undefined, [
          e,
          factory.createStringLiteral(t),
        ])
      );
    }
    function y(e, n) {
      return e_ts.isSourceFile(e)
        ? factory.updateSourceFile(
            e,
            n(e.statements),
            e.isDeclarationFile,
            e.referencedFiles,
            e.typeReferenceDirectives,
            e.hasNoDefaultLib,
            e.libReferenceDirectives
          )
        : e_ts.isCaseClause(e)
        ? factory.updateCaseClause(e, e.expression, n(e.statements))
        : e_ts.isDefaultClause(e)
        ? factory.updateDefaultClause(e, n(e.statements))
        : e_ts.isModuleBlock(e)
        ? factory.updateModuleBlock(e, n(e.statements))
        : e_ts.isBlock(e)
        ? factory.updateBlock(e, n(e.statements))
        : e;
    }
  };
  function n(e, n) {
    while (e) {
      if (
        (e_ts.isSourceFile(e) && i(e.statements, n)) ||
        (e_ts.isBlock(e) && i(e.statements, n))
      ) {
        return true;
      }
      e = e.parent;
    }

    return false;
  }
  function i(e, n) {
    for (let r of e) {
      if (e_ts.isVariableStatement(r)) {
        for (let e of r.declarationList.declarations) {
          if (e_ts.isIdentifier(e.name) && e.name.text === n) {
            return true;
          }
        }
      } else if (e_ts.isImportDeclaration(r)) {
        let r_importClause = r.importClause;
        let i = r_importClause && r_importClause.name;
        let a = r_importClause && r_importClause.namedBindings;
        if (i && i.text === n) {
          return true;
        }
        if (a && e_ts.isNamespaceImport(a)) {
          if (a.name.text === n) {
            return true;
          }
        } else if (
          a &&
          e_ts.isNamedImports(a) &&
          a.elements.some((e) => e.name.text === n)
        ) {
          return true;
        }
      } else if (e_ts.isFunctionDeclaration(r)) {
        if (!r.body) {
          continue;
        }
        if (r.name && r.name.text === n) {
          return true;
        }
      }
    }
    return false;
  }
  function a(e) {
    if (!e_ts.isCallExpression(e)) {
      return false;
    }
    let e_expression = e.expression;
    return !!(
      e_expression.kind === e_ts.SyntaxKind.ImportKeyword ||
      (e_ts.isIdentifier(e_expression) && e_expression.text.includes("require"))
    );
  }
  function o(e, t) {
    while (e) {
      let n = t(e);
      if (n === "quit") {
        break;
      }
      if (n) {
        return e;
      }
      e = e.parent;
    }
  }
  function s(e) {
    let n = e;
    if (!e_ts.isCallExpression(e)) {
      return false;
    }

    while (e_ts.isCallExpression(n) && !a(n)) {
      let n_expression = n.expression;
      if (
        !(
          e_ts.isPropertyAccessExpression(n_expression) ||
          e_ts.isIdentifier(n_expression)
        ) ||
        !(n = n.arguments[0])
      ) {
        return false;
      }
    }

    return l(n) || (e_ts.isIdentifier(n) && !r(n.text));
  }
  function l(e) {
    return !!(
      e_ts.isFunctionDeclaration(e) ||
      e_ts.isArrowFunction(e) ||
      e_ts.isFunctionExpression(e)
    );
  }
}
