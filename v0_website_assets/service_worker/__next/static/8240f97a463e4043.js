(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  168034,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = (e) => e instanceof Date,
      a = (e) => null == e,
      s = (e) => !a(e) && !Array.isArray(e) && "object" == typeof e && !r(e),
      l = (e) =>
        s(e) && e.target
          ? "checkbox" === e.target.type
            ? e.target.checked
            : e.target.value
          : e,
      i = (e, t) => e.has(t.substring(0, t.search(/\.\d+(\.|$)/)) || t),
      u =
        "undefined" != typeof window &&
        void 0 !== window.HTMLElement &&
        "undefined" != typeof document;
    function n(e) {
      let t,
        r = Array.isArray(e);
      if (e instanceof Date) t = new Date(e);
      else if (e instanceof Set) t = new Set(e);
      else {
        let a;
        if (
          !(!(u && (e instanceof Blob || e instanceof FileList)) && (r || s(e)))
        )
          return e;
        if (
          ((t = r ? [] : {}),
          r ||
            (s((a = e.constructor && e.constructor.prototype)) &&
              a.hasOwnProperty("isPrototypeOf")))
        )
          for (let r in e) e.hasOwnProperty(r) && (t[r] = n(e[r]));
        else t = e;
      }
      return t;
    }
    var o = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
      f = (e) => void 0 === e,
      d = (e, t, r) => {
        if (!t || !s(e)) return r;
        let l = o(t.split(/[,[\].]+?/)).reduce((e, t) => (a(e) ? e : e[t]), e);
        return f(l) || l === e ? (f(e[t]) ? r : e[t]) : l;
      };
    let c = "blur",
      y = "onChange",
      m = "onSubmit",
      p = "maxLength",
      g = "minLength",
      h = "pattern",
      _ = "required",
      v = t.default.createContext(null),
      b = () => t.default.useContext(v),
      A = (e) => {
        let { children: r, ...a } = e;
        return t.default.createElement(v.Provider, { value: a }, r);
      };
    var x = (e, t, r, a = !0) => {
        let s = { defaultValues: t._defaultValues };
        for (let l in e)
          Object.defineProperty(s, l, {
            get: () => (
              "all" !== t._proxyFormState[l] &&
                (t._proxyFormState[l] = !a || "all"),
              r && (r[l] = !0),
              e[l]
            ),
          });
        return s;
      },
      V = (e) => s(e) && !Object.keys(e).length,
      F = (e, t, r, a) => {
        r(e);
        let { name: s, ...l } = e;
        return (
          V(l) ||
          Object.keys(l).length >= Object.keys(t).length ||
          Object.keys(l).find((e) => t[e] === (!a || "all"))
        );
      },
      S = (e) => (Array.isArray(e) ? e : [e]),
      w = (e, t, r) =>
        r && t
          ? e === t
          : !e ||
            !t ||
            e === t ||
            S(e).some((e) => e && (e.startsWith(t) || t.startsWith(e)));
    function k(e) {
      let r = t.default.useRef(e);
      ((r.current = e),
        t.default.useEffect(() => {
          let t =
            !e.disabled &&
            r.current.subject &&
            r.current.subject.subscribe({ next: r.current.next });
          return () => {
            t && t.unsubscribe();
          };
        }, [e.disabled]));
    }
    function D(e) {
      let r = b(),
        { control: a = r.control, disabled: s, name: l, exact: i } = e || {},
        [u, n] = t.default.useState(a._formState),
        o = t.default.useRef(!0),
        f = t.default.useRef({
          isDirty: !1,
          isLoading: !1,
          dirtyFields: !1,
          touchedFields: !1,
          isValidating: !1,
          isValid: !1,
          errors: !1,
        }),
        d = t.default.useRef(l);
      return (
        (d.current = l),
        k({
          disabled: s,
          next: (e) =>
            o.current &&
            w(d.current, e.name, i) &&
            F(e, f.current, a._updateFormState) &&
            n({ ...a._formState, ...e }),
          subject: a._subjects.state,
        }),
        t.default.useEffect(
          () => (
            (o.current = !0),
            f.current.isValid && a._updateValid(!0),
            () => {
              o.current = !1;
            }
          ),
          [a],
        ),
        x(u, a, f.current, !1)
      );
    }
    var C = (e, t, r, a, s) =>
      "string" == typeof e
        ? (a && t.watch.add(e), d(r, e, s))
        : Array.isArray(e)
          ? e.map((e) => (a && t.watch.add(e), d(r, e)))
          : (a && (t.watchAll = !0), r);
    function E(e) {
      let r = b(),
        {
          control: a = r.control,
          name: s,
          defaultValue: l,
          disabled: i,
          exact: u,
        } = e || {},
        o = t.default.useRef(s);
      ((o.current = s),
        k({
          disabled: i,
          subject: a._subjects.values,
          next: (e) => {
            w(o.current, e.name, u) &&
              d(n(C(o.current, a._names, e.values || a._formValues, !1, l)));
          },
        }));
      let [f, d] = t.default.useState(a._getWatch(s, l));
      return (t.default.useEffect(() => a._removeUnmounted()), f);
    }
    var O = (e) => o(e.replace(/["|']|\]/g, "").split(/\.|\[/));
    function j(e, t, r) {
      let a = -1,
        l = /^\w*$/.test(t) ? [t] : O(t),
        i = l.length,
        u = i - 1;
      for (; ++a < i; ) {
        let t = l[a],
          i = r;
        if (a !== u) {
          let r = e[t];
          i = s(r) || Array.isArray(r) ? r : isNaN(+l[a + 1]) ? {} : [];
        }
        ((e[t] = i), (e = e[t]));
      }
      return e;
    }
    function T(e) {
      let r = b(),
        { name: a, control: s = r.control, shouldUnregister: u } = e,
        o = i(s._names.array, a),
        y = E({
          control: s,
          name: a,
          defaultValue: d(
            s._formValues,
            a,
            d(s._defaultValues, a, e.defaultValue),
          ),
          exact: !0,
        }),
        m = D({ control: s, name: a }),
        p = t.default.useRef(s.register(a, { ...e.rules, value: y }));
      return (
        (p.current = s.register(a, e.rules)),
        t.default.useEffect(() => {
          let e = s._options.shouldUnregister || u,
            t = (e, t) => {
              let r = d(s._fields, e);
              r && (r._f.mount = t);
            };
          if ((t(a, !0), e)) {
            let e = n(d(s._options.defaultValues, a));
            (j(s._defaultValues, a, e),
              f(d(s._formValues, a)) && j(s._formValues, a, e));
          }
          return () => {
            (o ? e && !s._state.action : e) ? s.unregister(a) : t(a, !1);
          };
        }, [a, s, o, u]),
        {
          field: {
            name: a,
            value: y,
            onChange: t.default.useCallback(
              (e) =>
                p.current.onChange({
                  target: { value: l(e), name: a },
                  type: "change",
                }),
              [a],
            ),
            onBlur: t.default.useCallback(
              () =>
                p.current.onBlur({
                  target: { value: d(s._formValues, a), name: a },
                  type: c,
                }),
              [a, s],
            ),
            ref: (e) => {
              let t = d(s._fields, a);
              t &&
                e &&
                (t._f.ref = {
                  focus: () => e.focus(),
                  select: () => e.select(),
                  setCustomValidity: (t) => e.setCustomValidity(t),
                  reportValidity: () => e.reportValidity(),
                });
            },
          },
          formState: m,
          fieldState: Object.defineProperties(
            {},
            {
              invalid: { enumerable: !0, get: () => !!d(m.errors, a) },
              isDirty: { enumerable: !0, get: () => !!d(m.dirtyFields, a) },
              isTouched: { enumerable: !0, get: () => !!d(m.touchedFields, a) },
              error: { enumerable: !0, get: () => d(m.errors, a) },
            },
          ),
        }
      );
    }
    let B = (e) => e.render(T(e));
    function R(e) {
      let r = b(),
        [a, s] = t.default.useState(!1),
        {
          control: l = r.control,
          onSubmit: i,
          children: u,
          action: n,
          method: o = "post",
          headers: f,
          encType: c,
          onError: y,
          render: m,
          onSuccess: p,
          validateStatus: g,
          ...h
        } = e,
        _ = async (t) => {
          let r = !1,
            a = "";
          (await l.handleSubmit(async (e) => {
            let s = new FormData(),
              u = "";
            try {
              u = JSON.stringify(e);
            } catch (e) {}
            for (let t of l._names.mount) s.append(t, d(e, t));
            if (
              (i &&
                (await i({
                  data: e,
                  event: t,
                  method: o,
                  formData: s,
                  formDataJson: u,
                })),
              n)
            )
              try {
                let e = [f && f["Content-Type"], c].some(
                    (e) => e && e.includes("json"),
                  ),
                  t = await fetch(n, {
                    method: o,
                    headers: { ...f, ...(c ? { "Content-Type": c } : {}) },
                    body: e ? u : s,
                  });
                t && (g ? !g(t.status) : t.status < 200 || t.status >= 300)
                  ? ((r = !0), y && y({ response: t }), (a = String(t.status)))
                  : p && p({ response: t });
              } catch (e) {
                ((r = !0), y && y({ error: e }));
              }
          })(t),
            r &&
              e.control &&
              (e.control._subjects.state.next({ isSubmitSuccessful: !1 }),
              e.control.setError("root.server", { type: a })));
        };
      return (
        t.default.useEffect(() => {
          s(!0);
        }, []),
        m
          ? t.default.createElement(t.default.Fragment, null, m({ submit: _ }))
          : t.default.createElement(
              "form",
              {
                noValidate: a,
                action: n,
                method: o,
                encType: c,
                onSubmit: _,
                ...h,
              },
              u,
            )
      );
    }
    var U = (e, t, r, a, s) =>
      t
        ? {
            ...r[e],
            types: { ...(r[e] && r[e].types ? r[e].types : {}), [a]: s || !0 },
          }
        : {};
    let L = (e, t, r) => {
      for (let a of r || Object.keys(e)) {
        let r = d(e, a);
        if (r) {
          let { _f: e, ...a } = r;
          if (e && t(e.name)) {
            if (e.ref.focus) {
              e.ref.focus();
              break;
            } else if (e.refs && e.refs[0].focus) {
              e.refs[0].focus();
              break;
            }
          } else s(a) && L(a, t);
        }
      }
    };
    var M = () => {
        let e =
          "undefined" == typeof performance
            ? Date.now()
            : 1e3 * performance.now();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
          let r = (16 * Math.random() + e) % 16 | 0;
          return ("x" == t ? r : (3 & r) | 8).toString(16);
        });
      },
      N = (e, t, r = {}) =>
        r.shouldFocus || f(r.shouldFocus)
          ? r.focusName || `${e}.${f(r.focusIndex) ? t : r.focusIndex}.`
          : "",
      P = (e) => ({
        isOnSubmit: !e || e === m,
        isOnBlur: "onBlur" === e,
        isOnChange: e === y,
        isOnAll: "all" === e,
        isOnTouch: "onTouched" === e,
      }),
      $ = (e, t, r) =>
        !r &&
        (t.watchAll ||
          t.watch.has(e) ||
          [...t.watch].some(
            (t) => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length)),
          )),
      q = (e, t, r) => {
        let a = o(d(e, r));
        return (j(a, "root", t[r]), j(e, r, a), e);
      },
      W = (e) => "function" == typeof e,
      I = (e) => {
        if (!u) return !1;
        let t = e ? e.ownerDocument : 0;
        return (
          e instanceof
          (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
        );
      },
      H = (e) => "string" == typeof e;
    let K = { value: !1, isValid: !1 },
      J = { value: !0, isValid: !0 };
    var z = (e) => {
      if (Array.isArray(e)) {
        if (e.length > 1) {
          let t = e
            .filter((e) => e && e.checked && !e.disabled)
            .map((e) => e.value);
          return { value: t, isValid: !!t.length };
        }
        return e[0].checked && !e[0].disabled
          ? e[0].attributes && !f(e[0].attributes.value)
            ? f(e[0].value) || "" === e[0].value
              ? J
              : { value: e[0].value, isValid: !0 }
            : J
          : K;
      }
      return K;
    };
    let G = { isValid: !1, value: null };
    var Q = (e) =>
      Array.isArray(e)
        ? e.reduce(
            (e, t) =>
              t && t.checked && !t.disabled
                ? { isValid: !0, value: t.value }
                : e,
            G,
          )
        : G;
    function X(e, t, r = "validate") {
      if (
        H(e) ||
        (Array.isArray(e) && e.every(H)) ||
        ("boolean" == typeof e && !e)
      )
        return { type: r, message: H(e) ? e : "", ref: t };
    }
    var Y = (e) =>
        !s(e) || e instanceof RegExp ? { value: e, message: "" } : e,
      Z = async (e, t, r, l, i) => {
        let {
            ref: u,
            refs: n,
            required: o,
            maxLength: c,
            minLength: y,
            min: m,
            max: v,
            pattern: b,
            validate: A,
            name: x,
            valueAsNumber: F,
            mount: S,
            disabled: w,
          } = e._f,
          k = d(t, x);
        if (!S || w) return {};
        let D = n ? n[0] : u,
          C = (e) => {
            l &&
              D.reportValidity &&
              (D.setCustomValidity("boolean" == typeof e ? "" : e || ""),
              D.reportValidity());
          },
          E = {},
          O = "radio" === u.type,
          j = "checkbox" === u.type,
          T =
            ((F || "file" === u.type) && f(u.value) && f(k)) ||
            (I(u) && "" === u.value) ||
            "" === k ||
            (Array.isArray(k) && !k.length),
          B = U.bind(null, x, r, E),
          R = (e, t, r, a = p, s = g) => {
            let l = e ? t : r;
            E[x] = { type: e ? a : s, message: l, ref: u, ...B(e ? a : s, l) };
          };
        if (
          i
            ? !Array.isArray(k) || !k.length
            : o &&
              ((!(O || j) && (T || a(k))) ||
                ("boolean" == typeof k && !k) ||
                (j && !z(n).isValid) ||
                (O && !Q(n).isValid))
        ) {
          let { value: e, message: t } = H(o)
            ? { value: !!o, message: o }
            : Y(o);
          if (e && ((E[x] = { type: _, message: t, ref: D, ...B(_, t) }), !r))
            return (C(t), E);
        }
        if (!T && (!a(m) || !a(v))) {
          let e,
            t,
            s = Y(v),
            l = Y(m);
          if (a(k) || isNaN(k)) {
            let r = u.valueAsDate || new Date(k),
              a = (e) => new Date(new Date().toDateString() + " " + e),
              i = "time" == u.type,
              n = "week" == u.type;
            ("string" == typeof s.value &&
              k &&
              (e = i
                ? a(k) > a(s.value)
                : n
                  ? k > s.value
                  : r > new Date(s.value)),
              "string" == typeof l.value &&
                k &&
                (t = i
                  ? a(k) < a(l.value)
                  : n
                    ? k < l.value
                    : r < new Date(l.value)));
          } else {
            let r = u.valueAsNumber || (k ? +k : k);
            (a(s.value) || (e = r > s.value), a(l.value) || (t = r < l.value));
          }
          if ((e || t) && (R(!!e, s.message, l.message, "max", "min"), !r))
            return (C(E[x].message), E);
        }
        if (
          (c || y) &&
          !T &&
          ("string" == typeof k || (i && Array.isArray(k)))
        ) {
          let e = Y(c),
            t = Y(y),
            s = !a(e.value) && k.length > +e.value,
            l = !a(t.value) && k.length < +t.value;
          if ((s || l) && (R(s, e.message, t.message), !r))
            return (C(E[x].message), E);
        }
        if (b && !T && "string" == typeof k) {
          let { value: e, message: t } = Y(b);
          if (
            e instanceof RegExp &&
            !k.match(e) &&
            ((E[x] = { type: h, message: t, ref: u, ...B(h, t) }), !r)
          )
            return (C(t), E);
        }
        if (A) {
          if (W(A)) {
            let e = X(await A(k, t), D);
            if (e && ((E[x] = { ...e, ...B("validate", e.message) }), !r))
              return (C(e.message), E);
          } else if (s(A)) {
            let e = {};
            for (let a in A) {
              if (!V(e) && !r) break;
              let s = X(await A[a](k, t), D, a);
              s &&
                ((e = { ...s, ...B(a, s.message) }),
                C(s.message),
                r && (E[x] = e));
            }
            if (!V(e) && ((E[x] = { ref: D, ...e }), !r)) return E;
          }
        }
        return (C(!0), E);
      };
    function ee(e, t) {
      return [...e, ...S(t)];
    }
    var et = (e) => (Array.isArray(e) ? e.map(() => void 0) : void 0);
    function er(e, t, r) {
      return [...e.slice(0, t), ...S(r), ...e.slice(t)];
    }
    var ea = (e, t, r) =>
      Array.isArray(e)
        ? (f(e[r]) && (e[r] = void 0), e.splice(r, 0, e.splice(t, 1)[0]), e)
        : [];
    function es(e, t) {
      return [...S(t), ...S(e)];
    }
    var el = (e, t) =>
        f(t)
          ? []
          : (function (e, t) {
              let r = 0,
                a = [...e];
              for (let e of t) (a.splice(e - r, 1), r++);
              return o(a).length ? a : [];
            })(
              e,
              S(t).sort((e, t) => e - t),
            ),
      ei = (e, t, r) => {
        e[t] = [e[r], (e[r] = e[t])][0];
      };
    function eu(e, t) {
      let r = Array.isArray(t) ? t : /^\w*$/.test(t) ? [t] : O(t),
        a =
          1 === r.length
            ? e
            : (function (e, t) {
                let r = t.slice(0, -1).length,
                  a = 0;
                for (; a < r; ) e = f(e) ? a++ : e[t[a++]];
                return e;
              })(e, r),
        l = r.length - 1,
        i = r[l];
      return (
        a && delete a[i],
        0 !== l &&
          ((s(a) && V(a)) ||
            (Array.isArray(a) &&
              (function (e) {
                for (let t in e) if (e.hasOwnProperty(t) && !f(e[t])) return !1;
                return !0;
              })(a))) &&
          eu(e, r.slice(0, -1)),
        e
      );
    }
    var en = (e, t, r) => ((e[t] = r), e);
    function eo(e) {
      let r = b(),
        {
          control: a = r.control,
          name: s,
          keyName: l = "id",
          shouldUnregister: i,
        } = e,
        [u, o] = t.default.useState(a._getFieldArray(s)),
        f = t.default.useRef(a._getFieldArray(s).map(M)),
        c = t.default.useRef(u),
        y = t.default.useRef(s),
        m = t.default.useRef(!1);
      ((y.current = s),
        (c.current = u),
        a._names.array.add(s),
        e.rules && a.register(s, e.rules),
        k({
          next: ({ values: e, name: t }) => {
            if (t === y.current || !t) {
              let t = d(e, y.current);
              Array.isArray(t) && (o(t), (f.current = t.map(M)));
            }
          },
          subject: a._subjects.array,
        }));
      let p = t.default.useCallback(
        (e) => {
          ((m.current = !0), a._updateFieldArray(s, e));
        },
        [a, s],
      );
      return (
        t.default.useEffect(() => {
          if (
            ((a._state.action = !1),
            $(s, a._names) && a._subjects.state.next({ ...a._formState }),
            m.current &&
              (!P(a._options.mode).isOnSubmit || a._formState.isSubmitted))
          )
            if (a._options.resolver)
              a._executeSchema([s]).then((e) => {
                let t = d(e.errors, s),
                  r = d(a._formState.errors, s);
                (r
                  ? (!t && r.type) ||
                    (t && (r.type !== t.type || r.message !== t.message))
                  : t && t.type) &&
                  (t
                    ? j(a._formState.errors, s, t)
                    : eu(a._formState.errors, s),
                  a._subjects.state.next({ errors: a._formState.errors }));
              });
            else {
              let e = d(a._fields, s);
              e &&
                e._f &&
                Z(
                  e,
                  a._formValues,
                  "all" === a._options.criteriaMode,
                  a._options.shouldUseNativeValidation,
                  !0,
                ).then(
                  (e) =>
                    !V(e) &&
                    a._subjects.state.next({
                      errors: q(a._formState.errors, e, s),
                    }),
                );
            }
          (a._subjects.values.next({ name: s, values: { ...a._formValues } }),
            a._names.focus &&
              L(a._fields, (e) => !!e && e.startsWith(a._names.focus || "")),
            (a._names.focus = ""),
            a._updateValid(),
            (m.current = !1));
        }, [u, s, a]),
        t.default.useEffect(
          () => (
            d(a._formValues, s) || a._updateFieldArray(s),
            () => {
              (a._options.shouldUnregister || i) && a.unregister(s);
            }
          ),
          [s, a, l, i],
        ),
        {
          swap: t.default.useCallback(
            (e, t) => {
              let r = a._getFieldArray(s);
              (ei(r, e, t),
                ei(f.current, e, t),
                p(r),
                o(r),
                a._updateFieldArray(s, r, ei, { argA: e, argB: t }, !1));
            },
            [p, s, a],
          ),
          move: t.default.useCallback(
            (e, t) => {
              let r = a._getFieldArray(s);
              (ea(r, e, t),
                ea(f.current, e, t),
                p(r),
                o(r),
                a._updateFieldArray(s, r, ea, { argA: e, argB: t }, !1));
            },
            [p, s, a],
          ),
          prepend: t.default.useCallback(
            (e, t) => {
              let r = S(n(e)),
                l = es(a._getFieldArray(s), r);
              ((a._names.focus = N(s, 0, t)),
                (f.current = es(f.current, r.map(M))),
                p(l),
                o(l),
                a._updateFieldArray(s, l, es, { argA: et(e) }));
            },
            [p, s, a],
          ),
          append: t.default.useCallback(
            (e, t) => {
              let r = S(n(e)),
                l = ee(a._getFieldArray(s), r);
              ((a._names.focus = N(s, l.length - 1, t)),
                (f.current = ee(f.current, r.map(M))),
                p(l),
                o(l),
                a._updateFieldArray(s, l, ee, { argA: et(e) }));
            },
            [p, s, a],
          ),
          remove: t.default.useCallback(
            (e) => {
              let t = el(a._getFieldArray(s), e);
              ((f.current = el(f.current, e)),
                p(t),
                o(t),
                a._updateFieldArray(s, t, el, { argA: e }));
            },
            [p, s, a],
          ),
          insert: t.default.useCallback(
            (e, t, r) => {
              let l = S(n(t)),
                i = er(a._getFieldArray(s), e, l);
              ((a._names.focus = N(s, e, r)),
                (f.current = er(f.current, e, l.map(M))),
                p(i),
                o(i),
                a._updateFieldArray(s, i, er, { argA: e, argB: et(t) }));
            },
            [p, s, a],
          ),
          update: t.default.useCallback(
            (e, t) => {
              let r = n(t),
                l = en(a._getFieldArray(s), e, r);
              ((f.current = [...l].map((t, r) =>
                t && r !== e ? f.current[r] : M(),
              )),
                p(l),
                o([...l]),
                a._updateFieldArray(s, l, en, { argA: e, argB: r }, !0, !1));
            },
            [p, s, a],
          ),
          replace: t.default.useCallback(
            (e) => {
              let t = S(n(e));
              ((f.current = t.map(M)),
                p([...t]),
                o([...t]),
                a._updateFieldArray(s, [...t], (e) => e, {}, !0, !1));
            },
            [p, s, a],
          ),
          fields: t.default.useMemo(
            () => u.map((e, t) => ({ ...e, [l]: f.current[t] || M() })),
            [u, l],
          ),
        }
      );
    }
    function ef() {
      let e = [];
      return {
        get observers() {
          return e;
        },
        next: (t) => {
          for (let r of e) r.next && r.next(t);
        },
        subscribe: (t) => (
          e.push(t),
          {
            unsubscribe: () => {
              e = e.filter((e) => e !== t);
            },
          }
        ),
        unsubscribe: () => {
          e = [];
        },
      };
    }
    var ed = (e) => a(e) || "object" != typeof e;
    function ec(e, t) {
      if (ed(e) || ed(t)) return e === t;
      if (r(e) && r(t)) return e.getTime() === t.getTime();
      let a = Object.keys(e),
        l = Object.keys(t);
      if (a.length !== l.length) return !1;
      for (let i of a) {
        let a = e[i];
        if (!l.includes(i)) return !1;
        if ("ref" !== i) {
          let e = t[i];
          if (
            (r(a) && r(e)) ||
            (s(a) && s(e)) ||
            (Array.isArray(a) && Array.isArray(e))
              ? !ec(a, e)
              : a !== e
          )
            return !1;
        }
      }
      return !0;
    }
    var ey = (e) => I(e) && e.isConnected,
      em = (e) => {
        for (let t in e) if (W(e[t])) return !0;
        return !1;
      };
    function ep(e, t = {}) {
      let r = Array.isArray(e);
      if (s(e) || r)
        for (let r in e)
          Array.isArray(e[r]) || (s(e[r]) && !em(e[r]))
            ? ((t[r] = Array.isArray(e[r]) ? [] : {}), ep(e[r], t[r]))
            : a(e[r]) || (t[r] = !0);
      return t;
    }
    var eg = (e, t) =>
        (function e(t, r, l) {
          let i = Array.isArray(t);
          if (s(t) || i)
            for (let i in t)
              Array.isArray(t[i]) || (s(t[i]) && !em(t[i]))
                ? f(r) || ed(l[i])
                  ? (l[i] = Array.isArray(t[i])
                      ? ep(t[i], [])
                      : { ...ep(t[i]) })
                  : e(t[i], a(r) ? {} : r[i], l[i])
                : (l[i] = !ec(t[i], r[i]));
          return l;
        })(e, t, ep(t)),
      eh = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: a }) =>
        f(e)
          ? e
          : t
            ? "" === e
              ? NaN
              : e
                ? +e
                : e
            : r && "string" == typeof e
              ? new Date(e)
              : a
                ? a(e)
                : e;
    function e_(e) {
      let t = e.ref;
      if (e.refs ? !e.refs.every((e) => e.disabled) : !t.disabled)
        return "file" === t.type
          ? t.files
          : "radio" === t.type
            ? Q(e.refs).value
            : "select-multiple" === t.type
              ? [...t.selectedOptions].map(({ value: e }) => e)
              : "checkbox" === t.type
                ? z(e.refs).value
                : eh(f(t.value) ? e.ref.value : t.value, e);
    }
    var ev = (e) =>
      f(e)
        ? e
        : e instanceof RegExp
          ? e.source
          : s(e)
            ? e.value instanceof RegExp
              ? e.value.source
              : e.value
            : e;
    function eb(e, t, r) {
      let a = d(e, r);
      if (a || /^\w*$/.test(r)) return { error: a, name: r };
      let s = r.split(".");
      for (; s.length; ) {
        let a = s.join("."),
          l = d(t, a),
          i = d(e, a);
        if (l && !Array.isArray(l) && r !== a) break;
        if (i && i.type) return { name: a, error: i };
        s.pop();
      }
      return { name: r };
    }
    let eA = { mode: m, reValidateMode: y, shouldFocusError: !0 };
    function ex(e = {}) {
      let y = t.default.useRef(),
        m = t.default.useRef(),
        [p, g] = t.default.useState({
          isDirty: !1,
          isValidating: !1,
          isLoading: W(e.defaultValues),
          isSubmitted: !1,
          isSubmitting: !1,
          isSubmitSuccessful: !1,
          isValid: !1,
          submitCount: 0,
          dirtyFields: {},
          touchedFields: {},
          errors: {},
          defaultValues: W(e.defaultValues) ? void 0 : e.defaultValues,
        });
      y.current ||
        (y.current = {
          ...(function (e = {}, t) {
            let y,
              m = { ...eA, ...e },
              p = {
                submitCount: 0,
                isDirty: !1,
                isLoading: W(m.defaultValues),
                isValidating: !1,
                isSubmitted: !1,
                isSubmitting: !1,
                isSubmitSuccessful: !1,
                isValid: !1,
                touchedFields: {},
                dirtyFields: {},
                errors: {},
              },
              g = {},
              h =
                ((s(m.defaultValues) || s(m.values)) &&
                  n(m.defaultValues || m.values)) ||
                {},
              _ = m.shouldUnregister ? {} : n(h),
              v = { action: !1, mount: !1, watch: !1 },
              b = {
                mount: new Set(),
                unMount: new Set(),
                array: new Set(),
                watch: new Set(),
              },
              A = 0,
              x = {
                isDirty: !1,
                dirtyFields: !1,
                touchedFields: !1,
                isValidating: !1,
                isValid: !1,
                errors: !1,
              },
              F = { values: ef(), array: ef(), state: ef() },
              w = e.resetOptions && e.resetOptions.keepDirtyValues,
              k = P(m.mode),
              D = P(m.reValidateMode),
              E = "all" === m.criteriaMode,
              O = async (e) => {
                if (x.isValid || e) {
                  let e = m.resolver ? V((await U()).errors) : await N(g, !0);
                  e !== p.isValid && F.state.next({ isValid: e });
                }
              },
              T = (e) => x.isValidating && F.state.next({ isValidating: e }),
              B = (e, t, r, a) => {
                let s = d(g, e);
                if (s) {
                  let l = d(_, e, f(r) ? d(h, e) : r);
                  (f(l) || (a && a.defaultChecked) || t
                    ? j(_, e, t ? l : e_(s._f))
                    : J(e, l),
                    v.mount && O());
                }
              },
              R = (e, t, r, a, s) => {
                let l = !1,
                  i = !1,
                  u = { name: e };
                if (!r || a) {
                  x.isDirty &&
                    ((i = p.isDirty),
                    (p.isDirty = u.isDirty = H()),
                    (l = i !== u.isDirty));
                  let r = ec(d(h, e), t);
                  ((i = d(p.dirtyFields, e)),
                    r ? eu(p.dirtyFields, e) : j(p.dirtyFields, e, !0),
                    (u.dirtyFields = p.dirtyFields),
                    (l = l || (x.dirtyFields && !r !== i)));
                }
                if (r) {
                  let t = d(p.touchedFields, e);
                  t ||
                    (j(p.touchedFields, e, r),
                    (u.touchedFields = p.touchedFields),
                    (l = l || (x.touchedFields && t !== r)));
                }
                return (l && s && F.state.next(u), l ? u : {});
              },
              U = async (e) =>
                m.resolver(
                  _,
                  m.context,
                  ((e, t, r, a) => {
                    let s = {};
                    for (let r of e) {
                      let e = d(t, r);
                      e && j(s, r, e._f);
                    }
                    return {
                      criteriaMode: r,
                      names: [...e],
                      fields: s,
                      shouldUseNativeValidation: a,
                    };
                  })(
                    e || b.mount,
                    g,
                    m.criteriaMode,
                    m.shouldUseNativeValidation,
                  ),
                ),
              M = async (e) => {
                let { errors: t } = await U();
                if (e)
                  for (let r of e) {
                    let e = d(t, r);
                    e ? j(p.errors, r, e) : eu(p.errors, r);
                  }
                else p.errors = t;
                return t;
              },
              N = async (e, t, r = { valid: !0 }) => {
                for (let a in e) {
                  let s = e[a];
                  if (s) {
                    let { _f: e, ...a } = s;
                    if (e) {
                      let a = b.array.has(e.name),
                        l = await Z(
                          s,
                          _,
                          E,
                          m.shouldUseNativeValidation && !t,
                          a,
                        );
                      if (l[e.name] && ((r.valid = !1), t)) break;
                      t ||
                        (d(l, e.name)
                          ? a
                            ? q(p.errors, l, e.name)
                            : j(p.errors, e.name, l[e.name])
                          : eu(p.errors, e.name));
                    }
                    a && (await N(a, t, r));
                  }
                }
                return r.valid;
              },
              H = (e, t) => (e && t && j(_, e, t), !ec(Y(), h)),
              K = (e, t, r) =>
                C(
                  e,
                  b,
                  {
                    ...(v.mount
                      ? _
                      : f(t)
                        ? h
                        : "string" == typeof e
                          ? { [e]: t }
                          : t),
                  },
                  r,
                  t,
                ),
              J = (e, t, r = {}) => {
                let s = d(g, e),
                  l = t;
                if (s) {
                  let r = s._f;
                  r &&
                    (r.disabled || j(_, e, eh(t, r)),
                    (l = I(r.ref) && a(t) ? "" : t),
                    "select-multiple" === r.ref.type
                      ? [...r.ref.options].forEach(
                          (e) => (e.selected = l.includes(e.value)),
                        )
                      : r.refs
                        ? "checkbox" === r.ref.type
                          ? r.refs.length > 1
                            ? r.refs.forEach(
                                (e) =>
                                  (!e.defaultChecked || !e.disabled) &&
                                  (e.checked = Array.isArray(l)
                                    ? !!l.find((t) => t === e.value)
                                    : l === e.value),
                              )
                            : r.refs[0] && (r.refs[0].checked = !!l)
                          : r.refs.forEach((e) => (e.checked = e.value === l))
                        : "file" === r.ref.type
                          ? (r.ref.value = "")
                          : ((r.ref.value = l),
                            r.ref.type ||
                              F.values.next({ name: e, values: { ..._ } })));
                }
                ((r.shouldDirty || r.shouldTouch) &&
                  R(e, l, r.shouldTouch, r.shouldDirty, !0),
                  r.shouldValidate && X(e));
              },
              z = (e, t, a) => {
                for (let s in t) {
                  let l = t[s],
                    i = `${e}.${s}`,
                    u = d(g, i);
                  (!b.array.has(e) && ed(l) && (!u || u._f)) || r(l)
                    ? J(i, l, a)
                    : z(i, l, a);
                }
              },
              G = (e, r, s = {}) => {
                let l = d(g, e),
                  i = b.array.has(e),
                  u = n(r);
                (j(_, e, u),
                  i
                    ? (F.array.next({ name: e, values: { ..._ } }),
                      (x.isDirty || x.dirtyFields) &&
                        s.shouldDirty &&
                        F.state.next({
                          name: e,
                          dirtyFields: eg(h, _),
                          isDirty: H(e, u),
                        }))
                    : !l || l._f || a(u)
                      ? J(e, u, s)
                      : z(e, u, s),
                  $(e, b) && F.state.next({ ...p }),
                  F.values.next({ name: e, values: { ..._ } }),
                  v.mount || t());
              },
              Q = async (t) => {
                let r = t.target,
                  a = r.name,
                  s = !0,
                  i = d(g, a);
                if (i) {
                  var u, n, o, f, h;
                  let C,
                    B,
                    L,
                    M = r.type ? e_(i._f) : l(t),
                    P = t.type === c || "focusout" === t.type,
                    q =
                      (!(
                        (L = i._f).mount &&
                        (L.required ||
                          L.min ||
                          L.max ||
                          L.maxLength ||
                          L.minLength ||
                          L.pattern ||
                          L.validate)
                      ) &&
                        !m.resolver &&
                        !d(p.errors, a) &&
                        !i._f.deps) ||
                      ((u = P),
                      (n = d(p.touchedFields, a)),
                      (o = p.isSubmitted),
                      (f = D),
                      !(h = k).isOnAll &&
                        (!o && h.isOnTouch
                          ? !(n || u)
                          : (o ? f.isOnBlur : h.isOnBlur)
                            ? !u
                            : (o ? !f.isOnChange : !h.isOnChange) || u)),
                    W = $(a, b, P);
                  (j(_, a, M),
                    P
                      ? (i._f.onBlur && i._f.onBlur(t), y && y(0))
                      : i._f.onChange && i._f.onChange(t));
                  let I = R(a, M, P, !1),
                    H = !V(I) || W;
                  if (
                    (P ||
                      F.values.next({
                        name: a,
                        type: t.type,
                        values: { ..._ },
                      }),
                    q)
                  )
                    return (
                      x.isValid && O(),
                      H && F.state.next({ name: a, ...(W ? {} : I) })
                    );
                  if ((!P && W && F.state.next({ ...p }), T(!0), m.resolver)) {
                    let { errors: e } = await U([a]),
                      t = eb(p.errors, g, a),
                      r = eb(e, g, t.name || a);
                    ((C = r.error), (a = r.name), (B = V(e)));
                  } else
                    ((C = (await Z(i, _, E, m.shouldUseNativeValidation))[a]),
                      (s = isNaN(M) || M === d(_, a, M)) &&
                        (C ? (B = !1) : x.isValid && (B = await N(g, !0))));
                  if (s) {
                    i._f.deps && X(i._f.deps);
                    var v = a,
                      S = B,
                      w = C;
                    let t = d(p.errors, v),
                      r = x.isValid && "boolean" == typeof S && p.isValid !== S;
                    if (e.delayError && w) {
                      let t;
                      ((t = () => {
                        (j(p.errors, v, w), F.state.next({ errors: p.errors }));
                      }),
                        (y = (e) => {
                          (clearTimeout(A), (A = setTimeout(t, e)));
                        })(e.delayError));
                    } else
                      (clearTimeout(A),
                        (y = null),
                        w ? j(p.errors, v, w) : eu(p.errors, v));
                    if ((w ? !ec(t, w) : t) || !V(I) || r) {
                      let e = {
                        ...I,
                        ...(r && "boolean" == typeof S ? { isValid: S } : {}),
                        errors: p.errors,
                        name: v,
                      };
                      ((p = { ...p, ...e }), F.state.next(e));
                    }
                    T(!1);
                  }
                }
              },
              X = async (e, t = {}) => {
                let r,
                  a,
                  s = S(e);
                if ((T(!0), m.resolver)) {
                  let t = await M(f(e) ? e : s);
                  ((r = V(t)), (a = e ? !s.some((e) => d(t, e)) : r));
                } else
                  e
                    ? ((a = (
                        await Promise.all(
                          s.map(async (e) => {
                            let t = d(g, e);
                            return await N(t && t._f ? { [e]: t } : t);
                          }),
                        )
                      ).every(Boolean)) ||
                        p.isValid) &&
                      O()
                    : (a = r = await N(g));
                return (
                  F.state.next({
                    ...("string" != typeof e || (x.isValid && r !== p.isValid)
                      ? {}
                      : { name: e }),
                    ...(m.resolver || !e ? { isValid: r } : {}),
                    errors: p.errors,
                    isValidating: !1,
                  }),
                  t.shouldFocus &&
                    !a &&
                    L(g, (e) => e && d(p.errors, e), e ? s : b.mount),
                  a
                );
              },
              Y = (e) => {
                let t = { ...h, ...(v.mount ? _ : {}) };
                return f(e)
                  ? t
                  : "string" == typeof e
                    ? d(t, e)
                    : e.map((e) => d(t, e));
              },
              ee = (e, t) => ({
                invalid: !!d((t || p).errors, e),
                isDirty: !!d((t || p).dirtyFields, e),
                isTouched: !!d((t || p).touchedFields, e),
                error: d((t || p).errors, e),
              }),
              et = (e, t, r) => {
                let a = (d(g, e, { _f: {} })._f || {}).ref;
                (j(p.errors, e, { ...t, ref: a }),
                  F.state.next({ name: e, errors: p.errors, isValid: !1 }),
                  r && r.shouldFocus && a && a.focus && a.focus());
              },
              er = (e, t = {}) => {
                for (let r of e ? S(e) : b.mount)
                  (b.mount.delete(r),
                    b.array.delete(r),
                    t.keepValue || (eu(g, r), eu(_, r)),
                    t.keepError || eu(p.errors, r),
                    t.keepDirty || eu(p.dirtyFields, r),
                    t.keepTouched || eu(p.touchedFields, r),
                    m.shouldUnregister || t.keepDefaultValue || eu(h, r));
                (F.values.next({ values: { ..._ } }),
                  F.state.next({
                    ...p,
                    ...(!t.keepDirty ? {} : { isDirty: H() }),
                  }),
                  t.keepIsValid || O());
              },
              ea = (e, t = {}) => {
                let r = d(g, e),
                  a = "boolean" == typeof t.disabled;
                return (
                  j(g, e, {
                    ...(r || {}),
                    _f: {
                      ...(r && r._f ? r._f : { ref: { name: e } }),
                      name: e,
                      mount: !0,
                      ...t,
                    },
                  }),
                  b.mount.add(e),
                  r
                    ? a && j(_, e, t.disabled ? void 0 : d(_, e, e_(r._f)))
                    : B(e, !0, t.value),
                  {
                    ...(a ? { disabled: t.disabled } : {}),
                    ...(m.progressive
                      ? {
                          required: !!t.required,
                          min: ev(t.min),
                          max: ev(t.max),
                          minLength: ev(t.minLength),
                          maxLength: ev(t.maxLength),
                          pattern: ev(t.pattern),
                        }
                      : {}),
                    name: e,
                    onChange: Q,
                    onBlur: Q,
                    ref: (a) => {
                      if (a) {
                        let s;
                        (ea(e, t), (r = d(g, e)));
                        let l =
                            (f(a.value) &&
                              a.querySelectorAll &&
                              a.querySelectorAll("input,select,textarea")[0]) ||
                            a,
                          i = "radio" === (s = l).type || "checkbox" === s.type,
                          u = r._f.refs || [];
                        (i ? u.find((e) => e === l) : l === r._f.ref) ||
                          (j(g, e, {
                            _f: {
                              ...r._f,
                              ...(i
                                ? {
                                    refs: [
                                      ...u.filter(ey),
                                      l,
                                      ...(Array.isArray(d(h, e)) ? [{}] : []),
                                    ],
                                    ref: { type: l.type, name: e },
                                  }
                                : { ref: l }),
                            },
                          }),
                          B(e, !1, void 0, l));
                      } else
                        ((r = d(g, e, {}))._f && (r._f.mount = !1),
                          (m.shouldUnregister || t.shouldUnregister) &&
                            !(i(b.array, e) && v.action) &&
                            b.unMount.add(e));
                    },
                  }
                );
              },
              es = () =>
                m.shouldFocusError && L(g, (e) => e && d(p.errors, e), b.mount),
              el = (e, t) => async (r) => {
                r &&
                  (r.preventDefault && r.preventDefault(),
                  r.persist && r.persist());
                let a = n(_);
                if ((F.state.next({ isSubmitting: !0 }), m.resolver)) {
                  let { errors: e, values: t } = await U();
                  ((p.errors = e), (a = t));
                } else await N(g);
                (eu(p.errors, "root"),
                  V(p.errors)
                    ? (F.state.next({ errors: {} }), await e(a, r))
                    : (t && (await t({ ...p.errors }, r)),
                      es(),
                      setTimeout(es)),
                  F.state.next({
                    isSubmitted: !0,
                    isSubmitting: !1,
                    isSubmitSuccessful: V(p.errors),
                    submitCount: p.submitCount + 1,
                    errors: p.errors,
                  }));
              },
              ei = (r, a = {}) => {
                let s = r || h,
                  l = n(s),
                  i = r && !V(r) ? l : h;
                if ((a.keepDefaultValues || (h = s), !a.keepValues)) {
                  if (a.keepDirtyValues || w)
                    for (let e of b.mount)
                      d(p.dirtyFields, e) ? j(i, e, d(_, e)) : G(e, d(i, e));
                  else {
                    if (u && f(r))
                      for (let e of b.mount) {
                        let t = d(g, e);
                        if (t && t._f) {
                          let e = Array.isArray(t._f.refs)
                            ? t._f.refs[0]
                            : t._f.ref;
                          if (I(e)) {
                            let t = e.closest("form");
                            if (t) {
                              t.reset();
                              break;
                            }
                          }
                        }
                      }
                    g = {};
                  }
                  ((_ = e.shouldUnregister
                    ? a.keepDefaultValues
                      ? n(h)
                      : {}
                    : n(i)),
                    F.array.next({ values: { ...i } }),
                    F.values.next({ values: { ...i } }));
                }
                ((b = {
                  mount: new Set(),
                  unMount: new Set(),
                  array: new Set(),
                  watch: new Set(),
                  watchAll: !1,
                  focus: "",
                }),
                  v.mount || t(),
                  (v.mount = !x.isValid || !!a.keepIsValid),
                  (v.watch = !!e.shouldUnregister),
                  F.state.next({
                    submitCount: a.keepSubmitCount ? p.submitCount : 0,
                    isDirty: a.keepDirty
                      ? p.isDirty
                      : !!(a.keepDefaultValues && !ec(r, h)),
                    isSubmitted: !!a.keepIsSubmitted && p.isSubmitted,
                    dirtyFields: a.keepDirtyValues
                      ? p.dirtyFields
                      : a.keepDefaultValues && r
                        ? eg(h, r)
                        : {},
                    touchedFields: a.keepTouched ? p.touchedFields : {},
                    errors: a.keepErrors ? p.errors : {},
                    isSubmitting: !1,
                    isSubmitSuccessful: !1,
                  }));
              },
              en = (e, t) => ei(W(e) ? e(_) : e, t);
            return {
              control: {
                register: ea,
                unregister: er,
                getFieldState: ee,
                handleSubmit: el,
                setError: et,
                _executeSchema: U,
                _getWatch: K,
                _getDirty: H,
                _updateValid: O,
                _removeUnmounted: () => {
                  for (let e of b.unMount) {
                    let t = d(g, e);
                    t &&
                      (t._f.refs
                        ? t._f.refs.every((e) => !ey(e))
                        : !ey(t._f.ref)) &&
                      er(e);
                  }
                  b.unMount = new Set();
                },
                _updateFieldArray: (e, t = [], r, a, s = !0, l = !0) => {
                  if (a && r) {
                    if (((v.action = !0), l && Array.isArray(d(g, e)))) {
                      let t = r(d(g, e), a.argA, a.argB);
                      s && j(g, e, t);
                    }
                    if (l && Array.isArray(d(p.errors, e))) {
                      let t,
                        l = r(d(p.errors, e), a.argA, a.argB);
                      (s && j(p.errors, e, l),
                        o(d((t = p.errors), e)).length || eu(t, e));
                    }
                    if (
                      x.touchedFields &&
                      l &&
                      Array.isArray(d(p.touchedFields, e))
                    ) {
                      let t = r(d(p.touchedFields, e), a.argA, a.argB);
                      s && j(p.touchedFields, e, t);
                    }
                    (x.dirtyFields && (p.dirtyFields = eg(h, _)),
                      F.state.next({
                        name: e,
                        isDirty: H(e, t),
                        dirtyFields: p.dirtyFields,
                        errors: p.errors,
                        isValid: p.isValid,
                      }));
                  } else j(_, e, t);
                },
                _getFieldArray: (t) =>
                  o(
                    d(
                      v.mount ? _ : h,
                      t,
                      e.shouldUnregister ? d(h, t, []) : [],
                    ),
                  ),
                _reset: ei,
                _resetDefaultValues: () =>
                  W(m.defaultValues) &&
                  m.defaultValues().then((e) => {
                    (en(e, m.resetOptions), F.state.next({ isLoading: !1 }));
                  }),
                _updateFormState: (e) => {
                  p = { ...p, ...e };
                },
                _subjects: F,
                _proxyFormState: x,
                get _fields() {
                  return g;
                },
                get _formValues() {
                  return _;
                },
                get _state() {
                  return v;
                },
                set _state(value) {
                  v = value;
                },
                get _defaultValues() {
                  return h;
                },
                get _names() {
                  return b;
                },
                set _names(value) {
                  b = value;
                },
                get _formState() {
                  return p;
                },
                set _formState(value) {
                  p = value;
                },
                get _options() {
                  return m;
                },
                set _options(value) {
                  m = { ...m, ...value };
                },
              },
              trigger: X,
              register: ea,
              handleSubmit: el,
              watch: (e, t) =>
                W(e)
                  ? F.values.subscribe({ next: (r) => e(K(void 0, t), r) })
                  : K(e, t, !0),
              setValue: G,
              getValues: Y,
              reset: en,
              resetField: (e, t = {}) => {
                d(g, e) &&
                  (f(t.defaultValue)
                    ? G(e, d(h, e))
                    : (G(e, t.defaultValue), j(h, e, t.defaultValue)),
                  t.keepTouched || eu(p.touchedFields, e),
                  t.keepDirty ||
                    (eu(p.dirtyFields, e),
                    (p.isDirty = t.defaultValue ? H(e, d(h, e)) : H())),
                  !t.keepError && (eu(p.errors, e), x.isValid && O()),
                  F.state.next({ ...p }));
              },
              clearErrors: (e) => {
                (e && S(e).forEach((e) => eu(p.errors, e)),
                  F.state.next({ errors: e ? p.errors : {} }));
              },
              unregister: er,
              setError: et,
              setFocus: (e, t = {}) => {
                let r = d(g, e),
                  a = r && r._f;
                if (a) {
                  let e = a.refs ? a.refs[0] : a.ref;
                  e.focus && (e.focus(), t.shouldSelect && e.select());
                }
              },
              getFieldState: ee,
            };
          })(e, () => g((e) => ({ ...e }))),
          formState: p,
        });
      let h = y.current.control;
      return (
        (h._options = e),
        k({
          subject: h._subjects.state,
          next: (e) => {
            F(e, h._proxyFormState, h._updateFormState, !0) &&
              g({ ...h._formState });
          },
        }),
        t.default.useEffect(() => {
          e.values && !ec(e.values, m.current)
            ? (h._reset(e.values, h._options.resetOptions),
              (m.current = e.values))
            : h._resetDefaultValues();
        }, [e.values, h]),
        t.default.useEffect(() => {
          (h._state.mount || (h._updateValid(), (h._state.mount = !0)),
            h._state.watch &&
              ((h._state.watch = !1),
              h._subjects.state.next({ ...h._formState })),
            h._removeUnmounted());
        }),
        (y.current.formState = x(p, h)),
        y.current
      );
    }
    e.s([
      "Controller",
      () => B,
      "Form",
      () => R,
      "FormProvider",
      () => A,
      "appendErrors",
      () => U,
      "get",
      () => d,
      "set",
      () => j,
      "useController",
      () => T,
      "useFieldArray",
      () => eo,
      "useForm",
      () => ex,
      "useFormContext",
      () => b,
      "useFormState",
      () => D,
      "useWatch",
      () => E,
    ]);
  },
]);
