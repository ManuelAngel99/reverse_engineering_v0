(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  464143,
  6216,
  (e) => {
    "use strict";
    function t(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) e[n] = r[n];
      }
      return e;
    }
    var r = (function e(r, n) {
      function i(e, i, o) {
        if ("undefined" != typeof document) {
          ("number" == typeof (o = t({}, n, o)).expires &&
            (o.expires = new Date(Date.now() + 864e5 * o.expires)),
            o.expires && (o.expires = o.expires.toUTCString()),
            (e = encodeURIComponent(e)
              .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
              .replace(/[()]/g, escape)));
          var s = "";
          for (var a in o)
            o[a] &&
              ((s += "; " + a), !0 !== o[a] && (s += "=" + o[a].split(";")[0]));
          return (document.cookie = e + "=" + r.write(i, e) + s);
        }
      }
      return Object.create(
        {
          set: i,
          get: function (e) {
            if ("undefined" != typeof document && (!arguments.length || e)) {
              for (
                var t = document.cookie ? document.cookie.split("; ") : [],
                  n = {},
                  i = 0;
                i < t.length;
                i++
              ) {
                var o = t[i].split("="),
                  s = o.slice(1).join("=");
                try {
                  var a = decodeURIComponent(o[0]);
                  if (((n[a] = r.read(s, a)), e === a)) break;
                } catch (e) {}
              }
              return e ? n[e] : n;
            }
          },
          remove: function (e, r) {
            i(e, "", t({}, r, { expires: -1 }));
          },
          withAttributes: function (r) {
            return e(this.converter, t({}, this.attributes, r));
          },
          withConverter: function (r) {
            return e(t({}, this.converter, r), this.attributes);
          },
        },
        {
          attributes: { value: Object.freeze(n) },
          converter: { value: Object.freeze(r) },
        },
      );
    })(
      {
        read: function (e) {
          return (
            '"' === e[0] && (e = e.slice(1, -1)),
            e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
          );
        },
        write: function (e) {
          return encodeURIComponent(e).replace(
            /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
            decodeURIComponent,
          );
        },
      },
      { path: "/" },
    );
    e.s(["default", () => r], 464143);
    let n = /(^|@)\S+:\d+/,
      i = /^\s*at .*(\S+:\d+|\(native\))/m,
      o = /^(eval@)?(\[native code\])?$/;
    function s(e, t) {
      var r, s, c, u, d, h, p, f, m, g, b, w;
      if (void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"]) {
        return (
          (r = e),
          (s = t),
          !r.stacktrace ||
          (r.message.includes("\n") &&
            r.message.split("\n").length > r.stacktrace.split("\n").length)
            ? (function (e, t) {
                let r = /Line (\d+).*script (?:in )?(\S+)/i,
                  n = e.message.split("\n"),
                  i = [];
                for (let e = 2, t = n.length; e < t; e += 2) {
                  let t = r.exec(n[e]);
                  t && i.push({ file: t[2], line: +t[1], raw: n[e] });
                }
                return l(i, void 0);
              })(r)
            : r.stack
              ? ((c = r),
                (u = s),
                l(
                  c.stack
                    .split("\n")
                    .filter(
                      (e) => !!e.match(n) && !e.match(/^Error created at/),
                    ),
                  u,
                ).map((e) => {
                  let t,
                    r = e.split("@"),
                    n = a(r.pop()),
                    i = r.shift() || "",
                    o =
                      i
                        .replace(/<anonymous function(: (\w+))?>/, "$2")
                        .replace(/\([^)]*\)/g, "") || void 0;
                  return (
                    i.match(/\(([^)]*)\)/) &&
                      (t = i.replace(/^[^(]+\(([^)]*)\)$/, "$1")),
                    {
                      function: o,
                      args:
                        void 0 === t || "[arguments not available]" === t
                          ? void 0
                          : t.split(","),
                      file: n[0],
                      line: n[1] ? +n[1] : void 0,
                      col: n[2] ? +n[2] : void 0,
                      raw: e,
                    }
                  );
                }))
              : (function (e, t) {
                  let r =
                      /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                    n = e.stacktrace.split("\n"),
                    i = [];
                  for (let e = 0, t = n.length; e < t; e += 2) {
                    let t = r.exec(n[e]);
                    t &&
                      i.push({
                        function: t[3] || void 0,
                        file: t[2],
                        line: t[1] ? +t[1] : void 0,
                        raw: n[e],
                      });
                  }
                  return l(i, void 0);
                })(r)
        );
      }
      if (e.stack && e.stack.match(i)) {
        return (
          (d = e),
          (h = t),
          (p = d.stack),
          (f = h),
          l(
            p.split("\n").filter((e) => !!e.match(i)),
            f,
          ).map((e) => {
            e.includes("(eval ") &&
              (e = e
                .replace(/eval code/g, "eval")
                .replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
            let t = e
                .replace(/^\s+/, "")
                .replace(/\(eval code/g, "(")
                .replace(/^.*?\s+/, ""),
              r = t.match(/ (\(.+\)$)/);
            t = r ? t.replace(r[0], "") : t;
            let n = a(r ? r[1] : t);
            return {
              function: (r && t) || void 0,
              file: ["eval", "<anonymous>"].includes(n[0]) ? void 0 : n[0],
              line: n[1] ? +n[1] : void 0,
              col: n[2] ? +n[2] : void 0,
              raw: e,
            };
          })
        );
      }
      if (e.stack) {
        return (
          (m = e),
          (g = t),
          (b = m.stack),
          (w = g),
          l(
            b.split("\n").filter((e) => !e.match(o)),
            w,
          ).map((e) => {
            if (
              (e.includes(" > eval") &&
                (e = e.replace(
                  / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                  ":$1",
                )),
              !e.includes("@") && !e.includes(":"))
            )
              return { function: e };
            {
              let t =
                  /(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,
                r = e.match(t),
                n = r && r[1] ? r[1] : void 0,
                i = a(e.replace(t, ""));
              return {
                function: n,
                file: i[0],
                line: i[1] ? +i[1] : void 0,
                col: i[2] ? +i[2] : void 0,
                raw: e,
              };
            }
          })
        );
      }
      if (t?.allowEmpty) return [];
      throw Error("Cannot parse given Error object");
    }
    function a(e) {
      if (!e.includes(":")) return [e, void 0, void 0];
      let t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g, ""));
      return [t[1], t[2] || void 0, t[3] || void 0];
    }
    function l(e, t) {
      return t && null != t.slice
        ? Array.isArray(t.slice)
          ? e.slice(t.slice[0], t.slice[1])
          : e.slice(0, t.slice)
        : e;
    }
    e.s(["parse", () => s], 6216);
  },
  489417,
  (e, t, r) => {
    "use strict";
    function n(e, t, r) {
      if (e) {
        for (let n of (r && (r = r.toLowerCase()), e))
          if (
            t === n.domain?.split(":", 1)[0].toLowerCase() ||
            r === n.defaultLocale.toLowerCase() ||
            n.locales?.some((e) => e.toLowerCase() === r)
          )
            return n;
      }
    }
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "detectDomainLocale", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  593967,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "addPathSuffix", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(946387);
    function i(e, t) {
      if (!e.startsWith("/") || !t) return e;
      let { pathname: r, query: i, hash: o } = (0, n.parsePath)(e);
      return `${r}${t}${i}${o}`;
    }
  },
  242066,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "addLocale", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(144050),
      i = e.r(87648);
    function o(e, t, r, o) {
      if (!t || t === r) return e;
      let s = e.toLowerCase();
      return !o &&
        ((0, i.pathHasPrefix)(s, "/api") ||
          (0, i.pathHasPrefix)(s, `/${t.toLowerCase()}`))
        ? e
        : (0, n.addPathPrefix)(e, `/${t}`);
    }
  },
  260348,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "formatNextPathnameInfo", {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
    let n = e.r(572450),
      i = e.r(144050),
      o = e.r(593967),
      s = e.r(242066);
    function a(e) {
      let t = (0, s.addLocale)(
        e.pathname,
        e.locale,
        e.buildId ? void 0 : e.defaultLocale,
        e.ignorePrefix,
      );
      return (
        (e.buildId || !e.trailingSlash) && (t = (0, n.removeTrailingSlash)(t)),
        e.buildId &&
          (t = (0, o.addPathSuffix)(
            (0, i.addPathPrefix)(t, `/_next/data/${e.buildId}`),
            "/" === e.pathname ? "index.json" : ".json",
          )),
        (t = (0, i.addPathPrefix)(t, e.basePath)),
        !e.buildId && e.trailingSlash
          ? t.endsWith("/")
            ? t
            : (0, o.addPathSuffix)(t, "/")
          : (0, n.removeTrailingSlash)(t)
      );
    }
  },
  314715,
  (e, t, r) => {
    "use strict";
    function n(e, t) {
      let r;
      if (t?.host && !Array.isArray(t.host))
        r = t.host.toString().split(":", 1)[0];
      else {
        if (!e.hostname) return;
        r = e.hostname;
      }
      return r.toLowerCase();
    }
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "getHostname", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  876728,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "normalizeLocalePath", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = new WeakMap();
    function i(e, t) {
      let r;
      if (!t) return { pathname: e };
      let i = n.get(t);
      i || ((i = t.map((e) => e.toLowerCase())), n.set(t, i));
      let o = e.split("/", 2);
      if (!o[1]) return { pathname: e };
      let s = o[1].toLowerCase(),
        a = i.indexOf(s);
      return a < 0
        ? { pathname: e }
        : ((r = t[a]),
          { pathname: (e = e.slice(r.length + 1) || "/"), detectedLocale: r });
    }
  },
  816199,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "removePathPrefix", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(87648);
    function i(e, t) {
      if (!(0, n.pathHasPrefix)(e, t)) return e;
      let r = e.slice(t.length);
      return r.startsWith("/") ? r : `/${r}`;
    }
  },
  74757,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "getNextPathnameInfo", {
        enumerable: !0,
        get: function () {
          return s;
        },
      }));
    let n = e.r(876728),
      i = e.r(816199),
      o = e.r(87648);
    function s(e, t) {
      let { basePath: r, i18n: s, trailingSlash: a } = t.nextConfig ?? {},
        l = { pathname: e, trailingSlash: "/" !== e ? e.endsWith("/") : a };
      r &&
        (0, o.pathHasPrefix)(l.pathname, r) &&
        ((l.pathname = (0, i.removePathPrefix)(l.pathname, r)),
        (l.basePath = r));
      let c = l.pathname;
      if (
        l.pathname.startsWith("/_next/data/") &&
        l.pathname.endsWith(".json")
      ) {
        let e = l.pathname
          .replace(/^\/_next\/data\//, "")
          .replace(/\.json$/, "")
          .split("/");
        ((l.buildId = e[0]),
          (c = "index" !== e[1] ? `/${e.slice(1).join("/")}` : "/"),
          !0 === t.parseData && (l.pathname = c));
      }
      if (s) {
        let e = t.i18nProvider
          ? t.i18nProvider.analyze(l.pathname)
          : (0, n.normalizeLocalePath)(l.pathname, s.locales);
        ((l.locale = e.detectedLocale),
          (l.pathname = e.pathname ?? l.pathname),
          !e.detectedLocale &&
            l.buildId &&
            (e = t.i18nProvider
              ? t.i18nProvider.analyze(c)
              : (0, n.normalizeLocalePath)(c, s.locales)).detectedLocale &&
            (l.locale = e.detectedLocale));
      }
      return l;
    }
  },
  667789,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "NextURL", {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(489417),
      i = e.r(260348),
      o = e.r(314715),
      s = e.r(74757),
      a =
        /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
    function l(e, t) {
      return new URL(
        String(e).replace(a, "localhost"),
        t && String(t).replace(a, "localhost"),
      );
    }
    let c = Symbol("NextURLInternal");
    class u {
      constructor(e, t, r) {
        let n, i;
        (("object" == typeof t && "pathname" in t) || "string" == typeof t
          ? ((n = t), (i = r || {}))
          : (i = r || t || {}),
          (this[c] = { url: l(e, n ?? i.base), options: i, basePath: "" }),
          this.analyze());
      }
      analyze() {
        var e, t, r, i, a;
        let l = (0, s.getNextPathnameInfo)(this[c].url.pathname, {
            nextConfig: this[c].options.nextConfig,
            parseData: !0,
            i18nProvider: this[c].options.i18nProvider,
          }),
          u = (0, o.getHostname)(this[c].url, this[c].options.headers);
        this[c].domainLocale = this[c].options.i18nProvider
          ? this[c].options.i18nProvider.detectDomainLocale(u)
          : (0, n.detectDomainLocale)(
              null == (t = this[c].options.nextConfig) || null == (e = t.i18n)
                ? void 0
                : e.domains,
              u,
            );
        let d =
          (null == (r = this[c].domainLocale) ? void 0 : r.defaultLocale) ||
          (null == (a = this[c].options.nextConfig) || null == (i = a.i18n)
            ? void 0
            : i.defaultLocale);
        ((this[c].url.pathname = l.pathname),
          (this[c].defaultLocale = d),
          (this[c].basePath = l.basePath ?? ""),
          (this[c].buildId = l.buildId),
          (this[c].locale = l.locale ?? d),
          (this[c].trailingSlash = l.trailingSlash));
      }
      formatPathname() {
        return (0, i.formatNextPathnameInfo)({
          basePath: this[c].basePath,
          buildId: this[c].buildId,
          defaultLocale: this[c].options.forceLocale
            ? void 0
            : this[c].defaultLocale,
          locale: this[c].locale,
          pathname: this[c].url.pathname,
          trailingSlash: this[c].trailingSlash,
        });
      }
      formatSearch() {
        return this[c].url.search;
      }
      get buildId() {
        return this[c].buildId;
      }
      set buildId(e) {
        this[c].buildId = e;
      }
      get locale() {
        return this[c].locale ?? "";
      }
      set locale(e) {
        var t, r;
        if (
          !this[c].locale ||
          !(null == (r = this[c].options.nextConfig) || null == (t = r.i18n)
            ? void 0
            : t.locales.includes(e))
        )
          throw Object.defineProperty(
            TypeError(`The NextURL configuration includes no locale "${e}"`),
            "__NEXT_ERROR_CODE",
            { value: "E597", enumerable: !1, configurable: !0 },
          );
        this[c].locale = e;
      }
      get defaultLocale() {
        return this[c].defaultLocale;
      }
      get domainLocale() {
        return this[c].domainLocale;
      }
      get searchParams() {
        return this[c].url.searchParams;
      }
      get host() {
        return this[c].url.host;
      }
      set host(e) {
        this[c].url.host = e;
      }
      get hostname() {
        return this[c].url.hostname;
      }
      set hostname(e) {
        this[c].url.hostname = e;
      }
      get port() {
        return this[c].url.port;
      }
      set port(e) {
        this[c].url.port = e;
      }
      get protocol() {
        return this[c].url.protocol;
      }
      set protocol(e) {
        this[c].url.protocol = e;
      }
      get href() {
        let e = this.formatPathname(),
          t = this.formatSearch();
        return `${this.protocol}//${this.host}${e}${t}${this.hash}`;
      }
      set href(e) {
        ((this[c].url = l(e)), this.analyze());
      }
      get origin() {
        return this[c].url.origin;
      }
      get pathname() {
        return this[c].url.pathname;
      }
      set pathname(e) {
        this[c].url.pathname = e;
      }
      get hash() {
        return this[c].url.hash;
      }
      set hash(e) {
        this[c].url.hash = e;
      }
      get search() {
        return this[c].url.search;
      }
      set search(e) {
        this[c].url.search = e;
      }
      get password() {
        return this[c].url.password;
      }
      set password(e) {
        this[c].url.password = e;
      }
      get username() {
        return this[c].url.username;
      }
      set username(e) {
        this[c].url.username = e;
      }
      get basePath() {
        return this[c].basePath;
      }
      set basePath(e) {
        this[c].basePath = e.startsWith("/") ? e : `/${e}`;
      }
      toString() {
        return this.href;
      }
      toJSON() {
        return this.href;
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          href: this.href,
          origin: this.origin,
          protocol: this.protocol,
          username: this.username,
          password: this.password,
          host: this.host,
          hostname: this.hostname,
          port: this.port,
          pathname: this.pathname,
          search: this.search,
          searchParams: this.searchParams,
          hash: this.hash,
        };
      }
      clone() {
        return new u(String(this), this[c].options);
      }
    }
  },
  766052,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      ACTION_SUFFIX: function () {
        return b;
      },
      APP_DIR_ALIAS: function () {
        return H;
      },
      CACHE_ONE_YEAR: function () {
        return C;
      },
      DOT_NEXT_ALIAS: function () {
        return D;
      },
      ESLINT_DEFAULT_DIRS: function () {
        return eo;
      },
      GSP_NO_RETURNED_VALUE: function () {
        return Q;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function () {
        return er;
      },
      GSSP_NO_RETURNED_VALUE: function () {
        return ee;
      },
      HTML_CONTENT_TYPE_HEADER: function () {
        return s;
      },
      INFINITE_CACHE: function () {
        return A;
      },
      INSTRUMENTATION_HOOK_FILENAME: function () {
        return L;
      },
      JSON_CONTENT_TYPE_HEADER: function () {
        return a;
      },
      MATCHED_PATH_HEADER: function () {
        return u;
      },
      MIDDLEWARE_FILENAME: function () {
        return O;
      },
      MIDDLEWARE_LOCATION_REGEXP: function () {
        return N;
      },
      NEXT_BODY_SUFFIX: function () {
        return _;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function () {
        return T;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function () {
        return x;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function () {
        return R;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function () {
        return P;
      },
      NEXT_CACHE_TAGS_HEADER: function () {
        return y;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function () {
        return S;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function () {
        return k;
      },
      NEXT_DATA_SUFFIX: function () {
        return w;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function () {
        return c;
      },
      NEXT_META_SUFFIX: function () {
        return v;
      },
      NEXT_QUERY_PARAM_PREFIX: function () {
        return l;
      },
      NEXT_RESUME_HEADER: function () {
        return E;
      },
      NON_STANDARD_NODE_ENV: function () {
        return en;
      },
      PAGES_DIR_ALIAS: function () {
        return U;
      },
      PRERENDER_REVALIDATE_HEADER: function () {
        return d;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function () {
        return h;
      },
      PROXY_FILENAME: function () {
        return j;
      },
      PROXY_LOCATION_REGEXP: function () {
        return I;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function () {
        return z;
      },
      ROOT_DIR_ALIAS: function () {
        return M;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function () {
        return G;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function () {
        return X;
      },
      RSC_ACTION_PROXY_ALIAS: function () {
        return W;
      },
      RSC_ACTION_VALIDATE_ALIAS: function () {
        return q;
      },
      RSC_CACHE_WRAPPER_ALIAS: function () {
        return $;
      },
      RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function () {
        return B;
      },
      RSC_MOD_REF_PROXY_ALIAS: function () {
        return F;
      },
      RSC_PREFETCH_SUFFIX: function () {
        return p;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function () {
        return f;
      },
      RSC_SEGMENT_SUFFIX: function () {
        return m;
      },
      RSC_SUFFIX: function () {
        return g;
      },
      SERVER_PROPS_EXPORT_ERROR: function () {
        return J;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function () {
        return Y;
      },
      SERVER_PROPS_SSG_CONFLICT: function () {
        return K;
      },
      SERVER_RUNTIME: function () {
        return es;
      },
      SSG_FALLBACK_EXPORT_ERROR: function () {
        return ei;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function () {
        return V;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function () {
        return Z;
      },
      TEXT_PLAIN_CONTENT_TYPE_HEADER: function () {
        return o;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function () {
        return et;
      },
      WEBPACK_LAYERS: function () {
        return ec;
      },
      WEBPACK_RESOURCE_QUERIES: function () {
        return eu;
      },
      WEB_SOCKET_MAX_RECONNECTIONS: function () {
        return ea;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let o = "text/plain",
      s = "text/html; charset=utf-8",
      a = "application/json; charset=utf-8",
      l = "nxtP",
      c = "nxtI",
      u = "x-matched-path",
      d = "x-prerender-revalidate",
      h = "x-prerender-revalidate-if-generated",
      p = ".prefetch.rsc",
      f = ".segments",
      m = ".segment.rsc",
      g = ".rsc",
      b = ".action",
      w = ".json",
      v = ".meta",
      _ = ".body",
      y = "x-next-cache-tags",
      x = "x-next-revalidated-tags",
      R = "x-next-revalidate-tag-token",
      E = "next-resume",
      S = 128,
      k = 256,
      P = 1024,
      T = "_N_T_",
      C = 31536e3,
      A = 0xfffffffe,
      O = "middleware",
      N = `(?:src/)?${O}`,
      j = "proxy",
      I = `(?:src/)?${j}`,
      L = "instrumentation",
      U = "private-next-pages",
      D = "private-dot-next",
      M = "private-next-root-dir",
      H = "private-next-app-dir",
      F = "private-next-rsc-mod-ref-proxy",
      q = "private-next-rsc-action-validate",
      W = "private-next-rsc-server-reference",
      $ = "private-next-rsc-cache-wrapper",
      B = "private-next-rsc-track-dynamic-import",
      X = "private-next-rsc-action-encryption",
      G = "private-next-rsc-action-client-wrapper",
      z =
        "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",
      V =
        "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps",
      Y =
        "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.",
      K =
        "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps",
      Z =
        "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props",
      J =
        "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export",
      Q =
        "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?",
      ee =
        "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?",
      et =
        "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.",
      er =
        "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",
      en =
        'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',
      ei =
        "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export",
      eo = ["app", "pages", "components", "lib", "src"],
      es = {
        edge: "edge",
        experimentalEdge: "experimental-edge",
        nodejs: "nodejs",
      },
      ea = 12,
      el = {
        shared: "shared",
        reactServerComponents: "rsc",
        serverSideRendering: "ssr",
        actionBrowser: "action-browser",
        apiNode: "api-node",
        apiEdge: "api-edge",
        middleware: "middleware",
        instrument: "instrument",
        edgeAsset: "edge-asset",
        appPagesBrowser: "app-pages-browser",
        pagesDirBrowser: "pages-dir-browser",
        pagesDirEdge: "pages-dir-edge",
        pagesDirNode: "pages-dir-node",
      },
      ec = {
        ...el,
        GROUP: {
          builtinReact: [el.reactServerComponents, el.actionBrowser],
          serverOnly: [
            el.reactServerComponents,
            el.actionBrowser,
            el.instrument,
            el.middleware,
          ],
          neutralTarget: [el.apiNode, el.apiEdge],
          clientOnly: [el.serverSideRendering, el.appPagesBrowser],
          bundled: [
            el.reactServerComponents,
            el.actionBrowser,
            el.serverSideRendering,
            el.appPagesBrowser,
            el.shared,
            el.instrument,
            el.middleware,
          ],
          appPages: [
            el.reactServerComponents,
            el.serverSideRendering,
            el.appPagesBrowser,
            el.actionBrowser,
          ],
        },
      },
      eu = {
        edgeSSREntry: "__next_edge_ssr_entry__",
        metadata: "__next_metadata__",
        metadataRoute: "__next_metadata_route__",
        metadataImageMeta: "__next_metadata_image_meta__",
      };
  },
  334127,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      fromNodeOutgoingHttpHeaders: function () {
        return s;
      },
      normalizeNextQueryParam: function () {
        return u;
      },
      splitCookiesString: function () {
        return a;
      },
      toNodeOutgoingHttpHeaders: function () {
        return l;
      },
      validateURL: function () {
        return c;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let o = e.r(766052);
    function s(e) {
      let t = new Headers();
      for (let [r, n] of Object.entries(e))
        for (let e of Array.isArray(n) ? n : [n])
          void 0 !== e &&
            ("number" == typeof e && (e = e.toString()), t.append(r, e));
      return t;
    }
    function a(e) {
      var t,
        r,
        n,
        i,
        o,
        s = [],
        a = 0;
      function l() {
        for (; a < e.length && /\s/.test(e.charAt(a)); ) a += 1;
        return a < e.length;
      }
      for (; a < e.length; ) {
        for (t = a, o = !1; l(); )
          if ("," === (r = e.charAt(a))) {
            for (
              n = a, a += 1, l(), i = a;
              a < e.length &&
              "=" !== (r = e.charAt(a)) &&
              ";" !== r &&
              "," !== r;

            )
              a += 1;
            a < e.length && "=" === e.charAt(a)
              ? ((o = !0), (a = i), s.push(e.substring(t, n)), (t = a))
              : (a = n + 1);
          } else a += 1;
        (!o || a >= e.length) && s.push(e.substring(t, e.length));
      }
      return s;
    }
    function l(e) {
      let t = {},
        r = [];
      if (e)
        for (let [n, i] of e.entries())
          "set-cookie" === n.toLowerCase()
            ? (r.push(...a(i)), (t[n] = 1 === r.length ? r[0] : r))
            : (t[n] = i);
      return t;
    }
    function c(e) {
      try {
        return String(new URL(String(e)));
      } catch (t) {
        throw Object.defineProperty(
          Error(
            `URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,
            { cause: t },
          ),
          "__NEXT_ERROR_CODE",
          { value: "E61", enumerable: !1, configurable: !0 },
        );
      }
    }
    function u(e) {
      for (let t of [
        o.NEXT_QUERY_PARAM_PREFIX,
        o.NEXT_INTERCEPTION_MARKER_PREFIX,
      ])
        if (e !== t && e.startsWith(t)) return e.substring(t.length);
      return null;
    }
  },
  645395,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      PageSignatureError: function () {
        return o;
      },
      RemovedPageError: function () {
        return s;
      },
      RemovedUAError: function () {
        return a;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    class o extends Error {
      constructor({ page: e }) {
        super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
      }
    }
    class s extends Error {
      constructor() {
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
      }
    }
    class a extends Error {
      constructor() {
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
      }
    }
  },
  432631,
  (e, t, r) => {
    "use strict";
    var n = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      o = Object.getOwnPropertyNames,
      s = Object.prototype.hasOwnProperty,
      a = {},
      l = {
        RequestCookies: () => m,
        ResponseCookies: () => g,
        parseCookie: () => d,
        parseSetCookie: () => h,
        stringifyCookie: () => u,
      };
    for (var c in l) n(a, c, { get: l[c], enumerable: !0 });
    function u(e) {
      var t;
      let r = [
          "path" in e && e.path && `Path=${e.path}`,
          "expires" in e &&
            (e.expires || 0 === e.expires) &&
            `Expires=${("number" == typeof e.expires ? new Date(e.expires) : e.expires).toUTCString()}`,
          "maxAge" in e && "number" == typeof e.maxAge && `Max-Age=${e.maxAge}`,
          "domain" in e && e.domain && `Domain=${e.domain}`,
          "secure" in e && e.secure && "Secure",
          "httpOnly" in e && e.httpOnly && "HttpOnly",
          "sameSite" in e && e.sameSite && `SameSite=${e.sameSite}`,
          "partitioned" in e && e.partitioned && "Partitioned",
          "priority" in e && e.priority && `Priority=${e.priority}`,
        ].filter(Boolean),
        n = `${e.name}=${encodeURIComponent(null != (t = e.value) ? t : "")}`;
      return 0 === r.length ? n : `${n}; ${r.join("; ")}`;
    }
    function d(e) {
      let t = new Map();
      for (let r of e.split(/; */)) {
        if (!r) continue;
        let e = r.indexOf("=");
        if (-1 === e) {
          t.set(r, "true");
          continue;
        }
        let [n, i] = [r.slice(0, e), r.slice(e + 1)];
        try {
          t.set(n, decodeURIComponent(null != i ? i : "true"));
        } catch {}
      }
      return t;
    }
    function h(e) {
      if (!e) return;
      let [[t, r], ...n] = d(e),
        {
          domain: i,
          expires: o,
          httponly: s,
          maxage: a,
          path: l,
          samesite: c,
          secure: u,
          partitioned: h,
          priority: m,
        } = Object.fromEntries(
          n.map(([e, t]) => [e.toLowerCase().replace(/-/g, ""), t]),
        );
      {
        var g,
          b,
          w = {
            name: t,
            value: decodeURIComponent(r),
            domain: i,
            ...(o && { expires: new Date(o) }),
            ...(s && { httpOnly: !0 }),
            ...("string" == typeof a && { maxAge: Number(a) }),
            path: l,
            ...(c && {
              sameSite: p.includes((g = (g = c).toLowerCase())) ? g : void 0,
            }),
            ...(u && { secure: !0 }),
            ...(m && {
              priority: f.includes((b = (b = m).toLowerCase())) ? b : void 0,
            }),
            ...(h && { partitioned: !0 }),
          };
        let e = {};
        for (let t in w) w[t] && (e[t] = w[t]);
        return e;
      }
    }
    t.exports = ((e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of o(t))
          s.call(e, l) ||
            l === r ||
            n(e, l, {
              get: () => t[l],
              enumerable: !(a = i(t, l)) || a.enumerable,
            });
      return e;
    })(n({}, "__esModule", { value: !0 }), a);
    var p = ["strict", "lax", "none"],
      f = ["low", "medium", "high"],
      m = class {
        constructor(e) {
          ((this._parsed = new Map()), (this._headers = e));
          const t = e.get("cookie");
          if (t)
            for (const [e, r] of d(t))
              this._parsed.set(e, { name: e, value: r });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e) {
          let t = "string" == typeof e[0] ? e[0] : e[0].name;
          return this._parsed.get(t);
        }
        getAll(...e) {
          var t;
          let r = Array.from(this._parsed);
          if (!e.length) return r.map(([e, t]) => t);
          let n =
            "string" == typeof e[0]
              ? e[0]
              : null == (t = e[0])
                ? void 0
                : t.name;
          return r.filter(([e]) => e === n).map(([e, t]) => t);
        }
        has(e) {
          return this._parsed.has(e);
        }
        set(...e) {
          let [t, r] = 1 === e.length ? [e[0].name, e[0].value] : e,
            n = this._parsed;
          return (
            n.set(t, { name: t, value: r }),
            this._headers.set(
              "cookie",
              Array.from(n)
                .map(([e, t]) => u(t))
                .join("; "),
            ),
            this
          );
        }
        delete(e) {
          let t = this._parsed,
            r = Array.isArray(e) ? e.map((e) => t.delete(e)) : t.delete(e);
          return (
            this._headers.set(
              "cookie",
              Array.from(t)
                .map(([e, t]) => u(t))
                .join("; "),
            ),
            r
          );
        }
        clear() {
          return (this.delete(Array.from(this._parsed.keys())), this);
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()]
            .map((e) => `${e.name}=${encodeURIComponent(e.value)}`)
            .join("; ");
        }
      },
      g = class {
        constructor(e) {
          var t, r, n;
          ((this._parsed = new Map()), (this._headers = e));
          const i =
            null !=
            (n =
              null != (r = null == (t = e.getSetCookie) ? void 0 : t.call(e))
                ? r
                : e.get("set-cookie"))
              ? n
              : [];
          for (const e of Array.isArray(i)
            ? i
            : (function (e) {
                if (!e) return [];
                var t,
                  r,
                  n,
                  i,
                  o,
                  s = [],
                  a = 0;
                function l() {
                  for (; a < e.length && /\s/.test(e.charAt(a)); ) a += 1;
                  return a < e.length;
                }
                for (; a < e.length; ) {
                  for (t = a, o = !1; l(); )
                    if ("," === (r = e.charAt(a))) {
                      for (
                        n = a, a += 1, l(), i = a;
                        a < e.length &&
                        "=" !== (r = e.charAt(a)) &&
                        ";" !== r &&
                        "," !== r;

                      )
                        a += 1;
                      a < e.length && "=" === e.charAt(a)
                        ? ((o = !0),
                          (a = i),
                          s.push(e.substring(t, n)),
                          (t = a))
                        : (a = n + 1);
                    } else a += 1;
                  (!o || a >= e.length) && s.push(e.substring(t, e.length));
                }
                return s;
              })(i)) {
            const t = h(e);
            t && this._parsed.set(t.name, t);
          }
        }
        get(...e) {
          let t = "string" == typeof e[0] ? e[0] : e[0].name;
          return this._parsed.get(t);
        }
        getAll(...e) {
          var t;
          let r = Array.from(this._parsed.values());
          if (!e.length) return r;
          let n =
            "string" == typeof e[0]
              ? e[0]
              : null == (t = e[0])
                ? void 0
                : t.name;
          return r.filter((e) => e.name === n);
        }
        has(e) {
          return this._parsed.has(e);
        }
        set(...e) {
          let [t, r, n] = 1 === e.length ? [e[0].name, e[0].value, e[0]] : e,
            i = this._parsed;
          return (
            i.set(
              t,
              (function (e = { name: "", value: "" }) {
                return (
                  "number" == typeof e.expires &&
                    (e.expires = new Date(e.expires)),
                  e.maxAge &&
                    (e.expires = new Date(Date.now() + 1e3 * e.maxAge)),
                  (null === e.path || void 0 === e.path) && (e.path = "/"),
                  e
                );
              })({ name: t, value: r, ...n }),
            ),
            (function (e, t) {
              for (let [, r] of (t.delete("set-cookie"), e)) {
                let e = u(r);
                t.append("set-cookie", e);
              }
            })(i, this._headers),
            this
          );
        }
        delete(...e) {
          let [t, r] = "string" == typeof e[0] ? [e[0]] : [e[0].name, e[0]];
          return this.set({ ...r, name: t, value: "", expires: new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
  },
  100139,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      RequestCookies: function () {
        return o.RequestCookies;
      },
      ResponseCookies: function () {
        return o.ResponseCookies;
      },
      stringifyCookie: function () {
        return o.stringifyCookie;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let o = e.r(432631);
  },
  696809,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      INTERNALS: function () {
        return c;
      },
      NextRequest: function () {
        return u;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let o = e.r(667789),
      s = e.r(334127),
      a = e.r(645395),
      l = e.r(100139),
      c = Symbol("internal request");
    class u extends Request {
      constructor(e, t = {}) {
        const r = "string" != typeof e && "url" in e ? e.url : String(e);
        ((0, s.validateURL)(r),
          t.body && "half" !== t.duplex && (t.duplex = "half"),
          e instanceof Request ? super(e, t) : super(r, t));
        const n = new o.NextURL(r, {
          headers: (0, s.toNodeOutgoingHttpHeaders)(this.headers),
          nextConfig: t.nextConfig,
        });
        this[c] = {
          cookies: new l.RequestCookies(this.headers),
          nextUrl: n,
          url: n.toString(),
        };
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          cookies: this.cookies,
          nextUrl: this.nextUrl,
          url: this.url,
          bodyUsed: this.bodyUsed,
          cache: this.cache,
          credentials: this.credentials,
          destination: this.destination,
          headers: Object.fromEntries(this.headers),
          integrity: this.integrity,
          keepalive: this.keepalive,
          method: this.method,
          mode: this.mode,
          redirect: this.redirect,
          referrer: this.referrer,
          referrerPolicy: this.referrerPolicy,
          signal: this.signal,
        };
      }
      get cookies() {
        return this[c].cookies;
      }
      get nextUrl() {
        return this[c].nextUrl;
      }
      get page() {
        throw new a.RemovedPageError();
      }
      get ua() {
        throw new a.RemovedUAError();
      }
      get url() {
        return this[c].url;
      }
    }
  },
  680404,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "NextResponse", {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
    let n = e.r(100139),
      i = e.r(667789),
      o = e.r(334127),
      s = e.r(908635),
      a = e.r(100139),
      l = Symbol("internal response"),
      c = new Set([301, 302, 303, 307, 308]);
    function u(e, t) {
      var r;
      if (null == e || null == (r = e.request) ? void 0 : r.headers) {
        if (!(e.request.headers instanceof Headers))
          throw Object.defineProperty(
            Error("request.headers must be an instance of Headers"),
            "__NEXT_ERROR_CODE",
            { value: "E119", enumerable: !1, configurable: !0 },
          );
        let r = [];
        for (let [n, i] of e.request.headers)
          (t.set("x-middleware-request-" + n, i), r.push(n));
        t.set("x-middleware-override-headers", r.join(","));
      }
    }
    class d extends Response {
      constructor(e, t = {}) {
        super(e, t);
        const r = this.headers,
          c = new Proxy(new a.ResponseCookies(r), {
            get(e, i, o) {
              switch (i) {
                case "delete":
                case "set":
                  return (...o) => {
                    let s = Reflect.apply(e[i], e, o),
                      l = new Headers(r);
                    return (
                      s instanceof a.ResponseCookies &&
                        r.set(
                          "x-middleware-set-cookie",
                          s
                            .getAll()
                            .map((e) => (0, n.stringifyCookie)(e))
                            .join(","),
                        ),
                      u(t, l),
                      s
                    );
                  };
                default:
                  return s.ReflectAdapter.get(e, i, o);
              }
            },
          });
        this[l] = {
          cookies: c,
          url: t.url
            ? new i.NextURL(t.url, {
                headers: (0, o.toNodeOutgoingHttpHeaders)(r),
                nextConfig: t.nextConfig,
              })
            : void 0,
        };
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          cookies: this.cookies,
          url: this.url,
          body: this.body,
          bodyUsed: this.bodyUsed,
          headers: Object.fromEntries(this.headers),
          ok: this.ok,
          redirected: this.redirected,
          status: this.status,
          statusText: this.statusText,
          type: this.type,
        };
      }
      get cookies() {
        return this[l].cookies;
      }
      static json(e, t) {
        let r = Response.json(e, t);
        return new d(r.body, r);
      }
      static redirect(e, t) {
        let r =
          "number" == typeof t ? t : ((null == t ? void 0 : t.status) ?? 307);
        if (!c.has(r))
          throw Object.defineProperty(
            RangeError(
              'Failed to execute "redirect" on "response": Invalid status code',
            ),
            "__NEXT_ERROR_CODE",
            { value: "E529", enumerable: !1, configurable: !0 },
          );
        let n = "object" == typeof t ? t : {},
          i = new Headers(null == n ? void 0 : n.headers);
        return (
          i.set("Location", (0, o.validateURL)(e)),
          new d(null, { ...n, headers: i, status: r })
        );
      }
      static rewrite(e, t) {
        let r = new Headers(null == t ? void 0 : t.headers);
        return (
          r.set("x-middleware-rewrite", (0, o.validateURL)(e)),
          u(t, r),
          new d(null, { ...t, headers: r })
        );
      }
      static next(e) {
        let t = new Headers(null == e ? void 0 : e.headers);
        return (
          t.set("x-middleware-next", "1"),
          u(e, t),
          new d(null, { ...e, headers: t })
        );
      }
    }
  },
  189872,
  (e, t, r) => {
    "use strict";
    function n() {
      throw Object.defineProperty(
        Error(
          'ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead',
        ),
        "__NEXT_ERROR_CODE",
        { value: "E183", enumerable: !1, configurable: !0 },
      );
    }
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "ImageResponse", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  522823,
  (e, t, r) => {
    var n = {
        226: function (t, r) {
          !(function (n, i) {
            "use strict";
            var o = "function",
              s = "undefined",
              a = "object",
              l = "string",
              c = "major",
              u = "model",
              d = "name",
              h = "type",
              p = "vendor",
              f = "version",
              m = "architecture",
              g = "console",
              b = "mobile",
              w = "tablet",
              v = "smarttv",
              _ = "wearable",
              y = "embedded",
              x = "Amazon",
              R = "Apple",
              E = "ASUS",
              S = "BlackBerry",
              k = "Browser",
              P = "Chrome",
              T = "Firefox",
              C = "Google",
              A = "Huawei",
              O = "Microsoft",
              N = "Motorola",
              j = "Opera",
              I = "Samsung",
              L = "Sharp",
              U = "Sony",
              D = "Xiaomi",
              M = "Zebra",
              H = "Facebook",
              F = "Chromium OS",
              q = "Mac OS",
              W = function (e, t) {
                var r = {};
                for (var n in e)
                  t[n] && t[n].length % 2 == 0
                    ? (r[n] = t[n].concat(e[n]))
                    : (r[n] = e[n]);
                return r;
              },
              $ = function (e) {
                for (var t = {}, r = 0; r < e.length; r++)
                  t[e[r].toUpperCase()] = e[r];
                return t;
              },
              B = function (e, t) {
                return typeof e === l && -1 !== X(t).indexOf(X(e));
              },
              X = function (e) {
                return e.toLowerCase();
              },
              G = function (e, t) {
                if (typeof e === l)
                  return (
                    (e = e.replace(/^\s\s*/, "")),
                    typeof t === s ? e : e.substring(0, 350)
                  );
              },
              z = function (e, t) {
                for (var r, n, i, s, l, c, u = 0; u < t.length && !l; ) {
                  var d = t[u],
                    h = t[u + 1];
                  for (r = n = 0; r < d.length && !l && d[r]; )
                    if ((l = d[r++].exec(e)))
                      for (i = 0; i < h.length; i++)
                        ((c = l[++n]),
                          typeof (s = h[i]) === a && s.length > 0
                            ? 2 === s.length
                              ? typeof s[1] == o
                                ? (this[s[0]] = s[1].call(this, c))
                                : (this[s[0]] = s[1])
                              : 3 === s.length
                                ? typeof s[1] !== o || (s[1].exec && s[1].test)
                                  ? (this[s[0]] = c
                                      ? c.replace(s[1], s[2])
                                      : void 0)
                                  : (this[s[0]] = c
                                      ? s[1].call(this, c, s[2])
                                      : void 0)
                                : 4 === s.length &&
                                  (this[s[0]] = c
                                    ? s[3].call(this, c.replace(s[1], s[2]))
                                    : void 0)
                            : (this[s] = c || void 0));
                  u += 2;
                }
              },
              V = function (e, t) {
                for (var r in t)
                  if (typeof t[r] === a && t[r].length > 0) {
                    for (var n = 0; n < t[r].length; n++)
                      if (B(t[r][n], e)) return "?" === r ? void 0 : r;
                  } else if (B(t[r], e)) return "?" === r ? void 0 : r;
                return e;
              },
              Y = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM",
              },
              K = {
                browser: [
                  [/\b(?:crmo|crios)\/([\w\.]+)/i],
                  [f, [d, "Chrome"]],
                  [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                  [f, [d, "Edge"]],
                  [
                    /(opera mini)\/([-\w\.]+)/i,
                    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                  ],
                  [d, f],
                  [/opios[\/ ]+([\w\.]+)/i],
                  [f, [d, j + " Mini"]],
                  [/\bopr\/([\w\.]+)/i],
                  [f, [d, j]],
                  [
                    /(kindle)\/([\w\.]+)/i,
                    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                    /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                    /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                    /(?:ms|\()(ie) ([\w\.]+)/i,
                    /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                    /(heytap|ovi)browser\/([\d\.]+)/i,
                    /(weibo)__([\d\.]+)/i,
                  ],
                  [d, f],
                  [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                  [f, [d, "UC" + k]],
                  [
                    /microm.+\bqbcore\/([\w\.]+)/i,
                    /\bqbcore\/([\w\.]+).+microm/i,
                  ],
                  [f, [d, "WeChat(Win) Desktop"]],
                  [/micromessenger\/([\w\.]+)/i],
                  [f, [d, "WeChat"]],
                  [/konqueror\/([\w\.]+)/i],
                  [f, [d, "Konqueror"]],
                  [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                  [f, [d, "IE"]],
                  [/ya(?:search)?browser\/([\w\.]+)/i],
                  [f, [d, "Yandex"]],
                  [/(avast|avg)\/([\w\.]+)/i],
                  [[d, /(.+)/, "$1 Secure " + k], f],
                  [/\bfocus\/([\w\.]+)/i],
                  [f, [d, T + " Focus"]],
                  [/\bopt\/([\w\.]+)/i],
                  [f, [d, j + " Touch"]],
                  [/coc_coc\w+\/([\w\.]+)/i],
                  [f, [d, "Coc Coc"]],
                  [/dolfin\/([\w\.]+)/i],
                  [f, [d, "Dolphin"]],
                  [/coast\/([\w\.]+)/i],
                  [f, [d, j + " Coast"]],
                  [/miuibrowser\/([\w\.]+)/i],
                  [f, [d, "MIUI " + k]],
                  [/fxios\/([-\w\.]+)/i],
                  [f, [d, T]],
                  [/\bqihu|(qi?ho?o?|360)browser/i],
                  [[d, "360 " + k]],
                  [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                  [[d, /(.+)/, "$1 " + k], f],
                  [/(comodo_dragon)\/([\w\.]+)/i],
                  [[d, /_/g, " "], f],
                  [
                    /(electron)\/([\w\.]+) safari/i,
                    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                    /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                  ],
                  [d, f],
                  [
                    /(metasr)[\/ ]?([\w\.]+)/i,
                    /(lbbrowser)/i,
                    /\[(linkedin)app\]/i,
                  ],
                  [d],
                  [
                    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                  ],
                  [[d, H], f],
                  [
                    /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                    /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                    /safari (line)\/([\w\.]+)/i,
                    /\b(line)\/([\w\.]+)\/iab/i,
                    /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                  ],
                  [d, f],
                  [/\bgsa\/([\w\.]+) .*safari\//i],
                  [f, [d, "GSA"]],
                  [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                  [f, [d, "TikTok"]],
                  [/headlesschrome(?:\/([\w\.]+)| )/i],
                  [f, [d, P + " Headless"]],
                  [/ wv\).+(chrome)\/([\w\.]+)/i],
                  [[d, P + " WebView"], f],
                  [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                  [f, [d, "Android " + k]],
                  [
                    /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                  ],
                  [d, f],
                  [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                  [f, [d, "Mobile Safari"]],
                  [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                  [f, d],
                  [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                  [
                    d,
                    [
                      f,
                      V,
                      {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/",
                      },
                    ],
                  ],
                  [/(webkit|khtml)\/([\w\.]+)/i],
                  [d, f],
                  [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                  [[d, "Netscape"], f],
                  [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                  [f, [d, T + " Reality"]],
                  [
                    /ekiohf.+(flow)\/([\w\.]+)/i,
                    /(swiftfox)/i,
                    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                    /(firefox)\/([\w\.]+)/i,
                    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                    /(links) \(([\w\.]+)/i,
                    /panasonic;(viera)/i,
                  ],
                  [d, f],
                  [/(cobalt)\/([\w\.]+)/i],
                  [d, [f, /master.|lts./, ""]],
                ],
                cpu: [
                  [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                  [[m, "amd64"]],
                  [/(ia32(?=;))/i],
                  [[m, X]],
                  [/((?:i[346]|x)86)[;\)]/i],
                  [[m, "ia32"]],
                  [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                  [[m, "arm64"]],
                  [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                  [[m, "armhf"]],
                  [/windows (ce|mobile); ppc;/i],
                  [[m, "arm"]],
                  [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                  [[m, /ower/, "", X]],
                  [/(sun4\w)[;\)]/i],
                  [[m, "sparc"]],
                  [
                    /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                  ],
                  [[m, X]],
                ],
                device: [
                  [
                    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                  ],
                  [u, [p, I], [h, w]],
                  [
                    /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                    /samsung[- ]([-\w]+)/i,
                    /sec-(sgh\w+)/i,
                  ],
                  [u, [p, I], [h, b]],
                  [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                  [u, [p, R], [h, b]],
                  [
                    /\((ipad);[-\w\),; ]+apple/i,
                    /applecoremedia\/[\w\.]+ \((ipad)/i,
                    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                  ],
                  [u, [p, R], [h, w]],
                  [/(macintosh);/i],
                  [u, [p, R]],
                  [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                  [u, [p, L], [h, b]],
                  [
                    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                  ],
                  [u, [p, A], [h, w]],
                  [
                    /(?:huawei|honor)([-\w ]+)[;\)]/i,
                    /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                  ],
                  [u, [p, A], [h, b]],
                  [
                    /\b(poco[\w ]+)(?: bui|\))/i,
                    /\b; (\w+) build\/hm\1/i,
                    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                  ],
                  [
                    [u, /_/g, " "],
                    [p, D],
                    [h, b],
                  ],
                  [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                  [
                    [u, /_/g, " "],
                    [p, D],
                    [h, w],
                  ],
                  [
                    /; (\w+) bui.+ oppo/i,
                    /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                  ],
                  [u, [p, "OPPO"], [h, b]],
                  [
                    /vivo (\w+)(?: bui|\))/i,
                    /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                  ],
                  [u, [p, "Vivo"], [h, b]],
                  [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                  [u, [p, "Realme"], [h, b]],
                  [
                    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                    /\bmot(?:orola)?[- ](\w*)/i,
                    /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                  ],
                  [u, [p, N], [h, b]],
                  [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                  [u, [p, N], [h, w]],
                  [
                    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                  ],
                  [u, [p, "LG"], [h, w]],
                  [
                    /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                    /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                    /\blg-?([\d\w]+) bui/i,
                  ],
                  [u, [p, "LG"], [h, b]],
                  [
                    /(ideatab[-\w ]+)/i,
                    /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                  ],
                  [u, [p, "Lenovo"], [h, w]],
                  [
                    /(?:maemo|nokia).*(n900|lumia \d+)/i,
                    /nokia[-_ ]?([-\w\.]*)/i,
                  ],
                  [
                    [u, /_/g, " "],
                    [p, "Nokia"],
                    [h, b],
                  ],
                  [/(pixel c)\b/i],
                  [u, [p, C], [h, w]],
                  [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                  [u, [p, C], [h, b]],
                  [
                    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                  ],
                  [u, [p, U], [h, b]],
                  [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                  [
                    [u, "Xperia Tablet"],
                    [p, U],
                    [h, w],
                  ],
                  [
                    / (kb2005|in20[12]5|be20[12][59])\b/i,
                    /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                  ],
                  [u, [p, "OnePlus"], [h, b]],
                  [
                    /(alexa)webm/i,
                    /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                    /(kf[a-z]+)( bui|\)).+silk\//i,
                  ],
                  [u, [p, x], [h, w]],
                  [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                  [
                    [u, /(.+)/g, "Fire Phone $1"],
                    [p, x],
                    [h, b],
                  ],
                  [/(playbook);[-\w\),; ]+(rim)/i],
                  [u, p, [h, w]],
                  [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                  [u, [p, S], [h, b]],
                  [
                    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                  ],
                  [u, [p, E], [h, w]],
                  [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                  [u, [p, E], [h, b]],
                  [/(nexus 9)/i],
                  [u, [p, "HTC"], [h, w]],
                  [
                    /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                    /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                  ],
                  [p, [u, /_/g, " "], [h, b]],
                  [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                  [u, [p, "Acer"], [h, w]],
                  [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                  [u, [p, "Meizu"], [h, b]],
                  [
                    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                    /(hp) ([\w ]+\w)/i,
                    /(asus)-?(\w+)/i,
                    /(microsoft); (lumia[\w ]+)/i,
                    /(lenovo)[-_ ]?([-\w]+)/i,
                    /(jolla)/i,
                    /(oppo) ?([\w ]+) bui/i,
                  ],
                  [p, u, [h, b]],
                  [
                    /(kobo)\s(ereader|touch)/i,
                    /(archos) (gamepad2?)/i,
                    /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                    /(kindle)\/([\w\.]+)/i,
                    /(nook)[\w ]+build\/(\w+)/i,
                    /(dell) (strea[kpr\d ]*[\dko])/i,
                    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                    /(trinity)[- ]*(t\d{3}) bui/i,
                    /(gigaset)[- ]+(q\w{1,9}) bui/i,
                    /(vodafone) ([\w ]+)(?:\)| bui)/i,
                  ],
                  [p, u, [h, w]],
                  [/(surface duo)/i],
                  [u, [p, O], [h, w]],
                  [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                  [u, [p, "Fairphone"], [h, b]],
                  [/(u304aa)/i],
                  [u, [p, "AT&T"], [h, b]],
                  [/\bsie-(\w*)/i],
                  [u, [p, "Siemens"], [h, b]],
                  [/\b(rct\w+) b/i],
                  [u, [p, "RCA"], [h, w]],
                  [/\b(venue[\d ]{2,7}) b/i],
                  [u, [p, "Dell"], [h, w]],
                  [/\b(q(?:mv|ta)\w+) b/i],
                  [u, [p, "Verizon"], [h, w]],
                  [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                  [u, [p, "Barnes & Noble"], [h, w]],
                  [/\b(tm\d{3}\w+) b/i],
                  [u, [p, "NuVision"], [h, w]],
                  [/\b(k88) b/i],
                  [u, [p, "ZTE"], [h, w]],
                  [/\b(nx\d{3}j) b/i],
                  [u, [p, "ZTE"], [h, b]],
                  [/\b(gen\d{3}) b.+49h/i],
                  [u, [p, "Swiss"], [h, b]],
                  [/\b(zur\d{3}) b/i],
                  [u, [p, "Swiss"], [h, w]],
                  [/\b((zeki)?tb.*\b) b/i],
                  [u, [p, "Zeki"], [h, w]],
                  [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                  [[p, "Dragon Touch"], u, [h, w]],
                  [/\b(ns-?\w{0,9}) b/i],
                  [u, [p, "Insignia"], [h, w]],
                  [/\b((nxa|next)-?\w{0,9}) b/i],
                  [u, [p, "NextBook"], [h, w]],
                  [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                  [[p, "Voice"], u, [h, b]],
                  [/\b(lvtel\-)?(v1[12]) b/i],
                  [[p, "LvTel"], u, [h, b]],
                  [/\b(ph-1) /i],
                  [u, [p, "Essential"], [h, b]],
                  [/\b(v(100md|700na|7011|917g).*\b) b/i],
                  [u, [p, "Envizen"], [h, w]],
                  [/\b(trio[-\w\. ]+) b/i],
                  [u, [p, "MachSpeed"], [h, w]],
                  [/\btu_(1491) b/i],
                  [u, [p, "Rotor"], [h, w]],
                  [/(shield[\w ]+) b/i],
                  [u, [p, "Nvidia"], [h, w]],
                  [/(sprint) (\w+)/i],
                  [p, u, [h, b]],
                  [/(kin\.[onetw]{3})/i],
                  [
                    [u, /\./g, " "],
                    [p, O],
                    [h, b],
                  ],
                  [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                  [u, [p, M], [h, w]],
                  [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                  [u, [p, M], [h, b]],
                  [/smart-tv.+(samsung)/i],
                  [p, [h, v]],
                  [/hbbtv.+maple;(\d+)/i],
                  [
                    [u, /^/, "SmartTV"],
                    [p, I],
                    [h, v],
                  ],
                  [
                    /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                  ],
                  [
                    [p, "LG"],
                    [h, v],
                  ],
                  [/(apple) ?tv/i],
                  [p, [u, R + " TV"], [h, v]],
                  [/crkey/i],
                  [
                    [u, P + "cast"],
                    [p, C],
                    [h, v],
                  ],
                  [/droid.+aft(\w)( bui|\))/i],
                  [u, [p, x], [h, v]],
                  [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                  [u, [p, L], [h, v]],
                  [/(bravia[\w ]+)( bui|\))/i],
                  [u, [p, U], [h, v]],
                  [/(mitv-\w{5}) bui/i],
                  [u, [p, D], [h, v]],
                  [/Hbbtv.*(technisat) (.*);/i],
                  [p, u, [h, v]],
                  [
                    /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                    /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                  ],
                  [
                    [p, G],
                    [u, G],
                    [h, v],
                  ],
                  [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                  [[h, v]],
                  [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                  [p, u, [h, g]],
                  [/droid.+; (shield) bui/i],
                  [u, [p, "Nvidia"], [h, g]],
                  [/(playstation [345portablevi]+)/i],
                  [u, [p, U], [h, g]],
                  [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                  [u, [p, O], [h, g]],
                  [/((pebble))app/i],
                  [p, u, [h, _]],
                  [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                  [u, [p, R], [h, _]],
                  [/droid.+; (glass) \d/i],
                  [u, [p, C], [h, _]],
                  [/droid.+; (wt63?0{2,3})\)/i],
                  [u, [p, M], [h, _]],
                  [/(quest( 2| pro)?)/i],
                  [u, [p, H], [h, _]],
                  [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                  [p, [h, y]],
                  [/(aeobc)\b/i],
                  [u, [p, x], [h, y]],
                  [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                  [u, [h, b]],
                  [
                    /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                  ],
                  [u, [h, w]],
                  [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                  [[h, w]],
                  [
                    /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                  ],
                  [[h, b]],
                  [/(android[-\w\. ]{0,9});.+buil/i],
                  [u, [p, "Generic"]],
                ],
                engine: [
                  [/windows.+ edge\/([\w\.]+)/i],
                  [f, [d, "EdgeHTML"]],
                  [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                  [f, [d, "Blink"]],
                  [
                    /(presto)\/([\w\.]+)/i,
                    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                    /ekioh(flow)\/([\w\.]+)/i,
                    /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                    /(icab)[\/ ]([23]\.[\d\.]+)/i,
                    /\b(libweb)/i,
                  ],
                  [d, f],
                  [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                  [f, d],
                ],
                os: [
                  [/microsoft (windows) (vista|xp)/i],
                  [d, f],
                  [
                    /(windows) nt 6\.2; (arm)/i,
                    /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                    /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                  ],
                  [d, [f, V, Y]],
                  [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                  [
                    [d, "Windows"],
                    [f, V, Y],
                  ],
                  [
                    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                    /ios;fbsv\/([\d\.]+)/i,
                    /cfnetwork\/.+darwin/i,
                  ],
                  [
                    [f, /_/g, "."],
                    [d, "iOS"],
                  ],
                  [
                    /(mac os x) ?([\w\. ]*)/i,
                    /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                  ],
                  [
                    [d, q],
                    [f, /_/g, "."],
                  ],
                  [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                  [f, d],
                  [
                    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                    /(blackberry)\w*\/([\w\.]*)/i,
                    /(tizen|kaios)[\/ ]([\w\.]+)/i,
                    /\((series40);/i,
                  ],
                  [d, f],
                  [/\(bb(10);/i],
                  [f, [d, S]],
                  [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                  [f, [d, "Symbian"]],
                  [
                    /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                  ],
                  [f, [d, T + " OS"]],
                  [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                  [f, [d, "webOS"]],
                  [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                  [f, [d, "watchOS"]],
                  [/crkey\/([\d\.]+)/i],
                  [f, [d, P + "cast"]],
                  [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                  [[d, F], f],
                  [
                    /panasonic;(viera)/i,
                    /(netrange)mmh/i,
                    /(nettv)\/(\d+\.[\w\.]+)/i,
                    /(nintendo|playstation) ([wids345portablevuch]+)/i,
                    /(xbox); +xbox ([^\);]+)/i,
                    /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                    /(mint)[\/\(\) ]?(\w*)/i,
                    /(mageia|vectorlinux)[; ]/i,
                    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                    /(hurd|linux) ?([\w\.]*)/i,
                    /(gnu) ?([\w\.]*)/i,
                    /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                    /(haiku) (\w+)/i,
                  ],
                  [d, f],
                  [/(sunos) ?([\w\.\d]*)/i],
                  [[d, "Solaris"], f],
                  [
                    /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                    /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                    /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                    /(unix) ?([\w\.]*)/i,
                  ],
                  [d, f],
                ],
              },
              Z = function (e, t) {
                if (
                  (typeof e === a && ((t = e), (e = void 0)),
                  !(this instanceof Z))
                )
                  return new Z(e, t).getResult();
                var r = typeof n !== s && n.navigator ? n.navigator : void 0,
                  i = e || (r && r.userAgent ? r.userAgent : ""),
                  g = r && r.userAgentData ? r.userAgentData : void 0,
                  v = t ? W(K, t) : K,
                  _ = r && r.userAgent == i;
                return (
                  (this.getBrowser = function () {
                    var e,
                      t = {};
                    return (
                      (t[d] = void 0),
                      (t[f] = void 0),
                      z.call(t, i, v.browser),
                      (t[c] =
                        typeof (e = t[f]) === l
                          ? e.replace(/[^\d\.]/g, "").split(".")[0]
                          : void 0),
                      _ &&
                        r &&
                        r.brave &&
                        typeof r.brave.isBrave == o &&
                        (t[d] = "Brave"),
                      t
                    );
                  }),
                  (this.getCPU = function () {
                    var e = {};
                    return ((e[m] = void 0), z.call(e, i, v.cpu), e);
                  }),
                  (this.getDevice = function () {
                    var e = {};
                    return (
                      (e[p] = void 0),
                      (e[u] = void 0),
                      (e[h] = void 0),
                      z.call(e, i, v.device),
                      _ && !e[h] && g && g.mobile && (e[h] = b),
                      _ &&
                        "Macintosh" == e[u] &&
                        r &&
                        typeof r.standalone !== s &&
                        r.maxTouchPoints &&
                        r.maxTouchPoints > 2 &&
                        ((e[u] = "iPad"), (e[h] = w)),
                      e
                    );
                  }),
                  (this.getEngine = function () {
                    var e = {};
                    return (
                      (e[d] = void 0),
                      (e[f] = void 0),
                      z.call(e, i, v.engine),
                      e
                    );
                  }),
                  (this.getOS = function () {
                    var e = {};
                    return (
                      (e[d] = void 0),
                      (e[f] = void 0),
                      z.call(e, i, v.os),
                      _ &&
                        !e[d] &&
                        g &&
                        "Unknown" != g.platform &&
                        (e[d] = g.platform
                          .replace(/chrome os/i, F)
                          .replace(/macos/i, q)),
                      e
                    );
                  }),
                  (this.getResult = function () {
                    return {
                      ua: this.getUA(),
                      browser: this.getBrowser(),
                      engine: this.getEngine(),
                      os: this.getOS(),
                      device: this.getDevice(),
                      cpu: this.getCPU(),
                    };
                  }),
                  (this.getUA = function () {
                    return i;
                  }),
                  (this.setUA = function (e) {
                    return (
                      (i = typeof e === l && e.length > 350 ? G(e, 350) : e),
                      this
                    );
                  }),
                  this.setUA(i),
                  this
                );
              };
            if (
              ((Z.VERSION = "1.0.35"),
              (Z.BROWSER = $([d, f, c])),
              (Z.CPU = $([m])),
              (Z.DEVICE = $([u, p, h, g, b, v, w, _, y])),
              (Z.ENGINE = Z.OS = $([d, f])),
              typeof r !== s)
            )
              (t.exports && (r = t.exports = Z), (r.UAParser = Z));
            else if (typeof define === o && define.amd)
              (e.r, void 0 !== Z && e.v(Z));
            else typeof n !== s && (n.UAParser = Z);
            var J = typeof n !== s && (n.jQuery || n.Zepto);
            if (J && !J.ua) {
              var Q = new Z();
              ((J.ua = Q.getResult()),
                (J.ua.get = function () {
                  return Q.getUA();
                }),
                (J.ua.set = function (e) {
                  Q.setUA(e);
                  var t = Q.getResult();
                  for (var r in t) J.ua[r] = t[r];
                }));
            }
          })("object" == typeof window ? window : this);
        },
      },
      i = {};
    function o(e) {
      var t = i[e];
      if (void 0 !== t) return t.exports;
      var r = (i[e] = { exports: {} }),
        s = !0;
      try {
        (n[e].call(r.exports, r, r.exports, o), (s = !1));
      } finally {
        s && delete i[e];
      }
      return r.exports;
    }
    ((o.ab =
      "/ROOT/node_modules/.pnpm/next@16.0.2-canary.24_patch_hash=gcu3wxnuyfwkkf5xpr5q3nci24_@babel+core@7.28.3_@opentelemetry_igsvcqjw6qpqi3bfxmrpsujan4/node_modules/next/dist/compiled/ua-parser-js/"),
      (t.exports = o(226)));
  },
  708437,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n,
      i = {
        isBot: function () {
          return a;
        },
        userAgent: function () {
          return c;
        },
        userAgentFromString: function () {
          return l;
        },
      };
    for (var o in i) Object.defineProperty(r, o, { enumerable: !0, get: i[o] });
    let s = (n = e.r(522823)) && n.__esModule ? n : { default: n };
    function a(e) {
      return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
        e,
      );
    }
    function l(e) {
      return { ...(0, s.default)(e), isBot: void 0 !== e && a(e) };
    }
    function c({ headers: e }) {
      return l(e.get("user-agent") || void 0);
    }
  },
  406310,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "URLPattern", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = "undefined" == typeof URLPattern ? void 0 : URLPattern;
  },
  810727,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "after", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(492568);
    function i(e) {
      let t = n.workAsyncStorage.getStore();
      if (!t)
        throw Object.defineProperty(
          Error(
            "`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E468", enumerable: !1, configurable: !0 },
        );
      let { afterContext: r } = t;
      return r.after(e);
    }
  },
  259958,
  (e, t, r) => {
    "use strict";
    var n, i;
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      (n = e.r(810727)),
      (i = r),
      Object.keys(n).forEach(function (e) {
        "default" === e ||
          Object.prototype.hasOwnProperty.call(i, e) ||
          Object.defineProperty(i, e, {
            enumerable: !0,
            get: function () {
              return n[e];
            },
          });
      }));
  },
  643655,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "connection", {
        enumerable: !0,
        get: function () {
          return c;
        },
      }));
    let n = e.r(492568),
      i = e.r(712102),
      o = e.r(48496),
      s = e.r(324613),
      a = e.r(263111),
      l = e.r(26563);
    function c() {
      let e = n.workAsyncStorage.getStore(),
        t = i.workUnitAsyncStorage.getStore();
      if (e) {
        if (
          t &&
          "after" === t.phase &&
          !(0, l.isRequestAPICallableInsideAfter)()
        )
          throw Object.defineProperty(
            Error(
              `Route ${e.route} used \`connection()\` inside \`after()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E827", enumerable: !1, configurable: !0 },
          );
        if (e.forceStatic) return Promise.resolve(void 0);
        if (e.dynamicShouldError)
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E847", enumerable: !1, configurable: !0 },
          );
        if (t)
          switch (t.type) {
            case "cache": {
              let t = Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E841", enumerable: !1, configurable: !0 },
              );
              throw (
                Error.captureStackTrace(t, c),
                (e.invalidDynamicUsageError ??= t),
                t
              );
            }
            case "private-cache": {
              let t = Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E837", enumerable: !1, configurable: !0 },
              );
              throw (
                Error.captureStackTrace(t, c),
                (e.invalidDynamicUsageError ??= t),
                t
              );
            }
            case "unstable-cache":
              throw Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside a function cached with \`unstable_cache()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E840", enumerable: !1, configurable: !0 },
              );
            case "prerender":
            case "prerender-client":
            case "prerender-runtime":
              return (0, a.makeHangingPromise)(
                t.renderSignal,
                e.route,
                "`connection()`",
              );
            case "prerender-ppr":
              return (0, o.postponeWithTracking)(
                e.route,
                "connection",
                t.dynamicTracking,
              );
            case "prerender-legacy":
              return (0, o.throwToInterruptStaticGeneration)(
                "connection",
                e,
                t,
              );
            case "request":
              return (
                (0, o.trackDynamicDataInDynamicRender)(t),
                Promise.resolve(void 0)
              );
          }
      }
      (0, i.throwForMissingRequestStore)("connection");
    }
    e.r(34071);
  },
  349730,
  (e, t, r) => {
    let n = {
      NextRequest: e.r(696809).NextRequest,
      NextResponse: e.r(680404).NextResponse,
      ImageResponse: e.r(189872).ImageResponse,
      userAgentFromString: e.r(708437).userAgentFromString,
      userAgent: e.r(708437).userAgent,
      URLPattern: e.r(406310).URLPattern,
      after: e.r(259958).after,
      connection: e.r(643655).connection,
    };
    ((t.exports = n),
      (r.NextRequest = n.NextRequest),
      (r.NextResponse = n.NextResponse),
      (r.ImageResponse = n.ImageResponse),
      (r.userAgentFromString = n.userAgentFromString),
      (r.userAgent = n.userAgent),
      (r.URLPattern = n.URLPattern),
      (r.after = n.after),
      (r.connection = n.connection));
  },
  334405,
  767134,
  150446,
  199441,
  769284,
  610621,
  (e) => {
    "use strict";
    e.s(["ErrorPage", () => m], 334405);
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(970422),
      i = e.i(608367);
    let o = {
        fontFamily:
          'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      },
      s = { display: "inline-block" },
      a = {
        display: "inline-block",
        margin: "0 20px 0 0",
        padding: "0 23px 0 0",
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: "top",
        lineHeight: "49px",
      },
      l = { fontSize: 14, fontWeight: 400, lineHeight: "49px", margin: 0 },
      c = "Failed to fetch dynamically imported module:",
      u = /Failed to resolve module specifier "([^"]+)"/,
      d =
        /The requested module '([^']+)' does not provide an export named '([^']+)'/,
      h = /Unable to resolve specifier '([^']+)' imported from (.+)/,
      p = /The "([^']+)" module does not provide an export named "([^']+)"/,
      f = /(https:\/\/[^ ]+) imported from (.+)/;
    function m({ error: e, code: r, message: n }) {
      let o = n ?? (e && "message" in e ? e.message : "Unknown error");
      if (o.includes(c)) {
        let r = o.slice(o.indexOf(c) + c.length).trim(),
          n = (0, i.findOriginalModuleNameFromURL)(r);
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `Failed to load "${n}".`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      if (u.test(o)) {
        let r = u.exec(o)[1],
          n = (0, i.findOriginalModuleNameFromURL)(r);
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `The file "${n}" cannot be found. Make sure the file exists.`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      if (d.test(o)) {
        let [, r, n] = d.exec(o),
          s = (0, i.findOriginalModuleNameFromURL)(r);
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `The "${s}" module does not provide an export named "${n}".`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      if (h.test(o)) {
        let [, r, n] = h.exec(o),
          s = (0, i.findOriginalModuleNameFromURL)(r),
          a = (0, i.findOriginalModuleNameFromURL)(n || "");
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `The file "${s}" cannot be found${a ? ` (imported in "${a}")` : ""}. Make sure the file or alias exists in the correct location.`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      if (p.test(o)) {
        let [, r, n] = p.exec(o),
          s = (0, i.findOriginalModuleNameFromURL)(r);
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `The "${s}" module does not provide an export named "${n}".`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      if (f.test(o)) {
        let [, r, n] = f.exec(o),
          s = (0, i.findOriginalModuleNameFromURL)(n),
          a = (0, i.findOriginalModuleNameFromURL)(r);
        return (0, t.jsx)(g, {
          code: "Import Error",
          message: `Failed to load "${a}" from "${s}", make sure it exists.`,
          stack: e?.stack,
          cause: e?.cause,
        });
      }
      return "_jsxDEV is not defined" === o
        ? (0, t.jsx)(g, {
            code: "Runtime Error",
            message:
              "The component cannot be rendered. Make sure the component is exported properly.",
          })
        : (0, t.jsx)(g, {
            code: r || "Runtime Error",
            message: o,
            stack: e?.stack,
            cause: e?.cause,
          });
    }
    function g({ code: e, message: i, stack: c, cause: u }) {
      let [d, h] = (0, r.useState)(!1);
      return (
        (0, r.useEffect)(() => {
          h(window.self !== window.top);
        }, []),
        (0, r.useEffect)(() => {
          let e = new n.FatalRendererError(i);
          ("string" == typeof c && (e.stack = c),
            "string" == typeof u && (e.cause = u),
            console.error(e));
        }, [i, c, u]),
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsxs)("title", { children: [e, ": ", i] }),
            (0, t.jsx)("style", {
              dangerouslySetInnerHTML: {
                __html:
                  "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
              },
            }),
            !d &&
              (0, t.jsx)("div", {
                style: o,
                children: (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("h1", {
                      className: "next-error-h1",
                      style: a,
                      children: e,
                    }),
                    (0, t.jsx)("div", {
                      style: s,
                      children: (0, t.jsx)("h2", { style: l, children: i }),
                    }),
                  ],
                }),
              }),
          ],
        })
      );
    }
    var b = e.i(819696);
    let w = (0, b.default)("Folder", [
      [
        "path",
        {
          d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
          key: "1kt360",
        },
      ],
    ]);
    e.s(["default", () => w], 767134);
    let v = (0, b.default)("FileText", [
      [
        "path",
        {
          d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
          key: "1rqfz7",
        },
      ],
      ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
      ["path", { d: "M10 9H8", key: "b1mrlr" }],
      ["path", { d: "M16 13H8", key: "t4e002" }],
      ["path", { d: "M16 17H8", key: "z1uh3a" }],
    ]);
    e.s(["default", () => v], 150446);
    var _ = e.i(615793),
      y = e.i(800443);
    let x = (0, b.default)("CircleAlert", [
      ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
    ]);
    function R() {
      let [e, t] = (0, r.useState)(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
      return (
        (0, r.useEffect)(() => {
          document.documentElement.classList.toggle("dark", e);
        }, [e]),
        (0, r.useEffect)(() => {
          let e = (e) => {
            e.data &&
              "theme_change" === e.data.type &&
              (t(e.data.isDark),
              document.documentElement.classList.toggle("dark", e.data.isDark));
          };
          return (
            window.addEventListener("message", e),
            () => {
              window.removeEventListener("message", e);
            }
          );
        }, []),
        e
      );
    }
    e.s(["default", () => x], 199441);
    let E = (e) => e.split("/").pop()?.split(".").shift(),
      S = (e) => e.startsWith("app/") || e.startsWith("src/app/"),
      k = (e) => e.startsWith("pages/") || e.startsWith("src/pages/"),
      P = (e) => e.startsWith("pages/api/") || e.startsWith("src/pages/api/"),
      T = (e) => S(e) && "route" === E(e),
      C = ({ route: e, depth: n }) => {
        let [i, o] = (0, r.useState)(!0),
          s = e.children && e.children.length > 0,
          a = "file" === e.type ? "a" : "div",
          l = "file" === e.type ? A(e.path) : void 0;
        return (0, t.jsxs)("li", {
          children: [
            (0, t.jsxs)(a, {
              className:
                "flex cursor-pointer select-none items-center rounded-md px-2 py-1 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-[hsl(0_0%_8%)]",
              href: l,
              onClick: () => s && o(!i),
              style: { paddingLeft: `${(n + 1) * 0.5}rem` },
              children: [
                s
                  ? i
                    ? (0, t.jsx)(y.ChevronDown, {
                        className:
                          "mr-1 h-4 w-4 shrink-0 text-muted-foreground",
                      })
                    : (0, t.jsx)(_.ChevronRight, {
                        className:
                          "mr-1 h-4 w-4 shrink-0 text-muted-foreground",
                      })
                  : (0, t.jsx)("span", { className: "mr-1 w-4 shrink-0" }),
                "folder" === e.type
                  ? (0, t.jsx)(w, {
                      className:
                        "mr-2 h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400",
                    })
                  : (0, t.jsx)(v, {
                      className:
                        "mr-2 h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400",
                    }),
                (0, t.jsx)("span", {
                  className: "truncate text-sm",
                  children: e.name,
                }),
              ],
            }),
            s &&
              i &&
              (0, t.jsx)("ul", {
                className: "mt-1",
                children: e.children?.map((e) =>
                  (0, t.jsx)(C, { depth: n + 1, route: e }, e.path),
                ),
              }),
          ],
        });
      },
      A = (e) => {
        let t = e.startsWith("./") ? e.slice(2) : e,
          r = t.split("/"),
          n = r[r.length - 1],
          i = "app" === r[0],
          o = "pages" === r[0],
          s = i && n.startsWith("page"),
          a = i && n.startsWith("route"),
          l = o && r.includes("api") && n.startsWith("index"),
          c = o && !r.includes("api") && n.startsWith("index"),
          u = "api" === r[0] && n.startsWith("route");
        return s || c || a || l
          ? `/${r.slice(1, -1).join("/")}`
          : u
            ? `/${r.slice(0, -1).join("/")}`
            : t;
      };
    function O({ currentRoute: e, label: r = "route" }) {
      let n = e.split("?")[0];
      return (0, t.jsx)("header", {
        className: "mb-4",
        children: (0, t.jsxs)("p", {
          className:
            "flex select-none items-start gap-1.5 rounded-md bg-yellow-100 dark:bg-yellow-900 p-3 text-sm text-gray-500 dark:text-gray-400",
          children: [
            (0, t.jsx)(x, { className: "size-4 h-5 shrink-0 stroke-2" }),
            " No page at",
            " ",
            n,
            " detected. You can select a",
            ` ${r} `,
            "below.",
          ],
        }),
      });
    }
    function N({ rawPaths: e, currentRoute: n }) {
      let i = (0, r.useMemo)(() => {
          let t;
          return (
            (t = { path: ".", name: "Root", type: "folder", children: [] }),
            e.forEach((e) => {
              let r = e.replace("@v0/", ""),
                n = r.split("/"),
                i = t;
              (function (e, t) {
                if (!["app", "pages", "api", "src"].includes(t)) return !1;
                if (P(e)) return P(e) && "index" === E(e);
                if (S(e)) return (S(e) && "page" === E(e)) || T(e);
                if (k(e)) return k(e) && "index" === E(e);
                return (
                  !!(e.startsWith("api/") || e.startsWith("src/api/")) && T(e)
                );
              })(r, n[0]) &&
                n.forEach((e, t) => {
                  let r = t === n.length - 1,
                    o = i.children?.find((t) => t.name === e);
                  if (o) i = o;
                  else {
                    let t = {
                      path: i.path + "/" + e,
                      name: e,
                      type: r ? "file" : "folder",
                      children: r ? void 0 : [],
                    };
                    ((i.children = i.children || []),
                      i.children.push(t),
                      (i = t));
                  }
                });
            }),
            t.children || []
          );
        }, [e]),
        o = n.split("?")[0],
        [s, a] = (0, r.useState)(!window.can_redirect),
        [l, c] = (0, r.useState)(!1);
      return (R(),
      (0, r.useEffect)(() => {
        let e = (function e(t) {
          let r = [];
          if (
            ("file" === t.type && r.push(t),
            t.children && Array.isArray(t.children))
          )
            for (let n of t.children) r.push(...e(n));
          return r;
        })({ path: "/", name: "Root", type: "folder", children: i }).filter(
          (e) => !e.path.includes("["),
        );
        (e.sort((e, t) =>
          e.path.endsWith("/route") && !t.path.endsWith("/route")
            ? 1
            : !e.path.endsWith("/route") && t.path.endsWith("/route")
              ? -1
              : 0,
        ),
          a(!0),
          window.can_redirect
            ? ((window.can_redirect = !1),
              e.length ? (window.location.href = A(e[0].path)) : c(!0))
            : c(!0));
      }, [o, i]),
      s && l)
        ? (0, t.jsxs)("div", {
            className:
              "mx min-h-screen overflow-auto p-4 bg-white text-black dark:bg-[hsl(0_0%_4%)] dark:text-white",
            children: [
              (0, t.jsx)(O, { currentRoute: n }),
              (0, t.jsx)("main", {
                className: "max-w-full",
                children: (0, t.jsx)("ul", {
                  className: "space-y-1",
                  children: i.map((e) =>
                    (0, t.jsx)(C, { depth: 0, route: e }, e.path),
                  ),
                }),
              }),
            ],
          })
        : null;
    }
    function j({ currentRoute: e, rawPath: n }) {
      let [i, o] = (0, r.useState)(!window.can_redirect),
        [s, a] = (0, r.useState)(!1);
      return (R(),
      (0, r.useEffect)(() => {
        (o(!0),
          window.can_redirect
            ? ((window.can_redirect = !1), (window.location.href = A("/")))
            : a(!0));
      }, []),
      i && s)
        ? (0, t.jsxs)("div", {
            className:
              "mx min-h-screen overflow-auto p-4 bg-white text-black dark:bg-[hsl(0_0%_4%)] dark:text-white",
            children: [
              (0, t.jsx)(O, { currentRoute: e, label: "component" }),
              (0, t.jsx)("main", {
                className: "max-w-full",
                children: (0, t.jsx)("ul", {
                  className: "space-y-1",
                  children: (0, t.jsx)(
                    C,
                    {
                      depth: 0,
                      route: {
                        path: "/",
                        name: n.split("/").pop() || "Root",
                        type: "file",
                      },
                    },
                    "/",
                  ),
                }),
              }),
            ],
          })
        : null;
    }
    e.s(
      [
        "SimpleV0FileBrowser",
        () => N,
        "SimpleV0FileBrowserSingleComponent",
        () => j,
      ],
      769284,
    );
    let I = null;
    try {
      let e = sessionStorage.getItem("__v0_init_headers");
      e &&
        ((I = new Headers(JSON.parse(e))),
        sessionStorage.removeItem("__v0_init_headers"));
    } catch {}
    function L() {
      try {
        return I;
      } finally {
        I = null;
      }
    }
    let U = {
      get enabled() {
        return this.stackDepth > 0;
      },
      stackDepth: 0,
      readOnly: !0,
      headers: new Headers(),
      middlewareHeaders: null,
    };
    e.s(
      ["getInitialMiddlewareHeaders", () => L, "serverContext", 0, U],
      610621,
    );
  },
  395873,
  (e) => {
    "use strict";
    let t = Symbol.for("next-lite:globals");
    function r() {
      return globalThis[t];
    }
    ((globalThis[t] = {
      internal_location_change: () => {},
      internal_ts: globalThis.__v0_ts || 0,
      internal_fs: [],
      internal_fs_vol: void 0,
      internal_static: {},
    }),
      e.s(["getGlobals", () => r]));
  },
  342947,
  123314,
  (e) => {
    "use strict";
    let t, r, n, i, o, s, a, l;
    e.s(
      [
        "NextRequest",
        () => ef,
        "ROUTER_ERRORS",
        () => et,
        "RequestCookie",
        () => es,
        "Router",
        () => V,
        "default",
        () => ey,
        "executeInServerContext",
        () => ep,
        "executeRSC",
        () => eh,
        "getCurrentExecutionContext",
        () => ea,
        "getGlobalResolver",
        () => ew,
        "internals",
        () => H,
        "isRouterError",
        () => eu,
        "nextFontLocalShim",
        () => e_,
        "setRequestHeadersFromMiddleware",
        () => ed,
        "updateGlobalResolver",
        () => eb,
        "useRouter",
        () => eo,
      ],
      342947,
    );
    var c,
      u = e.i(301224),
      d = e.i(259390),
      h = e.i(464143),
      p = e.i(6216),
      f = e.i(789783),
      m = e.i(219094),
      g = e.i(608367),
      b = e.i(334405),
      w = e.i(349730),
      v = e.i(761532),
      _ = e.i(38415),
      y = e.i(936885),
      x = e.i(634826),
      R = e.i(769284),
      E = e.i(610621),
      S = e.i(183559),
      k = e.i(83443),
      P = e.i(696809),
      T = e.i(100139),
      C = e.i(395873),
      A = e.i(432631);
    e.s(
      [
        "patchFetch",
        () => D,
        "resolveRouteHandler",
        () => U,
        "startFetchCache",
        () => j,
        "stopFetchCache",
        () => I,
      ],
      123314,
    );
    let O = new (e.i(5743).LRUCache)({ max: 100 }),
      N = !1;
    function j() {
      N = !0;
    }
    function I() {
      N = !1;
    }
    async function L(e, t = {}) {
      var r;
      let n = [],
        i = new TextEncoder(),
        o = new TextDecoder();
      if (t.body)
        if ("function" == typeof t.body.getReader) {
          let e = t.body,
            r = [];
          try {
            (await e.pipeTo(
              new WritableStream({
                write(e) {
                  "string" == typeof e
                    ? (r.push(i.encode(e)), n.push(e))
                    : (r.push(e), n.push(o.decode(e, { stream: !0 })));
                },
              }),
            ),
              n.push(o.decode()));
            let s = r.reduce((e, t) => e + t.length, 0),
              a = new Uint8Array(s),
              l = 0;
            for (let e of r) (a.set(e, l), (l += e.length));
            t._ogBody = a;
          } catch (e) {
            console.error("Problem reading body", e);
          }
        } else if ("function" == typeof t.body.keys) {
          let e = t.body;
          for (let r of ((t._ogBody = t.body), new Set([...e.keys()]))) {
            let t = e.getAll(r);
            n.push(
              `${r}=${(await Promise.all(t.map(async (e) => ("string" == typeof e ? e : await e.text())))).join(",")}`,
            );
          }
        } else if ("function" == typeof t.body.arrayBuffer) {
          let e = t.body,
            r = await e.arrayBuffer();
          (n.push(await e.text()),
            (t._ogBody = new Blob([r], { type: e.type })));
        } else
          "string" == typeof t.body && (n.push(t.body), (t._ogBody = t.body));
      let s =
        "function" == typeof (t.headers || {}).keys
          ? Object.fromEntries(t.headers)
          : Object.assign({}, t.headers);
      ("traceparent" in s && delete s.traceparent,
        "tracestate" in s && delete s.tracestate);
      let a = JSON.stringify([
          "v3",
          e,
          t.method,
          s,
          t.mode,
          t.redirect,
          t.credentials,
          t.referrer,
          t.referrerPolicy,
          t.integrity,
          t.cache,
          n,
        ]),
        l = i.encode(a);
      return (
        (r = await crypto.subtle.digest("SHA-256", l)),
        Array.prototype.map
          .call(new Uint8Array(r), (e) => e.toString(16).padStart(2, "0"))
          .join("")
      );
    }
    async function U(e, t) {
      let n = t.url;
      if (x.LITE_PASS_THROUGH.test(n)) return;
      let i = r;
      if (!i) return null;
      let o = await i(n, "route");
      if (!o) return null;
      let [, s, a] = o;
      if (!a) return null;
      let l = await a();
      return l && l[e]
        ? await ep(() => l[e](t, { params: s }), !1, t.headers)
        : null;
    }
    function D() {
      let e = globalThis.fetch;
      async function t(r, n, i = !1) {
        let o = window.location.origin,
          s = (0, g.resolveUrl)(r, o),
          a = (n?.method || "GET").toUpperCase();
        if (s.origin === o || "" === s.origin) {
          if (
            ("" === s.origin && (s = new URL(s.pathname + s.search, o)),
            "GET" === a)
          ) {
            let t = (0, g.staticAssetUrlToResourceUri)(s.pathname);
            if (null !== t) return e(t, n);
          }
          let t = new ef(s, n);
          try {
            let e = await U(a, t);
            if (e)
              return new Response(e.body, {
                status: e.status,
                headers: e.headers,
              });
          } catch (e) {
            if (eu(e, et.REDIRECT[1]))
              return (
                (window.location.href = e[et.REDIRECT[1]]),
                new Response("Redirect", {
                  status: 302,
                  headers: {
                    Location: e instanceof Error ? e[et.REDIRECT[1]] : e,
                  },
                })
              );
            return new Response("Internal server error", { status: 500 });
          }
        } else if (s.hostname.includes(".")) {
          if (
            (i ||
              (function (e) {
                try {
                  var t;
                  let r;
                  return (
                    (t = e.toString()),
                    (r = new URL(t)),
                    !!(
                      "ai-gateway.vercel.sh" === r.host &&
                      r.pathname.startsWith("/v1/ai")
                    ) && "" === r.port
                  );
                } catch {
                  return !1;
                }
              })(s)) &&
            !(0, g.shouldIgnoreCorsProxy)(s)
          )
            return (0, k.corsProxyFetch)(e, s.toString(), r, n);
        } else throw TypeError("Failed to fetch");
        return e(r, n);
      }
      e.__v0__ ||
        ((globalThis.fetch = async function (r, n) {
          var i, o;
          if ("string" == typeof r) {
            let t = new URL(r, window.location.origin);
            if (
              ("http:" !== t.protocol && "https:" !== t.protocol) ||
              t.origin === x.ESMSH_BASE_URL
            )
              return e(r, n);
          }
          if (!E.serverContext.enabled) return t(r, n);
          let s = await ((i = r),
          (o = n),
          L(
            ("string" == typeof i
              ? new URL(i, window.location.origin)
              : i instanceof Request
                ? i.url
                : i
            ).toString(),
            o || (i instanceof Request ? i : void 0),
          ));
          if (N) {
            let e = O.get(s);
            if (e) return e.clone();
          }
          let a = await t(r, n, !0);
          return (O.set(s, a.clone()), a);
        }),
        (globalThis.fetch.__v0__ = !0));
    }
    var M = e.i(772025);
    let H = {
        createServerRef: function (e) {
          let t = async (...t) => {
            (await Y.catch(() => {}),
              K.revalidatedPaths.clear(),
              K.revalidatedTags.clear(),
              K.expiredPaths.clear(),
              K.expiredTags.clear(),
              (K.revalidateCookies = !1),
              E.serverContext.stackDepth++);
            try {
              return ((Y = eh(() => ep(() => e(...t), !1))), await Y);
            } finally {
              (E.serverContext.stackDepth--,
                G &&
                  (K.revalidateCookies || K.revalidatedPaths.has(G.pathname)) &&
                  G.refresh());
            }
          };
          return ((t.__server_ref = !0), t);
        },
        createClientRef: function (e) {
          try {
            e.__client_ref = !0;
          } finally {
            return e;
          }
        },
      },
      F = (0, f.createContext)({ params: {} }),
      q = (0, f.createContext)({
        pathname: "/",
        push: (e) => {},
        replace: (e) => {},
        refresh: () => {},
        back: () => {},
        forward: () => {},
        prefetch: (e) => {},
      }),
      W = { pending: !0 },
      $ = { pending: !1 },
      B = (0, f.createContext)($);
    function X(e) {
      return (0, m.getNextFontGoogleMod)(Array.from(e));
    }
    X.__dynamic = !0;
    let G = null;
    function z({ error: e }) {
      if (e && "object" != typeof e)
        return (0, u.jsx)(b.ErrorPage, { code: 500, message: String(e) });
      if (e && et.NOT_FOUND[1] in e)
        return (0, u.jsx)(b.ErrorPage, {
          code: 404,
          message: "Page not found.",
        });
      if (e && et.FORBIDDEN[1] in e)
        return (0, u.jsx)(b.ErrorPage, { code: 403, message: "Forbidden" });
      if (e && et.UNAUTHORIZED[1] in e)
        return (0, u.jsx)(b.ErrorPage, { code: 401, message: "Unauthorized" });
      if (e && et.REDIRECT[1] in e) {
        let t = "replace" === e.__v0__redirectType ? "replace" : "push";
        return (
          console.log("Redirecting to", e[et.REDIRECT[1]], !!G),
          G?.[t](e[et.REDIRECT[1]]),
          null
        );
      }
      throw e;
    }
    function V({
      children: e,
      defaultRoute: t,
      defaultParams: r,
      fallback: n,
      resolver: i,
      singleComponent: o,
      potentialEntries: s,
    }) {
      let [a, l] = (0, f.useState)(t),
        [c, d] = (0, f.useState)(e),
        [h, p] = (0, f.useState)(r),
        m = (0, f.useRef)(a);
      (0, f.useEffect)(() => {
        m.current = a;
      }, [a]);
      let b = (0, f.useRef)(e);
      (0, f.useEffect)(() => {
        b.current = e;
      }, [e]);
      let w = (0, f.useCallback)(
          async (e, t) => {
            let r;
            if (
              (e.startsWith("http://") || e.startsWith("https://")) &&
              !e.startsWith(window.location.origin)
            )
              return void window.open(e, "_blank", "noopener");
            (e.startsWith("#") || e.startsWith("?")) && (e = "/" + e);
            let n = await i(e),
              a = {},
              c = e;
            if (n) ((c = n[0]), (a = n[1]), (r = await n[3]()));
            else if (o)
              r =
                new URL(e, "http://n").pathname !==
                new URL(m.current, "http://n").pathname
                  ? (0, u.jsx)(R.SimpleV0FileBrowserSingleComponent, {
                      currentRoute: e,
                      rawPath: s[0],
                    })
                  : b.current;
            else {
              let t = await i(e, "all");
              t
                ? (location.href = t[0])
                : (r = (0, u.jsx)(R.SimpleV0FileBrowser, {
                    currentRoute: e,
                    rawPaths: s,
                  }));
            }
            ((0, f.startTransition)(() => {
              (void 0 !== r && d(r), l(c), p(a));
            }),
              e !== m.current &&
                ("push" === t
                  ? window.history.pushState({}, "", e)
                  : "replace" === t && window.history.replaceState({}, "", e),
                (0, C.getGlobals)().internal_location_change()));
          },
          [i, o],
        ),
        v = (0, f.useRef)(w);
      (0, f.useEffect)(() => {
        v.current = w;
      }, [w]);
      let _ = (0, f.useRef)(i);
      (0, f.useEffect)(() => {
        _.current !== i && (v.current(m.current, "skip"), (_.current = i));
      }, [i]);
      let y = (0, f.useMemo)(
          () =>
            (G = {
              pathname: a,
              push: (e) => {
                (0, f.startTransition)(() => v.current(e, "push"));
              },
              replace: (e) => {
                (0, f.startTransition)(() => v.current(e, "replace"));
              },
              refresh: () => {
                (0, f.startTransition)(() => v.current(a, "skip"));
              },
              back: () => window.history.back(),
              forward: () => window.history.forward(),
              prefetch: (e) => {},
            }),
          [a],
        ),
        x = (0, f.useMemo)(() => ({ params: h }), [h]);
      return (
        (0, f.useEffect)(() => {
          let e = () => {
            (0, f.startTransition)(() =>
              v.current(window.location.pathname, "skip"),
            );
          };
          return (
            window.addEventListener("popstate", e),
            () => {
              window.removeEventListener("popstate", e);
            }
          );
        }, []),
        (0, u.jsx)(F.Provider, {
          value: x,
          children: (0, u.jsx)(q.Provider, {
            value: y,
            children: (0, u.jsx)(g.ErrorBoundary, {
              fallback: n,
              id: a,
              children: (0, u.jsx)(g.ErrorBoundary, {
                fallback: z,
                id: a,
                children: c,
              }),
            }),
          }),
        })
      );
    }
    let Y = Promise.resolve(),
      K = {
        revalidatedPaths: new Set(),
        revalidatedTags: new Set(),
        expiredPaths: new Set(),
        expiredTags: new Set(),
        cachedTags: new Set(),
        revalidateCookies: !1,
      };
    function Z(e) {
      K.expiredPaths.add(e);
    }
    function J(e) {
      K.expiredTags.add(e);
    }
    function Q(e) {}
    function ee() {}
    let et = {
        NOT_FOUND: ["Not found", "__v0__notFound"],
        FORBIDDEN: ["Forbidden", "__v0__forbidden"],
        UNAUTHORIZED: ["Unauthorized", "__v0__unauthorized"],
        REDIRECT: ["Redirect", "__v0__redirect"],
      },
      er = (e) => {
        let [t, r] = et[e],
          n = Error(t);
        return ((n[r] = !0), n);
      };
    var en = (((c = en || {}).push = "push"), (c.replace = "replace"), c);
    function ei(e, t) {
      let r = Error("Redirect");
      throw ((r.__v0__redirect = e), t && (r.__v0__redirectType = t), r);
    }
    function eo() {
      return (0, f.useContext)(q);
    }
    class es {
      get(e) {
        let t = h.default.get(e);
        if (void 0 !== t) return { name: e, value: t };
      }
      getAll() {
        let e = h.default.get(),
          t = [];
        for (let [r, n] of Object.entries(e)) t.push({ name: r, value: n });
        return t;
      }
      has(e) {
        return void 0 !== h.default.get(e);
      }
      set(e, t, r) {
        let n = { ...r, sameSite: "None", secure: !0, httpOnly: !1 };
        ("number" == typeof n.maxAge && (n.maxAge = String(n.maxAge)),
          "number" == typeof n["max-age"] &&
            (n["max-age"] = String(n["max-age"])),
          h.default.set(e, t, n),
          (K.revalidateCookies = !0));
      }
      delete(e) {
        (h.default.remove(e, { sameSite: "None", secure: !0 }),
          (K.revalidateCookies = !0));
      }
      clear() {
        for (let e of Object.keys(h.default.get())) h.default.remove(e);
        K.revalidateCookies = !0;
      }
      toString() {
        return document.cookie;
      }
    }
    function ea() {
      for (let e of (0, p.parse)(Error())) {
        if (e.file && e.file.startsWith("blob:")) {
          let t = (0, g.getModuleNameFromBlob)(e.file);
          if (t && t.endsWith("?client_layer")) return "client";
          if (t && t.endsWith("?server_layer")) break;
        }
        if ("executeInServerContext" === e.function) break;
      }
      return "server";
    }
    let el = "__prerender_bypass";
    async function ec() {
      if ("server" !== ea())
        throw Error(
          "The draftMode() API can only be used in Server Components, Server Actions and Route Handlers.",
        );
      let e = "1" === h.default.get(el);
      return {
        get isEnabled() {
          return e;
        },
        enable: () => {
          e ||
            (h.default.set(el, "1", {
              sameSite: "None",
              secure: !0,
              httpOnly: !1,
            }),
            (e = !0));
        },
        disable: () => {
          e &&
            (h.default.remove(el, {
              sameSite: "None",
              secure: !0,
              httpOnly: !1,
            }),
            (e = !1));
        },
      };
    }
    let eu = (e, t) =>
      e &&
      "object" == typeof e &&
      t in e &&
      (!0 === e[t] || "string" == typeof e[t]);
    function ed(e) {
      E.serverContext.middlewareHeaders = e;
    }
    async function eh(e) {
      try {
        return await e();
      } catch (e) {
        if (eu(e, et.REDIRECT[1])) {
          window.location.href = e[et.REDIRECT[1]];
          return;
        }
        throw e;
      }
    }
    async function ep(e, t = !0, r = {}) {
      try {
        (E.serverContext.stackDepth++,
          (E.serverContext.readOnly = t),
          (E.serverContext.headers = r));
        let n = await e();
        return (await new Promise((e) => setTimeout(e, 1)), n);
      } finally {
        (E.serverContext.stackDepth--,
          (E.serverContext.readOnly = !0),
          (E.serverContext.headers = {}),
          (E.serverContext.middlewareHeaders = null));
      }
    }
    class ef extends w.NextRequest {
      originalHeaders;
      constructor(e, t) {
        super(e, t);
        const r = new Headers(
          t?.headers ?? (e instanceof Request ? e.headers : {}),
        );
        ((this.originalHeaders = r),
          (this[P.INTERNALS].cookies = new T.RequestCookies(r)));
      }
      get headers() {
        return this.originalHeaders ? this.originalHeaders : super.headers;
      }
      clone() {
        return new ef(this);
      }
    }
    function em(e) {
      let t = e.headers;
      function r(r, n) {
        if ("set-cookie" === r.toLowerCase()) {
          let t = (0, A.parseSetCookie)(n);
          t && e.cookies.set(t);
          return;
        }
        return t.set(r, n);
      }
      function n(r, n) {
        if ("set-cookie" === r.toLowerCase()) {
          let t = (0, A.parseSetCookie)(n);
          t && e.cookies.set(t);
          return;
        }
        return t.append(r, n);
      }
      function i(r) {
        if ("set-cookie" === r.toLowerCase()) {
          for (let t of e.cookies.getAll()) e.cookies.delete(t.name);
          return;
        }
        return t.delete(r);
      }
      let o = new Proxy(e.headers, {
        get: (e, t) =>
          "set" === t
            ? r
            : "append" === t
              ? n
              : "delete" === t
                ? i
                : t in e && "function" == typeof e[t]
                  ? e[t].bind(e)
                  : Reflect.get(e, t, e),
      });
      return new Proxy(e, {
        get: (e, t) =>
          "headers" === t
            ? o
            : t in e && "function" == typeof e[t]
              ? e[t].bind(e)
              : Reflect.get(e, t, e),
      });
    }
    class eg extends w.NextResponse {
      constructor(e, t) {
        super(e, t);
      }
      static redirect(...e) {
        return em(super.redirect(...e));
      }
      static rewrite(...e) {
        return em(super.rewrite(...e));
      }
      static next(...e) {
        return em(super.next(...e));
      }
    }
    function eb(e) {
      r = e;
    }
    function ew() {
      return r;
    }
    (D(),
      (globalThis.Buffer = d.Buffer),
      (window.__v0_cookie_doc = new Proxy(
        {},
        {
          get: (e, t) =>
            "cookie" === t ? document.cookie : Reflect.get(document, t),
          set: (e, t, r) =>
            "cookie" === t && "string" == typeof r
              ? (r.split(",").forEach((e) => {
                  let t = e.replace(/SameSite=Lax/g, "SameSite=None");
                  (t.includes("SameSite=None") || (t += "; SameSite=None"),
                    t.includes("Secure") || (t += "; Secure"),
                    (document.cookie = t));
                }),
                !0)
              : Reflect.set(document, t, r),
        },
      )),
      (n = XMLHttpRequest.prototype.open),
      (XMLHttpRequest.prototype.open = function (e, t, ...r) {
        let i = window.location.origin,
          o = (0, g.resolveUrl)(t, i);
        return o.origin !== i &&
          E.serverContext.enabled &&
          !(0, g.shouldIgnoreCorsProxy)(o)
          ? void (0, k.corsProxyXMLHttpRequest)(n, this, o.toString(), e, r)
          : n.call(this, e, t, ...r);
      }),
      (i = Request),
      (globalThis.Request = class e extends i {
        originalHeaders;
        constructor(e, t) {
          (super(e, t),
            (this.originalHeaders = new Headers(
              t?.headers ?? (e instanceof Request ? e.headers : {}),
            )));
        }
        get headers() {
          return this.originalHeaders;
        }
        clone() {
          return new e(this);
        }
      }),
      (o = new WeakMap()),
      (s = new Map()),
      (globalThis.__v0_rscRefreshRegister = (e, t) => {
        if (
          e &&
          "function" == typeof e &&
          "AsyncFunction" === e.constructor.name
        ) {
          if ((o.set(e, t), s.has(t))) {
            let e = s.get(t);
            e[0] = () => e[1]?.();
          } else {
            let e = [];
            ((e[0] = () => e[1]?.()), s.set(t, e));
          }
          let r = s.get(t)[0];
          self.__v0_refreshRuntime.register(r, t + "(rsc)");
        }
      }),
      (globalThis.__v0_replaceRscRefreshComponent = (e, t) => {
        let r = o.get(e);
        if (r && s.has(r)) {
          let e = s.get(r);
          return ((e[1] = t), e[0]);
        }
      }),
      (a = globalThis.Image),
      (globalThis.Image = class extends a {
        _src = "";
        constructor(e, t) {
          super(e, t);
        }
        get src() {
          return this._src;
        }
        set src(e) {
          if (((this._src = e), "string" == typeof e)) {
            let t = (0, g.staticAssetUrlToResourceUri)(e);
            null !== t ? (super.src = t) : (super.src = e);
          } else super.src = e;
        }
      }),
      (l = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src")),
      Object.defineProperty(HTMLImageElement.prototype, "src", {
        get() {
          return l.get.call(this);
        },
        set(e) {
          if ("string" != typeof e) return void l.set.call(this, e);
          let t = (0, g.staticAssetUrlToResourceUri)(e);
          null !== t ? l.set.call(this, t) : l.set.call(this, e);
        },
        configurable: !0,
        enumerable: !0,
      }));
    let ev = new Map(),
      e_ = ({ src: e, variable: t, weight: r }) => {
        let n;
        if ("string" == typeof e)
          if (e.startsWith(x.ESMSH_BASE_URL)) n = e;
          else {
            let t = (0, p.parse)(Error(), { slice: 2 });
            if (t[1]) {
              let r = t[1].file;
              if (
                r &&
                /https:\/\/(esm\.sh|esm\.v0\.dev)\/[^/]+\/geist@/.test(r)
              ) {
                let t = new URL(e, `${x.ESMSH_BASE_URL}/geist/dist/`);
                (t.searchParams.set("raw", ""), (n = t.toString()));
              } else if (e.startsWith("https://")) n = e;
              else if (e.startsWith(".") && r && r.startsWith("blob:")) {
                let t = (0, g.findOriginalModuleNameFromURL)(r);
                if (t.startsWith("/")) {
                  let r = (0, M.resolve)((0, M.dirname)(t), e),
                    i = (0, C.getGlobals)().internal_fs;
                  if (i) {
                    for (let e of i)
                      if ("/" + e[0] === r) {
                        "url" === e[1].type && (n = e[1].data);
                        break;
                      }
                  }
                }
              }
            }
          }
        if (!n)
          return (
            console.warn("v0 cannot resolve local font from: ", e),
            {
              css: "",
              className: "",
              fallbackFonts: [],
              weight: r,
              style: {},
              variable: t || "--next-local-font",
              adjustFontFallback: "sans-serif",
            }
          );
        let i = (function ({ src: e, variable: t }) {
          let r = JSON.stringify({ src: e, variable: t });
          if (ev.has(r)) return ev.get(r);
          let n = document.createElement("style"),
            i = "f_" + (~~(1e7 * Math.random())).toString(16),
            o = t ? "fv_" + (~~(1e7 * Math.random())).toString(16) : void 0;
          ((n.textContent = `\
@font-face { font-family: "${i}"; src: url("${e}") }
.${i} { font-family: "${i}" }
${t ? `.${o} { ${t}: "${i}" }` : ""}`),
            document.head.appendChild(n));
          let s = {
            className: i,
            style: { fontFamily: `"${i}"` },
            variable: o,
          };
          return (ev.set(r, s), s);
        })({ src: n, variable: t });
        return {
          css: "",
          fallbackFonts: [],
          className: i.className,
          style: i.style,
          variable: i.variable,
          weight: r,
          adjustFontFallback: "sans-serif",
        };
      },
      ey = {
        "server-only?client_layer": {
          __runtime:
            "throw new Error('This module cannot be imported from a Client Component module. It should only be used from a Server Component.')",
        },
        "server-only?server_layer": { __runtime: "" },
        "client-only?server_layer": {
          __runtime:
            "throw new Error('This module cannot be imported from a Server Component module. It should only be used from a Client Component.')",
        },
        "client-only?client_layer": { __runtime: "" },
        "next/link": {
          default: function ({
            href: e,
            children: r,
            replace: n,
            prefetch: i,
            legacyBehavior: o,
            passHref: s,
            as: a,
            scroll: l,
            ...c
          }) {
            let [d, h] = (0, f.useOptimistic)($),
              p = (0, f.useContext)(q),
              m = (r) => {
                if (
                  c.onNavigate &&
                  !(r.metaKey || r.altKey || r.ctrlKey || r.shiftKey)
                ) {
                  let t = new URL(e, window.location.origin);
                  if (
                    t.hostname === window.location.hostname &&
                    t.pathname !== window.location.pathname &&
                    (c.onNavigate(r), r.defaultPrevented)
                  )
                    return;
                }
                (c.onClick && c.onClick(r),
                  r.preventDefault(),
                  n ? p.replace(e) : p.push(e),
                  (0, f.startTransition)(() => {
                    (t?.($), h(W), (t = h));
                  }));
              };
            return s
              ? (0, u.jsx)(B.Provider, {
                  value: d,
                  children: (0, u.jsx)("div", {
                    onClick: m,
                    children: f.default.cloneElement(r, { href: e, ...c }),
                  }),
                })
              : (0, u.jsx)(B.Provider, {
                  value: d,
                  children: (0, u.jsx)("a", {
                    href: e,
                    ...c,
                    onClick: m,
                    children: r,
                  }),
                });
          },
          useLinkStatus: function () {
            return (0, f.useContext)(B);
          },
        },
        "next/font/google": X,
        "next/font/local": e_,
        "next/cache": {
          revalidatePath: function (e) {
            K.revalidatedPaths.add(e);
          },
          revalidateTag: function (e, t) {
            K.revalidatedTags.add(e);
          },
          updateTag: function (e) {
            K.revalidatedTags.add(e);
          },
          refresh: function () {},
          expirePath: Z,
          expireTag: J,
          unstable_expirePath: Z,
          unstable_expireTag: J,
          unstable_cacheLife: Q,
          unstable_cacheTag: ee,
          unstable_cache: function (e, t, r) {
            return e;
          },
          unstable_noStore: function () {},
          cacheTag: ee,
          cacheLife: Q,
        },
        "next/navigation": {
          notFound: function () {
            throw er("NOT_FOUND");
          },
          forbidden: function () {
            throw er("FORBIDDEN");
          },
          redirect: ei,
          unauthorized: function () {
            throw er("UNAUTHORIZED");
          },
          permanentRedirect: ei,
          useSearchParams: function () {
            return new URLSearchParams(window.location.search);
          },
          useRouter: eo,
          usePathname: function () {
            return eo().pathname;
          },
          useParams: function () {
            return (0, f.useContext)(F).params;
          },
          useSelectedLayoutSegments: function () {
            return [];
          },
          useSelectedLayoutSegment: function () {
            return null;
          },
          useServerInsertedHTML: function () {},
          unstable_rethrow: function (e) {
            if (
              "object" != typeof e ||
              "__v0__notFound" in e ||
              "__v0__forbidden" in e ||
              "__v0__unauthorized" in e ||
              "__v0__redirect" in e
            )
              throw e;
          },
          RedirectType: en,
        },
        "next/router": { Router: V, useRouter: eo },
        "next/compat/router": { Router: V, useRouter: eo },
        "next/headers": {
          cookies: function () {
            if ("server" !== ea())
              throw Error(
                "The cookies() API can only be used in Server Components, Server Actions and Route Handlers.",
              );
            return new es();
          },
          headers: function () {
            if ("server" !== ea())
              throw Error(
                "The headers() API can only be used in Server Components, Server Actions and Route Handlers.",
              );
            let e = E.serverContext.middlewareHeaders
              ? E.serverContext.middlewareHeaders
              : E.serverContext.headers;
            return new Headers([
              ...(0, x.GET_REQ_HEADERS)(),
              ...(e instanceof Headers ? e.entries() : Object.entries(e)),
            ]);
          },
          draftMode: ec,
        },
        "next/server": {
          NextResponse: eg,
          NextRequest: ef,
          unstable_after: eR,
          after: eR,
          connection: eE,
          userAgent: w.userAgent,
          userAgentFromString: w.userAgentFromString,
        },
        "next/image": function ({ ...e }) {
          if ("string" == typeof e.src) {
            let t = (0, g.staticAssetUrlToResourceUri)(e.src);
            t && (e.src = t);
          }
          return (0, u.jsx)(v.default, { ...e, unoptimized: !0 });
        },
        "next/script": _.default,
        "next/form": function ({ ...e }) {
          return (0, u.jsx)("form", { ...e });
        },
        "next/dynamic": y.default,
        "next/web-vitals": { useReportWebVitals: S.useReportWebVitals },
        "next/og": ex,
        "next/package.json": { version: "14.2.25" },
      };
    function ex() {
      return e.A(365731);
    }
    function eR(e) {
      setTimeout(() => {
        e();
      }, 0);
    }
    async function eE() {}
    ex.__lazy = !0;
  },
  608367,
  (e) => {
    "use strict";
    e.s([
      "ErrorBoundary",
      () => s,
      "NotFoundBoundary",
      () => a,
      "RenderThenable",
      () => l,
      "blobToModuleName",
      () => u,
      "createAsyncComponentWithCache",
      () => C,
      "findOriginalModuleNameFromURL",
      () => b,
      "getIsNavigationBlocked",
      () => v,
      "getModuleNameFromBlob",
      () => f,
      "importEntry",
      () => m,
      "isFromCDN",
      () => g,
      "relocationWhileBlocking",
      () => _,
      "resolveUrl",
      () => d,
      "sendToParent",
      () => c,
      "shouldIgnoreCorsProxy",
      () => p,
      "startHMR",
      () => P,
      "staticAssetUrlToResourceUri",
      () => O,
      "stopHMR",
      () => T,
      "useSendBrowserEvent",
      () => R,
    ]);
    var t = e.i(301224),
      r = e.i(789783),
      n = e.i(342947),
      i = e.i(634826),
      o = e.i(395873);
    class s extends r.Component {
      state = { error: null, errorId: void 0 };
      componentDidCatch(e) {
        this.setState({ error: e, errorId: this.props.id });
      }
      render() {
        if (this.props.id === this.state.errorId && this.state.error) {
          let e = this.props.fallback;
          return (0, t.jsx)(e, { error: this.state.error });
        }
        return this.props.children;
      }
    }
    class a extends r.Component {
      state = { error: null, errorId: void 0 };
      componentDidCatch(e) {
        if (n.ROUTER_ERRORS.NOT_FOUND[1] in e) this.setState({ error: e });
        else throw e;
      }
      render() {
        if (this.state.error) {
          let e = this.props.fallback;
          return (0, t.jsx)(e, { error: this.state.error });
        }
        return this.props.children;
      }
    }
    function l({ render: e }) {
      let t = e && "function" == typeof e.then ? (0, r.use)(e) : e;
      if (t instanceof Error) throw t;
      return t;
    }
    function c(e) {
      window.parent.postMessage({ __v0_remote__: 1, ...e }, "*");
    }
    let u = {};
    function d(e, t) {
      return "string" == typeof e
        ? new URL(e, t)
        : e instanceof Request
          ? new URL(e.url, t)
          : e;
    }
    let h = [
      ".amazonaws.com",
      "esm.sh",
      ".v0.dev",
      ".localhost",
      "fal.run",
      ".fal.run",
      "bsky.social",
      ".bsky.social",
      "bsky.network",
      ".bsky.network",
    ];
    function p(e) {
      return (
        ("https:" !== e.protocol && "http:" !== e.protocol) ||
        h.some((t) =>
          t.startsWith(".") ? e.hostname.endsWith(t) : e.host === t,
        )
      );
    }
    function f(e) {
      if (!globalThis.importShim || u[e]) return u[e];
      if (e.startsWith("blob:") && "_r" in importShim) {
        for (let [t, r] of Object.entries(importShim._r))
          if (r.b === e) {
            let r = u[t];
            if (r) return (u[e] = r);
          }
      }
    }
    function m(e) {
      return window.importShim(e + "?server_layer");
    }
    function g(e) {
      return e.startsWith(i.ESMSH_BASE_URL);
    }
    function b(e, t = !1) {
      if (!globalThis.importShim) return e;
      let r = e;
      if (u[e]) r = u[e];
      else if (e.startsWith("blob:") && "_r" in importShim) {
        for (let [t, n] of Object.entries(importShim._r))
          if (n.b === e) {
            let n = u[t];
            r = n ? (u[e] = n) : t;
            break;
          }
      }
      return (
        (r = (r = (function (e) {
          if (g(e)) {
            let t = e.startsWith(i.ESMSH_BASE_URL);
            try {
              let r = new URL(e).pathname.split("/").filter(Boolean);
              return (
                r.length >= 4 && (t || r.shift()),
                (r[0]?.startsWith("@")
                  ? r.slice(0, 2).join("/")
                  : r[0]
                ).replace(/(.)@.*/, "$1")
              );
            } catch (e) {}
          }
          return e;
        })(r)).replace(/^@v0\//, "/")),
        t || (r = r.replace(/\?(server|client)_layer$/, "")),
        r
      );
    }
    let w = !1;
    function v() {
      return w;
    }
    function _(e, t) {
      if (
        ((w = !0),
        (window.location.href = e),
        (document.body.style.visibility = "hidden"),
        t)
      ) {
        let e = {};
        for (let [r, n] of t.entries()) e[r] = n;
        try {
          sessionStorage.setItem("__v0_init_headers", JSON.stringify(e));
        } catch {}
      }
    }
    let y = 0,
      x = (e) => {
        "keydown" === e.type && "Escape" === e.key
          ? c({ type: "escape_key_event", event: { type: e.type, key: e.key } })
          : Date.now() - y < 4e3 ||
            ((y = Date.now()),
            c({ type: "browser_event", event: { type: e.type } }));
      };
    function R() {
      (0, r.useEffect)(
        () => (
          window.addEventListener("mousedown", x, { capture: !0, passive: !0 }),
          window.addEventListener("keydown", x, { capture: !0, passive: !0 }),
          window.addEventListener("focusin", x, { capture: !0, passive: !0 }),
          window.addEventListener("scroll", x, { capture: !0, passive: !0 }),
          () => {
            (window.removeEventListener("mousedown", x, { capture: !0 }),
              window.removeEventListener("keydown", x, { capture: !0 }),
              window.removeEventListener("focusin", x, { capture: !0 }),
              window.removeEventListener("scroll", x, { capture: !0 }));
          }
        ),
        [],
      );
    }
    let E = new WeakMap(),
      S = new WeakMap(),
      k = null;
    function P() {
      k = [];
    }
    async function T() {
      k && (await Promise.allSettled(k), (k = null));
    }
    function C(e, t) {
      let n = null;
      return (
        e.then((e) => {
          n = e;
        }),
        k && k.push(e),
        S.set(t, () => {
          let [t, i] = (0, r.useState)(n);
          return (
            (0, r.useEffect)(() => {
              let t = !1;
              return (
                e.then((e) => {
                  t || i(e);
                }),
                () => {
                  t = !0;
                }
              );
            }, [e]),
            t
          );
        }),
        E.has(t) ||
          E.set(t, function () {
            return S.get(t)();
          }),
        E.get(t)
      );
    }
    let A = new WeakMap();
    function O(e) {
      var t;
      if (
        !(
          e &&
          !e.startsWith("http://") &&
          !e.startsWith("https://") &&
          !e.startsWith("data:") &&
          !e.startsWith("blob:")
        )
      )
        return null;
      let r = (0, o.getGlobals)().internal_static,
        n = new URL(e, window.location.href).pathname;
      if (r && r[n]) {
        let e = r[n];
        if ("raw" === e[0]) {
          let r = (t = (t = n).toLowerCase()).endsWith(".html")
            ? "text/html"
            : t.endsWith(".js")
              ? "text/javascript"
              : t.endsWith(".css")
                ? "text/css"
                : t.endsWith(".json")
                  ? "application/json"
                  : t.endsWith(".svg")
                    ? "image/svg+xml"
                    : t.endsWith(".xml")
                      ? "application/xml"
                      : t.endsWith(".txt")
                        ? "text/plain"
                        : t.endsWith(".md")
                          ? "text/markdown"
                          : t.endsWith(".csv")
                            ? "text/csv"
                            : "text/plain";
          return (
            A.has(e) ||
              A.set(e, URL.createObjectURL(new Blob([e[1]], { type: r }))),
            A.get(e)
          );
        }
        if ("url" === e[0]) return e[1];
      }
      return null;
    }
  },
]);
