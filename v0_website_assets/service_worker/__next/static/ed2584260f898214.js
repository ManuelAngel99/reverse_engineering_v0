(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  403055,
  (e) => {
    "use strict";
    let r, o;
    var t,
      a,
      n = e.i(7284);
    let l = window.crypto,
      s = (e, r) => {
        if (0 === e.length) return r.classGroupId;
        let o = e[0],
          t = r.nextPart.get(o),
          a = t ? s(e.slice(1), t) : void 0;
        if (a) return a;
        if (0 === r.validators.length) return;
        let n = e.join("-");
        return r.validators.find(({ validator: e }) => e(n))?.classGroupId;
      },
      i = /^\[(.+)\]$/,
      d = (e, r, o, t) => {
        e.forEach((e) => {
          if ("string" == typeof e) {
            ("" === e ? r : c(r, e)).classGroupId = o;
            return;
          }
          "function" == typeof e
            ? m(e)
              ? d(e(t), r, o, t)
              : r.validators.push({ validator: e, classGroupId: o })
            : Object.entries(e).forEach(([e, a]) => {
                d(a, c(r, e), o, t);
              });
        });
      },
      c = (e, r) => {
        let o = e;
        return (
          r.split("-").forEach((e) => {
            (o.nextPart.has(e) ||
              o.nextPart.set(e, { nextPart: new Map(), validators: [] }),
              (o = o.nextPart.get(e)));
          }),
          o
        );
      },
      m = (e) => e.isThemeGetter,
      p = /\s+/;
    function u() {
      let e,
        r,
        o = 0,
        t = "";
      for (; o < arguments.length; )
        (e = arguments[o++]) && (r = b(e)) && (t && (t += " "), (t += r));
      return t;
    }
    let b = (e) => {
        let r;
        if ("string" == typeof e) return e;
        let o = "";
        for (let t = 0; t < e.length; t++)
          e[t] && (r = b(e[t])) && (o && (o += " "), (o += r));
        return o;
      },
      f = (e) => {
        let r = (r) => r[e] || [];
        return ((r.isThemeGetter = !0), r);
      },
      g = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
      h = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
      x = /^\d+\/\d+$/,
      k = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
      w =
        /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
      y = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
      v = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
      z =
        /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
      M = (e) => x.test(e),
      j = (e) => !!e && !Number.isNaN(Number(e)),
      N = (e) => !!e && Number.isInteger(Number(e)),
      P = (e) => e.endsWith("%") && j(e.slice(0, -1)),
      S = (e) => k.test(e),
      C = () => !0,
      G = (e) => w.test(e) && !y.test(e),
      T = () => !1,
      $ = (e) => v.test(e),
      E = (e) => z.test(e),
      I = (e) => !O(e) && !L(e),
      D = (e) => J(e, Z, T),
      O = (e) => g.test(e),
      U = (e) => J(e, ee, G),
      A = (e) => J(e, er, j),
      W = (e) => J(e, X, T),
      F = (e) => J(e, Y, E),
      K = (e) => J(e, et, $),
      L = (e) => h.test(e),
      R = (e) => Q(e, ee),
      _ = (e) => Q(e, eo),
      q = (e) => Q(e, X),
      B = (e) => Q(e, Z),
      V = (e) => Q(e, Y),
      H = (e) => Q(e, et, !0),
      J = (e, r, o) => {
        let t = g.exec(e);
        return !!t && (t[1] ? r(t[1]) : o(t[2]));
      },
      Q = (e, r, o = !1) => {
        let t = h.exec(e);
        return !!t && (t[1] ? r(t[1]) : o);
      },
      X = (e) => "position" === e || "percentage" === e,
      Y = (e) => "image" === e || "url" === e,
      Z = (e) => "length" === e || "size" === e || "bg-size" === e,
      ee = (e) => "length" === e,
      er = (e) => "number" === e,
      eo = (e) => "family-name" === e,
      et = (e) => "shadow" === e,
      ea = (function (e, ...r) {
        let o,
          t,
          a,
          n = function (c) {
            var m;
            let p;
            return (
              (t = (o = {
                cache: ((e) => {
                  if (e < 1) return { get: () => void 0, set: () => {} };
                  let r = 0,
                    o = new Map(),
                    t = new Map(),
                    a = (a, n) => {
                      (o.set(a, n),
                        ++r > e && ((r = 0), (t = o), (o = new Map())));
                    };
                  return {
                    get(e) {
                      let r = o.get(e);
                      return void 0 !== r
                        ? r
                        : void 0 !== (r = t.get(e))
                          ? (a(e, r), r)
                          : void 0;
                    },
                    set(e, r) {
                      o.has(e) ? o.set(e, r) : a(e, r);
                    },
                  };
                })((m = r.reduce((e, r) => r(e), e())).cacheSize),
                parseClassName: ((e) => {
                  let { prefix: r, experimentalParseClassName: o } = e,
                    t = (e) => {
                      let r,
                        o,
                        t = [],
                        a = 0,
                        n = 0,
                        l = 0;
                      for (let r = 0; r < e.length; r++) {
                        let s = e[r];
                        if (0 === a && 0 === n) {
                          if (":" === s) {
                            (t.push(e.slice(l, r)), (l = r + 1));
                            continue;
                          }
                          if ("/" === s) {
                            o = r;
                            continue;
                          }
                        }
                        "[" === s
                          ? a++
                          : "]" === s
                            ? a--
                            : "(" === s
                              ? n++
                              : ")" === s && n--;
                      }
                      let s = 0 === t.length ? e : e.substring(l),
                        i = (r = s).endsWith("!")
                          ? r.substring(0, r.length - 1)
                          : r.startsWith("!")
                            ? r.substring(1)
                            : r;
                      return {
                        modifiers: t,
                        hasImportantModifier: i !== s,
                        baseClassName: i,
                        maybePostfixModifierPosition:
                          o && o > l ? o - l : void 0,
                      };
                    };
                  if (r) {
                    let e = r + ":",
                      o = t;
                    t = (r) =>
                      r.startsWith(e)
                        ? o(r.substring(e.length))
                        : {
                            isExternal: !0,
                            modifiers: [],
                            hasImportantModifier: !1,
                            baseClassName: r,
                            maybePostfixModifierPosition: void 0,
                          };
                  }
                  if (o) {
                    let e = t;
                    t = (r) => o({ className: r, parseClassName: e });
                  }
                  return t;
                })(m),
                sortModifiers:
                  ((p = Object.fromEntries(
                    m.orderSensitiveModifiers.map((e) => [e, !0]),
                  )),
                  (e) => {
                    if (e.length <= 1) return e;
                    let r = [],
                      o = [];
                    return (
                      e.forEach((e) => {
                        "[" === e[0] || p[e]
                          ? (r.push(...o.sort(), e), (o = []))
                          : o.push(e);
                      }),
                      r.push(...o.sort()),
                      r
                    );
                  }),
                ...((e) => {
                  let r = ((e) => {
                      let { theme: r, classGroups: o } = e,
                        t = { nextPart: new Map(), validators: [] };
                      for (let e in o) d(o[e], t, e, r);
                      return t;
                    })(e),
                    {
                      conflictingClassGroups: o,
                      conflictingClassGroupModifiers: t,
                    } = e;
                  return {
                    getClassGroupId: (e) => {
                      let o = e.split("-");
                      return (
                        "" === o[0] && 1 !== o.length && o.shift(),
                        s(o, r) ||
                          ((e) => {
                            if (i.test(e)) {
                              let r = i.exec(e)[1],
                                o = r?.substring(0, r.indexOf(":"));
                              if (o) return "arbitrary.." + o;
                            }
                          })(e)
                      );
                    },
                    getConflictingClassGroupIds: (e, r) => {
                      let a = o[e] || [];
                      return r && t[e] ? [...a, ...t[e]] : a;
                    },
                  };
                })(m),
              }).cache.get),
              (a = o.cache.set),
              (n = l),
              l(c)
            );
          };
        function l(e) {
          let r = t(e);
          if (r) return r;
          let n = ((e, r) => {
            let {
                parseClassName: o,
                getClassGroupId: t,
                getConflictingClassGroupIds: a,
                sortModifiers: n,
              } = r,
              l = [],
              s = e.trim().split(p),
              i = "";
            for (let e = s.length - 1; e >= 0; e -= 1) {
              let r = s[e],
                {
                  isExternal: d,
                  modifiers: c,
                  hasImportantModifier: m,
                  baseClassName: p,
                  maybePostfixModifierPosition: u,
                } = o(r);
              if (d) {
                i = r + (i.length > 0 ? " " + i : i);
                continue;
              }
              let b = !!u,
                f = t(b ? p.substring(0, u) : p);
              if (!f) {
                if (!b || !(f = t(p))) {
                  i = r + (i.length > 0 ? " " + i : i);
                  continue;
                }
                b = !1;
              }
              let g = n(c).join(":"),
                h = m ? g + "!" : g,
                x = h + f;
              if (l.includes(x)) continue;
              l.push(x);
              let k = a(f, b);
              for (let e = 0; e < k.length; ++e) {
                let r = k[e];
                l.push(h + r);
              }
              i = r + (i.length > 0 ? " " + i : i);
            }
            return i;
          })(e, o);
          return (a(e, n), n);
        }
        return function () {
          return n(u.apply(null, arguments));
        };
      })(() => {
        let e = f("color"),
          r = f("font"),
          o = f("text"),
          t = f("font-weight"),
          a = f("tracking"),
          n = f("leading"),
          l = f("breakpoint"),
          s = f("container"),
          i = f("spacing"),
          d = f("radius"),
          c = f("shadow"),
          m = f("inset-shadow"),
          p = f("text-shadow"),
          u = f("drop-shadow"),
          b = f("blur"),
          g = f("perspective"),
          h = f("aspect"),
          x = f("ease"),
          k = f("animate"),
          w = () => [
            "auto",
            "avoid",
            "all",
            "avoid-page",
            "page",
            "left",
            "right",
            "column",
          ],
          y = () => [
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            "left-top",
            "top-right",
            "right-top",
            "bottom-right",
            "right-bottom",
            "bottom-left",
            "left-bottom",
          ],
          v = () => [...y(), L, O],
          z = () => ["auto", "hidden", "clip", "visible", "scroll"],
          G = () => ["auto", "contain", "none"],
          T = () => [L, O, i],
          $ = () => [M, "full", "auto", ...T()],
          E = () => [N, "none", "subgrid", L, O],
          J = () => ["auto", { span: ["full", N, L, O] }, N, L, O],
          Q = () => [N, "auto", L, O],
          X = () => ["auto", "min", "max", "fr", L, O],
          Y = () => [
            "start",
            "end",
            "center",
            "between",
            "around",
            "evenly",
            "stretch",
            "baseline",
            "center-safe",
            "end-safe",
          ],
          Z = () => [
            "start",
            "end",
            "center",
            "stretch",
            "center-safe",
            "end-safe",
          ],
          ee = () => ["auto", ...T()],
          er = () => [
            M,
            "auto",
            "full",
            "dvw",
            "dvh",
            "lvw",
            "lvh",
            "svw",
            "svh",
            "min",
            "max",
            "fit",
            ...T(),
          ],
          eo = () => [e, L, O],
          et = () => [...y(), q, W, { position: [L, O] }],
          ea = () => [
            "no-repeat",
            { repeat: ["", "x", "y", "space", "round"] },
          ],
          en = () => ["auto", "cover", "contain", B, D, { size: [L, O] }],
          el = () => [P, R, U],
          es = () => ["", "none", "full", d, L, O],
          ei = () => ["", j, R, U],
          ed = () => ["solid", "dashed", "dotted", "double"],
          ec = () => [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
          ],
          em = () => [j, P, q, W],
          ep = () => ["", "none", b, L, O],
          eu = () => ["none", j, L, O],
          eb = () => ["none", j, L, O],
          ef = () => [j, L, O],
          eg = () => [M, "full", ...T()];
        return {
          cacheSize: 500,
          theme: {
            animate: ["spin", "ping", "pulse", "bounce"],
            aspect: ["video"],
            blur: [S],
            breakpoint: [S],
            color: [C],
            container: [S],
            "drop-shadow": [S],
            ease: ["in", "out", "in-out"],
            font: [I],
            "font-weight": [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
            ],
            "inset-shadow": [S],
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
            perspective: [
              "dramatic",
              "near",
              "normal",
              "midrange",
              "distant",
              "none",
            ],
            radius: [S],
            shadow: [S],
            spacing: ["px", j],
            text: [S],
            "text-shadow": [S],
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
          },
          classGroups: {
            aspect: [{ aspect: ["auto", "square", M, O, L, h] }],
            container: ["container"],
            columns: [{ columns: [j, O, L, s] }],
            "break-after": [{ "break-after": w() }],
            "break-before": [{ "break-before": w() }],
            "break-inside": [
              {
                "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"],
              },
            ],
            "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
            box: [{ box: ["border", "content"] }],
            display: [
              "block",
              "inline-block",
              "inline",
              "flex",
              "inline-flex",
              "table",
              "inline-table",
              "table-caption",
              "table-cell",
              "table-column",
              "table-column-group",
              "table-footer-group",
              "table-header-group",
              "table-row-group",
              "table-row",
              "flow-root",
              "grid",
              "inline-grid",
              "contents",
              "list-item",
              "hidden",
            ],
            sr: ["sr-only", "not-sr-only"],
            float: [{ float: ["right", "left", "none", "start", "end"] }],
            clear: [
              { clear: ["left", "right", "both", "none", "start", "end"] },
            ],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [
              { object: ["contain", "cover", "fill", "none", "scale-down"] },
            ],
            "object-position": [{ object: v() }],
            overflow: [{ overflow: z() }],
            "overflow-x": [{ "overflow-x": z() }],
            "overflow-y": [{ "overflow-y": z() }],
            overscroll: [{ overscroll: G() }],
            "overscroll-x": [{ "overscroll-x": G() }],
            "overscroll-y": [{ "overscroll-y": G() }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{ inset: $() }],
            "inset-x": [{ "inset-x": $() }],
            "inset-y": [{ "inset-y": $() }],
            start: [{ start: $() }],
            end: [{ end: $() }],
            top: [{ top: $() }],
            right: [{ right: $() }],
            bottom: [{ bottom: $() }],
            left: [{ left: $() }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{ z: [N, "auto", L, O] }],
            basis: [{ basis: [M, "full", "auto", s, ...T()] }],
            "flex-direction": [
              { flex: ["row", "row-reverse", "col", "col-reverse"] },
            ],
            "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
            flex: [{ flex: [j, M, "auto", "initial", "none", O] }],
            grow: [{ grow: ["", j, L, O] }],
            shrink: [{ shrink: ["", j, L, O] }],
            order: [{ order: [N, "first", "last", "none", L, O] }],
            "grid-cols": [{ "grid-cols": E() }],
            "col-start-end": [{ col: J() }],
            "col-start": [{ "col-start": Q() }],
            "col-end": [{ "col-end": Q() }],
            "grid-rows": [{ "grid-rows": E() }],
            "row-start-end": [{ row: J() }],
            "row-start": [{ "row-start": Q() }],
            "row-end": [{ "row-end": Q() }],
            "grid-flow": [
              {
                "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"],
              },
            ],
            "auto-cols": [{ "auto-cols": X() }],
            "auto-rows": [{ "auto-rows": X() }],
            gap: [{ gap: T() }],
            "gap-x": [{ "gap-x": T() }],
            "gap-y": [{ "gap-y": T() }],
            "justify-content": [{ justify: [...Y(), "normal"] }],
            "justify-items": [{ "justify-items": [...Z(), "normal"] }],
            "justify-self": [{ "justify-self": ["auto", ...Z()] }],
            "align-content": [{ content: ["normal", ...Y()] }],
            "align-items": [{ items: [...Z(), { baseline: ["", "last"] }] }],
            "align-self": [
              { self: ["auto", ...Z(), { baseline: ["", "last"] }] },
            ],
            "place-content": [{ "place-content": Y() }],
            "place-items": [{ "place-items": [...Z(), "baseline"] }],
            "place-self": [{ "place-self": ["auto", ...Z()] }],
            p: [{ p: T() }],
            px: [{ px: T() }],
            py: [{ py: T() }],
            ps: [{ ps: T() }],
            pe: [{ pe: T() }],
            pt: [{ pt: T() }],
            pr: [{ pr: T() }],
            pb: [{ pb: T() }],
            pl: [{ pl: T() }],
            m: [{ m: ee() }],
            mx: [{ mx: ee() }],
            my: [{ my: ee() }],
            ms: [{ ms: ee() }],
            me: [{ me: ee() }],
            mt: [{ mt: ee() }],
            mr: [{ mr: ee() }],
            mb: [{ mb: ee() }],
            ml: [{ ml: ee() }],
            "space-x": [{ "space-x": T() }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{ "space-y": T() }],
            "space-y-reverse": ["space-y-reverse"],
            size: [{ size: er() }],
            w: [{ w: [s, "screen", ...er()] }],
            "min-w": [{ "min-w": [s, "screen", "none", ...er()] }],
            "max-w": [
              {
                "max-w": [
                  s,
                  "screen",
                  "none",
                  "prose",
                  { screen: [l] },
                  ...er(),
                ],
              },
            ],
            h: [{ h: ["screen", "lh", ...er()] }],
            "min-h": [{ "min-h": ["screen", "lh", "none", ...er()] }],
            "max-h": [{ "max-h": ["screen", "lh", ...er()] }],
            "font-size": [{ text: ["base", o, R, U] }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [{ font: [t, L, A] }],
            "font-stretch": [
              {
                "font-stretch": [
                  "ultra-condensed",
                  "extra-condensed",
                  "condensed",
                  "semi-condensed",
                  "normal",
                  "semi-expanded",
                  "expanded",
                  "extra-expanded",
                  "ultra-expanded",
                  P,
                  O,
                ],
              },
            ],
            "font-family": [{ font: [_, O, r] }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
            tracking: [{ tracking: [a, L, O] }],
            "line-clamp": [{ "line-clamp": [j, "none", L, A] }],
            leading: [{ leading: [n, ...T()] }],
            "list-image": [{ "list-image": ["none", L, O] }],
            "list-style-position": [{ list: ["inside", "outside"] }],
            "list-style-type": [{ list: ["disc", "decimal", "none", L, O] }],
            "text-alignment": [
              { text: ["left", "center", "right", "justify", "start", "end"] },
            ],
            "placeholder-color": [{ placeholder: eo() }],
            "text-color": [{ text: eo() }],
            "text-decoration": [
              "underline",
              "overline",
              "line-through",
              "no-underline",
            ],
            "text-decoration-style": [{ decoration: [...ed(), "wavy"] }],
            "text-decoration-thickness": [
              { decoration: [j, "from-font", "auto", L, U] },
            ],
            "text-decoration-color": [{ decoration: eo() }],
            "underline-offset": [{ "underline-offset": [j, "auto", L, O] }],
            "text-transform": [
              "uppercase",
              "lowercase",
              "capitalize",
              "normal-case",
            ],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
            indent: [{ indent: T() }],
            "vertical-align": [
              {
                align: [
                  "baseline",
                  "top",
                  "middle",
                  "bottom",
                  "text-top",
                  "text-bottom",
                  "sub",
                  "super",
                  L,
                  O,
                ],
              },
            ],
            whitespace: [
              {
                whitespace: [
                  "normal",
                  "nowrap",
                  "pre",
                  "pre-line",
                  "pre-wrap",
                  "break-spaces",
                ],
              },
            ],
            break: [{ break: ["normal", "words", "all", "keep"] }],
            wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
            hyphens: [{ hyphens: ["none", "manual", "auto"] }],
            content: [{ content: ["none", L, O] }],
            "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
            "bg-clip": [
              { "bg-clip": ["border", "padding", "content", "text"] },
            ],
            "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
            "bg-position": [{ bg: et() }],
            "bg-repeat": [{ bg: ea() }],
            "bg-size": [{ bg: en() }],
            "bg-image": [
              {
                bg: [
                  "none",
                  {
                    linear: [
                      { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                      N,
                      L,
                      O,
                    ],
                    radial: ["", L, O],
                    conic: [N, L, O],
                  },
                  V,
                  F,
                ],
              },
            ],
            "bg-color": [{ bg: eo() }],
            "gradient-from-pos": [{ from: el() }],
            "gradient-via-pos": [{ via: el() }],
            "gradient-to-pos": [{ to: el() }],
            "gradient-from": [{ from: eo() }],
            "gradient-via": [{ via: eo() }],
            "gradient-to": [{ to: eo() }],
            rounded: [{ rounded: es() }],
            "rounded-s": [{ "rounded-s": es() }],
            "rounded-e": [{ "rounded-e": es() }],
            "rounded-t": [{ "rounded-t": es() }],
            "rounded-r": [{ "rounded-r": es() }],
            "rounded-b": [{ "rounded-b": es() }],
            "rounded-l": [{ "rounded-l": es() }],
            "rounded-ss": [{ "rounded-ss": es() }],
            "rounded-se": [{ "rounded-se": es() }],
            "rounded-ee": [{ "rounded-ee": es() }],
            "rounded-es": [{ "rounded-es": es() }],
            "rounded-tl": [{ "rounded-tl": es() }],
            "rounded-tr": [{ "rounded-tr": es() }],
            "rounded-br": [{ "rounded-br": es() }],
            "rounded-bl": [{ "rounded-bl": es() }],
            "border-w": [{ border: ei() }],
            "border-w-x": [{ "border-x": ei() }],
            "border-w-y": [{ "border-y": ei() }],
            "border-w-s": [{ "border-s": ei() }],
            "border-w-e": [{ "border-e": ei() }],
            "border-w-t": [{ "border-t": ei() }],
            "border-w-r": [{ "border-r": ei() }],
            "border-w-b": [{ "border-b": ei() }],
            "border-w-l": [{ "border-l": ei() }],
            "divide-x": [{ "divide-x": ei() }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{ "divide-y": ei() }],
            "divide-y-reverse": ["divide-y-reverse"],
            "border-style": [{ border: [...ed(), "hidden", "none"] }],
            "divide-style": [{ divide: [...ed(), "hidden", "none"] }],
            "border-color": [{ border: eo() }],
            "border-color-x": [{ "border-x": eo() }],
            "border-color-y": [{ "border-y": eo() }],
            "border-color-s": [{ "border-s": eo() }],
            "border-color-e": [{ "border-e": eo() }],
            "border-color-t": [{ "border-t": eo() }],
            "border-color-r": [{ "border-r": eo() }],
            "border-color-b": [{ "border-b": eo() }],
            "border-color-l": [{ "border-l": eo() }],
            "divide-color": [{ divide: eo() }],
            "outline-style": [{ outline: [...ed(), "none", "hidden"] }],
            "outline-offset": [{ "outline-offset": [j, L, O] }],
            "outline-w": [{ outline: ["", j, R, U] }],
            "outline-color": [{ outline: eo() }],
            shadow: [{ shadow: ["", "none", c, H, K] }],
            "shadow-color": [{ shadow: eo() }],
            "inset-shadow": [{ "inset-shadow": ["none", m, H, K] }],
            "inset-shadow-color": [{ "inset-shadow": eo() }],
            "ring-w": [{ ring: ei() }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{ ring: eo() }],
            "ring-offset-w": [{ "ring-offset": [j, U] }],
            "ring-offset-color": [{ "ring-offset": eo() }],
            "inset-ring-w": [{ "inset-ring": ei() }],
            "inset-ring-color": [{ "inset-ring": eo() }],
            "text-shadow": [{ "text-shadow": ["none", p, H, K] }],
            "text-shadow-color": [{ "text-shadow": eo() }],
            opacity: [{ opacity: [j, L, O] }],
            "mix-blend": [
              { "mix-blend": [...ec(), "plus-darker", "plus-lighter"] },
            ],
            "bg-blend": [{ "bg-blend": ec() }],
            "mask-clip": [
              {
                "mask-clip": [
                  "border",
                  "padding",
                  "content",
                  "fill",
                  "stroke",
                  "view",
                ],
              },
              "mask-no-clip",
            ],
            "mask-composite": [
              { mask: ["add", "subtract", "intersect", "exclude"] },
            ],
            "mask-image-linear-pos": [{ "mask-linear": [j] }],
            "mask-image-linear-from-pos": [{ "mask-linear-from": em() }],
            "mask-image-linear-to-pos": [{ "mask-linear-to": em() }],
            "mask-image-linear-from-color": [{ "mask-linear-from": eo() }],
            "mask-image-linear-to-color": [{ "mask-linear-to": eo() }],
            "mask-image-t-from-pos": [{ "mask-t-from": em() }],
            "mask-image-t-to-pos": [{ "mask-t-to": em() }],
            "mask-image-t-from-color": [{ "mask-t-from": eo() }],
            "mask-image-t-to-color": [{ "mask-t-to": eo() }],
            "mask-image-r-from-pos": [{ "mask-r-from": em() }],
            "mask-image-r-to-pos": [{ "mask-r-to": em() }],
            "mask-image-r-from-color": [{ "mask-r-from": eo() }],
            "mask-image-r-to-color": [{ "mask-r-to": eo() }],
            "mask-image-b-from-pos": [{ "mask-b-from": em() }],
            "mask-image-b-to-pos": [{ "mask-b-to": em() }],
            "mask-image-b-from-color": [{ "mask-b-from": eo() }],
            "mask-image-b-to-color": [{ "mask-b-to": eo() }],
            "mask-image-l-from-pos": [{ "mask-l-from": em() }],
            "mask-image-l-to-pos": [{ "mask-l-to": em() }],
            "mask-image-l-from-color": [{ "mask-l-from": eo() }],
            "mask-image-l-to-color": [{ "mask-l-to": eo() }],
            "mask-image-x-from-pos": [{ "mask-x-from": em() }],
            "mask-image-x-to-pos": [{ "mask-x-to": em() }],
            "mask-image-x-from-color": [{ "mask-x-from": eo() }],
            "mask-image-x-to-color": [{ "mask-x-to": eo() }],
            "mask-image-y-from-pos": [{ "mask-y-from": em() }],
            "mask-image-y-to-pos": [{ "mask-y-to": em() }],
            "mask-image-y-from-color": [{ "mask-y-from": eo() }],
            "mask-image-y-to-color": [{ "mask-y-to": eo() }],
            "mask-image-radial": [{ "mask-radial": [L, O] }],
            "mask-image-radial-from-pos": [{ "mask-radial-from": em() }],
            "mask-image-radial-to-pos": [{ "mask-radial-to": em() }],
            "mask-image-radial-from-color": [{ "mask-radial-from": eo() }],
            "mask-image-radial-to-color": [{ "mask-radial-to": eo() }],
            "mask-image-radial-shape": [
              { "mask-radial": ["circle", "ellipse"] },
            ],
            "mask-image-radial-size": [
              {
                "mask-radial": [
                  { closest: ["side", "corner"], farthest: ["side", "corner"] },
                ],
              },
            ],
            "mask-image-radial-pos": [{ "mask-radial-at": y() }],
            "mask-image-conic-pos": [{ "mask-conic": [j] }],
            "mask-image-conic-from-pos": [{ "mask-conic-from": em() }],
            "mask-image-conic-to-pos": [{ "mask-conic-to": em() }],
            "mask-image-conic-from-color": [{ "mask-conic-from": eo() }],
            "mask-image-conic-to-color": [{ "mask-conic-to": eo() }],
            "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
            "mask-origin": [
              {
                "mask-origin": [
                  "border",
                  "padding",
                  "content",
                  "fill",
                  "stroke",
                  "view",
                ],
              },
            ],
            "mask-position": [{ mask: et() }],
            "mask-repeat": [{ mask: ea() }],
            "mask-size": [{ mask: en() }],
            "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
            "mask-image": [{ mask: ["none", L, O] }],
            filter: [{ filter: ["", "none", L, O] }],
            blur: [{ blur: ep() }],
            brightness: [{ brightness: [j, L, O] }],
            contrast: [{ contrast: [j, L, O] }],
            "drop-shadow": [{ "drop-shadow": ["", "none", u, H, K] }],
            "drop-shadow-color": [{ "drop-shadow": eo() }],
            grayscale: [{ grayscale: ["", j, L, O] }],
            "hue-rotate": [{ "hue-rotate": [j, L, O] }],
            invert: [{ invert: ["", j, L, O] }],
            saturate: [{ saturate: [j, L, O] }],
            sepia: [{ sepia: ["", j, L, O] }],
            "backdrop-filter": [{ "backdrop-filter": ["", "none", L, O] }],
            "backdrop-blur": [{ "backdrop-blur": ep() }],
            "backdrop-brightness": [{ "backdrop-brightness": [j, L, O] }],
            "backdrop-contrast": [{ "backdrop-contrast": [j, L, O] }],
            "backdrop-grayscale": [{ "backdrop-grayscale": ["", j, L, O] }],
            "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [j, L, O] }],
            "backdrop-invert": [{ "backdrop-invert": ["", j, L, O] }],
            "backdrop-opacity": [{ "backdrop-opacity": [j, L, O] }],
            "backdrop-saturate": [{ "backdrop-saturate": [j, L, O] }],
            "backdrop-sepia": [{ "backdrop-sepia": ["", j, L, O] }],
            "border-collapse": [{ border: ["collapse", "separate"] }],
            "border-spacing": [{ "border-spacing": T() }],
            "border-spacing-x": [{ "border-spacing-x": T() }],
            "border-spacing-y": [{ "border-spacing-y": T() }],
            "table-layout": [{ table: ["auto", "fixed"] }],
            caption: [{ caption: ["top", "bottom"] }],
            transition: [
              {
                transition: [
                  "",
                  "all",
                  "colors",
                  "opacity",
                  "shadow",
                  "transform",
                  "none",
                  L,
                  O,
                ],
              },
            ],
            "transition-behavior": [{ transition: ["normal", "discrete"] }],
            duration: [{ duration: [j, "initial", L, O] }],
            ease: [{ ease: ["linear", "initial", x, L, O] }],
            delay: [{ delay: [j, L, O] }],
            animate: [{ animate: ["none", k, L, O] }],
            backface: [{ backface: ["hidden", "visible"] }],
            perspective: [{ perspective: [g, L, O] }],
            "perspective-origin": [{ "perspective-origin": v() }],
            rotate: [{ rotate: eu() }],
            "rotate-x": [{ "rotate-x": eu() }],
            "rotate-y": [{ "rotate-y": eu() }],
            "rotate-z": [{ "rotate-z": eu() }],
            scale: [{ scale: eb() }],
            "scale-x": [{ "scale-x": eb() }],
            "scale-y": [{ "scale-y": eb() }],
            "scale-z": [{ "scale-z": eb() }],
            "scale-3d": ["scale-3d"],
            skew: [{ skew: ef() }],
            "skew-x": [{ "skew-x": ef() }],
            "skew-y": [{ "skew-y": ef() }],
            transform: [{ transform: [L, O, "", "none", "gpu", "cpu"] }],
            "transform-origin": [{ origin: v() }],
            "transform-style": [{ transform: ["3d", "flat"] }],
            translate: [{ translate: eg() }],
            "translate-x": [{ "translate-x": eg() }],
            "translate-y": [{ "translate-y": eg() }],
            "translate-z": [{ "translate-z": eg() }],
            "translate-none": ["translate-none"],
            accent: [{ accent: eo() }],
            appearance: [{ appearance: ["none", "auto"] }],
            "caret-color": [{ caret: eo() }],
            "color-scheme": [
              {
                scheme: [
                  "normal",
                  "dark",
                  "light",
                  "light-dark",
                  "only-dark",
                  "only-light",
                ],
              },
            ],
            cursor: [
              {
                cursor: [
                  "auto",
                  "default",
                  "pointer",
                  "wait",
                  "text",
                  "move",
                  "help",
                  "not-allowed",
                  "none",
                  "context-menu",
                  "progress",
                  "cell",
                  "crosshair",
                  "vertical-text",
                  "alias",
                  "copy",
                  "no-drop",
                  "grab",
                  "grabbing",
                  "all-scroll",
                  "col-resize",
                  "row-resize",
                  "n-resize",
                  "e-resize",
                  "s-resize",
                  "w-resize",
                  "ne-resize",
                  "nw-resize",
                  "se-resize",
                  "sw-resize",
                  "ew-resize",
                  "ns-resize",
                  "nesw-resize",
                  "nwse-resize",
                  "zoom-in",
                  "zoom-out",
                  L,
                  O,
                ],
              },
            ],
            "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
            "pointer-events": [{ "pointer-events": ["auto", "none"] }],
            resize: [{ resize: ["none", "", "y", "x"] }],
            "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
            "scroll-m": [{ "scroll-m": T() }],
            "scroll-mx": [{ "scroll-mx": T() }],
            "scroll-my": [{ "scroll-my": T() }],
            "scroll-ms": [{ "scroll-ms": T() }],
            "scroll-me": [{ "scroll-me": T() }],
            "scroll-mt": [{ "scroll-mt": T() }],
            "scroll-mr": [{ "scroll-mr": T() }],
            "scroll-mb": [{ "scroll-mb": T() }],
            "scroll-ml": [{ "scroll-ml": T() }],
            "scroll-p": [{ "scroll-p": T() }],
            "scroll-px": [{ "scroll-px": T() }],
            "scroll-py": [{ "scroll-py": T() }],
            "scroll-ps": [{ "scroll-ps": T() }],
            "scroll-pe": [{ "scroll-pe": T() }],
            "scroll-pt": [{ "scroll-pt": T() }],
            "scroll-pr": [{ "scroll-pr": T() }],
            "scroll-pb": [{ "scroll-pb": T() }],
            "scroll-pl": [{ "scroll-pl": T() }],
            "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
            "snap-stop": [{ snap: ["normal", "always"] }],
            "snap-type": [{ snap: ["none", "x", "y", "both"] }],
            "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
            touch: [{ touch: ["auto", "none", "manipulation"] }],
            "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
            "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
            "touch-pz": ["touch-pinch-zoom"],
            select: [{ select: ["none", "text", "all", "auto"] }],
            "will-change": [
              {
                "will-change": [
                  "auto",
                  "scroll",
                  "contents",
                  "transform",
                  L,
                  O,
                ],
              },
            ],
            fill: [{ fill: ["none", ...eo()] }],
            "stroke-w": [{ stroke: [j, R, U, A] }],
            stroke: [{ stroke: ["none", ...eo()] }],
            "forced-color-adjust": [
              { "forced-color-adjust": ["auto", "none"] },
            ],
          },
          conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: [
              "inset-x",
              "inset-y",
              "start",
              "end",
              "top",
              "right",
              "bottom",
              "left",
            ],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": [
              "fvn-ordinal",
              "fvn-slashed-zero",
              "fvn-figure",
              "fvn-spacing",
              "fvn-fraction",
            ],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: [
              "rounded-s",
              "rounded-e",
              "rounded-t",
              "rounded-r",
              "rounded-b",
              "rounded-l",
              "rounded-ss",
              "rounded-se",
              "rounded-ee",
              "rounded-es",
              "rounded-tl",
              "rounded-tr",
              "rounded-br",
              "rounded-bl",
            ],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": [
              "border-w-x",
              "border-w-y",
              "border-w-s",
              "border-w-e",
              "border-w-t",
              "border-w-r",
              "border-w-b",
              "border-w-l",
            ],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": [
              "border-color-x",
              "border-color-y",
              "border-color-s",
              "border-color-e",
              "border-color-t",
              "border-color-r",
              "border-color-b",
              "border-color-l",
            ],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            translate: ["translate-x", "translate-y", "translate-none"],
            "translate-none": [
              "translate",
              "translate-x",
              "translate-y",
              "translate-z",
            ],
            "scroll-m": [
              "scroll-mx",
              "scroll-my",
              "scroll-ms",
              "scroll-me",
              "scroll-mt",
              "scroll-mr",
              "scroll-mb",
              "scroll-ml",
            ],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": [
              "scroll-px",
              "scroll-py",
              "scroll-ps",
              "scroll-pe",
              "scroll-pt",
              "scroll-pr",
              "scroll-pb",
              "scroll-pl",
            ],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"],
          },
          conflictingClassGroupModifiers: { "font-size": ["leading"] },
          orderSensitiveModifiers: [
            "*",
            "**",
            "after",
            "backdrop",
            "before",
            "details-content",
            "file",
            "first-letter",
            "first-line",
            "marker",
            "placeholder",
            "selection",
          ],
        };
      });
    function en(e) {
      return "object" == typeof e
        ? e
        : new Date("number" == typeof e || isNaN(+e) ? e : +e);
    }
    function el(...e) {
      return ea((0, n.clsx)(e));
    }
    let es =
      ((t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),
      (a = (e) => l.getRandomValues(new Uint8Array(e))),
      (o = -~(
        (1.6 * (r = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1) * 11) /
        t.length
      )),
      (e) => {
        let n = e || 11,
          l = "";
        for (;;) {
          let e = a(o),
            s = o;
          for (; s--; ) {
            let o = e[s];
            if ((void 0 !== o && (l += t[o & r] || ""), l.length === +n))
              return l;
          }
        }
      });
    async function ei(e, r) {
      let o = await fetch(e, r);
      if (!o.ok) {
        let e = await o.json();
        if (e.error) {
          let r = Error(e.error);
          throw ((r.status = o.status), r);
        }
        throw Error("An unexpected error occurred");
      }
      return o.json();
    }
    function ed(e) {
      return en(e).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    function ec(e) {
      return en(e).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    function em(e) {
      let r = e % 100;
      return r > 10 && r < 14
        ? e + "th"
        : e + (["th", "st", "nd", "rd"][e % 10 > 3 ? 0 : e % 10] || "th");
    }
    function ep(e) {
      let r = en(e);
      return 2592e6 >= Math.abs(new Date().getTime() - r.getTime());
    }
    function eu(e, r = { digits: 1 }) {
      if (!e) return "0";
      if (r.full) return Intl.NumberFormat("en-US").format(e);
      let o = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ]
        .reverse()
        .find(function (r) {
          return e >= r.value;
        });
      return o
        ? (e / o.value)
            .toFixed(r.digits)
            .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + o.symbol
        : "0";
    }
    function eb(e) {
      return new Promise((r) => setTimeout(r, e));
    }
    function ef(e) {
      return { error: e };
    }
    e.s(
      [
        "cn",
        () => el,
        "errorObject",
        () => ef,
        "fetcher",
        () => ei,
        "formatDate",
        () => ed,
        "formatOrdinalSuffix",
        () => em,
        "formatShortDate",
        () => ec,
        "isNonNullable",
        0,
        (e) => null !== e,
        "isWithin30Days",
        () => ep,
        "nFormatter",
        () => eu,
        "nanoid",
        0,
        es,
        "sleep",
        () => eb,
        "unsafe_hash_cyrb64",
        0,
        (e, r = 0) => {
          let o = 0xdeadbeef ^ r,
            t = 0x41c6ce57 ^ r;
          for (let r, a = 0; a < e.length; a++)
            ((o = Math.imul(o ^ (r = e.charCodeAt(a)), 0x9e3779b1)),
              (t = Math.imul(t ^ r, 0x5f356495)));
          return (
            (o =
              Math.imul(o ^ (o >>> 16), 0x85ebca6b) ^
              Math.imul(t ^ (t >>> 13), 0xc2b2ae35)),
            [
              (t =
                Math.imul(t ^ (t >>> 16), 0x85ebca6b) ^
                Math.imul(o ^ (o >>> 13), 0xc2b2ae35)) >>> 0,
              o >>> 0,
            ]
          );
        },
      ],
      403055,
    );
  },
]);
