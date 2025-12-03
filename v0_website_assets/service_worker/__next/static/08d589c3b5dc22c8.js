(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  373630,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(546564),
      r = e.i(45616),
      o = e.i(674180),
      a = (e) => {
        var a;
        let u,
          c,
          { present: s, children: l } = e,
          d = (function (e) {
            var r, a;
            let [u, c] = t.useState(),
              s = t.useRef({}),
              l = t.useRef(e),
              d = t.useRef("none"),
              [f, p] =
                ((r = e ? "mounted" : "unmounted"),
                (a = {
                  mounted: {
                    UNMOUNT: "unmounted",
                    ANIMATION_OUT: "unmountSuspended",
                  },
                  unmountSuspended: {
                    MOUNT: "mounted",
                    ANIMATION_END: "unmounted",
                  },
                  unmounted: { MOUNT: "mounted" },
                }),
                t.useReducer((e, t) => a[e][t] ?? e, r));
            return (
              t.useEffect(() => {
                let e = i(s.current);
                d.current = "mounted" === f ? e : "none";
              }, [f]),
              (0, o.useLayoutEffect)(() => {
                let t = s.current,
                  n = l.current;
                if (n !== e) {
                  let r = d.current,
                    o = i(t);
                  (e
                    ? p("MOUNT")
                    : "none" === o || t?.display === "none"
                      ? p("UNMOUNT")
                      : n && r !== o
                        ? p("ANIMATION_OUT")
                        : p("UNMOUNT"),
                    (l.current = e));
                }
              }, [e, p]),
              (0, o.useLayoutEffect)(() => {
                if (u) {
                  let e = (e) => {
                      let t = i(s.current).includes(e.animationName);
                      e.target === u &&
                        t &&
                        n.flushSync(() => p("ANIMATION_END"));
                    },
                    t = (e) => {
                      e.target === u && (d.current = i(s.current));
                    };
                  return (
                    u.addEventListener("animationstart", t),
                    u.addEventListener("animationcancel", e),
                    u.addEventListener("animationend", e),
                    () => {
                      (u.removeEventListener("animationstart", t),
                        u.removeEventListener("animationcancel", e),
                        u.removeEventListener("animationend", e));
                    }
                  );
                }
                p("ANIMATION_END");
              }, [u, p]),
              {
                isPresent: ["mounted", "unmountSuspended"].includes(f),
                ref: t.useCallback((e) => {
                  (e && (s.current = getComputedStyle(e)), c(e));
                }, []),
              }
            );
          })(s),
          f =
            "function" == typeof l
              ? l({ present: d.isPresent })
              : t.Children.only(l),
          p = (0, r.useComposedRefs)(
            d.ref,
            ((a = f),
            (c =
              (u = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) &&
              "isReactWarning" in u &&
              u.isReactWarning)
              ? a.ref
              : (c =
                    (u = Object.getOwnPropertyDescriptor(a, "ref")?.get) &&
                    "isReactWarning" in u &&
                    u.isReactWarning)
                ? a.props.ref
                : a.props.ref || a.ref),
          );
        return "function" == typeof l || d.isPresent
          ? t.cloneElement(f, { ref: p })
          : null;
      };
    function i(e) {
      return e?.animationName || "none";
    }
    ((a.displayName = "Presence"), e.s(["Presence", () => a]));
  },
  824627,
  (e) => {
    "use strict";
    var t = function () {
      return (t = Object.assign).apply(this, arguments);
    };
    function n(e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          0 > t.indexOf(r) &&
          (n[r] = e[r]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols)
        for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
          0 > t.indexOf(r[o]) &&
            Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
            (n[r[o]] = e[r[o]]);
      return n;
    }
    function r(e, t, n, r) {
      var o,
        a = arguments.length,
        i =
          a < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, n, r);
      else
        for (var u = e.length - 1; u >= 0; u--)
          (o = e[u]) &&
            (i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i);
      return (a > 3 && i && Object.defineProperty(t, n, i), i);
    }
    function o(e, t, n, r) {
      return new (n || (n = Promise))(function (o, a) {
        function i(e) {
          try {
            c(r.next(e));
          } catch (e) {
            a(e);
          }
        }
        function u(e) {
          try {
            c(r.throw(e));
          } catch (e) {
            a(e);
          }
        }
        function c(e) {
          var t;
          e.done
            ? o(e.value)
            : ((t = e.value) instanceof n
                ? t
                : new n(function (e) {
                    e(t);
                  })
              ).then(i, u);
        }
        c((r = r.apply(e, t || [])).next());
      });
    }
    function a(e, t) {
      var n,
        r,
        o,
        a = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        },
        i = Object.create(
          ("function" == typeof Iterator ? Iterator : Object).prototype,
        );
      return (
        (i.next = u(0)),
        (i.throw = u(1)),
        (i.return = u(2)),
        "function" == typeof Symbol &&
          (i[Symbol.iterator] = function () {
            return this;
          }),
        i
      );
      function u(u) {
        return function (c) {
          var s = [u, c];
          if (n) throw TypeError("Generator is already executing.");
          for (; i && ((i = 0), s[0] && (a = 0)), a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & s[0]
                      ? r.return
                      : s[0]
                        ? r.throw || ((o = r.return) && o.call(r), 0)
                        : r.next) &&
                  !(o = o.call(r, s[1])).done)
              )
                return o;
              switch (((r = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                case 0:
                case 1:
                  o = s;
                  break;
                case 4:
                  return (a.label++, { value: s[1], done: !1 });
                case 5:
                  (a.label++, (r = s[1]), (s = [0]));
                  continue;
                case 7:
                  ((s = a.ops.pop()), a.trys.pop());
                  continue;
                default:
                  if (
                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                    (6 === s[0] || 2 === s[0])
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                    a.label = s[1];
                    break;
                  }
                  if (6 === s[0] && a.label < o[1]) {
                    ((a.label = o[1]), (o = s));
                    break;
                  }
                  if (o && a.label < o[2]) {
                    ((a.label = o[2]), a.ops.push(s));
                    break;
                  }
                  (o[2] && a.ops.pop(), a.trys.pop());
                  continue;
              }
              s = t.call(e, a);
            } catch (e) {
              ((s = [6, e]), (r = 0));
            } finally {
              n = o = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        };
      }
    }
    function i(e, t, n) {
      if (n || 2 == arguments.length)
        for (var r, o = 0, a = t.length; o < a; o++)
          (!r && o in t) ||
            (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
      return e.concat(r || Array.prototype.slice.call(t));
    }
    ("function" == typeof SuppressedError && SuppressedError,
      e.s([
        "__assign",
        () => t,
        "__awaiter",
        () => o,
        "__decorate",
        () => r,
        "__generator",
        () => a,
        "__rest",
        () => n,
        "__spreadArray",
        () => i,
      ]));
  },
  992330,
  816370,
  906606,
  946382,
  769126,
  246359,
  494643,
  304606,
  (e) => {
    "use strict";
    var t,
      n = "right-scroll-bar-position",
      r = "width-before-scroll-bar",
      o = "with-scroll-bars-hidden",
      a = "--removed-body-scroll-bar-size";
    e.s(
      [
        "fullWidthClassName",
        () => r,
        "noScrollbarsClassName",
        () => o,
        "removedBarSizeVariable",
        () => a,
        "zeroRightClassName",
        () => n,
      ],
      992330,
    );
    var i = e.i(789783);
    function u(e, t) {
      return ("function" == typeof e ? e(t) : e && (e.current = t), e);
    }
    var c = "undefined" != typeof window ? i.useLayoutEffect : i.useEffect,
      s = new WeakMap();
    function l(e, t) {
      var n,
        r,
        o,
        a =
          ((n = t || null),
          (r = function (t) {
            return e.forEach(function (e) {
              return u(e, t);
            });
          }),
          ((o = (0, i.useState)(function () {
            return {
              value: n,
              callback: r,
              facade: {
                get current() {
                  return o.value;
                },
                set current(value) {
                  var e = o.value;
                  e !== value && ((o.value = value), o.callback(value, e));
                },
              },
            };
          })[0]).callback = r),
          o.facade);
      return (
        c(
          function () {
            var t = s.get(a);
            if (t) {
              var n = new Set(t),
                r = new Set(e),
                o = a.current;
              (n.forEach(function (e) {
                r.has(e) || u(e, null);
              }),
                r.forEach(function (e) {
                  n.has(e) || u(e, o);
                }));
            }
            s.set(a, e);
          },
          [e],
        ),
        a
      );
    }
    e.s(["useMergeRefs", () => l], 816370);
    var d = e.i(824627);
    function f(e) {
      return e;
    }
    function p(e) {
      void 0 === e && (e = {});
      var t,
        n,
        r,
        o =
          (void 0 === t && (t = f),
          (n = []),
          (r = !1),
          {
            read: function () {
              if (r)
                throw Error(
                  "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
                );
              return n.length ? n[n.length - 1] : null;
            },
            useMedium: function (e) {
              var o = t(e, r);
              return (
                n.push(o),
                function () {
                  n = n.filter(function (e) {
                    return e !== o;
                  });
                }
              );
            },
            assignSyncMedium: function (e) {
              for (r = !0; n.length; ) {
                var t = n;
                ((n = []), t.forEach(e));
              }
              n = {
                push: function (t) {
                  return e(t);
                },
                filter: function () {
                  return n;
                },
              };
            },
            assignMedium: function (e) {
              r = !0;
              var t = [];
              if (n.length) {
                var o = n;
                ((n = []), o.forEach(e), (t = n));
              }
              var a = function () {
                  var n = t;
                  ((t = []), n.forEach(e));
                },
                i = function () {
                  return Promise.resolve().then(a);
                };
              (i(),
                (n = {
                  push: function (e) {
                    (t.push(e), i());
                  },
                  filter: function (e) {
                    return ((t = t.filter(e)), n);
                  },
                }));
            },
          });
      return ((o.options = (0, d.__assign)({ async: !0, ssr: !1 }, e)), o);
    }
    e.s(["createSidecarMedium", () => p], 906606);
    var v = function (e) {
      var t = e.sideCar,
        n = (0, d.__rest)(e, ["sideCar"]);
      if (!t)
        throw Error(
          "Sidecar: please provide `sideCar` property to import the right car",
        );
      var r = t.read();
      if (!r) throw Error("Sidecar medium not found");
      return i.createElement(r, (0, d.__assign)({}, n));
    };
    function m(e, t) {
      return (e.useMedium(t), v);
    }
    ((v.isSideCarExport = !0), e.s(["exportSidecar", () => m], 946382));
    var h = function () {
        var e = 0,
          n = null;
        return {
          add: function (r) {
            if (
              0 == e &&
              (n = (function () {
                if (!document) return null;
                var e = document.createElement("style");
                e.type = "text/css";
                var n =
                  t ||
                  ("undefined" != typeof __webpack_nonce__
                    ? __webpack_nonce__
                    : void 0);
                return (n && e.setAttribute("nonce", n), e);
              })())
            ) {
              var o, a;
              ((o = n).styleSheet
                ? (o.styleSheet.cssText = r)
                : o.appendChild(document.createTextNode(r)),
                (a = n),
                (
                  document.head || document.getElementsByTagName("head")[0]
                ).appendChild(a));
            }
            e++;
          },
          remove: function () {
            --e ||
              !n ||
              (n.parentNode && n.parentNode.removeChild(n), (n = null));
          },
        };
      },
      y = function () {
        var e = h();
        return function (t, n) {
          i.useEffect(
            function () {
              return (
                e.add(t),
                function () {
                  e.remove();
                }
              );
            },
            [t && n],
          );
        };
      },
      g = function () {
        var e = y();
        return function (t) {
          return (e(t.styles, t.dynamic), null);
        };
      };
    (e.s(["styleSingleton", () => g], 769126), e.s([], 246359));
    var b = { left: 0, top: 0, right: 0, gap: 0 },
      E = function (e) {
        return parseInt(e || "", 10) || 0;
      },
      w = function (e) {
        var t = window.getComputedStyle(document.body),
          n = t["padding" === e ? "paddingLeft" : "marginLeft"],
          r = t["padding" === e ? "paddingTop" : "marginTop"],
          o = t["padding" === e ? "paddingRight" : "marginRight"];
        return [E(n), E(r), E(o)];
      },
      C = function (e) {
        if ((void 0 === e && (e = "margin"), "undefined" == typeof window))
          return b;
        var t = w(e),
          n = document.documentElement.clientWidth,
          r = window.innerWidth;
        return {
          left: t[0],
          top: t[1],
          right: t[2],
          gap: Math.max(0, r - n + t[2] - t[0]),
        };
      },
      S = g(),
      R = "data-scroll-locked",
      N = function (e, t, i, u) {
        var c = e.left,
          s = e.top,
          l = e.right,
          d = e.gap;
        return (
          void 0 === i && (i = "margin"),
          "\n  ."
            .concat(o, " {\n   overflow: hidden ")
            .concat(u, ";\n   padding-right: ")
            .concat(d, "px ")
            .concat(u, ";\n  }\n  body[")
            .concat(R, "] {\n    overflow: hidden ")
            .concat(u, ";\n    overscroll-behavior: contain;\n    ")
            .concat(
              [
                t && "position: relative ".concat(u, ";"),
                "margin" === i &&
                  "\n    padding-left: "
                    .concat(c, "px;\n    padding-top: ")
                    .concat(s, "px;\n    padding-right: ")
                    .concat(
                      l,
                      "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ",
                    )
                    .concat(d, "px ")
                    .concat(u, ";\n    "),
                "padding" === i &&
                  "padding-right: ".concat(d, "px ").concat(u, ";"),
              ]
                .filter(Boolean)
                .join(""),
              "\n  }\n  \n  .",
            )
            .concat(n, " {\n    right: ")
            .concat(d, "px ")
            .concat(u, ";\n  }\n  \n  .")
            .concat(r, " {\n    margin-right: ")
            .concat(d, "px ")
            .concat(u, ";\n  }\n  \n  .")
            .concat(n, " .")
            .concat(n, " {\n    right: 0 ")
            .concat(u, ";\n  }\n  \n  .")
            .concat(r, " .")
            .concat(r, " {\n    margin-right: 0 ")
            .concat(u, ";\n  }\n  \n  body[")
            .concat(R, "] {\n    ")
            .concat(a, ": ")
            .concat(d, "px;\n  }\n")
        );
      },
      L = function () {
        var e = parseInt(document.body.getAttribute(R) || "0", 10);
        return isFinite(e) ? e : 0;
      },
      P = function () {
        i.useEffect(function () {
          return (
            document.body.setAttribute(R, (L() + 1).toString()),
            function () {
              var e = L() - 1;
              e <= 0
                ? document.body.removeAttribute(R)
                : document.body.setAttribute(R, e.toString());
            }
          );
        }, []);
      },
      _ = function (e) {
        var t = e.noRelative,
          n = e.noImportant,
          r = e.gapMode,
          o = void 0 === r ? "margin" : r;
        P();
        var a = i.useMemo(
          function () {
            return C(o);
          },
          [o],
        );
        return i.createElement(S, {
          styles: N(a, !t, o, n ? "" : "!important"),
        });
      };
    (e.s(["RemoveScrollBar", () => _], 494643), e.s([], 304606));
  },
  645751,
  (e) => {
    "use strict";
    var t = new WeakMap(),
      n = new WeakMap(),
      r = {},
      o = 0,
      a = function (e) {
        return e && (e.host || a(e.parentNode));
      },
      i = function (e, i, u, c) {
        var s = (Array.isArray(e) ? e : [e])
          .map(function (e) {
            if (i.contains(e)) return e;
            var t = a(e);
            return t && i.contains(t)
              ? t
              : (console.error(
                  "aria-hidden",
                  e,
                  "in not contained inside",
                  i,
                  ". Doing nothing",
                ),
                null);
          })
          .filter(function (e) {
            return !!e;
          });
        r[u] || (r[u] = new WeakMap());
        var l = r[u],
          d = [],
          f = new Set(),
          p = new Set(s),
          v = function (e) {
            !e || f.has(e) || (f.add(e), v(e.parentNode));
          };
        s.forEach(v);
        var m = function (e) {
          !e ||
            p.has(e) ||
            Array.prototype.forEach.call(e.children, function (e) {
              if (f.has(e)) m(e);
              else
                try {
                  var r = e.getAttribute(c),
                    o = null !== r && "false" !== r,
                    a = (t.get(e) || 0) + 1,
                    i = (l.get(e) || 0) + 1;
                  (t.set(e, a),
                    l.set(e, i),
                    d.push(e),
                    1 === a && o && n.set(e, !0),
                    1 === i && e.setAttribute(u, "true"),
                    o || e.setAttribute(c, "true"));
                } catch (t) {
                  console.error("aria-hidden: cannot operate on ", e, t);
                }
            });
        };
        return (
          m(i),
          f.clear(),
          o++,
          function () {
            (d.forEach(function (e) {
              var r = t.get(e) - 1,
                o = l.get(e) - 1;
              (t.set(e, r),
                l.set(e, o),
                r || (n.has(e) || e.removeAttribute(c), n.delete(e)),
                o || e.removeAttribute(u));
            }),
              --o ||
                ((t = new WeakMap()),
                (t = new WeakMap()),
                (n = new WeakMap()),
                (r = {})));
          }
        );
      },
      u = function (e, t, n) {
        void 0 === n && (n = "data-aria-hidden");
        var r = Array.from(Array.isArray(e) ? e : [e]),
          o =
            t ||
            ("undefined" == typeof document
              ? null
              : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
        return o
          ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
            i(r, o, n, "aria-hidden"))
          : function () {
              return null;
            };
      };
    e.s(["hideOthers", () => u]);
  },
  889655,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(301224);
    function r(e, r) {
      let o = t.createContext(r);
      function a(e) {
        let { children: r, ...a } = e,
          i = t.useMemo(() => a, Object.values(a));
        return (0, n.jsx)(o.Provider, { value: i, children: r });
      }
      return (
        (a.displayName = e + "Provider"),
        [
          a,
          function (n) {
            let a = t.useContext(o);
            if (a) return a;
            if (void 0 !== r) return r;
            throw Error(`\`${n}\` must be used within \`${e}\``);
          },
        ]
      );
    }
    function o(e, r = []) {
      let a = [],
        i = () => {
          let n = a.map((e) => t.createContext(e));
          return function (r) {
            let o = r?.[e] || n;
            return t.useMemo(
              () => ({ [`__scope${e}`]: { ...r, [e]: o } }),
              [r, o],
            );
          };
        };
      return (
        (i.scopeName = e),
        [
          function (r, o) {
            let i = t.createContext(o),
              u = a.length;
            function c(r) {
              let { scope: o, children: a, ...c } = r,
                s = o?.[e][u] || i,
                l = t.useMemo(() => c, Object.values(c));
              return (0, n.jsx)(s.Provider, { value: l, children: a });
            }
            return (
              (a = [...a, o]),
              (c.displayName = r + "Provider"),
              [
                c,
                function (n, a) {
                  let c = a?.[e][u] || i,
                    s = t.useContext(c);
                  if (s) return s;
                  if (void 0 !== o) return o;
                  throw Error(`\`${n}\` must be used within \`${r}\``);
                },
              ]
            );
          },
          (function (...e) {
            let n = e[0];
            if (1 === e.length) return n;
            let r = () => {
              let r = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
              return function (e) {
                let o = r.reduce((t, { useScope: n, scopeName: r }) => {
                  let o = n(e)[`__scope${r}`];
                  return { ...t, ...o };
                }, {});
                return t.useMemo(() => ({ [`__scope${n.scopeName}`]: o }), [o]);
              };
            };
            return ((r.scopeName = n.scopeName), r);
          })(i, ...r),
        ]
      );
    }
    e.s(["createContext", () => r, "createContextScope", () => o]);
  },
  867645,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function n(e) {
      let n = t.useRef(e);
      return (
        t.useEffect(() => {
          n.current = e;
        }),
        t.useMemo(
          () =>
            (...e) =>
              n.current?.(...e),
          [],
        )
      );
    }
    e.s(["useCallbackRef", () => n]);
  },
  674180,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = globalThis?.document ? t.useLayoutEffect : () => {};
    e.s(["useLayoutEffect", () => n]);
  },
  45616,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function n(...e) {
      return (t) =>
        e.forEach((e) => {
          "function" == typeof e ? e(t) : null != e && (e.current = t);
        });
    }
    function r(...e) {
      return t.useCallback(n(...e), e);
    }
    e.s(["composeRefs", () => n, "useComposedRefs", () => r]);
  },
  436836,
  851279,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(546564),
      r = e.i(45616),
      o = e.i(301224),
      a = t.forwardRef((e, n) => {
        let { children: r, ...a } = e,
          u = t.Children.toArray(r),
          s = u.find(c);
        if (s) {
          let e = s.props.children,
            r = u.map((n) =>
              n !== s
                ? n
                : t.Children.count(e) > 1
                  ? t.Children.only(null)
                  : t.isValidElement(e)
                    ? e.props.children
                    : null,
            );
          return (0, o.jsx)(i, {
            ...a,
            ref: n,
            children: t.isValidElement(e) ? t.cloneElement(e, void 0, r) : null,
          });
        }
        return (0, o.jsx)(i, { ...a, ref: n, children: r });
      });
    a.displayName = "Slot";
    var i = t.forwardRef((e, n) => {
      let { children: o, ...a } = e;
      if (t.isValidElement(o)) {
        var i;
        let e,
          u,
          c =
            ((i = o),
            (u =
              (e = Object.getOwnPropertyDescriptor(i.props, "ref")?.get) &&
              "isReactWarning" in e &&
              e.isReactWarning)
              ? i.ref
              : (u =
                    (e = Object.getOwnPropertyDescriptor(i, "ref")?.get) &&
                    "isReactWarning" in e &&
                    e.isReactWarning)
                ? i.props.ref
                : i.props.ref || i.ref);
        return t.cloneElement(o, {
          ...(function (e, t) {
            let n = { ...t };
            for (let r in t) {
              let o = e[r],
                a = t[r];
              /^on[A-Z]/.test(r)
                ? o && a
                  ? (n[r] = (...e) => {
                      (a(...e), o(...e));
                    })
                  : o && (n[r] = o)
                : "style" === r
                  ? (n[r] = { ...o, ...a })
                  : "className" === r &&
                    (n[r] = [o, a].filter(Boolean).join(" "));
            }
            return { ...e, ...n };
          })(a, o.props),
          ref: n ? (0, r.composeRefs)(n, c) : c,
        });
      }
      return t.Children.count(o) > 1 ? t.Children.only(null) : null;
    });
    i.displayName = "SlotClone";
    var u = ({ children: e }) => (0, o.jsx)(o.Fragment, { children: e });
    function c(e) {
      return (
        t.isValidElement(e) &&
        (e.type === u ||
          ("function" == typeof e.type && "__v0_slottable" in e.type))
      );
    }
    e.s(["Slot", () => a], 851279);
    var s = [
      "a",
      "button",
      "div",
      "form",
      "h2",
      "h3",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "span",
      "svg",
      "ul",
    ].reduce((e, n) => {
      let r = t.forwardRef((e, t) => {
        let { asChild: r, ...i } = e,
          u = r ? a : n;
        return (
          "undefined" != typeof window && (window[Symbol.for("radix-ui")] = !0),
          (0, o.jsx)(u, { ...i, ref: t })
        );
      });
      return ((r.displayName = `Primitive.${n}`), { ...e, [n]: r });
    }, {});
    function l(e, t) {
      e && n.flushSync(() => e.dispatchEvent(t));
    }
    e.s(["Primitive", () => s, "dispatchDiscreteCustomEvent", () => l], 436836);
  },
  551150,
  (e) => {
    "use strict";
    function t(e, n, { checkForDefaultPrevented: r = !0 } = {}) {
      return function (t) {
        if ((e?.(t), !1 === r || !t.defaultPrevented)) return n?.(t);
      };
    }
    e.s(["composeEventHandlers", () => t]);
  },
  633439,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(867645);
    function r({ prop: e, defaultProp: r, onChange: o = () => {} }) {
      let [a, i] = (function ({ defaultProp: e, onChange: r }) {
          let o = t.useState(e),
            [a] = o,
            i = t.useRef(a),
            u = (0, n.useCallbackRef)(r);
          return (
            t.useEffect(() => {
              i.current !== a && (u(a), (i.current = a));
            }, [a, i, u]),
            o
          );
        })({ defaultProp: r, onChange: o }),
        u = void 0 !== e,
        c = u ? e : a,
        s = (0, n.useCallbackRef)(o);
      return [
        c,
        t.useCallback(
          (t) => {
            if (u) {
              let n = "function" == typeof t ? t(e) : t;
              n !== e && s(n);
            } else i(t);
          },
          [u, e, i, s],
        ),
      ];
    }
    e.s(["useControllableState", () => r]);
  },
  803040,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(674180),
      r = t["useId".toString()] || (() => void 0),
      o = 0;
    function a(e) {
      let [a, i] = t.useState(r());
      return (
        (0, n.useLayoutEffect)(() => {
          e || i((e) => e ?? String(o++));
        }, [e]),
        e || (a ? `radix-${a}` : "")
      );
    }
    e.s(["useId", () => a]);
  },
  659671,
  291239,
  (e) => {
    "use strict";
    var t,
      n = e.i(789783),
      r = e.i(551150),
      o = e.i(436836),
      a = e.i(45616),
      i = e.i(867645);
    function u(e, t = globalThis?.document) {
      let r = (0, i.useCallbackRef)(e);
      n.useEffect(() => {
        let e = (e) => {
          "Escape" === e.key && r(e);
        };
        return (
          t.addEventListener("keydown", e, { capture: !0 }),
          () => t.removeEventListener("keydown", e, { capture: !0 })
        );
      }, [r, t]);
    }
    e.s(["useEscapeKeydown", () => u], 291239);
    var c = e.i(301224),
      s = "dismissableLayer.update",
      l = n.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      d = n.forwardRef((e, d) => {
        let {
            disableOutsidePointerEvents: f = !1,
            onEscapeKeyDown: m,
            onPointerDownOutside: h,
            onFocusOutside: y,
            onInteractOutside: g,
            onDismiss: b,
            ...E
          } = e,
          w = n.useContext(l),
          [C, S] = n.useState(null),
          R = C?.ownerDocument ?? globalThis?.document,
          [, N] = n.useState({}),
          L = (0, a.useComposedRefs)(d, (e) => S(e)),
          P = Array.from(w.layers),
          [_] = [...w.layersWithOutsidePointerEventsDisabled].slice(-1),
          O = P.indexOf(_),
          x = C ? P.indexOf(C) : -1,
          T = w.layersWithOutsidePointerEventsDisabled.size > 0,
          k = x >= O,
          M = (function (e, t = globalThis?.document) {
            let r = (0, i.useCallbackRef)(e),
              o = n.useRef(!1),
              a = n.useRef(() => {});
            return (
              n.useEffect(() => {
                let e = (e) => {
                    if (e.target && !o.current) {
                      let n = function () {
                          v("dismissableLayer.pointerDownOutside", r, o, {
                            discrete: !0,
                          });
                        },
                        o = { originalEvent: e };
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", a.current),
                          (a.current = n),
                          t.addEventListener("click", a.current, { once: !0 }))
                        : n();
                    } else t.removeEventListener("click", a.current);
                    o.current = !1;
                  },
                  n = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(n),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", a.current));
                };
              }, [t, r]),
              { onPointerDownCapture: () => (o.current = !0) }
            );
          })((e) => {
            let t = e.target,
              n = [...w.branches].some((e) => e.contains(t));
            k && !n && (h?.(e), g?.(e), e.defaultPrevented || b?.());
          }, R),
          A = (function (e, t = globalThis?.document) {
            let r = (0, i.useCallbackRef)(e),
              o = n.useRef(!1);
            return (
              n.useEffect(() => {
                let e = (e) => {
                  e.target &&
                    !o.current &&
                    v(
                      "dismissableLayer.focusOutside",
                      r,
                      { originalEvent: e },
                      { discrete: !1 },
                    );
                };
                return (
                  t.addEventListener("focusin", e),
                  () => t.removeEventListener("focusin", e)
                );
              }, [t, r]),
              {
                onFocusCapture: () => (o.current = !0),
                onBlurCapture: () => (o.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...w.branches].some((e) => e.contains(t)) &&
              (y?.(e), g?.(e), e.defaultPrevented || b?.());
          }, R);
        return (
          u((e) => {
            x === w.layers.size - 1 &&
              (m?.(e), !e.defaultPrevented && b && (e.preventDefault(), b()));
          }, R),
          n.useEffect(() => {
            if (C)
              return (
                f &&
                  (0 === w.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = R.body.style.pointerEvents),
                    (R.body.style.pointerEvents = "none")),
                  w.layersWithOutsidePointerEventsDisabled.add(C)),
                w.layers.add(C),
                p(),
                () => {
                  f &&
                    1 === w.layersWithOutsidePointerEventsDisabled.size &&
                    (R.body.style.pointerEvents = t);
                }
              );
          }, [C, R, f, w]),
          n.useEffect(
            () => () => {
              C &&
                (w.layers.delete(C),
                w.layersWithOutsidePointerEventsDisabled.delete(C),
                p());
            },
            [C, w],
          ),
          n.useEffect(() => {
            let e = () => N({});
            return (
              document.addEventListener(s, e),
              () => document.removeEventListener(s, e)
            );
          }, []),
          (0, c.jsx)(o.Primitive.div, {
            ...E,
            ref: L,
            style: {
              pointerEvents: T ? (k ? "auto" : "none") : void 0,
              ...e.style,
            },
            onFocusCapture: (0, r.composeEventHandlers)(
              e.onFocusCapture,
              A.onFocusCapture,
            ),
            onBlurCapture: (0, r.composeEventHandlers)(
              e.onBlurCapture,
              A.onBlurCapture,
            ),
            onPointerDownCapture: (0, r.composeEventHandlers)(
              e.onPointerDownCapture,
              M.onPointerDownCapture,
            ),
          })
        );
      });
    d.displayName = "DismissableLayer";
    var f = n.forwardRef((e, t) => {
      let r = n.useContext(l),
        i = n.useRef(null),
        u = (0, a.useComposedRefs)(t, i);
      return (
        n.useEffect(() => {
          let e = i.current;
          if (e)
            return (
              r.branches.add(e),
              () => {
                r.branches.delete(e);
              }
            );
        }, [r.branches]),
        (0, c.jsx)(o.Primitive.div, { ...e, ref: u })
      );
    });
    function p() {
      let e = new CustomEvent(s);
      document.dispatchEvent(e);
    }
    function v(e, t, n, { discrete: r }) {
      let a = n.originalEvent.target,
        i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
      (t && a.addEventListener(e, t, { once: !0 }),
        r ? (0, o.dispatchDiscreteCustomEvent)(a, i) : a.dispatchEvent(i));
    }
    ((f.displayName = "DismissableLayerBranch"),
      e.s(
        [
          "Branch",
          () => f,
          "DismissableLayer",
          () => d,
          "DismissableLayerBranch",
          () => f,
          "Root",
          () => d,
        ],
        659671,
      ));
  },
  32885,
  (e) => {
    "use strict";
    let t;
    var n = e.i(789783),
      r = e.i(45616),
      o = e.i(436836),
      a = e.i(867645),
      i = e.i(301224),
      u = "focusScope.autoFocusOnMount",
      c = "focusScope.autoFocusOnUnmount",
      s = { bubbles: !1, cancelable: !0 },
      l = n.forwardRef((e, t) => {
        let {
            loop: l = !1,
            trapped: m = !1,
            onMountAutoFocus: h,
            onUnmountAutoFocus: y,
            ...g
          } = e,
          [b, E] = n.useState(null),
          w = (0, a.useCallbackRef)(h),
          C = (0, a.useCallbackRef)(y),
          S = n.useRef(null),
          R = (0, r.useComposedRefs)(t, (e) => E(e)),
          N = n.useRef({
            paused: !1,
            pause() {
              this.paused = !0;
            },
            resume() {
              this.paused = !1;
            },
          }).current;
        (n.useEffect(() => {
          if (m) {
            let e = function (e) {
                if (N.paused || !b) return;
                let t = e.target;
                b.contains(t) ? (S.current = t) : p(S.current, { select: !0 });
              },
              t = function (e) {
                if (N.paused || !b) return;
                let t = e.relatedTarget;
                null !== t && (b.contains(t) || p(S.current, { select: !0 }));
              };
            (document.addEventListener("focusin", e),
              document.addEventListener("focusout", t));
            let n = new MutationObserver(function (e) {
              if (document.activeElement === document.body)
                for (let t of e) t.removedNodes.length > 0 && p(b);
            });
            return (
              b && n.observe(b, { childList: !0, subtree: !0 }),
              () => {
                (document.removeEventListener("focusin", e),
                  document.removeEventListener("focusout", t),
                  n.disconnect());
              }
            );
          }
        }, [m, b, N.paused]),
          n.useEffect(() => {
            if (b) {
              v.add(N);
              let e = document.activeElement;
              if (!b.contains(e)) {
                let t = new CustomEvent(u, s);
                (b.addEventListener(u, w),
                  b.dispatchEvent(t),
                  t.defaultPrevented ||
                    ((function (e, { select: t = !1 } = {}) {
                      let n = document.activeElement;
                      for (let r of e)
                        if ((p(r, { select: t }), document.activeElement !== n))
                          return;
                    })(
                      d(b).filter((e) => "A" !== e.tagName),
                      { select: !0 },
                    ),
                    document.activeElement === e && p(b)));
              }
              return () => {
                (b.removeEventListener(u, w),
                  setTimeout(() => {
                    let t = new CustomEvent(c, s);
                    (b.addEventListener(c, C),
                      b.dispatchEvent(t),
                      t.defaultPrevented ||
                        p(e ?? document.body, { select: !0 }),
                      b.removeEventListener(c, C),
                      v.remove(N));
                  }, 0));
              };
            }
          }, [b, w, C, N]));
        let L = n.useCallback(
          (e) => {
            if ((!l && !m) || N.paused) return;
            let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
              n = document.activeElement;
            if (t && n) {
              var r;
              let t,
                o = e.currentTarget,
                [a, i] = [f((t = d((r = o))), r), f(t.reverse(), r)];
              a && i
                ? e.shiftKey || n !== i
                  ? e.shiftKey &&
                    n === a &&
                    (e.preventDefault(), l && p(i, { select: !0 }))
                  : (e.preventDefault(), l && p(a, { select: !0 }))
                : n === o && e.preventDefault();
            }
          },
          [l, m, N.paused],
        );
        return (0, i.jsx)(o.Primitive.div, {
          tabIndex: -1,
          ...g,
          ref: R,
          onKeyDown: L,
        });
      });
    function d(e) {
      let t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
          acceptNode: (e) => {
            let t = "INPUT" === e.tagName && "hidden" === e.type;
            return e.disabled || e.hidden || t
              ? NodeFilter.FILTER_SKIP
              : e.tabIndex >= 0
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
          },
        });
      for (; n.nextNode(); ) t.push(n.currentNode);
      return t;
    }
    function f(e, t) {
      for (let n of e)
        if (
          !(function (e, { upTo: t }) {
            if ("hidden" === getComputedStyle(e).visibility) return !0;
            for (; e && (void 0 === t || e !== t); ) {
              if ("none" === getComputedStyle(e).display) return !0;
              e = e.parentElement;
            }
            return !1;
          })(n, { upTo: t })
        )
          return n;
    }
    function p(e, { select: t = !1 } = {}) {
      if (e && e.focus) {
        var n;
        let r = document.activeElement;
        (e.focus({ preventScroll: !0 }),
          e !== r &&
            (n = e) instanceof HTMLInputElement &&
            "select" in n &&
            t &&
            e.select());
      }
    }
    l.displayName = "FocusScope";
    var v =
      ((t = []),
      {
        add(e) {
          let n = t[0];
          (e !== n && n?.pause(), (t = m(t, e)).unshift(e));
        },
        remove(e) {
          ((t = m(t, e)), t[0]?.resume());
        },
      });
    function m(e, t) {
      let n = [...e],
        r = n.indexOf(t);
      return (-1 !== r && n.splice(r, 1), n);
    }
    e.s(["FocusScope", () => l]);
  },
  391110,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(546564),
      r = e.i(436836),
      o = e.i(674180),
      a = e.i(301224),
      i = t.forwardRef((e, i) => {
        let { container: u, ...c } = e,
          [s, l] = t.useState(!1);
        (0, o.useLayoutEffect)(() => l(!0), []);
        let d = u || (s && globalThis?.document?.body);
        return d
          ? n.default.createPortal(
              (0, a.jsx)(r.Primitive.div, { ...c, ref: i }),
              d,
            )
          : null;
      });
    ((i.displayName = "Portal"), e.s(["Portal", () => i]));
  },
  973309,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = 0;
    function r() {
      t.useEffect(() => {
        let e = document.querySelectorAll("[data-radix-focus-guard]");
        return (
          document.body.insertAdjacentElement("afterbegin", e[0] ?? o()),
          document.body.insertAdjacentElement("beforeend", e[1] ?? o()),
          n++,
          () => {
            (1 === n &&
              document
                .querySelectorAll("[data-radix-focus-guard]")
                .forEach((e) => e.remove()),
              n--);
          }
        );
      }, []);
    }
    function o() {
      let e = document.createElement("span");
      return (
        e.setAttribute("data-radix-focus-guard", ""),
        (e.tabIndex = 0),
        (e.style.cssText =
          "outline: none; opacity: 0; position: fixed; pointer-events: none"),
        e
      );
    }
    e.s(["useFocusGuards", () => r]);
  },
  115479,
  (e) => {
    "use strict";
    var t = e.i(824627),
      n = e.i(789783),
      r = e.i(992330),
      o = e.i(816370),
      a = (0, e.i(906606).createSidecarMedium)(),
      i = function () {},
      u = n.forwardRef(function (e, r) {
        var u = n.useRef(null),
          c = n.useState({
            onScrollCapture: i,
            onWheelCapture: i,
            onTouchMoveCapture: i,
          }),
          s = c[0],
          l = c[1],
          d = e.forwardProps,
          f = e.children,
          p = e.className,
          v = e.removeScrollBar,
          m = e.enabled,
          h = e.shards,
          y = e.sideCar,
          g = e.noIsolation,
          b = e.inert,
          E = e.allowPinchZoom,
          w = e.as,
          C = e.gapMode,
          S = (0, t.__rest)(e, [
            "forwardProps",
            "children",
            "className",
            "removeScrollBar",
            "enabled",
            "shards",
            "sideCar",
            "noIsolation",
            "inert",
            "allowPinchZoom",
            "as",
            "gapMode",
          ]),
          R = (0, o.useMergeRefs)([u, r]),
          N = (0, t.__assign)((0, t.__assign)({}, S), s);
        return n.createElement(
          n.Fragment,
          null,
          m &&
            n.createElement(y, {
              sideCar: a,
              removeScrollBar: v,
              shards: h,
              noIsolation: g,
              inert: b,
              setCallbacks: l,
              allowPinchZoom: !!E,
              lockRef: u,
              gapMode: C,
            }),
          d
            ? n.cloneElement(
                n.Children.only(f),
                (0, t.__assign)((0, t.__assign)({}, N), { ref: R }),
              )
            : n.createElement(
                void 0 === w ? "div" : w,
                (0, t.__assign)({}, N, { className: p, ref: R }),
                f,
              ),
        );
      });
    ((u.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
      (u.classNames = {
        fullWidth: r.fullWidthClassName,
        zeroRight: r.zeroRightClassName,
      }));
    var c = e.i(946382);
    e.i(304606);
    var s = e.i(494643);
    e.i(246359);
    var l = e.i(769126),
      d = !1;
    if ("undefined" != typeof window)
      try {
        var f = Object.defineProperty({}, "passive", {
          get: function () {
            return ((d = !0), !0);
          },
        });
        (window.addEventListener("test", f, f),
          window.removeEventListener("test", f, f));
      } catch (e) {
        d = !1;
      }
    var p = !!d && { passive: !1 },
      v = function (e, t) {
        var n = window.getComputedStyle(e);
        return (
          "hidden" !== n[t] &&
          (n.overflowY !== n.overflowX ||
            "TEXTAREA" === e.tagName ||
            "visible" !== n[t])
        );
      },
      m = function (e, t) {
        var n = t.ownerDocument,
          r = t;
        do {
          if (
            ("undefined" != typeof ShadowRoot &&
              r instanceof ShadowRoot &&
              (r = r.host),
            h(e, r))
          ) {
            var o = y(e, r);
            if (o[1] > o[2]) return !0;
          }
          r = r.parentNode;
        } while (r && r !== n.body);
        return !1;
      },
      h = function (e, t) {
        return "v" === e ? v(t, "overflowY") : v(t, "overflowX");
      },
      y = function (e, t) {
        return "v" === e
          ? [t.scrollTop, t.scrollHeight, t.clientHeight]
          : [t.scrollLeft, t.scrollWidth, t.clientWidth];
      },
      g = function (e, t, n, r, o) {
        var a,
          i =
            ((a = window.getComputedStyle(t).direction),
            "h" === e && "rtl" === a ? -1 : 1),
          u = i * r,
          c = n.target,
          s = t.contains(c),
          l = !1,
          d = u > 0,
          f = 0,
          p = 0;
        do {
          var v = y(e, c),
            m = v[0],
            g = v[1] - v[2] - i * m;
          ((m || g) && h(e, c) && ((f += g), (p += m)),
            (c = c instanceof ShadowRoot ? c.host : c.parentNode));
        } while (
          (!s && c !== document.body) ||
          (s && (t.contains(c) || t === c))
        );
        return (
          d && ((o && 1 > Math.abs(f)) || (!o && u > f))
            ? (l = !0)
            : !d && ((o && 1 > Math.abs(p)) || (!o && -u > p)) && (l = !0),
          l
        );
      },
      b = function (e) {
        return "changedTouches" in e
          ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
          : [0, 0];
      },
      E = function (e) {
        return [e.deltaX, e.deltaY];
      },
      w = function (e) {
        return e && "current" in e ? e.current : e;
      },
      C = 0,
      S = [];
    let R = (0, c.exportSidecar)(a, function (e) {
      var r = n.useRef([]),
        o = n.useRef([0, 0]),
        a = n.useRef(),
        i = n.useState(C++)[0],
        u = n.useState(l.styleSingleton)[0],
        c = n.useRef(e);
      (n.useEffect(
        function () {
          c.current = e;
        },
        [e],
      ),
        n.useEffect(
          function () {
            if (e.inert) {
              document.body.classList.add("block-interactivity-".concat(i));
              var n = (0, t.__spreadArray)(
                [e.lockRef.current],
                (e.shards || []).map(w),
                !0,
              ).filter(Boolean);
              return (
                n.forEach(function (e) {
                  return e.classList.add("allow-interactivity-".concat(i));
                }),
                function () {
                  (document.body.classList.remove(
                    "block-interactivity-".concat(i),
                  ),
                    n.forEach(function (e) {
                      return e.classList.remove(
                        "allow-interactivity-".concat(i),
                      );
                    }));
                }
              );
            }
          },
          [e.inert, e.lockRef.current, e.shards],
        ));
      var d = n.useCallback(function (e, t) {
          if ("touches" in e && 2 === e.touches.length)
            return !c.current.allowPinchZoom;
          var n,
            r = b(e),
            i = o.current,
            u = "deltaX" in e ? e.deltaX : i[0] - r[0],
            s = "deltaY" in e ? e.deltaY : i[1] - r[1],
            l = e.target,
            d = Math.abs(u) > Math.abs(s) ? "h" : "v";
          if ("touches" in e && "h" === d && "range" === l.type) return !1;
          var f = m(d, l);
          if (!f) return !0;
          if ((f ? (n = d) : ((n = "v" === d ? "h" : "v"), (f = m(d, l))), !f))
            return !1;
          if (
            (!a.current && "changedTouches" in e && (u || s) && (a.current = n),
            !n)
          )
            return !0;
          var p = a.current || n;
          return g(p, t, e, "h" === p ? u : s, !0);
        }, []),
        f = n.useCallback(function (e) {
          if (S.length && S[S.length - 1] === u) {
            var t = "deltaY" in e ? E(e) : b(e),
              n = r.current.filter(function (n) {
                var r;
                return (
                  n.name === e.type &&
                  (n.target === e.target || e.target === n.shadowParent) &&
                  ((r = n.delta), r[0] === t[0] && r[1] === t[1])
                );
              })[0];
            if (n && n.should) {
              e.cancelable && e.preventDefault();
              return;
            }
            if (!n) {
              var o = (c.current.shards || [])
                .map(w)
                .filter(Boolean)
                .filter(function (t) {
                  return t.contains(e.target);
                });
              (o.length > 0 ? d(e, o[0]) : !c.current.noIsolation) &&
                e.cancelable &&
                e.preventDefault();
            }
          }
        }, []),
        v = n.useCallback(function (e, t, n, o) {
          var a = {
            name: e,
            delta: t,
            target: n,
            should: o,
            shadowParent: (function (e) {
              for (var t = null; null !== e; )
                (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
                  (e = e.parentNode));
              return t;
            })(n),
          };
          (r.current.push(a),
            setTimeout(function () {
              r.current = r.current.filter(function (e) {
                return e !== a;
              });
            }, 1));
        }, []),
        h = n.useCallback(function (e) {
          ((o.current = b(e)), (a.current = void 0));
        }, []),
        y = n.useCallback(function (t) {
          v(t.type, E(t), t.target, d(t, e.lockRef.current));
        }, []),
        R = n.useCallback(function (t) {
          v(t.type, b(t), t.target, d(t, e.lockRef.current));
        }, []);
      n.useEffect(function () {
        return (
          S.push(u),
          e.setCallbacks({
            onScrollCapture: y,
            onWheelCapture: y,
            onTouchMoveCapture: R,
          }),
          document.addEventListener("wheel", f, p),
          document.addEventListener("touchmove", f, p),
          document.addEventListener("touchstart", h, p),
          function () {
            ((S = S.filter(function (e) {
              return e !== u;
            })),
              document.removeEventListener("wheel", f, p),
              document.removeEventListener("touchmove", f, p),
              document.removeEventListener("touchstart", h, p));
          }
        );
      }, []);
      var N = e.removeScrollBar,
        L = e.inert;
      return n.createElement(
        n.Fragment,
        null,
        L
          ? n.createElement(u, {
              styles: "\n  .block-interactivity-"
                .concat(i, " {pointer-events: none;}\n  .allow-interactivity-")
                .concat(i, " {pointer-events: all;}\n"),
            })
          : null,
        N ? n.createElement(s.RemoveScrollBar, { gapMode: e.gapMode }) : null,
      );
    });
    var N = n.forwardRef(function (e, r) {
      return n.createElement(u, (0, t.__assign)({}, e, { ref: r, sideCar: R }));
    });
    ((N.classNames = u.classNames), e.s(["RemoveScroll", 0, N], 115479));
  },
]);
