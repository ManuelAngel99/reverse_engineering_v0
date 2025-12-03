(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  899002,
  (e) => {
    "use strict";
    function t() {
      return (t = Object.assign.bind()).apply(null, arguments);
    }
    e.s(["default", () => t]);
  },
  504015,
  987176,
  790456,
  (e) => {
    "use strict";
    var t = e.i(899002),
      n = e.i(789783),
      r = e.i(546564);
    function o(...e) {
      return (t) =>
        e.forEach((e) => {
          "function" == typeof e ? e(t) : null != e && (e.current = t);
        });
    }
    function l(...e) {
      return (0, n.useCallback)(o(...e), e);
    }
    e.s(["composeRefs", () => o, "useComposedRefs", () => l], 987176);
    let i = (0, n.forwardRef)((e, r) => {
      let { children: o, ...l } = e,
        i = n.Children.toArray(o),
        s = i.find(u);
      if (s) {
        let e = s.props.children,
          o = i.map((t) =>
            t !== s
              ? t
              : n.Children.count(e) > 1
                ? n.Children.only(null)
                : (0, n.isValidElement)(e)
                  ? e.props.children
                  : null,
          );
        return (0, n.createElement)(
          a,
          (0, t.default)({}, l, { ref: r }),
          (0, n.isValidElement)(e) ? (0, n.cloneElement)(e, void 0, o) : null,
        );
      }
      return (0, n.createElement)(a, (0, t.default)({}, l, { ref: r }), o);
    });
    i.displayName = "Slot";
    let a = (0, n.forwardRef)((e, t) => {
      let { children: r, ...l } = e;
      if ((0, n.isValidElement)(r)) {
        let e = r.props.ref ?? r.ref;
        return (0, n.cloneElement)(r, {
          ...(function (e, t) {
            let n = { ...t };
            for (let r in t) {
              let o = e[r],
                l = t[r];
              /^on[A-Z]/.test(r)
                ? o && l
                  ? (n[r] = (...e) => {
                      (l(...e), o(...e));
                    })
                  : o && (n[r] = o)
                : "style" === r
                  ? (n[r] = { ...o, ...l })
                  : "className" === r &&
                    (n[r] = [o, l].filter(Boolean).join(" "));
            }
            return { ...e, ...n };
          })(l, r.props),
          ref: t ? o(t, e) : e,
        });
      }
      return n.Children.count(r) > 1 ? n.Children.only(null) : null;
    });
    a.displayName = "SlotClone";
    let s = ({ children: e }) => (0, n.createElement)(n.Fragment, null, e);
    function u(e) {
      return (
        (0, n.isValidElement)(e) &&
        (e.type === s ||
          ("function" == typeof e.type && "__v0_slottable" in e.type))
      );
    }
    e.s(["Slot", () => i], 790456);
    let c = [
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
    ].reduce((e, r) => {
      let o = (0, n.forwardRef)((e, o) => {
        let { asChild: l, ...a } = e,
          s = l ? i : r;
        return (
          (0, n.useEffect)(() => {
            window[Symbol.for("radix-ui")] = !0;
          }, []),
          (0, n.createElement)(s, (0, t.default)({}, a, { ref: o }))
        );
      });
      return ((o.displayName = `Primitive.${r}`), { ...e, [r]: o });
    }, {});
    function d(e, t) {
      e && (0, r.flushSync)(() => e.dispatchEvent(t));
    }
    e.s(["Primitive", () => c, "dispatchDiscreteCustomEvent", () => d], 504015);
  },
  31217,
  (e) => {
    "use strict";
    function t() {
      return (t = Object.assign.bind()).apply(this, arguments);
    }
    e.s(["default", () => t]);
  },
  719271,
  633182,
  (e) => {
    "use strict";
    function t(e, n, { checkForDefaultPrevented: r = !0 } = {}) {
      return function (t) {
        if ((null == e || e(t), !1 === r || !t.defaultPrevented))
          return null == n ? void 0 : n(t);
      };
    }
    e.s(["composeEventHandlers", () => t], 719271);
    var n = e.i(789783);
    function r(e, t = []) {
      let o = [],
        l = () => {
          let t = o.map((e) => (0, n.createContext)(e));
          return function (r) {
            let o = (null == r ? void 0 : r[e]) || t;
            return (0, n.useMemo)(
              () => ({ [`__scope${e}`]: { ...r, [e]: o } }),
              [r, o],
            );
          };
        };
      return (
        (l.scopeName = e),
        [
          function (t, r) {
            let l = (0, n.createContext)(r),
              i = o.length;
            function a(t) {
              let { scope: r, children: o, ...a } = t,
                s = (null == r ? void 0 : r[e][i]) || l,
                u = (0, n.useMemo)(() => a, Object.values(a));
              return (0, n.createElement)(s.Provider, { value: u }, o);
            }
            return (
              (o = [...o, r]),
              (a.displayName = t + "Provider"),
              [
                a,
                function (o, a) {
                  let s = (null == a ? void 0 : a[e][i]) || l,
                    u = (0, n.useContext)(s);
                  if (u) return u;
                  if (void 0 !== r) return r;
                  throw Error(`\`${o}\` must be used within \`${t}\``);
                },
              ]
            );
          },
          (function (...e) {
            let t = e[0];
            if (1 === e.length) return t;
            let r = () => {
              let r = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
              return function (e) {
                let o = r.reduce((t, { useScope: n, scopeName: r }) => {
                  let o = n(e)[`__scope${r}`];
                  return { ...t, ...o };
                }, {});
                return (0, n.useMemo)(
                  () => ({ [`__scope${t.scopeName}`]: o }),
                  [o],
                );
              };
            };
            return ((r.scopeName = t.scopeName), r);
          })(l, ...t),
        ]
      );
    }
    e.s(["createContextScope", () => r], 633182);
  },
  753011,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function n(e) {
      let n = (0, t.useRef)(e);
      return (
        (0, t.useEffect)(() => {
          n.current = e;
        }),
        (0, t.useMemo)(
          () =>
            (...e) => {
              var t;
              return null == (t = n.current) ? void 0 : t.call(n, ...e);
            },
          [],
        )
      );
    }
    e.s(["useCallbackRef", () => n]);
  },
  28924,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(753011);
    function r({ prop: e, defaultProp: r, onChange: o = () => {} }) {
      let [l, i] = (function ({ defaultProp: e, onChange: r }) {
          let o = (0, t.useState)(e),
            [l] = o,
            i = (0, t.useRef)(l),
            a = (0, n.useCallbackRef)(r);
          return (
            (0, t.useEffect)(() => {
              i.current !== l && (a(l), (i.current = l));
            }, [l, i, a]),
            o
          );
        })({ defaultProp: r, onChange: o }),
        a = void 0 !== e,
        s = a ? e : l,
        u = (0, n.useCallbackRef)(o);
      return [
        s,
        (0, t.useCallback)(
          (t) => {
            if (a) {
              let n = "function" == typeof t ? t(e) : t;
              n !== e && u(n);
            } else i(t);
          },
          [a, e, i, u],
        ),
      ];
    }
    e.s(["useControllableState", () => r]);
  },
  729094,
  (e) => {
    "use strict";
    var t = e.i(789783);
    let n = (null == globalThis ? void 0 : globalThis.document)
      ? t.useLayoutEffect
      : () => {};
    e.s(["useLayoutEffect", () => n]);
  },
  713416,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(546564),
      r = e.i(987176),
      o = e.i(729094);
    let l = (e) => {
      let { present: l, children: a } = e,
        s = (function (e) {
          var r, l;
          let [a, s] = (0, t.useState)(),
            u = (0, t.useRef)({}),
            c = (0, t.useRef)(e),
            d = (0, t.useRef)("none"),
            [f, p] =
              ((r = e ? "mounted" : "unmounted"),
              (l = {
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
              (0, t.useReducer)((e, t) => {
                let n = l[e][t];
                return null != n ? n : e;
              }, r));
          return (
            (0, t.useEffect)(() => {
              let e = i(u.current);
              d.current = "mounted" === f ? e : "none";
            }, [f]),
            (0, o.useLayoutEffect)(() => {
              let t = u.current,
                n = c.current;
              if (n !== e) {
                let r = d.current,
                  o = i(t);
                (e
                  ? p("MOUNT")
                  : "none" === o || (null == t ? void 0 : t.display) === "none"
                    ? p("UNMOUNT")
                    : n && r !== o
                      ? p("ANIMATION_OUT")
                      : p("UNMOUNT"),
                  (c.current = e));
              }
            }, [e, p]),
            (0, o.useLayoutEffect)(() => {
              if (a) {
                let e = (e) => {
                    let t = i(u.current).includes(e.animationName);
                    e.target === a &&
                      t &&
                      (0, n.flushSync)(() => p("ANIMATION_END"));
                  },
                  t = (e) => {
                    e.target === a && (d.current = i(u.current));
                  };
                return (
                  a.addEventListener("animationstart", t),
                  a.addEventListener("animationcancel", e),
                  a.addEventListener("animationend", e),
                  () => {
                    (a.removeEventListener("animationstart", t),
                      a.removeEventListener("animationcancel", e),
                      a.removeEventListener("animationend", e));
                  }
                );
              }
              p("ANIMATION_END");
            }, [a, p]),
            {
              isPresent: ["mounted", "unmountSuspended"].includes(f),
              ref: (0, t.useCallback)((e) => {
                (e && (u.current = getComputedStyle(e)), s(e));
              }, []),
            }
          );
        })(l),
        u =
          "function" == typeof a
            ? a({ present: s.isPresent })
            : t.Children.only(a),
        c = (0, r.useComposedRefs)(s.ref, u.ref);
      return "function" == typeof a || s.isPresent
        ? (0, t.cloneElement)(u, { ref: c })
        : null;
    };
    function i(e) {
      return (null == e ? void 0 : e.animationName) || "none";
    }
    ((l.displayName = "Presence"), e.s(["Presence", () => l]));
  },
  835098,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(633182),
      r = e.i(987176),
      o = e.i(790456);
    function l(e) {
      let l = e + "CollectionProvider",
        [i, a] = (0, n.createContextScope)(l),
        [s, u] = i(l, { collectionRef: { current: null }, itemMap: new Map() }),
        c = e + "CollectionSlot",
        d = t.default.forwardRef((e, n) => {
          let { scope: l, children: i } = e,
            a = u(c, l),
            s = (0, r.useComposedRefs)(n, a.collectionRef);
          return t.default.createElement(o.Slot, { ref: s }, i);
        }),
        f = e + "CollectionItemSlot",
        p = "data-radix-collection-item";
      return [
        {
          Provider: (e) => {
            let { scope: n, children: r } = e,
              o = t.default.useRef(null),
              l = t.default.useRef(new Map()).current;
            return t.default.createElement(
              s,
              { scope: n, itemMap: l, collectionRef: o },
              r,
            );
          },
          Slot: d,
          ItemSlot: t.default.forwardRef((e, n) => {
            let { scope: l, children: i, ...a } = e,
              s = t.default.useRef(null),
              c = (0, r.useComposedRefs)(n, s),
              d = u(f, l);
            return (
              t.default.useEffect(
                () => (
                  d.itemMap.set(s, { ref: s, ...a }),
                  () => void d.itemMap.delete(s)
                ),
              ),
              t.default.createElement(o.Slot, { [p]: "", ref: c }, i)
            );
          }),
        },
        function (n) {
          let r = u(e + "CollectionConsumer", n);
          return t.default.useCallback(() => {
            let e = r.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${p}]`));
            return Array.from(r.itemMap.values()).sort(
              (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
            );
          }, [r.collectionRef, r.itemMap]);
        },
        a,
      ];
    }
    e.s(["createCollection", () => l]);
  },
  130344,
  (e) => {
    "use strict";
    var t = e.i(789783),
      n = e.i(753011);
    function r(e, o = null == globalThis ? void 0 : globalThis.document) {
      let l = (0, n.useCallbackRef)(e);
      (0, t.useEffect)(() => {
        let e = (e) => {
          "Escape" === e.key && l(e);
        };
        return (
          o.addEventListener("keydown", e),
          () => o.removeEventListener("keydown", e)
        );
      }, [l, o]);
    }
    e.s(["useEscapeKeydown", () => r]);
  },
  784938,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("X", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]);
    e.s(["default", () => t]);
  },
  949002,
  (e) => {
    "use strict";
    var t = e.i(784938);
    e.s(["X", () => t.default]);
  },
  266114,
  (e) => {
    "use strict";
    let t;
    var n = e.i(31217),
      r = e.i(789783),
      o = e.i(546564),
      l = e.i(719271),
      i = e.i(987176),
      a = e.i(835098),
      s = e.i(633182),
      u = e.i(899002),
      c = e.i(504015),
      d = e.i(753011),
      f = e.i(130344);
    let p = "dismissableLayer.update",
      m = (0, r.createContext)({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      v = (0, r.forwardRef)((e, n) => {
        var o;
        let {
            disableOutsidePointerEvents: a = !1,
            onEscapeKeyDown: s,
            onPointerDownOutside: v,
            onFocusOutside: E,
            onInteractOutside: T,
            onDismiss: b,
            ...h
          } = e,
          C = (0, r.useContext)(m),
          [g, R] = (0, r.useState)(null),
          P =
            null != (o = null == g ? void 0 : g.ownerDocument)
              ? o
              : null == globalThis
                ? void 0
                : globalThis.document,
          [, x] = (0, r.useState)({}),
          S = (0, i.useComposedRefs)(n, (e) => R(e)),
          D = Array.from(C.layers),
          [L] = [...C.layersWithOutsidePointerEventsDisabled].slice(-1),
          N = D.indexOf(L),
          k = g ? D.indexOf(g) : -1,
          O = C.layersWithOutsidePointerEventsDisabled.size > 0,
          M = k >= N,
          _ = (function (
            e,
            t = null == globalThis ? void 0 : globalThis.document,
          ) {
            let n = (0, d.useCallbackRef)(e),
              o = (0, r.useRef)(!1),
              l = (0, r.useRef)(() => {});
            return (
              (0, r.useEffect)(() => {
                let e = (e) => {
                    if (e.target && !o.current) {
                      let o = { originalEvent: e };
                      function r() {
                        y("dismissableLayer.pointerDownOutside", n, o, {
                          discrete: !0,
                        });
                      }
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", l.current),
                          (l.current = r),
                          t.addEventListener("click", l.current, { once: !0 }))
                        : r();
                    }
                    o.current = !1;
                  },
                  r = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(r),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", l.current));
                };
              }, [t, n]),
              { onPointerDownCapture: () => (o.current = !0) }
            );
          })((e) => {
            let t = e.target,
              n = [...C.branches].some((e) => e.contains(t));
            M &&
              !n &&
              (null == v || v(e),
              null == T || T(e),
              e.defaultPrevented || null == b || b());
          }, P),
          A = (function (
            e,
            t = null == globalThis ? void 0 : globalThis.document,
          ) {
            let n = (0, d.useCallbackRef)(e),
              o = (0, r.useRef)(!1);
            return (
              (0, r.useEffect)(() => {
                let e = (e) => {
                  e.target &&
                    !o.current &&
                    y(
                      "dismissableLayer.focusOutside",
                      n,
                      { originalEvent: e },
                      { discrete: !1 },
                    );
                };
                return (
                  t.addEventListener("focusin", e),
                  () => t.removeEventListener("focusin", e)
                );
              }, [t, n]),
              {
                onFocusCapture: () => (o.current = !0),
                onBlurCapture: () => (o.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...C.branches].some((e) => e.contains(t)) &&
              (null == E || E(e),
              null == T || T(e),
              e.defaultPrevented || null == b || b());
          }, P);
        return (
          (0, f.useEscapeKeydown)((e) => {
            k === C.layers.size - 1 &&
              (null == s || s(e),
              !e.defaultPrevented && b && (e.preventDefault(), b()));
          }, P),
          (0, r.useEffect)(() => {
            if (g)
              return (
                a &&
                  (0 === C.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = P.body.style.pointerEvents),
                    (P.body.style.pointerEvents = "none")),
                  C.layersWithOutsidePointerEventsDisabled.add(g)),
                C.layers.add(g),
                w(),
                () => {
                  a &&
                    1 === C.layersWithOutsidePointerEventsDisabled.size &&
                    (P.body.style.pointerEvents = t);
                }
              );
          }, [g, P, a, C]),
          (0, r.useEffect)(
            () => () => {
              g &&
                (C.layers.delete(g),
                C.layersWithOutsidePointerEventsDisabled.delete(g),
                w());
            },
            [g, C],
          ),
          (0, r.useEffect)(() => {
            let e = () => x({});
            return (
              document.addEventListener(p, e),
              () => document.removeEventListener(p, e)
            );
          }, []),
          (0, r.createElement)(
            c.Primitive.div,
            (0, u.default)({}, h, {
              ref: S,
              style: {
                pointerEvents: O ? (M ? "auto" : "none") : void 0,
                ...e.style,
              },
              onFocusCapture: (0, l.composeEventHandlers)(
                e.onFocusCapture,
                A.onFocusCapture,
              ),
              onBlurCapture: (0, l.composeEventHandlers)(
                e.onBlurCapture,
                A.onBlurCapture,
              ),
              onPointerDownCapture: (0, l.composeEventHandlers)(
                e.onPointerDownCapture,
                _.onPointerDownCapture,
              ),
            }),
          )
        );
      }),
      E = (0, r.forwardRef)((e, t) => {
        let n = (0, r.useContext)(m),
          o = (0, r.useRef)(null),
          l = (0, i.useComposedRefs)(t, o);
        return (
          (0, r.useEffect)(() => {
            let e = o.current;
            if (e)
              return (
                n.branches.add(e),
                () => {
                  n.branches.delete(e);
                }
              );
          }, [n.branches]),
          (0, r.createElement)(
            c.Primitive.div,
            (0, u.default)({}, e, { ref: l }),
          )
        );
      });
    function w() {
      let e = new CustomEvent(p);
      document.dispatchEvent(e);
    }
    function y(e, t, n, { discrete: r }) {
      let o = n.originalEvent.target,
        l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
      (t && o.addEventListener(e, t, { once: !0 }),
        r ? (0, c.dispatchDiscreteCustomEvent)(o, l) : o.dispatchEvent(l));
    }
    let T = (0, r.forwardRef)((e, t) => {
      var n;
      let {
        container: l = null == globalThis || null == (n = globalThis.document)
          ? void 0
          : n.body,
        ...i
      } = e;
      return l
        ? o.default.createPortal(
            (0, r.createElement)(
              c.Primitive.div,
              (0, u.default)({}, i, { ref: t }),
            ),
            l,
          )
        : null;
    });
    var b = e.i(713416),
      h = e.i(28924),
      C = e.i(729094);
    let g = (0, r.forwardRef)((e, t) =>
        (0, r.createElement)(
          c.Primitive.span,
          (0, u.default)({}, e, {
            ref: t,
            style: {
              position: "absolute",
              border: 0,
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              wordWrap: "normal",
              ...e.style,
            },
          }),
        ),
      ),
      R = "ToastProvider",
      [P, x, S] = (0, a.createCollection)("Toast"),
      [D, L] = (0, s.createContextScope)("Toast", [S]),
      [N, k] = D(R),
      O = (e) => {
        let {
            __scopeToast: t,
            label: n = "Notification",
            duration: o = 5e3,
            swipeDirection: l = "right",
            swipeThreshold: i = 50,
            children: a,
          } = e,
          [s, u] = (0, r.useState)(null),
          [c, d] = (0, r.useState)(0),
          f = (0, r.useRef)(!1),
          p = (0, r.useRef)(!1);
        return (0, r.createElement)(
          P.Provider,
          { scope: t },
          (0, r.createElement)(
            N,
            {
              scope: t,
              label: n,
              duration: o,
              swipeDirection: l,
              swipeThreshold: i,
              toastCount: c,
              viewport: s,
              onViewportChange: u,
              onToastAdd: (0, r.useCallback)(() => d((e) => e + 1), []),
              onToastRemove: (0, r.useCallback)(() => d((e) => e - 1), []),
              isFocusedToastEscapeKeyDownRef: f,
              isClosePausedRef: p,
            },
            a,
          ),
        );
      };
    O.propTypes = {
      label: (e) =>
        e.label && "string" == typeof e.label && !e.label.trim()
          ? Error(
              `Invalid prop \`label\` supplied to \`${R}\`. Expected non-empty \`string\`.`,
            )
          : null,
    };
    let M = ["F8"],
      _ = "toast.viewportPause",
      A = "toast.viewportResume",
      F = (0, r.forwardRef)((e, t) => {
        let {
            __scopeToast: o,
            hotkey: l = M,
            label: a = "Notifications ({hotkey})",
            ...s
          } = e,
          u = k("ToastViewport", o),
          d = x(o),
          f = (0, r.useRef)(null),
          p = (0, r.useRef)(null),
          m = (0, r.useRef)(null),
          v = (0, r.useRef)(null),
          w = (0, i.useComposedRefs)(t, v, u.onViewportChange),
          y = l.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
          T = u.toastCount > 0;
        ((0, r.useEffect)(() => {
          let e = (e) => {
            var t;
            l.every((t) => e[t] || e.code === t) &&
              (null == (t = v.current) || t.focus());
          };
          return (
            document.addEventListener("keydown", e),
            () => document.removeEventListener("keydown", e)
          );
        }, [l]),
          (0, r.useEffect)(() => {
            let e = f.current,
              t = v.current;
            if (T && e && t) {
              let n = () => {
                  if (!u.isClosePausedRef.current) {
                    let e = new CustomEvent(_);
                    (t.dispatchEvent(e), (u.isClosePausedRef.current = !0));
                  }
                },
                r = () => {
                  if (u.isClosePausedRef.current) {
                    let e = new CustomEvent(A);
                    (t.dispatchEvent(e), (u.isClosePausedRef.current = !1));
                  }
                },
                o = (t) => {
                  e.contains(t.relatedTarget) || r();
                },
                l = () => {
                  e.contains(document.activeElement) || r();
                };
              return (
                e.addEventListener("focusin", n),
                e.addEventListener("focusout", o),
                e.addEventListener("pointermove", n),
                e.addEventListener("pointerleave", l),
                window.addEventListener("blur", n),
                window.addEventListener("focus", r),
                () => {
                  (e.removeEventListener("focusin", n),
                    e.removeEventListener("focusout", o),
                    e.removeEventListener("pointermove", n),
                    e.removeEventListener("pointerleave", l),
                    window.removeEventListener("blur", n),
                    window.removeEventListener("focus", r));
                }
              );
            }
          }, [T, u.isClosePausedRef]));
        let b = (0, r.useCallback)(
          ({ tabbingDirection: e }) => {
            let t = d().map((t) => {
              let n = t.ref.current,
                r = [
                  n,
                  ...(function (e) {
                    let t = [],
                      n = document.createTreeWalker(
                        e,
                        NodeFilter.SHOW_ELEMENT,
                        {
                          acceptNode: (e) => {
                            let t =
                              "INPUT" === e.tagName && "hidden" === e.type;
                            return e.disabled || e.hidden || t
                              ? NodeFilter.FILTER_SKIP
                              : e.tabIndex >= 0
                                ? NodeFilter.FILTER_ACCEPT
                                : NodeFilter.FILTER_SKIP;
                          },
                        },
                      );
                    for (; n.nextNode(); ) t.push(n.currentNode);
                    return t;
                  })(n),
                ];
              return "forwards" === e ? r : r.reverse();
            });
            return ("forwards" === e ? t.reverse() : t).flat();
          },
          [d],
        );
        return (
          (0, r.useEffect)(() => {
            let e = v.current;
            if (e) {
              let t = (t) => {
                let n = t.altKey || t.ctrlKey || t.metaKey;
                if ("Tab" === t.key && !n) {
                  var r, o, l;
                  let n = document.activeElement,
                    i = t.shiftKey;
                  if (t.target === e && i) {
                    null == (r = p.current) || r.focus();
                    return;
                  }
                  let a = b({ tabbingDirection: i ? "backwards" : "forwards" }),
                    s = a.findIndex((e) => e === n);
                  G(a.slice(s + 1))
                    ? t.preventDefault()
                    : i
                      ? null == (o = p.current) || o.focus()
                      : null == (l = m.current) || l.focus();
                }
              };
              return (
                e.addEventListener("keydown", t),
                () => e.removeEventListener("keydown", t)
              );
            }
          }, [d, b]),
          (0, r.createElement)(
            E,
            {
              ref: f,
              role: "region",
              "aria-label": a.replace("{hotkey}", y),
              tabIndex: -1,
              style: { pointerEvents: T ? void 0 : "none" },
            },
            T &&
              (0, r.createElement)(I, {
                ref: p,
                onFocusFromOutsideViewport: () => {
                  G(b({ tabbingDirection: "forwards" }));
                },
              }),
            (0, r.createElement)(
              P.Slot,
              { scope: o },
              (0, r.createElement)(
                c.Primitive.ol,
                (0, n.default)({ tabIndex: -1 }, s, { ref: w }),
              ),
            ),
            T &&
              (0, r.createElement)(I, {
                ref: m,
                onFocusFromOutsideViewport: () => {
                  G(b({ tabbingDirection: "backwards" }));
                },
              }),
          )
        );
      }),
      I = (0, r.forwardRef)((e, t) => {
        let { __scopeToast: o, onFocusFromOutsideViewport: l, ...i } = e,
          a = k("ToastFocusProxy", o);
        return (0, r.createElement)(
          g,
          (0, n.default)({ "aria-hidden": !0, tabIndex: 0 }, i, {
            ref: t,
            style: { position: "fixed" },
            onFocus: (e) => {
              var t;
              let n = e.relatedTarget;
              (null != (t = a.viewport) && t.contains(n)) || l();
            },
          }),
        );
      }),
      K = "Toast",
      H = (0, r.forwardRef)((e, t) => {
        let {
            forceMount: o,
            open: i,
            defaultOpen: a,
            onOpenChange: s,
            ...u
          } = e,
          [c = !0, f] = (0, h.useControllableState)({
            prop: i,
            defaultProp: a,
            onChange: s,
          });
        return (0, r.createElement)(
          b.Presence,
          { present: o || c },
          (0, r.createElement)(
            V,
            (0, n.default)({ open: c }, u, {
              ref: t,
              onClose: () => f(!1),
              onPause: (0, d.useCallbackRef)(e.onPause),
              onResume: (0, d.useCallbackRef)(e.onResume),
              onSwipeStart: (0, l.composeEventHandlers)(e.onSwipeStart, (e) => {
                e.currentTarget.setAttribute("data-swipe", "start");
              }),
              onSwipeMove: (0, l.composeEventHandlers)(e.onSwipeMove, (e) => {
                let { x: t, y: n } = e.detail.delta;
                (e.currentTarget.setAttribute("data-swipe", "move"),
                  e.currentTarget.style.setProperty(
                    "--radix-toast-swipe-move-x",
                    `${t}px`,
                  ),
                  e.currentTarget.style.setProperty(
                    "--radix-toast-swipe-move-y",
                    `${n}px`,
                  ));
              }),
              onSwipeCancel: (0, l.composeEventHandlers)(
                e.onSwipeCancel,
                (e) => {
                  (e.currentTarget.setAttribute("data-swipe", "cancel"),
                    e.currentTarget.style.removeProperty(
                      "--radix-toast-swipe-move-x",
                    ),
                    e.currentTarget.style.removeProperty(
                      "--radix-toast-swipe-move-y",
                    ),
                    e.currentTarget.style.removeProperty(
                      "--radix-toast-swipe-end-x",
                    ),
                    e.currentTarget.style.removeProperty(
                      "--radix-toast-swipe-end-y",
                    ));
                },
              ),
              onSwipeEnd: (0, l.composeEventHandlers)(e.onSwipeEnd, (e) => {
                let { x: t, y: n } = e.detail.delta;
                (e.currentTarget.setAttribute("data-swipe", "end"),
                  e.currentTarget.style.removeProperty(
                    "--radix-toast-swipe-move-x",
                  ),
                  e.currentTarget.style.removeProperty(
                    "--radix-toast-swipe-move-y",
                  ),
                  e.currentTarget.style.setProperty(
                    "--radix-toast-swipe-end-x",
                    `${t}px`,
                  ),
                  e.currentTarget.style.setProperty(
                    "--radix-toast-swipe-end-y",
                    `${n}px`,
                  ),
                  f(!1));
              }),
            }),
          ),
        );
      }),
      [U, $] = D(K, { onClose() {} }),
      V = (0, r.forwardRef)((e, t) => {
        let {
            __scopeToast: a,
            type: s = "foreground",
            duration: u,
            open: f,
            onClose: p,
            onEscapeKeyDown: m,
            onPause: E,
            onResume: w,
            onSwipeStart: y,
            onSwipeMove: T,
            onSwipeCancel: b,
            onSwipeEnd: h,
            ...C
          } = e,
          g = k(K, a),
          [R, x] = (0, r.useState)(null),
          S = (0, i.useComposedRefs)(t, (e) => x(e)),
          D = (0, r.useRef)(null),
          L = (0, r.useRef)(null),
          N = u || g.duration,
          O = (0, r.useRef)(0),
          M = (0, r.useRef)(N),
          F = (0, r.useRef)(0),
          { onToastAdd: I, onToastRemove: H } = g,
          $ = (0, d.useCallbackRef)(() => {
            var e;
            ((null == R ? void 0 : R.contains(document.activeElement)) &&
              (null == (e = g.viewport) || e.focus()),
              p());
          }),
          V = (0, r.useCallback)(
            (e) => {
              e &&
                e !== 1 / 0 &&
                (window.clearTimeout(F.current),
                (O.current = new Date().getTime()),
                (F.current = window.setTimeout($, e)));
            },
            [$],
          );
        ((0, r.useEffect)(() => {
          let e = g.viewport;
          if (e) {
            let t = () => {
                (V(M.current), null == w || w());
              },
              n = () => {
                let e = new Date().getTime() - O.current;
                ((M.current = M.current - e),
                  window.clearTimeout(F.current),
                  null == E || E());
              };
            return (
              e.addEventListener(_, n),
              e.addEventListener(A, t),
              () => {
                (e.removeEventListener(_, n), e.removeEventListener(A, t));
              }
            );
          }
        }, [g.viewport, N, E, w, V]),
          (0, r.useEffect)(() => {
            f && !g.isClosePausedRef.current && V(N);
          }, [f, N, g.isClosePausedRef, V]),
          (0, r.useEffect)(() => (I(), () => H()), [I, H]));
        let B = (0, r.useMemo)(
          () =>
            R
              ? (function e(t) {
                  let n = [];
                  return (
                    Array.from(t.childNodes).forEach((t) => {
                      var r;
                      if (
                        (t.nodeType === t.TEXT_NODE &&
                          t.textContent &&
                          n.push(t.textContent),
                        (r = t).nodeType === r.ELEMENT_NODE)
                      ) {
                        let r =
                            t.ariaHidden ||
                            t.hidden ||
                            "none" === t.style.display,
                          o = "" === t.dataset.radixToastAnnounceExclude;
                        if (!r)
                          if (o) {
                            let e = t.dataset.radixToastAnnounceAlt;
                            e && n.push(e);
                          } else n.push(...e(t));
                      }
                    }),
                    n
                  );
                })(R)
              : null,
          [R],
        );
        return g.viewport
          ? (0, r.createElement)(
              r.Fragment,
              null,
              B &&
                (0, r.createElement)(
                  W,
                  {
                    __scopeToast: a,
                    role: "status",
                    "aria-live": "foreground" === s ? "assertive" : "polite",
                    "aria-atomic": !0,
                  },
                  B,
                ),
              (0, r.createElement)(
                U,
                { scope: a, onClose: $ },
                (0, o.createPortal)(
                  (0, r.createElement)(
                    P.ItemSlot,
                    { scope: a },
                    (0, r.createElement)(
                      v,
                      {
                        asChild: !0,
                        onEscapeKeyDown: (0, l.composeEventHandlers)(m, () => {
                          (g.isFocusedToastEscapeKeyDownRef.current || $(),
                            (g.isFocusedToastEscapeKeyDownRef.current = !1));
                        }),
                      },
                      (0, r.createElement)(
                        c.Primitive.li,
                        (0, n.default)(
                          {
                            role: "status",
                            "aria-live": "off",
                            "aria-atomic": !0,
                            tabIndex: 0,
                            "data-state": f ? "open" : "closed",
                            "data-swipe-direction": g.swipeDirection,
                          },
                          C,
                          {
                            ref: S,
                            style: {
                              userSelect: "none",
                              touchAction: "none",
                              ...e.style,
                            },
                            onKeyDown: (0, l.composeEventHandlers)(
                              e.onKeyDown,
                              (e) => {
                                "Escape" === e.key &&
                                  (null == m || m(e.nativeEvent),
                                  e.nativeEvent.defaultPrevented ||
                                    ((g.isFocusedToastEscapeKeyDownRef.current =
                                      !0),
                                    $()));
                              },
                            ),
                            onPointerDown: (0, l.composeEventHandlers)(
                              e.onPointerDown,
                              (e) => {
                                0 === e.button &&
                                  (D.current = { x: e.clientX, y: e.clientY });
                              },
                            ),
                            onPointerMove: (0, l.composeEventHandlers)(
                              e.onPointerMove,
                              (e) => {
                                if (!D.current) return;
                                let t = e.clientX - D.current.x,
                                  n = e.clientY - D.current.y,
                                  r = !!L.current,
                                  o = ["left", "right"].includes(
                                    g.swipeDirection,
                                  ),
                                  l = ["left", "up"].includes(g.swipeDirection)
                                    ? Math.min
                                    : Math.max,
                                  i = o ? l(0, t) : 0,
                                  a = o ? 0 : l(0, n),
                                  s = "touch" === e.pointerType ? 10 : 2,
                                  u = { x: i, y: a },
                                  c = { originalEvent: e, delta: u };
                                r
                                  ? ((L.current = u),
                                    Y("toast.swipeMove", T, c, {
                                      discrete: !1,
                                    }))
                                  : Z(u, g.swipeDirection, s)
                                    ? ((L.current = u),
                                      Y("toast.swipeStart", y, c, {
                                        discrete: !1,
                                      }),
                                      e.target.setPointerCapture(e.pointerId))
                                    : (Math.abs(t) > s || Math.abs(n) > s) &&
                                      (D.current = null);
                              },
                            ),
                            onPointerUp: (0, l.composeEventHandlers)(
                              e.onPointerUp,
                              (e) => {
                                let t = L.current,
                                  n = e.target;
                                if (
                                  (n.hasPointerCapture(e.pointerId) &&
                                    n.releasePointerCapture(e.pointerId),
                                  (L.current = null),
                                  (D.current = null),
                                  t)
                                ) {
                                  let n = e.currentTarget,
                                    r = { originalEvent: e, delta: t };
                                  (Z(t, g.swipeDirection, g.swipeThreshold)
                                    ? Y("toast.swipeEnd", h, r, {
                                        discrete: !0,
                                      })
                                    : Y("toast.swipeCancel", b, r, {
                                        discrete: !0,
                                      }),
                                    n.addEventListener(
                                      "click",
                                      (e) => e.preventDefault(),
                                      { once: !0 },
                                    ));
                                }
                              },
                            ),
                          },
                        ),
                      ),
                    ),
                  ),
                  g.viewport,
                ),
              ),
            )
          : null;
      });
    V.propTypes = {
      type: (e) =>
        e.type && !["foreground", "background"].includes(e.type)
          ? Error(
              `Invalid prop \`type\` supplied to \`${K}\`. Expected \`foreground | background\`.`,
            )
          : null,
    };
    let W = (e) => {
        let { __scopeToast: t, children: n, ...o } = e,
          l = k(K, t),
          [i, a] = (0, r.useState)(!1),
          [s, u] = (0, r.useState)(!1);
        return (
          (function (e = () => {}) {
            let t = (0, d.useCallbackRef)(e);
            (0, C.useLayoutEffect)(() => {
              let e = 0,
                n = 0;
              return (
                (e = window.requestAnimationFrame(
                  () => (n = window.requestAnimationFrame(t)),
                )),
                () => {
                  (window.cancelAnimationFrame(e),
                    window.cancelAnimationFrame(n));
                }
              );
            }, [t]);
          })(() => a(!0)),
          (0, r.useEffect)(() => {
            let e = window.setTimeout(() => u(!0), 1e3);
            return () => window.clearTimeout(e);
          }, []),
          s
            ? null
            : (0, r.createElement)(
                T,
                { asChild: !0 },
                (0, r.createElement)(
                  g,
                  o,
                  i && (0, r.createElement)(r.Fragment, null, l.label, " ", n),
                ),
              )
        );
      },
      B = (0, r.forwardRef)((e, t) => {
        let { __scopeToast: o, ...l } = e;
        return (0, r.createElement)(
          c.Primitive.div,
          (0, n.default)({}, l, { ref: t }),
        );
      }),
      j = (0, r.forwardRef)((e, t) => {
        let { __scopeToast: o, ...l } = e;
        return (0, r.createElement)(
          c.Primitive.div,
          (0, n.default)({}, l, { ref: t }),
        );
      }),
      X = (0, r.forwardRef)((e, t) => {
        let { altText: o, ...l } = e;
        return o
          ? (0, r.createElement)(
              q,
              { altText: o, asChild: !0 },
              (0, r.createElement)(z, (0, n.default)({}, l, { ref: t })),
            )
          : null;
      });
    X.propTypes = {
      altText: (e) =>
        e.altText
          ? null
          : Error("Missing prop `altText` expected on `ToastAction`"),
    };
    let z = (0, r.forwardRef)((e, t) => {
        let { __scopeToast: o, ...i } = e,
          a = $("ToastClose", o);
        return (0, r.createElement)(
          q,
          { asChild: !0 },
          (0, r.createElement)(
            c.Primitive.button,
            (0, n.default)({ type: "button" }, i, {
              ref: t,
              onClick: (0, l.composeEventHandlers)(e.onClick, a.onClose),
            }),
          ),
        );
      }),
      q = (0, r.forwardRef)((e, t) => {
        let { __scopeToast: o, altText: l, ...i } = e;
        return (0, r.createElement)(
          c.Primitive.div,
          (0, n.default)(
            {
              "data-radix-toast-announce-exclude": "",
              "data-radix-toast-announce-alt": l || void 0,
            },
            i,
            { ref: t },
          ),
        );
      });
    function Y(e, t, n, { discrete: r }) {
      let o = n.originalEvent.currentTarget,
        l = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
      (t && o.addEventListener(e, t, { once: !0 }),
        r ? (0, c.dispatchDiscreteCustomEvent)(o, l) : o.dispatchEvent(l));
    }
    let Z = (e, t, n = 0) => {
      let r = Math.abs(e.x),
        o = Math.abs(e.y),
        l = r > o;
      return "left" === t || "right" === t ? l && r > n : !l && o > n;
    };
    function G(e) {
      let t = document.activeElement;
      return e.some(
        (e) => e === t || (e.focus(), document.activeElement !== t),
      );
    }
    e.s(
      [
        "Action",
        () => X,
        "Close",
        () => z,
        "Description",
        () => j,
        "Provider",
        () => O,
        "Root",
        () => H,
        "Title",
        () => B,
        "Toast",
        () => H,
        "ToastAction",
        () => X,
        "ToastClose",
        () => z,
        "ToastDescription",
        () => j,
        "ToastProvider",
        () => O,
        "ToastTitle",
        () => B,
        "ToastViewport",
        () => F,
        "Viewport",
        () => F,
        "createToastScope",
        () => L,
      ],
      266114,
    );
  },
]);
