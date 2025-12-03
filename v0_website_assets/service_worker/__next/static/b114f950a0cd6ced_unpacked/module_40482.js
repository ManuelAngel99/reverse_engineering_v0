"use strict";;
import o from "module-837673.js";
import s from "module-832626.js";
import A from "module-832626.js";
import l from "module-327634.js";
import w from "module-327634.js";
import c from "module-17462.js";
import D from "module-17462.js";
var r = require(903664/* wakaru:missing */);

var i =
  (module.e && module.e.__importDefault) ||
  function (e) {
    return e && e.__esModule ? e : { default: e };
  };

Object.defineProperty(exports, "__esModule", { value: !0 });
const unescape_1 = void 0;
export { unescape_1 as unescape };
const escape_1 = void 0;
export { escape_1 as escape };
const AST_1 = void 0;
export { AST_1 as AST };
let a = i(require("module-935314.js"));

export const minimatch = (e, t, n = {}) => {
  (0, o.assertValidPattern)(t);
  return (!!n.nocomment || "#" !== t.charAt(0)) && new C(t, n).match(e);
};

let d = /^\*+([^+@!?\*\[\(]*)$/;
let u = /^\*+\.\*+$/;

let p = e => {
  return !e.startsWith(".") && e.includes(".");
};

let _ = e => {
  return "." !== e && ".." !== e && e.includes(".");
};

let f = /^\.\*+$/;

let m = e => {
  return "." !== e && ".." !== e && e.startsWith(".");
};

let h = /^\*+$/;

let g = e => {
  return 0 !== e.length && !e.startsWith(".");
};

let y = e => {
  return 0 !== e.length && "." !== e && ".." !== e;
};

let b = /^\?+([^+@!?\*\[\(]*)?$/;

let x = ([e]) => {
  let t = e.length;
  return e => {
    return e.length === t && !e.startsWith(".");
  };
};

let S = ([e]) => {
  let t = e.length;
  return e => {
    return e.length === t && "." !== e && ".." !== e;
  };
};

let k =
  "object" == typeof r.default && r.default
    ? ("object" == typeof r.default.env &&
        r.default.env &&
        r.default.env.__MINIMATCH_TESTING_PLATFORM__) ||
      r.default.platform
    : "posix";

export const sep = "win32" === k ? "\\" : "/";
(exports.minimatch.sep = exports.sep);
export const GLOBSTAR = Symbol("globstar **");
(exports.minimatch.GLOBSTAR = exports.GLOBSTAR);

export const filter = (e, t = {}) => {
  return r => {
    return (0, exports.minimatch)(r, e, t);
  };
};

(exports.minimatch.filter = exports.filter);
let T = (e, t = {}) => {
  return Object.assign({}, e, t);
};

export const defaults = (e) => {
  if (!e || "object" != typeof e || !Object.keys(e).length) {
    return exports.minimatch;
  }
  let t = exports.minimatch;
  return Object.assign((n, r, i = {}) => {
    return t(n, r, T(e, i));
  }, {
    Minimatch: class extends t.Minimatch {
      constructor(t, n = {}) {
        super(t, T(e, n));
      }
      static defaults(n) {
        return t.defaults(T(e, n)).Minimatch;
      }
    },
    AST: class extends t.AST {
      constructor(t, n, r = {}) {
        super(t, n, T(e, r));
      }
      static fromGlob(n, r = {}) {
        return t.AST.fromGlob(n, T(e, r));
      }
    },
    unescape: (n, r = {}) => {
      return t.unescape(n, T(e, r));
    },
    escape: (n, r = {}) => {
      return t.escape(n, T(e, r));
    },
    filter: (n, r = {}) => {
      return t.filter(n, T(e, r));
    },
    defaults: n => {
      return t.defaults(T(e, n));
    },
    makeRe: (n, r = {}) => {
      return t.makeRe(n, T(e, r));
    },
    braceExpand: (n, r = {}) => {
      return t.braceExpand(n, T(e, r));
    },
    match: (n, r, i = {}) => {
      return t.match(n, r, T(e, i));
    },
    sep: t.sep,
    GLOBSTAR: exports.GLOBSTAR,
  });
};

(exports.minimatch.defaults = exports.defaults);

export const braceExpand = (e, t = {}) => {
  return ((0, o.assertValidPattern)(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e))
    ? [e]
    : (0, a.default)(e);
};

(exports.minimatch.braceExpand = exports.braceExpand);

export const makeRe = (e, t = {}) => {
  return new C(e, t).makeRe();
};

(exports.minimatch.makeRe = exports.makeRe);

export const match = (e, t, n = {}) => {
  let r = new C(t, n);

  (e = e.filter(e => {
    return r.match(e);
  }));

  r.options.nonull && !e.length && e.push(t);
  return e;
};

(exports.minimatch.match = exports.match);
let E = /[?*]|[+@!]\(.*?\)|\[|\]/;
class C {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(e, t = {}) {
    (0, o.assertValidPattern)(e);
    (t = t || {});
    (this.options = t);
    (this.pattern = e);
    (this.platform = t.platform || k);
    (this.isWindows = "win32" === this.platform);
    (this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || !1 === t.allowWindowsEscape);

    this.windowsPathsNoEscape &&
      (this.pattern = this.pattern.replace(/\\/g, "/"));

    (this.preserveMultipleSlashes = !!t.preserveMultipleSlashes);
    (this.regexp = null);
    (this.negate = !1);
    (this.nonegate = !!t.nonegate);
    (this.comment = !1);
    (this.empty = !1);
    (this.partial = !!t.partial);
    (this.nocase = !!this.options.nocase);

    (this.windowsNoMagicRoot = void 0 !== t.windowsNoMagicRoot
      ? t.windowsNoMagicRoot
      : !!(this.isWindows && this.nocase));

    (this.globSet = []);
    (this.globParts = []);
    (this.set = []);
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return !0;
    }
    for (let e of this.set) {
      for (let t of e) {
        if ("string" != typeof t) {
          return !0;
        }
      }
    }
    return !1;
  }
  debug() {}
  make() {
    let e = this.pattern;
    let t = this.options;
    if (!t.nocomment && "#" === e.charAt(0)) {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    this.parseNegate();
    (this.globSet = [...new Set(this.braceExpand())]);

    t.debug && (this.debug = (...e) => {
      return console.error(...e);
    });

    this.debug(this.pattern, this.globSet);
    let n = this.globSet.map(e => {
      return this.slashSplit(e);
    });
    (this.globParts = this.preprocess(n));
    this.debug(this.pattern, this.globParts);
    let r = this.globParts.map((e, t, n) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let t =
            "" === e[0] &&
            "" === e[1] &&
            ("?" === e[2] || !E.test(e[2])) &&
            !E.test(e[3]);

        let n = /^[a-z]:/i.test(e[0]);
        if (t) {
          return [...e.slice(0, 4), ...e.slice(4).map(e => {
            return this.parse(e);
          })];
        }
        if (n) {
          return [e[0], ...e.slice(1).map(e => {
            return this.parse(e);
          })];
        }
      }
      return e.map(e => {
        return this.parse(e);
      });
    });
    this.debug(this.pattern, r);

    (this.set = r.filter(e => {
      return -1 === e.indexOf(!1);
    }));

    if (this.isWindows) {
      for (let e = 0; e < this.set.length; e++) {
        let t = this.set[e];
        "" === t[0] &&
          "" === t[1] &&
          "?" === this.globParts[e][2] &&
          "string" == typeof t[3] &&
          /^[a-z]:$/i.test(t[3]) &&
          (t[2] = "?");
      }
    }

    this.debug(this.pattern, this.set);
  }
  preprocess(e) {
    if (this.options.noglobstar) {
      for (let t = 0; t < e.length; t++) {
        for (let n = 0; n < e[t].length; n++) {
          "**" === e[t][n] && (e[t][n] = "*");
        }
      }
    }
    let { optimizationLevel: t = 1 } = this.options;

    t >= 2
      ? ((e = this.firstPhasePreProcess(e)),
        (e = this.secondPhasePreProcess(e)))
      : (e =
          t >= 1
            ? this.levelOneOptimize(e)
            : this.adjascentGlobstarOptimize(e));

    return e;
  }
  adjascentGlobstarOptimize(e) {
    return e.map((e) => {
      let t = -1;
      for (; -1 !== (t = e.indexOf("**", t + 1)); ) {
        let n = t;
        for (; "**" === e[n + 1]; ) {
          n++;
        }
        n !== t && e.splice(t, n - t);
      }
      return e;
    });
  }
  levelOneOptimize(e) {
    return e.map(e => {
      return 0 ===
      (e = e.reduce((e, t) => {
        let n = e[e.length - 1];

        ("**" === t && "**" === n) ||
          (".." === t && n && ".." !== n && "." !== n && "**" !== n
            ? e.pop()
            : e.push(t));

        return e;
      }, [])).length
        ? [""]
        : e;
    }
    );
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let t = !1;
    do {
      (t = !1);

      if (!this.preserveMultipleSlashes) {
        for (let n = 1; n < e.length - 1; n++) {
          let r = e[n];
          (1 !== n || "" !== r || "" !== e[0]) &&
            ("." === r || "" === r) &&
            ((t = !0), e.splice(n, 1), n--);
        }
        "." === e[0] &&
          2 === e.length &&
          ("." === e[1] || "" === e[1]) &&
          ((t = !0), e.pop());
      }

      let n = 0;
      for (; -1 !== (n = e.indexOf("..", n + 1)); ) {
        let r = e[n - 1];
        r &&
          "." !== r &&
          ".." !== r &&
          "**" !== r &&
          ((t = !0), e.splice(n - 1, 2), (n -= 2));
      }
    } while (t);
    return 0 === e.length ? [""] : e;
  }
  firstPhasePreProcess(e) {
    let t = !1;
    do {
      (t = !1);

      for (let n of e) {
        let r = -1;
        for (; -1 !== (r = n.indexOf("**", r + 1)); ) {
          let i = r;
          for (; "**" === n[i + 1]; ) {
            i++;
          }
          i > r && n.splice(r + 1, i - r);
          let a = n[r + 1];
          let o = n[r + 2];
          let s = n[r + 3];
          if (".." !== a ||
          !o ||
          "." === o ||
          ".." === o ||
          !s ||
          "." === s ||
          ".." === s) {
            continue;
          }
          (t = !0);
          n.splice(r, 1);
          let l = n.slice(0);
          (l[r] = "**");
          e.push(l);
          r--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let e = 1; e < n.length - 1; e++) {
            let r = n[e];
            (1 !== e || "" !== r || "" !== n[0]) &&
              ("." === r || "" === r) &&
              ((t = !0), n.splice(e, 1), e--);
          }
          "." === n[0] &&
            2 === n.length &&
            ("." === n[1] || "" === n[1]) &&
            ((t = !0), n.pop());
        }
        let i = 0;
        for (; -1 !== (i = n.indexOf("..", i + 1)); ) {
          let e = n[i - 1];
          if (e && "." !== e && ".." !== e && "**" !== e) {
            t = !0;
            let e = 1 === i && "**" === n[i + 1] ? ["."] : [];
            n.splice(i - 1, 2, ...e);
            0 === n.length && n.push("");
            (i -= 2);
          }
        }
      }
    } while (t);
    return e;
  }
  secondPhasePreProcess(e) {
    for (let t = 0; t < e.length - 1; t++) {
      for (let n = t + 1; n < e.length; n++) {
        let r = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
        if (r) {
          (e[t] = []);
          (e[n] = r);
          break;
        }
      }
    }
    return e.filter(e => {
      return e.length;
    });
  }
  partsMatch(e, t, n = !1) {
    let r = 0;
    let i = 0;
    let a = [];
    let o = "";
    for (; r < e.length && i < t.length; ) {
      if (e[r] === t[i]) {
        a.push("b" === o ? t[i] : e[r]);
        r++;
        i++;
      } else if (n && "**" === e[r] && t[i] === e[r + 1]) {
        a.push(e[r]);
        r++;
      } else if (n && "**" === t[i] && e[r] === t[i + 1]) {
        a.push(t[i]);
        i++;
      } else if (
        "*" === e[r] &&
        t[i] &&
        (this.options.dot || !t[i].startsWith(".")) &&
        "**" !== t[i]
      ) {
        if ("b" === o) {
          return !1;
        }
        (o = "a");
        a.push(e[r]);
        r++;
        i++;
      } else {
        if ("*" !== t[i] ||
        !e[r] ||
        (!this.options.dot && e[r].startsWith(".")) ||
        "**" === e[r] ||
        "a" === o) {
          return !1;
        }
        (o = "b");
        a.push(t[i]);
        r++;
        i++;
      }
    }
    return e.length === t.length && a;
  }
  parseNegate() {
    if (this.nonegate) {
      return;
    }
    let e = this.pattern;
    let t = !1;
    let n = 0;
    for (let r = 0; r < e.length && "!" === e.charAt(r); r++) {
      (t = !t);
      n++;
    }
    n && (this.pattern = e.slice(n));
    (this.negate = t);
  }
  matchOne(e, t, r = !1) {
    let i = this.options;
    if (this.isWindows) {
      let n = "string" == typeof e[0] && /^[a-z]:$/i.test(e[0]);

      let r =
        !n &&
        "" === e[0] &&
        "" === e[1] &&
        "?" === e[2] &&
        /^[a-z]:$/i.test(e[3]);

      let i = "string" == typeof t[0] && /^[a-z]:$/i.test(t[0]);

      let a =
        !i &&
        "" === t[0] &&
        "" === t[1] &&
        "?" === t[2] &&
        "string" == typeof t[3] &&
        /^[a-z]:$/i.test(t[3]);

      let o = r ? 3 : n ? 0 : void 0;
      let s = a ? 3 : i ? 0 : void 0;
      if ("number" == typeof o && "number" == typeof s) {
        let [n, r] = [e[o], t[s]];
        n.toLowerCase() === r.toLowerCase() &&
          ((t[s] = n), s > o ? (t = t.slice(s)) : o > s && (e = e.slice(o)));
      }
    }
    let { optimizationLevel: a = 1 } = this.options;
    a >= 2 && (e = this.levelTwoFileOptimize(e));
    this.debug("matchOne", this, { file: e, pattern: t });
    this.debug("matchOne", e.length, t.length);
    for (
      var o = 0, s = 0, l = e.length, c = t.length;
      o < l && s < c;
      o++, s++
    ) {
      let a;
      this.debug("matchOne loop");
      var d = t[s];
      var u = e[o];
      this.debug(t, d, u);

      if (!1 === d) {
        return !1;
      }

      if (d === exports.GLOBSTAR) {
        this.debug("GLOBSTAR", [t, d, u]);
        var p = o;
        var _ = s + 1;
        if (_ === c) {
          for (this.debug("** at the end"); o < l; o++) {
            if ("." === e[o] ||
            ".." === e[o] ||
            (!i.dot && "." === e[o].charAt(0))) {
              return !1;
            }
          }
          return !0;
        }
        for (; p < l; ) {
          var f = e[p];
          this.debug("\nglobstar while", e, p, t, _, f);

          if (this.matchOne(e.slice(p), t.slice(_), r)) {
            this.debug("globstar found match!", p, l, f);
            return !0;
          }

          if ("." === f || ".." === f || (!i.dot && "." === f.charAt(0))) {
            this.debug("dot detected!", e, p, t, _);
            break;
          }
          this.debug("globstar swallow a segment, and continue");
          p++;
        }
        if (r && (this.debug("\n>>> no match, partial?", e, p, t, _), p === l)) {
          return !0;
        }
        return !1;
      }

      "string" == typeof d
          ? ((a = u === d), this.debug("string match", d, u, a))
          : ((a = d.test(u)), this.debug("pattern match", d, u, a));

      if (!a) {
        return !1;
      }
    }
    if (o === l && s === c) {
      return !0;
    }
    if (o === l) {
      return r;
    }
    if (s === c) {
      return o === l - 1 && "" === e[o];
    }
    throw Error("wtf?");
  }
  braceExpand() {
    return (0, exports.braceExpand)(this.pattern, this.options);
  }
  parse(e) {
    let t;
    (0, o.assertValidPattern)(e);
    let r = this.options;
    if ("**" === e) {
      return exports.GLOBSTAR;
    }
    if ("" === e) {
      return "";
    }
    let i = null;
    (t = e.match(h))
      ? (i = r.dot ? y : g)
      : (t = e.match(d))
      ? (i = (
          r.nocase
            ? r.dot
              ? e => {
            (e = e.toLowerCase());

            return t => {
              return t.toLowerCase().endsWith(e);
            };
          }
              : e => {
            (e = e.toLowerCase());

            return t => {
              return !t.startsWith(".") && t.toLowerCase().endsWith(e);
            };
          }
            : r.dot
            ? e => {
            return t => {
              return t.endsWith(e);
            };
          }
            : e => {
            return t => {
              return !t.startsWith(".") && t.endsWith(e);
            };
          }
        )(t[1]))
      : (t = e.match(b))
      ? (i = (
          r.nocase
            ? r.dot
              ? ([e, t = ""]) => {
                  let n = S([e]);
                  return t
                    ? ((t = t.toLowerCase()),
                      e => {
                        return n(e) && e.toLowerCase().endsWith(t);
                      })
                    : n;
                }
              : ([e, t = ""]) => {
                  let n = x([e]);
                  return t
                    ? ((t = t.toLowerCase()),
                      e => {
                        return n(e) && e.toLowerCase().endsWith(t);
                      })
                    : n;
                }
            : r.dot
            ? ([e, t = ""]) => {
                let n = S([e]);
                return t ? e => {
                  return n(e) && e.endsWith(t);
                } : n;
              }
            : ([e, t = ""]) => {
                let n = x([e]);
                return t ? e => {
                  return n(e) && e.endsWith(t);
                } : n;
              }
        )(t))
      : (t = e.match(u))
      ? (i = r.dot ? _ : p)
      : (t = e.match(f)) && (i = m);
    let a = s.AST.fromGlob(e, this.options).toMMPattern();

    i &&
      "object" == typeof a &&
      Reflect.defineProperty(a, "test", { value: i });

    return a;
  }
  makeRe() {
    if (this.regexp || !1 === this.regexp) {
      return this.regexp;
    }
    let e = this.set;
    if (!e.length) {
      (this.regexp = !1);
      return this.regexp;
    }
    let t = this.options;

    let r = t.noglobstar
      ? "[^/]*?"
      : t.dot
      ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?"
      : "(?:(?!(?:\\/|^)\\.).)*?";

    let i = new Set(t.nocase ? ["i"] : []);

    let a = e
      .map((e) => {
      let t = e.map((e) => {
        if (e instanceof RegExp) {
          for (let t of e.flags.split("")) {
            i.add(t);
          }
        }
        return "string" == typeof e
          ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
          : e === exports.GLOBSTAR
          ? exports.GLOBSTAR
          : e._src;
      });

      t.forEach((e, i) => {
        let a = t[i + 1];
        let o = t[i - 1];
        e === exports.GLOBSTAR &&
          o !== exports.GLOBSTAR &&
          (void 0 === o
            ? void 0 !== a && a !== exports.GLOBSTAR
              ? (t[i + 1] = "(?:\\/|" + r + "\\/)?" + a)
              : (t[i] = r)
            : void 0 === a
            ? (t[i - 1] = o + "(?:\\/|" + r + ")?")
            : a !== exports.GLOBSTAR &&
              ((t[i - 1] = o + "(?:\\/|\\/" + r + "\\/)" + a),
              (t[i + 1] = exports.GLOBSTAR)));
      });

      return t.filter(e => {
        return e !== exports.GLOBSTAR;
      }).join("/");
    })
      .join("|");

    let [o, s] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    (a = "^" + o + a + s + "$");
    this.negate && (a = "^(?!" + a + ").+$");
    try {
      this.regexp = new RegExp(a, [...i].join(""));
    } catch (e) {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes
      ? e.split("/")
      : this.isWindows && /^\/\/[^\/]+/.test(e)
      ? ["", ...e.split(/\/+/)]
      : e.split(/\/+/);
  }
  match(e, t = this.partial) {
    this.debug("match", e, this.pattern);

    if (this.comment) {
      return !1;
    }

    if (this.empty) {
      return "" === e;
    }
    if ("/" === e && t) {
      return !0;
    }
    let n = this.options;
    this.isWindows && (e = e.split("\\").join("/"));
    let r = this.slashSplit(e);
    this.debug(this.pattern, "split", r);
    let i = this.set;
    this.debug(this.pattern, "set", i);
    let a = r[r.length - 1];
    if (!a) {
      for (let e = r.length - 2; !a && e >= 0; e--) {
        a = r[e];
      }
    }
    for (let e = 0; e < i.length; e++) {
      let o = i[e];
      let s = r;
      n.matchBase && 1 === o.length && (s = [a]);

      if (this.matchOne(s, o, t)) {
        if (n.flipNegate) {
          return !0;
        }
        return !this.negate;
      }
    }
    return !n.flipNegate && this.negate;
  }
  static defaults(e) {
    return exports.minimatch.defaults(e).Minimatch;
  }
}
export const Minimatch = C;

Object.defineProperty(exports, "unescape", {
  enumerable: !0,
  get: function () {
    return D.unescape;
  },
});

(exports.minimatch.AST = s.AST);
(exports.minimatch.Minimatch = C);
(exports.minimatch.escape = l.escape);
(exports.minimatch.unescape = c.unescape);
export const AST = A.AST;
export const escape = w.escape;
export const unescape = D.unescape;
