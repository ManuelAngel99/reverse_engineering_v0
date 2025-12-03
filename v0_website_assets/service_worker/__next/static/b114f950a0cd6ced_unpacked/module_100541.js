"use strict";
var r,
  i,
  a,
  o,
  s,
  l,
  c,
  d,
  u,
  p,
  _,
  f,
  m,
  h = require(485765),
  g = require(30165),
  y = g && "object" == typeof g && "default" in g ? g : { default: g };
class b {
  #eP;
  #eM = [void 0, void 0, void 0];
  #eL = 0;
  #eR = !1;
  #eF = 0;
  constructor(e) {
    (this.#eP = e), this.#eO();
  }
  get done() {
    return this.#eR;
  }
  get current() {
    if (0 === this.#eF)
      throw new h.errors.InvalidOperationError(
        "Cannot get the current when the iterator has not been advanced."
      );
    return this.#eM[this.#eL];
  }
  get previous() {
    if (this.#eF <= 1)
      throw new h.errors.InvalidOperationError(
        "Cannot get the previous when the iterator has not advanced enough."
      );
    return this.#eM[(this.#eL + this.#eM.length - 1) % this.#eM.length];
  }
  get peek() {
    if (this.#eR)
      throw new h.errors.InvalidOperationError(
        "Cannot peek at the end of the iterator."
      );
    return this.#eM[(this.#eL + 1) % this.#eM.length];
  }
  next() {
    if (this.done)
      throw new h.errors.InvalidOperationError(
        "Cannot get the next when at the end of the iterator."
      );
    let e = this.#eM[this.#eB()];
    return this.#eO(), this.#eF++, e;
  }
  *rest() {
    for (; !this.done; ) yield this.next();
  }
  #eO() {
    let e = this.#eP.next();
    if (((this.#eL = this.#eB()), e.done)) {
      this.#eR = !0;
      return;
    }
    this.#eM[this.#eB()] = e.value;
  }
  #eB() {
    return (this.#eL + 1) % this.#eM.length;
  }
}
function x(e, t) {
  let n;
  return (n = "string" == typeof t ? (e) => S(e, t) : t), e.find(n);
}
function S(e, t) {
  if (null == e.getNameNode) return !1;
  let n = e.getNameNode();
  return (
    null != n &&
    (tm.isArrayBindingPattern(n) || tm.isObjectBindingPattern(n)
      ? n.getElements().some((e) => S(e, t))
      : (null != e.getName ? e.getName() : n.getText()) === t)
  );
}
function k(e, t) {
  return "string" == typeof t
    ? `Expected to find ${e} named '${t}'.`
    : `Expected to find ${e} that matched the provided condition.`;
}
(exports.CommentNodeKind = void 0),
  ((r = exports.CommentNodeKind || (exports.CommentNodeKind = {}))[
    (r.Statement = 0)
  ] = "Statement"),
  (r[(r.ClassElement = 1)] = "ClassElement"),
  (r[(r.TypeElement = 2)] = "TypeElement"),
  (r[(r.ObjectLiteralElement = 3)] = "ObjectLiteralElement"),
  (r[(r.EnumMember = 4)] = "EnumMember");
class T {
  #eW;
  #ej;
  #ez;
  constructor(e, t, n, r, i, a) {
    (this.#eW = e),
      (this.#ej = t),
      (this.#ez = i),
      (this.pos = t),
      (this.end = n),
      (this.kind = r),
      (this.flags = h.ts.NodeFlags.None),
      (this.parent = a);
  }
  pos;
  end;
  kind;
  flags;
  modifiers;
  parent;
  getSourceFile() {
    return this.#ez;
  }
  getChildCount(e) {
    return 0;
  }
  getChildAt(e, t) {}
  getChildren(e) {
    return [];
  }
  getStart(e, t) {
    return this.#ej;
  }
  getFullStart() {
    return this.#eW;
  }
  getEnd() {
    return this.end;
  }
  getWidth(e) {
    return this.end - this.#ej;
  }
  getFullWidth() {
    return this.end - this.#eW;
  }
  getLeadingTriviaWidth(e) {
    return this.#ej - this.#eW;
  }
  getFullText(e) {
    return this.#ez.text.substring(this.#eW, this.end);
  }
  getText(e) {
    return this.#ez.text.substring(this.#ej, this.end);
  }
  getFirstToken(e) {}
  getLastToken(e) {}
  forEachChild(e, t) {}
}
class E extends T {
  _jsdocContainerBrand;
  _statementBrand;
  _commentKind = exports.CommentNodeKind.Statement;
}
class C extends T {
  _classElementBrand;
  _declarationBrand;
  _commentKind = exports.CommentNodeKind.ClassElement;
}
class A extends T {
  _typeElementBrand;
  _declarationBrand;
  _commentKind = exports.CommentNodeKind.TypeElement;
}
class w extends T {
  _declarationBrand;
  _objectLiteralBrand;
  declarationBrand;
  _commentKind = exports.CommentNodeKind.ObjectLiteralElement;
}
class D extends T {
  _commentKind = exports.CommentNodeKind.EnumMember;
}
((i = f || (f = {}))[(i.SingleLine = 0)] = "SingleLine"),
  (i[(i.MultiLine = 1)] = "MultiLine"),
  (i[(i.JsDoc = 2)] = "JsDoc");
let N = new WeakMap(),
  I = new Set([
    h.SyntaxKind.SourceFile,
    h.SyntaxKind.Block,
    h.SyntaxKind.ModuleBlock,
    h.SyntaxKind.CaseClause,
    h.SyntaxKind.DefaultClause,
    h.SyntaxKind.ClassDeclaration,
    h.SyntaxKind.InterfaceDeclaration,
    h.SyntaxKind.EnumDeclaration,
    h.SyntaxKind.ClassExpression,
    h.SyntaxKind.TypeLiteral,
    h.SyntaxKind.ObjectLiteralExpression,
  ]);
class P {
  constructor() {}
  static getOrParseChildren(e, t) {
    M(e) && (e = e.parent);
    let n = N.get(e);
    return (
      null == n &&
        ((n = Array.from(
          (function* (e, t) {
            let n,
              r = t.text,
              i =
                h.ts.isSourceFile(e) ||
                h.ts.isBlock(e) ||
                h.ts.isModuleBlock(e) ||
                h.ts.isCaseClause(e) ||
                h.ts.isDefaultClause(e)
                  ? e.statements
                  : h.ts.isClassDeclaration(e) ||
                    h.ts.isClassExpression(e) ||
                    h.ts.isEnumDeclaration(e) ||
                    h.ts.isInterfaceDeclaration(e) ||
                    h.ts.isTypeLiteralNode(e) ||
                    h.ts.isClassExpression(e)
                  ? e.members
                  : h.ts.isObjectLiteralExpression(e)
                  ? e.properties
                  : h.errors.throwNotImplementedForNeverValueError(e),
              a =
                ((n = (function () {
                  var t;
                  if (
                    ((t = e),
                    null !=
                      (function () {
                        if (
                          h.ts.isSourceFile(t) ||
                          h.ts.isBlock(t) ||
                          h.ts.isModuleBlock(t) ||
                          h.ts.isCaseClause(t) ||
                          h.ts.isDefaultClause(t)
                        )
                          return t;
                      })())
                  )
                    return E;
                  if (h.ts.isClassLike(e)) return C;
                  if (
                    h.ts.isInterfaceDeclaration(e) ||
                    h.ts.isTypeLiteralNode(e)
                  )
                    return A;
                  if (h.ts.isObjectLiteralExpression(e)) return w;
                  if (h.ts.isEnumDeclaration(e)) return D;
                  throw new h.errors.NotImplementedError(
                    `Not implemented comment node container type: ${h.getSyntaxKindName(
                      e.kind
                    )}`
                  );
                })()),
                (r, i, a, o) => new n(r, i, a, o, t, e));
            if (0 === i.length) {
              let n = P.getContainerBodyPos(e, t);
              null != n && (yield* o(n, !1));
            } else {
              for (let e of i) yield* o(e.pos, !0), yield e;
              let e = i[i.length - 1];
              yield* o(e.end, !1);
            }
            function* o(e, t) {
              let n = e;
              s();
              let i = Array.from(
                  (function* () {
                    for (; e < r.length; ) {
                      let n = c();
                      if (null != n) {
                        if (n === f.JsDoc && t) return;
                        yield l(n), s();
                      } else {
                        if (!h.StringUtils.isWhitespace(r[e])) return;
                        e++;
                      }
                    }
                  })()
                ),
                o =
                  r.length === e || "}" === r[e]
                    ? e
                    : h.StringUtils.getLineStartFromPos(r, e);
              for (let e of i) e.end <= o && (yield e);
              function s() {
                if (0 === e) return;
                let t = h.StringUtils.getLineEndFromPos(r, e);
                for (; e < t; ) {
                  let n = c();
                  if (null != n) {
                    if (l(n).kind === h.SyntaxKind.SingleLineCommentTrivia)
                      return;
                    t = h.StringUtils.getLineEndFromPos(r, e);
                  } else {
                    if (!h.StringUtils.isWhitespace(r[e]) && "," !== r[e])
                      return;
                    e++;
                  }
                }
                for (; h.StringUtils.startsWithNewLine(r[e]); ) e++;
              }
              function l(t) {
                var i;
                let o, s;
                return t === f.SingleLine
                  ? ((o = e),
                    (function () {
                      for (
                        e += 2;
                        e < r.length && "\n" !== r[e] && "\r" !== r[e];

                      )
                        e++;
                    })(),
                    a(n, o, e, h.SyntaxKind.SingleLineCommentTrivia))
                  : ((i = t === f.JsDoc),
                    (s = e),
                    (function (t) {
                      for (e += t ? 3 : 2; e < r.length; ) {
                        if ("*" === r[e] && "/" === r[e + 1]) {
                          e += 2;
                          break;
                        }
                        e++;
                      }
                    })(i),
                    a(n, s, e, h.SyntaxKind.MultiLineCommentTrivia));
              }
              function c() {
                if ("/" !== r[e]) return;
                let t = r[e + 1];
                return "/" === t
                  ? f.SingleLine
                  : "*" === t
                  ? "*" === r[e + 2]
                    ? f.JsDoc
                    : f.MultiLine
                  : void 0;
              }
            }
          })(e, t)
        )),
        N.set(e, n)),
      n
    );
  }
  static shouldParseChildren(e) {
    return I.has(e.kind) && e.pos !== e.end;
  }
  static hasParsedChildren(e) {
    return M(e) && (e = e.parent), N.has(e);
  }
  static isCommentStatement(e) {
    return e._commentKind === exports.CommentNodeKind.Statement;
  }
  static isCommentClassElement(e) {
    return e._commentKind === exports.CommentNodeKind.ClassElement;
  }
  static isCommentTypeElement(e) {
    return e._commentKind === exports.CommentNodeKind.TypeElement;
  }
  static isCommentObjectLiteralElement(e) {
    return e._commentKind === exports.CommentNodeKind.ObjectLiteralElement;
  }
  static isCommentEnumMember(e) {
    return e._commentKind === exports.CommentNodeKind.EnumMember;
  }
  static getContainerBodyPos(e, t) {
    if (h.ts.isSourceFile(e)) return 0;
    if (
      h.ts.isClassDeclaration(e) ||
      h.ts.isEnumDeclaration(e) ||
      h.ts.isInterfaceDeclaration(e) ||
      h.ts.isTypeLiteralNode(e) ||
      h.ts.isClassExpression(e) ||
      h.ts.isBlock(e) ||
      h.ts.isModuleBlock(e) ||
      h.ts.isObjectLiteralExpression(e)
    )
      return n(e, h.SyntaxKind.OpenBraceToken);
    if (h.ts.isCaseClause(e) || h.ts.isDefaultClause(e))
      return n(e, h.SyntaxKind.ColonToken);
    return h.errors.throwNotImplementedForNeverValueError(e);
    function n(e, n) {
      return e.getChildren(t).find((e) => e.kind === n)?.end;
    }
  }
}
function M(e) {
  return e.kind === h.SyntaxKind.SyntaxList;
}
let L = new WeakMap(),
  R = new WeakMap();
class F {
  static getContainerArray(e, t) {
    return P.getOrParseChildren(e, t);
  }
  static hasParsedTokens(e) {
    return R.has(e) || e.kind == h.SyntaxKind.SyntaxList;
  }
  static getCompilerChildrenFast(e, t) {
    return F.hasParsedTokens(e)
      ? F.getCompilerChildren(e, t)
      : F.getCompilerForEachChildren(e, t);
  }
  static getCompilerForEachChildren(e, t) {
    if (P.shouldParseChildren(e)) {
      let r = L.get(e);
      return (
        null == r && (O((r = n()), P.getOrParseChildren(e, t)), L.set(e, r)), r
      );
    }
    return n();
    function n() {
      let t = [];
      return (
        e.forEachChild((e) => {
          t.push(e);
        }),
        t
      );
    }
  }
  static getCompilerChildren(e, t) {
    let n = R.get(e);
    if (null == n) {
      if (
        (function () {
          if (e.kind !== h.ts.SyntaxKind.SyntaxList) return !1;
          let n = e.parent;
          return (
            !!P.shouldParseChildren(n) && P.getContainerBodyPos(n, t) === e.pos
          );
        })()
      ) {
        let r = [...e.getChildren(t)];
        O(r, P.getOrParseChildren(e, t)), (n = r);
      } else n = e.getChildren(t);
      R.set(e, n);
    }
    return n;
  }
}
function O(e, t) {
  let n = 0;
  for (let r of t)
    if (
      r.kind === h.SyntaxKind.SingleLineCommentTrivia ||
      r.kind === h.SyntaxKind.MultiLineCommentTrivia
    ) {
      for (; n < e.length && e[n].end < r.end; ) n++;
      e.splice(n, 0, r), n++;
    }
}
function B(e) {
  return (
    e.kind === h.ts.SyntaxKind.SingleLineCommentTrivia ||
    e.kind === h.ts.SyntaxKind.MultiLineCommentTrivia
  );
}
function W(e, t) {
  if (e.kind === h.SyntaxKind.EndOfFileToken) return;
  let n = e.parent;
  if (null == n) return;
  let { pos: r, end: i } = e;
  for (let a of F.getCompilerChildren(n, t)) {
    if (a.pos > i || a === e) break;
    if (a.kind === h.SyntaxKind.SyntaxList && a.pos <= r && a.end >= i)
      return a;
  }
}
function j(e, t) {
  let n;
  return (n = "string" == typeof t ? (e) => e.getName() === t : t), e.find(n);
}
function z(e) {
  if (V(e) || e._sourceFile.isDeclarationFile()) return !0;
  for (let t of e._getAncestorsIterator(!1)) if (V(t)) return !0;
  return !1;
}
function V(e) {
  return (
    (e.getCombinedModifierFlags() & h.ts.ModifierFlags.Ambient) ===
      h.ts.ModifierFlags.Ambient ||
    tm.isInterfaceDeclaration(e) ||
    tm.isTypeAliasDeclaration(e)
  );
}
class G {
  constructor() {}
  static isModuleSpecifierRelative(e) {
    return e.startsWith("./") || e.startsWith("../");
  }
  static getReferencedSourceFileFromSymbol(e) {
    let t = e.getDeclarations();
    if (0 !== t.length && t[0].getKind() === h.SyntaxKind.SourceFile)
      return t[0];
  }
}
function K(e, t, n) {
  let r = null == t || t.kind !== h.SyntaxKind.SourceFile,
    i = (r ? t : n) || {},
    a = (function () {
      if (r) {
        if (e.kind === h.SyntaxKind.SourceFile) return;
        let t = (function () {
          let t = e.parent;
          for (; null != t && null != t.parent; ) t = t.parent;
          return t;
        })();
        if (null == t) {
          var n;
          let e = i.scriptKind ?? h.ScriptKind.TSX;
          return h.ts.createSourceFile(
            `print.${
              (n = e) === h.ScriptKind.JSX || n === h.ScriptKind.TSX
                ? "tsx"
                : "ts"
            }`,
            "",
            h.ScriptTarget.Latest,
            !1,
            e
          );
        }
        return t;
      }
      return t;
    })(),
    o = h.ts.createPrinter({
      newLine: i.newLineKind ?? h.NewLineKind.LineFeed,
      removeComments: i.removeComments || !1,
    });
  return null == a
    ? o.printFile(e)
    : o.printNode(i.emitHint ?? h.EmitHint.Unspecified, e, a);
}
(exports.IndentationText = void 0),
  ((a = exports.IndentationText || (exports.IndentationText = {})).TwoSpaces =
    "  "),
  (a.FourSpaces = "    "),
  (a.EightSpaces = "        "),
  (a.Tab = "	");
class U extends h.SettingsContainer {
  #eV;
  #eG;
  #eK;
  constructor() {
    super({
      indentationText: exports.IndentationText.FourSpaces,
      newLineKind: h.NewLineKind.LineFeed,
      quoteKind: exports.QuoteKind.Double,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: !0,
      usePrefixAndSuffixTextForRename: !1,
      useTrailingCommas: !1,
    });
  }
  getEditorSettings() {
    return (
      null == this.#eV && ((this.#eV = {}), q(this.#eV, this)), { ...this.#eV }
    );
  }
  getFormatCodeSettings() {
    return (
      null == this.#eG &&
        (this.#eG = {
          ...this.getEditorSettings(),
          insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces:
            this._settings
              .insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces,
        }),
      { ...this.#eG }
    );
  }
  getUserPreferences() {
    return (
      null == this.#eK &&
        (this.#eK = {
          quotePreference:
            this.getQuoteKind() === exports.QuoteKind.Double
              ? "double"
              : "single",
          providePrefixAndSuffixTextForRename:
            this.getUsePrefixAndSuffixTextForRename(),
        }),
      { ...this.#eK }
    );
  }
  getQuoteKind() {
    return this._settings.quoteKind;
  }
  getNewLineKind() {
    return this._settings.newLineKind;
  }
  getNewLineKindAsString() {
    var e = this.getNewLineKind();
    switch (e) {
      case h.NewLineKind.CarriageReturnLineFeed:
        return "\r\n";
      case h.NewLineKind.LineFeed:
        return "\n";
      default:
        throw new h.errors.NotImplementedError(
          `Not implemented newline kind: ${e}`
        );
    }
  }
  getIndentationText() {
    return this._settings.indentationText;
  }
  getUsePrefixAndSuffixTextForRename() {
    return this._settings.usePrefixAndSuffixTextForRename;
  }
  getUseTrailingCommas() {
    return this._settings.useTrailingCommas;
  }
  set(e) {
    super.set(e), (this.#eV = void 0), (this.#eG = void 0), (this.#eK = void 0);
  }
  _getIndentSizeInSpaces() {
    let e = this.getIndentationText();
    switch (e) {
      case exports.IndentationText.EightSpaces:
        return 8;
      case exports.IndentationText.FourSpaces:
        return 4;
      case exports.IndentationText.TwoSpaces:
        return 2;
      case exports.IndentationText.Tab:
        return 4;
      default:
        return h.errors.throwNotImplementedForNeverValueError(e);
    }
  }
}
function H(e, t, n) {
  void 0 === e[t] && (e[t] = n);
}
function q(e, t) {
  H(
    e,
    "convertTabsToSpaces",
    t.getIndentationText() !== exports.IndentationText.Tab
  ),
    H(e, "newLineCharacter", t.getNewLineKindAsString()),
    H(e, "indentStyle", h.ts.IndentStyle.Smart),
    H(e, "indentSize", t.getIndentationText().length),
    H(e, "tabSize", t.getIndentationText().length);
}
function J(e, t) {
  return $(e, t), e.toString();
}
function $(e, t) {
  if ("string" == typeof t) e.write(t);
  else if (t instanceof Function) t(e);
  else
    for (let n = 0; n < t.length; n++)
      n > 0 && e.newLineIfLastNot(), $(e, t[n]);
}
class X {
  #eU = !1;
  setEnabled(e) {
    this.#eU = e;
  }
  log(e) {
    this.#eU && this.logInternal(e);
  }
  warn(e) {
    this.#eU && this.warnInternal(e);
  }
}
class Y extends X {
  logInternal(e) {
    console.log(e);
  }
  warnInternal(e) {
    console.warn(e);
  }
}
let Q =
    /^[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*$/,
  Z = new Set([
    "do",
    "if",
    "in",
    "for",
    "let",
    "new",
    "try",
    "var",
    "case",
    "else",
    "enum",
    "eval",
    "false",
    "null",
    "this",
    "true",
    "void",
    "with",
    "break",
    "catch",
    "class",
    "const",
    "super",
    "throw",
    "while",
    "yield",
    "delete",
    "export",
    "import",
    "public",
    "return",
    "static",
    "switch",
    "typeof",
    "default",
    "extends",
    "finally",
    "package",
    "private",
    "continue",
    "debugger",
    "function",
    "arguments",
    "interface",
    "protected",
    "implements",
    "instanceof",
  ]);
function ee(e) {
  return (
    !Z.has(e) &&
    (!!(function (e) {
      for (let t = 0; t < e.length; t++) {
        let n = e.charCodeAt(t);
        if (
          !(n >= 48 && n <= 57) &&
          !(n >= 65 && n <= 90) &&
          !(n >= 97 && n <= 122)
        )
          return !1;
      }
      return !0;
    })(e) ||
      Q.test(e))
  );
}
class et {
  #eH = new Set();
  constructor(e) {
    const t = (e) => {
      e.wasForgotten() || this.#eH.add(e);
    };
    e.onSourceFileAdded((e) => {
      this.#eH.add(e), e.onModified(t);
    }),
      e.onSourceFileRemoved((e) => {
        e._referenceContainer.clear(), this.#eH.delete(e), e.onModified(t, !1);
      });
  }
  refreshDirtySourceFiles() {
    for (let e of this.#eH.values()) e._referenceContainer.refresh();
    this.clearDirtySourceFiles();
  }
  refreshSourceFileIfDirty(e) {
    this.#eH.has(e) &&
      (e._referenceContainer.refresh(), this.clearDirtyForSourceFile(e));
  }
  addDirtySourceFile(e) {
    this.#eH.add(e);
  }
  clearDirtySourceFiles() {
    this.#eH.clear();
  }
  clearDirtyForSourceFile(e) {
    this.#eH.delete(e);
  }
}
class en {
  #ez;
  #eq = new h.KeyValueCache();
  #eJ = new h.KeyValueCache();
  #e$ = [];
  constructor(e) {
    this.#ez = e;
  }
  getDependentSourceFiles() {
    this.#ez._context.lazyReferenceCoordinator.refreshDirtySourceFiles();
    let e = new Set();
    for (let t of this.#eJ.getKeys()) e.add(t._sourceFile);
    return e.values();
  }
  getLiteralsReferencingOtherSourceFilesEntries() {
    return (
      this.#ez._context.lazyReferenceCoordinator.refreshSourceFileIfDirty(
        this.#ez
      ),
      this.#eq.getEntries()
    );
  }
  getReferencingLiteralsInOtherSourceFiles() {
    return (
      this.#ez._context.lazyReferenceCoordinator.refreshDirtySourceFiles(),
      this.#eJ.getKeys()
    );
  }
  refresh() {
    this.#e$.length > 0 &&
      this.#ez._context.compilerFactory.onSourceFileAdded(this.#eX, !1),
      this.clear(),
      this.#eY(),
      this.#e$.length > 0 &&
        this.#ez._context.compilerFactory.onSourceFileAdded(this.#eX);
  }
  clear() {
    for (let [e, t] of ((this.#e$.length = 0), this.#eq.getEntries()))
      this.#eq.removeByKey(e), t._referenceContainer.#eJ.removeByKey(e);
  }
  #eX = () => {
    for (let e = this.#e$.length - 1; e >= 0; e--) {
      let t = this.#e$[e],
        n = this.#eQ(t);
      null != n && (this.#e$.splice(e, 1), this.#eZ(t, n));
    }
    0 === this.#e$.length &&
      this.#ez._context.compilerFactory.onSourceFileAdded(this.#eX, !1);
  };
  #eY() {
    this.#ez._context.compilerFactory.forgetNodesCreatedInBlock((e) => {
      for (let t of this.#ez.getImportStringLiterals()) {
        let n = this.#eQ(t);
        e(t), null == n ? this.#e$.push(t) : this.#eZ(t, n);
      }
    });
  }
  #eQ(e) {
    let t = e.getParentOrThrow(),
      n = t.getParent();
    if (tm.isImportDeclaration(t) || tm.isExportDeclaration(t))
      return t.getModuleSpecifierSourceFile();
    if (null != n && tm.isImportEqualsDeclaration(n))
      return n.getExternalModuleReferenceSourceFile();
    if (null != n && tm.isImportTypeNode(n)) {
      let e = n.getSymbol();
      if (null != e) return G.getReferencedSourceFileFromSymbol(e);
    } else if (tm.isCallExpression(t)) {
      let t = e.getSymbol();
      if (null != t) return G.getReferencedSourceFileFromSymbol(t);
    } else
      this.#ez._context.logger.warn(
        `Unknown import string literal parent: ${t.getKindName()}`
      );
  }
  #eZ(e, t) {
    this.#eq.set(e, t), t._referenceContainer.#eJ.set(e, t);
  }
}
h.ts.version.split(".").map((e) => parseInt(e, 10));
class er {
  constructor() {}
  static getLastCharactersToPos(e, t) {
    let n = Array(e.getLength() - t);
    return (
      e.iterateLastChars((e, r) => {
        let i = r - t;
        if (i < 0) return !0;
        n[i] = e;
      }),
      n.join("")
    );
  }
}
function ei(e, t, n) {
  let r;
  return (
    (r = null != e.getStructure ? e.getStructure.call(t) : {}),
    null != n && Object.assign(r, n),
    r
  );
}
function ea(e, t, n) {
  null != e.set && e.set.call(t, n);
}
function eo(e) {
  return class extends e {
    hasDeclareKeyword() {
      return null != this.getDeclareKeyword();
    }
    getDeclareKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getDeclareKeyword(),
        e ?? "Expected to find a declare keyword.",
        this
      );
    }
    getDeclareKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.DeclareKeyword);
    }
    isAmbient() {
      return z(this);
    }
    setHasDeclareKeyword(e) {
      return this.toggleModifier("declare", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.hasDeclareKeyword &&
          this.setHasDeclareKeyword(t.hasDeclareKeyword),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        hasDeclareKeyword: this.hasDeclareKeyword(),
      });
    }
  };
}
function es(e, t) {
  var n;
  return tm.isAmbientable(e) && e.isAmbient()
    ? m.Newline
    : ((n = t), (tm.isBodyable(n) && null != n.getBody()) || tm.isBodied(n))
    ? m.Blankline
    : m.Newline;
}
function el(e, t) {
  return m.Newline;
}
function ec(e, t) {
  return (tm.isBodyable(t) && t.hasBody()) ||
    tm.isBodied(t) ||
    tm.isInterfaceDeclaration(t) ||
    tm.isClassDeclaration(t) ||
    tm.isEnumDeclaration(t)
    ? m.Blankline
    : m.Newline;
}
function ed(e, t) {
  return m.Newline;
}
function eu(e, t) {
  return tm.isClassDeclaration(e)
    ? es(e, t)
    : tm.isInterfaceDeclaration(e)
    ? el()
    : ec(e, t);
}
function ep(e, t) {
  let n = e.getFullText(),
    r = [],
    i = 0;
  for (let { edit: e } of t
    .map((e, t) => {
      var n;
      return { edit: (n = e) instanceof c6 ? n : new c6(n), index: t };
    })
    .sort((e, t) => {
      let n = e.edit.getSpan().getStart() - t.edit.getSpan().getStart();
      return 0 === n ? (e.index < t.index ? -1 : 1) : n < 0 ? -1 : 1;
    })) {
    let t = e.getSpan(),
      a = n.slice(i, t.getStart());
    (i = t.getEnd()), r.push(a), r.push(e.getNewText());
  }
  return r.push(n.slice(i)), r.join("");
}
((o = m || (m = {}))[(o.Newline = 0)] = "Newline"),
  (o[(o.Blankline = 1)] = "Blankline"),
  (o[(o.Space = 2)] = "Space"),
  (o[(o.None = 3)] = "None");
let e_ = h.ts.createScanner(h.ts.ScriptTarget.Latest, !0);
function ef(e) {
  e_.setText(e);
  try {
    if (e_.scan() === h.ts.SyntaxKind.EndOfFileToken) return -1;
    for (; e_.scan() !== h.ts.SyntaxKind.EndOfFileToken; );
    let t = e_.getStartPos();
    return "," === e[t - 1] ? -1 : t;
  } finally {
    e_.setText(void 0);
  }
}
function em(e) {
  return e?.length ?? 0;
}
function eh(e, t, n) {
  for (; t < e.length && !n(e.charCodeAt(t)); ) t++;
  return t;
}
function eg(e, t, n) {
  for (; t > 0 && !n(e.charCodeAt(t - 1)); ) t--;
  return t;
}
function ey(e) {
  return !h.StringUtils.isWhitespaceCharCode(e);
}
function ev(e, t) {
  let n = t;
  for (let r = t; r < e.length; r++)
    if (" " !== e[r] && "	" !== e[r]) {
      if (("\r" === e[r] && "\n" === e[r + 1]) || "\n" === e[r]) {
        (n = r + 1), "\r" === e[r] && (r++, n++);
        continue;
      }
      break;
    }
  return n;
}
function eb(e, t) {
  for (; t > 0; ) {
    let n = e[--t];
    if ("\n" === n || (" " !== n && "	" !== n)) return t + 1;
  }
  return t;
}
function ex(e, t, n) {
  if (0 !== e) return n[e - 1].getEnd();
  {
    let e = t.getParentOrThrow();
    return tm.isSourceFile(e)
      ? 0
      : tm.isCaseClause(e) || tm.isDefaultClause(e)
      ? e.getFirstChildByKindOrThrow(h.SyntaxKind.ColonToken).getEnd()
      : t !== e.getChildSyntaxList()
      ? t.getStart()
      : eS(e).getFirstChildByKindOrThrow(h.SyntaxKind.OpenBraceToken).getEnd();
  }
}
function eS(e) {
  if (tm.isModuleDeclaration(e)) {
    let t = e._getInnerBody();
    if (null == t)
      throw new h.errors.InvalidOperationError(
        "This operation requires the module to have a body."
      );
    return t;
  }
  return tm.isBodied(e)
    ? e.getBody()
    : tm.isBodyable(e)
    ? e.getBodyOrThrow()
    : e;
}
function ek(e) {
  return { scope: e.hasScopeKeyword() ? e.getScope() : void 0 };
}
function eT(e, t, n, r) {
  let i = "number" == typeof e ? e : e.length,
    a = t.length - i,
    o = [];
  for (let e = 0; e < a; e++) {
    let i = t[n + e];
    (r || !tm.isCommentNode(i)) && o.push(i);
  }
  return o;
}
function eE(e, t, n, r) {
  let i = [];
  for (; t < e.length && i.length < n; ) {
    let n = e[t],
      a = n.getKind();
    if (
      a !== h.SyntaxKind.SingleLineCommentTrivia &&
      a !== h.SyntaxKind.MultiLineCommentTrivia
    ) {
      if (a !== r)
        throw new h.errors.NotImplementedError(
          `Unexpected! Inserting syntax kind of ${h.getSyntaxKindName(
            r
          )}, but ${n.getKindName()} was inserted.`
        );
      i.push(n);
    }
    t++;
  }
  if (i.length !== n)
    throw new h.errors.NotImplementedError(
      `Unexpected! Inserted ${n} child/children, but ${i.length} were inserted.`
    );
  return i;
}
function eC(e) {
  let t = {};
  return Object.assign(t, ek(e)), t;
}
function eA(e) {
  let t = {};
  return (
    Object.assign(t, { hasDeclareKeyword: e.hasDeclareKeyword() }),
    Object.assign(t, {
      isDefaultExport: e.hasDefaultKeyword(),
      isExported: e.hasExportKeyword(),
    }),
    t
  );
}
function ew(e) {
  let t = {};
  return (
    Object.assign(t, { isStatic: e.isStatic() }),
    Object.assign(t, { isAbstract: e.isAbstract() }),
    Object.assign(t, ek(e)),
    Object.assign(t, { hasQuestionToken: e.hasQuestionToken() }),
    Object.assign(t, { hasOverrideKeyword: e.hasOverrideKeyword() }),
    t
  );
}
function eD(e, t) {
  let n = e < 0 ? t + e : e;
  if (n < 0)
    throw new h.errors.InvalidOperationError(
      `Invalid index: The max negative index is ${
        -1 * t
      }, but ${e} was specified.`
    );
  if (e > t)
    throw new h.errors.InvalidOperationError(
      `Invalid index: The max index is ${t}, but ${e} was specified.`
    );
  return n;
}
class eN {
  #e0;
  constructor(e) {
    this.#e0 = e;
  }
  handleForValues(e, t, n, r) {
    if (this.#e0.hasCompilerNode(t))
      e.handleNode(this.#e0.getExistingNodeFromCompilerNode(t), n, r);
    else if (t.kind === h.SyntaxKind.SyntaxList) {
      let i = this.#e0.getExistingNodeFromCompilerNode(t.getSourceFile());
      e.handleNode(this.#e0.getNodeFromCompilerNode(t, i), n, r);
    }
  }
  forgetNodeIfNecessary(e) {
    this.#e0.hasCompilerNode(e) &&
      this.#e0.getExistingNodeFromCompilerNode(e).forget();
  }
  getCompilerChildrenAsIterators(e, t, n) {
    let r = this.getCompilerChildren(e, t, n);
    return [
      new b(h.ArrayUtils.toIterator(r[0])),
      new b(h.ArrayUtils.toIterator(r[1])),
    ];
  }
  getCompilerChildren(e, t, n) {
    let r = e.compilerNode,
      i = e._sourceFile.compilerNode;
    return [F.getCompilerChildren(r, i), F.getCompilerChildren(t, n)];
  }
  getChildrenFast(e, t, n) {
    let r = e.compilerNode,
      i = e._sourceFile.compilerNode;
    return F.hasParsedTokens(r)
      ? [F.getCompilerChildren(r, i), F.getCompilerChildren(t, n)]
      : [
          F.getCompilerForEachChildren(r, i),
          F.getCompilerForEachChildren(t, n),
        ];
  }
}
class eI {
  compilerFactory;
  helper;
  constructor(e) {
    (this.compilerFactory = e), (this.helper = new eN(e));
  }
  handleNode(e, t, n) {
    if (e.getKind() !== t.kind) {
      let n = [e.getKind(), t.kind];
      if (
        n.includes(h.ts.SyntaxKind.Identifier) &&
        n.includes(h.ts.SyntaxKind.PrivateIdentifier)
      )
        return void e.forget();
      throw new h.errors.InvalidOperationError(
        `Error replacing tree! Perhaps a syntax error was inserted (Current: ${e.getKindName()} -- New: ${h.getSyntaxKindName(
          t.kind
        )}).`
      );
    }
    e._hasWrappedChildren() && this.#e1(e, t, n),
      this.compilerFactory.replaceCompilerNode(e, t);
  }
  #e1(e, t, n) {
    let [r, i] = this.helper.getChildrenFast(e, t, n);
    if (r.length !== i.length)
      throw Error(
        `Error replacing tree: The children of the old and new trees were expected to have the same count (${r.length}:${i.length}).`
      );
    for (let e = 0; e < r.length; e++)
      this.helper.handleForValues(this, r[e], i[e], n);
  }
}
class eP {
  #e0;
  #e2;
  #e4;
  #e3;
  #e6;
  constructor(e, t) {
    (this.#e2 = new eI(e)),
      (this.#e4 = new eN(e)),
      (this.#e3 = t.oldIndex),
      (this.#e6 = t.newIndex),
      (this.#e0 = e);
  }
  handleNode(e, t, n) {
    let [r, i] = this.#e4.getCompilerChildren(e, t, n),
      a = this.#e8(r);
    h.errors.throwIfNotEqual(
      i.length,
      a.length,
      "New children length should match the old children length."
    );
    for (let e = 0; e < i.length; e++)
      this.#e4.handleForValues(this.#e2, a[e], i[e], n);
    this.#e0.replaceCompilerNode(e, t);
  }
  #e8(e) {
    let t = [...e],
      n = t.splice(this.#e3, 1)[0];
    return t.splice(this.#e6, 0, n), t;
  }
}
class eM {
  #e0;
  #e2;
  #e4;
  #e5;
  #e7;
  #e9;
  #te;
  constructor(e, t) {
    (this.#e2 = new eI(e)),
      (this.#e4 = new eN(e)),
      (this.#e5 = t.childCount),
      (this.#e7 = t.isFirstChild),
      (this.#e9 = t.replacingNodes?.map((e) => e.compilerNode)),
      (this.#te = t.customMappings),
      (this.#e0 = e);
  }
  handleNode(e, t, n) {
    let [r, i] = this.#e4.getCompilerChildrenAsIterators(e, t, n),
      a = this.#e5;
    for (this.#tt(t); !r.done && !i.done && !this.#e7(r.peek, i.peek); )
      this.#e4.handleForValues(this.#e2, r.next(), i.next(), n);
    for (; !r.done && this.#tn(r.peek); ) r.next();
    if (a > 0) for (; a > 0; ) i.next(), a--;
    else if (a < 0)
      for (; a < 0; ) this.#e4.forgetNodeIfNecessary(r.next()), a++;
    for (; !r.done; ) this.#e4.handleForValues(this.#e2, r.next(), i.next(), n);
    if (!i.done)
      throw Error("Error replacing tree: Should not have children left over.");
    this.#e0.replaceCompilerNode(e, t);
  }
  #tt(e) {
    if (null != this.#te)
      for (let t of this.#te(e))
        this.#e0.replaceCompilerNode(t.currentNode, t.newNode);
  }
  #tn(e) {
    if (null == this.#e9 || 0 === this.#e9.length) return !1;
    let t = this.#e9.indexOf(e);
    return (
      -1 !== t && (this.#e9.splice(t, 1), this.#e4.forgetNodeIfNecessary(e), !0)
    );
  }
}
class eL {
  #e0;
  #e4;
  constructor(e) {
    (this.#e4 = new eN(e)), (this.#e0 = e);
  }
  handleNode(e, t, n) {
    e.getKind() !== t.kind
      ? e.forget()
      : (e._hasWrappedChildren() && this.#e1(e, t, n),
        this.#e0.replaceCompilerNode(e, t));
  }
  #e1(e, t, n) {
    let [r, i] = this.#e4.getChildrenFast(e, t, n),
      a = h.ArrayUtils.toIterator(i);
    for (let e of r) {
      let t = a.next();
      if (t.done) {
        let t = this.#e0.getExistingNodeFromCompilerNode(e);
        null != t && t.forget();
      } else this.#e4.handleForValues(this, e, t.value, n);
    }
  }
}
class eR extends eI {
  #tr;
  #ti;
  #ta;
  #to = !1;
  #ts;
  constructor(e, t, n) {
    super(e),
      (this.#ta = n.getParentSyntaxList() ?? n.getParent()),
      (this.#ts = null != this.#ta && this.#ta.getPos() === n.getPos()),
      (this.#ti = t),
      (this.#tr = n);
  }
  handleNode(e, t, n) {
    !this.#to && this.#tl(t, n)
      ? ((this.#to = !0), this.#ti.handleNode(e, t, n))
      : super.handleNode(e, t, n);
  }
  #tl(e, t) {
    if (!(eF(e, this.#tr) && eF(W(e, t) || e.parent, this.#ta))) return !1;
    if (!this.#ts) return !0;
    return n(this.#tr.compilerNode) === n(e);
    function n(e) {
      let t = e,
        n = 0;
      for (; null != t.parent; ) n++, (t = t.parent);
      return n;
    }
  }
}
function eF(e, t) {
  return (
    (null == e && null == t) ||
    (null != e && null != t && e.pos === t.getPos() && e.kind === t.getKind())
  );
}
class eO {
  #e0;
  #e2;
  #e4;
  #ej;
  #tc;
  constructor(e, t) {
    (this.#e2 = new eI(e)),
      (this.#e4 = new eN(e)),
      (this.#ej = t.start),
      (this.#tc = t.end),
      (this.#e0 = e);
  }
  handleNode(e, t, n) {
    let r = e._sourceFile.compilerNode,
      i = this.#e4.getChildrenFast(e, t, n),
      a = new b(h.ArrayUtils.toIterator(i[0])),
      o = new b(h.ArrayUtils.toIterator(i[1]));
    for (; !a.done && !o.done && o.peek.getEnd() <= this.#ej; )
      this.#td(a.next(), o.next(), n);
    for (
      ;
      !a.done &&
      !o.done &&
      (a.peek.getStart(r) < this.#ej ||
        (a.peek.getStart(r) === this.#ej && o.peek.end > this.#tc));

    )
      this.#tu(a.next(), o.next(), n);
    for (; !o.done && o.peek.getEnd() <= this.#tc; ) o.next();
    for (; !a.done; ) this.#td(a.next(), o.next(), n);
    if (!o.done)
      throw Error("Error replacing tree: Should not have children left over.");
    this.#e0.replaceCompilerNode(e, t);
  }
  #td(e, t, n) {
    this.#e4.handleForValues(this.#e2, e, t, n);
  }
  #tu(e, t, n) {
    this.#e4.handleForValues(this, e, t, n);
  }
}
class eB {
  #e0;
  #e2;
  #e4;
  #ej;
  #tc;
  #tp;
  #e9;
  #te;
  constructor(e, t) {
    (this.#e2 = new eI(e)),
      (this.#e4 = new eN(e)),
      (this.#ej = t.start),
      (this.#tc = t.end),
      (this.#tp = t.replacingLength),
      (this.#e9 = t.replacingNodes?.map((e) => e.compilerNode)),
      (this.#te = t.customMappings),
      (this.#e0 = e);
  }
  handleNode(e, t, n) {
    let r = e._sourceFile.compilerNode,
      [i, a] = this.#e4.getCompilerChildrenAsIterators(e, t, n);
    for (this.#tt(t, n); !i.done && !a.done && a.peek.getStart(n) < this.#ej; )
      this.#td(i.next(), a.next(), n);
    let o = [];
    for (
      ;
      !a.done && a.peek.getStart(n) >= this.#ej && eW(a.peek, n) <= this.#tc;

    )
      o.push(a.next());
    if (null != this.#tp) {
      let e = this.#ej + this.#tp,
        t = [];
      for (; !i.done && (eW(i.peek, r) <= e || i.peek.getStart(r) < e); )
        t.push(i.next());
      if (t.length === o.length && t.every((e, t) => e.kind === o[t].kind))
        for (let e = 0; e < t.length; e++) {
          let n = this.#e0.getExistingNodeFromCompilerNode(t[e]);
          null != n &&
            (n.forgetDescendants(), this.#e0.replaceCompilerNode(t[e], o[e]));
        }
      else t.forEach((e) => this.#e4.forgetNodeIfNecessary(e));
    }
    for (; !i.done; ) this.#td(i.next(), a.next(), n);
    if (!a.done)
      throw Error("Error replacing tree: Should not have children left over.");
    this.#e0.replaceCompilerNode(e, t);
  }
  #tt(e, t) {
    if (null != this.#te)
      for (let n of this.#te(e, t))
        n.currentNode._context.compilerFactory.replaceCompilerNode(
          n.currentNode,
          n.newNode
        );
  }
  #td(e, t, n) {
    this.#tn(e) || this.#e4.handleForValues(this.#e2, e, t, n);
  }
  #tn(e) {
    if (null == this.#e9 || 0 === this.#e9.length) return !1;
    let t = this.#e9.indexOf(e);
    return (
      -1 !== t && (this.#e9.splice(t, 1), this.#e4.forgetNodeIfNecessary(e), !0)
    );
  }
}
function eW(e, t) {
  return e.kind >= h.ts.SyntaxKind.FirstJSDocNode &&
    e.kind <= h.ts.SyntaxKind.LastJSDocNode
    ? eg(
        t.text,
        e.end,
        (e) => 42 !== e && !h.StringUtils.isWhitespaceCharCode(e)
      )
    : e.end;
}
class ej extends eI {
  handleNode(e, t, n) {
    let r = e.getKind(),
      i = t.kind;
    if (
      r === h.SyntaxKind.ShorthandPropertyAssignment &&
      i === h.SyntaxKind.PropertyAssignment
    ) {
      let n = e.getSourceFile(),
        r = e.getNameNode(),
        i = t.initializer;
      this.compilerFactory.replaceCompilerNode(r, i),
        e.forget(),
        this.compilerFactory.getNodeFromCompilerNode(t, n);
      return;
    }
    if (
      (r === h.SyntaxKind.ExportSpecifier &&
        i === h.SyntaxKind.ExportSpecifier &&
        null == e.compilerNode.propertyName &&
        null != t.propertyName) ||
      (r === h.SyntaxKind.ImportSpecifier &&
        i === h.SyntaxKind.ImportSpecifier &&
        null == e.compilerNode.propertyName &&
        null != t.propertyName)
    )
      return void a(this.compilerFactory);
    function a(n) {
      function r(e) {
        return e.kind === h.SyntaxKind.Identifier ? e.escapedText : e.text;
      }
      let i = e.getNameNode(),
        a = t.propertyName,
        o = t.name,
        s = r(a) === r(i.compilerNode) ? o : a;
      n.replaceCompilerNode(i, s), n.replaceCompilerNode(e, t);
    }
    super.handleNode(e, t, n);
  }
}
class ez {
  #t_;
  constructor(e) {
    this.#t_ = e;
  }
  handleNode(e, t, n) {
    if (!tm.isSourceFile(e))
      throw new h.errors.InvalidOperationError(
        "Can only use a TryOrForgetNodeHandler with a source file."
      );
    try {
      this.#t_.handleNode(e, t, n);
    } catch (n) {
      e._context.logger.warn(
        "Could not replace tree, so forgetting all nodes instead. Message: " + n
      ),
        e.getChildSyntaxListOrThrow().forget(),
        e._context.compilerFactory.replaceCompilerNode(e, t);
    }
  }
}
class eV {
  #tf;
  #e0;
  #e2;
  #e4;
  constructor(e, t) {
    (this.#e2 = new eI(e)),
      (this.#e4 = new eN(e)),
      (this.#e0 = e),
      (this.#tf = t);
  }
  handleNode(e, t, n) {
    let [r, i] = this.#e4.getCompilerChildrenAsIterators(e, t, n),
      a = 0;
    for (; !r.done && !i.done && a++ < this.#tf; )
      this.#e4.handleForValues(this.#e2, r.next(), i.next(), n);
    let o = this.#e0.getExistingNodeFromCompilerNode(r.next()),
      s = o.getChildSyntaxListOrThrow();
    for (let e of F.getCompilerChildren(
      s.compilerNode,
      s._sourceFile.compilerNode
    ))
      this.#e4.handleForValues(this.#e2, e, i.next(), n);
    for (
      !(function e(t) {
        if (t === s) return void t._forgetOnlyThis();
        for (let n of t._getChildrenInCacheIterator()) e(n);
        t._forgetOnlyThis();
      })(o);
      !r.done;

    )
      this.#e4.handleForValues(this.#e2, r.next(), i.next(), n);
    if (!i.done)
      throw Error("Error replacing tree: Should not have children left over.");
    this.#e0.replaceCompilerNode(e, t);
  }
}
class eG {
  getDefault(e) {
    let { parent: t, isFirstChild: n, childCount: r, customMappings: i } = e,
      a = t.getSourceFile(),
      o = a._context.compilerFactory,
      s = new eM(o, {
        childCount: r,
        isFirstChild: n,
        replacingNodes:
          null == e.replacingNodes ? void 0 : [...e.replacingNodes],
        customMappings: i,
      });
    return t === a ? s : new eR(o, s, t);
  }
  getForParentRange(e) {
    let {
        parent: t,
        start: n,
        end: r,
        replacingLength: i,
        replacingNodes: a,
        customMappings: o,
      } = e,
      s = t.getSourceFile(),
      l = s._context.compilerFactory,
      c = new eB(l, {
        start: n,
        end: r,
        replacingLength: i,
        replacingNodes: a,
        customMappings: o,
      });
    return t === s ? c : new eR(l, c, t);
  }
  getForRange(e) {
    let { sourceFile: t, start: n, end: r } = e;
    return new eO(t._context.compilerFactory, { start: n, end: r });
  }
  getForChildIndex(e) {
    let {
        parent: t,
        childIndex: n,
        childCount: r,
        replacingNodes: i,
        customMappings: a,
      } = e,
      o = t.getChildren();
    h.errors.throwIfOutOfRange(n, [0, o.length], "opts.childIndex"),
      r < 0 &&
        h.errors.throwIfOutOfRange(r, [n - o.length, 0], "opts.childCount");
    let s = 0;
    return this.getDefault({
      parent: t,
      isFirstChild: () => s++ === n,
      childCount: r,
      replacingNodes: i,
      customMappings: a,
    });
  }
  getForStraightReplacement(e) {
    return new eI(e);
  }
  getForForgetChanged(e) {
    return new eL(e);
  }
  getForRename(e) {
    return new ej(e);
  }
  getForTryOrForget(e) {
    return new ez(e);
  }
  getForChangingChildOrder(e) {
    let { parent: t, oldIndex: n, newIndex: r } = e,
      i = t.getSourceFile(),
      a = i._context.compilerFactory,
      o = new eP(a, { oldIndex: n, newIndex: r });
    return t === i ? o : new eR(a, o, t);
  }
  getForUnwrappingNode(e) {
    let t = e.getParentSyntaxList() || e.getParentOrThrow(),
      n = e.getChildIndex(),
      r = t.getSourceFile(),
      i = r._context.compilerFactory,
      a = new eV(i, n);
    return t === r ? a : new eR(i, a, t);
  }
}
function eK(e) {
  let {
    parent: t,
    previousSibling: n,
    nextSibling: r,
    newLineKind: i,
    getSiblingFormatting: a,
  } = e;
  if (null == n || null == r) return "";
  let o = a(t, n),
    s = a(t, r);
  return o === m.Blankline || s === m.Blankline
    ? i + i
    : o === m.Newline || s === m.Newline
    ? i
    : o === m.Space || s === m.Space
    ? " "
    : "";
}
class eU {
  #tm;
  constructor(e) {
    this.#tm = e;
  }
  getNewText(e) {
    let t,
      n,
      r,
      {
        parent: i,
        oldIndex: a,
        newIndex: o,
        getSiblingFormatting: s,
      } = this.#tm,
      l = i.getChildren(),
      c = i._context.manipulationSettings.getNewLineKindAsString(),
      d = l[a],
      u = i._sourceFile.getFullText(),
      p = ev(u, d.getPos()),
      _ = u.substring(p, d.getEnd()),
      f = Math.min(o, a),
      m = Math.max(o, a),
      h = ((t = [...l]).splice(a, 1), t.splice(o, 0, d), t),
      g = tm.isSourceFile(i.getParentOrThrow()),
      y = "";
    return (
      (y += u.substring(0, l[f].getPos())),
      0 !== f || g || (y += c),
      b(f),
      f === a
        ? ((n = ev(u, l[f].getEnd())), (r = l[m].getEnd()))
        : ((n = ev(u, l[f].getPos())), (r = l[m].getPos())),
      (y += u.substring(n, r)),
      b(m),
      l.length - 1 !== m || g || (y += c),
      (y += u.substring(ev(u, l[m].getEnd()))),
      y
    );
    function b(e) {
      e === a
        ? 0 !== a &&
          a !== l.length - 1 &&
          x({ previousSibling: h[a - 1], nextSibling: h[a] })
        : (0 !== o && x({ previousSibling: h[o - 1], nextSibling: h[o] }),
          (y += _),
          x({ previousSibling: h[o], nextSibling: h[o + 1] }));
    }
    function x(e) {
      let t = eK({
          parent: i,
          getSiblingFormatting: s,
          newLineKind: c,
          previousSibling: e.previousSibling,
          nextSibling: e.nextSibling,
        }),
        n = c + c;
      if (t === n)
        if (y.endsWith(n)) return;
        else y.endsWith(c) ? (y += c) : (y += n);
      else if (t === c)
        if (y.endsWith(c)) return;
        else y += c;
      else if (" " === t)
        if (y.endsWith(" ")) return;
        else y += " ";
      else y += t;
    }
  }
  getTextForError(e) {
    return e;
  }
}
class eH {
  #th;
  constructor(e) {
    this.#th = e;
  }
  getNewText(e) {
    return this.#th;
  }
  getTextForError(e) {
    return e;
  }
}
function eq(e, t, n = 0) {
  let r = Math.max(0, e.lastIndexOf("\n", t) - 100),
    i = Math.min(e.length, e.indexOf("\n", t + n));
  i = -1 === i ? e.length : Math.min(e.length, i + 100);
  let a = "";
  return (
    (a += e.substring(r, i)),
    0 !== r && (a = "..." + a),
    i !== e.length && (a += "..."),
    a
  );
}
class eJ {
  #tm;
  constructor(e) {
    this.#tm = e;
  }
  getNewText(e) {
    let { insertPos: t, newText: n, replacingLength: r = 0 } = this.#tm;
    return e.substring(0, t) + n + e.substring(t + r);
  }
  getTextForError(e) {
    return eq(e, this.#tm.insertPos, this.#tm.newText.length);
  }
}
class e$ {
  #tm;
  #tg;
  constructor(e) {
    this.#tm = e;
  }
  getNewText(e) {
    let t = this.#tm,
      {
        children: n,
        removePrecedingSpaces: r = !1,
        removeFollowingSpaces: i = !1,
        removePrecedingNewLines: a = !1,
        removeFollowingNewLines: o = !1,
        replaceTrivia: s = "",
      } = t,
      l = n[0].getSourceFile().getFullText(),
      c = (function () {
        if (null != t.customRemovalPos) return t.customRemovalPos;
        let e = n[0].getNonWhitespaceStart();
        return r || a ? eg(l, e, d(r, a)) : e;
      })();
    return (
      (this.#tg = c),
      l.substring(0, c) +
        s +
        l.substring(
          (function () {
            if (null != t.customRemovalEnd) return t.customRemovalEnd;
            let e = n[n.length - 1].getEnd();
            return i || o ? eh(l, e, d(i, o)) : e;
          })()
        )
    );
    function d(e, t) {
      return (n) => {
        var r;
        return (
          (!t || (13 !== n && 10 !== n)) && (!e || (32 !== (r = n) && 9 !== r))
        );
      };
    }
  }
  getTextForError(e) {
    return eq(e, this.#tg);
  }
}
function eX(e, t) {
  return "\n" === e[t] || ("\r" === e[t] && "\n" === e[t + 1]);
}
class eY {
  #tm;
  #tg;
  constructor(e) {
    this.#tm = e;
  }
  getNewText(e) {
    let { children: t, getSiblingFormatting: n } = this.#tm,
      r = t[0],
      i = t[t.length - 1],
      a = r.getParentOrThrow(),
      o = a.getSourceFile(),
      s = o.getFullText(),
      l = o._context.manipulationSettings.getNewLineKindAsString(),
      c = r.getPreviousSibling(),
      d = i.getNextSibling(),
      u = (function () {
        if (null != c) {
          let e = c.getTrailingTriviaEnd();
          return eX(s, e) ? e : c.getEnd();
        }
        let e = eg(s, r.getPos(), ey);
        return a.getPos() === e
          ? r.getNonWhitespaceStart()
          : r.isFirstNodeOnLine()
          ? e
          : r.getNonWhitespaceStart();
      })();
    return (
      (this.#tg = u),
      s.substring(0, u) +
        eK({
          parent: a,
          previousSibling: c,
          nextSibling: d,
          newLineKind: l,
          getSiblingFormatting: n,
        }) +
        s.substring(
          (function () {
            let e = i.getTrailingTriviaEnd();
            if (null != c && null != d) {
              let e = n(a, d);
              return e === m.Blankline || e === m.Newline
                ? eb(s, d.getNonWhitespaceStart())
                : d.getNonWhitespaceStart();
            }
            if (a.getEnd() === i.getEnd()) return i.getEnd();
            if (eX(s, e)) {
              if (null == c && 0 === r.getPos()) return ev(s, e);
              for (var t = ev(s, e); t > 0; )
                if ("\n" === s[--t]) {
                  if ("\r" === s[t - 1]) return t - 1;
                  break;
                }
              return t;
            }
            return null == c ? e : i.getEnd();
          })()
        )
    );
  }
  getTextForError(e) {
    return eq(e, this.#tg);
  }
}
class eQ {
  #ty;
  #tv;
  constructor(e, t) {
    (this.#tv = e), (this.#ty = t);
  }
  getNewText(e) {
    let t = [...this.#tv].sort(
        (e, t) => t.getTextSpan().getStart() - e.getTextSpan().getStart()
      ),
      n = e.length,
      r = "";
    for (let i = 0; i < t.length; i++) {
      let a = t[i],
        o = a.getTextSpan();
      (r =
        (a.getPrefixText() || "") +
        this.#ty +
        (a.getSuffixText() || "") +
        e.substring(o.getEnd(), n) +
        r),
        (n = o.getStart());
    }
    return e.substring(0, n) + r;
  }
  getTextForError(e) {
    return 0 === this.#tv.length
      ? e
      : "..." + e.substring(this.#tv[0].getTextSpan().getStart());
  }
}
class eZ {
  getNewText(e) {
    return e;
  }
  getTextForError(e) {
    return e;
  }
}
class e0 extends eJ {
  constructor(e) {
    super({
      insertPos: e.getStart(!0),
      newText: (function (e) {
        let t,
          n = e._sourceFile,
          r = [
            (t = (function () {
              if (tm.isModuleDeclaration(e)) {
                let t = e._getInnerBody();
                if (null == t)
                  throw new h.errors.InvalidOperationError(
                    "This operation requires the module to have a body."
                  );
                return t;
              }
              return tm.isBodied(e)
                ? e.getBody()
                : tm.isBodyable(e)
                ? e.getBodyOrThrow()
                : void h.errors.throwNotImplementedForSyntaxKindError(
                    e.getKind(),
                    e
                  );
            })()).getStart() + 1,
            t.getEnd() - 1,
          ],
          i = r[0],
          a = n.getFullText().substring(r[0], r[1]);
        return h.StringUtils.indent(a, -1, {
          indentText: n._context.manipulationSettings.getIndentationText(),
          indentSizeInSpaces:
            n._context.manipulationSettings._getIndentSizeInSpaces(),
          isInStringAtPos: (e) => n.isInStringAtPos(i + e),
        }).trim();
      })(e),
      replacingLength: e.getWidth(!0),
    });
  }
}
class e1 extends h.errors.InvalidOperationError {
  filePath;
  oldText;
  newText;
  constructor(e, t, n, r) {
    super(r), (this.filePath = e), (this.oldText = t), (this.newText = n);
  }
}
function e2(e, t, n, r) {
  e._firePreModified();
  let i = e.getFullText(),
    a = t.getNewText(i);
  try {
    let t = e._context.compilerFactory.createCompilerSourceFileFromText(
      r || e.getFilePath(),
      a,
      e.getScriptKind()
    );
    n.handleNode(e, t, t);
  } catch (s) {
    let n = (function (e, t) {
        try {
          let n = new e._context.project.constructor({
              useInMemoryFileSystem: !0,
            }),
            r = n.createSourceFile(e.getFilePath(), t);
          return n.getProgram().getSyntacticDiagnostics(r);
        } catch (e) {
          return [];
        }
      })(e, a),
      r =
        s.message +
        "\n\n" +
        `-- Details --
` +
        "Path: " +
        e.getFilePath() +
        "\nText: " +
        JSON.stringify(t.getTextForError(a)) +
        "\nStack: " +
        s.stack;
    function o(t) {
      throw new e1(e.getFilePath(), i, a, t);
    }
    n.length > 0 &&
      o(
        "Manipulation error: A syntax error was inserted.\n\n" +
          e._context.project.formatDiagnosticsWithColorAndContext(n, {
            newLineChar: "\n",
          }) +
          "\n" +
          r
      ),
      o("Manipulation error: " + r);
  }
}
function e4(e) {
  let { insertPos: t, newText: n, parent: r } = e;
  e2(
    r._sourceFile,
    new eJ({
      insertPos: t,
      newText: n,
      replacingLength: e.replacing?.textLength,
    }),
    new eG().getForParentRange({
      parent: r,
      start: t,
      end: t + n.length,
      replacingLength: e.replacing?.textLength,
      replacingNodes: e.replacing?.nodes,
      customMappings: e.customMappings,
    })
  );
}
function e3(e) {
  let { currentNodes: t, insertIndex: n, parent: r } = e,
    i = t[n - 1],
    a = (function () {
      for (let e = n - 1; e >= 0; e--) if (!tm.isCommentNode(t[e])) return t[e];
    })(),
    o = t[n],
    s = (function () {
      for (let e = n; e < t.length; e++)
        if (!tm.isCommentNode(t[e])) return t[e];
    })(),
    l = e.useNewLines
      ? r._context.manipulationSettings.getNewLineKindAsString()
      : " ",
    c = r.getNextSibling(),
    d =
      null != c &&
      (c.getKind() === h.SyntaxKind.CloseBraceToken ||
        c.getKind() === h.SyntaxKind.CloseBracketToken),
    { newText: u } = e;
  if (null != i) {
    (function () {
      if (null == a) return p();
      let e = r.getSourceFile().getFullText(),
        t = a.getNextSibling(),
        n = "";
      function o() {
        let t = l(i) || i.getEnd();
        n += e.substring(a.getEnd(), t);
      }
      function s(t) {
        let r = l(t);
        null != r && (n += e.substring(t.getEnd(), r));
      }
      function l(e) {
        let t = e.getTrailingCommentRanges(),
          n = t[t.length - 1];
        return n?.getEnd();
      }
      null != t && t.getKind() === h.SyntaxKind.CommaToken
        ? (s(a), (n += ","), a === i ? s(t) : o())
        : ((n += ","), a === i ? s(a) : o()),
        p(),
        (u = n + u);
    })(),
      null != s || e.useTrailingCommas
        ? _()
        : e.useNewLines || e.surroundWithSpaces
        ? f()
        : m();
    let t = null == o ? (d ? c.getStart(!0) : r.getEnd()) : o.getStart(!0),
      n = (a || i).getEnd();
    e4({
      insertPos: n,
      newText: u,
      parent: r,
      replacing: { textLength: t - n },
    });
  } else if (null != o) {
    (e.useNewLines || e.surroundWithSpaces) && p(),
      null != s || e.useTrailingCommas ? _() : f();
    let t = d ? r.getPos() : r.getStart(!0);
    e4({
      insertPos: t,
      newText: u,
      parent: r,
      replacing: { textLength: o.getStart(!0) - t },
    });
  } else
    e.useNewLines || e.surroundWithSpaces
      ? (p(), e.useTrailingCommas ? _() : f())
      : m(),
      e4({
        insertPos: r.getPos(),
        newText: u,
        parent: r,
        replacing: {
          textLength: r.getNextSiblingOrThrow().getStart() - r.getPos(),
        },
      });
  function p() {
    h.StringUtils.startsWithNewLine(u) || (u = l + u);
  }
  function _() {
    var e;
    let t;
    (u =
      -1 === (t = ef((e = u))) ? e : e.substring(0, t) + "," + e.substring(t)),
      f();
  }
  function f() {
    h.StringUtils.endsWithNewLine(u) || (u += l), m();
  }
  function m() {
    (e.useNewLines || h.StringUtils.endsWithNewLine(u)) &&
      (null != o
        ? (u += r.getParentOrThrow().getChildIndentationText())
        : (u += r.getParentOrThrow().getIndentationText()));
  }
}
function e6(e) {
  let { parent: t, index: n, children: r } = e,
    i = t._sourceFile.getFullText(),
    a = t.getChildSyntaxListOrThrow(),
    o = ex(n, a, r),
    s =
      (function (e, t, n, r) {
        let i;
        if (e === n.length)
          if (tm.isSourceFile(t)) i = t.getEnd();
          else if (tm.isCaseClause(t) || tm.isDefaultClause(t)) i = t.getEnd();
          else {
            let e = eS(t).getLastChildByKind(h.SyntaxKind.CloseBraceToken);
            i = null == e ? t.getEnd() : e.getStart();
          }
        else i = n[e].getNonWhitespaceStart();
        return eb(r, i);
      })(n, t, r, i) - o,
    l = (function () {
      let i = t._getWriterWithChildIndentation();
      return (
        e.write(i, {
          previousMember: a(r[n - 1]),
          nextMember: a(r[n]),
          isStartOfFile: 0 === o,
        }),
        i.toString()
      );
      function a(e) {
        return null == e
          ? e
          : (tm.isOverloadable(e) && e.getImplementation()) || e;
      }
    })();
  e2(
    t._sourceFile,
    new eJ({ insertPos: o, replacingLength: s, newText: l }),
    new eG().getForParentRange({
      parent: a,
      start: o,
      end: o + l.length,
      replacingLength: s,
    })
  );
}
function e8(e) {
  if (0 === e.structures.length) return [];
  let t = e.getIndexedChildren(),
    n = e.parent.getChildSyntaxListOrThrow(),
    r = eD(e.index, t.length),
    i = (function () {
      let e = 0,
        n = 0;
      for (let i = r - 1; i >= 0; i--) {
        let r = t[i];
        if (tm.isCommentNode(r)) e++, r.getText().startsWith("/**") && (n = e);
        else break;
      }
      return n;
    })();
  return (
    e6({
      parent: e.parent,
      index: 0 === r ? 0 : t[r - 1].getChildIndex() + 1,
      children: n.getChildren(),
      write: e.write,
    }),
    eE(e.getIndexedChildren(), e.index - i, e.structures.length, e.expectedKind)
  );
}
function e5(e) {
  let t = e.getIndexedChildren(),
    n = e.parent.getChildSyntaxListOrThrow(),
    r = eD(e.index, t.length);
  return (
    e6({
      parent: e.parent,
      index: 0 === r ? 0 : t[r - 1].getChildIndex() + 1,
      children: n.getChildren(),
      write: e.write,
    }),
    eT(t, e.getIndexedChildren(), r, !0)
  );
}
function e7(e) {
  let { children: t } = e;
  0 !== t.length &&
    e2(
      t[0].getSourceFile(),
      new e$(e),
      new eG().getForChildIndex({
        parent: t[0].getParentSyntaxList() || t[0].getParentOrThrow(),
        childIndex: t[0].getChildIndex(),
        childCount: -1 * t.length,
      })
    );
}
function e9(e) {
  let { children: t, getSiblingFormatting: n } = e;
  0 !== t.length &&
    e2(
      t[0]._sourceFile,
      new eY({ children: t, getSiblingFormatting: n }),
      new eG().getForChildIndex({
        parent: t[0].getParentSyntaxList() || t[0].getParentOrThrow(),
        childIndex: t[0].getChildIndex(),
        childCount: -1 * t.length,
      })
    );
}
function te(e) {
  e9({ getSiblingFormatting: es, children: e });
}
function tt(e) {
  e9({ getSiblingFormatting: el, children: e });
}
function tn(e) {
  let t,
    n = [e],
    r = e.getParentSyntaxListOrThrow(),
    i = n[0] === r.getFirstChild();
  null != (t = e.getNextSiblingIfKind(h.SyntaxKind.CommaToken)) && n.push(t),
    (function () {
      if (r.getLastChild() !== n[n.length - 1]) return;
      let t = e.getPreviousSiblingIfKind(h.SyntaxKind.CommaToken);
      null != t && n.unshift(t);
    })(),
    e7({
      children: n,
      removePrecedingSpaces:
        !i || (r.getChildren().length === n.length && n[0].isFirstNodeOnLine()),
      removeFollowingSpaces: i,
      removePrecedingNewLines: !i,
      removeFollowingNewLines: i,
    });
}
function tr(e) {
  e9({ getSiblingFormatting: ec, children: e });
}
function ti(e) {
  e9({ getSiblingFormatting: ed, children: e });
}
function ta(e) {
  e2(
    e.sourceFile,
    new eJ({
      insertPos: e.start,
      newText: e.newText,
      replacingLength: e.replacingLength,
    }),
    new eG().getForForgetChanged(e.sourceFile._context.compilerFactory)
  );
}
function to(e) {
  let { sourceFile: t, newText: n } = e;
  e2(
    t,
    new eH(n),
    new eG().getForStraightReplacement(t._context.compilerFactory)
  );
}
function ts(e) {
  let { sourceFile: t, newFilePath: n } = e;
  e2(
    t,
    new eZ(),
    new eG().getForStraightReplacement(t._context.compilerFactory),
    n
  );
}
function tl(e) {
  return class extends e {
    getArguments() {
      return (
        this.compilerNode.arguments?.map((e) =>
          this._getNodeFromCompilerNode(e)
        ) ?? []
      );
    }
    addArgument(e) {
      return this.addArguments([e])[0];
    }
    addArguments(e) {
      return this.insertArguments(this.getArguments().length, e);
    }
    insertArgument(e, t) {
      return this.insertArguments(e, [t])[0];
    }
    insertArguments(e, t) {
      if ((t instanceof Function && (t = [t]), h.ArrayUtils.isNullOrEmpty(t)))
        return [];
      this._addParensIfNecessary();
      let n = this.getArguments();
      e = eD(e, n.length);
      let r = this._getWriterWithQueuedChildIndentation();
      for (let e = 0; e < t.length; e++)
        r.conditionalWrite(e > 0, ", "), $(r, t[e]);
      return (
        e3({
          parent: this.getFirstChildByKindOrThrow(
            h.SyntaxKind.OpenParenToken
          ).getNextSiblingIfKindOrThrow(h.SyntaxKind.SyntaxList),
          currentNodes: n,
          insertIndex: e,
          newText: r.toString(),
          useTrailingCommas: !1,
        }),
        eT(n, this.getArguments(), e, !1)
      );
    }
    removeArgument(e) {
      let t = this.getArguments();
      if (0 === t.length)
        throw new h.errors.InvalidOperationError(
          "Cannot remove an argument when none exist."
        );
      return tn("number" == typeof e ? t[eD(e, t.length - 1)] : e), this;
    }
    _addParensIfNecessary() {
      let e = this.getFullText();
      ")" !== e[e.length - 1] &&
        e4({ insertPos: this.getEnd(), newText: "()", parent: this });
    }
  };
}
function tc(e) {
  return class extends e {
    isAsync() {
      return this.hasModifier(h.SyntaxKind.AsyncKeyword);
    }
    getAsyncKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.AsyncKeyword);
    }
    getAsyncKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getAsyncKeyword(),
        e ?? "Expected to find an async keyword.",
        this
      );
    }
    setIsAsync(e) {
      return this.toggleModifier("async", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isAsync && this.setIsAsync(t.isAsync),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { isAsync: this.isAsync() });
    }
  };
}
function td(e) {
  return class extends e {
    isAwaited() {
      return null != this.compilerNode.awaitModifier;
    }
    getAwaitKeyword() {
      let e = this.compilerNode.awaitModifier;
      return this._getNodeFromCompilerNodeIfExists(e);
    }
    getAwaitKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getAwaitKeyword(),
        e ?? "Expected to find an await token."
      );
    }
    setIsAwaited(e) {
      let t = this.getAwaitKeyword();
      return (
        (null != t) === e ||
          (null == t
            ? e4({
                insertPos: (function (e) {
                  if (e.getKind() === h.SyntaxKind.ForOfStatement)
                    return e
                      .getFirstChildByKindOrThrow(h.SyntaxKind.ForKeyword)
                      .getEnd();
                  throw new h.errors.NotImplementedError(
                    "Expected a for of statement node."
                  );
                })(this),
                parent: this,
                newText: " await",
              })
            : e7({ children: [t], removePrecedingSpaces: !0 })),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isAwaited && this.setIsAwaited(t.isAwaited),
        this
      );
    }
  };
}
function tu(e, t) {
  return (
    e.newLineIfLastNot(),
    ("string" != typeof t || t.length > 0) &&
      e.indent(() => {
        $(e, t);
      }),
    e.newLineIfLastNot(),
    e.write(""),
    e.toString()
  );
}
function tp(e) {
  let t = e._sourceFile,
    n = e.getChildSyntaxList() || e,
    r = n.getNonWhitespaceStart(),
    i = Math.max(r, n._getTrailingTriviaNonWhitespaceEnd());
  if (0 == i - r) return "";
  let a = t.getFullText().substring(r, i);
  return h.StringUtils.removeIndentation(a, {
    indentSizeInSpaces:
      e._context.manipulationSettings._getIndentSizeInSpaces(),
    isInStringAtPos: (e) => t.isInStringAtPos(e + r),
  });
}
class t_ {
  #tb;
  #ez;
  constructor(e, t) {
    (this.#tb = e), (this.#ez = t);
  }
  get compilerObject() {
    return this.#tx(), this.#tb;
  }
  getSourceFile() {
    return this.#tx(), this.#ez;
  }
  getPos() {
    return this.compilerObject.pos;
  }
  getEnd() {
    return this.compilerObject.end;
  }
  getWidth() {
    return this.getEnd() - this.getPos();
  }
  getText() {
    return this.getSourceFile()
      .getFullText()
      .substring(this.compilerObject.pos, this.compilerObject.end);
  }
  _forget() {
    (this.#tb = void 0), (this.#ez = void 0);
  }
  wasForgotten() {
    return null == this.#tb;
  }
  #tx() {
    if (null == this.#tb)
      throw new h.errors.InvalidOperationError(
        "Attempted to get a text range that was forgotten. Text ranges are forgotten after a manipulation has occurred. Please re-request the text range after manipulations."
      );
  }
}
class tf extends t_ {
  constructor(e, t) {
    super(e, t);
  }
  getKind() {
    return this.compilerObject.kind;
  }
}
class tm {
  #tS;
  #tk;
  #tT;
  #tE;
  #tC;
  _wrappedChildCount = 0;
  _context;
  __sourceFile;
  get _sourceFile() {
    if (null == this.__sourceFile)
      throw new h.errors.InvalidOperationError(
        "Operation cannot be performed on a node that has no source file."
      );
    return this.__sourceFile;
  }
  get compilerNode() {
    if (null == this.#tS) {
      let e =
        "Attempted to get information from a node that was removed or forgotten.";
      throw (
        (null != this.#tk &&
          (e += `

Node text: ${this.#tk}`),
        new h.errors.InvalidOperationError(e))
      );
    }
    return this.#tS;
  }
  constructor(e, t, n) {
    if (null == e || null == e.compilerFactory)
      throw new h.errors.InvalidOperationError(
        "Constructing a node is not supported. Please create a source file from the default export of the package and manipulate the source file from there."
      );
    (this._context = e), (this.#tS = t), (this.__sourceFile = n);
  }
  forget() {
    this.wasForgotten() || (this.forgetDescendants(), this._forgetOnlyThis());
  }
  forgetDescendants() {
    for (let e of this._getChildrenInCacheIterator()) e.forget();
  }
  _forgetOnlyThis() {
    if (this.wasForgotten()) return;
    let e = this.getParent();
    null != e && e._wrappedChildCount--,
      this.#tA(),
      this._context.compilerFactory.removeNodeFromCache(this),
      this._clearInternals();
  }
  wasForgotten() {
    return null == this.#tS;
  }
  _hasWrappedChildren() {
    return (
      this._wrappedChildCount > 0 || this.#tS?.kind === h.SyntaxKind.SyntaxList
    );
  }
  _replaceCompilerNodeFromFactory(e) {
    null == e && this.#tA(), this._clearInternals(), (this.#tS = e);
  }
  #tA() {
    let e,
      t,
      n,
      r,
      i = this._sourceFile && this._sourceFile.compilerNode,
      a = this.#tS;
    null != i &&
      null != a &&
      (this.#tk =
        ((e = a.getStart(i)),
        (n = Math.min((t = a.end - e), 100)),
        (r = i.text.substr(e, n)),
        n !== t ? r + "..." : r));
  }
  _clearInternals() {
    function e(e) {
      null != e && e.forEach((e) => e._forget());
    }
    (this.#tS = void 0),
      (this.#tT = void 0),
      e(this.#tE),
      e(this.#tC),
      (this.#tE = void 0),
      (this.#tC = void 0);
  }
  getKind() {
    return this.compilerNode.kind;
  }
  getKindName() {
    return h.getSyntaxKindName(this.compilerNode.kind);
  }
  getFlags() {
    return this.compilerNode.flags;
  }
  print(e = {}) {
    return (null == e.newLineKind &&
      (e.newLineKind = this._context.manipulationSettings.getNewLineKind()),
    this.getKind() === h.SyntaxKind.SourceFile)
      ? K(this.compilerNode, e)
      : K(this.compilerNode, this._sourceFile.compilerNode, e);
  }
  getSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getSymbol(),
      e ?? "Could not find the node's symbol.",
      this
    );
  }
  getSymbol() {
    let e = this.compilerNode.symbol;
    if (null != e) return this._context.compilerFactory.getSymbol(e);
    let t = this._context.typeChecker.getSymbolAtLocation(this);
    if (null != t) return t;
    let n = this.compilerNode.name;
    if (null != n) return this._getNodeFromCompilerNode(n).getSymbol();
  }
  getSymbolsInScope(e) {
    return this._context.typeChecker.getSymbolsInScope(this, e);
  }
  getLocalOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getLocal(e),
      t ?? (() => `Expected to find local symbol with name: ${e}`),
      this
    );
  }
  getLocal(e) {
    let t = this.#tw();
    if (null == t) return;
    let n = t.get(h.ts.escapeLeadingUnderscores(e));
    return null == n ? void 0 : this._context.compilerFactory.getSymbol(n);
  }
  getLocals() {
    let e = this.#tw();
    return null == e
      ? []
      : Array.from(e.values()).map((e) =>
          this._context.compilerFactory.getSymbol(e)
        );
  }
  #tw() {
    return this._ensureBound(), this.compilerNode.locals;
  }
  getType() {
    return this._context.typeChecker.getTypeAtLocation(this);
  }
  containsRange(e, t) {
    return this.getPos() <= e && t <= this.getEnd();
  }
  isInStringAtPos(e) {
    if (
      (h.errors.throwIfOutOfRange(e, [this.getPos(), this.getEnd()], "pos"),
      null == this.#tT)
    )
      for (let e of ((this.#tT = []), this._getCompilerDescendantsIterator()))
        (function (e) {
          switch (e) {
            case h.SyntaxKind.StringLiteral:
            case h.SyntaxKind.NoSubstitutionTemplateLiteral:
            case h.SyntaxKind.TemplateHead:
            case h.SyntaxKind.TemplateMiddle:
            case h.SyntaxKind.TemplateTail:
              return !0;
            default:
              return !1;
          }
        })(e.kind) &&
          this.#tT.push([
            e.getStart(this._sourceFile.compilerNode),
            e.getEnd(),
          ]);
    return (
      -1 !==
      h.ArrayUtils.binarySearch(
        this.#tT,
        new (class {
          compareTo(t) {
            return e <= t[0] ? -1 : +(e >= t[1] - 1);
          }
        })()
      )
    );
  }
  asKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.asKind(e),
      t ??
        (() =>
          `Expected the node to be of kind ${h.getSyntaxKindName(
            e
          )}, but it was ${h.getSyntaxKindName(this.getKind())}.`),
      this
    );
  }
  isKind(e) {
    return this.getKind() === e;
  }
  asKind(e) {
    return this.isKind(e) ? this : void 0;
  }
  getFirstChildOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstChild(e),
      t ?? "Could not find a child that matched the specified condition.",
      this
    );
  }
  getFirstChild(e) {
    let t = this._getCompilerFirstChild(th(this, e));
    return this._getNodeFromCompilerNodeIfExists(t);
  }
  getLastChildOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getLastChild(e),
      t ?? "Could not find a child that matched the specified condition.",
      this
    );
  }
  getLastChild(e) {
    let t = this._getCompilerLastChild(th(this, e));
    return this._getNodeFromCompilerNodeIfExists(t);
  }
  getFirstDescendantOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstDescendant(e),
      t ?? "Could not find a descendant that matched the specified condition.",
      this
    );
  }
  getFirstDescendant(e) {
    for (let t of this._getDescendantsIterator())
      if (null == e || e(t)) return t;
  }
  getPreviousSiblingOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getPreviousSibling(e),
      t ?? "Could not find the previous sibling.",
      this
    );
  }
  getPreviousSibling(e) {
    let t = this._getCompilerPreviousSibling(th(this, e));
    return this._getNodeFromCompilerNodeIfExists(t);
  }
  getNextSiblingOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getNextSibling(e),
      t ?? "Could not find the next sibling.",
      this
    );
  }
  getNextSibling(e) {
    let t = this._getCompilerNextSibling(th(this, e));
    return this._getNodeFromCompilerNodeIfExists(t);
  }
  getPreviousSiblings() {
    return this._getCompilerPreviousSiblings().map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getNextSiblings() {
    return this._getCompilerNextSiblings().map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getChildren() {
    return this._getCompilerChildren().map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getChildAtIndex(e) {
    return this._getNodeFromCompilerNode(this._getCompilerChildAtIndex(e));
  }
  *_getChildrenIterator() {
    for (let e of this._getCompilerChildren())
      yield this._getNodeFromCompilerNode(e);
  }
  *_getChildrenInCacheIterator() {
    for (let e of this._getCompilerChildrenFast())
      this._context.compilerFactory.hasCompilerNode(e)
        ? yield this._context.compilerFactory.getExistingNodeFromCompilerNode(e)
        : e.kind === h.SyntaxKind.SyntaxList &&
          (yield this._getNodeFromCompilerNode(e));
  }
  getChildSyntaxListOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getChildSyntaxList(),
      e ?? "A child syntax list was expected.",
      this
    );
  }
  getChildSyntaxList() {
    let e = this;
    if (tm.isBodyable(e) || tm.isBodied(e))
      do {
        let t = (tm.isBodyable(e), e.getBody());
        if (null == t) return;
        e = t;
      } while (
        (tm.isBodyable(e) || tm.isBodied(e)) &&
        null == e.compilerNode.statements
      );
    if (
      tm.isSourceFile(e) ||
      tm.isBodyable(this) ||
      tm.isBodied(this) ||
      tm.isCaseBlock(this) ||
      tm.isCaseClause(this) ||
      tm.isDefaultClause(this) ||
      tm.isJsxElement(this)
    )
      return e.getFirstChildByKind(h.SyntaxKind.SyntaxList);
    let t = !1;
    for (let n of e._getCompilerChildren())
      if (t) {
        if (n.kind === h.SyntaxKind.SyntaxList)
          return this._getNodeFromCompilerNode(n);
      } else t = n.kind === h.SyntaxKind.OpenBraceToken;
  }
  forEachChild(e, t) {
    let n = [];
    for (let r of (this.compilerNode.forEachChild(
      (e) => {
        n.push(this._getNodeFromCompilerNode(e));
      },
      null == t
        ? void 0
        : (e) => {
            n.push(e.map((e) => this._getNodeFromCompilerNode(e)));
          }
    ),
    n))
      if (r instanceof Array) {
        let e = r.filter((e) => !e.wasForgotten());
        if (e.length > 0) {
          let n = t(e);
          if (n) return n;
        }
      } else if (!r.wasForgotten()) {
        let t = e(r);
        if (t) return t;
      }
  }
  forEachDescendant(e, t) {
    let n = {},
      r = {},
      i = !1,
      a = !1,
      o = { stop: () => (i = !0), up: () => (a = !0) },
      s =
        null == t
          ? void 0
          : (e) => {
              if (i) return n;
              let r = !1,
                s = t(e, { ...o, skip: () => (r = !0) });
              if (s) return s;
              if (!r)
                for (let t of e) {
                  if (i) return n;
                  if (a) break;
                  let e = c(t);
                  if (e) return e;
                }
            },
      l = c(this);
    return l === n ? void 0 : l;
    function c(t) {
      let l = t.forEachChild(
        (t) => {
          let s = ((t) => {
            if (i) return n;
            let r = !1,
              s = e(t, { ...o, skip: () => (r = !0) });
            return s ? s : i ? n : r || a || t.wasForgotten() ? void 0 : c(t);
          })(t);
          return a ? ((a = !1), s || r) : s;
        },
        null == s
          ? void 0
          : (e) => {
              let t = s(e);
              return a ? ((a = !1), t || r) : t;
            }
      );
      return l === r ? void 0 : l;
    }
  }
  forEachChildAsArray() {
    let e = [];
    return (
      this.compilerNode.forEachChild((t) => {
        e.push(this._getNodeFromCompilerNode(t));
      }),
      e
    );
  }
  forEachDescendantAsArray() {
    let e = [];
    return (
      this.forEachDescendant((t) => {
        e.push(t);
      }),
      e
    );
  }
  getDescendants() {
    return Array.from(this._getDescendantsIterator());
  }
  *_getDescendantsIterator() {
    for (let e of this._getCompilerDescendantsIterator())
      yield this._getNodeFromCompilerNode(e);
  }
  getDescendantStatements() {
    let e = [];
    return t(this, this.compilerNode), e;
    function t(r, i) {
      (function (t, r) {
        if (null == r.statements) return !1;
        for (let i of t._getNodeFromCompilerNode(r).getStatements())
          e.push(i), n(t, i.compilerNode);
        return !0;
      })(r, i) ||
        (i.kind === h.SyntaxKind.ArrowFunction
          ? i.body.kind !== h.SyntaxKind.Block
            ? e.push(r._getNodeFromCompilerNode(i.body))
            : t(r, i.body)
          : n(r, i));
    }
    function n(e, n) {
      h.ts.forEachChild(n, (n) => t(e, n));
    }
  }
  getChildCount() {
    return this._getCompilerChildren().length;
  }
  getChildAtPos(e) {
    if (!(e < this.getPos() || e >= this.getEnd())) {
      for (let t of this._getCompilerChildren())
        if (e >= t.pos && e < t.end) return this._getNodeFromCompilerNode(t);
    }
  }
  getDescendantAtPos(e) {
    let t;
    for (;;) {
      let n = (t || this).getChildAtPos(e);
      if (null == n) return t;
      t = n;
    }
  }
  getDescendantAtStartWithWidth(e, t) {
    let n;
    return (
      this._context.compilerFactory.forgetNodesCreatedInBlock((r) => {
        let i = this.getSourceFile();
        do
          if (null != (i = i.getChildAtPos(e))) {
            if (i.getStart() === e && i.getWidth() === t) n = i;
            else if (null != n) break;
          }
        while (null != i);
        null != n && r(n);
      }),
      n
    );
  }
  getPos() {
    return this.compilerNode.pos;
  }
  getEnd() {
    return this.compilerNode.end;
  }
  getStart(e) {
    return this.compilerNode.getStart(this._sourceFile.compilerNode, e);
  }
  getFullStart() {
    return this.compilerNode.getFullStart();
  }
  getNonWhitespaceStart() {
    return this._context.compilerFactory.forgetNodesCreatedInBlock(() => {
      let e,
        t = this.getParent(),
        n = this.getPos();
      if (null != t && !tm.isSourceFile(t) && t.getPos() === n)
        return this.getStart(!0);
      let r = this._sourceFile.getFullText(),
        i = this.getPreviousSibling();
      return (
        (e =
          null != i && tm.isCommentNode(i)
            ? i.getEnd()
            : null != i
            ? !(function (e, t) {
                for (let n = t[0]; n < t[1]; n++) if ("\n" === e[n]) return !0;
                return !1;
              })(r, [n, this.getStart(!0)])
              ? n
              : i.getTrailingTriviaEnd()
            : this.getPos()),
        eh(r, e, ey)
      );
    });
  }
  _getTrailingTriviaNonWhitespaceEnd() {
    return eg(this._sourceFile.getFullText(), this.getTrailingTriviaEnd(), ey);
  }
  getWidth(e) {
    return this.getEnd() - this.getStart(e);
  }
  getFullWidth() {
    return this.compilerNode.getFullWidth();
  }
  getLeadingTriviaWidth() {
    return this.compilerNode.getLeadingTriviaWidth(
      this._sourceFile.compilerNode
    );
  }
  getTrailingTriviaWidth() {
    return this.getTrailingTriviaEnd() - this.getEnd();
  }
  getTrailingTriviaEnd() {
    let e = this.getParent(),
      t = this.getEnd();
    if (null == e || e.getEnd() === t) return t;
    let n = this.getTrailingCommentRanges(),
      r = n.length > 0 ? n[n.length - 1].getEnd() : t;
    return eh(this._sourceFile.getFullText(), r, (e) => 32 !== e && 9 !== e);
  }
  getText(e) {
    let t = "object" == typeof e ? e : void 0,
      n = !0 === e || (null != t && t.includeJsDocComments),
      r = null != t && t.trimLeadingIndentation,
      i = this.getStart(n),
      a = this._sourceFile.getFullText().substring(i, this.getEnd());
    return r
      ? h.StringUtils.removeIndentation(a, {
          isInStringAtPos: (e) => this._sourceFile.isInStringAtPos(e + i),
          indentSizeInSpaces:
            this._context.manipulationSettings._getIndentSizeInSpaces(),
        })
      : a;
  }
  getFullText() {
    return this.compilerNode.getFullText(this._sourceFile.compilerNode);
  }
  getCombinedModifierFlags() {
    return h.ts.getCombinedModifierFlags(this.compilerNode);
  }
  getSourceFile() {
    return this._sourceFile;
  }
  getProject() {
    return this._context.project;
  }
  getNodeProperty(e) {
    let t = this.compilerNode[e];
    if (null != t)
      return t instanceof Array
        ? t.map((e) => (n(e) ? this._getNodeFromCompilerNode(e) : e))
        : n(t)
        ? this._getNodeFromCompilerNode(t)
        : t;
    function n(e) {
      return (
        "number" == typeof e.kind &&
        "number" == typeof e.pos &&
        "number" == typeof e.end
      );
    }
  }
  getAncestors(e = !1) {
    return Array.from(this._getAncestorsIterator(e));
  }
  *_getAncestorsIterator(e) {
    let t = n(this);
    for (; null != t; ) yield t, (t = n(t));
    function n(t) {
      return (e && t.getParentSyntaxList()) || t.getParent();
    }
  }
  getParent() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.parent);
  }
  getParentOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getParent(),
      e ?? "Expected to find a parent.",
      this
    );
  }
  getParentWhileOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getParentWhile(e),
      t ?? "The initial parent did not match the provided condition.",
      this
    );
  }
  getParentWhile(e) {
    let t,
      n = this.getParent();
    for (; n && e(n, t || this); ) n = (t = n).getParent();
    return t;
  }
  getParentWhileKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getParentWhileKind(e),
      t ??
        (() =>
          `The initial parent was not a syntax kind of ${h.getSyntaxKindName(
            e
          )}.`),
      this
    );
  }
  getParentWhileKind(e) {
    return this.getParentWhile((t) => t.getKind() === e);
  }
  getLastToken() {
    let e = this.compilerNode.getLastToken(this._sourceFile.compilerNode);
    if (null == e)
      throw new h.errors.NotImplementedError(
        "Not implemented scenario where the last token does not exist."
      );
    return this._getNodeFromCompilerNode(e);
  }
  isInSyntaxList() {
    return null != this.getParentSyntaxList();
  }
  getParentSyntaxListOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getParentSyntaxList(),
      e ?? "Expected the parent to be a syntax list.",
      this
    );
  }
  getParentSyntaxList() {
    let e = this.getKind();
    if (
      e === h.SyntaxKind.SingleLineCommentTrivia ||
      e === h.SyntaxKind.MultiLineCommentTrivia
    )
      return this.getParentOrThrow().getChildSyntaxList();
    let t = W(this.compilerNode, this._sourceFile.compilerNode);
    return this._getNodeFromCompilerNodeIfExists(t);
  }
  _getParentSyntaxListIfWrapped() {
    let e = this.getParent();
    if (null != e && F.hasParsedTokens(e.compilerNode))
      return this.getParentSyntaxList();
  }
  getChildIndex() {
    let e = (this.getParentSyntaxList() || this.getParentOrThrow())
      ._getCompilerChildren()
      .indexOf(this.compilerNode);
    if (-1 === e)
      throw new h.errors.NotImplementedError(
        "For some reason the child's parent did not contain the child."
      );
    return e;
  }
  getIndentationLevel() {
    let e = this._context.manipulationSettings.getIndentationText();
    return (
      this._context.languageService.getIdentationAtPosition(
        this._sourceFile,
        this.getStart()
      ) / e.length
    );
  }
  getChildIndentationLevel() {
    return tm.isSourceFile(this) ? 0 : this.getIndentationLevel() + 1;
  }
  getIndentationText(e = 0) {
    return this.#tD(this.getIndentationLevel() + e);
  }
  getChildIndentationText(e = 0) {
    return this.#tD(this.getChildIndentationLevel() + e);
  }
  #tD(e) {
    return this._context.manipulationSettings.getIndentationText().repeat(e);
  }
  getStartLinePos(e) {
    return eg(
      this._sourceFile.getFullText(),
      this.getStart(e),
      (e) => 10 === e || 13 === e
    );
  }
  getStartLineNumber(e) {
    return h.StringUtils.getLineNumberAtPos(
      this._sourceFile.getFullText(),
      this.getStartLinePos(e)
    );
  }
  getEndLineNumber() {
    let e = eg(
      this._sourceFile.getFullText(),
      this.getEnd(),
      (e) => 10 === e || 13 === e
    );
    return h.StringUtils.getLineNumberAtPos(this._sourceFile.getFullText(), e);
  }
  isFirstNodeOnLine() {
    let e = this._sourceFile.getFullText(),
      t = this.getNonWhitespaceStart();
    for (let n = t - 1; n >= 0; n--) {
      let t = e[n];
      if (" " !== t && "	" !== t) {
        if ("\n" === t) return !0;
        return !1;
      }
    }
    return !0;
  }
  replaceWithText(e, t) {
    let n = J(t || this._getWriterWithQueuedIndentation(), e);
    if (tm.isSourceFile(this))
      return this.replaceText([this.getPos(), this.getEnd()], n), this;
    let r = this.getParentSyntaxList() || this.getParentOrThrow(),
      i = this.getChildIndex(),
      a = this.getStart(!0);
    return (
      e4({
        parent: r,
        insertPos: a,
        newText: n,
        replacing: { textLength: this.getEnd() - a },
      }),
      r.getChildren()[i]
    );
  }
  prependWhitespace(e) {
    tg(this, this.getStart(!0), e, h.nameof(this, "prependWhitespace"));
  }
  appendWhitespace(e) {
    tg(this, this.getEnd(), e, h.nameof(this, "appendWhitespace"));
  }
  formatText(e = {}) {
    let t = this._context.languageService.getFormattingEditsForRange(
      this._sourceFile.getFilePath(),
      [this.getStart(!0), this.getEnd()],
      e
    );
    to({ sourceFile: this._sourceFile, newText: ep(this._sourceFile, t) });
  }
  transform(e) {
    let t = this._context.compilerFactory,
      n = h.ts.createPrinter({
        newLine: this._context.manipulationSettings.getNewLineKind(),
        removeComments: !1,
      }),
      r = [],
      i = this._sourceFile.compilerNode,
      a = this.compilerNode,
      o = (n) => (a) =>
        (function n(a, o) {
          let s = e({
            factory: o.factory,
            visitChildren: () =>
              (a = h.ts.visitEachChild(a, (e) => n(e, o), o)),
            currentNode: a,
          });
          return (
            (function (e, n) {
              let a;
              if (e === n && null == n.emitNode) return;
              let o = e.getStart(i, !0),
                s = e.end;
              for (; (a = r[r.length - 1]) && a.start > o; ) r.pop();
              let l = t.getExistingNodeFromCompilerNode(e);
              r.push({ start: o, end: s, compilerNode: n }),
                null != l &&
                  (e.kind !== n.kind ? l.forget() : l.forgetDescendants());
            })(a, s),
            s
          );
        })(a, n);
    if (this.getKind() === h.ts.SyntaxKind.SourceFile)
      return (
        h.ts.transform(a, [o], this._context.compilerOptions.get()),
        to({
          sourceFile: this._sourceFile,
          newText: s([0, this.getEnd()]),
        }),
        this
      );
    {
      let e = this.getParentSyntaxList() || this.getParentOrThrow(),
        t = this.getChildIndex(),
        n = this.getStart(!0),
        r = this.getEnd();
      return (
        h.ts.transform(a, [o], this._context.compilerOptions.get()),
        e4({
          parent: e,
          insertPos: n,
          newText: s([n, r]),
          replacing: { textLength: r - n },
        }),
        e.getChildren()[t]
      );
    }
    function s(e) {
      let t = i.getFullText(),
        a = "",
        o = e[0];
      for (let e of r)
        (a += t.substring(o, e.start)),
          (a += n.printNode(
            h.ts.EmitHint.Unspecified,
            e.compilerNode,
            e.compilerNode.getSourceFile() ?? i
          )),
          (o = e.end);
      return a + t.substring(o, e[1]);
    }
  }
  getLeadingCommentRanges() {
    return (
      this.#tE ||
      (this.#tE = this.#tN(this.getFullStart(), (e, t) => {
        let n = h.ts.getLeadingCommentRanges(e, t) || [];
        if (
          this.getKind() !== h.SyntaxKind.SingleLineCommentTrivia &&
          this.getKind() !== h.SyntaxKind.MultiLineCommentTrivia
        )
          return n;
        {
          let e = this.getPos();
          return n.filter((t) => t.pos < e);
        }
      }))
    );
  }
  getTrailingCommentRanges() {
    return (
      this.#tC ??
      (this.#tC = this.#tN(this.getEnd(), h.ts.getTrailingCommentRanges))
    );
  }
  #tN(e, t) {
    return this.getKind() === h.SyntaxKind.SourceFile
      ? []
      : (t(this._sourceFile.getFullText(), e) ?? []).map(
          (e) => new tf(e, this._sourceFile)
        );
  }
  getChildrenOfKind(e) {
    return this._getCompilerChildrenOfKind(e).map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getFirstChildByKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstChildByKind(e),
      t ??
        (() => `A child of the kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getFirstChildByKind(e) {
    let t = this._getCompilerChildrenOfKind(e)[0];
    return null == t ? void 0 : this._getNodeFromCompilerNode(t);
  }
  getFirstChildIfKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstChildIfKind(e),
      t ??
        (() =>
          `A first child of the kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getFirstChildIfKind(e) {
    let t = this._getCompilerFirstChild();
    return null != t && t.kind === e
      ? this._getNodeFromCompilerNode(t)
      : void 0;
  }
  getLastChildByKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getLastChildByKind(e),
      t ??
        (() => `A child of the kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getLastChildByKind(e) {
    let t = this._getCompilerChildrenOfKind(e),
      n = t[t.length - 1];
    return this._getNodeFromCompilerNodeIfExists(n);
  }
  getLastChildIfKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getLastChildIfKind(e),
      t ??
        (() =>
          `A last child of the kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getLastChildIfKind(e) {
    let t = this._getCompilerLastChild();
    return null != t && t.kind === e
      ? this._getNodeFromCompilerNode(t)
      : void 0;
  }
  getChildAtIndexIfKindOrThrow(e, t, n) {
    return h.errors.throwIfNullOrUndefined(
      this.getChildAtIndexIfKind(e, t),
      n ??
        (() =>
          `Child at index ${e} was expected to be ${h.getSyntaxKindName(t)}`),
      this
    );
  }
  getChildAtIndexIfKind(e, t) {
    let n = this._getCompilerChildAtIndex(e);
    return n.kind === t ? this._getNodeFromCompilerNode(n) : void 0;
  }
  getPreviousSiblingIfKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getPreviousSiblingIfKind(e),
      t ??
        (() =>
          `A previous sibling of kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getNextSiblingIfKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getNextSiblingIfKind(e),
      t ??
        (() =>
          `A next sibling of kind ${h.getSyntaxKindName(e)} was expected.`),
      this
    );
  }
  getPreviousSiblingIfKind(e) {
    let t = this._getCompilerPreviousSibling();
    return null != t && t.kind === e
      ? this._getNodeFromCompilerNode(t)
      : void 0;
  }
  getNextSiblingIfKind(e) {
    let t = this._getCompilerNextSibling();
    return null != t && t.kind === e
      ? this._getNodeFromCompilerNode(t)
      : void 0;
  }
  getParentIfOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getParentIf(e),
      t ?? "The parent did not match the provided condition.",
      this
    );
  }
  getParentIf(e) {
    return e(this.getParent(), this) ? this.getParent() : void 0;
  }
  getParentIfKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getParentIfKind(e),
      t ??
        (() =>
          `The parent was not a syntax kind of ${h.getSyntaxKindName(e)}.`),
      this
    );
  }
  getParentIfKind(e) {
    return this.getParentIf((t) => void 0 !== t && t.getKind() === e);
  }
  getFirstAncestorByKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstAncestorByKind(e),
      t ??
        (() =>
          `Expected an ancestor with a syntax kind of ${h.getSyntaxKindName(
            e
          )}.`),
      this
    );
  }
  getFirstAncestorByKind(e) {
    for (let t of this._getAncestorsIterator(e === h.SyntaxKind.SyntaxList))
      if (t.getKind() === e) return t;
  }
  getFirstAncestorOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstAncestor(e),
      t ?? "Expected to find an ancestor that matched the provided condition.",
      this
    );
  }
  getFirstAncestor(e) {
    for (let t of this._getAncestorsIterator(!1))
      if (null == e || e(t)) return t;
  }
  getDescendantsOfKind(e) {
    let t = [];
    for (let n of this._getCompilerDescendantsOfKindIterator(e))
      t.push(this._getNodeFromCompilerNode(n));
    return t;
  }
  getFirstDescendantByKindOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getFirstDescendantByKind(e),
      t ??
        (() =>
          `A descendant of kind ${h.getSyntaxKindName(
            e
          )} was expected to be found.`),
      this
    );
  }
  getFirstDescendantByKind(e) {
    for (let t of this._getCompilerDescendantsOfKindIterator(e))
      return this._getNodeFromCompilerNode(t);
  }
  _getCompilerChildren() {
    return F.getCompilerChildren(
      this.compilerNode,
      this._sourceFile.compilerNode
    );
  }
  _getCompilerForEachChildren() {
    return F.getCompilerForEachChildren(
      this.compilerNode,
      this._sourceFile.compilerNode
    );
  }
  _getCompilerChildrenFast() {
    return F.hasParsedTokens(this.compilerNode)
      ? this._getCompilerChildren()
      : this._getCompilerForEachChildren();
  }
  _getCompilerChildrenOfKind(e) {
    return (
      tb(this, e)
        ? this._getCompilerForEachChildren()
        : this._getCompilerChildren()
    ).filter((t) => t.kind === e);
  }
  *_getCompilerDescendantsOfKindIterator(e) {
    for (let t of tb(this, e)
      ? this._getCompilerForEachChildren()
      : this._getCompilerChildren())
      for (let n of (t.kind === e && (yield t),
      tb(t.kind, e) ? ty(t) : tv(t, this._sourceFile.compilerNode)))
        n.kind === e && (yield n);
  }
  _getCompilerDescendantsIterator() {
    return tv(this.compilerNode, this._sourceFile.compilerNode);
  }
  _getCompilerForEachDescendantsIterator() {
    return ty(this.compilerNode);
  }
  _getCompilerFirstChild(e) {
    for (let t of this._getCompilerChildren()) if (null == e || e(t)) return t;
  }
  _getCompilerLastChild(e) {
    let t = this._getCompilerChildren();
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (null == e || e(r)) return r;
    }
  }
  _getCompilerPreviousSiblings() {
    let e = this.getParentSyntaxList() || this.getParentOrThrow(),
      t = [];
    for (let n of e._getCompilerChildren()) {
      if (n === this.compilerNode) break;
      t.unshift(n);
    }
    return t;
  }
  _getCompilerNextSiblings() {
    let e = !1,
      t = this.getParentSyntaxList() || this.getParentOrThrow(),
      n = [];
    for (let r of t._getCompilerChildren()) {
      if (!e) {
        e = r === this.compilerNode;
        continue;
      }
      n.push(r);
    }
    return n;
  }
  _getCompilerPreviousSibling(e) {
    for (let t of this._getCompilerPreviousSiblings())
      if (null == e || e(t)) return t;
  }
  _getCompilerNextSibling(e) {
    for (let t of this._getCompilerNextSiblings())
      if (null == e || e(t)) return t;
  }
  _getCompilerChildAtIndex(e) {
    let t = this._getCompilerChildren();
    return h.errors.throwIfOutOfRange(e, [0, t.length - 1], "index"), t[e];
  }
  _getWriterWithIndentation() {
    let e = this._getWriter();
    return e.setIndentationLevel(this.getIndentationLevel()), e;
  }
  _getWriterWithQueuedIndentation() {
    let e = this._getWriter();
    return e.queueIndentationLevel(this.getIndentationLevel()), e;
  }
  _getWriterWithChildIndentation() {
    let e = this._getWriter();
    return e.setIndentationLevel(this.getChildIndentationLevel()), e;
  }
  _getWriterWithQueuedChildIndentation() {
    let e = this._getWriter();
    return e.queueIndentationLevel(this.getChildIndentationLevel()), e;
  }
  _getTextWithQueuedChildIndentation(e) {
    let t = this._getWriterWithQueuedChildIndentation();
    return "string" == typeof e ? t.write(e) : e(t), t.toString();
  }
  _getWriter() {
    return this._context.createWriter();
  }
  _getNodeFromCompilerNode(e) {
    return this._context.compilerFactory.getNodeFromCompilerNode(
      e,
      this._sourceFile
    );
  }
  _getNodeFromCompilerNodeIfExists(e) {
    return null == e ? void 0 : this._getNodeFromCompilerNode(e);
  }
  _ensureBound() {
    null == this.compilerNode.symbol && this.getSymbol();
  }
  static hasExpression(e) {
    return e.getExpression?.() != null;
  }
  static hasName(e) {
    return "string" == typeof e.getName?.();
  }
  static hasBody(e) {
    return e.getBody?.() != null;
  }
  static hasStructure(e) {
    return "function" == typeof e.getStructure;
  }
  static is(e) {
    return (t) => t?.getKind() == e;
  }
  static isNode(e) {
    return null != e && null != e.compilerNode;
  }
  static isCommentNode(e) {
    let t = e?.getKind();
    return (
      t === h.SyntaxKind.SingleLineCommentTrivia ||
      t === h.SyntaxKind.MultiLineCommentTrivia
    );
  }
  static isCommentStatement(e) {
    return e?.compilerNode?._commentKind === exports.CommentNodeKind.Statement;
  }
  static isCommentClassElement(e) {
    return (
      e?.compilerNode?._commentKind === exports.CommentNodeKind.ClassElement
    );
  }
  static isCommentTypeElement(e) {
    return (
      e?.compilerNode?._commentKind === exports.CommentNodeKind.TypeElement
    );
  }
  static isCommentObjectLiteralElement(e) {
    return (
      e?.compilerNode?._commentKind ===
      exports.CommentNodeKind.ObjectLiteralElement
    );
  }
  static isCommentEnumMember(e) {
    return e?.compilerNode?._commentKind == exports.CommentNodeKind.EnumMember;
  }
  static isAbstractable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isAmbientable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isAnyKeyword = tm.is(h.SyntaxKind.AnyKeyword);
  static isArgumented(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.NewExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isArrayBindingPattern = tm.is(h.SyntaxKind.ArrayBindingPattern);
  static isArrayLiteralExpression = tm.is(h.SyntaxKind.ArrayLiteralExpression);
  static isArrayTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ArrayType;
  }
  static isArrowFunction = tm.is(h.SyntaxKind.ArrowFunction);
  static isAsExpression = tm.is(h.SyntaxKind.AsExpression);
  static isAsyncable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.MethodDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isAwaitable(e) {
    return e?.getKind() === h.SyntaxKind.ForOfStatement;
  }
  static isAwaitExpression = tm.is(h.SyntaxKind.AwaitExpression);
  static isBigIntLiteral = tm.is(h.SyntaxKind.BigIntLiteral);
  static isBinaryExpression = tm.is(h.SyntaxKind.BinaryExpression);
  static isBindingElement = tm.is(h.SyntaxKind.BindingElement);
  static isBindingNamed(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isBlock = tm.is(h.SyntaxKind.Block);
  static isBodied(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.FunctionExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isBodyable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isBooleanKeyword = tm.is(h.SyntaxKind.BooleanKeyword);
  static isBreakStatement = tm.is(h.SyntaxKind.BreakStatement);
  static isCallExpression = tm.is(h.SyntaxKind.CallExpression);
  static isCallSignatureDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.CallSignature;
  }
  static isCaseBlock = tm.is(h.SyntaxKind.CaseBlock);
  static isCaseClause = tm.is(h.SyntaxKind.CaseClause);
  static isCatchClause = tm.is(h.SyntaxKind.CatchClause);
  static isChildOrderable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.Block:
      case h.SyntaxKind.BreakStatement:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.ContinueStatement:
      case h.SyntaxKind.DebuggerStatement:
      case h.SyntaxKind.DoStatement:
      case h.SyntaxKind.EmptyStatement:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.ExportAssignment:
      case h.SyntaxKind.ExportDeclaration:
      case h.SyntaxKind.ExpressionStatement:
      case h.SyntaxKind.ForInStatement:
      case h.SyntaxKind.ForOfStatement:
      case h.SyntaxKind.ForStatement:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.IfStatement:
      case h.SyntaxKind.ImportDeclaration:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.LabeledStatement:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.ModuleBlock:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.NotEmittedStatement:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.ReturnStatement:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.SwitchStatement:
      case h.SyntaxKind.ThrowStatement:
      case h.SyntaxKind.TryStatement:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableStatement:
      case h.SyntaxKind.WhileStatement:
      case h.SyntaxKind.WithStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isClassDeclaration = tm.is(h.SyntaxKind.ClassDeclaration);
  static isClassExpression = tm.is(h.SyntaxKind.ClassExpression);
  static isClassLikeDeclarationBase(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isClassStaticBlockDeclaration = tm.is(
    h.SyntaxKind.ClassStaticBlockDeclaration
  );
  static isCommaListExpression = tm.is(h.SyntaxKind.CommaListExpression);
  static isComputedPropertyName = tm.is(h.SyntaxKind.ComputedPropertyName);
  static isConditionalExpression = tm.is(h.SyntaxKind.ConditionalExpression);
  static isConditionalTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ConditionalType;
  }
  static isConstructorDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.Constructor;
  }
  static isConstructorTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ConstructorType;
  }
  static isConstructSignatureDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.ConstructSignature;
  }
  static isContinueStatement = tm.is(h.SyntaxKind.ContinueStatement);
  static isDebuggerStatement = tm.is(h.SyntaxKind.DebuggerStatement);
  static isDecoratable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isDecorator = tm.is(h.SyntaxKind.Decorator);
  static isDefaultClause = tm.is(h.SyntaxKind.DefaultClause);
  static isDeleteExpression = tm.is(h.SyntaxKind.DeleteExpression);
  static isDoStatement = tm.is(h.SyntaxKind.DoStatement);
  static isDotDotDotTokenable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.JsxExpression:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.Parameter:
        return !0;
      default:
        return !1;
    }
  }
  static isElementAccessExpression = tm.is(
    h.SyntaxKind.ElementAccessExpression
  );
  static isEmptyStatement = tm.is(h.SyntaxKind.EmptyStatement);
  static isEnumDeclaration = tm.is(h.SyntaxKind.EnumDeclaration);
  static isEnumMember = tm.is(h.SyntaxKind.EnumMember);
  static isExclamationTokenable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isExportable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isExportAssignment = tm.is(h.SyntaxKind.ExportAssignment);
  static isExportDeclaration = tm.is(h.SyntaxKind.ExportDeclaration);
  static isExportGetable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isExportSpecifier = tm.is(h.SyntaxKind.ExportSpecifier);
  static isExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.AnyKeyword:
      case h.SyntaxKind.BooleanKeyword:
      case h.SyntaxKind.NumberKeyword:
      case h.SyntaxKind.ObjectKeyword:
      case h.SyntaxKind.StringKeyword:
      case h.SyntaxKind.SymbolKeyword:
      case h.SyntaxKind.UndefinedKeyword:
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.AsExpression:
      case h.SyntaxKind.AwaitExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.BinaryExpression:
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.CommaListExpression:
      case h.SyntaxKind.ConditionalExpression:
      case h.SyntaxKind.DeleteExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxClosingFragment:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxExpression:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxOpeningElement:
      case h.SyntaxKind.JsxOpeningFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NonNullExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.OmittedExpression:
      case h.SyntaxKind.ParenthesizedExpression:
      case h.SyntaxKind.PartiallyEmittedExpression:
      case h.SyntaxKind.PostfixUnaryExpression:
      case h.SyntaxKind.PrefixUnaryExpression:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.SatisfiesExpression:
      case h.SyntaxKind.SpreadElement:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TaggedTemplateExpression:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
      case h.SyntaxKind.TypeAssertionExpression:
      case h.SyntaxKind.TypeOfExpression:
      case h.SyntaxKind.VoidExpression:
      case h.SyntaxKind.YieldExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isExpressionable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ExternalModuleReference:
      case h.SyntaxKind.JsxExpression:
      case h.SyntaxKind.ReturnStatement:
      case h.SyntaxKind.YieldExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isExpressioned(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.AsExpression:
      case h.SyntaxKind.CaseClause:
      case h.SyntaxKind.ComputedPropertyName:
      case h.SyntaxKind.DoStatement:
      case h.SyntaxKind.ExportAssignment:
      case h.SyntaxKind.ExpressionStatement:
      case h.SyntaxKind.ForInStatement:
      case h.SyntaxKind.ForOfStatement:
      case h.SyntaxKind.IfStatement:
      case h.SyntaxKind.JsxSpreadAttribute:
      case h.SyntaxKind.NonNullExpression:
      case h.SyntaxKind.ParenthesizedExpression:
      case h.SyntaxKind.PartiallyEmittedExpression:
      case h.SyntaxKind.SatisfiesExpression:
      case h.SyntaxKind.SpreadAssignment:
      case h.SyntaxKind.SpreadElement:
      case h.SyntaxKind.SwitchStatement:
      case h.SyntaxKind.TemplateSpan:
      case h.SyntaxKind.ThrowStatement:
      case h.SyntaxKind.WhileStatement:
      case h.SyntaxKind.WithStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isExpressionStatement = tm.is(h.SyntaxKind.ExpressionStatement);
  static isExpressionWithTypeArguments = tm.is(
    h.SyntaxKind.ExpressionWithTypeArguments
  );
  static isExtendsClauseable(e) {
    return e?.getKind() === h.SyntaxKind.InterfaceDeclaration;
  }
  static isExternalModuleReference = tm.is(
    h.SyntaxKind.ExternalModuleReference
  );
  static isFalseLiteral(e) {
    return e?.getKind() === h.SyntaxKind.FalseKeyword;
  }
  static isForInStatement = tm.is(h.SyntaxKind.ForInStatement);
  static isForOfStatement = tm.is(h.SyntaxKind.ForOfStatement);
  static isForStatement = tm.is(h.SyntaxKind.ForStatement);
  static isFunctionDeclaration = tm.is(h.SyntaxKind.FunctionDeclaration);
  static isFunctionExpression = tm.is(h.SyntaxKind.FunctionExpression);
  static isFunctionLikeDeclaration(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isFunctionTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.FunctionType;
  }
  static isGeneratorable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.YieldExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isGetAccessorDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.GetAccessor;
  }
  static isHeritageClause = tm.is(h.SyntaxKind.HeritageClause);
  static isHeritageClauseable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.InterfaceDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isIdentifier = tm.is(h.SyntaxKind.Identifier);
  static isIfStatement = tm.is(h.SyntaxKind.IfStatement);
  static isImplementsClauseable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isImportAttribute = tm.is(h.SyntaxKind.ImportAttribute);
  static isImportAttributeNamed(e) {
    return e?.getKind() === h.SyntaxKind.ImportAttribute;
  }
  static isImportAttributes = tm.is(h.SyntaxKind.ImportAttributes);
  static isImportClause = tm.is(h.SyntaxKind.ImportClause);
  static isImportDeclaration = tm.is(h.SyntaxKind.ImportDeclaration);
  static isImportEqualsDeclaration = tm.is(
    h.SyntaxKind.ImportEqualsDeclaration
  );
  static isImportExpression(e) {
    return e?.getKind() === h.SyntaxKind.ImportKeyword;
  }
  static isImportSpecifier = tm.is(h.SyntaxKind.ImportSpecifier);
  static isImportTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ImportType;
  }
  static isIndexedAccessTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.IndexedAccessType;
  }
  static isIndexSignatureDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.IndexSignature;
  }
  static isInferKeyword = tm.is(h.SyntaxKind.InferKeyword);
  static isInferTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.InferType;
  }
  static isInitializerExpressionable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isInitializerExpressionGetable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.ShorthandPropertyAssignment:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isInterfaceDeclaration = tm.is(h.SyntaxKind.InterfaceDeclaration);
  static isIntersectionTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.IntersectionType;
  }
  static isIterationStatement(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.DoStatement:
      case h.SyntaxKind.ForInStatement:
      case h.SyntaxKind.ForOfStatement:
      case h.SyntaxKind.ForStatement:
      case h.SyntaxKind.WhileStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDoc = tm.is(h.SyntaxKind.JSDoc);
  static isJSDocable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.CaseClause:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.ExportAssignment:
      case h.SyntaxKind.ExpressionStatement:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.LabeledStatement:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDocAllType = tm.is(h.SyntaxKind.JSDocAllType);
  static isJSDocAugmentsTag = tm.is(h.SyntaxKind.JSDocAugmentsTag);
  static isJSDocAuthorTag = tm.is(h.SyntaxKind.JSDocAuthorTag);
  static isJSDocCallbackTag = tm.is(h.SyntaxKind.JSDocCallbackTag);
  static isJSDocClassTag = tm.is(h.SyntaxKind.JSDocClassTag);
  static isJSDocDeprecatedTag = tm.is(h.SyntaxKind.JSDocDeprecatedTag);
  static isJSDocEnumTag = tm.is(h.SyntaxKind.JSDocEnumTag);
  static isJSDocFunctionType = tm.is(h.SyntaxKind.JSDocFunctionType);
  static isJSDocImplementsTag = tm.is(h.SyntaxKind.JSDocImplementsTag);
  static isJSDocLink = tm.is(h.SyntaxKind.JSDocLink);
  static isJSDocLinkCode = tm.is(h.SyntaxKind.JSDocLinkCode);
  static isJSDocLinkPlain = tm.is(h.SyntaxKind.JSDocLinkPlain);
  static isJSDocMemberName = tm.is(h.SyntaxKind.JSDocMemberName);
  static isJSDocNamepathType = tm.is(h.SyntaxKind.JSDocNamepathType);
  static isJSDocNameReference = tm.is(h.SyntaxKind.JSDocNameReference);
  static isJSDocNonNullableType = tm.is(h.SyntaxKind.JSDocNonNullableType);
  static isJSDocNullableType = tm.is(h.SyntaxKind.JSDocNullableType);
  static isJSDocOptionalType = tm.is(h.SyntaxKind.JSDocOptionalType);
  static isJSDocOverloadTag = tm.is(h.SyntaxKind.JSDocOverloadTag);
  static isJSDocOverrideTag = tm.is(h.SyntaxKind.JSDocOverrideTag);
  static isJSDocParameterTag = tm.is(h.SyntaxKind.JSDocParameterTag);
  static isJSDocPrivateTag = tm.is(h.SyntaxKind.JSDocPrivateTag);
  static isJSDocPropertyLikeTag(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JSDocParameterTag:
      case h.SyntaxKind.JSDocPropertyTag:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDocPropertyTag = tm.is(h.SyntaxKind.JSDocPropertyTag);
  static isJSDocProtectedTag = tm.is(h.SyntaxKind.JSDocProtectedTag);
  static isJSDocPublicTag = tm.is(h.SyntaxKind.JSDocPublicTag);
  static isJSDocReadonlyTag = tm.is(h.SyntaxKind.JSDocReadonlyTag);
  static isJSDocReturnTag = tm.is(h.SyntaxKind.JSDocReturnTag);
  static isJSDocSatisfiesTag = tm.is(h.SyntaxKind.JSDocSatisfiesTag);
  static isJSDocSeeTag = tm.is(h.SyntaxKind.JSDocSeeTag);
  static isJSDocSignature = tm.is(h.SyntaxKind.JSDocSignature);
  static isJSDocTag(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JSDocAugmentsTag:
      case h.SyntaxKind.JSDocAuthorTag:
      case h.SyntaxKind.JSDocCallbackTag:
      case h.SyntaxKind.JSDocClassTag:
      case h.SyntaxKind.JSDocDeprecatedTag:
      case h.SyntaxKind.JSDocEnumTag:
      case h.SyntaxKind.JSDocImplementsTag:
      case h.SyntaxKind.JSDocOverloadTag:
      case h.SyntaxKind.JSDocOverrideTag:
      case h.SyntaxKind.JSDocParameterTag:
      case h.SyntaxKind.JSDocPrivateTag:
      case h.SyntaxKind.JSDocPropertyTag:
      case h.SyntaxKind.JSDocProtectedTag:
      case h.SyntaxKind.JSDocPublicTag:
      case h.SyntaxKind.JSDocReadonlyTag:
      case h.SyntaxKind.JSDocReturnTag:
      case h.SyntaxKind.JSDocSatisfiesTag:
      case h.SyntaxKind.JSDocSeeTag:
      case h.SyntaxKind.JSDocTemplateTag:
      case h.SyntaxKind.JSDocThisTag:
      case h.SyntaxKind.JSDocThrowsTag:
      case h.SyntaxKind.JSDocTypedefTag:
      case h.SyntaxKind.JSDocTypeTag:
      case h.SyntaxKind.JSDocTag:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDocTemplateTag = tm.is(h.SyntaxKind.JSDocTemplateTag);
  static isJSDocText = tm.is(h.SyntaxKind.JSDocText);
  static isJSDocThisTag = tm.is(h.SyntaxKind.JSDocThisTag);
  static isJSDocThrowsTag = tm.is(h.SyntaxKind.JSDocThrowsTag);
  static isJSDocType(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JSDocAllType:
      case h.SyntaxKind.JSDocFunctionType:
      case h.SyntaxKind.JSDocNamepathType:
      case h.SyntaxKind.JSDocNonNullableType:
      case h.SyntaxKind.JSDocNullableType:
      case h.SyntaxKind.JSDocOptionalType:
      case h.SyntaxKind.JSDocSignature:
      case h.SyntaxKind.JSDocTypeLiteral:
      case h.SyntaxKind.JSDocUnknownType:
      case h.SyntaxKind.JSDocVariadicType:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDocTypedefTag = tm.is(h.SyntaxKind.JSDocTypedefTag);
  static isJSDocTypeExpression = tm.is(h.SyntaxKind.JSDocTypeExpression);
  static isJSDocTypeExpressionableTag(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JSDocOverloadTag:
      case h.SyntaxKind.JSDocReturnTag:
      case h.SyntaxKind.JSDocSatisfiesTag:
      case h.SyntaxKind.JSDocSeeTag:
      case h.SyntaxKind.JSDocThisTag:
      case h.SyntaxKind.JSDocThrowsTag:
        return !0;
      default:
        return !1;
    }
  }
  static isJSDocTypeLiteral = tm.is(h.SyntaxKind.JSDocTypeLiteral);
  static isJSDocTypeParameteredTag(e) {
    return e?.getKind() === h.SyntaxKind.JSDocTemplateTag;
  }
  static isJSDocTypeTag = tm.is(h.SyntaxKind.JSDocTypeTag);
  static isJSDocUnknownTag(e) {
    return e?.getKind() === h.SyntaxKind.JSDocTag;
  }
  static isJSDocUnknownType = tm.is(h.SyntaxKind.JSDocUnknownType);
  static isJSDocVariadicType = tm.is(h.SyntaxKind.JSDocVariadicType);
  static isJsxAttribute = tm.is(h.SyntaxKind.JsxAttribute);
  static isJsxAttributed(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JsxOpeningElement:
      case h.SyntaxKind.JsxSelfClosingElement:
        return !0;
      default:
        return !1;
    }
  }
  static isJsxClosingElement = tm.is(h.SyntaxKind.JsxClosingElement);
  static isJsxClosingFragment = tm.is(h.SyntaxKind.JsxClosingFragment);
  static isJsxElement = tm.is(h.SyntaxKind.JsxElement);
  static isJsxExpression = tm.is(h.SyntaxKind.JsxExpression);
  static isJsxFragment = tm.is(h.SyntaxKind.JsxFragment);
  static isJsxNamespacedName = tm.is(h.SyntaxKind.JsxNamespacedName);
  static isJsxOpeningElement = tm.is(h.SyntaxKind.JsxOpeningElement);
  static isJsxOpeningFragment = tm.is(h.SyntaxKind.JsxOpeningFragment);
  static isJsxSelfClosingElement = tm.is(h.SyntaxKind.JsxSelfClosingElement);
  static isJsxSpreadAttribute = tm.is(h.SyntaxKind.JsxSpreadAttribute);
  static isJsxTagNamed(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.JsxClosingElement:
      case h.SyntaxKind.JsxOpeningElement:
      case h.SyntaxKind.JsxSelfClosingElement:
        return !0;
      default:
        return !1;
    }
  }
  static isJsxText = tm.is(h.SyntaxKind.JsxText);
  static isLabeledStatement = tm.is(h.SyntaxKind.LabeledStatement);
  static isLeftHandSideExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NonNullExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TaggedTemplateExpression:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
        return !0;
      default:
        return !1;
    }
  }
  static isLeftHandSideExpressioned(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.Decorator:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.ExpressionWithTypeArguments:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.PropertyAccessExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isLiteralExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
        return !0;
      default:
        return !1;
    }
  }
  static isLiteralLike(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.JsxText:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.TemplateHead:
      case h.SyntaxKind.TemplateMiddle:
      case h.SyntaxKind.TemplateTail:
        return !0;
      default:
        return !1;
    }
  }
  static isLiteralTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.LiteralType;
  }
  static isMappedTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.MappedType;
  }
  static isMemberExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TaggedTemplateExpression:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
        return !0;
      default:
        return !1;
    }
  }
  static isMetaProperty = tm.is(h.SyntaxKind.MetaProperty);
  static isMethodDeclaration = tm.is(h.SyntaxKind.MethodDeclaration);
  static isMethodSignature = tm.is(h.SyntaxKind.MethodSignature);
  static isModifierable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeParameter:
      case h.SyntaxKind.VariableDeclarationList:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isModuleBlock = tm.is(h.SyntaxKind.ModuleBlock);
  static isModuleChildable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isModuleDeclaration = tm.is(h.SyntaxKind.ModuleDeclaration);
  static isModuled(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.SourceFile:
        return !0;
      default:
        return !1;
    }
  }
  static isModuleNamed(e) {
    return e?.getKind() === h.SyntaxKind.ModuleDeclaration;
  }
  static isNameable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isNamedExports = tm.is(h.SyntaxKind.NamedExports);
  static isNamedImports = tm.is(h.SyntaxKind.NamedImports);
  static isNamed(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.ShorthandPropertyAssignment:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeParameter:
        return !0;
      default:
        return !1;
    }
  }
  static isNamedTupleMember = tm.is(h.SyntaxKind.NamedTupleMember);
  static isNamespaceExport = tm.is(h.SyntaxKind.NamespaceExport);
  static isNamespaceImport = tm.is(h.SyntaxKind.NamespaceImport);
  static isNeverKeyword = tm.is(h.SyntaxKind.NeverKeyword);
  static isNewExpression = tm.is(h.SyntaxKind.NewExpression);
  static isNodeWithTypeArguments(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ExpressionWithTypeArguments:
      case h.SyntaxKind.ImportType:
      case h.SyntaxKind.TypeQuery:
      case h.SyntaxKind.TypeReference:
        return !0;
      default:
        return !1;
    }
  }
  static isNonNullExpression = tm.is(h.SyntaxKind.NonNullExpression);
  static isNoSubstitutionTemplateLiteral = tm.is(
    h.SyntaxKind.NoSubstitutionTemplateLiteral
  );
  static isNotEmittedStatement = tm.is(h.SyntaxKind.NotEmittedStatement);
  static isNullLiteral(e) {
    return e?.getKind() === h.SyntaxKind.NullKeyword;
  }
  static isNumberKeyword = tm.is(h.SyntaxKind.NumberKeyword);
  static isNumericLiteral = tm.is(h.SyntaxKind.NumericLiteral);
  static isObjectBindingPattern = tm.is(h.SyntaxKind.ObjectBindingPattern);
  static isObjectKeyword = tm.is(h.SyntaxKind.ObjectKeyword);
  static isObjectLiteralExpression = tm.is(
    h.SyntaxKind.ObjectLiteralExpression
  );
  static isOmittedExpression = tm.is(h.SyntaxKind.OmittedExpression);
  static isOverloadable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.MethodDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isOverrideable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isParameterDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.Parameter;
  }
  static isParametered(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.FunctionType:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.JSDocFunctionType:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isParenthesizedExpression = tm.is(
    h.SyntaxKind.ParenthesizedExpression
  );
  static isParenthesizedTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ParenthesizedType;
  }
  static isPartiallyEmittedExpression = tm.is(
    h.SyntaxKind.PartiallyEmittedExpression
  );
  static isPostfixUnaryExpression = tm.is(h.SyntaxKind.PostfixUnaryExpression);
  static isPrefixUnaryExpression = tm.is(h.SyntaxKind.PrefixUnaryExpression);
  static isPrimaryExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
        return !0;
      default:
        return !1;
    }
  }
  static isPrivateIdentifier = tm.is(h.SyntaxKind.PrivateIdentifier);
  static isPropertyAccessExpression = tm.is(
    h.SyntaxKind.PropertyAccessExpression
  );
  static isPropertyAssignment = tm.is(h.SyntaxKind.PropertyAssignment);
  static isPropertyDeclaration = tm.is(h.SyntaxKind.PropertyDeclaration);
  static isPropertyNamed(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isPropertySignature = tm.is(h.SyntaxKind.PropertySignature);
  static isQualifiedName = tm.is(h.SyntaxKind.QualifiedName);
  static isQuestionDotTokenable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.PropertyAccessExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isQuestionTokenable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.ShorthandPropertyAssignment:
        return !0;
      default:
        return !1;
    }
  }
  static isReadonlyable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
        return !0;
      default:
        return !1;
    }
  }
  static isReferenceFindable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportAttribute:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PrivateIdentifier:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.ShorthandPropertyAssignment:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeParameter:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isRegularExpressionLiteral = tm.is(
    h.SyntaxKind.RegularExpressionLiteral
  );
  static isRenameable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.BindingElement:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportAttribute:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.NamespaceExport:
      case h.SyntaxKind.NamespaceImport:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PrivateIdentifier:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.ShorthandPropertyAssignment:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeParameter:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isRestTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.RestType;
  }
  static isReturnStatement = tm.is(h.SyntaxKind.ReturnStatement);
  static isReturnTyped(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.FunctionType:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.JSDocFunctionType:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isSatisfiesExpression = tm.is(h.SyntaxKind.SatisfiesExpression);
  static isScopeable(e) {
    return e?.getKind() === h.SyntaxKind.Parameter;
  }
  static isScoped(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isSemicolonToken = tm.is(h.SyntaxKind.SemicolonToken);
  static isSetAccessorDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.SetAccessor;
  }
  static isShorthandPropertyAssignment = tm.is(
    h.SyntaxKind.ShorthandPropertyAssignment
  );
  static isSignaturedDeclaration(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.FunctionType:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.JSDocFunctionType:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isSourceFile = tm.is(h.SyntaxKind.SourceFile);
  static isSpreadAssignment = tm.is(h.SyntaxKind.SpreadAssignment);
  static isSpreadElement = tm.is(h.SyntaxKind.SpreadElement);
  static isStatement(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.Block:
      case h.SyntaxKind.BreakStatement:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ContinueStatement:
      case h.SyntaxKind.DebuggerStatement:
      case h.SyntaxKind.DoStatement:
      case h.SyntaxKind.EmptyStatement:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.ExportAssignment:
      case h.SyntaxKind.ExportDeclaration:
      case h.SyntaxKind.ExpressionStatement:
      case h.SyntaxKind.ForInStatement:
      case h.SyntaxKind.ForOfStatement:
      case h.SyntaxKind.ForStatement:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.IfStatement:
      case h.SyntaxKind.ImportDeclaration:
      case h.SyntaxKind.ImportEqualsDeclaration:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.LabeledStatement:
      case h.SyntaxKind.ModuleBlock:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.NotEmittedStatement:
      case h.SyntaxKind.ReturnStatement:
      case h.SyntaxKind.SwitchStatement:
      case h.SyntaxKind.ThrowStatement:
      case h.SyntaxKind.TryStatement:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.VariableStatement:
      case h.SyntaxKind.WhileStatement:
      case h.SyntaxKind.WithStatement:
        return !0;
      default:
        return !1;
    }
  }
  static isStatemented(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.Block:
      case h.SyntaxKind.CaseClause:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.DefaultClause:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.ModuleBlock:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.SourceFile:
        return !0;
      default:
        return !1;
    }
  }
  static isStaticable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  }
  static isStringKeyword = tm.is(h.SyntaxKind.StringKeyword);
  static isStringLiteral = tm.is(h.SyntaxKind.StringLiteral);
  static isSuperExpression(e) {
    return e?.getKind() === h.SyntaxKind.SuperKeyword;
  }
  static isSwitchStatement = tm.is(h.SyntaxKind.SwitchStatement);
  static isSymbolKeyword = tm.is(h.SyntaxKind.SymbolKeyword);
  static isSyntaxList = tm.is(h.SyntaxKind.SyntaxList);
  static isTaggedTemplateExpression = tm.is(
    h.SyntaxKind.TaggedTemplateExpression
  );
  static isTemplateExpression = tm.is(h.SyntaxKind.TemplateExpression);
  static isTemplateHead = tm.is(h.SyntaxKind.TemplateHead);
  static isTemplateLiteralTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.TemplateLiteralType;
  }
  static isTemplateMiddle = tm.is(h.SyntaxKind.TemplateMiddle);
  static isTemplateSpan = tm.is(h.SyntaxKind.TemplateSpan);
  static isTemplateTail = tm.is(h.SyntaxKind.TemplateTail);
  static isTextInsertable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.Block:
      case h.SyntaxKind.CaseBlock:
      case h.SyntaxKind.CaseClause:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.DefaultClause:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.SourceFile:
        return !0;
      default:
        return !1;
    }
  }
  static isThisExpression(e) {
    return e?.getKind() === h.SyntaxKind.ThisKeyword;
  }
  static isThisTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.ThisType;
  }
  static isThrowStatement = tm.is(h.SyntaxKind.ThrowStatement);
  static isTrueLiteral(e) {
    return e?.getKind() === h.SyntaxKind.TrueKeyword;
  }
  static isTryStatement = tm.is(h.SyntaxKind.TryStatement);
  static isTupleTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.TupleType;
  }
  static isTypeAliasDeclaration = tm.is(h.SyntaxKind.TypeAliasDeclaration);
  static isTypeArgumented(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ExpressionWithTypeArguments:
      case h.SyntaxKind.ImportType:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.TypeQuery:
      case h.SyntaxKind.TypeReference:
        return !0;
      default:
        return !1;
    }
  }
  static isTypeAssertion(e) {
    return e?.getKind() === h.SyntaxKind.TypeAssertionExpression;
  }
  static isTyped(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.AsExpression:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SatisfiesExpression:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeAssertionExpression:
      case h.SyntaxKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isTypeElement(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.PropertySignature:
        return !0;
      default:
        return !1;
    }
  }
  static isTypeElementMembered(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.TypeLiteral:
        return !0;
      default:
        return !1;
    }
  }
  static isTypeLiteral(e) {
    return e?.getKind() === h.SyntaxKind.TypeLiteral;
  }
  static isTypeNode(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayType:
      case h.SyntaxKind.ConditionalType:
      case h.SyntaxKind.ConstructorType:
      case h.SyntaxKind.ExpressionWithTypeArguments:
      case h.SyntaxKind.FunctionType:
      case h.SyntaxKind.ImportType:
      case h.SyntaxKind.IndexedAccessType:
      case h.SyntaxKind.InferType:
      case h.SyntaxKind.IntersectionType:
      case h.SyntaxKind.JSDocAllType:
      case h.SyntaxKind.JSDocFunctionType:
      case h.SyntaxKind.JSDocNamepathType:
      case h.SyntaxKind.JSDocNonNullableType:
      case h.SyntaxKind.JSDocNullableType:
      case h.SyntaxKind.JSDocOptionalType:
      case h.SyntaxKind.JSDocSignature:
      case h.SyntaxKind.JSDocTypeExpression:
      case h.SyntaxKind.JSDocTypeLiteral:
      case h.SyntaxKind.JSDocUnknownType:
      case h.SyntaxKind.JSDocVariadicType:
      case h.SyntaxKind.LiteralType:
      case h.SyntaxKind.MappedType:
      case h.SyntaxKind.NamedTupleMember:
      case h.SyntaxKind.ParenthesizedType:
      case h.SyntaxKind.RestType:
      case h.SyntaxKind.TemplateLiteralType:
      case h.SyntaxKind.ThisType:
      case h.SyntaxKind.TupleType:
      case h.SyntaxKind.TypeLiteral:
      case h.SyntaxKind.TypeOperator:
      case h.SyntaxKind.TypePredicate:
      case h.SyntaxKind.TypeQuery:
      case h.SyntaxKind.TypeReference:
      case h.SyntaxKind.UnionType:
        return !0;
      default:
        return !1;
    }
  }
  static isTypeOfExpression = tm.is(h.SyntaxKind.TypeOfExpression);
  static isTypeOperatorTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.TypeOperator;
  }
  static isTypeParameterDeclaration(e) {
    return e?.getKind() === h.SyntaxKind.TypeParameter;
  }
  static isTypeParametered(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrowFunction:
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.FunctionType:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.TypeAliasDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isTypePredicate(e) {
    return e?.getKind() === h.SyntaxKind.TypePredicate;
  }
  static isTypeQuery(e) {
    return e?.getKind() === h.SyntaxKind.TypeQuery;
  }
  static isTypeReference(e) {
    return e?.getKind() === h.SyntaxKind.TypeReference;
  }
  static isUnaryExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.AwaitExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.DeleteExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NonNullExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.PostfixUnaryExpression:
      case h.SyntaxKind.PrefixUnaryExpression:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TaggedTemplateExpression:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
      case h.SyntaxKind.TypeAssertionExpression:
      case h.SyntaxKind.TypeOfExpression:
      case h.SyntaxKind.VoidExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isUnaryExpressioned(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.AwaitExpression:
      case h.SyntaxKind.DeleteExpression:
      case h.SyntaxKind.TypeAssertionExpression:
      case h.SyntaxKind.TypeOfExpression:
      case h.SyntaxKind.VoidExpression:
        return !0;
      default:
        return !1;
    }
  }
  static isUndefinedKeyword = tm.is(h.SyntaxKind.UndefinedKeyword);
  static isUnionTypeNode(e) {
    return e?.getKind() === h.SyntaxKind.UnionType;
  }
  static isUnwrappable(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.ModuleDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  static isUpdateExpression(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.ArrayLiteralExpression:
      case h.SyntaxKind.BigIntLiteral:
      case h.SyntaxKind.CallExpression:
      case h.SyntaxKind.ClassExpression:
      case h.SyntaxKind.ElementAccessExpression:
      case h.SyntaxKind.FalseKeyword:
      case h.SyntaxKind.FunctionExpression:
      case h.SyntaxKind.Identifier:
      case h.SyntaxKind.ImportKeyword:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxFragment:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.MetaProperty:
      case h.SyntaxKind.NewExpression:
      case h.SyntaxKind.NonNullExpression:
      case h.SyntaxKind.NoSubstitutionTemplateLiteral:
      case h.SyntaxKind.NullKeyword:
      case h.SyntaxKind.NumericLiteral:
      case h.SyntaxKind.ObjectLiteralExpression:
      case h.SyntaxKind.PropertyAccessExpression:
      case h.SyntaxKind.RegularExpressionLiteral:
      case h.SyntaxKind.StringLiteral:
      case h.SyntaxKind.SuperKeyword:
      case h.SyntaxKind.TaggedTemplateExpression:
      case h.SyntaxKind.TemplateExpression:
      case h.SyntaxKind.ThisKeyword:
      case h.SyntaxKind.TrueKeyword:
        return !0;
      default:
        return !1;
    }
  }
  static isVariableDeclaration = tm.is(h.SyntaxKind.VariableDeclaration);
  static isVariableDeclarationList = tm.is(
    h.SyntaxKind.VariableDeclarationList
  );
  static isVariableStatement = tm.is(h.SyntaxKind.VariableStatement);
  static isVoidExpression = tm.is(h.SyntaxKind.VoidExpression);
  static isWhileStatement = tm.is(h.SyntaxKind.WhileStatement);
  static isWithStatement = tm.is(h.SyntaxKind.WithStatement);
  static isYieldExpression = tm.is(h.SyntaxKind.YieldExpression);
  static _hasStructure(e) {
    switch (e?.getKind()) {
      case h.SyntaxKind.CallSignature:
      case h.SyntaxKind.ClassDeclaration:
      case h.SyntaxKind.ClassStaticBlockDeclaration:
      case h.SyntaxKind.Constructor:
      case h.SyntaxKind.ConstructSignature:
      case h.SyntaxKind.Decorator:
      case h.SyntaxKind.EnumDeclaration:
      case h.SyntaxKind.EnumMember:
      case h.SyntaxKind.ExportAssignment:
      case h.SyntaxKind.ExportDeclaration:
      case h.SyntaxKind.ExportSpecifier:
      case h.SyntaxKind.FunctionDeclaration:
      case h.SyntaxKind.GetAccessor:
      case h.SyntaxKind.ImportAttribute:
      case h.SyntaxKind.ImportDeclaration:
      case h.SyntaxKind.ImportSpecifier:
      case h.SyntaxKind.IndexSignature:
      case h.SyntaxKind.InterfaceDeclaration:
      case h.SyntaxKind.JSDoc:
      case h.SyntaxKind.JsxAttribute:
      case h.SyntaxKind.JsxElement:
      case h.SyntaxKind.JsxNamespacedName:
      case h.SyntaxKind.JsxSelfClosingElement:
      case h.SyntaxKind.JsxSpreadAttribute:
      case h.SyntaxKind.MethodDeclaration:
      case h.SyntaxKind.MethodSignature:
      case h.SyntaxKind.ModuleDeclaration:
      case h.SyntaxKind.Parameter:
      case h.SyntaxKind.PropertyAssignment:
      case h.SyntaxKind.PropertyDeclaration:
      case h.SyntaxKind.PropertySignature:
      case h.SyntaxKind.SetAccessor:
      case h.SyntaxKind.ShorthandPropertyAssignment:
      case h.SyntaxKind.SourceFile:
      case h.SyntaxKind.SpreadAssignment:
      case h.SyntaxKind.TypeAliasDeclaration:
      case h.SyntaxKind.TypeParameter:
      case h.SyntaxKind.VariableDeclaration:
      case h.SyntaxKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  }
}
function th(e, t) {
  return null == t ? void 0 : (n) => t(e._getNodeFromCompilerNode(n));
}
function tg(e, t, n, r) {
  let i = tm.isSourceFile(e)
      ? e.getChildSyntaxListOrThrow()
      : e.getParentSyntaxList() || e.getParentOrThrow(),
    a = J(e._getWriterWithQueuedIndentation(), n);
  if (!/^[\s\r\n]*$/.test(a))
    throw new h.errors.InvalidOperationError(
      `Cannot insert non-whitespace into ${r}.`
    );
  e4({ parent: i, insertPos: t, newText: a });
}
function* ty(e) {
  let t;
  for (let n of ((t = []),
  e.forEachChild((e) => {
    t.push(e);
  }),
  t))
    yield n, yield* ty(n);
}
function* tv(e, t) {
  for (let n of F.getCompilerChildren(e, t)) yield n, yield* tv(n, t);
}
function tb(e, t) {
  return (
    t >= h.SyntaxKind.FirstNode &&
    t < h.SyntaxKind.FirstJSDocNode &&
    ("number" == typeof e ? e : e.compilerNode.kind) !== h.SyntaxKind.SyntaxList
  );
}
(exports.Scope = void 0),
  ((s = exports.Scope || (exports.Scope = {})).Public = "public"),
  (s.Protected = "protected"),
  (s.Private = "private");
class tx extends tm {
  addChildText(e) {
    return this.insertChildText(this.getChildCount(), e);
  }
  insertChildText(e, t) {
    let n = this.getChildCount(),
      r = this._context.manipulationSettings.getNewLineKindAsString(),
      i = this.getParentOrThrow();
    e = eD(e, n);
    let a = this !== i.getChildSyntaxList(),
      o = J(
        a
          ? i._getWriterWithQueuedChildIndentation()
          : i._getWriterWithChildIndentation(),
        t
      );
    return 0 === o.length
      ? []
      : (a
          ? 0 === e
            ? (o += " ")
            : (o = " " + o)
          : 0 === e && tm.isSourceFile(i)
          ? o.endsWith("\n") || (o += r)
          : ((o = r + o),
            !tm.isSourceFile(i) &&
              e === n &&
              o.endsWith("\n") &&
              (o = o.replace(/\r?\n$/, ""))),
        e4({
          insertPos: ex(e, this, this.getChildren()),
          newText: o,
          parent: this,
        }),
        eT(n, this.getChildren(), e, !0));
  }
}
function tS(e, t, n) {
  if ((h.errors.throwIfWhitespaceOrNotString(t, "newName"), e.getText() === t))
    return;
  let r = e._context.languageService.findRenameLocations(e, n),
    i = new h.KeyValueCache();
  for (let e of r) i.getOrCreate(e.getSourceFile(), () => []).push(e);
  for (let [e, n] of i.getEntries())
    !(function (e) {
      let { sourceFile: t, renameLocations: n, newName: r } = e,
        i = new eG();
      e2(
        t,
        new eQ(n, r),
        i.getForTryOrForget(i.getForRename(t._context.compilerFactory))
      );
    })({ sourceFile: e, renameLocations: n, newName: t });
}
function tk(e, t) {
  let n = tu(e._getWriterWithIndentation(), t),
    r = e.getFirstChildByKindOrThrow(h.SyntaxKind.OpenBraceToken),
    i = e.getFirstChildByKindOrThrow(h.SyntaxKind.CloseBraceToken);
  e4({
    insertPos: r.getEnd(),
    newText: n,
    parent: e,
    replacing: { textLength: i.getStart() - r.getEnd() },
  });
}
function tT(e) {
  return class extends e {
    getBody() {
      let e = this.compilerNode.body;
      if (null == e)
        throw new h.errors.InvalidOperationError(
          "Bodied node should have a body."
        );
      return this._getNodeFromCompilerNode(e);
    }
    setBodyText(e) {
      return tk(this.getBody(), e), this;
    }
    getBodyText() {
      return tp(this.getBody());
    }
  };
}
function tE(e) {
  return class extends e {
    getBodyOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getBody(),
        e ?? "Expected to find the node's body.",
        this
      );
    }
    getBody() {
      return this._getNodeFromCompilerNodeIfExists(this.compilerNode.body);
    }
    getBodyText() {
      let e = this.getBody();
      return null == e ? void 0 : tp(e);
    }
    setBodyText(e) {
      return this.addBody(), tk(this.getBodyOrThrow(), e), this;
    }
    hasBody() {
      return null != this.compilerNode.body;
    }
    addBody() {
      if (this.hasBody()) return this;
      let e = this.getLastChildByKind(h.SyntaxKind.SemicolonToken);
      return (
        e4({
          parent: this,
          insertPos: null == e ? this.getEnd() : e.getStart(),
          newText: this._getWriterWithQueuedIndentation()
            .space()
            .block()
            .toString(),
          replacing: { textLength: e?.getFullWidth() ?? 0 },
        }),
        this
      );
    }
    removeBody() {
      let e = this.getBody();
      return (
        null == e ||
          e4({
            parent: this,
            insertPos: e.getPos(),
            newText: ";",
            replacing: { textLength: e.getFullWidth() },
          }),
        this
      );
    }
  };
}
function tC(e) {
  return class extends e {
    setOrder(e) {
      let t = this.getChildIndex(),
        n = this.getParentSyntaxList() || this.getParentSyntaxListOrThrow();
      return (
        h.errors.throwIfOutOfRange(e, [0, n.getChildCount() - 1], "order"),
        t === e ||
          !(function (e) {
            let { parent: t } = e;
            e2(t._sourceFile, new eU(e), new eG().getForChangingChildOrder(e));
          })({
            parent: n,
            getSiblingFormatting: eu,
            oldIndex: t,
            newIndex: e,
          }),
        this
      );
    }
  };
}
function tA(e) {
  return class extends e {
    getDecorator(e) {
      return x(this.getDecorators(), e);
    }
    getDecoratorOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getDecorator(e),
        t ?? (() => k("decorator", e)),
        this
      );
    }
    getDecorators() {
      return tw(this.compilerNode).map((e) => this._getNodeFromCompilerNode(e));
    }
    addDecorator(e) {
      return this.insertDecorator(em(tw(this.compilerNode)), e);
    }
    addDecorators(e) {
      return this.insertDecorators(em(tw(this.compilerNode)), e);
    }
    insertDecorator(e, t) {
      return this.insertDecorators(e, [t])[0];
    }
    insertDecorators(e, t) {
      var n;
      if (h.ArrayUtils.isNullOrEmpty(t)) return [];
      let r = (function (e, t) {
          let n = [];
          for (let r of t) {
            let t = e._getWriter();
            e._context.structurePrinterFactory.forDecorator().printText(t, r),
              n.push(t.toString());
          }
          return n;
        })(this, t),
        i = this.getDecorators();
      e = eD(e, i.length);
      let a =
          ((n = this),
          !(function (e, t) {
            if (1 === t.length) {
              let e = t[0].getPreviousSibling();
              if (null != e && e.getStartLinePos() === t[0].getStartLinePos())
                return !0;
            }
            if (t.length <= 1) return e.getKind() === h.SyntaxKind.Parameter;
            let n = t[0].getStartLinePos();
            for (let e = 1; e < t.length; e++)
              if (t[e].getStartLinePos() !== n) return !1;
            return !0;
          })(n, i)
            ? m.Newline
            : m.Space),
        o = i[e - 1],
        s = (function (e) {
          let {
              structures: t,
              newCodes: n,
              parent: r,
              getSeparator: i,
              previousFormattingKind: a,
              nextFormattingKind: o,
            } = e,
            s = e.indentationText ?? r.getChildIndentationText(),
            l = r._context.manipulationSettings.getNewLineKindAsString();
          return (
            c(a) +
            (function () {
              let e = n[0];
              for (let r = 1; r < n.length; r++)
                (e += c(i(t[r - 1], t[r]))), (e += n[r]);
              return e;
            })() +
            c(o)
          );
          function c(e) {
            let t = (function (e, t) {
              switch (e) {
                case m.Space:
                  return " ";
                case m.Newline:
                  return t.newLineKind;
                case m.Blankline:
                  return t.newLineKind + t.newLineKind;
                case m.None:
                  return "";
                default:
                  throw new h.errors.NotImplementedError(
                    `Not implemented formatting kind: ${e}`
                  );
              }
            })(e, { newLineKind: l });
            return (e === m.Newline || e === m.Blankline) && (t += s), t;
          }
        })({
          structures: t,
          newCodes: r,
          parent: this,
          indentationText: this.getIndentationText(),
          getSeparator: () => a,
          previousFormattingKind: null == o ? m.None : a,
          nextFormattingKind: null == o ? a : m.None,
        });
      return (
        e4({
          parent:
            i[0]?.getParentSyntaxListOrThrow() ??
            this.getModifiers()[0]?.getParentSyntaxListOrThrow() ??
            this,
          insertPos: 0 === e ? (i[0] ?? this).getStart() : i[e - 1].getEnd(),
          newText: s,
        }),
        eT(i, this.getDecorators(), e, !1)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.decorators &&
          (this.getDecorators().forEach((e) => e.remove()),
          this.addDecorators(t.decorators)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        decorators: this.getDecorators().map((e) => e.getStructure()),
      });
    }
  };
}
function tw(e) {
  return h.ts.canHaveDecorators(e) ? h.ts.getDecorators(e) ?? [] : [];
}
function tD(e) {
  return class extends e {
    getDotDotDotTokenOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getDotDotDotToken(),
        e ?? "Expected to find a dot dot dot token (...).",
        this
      );
    }
    getDotDotDotToken() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.dotDotDotToken
      );
    }
  };
}
function tN(e) {
  return class extends e {
    hasExclamationToken() {
      return null != this.compilerNode.exclamationToken;
    }
    getExclamationTokenNode() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.exclamationToken
      );
    }
    getExclamationTokenNodeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getExclamationTokenNode(),
        e ?? "Expected to find an exclamation token.",
        this
      );
    }
    setHasExclamationToken(e) {
      let t = this.getExclamationTokenNode();
      if (e === (null != t)) return this;
      if (e) {
        tm.isQuestionTokenable(this) && this.setHasQuestionToken(!1);
        let e = this.getFirstChildByKind(h.SyntaxKind.ColonToken);
        if (null == e)
          throw new h.errors.InvalidOperationError(
            "Cannot add an exclamation token to a node that does not have a type."
          );
        e4({ insertPos: e.getStart(), parent: this, newText: "!" });
      } else e7({ children: [t] });
      return this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.hasExclamationToken &&
          this.setHasExclamationToken(t.hasExclamationToken),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        hasExclamationToken: this.hasExclamationToken(),
      });
    }
  };
}
function tI(e) {
  return class extends e {
    hasExportKeyword() {
      return null != this.getExportKeyword();
    }
    getExportKeyword() {
      if (tm.isVariableDeclaration(this)) {
        let e = this.getVariableStatement();
        return e?.getExportKeyword();
      }
      return tm.isModifierable(this)
        ? this.getFirstModifierByKind(h.SyntaxKind.ExportKeyword)
        : tP();
    }
    getExportKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getExportKeyword(),
        e ?? "Expected to find an export keyword.",
        this
      );
    }
    hasDefaultKeyword() {
      return null != this.getDefaultKeyword();
    }
    getDefaultKeyword() {
      if (tm.isVariableDeclaration(this)) {
        let e = this.getVariableStatement();
        return e?.getDefaultKeyword();
      }
      return tm.isModifierable(this)
        ? this.getFirstModifierByKind(h.SyntaxKind.DefaultKeyword)
        : tP();
    }
    getDefaultKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getDefaultKeyword(),
        e ?? "Expected to find a default keyword.",
        this
      );
    }
    isExported() {
      if (this.hasExportKeyword()) return !0;
      let e = this.getSymbol(),
        t = this.getSourceFile().getSymbol();
      return (
        null != e &&
        null != t &&
        t.getExports().some((t) => t === e || t.getAliasedSymbol() === e)
      );
    }
    isDefaultExport() {
      if (this.hasDefaultKeyword()) return !0;
      let e = this.getSymbol();
      if (null == e) return !1;
      let t = this.getSourceFile().getDefaultExportSymbol();
      return null != t && (e === t || e === t.getAliasedSymbol());
    }
    isNamedExport() {
      let e,
        t = this.getSymbol(),
        n = this.getSourceFile().getSymbol();
      return (
        null != t &&
        null != n &&
        (null == (e = n.getExport("default")) ||
          (t !== e && t !== e.getAliasedSymbol())) &&
        n.getExports().some((e) => e === t || e.getAliasedSymbol() === t)
      );
    }
  };
}
function tP() {
  throw new h.errors.NotImplementedError(
    "Not implemented situation where node was not a ModifierableNode."
  );
}
function tM(e) {
  var t;
  return (
    (t = tI(e)),
    class extends t {
      setIsDefaultExport(e) {
        if (e === this.isDefaultExport()) return this;
        if (e && !tm.isSourceFile(this.getParentOrThrow()))
          throw new h.errors.InvalidOperationError(
            "The parent must be a source file in order to set this node as a default export."
          );
        let t = this.getSourceFile(),
          n = t.getDefaultExportSymbol();
        if ((null != n && t.removeDefaultExport(n), !e)) return this;
        if (
          tm.hasName(this) &&
          function () {
            return !!(
              tm.isEnumDeclaration(this) ||
              tm.isModuleDeclaration(this) ||
              tm.isTypeAliasDeclaration(this) ||
              (tm.isAmbientable(this) && this.isAmbient())
            );
          }.call(this)
        ) {
          let e = this.getFirstAncestorByKindOrThrow(h.SyntaxKind.SyntaxList),
            t = this.getName();
          e.insertChildText(this.getChildIndex() + 1, (e) => {
            e.newLine().write(`export default ${t};`);
          });
        } else this.addModifier("export"), this.addModifier("default");
        return this;
      }
      setIsExported(e) {
        return (
          tm.isSourceFile(this.getParentOrThrow()) &&
            this.toggleModifier("default", !1),
          this.toggleModifier("export", e),
          this
        );
      }
      set(e) {
        return (
          ea(t.prototype, this, e),
          null != e.isExported && this.setIsExported(e.isExported),
          null != e.isDefaultExport &&
            this.setIsDefaultExport(e.isDefaultExport),
          this
        );
      }
      getStructure() {
        return ei(t.prototype, this, {
          isExported: this.hasExportKeyword(),
          isDefaultExport: this.hasDefaultKeyword(),
        });
      }
    }
  );
}
class tL {
  printTextOrWriterFunc(e, t) {
    "string" == typeof t ? e.write(t) : null != t && t(e);
  }
  getNewWriter(e) {
    return new y.default(e.getOptions());
  }
  getNewWriterWithQueuedChildIndentation(e) {
    let t = new y.default(e.getOptions());
    return t.queueIndentationLevel(1), t;
  }
  getText(e, t) {
    let n = this.getNewWriter(e);
    return this.printTextOrWriterFunc(n, t), n.toString();
  }
  getTextWithQueuedChildIndentation(e, t) {
    let n = this.getNewWriterWithQueuedChildIndentation(e);
    return this.printTextOrWriterFunc(n, t), n.toString();
  }
}
class tR extends tL {
  printText(e, t) {
    let { initializer: n } = t;
    if (null == n) return;
    let r = this.getText(e, n);
    h.StringUtils.isNullOrWhitespace(r) ||
      e.hangingIndent(() => {
        e.spaceIfLastNot(), e.write(`= ${r}`);
      });
  }
}
class tF extends tL {
  printText(e, t) {
    let n = t.scope;
    t.isDefaultExport
      ? e.write("export default ")
      : t.isExported && e.write("export "),
      t.hasDeclareKeyword && e.write("declare "),
      null != n && e.write(`${n} `),
      t.isStatic && e.write("static "),
      t.hasOverrideKeyword && e.write("override "),
      t.isAbstract && e.write("abstract "),
      t.isAsync && e.write("async "),
      t.isReadonly && e.write("readonly "),
      t.hasAccessorKeyword && e.write("accessor ");
  }
}
class tO extends tL {
  #tI;
  constructor(e = !1) {
    super(), (this.#tI = e);
  }
  printText(e, t) {
    let { returnType: n } = t;
    if (null == n && !1 === this.#tI) return;
    n = n ?? "void";
    let r = this.getText(e, n);
    h.StringUtils.isNullOrWhitespace(r) ||
      e.hangingIndent(() => {
        e.write(`: ${r}`);
      });
  }
}
class tB extends tL {
  #tP;
  #tI;
  constructor(e, t = !1) {
    super(), (this.#tI = t), (this.#tP = e);
  }
  printText(e, t) {
    let { type: n } = t;
    if (null == n && !1 === this.#tI) return;
    n = n ?? "any";
    let r = this.getText(e, n);
    h.StringUtils.isNullOrWhitespace(r) ||
      e.hangingIndent(() => {
        e.write(`${this.#tP} ${r}`);
      });
  }
}
class tW extends tL {
  #tM;
  constructor(e) {
    super(), (this.#tM = e);
  }
  printText(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        e.conditionalBlankLine(n > 0), this.#tM.printText(e, t[n]);
  }
}
class tj extends tL {
  #tM;
  constructor(e) {
    super(), (this.#tM = e);
  }
  printText(e, t) {
    tz(this.#tM, e, t, () => e.spaceIfLastNot());
  }
}
function tz(e, t, n, r) {
  if (null != n)
    if (n instanceof Function || "string" == typeof n) e.printText(t, n);
    else {
      let i = Array(n.length);
      for (let a = 0; a < n.length; a++) {
        a > 0 && r();
        let o = n[a],
          s = t.getLength();
        e.printText(t, o);
        let l = ef(er.getLastCharactersToPos(t, s));
        i[a] = -1 !== l && l + s;
      }
      let a = !1;
      for (let e = i.length - 1; e >= 0; e--) {
        let n = i[e];
        !1 !== n && (a ? t.unsafeInsert(n, ",") : (a = !0));
      }
    }
}
class tV extends tL {
  #tM;
  constructor(e) {
    super(), (this.#tM = e);
  }
  printText(e, t) {
    tz(this.#tM, e, t, () => e.newLineIfLastNot());
  }
}
class tG extends tL {
  #tM;
  constructor(e) {
    super(), (this.#tM = e);
  }
  printText(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        e.conditionalNewLine(n > 0), this.#tM.printText(e, t[n]);
  }
}
class tK extends tL {
  #tM;
  constructor(e) {
    super(), (this.#tM = e);
  }
  printText(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        e.conditionalWrite(n > 0, " "), this.#tM.printText(e, t[n]);
  }
}
class tU extends tL {
  factory;
  constructor(e) {
    super(), (this.factory = e);
  }
  printTextWithoutTrivia(e, t) {
    this.printTextInternal(e, t);
  }
  printText(e, t) {
    this.printLeadingTrivia(e, t),
      e.closeComment(),
      this.printTextInternal(e, t),
      this.printTrailingTrivia(e, t);
  }
  printLeadingTrivia(e, t) {
    let n = t?.leadingTrivia;
    n && (this.#tL(e, n), e.isInComment() && e.closeComment());
  }
  printTrailingTrivia(e, t) {
    let n = t?.trailingTrivia;
    null != n && this.#tL(e, n);
  }
  #tL(e, t) {
    if (t instanceof Array)
      for (let n = 0; n < t.length; n++)
        this.printTextOrWriterFunc(e, t[n]),
          n !== t.length - 1 && e.newLineIfLastNot();
    else this.printTextOrWriterFunc(e, t);
  }
}
class tH {
  #tR;
  #tF;
  constructor(e, t) {
    (this.#tR = e), (this.#tF = t);
  }
  printGetAndSet(e, t, n, r) {
    for (let i of ((t = [...(t ?? [])]), (n = [...(n ?? [])]), t)) {
      this.#tO(e, r), this.#tR.printText(e, i);
      let t = n.findIndex((e) => e.name === i.name);
      t >= 0 && (this.#tO(e, r), this.#tF.printText(e, n[t]), n.splice(t, 1));
    }
    for (let t of n) this.#tO(e, r), this.#tF.printText(e, t);
  }
  #tO(e, t) {
    e.isAtStartOfFirstLineOfBlock() || (t ? e.newLine() : e.blankLine());
  }
}
class tq extends tU {
  #l;
  #tB = new tW(this);
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    let n = t.hasDeclareKeyword || this.#l.isAmbient;
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forDecorator().printTexts(e, t.decorators),
      this.#tW(e, t),
      e.inlineBlock(() => {
        this.factory.forPropertyDeclaration().printTexts(e, t.properties),
          this.#tj(e, t),
          this.#tz(e, t, n),
          this.#tV(e, t, n),
          h.ArrayUtils.isNullOrEmpty(t.methods) ||
            (this.#tO(e, n),
            this.factory
              .forMethodDeclaration({ isAmbient: n })
              .printTexts(e, t.methods));
      });
  }
  #tW(e, t) {
    this.factory.forModifierableNode().printText(e, t),
      e.write("class"),
      h.StringUtils.isNullOrWhitespace(t.name) || e.space().write(t.name),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      e.space(),
      e.hangingIndent(() => {
        if (null != t.extends) {
          let n = this.getText(e, t.extends);
          h.StringUtils.isNullOrWhitespace(n) || e.write(`extends ${n} `);
        }
        if (null != t.implements) {
          let n =
            t.implements instanceof Array
              ? t.implements.map((t) => this.getText(e, t)).join(", ")
              : this.getText(e, t.implements);
          h.StringUtils.isNullOrWhitespace(n) || e.write(`implements ${n} `);
        }
      });
  }
  #tz(e, t, n) {
    if (!h.ArrayUtils.isNullOrEmpty(t.ctors))
      for (let r of t.ctors)
        this.#tO(e, n),
          this.factory
            .forConstructorDeclaration({ isAmbient: n })
            .printText(e, r);
  }
  #tj(e, t) {
    if (!h.ArrayUtils.isNullOrEmpty(t.staticBlocks))
      for (let n of t.staticBlocks)
        this.#tO(e, !1),
          this.factory.forClassStaticBlockDeclaration().printText(e, n);
  }
  #tV(e, t, n) {
    (null == t.getAccessors && null == t.setAccessors) ||
      new tH(
        this.factory.forGetAccessorDeclaration({ isAmbient: n }),
        this.factory.forSetAccessorDeclaration({ isAmbient: n })
      ).printGetAndSet(e, t.getAccessors, t.setAccessors, n);
  }
  #tO(e, t) {
    e.isAtStartOfFirstLineOfBlock() || (t ? e.newLine() : e.blankLine());
  }
}
(exports.StructureKind = void 0),
  ((l = exports.StructureKind || (exports.StructureKind = {}))[
    (l.ImportAttribute = 0)
  ] = "ImportAttribute"),
  (l[(l.CallSignature = 1)] = "CallSignature"),
  (l[(l.Class = 2)] = "Class"),
  (l[(l.ClassStaticBlock = 3)] = "ClassStaticBlock"),
  (l[(l.ConstructSignature = 4)] = "ConstructSignature"),
  (l[(l.Constructor = 5)] = "Constructor"),
  (l[(l.ConstructorOverload = 6)] = "ConstructorOverload"),
  (l[(l.Decorator = 7)] = "Decorator"),
  (l[(l.Enum = 8)] = "Enum"),
  (l[(l.EnumMember = 9)] = "EnumMember"),
  (l[(l.ExportAssignment = 10)] = "ExportAssignment"),
  (l[(l.ExportDeclaration = 11)] = "ExportDeclaration"),
  (l[(l.ExportSpecifier = 12)] = "ExportSpecifier"),
  (l[(l.Function = 13)] = "Function"),
  (l[(l.FunctionOverload = 14)] = "FunctionOverload"),
  (l[(l.GetAccessor = 15)] = "GetAccessor"),
  (l[(l.ImportDeclaration = 16)] = "ImportDeclaration"),
  (l[(l.ImportSpecifier = 17)] = "ImportSpecifier"),
  (l[(l.IndexSignature = 18)] = "IndexSignature"),
  (l[(l.Interface = 19)] = "Interface"),
  (l[(l.JsxAttribute = 20)] = "JsxAttribute"),
  (l[(l.JsxSpreadAttribute = 21)] = "JsxSpreadAttribute"),
  (l[(l.JsxElement = 22)] = "JsxElement"),
  (l[(l.JsxSelfClosingElement = 23)] = "JsxSelfClosingElement"),
  (l[(l.JSDoc = 24)] = "JSDoc"),
  (l[(l.JSDocTag = 25)] = "JSDocTag"),
  (l[(l.Method = 26)] = "Method"),
  (l[(l.MethodOverload = 27)] = "MethodOverload"),
  (l[(l.MethodSignature = 28)] = "MethodSignature"),
  (l[(l.Module = 29)] = "Module"),
  (l[(l.Parameter = 30)] = "Parameter"),
  (l[(l.Property = 31)] = "Property"),
  (l[(l.PropertyAssignment = 32)] = "PropertyAssignment"),
  (l[(l.PropertySignature = 33)] = "PropertySignature"),
  (l[(l.SetAccessor = 34)] = "SetAccessor"),
  (l[(l.ShorthandPropertyAssignment = 35)] = "ShorthandPropertyAssignment"),
  (l[(l.SourceFile = 36)] = "SourceFile"),
  (l[(l.SpreadAssignment = 37)] = "SpreadAssignment"),
  (l[(l.TypeAlias = 38)] = "TypeAlias"),
  (l[(l.TypeParameter = 39)] = "TypeParameter"),
  (l[(l.VariableDeclaration = 40)] = "VariableDeclaration"),
  (l[(l.VariableStatement = 41)] = "VariableStatement");
let tJ = {
  hasName: (e) => "string" == typeof e.name,
  isCallSignature: (e) => e?.kind === exports.StructureKind.CallSignature,
  isJSDocable(e) {
    switch (e?.kind) {
      case exports.StructureKind.CallSignature:
      case exports.StructureKind.Class:
      case exports.StructureKind.ClassStaticBlock:
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.ConstructSignature:
      case exports.StructureKind.Enum:
      case exports.StructureKind.EnumMember:
      case exports.StructureKind.ExportAssignment:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.IndexSignature:
      case exports.StructureKind.Interface:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.Module:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
      case exports.StructureKind.SetAccessor:
      case exports.StructureKind.TypeAlias:
      case exports.StructureKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  },
  isSignatured(e) {
    switch (e?.kind) {
      case exports.StructureKind.CallSignature:
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.ConstructSignature:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isParametered(e) {
    switch (e?.kind) {
      case exports.StructureKind.CallSignature:
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.ConstructSignature:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isReturnTyped(e) {
    switch (e?.kind) {
      case exports.StructureKind.CallSignature:
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.ConstructSignature:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.IndexSignature:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isTypeParametered(e) {
    switch (e?.kind) {
      case exports.StructureKind.CallSignature:
      case exports.StructureKind.Class:
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.ConstructSignature:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.Interface:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.SetAccessor:
      case exports.StructureKind.TypeAlias:
        return !0;
      default:
        return !1;
    }
  },
  isClass: (e) => e?.kind === exports.StructureKind.Class,
  isClassLikeDeclarationBase: (e) => e?.kind === exports.StructureKind.Class,
  isNameable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Class:
      case exports.StructureKind.Function:
        return !0;
      default:
        return !1;
    }
  },
  isImplementsClauseable: (e) => e?.kind === exports.StructureKind.Class,
  isDecoratable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Class:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.Method:
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isAbstractable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Class:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.Property:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isAmbientable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Class:
      case exports.StructureKind.Enum:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.Interface:
      case exports.StructureKind.Module:
      case exports.StructureKind.Property:
      case exports.StructureKind.TypeAlias:
      case exports.StructureKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  },
  isExportable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Class:
      case exports.StructureKind.Enum:
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.Interface:
      case exports.StructureKind.Module:
      case exports.StructureKind.TypeAlias:
      case exports.StructureKind.VariableStatement:
        return !0;
      default:
        return !1;
    }
  },
  isClassStaticBlock: (e) => e?.kind === exports.StructureKind.ClassStaticBlock,
  isStatemented(e) {
    switch (e?.kind) {
      case exports.StructureKind.ClassStaticBlock:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.Method:
      case exports.StructureKind.Module:
      case exports.StructureKind.SetAccessor:
      case exports.StructureKind.SourceFile:
        return !0;
      default:
        return !1;
    }
  },
  isConstructorDeclarationOverload: (e) =>
    e?.kind === exports.StructureKind.ConstructorOverload,
  isScoped(e) {
    switch (e?.kind) {
      case exports.StructureKind.ConstructorOverload:
      case exports.StructureKind.Constructor:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.Property:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isConstructor: (e) => e?.kind === exports.StructureKind.Constructor,
  isFunctionLike(e) {
    switch (e?.kind) {
      case exports.StructureKind.Constructor:
      case exports.StructureKind.Function:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.Method:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isConstructSignature: (e) =>
    e?.kind === exports.StructureKind.ConstructSignature,
  isDecorator: (e) => e?.kind === exports.StructureKind.Decorator,
  isEnum: (e) => e?.kind === exports.StructureKind.Enum,
  isNamed(e) {
    switch (e?.kind) {
      case exports.StructureKind.Enum:
      case exports.StructureKind.Interface:
      case exports.StructureKind.ShorthandPropertyAssignment:
      case exports.StructureKind.TypeAlias:
      case exports.StructureKind.TypeParameter:
        return !0;
      default:
        return !1;
    }
  },
  isEnumMember: (e) => e?.kind === exports.StructureKind.EnumMember,
  isPropertyNamed(e) {
    switch (e?.kind) {
      case exports.StructureKind.EnumMember:
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.PropertyAssignment:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isInitializerExpressionable(e) {
    switch (e?.kind) {
      case exports.StructureKind.EnumMember:
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
      case exports.StructureKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  },
  isExportAssignment: (e) => e?.kind === exports.StructureKind.ExportAssignment,
  isExportDeclaration: (e) =>
    e?.kind === exports.StructureKind.ExportDeclaration,
  isExportSpecifier: (e) => e?.kind === exports.StructureKind.ExportSpecifier,
  isFunctionDeclarationOverload: (e) =>
    e?.kind === exports.StructureKind.FunctionOverload,
  isAsyncable(e) {
    switch (e?.kind) {
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
        return !0;
      default:
        return !1;
    }
  },
  isGeneratorable(e) {
    switch (e?.kind) {
      case exports.StructureKind.FunctionOverload:
      case exports.StructureKind.Function:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
        return !0;
      default:
        return !1;
    }
  },
  isFunction: (e) => e?.kind === exports.StructureKind.Function,
  isGetAccessor: (e) => e?.kind === exports.StructureKind.GetAccessor,
  isStaticable(e) {
    switch (e?.kind) {
      case exports.StructureKind.GetAccessor:
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.Property:
      case exports.StructureKind.SetAccessor:
        return !0;
      default:
        return !1;
    }
  },
  isImportAttribute: (e) => e?.kind === exports.StructureKind.ImportAttribute,
  isImportAttributeNamed: (e) =>
    e?.kind === exports.StructureKind.ImportAttribute,
  isImportDeclaration: (e) =>
    e?.kind === exports.StructureKind.ImportDeclaration,
  isImportSpecifier: (e) => e?.kind === exports.StructureKind.ImportSpecifier,
  isIndexSignature: (e) => e?.kind === exports.StructureKind.IndexSignature,
  isReadonlyable(e) {
    switch (e?.kind) {
      case exports.StructureKind.IndexSignature:
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
        return !0;
      default:
        return !1;
    }
  },
  isInterface: (e) => e?.kind === exports.StructureKind.Interface,
  isExtendsClauseable: (e) => e?.kind === exports.StructureKind.Interface,
  isTypeElementMembered: (e) => e?.kind === exports.StructureKind.Interface,
  isJSDoc: (e) => e?.kind === exports.StructureKind.JSDoc,
  isJSDocTag: (e) => e?.kind === exports.StructureKind.JSDocTag,
  isJsxAttribute: (e) => e?.kind === exports.StructureKind.JsxAttribute,
  isJsxElement: (e) => e?.kind === exports.StructureKind.JsxElement,
  isJsxSelfClosingElement: (e) =>
    e?.kind === exports.StructureKind.JsxSelfClosingElement,
  isJsxTagNamed: (e) => e?.kind === exports.StructureKind.JsxSelfClosingElement,
  isJsxAttributed: (e) =>
    e?.kind === exports.StructureKind.JsxSelfClosingElement,
  isJsxSpreadAttribute: (e) =>
    e?.kind === exports.StructureKind.JsxSpreadAttribute,
  isMethodDeclarationOverload: (e) =>
    e?.kind === exports.StructureKind.MethodOverload,
  isQuestionTokenable(e) {
    switch (e?.kind) {
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.MethodSignature:
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
        return !0;
      default:
        return !1;
    }
  },
  isOverrideable(e) {
    switch (e?.kind) {
      case exports.StructureKind.MethodOverload:
      case exports.StructureKind.Method:
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
        return !0;
      default:
        return !1;
    }
  },
  isMethod: (e) => e?.kind === exports.StructureKind.Method,
  isMethodSignature: (e) => e?.kind === exports.StructureKind.MethodSignature,
  isModule: (e) => e?.kind === exports.StructureKind.Module,
  isModuleNamed: (e) => e?.kind === exports.StructureKind.Module,
  isParameter: (e) => e?.kind === exports.StructureKind.Parameter,
  isBindingNamed(e) {
    switch (e?.kind) {
      case exports.StructureKind.Parameter:
      case exports.StructureKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  },
  isTyped(e) {
    switch (e?.kind) {
      case exports.StructureKind.Parameter:
      case exports.StructureKind.Property:
      case exports.StructureKind.PropertySignature:
      case exports.StructureKind.TypeAlias:
      case exports.StructureKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  },
  isScopeable: (e) => e?.kind === exports.StructureKind.Parameter,
  isPropertyAssignment: (e) =>
    e?.kind === exports.StructureKind.PropertyAssignment,
  isProperty: (e) => e?.kind === exports.StructureKind.Property,
  isExclamationTokenable(e) {
    switch (e?.kind) {
      case exports.StructureKind.Property:
      case exports.StructureKind.VariableDeclaration:
        return !0;
      default:
        return !1;
    }
  },
  isPropertySignature: (e) =>
    e?.kind === exports.StructureKind.PropertySignature,
  isSetAccessor: (e) => e?.kind === exports.StructureKind.SetAccessor,
  isShorthandPropertyAssignment: (e) =>
    e?.kind === exports.StructureKind.ShorthandPropertyAssignment,
  isSourceFile: (e) => e?.kind === exports.StructureKind.SourceFile,
  isSpreadAssignment: (e) => e?.kind === exports.StructureKind.SpreadAssignment,
  isExpressioned: (e) => e?.kind === exports.StructureKind.SpreadAssignment,
  isTypeAlias: (e) => e?.kind === exports.StructureKind.TypeAlias,
  isTypeParameter: (e) => e?.kind === exports.StructureKind.TypeParameter,
  isVariableDeclaration: (e) =>
    e?.kind === exports.StructureKind.VariableDeclaration,
  isVariableStatement: (e) =>
    e?.kind === exports.StructureKind.VariableStatement,
};
function t$(e, t) {
  return t2(e.docs, t, exports.StructureKind.JSDoc);
}
function tX(e, t) {
  return t1(e.parameters, t, exports.StructureKind.Parameter);
}
function tY(e, t) {
  return t2(e.typeParameters, t, exports.StructureKind.TypeParameter);
}
function tQ(e, t) {
  return t1(e.decorators, t, exports.StructureKind.Decorator);
}
function tZ(e, t) {
  return t4(e.statements, t);
}
function t0(e, t) {
  return tX(e, t) || tY(e, t) || t$(e, t) || tZ(e, t);
}
function t1(e, t, n) {
  if (null != e)
    for (let r of e) {
      let e = t(t3(r, n));
      if (e) return e;
    }
}
function t2(e, t, n) {
  if (null != e && e instanceof Array) {
    for (let r of e)
      if (t6(r)) {
        let e = t(t3(r, n));
        if (e) return e;
      }
  }
}
function t4(e, t) {
  if (null != e && e instanceof Array) {
    for (let n of e)
      if (t6(n)) {
        let e = t(n);
        if (e) return e;
      }
  }
}
function t3(e, t) {
  return null == e.kind && (e.kind = t), e;
}
function t6(e) {
  return null != e && "number" == typeof e.kind;
}
function t8(e) {
  return (
    e.iterateLastCharCodes(
      (e) => 125 === e || (!!h.StringUtils.isWhitespaceCharCode(e) && void 0)
    ) || !1
  );
}
class t5 extends tL {
  #l;
  #tG;
  constructor(e, t) {
    super(), (this.#tG = e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      if ("string" == typeof t || t instanceof Function) this.printText(e, t);
      else
        for (let n of t)
          t8(e)
            ? e.blankLineIfLastNot()
            : e.isAtStartOfFirstLineOfBlock() || e.newLineIfLastNot(),
            this.printText(e, n);
  }
  printText(e, t) {
    if ("string" == typeof t || t instanceof Function || null == t)
      return void this.printTextOrWriterFunc(e, t);
    switch (t.kind) {
      case exports.StructureKind.Method:
        this.#l.isAmbient || r(),
          this.#tG.forMethodDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.Property:
        this.#tG.forPropertyDeclaration().printText(e, t);
        break;
      case exports.StructureKind.GetAccessor:
        this.#l.isAmbient || r(),
          this.#tG.forGetAccessorDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.SetAccessor:
        this.#l.isAmbient || r(),
          this.#tG.forSetAccessorDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.Constructor:
        this.#l.isAmbient || r(),
          this.#tG.forConstructorDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.ClassStaticBlock:
        r(), this.#tG.forClassStaticBlockDeclaration().printText(e, t);
        break;
      default:
        h.errors.throwNotImplementedForNeverValueError(t);
    }
    function r() {
      e.isAtStartOfFirstLineOfBlock() || e.blankLineIfLastNot();
    }
  }
}
class t7 extends tU {
  constructor(e) {
    super(e);
  }
  printTexts(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        n > 0 && e.blankLine(), this.printText(e, t[n]);
  }
  printTextInternal(e, t) {
    e.write("static"),
      e.space().inlineBlock(() => {
        this.factory.forStatementedNode({ isAmbient: !1 }).printText(e, t);
      });
  }
}
class t9 extends tU {
  #l;
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        n > 0 && (this.#l.isAmbient ? e.newLine() : e.blankLine()),
          this.printText(e, t[n]);
  }
  printTextInternal(e, t) {
    this.#tK(
      e,
      (function () {
        let e = h.ObjectUtils.clone(t.overloads);
        if (null != e && 0 !== e.length) {
          for (let n of e) H(n, "scope", t.scope);
          return e;
        }
      })()
    ),
      this.#tW(e, t),
      this.#l.isAmbient
        ? e.write(";")
        : e.space().inlineBlock(() => {
            this.factory.forStatementedNode(this.#l).printText(e, t);
          });
  }
  #tK(e, t) {
    if (null != t && 0 !== t.length)
      for (let n of t) this.printOverload(e, n), e.newLine();
  }
  printOverload(e, t) {
    this.printLeadingTrivia(e, t),
      this.#tW(e, t),
      e.write(";"),
      this.printTrailingTrivia(e, t);
  }
  #tW(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.write("constructor"),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters);
  }
}
class ne extends tU {
  #l;
  #tB;
  constructor(e, t) {
    super(e),
      (this.#l = t),
      (this.#tB = this.#l.isAmbient ? new tG(this) : new tW(this));
  }
  printTexts(e, t) {
    null != t && this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forDecorator().printTexts(e, t.decorators),
      this.factory.forModifierableNode().printText(e, t),
      e.write(`get ${t.name}`),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters),
      this.factory.forReturnTypedNode().printText(e, t),
      this.#l.isAmbient || t.isAbstract
        ? e.write(";")
        : e.spaceIfLastNot().inlineBlock(() => {
            this.factory.forStatementedNode(this.#l).printText(e, t);
          });
  }
}
class nt extends tU {
  #l;
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        n > 0 && (this.#l.isAmbient ? e.newLine() : e.blankLine()),
          this.printText(e, t[n]);
  }
  printTextInternal(e, t) {
    this.#tK(
      e,
      t.name,
      (function () {
        let e = h.ObjectUtils.clone(t.overloads);
        if (null != e && 0 !== e.length) {
          for (let n of e)
            H(n, "scope", t.scope),
              H(n, "isStatic", t.isStatic),
              H(n, "isAbstract", t.isAbstract),
              H(n, "hasQuestionToken", t.hasQuestionToken);
          return e;
        }
      })()
    ),
      this.#tW(e, t.name, t),
      this.#l.isAmbient || t.isAbstract
        ? e.write(";")
        : e.spaceIfLastNot().inlineBlock(() => {
            this.factory.forStatementedNode(this.#l).printText(e, t);
          });
  }
  #tK(e, t, n) {
    if (null != n && 0 !== n.length)
      for (let r of n) this.printOverload(e, t, r), e.newLine();
  }
  printOverload(e, t, n) {
    this.printLeadingTrivia(e, n),
      this.#tW(e, t, n),
      e.write(";"),
      this.printTrailingTrivia(e, n);
  }
  #tW(e, t, n) {
    this.factory.forJSDoc().printDocs(e, n.docs),
      null != n.decorators &&
        this.factory.forDecorator().printTexts(e, n.decorators),
      this.factory.forModifierableNode().printText(e, n),
      e.conditionalWrite(n.isGenerator, "*"),
      e.write(t),
      e.conditionalWrite(n.hasQuestionToken, "?"),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, n.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, n.parameters),
      this.factory.forReturnTypedNode().printText(e, n);
  }
}
class nn extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forDecorator().printTexts(e, t.decorators),
      this.factory.forModifierableNode().printText(e, t),
      e.write(t.name),
      e.conditionalWrite(t.hasQuestionToken, "?"),
      e.conditionalWrite(t.hasExclamationToken && !t.hasQuestionToken, "!"),
      this.factory.forTypedNode(":").printText(e, t),
      this.factory.forInitializerExpressionableNode().printText(e, t),
      e.write(";");
  }
}
class nr extends tU {
  #l;
  #tB;
  constructor(e, t) {
    super(e),
      (this.#l = t),
      (this.#tB = this.#l.isAmbient ? new tG(this) : new tW(this));
  }
  printTexts(e, t) {
    null != t && this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forDecorator().printTexts(e, t.decorators),
      this.factory.forModifierableNode().printText(e, t),
      e.write(`set ${t.name}`),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters),
      this.factory.forReturnTypedNode().printText(e, t),
      this.#l.isAmbient || t.isAbstract
        ? e.write(";")
        : e.spaceIfLastNot().inlineBlock(() => {
            this.factory.forStatementedNode(this.#l).printText(e, t);
          });
  }
}
class ni extends tL {
  printText(e, t) {
    "string" == typeof t ? e.write(t) : t(e);
  }
}
class na extends tU {
  printTexts(e, t) {
    this.#tU(e, t, () => e.newLine());
  }
  printTextsInline(e, t) {
    this.#tU(e, t, () => e.space());
  }
  printTextInternal(e, t) {
    e.write(`@${t.name}`), this.#tH(e, t), this.#tq(e, t);
  }
  #tH(e, t) {
    if (null != t.typeArguments && 0 !== t.typeArguments.length) {
      e.write("<");
      for (let n = 0; n < t.typeArguments.length; n++)
        e.conditionalWrite(n > 0, ", "),
          e.write(
            this.getTextWithQueuedChildIndentation(e, t.typeArguments[n])
          );
      e.write(">");
    }
  }
  #tq(e, t) {
    if (null == t.arguments) return;
    e.write("(");
    let n = t.arguments instanceof Array ? t.arguments : [t.arguments];
    for (let t = 0; t < n.length; t++)
      e.conditionalWrite(t > 0, ", "),
        e.write(this.getTextWithQueuedChildIndentation(e, n[t]));
    e.write(")");
  }
  #tU(e, t, n) {
    if (null != t && 0 !== t.length) for (let r of t) this.printText(e, r), n();
  }
}
class no extends tU {
  printDocs(e, t) {
    if (null != t) for (let n of t) this.printText(e, n), e.newLine();
  }
  printTextInternal(e, t) {
    let n = (function (n) {
        if ("string" == typeof t) return t;
        let r = n.getNewWriter(e);
        return (
          "function" == typeof t
            ? t(r)
            : (t.description && $(r, t.description),
              t.tags &&
                t.tags.length > 0 &&
                (r.getLength() > 0 && r.newLine(),
                n.factory
                  .forJSDocTag({ printStarsOnNewLine: !1 })
                  .printTexts(r, t.tags))),
          r.toString()
        );
      })(this).split(/\r?\n/),
      r = 0 === n[0].length,
      i = n.length <= 1,
      a = +!!r;
    if ((e.write("/**"), i ? e.space() : e.newLine(), i)) e.write(n[a]);
    else
      for (let t = a; t < n.length; t++)
        e.write(" *"), n[t].length > 0 && e.write(` ${n[t]}`), e.newLine();
    e.spaceIfLastNot(), e.write("*/");
  }
}
class ns extends tU {
  #l;
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++)
        n > 0 &&
          (e.newLine(), e.conditionalWrite(this.#l.printStarsOnNewLine, " * ")),
          this.printText(e, t[n]);
  }
  printTextInternal(e, t) {
    let n = (function (n) {
      if ("string" == typeof t) return t;
      let r = n.getNewWriter(e);
      if ("function" == typeof t) t(r);
      else {
        t.text && $(r, t.text);
        let e = r.toString();
        r.unsafeInsert(
          0,
          `@${t.tagName}` +
            (e.length > 0 && !h.StringUtils.startsWithNewLine(e) ? " " : "")
        );
      }
      return r.toString();
    })(this).split(/\r?\n/);
    for (let t = 0; t < n.length; t++)
      t > 0 && (e.newLine(), this.#l.printStarsOnNewLine && e.write(" *")),
        n[t].length > 0 &&
          (this.#l.printStarsOnNewLine && t > 0 && e.space(), e.write(n[t]));
  }
}
class nl extends tU {
  #tB = new tW(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.conditionalWrite(t.isConst, "const "),
      e.write(`enum ${t.name} `).inlineBlock(() => {
        this.factory.forEnumMember().printTexts(e, t.members);
      });
  }
}
class nc extends tU {
  #tB = new tV(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    if (t instanceof Function) return void t(e);
    if ("string" == typeof t) return void e.write(t);
    if (
      (this.factory.forJSDoc().printDocs(e, t.docs),
      ee(t.name) || h.StringUtils.isQuoted(t.name)
        ? e.write(t.name)
        : e.quote(t.name),
      "string" == typeof t.value)
    ) {
      let { value: n } = t;
      e.hangingIndent(() => e.write(" = ").quote(n));
    } else
      "number" == typeof t.value
        ? e.write(` = ${t.value}`)
        : this.factory.forInitializerExpressionableNode().printText(e, t);
  }
}
class nd extends tL {
  #tG;
  #tB = new tV(this);
  #l = { isAmbient: !1 };
  constructor(e) {
    super(), (this.#tG = e);
  }
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printText(e, t) {
    if ("string" == typeof t || t instanceof Function || null == t)
      return void this.printTextOrWriterFunc(e, t);
    switch (t.kind) {
      case exports.StructureKind.PropertyAssignment:
        this.#tG.forPropertyAssignment().printText(e, t);
        break;
      case exports.StructureKind.ShorthandPropertyAssignment:
        this.#tG.forShorthandPropertyAssignment().printText(e, t);
        break;
      case exports.StructureKind.SpreadAssignment:
        this.#tG.forSpreadAssignment().printText(e, t);
        break;
      case exports.StructureKind.Method:
        this.#tG.forMethodDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.GetAccessor:
        this.#tG.forGetAccessorDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.SetAccessor:
        this.#tG.forSetAccessorDeclaration(this.#l).printText(e, t);
        break;
      default:
        h.errors.throwNotImplementedForNeverValueError(t);
    }
  }
}
class nu extends tU {
  printTextInternal(e, t) {
    e.hangingIndent(() => {
      e.write(`${t.name}: `), $(e, t.initializer);
    });
  }
}
class np extends tU {
  printTextInternal(e, t) {
    e.write(`${t.name}`);
  }
}
class n_ extends tU {
  printTextInternal(e, t) {
    e.hangingIndent(() => {
      e.write("..."), $(e, t.expression);
    });
  }
}
class nf extends tU {
  #l;
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      for (let n = 0; n < t.length; n++) {
        let r = t[n];
        if (n > 0) {
          let i = t[n - 1];
          this.#l.isAmbient || (i.hasDeclareKeyword && r.hasDeclareKeyword)
            ? e.newLine()
            : e.blankLine();
        }
        this.printText(e, r);
      }
  }
  printTextInternal(e, t) {
    this.#tK(
      e,
      t.name,
      (function () {
        let e = h.ObjectUtils.clone(t.overloads);
        if (null != e && 0 !== e.length) {
          for (let n of e)
            H(n, "hasDeclareKeyword", t.hasDeclareKeyword),
              H(n, "isExported", t.isExported),
              H(n, "isDefaultExport", t.isDefaultExport);
          return e;
        }
      })()
    ),
      this.#tW(e, t.name, t),
      this.#l.isAmbient || t.hasDeclareKeyword
        ? e.write(";")
        : e.space().inlineBlock(() => {
            this.factory.forStatementedNode({ isAmbient: !1 }).printText(e, t);
          });
  }
  #tK(e, t, n) {
    if (null != n && 0 !== n.length)
      for (let r of n) this.printOverload(e, t, r), e.newLine();
  }
  printOverload(e, t, n) {
    this.printLeadingTrivia(e, n),
      this.#tW(e, t, n),
      e.write(";"),
      this.printTrailingTrivia(e, n);
  }
  #tW(e, t, n) {
    this.factory.forJSDoc().printDocs(e, n.docs),
      this.factory.forModifierableNode().printText(e, n),
      e.write("function"),
      e.conditionalWrite(n.isGenerator, "*"),
      h.StringUtils.isNullOrWhitespace(t) || e.write(` ${t}`),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, n.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, n.parameters),
      this.factory.forReturnTypedNode().printText(e, n);
  }
}
class nm extends tU {
  #tB = new tj(this);
  printTextsWithParenthesis(e, t) {
    e.write("("),
      null != t && this.factory.forParameterDeclaration().printTexts(e, t),
      e.write(")");
  }
  printTexts(e, t) {
    null != t &&
      0 !== t.length &&
      e.hangingIndent(() => {
        this.#tB.printText(e, t);
      });
  }
  printTextInternal(e, t) {
    if (null == t.name)
      throw new h.errors.NotImplementedError(
        "Not implemented scenario where parameter declaration structure doesn't have a name. Please open an issue if you need this."
      );
    this.factory.forDecorator().printTextsInline(e, t.decorators),
      this.factory.forModifierableNode().printText(e, t),
      e.conditionalWrite(t.isRestParameter, "..."),
      e.write(t.name),
      e.conditionalWrite(t.hasQuestionToken, "?"),
      this.factory.forTypedNode(":", t.hasQuestionToken).printText(e, t),
      this.factory.forInitializerExpressionableNode().printText(e, t);
  }
}
class nh extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters),
      this.factory.forReturnTypedNode(!0).printText(e, t),
      e.write(";");
  }
}
class ng extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      e.write("new"),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters),
      this.factory.forReturnTypedNode().printText(e, t),
      e.write(";");
  }
}
class ny extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.write(`[${t.keyName || "key"}: ${t.keyType || "string"}]`),
      this.factory.forReturnTypedNode().printText(e, t),
      e.write(";");
  }
}
class nv extends tU {
  #tB = new tW(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    if (
      (this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.write(`interface ${t.name}`),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      e.space(),
      null != t.extends)
    ) {
      let n =
        t.extends instanceof Array
          ? t.extends.map((t) => this.getText(e, t)).join(", ")
          : this.getText(e, t.extends);
      h.StringUtils.isNullOrWhitespace(n) ||
        e.hangingIndent(() => e.write(`extends ${n} `));
    }
    e.inlineBlock(() => {
      this.factory.forTypeElementMemberedNode().printText(e, t);
    });
  }
}
class nb extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      e.write(t.name),
      e.conditionalWrite(t.hasQuestionToken, "?"),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory
        .forParameterDeclaration()
        .printTextsWithParenthesis(e, t.parameters),
      this.factory.forReturnTypedNode().printText(e, t),
      e.write(";");
  }
}
class nx extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.write(t.name),
      e.conditionalWrite(t.hasQuestionToken, "?"),
      this.factory.forTypedNode(":").printText(e, t),
      this.factory.forInitializerExpressionableNode().printText(e, t),
      e.write(";");
  }
}
class nS extends tL {
  #tG;
  constructor(e) {
    super(), (this.#tG = e);
  }
  printText(e, t) {
    this.#tG.forCallSignatureDeclaration().printTexts(e, t.callSignatures),
      this.#tO(e, t.constructSignatures),
      this.#tG
        .forConstructSignatureDeclaration()
        .printTexts(e, t.constructSignatures),
      this.#tO(e, t.indexSignatures),
      this.#tG.forIndexSignatureDeclaration().printTexts(e, t.indexSignatures),
      this.#tV(e, t),
      this.#tO(e, t.properties),
      this.#tG.forPropertySignature().printTexts(e, t.properties),
      this.#tO(e, t.methods),
      this.#tG.forMethodSignature().printTexts(e, t.methods);
  }
  #tV(e, t) {
    (null == t.getAccessors && null == t.setAccessors) ||
      new tH(
        this.#tG.forGetAccessorDeclaration({ isAmbient: !0 }),
        this.#tG.forSetAccessorDeclaration({ isAmbient: !0 })
      ).printGetAndSet(e, t.getAccessors, t.setAccessors, !0);
  }
  #tO(e, t) {
    h.ArrayUtils.isNullOrEmpty(t) ||
      e.isAtStartOfFirstLineOfBlock() ||
      e.newLine();
  }
}
class nk extends tL {
  #tG;
  constructor(e) {
    super(), (this.#tG = e);
  }
  printTexts(e, t) {
    if (null != t)
      if ("string" == typeof t || t instanceof Function) this.printText(e, t);
      else
        for (let n of t)
          t8(e)
            ? e.blankLineIfLastNot()
            : e.isAtStartOfFirstLineOfBlock() || e.newLineIfLastNot(),
            this.printText(e, n);
  }
  printText(e, t) {
    if ("string" == typeof t || t instanceof Function || null == t)
      return void this.printTextOrWriterFunc(e, t);
    switch (t.kind) {
      case exports.StructureKind.PropertySignature:
        this.#tG.forPropertySignature().printText(e, t);
        break;
      case exports.StructureKind.MethodSignature:
        this.#tG.forMethodSignature().printText(e, t);
        break;
      case exports.StructureKind.CallSignature:
        this.#tG.forCallSignatureDeclaration().printText(e, t);
        break;
      case exports.StructureKind.IndexSignature:
        this.#tG.forIndexSignatureDeclaration().printText(e, t);
        break;
      case exports.StructureKind.ConstructSignature:
        this.#tG.forConstructSignatureDeclaration().printText(e, t);
        break;
      default:
        h.errors.throwNotImplementedForNeverValueError(t);
    }
  }
}
class nT extends tU {
  printTextInternal(e, t) {
    if (null == t.kind || t.kind === exports.StructureKind.JsxAttribute)
      this.factory.forJsxAttribute().printTextWithoutTrivia(e, t);
    else if (t.kind === exports.StructureKind.JsxSpreadAttribute)
      this.factory.forJsxSpreadAttribute().printTextWithoutTrivia(e, t);
    else throw h.errors.throwNotImplementedForNeverValueError(t);
  }
}
class nE extends tU {
  printTextInternal(e, t) {
    "object" == typeof t.name
      ? this.factory.forJsxNamespacedName().printText(e, t.name)
      : e.write(t.name),
      null != t.initializer && e.write("=").write(t.initializer);
  }
}
class nC extends tU {
  printTextInternal(e, t) {
    var r;
    null == (r = t).kind || r.kind === exports.StructureKind.JsxElement
      ? this.factory.forJsxElement().printText(e, t)
      : t.kind === exports.StructureKind.JsxSelfClosingElement
      ? this.factory.forJsxSelfClosingElement().printText(e, t)
      : h.errors.throwNotImplementedForNeverValueError(t);
  }
}
class nA extends tU {
  printTextInternal(e, t) {
    e.hangingIndent(() => {
      e.write(`<${t.name}`),
        t.attributes && this.#tJ(e, t.attributes),
        e.write(">");
    }),
      this.#t$(e, t.children),
      e.write(`</${t.name}>`);
  }
  #tJ(e, t) {
    let n = this.factory.forJsxAttributeDecider();
    for (let r of t) e.space(), n.printText(e, r);
  }
  #t$(e, t) {
    null != t &&
      (e.newLine(),
      e.indent(() => {
        for (let n of t)
          this.factory.forJsxChildDecider().printText(e, n), e.newLine();
      }));
  }
}
class nw extends tU {
  printTextInternal(e, t) {
    e.write(t.namespace).write(":").write(t.name);
  }
}
class nD extends tU {
  printTextInternal(e, t) {
    e.hangingIndent(() => {
      e.write(`<${t.name}`),
        t.attributes && this.#tJ(e, t.attributes),
        e.write(" />");
    });
  }
  #tJ(e, t) {
    let n = this.factory.forJsxAttributeDecider();
    for (let r of t) e.space(), n.printText(e, r);
  }
}
class nN extends tU {
  printTextInternal(e, t) {
    e.hangingIndent(() => {
      e.write("{"), e.write("..."), e.write(t.expression), e.write("}");
    });
  }
}
class nI extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      e.write("export"),
      !1 !== t.isExportEquals ? e.write(" = ") : e.write(" default "),
      e
        .write(this.getTextWithQueuedChildIndentation(e, t.expression))
        .write(";");
  }
}
class nP extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    let n = null != t.moduleSpecifier && t.moduleSpecifier.length > 0;
    if (
      null != t.namedExports &&
      t.namedExports.length > 0 &&
      null != t.namespaceExport
    )
      throw new h.errors.InvalidOperationError(
        "An export declaration cannot have both a namespace export and a named export."
      );
    e.write("export"),
      t.isTypeOnly && e.write(" type"),
      null != t.namedExports && t.namedExports.length > 0
        ? (e.space(),
          this.factory
            .forNamedImportExportSpecifier()
            .printTextsWithBraces(e, t.namedExports))
        : null != t.namespaceExport
        ? (e.write(" *"),
          h.StringUtils.isNullOrWhitespace(t.namespaceExport) ||
            e.write(` as ${t.namespaceExport}`))
        : n
        ? e.write(" *")
        : e
            .write(" {")
            .conditionalWrite(
              this.factory.getFormatCodeSettings()
                .insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces,
              " "
            )
            .write("}"),
      n && (e.write(" from "), e.quote(t.moduleSpecifier)),
      t.attributes &&
        (e.space(),
        this.factory.forImportAttribute().printAttributes(e, t.attributes)),
      e.write(";");
  }
}
class nM extends tU {
  #tB = new tV(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printAttributes(e, t) {
    t &&
      (e.write("with "),
      e.inlineBlock(() => {
        this.printTexts(e, t);
      }));
  }
  printTextInternal(e, t) {
    e.write(t.name), e.write(": "), e.quote(t.value);
  }
}
class nL extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    let n = null != t.namedImports && t.namedImports.length > 0;
    if (n && null != t.namespaceImport)
      throw new h.errors.InvalidOperationError(
        "An import declaration cannot have both a namespace import and a named import."
      );
    e.write("import"),
      t.isTypeOnly && e.write(" type"),
      null != t.defaultImport &&
        (e.write(` ${t.defaultImport}`),
        e.conditionalWrite(n || null != t.namespaceImport, ",")),
      null != t.namespaceImport && e.write(` * as ${t.namespaceImport}`),
      null != t.namedImports &&
        t.namedImports.length > 0 &&
        (e.space(),
        this.factory
          .forNamedImportExportSpecifier()
          .printTextsWithBraces(e, t.namedImports)),
      e.conditionalWrite(
        null != t.defaultImport || n || null != t.namespaceImport,
        " from"
      ),
      e.write(" "),
      e.quote(t.moduleSpecifier),
      t.attributes &&
        (e.space(),
        this.factory.forImportAttribute().printAttributes(e, t.attributes)),
      e.write(";");
  }
}
class nR extends tU {
  #l;
  #tX = new tW(this);
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTexts(e, t) {
    this.#tX.printText(e, t);
  }
  printTextInternal(e, t) {
    (t = this.#tY(t)),
      this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      null == t.declarationKind ||
      t.declarationKind !== exports.ModuleDeclarationKind.Global
        ? e.write(`${t.declarationKind || "namespace"} ${t.name}`)
        : e.write("global"),
      t.hasDeclareKeyword &&
      h.StringUtils.isQuoted(t.name.trim()) &&
      t.hasOwnProperty(h.nameof(t, "statements")) &&
      null == t.statements
        ? e.write(";")
        : (e.write(" "),
          e.inlineBlock(() => {
            this.factory
              .forStatementedNode({
                isAmbient: t.hasDeclareKeyword || this.#l.isAmbient,
              })
              .printText(e, t);
          }));
  }
  #tY(e) {
    if (h.StringUtils.isQuoted(e.name.trim())) {
      if (e.declarationKind === exports.ModuleDeclarationKind.Namespace)
        throw new h.errors.InvalidOperationError(
          `Cannot print a namespace with quotes for namespace with name ${e.name}. Use ModuleDeclarationKind.Module instead.`
        );
      H((e = h.ObjectUtils.clone(e)), "hasDeclareKeyword", !0),
        H(e, "declarationKind", exports.ModuleDeclarationKind.Module);
    }
    return e;
  }
}
class nF extends tU {
  #tB = new tj(this);
  printTextsWithBraces(e, t) {
    let n = this.factory.getFormatCodeSettings();
    e.write("{");
    let r = this.getNewWriter(e);
    this.printTexts(r, t);
    let i = r.toString();
    n.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces &&
      !h.StringUtils.startsWithNewLine(i) &&
      e.space(),
      e.write(i),
      n.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces &&
        !h.StringUtils.endsWithNewLine(i) &&
        e.space(),
      e.write("}");
  }
  printTexts(e, t) {
    t instanceof Function ? this.printText(e, t) : this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    let n = this.getNewWriterWithQueuedChildIndentation(e);
    "string" == typeof t
      ? n.write(t)
      : t instanceof Function
      ? t(n)
      : (t.isTypeOnly && e.write("type "),
        n.write(t.name),
        h.StringUtils.isNullOrWhitespace(t.alias) ||
          (n.isLastNewLine() || n.space(), n.write(`as ${t.alias}`))),
      e.write(n.toString());
  }
}
class nO extends tU {
  #l;
  constructor(e, t) {
    super(e), (this.#l = t);
  }
  printTextInternal(e, t) {
    this.factory.forStatementedNode(this.#l).printText(e, t),
      e.conditionalNewLine(
        !e.isAtStartOfFirstLineOfBlock() && !e.isLastNewLine()
      );
  }
}
class nB extends tL {
  #l;
  #tG;
  constructor(e, t) {
    super(), (this.#tG = e), (this.#l = t);
  }
  printText(e, t) {
    this.#tG.forStatement(this.#l).printTexts(e, t.statements);
  }
}
class nW extends tL {
  #l;
  #tG;
  constructor(e, t) {
    super(), (this.#tG = e), (this.#l = t);
  }
  printTexts(e, t) {
    if (null != t)
      if ("string" == typeof t || t instanceof Function) this.printText(e, t);
      else
        for (let n of t)
          t8(e)
            ? e.blankLineIfLastNot()
            : e.isAtStartOfFirstLineOfBlock() || e.newLineIfLastNot(),
            this.printText(e, n);
  }
  printText(e, t) {
    if ("string" == typeof t || t instanceof Function || null == t)
      return void this.printTextOrWriterFunc(e, t);
    switch (t.kind) {
      case exports.StructureKind.Function:
        this.#l.isAmbient || r(),
          this.#tG.forFunctionDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.Class:
        r(), this.#tG.forClassDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.Interface:
        r(), this.#tG.forInterfaceDeclaration().printText(e, t);
        break;
      case exports.StructureKind.TypeAlias:
        this.#tG.forTypeAliasDeclaration().printText(e, t);
        break;
      case exports.StructureKind.VariableStatement:
        this.#tG.forVariableStatement().printText(e, t);
        break;
      case exports.StructureKind.ImportDeclaration:
        this.#tG.forImportDeclaration().printText(e, t);
        break;
      case exports.StructureKind.Module:
        r(), this.#tG.forModuleDeclaration(this.#l).printText(e, t);
        break;
      case exports.StructureKind.Enum:
        r(), this.#tG.forEnumDeclaration().printText(e, t);
        break;
      case exports.StructureKind.ExportDeclaration:
        this.#tG.forExportDeclaration().printText(e, t);
        break;
      case exports.StructureKind.ExportAssignment:
        this.#tG.forExportAssignment().printText(e, t);
        break;
      default:
        h.errors.throwNotImplementedForNeverValueError(t);
    }
    function r() {
      e.isAtStartOfFirstLineOfBlock() || e.blankLineIfLastNot();
    }
  }
}
(exports.VariableDeclarationKind = void 0),
  ((c =
    exports.VariableDeclarationKind ||
    (exports.VariableDeclarationKind = {})).Var = "var"),
  (c.Let = "let"),
  (c.Const = "const"),
  (c.AwaitUsing = "await using"),
  (c.Using = "using");
class nj extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      e.hangingIndent(() => {
        if (
          (this.factory.forModifierableNode().printText(e, t),
          e.write(
            `${t.declarationKind || exports.VariableDeclarationKind.Let} `
          ),
          0 === t.declarations.length)
        )
          throw Error(
            "You must provide at least one declaration when inserting a variable statement."
          );
        this.factory.forVariableDeclaration().printTexts(e, t.declarations),
          e.write(";");
      });
  }
}
class nz extends tU {
  #tB = new tG(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    this.factory.forJSDoc().printDocs(e, t.docs),
      this.factory.forModifierableNode().printText(e, t),
      e.write(`type ${t.name}`),
      this.factory
        .forTypeParameterDeclaration()
        .printTextsWithBrackets(e, t.typeParameters),
      this.factory.forTypedNode(" =").printText(e, t),
      e.write(";");
  }
}
class nV extends tU {
  #tB = new tj(this);
  printTextsWithBrackets(e, t) {
    null != t &&
      0 !== t.length &&
      (e.write("<"), this.printTexts(e, t), e.write(">"));
  }
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    "string" == typeof t
      ? e.write(t)
      : e.hangingIndent(() => {
          if (
            (t.isConst && e.write("const "),
            null != t.variance &&
              ((t.variance & exports.TypeParameterVariance.In) != 0 &&
                e.write("in "),
              (t.variance & exports.TypeParameterVariance.Out) != 0 &&
                e.write("out ")),
            e.write(t.name),
            null != t.constraint)
          ) {
            let n = this.getText(e, t.constraint);
            h.StringUtils.isNullOrWhitespace(n) || e.write(` extends ${n}`);
          }
          if (null != t.default) {
            let n = this.getText(e, t.default);
            h.StringUtils.isNullOrWhitespace(n) || e.write(` = ${n}`);
          }
        });
  }
}
class nG extends tU {
  #tB = new tj(this);
  printTexts(e, t) {
    this.#tB.printText(e, t);
  }
  printTextInternal(e, t) {
    e.write(t.name),
      e.conditionalWrite(t.hasExclamationToken, "!"),
      this.factory.forTypedNode(":").printText(e, t),
      this.factory.forInitializerExpressionableNode().printText(e, t);
  }
}
function nK(e) {
  return class extends e {
    getExtends() {
      let e = this.getHeritageClauseByKind(h.SyntaxKind.ExtendsKeyword);
      return e?.getTypeNodes() ?? [];
    }
    addExtends(e) {
      return this.insertExtends(this.getExtends().length, e);
    }
    insertExtends(e, t) {
      let n = this.getExtends(),
        r = "string" == typeof t;
      if ("string" == typeof t)
        h.errors.throwIfWhitespaceOrNotString(t, "texts"), (t = [t]);
      else if (0 === t.length) return [];
      let i = this._getWriterWithQueuedChildIndentation();
      if (
        (new tj(new ni()).printText(i, t), (e = eD(e, n.length)), n.length > 0)
      )
        e3({
          parent: this.getHeritageClauseByKindOrThrow(
            h.SyntaxKind.ExtendsKeyword
          ).getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
          currentNodes: n,
          insertIndex: e,
          newText: i.toString(),
          useTrailingCommas: !1,
        });
      else {
        let e = this.getFirstChildByKindOrThrow(
            h.SyntaxKind.OpenBraceToken
          ).getStart(),
          t = /\s/.test(this.getSourceFile().getFullText()[e - 1]),
          n = `extends ${i.toString()} `;
        t || (n = " " + n), e4({ parent: this, insertPos: e, newText: n });
      }
      let a = this.getExtends();
      return r ? a[e] : eT(n, a, e, !1);
    }
    removeExtends(e) {
      let t = this.getHeritageClauseByKind(h.SyntaxKind.ExtendsKeyword);
      if (null == t)
        throw new h.errors.InvalidOperationError(
          "Cannot remove an extends when none exist."
        );
      return t.removeExpression(e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.extends &&
          (this.getExtends().forEach((e) => this.removeExtends(e)),
          this.addExtends(t.extends)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        extends: this.getExtends().map((e) => e.getText()),
      });
    }
  };
}
function nU(e) {
  return class extends e {
    isGenerator() {
      return null != this.compilerNode.asteriskToken;
    }
    getAsteriskToken() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.asteriskToken
      );
    }
    getAsteriskTokenOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getAsteriskToken(),
        e ?? "Expected to find an asterisk token.",
        this
      );
    }
    setIsGenerator(e) {
      let t = this.getAsteriskToken();
      return (
        (null != t) === e ||
          (null == t
            ? e4({
                insertPos: (function (e) {
                  if (e.getKind() === h.SyntaxKind.FunctionDeclaration)
                    return e
                      .getFirstChildByKindOrThrow(h.SyntaxKind.FunctionKeyword)
                      .getEnd();
                  if (null == e.getName)
                    throw new h.errors.NotImplementedError(
                      "Expected a name node for a non-function declaration."
                    );
                  return e.getNameNode().getStart();
                })(this),
                parent: this,
                newText: "*",
              })
            : e9({ children: [t], getSiblingFormatting: () => m.Space })),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isGenerator && this.setIsGenerator(t.isGenerator),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { isGenerator: this.isGenerator() });
    }
  };
}
function nH(e) {
  return class extends e {
    getHeritageClauses() {
      let e = this.compilerNode.heritageClauses;
      return e?.map((e) => this._getNodeFromCompilerNode(e)) ?? [];
    }
    getHeritageClauseByKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getHeritageClauseByKind(e),
        t ??
          (() =>
            `Expected to have heritage clause of kind ${h.getSyntaxKindName(
              e
            )}.`),
        this
      );
    }
    getHeritageClauseByKind(e) {
      return this.getHeritageClauses().find((t) => t.compilerNode.token === e);
    }
  };
}
function nq(e) {
  return class extends e {
    getImplements() {
      let e = this.getHeritageClauseByKind(h.SyntaxKind.ImplementsKeyword);
      return e?.getTypeNodes() ?? [];
    }
    addImplements(e) {
      return this.insertImplements(this.getImplements().length, e);
    }
    insertImplements(e, t) {
      let n = this.getImplements(),
        r = "string" == typeof t;
      if ("string" == typeof t)
        h.errors.throwIfWhitespaceOrNotString(t, "texts"), (t = [t]);
      else if (0 === t.length) return [];
      let i = this._getWriterWithQueuedChildIndentation();
      new tj(new ni()).printText(i, t);
      let a = this.getHeritageClauses();
      if (((e = eD(e, n.length)), n.length > 0))
        e3({
          parent: this.getHeritageClauseByKindOrThrow(
            h.SyntaxKind.ImplementsKeyword
          ).getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
          currentNodes: n,
          insertIndex: e,
          newText: i.toString(),
          useTrailingCommas: !1,
        });
      else {
        let e = this.getFirstChildByKindOrThrow(
            h.SyntaxKind.OpenBraceToken
          ).getStart(),
          t = /\s/.test(this.getSourceFile().getFullText()[e - 1]),
          n = `implements ${i.toString()} `;
        t || (n = " " + n),
          e4({
            parent: 0 === a.length ? this : a[0].getParentSyntaxListOrThrow(),
            insertPos: e,
            newText: n,
          });
      }
      let o = this.getImplements();
      return r ? o[0] : eT(n, o, e, !1);
    }
    removeImplements(e) {
      let t = this.getHeritageClauseByKind(h.SyntaxKind.ImplementsKeyword);
      if (null == t)
        throw new h.errors.InvalidOperationError(
          "Cannot remove an implements when none exist."
        );
      return t.removeExpression(e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.implements &&
          (this.getImplements().forEach((e) => this.removeImplements(e)),
          this.addImplements(t.implements)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        implements: this.getImplements().map((e) => e.getText()),
      });
    }
  };
}
function nJ(e) {
  return class extends e {
    hasInitializer() {
      return null != this.compilerNode.initializer;
    }
    getInitializerIfKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getInitializerIfKind(e),
        t ??
          `Expected to find an initializer of kind '${h.getSyntaxKindName(
            e
          )}'.`,
        this
      );
    }
    getInitializerIfKind(e) {
      let t = this.getInitializer();
      if (null == t || t.getKind() === e) return t;
    }
    getInitializerOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getInitializer(),
        e ?? "Expected to find an initializer.",
        this
      );
    }
    getInitializer() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.initializer
      );
    }
  };
}
function n$(e) {
  var t;
  return (
    (t = nJ(e)),
    class extends t {
      removeInitializer() {
        let e = this.getInitializer();
        return (
          null == e ||
            e7({
              children: [
                e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.EqualsToken),
                e,
              ],
              removePrecedingSpaces: !0,
            }),
          this
        );
      }
      setInitializer(e) {
        let t = J(this._getWriterWithQueuedChildIndentation(), e);
        h.errors.throwIfWhitespaceOrNotString(t, "textOrWriterFunction"),
          this.hasInitializer() && this.removeInitializer();
        let n = this.getLastChildIfKind(h.SyntaxKind.SemicolonToken);
        return (
          e4({
            insertPos: null != n ? n.getPos() : this.getEnd(),
            parent: this,
            newText: ` = ${t}`,
          }),
          this
        );
      }
      set(e) {
        return (
          ea(t.prototype, this, e),
          null != e.initializer
            ? this.setInitializer(e.initializer)
            : e.hasOwnProperty(h.nameof(e, "initializer")) &&
              this.removeInitializer(),
          this
        );
      }
      getStructure() {
        let e = this.getInitializer();
        return ei(t.prototype, this, {
          initializer: e ? e.getText() : void 0,
        });
      }
    }
  );
}
function nX(e) {
  return class extends e {
    getJsDocs() {
      let e = this.compilerNode.jsDoc;
      return e?.map((e) => this._getNodeFromCompilerNode(e)) ?? [];
    }
    addJsDoc(e) {
      return this.addJsDocs([e])[0];
    }
    addJsDocs(e) {
      return this.insertJsDocs(em(this.compilerNode.jsDoc), e);
    }
    insertJsDoc(e, t) {
      return this.insertJsDocs(e, [t])[0];
    }
    insertJsDocs(e, t) {
      if (h.ArrayUtils.isNullOrEmpty(t)) return [];
      let n = this._getWriterWithQueuedIndentation();
      this._context.structurePrinterFactory.forJSDoc().printDocs(n, t),
        n.write("");
      let r = n.toString(),
        i = this.getJsDocs();
      return (
        e4({
          insertPos:
            (e = eD(e, i.length)) === i.length
              ? this.getStart()
              : i[e].getStart(),
          parent: this,
          newText: r,
        }),
        eT(i, this.getJsDocs(), e, !1)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.docs &&
          (this.getJsDocs().forEach((e) => e.remove()), this.addJsDocs(t.docs)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        docs: this.getJsDocs().map((e) => e.getStructure()),
      });
    }
  };
}
function nY(e) {
  return class extends e {
    getLiteralText() {
      return this.compilerNode.text;
    }
    isTerminated() {
      return !this.compilerNode.isUnterminated;
    }
    hasExtendedUnicodeEscape() {
      return this.compilerNode.hasExtendedUnicodeEscape || !1;
    }
  };
}
function nQ(e) {
  return class extends e {
    getModifiers() {
      return this.getCompilerModifiers().map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    getFirstModifierByKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getFirstModifierByKind(e),
        t ??
          (() =>
            `Expected a modifier of syntax kind: ${h.getSyntaxKindName(e)}`),
        this
      );
    }
    getFirstModifierByKind(e) {
      for (let t of this.getCompilerModifiers())
        if (t.kind === e) return this._getNodeFromCompilerNode(t);
    }
    hasModifier(e) {
      return "string" == typeof e
        ? this.getModifiers().some((t) => t.getText() === e)
        : this.getCompilerModifiers().some((t) => t.kind === e);
    }
    toggleModifier(e, t) {
      return (
        null == t && (t = !this.hasModifier(e)),
        t ? this.addModifier(e) : this.removeModifier(e),
        this
      );
    }
    addModifier(e) {
      let t,
        n,
        r = this.getModifiers(),
        i = this.getModifiers().filter(
          (e) => e.getKind() !== h.SyntaxKind.Decorator
        ),
        a = i.find((t) => t.getText() === e);
      if (null != a) return a;
      let o = (function (t) {
        let n = (function () {
          if (i.length > 0) return i[0].getStart();
          if (t.getKind() === h.SyntaxKind.ArrowFunction) return t.getStart();
          for (let e of t._getChildrenIterator())
            if (
              !(
                e.getKind() === h.SyntaxKind.SyntaxList ||
                h.ts.isJSDocCommentContainingNode(e.compilerNode)
              )
            )
              return e.getStart();
          return t.getStart();
        })();
        for (let t of (function (e) {
          switch (e) {
            case "export":
            case "public":
            case "protected":
            case "private":
              return [];
            case "default":
            case "const":
              return ["export"];
            case "declare":
              return ["export", "default"];
            case "static":
              return ["public", "protected", "private"];
            case "override":
              return ["public", "private", "protected", "static"];
            case "abstract":
              return [
                "export",
                "default",
                "declare",
                "public",
                "private",
                "protected",
                "static",
                "override",
              ];
            case "async":
            case "readonly":
              return [
                "export",
                "default",
                "declare",
                "public",
                "private",
                "protected",
                "static",
                "override",
                "abstract",
              ];
            case "out":
              return ["const", "in"];
            case "in":
              return ["const"];
            case "accessor":
              return [
                "public",
                "private",
                "protected",
                "declare",
                "override",
                "static",
                "abstract",
                "readonly",
              ];
            default:
              h.errors.throwNotImplementedForNeverValueError(e);
          }
        })(e))
          for (let e = 0; e < i.length; e++) {
            let r = i[e];
            if (r.getText() === t) {
              n < r.getEnd() && (n = r.getEnd());
              break;
            }
          }
        return n;
      })(this);
      return (
        0 === i.length || o === i[0].getStart()
          ? ((n = e + " "), (t = o))
          : ((n = " " + e), (t = o + 1)),
        e4({
          parent: 0 === r.length ? this : r[0].getParentSyntaxListOrThrow(),
          insertPos: o,
          newText: n,
        }),
        this.getModifiers().find((e) => e.getStart() === t)
      );
    }
    removeModifier(e) {
      let t = this.getModifiers(),
        n = t.find((t) => t.getText() === e);
      return (
        null != n &&
        (e7({
          children: [1 === t.length ? n.getParentSyntaxListOrThrow() : n],
          removeFollowingSpaces: !0,
        }),
        !0)
      );
    }
    getCompilerModifiers() {
      return this.compilerNode.modifiers ?? [];
    }
  };
}
function nZ(e) {
  return class extends e {
    addImportDeclaration(e) {
      return this.addImportDeclarations([e])[0];
    }
    addImportDeclarations(e) {
      let t = this._getCompilerStatementsWithComments();
      return this.insertImportDeclarations(
        (function () {
          let e = 0,
            n = !0;
          for (let r = 0; r < t.length; r++) {
            let i = t[r];
            n && i.kind === h.SyntaxKind.MultiLineCommentTrivia
              ? (e = r + 1)
              : ((n = !1),
                i.kind === h.SyntaxKind.ImportDeclaration && (e = r + 1));
          }
          return e;
        })(),
        e
      );
    }
    insertImportDeclaration(e, t) {
      return this.insertImportDeclarations(e, [t])[0];
    }
    insertImportDeclarations(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.ImportDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forImportDeclaration()
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) =>
                tm.isImportDeclaration(e) || B(e.compilerNode),
              nextNewLine: (e) => tm.isImportDeclaration(e),
            }
          );
        },
      });
    }
    getImportDeclaration(e) {
      return this.getImportDeclarations().find(
        "string" == typeof e ? (t) => t.getModuleSpecifierValue() === e : e
      );
    }
    getImportDeclarationOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getImportDeclaration(e),
        t ?? "Expected to find an import with the provided condition.",
        this
      );
    }
    getImportDeclarations() {
      return this.getStatements().filter(tm.isImportDeclaration);
    }
    addExportDeclaration(e) {
      return this.addExportDeclarations([e])[0];
    }
    addExportDeclarations(e) {
      return this.insertExportDeclarations(
        this.getChildSyntaxListOrThrow().getChildCount(),
        e
      );
    }
    insertExportDeclaration(e, t) {
      return this.insertExportDeclarations(e, [t])[0];
    }
    insertExportDeclarations(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.ExportDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forExportDeclaration()
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) =>
                tm.isExportDeclaration(e) || B(e.compilerNode),
              nextNewLine: (e) => tm.isExportDeclaration(e),
            }
          );
        },
      });
    }
    getExportDeclaration(e) {
      return this.getExportDeclarations().find(
        "string" == typeof e ? (t) => t.getModuleSpecifierValue() === e : e
      );
    }
    getExportDeclarationOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getExportDeclaration(e),
        t ??
          "Expected to find an export declaration with the provided condition.",
        this
      );
    }
    getExportDeclarations() {
      return this.getStatements().filter(tm.isExportDeclaration);
    }
    addExportAssignment(e) {
      return this.addExportAssignments([e])[0];
    }
    addExportAssignments(e) {
      return this.insertExportAssignments(
        this.getChildSyntaxListOrThrow().getChildCount(),
        e
      );
    }
    insertExportAssignment(e, t) {
      return this.insertExportAssignments(e, [t])[0];
    }
    insertExportAssignments(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.ExportAssignment,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forExportAssignment()
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) =>
                tm.isExportAssignment(e) || B(e.compilerNode),
              nextNewLine: (e) => tm.isExportAssignment(e),
            }
          );
        },
      });
    }
    getExportAssignment(e) {
      return this.getExportAssignments().find(e);
    }
    getExportAssignmentOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getExportAssignment(e),
        t ??
          "Expected to find an export assignment with the provided condition.",
        this
      );
    }
    getExportAssignments() {
      return this.getStatements().filter(tm.isExportAssignment);
    }
    getDefaultExportSymbol() {
      let e = this.getSymbol();
      if (null != e) return e.getExport("default");
    }
    getDefaultExportSymbolOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getDefaultExportSymbol(),
        e ?? "Expected to find a default export symbol"
      );
    }
    getExportSymbols() {
      let e = this.getSymbol();
      return null == e ? [] : this._context.typeChecker.getExportsOfModule(e);
    }
    getExportedDeclarations() {
      let e = new Map();
      for (let t of this.getExportSymbols())
        for (let n of t.getDeclarations()) {
          let r = Array.from(
              (function* e(t) {
                if (tm.isExportSpecifier(t))
                  for (let n of t.getLocalTargetDeclarations()) yield* e(n);
                else if (tm.isExportAssignment(t)) {
                  let e = t.getExpression();
                  if (null == e || e.getKind() !== h.SyntaxKind.Identifier)
                    return void (yield e);
                  yield* n(e.getSymbol());
                } else if (tm.isImportSpecifier(t)) {
                  let e = t.getNameNode().getSymbol();
                  if (null == e) return;
                  yield* n(e.getAliasedSymbol() || e);
                } else if (tm.isImportClause(t)) {
                  let e = t.getDefaultImport();
                  if (null == e) return;
                  let r = e.getSymbol();
                  if (null == r) return;
                  yield* n(r.getAliasedSymbol() || r);
                } else if (tm.isNamespaceImport(t) || tm.isNamespaceExport(t)) {
                  let e = t.getNameNode().getSymbol();
                  if (null == e) return;
                  yield* n(e.getAliasedSymbol() || e);
                } else yield t;
                function* n(t) {
                  if (null != t) for (let n of t.getDeclarations()) yield* e(n);
                }
              })(n)
            ),
            i = t.getName(),
            a = e.get(i);
          null != a ? a.push(...r) : e.set(t.getName(), r);
        }
      return e;
    }
    removeDefaultExport(e) {
      if (null == (e = e || this.getDefaultExportSymbol())) return this;
      let t = e.getDeclarations()[0];
      return (
        t.compilerNode.kind === h.SyntaxKind.ExportAssignment
          ? e9({ children: [t], getSiblingFormatting: () => m.Newline })
          : tm.isModifierable(t) &&
            (t.toggleModifier("default", !1), t.toggleModifier("export", !1)),
        this
      );
    }
  };
}
function n0(e) {
  return class extends e {
    getNameNode() {
      return this._getNodeFromCompilerNode(this.compilerNode.name);
    }
    getName() {
      return this.getNameNode().getText();
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.name && this.getNameNode().replaceWithText(t.name),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { name: this.getName() });
    }
  };
}
function n1(e) {
  return class extends e {
    findReferences() {
      return this._context.languageService.findReferences(n2(this));
    }
    findReferencesAsNodes() {
      return this._context.languageService.findReferencesAsNodes(n2(this));
    }
  };
}
function n2(e) {
  if (tm.isIdentifier(e) || tm.isStringLiteral(e)) return e;
  let t = e.getNodeProperty("name");
  return null != t ? t : (tm.isExportable(e) && e.getDefaultKeyword()) || e;
}
function n4(e) {
  return class extends e {
    rename(e, t) {
      return (
        tS(
          (function (e) {
            if (
              tm.isIdentifier(e) ||
              tm.isPrivateIdentifier(e) ||
              tm.isStringLiteral(e)
            )
              return e;
            if (null != e.getNameNode) {
              let t = e.getNameNode();
              if (
                (h.errors.throwIfNullOrUndefined(
                  t,
                  "Expected to find a name node when renaming."
                ),
                tm.isArrayBindingPattern(t) || tm.isObjectBindingPattern(t))
              )
                throw new h.errors.NotImplementedError(
                  `Not implemented renameable scenario for ${t.getKindName()}.`
                );
              return t;
            }
            throw new h.errors.NotImplementedError(
              `Not implemented renameable scenario for ${e.getKindName()}`
            );
          })(this),
          e,
          t
        ),
        this
      );
    }
  };
}
function n3(e) {
  return n0(n1(n4(e)));
}
function n6(e) {
  return n0(n1(n4(e)));
}
function n8(e) {
  return n0(n1(n4(e)));
}
function n5(e) {
  var t;
  return (
    (t = n1(n4(e))),
    class extends t {
      getNameNode() {
        return this._getNodeFromCompilerNodeIfExists(this.compilerNode.name);
      }
      getNameNodeOrThrow(e) {
        return h.errors.throwIfNullOrUndefined(
          this.getNameNode(),
          e ?? "Expected to have a name node.",
          this
        );
      }
      getName() {
        return this.getNameNode()?.getText() ?? void 0;
      }
      getNameOrThrow(e) {
        return h.errors.throwIfNullOrUndefined(
          this.getName(),
          e ?? "Expected to have a name.",
          this
        );
      }
      rename(e) {
        return (
          e === this.getName() ||
            (h.StringUtils.isNullOrWhitespace(e)
              ? this.removeName()
              : null == this.getNameNode()
              ? n7(this, e)
              : t.prototype.rename.call(this, e)),
          this
        );
      }
      removeName() {
        let e = this.getNameNode();
        return (
          null == e || e7({ children: [e], removePrecedingSpaces: !0 }), this
        );
      }
      set(e) {
        if ((ea(t.prototype, this, e), null != e.name)) {
          h.errors.throwIfWhitespaceOrNotString(e.name, "structure.name");
          let t = this.getNameNode();
          null == t ? n7(this, e.name) : t.replaceWithText(e.name);
        } else e.hasOwnProperty(h.nameof(e, "name")) && this.removeName();
        return this;
      }
      getStructure() {
        return ei(t.prototype, this, { name: this.getName() });
      }
    }
  );
}
function n7(e, t) {
  tm.isClassDeclaration(e) || tm.isClassExpression(e)
    ? e4({
        insertPos: e
          .getFirstChildByKindOrThrow(h.SyntaxKind.ClassKeyword)
          .getEnd(),
        newText: " " + t,
        parent: e,
      })
    : e4({
        insertPos: e
          .getFirstChildByKindOrThrow(h.SyntaxKind.OpenParenToken)
          .getStart(),
        newText: " " + t,
        parent: e,
      });
}
function n9(e) {
  return n0(n4(n1(e)));
}
function re(e) {
  return n0(n1(n4(e)));
}
function rt(e) {
  return class extends e {
    hasOverrideKeyword() {
      return this.hasModifier(h.SyntaxKind.OverrideKeyword);
    }
    getOverrideKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.OverrideKeyword);
    }
    getOverrideKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getOverrideKeyword(),
        e ?? "Expected to find an override keyword.",
        this
      );
    }
    setHasOverrideKeyword(e) {
      return this.toggleModifier("override", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.hasOverrideKeyword &&
          this.setHasOverrideKeyword(t.hasOverrideKeyword),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        hasOverrideKeyword: this.hasOverrideKeyword(),
      });
    }
  };
}
function rn(e) {
  return class extends e {
    getParameter(e) {
      return x(this.getParameters(), e);
    }
    getParameterOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getParameter(e), () =>
        k("parameter", e)
      );
    }
    getParameters() {
      return this.compilerNode.parameters.map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    addParameter(e) {
      return this.addParameters([e])[0];
    }
    addParameters(e) {
      return this.insertParameters(em(this.compilerNode.parameters), e);
    }
    insertParameter(e, t) {
      return this.insertParameters(e, [t])[0];
    }
    insertParameters(e, t) {
      if (h.ArrayUtils.isNullOrEmpty(t)) return [];
      let n = this.getParameters(),
        r = this.getFirstChildByKindOrThrow(
          h.SyntaxKind.OpenParenToken
        ).getNextSiblingIfKindOrThrow(h.SyntaxKind.SyntaxList);
      e = eD(e, n.length);
      let i = this._getWriterWithQueuedChildIndentation();
      return (
        this._context.structurePrinterFactory
          .forParameterDeclaration()
          .printTexts(i, t),
        e3({
          parent: r,
          currentNodes: n,
          insertIndex: e,
          newText: i.toString(),
          useTrailingCommas: !1,
        }),
        eT(n, this.getParameters(), e, !1)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.parameters &&
          (this.getParameters().forEach((e) => e.remove()),
          this.addParameters(t.parameters)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        parameters: this.getParameters().map((e) => e.getStructure()),
      });
    }
  };
}
function rr(e) {
  return class extends e {
    hasQuestionDotToken() {
      return null != this.compilerNode.questionDotToken;
    }
    getQuestionDotTokenNode() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.questionDotToken
      );
    }
    getQuestionDotTokenNodeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getQuestionDotTokenNode(),
        e ?? "Expected to find a question dot token.",
        this
      );
    }
    setHasQuestionDotToken(e) {
      let t = this.getQuestionDotTokenNode();
      return (
        e === (null != t) ||
          (e
            ? tm.isPropertyAccessExpression(this)
              ? this.getFirstChildByKindOrThrow(
                  h.SyntaxKind.DotToken
                ).replaceWithText("?.")
              : e4({
                  insertPos: function () {
                    return tm.isCallExpression(this)
                      ? this.getFirstChildByKindOrThrow(
                          h.SyntaxKind.OpenParenToken
                        ).getStart()
                      : tm.isElementAccessExpression(this)
                      ? this.getFirstChildByKindOrThrow(
                          h.SyntaxKind.OpenBracketToken
                        ).getStart()
                      : void h.errors.throwNotImplementedForSyntaxKindError(
                          this.compilerNode.kind
                        );
                  }.call(this),
                  parent: this,
                  newText: "?.",
                })
            : tm.isPropertyAccessExpression(this)
            ? t.replaceWithText(".")
            : e7({ children: [t] })),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.hasQuestionDotToken &&
          this.setHasQuestionDotToken(t.hasQuestionDotToken),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        hasQuestionDotToken: this.hasQuestionDotToken(),
      });
    }
  };
}
function ri(e) {
  return class extends e {
    hasQuestionToken() {
      return null != this.compilerNode.questionToken;
    }
    getQuestionTokenNode() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.questionToken
      );
    }
    getQuestionTokenNodeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getQuestionTokenNode(),
        e ?? "Expected to find a question token.",
        this
      );
    }
    setHasQuestionToken(e) {
      let t = this.getQuestionTokenNode();
      return (
        e === (null != t) ||
          (e
            ? (tm.isExclamationTokenable(this) &&
                this.setHasExclamationToken(!1),
              e4({
                insertPos: function () {
                  if (tm.hasName(this)) return this.getNameNode().getEnd();
                  let e = this.getFirstChildByKind(h.SyntaxKind.ColonToken);
                  if (null != e) return e.getStart();
                  let t = this.getLastChildByKind(h.SyntaxKind.SemicolonToken);
                  return null != t ? t.getStart() : this.getEnd();
                }.call(this),
                parent: this,
                newText: "?",
              }))
            : e7({ children: [t] })),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.hasQuestionToken &&
          this.setHasQuestionToken(t.hasQuestionToken),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        hasQuestionToken: this.hasQuestionToken(),
      });
    }
  };
}
function ra(e) {
  return class extends e {
    isReadonly() {
      return null != this.getReadonlyKeyword();
    }
    getReadonlyKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.ReadonlyKeyword);
    }
    getReadonlyKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getReadonlyKeyword(),
        e ?? "Expected to find a readonly keyword.",
        this
      );
    }
    setIsReadonly(e) {
      return this.toggleModifier("readonly", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isReadonly && this.setIsReadonly(t.isReadonly),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { isReadonly: this.isReadonly() });
    }
  };
}
function ro(e) {
  return class extends e {
    getReturnType() {
      return this.getSignature().getReturnType();
    }
    getReturnTypeNode() {
      return this._getNodeFromCompilerNodeIfExists(this.compilerNode.type);
    }
    getReturnTypeNodeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getReturnTypeNode(),
        e ?? "Expected to find a return type node.",
        this
      );
    }
    setReturnType(e) {
      var t;
      let n = J(this._getWriterWithQueuedChildIndentation(), e);
      if (h.StringUtils.isNullOrWhitespace(n)) return this.removeReturnType();
      let r = this.getReturnTypeNode();
      return (
        null != r
          ? r.getText() !== n && r.replaceWithText(n)
          : e4({
              parent: this,
              insertPos: ((t = this),
              t.getKind() === h.SyntaxKind.IndexSignature
                ? t.getFirstChildByKindOrThrow(h.SyntaxKind.CloseBracketToken)
                : t.getFirstChildByKindOrThrow(
                    h.SyntaxKind.CloseParenToken
                  )).getEnd(),
              newText: `: ${n}`,
            }),
        this
      );
    }
    removeReturnType() {
      let e = this.getReturnTypeNode();
      return (
        null == e ||
          e7({
            children: [
              e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.ColonToken),
              e,
            ],
            removePrecedingSpaces: !0,
          }),
        this
      );
    }
    getSignature() {
      let e = this._context.typeChecker.getSignatureFromNode(this);
      if (null == e)
        throw new h.errors.NotImplementedError(
          "Expected the node to have a signature."
        );
      return e;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.returnType
          ? this.setReturnType(t.returnType)
          : t.hasOwnProperty(h.nameof(t, "returnType")) &&
            this.removeReturnType(),
        this
      );
    }
    getStructure() {
      let t = this.getReturnTypeNode();
      return ei(e.prototype, this, {
        returnType: t ? t.getText({ trimLeadingIndentation: !0 }) : void 0,
      });
    }
  };
}
function rs(e) {
  return class extends e {
    getScope() {
      let e = rl(this);
      return null != e
        ? e
        : tm.isParameterDeclaration(this) && this.isReadonly()
        ? exports.Scope.Public
        : void 0;
    }
    setScope(e) {
      return rc(this, e), this;
    }
    getScopeKeyword() {
      return this.getModifiers().find((e) => {
        let t = e.getText();
        return "public" === t || "protected" === t || "private" === t;
      });
    }
    hasScopeKeyword() {
      return null != this.getScopeKeyword();
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        t.hasOwnProperty(h.nameof(t, "scope")) && this.setScope(t.scope),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { scope: this.getScope() });
    }
  };
}
function rl(e) {
  let t = e.getCombinedModifierFlags();
  return (t & h.ts.ModifierFlags.Private) != 0
    ? exports.Scope.Private
    : (t & h.ts.ModifierFlags.Protected) != 0
    ? exports.Scope.Protected
    : (t & h.ts.ModifierFlags.Public) != 0
    ? exports.Scope.Public
    : void 0;
}
function rc(e, t) {
  e.toggleModifier("public", t === exports.Scope.Public),
    e.toggleModifier("protected", t === exports.Scope.Protected),
    e.toggleModifier("private", t === exports.Scope.Private);
}
function rd(e) {
  return class extends e {
    getScope() {
      return rl(this) || exports.Scope.Public;
    }
    setScope(e) {
      return rc(this, e), this;
    }
    hasScopeKeyword() {
      return null != rl(this);
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        t.hasOwnProperty(h.nameof(t, "scope")) && this.setScope(t.scope),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        scope: this.hasScopeKeyword() ? this.getScope() : void 0,
      });
    }
  };
}
function ru(e) {
  return ro(rn(e));
}
function rp(e) {
  return class extends e {
    isStatic() {
      return this.hasModifier(h.SyntaxKind.StaticKeyword);
    }
    getStaticKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.StaticKeyword);
    }
    getStaticKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getStaticKeyword(),
        e ?? "Expected to find a static keyword.",
        this
      );
    }
    setIsStatic(e) {
      return this.toggleModifier("static", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isStatic && this.setIsStatic(t.isStatic),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { isStatic: this.isStatic() });
    }
  };
}
function r_(e) {
  return class extends e {
    insertText(e, t) {
      return this.replaceText([e, e], t), this;
    }
    removeText(e, t) {
      return (
        null == e
          ? this.replaceText(rf(this), "")
          : this.replaceText([e, t], ""),
        this
      );
    }
    replaceText(e, t) {
      let n = this.getChildSyntaxListOrThrow(),
        r = rf(this),
        i = e[0],
        a = e[1];
      return (
        (function () {
          if ((o(i), o(a), i > a))
            throw new h.errors.ArgumentError(
              "range",
              "Cannot specify a start position greater than the end position."
            );
        })(),
        e4({
          insertPos: i,
          newText: J(this._getWriter(), t),
          parent: n.getParentOrThrow(),
          replacing: { textLength: a - i, nodes: [n] },
        }),
        this
      );
      function o(e) {
        if (!(e >= r[0]) || !(e <= r[1]))
          throw new h.errors.InvalidOperationError(
            `Cannot insert or replace text outside the bounds of the node. Expected a position between [${r[0]}, ${r[1]}], but received ${e}.`
          );
      }
    }
  };
}
function rf(e) {
  let t = tm.isSourceFile(e) ? e : e.getChildSyntaxListOrThrow(),
    n = tm.isSourceFile(t)
      ? void 0
      : t.getPreviousSiblingIfKind(h.SyntaxKind.OpenBraceToken),
    r =
      null == n ? void 0 : t.getNextSiblingIfKind(h.SyntaxKind.CloseBraceToken);
  return null != n && null != r
    ? [n.getEnd(), r.getStart()]
    : [t.getPos(), t.getEnd()];
}
function rm(e) {
  return class extends e {
    getTypeArguments() {
      return null == this.compilerNode.typeArguments
        ? []
        : this.compilerNode.typeArguments.map((e) =>
            this._getNodeFromCompilerNode(e)
          );
    }
    addTypeArgument(e) {
      return this.addTypeArguments([e])[0];
    }
    addTypeArguments(e) {
      return this.insertTypeArguments(this.getTypeArguments().length, e);
    }
    insertTypeArgument(e, t) {
      return this.insertTypeArguments(e, [t])[0];
    }
    insertTypeArguments(e, t) {
      if (h.ArrayUtils.isNullOrEmpty(t)) return [];
      let n = this.getTypeArguments();
      return (
        (e = eD(e, n.length)),
        0 === n.length
          ? e4({
              insertPos: this.getFirstChildByKindOrThrow(
                h.SyntaxKind.Identifier
              ).getEnd(),
              parent: this,
              newText: `<${t.join(", ")}>`,
            })
          : e3({
              parent: this.getFirstChildByKindOrThrow(
                h.SyntaxKind.LessThanToken
              ).getNextSiblingIfKindOrThrow(h.SyntaxKind.SyntaxList),
              currentNodes: n,
              insertIndex: e,
              newText: t.join(", "),
              useTrailingCommas: !1,
            }),
        eT(n, this.getTypeArguments(), e, !1)
      );
    }
    removeTypeArgument(e) {
      let t = this.getTypeArguments();
      if (0 === t.length)
        throw new h.errors.InvalidOperationError(
          "Cannot remove a type argument when none exist."
        );
      let n = "number" == typeof e ? t[eD(e, t.length - 1)] : e;
      if (1 === t.length) {
        let e = t[0].getParentSyntaxListOrThrow();
        e7({
          children: [
            e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.LessThanToken),
            e,
            e.getNextSiblingIfKindOrThrow(h.SyntaxKind.GreaterThanToken),
          ],
        });
      } else tn(n);
      return this;
    }
  };
}
function rh(e) {
  return class extends e {
    getTypeNode() {
      return this._getNodeFromCompilerNodeIfExists(this.compilerNode.type);
    }
    getTypeNodeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getTypeNode(),
        e ?? "Expected to find a type node.",
        this
      );
    }
    setType(e) {
      var t;
      let n,
        r,
        i,
        a,
        o = J(this._getWriterWithQueuedChildIndentation(), e);
      if (h.StringUtils.isNullOrWhitespace(o)) return this.removeType();
      let s = this.getTypeNode();
      if (null != s && s.getText() === o) return this;
      let l = rg(this);
      return (
        null == this.getFirstChildByKind(l)
          ? ((t = this),
            (i = (
              !(function (e) {
                if (null == e) return !1;
                let t = e.getKind();
                return (
                  t === h.SyntaxKind.QuestionToken ||
                  t === h.SyntaxKind.ExclamationToken
                );
              })(
                (r = (n =
                  t.getFirstChildByKind(h.SyntaxKind.Identifier) ??
                  t.getFirstChildByKind(h.SyntaxKind.ArrayBindingPattern) ??
                  t.getFirstChildIfKindOrThrow(
                    h.SyntaxKind.ObjectBindingPattern,
                    "A first child of the kind Identifier, ArrayBindingPattern, or ObjectBindingPattern was expected."
                  )).getNextSibling())
              )
                ? n
                : r
            ).getEnd()),
            (a = (l === h.SyntaxKind.EqualsToken ? " = " : ": ") + o))
          : ((i = s.getStart()), (a = o)),
        e4({
          parent: this,
          insertPos: i,
          newText: a,
          replacing: { textLength: null == s ? 0 : s.getWidth() },
        }),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.type
          ? this.setType(t.type)
          : t.hasOwnProperty(h.nameof(t, "type")) && this.removeType(),
        this
      );
    }
    removeType() {
      if (this.getKind() === h.SyntaxKind.TypeAliasDeclaration)
        throw new h.errors.NotSupportedError(
          `Cannot remove the type of a type alias. Use ${h.nameof(
            "setType"
          )} instead.`
        );
      let e = this.getTypeNode();
      return (
        null == e ||
          e7({
            children: [e.getPreviousSiblingIfKindOrThrow(rg(this)), e],
            removePrecedingSpaces: !0,
          }),
        this
      );
    }
    getStructure() {
      let t = this.getTypeNode();
      return ei(e.prototype, this, {
        type: t ? t.getText({ trimLeadingIndentation: !0 }) : void 0,
      });
    }
  };
}
function rg(e) {
  return e.getKind() === h.SyntaxKind.TypeAliasDeclaration
    ? h.SyntaxKind.EqualsToken
    : h.SyntaxKind.ColonToken;
}
function ry(e) {
  return class extends e {
    addMember(e) {
      return this.addMembers([e])[0];
    }
    addMembers(e) {
      return this.insertMembers(em(this.getMembersWithComments()), e);
    }
    insertMember(e, t) {
      return this.insertMembers(e, [t])[0];
    }
    insertMembers(e, t) {
      return e5({
        getIndexedChildren: () => this.getMembersWithComments(),
        index: e,
        parent: this,
        write: (e) => {
          e.newLineIfLastNot();
          let n = this._getWriter();
          this._context.structurePrinterFactory
            .forTypeElementMember()
            .printTexts(n, t),
            e.write(n.toString()),
            e.newLineIfLastNot();
        },
      });
    }
    addConstructSignature(e) {
      return this.addConstructSignatures([e])[0];
    }
    addConstructSignatures(e) {
      return this.insertConstructSignatures(
        em(this.getMembersWithComments()),
        e
      );
    }
    insertConstructSignature(e, t) {
      return this.insertConstructSignatures(e, [t])[0];
    }
    insertConstructSignatures(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.ConstructSignature,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forConstructSignatureDeclaration(),
      });
    }
    getConstructSignature(e) {
      return this.getConstructSignatures().find(e);
    }
    getConstructSignatureOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getConstructSignature(e),
        t ??
          "Expected to find a construct signature with the provided condition.",
        this
      );
    }
    getConstructSignatures() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.ConstructSignature)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addCallSignature(e) {
      return this.addCallSignatures([e])[0];
    }
    addCallSignatures(e) {
      return this.insertCallSignatures(em(this.getMembersWithComments()), e);
    }
    insertCallSignature(e, t) {
      return this.insertCallSignatures(e, [t])[0];
    }
    insertCallSignatures(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.CallSignature,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forCallSignatureDeclaration(),
      });
    }
    getCallSignature(e) {
      return this.getCallSignatures().find(e);
    }
    getCallSignatureOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getCallSignature(e),
        t ?? "Expected to find a call signature with the provided condition.",
        this
      );
    }
    getCallSignatures() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.CallSignature)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addIndexSignature(e) {
      return this.addIndexSignatures([e])[0];
    }
    addIndexSignatures(e) {
      return this.insertIndexSignatures(em(this.getMembersWithComments()), e);
    }
    insertIndexSignature(e, t) {
      return this.insertIndexSignatures(e, [t])[0];
    }
    insertIndexSignatures(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.IndexSignature,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forIndexSignatureDeclaration(),
      });
    }
    getIndexSignature(e) {
      return this.getIndexSignatures().find(e);
    }
    getIndexSignatureOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getIndexSignature(e),
        t ?? "Expected to find a index signature with the provided condition.",
        this
      );
    }
    getIndexSignatures() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.IndexSignature)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addMethod(e) {
      return this.addMethods([e])[0];
    }
    addMethods(e) {
      return this.insertMethods(em(this.getMembersWithComments()), e);
    }
    insertMethod(e, t) {
      return this.insertMethods(e, [t])[0];
    }
    insertMethods(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.MethodSignature,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forMethodSignature(),
      });
    }
    getMethod(e) {
      return x(this.getMethods(), e);
    }
    getMethodOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getMethod(e), () =>
        k("interface method signature", e)
      );
    }
    getMethods() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.MethodSignature)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addProperty(e) {
      return this.addProperties([e])[0];
    }
    addProperties(e) {
      return this.insertProperties(em(this.getMembersWithComments()), e);
    }
    insertProperty(e, t) {
      return this.insertProperties(e, [t])[0];
    }
    insertProperties(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.PropertySignature,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forPropertySignature(),
      });
    }
    getProperty(e) {
      return x(this.getProperties(), e);
    }
    getPropertyOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getProperty(e), () =>
        k("interface property signature", e)
      );
    }
    getProperties() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.PropertySignature)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addGetAccessor(e) {
      return this.addGetAccessors([e])[0];
    }
    addGetAccessors(e) {
      let t = [];
      for (let n of e) {
        let e = this.getSetAccessor(n.name),
          r = null == e ? em(this.getMembersWithComments()) : e.getChildIndex();
        t.push(this.insertGetAccessor(r, n));
      }
      return t;
    }
    insertGetAccessor(e, t) {
      return this.insertGetAccessors(e, [t])[0];
    }
    insertGetAccessors(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.GetAccessor,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forGetAccessorDeclaration({
            isAmbient: !0,
          }),
      });
    }
    getGetAccessor(e) {
      return x(this.getGetAccessors(), e);
    }
    getGetAccessorOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getGetAccessor(e), () =>
        k("interface get accessor", e)
      );
    }
    getGetAccessors() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.GetAccessor)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    addSetAccessor(e) {
      return this.addSetAccessors([e])[0];
    }
    addSetAccessors(e) {
      let t = [];
      for (let n of e) {
        let e = this.getGetAccessor(n.name),
          r =
            null == e
              ? em(this.getMembersWithComments())
              : e.getChildIndex() + 1;
        t.push(this.insertSetAccessor(r, n));
      }
      return t;
    }
    insertSetAccessor(e, t) {
      return this.insertSetAccessors(e, [t])[0];
    }
    insertSetAccessors(e, t) {
      return rv({
        thisNode: this,
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.SetAccessor,
        createStructurePrinter: () =>
          this._context.structurePrinterFactory.forSetAccessorDeclaration({
            isAmbient: !0,
          }),
      });
    }
    getSetAccessor(e) {
      return x(this.getSetAccessors(), e);
    }
    getSetAccessorOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getSetAccessor(e), () =>
        k("interface set accessor", e)
      );
    }
    getSetAccessors() {
      return this.compilerNode.members
        .filter((e) => e.kind === h.SyntaxKind.SetAccessor)
        .map((e) => this._getNodeFromCompilerNode(e));
    }
    getMembers() {
      return this.compilerNode.members.map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    getMembersWithComments() {
      let e = this.compilerNode;
      return F.getContainerArray(e, this._sourceFile.compilerNode).map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.callSignatures &&
          (this.getCallSignatures().forEach((e) => e.remove()),
          this.addCallSignatures(t.callSignatures)),
        null != t.constructSignatures &&
          (this.getConstructSignatures().forEach((e) => e.remove()),
          this.addConstructSignatures(t.constructSignatures)),
        null != t.indexSignatures &&
          (this.getIndexSignatures().forEach((e) => e.remove()),
          this.addIndexSignatures(t.indexSignatures)),
        null != t.properties &&
          (this.getProperties().forEach((e) => e.remove()),
          this.addProperties(t.properties)),
        null != t.getAccessors &&
          (this.getGetAccessors().forEach((e) => e.remove()),
          this.addGetAccessors(t.getAccessors)),
        null != t.setAccessors &&
          (this.getSetAccessors().forEach((e) => e.remove()),
          this.addSetAccessors(t.setAccessors)),
        null != t.methods &&
          (this.getMethods().forEach((e) => e.remove()),
          this.addMethods(t.methods)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        callSignatures: this.getCallSignatures().map((e) => e.getStructure()),
        constructSignatures: this.getConstructSignatures().map((e) =>
          e.getStructure()
        ),
        getAccessors: this.getGetAccessors().map((e) => e.getStructure()),
        indexSignatures: this.getIndexSignatures().map((e) => e.getStructure()),
        methods: this.getMethods().map((e) => e.getStructure()),
        properties: this.getProperties().map((e) => e.getStructure()),
        setAccessors: this.getSetAccessors().map((e) => e.getStructure()),
      });
    }
  };
}
function rv(e) {
  return e8({
    getIndexedChildren: () => e.thisNode.getMembersWithComments(),
    parent: e.thisNode,
    index: e.index,
    structures: e.structures,
    expectedKind: e.expectedKind,
    write: (t, n) => {
      t.newLineIfLastNot(),
        e.createStructurePrinter().printTexts(t, e.structures),
        t.newLineIfLastNot();
    },
  });
}
function rb(e) {
  return class extends e {
    getTypeParameter(e) {
      return x(this.getTypeParameters(), e);
    }
    getTypeParameterOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getTypeParameter(e), () =>
        k("type parameter", e)
      );
    }
    getTypeParameters() {
      let e = this.compilerNode.typeParameters;
      return null == e ? [] : e.map((e) => this._getNodeFromCompilerNode(e));
    }
    addTypeParameter(e) {
      return this.addTypeParameters([e])[0];
    }
    addTypeParameters(e) {
      return this.insertTypeParameters(em(this.compilerNode.typeParameters), e);
    }
    insertTypeParameter(e, t) {
      return this.insertTypeParameters(e, [t])[0];
    }
    insertTypeParameters(e, t) {
      if (h.ArrayUtils.isNullOrEmpty(t)) return [];
      let n = this.getTypeParameters(),
        r = this._getWriterWithQueuedChildIndentation(),
        i = this._context.structurePrinterFactory.forTypeParameterDeclaration();
      return (
        (e = eD(e, n.length)),
        i.printTexts(r, t),
        0 === n.length
          ? e4({
              insertPos: (function (e) {
                if (null != e.getNameNode) return e.getNameNode().getEnd();
                if (
                  tm.isCallSignatureDeclaration(e) ||
                  tm.isFunctionTypeNode(e)
                )
                  return e
                    .getFirstChildByKindOrThrow(h.SyntaxKind.OpenParenToken)
                    .getStart();
                throw new h.errors.NotImplementedError(
                  `Not implemented scenario inserting type parameters for node with kind ${e.getKindName()}.`
                );
              })(this),
              parent: this,
              newText: `<${r.toString()}>`,
            })
          : e3({
              parent: this.getFirstChildByKindOrThrow(
                h.SyntaxKind.LessThanToken
              ).getNextSiblingIfKindOrThrow(h.SyntaxKind.SyntaxList),
              currentNodes: n,
              insertIndex: e,
              newText: r.toString(),
              useTrailingCommas: !1,
            }),
        eT(n, this.getTypeParameters(), e, !1)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.typeParameters &&
          (this.getTypeParameters().forEach((e) => e.remove()),
          this.addTypeParameters(t.typeParameters)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        typeParameters: this.getTypeParameters().map((e) => e.getStructure()),
      });
    }
  };
}
function rx(e) {
  return class extends e {
    unwrap() {
      e2(this._sourceFile, new e0(this), new eG().getForUnwrappingNode(this));
    }
  };
}
class rS extends tm {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
let rk = tD(n$(n3(tm)));
class rT extends rk {
  getPropertyNameNodeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getPropertyNameNode(),
      e ?? "Expected to find a property name node.",
      this
    );
  }
  getPropertyNameNode() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.propertyName
    );
  }
}
class rE extends tm {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
function rC(e) {
  return class extends e {
    isAbstract() {
      return null != this.getAbstractKeyword();
    }
    getAbstractKeyword() {
      return this.getFirstModifierByKind(h.SyntaxKind.AbstractKeyword);
    }
    getAbstractKeywordOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getAbstractKeyword(),
        e ?? "Expected to find an abstract keyword.",
        this
      );
    }
    setIsAbstract(e) {
      return this.toggleModifier("abstract", e), this;
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.isAbstract && this.setIsAbstract(t.isAbstract),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, { isAbstract: this.isAbstract() });
    }
  };
}
class rA extends tm {
  getContextualType() {
    return this._context.typeChecker.getContextualType(this);
  }
}
let rw = rA;
class rD extends rw {
  getLeft() {
    return this._getNodeFromCompilerNode(this.compilerNode.left);
  }
  getOperatorToken() {
    return this._getNodeFromCompilerNode(this.compilerNode.operatorToken);
  }
  getRight() {
    return this._getNodeFromCompilerNode(this.compilerNode.right);
  }
}
let rN = rD;
class rI extends rN {
  getOperatorToken() {
    return this._getNodeFromCompilerNode(this.compilerNode.operatorToken);
  }
}
let rP = rI;
class rM extends rA {}
class rL extends rM {}
class rR extends rL {}
class rF extends rR {}
class rO extends rF {}
class rB extends rO {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  addElement(e, t) {
    return this.addElements([e], t)[0];
  }
  addElements(e, t) {
    return this.insertElements(this.compilerNode.elements.length, e, t);
  }
  insertElement(e, t, n) {
    return this.insertElements(e, [t], n)[0];
  }
  insertElements(e, t, n = {}) {
    var r, i;
    let a = this.getElements();
    e = eD(e, a.length);
    let o =
        ((r = this),
        null != n.useNewLines
          ? n.useNewLines
          : a.length > 1
          ? (function () {
              let e = a[0].getStartLineNumber();
              for (let t = 1; t < a.length; t++) {
                let n = a[t].getStartLineNumber();
                if (e === n) return !1;
                e = n;
              }
              return !0;
            })()
          : r.getStartLineNumber() !== r.getEndLineNumber()),
      s = o
        ? this._getWriterWithChildIndentation()
        : this._getWriterWithQueuedChildIndentation(),
      l = new ni();
    return (
      (o ? new tV(l) : new tj(l)).printText(s, t),
      (i = this),
      e3({
        parent: i.getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
        currentNodes: a,
        insertIndex: e,
        newText: s.toString(),
        useNewLines: o,
        useTrailingCommas:
          o && i._context.manipulationSettings.getUseTrailingCommas(),
      }),
      eT(a, i.getElements(), e, !1)
    );
  }
  removeElement(e) {
    let t = this.getElements();
    if (0 === t.length)
      throw new h.errors.InvalidOperationError(
        "Cannot remove an element when none exist."
      );
    tn("number" == typeof e ? t[eD(e, t.length - 1)] : e);
  }
}
function rW(e) {
  return class extends e {
    getExpression() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.expression
      );
    }
    getExpressionOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getExpression(),
        e ?? "Expected to find an expression.",
        this
      );
    }
    getExpressionIfKind(e) {
      let t = this.getExpression();
      return t?.getKind() === e ? t : void 0;
    }
    getExpressionIfKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getExpressionIfKind(e),
        t ??
          `An expression with the kind kind ${h.getSyntaxKindName(
            e
          )} was expected.`,
        this
      );
    }
  };
}
function rj(e) {
  return class extends e {
    getExpression() {
      return this._getNodeFromCompilerNode(this.compilerNode.expression);
    }
    getExpressionIfKind(e) {
      let { expression: t } = this.compilerNode;
      return t.kind === e ? this._getNodeFromCompilerNode(t) : void 0;
    }
    getExpressionIfKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getExpressionIfKind(e),
        t ??
          `An expression of the kind ${h.getSyntaxKindName(e)} was expected.`,
        this
      );
    }
    setExpression(e) {
      return (
        this.getExpression().replaceWithText(
          e,
          this._getWriterWithQueuedChildIndentation()
        ),
        this
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.expression && this.setExpression(t.expression),
        this
      );
    }
  };
}
let rz = rh(rj(rA));
class rV extends rz {}
let rG = rj(rM);
class rK extends rG {}
let rU = rm(tl(rr(rj(rR))));
class rH extends rU {
  getReturnType() {
    return this._context.typeChecker.getTypeAtLocation(this);
  }
}
let rq = rA;
class rJ extends rq {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
let r$ = rA;
class rX extends r$ {
  getCondition() {
    return this._getNodeFromCompilerNode(this.compilerNode.condition);
  }
  getQuestionToken() {
    return this._getNodeFromCompilerNode(this.compilerNode.questionToken);
  }
  getWhenTrue() {
    return this._getNodeFromCompilerNode(this.compilerNode.whenTrue);
  }
  getColonToken() {
    return this._getNodeFromCompilerNode(this.compilerNode.colonToken);
  }
  getWhenFalse() {
    return this._getNodeFromCompilerNode(this.compilerNode.whenFalse);
  }
}
let rY = rj(rM);
class rQ extends rY {}
let rZ = rr(rj(rF));
class r0 extends rZ {
  getArgumentExpression() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.argumentExpression
    );
  }
  getArgumentExpressionOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getArgumentExpression(),
      e ?? "Expected to find an argument expression.",
      this
    );
  }
}
let r1 = rO;
class r2 extends r1 {}
let r4 = nY(rO);
class r3 extends r4 {}
let r6 = n9(rO);
class r8 extends r6 {
  getKeywordToken() {
    return this.compilerNode.keywordToken;
  }
}
let r5 = rm(tl(rj(rO)));
class r7 extends r5 {}
let r9 = rj(rR);
class ie extends r9 {}
class it extends tm {
  remove() {
    tn(this);
  }
}
class ir extends it {}
let ii = rI,
  ia = rO;
class io extends ia {
  getPropertyOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(this.getProperty(e), () =>
      k("property", e)
    );
  }
  getProperty(e) {
    let t;
    return (
      (t =
        "string" == typeof e
          ? (t) => null != t[h.nameof("getName")] && t.getName() === e
          : e),
      this.getProperties().find(t)
    );
  }
  getProperties() {
    return this.compilerNode.properties.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getPropertiesWithComments() {
    return F.getContainerArray(
      this.compilerNode,
      this.getSourceFile().compilerNode
    ).map((e) => this._getNodeFromCompilerNode(e));
  }
  #tQ() {
    return F.getContainerArray(
      this.compilerNode,
      this.getSourceFile().compilerNode
    ).length;
  }
  addProperty(e) {
    return this.insertProperties(this.#tQ(), [e])[0];
  }
  addProperties(e) {
    return this.insertProperties(this.#tQ(), e);
  }
  insertProperty(e, t) {
    return this.insertProperties(e, [t])[0];
  }
  insertProperties(e, t) {
    let n = this.getPropertiesWithComments();
    e = eD(e, n.length);
    let r = this._getWriterWithChildIndentation();
    return (
      this._context.structurePrinterFactory
        .forObjectLiteralExpressionProperty()
        .printTexts(r, t),
      e3({
        parent: this.getChildSyntaxListOrThrow(),
        currentNodes: n,
        insertIndex: e,
        newText: r.toString(),
        useNewLines: !0,
        useTrailingCommas:
          this._context.manipulationSettings.getUseTrailingCommas(),
      }),
      eT(n, this.getPropertiesWithComments(), e, !0)
    );
  }
  addPropertyAssignment(e) {
    return this.addPropertyAssignments([e])[0];
  }
  addPropertyAssignments(e) {
    return this.insertPropertyAssignments(this.#tQ(), e);
  }
  insertPropertyAssignment(e, t) {
    return this.insertPropertyAssignments(e, [t])[0];
  }
  insertPropertyAssignments(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forPropertyAssignment()
    );
  }
  addShorthandPropertyAssignment(e) {
    return this.addShorthandPropertyAssignments([e])[0];
  }
  addShorthandPropertyAssignments(e) {
    return this.insertShorthandPropertyAssignments(this.#tQ(), e);
  }
  insertShorthandPropertyAssignment(e, t) {
    return this.insertShorthandPropertyAssignments(e, [t])[0];
  }
  insertShorthandPropertyAssignments(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forShorthandPropertyAssignment()
    );
  }
  addSpreadAssignment(e) {
    return this.addSpreadAssignments([e])[0];
  }
  addSpreadAssignments(e) {
    return this.insertSpreadAssignments(this.#tQ(), e);
  }
  insertSpreadAssignment(e, t) {
    return this.insertSpreadAssignments(e, [t])[0];
  }
  insertSpreadAssignments(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forSpreadAssignment()
    );
  }
  addMethod(e) {
    return this.addMethods([e])[0];
  }
  addMethods(e) {
    return this.insertMethods(this.#tQ(), e);
  }
  insertMethod(e, t) {
    return this.insertMethods(e, [t])[0];
  }
  insertMethods(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forMethodDeclaration({
        isAmbient: !1,
      })
    );
  }
  addGetAccessor(e) {
    return this.addGetAccessors([e])[0];
  }
  addGetAccessors(e) {
    return this.insertGetAccessors(this.#tQ(), e);
  }
  insertGetAccessor(e, t) {
    return this.insertGetAccessors(e, [t])[0];
  }
  insertGetAccessors(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forGetAccessorDeclaration({
        isAmbient: !1,
      })
    );
  }
  addSetAccessor(e) {
    return this.addSetAccessors([e])[0];
  }
  addSetAccessors(e) {
    return this.insertSetAccessors(this.#tQ(), e);
  }
  insertSetAccessor(e, t) {
    return this.insertSetAccessors(e, [t])[0];
  }
  insertSetAccessors(e, t) {
    return this.#tZ(e, t, () =>
      this._context.structurePrinterFactory.forSetAccessorDeclaration({
        isAmbient: !1,
      })
    );
  }
  #tZ(e, t, n) {
    e = eD(e, this.#tQ());
    let r = this._getWriterWithChildIndentation(),
      i = new tV(n()),
      a = this.getPropertiesWithComments();
    return (
      i.printText(r, t),
      e3({
        parent: this.getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
        currentNodes: a,
        insertIndex: e,
        newText: r.toString(),
        useNewLines: !0,
        useTrailingCommas:
          this._context.manipulationSettings.getUseTrailingCommas(),
      }),
      eT(a, this.getPropertiesWithComments(), e, !1)
    );
  }
}
let is = nJ(ri(re(it)));
class il extends is {
  removeInitializer() {
    let e = this.getInitializerOrThrow(),
      t = e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.ColonToken),
      n = this.getChildIndex(),
      r = this._sourceFile.getFullText(),
      i = this.getStart(),
      a = r.substring(i, t.getPos()) + r.substring(e.getEnd(), this.getEnd()),
      o = this.getParentSyntaxList() || this.getParentOrThrow();
    return (
      e4({
        insertPos: i,
        newText: a,
        parent: o,
        replacing: { textLength: this.getWidth() },
      }),
      o.getChildAtIndexIfKindOrThrow(
        n,
        h.SyntaxKind.ShorthandPropertyAssignment
      )
    );
  }
  setInitializer(e) {
    let t = this.getInitializerOrThrow();
    return (
      e4({
        insertPos: t.getStart(),
        newText: J(this._getWriterWithQueuedChildIndentation(), e),
        parent: this,
        replacing: { textLength: t.getWidth() },
      }),
      this
    );
  }
  set(e) {
    if ((ea(is.prototype, this, e), null != e.initializer))
      this.setInitializer(e.initializer);
    else if (e.hasOwnProperty(h.nameof(e, "initializer")))
      return this.removeInitializer();
    return this;
  }
  getStructure() {
    let e = this.getInitializerOrThrow(),
      t = ei(is.prototype, this, {
        kind: exports.StructureKind.PropertyAssignment,
        initializer: e.getText(),
      });
    return delete t.hasQuestionToken, t;
  }
}
let ic = nJ(ri(n9(it)));
class id extends ic {
  hasObjectAssignmentInitializer() {
    return null != this.compilerNode.objectAssignmentInitializer;
  }
  getObjectAssignmentInitializerOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getObjectAssignmentInitializer(),
      e ?? "Expected to find an object assignment initializer.",
      this
    );
  }
  getObjectAssignmentInitializer() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.objectAssignmentInitializer
    );
  }
  getEqualsTokenOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getEqualsToken(),
      e ?? "Expected to find an equals token.",
      this
    );
  }
  getEqualsToken() {
    let e = this.compilerNode.equalsToken;
    if (null != e) return this._getNodeFromCompilerNode(e);
  }
  removeObjectAssignmentInitializer() {
    return (
      this.hasObjectAssignmentInitializer() &&
        e7({
          children: [
            this.getEqualsTokenOrThrow(),
            this.getObjectAssignmentInitializerOrThrow(),
          ],
          removePrecedingSpaces: !0,
        }),
      this
    );
  }
  setInitializer(e) {
    let t = this.getParentSyntaxList() || this.getParentOrThrow(),
      n = this.getChildIndex();
    return (
      e4({
        insertPos: this.getStart(),
        newText: this.getText() + `: ${e}`,
        parent: t,
        replacing: { textLength: this.getWidth() },
      }),
      t.getChildAtIndexIfKindOrThrow(n, h.SyntaxKind.PropertyAssignment)
    );
  }
  set(e) {
    return ea(ic.prototype, this, e), this;
  }
  getStructure() {
    let e = ei(ic.prototype, this, {
      kind: exports.StructureKind.ShorthandPropertyAssignment,
    });
    return delete e.hasQuestionToken, e;
  }
  getValueSymbol() {
    return this._context.typeChecker.getShorthandAssignmentValueSymbol(this);
  }
  getValueSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getValueSymbol(),
      e ?? "Expected to find a value symbol.",
      this
    );
  }
}
let iu = rj(it);
class ip extends iu {
  set(e) {
    return ea(iu.prototype, this, e), this;
  }
  getStructure() {
    return ei(iu.prototype, this, {
      kind: exports.StructureKind.SpreadAssignment,
      expression: this.getExpression().getText(),
    });
  }
}
let i_ = rA;
class im extends i_ {}
let ih = rj(rA);
class ig extends ih {}
let iy = rj(rA);
class iv extends iy {}
let ib = rM;
class ix extends ib {
  getOperatorToken() {
    return this.compilerNode.operator;
  }
  getOperand() {
    return this._getNodeFromCompilerNode(this.compilerNode.operand);
  }
}
let iS = rM;
class ik extends iS {
  getOperatorToken() {
    return this.compilerNode.operator;
  }
  getOperand() {
    return this._getNodeFromCompilerNode(this.compilerNode.operand);
  }
}
let iT = n9(rr(rj(rF)));
class iE extends iT {}
let iC = rh(rj(rA));
class iA extends iC {}
let iw = rj(rA);
class iD extends iw {}
let iN = rj(r0),
  iI = rO;
class iP extends iI {}
let iM = rj(iE),
  iL = rO;
class iR extends iL {}
let iF = rh(rj(rM));
class iO extends iF {}
let iB = rj(rM);
class iW extends iB {}
let ij = rj(rM);
class iz extends ij {}
let iV = rW(nU(rA));
class iG extends iV {}
let iK = tC(tm);
class iU extends iK {
  remove() {
    tr([this]);
  }
}
function iH(e) {
  return class extends e {
    getStatements() {
      let e = this._getCompilerStatementsContainer();
      return (e?.statements ?? []).map((e) => this._getNodeFromCompilerNode(e));
    }
    getStatementsWithComments() {
      return this._getCompilerStatementsWithComments().map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    getStatement(e) {
      return this.getStatements().find(e);
    }
    getStatementOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getStatement(e),
        t ?? "Expected to find a statement matching the provided condition.",
        this
      );
    }
    getStatementByKind(e) {
      let t = this._getCompilerStatementsWithComments().find(
        (t) => t.kind === e
      );
      return this._getNodeFromCompilerNodeIfExists(t);
    }
    getStatementByKindOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getStatementByKind(e),
        t ??
          `Expected to find a statement with syntax kind ${h.getSyntaxKindName(
            e
          )}.`,
        this
      );
    }
    addStatements(e) {
      return this.insertStatements(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertStatements(e, t) {
      iq(this);
      let n = (e) => {
        this._context.structurePrinterFactory
          .forStatement({ isAmbient: z(this) })
          .printTexts(e, t);
      };
      return function () {
        let e = this.getChildSyntaxListOrThrow();
        if (tm.isCaseClause(this) || tm.isDefaultClause(this)) {
          let t = e.getFirstChildIfKind(h.SyntaxKind.Block);
          if (null != t) return t.getChildSyntaxListOrThrow();
        }
        return e;
      }
        .call(this)
        .insertChildText(e, n);
    }
    removeStatement(e) {
      return (
        (e = eD(e, this._getCompilerStatementsWithComments().length - 1)),
        this.removeStatements([e, e])
      );
    }
    removeStatements(e) {
      let t = this.getStatementsWithComments();
      return (
        h.errors.throwIfRangeOutOfRange(e, [0, t.length], "indexRange"),
        tr(t.slice(e[0], e[1] + 1)),
        this
      );
    }
    addClass(e) {
      return this.addClasses([e])[0];
    }
    addClasses(e) {
      return this.insertClasses(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertClass(e, t) {
      return this.insertClasses(e, [t])[0];
    }
    insertClasses(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.ClassDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(e, n, () => {
            this._context.structurePrinterFactory
              .forClassDeclaration({ isAmbient: z(this) })
              .printTexts(e, t);
          });
        },
      });
    }
    getClasses() {
      return this.getStatements().filter(tm.isClassDeclaration);
    }
    getClass(e) {
      return x(this.getClasses(), e);
    }
    getClassOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getClass(e), () =>
        k("class", e)
      );
    }
    addEnum(e) {
      return this.addEnums([e])[0];
    }
    addEnums(e) {
      return this.insertEnums(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertEnum(e, t) {
      return this.insertEnums(e, [t])[0];
    }
    insertEnums(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.EnumDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(e, n, () => {
            this._context.structurePrinterFactory
              .forEnumDeclaration()
              .printTexts(e, t);
          });
        },
      });
    }
    getEnums() {
      return this.getStatements().filter(tm.isEnumDeclaration);
    }
    getEnum(e) {
      return x(this.getEnums(), e);
    }
    getEnumOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getEnum(e), () =>
        k("enum", e)
      );
    }
    addFunction(e) {
      return this.addFunctions([e])[0];
    }
    addFunctions(e) {
      return this.insertFunctions(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertFunction(e, t) {
      return this.insertFunctions(e, [t])[0];
    }
    insertFunctions(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.FunctionDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forFunctionDeclaration({ isAmbient: z(this) })
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) =>
                !0 === t[0].hasDeclareKeyword &&
                tm.isFunctionDeclaration(e) &&
                null == e.getBody(),
              nextNewLine: (e) =>
                !0 === t[t.length - 1].hasDeclareKeyword &&
                tm.isFunctionDeclaration(e) &&
                null == e.getBody(),
            }
          );
        },
      });
    }
    getFunctions() {
      return this.getStatements()
        .filter(tm.isFunctionDeclaration)
        .filter((e) => e.isAmbient() || e.isImplementation());
    }
    getFunction(e) {
      return x(this.getFunctions(), e);
    }
    getFunctionOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getFunction(e), () =>
        k("function", e)
      );
    }
    addInterface(e) {
      return this.addInterfaces([e])[0];
    }
    addInterfaces(e) {
      return this.insertInterfaces(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertInterface(e, t) {
      return this.insertInterfaces(e, [t])[0];
    }
    insertInterfaces(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.InterfaceDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(e, n, () => {
            this._context.structurePrinterFactory
              .forInterfaceDeclaration()
              .printTexts(e, t);
          });
        },
      });
    }
    getInterfaces() {
      return this.getStatements().filter(tm.isInterfaceDeclaration);
    }
    getInterface(e) {
      return x(this.getInterfaces(), e);
    }
    getInterfaceOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getInterface(e), () =>
        k("interface", e)
      );
    }
    addModule(e) {
      return this.addModules([e])[0];
    }
    addModules(e) {
      return this.insertModules(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertModule(e, t) {
      return this.insertModules(e, [t])[0];
    }
    insertModules(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.ModuleDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(e, n, () => {
            this._context.structurePrinterFactory
              .forModuleDeclaration({ isAmbient: z(this) })
              .printTexts(e, t);
          });
        },
      });
    }
    getModules() {
      return this.getStatements().filter(tm.isModuleDeclaration);
    }
    getModule(e) {
      return x(this.getModules(), e);
    }
    getModuleOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getModule(e), () =>
        k("module", e)
      );
    }
    addTypeAlias(e) {
      return this.addTypeAliases([e])[0];
    }
    addTypeAliases(e) {
      return this.insertTypeAliases(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertTypeAlias(e, t) {
      return this.insertTypeAliases(e, [t])[0];
    }
    insertTypeAliases(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.TypeAliasDeclaration,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forTypeAliasDeclaration()
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) => tm.isTypeAliasDeclaration(e),
              nextNewLine: (e) => tm.isTypeAliasDeclaration(e),
            }
          );
        },
      });
    }
    getTypeAliases() {
      return this.getStatements().filter(tm.isTypeAliasDeclaration);
    }
    getTypeAlias(e) {
      return x(this.getTypeAliases(), e);
    }
    getTypeAliasOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getTypeAlias(e), () =>
        k("type alias", e)
      );
    }
    getVariableStatements() {
      return this.getStatements().filter(tm.isVariableStatement);
    }
    getVariableStatement(e) {
      return this.getVariableStatements().find(
        "string" == typeof e
          ? (t) => t.getDeclarations().some((t) => S(t, e))
          : e
      );
    }
    getVariableStatementOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getVariableStatement(e),
        t ??
          "Expected to find a variable statement that matched the provided condition.",
        this
      );
    }
    addVariableStatement(e) {
      return this.addVariableStatements([e])[0];
    }
    addVariableStatements(e) {
      return this.insertVariableStatements(
        this._getCompilerStatementsWithComments().length,
        e
      );
    }
    insertVariableStatement(e, t) {
      return this.insertVariableStatements(e, [t])[0];
    }
    insertVariableStatements(e, t) {
      return this._insertChildren({
        expectedKind: h.SyntaxKind.VariableStatement,
        index: e,
        structures: t,
        write: (e, n) => {
          this._standardWrite(
            e,
            n,
            () => {
              this._context.structurePrinterFactory
                .forVariableStatement()
                .printTexts(e, t);
            },
            {
              previousNewLine: (e) => tm.isVariableStatement(e),
              nextNewLine: (e) => tm.isVariableStatement(e),
            }
          );
        },
      });
    }
    getVariableDeclarations() {
      let e = [];
      for (let t of this.getVariableStatements())
        e.push(...t.getDeclarations());
      return e;
    }
    getVariableDeclaration(e) {
      return x(this.getVariableDeclarations(), e);
    }
    getVariableDeclarationOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getVariableDeclaration(e),
        () => k("variable declaration", e)
      );
    }
    getStructure() {
      let t = {};
      return (
        tm.isBodyable(this) && !this.hasBody()
          ? (t.statements = void 0)
          : (t.statements = this.getStatements().map((e) =>
              tm._hasStructure(e)
                ? e.getStructure()
                : e.getText({ trimLeadingIndentation: !0 })
            )),
        ei(e.prototype, this, t)
      );
    }
    set(t) {
      if (
        tm.isBodyable(this) &&
        null == t.statements &&
        t.hasOwnProperty(h.nameof(t, "statements"))
      )
        this.removeBody();
      else if (null != t.statements) {
        let e = this._getCompilerStatementsWithComments().length;
        e > 0 && this.removeStatements([0, e - 1]);
      }
      return (
        ea(e.prototype, this, t),
        null != t.statements && this.addStatements(t.statements),
        this
      );
    }
    _getCompilerStatementsWithComments() {
      let e = this._getCompilerStatementsContainer();
      return null == e
        ? []
        : F.getContainerArray(e, this._sourceFile.compilerNode);
    }
    _getCompilerStatementsContainer() {
      if (
        tm.isSourceFile(this) ||
        tm.isCaseClause(this) ||
        tm.isDefaultClause(this)
      )
        return this.compilerNode;
      if (tm.isModuleDeclaration(this)) {
        let e = this._getInnerBody();
        if (null == e) return;
        return e.compilerNode;
      }
      if (tm.isBodyable(this) || tm.isBodied(this))
        return this.getBody()?.compilerNode;
      if (tm.isBlock(this) || tm.isModuleBlock(this)) return this.compilerNode;
      throw new h.errors.NotImplementedError(
        `Could not find the statements for node kind: ${this.getKindName()}, text: ${this.getText()}`
      );
    }
    _insertChildren(e) {
      return (
        iq(this),
        e8({
          expectedKind: e.expectedKind,
          getIndexedChildren: () => this.getStatementsWithComments(),
          index: e.index,
          parent: this,
          structures: e.structures,
          write: (t, n) => e.write(t, n),
        })
      );
    }
    _standardWrite(e, t, n, r = {}) {
      null == t.previousMember ||
      (null != r.previousNewLine && r.previousNewLine(t.previousMember)) ||
      tm.isCommentNode(t.previousMember)
        ? t.isStartOfFile || e.newLineIfLastNot()
        : e.blankLine(),
        n(),
        null == t.nextMember ||
        (null != r.nextNewLine && r.nextNewLine(t.nextMember))
          ? e.newLineIfLastNot()
          : e.blankLine();
    }
  };
}
function iq(e) {
  tm.isBodyable(e) && !e.hasBody() && e.addBody();
}
let iJ = r_(iH(iU));
class i$ extends iJ {}
class iX extends iU {
  getLabel() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.label);
  }
  getLabelOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLabel(),
      e ?? "Expected to find a label.",
      this
    );
  }
}
let iY = r_(tm);
class iQ extends iY {
  getClauses() {
    return (this.compilerNode.clauses || []).map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  removeClause(e) {
    return (
      (e = eD(e, this.getClauses().length - 1)), this.removeClauses([e, e])
    );
  }
  removeClauses(e) {
    let t = this.getClauses();
    return (
      h.errors.throwIfRangeOutOfRange(e, [0, t.length], "indexRange"),
      ti(t.slice(e[0], e[1] + 1)),
      this
    );
  }
}
let iZ = nX(rj(r_(iH(tm))));
class i0 extends iZ {
  remove() {
    ti([this]);
  }
}
let i1 = tm;
class i2 extends i1 {
  getBlock() {
    return this._getNodeFromCompilerNode(this.compilerNode.block);
  }
  getVariableDeclaration() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.variableDeclaration
    );
  }
  getVariableDeclarationOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getVariableDeclaration(),
      e ?? "Expected to find a variable declaration.",
      this
    );
  }
}
class i4 extends iU {}
class i3 extends iU {
  getLabel() {
    return null == this.compilerNode.label
      ? void 0
      : this._getNodeFromCompilerNode(this.compilerNode.label);
  }
  getLabelOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLabel(),
      e ?? "Expected to find a label.",
      this
    );
  }
}
let i6 = iU;
class i8 extends i6 {}
let i5 = r_(iH(tm));
class i7 extends i5 {
  remove() {
    ti([this]);
  }
}
class i9 extends iU {
  getStatement() {
    return this._getNodeFromCompilerNode(this.compilerNode.statement);
  }
}
let ae = rj(i9);
class at extends ae {}
let an = iU;
class ar extends an {}
let ai = rj(nX(iU));
class aa extends ai {}
let ao = rj(i9);
class as extends ao {
  getInitializer() {
    return this._getNodeFromCompilerNode(this.compilerNode.initializer);
  }
}
let al = rj(td(i9));
class ac extends al {
  getInitializer() {
    return this._getNodeFromCompilerNode(this.compilerNode.initializer);
  }
}
let ad = i9;
class au extends ad {
  getInitializer() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.initializer);
  }
  getInitializerOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getInitializer(),
      e ?? "Expected to find an initializer.",
      this
    );
  }
  getCondition() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.condition);
  }
  getConditionOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getCondition(),
      e ?? "Expected to find a condition.",
      this
    );
  }
  getIncrementor() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.incrementor);
  }
  getIncrementorOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getIncrementor(),
      e ?? "Expected to find an incrementor.",
      this
    );
  }
}
let ap = rj(iU);
class a_ extends ap {
  getThenStatement() {
    return this._getNodeFromCompilerNode(this.compilerNode.thenStatement);
  }
  getElseStatement() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.elseStatement
    );
  }
  remove() {
    let e = [];
    tm.isIfStatement(this.getParentOrThrow()) &&
      e.push(this.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.ElseKeyword)),
      e.push(this),
      tr(e);
  }
}
let af = nX(iU);
class am extends af {
  getLabel() {
    return this._getNodeFromCompilerNode(this.compilerNode.label);
  }
  getStatement() {
    return this._getNodeFromCompilerNode(this.compilerNode.statement);
  }
}
let ah = iU;
class ag extends ah {}
let ay = rW(iU);
class av extends ay {}
let ab = rj(iU);
class ax extends ab {
  getCaseBlock() {
    return this._getNodeFromCompilerNode(this.compilerNode.caseBlock);
  }
  getClauses() {
    return this.getCaseBlock().getClauses();
  }
  removeClause(e) {
    return this.getCaseBlock().removeClause(e);
  }
  removeClauses(e) {
    return this.getCaseBlock().removeClauses(e);
  }
}
let aS = rj(iU);
class ak extends aS {}
let aT = iU;
class aE extends aT {
  getTryBlock() {
    return this._getNodeFromCompilerNode(this.compilerNode.tryBlock);
  }
  getCatchClause() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.catchClause);
  }
  getCatchClauseOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getCatchClause(),
      e ?? "Expected to find a catch clause.",
      this
    );
  }
  getFinallyBlock() {
    if (
      null != this.compilerNode.finallyBlock &&
      0 !== this.compilerNode.finallyBlock.getFullWidth()
    )
      return this._getNodeFromCompilerNode(this.compilerNode.finallyBlock);
  }
  getFinallyBlockOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getFinallyBlock(),
      e ?? "Expected to find a finally block.",
      this
    );
  }
}
let aC = rj(nX(iU));
class aA extends aC {
  isExportEquals() {
    return this.compilerNode.isExportEquals || !1;
  }
  setIsExportEquals(e) {
    return (
      this.isExportEquals() === e ||
        (e
          ? this.getFirstChildByKindOrThrow(
              h.SyntaxKind.DefaultKeyword
            ).replaceWithText("=")
          : this.getFirstChildByKindOrThrow(
              h.SyntaxKind.EqualsToken
            ).replaceWithText("default")),
      this
    );
  }
  set(e) {
    return (
      ea(aC.prototype, this, e),
      null != e.expression && this.setExpression(e.expression),
      null != e.isExportEquals && this.setIsExportEquals(e.isExportEquals),
      this
    );
  }
  getStructure() {
    return ei(iU.prototype, this, {
      kind: exports.StructureKind.ExportAssignment,
      expression: this.getExpression().getText(),
      isExportEquals: this.isExportEquals(),
    });
  }
}
let aw = iU;
class aD extends aw {
  isTypeOnly() {
    return this.compilerNode.isTypeOnly;
  }
  setIsTypeOnly(e) {
    return (
      this.isTypeOnly() === e ||
        (e
          ? e4({
              parent: this,
              insertPos: (
                this.getNodeProperty("exportClause") ??
                this.getFirstChildByKindOrThrow(h.SyntaxKind.AsteriskToken)
              ).getStart(),
              newText: "type ",
            })
          : e7({
              children: [
                this.getFirstChildByKindOrThrow(h.ts.SyntaxKind.TypeKeyword),
              ],
              removeFollowingSpaces: !0,
            })),
      this
    );
  }
  getNamespaceExport() {
    let e = this.getNodeProperty("exportClause");
    return null != e && tm.isNamespaceExport(e) ? e : void 0;
  }
  getNamespaceExportOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getNamespaceExport(),
      e ?? "Expected to find a namespace export.",
      this
    );
  }
  setNamespaceExport(e) {
    let t = this.getNodeProperty("exportClause"),
      n = h.StringUtils.isNullOrWhitespace(e) ? "*" : `* as ${e}`;
    return (
      null == t
        ? e4({
            insertPos: this.getFirstChildByKindOrThrow(
              h.SyntaxKind.AsteriskToken
            ).getStart(),
            parent: this,
            newText: n,
            replacing: { textLength: 1 },
          })
        : tm.isNamespaceExport(t)
        ? t.getNameNode().replaceWithText(e)
        : e4({
            insertPos: t.getStart(),
            parent: this,
            newText: n,
            replacing: { textLength: t.getWidth() },
          }),
      this
    );
  }
  setModuleSpecifier(e) {
    let t =
      "string" == typeof e
        ? e
        : this._sourceFile.getRelativePathAsModuleSpecifierTo(e);
    if (h.StringUtils.isNullOrEmpty(t))
      return this.removeModuleSpecifier(), this;
    let n = this.getModuleSpecifier();
    if (null == n) {
      let e = this.getLastChildIfKind(h.SyntaxKind.SemicolonToken),
        n = this._context.manipulationSettings.getQuoteKind();
      e4({
        insertPos: null != e ? e.getPos() : this.getEnd(),
        parent: this,
        newText: ` from ${n}${t}${n}`,
      });
    } else n.setLiteralValue(t);
    return this;
  }
  getModuleSpecifier() {
    let e = this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.moduleSpecifier
    );
    if (null != e) {
      if (!tm.isStringLiteral(e))
        throw new h.errors.InvalidOperationError(
          "Expected the module specifier to be a string literal."
        );
      return e;
    }
  }
  getModuleSpecifierValue() {
    let e = this.getModuleSpecifier();
    return e?.getLiteralValue();
  }
  getModuleSpecifierSourceFileOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getModuleSpecifierSourceFile(),
      e ?? "A module specifier source file was expected.",
      this
    );
  }
  getModuleSpecifierSourceFile() {
    let e = this.getLastChildByKind(h.SyntaxKind.StringLiteral);
    if (null == e) return;
    let t = e.getSymbol();
    if (null == t) return;
    let n = t.getDeclarations()[0];
    return null != n && tm.isSourceFile(n) ? n : void 0;
  }
  isModuleSpecifierRelative() {
    let e = this.getModuleSpecifierValue();
    return null != e && G.isModuleSpecifierRelative(e);
  }
  removeModuleSpecifier() {
    let e = this.getModuleSpecifier();
    if (null == e) return this;
    if (!this.hasNamedExports())
      throw new h.errors.InvalidOperationError(
        "Cannot remove the module specifier from an export declaration that has no named exports."
      );
    return (
      e7({
        children: [
          this.getFirstChildByKindOrThrow(h.SyntaxKind.FromKeyword),
          e,
        ],
        removePrecedingNewLines: !0,
        removePrecedingSpaces: !0,
      }),
      this
    );
  }
  hasModuleSpecifier() {
    return null != this.getLastChildByKind(h.SyntaxKind.StringLiteral);
  }
  isNamespaceExport() {
    return !this.hasNamedExports();
  }
  hasNamedExports() {
    return this.compilerNode.exportClause?.kind === h.SyntaxKind.NamedExports;
  }
  addNamedExport(e) {
    return this.addNamedExports([e])[0];
  }
  addNamedExports(e) {
    return this.insertNamedExports(this.getNamedExports().length, e);
  }
  insertNamedExport(e, t) {
    return this.insertNamedExports(e, [t])[0];
  }
  insertNamedExports(e, t) {
    if (!(t instanceof Function) && h.ArrayUtils.isNullOrEmpty(t)) return [];
    let n = this.getNamedExports(),
      r = this._getWriterWithIndentation(),
      i = this._context.structurePrinterFactory.forNamedImportExportSpecifier();
    e = eD(e, n.length);
    let a = this.getNodeProperty("exportClause");
    return (
      null == a
        ? (i.printTextsWithBraces(r, t),
          e4({
            insertPos: this.getFirstChildByKindOrThrow(
              h.SyntaxKind.AsteriskToken
            ).getStart(),
            parent: this,
            newText: r.toString(),
            replacing: { textLength: 1 },
          }))
        : a.getKind() === h.SyntaxKind.NamespaceExport
        ? (i.printTextsWithBraces(r, t),
          e4({
            insertPos: a.getStart(),
            parent: this,
            newText: r.toString(),
            replacing: { textLength: a.getWidth() },
          }))
        : (i.printTexts(r, t),
          e3({
            parent: this.getFirstChildByKindOrThrow(
              h.SyntaxKind.NamedExports
            ).getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
            currentNodes: n,
            insertIndex: e,
            newText: r.toString(),
            surroundWithSpaces:
              this._context.getFormatCodeSettings()
                .insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces,
            useTrailingCommas: !1,
          })),
      eT(n, this.getNamedExports(), e, !1)
    );
  }
  getNamedExports() {
    let e = this.compilerNode.exportClause;
    return null == e || h.ts.isNamespaceExport(e)
      ? []
      : e.elements.map((e) => this._getNodeFromCompilerNode(e));
  }
  toNamespaceExport() {
    if (!this.hasModuleSpecifier())
      throw new h.errors.InvalidOperationError(
        "Cannot change to a namespace export when no module specifier exists."
      );
    let e = this.getNodeProperty("exportClause");
    return (
      null == e ||
        e4({
          parent: this,
          newText: "*",
          insertPos: e.getStart(),
          replacing: { textLength: e.getWidth() },
        }),
      this
    );
  }
  setAttributes(e) {
    let t = this.getAttributes();
    if (t) e ? t.setElements(e) : t.remove();
    else if (e) {
      let t = this._context.structurePrinterFactory.forImportAttribute(),
        n = this._context.createWriter();
      n.space(),
        t.printAttributes(n, e),
        e4({
          parent: this,
          newText: n.toString(),
          insertPos:
            ";" === this.getSourceFile().getFullText()[this.getEnd() - 1]
              ? this.getEnd() - 1
              : this.getEnd(),
        });
    }
    return this;
  }
  getAttributes() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.attributes);
  }
  set(e) {
    return (
      ea(aw.prototype, this, e),
      null != e.namedExports
        ? ((function (e) {
            let t,
              n = e.getNodeProperty("exportClause");
            if (null != n) {
              if (0 === e.getNamedExports().length) return;
              t = n;
            } else t = e.getFirstChildByKindOrThrow(h.SyntaxKind.AsteriskToken);
            e4({
              parent: e,
              newText: "{ }",
              insertPos: t.getStart(),
              replacing: { textLength: t.getWidth() },
            });
          })(this),
          this.addNamedExports(e.namedExports))
        : e.hasOwnProperty(h.nameof(e, "namedExports")) &&
          null == e.moduleSpecifier &&
          this.toNamespaceExport(),
      null != e.moduleSpecifier
        ? this.setModuleSpecifier(e.moduleSpecifier)
        : e.hasOwnProperty(h.nameof(e, "moduleSpecifier")) &&
          this.removeModuleSpecifier(),
      null == e.namedExports &&
        e.hasOwnProperty(h.nameof(e, "namedExports")) &&
        this.toNamespaceExport(),
      null != e.namespaceExport && this.setNamespaceExport(e.namespaceExport),
      null != e.isTypeOnly && this.setIsTypeOnly(e.isTypeOnly),
      e.hasOwnProperty(h.nameof(e, "attributes")) &&
        this.setAttributes(e.attributes),
      this
    );
  }
  getStructure() {
    let e = this.getModuleSpecifier(),
      t = this.getAttributes();
    return ei(aw.prototype, this, {
      kind: exports.StructureKind.ExportDeclaration,
      isTypeOnly: this.isTypeOnly(),
      moduleSpecifier: e?.getLiteralText(),
      namedExports: this.getNamedExports().map((e) => e.getStructure()),
      namespaceExport: this.getNamespaceExport()?.getName(),
      attributes: t ? t.getElements().map((e) => e.getStructure()) : void 0,
    });
  }
}
let aN = tm;
class aI extends aN {
  setName(e) {
    let t = this.getNameNode();
    return (
      this.getName() === e ||
        (ee(e)
          ? t.replaceWithText(e)
          : t.replaceWithText(`"${e.replaceAll('"', '\\"')}"`)),
      this
    );
  }
  getName() {
    let e = this.getNameNode();
    return e.getKind() === h.ts.SyntaxKind.StringLiteral
      ? e.getLiteralText()
      : e.getText();
  }
  getNameNode() {
    return this._getNodeFromCompilerNode(
      this.compilerNode.propertyName || this.compilerNode.name
    );
  }
  renameAlias(e) {
    if (h.StringUtils.isNullOrWhitespace(e))
      return this.removeAliasWithRename(), this;
    let t = this.getAliasNode();
    return (
      null == t && (this.setAlias(this.getName()), (t = this.getAliasNode())),
      t.getKind() === h.SyntaxKind.Identifier && t.rename(e),
      this
    );
  }
  setAlias(e) {
    if (h.StringUtils.isNullOrWhitespace(e)) return this.removeAlias(), this;
    let t = this.getAliasNode();
    return (
      null == t
        ? e4({
            insertPos: this.getNameNode().getEnd(),
            parent: this,
            newText: ` as ${e}`,
          })
        : ee(e)
        ? t.replaceWithText(e)
        : t.replaceWithText(`"${e.replaceAll('"', '\\"')}"`),
      this
    );
  }
  removeAlias() {
    let e = this.getAliasNode();
    return (
      null == e ||
        e7({
          children: [
            this.getFirstChildByKindOrThrow(h.SyntaxKind.AsKeyword),
            e,
          ],
          removePrecedingSpaces: !0,
          removePrecedingNewLines: !0,
        }),
      this
    );
  }
  removeAliasWithRename() {
    let e = this.getAliasNode();
    return (
      null == e ||
        (e.getKind() === h.SyntaxKind.Identifier && e.rename(this.getName()),
        this.removeAlias()),
      this
    );
  }
  getAliasNode() {
    if (null != this.compilerNode.propertyName)
      return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
  isTypeOnly() {
    return this.compilerNode.isTypeOnly;
  }
  setIsTypeOnly(e) {
    return (
      this.isTypeOnly() === e ||
        (e
          ? e4({
              insertPos: this.getStart(),
              parent: this,
              newText: "type ",
            })
          : e7({
              children: [
                this.getFirstChildByKindOrThrow(h.ts.SyntaxKind.TypeKeyword),
              ],
              removeFollowingSpaces: !0,
            })),
      this
    );
  }
  getExportDeclaration() {
    return this.getFirstAncestorByKindOrThrow(h.SyntaxKind.ExportDeclaration);
  }
  getLocalTargetSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLocalTargetSymbol(),
      e ?? "The export specifier's local target symbol was expected.",
      this
    );
  }
  getLocalTargetSymbol() {
    return this._context.typeChecker.getExportSpecifierLocalTargetSymbol(this);
  }
  getLocalTargetDeclarations() {
    return this.getLocalTargetSymbol()?.getDeclarations() ?? [];
  }
  remove() {
    let e = this.getExportDeclaration();
    e.getNamedExports().length > 1 || null == e.getNamespaceExport()
      ? tn(this)
      : e.toNamespaceExport();
  }
  set(e) {
    return (
      ea(aN.prototype, this, e),
      null != e.isTypeOnly && this.setIsTypeOnly(e.isTypeOnly),
      null != e.name && this.setName(e.name),
      null != e.alias
        ? this.setAlias(e.alias)
        : e.hasOwnProperty(h.nameof(e, "alias")) && this.removeAlias(),
      this
    );
  }
  getStructure() {
    let e = this.getAliasNode();
    return ei(tm.prototype, this, {
      kind: exports.StructureKind.ExportSpecifier,
      alias: e ? e.getText() : void 0,
      name: this.getNameNode().getText(),
      isTypeOnly: this.isTypeOnly(),
    });
  }
}
let aP = rW(tm);
class aM extends aP {
  getReferencedSourceFileOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getReferencedSourceFile(),
      e ?? "Expected to find the referenced source file.",
      this
    );
  }
  isRelative() {
    let e = this.getExpression();
    return (
      null != e &&
      !!tm.isStringLiteral(e) &&
      G.isModuleSpecifierRelative(e.getLiteralText())
    );
  }
  getReferencedSourceFile() {
    let e = this.getExpression();
    if (null == e) return;
    let t = e.getSymbol();
    if (null != t) return G.getReferencedSourceFileFromSymbol(t);
  }
}
let aL = n6(tm);
class aR extends aL {
  getValue() {
    return this._getNodeFromCompilerNode(this.compilerNode.value);
  }
  set(e) {
    return (
      ea(aL.prototype, this, e),
      e.value && this.getValue().replaceWithText(e.value),
      this
    );
  }
  getStructure() {
    return ei(aL.prototype, this, {
      kind: exports.StructureKind.ImportAttribute,
      value: this.getValue().getText(),
    });
  }
}
let aF = tm;
class aO extends aF {
  setElements(e) {
    return (
      this.replaceWithText((t) => {
        this._context.structurePrinterFactory
          .forImportAttribute()
          .printAttributes(t, e);
      }),
      this
    );
  }
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  remove() {
    e7({
      children: [this],
      removePrecedingNewLines: !0,
      removePrecedingSpaces: !0,
    });
  }
}
let aB = tm;
class aW extends aB {
  isTypeOnly() {
    return this.compilerNode.isTypeOnly;
  }
  setIsTypeOnly(e) {
    return (
      this.isTypeOnly() === e ||
        (e
          ? e4({
              parent: this,
              insertPos: this.getStart(),
              newText: "type ",
            })
          : e7({
              children: [
                this.getFirstChildByKindOrThrow(h.ts.SyntaxKind.TypeKeyword),
              ],
              removeFollowingSpaces: !0,
            })),
      this
    );
  }
  getDefaultImportOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getDefaultImport(),
      e ?? "Expected to find a default import.",
      this
    );
  }
  getDefaultImport() {
    return this.getNodeProperty("name");
  }
  getNamedBindingsOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getNamedBindings(),
      e ?? "Expected to find an import declaration's named bindings.",
      this
    );
  }
  getNamedBindings() {
    return this.getNodeProperty("namedBindings");
  }
  getNamespaceImportOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getNamespaceImport(),
      e ?? "Expected to find a namespace import.",
      this
    );
  }
  getNamespaceImport() {
    let e = this.getNamedBindings();
    if (null != e && tm.isNamespaceImport(e)) return e.getNameNode();
  }
  getNamedImports() {
    let e = this.getNamedBindings();
    return null != e && tm.isNamedImports(e) ? e.getElements() : [];
  }
}
let aj = iU;
class az extends aj {
  isTypeOnly() {
    return this.getImportClause()?.isTypeOnly() ?? !1;
  }
  setIsTypeOnly(e) {
    let t = this.getImportClause();
    if (null == t)
      if (!e) return this;
      else
        throw new h.errors.InvalidOperationError(
          "Cannot set an import as type only when there is no import clause."
        );
    return t.setIsTypeOnly(e), this;
  }
  setModuleSpecifier(e) {
    let t =
      "string" == typeof e
        ? e
        : this._sourceFile.getRelativePathAsModuleSpecifierTo(e);
    return this.getModuleSpecifier().setLiteralValue(t), this;
  }
  getModuleSpecifier() {
    let e = this._getNodeFromCompilerNode(this.compilerNode.moduleSpecifier);
    if (!tm.isStringLiteral(e))
      throw new h.errors.InvalidOperationError(
        "Expected the module specifier to be a string literal."
      );
    return e;
  }
  getModuleSpecifierValue() {
    return this.getModuleSpecifier().getLiteralValue();
  }
  getModuleSpecifierSourceFileOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getModuleSpecifierSourceFile(),
      e ?? "A module specifier source file was expected.",
      this
    );
  }
  getModuleSpecifierSourceFile() {
    let e = this.getModuleSpecifier().getSymbol();
    if (null != e) return G.getReferencedSourceFileFromSymbol(e);
  }
  isModuleSpecifierRelative() {
    return G.isModuleSpecifierRelative(this.getModuleSpecifierValue());
  }
  setDefaultImport(e) {
    if (h.StringUtils.isNullOrWhitespace(e)) return this.removeDefaultImport();
    let t = this.getDefaultImport();
    if (null != t) return t.replaceWithText(e), this;
    let n = this.getFirstChildByKindOrThrow(h.SyntaxKind.ImportKeyword),
      r = this.getImportClause();
    return (
      null == r
        ? e4({ insertPos: n.getEnd(), parent: this, newText: ` ${e} from` })
        : e4({ insertPos: n.getEnd(), parent: r, newText: ` ${e},` }),
      this
    );
  }
  renameDefaultImport(e) {
    if (h.StringUtils.isNullOrWhitespace(e)) return this.removeDefaultImport();
    let t = this.getDefaultImport();
    return null != t ? t.rename(e) : this.setDefaultImport(e), this;
  }
  getDefaultImportOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getDefaultImport(),
      e ?? "Expected to find a default import.",
      this
    );
  }
  getDefaultImport() {
    return this.getImportClause()?.getDefaultImport() ?? void 0;
  }
  setNamespaceImport(e) {
    if (h.StringUtils.isNullOrWhitespace(e))
      return this.removeNamespaceImport();
    let t = this.getNamespaceImport();
    if (null != t) return t.rename(e), this;
    if (this.getNamedImports().length > 0)
      throw new h.errors.InvalidOperationError(
        "Cannot add a namespace import to an import declaration that has named imports."
      );
    let n = this.getDefaultImport();
    return (
      null != n
        ? e4({
            insertPos: n.getEnd(),
            parent: this.getImportClause(),
            newText: `, * as ${e}`,
          })
        : e4({
            insertPos: this.getFirstChildByKindOrThrow(
              h.SyntaxKind.ImportKeyword
            ).getEnd(),
            parent: this,
            newText: ` * as ${e} from`,
          }),
      this
    );
  }
  removeNamespaceImport() {
    let e = this.getNamespaceImport();
    return (
      null == e ||
        e7({
          children: function () {
            let t = this.getDefaultImport();
            return null == t
              ? [
                  this.getImportClauseOrThrow(),
                  this.getLastChildByKindOrThrow(h.SyntaxKind.FromKeyword),
                ]
              : [t.getNextSiblingIfKindOrThrow(h.SyntaxKind.CommaToken), e];
          }.call(this),
          removePrecedingSpaces: !0,
          removePrecedingNewLines: !0,
        }),
      this
    );
  }
  removeDefaultImport() {
    let e = this.getImportClause();
    if (null == e) return this;
    let t = e.getDefaultImport();
    return (
      null == t ||
        (null == e.getNamedBindings()
          ? e.isTypeOnly()
            ? e4({
                parent: e,
                newText: "{}",
                insertPos: t.getStart(),
                replacing: { textLength: t.getWidth() },
              })
            : e7({
                children: [
                  e,
                  e.getNextSiblingIfKindOrThrow(h.SyntaxKind.FromKeyword),
                ],
                removePrecedingSpaces: !0,
                removePrecedingNewLines: !0,
              })
          : e7({
              children: [
                t,
                t.getNextSiblingIfKindOrThrow(h.SyntaxKind.CommaToken),
              ],
              removePrecedingSpaces: !0,
              removePrecedingNewLines: !0,
            })),
      this
    );
  }
  getNamespaceImportOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getNamespaceImport(),
      e ?? "Expected to find a namespace import.",
      this
    );
  }
  getNamespaceImport() {
    return this.getImportClause()?.getNamespaceImport() ?? void 0;
  }
  addNamedImport(e) {
    return this.addNamedImports([e])[0];
  }
  addNamedImports(e) {
    return this.insertNamedImports(this.getNamedImports().length, e);
  }
  insertNamedImport(e, t) {
    return this.insertNamedImports(e, [t])[0];
  }
  insertNamedImports(e, t) {
    if (!(t instanceof Function) && h.ArrayUtils.isNullOrEmpty(t)) return [];
    let n = this.getNamedImports(),
      r = this._getWriterWithQueuedIndentation(),
      i = this._context.structurePrinterFactory.forNamedImportExportSpecifier(),
      a = this.getImportClause();
    if (((e = eD(e, n.length)), 0 === n.length))
      if ((i.printTextsWithBraces(r, t), null == a))
        e4({
          insertPos: this.getFirstChildByKindOrThrow(
            h.SyntaxKind.ImportKeyword
          ).getEnd(),
          parent: this,
          newText: ` ${r.toString()} from`,
        });
      else if (null != this.getNamespaceImport()) throw aV();
      else if (null != a.getNamedBindings()) {
        let e = a.getNamedBindingsOrThrow();
        e4({
          insertPos: e.getStart(),
          replacing: { textLength: e.getWidth() },
          parent: a,
          newText: r.toString(),
        });
      } else
        e4({
          insertPos: this.getDefaultImport().getEnd(),
          parent: a,
          newText: `, ${r.toString()}`,
        });
    else {
      if (null == a)
        throw new h.errors.NotImplementedError(
          "Expected to have an import clause."
        );
      i.printTexts(r, t),
        e3({
          parent: a
            .getFirstChildByKindOrThrow(h.SyntaxKind.NamedImports)
            .getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
          currentNodes: n,
          insertIndex: e,
          newText: r.toString(),
          surroundWithSpaces:
            this._context.getFormatCodeSettings()
              .insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces,
          useTrailingCommas: !1,
        });
    }
    return eT(n, this.getNamedImports(), e, !1);
  }
  getNamedImports() {
    return this.getImportClause()?.getNamedImports() ?? [];
  }
  removeNamedImports() {
    let e = this.getImportClause();
    if (null == e) return this;
    let t = e.getNamedBindings();
    if (null == t || t.getKind() !== h.SyntaxKind.NamedImports) return this;
    let n = this.getDefaultImport();
    if (null != n)
      return (
        e7({
          children: [n.getNextSiblingIfKindOrThrow(h.SyntaxKind.CommaToken), t],
        }),
        this
      );
    let r = e.getNextSiblingIfKindOrThrow(h.SyntaxKind.FromKeyword);
    return e7({ children: [e, r], removePrecedingSpaces: !0 }), this;
  }
  getImportClauseOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getImportClause(),
      e ?? "Expected to find an import clause.",
      this
    );
  }
  getImportClause() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.importClause
    );
  }
  setAttributes(e) {
    let t = this.getAttributes();
    if (t) e ? t.setElements(e) : t.remove();
    else if (e) {
      let t = this._context.structurePrinterFactory.forImportAttribute(),
        n = this._context.createWriter();
      n.space(),
        t.printAttributes(n, e),
        e4({
          parent: this,
          newText: n.toString(),
          insertPos:
            ";" === this.getSourceFile().getFullText()[this.getEnd() - 1]
              ? this.getEnd() - 1
              : this.getEnd(),
        });
    }
    return this;
  }
  getAttributes() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.attributes);
  }
  set(e) {
    return (
      ea(aj.prototype, this, e),
      null != e.defaultImport
        ? this.setDefaultImport(e.defaultImport)
        : e.hasOwnProperty(h.nameof(e, "defaultImport")) &&
          this.removeDefaultImport(),
      e.hasOwnProperty(h.nameof(e, "namedImports")) &&
        this.removeNamedImports(),
      null != e.namespaceImport
        ? this.setNamespaceImport(e.namespaceImport)
        : e.hasOwnProperty(h.nameof(e, "namespaceImport")) &&
          this.removeNamespaceImport(),
      null != e.namedImports &&
        ((function (e) {
          let t = e.getNodeProperty("importClause"),
            n = e._getWriterWithQueuedChildIndentation();
          e._context.structurePrinterFactory
            .forNamedImportExportSpecifier()
            .printTextsWithBraces(n, []);
          let r = n.toString();
          if (null != e.getNamespaceImport()) throw aV();
          if (null == t)
            return e4({
              insertPos: e
                .getFirstChildByKindOrThrow(h.SyntaxKind.ImportKeyword)
                .getEnd(),
              parent: e,
              newText: ` ${r} from`,
            });
          let i = t.getNamedBindings();
          if (null != i)
            return e4({
              parent: t,
              newText: r,
              insertPos: i.getStart(),
              replacing: { textLength: i.getWidth() },
            });
          let a = t.getDefaultImport();
          null != a &&
            e4({ insertPos: a.getEnd(), parent: t, newText: `, ${r}` });
        })(this),
        this.addNamedImports(e.namedImports)),
      null != e.moduleSpecifier && this.setModuleSpecifier(e.moduleSpecifier),
      null != e.isTypeOnly && this.setIsTypeOnly(e.isTypeOnly),
      e.hasOwnProperty(h.nameof(e, "attributes")) &&
        this.setAttributes(e.attributes),
      this
    );
  }
  getStructure() {
    let e = this.getNamespaceImport(),
      t = this.getDefaultImport(),
      r = this.getAttributes();
    return ei(aj.prototype, this, {
      kind: exports.StructureKind.ImportDeclaration,
      isTypeOnly: this.isTypeOnly(),
      defaultImport: t ? t.getText() : void 0,
      moduleSpecifier: this.getModuleSpecifier().getLiteralText(),
      namedImports: this.getNamedImports().map((e) => e.getStructure()),
      namespaceImport: e ? e.getText() : void 0,
      attributes: r ? r.getElements().map((e) => e.getStructure()) : void 0,
    });
  }
}
function aV() {
  return new h.errors.InvalidOperationError(
    "Cannot add a named import to an import declaration that has a namespace import."
  );
}
let aG = tM(nQ(nX(n9(iU))));
class aK extends aG {
  isTypeOnly() {
    return this.compilerNode.isTypeOnly ?? !1;
  }
  setIsTypeOnly(e) {
    return (
      this.isTypeOnly() === e ||
        (e
          ? e4({
              parent: this,
              insertPos: this.getNameNode().getStart(),
              newText: "type ",
            })
          : e7({
              children: [
                this.getFirstChildByKindOrThrow(h.ts.SyntaxKind.TypeKeyword),
              ],
              removeFollowingSpaces: !0,
            })),
      this
    );
  }
  getModuleReference() {
    return this._getNodeFromCompilerNode(this.compilerNode.moduleReference);
  }
  isExternalModuleReferenceRelative() {
    let e = this.getModuleReference();
    return !!tm.isExternalModuleReference(e) && e.isRelative();
  }
  setExternalModuleReference(e) {
    let t =
        "string" == typeof e
          ? e
          : this._sourceFile.getRelativePathAsModuleSpecifierTo(e),
      n = this.getModuleReference();
    return (
      tm.isExternalModuleReference(n) && null != n.getExpression()
        ? n.getExpressionOrThrow().replaceWithText((e) => e.quote(t))
        : n.replaceWithText((e) => e.write("require(").quote(t).write(")")),
      this
    );
  }
  getExternalModuleReferenceSourceFileOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getExternalModuleReferenceSourceFile(),
      e ??
        "Expected to find an external module reference's referenced source file.",
      this
    );
  }
  getExternalModuleReferenceSourceFile() {
    let e = this.getModuleReference();
    if (tm.isExternalModuleReference(e)) return e.getReferencedSourceFile();
  }
}
let aU = tm;
class aH extends aU {
  setName(e) {
    let t = this.getNameNode();
    return (
      this.getName() === e ||
        (ee(e)
          ? t.replaceWithText(e)
          : t.replaceWithText(`"${e.replaceAll('"', '\\"')}"`)),
      this
    );
  }
  getName() {
    let e = this.getNameNode();
    return e.getKind() === h.ts.SyntaxKind.StringLiteral
      ? e.getLiteralText()
      : e.getText();
  }
  getNameNode() {
    return this._getNodeFromCompilerNode(
      this.compilerNode.propertyName ?? this.compilerNode.name
    );
  }
  renameAlias(e) {
    if (h.StringUtils.isNullOrWhitespace(e))
      return this.removeAliasWithRename(), this;
    let t = this.getAliasNode();
    return (
      null == t && (this.setAlias(this.getName()), (t = this.getAliasNode())),
      t.rename(e),
      this
    );
  }
  setAlias(e) {
    if (h.StringUtils.isNullOrWhitespace(e)) return this.removeAlias(), this;
    let t = this.getAliasNode();
    return (
      null == t
        ? e4({
            insertPos: this.getNameNode().getEnd(),
            parent: this,
            newText: ` as ${e}`,
          })
        : t.replaceWithText(e),
      this
    );
  }
  removeAlias() {
    let e = this.getAliasNode();
    return (
      null == e ||
        e7({
          children: [
            this.getFirstChildByKindOrThrow(h.SyntaxKind.AsKeyword),
            e,
          ],
          removePrecedingSpaces: !0,
          removePrecedingNewLines: !0,
        }),
      this
    );
  }
  removeAliasWithRename() {
    let e = this.getAliasNode();
    return null == e || (e.rename(this.getName()), this.removeAlias()), this;
  }
  getAliasNode() {
    if (null != this.compilerNode.propertyName)
      return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
  isTypeOnly() {
    return this.compilerNode.isTypeOnly;
  }
  setIsTypeOnly(e) {
    return (
      this.isTypeOnly() === e ||
        (e
          ? e4({
              insertPos: this.getStart(),
              parent: this,
              newText: "type ",
            })
          : e7({
              children: [
                this.getFirstChildByKindOrThrow(h.ts.SyntaxKind.TypeKeyword),
              ],
              removeFollowingSpaces: !0,
            })),
      this
    );
  }
  getImportDeclaration() {
    return this.getFirstAncestorByKindOrThrow(h.SyntaxKind.ImportDeclaration);
  }
  remove() {
    let e = this.getImportDeclaration();
    e.getNamedImports().length > 1 ||
    (null == e.getNamespaceImport() && null == e.getDefaultImport())
      ? tn(this)
      : e.removeNamedImports();
  }
  set(e) {
    return (
      ea(aU.prototype, this, e),
      null != e.isTypeOnly && this.setIsTypeOnly(e.isTypeOnly),
      null != e.name && this.setName(e.name),
      null != e.alias
        ? this.setAlias(e.alias)
        : e.hasOwnProperty(h.nameof(e, "alias")) && this.removeAlias(),
      this
    );
  }
  getStructure() {
    let e = this.getAliasNode();
    return ei(aU.prototype, this, {
      kind: exports.StructureKind.ImportSpecifier,
      name: this.getName(),
      alias: e ? e.getText() : void 0,
      isTypeOnly: this.isTypeOnly(),
    });
  }
}
let aq = iH(iU);
class aJ extends aq {}
function a$(e) {
  return class extends e {
    getParentModuleOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getParentModule(),
        e ?? "Expected to find the parent module declaration.",
        this
      );
    }
    getParentModule() {
      let e = this.getParentOrThrow();
      if (tm.isModuleBlock(e)) {
        for (
          ;
          e.getParentOrThrow().getKind() === h.SyntaxKind.ModuleDeclaration;

        )
          e = e.getParentOrThrow();
        return e;
      }
    }
  };
}
(exports.ModuleDeclarationKind = void 0),
  ((d =
    exports.ModuleDeclarationKind ||
    (exports.ModuleDeclarationKind = {})).Namespace = "namespace"),
  (d.Module = "module"),
  (d.Global = "global");
let aX = nZ(rx(r_(tE(a$(iH(nX(eo(tM(nQ(n8(iU)))))))))));
class aY extends aX {
  getName() {
    let e = this.getNameNodes();
    return e instanceof Array
      ? e.map((e) => e.getText()).join(".")
      : e.getText();
  }
  setName(e) {
    let t =
      "Please open an issue if you really need this and I'll up the priority.";
    if (e.indexOf(".") >= 0)
      throw new h.errors.NotImplementedError(
        `Not implemented to set a namespace name to a name containing a period. ${t}`
      );
    let r = this.getNameNodes();
    if (r instanceof Array) {
      var i;
      if (r.length > 1)
        throw new h.errors.NotImplementedError(
          `Not implemented to set a namespace name that uses dot notation. ${t}`
        );
      "global" !== e && aQ(this),
        h.StringUtils.isQuoted(e) &&
          ((i = this),
          i.hasNamespaceKeyword() &&
            i.setDeclarationKind(exports.ModuleDeclarationKind.Module),
          i.hasDeclareKeyword() || i.setHasDeclareKeyword(!0)),
        r[0].replaceWithText(e);
    } else r.replaceWithText(e);
    return this;
  }
  rename(e, t) {
    if (e.indexOf(".") >= 0)
      throw new h.errors.NotSupportedError(
        "Cannot rename a namespace name to a name containing a period."
      );
    let n = this.getNameNodes();
    if (n instanceof Array) {
      if (n.length > 1)
        throw new h.errors.NotSupportedError(
          `Cannot rename a namespace name that uses dot notation. Rename the individual nodes via .${h.nameof(
            this,
            "getNameNodes"
          )}()`
        );
      "global" !== e && aQ(this), n[0].rename(e, t);
    } else tS(n, h.StringUtils.stripQuotes(e), t);
    return this;
  }
  getNameNodes() {
    let e = this.getNameNode();
    if (tm.isStringLiteral(e)) return e;
    {
      let e = [],
        t = this;
      do
        e.push(this._getNodeFromCompilerNode(t.compilerNode.name)),
          (t = t.getFirstChildByKind(h.SyntaxKind.ModuleDeclaration));
      while (null != t);
      return e;
    }
  }
  hasNamespaceKeyword() {
    return (
      this.getDeclarationKind() === exports.ModuleDeclarationKind.Namespace
    );
  }
  hasModuleKeyword() {
    return this.getDeclarationKind() === exports.ModuleDeclarationKind.Module;
  }
  setDeclarationKind(e) {
    if (this.getDeclarationKind() === e) return this;
    if (e === exports.ModuleDeclarationKind.Global) {
      let e = this.getDeclarationKindKeyword();
      this.getNameNode().replaceWithText("global"),
        null != e &&
          e7({
            children: [e],
            removeFollowingNewLines: !0,
            removeFollowingSpaces: !0,
          });
    } else {
      let t = this.getDeclarationKindKeyword();
      null != t
        ? t.replaceWithText(e)
        : e4({
            parent: this,
            insertPos: this.getNameNode().getStart(),
            newText: e + " ",
          });
    }
    return this;
  }
  getDeclarationKind() {
    let e = this.getFlags();
    return (e & h.ts.NodeFlags.GlobalAugmentation) != 0
      ? exports.ModuleDeclarationKind.Global
      : (e & h.ts.NodeFlags.Namespace) != 0
      ? exports.ModuleDeclarationKind.Namespace
      : exports.ModuleDeclarationKind.Module;
  }
  getDeclarationKindKeyword() {
    return this.getFirstChild(
      (e) =>
        e.getKind() === h.SyntaxKind.NamespaceKeyword ||
        e.getKind() === h.SyntaxKind.ModuleKeyword
    );
  }
  set(e) {
    return (
      null != e.name && "global" !== e.name && aQ(this),
      ea(aX.prototype, this, e),
      null != e.declarationKind && this.setDeclarationKind(e.declarationKind),
      this
    );
  }
  getStructure() {
    return ei(aX.prototype, this, {
      kind: exports.StructureKind.Module,
      declarationKind: this.getDeclarationKind(),
    });
  }
  _getInnerBody() {
    let e = this.getBody();
    for (; null != e && tm.isBodyable(e) && null == e.compilerNode.statements; )
      e = e.getBody();
    return e;
  }
}
function aQ(e) {
  e.getDeclarationKind() === exports.ModuleDeclarationKind.Global &&
    e.setDeclarationKind(exports.ModuleDeclarationKind.Namespace);
}
let aZ = tm;
class a0 extends aZ {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
let a1 = tm;
class a2 extends a1 {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
let a4 = n4(tm);
class a3 extends a4 {
  setName(e) {
    let t = this.getNameNode();
    return (
      this.getName() === e ||
        (ee(e)
          ? t.replaceWithText(e)
          : t.replaceWithText(`"${e.replaceAll('"', '\\"')}"`)),
      this
    );
  }
  getName() {
    let e = this.getNameNode();
    return e.getKind() === h.ts.SyntaxKind.StringLiteral
      ? e.getLiteralText()
      : e.getText();
  }
  getNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
}
let a6 = n4(tm);
class a8 extends a6 {
  setName(e) {
    let t = this.getNameNode();
    return t.getText() === e || t.replaceWithText(e), this;
  }
  getName() {
    return this.getNameNode().getText();
  }
  getNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
}
class a5 extends t_ {
  constructor(e, t) {
    super(e, t);
  }
  getFileName() {
    return this.compilerObject.fileName;
  }
}
function a7(e, t, n, r) {
  var i,
    a = arguments.length,
    o =
      a < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
    o = Reflect.decorate(e, t, n, r);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (i = e[s]) && (o = (a < 3 ? i(o) : a > 3 ? i(t, n, o) : i(t, n)) || o);
  return a > 3 && o && Object.defineProperty(t, n, o), o;
}
(exports.FileSystemRefreshResult = void 0),
  ((u =
    exports.FileSystemRefreshResult || (exports.FileSystemRefreshResult = {}))[
    (u.NoChange = 0)
  ] = "NoChange"),
  (u[(u.Updated = 1)] = "Updated"),
  (u[(u.Deleted = 2)] = "Deleted"),
  "function" == typeof SuppressedError && SuppressedError;
let a9 = nZ(r_(iH(tm)));
class oe extends a9 {
  #t0 = !1;
  #eE = new h.EventContainer();
  #t1 = new h.EventContainer();
  _referenceContainer = new en(this);
  #t2;
  #t4;
  #t3;
  _hasBom;
  constructor(e, t) {
    super(e, t, void 0), (this.__sourceFile = this);
    const n = () => {
      this.isFromExternalLibrary(), this.#t1.unsubscribe(n);
    };
    this.#t1.subscribe(n);
  }
  _replaceCompilerNodeFromFactory(e) {
    super._replaceCompilerNodeFromFactory(e),
      this._context.resetProgram(),
      (this.#t0 = !1),
      this.#eE.fire(this);
  }
  _clearInternals() {
    function e(e) {
      e?.forEach((e) => e._forget());
    }
    super._clearInternals(),
      e(this.#t2),
      e(this.#t3),
      e(this.#t4),
      (this.#t2 = void 0),
      (this.#t3 = void 0),
      (this.#t4 = void 0);
  }
  getFilePath() {
    return this.compilerNode.fileName;
  }
  getBaseName() {
    return h.FileUtils.getBaseName(this.getFilePath());
  }
  getBaseNameWithoutExtension() {
    let e = this.getBaseName(),
      t = this.getExtension();
    return e.substring(0, e.length - t.length);
  }
  getExtension() {
    return h.FileUtils.getExtension(this.getFilePath());
  }
  getDirectory() {
    return this._context.compilerFactory.getDirectoryFromCache(
      this.getDirectoryPath()
    );
  }
  getDirectoryPath() {
    return this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      h.FileUtils.getDirPath(this.compilerNode.fileName)
    );
  }
  getFullText() {
    return this.compilerNode.text;
  }
  getLineAndColumnAtPos(e) {
    let t = this.getFullText();
    return {
      line: h.StringUtils.getLineNumberAtPos(t, e),
      column: h.StringUtils.getLengthFromLineStartAtPos(t, e) + 1,
    };
  }
  getLengthFromLineStartAtPos(e) {
    return h.StringUtils.getLengthFromLineStartAtPos(this.getFullText(), e);
  }
  copyToDirectory(e, t) {
    let n = "string" == typeof e ? e : e.getPath();
    return this.copy(h.FileUtils.pathJoin(n, this.getBaseName()), t);
  }
  copy(e, t = {}) {
    this._throwIfIsInMemoryLibFile();
    let n = this._copyInternal(e, t);
    return !1 === n
      ? this
      : (n.getDirectoryPath() !== this.getDirectoryPath() &&
          n._updateReferencesForCopyInternal(
            this._getReferencesForCopyInternal()
          ),
        n);
  }
  _copyInternal(e, t = {}) {
    let { overwrite: n = !1 } = t,
      { compilerFactory: r, fileSystemWrapper: i } = this._context,
      a = i.getStandardizedAbsolutePath(e, this.getDirectoryPath());
    return (
      a !== this.getFilePath() &&
      (function (e) {
        try {
          return r.createSourceFileFromText(a, e.getFullText(), {
            overwrite: n,
            markInProject: (function () {
              if (e._isInProject()) return !0;
              let t = r.getSourceFileFromCacheFromFilePath(a);
              return null != t && t._isInProject();
            })(),
          });
        } catch (e) {
          if (e instanceof h.errors.InvalidOperationError)
            throw new h.errors.InvalidOperationError(
              "Did you mean to provide the overwrite option? " + e.message
            );
          throw e;
        }
      })(this)
    );
  }
  _getReferencesForCopyInternal() {
    return Array.from(
      this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries()
    );
  }
  _updateReferencesForCopyInternal(e) {
    for (let t of e)
      t[0] = this.getChildSyntaxListOrThrow().getDescendantAtStartWithWidth(
        t[0].getStart(),
        t[0].getWidth()
      );
    ot(e);
  }
  async copyImmediately(e, t) {
    let n = this.copy(e, t);
    return await n.save(), n;
  }
  copyImmediatelySync(e, t) {
    let n = this.copy(e, t);
    return n.saveSync(), n;
  }
  moveToDirectory(e, t) {
    let n = "string" == typeof e ? e : e.getPath();
    return this.move(h.FileUtils.pathJoin(n, this.getBaseName()), t);
  }
  move(e, t = {}) {
    this._throwIfIsInMemoryLibFile();
    let n = this.getDirectoryPath(),
      r = this._getReferencesForMoveInternal(),
      i = this.getFilePath();
    return (
      this._moveInternal(e, t) &&
        (this._context.fileSystemWrapper.queueFileDelete(i),
        this._updateReferencesForMoveInternal(r, n),
        this._context.lazyReferenceCoordinator.clearDirtySourceFiles(),
        this._context.lazyReferenceCoordinator.addDirtySourceFile(this)),
      this
    );
  }
  _moveInternal(e, t = {}) {
    let { overwrite: n = !1 } = t,
      r = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getDirectoryPath()
      );
    if (r === this.getFilePath()) return !1;
    let i = !1;
    if (n) {
      let e =
        this._context.compilerFactory.getSourceFileFromCacheFromFilePath(r);
      null != e && ((i = e._isInProject()), e.forget());
    } else
      this._context.compilerFactory.throwIfFileExists(
        r,
        "Did you mean to provide the overwrite option?"
      );
    return (
      ts({ newFilePath: r, sourceFile: this }),
      i && this._markAsInProject(),
      this._isInProject() && this.getDirectory()._markAsInProject(),
      !0
    );
  }
  _getReferencesForMoveInternal() {
    return {
      literalReferences: Array.from(
        this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries()
      ),
      referencingLiterals: Array.from(
        this._referenceContainer.getReferencingLiteralsInOtherSourceFiles()
      ),
    };
  }
  _updateReferencesForMoveInternal(e, t) {
    let { literalReferences: n, referencingLiterals: r } = e;
    t !== this.getDirectoryPath() && ot(n), ot(r.map((e) => [e, this]));
  }
  async moveImmediately(e, t) {
    let n = this.getFilePath(),
      r = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getDirectoryPath()
      );
    return (
      this.move(e, t),
      n !== r
        ? (await this._context.fileSystemWrapper.moveFileImmediately(
            n,
            r,
            this.getFullText()
          ),
          (this.#t0 = !0))
        : await this.save(),
      this
    );
  }
  moveImmediatelySync(e, t) {
    let n = this.getFilePath(),
      r = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getDirectoryPath()
      );
    return (
      this.move(e, t),
      n !== r
        ? (this._context.fileSystemWrapper.moveFileImmediatelySync(
            n,
            r,
            this.getFullText()
          ),
          (this.#t0 = !0))
        : this.saveSync(),
      this
    );
  }
  delete() {
    this._throwIfIsInMemoryLibFile();
    let e = this.getFilePath();
    this.forget(), this._context.fileSystemWrapper.queueFileDelete(e);
  }
  async deleteImmediately() {
    this._throwIfIsInMemoryLibFile();
    let e = this.getFilePath();
    this.forget(),
      await this._context.fileSystemWrapper.deleteFileImmediately(e);
  }
  deleteImmediatelySync() {
    this._throwIfIsInMemoryLibFile();
    let e = this.getFilePath();
    this.forget(), this._context.fileSystemWrapper.deleteFileImmediatelySync(e);
  }
  async save() {
    this._isLibFileInMemory() ||
      (await this._context.fileSystemWrapper.writeFile(
        this.getFilePath(),
        this.#t6()
      ),
      (this.#t0 = !0));
  }
  saveSync() {
    this._isLibFileInMemory() ||
      (this._context.fileSystemWrapper.writeFileSync(
        this.getFilePath(),
        this.#t6()
      ),
      (this.#t0 = !0));
  }
  #t6() {
    let e = this.getFullText();
    return this._hasBom ? "\uFEFF" + e : e;
  }
  getPathReferenceDirectives() {
    return (
      null == this.#t2 &&
        (this.#t2 = (this.compilerNode.referencedFiles || []).map(
          (e) => new a5(e, this)
        )),
      this.#t2
    );
  }
  getTypeReferenceDirectives() {
    return (
      null == this.#t3 &&
        (this.#t3 = (this.compilerNode.typeReferenceDirectives || []).map(
          (e) => new a5(e, this)
        )),
      this.#t3
    );
  }
  getLibReferenceDirectives() {
    return (
      null == this.#t4 &&
        (this.#t4 = (this.compilerNode.libReferenceDirectives || []).map(
          (e) => new a5(e, this)
        )),
      this.#t4
    );
  }
  getReferencingSourceFiles() {
    return Array.from(this._referenceContainer.getDependentSourceFiles());
  }
  getReferencingNodesInOtherSourceFiles() {
    let e = this.getReferencingLiteralsInOtherSourceFiles();
    return Array.from(
      (function* () {
        for (let t of e) yield on(t);
      })()
    );
  }
  getReferencingLiteralsInOtherSourceFiles() {
    return Array.from(
      this._referenceContainer.getReferencingLiteralsInOtherSourceFiles()
    );
  }
  getReferencedSourceFiles() {
    let e =
      this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries();
    return Array.from(
      new Set(
        (function* () {
          for (let [, t] of e) yield t;
        })()
      ).values()
    );
  }
  getNodesReferencingOtherSourceFiles() {
    let e =
      this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries();
    return Array.from(
      (function* () {
        for (let [t] of e) yield on(t);
      })()
    );
  }
  getLiteralsReferencingOtherSourceFiles() {
    let e =
      this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries();
    return Array.from(
      (function* () {
        for (let [t] of e) yield t;
      })()
    );
  }
  getImportStringLiterals() {
    return (
      this._ensureBound(),
      (this.compilerNode.imports || [])
        .filter((e) => -1 !== e.pos)
        .map((e) => this._getNodeFromCompilerNode(e))
    );
  }
  getLanguageVersion() {
    return this.compilerNode.languageVersion;
  }
  getLanguageVariant() {
    return this.compilerNode.languageVariant;
  }
  getScriptKind() {
    return this.compilerNode.scriptKind;
  }
  isDeclarationFile() {
    return this.compilerNode.isDeclarationFile;
  }
  isFromExternalLibrary() {
    return (
      !!this._context.program._isCompilerProgramCreated() &&
      this._context.program.compilerObject.isSourceFileFromExternalLibrary(
        this.compilerNode
      )
    );
  }
  isInNodeModules() {
    return this.getFilePath().indexOf("/node_modules/") >= 0;
  }
  isSaved() {
    return this.#t0 && !this._isLibFileInMemory();
  }
  _setIsSaved(e) {
    this.#t0 = e;
  }
  getPreEmitDiagnostics() {
    return this._context.getPreEmitDiagnostics(this);
  }
  unindent(e, t = 1) {
    return this.indent(e, -1 * t);
  }
  indent(e, t = 1) {
    if (0 === t) return this;
    let n = this.getFullText(),
      r = "number" == typeof e ? [e, e] : e;
    h.errors.throwIfRangeOutOfRange(r, [0, n.length], "positionRange");
    let i = eg(n, r[0], (e) => 10 === e),
      a = eh(n, r[1], (e) => 13 === e || 10 === e),
      o = h.StringUtils.indent(n.substring(i, a), t, {
        indentText: this._context.manipulationSettings.getIndentationText(),
        indentSizeInSpaces:
          this._context.manipulationSettings._getIndentSizeInSpaces(),
        isInStringAtPos: (e) => this.isInStringAtPos(e + i),
      });
    return (
      to({
        sourceFile: this,
        newText: n.substring(0, i) + o + n.substring(a),
      }),
      this
    );
  }
  emit(e) {
    return this._context.program.emit({ targetSourceFile: this, ...e });
  }
  emitSync(e) {
    return this._context.program.emitSync({ targetSourceFile: this, ...e });
  }
  getEmitOutput(e = {}) {
    return this._context.languageService.getEmitOutput(
      this,
      e.emitOnlyDtsFiles || !1
    );
  }
  formatText(e = {}) {
    to({
      sourceFile: this,
      newText: this._context.languageService.getFormattedDocumentText(
        this.getFilePath(),
        e
      ),
    });
  }
  async refreshFromFileSystem() {
    let e = await this._context.fileSystemWrapper.readFileOrNotExists(
      this.getFilePath(),
      this._context.getEncoding()
    );
    return this.#t8(e);
  }
  refreshFromFileSystemSync() {
    let e = this._context.fileSystemWrapper.readFileOrNotExistsSync(
      this.getFilePath(),
      this._context.getEncoding()
    );
    return this.#t8(e);
  }
  getRelativePathTo(e) {
    return this.getDirectory().getRelativePathTo(e);
  }
  getRelativePathAsModuleSpecifierTo(e) {
    return this.getDirectory().getRelativePathAsModuleSpecifierTo(e);
  }
  onModified(e, t = !0) {
    return t ? this.#eE.subscribe(e) : this.#eE.unsubscribe(e), this;
  }
  _doActionPreNextModification(e) {
    let t = () => {
      e(), this.#t1.unsubscribe(t);
    };
    return this.#t1.subscribe(t), this;
  }
  _firePreModified() {
    this.#t1.fire(this);
  }
  organizeImports(e = {}, t = {}) {
    return (
      this._context.languageService
        .organizeImports(this, e, t)
        .forEach((e) => e.applyChanges()),
      this
    );
  }
  fixUnusedIdentifiers(e = {}, t = {}) {
    return (
      this._context.languageService
        .getCombinedCodeFix(this, "unusedIdentifier_delete", e, t)
        .applyChanges(),
      this._context.languageService
        .getCombinedCodeFix(this, "unusedIdentifier_deleteImports", e, t)
        .applyChanges(),
      this
    );
  }
  fixMissingImports(e = {}, t = {}) {
    let n = this._context.languageService.getCombinedCodeFix(
        this,
        "fixMissingImport",
        e,
        t
      ),
      r = this;
    for (let e of n.getChanges()) {
      let t = e.getTextChanges();
      (function (e) {
        e.sort((e, t) => e.getSpan().getStart() - t.getSpan().getStart());
        for (let t = 0; t < e.length - 1; t++) {
          let { compilerObject: n } = e[t];
          n.newText = n.newText.replace(/(\r?)\n\r?\n$/, "$1\n");
        }
      })(t),
        (function (e) {
          let t = h.ArrayUtils.groupBy(e, (e) => e.getSpan().getStart()),
            n = 0;
          for (let e of t) {
            let t = e[0].getSpan().getStart() + n,
              i = e.map((e) => e.getNewText()).join("");
            !(function (e) {
              let { insertPos: t, newText: n, sourceFile: r } = e;
              e2(
                r,
                new eJ({ insertPos: t, newText: n }),
                new eG().getForRange({
                  sourceFile: r,
                  start: t,
                  end: t + n.length,
                })
              );
            })({ sourceFile: r, insertPos: t, newText: i }),
              (n += i.length);
          }
        })(t);
    }
    return this;
  }
  applyTextChanges(e) {
    return (
      0 === e.length ||
        (this.forgetDescendants(),
        ta({
          sourceFile: this._sourceFile,
          start: 0,
          replacingLength: this.getFullWidth(),
          newText: ep(this, e),
        })),
      this
    );
  }
  set(e) {
    return ea(a9.prototype, this, e), this;
  }
  getStructure() {
    return ei(a9.prototype, this, { kind: exports.StructureKind.SourceFile });
  }
  #t8(e) {
    return !1 === e
      ? (this.forget(), exports.FileSystemRefreshResult.Deleted)
      : e === this.getFullText()
      ? exports.FileSystemRefreshResult.NoChange
      : (this.replaceText([0, this.getEnd()], e),
        this._setIsSaved(!0),
        exports.FileSystemRefreshResult.Updated);
  }
  _isLibFileInMemory() {
    return this.compilerNode.fileName.startsWith(h.libFolderInMemoryPath);
  }
  _throwIfIsInMemoryLibFile() {
    if (this._isLibFileInMemory())
      throw new h.errors.InvalidOperationError(
        "This operation is not permitted on an in memory lib folder file."
      );
  }
  _isInProject() {
    return this._context.inProjectCoordinator.isSourceFileInProject(this);
  }
  _markAsInProject() {
    this._context.inProjectCoordinator.markSourceFileAsInProject(this);
  }
}
function ot(e) {
  for (let [t, n] of e)
    G.isModuleSpecifierRelative(t.getLiteralText()) &&
      t.setLiteralValue(t._sourceFile.getRelativePathAsModuleSpecifierTo(n));
}
function on(e) {
  let t = e.getParentOrThrow(),
    n = t.getParent();
  return null != n && tm.isImportEqualsDeclaration(n) ? n : t;
}
a7([h.Memoize], oe.prototype, "isFromExternalLibrary", null);
let or = a$(nX(eo(tM(nQ(iU)))));
class oi extends or {
  getDeclarationList() {
    return this._getNodeFromCompilerNode(this.compilerNode.declarationList);
  }
  getDeclarations() {
    return this.getDeclarationList().getDeclarations();
  }
  getDeclarationKind() {
    return this.getDeclarationList().getDeclarationKind();
  }
  getDeclarationKindKeywords() {
    return this.getDeclarationList().getDeclarationKindKeywords();
  }
  setDeclarationKind(e) {
    return this.getDeclarationList().setDeclarationKind(e);
  }
  addDeclaration(e) {
    return this.getDeclarationList().addDeclaration(e);
  }
  addDeclarations(e) {
    return this.getDeclarationList().addDeclarations(e);
  }
  insertDeclaration(e, t) {
    return this.getDeclarationList().insertDeclaration(e, t);
  }
  insertDeclarations(e, t) {
    return this.getDeclarationList().insertDeclarations(e, t);
  }
  set(e) {
    if (
      (ea(or.prototype, this, e),
      null != e.declarationKind && this.setDeclarationKind(e.declarationKind),
      null != e.declarations)
    ) {
      let t = this.getDeclarations();
      this.addDeclarations(e.declarations), t.forEach((e) => e.remove());
    }
    return this;
  }
  getStructure() {
    return ei(or.prototype, this, {
      kind: exports.StructureKind.VariableStatement,
      declarationKind: this.getDeclarationKind(),
      declarations: this.getDeclarations().map((e) => e.getStructure()),
    });
  }
}
let oa = rj(i9);
class oo extends oa {}
let os = rj(iU);
class ol extends os {
  getStatement() {
    return this._getNodeFromCompilerNode(this.compilerNode.statement);
  }
}
function oc(e) {
  return nX(rb(ru(iH(nQ(e)))));
}
let od = r_(tT(tc(oc(rA))));
class ou extends od {
  getEqualsGreaterThan() {
    return this._getNodeFromCompilerNode(
      this.compilerNode.equalsGreaterThanToken
    );
  }
}
function op(e) {
  return class extends e {
    getOverloads() {
      return o_(this).filter((e) => e.isOverload());
    }
    getImplementation() {
      return this.isImplementation()
        ? this
        : o_(this).find((e) => e.isImplementation());
    }
    getImplementationOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getImplementation(),
        e ??
          "Expected to find a corresponding implementation for the overload.",
        this
      );
    }
    isOverload() {
      return !this.isImplementation();
    }
    isImplementation() {
      return null != this.getBody();
    }
  };
}
function o_(e) {
  let t = e.getParentOrThrow(),
    n = of(e),
    r = om(e),
    i = e.getKind();
  return t
    .forEachChildAsArray()
    .filter((e) => of(e) === n && e.getKind() === i && om(e) === r);
}
function of(e) {
  if (e.getName instanceof Function) return e.getName();
}
function om(e) {
  return e.isStatic instanceof Function && e.isStatic();
}
function oh(e) {
  if (0 === e.structures.length) return [];
  let t = e.node.getParentSyntaxListOrThrow(),
    n = e.node.getImplementation() || e.node,
    r = e.node.getOverloads(),
    i = r.length,
    a = r.length > 0 ? r[0].getChildIndex() : n.getChildIndex(),
    o = eD(e.index, i),
    s = e.getThisStructure(n),
    l = e.structures.map((e) => Object.assign(Object.assign({}, s), e)),
    c = n._getWriterWithQueuedIndentation();
  for (let t of l) c.getLength() > 0 && c.newLine(), e.printStructure(c, t);
  return (
    c.newLine(),
    c.write(""),
    e4({
      parent: t,
      insertPos: (r[o] || n).getNonWhitespaceStart(),
      newText: c.toString(),
    }),
    eE(t.getChildren(), a + o, l.length, e.expectedSyntaxKind)
  );
}
let og = rx(r_(op(tE(tc(nU(eo(tM(oc(a$(n5(iU))))))))))),
  oy = rx(r_(tc(nU(ru(eo(a$(nX(rb(tM(nQ(iU)))))))))));
class ov extends og {
  addOverload(e) {
    return this.addOverloads([e])[0];
  }
  addOverloads(e) {
    return this.insertOverloads(this.getOverloads().length, e);
  }
  insertOverload(e, t) {
    return this.insertOverloads(e, [t])[0];
  }
  insertOverloads(e, t) {
    let n = this.getName(),
      r = this._context.structurePrinterFactory.forFunctionDeclaration({
        isAmbient: this.isAmbient(),
      });
    return oh({
      node: this,
      index: e,
      structures: t,
      printStructure: (e, t) => {
        r.printOverload(e, n, t);
      },
      getThisStructure: eA,
      expectedSyntaxKind: h.SyntaxKind.FunctionDeclaration,
    });
  }
  remove() {
    this.isOverload()
      ? e7({
          children: [this],
          removeFollowingSpaces: !0,
          removeFollowingNewLines: !0,
        })
      : tr([...this.getOverloads(), this]);
  }
  set(e) {
    return (
      ea(og.prototype, this, e),
      null != e.overloads &&
        (this.getOverloads().forEach((e) => e.remove()),
        this.addOverloads(e.overloads)),
      this
    );
  }
  getStructure() {
    var e;
    let t = this.isOverload(),
      r = this.getImplementation();
    return ei(
      t && r ? oy.prototype : og.prototype,
      this,
      ((e = this),
      r && t
        ? { kind: exports.StructureKind.FunctionOverload }
        : r
        ? {
            kind: exports.StructureKind.Function,
            overloads: e.getOverloads().map((e) => e.getStructure()),
          }
        : { kind: exports.StructureKind.Function })
    );
  }
}
let ob = nX(r_(tT(tc(nU(iH(rb(ru(nQ(n5(rO))))))))));
class ox extends ob {}
let oS = rt(ri(tA(rs(ra(nQ(tD(rh(n$(n3(tm))))))))));
class ok extends oS {
  isRestParameter() {
    return null != this.compilerNode.dotDotDotToken;
  }
  isParameterProperty() {
    return (
      null != this.getScope() || this.isReadonly() || this.hasOverrideKeyword()
    );
  }
  setIsRestParameter(e) {
    return (
      this.isRestParameter() === e ||
        (e
          ? (oT(this),
            e4({
              insertPos: this.getNameNode().getStart(),
              parent: this,
              newText: "...",
            }))
          : e7({ children: [this.getDotDotDotTokenOrThrow()] })),
      this
    );
  }
  isOptional() {
    return (
      null != this.compilerNode.questionToken ||
      this.isRestParameter() ||
      this.hasInitializer()
    );
  }
  remove() {
    tn(this);
  }
  set(e) {
    return (
      ea(oS.prototype, this, e),
      null != e.isRestParameter && this.setIsRestParameter(e.isRestParameter),
      this
    );
  }
  getStructure() {
    return ei(oS.prototype, this, {
      kind: exports.StructureKind.Parameter,
      isRestParameter: this.isRestParameter(),
    });
  }
  setHasQuestionToken(e) {
    return e && oT(this), super.setHasQuestionToken(e), this;
  }
  setInitializer(e) {
    return oT(this), super.setInitializer(e), this;
  }
  setType(e) {
    return oT(this), super.setType.call(this, e), this;
  }
}
function oT(e) {
  let t,
    n = e.getParentOrThrow();
  tm.isArrowFunction(n) &&
    1 === n.compilerNode.parameters.length &&
    null ==
      e
        .getParentSyntaxListOrThrow()
        .getPreviousSiblingIfKind(h.SyntaxKind.OpenParenToken) &&
    ((t = e.getText()),
    e4({
      parent: n,
      insertPos: e.getStart(),
      newText: `(${t})`,
      replacing: { textLength: t.length },
      customMappings: (t) => [{ currentNode: e, newNode: t.parameters[0] }],
    }));
}
class oE extends tm {
  remove() {
    let e = this.getParentOrThrow();
    if (tm.isClassDeclaration(e) || tm.isClassExpression(e))
      if (tm.isOverloadable(this))
        if (this.isImplementation()) te([...this.getOverloads(), this]);
        else {
          let e = this.getParentOrThrow();
          tm.isAmbientable(e) && e.isAmbient()
            ? te([this])
            : e7({
                children: [this],
                removeFollowingSpaces: !0,
                removeFollowingNewLines: !0,
              });
        }
      else te([this]);
    else
      tm.isObjectLiteralExpression(e)
        ? tn(this)
        : tm.isInterfaceDeclaration(e)
        ? tt([this])
        : h.errors.throwNotImplementedForSyntaxKindError(e.getKind());
  }
}
let oC = tC(r_(rt(op(tE(tA(rC(rd(ri(rp(tc(nU(oc(re(oE)))))))))))))),
  oA = nX(tC(r_(rt(rd(rb(rC(ri(rp(tc(nQ(nU(ru(oE)))))))))))));
class ow extends oC {
  set(e) {
    return (
      ea(oC.prototype, this, e),
      null != e.overloads &&
        (this.getOverloads().forEach((e) => e.remove()),
        this.addOverloads(e.overloads)),
      this
    );
  }
  addOverload(e) {
    return this.addOverloads([e])[0];
  }
  addOverloads(e) {
    return this.insertOverloads(this.getOverloads().length, e);
  }
  insertOverload(e, t) {
    return this.insertOverloads(e, [t])[0];
  }
  insertOverloads(e, t) {
    let n = this.getName(),
      r = this._context.structurePrinterFactory.forMethodDeclaration({
        isAmbient: z(this),
      });
    return oh({
      node: this,
      index: e,
      structures: t,
      printStructure: (e, t) => {
        r.printOverload(e, n, t);
      },
      getThisStructure: ew,
      expectedSyntaxKind: h.SyntaxKind.MethodDeclaration,
    });
  }
  getStructure() {
    var e;
    let t = null != this.getImplementation(),
      r = this.isOverload();
    return ei(
      r && t ? oA.prototype : oC.prototype,
      this,
      ((e = this),
      t && r
        ? { kind: exports.StructureKind.MethodOverload }
        : t
        ? {
            kind: exports.StructureKind.Method,
            overloads: e.getOverloads().map((e) => e.getStructure()),
          }
        : { kind: exports.StructureKind.Method })
    );
  }
}
function oD(e) {
  return oN(n5(r_(nq(nH(rC(nX(rb(tA(nQ(e))))))))));
}
function oN(e) {
  return class extends e {
    setExtends(e) {
      if (
        ((e = this._getTextWithQueuedChildIndentation(e)),
        h.StringUtils.isNullOrWhitespace(e))
      )
        return this.removeExtends();
      let t = this.getHeritageClauseByKind(h.SyntaxKind.ExtendsKeyword);
      if (null != t) {
        let n = t.getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
          r = n.getStart();
        e4({
          parent: t,
          newText: e,
          insertPos: r,
          replacing: { textLength: n.getEnd() - r },
        });
      } else {
        let t,
          n = this.getHeritageClauseByKind(h.SyntaxKind.ImplementsKeyword);
        t =
          null != n
            ? n.getStart()
            : this.getFirstChildByKindOrThrow(
                h.SyntaxKind.OpenBraceToken
              ).getStart();
        let r = /\s/.test(this.getSourceFile().getFullText()[t - 1]),
          i = `extends ${e} `;
        r || (i = " " + i),
          e4({
            parent: null == n ? this : n.getParentSyntaxListOrThrow(),
            insertPos: t,
            newText: i,
          });
      }
      return this;
    }
    removeExtends() {
      let e = this.getHeritageClauseByKind(h.SyntaxKind.ExtendsKeyword);
      return null == e || e.removeExpression(0), this;
    }
    getExtendsOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getExtends(),
        e ??
          `Expected to find the extends expression for the class ${this.getName()}.`,
        this
      );
    }
    getExtends() {
      let e = this.getHeritageClauseByKind(h.SyntaxKind.ExtendsKeyword);
      if (null == e) return;
      let t = e.getTypeNodes();
      return 0 === t.length ? void 0 : t[0];
    }
    addMembers(e) {
      return this.insertMembers(em(this.getMembersWithComments()), e);
    }
    addMember(e) {
      return this.insertMember(em(this.getMembersWithComments()), e);
    }
    insertMember(e, t) {
      return this.insertMembers(e, [t])[0];
    }
    insertMembers(e, t) {
      let n = z(this);
      return e5({
        getIndexedChildren: () => this.getMembersWithComments(),
        index: e,
        parent: this,
        write: (e, i) => {
          let a =
              !n &&
              null != i.previousMember &&
              tm.isBodyable(i.previousMember) &&
              i.previousMember.hasBody(),
            o = !n && t instanceof Array && r(t[0]);
          a || (null != i.previousMember && o)
            ? e.blankLineIfLastNot()
            : e.newLineIfLastNot();
          let s = this._getWriter();
          this._context.structurePrinterFactory
            .forClassMember({ isAmbient: n })
            .printTexts(s, t),
            e.write(s.toString());
          let l = !n && t instanceof Array && r(t[t.length - 1]),
            c =
              !n &&
              null != i.nextMember &&
              tm.isBodyable(i.nextMember) &&
              i.nextMember.hasBody();
          (null != i.nextMember && l) || c
            ? e.blankLineIfLastNot()
            : e.newLineIfLastNot();
        },
      });
      function r(e) {
        return (
          !n &&
          null != e &&
          "number" == typeof e.kind &&
          (tJ.isMethod(e) ||
            tJ.isGetAccessor(e) ||
            tJ.isSetAccessor(e) ||
            tJ.isConstructor(e))
        );
      }
    }
    addConstructor(e = {}) {
      return this.insertConstructor(em(this.getMembersWithComments()), e);
    }
    addConstructors(e) {
      return this.insertConstructors(em(this.getMembersWithComments()), e);
    }
    insertConstructor(e, t = {}) {
      return this.insertConstructors(e, [t])[0];
    }
    insertConstructors(e, t) {
      let n = z(this);
      return oR(this, {
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.Constructor,
        write: (e, r) => {
          n || null == r.previousMember || tm.isCommentNode(r.previousMember)
            ? e.newLineIfLastNot()
            : e.blankLineIfLastNot(),
            this._context.structurePrinterFactory
              .forConstructorDeclaration({ isAmbient: n })
              .printTexts(e, t),
            n || null == r.nextMember
              ? e.newLineIfLastNot()
              : e.blankLineIfLastNot();
        },
      });
    }
    getConstructors() {
      return this.getMembers().filter((e) => tm.isConstructorDeclaration(e));
    }
    addStaticBlock(e = {}) {
      return this.insertStaticBlock(em(this.getMembersWithComments()), e);
    }
    addStaticBlocks(e) {
      return this.insertStaticBlocks(em(this.getMembersWithComments()), e);
    }
    insertStaticBlock(e, t = {}) {
      return this.insertStaticBlocks(e, [t])[0];
    }
    insertStaticBlocks(e, t) {
      let n = z(this);
      return oR(this, {
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.ClassStaticBlockDeclaration,
        write: (e, r) => {
          n || null == r.previousMember || tm.isCommentNode(r.previousMember)
            ? e.newLineIfLastNot()
            : e.blankLineIfLastNot(),
            this._context.structurePrinterFactory
              .forClassStaticBlockDeclaration()
              .printTexts(e, t),
            n || null == r.nextMember
              ? e.newLineIfLastNot()
              : e.blankLineIfLastNot();
        },
      });
    }
    getStaticBlocks() {
      return this.getMembers().filter((e) =>
        tm.isClassStaticBlockDeclaration(e)
      );
    }
    addGetAccessor(e) {
      return this.addGetAccessors([e])[0];
    }
    addGetAccessors(e) {
      return this.insertGetAccessors(em(this.getMembersWithComments()), e);
    }
    insertGetAccessor(e, t) {
      return this.insertGetAccessors(e, [t])[0];
    }
    insertGetAccessors(e, t) {
      return oR(this, {
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.GetAccessor,
        write: (e, n) => {
          null == n.previousMember || tm.isCommentNode(n.previousMember)
            ? e.newLineIfLastNot()
            : e.blankLineIfLastNot(),
            this._context.structurePrinterFactory
              .forGetAccessorDeclaration({ isAmbient: z(this) })
              .printTexts(e, t),
            null != n.nextMember
              ? e.blankLineIfLastNot()
              : e.newLineIfLastNot();
        },
      });
    }
    addSetAccessor(e) {
      return this.addSetAccessors([e])[0];
    }
    addSetAccessors(e) {
      return this.insertSetAccessors(em(this.getMembersWithComments()), e);
    }
    insertSetAccessor(e, t) {
      return this.insertSetAccessors(e, [t])[0];
    }
    insertSetAccessors(e, t) {
      return oR(this, {
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.SetAccessor,
        write: (e, n) => {
          null == n.previousMember || tm.isCommentNode(n.previousMember)
            ? e.newLineIfLastNot()
            : e.blankLineIfLastNot(),
            this._context.structurePrinterFactory
              .forSetAccessorDeclaration({ isAmbient: z(this) })
              .printTexts(e, t),
            null != n.nextMember
              ? e.blankLineIfLastNot()
              : e.newLineIfLastNot();
        },
      });
    }
    addProperty(e) {
      return this.addProperties([e])[0];
    }
    addProperties(e) {
      return this.insertProperties(em(this.getMembersWithComments()), e);
    }
    insertProperty(e, t) {
      return this.insertProperties(e, [t])[0];
    }
    insertProperties(e, t) {
      return oR(this, {
        index: e,
        structures: t,
        expectedKind: h.SyntaxKind.PropertyDeclaration,
        write: (e, n) => {
          null != n.previousMember && tm.hasBody(n.previousMember)
            ? e.blankLineIfLastNot()
            : e.newLineIfLastNot(),
            this._context.structurePrinterFactory
              .forPropertyDeclaration()
              .printTexts(e, t),
            null != n.nextMember && tm.hasBody(n.nextMember)
              ? e.blankLineIfLastNot()
              : e.newLineIfLastNot();
        },
      });
    }
    addMethod(e) {
      return this.addMethods([e])[0];
    }
    addMethods(e) {
      return this.insertMethods(em(this.getMembersWithComments()), e);
    }
    insertMethod(e, t) {
      return this.insertMethods(e, [t])[0];
    }
    insertMethods(e, t) {
      let n = z(this);
      return oR(this, {
        index: e,
        write: (e, r) => {
          n || null == r.previousMember || tm.isCommentNode(r.previousMember)
            ? e.newLineIfLastNot()
            : e.blankLineIfLastNot(),
            this._context.structurePrinterFactory
              .forMethodDeclaration({ isAmbient: n })
              .printTexts(e, t),
            n || null == r.nextMember
              ? e.newLineIfLastNot()
              : e.blankLineIfLastNot();
        },
        structures: (t = t.map((e) => ({ ...e }))),
        expectedKind: h.SyntaxKind.MethodDeclaration,
      });
    }
    getInstanceProperty(e) {
      return x(this.getInstanceProperties(), e);
    }
    getInstancePropertyOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getInstanceProperty(e), () =>
        k("class instance property", e)
      );
    }
    getInstanceProperties() {
      return this.getInstanceMembers().filter((e) => oM(e));
    }
    getStaticProperty(e) {
      return x(this.getStaticProperties(), e);
    }
    getStaticPropertyOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getStaticProperty(e), () =>
        k("class static property", e)
      );
    }
    getStaticProperties() {
      return this.getStaticMembers().filter((e) => oM(e));
    }
    getProperty(e) {
      return x(this.getProperties(), e);
    }
    getPropertyOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getProperty(e), () =>
        k("class property declaration", e)
      );
    }
    getProperties() {
      return this.getMembers().filter((e) => tm.isPropertyDeclaration(e));
    }
    getGetAccessor(e) {
      return x(this.getGetAccessors(), e);
    }
    getGetAccessorOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getGetAccessor(e), () =>
        k("class getAccessor declaration", e)
      );
    }
    getGetAccessors() {
      return this.getMembers().filter((e) => tm.isGetAccessorDeclaration(e));
    }
    getSetAccessor(e) {
      return x(this.getSetAccessors(), e);
    }
    getSetAccessorOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getSetAccessor(e), () =>
        k("class setAccessor declaration", e)
      );
    }
    getSetAccessors() {
      return this.getMembers().filter((e) => tm.isSetAccessorDeclaration(e));
    }
    getMethod(e) {
      return x(this.getMethods(), e);
    }
    getMethodOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getMethod(e), () =>
        k("class method declaration", e)
      );
    }
    getMethods() {
      return this.getMembers().filter((e) => tm.isMethodDeclaration(e));
    }
    getInstanceMethod(e) {
      return x(this.getInstanceMethods(), e);
    }
    getInstanceMethodOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getInstanceMethod(e), () =>
        k("class instance method", e)
      );
    }
    getInstanceMethods() {
      return this.getInstanceMembers().filter((e) => e instanceof ow);
    }
    getStaticMethod(e) {
      return x(this.getStaticMethods(), e);
    }
    getStaticMethodOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getStaticMethod(e), () =>
        k("class static method", e)
      );
    }
    getStaticMethods() {
      return this.getStaticMembers().filter((e) => e instanceof ow);
    }
    getInstanceMember(e) {
      return x(this.getInstanceMembers(), e);
    }
    getInstanceMemberOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getInstanceMember(e), () =>
        k("class instance member", e)
      );
    }
    getInstanceMembers() {
      return this.getMembersWithParameterProperties().filter(
        (e) =>
          !tm.isConstructorDeclaration(e) &&
          (tm.isParameterDeclaration(e) || !e.isStatic())
      );
    }
    getStaticMember(e) {
      return x(this.getStaticMembers(), e);
    }
    getStaticMemberOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getStaticMember(e), () =>
        k("class static member", e)
      );
    }
    getStaticMembers() {
      return this.getMembers().filter(
        (e) =>
          !tm.isConstructorDeclaration(e) &&
          !tm.isParameterDeclaration(e) &&
          e.isStatic()
      );
    }
    getMembersWithParameterProperties() {
      let e = this.getMembers();
      for (let t of e.filter(
        (e) => tm.isConstructorDeclaration(e) && e.isImplementation()
      )) {
        let n = e.indexOf(t) + 1;
        for (let r of t.getParameters())
          r.isParameterProperty() && (e.splice(n, 0, r), n++);
      }
      return e;
    }
    getMembers() {
      return oI(this, this.compilerNode.members).filter((e) => oL(e));
    }
    getMembersWithComments() {
      let e = this.compilerNode;
      return oI(
        this,
        F.getContainerArray(e, this.getSourceFile().compilerNode)
      ).filter((e) => oL(e) || tm.isCommentClassElement(e));
    }
    getMember(e) {
      return x(this.getMembers(), e);
    }
    getMemberOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getMember(e), () =>
        k("class member", e)
      );
    }
    getBaseTypes() {
      return this.getType().getBaseTypes();
    }
    getBaseClassOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getBaseClass(),
        e ?? `Expected to find the base class of ${this.getName()}.`,
        this
      );
    }
    getBaseClass() {
      let e = this.getBaseTypes()
        .map((e) => (e.isIntersection() ? e.getIntersectionTypes() : [e]))
        .flat()
        .map((e) => e.getSymbol())
        .filter((e) => null != e)
        .map((e) => e.getDeclarations())
        .reduce((e, t) => e.concat(t), [])
        .filter((e) => e.getKind() === h.SyntaxKind.ClassDeclaration);
      if (1 === e.length) return e[0];
    }
    getDerivedClasses() {
      let e = oP(this);
      for (let t = 0; t < e.length; t++)
        for (let n of oP(e[t])) n !== this && -1 === e.indexOf(n) && e.push(n);
      return e;
    }
  };
}
function oI(e, t) {
  let n = z(e),
    r = t.map((t) => e._getNodeFromCompilerNode(t));
  return n
    ? r
    : r.filter(
        (e) =>
          !!(
            !(tm.isConstructorDeclaration(e) || tm.isMethodDeclaration(e)) ||
            (tm.isMethodDeclaration(e) && e.isAbstract())
          ) || e.isImplementation()
      );
}
function oP(e) {
  let t = [],
    n = e.getNameNode();
  if (null == n) return t;
  for (let e of n.findReferencesAsNodes()) {
    let n = (e =
      e.getParentWhileKind(h.SyntaxKind.PropertyAccessExpression) ??
      e).getParentIfKind(h.SyntaxKind.ExpressionWithTypeArguments);
    if (null == n) continue;
    let r = n.getParentIfKind(h.SyntaxKind.HeritageClause);
    if (null == r || r.getToken() !== h.SyntaxKind.ExtendsKeyword) continue;
    let i = r.getParentIfKind(h.SyntaxKind.ClassDeclaration);
    null != i && t.push(i);
  }
  return t;
}
function oM(e) {
  return (
    tm.isPropertyDeclaration(e) ||
    tm.isSetAccessorDeclaration(e) ||
    tm.isGetAccessorDeclaration(e) ||
    tm.isParameterDeclaration(e)
  );
}
function oL(e) {
  return (
    tm.isMethodDeclaration(e) ||
    tm.isPropertyDeclaration(e) ||
    tm.isGetAccessorDeclaration(e) ||
    tm.isSetAccessorDeclaration(e) ||
    tm.isConstructorDeclaration(e) ||
    tm.isClassStaticBlockDeclaration(e)
  );
}
function oR(e, t) {
  return e8({
    getIndexedChildren: () => e.getMembersWithComments(),
    parent: e,
    ...t,
  });
}
let oF = a$(eo(tM(oD(iU))));
class oO extends oF {
  set(e) {
    return (
      ea(oF.prototype, this, e),
      null != e.extends
        ? this.setExtends(e.extends)
        : e.hasOwnProperty(h.nameof(e, "extends")) && this.removeExtends(),
      null != e.ctors &&
        (this.getConstructors().forEach((e) => e.remove()),
        this.addConstructors(e.ctors)),
      null != e.staticBlocks &&
        (this.getStaticBlocks().forEach((e) => e.remove()),
        this.addStaticBlocks(e.staticBlocks)),
      null != e.properties &&
        (this.getProperties().forEach((e) => e.remove()),
        this.addProperties(e.properties)),
      null != e.getAccessors &&
        (this.getGetAccessors().forEach((e) => e.remove()),
        this.addGetAccessors(e.getAccessors)),
      null != e.setAccessors &&
        (this.getSetAccessors().forEach((e) => e.remove()),
        this.addSetAccessors(e.setAccessors)),
      null != e.methods &&
        (this.getMethods().forEach((e) => e.remove()),
        this.addMethods(e.methods)),
      this
    );
  }
  getStructure() {
    let e = this.getExtends(),
      t = this.isAmbient();
    return ei(oF.prototype, this, {
      kind: exports.StructureKind.Class,
      ctors: this.getConstructors()
        .filter((e) => t || !e.isOverload())
        .map((e) => e.getStructure()),
      staticBlocks: this.getStaticBlocks().map((e) => e.getStructure()),
      methods: this.getMethods()
        .filter((e) => t || !e.isOverload())
        .map((e) => e.getStructure()),
      properties: this.getProperties().map((e) => e.getStructure()),
      extends: e ? e.getText() : void 0,
      getAccessors: this.getGetAccessors().map((e) => e.getStructure()),
      setAccessors: this.getSetAccessors().map((e) => e.getStructure()),
    });
  }
  extractInterface(e) {
    let {
        constructors: t,
        properties: r,
        methods: i,
        accessors: a,
      } = oB(this, !1),
      o = t
        .map((e) => e.getParameters().filter((e) => e.isParameterProperty()))
        .flat()
        .filter(
          (e) => null != e.getName() && e.getScope() === exports.Scope.Public
        );
    return {
      kind: exports.StructureKind.Interface,
      name: oW(e, this),
      docs: this.getJsDocs().map((e) => e.getStructure()),
      typeParameters: this.getTypeParameters().map((e) => e.getStructure()),
      properties: [
        ...o.map((e) => {
          let t = e
            .getParentOrThrow()
            .getJsDocs()
            .map((e) => e.getTags())
            .flat()
            .filter(tm.isJSDocParameterTag)
            .filter(
              (t) =>
                "param" === t.getTagName() &&
                t.getName() === e.getName() &&
                null != t.getComment()
            )
            .map((e) => e.getCommentText().trim())[0];
          return {
            kind: exports.StructureKind.PropertySignature,
            docs:
              null == t
                ? []
                : [{ kind: exports.StructureKind.JSDoc, description: t }],
            name: e.getName(),
            type: e.getType().getText(e),
            hasQuestionToken: e.hasQuestionToken(),
            isReadonly: e.isReadonly(),
          };
        }),
        ...r.map(oj),
        ...a.map(oz),
      ],
      methods: i.map(oV),
    };
  }
  extractStaticInterface(e) {
    let {
        constructors: t,
        properties: r,
        methods: i,
        accessors: a,
      } = oB(this, !0),
      o = oW(void 0, this);
    return {
      kind: exports.StructureKind.Interface,
      name: e,
      properties: [...r.map(oj), ...a.map(oz)],
      methods: i.map(oV),
      constructSignatures: t.map((e) => ({
        kind: exports.StructureKind.ConstructSignature,
        docs: e.getJsDocs().map((e) => e.getStructure()),
        parameters: e
          .getParameters()
          .map((e) => ({ ...oG(e), scope: void 0, isReadonly: !1 })),
        returnType: o,
      })),
    };
  }
}
function oB(e, t) {
  let r = e
    .getConstructors()
    .map((e) => (e.getOverloads().length > 0 ? e.getOverloads() : [e]))
    .flat();
  return {
    constructors: r,
    properties: e
      .getProperties()
      .filter(
        (e) => e.isStatic() === t && e.getScope() === exports.Scope.Public
      ),
    methods: e
      .getMethods()
      .filter(
        (e) => e.isStatic() === t && e.getScope() === exports.Scope.Public
      )
      .map((e) => (e.getOverloads().length > 0 ? e.getOverloads() : [e]))
      .flat(),
    accessors: (function () {
      let r = new h.KeyValueCache();
      for (let i of [...e.getGetAccessors(), ...e.getSetAccessors()])
        i.isStatic() === t &&
          i.getScope() === exports.Scope.Public &&
          r.getOrCreate(i.getName(), () => []).push(i);
      return r.getValuesAsArray();
    })(),
  };
}
function oW(e, t) {
  return (
    (e = h.StringUtils.isNullOrWhitespace(e) ? void 0 : e) ||
    t.getName() ||
    t
      .getSourceFile()
      .getBaseNameWithoutExtension()
      .replace(/[^a-zA-Z0-9_$]/g, "")
  );
}
function oj(e) {
  return {
    kind: exports.StructureKind.PropertySignature,
    docs: e.getJsDocs().map((e) => e.getStructure()),
    name: e.getName(),
    type: e.getType().getText(e),
    hasQuestionToken: e.hasQuestionToken(),
    isReadonly: e.isReadonly(),
  };
}
function oz(e) {
  return {
    kind: exports.StructureKind.PropertySignature,
    docs: e[0].getJsDocs().map((e) => e.getStructure()),
    name: e[0].getName(),
    type: e[0].getType().getText(e[0]),
    hasQuestionToken: !1,
    isReadonly: e.every(tm.isGetAccessorDeclaration),
  };
}
function oV(e) {
  return {
    kind: exports.StructureKind.MethodSignature,
    docs: e.getJsDocs().map((e) => e.getStructure()),
    name: e.getName(),
    hasQuestionToken: e.hasQuestionToken(),
    returnType: e.getReturnType().getText(e),
    parameters: e.getParameters().map(oG),
    typeParameters: e.getTypeParameters().map((e) => e.getStructure()),
  };
}
function oG(e) {
  return { ...e.getStructure(), decorators: [] };
}
let oK = oD(rO);
class oU extends oK {}
let oH = tC(r_(iH(nX(tT(oE)))));
class oq extends oH {
  getName() {
    return "static";
  }
  isStatic() {
    return !0;
  }
  set(e) {
    return ea(oH.prototype, this, e), this;
  }
  getStructure() {
    return ei(oH.prototype, this, {
      kind: exports.StructureKind.ClassStaticBlock,
    });
  }
}
class oJ extends oE {}
let o$ = n1(tC(r_(op(rd(oc(tE(oE))))))),
  oX = rb(nX(tC(r_(rd(nQ(ru(oE)))))));
class oY extends o$ {
  set(e) {
    return (
      ea(o$.prototype, this, e),
      null != e.overloads &&
        (this.getOverloads().forEach((e) => e.remove()),
        this.addOverloads(e.overloads)),
      this
    );
  }
  addOverload(e) {
    return this.addOverloads([e])[0];
  }
  addOverloads(e) {
    return this.insertOverloads(this.getOverloads().length, e);
  }
  insertOverload(e, t) {
    return this.insertOverloads(e, [t])[0];
  }
  insertOverloads(e, t) {
    let n = this._context.structurePrinterFactory.forConstructorDeclaration({
      isAmbient: z(this),
    });
    return oh({
      node: this,
      index: e,
      structures: t,
      printStructure: (e, t) => {
        n.printOverload(e, t);
      },
      getThisStructure: eC,
      expectedSyntaxKind: h.SyntaxKind.Constructor,
    });
  }
  getStructure() {
    var e;
    let t = null != this.getImplementation(),
      r = this.isOverload();
    return ei(
      r && t ? oX.prototype : o$.prototype,
      this,
      ((e = this),
      t && r
        ? { kind: exports.StructureKind.ConstructorOverload }
        : t
        ? {
            kind: exports.StructureKind.Constructor,
            overloads: e.getOverloads().map((e) => e.getStructure()),
          }
        : { kind: exports.StructureKind.Constructor })
    );
  }
}
let oQ = tC(r_(tA(rC(rd(rp(oc(tE(re(oE)))))))));
class oZ extends oQ {
  set(e) {
    return ea(oQ.prototype, this, e), this;
  }
  getSetAccessor() {
    let e = this.getName(),
      t = this.isStatic();
    return this.getParentOrThrow().forEachChild((n) => {
      if (
        tm.isSetAccessorDeclaration(n) &&
        n.getName() === e &&
        n.isStatic() === t
      )
        return n;
    });
  }
  getSetAccessorOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getSetAccessor(),
      e ??
        (() =>
          `Expected to find a corresponding set accessor for ${this.getName()}.`),
      this
    );
  }
  getStructure() {
    return ei(oQ.prototype, this, { kind: exports.StructureKind.GetAccessor });
  }
}
let o0 = tC(rt(eo(tA(rC(rd(rp(nX(ra(tN(ri(n$(rh(re(nQ(oE)))))))))))))));
class o1 extends o0 {
  hasAccessorKeyword() {
    return this.hasModifier(h.SyntaxKind.AccessorKeyword);
  }
  setHasAccessorKeyword(e) {
    return this.toggleModifier("accessor", e);
  }
  set(e) {
    return (
      ea(o0.prototype, this, e),
      null != e.hasAccessorKeyword &&
        this.setHasAccessorKeyword(e.hasAccessorKeyword),
      this
    );
  }
  remove() {
    let e = this.getParentOrThrow();
    if (e.getKind() === h.SyntaxKind.ClassDeclaration) super.remove();
    else
      throw new h.errors.NotImplementedError(
        `Not implemented parent syntax kind: ${e.getKindName()}`
      );
  }
  getStructure() {
    return ei(o0.prototype, this, {
      kind: exports.StructureKind.Property,
      hasAccessorKeyword: this.hasAccessorKeyword(),
    });
  }
}
let o2 = tC(r_(tA(rC(rd(rp(oc(tE(re(oE)))))))));
class o4 extends o2 {
  set(e) {
    return ea(o2.prototype, this, e), this;
  }
  getGetAccessor() {
    let e = this.getName(),
      t = this.isStatic();
    return this.getParentOrThrow().forEachChild((n) => {
      if (
        tm.isGetAccessorDeclaration(n) &&
        n.getName() === e &&
        n.isStatic() === t
      )
        return n;
    });
  }
  getGetAccessorOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getGetAccessor(),
      e ??
        (() =>
          `Expected to find a corresponding get accessor for ${this.getName()}.`),
      this
    );
  }
  getStructure() {
    return ei(o2.prototype, this, { kind: exports.StructureKind.SetAccessor });
  }
}
let o3 = rj(tm);
class o6 extends o3 {
  getName() {
    return this.getNameNode().getText();
  }
  getNameNode() {
    let e = this.getCallExpression();
    if (e) return t(e.getExpression());
    return t(this._getInnerExpression());
    function t(e) {
      var t;
      let n = ((t = e), tm.isPropertyAccessExpression(t) ? t.getNameNode() : t);
      if (!tm.isIdentifier(n))
        throw new h.errors.NotImplementedError(
          `Expected the decorator expression '${n.getText()}' to be an identifier. Please deal directly with 'getExpression()' on the decorator to handle more complex scenarios.`
        );
      return n;
    }
  }
  getFullName() {
    let e = this.getSourceFile();
    return this.isDecoratorFactory()
      ? this.getCallExpression().getExpression().getText()
      : this.compilerNode.expression.getText(e.compilerNode);
  }
  isDecoratorFactory() {
    return tm.isCallExpression(this._getInnerExpression());
  }
  setIsDecoratorFactory(e) {
    if (this.isDecoratorFactory() === e) return this;
    if (e) {
      let e = this._getInnerExpression(),
        t = e.getText();
      e4({
        parent: this,
        insertPos: e.getStart(),
        newText: `${t}()`,
        replacing: { textLength: t.length },
        customMappings: (t) => [
          { currentNode: e, newNode: t.expression.expression },
        ],
      });
    } else {
      let e = this.getCallExpressionOrThrow(),
        t = e.getExpression(),
        n = t.getText();
      e4({
        parent: this,
        insertPos: e.getStart(),
        newText: `${n}`,
        replacing: { textLength: e.getWidth() },
        customMappings: (e) => [{ currentNode: t, newNode: e.expression }],
      });
    }
    return this;
  }
  getCallExpressionOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getCallExpression(),
      e ?? "Expected to find a call expression.",
      this
    );
  }
  getCallExpression() {
    let e = this._getInnerExpression();
    return tm.isCallExpression(e) ? e : void 0;
  }
  getArguments() {
    return this.getCallExpression()?.getArguments() ?? [];
  }
  getTypeArguments() {
    return this.getCallExpression()?.getTypeArguments() ?? [];
  }
  addTypeArgument(e) {
    return this.getCallExpressionOrThrow().addTypeArgument(e);
  }
  addTypeArguments(e) {
    return this.getCallExpressionOrThrow().addTypeArguments(e);
  }
  insertTypeArgument(e, t) {
    return this.getCallExpressionOrThrow().insertTypeArgument(e, t);
  }
  insertTypeArguments(e, t) {
    return this.getCallExpressionOrThrow().insertTypeArguments(e, t);
  }
  removeTypeArgument(e) {
    let t = this.getCallExpression();
    if (null == t)
      throw new h.errors.InvalidOperationError(
        "Cannot remove a type argument from a decorator that has no type arguments."
      );
    return t.removeTypeArgument(e), this;
  }
  addArgument(e) {
    return this.addArguments([e])[0];
  }
  addArguments(e) {
    return this.insertArguments(this.getArguments().length, e);
  }
  insertArgument(e, t) {
    return this.insertArguments(e, [t])[0];
  }
  insertArguments(e, t) {
    return (
      this.setIsDecoratorFactory(!0),
      this.getCallExpressionOrThrow().insertArguments(e, t)
    );
  }
  removeArgument(e) {
    let t = this.getCallExpression();
    if (null == t)
      throw new h.errors.InvalidOperationError(
        "Cannot remove an argument from a decorator that has no arguments."
      );
    return t.removeArgument(e), this;
  }
  remove() {
    let e = this.getStartLinePos(),
      t = this.getPreviousSiblingIfKind(h.SyntaxKind.Decorator);
    null != t && t.getStartLinePos() === e
      ? e7({ children: [this], removePrecedingSpaces: !0 })
      : (function (e) {
          let { children: t } = e;
          if (0 === t.length) return;
          let n = t[0].getParentSyntaxListOrThrow();
          n.getChildCount() === t.length
            ? e9({ children: [n], getSiblingFormatting: () => m.None })
            : e9(e);
        })({
          children: [this],
          getSiblingFormatting: (t, n) =>
            n.getStartLinePos() === e ? m.Space : m.Newline,
        });
  }
  _getInnerExpression() {
    let e = this.getExpression();
    for (; tm.isParenthesizedExpression(e); ) e = e.getExpression();
    return e;
  }
  set(e) {
    return (
      ea(o3.prototype, this, e),
      null != e.name && this.getNameNode().replaceWithText(e.name),
      null != e.arguments &&
        (this.setIsDecoratorFactory(!0),
        this.getArguments().map((e) => this.removeArgument(e)),
        this.addArguments(e.arguments)),
      null != e.typeArguments &&
        e.typeArguments.length > 0 &&
        (this.setIsDecoratorFactory(!0),
        this.getTypeArguments().map((e) => this.removeTypeArgument(e)),
        this.addTypeArguments(e.typeArguments)),
      this
    );
  }
  getStructure() {
    let e = this.isDecoratorFactory();
    return ei(o3.prototype, this, {
      kind: exports.StructureKind.Decorator,
      name: this.getName(),
      arguments: e ? this.getArguments().map((e) => e.getText()) : void 0,
      typeArguments: e
        ? this.getTypeArguments().map((e) => e.getText())
        : void 0,
    });
  }
}
function o8(e) {
  return class extends e {
    getTypeExpression() {
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.typeExpression
      );
    }
    getTypeExpressionOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getTypeExpression(),
        e ?? "Expected to find a JS doc type expression.",
        this
      );
    }
    getName() {
      return this.getNameNode().getText();
    }
    getNameNode() {
      return this._getNodeFromCompilerNode(this.compilerNode.name);
    }
    isBracketed() {
      return this.compilerNode.isBracketed;
    }
  };
}
function o5(e) {
  return class extends e {
    getTypeExpression() {
      let e = this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.typeExpression
      );
      if (null == e || 0 !== e.getWidth()) return e;
    }
    getTypeExpressionOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(
        this.getTypeExpression(),
        e ?? "Expected to find the JS doc tag's type expression.",
        this
      );
    }
  };
}
function o7(e) {
  return class extends e {
    getTypeParameters() {
      return this.compilerNode.typeParameters
        .map((e) => this._getNodeFromCompilerNode(e))
        .filter((e) => e.getWidth() > 0);
    }
  };
}
function o9(e) {
  return e
    .replace(/^\/\*\*[^\S\n]*\n?/, "")
    .replace(/(\r?\n)?[^\S\n]*\*\/$/, "")
    .split(/\n/)
    .map((e) => {
      let t = (function (e) {
        for (let t = 0; t < e.length; t++) {
          let n = e.charCodeAt(t);
          if (42 === n) return t;
          if (!h.StringUtils.isWhitespaceCharCode(n)) break;
        }
        return -1;
      })(e);
      if (-1 === t) return e;
      let n = " " === e[t + 1] ? t + 2 : t + 1;
      return e.substring(n);
    })
    .join("\n");
}
let se = tm;
class st extends se {
  isMultiLine() {
    return this.getText().includes("\n");
  }
  getTags() {
    return (
      this.compilerNode.tags?.map((e) => this._getNodeFromCompilerNode(e)) ?? []
    );
  }
  getInnerText() {
    return o9(this.getText());
  }
  getComment() {
    return null == this.compilerNode.comment
      ? void 0
      : "string" == typeof this.compilerNode.comment
      ? this.compilerNode.comment
      : this.compilerNode.comment.map((e) =>
          this._getNodeFromCompilerNodeIfExists(e)
        );
  }
  getCommentText() {
    return "string" == typeof this.compilerNode.comment
      ? this.compilerNode.comment
      : h.ts.getTextOfJSDocComment(this.compilerNode.comment);
  }
  getDescription() {
    var e;
    let t,
      n,
      r = this.getSourceFile().getFullText(),
      i = this.getTags()[0]?.getStart() ?? this.getEnd() - 2,
      a =
        ((e = this),
        (t = e.getStart() + 3),
        32 === r.charCodeAt(t) ? t + 1 : t);
    return o9(
      r.substring(
        a,
        Math.max(
          a,
          ((n = eg(
            r,
            i,
            (e) =>
              10 === e || (!h.StringUtils.isWhitespaceCharCode(e) && 42 !== e)
          )),
          eg(r, n, (e) => 10 !== e && 13 !== e))
        )
      )
    );
  }
  setDescription(e) {
    let t = this.getTags(),
      n = this.getStart() + 3,
      r =
        t.length > 0
          ? eg(
              this._sourceFile.getFullText(),
              t[0].getStart(),
              (e) => 42 === e
            ) - 1
          : this.getEnd() - 2;
    return (
      !(function (e) {
        let { replacePos: t, replacingLength: n, newText: r, parent: i } = e;
        e2(
          i._sourceFile,
          new eJ({ insertPos: t, replacingLength: n, newText: r }),
          new eG().getForParentRange({
            parent: i,
            start: t,
            end: t + r.length,
          })
        );
      })({
        parent: this,
        newText: function () {
          let t = this.getIndentationText(),
            n = this._context.manipulationSettings.getNewLineKindAsString(),
            r = J(this._getWriter(), e).split(/\r?\n/),
            i = 0 === r[0].length,
            a = 1 === r.length && (this.compilerNode.tags?.length ?? 0) === 0,
            o = a
              ? r[0]
              : r
                  .map((e) => (0 === e.length ? `${t} *` : `${t} * ${e}`))
                  .slice(+!!i)
                  .join(n);
          return a ? " " + o + " " : n + o + n + t + " ";
        }.call(this),
        replacePos: n,
        replacingLength: r - n,
      }),
      this
    );
  }
  addTag(e) {
    return this.addTags([e])[0];
  }
  addTags(e) {
    return this.insertTags(this.compilerNode.tags?.length ?? 0, e);
  }
  insertTag(e, t) {
    return this.insertTags(e, [t])[0];
  }
  insertTags(e, t) {
    if (h.ArrayUtils.isNullOrEmpty(t)) return [];
    let n = this._getWriterWithQueuedIndentation(),
      r = this.getTags();
    if (((e = eD(e, r.length)), 0 !== r.length || this.isMultiLine())) {
      let i = this._context.structurePrinterFactory.forJSDocTag({
        printStarsOnNewLine: !0,
      });
      n.newLine().write(" * "),
        i.printTexts(n, t),
        n.newLine().write(" *"),
        n.conditionalWrite(e < r.length, " ");
      let a = function () {
        let t = e < r.length ? r[e].getStart() : this.getEnd() - 2;
        return Math.max(
          this.getStart() + 3,
          eg(
            this.getSourceFile().getFullText(),
            t,
            (e) => !h.StringUtils.isWhitespaceCharCode(e) && 42 !== e
          )
        );
      }.call(this);
      e4({
        parent: this,
        insertPos: a,
        replacing: {
          textLength:
            function () {
              return e < r.length ? r[e].getStart() : this.getEnd() - 1;
            }.call(this) - a,
        },
        newText: n.toString(),
      });
    } else {
      let e = this._context.structurePrinterFactory.forJSDoc();
      this.replaceWithText((n) => {
        e.printText(n, { description: this.getDescription(), tags: t });
      });
    }
    return eT(r, this.getTags(), e, !1);
  }
  remove() {
    e7({
      children: [this],
      removeFollowingSpaces: !0,
      removeFollowingNewLines: !0,
    });
  }
  set(e) {
    return (ea(se.prototype, this, e), null != e.tags)
      ? this.replaceWithText((t) => {
          this._context.structurePrinterFactory.forJSDoc().printText(t, {
            description: e.description ?? this.getDescription(),
            tags: e.tags,
          });
        })
      : (null != e.description && this.setDescription(e.description), this);
  }
  getStructure() {
    return ei(se.prototype, this, {
      kind: exports.StructureKind.JSDoc,
      description: this.getDescription(),
      tags: this.getTags().map((e) => e.getStructure()),
    });
  }
}
class sn extends tm {}
let sr = rm(sn);
class si extends sr {}
class sa extends sn {
  getElementTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.elementType);
  }
}
class so extends sn {
  getCheckType() {
    return this._getNodeFromCompilerNode(this.compilerNode.checkType);
  }
  getExtendsType() {
    return this._getNodeFromCompilerNode(this.compilerNode.extendsType);
  }
  getTrueType() {
    return this._getNodeFromCompilerNode(this.compilerNode.trueType);
  }
  getFalseType() {
    return this._getNodeFromCompilerNode(this.compilerNode.falseType);
  }
}
let ss = ru(sn);
class sl extends ss {}
let sc = rC(nQ(sl));
class sd extends sc {}
let su = rj(si);
class sp extends su {}
let s_ = rb(sl);
class sf extends s_ {}
class sm extends si {
  setArgument(e) {
    let t = this.getArgument();
    if (tm.isLiteralTypeNode(t)) {
      let n = t.getLiteral();
      if (tm.isStringLiteral(n)) return n.setLiteralValue(e), this;
    }
    return (
      t.replaceWithText(
        (t) => t.quote(e),
        this._getWriterWithQueuedChildIndentation()
      ),
      this
    );
  }
  getArgument() {
    return this._getNodeFromCompilerNode(this.compilerNode.argument);
  }
  setQualifier(e) {
    let t = this.getQualifier();
    return (
      null != t
        ? t.replaceWithText(e, this._getWriterWithQueuedChildIndentation())
        : e4({
            insertPos: this.getFirstChildByKindOrThrow(
              h.SyntaxKind.CloseParenToken
            ).getEnd(),
            parent: this,
            newText: this._getWriterWithQueuedIndentation()
              .write(".")
              .write(e)
              .toString(),
          }),
      this
    );
  }
  getQualifierOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getQualifier(),
      e ??
        (() =>
          `Expected to find a qualifier for the import type: ${this.getText()}`),
      this
    );
  }
  getQualifier() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.qualifier);
  }
  getAttributes() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.attributes);
  }
  getAttributesOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this._getNodeFromCompilerNodeIfExists(this.compilerNode.attributes),
      e ?? "Could not find import type assertion container.",
      this
    );
  }
}
class sh extends sn {
  getObjectTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.objectType);
  }
  getIndexTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.indexType);
  }
}
class sg extends sn {
  getTypeParameter() {
    return this._getNodeFromCompilerNode(this.compilerNode.typeParameter);
  }
}
class sy extends sn {
  getTypeNodes() {
    return this.compilerNode.types.map((e) => this._getNodeFromCompilerNode(e));
  }
}
class sv extends sn {
  getLiteral() {
    let e = this.compilerNode.literal;
    return this._getNodeFromCompilerNode(e);
  }
}
class sb extends sn {
  getNameTypeNode() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.nameType);
  }
  getNameTypeNodeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getNameTypeNode(),
      e ?? "Type did not exist.",
      this
    );
  }
  getReadonlyToken() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.readonlyToken
    );
  }
  getReadonlyTokenOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getReadonlyToken(),
      e ?? "Readonly token did not exist.",
      this
    );
  }
  getQuestionToken() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.questionToken
    );
  }
  getQuestionTokenOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getQuestionToken(),
      e ?? "Question token did not exist.",
      this
    );
  }
  getTypeParameter() {
    return this._getNodeFromCompilerNode(this.compilerNode.typeParameter);
  }
  getTypeNode() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.type);
  }
  getTypeNodeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getTypeNode(),
      e ?? "Type did not exist, but was expected to exist.",
      this
    );
  }
}
let sx = rh(ri(tD(nX(n9(sn)))));
class sS extends sx {
  getTypeNode() {
    return super.getTypeNode();
  }
  removeType() {
    throw new h.errors.InvalidOperationError(
      "Cannot remove the type of a named tuple member."
    );
  }
}
class sk extends sn {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
  setType(e) {
    return this.getTypeNode().replaceWithText(e), this;
  }
}
class sT extends sn {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
class sE extends sn {
  getHead() {
    return this._getNodeFromCompilerNode(this.compilerNode.head);
  }
  getTemplateSpans() {
    return this.compilerNode.templateSpans.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  setLiteralValue(e) {
    let t = this.getChildIndex(),
      n = this.getParentSyntaxList() ?? this.getParentOrThrow();
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart() + 1,
        replacingLength: this.getWidth() - 2,
        newText: e,
      }),
      n.getChildAtIndex(t)
    );
  }
}
class sC extends sn {}
class sA extends sn {
  getElements() {
    return this.compilerNode.elements.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
}
let sw = rb(rh(nX(eo(tM(nQ(n9(iU)))))));
class sD extends sw {
  set(e) {
    return ea(sw.prototype, this, e), this;
  }
  getStructure() {
    return ei(sw.prototype, this, {
      kind: exports.StructureKind.TypeAlias,
      type: this.getTypeNodeOrThrow().getText(),
    });
  }
}
let sN = ry(sn);
class sI extends sN {}
class sP extends sn {
  getOperator() {
    return this.compilerNode.operator;
  }
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
(exports.TypeParameterVariance = void 0),
  ((p = exports.TypeParameterVariance || (exports.TypeParameterVariance = {}))[
    (p.None = 0)
  ] = "None"),
  (p[(p.In = 1)] = "In"),
  (p[(p.Out = 2)] = "Out"),
  (p[(p.InOut = 3)] = "InOut");
let sM = nQ(n9(tm));
class sL extends sM {
  isConst() {
    return this.hasModifier(h.SyntaxKind.ConstKeyword);
  }
  setIsConst(e) {
    return this.toggleModifier("const", e);
  }
  getConstraint() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.constraint);
  }
  getConstraintOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getConstraint(),
      e ?? "Expected to find the type parameter's constraint.",
      this
    );
  }
  setConstraint(e) {
    if (
      ((e = this.getParentOrThrow()._getTextWithQueuedChildIndentation(e)),
      h.StringUtils.isNullOrWhitespace(e))
    )
      return this.removeConstraint(), this;
    let t = this.getConstraint();
    return (
      null != t
        ? t.replaceWithText(e)
        : e4({
            parent: this,
            insertPos: this.getNameNode().getEnd(),
            newText: ` extends ${e}`,
          }),
      this
    );
  }
  removeConstraint() {
    return sR(this.getConstraint(), h.SyntaxKind.ExtendsKeyword), this;
  }
  getDefault() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.default);
  }
  getDefaultOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getDefault(),
      e ?? "Expected to find the type parameter's default.",
      this
    );
  }
  setDefault(e) {
    if (
      ((e = this.getParentOrThrow()._getTextWithQueuedChildIndentation(e)),
      h.StringUtils.isNullOrWhitespace(e))
    )
      return this.removeDefault(), this;
    let t = this.getDefault();
    return (
      null != t
        ? t.replaceWithText(e)
        : e4({
            parent: this,
            insertPos: (this.getConstraint() || this.getNameNode()).getEnd(),
            newText: ` = ${e}`,
          }),
      this
    );
  }
  removeDefault() {
    return sR(this.getDefault(), h.SyntaxKind.EqualsToken), this;
  }
  setVariance(e) {
    return (
      this.toggleModifier("in", (e & exports.TypeParameterVariance.In) != 0),
      this.toggleModifier("out", (e & exports.TypeParameterVariance.Out) != 0),
      this
    );
  }
  getVariance() {
    let e = exports.TypeParameterVariance.None;
    return (
      this.hasModifier(h.SyntaxKind.InKeyword) &&
        (e |= exports.TypeParameterVariance.In),
      this.hasModifier(h.SyntaxKind.OutKeyword) &&
        (e |= exports.TypeParameterVariance.Out),
      e
    );
  }
  remove() {
    let e = this.getParentSyntaxListOrThrow();
    1 === e.getChildrenOfKind(h.SyntaxKind.TypeParameter).length
      ? e7({
          children: [
            e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.LessThanToken),
            e,
            e.getNextSiblingIfKindOrThrow(h.SyntaxKind.GreaterThanToken),
          ],
        })
      : tn(this);
  }
  set(e) {
    return (
      ea(sM.prototype, this, e),
      null != e.isConst && this.setIsConst(e.isConst),
      null != e.constraint
        ? this.setConstraint(e.constraint)
        : e.hasOwnProperty(h.nameof(e, "constraint")) &&
          this.removeConstraint(),
      null != e.default
        ? this.setDefault(e.default)
        : e.hasOwnProperty(h.nameof(e, "default")) && this.removeDefault(),
      null != e.variance && this.setVariance(e.variance),
      this
    );
  }
  getStructure() {
    let e = this.getConstraint(),
      t = this.getDefault();
    return ei(sM.prototype, this, {
      kind: exports.StructureKind.TypeParameter,
      isConst: this.isConst(),
      constraint:
        null != e ? e.getText({ trimLeadingIndentation: !0 }) : void 0,
      default: t ? t.getText({ trimLeadingIndentation: !0 }) : void 0,
      variance: this.getVariance(),
    });
  }
}
function sR(e, t) {
  null != e &&
    e7({
      children: [e.getPreviousSiblingIfKindOrThrow(t), e],
      removePrecedingSpaces: !0,
    });
}
class sF extends sn {
  getParameterNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.parameterName);
  }
  hasAssertsModifier() {
    return null != this.compilerNode.assertsModifier;
  }
  getAssertsModifier() {
    return this._getNodeFromCompilerNodeIfExists(
      this.compilerNode.assertsModifier
    );
  }
  getAssertsModifierOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getAssertsModifier(),
      e ?? "Expected to find an asserts modifier.",
      this
    );
  }
  getTypeNode() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.type);
  }
  getTypeNodeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getTypeNode(),
      e ?? "Expected to find a type node.",
      this
    );
  }
}
class sO extends si {
  getExprName() {
    return this._getNodeFromCompilerNode(this.compilerNode.exprName);
  }
}
class sB extends si {
  getTypeName() {
    return this._getNodeFromCompilerNode(this.compilerNode.typeName);
  }
}
class sW extends sn {
  getTypeNodes() {
    return this.compilerNode.types.map((e) => this._getNodeFromCompilerNode(e));
  }
}
class sj extends sn {}
class sz extends sj {}
let sV = tm;
class sG extends sV {
  getTagName() {
    return this.getTagNameNode().getText();
  }
  getTagNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.tagName);
  }
  setTagName(e) {
    return this.set({ tagName: e });
  }
  getComment() {
    return null == this.compilerNode.comment
      ? void 0
      : "string" == typeof this.compilerNode.comment
      ? this.compilerNode.comment
      : this.compilerNode.comment.map((e) =>
          this._getNodeFromCompilerNodeIfExists(e)
        );
  }
  getCommentText() {
    return "string" == typeof this.compilerNode.comment
      ? this.compilerNode.comment
      : h.ts.getTextOfJSDocComment(this.compilerNode.comment);
  }
  remove() {
    let e = this.getParentOrThrow().getStart() + 3,
      t = sH(this),
      n = null == t,
      r = function () {
        return Math.max(e, sq(this, this.getStart()));
      }.call(this);
    e7({
      children: [this],
      customRemovalPos: r,
      customRemovalEnd: sU(this, t),
      replaceTrivia: function () {
        if (r === e && n) return "";
        let t = this._context.manipulationSettings.getNewLineKindAsString(),
          i = this.getParentOrThrow().getIndentationText();
        return `${t}${i} ` + (n ? "" : "* ");
      }.call(this),
    });
  }
  set(e) {
    return (ea(sV.prototype, this, e), null != e.text || null != e.tagName)
      ? this.replaceWithText((t) => {
          this._context.structurePrinterFactory
            .forJSDocTag({ printStarsOnNewLine: !0 })
            .printText(t, {
              tagName: e.tagName ?? this.getTagName(),
              text: null != e.text ? e.text : sK(this),
            });
        })
      : this;
  }
  replaceWithText(e) {
    var t;
    let n = J(this._getWriterWithQueuedIndentation(), e),
      r = this.getParentOrThrow(),
      i = this.getChildIndex(),
      a = this.getStart();
    return (
      e4({
        parent: r,
        insertPos: a,
        newText: n,
        replacing: { textLength: ((t = this), sq(t, sU(t)) - a) },
      }),
      r.getChildren()[i]
    );
  }
  getStructure() {
    let e = sK(this);
    return ei(sV.prototype, this, {
      kind: exports.StructureKind.JSDocTag,
      tagName: this.getTagName(),
      text: 0 === e.length ? void 0 : e,
    });
  }
}
function sK(e) {
  var t;
  let n = e.getSourceFile().getFullText(),
    r = e.getTagNameNode().getEnd(),
    i = sq((t = e), sU(t)),
    a = Math.min(32 === n.charCodeAt(r) ? r + 1 : r, i);
  return o9(n.substring(a, i));
}
function sU(e, t) {
  return null != (t = t ?? sH(e))
    ? t.getStart()
    : e.getParentOrThrow().getEnd() - 2;
}
function sH(e) {
  let t = e.getParentIfKindOrThrow(h.SyntaxKind.JSDoc).getTags(),
    n = t.indexOf(e);
  return t[n + 1];
}
function sq(e, t) {
  return eg(
    e.getSourceFile().getFullText(),
    t,
    (e) => 42 !== e && !h.StringUtils.isWhitespaceCharCode(e)
  );
}
class sJ extends sG {}
class s$ extends sG {}
class sX extends sG {}
class sY extends sG {}
class sQ extends sG {}
class sZ extends sG {}
let s0 = ru(sj);
class s1 extends s0 {}
class s2 extends sG {}
class s4 extends tm {}
class s3 extends tm {}
class s6 extends tm {}
class s8 extends tm {}
class s5 extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
class s7 extends tm {
  getName() {
    return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
}
class s9 extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
  isPostfix() {
    return this.compilerNode.postfix;
  }
}
class le extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
  isPostfix() {
    return this.compilerNode.postfix;
  }
}
class lt extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
let ln = o5(sG);
class lr extends ln {}
class li extends sG {}
let la = o8(sG);
class lo extends la {}
class ls extends sG {}
let ll = o8(sG);
class lc extends ll {}
class ld extends sG {}
class lu extends sG {}
class lp extends sG {}
let l_ = o5(sG);
class lf extends l_ {}
let lm = o5(sG);
class lh extends lm {}
let lg = o5(sG);
class ly extends lg {}
class lv extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.type);
  }
}
class lb {
  #tb;
  constructor(e) {
    this.#tb = e;
  }
  get compilerObject() {
    return this.#tb;
  }
  getName() {
    return this.compilerObject.name;
  }
  getText() {
    return this.compilerObject.text ?? [];
  }
}
let lx = o7(sG);
class lS extends lx {
  getConstraint() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.constraint);
  }
  getConstraintOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getConstraint(),
      e ?? "Expected to find the JS doc template tag's constraint.",
      this
    );
  }
}
class lk extends tm {}
let lT = o5(sG);
class lE extends lT {}
let lC = o5(sG);
class lA extends lC {}
class lw extends sG {}
class lD extends sn {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
class lN extends sj {
  isArrayType() {
    return this.compilerNode.isArrayType;
  }
  getPropertyTags() {
    return this.compilerNode.jsDocPropertyTags
      ? this.compilerNode.jsDocPropertyTags.map((e) =>
          this._getNodeFromCompilerNode(e)
        )
      : void 0;
  }
}
class lI extends sG {
  getTypeExpression() {
    let e = this.compilerNode.typeExpression;
    if (null == e || e.pos !== e.end)
      return this._getNodeFromCompilerNodeIfExists(
        this.compilerNode.typeExpression
      );
  }
}
class lP extends sG {}
class lM extends sj {}
class lL extends sj {
  getTypeNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.type);
  }
}
class lR extends tm {
  remove() {
    e9({ children: [this], getSiblingFormatting: () => m.Newline });
  }
}
let lF = r_(a$(nX(eo(tM(nQ(n9(iU)))))));
class lO extends lF {
  set(e) {
    return (
      ea(lF.prototype, this, e),
      null != e.isConst && this.setIsConstEnum(e.isConst),
      null != e.members &&
        (this.getMembers().forEach((e) => e.remove()),
        this.addMembers(e.members)),
      this
    );
  }
  addMember(e) {
    return this.addMembers([e])[0];
  }
  addMembers(e) {
    return this.insertMembers(this.getMembers().length, e);
  }
  insertMember(e, t) {
    return this.insertMembers(e, [t])[0];
  }
  insertMembers(e, t) {
    if (0 === t.length) return [];
    let n = this.getMembersWithComments();
    e = eD(e, n.length);
    let r = this._getWriterWithChildIndentation();
    return (
      this._context.structurePrinterFactory.forEnumMember().printTexts(r, t),
      e3({
        parent: this.getChildSyntaxListOrThrow(),
        currentNodes: n,
        insertIndex: e,
        newText: r.toString(),
        useNewLines: !0,
        useTrailingCommas:
          this._context.manipulationSettings.getUseTrailingCommas(),
      }),
      eT(
        n,
        this.getMembersWithComments(),
        e,
        !(t instanceof Array && t.every((e) => "object" == typeof e))
      )
    );
  }
  getMember(e) {
    return x(this.getMembers(), e);
  }
  getMemberOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(this.getMember(e), () =>
      k("enum member", e)
    );
  }
  getMembers() {
    return this.compilerNode.members.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getMembersWithComments() {
    let e = this.compilerNode;
    return F.getContainerArray(e, this.getSourceFile().compilerNode).map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  setIsConstEnum(e) {
    return this.toggleModifier("const", e);
  }
  isConstEnum() {
    return null != this.getConstKeyword();
  }
  getConstKeyword() {
    return this.getFirstModifierByKind(h.SyntaxKind.ConstKeyword);
  }
  getStructure() {
    return ei(lF.prototype, this, {
      kind: exports.StructureKind.Enum,
      isConst: this.isConstEnum(),
      members: this.getMembers().map((e) => e.getStructure()),
    });
  }
}
let lB = nX(n$(re(tm)));
class lW extends lB {
  getValue() {
    return this._context.typeChecker.getConstantValue(this);
  }
  setValue(e) {
    let t;
    if ("string" == typeof e) {
      let n = this._context.manipulationSettings.getQuoteKind();
      t = n + h.StringUtils.escapeForWithinString(e, n) + n;
    } else t = e.toString();
    return this.setInitializer(t), this;
  }
  remove() {
    let e = [this],
      t = this.getNextSiblingIfKind(h.SyntaxKind.CommaToken);
    null != t && e.push(t),
      e9({ children: e, getSiblingFormatting: () => m.Newline });
  }
  set(e) {
    return (
      ea(lB.prototype, this, e),
      null != e.value
        ? this.setValue(e.value)
        : e.hasOwnProperty(h.nameof(e, "value")) &&
          null == e.initializer &&
          this.removeInitializer(),
      this
    );
  }
  getStructure() {
    return ei(lB.prototype, this, {
      kind: exports.StructureKind.EnumMember,
      value: void 0,
    });
  }
}
class lj extends tm {
  getTypeNodes() {
    return (
      this.compilerNode.types?.map((e) => this._getNodeFromCompilerNode(e)) ??
      []
    );
  }
  getToken() {
    return this.compilerNode.token;
  }
  removeExpression(e) {
    let t = this.getTypeNodes(),
      n = "number" == typeof e ? t[eD(e, t.length - 1)] : e;
    if (1 === t.length) {
      let e = this.getParentSyntaxListOrThrow().getChildren();
      1 === e.length
        ? e7({
            children: [e[0].getParentSyntaxListOrThrow()],
            removePrecedingSpaces: !0,
          })
        : e7({ children: [this], removePrecedingSpaces: !0 });
    } else tn(n);
    return this;
  }
}
class lz extends tm {
  remove() {
    tt([this]);
  }
}
let lV = rb(tC(nX(ru(lz))));
class lG extends lV {
  set(e) {
    return ea(lV.prototype, this, e), this;
  }
  getStructure() {
    return ei(lV.prototype, this, {
      kind: exports.StructureKind.CallSignature,
    });
  }
}
class lK extends lz {}
let lU = rb(tC(nX(ru(lz))));
class lH extends lU {
  set(e) {
    return ea(lU.prototype, this, e), this;
  }
  getStructure() {
    return ei(lU.prototype, this, {
      kind: exports.StructureKind.ConstructSignature,
    });
  }
}
let lq = ro(tC(nX(ra(nQ(lz)))));
class lJ extends lq {
  getKeyName() {
    return this.getKeyNameNode().getText();
  }
  setKeyName(e) {
    h.errors.throwIfWhitespaceOrNotString(e, "name"),
      this.getKeyName() !== e &&
        this.getKeyNameNode().replaceWithText(
          e,
          this._getWriterWithQueuedChildIndentation()
        );
  }
  getKeyNameNode() {
    let e = this.compilerNode.parameters[0];
    return this._getNodeFromCompilerNode(e.name);
  }
  getKeyType() {
    return this.getKeyNameNode().getType();
  }
  setKeyType(e) {
    h.errors.throwIfWhitespaceOrNotString(e, "type");
    let t = this.getKeyTypeNode();
    return (
      t.getText() === e ||
        t.replaceWithText(e, this._getWriterWithQueuedChildIndentation()),
      this
    );
  }
  getKeyTypeNode() {
    let e = this.compilerNode.parameters[0];
    return this._getNodeFromCompilerNode(e.type);
  }
  set(e) {
    return (
      ea(lq.prototype, this, e),
      null != e.keyName && this.setKeyName(e.keyName),
      null != e.keyType && this.setKeyType(e.keyType),
      this
    );
  }
  getStructure() {
    let e = this.getKeyTypeNode();
    return ei(lq.prototype, this, {
      kind: exports.StructureKind.IndexSignature,
      keyName: this.getKeyName(),
      keyType: e.getText(),
    });
  }
}
let l$ = ry(r_(nK(nH(rb(nX(eo(a$(tM(nQ(n9(iU)))))))))));
class lX extends l$ {
  getBaseTypes() {
    return this.getType().getBaseTypes();
  }
  getBaseDeclarations() {
    return this.getType()
      .getBaseTypes()
      .map((e) => e.getSymbol()?.getDeclarations() ?? [])
      .flat();
  }
  getImplementations() {
    return this.getNameNode().getImplementations();
  }
  set(e) {
    return ea(l$.prototype, this, e), this;
  }
  getStructure() {
    return ei(l$.prototype, this, { kind: exports.StructureKind.Interface });
  }
}
let lY = tC(nX(ri(rb(ru(re(lz))))));
class lQ extends lY {
  set(e) {
    return ea(lY.prototype, this, e), this;
  }
  getStructure() {
    return ei(lY.prototype, this, {
      kind: exports.StructureKind.MethodSignature,
    });
  }
}
let lZ = tC(nX(ra(ri(n$(rh(re(nQ(lz))))))));
class l0 extends lZ {
  set(e) {
    return ea(lZ.prototype, this, e), this;
  }
  getStructure() {
    return ei(lZ.prototype, this, {
      kind: exports.StructureKind.PropertySignature,
    });
  }
}
function l1(e) {
  return class extends e {
    getAttributes() {
      return this.compilerNode.attributes.properties.map((e) =>
        this._getNodeFromCompilerNode(e)
      );
    }
    getAttributeOrThrow(e) {
      return h.errors.throwIfNullOrUndefined(this.getAttribute(e), () =>
        k("attribute", e)
      );
    }
    getAttribute(e) {
      return x(this.getAttributes(), e);
    }
    addAttribute(e) {
      return this.addAttributes([e])[0];
    }
    addAttributes(e) {
      return this.insertAttributes(
        this.compilerNode.attributes.properties.length,
        e
      );
    }
    insertAttribute(e, t) {
      return this.insertAttributes(e, [t])[0];
    }
    insertAttributes(e, t) {
      if (0 === t.length) return [];
      let n = this.compilerNode.attributes.properties.length,
        r =
          0 === (e = eD(e, n))
            ? this.getTagNameNode().getEnd()
            : this.getAttributes()[e - 1].getEnd(),
        i = this._getWriterWithQueuedChildIndentation();
      return (
        new tK(
          this._context.structurePrinterFactory.forJsxAttributeDecider()
        ).printText(i, t),
        e4({
          insertPos: r,
          newText: " " + i.toString(),
          parent: this.getNodeProperty("attributes").getFirstChildByKindOrThrow(
            h.SyntaxKind.SyntaxList
          ),
        }),
        eT(n, this.getAttributes(), e, !1)
      );
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.attributes &&
          (this.getAttributes().forEach((e) => e.remove()),
          this.addAttributes(t.attributes)),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        attributes: this.getAttributes().map((e) => e.getStructure()),
      });
    }
  };
}
function l2(e) {
  return class extends e {
    getTagNameNode() {
      return this._getNodeFromCompilerNode(this.compilerNode.tagName);
    }
    set(t) {
      return (
        ea(e.prototype, this, t),
        null != t.name && this.getTagNameNode().replaceWithText(t.name),
        this
      );
    }
    getStructure() {
      return ei(e.prototype, this, {
        name: this.getTagNameNode().getText(),
      });
    }
  };
}
function l4(e) {
  return class extends e {
    getText() {
      return this.compilerNode.text;
    }
    getDefinitionNodes() {
      return this.getDefinitions()
        .map((e) => e.getDeclarationNode())
        .filter((e) => null != e);
    }
    getDefinitions() {
      return this._context.languageService.getDefinitions(this);
    }
  };
}
let l3 = rj(tm);
class l6 extends l3 {}
let l8 = l4(n1(n4(rO)));
class l5 extends l8 {
  getImplementations() {
    return this._context.languageService.getImplementations(this);
  }
}
let l7 = l4(n1(n4(tm)));
class l9 extends l7 {}
class ce extends tm {
  getLeft() {
    return this._getNodeFromCompilerNode(this.compilerNode.left);
  }
  getRight() {
    return this._getNodeFromCompilerNode(this.compilerNode.right);
  }
}
let ct = tm;
class cn extends ct {
  getNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
  setName(e) {
    return (
      this.getNameNode().replaceWithText((t) => {
        "object" == typeof e
          ? this._context.structurePrinterFactory
              .forJsxNamespacedName()
              .printText(t, e)
          : t.write(e);
      }),
      this
    );
  }
  getInitializerOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getInitializer(),
      e ??
        `Expected to find an initializer for the JSX attribute '${this.getNameNode().getText()}'`,
      this
    );
  }
  getInitializer() {
    return this._getNodeFromCompilerNodeIfExists(this.compilerNode.initializer);
  }
  setInitializer(e) {
    let t = J(this._getWriterWithQueuedIndentation(), e);
    if (h.StringUtils.isNullOrWhitespace(t))
      return this.removeInitializer(), this;
    let n = this.getInitializer();
    return (
      null != n
        ? n.replaceWithText(t)
        : e4({
            insertPos: this.getNameNode().getEnd(),
            parent: this,
            newText: `=${t}`,
          }),
      this
    );
  }
  removeInitializer() {
    let e = this.getInitializer();
    return (
      null == e ||
        e7({
          children: [
            e.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.EqualsToken),
            e,
          ],
          removePrecedingSpaces: !0,
          removePrecedingNewLines: !0,
        }),
      this
    );
  }
  remove() {
    e7({
      children: [this],
      removePrecedingNewLines: !0,
      removePrecedingSpaces: !0,
    });
  }
  set(e) {
    return (
      ea(ct.prototype, this, e),
      null != e.name && this.setName(e.name),
      null != e.initializer
        ? this.setInitializer(e.initializer)
        : e.hasOwnProperty(h.nameof(e, "initializer")) &&
          this.removeInitializer(),
      this
    );
  }
  getStructure() {
    let e = this.getInitializer(),
      t = this.getNameNode();
    return ei(ct.prototype, this, {
      name: t instanceof l5 ? t.getText() : t.getStructure(),
      kind: exports.StructureKind.JsxAttribute,
      initializer: e?.getText(),
    });
  }
}
let cr = l2(tm);
class ci extends cr {}
class ca extends rA {}
let co = rO;
class cs extends co {
  getJsxChildren() {
    return this.compilerNode.children.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getOpeningElement() {
    return this._getNodeFromCompilerNode(this.compilerNode.openingElement);
  }
  getClosingElement() {
    return this._getNodeFromCompilerNode(this.compilerNode.closingElement);
  }
  setBodyText(e) {
    return cl(this, tu(this._getWriterWithIndentation(), e)), this;
  }
  setBodyTextInline(e) {
    let t = this._getWriterWithQueuedChildIndentation();
    return (
      $(t, e),
      t.isLastNewLine() &&
        (t.setIndentationLevel(Math.max(0, this.getIndentationLevel() - 1)),
        t.write("")),
      cl(this, t.toString()),
      this
    );
  }
  set(e) {
    if ((ea(co.prototype, this, e), null != e.attributes)) {
      let t = this.getOpeningElement();
      t.getAttributes().forEach((e) => e.remove()),
        t.addAttributes(e.attributes);
    }
    if (null != e.children)
      throw new h.errors.NotImplementedError(
        "Setting JSX children is currently not implemented. Please open an issue if you need this."
      );
    return (
      null != e.bodyText
        ? this.setBodyText(e.bodyText)
        : e.hasOwnProperty(h.nameof(e, "bodyText")) &&
          this.setBodyTextInline(""),
      null != e.name &&
        (this.getOpeningElement().getTagNameNode().replaceWithText(e.name),
        this.getClosingElement().getTagNameNode().replaceWithText(e.name)),
      this
    );
  }
  getStructure() {
    let e = this.getOpeningElement(),
      t = ei(co.prototype, this, {
        kind: exports.StructureKind.JsxElement,
        name: e.getTagNameNode().getText(),
        attributes: e.getAttributes().map((e) => e.getStructure()),
        children: void 0,
        bodyText: tp(this),
      });
    return delete t.children, t;
  }
}
function cl(e, t) {
  let n = e.getOpeningElement(),
    r = e.getClosingElement();
  e4({
    insertPos: n.getEnd(),
    newText: t,
    parent: e.getChildSyntaxListOrThrow(),
    replacing: { textLength: r.getStart() - n.getEnd() },
  });
}
let cc = rW(tD(rA));
class cd extends cc {}
class cu extends rO {
  getJsxChildren() {
    return this.compilerNode.children.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getOpeningFragment() {
    return this._getNodeFromCompilerNode(this.compilerNode.openingFragment);
  }
  getClosingFragment() {
    return this._getNodeFromCompilerNode(this.compilerNode.closingFragment);
  }
}
let cp = tm;
class c_ extends cp {
  getNamespaceNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.namespace);
  }
  getNameNode() {
    return this._getNodeFromCompilerNode(this.compilerNode.name);
  }
  set(e) {
    return (
      this.getNamespaceNode().replaceWithText(e.namespace),
      this.getNameNode().replaceWithText(e.name),
      this
    );
  }
  getStructure() {
    return {
      namespace: this.getNamespaceNode().getText(),
      name: this.getNameNode().getText(),
    };
  }
}
let cf = l1(l2(rA));
class cm extends cf {}
class ch extends rA {}
let cg = l1(l2(rO));
class cy extends cg {
  set(e) {
    return ea(cg.prototype, this, e), this;
  }
  getStructure() {
    return ei(cg.prototype, this, {
      kind: exports.StructureKind.JsxSelfClosingElement,
    });
  }
}
let cv = rj(tm);
class cb extends cv {
  remove() {
    e7({
      children: [this],
      removePrecedingNewLines: !0,
      removePrecedingSpaces: !0,
    });
  }
  set(e) {
    return (
      ea(cv.prototype, this, e),
      null != e.expression && this.setExpression(e.expression),
      this
    );
  }
  getStructure() {
    return ei(cv.prototype, this, {
      kind: exports.StructureKind.JsxSpreadAttribute,
      expression: this.getExpression().getText(),
    });
  }
}
let cx = nY(tm);
class cS extends cx {
  containsOnlyTriviaWhiteSpaces() {
    let e = this.compilerNode;
    return "boolean" == typeof e.containsOnlyWhiteSpaces
      ? e.containsOnlyWhiteSpaces
      : this.compilerNode.containsOnlyTriviaWhiteSpaces;
  }
}
let ck = r3;
class cT extends ck {
  getLiteralValue() {
    let e = this.compilerNode.text;
    if ("undefined" == typeof BigInt)
      throw new h.errors.InvalidOperationError(
        "Runtime environment does not support BigInts. Perhaps work with the text instead?"
      );
    return BigInt(e.substring(0, e.length - 1));
  }
  setLiteralValue(e) {
    if ("bigint" != typeof e)
      throw new h.errors.ArgumentTypeError("value", "bigint", typeof e);
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart(),
        replacingLength: this.getWidth(),
        newText: e.toString() + "n",
      }),
      this
    );
  }
}
let cE = rO;
class cC extends cE {
  getLiteralValue() {
    return cN(this);
  }
  setLiteralValue(e) {
    return cD(this, e);
  }
}
let cA = rO;
class cw extends cA {
  getLiteralValue() {
    return cN(this);
  }
  setLiteralValue(e) {
    return cD(this, e);
  }
}
function cD(e, t) {
  if (cN(e) === t) return e;
  let n = e.getParentSyntaxList() || e.getParentOrThrow(),
    r = e.getChildIndex();
  return e.replaceWithText(t ? "true" : "false"), n.getChildAtIndex(r);
}
function cN(e) {
  return e.getKind() === h.SyntaxKind.TrueKeyword;
}
let cI = rO;
class cP extends cI {}
let cM = r3;
class cL extends cM {
  getLiteralValue() {
    let e = this.compilerNode.text;
    return e.indexOf(".") >= 0 ? parseFloat(e) : parseInt(e, 10);
  }
  setLiteralValue(e) {
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart(),
        replacingLength: this.getWidth(),
        newText: e.toString(10),
      }),
      this
    );
  }
}
(exports.QuoteKind = void 0),
  ((_ = exports.QuoteKind || (exports.QuoteKind = {})).Single = "'"),
  (_.Double = '"');
let cR = r3;
class cF extends cR {
  getLiteralValue() {
    let e = this.compilerNode.text,
      t = /^\/(.*)\/([^\/]*)$/.exec(e);
    return new RegExp(t[1], t[2]);
  }
  setLiteralValue(e, t) {
    let n;
    return (
      "string" == typeof e ? (n = e) : ((n = e.source), (t = e.flags)),
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart(),
        replacingLength: this.getWidth(),
        newText: `/${n}/${t || ""}`,
      }),
      this
    );
  }
}
let cO = r3;
class cB extends cO {
  getLiteralValue() {
    return this.compilerNode.text;
  }
  setLiteralValue(e) {
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart() + 1,
        replacingLength: this.getWidth() - 2,
        newText: h.StringUtils.escapeForWithinString(e, this.getQuoteKind()),
      }),
      this
    );
  }
  getQuoteKind() {
    return "'" === this.getText()[0]
      ? exports.QuoteKind.Single
      : exports.QuoteKind.Double;
  }
}
let cW = r3;
class cj extends cW {
  getLiteralValue() {
    return this.compilerNode.text;
  }
  setLiteralValue(e) {
    let t = this.getChildIndex(),
      n = this.getParentSyntaxList() || this.getParentOrThrow();
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart() + 1,
        replacingLength: this.getWidth() - 2,
        newText: e,
      }),
      n.getChildAtIndex(t)
    );
  }
}
class cz extends rF {
  getTag() {
    return this._getNodeFromCompilerNode(this.compilerNode.tag);
  }
  getTemplate() {
    return this._getNodeFromCompilerNode(this.compilerNode.template);
  }
  removeTag() {
    let e = this.getParentSyntaxList() ?? this.getParentOrThrow(),
      t = this.getChildIndex(),
      n = this.getTemplate();
    return (
      e4({
        customMappings: (e, r) => [
          { currentNode: n, newNode: e.getChildren(r)[t] },
        ],
        parent: e,
        insertPos: this.getStart(),
        newText: this.getTemplate().getText(),
        replacing: { textLength: this.getWidth(), nodes: [this] },
      }),
      e.getChildAtIndex(t)
    );
  }
}
let cV = rO;
class cG extends cV {
  getHead() {
    return this._getNodeFromCompilerNode(this.compilerNode.head);
  }
  getTemplateSpans() {
    return this.compilerNode.templateSpans.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  setLiteralValue(e) {
    let t = this.getChildIndex(),
      n = this.getParentSyntaxList() ?? this.getParentOrThrow();
    return (
      ta({
        sourceFile: this._sourceFile,
        start: this.getStart() + 1,
        replacingLength: this.getWidth() - 2,
        newText: e,
      }),
      n.getChildAtIndex(t)
    );
  }
}
let cK = nY(tm);
class cU extends cK {}
let cH = nY(tm);
class cq extends cH {}
let cJ = rj(tm);
class c$ extends cJ {
  getLiteral() {
    return this._getNodeFromCompilerNode(this.compilerNode.literal);
  }
}
let cX = nY(tm);
class cY extends cX {}
let cQ = tI(tN(rh(n$(n3(tm)))));
class cZ extends cQ {
  remove() {
    var e, t;
    let n = this.getParentOrThrow();
    switch (n.getKind()) {
      case h.SyntaxKind.VariableDeclarationList:
        let r;
        (e = this),
          1 ===
          (r = n.getParentIfKindOrThrow(
            h.SyntaxKind.VariableStatement
          )).getDeclarations().length
            ? r.remove()
            : tn(e);
        break;
      case h.SyntaxKind.CatchClause:
        (t = this),
          e7({
            children: [
              t.getPreviousSiblingIfKindOrThrow(h.SyntaxKind.OpenParenToken),
              t,
              t.getNextSiblingIfKindOrThrow(h.SyntaxKind.CloseParenToken),
            ],
            removePrecedingSpaces: !0,
          });
        break;
      default:
        throw new h.errors.NotImplementedError(
          `Not implemented for syntax kind: ${n.getKindName()}`
        );
    }
  }
  getVariableStatementOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getVariableStatement(),
      e ?? "Expected the grandparent to be a variable statement.",
      this
    );
  }
  getVariableStatement() {
    let e = this.getParentOrThrow().getParentOrThrow();
    return tm.isVariableStatement(e) ? e : void 0;
  }
  set(e) {
    return ea(cQ.prototype, this, e), this;
  }
  getStructure() {
    return ei(cQ.prototype, this, {
      kind: exports.StructureKind.VariableDeclaration,
    });
  }
}
let c0 = nQ(tm);
class c1 extends c0 {
  getDeclarations() {
    return this.compilerNode.declarations.map((e) =>
      this._getNodeFromCompilerNode(e)
    );
  }
  getDeclarationKind() {
    let e = this.compilerNode.flags;
    return e & h.ts.NodeFlags.Let
      ? exports.VariableDeclarationKind.Let
      : (e & h.ts.NodeFlags.AwaitUsing) === h.ts.NodeFlags.AwaitUsing
      ? exports.VariableDeclarationKind.AwaitUsing
      : (e & h.ts.NodeFlags.Using) === h.ts.NodeFlags.Using
      ? exports.VariableDeclarationKind.Using
      : e & h.ts.NodeFlags.Const
      ? exports.VariableDeclarationKind.Const
      : exports.VariableDeclarationKind.Var;
  }
  getDeclarationKindKeywords() {
    let e = this.getDeclarationKind();
    switch (e) {
      case exports.VariableDeclarationKind.Const:
        return [this.getFirstChildByKindOrThrow(h.SyntaxKind.ConstKeyword)];
      case exports.VariableDeclarationKind.Let:
        return [this.getFirstChildByKindOrThrow(h.SyntaxKind.LetKeyword)];
      case exports.VariableDeclarationKind.Var:
        return [this.getFirstChildByKindOrThrow(h.SyntaxKind.VarKeyword)];
      case exports.VariableDeclarationKind.Using:
        return [this.getFirstChildByKindOrThrow(h.SyntaxKind.UsingKeyword)];
      case exports.VariableDeclarationKind.AwaitUsing:
        let t = this.getFirstChildByKindOrThrow(h.SyntaxKind.AwaitKeyword),
          r = t.getNextSiblingIfKindOrThrow(h.SyntaxKind.UsingKeyword);
        return [t, r];
      default:
        return h.errors.throwNotImplementedForNeverValueError(e);
    }
  }
  setDeclarationKind(e) {
    if (this.getDeclarationKind() === e) return this;
    let t = this.getDeclarationKindKeywords(),
      n = t[0].getStart();
    return (
      e4({
        insertPos: n,
        newText: e,
        parent: this,
        replacing: { textLength: t[t.length - 1].getEnd() - n },
      }),
      this
    );
  }
  addDeclaration(e) {
    return this.addDeclarations([e])[0];
  }
  addDeclarations(e) {
    return this.insertDeclarations(this.getDeclarations().length, e);
  }
  insertDeclaration(e, t) {
    return this.insertDeclarations(e, [t])[0];
  }
  insertDeclarations(e, t) {
    let n = this._getWriterWithQueuedChildIndentation(),
      r = new tj(
        this._context.structurePrinterFactory.forVariableDeclaration()
      ),
      i = this.compilerNode.declarations.length;
    return (
      (e = eD(e, i)),
      r.printText(n, t),
      e3({
        parent: this.getFirstChildByKindOrThrow(h.SyntaxKind.SyntaxList),
        currentNodes: this.getDeclarations(),
        insertIndex: e,
        newText: n.toString(),
        useTrailingCommas: !1,
      }),
      eT(i, this.getDeclarations(), e, !1)
    );
  }
}
class c2 {
  #t5;
  #t7;
  constructor(e, t) {
    (this.#t5 = e), (this.#t7 = t);
  }
  get compilerSignature() {
    return this.#t7;
  }
  getTypeParameters() {
    return (this.compilerSignature.typeParameters || []).map((e) =>
      this.#t5.compilerFactory.getTypeParameter(e)
    );
  }
  getParameters() {
    return this.compilerSignature.parameters.map((e) =>
      this.#t5.compilerFactory.getSymbol(e)
    );
  }
  getReturnType() {
    return this.#t5.compilerFactory.getType(
      this.compilerSignature.getReturnType()
    );
  }
  getDocumentationComments() {
    return this.compilerSignature
      .getDocumentationComment(this.#t5.typeChecker.compilerObject)
      .map((e) => this.#t5.compilerFactory.getSymbolDisplayPart(e));
  }
  getJsDocTags() {
    return this.compilerSignature
      .getJsDocTags()
      .map((e) => this.#t5.compilerFactory.getJSDocTagInfo(e));
  }
  getDeclaration() {
    let { compilerFactory: e } = this.#t5,
      t = this.compilerSignature.getDeclaration();
    return e.getNodeFromCompilerNode(t, e.getSourceFileForNode(t));
  }
}
class c4 {
  #t5;
  #t9;
  get compilerSymbol() {
    return this.#t9;
  }
  constructor(e, t) {
    (this.#t5 = e),
      (this.#t9 = t),
      this.getValueDeclaration(),
      this.getDeclarations();
  }
  getName() {
    return this.compilerSymbol.getName();
  }
  getEscapedName() {
    return this.compilerSymbol.getEscapedName();
  }
  getAliasedSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getAliasedSymbol(),
      e ?? "Expected to find an aliased symbol."
    );
  }
  getImmediatelyAliasedSymbol() {
    return this.#t5.typeChecker.getImmediatelyAliasedSymbol(this);
  }
  getImmediatelyAliasedSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getImmediatelyAliasedSymbol(),
      e ?? "Expected to find an immediately aliased symbol."
    );
  }
  getAliasedSymbol() {
    return this.#t5.typeChecker.getAliasedSymbol(this);
  }
  getExportSymbol() {
    return this.#t5.typeChecker.getExportSymbolOfSymbol(this);
  }
  isAlias() {
    return (this.getFlags() & h.SymbolFlags.Alias) === h.SymbolFlags.Alias;
  }
  isOptional() {
    return (
      (this.getFlags() & h.SymbolFlags.Optional) === h.SymbolFlags.Optional
    );
  }
  getFlags() {
    return this.compilerSymbol.getFlags();
  }
  hasFlags(e) {
    return (this.compilerSymbol.flags & e) === e;
  }
  getValueDeclarationOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getValueDeclaration(),
      e ??
        (() =>
          `Expected to find the value declaration of symbol '${this.getName()}'.`)
    );
  }
  getValueDeclaration() {
    let e = this.compilerSymbol.valueDeclaration;
    if (null != e)
      return this.#t5.compilerFactory.getNodeFromCompilerNode(
        e,
        this.#t5.compilerFactory.getSourceFileForNode(e)
      );
  }
  getDeclarations() {
    return (this.compilerSymbol.declarations ?? []).map((e) =>
      this.#t5.compilerFactory.getNodeFromCompilerNode(
        e,
        this.#t5.compilerFactory.getSourceFileForNode(e)
      )
    );
  }
  getExportOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getExport(e),
      t ?? (() => `Expected to find export with name: ${e}`)
    );
  }
  getExport(e) {
    if (null == this.compilerSymbol.exports) return;
    let t = this.compilerSymbol.exports.get(h.ts.escapeLeadingUnderscores(e));
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getExports() {
    return null == this.compilerSymbol.exports
      ? []
      : Array.from(this.compilerSymbol.exports.values()).map((e) =>
          this.#t5.compilerFactory.getSymbol(e)
        );
  }
  getGlobalExportOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getGlobalExport(e),
      t ?? (() => `Expected to find global export with name: ${e}`)
    );
  }
  getGlobalExport(e) {
    if (null == this.compilerSymbol.globalExports) return;
    let t = this.compilerSymbol.globalExports.get(
      h.ts.escapeLeadingUnderscores(e)
    );
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getGlobalExports() {
    return null == this.compilerSymbol.globalExports
      ? []
      : Array.from(this.compilerSymbol.globalExports.values()).map((e) =>
          this.#t5.compilerFactory.getSymbol(e)
        );
  }
  getMemberOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getMember(e),
      t ?? `Expected to find member with name: ${e}`
    );
  }
  getMember(e) {
    if (null == this.compilerSymbol.members) return;
    let t = this.compilerSymbol.members.get(h.ts.escapeLeadingUnderscores(e));
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getMembers() {
    return null == this.compilerSymbol.members
      ? []
      : Array.from(this.compilerSymbol.members.values()).map((e) =>
          this.#t5.compilerFactory.getSymbol(e)
        );
  }
  getDeclaredType() {
    return this.#t5.typeChecker.getDeclaredTypeOfSymbol(this);
  }
  getTypeAtLocation(e) {
    return this.#t5.typeChecker.getTypeOfSymbolAtLocation(this, e);
  }
  getFullyQualifiedName() {
    return this.#t5.typeChecker.getFullyQualifiedName(this);
  }
  getJsDocTags() {
    return this.compilerSymbol
      .getJsDocTags(this.#t5.typeChecker.compilerObject)
      .map((e) => new lb(e));
  }
}
class c3 {
  #tb;
  constructor(e) {
    this.#tb = e;
  }
  get compilerObject() {
    return this.#tb;
  }
  getStart() {
    return this.compilerObject.start;
  }
  getEnd() {
    return this.compilerObject.start + this.compilerObject.length;
  }
  getLength() {
    return this.compilerObject.length;
  }
}
class c6 {
  #tb;
  constructor(e) {
    this.#tb = e;
  }
  get compilerObject() {
    return this.#tb;
  }
  getSpan() {
    return new c3(this.compilerObject.span);
  }
  getNewText() {
    return this.compilerObject.newText;
  }
}
a7([h.Memoize], c6.prototype, "getSpan", null);
class c8 {
  #t5;
  #tb;
  #ez;
  #ne;
  #nt;
  constructor(e, t) {
    (this.#t5 = e), (this.#tb = t);
    const n = e.compilerFactory.addOrGetSourceFileFromFilePath(
      e.fileSystemWrapper.getStandardizedAbsolutePath(t.fileName),
      { markInProject: !1, scriptKind: void 0 }
    );
    (this.#ne = null != n), t.isNewFile || (this.#ez = n);
  }
  getFilePath() {
    return this.#tb.fileName;
  }
  getSourceFile() {
    return this.#ez;
  }
  getTextChanges() {
    return this.#tb.textChanges.map((e) => new c6(e));
  }
  applyChanges(e = {}) {
    let t;
    if (!this.#nt) {
      if (this.isNewFile() && this.#ne && !e.overwrite)
        throw new h.errors.InvalidOperationError(
          `Cannot apply file text change for creating a new file when the file exists at path ${this.getFilePath()}. Did you mean to provide the overwrite option?`
        );
      if (
        null ==
        (t = this.isNewFile()
          ? this.#t5.project.createSourceFile(this.getFilePath(), "", {
              overwrite: e.overwrite,
            })
          : this.getSourceFile())
      )
        throw new h.errors.InvalidOperationError(
          `Cannot apply file text change to modify existing file that doesn't exist at path: ${this.getFilePath()}`
        );
      return (
        t.applyTextChanges(this.getTextChanges()),
        t._markAsInProject(),
        (this.#nt = !0),
        this
      );
    }
  }
  isNewFile() {
    return !!this.#tb.isNewFile;
  }
}
a7([h.Memoize], c8.prototype, "getTextChanges", null);
class c5 {
  #t5;
  #tb;
  constructor(e, t) {
    (this.#t5 = e), (this.#tb = t);
  }
  get compilerObject() {
    return this.#tb;
  }
  getDescription() {
    return this.compilerObject.description;
  }
  getChanges() {
    return this.compilerObject.changes.map((e) => new c8(this.#t5, e));
  }
}
class c7 extends c5 {
  getFixName() {
    return this.compilerObject.fixName;
  }
  getFixId() {
    return this.compilerObject.fixId;
  }
  getFixAllDescription() {
    return this.compilerObject.fixAllDescription;
  }
}
class c9 {
  #t5;
  #tb;
  constructor(e, t) {
    (this.#t5 = e), (this.#tb = t);
  }
  get compilerObject() {
    return this.#tb;
  }
  getChanges() {
    return this.compilerObject.changes.map((e) => new c8(this.#t5, e));
  }
  applyChanges(e) {
    for (let t of this.getChanges()) t.applyChanges(e);
    return this;
  }
}
a7([h.Memoize], c9.prototype, "getChanges", null);
class de {
  _context;
  _compilerObject;
  _sourceFile;
  constructor(e, t) {
    (this._context = e),
      (this._compilerObject = t),
      (this._sourceFile =
        this._context.compilerFactory.addOrGetSourceFileFromFilePath(
          e.fileSystemWrapper.getStandardizedAbsolutePath(
            this.compilerObject.fileName
          ),
          { markInProject: !1, scriptKind: void 0 }
        )),
      this._sourceFile._doActionPreNextModification(() => this.getNode());
  }
  get compilerObject() {
    return this._compilerObject;
  }
  getSourceFile() {
    return this._sourceFile;
  }
  getTextSpan() {
    return new c3(this.compilerObject.textSpan);
  }
  getNode() {
    let e,
      t = this.getTextSpan(),
      n = this.getSourceFile(),
      r = t.getStart(),
      i = t.getEnd();
    return (
      n._context.compilerFactory.forgetNodesCreatedInBlock((t) => {
        let a,
          o = n;
        for (; null != o; ) {
          if ((null == a && (e = o), o.getStart() === r && o.getWidth() === i))
            e = a = o;
          else if (null != a) break;
          o = o.getChildAtPos(r);
        }
        null != e && t(e);
      }),
      e
    );
  }
  getOriginalTextSpan() {
    let { originalTextSpan: e } = this.compilerObject;
    return null == e ? void 0 : new c3(e);
  }
  getOriginalFileName() {
    return this.compilerObject.originalFileName;
  }
}
a7([h.Memoize], de.prototype, "getTextSpan", null),
  a7([h.Memoize], de.prototype, "getNode", null),
  a7([h.Memoize], de.prototype, "getOriginalTextSpan", null);
class dt extends de {
  constructor(e, t) {
    super(e, t),
      this.getSourceFile()._doActionPreNextModification(() =>
        this.getDeclarationNode()
      );
  }
  getKind() {
    return this.compilerObject.kind;
  }
  getName() {
    return this.compilerObject.name;
  }
  getContainerKind() {
    return this.compilerObject.containerKind;
  }
  getContainerName() {
    return this.compilerObject.containerName;
  }
  getDeclarationNode() {
    if (
      "module" === this.getKind() &&
      this.getTextSpan().getLength() === this.getSourceFile().getFullWidth()
    )
      return this.getSourceFile();
    let e = this.getTextSpan().getStart(),
      t = (function t(n) {
        if (n.getKind() === h.SyntaxKind.Identifier && n.getStart() === e)
          return n;
        for (let r of n._getChildrenIterator())
          if (r.getPos() <= e && r.getEnd() > e) return t(r);
      })(this.getSourceFile());
    return null == t ? void 0 : t.getParentOrThrow();
  }
}
a7([h.Memoize], dt.prototype, "getDeclarationNode", null);
class dn {
  _compilerObject;
  constructor(e) {
    this._compilerObject = e;
  }
  get compilerObject() {
    return this._compilerObject;
  }
  getMessageText() {
    return this.compilerObject.messageText;
  }
  getNext() {
    let e = this.compilerObject.next;
    if (null != e)
      return e instanceof Array ? e.map((e) => new dn(e)) : [new dn(e)];
  }
  getCode() {
    return this.compilerObject.code;
  }
  getCategory() {
    return this.compilerObject.category;
  }
}
class dr {
  _context;
  _compilerObject;
  constructor(e, t) {
    (this._context = e), (this._compilerObject = t), this.getSourceFile();
  }
  get compilerObject() {
    return this._compilerObject;
  }
  getSourceFile() {
    if (null == this._context) return;
    let e = this.compilerObject.file;
    return null == e
      ? void 0
      : this._context.compilerFactory.getSourceFile(e, {
          markInProject: !1,
        });
  }
  getMessageText() {
    let e = this._compilerObject.messageText;
    return "string" == typeof e
      ? e
      : null == this._context
      ? new dn(e)
      : this._context.compilerFactory.getDiagnosticMessageChain(e);
  }
  getLineNumber() {
    let e = this.getSourceFile(),
      t = this.getStart();
    if (null != e && null != t)
      return h.StringUtils.getLineNumberAtPos(e.getFullText(), t);
  }
  getStart() {
    return this.compilerObject.start;
  }
  getLength() {
    return this.compilerObject.length;
  }
  getCategory() {
    return this.compilerObject.category;
  }
  getCode() {
    return this.compilerObject.code;
  }
  getSource() {
    return this.compilerObject.source;
  }
}
a7([h.Memoize], dr.prototype, "getSourceFile", null);
class di extends dr {
  constructor(e, t) {
    super(e, t);
  }
  getLineNumber() {
    return super.getLineNumber();
  }
  getStart() {
    return super.getStart();
  }
  getLength() {
    return super.getLength();
  }
  getSourceFile() {
    return super.getSourceFile();
  }
}
class da {
  #tb;
  #t5;
  constructor(e, t) {
    (this.#tb = t), (this.#t5 = e);
  }
  get compilerObject() {
    return this.#tb;
  }
  getFilePath() {
    return this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(
      this.compilerObject.name
    );
  }
  getWriteByteOrderMark() {
    return this.compilerObject.writeByteOrderMark || !1;
  }
  getText() {
    return this.compilerObject.text;
  }
}
class ds {
  #t5;
  #tb;
  constructor(e, t) {
    (this.#t5 = e), (this.#tb = t);
  }
  get compilerObject() {
    return this.#tb;
  }
  getDiagnostics() {
    return this.compilerObject.diagnostics.map((e) =>
      this.#t5.compilerFactory.getDiagnostic(e)
    );
  }
  getEmitSkipped() {
    return this.compilerObject.emitSkipped;
  }
  getOutputFiles() {
    return this.compilerObject.outputFiles.map((e) => new da(this.#t5, e));
  }
}
a7([h.Memoize], ds.prototype, "getDiagnostics", null),
  a7([h.Memoize], ds.prototype, "getOutputFiles", null);
class dl {
  _context;
  _compilerObject;
  constructor(e, t) {
    (this._context = e), (this._compilerObject = t), this.getDiagnostics();
  }
  get compilerObject() {
    return this._compilerObject;
  }
  getEmitSkipped() {
    return this.compilerObject.emitSkipped;
  }
  getDiagnostics() {
    return this.compilerObject.diagnostics.map((e) =>
      this._context.compilerFactory.getDiagnostic(e)
    );
  }
}
a7([h.Memoize], dl.prototype, "getDiagnostics", null);
class dc extends de {
  constructor(e, t) {
    super(e, t);
  }
  getKind() {
    return this.compilerObject.kind;
  }
  getDisplayParts() {
    return this.compilerObject.displayParts.map((e) =>
      this._context.compilerFactory.getSymbolDisplayPart(e)
    );
  }
}
a7([h.Memoize], dc.prototype, "getDisplayParts", null);
class dd extends dl {
  #nn;
  constructor(e, t, n) {
    super(e, t), (this.#nn = n);
  }
  getFiles() {
    return this.#nn;
  }
  saveFiles() {
    let e = this._context.fileSystemWrapper;
    return Promise.all(
      this.#nn.map((t) =>
        e.writeFile(
          t.filePath,
          t.writeByteOrderMark ? "\uFEFF" + t.text : t.text
        )
      )
    );
  }
  saveFilesSync() {
    let e = this._context.fileSystemWrapper;
    for (let t of this.#nn)
      e.writeFileSync(
        t.filePath,
        t.writeByteOrderMark ? "\uFEFF" + t.text : t.text
      );
  }
}
class du {
  #t5;
  #tb;
  constructor(e, t) {
    (this.#t5 = e), (this.#tb = t);
  }
  get compilerObject() {
    return this.#tb;
  }
  getEdits() {
    return this.compilerObject.edits.map((e) => new c8(this.#t5, e));
  }
  getRenameFilePath() {
    return this.compilerObject.renameFilename;
  }
  getRenameLocation() {
    return this.compilerObject.renameLocation;
  }
  applyChanges(e) {
    for (let t of this.getEdits()) t.applyChanges(e);
    return this;
  }
}
a7([h.Memoize], du.prototype, "getEdits", null);
class dp {
  _context;
  #tb;
  #nr;
  constructor(e, t) {
    (this._context = e),
      (this.#tb = t),
      (this.#nr = this.compilerObject.references.map((t) =>
        e.compilerFactory.getReferencedSymbolEntry(t)
      ));
  }
  get compilerObject() {
    return this.#tb;
  }
  getDefinition() {
    return this._context.compilerFactory.getReferencedSymbolDefinitionInfo(
      this.compilerObject.definition
    );
  }
  getReferences() {
    return this.#nr;
  }
}
a7([h.Memoize], dp.prototype, "getDefinition", null);
class d_ extends dt {
  constructor(e, t) {
    super(e, t);
  }
  getDisplayParts() {
    return this.compilerObject.displayParts.map((e) =>
      this._context.compilerFactory.getSymbolDisplayPart(e)
    );
  }
}
a7([h.Memoize], d_.prototype, "getDisplayParts", null);
class df extends de {
  constructor(e, t) {
    super(e, t);
  }
  isWriteAccess() {
    return this.compilerObject.isWriteAccess;
  }
  isInString() {
    return this.compilerObject.isInString;
  }
}
class dm extends df {
  constructor(e, t) {
    super(e, t);
  }
  isDefinition() {
    return this.compilerObject.isDefinition;
  }
}
class dh extends de {
  getPrefixText() {
    return this._compilerObject.prefixText;
  }
  getSuffixText() {
    return this._compilerObject.suffixText;
  }
}
class dg {
  #tb;
  constructor(e) {
    this.#tb = e;
  }
  get compilerObject() {
    return this.#tb;
  }
  getText() {
    return this.compilerObject.text;
  }
  getKind() {
    return this.compilerObject.kind;
  }
}
class dy {
  #t5;
  #ni;
  constructor(e) {
    this.#t5 = e;
  }
  get compilerObject() {
    return this.#ni();
  }
  _reset(e) {
    this.#ni = e;
  }
  getAmbientModules() {
    return this.compilerObject
      .getAmbientModules()
      .map((e) => this.#t5.compilerFactory.getSymbol(e));
  }
  getApparentType(e) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getApparentType(e.compilerType)
    );
  }
  getConstantValue(e) {
    return this.compilerObject.getConstantValue(e.compilerNode);
  }
  getFullyQualifiedName(e) {
    return this.compilerObject.getFullyQualifiedName(e.compilerSymbol);
  }
  getTypeAtLocation(e) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getTypeAtLocation(e.compilerNode)
    );
  }
  getContextualType(e) {
    let t = this.compilerObject.getContextualType(e.compilerNode);
    return null == t ? void 0 : this.#t5.compilerFactory.getType(t);
  }
  getTypeOfSymbolAtLocation(e, t) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getTypeOfSymbolAtLocation(
        e.compilerSymbol,
        t.compilerNode
      )
    );
  }
  getDeclaredTypeOfSymbol(e) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getDeclaredTypeOfSymbol(e.compilerSymbol)
    );
  }
  getSymbolAtLocation(e) {
    let t = this.compilerObject.getSymbolAtLocation(e.compilerNode);
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getAliasedSymbol(e) {
    if (!e.hasFlags(h.SymbolFlags.Alias)) return;
    let t = this.compilerObject.getAliasedSymbol(e.compilerSymbol);
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getImmediatelyAliasedSymbol(e) {
    let t = this.compilerObject.getImmediateAliasedSymbol(e.compilerSymbol);
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getExportSymbolOfSymbol(e) {
    return this.#t5.compilerFactory.getSymbol(
      this.compilerObject.getExportSymbolOfSymbol(e.compilerSymbol)
    );
  }
  getPropertiesOfType(e) {
    return this.compilerObject
      .getPropertiesOfType(e.compilerType)
      .map((e) => this.#t5.compilerFactory.getSymbol(e));
  }
  getTypeText(e, t, n) {
    return (
      null == n && (n = this.#na(t)),
      this.compilerObject.typeToString(e.compilerType, t?.compilerNode, n)
    );
  }
  getReturnTypeOfSignature(e) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getReturnTypeOfSignature(e.compilerSignature)
    );
  }
  getSignatureFromNode(e) {
    let t = this.compilerObject.getSignatureFromDeclaration(e.compilerNode);
    return null == t ? void 0 : this.#t5.compilerFactory.getSignature(t);
  }
  getExportsOfModule(e) {
    return (this.compilerObject.getExportsOfModule(e.compilerSymbol) || []).map(
      (e) => this.#t5.compilerFactory.getSymbol(e)
    );
  }
  getExportSpecifierLocalTargetSymbol(e) {
    let t = this.compilerObject.getExportSpecifierLocalTargetSymbol(
      e.compilerNode
    );
    return null == t ? void 0 : this.#t5.compilerFactory.getSymbol(t);
  }
  getResolvedSignature(e) {
    let t = this.compilerObject.getResolvedSignature(e.compilerNode);
    if (t && t.declaration) return this.#t5.compilerFactory.getSignature(t);
  }
  getResolvedSignatureOrThrow(e, t) {
    return h.errors.throwIfNullOrUndefined(
      this.getResolvedSignature(e),
      t ?? "Signature could not be resolved.",
      e
    );
  }
  getBaseTypeOfLiteralType(e) {
    return this.#t5.compilerFactory.getType(
      this.compilerObject.getBaseTypeOfLiteralType(e.compilerType)
    );
  }
  getSymbolsInScope(e, t) {
    return this.compilerObject
      .getSymbolsInScope(e.compilerNode, t)
      .map((e) => this.#t5.compilerFactory.getSymbol(e));
  }
  getTypeArguments(e) {
    return this.compilerObject
      .getTypeArguments(e.compilerType)
      .map((e) => this.#t5.compilerFactory.getType(e));
  }
  isTypeAssignableTo(e, t) {
    return this.compilerObject.isTypeAssignableTo(
      e.compilerType,
      t.compilerType
    );
  }
  #na(e) {
    let t =
      h.TypeFormatFlags.UseTypeOfFunction |
      h.TypeFormatFlags.NoTruncation |
      h.TypeFormatFlags.UseFullyQualifiedType |
      h.TypeFormatFlags.WriteTypeArgumentsOfSignature;
    return (
      null != e &&
        e.getKind() === h.SyntaxKind.TypeAliasDeclaration &&
        (t |= h.TypeFormatFlags.InTypeAlias),
      t
    );
  }
  getShorthandAssignmentValueSymbol(e) {
    let t = this.compilerObject.getShorthandAssignmentValueSymbol(
      e.compilerNode
    );
    return t ? this.#t5.compilerFactory.getSymbol(t) : void 0;
  }
  resolveName(e, t, n, r) {
    let i = this.compilerObject.resolveName(e, t?.compilerNode, n, r);
    return i ? this.#t5.compilerFactory.getSymbol(i) : void 0;
  }
}
class dv {
  #t5;
  #no;
  #ns;
  #nl;
  #nc;
  #nd;
  constructor(e) {
    (this.#t5 = e.context),
      (this.#nd = e.configFileParsingDiagnostics),
      (this.#no = new dy(this.#t5)),
      this._reset(e.rootNames, e.host);
  }
  get compilerObject() {
    return this.#nc();
  }
  _isCompilerProgramCreated() {
    return null != this.#ns;
  }
  _reset(e, t) {
    let n = this.#t5.compilerOptions.get();
    (this.#nc = () => (
      null == this.#ns &&
        ((this.#ns = h.ts.createProgram(e, n, t, this.#nl, this.#nd)),
        (this.#nl = void 0)),
      this.#ns
    )),
      null != this.#ns && ((this.#nl = this.#ns), (this.#ns = void 0)),
      this.#no._reset(() => this.compilerObject.getTypeChecker());
  }
  getTypeChecker() {
    return this.#no;
  }
  async emit(e = {}) {
    if (e.writeFile) {
      let t = `Cannot specify a ${h.nameof(
        e,
        "writeFile"
      )} option when emitting asynchrously. Use ${h.nameof(
        this,
        "emitSync"
      )}() instead.`;
      throw new h.errors.InvalidOperationError(t);
    }
    let { fileSystemWrapper: t } = this.#t5,
      n = [],
      r = this.#nu({
        writeFile: (e, r, i) => {
          n.push(
            t.writeFile(t.getStandardizedAbsolutePath(e), i ? "\uFEFF" + r : r)
          );
        },
        ...e,
      });
    return await Promise.all(n), new dl(this.#t5, r);
  }
  emitSync(e = {}) {
    return new dl(this.#t5, this.#nu(e));
  }
  emitToMemory(e = {}) {
    let t = [],
      { fileSystemWrapper: n } = this.#t5,
      r = this.#nu({
        writeFile: (e, r, i) => {
          t.push({
            filePath: n.getStandardizedAbsolutePath(e),
            text: r,
            writeByteOrderMark: i || !1,
          });
        },
        ...e,
      });
    return new dd(this.#t5, r, t);
  }
  #nu(e = {}) {
    let t =
        null != e.targetSourceFile ? e.targetSourceFile.compilerNode : void 0,
      { emitOnlyDtsFiles: n, customTransformers: r, writeFile: i } = e;
    return this.compilerObject.emit(t, i, void 0, n, r);
  }
  getSyntacticDiagnostics(e) {
    return this.compilerObject
      .getSyntacticDiagnostics(null == e ? void 0 : e.compilerNode)
      .map((e) => this.#t5.compilerFactory.getDiagnosticWithLocation(e));
  }
  getSemanticDiagnostics(e) {
    return this.compilerObject
      .getSemanticDiagnostics(e?.compilerNode)
      .map((e) => this.#t5.compilerFactory.getDiagnostic(e));
  }
  getDeclarationDiagnostics(e) {
    return this.compilerObject
      .getDeclarationDiagnostics(e?.compilerNode)
      .map((e) => this.#t5.compilerFactory.getDiagnosticWithLocation(e));
  }
  getGlobalDiagnostics() {
    return this.compilerObject
      .getGlobalDiagnostics()
      .map((e) => this.#t5.compilerFactory.getDiagnostic(e));
  }
  getConfigFileParsingDiagnostics() {
    return this.compilerObject
      .getConfigFileParsingDiagnostics()
      .map((e) => this.#t5.compilerFactory.getDiagnostic(e));
  }
  getEmitModuleResolutionKind() {
    return h.getEmitModuleResolutionKind(
      this.compilerObject.getCompilerOptions()
    );
  }
  isSourceFileFromExternalLibrary(e) {
    return e.isFromExternalLibrary();
  }
}
class db {
  #tb;
  #np;
  #n_;
  #t5;
  #nf = 0;
  get compilerObject() {
    return this.#tb;
  }
  constructor(e) {
    this.#t5 = e.context;
    const { languageServiceHost: t, compilerHost: n } = h.createHosts({
      transactionalFileSystem: this.#t5.fileSystemWrapper,
      sourceFileContainer: this.#t5.getSourceFileContainer(),
      compilerOptions: this.#t5.compilerOptions,
      getNewLine: () => this.#t5.manipulationSettings.getNewLineKindAsString(),
      getProjectVersion: () => `${this.#nf}`,
      resolutionHost: e.resolutionHost ?? {},
      libFolderPath: e.libFolderPath,
      skipLoadingLibFiles: e.skipLoadingLibFiles,
    });
    (this.#np = n),
      (this.#tb = h.ts.createLanguageService(
        t,
        this.#t5.compilerFactory.documentRegistry
      )),
      (this.#n_ = new dv({
        context: this.#t5,
        rootNames: Array.from(this.#t5.compilerFactory.getSourceFilePaths()),
        host: this.#np,
        configFileParsingDiagnostics: e.configFileParsingDiagnostics,
      })),
      this.#t5.compilerFactory.onSourceFileAdded((e) => {
        e._isInProject() && this._reset();
      }),
      this.#t5.compilerFactory.onSourceFileRemoved(() => this._reset());
  }
  _reset() {
    (this.#nf += 1),
      this.#n_._reset(
        Array.from(this.#t5.compilerFactory.getSourceFilePaths()),
        this.#np
      );
  }
  getProgram() {
    return this.#n_;
  }
  getDefinitions(e) {
    return this.getDefinitionsAtPosition(e._sourceFile, e.getStart());
  }
  getDefinitionsAtPosition(e, t) {
    return (
      this.compilerObject.getDefinitionAtPosition(e.getFilePath(), t) || []
    ).map((e) => this.#t5.compilerFactory.getDefinitionInfo(e));
  }
  getImplementations(e) {
    return this.getImplementationsAtPosition(e._sourceFile, e.getStart());
  }
  getImplementationsAtPosition(e, t) {
    return (
      this.compilerObject.getImplementationAtPosition(e.getFilePath(), t) || []
    ).map((e) => new dc(this.#t5, e));
  }
  findReferences(e) {
    return this.findReferencesAtPosition(e._sourceFile, e.getStart());
  }
  findReferencesAsNodes(e) {
    let t = this.findReferences(e);
    return Array.from(
      (function* () {
        for (let e of t) {
          let t = e.getDefinition().getKind() === h.ts.ScriptElementKind.alias,
            n = e.getReferences();
          for (let e = 0; e < n.length; e++) {
            let r = n[e];
            (t || !r.isDefinition() || e > 0) && (yield r.getNode());
          }
        }
      })()
    );
  }
  findReferencesAtPosition(e, t) {
    return (this.compilerObject.findReferences(e.getFilePath(), t) || []).map(
      (e) => this.#t5.compilerFactory.getReferencedSymbol(e)
    );
  }
  findRenameLocations(e, t = {}) {
    let n =
      null == t.usePrefixAndSuffixText
        ? this.#t5.manipulationSettings.getUsePrefixAndSuffixTextForRename()
        : t.usePrefixAndSuffixText;
    return (
      this.compilerObject.findRenameLocations(
        e._sourceFile.getFilePath(),
        e.getStart(),
        t.renameInStrings || !1,
        t.renameInComments || !1,
        n
      ) || []
    ).map((e) => new dh(this.#t5, e));
  }
  getSuggestionDiagnostics(e) {
    let t = this.#nm(e);
    return this.compilerObject
      .getSuggestionDiagnostics(t)
      .map((e) => this.#t5.compilerFactory.getDiagnosticWithLocation(e));
  }
  getFormattingEditsForRange(e, t, n) {
    return (
      this.compilerObject.getFormattingEditsForRange(
        e,
        t[0],
        t[1],
        this.#nh(n)
      ) || []
    ).map((e) => new c6(e));
  }
  getFormattingEditsForDocument(e, t) {
    let n = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e);
    return (
      this.compilerObject.getFormattingEditsForDocument(n, this.#nh(t)) || []
    ).map((e) => new c6(e));
  }
  getFormattedDocumentText(e, t) {
    let n = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e),
      r = this.#t5.compilerFactory.getSourceFileFromCacheFromFilePath(n);
    if (null == r) throw new h.errors.FileNotFoundError(n);
    t = this.#nh(t);
    let i = ep(r, this.getFormattingEditsForDocument(n, t)),
      a = t.newLineCharacter;
    return (
      t.ensureNewLineAtEndOfFile && !i.endsWith(a) && (i += a),
      i.replace(/\r?\n/g, a)
    );
  }
  getEmitOutput(e, t) {
    let n,
      r = this.#nm(e),
      i = this.compilerObject;
    return new ds(
      this.#t5,
      null == (n = i.getProgram()) || null == n.getSourceFile(r)
        ? { emitSkipped: !0, outputFiles: [], diagnostics: [] }
        : i.getEmitOutput(r, t)
    );
  }
  getIdentationAtPosition(e, t, n) {
    let r = this.#nm(e);
    return (
      null == n
        ? (n = this.#t5.manipulationSettings.getEditorSettings())
        : q(n, this.#t5.manipulationSettings),
      this.compilerObject.getIndentationAtPosition(r, t, n)
    );
  }
  organizeImports(e, t = {}, n = {}) {
    let r = { type: "file", fileName: this.#nm(e) };
    return this.compilerObject
      .organizeImports(r, this.#nh(t), this.#ng(n))
      .map((e) => new c8(this.#t5, e));
  }
  getEditsForRefactor(e, t, n, r, i, a = {}) {
    let o = this.#nm(e),
      s = "number" == typeof n ? n : { pos: n.getPos(), end: n.getEnd() },
      l = this.compilerObject.getEditsForRefactor(
        o,
        this.#nh(t),
        s,
        r,
        i,
        this.#ng(a)
      );
    return null != l ? new du(this.#t5, l) : void 0;
  }
  getCombinedCodeFix(e, t, n = {}, r = {}) {
    let i = this.compilerObject.getCombinedCodeFix(
      { type: "file", fileName: this.#nm(e) },
      t,
      this.#nh(n),
      this.#ng(r || {})
    );
    return new c9(this.#t5, i);
  }
  getCodeFixesAtPosition(e, t, n, r, i = {}, a = {}) {
    let o = this.#nm(e);
    return this.compilerObject
      .getCodeFixesAtPosition(o, t, n, r, this.#nh(i), this.#ng(a || {}))
      .map((e) => new c7(this.#t5, e));
  }
  #nm(e) {
    let t =
      "string" == typeof e
        ? this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e)
        : e.getFilePath();
    if (!this.#t5.compilerFactory.containsSourceFileAtPath(t))
      throw new h.errors.FileNotFoundError(t);
    return t;
  }
  #nh(e) {
    var t;
    return e._filled
      ? e
      : (q(
          (t = e = Object.assign(this.#t5.getFormatCodeSettings(), e)),
          this.#t5.manipulationSettings
        ),
        H(t, "insertSpaceAfterCommaDelimiter", !0),
        H(t, "insertSpaceAfterConstructor", !1),
        H(t, "insertSpaceAfterSemicolonInForStatements", !0),
        H(t, "insertSpaceAfterKeywordsInControlFlowStatements", !0),
        H(t, "insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces", !0),
        H(t, "insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets", !1),
        H(t, "insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces", !1),
        H(t, "insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces", !1),
        H(t, "insertSpaceBeforeFunctionParenthesis", !1),
        H(t, "insertSpaceBeforeAndAfterBinaryOperators", !0),
        H(t, "placeOpenBraceOnNewLineForFunctions", !1),
        H(t, "placeOpenBraceOnNewLineForControlBlocks", !1),
        H(t, "ensureNewLineAtEndOfFile", !0),
        (e._filled = !0),
        e);
  }
  #ng(e) {
    return Object.assign(this.#t5.getUserPreferences(), e);
  }
}
class dx {
  _context;
  #ny;
  get compilerType() {
    return this.#ny;
  }
  constructor(e, t) {
    (this._context = e), (this.#ny = t);
  }
  getText(e, t) {
    return this._context.typeChecker.getTypeText(this, e, t);
  }
  getAliasSymbol() {
    return null == this.compilerType.aliasSymbol
      ? void 0
      : this._context.compilerFactory.getSymbol(this.compilerType.aliasSymbol);
  }
  getAliasSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getAliasSymbol(),
      "Expected to find an alias symbol."
    );
  }
  getAliasTypeArguments() {
    return (this.compilerType.aliasTypeArguments || []).map((e) =>
      this._context.compilerFactory.getType(e)
    );
  }
  getApparentType() {
    return this._context.typeChecker.getApparentType(this);
  }
  getArrayElementTypeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getArrayElementType(),
      e ?? "Expected to find an array element type."
    );
  }
  getArrayElementType() {
    if (this.isArray()) return this.getTypeArguments()[0];
  }
  getBaseTypes() {
    return (this.compilerType.getBaseTypes() || []).map((e) =>
      this._context.compilerFactory.getType(e)
    );
  }
  getBaseTypeOfLiteralType() {
    return this._context.typeChecker.getBaseTypeOfLiteralType(this);
  }
  getCallSignatures() {
    return this.compilerType
      .getCallSignatures()
      .map((e) => this._context.compilerFactory.getSignature(e));
  }
  getConstructSignatures() {
    return this.compilerType
      .getConstructSignatures()
      .map((e) => this._context.compilerFactory.getSignature(e));
  }
  getConstraintOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getConstraint(),
      e ?? "Expected to find a constraint."
    );
  }
  getConstraint() {
    let e = this.compilerType.getConstraint();
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getDefaultOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getDefault(),
      e ?? "Expected to find a default type."
    );
  }
  getDefault() {
    let e = this.compilerType.getDefault();
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getProperties() {
    return this.compilerType
      .getProperties()
      .map((e) => this._context.compilerFactory.getSymbol(e));
  }
  getPropertyOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(this.getProperty(e), () =>
      k("symbol property", e)
    );
  }
  getProperty(e) {
    return j(this.getProperties(), e);
  }
  getApparentProperties() {
    return this.compilerType
      .getApparentProperties()
      .map((e) => this._context.compilerFactory.getSymbol(e));
  }
  getApparentProperty(e) {
    return j(this.getApparentProperties(), e);
  }
  isNullable() {
    return this.getUnionTypes().some((e) => e.isNull() || e.isUndefined());
  }
  getNonNullableType() {
    return this._context.compilerFactory.getType(
      this.compilerType.getNonNullableType()
    );
  }
  getNumberIndexType() {
    let e = this.compilerType.getNumberIndexType();
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getStringIndexType() {
    let e = this.compilerType.getStringIndexType();
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getTargetType() {
    let e = this.compilerType.target || void 0;
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getTargetTypeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getTargetType(),
      e ?? "Expected to find the target type."
    );
  }
  getTypeArguments() {
    return this._context.typeChecker.getTypeArguments(this);
  }
  getTupleElements() {
    return this.isTuple() ? this.getTypeArguments() : [];
  }
  getUnionTypes() {
    return this.isUnion()
      ? this.compilerType.types.map((e) =>
          this._context.compilerFactory.getType(e)
        )
      : [];
  }
  getIntersectionTypes() {
    return this.isIntersection()
      ? this.compilerType.types.map((e) =>
          this._context.compilerFactory.getType(e)
        )
      : [];
  }
  getLiteralValue() {
    return this.compilerType?.value;
  }
  getLiteralValueOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLiteralValue(),
      e ?? "Type was not a literal type."
    );
  }
  getLiteralFreshType() {
    let e = this.compilerType?.freshType;
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getLiteralFreshTypeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLiteralFreshType(),
      e ?? "Type was not a literal type."
    );
  }
  getLiteralRegularType() {
    let e = this.compilerType?.regularType;
    return null == e ? void 0 : this._context.compilerFactory.getType(e);
  }
  getLiteralRegularTypeOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getLiteralRegularType(),
      e ?? "Type was not a literal type."
    );
  }
  getSymbol() {
    let e = this.compilerType.getSymbol();
    return null == e ? void 0 : this._context.compilerFactory.getSymbol(e);
  }
  getSymbolOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getSymbol(),
      e ?? "Expected to find a symbol."
    );
  }
  isAssignableTo(e) {
    return this._context.typeChecker.isTypeAssignableTo(this, e);
  }
  isAnonymous() {
    return this.#nv(h.ObjectFlags.Anonymous);
  }
  isAny() {
    return this.#nb(h.TypeFlags.Any);
  }
  isNever() {
    return this.#nb(h.TypeFlags.Never);
  }
  isArray() {
    let e = this.getSymbol();
    return (
      null != e &&
      ("Array" === e.getName() || "ReadonlyArray" === e.getName()) &&
      1 === this.getTypeArguments().length
    );
  }
  isReadonlyArray() {
    let e = this.getSymbol();
    return (
      null != e &&
      "ReadonlyArray" === e.getName() &&
      1 === this.getTypeArguments().length
    );
  }
  isTemplateLiteral() {
    return this.#nb(h.TypeFlags.TemplateLiteral);
  }
  isBoolean() {
    return this.#nb(h.TypeFlags.Boolean);
  }
  isString() {
    return this.#nb(h.TypeFlags.String);
  }
  isNumber() {
    return this.#nb(h.TypeFlags.Number);
  }
  isBigInt() {
    return this.#nb(h.TypeFlags.BigInt);
  }
  isLiteral() {
    let e = this.isBooleanLiteral();
    return this.compilerType.isLiteral() || e;
  }
  isBooleanLiteral() {
    return this.#nb(h.TypeFlags.BooleanLiteral);
  }
  isBigIntLiteral() {
    return this.#nb(h.TypeFlags.BigIntLiteral);
  }
  isEnumLiteral() {
    return this.#nb(h.TypeFlags.EnumLiteral) && !this.isUnion();
  }
  isNumberLiteral() {
    return this.#nb(h.TypeFlags.NumberLiteral);
  }
  isStringLiteral() {
    return this.compilerType.isStringLiteral();
  }
  isClass() {
    return this.compilerType.isClass();
  }
  isClassOrInterface() {
    return this.compilerType.isClassOrInterface();
  }
  isEnum() {
    if (this.#nb(h.TypeFlags.Enum)) return !0;
    if (this.isEnumLiteral() && !this.isUnion()) return !1;
    let e = this.getSymbol();
    if (null == e) return !1;
    let t = e.getValueDeclaration();
    return null != t && tm.isEnumDeclaration(t);
  }
  isInterface() {
    return this.#nv(h.ObjectFlags.Interface);
  }
  isObject() {
    return this.#nb(h.TypeFlags.Object);
  }
  isTypeParameter() {
    return this.compilerType.isTypeParameter();
  }
  isTuple() {
    let e = this.getTargetType();
    return null != e && e.#nv(h.ObjectFlags.Tuple);
  }
  isUnion() {
    return this.compilerType.isUnion();
  }
  isIntersection() {
    return this.compilerType.isIntersection();
  }
  isUnionOrIntersection() {
    return this.compilerType.isUnionOrIntersection();
  }
  isUnknown() {
    return this.#nb(h.TypeFlags.Unknown);
  }
  isNull() {
    return this.#nb(h.TypeFlags.Null);
  }
  isUndefined() {
    return this.#nb(h.TypeFlags.Undefined);
  }
  isVoid() {
    return this.#nb(h.TypeFlags.Void);
  }
  getFlags() {
    return this.compilerType.flags;
  }
  getObjectFlags() {
    return (this.isObject() && this.compilerType.objectFlags) || 0;
  }
  #nb(e) {
    return (this.compilerType.flags & e) === e;
  }
  #nv(e) {
    return (this.getObjectFlags() & e) === e;
  }
}
class dS extends dx {
  getConstraintOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getConstraint(),
      e ?? "Expected type parameter to have a constraint."
    );
  }
  getConstraint() {
    let e = this.#nx();
    if (null == e) return;
    let t = e.getConstraint();
    if (null != t) return this._context.typeChecker.getTypeAtLocation(t);
  }
  getDefaultOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getDefault(),
      e ?? "Expected type parameter to have a default type."
    );
  }
  getDefault() {
    let e = this.#nx();
    if (null == e) return;
    let t = e.getDefault();
    if (null != t) return this._context.typeChecker.getTypeAtLocation(t);
  }
  #nx() {
    let e = this.getSymbol();
    if (null == e) return;
    let t = e.getDeclarations()[0];
    if (null != t && tm.isTypeParameterDeclaration(t)) return t;
  }
}
class dk {
  #nS;
  #nk;
  constructor(e, t) {
    (this.#nk = e), (this.#nS = t);
  }
  getSkippedFilePaths() {
    return this.#nk;
  }
  getOutputFilePaths() {
    return this.#nS;
  }
}
class dT {
  #t5;
  #nT;
  #nE;
  constructor(e, t) {
    (this.#t5 = e), this._setPathInternal(t);
  }
  _setPathInternal(e) {
    (this.#nT = e), (this.#nE = e.split("/").filter((e) => e.length > 0));
  }
  get _context() {
    return this.#nC(), this.#t5;
  }
  isAncestorOf(e) {
    return dT.#nA(this, e);
  }
  isDescendantOf(e) {
    return dT.#nA(e, this);
  }
  _getDepth() {
    return this.#nE.length;
  }
  getPath() {
    return this.#nC(), this.#nT;
  }
  getBaseName() {
    return this.#nE[this.#nE.length - 1];
  }
  getParentOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(
      this.getParent(),
      e ??
        (() =>
          `Parent directory of ${this.getPath()} does not exist or was never added.`)
    );
  }
  getParent() {
    if (!h.FileUtils.isRootDirPath(this.getPath()))
      return this.addDirectoryAtPathIfExists(
        h.FileUtils.getDirPath(this.getPath())
      );
  }
  getDirectoryOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(this.getDirectory(e), () =>
      "string" == typeof e
        ? `Could not find a directory at path '${this._context.fileSystemWrapper.getStandardizedAbsolutePath(
            e,
            this.getPath()
          )}'.`
        : "Could not find child directory that matched condition."
    );
  }
  getDirectory(e) {
    if ("string" == typeof e) {
      let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getPath()
      );
      return this._context.compilerFactory.getDirectoryFromCache(t);
    }
    return this.getDirectories().find(e);
  }
  getSourceFileOrThrow(e) {
    return h.errors.throwIfNullOrUndefined(this.getSourceFile(e), () => {
      if ("string" == typeof e) {
        let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
          e,
          this.getPath()
        );
        return `Could not find child source file at path '${t}'.`;
      }
      return "Could not find child source file that matched condition.";
    });
  }
  getSourceFile(e) {
    if ("string" == typeof e) {
      let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getPath()
      );
      return this._context.compilerFactory.getSourceFileFromCacheFromFilePath(
        t
      );
    }
    for (let t of this._getSourceFilesIterator()) if (e(t)) return t;
  }
  getDirectories() {
    return Array.from(this._getDirectoriesIterator());
  }
  _getDirectoriesIterator() {
    return this._context.compilerFactory.getChildDirectoriesOfDirectory(
      this.getPath()
    );
  }
  getSourceFiles(e) {
    let { compilerFactory: t, fileSystemWrapper: n } = this._context,
      r = this;
    return "string" == typeof e || e instanceof Array
      ? Array.from(
          (function* (e) {
            let i = Array.from(
              (function* () {
                for (let e of r._getDescendantSourceFilesIterator())
                  yield e.getFilePath();
              })()
            );
            for (let a of h.matchGlobs(i, e, r.getPath()))
              yield t.getSourceFileFromCacheFromFilePath(
                n.getStandardizedAbsolutePath(a)
              );
          })("string" == typeof e ? [e] : e)
        )
      : Array.from(this._getSourceFilesIterator());
  }
  _getSourceFilesIterator() {
    return this._context.compilerFactory.getChildSourceFilesOfDirectory(
      this.getPath()
    );
  }
  getDescendantSourceFiles() {
    return Array.from(this._getDescendantSourceFilesIterator());
  }
  *_getDescendantSourceFilesIterator() {
    for (let e of this._getSourceFilesIterator()) yield e;
    for (let e of this._getDirectoriesIterator())
      yield* e._getDescendantSourceFilesIterator();
  }
  getDescendantDirectories() {
    return Array.from(this._getDescendantDirectoriesIterator());
  }
  *_getDescendantDirectoriesIterator() {
    for (let e of this.getDirectories())
      yield e, yield* e._getDescendantDirectoriesIterator();
  }
  addSourceFilesAtPaths(e) {
    return (
      (e = (e = "string" == typeof e ? [e] : e).map((e) =>
        h.FileUtils.pathIsAbsolute(e)
          ? e
          : h.FileUtils.pathJoin(this.getPath(), e)
      )),
      this._context.directoryCoordinator.addSourceFilesAtPaths(e, {
        markInProject: this._isInProject(),
      })
    );
  }
  addDirectoryAtPathIfExists(e, t = {}) {
    let n = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.directoryCoordinator.addDirectoryAtPathIfExists(n, {
      ...t,
      markInProject: this._isInProject(),
    });
  }
  addDirectoryAtPath(e, t = {}) {
    let n = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.directoryCoordinator.addDirectoryAtPath(n, {
      ...t,
      markInProject: this._isInProject(),
    });
  }
  createDirectory(e) {
    let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.directoryCoordinator.createDirectoryOrAddIfExists(t, {
      markInProject: this._isInProject(),
    });
  }
  createSourceFile(e, t, n) {
    let r = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.compilerFactory.createSourceFile(r, t || "", {
      ...(n || {}),
      markInProject: this._isInProject(),
    });
  }
  addSourceFileAtPathIfExists(e) {
    let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.directoryCoordinator.addSourceFileAtPathIfExists(t, {
      markInProject: this._isInProject(),
    });
  }
  addSourceFileAtPath(e) {
    let t = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
      e,
      this.getPath()
    );
    return this._context.directoryCoordinator.addSourceFileAtPath(t, {
      markInProject: this._isInProject(),
    });
  }
  async emit(e = {}) {
    let { fileSystemWrapper: t } = this._context,
      n = [],
      r = [],
      i = [];
    for (let a of this.#nw(e))
      dC(a)
        ? i.push(a)
        : (n.push(t.writeFile(a.filePath, a.fileText)), r.push(a.filePath));
    return await Promise.all(n), new dk(i, r);
  }
  emitSync(e = {}) {
    let { fileSystemWrapper: t } = this._context,
      n = [],
      r = [];
    for (let i of this.#nw(e))
      dC(i)
        ? r.push(i)
        : (t.writeFileSync(i.filePath, i.fileText), n.push(i.filePath));
    return new dk(r, n);
  }
  #nw(e = {}) {
    let { emitOnlyDtsFiles: t = !1 } = e,
      n = null == e.outDir ? void 0 : /\.js$/i,
      r = null == e.outDir ? void 0 : /\.js\.map$/i,
      i = null == e.declarationDir && null == e.outDir ? void 0 : /\.d\.ts$/i,
      a = (e) =>
        null == e
          ? void 0
          : this._context.fileSystemWrapper.getStandardizedAbsolutePath(
              e,
              this.getPath()
            ),
      o = (e, t) =>
        null == e ? void 0 : h.FileUtils.pathJoin(e, t.getBaseName()),
      s =
        null != this._context.compilerOptions.get().declarationDir ||
        null != e.declarationDir;
    return (function* e(a, l, c) {
      for (let e of a.getSourceFiles()) {
        let a = e.getEmitOutput({ emitOnlyDtsFiles: t });
        if (a.getEmitSkipped()) {
          yield e.getFilePath();
          continue;
        }
        for (let e of a.getOutputFiles()) {
          let t = e.getFilePath(),
            a = e.getWriteByteOrderMark()
              ? h.FileUtils.getTextWithByteOrderMark(e.getText())
              : e.getText();
          null != l && (n.test(t) || r.test(t) || (!s && i.test(t)))
            ? (t = h.FileUtils.pathJoin(l, h.FileUtils.getBaseName(t)))
            : null != c &&
              i.test(t) &&
              (t = h.FileUtils.pathJoin(c, h.FileUtils.getBaseName(t))),
            yield { filePath: t, fileText: a };
        }
      }
      for (let t of a.getDirectories()) yield* e(t, o(l, t), o(c, t));
    })(this, a(e.outDir), a(e.declarationDir));
  }
  copyToDirectory(e, t) {
    let n = "string" == typeof e ? e : e.getPath();
    return this.copy(h.FileUtils.pathJoin(n, this.getBaseName()), t);
  }
  copy(e, t) {
    let n = this.getPath(),
      r = this._context.fileSystemWrapper,
      i = this._context.fileSystemWrapper.getStandardizedAbsolutePath(
        e,
        this.getPath()
      );
    return n === i
      ? this
      : ((t = dE(t)).includeUntrackedFiles && r.queueCopyDirectory(n, i),
        this.#nD(i, t));
  }
  async copyImmediately(e, t) {
    let n = this._context.fileSystemWrapper,
      r = this.getPath(),
      i = n.getStandardizedAbsolutePath(e, r);
    if (r === i) return await this.save(), this;
    t = dE(t);
    let a = this.#nD(i, t);
    return (
      t.includeUntrackedFiles && (await n.copyDirectoryImmediately(r, i)),
      await a.save(),
      a
    );
  }
  copyImmediatelySync(e, t) {
    let n = this._context.fileSystemWrapper,
      r = this.getPath(),
      i = n.getStandardizedAbsolutePath(e, r);
    if (r === i) return this.saveSync(), this;
    t = dE(t);
    let a = this.#nD(i, t);
    return (
      t.includeUntrackedFiles && n.copyDirectoryImmediatelySync(r, i),
      a.saveSync(),
      a
    );
  }
  #nD(e, t) {
    if (this.getPath() === e) return this;
    let { fileSystemWrapper: n, compilerFactory: r } = this._context,
      i = [this, ...this.getDescendantDirectories()].map((t) => ({
        newDirPath:
          t === this
            ? e
            : n.getStandardizedAbsolutePath(this.getRelativePathTo(t), e),
      })),
      a = this.getDescendantSourceFiles().map((t) => ({
        sourceFile: t,
        newFilePath: n.getStandardizedAbsolutePath(
          this.getRelativePathTo(t),
          e
        ),
        references: this.#nN(t),
      }));
    for (let { newDirPath: e } of i)
      this._context.compilerFactory.createDirectoryOrAddIfExists(e, {
        markInProject: this._isInProject(),
      });
    for (let { sourceFile: e, newFilePath: n } of a) e._copyInternal(n, t);
    for (let { references: e, newFilePath: t } of a)
      this.getSourceFileOrThrow(t)._updateReferencesForCopyInternal(e);
    return r.getDirectoryFromCache(e);
  }
  moveToDirectory(e, t) {
    let n = "string" == typeof e ? e : e.getPath();
    return this.move(h.FileUtils.pathJoin(n, this.getBaseName()), t);
  }
  move(e, t) {
    let n = this._context.fileSystemWrapper,
      r = this.getPath(),
      i = n.getStandardizedAbsolutePath(e, r);
    return r === i ? this : this.#nI(i, t, () => n.queueMoveDirectory(r, i));
  }
  async moveImmediately(e, t) {
    let n = this._context.fileSystemWrapper,
      r = this.getPath(),
      i = n.getStandardizedAbsolutePath(e, r);
    return (
      r === i || (this.#nI(i, t), await n.moveDirectoryImmediately(r, i)),
      await this.save(),
      this
    );
  }
  moveImmediatelySync(e, t) {
    let n = this._context.fileSystemWrapper,
      r = this.getPath(),
      i = n.getStandardizedAbsolutePath(e, r);
    return (
      r === i || (this.#nI(i, t), n.moveDirectoryImmediatelySync(r, i)),
      this.saveSync(),
      this
    );
  }
  #nI(e, t, n) {
    let r = this.getPath();
    if (r === e) return this;
    let i = this._context.compilerFactory.getDirectoryFromCacheOnlyIfInCache(e),
      a = null != i && i._isInProject();
    n && n();
    let o = this._context.fileSystemWrapper,
      s = this._context.compilerFactory,
      l = [this, ...this.getDescendantDirectories()].map((t) => ({
        directory: t,
        oldPath: t.getPath(),
        newDirPath:
          t === this
            ? e
            : o.getStandardizedAbsolutePath(this.getRelativePathTo(t), e),
      })),
      c = this.getDescendantSourceFiles().map((t) => ({
        sourceFile: t,
        newFilePath: o.getStandardizedAbsolutePath(
          this.getRelativePathTo(t),
          e
        ),
        references: this.#nP(t),
      }));
    for (let { directory: e, oldPath: t, newDirPath: n } of l) {
      s.removeDirectoryFromCache(t);
      let r = s.getDirectoryFromCache(n);
      null != r && r._forgetOnlyThis(),
        e._setPathInternal(n),
        s.addDirectoryToCache(e);
    }
    for (let { sourceFile: e, newFilePath: n } of c) e._moveInternal(n, t);
    for (let { sourceFile: e, references: t } of c)
      e._updateReferencesForMoveInternal(t, r);
    return a && this._markAsInProject(), this;
  }
  clear() {
    let e = this.getPath();
    this.#nM(),
      this._context.fileSystemWrapper.queueDirectoryDelete(e),
      this._context.fileSystemWrapper.queueMkdir(e);
  }
  async clearImmediately() {
    let e = this.getPath();
    this.#nM(),
      await this._context.fileSystemWrapper.clearDirectoryImmediately(e);
  }
  clearImmediatelySync() {
    let e = this.getPath();
    this.#nM(),
      this._context.fileSystemWrapper.clearDirectoryImmediatelySync(e);
  }
  delete() {
    let e = this.getPath();
    this.#nM(),
      this._context.fileSystemWrapper.queueDirectoryDelete(e),
      this.forget();
  }
  #nM() {
    for (let e of this.getSourceFiles()) e.delete();
    for (let e of this.getDirectories()) e.delete();
  }
  async deleteImmediately() {
    let { fileSystemWrapper: e } = this._context,
      t = this.getPath();
    this.forget(), await e.deleteDirectoryImmediately(t);
  }
  deleteImmediatelySync() {
    let { fileSystemWrapper: e } = this._context,
      t = this.getPath();
    this.forget(), e.deleteDirectoryImmediatelySync(t);
  }
  forget() {
    if (!this.wasForgotten()) {
      for (let e of this.getSourceFiles()) e.forget();
      for (let e of this.getDirectories()) e.forget();
      this._forgetOnlyThis();
    }
  }
  _forgetOnlyThis() {
    this.wasForgotten() ||
      (this._context.compilerFactory.removeDirectoryFromCache(this.getPath()),
      (this.#t5 = void 0));
  }
  async save() {
    await this._context.fileSystemWrapper.saveForDirectory(this.getPath());
    let e = this.getDescendantSourceFiles().filter((e) => !e.isSaved());
    await Promise.all(e.map((e) => e.save()));
  }
  saveSync() {
    this._context.fileSystemWrapper.saveForDirectorySync(this.getPath()),
      this.getDescendantSourceFiles()
        .filter((e) => !e.isSaved())
        .forEach((e) => e.saveSync());
  }
  getRelativePathTo(e) {
    let t = this;
    return h.FileUtils.getRelativePathTo(
      this.getPath(),
      e instanceof oe
        ? e.getFilePath()
        : e instanceof dT
        ? e.getPath()
        : t._context.fileSystemWrapper.getStandardizedAbsolutePath(
            e,
            t.getPath()
          )
    );
  }
  getRelativePathAsModuleSpecifierTo(e) {
    let t = this._context.program.getEmitModuleResolutionKind(),
      n = this,
      r = h.FileUtils.getRelativePathTo(
        this.getPath(),
        (function () {
          return e instanceof oe
            ? r(e.getFilePath())
            : e instanceof dT
            ? (function (e) {
                switch (t) {
                  case h.ModuleResolutionKind.Node10:
                    if (e === n)
                      return h.FileUtils.pathJoin(e.getPath(), "index.ts");
                    return e.getPath();
                  case h.ModuleResolutionKind.Classic:
                  case h.ModuleResolutionKind.Node16:
                  case h.ModuleResolutionKind.NodeNext:
                  case h.ModuleResolutionKind.Bundler:
                    return h.FileUtils.pathJoin(e.getPath(), "index.ts");
                  default:
                    return h.errors.throwNotImplementedForNeverValueError(t);
                }
              })(e)
            : r(
                n._context.fileSystemWrapper.getStandardizedAbsolutePath(
                  e,
                  n.getPath()
                )
              );
          function r(e) {
            let r = h.FileUtils.getDirPath(e);
            switch (t) {
              case h.ModuleResolutionKind.Node10:
                if (r === n.getPath()) return e;
                return e.replace(/\/index?(\.d\.ts|\.ts|\.js)$/i, "");
              case h.ModuleResolutionKind.Classic:
              case h.ModuleResolutionKind.Node16:
              case h.ModuleResolutionKind.NodeNext:
              case h.ModuleResolutionKind.Bundler:
                return e;
              default:
                return h.errors.throwNotImplementedForNeverValueError(t);
            }
          }
        })()
      ).replace(/((\.d\.ts$)|(\.[^/.]+$))/i, "");
    return r.startsWith("../") ? r : "./" + r;
  }
  getProject() {
    return this._context.project;
  }
  wasForgotten() {
    return null == this.#t5;
  }
  _isInProject() {
    return this._context.inProjectCoordinator.isDirectoryInProject(this);
  }
  _markAsInProject() {
    this._context.inProjectCoordinator.markDirectoryAsInProject(this);
  }
  _hasLoadedParent() {
    return this._context.compilerFactory.containsDirectoryAtPath(
      h.FileUtils.getDirPath(this.getPath())
    );
  }
  #nC() {
    if (this.wasForgotten())
      throw new h.errors.InvalidOperationError(
        "Cannot use a directory that was deleted, removed, or overwritten."
      );
  }
  #nN(e) {
    return e
      ._getReferencesForCopyInternal()
      .filter((e) => !this.isAncestorOf(e[1]));
  }
  #nP(e) {
    let { literalReferences: t, referencingLiterals: n } =
      e._getReferencesForMoveInternal();
    return {
      literalReferences: t.filter((e) => !this.isAncestorOf(e[1])),
      referencingLiterals: n.filter((e) => !this.isAncestorOf(e._sourceFile)),
    };
  }
  static #nA(e, t) {
    if (t instanceof oe && e === (t = t.getDirectory())) return !0;
    if (e.#nE.length >= t.#nE.length) return !1;
    for (let n = e.#nE.length - 1; n >= 0; n--)
      if (e.#nE[n] !== t.#nE[n]) return !1;
    return !0;
  }
}
function dE(e) {
  return H((e = h.ObjectUtils.clone(e || {})), "includeUntrackedFiles", !0), e;
}
function dC(e) {
  return "string" == typeof e;
}
class dA {
  #nL;
  #e0;
  constructor(e, t) {
    (this.#e0 = e), (this.#nL = t);
  }
  addDirectoryAtPathIfExists(e, t) {
    let n = this.#e0.getDirectoryFromPath(e, t);
    if (null != n) {
      if (t.recursive)
        for (let n of h.FileUtils.getDescendantDirectories(this.#nL, e))
          this.#e0.createDirectoryOrAddIfExists(n, t);
      return n;
    }
  }
  addDirectoryAtPath(e, t) {
    let n = this.addDirectoryAtPathIfExists(e, t);
    if (null == n) throw new h.errors.DirectoryNotFoundError(e);
    return n;
  }
  createDirectoryOrAddIfExists(e, t) {
    return this.#e0.createDirectoryOrAddIfExists(e, t);
  }
  addSourceFileAtPathIfExists(e, t) {
    return this.#e0.addOrGetSourceFileFromFilePath(e, {
      markInProject: t.markInProject,
      scriptKind: void 0,
    });
  }
  addSourceFileAtPath(e, t) {
    let n = this.addSourceFileAtPathIfExists(e, t);
    if (null == n)
      throw new h.errors.FileNotFoundError(
        this.#nL.getStandardizedAbsolutePath(e)
      );
    return n;
  }
  addSourceFilesAtPaths(e, t) {
    "string" == typeof e && (e = [e]);
    let n = [],
      r = new Set();
    for (let i of this.#nL.globSync(e)) {
      let e = this.addSourceFileAtPathIfExists(i, t);
      null != e && n.push(e), r.add(h.FileUtils.getDirPath(i));
    }
    for (let e of h.FileUtils.getParentMostPaths(Array.from(r)))
      this.addDirectoryAtPathIfExists(e, {
        recursive: !0,
        markInProject: t.markInProject,
      });
    return n;
  }
}
class dw {
  #t5;
  #nR = new h.KeyValueCache();
  #nF = new h.KeyValueCache();
  #nO = new h.KeyValueCache();
  #nB = new h.KeyValueCache();
  constructor(e) {
    this.#t5 = e;
  }
  has(e) {
    return this.#nR.has(e);
  }
  get(e) {
    if (!this.#nR.has(e)) {
      for (let t of this.#nB.getValues())
        if (h.FileUtils.pathStartsWith(t.getPath(), e))
          return this.createOrAddIfExists(e);
      return;
    }
    return this.#nR.get(e);
  }
  getOrphans() {
    return this.#nB.getValues();
  }
  getAll() {
    return this.#nR.getValuesAsArray();
  }
  *getAllByDepth() {
    let e = new h.KeyValueCache(),
      t = 0;
    for (let e of this.getOrphans()) n(e);
    for (t = Math.min(...Array.from(e.getKeys())); e.getSize() > 0; ) {
      for (let r of e.get(t) || []) yield r, r.getDirectories().forEach(n);
      e.removeByKey(t), t++;
    }
    function n(n) {
      let r = n._getDepth();
      if (t > r)
        throw Error(
          `For some reason a subdirectory had a lower depth than the parent directory: ${n.getPath()}`
        );
      e.getOrCreate(r, () => []).push(n);
    }
  }
  remove(e) {
    this.#nW(e), this.#nR.removeByKey(e), this.#nB.removeByKey(e);
  }
  *getChildDirectoriesOfDirectory(e) {
    let t = this.#nO.get(e)?.entries();
    if (null != t) for (let e of t) yield e;
  }
  *getChildSourceFilesOfDirectory(e) {
    let t = this.#nF.get(e)?.entries();
    if (null != t) for (let e of t) yield e;
  }
  addSourceFile(e) {
    let t = e.getDirectoryPath();
    this.createOrAddIfExists(t),
      this.#nF
        .getOrCreate(
          t,
          () =>
            new h.SortedKeyValueArray(
              (e) => e.getBaseName(),
              h.LocaleStringComparer.instance
            )
        )
        .set(e);
  }
  removeSourceFile(e) {
    let t = h.FileUtils.getDirPath(e),
      n = this.#nF.get(t);
    null != n &&
      (n.removeByKey(h.FileUtils.getBaseName(e)),
      n.hasItems() || this.#nF.removeByKey(t));
  }
  createOrAddIfExists(e) {
    return this.has(e) ? this.get(e) : (this.#nj(e), this.#nz(e));
  }
  #nz(e) {
    let t = new dT(this.#t5, e);
    return this.addDirectory(t), t;
  }
  addDirectory(e) {
    let t = e.getPath(),
      n = h.FileUtils.getDirPath(t),
      r = n === t;
    for (let e of this.#nB.getValues()) {
      let n = e.getPath(),
        r = h.FileUtils.getDirPath(n);
      r !== n && r === t && this.#nB.removeByKey(n);
    }
    for (let i of (r || this.#nV(e),
    this.has(n) || this.#nB.set(t, e),
    this.#nR.set(t, e),
    this.#t5.fileSystemWrapper.directoryExistsSync(t) ||
      this.#t5.fileSystemWrapper.queueMkdir(t),
    this.#nB.getValues()))
      e.isAncestorOf(i) && this.#nj(i.getPath());
  }
  #nV(e) {
    if (h.FileUtils.isRootDirPath(e.getPath())) return;
    let t = h.FileUtils.getDirPath(e.getPath());
    this.#nO
      .getOrCreate(
        t,
        () =>
          new h.SortedKeyValueArray(
            (e) => e.getBaseName(),
            h.LocaleStringComparer.instance
          )
      )
      .set(e);
  }
  #nW(e) {
    if (h.FileUtils.isRootDirPath(e)) return;
    let t = h.FileUtils.getDirPath(e),
      n = this.#nO.get(t);
    null != n &&
      (n.removeByKey(h.FileUtils.getBaseName(e)),
      n.hasItems() || this.#nO.removeByKey(t));
  }
  #nj(e) {
    let t = [],
      n = h.FileUtils.getDirPath(e);
    for (; e !== n; ) {
      if (((e = n), (n = h.FileUtils.getDirPath(e)), this.#nR.has(e))) {
        for (let e of t) this.#nz(e);
        break;
      }
      t.unshift(e);
    }
  }
}
class dD extends h.KeyValueCache {
  #nG = [];
  getOrCreate(e, t) {
    return super.getOrCreate(e, () => {
      let e = t();
      return this.#nG.length > 0 && this.#nG[this.#nG.length - 1].add(e), e;
    });
  }
  setForgetPoint() {
    this.#nG.push(new Set());
  }
  forgetLastPoint() {
    let e = this.#nG.pop();
    null != e && this.#nK(e.values());
  }
  rememberNode(e) {
    if (e.wasForgotten())
      throw new h.errors.InvalidOperationError(
        "Cannot remember a node that was removed or forgotten."
      );
    let t = !1;
    for (let n of this.#nG)
      if (n.delete(e)) {
        t = !0;
        break;
      }
    return t && this.#nU(e), t;
  }
  #nU(e) {
    let t = e.getParentSyntaxList() || e.getParent();
    null != t && this.rememberNode(t);
  }
  #nK(e) {
    for (let t of e)
      t.wasForgotten() ||
        t.getKind() === h.SyntaxKind.SourceFile ||
        t._forgetOnlyThis();
  }
}
let dN = {
  [h.SyntaxKind.SourceFile]: oe,
  [h.SyntaxKind.ArrayBindingPattern]: rS,
  [h.SyntaxKind.ArrayLiteralExpression]: rB,
  [h.SyntaxKind.ArrayType]: sa,
  [h.SyntaxKind.ArrowFunction]: ou,
  [h.SyntaxKind.AsExpression]: rV,
  [h.SyntaxKind.AwaitExpression]: rK,
  [h.SyntaxKind.BigIntLiteral]: cT,
  [h.SyntaxKind.BindingElement]: rT,
  [h.SyntaxKind.BinaryExpression]: rD,
  [h.SyntaxKind.Block]: i$,
  [h.SyntaxKind.BreakStatement]: iX,
  [h.SyntaxKind.CallExpression]: rH,
  [h.SyntaxKind.CallSignature]: lG,
  [h.SyntaxKind.CaseBlock]: iQ,
  [h.SyntaxKind.CaseClause]: i0,
  [h.SyntaxKind.CatchClause]: i2,
  [h.SyntaxKind.ClassDeclaration]: oO,
  [h.SyntaxKind.ClassExpression]: oU,
  [h.SyntaxKind.ClassStaticBlockDeclaration]: oq,
  [h.SyntaxKind.ConditionalType]: so,
  [h.SyntaxKind.Constructor]: oY,
  [h.SyntaxKind.ConstructorType]: sd,
  [h.SyntaxKind.ConstructSignature]: lH,
  [h.SyntaxKind.ContinueStatement]: i3,
  [h.SyntaxKind.CommaListExpression]: rJ,
  [h.SyntaxKind.ComputedPropertyName]: l6,
  [h.SyntaxKind.ConditionalExpression]: rX,
  [h.SyntaxKind.DebuggerStatement]: i8,
  [h.SyntaxKind.Decorator]: o6,
  [h.SyntaxKind.DefaultClause]: i7,
  [h.SyntaxKind.DeleteExpression]: rQ,
  [h.SyntaxKind.DoStatement]: at,
  [h.SyntaxKind.ElementAccessExpression]: r0,
  [h.SyntaxKind.EmptyStatement]: ar,
  [h.SyntaxKind.EnumDeclaration]: lO,
  [h.SyntaxKind.EnumMember]: lW,
  [h.SyntaxKind.ExportAssignment]: aA,
  [h.SyntaxKind.ExportDeclaration]: aD,
  [h.SyntaxKind.ExportSpecifier]: aI,
  [h.SyntaxKind.ExpressionWithTypeArguments]: sp,
  [h.SyntaxKind.ExpressionStatement]: aa,
  [h.SyntaxKind.ExternalModuleReference]: aM,
  [h.SyntaxKind.QualifiedName]: ce,
  [h.SyntaxKind.ForInStatement]: as,
  [h.SyntaxKind.ForOfStatement]: ac,
  [h.SyntaxKind.ForStatement]: au,
  [h.SyntaxKind.FunctionDeclaration]: ov,
  [h.SyntaxKind.FunctionExpression]: ox,
  [h.SyntaxKind.FunctionType]: sf,
  [h.SyntaxKind.GetAccessor]: oZ,
  [h.SyntaxKind.HeritageClause]: lj,
  [h.SyntaxKind.Identifier]: l5,
  [h.SyntaxKind.IfStatement]: a_,
  [h.SyntaxKind.ImportClause]: aW,
  [h.SyntaxKind.ImportDeclaration]: az,
  [h.SyntaxKind.ImportEqualsDeclaration]: aK,
  [h.SyntaxKind.ImportSpecifier]: aH,
  [h.SyntaxKind.ImportType]: sm,
  [h.SyntaxKind.ImportAttribute]: aR,
  [h.SyntaxKind.ImportAttributes]: aO,
  [h.SyntaxKind.IndexedAccessType]: sh,
  [h.SyntaxKind.IndexSignature]: lJ,
  [h.SyntaxKind.InferType]: sg,
  [h.SyntaxKind.InterfaceDeclaration]: lX,
  [h.SyntaxKind.IntersectionType]: sy,
  [h.SyntaxKind.JSDocAllType]: sz,
  [h.SyntaxKind.JSDocAugmentsTag]: sJ,
  [h.SyntaxKind.JSDocAuthorTag]: s$,
  [h.SyntaxKind.JSDocCallbackTag]: sX,
  [h.SyntaxKind.JSDocClassTag]: sY,
  [h.SyntaxKind.JSDocDeprecatedTag]: sQ,
  [h.SyntaxKind.JSDocEnumTag]: sZ,
  [h.SyntaxKind.JSDocFunctionType]: s1,
  [h.SyntaxKind.JSDocImplementsTag]: s2,
  [h.SyntaxKind.JSDocLink]: s4,
  [h.SyntaxKind.JSDocLinkCode]: s3,
  [h.SyntaxKind.JSDocLinkPlain]: s6,
  [h.SyntaxKind.JSDocMemberName]: s8,
  [h.SyntaxKind.JSDocNamepathType]: s5,
  [h.SyntaxKind.JSDocNameReference]: s7,
  [h.SyntaxKind.JSDocNonNullableType]: s9,
  [h.SyntaxKind.JSDocNullableType]: le,
  [h.SyntaxKind.JSDocOptionalType]: lt,
  [h.SyntaxKind.JSDocOverrideTag]: li,
  [h.SyntaxKind.JSDocParameterTag]: lo,
  [h.SyntaxKind.JSDocPrivateTag]: ls,
  [h.SyntaxKind.JSDocPropertyTag]: lc,
  [h.SyntaxKind.JSDocProtectedTag]: ld,
  [h.SyntaxKind.JSDocPublicTag]: lu,
  [h.SyntaxKind.JSDocReturnTag]: lf,
  [h.SyntaxKind.JSDocReadonlyTag]: lp,
  [h.SyntaxKind.JSDocThrowsTag]: lA,
  [h.SyntaxKind.JSDocOverloadTag]: lr,
  [h.SyntaxKind.JSDocSatisfiesTag]: lh,
  [h.SyntaxKind.JSDocSeeTag]: ly,
  [h.SyntaxKind.JSDocSignature]: lv,
  [h.SyntaxKind.JSDocTag]: lP,
  [h.SyntaxKind.JSDocTemplateTag]: lS,
  [h.SyntaxKind.JSDocText]: lk,
  [h.SyntaxKind.JSDocThisTag]: lE,
  [h.SyntaxKind.JSDocTypeExpression]: lD,
  [h.SyntaxKind.JSDocTypeLiteral]: lN,
  [h.SyntaxKind.JSDocTypeTag]: lI,
  [h.SyntaxKind.JSDocTypedefTag]: lw,
  [h.SyntaxKind.JSDocUnknownType]: lM,
  [h.SyntaxKind.JSDocVariadicType]: lL,
  [h.SyntaxKind.JsxAttribute]: cn,
  [h.SyntaxKind.JsxClosingElement]: ci,
  [h.SyntaxKind.JsxClosingFragment]: ca,
  [h.SyntaxKind.JsxElement]: cs,
  [h.SyntaxKind.JsxExpression]: cd,
  [h.SyntaxKind.JsxFragment]: cu,
  [h.SyntaxKind.JsxNamespacedName]: c_,
  [h.SyntaxKind.JsxOpeningElement]: cm,
  [h.SyntaxKind.JsxOpeningFragment]: ch,
  [h.SyntaxKind.JsxSelfClosingElement]: cy,
  [h.SyntaxKind.JsxSpreadAttribute]: cb,
  [h.SyntaxKind.JsxText]: cS,
  [h.SyntaxKind.LabeledStatement]: am,
  [h.SyntaxKind.LiteralType]: sv,
  [h.SyntaxKind.MappedType]: sb,
  [h.SyntaxKind.MetaProperty]: r8,
  [h.SyntaxKind.MethodDeclaration]: ow,
  [h.SyntaxKind.MethodSignature]: lQ,
  [h.SyntaxKind.ModuleBlock]: aJ,
  [h.SyntaxKind.ModuleDeclaration]: aY,
  [h.SyntaxKind.NamedExports]: a0,
  [h.SyntaxKind.NamedImports]: a2,
  [h.SyntaxKind.NamedTupleMember]: sS,
  [h.SyntaxKind.NamespaceExport]: a3,
  [h.SyntaxKind.NamespaceImport]: a8,
  [h.SyntaxKind.NewExpression]: r7,
  [h.SyntaxKind.NonNullExpression]: ie,
  [h.SyntaxKind.NotEmittedStatement]: ag,
  [h.SyntaxKind.NoSubstitutionTemplateLiteral]: cj,
  [h.SyntaxKind.NumericLiteral]: cL,
  [h.SyntaxKind.ObjectBindingPattern]: rE,
  [h.SyntaxKind.ObjectLiteralExpression]: io,
  [h.SyntaxKind.OmittedExpression]: im,
  [h.SyntaxKind.Parameter]: ok,
  [h.SyntaxKind.ParenthesizedExpression]: ig,
  [h.SyntaxKind.ParenthesizedType]: sk,
  [h.SyntaxKind.PartiallyEmittedExpression]: iv,
  [h.SyntaxKind.PostfixUnaryExpression]: ix,
  [h.SyntaxKind.PrefixUnaryExpression]: ik,
  [h.SyntaxKind.PrivateIdentifier]: l9,
  [h.SyntaxKind.PropertyAccessExpression]: iE,
  [h.SyntaxKind.PropertyAssignment]: il,
  [h.SyntaxKind.PropertyDeclaration]: o1,
  [h.SyntaxKind.PropertySignature]: l0,
  [h.SyntaxKind.RegularExpressionLiteral]: cF,
  [h.SyntaxKind.RestType]: sT,
  [h.SyntaxKind.ReturnStatement]: av,
  [h.SyntaxKind.SatisfiesExpression]: iA,
  [h.SyntaxKind.SetAccessor]: o4,
  [h.SyntaxKind.ShorthandPropertyAssignment]: id,
  [h.SyntaxKind.SpreadAssignment]: ip,
  [h.SyntaxKind.SpreadElement]: iD,
  [h.SyntaxKind.StringLiteral]: cB,
  [h.SyntaxKind.SwitchStatement]: ax,
  [h.SyntaxKind.SyntaxList]: tx,
  [h.SyntaxKind.TaggedTemplateExpression]: cz,
  [h.SyntaxKind.TemplateExpression]: cG,
  [h.SyntaxKind.TemplateHead]: cU,
  [h.SyntaxKind.TemplateLiteralType]: sE,
  [h.SyntaxKind.TemplateMiddle]: cq,
  [h.SyntaxKind.TemplateSpan]: c$,
  [h.SyntaxKind.TemplateTail]: cY,
  [h.SyntaxKind.ThisType]: sC,
  [h.SyntaxKind.ThrowStatement]: ak,
  [h.SyntaxKind.TryStatement]: aE,
  [h.SyntaxKind.TupleType]: sA,
  [h.SyntaxKind.TypeAliasDeclaration]: sD,
  [h.SyntaxKind.TypeAssertionExpression]: iO,
  [h.SyntaxKind.TypeLiteral]: sI,
  [h.SyntaxKind.TypeOperator]: sP,
  [h.SyntaxKind.TypeParameter]: sL,
  [h.SyntaxKind.TypePredicate]: sF,
  [h.SyntaxKind.TypeQuery]: sO,
  [h.SyntaxKind.TypeReference]: sB,
  [h.SyntaxKind.UnionType]: sW,
  [h.SyntaxKind.VariableDeclaration]: cZ,
  [h.SyntaxKind.VariableDeclarationList]: c1,
  [h.SyntaxKind.VariableStatement]: oi,
  [h.SyntaxKind.JSDoc]: st,
  [h.SyntaxKind.TypeOfExpression]: iW,
  [h.SyntaxKind.WhileStatement]: oo,
  [h.SyntaxKind.WithStatement]: ol,
  [h.SyntaxKind.YieldExpression]: iG,
  [h.SyntaxKind.SemicolonToken]: tm,
  [h.SyntaxKind.AnyKeyword]: rA,
  [h.SyntaxKind.BooleanKeyword]: rA,
  [h.SyntaxKind.FalseKeyword]: cw,
  [h.SyntaxKind.ImportKeyword]: r2,
  [h.SyntaxKind.InferKeyword]: tm,
  [h.SyntaxKind.NeverKeyword]: tm,
  [h.SyntaxKind.NullKeyword]: cP,
  [h.SyntaxKind.NumberKeyword]: rA,
  [h.SyntaxKind.ObjectKeyword]: rA,
  [h.SyntaxKind.StringKeyword]: rA,
  [h.SyntaxKind.SymbolKeyword]: rA,
  [h.SyntaxKind.SuperKeyword]: iP,
  [h.SyntaxKind.ThisKeyword]: iR,
  [h.SyntaxKind.TrueKeyword]: cC,
  [h.SyntaxKind.UndefinedKeyword]: rA,
  [h.SyntaxKind.VoidExpression]: iz,
};
class dI {
  #t5;
  #ev = new Map();
  #nH = new h.WeakCache();
  #nq = new h.WeakCache();
  #nJ = new h.WeakCache();
  #n$ = new h.WeakCache();
  #nX = new h.WeakCache();
  #nY = new h.WeakCache();
  #nQ = new h.WeakCache();
  #nZ = new h.WeakCache();
  #n0 = new h.WeakCache();
  #n1 = new h.WeakCache();
  #n2 = new h.WeakCache();
  #n4 = new h.WeakCache();
  #n3 = new h.WeakCache();
  #n6 = new dD();
  #n8;
  #n5 = new h.EventContainer();
  #n7 = new h.EventContainer();
  documentRegistry;
  constructor(e) {
    (this.documentRegistry = new h.DocumentRegistry(e.fileSystemWrapper)),
      (this.#n8 = new dw(e)),
      e.compilerOptions.onModified(() => {
        for (let e of Array.from(this.#ev.values()))
          ts({ sourceFile: e, newFilePath: e.getFilePath() });
      }),
      (this.#t5 = e);
  }
  *getSourceFilesByDirectoryDepth() {
    for (let e of this.getDirectoriesByDepth()) yield* e.getSourceFiles();
  }
  getSourceFilePaths() {
    return this.#ev.keys();
  }
  getChildDirectoriesOfDirectory(e) {
    return this.#n8.getChildDirectoriesOfDirectory(e);
  }
  getChildSourceFilesOfDirectory(e) {
    return this.#n8.getChildSourceFilesOfDirectory(e);
  }
  onSourceFileAdded(e, t = !0) {
    t ? this.#n5.subscribe(e) : this.#n5.unsubscribe(e);
  }
  onSourceFileRemoved(e) {
    this.#n7.subscribe(e);
  }
  createSourceFile(e, t, n) {
    if (
      "string" ==
      typeof (t =
        t instanceof Function ? J(this.#t5.createWriter(), t) : t || "")
    )
      return this.createSourceFileFromText(e, t, n);
    let r = this.#t5.createWriter();
    return (
      this.#t5.structurePrinterFactory
        .forSourceFile({
          isAmbient: ".d.ts" === h.FileUtils.getExtension(e),
        })
        .printText(r, t),
      this.createSourceFileFromText(e, r.toString(), n)
    );
  }
  createSourceFileFromText(e, t, n) {
    return ((e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e)),
    !0 === n.overwrite)
      ? this.#n9(e, t, n)
      : (this.throwIfFileExists(
          e,
          "Did you mean to provide the overwrite option?"
        ),
        this.#re(e, t, n));
  }
  throwIfFileExists(e, t) {
    if (
      this.containsSourceFileAtPath(e) ||
      this.#t5.fileSystemWrapper.fileExistsSync(e)
    )
      throw (
        ((t = null == t ? "" : t + " "),
        new h.errors.InvalidOperationError(
          `${t}A source file already exists at the provided file path: ${e}`
        ))
      );
  }
  #n9(e, t, n) {
    e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e);
    let r = this.addOrGetSourceFileFromFilePath(e, n);
    return null != r
      ? (r.getChildren().forEach((e) => e.forget()),
        this.replaceCompilerNode(
          r,
          this.createCompilerSourceFileFromText(e, t, n.scriptKind)
        ),
        r)
      : this.#re(e, t, n);
  }
  getSourceFileFromCacheFromFilePath(e) {
    return (
      (e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e)),
      this.#ev.get(e)
    );
  }
  addOrGetSourceFileFromFilePath(e, t) {
    e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e);
    let n = this.#ev.get(e);
    if (null == n) {
      let r = this.#t5.fileSystemWrapper.readFileIfExistsSync(
        e,
        this.#t5.getEncoding()
      );
      null != r &&
        (this.#t5.logger.log(`Loaded file: ${e}`),
        (n = this.#re(e, r, t))._setIsSaved(!0));
    }
    return null != n && t.markInProject && n._markAsInProject(), n;
  }
  containsSourceFileAtPath(e) {
    return (
      (e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e)),
      this.#ev.has(e)
    );
  }
  containsDirectoryAtPath(e) {
    return (
      (e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e)),
      this.#n8.has(e)
    );
  }
  getSourceFileForNode(e) {
    let t = e;
    for (; t.kind !== h.SyntaxKind.SourceFile; ) {
      if (null == t.parent) return;
      t = t.parent;
    }
    return this.getSourceFile(t, { markInProject: !1 });
  }
  hasCompilerNode(e) {
    return this.#n6.has(e);
  }
  getExistingNodeFromCompilerNode(e) {
    return this.#n6.get(e);
  }
  getNodeFromCompilerNode(e, t) {
    if (e.kind === h.SyntaxKind.SourceFile)
      return this.getSourceFile(e, { markInProject: !1 });
    return this.#n6.getOrCreate(e, () => {
      let e = n.call(this);
      return r.call(this, e), e;
    });
    function n() {
      return null != e._commentKind
        ? P.isCommentStatement(e)
          ? new i4(this.#t5, e, t)
          : P.isCommentClassElement(e)
          ? new oJ(this.#t5, e, t)
          : P.isCommentTypeElement(e)
          ? new lK(this.#t5, e, t)
          : P.isCommentObjectLiteralElement(e)
          ? new ir(this.#t5, e, t)
          : P.isCommentEnumMember(e)
          ? new lR(this.#t5, e, t)
          : h.errors.throwNotImplementedForNeverValueError(e)
        : new (dN[e.kind] || tm)(this.#t5, e, t);
    }
    function r(n) {
      if (null != e.parent) {
        let n = this.getNodeFromCompilerNode(e.parent, t);
        n._wrappedChildCount++;
      }
      let r = n._getParentSyntaxListIfWrapped();
      if (
        (null != r && r._wrappedChildCount++,
        e.kind === h.SyntaxKind.SyntaxList)
      ) {
        let e = 0;
        for (let t of n._getChildrenInCacheIterator()) e++;
        n._wrappedChildCount = e;
      }
    }
  }
  #re(e, t, n) {
    let r = h.StringUtils.hasBom(t);
    r && (t = h.StringUtils.stripBom(t));
    let i = this.getSourceFile(
      this.createCompilerSourceFileFromText(e, t, n.scriptKind),
      n
    );
    return r && (i._hasBom = !0), i;
  }
  createCompilerSourceFileFromText(e, t, n) {
    return this.documentRegistry.createOrUpdateSourceFile(
      e,
      this.#t5.compilerOptions.get(),
      h.ts.ScriptSnapshot.fromString(t),
      n
    );
  }
  getSourceFile(e, t) {
    let n = !1,
      r =
        this.#ev.get(e.fileName) ??
        this.#n6.getOrCreate(e, () => {
          let r = new oe(this.#t5, e);
          return (
            t.markInProject ||
              this.#t5.inProjectCoordinator.setSourceFileNotInProject(r),
            this.#rt(r),
            (n = !0),
            r
          );
        });
    return t.markInProject && r._markAsInProject(), n && this.#n5.fire(r), r;
  }
  #rt(e) {
    this.#ev.set(e.getFilePath(), e),
      this.#t5.fileSystemWrapper.removeFileDelete(e.getFilePath()),
      this.#n8.addSourceFile(e);
  }
  getDirectoryFromPath(e, t) {
    e = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(e);
    let n = this.#n8.get(e);
    return (
      null == n &&
        this.#t5.fileSystemWrapper.directoryExistsSync(e) &&
        (n = this.#n8.createOrAddIfExists(e)),
      null != n && t.markInProject && n._markAsInProject(),
      n
    );
  }
  createDirectoryOrAddIfExists(e, t) {
    let n = this.#n8.createOrAddIfExists(e);
    return null != n && t.markInProject && n._markAsInProject(), n;
  }
  getDirectoryFromCache(e) {
    return this.#n8.get(e);
  }
  getDirectoryFromCacheOnlyIfInCache(e) {
    return this.#n8.has(e) ? this.#n8.get(e) : void 0;
  }
  getDirectoriesByDepth() {
    return this.#n8.getAllByDepth();
  }
  getOrphanDirectories() {
    return this.#n8.getOrphans();
  }
  getSymbolDisplayPart(e) {
    return this.#nZ.getOrCreate(e, () => new dg(e));
  }
  getType(e) {
    return (e.flags & h.TypeFlags.TypeParameter) === h.TypeFlags.TypeParameter
      ? this.getTypeParameter(e)
      : this.#n4.getOrCreate(e, () => new dx(this.#t5, e));
  }
  getTypeParameter(e) {
    return this.#n3.getOrCreate(e, () => new dS(this.#t5, e));
  }
  getSignature(e) {
    return this.#nY.getOrCreate(e, () => new c2(this.#t5, e));
  }
  getSymbol(e) {
    return this.#nQ.getOrCreate(e, () => new c4(this.#t5, e));
  }
  getDefinitionInfo(e) {
    return this.#nq.getOrCreate(e, () => new dt(this.#t5, e));
  }
  getDocumentSpan(e) {
    return this.#nJ.getOrCreate(e, () => new de(this.#t5, e));
  }
  getReferencedSymbolEntry(e) {
    return this.#n0.getOrCreate(e, () => new dm(this.#t5, e));
  }
  getReferencedSymbol(e) {
    return this.#n1.getOrCreate(e, () => new dp(this.#t5, e));
  }
  getReferencedSymbolDefinitionInfo(e) {
    return this.#n2.getOrCreate(e, () => new d_(this.#t5, e));
  }
  getDiagnostic(e) {
    return this.#nH.getOrCreate(e, () =>
      null != e.start ? new di(this.#t5, e) : new dr(this.#t5, e)
    );
  }
  getDiagnosticWithLocation(e) {
    return this.#nH.getOrCreate(e, () => new di(this.#t5, e));
  }
  getDiagnosticMessageChain(e) {
    return this.#n$.getOrCreate(e, () => new dn(e));
  }
  getJSDocTagInfo(e) {
    return this.#nX.getOrCreate(e, () => new lb(e));
  }
  replaceCompilerNode(e, t) {
    let n = e instanceof tm ? e.compilerNode : e,
      r = e instanceof tm ? e : this.#n6.get(e);
    n.kind === h.SyntaxKind.SourceFile && n.fileName !== t.fileName
      ? (this.#rn(n),
        r._replaceCompilerNodeFromFactory(t),
        this.#n6.set(t, r),
        this.#rt(r),
        this.#n5.fire(r))
      : (this.#n6.replaceKey(n, t),
        null != r && r._replaceCompilerNodeFromFactory(t));
  }
  removeNodeFromCache(e) {
    this.#rn(e.compilerNode);
  }
  #rn(e) {
    if ((this.#n6.removeByKey(e), e.kind === h.SyntaxKind.SourceFile)) {
      let t = this.#t5.fileSystemWrapper.getStandardizedAbsolutePath(
        e.fileName
      );
      this.#n8.removeSourceFile(t);
      let n = this.#ev.get(t);
      this.#ev.delete(t),
        this.documentRegistry.removeSourceFile(t),
        null != n && this.#n7.fire(n);
    }
  }
  addDirectoryToCache(e) {
    this.#n8.addDirectory(e);
  }
  removeDirectoryFromCache(e) {
    this.#n8.remove(e);
  }
  forgetNodesCreatedInBlock(e) {
    let t;
    this.#n6.setForgetPoint();
    let n = !1;
    try {
      var r;
      if (
        ((t = e((...e) => {
          for (let t of e) this.#n6.rememberNode(t);
        })),
        tm.isNode(t) && this.#n6.rememberNode(t),
        (r = t),
        null != r && "function" == typeof r.then)
      )
        return (
          (n = !0),
          t.then(
            (e) => (
              tm.isNode(e) && this.#n6.rememberNode(e),
              this.#n6.forgetLastPoint(),
              e
            )
          )
        );
    } finally {
      n || this.#n6.forgetLastPoint();
    }
    return t;
  }
}
class dP {
  #e0;
  #rr = new Set();
  constructor(e) {
    e.onSourceFileRemoved((e) => {
      this.#rr.delete(e);
    }),
      (this.#e0 = e);
  }
  setSourceFileNotInProject(e) {
    this.#rr.add(e), (e._inProject = !1);
  }
  markSourceFileAsInProject(e) {
    this.isSourceFileInProject(e) || (this.#ri(e), this.#rr.delete(e));
  }
  markSourceFilesAsInProjectForResolution() {
    let e = "/node_modules/",
      t = this.#e0,
      n = [],
      r = [];
    for (let i of [...this.#rr.values()])
      !(function (n) {
        let r = n.getFilePath(),
          i = r.toLowerCase().lastIndexOf(e);
        if (-1 === i) return !0;
        let a = r.substring(0, i + e.length - 1),
          o = t.getDirectoryFromCacheOnlyIfInCache(a);
        if (null != o && o._isInProject()) return !0;
        let s = n.getDirectory();
        for (; null != s && s.getPath() !== a; ) {
          if (s._isInProject()) return !0;
          s = t.getDirectoryFromCacheOnlyIfInCache(
            h.FileUtils.getDirPath(s.getPath())
          );
        }
        return !1;
      })(i)
        ? r.push(i)
        : (this.#ri(i), this.#rr.delete(i), n.push(i));
    return { changedSourceFiles: n, unchangedSourceFiles: r };
  }
  #ri(e) {
    (e._inProject = !0), this.markDirectoryAsInProject(e.getDirectory());
  }
  isSourceFileInProject(e) {
    return !0 === e._inProject;
  }
  setDirectoryAndFilesAsNotInProjectForTesting(e) {
    for (let t of e.getDirectories())
      this.setDirectoryAndFilesAsNotInProjectForTesting(t);
    for (let t of e.getSourceFiles()) delete t._inProject, this.#rr.add(t);
    delete e._inProject;
  }
  markDirectoryAsInProject(e) {
    if (this.isDirectoryInProject(e)) return;
    let t = this,
      n = this.#e0;
    (e._inProject = !0),
      (function (e) {
        let r = Array.from(
            (function* e(r) {
              if (h.FileUtils.isRootDirPath(r.getPath())) return;
              let i = h.FileUtils.getDirPath(r.getPath()),
                a = n.getDirectoryFromCacheOnlyIfInCache(i);
              null != a &&
                (yield a, t.isDirectoryInProject(a) || (yield* e(a)));
            })(e)
          ),
          i = r[r.length - 1];
        if (null != i && t.isDirectoryInProject(i))
          for (let e of r) e._inProject = !0;
      })(e);
  }
  isDirectoryInProject(e) {
    return !0 === e._inProject;
  }
}
class dM {
  _getFormatCodeSettings;
  constructor(e) {
    this._getFormatCodeSettings = e;
  }
  getFormatCodeSettings() {
    return this._getFormatCodeSettings();
  }
  forInitializerExpressionableNode() {
    return new tR();
  }
  forModifierableNode() {
    return new tF();
  }
  forReturnTypedNode(e) {
    return new tO(e);
  }
  forTypedNode(e, t) {
    return new tB(e, t);
  }
  forClassDeclaration(e) {
    return new tq(this, e);
  }
  forClassMember(e) {
    return new t5(this, e);
  }
  forClassStaticBlockDeclaration() {
    return new t7(this);
  }
  forConstructorDeclaration(e) {
    return new t9(this, e);
  }
  forGetAccessorDeclaration(e) {
    return new ne(this, e);
  }
  forMethodDeclaration(e) {
    return new nt(this, e);
  }
  forPropertyDeclaration() {
    return new nn(this);
  }
  forSetAccessorDeclaration(e) {
    return new nr(this, e);
  }
  forDecorator() {
    return new na(this);
  }
  forJSDoc() {
    return new no(this);
  }
  forJSDocTag(e) {
    return new ns(this, e);
  }
  forEnumDeclaration() {
    return new nl(this);
  }
  forEnumMember() {
    return new nc(this);
  }
  forObjectLiteralExpressionProperty() {
    return new nd(this);
  }
  forPropertyAssignment() {
    return new nu(this);
  }
  forShorthandPropertyAssignment() {
    return new np(this);
  }
  forSpreadAssignment() {
    return new n_(this);
  }
  forFunctionDeclaration(e) {
    return new nf(this, e);
  }
  forParameterDeclaration() {
    return new nm(this);
  }
  forCallSignatureDeclaration() {
    return new nh(this);
  }
  forConstructSignatureDeclaration() {
    return new ng(this);
  }
  forIndexSignatureDeclaration() {
    return new ny(this);
  }
  forInterfaceDeclaration() {
    return new nv(this);
  }
  forMethodSignature() {
    return new nb(this);
  }
  forPropertySignature() {
    return new nx(this);
  }
  forTypeElementMemberedNode() {
    return new nS(this);
  }
  forTypeElementMember() {
    return new nk(this);
  }
  forJsxAttributeDecider() {
    return new nT(this);
  }
  forJsxAttribute() {
    return new nE(this);
  }
  forJsxChildDecider() {
    return new nC(this);
  }
  forJsxElement() {
    return new nA(this);
  }
  forJsxNamespacedName() {
    return new nw(this);
  }
  forJsxSelfClosingElement() {
    return new nD(this);
  }
  forJsxSpreadAttribute() {
    return new nN(this);
  }
  forExportAssignment() {
    return new nI(this);
  }
  forExportDeclaration() {
    return new nP(this);
  }
  forImportAttribute() {
    return new nM(this);
  }
  forImportDeclaration() {
    return new nL(this);
  }
  forModuleDeclaration(e) {
    return new nR(this, e);
  }
  forNamedImportExportSpecifier() {
    return new nF(this);
  }
  forSourceFile(e) {
    return new nO(this, e);
  }
  forStatementedNode(e) {
    return new nB(this, e);
  }
  forStatement(e) {
    return new nW(this, e);
  }
  forVariableStatement() {
    return new nj(this);
  }
  forTypeAliasDeclaration() {
    return new nz(this);
  }
  forTypeParameterDeclaration() {
    return new nV(this);
  }
  forVariableDeclaration() {
    return new nG(this);
  }
}
a7([h.Memoize], dM.prototype, "forInitializerExpressionableNode", null),
  a7([h.Memoize], dM.prototype, "forModifierableNode", null),
  a7([h.Memoize], dM.prototype, "forReturnTypedNode", null),
  a7([h.Memoize], dM.prototype, "forTypedNode", null),
  a7([h.Memoize], dM.prototype, "forClassDeclaration", null),
  a7([h.Memoize], dM.prototype, "forClassMember", null),
  a7([h.Memoize], dM.prototype, "forClassStaticBlockDeclaration", null),
  a7([h.Memoize], dM.prototype, "forConstructorDeclaration", null),
  a7([h.Memoize], dM.prototype, "forGetAccessorDeclaration", null),
  a7([h.Memoize], dM.prototype, "forMethodDeclaration", null),
  a7([h.Memoize], dM.prototype, "forPropertyDeclaration", null),
  a7([h.Memoize], dM.prototype, "forSetAccessorDeclaration", null),
  a7([h.Memoize], dM.prototype, "forDecorator", null),
  a7([h.Memoize], dM.prototype, "forJSDoc", null),
  a7([h.Memoize], dM.prototype, "forJSDocTag", null),
  a7([h.Memoize], dM.prototype, "forEnumDeclaration", null),
  a7([h.Memoize], dM.prototype, "forEnumMember", null),
  a7([h.Memoize], dM.prototype, "forObjectLiteralExpressionProperty", null),
  a7([h.Memoize], dM.prototype, "forPropertyAssignment", null),
  a7([h.Memoize], dM.prototype, "forShorthandPropertyAssignment", null),
  a7([h.Memoize], dM.prototype, "forSpreadAssignment", null),
  a7([h.Memoize], dM.prototype, "forFunctionDeclaration", null),
  a7([h.Memoize], dM.prototype, "forParameterDeclaration", null),
  a7([h.Memoize], dM.prototype, "forCallSignatureDeclaration", null),
  a7([h.Memoize], dM.prototype, "forConstructSignatureDeclaration", null),
  a7([h.Memoize], dM.prototype, "forIndexSignatureDeclaration", null),
  a7([h.Memoize], dM.prototype, "forInterfaceDeclaration", null),
  a7([h.Memoize], dM.prototype, "forMethodSignature", null),
  a7([h.Memoize], dM.prototype, "forPropertySignature", null),
  a7([h.Memoize], dM.prototype, "forTypeElementMemberedNode", null),
  a7([h.Memoize], dM.prototype, "forTypeElementMember", null),
  a7([h.Memoize], dM.prototype, "forJsxAttributeDecider", null),
  a7([h.Memoize], dM.prototype, "forJsxAttribute", null),
  a7([h.Memoize], dM.prototype, "forJsxChildDecider", null),
  a7([h.Memoize], dM.prototype, "forJsxElement", null),
  a7([h.Memoize], dM.prototype, "forJsxNamespacedName", null),
  a7([h.Memoize], dM.prototype, "forJsxSelfClosingElement", null),
  a7([h.Memoize], dM.prototype, "forJsxSpreadAttribute", null),
  a7([h.Memoize], dM.prototype, "forExportAssignment", null),
  a7([h.Memoize], dM.prototype, "forExportDeclaration", null),
  a7([h.Memoize], dM.prototype, "forImportAttribute", null),
  a7([h.Memoize], dM.prototype, "forImportDeclaration", null),
  a7([h.Memoize], dM.prototype, "forModuleDeclaration", null),
  a7([h.Memoize], dM.prototype, "forNamedImportExportSpecifier", null),
  a7([h.Memoize], dM.prototype, "forSourceFile", null),
  a7([h.Memoize], dM.prototype, "forStatementedNode", null),
  a7([h.Memoize], dM.prototype, "forStatement", null),
  a7([h.Memoize], dM.prototype, "forVariableStatement", null),
  a7([h.Memoize], dM.prototype, "forTypeAliasDeclaration", null),
  a7([h.Memoize], dM.prototype, "forTypeParameterDeclaration", null),
  a7([h.Memoize], dM.prototype, "forVariableDeclaration", null);
class dL {
  #ra;
  #ro;
  #rs;
  #rl;
  get project() {
    if (null == this.#rl)
      throw new h.errors.InvalidOperationError(
        "This operation is not permitted in this context."
      );
    return this.#rl;
  }
  logger = new Y();
  lazyReferenceCoordinator;
  directoryCoordinator;
  fileSystemWrapper;
  manipulationSettings = new U();
  structurePrinterFactory;
  compilerFactory;
  inProjectCoordinator;
  constructor(e) {
    (this.#rl = e.project),
      (this.fileSystemWrapper = e.fileSystemWrapper),
      (this.#ro = e.compilerOptionsContainer),
      (this.compilerFactory = new dI(this)),
      (this.inProjectCoordinator = new dP(this.compilerFactory)),
      (this.structurePrinterFactory = new dM(() =>
        this.manipulationSettings.getFormatCodeSettings()
      )),
      (this.lazyReferenceCoordinator = new et(this.compilerFactory)),
      (this.directoryCoordinator = new dA(
        this.compilerFactory,
        e.fileSystemWrapper
      )),
      (this.#ra = e.createLanguageService
        ? new db({
            context: this,
            configFileParsingDiagnostics: e.configFileParsingDiagnostics,
            resolutionHost:
              e.resolutionHost &&
              e.resolutionHost(this.getModuleResolutionHost(), () =>
                this.compilerOptions.get()
              ),
            skipLoadingLibFiles: e.skipLoadingLibFiles,
            libFolderPath: e.libFolderPath,
          })
        : void 0),
      null != e.typeChecker &&
        (h.errors.throwIfTrue(
          e.createLanguageService,
          "Cannot specify a type checker and create a language service."
        ),
        (this.#rs = new dy(this)),
        this.#rs._reset(() => e.typeChecker));
  }
  get compilerOptions() {
    return this.#ro;
  }
  get languageService() {
    if (null == this.#ra) throw this.#rc("language service");
    return this.#ra;
  }
  get program() {
    if (null == this.#ra) throw this.#rc("program");
    return this.languageService.getProgram();
  }
  get typeChecker() {
    if (null != this.#rs) return this.#rs;
    if (null == this.#ra) throw this.#rc("type checker");
    return this.program.getTypeChecker();
  }
  hasLanguageService() {
    return null != this.#ra;
  }
  getEncoding() {
    return this.compilerOptions.getEncoding();
  }
  getFormatCodeSettings() {
    return this.manipulationSettings.getFormatCodeSettings();
  }
  getUserPreferences() {
    return this.manipulationSettings.getUserPreferences();
  }
  resetProgram() {
    this.languageService._reset();
  }
  createWriter() {
    let e = this.manipulationSettings.getIndentationText();
    return new y.default({
      newLine: this.manipulationSettings.getNewLineKindAsString(),
      indentNumberOfSpaces:
        e === exports.IndentationText.Tab ? void 0 : e.length,
      useTabs: e === exports.IndentationText.Tab,
      useSingleQuote:
        this.manipulationSettings.getQuoteKind() === exports.QuoteKind.Single,
    });
  }
  getPreEmitDiagnostics(e) {
    return h.ts
      .getPreEmitDiagnostics(this.program.compilerObject, e?.compilerNode)
      .map((e) => this.compilerFactory.getDiagnostic(e));
  }
  getSourceFileContainer() {
    return {
      addOrGetSourceFileFromFilePath: (e, t) =>
        Promise.resolve(
          this.compilerFactory.addOrGetSourceFileFromFilePath(e, t)
            ?.compilerNode
        ),
      addOrGetSourceFileFromFilePathSync: (e, t) =>
        this.compilerFactory.addOrGetSourceFileFromFilePath(e, t)?.compilerNode,
      containsDirectoryAtPath: (e) =>
        this.compilerFactory.containsDirectoryAtPath(e),
      containsSourceFileAtPath: (e) =>
        this.compilerFactory.containsSourceFileAtPath(e),
      getSourceFileFromCacheFromFilePath: (e) => {
        let t = this.compilerFactory.getSourceFileFromCacheFromFilePath(e);
        return t?.compilerNode;
      },
      getSourceFilePaths: () => this.compilerFactory.getSourceFilePaths(),
      getSourceFileVersion: (e) =>
        this.compilerFactory.documentRegistry.getSourceFileVersion(e),
      getChildDirectoriesOfDirectory: (e) => {
        let t = [];
        for (let n of this.compilerFactory.getChildDirectoriesOfDirectory(e))
          t.push(n.getPath());
        return t;
      },
    };
  }
  getModuleResolutionHost() {
    return h.createModuleResolutionHost({
      transactionalFileSystem: this.fileSystemWrapper,
      getEncoding: () => this.getEncoding(),
      sourceFileContainer: this.getSourceFileContainer(),
    });
  }
  #rc(e) {
    return new h.errors.InvalidOperationError(
      `A ${e} is required for this operation. This might occur when manipulating or getting type information from a node that was not added to a Project object and created via createWrappedNode. Please submit a bug report if you don't believe a ${e} should be required for this operation.`
    );
  }
}
function dR(e) {
  return (
    t(e[0]) && t(e[e.length - 1]) && (e = e.substring(1, e.length - 1)),
    `"${e}"`
  );
  function t(e) {
    return '"' === e || "'" === e;
  }
}
a7([h.Memoize], dL.prototype, "getSourceFileContainer", null),
  a7([h.Memoize], dL.prototype, "getModuleResolutionHost", null);
let dF = new dM(() => {
  throw new h.errors.NotImplementedError(
    "Not implemented scenario for getting code format settings when using a writer function. Please open an issue."
  );
});
function dO(e, t) {
  return (n) => {
    var r = n,
      i = ` ${e} `,
      a = t;
    for (let e = 0; e < a.length; e++)
      r.conditionalWrite(e > 0, i), dB(r, a[e]);
  };
}
function dB(e, t) {
  t instanceof Function ? t(e) : e.write(t.toString());
}
let {
  InvalidOperationError: dW,
  FileNotFoundError: dj,
  ArgumentError: dz,
  ArgumentNullOrWhitespaceError: dV,
  ArgumentOutOfRangeError: dG,
  ArgumentTypeError: dK,
  BaseError: dU,
  DirectoryNotFoundError: dH,
  NotImplementedError: dq,
  NotSupportedError: dJ,
  PathNotFoundError: d$,
} = h.errors;
Object.defineProperty(exports, "CompilerOptionsContainer", {
  enumerable: !0,
  get: function () {
    return h.CompilerOptionsContainer;
  },
}),
  Object.defineProperty(exports, "DiagnosticCategory", {
    enumerable: !0,
    get: function () {
      return h.DiagnosticCategory;
    },
  }),
  Object.defineProperty(exports, "EmitHint", {
    enumerable: !0,
    get: function () {
      return h.EmitHint;
    },
  }),
  Object.defineProperty(exports, "InMemoryFileSystemHost", {
    enumerable: !0,
    get: function () {
      return h.InMemoryFileSystemHost;
    },
  }),
  Object.defineProperty(exports, "LanguageVariant", {
    enumerable: !0,
    get: function () {
      return h.LanguageVariant;
    },
  }),
  Object.defineProperty(exports, "ModuleKind", {
    enumerable: !0,
    get: function () {
      return h.ModuleKind;
    },
  }),
  Object.defineProperty(exports, "ModuleResolutionKind", {
    enumerable: !0,
    get: function () {
      return h.ModuleResolutionKind;
    },
  }),
  Object.defineProperty(exports, "NewLineKind", {
    enumerable: !0,
    get: function () {
      return h.NewLineKind;
    },
  }),
  Object.defineProperty(exports, "NodeFlags", {
    enumerable: !0,
    get: function () {
      return h.NodeFlags;
    },
  }),
  Object.defineProperty(exports, "ObjectFlags", {
    enumerable: !0,
    get: function () {
      return h.ObjectFlags;
    },
  }),
  Object.defineProperty(exports, "ResolutionHosts", {
    enumerable: !0,
    get: function () {
      return h.ResolutionHosts;
    },
  }),
  Object.defineProperty(exports, "ScriptKind", {
    enumerable: !0,
    get: function () {
      return h.ScriptKind;
    },
  }),
  Object.defineProperty(exports, "ScriptTarget", {
    enumerable: !0,
    get: function () {
      return h.ScriptTarget;
    },
  }),
  Object.defineProperty(exports, "SettingsContainer", {
    enumerable: !0,
    get: function () {
      return h.SettingsContainer;
    },
  }),
  Object.defineProperty(exports, "SymbolFlags", {
    enumerable: !0,
    get: function () {
      return h.SymbolFlags;
    },
  }),
  Object.defineProperty(exports, "SyntaxKind", {
    enumerable: !0,
    get: function () {
      return h.SyntaxKind;
    },
  }),
  Object.defineProperty(exports, "TypeFlags", {
    enumerable: !0,
    get: function () {
      return h.TypeFlags;
    },
  }),
  Object.defineProperty(exports, "TypeFormatFlags", {
    enumerable: !0,
    get: function () {
      return h.TypeFormatFlags;
    },
  }),
  Object.defineProperty(exports, "ts", {
    enumerable: !0,
    get: function () {
      return h.ts;
    },
  }),
  Object.defineProperty(exports, "CodeBlockWriter", {
    enumerable: !0,
    get: function () {
      return y.default;
    },
  }),
  (exports.AbstractableNode = rC),
  (exports.AmbientableNode = eo),
  (exports.ArgumentError = dz),
  (exports.ArgumentNullOrWhitespaceError = dV),
  (exports.ArgumentOutOfRangeError = dG),
  (exports.ArgumentTypeError = dK),
  (exports.ArgumentedNode = tl),
  (exports.ArrayBindingPattern = rS),
  (exports.ArrayDestructuringAssignment = class extends rP {
    getLeft() {
      return this._getNodeFromCompilerNode(this.compilerNode.left);
    }
  }),
  (exports.ArrayDestructuringAssignmentBase = rP),
  (exports.ArrayLiteralExpression = rB),
  (exports.ArrayTypeNode = sa),
  (exports.ArrowFunction = ou),
  (exports.ArrowFunctionBase = od),
  (exports.AsExpression = rV),
  (exports.AsExpressionBase = rz),
  (exports.AssignmentExpression = rI),
  (exports.AssignmentExpressionBase = rN),
  (exports.AsyncableNode = tc),
  (exports.AwaitExpression = rK),
  (exports.AwaitExpressionBase = rG),
  (exports.AwaitableNode = td),
  (exports.BaseError = dU),
  (exports.BaseExpressionedNode = rj),
  (exports.BigIntLiteral = cT),
  (exports.BigIntLiteralBase = ck),
  (exports.BinaryExpression = rD),
  (exports.BinaryExpressionBase = rw),
  (exports.BindingElement = rT),
  (exports.BindingElementBase = rk),
  (exports.BindingNamedNode = n3),
  (exports.Block = i$),
  (exports.BlockBase = iJ),
  (exports.BodiedNode = tT),
  (exports.BodyableNode = tE),
  (exports.BreakStatement = iX),
  (exports.CallExpression = rH),
  (exports.CallExpressionBase = rU),
  (exports.CallSignatureDeclaration = lG),
  (exports.CallSignatureDeclarationBase = lV),
  (exports.CaseBlock = iQ),
  (exports.CaseBlockBase = iY),
  (exports.CaseClause = i0),
  (exports.CaseClauseBase = iZ),
  (exports.CatchClause = i2),
  (exports.CatchClauseBase = i1),
  (exports.ChildOrderableNode = tC),
  (exports.ClassDeclaration = oO),
  (exports.ClassDeclarationBase = oF),
  (exports.ClassElement = oE),
  (exports.ClassExpression = oU),
  (exports.ClassExpressionBase = oK),
  (exports.ClassLikeDeclarationBase = oD),
  (exports.ClassLikeDeclarationBaseSpecific = oN),
  (exports.ClassStaticBlockDeclaration = oq),
  (exports.ClassStaticBlockDeclarationBase = oH),
  (exports.CodeAction = c5),
  (exports.CodeFixAction = c7),
  (exports.CombinedCodeActions = c9),
  (exports.CommaListExpression = rJ),
  (exports.CommaListExpressionBase = rq),
  (exports.CommentClassElement = oJ),
  (exports.CommentEnumMember = lR),
  (exports.CommentObjectLiteralElement = ir),
  (exports.CommentRange = tf),
  (exports.CommentStatement = i4),
  (exports.CommentTypeElement = lK),
  (exports.CommonIdentifierBase = l4),
  (exports.CompilerCommentClassElement = C),
  (exports.CompilerCommentEnumMember = D),
  (exports.CompilerCommentNode = T),
  (exports.CompilerCommentObjectLiteralElement = w),
  (exports.CompilerCommentStatement = E),
  (exports.CompilerCommentTypeElement = A),
  (exports.ComputedPropertyName = l6),
  (exports.ComputedPropertyNameBase = l3),
  (exports.ConditionalExpression = rX),
  (exports.ConditionalExpressionBase = r$),
  (exports.ConditionalTypeNode = so),
  (exports.ConstructSignatureDeclaration = lH),
  (exports.ConstructSignatureDeclarationBase = lU),
  (exports.ConstructorDeclaration = oY),
  (exports.ConstructorDeclarationBase = o$),
  (exports.ConstructorDeclarationOverloadBase = oX),
  (exports.ConstructorTypeNode = sd),
  (exports.ConstructorTypeNodeBase = sc),
  (exports.ContinueStatement = i3),
  (exports.DebuggerStatement = i8),
  (exports.DebuggerStatementBase = i6),
  (exports.DecoratableNode = tA),
  (exports.Decorator = o6),
  (exports.DecoratorBase = o3),
  (exports.DefaultClause = i7),
  (exports.DefaultClauseBase = i5),
  (exports.DefinitionInfo = dt),
  (exports.DeleteExpression = rQ),
  (exports.DeleteExpressionBase = rY),
  (exports.Diagnostic = dr),
  (exports.DiagnosticMessageChain = dn),
  (exports.DiagnosticWithLocation = di),
  (exports.Directory = dT),
  (exports.DirectoryEmitResult = dk),
  (exports.DirectoryNotFoundError = dH),
  (exports.DoStatement = at),
  (exports.DoStatementBase = ae),
  (exports.DocumentSpan = de),
  (exports.DotDotDotTokenableNode = tD),
  (exports.ElementAccessExpression = r0),
  (exports.ElementAccessExpressionBase = rZ),
  (exports.EmitOutput = ds),
  (exports.EmitResult = dl),
  (exports.EmptyStatement = ar),
  (exports.EmptyStatementBase = an),
  (exports.EnumDeclaration = lO),
  (exports.EnumDeclarationBase = lF),
  (exports.EnumMember = lW),
  (exports.EnumMemberBase = lB),
  (exports.ExclamationTokenableNode = tN),
  (exports.ExportAssignment = aA),
  (exports.ExportAssignmentBase = aC),
  (exports.ExportDeclaration = aD),
  (exports.ExportDeclarationBase = aw),
  (exports.ExportGetableNode = tI),
  (exports.ExportSpecifier = aI),
  (exports.ExportSpecifierBase = aN),
  (exports.ExportableNode = tM),
  (exports.Expression = rA),
  (exports.ExpressionStatement = aa),
  (exports.ExpressionStatementBase = ai),
  (exports.ExpressionWithTypeArguments = sp),
  (exports.ExpressionWithTypeArgumentsBase = su),
  (exports.ExpressionableNode = rW),
  (exports.ExpressionedNode = function (e) {
    return rj(e);
  }),
  (exports.ExtendsClauseableNode = nK),
  (exports.ExternalModuleReference = aM),
  (exports.ExternalModuleReferenceBase = aP),
  (exports.FalseLiteral = cw),
  (exports.FalseLiteralBase = cA),
  (exports.FileNotFoundError = dj),
  (exports.FileReference = a5),
  (exports.FileTextChanges = c8),
  (exports.ForInStatement = as),
  (exports.ForInStatementBase = ao),
  (exports.ForOfStatement = ac),
  (exports.ForOfStatementBase = al),
  (exports.ForStatement = au),
  (exports.ForStatementBase = ad),
  (exports.FunctionDeclaration = ov),
  (exports.FunctionDeclarationBase = og),
  (exports.FunctionDeclarationOverloadBase = oy),
  (exports.FunctionExpression = ox),
  (exports.FunctionExpressionBase = ob),
  (exports.FunctionLikeDeclaration = oc),
  (exports.FunctionOrConstructorTypeNodeBase = sl),
  (exports.FunctionOrConstructorTypeNodeBaseBase = ss),
  (exports.FunctionTypeNode = sf),
  (exports.FunctionTypeNodeBase = s_),
  (exports.GeneratorableNode = nU),
  (exports.GetAccessorDeclaration = oZ),
  (exports.GetAccessorDeclarationBase = oQ),
  (exports.HeritageClause = lj),
  (exports.HeritageClauseableNode = nH),
  (exports.Identifier = l5),
  (exports.IdentifierBase = l8),
  (exports.IfStatement = a_),
  (exports.IfStatementBase = ap),
  (exports.ImplementationLocation = dc),
  (exports.ImplementsClauseableNode = nq),
  (exports.ImportAttribute = aR),
  (exports.ImportAttributeBase = aL),
  (exports.ImportAttributeNamedNode = n6),
  (exports.ImportAttributes = aO),
  (exports.ImportAttributesBase = aF),
  (exports.ImportClause = aW),
  (exports.ImportClauseBase = aB),
  (exports.ImportDeclaration = az),
  (exports.ImportDeclarationBase = aj),
  (exports.ImportEqualsDeclaration = aK),
  (exports.ImportEqualsDeclarationBase = aG),
  (exports.ImportExpression = r2),
  (exports.ImportExpressionBase = r1),
  (exports.ImportExpressionedNode = function (e) {
    return rj(e);
  }),
  (exports.ImportSpecifier = aH),
  (exports.ImportSpecifierBase = aU),
  (exports.ImportTypeNode = sm),
  (exports.IndexSignatureDeclaration = lJ),
  (exports.IndexSignatureDeclarationBase = lq),
  (exports.IndexedAccessTypeNode = sh),
  (exports.InferTypeNode = sg),
  (exports.InitializerExpressionGetableNode = nJ),
  (exports.InitializerExpressionableNode = n$),
  (exports.InterfaceDeclaration = lX),
  (exports.InterfaceDeclarationBase = l$),
  (exports.IntersectionTypeNode = sy),
  (exports.InvalidOperationError = dW),
  (exports.IterationStatement = i9),
  (exports.JSDoc = st),
  (exports.JSDocAllType = sz),
  (exports.JSDocAugmentsTag = sJ),
  (exports.JSDocAuthorTag = s$),
  (exports.JSDocBase = se),
  (exports.JSDocCallbackTag = sX),
  (exports.JSDocClassTag = sY),
  (exports.JSDocDeprecatedTag = sQ),
  (exports.JSDocEnumTag = sZ),
  (exports.JSDocFunctionType = s1),
  (exports.JSDocFunctionTypeBase = s0),
  (exports.JSDocImplementsTag = s2),
  (exports.JSDocLink = s4),
  (exports.JSDocLinkCode = s3),
  (exports.JSDocLinkPlain = s6),
  (exports.JSDocMemberName = s8),
  (exports.JSDocNameReference = s7),
  (exports.JSDocNamepathType = s5),
  (exports.JSDocNonNullableType = s9),
  (exports.JSDocNullableType = le),
  (exports.JSDocOptionalType = lt),
  (exports.JSDocOverloadTag = lr),
  (exports.JSDocOverloadTagBase = ln),
  (exports.JSDocOverrideTag = li),
  (exports.JSDocParameterTag = lo),
  (exports.JSDocParameterTagBase = la),
  (exports.JSDocPrivateTag = ls),
  (exports.JSDocPropertyLikeTag = o8),
  (exports.JSDocPropertyTag = lc),
  (exports.JSDocPropertyTagBase = ll),
  (exports.JSDocProtectedTag = ld),
  (exports.JSDocPublicTag = lu),
  (exports.JSDocReadonlyTag = lp),
  (exports.JSDocReturnTag = lf),
  (exports.JSDocReturnTagBase = l_),
  (exports.JSDocSatisfiesTag = lh),
  (exports.JSDocSatisfiesTagBase = lm),
  (exports.JSDocSeeTag = ly),
  (exports.JSDocSeeTagBase = lg),
  (exports.JSDocSignature = lv),
  (exports.JSDocTag = sG),
  (exports.JSDocTagBase = sV),
  (exports.JSDocTagInfo = lb),
  (exports.JSDocTemplateTag = lS),
  (exports.JSDocTemplateTagBase = lx),
  (exports.JSDocText = lk),
  (exports.JSDocThisTag = lE),
  (exports.JSDocThisTagBase = lT),
  (exports.JSDocThrowsTag = lA),
  (exports.JSDocThrowsTagBase = lC),
  (exports.JSDocType = sj),
  (exports.JSDocTypeExpression = lD),
  (exports.JSDocTypeExpressionableTag = o5),
  (exports.JSDocTypeLiteral = lN),
  (exports.JSDocTypeParameteredTag = o7),
  (exports.JSDocTypeTag = lI),
  (exports.JSDocTypedefTag = lw),
  (exports.JSDocUnknownTag = lP),
  (exports.JSDocUnknownType = lM),
  (exports.JSDocVariadicType = lL),
  (exports.JSDocableNode = nX),
  (exports.JsxAttribute = cn),
  (exports.JsxAttributeBase = ct),
  (exports.JsxAttributedNode = l1),
  (exports.JsxClosingElement = ci),
  (exports.JsxClosingElementBase = cr),
  (exports.JsxClosingFragment = ca),
  (exports.JsxElement = cs),
  (exports.JsxElementBase = co),
  (exports.JsxExpression = cd),
  (exports.JsxExpressionBase = cc),
  (exports.JsxFragment = cu),
  (exports.JsxNamespacedName = c_),
  (exports.JsxNamespacedNameBase = cp),
  (exports.JsxOpeningElement = cm),
  (exports.JsxOpeningElementBase = cf),
  (exports.JsxOpeningFragment = ch),
  (exports.JsxSelfClosingElement = cy),
  (exports.JsxSelfClosingElementBase = cg),
  (exports.JsxSpreadAttribute = cb),
  (exports.JsxSpreadAttributeBase = cv),
  (exports.JsxTagNamedNode = l2),
  (exports.JsxText = cS),
  (exports.JsxTextBase = cx),
  (exports.LabeledStatement = am),
  (exports.LabeledStatementBase = af),
  (exports.LanguageService = db),
  (exports.LeftHandSideExpression = rR),
  (exports.LeftHandSideExpressionedNode = function (e) {
    return rj(e);
  }),
  (exports.LiteralExpression = r3),
  (exports.LiteralExpressionBase = r4),
  (exports.LiteralLikeNode = nY),
  (exports.LiteralTypeNode = sv),
  (exports.ManipulationError = e1),
  (exports.ManipulationSettingsContainer = U),
  (exports.MappedTypeNode = sb),
  (exports.MemberExpression = rF),
  (exports.MemoryEmitResult = dd),
  (exports.MetaProperty = r8),
  (exports.MetaPropertyBase = r6),
  (exports.MethodDeclaration = ow),
  (exports.MethodDeclarationBase = oC),
  (exports.MethodDeclarationOverloadBase = oA),
  (exports.MethodSignature = lQ),
  (exports.MethodSignatureBase = lY),
  (exports.ModifierableNode = nQ),
  (exports.ModuleBlock = aJ),
  (exports.ModuleBlockBase = aq),
  (exports.ModuleChildableNode = a$),
  (exports.ModuleDeclaration = aY),
  (exports.ModuleDeclarationBase = aX),
  (exports.ModuleNamedNode = n8),
  (exports.ModuledNode = nZ),
  (exports.NameableNode = n5),
  (exports.NamedExports = a0),
  (exports.NamedExportsBase = aZ),
  (exports.NamedImports = a2),
  (exports.NamedImportsBase = a1),
  (exports.NamedNode = n9),
  (exports.NamedNodeBase = n0),
  (exports.NamedTupleMember = sS),
  (exports.NamedTupleMemberBase = sx),
  (exports.NamespaceExport = a3),
  (exports.NamespaceExportBase = a4),
  (exports.NamespaceImport = a8),
  (exports.NamespaceImportBase = a6),
  (exports.NewExpression = r7),
  (exports.NewExpressionBase = r5),
  (exports.NoSubstitutionTemplateLiteral = cj),
  (exports.NoSubstitutionTemplateLiteralBase = cW),
  (exports.Node = tm),
  (exports.NodeWithTypeArguments = si),
  (exports.NodeWithTypeArgumentsBase = sr),
  (exports.NonNullExpression = ie),
  (exports.NonNullExpressionBase = r9),
  (exports.NotEmittedStatement = ag),
  (exports.NotEmittedStatementBase = ah),
  (exports.NotImplementedError = dq),
  (exports.NotSupportedError = dJ),
  (exports.NullLiteral = cP),
  (exports.NullLiteralBase = cI),
  (exports.NumericLiteral = cL),
  (exports.NumericLiteralBase = cM),
  (exports.ObjectBindingPattern = rE),
  (exports.ObjectDestructuringAssignment = class extends ii {
    getLeft() {
      return this._getNodeFromCompilerNode(this.compilerNode.left);
    }
  }),
  (exports.ObjectDestructuringAssignmentBase = ii),
  (exports.ObjectLiteralElement = it),
  (exports.ObjectLiteralExpression = io),
  (exports.ObjectLiteralExpressionBase = ia),
  (exports.OmittedExpression = im),
  (exports.OmittedExpressionBase = i_),
  (exports.OutputFile = da),
  (exports.OverloadableNode = op),
  (exports.OverrideableNode = rt),
  (exports.ParameterDeclaration = ok),
  (exports.ParameterDeclarationBase = oS),
  (exports.ParameteredNode = rn),
  (exports.ParenthesizedExpression = ig),
  (exports.ParenthesizedExpressionBase = ih),
  (exports.ParenthesizedTypeNode = sk),
  (exports.PartiallyEmittedExpression = iv),
  (exports.PartiallyEmittedExpressionBase = iy),
  (exports.PathNotFoundError = d$),
  (exports.PostfixUnaryExpression = ix),
  (exports.PostfixUnaryExpressionBase = ib),
  (exports.PrefixUnaryExpression = ik),
  (exports.PrefixUnaryExpressionBase = iS),
  (exports.PrimaryExpression = rO),
  (exports.PrivateIdentifier = l9),
  (exports.PrivateIdentifierBase = l7),
  (exports.Program = dv),
  (exports.Project = class {
    _context;
    constructor(e = {}) {
      if (null != e.fileSystem && e.useInMemoryFileSystem)
        throw new h.errors.InvalidOperationError(
          "Cannot provide a file system when specifying to use an in-memory file system."
        );
      const t = e.useInMemoryFileSystem
          ? new h.InMemoryFileSystemHost()
          : e.fileSystem ?? new h.RealFileSystemHost(),
        n = new h.TransactionalFileSystem({
          fileSystem: t,
          skipLoadingLibFiles: e.skipLoadingLibFiles,
          libFolderPath: e.libFolderPath,
        }),
        r =
          null == e.tsConfigFilePath
            ? void 0
            : new h.TsConfigResolver(
                n,
                n.getStandardizedAbsolutePath(e.tsConfigFilePath),
                (function () {
                  let t = "utf-8";
                  return null != e.compilerOptions
                    ? e.compilerOptions.charset ?? t
                    : t;
                })()
              ),
        i = {
          ...(r?.getCompilerOptions() ?? {}),
          ...(e.compilerOptions ?? {}),
        },
        a = new h.CompilerOptionsContainer(e.defaultCompilerOptions);
      a.set(i),
        (this._context = new dL({
          project: this,
          compilerOptionsContainer: a,
          fileSystemWrapper: n,
          createLanguageService: !0,
          resolutionHost: e.resolutionHost,
          configFileParsingDiagnostics: r?.getErrors() ?? [],
          skipLoadingLibFiles: e.skipLoadingLibFiles,
          libFolderPath: e.libFolderPath,
        })),
        null != e.manipulationSettings &&
          this._context.manipulationSettings.set(e.manipulationSettings),
        null != r &&
          !0 !== e.skipAddingFilesFromTsConfig &&
          (this.#rd(r, i),
          e.skipFileDependencyResolution ||
            this.resolveSourceFileDependencies());
    }
    get manipulationSettings() {
      return this._context.manipulationSettings;
    }
    get compilerOptions() {
      return this._context.compilerOptions;
    }
    resolveSourceFileDependencies() {
      let e = new Set(),
        t = (t) => e.add(t),
        { compilerFactory: n, inProjectCoordinator: r } = this._context;
      n.onSourceFileAdded(t);
      try {
        this.getProgram().compilerObject;
      } finally {
        n.onSourceFileAdded(t, !1);
      }
      let i = r.markSourceFilesAsInProjectForResolution();
      for (let t of i.changedSourceFiles) e.add(t);
      for (let t of i.unchangedSourceFiles) e.delete(t);
      return Array.from(e.values());
    }
    addDirectoryAtPathIfExists(e, t = {}) {
      return this._context.directoryCoordinator.addDirectoryAtPathIfExists(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        { ...t, markInProject: !0 }
      );
    }
    addDirectoryAtPath(e, t = {}) {
      return this._context.directoryCoordinator.addDirectoryAtPath(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        { ...t, markInProject: !0 }
      );
    }
    createDirectory(e) {
      return this._context.directoryCoordinator.createDirectoryOrAddIfExists(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        { markInProject: !0 }
      );
    }
    getDirectoryOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getDirectory(e),
        t ??
          (() =>
            `Could not find a directory at the specified path: ${this._context.fileSystemWrapper.getStandardizedAbsolutePath(
              e
            )}`)
      );
    }
    getDirectory(e) {
      let { compilerFactory: t } = this._context;
      return t.getDirectoryFromCache(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e)
      );
    }
    getDirectories() {
      return Array.from(this.#ru());
    }
    getRootDirectories() {
      let { inProjectCoordinator: e } = this._context,
        t = [];
      for (let n of this._context.compilerFactory.getOrphanDirectories())
        for (let r of (function* t(n) {
          if (e.isDirectoryInProject(n)) return void (yield n);
          for (let e of n._getDirectoriesIterator()) yield* t(e);
        })(n))
          t.push(r);
      return t;
    }
    addSourceFilesAtPaths(e) {
      return this._context.directoryCoordinator.addSourceFilesAtPaths(e, {
        markInProject: !0,
      });
    }
    addSourceFileAtPathIfExists(e) {
      return this._context.directoryCoordinator.addSourceFileAtPathIfExists(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        { markInProject: !0 }
      );
    }
    addSourceFileAtPath(e) {
      return this._context.directoryCoordinator.addSourceFileAtPath(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        { markInProject: !0 }
      );
    }
    addSourceFilesFromTsConfig(e) {
      let t = new h.TsConfigResolver(
        this._context.fileSystemWrapper,
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        this._context.getEncoding()
      );
      return this.#rd(t, t.getCompilerOptions());
    }
    #rd(e, t) {
      let n = e.getPaths(t),
        r = n.filePaths.map((e) => this.addSourceFileAtPath(e));
      for (let e of n.directoryPaths) this.addDirectoryAtPathIfExists(e);
      return r;
    }
    createSourceFile(e, t, n) {
      return this._context.compilerFactory.createSourceFile(
        this._context.fileSystemWrapper.getStandardizedAbsolutePath(e),
        t ?? "",
        { ...(n ?? {}), markInProject: !0 }
      );
    }
    removeSourceFile(e) {
      let t = e.wasForgotten();
      return e.forget(), !t;
    }
    getSourceFileOrThrow(e) {
      let t = this.getSourceFile(e);
      if (null != t) return t;
      if ("string" == typeof e) {
        let t = h.FileUtils.standardizeSlashes(e);
        if (h.FileUtils.pathIsAbsolute(t) || t.indexOf("/") >= 0) {
          let e =
            this._context.fileSystemWrapper.getStandardizedAbsolutePath(t);
          throw new h.errors.InvalidOperationError(
            `Could not find source file in project at the provided path: ${e}`
          );
        }
        throw new h.errors.InvalidOperationError(
          `Could not find source file in project with the provided file name: ${e}`
        );
      }
      throw new h.errors.InvalidOperationError(
        "Could not find source file in project based on the provided condition."
      );
    }
    getSourceFile(e) {
      let t = (function (t) {
        if (e instanceof Function) return e;
        let n = h.FileUtils.standardizeSlashes(e);
        return h.FileUtils.pathIsAbsolute(n) || n.indexOf("/") >= 0
          ? t.getStandardizedAbsolutePath(n)
          : (e) => h.FileUtils.pathEndsWith(e.getFilePath(), n);
      })(this._context.fileSystemWrapper);
      return "string" == typeof t
        ? this._context.compilerFactory.getSourceFileFromCacheFromFilePath(t)
        : h.IterableUtils.find(this.#rp(), t);
    }
    getSourceFiles(e) {
      let { compilerFactory: t, fileSystemWrapper: n } = this._context,
        r = this.#rp();
      return "string" == typeof e || e instanceof Array
        ? Array.from(
            (function* () {
              let i = Array.from(
                (function* () {
                  for (let e of r) yield e.getFilePath();
                })()
              );
              for (let r of h.matchGlobs(i, e, n.getCurrentDirectory()))
                yield t.getSourceFileFromCacheFromFilePath(
                  n.getStandardizedAbsolutePath(r)
                );
            })()
          )
        : Array.from(r);
    }
    *#rp() {
      let { compilerFactory: e, inProjectCoordinator: t } = this._context;
      for (let n of e.getSourceFilesByDirectoryDepth())
        t.isSourceFileInProject(n) && (yield n);
    }
    *#ru() {
      let { compilerFactory: e, inProjectCoordinator: t } = this._context;
      for (let n of e.getDirectoriesByDepth())
        t.isDirectoryInProject(n) && (yield n);
    }
    getAmbientModule(e) {
      return (
        (e = dR(e)), this.getAmbientModules().find((t) => t.getName() === e)
      );
    }
    getAmbientModuleOrThrow(e, t) {
      return h.errors.throwIfNullOrUndefined(
        this.getAmbientModule(e),
        t ?? (() => `Could not find ambient module with name: ${dR(e)}`)
      );
    }
    getAmbientModules() {
      return this.getTypeChecker().getAmbientModules();
    }
    async save() {
      await this._context.fileSystemWrapper.flush(),
        await Promise.all(this.#r_().map((e) => e.save()));
    }
    saveSync() {
      for (let e of (this._context.fileSystemWrapper.flushSync(), this.#r_()))
        e.saveSync();
    }
    enableLogging(e = !0) {
      this._context.logger.setEnabled(e);
    }
    #r_() {
      return Array.from(
        (function* (e) {
          for (let t of e) t.isSaved() || (yield t);
        })(this._context.compilerFactory.getSourceFilesByDirectoryDepth())
      );
    }
    getPreEmitDiagnostics() {
      return this._context.getPreEmitDiagnostics();
    }
    getLanguageService() {
      return this._context.languageService;
    }
    getProgram() {
      return this._context.program;
    }
    getTypeChecker() {
      return this._context.typeChecker;
    }
    getFileSystem() {
      return this._context.fileSystemWrapper.getFileSystem();
    }
    emit(e = {}) {
      return this._context.program.emit(e);
    }
    emitSync(e = {}) {
      return this._context.program.emitSync(e);
    }
    emitToMemory(e = {}) {
      return this._context.program.emitToMemory(e);
    }
    getCompilerOptions() {
      return this._context.compilerOptions.get();
    }
    getConfigFileParsingDiagnostics() {
      return this.getProgram().getConfigFileParsingDiagnostics();
    }
    createWriter() {
      return this._context.createWriter();
    }
    forgetNodesCreatedInBlock(e) {
      return this._context.compilerFactory.forgetNodesCreatedInBlock(e);
    }
    formatDiagnosticsWithColorAndContext(e, t = {}) {
      return h.ts.formatDiagnosticsWithColorAndContext(
        e.map((e) => e.compilerObject),
        {
          getCurrentDirectory: () =>
            this._context.fileSystemWrapper.getCurrentDirectory(),
          getCanonicalFileName: (e) => e,
          getNewLine: () => t.newLineChar ?? h.runtime.getEndOfLine(),
        }
      );
    }
    getModuleResolutionHost() {
      return this._context.getModuleResolutionHost();
    }
  }),
  (exports.PropertyAccessExpression = iE),
  (exports.PropertyAccessExpressionBase = iT),
  (exports.PropertyAssignment = il),
  (exports.PropertyAssignmentBase = is),
  (exports.PropertyDeclaration = o1),
  (exports.PropertyDeclarationBase = o0),
  (exports.PropertyNamedNode = re),
  (exports.PropertySignature = l0),
  (exports.PropertySignatureBase = lZ),
  (exports.QualifiedName = ce),
  (exports.QuestionDotTokenableNode = rr),
  (exports.QuestionTokenableNode = ri),
  (exports.ReadonlyableNode = ra),
  (exports.RefactorEditInfo = du),
  (exports.ReferenceEntry = df),
  (exports.ReferenceFindableNode = n1),
  (exports.ReferencedSymbol = dp),
  (exports.ReferencedSymbolDefinitionInfo = d_),
  (exports.ReferencedSymbolEntry = dm),
  (exports.RegularExpressionLiteral = cF),
  (exports.RegularExpressionLiteralBase = cR),
  (exports.RenameLocation = dh),
  (exports.RenameableNode = n4),
  (exports.RestTypeNode = sT),
  (exports.ReturnStatement = av),
  (exports.ReturnStatementBase = ay),
  (exports.ReturnTypedNode = ro),
  (exports.SatisfiesExpression = iA),
  (exports.SatisfiesExpressionBase = iC),
  (exports.ScopeableNode = rs),
  (exports.ScopedNode = rd),
  (exports.SetAccessorDeclaration = o4),
  (exports.SetAccessorDeclarationBase = o2),
  (exports.ShorthandPropertyAssignment = id),
  (exports.ShorthandPropertyAssignmentBase = ic),
  (exports.Signature = c2),
  (exports.SignaturedDeclaration = ru),
  (exports.SourceFile = oe),
  (exports.SourceFileBase = a9),
  (exports.SpreadAssignment = ip),
  (exports.SpreadAssignmentBase = iu),
  (exports.SpreadElement = iD),
  (exports.SpreadElementBase = iw),
  (exports.Statement = iU),
  (exports.StatementBase = iK),
  (exports.StatementedNode = iH),
  (exports.StaticableNode = rp),
  (exports.StringLiteral = cB),
  (exports.StringLiteralBase = cO),
  (exports.Structure = tJ),
  (exports.SuperElementAccessExpression = class extends iN {}),
  (exports.SuperElementAccessExpressionBase = iN),
  (exports.SuperExpression = iP),
  (exports.SuperExpressionBase = iI),
  (exports.SuperExpressionedNode = function (e) {
    return rj(e);
  }),
  (exports.SuperPropertyAccessExpression = class extends iM {}),
  (exports.SuperPropertyAccessExpressionBase = iM),
  (exports.SwitchStatement = ax),
  (exports.SwitchStatementBase = ab),
  (exports.Symbol = c4),
  (exports.SymbolDisplayPart = dg),
  (exports.SyntaxList = tx),
  (exports.TaggedTemplateExpression = cz),
  (exports.TemplateExpression = cG),
  (exports.TemplateExpressionBase = cV),
  (exports.TemplateHead = cU),
  (exports.TemplateHeadBase = cK),
  (exports.TemplateLiteralTypeNode = sE),
  (exports.TemplateMiddle = cq),
  (exports.TemplateMiddleBase = cH),
  (exports.TemplateSpan = c$),
  (exports.TemplateSpanBase = cJ),
  (exports.TemplateTail = cY),
  (exports.TemplateTailBase = cX),
  (exports.TextChange = c6),
  (exports.TextInsertableNode = r_),
  (exports.TextRange = t_),
  (exports.TextSpan = c3),
  (exports.ThisExpression = iR),
  (exports.ThisExpressionBase = iL),
  (exports.ThisTypeNode = sC),
  (exports.ThrowStatement = ak),
  (exports.ThrowStatementBase = aS),
  (exports.TrueLiteral = cC),
  (exports.TrueLiteralBase = cE),
  (exports.TryStatement = aE),
  (exports.TryStatementBase = aT),
  (exports.TupleTypeNode = sA),
  (exports.Type = dx),
  (exports.TypeAliasDeclaration = sD),
  (exports.TypeAliasDeclarationBase = sw),
  (exports.TypeArgumentedNode = rm),
  (exports.TypeAssertion = iO),
  (exports.TypeAssertionBase = iF),
  (exports.TypeChecker = dy),
  (exports.TypeElement = lz),
  (exports.TypeElementMemberedNode = ry),
  (exports.TypeLiteralNode = sI),
  (exports.TypeLiteralNodeBase = sN),
  (exports.TypeNode = sn),
  (exports.TypeOfExpression = iW),
  (exports.TypeOfExpressionBase = iB),
  (exports.TypeOperatorTypeNode = sP),
  (exports.TypeParameter = dS),
  (exports.TypeParameterDeclaration = sL),
  (exports.TypeParameterDeclarationBase = sM),
  (exports.TypeParameteredNode = rb),
  (exports.TypePredicateNode = sF),
  (exports.TypeQueryNode = sO),
  (exports.TypeReferenceNode = sB),
  (exports.TypedNode = rh),
  (exports.UnaryExpression = rM),
  (exports.UnaryExpressionedNode = function (e) {
    return rj(e);
  }),
  (exports.UnionTypeNode = sW),
  (exports.UnwrappableNode = rx),
  (exports.UpdateExpression = rL),
  (exports.VariableDeclaration = cZ),
  (exports.VariableDeclarationBase = cQ),
  (exports.VariableDeclarationList = c1),
  (exports.VariableDeclarationListBase = c0),
  (exports.VariableStatement = oi),
  (exports.VariableStatementBase = or),
  (exports.VoidExpression = iz),
  (exports.VoidExpressionBase = ij),
  (exports.WhileStatement = oo),
  (exports.WhileStatementBase = oa),
  (exports.WithStatement = ol),
  (exports.WithStatementBase = os),
  (exports.Writers = class {
    constructor() {}
    static object(e) {
      return (t) => {
        let n = Object.keys(e);
        t.write("{"),
          n.length > 0 &&
            t.indent(() => {
              for (let r = 0; r < n.length; r++) {
                r > 0 && t.write(",").newLine();
                let i = n[r],
                  a = e[i];
                t.write(i), null != a && (t.write(": "), dB(t, a));
              }
              t.newLine();
            }),
          t.write("}");
      };
    }
    static objectType(e) {
      return (t) => {
        t.write("{"),
          (function (e) {
            for (let t of Object.keys(e))
              if (
                null != e[t] &&
                (!(e[t] instanceof Array) || 0 !== e[t].length)
              )
                return !0;
            return !1;
          })(e) &&
            t.indent(() => {
              dF.forTypeElementMemberedNode().printText(t, e);
            }),
          t.write("}");
      };
    }
    static unionType(e, t, ...n) {
      return dO("|", [e, t, ...n]);
    }
    static intersectionType(e, t, ...n) {
      return dO("&", [e, t, ...n]);
    }
    static assertion(e, t) {
      return (n) => {
        dB(n, e), n.spaceIfLastNot().write("as "), dB(n, t);
      };
    }
    static returnStatement(e) {
      return (t) => {
        t.write("return "),
          t.hangingIndentUnlessBlock(() => {
            dB(t, e), t.write(";");
          });
      };
    }
  }),
  (exports.YieldExpression = iG),
  (exports.YieldExpressionBase = iV),
  (exports.createWrappedNode = function (e, t = {}) {
    let { compilerOptions: n = {}, sourceFile: r, typeChecker: i } = t,
      a = new h.CompilerOptionsContainer();
    a.set(n);
    let o = new dL({
        project: void 0,
        fileSystemWrapper: new h.TransactionalFileSystem({
          fileSystem: new h.RealFileSystemHost(),
          skipLoadingLibFiles: !0,
          libFolderPath: void 0,
        }),
        compilerOptionsContainer: a,
        createLanguageService: !1,
        typeChecker: i,
        configFileParsingDiagnostics: [],
        skipLoadingLibFiles: !0,
        libFolderPath: void 0,
      }),
      s = o.compilerFactory.getSourceFile(
        r ??
          (function (e) {
            if (e.kind === h.SyntaxKind.SourceFile) return e;
            if (null == e.parent)
              throw new h.errors.InvalidOperationError(
                "Please ensure the node was created from a source file with 'setParentNodes' set to 'true'."
              );
            let t = e;
            for (; null != t.parent; ) t = t.parent;
            if (t.kind !== h.SyntaxKind.SourceFile)
              throw new h.errors.NotImplementedError(
                "For some reason the top parent was not a source file."
              );
            return t;
          })(e),
        { markInProject: !0 }
      );
    return o.compilerFactory.getNodeFromCompilerNode(e, s);
  }),
  (exports.forEachStructureChild = function (e, t) {
    var r,
      i,
      a,
      o,
      s,
      l,
      c,
      d,
      u,
      p,
      _,
      f,
      m,
      g,
      y,
      b,
      x,
      S,
      k,
      T,
      E,
      C,
      A,
      w,
      D,
      N,
      I,
      P,
      M,
      L,
      R,
      F,
      O,
      B,
      W,
      j,
      z,
      V,
      G,
      K,
      U,
      H,
      q,
      J,
      $,
      X,
      Y,
      Q,
      Z,
      ee,
      et,
      en,
      er,
      ei;
    if (h.ArrayUtils.isReadonlyArray(e)) {
      for (let n of e) {
        let e = t(n);
        if (e) return e;
      }
      return;
    }
    switch (e.kind) {
      case exports.StructureKind.CallSignature:
        return t$((r = e), (i = t)) || tX(r, i) || tY(r, i);
      case exports.StructureKind.Class:
        return (
          (a = e),
          (o = t),
          tQ((s = a), (l = o)) ||
            tY(s, l) ||
            t$(s, l) ||
            t1(s.ctors, l, exports.StructureKind.Constructor) ||
            t1(s.staticBlocks, l, exports.StructureKind.ClassStaticBlock) ||
            t1(s.properties, l, exports.StructureKind.Property) ||
            t1(s.getAccessors, l, exports.StructureKind.GetAccessor) ||
            t1(s.setAccessors, l, exports.StructureKind.SetAccessor) ||
            t1(s.methods, l, exports.StructureKind.Method)
        );
      case exports.StructureKind.ClassStaticBlock:
        return t$((c = e), (d = t)) || tZ(c, d);
      case exports.StructureKind.ConstructorOverload:
        return tX((u = e), (p = t)) || tY(u, p) || t$(u, p);
      case exports.StructureKind.Constructor:
        return (
          t0((_ = e), (f = t)) ||
          t1(_.overloads, f, exports.StructureKind.ConstructorOverload)
        );
      case exports.StructureKind.ConstructSignature:
        return t$((m = e), (g = t)) || tX(m, g) || tY(m, g);
      case exports.StructureKind.Enum:
        return (
          t$((y = e), (b = t)) ||
          t1(y.members, b, exports.StructureKind.EnumMember)
        );
      case exports.StructureKind.EnumMember:
      case exports.StructureKind.ExportAssignment:
        return t$(e, t);
      case exports.StructureKind.ExportDeclaration:
        return (
          (x = e),
          (S = t),
          t2(x.namedExports, S, exports.StructureKind.ExportSpecifier) ||
            t1(x.attributes, S, exports.StructureKind.ImportAttribute)
        );
      case exports.StructureKind.FunctionOverload:
        return tX((k = e), (T = t)) || tY(k, T) || t$(k, T);
      case exports.StructureKind.Function:
        return (
          t0((E = e), (C = t)) ||
          t1(E.overloads, C, exports.StructureKind.FunctionOverload)
        );
      case exports.StructureKind.GetAccessor:
        return tQ((A = e), (w = t)) || t0(A, w);
      case exports.StructureKind.ImportDeclaration:
        return (
          (D = e),
          (N = t),
          t2(D.namedImports, N, exports.StructureKind.ImportSpecifier) ||
            t1(D.attributes, N, exports.StructureKind.ImportAttribute)
        );
      case exports.StructureKind.IndexSignature:
        return t$(e, t);
      case exports.StructureKind.Interface:
        return (
          tY((I = e), (P = t)) ||
          t$(I, P) ||
          ((M = I),
          (L = P),
          t1(M.callSignatures, L, exports.StructureKind.CallSignature) ||
            t1(
              M.constructSignatures,
              L,
              exports.StructureKind.ConstructSignature
            ) ||
            t1(M.getAccessors, L, exports.StructureKind.GetAccessor) ||
            t1(M.indexSignatures, L, exports.StructureKind.IndexSignature) ||
            t1(M.methods, L, exports.StructureKind.MethodSignature) ||
            t1(M.properties, L, exports.StructureKind.PropertySignature) ||
            t1(M.setAccessors, L, exports.StructureKind.SetAccessor))
        );
      case exports.StructureKind.JSDoc:
        return (R = e), (F = t), t1(R.tags, F, exports.StructureKind.JSDocTag);
      case exports.StructureKind.JsxElement:
        return (O = e), (B = t), t4(O.attributes, B) || t4(O.children, B);
      case exports.StructureKind.JsxSelfClosingElement:
        return (W = e), (j = t), (z = W), (V = j), t4(z.attributes, V);
      case exports.StructureKind.MethodOverload:
        return tX((G = e), (K = t)) || tY(G, K) || t$(G, K);
      case exports.StructureKind.Method:
        return (
          tQ((U = e), (H = t)) ||
          t0(U, H) ||
          t1(U.overloads, H, exports.StructureKind.MethodOverload)
        );
      case exports.StructureKind.MethodSignature:
        return t$((q = e), (J = t)) || tX(q, J) || tY(q, J);
      case exports.StructureKind.Module:
        return t$(($ = e), (X = t)) || tZ($, X);
      case exports.StructureKind.Parameter:
        return tQ(e, t);
      case exports.StructureKind.Property:
        return t$((Y = e), (Q = t)) || tQ(Y, Q);
      case exports.StructureKind.PropertySignature:
        return t$(e, t);
      case exports.StructureKind.SetAccessor:
        return tQ((Z = e), (ee = t)) || t0(Z, ee);
      case exports.StructureKind.SourceFile:
        return tZ(e, t);
      case exports.StructureKind.TypeAlias:
        return tY((et = e), (en = t)) || t$(et, en);
      case exports.StructureKind.VariableStatement:
        return (
          t$((er = e), (ei = t)) ||
          t1(er.declarations, ei, exports.StructureKind.VariableDeclaration)
        );
      default:
        return;
    }
  }),
  (exports.getCompilerOptionsFromTsConfig = function (e, t = {}) {
    let n = h.getCompilerOptionsFromTsConfig(e, t);
    return {
      options: n.options,
      errors: n.errors.map((e) => new dr(void 0, e)),
    };
  }),
  (exports.getScopeForNode = rl),
  (exports.insertOverloads = oh),
  (exports.printNode = K),
  (exports.setScopeForNode = rc);
export const CompilerOptionsContainer = h.CompilerOptionsContainer;
export const DiagnosticCategory = h.DiagnosticCategory;
export const EmitHint = h.EmitHint;
export const InMemoryFileSystemHost = h.InMemoryFileSystemHost;
export const LanguageVariant = h.LanguageVariant;
export const ModuleKind = h.ModuleKind;
export const ModuleResolutionKind = h.ModuleResolutionKind;
export const NewLineKind = h.NewLineKind;
export const NodeFlags = h.NodeFlags;
export const ObjectFlags = h.ObjectFlags;
export const ResolutionHosts = h.ResolutionHosts;
export const ScriptKind = h.ScriptKind;
export const ScriptTarget = h.ScriptTarget;
export const SettingsContainer = h.SettingsContainer;
export const SymbolFlags = h.SymbolFlags;
export const SyntaxKind = h.SyntaxKind;
export const TypeFlags = h.TypeFlags;
export const TypeFormatFlags = h.TypeFormatFlags;
export const ts = h.ts;
export const CodeBlockWriter = y.default;
