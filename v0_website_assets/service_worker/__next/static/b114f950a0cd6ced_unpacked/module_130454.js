const r = require(903664 /* wakaru:missing */);
function i(e) {
  if (typeof e != "string") {
    throw TypeError(`Path must be a string. Received ${JSON.stringify(e)}`);
  }
}
function a(e, t) {
  for (var n, r = "", i = 0, a = -1, o = 0, s = 0; s <= e.length; ++s) {
    if (s < e.length) {
      n = e.charCodeAt(s);
    } else if (n === 47) {
      break;
    } else {
      n = 47;
    }
    if (n === 47) {
      if (a === s - 1 || o === 1) {
      } else if (a !== s - 1 && o === 2) {
        if (
          r.length < 2 ||
          i !== 2 ||
          r.charCodeAt(r.length - 1) !== 46 ||
          r.charCodeAt(r.length - 2) !== 46
        ) {
          if (r.length > 2) {
            const l = r.lastIndexOf("/");
            if (l !== r.length - 1) {
              if (-1 === l) {
                r = "";
                i = 0;
              } else {
                i = (r = r.slice(0, l)).length - 1 - r.lastIndexOf("/");
              }

              a = s;
              o = 0;
              continue;
            }
          } else if (r.length === 2 || r.length === 1) {
            r = "";
            i = 0;
            a = s;
            o = 0;
            continue;
          }
        }

        if (t) {
          r.length > 0 ? (r += "/..") : (r = "..");
          i = 2;
        }
      } else {
        if (r.length > 0) {
          r += `/${e.slice(a + 1, s)}`;
        } else {
          r = e.slice(a + 1, s);
        }

        i = s - a - 1;
      }
      a = s;
      o = 0;
    } else {
      if (n === 46 && -1 !== o) {
        ++o;
      } else {
        o = -1;
      }
    }
  }
  return r;
}
const o = {
  resolve() {
    for (
      var e, t, n = "", o = false, s = arguments.length - 1;
      s >= -1 && !o;
      s--
    ) {
      if (s >= 0) {
        t = arguments[s];
      } else {
        e === undefined && (e = r.default.cwd());
        t = e;
      }

      i(t);

      if (t.length !== 0) {
        n = `${t}/${n}`;
        o = t.charCodeAt(0) === 47;
      }
    }
    exports = a(exports, !o);

    if (o) {
      if (exports.length > 0) {
        return `/${exports}`;
      } else {
        return "/";
      }
    }

    return exports.length > 0 ? exports : ".";
  },
  normalize(e) {
    i(e);

    if (e.length === 0) {
      return ".";
    }

    const t = e.charCodeAt(0) === 47;
    const n = e.charCodeAt(e.length - 1) === 47;
    return ((e = a(e, !t)).length !== 0 || t || (e = "."),
    e.length > 0 && n && (e += "/"),
    t)
      ? `/${e}`
      : e;
  },
  isAbsolute(e) {
    i(e);
    return e.length > 0 && e.charCodeAt(0) === 47;
  },
  join() {
    if (arguments.length == 0) {
      return ".";
    }
    for (let e, t = 0; t < arguments.length; ++t) {
      const arguments_t = arguments[t];
      i(arguments_t);

      if (arguments_t.length > 0) {
        if (e === undefined) {
          e = arguments_t;
        } else {
          e += `/${arguments_t}`;
        }
      }
    }
    return module === undefined ? "." : o.normalize(module);
  },
  relative(e, t) {
    i(e);
    i(t);

    if (e === t || (e = o.resolve(e)) === (t = o.resolve(t))) {
      return "";
    }

    for (let n = 1; n < e.length && e.charCodeAt(n) === 47; ++n) {}
    for (
      var r = e.length, a = r - exports, s = 1;
      s < t.length && t.charCodeAt(s) === 47;
      ++s
    ) {}
    for (var l = t.length - s, c = a < l ? a : l, d = -1, u = 0; u <= c; ++u) {
      if (u === c) {
        if (l > c) {
          if (t.charCodeAt(s + u) === 47) {
            return t.slice(s + u + 1);
          } else if (u === 0) {
            return t.slice(s + u);
          }
        } else {
          if (a > c) {
            if (e.charCodeAt(exports + u) === 47) {
              d = u;
            } else if (u === 0) {
              d = 0;
            }
          }
        }
        break;
      }
      const p = e.charCodeAt(exports + u);
      if (p !== t.charCodeAt(s + u)) {
        break;
      }

      if (p === 47) {
        d = u;
      }
    }
    let _ = "";
    for (u = exports + d + 1; u <= r; ++u) {
      if (u === r || e.charCodeAt(u) === 47) {
        if (_.length === 0) {
          _ += "..";
        } else {
          _ += "/..";
        }
      }
    }
    return _.length > 0
      ? _ + t.slice(s + d)
      : ((s += d), t.charCodeAt(s) === 47 && ++s, t.slice(s));
  },
  _makeLong(e) {
    return e;
  },
  dirname(e) {
    i(e);

    if (e.length === 0) {
      return ".";
    }

    const n = t === 47;
    for (
      var t = e.charCodeAt(0), r = -1, a = true, o = e.length - 1;
      o >= 1;
      --o
    ) {
      if (47 === (t = e.charCodeAt(o))) {
        if (!a) {
          r = o;
          break;
        }
      } else {
        a = false;
      }
    }
    return -1 === r
      ? exports
        ? "/"
        : "."
      : exports && r === 1
      ? "//"
      : e.slice(0, r);
  },
  basename(e, t) {
    if (t !== undefined && typeof t != "string") {
      throw TypeError('"ext" argument must be a string');
    }
    i(e);
    let n;
    let r = 0;
    let a = -1;
    let o = true;
    if (t !== undefined && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e) {
        return "";
      }
      let s = t.length - 1;
      let l = -1;
      for (n = e.length - 1; n >= 0; --n) {
        const c = e.charCodeAt(n);
        if (c === 47) {
          if (!o) {
            r = n + 1;
            break;
          }
        } else {
          if (-1 === l) {
            o = false;
            l = n + 1;
          }

          if (s >= 0) {
            if (c === t.charCodeAt(s)) {
              if (-1 == --s) {
                a = n;
              }
            } else {
              s = -1;
              a = l;
            }
          }
        }
      }

      if (r === a) {
        a = l;
      } else if (-1 === a) {
        a = e.length;
      }

      return e.slice(r, a);
    }
    for (n = e.length - 1; n >= 0; --n) {
      if (e.charCodeAt(n) === 47) {
        if (!o) {
          r = n + 1;
          break;
        }
      } else {
        if (-1 === a) {
          o = false;
          a = n + 1;
        }
      }
    }
    return -1 === a ? "" : e.slice(r, a);
  },
  extname(e) {
    i(e);
    for (
      var t = -1, n = 0, r = -1, a = true, o = 0, s = e.length - 1;
      s >= 0;
      --s
    ) {
      const l = e.charCodeAt(s);
      if (l === 47) {
        if (!a) {
          n = s + 1;
          break;
        }
        continue;
      }

      if (-1 === r) {
        a = false;
        r = s + 1;
      }

      if (l === 46) {
        if (-1 === t) {
          t = s;
        } else if (o !== 1) {
          o = 1;
        }
      } else if (-1 !== t) {
        o = -1;
      }
    }
    return -1 === __unused ||
      -1 === r ||
      o === 0 ||
      (o === 1 && __unused === r - 1 && __unused === exports + 1)
      ? ""
      : e.slice(__unused, r);
  },
  format(e) {
    let t;
    let n;
    if (e === null || typeof e != "object") {
      throw TypeError(
        `The "pathObject" argument must be of type Object. Received type ${typeof e}`
      );
    }
    t = e.dir || e.root;
    n = e.base || (e.name || "") + (e.ext || "");
    return t ? (t === e.root ? t + n : `${t}/${n}`) : n;
  },
  parse(e) {
    i(e);
    let t;
    const n = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0) {
      return n;
    }
    let r = e.charCodeAt(0);
    const a = r === 47;

    if (a) {
      n.root = "/";
      t = 1;
    } else {
      t = 0;
    }

    for (
      var o = -1, s = 0, l = -1, c = true, d = e.length - 1, u = 0;
      d >= t;
      --d
    ) {
      if (47 === (r = e.charCodeAt(d))) {
        if (!c) {
          s = d + 1;
          break;
        }
        continue;
      }

      if (-1 === l) {
        c = false;
        l = d + 1;
      }

      if (r === 46) {
        if (-1 === o) {
          o = d;
        } else if (u !== 1) {
          u = 1;
        }
      } else if (-1 !== o) {
        u = -1;
      }
    }

    if (
      -1 === o ||
      -1 === l ||
      u === 0 ||
      (u === 1 && o === l - 1 && o === s + 1)
    ) {
      if (-1 !== l) {
        if (s === 0 && a) {
          n.base = n.name = e.slice(1, l);
        } else {
          n.base = n.name = e.slice(s, l);
        }
      }
    } else {
      s === 0 && a
        ? ((n.name = e.slice(1, o)), (n.base = e.slice(1, l)))
        : ((n.name = e.slice(s, o)), (n.base = e.slice(s, l)));

      n.ext = e.slice(o, l);
    }

    if (s > 0) {
      n.dir = e.slice(0, s - 1);
    } else if (a) {
      n.dir = "/";
    }

    return n;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null,
};
o.posix = o;
__unused.exports = o;
