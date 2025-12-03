(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  566420,
  (e) => {
    "use strict";
    var t = e.i(301224),
      n = e.i(789783),
      r = e.i(890446);
    function l({ children: e, ...l }) {
      return Object.keys(l).some((e) => !e.startsWith("__v0"))
        ? (0, t.jsx)(r.Slottable, {
            ...l,
            children: n.default.cloneElement(e, l),
          })
        : (0, t.jsx)(r.Slottable, { ...l, children: e });
    }
    ((r.Slottable.__v0_slottable = !0),
      (l.__radixId = r.Slottable.__radixId),
      (l.__v0_slottable = !0),
      (l.displayName = "Slottable"),
      e.s(["Slottable", () => l]));
  },
  72508,
  (e) => {
    e.v({
      className: "geistsans_d5a4f12f-module__NFD_JW__className",
      variable: "geistsans_d5a4f12f-module__NFD_JW__variable",
    });
  },
  827620,
  (e) => {
    e.v({
      className: "geistmono_157ca88a-module__mYul6G__className",
      variable: "geistmono_157ca88a-module__mYul6G__variable",
    });
  },
  397220,
  912085,
  133519,
  609750,
  (e) => {
    "use strict";
    var t = e.i(72508);
    let n = {
      className: t.default.className,
      style: { fontFamily: "'GeistSans', 'GeistSans Fallback'" },
    };
    (null != t.default.variable && (n.variable = t.default.variable),
      e.s([], 397220),
      e.s(["GeistSans", 0, n], 912085));
    var r = e.i(827620);
    let l = {
      className: r.default.className,
      style: {
        fontFamily:
          "'GeistMono', ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace",
      },
    };
    (null != r.default.variable && (l.variable = r.default.variable),
      e.s([], 133519),
      e.s(["GeistMono", 0, l], 609750));
  },
  871209,
  (e) => {
    "use strict";
    var t = e.i(301224),
      n = e.i(789783),
      r = e.i(462048),
      l = e.i(754853),
      o = e.i(403055);
    let s = r.Root,
      i = r.Trigger;
    (r.Group,
      r.Portal,
      r.Sub,
      r.RadioGroup,
      (n.forwardRef(({ className: e, inset: n, children: s, ...i }, a) =>
        (0, t.jsxs)(r.SubTrigger, {
          className: (0, o.cn)(
            "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            n && "pl-8",
            e,
          ),
          ref: a,
          ...i,
          children: [
            s,
            (0, t.jsx)(l.ChevronRightIcon, { className: "ml-auto h-4 w-4" }),
          ],
        }),
      ).displayName = r.SubTrigger.displayName),
      (n.forwardRef(({ className: e, ...n }, l) =>
        (0, t.jsx)(r.SubContent, {
          className: (0, o.cn)(
            "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e,
          ),
          ref: l,
          ...n,
        }),
      ).displayName = r.SubContent.displayName));
    let a = n.forwardRef(({ className: e, ...n }, l) =>
      (0, t.jsx)(r.Portal, {
        children: (0, t.jsx)(r.Content, {
          className: (0, o.cn)(
            "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e,
          ),
          ref: l,
          ...n,
        }),
      }),
    );
    a.displayName = r.Content.displayName;
    let d = n.forwardRef(({ className: e, inset: n, ...l }, s) =>
      (0, t.jsx)(r.Item, {
        className: (0, o.cn)(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          n && "pl-8",
          e,
        ),
        ref: s,
        ...l,
      }),
    );
    ((d.displayName = r.Item.displayName),
      (n.forwardRef(({ className: e, children: n, checked: s, ...i }, a) =>
        (0, t.jsxs)(r.CheckboxItem, {
          checked: s,
          className: (0, o.cn)(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
            e,
          ),
          ref: a,
          ...i,
          children: [
            (0, t.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, t.jsx)(r.ItemIndicator, {
                children: (0, t.jsx)(l.CheckIcon, { className: "h-4 w-4" }),
              }),
            }),
            n,
          ],
        }),
      ).displayName = r.CheckboxItem.displayName),
      (n.forwardRef(({ className: e, children: n, ...s }, i) =>
        (0, t.jsxs)(r.RadioItem, {
          className: (0, o.cn)(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
            e,
          ),
          ref: i,
          ...s,
          children: [
            (0, t.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, t.jsx)(r.ItemIndicator, {
                children: (0, t.jsx)(l.DotFilledIcon, {
                  className: "h-4 w-4 fill-current",
                }),
              }),
            }),
            n,
          ],
        }),
      ).displayName = r.RadioItem.displayName),
      (n.forwardRef(({ className: e, inset: n, ...l }, s) =>
        (0, t.jsx)(r.Label, {
          className: (0, o.cn)(
            "px-2 py-1.5 text-sm font-semibold text-foreground",
            n && "pl-8",
            e,
          ),
          ref: s,
          ...l,
        }),
      ).displayName = r.Label.displayName),
      (n.forwardRef(({ className: e, ...n }, l) =>
        (0, t.jsx)(r.Separator, {
          className: (0, o.cn)("-mx-1 my-1 h-px bg-border", e),
          ref: l,
          ...n,
        }),
      ).displayName = r.Separator.displayName),
      e.s([
        "ContextMenu",
        () => s,
        "ContextMenuContent",
        () => a,
        "ContextMenuItem",
        () => d,
        "ContextMenuTrigger",
        () => i,
      ]));
  },
  807442,
  295224,
  13072,
  (e) => {
    "use strict";
    var t = e.i(301224);
    e.i(566420);
    var n = e.i(659671),
      r = e.i(789783),
      l = e.i(871209);
    e.i(397220);
    var o = e.i(912085);
    e.i(133519);
    var s = e.i(609750),
      i = e.i(608367),
      a = e.i(403055);
    function d(e) {
      let t = (0, r.useRef)(e);
      return (
        (0, r.useEffect)(() => {
          t.current = e;
        }, [e]),
        t
      );
    }
    e.s(["useLatest", () => d], 295224);
    var c = e.i(819757),
      u = e.i(5743);
    let m = ["2xl", "xl", "lg", "md", "sm"],
      f = {},
      p = -1,
      g = new u.LRUCache({ max: 2e3 });
    function v(e, t = !1) {
      let n = window.getComputedStyle(e),
        r = n.color,
        l = n.backgroundColor,
        o = n.borderColor,
        s = n.fontWeight,
        i = m.find((e) => {
          let t = document.getElementById(`__v0_tw_${e}`);
          return !!t && "0px" === window.getComputedStyle(t).width;
        }),
        a = (function () {
          let e = (0, c.getTailwindConfigVersion)();
          if (e === p) return f;
          let t = (0, c.getTailwindConfig)();
          if (!t) return {};
          let n = { ...t.colors };
          (delete n.lightBlue,
            delete n.warmGray,
            delete n.trueGray,
            delete n.coolGray,
            delete n.blueGray);
          let r = t.config.theme?.extend?.colors,
            l = { ...n, ...r },
            o = document.getElementById("__v0_tw_color");
          if (!o) return {};
          p = e;
          let s = 0;
          for (let e in l)
            if ("inherit" !== e && "current" !== e)
              if ("object" == typeof l[e])
                for (let t in l[e])
                  "string" == typeof l[e][t] &&
                    o.style.setProperty(`--v0-c-${s++}`, l[e][t]);
              else
                "string" == typeof l[e] &&
                  o.style.setProperty(`--v0-c-${s++}`, l[e]);
          s = 0;
          let i = {},
            a = window.getComputedStyle(o);
          for (let e in l)
            if ("inherit" !== e && "current" !== e) {
              if ("object" == typeof l[e]) {
                for (let t in l[e])
                  if ("string" == typeof l[e][t]) {
                    let n = a.getPropertyValue(`--v0-c-${s++}`);
                    "DEFAULT" === t ? (i[e] = n) : (i[`${e}-${t}`] = n);
                  }
              } else if ("string" == typeof l[e]) {
                let t = a.getPropertyValue(`--v0-c-${s++}`);
                i[e] = t;
              }
            }
          for (let e in i) {
            let t = i[e];
            ("" === t || "hsl()" === t) && delete i[e];
          }
          return (f = { colors: i });
        })(),
        d = (0, c.getTailwindVersion)();
      return {
        color: r,
        backgroundColor: l,
        borderColor: o,
        fontWeight: s,
        activeBreakpoint: i,
        twTokens: a,
        dsTokens: t
          ? (function () {
              let e = window.__v0_dst || [];
              if (0 === e.length) return { default: {}, dark: {}, theme: {} };
              let t = document.getElementById("__v0_tw_dst");
              if (!t) return { default: {}, dark: {}, theme: {} };
              let n = e.reduce(
                (e, t) => ({
                  default: { ...e.default, ...t.default },
                  dark: { ...e.dark, ...t.dark },
                  theme: { ...e.theme, ...t.theme },
                }),
                { default: {}, dark: {}, theme: {} },
              );
              for (let e of ["default", "dark"]) {
                let r = n[e];
                for (let e in r) {
                  let n = r[e];
                  if (g.has(n)) {
                    r[e] = g.get(n);
                    continue;
                  }
                  if ("undefined" == typeof CSSNumericValue) {
                    ((r[e] = n.trim()), g.set(n, r[e]));
                    continue;
                  }
                  try {
                    let l,
                      o = CSSNumericValue.parse(n);
                    ("number" === o.unit || "" === o.unit
                      ? (t.style.setProperty("opacity", n),
                        (l = window
                          .getComputedStyle(t)
                          .getPropertyValue("opacity")))
                      : (t.style.setProperty("margin-left", n),
                        (l = window
                          .getComputedStyle(t)
                          .getPropertyValue("margin-left"))),
                      (r[e] = l),
                      g.set(n, l));
                  } catch (o) {
                    t.style.setProperty("color", n);
                    let l = window
                      .getComputedStyle(t)
                      .getPropertyValue("color");
                    ((r[e] = l), g.set(n, l));
                  }
                }
              }
              return n;
            })()
          : void 0,
        twVersion: d,
        currentTheme: document.documentElement.classList.contains("dark")
          ? "dark"
          : "light",
      };
    }
    function x({ onViewportChange: e }) {
      let n = d(e);
      return (
        (0, r.useEffect)(() => {
          let e = new ResizeObserver(() => {
              n.current();
            }),
            t = document.getElementById("__v0_tw_sm"),
            r = document.getElementById("__v0_tw_md"),
            l = document.getElementById("__v0_tw_lg"),
            o = document.getElementById("__v0_tw_xl"),
            s = document.getElementById("__v0_tw_2xl");
          if (t && r && l && o && s)
            return (
              e.observe(t),
              e.observe(r),
              e.observe(l),
              e.observe(o),
              e.observe(s),
              () => {
                e.disconnect();
              }
            );
        }, []),
        (0, t.jsxs)("div", {
          className:
            "fixed top-0 left-0 opacity-0 invisible pointer-events-none",
          children: [
            (0, t.jsx)("span", { id: "__v0_tw_dst" }),
            (0, t.jsx)("span", { id: "__v0_tw_color" }),
            (0, t.jsx)("span", {
              id: "__v0_tw_sm",
              className: "inline-block size-1 sm:size-0",
            }),
            (0, t.jsx)("span", {
              id: "__v0_tw_md",
              className: "inline-block size-1 md:size-0",
            }),
            (0, t.jsx)("span", {
              id: "__v0_tw_lg",
              className: "inline-block size-1 lg:size-0",
            }),
            (0, t.jsx)("span", {
              id: "__v0_tw_xl",
              className: "inline-block size-1 xl:size-0",
            }),
            (0, t.jsx)("span", {
              id: "__v0_tw_2xl",
              className: "inline-block size-1 2xl:size-0",
            }),
          ],
        })
      );
    }
    let b = (0, t.jsx)("style", {
        dangerouslySetInnerHTML: {
          __html: `\
.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:initial}
div:has(> [data-v0-devtool-dropdown-menu]){z-index:2147483645 !important}`,
        },
      }),
      h = (0, t.jsx)("style", {
        dangerouslySetInnerHTML: { __html: "*{cursor:crosshair !important}" },
      }),
      _ = null;
    function y(e) {
      _ = e;
    }
    let w = [];
    e.s(
      [
        "TailwindVarDetector",
        () => x,
        "getExtraElementInfo",
        () => v,
        "optimisticApplyVisualChanges",
        0,
        (e) => {
          if ("css-var" === e.type || _)
            switch (e.type) {
              case "class": {
                if (!_) return;
                let t = new Set(e.value.split(" ")),
                  n = new Set(e.prev.split(" ")),
                  r = [],
                  l = [];
                for (let e of n)
                  e.trim() && !t.has(e) && (_.classList.remove(e), l.push(e));
                for (let e of t)
                  e.trim() && !n.has(e) && (_.classList.add(e), r.push(e));
                (r.length > 0 || l.length > 0) &&
                  w.push({
                    type: "class",
                    element: _,
                    addedClasses: r,
                    removedClasses: l,
                  });
                break;
              }
              case "content": {
                if (!_) return;
                let t = _.textContent || "",
                  n = e.value;
                (w.push({ type: "content", element: _, originalContent: t }),
                  (_.textContent = n));
                break;
              }
              case "css-var": {
                let { variable: t, value: n } = e,
                  r =
                    document.documentElement.style.getPropertyValue(t) || null;
                (w.push({ type: "css-var", variable: t, originalValue: r }),
                  document.documentElement.style.setProperty(t, n));
                break;
              }
              case "image": {
                if (!_) return;
                let t = _,
                  n = t.src || "",
                  r = e.src;
                (w.push({ type: "image", element: _, originalSrc: n }),
                  (t.src = r));
              }
            }
        },
        "revertOptimisticVisualChanges",
        0,
        () => {
          for (let e = w.length - 1; e >= 0; e--) {
            let t = w[e];
            switch (t.type) {
              case "css-var":
                null !== t.originalValue
                  ? document.documentElement.style.setProperty(
                      t.variable,
                      t.originalValue,
                    )
                  : document.documentElement.style.removeProperty(t.variable);
                break;
              case "class":
                for (let e of t.addedClasses) t.element.classList.remove(e);
                for (let e of t.removedClasses) t.element.classList.add(e);
                break;
              case "content":
                t.element.textContent = t.originalContent;
                break;
              case "image":
                t.element.src = t.originalSrc;
            }
          }
          w = [];
        },
        "setGlobalLockedElement",
        () => y,
        "visualEditingCursorStyles",
        0,
        h,
        "visualEditingStyles",
        0,
        b,
      ],
      13072,
    );
    var N = e.i(292948),
      E = e.i(123314);
    function C({ children: e, onClick: n }) {
      return (0, t.jsx)(N.DropdownMenuItem, {
        asChild: !0,
        className: (0, a.cn)(
          o.GeistSans.className,
          "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] hover:text-[#fff] focus:bg-[#444] focus:text-[#fff] focus:outline-none",
        ),
        children: (0, t.jsx)("button", { onClick: n, children: e }),
      });
    }
    function k({ children: e, onClick: n }) {
      return (0, t.jsx)(l.ContextMenuItem, {
        onClick: n,
        className: (0, a.cn)(
          o.GeistSans.className,
          "rounded-[2px] px-[8px] py-[4px] text-[12px] font-[400] leading-[16px] focus:bg-[#444] focus:text-[#fff]",
        ),
        children: e,
      });
    }
    function L(e) {
      return (0, t.jsx)("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 16 16",
        fill: "currentColor",
        className: e.className,
        children: (0, t.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M6.93934 2.06066L8 1L9.06066 2.06066L13.9393 6.93934L15 8L13.9393 9.06066L9.06066 13.9393L8 15L6.93934 13.9393L2.06066 9.06066L1 8L2.06066 6.93934L6.93934 2.06066ZM3.12132 8L8 12.8787L12.8787 8L8 3.12132L3.12132 8Z",
        }),
      });
    }
    function j(e) {
      let t = window.getComputedStyle(e),
        n = [
          parseFloat(t.paddingTop),
          parseFloat(t.paddingRight),
          parseFloat(t.paddingBottom),
          parseFloat(t.paddingLeft),
        ];
      return {
        bounds: e.getBoundingClientRect(),
        margin: [0, 0, 0, 0],
        padding: n,
      };
    }
    let S = { 0: "jsxText", 1: "string", 2: "template" },
      M = new WeakMap();
    function T(e) {
      let { hoverStyle: r } = e,
        o = r ? 2 : 1,
        i = window.innerHeight,
        d = window.innerWidth,
        c = Math.min(e.bounds.top - o, i - 1),
        u = Math.max(e.bounds.bottom + o, 1),
        m = Math.min(e.bounds.left - o, d - 1),
        f = Math.max(e.bounds.right + o, 1),
        p = Math.max(0, Math.max(e.bounds.width, f - m - 2 * o)),
        g = Math.max(0, Math.max(e.bounds.height, u - c - 2 * o)),
        v = !1;
      c <= 0 &&
        m <= 0 &&
        u >= i &&
        f >= d &&
        ((c = 0), (m = 0), (p = d - 2), (g = i - 2), (v = !0));
      let x = e.padding.some((e) => e > 0),
        b = (0, t.jsxs)(n.DismissableLayerBranch, {
          className: "fixed select-none border-[#60a5fa]",
          "data-v0-devtool-overlay": !0,
          onClick: e.onClick,
          onDoubleClick: e.onDoubleClick,
          style: {
            borderWidth: o,
            boxSizing: "content-box",
            top: c,
            left: m,
            width: p,
            height: g,
            zIndex: e.locked ? 99998 : 99999,
            pointerEvents:
              e.contentEditingElement?.element === e.element ? "none" : "auto",
            transition: "opacity 0.1s ease",
            opacity: +!e.hide,
          },
          children: [
            e.locked && e.element.isConnected
              ? (0, t.jsxs)(N.DropdownMenu, {
                  children: [
                    (0, t.jsx)(N.DropdownMenuTrigger, {
                      asChild: !0,
                      children: (0, t.jsxs)("span", {
                        className: (0, a.cn)(
                          s.GeistMono.className,
                          "font-medium antialiased absolute flex w-min select-none items-center gap-[2px] whitespace-nowrap rounded-[8px] border border-[rgb(29_78_216/0.1)] bg-[#dbeafe] px-[6px] py-[2px] pr-[4px] text-[12px] text-[#1d4ed8] hover:bg-[#bfdbfe]",
                          v
                            ? "top-0 translate-y-[8px]"
                            : c >= 30
                              ? "bottom-full translate-y-[-8px]"
                              : "top-full translate-y-[8px]",
                          v
                            ? "left-0 translate-x-[8px]"
                            : m >= 5
                              ? "left-0 translate-x-[-1px]"
                              : "left-0 translate-x-[4px]",
                        ),
                        children: [
                          (0, t.jsx)(L, { className: "size-3.5" }),
                          e.source.name,
                          (0, t.jsx)("svg", {
                            height: "14",
                            width: "14",
                            strokeLinejoin: "round",
                            viewBox: "0 0 16 16",
                            children: (0, t.jsx)("path", {
                              fillRule: "evenodd",
                              clipRule: "evenodd",
                              d: "M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z",
                              fill: "currentColor",
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(N.DropdownMenuContent, {
                      align: "start",
                      side: "bottom",
                      sideOffset: 4,
                      className:
                        "z-[2147483645] rounded-[4px] border-[#444] bg-[#222] p-[4px] text-[#fff]",
                      "data-v0-devtool-dropdown-menu": !0,
                      children: (0, t.jsxs)(N.DropdownMenuGroup, {
                        children: [
                          (0, t.jsx)(C, {
                            onClick: () => {
                              e.contextMenuRef.current.goto(e.source);
                            },
                            children: "Go to code",
                          }),
                          e.inlineEdit
                            ? (0, t.jsx)(C, {
                                onClick: () => {
                                  e.contextMenuRef.current.edit();
                                },
                                children: "Edit content",
                              })
                            : null,
                          (0, t.jsx)(C, {
                            onClick: () => {
                              e.contextMenuRef.current.copy(e.source);
                            },
                            children: "Copy component code",
                          }),
                          (0, t.jsx)(C, {
                            onClick: () => {
                              e.contextMenuRef.current.delete(e.source);
                            },
                            children: "Delete element",
                          }),
                        ],
                      }),
                    }),
                  ],
                })
              : null,
            x
              ? (0, t.jsx)("div", {
                  className:
                    "pointer-events-none absolute box-border border-[#60a5fa]",
                  style: {
                    borderStyle: "dotted",
                    borderWidth: 1,
                    left: e.padding[3] - 1,
                    top: e.padding[0] - 1,
                    right: e.padding[1] - 1,
                    bottom: e.padding[2] - 1,
                  },
                })
              : null,
          ],
        });
      if (
        ((b = (0, t.jsxs)(l.ContextMenu, {
          onOpenChange: (t) => {
            e.contextMenuRef.current.open = t;
          },
          children: [
            (0, t.jsx)(l.ContextMenuTrigger, { children: b }),
            (0, t.jsxs)(l.ContextMenuContent, {
              "data-v0-devtool-contextmenu": !0,
              style: { zIndex: 0x7ffffffd },
              className: "rounded-[4px] border-[#444] bg-[#222] text-[#fff]",
              children: [
                (0, t.jsx)(k, {
                  onClick: () => {
                    e.contextMenuRef.current.goto(e.source);
                  },
                  children: "Go to code",
                }),
                e.inlineEdit
                  ? (0, t.jsx)(k, {
                      onClick: () => {
                        e.contextMenuRef.current.edit();
                      },
                      children: "Edit content",
                    })
                  : null,
                (0, t.jsx)(k, {
                  onClick: () => {
                    e.contextMenuRef.current.copy(e.source);
                  },
                  children: "Copy component code",
                }),
                (0, t.jsx)(k, {
                  onClick: () => {
                    e.contextMenuRef.current.delete(e.source);
                  },
                  children: "Delete element",
                }),
              ],
            }),
          ],
        })),
        e.relatedElements.size <= 1 || e.hide)
      )
        return b;
      let h = [],
        _ = 0;
      return (
        e.relatedElements.forEach((n) => {
          if (n === e.element) return;
          let r = j(n);
          h.push(
            (0, t.jsx)(
              "div",
              {
                className:
                  "pointer-events-none fixed box-content select-none border border-dotted border-blue-400/60 bg-blue-100/25 mix-blend-multiply",
                style: {
                  top: r.bounds.top - 1,
                  left: r.bounds.left - 1,
                  width: Math.max(0, r.bounds.width),
                  height: Math.max(0, r.bounds.height),
                  zIndex: 9999,
                },
              },
              `_v0_r_${++_}`,
            ),
          );
        }),
        (0, t.jsxs)(t.Fragment, { children: [h, b] })
      );
    }
    let R = null,
      P = new Map();
    function z(e) {
      let t = j(e),
        n = M.get(e) || Math.random().toString(36).slice(2);
      return (
        M.set(e, n),
        { ...t, element: e, parent: e.parentElement, id: n }
      );
    }
    let D = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]),
      I = (e, t) =>
        t.top >= e.top &&
        t.left >= e.left &&
        t.bottom <= e.bottom &&
        t.right <= e.right;
    function O({
      enabled: e,
      fileMapping: n,
      sourceVersion: l,
      children: o,
      isV3: s,
    }) {
      let [a, d] = (0, r.useState)(null),
        c = (0, r.useRef)(a),
        [u, m] = (0, r.useState)(null),
        f = (0, r.useRef)(u),
        [p, g] = (0, r.useState)(!1),
        y = (0, r.useRef)(p),
        w = (0, r.useRef)(null),
        [N, C] = (0, r.useState)(0),
        k = l < N,
        L = (0, r.useRef)(!0),
        O = (0, r.useRef)({
          open: !1,
          copy: () => {},
          goto: () => {},
          delete: () => {},
          edit: () => {},
        }),
        [H, W] = (0, r.useState)(!1),
        U = (0, r.useRef)(n);
      ((0, r.useEffect)(() => {
        U.current = n;
      }, [n]),
        (0, r.useEffect)(() => {
          _ = u?.element || null;
        }, [u]),
        (0, r.useEffect)(() => {
          ((R = null), (P = new Map()));
          let e = setTimeout(() => {
            W(!1);
          }, 1500);
          return (
            W(!0),
            () => {
              (clearTimeout(e), W(!1));
            }
          );
        }, [l]));
      let K = (0, r.useCallback)(() => {
        let e = f.current || c.current;
        if (!e) return null;
        let { inlineEdit: t, element: n } = e;
        if ((f.current && er(f.current.element), t)) {
          (g(!0), el(n));
          let e = document.createRange();
          e.selectNodeContents(n);
          let t = window.getSelection();
          (t?.removeAllRanges(),
            t?.addRange(e),
            setTimeout(() => {
              n.focus();
            }, 0));
        } else g(!1);
        J(e);
      }, []);
      ((0, r.useEffect)(() => {
        ((O.current.copy = (e) =>
          (0, i.sendToParent)({
            type: "devtools_copy",
            start: e.start,
            end: e.end,
            file: U.current[e.fileName],
          })),
          (O.current.delete = (e) =>
            (0, i.sendToParent)({
              type: "devtools_delete",
              start: e.start,
              end: e.end,
              jsxRoot: e.jsxRoot,
              file: U.current[e.fileName],
            })),
          (O.current.goto = (e) =>
            (0, i.sendToParent)({
              type: "devtools_goto",
              line: e.lineNumber,
              column: e.columnNumber,
              file: U.current[e.fileName],
            })),
          (O.current.edit = () => K()));
      }, [K]),
        (0, r.useEffect)(() => {
          (e || (O.current.open = !1),
            e ? (0, E.startFetchCache)() : (0, E.stopFetchCache)());
        }, [e]));
      let J = (0, r.useCallback)(
        (e) => {
          if (s) {
            let { fileName: t, lineNumber: n, columnNumber: r } = e.source;
            (0, i.sendToParent)({
              type: "add-refinement-element",
              file: U.current[t],
              line: n,
              column: r,
              id: `${t}:${n}:${r}`,
            });
            return;
          }
          m(e);
        },
        [s],
      );
      ((0, r.useEffect)(() => {
        let t = document.body;
        e ? t.classList.add("v0-lite-dev") : t.classList.remove("v0-lite-dev");
      }, [e]),
        (0, r.useEffect)(() => {
          if (!f.current) return;
          let { element: e, parent: t, source: n } = f.current;
          if (e.isConnected) return;
          let r = (function (e) {
              if (!e) return null;
              R || (R = B(V(document.body)));
              let t = [];
              return (G(R, (n) => {
                let r = $(n);
                if (
                  r &&
                  r.fileName === e.fileName &&
                  r.start === e.start &&
                  r.name === e.name
                ) {
                  let e = A(n);
                  e && e.isConnected && t.push(e);
                }
              }),
              0 === t.length)
                ? null
                : t;
            })(n),
            o = null;
          if (!r)
            if (t?.isConnected) {
              let n = e.tagName,
                r = f.current.bounds.top,
                l = f.current.bounds.left,
                s = 1 / 0;
              [...t.childNodes].forEach((e) => {
                if (e.nodeType !== Node.ELEMENT_NODE || e.tagName !== n) return;
                let t = e.getBoundingClientRect(),
                  i = Math.abs(t.top - r) + Math.abs(t.left - l);
                i < s && ((s = i), (o = e));
              });
            } else {
              let t = e.tagName,
                n = f.current.bounds.top,
                r = f.current.bounds.left;
              document.elementsFromPoint(r, n).forEach((e) => {
                e.nodeType === Node.ELEMENT_NODE && e.tagName === t && (o = e);
              });
            }
          if (r || o) {
            let t;
            if (r)
              if (1 === r.length) t = r[0];
              else {
                let n = null,
                  l = -1;
                for (let t of r) {
                  let r = 0;
                  (t.textContent === e.textContent && (r += 1),
                    t.className === e.className && (r += 1),
                    t.tagName === e.tagName && (r += 1),
                    t.id === e.id && (r += 1),
                    r > l && ((l = r), (n = t)));
                }
                t = n;
              }
            else t = o;
            M.set(t, f.current.id);
            let n = F(t);
            if (!n) return void m(null);
            let {
              source: l,
              targetElement: s,
              inlineEdit: i,
              className: a,
              relatedElements: d,
            } = n;
            m((e) =>
              e
                ? (f.current = {
                    ...e,
                    source: l,
                    inlineEdit: i,
                    className: a,
                    relatedElements: d,
                    ...z(s),
                  })
                : null,
            );
          } else
            (0, i.sendToParent)({
              type: "devtools_selected_state",
              parts: null,
              selected: !1,
              info: v(document.documentElement, !0),
              version: l,
            });
        }, [l]));
      let Y = u?.source,
        Z = u?.element,
        X = (0, r.useCallback)(() => {
          function e() {
            let e = !!Z;
            (0, i.sendToParent)({
              type: "devtools_selected_state",
              parts: null,
              selected: e,
              version: l,
              info: v(document.documentElement, !e),
            });
          }
          if (Y && Z) {
            let t,
              n = U.current[Y.fileName],
              r = F(Z),
              o = !Z.isConnected;
            if (!r) {
              o || e();
              return;
            }
            let s = r.className;
            if (!s) {
              o || e();
              return;
            }
            if (r.inlineEdit) {
              let [e, n, l, o, ...s] = r.inlineEdit.format.split(":");
              t = {
                file: U.current[r.inlineEdit.source.fileName],
                line: Number(n),
                column: Number(l),
                len: Number(o),
                type: S[e],
                value: s.join(":"),
              };
            }
            let a = F(Z),
              d = a?.source || Y;
            (0, i.sendToParent)({
              type: "devtools_selected_state",
              parts: s.parts,
              defined: s.defined,
              info: v(Z),
              file: n,
              content: t,
              key: M.get(Z),
              jsxRoot: d.jsxRoot,
              name: d.name,
              line: d.lineNumber,
              column: d.columnNumber,
              lib: d.lib,
              start: d.start,
              end: d.end,
              version: l,
            });
            return;
          }
          e();
        }, [Y, Z, l]);
      ((0, r.useEffect)(() => {
        X();
      }, [X]),
        (0, r.useEffect)(() => {
          c.current = a;
        }, [a]),
        (0, r.useEffect)(() => {
          f.current = u;
        }, [u]),
        (0, r.useEffect)(() => {
          y.current = p;
        }, [p]));
      let q = (0, r.useCallback)(() => {
        if (c.current) {
          let e = j(c.current.element);
          d((t) => (t ? (c.current = { ...t, ...e }) : null));
        }
        if (f.current) {
          let e = j(f.current.element);
          m((t) => (t ? (f.current = { ...t, ...e }) : null));
        }
      }, []);
      (0, r.useEffect)(() => {
        (q(),
          setTimeout(() => {
            q();
          }, 100));
      }, [l]);
      let Q = (0, r.useCallback)((e) => {
          (e.stopPropagation(), e.preventDefault());
        }, []),
        ee = (0, r.useCallback)(() => {
          q();
        }, []),
        et = (0, r.useCallback)((e) => {
          " " !== e.key ||
            e.defaultPrevented ||
            (e.preventDefault(),
            e.stopPropagation(),
            document.execCommand("insertText", !1, " "));
        }, []),
        en = (0, r.useCallback)(() => {
          let e = f.current;
          if (!e) return;
          let t = e.inlineEdit;
          if (!t || L.current) return;
          L.current = !0;
          let n = t.source,
            [r, l, o, s] = t.format.split(":"),
            a = U.current[n.fileName],
            d = S[r],
            c =
              ("jsxText" === d
                ? e.element.innerHTML
                : "string" === d || "template" === d
                  ? e.element.textContent
                  : "") || "",
            u = Date.now();
          C(u);
          let p =
            "jsxText" === d
              ? c
              : "string" === d
                ? JSON.stringify(c).slice(1, -1)
                : "template" === d
                  ? c.replace(/(?<!\\)['"`$]/g, "\\$&")
                  : "";
          ((0, i.sendToParent)({
            type: "inline_edit",
            file: a,
            line: Number(l),
            column: Number(o),
            len: Number(s),
            replace: p,
            version: u,
          }),
            m((e) => (e && er(e.element), null)));
        }, []),
        er = (0, r.useCallback)(
          (e) => {
            (en(),
              e instanceof SVGElement ||
                ((e.contentEditable =
                  e.dataset.v0DevContentEditableOldValue || "false"),
                window.getSelection()?.removeAllRanges(),
                delete e.dataset.v0DevEditing,
                delete e.dataset.v0DevContentEditableOldValue,
                e.removeEventListener("click", Q),
                e.removeEventListener("focusout", en),
                e.removeEventListener("input", ee),
                "BUTTON" === e.tagName &&
                  e.removeEventListener("keydown", et)));
          },
          [Q, en, ee, et],
        ),
        el = (0, r.useCallback)(
          (e) => {
            ((L.current = !1),
              e instanceof SVGElement ||
                ((e.dataset.v0DevContentEditableOldValue = e.contentEditable),
                (e.contentEditable = "plaintext-only"),
                (e.dataset.v0DevEditing = "1"),
                e.addEventListener("click", Q, { capture: !0 }),
                e.addEventListener("focusout", en),
                e.addEventListener("input", ee),
                "BUTTON" === e.tagName && e.addEventListener("keydown", et)));
          },
          [Q, en, ee, et],
        ),
        eo = (0, r.useCallback)((e) => {
          let t = F(e);
          if (!t) return !1;
          let {
            source: n,
            targetElement: r,
            inlineEdit: l,
            className: o,
            relatedElements: s,
          } = t;
          if (
            r !== c.current?.element &&
            (r instanceof HTMLElement || r instanceof SVGElement)
          )
            return {
              ...z(r),
              source: n,
              inlineEdit: l,
              className: o,
              relatedElements: s,
            };
        }, []);
      return (
        (0, r.useEffect)(() => {
          if (!e) {
            (d(null),
              m((e) => (e && er(e.element), null)),
              (c.current = null),
              (f.current = null));
            return;
          }
          let t = (e) => {
              if ((W(!1), O.current.open)) return;
              let t = document
                .elementsFromPoint(e.clientX, e.clientY)
                .find((e) => !e.getAttribute("data-v0-devtool-overlay"));
              if (!t) return void d(null);
              if (w.current === t) return;
              w.current = t;
              let n = eo(t);
              !1 === n ? d(null) : void 0 !== n && (d(n), (c.current = n));
            },
            n = (e) => {
              if (O.current.open) return;
              let t = e.relatedTarget;
              (t && "HTML" !== t.nodeName) ||
                (d(null), (c.current = null), (w.current = null));
            },
            r = (e) => {
              if (!O.current.open) {
                if ("Escape" === e.key) {
                  let t = f.current;
                  t &&
                    (er(t.element),
                    y.current ? g(!1) : m(null),
                    e.preventDefault(),
                    e.stopPropagation());
                } else if ("Backspace" === e.key) {
                  if (y.current) return;
                  let e = f.current;
                  e && (g(!1), m(null), O.current.delete(e.source));
                } else if (D.has(e.key)) {
                  if (y.current) return;
                  let t = f.current;
                  if (!t) return;
                  e.preventDefault();
                  let n = t.element.getBoundingClientRect(),
                    r = n.left + n.width / 2,
                    l = n.top + n.height / 2,
                    o = 0,
                    s = 0;
                  switch (e.key) {
                    case "ArrowUp":
                      ((l = n.top), (s = -5));
                      break;
                    case "ArrowDown":
                      ((l = n.bottom), (s = 5));
                      break;
                    case "ArrowLeft":
                      ((r = n.left), (o = -5));
                      break;
                    case "ArrowRight":
                      ((r = n.right), (o = 5));
                  }
                  let i = window.innerWidth,
                    a = window.innerHeight,
                    u = new WeakMap();
                  for (
                    let e = 0;
                    e < 100 &&
                    ((r += o),
                    (l += s),
                    !(r < 0) && !(l < 0) && !(r > i) && !(l > a));
                    e++
                  ) {
                    let e = document.elementsFromPoint(r, l);
                    if (0 === e.length) continue;
                    let t = e[0];
                    if (
                      !(t instanceof HTMLElement) &&
                      !(t instanceof SVGElement)
                    )
                      continue;
                    let o = u.get(t);
                    if (
                      (o || ((o = t.getBoundingClientRect()), u.set(t, o)),
                      I(o, n))
                    )
                      continue;
                    let s = eo(t);
                    if (!s) break;
                    (d(null), (c.current = null), m(s), (f.current = s));
                    break;
                  }
                } else if ("Enter" === e.key) {
                  if (y.current) return;
                  let t = f.current;
                  if (!t) return;
                  if (t.inlineEdit) {
                    (g(!0), el(t.element), t.element.focus());
                    let n = document.createRange();
                    n.selectNodeContents(t.element);
                    let r = window.getSelection();
                    (r?.removeAllRanges(), r?.addRange(n), e.preventDefault());
                  }
                }
              }
            };
          (document.addEventListener("keydown", r),
            window.addEventListener("resize", q, { passive: !0 }),
            window.addEventListener("scroll", q, { passive: !0 }));
          let l = window.matchMedia("(hover:none)").matches;
          return (
            l
              ? document.addEventListener("pointerdown", t, { passive: !0 })
              : (document.addEventListener("pointermove", t, { passive: !0 }),
                window.addEventListener("mouseout", n, { passive: !0 })),
            () => {
              (document.removeEventListener("keydown", r),
                window.removeEventListener("resize", q),
                window.removeEventListener("scroll", q),
                l
                  ? document.removeEventListener("pointerdown", t)
                  : (document.removeEventListener("pointermove", t),
                    window.removeEventListener("mouseout", n)));
            }
          );
        }, [e, er, q, eo]),
        (0, r.useEffect)(() => {
          let t = (t) => {
            if (
              "KeyD" === t.code &&
              (t.altKey || t.metaKey) &&
              (!(
                t.target instanceof HTMLInputElement ||
                t.target instanceof HTMLTextAreaElement
              ) ||
                t.target.hasAttribute("data-v0-devtool-refinement"))
            )
              return (
                t.preventDefault(),
                (0, i.sendToParent)({ type: "devtools_state", enabled: !e }),
                !1
              );
          };
          return (
            window.addEventListener("keydown", t),
            () => {
              window.removeEventListener("keydown", t);
            }
          );
        }, [e]),
        (0, r.useEffect)(() => {
          let e = (e) => {
            let t = e.data;
            if (t && "object" == typeof t && t.__v0_remote__) {
              if ("devtools_deselect" === t.type) {
                let e = f.current;
                (e && (y.current && (g(!1), er(e.element)), m(null)),
                  d(null),
                  (0, i.sendToParent)({
                    type: "devtools_selected_state",
                    parts: null,
                    selected: !1,
                    info: v(document.documentElement, !0),
                    version: l,
                  }));
              } else if ("devtools_apply_theme" === t.type) {
                let e = t.payload?.theme,
                  n = document.documentElement;
                (n.classList.contains("dark")
                  ? n.classList.add("__v0-had-dark")
                  : n.classList.add("__v0-no-dark"),
                  "dark" !== e || n.classList.contains("dark")
                    ? "light" === e &&
                      n.classList.contains("dark") &&
                      n.classList.remove("dark")
                    : n.classList.add(e));
              } else if ("devtools_cleanup_theme" === t.type) {
                let e = document.documentElement,
                  t = e.classList.contains("__v0-had-dark"),
                  n = e.classList.contains("__v0-no-dark");
                (t && !e.classList.contains("dark")
                  ? e.classList.add("dark")
                  : n &&
                    e.classList.contains("dark") &&
                    e.classList.remove("dark"),
                  e.classList.remove("__v0-had-dark", "__v0-no-dark"));
              }
            }
          };
          return (
            window.addEventListener("message", e),
            () => window.removeEventListener("message", e)
          );
        }, [er, g, m, d, l]),
        (0, t.jsxs)(t.Fragment, {
          children: [
            o,
            e && b,
            e && !p && h,
            k &&
              (0, t.jsx)("style", {
                dangerouslySetInnerHTML: {
                  __html: "*{cursor:progress !important}body{opacity:.8}",
                },
              }),
            e && u
              ? (0, t.jsx)(T, {
                  ...u,
                  contentEditingElement: p ? u : null,
                  fileMapping: n,
                  locked: !0,
                  allowRefinement: !p,
                  contextMenuRef: O,
                  hide: H,
                })
              : null,
            e && a
              ? (0, t.jsx)(T, {
                  ...a,
                  contentEditingElement: p ? u : null,
                  hoverStyle: a.element !== u?.element,
                  locked: !1,
                  onClick: () => {
                    (u && er(u.element), p && g(!1), J(a));
                  },
                  onDoubleClick: () => {
                    K();
                  },
                  contextMenuRef: O,
                  hide: H,
                })
              : null,
            (0, t.jsx)(x, {
              onViewportChange: () => {
                X();
              },
            }),
          ],
        })
      );
    }
    function V(e) {
      if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in window) {
        let { renderers: t } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        for (let n of t.values())
          try {
            let t = n.findFiberByHostInstance(e);
            if (t) return t;
          } catch (e) {}
      }
      if ("_reactRootContainer" in e)
        return e._reactRootContainer._internalRoot.current.child;
      for (let t in e) if (t.startsWith("__reactFiber")) return e[t];
      return null;
    }
    function G(e, t) {
      if (!e) return null;
      e && t(e);
      let n = e.child;
      for (; n; ) (G(n, t), (n = n.sibling));
      return null;
    }
    function B(e) {
      if (!e) return null;
      for (; e.return; ) e = e.return;
      return e;
    }
    function A(e) {
      return e
        ? e.stateNode
          ? e.stateNode
          : e.child
            ? A(e.child)
            : null
        : null;
    }
    function F(e) {
      let t,
        n = (function e(t, n) {
          if (!t) return null;
          t.stateNode &&
            (t.stateNode instanceof HTMLElement ||
              t.stateNode instanceof SVGElement) &&
            (n = t.stateNode);
          let r = H(t);
          return r.memoizedProps?.__v0_s ? [r, n] : e(t.return, n);
        })(V(e));
      if (!n) return null;
      let r = n[0],
        l = $(r);
      if (!l) return null;
      let o = n[1],
        s = `${l.fileName}:${l.lineNumber}:${l.columnNumber}`;
      if (P.has(s)) t = P.get(s);
      else {
        let e = R || (R = B(r));
        ((t = new Set()),
          P.set(s, t),
          t.add(o),
          G(e, (e) => {
            let n = $(e);
            if (
              n &&
              n.fileName === l.fileName &&
              n.lineNumber === l.lineNumber &&
              n.columnNumber === l.columnNumber
            ) {
              let n = A(e);
              n && n.isConnected && t.add(n);
            }
          }));
      }
      let i = (function e(t, n) {
        if (!t) return null;
        n = t.stateNode || n;
        let r = H(t);
        if (r.memoizedProps?.__v0_i && r.memoizedProps?.__v0_s) {
          let e = r.memoizedProps.__v0_i,
            t = "string" == typeof e ? [e] : Array.isArray(e) ? e : null,
            o = n?.textContent,
            s = null;
          if ("string" == typeof o && t)
            for (let e of t) {
              var l;
              let [t, n, r, ...i] = e.split(":"),
                a = i.join(":").trim(),
                d = S[t],
                c =
                  "jsxText" === d
                    ? (((W =
                        W || document.createElement("textarea")).innerHTML = a),
                      W.value)
                    : "string" === d
                      ? a.slice(1, -1).replace(/\\n/g, "\n")
                      : a.slice(1, -1);
              if (
                ((l = (l = c).replace(/(?<!\\)\\(['"`$])/g, "$1").trim()),
                "jsxText" === d && (l = l.replace(/\n\s+/g, " ").trim()),
                (c = l),
                o.trim() === c)
              ) {
                s = [
                  t,
                  n,
                  r,
                  "jsxText" === d ? a.length : a.length - 2,
                  c,
                ].join(":");
                break;
              }
            }
          return [r, s];
        }
        return e(t.return, n);
      })(r, o);
      return {
        source: l,
        targetElement: o,
        inlineEdit: i && i[1] ? { source: $(i[0]), format: i[1] } : null,
        className: (function (e) {
          if (!e) return null;
          let t = H(e);
          return t.memoizedProps && t.memoizedProps.__v0_c
            ? {
                defined: !t.memoizedProps.__v0_m,
                parts: t.memoizedProps.__v0_c.map((e) => ({
                  lineNumber: Number(e[0]),
                  columnNumber: Number(e[1]),
                  value: e[2],
                })),
              }
            : null;
        })(r),
        relatedElements: t,
      };
    }
    function $(e) {
      return e &&
        e.memoizedProps &&
        e.memoizedProps.__v0_s &&
        e.memoizedProps.__v0_e
        ? { ...e.memoizedProps.__v0_s, ...e.memoizedProps.__v0_e }
        : null;
    }
    function H(e) {
      return e.alternate && e.alternate.actualStartTime > e.actualStartTime
        ? e.alternate
        : e;
    }
    let W = null;
    e.s(["DevToolsProvider", () => O, "Diamond", () => L], 807442);
  },
  717035,
  (e) => {
    "use strict";
    function t(e) {
      if ("string" == typeof e) return e;
      if (
        "number" == typeof e ||
        "boolean" == typeof e ||
        void 0 === e ||
        "symbol" == typeof e ||
        "bigint" == typeof e ||
        null === e
      )
        return String(e);
      if ("function" == typeof e) return e.toString();
      if (e instanceof Error)
        return e.stack
          ? e.stack
          : "function" == typeof e.toString
            ? e.toString()
            : e.message || String(e);
      if (e && "function" == typeof e.toString) return e.toString();
      if ("object" == typeof e)
        try {
          return JSON.stringify(e);
        } catch (e) {}
      return String(e);
    }
    function n(e, ...r) {
      if ("string" != typeof e)
        return 0 === r.length
          ? t(e)
          : [e, ...r].reduce((e, n) => (e ? e + " " : "") + t(n), "");
      let l = 0,
        o = e.replace(/%([sidfoOc])/g, (e, t) => {
          if (l >= r.length) return e;
          let n = r[l++];
          switch (t) {
            case "s":
              return String(n);
            case "i":
            case "d":
              return parseInt(n).toString();
            case "f":
              return parseFloat(n).toString();
            case "o":
            case "O":
              try {
                return JSON.stringify(n);
              } catch (e) {
                return String(n);
              }
            default:
              return e;
          }
        }),
        s = r.slice(l);
      return s.length > 0
        ? `${o} ${s
            .map((e) => {
              if ("object" == typeof e)
                try {
                  if (null !== e && "message" in e) return e.message;
                  return JSON.stringify(e);
                } catch (e) {}
              return String(e);
            })
            .join(" ")}`
        : o;
    }
    e.s(["formatConsoleMessage", () => n]);
  },
]);
