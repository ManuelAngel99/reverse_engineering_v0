(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  10378,
  (e, t, n) => {
    !(function () {
      "use strict";
      var e = {};
      ((e.d = function (t, n) {
        for (var r in n)
          e.o(n, r) &&
            !e.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
      }),
        (e.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (e.r = function (e) {
          ("undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 }));
        }),
        void 0 !== e &&
          (e.ab =
            "/ROOT/node_modules/.pnpm/next@16.0.2-canary.24_patch_hash=gcu3wxnuyfwkkf5xpr5q3nci24_@babel+core@7.28.3_@opentelemetry_igsvcqjw6qpqi3bfxmrpsujan4/node_modules/next/dist/compiled/web-vitals/"));
      var n = {};
      (e.r(n),
        e.d(n, {
          CLSThresholds: function () {
            return P;
          },
          FCPThresholds: function () {
            return S;
          },
          FIDThresholds: function () {
            return ee;
          },
          INPThresholds: function () {
            return F;
          },
          LCPThresholds: function () {
            return H;
          },
          TTFBThresholds: function () {
            return G;
          },
          onCLS: function () {
            return j;
          },
          onFCP: function () {
            return O;
          },
          onFID: function () {
            return et;
          },
          onINP: function () {
            return N;
          },
          onLCP: function () {
            return U;
          },
          onTTFB: function () {
            return W;
          },
        }));
      var r,
        i,
        o,
        a,
        l,
        s = -1,
        u = function (e) {
          addEventListener(
            "pageshow",
            function (t) {
              t.persisted && ((s = t.timeStamp), e(t));
            },
            !0,
          );
        },
        c = function () {
          var e =
            self.performance &&
            performance.getEntriesByType &&
            performance.getEntriesByType("navigation")[0];
          if (e && e.responseStart > 0 && e.responseStart < performance.now())
            return e;
        },
        d = function () {
          var e = c();
          return (e && e.activationStart) || 0;
        },
        f = function (e, t) {
          var n = c(),
            r = "navigate";
          return (
            s >= 0
              ? (r = "back-forward-cache")
              : n &&
                (document.prerendering || d() > 0
                  ? (r = "prerender")
                  : document.wasDiscarded
                    ? (r = "restore")
                    : n.type && (r = n.type.replace(/_/g, "-"))),
            {
              name: e,
              value: void 0 === t ? -1 : t,
              rating: "good",
              delta: 0,
              entries: [],
              id: "v4-"
                .concat(Date.now(), "-")
                .concat(Math.floor(0x82f79cd8fff * Math.random()) + 1e12),
              navigationType: r,
            }
          );
        },
        p = function (e, t, n) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
              var r = new PerformanceObserver(function (e) {
                Promise.resolve().then(function () {
                  t(e.getEntries());
                });
              });
              return (
                r.observe(Object.assign({ type: e, buffered: !0 }, n || {})),
                r
              );
            }
          } catch (e) {}
        },
        h = function (e, t, n, r) {
          var i, o;
          return function (a) {
            var l;
            t.value >= 0 &&
              (a || r) &&
              ((o = t.value - (i || 0)) || void 0 === i) &&
              ((i = t.value),
              (t.delta = o),
              (l = t.value),
              (t.rating =
                l > n[1] ? "poor" : l > n[0] ? "needs-improvement" : "good"),
              e(t));
          };
        },
        g = function (e) {
          requestAnimationFrame(function () {
            return requestAnimationFrame(function () {
              return e();
            });
          });
        },
        m = function (e) {
          document.addEventListener("visibilitychange", function () {
            "hidden" === document.visibilityState && e();
          });
        },
        v = function (e) {
          var t = !1;
          return function () {
            t || (e(), (t = !0));
          };
        },
        y = -1,
        b = function () {
          return "hidden" !== document.visibilityState || document.prerendering
            ? 1 / 0
            : 0;
        },
        w = function (e) {
          "hidden" === document.visibilityState &&
            y > -1 &&
            ((y = "visibilitychange" === e.type ? e.timeStamp : 0), C());
        },
        _ = function () {
          (addEventListener("visibilitychange", w, !0),
            addEventListener("prerenderingchange", w, !0));
        },
        C = function () {
          (removeEventListener("visibilitychange", w, !0),
            removeEventListener("prerenderingchange", w, !0));
        },
        x = function () {
          return (
            y < 0 &&
              ((y = b()),
              _(),
              u(function () {
                setTimeout(function () {
                  ((y = b()), _());
                }, 0);
              })),
            {
              get firstHiddenTime() {
                return y;
              },
            }
          );
        },
        E = function (e) {
          document.prerendering
            ? addEventListener(
                "prerenderingchange",
                function () {
                  return e();
                },
                !0,
              )
            : e();
        },
        S = [1800, 3e3],
        O = function (e, t) {
          ((t = t || {}),
            E(function () {
              var n,
                r = x(),
                i = f("FCP"),
                o = p("paint", function (e) {
                  e.forEach(function (e) {
                    "first-contentful-paint" === e.name &&
                      (o.disconnect(),
                      e.startTime < r.firstHiddenTime &&
                        ((i.value = Math.max(e.startTime - d(), 0)),
                        i.entries.push(e),
                        n(!0)));
                  });
                });
              o &&
                ((n = h(e, i, S, t.reportAllChanges)),
                u(function (r) {
                  ((n = h(e, (i = f("FCP")), S, t.reportAllChanges)),
                    g(function () {
                      ((i.value = performance.now() - r.timeStamp), n(!0));
                    }));
                }));
            }));
        },
        P = [0.1, 0.25],
        j = function (e, t) {
          ((t = t || {}),
            O(
              v(function () {
                var n,
                  r = f("CLS", 0),
                  i = 0,
                  o = [],
                  a = function (e) {
                    (e.forEach(function (e) {
                      if (!e.hadRecentInput) {
                        var t = o[0],
                          n = o[o.length - 1];
                        i &&
                        e.startTime - n.startTime < 1e3 &&
                        e.startTime - t.startTime < 5e3
                          ? ((i += e.value), o.push(e))
                          : ((i = e.value), (o = [e]));
                      }
                    }),
                      i > r.value && ((r.value = i), (r.entries = o), n()));
                  },
                  l = p("layout-shift", a);
                l &&
                  ((n = h(e, r, P, t.reportAllChanges)),
                  m(function () {
                    (a(l.takeRecords()), n(!0));
                  }),
                  u(function () {
                    ((i = 0),
                      (n = h(e, (r = f("CLS", 0)), P, t.reportAllChanges)),
                      g(function () {
                        return n();
                      }));
                  }),
                  setTimeout(n, 0));
              }),
            ));
        },
        T = 0,
        I = 1 / 0,
        A = 0,
        R = function (e) {
          e.forEach(function (e) {
            e.interactionId &&
              ((I = Math.min(I, e.interactionId)),
              (T = (A = Math.max(A, e.interactionId)) ? (A - I) / 7 + 1 : 0));
          });
        },
        M = function () {
          "interactionCount" in performance ||
            r ||
            (r = p("event", R, {
              type: "event",
              buffered: !0,
              durationThreshold: 0,
            }));
        },
        k = [],
        L = new Map(),
        q = 0,
        z = [],
        $ = function (e) {
          if (
            (z.forEach(function (t) {
              return t(e);
            }),
            e.interactionId || "first-input" === e.entryType)
          ) {
            var t = k[k.length - 1],
              n = L.get(e.interactionId);
            if (n || k.length < 10 || e.duration > t.latency) {
              if (n)
                e.duration > n.latency
                  ? ((n.entries = [e]), (n.latency = e.duration))
                  : e.duration === n.latency &&
                    e.startTime === n.entries[0].startTime &&
                    n.entries.push(e);
              else {
                var r = {
                  id: e.interactionId,
                  latency: e.duration,
                  entries: [e],
                };
                (L.set(r.id, r), k.push(r));
              }
              (k.sort(function (e, t) {
                return t.latency - e.latency;
              }),
                k.length > 10 &&
                  k.splice(10).forEach(function (e) {
                    return L.delete(e.id);
                  }));
            }
          }
        },
        D = function (e) {
          var t = self.requestIdleCallback || self.setTimeout,
            n = -1;
          return (
            (e = v(e)),
            "hidden" === document.visibilityState ? e() : ((n = t(e)), m(e)),
            n
          );
        },
        F = [200, 500],
        N = function (e, t) {
          "PerformanceEventTiming" in self &&
            "interactionId" in PerformanceEventTiming.prototype &&
            ((t = t || {}),
            E(function () {
              M();
              var n,
                i,
                o = f("INP"),
                a = function (e) {
                  D(function () {
                    e.forEach($);
                    var t,
                      n =
                        ((t = Math.min(
                          k.length - 1,
                          Math.floor(
                            ((r ? T : performance.interactionCount || 0) - q) /
                              50,
                          ),
                        )),
                        k[t]);
                    n &&
                      n.latency !== o.value &&
                      ((o.value = n.latency), (o.entries = n.entries), i());
                  });
                },
                l = p("event", a, {
                  durationThreshold: null != (n = t.durationThreshold) ? n : 40,
                });
              ((i = h(e, o, F, t.reportAllChanges)),
                l &&
                  (l.observe({ type: "first-input", buffered: !0 }),
                  m(function () {
                    (a(l.takeRecords()), i(!0));
                  }),
                  u(function () {
                    ((q = 0),
                      (k.length = 0),
                      L.clear(),
                      (i = h(e, (o = f("INP")), F, t.reportAllChanges)));
                  })));
            }));
        },
        H = [2500, 4e3],
        B = {},
        U = function (e, t) {
          ((t = t || {}),
            E(function () {
              var n,
                r = x(),
                i = f("LCP"),
                o = function (e) {
                  (t.reportAllChanges || (e = e.slice(-1)),
                    e.forEach(function (e) {
                      e.startTime < r.firstHiddenTime &&
                        ((i.value = Math.max(e.startTime - d(), 0)),
                        (i.entries = [e]),
                        n());
                    }));
                },
                a = p("largest-contentful-paint", o);
              if (a) {
                n = h(e, i, H, t.reportAllChanges);
                var l = v(function () {
                  B[i.id] ||
                    (o(a.takeRecords()), a.disconnect(), (B[i.id] = !0), n(!0));
                });
                (["keydown", "click"].forEach(function (e) {
                  addEventListener(
                    e,
                    function () {
                      return D(l);
                    },
                    !0,
                  );
                }),
                  m(l),
                  u(function (r) {
                    ((n = h(e, (i = f("LCP")), H, t.reportAllChanges)),
                      g(function () {
                        ((i.value = performance.now() - r.timeStamp),
                          (B[i.id] = !0),
                          n(!0));
                      }));
                  }));
              }
            }));
        },
        G = [800, 1800],
        V = function e(t) {
          document.prerendering
            ? E(function () {
                return e(t);
              })
            : "complete" !== document.readyState
              ? addEventListener(
                  "load",
                  function () {
                    return e(t);
                  },
                  !0,
                )
              : setTimeout(t, 0);
        },
        W = function (e, t) {
          t = t || {};
          var n = f("TTFB"),
            r = h(e, n, G, t.reportAllChanges);
          V(function () {
            var i = c();
            i &&
              ((n.value = Math.max(i.responseStart - d(), 0)),
              (n.entries = [i]),
              r(!0),
              u(function () {
                (r = h(e, (n = f("TTFB", 0)), G, t.reportAllChanges))(!0);
              }));
          });
        },
        J = { passive: !0, capture: !0 },
        X = new Date(),
        Q = function (e, t) {
          i ||
            ((i = t), (o = e), (a = new Date()), Z(removeEventListener), K());
        },
        K = function () {
          if (o >= 0 && o < a - X) {
            var e = {
              entryType: "first-input",
              name: i.type,
              target: i.target,
              cancelable: i.cancelable,
              startTime: i.timeStamp,
              processingStart: i.timeStamp + o,
            };
            (l.forEach(function (t) {
              t(e);
            }),
              (l = []));
          }
        },
        Y = function (e) {
          if (e.cancelable) {
            var t,
              n,
              r,
              i =
                (e.timeStamp > 1e12 ? new Date() : performance.now()) -
                e.timeStamp;
            "pointerdown" == e.type
              ? ((t = function () {
                  (Q(i, e), r());
                }),
                (n = function () {
                  r();
                }),
                (r = function () {
                  (removeEventListener("pointerup", t, J),
                    removeEventListener("pointercancel", n, J));
                }),
                addEventListener("pointerup", t, J),
                addEventListener("pointercancel", n, J))
              : Q(i, e);
          }
        },
        Z = function (e) {
          ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(
            function (t) {
              return e(t, Y, J);
            },
          );
        },
        ee = [100, 300],
        et = function (e, t) {
          ((t = t || {}),
            E(function () {
              var n,
                r = x(),
                a = f("FID"),
                s = function (e) {
                  e.startTime < r.firstHiddenTime &&
                    ((a.value = e.processingStart - e.startTime),
                    a.entries.push(e),
                    n(!0));
                },
                c = function (e) {
                  e.forEach(s);
                },
                d = p("first-input", c);
              ((n = h(e, a, ee, t.reportAllChanges)),
                d &&
                  (m(
                    v(function () {
                      (c(d.takeRecords()), d.disconnect());
                    }),
                  ),
                  u(function () {
                    ((n = h(e, (a = f("FID")), ee, t.reportAllChanges)),
                      (l = []),
                      (o = -1),
                      (i = null),
                      Z(addEventListener),
                      l.push(s),
                      K());
                  })));
            }));
        };
      t.exports = n;
    })();
  },
  310626,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "useReportWebVitals", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let r = e.r(789783),
      i = e.r(10378);
    function o(e) {
      (0, r.useEffect)(() => {
        ((0, i.onCLS)(e),
          (0, i.onFID)(e),
          (0, i.onLCP)(e),
          (0, i.onINP)(e),
          (0, i.onFCP)(e),
          (0, i.onTTFB)(e));
      }, [e]);
    }
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default));
  },
  183559,
  (e, t, n) => {
    t.exports = e.r(310626);
  },
  907128,
  (e, t, n) => {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    var r = {
      cancelIdleCallback: function () {
        return a;
      },
      requestIdleCallback: function () {
        return o;
      },
    };
    for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
    let o =
        ("undefined" != typeof self &&
          self.requestIdleCallback &&
          self.requestIdleCallback.bind(window)) ||
        function (e) {
          let t = Date.now();
          return self.setTimeout(function () {
            e({
              didTimeout: !1,
              timeRemaining: function () {
                return Math.max(0, 50 - (Date.now() - t));
              },
            });
          }, 1);
        },
      a =
        ("undefined" != typeof self &&
          self.cancelIdleCallback &&
          self.cancelIdleCallback.bind(window)) ||
        function (e) {
          return clearTimeout(e);
        };
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default));
  },
  620453,
  (e, t, n) => {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    var r = {
      default: function () {
        return b;
      },
      handleClientScriptLoad: function () {
        return m;
      },
      initScriptLoader: function () {
        return v;
      },
    };
    for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
    let o = e.r(481258),
      a = e.r(744066),
      l = e.r(301224),
      s = o._(e.r(546564)),
      u = a._(e.r(789783)),
      c = e.r(708244),
      d = e.r(835358),
      f = e.r(907128),
      p = new Map(),
      h = new Set(),
      g = (e) => {
        let {
            src: t,
            id: n,
            onLoad: r = () => {},
            onReady: i = null,
            dangerouslySetInnerHTML: o,
            children: a = "",
            strategy: l = "afterInteractive",
            onError: u,
            stylesheets: c,
          } = e,
          f = n || t;
        if (f && h.has(f)) return;
        if (p.has(t)) {
          (h.add(f), p.get(t).then(r, u));
          return;
        }
        let g = () => {
            (i && i(), h.add(f));
          },
          m = document.createElement("script"),
          v = new Promise((e, t) => {
            (m.addEventListener("load", function (t) {
              (e(), r && r.call(this, t), g());
            }),
              m.addEventListener("error", function (e) {
                t(e);
              }));
          }).catch(function (e) {
            u && u(e);
          });
        (o
          ? ((m.innerHTML = o.__html || ""), g())
          : a
            ? ((m.textContent =
                "string" == typeof a ? a : Array.isArray(a) ? a.join("") : ""),
              g())
            : t && ((m.src = t), p.set(t, v)),
          (0, d.setAttributesFromProps)(m, e),
          "worker" === l && m.setAttribute("type", "text/partytown"),
          m.setAttribute("data-nscript", l),
          c &&
            ((e) => {
              if (s.default.preinit)
                return e.forEach((e) => {
                  s.default.preinit(e, { as: "style" });
                });
              if ("undefined" != typeof window) {
                let t = document.head;
                e.forEach((e) => {
                  let n = document.createElement("link");
                  ((n.type = "text/css"),
                    (n.rel = "stylesheet"),
                    (n.href = e),
                    t.appendChild(n));
                });
              }
            })(c),
          document.body.appendChild(m));
      };
    function m(e) {
      let { strategy: t = "afterInteractive" } = e;
      "lazyOnload" === t
        ? window.addEventListener("load", () => {
            (0, f.requestIdleCallback)(() => g(e));
          })
        : g(e);
    }
    function v(e) {
      (e.forEach(m),
        [
          ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
          ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
        ].forEach((e) => {
          let t = e.id || e.getAttribute("src");
          h.add(t);
        }));
    }
    function y(e) {
      let {
          id: t,
          src: n = "",
          onLoad: r = () => {},
          onReady: i = null,
          strategy: o = "afterInteractive",
          onError: a,
          stylesheets: d,
          ...p
        } = e,
        {
          updateScripts: m,
          scripts: v,
          getIsSsr: y,
          appDir: b,
          nonce: w,
        } = (0, u.useContext)(c.HeadManagerContext);
      w = p.nonce || w;
      let _ = (0, u.useRef)(!1);
      (0, u.useEffect)(() => {
        let e = t || n;
        _.current || (i && e && h.has(e) && i(), (_.current = !0));
      }, [i, t, n]);
      let C = (0, u.useRef)(!1);
      if (
        ((0, u.useEffect)(() => {
          if (!C.current) {
            if ("afterInteractive" === o) g(e);
            else
              "lazyOnload" === o &&
                ("complete" === document.readyState
                  ? (0, f.requestIdleCallback)(() => g(e))
                  : window.addEventListener("load", () => {
                      (0, f.requestIdleCallback)(() => g(e));
                    }));
            C.current = !0;
          }
        }, [e, o]),
        ("beforeInteractive" === o || "worker" === o) &&
          (m
            ? ((v[o] = (v[o] || []).concat([
                {
                  id: t,
                  src: n,
                  onLoad: r,
                  onReady: i,
                  onError: a,
                  ...p,
                  nonce: w,
                },
              ])),
              m(v))
            : y && y()
              ? h.add(t || n)
              : y && !y() && g({ ...e, nonce: w })),
        b)
      ) {
        if (
          (d &&
            d.forEach((e) => {
              s.default.preinit(e, { as: "style" });
            }),
          "beforeInteractive" === o)
        )
          if (!n)
            return (
              p.dangerouslySetInnerHTML &&
                ((p.children = p.dangerouslySetInnerHTML.__html),
                delete p.dangerouslySetInnerHTML),
              (0, l.jsx)("script", {
                nonce: w,
                dangerouslySetInnerHTML: {
                  __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([0, { ...p, id: t }])})`,
                },
              })
            );
          else
            return (
              s.default.preload(
                n,
                p.integrity
                  ? {
                      as: "script",
                      integrity: p.integrity,
                      nonce: w,
                      crossOrigin: p.crossOrigin,
                    }
                  : { as: "script", nonce: w, crossOrigin: p.crossOrigin },
              ),
              (0, l.jsx)("script", {
                nonce: w,
                dangerouslySetInnerHTML: {
                  __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([n, { ...p, id: t }])})`,
                },
              })
            );
        "afterInteractive" === o &&
          n &&
          s.default.preload(
            n,
            p.integrity
              ? {
                  as: "script",
                  integrity: p.integrity,
                  nonce: w,
                  crossOrigin: p.crossOrigin,
                }
              : { as: "script", nonce: w, crossOrigin: p.crossOrigin },
          );
      }
      return null;
    }
    Object.defineProperty(y, "__nextScript", { value: !0 });
    let b = y;
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default));
  },
  38415,
  (e, t, n) => {
    t.exports = e.r(620453);
  },
  284985,
  (e, t, n) => {
    "use strict";
    function r({
      widthInt: e,
      heightInt: t,
      blurWidth: n,
      blurHeight: r,
      blurDataURL: i,
      objectFit: o,
    }) {
      let a = n ? 40 * n : e,
        l = r ? 40 * r : t,
        s = a && l ? `viewBox='0 0 ${a} ${l}'` : "";
      return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${s}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${s ? "none" : "contain" === o ? "xMidYMid" : "cover" === o ? "xMidYMid slice" : "none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`;
    }
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "getImageBlurSvg", {
        enumerable: !0,
        get: function () {
          return r;
        },
      }));
  },
  620554,
  (e, t, n) => {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    var r = {
      VALID_LOADERS: function () {
        return o;
      },
      imageConfigDefault: function () {
        return a;
      },
    };
    for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
    let o = ["default", "imgix", "cloudinary", "akamai", "custom"],
      a = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        path: "/_next/image",
        loader: "default",
        loaderFile: "",
        domains: [],
        disableStaticImages: !1,
        minimumCacheTTL: 14400,
        formats: ["image/webp"],
        maximumRedirects: 3,
        dangerouslyAllowLocalIP: !1,
        dangerouslyAllowSVG: !1,
        contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
        contentDispositionType: "attachment",
        localPatterns: void 0,
        remotePatterns: [],
        qualities: [75],
        unoptimized: !1,
      };
  },
  892525,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "getImgProps", {
        enumerable: !0,
        get: function () {
          return s;
        },
      }),
      e.r(530975));
    let r = e.r(284985),
      i = e.r(620554),
      o = ["-moz-initial", "fill", "none", "scale-down", void 0];
    function a(e) {
      return void 0 !== e.default;
    }
    function l(e) {
      return void 0 === e
        ? e
        : "number" == typeof e
          ? Number.isFinite(e)
            ? e
            : NaN
          : "string" == typeof e && /^[0-9]+$/.test(e)
            ? parseInt(e, 10)
            : NaN;
    }
    function s(
      {
        src: e,
        sizes: t,
        unoptimized: n = !1,
        priority: s = !1,
        preload: u = !1,
        loading: c,
        className: d,
        quality: f,
        width: p,
        height: h,
        fill: g = !1,
        style: m,
        overrideSrc: v,
        onLoad: y,
        onLoadingComplete: b,
        placeholder: w = "empty",
        blurDataURL: _,
        fetchPriority: C,
        decoding: x = "async",
        layout: E,
        objectFit: S,
        objectPosition: O,
        lazyBoundary: P,
        lazyRoot: j,
        ...T
      },
      I,
    ) {
      var A;
      let R,
        M,
        k,
        { imgConf: L, showAltText: q, blurComplete: z, defaultLoader: $ } = I,
        D = L || i.imageConfigDefault;
      if ("allSizes" in D) R = D;
      else {
        let e = [...D.deviceSizes, ...D.imageSizes].sort((e, t) => e - t),
          t = D.deviceSizes.sort((e, t) => e - t),
          n = D.qualities?.sort((e, t) => e - t);
        R = { ...D, allSizes: e, deviceSizes: t, qualities: n };
      }
      if (void 0 === $)
        throw Object.defineProperty(
          Error(
            "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E163", enumerable: !1, configurable: !0 },
        );
      let F = T.loader || $;
      (delete T.loader, delete T.srcSet);
      let N = "__next_img_default" in F;
      if (N) {
        if ("custom" === R.loader)
          throw Object.defineProperty(
            Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),
            "__NEXT_ERROR_CODE",
            { value: "E252", enumerable: !1, configurable: !0 },
          );
      } else {
        let e = F;
        F = (t) => {
          let { config: n, ...r } = t;
          return e(r);
        };
      }
      if (E) {
        "fill" === E && (g = !0);
        let e = {
          intrinsic: { maxWidth: "100%", height: "auto" },
          responsive: { width: "100%", height: "auto" },
        }[E];
        e && (m = { ...m, ...e });
        let n = { responsive: "100vw", fill: "100vw" }[E];
        n && !t && (t = n);
      }
      let H = "",
        B = l(p),
        U = l(h);
      if ((A = e) && "object" == typeof A && (a(A) || void 0 !== A.src)) {
        let t = a(e) ? e.default : e;
        if (!t.src)
          throw Object.defineProperty(
            Error(
              `An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E460", enumerable: !1, configurable: !0 },
          );
        if (!t.height || !t.width)
          throw Object.defineProperty(
            Error(
              `An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E48", enumerable: !1, configurable: !0 },
          );
        if (
          ((M = t.blurWidth),
          (k = t.blurHeight),
          (_ = _ || t.blurDataURL),
          (H = t.src),
          !g)
        )
          if (B || U) {
            if (B && !U) {
              let e = B / t.width;
              U = Math.round(t.height * e);
            } else if (!B && U) {
              let e = U / t.height;
              B = Math.round(t.width * e);
            }
          } else ((B = t.width), (U = t.height));
      }
      let G = !s && !u && ("lazy" === c || void 0 === c);
      ((!(e = "string" == typeof e ? e : H) ||
        e.startsWith("data:") ||
        e.startsWith("blob:")) &&
        ((n = !0), (G = !1)),
        R.unoptimized && (n = !0),
        N &&
          !R.dangerouslyAllowSVG &&
          e.split("?", 1)[0].endsWith(".svg") &&
          (n = !0));
      let V = l(f),
        W = Object.assign(
          g
            ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: S,
                objectPosition: O,
              }
            : {},
          q ? {} : { color: "transparent" },
          m,
        ),
        J =
          z || "empty" === w
            ? null
            : "blur" === w
              ? `url("data:image/svg+xml;charset=utf-8,${(0, r.getImageBlurSvg)({ widthInt: B, heightInt: U, blurWidth: M, blurHeight: k, blurDataURL: _ || "", objectFit: W.objectFit })}")`
              : `url("${w}")`,
        X = o.includes(W.objectFit)
          ? "fill" === W.objectFit
            ? "100% 100%"
            : "cover"
          : W.objectFit,
        Q = J
          ? {
              backgroundSize: X,
              backgroundPosition: W.objectPosition || "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundImage: J,
            }
          : {},
        K = (function ({
          config: e,
          src: t,
          unoptimized: n,
          width: r,
          quality: i,
          sizes: o,
          loader: a,
        }) {
          if (n) return { src: t, srcSet: void 0, sizes: void 0 };
          let { widths: l, kind: s } = (function (
              { deviceSizes: e, allSizes: t },
              n,
              r,
            ) {
              if (r) {
                let n = /(^|\s)(1?\d?\d)vw/g,
                  i = [];
                for (let e; (e = n.exec(r)); ) i.push(parseInt(e[2]));
                if (i.length) {
                  let n = 0.01 * Math.min(...i);
                  return { widths: t.filter((t) => t >= e[0] * n), kind: "w" };
                }
                return { widths: t, kind: "w" };
              }
              return "number" != typeof n
                ? { widths: e, kind: "w" }
                : {
                    widths: [
                      ...new Set(
                        [n, 2 * n].map(
                          (e) => t.find((t) => t >= e) || t[t.length - 1],
                        ),
                      ),
                    ],
                    kind: "x",
                  };
            })(e, r, o),
            u = l.length - 1;
          return {
            sizes: o || "w" !== s ? o : "100vw",
            srcSet: l
              .map(
                (n, r) =>
                  `${a({ config: e, src: t, quality: i, width: n })} ${"w" === s ? n : r + 1}${s}`,
              )
              .join(", "),
            src: a({ config: e, src: t, quality: i, width: l[u] }),
          };
        })({
          config: R,
          src: e,
          unoptimized: n,
          width: B,
          quality: V,
          sizes: t,
          loader: F,
        }),
        Y = G ? "lazy" : c;
      return {
        props: {
          ...T,
          loading: Y,
          fetchPriority: C,
          width: B,
          height: U,
          decoding: x,
          className: d,
          style: { ...W, ...Q },
          sizes: K.sizes,
          srcSet: K.srcSet,
          src: v || K.src,
        },
        meta: { unoptimized: n, preload: u || s, placeholder: w, fill: g },
      };
    }
  },
  846037,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "default", {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let r = e.r(789783),
      i = "undefined" == typeof window,
      o = i ? () => {} : r.useLayoutEffect,
      a = i ? () => {} : r.useEffect;
    function l(e) {
      let { headManager: t, reduceComponentsToState: n } = e;
      function l() {
        if (t && t.mountedInstances) {
          let e = r.Children.toArray(
            Array.from(t.mountedInstances).filter(Boolean),
          );
          t.updateHead(n(e));
        }
      }
      return (
        i && (t?.mountedInstances?.add(e.children), l()),
        o(
          () => (
            t?.mountedInstances?.add(e.children),
            () => {
              t?.mountedInstances?.delete(e.children);
            }
          ),
        ),
        o(
          () => (
            t && (t._pendingUpdate = l),
            () => {
              t && (t._pendingUpdate = l);
            }
          ),
        ),
        a(
          () => (
            t &&
              t._pendingUpdate &&
              (t._pendingUpdate(), (t._pendingUpdate = null)),
            () => {
              t &&
                t._pendingUpdate &&
                (t._pendingUpdate(), (t._pendingUpdate = null));
            }
          ),
        ),
        null
      );
    }
  },
  385598,
  (e, t, n) => {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    var r = {
      default: function () {
        return g;
      },
      defaultHead: function () {
        return d;
      },
    };
    for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
    let o = e.r(481258),
      a = e.r(744066),
      l = e.r(301224),
      s = a._(e.r(789783)),
      u = o._(e.r(846037)),
      c = e.r(708244);
    function d() {
      return [
        (0, l.jsx)("meta", { charSet: "utf-8" }, "charset"),
        (0, l.jsx)(
          "meta",
          { name: "viewport", content: "width=device-width" },
          "viewport",
        ),
      ];
    }
    function f(e, t) {
      return "string" == typeof t || "number" == typeof t
        ? e
        : t.type === s.default.Fragment
          ? e.concat(
              s.default.Children.toArray(t.props.children).reduce(
                (e, t) =>
                  "string" == typeof t || "number" == typeof t
                    ? e
                    : e.concat(t),
                [],
              ),
            )
          : e.concat(t);
    }
    e.r(530975);
    let p = ["name", "httpEquiv", "charSet", "itemProp"];
    function h(e) {
      let t, n, r, i;
      return e
        .reduce(f, [])
        .reverse()
        .concat(d().reverse())
        .filter(
          ((t = new Set()),
          (n = new Set()),
          (r = new Set()),
          (i = {}),
          (e) => {
            let o = !0,
              a = !1;
            if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
              a = !0;
              let n = e.key.slice(e.key.indexOf("$") + 1);
              t.has(n) ? (o = !1) : t.add(n);
            }
            switch (e.type) {
              case "title":
              case "base":
                n.has(e.type) ? (o = !1) : n.add(e.type);
                break;
              case "meta":
                for (let t = 0, n = p.length; t < n; t++) {
                  let n = p[t];
                  if (e.props.hasOwnProperty(n))
                    if ("charSet" === n) r.has(n) ? (o = !1) : r.add(n);
                    else {
                      let t = e.props[n],
                        r = i[n] || new Set();
                      ("name" !== n || !a) && r.has(t)
                        ? (o = !1)
                        : (r.add(t), (i[n] = r));
                    }
                }
            }
            return o;
          }),
        )
        .reverse()
        .map((e, t) => {
          let n = e.key || t;
          return s.default.cloneElement(e, { key: n });
        });
    }
    let g = function ({ children: e }) {
      let t = (0, s.useContext)(c.HeadManagerContext);
      return (0, l.jsx)(u.default, {
        reduceComponentsToState: h,
        headManager: t,
        children: e,
      });
    };
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default));
  },
  591518,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "ImageConfigContext", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let r = e.r(481258)._(e.r(789783)),
      i = e.r(620554),
      o = r.default.createContext(i.imageConfigDefault);
  },
  731244,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "RouterContext", {
        enumerable: !0,
        get: function () {
          return r;
        },
      }));
    let r = e.r(481258)._(e.r(789783)).default.createContext(null);
  },
  367359,
  (e, t, n) => {
    "use strict";
    function r(e, t) {
      let n = e || 75;
      return t?.qualities?.length
        ? t.qualities.reduce(
            (e, t) => (Math.abs(t - n) < Math.abs(e - n) ? t : e),
            0,
          )
        : n;
    }
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "findClosestQuality", {
        enumerable: !0,
        get: function () {
          return r;
        },
      }));
  },
  354896,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "default", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let r = e.r(367359);
    function i({ config: e, src: t, width: n, quality: i }) {
      if (
        t.startsWith("/") &&
        t.includes("?") &&
        e.localPatterns?.length === 1 &&
        "**" === e.localPatterns[0].pathname &&
        "" === e.localPatterns[0].search
      )
        throw Object.defineProperty(
          Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),
          "__NEXT_ERROR_CODE",
          { value: "E871", enumerable: !1, configurable: !0 },
        );
      let o = (0, r.findClosestQuality)(i, e);
      return `${e.path}?url=${encodeURIComponent(t)}&w=${n}&q=${o}${t.startsWith("/_next/static/media/") && 1 ? "&dpl=dpl_CSA32d8GqsBxLz4QZGLgy21oRLcV" : ""}`;
    }
    i.__next_img_default = !0;
    let o = i;
  },
  100120,
  (e, t, n) => {
    "use strict";
    (Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.defineProperty(n, "Image", {
        enumerable: !0,
        get: function () {
          return b;
        },
      }));
    let r = e.r(481258),
      i = e.r(744066),
      o = e.r(301224),
      a = i._(e.r(789783)),
      l = r._(e.r(546564)),
      s = r._(e.r(385598)),
      u = e.r(892525);
    e.r(620554);
    let c = e.r(591518);
    e.r(530975);
    let d = e.r(731244),
      f = r._(e.r(354896)),
      p = e.r(175682),
      h = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        qualities: [75],
        path: "/_next/image",
        loader: "default",
        dangerouslyAllowSVG: !1,
        unoptimized: !1,
      };
    function g(e, t, n, r, i, o, a) {
      let l = e?.src;
      e &&
        e["data-loaded-src"] !== l &&
        ((e["data-loaded-src"] = l),
        ("decode" in e ? e.decode() : Promise.resolve())
          .catch(() => {})
          .then(() => {
            if (e.parentElement && e.isConnected) {
              if (("empty" !== t && i(!0), n?.current)) {
                let t = new Event("load");
                Object.defineProperty(t, "target", { writable: !1, value: e });
                let r = !1,
                  i = !1;
                n.current({
                  ...t,
                  nativeEvent: t,
                  currentTarget: e,
                  target: e,
                  isDefaultPrevented: () => r,
                  isPropagationStopped: () => i,
                  persist: () => {},
                  preventDefault: () => {
                    ((r = !0), t.preventDefault());
                  },
                  stopPropagation: () => {
                    ((i = !0), t.stopPropagation());
                  },
                });
              }
              r?.current && r.current(e);
            }
          }));
    }
    function m(e) {
      return a.use ? { fetchPriority: e } : { fetchpriority: e };
    }
    "undefined" == typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    let v = (0, a.forwardRef)(
      (
        {
          src: e,
          srcSet: t,
          sizes: n,
          height: r,
          width: i,
          decoding: l,
          className: s,
          style: u,
          fetchPriority: c,
          placeholder: d,
          loading: f,
          unoptimized: h,
          fill: v,
          onLoadRef: y,
          onLoadingCompleteRef: b,
          setBlurComplete: w,
          setShowAltText: _,
          sizesInput: C,
          onLoad: x,
          onError: E,
          ...S
        },
        O,
      ) => {
        let P = (0, a.useCallback)(
            (e) => {
              e && (E && (e.src = e.src), e.complete && g(e, d, y, b, w, h, C));
            },
            [e, d, y, b, w, E, h, C],
          ),
          j = (0, p.useMergedRef)(O, P);
        return (0, o.jsx)("img", {
          ...S,
          ...m(c),
          loading: f,
          width: i,
          height: r,
          decoding: l,
          "data-nimg": v ? "fill" : "1",
          className: s,
          style: u,
          sizes: n,
          srcSet: t,
          src: e,
          ref: j,
          onLoad: (e) => {
            g(e.currentTarget, d, y, b, w, h, C);
          },
          onError: (e) => {
            (_(!0), "empty" !== d && w(!0), E && E(e));
          },
        });
      },
    );
    function y({ isAppRouter: e, imgAttributes: t }) {
      let n = {
        as: "image",
        imageSrcSet: t.srcSet,
        imageSizes: t.sizes,
        crossOrigin: t.crossOrigin,
        referrerPolicy: t.referrerPolicy,
        ...m(t.fetchPriority),
      };
      return e && l.default.preload
        ? (l.default.preload(t.src, n), null)
        : (0, o.jsx)(s.default, {
            children: (0, o.jsx)(
              "link",
              { rel: "preload", href: t.srcSet ? void 0 : t.src, ...n },
              "__nimg-" + t.src + t.srcSet + t.sizes,
            ),
          });
    }
    let b = (0, a.forwardRef)((e, t) => {
      let n = (0, a.useContext)(d.RouterContext),
        r = (0, a.useContext)(c.ImageConfigContext),
        i = (0, a.useMemo)(() => {
          let e = h || r,
            t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
            n = e.deviceSizes.sort((e, t) => e - t),
            i = e.qualities?.sort((e, t) => e - t);
          return {
            ...e,
            allSizes: t,
            deviceSizes: n,
            qualities: i,
            localPatterns:
              "undefined" == typeof window ? r?.localPatterns : e.localPatterns,
          };
        }, [r]),
        { onLoad: l, onLoadingComplete: s } = e,
        p = (0, a.useRef)(l);
      (0, a.useEffect)(() => {
        p.current = l;
      }, [l]);
      let g = (0, a.useRef)(s);
      (0, a.useEffect)(() => {
        g.current = s;
      }, [s]);
      let [m, b] = (0, a.useState)(!1),
        [w, _] = (0, a.useState)(!1),
        { props: C, meta: x } = (0, u.getImgProps)(e, {
          defaultLoader: f.default,
          imgConf: i,
          blurComplete: m,
          showAltText: w,
        });
      return (0, o.jsxs)(o.Fragment, {
        children: [
          (0, o.jsx)(v, {
            ...C,
            unoptimized: x.unoptimized,
            placeholder: x.placeholder,
            fill: x.fill,
            onLoadRef: p,
            onLoadingCompleteRef: g,
            setBlurComplete: b,
            setShowAltText: _,
            sizesInput: e.sizes,
            ref: t,
          }),
          x.preload
            ? (0, o.jsx)(y, { isAppRouter: !n, imgAttributes: C })
            : null,
        ],
      });
    });
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default));
  },
  422611,
  (e, t, n) => {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    var r = {
      default: function () {
        return c;
      },
      getImageProps: function () {
        return u;
      },
    };
    for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
    let o = e.r(481258),
      a = e.r(892525),
      l = e.r(100120),
      s = o._(e.r(354896));
    function u(e) {
      let { props: t } = (0, a.getImgProps)(e, {
        defaultLoader: s.default,
        imgConf: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [32, 48, 64, 96, 128, 256, 384],
          qualities: [75],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !1,
        },
      });
      for (let [e, n] of Object.entries(t)) void 0 === n && delete t[e];
      return { props: t };
    }
    let c = l.Image;
  },
  761532,
  (e, t, n) => {
    t.exports = e.r(422611);
  },
  772025,
  (e, t, n) => {
    !(function () {
      "use strict";
      var e = {
          114: function (e) {
            function t(e) {
              if ("string" != typeof e)
                throw TypeError(
                  "Path must be a string. Received " + JSON.stringify(e),
                );
            }
            function n(e, t) {
              for (
                var n, r = "", i = 0, o = -1, a = 0, l = 0;
                l <= e.length;
                ++l
              ) {
                if (l < e.length) n = e.charCodeAt(l);
                else if (47 === n) break;
                else n = 47;
                if (47 === n) {
                  if (o === l - 1 || 1 === a);
                  else if (o !== l - 1 && 2 === a) {
                    if (
                      r.length < 2 ||
                      2 !== i ||
                      46 !== r.charCodeAt(r.length - 1) ||
                      46 !== r.charCodeAt(r.length - 2)
                    ) {
                      if (r.length > 2) {
                        var s = r.lastIndexOf("/");
                        if (s !== r.length - 1) {
                          (-1 === s
                            ? ((r = ""), (i = 0))
                            : (i =
                                (r = r.slice(0, s)).length -
                                1 -
                                r.lastIndexOf("/")),
                            (o = l),
                            (a = 0));
                          continue;
                        }
                      } else if (2 === r.length || 1 === r.length) {
                        ((r = ""), (i = 0), (o = l), (a = 0));
                        continue;
                      }
                    }
                    t && (r.length > 0 ? (r += "/..") : (r = ".."), (i = 2));
                  } else
                    (r.length > 0
                      ? (r += "/" + e.slice(o + 1, l))
                      : (r = e.slice(o + 1, l)),
                      (i = l - o - 1));
                  ((o = l), (a = 0));
                } else 46 === n && -1 !== a ? ++a : (a = -1);
              }
              return r;
            }
            var r = {
              resolve: function () {
                for (
                  var e, r, i = "", o = !1, a = arguments.length - 1;
                  a >= -1 && !o;
                  a--
                )
                  (a >= 0
                    ? (r = arguments[a])
                    : (void 0 === e && (e = ""), (r = e)),
                    t(r),
                    0 !== r.length &&
                      ((i = r + "/" + i), (o = 47 === r.charCodeAt(0))));
                if (((i = n(i, !o)), o))
                  if (i.length > 0) return "/" + i;
                  else return "/";
                return i.length > 0 ? i : ".";
              },
              normalize: function (e) {
                if ((t(e), 0 === e.length)) return ".";
                var r = 47 === e.charCodeAt(0),
                  i = 47 === e.charCodeAt(e.length - 1);
                return (0 !== (e = n(e, !r)).length || r || (e = "."),
                e.length > 0 && i && (e += "/"),
                r)
                  ? "/" + e
                  : e;
              },
              isAbsolute: function (e) {
                return (t(e), e.length > 0 && 47 === e.charCodeAt(0));
              },
              join: function () {
                if (0 == arguments.length) return ".";
                for (var e, n = 0; n < arguments.length; ++n) {
                  var i = arguments[n];
                  (t(i),
                    i.length > 0 && (void 0 === e ? (e = i) : (e += "/" + i)));
                }
                return void 0 === e ? "." : r.normalize(e);
              },
              relative: function (e, n) {
                if (
                  (t(e),
                  t(n),
                  e === n || (e = r.resolve(e)) === (n = r.resolve(n)))
                )
                  return "";
                for (var i = 1; i < e.length && 47 === e.charCodeAt(i); ++i);
                for (
                  var o = e.length, a = o - i, l = 1;
                  l < n.length && 47 === n.charCodeAt(l);
                  ++l
                );
                for (
                  var s = n.length - l, u = a < s ? a : s, c = -1, d = 0;
                  d <= u;
                  ++d
                ) {
                  if (d === u) {
                    if (s > u) {
                      if (47 === n.charCodeAt(l + d)) return n.slice(l + d + 1);
                      else if (0 === d) return n.slice(l + d);
                    } else
                      a > u &&
                        (47 === e.charCodeAt(i + d)
                          ? (c = d)
                          : 0 === d && (c = 0));
                    break;
                  }
                  var f = e.charCodeAt(i + d);
                  if (f !== n.charCodeAt(l + d)) break;
                  47 === f && (c = d);
                }
                var p = "";
                for (d = i + c + 1; d <= o; ++d)
                  (d === o || 47 === e.charCodeAt(d)) &&
                    (0 === p.length ? (p += "..") : (p += "/.."));
                return p.length > 0
                  ? p + n.slice(l + c)
                  : ((l += c), 47 === n.charCodeAt(l) && ++l, n.slice(l));
              },
              _makeLong: function (e) {
                return e;
              },
              dirname: function (e) {
                if ((t(e), 0 === e.length)) return ".";
                for (
                  var n = e.charCodeAt(0),
                    r = 47 === n,
                    i = -1,
                    o = !0,
                    a = e.length - 1;
                  a >= 1;
                  --a
                )
                  if (47 === (n = e.charCodeAt(a))) {
                    if (!o) {
                      i = a;
                      break;
                    }
                  } else o = !1;
                return -1 === i
                  ? r
                    ? "/"
                    : "."
                  : r && 1 === i
                    ? "//"
                    : e.slice(0, i);
              },
              basename: function (e, n) {
                if (void 0 !== n && "string" != typeof n)
                  throw TypeError('"ext" argument must be a string');
                t(e);
                var r,
                  i = 0,
                  o = -1,
                  a = !0;
                if (void 0 !== n && n.length > 0 && n.length <= e.length) {
                  if (n.length === e.length && n === e) return "";
                  var l = n.length - 1,
                    s = -1;
                  for (r = e.length - 1; r >= 0; --r) {
                    var u = e.charCodeAt(r);
                    if (47 === u) {
                      if (!a) {
                        i = r + 1;
                        break;
                      }
                    } else
                      (-1 === s && ((a = !1), (s = r + 1)),
                        l >= 0 &&
                          (u === n.charCodeAt(l)
                            ? -1 == --l && (o = r)
                            : ((l = -1), (o = s))));
                  }
                  return (
                    i === o ? (o = s) : -1 === o && (o = e.length),
                    e.slice(i, o)
                  );
                }
                for (r = e.length - 1; r >= 0; --r)
                  if (47 === e.charCodeAt(r)) {
                    if (!a) {
                      i = r + 1;
                      break;
                    }
                  } else -1 === o && ((a = !1), (o = r + 1));
                return -1 === o ? "" : e.slice(i, o);
              },
              extname: function (e) {
                t(e);
                for (
                  var n = -1, r = 0, i = -1, o = !0, a = 0, l = e.length - 1;
                  l >= 0;
                  --l
                ) {
                  var s = e.charCodeAt(l);
                  if (47 === s) {
                    if (!o) {
                      r = l + 1;
                      break;
                    }
                    continue;
                  }
                  (-1 === i && ((o = !1), (i = l + 1)),
                    46 === s
                      ? -1 === n
                        ? (n = l)
                        : 1 !== a && (a = 1)
                      : -1 !== n && (a = -1));
                }
                return -1 === n ||
                  -1 === i ||
                  0 === a ||
                  (1 === a && n === i - 1 && n === r + 1)
                  ? ""
                  : e.slice(n, i);
              },
              format: function (e) {
                var t, n;
                if (null === e || "object" != typeof e)
                  throw TypeError(
                    'The "pathObject" argument must be of type Object. Received type ' +
                      typeof e,
                  );
                return (
                  (t = e.dir || e.root),
                  (n = e.base || (e.name || "") + (e.ext || "")),
                  t ? (t === e.root ? t + n : t + "/" + n) : n
                );
              },
              parse: function (e) {
                t(e);
                var n,
                  r = { root: "", dir: "", base: "", ext: "", name: "" };
                if (0 === e.length) return r;
                var i = e.charCodeAt(0),
                  o = 47 === i;
                o ? ((r.root = "/"), (n = 1)) : (n = 0);
                for (
                  var a = -1, l = 0, s = -1, u = !0, c = e.length - 1, d = 0;
                  c >= n;
                  --c
                ) {
                  if (47 === (i = e.charCodeAt(c))) {
                    if (!u) {
                      l = c + 1;
                      break;
                    }
                    continue;
                  }
                  (-1 === s && ((u = !1), (s = c + 1)),
                    46 === i
                      ? -1 === a
                        ? (a = c)
                        : 1 !== d && (d = 1)
                      : -1 !== a && (d = -1));
                }
                return (
                  -1 === a ||
                  -1 === s ||
                  0 === d ||
                  (1 === d && a === s - 1 && a === l + 1)
                    ? -1 !== s &&
                      (0 === l && o
                        ? (r.base = r.name = e.slice(1, s))
                        : (r.base = r.name = e.slice(l, s)))
                    : (0 === l && o
                        ? ((r.name = e.slice(1, a)), (r.base = e.slice(1, s)))
                        : ((r.name = e.slice(l, a)), (r.base = e.slice(l, s))),
                      (r.ext = e.slice(a, s))),
                  l > 0 ? (r.dir = e.slice(0, l - 1)) : o && (r.dir = "/"),
                  r
                );
              },
              sep: "/",
              delimiter: ":",
              win32: null,
              posix: null,
            };
            ((r.posix = r), (e.exports = r));
          },
        },
        n = {};
      function r(t) {
        var i = n[t];
        if (void 0 !== i) return i.exports;
        var o = (n[t] = { exports: {} }),
          a = !0;
        try {
          (e[t](o, o.exports, r), (a = !1));
        } finally {
          a && delete n[t];
        }
        return o.exports;
      }
      ((r.ab =
        "/ROOT/node_modules/.pnpm/next@16.0.2-canary.24_patch_hash=gcu3wxnuyfwkkf5xpr5q3nci24_@babel+core@7.28.3_@opentelemetry_igsvcqjw6qpqi3bfxmrpsujan4/node_modules/next/dist/compiled/path-browserify/"),
        (t.exports = r(114)));
    })();
  },
  615793,
  (e) => {
    "use strict";
    var t = e.i(302799);
    e.s(["ChevronRight", () => t.default]);
  },
  819696,
  63594,
  (e) => {
    "use strict";
    var t = e.i(789783);
    let n = (...e) =>
      e.filter((e, t, n) => !!e && n.indexOf(e) === t).join(" ");
    var r = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
    let i = (0, t.forwardRef)(
      (
        {
          color: e = "currentColor",
          size: i = 24,
          strokeWidth: o = 2,
          absoluteStrokeWidth: a,
          className: l = "",
          children: s,
          iconNode: u,
          ...c
        },
        d,
      ) =>
        (0, t.createElement)(
          "svg",
          {
            ref: d,
            ...r,
            width: i,
            height: i,
            stroke: e,
            strokeWidth: a ? (24 * Number(o)) / Number(i) : o,
            className: n("lucide", l),
            ...c,
          },
          [
            ...u.map(([e, n]) => (0, t.createElement)(e, n)),
            ...(Array.isArray(s) ? s : [s]),
          ],
        ),
    );
    e.s(["default", () => i], 63594);
    let o = (e, r) => {
      let o = (0, t.forwardRef)(({ className: o, ...a }, l) =>
        (0, t.createElement)(i, {
          ref: l,
          iconNode: r,
          className: n(
            `lucide-${e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
            o,
          ),
          ...a,
        }),
      );
      return ((o.displayName = `${e}`), o);
    };
    e.s(["default", () => o], 819696);
  },
  302799,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("ChevronRight", [
      ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
    ]);
    e.s(["default", () => t]);
  },
  661555,
  (e) => {
    "use strict";
    let t = (0, e.i(819696).default)("ChevronDown", [
      ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
    ]);
    e.s(["default", () => t]);
  },
  800443,
  (e) => {
    "use strict";
    var t = e.i(661555);
    e.s(["ChevronDown", () => t.default]);
  },
  819757,
  (e) => {
    "use strict";
    let t = 0,
      n = 3;
    function r() {
      return t;
    }
    function i() {
      return n;
    }
    function o(e) {
      n = e;
    }
    function a() {
      let e = document.querySelectorAll('style[type="text/tailwindcss"]'),
        t = /@theme(?:\s+[^{\s]+)?(?:\s+[^{\s]+)*\s*{([\s\S]*?)}/g,
        n = /--(color-[\w-]+):\s*([^;]+)/g,
        r = {};
      for (let i of e) {
        let e,
          o = i.textContent || "";
        for (; (e = t.exec(o)); ) {
          let t,
            i = e[1];
          for (; (t = n.exec(i)); ) r[t[1].replace("color-", "")] = t[2].trim();
        }
      }
      let i = document.createElement("div"),
        o = Object.entries(r)
          .map(([e, t]) => `--color-${e}: ${t};`)
          .join("");
      ((i.style.cssText = o), document.body.appendChild(i));
      let a = getComputedStyle(i),
        l = {};
      for (let e of Object.keys(r))
        l[e] = a.getPropertyValue(`--color-${e}`).trim();
      return (i.remove(), l);
    }
    function l() {
      return window.tailwind ? window.tailwind : null;
    }
    function s(e) {
      if (window.tailwind) {
        let n = { ...e };
        (delete n.safelist, (window.tailwind.config = n), (t = Date.now()));
      }
    }
    e.s([
      "extractThemeVariables",
      () => a,
      "getTailwindConfig",
      () => l,
      "getTailwindConfigVersion",
      () => r,
      "getTailwindVersion",
      () => i,
      "setGlobalTailwindConfig",
      () => s,
      "setTailwindVersion",
      () => o,
    ]);
  },
  83443,
  (e) => {
    "use strict";
    function t(e, t, n, r, i) {
      (e.call(t, "POST", `/api/cors?original=${encodeURIComponent(n)}`, ...i),
        t.setRequestHeader("x-v0-proxy-method", r),
        t.setRequestHeader("x-v0-proxy-url", n));
    }
    async function n(e, t, n, r) {
      let i,
        {
          headers: o = {},
          method: a = "GET",
          body: l,
          duplex: s,
          redirect: u,
          referrer: c,
          referrerPolicy: d,
          integrity: f,
          mode: p,
          credentials: h,
          cache: g,
        } = n instanceof Request ? n : (r ?? {}),
        m = {
          "x-v0-proxy-method": a,
          "x-v0-proxy-url": t,
          "x-v0-init-headers": JSON.stringify([...new Headers(o).entries()]),
          "x-v0-fetch-options": JSON.stringify({
            method: a,
            duplex: s,
            redirect: u,
            referrer: c,
            referrerPolicy: d,
            integrity: f,
            mode: p,
            credentials: h,
            cache: g,
          }),
        },
        v = new Headers(o);
      (v.has("content-length") &&
        (m["content-length"] = v.get("content-length") || ""),
        v.has("content-type") &&
          (m["content-type"] = v.get("content-type") || ""));
      let y = l;
      if (l instanceof ReadableStream) {
        let e = l.getReader(),
          t = [];
        for (;;) {
          let { done: n, value: r } = await e.read();
          if (n) break;
          t.push(r);
        }
        y = new Blob(t);
      }
      let b = await e(`/api/cors?original=${encodeURIComponent(t)}`, {
          method: "POST",
          headers: m,
          body: y,
          redirect: "manual",
        }),
        w = Object.fromEntries(
          JSON.parse(b.headers.get("x-v0-proxy-headers") || "[]"),
        );
      if (500 === b.status && b.headers.get("x-v0-proxy-error")) {
        let e = await b.json();
        if (e.isTypeError) throw TypeError("fetch failed");
        if (e.isSyntaxError) throw SyntaxError("fetch failed");
        throw Error("fetch failed");
      }
      let _ = parseInt(b.headers.get("x-v0-proxy-status") || "200"),
        C = "";
      if (_ >= 400) {
        try {
          let e = b.clone();
          C = await e.text();
        } catch (e) {}
        (console.error(`fetch to ${t} failed with status ${_} and body: ${C}`),
          (i = b.body || void 0));
      } else i = 204 === _ ? void 0 : b.body || void 0;
      return new Response(i, {
        status: _,
        statusText: b.statusText,
        headers: new Headers(w),
      });
    }
    e.s(["corsProxyFetch", () => n, "corsProxyXMLHttpRequest", () => t]);
  },
]);
