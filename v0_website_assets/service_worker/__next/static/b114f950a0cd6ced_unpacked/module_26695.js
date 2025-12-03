!(() => {
  function t(e) {
    if (e == null) {
      return null;
    }
    if (typeof e == "function") {
      return e.$$typeof === C ? null : e.displayName || e.name || null;
    }
    if (typeof e == "string") {
      return e;
    }
    switch (e) {
      case _: {
        return "Fragment";
      }
      case m: {
        return "Profiler";
      }
      case f: {
        return "StrictMode";
      }
      case b: {
        return "Suspense";
      }
      case x: {
        return "SuspenseList";
      }
      case T: {
        return "Activity";
      }
      case E: {
        return "ViewTransition";
      }
    }
    if (typeof e == "object") {
      if (typeof e.tag == "number") {
        console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        );
      }

      switch (e.$$typeof) {
        case p: {
          return "Portal";
        }
        case g: {
          return e.displayName || "Context";
        }
        case h: {
          return `${e._context.displayName || "Context"}.Consumer`;
        }
        case y: {
          var e_render = e.render;

          if (!(e = e.displayName)) {
            e =
              "" !== (e = e_render.displayName || e_render.name || "")
                ? `ForwardRef(${e})`
                : "ForwardRef";
          }

          return e;
        }
        case S: {
          return null !== (n = e.displayName || null) ? n : t(e.type) || "Memo";
        }
        case k: {
          n = e._payload;
          e = e._init;
          try {
            return t(e(n));
          } catch (e) {}
        }
      }
    }
    return null;
  }
  function r(e) {
    try {
      var t = false;
    } catch (e) {
      t = true;
    }
    if (t) {
      const n = (t = console).error;

      const r =
        (typeof Symbol == "function" &&
          Symbol.toStringTag &&
          e[Symbol.toStringTag]) ||
        e.constructor.name ||
        "Object";

      n.call(
        t,
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        r
      );

      return `${e}`;
    }
  }
  function i(e) {
    if (e === _) {
      return "<>";
    }
    if (typeof e == "object" && e !== null && e.$$typeof === k) {
      return "<...>";
    }
    try {
      const n = t(e);
      return n ? `<${n}>` : "<...>";
    } catch (e) {
      return "<...>";
    }
  }
  function a() {
    return Error("react-stack-top-frame");
  }
  function o() {
    let e = t(this.type);

    if (!I[e]) {
      I[e] = true;

      console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      );
    }

    return undefined !== (e = this.props.ref) ? e : null;
  }
  function s(e) {
    if (l(e)) {
      if (e._store) {
        e._store.validated = 1;
      }
    } else if (typeof e == "object" && e !== null && e.$$typeof === k) {
      if (e._payload.status === "fulfilled") {
        if (l(e._payload.value) && e._payload.value._store) {
          e._payload.value._store.validated = 1;
        }
      } else if (e._store) {
        e._store.validated = 1;
      }
    }
  }
  function l(e) {
    return typeof e == "object" && e !== null && e.$$typeof === u;
  }
  let d = require(789783 /* wakaru:missing */);
  var u = Symbol.for("react.transitional.element");
  var p = Symbol.for("react.portal");
  var _ = Symbol.for("react.fragment");
  var f = Symbol.for("react.strict_mode");
  var m = Symbol.for("react.profiler");
  var h = Symbol.for("react.consumer");
  var g = Symbol.for("react.context");
  var y = Symbol.for("react.forward_ref");
  var b = Symbol.for("react.suspense");
  var x = Symbol.for("react.suspense_list");
  var S = Symbol.for("react.memo");
  var k = Symbol.for("react.lazy");
  var T = Symbol.for("react.activity");
  var E = Symbol.for("react.view_transition");
  var C = Symbol.for("react.client.reference");
  const d_CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
    d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  const w = Object.prototype.hasOwnProperty;
  const Array_isArray = Array.isArray;

  const N = console.createTask ? console.createTask : () => null;

  var I = {};

  const P = (d = {
    react_stack_bottom_frame(e) {
      return e();
    },
  }).react_stack_bottom_frame.bind(d, a)();

  const M = N(i(a));
  const L = {};
  exports.Fragment = _;

  exports.jsxDEV = (e, n, a, l) => {
    const d =
      10000 /* 1e4 */ >
      d_CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.recentlyCreatedOwnerStacks++;
    if (d) {
      const Error_stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 10;
      var _ = Error("react-stack-top-frame");
      Error.stackTraceLimit = Error_stackTraceLimit;
    } else {
      _ = P;
    }
    return ((e, n, i, a, l, d) => {
      let p;
      let _;
      let f;
      let m;
      let h;
      let g;
      let n_children = n.children;
      if (n_children !== undefined) {
        if (a) {
          if (Array_isArray(n_children)) {
            for (a = 0; a < n_children.length; a++) {
              s(n_children[a]);
            }

            if (Object.freeze) {
              Object.freeze(n_children);
            }
          } else {
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
          }
        } else {
          s(n_children);
        }
      }
      if (w.call(n, "key")) {
        n_children = t(e);

        if (
          !L[
            n_children +
              (a =
                b.length > 0
                  ? `{key: someKey, ${b.join(": ..., ")}: ...}`
                  : "{key: someKey}")
          ]
        ) {
          console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            a,
            n_children,
            (b = b.length > 0 ? `{${b.join(": ..., ")}: ...}` : "{}"),
            n_children
          );

          L[n_children + a] = true;
        }
      }
      n_children = null;

      if (i !== undefined) {
        r(i);
        n_children = `${i}`;
      }

      if (
        ((e) => {
          if (w.call(e, "key")) {
            const t = Object.getOwnPropertyDescriptor(e, "key").get;
            if (t && t.isReactWarning) {
              return false;
            }
          }
          return e.key !== undefined;
        })(n)
      ) {
        r(n.key);
        n_children = `${n.key}`;
      }

      if ("key" in n) {
        i = {};

        for (const x in n) {
          if (x !== "key") {
            i[x] = n[x];
          }
        }
      } else {
        i = n;
      }

      if (n_children) {
        ((e, t) => {
          function n() {
            if (!c) {
              c = true;

              console.error(
                "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                t
              );
            }
          }
          n.isReactWarning = true;

          Object.defineProperty(e, "key", {
            get: n,
            configurable: true,
          });
        })(
          i,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        );
      }

      _ = e;
      f = n_children;
      m = i;
      h =
        null ===
        (p = d_CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A)
          ? null
          : p.getOwner();
      g = m.ref;
      _ = { $$typeof: u, type: _, key: f, props: m, _owner: h };

      if (null !== (g !== undefined ? g : null)) {
        Object.defineProperty(_, "ref", { enumerable: false, get: o });
      } else {
        Object.defineProperty(_, "ref", {
          enumerable: false,
          value: null,
        });
      }

      _._store = {};

      Object.defineProperty(_._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0,
      });

      Object.defineProperty(_, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null,
      });

      Object.defineProperty(_, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: l,
      });

      Object.defineProperty(_, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: d,
      });

      if (Object.freeze) {
        Object.freeze(_.props);
        Object.freeze(_);
      }

      return _;
    })(e, n, a, l, _, d ? N(i(e)) : M);
  };
})();
