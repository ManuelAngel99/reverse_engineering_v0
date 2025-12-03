(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  728874,
  (e) => {
    "use strict";
    let t, n;
    var r = e.i(899002),
      o = e.i(789783),
      a = e.i(719271),
      l = e.i(835098),
      i = e.i(987176),
      u = e.i(633182),
      c = e.i(981611),
      s = e.i(737203),
      d = e.i(504015),
      f = e.i(753011),
      p = e.i(130344);
    let m = "dismissableLayer.update",
      v = (0, o.createContext)({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      h = (0, o.forwardRef)((e, n) => {
        var r;
        let {
            disableOutsidePointerEvents: l = !1,
            onEscapeKeyDown: u,
            onPointerDownOutside: c,
            onFocusOutside: h,
            onInteractOutside: w,
            onDismiss: y,
            ...b
          } = e,
          C = (0, o.useContext)(v),
          [P, R] = (0, o.useState)(null),
          _ =
            null != (r = null == P ? void 0 : P.ownerDocument)
              ? r
              : null == globalThis
                ? void 0
                : globalThis.document,
          [, S] = (0, o.useState)({}),
          M = (0, i.useComposedRefs)(n, (e) => R(e)),
          k = Array.from(C.layers),
          [x] = [...C.layersWithOutsidePointerEventsDisabled].slice(-1),
          T = k.indexOf(x),
          D = P ? k.indexOf(P) : -1,
          O = C.layersWithOutsidePointerEventsDisabled.size > 0,
          L = D >= T,
          I = (function (
            e,
            t = null == globalThis ? void 0 : globalThis.document,
          ) {
            let n = (0, f.useCallbackRef)(e),
              r = (0, o.useRef)(!1),
              a = (0, o.useRef)(() => {});
            return (
              (0, o.useEffect)(() => {
                let e = (e) => {
                    if (e.target && !r.current) {
                      let r = { originalEvent: e };
                      function o() {
                        g("dismissableLayer.pointerDownOutside", n, r, {
                          discrete: !0,
                        });
                      }
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", a.current),
                          (a.current = o),
                          t.addEventListener("click", a.current, { once: !0 }))
                        : o();
                    } else t.removeEventListener("click", a.current);
                    r.current = !1;
                  },
                  o = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(o),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", a.current));
                };
              }, [t, n]),
              { onPointerDownCapture: () => (r.current = !0) }
            );
          })((e) => {
            let t = e.target,
              n = [...C.branches].some((e) => e.contains(t));
            L &&
              !n &&
              (null == c || c(e),
              null == w || w(e),
              e.defaultPrevented || null == y || y());
          }, _),
          F = (function (
            e,
            t = null == globalThis ? void 0 : globalThis.document,
          ) {
            let n = (0, f.useCallbackRef)(e),
              r = (0, o.useRef)(!1);
            return (
              (0, o.useEffect)(() => {
                let e = (e) => {
                  e.target &&
                    !r.current &&
                    g(
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
                onFocusCapture: () => (r.current = !0),
                onBlurCapture: () => (r.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...C.branches].some((e) => e.contains(t)) &&
              (null == h || h(e),
              null == w || w(e),
              e.defaultPrevented || null == y || y());
          }, _);
        return (
          (0, p.useEscapeKeydown)((e) => {
            D === C.layers.size - 1 &&
              (null == u || u(e),
              !e.defaultPrevented && y && (e.preventDefault(), y()));
          }, _),
          (0, o.useEffect)(() => {
            if (P)
              return (
                l &&
                  (0 === C.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = _.body.style.pointerEvents),
                    (_.body.style.pointerEvents = "none")),
                  C.layersWithOutsidePointerEventsDisabled.add(P)),
                C.layers.add(P),
                E(),
                () => {
                  l &&
                    1 === C.layersWithOutsidePointerEventsDisabled.size &&
                    (_.body.style.pointerEvents = t);
                }
              );
          }, [P, _, l, C]),
          (0, o.useEffect)(
            () => () => {
              P &&
                (C.layers.delete(P),
                C.layersWithOutsidePointerEventsDisabled.delete(P),
                E());
            },
            [P, C],
          ),
          (0, o.useEffect)(() => {
            let e = () => S({});
            return (
              document.addEventListener(m, e),
              () => document.removeEventListener(m, e)
            );
          }, []),
          (0, o.createElement)(
            d.Primitive.div,
            (0, s.default)({}, b, {
              ref: M,
              style: {
                pointerEvents: O ? (L ? "auto" : "none") : void 0,
                ...e.style,
              },
              onFocusCapture: (0, a.composeEventHandlers)(
                e.onFocusCapture,
                F.onFocusCapture,
              ),
              onBlurCapture: (0, a.composeEventHandlers)(
                e.onBlurCapture,
                F.onBlurCapture,
              ),
              onPointerDownCapture: (0, a.composeEventHandlers)(
                e.onPointerDownCapture,
                I.onPointerDownCapture,
              ),
            }),
          )
        );
      });
    function E() {
      let e = new CustomEvent(m);
      document.dispatchEvent(e);
    }
    function g(e, t, n, { discrete: r }) {
      let o = n.originalEvent.target,
        a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
      (t && o.addEventListener(e, t, { once: !0 }),
        r ? (0, d.dispatchDiscreteCustomEvent)(o, a) : o.dispatchEvent(a));
    }
    let w = 0;
    function y() {
      let e = document.createElement("span");
      return (
        e.setAttribute("data-radix-focus-guard", ""),
        (e.tabIndex = 0),
        (e.style.cssText =
          "outline: none; opacity: 0; position: fixed; pointer-events: none"),
        e
      );
    }
    let b = "focusScope.autoFocusOnMount",
      C = "focusScope.autoFocusOnUnmount",
      P = { bubbles: !1, cancelable: !0 },
      R = (0, o.forwardRef)((e, t) => {
        let {
            loop: n = !1,
            trapped: r = !1,
            onMountAutoFocus: a,
            onUnmountAutoFocus: l,
            ...u
          } = e,
          [c, p] = (0, o.useState)(null),
          m = (0, f.useCallbackRef)(a),
          v = (0, f.useCallbackRef)(l),
          h = (0, o.useRef)(null),
          E = (0, i.useComposedRefs)(t, (e) => p(e)),
          g = (0, o.useRef)({
            paused: !1,
            pause() {
              this.paused = !0;
            },
            resume() {
              this.paused = !1;
            },
          }).current;
        ((0, o.useEffect)(() => {
          if (r) {
            function e(e) {
              if (g.paused || !c) return;
              let t = e.target;
              c.contains(t) ? (h.current = t) : M(h.current, { select: !0 });
            }
            function t(e) {
              if (g.paused || !c) return;
              let t = e.relatedTarget;
              null !== t && (c.contains(t) || M(h.current, { select: !0 }));
            }
            (document.addEventListener("focusin", e),
              document.addEventListener("focusout", t));
            let n = new MutationObserver(function (e) {
              if (document.activeElement === document.body)
                for (let t of e) t.removedNodes.length > 0 && M(c);
            });
            return (
              c && n.observe(c, { childList: !0, subtree: !0 }),
              () => {
                (document.removeEventListener("focusin", e),
                  document.removeEventListener("focusout", t),
                  n.disconnect());
              }
            );
          }
        }, [r, c, g.paused]),
          (0, o.useEffect)(() => {
            if (c) {
              k.add(g);
              let e = document.activeElement;
              if (!c.contains(e)) {
                let t = new CustomEvent(b, P);
                (c.addEventListener(b, m),
                  c.dispatchEvent(t),
                  t.defaultPrevented ||
                    ((function (e, { select: t = !1 } = {}) {
                      let n = document.activeElement;
                      for (let r of e)
                        if ((M(r, { select: t }), document.activeElement !== n))
                          return;
                    })(
                      _(c).filter((e) => "A" !== e.tagName),
                      { select: !0 },
                    ),
                    document.activeElement === e && M(c)));
              }
              return () => {
                (c.removeEventListener(b, m),
                  setTimeout(() => {
                    let t = new CustomEvent(C, P);
                    (c.addEventListener(C, v),
                      c.dispatchEvent(t),
                      t.defaultPrevented ||
                        M(null != e ? e : document.body, { select: !0 }),
                      c.removeEventListener(C, v),
                      k.remove(g));
                  }, 0));
              };
            }
          }, [c, m, v, g]));
        let w = (0, o.useCallback)(
          (e) => {
            if ((!n && !r) || g.paused) return;
            let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
              o = document.activeElement;
            if (t && o) {
              var a;
              let t,
                r = e.currentTarget,
                [l, i] = [S((t = _((a = r))), a), S(t.reverse(), a)];
              l && i
                ? e.shiftKey || o !== i
                  ? e.shiftKey &&
                    o === l &&
                    (e.preventDefault(), n && M(i, { select: !0 }))
                  : (e.preventDefault(), n && M(l, { select: !0 }))
                : o === r && e.preventDefault();
            }
          },
          [n, r, g.paused],
        );
        return (0, o.createElement)(
          d.Primitive.div,
          (0, s.default)({ tabIndex: -1 }, u, { ref: E, onKeyDown: w }),
        );
      });
    function _(e) {
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
    function S(e, t) {
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
    function M(e, { select: t = !1 } = {}) {
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
    let k =
      ((n = []),
      {
        add(e) {
          let t = n[0];
          (e !== t && (null == t || t.pause()), (n = x(n, e)).unshift(e));
        },
        remove(e) {
          var t;
          null == (t = (n = x(n, e))[0]) || t.resume();
        },
      });
    function x(e, t) {
      let n = [...e],
        r = n.indexOf(t);
      return (-1 !== r && n.splice(r, 1), n);
    }
    var T = e.i(266684),
      D = e.i(323337),
      O = e.i(436035);
    let L = (0, o.forwardRef)((e, t) => {
      let { children: n, width: r = 10, height: a = 5, ...l } = e;
      return (0, o.createElement)(
        d.Primitive.svg,
        (0, s.default)({}, l, {
          ref: t,
          width: r,
          height: a,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
        }),
        e.asChild
          ? n
          : (0, o.createElement)("polygon", { points: "0,0 30,0 15,10" }),
      );
    });
    var I = e.i(729094),
      F = e.i(623472);
    let A = "Popper",
      [H, K] = (0, u.createContextScope)(A),
      [N, B] = H(A),
      W = (0, o.forwardRef)((e, t) => {
        let { __scopePopper: n, virtualRef: r, ...a } = e,
          l = B("PopperAnchor", n),
          u = (0, o.useRef)(null),
          c = (0, i.useComposedRefs)(t, u);
        return (
          (0, o.useEffect)(() => {
            l.onAnchorChange((null == r ? void 0 : r.current) || u.current);
          }),
          r
            ? null
            : (0, o.createElement)(
                d.Primitive.div,
                (0, s.default)({}, a, { ref: c }),
              )
        );
      }),
      X = "PopperContent",
      [U, Y] = H(X),
      G = (0, o.forwardRef)((e, t) => {
        var n, r, a, l, u, c, p, m;
        let {
            __scopePopper: v,
            side: h = "bottom",
            sideOffset: E = 0,
            align: g = "center",
            alignOffset: w = 0,
            arrowPadding: y = 0,
            avoidCollisions: b = !0,
            collisionBoundary: C = [],
            collisionPadding: P = 0,
            sticky: R = "partial",
            hideWhenDetached: _ = !1,
            updatePositionStrategy: S = "optimized",
            onPlaced: M,
            ...k
          } = e,
          x = B(X, v),
          [T, L] = (0, o.useState)(null),
          A = (0, i.useComposedRefs)(t, (e) => L(e)),
          [H, K] = (0, o.useState)(null),
          N = (0, F.useSize)(H),
          W = null != (n = null == N ? void 0 : N.width) ? n : 0,
          Y = null != (r = null == N ? void 0 : N.height) ? r : 0,
          G =
            "number" == typeof P
              ? P
              : { top: 0, right: 0, bottom: 0, left: 0, ...P },
          z = Array.isArray(C) ? C : [C],
          $ = z.length > 0,
          q = { padding: G, boundary: z.filter(V), altBoundary: $ },
          {
            refs: J,
            floatingStyles: Q,
            placement: ee,
            isPositioned: et,
            middlewareData: en,
          } = (0, D.useFloating)({
            strategy: "fixed",
            placement: h + ("center" !== g ? "-" + g : ""),
            whileElementsMounted: (...e) =>
              (0, O.autoUpdate)(...e, { animationFrame: "always" === S }),
            elements: { reference: x.anchor },
            middleware: [
              (0, D.offset)({ mainAxis: E + Y, alignmentAxis: w }),
              b &&
                (0, D.shift)({
                  mainAxis: !0,
                  crossAxis: !1,
                  limiter: "partial" === R ? (0, D.limitShift)() : void 0,
                  ...q,
                }),
              b && (0, D.flip)({ ...q }),
              (0, D.size)({
                ...q,
                apply: ({
                  elements: e,
                  rects: t,
                  availableWidth: n,
                  availableHeight: r,
                }) => {
                  let { width: o, height: a } = t.reference,
                    l = e.floating.style;
                  (l.setProperty("--radix-popper-available-width", `${n}px`),
                    l.setProperty("--radix-popper-available-height", `${r}px`),
                    l.setProperty("--radix-popper-anchor-width", `${o}px`),
                    l.setProperty("--radix-popper-anchor-height", `${a}px`));
                },
              }),
              H && (0, D.arrow)({ element: H, padding: y }),
              j({ arrowWidth: W, arrowHeight: Y }),
              _ && (0, D.hide)({ strategy: "referenceHidden", ...q }),
            ],
          }),
          [er, eo] = Z(ee),
          ea = (0, f.useCallbackRef)(M);
        (0, I.useLayoutEffect)(() => {
          et && (null == ea || ea());
        }, [et, ea]);
        let el = null == (a = en.arrow) ? void 0 : a.x,
          ei = null == (l = en.arrow) ? void 0 : l.y,
          eu = (null == (u = en.arrow) ? void 0 : u.centerOffset) !== 0,
          [ec, es] = (0, o.useState)();
        return (
          (0, I.useLayoutEffect)(() => {
            T && es(window.getComputedStyle(T).zIndex);
          }, [T]),
          (0, o.createElement)(
            "div",
            {
              ref: J.setFloating,
              "data-radix-popper-content-wrapper": "",
              style: {
                ...Q,
                transform: et ? Q.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: ec,
                "--radix-popper-transform-origin": [
                  null == (c = en.transformOrigin) ? void 0 : c.x,
                  null == (p = en.transformOrigin) ? void 0 : p.y,
                ].join(" "),
              },
              dir: e.dir,
            },
            (0, o.createElement)(
              U,
              {
                scope: v,
                placedSide: er,
                onArrowChange: K,
                arrowX: el,
                arrowY: ei,
                shouldHideArrow: eu,
              },
              (0, o.createElement)(
                d.Primitive.div,
                (0, s.default)({ "data-side": er, "data-align": eo }, k, {
                  ref: A,
                  style: {
                    ...k.style,
                    animation: et ? void 0 : "none",
                    opacity:
                      null != (m = en.hide) && m.referenceHidden ? 0 : void 0,
                  },
                }),
              ),
            ),
          )
        );
      }),
      z = { top: "bottom", right: "left", bottom: "top", left: "right" },
      $ = (0, o.forwardRef)(function (e, t) {
        let { __scopePopper: n, ...r } = e,
          a = Y("PopperArrow", n),
          l = z[a.placedSide];
        return (0, o.createElement)(
          "span",
          {
            ref: a.onArrowChange,
            style: {
              position: "absolute",
              left: a.arrowX,
              top: a.arrowY,
              [l]: 0,
              transformOrigin: {
                top: "",
                right: "0 0",
                bottom: "center 0",
                left: "100% 0",
              }[a.placedSide],
              transform: {
                top: "translateY(100%)",
                right: "translateY(50%) rotate(90deg) translateX(-50%)",
                bottom: "rotate(180deg)",
                left: "translateY(50%) rotate(-90deg) translateX(50%)",
              }[a.placedSide],
              visibility: a.shouldHideArrow ? "hidden" : void 0,
            },
          },
          (0, o.createElement)(
            L,
            (0, s.default)({}, r, {
              ref: t,
              style: { ...r.style, display: "block" },
            }),
          ),
        );
      });
    function V(e) {
      return null !== e;
    }
    let j = (e) => ({
      name: "transformOrigin",
      options: e,
      fn(t) {
        var n, r, o, a, l;
        let { placement: i, rects: u, middlewareData: c } = t,
          s = (null == (n = c.arrow) ? void 0 : n.centerOffset) !== 0,
          d = s ? 0 : e.arrowWidth,
          f = s ? 0 : e.arrowHeight,
          [p, m] = Z(i),
          v = { start: "0%", center: "50%", end: "100%" }[m],
          h =
            (null != (r = null == (o = c.arrow) ? void 0 : o.x) ? r : 0) +
            d / 2,
          E =
            (null != (a = null == (l = c.arrow) ? void 0 : l.y) ? a : 0) +
            f / 2,
          g = "",
          w = "";
        return (
          "bottom" === p
            ? ((g = s ? v : `${h}px`), (w = `${-f}px`))
            : "top" === p
              ? ((g = s ? v : `${h}px`), (w = `${u.floating.height + f}px`))
              : "right" === p
                ? ((g = `${-f}px`), (w = s ? v : `${E}px`))
                : "left" === p &&
                  ((g = `${u.floating.width + f}px`), (w = s ? v : `${E}px`)),
          { data: { x: g, y: w } }
        );
      },
    });
    function Z(e) {
      let [t, n = "center"] = e.split("-");
      return [t, n];
    }
    let q = (e) => {
      let { __scopePopper: t, children: n } = e,
        [r, a] = (0, o.useState)(null);
      return (0, o.createElement)(
        N,
        { scope: t, anchor: r, onAnchorChange: a },
        n,
      );
    };
    var J = e.i(546564);
    let Q = (0, o.forwardRef)((e, t) => {
      var n;
      let {
        container: a = null == globalThis || null == (n = globalThis.document)
          ? void 0
          : n.body,
        ...l
      } = e;
      return a
        ? J.default.createPortal(
            (0, o.createElement)(
              d.Primitive.div,
              (0, r.default)({}, l, { ref: t }),
            ),
            a,
          )
        : null;
    });
    var ee = e.i(713416),
      et = e.i(951676),
      en = e.i(790456),
      er = e.i(645751),
      eo = e.i(824627),
      ea = e.i(992330),
      el = e.i(816370),
      ei = (0, e.i(906606).createSidecarMedium)(),
      eu = function () {},
      ec = o.forwardRef(function (e, t) {
        var n = o.useRef(null),
          r = o.useState({
            onScrollCapture: eu,
            onWheelCapture: eu,
            onTouchMoveCapture: eu,
          }),
          a = r[0],
          l = r[1],
          i = e.forwardProps,
          u = e.children,
          c = e.className,
          s = e.removeScrollBar,
          d = e.enabled,
          f = e.shards,
          p = e.sideCar,
          m = e.noIsolation,
          v = e.inert,
          h = e.allowPinchZoom,
          E = e.as,
          g = (0, eo.__rest)(e, [
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
          ]),
          w = (0, el.useMergeRefs)([n, t]),
          y = (0, eo.__assign)((0, eo.__assign)({}, g), a);
        return o.createElement(
          o.Fragment,
          null,
          d &&
            o.createElement(p, {
              sideCar: ei,
              removeScrollBar: s,
              shards: f,
              noIsolation: m,
              inert: v,
              setCallbacks: l,
              allowPinchZoom: !!h,
              lockRef: n,
            }),
          i
            ? o.cloneElement(
                o.Children.only(u),
                (0, eo.__assign)((0, eo.__assign)({}, y), { ref: w }),
              )
            : o.createElement(
                void 0 === E ? "div" : E,
                (0, eo.__assign)({}, y, { className: c, ref: w }),
                u,
              ),
        );
      });
    ((ec.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
      (ec.classNames = {
        fullWidth: ea.fullWidthClassName,
        zeroRight: ea.zeroRightClassName,
      }));
    var es = e.i(946382);
    e.i(304606);
    var ed = e.i(494643);
    e.i(246359);
    var ef = e.i(769126),
      ep = !1;
    if ("undefined" != typeof window)
      try {
        var em = Object.defineProperty({}, "passive", {
          get: function () {
            return ((ep = !0), !0);
          },
        });
        (window.addEventListener("test", em, em),
          window.removeEventListener("test", em, em));
      } catch (e) {
        ep = !1;
      }
    var ev = !!ep && { passive: !1 },
      eh = function (e, t) {
        var n = window.getComputedStyle(e);
        return (
          "hidden" !== n[t] &&
          (n.overflowY !== n.overflowX ||
            "TEXTAREA" === e.tagName ||
            "visible" !== n[t])
        );
      },
      eE = function (e, t) {
        var n = t;
        do {
          if (
            ("undefined" != typeof ShadowRoot &&
              n instanceof ShadowRoot &&
              (n = n.host),
            eg(e, n))
          ) {
            var r = ew(e, n);
            if (r[1] > r[2]) return !0;
          }
          n = n.parentNode;
        } while (n && n !== document.body);
        return !1;
      },
      eg = function (e, t) {
        return "v" === e ? eh(t, "overflowY") : eh(t, "overflowX");
      },
      ew = function (e, t) {
        return "v" === e
          ? [t.scrollTop, t.scrollHeight, t.clientHeight]
          : [t.scrollLeft, t.scrollWidth, t.clientWidth];
      },
      ey = function (e, t, n, r, o) {
        var a,
          l =
            ((a = window.getComputedStyle(t).direction),
            "h" === e && "rtl" === a ? -1 : 1),
          i = l * r,
          u = n.target,
          c = t.contains(u),
          s = !1,
          d = i > 0,
          f = 0,
          p = 0;
        do {
          var m = ew(e, u),
            v = m[0],
            h = m[1] - m[2] - l * v;
          ((v || h) && eg(e, u) && ((f += h), (p += v)), (u = u.parentNode));
        } while (
          (!c && u !== document.body) ||
          (c && (t.contains(u) || t === u))
        );
        return (
          d && ((o && 0 === f) || (!o && i > f))
            ? (s = !0)
            : !d && ((o && 0 === p) || (!o && -i > p)) && (s = !0),
          s
        );
      },
      eb = function (e) {
        return "changedTouches" in e
          ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
          : [0, 0];
      },
      eC = function (e) {
        return [e.deltaX, e.deltaY];
      },
      eP = function (e) {
        return e && "current" in e ? e.current : e;
      },
      eR = 0,
      e_ = [];
    let eS = (0, es.exportSidecar)(ei, function (e) {
      var t = o.useRef([]),
        n = o.useRef([0, 0]),
        r = o.useRef(),
        a = o.useState(eR++)[0],
        l = o.useState(function () {
          return (0, ef.styleSingleton)();
        })[0],
        i = o.useRef(e);
      (o.useEffect(
        function () {
          i.current = e;
        },
        [e],
      ),
        o.useEffect(
          function () {
            if (e.inert) {
              document.body.classList.add("block-interactivity-".concat(a));
              var t = (0, eo.__spreadArray)(
                [e.lockRef.current],
                (e.shards || []).map(eP),
                !0,
              ).filter(Boolean);
              return (
                t.forEach(function (e) {
                  return e.classList.add("allow-interactivity-".concat(a));
                }),
                function () {
                  (document.body.classList.remove(
                    "block-interactivity-".concat(a),
                  ),
                    t.forEach(function (e) {
                      return e.classList.remove(
                        "allow-interactivity-".concat(a),
                      );
                    }));
                }
              );
            }
          },
          [e.inert, e.lockRef.current, e.shards],
        ));
      var u = o.useCallback(function (e, t) {
          if ("touches" in e && 2 === e.touches.length)
            return !i.current.allowPinchZoom;
          var o,
            a = eb(e),
            l = n.current,
            u = "deltaX" in e ? e.deltaX : l[0] - a[0],
            c = "deltaY" in e ? e.deltaY : l[1] - a[1],
            s = e.target,
            d = Math.abs(u) > Math.abs(c) ? "h" : "v";
          if ("touches" in e && "h" === d && "range" === s.type) return !1;
          var f = eE(d, s);
          if (!f) return !0;
          if ((f ? (o = d) : ((o = "v" === d ? "h" : "v"), (f = eE(d, s))), !f))
            return !1;
          if (
            (!r.current && "changedTouches" in e && (u || c) && (r.current = o),
            !o)
          )
            return !0;
          var p = r.current || o;
          return ey(p, t, e, "h" === p ? u : c, !0);
        }, []),
        c = o.useCallback(function (e) {
          if (e_.length && e_[e_.length - 1] === l) {
            var n = "deltaY" in e ? eC(e) : eb(e),
              r = t.current.filter(function (t) {
                var r;
                return (
                  t.name === e.type &&
                  t.target === e.target &&
                  ((r = t.delta), r[0] === n[0] && r[1] === n[1])
                );
              })[0];
            if (r && r.should) {
              e.cancelable && e.preventDefault();
              return;
            }
            if (!r) {
              var o = (i.current.shards || [])
                .map(eP)
                .filter(Boolean)
                .filter(function (t) {
                  return t.contains(e.target);
                });
              (o.length > 0 ? u(e, o[0]) : !i.current.noIsolation) &&
                e.cancelable &&
                e.preventDefault();
            }
          }
        }, []),
        s = o.useCallback(function (e, n, r, o) {
          var a = { name: e, delta: n, target: r, should: o };
          (t.current.push(a),
            setTimeout(function () {
              t.current = t.current.filter(function (e) {
                return e !== a;
              });
            }, 1));
        }, []),
        d = o.useCallback(function (e) {
          ((n.current = eb(e)), (r.current = void 0));
        }, []),
        f = o.useCallback(function (t) {
          s(t.type, eC(t), t.target, u(t, e.lockRef.current));
        }, []),
        p = o.useCallback(function (t) {
          s(t.type, eb(t), t.target, u(t, e.lockRef.current));
        }, []);
      o.useEffect(function () {
        return (
          e_.push(l),
          e.setCallbacks({
            onScrollCapture: f,
            onWheelCapture: f,
            onTouchMoveCapture: p,
          }),
          document.addEventListener("wheel", c, ev),
          document.addEventListener("touchmove", c, ev),
          document.addEventListener("touchstart", d, ev),
          function () {
            ((e_ = e_.filter(function (e) {
              return e !== l;
            })),
              document.removeEventListener("wheel", c, ev),
              document.removeEventListener("touchmove", c, ev),
              document.removeEventListener("touchstart", d, ev));
          }
        );
      }, []);
      var m = e.removeScrollBar,
        v = e.inert;
      return o.createElement(
        o.Fragment,
        null,
        v
          ? o.createElement(l, {
              styles: "\n  .block-interactivity-"
                .concat(a, " {pointer-events: none;}\n  .allow-interactivity-")
                .concat(a, " {pointer-events: all;}\n"),
            })
          : null,
        m ? o.createElement(ed.RemoveScrollBar, { gapMode: "margin" }) : null,
      );
    });
    var eM = o.forwardRef(function (e, t) {
      return o.createElement(
        ec,
        (0, eo.__assign)({}, e, { ref: t, sideCar: eS }),
      );
    });
    eM.classNames = ec.classNames;
    let ek = ["Enter", " "],
      ex = ["ArrowUp", "PageDown", "End"],
      eT = ["ArrowDown", "PageUp", "Home", ...ex],
      eD = { ltr: [...ek, "ArrowRight"], rtl: [...ek, "ArrowLeft"] },
      eO = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
      eL = "Menu",
      [eI, eF, eA] = (0, l.createCollection)(eL),
      [eH, eK] = (0, u.createContextScope)(eL, [
        eA,
        K,
        et.createRovingFocusGroupScope,
      ]),
      eN = K(),
      eB = (0, et.createRovingFocusGroupScope)(),
      [eW, eX] = eH(eL),
      [eU, eY] = eH(eL),
      eG = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, ...a } = e,
          l = eN(n);
        return (0, o.createElement)(W, (0, r.default)({}, l, a, { ref: t }));
      }),
      ez = "MenuPortal",
      [e$, eV] = eH(ez, { forceMount: void 0 }),
      ej = "MenuContent",
      [eZ, eq] = eH(ej),
      eJ = (0, o.forwardRef)((e, t) => {
        let n = eV(ej, e.__scopeMenu),
          { forceMount: a = n.forceMount, ...l } = e,
          i = eX(ej, e.__scopeMenu),
          u = eY(ej, e.__scopeMenu);
        return (0, o.createElement)(
          eI.Provider,
          { scope: e.__scopeMenu },
          (0, o.createElement)(
            ee.Presence,
            { present: a || i.open },
            (0, o.createElement)(
              eI.Slot,
              { scope: e.__scopeMenu },
              u.modal
                ? (0, o.createElement)(eQ, (0, r.default)({}, l, { ref: t }))
                : (0, o.createElement)(e0, (0, r.default)({}, l, { ref: t })),
            ),
          ),
        );
      }),
      eQ = (0, o.forwardRef)((e, t) => {
        let n = eX(ej, e.__scopeMenu),
          l = (0, o.useRef)(null),
          u = (0, i.useComposedRefs)(t, l);
        return (
          (0, o.useEffect)(() => {
            let e = l.current;
            if (e) return (0, er.hideOthers)(e);
          }, []),
          (0, o.createElement)(
            e1,
            (0, r.default)({}, e, {
              ref: u,
              trapFocus: n.open,
              disableOutsidePointerEvents: n.open,
              disableOutsideScroll: !0,
              onFocusOutside: (0, a.composeEventHandlers)(
                e.onFocusOutside,
                (e) => e.preventDefault(),
                { checkForDefaultPrevented: !1 },
              ),
              onDismiss: () => n.onOpenChange(!1),
            }),
          )
        );
      }),
      e0 = (0, o.forwardRef)((e, t) => {
        let n = eX(ej, e.__scopeMenu);
        return (0, o.createElement)(
          e1,
          (0, r.default)({}, e, {
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            onDismiss: () => n.onOpenChange(!1),
          }),
        );
      }),
      e1 = (0, o.forwardRef)((e, t) => {
        let {
            __scopeMenu: n,
            loop: l = !1,
            trapFocus: u,
            onOpenAutoFocus: c,
            onCloseAutoFocus: s,
            disableOutsidePointerEvents: d,
            onEntryFocus: f,
            onEscapeKeyDown: p,
            onPointerDownOutside: m,
            onFocusOutside: v,
            onInteractOutside: E,
            onDismiss: g,
            disableOutsideScroll: b,
            ...C
          } = e,
          P = eX(ej, n),
          _ = eY(ej, n),
          S = eN(n),
          M = eB(n),
          k = eF(n),
          [x, T] = (0, o.useState)(null),
          D = (0, o.useRef)(null),
          O = (0, i.useComposedRefs)(t, D, P.onContentChange),
          L = (0, o.useRef)(0),
          I = (0, o.useRef)(""),
          F = (0, o.useRef)(0),
          A = (0, o.useRef)(null),
          H = (0, o.useRef)("right"),
          K = (0, o.useRef)(0),
          N = b ? eM : o.Fragment,
          B = b ? { as: en.Slot, allowPinchZoom: !0 } : void 0;
        ((0, o.useEffect)(() => () => window.clearTimeout(L.current), []),
          (0, o.useEffect)(() => {
            var e, t;
            let n = document.querySelectorAll("[data-radix-focus-guard]");
            return (
              document.body.insertAdjacentElement(
                "afterbegin",
                null != (e = n[0]) ? e : y(),
              ),
              document.body.insertAdjacentElement(
                "beforeend",
                null != (t = n[1]) ? t : y(),
              ),
              w++,
              () => {
                (1 === w &&
                  document
                    .querySelectorAll("[data-radix-focus-guard]")
                    .forEach((e) => e.remove()),
                  w--);
              }
            );
          }, []));
        let W = (0, o.useCallback)((e) => {
          var t, n, r, o;
          return (
            H.current === (null == (t = A.current) ? void 0 : t.side) &&
            ((r = e),
            !!(o = null == (n = A.current) ? void 0 : n.area) &&
              (function (e, t) {
                let { x: n, y: r } = e,
                  o = !1;
                for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
                  let l = t[e].x,
                    i = t[e].y,
                    u = t[a].x,
                    c = t[a].y;
                  i > r != c > r &&
                    n < ((u - l) * (r - i)) / (c - i) + l &&
                    (o = !o);
                }
                return o;
              })({ x: r.clientX, y: r.clientY }, o))
          );
        }, []);
        return (0, o.createElement)(
          eZ,
          {
            scope: n,
            searchRef: I,
            onItemEnter: (0, o.useCallback)(
              (e) => {
                W(e) && e.preventDefault();
              },
              [W],
            ),
            onItemLeave: (0, o.useCallback)(
              (e) => {
                var t;
                W(e) || (null == (t = D.current) || t.focus(), T(null));
              },
              [W],
            ),
            onTriggerLeave: (0, o.useCallback)(
              (e) => {
                W(e) && e.preventDefault();
              },
              [W],
            ),
            pointerGraceTimerRef: F,
            onPointerGraceIntentChange: (0, o.useCallback)((e) => {
              A.current = e;
            }, []),
          },
          (0, o.createElement)(
            N,
            B,
            (0, o.createElement)(
              R,
              {
                asChild: !0,
                trapped: u,
                onMountAutoFocus: (0, a.composeEventHandlers)(c, (e) => {
                  var t;
                  (e.preventDefault(), null == (t = D.current) || t.focus());
                }),
                onUnmountAutoFocus: s,
              },
              (0, o.createElement)(
                h,
                {
                  asChild: !0,
                  disableOutsidePointerEvents: d,
                  onEscapeKeyDown: p,
                  onPointerDownOutside: m,
                  onFocusOutside: v,
                  onInteractOutside: E,
                  onDismiss: g,
                },
                (0, o.createElement)(
                  et.Root,
                  (0, r.default)({ asChild: !0 }, M, {
                    dir: _.dir,
                    orientation: "vertical",
                    loop: l,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: T,
                    onEntryFocus: (0, a.composeEventHandlers)(f, (e) => {
                      _.isUsingKeyboardRef.current || e.preventDefault();
                    }),
                  }),
                  (0, o.createElement)(
                    G,
                    (0, r.default)(
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": tv(P.open),
                        "data-radix-menu-content": "",
                        dir: _.dir,
                      },
                      S,
                      C,
                      {
                        ref: O,
                        style: { outline: "none", ...C.style },
                        onKeyDown: (0, a.composeEventHandlers)(
                          C.onKeyDown,
                          (e) => {
                            let t =
                                e.target.closest(
                                  "[data-radix-menu-content]",
                                ) === e.currentTarget,
                              n = e.ctrlKey || e.altKey || e.metaKey,
                              r = 1 === e.key.length;
                            if (t) {
                              var o, a, l;
                              let t, i, u, c, s, d;
                              ("Tab" === e.key && e.preventDefault(),
                                !n &&
                                  r &&
                                  ((o = e.key),
                                  (t = I.current + o),
                                  (i = k().filter((e) => !e.disabled)),
                                  (u = document.activeElement),
                                  (c =
                                    null ==
                                    (a = i.find((e) => e.ref.current === u))
                                      ? void 0
                                      : a.textValue),
                                  (s = (function (e, t, n) {
                                    var r;
                                    let o =
                                        t.length > 1 &&
                                        Array.from(t).every((e) => e === t[0])
                                          ? t[0]
                                          : t,
                                      a = n ? e.indexOf(n) : -1,
                                      l =
                                        ((r = Math.max(a, 0)),
                                        e.map((t, n) => e[(r + n) % e.length]));
                                    1 === o.length &&
                                      (l = l.filter((e) => e !== n));
                                    let i = l.find((e) =>
                                      e
                                        .toLowerCase()
                                        .startsWith(o.toLowerCase()),
                                    );
                                    return i !== n ? i : void 0;
                                  })(
                                    i.map((e) => e.textValue),
                                    t,
                                    c,
                                  )),
                                  (d =
                                    null ==
                                    (l = i.find((e) => e.textValue === s))
                                      ? void 0
                                      : l.ref.current),
                                  (function e(t) {
                                    ((I.current = t),
                                      window.clearTimeout(L.current),
                                      "" !== t &&
                                        (L.current = window.setTimeout(
                                          () => e(""),
                                          1e3,
                                        )));
                                  })(t),
                                  d && setTimeout(() => d.focus())));
                            }
                            let i = D.current;
                            if (e.target !== i || !eT.includes(e.key)) return;
                            e.preventDefault();
                            let u = k()
                              .filter((e) => !e.disabled)
                              .map((e) => e.ref.current);
                            (ex.includes(e.key) && u.reverse(),
                              (function (e) {
                                let t = document.activeElement;
                                for (let n of e)
                                  if (
                                    n === t ||
                                    (n.focus(), document.activeElement !== t)
                                  )
                                    return;
                              })(u));
                          },
                        ),
                        onBlur: (0, a.composeEventHandlers)(e.onBlur, (e) => {
                          e.currentTarget.contains(e.target) ||
                            (window.clearTimeout(L.current), (I.current = ""));
                        }),
                        onPointerMove: (0, a.composeEventHandlers)(
                          e.onPointerMove,
                          tg((e) => {
                            let t = e.target,
                              n = K.current !== e.clientX;
                            e.currentTarget.contains(t) &&
                              n &&
                              ((H.current =
                                e.clientX > K.current ? "right" : "left"),
                              (K.current = e.clientX));
                          }),
                        ),
                      },
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      }),
      e3 = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, ...a } = e;
        return (0, o.createElement)(
          d.Primitive.div,
          (0, r.default)({ role: "group" }, a, { ref: t }),
        );
      }),
      e6 = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, ...a } = e;
        return (0, o.createElement)(
          d.Primitive.div,
          (0, r.default)({}, a, { ref: t }),
        );
      }),
      e2 = "MenuItem",
      e7 = "menu.itemSelect",
      e4 = (0, o.forwardRef)((e, t) => {
        let { disabled: n = !1, onSelect: l, ...u } = e,
          c = (0, o.useRef)(null),
          s = eY(e2, e.__scopeMenu),
          f = eq(e2, e.__scopeMenu),
          p = (0, i.useComposedRefs)(t, c),
          m = (0, o.useRef)(!1);
        return (0, o.createElement)(
          e5,
          (0, r.default)({}, u, {
            ref: p,
            disabled: n,
            onClick: (0, a.composeEventHandlers)(e.onClick, () => {
              let e = c.current;
              if (!n && e) {
                let t = new CustomEvent(e7, { bubbles: !0, cancelable: !0 });
                (e.addEventListener(e7, (e) => (null == l ? void 0 : l(e)), {
                  once: !0,
                }),
                  (0, d.dispatchDiscreteCustomEvent)(e, t),
                  t.defaultPrevented ? (m.current = !1) : s.onClose());
              }
            }),
            onPointerDown: (t) => {
              var n;
              (null == (n = e.onPointerDown) || n.call(e, t), (m.current = !0));
            },
            onPointerUp: (0, a.composeEventHandlers)(e.onPointerUp, (e) => {
              var t;
              m.current || null == (t = e.currentTarget) || t.click();
            }),
            onKeyDown: (0, a.composeEventHandlers)(e.onKeyDown, (e) => {
              let t = "" !== f.searchRef.current;
              n ||
                (t && " " === e.key) ||
                (ek.includes(e.key) &&
                  (e.currentTarget.click(), e.preventDefault()));
            }),
          }),
        );
      }),
      e5 = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, disabled: l = !1, textValue: u, ...c } = e,
          s = eq(e2, n),
          f = eB(n),
          p = (0, o.useRef)(null),
          m = (0, i.useComposedRefs)(t, p),
          [v, h] = (0, o.useState)(!1),
          [E, g] = (0, o.useState)("");
        return (
          (0, o.useEffect)(() => {
            let e = p.current;
            if (e) {
              var t;
              g((null != (t = e.textContent) ? t : "").trim());
            }
          }, [c.children]),
          (0, o.createElement)(
            eI.ItemSlot,
            { scope: n, disabled: l, textValue: null != u ? u : E },
            (0, o.createElement)(
              et.Item,
              (0, r.default)({ asChild: !0 }, f, { focusable: !l }),
              (0, o.createElement)(
                d.Primitive.div,
                (0, r.default)(
                  {
                    role: "menuitem",
                    "data-highlighted": v ? "" : void 0,
                    "aria-disabled": l || void 0,
                    "data-disabled": l ? "" : void 0,
                  },
                  c,
                  {
                    ref: m,
                    onPointerMove: (0, a.composeEventHandlers)(
                      e.onPointerMove,
                      tg((e) => {
                        l
                          ? s.onItemLeave(e)
                          : (s.onItemEnter(e),
                            e.defaultPrevented || e.currentTarget.focus());
                      }),
                    ),
                    onPointerLeave: (0, a.composeEventHandlers)(
                      e.onPointerLeave,
                      tg((e) => s.onItemLeave(e)),
                    ),
                    onFocus: (0, a.composeEventHandlers)(e.onFocus, () =>
                      h(!0),
                    ),
                    onBlur: (0, a.composeEventHandlers)(e.onBlur, () => h(!1)),
                  },
                ),
              ),
            ),
          )
        );
      }),
      e9 = (0, o.forwardRef)((e, t) => {
        let { checked: n = !1, onCheckedChange: l, ...i } = e;
        return (0, o.createElement)(
          to,
          { scope: e.__scopeMenu, checked: n },
          (0, o.createElement)(
            e4,
            (0, r.default)(
              { role: "menuitemcheckbox", "aria-checked": th(n) ? "mixed" : n },
              i,
              {
                ref: t,
                "data-state": tE(n),
                onSelect: (0, a.composeEventHandlers)(
                  i.onSelect,
                  () => (null == l ? void 0 : l(!!th(n) || !n)),
                  { checkForDefaultPrevented: !1 },
                ),
              },
            ),
          ),
        );
      }),
      [e8, te] = eH("MenuRadioGroup", {
        value: void 0,
        onValueChange: () => {},
      }),
      tt = (0, o.forwardRef)((e, t) => {
        let { value: n, onValueChange: a, ...l } = e,
          i = (0, f.useCallbackRef)(a);
        return (0, o.createElement)(
          e8,
          { scope: e.__scopeMenu, value: n, onValueChange: i },
          (0, o.createElement)(e3, (0, r.default)({}, l, { ref: t })),
        );
      }),
      tn = (0, o.forwardRef)((e, t) => {
        let { value: n, ...l } = e,
          i = te("MenuRadioItem", e.__scopeMenu),
          u = n === i.value;
        return (0, o.createElement)(
          to,
          { scope: e.__scopeMenu, checked: u },
          (0, o.createElement)(
            e4,
            (0, r.default)({ role: "menuitemradio", "aria-checked": u }, l, {
              ref: t,
              "data-state": tE(u),
              onSelect: (0, a.composeEventHandlers)(
                l.onSelect,
                () => {
                  var e;
                  return null == (e = i.onValueChange) ? void 0 : e.call(i, n);
                },
                { checkForDefaultPrevented: !1 },
              ),
            }),
          ),
        );
      }),
      tr = "MenuItemIndicator",
      [to, ta] = eH(tr, { checked: !1 }),
      tl = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, forceMount: a, ...l } = e,
          i = ta(tr, n);
        return (0, o.createElement)(
          ee.Presence,
          { present: a || th(i.checked) || !0 === i.checked },
          (0, o.createElement)(
            d.Primitive.span,
            (0, r.default)({}, l, { ref: t, "data-state": tE(i.checked) }),
          ),
        );
      }),
      ti = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, ...a } = e;
        return (0, o.createElement)(
          d.Primitive.div,
          (0, r.default)(
            { role: "separator", "aria-orientation": "horizontal" },
            a,
            { ref: t },
          ),
        );
      }),
      tu = (0, o.forwardRef)((e, t) => {
        let { __scopeMenu: n, ...a } = e,
          l = eN(n);
        return (0, o.createElement)($, (0, r.default)({}, l, a, { ref: t }));
      }),
      tc = "MenuSub",
      [ts, td] = eH(tc),
      tf = "MenuSubTrigger",
      tp = (0, o.forwardRef)((e, t) => {
        let n = eX(tf, e.__scopeMenu),
          l = eY(tf, e.__scopeMenu),
          u = td(tf, e.__scopeMenu),
          c = eq(tf, e.__scopeMenu),
          s = (0, o.useRef)(null),
          { pointerGraceTimerRef: d, onPointerGraceIntentChange: f } = c,
          p = { __scopeMenu: e.__scopeMenu },
          m = (0, o.useCallback)(() => {
            (s.current && window.clearTimeout(s.current), (s.current = null));
          }, []);
        return (
          (0, o.useEffect)(() => m, [m]),
          (0, o.useEffect)(() => {
            let e = d.current;
            return () => {
              (window.clearTimeout(e), f(null));
            };
          }, [d, f]),
          (0, o.createElement)(
            eG,
            (0, r.default)({ asChild: !0 }, p),
            (0, o.createElement)(
              e5,
              (0, r.default)(
                {
                  id: u.triggerId,
                  "aria-haspopup": "menu",
                  "aria-expanded": n.open,
                  "aria-controls": u.contentId,
                  "data-state": tv(n.open),
                },
                e,
                {
                  ref: (0, i.composeRefs)(t, u.onTriggerChange),
                  onClick: (t) => {
                    var r;
                    (null == (r = e.onClick) || r.call(e, t),
                      e.disabled ||
                        t.defaultPrevented ||
                        (t.currentTarget.focus(),
                        n.open || n.onOpenChange(!0)));
                  },
                  onPointerMove: (0, a.composeEventHandlers)(
                    e.onPointerMove,
                    tg((t) => {
                      (c.onItemEnter(t),
                        !t.defaultPrevented &&
                          (e.disabled ||
                            n.open ||
                            s.current ||
                            (c.onPointerGraceIntentChange(null),
                            (s.current = window.setTimeout(() => {
                              (n.onOpenChange(!0), m());
                            }, 100)))));
                    }),
                  ),
                  onPointerLeave: (0, a.composeEventHandlers)(
                    e.onPointerLeave,
                    tg((e) => {
                      var t, r;
                      m();
                      let o =
                        null == (t = n.content)
                          ? void 0
                          : t.getBoundingClientRect();
                      if (o) {
                        let t =
                            null == (r = n.content) ? void 0 : r.dataset.side,
                          a = "right" === t,
                          l = o[a ? "left" : "right"],
                          i = o[a ? "right" : "left"];
                        (c.onPointerGraceIntentChange({
                          area: [
                            { x: e.clientX + (a ? -5 : 5), y: e.clientY },
                            { x: l, y: o.top },
                            { x: i, y: o.top },
                            { x: i, y: o.bottom },
                            { x: l, y: o.bottom },
                          ],
                          side: t,
                        }),
                          window.clearTimeout(d.current),
                          (d.current = window.setTimeout(
                            () => c.onPointerGraceIntentChange(null),
                            300,
                          )));
                      } else {
                        if ((c.onTriggerLeave(e), e.defaultPrevented)) return;
                        c.onPointerGraceIntentChange(null);
                      }
                    }),
                  ),
                  onKeyDown: (0, a.composeEventHandlers)(e.onKeyDown, (t) => {
                    let r = "" !== c.searchRef.current;
                    if (
                      !e.disabled &&
                      (!r || " " !== t.key) &&
                      eD[l.dir].includes(t.key)
                    ) {
                      var o;
                      (n.onOpenChange(!0),
                        null == (o = n.content) || o.focus(),
                        t.preventDefault());
                    }
                  }),
                },
              ),
            ),
          )
        );
      }),
      tm = (0, o.forwardRef)((e, t) => {
        let n = eV(ej, e.__scopeMenu),
          { forceMount: l = n.forceMount, ...u } = e,
          c = eX(ej, e.__scopeMenu),
          s = eY(ej, e.__scopeMenu),
          d = td("MenuSubContent", e.__scopeMenu),
          f = (0, o.useRef)(null),
          p = (0, i.useComposedRefs)(t, f);
        return (0, o.createElement)(
          eI.Provider,
          { scope: e.__scopeMenu },
          (0, o.createElement)(
            ee.Presence,
            { present: l || c.open },
            (0, o.createElement)(
              eI.Slot,
              { scope: e.__scopeMenu },
              (0, o.createElement)(
                e1,
                (0, r.default)(
                  { id: d.contentId, "aria-labelledby": d.triggerId },
                  u,
                  {
                    ref: p,
                    align: "start",
                    side: "rtl" === s.dir ? "left" : "right",
                    disableOutsidePointerEvents: !1,
                    disableOutsideScroll: !1,
                    trapFocus: !1,
                    onOpenAutoFocus: (e) => {
                      var t;
                      (s.isUsingKeyboardRef.current &&
                        (null == (t = f.current) || t.focus()),
                        e.preventDefault());
                    },
                    onCloseAutoFocus: (e) => e.preventDefault(),
                    onFocusOutside: (0, a.composeEventHandlers)(
                      e.onFocusOutside,
                      (e) => {
                        e.target !== d.trigger && c.onOpenChange(!1);
                      },
                    ),
                    onEscapeKeyDown: (0, a.composeEventHandlers)(
                      e.onEscapeKeyDown,
                      (e) => {
                        (s.onClose(), e.preventDefault());
                      },
                    ),
                    onKeyDown: (0, a.composeEventHandlers)(e.onKeyDown, (e) => {
                      let t = e.currentTarget.contains(e.target),
                        n = eO[s.dir].includes(e.key);
                      if (t && n) {
                        var r;
                        (c.onOpenChange(!1),
                          null == (r = d.trigger) || r.focus(),
                          e.preventDefault());
                      }
                    }),
                  },
                ),
              ),
            ),
          ),
        );
      });
    function tv(e) {
      return e ? "open" : "closed";
    }
    function th(e) {
      return "indeterminate" === e;
    }
    function tE(e) {
      return th(e) ? "indeterminate" : e ? "checked" : "unchecked";
    }
    function tg(e) {
      return (t) => ("mouse" === t.pointerType ? e(t) : void 0);
    }
    let tw = (e) => {
        let {
            __scopeMenu: t,
            open: n = !1,
            children: r,
            dir: a,
            onOpenChange: l,
            modal: i = !0,
          } = e,
          u = eN(t),
          [s, d] = (0, o.useState)(null),
          p = (0, o.useRef)(!1),
          m = (0, f.useCallbackRef)(l),
          v = (0, c.useDirection)(a);
        return (
          (0, o.useEffect)(() => {
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
          (0, o.createElement)(
            q,
            u,
            (0, o.createElement)(
              eW,
              {
                scope: t,
                open: n,
                onOpenChange: m,
                content: s,
                onContentChange: d,
              },
              (0, o.createElement)(
                eU,
                {
                  scope: t,
                  onClose: (0, o.useCallback)(() => m(!1), [m]),
                  isUsingKeyboardRef: p,
                  dir: v,
                  modal: i,
                },
                r,
              ),
            ),
          )
        );
      },
      ty = (e) => {
        let { __scopeMenu: t, forceMount: n, children: r, container: a } = e,
          l = eX(ez, t);
        return (0, o.createElement)(
          e$,
          { scope: t, forceMount: n },
          (0, o.createElement)(
            ee.Presence,
            { present: n || l.open },
            (0, o.createElement)(Q, { asChild: !0, container: a }, r),
          ),
        );
      },
      tb = (e) => {
        let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: a } = e,
          l = eX(tc, t),
          i = eN(t),
          [u, c] = (0, o.useState)(null),
          [s, d] = (0, o.useState)(null),
          p = (0, f.useCallbackRef)(a);
        return (
          (0, o.useEffect)(
            () => (!1 === l.open && p(!1), () => p(!1)),
            [l.open, p],
          ),
          (0, o.createElement)(
            q,
            i,
            (0, o.createElement)(
              eW,
              {
                scope: t,
                open: r,
                onOpenChange: p,
                content: s,
                onContentChange: d,
              },
              (0, o.createElement)(
                ts,
                {
                  scope: t,
                  contentId: (0, T.useId)(),
                  triggerId: (0, T.useId)(),
                  trigger: u,
                  onTriggerChange: c,
                },
                n,
              ),
            ),
          )
        );
      };
    e.s(
      [
        "Anchor",
        () => eG,
        "Arrow",
        () => tu,
        "CheckboxItem",
        () => e9,
        "Content",
        () => eJ,
        "Group",
        () => e3,
        "Item",
        () => e4,
        "ItemIndicator",
        () => tl,
        "Label",
        () => e6,
        "Portal",
        () => ty,
        "RadioGroup",
        () => tt,
        "RadioItem",
        () => tn,
        "Root",
        () => tw,
        "Separator",
        () => ti,
        "Sub",
        () => tb,
        "SubContent",
        () => tm,
        "SubTrigger",
        () => tp,
        "createMenuScope",
        () => eK,
      ],
      728874,
    );
  },
]);
