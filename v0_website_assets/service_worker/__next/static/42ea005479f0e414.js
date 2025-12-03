(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  277218,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(889655),
      n = e.i(867645),
      i = e.i(674180),
      o = e.i(436836),
      a = e.i(301224),
      s = "Avatar",
      [l, u] = (0, r.createContextScope)(s),
      [d, c] = l(s),
      f = t.forwardRef((e, r) => {
        let { __scopeAvatar: n, ...i } = e,
          [s, l] = t.useState("idle");
        return (0, a.jsx)(d, {
          scope: n,
          imageLoadingStatus: s,
          onImageLoadingStatusChange: l,
          children: (0, a.jsx)(o.Primitive.span, { ...i, ref: r }),
        });
      });
    f.displayName = s;
    var p = "AvatarImage",
      m = t.forwardRef((e, r) => {
        let {
            __scopeAvatar: s,
            src: l,
            onLoadingStatusChange: u = () => {},
            ...d
          } = e,
          f = c(p, s),
          m = (function (e) {
            let [r, n] = t.useState("idle");
            return (
              (0, i.useLayoutEffect)(() => {
                if (!e) return void n("error");
                let t = !0,
                  r = new window.Image(),
                  i = (e) => () => {
                    t && n(e);
                  };
                return (
                  n("loading"),
                  (r.onload = i("loaded")),
                  (r.onerror = i("error")),
                  (r.src = e),
                  () => {
                    t = !1;
                  }
                );
              }, [e]),
              r
            );
          })(l),
          v = (0, n.useCallbackRef)((e) => {
            (u(e), f.onImageLoadingStatusChange(e));
          });
        return (
          (0, i.useLayoutEffect)(() => {
            "idle" !== m && v(m);
          }, [m, v]),
          "loaded" === m
            ? (0, a.jsx)(o.Primitive.img, { ...d, ref: r, src: l })
            : null
        );
      });
    m.displayName = p;
    var v = "AvatarFallback",
      h = t.forwardRef((e, r) => {
        let { __scopeAvatar: n, delayMs: i, ...s } = e,
          l = c(v, n),
          [u, d] = t.useState(void 0 === i);
        return (
          t.useEffect(() => {
            if (void 0 !== i) {
              let e = window.setTimeout(() => d(!0), i);
              return () => window.clearTimeout(e);
            }
          }, [i]),
          u && "loaded" !== l.imageLoadingStatus
            ? (0, a.jsx)(o.Primitive.span, { ...s, ref: r })
            : null
        );
      });
    ((h.displayName = v),
      e.s([
        "Avatar",
        () => f,
        "AvatarFallback",
        () => h,
        "AvatarImage",
        () => m,
        "Fallback",
        () => h,
        "Image",
        () => m,
        "Root",
        () => f,
        "createAvatarScope",
        () => u,
      ]));
  },
  966864,
  (e) => {
    "use strict";
    var t = e.i(31217),
      r = e.i(789783),
      n = e.i(719271),
      i = e.i(987176),
      o = e.i(633182),
      a = e.i(504015),
      s = e.i(951676),
      l = e.i(28924),
      u = e.i(981611),
      d = e.i(623472),
      c = e.i(713416);
    let f = "Radio",
      [p, m] = (0, o.createContextScope)(f),
      [v, h] = p(f),
      g = (0, r.forwardRef)((e, o) => {
        let {
            __scopeRadio: s,
            name: l,
            checked: u = !1,
            required: d,
            disabled: c,
            value: f = "on",
            onCheck: p,
            ...m
          } = e,
          [h, g] = (0, r.useState)(null),
          y = (0, i.useComposedRefs)(o, (e) => g(e)),
          x = (0, r.useRef)(!1),
          R = !h || !!h.closest("form");
        return (0, r.createElement)(
          v,
          { scope: s, checked: u, disabled: c },
          (0, r.createElement)(
            a.Primitive.button,
            (0, t.default)(
              {
                type: "button",
                role: "radio",
                "aria-checked": u,
                "data-state": b(u),
                "data-disabled": c ? "" : void 0,
                disabled: c,
                value: f,
              },
              m,
              {
                ref: y,
                onClick: (0, n.composeEventHandlers)(e.onClick, (e) => {
                  (u || null == p || p(),
                    R &&
                      ((x.current = e.isPropagationStopped()),
                      x.current || e.stopPropagation()));
                }),
              },
            ),
          ),
          R &&
            (0, r.createElement)(w, {
              control: h,
              bubbles: !x.current,
              name: l,
              value: f,
              checked: u,
              required: d,
              disabled: c,
              style: { transform: "translateX(-100%)" },
            }),
        );
      }),
      y = (0, r.forwardRef)((e, n) => {
        let { __scopeRadio: i, forceMount: o, ...s } = e,
          l = h("RadioIndicator", i);
        return (0, r.createElement)(
          c.Presence,
          { present: o || l.checked },
          (0, r.createElement)(
            a.Primitive.span,
            (0, t.default)(
              {
                "data-state": b(l.checked),
                "data-disabled": l.disabled ? "" : void 0,
              },
              s,
              { ref: n },
            ),
          ),
        );
      }),
      w = (e) => {
        let n,
          { control: i, checked: o, bubbles: a = !0, ...s } = e,
          l = (0, r.useRef)(null),
          u =
            ((n = (0, r.useRef)({ value: o, previous: o })),
            (0, r.useMemo)(
              () => (
                n.current.value !== o &&
                  ((n.current.previous = n.current.value),
                  (n.current.value = o)),
                n.current.previous
              ),
              [o],
            )),
          c = (0, d.useSize)(i);
        return (
          (0, r.useEffect)(() => {
            let e = l.current,
              t = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "checked",
              ).set;
            if (u !== o && t) {
              let r = new Event("click", { bubbles: a });
              (t.call(e, o), e.dispatchEvent(r));
            }
          }, [u, o, a]),
          (0, r.createElement)(
            "input",
            (0, t.default)(
              { type: "radio", "aria-hidden": !0, defaultChecked: o },
              s,
              {
                tabIndex: -1,
                ref: l,
                style: {
                  ...e.style,
                  ...c,
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                },
              },
            ),
          )
        );
      };
    function b(e) {
      return e ? "checked" : "unchecked";
    }
    let x = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
      R = "RadioGroup",
      [C, E] = (0, o.createContextScope)(R, [s.createRovingFocusGroupScope, m]),
      N = (0, s.createRovingFocusGroupScope)(),
      P = m(),
      [S, j] = C(R),
      k = (0, r.forwardRef)((e, n) => {
        let {
            __scopeRadioGroup: i,
            name: o,
            defaultValue: d,
            value: c,
            required: f = !1,
            disabled: p = !1,
            orientation: m,
            dir: v,
            loop: h = !0,
            onValueChange: g,
            ...y
          } = e,
          w = N(i),
          b = (0, u.useDirection)(v),
          [x, R] = (0, l.useControllableState)({
            prop: c,
            defaultProp: d,
            onChange: g,
          });
        return (0, r.createElement)(
          S,
          {
            scope: i,
            name: o,
            required: f,
            disabled: p,
            value: x,
            onValueChange: R,
          },
          (0, r.createElement)(
            s.Root,
            (0, t.default)({ asChild: !0 }, w, {
              orientation: m,
              dir: b,
              loop: h,
            }),
            (0, r.createElement)(
              a.Primitive.div,
              (0, t.default)(
                {
                  role: "radiogroup",
                  "aria-required": f,
                  "aria-orientation": m,
                  "data-disabled": p ? "" : void 0,
                  dir: b,
                },
                y,
                { ref: n },
              ),
            ),
          ),
        );
      }),
      T = (0, r.forwardRef)((e, o) => {
        let { __scopeRadioGroup: a, disabled: l, ...u } = e,
          d = j("RadioGroupItem", a),
          c = d.disabled || l,
          f = N(a),
          p = P(a),
          m = (0, r.useRef)(null),
          v = (0, i.useComposedRefs)(o, m),
          h = d.value === u.value,
          y = (0, r.useRef)(!1);
        return (
          (0, r.useEffect)(() => {
            let e = (e) => {
                x.includes(e.key) && (y.current = !0);
              },
              t = () => (y.current = !1);
            return (
              document.addEventListener("keydown", e),
              document.addEventListener("keyup", t),
              () => {
                (document.removeEventListener("keydown", e),
                  document.removeEventListener("keyup", t));
              }
            );
          }, []),
          (0, r.createElement)(
            s.Item,
            (0, t.default)({ asChild: !0 }, f, { focusable: !c, active: h }),
            (0, r.createElement)(
              g,
              (0, t.default)(
                { disabled: c, required: d.required, checked: h },
                p,
                u,
                {
                  name: d.name,
                  ref: v,
                  onCheck: () => d.onValueChange(u.value),
                  onKeyDown: (0, n.composeEventHandlers)((e) => {
                    "Enter" === e.key && e.preventDefault();
                  }),
                  onFocus: (0, n.composeEventHandlers)(u.onFocus, () => {
                    var e;
                    y.current && (null == (e = m.current) || e.click());
                  }),
                },
              ),
            ),
          )
        );
      }),
      M = (0, r.forwardRef)((e, n) => {
        let { __scopeRadioGroup: i, ...o } = e,
          a = P(i);
        return (0, r.createElement)(y, (0, t.default)({}, a, o, { ref: n }));
      });
    e.s(["Indicator", () => M, "Item", () => T, "Root", () => k], 966864);
  },
  527069,
  (e) => {
    "use strict";
    function t(e, [t, r]) {
      return Math.min(r, Math.max(t, e));
    }
    e.s(["clamp", () => t]);
  },
  775453,
  273311,
  (e) => {
    "use strict";
    function t(e, r, { checkForDefaultPrevented: n = !0 } = {}) {
      return function (t) {
        if ((e?.(t), !1 === n || !t.defaultPrevented)) return r?.(t);
      };
    }
    e.s(["composeEventHandlers", () => t], 775453);
    var r = e.i(789783);
    e.i(301224);
    var n = r.createContext(void 0);
    function i(e) {
      let t = r.useContext(n);
      return e || t || "ltr";
    }
    e.s(["useDirection", () => i], 273311);
  },
  609297,
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
  610902,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(359687),
      n = e.i(221977),
      i = e.i(890446),
      o = e.i(301224);
    function a(e) {
      let a = e + "CollectionProvider",
        [s, l] = (0, r.createContextScope)(a),
        [u, d] = s(a, { collectionRef: { current: null }, itemMap: new Map() }),
        c = (e) => {
          let { scope: r, children: n } = e,
            i = t.default.useRef(null),
            a = t.default.useRef(new Map()).current;
          return (0, o.jsx)(u, {
            scope: r,
            itemMap: a,
            collectionRef: i,
            children: n,
          });
        };
      c.displayName = a;
      let f = e + "CollectionSlot",
        p = (0, i.createSlot)(f),
        m = t.default.forwardRef((e, t) => {
          let { scope: r, children: i } = e,
            a = d(f, r),
            s = (0, n.useComposedRefs)(t, a.collectionRef);
          return (0, o.jsx)(p, { ref: s, children: i });
        });
      m.displayName = f;
      let v = e + "CollectionItemSlot",
        h = "data-radix-collection-item",
        g = (0, i.createSlot)(v),
        y = t.default.forwardRef((e, r) => {
          let { scope: i, children: a, ...s } = e,
            l = t.default.useRef(null),
            u = (0, n.useComposedRefs)(r, l),
            c = d(v, i);
          return (
            t.default.useEffect(
              () => (
                c.itemMap.set(l, { ref: l, ...s }),
                () => void c.itemMap.delete(l)
              ),
            ),
            (0, o.jsx)(g, { ...{ [h]: "" }, ref: u, children: a })
          );
        });
      return (
        (y.displayName = v),
        [
          { Provider: c, Slot: m, ItemSlot: y },
          function (r) {
            let n = d(e + "CollectionConsumer", r);
            return t.default.useCallback(() => {
              let e = n.collectionRef.current;
              if (!e) return [];
              let t = Array.from(e.querySelectorAll(`[${h}]`));
              return Array.from(n.itemMap.values()).sort(
                (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
              );
            }, [n.collectionRef, n.itemMap]);
          },
          l,
        ]
      );
    }
    var s = new WeakMap();
    function l(e, t) {
      var r, n;
      let i, o, a;
      if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
      let s =
        ((r = e),
        (n = t),
        (i = r.length),
        (a = (o = u(n)) >= 0 ? o : i + o) < 0 || a >= i ? -1 : a);
      return -1 === s ? void 0 : e[s];
    }
    function u(e) {
      return e != e || 0 === e ? 0 : Math.trunc(e);
    }
    ((class e extends Map {
      #e;
      constructor(e) {
        (super(e), (this.#e = [...super.keys()]), s.set(this, !0));
      }
      set(e, t) {
        return (
          s.get(this) &&
            (this.has(e) ? (this.#e[this.#e.indexOf(e)] = e) : this.#e.push(e)),
          super.set(e, t),
          this
        );
      }
      insert(e, t, r) {
        let n,
          i = this.has(t),
          o = this.#e.length,
          a = u(e),
          s = a >= 0 ? a : o + a,
          l = s < 0 || s >= o ? -1 : s;
        if (l === this.size || (i && l === this.size - 1) || -1 === l)
          return (this.set(t, r), this);
        let d = this.size + +!i;
        a < 0 && s++;
        let c = [...this.#e],
          f = !1;
        for (let e = s; e < d; e++)
          if (s === e) {
            let o = c[e];
            (c[e] === t && (o = c[e + 1]),
              i && this.delete(t),
              (n = this.get(o)),
              this.set(t, r));
          } else {
            f || c[e - 1] !== t || (f = !0);
            let r = c[f ? e : e - 1],
              i = n;
            ((n = this.get(r)), this.delete(r), this.set(r, i));
          }
        return this;
      }
      with(t, r, n) {
        let i = new e(this);
        return (i.insert(t, r, n), i);
      }
      before(e) {
        let t = this.#e.indexOf(e) - 1;
        if (!(t < 0)) return this.entryAt(t);
      }
      setBefore(e, t, r) {
        let n = this.#e.indexOf(e);
        return -1 === n ? this : this.insert(n, t, r);
      }
      after(e) {
        let t = this.#e.indexOf(e);
        if (-1 !== (t = -1 === t || t === this.size - 1 ? -1 : t + 1))
          return this.entryAt(t);
      }
      setAfter(e, t, r) {
        let n = this.#e.indexOf(e);
        return -1 === n ? this : this.insert(n + 1, t, r);
      }
      first() {
        return this.entryAt(0);
      }
      last() {
        return this.entryAt(-1);
      }
      clear() {
        return ((this.#e = []), super.clear());
      }
      delete(e) {
        let t = super.delete(e);
        return (t && this.#e.splice(this.#e.indexOf(e), 1), t);
      }
      deleteAt(e) {
        let t = this.keyAt(e);
        return void 0 !== t && this.delete(t);
      }
      at(e) {
        let t = l(this.#e, e);
        if (void 0 !== t) return this.get(t);
      }
      entryAt(e) {
        let t = l(this.#e, e);
        if (void 0 !== t) return [t, this.get(t)];
      }
      indexOf(e) {
        return this.#e.indexOf(e);
      }
      keyAt(e) {
        return l(this.#e, e);
      }
      from(e, t) {
        let r = this.indexOf(e);
        if (-1 === r) return;
        let n = r + t;
        return (
          n < 0 && (n = 0),
          n >= this.size && (n = this.size - 1),
          this.at(n)
        );
      }
      keyFrom(e, t) {
        let r = this.indexOf(e);
        if (-1 === r) return;
        let n = r + t;
        return (
          n < 0 && (n = 0),
          n >= this.size && (n = this.size - 1),
          this.keyAt(n)
        );
      }
      find(e, t) {
        let r = 0;
        for (let n of this) {
          if (Reflect.apply(e, t, [n, r, this])) return n;
          r++;
        }
      }
      findIndex(e, t) {
        let r = 0;
        for (let n of this) {
          if (Reflect.apply(e, t, [n, r, this])) return r;
          r++;
        }
        return -1;
      }
      filter(t, r) {
        let n = [],
          i = 0;
        for (let e of this)
          (Reflect.apply(t, r, [e, i, this]) && n.push(e), i++);
        return new e(n);
      }
      map(t, r) {
        let n = [],
          i = 0;
        for (let e of this)
          (n.push([e[0], Reflect.apply(t, r, [e, i, this])]), i++);
        return new e(n);
      }
      reduce(...e) {
        let [t, r] = e,
          n = 0,
          i = r ?? this.at(0);
        for (let r of this)
          ((i =
            0 === n && 1 === e.length
              ? r
              : Reflect.apply(t, this, [i, r, n, this])),
            n++);
        return i;
      }
      reduceRight(...e) {
        let [t, r] = e,
          n = r ?? this.at(-1);
        for (let r = this.size - 1; r >= 0; r--) {
          let i = this.at(r);
          n =
            r === this.size - 1 && 1 === e.length
              ? i
              : Reflect.apply(t, this, [n, i, r, this]);
        }
        return n;
      }
      toSorted(t) {
        return new e([...this.entries()].sort(t));
      }
      toReversed() {
        let t = new e();
        for (let e = this.size - 1; e >= 0; e--) {
          let r = this.keyAt(e),
            n = this.get(r);
          t.set(r, n);
        }
        return t;
      }
      toSpliced(...t) {
        let r = [...this.entries()];
        return (r.splice(...t), new e(r));
      }
      slice(t, r) {
        let n = new e(),
          i = this.size - 1;
        if (void 0 === t) return n;
        (t < 0 && (t += this.size), void 0 !== r && r > 0 && (i = r - 1));
        for (let e = t; e <= i; e++) {
          let t = this.keyAt(e),
            r = this.get(t);
          n.set(t, r);
        }
        return n;
      }
      every(e, t) {
        let r = 0;
        for (let n of this) {
          if (!Reflect.apply(e, t, [n, r, this])) return !1;
          r++;
        }
        return !0;
      }
      some(e, t) {
        let r = 0;
        for (let n of this) {
          if (Reflect.apply(e, t, [n, r, this])) return !0;
          r++;
        }
        return !1;
      }
    }),
      e.s(["createCollection", () => a]));
  },
  454389,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(527069),
      n = e.i(775453),
      i = e.i(221977),
      o = e.i(359687),
      a = e.i(975946),
      s = e.i(273311),
      l = e.i(609297),
      u = e.i(274662),
      d = e.i(590285),
      c = e.i(610902),
      f = e.i(301224),
      p = ["PageUp", "PageDown"],
      m = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
      v = {
        "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
        "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
        "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
        "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
      },
      h = "Slider",
      [g, y, w] = (0, c.createCollection)(h),
      [b, x] = (0, o.createContextScope)(h, [w]),
      [R, C] = b(h),
      E = t.forwardRef((e, i) => {
        let {
            name: o,
            min: s = 0,
            max: l = 100,
            step: u = 1,
            orientation: d = "horizontal",
            disabled: c = !1,
            minStepsBetweenThumbs: v = 0,
            defaultValue: h = [s],
            value: y,
            onValueChange: w = () => {},
            onValueCommit: b = () => {},
            inverted: x = !1,
            form: C,
            ...E
          } = e,
          N = t.useRef(new Set()),
          P = t.useRef(0),
          k = "horizontal" === d,
          [T = [], M] = (0, a.useControllableState)({
            prop: y,
            defaultProp: h,
            onChange: (e) => {
              let t = [...N.current];
              (t[P.current]?.focus(), w(e));
            },
          }),
          D = t.useRef(T);
        function L(e, t, { commit: n } = { commit: !1 }) {
          let i,
            o = (String(u).split(".")[1] || "").length,
            a =
              Math.round(
                (Math.round((e - s) / u) * u + s) * (i = Math.pow(10, o)),
              ) / i,
            d = (0, r.clamp)(a, [s, l]);
          M((e = []) => {
            let r = (function (e = [], t, r) {
              let n = [...e];
              return ((n[r] = t), n.sort((e, t) => e - t));
            })(e, d, t);
            if (
              !(function (e, t) {
                if (t > 0)
                  return (
                    Math.min(...e.slice(0, -1).map((t, r) => e[r + 1] - t)) >= t
                  );
                return !0;
              })(r, v * u)
            )
              return e;
            {
              P.current = r.indexOf(d);
              let t = String(r) !== String(e);
              return (t && n && b(r), t ? r : e);
            }
          });
        }
        return (0, f.jsx)(R, {
          scope: e.__scopeSlider,
          name: o,
          disabled: c,
          min: s,
          max: l,
          valueIndexToChangeRef: P,
          thumbs: N.current,
          values: T,
          orientation: d,
          form: C,
          children: (0, f.jsx)(g.Provider, {
            scope: e.__scopeSlider,
            children: (0, f.jsx)(g.Slot, {
              scope: e.__scopeSlider,
              children: (0, f.jsx)(k ? S : j, {
                "aria-disabled": c,
                "data-disabled": c ? "" : void 0,
                ...E,
                ref: i,
                onPointerDown: (0, n.composeEventHandlers)(
                  E.onPointerDown,
                  () => {
                    c || (D.current = T);
                  },
                ),
                min: s,
                max: l,
                inverted: x,
                onSlideStart: c
                  ? void 0
                  : function (e) {
                      let t = (function (e, t) {
                        if (1 === e.length) return 0;
                        let r = e.map((e) => Math.abs(e - t)),
                          n = Math.min(...r);
                        return r.indexOf(n);
                      })(T, e);
                      L(e, t);
                    },
                onSlideMove: c
                  ? void 0
                  : function (e) {
                      L(e, P.current);
                    },
                onSlideEnd: c
                  ? void 0
                  : function () {
                      let e = D.current[P.current];
                      T[P.current] !== e && b(T);
                    },
                onHomeKeyDown: () => !c && L(s, 0, { commit: !0 }),
                onEndKeyDown: () => !c && L(l, T.length - 1, { commit: !0 }),
                onStepKeyDown: ({ event: e, direction: t }) => {
                  if (!c) {
                    let r =
                        p.includes(e.key) || (e.shiftKey && m.includes(e.key)),
                      n = P.current;
                    L(T[n] + u * (r ? 10 : 1) * t, n, { commit: !0 });
                  }
                },
              }),
            }),
          }),
        });
      });
    E.displayName = h;
    var [N, P] = b(h, {
        startEdge: "left",
        endEdge: "right",
        size: "width",
        direction: 1,
      }),
      S = t.forwardRef((e, r) => {
        let {
            min: n,
            max: o,
            dir: a,
            inverted: l,
            onSlideStart: u,
            onSlideMove: d,
            onSlideEnd: c,
            onStepKeyDown: p,
            ...m
          } = e,
          [h, g] = t.useState(null),
          y = (0, i.useComposedRefs)(r, (e) => g(e)),
          w = t.useRef(void 0),
          b = (0, s.useDirection)(a),
          x = "ltr" === b,
          R = (x && !l) || (!x && l);
        function C(e) {
          let t = w.current || h.getBoundingClientRect(),
            r = H([0, t.width], R ? [n, o] : [o, n]);
          return ((w.current = t), r(e - t.left));
        }
        return (0, f.jsx)(N, {
          scope: e.__scopeSlider,
          startEdge: R ? "left" : "right",
          endEdge: R ? "right" : "left",
          direction: R ? 1 : -1,
          size: "width",
          children: (0, f.jsx)(k, {
            dir: b,
            "data-orientation": "horizontal",
            ...m,
            ref: y,
            style: {
              ...m.style,
              "--radix-slider-thumb-transform": "translateX(-50%)",
            },
            onSlideStart: (e) => {
              let t = C(e.clientX);
              u?.(t);
            },
            onSlideMove: (e) => {
              let t = C(e.clientX);
              d?.(t);
            },
            onSlideEnd: () => {
              ((w.current = void 0), c?.());
            },
            onStepKeyDown: (e) => {
              let t = v[R ? "from-left" : "from-right"].includes(e.key);
              p?.({ event: e, direction: t ? -1 : 1 });
            },
          }),
        });
      }),
      j = t.forwardRef((e, r) => {
        let {
            min: n,
            max: o,
            inverted: a,
            onSlideStart: s,
            onSlideMove: l,
            onSlideEnd: u,
            onStepKeyDown: d,
            ...c
          } = e,
          p = t.useRef(null),
          m = (0, i.useComposedRefs)(r, p),
          h = t.useRef(void 0),
          g = !a;
        function y(e) {
          let t = h.current || p.current.getBoundingClientRect(),
            r = H([0, t.height], g ? [o, n] : [n, o]);
          return ((h.current = t), r(e - t.top));
        }
        return (0, f.jsx)(N, {
          scope: e.__scopeSlider,
          startEdge: g ? "bottom" : "top",
          endEdge: g ? "top" : "bottom",
          size: "height",
          direction: g ? 1 : -1,
          children: (0, f.jsx)(k, {
            "data-orientation": "vertical",
            ...c,
            ref: m,
            style: {
              ...c.style,
              "--radix-slider-thumb-transform": "translateY(50%)",
            },
            onSlideStart: (e) => {
              let t = y(e.clientY);
              s?.(t);
            },
            onSlideMove: (e) => {
              let t = y(e.clientY);
              l?.(t);
            },
            onSlideEnd: () => {
              ((h.current = void 0), u?.());
            },
            onStepKeyDown: (e) => {
              let t = v[g ? "from-bottom" : "from-top"].includes(e.key);
              d?.({ event: e, direction: t ? -1 : 1 });
            },
          }),
        });
      }),
      k = t.forwardRef((e, t) => {
        let {
            __scopeSlider: r,
            onSlideStart: i,
            onSlideMove: o,
            onSlideEnd: a,
            onHomeKeyDown: s,
            onEndKeyDown: l,
            onStepKeyDown: u,
            ...c
          } = e,
          v = C(h, r);
        return (0, f.jsx)(d.Primitive.span, {
          ...c,
          ref: t,
          onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, (e) => {
            "Home" === e.key
              ? (s(e), e.preventDefault())
              : "End" === e.key
                ? (l(e), e.preventDefault())
                : p.concat(m).includes(e.key) && (u(e), e.preventDefault());
          }),
          onPointerDown: (0, n.composeEventHandlers)(e.onPointerDown, (e) => {
            let t = e.target;
            (t.setPointerCapture(e.pointerId),
              e.preventDefault(),
              v.thumbs.has(t) ? t.focus() : i(e));
          }),
          onPointerMove: (0, n.composeEventHandlers)(e.onPointerMove, (e) => {
            e.target.hasPointerCapture(e.pointerId) && o(e);
          }),
          onPointerUp: (0, n.composeEventHandlers)(e.onPointerUp, (e) => {
            let t = e.target;
            t.hasPointerCapture(e.pointerId) &&
              (t.releasePointerCapture(e.pointerId), a(e));
          }),
        });
      }),
      T = "SliderTrack",
      M = t.forwardRef((e, t) => {
        let { __scopeSlider: r, ...n } = e,
          i = C(T, r);
        return (0, f.jsx)(d.Primitive.span, {
          "data-disabled": i.disabled ? "" : void 0,
          "data-orientation": i.orientation,
          ...n,
          ref: t,
        });
      });
    M.displayName = T;
    var D = "SliderRange",
      L = t.forwardRef((e, r) => {
        let { __scopeSlider: n, ...o } = e,
          a = C(D, n),
          s = P(D, n),
          l = t.useRef(null),
          u = (0, i.useComposedRefs)(r, l),
          c = a.values.length,
          p = a.values.map((e) => _(e, a.min, a.max)),
          m = c > 1 ? Math.min(...p) : 0,
          v = 100 - Math.max(...p);
        return (0, f.jsx)(d.Primitive.span, {
          "data-orientation": a.orientation,
          "data-disabled": a.disabled ? "" : void 0,
          ...o,
          ref: u,
          style: { ...e.style, [s.startEdge]: m + "%", [s.endEdge]: v + "%" },
        });
      });
    L.displayName = D;
    var O = "SliderThumb",
      A = t.forwardRef((e, r) => {
        let n = y(e.__scopeSlider),
          [o, a] = t.useState(null),
          s = (0, i.useComposedRefs)(r, (e) => a(e)),
          l = t.useMemo(
            () => (o ? n().findIndex((e) => e.ref.current === o) : -1),
            [n, o],
          );
        return (0, f.jsx)(I, { ...e, ref: s, index: l });
      }),
      I = t.forwardRef((e, r) => {
        var o, a, s, l, c;
        let p,
          m,
          { __scopeSlider: v, index: h, name: y, ...w } = e,
          b = C(O, v),
          x = P(O, v),
          [R, E] = t.useState(null),
          N = (0, i.useComposedRefs)(r, (e) => E(e)),
          S = !R || b.form || !!R.closest("form"),
          j = (0, u.useSize)(R),
          k = b.values[h],
          T = void 0 === k ? 0 : _(k, b.min, b.max),
          M =
            ((o = h),
            (a = b.values.length) > 2
              ? `Value ${o + 1} of ${a}`
              : 2 === a
                ? ["Minimum", "Maximum"][o]
                : void 0),
          D = j?.[x.size],
          L = D
            ? ((s = D),
              (l = T),
              (c = x.direction),
              (m = H([0, 50], [0, (p = s / 2)])),
              (p - m(l) * c) * c)
            : 0;
        return (
          t.useEffect(() => {
            if (R)
              return (
                b.thumbs.add(R),
                () => {
                  b.thumbs.delete(R);
                }
              );
          }, [R, b.thumbs]),
          (0, f.jsxs)("span", {
            style: {
              transform: "var(--radix-slider-thumb-transform)",
              position: "absolute",
              [x.startEdge]: `calc(${T}% + ${L}px)`,
            },
            children: [
              (0, f.jsx)(g.ItemSlot, {
                scope: e.__scopeSlider,
                children: (0, f.jsx)(d.Primitive.span, {
                  role: "slider",
                  "aria-label": e["aria-label"] || M,
                  "aria-valuemin": b.min,
                  "aria-valuenow": k,
                  "aria-valuemax": b.max,
                  "aria-orientation": b.orientation,
                  "data-orientation": b.orientation,
                  "data-disabled": b.disabled ? "" : void 0,
                  tabIndex: b.disabled ? void 0 : 0,
                  ...w,
                  ref: N,
                  style: void 0 === k ? { display: "none" } : e.style,
                  onFocus: (0, n.composeEventHandlers)(e.onFocus, () => {
                    b.valueIndexToChangeRef.current = h;
                  }),
                }),
              }),
              S &&
                (0, f.jsx)(
                  F,
                  {
                    name:
                      y ??
                      (b.name
                        ? b.name + (b.values.length > 1 ? "[]" : "")
                        : void 0),
                    form: b.form,
                    value: k,
                  },
                  h,
                ),
            ],
          })
        );
      });
    A.displayName = O;
    var F = t.forwardRef(({ __scopeSlider: e, value: r, ...n }, o) => {
      let a = t.useRef(null),
        s = (0, i.useComposedRefs)(a, o),
        u = (0, l.usePrevious)(r);
      return (
        t.useEffect(() => {
          let e = a.current;
          if (!e) return;
          let t = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          ).set;
          if (u !== r && t) {
            let n = new Event("input", { bubbles: !0 });
            (t.call(e, r), e.dispatchEvent(n));
          }
        }, [u, r]),
        (0, f.jsx)(d.Primitive.input, {
          style: { display: "none" },
          ...n,
          ref: s,
          defaultValue: r,
        })
      );
    });
    function _(e, t, n) {
      return (0, r.clamp)((100 / (n - t)) * (e - t), [0, 100]);
    }
    function H(e, t) {
      return (r) => {
        if (e[0] === e[1] || t[0] === t[1]) return t[0];
        let n = (t[1] - t[0]) / (e[1] - e[0]);
        return t[0] + n * (r - e[0]);
      };
    }
    ((F.displayName = "RadioBubbleInput"),
      e.s([
        "Range",
        () => L,
        "Root",
        () => E,
        "Slider",
        () => E,
        "SliderRange",
        () => L,
        "SliderThumb",
        () => A,
        "SliderTrack",
        () => M,
        "Thumb",
        () => A,
        "Track",
        () => M,
        "createSliderScope",
        () => x,
      ]));
  },
  461884,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(436836),
      n = e.i(301224),
      i = t.forwardRef((e, t) =>
        (0, n.jsx)(r.Primitive.label, {
          ...e,
          ref: t,
          onMouseDown: (t) => {
            t.target.closest("button, input, select, textarea") ||
              (e.onMouseDown?.(t),
              !t.defaultPrevented && t.detail > 1 && t.preventDefault());
          },
        }),
      );
    ((i.displayName = "Label"), e.s(["Label", () => i, "Root", () => i]));
  },
  473941,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(221977),
      n = e.i(736542),
      i = (e) => {
        var i;
        let a,
          s,
          { present: l, children: u } = e,
          d = (function (e) {
            var r, i;
            let [a, s] = t.useState(),
              l = t.useRef(null),
              u = t.useRef(e),
              d = t.useRef("none"),
              [c, f] =
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
                let e = o(l.current);
                d.current = "mounted" === c ? e : "none";
              }, [c]),
              (0, n.useLayoutEffect)(() => {
                let t = l.current,
                  r = u.current;
                if (r !== e) {
                  let n = d.current,
                    i = o(t);
                  (e
                    ? f("MOUNT")
                    : "none" === i || t?.display === "none"
                      ? f("UNMOUNT")
                      : r && n !== i
                        ? f("ANIMATION_OUT")
                        : f("UNMOUNT"),
                    (u.current = e));
                }
              }, [e, f]),
              (0, n.useLayoutEffect)(() => {
                if (a) {
                  let e,
                    t = a.ownerDocument.defaultView ?? window,
                    r = (r) => {
                      let n = o(l.current).includes(r.animationName);
                      if (
                        r.target === a &&
                        n &&
                        (f("ANIMATION_END"), !u.current)
                      ) {
                        let r = a.style.animationFillMode;
                        ((a.style.animationFillMode = "forwards"),
                          (e = t.setTimeout(() => {
                            "forwards" === a.style.animationFillMode &&
                              (a.style.animationFillMode = r);
                          })));
                      }
                    },
                    n = (e) => {
                      e.target === a && (d.current = o(l.current));
                    };
                  return (
                    a.addEventListener("animationstart", n),
                    a.addEventListener("animationcancel", r),
                    a.addEventListener("animationend", r),
                    () => {
                      (t.clearTimeout(e),
                        a.removeEventListener("animationstart", n),
                        a.removeEventListener("animationcancel", r),
                        a.removeEventListener("animationend", r));
                    }
                  );
                }
                f("ANIMATION_END");
              }, [a, f]),
              {
                isPresent: ["mounted", "unmountSuspended"].includes(c),
                ref: t.useCallback((e) => {
                  ((l.current = e ? getComputedStyle(e) : null), s(e));
                }, []),
              }
            );
          })(l),
          c =
            "function" == typeof u
              ? u({ present: d.isPresent })
              : t.Children.only(u),
          f = (0, r.useComposedRefs)(
            d.ref,
            ((i = c),
            (s =
              (a = Object.getOwnPropertyDescriptor(i.props, "ref")?.get) &&
              "isReactWarning" in a &&
              a.isReactWarning)
              ? i.ref
              : (s =
                    (a = Object.getOwnPropertyDescriptor(i, "ref")?.get) &&
                    "isReactWarning" in a &&
                    a.isReactWarning)
                ? i.props.ref
                : i.props.ref || i.ref),
          );
        return "function" == typeof u || d.isPresent
          ? t.cloneElement(c, { ref: f })
          : null;
      };
    function o(e) {
      return e?.animationName || "none";
    }
    ((i.displayName = "Presence"), e.s(["Presence", () => i]));
  },
  552455,
  (e) => {
    "use strict";
    var t,
      r = e.i(789783),
      n = e.i(775453),
      i = e.i(590285),
      o = e.i(221977),
      a = e.i(733174),
      s = e.i(268024),
      l = e.i(301224),
      u = "dismissableLayer.update",
      d = r.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      c = r.forwardRef((e, c) => {
        let {
            disableOutsidePointerEvents: m = !1,
            onEscapeKeyDown: v,
            onPointerDownOutside: h,
            onFocusOutside: g,
            onInteractOutside: y,
            onDismiss: w,
            ...b
          } = e,
          x = r.useContext(d),
          [R, C] = r.useState(null),
          E = R?.ownerDocument ?? globalThis?.document,
          [, N] = r.useState({}),
          P = (0, o.useComposedRefs)(c, (e) => C(e)),
          S = Array.from(x.layers),
          [j] = [...x.layersWithOutsidePointerEventsDisabled].slice(-1),
          k = S.indexOf(j),
          T = R ? S.indexOf(R) : -1,
          M = x.layersWithOutsidePointerEventsDisabled.size > 0,
          D = T >= k,
          L = (function (e, t = globalThis?.document) {
            let n = (0, a.useCallbackRef)(e),
              i = r.useRef(!1),
              o = r.useRef(() => {});
            return (
              r.useEffect(() => {
                let e = (e) => {
                    if (e.target && !i.current) {
                      let r = function () {
                          p("dismissableLayer.pointerDownOutside", n, i, {
                            discrete: !0,
                          });
                        },
                        i = { originalEvent: e };
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", o.current),
                          (o.current = r),
                          t.addEventListener("click", o.current, { once: !0 }))
                        : r();
                    } else t.removeEventListener("click", o.current);
                    i.current = !1;
                  },
                  r = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(r),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", o.current));
                };
              }, [t, n]),
              { onPointerDownCapture: () => (i.current = !0) }
            );
          })((e) => {
            let t = e.target,
              r = [...x.branches].some((e) => e.contains(t));
            D && !r && (h?.(e), y?.(e), e.defaultPrevented || w?.());
          }, E),
          O = (function (e, t = globalThis?.document) {
            let n = (0, a.useCallbackRef)(e),
              i = r.useRef(!1);
            return (
              r.useEffect(() => {
                let e = (e) => {
                  e.target &&
                    !i.current &&
                    p(
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
                onFocusCapture: () => (i.current = !0),
                onBlurCapture: () => (i.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...x.branches].some((e) => e.contains(t)) &&
              (g?.(e), y?.(e), e.defaultPrevented || w?.());
          }, E);
        return (
          (0, s.useEscapeKeydown)((e) => {
            T === x.layers.size - 1 &&
              (v?.(e), !e.defaultPrevented && w && (e.preventDefault(), w()));
          }, E),
          r.useEffect(() => {
            if (R)
              return (
                m &&
                  (0 === x.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = E.body.style.pointerEvents),
                    (E.body.style.pointerEvents = "none")),
                  x.layersWithOutsidePointerEventsDisabled.add(R)),
                x.layers.add(R),
                f(),
                () => {
                  m &&
                    1 === x.layersWithOutsidePointerEventsDisabled.size &&
                    (E.body.style.pointerEvents = t);
                }
              );
          }, [R, E, m, x]),
          r.useEffect(
            () => () => {
              R &&
                (x.layers.delete(R),
                x.layersWithOutsidePointerEventsDisabled.delete(R),
                f());
            },
            [R, x],
          ),
          r.useEffect(() => {
            let e = () => N({});
            return (
              document.addEventListener(u, e),
              () => document.removeEventListener(u, e)
            );
          }, []),
          (0, l.jsx)(i.Primitive.div, {
            ...b,
            ref: P,
            style: {
              pointerEvents: M ? (D ? "auto" : "none") : void 0,
              ...e.style,
            },
            onFocusCapture: (0, n.composeEventHandlers)(
              e.onFocusCapture,
              O.onFocusCapture,
            ),
            onBlurCapture: (0, n.composeEventHandlers)(
              e.onBlurCapture,
              O.onBlurCapture,
            ),
            onPointerDownCapture: (0, n.composeEventHandlers)(
              e.onPointerDownCapture,
              L.onPointerDownCapture,
            ),
          })
        );
      });
    function f() {
      let e = new CustomEvent(u);
      document.dispatchEvent(e);
    }
    function p(e, t, r, { discrete: n }) {
      let o = r.originalEvent.target,
        a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
      (t && o.addEventListener(e, t, { once: !0 }),
        n ? (0, i.dispatchDiscreteCustomEvent)(o, a) : o.dispatchEvent(a));
    }
    ((c.displayName = "DismissableLayer"),
      (r.forwardRef((e, t) => {
        let n = r.useContext(d),
          a = r.useRef(null),
          s = (0, o.useComposedRefs)(t, a);
        return (
          r.useEffect(() => {
            let e = a.current;
            if (e)
              return (
                n.branches.add(e),
                () => {
                  n.branches.delete(e);
                }
              );
          }, [n.branches]),
          (0, l.jsx)(i.Primitive.div, { ...e, ref: s })
        );
      }).displayName = "DismissableLayerBranch"),
      e.s(["DismissableLayer", () => c]));
  },
  716580,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(546564),
      n = e.i(359687),
      i = e.i(775453),
      o = e.i(590285),
      a = e.i(975946),
      s = e.i(221977),
      l = e.i(273311),
      u = e.i(473941),
      d = e.i(871598),
      c = e.i(610902),
      f = e.i(552455),
      p = e.i(609297),
      m = e.i(736542),
      v = e.i(733174),
      h = e.i(62535),
      g = e.i(301224),
      y = "NavigationMenu",
      [w, b, x] = (0, c.createCollection)(y),
      [R, C, E] = (0, c.createCollection)(y),
      [N, P] = (0, n.createContextScope)(y, [x, E]),
      [S, j] = N(y),
      [k, T] = N(y),
      M = t.forwardRef((e, r) => {
        let {
            __scopeNavigationMenu: n,
            value: i,
            onValueChange: u,
            defaultValue: d,
            delayDuration: c = 200,
            skipDelayDuration: f = 300,
            orientation: p = "horizontal",
            dir: m,
            ...v
          } = e,
          [h, w] = t.useState(null),
          b = (0, s.useComposedRefs)(r, (e) => w(e)),
          x = (0, l.useDirection)(m),
          R = t.useRef(0),
          C = t.useRef(0),
          E = t.useRef(0),
          [N, P] = t.useState(!0),
          [S, j] = (0, a.useControllableState)({
            prop: i,
            onChange: (e) => {
              let t = f > 0;
              ("" !== e
                ? (window.clearTimeout(E.current), t && P(!1))
                : (window.clearTimeout(E.current),
                  (E.current = window.setTimeout(() => P(!0), f))),
                u?.(e));
            },
            defaultProp: d ?? "",
            caller: y,
          }),
          k = t.useCallback(() => {
            (window.clearTimeout(C.current),
              (C.current = window.setTimeout(() => j(""), 150)));
          }, [j]),
          T = t.useCallback(
            (e) => {
              (window.clearTimeout(C.current), j(e));
            },
            [j],
          ),
          M = t.useCallback(
            (e) => {
              S === e
                ? window.clearTimeout(C.current)
                : (R.current = window.setTimeout(() => {
                    (window.clearTimeout(C.current), j(e));
                  }, c));
            },
            [S, j, c],
          );
        return (
          t.useEffect(
            () => () => {
              (window.clearTimeout(R.current),
                window.clearTimeout(C.current),
                window.clearTimeout(E.current));
            },
            [],
          ),
          (0, g.jsx)(O, {
            scope: n,
            isRootMenu: !0,
            value: S,
            dir: x,
            orientation: p,
            rootNavigationMenu: h,
            onTriggerEnter: (e) => {
              (window.clearTimeout(R.current), N ? M(e) : T(e));
            },
            onTriggerLeave: () => {
              (window.clearTimeout(R.current), k());
            },
            onContentEnter: () => window.clearTimeout(C.current),
            onContentLeave: k,
            onItemSelect: (e) => {
              j((t) => (t === e ? "" : e));
            },
            onItemDismiss: () => j(""),
            children: (0, g.jsx)(o.Primitive.nav, {
              "aria-label": "Main",
              "data-orientation": p,
              dir: x,
              ...v,
              ref: b,
            }),
          })
        );
      });
    M.displayName = y;
    var D = "NavigationMenuSub",
      L = t.forwardRef((e, t) => {
        let {
            __scopeNavigationMenu: r,
            value: n,
            onValueChange: i,
            defaultValue: s,
            orientation: l = "horizontal",
            ...u
          } = e,
          d = j(D, r),
          [c, f] = (0, a.useControllableState)({
            prop: n,
            onChange: i,
            defaultProp: s ?? "",
            caller: D,
          });
        return (0, g.jsx)(O, {
          scope: r,
          isRootMenu: !1,
          value: c,
          dir: d.dir,
          orientation: l,
          rootNavigationMenu: d.rootNavigationMenu,
          onTriggerEnter: (e) => f(e),
          onItemSelect: (e) => f(e),
          onItemDismiss: () => f(""),
          children: (0, g.jsx)(o.Primitive.div, {
            "data-orientation": l,
            ...u,
            ref: t,
          }),
        });
      });
    L.displayName = D;
    var O = (e) => {
        let {
            scope: r,
            isRootMenu: n,
            rootNavigationMenu: i,
            dir: o,
            orientation: a,
            children: s,
            value: l,
            onItemSelect: u,
            onItemDismiss: c,
            onTriggerEnter: f,
            onTriggerLeave: m,
            onContentEnter: h,
            onContentLeave: y,
          } = e,
          [b, x] = t.useState(null),
          [R, C] = t.useState(new Map()),
          [E, N] = t.useState(null);
        return (0, g.jsx)(S, {
          scope: r,
          isRootMenu: n,
          rootNavigationMenu: i,
          value: l,
          previousValue: (0, p.usePrevious)(l),
          baseId: (0, d.useId)(),
          dir: o,
          orientation: a,
          viewport: b,
          onViewportChange: x,
          indicatorTrack: E,
          onIndicatorTrackChange: N,
          onTriggerEnter: (0, v.useCallbackRef)(f),
          onTriggerLeave: (0, v.useCallbackRef)(m),
          onContentEnter: (0, v.useCallbackRef)(h),
          onContentLeave: (0, v.useCallbackRef)(y),
          onItemSelect: (0, v.useCallbackRef)(u),
          onItemDismiss: (0, v.useCallbackRef)(c),
          onViewportContentChange: t.useCallback((e, t) => {
            C((r) => (r.set(e, t), new Map(r)));
          }, []),
          onViewportContentRemove: t.useCallback((e) => {
            C((t) => (t.has(e) ? (t.delete(e), new Map(t)) : t));
          }, []),
          children: (0, g.jsx)(w.Provider, {
            scope: r,
            children: (0, g.jsx)(k, { scope: r, items: R, children: s }),
          }),
        });
      },
      A = "NavigationMenuList",
      I = t.forwardRef((e, t) => {
        let { __scopeNavigationMenu: r, ...n } = e,
          i = j(A, r),
          a = (0, g.jsx)(o.Primitive.ul, {
            "data-orientation": i.orientation,
            ...n,
            ref: t,
          });
        return (0, g.jsx)(o.Primitive.div, {
          style: { position: "relative" },
          ref: i.onIndicatorTrackChange,
          children: (0, g.jsx)(w.Slot, {
            scope: r,
            children: i.isRootMenu
              ? (0, g.jsx)(er, { asChild: !0, children: a })
              : a,
          }),
        });
      });
    I.displayName = A;
    var F = "NavigationMenuItem",
      [_, H] = N(F),
      z = t.forwardRef((e, r) => {
        let { __scopeNavigationMenu: n, value: i, ...a } = e,
          s = (0, d.useId)(),
          l = t.useRef(null),
          u = t.useRef(null),
          c = t.useRef(null),
          f = t.useRef(() => {}),
          p = t.useRef(!1),
          m = t.useCallback((e = "start") => {
            if (l.current) {
              f.current();
              let t = eo(l.current);
              t.length && ea("start" === e ? t : t.reverse());
            }
          }, []),
          v = t.useCallback(() => {
            if (l.current) {
              var e;
              let t = eo(l.current);
              t.length &&
                ((e = t).forEach((e) => {
                  ((e.dataset.tabindex = e.getAttribute("tabindex") || ""),
                    e.setAttribute("tabindex", "-1"));
                }),
                (f.current = () => {
                  e.forEach((e) => {
                    let t = e.dataset.tabindex;
                    e.setAttribute("tabindex", t);
                  });
                }));
            }
          }, []);
        return (0, g.jsx)(_, {
          scope: n,
          value: i || s || "LEGACY_REACT_AUTO_VALUE",
          triggerRef: u,
          contentRef: l,
          focusProxyRef: c,
          wasEscapeCloseRef: p,
          onEntryKeyDown: m,
          onFocusProxyEnter: m,
          onRootContentClose: v,
          onContentFocusOutside: v,
          children: (0, g.jsx)(o.Primitive.li, { ...a, ref: r }),
        });
      });
    z.displayName = F;
    var $ = "NavigationMenuTrigger",
      U = t.forwardRef((e, r) => {
        let { __scopeNavigationMenu: n, disabled: a, ...l } = e,
          u = j($, e.__scopeNavigationMenu),
          d = H($, e.__scopeNavigationMenu),
          c = t.useRef(null),
          f = (0, s.useComposedRefs)(c, d.triggerRef, r),
          p = eu(u.baseId, d.value),
          m = ed(u.baseId, d.value),
          v = t.useRef(!1),
          y = t.useRef(!1),
          b = d.value === u.value;
        return (0, g.jsxs)(g.Fragment, {
          children: [
            (0, g.jsx)(w.ItemSlot, {
              scope: n,
              value: d.value,
              children: (0, g.jsx)(ei, {
                asChild: !0,
                children: (0, g.jsx)(o.Primitive.button, {
                  id: p,
                  disabled: a,
                  "data-disabled": a ? "" : void 0,
                  "data-state": el(b),
                  "aria-expanded": b,
                  "aria-controls": m,
                  ...l,
                  ref: f,
                  onPointerEnter: (0, i.composeEventHandlers)(
                    e.onPointerEnter,
                    () => {
                      ((y.current = !1), (d.wasEscapeCloseRef.current = !1));
                    },
                  ),
                  onPointerMove: (0, i.composeEventHandlers)(
                    e.onPointerMove,
                    ec(() => {
                      a ||
                        y.current ||
                        d.wasEscapeCloseRef.current ||
                        v.current ||
                        (u.onTriggerEnter(d.value), (v.current = !0));
                    }),
                  ),
                  onPointerLeave: (0, i.composeEventHandlers)(
                    e.onPointerLeave,
                    ec(() => {
                      a || (u.onTriggerLeave(), (v.current = !1));
                    }),
                  ),
                  onClick: (0, i.composeEventHandlers)(e.onClick, () => {
                    (u.onItemSelect(d.value), (y.current = b));
                  }),
                  onKeyDown: (0, i.composeEventHandlers)(e.onKeyDown, (e) => {
                    let t = {
                      horizontal: "ArrowDown",
                      vertical: "rtl" === u.dir ? "ArrowLeft" : "ArrowRight",
                    }[u.orientation];
                    b &&
                      e.key === t &&
                      (d.onEntryKeyDown(), e.preventDefault());
                  }),
                }),
              }),
            }),
            b &&
              (0, g.jsxs)(g.Fragment, {
                children: [
                  (0, g.jsx)(h.Root, {
                    "aria-hidden": !0,
                    tabIndex: 0,
                    ref: d.focusProxyRef,
                    onFocus: (e) => {
                      let t = d.contentRef.current,
                        r = e.relatedTarget,
                        n = r === c.current,
                        i = t?.contains(r);
                      (n || !i) && d.onFocusProxyEnter(n ? "start" : "end");
                    },
                  }),
                  u.viewport && (0, g.jsx)("span", { "aria-owns": m }),
                ],
              }),
          ],
        });
      });
    U.displayName = $;
    var W = "navigationMenu.linkSelect",
      K = t.forwardRef((e, t) => {
        let { __scopeNavigationMenu: r, active: n, onSelect: a, ...s } = e;
        return (0, g.jsx)(ei, {
          asChild: !0,
          children: (0, g.jsx)(o.Primitive.a, {
            "data-active": n ? "" : void 0,
            "aria-current": n ? "page" : void 0,
            ...s,
            ref: t,
            onClick: (0, i.composeEventHandlers)(
              e.onClick,
              (e) => {
                let t = e.target,
                  r = new CustomEvent(W, { bubbles: !0, cancelable: !0 });
                if (
                  (t.addEventListener(W, (e) => a?.(e), { once: !0 }),
                  (0, o.dispatchDiscreteCustomEvent)(t, r),
                  !r.defaultPrevented && !e.metaKey)
                ) {
                  let e = new CustomEvent(Z, { bubbles: !0, cancelable: !0 });
                  (0, o.dispatchDiscreteCustomEvent)(t, e);
                }
              },
              { checkForDefaultPrevented: !1 },
            ),
          }),
        });
      });
    K.displayName = "NavigationMenuLink";
    var V = "NavigationMenuIndicator",
      B = t.forwardRef((e, t) => {
        let { forceMount: n, ...i } = e,
          o = j(V, e.__scopeNavigationMenu),
          a = !!o.value;
        return o.indicatorTrack
          ? r.default.createPortal(
              (0, g.jsx)(u.Presence, {
                present: n || a,
                children: (0, g.jsx)(G, { ...i, ref: t }),
              }),
              o.indicatorTrack,
            )
          : null;
      });
    B.displayName = V;
    var G = t.forwardRef((e, r) => {
        let { __scopeNavigationMenu: n, ...i } = e,
          a = j(V, n),
          s = b(n),
          [l, u] = t.useState(null),
          [d, c] = t.useState(null),
          f = "horizontal" === a.orientation,
          p = !!a.value;
        t.useEffect(() => {
          let e = s(),
            t = e.find((e) => e.value === a.value)?.ref.current;
          t && u(t);
        }, [s, a.value]);
        let m = () => {
          l &&
            c({
              size: f ? l.offsetWidth : l.offsetHeight,
              offset: f ? l.offsetLeft : l.offsetTop,
            });
        };
        return (
          es(l, m),
          es(a.indicatorTrack, m),
          d
            ? (0, g.jsx)(o.Primitive.div, {
                "aria-hidden": !0,
                "data-state": p ? "visible" : "hidden",
                "data-orientation": a.orientation,
                ...i,
                ref: r,
                style: {
                  position: "absolute",
                  ...(f
                    ? {
                        left: 0,
                        width: d.size + "px",
                        transform: `translateX(${d.offset}px)`,
                      }
                    : {
                        top: 0,
                        height: d.size + "px",
                        transform: `translateY(${d.offset}px)`,
                      }),
                  ...i.style,
                },
              })
            : null
        );
      }),
      q = "NavigationMenuContent",
      X = t.forwardRef((e, t) => {
        let { forceMount: r, ...n } = e,
          o = j(q, e.__scopeNavigationMenu),
          a = H(q, e.__scopeNavigationMenu),
          l = (0, s.useComposedRefs)(a.contentRef, t),
          d = a.value === o.value,
          c = {
            value: a.value,
            triggerRef: a.triggerRef,
            focusProxyRef: a.focusProxyRef,
            wasEscapeCloseRef: a.wasEscapeCloseRef,
            onContentFocusOutside: a.onContentFocusOutside,
            onRootContentClose: a.onRootContentClose,
            ...n,
          };
        return o.viewport
          ? (0, g.jsx)(Y, { forceMount: r, ...c, ref: l })
          : (0, g.jsx)(u.Presence, {
              present: r || d,
              children: (0, g.jsx)(J, {
                "data-state": el(d),
                ...c,
                ref: l,
                onPointerEnter: (0, i.composeEventHandlers)(
                  e.onPointerEnter,
                  o.onContentEnter,
                ),
                onPointerLeave: (0, i.composeEventHandlers)(
                  e.onPointerLeave,
                  ec(o.onContentLeave),
                ),
                style: {
                  pointerEvents: !d && o.isRootMenu ? "none" : void 0,
                  ...c.style,
                },
              }),
            });
      });
    X.displayName = q;
    var Y = t.forwardRef((e, t) => {
        let { onViewportContentChange: r, onViewportContentRemove: n } = j(
          q,
          e.__scopeNavigationMenu,
        );
        return (
          (0, m.useLayoutEffect)(() => {
            r(e.value, { ref: t, ...e });
          }, [e, t, r]),
          (0, m.useLayoutEffect)(() => () => n(e.value), [e.value, n]),
          null
        );
      }),
      Z = "navigationMenu.rootContentDismiss",
      J = t.forwardRef((e, r) => {
        let {
            __scopeNavigationMenu: n,
            value: o,
            triggerRef: a,
            focusProxyRef: l,
            wasEscapeCloseRef: u,
            onRootContentClose: d,
            onContentFocusOutside: c,
            ...p
          } = e,
          m = j(q, n),
          v = t.useRef(null),
          h = (0, s.useComposedRefs)(v, r),
          y = eu(m.baseId, o),
          w = ed(m.baseId, o),
          x = b(n),
          R = t.useRef(null),
          { onItemDismiss: C } = m;
        t.useEffect(() => {
          let e = v.current;
          if (m.isRootMenu && e) {
            let t = () => {
              (C(),
                d(),
                e.contains(document.activeElement) && a.current?.focus());
            };
            return (
              e.addEventListener(Z, t),
              () => e.removeEventListener(Z, t)
            );
          }
        }, [m.isRootMenu, e.value, a, C, d]);
        let E = t.useMemo(() => {
          let e = x().map((e) => e.value);
          "rtl" === m.dir && e.reverse();
          let t = e.indexOf(m.value),
            r = e.indexOf(m.previousValue),
            n = o === m.value,
            i = r === e.indexOf(o);
          if (!n && !i) return R.current;
          let a = (() => {
            if (t !== r) {
              if (n && -1 !== r) return t > r ? "from-end" : "from-start";
              if (i && -1 !== t) return t > r ? "to-start" : "to-end";
            }
            return null;
          })();
          return ((R.current = a), a);
        }, [m.previousValue, m.value, m.dir, x, o]);
        return (0, g.jsx)(er, {
          asChild: !0,
          children: (0, g.jsx)(f.DismissableLayer, {
            id: w,
            "aria-labelledby": y,
            "data-motion": E,
            "data-orientation": m.orientation,
            ...p,
            ref: h,
            disableOutsidePointerEvents: !1,
            onDismiss: () => {
              let e = new Event(Z, { bubbles: !0, cancelable: !0 });
              v.current?.dispatchEvent(e);
            },
            onFocusOutside: (0, i.composeEventHandlers)(
              e.onFocusOutside,
              (e) => {
                c();
                let t = e.target;
                m.rootNavigationMenu?.contains(t) && e.preventDefault();
              },
            ),
            onPointerDownOutside: (0, i.composeEventHandlers)(
              e.onPointerDownOutside,
              (e) => {
                let t = e.target,
                  r = x().some((e) => e.ref.current?.contains(t)),
                  n = m.isRootMenu && m.viewport?.contains(t);
                (r || n || !m.isRootMenu) && e.preventDefault();
              },
            ),
            onKeyDown: (0, i.composeEventHandlers)(e.onKeyDown, (e) => {
              let t = e.altKey || e.ctrlKey || e.metaKey;
              if ("Tab" === e.key && !t) {
                let t = eo(e.currentTarget),
                  r = document.activeElement,
                  n = t.findIndex((e) => e === r);
                ea(
                  e.shiftKey
                    ? t.slice(0, n).reverse()
                    : t.slice(n + 1, t.length),
                )
                  ? e.preventDefault()
                  : l.current?.focus();
              }
            }),
            onEscapeKeyDown: (0, i.composeEventHandlers)(
              e.onEscapeKeyDown,
              (e) => {
                u.current = !0;
              },
            ),
          }),
        });
      }),
      Q = "NavigationMenuViewport",
      ee = t.forwardRef((e, t) => {
        let { forceMount: r, ...n } = e,
          i = !!j(Q, e.__scopeNavigationMenu).value;
        return (0, g.jsx)(u.Presence, {
          present: r || i,
          children: (0, g.jsx)(et, { ...n, ref: t }),
        });
      });
    ee.displayName = Q;
    var et = t.forwardRef((e, r) => {
        let { __scopeNavigationMenu: n, children: a, ...l } = e,
          d = j(Q, n),
          c = (0, s.useComposedRefs)(r, d.onViewportChange),
          f = T(q, e.__scopeNavigationMenu),
          [p, m] = t.useState(null),
          [v, h] = t.useState(null),
          y = p ? p?.width + "px" : void 0,
          w = p ? p?.height + "px" : void 0,
          b = !!d.value,
          x = b ? d.value : d.previousValue;
        return (
          es(v, () => {
            v && m({ width: v.offsetWidth, height: v.offsetHeight });
          }),
          (0, g.jsx)(o.Primitive.div, {
            "data-state": el(b),
            "data-orientation": d.orientation,
            ...l,
            ref: c,
            style: {
              pointerEvents: !b && d.isRootMenu ? "none" : void 0,
              "--radix-navigation-menu-viewport-width": y,
              "--radix-navigation-menu-viewport-height": w,
              ...l.style,
            },
            onPointerEnter: (0, i.composeEventHandlers)(
              e.onPointerEnter,
              d.onContentEnter,
            ),
            onPointerLeave: (0, i.composeEventHandlers)(
              e.onPointerLeave,
              ec(d.onContentLeave),
            ),
            children: Array.from(f.items).map(
              ([e, { ref: t, forceMount: r, ...n }]) => {
                let i = x === e;
                return (0, g.jsx)(
                  u.Presence,
                  {
                    present: r || i,
                    children: (0, g.jsx)(J, {
                      ...n,
                      ref: (0, s.composeRefs)(t, (e) => {
                        i && e && h(e);
                      }),
                    }),
                  },
                  e,
                );
              },
            ),
          })
        );
      }),
      er = t.forwardRef((e, t) => {
        let { __scopeNavigationMenu: r, ...n } = e,
          i = j("FocusGroup", r);
        return (0, g.jsx)(R.Provider, {
          scope: r,
          children: (0, g.jsx)(R.Slot, {
            scope: r,
            children: (0, g.jsx)(o.Primitive.div, { dir: i.dir, ...n, ref: t }),
          }),
        });
      }),
      en = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
      ei = t.forwardRef((e, t) => {
        let { __scopeNavigationMenu: r, ...n } = e,
          a = C(r),
          s = j("FocusGroupItem", r);
        return (0, g.jsx)(R.ItemSlot, {
          scope: r,
          children: (0, g.jsx)(o.Primitive.button, {
            ...n,
            ref: t,
            onKeyDown: (0, i.composeEventHandlers)(e.onKeyDown, (e) => {
              if (["Home", "End", ...en].includes(e.key)) {
                let t = a().map((e) => e.ref.current);
                if (
                  ([
                    "rtl" === s.dir ? "ArrowRight" : "ArrowLeft",
                    "ArrowUp",
                    "End",
                  ].includes(e.key) && t.reverse(),
                  en.includes(e.key))
                ) {
                  let r = t.indexOf(e.currentTarget);
                  t = t.slice(r + 1);
                }
                (setTimeout(() => ea(t)), e.preventDefault());
              }
            }),
          }),
        });
      });
    function eo(e) {
      let t = [],
        r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
          acceptNode: (e) => {
            let t = "INPUT" === e.tagName && "hidden" === e.type;
            return e.disabled || e.hidden || t
              ? NodeFilter.FILTER_SKIP
              : e.tabIndex >= 0
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
          },
        });
      for (; r.nextNode(); ) t.push(r.currentNode);
      return t;
    }
    function ea(e) {
      let t = document.activeElement;
      return e.some(
        (e) => e === t || (e.focus(), document.activeElement !== t),
      );
    }
    function es(e, t) {
      let r = (0, v.useCallbackRef)(t);
      (0, m.useLayoutEffect)(() => {
        let t = 0;
        if (e) {
          let n = new ResizeObserver(() => {
            (cancelAnimationFrame(t), (t = window.requestAnimationFrame(r)));
          });
          return (
            n.observe(e),
            () => {
              (window.cancelAnimationFrame(t), n.unobserve(e));
            }
          );
        }
      }, [e, r]);
    }
    function el(e) {
      return e ? "open" : "closed";
    }
    function eu(e, t) {
      return `${e}-trigger-${t}`;
    }
    function ed(e, t) {
      return `${e}-content-${t}`;
    }
    function ec(e) {
      return (t) => ("mouse" === t.pointerType ? e(t) : void 0);
    }
    e.s([
      "Content",
      () => X,
      "Indicator",
      () => B,
      "Item",
      () => z,
      "Link",
      () => K,
      "List",
      () => I,
      "NavigationMenu",
      () => M,
      "NavigationMenuContent",
      () => X,
      "NavigationMenuIndicator",
      () => B,
      "NavigationMenuItem",
      () => z,
      "NavigationMenuLink",
      () => K,
      "NavigationMenuList",
      () => I,
      "NavigationMenuSub",
      () => L,
      "NavigationMenuTrigger",
      () => U,
      "NavigationMenuViewport",
      () => ee,
      "Root",
      () => M,
      "Sub",
      () => L,
      "Trigger",
      () => U,
      "Viewport",
      () => ee,
      "createNavigationMenuScope",
      () => P,
    ]);
  },
  251875,
  178896,
  364363,
  244739,
  (e) => {
    "use strict";
    var t,
      r,
      n = e.i(789783);
    function i(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
      return function (n) {
        if ((e?.(n), !1 === r || !n.defaultPrevented)) return t?.(n);
      };
    }
    e.s(["composeEventHandlers", () => i], 178896);
    var o = e.i(301224);
    function a(e, t = []) {
      let r = [],
        i = () => {
          let t = r.map((e) => n.createContext(e));
          return function (r) {
            let i = r?.[e] || t;
            return n.useMemo(
              () => ({ [`__scope${e}`]: { ...r, [e]: i } }),
              [r, i],
            );
          };
        };
      return (
        (i.scopeName = e),
        [
          function (t, i) {
            let a = n.createContext(i),
              s = r.length;
            r = [...r, i];
            let l = (t) => {
              let { scope: r, children: i, ...l } = t,
                u = r?.[e]?.[s] || a,
                d = n.useMemo(() => l, Object.values(l));
              return (0, o.jsx)(u.Provider, { value: d, children: i });
            };
            return (
              (l.displayName = t + "Provider"),
              [
                l,
                function (r, o) {
                  let l = o?.[e]?.[s] || a,
                    u = n.useContext(l);
                  if (u) return u;
                  if (void 0 !== i) return i;
                  throw Error(`\`${r}\` must be used within \`${t}\``);
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
                let i = r.reduce((t, { useScope: r, scopeName: n }) => {
                  let i = r(e)[`__scope${n}`];
                  return { ...t, ...i };
                }, {});
                return n.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
              };
            };
            return ((r.scopeName = t.scopeName), r);
          })(i, ...t),
        ]
      );
    }
    e.s(["createContextScope", () => a], 364363);
    var s = e.i(633439);
    function l(e, t) {
      if ("function" == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function u(...e) {
      return (t) => {
        let r = !1,
          n = e.map((e) => {
            let n = l(e, t);
            return (r || "function" != typeof n || (r = !0), n);
          });
        if (r)
          return () => {
            for (let t = 0; t < n.length; t++) {
              let r = n[t];
              "function" == typeof r ? r() : l(e[t], null);
            }
          };
      };
    }
    function d(...e) {
      return n.useCallback(u(...e), e);
    }
    e.s(["composeRefs", () => u, "useComposedRefs", () => d], 244739);
    var c = e.i(436035),
      f = e.i(546564),
      p = "undefined" != typeof document ? n.useLayoutEffect : n.useEffect;
    function m(e, t) {
      let r, n, i;
      if (e === t) return !0;
      if (typeof e != typeof t) return !1;
      if ("function" == typeof e && e.toString() === t.toString()) return !0;
      if (e && t && "object" == typeof e) {
        if (Array.isArray(e)) {
          if ((r = e.length) !== t.length) return !1;
          for (n = r; 0 != n--; ) if (!m(e[n], t[n])) return !1;
          return !0;
        }
        if ((r = (i = Object.keys(e)).length) !== Object.keys(t).length)
          return !1;
        for (n = r; 0 != n--; ) if (!{}.hasOwnProperty.call(t, i[n])) return !1;
        for (n = r; 0 != n--; ) {
          let r = i[n];
          if (("_owner" !== r || !e.$$typeof) && !m(e[r], t[r])) return !1;
        }
        return !0;
      }
      return e != e && t != t;
    }
    function v(e) {
      return "undefined" == typeof window
        ? 1
        : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
    }
    function h(e, t) {
      let r = v(e);
      return Math.round(t * r) / r;
    }
    function g(e) {
      let t = n.useRef(e);
      return (
        p(() => {
          t.current = e;
        }),
        t
      );
    }
    var y = n.forwardRef((e, t) => {
      let { children: r, ...i } = e,
        a = n.Children.toArray(r),
        s = a.find(x);
      if (s) {
        let e = s.props.children,
          r = a.map((t) =>
            t !== s
              ? t
              : n.Children.count(e) > 1
                ? n.Children.only(null)
                : n.isValidElement(e)
                  ? e.props.children
                  : null,
          );
        return (0, o.jsx)(w, {
          ...i,
          ref: t,
          children: n.isValidElement(e) ? n.cloneElement(e, void 0, r) : null,
        });
      }
      return (0, o.jsx)(w, { ...i, ref: t, children: r });
    });
    y.displayName = "Slot";
    var w = n.forwardRef((e, t) => {
      let { children: r, ...i } = e;
      if (n.isValidElement(r)) {
        var o;
        let e,
          a,
          s =
            ((o = r),
            (a =
              (e = Object.getOwnPropertyDescriptor(o.props, "ref")?.get) &&
              "isReactWarning" in e &&
              e.isReactWarning)
              ? o.ref
              : (a =
                    (e = Object.getOwnPropertyDescriptor(o, "ref")?.get) &&
                    "isReactWarning" in e &&
                    e.isReactWarning)
                ? o.props.ref
                : o.props.ref || o.ref),
          l = (function (e, t) {
            let r = { ...t };
            for (let n in t) {
              let i = e[n],
                o = t[n];
              /^on[A-Z]/.test(n)
                ? i && o
                  ? (r[n] = (...e) => {
                      (o(...e), i(...e));
                    })
                  : i && (r[n] = i)
                : "style" === n
                  ? (r[n] = { ...i, ...o })
                  : "className" === n &&
                    (r[n] = [i, o].filter(Boolean).join(" "));
            }
            return { ...e, ...r };
          })(i, r.props);
        return (
          r.type !== n.Fragment && (l.ref = t ? u(t, s) : s),
          n.cloneElement(r, l)
        );
      }
      return n.Children.count(r) > 1 ? n.Children.only(null) : null;
    });
    w.displayName = "SlotClone";
    var b = ({ children: e }) => (0, o.jsx)(o.Fragment, { children: e });
    function x(e) {
      return n.isValidElement(e) && e.type === b;
    }
    var R = [
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
        let r = n.forwardRef((e, r) => {
          let { asChild: n, ...i } = e,
            a = n ? y : t;
          return (
            "undefined" != typeof window &&
              (window[Symbol.for("radix-ui")] = !0),
            (0, o.jsx)(a, { ...i, ref: r })
          );
        });
        return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
      }, {}),
      C = n.forwardRef((e, t) => {
        let { children: r, width: n = 10, height: i = 5, ...a } = e;
        return (0, o.jsx)(R.svg, {
          ...a,
          ref: t,
          width: n,
          height: i,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
          children: e.asChild
            ? r
            : (0, o.jsx)("polygon", { points: "0,0 30,0 15,10" }),
        });
      });
    C.displayName = "Arrow";
    var E = e.i(867645),
      N = e.i(674180),
      P = e.i(736891),
      S = "Popper",
      [j, k] = a(S),
      [T, M] = j(S),
      D = (e) => {
        let { __scopePopper: t, children: r } = e,
          [i, a] = n.useState(null);
        return (0, o.jsx)(T, {
          scope: t,
          anchor: i,
          onAnchorChange: a,
          children: r,
        });
      };
    D.displayName = S;
    var L = "PopperAnchor",
      O = n.forwardRef((e, t) => {
        let { __scopePopper: r, virtualRef: i, ...a } = e,
          s = M(L, r),
          l = n.useRef(null),
          u = d(t, l);
        return (
          n.useEffect(() => {
            s.onAnchorChange(i?.current || l.current);
          }),
          i ? null : (0, o.jsx)(R.div, { ...a, ref: u })
        );
      });
    O.displayName = L;
    var A = "PopperContent",
      [I, F] = j(A),
      _ = n.forwardRef((e, t) => {
        var r, i;
        let a,
          s,
          l,
          u,
          y,
          {
            __scopePopper: w,
            side: b = "bottom",
            sideOffset: x = 0,
            align: C = "center",
            alignOffset: S = 0,
            arrowPadding: j = 0,
            avoidCollisions: k = !0,
            collisionBoundary: T = [],
            collisionPadding: D = 0,
            sticky: L = "partial",
            hideWhenDetached: O = !1,
            updatePositionStrategy: F = "optimized",
            onPlaced: _,
            ...H
          } = e,
          z = M(A, w),
          [$, V] = n.useState(null),
          B = d(t, (e) => V(e)),
          [G, q] = n.useState(null),
          X = (0, P.useSize)(G),
          Y = X?.width ?? 0,
          Z = X?.height ?? 0,
          J =
            "number" == typeof D
              ? D
              : { top: 0, right: 0, bottom: 0, left: 0, ...D },
          Q = Array.isArray(T) ? T : [T],
          ee = Q.length > 0,
          et = { padding: J, boundary: Q.filter(U), altBoundary: ee },
          {
            refs: er,
            floatingStyles: en,
            placement: ei,
            isPositioned: eo,
            middlewareData: ea,
          } = (function (e) {
            void 0 === e && (e = {});
            let {
                placement: t = "bottom",
                strategy: r = "absolute",
                middleware: i = [],
                platform: o,
                elements: { reference: a, floating: s } = {},
                transform: l = !0,
                whileElementsMounted: u,
                open: d,
              } = e,
              [y, w] = n.useState({
                x: 0,
                y: 0,
                strategy: r,
                placement: t,
                middlewareData: {},
                isPositioned: !1,
              }),
              [b, x] = n.useState(i);
            m(b, i) || x(i);
            let [R, C] = n.useState(null),
              [E, N] = n.useState(null),
              P = n.useCallback((e) => {
                e !== T.current && ((T.current = e), C(e));
              }, []),
              S = n.useCallback((e) => {
                e !== M.current && ((M.current = e), N(e));
              }, []),
              j = a || R,
              k = s || E,
              T = n.useRef(null),
              M = n.useRef(null),
              D = n.useRef(y),
              L = null != u,
              O = g(u),
              A = g(o),
              I = n.useCallback(() => {
                if (!T.current || !M.current) return;
                let e = { placement: t, strategy: r, middleware: b };
                (A.current && (e.platform = A.current),
                  (0, c.computePosition)(T.current, M.current, e).then((e) => {
                    let t = { ...e, isPositioned: !0 };
                    F.current &&
                      !m(D.current, t) &&
                      ((D.current = t),
                      f.flushSync(() => {
                        w(t);
                      }));
                  }));
              }, [b, t, r, A]);
            p(() => {
              !1 === d &&
                D.current.isPositioned &&
                ((D.current.isPositioned = !1),
                w((e) => ({ ...e, isPositioned: !1 })));
            }, [d]);
            let F = n.useRef(!1);
            (p(
              () => (
                (F.current = !0),
                () => {
                  F.current = !1;
                }
              ),
              [],
            ),
              p(() => {
                if ((j && (T.current = j), k && (M.current = k), j && k)) {
                  if (O.current) return O.current(j, k, I);
                  I();
                }
              }, [j, k, I, O, L]));
            let _ = n.useMemo(
                () => ({
                  reference: T,
                  floating: M,
                  setReference: P,
                  setFloating: S,
                }),
                [P, S],
              ),
              H = n.useMemo(() => ({ reference: j, floating: k }), [j, k]),
              z = n.useMemo(() => {
                let e = { position: r, left: 0, top: 0 };
                if (!H.floating) return e;
                let t = h(H.floating, y.x),
                  n = h(H.floating, y.y);
                return l
                  ? {
                      ...e,
                      transform: "translate(" + t + "px, " + n + "px)",
                      ...(v(H.floating) >= 1.5 && { willChange: "transform" }),
                    }
                  : { position: r, left: t, top: n };
              }, [r, l, H.floating, y.x, y.y]);
            return n.useMemo(
              () => ({
                ...y,
                update: I,
                refs: _,
                elements: H,
                floatingStyles: z,
              }),
              [y, I, _, H, z],
            );
          })({
            strategy: "fixed",
            placement: b + ("center" !== C ? "-" + C : ""),
            whileElementsMounted: (...e) =>
              (0, c.autoUpdate)(...e, { animationFrame: "always" === F }),
            elements: { reference: z.anchor },
            middleware: [
              ((a = { mainAxis: x + Z, alignmentAxis: S }),
              { ...(0, c.offset)(a), options: [a, void 0] }),
              k &&
                ((s = {
                  mainAxis: !0,
                  crossAxis: !1,
                  limiter:
                    "partial" === L
                      ? {
                          ...(0, c.limitShift)(void 0),
                          options: [void 0, void 0],
                        }
                      : void 0,
                  ...et,
                }),
                { ...(0, c.shift)(s), options: [s, void 0] }),
              k &&
                ((l = { ...et }), { ...(0, c.flip)(l), options: [l, void 0] }),
              ((u = {
                ...et,
                apply: ({
                  elements: e,
                  rects: t,
                  availableWidth: r,
                  availableHeight: n,
                }) => {
                  let { width: i, height: o } = t.reference,
                    a = e.floating.style;
                  (a.setProperty("--radix-popper-available-width", `${r}px`),
                    a.setProperty("--radix-popper-available-height", `${n}px`),
                    a.setProperty("--radix-popper-anchor-width", `${i}px`),
                    a.setProperty("--radix-popper-anchor-height", `${o}px`));
                },
              }),
              { ...(0, c.size)(u), options: [u, void 0] }),
              G && {
                ...{
                  name: "arrow",
                  options: (i = r = { element: G, padding: j }),
                  fn(e) {
                    let { element: t, padding: r } =
                      "function" == typeof i ? i(e) : i;
                    return t && {}.hasOwnProperty.call(t, "current")
                      ? null != t.current
                        ? (0, c.arrow)({ element: t.current, padding: r }).fn(e)
                        : {}
                      : t
                        ? (0, c.arrow)({ element: t, padding: r }).fn(e)
                        : {};
                  },
                },
                options: [r, void 0],
              },
              W({ arrowWidth: Y, arrowHeight: Z }),
              O &&
                ((y = { strategy: "referenceHidden", ...et }),
                { ...(0, c.hide)(y), options: [y, void 0] }),
            ],
          }),
          [es, el] = K(ei),
          eu = (0, E.useCallbackRef)(_);
        (0, N.useLayoutEffect)(() => {
          eo && eu?.();
        }, [eo, eu]);
        let ed = ea.arrow?.x,
          ec = ea.arrow?.y,
          ef = ea.arrow?.centerOffset !== 0,
          [ep, em] = n.useState();
        return (
          (0, N.useLayoutEffect)(() => {
            $ && em(window.getComputedStyle($).zIndex);
          }, [$]),
          (0, o.jsx)("div", {
            ref: er.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
              ...en,
              transform: eo ? en.transform : "translate(0, -200%)",
              minWidth: "max-content",
              zIndex: ep,
              "--radix-popper-transform-origin": [
                ea.transformOrigin?.x,
                ea.transformOrigin?.y,
              ].join(" "),
              ...(ea.hide?.referenceHidden && {
                visibility: "hidden",
                pointerEvents: "none",
              }),
            },
            dir: e.dir,
            children: (0, o.jsx)(I, {
              scope: w,
              placedSide: es,
              onArrowChange: q,
              arrowX: ed,
              arrowY: ec,
              shouldHideArrow: ef,
              children: (0, o.jsx)(R.div, {
                "data-side": es,
                "data-align": el,
                ...H,
                ref: B,
                style: { ...H.style, animation: eo ? void 0 : "none" },
              }),
            }),
          })
        );
      });
    _.displayName = A;
    var H = "PopperArrow",
      z = { top: "bottom", right: "left", bottom: "top", left: "right" },
      $ = n.forwardRef(function (e, t) {
        let { __scopePopper: r, ...n } = e,
          i = F(H, r),
          a = z[i.placedSide];
        return (0, o.jsx)("span", {
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
          children: (0, o.jsx)(C, {
            ...n,
            ref: t,
            style: { ...n.style, display: "block" },
          }),
        });
      });
    function U(e) {
      return null !== e;
    }
    $.displayName = H;
    var W = (e) => ({
      name: "transformOrigin",
      options: e,
      fn(t) {
        let { placement: r, rects: n, middlewareData: i } = t,
          o = i.arrow?.centerOffset !== 0,
          a = o ? 0 : e.arrowWidth,
          s = o ? 0 : e.arrowHeight,
          [l, u] = K(r),
          d = { start: "0%", center: "50%", end: "100%" }[u],
          c = (i.arrow?.x ?? 0) + a / 2,
          f = (i.arrow?.y ?? 0) + s / 2,
          p = "",
          m = "";
        return (
          "bottom" === l
            ? ((p = o ? d : `${c}px`), (m = `${-s}px`))
            : "top" === l
              ? ((p = o ? d : `${c}px`), (m = `${n.floating.height + s}px`))
              : "right" === l
                ? ((p = `${-s}px`), (m = o ? d : `${f}px`))
                : "left" === l &&
                  ((p = `${n.floating.width + s}px`), (m = o ? d : `${f}px`)),
          { data: { x: p, y: m } }
        );
      },
    });
    function K(e) {
      let [t, r = "center"] = e.split("-");
      return [t, r];
    }
    var V = n.forwardRef((e, t) => {
      let { container: r, ...i } = e,
        [a, s] = n.useState(!1);
      (0, N.useLayoutEffect)(() => s(!0), []);
      let l = r || (a && globalThis?.document?.body);
      return l
        ? f.default.createPortal((0, o.jsx)(R.div, { ...i, ref: t }), l)
        : null;
    });
    V.displayName = "Portal";
    var B = (e) => {
      var t;
      let r,
        i,
        { present: o, children: a } = e,
        s = (function (e) {
          var t, r;
          let [i, o] = n.useState(),
            a = n.useRef({}),
            s = n.useRef(e),
            l = n.useRef("none"),
            [u, d] =
              ((t = e ? "mounted" : "unmounted"),
              (r = {
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
              n.useReducer((e, t) => r[e][t] ?? e, t));
          return (
            n.useEffect(() => {
              let e = G(a.current);
              l.current = "mounted" === u ? e : "none";
            }, [u]),
            (0, N.useLayoutEffect)(() => {
              let t = a.current,
                r = s.current;
              if (r !== e) {
                let n = l.current,
                  i = G(t);
                (e
                  ? d("MOUNT")
                  : "none" === i || t?.display === "none"
                    ? d("UNMOUNT")
                    : r && n !== i
                      ? d("ANIMATION_OUT")
                      : d("UNMOUNT"),
                  (s.current = e));
              }
            }, [e, d]),
            (0, N.useLayoutEffect)(() => {
              if (i) {
                let e,
                  t = i.ownerDocument.defaultView ?? window,
                  r = (r) => {
                    let n = G(a.current).includes(r.animationName);
                    if (
                      r.target === i &&
                      n &&
                      (d("ANIMATION_END"), !s.current)
                    ) {
                      let r = i.style.animationFillMode;
                      ((i.style.animationFillMode = "forwards"),
                        (e = t.setTimeout(() => {
                          "forwards" === i.style.animationFillMode &&
                            (i.style.animationFillMode = r);
                        })));
                    }
                  },
                  n = (e) => {
                    e.target === i && (l.current = G(a.current));
                  };
                return (
                  i.addEventListener("animationstart", n),
                  i.addEventListener("animationcancel", r),
                  i.addEventListener("animationend", r),
                  () => {
                    (t.clearTimeout(e),
                      i.removeEventListener("animationstart", n),
                      i.removeEventListener("animationcancel", r),
                      i.removeEventListener("animationend", r));
                  }
                );
              }
              d("ANIMATION_END");
            }, [i, d]),
            {
              isPresent: ["mounted", "unmountSuspended"].includes(u),
              ref: n.useCallback((e) => {
                (e && (a.current = getComputedStyle(e)), o(e));
              }, []),
            }
          );
        })(o),
        l =
          "function" == typeof a
            ? a({ present: s.isPresent })
            : n.Children.only(a),
        u = d(
          s.ref,
          ((t = l),
          (i =
            (r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get) &&
            "isReactWarning" in r &&
            r.isReactWarning)
            ? t.ref
            : (i =
                  (r = Object.getOwnPropertyDescriptor(t, "ref")?.get) &&
                  "isReactWarning" in r &&
                  r.isReactWarning)
              ? t.props.ref
              : t.props.ref || t.ref),
        );
      return "function" == typeof a || s.isPresent
        ? n.cloneElement(l, { ref: u })
        : null;
    };
    function G(e) {
      return e?.animationName || "none";
    }
    B.displayName = "Presence";
    var q = e.i(291239),
      X = "dismissableLayer.update",
      Y = n.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
      }),
      Z = n.forwardRef((e, r) => {
        let {
            disableOutsidePointerEvents: a = !1,
            onEscapeKeyDown: s,
            onPointerDownOutside: l,
            onFocusOutside: u,
            onInteractOutside: c,
            onDismiss: f,
            ...p
          } = e,
          m = n.useContext(Y),
          [v, h] = n.useState(null),
          g = v?.ownerDocument ?? globalThis?.document,
          [, y] = n.useState({}),
          w = d(r, (e) => h(e)),
          b = Array.from(m.layers),
          [x] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
          C = b.indexOf(x),
          N = v ? b.indexOf(v) : -1,
          P = m.layersWithOutsidePointerEventsDisabled.size > 0,
          S = N >= C,
          j = (function (e, t = globalThis?.document) {
            let r = (0, E.useCallbackRef)(e),
              i = n.useRef(!1),
              o = n.useRef(() => {});
            return (
              n.useEffect(() => {
                let e = (e) => {
                    if (e.target && !i.current) {
                      let n = function () {
                          Q("dismissableLayer.pointerDownOutside", r, i, {
                            discrete: !0,
                          });
                        },
                        i = { originalEvent: e };
                      "touch" === e.pointerType
                        ? (t.removeEventListener("click", o.current),
                          (o.current = n),
                          t.addEventListener("click", o.current, { once: !0 }))
                        : n();
                    } else t.removeEventListener("click", o.current);
                    i.current = !1;
                  },
                  n = window.setTimeout(() => {
                    t.addEventListener("pointerdown", e);
                  }, 0);
                return () => {
                  (window.clearTimeout(n),
                    t.removeEventListener("pointerdown", e),
                    t.removeEventListener("click", o.current));
                };
              }, [t, r]),
              { onPointerDownCapture: () => (i.current = !0) }
            );
          })((e) => {
            let t = e.target,
              r = [...m.branches].some((e) => e.contains(t));
            S && !r && (l?.(e), c?.(e), e.defaultPrevented || f?.());
          }, g),
          k = (function (e, t = globalThis?.document) {
            let r = (0, E.useCallbackRef)(e),
              i = n.useRef(!1);
            return (
              n.useEffect(() => {
                let e = (e) => {
                  e.target &&
                    !i.current &&
                    Q(
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
                onFocusCapture: () => (i.current = !0),
                onBlurCapture: () => (i.current = !1),
              }
            );
          })((e) => {
            let t = e.target;
            ![...m.branches].some((e) => e.contains(t)) &&
              (u?.(e), c?.(e), e.defaultPrevented || f?.());
          }, g);
        return (
          (0, q.useEscapeKeydown)((e) => {
            N === m.layers.size - 1 &&
              (s?.(e), !e.defaultPrevented && f && (e.preventDefault(), f()));
          }, g),
          n.useEffect(() => {
            if (v)
              return (
                a &&
                  (0 === m.layersWithOutsidePointerEventsDisabled.size &&
                    ((t = g.body.style.pointerEvents),
                    (g.body.style.pointerEvents = "none")),
                  m.layersWithOutsidePointerEventsDisabled.add(v)),
                m.layers.add(v),
                J(),
                () => {
                  a &&
                    1 === m.layersWithOutsidePointerEventsDisabled.size &&
                    (g.body.style.pointerEvents = t);
                }
              );
          }, [v, g, a, m]),
          n.useEffect(
            () => () => {
              v &&
                (m.layers.delete(v),
                m.layersWithOutsidePointerEventsDisabled.delete(v),
                J());
            },
            [v, m],
          ),
          n.useEffect(() => {
            let e = () => y({});
            return (
              document.addEventListener(X, e),
              () => document.removeEventListener(X, e)
            );
          }, []),
          (0, o.jsx)(R.div, {
            ...p,
            ref: w,
            style: {
              pointerEvents: P ? (S ? "auto" : "none") : void 0,
              ...e.style,
            },
            onFocusCapture: i(e.onFocusCapture, k.onFocusCapture),
            onBlurCapture: i(e.onBlurCapture, k.onBlurCapture),
            onPointerDownCapture: i(
              e.onPointerDownCapture,
              j.onPointerDownCapture,
            ),
          })
        );
      });
    function J() {
      let e = new CustomEvent(X);
      document.dispatchEvent(e);
    }
    function Q(e, t, r, { discrete: n }) {
      let i = r.originalEvent.target,
        o = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
      if ((t && i.addEventListener(e, t, { once: !0 }), n))
        i && f.flushSync(() => i.dispatchEvent(o));
      else i.dispatchEvent(o);
    }
    ((Z.displayName = "DismissableLayer"),
      (n.forwardRef((e, t) => {
        let r = n.useContext(Y),
          i = n.useRef(null),
          a = d(t, i);
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
          (0, o.jsx)(R.div, { ...e, ref: a })
        );
      }).displayName = "DismissableLayerBranch"));
    var ee = "HoverCard",
      [et, er] = a(ee, [k]),
      en = k(),
      [ei, eo] = et(ee),
      ea = (e) => {
        let {
            __scopeHoverCard: t,
            children: r,
            open: i,
            defaultOpen: a,
            onOpenChange: l,
            openDelay: u = 700,
            closeDelay: d = 300,
          } = e,
          c = en(t),
          f = n.useRef(0),
          p = n.useRef(0),
          m = n.useRef(!1),
          v = n.useRef(!1),
          [h = !1, g] = (0, s.useControllableState)({
            prop: i,
            defaultProp: a,
            onChange: l,
          }),
          y = n.useCallback(() => {
            (clearTimeout(p.current),
              (f.current = window.setTimeout(() => g(!0), u)));
          }, [u, g]),
          w = n.useCallback(() => {
            (clearTimeout(f.current),
              m.current ||
                v.current ||
                (p.current = window.setTimeout(() => g(!1), d)));
          }, [d, g]),
          b = n.useCallback(() => g(!1), [g]);
        return (
          n.useEffect(
            () => () => {
              (clearTimeout(f.current), clearTimeout(p.current));
            },
            [],
          ),
          (0, o.jsx)(ei, {
            scope: t,
            open: h,
            onOpenChange: g,
            onOpen: y,
            onClose: w,
            onDismiss: b,
            hasSelectionRef: m,
            isPointerDownOnContentRef: v,
            children: (0, o.jsx)(D, { ...c, children: r }),
          })
        );
      };
    ea.displayName = ee;
    var es = "HoverCardTrigger",
      el = n.forwardRef((e, t) => {
        let { __scopeHoverCard: r, ...n } = e,
          a = eo(es, r),
          s = en(r);
        return (0, o.jsx)(O, {
          asChild: !0,
          ...s,
          children: (0, o.jsx)(R.a, {
            "data-state": a.open ? "open" : "closed",
            ...n,
            ref: t,
            onPointerEnter: i(e.onPointerEnter, eg(a.onOpen)),
            onPointerLeave: i(e.onPointerLeave, eg(a.onClose)),
            onFocus: i(e.onFocus, a.onOpen),
            onBlur: i(e.onBlur, a.onClose),
            onTouchStart: i(e.onTouchStart, (e) => e.preventDefault()),
          }),
        });
      });
    el.displayName = es;
    var eu = "HoverCardPortal",
      [ed, ec] = et(eu, { forceMount: void 0 }),
      ef = (e) => {
        let {
            __scopeHoverCard: t,
            forceMount: r,
            children: n,
            container: i,
          } = e,
          a = eo(eu, t);
        return (0, o.jsx)(ed, {
          scope: t,
          forceMount: r,
          children: (0, o.jsx)(B, {
            present: r || a.open,
            children: (0, o.jsx)(V, { asChild: !0, container: i, children: n }),
          }),
        });
      };
    ef.displayName = eu;
    var ep = "HoverCardContent",
      em = n.forwardRef((e, t) => {
        let r = ec(ep, e.__scopeHoverCard),
          { forceMount: n = r.forceMount, ...a } = e,
          s = eo(ep, e.__scopeHoverCard);
        return (0, o.jsx)(B, {
          present: n || s.open,
          children: (0, o.jsx)(ev, {
            "data-state": s.open ? "open" : "closed",
            ...a,
            onPointerEnter: i(e.onPointerEnter, eg(s.onOpen)),
            onPointerLeave: i(e.onPointerLeave, eg(s.onClose)),
            ref: t,
          }),
        });
      });
    em.displayName = ep;
    var ev = n.forwardRef((e, t) => {
        let {
            __scopeHoverCard: a,
            onEscapeKeyDown: s,
            onPointerDownOutside: l,
            onFocusOutside: u,
            onInteractOutside: c,
            ...f
          } = e,
          p = eo(ep, a),
          m = en(a),
          v = n.useRef(null),
          h = d(t, v),
          [g, y] = n.useState(!1);
        return (
          n.useEffect(() => {
            if (g) {
              let e = document.body;
              return (
                (r = e.style.userSelect || e.style.webkitUserSelect),
                (e.style.userSelect = "none"),
                (e.style.webkitUserSelect = "none"),
                () => {
                  ((e.style.userSelect = r), (e.style.webkitUserSelect = r));
                }
              );
            }
          }, [g]),
          n.useEffect(() => {
            if (v.current) {
              let e = () => {
                (y(!1),
                  (p.isPointerDownOnContentRef.current = !1),
                  setTimeout(() => {
                    document.getSelection()?.toString() !== "" &&
                      (p.hasSelectionRef.current = !0);
                  }));
              };
              return (
                document.addEventListener("pointerup", e),
                () => {
                  (document.removeEventListener("pointerup", e),
                    (p.hasSelectionRef.current = !1),
                    (p.isPointerDownOnContentRef.current = !1));
                }
              );
            }
          }, [p.isPointerDownOnContentRef, p.hasSelectionRef]),
          n.useEffect(() => {
            v.current &&
              (function (e) {
                let t = [],
                  r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                    acceptNode: (e) =>
                      e.tabIndex >= 0
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP,
                  });
                for (; r.nextNode(); ) t.push(r.currentNode);
                return t;
              })(v.current).forEach((e) => e.setAttribute("tabindex", "-1"));
          }),
          (0, o.jsx)(Z, {
            asChild: !0,
            disableOutsidePointerEvents: !1,
            onInteractOutside: c,
            onEscapeKeyDown: s,
            onPointerDownOutside: l,
            onFocusOutside: i(u, (e) => {
              e.preventDefault();
            }),
            onDismiss: p.onDismiss,
            children: (0, o.jsx)(_, {
              ...m,
              ...f,
              onPointerDown: i(f.onPointerDown, (e) => {
                (e.currentTarget.contains(e.target) && y(!0),
                  (p.hasSelectionRef.current = !1),
                  (p.isPointerDownOnContentRef.current = !0));
              }),
              ref: h,
              style: {
                ...f.style,
                userSelect: g ? "text" : void 0,
                WebkitUserSelect: g ? "text" : void 0,
                "--radix-hover-card-content-transform-origin":
                  "var(--radix-popper-transform-origin)",
                "--radix-hover-card-content-available-width":
                  "var(--radix-popper-available-width)",
                "--radix-hover-card-content-available-height":
                  "var(--radix-popper-available-height)",
                "--radix-hover-card-trigger-width":
                  "var(--radix-popper-anchor-width)",
                "--radix-hover-card-trigger-height":
                  "var(--radix-popper-anchor-height)",
              },
            }),
          })
        );
      }),
      eh = n.forwardRef((e, t) => {
        let { __scopeHoverCard: r, ...n } = e,
          i = en(r);
        return (0, o.jsx)($, { ...i, ...n, ref: t });
      });
    function eg(e) {
      return (t) => ("touch" === t.pointerType ? void 0 : e());
    }
    ((eh.displayName = "HoverCardArrow"),
      e.s(
        [
          "Arrow",
          () => eh,
          "Content",
          () => em,
          "HoverCard",
          () => ea,
          "HoverCardArrow",
          () => eh,
          "HoverCardContent",
          () => em,
          "HoverCardPortal",
          () => ef,
          "HoverCardTrigger",
          () => el,
          "Portal",
          () => ef,
          "Root",
          () => ea,
          "Trigger",
          () => el,
          "createHoverCardScope",
          () => er,
        ],
        251875,
      ));
  },
  230657,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(889655),
      n = e.i(436836),
      i = e.i(301224),
      o = "Progress",
      [a, s] = (0, r.createContextScope)(o),
      [l, u] = a(o),
      d = t.forwardRef((e, t) => {
        var r, o;
        let {
          __scopeProgress: a,
          value: s = null,
          max: u,
          getValueLabel: d = p,
          ...c
        } = e;
        (u || 0 === u) &&
          !h(u) &&
          console.error(
            ((r = `${u}`),
            `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
          );
        let f = h(u) ? u : 100;
        null === s ||
          g(s, f) ||
          console.error(
            ((o = `${s}`),
            `Invalid prop \`value\` of value \`${o}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
          );
        let y = g(s, f) ? s : null,
          w = v(y) ? d(y, f) : void 0;
        return (0, i.jsx)(l, {
          scope: a,
          value: y,
          max: f,
          children: (0, i.jsx)(n.Primitive.div, {
            "aria-valuemax": f,
            "aria-valuemin": 0,
            "aria-valuenow": v(y) ? y : void 0,
            "aria-valuetext": w,
            role: "progressbar",
            "data-state": m(y, f),
            "data-value": y ?? void 0,
            "data-max": f,
            ...c,
            ref: t,
          }),
        });
      });
    d.displayName = o;
    var c = "ProgressIndicator",
      f = t.forwardRef((e, t) => {
        let { __scopeProgress: r, ...o } = e,
          a = u(c, r);
        return (0, i.jsx)(n.Primitive.div, {
          "data-state": m(a.value, a.max),
          "data-value": a.value ?? void 0,
          "data-max": a.max,
          ...o,
          ref: t,
        });
      });
    function p(e, t) {
      return `${Math.round((e / t) * 100)}%`;
    }
    function m(e, t) {
      return null == e ? "indeterminate" : e === t ? "complete" : "loading";
    }
    function v(e) {
      return "number" == typeof e;
    }
    function h(e) {
      return v(e) && !isNaN(e) && e > 0;
    }
    function g(e, t) {
      return v(e) && !isNaN(e) && e <= t && e >= 0;
    }
    ((f.displayName = c),
      e.s([
        "Indicator",
        () => f,
        "Progress",
        () => d,
        "ProgressIndicator",
        () => f,
        "Root",
        () => d,
        "createProgressScope",
        () => s,
      ]));
  },
  19196,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(551150),
      n = e.i(889655),
      i = e.i(151879),
      o = e.i(373630),
      a = e.i(436836),
      s = e.i(282270),
      l = e.i(633439),
      u = e.i(803040),
      d = e.i(301224),
      c = "Tabs",
      [f, p] = (0, n.createContextScope)(c, [i.createRovingFocusGroupScope]),
      m = (0, i.createRovingFocusGroupScope)(),
      [v, h] = f(c),
      g = t.forwardRef((e, t) => {
        let {
            __scopeTabs: r,
            value: n,
            onValueChange: i,
            defaultValue: o,
            orientation: c = "horizontal",
            dir: f,
            activationMode: p = "automatic",
            ...m
          } = e,
          h = (0, s.useDirection)(f),
          [g, y] = (0, l.useControllableState)({
            prop: n,
            onChange: i,
            defaultProp: o,
          });
        return (0, d.jsx)(v, {
          scope: r,
          baseId: (0, u.useId)(),
          value: g,
          onValueChange: y,
          orientation: c,
          dir: h,
          activationMode: p,
          children: (0, d.jsx)(a.Primitive.div, {
            dir: h,
            "data-orientation": c,
            ...m,
            ref: t,
          }),
        });
      });
    g.displayName = c;
    var y = "TabsList",
      w = t.forwardRef((e, t) => {
        let { __scopeTabs: r, loop: n = !0, ...o } = e,
          s = h(y, r),
          l = m(r);
        return (0, d.jsx)(i.Root, {
          asChild: !0,
          ...l,
          orientation: s.orientation,
          dir: s.dir,
          loop: n,
          children: (0, d.jsx)(a.Primitive.div, {
            role: "tablist",
            "aria-orientation": s.orientation,
            ...o,
            ref: t,
          }),
        });
      });
    w.displayName = y;
    var b = "TabsTrigger",
      x = t.forwardRef((e, t) => {
        let { __scopeTabs: n, value: o, disabled: s = !1, ...l } = e,
          u = h(b, n),
          c = m(n),
          f = E(u.baseId, o),
          p = N(u.baseId, o),
          v = o === u.value;
        return (0, d.jsx)(i.Item, {
          asChild: !0,
          ...c,
          focusable: !s,
          active: v,
          children: (0, d.jsx)(a.Primitive.button, {
            type: "button",
            role: "tab",
            "aria-selected": v,
            "aria-controls": p,
            "data-state": v ? "active" : "inactive",
            "data-disabled": s ? "" : void 0,
            disabled: s,
            id: f,
            ...l,
            ref: t,
            onMouseDown: (0, r.composeEventHandlers)(e.onMouseDown, (e) => {
              s || 0 !== e.button || !1 !== e.ctrlKey
                ? e.preventDefault()
                : u.onValueChange(o);
            }),
            onKeyDown: (0, r.composeEventHandlers)(e.onKeyDown, (e) => {
              [" ", "Enter"].includes(e.key) && u.onValueChange(o);
            }),
            onFocus: (0, r.composeEventHandlers)(e.onFocus, () => {
              let e = "manual" !== u.activationMode;
              v || s || !e || u.onValueChange(o);
            }),
          }),
        });
      });
    x.displayName = b;
    var R = "TabsContent",
      C = t.forwardRef((e, r) => {
        let { __scopeTabs: n, value: i, forceMount: s, children: l, ...u } = e,
          c = h(R, n),
          f = E(c.baseId, i),
          p = N(c.baseId, i),
          m = i === c.value,
          v = t.useRef(m);
        return (
          t.useEffect(() => {
            let e = requestAnimationFrame(() => (v.current = !1));
            return () => cancelAnimationFrame(e);
          }, []),
          (0, d.jsx)(o.Presence, {
            present: s || m,
            children: ({ present: t }) =>
              (0, d.jsx)(a.Primitive.div, {
                "data-state": m ? "active" : "inactive",
                "data-orientation": c.orientation,
                role: "tabpanel",
                "aria-labelledby": f,
                hidden: !t,
                id: p,
                tabIndex: 0,
                ...u,
                ref: r,
                style: {
                  ...e.style,
                  animationDuration: v.current ? "0s" : void 0,
                },
                children: t && l,
              }),
          })
        );
      });
    function E(e, t) {
      return `${e}-trigger-${t}`;
    }
    function N(e, t) {
      return `${e}-content-${t}`;
    }
    ((C.displayName = R),
      e.s([
        "Content",
        () => C,
        "List",
        () => w,
        "Root",
        () => g,
        "Tabs",
        () => g,
        "TabsContent",
        () => C,
        "TabsList",
        () => w,
        "TabsTrigger",
        () => x,
        "Trigger",
        () => x,
        "createTabsScope",
        () => p,
      ]));
  },
  343659,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(551150),
      n = e.i(45616),
      i = e.i(889655),
      o = e.i(633439),
      a = e.i(968254),
      s = e.i(736891),
      l = e.i(436836),
      u = e.i(301224),
      d = "Switch",
      [c, f] = (0, i.createContextScope)(d),
      [p, m] = c(d),
      v = t.forwardRef((e, i) => {
        let {
            __scopeSwitch: a,
            name: s,
            checked: d,
            defaultChecked: c,
            required: f,
            disabled: m,
            value: v = "on",
            onCheckedChange: h,
            ...g
          } = e,
          [b, x] = t.useState(null),
          R = (0, n.useComposedRefs)(i, (e) => x(e)),
          C = t.useRef(!1),
          E = !b || !!b.closest("form"),
          [N = !1, P] = (0, o.useControllableState)({
            prop: d,
            defaultProp: c,
            onChange: h,
          });
        return (0, u.jsxs)(p, {
          scope: a,
          checked: N,
          disabled: m,
          children: [
            (0, u.jsx)(l.Primitive.button, {
              type: "button",
              role: "switch",
              "aria-checked": N,
              "aria-required": f,
              "data-state": w(N),
              "data-disabled": m ? "" : void 0,
              disabled: m,
              value: v,
              ...g,
              ref: R,
              onClick: (0, r.composeEventHandlers)(e.onClick, (e) => {
                (P((e) => !e),
                  E &&
                    ((C.current = e.isPropagationStopped()),
                    C.current || e.stopPropagation()));
              }),
            }),
            E &&
              (0, u.jsx)(y, {
                control: b,
                bubbles: !C.current,
                name: s,
                value: v,
                checked: N,
                required: f,
                disabled: m,
                style: { transform: "translateX(-100%)" },
              }),
          ],
        });
      });
    v.displayName = d;
    var h = "SwitchThumb",
      g = t.forwardRef((e, t) => {
        let { __scopeSwitch: r, ...n } = e,
          i = m(h, r);
        return (0, u.jsx)(l.Primitive.span, {
          "data-state": w(i.checked),
          "data-disabled": i.disabled ? "" : void 0,
          ...n,
          ref: t,
        });
      });
    g.displayName = h;
    var y = (e) => {
      let { control: r, checked: n, bubbles: i = !0, ...o } = e,
        l = t.useRef(null),
        d = (0, a.usePrevious)(n),
        c = (0, s.useSize)(r);
      return (
        t.useEffect(() => {
          let e = l.current,
            t = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "checked",
            ).set;
          if (d !== n && t) {
            let r = new Event("click", { bubbles: i });
            (t.call(e, n), e.dispatchEvent(r));
          }
        }, [d, n, i]),
        (0, u.jsx)("input", {
          type: "checkbox",
          "aria-hidden": !0,
          defaultChecked: n,
          ...o,
          tabIndex: -1,
          ref: l,
          style: {
            ...e.style,
            ...c,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
          },
        })
      );
    };
    function w(e) {
      return e ? "checked" : "unchecked";
    }
    e.s([
      "Root",
      () => v,
      "Switch",
      () => v,
      "SwitchThumb",
      () => g,
      "Thumb",
      () => g,
      "createSwitchScope",
      () => f,
    ]);
  },
  69455,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(277218),
      i = e.i(403055);
    let o = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Root, {
        className: (0, i.cn)(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          e,
        ),
        ref: o,
        ...r,
      }),
    );
    o.displayName = n.Root.displayName;
    let a = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Image, {
        className: (0, i.cn)("aspect-square h-full w-full", e),
        ref: o,
        ...r,
      }),
    );
    a.displayName = n.Image.displayName;
    let s = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Fallback, {
        className: (0, i.cn)(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          e,
        ),
        ref: o,
        ...r,
      }),
    );
    ((s.displayName = n.Fallback.displayName),
      e.s([
        "Avatar",
        () => o,
        "AvatarFallback",
        () => s,
        "AvatarImage",
        () => a,
      ]));
  },
  366052,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(403055),
      i = e.i(890446);
    let o = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)("div", {
        className: (0, n.cn)(
          "rounded-lg border bg-card text-card-foreground shadow-2xs",
          e,
        ),
        ref: i,
        ...r,
        "data-v0-t": "card",
      }),
    );
    o.displayName = "Card";
    let a = r.forwardRef(({ className: e, asChild: r, ...o }, a) => {
      let s = r ? i.Slot : "div";
      return (0, t.jsx)(s, {
        className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
        ref: a,
        ...o,
      });
    });
    a.displayName = "CardHeader";
    let s = r.forwardRef(({ className: e, asChild: r, ...o }, a) => {
      let s = r ? i.Slot : "h3";
      return (0, t.jsx)(s, {
        className: (0, n.cn)(
          "text-2xl font-semibold leading-none tracking-tight",
          e,
        ),
        ref: a,
        ...o,
      });
    });
    s.displayName = "CardTitle";
    let l = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)("p", {
        className: (0, n.cn)("text-sm text-muted-foreground", e),
        ref: i,
        ...r,
      }),
    );
    l.displayName = "CardDescription";
    let u = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)("div", { className: (0, n.cn)("p-6 pt-0", e), ref: i, ...r }),
    );
    u.displayName = "CardContent";
    let d = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)("div", {
        className: (0, n.cn)("flex items-center p-6 pt-0", e),
        ref: i,
        ...r,
      }),
    );
    ((d.displayName = "CardFooter"),
      e.s([
        "Card",
        () => o,
        "CardContent",
        () => u,
        "CardDescription",
        () => l,
        "CardFooter",
        () => d,
        "CardHeader",
        () => a,
        "CardTitle",
        () => s,
      ]));
  },
  980691,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(966864),
      i = e.i(731037),
      o = e.i(403055);
    let a = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(n.Root, {
        className: (0, o.cn)("grid gap-2", e),
        ...r,
        ref: i,
      }),
    );
    a.displayName = n.Root.displayName;
    let s = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)(n.Item, {
        className: (0, o.cn)(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          e,
        ),
        ref: a,
        ...r,
        children: (0, t.jsx)(n.Indicator, {
          className: "flex items-center justify-center",
          children: (0, t.jsx)(i.Circle, {
            className: "h-2.5 w-2.5 fill-current text-current",
          }),
        }),
      }),
    );
    ((s.displayName = n.Item.displayName),
      e.s(["RadioGroup", () => a, "RadioGroupItem", () => s]));
  },
  762848,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(454389),
      i = e.i(403055);
    let o = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsxs)(n.Root, {
        className: (0, i.cn)(
          "relative flex w-full touch-none select-none items-center",
          e,
        ),
        ref: o,
        ...r,
        children: [
          (0, t.jsx)(n.Track, {
            className:
              "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
            children: (0, t.jsx)(n.Range, {
              className: "absolute h-full bg-primary",
            }),
          }),
          (0, t.jsx)(n.Thumb, {
            className:
              "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          }),
        ],
      }),
    );
    ((o.displayName = n.Root.displayName), e.s(["Slider", () => o]));
  },
  187976,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(461884),
      i = e.i(89440),
      o = e.i(403055);
    let a = (0, i.cva)(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      ),
      s = r.forwardRef(({ className: e, ...r }, i) =>
        (0, t.jsx)(n.Root, { className: (0, o.cn)(a(), e), ref: i, ...r }),
      );
    ((s.displayName = n.Root.displayName), e.s(["Label", () => s]));
  },
  820648,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(716580),
      i = e.i(89440),
      o = e.i(800443),
      a = e.i(403055);
    let s = r.forwardRef(({ className: e, children: r, ...i }, o) =>
      (0, t.jsxs)(n.Root, {
        className: (0, a.cn)(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          e,
        ),
        ref: o,
        ...i,
        children: [r, (0, t.jsx)(m, {})],
      }),
    );
    s.displayName = n.Root.displayName;
    let l = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(n.List, {
        className: (0, a.cn)(
          "group flex flex-1 list-none items-center justify-center space-x-1",
          e,
        ),
        ref: i,
        ...r,
      }),
    );
    l.displayName = n.List.displayName;
    let u = n.Item,
      d = (0, i.cva)(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50",
      ),
      c = r.forwardRef(({ className: e, children: r, ...i }, s) =>
        (0, t.jsxs)(n.Trigger, {
          className: (0, a.cn)(d(), "group", e),
          ref: s,
          ...i,
          children: [
            r,
            " ",
            (0, t.jsx)(o.ChevronDown, {
              "aria-hidden": "true",
              className:
                "relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180",
            }),
          ],
        }),
      );
    c.displayName = n.Trigger.displayName;
    let f = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(n.Content, {
        className: (0, a.cn)(
          "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
          e,
        ),
        ref: i,
        ...r,
      }),
    );
    f.displayName = n.Content.displayName;
    let p = n.Link,
      m = r.forwardRef(({ className: e, ...r }, i) =>
        (0, t.jsx)("div", {
          className: (0, a.cn)("absolute left-0 top-full flex justify-center"),
          children: (0, t.jsx)(n.Viewport, {
            className: (0, a.cn)(
              "origin-top-center relative mt-1.5 h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--radix-navigation-menu-viewport-width]",
              e,
            ),
            ref: i,
            ...r,
          }),
        }),
      );
    m.displayName = n.Viewport.displayName;
    let v = r.forwardRef(({ className: e, ...r }, i) =>
      (0, t.jsx)(n.Indicator, {
        className: (0, a.cn)(
          "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
          e,
        ),
        ref: i,
        ...r,
        children: (0, t.jsx)("div", {
          className:
            "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md",
        }),
      }),
    );
    ((v.displayName = n.Indicator.displayName),
      e.s([
        "NavigationMenu",
        () => s,
        "NavigationMenuContent",
        () => f,
        "NavigationMenuIndicator",
        () => v,
        "NavigationMenuItem",
        () => u,
        "NavigationMenuLink",
        () => p,
        "NavigationMenuList",
        () => l,
        "NavigationMenuTrigger",
        () => c,
        "NavigationMenuViewport",
        () => m,
        "navigationMenuTriggerStyle",
        () => d,
      ]));
  },
  880996,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(251875),
      i = e.i(403055);
    let o = n.Root,
      a = n.Trigger,
      s = r.forwardRef(
        ({ className: e, align: r = "center", sideOffset: o = 4, ...a }, s) =>
          (0, t.jsx)(n.Content, {
            align: r,
            className: (0, i.cn)(
              "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              e,
            ),
            ref: s,
            sideOffset: o,
            ...a,
          }),
      );
    ((s.displayName = n.Content.displayName),
      e.s([
        "HoverCard",
        () => o,
        "HoverCardContent",
        () => s,
        "HoverCardTrigger",
        () => a,
      ]));
  },
  806582,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(230657),
      i = e.i(403055);
    let o = r.forwardRef(({ className: e, value: r, ...o }, a) =>
      (0, t.jsx)(n.Root, {
        className: (0, i.cn)(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          e,
        ),
        ref: a,
        ...o,
        children: (0, t.jsx)(n.Indicator, {
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (r || 0)}%)` },
        }),
      }),
    );
    ((o.displayName = n.Root.displayName), e.s(["Progress", () => o]));
  },
  774007,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(19196),
      i = e.i(403055);
    let o = n.Root,
      a = r.forwardRef(({ className: e, ...r }, o) =>
        (0, t.jsx)(n.List, {
          className: (0, i.cn)(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            e,
          ),
          ref: o,
          ...r,
        }),
      );
    a.displayName = n.List.displayName;
    let s = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Trigger, {
        className: (0, i.cn)(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-2xs",
          e,
        ),
        ref: o,
        ...r,
      }),
    );
    s.displayName = n.Trigger.displayName;
    let l = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Content, {
        className: (0, i.cn)(
          "mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          e,
        ),
        ref: o,
        ...r,
      }),
    );
    ((l.displayName = n.Content.displayName),
      e.s([
        "Tabs",
        () => o,
        "TabsContent",
        () => l,
        "TabsList",
        () => a,
        "TabsTrigger",
        () => s,
      ]));
  },
  686636,
  (e) => {
    "use strict";
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(343659),
      i = e.i(403055);
    let o = r.forwardRef(({ className: e, ...r }, o) =>
      (0, t.jsx)(n.Root, {
        className: (0, i.cn)(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          e,
        ),
        ...r,
        ref: o,
        children: (0, t.jsx)(n.Thumb, {
          className: (0, i.cn)(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          ),
        }),
      }),
    );
    ((o.displayName = n.Root.displayName), e.s(["Switch", () => o]));
  },
]);
