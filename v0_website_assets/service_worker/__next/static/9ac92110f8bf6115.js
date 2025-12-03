(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  861329,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "HandleISRError", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n =
      "undefined" == typeof window ? e.r(492568).workAsyncStorage : void 0;
    function o({ error: e }) {
      if (n) {
        let t = n.getStore();
        if (t?.isStaticGeneration) throw (e && console.error(e), e);
      }
      return null;
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  713699,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(301224),
      o = e.r(861329),
      l = {
        fontFamily:
          'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      a = {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "28px",
        margin: "0 8px",
      },
      u = function ({ error: e }) {
        let t = e?.digest;
        return (0, n.jsxs)("html", {
          id: "__next_error__",
          children: [
            (0, n.jsx)("head", {}),
            (0, n.jsxs)("body", {
              children: [
                (0, n.jsx)(o.HandleISRError, { error: e }),
                (0, n.jsx)("div", {
                  style: l,
                  children: (0, n.jsxs)("div", {
                    children: [
                      (0, n.jsxs)("h2", {
                        style: a,
                        children: [
                          "Application error: a ",
                          t ? "server" : "client",
                          "-side exception has occurred while loading ",
                          window.location.hostname,
                          " (see the",
                          " ",
                          t ? "server logs" : "browser console",
                          " for more information).",
                        ],
                      }),
                      t
                        ? (0, n.jsx)("p", {
                            style: a,
                            children: `Digest: ${t}`,
                          })
                        : null,
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
      };
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  946387,
  (e, t, r) => {
    "use strict";
    function n(e) {
      let t = e.indexOf("#"),
        r = e.indexOf("?"),
        n = r > -1 && (t < 0 || r < t);
      return n || t > -1
        ? {
            pathname: e.substring(0, n ? r : t),
            query: n ? e.substring(r, t > -1 ? t : void 0) : "",
            hash: t > -1 ? e.slice(t) : "",
          }
        : { pathname: e, query: "", hash: "" };
    }
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "parsePath", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  144050,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "addPathPrefix", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(946387);
    function o(e, t) {
      if (!e.startsWith("/") || !t) return e;
      let { pathname: r, query: o, hash: l } = (0, n.parsePath)(e);
      return `${t}${r}${o}${l}`;
    }
  },
  572450,
  (e, t, r) => {
    "use strict";
    function n(e) {
      return e.replace(/\/$/, "") || "/";
    }
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "removeTrailingSlash", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  87648,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "pathHasPrefix", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(946387);
    function o(e, t) {
      if ("string" != typeof e) return !1;
      let { pathname: r } = (0, n.parsePath)(e);
      return r === t || r.startsWith(t + "/");
    }
  },
  708244,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "HeadManagerContext", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = e.r(481258)._(e.r(789783)).default.createContext({});
  },
  835358,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "setAttributesFromProps", {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
    let n = {
        acceptCharset: "accept-charset",
        className: "class",
        htmlFor: "for",
        httpEquiv: "http-equiv",
        noModule: "noModule",
      },
      o = [
        "onLoad",
        "onReady",
        "dangerouslySetInnerHTML",
        "children",
        "onError",
        "strategy",
        "stylesheets",
      ];
    function l(e) {
      return ["async", "defer", "noModule"].includes(e);
    }
    function a(e, t) {
      for (let [r, a] of Object.entries(t)) {
        if (!t.hasOwnProperty(r) || o.includes(r) || void 0 === a) continue;
        let u = n[r] || r.toLowerCase();
        ("SCRIPT" === e.tagName && l(u)
          ? (e[u] = !!a)
          : e.setAttribute(u, String(a)),
          (!1 === a ||
            ("SCRIPT" === e.tagName && l(u) && (!a || "false" === a))) &&
            (e.setAttribute(u, ""), e.removeAttribute(u)));
      }
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  151731,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "getAssetPrefix", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(178773);
    function o() {
      let e = document.currentScript;
      if (!(e instanceof HTMLScriptElement))
        throw Object.defineProperty(
          new n.InvariantError(
            `Expected document.currentScript to be a <script> element. Received ${e} instead.`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E783", enumerable: !1, configurable: !0 },
        );
      let { pathname: t } = new URL(e.src),
        r = t.indexOf("/_next/");
      if (-1 === r)
        throw Object.defineProperty(
          new n.InvariantError(
            `Expected document.currentScript src to contain '/_next/'. Received ${e.src} instead.`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E784", enumerable: !1, configurable: !0 },
        );
      return t.slice(0, r);
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  642499,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "appBootstrap", {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = e.r(151731),
      o = e.r(835358);
    function l(e) {
      var t, r;
      let l = (0, n.getAssetPrefix)();
      ((t = self.__next_s),
        (r = () => {
          e(l);
        }),
        t && t.length
          ? t
              .reduce(
                (e, [t, r]) =>
                  e.then(
                    () =>
                      new Promise((e, n) => {
                        let l = document.createElement("script");
                        (r && (0, o.setAttributesFromProps)(l, r),
                          t
                            ? ((l.src = t),
                              (l.onload = () => e()),
                              (l.onerror = n))
                            : r && ((l.innerHTML = r.children), setTimeout(e)),
                          document.head.appendChild(l));
                      }),
                  ),
                Promise.resolve(),
              )
              .catch((e) => {
                console.error(e);
              })
              .then(() => {
                r();
              })
          : r());
    }
    ((window.next = { version: "16.0.2-canary.24", appDir: !0 }),
      ("function" == typeof r.default ||
        ("object" == typeof r.default && null !== r.default)) &&
        void 0 === r.default.__esModule &&
        (Object.defineProperty(r.default, "__esModule", { value: !0 }),
        Object.assign(r.default, r),
        (t.exports = r.default)));
  },
  429616,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      getObjectClassLabel: function () {
        return l;
      },
      isPlainObject: function () {
        return a;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    function l(e) {
      return Object.prototype.toString.call(e);
    }
    function a(e) {
      if ("[object Object]" !== l(e)) return !1;
      let t = Object.getPrototypeOf(e);
      return null === t || t.hasOwnProperty("isPrototypeOf");
    }
  },
  151931,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      default: function () {
        return a;
      },
      getProperError: function () {
        return u;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let l = e.r(429616);
    function a(e) {
      return (
        "object" == typeof e && null !== e && "name" in e && "message" in e
      );
    }
    function u(e) {
      let t;
      return a(e)
        ? e
        : Object.defineProperty(
            Error(
              (0, l.isPlainObject)(e)
                ? ((t = new WeakSet()),
                  JSON.stringify(e, (e, r) => {
                    if ("object" == typeof r && null !== r) {
                      if (t.has(r)) return "[Circular]";
                      t.add(r);
                    }
                    return r;
                  }))
                : e + "",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
    }
  },
  484965,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "reportGlobalError", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n =
      "function" == typeof reportError
        ? reportError
        : (e) => {
            globalThis.console.error(e);
          };
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  901935,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      isRecoverableError: function () {
        return d;
      },
      onRecoverableError: function () {
        return s;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let l = e.r(481258),
      a = e.r(942580),
      u = l._(e.r(151931)),
      i = e.r(484965),
      c = new WeakSet();
    function d(e) {
      return c.has(e);
    }
    let s = (e) => {
      let t = (0, u.default)(e) && "cause" in e ? e.cause : e;
      (0, a.isBailoutToCSRError)(t) || (0, i.reportGlobalError)(t);
    };
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  818205,
  (e, t, r) => {
    "use strict";
    t.exports = {};
  },
  826651,
  (e, t, r) => {
    ("trimStart" in String.prototype ||
      (String.prototype.trimStart = String.prototype.trimLeft),
      "trimEnd" in String.prototype ||
        (String.prototype.trimEnd = String.prototype.trimRight),
      "description" in Symbol.prototype ||
        Object.defineProperty(Symbol.prototype, "description", {
          configurable: !0,
          get: function () {
            var e = /\((.*)\)/.exec(this.toString());
            return e ? e[1] : void 0;
          },
        }),
      Array.prototype.flat ||
        ((Array.prototype.flat = function (e, t) {
          return (
            (t = this.concat.apply([], this)),
            e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
          );
        }),
        (Array.prototype.flatMap = function (e, t) {
          return this.map(e, t).flat();
        })),
      Promise.prototype.finally ||
        (Promise.prototype.finally = function (e) {
          if ("function" != typeof e) return this.then(e, e);
          var t = this.constructor || Promise;
          return this.then(
            function (r) {
              return t.resolve(e()).then(function () {
                return r;
              });
            },
            function (r) {
              return t.resolve(e()).then(function () {
                throw r;
              });
            },
          );
        }),
      Object.fromEntries ||
        (Object.fromEntries = function (e) {
          return Array.from(e).reduce(function (e, t) {
            return ((e[t[0]] = t[1]), e);
          }, {});
        }),
      Array.prototype.at ||
        (Array.prototype.at = function (e) {
          var t = Math.trunc(e) || 0;
          if ((t < 0 && (t += this.length), !(t < 0 || t >= this.length)))
            return this[t];
        }),
      Object.hasOwn ||
        (Object.hasOwn = function (e, t) {
          if (null == e)
            throw TypeError("Cannot convert undefined or null to object");
          return Object.prototype.hasOwnProperty.call(Object(e), t);
        }),
      "canParse" in URL ||
        (URL.canParse = function (e, t) {
          try {
            return (new URL(e, t), !0);
          } catch (e) {
            return !1;
          }
        }));
  },
  562262,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      e.r(826651),
      ("function" == typeof r.default ||
        ("object" == typeof r.default && null !== r.default)) &&
        void 0 === r.default.__esModule &&
        (Object.defineProperty(r.default, "__esModule", { value: !0 }),
        Object.assign(r.default, r),
        (t.exports = r.default)));
  },
  492576,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      onCaughtError: function () {
        return f;
      },
      onUncaughtError: function () {
        return p;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let l = e.r(481258),
      a = e.r(936566),
      u = e.r(942580),
      i = e.r(484965),
      c = e.r(813323),
      d = l._(e.r(713699)),
      s = {
        decorateDevError: (e) => e,
        handleClientError: () => {},
        originConsoleError: console.error.bind(console),
      };
    function f(e, t) {
      let r,
        n = t.errorBoundary?.constructor;
      if (
        (r =
          r ||
          (n === c.ErrorBoundaryHandler &&
            t.errorBoundary.props.errorComponent === d.default))
      )
        return p(e);
      (0, u.isBailoutToCSRError)(e) ||
        (0, a.isNextRouterError)(e) ||
        s.originConsoleError(e);
    }
    function p(e) {
      (0, u.isBailoutToCSRError)(e) ||
        (0, a.isNextRouterError)(e) ||
        (0, i.reportGlobalError)(e);
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  441322,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "createInitialRouterState", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(721088),
      o = e.r(25854),
      l = e.r(52580),
      a = e.r(536108),
      u = e.r(67781);
    function i({
      navigatedAt: e,
      initialFlightData: t,
      initialCanonicalUrlParts: r,
      initialRenderedSearch: i,
      initialParallelRoutes: c,
      location: d,
    }) {
      let s = r.join("/"),
        {
          tree: f,
          seedData: p,
          head: b,
        } = (0, u.getFlightDataPartsFromPath)(t[0]),
        y = {
          lazyData: null,
          rsc: p?.[0],
          prefetchRsc: null,
          head: null,
          prefetchHead: null,
          parallelRoutes: c,
          loading: p?.[2] ?? null,
          navigatedAt: e,
        },
        _ = d ? (0, n.createHrefFromUrl)(d) : s;
      return (
        (0, a.addRefreshMarkerToActiveParallelSegments)(f, _),
        (null === c || 0 === c.size) &&
          (0, o.fillLazyItemsTillLeafWithHead)(e, y, void 0, f, p, b),
        {
          tree: f,
          cache: y,
          pushRef: {
            pendingPush: !1,
            mpaNavigation: !1,
            preserveCustomHistoryState: !0,
          },
          focusAndScrollRef: {
            apply: !1,
            onlyHashChange: !1,
            hashFragment: null,
            segmentPaths: [],
          },
          canonicalUrl: _,
          renderedSearch: i,
          nextUrl:
            ((0, l.extractPathFromFlightRouterState)(f) || d?.pathname) ?? null,
          previousNextUrl: null,
          debugInfo: null,
        }
      );
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  471009,
  (e, t, r) => {
    "use strict";
    let n, o, l, a;
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "hydrate", {
        enumerable: !0,
        get: function () {
          return H;
        },
      }));
    let u = e.r(481258),
      i = e.r(301224);
    e.r(562262);
    let c = u._(e.r(363875)),
      d = u._(e.r(789783)),
      s = e.r(385743),
      f = e.r(708244),
      p = e.r(901935),
      b = e.r(492576),
      y = e.r(450268),
      _ = e.r(998965),
      h = e.r(807276),
      g = u._(e.r(125873)),
      j = e.r(441322);
    e.r(514371);
    let v = e.r(475324),
      O = e.r(67781),
      m = s.createFromReadableStream,
      P = s.createFromFetch,
      E = document,
      S = new TextEncoder(),
      x = !1,
      R = !1,
      M = null;
    function w(e) {
      if (0 === e[0]) l = [];
      else if (1 === e[0]) {
        if (!l)
          throw Object.defineProperty(
            Error("Unexpected server data: missing bootstrap script."),
            "__NEXT_ERROR_CODE",
            { value: "E18", enumerable: !1, configurable: !0 },
          );
        a ? a.enqueue(S.encode(e[1])) : l.push(e[1]);
      } else if (2 === e[0]) M = e[1];
      else if (3 === e[0]) {
        if (!l)
          throw Object.defineProperty(
            Error("Unexpected server data: missing bootstrap script."),
            "__NEXT_ERROR_CODE",
            { value: "E18", enumerable: !1, configurable: !0 },
          );
        let r = atob(e[1]),
          n = new Uint8Array(r.length);
        for (var t = 0; t < r.length; t++) n[t] = r.charCodeAt(t);
        a ? a.enqueue(n) : l.push(n);
      }
    }
    let C = function () {
      (a && !R && (a.close(), (R = !0), (l = void 0)), (x = !0));
    };
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", C, !1)
      : setTimeout(C);
    let T = (self.__next_f = self.__next_f || []);
    (T.forEach(w), (T.length = 0), (T.push = w));
    let A = new ReadableStream({
        start(e) {
          (l &&
            (l.forEach((t) => {
              e.enqueue("string" == typeof t ? S.encode(t) : t);
            }),
            x && !R) &&
            (null === e.desiredSize || e.desiredSize < 0
              ? e.error(
                  Object.defineProperty(
                    Error(
                      "The connection to the page was unexpectedly closed, possibly due to the stop button being clicked, loss of Wi-Fi, or an unstable internet connection.",
                    ),
                    "__NEXT_ERROR_CODE",
                    { value: "E117", enumerable: !1, configurable: !0 },
                  ),
                )
              : e.close(),
            (R = !0),
            (l = void 0)),
            (a = e));
        },
      }),
      U = window.__NEXT_CLIENT_RESUME;
    function I({
      initialRSCPayload: e,
      actionQueue: t,
      webSocket: r,
      staticIndicatorState: n,
    }) {
      return (0, i.jsx)(g.default, {
        actionQueue: t,
        globalErrorState: e.G,
        webSocket: r,
        staticIndicatorState: n,
      });
    }
    o = U
      ? Promise.resolve(
          P(U, {
            callServer: y.callServer,
            findSourceMapURL: _.findSourceMapURL,
            debugChannel: n,
          }),
        ).then(async (e) =>
          (0, O.createInitialRSCPayloadFromFallbackPrerender)(await U, e),
        )
      : m(A, {
          callServer: y.callServer,
          findSourceMapURL: _.findSourceMapURL,
          debugChannel: n,
          startTime: 0,
        });
    let L = d.default.Fragment;
    function D({ children: e }) {
      return e;
    }
    let F = {
      onDefaultTransitionIndicator: function () {
        return () => {};
      },
      onRecoverableError: p.onRecoverableError,
      onCaughtError: b.onCaughtError,
      onUncaughtError: b.onUncaughtError,
    };
    async function H(e, t) {
      let r,
        n,
        l = await o;
      (0, v.setAppBuildId)(l.b);
      let a = Date.now(),
        u = (0, h.createMutableActionQueue)(
          (0, j.createInitialRouterState)({
            navigatedAt: a,
            initialFlightData: l.f,
            initialCanonicalUrlParts: l.c,
            initialRenderedSearch: l.q,
            initialParallelRoutes: new Map(),
            location: window.location,
          }),
          e,
        ),
        s = (0, i.jsx)(L, {
          children: (0, i.jsx)(f.HeadManagerContext.Provider, {
            value: { appDir: !0 },
            children: (0, i.jsx)(D, {
              children: (0, i.jsx)(I, {
                initialRSCPayload: l,
                actionQueue: u,
                webSocket: n,
                staticIndicatorState: r,
              }),
            }),
          }),
        });
      "__next_error__" === document.documentElement.id
        ? c.default.createRoot(E, F).render(s)
        : d.default.startTransition(() => {
            c.default.hydrateRoot(E, s, { ...F, formState: M });
          });
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  428549,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    let n = e.r(642499);
    (e.r(901935), (window.next.turbopack = !0), (self.__webpack_hash__ = ""));
    let o = e.r(818205);
    ((0, n.appBootstrap)((t) => {
      let { hydrate: r } = e.r(471009);
      r(o, t);
    }),
      ("function" == typeof r.default ||
        ("object" == typeof r.default && null !== r.default)) &&
        void 0 === r.default.__esModule &&
        (Object.defineProperty(r.default, "__esModule", { value: !0 }),
        Object.assign(r.default, r),
        (t.exports = r.default)));
  },
]);
