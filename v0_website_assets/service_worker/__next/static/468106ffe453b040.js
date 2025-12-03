(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  739023,
  (e) => {
    "use strict";
    var t = e.i(31217),
      r = e.i(789783),
      a = e.i(504015);
    let i = "horizontal",
      n = ["horizontal", "vertical"],
      o = (0, r.forwardRef)((e, n) => {
        let { decorative: o, orientation: d = i, ...l } = e,
          u = s(d) ? d : i;
        return (0, r.createElement)(
          a.Primitive.div,
          (0, t.default)(
            { "data-orientation": u },
            o
              ? { role: "none" }
              : {
                  "aria-orientation": "vertical" === u ? u : void 0,
                  role: "separator",
                },
            l,
            { ref: n },
          ),
        );
      });
    function s(e) {
      return n.includes(e);
    }
    ((o.propTypes = {
      orientation(e, t, r) {
        var a, n;
        let o = e[t],
          d = String(o);
        return o && !s(o)
          ? Error(
              ((a = d),
              (n = r),
              `Invalid prop \`orientation\` of value \`${a}\` supplied to \`${n}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${i}\`.`),
            )
          : null;
      },
    }),
      e.s(["Root", () => o, "Separator", () => o]));
  },
  891269,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(221977),
      a = e.i(736542),
      i = (e) => {
        var i;
        let o,
          s,
          { present: d, children: l } = e,
          u = (function (e) {
            var r, i;
            let [o, s] = t.useState(),
              d = t.useRef(null),
              l = t.useRef(e),
              u = t.useRef("none"),
              [c, p] =
                ((r = e ? "mounted" : "unmounted"),
                (i = {
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
                t.useReducer((e, t) => i[e][t] ?? e, r));
            return (
              t.useEffect(() => {
                let e = n(d.current);
                u.current = "mounted" === c ? e : "none";
              }, [c]),
              (0, a.useLayoutEffect)(() => {
                let t = d.current,
                  r = l.current;
                if (r !== e) {
                  let a = u.current,
                    i = n(t);
                  (e
                    ? p("MOUNT")
                    : "none" === i || t?.display === "none"
                      ? p("UNMOUNT")
                      : r && a !== i
                        ? p("ANIMATION_OUT")
                        : p("UNMOUNT"),
                    (l.current = e));
                }
              }, [e, p]),
              (0, a.useLayoutEffect)(() => {
                if (o) {
                  let e,
                    t = o.ownerDocument.defaultView ?? window,
                    r = (r) => {
                      let a = n(d.current).includes(
                        CSS.escape(r.animationName),
                      );
                      if (
                        r.target === o &&
                        a &&
                        (p("ANIMATION_END"), !l.current)
                      ) {
                        let r = o.style.animationFillMode;
                        ((o.style.animationFillMode = "forwards"),
                          (e = t.setTimeout(() => {
                            "forwards" === o.style.animationFillMode &&
                              (o.style.animationFillMode = r);
                          })));
                      }
                    },
                    a = (e) => {
                      e.target === o && (u.current = n(d.current));
                    };
                  return (
                    o.addEventListener("animationstart", a),
                    o.addEventListener("animationcancel", r),
                    o.addEventListener("animationend", r),
                    () => {
                      (t.clearTimeout(e),
                        o.removeEventListener("animationstart", a),
                        o.removeEventListener("animationcancel", r),
                        o.removeEventListener("animationend", r));
                    }
                  );
                }
                p("ANIMATION_END");
              }, [o, p]),
              {
                isPresent: ["mounted", "unmountSuspended"].includes(c),
                ref: t.useCallback((e) => {
                  ((d.current = e ? getComputedStyle(e) : null), s(e));
                }, []),
              }
            );
          })(d),
          c =
            "function" == typeof l
              ? l({ present: u.isPresent })
              : t.Children.only(l),
          p = (0, r.useComposedRefs)(
            u.ref,
            ((i = c),
            (s =
              (o = Object.getOwnPropertyDescriptor(i.props, "ref")?.get) &&
              "isReactWarning" in o &&
              o.isReactWarning)
              ? i.ref
              : (s =
                    (o = Object.getOwnPropertyDescriptor(i, "ref")?.get) &&
                    "isReactWarning" in o &&
                    o.isReactWarning)
                ? i.props.ref
                : i.props.ref || i.ref),
          );
        return "function" == typeof l || u.isPresent
          ? t.cloneElement(c, { ref: p })
          : null;
      };
    function n(e) {
      return e?.animationName || "none";
    }
    ((i.displayName = "Presence"), e.s(["Presence", () => i]));
  },
  413455,
  358162,
  309790,
  (e) => {
    "use strict";
    var t,
      r = e.i(789783),
      a = e.i(291967),
      i = e.i(590285),
      n = e.i(221977),
      o = e.i(733174),
      s = e.i(268024),
      d = e.i(301224),
      l = "dismissableLayer.update",
      u = r.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      c = r.forwardRef((e, c) => {
        let {
            disableOutsidePointerEvents: m = !1,
            onEscapeKeyDown: b,
            onPointerDownOutside: g,
            onFocusOutside: h,
            onInteractOutside: v,
            onDismiss: x,
            ...y
          } = e,
          w = r.useContext(u),
          [S, N] = r.useState(null),
          C = S?.ownerDocument ?? globalThis?.document,
          [, E] = r.useState({}),
          R = (0, n.useComposedRefs)(c, (e) => N(e)),
          j = Array.from(w.layers),
          [T] = [...w.layersWithOutsidePointerEventsDisabled].slice(-1),
          P = j.indexOf(T),
          k = S ? j.indexOf(S) : -1,
          L = w.layersWithOutsidePointerEventsDisabled.size > 0,
          M = k >= P,
          O = (function (e, t = globalThis?.document) {
            let a = (0, o.useCallbackRef)(e),
              i = r.useRef(!1),
              n = r.useRef(() => {});
            return (
              r.useEffect(() => {
                let e = (e) => {
                    if (e.target && !i.current) {
                      let r = function () {
                          f("dismissableLayer.pointerDownOutside", a, i, {
                            discrete: !0,
                          });
                        },
                        i = { originalEvent: e };
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", n.current),
                          (n.current = r),
                          t.addEventListener("click", n.current, { once: !0 }))
                        : r();
                    } else t.removeEventListener("click", n.current);
                    i.current = !1;
                  },
                  r = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(r),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", n.current));
                };
              }, [t, a]),
              { onPointerDownCapture: () => (i.current = !0) }
            );
          })((e) => {
            let t = e.target,
              r = [...w.branches].some((e) => e.contains(t));
            M && !r && (g?.(e), v?.(e), e.defaultPrevented || x?.());
          }, C),
          z = (function (e, t = globalThis?.document) {
            let a = (0, o.useCallbackRef)(e),
              i = r.useRef(!1);
            return (
              r.useEffect(() => {
                let e = (e) => {
                  e.target &&
                    !i.current &&
                    f(
                      "dismissableLayer.focusOutside",
                      a,
                      { originalEvent: e },
                      { discrete: !1 },
                    );
                };
                return (
                  t.addEventListener("focusin", e),
                  () => t.removeEventListener("focusin", e)
                );
              }, [t, a]),
              {
                onFocusCapture: () => (i.current = !0),
                onBlurCapture: () => (i.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...w.branches].some((e) => e.contains(t)) &&
              (h?.(e), v?.(e), e.defaultPrevented || x?.());
          }, C);
        return (
          (0, s.useEscapeKeydown)((e) => {
            k === w.layers.size - 1 &&
              (b?.(e), !e.defaultPrevented && x && (e.preventDefault(), x()));
          }, C),
          r.useEffect(() => {
            if (S)
              return (
                m &&
                  (0 === w.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = C.body.style.pointerEvents),
                    (C.body.style.pointerEvents = "none")),
                  w.layersWithOutsidePointerEventsDisabled.add(S)),
                w.layers.add(S),
                p(),
                () => {
                  m &&
                    1 === w.layersWithOutsidePointerEventsDisabled.size &&
                    (C.body.style.pointerEvents = t);
                }
              );
          }, [S, C, m, w]),
          r.useEffect(
            () => () => {
              S &&
                (w.layers.delete(S),
                w.layersWithOutsidePointerEventsDisabled.delete(S),
                p());
            },
            [S, w],
          ),
          r.useEffect(() => {
            let e = () => E({});
            return (
              document.addEventListener(l, e),
              () => document.removeEventListener(l, e)
            );
          }, []),
          (0, d.jsx)(i.Primitive.div, {
            ...y,
            ref: R,
            style: {
              pointerEvents: L ? (M ? "auto" : "none") : void 0,
              ...e.style,
            },
            onFocusCapture: (0, a.composeEventHandlers)(
              e.onFocusCapture,
              z.onFocusCapture,
            ),
            onBlurCapture: (0, a.composeEventHandlers)(
              e.onBlurCapture,
              z.onBlurCapture,
            ),
            onPointerDownCapture: (0, a.composeEventHandlers)(
              e.onPointerDownCapture,
              O.onPointerDownCapture,
            ),
          })
        );
      });
    function p() {
      let e = new CustomEvent(l);
      document.dispatchEvent(e);
    }
    function f(e, t, r, { discrete: a }) {
      let n = r.originalEvent.target,
        o = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
      (t && n.addEventListener(e, t, { once: !0 }),
        a ? (0, i.dispatchDiscreteCustomEvent)(n, o) : n.dispatchEvent(o));
    }
    ((c.displayName = "DismissableLayer"),
      (r.forwardRef((e, t) => {
        let a = r.useContext(u),
          o = r.useRef(null),
          s = (0, n.useComposedRefs)(t, o);
        return (
          r.useEffect(() => {
            let e = o.current;
            if (e)
              return (
                a.branches.add(e),
                () => {
                  a.branches.delete(e);
                }
              );
          }, [a.branches]),
          (0, d.jsx)(i.Primitive.div, { ...e, ref: s })
        );
      }).displayName = "DismissableLayerBranch"),
      e.s(["DismissableLayer", () => c], 413455));
    var m = e.i(323337),
      b = e.i(436035),
      g = r.forwardRef((e, t) => {
        let { children: r, width: a = 10, height: n = 5, ...o } = e;
        return (0, d.jsx)(i.Primitive.svg, {
          ...o,
          ref: t,
          width: a,
          height: n,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
          children: e.asChild
            ? r
            : (0, d.jsx)("polygon", { points: "0,0 30,0 15,10" }),
        });
      });
    g.displayName = "Arrow";
    var h = e.i(359687),
      v = e.i(736542),
      x = e.i(274662),
      y = "Popper",
      [w, S] = (0, h.createContextScope)(y),
      [N, C] = w(y),
      E = (e) => {
        let { __scopePopper: t, children: a } = e,
          [i, n] = r.useState(null);
        return (0, d.jsx)(N, {
          scope: t,
          anchor: i,
          onAnchorChange: n,
          children: a,
        });
      };
    E.displayName = y;
    var R = "PopperAnchor",
      j = r.forwardRef((e, t) => {
        let { __scopePopper: a, virtualRef: o, ...s } = e,
          l = C(R, a),
          u = r.useRef(null),
          c = (0, n.useComposedRefs)(t, u),
          p = r.useRef(null);
        return (
          r.useEffect(() => {
            let e = p.current;
            ((p.current = o?.current || u.current),
              e !== p.current && l.onAnchorChange(p.current));
          }),
          o ? null : (0, d.jsx)(i.Primitive.div, { ...s, ref: c })
        );
      });
    j.displayName = R;
    var T = "PopperContent",
      [P, k] = w(T),
      L = r.forwardRef((e, t) => {
        let {
            __scopePopper: a,
            side: s = "bottom",
            sideOffset: l = 0,
            align: u = "center",
            alignOffset: c = 0,
            arrowPadding: p = 0,
            avoidCollisions: f = !0,
            collisionBoundary: g = [],
            collisionPadding: h = 0,
            sticky: y = "partial",
            hideWhenDetached: w = !1,
            updatePositionStrategy: S = "optimized",
            onPlaced: N,
            ...E
          } = e,
          R = C(T, a),
          [j, k] = r.useState(null),
          L = (0, n.useComposedRefs)(t, (e) => k(e)),
          [M, O] = r.useState(null),
          z = (0, x.useSize)(M),
          _ = z?.width ?? 0,
          H = z?.height ?? 0,
          B =
            "number" == typeof h
              ? h
              : { top: 0, right: 0, bottom: 0, left: 0, ...h },
          F = Array.isArray(g) ? g : [g],
          $ = F.length > 0,
          W = { padding: B, boundary: F.filter(A), altBoundary: $ },
          {
            refs: U,
            floatingStyles: G,
            placement: X,
            isPositioned: Y,
            middlewareData: K,
          } = (0, m.useFloating)({
            strategy: "fixed",
            placement: s + ("center" !== u ? "-" + u : ""),
            whileElementsMounted: (...e) =>
              (0, b.autoUpdate)(...e, { animationFrame: "always" === S }),
            elements: { reference: R.anchor },
            middleware: [
              (0, m.offset)({ mainAxis: l + H, alignmentAxis: c }),
              f &&
                (0, m.shift)({
                  mainAxis: !0,
                  crossAxis: !1,
                  limiter: "partial" === y ? (0, m.limitShift)() : void 0,
                  ...W,
                }),
              f && (0, m.flip)({ ...W }),
              (0, m.size)({
                ...W,
                apply: ({
                  elements: e,
                  rects: t,
                  availableWidth: r,
                  availableHeight: a,
                }) => {
                  let { width: i, height: n } = t.reference,
                    o = e.floating.style;
                  (o.setProperty("--radix-popper-available-width", `${r}px`),
                    o.setProperty("--radix-popper-available-height", `${a}px`),
                    o.setProperty("--radix-popper-anchor-width", `${i}px`),
                    o.setProperty("--radix-popper-anchor-height", `${n}px`));
                },
              }),
              M && (0, m.arrow)({ element: M, padding: p }),
              D({ arrowWidth: _, arrowHeight: H }),
              w && (0, m.hide)({ strategy: "referenceHidden", ...W }),
            ],
          }),
          [q, V] = I(X),
          J = (0, o.useCallbackRef)(N);
        (0, v.useLayoutEffect)(() => {
          Y && J?.();
        }, [Y, J]);
        let Q = K.arrow?.x,
          Z = K.arrow?.y,
          ee = K.arrow?.centerOffset !== 0,
          [et, er] = r.useState();
        return (
          (0, v.useLayoutEffect)(() => {
            j && er(window.getComputedStyle(j).zIndex);
          }, [j]),
          (0, d.jsx)("div", {
            ref: U.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
              ...G,
              transform: Y ? G.transform : "translate(0, -200%)",
              minWidth: "max-content",
              zIndex: et,
              "--radix-popper-transform-origin": [
                K.transformOrigin?.x,
                K.transformOrigin?.y,
              ].join(" "),
              ...(K.hide?.referenceHidden && {
                visibility: "hidden",
                pointerEvents: "none",
              }),
            },
            dir: e.dir,
            children: (0, d.jsx)(P, {
              scope: a,
              placedSide: q,
              onArrowChange: O,
              arrowX: Q,
              arrowY: Z,
              shouldHideArrow: ee,
              children: (0, d.jsx)(i.Primitive.div, {
                "data-side": q,
                "data-align": V,
                ...E,
                ref: L,
                style: { ...E.style, animation: Y ? void 0 : "none" },
              }),
            }),
          })
        );
      });
    L.displayName = T;
    var M = "PopperArrow",
      O = { top: "bottom", right: "left", bottom: "top", left: "right" },
      z = r.forwardRef(function (e, t) {
        let { __scopePopper: r, ...a } = e,
          i = k(M, r),
          n = O[i.placedSide];
        return (0, d.jsx)("span", {
          ref: i.onArrowChange,
          style: {
            position: "absolute",
            left: i.arrowX,
            top: i.arrowY,
            [n]: 0,
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
          children: (0, d.jsx)(g, {
            ...a,
            ref: t,
            style: { ...a.style, display: "block" },
          }),
        });
      });
    function A(e) {
      return null !== e;
    }
    z.displayName = M;
    var D = (e) => ({
      name: "transformOrigin",
      options: e,
      fn(t) {
        let { placement: r, rects: a, middlewareData: i } = t,
          n = i.arrow?.centerOffset !== 0,
          o = n ? 0 : e.arrowWidth,
          s = n ? 0 : e.arrowHeight,
          [d, l] = I(r),
          u = { start: "0%", center: "50%", end: "100%" }[l],
          c = (i.arrow?.x ?? 0) + o / 2,
          p = (i.arrow?.y ?? 0) + s / 2,
          f = "",
          m = "";
        return (
          "bottom" === d
            ? ((f = n ? u : `${c}px`), (m = `${-s}px`))
            : "top" === d
              ? ((f = n ? u : `${c}px`), (m = `${a.floating.height + s}px`))
              : "right" === d
                ? ((f = `${-s}px`), (m = n ? u : `${p}px`))
                : "left" === d &&
                  ((f = `${a.floating.width + s}px`), (m = n ? u : `${p}px`)),
          { data: { x: f, y: m } }
        );
      },
    });
    function I(e) {
      let [t, r = "center"] = e.split("-");
      return [t, r];
    }
    e.s(
      [
        "Anchor",
        () => j,
        "Arrow",
        () => z,
        "Content",
        () => L,
        "Root",
        () => E,
        "createPopperScope",
        () => S,
      ],
      358162,
    );
    var _ = e.i(546564),
      H = r.forwardRef((e, t) => {
        let { container: a, ...n } = e,
          [o, s] = r.useState(!1);
        (0, v.useLayoutEffect)(() => s(!0), []);
        let l = a || (o && globalThis?.document?.body);
        return l
          ? _.default.createPortal(
              (0, d.jsx)(i.Primitive.div, { ...n, ref: t }),
              l,
            )
          : null;
      });
    ((H.displayName = "Portal"), e.s(["Portal", () => H], 309790));
  },
  386783,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(291967),
      a = e.i(221977),
      i = e.i(359687),
      n = e.i(413455),
      o = e.i(871598),
      s = e.i(358162),
      d = e.i(309790),
      l = e.i(891269),
      u = e.i(590285),
      c = e.i(890446),
      p = e.i(975946),
      f = e.i(62535),
      m = e.i(301224),
      [b, g] = (0, i.createContextScope)("Tooltip", [s.createPopperScope]),
      h = (0, s.createPopperScope)(),
      v = "TooltipProvider",
      x = "tooltip.open",
      [y, w] = b(v),
      S = (e) => {
        let {
            __scopeTooltip: r,
            delayDuration: a = 700,
            skipDelayDuration: i = 300,
            disableHoverableContent: n = !1,
            children: o,
          } = e,
          s = t.useRef(!0),
          d = t.useRef(!1),
          l = t.useRef(0);
        return (
          t.useEffect(() => {
            let e = l.current;
            return () => window.clearTimeout(e);
          }, []),
          (0, m.jsx)(y, {
            scope: r,
            isOpenDelayedRef: s,
            delayDuration: a,
            onOpen: t.useCallback(() => {
              (window.clearTimeout(l.current), (s.current = !1));
            }, []),
            onClose: t.useCallback(() => {
              (window.clearTimeout(l.current),
                (l.current = window.setTimeout(() => (s.current = !0), i)));
            }, [i]),
            isPointerInTransitRef: d,
            onPointerInTransitChange: t.useCallback((e) => {
              d.current = e;
            }, []),
            disableHoverableContent: n,
            children: o,
          })
        );
      };
    S.displayName = v;
    var N = "Tooltip",
      [C, E] = b(N),
      R = (e) => {
        let {
            __scopeTooltip: r,
            children: a,
            open: i,
            defaultOpen: n,
            onOpenChange: d,
            disableHoverableContent: l,
            delayDuration: u,
          } = e,
          c = w(N, e.__scopeTooltip),
          f = h(r),
          [b, g] = t.useState(null),
          v = (0, o.useId)(),
          y = t.useRef(0),
          S = l ?? c.disableHoverableContent,
          E = u ?? c.delayDuration,
          R = t.useRef(!1),
          [j, T] = (0, p.useControllableState)({
            prop: i,
            defaultProp: n ?? !1,
            onChange: (e) => {
              (e
                ? (c.onOpen(), document.dispatchEvent(new CustomEvent(x)))
                : c.onClose(),
                d?.(e));
            },
            caller: N,
          }),
          P = t.useMemo(
            () =>
              j ? (R.current ? "delayed-open" : "instant-open") : "closed",
            [j],
          ),
          k = t.useCallback(() => {
            (window.clearTimeout(y.current),
              (y.current = 0),
              (R.current = !1),
              T(!0));
          }, [T]),
          L = t.useCallback(() => {
            (window.clearTimeout(y.current), (y.current = 0), T(!1));
          }, [T]),
          M = t.useCallback(() => {
            (window.clearTimeout(y.current),
              (y.current = window.setTimeout(() => {
                ((R.current = !0), T(!0), (y.current = 0));
              }, E)));
          }, [E, T]);
        return (
          t.useEffect(
            () => () => {
              y.current && (window.clearTimeout(y.current), (y.current = 0));
            },
            [],
          ),
          (0, m.jsx)(s.Root, {
            ...f,
            children: (0, m.jsx)(C, {
              scope: r,
              contentId: v,
              open: j,
              stateAttribute: P,
              trigger: b,
              onTriggerChange: g,
              onTriggerEnter: t.useCallback(() => {
                c.isOpenDelayedRef.current ? M() : k();
              }, [c.isOpenDelayedRef, M, k]),
              onTriggerLeave: t.useCallback(() => {
                S ? L() : (window.clearTimeout(y.current), (y.current = 0));
              }, [L, S]),
              onOpen: k,
              onClose: L,
              disableHoverableContent: S,
              children: a,
            }),
          })
        );
      };
    R.displayName = N;
    var j = "TooltipTrigger",
      T = t.forwardRef((e, i) => {
        let { __scopeTooltip: n, ...o } = e,
          d = E(j, n),
          l = w(j, n),
          c = h(n),
          p = t.useRef(null),
          f = (0, a.useComposedRefs)(i, p, d.onTriggerChange),
          b = t.useRef(!1),
          g = t.useRef(!1),
          v = t.useCallback(() => (b.current = !1), []);
        return (
          t.useEffect(
            () => () => document.removeEventListener("pointerup", v),
            [v],
          ),
          (0, m.jsx)(s.Anchor, {
            asChild: !0,
            ...c,
            children: (0, m.jsx)(u.Primitive.button, {
              "aria-describedby": d.open ? d.contentId : void 0,
              "data-state": d.stateAttribute,
              ...o,
              ref: f,
              onPointerMove: (0, r.composeEventHandlers)(
                e.onPointerMove,
                (e) => {
                  "touch" !== e.pointerType &&
                    (g.current ||
                      l.isPointerInTransitRef.current ||
                      (d.onTriggerEnter(), (g.current = !0)));
                },
              ),
              onPointerLeave: (0, r.composeEventHandlers)(
                e.onPointerLeave,
                () => {
                  (d.onTriggerLeave(), (g.current = !1));
                },
              ),
              onPointerDown: (0, r.composeEventHandlers)(
                e.onPointerDown,
                () => {
                  (d.open && d.onClose(),
                    (b.current = !0),
                    document.addEventListener("pointerup", v, { once: !0 }));
                },
              ),
              onFocus: (0, r.composeEventHandlers)(e.onFocus, () => {
                b.current || d.onOpen();
              }),
              onBlur: (0, r.composeEventHandlers)(e.onBlur, d.onClose),
              onClick: (0, r.composeEventHandlers)(e.onClick, d.onClose),
            }),
          })
        );
      });
    T.displayName = j;
    var P = "TooltipPortal",
      [k, L] = b(P, { forceMount: void 0 }),
      M = (e) => {
        let { __scopeTooltip: t, forceMount: r, children: a, container: i } = e,
          n = E(P, t);
        return (0, m.jsx)(k, {
          scope: t,
          forceMount: r,
          children: (0, m.jsx)(l.Presence, {
            present: r || n.open,
            children: (0, m.jsx)(d.Portal, {
              asChild: !0,
              container: i,
              children: a,
            }),
          }),
        });
      };
    M.displayName = P;
    var O = "TooltipContent",
      z = t.forwardRef((e, t) => {
        let r = L(O, e.__scopeTooltip),
          { forceMount: a = r.forceMount, side: i = "top", ...n } = e,
          o = E(O, e.__scopeTooltip);
        return (0, m.jsx)(l.Presence, {
          present: a || o.open,
          children: o.disableHoverableContent
            ? (0, m.jsx)(H, { side: i, ...n, ref: t })
            : (0, m.jsx)(A, { side: i, ...n, ref: t }),
        });
      }),
      A = t.forwardRef((e, r) => {
        let i = E(O, e.__scopeTooltip),
          n = w(O, e.__scopeTooltip),
          o = t.useRef(null),
          s = (0, a.useComposedRefs)(r, o),
          [d, l] = t.useState(null),
          { trigger: u, onClose: c } = i,
          p = o.current,
          { onPointerInTransitChange: f } = n,
          b = t.useCallback(() => {
            (l(null), f(!1));
          }, [f]),
          g = t.useCallback(
            (e, t) => {
              let r,
                a = e.currentTarget,
                i = { x: e.clientX, y: e.clientY },
                n = (function (e, t) {
                  let r = Math.abs(t.top - e.y),
                    a = Math.abs(t.bottom - e.y),
                    i = Math.abs(t.right - e.x),
                    n = Math.abs(t.left - e.x);
                  switch (Math.min(r, a, i, n)) {
                    case n:
                      return "left";
                    case i:
                      return "right";
                    case r:
                      return "top";
                    case a:
                      return "bottom";
                    default:
                      throw Error("unreachable");
                  }
                })(i, a.getBoundingClientRect());
              (l(
                ((r = [
                  ...(function (e, t, r = 5) {
                    let a = [];
                    switch (t) {
                      case "top":
                        a.push(
                          { x: e.x - r, y: e.y + r },
                          { x: e.x + r, y: e.y + r },
                        );
                        break;
                      case "bottom":
                        a.push(
                          { x: e.x - r, y: e.y - r },
                          { x: e.x + r, y: e.y - r },
                        );
                        break;
                      case "left":
                        a.push(
                          { x: e.x + r, y: e.y - r },
                          { x: e.x + r, y: e.y + r },
                        );
                        break;
                      case "right":
                        a.push(
                          { x: e.x - r, y: e.y - r },
                          { x: e.x - r, y: e.y + r },
                        );
                    }
                    return a;
                  })(i, n),
                  ...(function (e) {
                    let { top: t, right: r, bottom: a, left: i } = e;
                    return [
                      { x: i, y: t },
                      { x: r, y: t },
                      { x: r, y: a },
                      { x: i, y: a },
                    ];
                  })(t.getBoundingClientRect()),
                ].slice()).sort((e, t) =>
                  e.x < t.x
                    ? -1
                    : e.x > t.x
                      ? 1
                      : e.y < t.y
                        ? -1
                        : 1 * !!(e.y > t.y),
                ),
                (function (e) {
                  if (e.length <= 1) return e.slice();
                  let t = [];
                  for (let r = 0; r < e.length; r++) {
                    let a = e[r];
                    for (; t.length >= 2; ) {
                      let e = t[t.length - 1],
                        r = t[t.length - 2];
                      if (
                        (e.x - r.x) * (a.y - r.y) >=
                        (e.y - r.y) * (a.x - r.x)
                      )
                        t.pop();
                      else break;
                    }
                    t.push(a);
                  }
                  t.pop();
                  let r = [];
                  for (let t = e.length - 1; t >= 0; t--) {
                    let a = e[t];
                    for (; r.length >= 2; ) {
                      let e = r[r.length - 1],
                        t = r[r.length - 2];
                      if (
                        (e.x - t.x) * (a.y - t.y) >=
                        (e.y - t.y) * (a.x - t.x)
                      )
                        r.pop();
                      else break;
                    }
                    r.push(a);
                  }
                  return (r.pop(),
                  1 === t.length &&
                    1 === r.length &&
                    t[0].x === r[0].x &&
                    t[0].y === r[0].y)
                    ? t
                    : t.concat(r);
                })(r)),
              ),
                f(!0));
            },
            [f],
          );
        return (
          t.useEffect(() => () => b(), [b]),
          t.useEffect(() => {
            if (u && p) {
              let e = (e) => g(e, p),
                t = (e) => g(e, u);
              return (
                u.addEventListener("pointerleave", e),
                p.addEventListener("pointerleave", t),
                () => {
                  (u.removeEventListener("pointerleave", e),
                    p.removeEventListener("pointerleave", t));
                }
              );
            }
          }, [u, p, g, b]),
          t.useEffect(() => {
            if (d) {
              let e = (e) => {
                let t = e.target,
                  r = { x: e.clientX, y: e.clientY },
                  a = u?.contains(t) || p?.contains(t),
                  i = !(function (e, t) {
                    let { x: r, y: a } = e,
                      i = !1;
                    for (let e = 0, n = t.length - 1; e < t.length; n = e++) {
                      let o = t[e],
                        s = t[n],
                        d = o.x,
                        l = o.y,
                        u = s.x,
                        c = s.y;
                      l > a != c > a &&
                        r < ((u - d) * (a - l)) / (c - l) + d &&
                        (i = !i);
                    }
                    return i;
                  })(r, d);
                a ? b() : i && (b(), c());
              };
              return (
                document.addEventListener("pointermove", e),
                () => document.removeEventListener("pointermove", e)
              );
            }
          }, [u, p, d, c, b]),
          (0, m.jsx)(H, { ...e, ref: s })
        );
      }),
      [D, I] = b(N, { isInside: !1 }),
      _ = (0, c.createSlottable)("TooltipContent"),
      H = t.forwardRef((e, r) => {
        let {
            __scopeTooltip: a,
            children: i,
            "aria-label": o,
            onEscapeKeyDown: d,
            onPointerDownOutside: l,
            ...u
          } = e,
          c = E(O, a),
          p = h(a),
          { onClose: b } = c;
        return (
          t.useEffect(
            () => (
              document.addEventListener(x, b),
              () => document.removeEventListener(x, b)
            ),
            [b],
          ),
          t.useEffect(() => {
            if (c.trigger) {
              let e = (e) => {
                let t = e.target;
                t?.contains(c.trigger) && b();
              };
              return (
                window.addEventListener("scroll", e, { capture: !0 }),
                () => window.removeEventListener("scroll", e, { capture: !0 })
              );
            }
          }, [c.trigger, b]),
          (0, m.jsx)(n.DismissableLayer, {
            asChild: !0,
            disableOutsidePointerEvents: !1,
            onEscapeKeyDown: d,
            onPointerDownOutside: l,
            onFocusOutside: (e) => e.preventDefault(),
            onDismiss: b,
            children: (0, m.jsxs)(s.Content, {
              "data-state": c.stateAttribute,
              ...p,
              ...u,
              ref: r,
              style: {
                ...u.style,
                "--radix-tooltip-content-transform-origin":
                  "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width":
                  "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height":
                  "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width":
                  "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height":
                  "var(--radix-popper-anchor-height)",
              },
              children: [
                (0, m.jsx)(_, { children: i }),
                (0, m.jsx)(D, {
                  scope: a,
                  isInside: !0,
                  children: (0, m.jsx)(f.Root, {
                    id: c.contentId,
                    role: "tooltip",
                    children: o || i,
                  }),
                }),
              ],
            }),
          })
        );
      });
    z.displayName = O;
    var B = "TooltipArrow",
      F = t.forwardRef((e, t) => {
        let { __scopeTooltip: r, ...a } = e,
          i = h(r);
        return I(B, r).isInside
          ? null
          : (0, m.jsx)(s.Arrow, { ...i, ...a, ref: t });
      });
    ((F.displayName = B),
      e.s([
        "Arrow",
        () => F,
        "Content",
        () => z,
        "Portal",
        () => M,
        "Provider",
        () => S,
        "Root",
        () => R,
        "Tooltip",
        () => R,
        "TooltipArrow",
        () => F,
        "TooltipContent",
        () => z,
        "TooltipPortal",
        () => M,
        "TooltipProvider",
        () => S,
        "TooltipTrigger",
        () => T,
        "Trigger",
        () => T,
        "createTooltipScope",
        () => g,
      ]));
  },
  424808,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("PanelLeft", [
      [
        "rect",
        { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
      ],
      ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ]);
    e.s(["default", () => t]);
  },
  406142,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(403055);
    function a({ className: e, ...a }) {
      return (0, t.jsx)("div", {
        className: (0, r.cn)("animate-pulse rounded-md bg-muted", e),
        ...a,
      });
    }
    e.s(["Skeleton", () => a]);
  },
  405306,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      a = e.i(637118),
      i = e.i(89440),
      n = e.i(949002),
      o = e.i(403055);
    let s = a.Root,
      d = a.Trigger,
      l = a.Close,
      u = a.Portal,
      c = r.forwardRef(({ className: e, ...r }, i) =>
        (0, t.jsx)(a.Overlay, {
          className: (0, o.cn)(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            e,
          ),
          ...r,
          ref: i,
        }),
      );
    c.displayName = a.Overlay.displayName;
    let p = (0, i.cva)(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
        {
          variants: {
            side: {
              top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
              bottom:
                "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
              left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
              right:
                "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
            },
          },
          defaultVariants: { side: "right" },
        },
      ),
      f = r.forwardRef(
        ({ side: e = "right", className: r, children: i, ...s }, d) =>
          (0, t.jsxs)(u, {
            children: [
              (0, t.jsx)(c, {}),
              (0, t.jsxs)(a.Content, {
                className: (0, o.cn)(p({ side: e }), r),
                ref: d,
                ...s,
                children: [
                  i,
                  (0, t.jsxs)(a.Close, {
                    className:
                      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
                    children: [
                      (0, t.jsx)(n.X, { className: "h-4 w-4" }),
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
    f.displayName = a.Content.displayName;
    let m = ({ className: e, ...r }) =>
      (0, t.jsx)("div", {
        className: (0, o.cn)(
          "flex flex-col space-y-2 text-center sm:text-left",
          e,
        ),
        ...r,
      });
    m.displayName = "SheetHeader";
    let b = ({ className: e, ...r }) =>
      (0, t.jsx)("div", {
        className: (0, o.cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          e,
        ),
        ...r,
      });
    b.displayName = "SheetFooter";
    let g = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(a.Title, {
        className: (0, o.cn)("text-lg font-semibold text-foreground", e),
        ref: i,
        ...r,
      }),
    );
    g.displayName = a.Title.displayName;
    let h = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(a.Description, {
        className: (0, o.cn)("text-sm text-muted-foreground", e),
        ref: i,
        ...r,
      }),
    );
    ((h.displayName = a.Description.displayName),
      e.s([
        "Sheet",
        () => s,
        "SheetClose",
        () => l,
        "SheetContent",
        () => f,
        "SheetDescription",
        () => h,
        "SheetFooter",
        () => b,
        "SheetHeader",
        () => m,
        "SheetOverlay",
        () => c,
        "SheetPortal",
        () => u,
        "SheetTitle",
        () => g,
        "SheetTrigger",
        () => d,
      ]));
  },
  289785,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      a = e.i(739023),
      i = e.i(403055);
    let n = r.forwardRef(
      (
        {
          className: e,
          orientation: r = "horizontal",
          decorative: n = !0,
          ...o
        },
        s,
      ) =>
        (0, t.jsx)(a.Root, {
          className: (0, i.cn)(
            "shrink-0 bg-border",
            "horizontal" === r ? "h-px w-full" : "h-full w-px",
            e,
          ),
          decorative: n,
          orientation: r,
          ref: s,
          ...o,
        }),
    );
    ((n.displayName = a.Root.displayName), e.s(["Separator", () => n]));
  },
  402056,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      a = e.i(386783),
      i = e.i(403055);
    let n = a.Provider,
      o = a.Root,
      s = a.Trigger,
      d = r.forwardRef(({ className: e, sideOffset: r = 4, ...n }, o) =>
        (0, t.jsx)(a.Content, {
          className: (0, i.cn)(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e,
          ),
          ref: o,
          sideOffset: r,
          ...n,
        }),
      );
    ((d.displayName = a.Content.displayName),
      e.s([
        "Tooltip",
        () => o,
        "TooltipContent",
        () => d,
        "TooltipProvider",
        () => n,
        "TooltipTrigger",
        () => s,
      ]));
  },
  431658,
  (e) => {
    "use strict";
    var t = e.i(424808);
    e.s(["PanelLeft", () => t.default]);
  },
  520116,
  (e) => {
    "use strict";
    var t = e.i(789783);
    function r() {
      let [e, r] = t.useState(void 0);
      return (
        t.useEffect(() => {
          let e = window.matchMedia("(max-width: 767px)"),
            t = () => {
              r(window.innerWidth < 768);
            };
          return (
            e.addEventListener("change", t),
            r(window.innerWidth < 768),
            () => e.removeEventListener("change", t)
          );
        }, []),
        !!e
      );
    }
    e.s(["useIsMobile", () => r]);
  },
  62574,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      a = e.i(890446),
      i = e.i(89440),
      n = e.i(431658),
      o = e.i(520116),
      s = e.i(403055),
      d = e.i(306261),
      l = e.i(579890),
      u = e.i(289785),
      c = e.i(405306),
      p = e.i(406142),
      f = e.i(402056);
    let m = r.createContext(null);
    function b() {
      let e = r.useContext(m);
      if (!e) throw Error("useSidebar must be used within a Sidebar.");
      return e;
    }
    let g = r.forwardRef(
      (
        {
          defaultOpen: e = !0,
          open: a,
          onOpenChange: i,
          className: n,
          style: d,
          children: l,
          ...u
        },
        c,
      ) => {
        let p = (0, o.useIsMobile)(),
          [b, g] = r.useState(!1),
          [h, v] = r.useState(e),
          x = a ?? h,
          y = r.useCallback(
            (e) => {
              if (i) return i("function" == typeof e ? e(x) : e);
              (v(e),
                (document.cookie = `sidebar:state=${x}; path=/; max-age=604800`));
            },
            [i, x],
          ),
          w = r.useCallback(() => (p ? g((e) => !e) : y((e) => !e)), [p, y, g]);
        r.useEffect(() => {
          let e = (e) => {
            "b" === e.key &&
              (e.metaKey || e.ctrlKey) &&
              (e.preventDefault(), w());
          };
          return (
            window.addEventListener("keydown", e),
            () => window.removeEventListener("keydown", e)
          );
        }, [w]);
        let S = x ? "expanded" : "collapsed",
          N = r.useMemo(
            () => ({
              state: S,
              open: x,
              setOpen: y,
              isMobile: p,
              openMobile: b,
              setOpenMobile: g,
              toggleSidebar: w,
            }),
            [S, x, y, p, b, g, w],
          );
        return (0, t.jsx)(m.Provider, {
          value: N,
          children: (0, t.jsx)(f.TooltipProvider, {
            delayDuration: 0,
            children: (0, t.jsx)("div", {
              className: (0, s.cn)(
                "group/sidebar-wrapper text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full",
                n,
              ),
              ref: c,
              style: {
                "--sidebar-width": "16rem",
                "--sidebar-width-icon": "3rem",
                ...d,
              },
              ...u,
              children: l,
            }),
          }),
        });
      },
    );
    g.displayName = "SidebarProvider";
    let h = r.forwardRef(
      (
        {
          side: e = "left",
          variant: r = "sidebar",
          collapsible: a = "offcanvas",
          className: i,
          children: n,
          ...o
        },
        d,
      ) => {
        let { isMobile: l, state: u, openMobile: p, setOpenMobile: f } = b();
        return "none" === a
          ? (0, t.jsx)("div", {
              className: (0, s.cn)(
                "bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col",
                i,
              ),
              ref: d,
              ...o,
              children: n,
            })
          : l
            ? (0, t.jsxs)(c.Sheet, {
                onOpenChange: f,
                open: p,
                ...o,
                children: [
                  (0, t.jsx)(c.SheetTitle, {
                    className: "sr-only",
                    children: "Sidebar",
                  }),
                  (0, t.jsx)(c.SheetDescription, {
                    className: "sr-only",
                    children: "Mobile Sidebar",
                  }),
                  (0, t.jsx)(c.SheetContent, {
                    className:
                      "bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden",
                    "data-mobile": "true",
                    "data-sidebar": "sidebar",
                    side: e,
                    style: { "--sidebar-width": "18rem" },
                    children: (0, t.jsx)("div", {
                      className: "flex h-full w-full flex-col",
                      children: n,
                    }),
                  }),
                ],
              })
            : (0, t.jsxs)("div", {
                className: "group peer hidden md:block",
                "data-collapsible": "collapsed" === u ? a : "",
                "data-side": e,
                "data-state": u,
                "data-variant": r,
                ref: d,
                children: [
                  (0, t.jsx)("div", {
                    className: (0, s.cn)(
                      "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
                      "group-data-[collapsible=offcanvas]:w-0",
                      "group-data-[side=right]:rotate-180",
                      "floating" === r || "inset" === r
                        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                        : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
                    ),
                  }),
                  (0, t.jsx)("div", {
                    className: (0, s.cn)(
                      "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
                      "left" === e
                        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                      "floating" === r || "inset" === r
                        ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                        : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                      i,
                    ),
                    ...o,
                    children: (0, t.jsx)("div", {
                      className:
                        "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                      "data-sidebar": "sidebar",
                      children: n,
                    }),
                  }),
                ],
              });
      },
    );
    h.displayName = "Sidebar";
    let v = r.forwardRef(({ className: e, onClick: r, ...a }, i) => {
      let { toggleSidebar: o } = b();
      return (0, t.jsxs)(d.Button, {
        className: (0, s.cn)("h-7 w-7", e),
        "data-sidebar": "trigger",
        onClick: (e) => {
          (r?.(e), o());
        },
        ref: i,
        size: "icon",
        variant: "ghost",
        ...a,
        children: [
          (0, t.jsx)(n.PanelLeft, {}),
          (0, t.jsx)("span", {
            className: "sr-only",
            children: "Toggle Sidebar",
          }),
        ],
      });
    });
    v.displayName = "SidebarTrigger";
    let x = r.forwardRef(({ className: e, ...r }, a) => {
      let { toggleSidebar: i } = b();
      return (0, t.jsx)("button", {
        "aria-label": "Toggle Sidebar",
        className: (0, s.cn)(
          "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          e,
        ),
        "data-sidebar": "rail",
        onClick: i,
        ref: a,
        tabIndex: -1,
        title: "Toggle Sidebar",
        ...r,
      });
    });
    x.displayName = "SidebarRail";
    let y = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("main", {
        className: (0, s.cn)(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-[--spacing(4))]] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
          e,
        ),
        ref: a,
        ...r,
      }),
    );
    y.displayName = "SidebarInset";
    let w = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)(l.Input, {
        className: (0, s.cn)(
          "focus-visible:ring-sidebar-ring h-8 w-full bg-background shadow-none focus-visible:ring-2",
          e,
        ),
        "data-sidebar": "input",
        ref: a,
        ...r,
      }),
    );
    w.displayName = "SidebarInput";
    let S = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)("flex flex-col gap-2 p-2", e),
        "data-sidebar": "header",
        ref: a,
        ...r,
      }),
    );
    S.displayName = "SidebarHeader";
    let N = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)("flex flex-col gap-2 p-2", e),
        "data-sidebar": "footer",
        ref: a,
        ...r,
      }),
    );
    N.displayName = "SidebarFooter";
    let C = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)(u.Separator, {
        className: (0, s.cn)("bg-sidebar-border mx-2 w-auto", e),
        "data-sidebar": "separator",
        ref: a,
        ...r,
      }),
    );
    C.displayName = "SidebarSeparator";
    let E = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
          e,
        ),
        "data-sidebar": "content",
        ref: a,
        ...r,
      }),
    );
    E.displayName = "SidebarContent";
    let R = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)("relative flex w-full min-w-0 flex-col p-2", e),
        "data-sidebar": "group",
        ref: a,
        ...r,
      }),
    );
    R.displayName = "SidebarGroup";
    let j = r.forwardRef(({ className: e, asChild: r = !1, ...i }, n) => {
      let o = r ? a.Slot : "div";
      return (0, t.jsx)(o, {
        className: (0, s.cn)(
          "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          e,
        ),
        "data-sidebar": "group-label",
        ref: n,
        ...i,
      });
    });
    j.displayName = "SidebarGroupLabel";
    let T = r.forwardRef(({ className: e, asChild: r = !1, ...i }, n) => {
      let o = r ? a.Slot : "button";
      return (0, t.jsx)(o, {
        className: (0, s.cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 md:after:hidden",
          "group-data-[collapsible=icon]:hidden",
          e,
        ),
        "data-sidebar": "group-action",
        ref: n,
        ...i,
      });
    });
    T.displayName = "SidebarGroupAction";
    let P = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)("w-full text-sm", e),
        "data-sidebar": "group-content",
        ref: a,
        ...r,
      }),
    );
    P.displayName = "SidebarGroupContent";
    let k = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("ul", {
        className: (0, s.cn)("flex w-full min-w-0 flex-col gap-1", e),
        "data-sidebar": "menu",
        ref: a,
        ...r,
      }),
    );
    k.displayName = "SidebarMenu";
    let L = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("li", {
        className: (0, s.cn)("group/menu-item relative", e),
        "data-sidebar": "menu-item",
        ref: a,
        ...r,
      }),
    );
    L.displayName = "SidebarMenuItem";
    let M = (0, i.cva)(
        "peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        {
          variants: {
            variant: {
              default:
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              outline:
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
            size: {
              default: "h-8 text-sm",
              sm: "h-7 text-xs",
              lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
            },
          },
          defaultVariants: { variant: "default", size: "default" },
        },
      ),
      O = r.forwardRef(
        (
          {
            asChild: e = !1,
            isActive: r = !1,
            variant: i = "default",
            size: n = "default",
            tooltip: o,
            className: d,
            ...l
          },
          u,
        ) => {
          let c = e ? a.Slot : "button",
            { isMobile: p, state: m } = b(),
            g = (0, t.jsx)(c, {
              className: (0, s.cn)(M({ variant: i, size: n }), d),
              "data-active": r,
              "data-sidebar": "menu-button",
              "data-size": n,
              ref: u,
              ...l,
            });
          return o
            ? ("string" == typeof o && (o = { children: o }),
              (0, t.jsxs)(f.Tooltip, {
                children: [
                  (0, t.jsx)(f.TooltipTrigger, { asChild: !0, children: g }),
                  (0, t.jsx)(f.TooltipContent, {
                    align: "center",
                    hidden: "collapsed" !== m || p,
                    side: "right",
                    ...o,
                  }),
                ],
              }))
            : g;
        },
      );
    O.displayName = "SidebarMenuButton";
    let z = r.forwardRef(
      ({ className: e, asChild: r = !1, showOnHover: i = !1, ...n }, o) => {
        let d = r ? a.Slot : "button";
        return (0, t.jsx)(d, {
          className: (0, s.cn)(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            "after:absolute after:-inset-2 md:after:hidden",
            "peer-data-[size=sm]/menu-button:top-1",
            "peer-data-[size=default]/menu-button:top-1.5",
            "peer-data-[size=lg]/menu-button:top-2.5",
            "group-data-[collapsible=icon]:hidden",
            i &&
              "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
            e,
          ),
          "data-sidebar": "menu-action",
          ref: o,
          ...n,
        });
      },
    );
    z.displayName = "SidebarMenuAction";
    let A = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("div", {
        className: (0, s.cn)(
          "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums",
          "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          e,
        ),
        "data-sidebar": "menu-badge",
        ref: a,
        ...r,
      }),
    );
    A.displayName = "SidebarMenuBadge";
    let D = r.forwardRef(({ className: e, showIcon: a = !1, ...i }, n) => {
      let o = r.useMemo(() => `${Math.floor(40 * Math.random()) + 50}%`, []);
      return (0, t.jsxs)("div", {
        className: (0, s.cn)("flex h-8 items-center gap-2 rounded-md px-2", e),
        "data-sidebar": "menu-skeleton",
        ref: n,
        ...i,
        children: [
          a &&
            (0, t.jsx)(p.Skeleton, {
              className: "size-4 rounded-md",
              "data-sidebar": "menu-skeleton-icon",
            }),
          (0, t.jsx)(p.Skeleton, {
            className: "h-4 max-w-[--skeleton-width] flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: { "--skeleton-width": o },
          }),
        ],
      });
    });
    D.displayName = "SidebarMenuSkeleton";
    let I = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)("ul", {
        className: (0, s.cn)(
          "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
          "group-data-[collapsible=icon]:hidden",
          e,
        ),
        "data-sidebar": "menu-sub",
        ref: a,
        ...r,
      }),
    );
    I.displayName = "SidebarMenuSub";
    let _ = r.forwardRef(({ ...e }, r) => (0, t.jsx)("li", { ref: r, ...e }));
    _.displayName = "SidebarMenuSubItem";
    let H = r.forwardRef(
      (
        { asChild: e = !1, size: r = "md", isActive: i, className: n, ...o },
        d,
      ) => {
        let l = e ? a.Slot : "a";
        return (0, t.jsx)(l, {
          className: (0, s.cn)(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
            "sm" === r && "text-xs",
            "md" === r && "text-sm",
            "group-data-[collapsible=icon]:hidden",
            n,
          ),
          "data-active": i,
          "data-sidebar": "menu-sub-button",
          "data-size": r,
          ref: d,
          ...o,
        });
      },
    );
    ((H.displayName = "SidebarMenuSubButton"),
      e.s([
        "Sidebar",
        () => h,
        "SidebarContent",
        () => E,
        "SidebarFooter",
        () => N,
        "SidebarGroup",
        () => R,
        "SidebarGroupAction",
        () => T,
        "SidebarGroupContent",
        () => P,
        "SidebarGroupLabel",
        () => j,
        "SidebarHeader",
        () => S,
        "SidebarInput",
        () => w,
        "SidebarInset",
        () => y,
        "SidebarMenu",
        () => k,
        "SidebarMenuAction",
        () => z,
        "SidebarMenuBadge",
        () => A,
        "SidebarMenuButton",
        () => O,
        "SidebarMenuItem",
        () => L,
        "SidebarMenuSkeleton",
        () => D,
        "SidebarMenuSub",
        () => I,
        "SidebarMenuSubButton",
        () => H,
        "SidebarMenuSubItem",
        () => _,
        "SidebarProvider",
        () => g,
        "SidebarRail",
        () => x,
        "SidebarSeparator",
        () => C,
        "SidebarTrigger",
        () => v,
        "useSidebar",
        () => b,
      ]));
  },
]);
