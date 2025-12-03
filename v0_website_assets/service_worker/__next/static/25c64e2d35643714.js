(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  559219,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("Ellipsis", [
      ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
      ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
      ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
    ]);
    e.s(["default", () => t]);
  },
  679912,
  (e) => {
    "use strict";
    var t = e.i(559219);
    e.s(["MoreHorizontal", () => t.default]);
  },
  415659,
  35892,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(291967),
      o = e.i(975946),
      i = e.i(590285),
      a = "Toggle",
      s = r.forwardRef((e, r) => {
        let { pressed: s, defaultPressed: l, onPressedChange: u, ...d } = e,
          [c, f] = (0, o.useControllableState)({
            prop: s,
            onChange: u,
            defaultProp: l ?? !1,
            caller: a,
          });
        return (0, t.jsx)(i.Primitive.button, {
          type: "button",
          "aria-pressed": c,
          "data-state": c ? "on" : "off",
          "data-disabled": e.disabled ? "" : void 0,
          ...d,
          ref: r,
          onClick: (0, n.composeEventHandlers)(e.onClick, () => {
            e.disabled || f(!c);
          }),
        });
      });
    ((s.displayName = a), e.s(["Root", () => s, "Toggle", () => s], 35892));
    var l = e.i(89440),
      u = e.i(403055);
    let d = (0, l.cva)(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        {
          variants: {
            variant: {
              default: "bg-transparent",
              outline:
                "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
            },
            size: { default: "h-10 px-3", sm: "h-9 px-2.5", lg: "h-11 px-5" },
          },
          defaultVariants: { variant: "default", size: "default" },
        },
      ),
      c = r.forwardRef(({ className: e, variant: r, size: n, ...o }, i) =>
        (0, t.jsx)(s, {
          className: (0, u.cn)(d({ variant: r, size: n, className: e })),
          ref: i,
          ...o,
        }),
      );
    ((c.displayName = s.displayName),
      e.s(["Toggle", () => c, "toggleVariants", () => d], 415659));
  },
  952375,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(89440),
      n = e.i(403055);
    let o = (0, r.cva)(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
      {
        variants: {
          variant: {
            default:
              "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary:
              "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive:
              "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground",
          },
        },
        defaultVariants: { variant: "default" },
      },
    );
    function i({ className: e, variant: r, ...i }) {
      return (0, t.jsx)("div", {
        className: (0, n.cn)(o({ variant: r }), e),
        ...i,
        "data-v0-t": "badge",
      });
    }
    e.s(["Badge", () => i, "badgeVariants", () => o]);
  },
  766660,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(637118),
      o = e.i(949002),
      i = e.i(403055);
    let a = n.Root,
      s = n.Trigger,
      l = n.Portal,
      u = n.Close,
      d = r.forwardRef(({ className: e, ...r }, o) =>
        (0, t.jsx)(n.Overlay, {
          className: (0, i.cn)(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            e,
          ),
          ref: o,
          ...r,
        }),
      );
    d.displayName = n.Overlay.displayName;
    let c = r.forwardRef(({ className: e, children: r, ...a }, s) =>
      (0, t.jsxs)(l, {
        children: [
          (0, t.jsx)(d, {}),
          (0, t.jsxs)(n.Content, {
            className: (0, i.cn)(
              "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
              e,
            ),
            ref: s,
            ...a,
            children: [
              r,
              (0, t.jsxs)(n.Close, {
                className:
                  "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                children: [
                  (0, t.jsx)(o.X, { className: "h-4 w-4" }),
                  (0, t.jsx)("span", {
                    className: "sr-only",
                    children: "Close",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    );
    c.displayName = n.Content.displayName;
    let f = ({ className: e, ...r }) =>
      (0, t.jsx)("div", {
        className: (0, i.cn)(
          "flex flex-col space-y-1.5 text-center sm:text-left",
          e,
        ),
        ...r,
      });
    f.displayName = "DialogHeader";
    let p = ({ className: e, ...r }) =>
      (0, t.jsx)("div", {
        className: (0, i.cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          e,
        ),
        ...r,
      });
    p.displayName = "DialogFooter";
    let m = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Title, {
        className: (0, i.cn)(
          "text-lg font-semibold leading-none tracking-tight",
          e,
        ),
        ref: o,
        ...r,
      }),
    );
    m.displayName = n.Title.displayName;
    let v = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Description, {
        className: (0, i.cn)("text-sm text-muted-foreground", e),
        ref: o,
        ...r,
      }),
    );
    ((v.displayName = n.Description.displayName),
      e.s([
        "Dialog",
        () => a,
        "DialogClose",
        () => u,
        "DialogContent",
        () => c,
        "DialogDescription",
        () => v,
        "DialogFooter",
        () => p,
        "DialogHeader",
        () => f,
        "DialogOverlay",
        () => d,
        "DialogPortal",
        () => l,
        "DialogTitle",
        () => m,
        "DialogTrigger",
        () => s,
      ]));
  },
  968254,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function r(e) {
      let r = t.useRef({ value: e, previous: e });
      return t.useMemo(
        () => (
          r.current.value !== e &&
            ((r.current.previous = r.current.value), (r.current.value = e)),
          r.current.previous
        ),
        [e],
      );
    }
    e.s(["usePrevious", () => r]);
  },
  36102,
  (e) => {
    "use strict";
    function t(e, [t, r]) {
      return Math.min(r, Math.max(t, e));
    }
    e.s(["clamp", () => t]);
  },
  66561,
  (e) => {
    "use strict";
    var t = new WeakMap(),
      r = new WeakMap(),
      n = {},
      o = 0,
      i = function (e) {
        return e && (e.host || i(e.parentNode));
      },
      a = function (e, a, s, l) {
        var u = (Array.isArray(e) ? e : [e])
          .map(function (e) {
            if (a.contains(e)) return e;
            var t = i(e);
            return t && a.contains(t)
              ? t
              : (console.error(
                  "aria-hidden",
                  e,
                  "in not contained inside",
                  a,
                  ". Doing nothing",
                ),
                null);
          })
          .filter(function (e) {
            return !!e;
          });
        n[s] || (n[s] = new WeakMap());
        var d = n[s],
          c = [],
          f = new Set(),
          p = new Set(u),
          m = function (e) {
            !e || f.has(e) || (f.add(e), m(e.parentNode));
          };
        u.forEach(m);
        var v = function (e) {
          !e ||
            p.has(e) ||
            Array.prototype.forEach.call(e.children, function (e) {
              if (f.has(e)) v(e);
              else {
                var n = e.getAttribute(l),
                  o = null !== n && "false" !== n,
                  i = (t.get(e) || 0) + 1,
                  a = (d.get(e) || 0) + 1;
                (t.set(e, i),
                  d.set(e, a),
                  c.push(e),
                  1 === i && o && r.set(e, !0),
                  1 === a && e.setAttribute(s, "true"),
                  o || e.setAttribute(l, "true"));
              }
            });
        };
        return (
          v(a),
          f.clear(),
          o++,
          function () {
            (c.forEach(function (e) {
              var n = t.get(e) - 1,
                o = d.get(e) - 1;
              (t.set(e, n),
                d.set(e, o),
                n || (r.has(e) || e.removeAttribute(l), r.delete(e)),
                o || e.removeAttribute(s));
            }),
              --o ||
                ((t = new WeakMap()),
                (t = new WeakMap()),
                (r = new WeakMap()),
                (n = {})));
          }
        );
      },
      s = function (e, t, r) {
        void 0 === r && (r = "data-aria-hidden");
        var n = Array.from(Array.isArray(e) ? e : [e]),
          o =
            t ||
            ("undefined" == typeof document
              ? null
              : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
        return o
          ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))),
            a(n, o, r, "aria-hidden"))
          : function () {
              return null;
            };
      };
    e.s(["hideOthers", () => s]);
  },
  151879,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(551150),
      n = e.i(682586),
      o = e.i(45616),
      i = e.i(889655),
      a = e.i(803040),
      s = e.i(436836),
      l = e.i(867645),
      u = e.i(633439),
      d = e.i(282270),
      c = e.i(301224),
      f = "rovingFocusGroup.onEntryFocus",
      p = { bubbles: !1, cancelable: !0 },
      m = "RovingFocusGroup",
      [v, g, h] = (0, n.createCollection)(m),
      [x, y] = (0, i.createContextScope)(m, [h]),
      [b, w] = x(m),
      C = t.forwardRef((e, t) =>
        (0, c.jsx)(v.Provider, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, c.jsx)(v.Slot, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, c.jsx)(R, { ...e, ref: t }),
          }),
        }),
      );
    C.displayName = m;
    var R = t.forwardRef((e, n) => {
        let {
            __scopeRovingFocusGroup: i,
            orientation: a,
            loop: m = !1,
            dir: v,
            currentTabStopId: h,
            defaultCurrentTabStopId: x,
            onCurrentTabStopIdChange: y,
            onEntryFocus: w,
            preventScrollOnEntryFocus: C = !1,
            ...R
          } = e,
          j = t.useRef(null),
          D = (0, o.useComposedRefs)(n, j),
          M = (0, d.useDirection)(v),
          [_ = null, E] = (0, u.useControllableState)({
            prop: h,
            defaultProp: x,
            onChange: y,
          }),
          [N, P] = t.useState(!1),
          I = (0, l.useCallbackRef)(w),
          A = g(i),
          k = t.useRef(!1),
          [O, $] = t.useState(0);
        return (
          t.useEffect(() => {
            let e = j.current;
            if (e)
              return (
                e.addEventListener(f, I),
                () => e.removeEventListener(f, I)
              );
          }, [I]),
          (0, c.jsx)(b, {
            scope: i,
            orientation: a,
            dir: M,
            loop: m,
            currentTabStopId: _,
            onItemFocus: t.useCallback((e) => E(e), [E]),
            onItemShiftTab: t.useCallback(() => P(!0), []),
            onFocusableItemAdd: t.useCallback(() => $((e) => e + 1), []),
            onFocusableItemRemove: t.useCallback(() => $((e) => e - 1), []),
            children: (0, c.jsx)(s.Primitive.div, {
              tabIndex: N || 0 === O ? -1 : 0,
              "data-orientation": a,
              ...R,
              ref: D,
              style: { outline: "none", ...e.style },
              onMouseDown: (0, r.composeEventHandlers)(e.onMouseDown, () => {
                k.current = !0;
              }),
              onFocus: (0, r.composeEventHandlers)(e.onFocus, (e) => {
                let t = !k.current;
                if (e.target === e.currentTarget && t && !N) {
                  let t = new CustomEvent(f, p);
                  if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                    let e = A().filter((e) => e.focusable);
                    S(
                      [e.find((e) => e.active), e.find((e) => e.id === _), ...e]
                        .filter(Boolean)
                        .map((e) => e.ref.current),
                      C,
                    );
                  }
                }
                k.current = !1;
              }),
              onBlur: (0, r.composeEventHandlers)(e.onBlur, () => P(!1)),
            }),
          })
        );
      }),
      j = "RovingFocusGroupItem",
      D = t.forwardRef((e, n) => {
        let {
            __scopeRovingFocusGroup: o,
            focusable: i = !0,
            active: l = !1,
            tabStopId: u,
            ...d
          } = e,
          f = (0, a.useId)(),
          p = u || f,
          m = w(j, o),
          h = m.currentTabStopId === p,
          x = g(o),
          { onFocusableItemAdd: y, onFocusableItemRemove: b } = m;
        return (
          t.useEffect(() => {
            if (i) return (y(), () => b());
          }, [i, y, b]),
          (0, c.jsx)(v.ItemSlot, {
            scope: o,
            id: p,
            focusable: i,
            active: l,
            children: (0, c.jsx)(s.Primitive.span, {
              tabIndex: h ? 0 : -1,
              "data-orientation": m.orientation,
              ...d,
              ref: n,
              onMouseDown: (0, r.composeEventHandlers)(e.onMouseDown, (e) => {
                i ? m.onItemFocus(p) : e.preventDefault();
              }),
              onFocus: (0, r.composeEventHandlers)(e.onFocus, () =>
                m.onItemFocus(p),
              ),
              onKeyDown: (0, r.composeEventHandlers)(e.onKeyDown, (e) => {
                if ("Tab" === e.key && e.shiftKey)
                  return void m.onItemShiftTab();
                if (e.target !== e.currentTarget) return;
                let t = (function (e, t, r) {
                  var n;
                  let o =
                    ((n = e.key),
                    "rtl" !== r
                      ? n
                      : "ArrowLeft" === n
                        ? "ArrowRight"
                        : "ArrowRight" === n
                          ? "ArrowLeft"
                          : n);
                  if (
                    !(
                      "vertical" === t &&
                      ["ArrowLeft", "ArrowRight"].includes(o)
                    ) &&
                    !(
                      "horizontal" === t && ["ArrowUp", "ArrowDown"].includes(o)
                    )
                  )
                    return M[o];
                })(e, m.orientation, m.dir);
                if (void 0 !== t) {
                  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                  e.preventDefault();
                  let o = x()
                    .filter((e) => e.focusable)
                    .map((e) => e.ref.current);
                  if ("last" === t) o.reverse();
                  else if ("prev" === t || "next" === t) {
                    var r, n;
                    "prev" === t && o.reverse();
                    let i = o.indexOf(e.currentTarget);
                    o = m.loop
                      ? ((r = o),
                        (n = i + 1),
                        r.map((e, t) => r[(n + t) % r.length]))
                      : o.slice(i + 1);
                  }
                  setTimeout(() => S(o));
                }
              }),
            }),
          })
        );
      });
    D.displayName = j;
    var M = {
      ArrowLeft: "prev",
      ArrowUp: "prev",
      ArrowRight: "next",
      ArrowDown: "next",
      PageUp: "first",
      Home: "first",
      PageDown: "last",
      End: "last",
    };
    function S(e, t = !1) {
      let r = document.activeElement;
      for (let n of e)
        if (
          n === r ||
          (n.focus({ preventScroll: t }), document.activeElement !== r)
        )
          return;
    }
    e.s([
      "Item",
      () => D,
      "Root",
      () => C,
      "createRovingFocusGroupScope",
      () => y,
    ]);
  },
  731037,
  (e) => {
    "use strict";
    var t = e.i(568871);
    e.s(["Circle", () => t.default]);
  },
  619822,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("Check", [
      ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }],
    ]);
    e.s(["default", () => t]);
  },
  621553,
  (e) => {
    "use strict";
    var t = e.i(619822);
    e.s(["Check", () => t.default]);
  },
  736891,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(674180);
    function n(e) {
      let [n, o] = t.useState(void 0);
      return (
        (0, r.useLayoutEffect)(() => {
          if (e) {
            o({ width: e.offsetWidth, height: e.offsetHeight });
            let t = new ResizeObserver((t) => {
              let r, n;
              if (!Array.isArray(t) || !t.length) return;
              let i = t[0];
              if ("borderBoxSize" in i) {
                let e = i.borderBoxSize,
                  t = Array.isArray(e) ? e[0] : e;
                ((r = t.inlineSize), (n = t.blockSize));
              } else ((r = e.offsetWidth), (n = e.offsetHeight));
              o({ width: r, height: n });
            });
            return (t.observe(e, { box: "border-box" }), () => t.unobserve(e));
          }
          o(void 0);
        }, [e]),
        n
      );
    }
    e.s(["useSize", () => n]);
  },
  282270,
  (e) => {
    "use strict";
    var t = e.i(789783);
    e.i(301224);
    var r = t.createContext(void 0);
    function n(e) {
      let n = t.useContext(r);
      return e || n || "ltr";
    }
    e.s(["useDirection", () => n]);
  },
  682586,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(889655),
      n = e.i(45616),
      o = e.i(851279),
      i = e.i(301224);
    function a(e) {
      let a = e + "CollectionProvider",
        [s, l] = (0, r.createContextScope)(a),
        [u, d] = s(a, { collectionRef: { current: null }, itemMap: new Map() }),
        c = (e) => {
          let { scope: r, children: n } = e,
            o = t.default.useRef(null),
            a = t.default.useRef(new Map()).current;
          return (0, i.jsx)(u, {
            scope: r,
            itemMap: a,
            collectionRef: o,
            children: n,
          });
        };
      c.displayName = a;
      let f = e + "CollectionSlot",
        p = t.default.forwardRef((e, t) => {
          let { scope: r, children: a } = e,
            s = d(f, r),
            l = (0, n.useComposedRefs)(t, s.collectionRef);
          return (0, i.jsx)(o.Slot, { ref: l, children: a });
        });
      p.displayName = f;
      let m = e + "CollectionItemSlot",
        v = "data-radix-collection-item",
        g = t.default.forwardRef((e, r) => {
          let { scope: a, children: s, ...l } = e,
            u = t.default.useRef(null),
            c = (0, n.useComposedRefs)(r, u),
            f = d(m, a);
          return (
            t.default.useEffect(
              () => (
                f.itemMap.set(u, { ref: u, ...l }),
                () => void f.itemMap.delete(u)
              ),
            ),
            (0, i.jsx)(o.Slot, { ...{ [v]: "" }, ref: c, children: s })
          );
        });
      return (
        (g.displayName = m),
        [
          { Provider: c, Slot: p, ItemSlot: g },
          function (r) {
            let n = d(e + "CollectionConsumer", r);
            return t.default.useCallback(() => {
              let e = n.collectionRef.current;
              if (!e) return [];
              let t = Array.from(e.querySelectorAll(`[${v}]`));
              return Array.from(n.itemMap.values()).sort(
                (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
              );
            }, [n.collectionRef, n.itemMap]);
          },
          l,
        ]
      );
    }
    e.s(["createCollection", () => a]);
  },
  33851,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(436836),
      n = e.i(301224),
      o = t.forwardRef((e, t) => {
        let { children: o, width: i = 10, height: a = 5, ...s } = e;
        return (0, n.jsx)(r.Primitive.svg, {
          ...s,
          ref: t,
          width: i,
          height: a,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
          children: e.asChild
            ? o
            : (0, n.jsx)("polygon", { points: "0,0 30,0 15,10" }),
        });
      });
    ((o.displayName = "Arrow"), e.s(["Root", () => o]));
  },
  956349,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(323337),
      n = e.i(436035),
      o = e.i(33851),
      i = e.i(45616),
      a = e.i(889655),
      s = e.i(436836),
      l = e.i(867645),
      u = e.i(674180),
      d = e.i(736891),
      c = e.i(301224),
      f = "Popper",
      [p, m] = (0, a.createContextScope)(f),
      [v, g] = p(f),
      h = (e) => {
        let { __scopePopper: r, children: n } = e,
          [o, i] = t.useState(null);
        return (0, c.jsx)(v, {
          scope: r,
          anchor: o,
          onAnchorChange: i,
          children: n,
        });
      };
    h.displayName = f;
    var x = "PopperAnchor",
      y = t.forwardRef((e, r) => {
        let { __scopePopper: n, virtualRef: o, ...a } = e,
          l = g(x, n),
          u = t.useRef(null),
          d = (0, i.useComposedRefs)(r, u);
        return (
          t.useEffect(() => {
            l.onAnchorChange(o?.current || u.current);
          }),
          o ? null : (0, c.jsx)(s.Primitive.div, { ...a, ref: d })
        );
      });
    y.displayName = x;
    var b = "PopperContent",
      [w, C] = p(b),
      R = t.forwardRef((e, o) => {
        let {
            __scopePopper: a,
            side: f = "bottom",
            sideOffset: p = 0,
            align: m = "center",
            alignOffset: v = 0,
            arrowPadding: h = 0,
            avoidCollisions: x = !0,
            collisionBoundary: y = [],
            collisionPadding: C = 0,
            sticky: R = "partial",
            hideWhenDetached: j = !1,
            updatePositionStrategy: D = "optimized",
            onPlaced: M,
            ...N
          } = e,
          P = g(b, a),
          [I, A] = t.useState(null),
          k = (0, i.useComposedRefs)(o, (e) => A(e)),
          [O, $] = t.useState(null),
          T = (0, d.useSize)(O),
          F = T?.width ?? 0,
          H = T?.height ?? 0,
          L =
            "number" == typeof C
              ? C
              : { top: 0, right: 0, bottom: 0, left: 0, ...C },
          z = Array.isArray(y) ? y : [y],
          K = z.length > 0,
          G = { padding: L, boundary: z.filter(S), altBoundary: K },
          {
            refs: W,
            floatingStyles: B,
            placement: V,
            isPositioned: U,
            middlewareData: X,
          } = (0, r.useFloating)({
            strategy: "fixed",
            placement: f + ("center" !== m ? "-" + m : ""),
            whileElementsMounted: (...e) =>
              (0, n.autoUpdate)(...e, { animationFrame: "always" === D }),
            elements: { reference: P.anchor },
            middleware: [
              (0, r.offset)({ mainAxis: p + H, alignmentAxis: v }),
              x &&
                (0, r.shift)({
                  mainAxis: !0,
                  crossAxis: !1,
                  limiter: "partial" === R ? (0, r.limitShift)() : void 0,
                  ...G,
                }),
              x && (0, r.flip)({ ...G }),
              (0, r.size)({
                ...G,
                apply: ({
                  elements: e,
                  rects: t,
                  availableWidth: r,
                  availableHeight: n,
                }) => {
                  let { width: o, height: i } = t.reference,
                    a = e.floating.style;
                  (a.setProperty("--radix-popper-available-width", `${r}px`),
                    a.setProperty("--radix-popper-available-height", `${n}px`),
                    a.setProperty("--radix-popper-anchor-width", `${o}px`),
                    a.setProperty("--radix-popper-anchor-height", `${i}px`));
                },
              }),
              O && (0, r.arrow)({ element: O, padding: h }),
              _({ arrowWidth: F, arrowHeight: H }),
              j && (0, r.hide)({ strategy: "referenceHidden", ...G }),
            ],
          }),
          [Y, q] = E(V),
          Z = (0, l.useCallbackRef)(M);
        (0, u.useLayoutEffect)(() => {
          U && Z?.();
        }, [U, Z]);
        let Q = X.arrow?.x,
          J = X.arrow?.y,
          ee = X.arrow?.centerOffset !== 0,
          [et, er] = t.useState();
        return (
          (0, u.useLayoutEffect)(() => {
            I && er(window.getComputedStyle(I).zIndex);
          }, [I]),
          (0, c.jsx)("div", {
            ref: W.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
              ...B,
              transform: U ? B.transform : "translate(0, -200%)",
              minWidth: "max-content",
              zIndex: et,
              "--radix-popper-transform-origin": [
                X.transformOrigin?.x,
                X.transformOrigin?.y,
              ].join(" "),
              ...(X.hide?.referenceHidden && {
                visibility: "hidden",
                pointerEvents: "none",
              }),
            },
            dir: e.dir,
            children: (0, c.jsx)(w, {
              scope: a,
              placedSide: Y,
              onArrowChange: $,
              arrowX: Q,
              arrowY: J,
              shouldHideArrow: ee,
              children: (0, c.jsx)(s.Primitive.div, {
                "data-side": Y,
                "data-align": q,
                ...N,
                ref: k,
                style: { ...N.style, animation: U ? void 0 : "none" },
              }),
            }),
          })
        );
      });
    R.displayName = b;
    var j = "PopperArrow",
      D = { top: "bottom", right: "left", bottom: "top", left: "right" },
      M = t.forwardRef(function (e, t) {
        let { __scopePopper: r, ...n } = e,
          i = C(j, r),
          a = D[i.placedSide];
        return (0, c.jsx)("span", {
          ref: i.onArrowChange,
          style: {
            position: "absolute",
            left: i.arrowX,
            top: i.arrowY,
            [a]: 0,
            transformOrigin: {
              top: "",
              right: "0 0",
              bottom: "center 0",
              left: "100% 0",
            }[i.placedSide],
            transform: {
              top: "translateY(100%)",
              right: "translateY(50%) rotate(90deg) translateX(-50%)",
              bottom: "rotate(180deg)",
              left: "translateY(50%) rotate(-90deg) translateX(50%)",
            }[i.placedSide],
            visibility: i.shouldHideArrow ? "hidden" : void 0,
          },
          children: (0, c.jsx)(o.Root, {
            ...n,
            ref: t,
            style: { ...n.style, display: "block" },
          }),
        });
      });
    function S(e) {
      return null !== e;
    }
    M.displayName = j;
    var _ = (e) => ({
      name: "transformOrigin",
      options: e,
      fn(t) {
        let { placement: r, rects: n, middlewareData: o } = t,
          i = o.arrow?.centerOffset !== 0,
          a = i ? 0 : e.arrowWidth,
          s = i ? 0 : e.arrowHeight,
          [l, u] = E(r),
          d = { start: "0%", center: "50%", end: "100%" }[u],
          c = (o.arrow?.x ?? 0) + a / 2,
          f = (o.arrow?.y ?? 0) + s / 2,
          p = "",
          m = "";
        return (
          "bottom" === l
            ? ((p = i ? d : `${c}px`), (m = `${-s}px`))
            : "top" === l
              ? ((p = i ? d : `${c}px`), (m = `${n.floating.height + s}px`))
              : "right" === l
                ? ((p = `${-s}px`), (m = i ? d : `${f}px`))
                : "left" === l &&
                  ((p = `${n.floating.width + s}px`), (m = i ? d : `${f}px`)),
          { data: { x: p, y: m } }
        );
      },
    });
    function E(e) {
      let [t, r = "center"] = e.split("-");
      return [t, r];
    }
    e.s([
      "Anchor",
      () => y,
      "Arrow",
      () => M,
      "Content",
      () => R,
      "Root",
      () => h,
      "createPopperScope",
      () => m,
    ]);
  },
  791606,
  (e, t, r) => {
    t.exports = function (e) {
      var t = typeof e;
      return null != e && ("object" == t || "function" == t);
    };
  },
  472668,
  (e, t, r) => {
    t.exports = e.g && e.g.Object === Object && e.g;
  },
  818408,
  (e, t, r) => {
    var n = e.r(472668),
      o = "object" == typeof self && self && self.Object === Object && self;
    t.exports = n || o || Function("return this")();
  },
  407667,
  (e, t, r) => {
    t.exports = e.r(818408).Symbol;
  },
  652930,
  (e, t, r) => {
    var n = e.r(407667),
      o = Object.prototype,
      i = o.hasOwnProperty,
      a = o.toString,
      s = n ? n.toStringTag : void 0;
    t.exports = function (e) {
      var t = i.call(e, s),
        r = e[s];
      try {
        e[s] = void 0;
        var n = !0;
      } catch (e) {}
      var o = a.call(e);
      return (n && (t ? (e[s] = r) : delete e[s]), o);
    };
  },
  21955,
  (e, t, r) => {
    var n = Object.prototype.toString;
    t.exports = function (e) {
      return n.call(e);
    };
  },
  423748,
  (e, t, r) => {
    var n = e.r(407667),
      o = e.r(652930),
      i = e.r(21955),
      a = n ? n.toStringTag : void 0;
    t.exports = function (e) {
      return null == e
        ? void 0 === e
          ? "[object Undefined]"
          : "[object Null]"
        : a && a in Object(e)
          ? o(e)
          : i(e);
    };
  },
  819674,
  (e, t, r) => {
    t.exports = function (e) {
      return null != e && "object" == typeof e;
    };
  },
  248664,
  (e, t, r) => {
    var n = e.r(423748),
      o = e.r(819674);
    t.exports = function (e) {
      return "symbol" == typeof e || (o(e) && "[object Symbol]" == n(e));
    };
  },
  220868,
  (e, t, r) => {
    var n = e.r(875266),
      o = e.r(733698);
    t.exports = function (e, t, r, i) {
      var a = r.length,
        s = a,
        l = !i;
      if (null == e) return !s;
      for (e = Object(e); a--; ) {
        var u = r[a];
        if (l && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1;
      }
      for (; ++a < s; ) {
        var d = (u = r[a])[0],
          c = e[d],
          f = u[1];
        if (l && u[2]) {
          if (void 0 === c && !(d in e)) return !1;
        } else {
          var p = new n();
          if (i) var m = i(c, f, d, e, t, p);
          if (!(void 0 === m ? o(f, c, 3, i, p) : m)) return !1;
        }
      }
      return !0;
    };
  },
  410150,
  (e, t, r) => {
    var n = e.r(791606);
    t.exports = function (e) {
      return e == e && !n(e);
    };
  },
  448736,
  (e, t, r) => {
    var n = e.r(410150),
      o = e.r(833089);
    t.exports = function (e) {
      for (var t = o(e), r = t.length; r--; ) {
        var i = t[r],
          a = e[i];
        t[r] = [i, a, n(a)];
      }
      return t;
    };
  },
  206400,
  (e, t, r) => {
    t.exports = function (e, t) {
      return function (r) {
        return null != r && r[e] === t && (void 0 !== t || e in Object(r));
      };
    };
  },
  230828,
  (e, t, r) => {
    var n = e.r(220868),
      o = e.r(448736),
      i = e.r(206400);
    t.exports = function (e) {
      var t = o(e);
      return 1 == t.length && t[0][2]
        ? i(t[0][0], t[0][1])
        : function (r) {
            return r === e || n(r, e, t);
          };
    };
  },
  992764,
  (e, t, r) => {
    var n = e.r(733698),
      o = e.r(461317),
      i = e.r(498814),
      a = e.r(462931),
      s = e.r(410150),
      l = e.r(206400),
      u = e.r(728359);
    t.exports = function (e, t) {
      return a(e) && s(t)
        ? l(u(e), t)
        : function (r) {
            var a = o(r, e);
            return void 0 === a && a === t ? i(r, e) : n(t, a, 3);
          };
    };
  },
  818114,
  (e, t, r) => {
    t.exports = function (e) {
      return function (t) {
        return null == t ? void 0 : t[e];
      };
    };
  },
  549286,
  (e, t, r) => {
    var n = e.r(747449);
    t.exports = function (e) {
      return function (t) {
        return n(t, e);
      };
    };
  },
  771318,
  (e, t, r) => {
    var n = e.r(818114),
      o = e.r(549286),
      i = e.r(462931),
      a = e.r(728359);
    t.exports = function (e) {
      return i(e) ? n(a(e)) : o(e);
    };
  },
  357529,
  (e, t, r) => {
    var n = e.r(230828),
      o = e.r(992764),
      i = e.r(713870),
      a = e.r(272098),
      s = e.r(771318);
    t.exports = function (e) {
      return "function" == typeof e
        ? e
        : null == e
          ? i
          : "object" == typeof e
            ? a(e)
              ? o(e[0], e[1])
              : n(e)
            : s(e);
    };
  },
  588607,
  (e, t, r) => {
    var n = e.r(610673),
      o = e.r(833089);
    t.exports = function (e, t) {
      return e && n(e, t, o);
    };
  },
  37390,
  (e, t, r) => {
    var n = e.r(707850);
    t.exports = function (e, t) {
      return function (r, o) {
        if (null == r) return r;
        if (!n(r)) return e(r, o);
        for (
          var i = r.length, a = t ? i : -1, s = Object(r);
          (t ? a-- : ++a < i) && !1 !== o(s[a], a, s);

        );
        return r;
      };
    };
  },
  835496,
  (e, t, r) => {
    var n = e.r(588607);
    t.exports = e.r(37390)(n);
  },
  492255,
  (e, t, r) => {
    var n = e.r(835496),
      o = e.r(707850);
    t.exports = function (e, t) {
      var r = -1,
        i = o(e) ? Array(e.length) : [];
      return (
        n(e, function (e, n, o) {
          i[++r] = t(e, n, o);
        }),
        i
      );
    };
  },
  554178,
  (e, t, r) => {
    t.exports = function (e, t) {
      var r = e.length;
      for (e.sort(t); r--; ) e[r] = e[r].value;
      return e;
    };
  },
  682225,
  (e, t, r) => {
    var n = e.r(248664);
    t.exports = function (e, t) {
      if (e !== t) {
        var r = void 0 !== e,
          o = null === e,
          i = e == e,
          a = n(e),
          s = void 0 !== t,
          l = null === t,
          u = t == t,
          d = n(t);
        if (
          (!l && !d && !a && e > t) ||
          (a && s && u && !l && !d) ||
          (o && s && u) ||
          (!r && u) ||
          !i
        )
          return 1;
        if (
          (!o && !a && !d && e < t) ||
          (d && r && i && !o && !a) ||
          (l && r && i) ||
          (!s && i) ||
          !u
        )
          return -1;
      }
      return 0;
    };
  },
  242806,
  (e, t, r) => {
    var n = e.r(682225);
    t.exports = function (e, t, r) {
      for (
        var o = -1, i = e.criteria, a = t.criteria, s = i.length, l = r.length;
        ++o < s;

      ) {
        var u = n(i[o], a[o]);
        if (u) {
          if (o >= l) return u;
          return u * ("desc" == r[o] ? -1 : 1);
        }
      }
      return e.index - t.index;
    };
  },
  779898,
  (e, t, r) => {
    var n = e.r(166536),
      o = e.r(747449),
      i = e.r(357529),
      a = e.r(492255),
      s = e.r(554178),
      l = e.r(632900),
      u = e.r(242806),
      d = e.r(713870),
      c = e.r(272098);
    t.exports = function (e, t, r) {
      t = t.length
        ? n(t, function (e) {
            return c(e)
              ? function (t) {
                  return o(t, 1 === e.length ? e[0] : e);
                }
              : e;
          })
        : [d];
      var f = -1;
      return (
        (t = n(t, l(i))),
        s(
          a(e, function (e, r, o) {
            return {
              criteria: n(t, function (t) {
                return t(e);
              }),
              index: ++f,
              value: e,
            };
          }),
          function (e, t) {
            return u(e, t, r);
          },
        )
      );
    };
  },
  426431,
  (e, t, r) => {
    var n = e.r(777735),
      o = e.r(779898),
      i = e.r(686521),
      a = e.r(716110);
    t.exports = i(function (e, t) {
      if (null == e) return [];
      var r = t.length;
      return (
        r > 1 && a(e, t[0], t[1])
          ? (t = [])
          : r > 2 && a(t[0], t[1], t[2]) && (t = [t[0]]),
        o(e, n(t, 1), [])
      );
    });
  },
  523169,
  (e, t, r) => {
    t.exports = function () {};
  },
  56741,
  (e, t, r) => {
    var n = e.r(511524),
      o = e.r(523169),
      i = e.r(449123);
    t.exports =
      n && 1 / i(new n([, -0]))[1] == 1 / 0
        ? function (e) {
            return new n(e);
          }
        : o;
  },
  762952,
  (e, t, r) => {
    var n = e.r(25964),
      o = e.r(607873),
      i = e.r(76780),
      a = e.r(689808),
      s = e.r(56741),
      l = e.r(449123);
    t.exports = function (e, t, r) {
      var u = -1,
        d = o,
        c = e.length,
        f = !0,
        p = [],
        m = p;
      if (r) ((f = !1), (d = i));
      else if (c >= 200) {
        var v = t ? null : s(e);
        if (v) return l(v);
        ((f = !1), (d = a), (m = new n()));
      } else m = t ? [] : p;
      e: for (; ++u < c; ) {
        var g = e[u],
          h = t ? t(g) : g;
        if (((g = r || 0 !== g ? g : 0), f && h == h)) {
          for (var x = m.length; x--; ) if (m[x] === h) continue e;
          (t && m.push(h), p.push(g));
        } else d(m, h, r) || (m !== p && m.push(h), p.push(g));
      }
      return p;
    };
  },
  747275,
  (e, t, r) => {
    var n = e.r(357529),
      o = e.r(762952);
    t.exports = function (e, t) {
      return e && e.length ? o(e, n(t, 2)) : [];
    };
  },
  139269,
  (e, t, r) => {
    var n = e.r(423748),
      o = e.r(819674);
    t.exports = function (e) {
      return "number" == typeof e || (o(e) && "[object Number]" == n(e));
    };
  },
  225935,
  (e, t, r) => {
    t.exports = function (e, t, r) {
      var n = -1,
        o = e.length;
      (t < 0 && (t = -t > o ? 0 : o + t),
        (r = r > o ? o : r) < 0 && (r += o),
        (o = t > r ? 0 : (r - t) >>> 0),
        (t >>>= 0));
      for (var i = Array(o); ++n < o; ) i[n] = e[n + t];
      return i;
    };
  },
  459683,
  (e) => {
    "use strict";
    e.s([
      "default",
      0,
      function (e) {
        return function () {
          return e;
        };
      },
    ]);
  },
  199518,
  (e) => {
    "use strict";
    let t = Math.PI,
      r = 2 * t,
      n = r - 1e-6;
    function o(e) {
      this._ += e[0];
      for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t];
    }
    class i {
      constructor(e) {
        ((this._x0 = this._y0 = this._x1 = this._y1 = null),
          (this._ = ""),
          (this._append =
            null == e
              ? o
              : (function (e) {
                  let t = Math.floor(e);
                  if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
                  if (t > 15) return o;
                  let r = 10 ** t;
                  return function (e) {
                    this._ += e[0];
                    for (let t = 1, n = e.length; t < n; ++t)
                      this._ += Math.round(arguments[t] * r) / r + e[t];
                  };
                })(e)));
      }
      moveTo(e, t) {
        this
          ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}`;
      }
      closePath() {
        null !== this._x1 &&
          ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
      }
      lineTo(e, t) {
        this._append`L${(this._x1 = +e)},${(this._y1 = +t)}`;
      }
      quadraticCurveTo(e, t, r, n) {
        this._append`Q${+e},${+t},${(this._x1 = +r)},${(this._y1 = +n)}`;
      }
      bezierCurveTo(e, t, r, n, o, i) {
        this
          ._append`C${+e},${+t},${+r},${+n},${(this._x1 = +o)},${(this._y1 = +i)}`;
      }
      arcTo(e, r, n, o, i) {
        if (((e *= 1), (r *= 1), (n *= 1), (o *= 1), (i *= 1) < 0))
          throw Error(`negative radius: ${i}`);
        let a = this._x1,
          s = this._y1,
          l = n - e,
          u = o - r,
          d = a - e,
          c = s - r,
          f = d * d + c * c;
        if (null === this._x1)
          this._append`M${(this._x1 = e)},${(this._y1 = r)}`;
        else if (f > 1e-6)
          if (Math.abs(c * l - u * d) > 1e-6 && i) {
            let p = n - a,
              m = o - s,
              v = l * l + u * u,
              g = Math.sqrt(v),
              h = Math.sqrt(f),
              x =
                i *
                Math.tan(
                  (t - Math.acos((v + f - (p * p + m * m)) / (2 * g * h))) / 2,
                ),
              y = x / h,
              b = x / g;
            (Math.abs(y - 1) > 1e-6 && this._append`L${e + y * d},${r + y * c}`,
              this
                ._append`A${i},${i},0,0,${+(c * p > d * m)},${(this._x1 = e + b * l)},${(this._y1 = r + b * u)}`);
          } else this._append`L${(this._x1 = e)},${(this._y1 = r)}`;
      }
      arc(e, o, i, a, s, l) {
        if (((e *= 1), (o *= 1), (i *= 1), (l = !!l), i < 0))
          throw Error(`negative radius: ${i}`);
        let u = i * Math.cos(a),
          d = i * Math.sin(a),
          c = e + u,
          f = o + d,
          p = 1 ^ l,
          m = l ? a - s : s - a;
        (null === this._x1
          ? this._append`M${c},${f}`
          : (Math.abs(this._x1 - c) > 1e-6 || Math.abs(this._y1 - f) > 1e-6) &&
            this._append`L${c},${f}`,
          i &&
            (m < 0 && (m = (m % r) + r),
            m > n
              ? this
                  ._append`A${i},${i},0,1,${p},${e - u},${o - d}A${i},${i},0,1,${p},${(this._x1 = c)},${(this._y1 = f)}`
              : m > 1e-6 &&
                this
                  ._append`A${i},${i},0,${+(m >= t)},${p},${(this._x1 = e + i * Math.cos(s))},${(this._y1 = o + i * Math.sin(s))}`));
      }
      rect(e, t, r, n) {
        this
          ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}h${(r *= 1)}v${+n}h${-r}Z`;
      }
      toString() {
        return this._;
      }
    }
    function a(e) {
      let t = 3;
      return (
        (e.digits = function (r) {
          if (!arguments.length) return t;
          if (null == r) t = null;
          else {
            let e = Math.floor(r);
            if (!(e >= 0)) throw RangeError(`invalid digits: ${r}`);
            t = e;
          }
          return e;
        }),
        () => new i(t)
      );
    }
    (i.prototype, e.s(["withPath", () => a], 199518));
  },
  702272,
  (e, t, r) => {
    var n = e.r(818408);
    t.exports = function () {
      return n.Date.now();
    };
  },
  893912,
  (e, t, r) => {
    var n = /\s/;
    t.exports = function (e) {
      for (var t = e.length; t-- && n.test(e.charAt(t)); );
      return t;
    };
  },
  386716,
  (e, t, r) => {
    var n = e.r(893912),
      o = /^\s+/;
    t.exports = function (e) {
      return e ? e.slice(0, n(e) + 1).replace(o, "") : e;
    };
  },
  394370,
  (e, t, r) => {
    var n = e.r(386716),
      o = e.r(791606),
      i = e.r(248664),
      a = 0 / 0,
      s = /^[-+]0x[0-9a-f]+$/i,
      l = /^0b[01]+$/i,
      u = /^0o[0-7]+$/i,
      d = parseInt;
    t.exports = function (e) {
      if ("number" == typeof e) return e;
      if (i(e)) return a;
      if (o(e)) {
        var t = "function" == typeof e.valueOf ? e.valueOf() : e;
        e = o(t) ? t + "" : t;
      }
      if ("string" != typeof e) return 0 === e ? e : +e;
      e = n(e);
      var r = l.test(e);
      return r || u.test(e) ? d(e.slice(2), r ? 2 : 8) : s.test(e) ? a : +e;
    };
  },
  987325,
  (e, t, r) => {
    var n = e.r(791606),
      o = e.r(702272),
      i = e.r(394370),
      a = Math.max,
      s = Math.min;
    t.exports = function (e, t, r) {
      var l,
        u,
        d,
        c,
        f,
        p,
        m = 0,
        v = !1,
        g = !1,
        h = !0;
      if ("function" != typeof e) throw TypeError("Expected a function");
      function x(t) {
        var r = l,
          n = u;
        return ((l = u = void 0), (m = t), (c = e.apply(n, r)));
      }
      function y(e) {
        var r = e - p,
          n = e - m;
        return void 0 === p || r >= t || r < 0 || (g && n >= d);
      }
      function b() {
        var e,
          r,
          n,
          i = o();
        if (y(i)) return w(i);
        f = setTimeout(
          b,
          ((e = i - p), (r = i - m), (n = t - e), g ? s(n, d - r) : n),
        );
      }
      function w(e) {
        return ((f = void 0), h && l) ? x(e) : ((l = u = void 0), c);
      }
      function C() {
        var e,
          r = o(),
          n = y(r);
        if (((l = arguments), (u = this), (p = r), n)) {
          if (void 0 === f)
            return ((m = e = p), (f = setTimeout(b, t)), v ? x(e) : c);
          if (g) return (clearTimeout(f), (f = setTimeout(b, t)), x(p));
        }
        return (void 0 === f && (f = setTimeout(b, t)), c);
      }
      return (
        (t = i(t) || 0),
        n(r) &&
          ((v = !!r.leading),
          (d = (g = "maxWait" in r) ? a(i(r.maxWait) || 0, t) : d),
          (h = "trailing" in r ? !!r.trailing : h)),
        (C.cancel = function () {
          (void 0 !== f && clearTimeout(f), (m = 0), (l = p = u = f = void 0));
        }),
        (C.flush = function () {
          return void 0 === f ? c : w(o());
        }),
        C
      );
    };
  },
  360174,
  (e, t, r) => {
    var n = e.r(987325),
      o = e.r(791606);
    t.exports = function (e, t, r) {
      var i = !0,
        a = !0;
      if ("function" != typeof e) throw TypeError("Expected a function");
      return (
        o(r) &&
          ((i = "leading" in r ? !!r.leading : i),
          (a = "trailing" in r ? !!r.trailing : a)),
        n(e, t, { leading: i, maxWait: t, trailing: a })
      );
    };
  },
  291967,
  (e) => {
    "use strict";
    function t(e, r, { checkForDefaultPrevented: n = !0 } = {}) {
      return function (t) {
        if ((e?.(t), !1 === n || !t.defaultPrevented)) return r?.(t);
      };
    }
    ("undefined" != typeof window &&
      window.document &&
      window.document.createElement,
      e.s(["composeEventHandlers", () => t]));
  },
  7284,
  (e) => {
    "use strict";
    function t() {
      for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++)
        (e = arguments[r]) &&
          (t = (function e(t) {
            var r,
              n,
              o = "";
            if ("string" == typeof t || "number" == typeof t) o += t;
            else if ("object" == typeof t)
              if (Array.isArray(t)) {
                var i = t.length;
                for (r = 0; r < i; r++)
                  t[r] && (n = e(t[r])) && (o && (o += " "), (o += n));
              } else for (n in t) t[n] && (o && (o += " "), (o += n));
            return o;
          })(e)) &&
          (n && (n += " "), (n += t));
      return n;
    }
    e.s(["clsx", () => t, "default", 0, t]);
  },
  89440,
  (e) => {
    "use strict";
    let t = (e) => ("boolean" == typeof e ? "".concat(e) : 0 === e ? "0" : e),
      r = function () {
        for (var e, t, r = 0, n = ""; r < arguments.length; )
          (e = arguments[r++]) &&
            (t = (function e(t) {
              var r,
                n,
                o = "";
              if ("string" == typeof t || "number" == typeof t) o += t;
              else if ("object" == typeof t)
                if (Array.isArray(t))
                  for (r = 0; r < t.length; r++)
                    t[r] && (n = e(t[r])) && (o && (o += " "), (o += n));
                else for (r in t) t[r] && (o && (o += " "), (o += r));
              return o;
            })(e)) &&
            (n && (n += " "), (n += t));
        return n;
      };
    e.s(
      [
        "cva",
        0,
        (e, n) => (o) => {
          var i;
          if ((null == n ? void 0 : n.variants) == null)
            return r(
              e,
              null == o ? void 0 : o.class,
              null == o ? void 0 : o.className,
            );
          let { variants: a, defaultVariants: s } = n,
            l = Object.keys(a).map((e) => {
              let r = null == o ? void 0 : o[e],
                n = null == s ? void 0 : s[e];
              if (null === r) return null;
              let i = t(r) || t(n);
              return a[e][i];
            }),
            u =
              o &&
              Object.entries(o).reduce((e, t) => {
                let [r, n] = t;
                return (void 0 === n || (e[r] = n), e);
              }, {});
          return r(
            e,
            l,
            null == n || null == (i = n.compoundVariants)
              ? void 0
              : i.reduce((e, t) => {
                  let { class: r, className: n, ...o } = t;
                  return Object.entries(o).every((e) => {
                    let [t, r] = e;
                    return Array.isArray(r)
                      ? r.includes({ ...s, ...u }[t])
                      : { ...s, ...u }[t] === r;
                  })
                    ? [...e, r, n]
                    : e;
                }, []),
            null == o ? void 0 : o.class,
            null == o ? void 0 : o.className,
          );
        },
      ],
      89440,
    );
  },
  890446,
  221977,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function r(e, t) {
      if ("function" == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function n(...e) {
      return (t) => {
        let n = !1,
          o = e.map((e) => {
            let o = r(e, t);
            return (n || "function" != typeof o || (n = !0), o);
          });
        if (n)
          return () => {
            for (let t = 0; t < o.length; t++) {
              let n = o[t];
              "function" == typeof n ? n() : r(e[t], null);
            }
          };
      };
    }
    function o(...e) {
      return t.useCallback(n(...e), e);
    }
    e.s(["composeRefs", () => n, "useComposedRefs", () => o], 221977);
    var i = e.i(301224);
    function a(e) {
      var r;
      let o,
        a =
          ((r = e),
          ((o = t.forwardRef((e, r) => {
            let { children: o, ...i } = e;
            if (t.isValidElement(o)) {
              var a;
              let e,
                s,
                l =
                  ((a = o),
                  (s =
                    (e = Object.getOwnPropertyDescriptor(
                      a.props,
                      "ref",
                    )?.get) &&
                    "isReactWarning" in e &&
                    e.isReactWarning)
                    ? a.ref
                    : (s =
                          (e = Object.getOwnPropertyDescriptor(
                            a,
                            "ref",
                          )?.get) &&
                          "isReactWarning" in e &&
                          e.isReactWarning)
                      ? a.props.ref
                      : a.props.ref || a.ref),
                u = (function (e, t) {
                  let r = { ...t };
                  for (let n in t) {
                    let o = e[n],
                      i = t[n];
                    /^on[A-Z]/.test(n)
                      ? o && i
                        ? (r[n] = (...e) => {
                            let t = i(...e);
                            return (o(...e), t);
                          })
                        : o && (r[n] = o)
                      : "style" === n
                        ? (r[n] = { ...o, ...i })
                        : "className" === n &&
                          (r[n] = [o, i].filter(Boolean).join(" "));
                  }
                  return { ...e, ...r };
                })(i, o.props);
              return (
                o.type !== t.Fragment && (u.ref = r ? n(r, l) : l),
                t.cloneElement(o, u)
              );
            }
            return t.Children.count(o) > 1 ? t.Children.only(null) : null;
          })).displayName = `${r}.SlotClone`),
          o),
        s = t.forwardRef((e, r) => {
          let { children: n, ...o } = e,
            s = t.Children.toArray(n),
            l = s.find(c);
          if (l) {
            let e = l.props.children,
              n = s.map((r) =>
                r !== l
                  ? r
                  : t.Children.count(e) > 1
                    ? t.Children.only(null)
                    : t.isValidElement(e)
                      ? e.props.children
                      : null,
              );
            return (0, i.jsx)(a, {
              ...o,
              ref: r,
              children: t.isValidElement(e)
                ? t.cloneElement(e, void 0, n)
                : null,
            });
          }
          return (0, i.jsx)(a, { ...o, ref: r, children: n });
        });
      return ((s.displayName = `${e}.Slot`), s);
    }
    var s = a("Slot"),
      l = Symbol("radix.slottable");
    function u(e) {
      let t = ({ children: e }) => (0, i.jsx)(i.Fragment, { children: e });
      return ((t.displayName = `${e}.Slottable`), (t.__radixId = l), t);
    }
    var d = u("Slottable");
    function c(e) {
      return (
        t.isValidElement(e) &&
        "function" == typeof e.type &&
        "__radixId" in e.type &&
        e.type.__radixId === l
      );
    }
    e.s(
      [
        "Root",
        () => s,
        "Slot",
        () => s,
        "Slottable",
        () => d,
        "createSlot",
        () => a,
        "createSlottable",
        () => u,
      ],
      890446,
    );
  },
  306261,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(890446),
      o = e.i(89440),
      i = e.i(403055);
    let a = (0, o.cva)(
        "ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        {
          variants: {
            variant: {
              default: "bg-primary text-primary-foreground hover:bg-primary/90",
              destructive:
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              outline:
                "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
              secondary:
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              ghost: "hover:bg-accent hover:text-accent-foreground",
              link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
              default: "h-10 px-4 py-2",
              sm: "h-9 rounded-md px-3",
              lg: "h-11 rounded-md px-8",
              icon: "h-10 w-10",
            },
          },
          defaultVariants: { variant: "default", size: "default" },
        },
      ),
      s = r.forwardRef(
        ({ className: e, variant: r, size: o, asChild: s = !1, ...l }, u) => {
          let d = s ? n.Slot : "button";
          return (0, t.jsx)(d, {
            className: (0, i.cn)(a({ variant: r, size: o, className: e })),
            ref: u,
            ...l,
          });
        },
      );
    ((s.displayName = "Button"),
      e.s(["Button", () => s, "buttonVariants", () => a]));
  },
  359687,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(301224);
    function n(e, o = []) {
      let i = [],
        a = () => {
          let r = i.map((e) => t.createContext(e));
          return function (n) {
            let o = n?.[e] || r;
            return t.useMemo(
              () => ({ [`__scope${e}`]: { ...n, [e]: o } }),
              [n, o],
            );
          };
        };
      return (
        (a.scopeName = e),
        [
          function (n, o) {
            let a = t.createContext(o),
              s = i.length;
            i = [...i, o];
            let l = (n) => {
              let { scope: o, children: i, ...l } = n,
                u = o?.[e]?.[s] || a,
                d = t.useMemo(() => l, Object.values(l));
              return (0, r.jsx)(u.Provider, { value: d, children: i });
            };
            return (
              (l.displayName = n + "Provider"),
              [
                l,
                function (r, i) {
                  let l = i?.[e]?.[s] || a,
                    u = t.useContext(l);
                  if (u) return u;
                  if (void 0 !== o) return o;
                  throw Error(`\`${r}\` must be used within \`${n}\``);
                },
              ]
            );
          },
          (function (...e) {
            let r = e[0];
            if (1 === e.length) return r;
            let n = () => {
              let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
              return function (e) {
                let o = n.reduce((t, { useScope: r, scopeName: n }) => {
                  let o = r(e)[`__scope${n}`];
                  return { ...t, ...o };
                }, {});
                return t.useMemo(() => ({ [`__scope${r.scopeName}`]: o }), [o]);
              };
            };
            return ((n.scopeName = r.scopeName), n);
          })(a, ...o),
        ]
      );
    }
    e.s(["createContextScope", () => n]);
  },
  274662,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(736542);
    function n(e) {
      let [n, o] = t.useState(void 0);
      return (
        (0, r.useLayoutEffect)(() => {
          if (e) {
            o({ width: e.offsetWidth, height: e.offsetHeight });
            let t = new ResizeObserver((t) => {
              let r, n;
              if (!Array.isArray(t) || !t.length) return;
              let i = t[0];
              if ("borderBoxSize" in i) {
                let e = i.borderBoxSize,
                  t = Array.isArray(e) ? e[0] : e;
                ((r = t.inlineSize), (n = t.blockSize));
              } else ((r = e.offsetWidth), (n = e.offsetHeight));
              o({ width: r, height: n });
            });
            return (t.observe(e, { box: "border-box" }), () => t.unobserve(e));
          }
          o(void 0);
        }, [e]),
        n
      );
    }
    e.s(["useSize", () => n]);
  },
  733174,
  268024,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function r(e) {
      let r = t.useRef(e);
      return (
        t.useEffect(() => {
          r.current = e;
        }),
        t.useMemo(
          () =>
            (...e) =>
              r.current?.(...e),
          [],
        )
      );
    }
    function n(e, o = globalThis?.document) {
      let i = r(e);
      t.useEffect(() => {
        let e = (e) => {
          "Escape" === e.key && i(e);
        };
        return (
          o.addEventListener("keydown", e, { capture: !0 }),
          () => o.removeEventListener("keydown", e, { capture: !0 })
        );
      }, [i, o]);
    }
    (e.s(["useCallbackRef", () => r], 733174),
      e.s(["useEscapeKeydown", () => n], 268024));
  },
  62535,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(590285),
      n = e.i(301224),
      o = Object.freeze({
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
      }),
      i = t.forwardRef((e, t) =>
        (0, n.jsx)(r.Primitive.span, {
          ...e,
          ref: t,
          style: { ...o, ...e.style },
        }),
      );
    ((i.displayName = "VisuallyHidden"), e.s(["Root", () => i]));
  },
  579890,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(403055);
    let o = r.forwardRef(({ className: e, type: r, children: o, ...i }, a) =>
      (0, t.jsx)("input", {
        className: (0, n.cn)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          e,
        ),
        ref: a,
        type: r,
        ...i,
      }),
    );
    ((o.displayName = "Input"), e.s(["Input", () => o]));
  },
  871598,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(736542),
      n = t[" useId ".trim().toString()] || (() => void 0),
      o = 0;
    function i(e) {
      let [i, a] = t.useState(n());
      return (
        (0, r.useLayoutEffect)(() => {
          e || a((e) => e ?? String(o++));
        }, [e]),
        e || (i ? `radix-${i}` : "")
      );
    }
    e.s(["useId", () => i]);
  },
  637118,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(551150),
      n = e.i(45616),
      o = e.i(889655),
      i = e.i(803040),
      a = e.i(633439),
      s = e.i(659671),
      l = e.i(32885),
      u = e.i(391110),
      d = e.i(373630),
      c = e.i(436836),
      f = e.i(973309),
      p = e.i(115479),
      m = e.i(645751),
      v = e.i(851279),
      g = e.i(301224),
      h = "Dialog",
      [x, y] = (0, o.createContextScope)(h),
      [b, w] = x(h),
      C = (e) => {
        let {
            __scopeDialog: r,
            children: n,
            open: o,
            defaultOpen: s,
            onOpenChange: l,
            modal: u = !0,
          } = e,
          d = t.useRef(null),
          c = t.useRef(null),
          [f = !1, p] = (0, a.useControllableState)({
            prop: o,
            defaultProp: s,
            onChange: l,
          });
        return (0, g.jsx)(b, {
          scope: r,
          triggerRef: d,
          contentRef: c,
          contentId: (0, i.useId)(),
          titleId: (0, i.useId)(),
          descriptionId: (0, i.useId)(),
          open: f,
          onOpenChange: p,
          onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
          modal: u,
          children: n,
        });
      };
    C.displayName = h;
    var R = "DialogTrigger",
      j = t.forwardRef((e, t) => {
        let { __scopeDialog: o, ...i } = e,
          a = w(R, o),
          s = (0, n.useComposedRefs)(t, a.triggerRef);
        return (0, g.jsx)(c.Primitive.button, {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": a.open,
          "aria-controls": a.contentId,
          "data-state": G(a.open),
          ...i,
          ref: s,
          onClick: (0, r.composeEventHandlers)(e.onClick, a.onOpenToggle),
        });
      });
    j.displayName = R;
    var D = "DialogPortal",
      [M, S] = x(D, { forceMount: void 0 }),
      _ = (e) => {
        let { __scopeDialog: r, forceMount: n, children: o, container: i } = e,
          a = w(D, r);
        return (0, g.jsx)(M, {
          scope: r,
          forceMount: n,
          children: t.Children.map(o, (e) =>
            (0, g.jsx)(d.Presence, {
              present: n || a.open,
              children: (0, g.jsx)(u.Portal, {
                asChild: !0,
                container: i,
                children: e,
              }),
            }),
          ),
        });
      };
    _.displayName = D;
    var E = "DialogOverlay",
      N = t.forwardRef((e, t) => {
        let r = S(E, e.__scopeDialog),
          { forceMount: n = r.forceMount, ...o } = e,
          i = w(E, e.__scopeDialog);
        return i.modal
          ? (0, g.jsx)(d.Presence, {
              present: n || i.open,
              children: (0, g.jsx)(P, { ...o, ref: t }),
            })
          : null;
      });
    N.displayName = E;
    var P = t.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = w(E, r);
        return (0, g.jsx)(p.RemoveScroll, {
          as: v.Slot,
          allowPinchZoom: !0,
          shards: [o.contentRef],
          children: (0, g.jsx)(c.Primitive.div, {
            "data-state": G(o.open),
            ...n,
            ref: t,
            style: { pointerEvents: "auto", ...n.style },
          }),
        });
      }),
      I = "DialogContent",
      A = t.forwardRef((e, t) => {
        let r = S(I, e.__scopeDialog),
          { forceMount: n = r.forceMount, ...o } = e,
          i = w(I, e.__scopeDialog);
        return (0, g.jsx)(d.Presence, {
          present: n || i.open,
          children: i.modal
            ? (0, g.jsx)(k, { ...o, ref: t })
            : (0, g.jsx)(O, { ...o, ref: t }),
        });
      });
    A.displayName = I;
    var k = t.forwardRef((e, o) => {
        let i = w(I, e.__scopeDialog),
          a = t.useRef(null),
          s = (0, n.useComposedRefs)(o, i.contentRef, a);
        return (
          t.useEffect(() => {
            let e = a.current;
            if (e) return (0, m.hideOthers)(e);
          }, []),
          (0, g.jsx)($, {
            ...e,
            ref: s,
            trapFocus: i.open,
            disableOutsidePointerEvents: !0,
            onCloseAutoFocus: (0, r.composeEventHandlers)(
              e.onCloseAutoFocus,
              (e) => {
                (e.preventDefault(), i.triggerRef.current?.focus());
              },
            ),
            onPointerDownOutside: (0, r.composeEventHandlers)(
              e.onPointerDownOutside,
              (e) => {
                let t = e.detail.originalEvent,
                  r = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || r) && e.preventDefault();
              },
            ),
            onFocusOutside: (0, r.composeEventHandlers)(e.onFocusOutside, (e) =>
              e.preventDefault(),
            ),
          })
        );
      }),
      O = t.forwardRef((e, r) => {
        let n = w(I, e.__scopeDialog),
          o = t.useRef(!1),
          i = t.useRef(!1);
        return (0, g.jsx)($, {
          ...e,
          ref: r,
          trapFocus: !1,
          disableOutsidePointerEvents: !1,
          onCloseAutoFocus: (t) => {
            (e.onCloseAutoFocus?.(t),
              t.defaultPrevented ||
                (o.current || n.triggerRef.current?.focus(),
                t.preventDefault()),
              (o.current = !1),
              (i.current = !1));
          },
          onInteractOutside: (t) => {
            (e.onInteractOutside?.(t),
              t.defaultPrevented ||
                ((o.current = !0),
                "pointerdown" === t.detail.originalEvent.type &&
                  (i.current = !0)));
            let r = t.target;
            (n.triggerRef.current?.contains(r) && t.preventDefault(),
              "focusin" === t.detail.originalEvent.type &&
                i.current &&
                t.preventDefault());
          },
        });
      }),
      $ = t.forwardRef((e, r) => {
        let {
            __scopeDialog: o,
            trapFocus: i,
            onOpenAutoFocus: a,
            onCloseAutoFocus: u,
            ...d
          } = e,
          c = w(I, o),
          p = t.useRef(null),
          m = (0, n.useComposedRefs)(r, p);
        return (
          (0, f.useFocusGuards)(),
          (0, g.jsxs)(g.Fragment, {
            children: [
              (0, g.jsx)(l.FocusScope, {
                asChild: !0,
                loop: !0,
                trapped: i,
                onMountAutoFocus: a,
                onUnmountAutoFocus: u,
                children: (0, g.jsx)(s.DismissableLayer, {
                  role: "dialog",
                  id: c.contentId,
                  "aria-describedby": c.descriptionId,
                  "aria-labelledby": c.titleId,
                  "data-state": G(c.open),
                  ...d,
                  ref: m,
                  onDismiss: () => c.onOpenChange(!1),
                }),
              }),
              (0, g.jsxs)(g.Fragment, {
                children: [
                  (0, g.jsx)(U, { titleId: c.titleId }),
                  (0, g.jsx)(X, {
                    contentRef: p,
                    descriptionId: c.descriptionId,
                  }),
                ],
              }),
            ],
          })
        );
      }),
      T = "DialogTitle",
      F = t.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = w(T, r);
        return (0, g.jsx)(c.Primitive.h2, { id: o.titleId, ...n, ref: t });
      });
    F.displayName = T;
    var H = "DialogDescription",
      L = t.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = w(H, r);
        return (0, g.jsx)(c.Primitive.p, { id: o.descriptionId, ...n, ref: t });
      });
    L.displayName = H;
    var z = "DialogClose",
      K = t.forwardRef((e, t) => {
        let { __scopeDialog: n, ...o } = e,
          i = w(z, n);
        return (0, g.jsx)(c.Primitive.button, {
          type: "button",
          ...o,
          ref: t,
          onClick: (0, r.composeEventHandlers)(e.onClick, () =>
            i.onOpenChange(!1),
          ),
        });
      });
    function G(e) {
      return e ? "open" : "closed";
    }
    K.displayName = z;
    var W = "DialogTitleWarning",
      [B, V] = (0, o.createContext)(W, {
        contentName: I,
        titleName: T,
        docsSlug: "dialog",
      }),
      U = ({ titleId: e }) => {
        let r = V(W),
          n = `\`${r.contentName}\` requires a \`${r.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${r.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${r.docsSlug}`;
        return (
          t.useEffect(() => {
            e && (document.getElementById(e) || console.error(n));
          }, [n, e]),
          null
        );
      },
      X = ({ contentRef: e, descriptionId: r }) => {
        let n = V("DialogDescriptionWarning"),
          o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
        return (
          t.useEffect(() => {
            let t = e.current?.getAttribute("aria-describedby");
            r && t && (document.getElementById(r) || console.warn(o));
          }, [o, e, r]),
          null
        );
      };
    e.s([
      "Close",
      () => K,
      "Content",
      () => A,
      "Description",
      () => L,
      "Dialog",
      () => C,
      "DialogClose",
      () => K,
      "DialogContent",
      () => A,
      "DialogDescription",
      () => L,
      "DialogOverlay",
      () => N,
      "DialogPortal",
      () => _,
      "DialogTitle",
      () => F,
      "DialogTrigger",
      () => j,
      "Overlay",
      () => N,
      "Portal",
      () => _,
      "Root",
      () => C,
      "Title",
      () => F,
      "Trigger",
      () => j,
      "WarningProvider",
      () => B,
      "createDialogScope",
      () => y,
    ]);
  },
  736542,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = globalThis?.document ? t.useLayoutEffect : () => {};
    e.s(["useLayoutEffect", () => r]);
  },
  590285,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(546564),
      n = e.i(890446),
      o = e.i(301224),
      i = [
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
        "select",
        "span",
        "svg",
        "ul",
      ].reduce((e, r) => {
        let i = (0, n.createSlot)(`Primitive.${r}`),
          a = t.forwardRef((e, t) => {
            let { asChild: n, ...a } = e;
            return (
              "undefined" != typeof window &&
                (window[Symbol.for("radix-ui")] = !0),
              (0, o.jsx)(n ? i : r, { ...a, ref: t })
            );
          });
        return ((a.displayName = `Primitive.${r}`), { ...e, [r]: a });
      }, {});
    function a(e, t) {
      e && r.flushSync(() => e.dispatchEvent(t));
    }
    e.s(["Primitive", () => i, "dispatchDiscreteCustomEvent", () => a]);
  },
  975946,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(736542);
    (t[" useEffectEvent ".trim().toString()],
      t[" useInsertionEffect ".trim().toString()]);
    var n = t[" useInsertionEffect ".trim().toString()] || r.useLayoutEffect;
    function o({ prop: e, defaultProp: r, onChange: o = () => {}, caller: i }) {
      let [a, s, l] = (function ({ defaultProp: e, onChange: r }) {
          let [o, i] = t.useState(e),
            a = t.useRef(o),
            s = t.useRef(r);
          return (
            n(() => {
              s.current = r;
            }, [r]),
            t.useEffect(() => {
              a.current !== o && (s.current?.(o), (a.current = o));
            }, [o, a]),
            [o, i, s]
          );
        })({ defaultProp: r, onChange: o }),
        u = void 0 !== e,
        d = u ? e : a;
      {
        let r = t.useRef(void 0 !== e);
        t.useEffect(() => {
          let e = r.current;
          if (e !== u) {
            let t = u ? "controlled" : "uncontrolled";
            console.warn(
              `${i} is changing from ${e ? "controlled" : "uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
            );
          }
          r.current = u;
        }, [u, i]);
      }
      return [
        d,
        t.useCallback(
          (t) => {
            if (u) {
              let r = "function" == typeof t ? t(e) : t;
              r !== e && l.current?.(r);
            } else s(t);
          },
          [u, e, s, l],
        ),
      ];
    }
    (Symbol("RADIX:SYNC_STATE"),
      e.s(["useControllableState", () => o], 975946));
  },
  292948,
  905732,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(551150),
      o = e.i(45616),
      i = e.i(889655),
      a = e.i(633439),
      s = e.i(436836),
      l = e.i(682586),
      u = e.i(282270),
      d = e.i(659671),
      c = e.i(973309),
      f = e.i(32885),
      p = e.i(803040),
      m = e.i(956349),
      v = e.i(391110),
      g = e.i(373630),
      h = e.i(151879),
      x = e.i(851279),
      y = e.i(867645),
      b = e.i(645751),
      w = e.i(115479),
      C = ["Enter", " "],
      R = ["ArrowUp", "PageDown", "End"],
      j = ["ArrowDown", "PageUp", "Home", ...R],
      D = { ltr: [...C, "ArrowRight"], rtl: [...C, "ArrowLeft"] },
      M = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
      S = "Menu",
      [_, E, N] = (0, l.createCollection)(S),
      [P, I] = (0, i.createContextScope)(S, [
        N,
        m.createPopperScope,
        h.createRovingFocusGroupScope,
      ]),
      A = (0, m.createPopperScope)(),
      k = (0, h.createRovingFocusGroupScope)(),
      [O, $] = P(S),
      [T, F] = P(S),
      H = (e) => {
        let {
            __scopeMenu: n,
            open: o = !1,
            children: i,
            dir: a,
            onOpenChange: s,
            modal: l = !0,
          } = e,
          d = A(n),
          [c, f] = r.useState(null),
          p = r.useRef(!1),
          v = (0, y.useCallbackRef)(s),
          g = (0, u.useDirection)(a);
        return (
          r.useEffect(() => {
            let e = () => {
                ((p.current = !0),
                  document.addEventListener("pointerdown", t, {
                    capture: !0,
                    once: !0,
                  }),
                  document.addEventListener("pointermove", t, {
                    capture: !0,
                    once: !0,
                  }));
              },
              t = () => (p.current = !1);
            return (
              document.addEventListener("keydown", e, { capture: !0 }),
              () => {
                (document.removeEventListener("keydown", e, { capture: !0 }),
                  document.removeEventListener("pointerdown", t, {
                    capture: !0,
                  }),
                  document.removeEventListener("pointermove", t, {
                    capture: !0,
                  }));
              }
            );
          }, []),
          (0, t.jsx)(m.Root, {
            ...d,
            children: (0, t.jsx)(O, {
              scope: n,
              open: o,
              onOpenChange: v,
              content: c,
              onContentChange: f,
              children: (0, t.jsx)(T, {
                scope: n,
                onClose: r.useCallback(() => v(!1), [v]),
                isUsingKeyboardRef: p,
                dir: g,
                modal: l,
                children: i,
              }),
            }),
          })
        );
      };
    H.displayName = S;
    var L = r.forwardRef((e, r) => {
      let { __scopeMenu: n, ...o } = e,
        i = A(n);
      return (0, t.jsx)(m.Anchor, { ...i, ...o, ref: r });
    });
    L.displayName = "MenuAnchor";
    var z = "MenuPortal",
      [K, G] = P(z, { forceMount: void 0 }),
      W = (e) => {
        let { __scopeMenu: r, forceMount: n, children: o, container: i } = e,
          a = $(z, r);
        return (0, t.jsx)(K, {
          scope: r,
          forceMount: n,
          children: (0, t.jsx)(g.Presence, {
            present: n || a.open,
            children: (0, t.jsx)(v.Portal, {
              asChild: !0,
              container: i,
              children: o,
            }),
          }),
        });
      };
    W.displayName = z;
    var B = "MenuContent",
      [V, U] = P(B),
      X = r.forwardRef((e, r) => {
        let n = G(B, e.__scopeMenu),
          { forceMount: o = n.forceMount, ...i } = e,
          a = $(B, e.__scopeMenu),
          s = F(B, e.__scopeMenu);
        return (0, t.jsx)(_.Provider, {
          scope: e.__scopeMenu,
          children: (0, t.jsx)(g.Presence, {
            present: o || a.open,
            children: (0, t.jsx)(_.Slot, {
              scope: e.__scopeMenu,
              children: s.modal
                ? (0, t.jsx)(Y, { ...i, ref: r })
                : (0, t.jsx)(q, { ...i, ref: r }),
            }),
          }),
        });
      }),
      Y = r.forwardRef((e, i) => {
        let a = $(B, e.__scopeMenu),
          s = r.useRef(null),
          l = (0, o.useComposedRefs)(i, s);
        return (
          r.useEffect(() => {
            let e = s.current;
            if (e) return (0, b.hideOthers)(e);
          }, []),
          (0, t.jsx)(Z, {
            ...e,
            ref: l,
            trapFocus: a.open,
            disableOutsidePointerEvents: a.open,
            disableOutsideScroll: !0,
            onFocusOutside: (0, n.composeEventHandlers)(
              e.onFocusOutside,
              (e) => e.preventDefault(),
              { checkForDefaultPrevented: !1 },
            ),
            onDismiss: () => a.onOpenChange(!1),
          })
        );
      }),
      q = r.forwardRef((e, r) => {
        let n = $(B, e.__scopeMenu);
        return (0, t.jsx)(Z, {
          ...e,
          ref: r,
          trapFocus: !1,
          disableOutsidePointerEvents: !1,
          disableOutsideScroll: !1,
          onDismiss: () => n.onOpenChange(!1),
        });
      }),
      Z = r.forwardRef((e, i) => {
        let {
            __scopeMenu: a,
            loop: s = !1,
            trapFocus: l,
            onOpenAutoFocus: u,
            onCloseAutoFocus: p,
            disableOutsidePointerEvents: v,
            onEntryFocus: g,
            onEscapeKeyDown: y,
            onPointerDownOutside: b,
            onFocusOutside: C,
            onInteractOutside: D,
            onDismiss: M,
            disableOutsideScroll: S,
            ..._
          } = e,
          N = $(B, a),
          P = F(B, a),
          I = A(a),
          O = k(a),
          T = E(a),
          [H, L] = r.useState(null),
          z = r.useRef(null),
          K = (0, o.useComposedRefs)(i, z, N.onContentChange),
          G = r.useRef(0),
          W = r.useRef(""),
          U = r.useRef(0),
          X = r.useRef(null),
          Y = r.useRef("right"),
          q = r.useRef(0),
          Z = S ? w.RemoveScroll : r.Fragment,
          Q = S ? { as: x.Slot, allowPinchZoom: !0 } : void 0;
        (r.useEffect(() => () => window.clearTimeout(G.current), []),
          (0, c.useFocusGuards)());
        let J = r.useCallback((e) => {
          var t, r;
          return (
            Y.current === X.current?.side &&
            ((t = e),
            !!(r = X.current?.area) &&
              (function (e, t) {
                let { x: r, y: n } = e,
                  o = !1;
                for (let e = 0, i = t.length - 1; e < t.length; i = e++) {
                  let a = t[e].x,
                    s = t[e].y,
                    l = t[i].x,
                    u = t[i].y;
                  s > n != u > n &&
                    r < ((l - a) * (n - s)) / (u - s) + a &&
                    (o = !o);
                }
                return o;
              })({ x: t.clientX, y: t.clientY }, r))
          );
        }, []);
        return (0, t.jsx)(V, {
          scope: a,
          searchRef: W,
          onItemEnter: r.useCallback(
            (e) => {
              J(e) && e.preventDefault();
            },
            [J],
          ),
          onItemLeave: r.useCallback(
            (e) => {
              J(e) || (z.current?.focus(), L(null));
            },
            [J],
          ),
          onTriggerLeave: r.useCallback(
            (e) => {
              J(e) && e.preventDefault();
            },
            [J],
          ),
          pointerGraceTimerRef: U,
          onPointerGraceIntentChange: r.useCallback((e) => {
            X.current = e;
          }, []),
          children: (0, t.jsx)(Z, {
            ...Q,
            children: (0, t.jsx)(f.FocusScope, {
              asChild: !0,
              trapped: l,
              onMountAutoFocus: (0, n.composeEventHandlers)(u, (e) => {
                (e.preventDefault(), z.current?.focus({ preventScroll: !0 }));
              }),
              onUnmountAutoFocus: p,
              children: (0, t.jsx)(d.DismissableLayer, {
                asChild: !0,
                disableOutsidePointerEvents: v,
                onEscapeKeyDown: y,
                onPointerDownOutside: b,
                onFocusOutside: C,
                onInteractOutside: D,
                onDismiss: M,
                children: (0, t.jsx)(h.Root, {
                  asChild: !0,
                  ...O,
                  dir: P.dir,
                  orientation: "vertical",
                  loop: s,
                  currentTabStopId: H,
                  onCurrentTabStopIdChange: L,
                  onEntryFocus: (0, n.composeEventHandlers)(g, (e) => {
                    P.isUsingKeyboardRef.current || e.preventDefault();
                  }),
                  preventScrollOnEntryFocus: !0,
                  children: (0, t.jsx)(m.Content, {
                    role: "menu",
                    "aria-orientation": "vertical",
                    "data-state": eD(N.open),
                    "data-radix-menu-content": "",
                    dir: P.dir,
                    ...I,
                    ..._,
                    ref: K,
                    style: { outline: "none", ..._.style },
                    onKeyDown: (0, n.composeEventHandlers)(_.onKeyDown, (e) => {
                      let t =
                          e.target.closest("[data-radix-menu-content]") ===
                          e.currentTarget,
                        r = e.ctrlKey || e.altKey || e.metaKey,
                        n = 1 === e.key.length;
                      if (t) {
                        var o;
                        let t, i, a, s, l, u;
                        ("Tab" === e.key && e.preventDefault(),
                          !r &&
                            n &&
                            ((o = e.key),
                            (t = W.current + o),
                            (i = T().filter((e) => !e.disabled)),
                            (a = document.activeElement),
                            (s = i.find((e) => e.ref.current === a)?.textValue),
                            (l = (function (e, t, r) {
                              var n;
                              let o =
                                  t.length > 1 &&
                                  Array.from(t).every((e) => e === t[0])
                                    ? t[0]
                                    : t,
                                i = r ? e.indexOf(r) : -1,
                                a =
                                  ((n = Math.max(i, 0)),
                                  e.map((t, r) => e[(n + r) % e.length]));
                              1 === o.length && (a = a.filter((e) => e !== r));
                              let s = a.find((e) =>
                                e.toLowerCase().startsWith(o.toLowerCase()),
                              );
                              return s !== r ? s : void 0;
                            })(
                              i.map((e) => e.textValue),
                              t,
                              s,
                            )),
                            (u = i.find((e) => e.textValue === l)?.ref.current),
                            (function e(t) {
                              ((W.current = t),
                                window.clearTimeout(G.current),
                                "" !== t &&
                                  (G.current = window.setTimeout(
                                    () => e(""),
                                    1e3,
                                  )));
                            })(t),
                            u && setTimeout(() => u.focus())));
                      }
                      let i = z.current;
                      if (e.target !== i || !j.includes(e.key)) return;
                      e.preventDefault();
                      let a = T()
                        .filter((e) => !e.disabled)
                        .map((e) => e.ref.current);
                      (R.includes(e.key) && a.reverse(),
                        (function (e) {
                          let t = document.activeElement;
                          for (let r of e)
                            if (
                              r === t ||
                              (r.focus(), document.activeElement !== t)
                            )
                              return;
                        })(a));
                    }),
                    onBlur: (0, n.composeEventHandlers)(e.onBlur, (e) => {
                      e.currentTarget.contains(e.target) ||
                        (window.clearTimeout(G.current), (W.current = ""));
                    }),
                    onPointerMove: (0, n.composeEventHandlers)(
                      e.onPointerMove,
                      e_((e) => {
                        let t = e.target,
                          r = q.current !== e.clientX;
                        e.currentTarget.contains(t) &&
                          r &&
                          ((Y.current =
                            e.clientX > q.current ? "right" : "left"),
                          (q.current = e.clientX));
                      }),
                    ),
                  }),
                }),
              }),
            }),
          }),
        });
      });
    X.displayName = B;
    var Q = r.forwardRef((e, r) => {
      let { __scopeMenu: n, ...o } = e;
      return (0, t.jsx)(s.Primitive.div, { role: "group", ...o, ref: r });
    });
    Q.displayName = "MenuGroup";
    var J = r.forwardRef((e, r) => {
      let { __scopeMenu: n, ...o } = e;
      return (0, t.jsx)(s.Primitive.div, { ...o, ref: r });
    });
    J.displayName = "MenuLabel";
    var ee = "MenuItem",
      et = "menu.itemSelect",
      er = r.forwardRef((e, i) => {
        let { disabled: a = !1, onSelect: l, ...u } = e,
          d = r.useRef(null),
          c = F(ee, e.__scopeMenu),
          f = U(ee, e.__scopeMenu),
          p = (0, o.useComposedRefs)(i, d),
          m = r.useRef(!1);
        return (0, t.jsx)(en, {
          ...u,
          ref: p,
          disabled: a,
          onClick: (0, n.composeEventHandlers)(e.onClick, () => {
            let e = d.current;
            if (!a && e) {
              let t = new CustomEvent(et, { bubbles: !0, cancelable: !0 });
              (e.addEventListener(et, (e) => l?.(e), { once: !0 }),
                (0, s.dispatchDiscreteCustomEvent)(e, t),
                t.defaultPrevented ? (m.current = !1) : c.onClose());
            }
          }),
          onPointerDown: (t) => {
            (e.onPointerDown?.(t), (m.current = !0));
          },
          onPointerUp: (0, n.composeEventHandlers)(e.onPointerUp, (e) => {
            m.current || e.currentTarget?.click();
          }),
          onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
            let t = "" !== f.searchRef.current;
            a ||
              (t && " " === e.key) ||
              (C.includes(e.key) &&
                (e.currentTarget.click(), e.preventDefault()));
          }),
        });
      });
    er.displayName = ee;
    var en = r.forwardRef((e, i) => {
        let { __scopeMenu: a, disabled: l = !1, textValue: u, ...d } = e,
          c = U(ee, a),
          f = k(a),
          p = r.useRef(null),
          m = (0, o.useComposedRefs)(i, p),
          [v, g] = r.useState(!1),
          [x, y] = r.useState("");
        return (
          r.useEffect(() => {
            let e = p.current;
            e && y((e.textContent ?? "").trim());
          }, [d.children]),
          (0, t.jsx)(_.ItemSlot, {
            scope: a,
            disabled: l,
            textValue: u ?? x,
            children: (0, t.jsx)(h.Item, {
              asChild: !0,
              ...f,
              focusable: !l,
              children: (0, t.jsx)(s.Primitive.div, {
                role: "menuitem",
                "data-highlighted": v ? "" : void 0,
                "aria-disabled": l || void 0,
                "data-disabled": l ? "" : void 0,
                ...d,
                ref: m,
                onPointerMove: (0, n.composeEventHandlers)(
                  e.onPointerMove,
                  e_((e) => {
                    l
                      ? c.onItemLeave(e)
                      : (c.onItemEnter(e),
                        e.defaultPrevented ||
                          e.currentTarget.focus({ preventScroll: !0 }));
                  }),
                ),
                onPointerLeave: (0, n.composeEventHandlers)(
                  e.onPointerLeave,
                  e_((e) => c.onItemLeave(e)),
                ),
                onFocus: (0, n.composeEventHandlers)(e.onFocus, () => g(!0)),
                onBlur: (0, n.composeEventHandlers)(e.onBlur, () => g(!1)),
              }),
            }),
          })
        );
      }),
      eo = r.forwardRef((e, r) => {
        let { checked: o = !1, onCheckedChange: i, ...a } = e;
        return (0, t.jsx)(ef, {
          scope: e.__scopeMenu,
          checked: o,
          children: (0, t.jsx)(er, {
            role: "menuitemcheckbox",
            "aria-checked": eM(o) ? "mixed" : o,
            ...a,
            ref: r,
            "data-state": eS(o),
            onSelect: (0, n.composeEventHandlers)(
              a.onSelect,
              () => i?.(!!eM(o) || !o),
              { checkForDefaultPrevented: !1 },
            ),
          }),
        });
      });
    eo.displayName = "MenuCheckboxItem";
    var ei = "MenuRadioGroup",
      [ea, es] = P(ei, { value: void 0, onValueChange: () => {} }),
      el = r.forwardRef((e, r) => {
        let { value: n, onValueChange: o, ...i } = e,
          a = (0, y.useCallbackRef)(o);
        return (0, t.jsx)(ea, {
          scope: e.__scopeMenu,
          value: n,
          onValueChange: a,
          children: (0, t.jsx)(Q, { ...i, ref: r }),
        });
      });
    el.displayName = ei;
    var eu = "MenuRadioItem",
      ed = r.forwardRef((e, r) => {
        let { value: o, ...i } = e,
          a = es(eu, e.__scopeMenu),
          s = o === a.value;
        return (0, t.jsx)(ef, {
          scope: e.__scopeMenu,
          checked: s,
          children: (0, t.jsx)(er, {
            role: "menuitemradio",
            "aria-checked": s,
            ...i,
            ref: r,
            "data-state": eS(s),
            onSelect: (0, n.composeEventHandlers)(
              i.onSelect,
              () => a.onValueChange?.(o),
              { checkForDefaultPrevented: !1 },
            ),
          }),
        });
      });
    ed.displayName = eu;
    var ec = "MenuItemIndicator",
      [ef, ep] = P(ec, { checked: !1 }),
      em = r.forwardRef((e, r) => {
        let { __scopeMenu: n, forceMount: o, ...i } = e,
          a = ep(ec, n);
        return (0, t.jsx)(g.Presence, {
          present: o || eM(a.checked) || !0 === a.checked,
          children: (0, t.jsx)(s.Primitive.span, {
            ...i,
            ref: r,
            "data-state": eS(a.checked),
          }),
        });
      });
    em.displayName = ec;
    var ev = r.forwardRef((e, r) => {
      let { __scopeMenu: n, ...o } = e;
      return (0, t.jsx)(s.Primitive.div, {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: r,
      });
    });
    ev.displayName = "MenuSeparator";
    var eg = r.forwardRef((e, r) => {
      let { __scopeMenu: n, ...o } = e,
        i = A(n);
      return (0, t.jsx)(m.Arrow, { ...i, ...o, ref: r });
    });
    eg.displayName = "MenuArrow";
    var eh = "MenuSub",
      [ex, ey] = P(eh),
      eb = (e) => {
        let { __scopeMenu: n, children: o, open: i = !1, onOpenChange: a } = e,
          s = $(eh, n),
          l = A(n),
          [u, d] = r.useState(null),
          [c, f] = r.useState(null),
          v = (0, y.useCallbackRef)(a);
        return (
          r.useEffect(() => (!1 === s.open && v(!1), () => v(!1)), [s.open, v]),
          (0, t.jsx)(m.Root, {
            ...l,
            children: (0, t.jsx)(O, {
              scope: n,
              open: i,
              onOpenChange: v,
              content: c,
              onContentChange: f,
              children: (0, t.jsx)(ex, {
                scope: n,
                contentId: (0, p.useId)(),
                triggerId: (0, p.useId)(),
                trigger: u,
                onTriggerChange: d,
                children: o,
              }),
            }),
          })
        );
      };
    eb.displayName = eh;
    var ew = "MenuSubTrigger",
      eC = r.forwardRef((e, i) => {
        let a = $(ew, e.__scopeMenu),
          s = F(ew, e.__scopeMenu),
          l = ey(ew, e.__scopeMenu),
          u = U(ew, e.__scopeMenu),
          d = r.useRef(null),
          { pointerGraceTimerRef: c, onPointerGraceIntentChange: f } = u,
          p = { __scopeMenu: e.__scopeMenu },
          m = r.useCallback(() => {
            (d.current && window.clearTimeout(d.current), (d.current = null));
          }, []);
        return (
          r.useEffect(() => m, [m]),
          r.useEffect(() => {
            let e = c.current;
            return () => {
              (window.clearTimeout(e), f(null));
            };
          }, [c, f]),
          (0, t.jsx)(L, {
            asChild: !0,
            ...p,
            children: (0, t.jsx)(en, {
              id: l.triggerId,
              "aria-haspopup": "menu",
              "aria-expanded": a.open,
              "aria-controls": l.contentId,
              "data-state": eD(a.open),
              ...e,
              ref: (0, o.composeRefs)(i, l.onTriggerChange),
              onClick: (t) => {
                (e.onClick?.(t),
                  e.disabled ||
                    t.defaultPrevented ||
                    (t.currentTarget.focus(), a.open || a.onOpenChange(!0)));
              },
              onPointerMove: (0, n.composeEventHandlers)(
                e.onPointerMove,
                e_((t) => {
                  (u.onItemEnter(t),
                    !t.defaultPrevented &&
                      (e.disabled ||
                        a.open ||
                        d.current ||
                        (u.onPointerGraceIntentChange(null),
                        (d.current = window.setTimeout(() => {
                          (a.onOpenChange(!0), m());
                        }, 100)))));
                }),
              ),
              onPointerLeave: (0, n.composeEventHandlers)(
                e.onPointerLeave,
                e_((e) => {
                  m();
                  let t = a.content?.getBoundingClientRect();
                  if (t) {
                    let r = a.content?.dataset.side,
                      n = "right" === r,
                      o = t[n ? "left" : "right"],
                      i = t[n ? "right" : "left"];
                    (u.onPointerGraceIntentChange({
                      area: [
                        { x: e.clientX + (n ? -5 : 5), y: e.clientY },
                        { x: o, y: t.top },
                        { x: i, y: t.top },
                        { x: i, y: t.bottom },
                        { x: o, y: t.bottom },
                      ],
                      side: r,
                    }),
                      window.clearTimeout(c.current),
                      (c.current = window.setTimeout(
                        () => u.onPointerGraceIntentChange(null),
                        300,
                      )));
                  } else {
                    if ((u.onTriggerLeave(e), e.defaultPrevented)) return;
                    u.onPointerGraceIntentChange(null);
                  }
                }),
              ),
              onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (t) => {
                let r = "" !== u.searchRef.current;
                e.disabled ||
                  (r && " " === t.key) ||
                  (D[s.dir].includes(t.key) &&
                    (a.onOpenChange(!0),
                    a.content?.focus(),
                    t.preventDefault()));
              }),
            }),
          })
        );
      });
    eC.displayName = ew;
    var eR = "MenuSubContent",
      ej = r.forwardRef((e, i) => {
        let a = G(B, e.__scopeMenu),
          { forceMount: s = a.forceMount, ...l } = e,
          u = $(B, e.__scopeMenu),
          d = F(B, e.__scopeMenu),
          c = ey(eR, e.__scopeMenu),
          f = r.useRef(null),
          p = (0, o.useComposedRefs)(i, f);
        return (0, t.jsx)(_.Provider, {
          scope: e.__scopeMenu,
          children: (0, t.jsx)(g.Presence, {
            present: s || u.open,
            children: (0, t.jsx)(_.Slot, {
              scope: e.__scopeMenu,
              children: (0, t.jsx)(Z, {
                id: c.contentId,
                "aria-labelledby": c.triggerId,
                ...l,
                ref: p,
                align: "start",
                side: "rtl" === d.dir ? "left" : "right",
                disableOutsidePointerEvents: !1,
                disableOutsideScroll: !1,
                trapFocus: !1,
                onOpenAutoFocus: (e) => {
                  (d.isUsingKeyboardRef.current && f.current?.focus(),
                    e.preventDefault());
                },
                onCloseAutoFocus: (e) => e.preventDefault(),
                onFocusOutside: (0, n.composeEventHandlers)(
                  e.onFocusOutside,
                  (e) => {
                    e.target !== c.trigger && u.onOpenChange(!1);
                  },
                ),
                onEscapeKeyDown: (0, n.composeEventHandlers)(
                  e.onEscapeKeyDown,
                  (e) => {
                    (d.onClose(), e.preventDefault());
                  },
                ),
                onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
                  let t = e.currentTarget.contains(e.target),
                    r = M[d.dir].includes(e.key);
                  t &&
                    r &&
                    (u.onOpenChange(!1),
                    c.trigger?.focus(),
                    e.preventDefault());
                }),
              }),
            }),
          }),
        });
      });
    function eD(e) {
      return e ? "open" : "closed";
    }
    function eM(e) {
      return "indeterminate" === e;
    }
    function eS(e) {
      return eM(e) ? "indeterminate" : e ? "checked" : "unchecked";
    }
    function e_(e) {
      return (t) => ("mouse" === t.pointerType ? e(t) : void 0);
    }
    ej.displayName = eR;
    var eE = "DropdownMenu",
      [eN, eP] = (0, i.createContextScope)(eE, [I]),
      eI = I(),
      [eA, ek] = eN(eE),
      eO = (e) => {
        let {
            __scopeDropdownMenu: n,
            children: o,
            dir: i,
            open: s,
            defaultOpen: l,
            onOpenChange: u,
            modal: d = !0,
          } = e,
          c = eI(n),
          f = r.useRef(null),
          [m = !1, v] = (0, a.useControllableState)({
            prop: s,
            defaultProp: l,
            onChange: u,
          });
        return (0, t.jsx)(eA, {
          scope: n,
          triggerId: (0, p.useId)(),
          triggerRef: f,
          contentId: (0, p.useId)(),
          open: m,
          onOpenChange: v,
          onOpenToggle: r.useCallback(() => v((e) => !e), [v]),
          modal: d,
          children: (0, t.jsx)(H, {
            ...c,
            open: m,
            onOpenChange: v,
            dir: i,
            modal: d,
            children: o,
          }),
        });
      };
    eO.displayName = eE;
    var e$ = "DropdownMenuTrigger",
      eT = r.forwardRef((e, r) => {
        let { __scopeDropdownMenu: i, disabled: a = !1, ...l } = e,
          u = ek(e$, i),
          d = eI(i);
        return (0, t.jsx)(L, {
          asChild: !0,
          ...d,
          children: (0, t.jsx)(s.Primitive.button, {
            type: "button",
            id: u.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": u.open,
            "aria-controls": u.open ? u.contentId : void 0,
            "data-state": u.open ? "open" : "closed",
            "data-disabled": a ? "" : void 0,
            disabled: a,
            ...l,
            ref: (0, o.composeRefs)(r, u.triggerRef),
            onPointerDown: (0, n.composeEventHandlers)(e.onPointerDown, (e) => {
              !a &&
                0 === e.button &&
                !1 === e.ctrlKey &&
                (u.onOpenToggle(), u.open || e.preventDefault());
            }),
            onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
              !a &&
                (["Enter", " "].includes(e.key) && u.onOpenToggle(),
                "ArrowDown" === e.key && u.onOpenChange(!0),
                ["Enter", " ", "ArrowDown"].includes(e.key) &&
                  e.preventDefault());
            }),
          }),
        });
      });
    eT.displayName = e$;
    var eF = (e) => {
      let { __scopeDropdownMenu: r, ...n } = e,
        o = eI(r);
      return (0, t.jsx)(W, { ...o, ...n });
    };
    eF.displayName = "DropdownMenuPortal";
    var eH = "DropdownMenuContent",
      eL = r.forwardRef((e, o) => {
        let { __scopeDropdownMenu: i, ...a } = e,
          s = ek(eH, i),
          l = eI(i),
          u = r.useRef(!1);
        return (0, t.jsx)(X, {
          id: s.contentId,
          "aria-labelledby": s.triggerId,
          ...l,
          ...a,
          ref: o,
          onCloseAutoFocus: (0, n.composeEventHandlers)(
            e.onCloseAutoFocus,
            (e) => {
              (u.current || s.triggerRef.current?.focus(),
                (u.current = !1),
                e.preventDefault());
            },
          ),
          onInteractOutside: (0, n.composeEventHandlers)(
            e.onInteractOutside,
            (e) => {
              let t = e.detail.originalEvent,
                r = 0 === t.button && !0 === t.ctrlKey,
                n = 2 === t.button || r;
              (!s.modal || n) && (u.current = !0);
            },
          ),
          style: {
            ...e.style,
            "--radix-dropdown-menu-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-dropdown-menu-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-dropdown-menu-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-dropdown-menu-trigger-width":
              "var(--radix-popper-anchor-width)",
            "--radix-dropdown-menu-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
        });
      });
    eL.displayName = eH;
    var ez = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(Q, { ...i, ...o, ref: r });
    });
    ez.displayName = "DropdownMenuGroup";
    var eK = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(J, { ...i, ...o, ref: r });
    });
    eK.displayName = "DropdownMenuLabel";
    var eG = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(er, { ...i, ...o, ref: r });
    });
    eG.displayName = "DropdownMenuItem";
    var eW = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(eo, { ...i, ...o, ref: r });
    });
    eW.displayName = "DropdownMenuCheckboxItem";
    var eB = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(el, { ...i, ...o, ref: r });
    });
    eB.displayName = "DropdownMenuRadioGroup";
    var eV = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(ed, { ...i, ...o, ref: r });
    });
    eV.displayName = "DropdownMenuRadioItem";
    var eU = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(em, { ...i, ...o, ref: r });
    });
    eU.displayName = "DropdownMenuItemIndicator";
    var eX = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(ev, { ...i, ...o, ref: r });
    });
    eX.displayName = "DropdownMenuSeparator";
    var eY = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(eg, { ...i, ...o, ref: r });
    });
    eY.displayName = "DropdownMenuArrow";
    var eq = (e) => {
        let {
            __scopeDropdownMenu: r,
            children: n,
            open: o,
            onOpenChange: i,
            defaultOpen: s,
          } = e,
          l = eI(r),
          [u = !1, d] = (0, a.useControllableState)({
            prop: o,
            defaultProp: s,
            onChange: i,
          });
        return (0, t.jsx)(eb, { ...l, open: u, onOpenChange: d, children: n });
      },
      eZ = r.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...o } = e,
          i = eI(n);
        return (0, t.jsx)(eC, { ...i, ...o, ref: r });
      });
    eZ.displayName = "DropdownMenuSubTrigger";
    var eQ = r.forwardRef((e, r) => {
      let { __scopeDropdownMenu: n, ...o } = e,
        i = eI(n);
      return (0, t.jsx)(ej, {
        ...i,
        ...o,
        ref: r,
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin":
            "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width":
            "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height":
            "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width":
            "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height":
            "var(--radix-popper-anchor-height)",
        },
      });
    });
    ((eQ.displayName = "DropdownMenuSubContent"),
      e.s(
        [
          "Arrow",
          () => eY,
          "CheckboxItem",
          () => eW,
          "Content",
          () => eL,
          "DropdownMenu",
          () => eO,
          "DropdownMenuArrow",
          () => eY,
          "DropdownMenuCheckboxItem",
          () => eW,
          "DropdownMenuContent",
          () => eL,
          "DropdownMenuGroup",
          () => ez,
          "DropdownMenuItem",
          () => eG,
          "DropdownMenuItemIndicator",
          () => eU,
          "DropdownMenuLabel",
          () => eK,
          "DropdownMenuPortal",
          () => eF,
          "DropdownMenuRadioGroup",
          () => eB,
          "DropdownMenuRadioItem",
          () => eV,
          "DropdownMenuSeparator",
          () => eX,
          "DropdownMenuSub",
          () => eq,
          "DropdownMenuSubContent",
          () => eQ,
          "DropdownMenuSubTrigger",
          () => eZ,
          "DropdownMenuTrigger",
          () => eT,
          "Group",
          () => ez,
          "Item",
          () => eG,
          "ItemIndicator",
          () => eU,
          "Label",
          () => eK,
          "Portal",
          () => eF,
          "RadioGroup",
          () => eB,
          "RadioItem",
          () => eV,
          "Root",
          () => eO,
          "Separator",
          () => eX,
          "Sub",
          () => eq,
          "SubContent",
          () => eQ,
          "SubTrigger",
          () => eZ,
          "Trigger",
          () => eT,
          "createDropdownMenuScope",
          () => eP,
        ],
        905732,
      ));
    var eJ = e.i(621553),
      e0 = e.i(615793),
      e1 = e.i(731037),
      e2 = e.i(403055);
    let e8 = r.forwardRef(({ className: e, inset: r, children: n, ...o }, i) =>
      (0, t.jsxs)(eZ, {
        className: (0, e2.cn)(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent",
          r && "pl-8",
          e,
        ),
        ref: i,
        ...o,
        children: [
          n,
          (0, t.jsx)(e0.ChevronRight, { className: "ml-auto h-4 w-4" }),
        ],
      }),
    );
    e8.displayName = eZ.displayName;
    let e5 = r.forwardRef(({ className: e, ...r }, n) =>
      (0, t.jsx)(eQ, {
        className: (0, e2.cn)(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          e,
        ),
        ref: n,
        ...r,
      }),
    );
    e5.displayName = eQ.displayName;
    let e3 = r.forwardRef(({ className: e, sideOffset: r = 4, ...n }, o) =>
      (0, t.jsx)(eF, {
        children: (0, t.jsx)(eL, {
          className: (0, e2.cn)(
            "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e,
          ),
          ref: o,
          sideOffset: r,
          ...n,
        }),
      }),
    );
    e3.displayName = eL.displayName;
    let e6 = r.forwardRef(({ className: e, inset: r, ...n }, o) =>
      (0, t.jsx)(eG, {
        className: (0, e2.cn)(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          r && "pl-8",
          e,
        ),
        ref: o,
        ...n,
      }),
    );
    e6.displayName = eG.displayName;
    let e7 = r.forwardRef(
      ({ className: e, children: r, checked: n, ...o }, i) =>
        (0, t.jsxs)(eW, {
          checked: n,
          className: (0, e2.cn)(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
            e,
          ),
          ref: i,
          ...o,
          children: [
            (0, t.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, t.jsx)(eU, {
                children: (0, t.jsx)(eJ.Check, { className: "h-4 w-4" }),
              }),
            }),
            r,
          ],
        }),
    );
    e7.displayName = eW.displayName;
    let e9 = r.forwardRef(({ className: e, children: r, ...n }, o) =>
      (0, t.jsxs)(eV, {
        className: (0, e2.cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          e,
        ),
        ref: o,
        ...n,
        children: [
          (0, t.jsx)("span", {
            className:
              "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
            children: (0, t.jsx)(eU, {
              children: (0, t.jsx)(e1.Circle, {
                className: "h-2 w-2 fill-current",
              }),
            }),
          }),
          r,
        ],
      }),
    );
    e9.displayName = eV.displayName;
    let e4 = r.forwardRef(({ className: e, inset: r, ...n }, o) =>
      (0, t.jsx)(eK, {
        className: (0, e2.cn)(
          "px-2 py-1.5 text-sm font-semibold",
          r && "pl-8",
          e,
        ),
        ref: o,
        ...n,
      }),
    );
    e4.displayName = eK.displayName;
    let te = r.forwardRef(({ className: e, ...r }, n) =>
      (0, t.jsx)(eX, {
        className: (0, e2.cn)("-mx-1 my-1 h-px bg-muted", e),
        ref: n,
        ...r,
      }),
    );
    te.displayName = eX.displayName;
    let tt = ({ className: e, ...r }) =>
      (0, t.jsx)("span", {
        className: (0, e2.cn)("ml-auto text-xs tracking-widest opacity-60", e),
        ...r,
      });
    ((tt.displayName = "DropdownMenuShortcut"),
      e.s(
        [
          "DropdownMenu",
          () => eO,
          "DropdownMenuCheckboxItem",
          () => e7,
          "DropdownMenuContent",
          () => e3,
          "DropdownMenuGroup",
          () => ez,
          "DropdownMenuItem",
          () => e6,
          "DropdownMenuLabel",
          () => e4,
          "DropdownMenuPortal",
          () => eF,
          "DropdownMenuRadioGroup",
          () => eB,
          "DropdownMenuRadioItem",
          () => e9,
          "DropdownMenuSeparator",
          () => te,
          "DropdownMenuShortcut",
          () => tt,
          "DropdownMenuSub",
          () => eq,
          "DropdownMenuSubContent",
          () => e5,
          "DropdownMenuSubTrigger",
          () => e8,
          "DropdownMenuTrigger",
          () => eT,
        ],
        292948,
      ));
  },
]);
