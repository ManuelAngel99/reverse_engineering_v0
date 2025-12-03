(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  530975,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "warnOnce", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (e) => {};
  },
  908635,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "ReflectAdapter", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    class n {
      static get(e, t, r) {
        let n = Reflect.get(e, t, r);
        return "function" == typeof n ? n.bind(e) : n;
      }
      static set(e, t, r, n) {
        return Reflect.set(e, t, r, n);
      }
      static has(e, t) {
        return Reflect.has(e, t);
      }
      static deleteProperty(e, t) {
        return Reflect.deleteProperty(e, t);
      }
    }
  },
  896814,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "afterTaskAsyncStorageInstance", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (0, e.r(373507).createAsyncLocalStorage)();
  },
  351618,
  (e, t, r) => {
    "use strict";
    (Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "afterTaskAsyncStorage", {
        enumerable: !0,
        get: function () {
          return n.afterTaskAsyncStorageInstance;
        },
      }));
    let n = e.r(896814);
  },
  26563,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      isRequestAPICallableInsideAfter: function () {
        return u;
      },
      throwForSearchParamsAccessInUseCache: function () {
        return i;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
        return s;
      },
    };
    for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] });
    let c = e.r(324613),
      o = e.r(351618);
    function s(e, t) {
      throw Object.defineProperty(
        new c.StaticGenBailoutError(
          `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
        ),
        "__NEXT_ERROR_CODE",
        { value: "E543", enumerable: !1, configurable: !0 },
      );
    }
    function i(e, t) {
      let r = Object.defineProperty(
        Error(
          `Route ${e.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
        ),
        "__NEXT_ERROR_CODE",
        { value: "E842", enumerable: !1, configurable: !0 },
      );
      throw (
        Error.captureStackTrace(r, t),
        (e.invalidDynamicUsageError ??= r),
        r
      );
    }
    function u() {
      let e = o.afterTaskAsyncStorage.getStore();
      return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
    }
  },
]);
