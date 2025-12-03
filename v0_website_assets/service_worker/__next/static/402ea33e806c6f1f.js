(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  323337,
  436035,
  (t) => {
    "use strict";
    let e = ["top", "right", "bottom", "left"],
      n = e.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []),
      i = Math.min,
      r = Math.max,
      o = Math.round,
      l = Math.floor,
      f = (t) => ({ x: t, y: t }),
      a = { left: "right", right: "left", bottom: "top", top: "bottom" },
      u = { start: "end", end: "start" };
    function c(t, e) {
      return "function" == typeof t ? t(e) : t;
    }
    function s(t) {
      return t.split("-")[0];
    }
    function d(t) {
      return t.split("-")[1];
    }
    function h(t) {
      return "x" === t ? "y" : "x";
    }
    function p(t) {
      return "y" === t ? "height" : "width";
    }
    let m = new Set(["top", "bottom"]);
    function g(t) {
      return m.has(s(t)) ? "y" : "x";
    }
    function w(t, e, n) {
      void 0 === n && (n = !1);
      let i = d(t),
        r = h(g(t)),
        o = p(r),
        l =
          "x" === r
            ? i === (n ? "end" : "start")
              ? "right"
              : "left"
            : "start" === i
              ? "bottom"
              : "top";
      return (e.reference[o] > e.floating[o] && (l = T(l)), [l, T(l)]);
    }
    function y(t) {
      return t.replace(/start|end/g, (t) => u[t]);
    }
    let v = ["left", "right"],
      x = ["right", "left"],
      b = ["top", "bottom"],
      R = ["bottom", "top"];
    function T(t) {
      return t.replace(/left|right|bottom|top/g, (t) => a[t]);
    }
    function L(t) {
      return "number" != typeof t
        ? { top: 0, right: 0, bottom: 0, left: 0, ...t }
        : { top: t, right: t, bottom: t, left: t };
    }
    function A(t) {
      let { x: e, y: n, width: i, height: r } = t;
      return {
        width: i,
        height: r,
        top: n,
        left: e,
        right: e + i,
        bottom: n + r,
        x: e,
        y: n,
      };
    }
    function S(t, e, n) {
      let i,
        { reference: r, floating: o } = t,
        l = g(e),
        f = h(g(e)),
        a = p(f),
        u = s(e),
        c = "y" === l,
        m = r.x + r.width / 2 - o.width / 2,
        w = r.y + r.height / 2 - o.height / 2,
        y = r[a] / 2 - o[a] / 2;
      switch (u) {
        case "top":
          i = { x: m, y: r.y - o.height };
          break;
        case "bottom":
          i = { x: m, y: r.y + r.height };
          break;
        case "right":
          i = { x: r.x + r.width, y: w };
          break;
        case "left":
          i = { x: r.x - o.width, y: w };
          break;
        default:
          i = { x: r.x, y: r.y };
      }
      switch (d(e)) {
        case "start":
          i[f] -= y * (n && c ? -1 : 1);
          break;
        case "end":
          i[f] += y * (n && c ? -1 : 1);
      }
      return i;
    }
    let E = async (t, e, n) => {
      let {
          placement: i = "bottom",
          strategy: r = "absolute",
          middleware: o = [],
          platform: l,
        } = n,
        f = o.filter(Boolean),
        a = await (null == l.isRTL ? void 0 : l.isRTL(e)),
        u = await l.getElementRects({ reference: t, floating: e, strategy: r }),
        { x: c, y: s } = S(u, i, a),
        d = i,
        h = {},
        p = 0;
      for (let n = 0; n < f.length; n++) {
        let { name: o, fn: m } = f[n],
          {
            x: g,
            y: w,
            data: y,
            reset: v,
          } = await m({
            x: c,
            y: s,
            initialPlacement: i,
            placement: d,
            strategy: r,
            middlewareData: h,
            rects: u,
            platform: l,
            elements: { reference: t, floating: e },
          });
        ((c = null != g ? g : c),
          (s = null != w ? w : s),
          (h = { ...h, [o]: { ...h[o], ...y } }),
          v &&
            p <= 50 &&
            (p++,
            "object" == typeof v &&
              (v.placement && (d = v.placement),
              v.rects &&
                (u =
                  !0 === v.rects
                    ? await l.getElementRects({
                        reference: t,
                        floating: e,
                        strategy: r,
                      })
                    : v.rects),
              ({ x: c, y: s } = S(u, d, a))),
            (n = -1)));
      }
      return { x: c, y: s, placement: d, strategy: r, middlewareData: h };
    };
    async function P(t, e) {
      var n;
      void 0 === e && (e = {});
      let { x: i, y: r, platform: o, rects: l, elements: f, strategy: a } = t,
        {
          boundary: u = "clippingAncestors",
          rootBoundary: s = "viewport",
          elementContext: d = "floating",
          altBoundary: h = !1,
          padding: p = 0,
        } = c(e, t),
        m = L(p),
        g = f[h ? ("floating" === d ? "reference" : "floating") : d],
        w = A(
          await o.getClippingRect({
            element:
              null ==
                (n = await (null == o.isElement ? void 0 : o.isElement(g))) || n
                ? g
                : g.contextElement ||
                  (await (null == o.getDocumentElement
                    ? void 0
                    : o.getDocumentElement(f.floating))),
            boundary: u,
            rootBoundary: s,
            strategy: a,
          }),
        ),
        y =
          "floating" === d
            ? { x: i, y: r, width: l.floating.width, height: l.floating.height }
            : l.reference,
        v = await (null == o.getOffsetParent
          ? void 0
          : o.getOffsetParent(f.floating)),
        x = ((await (null == o.isElement ? void 0 : o.isElement(v))) &&
          (await (null == o.getScale ? void 0 : o.getScale(v)))) || {
          x: 1,
          y: 1,
        },
        b = A(
          o.convertOffsetParentRelativeRectToViewportRelativeRect
            ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
                elements: f,
                rect: y,
                offsetParent: v,
                strategy: a,
              })
            : y,
        );
      return {
        top: (w.top - b.top + m.top) / x.y,
        bottom: (b.bottom - w.bottom + m.bottom) / x.y,
        left: (w.left - b.left + m.left) / x.x,
        right: (b.right - w.right + m.right) / x.x,
      };
    }
    function C(t, e) {
      return {
        top: t.top - e.height,
        right: t.right - e.width,
        bottom: t.bottom - e.height,
        left: t.left - e.width,
      };
    }
    function O(t) {
      return e.some((e) => t[e] >= 0);
    }
    function D(t) {
      let e = i(...t.map((t) => t.left)),
        n = i(...t.map((t) => t.top));
      return {
        x: e,
        y: n,
        width: r(...t.map((t) => t.right)) - e,
        height: r(...t.map((t) => t.bottom)) - n,
      };
    }
    let k = new Set(["left", "top"]);
    async function F(t, e) {
      let { placement: n, platform: i, elements: r } = t,
        o = await (null == i.isRTL ? void 0 : i.isRTL(r.floating)),
        l = s(n),
        f = d(n),
        a = "y" === g(n),
        u = k.has(l) ? -1 : 1,
        h = o && a ? -1 : 1,
        p = c(e, t),
        {
          mainAxis: m,
          crossAxis: w,
          alignmentAxis: y,
        } = "number" == typeof p
          ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
          : {
              mainAxis: p.mainAxis || 0,
              crossAxis: p.crossAxis || 0,
              alignmentAxis: p.alignmentAxis,
            };
      return (
        f && "number" == typeof y && (w = "end" === f ? -1 * y : y),
        a ? { x: w * h, y: m * u } : { x: m * u, y: w * h }
      );
    }
    function H() {
      return "undefined" != typeof window;
    }
    function M(t) {
      return V(t) ? (t.nodeName || "").toLowerCase() : "#document";
    }
    function B(t) {
      var e;
      return (
        (null == t || null == (e = t.ownerDocument) ? void 0 : e.defaultView) ||
        window
      );
    }
    function W(t) {
      var e;
      return null ==
        (e = (V(t) ? t.ownerDocument : t.document) || window.document)
        ? void 0
        : e.documentElement;
    }
    function V(t) {
      return !!H() && (t instanceof Node || t instanceof B(t).Node);
    }
    function z(t) {
      return !!H() && (t instanceof Element || t instanceof B(t).Element);
    }
    function j(t) {
      return (
        !!H() && (t instanceof HTMLElement || t instanceof B(t).HTMLElement)
      );
    }
    function N(t) {
      return (
        !!H() &&
        "undefined" != typeof ShadowRoot &&
        (t instanceof ShadowRoot || t instanceof B(t).ShadowRoot)
      );
    }
    let _ = new Set(["inline", "contents"]);
    function I(t) {
      let { overflow: e, overflowX: n, overflowY: i, display: r } = tt(t);
      return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && !_.has(r);
    }
    let U = new Set(["table", "td", "th"]),
      $ = [":popover-open", ":modal"];
    function q(t) {
      return $.some((e) => {
        try {
          return t.matches(e);
        } catch (t) {
          return !1;
        }
      });
    }
    let K = ["transform", "translate", "scale", "rotate", "perspective"],
      X = [
        "transform",
        "translate",
        "scale",
        "rotate",
        "perspective",
        "filter",
      ],
      Y = ["paint", "layout", "strict", "content"];
    function G(t) {
      let e = J(),
        n = z(t) ? tt(t) : t;
      return (
        K.some((t) => !!n[t] && "none" !== n[t]) ||
        (!!n.containerType && "normal" !== n.containerType) ||
        (!e && !!n.backdropFilter && "none" !== n.backdropFilter) ||
        (!e && !!n.filter && "none" !== n.filter) ||
        X.some((t) => (n.willChange || "").includes(t)) ||
        Y.some((t) => (n.contain || "").includes(t))
      );
    }
    function J() {
      return (
        "undefined" != typeof CSS &&
        !!CSS.supports &&
        CSS.supports("-webkit-backdrop-filter", "none")
      );
    }
    let Q = new Set(["html", "body", "#document"]);
    function Z(t) {
      return Q.has(M(t));
    }
    function tt(t) {
      return B(t).getComputedStyle(t);
    }
    function te(t) {
      return z(t)
        ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
        : { scrollLeft: t.scrollX, scrollTop: t.scrollY };
    }
    function tn(t) {
      if ("html" === M(t)) return t;
      let e = t.assignedSlot || t.parentNode || (N(t) && t.host) || W(t);
      return N(e) ? e.host : e;
    }
    function ti(t, e, n) {
      var i;
      (void 0 === e && (e = []), void 0 === n && (n = !0));
      let r = (function t(e) {
          let n = tn(e);
          return Z(n)
            ? e.ownerDocument
              ? e.ownerDocument.body
              : e.body
            : j(n) && I(n)
              ? n
              : t(n);
        })(t),
        o = r === (null == (i = t.ownerDocument) ? void 0 : i.body),
        l = B(r);
      if (o) {
        let t = tr(l);
        return e.concat(
          l,
          l.visualViewport || [],
          I(r) ? r : [],
          t && n ? ti(t) : [],
        );
      }
      return e.concat(r, ti(r, [], n));
    }
    function tr(t) {
      return t.parent && Object.getPrototypeOf(t.parent)
        ? t.frameElement
        : null;
    }
    function to(t) {
      let e = tt(t),
        n = parseFloat(e.width) || 0,
        i = parseFloat(e.height) || 0,
        r = j(t),
        l = r ? t.offsetWidth : n,
        f = r ? t.offsetHeight : i,
        a = o(n) !== l || o(i) !== f;
      return (a && ((n = l), (i = f)), { width: n, height: i, $: a });
    }
    function tl(t) {
      return z(t) ? t : t.contextElement;
    }
    function tf(t) {
      let e = tl(t);
      if (!j(e)) return f(1);
      let n = e.getBoundingClientRect(),
        { width: i, height: r, $: l } = to(e),
        a = (l ? o(n.width) : n.width) / i,
        u = (l ? o(n.height) : n.height) / r;
      return (
        (a && Number.isFinite(a)) || (a = 1),
        (u && Number.isFinite(u)) || (u = 1),
        { x: a, y: u }
      );
    }
    let ta = f(0);
    function tu(t) {
      let e = B(t);
      return J() && e.visualViewport
        ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
        : ta;
    }
    function tc(t, e, n, i) {
      var r;
      (void 0 === e && (e = !1), void 0 === n && (n = !1));
      let o = t.getBoundingClientRect(),
        l = tl(t),
        a = f(1);
      e && (i ? z(i) && (a = tf(i)) : (a = tf(t)));
      let u = (void 0 === (r = n) && (r = !1), i && (!r || i === B(l)) && r)
          ? tu(l)
          : f(0),
        c = (o.left + u.x) / a.x,
        s = (o.top + u.y) / a.y,
        d = o.width / a.x,
        h = o.height / a.y;
      if (l) {
        let t = B(l),
          e = i && z(i) ? B(i) : i,
          n = t,
          r = tr(n);
        for (; r && i && e !== n; ) {
          let t = tf(r),
            e = r.getBoundingClientRect(),
            i = tt(r),
            o = e.left + (r.clientLeft + parseFloat(i.paddingLeft)) * t.x,
            l = e.top + (r.clientTop + parseFloat(i.paddingTop)) * t.y;
          ((c *= t.x),
            (s *= t.y),
            (d *= t.x),
            (h *= t.y),
            (c += o),
            (s += l),
            (r = tr((n = B(r)))));
        }
      }
      return A({ width: d, height: h, x: c, y: s });
    }
    function ts(t, e) {
      let n = te(t).scrollLeft;
      return e ? e.left + n : tc(W(t)).left + n;
    }
    function td(t, e, n) {
      void 0 === n && (n = !1);
      let i = t.getBoundingClientRect();
      return {
        x: i.left + e.scrollLeft - (n ? 0 : ts(t, i)),
        y: i.top + e.scrollTop,
      };
    }
    let th = new Set(["absolute", "fixed"]);
    function tp(t, e, n) {
      var i;
      let o;
      if ("viewport" === e)
        o = (function (t, e) {
          let n = B(t),
            i = W(t),
            r = n.visualViewport,
            o = i.clientWidth,
            l = i.clientHeight,
            f = 0,
            a = 0;
          if (r) {
            ((o = r.width), (l = r.height));
            let t = J();
            (!t || (t && "fixed" === e)) &&
              ((f = r.offsetLeft), (a = r.offsetTop));
          }
          return { width: o, height: l, x: f, y: a };
        })(t, n);
      else if ("document" === e) {
        let e, n, l, f, a, u, c;
        ((i = W(t)),
          (e = W(i)),
          (n = te(i)),
          (l = i.ownerDocument.body),
          (f = r(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth)),
          (a = r(
            e.scrollHeight,
            e.clientHeight,
            l.scrollHeight,
            l.clientHeight,
          )),
          (u = -n.scrollLeft + ts(i)),
          (c = -n.scrollTop),
          "rtl" === tt(l).direction &&
            (u += r(e.clientWidth, l.clientWidth) - f),
          (o = { width: f, height: a, x: u, y: c }));
      } else if (z(e)) {
        let t, i, r, l, a, u;
        ((i = (t = tc(e, !0, "fixed" === n)).top + e.clientTop),
          (r = t.left + e.clientLeft),
          (l = j(e) ? tf(e) : f(1)),
          (a = e.clientWidth * l.x),
          (u = e.clientHeight * l.y),
          (o = { width: a, height: u, x: r * l.x, y: i * l.y }));
      } else {
        let n = tu(t);
        o = { x: e.x - n.x, y: e.y - n.y, width: e.width, height: e.height };
      }
      return A(o);
    }
    function tm(t) {
      return "static" === tt(t).position;
    }
    function tg(t, e) {
      if (!j(t) || "fixed" === tt(t).position) return null;
      if (e) return e(t);
      let n = t.offsetParent;
      return (W(t) === n && (n = n.ownerDocument.body), n);
    }
    function tw(t, e) {
      var n;
      let i = B(t);
      if (q(t)) return i;
      if (!j(t)) {
        let e = tn(t);
        for (; e && !Z(e); ) {
          if (z(e) && !tm(e)) return e;
          e = tn(e);
        }
        return i;
      }
      let r = tg(t, e);
      for (; r && ((n = r), U.has(M(n))) && tm(r); ) r = tg(r, e);
      return r && Z(r) && tm(r) && !G(r)
        ? i
        : r ||
            (function (t) {
              let e = tn(t);
              for (; j(e) && !Z(e); ) {
                if (G(e)) return e;
                if (q(e)) break;
                e = tn(e);
              }
              return null;
            })(t) ||
            i;
    }
    let ty = async function (t) {
        let e = this.getOffsetParent || tw,
          n = this.getDimensions,
          i = await n(t.floating);
        return {
          reference: (function (t, e, n) {
            let i = j(e),
              r = W(e),
              o = "fixed" === n,
              l = tc(t, !0, o, e),
              a = { scrollLeft: 0, scrollTop: 0 },
              u = f(0);
            if (i || (!i && !o))
              if ((("body" !== M(e) || I(r)) && (a = te(e)), i)) {
                let t = tc(e, !0, o, e);
                ((u.x = t.x + e.clientLeft), (u.y = t.y + e.clientTop));
              } else r && (u.x = ts(r));
            o && !i && r && (u.x = ts(r));
            let c = !r || i || o ? f(0) : td(r, a);
            return {
              x: l.left + a.scrollLeft - u.x - c.x,
              y: l.top + a.scrollTop - u.y - c.y,
              width: l.width,
              height: l.height,
            };
          })(t.reference, await e(t.floating), t.strategy),
          floating: { x: 0, y: 0, width: i.width, height: i.height },
        };
      },
      tv = {
        convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
          let { elements: e, rect: n, offsetParent: i, strategy: r } = t,
            o = "fixed" === r,
            l = W(i),
            a = !!e && q(e.floating);
          if (i === l || (a && o)) return n;
          let u = { scrollLeft: 0, scrollTop: 0 },
            c = f(1),
            s = f(0),
            d = j(i);
          if (
            (d || (!d && !o)) &&
            (("body" !== M(i) || I(l)) && (u = te(i)), j(i))
          ) {
            let t = tc(i);
            ((c = tf(i)),
              (s.x = t.x + i.clientLeft),
              (s.y = t.y + i.clientTop));
          }
          let h = !l || d || o ? f(0) : td(l, u, !0);
          return {
            width: n.width * c.x,
            height: n.height * c.y,
            x: n.x * c.x - u.scrollLeft * c.x + s.x + h.x,
            y: n.y * c.y - u.scrollTop * c.y + s.y + h.y,
          };
        },
        getDocumentElement: W,
        getClippingRect: function (t) {
          let { element: e, boundary: n, rootBoundary: o, strategy: l } = t,
            f = [
              ...("clippingAncestors" === n
                ? q(e)
                  ? []
                  : (function (t, e) {
                      let n = e.get(t);
                      if (n) return n;
                      let i = ti(t, [], !1).filter(
                          (t) => z(t) && "body" !== M(t),
                        ),
                        r = null,
                        o = "fixed" === tt(t).position,
                        l = o ? tn(t) : t;
                      for (; z(l) && !Z(l); ) {
                        let e = tt(l),
                          n = G(l);
                        (n || "fixed" !== e.position || (r = null),
                          (
                            o
                              ? !n && !r
                              : (!n &&
                                  "static" === e.position &&
                                  !!r &&
                                  th.has(r.position)) ||
                                (I(l) &&
                                  !n &&
                                  (function t(e, n) {
                                    let i = tn(e);
                                    return (
                                      !(i === n || !z(i) || Z(i)) &&
                                      ("fixed" === tt(i).position || t(i, n))
                                    );
                                  })(t, l))
                          )
                            ? (i = i.filter((t) => t !== l))
                            : (r = e),
                          (l = tn(l)));
                      }
                      return (e.set(t, i), i);
                    })(e, this._c)
                : [].concat(n)),
              o,
            ],
            a = f[0],
            u = f.reduce(
              (t, n) => {
                let o = tp(e, n, l);
                return (
                  (t.top = r(o.top, t.top)),
                  (t.right = i(o.right, t.right)),
                  (t.bottom = i(o.bottom, t.bottom)),
                  (t.left = r(o.left, t.left)),
                  t
                );
              },
              tp(e, a, l),
            );
          return {
            width: u.right - u.left,
            height: u.bottom - u.top,
            x: u.left,
            y: u.top,
          };
        },
        getOffsetParent: tw,
        getElementRects: ty,
        getClientRects: function (t) {
          return Array.from(t.getClientRects());
        },
        getDimensions: function (t) {
          let { width: e, height: n } = to(t);
          return { width: e, height: n };
        },
        getScale: tf,
        isElement: z,
        isRTL: function (t) {
          return "rtl" === tt(t).direction;
        },
      };
    function tx(t, e) {
      return (
        t.x === e.x &&
        t.y === e.y &&
        t.width === e.width &&
        t.height === e.height
      );
    }
    function tb(t, e, n, o) {
      let f;
      void 0 === o && (o = {});
      let {
          ancestorScroll: a = !0,
          ancestorResize: u = !0,
          elementResize: c = "function" == typeof ResizeObserver,
          layoutShift: s = "function" == typeof IntersectionObserver,
          animationFrame: d = !1,
        } = o,
        h = tl(t),
        p = a || u ? [...(h ? ti(h) : []), ...ti(e)] : [];
      p.forEach((t) => {
        (a && t.addEventListener("scroll", n, { passive: !0 }),
          u && t.addEventListener("resize", n));
      });
      let m =
          h && s
            ? (function (t, e) {
                let n,
                  o = null,
                  f = W(t);
                function a() {
                  var t;
                  (clearTimeout(n),
                    null == (t = o) || t.disconnect(),
                    (o = null));
                }
                return (
                  !(function u(c, s) {
                    (void 0 === c && (c = !1), void 0 === s && (s = 1), a());
                    let d = t.getBoundingClientRect(),
                      { left: h, top: p, width: m, height: g } = d;
                    if ((c || e(), !m || !g)) return;
                    let w = {
                        rootMargin:
                          -l(p) +
                          "px " +
                          -l(f.clientWidth - (h + m)) +
                          "px " +
                          -l(f.clientHeight - (p + g)) +
                          "px " +
                          -l(h) +
                          "px",
                        threshold: r(0, i(1, s)) || 1,
                      },
                      y = !0;
                    function v(e) {
                      let i = e[0].intersectionRatio;
                      if (i !== s) {
                        if (!y) return u();
                        i
                          ? u(!1, i)
                          : (n = setTimeout(() => {
                              u(!1, 1e-7);
                            }, 1e3));
                      }
                      (1 !== i || tx(d, t.getBoundingClientRect()) || u(),
                        (y = !1));
                    }
                    try {
                      o = new IntersectionObserver(v, {
                        ...w,
                        root: f.ownerDocument,
                      });
                    } catch (t) {
                      o = new IntersectionObserver(v, w);
                    }
                    o.observe(t);
                  })(!0),
                  a
                );
              })(h, n)
            : null,
        g = -1,
        w = null;
      c &&
        ((w = new ResizeObserver((t) => {
          let [i] = t;
          (i &&
            i.target === h &&
            w &&
            (w.unobserve(e),
            cancelAnimationFrame(g),
            (g = requestAnimationFrame(() => {
              var t;
              null == (t = w) || t.observe(e);
            }))),
            n());
        })),
        h && !d && w.observe(h),
        w.observe(e));
      let y = d ? tc(t) : null;
      return (
        d &&
          (function e() {
            let i = tc(t);
            (y && !tx(y, i) && n(), (y = i), (f = requestAnimationFrame(e)));
          })(),
        n(),
        () => {
          var t;
          (p.forEach((t) => {
            (a && t.removeEventListener("scroll", n),
              u && t.removeEventListener("resize", n));
          }),
            null == m || m(),
            null == (t = w) || t.disconnect(),
            (w = null),
            d && cancelAnimationFrame(f));
        }
      );
    }
    let tR = function (t) {
        return (
          void 0 === t && (t = 0),
          {
            name: "offset",
            options: t,
            async fn(e) {
              var n, i;
              let { x: r, y: o, placement: l, middlewareData: f } = e,
                a = await F(e, t);
              return l === (null == (n = f.offset) ? void 0 : n.placement) &&
                null != (i = f.arrow) &&
                i.alignmentOffset
                ? {}
                : { x: r + a.x, y: o + a.y, data: { ...a, placement: l } };
            },
          }
        );
      },
      tT = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "autoPlacement",
            options: t,
            async fn(e) {
              var i, r, o, l;
              let {
                  rects: f,
                  middlewareData: a,
                  placement: u,
                  platform: h,
                  elements: p,
                } = e,
                {
                  crossAxis: m = !1,
                  alignment: g,
                  allowedPlacements: v = n,
                  autoAlignment: x = !0,
                  ...b
                } = c(t, e),
                R =
                  void 0 !== g || v === n
                    ? ((l = g || null)
                        ? [
                            ...v.filter((t) => d(t) === l),
                            ...v.filter((t) => d(t) !== l),
                          ]
                        : v.filter((t) => s(t) === t)
                      ).filter((t) => !l || d(t) === l || (!!x && y(t) !== t))
                    : v,
                T = await P(e, b),
                L = (null == (i = a.autoPlacement) ? void 0 : i.index) || 0,
                A = R[L];
              if (null == A) return {};
              let S = w(
                A,
                f,
                await (null == h.isRTL ? void 0 : h.isRTL(p.floating)),
              );
              if (u !== A) return { reset: { placement: R[0] } };
              let E = [T[s(A)], T[S[0]], T[S[1]]],
                C = [
                  ...((null == (r = a.autoPlacement) ? void 0 : r.overflows) ||
                    []),
                  { placement: A, overflows: E },
                ],
                O = R[L + 1];
              if (O)
                return {
                  data: { index: L + 1, overflows: C },
                  reset: { placement: O },
                };
              let D = C.map((t) => {
                  let e = d(t.placement);
                  return [
                    t.placement,
                    e && m
                      ? t.overflows.slice(0, 2).reduce((t, e) => t + e, 0)
                      : t.overflows[0],
                    t.overflows,
                  ];
                }).sort((t, e) => t[1] - e[1]),
                k =
                  (null ==
                  (o = D.filter((t) =>
                    t[2].slice(0, d(t[0]) ? 2 : 3).every((t) => t <= 0),
                  )[0])
                    ? void 0
                    : o[0]) || D[0][0];
              return k !== u
                ? {
                    data: { index: L + 1, overflows: C },
                    reset: { placement: k },
                  }
                : {};
            },
          }
        );
      },
      tL = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "shift",
            options: t,
            async fn(e) {
              let { x: n, y: o, placement: l } = e,
                {
                  mainAxis: f = !0,
                  crossAxis: a = !1,
                  limiter: u = {
                    fn: (t) => {
                      let { x: e, y: n } = t;
                      return { x: e, y: n };
                    },
                  },
                  ...d
                } = c(t, e),
                p = { x: n, y: o },
                m = await P(e, d),
                w = g(s(l)),
                y = h(w),
                v = p[y],
                x = p[w];
              if (f) {
                let t = "y" === y ? "top" : "left",
                  e = "y" === y ? "bottom" : "right",
                  n = v + m[t],
                  o = v - m[e];
                v = r(n, i(v, o));
              }
              if (a) {
                let t = "y" === w ? "top" : "left",
                  e = "y" === w ? "bottom" : "right",
                  n = x + m[t],
                  o = x - m[e];
                x = r(n, i(x, o));
              }
              let b = u.fn({ ...e, [y]: v, [w]: x });
              return {
                ...b,
                data: { x: b.x - n, y: b.y - o, enabled: { [y]: f, [w]: a } },
              };
            },
          }
        );
      },
      tA = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "flip",
            options: t,
            async fn(e) {
              var n, i, r, o, l;
              let f,
                a,
                u,
                {
                  placement: h,
                  middlewareData: p,
                  rects: m,
                  initialPlacement: L,
                  platform: A,
                  elements: S,
                } = e,
                {
                  mainAxis: E = !0,
                  crossAxis: C = !0,
                  fallbackPlacements: O,
                  fallbackStrategy: D = "bestFit",
                  fallbackAxisSideDirection: k = "none",
                  flipAlignment: F = !0,
                  ...H
                } = c(t, e);
              if (null != (n = p.arrow) && n.alignmentOffset) return {};
              let M = s(h),
                B = g(L),
                W = s(L) === L,
                V = await (null == A.isRTL ? void 0 : A.isRTL(S.floating)),
                z = O || (W || !F ? [T(L)] : ((f = T(L)), [y(L), f, y(f)])),
                j = "none" !== k;
              !O &&
                j &&
                z.push(
                  ...((a = d(L)),
                  (u = (function (t, e, n) {
                    switch (t) {
                      case "top":
                      case "bottom":
                        if (n) return e ? x : v;
                        return e ? v : x;
                      case "left":
                      case "right":
                        return e ? b : R;
                      default:
                        return [];
                    }
                  })(s(L), "start" === k, V)),
                  a &&
                    ((u = u.map((t) => t + "-" + a)),
                    F && (u = u.concat(u.map(y)))),
                  u),
                );
              let N = [L, ...z],
                _ = await P(e, H),
                I = [],
                U = (null == (i = p.flip) ? void 0 : i.overflows) || [];
              if ((E && I.push(_[M]), C)) {
                let t = w(h, m, V);
                I.push(_[t[0]], _[t[1]]);
              }
              if (
                ((U = [...U, { placement: h, overflows: I }]),
                !I.every((t) => t <= 0))
              ) {
                let t = ((null == (r = p.flip) ? void 0 : r.index) || 0) + 1,
                  e = N[t];
                if (
                  e &&
                  ("alignment" !== C ||
                    B === g(e) ||
                    U.every((t) => g(t.placement) !== B || t.overflows[0] > 0))
                )
                  return {
                    data: { index: t, overflows: U },
                    reset: { placement: e },
                  };
                let n =
                  null ==
                  (o = U.filter((t) => t.overflows[0] <= 0).sort(
                    (t, e) => t.overflows[1] - e.overflows[1],
                  )[0])
                    ? void 0
                    : o.placement;
                if (!n)
                  switch (D) {
                    case "bestFit": {
                      let t =
                        null ==
                        (l = U.filter((t) => {
                          if (j) {
                            let e = g(t.placement);
                            return e === B || "y" === e;
                          }
                          return !0;
                        })
                          .map((t) => [
                            t.placement,
                            t.overflows
                              .filter((t) => t > 0)
                              .reduce((t, e) => t + e, 0),
                          ])
                          .sort((t, e) => t[1] - e[1])[0])
                          ? void 0
                          : l[0];
                      t && (n = t);
                      break;
                    }
                    case "initialPlacement":
                      n = L;
                  }
                if (h !== n) return { reset: { placement: n } };
              }
              return {};
            },
          }
        );
      },
      tS = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "size",
            options: t,
            async fn(e) {
              var n, o;
              let l,
                f,
                { placement: a, rects: u, platform: h, elements: p } = e,
                { apply: m = () => {}, ...w } = c(t, e),
                y = await P(e, w),
                v = s(a),
                x = d(a),
                b = "y" === g(a),
                { width: R, height: T } = u.floating;
              "top" === v || "bottom" === v
                ? ((l = v),
                  (f =
                    x ===
                    ((await (null == h.isRTL ? void 0 : h.isRTL(p.floating)))
                      ? "start"
                      : "end")
                      ? "left"
                      : "right"))
                : ((f = v), (l = "end" === x ? "top" : "bottom"));
              let L = T - y.top - y.bottom,
                A = R - y.left - y.right,
                S = i(T - y[l], L),
                E = i(R - y[f], A),
                C = !e.middlewareData.shift,
                O = S,
                D = E;
              if (
                (null != (n = e.middlewareData.shift) && n.enabled.x && (D = A),
                null != (o = e.middlewareData.shift) && o.enabled.y && (O = L),
                C && !x)
              ) {
                let t = r(y.left, 0),
                  e = r(y.right, 0),
                  n = r(y.top, 0),
                  i = r(y.bottom, 0);
                b
                  ? (D =
                      R - 2 * (0 !== t || 0 !== e ? t + e : r(y.left, y.right)))
                  : (O =
                      T -
                      2 * (0 !== n || 0 !== i ? n + i : r(y.top, y.bottom)));
              }
              await m({ ...e, availableWidth: D, availableHeight: O });
              let k = await h.getDimensions(p.floating);
              return R !== k.width || T !== k.height
                ? { reset: { rects: !0 } }
                : {};
            },
          }
        );
      },
      tE = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "hide",
            options: t,
            async fn(e) {
              let { rects: n } = e,
                { strategy: i = "referenceHidden", ...r } = c(t, e);
              switch (i) {
                case "referenceHidden": {
                  let t = C(
                    await P(e, { ...r, elementContext: "reference" }),
                    n.reference,
                  );
                  return {
                    data: { referenceHiddenOffsets: t, referenceHidden: O(t) },
                  };
                }
                case "escaped": {
                  let t = C(await P(e, { ...r, altBoundary: !0 }), n.floating);
                  return { data: { escapedOffsets: t, escaped: O(t) } };
                }
                default:
                  return {};
              }
            },
          }
        );
      },
      tP = (t) => ({
        name: "arrow",
        options: t,
        async fn(e) {
          let {
              x: n,
              y: o,
              placement: l,
              rects: f,
              platform: a,
              elements: u,
              middlewareData: s,
            } = e,
            { element: m, padding: w = 0 } = c(t, e) || {};
          if (null == m) return {};
          let y = L(w),
            v = { x: n, y: o },
            x = h(g(l)),
            b = p(x),
            R = await a.getDimensions(m),
            T = "y" === x,
            A = T ? "clientHeight" : "clientWidth",
            S = f.reference[b] + f.reference[x] - v[x] - f.floating[b],
            E = v[x] - f.reference[x],
            P = await (null == a.getOffsetParent
              ? void 0
              : a.getOffsetParent(m)),
            C = P ? P[A] : 0;
          (C && (await (null == a.isElement ? void 0 : a.isElement(P)))) ||
            (C = u.floating[A] || f.floating[b]);
          let O = C / 2 - R[b] / 2 - 1,
            D = i(y[T ? "top" : "left"], O),
            k = i(y[T ? "bottom" : "right"], O),
            F = C - R[b] - k,
            H = C / 2 - R[b] / 2 + (S / 2 - E / 2),
            M = r(D, i(H, F)),
            B =
              !s.arrow &&
              null != d(l) &&
              H !== M &&
              f.reference[b] / 2 - (H < D ? D : k) - R[b] / 2 < 0,
            W = B ? (H < D ? H - D : H - F) : 0;
          return {
            [x]: v[x] + W,
            data: {
              [x]: M,
              centerOffset: H - M - W,
              ...(B && { alignmentOffset: W }),
            },
            reset: B,
          };
        },
      }),
      tC = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            name: "inline",
            options: t,
            async fn(e) {
              let {
                  placement: n,
                  elements: o,
                  rects: l,
                  platform: f,
                  strategy: a,
                } = e,
                { padding: u = 2, x: d, y: h } = c(t, e),
                p = Array.from(
                  (await (null == f.getClientRects
                    ? void 0
                    : f.getClientRects(o.reference))) || [],
                ),
                m = (function (t) {
                  let e = t.slice().sort((t, e) => t.y - e.y),
                    n = [],
                    i = null;
                  for (let t = 0; t < e.length; t++) {
                    let r = e[t];
                    (!i || r.y - i.y > i.height / 2
                      ? n.push([r])
                      : n[n.length - 1].push(r),
                      (i = r));
                  }
                  return n.map((t) => A(D(t)));
                })(p),
                w = A(D(p)),
                y = L(u),
                v = await f.getElementRects({
                  reference: {
                    getBoundingClientRect: function () {
                      if (
                        2 === m.length &&
                        m[0].left > m[1].right &&
                        null != d &&
                        null != h
                      )
                        return (
                          m.find(
                            (t) =>
                              d > t.left - y.left &&
                              d < t.right + y.right &&
                              h > t.top - y.top &&
                              h < t.bottom + y.bottom,
                          ) || w
                        );
                      if (m.length >= 2) {
                        if ("y" === g(n)) {
                          let t = m[0],
                            e = m[m.length - 1],
                            i = "top" === s(n),
                            r = t.top,
                            o = e.bottom,
                            l = i ? t.left : e.left,
                            f = i ? t.right : e.right;
                          return {
                            top: r,
                            bottom: o,
                            left: l,
                            right: f,
                            width: f - l,
                            height: o - r,
                            x: l,
                            y: r,
                          };
                        }
                        let t = "left" === s(n),
                          e = r(...m.map((t) => t.right)),
                          o = i(...m.map((t) => t.left)),
                          l = m.filter((n) =>
                            t ? n.left === o : n.right === e,
                          ),
                          f = l[0].top,
                          a = l[l.length - 1].bottom;
                        return {
                          top: f,
                          bottom: a,
                          left: o,
                          right: e,
                          width: e - o,
                          height: a - f,
                          x: o,
                          y: f,
                        };
                      }
                      return w;
                    },
                  },
                  floating: o.floating,
                  strategy: a,
                });
              return l.reference.x !== v.reference.x ||
                l.reference.y !== v.reference.y ||
                l.reference.width !== v.reference.width ||
                l.reference.height !== v.reference.height
                ? { reset: { rects: v } }
                : {};
            },
          }
        );
      },
      tO = function (t) {
        return (
          void 0 === t && (t = {}),
          {
            options: t,
            fn(e) {
              let { x: n, y: i, placement: r, rects: o, middlewareData: l } = e,
                {
                  offset: f = 0,
                  mainAxis: a = !0,
                  crossAxis: u = !0,
                } = c(t, e),
                d = { x: n, y: i },
                p = g(r),
                m = h(p),
                w = d[m],
                y = d[p],
                v = c(f, e),
                x =
                  "number" == typeof v
                    ? { mainAxis: v, crossAxis: 0 }
                    : { mainAxis: 0, crossAxis: 0, ...v };
              if (a) {
                let t = "y" === m ? "height" : "width",
                  e = o.reference[m] - o.floating[t] + x.mainAxis,
                  n = o.reference[m] + o.reference[t] - x.mainAxis;
                w < e ? (w = e) : w > n && (w = n);
              }
              if (u) {
                var b, R;
                let t = "y" === m ? "width" : "height",
                  e = k.has(s(r)),
                  n =
                    o.reference[p] -
                    o.floating[t] +
                    ((e && (null == (b = l.offset) ? void 0 : b[p])) || 0) +
                    (e ? 0 : x.crossAxis),
                  i =
                    o.reference[p] +
                    o.reference[t] +
                    (e ? 0 : (null == (R = l.offset) ? void 0 : R[p]) || 0) -
                    (e ? x.crossAxis : 0);
                y < n ? (y = n) : y > i && (y = i);
              }
              return { [m]: w, [p]: y };
            },
          }
        );
      },
      tD = (t, e, n) => {
        let i = new Map(),
          r = { platform: tv, ...n },
          o = { ...r.platform, _c: i };
        return E(t, e, { ...r, platform: o });
      };
    t.s(
      [
        "arrow",
        () => tP,
        "autoPlacement",
        () => tT,
        "autoUpdate",
        () => tb,
        "computePosition",
        () => tD,
        "flip",
        () => tA,
        "hide",
        () => tE,
        "inline",
        () => tC,
        "limitShift",
        () => tO,
        "offset",
        () => tR,
        "shift",
        () => tL,
        "size",
        () => tS,
      ],
      436035,
    );
    var tk = t.i(789783),
      tF = t.i(546564),
      tH = "undefined" != typeof document ? tk.useLayoutEffect : function () {};
    function tM(t, e) {
      let n, i, r;
      if (t === e) return !0;
      if (typeof t != typeof e) return !1;
      if ("function" == typeof t && t.toString() === e.toString()) return !0;
      if (t && e && "object" == typeof t) {
        if (Array.isArray(t)) {
          if ((n = t.length) !== e.length) return !1;
          for (i = n; 0 != i--; ) if (!tM(t[i], e[i])) return !1;
          return !0;
        }
        if ((n = (r = Object.keys(t)).length) !== Object.keys(e).length)
          return !1;
        for (i = n; 0 != i--; ) if (!{}.hasOwnProperty.call(e, r[i])) return !1;
        for (i = n; 0 != i--; ) {
          let n = r[i];
          if (("_owner" !== n || !t.$$typeof) && !tM(t[n], e[n])) return !1;
        }
        return !0;
      }
      return t != t && e != e;
    }
    function tB(t) {
      return "undefined" == typeof window
        ? 1
        : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
    }
    function tW(t, e) {
      let n = tB(t);
      return Math.round(e * n) / n;
    }
    function tV(t) {
      let e = tk.useRef(t);
      return (
        tH(() => {
          e.current = t;
        }),
        e
      );
    }
    function tz(t) {
      void 0 === t && (t = {});
      let {
          placement: e = "bottom",
          strategy: n = "absolute",
          middleware: i = [],
          platform: r,
          elements: { reference: o, floating: l } = {},
          transform: f = !0,
          whileElementsMounted: a,
          open: u,
        } = t,
        [c, s] = tk.useState({
          x: 0,
          y: 0,
          strategy: n,
          placement: e,
          middlewareData: {},
          isPositioned: !1,
        }),
        [d, h] = tk.useState(i);
      tM(d, i) || h(i);
      let [p, m] = tk.useState(null),
        [g, w] = tk.useState(null),
        y = tk.useCallback((t) => {
          t !== R.current && ((R.current = t), m(t));
        }, []),
        v = tk.useCallback((t) => {
          t !== T.current && ((T.current = t), w(t));
        }, []),
        x = o || p,
        b = l || g,
        R = tk.useRef(null),
        T = tk.useRef(null),
        L = tk.useRef(c),
        A = null != a,
        S = tV(a),
        E = tV(r),
        P = tV(u),
        C = tk.useCallback(() => {
          if (!R.current || !T.current) return;
          let t = { placement: e, strategy: n, middleware: d };
          (E.current && (t.platform = E.current),
            tD(R.current, T.current, t).then((t) => {
              let e = { ...t, isPositioned: !1 !== P.current };
              O.current &&
                !tM(L.current, e) &&
                ((L.current = e),
                tF.flushSync(() => {
                  s(e);
                }));
            }));
        }, [d, e, n, E, P]);
      tH(() => {
        !1 === u &&
          L.current.isPositioned &&
          ((L.current.isPositioned = !1),
          s((t) => ({ ...t, isPositioned: !1 })));
      }, [u]);
      let O = tk.useRef(!1);
      (tH(
        () => (
          (O.current = !0),
          () => {
            O.current = !1;
          }
        ),
        [],
      ),
        tH(() => {
          if ((x && (R.current = x), b && (T.current = b), x && b)) {
            if (S.current) return S.current(x, b, C);
            C();
          }
        }, [x, b, C, S, A]));
      let D = tk.useMemo(
          () => ({
            reference: R,
            floating: T,
            setReference: y,
            setFloating: v,
          }),
          [y, v],
        ),
        k = tk.useMemo(() => ({ reference: x, floating: b }), [x, b]),
        F = tk.useMemo(() => {
          let t = { position: n, left: 0, top: 0 };
          if (!k.floating) return t;
          let e = tW(k.floating, c.x),
            i = tW(k.floating, c.y);
          return f
            ? {
                ...t,
                transform: "translate(" + e + "px, " + i + "px)",
                ...(tB(k.floating) >= 1.5 && { willChange: "transform" }),
              }
            : { position: n, left: e, top: i };
        }, [n, f, k.floating, c.x, c.y]);
      return tk.useMemo(
        () => ({ ...c, update: C, refs: D, elements: k, floatingStyles: F }),
        [c, C, D, k, F],
      );
    }
    let tj = (t, e) => ({ ...tR(t), options: [t, e] }),
      tN = (t, e) => ({ ...tL(t), options: [t, e] }),
      t_ = (t, e) => ({ ...tO(t), options: [t, e] }),
      tI = (t, e) => ({ ...tA(t), options: [t, e] }),
      tU = (t, e) => ({ ...tS(t), options: [t, e] }),
      t$ = (t, e) => ({ ...tE(t), options: [t, e] }),
      tq = (t, e) => ({
        name: "arrow",
        options: t,
        fn(e) {
          let { element: n, padding: i } = "function" == typeof t ? t(e) : t;
          return n && {}.hasOwnProperty.call(n, "current")
            ? null != n.current
              ? tP({ element: n.current, padding: i }).fn(e)
              : {}
            : n
              ? tP({ element: n, padding: i }).fn(e)
              : {};
        },
        options: [t, e],
      });
    t.s(
      [
        "arrow",
        () => tq,
        "flip",
        () => tI,
        "hide",
        () => t$,
        "limitShift",
        () => t_,
        "offset",
        () => tj,
        "shift",
        () => tN,
        "size",
        () => tU,
        "useFloating",
        () => tz,
      ],
      323337,
    );
  },
]);
