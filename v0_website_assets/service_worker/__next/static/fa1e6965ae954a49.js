(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  865611,
  (e, t, r) => {
    var n = {
        229: function (e) {
          var t,
            r,
            n,
            o = (e.exports = {});
          function a() {
            throw Error("setTimeout has not been defined");
          }
          function i() {
            throw Error("clearTimeout has not been defined");
          }
          try {
            t = "function" == typeof setTimeout ? setTimeout : a;
          } catch (e) {
            t = a;
          }
          try {
            r = "function" == typeof clearTimeout ? clearTimeout : i;
          } catch (e) {
            r = i;
          }
          function s(e) {
            if (t === setTimeout) return setTimeout(e, 0);
            if ((t === a || !t) && setTimeout)
              return ((t = setTimeout), setTimeout(e, 0));
            try {
              return t(e, 0);
            } catch (r) {
              try {
                return t.call(null, e, 0);
              } catch (r) {
                return t.call(this, e, 0);
              }
            }
          }
          var u = [],
            c = !1,
            l = -1;
          function f() {
            c &&
              n &&
              ((c = !1),
              n.length ? (u = n.concat(u)) : (l = -1),
              u.length && p());
          }
          function p() {
            if (!c) {
              var e = s(f);
              c = !0;
              for (var t = u.length; t; ) {
                for (n = u, u = []; ++l < t; ) n && n[l].run();
                ((l = -1), (t = u.length));
              }
              ((n = null),
                (c = !1),
                (function (e) {
                  if (r === clearTimeout) return clearTimeout(e);
                  if ((r === i || !r) && clearTimeout)
                    return ((r = clearTimeout), clearTimeout(e));
                  try {
                    r(e);
                  } catch (t) {
                    try {
                      return r.call(null, e);
                    } catch (t) {
                      return r.call(this, e);
                    }
                  }
                })(e));
            }
          }
          function d(e, t) {
            ((this.fun = e), (this.array = t));
          }
          function y() {}
          ((o.nextTick = function (e) {
            var t = Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            (u.push(new d(e, t)), 1 !== u.length || c || s(p));
          }),
            (d.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (o.title = "browser"),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ""),
            (o.versions = {}),
            (o.on = y),
            (o.addListener = y),
            (o.once = y),
            (o.off = y),
            (o.removeListener = y),
            (o.removeAllListeners = y),
            (o.emit = y),
            (o.prependListener = y),
            (o.prependOnceListener = y),
            (o.listeners = function (e) {
              return [];
            }),
            (o.binding = function (e) {
              throw Error("process.binding is not supported");
            }),
            (o.cwd = function () {
              return "/";
            }),
            (o.chdir = function (e) {
              throw Error("process.chdir is not supported");
            }),
            (o.umask = function () {
              return 0;
            }));
        },
      },
      o = {};
    function a(e) {
      var t = o[e];
      if (void 0 !== t) return t.exports;
      var r = (o[e] = { exports: {} }),
        i = !0;
      try {
        (n[e](r, r.exports, a), (i = !1));
      } finally {
        i && delete o[e];
      }
      return r.exports;
    }
    ((a.ab =
      "/ROOT/node_modules/.pnpm/next@16.0.2-canary.24_patch_hash=gcu3wxnuyfwkkf5xpr5q3nci24_@babel+core@7.28.3_@opentelemetry_igsvcqjw6qpqi3bfxmrpsujan4/node_modules/next/dist/compiled/process/"),
      (t.exports = a(229)));
  },
  903664,
  (e, t, r) => {
    "use strict";
    var n, o;
    t.exports =
      (null == (n = e.g.process) ? void 0 : n.env) &&
      "object" == typeof (null == (o = e.g.process) ? void 0 : o.env)
        ? e.g.process
        : e.r(865611);
  },
  926171,
  (e, t, r) => {
    "use strict";
    var n = e.i(903664);
    !(function () {
      function e(e, t) {
        var r =
          (e =
            ((e = e.constructor) && (e.displayName || e.name)) ||
            "ReactClass") +
          "." +
          t;
        Y[r] ||
          (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            t,
            e,
          ),
          (Y[r] = !0));
      }
      function o(e, t, r) {
        ((this.props = e),
          (this.context = t),
          (this.refs = X),
          (this.updater = r || W));
      }
      function a() {}
      function i(e, t, r) {
        ((this.props = e),
          (this.context = t),
          (this.refs = X),
          (this.updater = r || W));
      }
      function s() {}
      function u(e) {
        try {
          var t = !1;
        } catch (e) {
          t = !0;
        }
        if (t) {
          var r = (t = console).error,
            n =
              ("function" == typeof Symbol &&
                Symbol.toStringTag &&
                e[Symbol.toStringTag]) ||
              e.constructor.name ||
              "Object";
          return (
            r.call(
              t,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              n,
            ),
            "" + e
          );
        }
      }
      function c(e) {
        if (null == e) return null;
        if ("function" == typeof e)
          return e.$$typeof === ee ? null : e.displayName || e.name || null;
        if ("string" == typeof e) return e;
        switch (e) {
          case P:
            return "Fragment";
          case I:
            return "Profiler";
          case N:
            return "StrictMode";
          case z:
            return "Suspense";
          case q:
            return "SuspenseList";
          case G:
            return "Activity";
          case B:
            return "ViewTransition";
        }
        if ("object" == typeof e)
          switch (
            ("number" == typeof e.tag &&
              console.error(
                "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
              ),
            e.$$typeof)
          ) {
            case D:
              return "Portal";
            case U:
              return e.displayName || "Context";
            case $:
              return (e._context.displayName || "Context") + ".Consumer";
            case H:
              var t = e.render;
              return (
                (e = e.displayName) ||
                  (e =
                    "" !== (e = t.displayName || t.name || "")
                      ? "ForwardRef(" + e + ")"
                      : "ForwardRef"),
                e
              );
            case F:
              return null !== (t = e.displayName || null)
                ? t
                : c(e.type) || "Memo";
            case V:
              ((t = e._payload), (e = e._init));
              try {
                return c(e(t));
              } catch (e) {}
          }
        return null;
      }
      function l(e) {
        if (e === P) return "<>";
        if ("object" == typeof e && null !== e && e.$$typeof === V)
          return "<...>";
        try {
          var t = c(e);
          return t ? "<" + t + ">" : "<...>";
        } catch (e) {
          return "<...>";
        }
      }
      function f() {
        var e = et.A;
        return null === e ? null : e.getOwner();
      }
      function p() {
        return Error("react-stack-top-frame");
      }
      function d(e) {
        if (er.call(e, "key")) {
          var t = Object.getOwnPropertyDescriptor(e, "key").get;
          if (t && t.isReactWarning) return !1;
        }
        return void 0 !== e.key;
      }
      function y() {
        var e = c(this.type);
        return (
          eo[e] ||
            ((eo[e] = !0),
            console.error(
              "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.",
            )),
          void 0 !== (e = this.props.ref) ? e : null
        );
      }
      function h(e, t, r, n, o, a) {
        var i = r.ref;
        return (
          (e = { $$typeof: M, type: e, key: t, props: r, _owner: n }),
          null !== (void 0 !== i ? i : null)
            ? Object.defineProperty(e, "ref", { enumerable: !1, get: y })
            : Object.defineProperty(e, "ref", { enumerable: !1, value: null }),
          (e._store = {}),
          Object.defineProperty(e._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0,
          }),
          Object.defineProperty(e, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null,
          }),
          Object.defineProperty(e, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: o,
          }),
          Object.defineProperty(e, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: a,
          }),
          Object.freeze && (Object.freeze(e.props), Object.freeze(e)),
          e
        );
      }
      function m(e) {
        g(e)
          ? e._store && (e._store.validated = 1)
          : "object" == typeof e &&
            null !== e &&
            e.$$typeof === V &&
            ("fulfilled" === e._payload.status
              ? g(e._payload.value) &&
                e._payload.value._store &&
                (e._payload.value._store.validated = 1)
              : e._store && (e._store.validated = 1));
      }
      function g(e) {
        return "object" == typeof e && null !== e && e.$$typeof === M;
      }
      function b(e, t) {
        var r, n;
        return "object" == typeof e && null !== e && null != e.key
          ? (u(e.key),
            (r = "" + e.key),
            (n = { "=": "=0", ":": "=2" }),
            "$" +
              r.replace(/[=:]/g, function (e) {
                return n[e];
              }))
          : t.toString(36);
      }
      function v(e, t, r) {
        if (null == e) return e;
        var n = [],
          o = 0;
        return (
          !(function e(t, r, n, o, a) {
            var i,
              c = typeof t;
            ("undefined" === c || "boolean" === c) && (t = null);
            var l = !1;
            if (null === t) l = !0;
            else
              switch (c) {
                case "bigint":
                case "string":
                case "number":
                  l = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case M:
                    case D:
                      l = !0;
                      break;
                    case V:
                      return e((l = t._init)(t._payload), r, n, o, a);
                  }
              }
            if (l) {
              a = a((l = t));
              var f,
                p,
                d = "" === o ? "." + b(l, 0) : o;
              return (
                Z(a)
                  ? ((n = ""),
                    null != d && (n = d.replace(eu, "$&/") + "/"),
                    e(a, r, n, "", function (e) {
                      return e;
                    }))
                  : null != a &&
                    (g(a) &&
                      (null != a.key && ((l && l.key === a.key) || u(a.key)),
                      (f = a),
                      (p =
                        n +
                        (null == a.key || (l && l.key === a.key)
                          ? ""
                          : ("" + a.key).replace(eu, "$&/") + "/") +
                        d),
                      (p = h(
                        f.type,
                        p,
                        f.props,
                        f._owner,
                        f._debugStack,
                        f._debugTask,
                      )),
                      f._store && (p._store.validated = f._store.validated),
                      (n = p),
                      "" !== o &&
                        null != l &&
                        g(l) &&
                        null == l.key &&
                        l._store &&
                        !l._store.validated &&
                        (n._store.validated = 2),
                      (a = n)),
                    r.push(a)),
                1
              );
            }
            if (((l = 0), (d = "" === o ? "." : o + ":"), Z(t)))
              for (var y = 0; y < t.length; y++)
                ((c = d + b((o = t[y]), y)), (l += e(o, r, n, c, a)));
            else if (
              "function" ==
              typeof (y =
                null === (i = t) || "object" != typeof i
                  ? null
                  : "function" == typeof (i = (K && i[K]) || i["@@iterator"])
                    ? i
                    : null)
            )
              for (
                y === t.entries &&
                  (es ||
                    console.warn(
                      "Using Maps as children is not supported. Use an array of keyed ReactElements instead.",
                    ),
                  (es = !0)),
                  t = y.call(t),
                  y = 0;
                !(o = t.next()).done;

              )
                ((c = d + b((o = o.value), y++)), (l += e(o, r, n, c, a)));
            else if ("object" === c) {
              if ("function" == typeof t.then)
                return e(
                  (function (e) {
                    switch (e.status) {
                      case "fulfilled":
                        return e.value;
                      case "rejected":
                        throw e.reason;
                      default:
                        switch (
                          ("string" == typeof e.status
                            ? e.then(s, s)
                            : ((e.status = "pending"),
                              e.then(
                                function (t) {
                                  "pending" === e.status &&
                                    ((e.status = "fulfilled"), (e.value = t));
                                },
                                function (t) {
                                  "pending" === e.status &&
                                    ((e.status = "rejected"), (e.reason = t));
                                },
                              )),
                          e.status)
                        ) {
                          case "fulfilled":
                            return e.value;
                          case "rejected":
                            throw e.reason;
                        }
                    }
                    throw e;
                  })(t),
                  r,
                  n,
                  o,
                  a,
                );
              throw Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === (r = String(t))
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : r) +
                  "). If you meant to render a collection of children, use an array instead.",
              );
            }
            return l;
          })(e, n, "", "", function (e) {
            return t.call(r, e, o++);
          }),
          n
        );
      }
      function _(e) {
        if (-1 === e._status) {
          var t = null,
            r = null,
            n = e._ioInfo;
          null != n &&
            ((n.start = n.end = performance.now()),
            (n.value = new Promise(function (e, n) {
              ((t = e), (r = n));
            })));
          var o = (n = e._result)();
          if (
            (o.then(
              function (r) {
                if (0 === e._status || -1 === e._status) {
                  ((e._status = 1), (e._result = r));
                  var n = e._ioInfo;
                  if (null != n) {
                    n.end = performance.now();
                    var a = null == r ? void 0 : r.default;
                    (t(a), (n.value.status = "fulfilled"), (n.value.value = a));
                  }
                  void 0 === o.status &&
                    ((o.status = "fulfilled"), (o.value = r));
                }
              },
              function (t) {
                if (0 === e._status || -1 === e._status) {
                  ((e._status = 2), (e._result = t));
                  var n = e._ioInfo;
                  (null != n &&
                    ((n.end = performance.now()),
                    n.value.then(s, s),
                    r(t),
                    (n.value.status = "rejected"),
                    (n.value.reason = t)),
                    void 0 === o.status &&
                      ((o.status = "rejected"), (o.reason = t)));
                }
              },
            ),
            null != (n = e._ioInfo))
          ) {
            var a = o.displayName;
            "string" == typeof a && (n.name = a);
          }
          -1 === e._status && ((e._status = 0), (e._result = o));
        }
        if (1 === e._status)
          return (
            void 0 === (n = e._result) &&
              console.error(
                "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
                n,
              ),
            "default" in n ||
              console.error(
                "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
                n,
              ),
            n.default
          );
        throw e._result;
      }
      function w() {
        var e = et.H;
        return (
          null === e &&
            console.error(
              "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.",
            ),
          e
        );
      }
      function O(e, t) {
        return w().useOptimistic(e, t);
      }
      function S() {
        et.asyncTransitions--;
      }
      function T(e) {
        var t = et.T,
          r = {};
        ((r.types = null !== t ? t.types : null),
          (r.gesture = null),
          (r._updatedFibers = new Set()),
          (et.T = r));
        try {
          var n = e(),
            o = et.S;
          (null !== o && o(r, n),
            "object" == typeof n &&
              null !== n &&
              "function" == typeof n.then &&
              (et.asyncTransitions++, n.then(S, S), n.then(s, ec)));
        } catch (e) {
          ec(e);
        } finally {
          (null === t &&
            r._updatedFibers &&
            ((e = r._updatedFibers.size),
            r._updatedFibers.clear(),
            10 < e &&
              console.warn(
                "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.",
              )),
            null !== t &&
              null !== r.types &&
              (null !== t.types &&
                t.types !== r.types &&
                console.error(
                  "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React.",
                ),
              (t.types = r.types)),
            (et.T = t));
        }
      }
      function k(e) {
        var t = et.T;
        if (null !== t) {
          var r = t.types;
          null === r ? (t.types = [e]) : -1 === r.indexOf(e) && r.push(e);
        } else
          (0 === et.asyncTransitions &&
            console.error(
              "addTransitionType can only be called inside a `startTransition()` or `startGestureTransition()` callback. It must be associated with a specific Transition.",
            ),
            T(k.bind(null, e)));
      }
      function E(e) {
        if (null === ef)
          try {
            var r = ("require" + Math.random()).slice(0, 7);
            ef = (t && t[r]).call(t, "timers").setImmediate;
          } catch (e) {
            ef = function (e) {
              !1 === el &&
                ((el = !0),
                "undefined" == typeof MessageChannel &&
                  console.error(
                    "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.",
                  ));
              var t = new MessageChannel();
              ((t.port1.onmessage = e), t.port2.postMessage(void 0));
            };
          }
        return ef(e);
      }
      function R(e) {
        return 1 < e.length && "function" == typeof AggregateError
          ? AggregateError(e)
          : e[0];
      }
      function j(e, t) {
        (t !== ep - 1 &&
          console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ",
          ),
          (ep = t));
      }
      function x(e, t, r) {
        var n = et.actQueue;
        if (null !== n)
          if (0 !== n.length)
            try {
              (C(n),
                E(function () {
                  return x(e, t, r);
                }));
              return;
            } catch (e) {
              et.thrownErrors.push(e);
            }
          else et.actQueue = null;
        0 < et.thrownErrors.length
          ? ((n = R(et.thrownErrors)), (et.thrownErrors.length = 0), r(n))
          : t(e);
      }
      function C(e) {
        if (!ey) {
          ey = !0;
          var t = 0;
          try {
            for (; t < e.length; t++)
              for (var r = e[t]; ; ) {
                et.didUsePromise = !1;
                var n = r(!1);
                if (null !== n) {
                  if (et.didUsePromise) {
                    ((e[t] = r), e.splice(0, t));
                    return;
                  }
                  r = n;
                } else break;
              }
            e.length = 0;
          } catch (r) {
            (e.splice(0, t + 1), et.thrownErrors.push(r));
          } finally {
            ey = !1;
          }
        }
      }
      "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" ==
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var L,
        A,
        M = Symbol.for("react.transitional.element"),
        D = Symbol.for("react.portal"),
        P = Symbol.for("react.fragment"),
        N = Symbol.for("react.strict_mode"),
        I = Symbol.for("react.profiler"),
        $ = Symbol.for("react.consumer"),
        U = Symbol.for("react.context"),
        H = Symbol.for("react.forward_ref"),
        z = Symbol.for("react.suspense"),
        q = Symbol.for("react.suspense_list"),
        F = Symbol.for("react.memo"),
        V = Symbol.for("react.lazy"),
        G = Symbol.for("react.activity"),
        B = Symbol.for("react.view_transition"),
        K = Symbol.iterator,
        Y = {},
        W = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function (t) {
            e(t, "forceUpdate");
          },
          enqueueReplaceState: function (t) {
            e(t, "replaceState");
          },
          enqueueSetState: function (t) {
            e(t, "setState");
          },
        },
        J = Object.assign,
        X = {};
      (Object.freeze(X),
        (o.prototype.isReactComponent = {}),
        (o.prototype.setState = function (e, t) {
          if ("object" != typeof e && "function" != typeof e && null != e)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables.",
            );
          this.updater.enqueueSetState(this, e, t, "setState");
        }),
        (o.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        }));
      var Q = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).",
        ],
      };
      for (em in Q)
        Q.hasOwnProperty(em) &&
          (function (e, t) {
            Object.defineProperty(o.prototype, e, {
              get: function () {
                console.warn(
                  "%s(...) is deprecated in plain JavaScript React classes. %s",
                  t[0],
                  t[1],
                );
              },
            });
          })(em, Q[em]);
      ((a.prototype = o.prototype),
        ((Q = i.prototype = new a()).constructor = i),
        J(Q, o.prototype),
        (Q.isPureReactComponent = !0));
      var Z = Array.isArray,
        ee = Symbol.for("react.client.reference"),
        et = {
          H: null,
          A: null,
          T: null,
          S: null,
          G: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: !1,
          didScheduleLegacyUpdate: !1,
          didUsePromise: !1,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0,
        },
        er = Object.prototype.hasOwnProperty,
        en = console.createTask
          ? console.createTask
          : function () {
              return null;
            },
        eo = {},
        ea = (Q = {
          react_stack_bottom_frame: function (e) {
            return e();
          },
        }).react_stack_bottom_frame.bind(Q, p)(),
        ei = en(l(p)),
        es = !1,
        eu = /\/+/g,
        ec =
          "function" == typeof reportError
            ? reportError
            : function (e) {
                if (
                  "object" == typeof window &&
                  "function" == typeof window.ErrorEvent
                ) {
                  var t = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      "object" == typeof e &&
                      null !== e &&
                      "string" == typeof e.message
                        ? String(e.message)
                        : String(e),
                    error: e,
                  });
                  if (!window.dispatchEvent(t)) return;
                } else if (
                  "object" == typeof n.default &&
                  "function" == typeof n.default.emit
                )
                  return void n.default.emit("uncaughtException", e);
                console.error(e);
              },
        el = !1,
        ef = null,
        ep = 0,
        ed = !1,
        ey = !1,
        eh =
          "function" == typeof queueMicrotask
            ? function (e) {
                queueMicrotask(function () {
                  return queueMicrotask(e);
                });
              }
            : E;
      Q = Object.freeze({
        __proto__: null,
        c: function (e) {
          return w().useMemoCache(e);
        },
      });
      var em = {
        map: v,
        forEach: function (e, t, r) {
          v(
            e,
            function () {
              t.apply(this, arguments);
            },
            r,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            v(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            v(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!g(e))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return e;
        },
      };
      ((r.Activity = G),
        (r.Children = em),
        (r.Component = o),
        (r.Fragment = P),
        (r.Profiler = I),
        (r.PureComponent = i),
        (r.StrictMode = N),
        (r.Suspense = z),
        (r.ViewTransition = B),
        (r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
          et),
        (r.__COMPILER_RUNTIME = Q),
        (r.act = function (e) {
          var t = et.actQueue,
            r = ep;
          ep++;
          var n = (et.actQueue = null !== t ? t : []),
            o = !1;
          try {
            var a = e();
          } catch (e) {
            et.thrownErrors.push(e);
          }
          if (0 < et.thrownErrors.length)
            throw (
              j(t, r),
              (e = R(et.thrownErrors)),
              (et.thrownErrors.length = 0),
              e
            );
          if (
            null !== a &&
            "object" == typeof a &&
            "function" == typeof a.then
          ) {
            var i = a;
            return (
              eh(function () {
                o ||
                  ed ||
                  ((ed = !0),
                  console.error(
                    "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);",
                  ));
              }),
              {
                then: function (e, a) {
                  ((o = !0),
                    i.then(
                      function (o) {
                        if ((j(t, r), 0 === r)) {
                          try {
                            (C(n),
                              E(function () {
                                return x(o, e, a);
                              }));
                          } catch (e) {
                            et.thrownErrors.push(e);
                          }
                          if (0 < et.thrownErrors.length) {
                            var i = R(et.thrownErrors);
                            ((et.thrownErrors.length = 0), a(i));
                          }
                        } else e(o);
                      },
                      function (e) {
                        (j(t, r),
                          0 < et.thrownErrors.length &&
                            ((e = R(et.thrownErrors)),
                            (et.thrownErrors.length = 0)),
                          a(e));
                      },
                    ));
                },
              }
            );
          }
          var s = a;
          if (
            (j(t, r),
            0 === r &&
              (C(n),
              0 !== n.length &&
                eh(function () {
                  o ||
                    ed ||
                    ((ed = !0),
                    console.error(
                      "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)",
                    ));
                }),
              (et.actQueue = null)),
            0 < et.thrownErrors.length)
          )
            throw ((e = R(et.thrownErrors)), (et.thrownErrors.length = 0), e);
          return {
            then: function (e, t) {
              ((o = !0),
                0 === r
                  ? ((et.actQueue = n),
                    E(function () {
                      return x(s, e, t);
                    }))
                  : e(s));
            },
          };
        }),
        (r.addTransitionType = k),
        (r.cache = function (e) {
          return function () {
            return e.apply(null, arguments);
          };
        }),
        (r.cacheSignal = function () {
          return null;
        }),
        (r.captureOwnerStack = function () {
          var e = et.getCurrentStack;
          return null === e ? null : e();
        }),
        (r.cloneElement = function (e, t, r) {
          if (null == e)
            throw Error(
              "The argument must be a React element, but you passed " + e + ".",
            );
          var n,
            o = J({}, e.props),
            a = e.key,
            i = e._owner;
          if (null != t) {
            e: {
              if (
                er.call(t, "ref") &&
                (n = Object.getOwnPropertyDescriptor(t, "ref").get) &&
                n.isReactWarning
              ) {
                n = !1;
                break e;
              }
              n = void 0 !== t.ref;
            }
            for (s in (n && (i = f()), d(t) && (u(t.key), (a = "" + t.key)), t))
              er.call(t, s) &&
                "key" !== s &&
                "__self" !== s &&
                "__source" !== s &&
                ("ref" !== s || void 0 !== t.ref) &&
                (o[s] = t[s]);
          }
          var s = arguments.length - 2;
          if (1 === s) o.children = r;
          else if (1 < s) {
            n = Array(s);
            for (var c = 0; c < s; c++) n[c] = arguments[c + 2];
            o.children = n;
          }
          for (
            o = h(e.type, a, o, i, e._debugStack, e._debugTask), a = 2;
            a < arguments.length;
            a++
          )
            m(arguments[a]);
          return o;
        }),
        (r.createContext = function (e) {
          return (
            ((e = {
              $$typeof: U,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = e),
            (e.Consumer = { $$typeof: $, _context: e }),
            (e._currentRenderer = null),
            (e._currentRenderer2 = null),
            e
          );
        }),
        (r.createElement = function (e, t, r) {
          for (var n, o = 2; o < arguments.length; o++) m(arguments[o]);
          o = {};
          var a = null;
          if (null != t)
            for (n in (A ||
              !("__self" in t) ||
              "key" in t ||
              ((A = !0),
              console.warn(
                "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform",
              )),
            d(t) && (u(t.key), (a = "" + t.key)),
            t))
              er.call(t, n) &&
                "key" !== n &&
                "__self" !== n &&
                "__source" !== n &&
                (o[n] = t[n]);
          var i = arguments.length - 2;
          if (1 === i) o.children = r;
          else if (1 < i) {
            for (var s = Array(i), c = 0; c < i; c++) s[c] = arguments[c + 2];
            (Object.freeze && Object.freeze(s), (o.children = s));
          }
          if (e && e.defaultProps)
            for (n in (i = e.defaultProps)) void 0 === o[n] && (o[n] = i[n]);
          return (
            a &&
              (function (e, t) {
                function r() {
                  L ||
                    ((L = !0),
                    console.error(
                      "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                      t,
                    ));
                }
                ((r.isReactWarning = !0),
                  Object.defineProperty(e, "key", {
                    get: r,
                    configurable: !0,
                  }));
              })(
                o,
                "function" == typeof e
                  ? e.displayName || e.name || "Unknown"
                  : e,
              ),
            (n = 1e4 > et.recentlyCreatedOwnerStacks++)
              ? ((s = Error.stackTraceLimit),
                (Error.stackTraceLimit = 10),
                (i = Error("react-stack-top-frame")),
                (Error.stackTraceLimit = s))
              : (i = ea),
            h(e, a, o, f(), i, n ? en(l(e)) : ei)
          );
        }),
        (r.createRef = function () {
          var e = { current: null };
          return (Object.seal(e), e);
        }),
        (r.experimental_useOptimistic = function (e, t) {
          return (
            console.error(
              "useOptimistic is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.",
            ),
            O(e, t)
          );
        }),
        (r.forwardRef = function (e) {
          (null != e && e.$$typeof === F
            ? console.error(
                "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).",
              )
            : "function" != typeof e
              ? console.error(
                  "forwardRef requires a render function but was given %s.",
                  null === e ? "null" : typeof e,
                )
              : 0 !== e.length &&
                2 !== e.length &&
                console.error(
                  "forwardRef render functions accept exactly two parameters: props and ref. %s",
                  1 === e.length
                    ? "Did you forget to use the ref parameter?"
                    : "Any additional parameter will be undefined.",
                ),
            null != e &&
              null != e.defaultProps &&
              console.error(
                "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?",
              ));
          var t,
            r = { $$typeof: H, render: e };
          return (
            Object.defineProperty(r, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function () {
                return t;
              },
              set: function (r) {
                ((t = r),
                  e.name ||
                    e.displayName ||
                    (Object.defineProperty(e, "name", { value: r }),
                    (e.displayName = r)));
              },
            }),
            r
          );
        }),
        (r.isValidElement = g),
        (r.lazy = function (e) {
          var t = {
              $$typeof: V,
              _payload: (e = { _status: -1, _result: e }),
              _init: _,
            },
            r = {
              name: "lazy",
              start: -1,
              end: -1,
              value: null,
              owner: null,
              debugStack: Error("react-stack-top-frame"),
              debugTask: console.createTask
                ? console.createTask("lazy()")
                : null,
            };
          return ((e._ioInfo = r), (t._debugInfo = [{ awaited: r }]), t);
        }),
        (r.memo = function (e, t) {
          var r;
          return (
            null == e &&
              console.error(
                "memo: The first argument must be a component. Instead received: %s",
                null === e ? "null" : typeof e,
              ),
            Object.defineProperty(
              (t = { $$typeof: F, type: e, compare: void 0 === t ? null : t }),
              "displayName",
              {
                enumerable: !1,
                configurable: !0,
                get: function () {
                  return r;
                },
                set: function (t) {
                  ((r = t),
                    e.name ||
                      e.displayName ||
                      (Object.defineProperty(e, "name", { value: t }),
                      (e.displayName = t)));
                },
              },
            ),
            t
          );
        }),
        (r.startTransition = T),
        (r.unstable_SuspenseList = q),
        (r.unstable_getCacheForType = function (e) {
          var t = et.A;
          return t ? t.getCacheForType(e) : e();
        }),
        (r.unstable_startGestureTransition = function (e, t, r) {
          if (null == e)
            throw Error(
              "A Timeline is required as the first argument to startGestureTransition.",
            );
          var n = et.T,
            o = { types: null };
          ((o.gesture = e), (o._updatedFibers = new Set()), (et.T = o));
          try {
            var a = t();
            "object" == typeof a &&
              null !== a &&
              "function" == typeof a.then &&
              console.error(
                "Cannot use an async function in startGestureTransition. It must be able to start immediately.",
              );
            var i = et.G;
            if (null !== i) return i(o, e, r);
          } catch (e) {
            ec(e);
          } finally {
            et.T = n;
          }
          return s;
        }),
        (r.unstable_useCacheRefresh = function () {
          return w().useCacheRefresh();
        }),
        (r.use = function (e) {
          return w().use(e);
        }),
        (r.useActionState = function (e, t, r) {
          return w().useActionState(e, t, r);
        }),
        (r.useCallback = function (e, t) {
          return w().useCallback(e, t);
        }),
        (r.useContext = function (e) {
          var t = w();
          return (
            e.$$typeof === $ &&
              console.error(
                "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?",
              ),
            t.useContext(e)
          );
        }),
        (r.useDebugValue = function (e, t) {
          return w().useDebugValue(e, t);
        }),
        (r.useDeferredValue = function (e, t) {
          return w().useDeferredValue(e, t);
        }),
        (r.useEffect = function (e, t) {
          return (
            null == e &&
              console.warn(
                "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              ),
            w().useEffect(e, t)
          );
        }),
        (r.useEffectEvent = function (e) {
          return w().useEffectEvent(e);
        }),
        (r.useId = function () {
          return w().useId();
        }),
        (r.useImperativeHandle = function (e, t, r) {
          return w().useImperativeHandle(e, t, r);
        }),
        (r.useInsertionEffect = function (e, t) {
          return (
            null == e &&
              console.warn(
                "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              ),
            w().useInsertionEffect(e, t)
          );
        }),
        (r.useLayoutEffect = function (e, t) {
          return (
            null == e &&
              console.warn(
                "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              ),
            w().useLayoutEffect(e, t)
          );
        }),
        (r.useMemo = function (e, t) {
          return w().useMemo(e, t);
        }),
        (r.useOptimistic = O),
        (r.useReducer = function (e, t, r) {
          return w().useReducer(e, t, r);
        }),
        (r.useRef = function (e) {
          return w().useRef(e);
        }),
        (r.useState = function (e) {
          return w().useState(e);
        }),
        (r.useSyncExternalStore = function (e, t, r) {
          return w().useSyncExternalStore(e, t, r);
        }),
        (r.useTransition = function () {
          return w().useTransition();
        }),
        (r.version = "19.3.0-experimental-fb2177c1-20251114"),
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          "function" ==
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error()));
    })();
  },
  789783,
  (e, t, r) => {
    "use strict";
    t.exports = e.r(926171);
  },
  947711,
  (e, t, r) => {
    "use strict";
    !(function () {
      function t(e) {
        if (null == e) return null;
        if ("function" == typeof e)
          return e.$$typeof === E ? null : e.displayName || e.name || null;
        if ("string" == typeof e) return e;
        switch (e) {
          case y:
            return "Fragment";
          case m:
            return "Profiler";
          case h:
            return "StrictMode";
          case _:
            return "Suspense";
          case w:
            return "SuspenseList";
          case T:
            return "Activity";
          case k:
            return "ViewTransition";
        }
        if ("object" == typeof e)
          switch (
            ("number" == typeof e.tag &&
              console.error(
                "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
              ),
            e.$$typeof)
          ) {
            case d:
              return "Portal";
            case b:
              return e.displayName || "Context";
            case g:
              return (e._context.displayName || "Context") + ".Consumer";
            case v:
              var r = e.render;
              return (
                (e = e.displayName) ||
                  (e =
                    "" !== (e = r.displayName || r.name || "")
                      ? "ForwardRef(" + e + ")"
                      : "ForwardRef"),
                e
              );
            case O:
              return null !== (r = e.displayName || null)
                ? r
                : t(e.type) || "Memo";
            case S:
              ((r = e._payload), (e = e._init));
              try {
                return t(e(r));
              } catch (e) {}
          }
        return null;
      }
      function n(e) {
        try {
          var t = !1;
        } catch (e) {
          t = !0;
        }
        if (t) {
          var r = (t = console).error,
            n =
              ("function" == typeof Symbol &&
                Symbol.toStringTag &&
                e[Symbol.toStringTag]) ||
              e.constructor.name ||
              "Object";
          return (
            r.call(
              t,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              n,
            ),
            "" + e
          );
        }
      }
      function o(e) {
        if (e === y) return "<>";
        if ("object" == typeof e && null !== e && e.$$typeof === S)
          return "<...>";
        try {
          var r = t(e);
          return r ? "<" + r + ">" : "<...>";
        } catch (e) {
          return "<...>";
        }
      }
      function a() {
        return Error("react-stack-top-frame");
      }
      function i() {
        var e = t(this.type);
        return (
          L[e] ||
            ((L[e] = !0),
            console.error(
              "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.",
            )),
          void 0 !== (e = this.props.ref) ? e : null
        );
      }
      function s(e, r, o, a, s, c) {
        var f,
          d,
          y,
          h,
          m,
          g,
          b = r.children;
        if (void 0 !== b)
          if (a)
            if (x(b)) {
              for (a = 0; a < b.length; a++) u(b[a]);
              Object.freeze && Object.freeze(b);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
              );
          else u(b);
        if (j.call(r, "key")) {
          b = t(e);
          var v = Object.keys(r).filter(function (e) {
            return "key" !== e;
          });
          D[
            b +
              (a =
                0 < v.length
                  ? "{key: someKey, " + v.join(": ..., ") + ": ...}"
                  : "{key: someKey}")
          ] ||
            (console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              a,
              b,
              (v = 0 < v.length ? "{" + v.join(": ..., ") + ": ...}" : "{}"),
              b,
            ),
            (D[b + a] = !0));
        }
        if (
          ((b = null),
          void 0 !== o && (n(o), (b = "" + o)),
          (function (e) {
            if (j.call(e, "key")) {
              var t = Object.getOwnPropertyDescriptor(e, "key").get;
              if (t && t.isReactWarning) return !1;
            }
            return void 0 !== e.key;
          })(r) && (n(r.key), (b = "" + r.key)),
          "key" in r)
        )
          for (var _ in ((o = {}), r)) "key" !== _ && (o[_] = r[_]);
        else o = r;
        return (
          b &&
            (function (e, t) {
              function r() {
                l ||
                  ((l = !0),
                  console.error(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                    t,
                  ));
              }
              ((r.isReactWarning = !0),
                Object.defineProperty(e, "key", { get: r, configurable: !0 }));
            })(
              o,
              "function" == typeof e ? e.displayName || e.name || "Unknown" : e,
            ),
          (d = e),
          (y = b),
          (h = o),
          (m = null === (f = R.A) ? null : f.getOwner()),
          (g = h.ref),
          (d = { $$typeof: p, type: d, key: y, props: h, _owner: m }),
          null !== (void 0 !== g ? g : null)
            ? Object.defineProperty(d, "ref", { enumerable: !1, get: i })
            : Object.defineProperty(d, "ref", { enumerable: !1, value: null }),
          (d._store = {}),
          Object.defineProperty(d._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0,
          }),
          Object.defineProperty(d, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null,
          }),
          Object.defineProperty(d, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: s,
          }),
          Object.defineProperty(d, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: c,
          }),
          Object.freeze && (Object.freeze(d.props), Object.freeze(d)),
          d
        );
      }
      function u(e) {
        c(e)
          ? e._store && (e._store.validated = 1)
          : "object" == typeof e &&
            null !== e &&
            e.$$typeof === S &&
            ("fulfilled" === e._payload.status
              ? c(e._payload.value) &&
                e._payload.value._store &&
                (e._payload.value._store.validated = 1)
              : e._store && (e._store.validated = 1));
      }
      function c(e) {
        return "object" == typeof e && null !== e && e.$$typeof === p;
      }
      var l,
        f = e.r(789783),
        p = Symbol.for("react.transitional.element"),
        d = Symbol.for("react.portal"),
        y = Symbol.for("react.fragment"),
        h = Symbol.for("react.strict_mode"),
        m = Symbol.for("react.profiler"),
        g = Symbol.for("react.consumer"),
        b = Symbol.for("react.context"),
        v = Symbol.for("react.forward_ref"),
        _ = Symbol.for("react.suspense"),
        w = Symbol.for("react.suspense_list"),
        O = Symbol.for("react.memo"),
        S = Symbol.for("react.lazy"),
        T = Symbol.for("react.activity"),
        k = Symbol.for("react.view_transition"),
        E = Symbol.for("react.client.reference"),
        R = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        j = Object.prototype.hasOwnProperty,
        x = Array.isArray,
        C = console.createTask
          ? console.createTask
          : function () {
              return null;
            },
        L = {},
        A = (f = {
          react_stack_bottom_frame: function (e) {
            return e();
          },
        }).react_stack_bottom_frame.bind(f, a)(),
        M = C(o(a)),
        D = {};
      ((r.Fragment = y),
        (r.jsx = function (e, t, r) {
          var n = 1e4 > R.recentlyCreatedOwnerStacks++;
          if (n) {
            var a = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var i = Error("react-stack-top-frame");
            Error.stackTraceLimit = a;
          } else i = A;
          return s(e, t, r, !1, i, n ? C(o(e)) : M);
        }),
        (r.jsxs = function (e, t, r) {
          var n = 1e4 > R.recentlyCreatedOwnerStacks++;
          if (n) {
            var a = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var i = Error("react-stack-top-frame");
            Error.stackTraceLimit = a;
          } else i = A;
          return s(e, t, r, !0, i, n ? C(o(e)) : M);
        }));
    })();
  },
  301224,
  (e, t, r) => {
    "use strict";
    t.exports = e.r(947711);
  },
  262799,
  (e, t, r) => {
    "use strict";
    !(function () {
      function t() {}
      function n(e, t) {
        return "font" === e
          ? ""
          : "string" == typeof t
            ? "use-credentials" === t
              ? t
              : ""
            : void 0;
      }
      function o(e) {
        return null === e
          ? "`null`"
          : void 0 === e
            ? "`undefined`"
            : "" === e
              ? "an empty string"
              : 'something with type "' + typeof e + '"';
      }
      function a(e) {
        return null === e
          ? "`null`"
          : void 0 === e
            ? "`undefined`"
            : "" === e
              ? "an empty string"
              : "string" == typeof e
                ? JSON.stringify(e)
                : "number" == typeof e
                  ? "`" + e + "`"
                  : 'something with type "' + typeof e + '"';
      }
      function i() {
        var e = l.H;
        return (
          null === e &&
            console.error(
              "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.",
            ),
          e
        );
      }
      "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" ==
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var s = e.r(789783),
        u = {
          d: {
            f: t,
            r: function () {
              throw Error(
                "Invalid form element. requestFormReset must be passed a form that was rendered by React.",
              );
            },
            D: t,
            C: t,
            L: t,
            m: t,
            X: t,
            S: t,
            M: t,
          },
          p: 0,
          findDOMNode: null,
        },
        c = Symbol.for("react.portal"),
        l = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      (("function" == typeof Map &&
        null != Map.prototype &&
        "function" == typeof Map.prototype.forEach &&
        "function" == typeof Set &&
        null != Set.prototype &&
        "function" == typeof Set.prototype.clear &&
        "function" == typeof Set.prototype.forEach) ||
        console.error(
          "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills",
        ),
        (r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
        (r.createPortal = function (e, t) {
          var r =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null;
          if (!t || (1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType))
            throw Error("Target container is not a DOM element.");
          return (function (e, t, r) {
            var n =
              3 < arguments.length && void 0 !== arguments[3]
                ? arguments[3]
                : null;
            try {
              var o = !1;
            } catch (e) {
              o = !0;
            }
            return (
              o &&
                console.error(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                  ("function" == typeof Symbol &&
                    Symbol.toStringTag &&
                    n[Symbol.toStringTag]) ||
                    n.constructor.name ||
                    "Object",
                ),
              {
                $$typeof: c,
                key: null == n ? null : "" + n,
                children: e,
                containerInfo: t,
                implementation: r,
              }
            );
          })(e, t, null, r);
        }),
        (r.flushSync = function (e) {
          var t = l.T,
            r = u.p;
          try {
            if (((l.T = null), (u.p = 2), e)) return e();
          } finally {
            ((l.T = t),
              (u.p = r),
              u.d.f() &&
                console.error(
                  "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.",
                ));
          }
        }),
        (r.preconnect = function (e, t) {
          ("string" == typeof e && e
            ? null != t && "object" != typeof t
              ? console.error(
                  "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
                  a(t),
                )
              : null != t &&
                "string" != typeof t.crossOrigin &&
                console.error(
                  "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
                  o(t.crossOrigin),
                )
            : console.error(
                "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                o(e),
              ),
            "string" == typeof e &&
              ((t = t
                ? "string" == typeof (t = t.crossOrigin)
                  ? "use-credentials" === t
                    ? t
                    : ""
                  : void 0
                : null),
              u.d.C(e, t)));
        }),
        (r.prefetchDNS = function (e) {
          if ("string" == typeof e && e) {
            if (1 < arguments.length) {
              var t = arguments[1];
              "object" == typeof t && t.hasOwnProperty("crossOrigin")
                ? console.error(
                    "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                    a(t),
                  )
                : console.error(
                    "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                    a(t),
                  );
            }
          } else
            console.error(
              "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
              o(e),
            );
          "string" == typeof e && u.d.D(e);
        }),
        (r.preinit = function (e, t) {
          if (
            ("string" == typeof e && e
              ? null == t || "object" != typeof t
                ? console.error(
                    "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
                    a(t),
                  )
                : "style" !== t.as &&
                  "script" !== t.as &&
                  console.error(
                    'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
                    a(t.as),
                  )
              : console.error(
                  "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                  o(e),
                ),
            "string" == typeof e && t && "string" == typeof t.as)
          ) {
            var r = t.as,
              i = n(r, t.crossOrigin),
              s = "string" == typeof t.integrity ? t.integrity : void 0,
              c = "string" == typeof t.fetchPriority ? t.fetchPriority : void 0;
            "style" === r
              ? u.d.S(
                  e,
                  "string" == typeof t.precedence ? t.precedence : void 0,
                  { crossOrigin: i, integrity: s, fetchPriority: c },
                )
              : "script" === r &&
                u.d.X(e, {
                  crossOrigin: i,
                  integrity: s,
                  fetchPriority: c,
                  nonce: "string" == typeof t.nonce ? t.nonce : void 0,
                });
          }
        }),
        (r.preinitModule = function (e, t) {
          var r = "";
          (("string" == typeof e && e) ||
            (r += " The `href` argument encountered was " + o(e) + "."),
            void 0 !== t && "object" != typeof t
              ? (r += " The `options` argument encountered was " + o(t) + ".")
              : t &&
                "as" in t &&
                "script" !== t.as &&
                (r += " The `as` option encountered was " + a(t.as) + "."),
            r
              ? console.error(
                  "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
                  r,
                )
              : "script" ===
                  (r = t && "string" == typeof t.as ? t.as : "script") ||
                console.error(
                  'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                  (r = a(r)),
                  e,
                ),
            "string" == typeof e &&
              ("object" == typeof t && null !== t
                ? (null == t.as || "script" === t.as) &&
                  ((r = n(t.as, t.crossOrigin)),
                  u.d.M(e, {
                    crossOrigin: r,
                    integrity:
                      "string" == typeof t.integrity ? t.integrity : void 0,
                    nonce: "string" == typeof t.nonce ? t.nonce : void 0,
                  }))
                : null == t && u.d.M(e)));
        }),
        (r.preload = function (e, t) {
          var r = "";
          if (
            (("string" == typeof e && e) ||
              (r += " The `href` argument encountered was " + o(e) + "."),
            null == t || "object" != typeof t
              ? (r += " The `options` argument encountered was " + o(t) + ".")
              : ("string" == typeof t.as && t.as) ||
                (r += " The `as` option encountered was " + o(t.as) + "."),
            r &&
              console.error(
                'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
                r,
              ),
            "string" == typeof e &&
              "object" == typeof t &&
              null !== t &&
              "string" == typeof t.as)
          ) {
            var a = n((r = t.as), t.crossOrigin);
            u.d.L(e, r, {
              crossOrigin: a,
              integrity: "string" == typeof t.integrity ? t.integrity : void 0,
              nonce: "string" == typeof t.nonce ? t.nonce : void 0,
              type: "string" == typeof t.type ? t.type : void 0,
              fetchPriority:
                "string" == typeof t.fetchPriority ? t.fetchPriority : void 0,
              referrerPolicy:
                "string" == typeof t.referrerPolicy ? t.referrerPolicy : void 0,
              imageSrcSet:
                "string" == typeof t.imageSrcSet ? t.imageSrcSet : void 0,
              imageSizes:
                "string" == typeof t.imageSizes ? t.imageSizes : void 0,
              media: "string" == typeof t.media ? t.media : void 0,
            });
          }
        }),
        (r.preloadModule = function (e, t) {
          var r = "";
          (("string" == typeof e && e) ||
            (r += " The `href` argument encountered was " + o(e) + "."),
            void 0 !== t && "object" != typeof t
              ? (r += " The `options` argument encountered was " + o(t) + ".")
              : t &&
                "as" in t &&
                "string" != typeof t.as &&
                (r += " The `as` option encountered was " + o(t.as) + "."),
            r &&
              console.error(
                'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
                r,
              ),
            "string" == typeof e &&
              (t
                ? ((r = n(t.as, t.crossOrigin)),
                  u.d.m(e, {
                    as:
                      "string" == typeof t.as && "script" !== t.as
                        ? t.as
                        : void 0,
                    crossOrigin: r,
                    integrity:
                      "string" == typeof t.integrity ? t.integrity : void 0,
                  }))
                : u.d.m(e)));
        }),
        (r.requestFormReset = function (e) {
          u.d.r(e);
        }),
        (r.unstable_batchedUpdates = function (e, t) {
          return e(t);
        }),
        (r.useFormState = function (e, t, r) {
          return i().useFormState(e, t, r);
        }),
        (r.useFormStatus = function () {
          return i().useHostTransitionStatus();
        }),
        (r.version = "19.3.0-experimental-fb2177c1-20251114"),
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          "function" ==
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error()));
    })();
  },
  546564,
  (e, t, r) => {
    "use strict";
    t.exports = e.r(262799);
  },
]);
