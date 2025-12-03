'use strict'
;(() => {
  if (typeof window < 'u') {
    let b = function (e) {
        if (e.fullKey !== null) return e.fullKey
        let n = e.ownKey,
          o
        try {
          o = e.getCustomHooks()
        } catch {
          return ((e.forceReset = !0), (e.fullKey = n), n)
        }
        for (let i = 0; i < o.length; i++) {
          let u = o[i]
          if (typeof u != 'function')
            return ((e.forceReset = !0), (e.fullKey = n), n)
          let f = h.get(u)
          if (f === void 0) continue
          let t = b(f)
          ;(f.forceReset && (e.forceReset = !0),
            (n +=
              `
---
` + t))
        }
        return ((e.fullKey = n), n)
      },
      D = function (e, n) {
        let o = h.get(e),
          i = h.get(n)
        return o === void 0 && i === void 0
          ? !0
          : !(o === void 0 || i === void 0 || b(o) !== b(i) || i.forceReset)
      },
      B = function (e) {
        return e.prototype && e.prototype.isReactComponent
      },
      j = function (e, n) {
        return B(e) || B(n) ? !1 : !!D(e, n)
      },
      F = function (e) {
        return $.get(e)
      },
      V = function (e) {
        let n = new Map()
        return (
          e.forEach((o, i) => {
            n.set(i, o)
          }),
          n
        )
      },
      v = function (e) {
        let n = new Set()
        return (
          e.forEach((o) => {
            n.add(o)
          }),
          n
        )
      },
      z = function (e, n) {
        try {
          return e[n]
        } catch {
          return
        }
      },
      G = function () {
        if (R.length === 0 || S) return null
        S = !0
        try {
          let e = new Set(),
            n = new Set(),
            o = R
          ;((R = []),
            o.forEach(([r, s]) => {
              let d = r.current
              ;($.set(d, r),
                $.set(s, r),
                (r.current = s),
                j(d, s) ? n.add(r) : e.add(r))
            }))
          let i = { updatedFamilies: n, staleFamilies: e }
          y.forEach((r) => {
            r.setRefreshHandler(F)
          })
          let u = !1,
            f = null,
            t = v(p),
            l = v(a),
            c = V(H)
          if (
            (t.forEach((r) => {
              let s = c.get(r)
              if (s === void 0)
                throw new Error(
                  'Could not find helpers for a root. This is a bug in React Refresh.',
                )
              if ((p.has(r), w === null || !w.has(r))) return
              let d = w.get(r)
              try {
                s.scheduleRoot(r, d)
              } catch (m) {
                u || ((u = !0), (f = m))
              }
            }),
            l.forEach((r) => {
              let s = c.get(r)
              if (s === void 0)
                throw new Error(
                  'Could not find helpers for a root. This is a bug in React Refresh.',
                )
              a.has(r)
              try {
                s.scheduleRefresh(r, i)
              } catch (d) {
                u || ((u = !0), (f = d))
              }
            }),
            u)
          )
            throw f
          return i
        } finally {
          S = !1
        }
      },
      _ = function (e, n) {
        if (
          e === null ||
          (typeof e != 'function' && typeof e != 'object') ||
          O.has(e)
        )
          return
        let o = L.get(n)
        if (
          (o === void 0 ? ((o = { current: e }), L.set(n, o)) : R.push([o, e]),
          O.set(e, o),
          typeof e == 'object' && e !== null)
        )
          switch (z(e, '$$typeof')) {
            case M:
              _(e.render, n + '$render')
              break
            case C:
              _(e.type, n + '$type')
              break
          }
      },
      k = function (e, n, o = !1, i) {
        if (
          (h.has(e) ||
            h.set(e, {
              forceReset: o,
              ownKey: n,
              fullKey: null,
              getCustomHooks: i || (() => []),
            }),
          typeof e == 'object' && e !== null)
        )
          switch (z(e, '$$typeof')) {
            case M:
              k(e.render, n, o, i)
              break
            case C:
              k(e.type, n, o, i)
              break
          }
      },
      I = function (e) {
        let n = h.get(e)
        n !== void 0 && b(n)
      },
      J = function (e) {
        return L.get(e)
      },
      N = function (e) {
        return O.get(e)
      },
      W = function (e) {
        let n = e.__REACT_DEVTOOLS_GLOBAL_HOOK__
        if (n === void 0) {
          let f = 0
          e.__REACT_DEVTOOLS_GLOBAL_HOOK__ = n = {
            renderers: new Map(),
            supportsFiber: !0,
            inject: (t) => f++,
            onScheduleFiberRoot: (t, l, c) => {},
            onCommitFiberRoot: (t, l, c, r) => {},
            onCommitFiberUnmount() {},
          }
        }
        if (n.isDisabled) {
          console.warn(
            'Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.',
          )
          return
        }
        let o = n.inject
        ;((n.inject = function (f) {
          let t = o.apply(this, arguments)
          return (
            typeof f.scheduleRefresh == 'function' &&
              typeof f.setRefreshHandler == 'function' &&
              y.set(t, f),
            t
          )
        }),
          n.renderers.forEach((f, t) => {
            typeof f.scheduleRefresh == 'function' &&
              typeof f.setRefreshHandler == 'function' &&
              y.set(t, f)
          }))
        let i = n.onCommitFiberRoot,
          u = n.onScheduleFiberRoot || (() => {})
        ;((n.onScheduleFiberRoot = function (f, t, l) {
          return (
            S || (p.delete(t), w !== null && w.set(t, l)),
            u.apply(this, arguments)
          )
        }),
          (n.onCommitFiberRoot = function (f, t, l, c) {
            let r = y.get(f)
            if (r !== void 0) {
              H.set(t, r)
              let s = t.current,
                d = s.alternate
              if (d !== null) {
                let m =
                    d.memoizedState != null &&
                    d.memoizedState.element != null &&
                    a.has(t),
                  g = s.memoizedState != null && s.memoizedState.element != null
                !m && g
                  ? (a.add(t), p.delete(t))
                  : (m && g) ||
                    (m && !g
                      ? (a.delete(t), c ? p.add(t) : H.delete(t))
                      : !m && !g && c && p.add(t))
              } else a.add(t)
            }
            return i.apply(this, arguments)
          }))
      },
      Q = function () {
        return !1
      },
      X = function () {
        return a.size
      },
      U = function (e, n, o, i) {
        let u,
          f,
          t = !1
        return function (l, c, r, s) {
          if (typeof c == 'string')
            return (
              u || ((u = l), (f = typeof s == 'function')),
              l != null &&
                (typeof l == 'function' || typeof l == 'object') &&
                k(l, c, r, s),
              l
            )
          !t && f && ((t = !0), I(u))
        }
      }
    ;((Z = b),
      (q = D),
      (x = B),
      (E = j),
      (A = F),
      (P = V),
      (T = v),
      (Y = z),
      (ee = G),
      (ne = _),
      (te = k),
      (oe = I),
      (re = J),
      (fe = N),
      (ie = W),
      (se = Q),
      (ue = X),
      (le = U),
      (M = Symbol.for('react.forward_ref')),
      (C = Symbol.for('react.memo')))
    let K = typeof WeakMap == 'function' ? WeakMap : Map,
      L = new Map(),
      O = new K(),
      h = new K(),
      $ = new K(),
      R = [],
      y = new Map(),
      H = new Map(),
      a = new Set(),
      p = new Set(),
      w = typeof WeakMap == 'function' ? new WeakMap() : null,
      S = !1
    ;(W(window),
      (window.__v0_$RefreshReg$ = () => {}),
      (window.__v0_$RefreshSig$ = () => (e) => e),
      (window.__v0_refreshRuntime = {
        register: _,
        createSignatureFunctionForTransform: U,
        performReactRefresh: G,
      }))
  }
  var M, C, Z, q, x, E, A, P, T, Y, ee, ne, te, oe, re, fe, ie, se, ue, le
})()
