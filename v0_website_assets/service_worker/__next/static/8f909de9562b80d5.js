(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  130107,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(45616),
      o = e.i(889655),
      a = e.i(551150),
      n = e.i(633439),
      l = e.i(968254),
      i = e.i(736891),
      s = e.i(373630),
      d = e.i(436836),
      c = e.i(301224),
      u = "Checkbox",
      [p, f] = (0, o.createContextScope)(u),
      [m, v] = p(u),
      g = r.forwardRef((e, o) => {
        let {
            __scopeCheckbox: l,
            name: i,
            checked: s,
            defaultChecked: u,
            required: p,
            disabled: f,
            value: v = "on",
            onCheckedChange: g,
            ...b
          } = e,
          [h, C] = r.useState(null),
          R = (0, t.useComposedRefs)(o, (e) => C(e)),
          j = r.useRef(!1),
          N = !h || !!h.closest("form"),
          [S = !1, E] = (0, n.useControllableState)({
            prop: s,
            defaultProp: u,
            onChange: g,
          }),
          A = r.useRef(S);
        return (
          r.useEffect(() => {
            let e = h?.form;
            if (e) {
              let r = () => E(A.current);
              return (
                e.addEventListener("reset", r),
                () => e.removeEventListener("reset", r)
              );
            }
          }, [h, E]),
          (0, c.jsxs)(m, {
            scope: l,
            state: S,
            disabled: f,
            children: [
              (0, c.jsx)(d.Primitive.button, {
                type: "button",
                role: "checkbox",
                "aria-checked": w(S) ? "mixed" : S,
                "aria-required": p,
                "data-state": y(S),
                "data-disabled": f ? "" : void 0,
                disabled: f,
                value: v,
                ...b,
                ref: R,
                onKeyDown: (0, a.composeEventHandlers)(e.onKeyDown, (e) => {
                  "Enter" === e.key && e.preventDefault();
                }),
                onClick: (0, a.composeEventHandlers)(e.onClick, (e) => {
                  (E((e) => !!w(e) || !e),
                    N &&
                      ((j.current = e.isPropagationStopped()),
                      j.current || e.stopPropagation()));
                }),
              }),
              N &&
                (0, c.jsx)(x, {
                  control: h,
                  bubbles: !j.current,
                  name: i,
                  value: v,
                  checked: S,
                  required: p,
                  disabled: f,
                  style: { transform: "translateX(-100%)" },
                }),
            ],
          })
        );
      });
    g.displayName = u;
    var b = "CheckboxIndicator",
      h = r.forwardRef((e, r) => {
        let { __scopeCheckbox: t, forceMount: o, ...a } = e,
          n = v(b, t);
        return (0, c.jsx)(s.Presence, {
          present: o || w(n.state) || !0 === n.state,
          children: (0, c.jsx)(d.Primitive.span, {
            "data-state": y(n.state),
            "data-disabled": n.disabled ? "" : void 0,
            ...a,
            ref: r,
            style: { pointerEvents: "none", ...e.style },
          }),
        });
      });
    h.displayName = b;
    var x = (e) => {
      let { control: t, checked: o, bubbles: a = !0, ...n } = e,
        s = r.useRef(null),
        d = (0, l.usePrevious)(o),
        u = (0, i.useSize)(t);
      return (
        r.useEffect(() => {
          let e = s.current,
            r = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "checked",
            ).set;
          if (d !== o && r) {
            let t = new Event("click", { bubbles: a });
            ((e.indeterminate = w(o)),
              r.call(e, !w(o) && o),
              e.dispatchEvent(t));
          }
        }, [d, o, a]),
        (0, c.jsx)("input", {
          type: "checkbox",
          "aria-hidden": !0,
          defaultChecked: !w(o) && o,
          ...n,
          tabIndex: -1,
          ref: s,
          style: {
            ...e.style,
            ...u,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
          },
        })
      );
    };
    function w(e) {
      return "indeterminate" === e;
    }
    function y(e) {
      return w(e) ? "indeterminate" : e ? "checked" : "unchecked";
    }
    e.s([
      "Checkbox",
      () => g,
      "CheckboxIndicator",
      () => h,
      "Indicator",
      () => h,
      "Root",
      () => g,
      "createCheckboxScope",
      () => f,
    ]);
  },
  302714,
  (e) => {
    "use strict";
    function r() {
      return (r = Object.assign.bind()).apply(null, arguments);
    }
    var t = e.i(789783),
      o = e.i(719271),
      a = e.i(633182),
      n = e.i(28924),
      l = e.i(729094),
      i = e.i(987176),
      s = e.i(504015),
      d = e.i(713416),
      c = e.i(266684);
    let u = "Collapsible",
      [p, f] = (0, a.createContextScope)(u),
      [m, v] = p(u),
      g = (0, t.forwardRef)((e, o) => {
        let {
            __scopeCollapsible: a,
            open: l,
            defaultOpen: i,
            disabled: d,
            onOpenChange: u,
            ...p
          } = e,
          [f = !1, v] = (0, n.useControllableState)({
            prop: l,
            defaultProp: i,
            onChange: u,
          });
        return (0, t.createElement)(
          m,
          {
            scope: a,
            disabled: d,
            contentId: (0, c.useId)(),
            open: f,
            onOpenToggle: (0, t.useCallback)(() => v((e) => !e), [v]),
          },
          (0, t.createElement)(
            s.Primitive.div,
            r({ "data-state": y(f), "data-disabled": d ? "" : void 0 }, p, {
              ref: o,
            }),
          ),
        );
      }),
      b = (0, t.forwardRef)((e, a) => {
        let { __scopeCollapsible: n, ...l } = e,
          i = v("CollapsibleTrigger", n);
        return (0, t.createElement)(
          s.Primitive.button,
          r(
            {
              type: "button",
              "aria-controls": i.contentId,
              "aria-expanded": i.open || !1,
              "data-state": y(i.open),
              "data-disabled": i.disabled ? "" : void 0,
              disabled: i.disabled,
            },
            l,
            {
              ref: a,
              onClick: (0, o.composeEventHandlers)(e.onClick, i.onOpenToggle),
            },
          ),
        );
      }),
      h = "CollapsibleContent",
      x = (0, t.forwardRef)((e, o) => {
        let { forceMount: a, ...n } = e,
          l = v(h, e.__scopeCollapsible);
        return (0, t.createElement)(
          d.Presence,
          { present: a || l.open },
          ({ present: e }) =>
            (0, t.createElement)(w, r({}, n, { ref: o, present: e })),
        );
      }),
      w = (0, t.forwardRef)((e, o) => {
        let { __scopeCollapsible: a, present: n, children: d, ...c } = e,
          u = v(h, a),
          [p, f] = (0, t.useState)(n),
          m = (0, t.useRef)(null),
          g = (0, i.useComposedRefs)(o, m),
          b = (0, t.useRef)(0),
          x = b.current,
          w = (0, t.useRef)(0),
          C = w.current,
          R = u.open || p,
          j = (0, t.useRef)(R),
          N = (0, t.useRef)();
        return (
          (0, t.useEffect)(() => {
            let e = requestAnimationFrame(() => (j.current = !1));
            return () => cancelAnimationFrame(e);
          }, []),
          (0, l.useLayoutEffect)(() => {
            let e = m.current;
            if (e) {
              ((N.current = N.current || {
                transitionDuration: e.style.transitionDuration,
                animationName: e.style.animationName,
              }),
                (e.style.transitionDuration = "0s"),
                (e.style.animationName = "none"));
              let r = e.getBoundingClientRect();
              ((b.current = r.height),
                (w.current = r.width),
                j.current ||
                  ((e.style.transitionDuration = N.current.transitionDuration),
                  (e.style.animationName = N.current.animationName)),
                f(n));
            }
          }, [u.open, n]),
          (0, t.createElement)(
            s.Primitive.div,
            r(
              {
                "data-state": y(u.open),
                "data-disabled": u.disabled ? "" : void 0,
                id: u.contentId,
                hidden: !R,
              },
              c,
              {
                ref: g,
                style: {
                  "--radix-collapsible-content-height": x ? `${x}px` : void 0,
                  "--radix-collapsible-content-width": C ? `${C}px` : void 0,
                  ...e.style,
                },
              },
            ),
            R && d,
          )
        );
      });
    function y(e) {
      return e ? "open" : "closed";
    }
    e.s(
      [
        "Collapsible",
        () => g,
        "CollapsibleContent",
        () => x,
        "CollapsibleTrigger",
        () => b,
        "Content",
        () => x,
        "Root",
        () => g,
        "Trigger",
        () => b,
        "createCollapsibleScope",
        () => f,
      ],
      302714,
    );
  },
  242512,
  (e) => {
    "use strict";
    var r = e.i(31217),
      t = e.i(789783),
      o = e.i(835098),
      a = e.i(981611),
      n = e.i(719271),
      l = e.i(987176),
      i = e.i(633182),
      s = e.i(266684),
      d = e.i(728874),
      c = e.i(951676),
      u = e.i(504015),
      p = e.i(28924);
    let f = "Menubar",
      [m, v, g] = (0, o.createCollection)(f),
      [b, h] = (0, i.createContextScope)(f, [g, c.createRovingFocusGroupScope]),
      x = (0, d.createMenuScope)(),
      w = (0, c.createRovingFocusGroupScope)(),
      [y, C] = b(f),
      R = (0, t.forwardRef)((e, o) => {
        let {
            __scopeMenubar: n,
            value: l,
            onValueChange: i,
            defaultValue: s,
            loop: d = !0,
            dir: f,
            ...v
          } = e,
          g = (0, a.useDirection)(f),
          b = w(n),
          [h = "", x] = (0, p.useControllableState)({
            prop: l,
            onChange: i,
            defaultProp: s,
          }),
          [C, R] = (0, t.useState)(null);
        return (0, t.createElement)(
          y,
          {
            scope: n,
            value: h,
            onMenuOpen: (0, t.useCallback)(
              (e) => {
                (x(e), R(e));
              },
              [x],
            ),
            onMenuClose: (0, t.useCallback)(() => x(""), [x]),
            onMenuToggle: (0, t.useCallback)(
              (e) => {
                (x((r) => (r ? "" : e)), R(e));
              },
              [x],
            ),
            dir: g,
            loop: d,
          },
          (0, t.createElement)(
            m.Provider,
            { scope: n },
            (0, t.createElement)(
              m.Slot,
              { scope: n },
              (0, t.createElement)(
                c.Root,
                (0, r.default)({ asChild: !0 }, b, {
                  orientation: "horizontal",
                  loop: d,
                  dir: g,
                  currentTabStopId: C,
                  onCurrentTabStopIdChange: R,
                }),
                (0, t.createElement)(
                  u.Primitive.div,
                  (0, r.default)({ role: "menubar" }, v, { ref: o }),
                ),
              ),
            ),
          ),
        );
      }),
      j = "MenubarMenu",
      [N, S] = b(j),
      E = "MenubarTrigger",
      A = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, disabled: i = !1, ...s } = e,
          p = w(a),
          f = x(a),
          v = C(E, a),
          g = S(E, a),
          b = (0, t.useRef)(null),
          h = (0, l.useComposedRefs)(o, b, g.triggerRef),
          [y, R] = (0, t.useState)(!1),
          j = v.value === g.value;
        return (0, t.createElement)(
          m.ItemSlot,
          { scope: a, value: g.value, disabled: i },
          (0, t.createElement)(
            c.Item,
            (0, r.default)({ asChild: !0 }, p, {
              focusable: !i,
              tabStopId: g.value,
            }),
            (0, t.createElement)(
              d.Anchor,
              (0, r.default)({ asChild: !0 }, f),
              (0, t.createElement)(
                u.Primitive.button,
                (0, r.default)(
                  {
                    type: "button",
                    role: "menuitem",
                    id: g.triggerId,
                    "aria-haspopup": "menu",
                    "aria-expanded": j,
                    "aria-controls": j ? g.contentId : void 0,
                    "data-highlighted": y ? "" : void 0,
                    "data-state": j ? "open" : "closed",
                    "data-disabled": i ? "" : void 0,
                    disabled: i,
                  },
                  s,
                  {
                    ref: h,
                    onPointerDown: (0, n.composeEventHandlers)(
                      e.onPointerDown,
                      (e) => {
                        !i &&
                          0 === e.button &&
                          !1 === e.ctrlKey &&
                          (v.onMenuOpen(g.value), j || e.preventDefault());
                      },
                    ),
                    onPointerEnter: (0, n.composeEventHandlers)(
                      e.onPointerEnter,
                      () => {
                        if (v.value && !j) {
                          var e;
                          (v.onMenuOpen(g.value),
                            null == (e = b.current) || e.focus());
                        }
                      },
                    ),
                    onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
                      !i &&
                        (["Enter", " "].includes(e.key) &&
                          v.onMenuToggle(g.value),
                        "ArrowDown" === e.key && v.onMenuOpen(g.value),
                        ["Enter", " ", "ArrowDown"].includes(e.key) &&
                          ((g.wasKeyboardTriggerOpenRef.current = !0),
                          e.preventDefault()));
                    }),
                    onFocus: (0, n.composeEventHandlers)(e.onFocus, () =>
                      R(!0),
                    ),
                    onBlur: (0, n.composeEventHandlers)(e.onBlur, () => R(!1)),
                  },
                ),
              ),
            ),
          ),
        );
      }),
      T = "MenubarContent",
      P = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, align: l = "start", ...i } = e,
          s = x(a),
          c = C(T, a),
          u = S(T, a),
          p = v(a),
          f = (0, t.useRef)(!1);
        return (0, t.createElement)(
          d.Content,
          (0, r.default)(
            {
              id: u.contentId,
              "aria-labelledby": u.triggerId,
              "data-radix-menubar-content": "",
            },
            s,
            i,
            {
              ref: o,
              align: l,
              onCloseAutoFocus: (0, n.composeEventHandlers)(
                e.onCloseAutoFocus,
                (e) => {
                  if (!c.value && !f.current) {
                    var r;
                    null == (r = u.triggerRef.current) || r.focus();
                  }
                  ((f.current = !1), e.preventDefault());
                },
              ),
              onFocusOutside: (0, n.composeEventHandlers)(
                e.onFocusOutside,
                (e) => {
                  let r = e.target;
                  p().some((e) => {
                    var t;
                    return null == (t = e.ref.current) ? void 0 : t.contains(r);
                  }) && e.preventDefault();
                },
              ),
              onInteractOutside: (0, n.composeEventHandlers)(
                e.onInteractOutside,
                () => {
                  f.current = !0;
                },
              ),
              onEntryFocus: (e) => {
                u.wasKeyboardTriggerOpenRef.current || e.preventDefault();
              },
              onKeyDown: (0, n.composeEventHandlers)(
                e.onKeyDown,
                (e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    var r, t;
                    let o = e.target,
                      a = o.hasAttribute("data-radix-menubar-subtrigger"),
                      n =
                        o.closest("[data-radix-menubar-content]") !==
                        e.currentTarget,
                      l =
                        ("rtl" === c.dir ? "ArrowRight" : "ArrowLeft") ===
                        e.key;
                    if ((!l && a) || (n && l)) return;
                    let i = p()
                      .filter((e) => !e.disabled)
                      .map((e) => e.value);
                    l && i.reverse();
                    let s = i.indexOf(u.value),
                      [d] = (i = c.loop
                        ? ((r = i),
                          (t = s + 1),
                          r.map((e, o) => r[(t + o) % r.length]))
                        : i.slice(s + 1));
                    d && c.onMenuOpen(d);
                  }
                },
                { checkForDefaultPrevented: !1 },
              ),
              style: {
                ...e.style,
                "--radix-menubar-content-transform-origin":
                  "var(--radix-popper-transform-origin)",
                "--radix-menubar-content-available-width":
                  "var(--radix-popper-available-width)",
                "--radix-menubar-content-available-height":
                  "var(--radix-popper-available-height)",
                "--radix-menubar-trigger-width":
                  "var(--radix-popper-anchor-width)",
                "--radix-menubar-trigger-height":
                  "var(--radix-popper-anchor-height)",
              },
            },
          ),
        );
      }),
      D = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.Group,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      I = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.Label,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      _ = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.Item,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      k = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.CheckboxItem,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      F = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.RadioGroup,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      O = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.RadioItem,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      M = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.ItemIndicator,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      L = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.Separator,
          (0, r.default)({}, l, n, { ref: o }),
        );
      }),
      H = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.SubTrigger,
          (0, r.default)({ "data-radix-menubar-subtrigger": "" }, l, n, {
            ref: o,
          }),
        );
      }),
      z = (0, t.forwardRef)((e, o) => {
        let { __scopeMenubar: a, ...n } = e,
          l = x(a);
        return (0, t.createElement)(
          d.SubContent,
          (0, r.default)({}, l, { "data-radix-menubar-content": "" }, n, {
            ref: o,
            style: {
              ...e.style,
              "--radix-menubar-content-transform-origin":
                "var(--radix-popper-transform-origin)",
              "--radix-menubar-content-available-width":
                "var(--radix-popper-available-width)",
              "--radix-menubar-content-available-height":
                "var(--radix-popper-available-height)",
              "--radix-menubar-trigger-width":
                "var(--radix-popper-anchor-width)",
              "--radix-menubar-trigger-height":
                "var(--radix-popper-anchor-height)",
            },
          }),
        );
      }),
      B = (e) => {
        let { __scopeMenubar: o, value: a, ...n } = e,
          l = (0, s.useId)(),
          i = a || l || "LEGACY_REACT_AUTO_VALUE",
          c = C(j, o),
          u = x(o),
          p = (0, t.useRef)(null),
          f = (0, t.useRef)(!1),
          m = c.value === i;
        return (
          (0, t.useEffect)(() => {
            m || (f.current = !1);
          }, [m]),
          (0, t.createElement)(
            N,
            {
              scope: o,
              value: i,
              triggerId: (0, s.useId)(),
              triggerRef: p,
              contentId: (0, s.useId)(),
              wasKeyboardTriggerOpenRef: f,
            },
            (0, t.createElement)(
              d.Root,
              (0, r.default)(
                {},
                u,
                {
                  open: m,
                  onOpenChange: (e) => {
                    e || c.onMenuClose();
                  },
                  modal: !1,
                  dir: c.dir,
                },
                n,
              ),
            ),
          )
        );
      },
      G = (e) => {
        let { __scopeMenubar: o, ...a } = e,
          n = x(o);
        return (0, t.createElement)(d.Portal, (0, r.default)({}, n, a));
      },
      K = (e) => {
        let {
            __scopeMenubar: o,
            children: a,
            open: n,
            onOpenChange: l,
            defaultOpen: i,
          } = e,
          s = x(o),
          [c = !1, u] = (0, p.useControllableState)({
            prop: n,
            defaultProp: i,
            onChange: l,
          });
        return (0, t.createElement)(
          d.Sub,
          (0, r.default)({}, s, { open: c, onOpenChange: u }),
          a,
        );
      };
    e.s([
      "CheckboxItem",
      () => k,
      "Content",
      () => P,
      "Group",
      () => D,
      "Item",
      () => _,
      "ItemIndicator",
      () => M,
      "Label",
      () => I,
      "Menu",
      () => B,
      "Portal",
      () => G,
      "RadioGroup",
      () => F,
      "RadioItem",
      () => O,
      "Root",
      () => R,
      "Separator",
      () => L,
      "Sub",
      () => K,
      "SubContent",
      () => z,
      "SubTrigger",
      () => H,
      "Trigger",
      () => A,
    ]);
  },
  671831,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(436836),
      o = e.i(373630),
      a = e.i(889655),
      n = e.i(45616),
      l = e.i(867645),
      i = e.i(282270),
      s = e.i(674180),
      d = e.i(36102),
      c = e.i(551150),
      u = e.i(301224),
      p = "ScrollArea",
      [f, m] = (0, a.createContextScope)(p),
      [v, g] = f(p),
      b = r.forwardRef((e, o) => {
        let {
            __scopeScrollArea: a,
            type: l = "hover",
            dir: s,
            scrollHideDelay: d = 600,
            ...c
          } = e,
          [p, f] = r.useState(null),
          [m, g] = r.useState(null),
          [b, h] = r.useState(null),
          [x, w] = r.useState(null),
          [y, C] = r.useState(null),
          [R, j] = r.useState(0),
          [N, S] = r.useState(0),
          [E, A] = r.useState(!1),
          [T, P] = r.useState(!1),
          D = (0, n.useComposedRefs)(o, (e) => f(e)),
          I = (0, i.useDirection)(s);
        return (0, u.jsx)(v, {
          scope: a,
          type: l,
          dir: I,
          scrollHideDelay: d,
          scrollArea: p,
          viewport: m,
          onViewportChange: g,
          content: b,
          onContentChange: h,
          scrollbarX: x,
          onScrollbarXChange: w,
          scrollbarXEnabled: E,
          onScrollbarXEnabledChange: A,
          scrollbarY: y,
          onScrollbarYChange: C,
          scrollbarYEnabled: T,
          onScrollbarYEnabledChange: P,
          onCornerWidthChange: j,
          onCornerHeightChange: S,
          children: (0, u.jsx)(t.Primitive.div, {
            dir: I,
            ...c,
            ref: D,
            style: {
              position: "relative",
              "--radix-scroll-area-corner-width": R + "px",
              "--radix-scroll-area-corner-height": N + "px",
              ...e.style,
            },
          }),
        });
      });
    b.displayName = p;
    var h = "ScrollAreaViewport",
      x = r.forwardRef((e, o) => {
        let { __scopeScrollArea: a, children: l, nonce: i, ...s } = e,
          d = g(h, a),
          c = r.useRef(null),
          p = (0, n.useComposedRefs)(o, c, d.onViewportChange);
        return (0, u.jsxs)(u.Fragment, {
          children: [
            (0, u.jsx)("style", {
              dangerouslySetInnerHTML: {
                __html:
                  "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
              },
              nonce: i,
            }),
            (0, u.jsx)(t.Primitive.div, {
              "data-radix-scroll-area-viewport": "",
              ...s,
              ref: p,
              style: {
                overflowX: d.scrollbarXEnabled ? "scroll" : "hidden",
                overflowY: d.scrollbarYEnabled ? "scroll" : "hidden",
                ...e.style,
              },
              children: (0, u.jsx)("div", {
                ref: d.onContentChange,
                style: { minWidth: "100%", display: "table" },
                children: l,
              }),
            }),
          ],
        });
      });
    x.displayName = h;
    var w = "ScrollAreaScrollbar",
      y = r.forwardRef((e, t) => {
        let { forceMount: o, ...a } = e,
          n = g(w, e.__scopeScrollArea),
          { onScrollbarXEnabledChange: l, onScrollbarYEnabledChange: i } = n,
          s = "horizontal" === e.orientation;
        return (
          r.useEffect(
            () => (
              s ? l(!0) : i(!0),
              () => {
                s ? l(!1) : i(!1);
              }
            ),
            [s, l, i],
          ),
          "hover" === n.type
            ? (0, u.jsx)(C, { ...a, ref: t, forceMount: o })
            : "scroll" === n.type
              ? (0, u.jsx)(R, { ...a, ref: t, forceMount: o })
              : "auto" === n.type
                ? (0, u.jsx)(j, { ...a, ref: t, forceMount: o })
                : "always" === n.type
                  ? (0, u.jsx)(N, { ...a, ref: t })
                  : null
        );
      });
    y.displayName = w;
    var C = r.forwardRef((e, t) => {
        let { forceMount: a, ...n } = e,
          l = g(w, e.__scopeScrollArea),
          [i, s] = r.useState(!1);
        return (
          r.useEffect(() => {
            let e = l.scrollArea,
              r = 0;
            if (e) {
              let t = () => {
                  (window.clearTimeout(r), s(!0));
                },
                o = () => {
                  r = window.setTimeout(() => s(!1), l.scrollHideDelay);
                };
              return (
                e.addEventListener("pointerenter", t),
                e.addEventListener("pointerleave", o),
                () => {
                  (window.clearTimeout(r),
                    e.removeEventListener("pointerenter", t),
                    e.removeEventListener("pointerleave", o));
                }
              );
            }
          }, [l.scrollArea, l.scrollHideDelay]),
          (0, u.jsx)(o.Presence, {
            present: a || i,
            children: (0, u.jsx)(j, {
              "data-state": i ? "visible" : "hidden",
              ...n,
              ref: t,
            }),
          })
        );
      }),
      R = r.forwardRef((e, t) => {
        var a;
        let { forceMount: n, ...l } = e,
          i = g(w, e.__scopeScrollArea),
          s = "horizontal" === e.orientation,
          d = K(() => f("SCROLL_END"), 100),
          [p, f] =
            ((a = {
              hidden: { SCROLL: "scrolling" },
              scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" },
              interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
              idle: {
                HIDE: "hidden",
                SCROLL: "scrolling",
                POINTER_ENTER: "interacting",
              },
            }),
            r.useReducer((e, r) => a[e][r] ?? e, "hidden"));
        return (
          r.useEffect(() => {
            if ("idle" === p) {
              let e = window.setTimeout(() => f("HIDE"), i.scrollHideDelay);
              return () => window.clearTimeout(e);
            }
          }, [p, i.scrollHideDelay, f]),
          r.useEffect(() => {
            let e = i.viewport,
              r = s ? "scrollLeft" : "scrollTop";
            if (e) {
              let t = e[r],
                o = () => {
                  let o = e[r];
                  (t !== o && (f("SCROLL"), d()), (t = o));
                };
              return (
                e.addEventListener("scroll", o),
                () => e.removeEventListener("scroll", o)
              );
            }
          }, [i.viewport, s, f, d]),
          (0, u.jsx)(o.Presence, {
            present: n || "hidden" !== p,
            children: (0, u.jsx)(N, {
              "data-state": "hidden" === p ? "hidden" : "visible",
              ...l,
              ref: t,
              onPointerEnter: (0, c.composeEventHandlers)(
                e.onPointerEnter,
                () => f("POINTER_ENTER"),
              ),
              onPointerLeave: (0, c.composeEventHandlers)(
                e.onPointerLeave,
                () => f("POINTER_LEAVE"),
              ),
            }),
          })
        );
      }),
      j = r.forwardRef((e, t) => {
        let a = g(w, e.__scopeScrollArea),
          { forceMount: n, ...l } = e,
          [i, s] = r.useState(!1),
          d = "horizontal" === e.orientation,
          c = K(() => {
            if (a.viewport) {
              let e = a.viewport.offsetWidth < a.viewport.scrollWidth,
                r = a.viewport.offsetHeight < a.viewport.scrollHeight;
              s(d ? e : r);
            }
          }, 10);
        return (
          $(a.viewport, c),
          $(a.content, c),
          (0, u.jsx)(o.Presence, {
            present: n || i,
            children: (0, u.jsx)(N, {
              "data-state": i ? "visible" : "hidden",
              ...l,
              ref: t,
            }),
          })
        );
      }),
      N = r.forwardRef((e, t) => {
        let { orientation: o = "vertical", ...a } = e,
          n = g(w, e.__scopeScrollArea),
          l = r.useRef(null),
          i = r.useRef(0),
          [s, d] = r.useState({
            content: 0,
            viewport: 0,
            scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
          }),
          c = L(s.viewport, s.content),
          p = {
            ...a,
            sizes: s,
            onSizesChange: d,
            hasThumb: !!(c > 0 && c < 1),
            onThumbChange: (e) => (l.current = e),
            onThumbPointerUp: () => (i.current = 0),
            onThumbPointerDown: (e) => (i.current = e),
          };
        function f(e, r) {
          return (function (e, r, t, o = "ltr") {
            let a = H(t),
              n = r || a / 2,
              l = t.scrollbar.paddingStart + n,
              i = t.scrollbar.size - t.scrollbar.paddingEnd - (a - n),
              s = t.content - t.viewport;
            return B([l, i], "ltr" === o ? [0, s] : [-1 * s, 0])(e);
          })(e, i.current, s, r);
        }
        return "horizontal" === o
          ? (0, u.jsx)(S, {
              ...p,
              ref: t,
              onThumbPositionChange: () => {
                if (n.viewport && l.current) {
                  let e = z(n.viewport.scrollLeft, s, n.dir);
                  l.current.style.transform = `translate3d(${e}px, 0, 0)`;
                }
              },
              onWheelScroll: (e) => {
                n.viewport && (n.viewport.scrollLeft = e);
              },
              onDragScroll: (e) => {
                n.viewport && (n.viewport.scrollLeft = f(e, n.dir));
              },
            })
          : "vertical" === o
            ? (0, u.jsx)(E, {
                ...p,
                ref: t,
                onThumbPositionChange: () => {
                  if (n.viewport && l.current) {
                    let e = z(n.viewport.scrollTop, s);
                    l.current.style.transform = `translate3d(0, ${e}px, 0)`;
                  }
                },
                onWheelScroll: (e) => {
                  n.viewport && (n.viewport.scrollTop = e);
                },
                onDragScroll: (e) => {
                  n.viewport && (n.viewport.scrollTop = f(e));
                },
              })
            : null;
      }),
      S = r.forwardRef((e, t) => {
        let { sizes: o, onSizesChange: a, ...l } = e,
          i = g(w, e.__scopeScrollArea),
          [s, d] = r.useState(),
          c = r.useRef(null),
          p = (0, n.useComposedRefs)(t, c, i.onScrollbarXChange);
        return (
          r.useEffect(() => {
            c.current && d(getComputedStyle(c.current));
          }, [c]),
          (0, u.jsx)(P, {
            "data-orientation": "horizontal",
            ...l,
            ref: p,
            sizes: o,
            style: {
              bottom: 0,
              left:
                "rtl" === i.dir ? "var(--radix-scroll-area-corner-width)" : 0,
              right:
                "ltr" === i.dir ? "var(--radix-scroll-area-corner-width)" : 0,
              "--radix-scroll-area-thumb-width": H(o) + "px",
              ...e.style,
            },
            onThumbPointerDown: (r) => e.onThumbPointerDown(r.x),
            onDragScroll: (r) => e.onDragScroll(r.x),
            onWheelScroll: (r, t) => {
              if (i.viewport) {
                var o, a;
                let n = i.viewport.scrollLeft + r.deltaX;
                (e.onWheelScroll(n),
                  (o = n),
                  (a = t),
                  o > 0 && o < a && r.preventDefault());
              }
            },
            onResize: () => {
              c.current &&
                i.viewport &&
                s &&
                a({
                  content: i.viewport.scrollWidth,
                  viewport: i.viewport.offsetWidth,
                  scrollbar: {
                    size: c.current.clientWidth,
                    paddingStart: M(s.paddingLeft),
                    paddingEnd: M(s.paddingRight),
                  },
                });
            },
          })
        );
      }),
      E = r.forwardRef((e, t) => {
        let { sizes: o, onSizesChange: a, ...l } = e,
          i = g(w, e.__scopeScrollArea),
          [s, d] = r.useState(),
          c = r.useRef(null),
          p = (0, n.useComposedRefs)(t, c, i.onScrollbarYChange);
        return (
          r.useEffect(() => {
            c.current && d(getComputedStyle(c.current));
          }, [c]),
          (0, u.jsx)(P, {
            "data-orientation": "vertical",
            ...l,
            ref: p,
            sizes: o,
            style: {
              top: 0,
              right: "ltr" === i.dir ? 0 : void 0,
              left: "rtl" === i.dir ? 0 : void 0,
              bottom: "var(--radix-scroll-area-corner-height)",
              "--radix-scroll-area-thumb-height": H(o) + "px",
              ...e.style,
            },
            onThumbPointerDown: (r) => e.onThumbPointerDown(r.y),
            onDragScroll: (r) => e.onDragScroll(r.y),
            onWheelScroll: (r, t) => {
              if (i.viewport) {
                var o, a;
                let n = i.viewport.scrollTop + r.deltaY;
                (e.onWheelScroll(n),
                  (o = n),
                  (a = t),
                  o > 0 && o < a && r.preventDefault());
              }
            },
            onResize: () => {
              c.current &&
                i.viewport &&
                s &&
                a({
                  content: i.viewport.scrollHeight,
                  viewport: i.viewport.offsetHeight,
                  scrollbar: {
                    size: c.current.clientHeight,
                    paddingStart: M(s.paddingTop),
                    paddingEnd: M(s.paddingBottom),
                  },
                });
            },
          })
        );
      }),
      [A, T] = f(w),
      P = r.forwardRef((e, o) => {
        let {
            __scopeScrollArea: a,
            sizes: i,
            hasThumb: s,
            onThumbChange: d,
            onThumbPointerUp: p,
            onThumbPointerDown: f,
            onThumbPositionChange: m,
            onDragScroll: v,
            onWheelScroll: b,
            onResize: h,
            ...x
          } = e,
          y = g(w, a),
          [C, R] = r.useState(null),
          j = (0, n.useComposedRefs)(o, (e) => R(e)),
          N = r.useRef(null),
          S = r.useRef(""),
          E = y.viewport,
          T = i.content - i.viewport,
          P = (0, l.useCallbackRef)(b),
          D = (0, l.useCallbackRef)(m),
          I = K(h, 10);
        function _(e) {
          N.current &&
            v({ x: e.clientX - N.current.left, y: e.clientY - N.current.top });
        }
        return (
          r.useEffect(() => {
            let e = (e) => {
              let r = e.target;
              C?.contains(r) && P(e, T);
            };
            return (
              document.addEventListener("wheel", e, { passive: !1 }),
              () => document.removeEventListener("wheel", e, { passive: !1 })
            );
          }, [E, C, T, P]),
          r.useEffect(D, [i, D]),
          $(C, I),
          $(y.content, I),
          (0, u.jsx)(A, {
            scope: a,
            scrollbar: C,
            hasThumb: s,
            onThumbChange: (0, l.useCallbackRef)(d),
            onThumbPointerUp: (0, l.useCallbackRef)(p),
            onThumbPositionChange: D,
            onThumbPointerDown: (0, l.useCallbackRef)(f),
            children: (0, u.jsx)(t.Primitive.div, {
              ...x,
              ref: j,
              style: { position: "absolute", ...x.style },
              onPointerDown: (0, c.composeEventHandlers)(
                e.onPointerDown,
                (e) => {
                  0 === e.button &&
                    (e.target.setPointerCapture(e.pointerId),
                    (N.current = C.getBoundingClientRect()),
                    (S.current = document.body.style.webkitUserSelect),
                    (document.body.style.webkitUserSelect = "none"),
                    y.viewport && (y.viewport.style.scrollBehavior = "auto"),
                    _(e));
                },
              ),
              onPointerMove: (0, c.composeEventHandlers)(e.onPointerMove, _),
              onPointerUp: (0, c.composeEventHandlers)(e.onPointerUp, (e) => {
                let r = e.target;
                (r.hasPointerCapture(e.pointerId) &&
                  r.releasePointerCapture(e.pointerId),
                  (document.body.style.webkitUserSelect = S.current),
                  y.viewport && (y.viewport.style.scrollBehavior = ""),
                  (N.current = null));
              }),
            }),
          })
        );
      }),
      D = "ScrollAreaThumb",
      I = r.forwardRef((e, r) => {
        let { forceMount: t, ...a } = e,
          n = T(D, e.__scopeScrollArea);
        return (0, u.jsx)(o.Presence, {
          present: t || n.hasThumb,
          children: (0, u.jsx)(_, { ref: r, ...a }),
        });
      }),
      _ = r.forwardRef((e, o) => {
        let { __scopeScrollArea: a, style: l, ...i } = e,
          s = g(D, a),
          d = T(D, a),
          { onThumbPositionChange: p } = d,
          f = (0, n.useComposedRefs)(o, (e) => d.onThumbChange(e)),
          m = r.useRef(),
          v = K(() => {
            m.current && (m.current(), (m.current = void 0));
          }, 100);
        return (
          r.useEffect(() => {
            let e = s.viewport;
            if (e) {
              let r = () => {
                (v(), m.current || ((m.current = G(e, p)), p()));
              };
              return (
                p(),
                e.addEventListener("scroll", r),
                () => e.removeEventListener("scroll", r)
              );
            }
          }, [s.viewport, v, p]),
          (0, u.jsx)(t.Primitive.div, {
            "data-state": d.hasThumb ? "visible" : "hidden",
            ...i,
            ref: f,
            style: {
              width: "var(--radix-scroll-area-thumb-width)",
              height: "var(--radix-scroll-area-thumb-height)",
              ...l,
            },
            onPointerDownCapture: (0, c.composeEventHandlers)(
              e.onPointerDownCapture,
              (e) => {
                let r = e.target.getBoundingClientRect(),
                  t = e.clientX - r.left,
                  o = e.clientY - r.top;
                d.onThumbPointerDown({ x: t, y: o });
              },
            ),
            onPointerUp: (0, c.composeEventHandlers)(
              e.onPointerUp,
              d.onThumbPointerUp,
            ),
          })
        );
      });
    I.displayName = D;
    var k = "ScrollAreaCorner",
      F = r.forwardRef((e, r) => {
        let t = g(k, e.__scopeScrollArea),
          o = !!(t.scrollbarX && t.scrollbarY);
        return "scroll" !== t.type && o
          ? (0, u.jsx)(O, { ...e, ref: r })
          : null;
      });
    F.displayName = k;
    var O = r.forwardRef((e, o) => {
      let { __scopeScrollArea: a, ...n } = e,
        l = g(k, a),
        [i, s] = r.useState(0),
        [d, c] = r.useState(0),
        p = !!(i && d);
      return (
        $(l.scrollbarX, () => {
          let e = l.scrollbarX?.offsetHeight || 0;
          (l.onCornerHeightChange(e), c(e));
        }),
        $(l.scrollbarY, () => {
          let e = l.scrollbarY?.offsetWidth || 0;
          (l.onCornerWidthChange(e), s(e));
        }),
        p
          ? (0, u.jsx)(t.Primitive.div, {
              ...n,
              ref: o,
              style: {
                width: i,
                height: d,
                position: "absolute",
                right: "ltr" === l.dir ? 0 : void 0,
                left: "rtl" === l.dir ? 0 : void 0,
                bottom: 0,
                ...e.style,
              },
            })
          : null
      );
    });
    function M(e) {
      return e ? parseInt(e, 10) : 0;
    }
    function L(e, r) {
      let t = e / r;
      return isNaN(t) ? 0 : t;
    }
    function H(e) {
      let r = L(e.viewport, e.content),
        t = e.scrollbar.paddingStart + e.scrollbar.paddingEnd;
      return Math.max((e.scrollbar.size - t) * r, 18);
    }
    function z(e, r, t = "ltr") {
      let o = H(r),
        a = r.scrollbar.paddingStart + r.scrollbar.paddingEnd,
        n = r.scrollbar.size - a,
        l = r.content - r.viewport,
        i = (0, d.clamp)(e, "ltr" === t ? [0, l] : [-1 * l, 0]);
      return B([0, l], [0, n - o])(i);
    }
    function B(e, r) {
      return (t) => {
        if (e[0] === e[1] || r[0] === r[1]) return r[0];
        let o = (r[1] - r[0]) / (e[1] - e[0]);
        return r[0] + o * (t - e[0]);
      };
    }
    var G = (e, r = () => {}) => {
      let t = { left: e.scrollLeft, top: e.scrollTop },
        o = 0;
      return (
        !(function a() {
          let n = { left: e.scrollLeft, top: e.scrollTop },
            l = t.left !== n.left,
            i = t.top !== n.top;
          ((l || i) && r(), (t = n), (o = window.requestAnimationFrame(a)));
        })(),
        () => window.cancelAnimationFrame(o)
      );
    };
    function K(e, t) {
      let o = (0, l.useCallbackRef)(e),
        a = r.useRef(0);
      return (
        r.useEffect(() => () => window.clearTimeout(a.current), []),
        r.useCallback(() => {
          (window.clearTimeout(a.current),
            (a.current = window.setTimeout(o, t)));
        }, [o, t])
      );
    }
    function $(e, r) {
      let t = (0, l.useCallbackRef)(r);
      (0, s.useLayoutEffect)(() => {
        let r = 0;
        if (e) {
          let o = new ResizeObserver(() => {
            (cancelAnimationFrame(r), (r = window.requestAnimationFrame(t)));
          });
          return (
            o.observe(e),
            () => {
              (window.cancelAnimationFrame(r), o.unobserve(e));
            }
          );
        }
      }, [e, t]);
    }
    e.s([
      "Corner",
      () => F,
      "Root",
      () => b,
      "ScrollArea",
      () => b,
      "ScrollAreaCorner",
      () => F,
      "ScrollAreaScrollbar",
      () => y,
      "ScrollAreaThumb",
      () => I,
      "ScrollAreaViewport",
      () => x,
      "Scrollbar",
      () => y,
      "Thumb",
      () => I,
      "Viewport",
      () => x,
      "createScrollAreaScope",
      () => m,
    ]);
  },
  27684,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(359687),
      o = e.i(610902),
      a = e.i(221977),
      n = e.i(291967),
      l = e.i(975946),
      i = e.i(590285),
      s = e.i(736542),
      d = e.i(891269),
      c = e.i(871598),
      u = e.i(301224),
      p = "Collapsible",
      [f, m] = (0, t.createContextScope)(p),
      [v, g] = f(p),
      b = r.forwardRef((e, t) => {
        let {
            __scopeCollapsible: o,
            open: a,
            defaultOpen: n,
            disabled: s,
            onOpenChange: d,
            ...f
          } = e,
          [m, g] = (0, l.useControllableState)({
            prop: a,
            defaultProp: n ?? !1,
            onChange: d,
            caller: p,
          });
        return (0, u.jsx)(v, {
          scope: o,
          disabled: s,
          contentId: (0, c.useId)(),
          open: m,
          onOpenToggle: r.useCallback(() => g((e) => !e), [g]),
          children: (0, u.jsx)(i.Primitive.div, {
            "data-state": R(m),
            "data-disabled": s ? "" : void 0,
            ...f,
            ref: t,
          }),
        });
      });
    b.displayName = p;
    var h = "CollapsibleTrigger",
      x = r.forwardRef((e, r) => {
        let { __scopeCollapsible: t, ...o } = e,
          a = g(h, t);
        return (0, u.jsx)(i.Primitive.button, {
          type: "button",
          "aria-controls": a.contentId,
          "aria-expanded": a.open || !1,
          "data-state": R(a.open),
          "data-disabled": a.disabled ? "" : void 0,
          disabled: a.disabled,
          ...o,
          ref: r,
          onClick: (0, n.composeEventHandlers)(e.onClick, a.onOpenToggle),
        });
      });
    x.displayName = h;
    var w = "CollapsibleContent",
      y = r.forwardRef((e, r) => {
        let { forceMount: t, ...o } = e,
          a = g(w, e.__scopeCollapsible);
        return (0, u.jsx)(d.Presence, {
          present: t || a.open,
          children: ({ present: e }) =>
            (0, u.jsx)(C, { ...o, ref: r, present: e }),
        });
      });
    y.displayName = w;
    var C = r.forwardRef((e, t) => {
      let { __scopeCollapsible: o, present: n, children: l, ...d } = e,
        c = g(w, o),
        [p, f] = r.useState(n),
        m = r.useRef(null),
        v = (0, a.useComposedRefs)(t, m),
        b = r.useRef(0),
        h = b.current,
        x = r.useRef(0),
        y = x.current,
        C = c.open || p,
        j = r.useRef(C),
        N = r.useRef(void 0);
      return (
        r.useEffect(() => {
          let e = requestAnimationFrame(() => (j.current = !1));
          return () => cancelAnimationFrame(e);
        }, []),
        (0, s.useLayoutEffect)(() => {
          let e = m.current;
          if (e) {
            ((N.current = N.current || {
              transitionDuration: e.style.transitionDuration,
              animationName: e.style.animationName,
            }),
              (e.style.transitionDuration = "0s"),
              (e.style.animationName = "none"));
            let r = e.getBoundingClientRect();
            ((b.current = r.height),
              (x.current = r.width),
              j.current ||
                ((e.style.transitionDuration = N.current.transitionDuration),
                (e.style.animationName = N.current.animationName)),
              f(n));
          }
        }, [c.open, n]),
        (0, u.jsx)(i.Primitive.div, {
          "data-state": R(c.open),
          "data-disabled": c.disabled ? "" : void 0,
          id: c.contentId,
          hidden: !C,
          ...d,
          ref: v,
          style: {
            "--radix-collapsible-content-height": h ? `${h}px` : void 0,
            "--radix-collapsible-content-width": y ? `${y}px` : void 0,
            ...e.style,
          },
          children: C && l,
        })
      );
    });
    function R(e) {
      return e ? "open" : "closed";
    }
    var j = e.i(273311),
      N = "Accordion",
      S = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
      [E, A, T] = (0, o.createCollection)(N),
      [P, D] = (0, t.createContextScope)(N, [T, m]),
      I = m(),
      _ = r.default.forwardRef((e, r) => {
        let { type: t, ...o } = e;
        return (0, u.jsx)(E.Provider, {
          scope: e.__scopeAccordion,
          children:
            "multiple" === t
              ? (0, u.jsx)(H, { ...o, ref: r })
              : (0, u.jsx)(L, { ...o, ref: r }),
        });
      });
    _.displayName = N;
    var [k, F] = P(N),
      [O, M] = P(N, { collapsible: !1 }),
      L = r.default.forwardRef((e, t) => {
        let {
            value: o,
            defaultValue: a,
            onValueChange: n = () => {},
            collapsible: i = !1,
            ...s
          } = e,
          [d, c] = (0, l.useControllableState)({
            prop: o,
            defaultProp: a ?? "",
            onChange: n,
            caller: N,
          });
        return (0, u.jsx)(k, {
          scope: e.__scopeAccordion,
          value: r.default.useMemo(() => (d ? [d] : []), [d]),
          onItemOpen: c,
          onItemClose: r.default.useCallback(() => i && c(""), [i, c]),
          children: (0, u.jsx)(O, {
            scope: e.__scopeAccordion,
            collapsible: i,
            children: (0, u.jsx)(G, { ...s, ref: t }),
          }),
        });
      }),
      H = r.default.forwardRef((e, t) => {
        let {
            value: o,
            defaultValue: a,
            onValueChange: n = () => {},
            ...i
          } = e,
          [s, d] = (0, l.useControllableState)({
            prop: o,
            defaultProp: a ?? [],
            onChange: n,
            caller: N,
          }),
          c = r.default.useCallback((e) => d((r = []) => [...r, e]), [d]),
          p = r.default.useCallback(
            (e) => d((r = []) => r.filter((r) => r !== e)),
            [d],
          );
        return (0, u.jsx)(k, {
          scope: e.__scopeAccordion,
          value: s,
          onItemOpen: c,
          onItemClose: p,
          children: (0, u.jsx)(O, {
            scope: e.__scopeAccordion,
            collapsible: !0,
            children: (0, u.jsx)(G, { ...i, ref: t }),
          }),
        });
      }),
      [z, B] = P(N),
      G = r.default.forwardRef((e, t) => {
        let {
            __scopeAccordion: o,
            disabled: l,
            dir: s,
            orientation: d = "vertical",
            ...c
          } = e,
          p = r.default.useRef(null),
          f = (0, a.useComposedRefs)(p, t),
          m = A(o),
          v = "ltr" === (0, j.useDirection)(s),
          g = (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
            if (!S.includes(e.key)) return;
            let r = e.target,
              t = m().filter((e) => !e.ref.current?.disabled),
              o = t.findIndex((e) => e.ref.current === r),
              a = t.length;
            if (-1 === o) return;
            e.preventDefault();
            let n = o,
              l = a - 1,
              i = () => {
                (n = o + 1) > l && (n = 0);
              },
              s = () => {
                (n = o - 1) < 0 && (n = l);
              };
            switch (e.key) {
              case "Home":
                n = 0;
                break;
              case "End":
                n = l;
                break;
              case "ArrowRight":
                "horizontal" === d && (v ? i() : s());
                break;
              case "ArrowDown":
                "vertical" === d && i();
                break;
              case "ArrowLeft":
                "horizontal" === d && (v ? s() : i());
                break;
              case "ArrowUp":
                "vertical" === d && s();
            }
            let c = n % a;
            t[c].ref.current?.focus();
          });
        return (0, u.jsx)(z, {
          scope: o,
          disabled: l,
          direction: s,
          orientation: d,
          children: (0, u.jsx)(E.Slot, {
            scope: o,
            children: (0, u.jsx)(i.Primitive.div, {
              ...c,
              "data-orientation": d,
              ref: f,
              onKeyDown: l ? void 0 : g,
            }),
          }),
        });
      }),
      K = "AccordionItem",
      [$, U] = P(K),
      W = r.default.forwardRef((e, r) => {
        let { __scopeAccordion: t, value: o, ...a } = e,
          n = B(K, t),
          l = F(K, t),
          i = I(t),
          s = (0, c.useId)(),
          d = (o && l.value.includes(o)) || !1,
          p = n.disabled || e.disabled;
        return (0, u.jsx)($, {
          scope: t,
          open: d,
          disabled: p,
          triggerId: s,
          children: (0, u.jsx)(b, {
            "data-orientation": n.orientation,
            "data-state": Q(d),
            ...i,
            ...a,
            ref: r,
            disabled: p,
            open: d,
            onOpenChange: (e) => {
              e ? l.onItemOpen(o) : l.onItemClose(o);
            },
          }),
        });
      });
    W.displayName = K;
    var V = "AccordionHeader",
      Y = r.default.forwardRef((e, r) => {
        let { __scopeAccordion: t, ...o } = e,
          a = B(N, t),
          n = U(V, t);
        return (0, u.jsx)(i.Primitive.h3, {
          "data-orientation": a.orientation,
          "data-state": Q(n.open),
          "data-disabled": n.disabled ? "" : void 0,
          ...o,
          ref: r,
        });
      });
    Y.displayName = V;
    var X = "AccordionTrigger",
      q = r.default.forwardRef((e, r) => {
        let { __scopeAccordion: t, ...o } = e,
          a = B(N, t),
          n = U(X, t),
          l = M(X, t),
          i = I(t);
        return (0, u.jsx)(E.ItemSlot, {
          scope: t,
          children: (0, u.jsx)(x, {
            "aria-disabled": (n.open && !l.collapsible) || void 0,
            "data-orientation": a.orientation,
            id: n.triggerId,
            ...i,
            ...o,
            ref: r,
          }),
        });
      });
    q.displayName = X;
    var Z = "AccordionContent",
      J = r.default.forwardRef((e, r) => {
        let { __scopeAccordion: t, ...o } = e,
          a = B(N, t),
          n = U(Z, t),
          l = I(t);
        return (0, u.jsx)(y, {
          role: "region",
          "aria-labelledby": n.triggerId,
          "data-orientation": a.orientation,
          ...l,
          ...o,
          ref: r,
          style: {
            "--radix-accordion-content-height":
              "var(--radix-collapsible-content-height)",
            "--radix-accordion-content-width":
              "var(--radix-collapsible-content-width)",
            ...e.style,
          },
        });
      });
    function Q(e) {
      return e ? "open" : "closed";
    }
    ((J.displayName = Z),
      e.s(
        [
          "Accordion",
          () => _,
          "AccordionContent",
          () => J,
          "AccordionHeader",
          () => Y,
          "AccordionItem",
          () => W,
          "AccordionTrigger",
          () => q,
          "Content",
          () => J,
          "Header",
          () => Y,
          "Item",
          () => W,
          "Root",
          () => _,
          "Trigger",
          () => q,
          "createAccordionScope",
          () => D,
        ],
        27684,
      ));
  },
  292029,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(551150),
      o = e.i(45616),
      a = e.i(889655),
      n = e.i(659671),
      l = e.i(973309),
      i = e.i(32885),
      s = e.i(803040),
      d = e.i(956349),
      c = e.i(391110),
      u = e.i(373630),
      p = e.i(436836),
      f = e.i(851279),
      m = e.i(633439),
      v = e.i(66561),
      g = e.i(115479),
      b = e.i(301224),
      h = "Popover",
      [x, w] = (0, a.createContextScope)(h, [d.createPopperScope]),
      y = (0, d.createPopperScope)(),
      [C, R] = x(h),
      j = (e) => {
        let {
            __scopePopover: t,
            children: o,
            open: a,
            defaultOpen: n,
            onOpenChange: l,
            modal: i = !1,
          } = e,
          c = y(t),
          u = r.useRef(null),
          [p, f] = r.useState(!1),
          [v = !1, g] = (0, m.useControllableState)({
            prop: a,
            defaultProp: n,
            onChange: l,
          });
        return (0, b.jsx)(d.Root, {
          ...c,
          children: (0, b.jsx)(C, {
            scope: t,
            contentId: (0, s.useId)(),
            triggerRef: u,
            open: v,
            onOpenChange: g,
            onOpenToggle: r.useCallback(() => g((e) => !e), [g]),
            hasCustomAnchor: p,
            onCustomAnchorAdd: r.useCallback(() => f(!0), []),
            onCustomAnchorRemove: r.useCallback(() => f(!1), []),
            modal: i,
            children: o,
          }),
        });
      };
    j.displayName = h;
    var N = "PopoverAnchor",
      S = r.forwardRef((e, t) => {
        let { __scopePopover: o, ...a } = e,
          n = R(N, o),
          l = y(o),
          { onCustomAnchorAdd: i, onCustomAnchorRemove: s } = n;
        return (
          r.useEffect(() => (i(), () => s()), [i, s]),
          (0, b.jsx)(d.Anchor, { ...l, ...a, ref: t })
        );
      });
    S.displayName = N;
    var E = "PopoverTrigger",
      A = r.forwardRef((e, r) => {
        let { __scopePopover: a, ...n } = e,
          l = R(E, a),
          i = y(a),
          s = (0, o.useComposedRefs)(r, l.triggerRef),
          c = (0, b.jsx)(p.Primitive.button, {
            type: "button",
            "aria-haspopup": "dialog",
            "aria-expanded": l.open,
            "aria-controls": l.contentId,
            "data-state": B(l.open),
            ...n,
            ref: s,
            onClick: (0, t.composeEventHandlers)(e.onClick, l.onOpenToggle),
          });
        return l.hasCustomAnchor
          ? c
          : (0, b.jsx)(d.Anchor, { asChild: !0, ...i, children: c });
      });
    A.displayName = E;
    var T = "PopoverPortal",
      [P, D] = x(T, { forceMount: void 0 }),
      I = (e) => {
        let { __scopePopover: r, forceMount: t, children: o, container: a } = e,
          n = R(T, r);
        return (0, b.jsx)(P, {
          scope: r,
          forceMount: t,
          children: (0, b.jsx)(u.Presence, {
            present: t || n.open,
            children: (0, b.jsx)(c.Portal, {
              asChild: !0,
              container: a,
              children: o,
            }),
          }),
        });
      };
    I.displayName = T;
    var _ = "PopoverContent",
      k = r.forwardRef((e, r) => {
        let t = D(_, e.__scopePopover),
          { forceMount: o = t.forceMount, ...a } = e,
          n = R(_, e.__scopePopover);
        return (0, b.jsx)(u.Presence, {
          present: o || n.open,
          children: n.modal
            ? (0, b.jsx)(F, { ...a, ref: r })
            : (0, b.jsx)(O, { ...a, ref: r }),
        });
      });
    k.displayName = _;
    var F = r.forwardRef((e, a) => {
        let n = R(_, e.__scopePopover),
          l = r.useRef(null),
          i = (0, o.useComposedRefs)(a, l),
          s = r.useRef(!1);
        return (
          r.useEffect(() => {
            let e = l.current;
            if (e) return (0, v.hideOthers)(e);
          }, []),
          (0, b.jsx)(g.RemoveScroll, {
            as: f.Slot,
            allowPinchZoom: !0,
            children: (0, b.jsx)(M, {
              ...e,
              ref: i,
              trapFocus: n.open,
              disableOutsidePointerEvents: !0,
              onCloseAutoFocus: (0, t.composeEventHandlers)(
                e.onCloseAutoFocus,
                (e) => {
                  (e.preventDefault(),
                    s.current || n.triggerRef.current?.focus());
                },
              ),
              onPointerDownOutside: (0, t.composeEventHandlers)(
                e.onPointerDownOutside,
                (e) => {
                  let r = e.detail.originalEvent,
                    t = 0 === r.button && !0 === r.ctrlKey;
                  s.current = 2 === r.button || t;
                },
                { checkForDefaultPrevented: !1 },
              ),
              onFocusOutside: (0, t.composeEventHandlers)(
                e.onFocusOutside,
                (e) => e.preventDefault(),
                { checkForDefaultPrevented: !1 },
              ),
            }),
          })
        );
      }),
      O = r.forwardRef((e, t) => {
        let o = R(_, e.__scopePopover),
          a = r.useRef(!1),
          n = r.useRef(!1);
        return (0, b.jsx)(M, {
          ...e,
          ref: t,
          trapFocus: !1,
          disableOutsidePointerEvents: !1,
          onCloseAutoFocus: (r) => {
            (e.onCloseAutoFocus?.(r),
              r.defaultPrevented ||
                (a.current || o.triggerRef.current?.focus(),
                r.preventDefault()),
              (a.current = !1),
              (n.current = !1));
          },
          onInteractOutside: (r) => {
            (e.onInteractOutside?.(r),
              r.defaultPrevented ||
                ((a.current = !0),
                "pointerdown" === r.detail.originalEvent.type &&
                  (n.current = !0)));
            let t = r.target;
            (o.triggerRef.current?.contains(t) && r.preventDefault(),
              "focusin" === r.detail.originalEvent.type &&
                n.current &&
                r.preventDefault());
          },
        });
      }),
      M = r.forwardRef((e, r) => {
        let {
            __scopePopover: t,
            trapFocus: o,
            onOpenAutoFocus: a,
            onCloseAutoFocus: s,
            disableOutsidePointerEvents: c,
            onEscapeKeyDown: u,
            onPointerDownOutside: p,
            onFocusOutside: f,
            onInteractOutside: m,
            ...v
          } = e,
          g = R(_, t),
          h = y(t);
        return (
          (0, l.useFocusGuards)(),
          (0, b.jsx)(i.FocusScope, {
            asChild: !0,
            loop: !0,
            trapped: o,
            onMountAutoFocus: a,
            onUnmountAutoFocus: s,
            children: (0, b.jsx)(n.DismissableLayer, {
              asChild: !0,
              disableOutsidePointerEvents: c,
              onInteractOutside: m,
              onEscapeKeyDown: u,
              onPointerDownOutside: p,
              onFocusOutside: f,
              onDismiss: () => g.onOpenChange(!1),
              children: (0, b.jsx)(d.Content, {
                "data-state": B(g.open),
                role: "dialog",
                id: g.contentId,
                ...h,
                ...v,
                ref: r,
                style: {
                  ...v.style,
                  "--radix-popover-content-transform-origin":
                    "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width":
                    "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height":
                    "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width":
                    "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height":
                    "var(--radix-popper-anchor-height)",
                },
              }),
            }),
          })
        );
      }),
      L = "PopoverClose",
      H = r.forwardRef((e, r) => {
        let { __scopePopover: o, ...a } = e,
          n = R(L, o);
        return (0, b.jsx)(p.Primitive.button, {
          type: "button",
          ...a,
          ref: r,
          onClick: (0, t.composeEventHandlers)(e.onClick, () =>
            n.onOpenChange(!1),
          ),
        });
      });
    H.displayName = L;
    var z = r.forwardRef((e, r) => {
      let { __scopePopover: t, ...o } = e,
        a = y(t);
      return (0, b.jsx)(d.Arrow, { ...a, ...o, ref: r });
    });
    function B(e) {
      return e ? "open" : "closed";
    }
    ((z.displayName = "PopoverArrow"),
      e.s([
        "Anchor",
        () => S,
        "Arrow",
        () => z,
        "Close",
        () => H,
        "Content",
        () => k,
        "Popover",
        () => j,
        "PopoverAnchor",
        () => S,
        "PopoverArrow",
        () => z,
        "PopoverClose",
        () => H,
        "PopoverContent",
        () => k,
        "PopoverPortal",
        () => I,
        "PopoverTrigger",
        () => A,
        "Portal",
        () => I,
        "Root",
        () => j,
        "Trigger",
        () => A,
        "createPopoverScope",
        () => w,
      ]));
  },
  307111,
  385553,
  (e) => {
    "use strict";
    var r = e.i(789783);
    e.i(546564);
    var t = e.i(244739),
      o = e.i(301224),
      a = r.forwardRef((e, t) => {
        let { children: a, ...l } = e,
          s = r.Children.toArray(a),
          d = s.find(i);
        if (d) {
          let e = d.props.children,
            a = s.map((t) =>
              t !== d
                ? t
                : r.Children.count(e) > 1
                  ? r.Children.only(null)
                  : r.isValidElement(e)
                    ? e.props.children
                    : null,
            );
          return (0, o.jsx)(n, {
            ...l,
            ref: t,
            children: r.isValidElement(e) ? r.cloneElement(e, void 0, a) : null,
          });
        }
        return (0, o.jsx)(n, { ...l, ref: t, children: a });
      });
    a.displayName = "Slot";
    var n = r.forwardRef((e, o) => {
      let { children: a, ...n } = e;
      if (r.isValidElement(a)) {
        var l;
        let e,
          i,
          s =
            ((l = a),
            (i =
              (e = Object.getOwnPropertyDescriptor(l.props, "ref")?.get) &&
              "isReactWarning" in e &&
              e.isReactWarning)
              ? l.ref
              : (i =
                    (e = Object.getOwnPropertyDescriptor(l, "ref")?.get) &&
                    "isReactWarning" in e &&
                    e.isReactWarning)
                ? l.props.ref
                : l.props.ref || l.ref);
        return r.cloneElement(a, {
          ...(function (e, r) {
            let t = { ...r };
            for (let o in r) {
              let a = e[o],
                n = r[o];
              /^on[A-Z]/.test(o)
                ? a && n
                  ? (t[o] = (...e) => {
                      (n(...e), a(...e));
                    })
                  : a && (t[o] = a)
                : "style" === o
                  ? (t[o] = { ...a, ...n })
                  : "className" === o &&
                    (t[o] = [a, n].filter(Boolean).join(" "));
            }
            return { ...e, ...t };
          })(n, a.props),
          ref: o ? (0, t.composeRefs)(o, s) : s,
        });
      }
      return r.Children.count(a) > 1 ? r.Children.only(null) : null;
    });
    n.displayName = "SlotClone";
    var l = ({ children: e }) => (0, o.jsx)(o.Fragment, { children: e });
    function i(e) {
      return r.isValidElement(e) && e.type === l;
    }
    e.s(["Slot", () => a, "Slottable", () => l], 385553);
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
      ].reduce((e, t) => {
        let n = r.forwardRef((e, r) => {
          let { asChild: n, ...l } = e,
            i = n ? a : t;
          return (
            "undefined" != typeof window &&
              (window[Symbol.for("radix-ui")] = !0),
            (0, o.jsx)(i, { ...l, ref: r })
          );
        });
        return ((n.displayName = `Primitive.${t}`), { ...e, [t]: n });
      }, {}),
      d = r.forwardRef((e, r) => {
        let { ratio: t = 1, style: a, ...n } = e;
        return (0, o.jsx)("div", {
          style: {
            position: "relative",
            width: "100%",
            paddingBottom: `${100 / t}%`,
          },
          "data-radix-aspect-ratio-wrapper": "",
          children: (0, o.jsx)(s.div, {
            ...n,
            ref: r,
            style: {
              ...a,
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }),
        });
      });
    ((d.displayName = "AspectRatio"), e.s(["Root", () => d], 307111));
  },
  979001,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(364363),
      o = e.i(244739),
      a = e.i(637118),
      n = e.i(178896),
      l = e.i(385553),
      i = e.i(301224),
      s = "AlertDialog",
      [d, c] = (0, t.createContextScope)(s, [a.createDialogScope]),
      u = (0, a.createDialogScope)(),
      p = (e) => {
        let { __scopeAlertDialog: r, ...t } = e,
          o = u(r);
        return (0, i.jsx)(a.Root, { ...o, ...t, modal: !0 });
      };
    p.displayName = s;
    var f = r.forwardRef((e, r) => {
      let { __scopeAlertDialog: t, ...o } = e,
        n = u(t);
      return (0, i.jsx)(a.Trigger, { ...n, ...o, ref: r });
    });
    f.displayName = "AlertDialogTrigger";
    var m = (e) => {
      let { __scopeAlertDialog: r, ...t } = e,
        o = u(r);
      return (0, i.jsx)(a.Portal, { ...o, ...t });
    };
    m.displayName = "AlertDialogPortal";
    var v = r.forwardRef((e, r) => {
      let { __scopeAlertDialog: t, ...o } = e,
        n = u(t);
      return (0, i.jsx)(a.Overlay, { ...n, ...o, ref: r });
    });
    v.displayName = "AlertDialogOverlay";
    var g = "AlertDialogContent",
      [b, h] = d(g),
      x = r.forwardRef((e, t) => {
        let { __scopeAlertDialog: s, children: d, ...c } = e,
          p = u(s),
          f = r.useRef(null),
          m = (0, o.useComposedRefs)(t, f),
          v = r.useRef(null);
        return (0, i.jsx)(a.WarningProvider, {
          contentName: g,
          titleName: w,
          docsSlug: "alert-dialog",
          children: (0, i.jsx)(b, {
            scope: s,
            cancelRef: v,
            children: (0, i.jsxs)(a.Content, {
              role: "alertdialog",
              ...p,
              ...c,
              ref: m,
              onOpenAutoFocus: (0, n.composeEventHandlers)(
                c.onOpenAutoFocus,
                (e) => {
                  (e.preventDefault(), v.current?.focus({ preventScroll: !0 }));
                },
              ),
              onPointerDownOutside: (e) => e.preventDefault(),
              onInteractOutside: (e) => e.preventDefault(),
              children: [
                (0, i.jsx)(l.Slottable, { children: d }),
                (0, i.jsx)(E, { contentRef: f }),
              ],
            }),
          }),
        });
      });
    x.displayName = g;
    var w = "AlertDialogTitle",
      y = r.forwardRef((e, r) => {
        let { __scopeAlertDialog: t, ...o } = e,
          n = u(t);
        return (0, i.jsx)(a.Title, { ...n, ...o, ref: r });
      });
    y.displayName = w;
    var C = "AlertDialogDescription",
      R = r.forwardRef((e, r) => {
        let { __scopeAlertDialog: t, ...o } = e,
          n = u(t);
        return (0, i.jsx)(a.Description, { ...n, ...o, ref: r });
      });
    R.displayName = C;
    var j = r.forwardRef((e, r) => {
      let { __scopeAlertDialog: t, ...o } = e,
        n = u(t);
      return (0, i.jsx)(a.Close, { ...n, ...o, ref: r });
    });
    j.displayName = "AlertDialogAction";
    var N = "AlertDialogCancel",
      S = r.forwardRef((e, r) => {
        let { __scopeAlertDialog: t, ...n } = e,
          { cancelRef: l } = h(N, t),
          s = u(t),
          d = (0, o.useComposedRefs)(r, l);
        return (0, i.jsx)(a.Close, { ...s, ...n, ref: d });
      });
    S.displayName = N;
    var E = ({ contentRef: e }) => {
      let t = `\`${g}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${g}\` by passing a \`${C}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${g}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
      return (
        r.useEffect(() => {
          document.getElementById(
            e.current?.getAttribute("aria-describedby"),
          ) || console.warn(t);
        }, [t, e]),
        null
      );
    };
    e.s([
      "Action",
      () => j,
      "AlertDialog",
      () => p,
      "AlertDialogAction",
      () => j,
      "AlertDialogCancel",
      () => S,
      "AlertDialogContent",
      () => x,
      "AlertDialogDescription",
      () => R,
      "AlertDialogOverlay",
      () => v,
      "AlertDialogPortal",
      () => m,
      "AlertDialogTitle",
      () => y,
      "AlertDialogTrigger",
      () => f,
      "Cancel",
      () => S,
      "Content",
      () => x,
      "Description",
      () => R,
      "Overlay",
      () => v,
      "Portal",
      () => m,
      "Root",
      () => p,
      "Title",
      () => y,
      "Trigger",
      () => f,
      "createAlertDialogScope",
      () => c,
    ]);
  },
  448155,
  (e) => {
    "use strict";
    var r = e.i(789783),
      t = e.i(359687),
      o = e.i(590285),
      a = e.i(291967),
      n = e.i(610902),
      l = e.i(221977),
      i = e.i(871598),
      s = e.i(733174),
      d = e.i(975946),
      c = e.i(273311),
      u = e.i(301224),
      p = "rovingFocusGroup.onEntryFocus",
      f = { bubbles: !1, cancelable: !0 },
      m = "RovingFocusGroup",
      [v, g, b] = (0, n.createCollection)(m),
      [h, x] = (0, t.createContextScope)(m, [b]),
      [w, y] = h(m),
      C = r.forwardRef((e, r) =>
        (0, u.jsx)(v.Provider, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, u.jsx)(v.Slot, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, u.jsx)(R, { ...e, ref: r }),
          }),
        }),
      );
    C.displayName = m;
    var R = r.forwardRef((e, t) => {
        let {
            __scopeRovingFocusGroup: n,
            orientation: i,
            loop: v = !1,
            dir: b,
            currentTabStopId: h,
            defaultCurrentTabStopId: x,
            onCurrentTabStopIdChange: y,
            onEntryFocus: C,
            preventScrollOnEntryFocus: R = !1,
            ...j
          } = e,
          N = r.useRef(null),
          S = (0, l.useComposedRefs)(t, N),
          A = (0, c.useDirection)(b),
          [T, P] = (0, d.useControllableState)({
            prop: h,
            defaultProp: x ?? null,
            onChange: y,
            caller: m,
          }),
          [D, I] = r.useState(!1),
          _ = (0, s.useCallbackRef)(C),
          k = g(n),
          F = r.useRef(!1),
          [O, M] = r.useState(0);
        return (
          r.useEffect(() => {
            let e = N.current;
            if (e)
              return (
                e.addEventListener(p, _),
                () => e.removeEventListener(p, _)
              );
          }, [_]),
          (0, u.jsx)(w, {
            scope: n,
            orientation: i,
            dir: A,
            loop: v,
            currentTabStopId: T,
            onItemFocus: r.useCallback((e) => P(e), [P]),
            onItemShiftTab: r.useCallback(() => I(!0), []),
            onFocusableItemAdd: r.useCallback(() => M((e) => e + 1), []),
            onFocusableItemRemove: r.useCallback(() => M((e) => e - 1), []),
            children: (0, u.jsx)(o.Primitive.div, {
              tabIndex: D || 0 === O ? -1 : 0,
              "data-orientation": i,
              ...j,
              ref: S,
              style: { outline: "none", ...e.style },
              onMouseDown: (0, a.composeEventHandlers)(e.onMouseDown, () => {
                F.current = !0;
              }),
              onFocus: (0, a.composeEventHandlers)(e.onFocus, (e) => {
                let r = !F.current;
                if (e.target === e.currentTarget && r && !D) {
                  let r = new CustomEvent(p, f);
                  if ((e.currentTarget.dispatchEvent(r), !r.defaultPrevented)) {
                    let e = k().filter((e) => e.focusable);
                    E(
                      [e.find((e) => e.active), e.find((e) => e.id === T), ...e]
                        .filter(Boolean)
                        .map((e) => e.ref.current),
                      R,
                    );
                  }
                }
                F.current = !1;
              }),
              onBlur: (0, a.composeEventHandlers)(e.onBlur, () => I(!1)),
            }),
          })
        );
      }),
      j = "RovingFocusGroupItem",
      N = r.forwardRef((e, t) => {
        let {
            __scopeRovingFocusGroup: n,
            focusable: l = !0,
            active: s = !1,
            tabStopId: d,
            children: c,
            ...p
          } = e,
          f = (0, i.useId)(),
          m = d || f,
          b = y(j, n),
          h = b.currentTabStopId === m,
          x = g(n),
          {
            onFocusableItemAdd: w,
            onFocusableItemRemove: C,
            currentTabStopId: R,
          } = b;
        return (
          r.useEffect(() => {
            if (l) return (w(), () => C());
          }, [l, w, C]),
          (0, u.jsx)(v.ItemSlot, {
            scope: n,
            id: m,
            focusable: l,
            active: s,
            children: (0, u.jsx)(o.Primitive.span, {
              tabIndex: h ? 0 : -1,
              "data-orientation": b.orientation,
              ...p,
              ref: t,
              onMouseDown: (0, a.composeEventHandlers)(e.onMouseDown, (e) => {
                l ? b.onItemFocus(m) : e.preventDefault();
              }),
              onFocus: (0, a.composeEventHandlers)(e.onFocus, () =>
                b.onItemFocus(m),
              ),
              onKeyDown: (0, a.composeEventHandlers)(e.onKeyDown, (e) => {
                if ("Tab" === e.key && e.shiftKey)
                  return void b.onItemShiftTab();
                if (e.target !== e.currentTarget) return;
                let r = (function (e, r, t) {
                  var o;
                  let a =
                    ((o = e.key),
                    "rtl" !== t
                      ? o
                      : "ArrowLeft" === o
                        ? "ArrowRight"
                        : "ArrowRight" === o
                          ? "ArrowLeft"
                          : o);
                  if (
                    !(
                      "vertical" === r &&
                      ["ArrowLeft", "ArrowRight"].includes(a)
                    ) &&
                    !(
                      "horizontal" === r && ["ArrowUp", "ArrowDown"].includes(a)
                    )
                  )
                    return S[a];
                })(e, b.orientation, b.dir);
                if (void 0 !== r) {
                  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                  e.preventDefault();
                  let a = x()
                    .filter((e) => e.focusable)
                    .map((e) => e.ref.current);
                  if ("last" === r) a.reverse();
                  else if ("prev" === r || "next" === r) {
                    var t, o;
                    "prev" === r && a.reverse();
                    let n = a.indexOf(e.currentTarget);
                    a = b.loop
                      ? ((t = a),
                        (o = n + 1),
                        t.map((e, r) => t[(o + r) % t.length]))
                      : a.slice(n + 1);
                  }
                  setTimeout(() => E(a));
                }
              }),
              children:
                "function" == typeof c
                  ? c({ isCurrentTabStop: h, hasTabStop: null != R })
                  : c,
            }),
          })
        );
      });
    N.displayName = j;
    var S = {
      ArrowLeft: "prev",
      ArrowUp: "prev",
      ArrowRight: "next",
      ArrowDown: "next",
      PageUp: "first",
      Home: "first",
      PageDown: "last",
      End: "last",
    };
    function E(e, r = !1) {
      let t = document.activeElement;
      for (let o of e)
        if (
          o === t ||
          (o.focus({ preventScroll: r }), document.activeElement !== t)
        )
          return;
    }
    var A = e.i(35892),
      T = "ToggleGroup",
      [P, D] = (0, t.createContextScope)(T, [x]),
      I = x(),
      _ = r.default.forwardRef((e, r) => {
        let { type: t, ...o } = e;
        if ("single" === t) return (0, u.jsx)(O, { ...o, ref: r });
        if ("multiple" === t) return (0, u.jsx)(M, { ...o, ref: r });
        throw Error(`Missing prop \`type\` expected on \`${T}\``);
      });
    _.displayName = T;
    var [k, F] = P(T),
      O = r.default.forwardRef((e, t) => {
        let {
            value: o,
            defaultValue: a,
            onValueChange: n = () => {},
            ...l
          } = e,
          [i, s] = (0, d.useControllableState)({
            prop: o,
            defaultProp: a ?? "",
            onChange: n,
            caller: T,
          });
        return (0, u.jsx)(k, {
          scope: e.__scopeToggleGroup,
          type: "single",
          value: r.default.useMemo(() => (i ? [i] : []), [i]),
          onItemActivate: s,
          onItemDeactivate: r.default.useCallback(() => s(""), [s]),
          children: (0, u.jsx)(z, { ...l, ref: t }),
        });
      }),
      M = r.default.forwardRef((e, t) => {
        let {
            value: o,
            defaultValue: a,
            onValueChange: n = () => {},
            ...l
          } = e,
          [i, s] = (0, d.useControllableState)({
            prop: o,
            defaultProp: a ?? [],
            onChange: n,
            caller: T,
          }),
          c = r.default.useCallback((e) => s((r = []) => [...r, e]), [s]),
          p = r.default.useCallback(
            (e) => s((r = []) => r.filter((r) => r !== e)),
            [s],
          );
        return (0, u.jsx)(k, {
          scope: e.__scopeToggleGroup,
          type: "multiple",
          value: i,
          onItemActivate: c,
          onItemDeactivate: p,
          children: (0, u.jsx)(z, { ...l, ref: t }),
        });
      });
    _.displayName = T;
    var [L, H] = P(T),
      z = r.default.forwardRef((e, r) => {
        let {
            __scopeToggleGroup: t,
            disabled: a = !1,
            rovingFocus: n = !0,
            orientation: l,
            dir: i,
            loop: s = !0,
            ...d
          } = e,
          p = I(t),
          f = (0, c.useDirection)(i),
          m = { role: "group", dir: f, ...d };
        return (0, u.jsx)(L, {
          scope: t,
          rovingFocus: n,
          disabled: a,
          children: n
            ? (0, u.jsx)(C, {
                asChild: !0,
                ...p,
                orientation: l,
                dir: f,
                loop: s,
                children: (0, u.jsx)(o.Primitive.div, { ...m, ref: r }),
              })
            : (0, u.jsx)(o.Primitive.div, { ...m, ref: r }),
        });
      }),
      B = "ToggleGroupItem",
      G = r.default.forwardRef((e, t) => {
        let o = F(B, e.__scopeToggleGroup),
          a = H(B, e.__scopeToggleGroup),
          n = I(e.__scopeToggleGroup),
          l = o.value.includes(e.value),
          i = a.disabled || e.disabled,
          s = { ...e, pressed: l, disabled: i },
          d = r.default.useRef(null);
        return a.rovingFocus
          ? (0, u.jsx)(N, {
              asChild: !0,
              ...n,
              focusable: !i,
              active: l,
              ref: d,
              children: (0, u.jsx)(K, { ...s, ref: t }),
            })
          : (0, u.jsx)(K, { ...s, ref: t });
      });
    G.displayName = B;
    var K = r.default.forwardRef((e, r) => {
      let { __scopeToggleGroup: t, value: o, ...a } = e,
        n = F(B, t),
        l = {
          role: "radio",
          "aria-checked": e.pressed,
          "aria-pressed": void 0,
        },
        i = "single" === n.type ? l : void 0;
      return (0, u.jsx)(A.Toggle, {
        ...i,
        ...a,
        ref: r,
        onPressedChange: (e) => {
          e ? n.onItemActivate(o) : n.onItemDeactivate(o);
        },
      });
    });
    e.s(
      [
        "Item",
        () => G,
        "Root",
        () => _,
        "ToggleGroup",
        () => _,
        "ToggleGroupItem",
        () => G,
        "createToggleGroupScope",
        () => D,
      ],
      448155,
    );
  },
  577541,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(130107),
      a = e.i(621553),
      n = e.i(403055);
    let l = t.forwardRef(({ className: e, ...t }, l) =>
      (0, r.jsx)(o.Root, {
        ref: l,
        className: (0, n.cn)(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          e,
        ),
        ...t,
        children: (0, r.jsx)(o.Indicator, {
          className: (0, n.cn)("flex items-center justify-center text-current"),
          children: (0, r.jsx)(a.Check, { className: "h-4 w-4" }),
        }),
      }),
    );
    ((l.displayName = o.Root.displayName), e.s(["Checkbox", () => l]));
  },
  918044,
  (e) => {
    "use strict";
    var r = e.i(302714);
    let t = r.Root,
      o = r.CollapsibleTrigger,
      a = r.CollapsibleContent;
    e.s([
      "Collapsible",
      () => t,
      "CollapsibleContent",
      () => a,
      "CollapsibleTrigger",
      () => o,
    ]);
  },
  609766,
  872183,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(242512),
      a = e.i(621553),
      n = e.i(615793),
      l = e.i(731037),
      i = e.i(403055);
    let s = o.Menu,
      d = o.Group,
      c = o.Portal,
      u = o.Sub,
      p = o.RadioGroup,
      f = t.forwardRef(({ className: e, ...t }, a) =>
        (0, r.jsx)(o.Root, {
          className: (0, i.cn)(
            "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
            e,
          ),
          ref: a,
          ...t,
        }),
      );
    f.displayName = o.Root.displayName;
    let m = t.forwardRef(({ className: e, ...t }, a) =>
      (0, r.jsx)(o.Trigger, {
        className: (0, i.cn)(
          "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          e,
        ),
        ref: a,
        ...t,
      }),
    );
    m.displayName = o.Trigger.displayName;
    let v = t.forwardRef(({ className: e, inset: t, children: a, ...l }, s) =>
      (0, r.jsxs)(o.SubTrigger, {
        className: (0, i.cn)(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          t && "pl-8",
          e,
        ),
        ref: s,
        ...l,
        children: [
          a,
          (0, r.jsx)(n.ChevronRight, { className: "ml-auto h-4 w-4" }),
        ],
      }),
    );
    v.displayName = o.SubTrigger.displayName;
    let g = t.forwardRef(({ className: e, ...t }, a) =>
      (0, r.jsx)(o.SubContent, {
        className: (0, i.cn)(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          e,
        ),
        ref: a,
        ...t,
      }),
    );
    g.displayName = o.SubContent.displayName;
    let b = t.forwardRef(
      (
        {
          className: e,
          align: t = "start",
          alignOffset: a = -4,
          sideOffset: n = 8,
          ...l
        },
        s,
      ) =>
        (0, r.jsx)(o.Portal, {
          children: (0, r.jsx)(o.Content, {
            align: t,
            alignOffset: a,
            className: (0, i.cn)(
              "z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              e,
            ),
            ref: s,
            sideOffset: n,
            ...l,
          }),
        }),
    );
    b.displayName = o.Content.displayName;
    let h = t.forwardRef(({ className: e, inset: t, ...a }, n) =>
      (0, r.jsx)(o.Item, {
        className: (0, i.cn)(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          t && "pl-8",
          e,
        ),
        ref: n,
        ...a,
      }),
    );
    h.displayName = o.Item.displayName;
    let x = t.forwardRef(({ className: e, children: t, checked: n, ...l }, s) =>
      (0, r.jsxs)(o.CheckboxItem, {
        checked: n,
        className: (0, i.cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          e,
        ),
        ref: s,
        ...l,
        children: [
          (0, r.jsx)("span", {
            className:
              "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
            children: (0, r.jsx)(o.ItemIndicator, {
              children: (0, r.jsx)(a.Check, { className: "h-4 w-4" }),
            }),
          }),
          t,
        ],
      }),
    );
    x.displayName = o.CheckboxItem.displayName;
    let w = t.forwardRef(({ className: e, children: t, ...a }, n) =>
      (0, r.jsxs)(o.RadioItem, {
        className: (0, i.cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          e,
        ),
        ref: n,
        ...a,
        children: [
          (0, r.jsx)("span", {
            className:
              "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
            children: (0, r.jsx)(o.ItemIndicator, {
              children: (0, r.jsx)(l.Circle, {
                className: "h-2 w-2 fill-current",
              }),
            }),
          }),
          t,
        ],
      }),
    );
    w.displayName = o.RadioItem.displayName;
    let y = t.forwardRef(({ className: e, inset: t, ...a }, n) =>
      (0, r.jsx)(o.Label, {
        className: (0, i.cn)(
          "px-2 py-1.5 text-sm font-semibold",
          t && "pl-8",
          e,
        ),
        ref: n,
        ...a,
      }),
    );
    y.displayName = o.Label.displayName;
    let C = t.forwardRef(({ className: e, ...t }, a) =>
      (0, r.jsx)(o.Separator, {
        className: (0, i.cn)("-mx-1 my-1 h-px bg-muted", e),
        ref: a,
        ...t,
      }),
    );
    C.displayName = o.Separator.displayName;
    let R = ({ className: e, ...t }) =>
      (0, r.jsx)("span", {
        className: (0, i.cn)(
          "ml-auto text-xs tracking-widest text-muted-foreground",
          e,
        ),
        ...t,
      });
    ((R.displayname = "MenubarShortcut"),
      e.s(
        [
          "Menubar",
          () => f,
          "MenubarCheckboxItem",
          () => x,
          "MenubarContent",
          () => b,
          "MenubarGroup",
          () => d,
          "MenubarItem",
          () => h,
          "MenubarLabel",
          () => y,
          "MenubarMenu",
          () => s,
          "MenubarPortal",
          () => c,
          "MenubarRadioGroup",
          () => p,
          "MenubarRadioItem",
          () => w,
          "MenubarSeparator",
          () => C,
          "MenubarShortcut",
          () => R,
          "MenubarSub",
          () => u,
          "MenubarSubContent",
          () => g,
          "MenubarSubTrigger",
          () => v,
          "MenubarTrigger",
          () => m,
        ],
        609766,
      ));
    let j = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("textarea", {
        className: (0, i.cn)(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    ((j.displayName = "Textarea"), e.s(["Textarea", () => j], 872183));
  },
  333746,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(671831),
      a = e.i(403055);
    let n = t.forwardRef(({ className: e, children: t, ...n }, i) =>
      (0, r.jsxs)(o.Root, {
        className: (0, a.cn)("relative overflow-hidden", e),
        ref: i,
        ...n,
        children: [
          (0, r.jsx)(o.Viewport, {
            className: "h-full w-full rounded-[inherit]",
            children: t,
          }),
          (0, r.jsx)(l, {}),
          (0, r.jsx)(o.Corner, {}),
        ],
      }),
    );
    n.displayName = o.Root.displayName;
    let l = t.forwardRef(
      ({ className: e, orientation: t = "vertical", ...n }, l) =>
        (0, r.jsx)(o.ScrollAreaScrollbar, {
          className: (0, a.cn)(
            "flex touch-none select-none transition-colors",
            "vertical" === t &&
              "h-full w-2.5 border-l border-l-transparent p-px",
            "horizontal" === t &&
              "h-2.5 flex-col border-t border-t-transparent p-px",
            e,
          ),
          orientation: t,
          ref: l,
          ...n,
          children: (0, r.jsx)(o.ScrollAreaThumb, {
            className: "relative flex-1 rounded-full bg-border",
          }),
        }),
    );
    ((l.displayName = o.ScrollAreaScrollbar.displayName),
      e.s(["ScrollArea", () => n, "ScrollBar", () => l]));
  },
  585626,
  302380,
  203181,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(27684),
      a = e.i(800443),
      n = e.i(403055);
    let l = o.Root,
      i = t.forwardRef(({ className: e, ...t }, a) =>
        (0, r.jsx)(o.Item, {
          className: (0, n.cn)("border-b", e),
          ref: a,
          ...t,
        }),
      );
    i.displayName = "AccordionItem";
    let s = t.forwardRef(({ className: e, children: t, ...l }, i) =>
      (0, r.jsx)(o.Header, {
        className: "flex",
        children: (0, r.jsxs)(o.Trigger, {
          className: (0, n.cn)(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            e,
          ),
          ref: i,
          ...l,
          children: [
            t,
            (0, r.jsx)(a.ChevronDown, {
              className: "h-4 w-4 shrink-0 transition-transform duration-200",
            }),
          ],
        }),
      }),
    );
    s.displayName = o.Trigger.displayName;
    let d = t.forwardRef(({ className: e, children: t, ...a }, l) =>
      (0, r.jsx)(o.Content, {
        className:
          "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        ref: l,
        ...a,
        children: (0, r.jsx)("div", {
          className: (0, n.cn)("pb-4 pt-0", e),
          children: t,
        }),
      }),
    );
    ((d.displayName = o.Content.displayName),
      e.s(
        [
          "Accordion",
          () => l,
          "AccordionContent",
          () => d,
          "AccordionItem",
          () => i,
          "AccordionTrigger",
          () => s,
        ],
        585626,
      ));
    let c = (0, e.i(89440).cva)(
        "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
        {
          variants: {
            variant: {
              default: "bg-background text-foreground",
              destructive:
                "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
          },
          defaultVariants: { variant: "default" },
        },
      ),
      u = t.forwardRef(({ className: e, variant: t, ...o }, a) =>
        (0, r.jsx)("div", {
          className: (0, n.cn)(c({ variant: t }), e),
          ref: a,
          role: "alert",
          ...o,
        }),
      );
    u.displayName = "Alert";
    let p = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("h5", {
        className: (0, n.cn)("mb-1 font-medium leading-none tracking-tight", e),
        ref: o,
        ...t,
      }),
    );
    p.displayName = "AlertTitle";
    let f = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("div", {
        className: (0, n.cn)("text-sm [&_p]:leading-relaxed", e),
        ref: o,
        ...t,
      }),
    );
    ((f.displayName = "AlertDescription"),
      e.s(
        ["Alert", () => u, "AlertDescription", () => f, "AlertTitle", () => p],
        302380,
      ));
    let m = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("div", {
        className: "relative w-full overflow-auto",
        children: (0, r.jsx)("table", {
          className: (0, n.cn)("w-full caption-bottom text-sm", e),
          ref: o,
          ...t,
        }),
      }),
    );
    m.displayName = "Table";
    let v = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("thead", {
        className: (0, n.cn)("[&_tr]:border-b", e),
        ref: o,
        ...t,
      }),
    );
    v.displayName = "TableHeader";
    let g = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("tbody", {
        className: (0, n.cn)("[&_tr:last-child]:border-0", e),
        ref: o,
        ...t,
      }),
    );
    g.displayName = "TableBody";
    let b = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("tfoot", {
        className: (0, n.cn)(
          "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    b.displayName = "TableFooter";
    let h = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("tr", {
        className: (0, n.cn)(
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    h.displayName = "TableRow";
    let x = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("th", {
        className: (0, n.cn)(
          "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    x.displayName = "TableHead";
    let w = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("td", {
        className: (0, n.cn)(
          "p-4 align-middle [&:has([role=checkbox])]:pr-0",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    w.displayName = "TableCell";
    let y = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("caption", {
        className: (0, n.cn)("mt-4 text-sm text-muted-foreground", e),
        ref: o,
        ...t,
      }),
    );
    ((y.displayName = "TableCaption"),
      e.s(
        [
          "Table",
          () => m,
          "TableBody",
          () => g,
          "TableCaption",
          () => y,
          "TableCell",
          () => w,
          "TableFooter",
          () => b,
          "TableHead",
          () => x,
          "TableHeader",
          () => v,
          "TableRow",
          () => h,
        ],
        203181,
      ));
  },
  518578,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(292029),
      a = e.i(403055);
    let n = o.Root,
      l = o.Trigger,
      i = t.forwardRef(
        ({ className: e, align: t = "center", sideOffset: n = 4, ...l }, i) =>
          (0, r.jsx)(o.Portal, {
            children: (0, r.jsx)(o.Content, {
              align: t,
              className: (0, a.cn)(
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                e,
              ),
              ref: i,
              sideOffset: n,
              ...l,
            }),
          }),
      );
    ((i.displayName = o.Content.displayName),
      e.s([
        "Popover",
        () => n,
        "PopoverContent",
        () => i,
        "PopoverTrigger",
        () => l,
      ]));
  },
  19326,
  765103,
  (e) => {
    "use strict";
    let r = e.i(307111).Root;
    e.s(["AspectRatio", () => r], 19326);
    var t = e.i(301224),
      o = e.i(789783),
      a = e.i(739453),
      n = e.i(358351),
      l = e.i(553083),
      i = e.i(403055);
    let s = { light: "", dark: ".dark" },
      d = o.createContext(null);
    function c() {
      let e = o.useContext(d);
      if (!e) throw Error("useChart must be used within a <ChartContainer />");
      return e;
    }
    let u = o.forwardRef(
      ({ id: e, className: r, children: n, config: l, ...s }, c) => {
        let u = o.useId(),
          f = `chart-${e || u.replace(/:/g, "")}`;
        return (0, t.jsx)(d.Provider, {
          value: { config: l },
          children: (0, t.jsxs)("div", {
            className: (0, i.cn)(
              "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
              r,
            ),
            "data-chart": f,
            ref: c,
            ...s,
            children: [
              (0, t.jsx)(p, { config: l, id: f }),
              (0, t.jsx)(a.ResponsiveContainer, { children: n }),
            ],
          }),
        });
      },
    );
    u.displayName = "Chart";
    let p = ({ id: e, config: r }) => {
        let o = Object.entries(r).filter(([e, r]) => r.theme || r.color);
        return o.length
          ? (0, t.jsx)("style", {
              dangerouslySetInnerHTML: {
                __html: Object.entries(s)
                  .map(
                    ([r, t]) => `
${t} [data-chart=${e}] {
${o
  .map(([e, t]) => {
    let o = t.theme?.[r] || t.color;
    return o ? `  --color-${e}: ${o};` : null;
  })
  .join("\n")}
}
`,
                  )
                  .join("\n"),
              },
            })
          : null;
      },
      f = n.Tooltip,
      m = o.forwardRef(
        (
          {
            active: e,
            payload: r,
            className: a,
            indicator: n = "dot",
            hideLabel: l = !1,
            hideIndicator: s = !1,
            label: d,
            labelFormatter: u,
            labelClassName: p,
            formatter: f,
            color: m,
            nameKey: v,
            labelKey: g,
          },
          h,
        ) => {
          let { config: x } = c(),
            w = o.useMemo(() => {
              if (l || !r?.length) return null;
              let [e] = r,
                o = `${g || e.dataKey || e.name || "value"}`,
                a = b(x, e, o),
                n = g || "string" != typeof d ? a?.label : x[d].label || d;
              return u
                ? (0, t.jsx)("div", {
                    className: (0, i.cn)("font-medium", p),
                    children: u(n, r),
                  })
                : n
                  ? (0, t.jsx)("div", {
                      className: (0, i.cn)("font-medium", p),
                      children: n,
                    })
                  : null;
            }, [d, u, r, l, p, x, g]);
          if (!e || !r?.length) return null;
          let y = 1 === r.length && "dot" !== n;
          return (0, t.jsxs)("div", {
            className: (0, i.cn)(
              "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
              a,
            ),
            ref: h,
            children: [
              y ? null : w,
              (0, t.jsx)("div", {
                className: "grid gap-1.5",
                children: r.map((e, r) => {
                  let o = `${v || e.name || e.dataKey || "value"}`,
                    a = b(x, e, o),
                    l = m || e.payload.fill || e.color;
                  return (0, t.jsx)(
                    "div",
                    {
                      className: (0, i.cn)(
                        "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                        "dot" === n && "items-center",
                      ),
                      children:
                        f && void 0 !== e.value && e.name
                          ? f(e.value, e.name, e, r, e.payload)
                          : (0, t.jsxs)(t.Fragment, {
                              children: [
                                a?.icon
                                  ? (0, t.jsx)(a.icon, {})
                                  : !s &&
                                    (0, t.jsx)("div", {
                                      className: (0, i.cn)(
                                        "shrink-0 rounded-[2px] border-border bg-[--color-bg]",
                                        {
                                          "h-2.5 w-2.5": "dot" === n,
                                          "w-1": "line" === n,
                                          "w-0 border-[1.5px] border-dashed bg-transparent":
                                            "dashed" === n,
                                          "my-0.5": y && "dashed" === n,
                                        },
                                      ),
                                      style: {
                                        "--color-bg": l,
                                        "--color-border": l,
                                      },
                                    }),
                                (0, t.jsxs)("div", {
                                  className: (0, i.cn)(
                                    "flex flex-1 justify-between leading-none",
                                    y ? "items-end" : "items-center",
                                  ),
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "grid gap-1.5",
                                      children: [
                                        y ? w : null,
                                        (0, t.jsx)("span", {
                                          className: "text-muted-foreground",
                                          children: a?.label || e.name,
                                        }),
                                      ],
                                    }),
                                    e.value &&
                                      (0, t.jsx)("span", {
                                        className:
                                          "font-mono font-medium tabular-nums text-foreground",
                                        children: e.value.toLocaleString(),
                                      }),
                                  ],
                                }),
                              ],
                            }),
                    },
                    e.dataKey,
                  );
                }),
              }),
            ],
          });
        },
      );
    m.displayName = "ChartTooltip";
    let v = l.Legend,
      g = o.forwardRef(
        (
          {
            className: e,
            hideIcon: r = !1,
            payload: o,
            verticalAlign: a = "bottom",
            nameKey: n,
          },
          l,
        ) => {
          let { config: s } = c();
          return o?.length
            ? (0, t.jsx)("div", {
                className: (0, i.cn)(
                  "flex items-center justify-center gap-4",
                  "top" === a ? "pb-3" : "pt-3",
                  e,
                ),
                ref: l,
                children: o.map((e) => {
                  let o = n || e.dataKey || "value",
                    a = b(s, e, o);
                  return (0, t.jsxs)(
                    "div",
                    {
                      className: (0, i.cn)(
                        "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
                      ),
                      children: [
                        a?.icon && !r
                          ? (0, t.jsx)(a.icon, {})
                          : (0, t.jsx)("div", {
                              className: "h-2 w-2 shrink-0 rounded-[2px]",
                              style: { backgroundColor: e.color },
                            }),
                        a?.label,
                      ],
                    },
                    e.value,
                  );
                }),
              })
            : null;
        },
      );
    function b(e, r, t) {
      if ("object" != typeof r || null === r) return;
      let o =
          "payload" in r && "object" == typeof r.payload && null !== r.payload
            ? r.payload
            : void 0,
        a = t;
      return (
        t in r && "string" == typeof r[t]
          ? (a = r[t])
          : o && t in o && "string" == typeof o[t] && (a = o[t]),
        a in e ? e[a] : e[t]
      );
    }
    ((g.displayName = "ChartLegend"),
      e.s(
        [
          "ChartContainer",
          () => u,
          "ChartLegend",
          () => v,
          "ChartLegendContent",
          () => g,
          "ChartStyle",
          () => p,
          "ChartTooltip",
          () => f,
          "ChartTooltipContent",
          () => m,
        ],
        765103,
      ));
  },
  292533,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(979001),
      a = e.i(403055),
      n = e.i(306261);
    let l = o.Root,
      i = o.Trigger,
      s = o.Portal,
      d = t.forwardRef(({ className: e, ...t }, n) =>
        (0, r.jsx)(o.Overlay, {
          className: (0, a.cn)(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",
            e,
          ),
          ...t,
          ref: n,
        }),
      );
    d.displayName = o.Overlay.displayName;
    let c = t.forwardRef(({ className: e, ...t }, n) =>
      (0, r.jsxs)(s, {
        children: [
          (0, r.jsx)(d, {}),
          (0, r.jsx)(o.Content, {
            className: (0, a.cn)(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
              e,
            ),
            ref: n,
            ...t,
          }),
        ],
      }),
    );
    c.displayName = o.Content.displayName;
    let u = ({ className: e, ...t }) =>
      (0, r.jsx)("div", {
        className: (0, a.cn)(
          "flex flex-col space-y-2 text-center sm:text-left",
          e,
        ),
        ...t,
      });
    u.displayName = "AlertDialogHeader";
    let p = ({ className: e, ...t }) =>
      (0, r.jsx)("div", {
        className: (0, a.cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          e,
        ),
        ...t,
      });
    p.displayName = "AlertDialogFooter";
    let f = t.forwardRef(({ className: e, ...t }, n) =>
      (0, r.jsx)(o.Title, {
        className: (0, a.cn)("text-lg font-semibold", e),
        ref: n,
        ...t,
      }),
    );
    f.displayName = o.Title.displayName;
    let m = t.forwardRef(({ className: e, ...t }, n) =>
      (0, r.jsx)(o.Description, {
        className: (0, a.cn)("text-muted-foreground text-sm", e),
        ref: n,
        ...t,
      }),
    );
    m.displayName = o.Description.displayName;
    let v = t.forwardRef(({ className: e, ...t }, l) =>
      (0, r.jsx)(o.Action, {
        className: (0, a.cn)((0, n.buttonVariants)(), e),
        ref: l,
        ...t,
      }),
    );
    v.displayName = o.Action.displayName;
    let g = t.forwardRef(({ className: e, ...t }, l) =>
      (0, r.jsx)(o.Cancel, {
        className: (0, a.cn)(
          (0, n.buttonVariants)({ variant: "outline" }),
          "mt-2 sm:mt-0",
          e,
        ),
        ref: l,
        ...t,
      }),
    );
    ((g.displayName = o.Cancel.displayName),
      e.s([
        "AlertDialog",
        () => l,
        "AlertDialogAction",
        () => v,
        "AlertDialogCancel",
        () => g,
        "AlertDialogContent",
        () => c,
        "AlertDialogDescription",
        () => m,
        "AlertDialogFooter",
        () => p,
        "AlertDialogHeader",
        () => u,
        "AlertDialogOverlay",
        () => d,
        "AlertDialogPortal",
        () => s,
        "AlertDialogTitle",
        () => f,
        "AlertDialogTrigger",
        () => i,
      ]));
  },
  517394,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(448155),
      a = e.i(403055),
      n = e.i(415659);
    let l = t.createContext({ size: "default", variant: "default" }),
      i = t.forwardRef(
        ({ className: e, variant: t, size: n, children: i, ...s }, d) =>
          (0, r.jsx)(o.Root, {
            className: (0, a.cn)("flex items-center justify-center gap-1", e),
            ref: d,
            ...s,
            children: (0, r.jsx)(l.Provider, {
              value: { variant: t, size: n },
              children: i,
            }),
          }),
      );
    i.displayName = o.Root.displayName;
    let s = t.forwardRef(
      ({ className: e, children: i, variant: s, size: d, ...c }, u) => {
        let p = t.useContext(l);
        return (0, r.jsx)(o.Item, {
          className: (0, a.cn)(
            (0, n.toggleVariants)({
              variant: p.variant || s,
              size: p.size || d,
            }),
            e,
          ),
          ref: u,
          ...c,
          children: i,
        });
      },
    );
    ((s.displayName = o.Item.displayName),
      e.s(["ToggleGroup", () => i, "ToggleGroupItem", () => s]));
  },
  513391,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(890446),
      a = e.i(168034),
      n = e.i(403055),
      l = e.i(187976);
    let i = a.FormProvider,
      s = t.createContext(null),
      d = ({ ...e }) => {
        let [o, n] = t.useState(!1);
        return (t.useEffect(() => n(!0), []), o)
          ? (0, r.jsx)(s.Provider, {
              value: { name: e.name },
              children: (0, r.jsx)(a.Controller, { ...e }),
            })
          : null;
      },
      c = () => {
        let e = t.useContext(s),
          r = t.useContext(u),
          { formState: o } = (0, a.useFormContext)(),
          { getFieldState: n } = (0, a.useForm)();
        if (!e) throw Error("useFormField should be used within <FormField>");
        let l = n(e.name, o),
          { id: i } = r;
        return {
          id: i,
          name: e.name,
          formItemId: `${i}-form-item`,
          formDescriptionId: `${i}-form-item-description`,
          formMessageId: `${i}-form-item-message`,
          ...l,
        };
      },
      u = t.createContext({}),
      p = t.forwardRef(({ className: e, ...o }, a) => {
        let l = t.useId();
        return (0, r.jsx)(u.Provider, {
          value: { id: l },
          children: (0, r.jsx)("div", {
            className: (0, n.cn)("space-y-2", e),
            ref: a,
            ...o,
          }),
        });
      });
    p.displayName = "FormItem";
    let f = t.forwardRef(({ className: e, ...t }, o) => {
      let { error: a, formItemId: i } = c();
      return (0, r.jsx)(l.Label, {
        className: (0, n.cn)(a && "text-destructive", e),
        htmlFor: i,
        ref: o,
        ...t,
      });
    });
    f.displayName = "FormLabel";
    let m = t.forwardRef(({ ...e }, t) => {
      let {
        error: a,
        formItemId: n,
        formDescriptionId: l,
        formMessageId: i,
      } = c();
      return (0, r.jsx)(o.Slot, {
        "aria-describedby": a ? `${l} ${i}` : l,
        "aria-invalid": !!a,
        id: n,
        ref: t,
        ...e,
      });
    });
    m.displayName = "FormControl";
    let v = t.forwardRef(({ className: e, ...t }, o) => {
      let { formDescriptionId: a } = c();
      return (0, r.jsx)("p", {
        className: (0, n.cn)("text-[0.8rem] text-muted-foreground", e),
        id: a,
        ref: o,
        ...t,
      });
    });
    v.displayName = "FormDescription";
    let g = t.forwardRef(({ className: e, children: t, ...o }, a) => {
      let { error: l, formMessageId: i } = c(),
        s = l ? String(l.message) : t;
      return s
        ? (0, r.jsx)("p", {
            className: (0, n.cn)(
              "text-[0.8rem] font-medium text-destructive",
              e,
            ),
            id: i,
            ref: a,
            ...o,
            children: s,
          })
        : null;
    });
    ((g.displayName = "FormMessage"),
      e.s([
        "Form",
        () => i,
        "FormControl",
        () => m,
        "FormDescription",
        () => v,
        "FormField",
        () => d,
        "FormItem",
        () => p,
        "FormLabel",
        () => f,
        "FormMessage",
        () => g,
        "useFormField",
        () => c,
      ]));
  },
  574386,
  (e) => {
    "use strict";
    var r = e.i(301224),
      t = e.i(789783),
      o = e.i(890446),
      a = e.i(615793),
      n = e.i(679912),
      l = e.i(403055);
    let i = t.forwardRef(({ ...e }, t) =>
      (0, r.jsx)("nav", { "aria-label": "breadcrumb", ref: t, ...e }),
    );
    i.displayName = "Breadcrumb";
    let s = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("ol", {
        className: (0, l.cn)(
          "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
          e,
        ),
        ref: o,
        ...t,
      }),
    );
    s.displayName = "BreadcrumbList";
    let d = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("li", {
        className: (0, l.cn)("inline-flex items-center gap-1.5", e),
        ref: o,
        ...t,
      }),
    );
    d.displayName = "BreadcrumbItem";
    let c = t.forwardRef(({ asChild: e, className: t, ...a }, n) => {
      let i = e ? o.Slot : "a";
      return (0, r.jsx)(i, {
        className: (0, l.cn)("transition-colors hover:text-foreground", t),
        ref: n,
        ...a,
      });
    });
    c.displayName = "BreadcrumbLink";
    let u = t.forwardRef(({ className: e, ...t }, o) =>
      (0, r.jsx)("span", {
        "aria-current": "page",
        "aria-disabled": "true",
        className: (0, l.cn)("font-normal text-foreground", e),
        ref: o,
        role: "link",
        ...t,
      }),
    );
    u.displayName = "BreadcrumbPage";
    let p = ({ children: e, className: t, ...o }) =>
      (0, r.jsx)("li", {
        "aria-hidden": "true",
        className: (0, l.cn)("[&>svg]:h-3.5 [&>svg]:w-3.5", t),
        role: "presentation",
        ...o,
        children: e ?? (0, r.jsx)(a.ChevronRight, {}),
      });
    p.displayName = "BreadcrumbSeparator";
    let f = ({ className: e, ...t }) =>
      (0, r.jsxs)("span", {
        "aria-hidden": "true",
        className: (0, l.cn)("flex h-9 w-9 items-center justify-center", e),
        role: "presentation",
        ...t,
        children: [
          (0, r.jsx)(n.MoreHorizontal, { className: "h-4 w-4" }),
          (0, r.jsx)("span", { className: "sr-only", children: "More" }),
        ],
      });
    ((f.displayName = "BreadcrumbElipssis"),
      e.s([
        "Breadcrumb",
        () => i,
        "BreadcrumbEllipsis",
        () => f,
        "BreadcrumbItem",
        () => d,
        "BreadcrumbLink",
        () => c,
        "BreadcrumbList",
        () => s,
        "BreadcrumbPage",
        () => u,
        "BreadcrumbSeparator",
        () => p,
      ]));
  },
]);
