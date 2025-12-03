(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  163060,
  (e, t, n) => {
    (window,
      (t.exports = (function () {
        var e = [
            function (e, t, n) {
              "use strict";
              var r,
                s =
                  (this && this.__extends) ||
                  ((r = function (e, t) {
                    return (r =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (r(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  });
              Object.defineProperty(t, "__esModule", { value: !0 });
              var i = (function () {
                function e(e) {
                  (void 0 === e && (e = "="), (this._paddingCharacter = e));
                }
                return (
                  (e.prototype.encodedLength = function (e) {
                    return this._paddingCharacter
                      ? (((e + 2) / 3) * 4) | 0
                      : ((8 * e + 5) / 6) | 0;
                  }),
                  (e.prototype.encode = function (e) {
                    for (var t = "", n = 0; n < e.length - 2; n += 3) {
                      var r = (e[n] << 16) | (e[n + 1] << 8) | e[n + 2];
                      ((t += this._encodeByte((r >>> 18) & 63)),
                        (t += this._encodeByte((r >>> 12) & 63)),
                        (t += this._encodeByte((r >>> 6) & 63)),
                        (t += this._encodeByte((r >>> 0) & 63)));
                    }
                    var s = e.length - n;
                    if (s > 0) {
                      var r = (e[n] << 16) | (2 === s ? e[n + 1] << 8 : 0);
                      ((t += this._encodeByte((r >>> 18) & 63)),
                        (t += this._encodeByte((r >>> 12) & 63)),
                        2 === s
                          ? (t += this._encodeByte((r >>> 6) & 63))
                          : (t += this._paddingCharacter || ""),
                        (t += this._paddingCharacter || ""));
                    }
                    return t;
                  }),
                  (e.prototype.maxDecodedLength = function (e) {
                    return this._paddingCharacter
                      ? ((e / 4) * 3) | 0
                      : ((6 * e + 7) / 8) | 0;
                  }),
                  (e.prototype.decodedLength = function (e) {
                    return this.maxDecodedLength(
                      e.length - this._getPaddingLength(e),
                    );
                  }),
                  (e.prototype.decode = function (e) {
                    if (0 === e.length) return new Uint8Array(0);
                    for (
                      var t = this._getPaddingLength(e),
                        n = e.length - t,
                        r = new Uint8Array(this.maxDecodedLength(n)),
                        s = 0,
                        i = 0,
                        a = 0,
                        l = 0,
                        o = 0,
                        c = 0,
                        d = 0;
                      i < n - 4;
                      i += 4
                    )
                      ((l = this._decodeChar(e.charCodeAt(i + 0))),
                        (o = this._decodeChar(e.charCodeAt(i + 1))),
                        (c = this._decodeChar(e.charCodeAt(i + 2))),
                        (d = this._decodeChar(e.charCodeAt(i + 3))),
                        (r[s++] = (l << 2) | (o >>> 4)),
                        (r[s++] = (o << 4) | (c >>> 2)),
                        (r[s++] = (c << 6) | d),
                        (a |= 256 & l),
                        (a |= 256 & o),
                        (a |= 256 & c),
                        (a |= 256 & d));
                    if (
                      (i < n - 1 &&
                        ((l = this._decodeChar(e.charCodeAt(i))),
                        (o = this._decodeChar(e.charCodeAt(i + 1))),
                        (r[s++] = (l << 2) | (o >>> 4)),
                        (a |= 256 & l),
                        (a |= 256 & o)),
                      i < n - 2 &&
                        ((c = this._decodeChar(e.charCodeAt(i + 2))),
                        (r[s++] = (o << 4) | (c >>> 2)),
                        (a |= 256 & c)),
                      i < n - 3 &&
                        ((d = this._decodeChar(e.charCodeAt(i + 3))),
                        (r[s++] = (c << 6) | d),
                        (a |= 256 & d)),
                      0 !== a)
                    )
                      throw Error(
                        "Base64Coder: incorrect characters for decoding",
                      );
                    return r;
                  }),
                  (e.prototype._encodeByte = function (e) {
                    var t = e;
                    return (
                      (t += 65),
                      (t += ((25 - e) >>> 8) & 6),
                      (t += ((51 - e) >>> 8) & -75),
                      (t += ((61 - e) >>> 8) & -15),
                      String.fromCharCode((t += ((62 - e) >>> 8) & 3))
                    );
                  }),
                  (e.prototype._decodeChar = function (e) {
                    return (
                      256 +
                      ((((42 - e) & (e - 44)) >>> 8) & (-256 + e - 43 + 62)) +
                      ((((46 - e) & (e - 48)) >>> 8) & (-256 + e - 47 + 63)) +
                      ((((47 - e) & (e - 58)) >>> 8) & (-256 + e - 48 + 52)) +
                      ((((64 - e) & (e - 91)) >>> 8) & (-256 + e - 65 + 0)) +
                      ((((96 - e) & (e - 123)) >>> 8) & (-256 + e - 97 + 26))
                    );
                  }),
                  (e.prototype._getPaddingLength = function (e) {
                    var t = 0;
                    if (this._paddingCharacter) {
                      for (
                        var n = e.length - 1;
                        n >= 0 && e[n] === this._paddingCharacter;
                        n--
                      )
                        t++;
                      if (e.length < 4 || t > 2)
                        throw Error("Base64Coder: incorrect padding");
                    }
                    return t;
                  }),
                  e
                );
              })();
              t.Coder = i;
              var a = new i();
              ((t.encode = function (e) {
                return a.encode(e);
              }),
                (t.decode = function (e) {
                  return a.decode(e);
                }));
              var l = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  s(t, e),
                  (t.prototype._encodeByte = function (e) {
                    var t = e;
                    return (
                      (t += 65),
                      (t += ((25 - e) >>> 8) & 6),
                      (t += ((51 - e) >>> 8) & -75),
                      (t += ((61 - e) >>> 8) & -13),
                      String.fromCharCode((t += ((62 - e) >>> 8) & 49))
                    );
                  }),
                  (t.prototype._decodeChar = function (e) {
                    return (
                      256 +
                      ((((44 - e) & (e - 46)) >>> 8) & (-256 + e - 45 + 62)) +
                      ((((94 - e) & (e - 96)) >>> 8) & (-256 + e - 95 + 63)) +
                      ((((47 - e) & (e - 58)) >>> 8) & (-256 + e - 48 + 52)) +
                      ((((64 - e) & (e - 91)) >>> 8) & (-256 + e - 65 + 0)) +
                      ((((96 - e) & (e - 123)) >>> 8) & (-256 + e - 97 + 26))
                    );
                  }),
                  t
                );
              })(i);
              t.URLSafeCoder = l;
              var o = new l();
              ((t.encodeURLSafe = function (e) {
                return o.encode(e);
              }),
                (t.decodeURLSafe = function (e) {
                  return o.decode(e);
                }),
                (t.encodedLength = function (e) {
                  return a.encodedLength(e);
                }),
                (t.maxDecodedLength = function (e) {
                  return a.maxDecodedLength(e);
                }),
                (t.decodedLength = function (e) {
                  return a.decodedLength(e);
                }));
            },
            function (e, t, n) {
              "use strict";
              Object.defineProperty(t, "__esModule", { value: !0 });
              var r = "utf8: invalid string",
                s = "utf8: invalid source encoding";
              function i(e) {
                for (var t = 0, n = 0; n < e.length; n++) {
                  var s = e.charCodeAt(n);
                  if (s < 128) t += 1;
                  else if (s < 2048) t += 2;
                  else if (s < 55296) t += 3;
                  else if (s <= 57343) {
                    if (n >= e.length - 1) throw Error(r);
                    (n++, (t += 4));
                  } else throw Error(r);
                }
                return t;
              }
              ((t.encode = function (e) {
                for (
                  var t = new Uint8Array(i(e)), n = 0, r = 0;
                  r < e.length;
                  r++
                ) {
                  var s = e.charCodeAt(r);
                  s < 128
                    ? (t[n++] = s)
                    : (s < 2048
                        ? (t[n++] = 192 | (s >> 6))
                        : (s < 55296
                            ? (t[n++] = 224 | (s >> 12))
                            : (r++,
                              (s =
                                (((1023 & s) << 10) |
                                  (1023 & e.charCodeAt(r))) +
                                65536),
                              (t[n++] = 240 | (s >> 18)),
                              (t[n++] = 128 | ((s >> 12) & 63))),
                          (t[n++] = 128 | ((s >> 6) & 63))),
                      (t[n++] = 128 | (63 & s)));
                }
                return t;
              }),
                (t.encodedLength = i),
                (t.decode = function (e) {
                  for (var t = [], n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (128 & r) {
                      var i = void 0;
                      if (r < 224) {
                        if (n >= e.length) throw Error(s);
                        var a = e[++n];
                        if ((192 & a) != 128) throw Error(s);
                        ((r = ((31 & r) << 6) | (63 & a)), (i = 128));
                      } else if (r < 240) {
                        if (n >= e.length - 1) throw Error(s);
                        var a = e[++n],
                          l = e[++n];
                        if ((192 & a) != 128 || (192 & l) != 128)
                          throw Error(s);
                        ((r = ((15 & r) << 12) | ((63 & a) << 6) | (63 & l)),
                          (i = 2048));
                      } else if (r < 248) {
                        if (n >= e.length - 2) throw Error(s);
                        var a = e[++n],
                          l = e[++n],
                          o = e[++n];
                        if (
                          (192 & a) != 128 ||
                          (192 & l) != 128 ||
                          (192 & o) != 128
                        )
                          throw Error(s);
                        ((r =
                          ((15 & r) << 18) |
                          ((63 & a) << 12) |
                          ((63 & l) << 6) |
                          (63 & o)),
                          (i = 65536));
                      } else throw Error(s);
                      if (r < i || (r >= 55296 && r <= 57343)) throw Error(s);
                      if (r >= 65536) {
                        if (r > 1114111) throw Error(s);
                        ((r -= 65536),
                          t.push(String.fromCharCode(55296 | (r >> 10))),
                          (r = 56320 | (1023 & r)));
                      }
                    }
                    t.push(String.fromCharCode(r));
                  }
                  return t.join("");
                }));
            },
            function (e, t, n) {
              e.exports = n(3).default;
            },
            function (e, t, n) {
              "use strict";
              n.r(t);
              for (
                var r,
                  s,
                  i,
                  a,
                  l,
                  o,
                  c,
                  d,
                  u,
                  h,
                  p,
                  m,
                  f,
                  g,
                  x,
                  v = (function () {
                    function e(e, t) {
                      ((this.lastId = 0), (this.prefix = e), (this.name = t));
                    }
                    return (
                      (e.prototype.create = function (e) {
                        this.lastId++;
                        var t = this.lastId,
                          n = this.prefix + t,
                          r = this.name + "[" + t + "]",
                          s = !1,
                          i = function () {
                            s || (e.apply(null, arguments), (s = !0));
                          };
                        return (
                          (this[t] = i),
                          { number: t, id: n, name: r, callback: i }
                        );
                      }),
                      (e.prototype.remove = function (e) {
                        delete this[e.number];
                      }),
                      e
                    );
                  })(),
                  b = new v("_pusher_script_", "Pusher.ScriptReceivers"),
                  y = "7.0.3",
                  j = (function () {
                    function e(e) {
                      ((this.options = e),
                        (this.receivers = e.receivers || b),
                        (this.loading = {}));
                    }
                    return (
                      (e.prototype.load = function (e, t, n) {
                        var r = this;
                        if (r.loading[e] && r.loading[e].length > 0)
                          r.loading[e].push(n);
                        else {
                          r.loading[e] = [n];
                          var s = tm.createScriptRequest(r.getPath(e, t)),
                            i = r.receivers.create(function (t) {
                              if ((r.receivers.remove(i), r.loading[e])) {
                                var n = r.loading[e];
                                delete r.loading[e];
                                for (
                                  var a = function (e) {
                                      e || s.cleanup();
                                    },
                                    l = 0;
                                  l < n.length;
                                  l++
                                )
                                  n[l](t, a);
                              }
                            });
                          s.send(i);
                        }
                      }),
                      (e.prototype.getRoot = function (e) {
                        var t,
                          n = tm.getDocument().location.protocol;
                        return (
                          ((e && e.useTLS) || "https:" === n
                            ? this.options.cdn_https
                            : this.options.cdn_http
                          ).replace(/\/*$/, "") +
                          "/" +
                          this.options.version
                        );
                      }),
                      (e.prototype.getPath = function (e, t) {
                        return (
                          this.getRoot(t) +
                          "/" +
                          e +
                          this.options.suffix +
                          ".js"
                        );
                      }),
                      e
                    );
                  })(),
                  C = new v(
                    "_pusher_dependencies",
                    "Pusher.DependenciesReceivers",
                  ),
                  w = new j({
                    cdn_http: "http://js.pusher.com",
                    cdn_https: "https://js.pusher.com",
                    version: y,
                    suffix: "",
                    receivers: C,
                  }),
                  k = {
                    authenticationEndpoint: {
                      path: "/docs/authenticating_users",
                    },
                    javascriptQuickStart: {
                      path: "/docs/javascript_quick_start",
                    },
                    triggeringClientEvents: {
                      path: "/docs/client_api_guide/client_events#trigger-events",
                    },
                    encryptedChannelSupport: {
                      fullUrl:
                        "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support",
                    },
                  },
                  N = function (e) {
                    var t,
                      n = k[e];
                    return n &&
                      (n.fullUrl
                        ? (t = n.fullUrl)
                        : n.path && (t = "https://pusher.com" + n.path),
                      t)
                      ? "See: " + t
                      : "";
                  },
                  M =
                    ((r = function (e, t) {
                      return (r =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        })(e, t);
                    }),
                    function (e, t) {
                      function n() {
                        this.constructor = e;
                      }
                      (r(e, t),
                        (e.prototype =
                          null === t
                            ? Object.create(t)
                            : ((n.prototype = t.prototype), new n())));
                    }),
                  S = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  I = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  L = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  T = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  E = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  _ = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  A = (function (e) {
                    function t(t) {
                      var n = this.constructor,
                        r = e.call(this, t) || this;
                      return (Object.setPrototypeOf(r, n.prototype), r);
                    }
                    return (M(t, e), t);
                  })(Error),
                  R = (function (e) {
                    function t(t, n) {
                      var r = this.constructor,
                        s = e.call(this, n) || this;
                      return (
                        (s.status = t),
                        Object.setPrototypeOf(s, r.prototype),
                        s
                      );
                    }
                    return (M(t, e), t);
                  })(Error),
                  P = function (e, t, n) {
                    var r,
                      s = this;
                    for (var i in ((r = tm.createXHR()).open(
                      "POST",
                      s.options.authEndpoint,
                      !0,
                    ),
                    r.setRequestHeader(
                      "Content-Type",
                      "application/x-www-form-urlencoded",
                    ),
                    this.authOptions.headers))
                      r.setRequestHeader(i, this.authOptions.headers[i]);
                    return (
                      (r.onreadystatechange = function () {
                        if (4 === r.readyState)
                          if (200 === r.status) {
                            var e = void 0,
                              t = !1;
                            try {
                              ((e = JSON.parse(r.responseText)), (t = !0));
                            } catch (e) {
                              n(
                                new R(
                                  200,
                                  "JSON returned from auth endpoint was invalid, yet status code was 200. Data was: " +
                                    r.responseText,
                                ),
                                { auth: "" },
                              );
                            }
                            t && n(null, e);
                          } else {
                            var i = N("authenticationEndpoint");
                            n(
                              new R(
                                r.status,
                                "Unable to retrieve auth string from auth endpoint - " +
                                  ("received status: " + r.status + " from ") +
                                  s.options.authEndpoint +
                                  ". Clients must be authenticated to join private or presence channels. " +
                                  i,
                              ),
                              { auth: "" },
                            );
                          }
                      }),
                      r.send(this.composeQuery(t)),
                      r
                    );
                  },
                  D = String.fromCharCode,
                  V =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                  $ = {},
                  F = 0,
                  z = V.length;
                F < z;
                F++
              )
                $[V.charAt(F)] = F;
              var H = function (e) {
                  var t = e.charCodeAt(0);
                  return t < 128
                    ? e
                    : t < 2048
                      ? D(192 | (t >>> 6)) + D(128 | (63 & t))
                      : D(224 | ((t >>> 12) & 15)) +
                        D(128 | ((t >>> 6) & 63)) +
                        D(128 | (63 & t));
                },
                B = function (e) {
                  var t = [0, 2, 1][e.length % 3],
                    n =
                      (e.charCodeAt(0) << 16) |
                      ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) |
                      (e.length > 2 ? e.charCodeAt(2) : 0);
                  return [
                    V.charAt(n >>> 18),
                    V.charAt((n >>> 12) & 63),
                    t >= 2 ? "=" : V.charAt((n >>> 6) & 63),
                    t >= 1 ? "=" : V.charAt(63 & n),
                  ].join("");
                },
                O =
                  window.btoa ||
                  function (e) {
                    return e.replace(/[\s\S]{1,3}/g, B);
                  },
                U = (function () {
                  function e(e, t, n, r) {
                    var s = this;
                    ((this.clear = t),
                      (this.timer = e(function () {
                        s.timer && (s.timer = r(s.timer));
                      }, n)));
                  }
                  return (
                    (e.prototype.isRunning = function () {
                      return null !== this.timer;
                    }),
                    (e.prototype.ensureAborted = function () {
                      this.timer &&
                        (this.clear(this.timer), (this.timer = null));
                    }),
                    e
                  );
                })(),
                W =
                  ((s = function (e, t) {
                    return (s =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (s(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  });
              function Z(e) {
                window.clearTimeout(e);
              }
              function G(e) {
                window.clearInterval(e);
              }
              var q = (function (e) {
                  function t(t, n) {
                    return (
                      e.call(this, setTimeout, Z, t, function (e) {
                        return (n(), null);
                      }) || this
                    );
                  }
                  return (W(t, e), t);
                })(U),
                X = (function (e) {
                  function t(t, n) {
                    return (
                      e.call(this, setInterval, G, t, function (e) {
                        return (n(), e);
                      }) || this
                    );
                  }
                  return (W(t, e), t);
                })(U),
                Y = function () {
                  return Date.now ? Date.now() : new Date().valueOf();
                },
                K = function (e) {
                  return new q(0, e);
                },
                J = function (e) {
                  for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                  var r = Array.prototype.slice.call(arguments, 1);
                  return function (t) {
                    return t[e].apply(t, r.concat(arguments));
                  };
                };
              function Q(e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                  t[n - 1] = arguments[n];
                for (var r = 0; r < t.length; r++) {
                  var s = t[r];
                  for (var i in s)
                    s[i] && s[i].constructor && s[i].constructor === Object
                      ? (e[i] = Q(e[i] || {}, s[i]))
                      : (e[i] = s[i]);
                }
                return e;
              }
              function ee() {
                for (var e = ["Pusher"], t = 0; t < arguments.length; t++)
                  "string" == typeof arguments[t]
                    ? e.push(arguments[t])
                    : e.push(ec(arguments[t]));
                return e.join(" : ");
              }
              function et(e, t) {
                var n = Array.prototype.indexOf;
                if (null === e) return -1;
                if (n && e.indexOf === n) return e.indexOf(t);
                for (var r = 0, s = e.length; r < s; r++)
                  if (e[r] === t) return r;
                return -1;
              }
              function en(e, t) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && t(e[n], n, e);
              }
              function er(e) {
                var t = [];
                return (
                  en(e, function (e, n) {
                    t.push(n);
                  }),
                  t
                );
              }
              function es(e, t, n) {
                for (var r = 0; r < e.length; r++)
                  t.call(n || window, e[r], r, e);
              }
              function ei(e, t) {
                for (var n = [], r = 0; r < e.length; r++)
                  n.push(t(e[r], r, e, n));
                return n;
              }
              function ea(e, t) {
                t =
                  t ||
                  function (e) {
                    return !!e;
                  };
                for (var n = [], r = 0; r < e.length; r++)
                  t(e[r], r, e, n) && n.push(e[r]);
                return n;
              }
              function el(e, t) {
                var n = {};
                return (
                  en(e, function (r, s) {
                    ((t && t(r, s, e, n)) || r) && (n[s] = r);
                  }),
                  n
                );
              }
              function eo(e, t) {
                for (var n = 0; n < e.length; n++) if (t(e[n], n, e)) return !0;
                return !1;
              }
              function ec(e) {
                try {
                  return JSON.stringify(e);
                } catch (r) {
                  var t, n;
                  return JSON.stringify(
                    ((t = []),
                    (n = []),
                    (function e(r, s) {
                      var i, a, l;
                      switch (typeof r) {
                        case "object":
                          if (!r) return null;
                          for (i = 0; i < t.length; i += 1)
                            if (t[i] === r) return { $ref: n[i] };
                          if (
                            (t.push(r),
                            n.push(s),
                            "[object Array]" ===
                              Object.prototype.toString.apply(r))
                          )
                            for (i = 0, l = []; i < r.length; i += 1)
                              l[i] = e(r[i], s + "[" + i + "]");
                          else
                            for (a in ((l = {}), r))
                              Object.prototype.hasOwnProperty.call(r, a) &&
                                (l[a] = e(
                                  r[a],
                                  s + "[" + JSON.stringify(a) + "]",
                                ));
                          return l;
                        case "number":
                        case "string":
                        case "boolean":
                          return r;
                      }
                    })(e, "$")),
                  );
                }
              }
              var ed = new ((function () {
                  function e() {
                    this.globalLog = function (e) {
                      window.console &&
                        window.console.log &&
                        window.console.log(e);
                    };
                  }
                  return (
                    (e.prototype.debug = function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                      this.log(this.globalLog, e);
                    }),
                    (e.prototype.warn = function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                      this.log(this.globalLogWarn, e);
                    }),
                    (e.prototype.error = function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                      this.log(this.globalLogError, e);
                    }),
                    (e.prototype.globalLogWarn = function (e) {
                      window.console && window.console.warn
                        ? window.console.warn(e)
                        : this.globalLog(e);
                    }),
                    (e.prototype.globalLogError = function (e) {
                      window.console && window.console.error
                        ? window.console.error(e)
                        : this.globalLogWarn(e);
                    }),
                    (e.prototype.log = function (e) {
                      for (var t = [], n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                      var r = ee.apply(this, arguments);
                      tk.log ? tk.log(r) : tk.logToConsole && e.bind(this)(r);
                    }),
                    e
                  );
                })())(),
                eu = function (e, t, n) {
                  void 0 !== this.authOptions.headers &&
                    ed.warn(
                      "To send headers with the auth request, you must use AJAX, rather than JSONP.",
                    );
                  var r = e.nextAuthCallbackID.toString();
                  e.nextAuthCallbackID++;
                  var s = e.getDocument(),
                    i = s.createElement("script");
                  ((e.auth_callbacks[r] = function (e) {
                    n(null, e);
                  }),
                    (i.src =
                      this.options.authEndpoint +
                      "?callback=" +
                      encodeURIComponent("Pusher.auth_callbacks['" + r + "']") +
                      "&" +
                      this.composeQuery(t)));
                  var a =
                    s.getElementsByTagName("head")[0] || s.documentElement;
                  a.insertBefore(i, a.firstChild);
                },
                eh = (function () {
                  function e(e) {
                    this.src = e;
                  }
                  return (
                    (e.prototype.send = function (e) {
                      var t = this,
                        n = "Error loading " + t.src;
                      ((t.script = document.createElement("script")),
                        (t.script.id = e.id),
                        (t.script.src = t.src),
                        (t.script.type = "text/javascript"),
                        (t.script.charset = "UTF-8"),
                        t.script.addEventListener
                          ? ((t.script.onerror = function () {
                              e.callback(n);
                            }),
                            (t.script.onload = function () {
                              e.callback(null);
                            }))
                          : (t.script.onreadystatechange = function () {
                              ("loaded" === t.script.readyState ||
                                "complete" === t.script.readyState) &&
                                e.callback(null);
                            }),
                        void 0 === t.script.async &&
                        document.attachEvent &&
                        /opera/i.test(navigator.userAgent)
                          ? ((t.errorScript = document.createElement("script")),
                            (t.errorScript.id = e.id + "_error"),
                            (t.errorScript.text = e.name + "('" + n + "');"),
                            (t.script.async = t.errorScript.async = !1))
                          : (t.script.async = !0));
                      var r = document.getElementsByTagName("head")[0];
                      (r.insertBefore(t.script, r.firstChild),
                        t.errorScript &&
                          r.insertBefore(t.errorScript, t.script.nextSibling));
                    }),
                    (e.prototype.cleanup = function () {
                      (this.script &&
                        ((this.script.onload = this.script.onerror = null),
                        (this.script.onreadystatechange = null)),
                        this.script &&
                          this.script.parentNode &&
                          this.script.parentNode.removeChild(this.script),
                        this.errorScript &&
                          this.errorScript.parentNode &&
                          this.errorScript.parentNode.removeChild(
                            this.errorScript,
                          ),
                        (this.script = null),
                        (this.errorScript = null));
                    }),
                    e
                  );
                })(),
                ep = (function () {
                  function e(e, t) {
                    ((this.url = e), (this.data = t));
                  }
                  return (
                    (e.prototype.send = function (e) {
                      if (!this.request) {
                        var t,
                          n,
                          r,
                          s,
                          i = ei(
                            ((t = el(this.data, function (e) {
                              return void 0 !== e;
                            })),
                            (n = function (e) {
                              return (
                                "object" == typeof e && (e = ec(e)),
                                encodeURIComponent(
                                  O(e.toString().replace(/[^\x00-\x7F]/g, H)),
                                )
                              );
                            }),
                            (r = {}),
                            en(t, function (e, t) {
                              r[t] = n(e);
                            }),
                            (s = []),
                            en(r, function (e, t) {
                              s.push([t, e]);
                            }),
                            s),
                            J("join", "="),
                          ).join("&"),
                          a = this.url + "/" + e.number + "?" + i;
                        ((this.request = tm.createScriptRequest(a)),
                          this.request.send(e));
                      }
                    }),
                    (e.prototype.cleanup = function () {
                      this.request && this.request.cleanup();
                    }),
                    e
                  );
                })();
              function em(e, t, n) {
                return (
                  e +
                  (t.useTLS ? "s" : "") +
                  "://" +
                  (t.useTLS ? t.hostTLS : t.hostNonTLS) +
                  n
                );
              }
              function ef(e, t) {
                return (
                  "/app/" +
                  e +
                  "?protocol=7&client=js&version=" +
                  y +
                  (t ? "&" + t : "")
                );
              }
              var eg = (function () {
                  function e() {
                    this._callbacks = {};
                  }
                  return (
                    (e.prototype.get = function (e) {
                      return this._callbacks["_" + e];
                    }),
                    (e.prototype.add = function (e, t, n) {
                      var r = "_" + e;
                      ((this._callbacks[r] = this._callbacks[r] || []),
                        this._callbacks[r].push({ fn: t, context: n }));
                    }),
                    (e.prototype.remove = function (e, t, n) {
                      if (!e && !t && !n) {
                        this._callbacks = {};
                        return;
                      }
                      var r = e ? ["_" + e] : er(this._callbacks);
                      t || n
                        ? this.removeCallback(r, t, n)
                        : this.removeAllCallbacks(r);
                    }),
                    (e.prototype.removeCallback = function (e, t, n) {
                      es(
                        e,
                        function (e) {
                          ((this._callbacks[e] = ea(
                            this._callbacks[e] || [],
                            function (e) {
                              return (
                                (t && t !== e.fn) || (n && n !== e.context)
                              );
                            },
                          )),
                            0 === this._callbacks[e].length &&
                              delete this._callbacks[e]);
                        },
                        this,
                      );
                    }),
                    (e.prototype.removeAllCallbacks = function (e) {
                      es(
                        e,
                        function (e) {
                          delete this._callbacks[e];
                        },
                        this,
                      );
                    }),
                    e
                  );
                })(),
                ex = (function () {
                  function e(e) {
                    ((this.callbacks = new eg()),
                      (this.global_callbacks = []),
                      (this.failThrough = e));
                  }
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      return (this.callbacks.add(e, t, n), this);
                    }),
                    (e.prototype.bind_global = function (e) {
                      return (this.global_callbacks.push(e), this);
                    }),
                    (e.prototype.unbind = function (e, t, n) {
                      return (this.callbacks.remove(e, t, n), this);
                    }),
                    (e.prototype.unbind_global = function (e) {
                      return (
                        e
                          ? (this.global_callbacks = ea(
                              this.global_callbacks || [],
                              function (t) {
                                return t !== e;
                              },
                            ))
                          : (this.global_callbacks = []),
                        this
                      );
                    }),
                    (e.prototype.unbind_all = function () {
                      return (this.unbind(), this.unbind_global(), this);
                    }),
                    (e.prototype.emit = function (e, t, n) {
                      for (var r = 0; r < this.global_callbacks.length; r++)
                        this.global_callbacks[r](e, t);
                      var s = this.callbacks.get(e),
                        i = [];
                      if (
                        (n ? i.push(t, n) : t && i.push(t), s && s.length > 0)
                      )
                        for (var r = 0; r < s.length; r++)
                          s[r].fn.apply(s[r].context || window, i);
                      else this.failThrough && this.failThrough(e, t);
                      return this;
                    }),
                    e
                  );
                })(),
                ev =
                  ((i = function (e, t) {
                    return (i =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (i(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eb = (function (e) {
                  function t(t, n, r, s, i) {
                    var a = e.call(this) || this;
                    return (
                      (a.initialize = tm.transportConnectionInitializer),
                      (a.hooks = t),
                      (a.name = n),
                      (a.priority = r),
                      (a.key = s),
                      (a.options = i),
                      (a.state = "new"),
                      (a.timeline = i.timeline),
                      (a.activityTimeout = i.activityTimeout),
                      (a.id = a.timeline.generateUniqueID()),
                      a
                    );
                  }
                  return (
                    ev(t, e),
                    (t.prototype.handlesActivityChecks = function () {
                      return !!this.hooks.handlesActivityChecks;
                    }),
                    (t.prototype.supportsPing = function () {
                      return !!this.hooks.supportsPing;
                    }),
                    (t.prototype.connect = function () {
                      var e = this;
                      if (this.socket || "initialized" !== this.state)
                        return !1;
                      var t = this.hooks.urls.getInitial(
                        this.key,
                        this.options,
                      );
                      try {
                        this.socket = this.hooks.getSocket(t, this.options);
                      } catch (t) {
                        return (
                          K(function () {
                            (e.onError(t), e.changeState("closed"));
                          }),
                          !1
                        );
                      }
                      return (
                        this.bindListeners(),
                        ed.debug("Connecting", {
                          transport: this.name,
                          url: t,
                        }),
                        this.changeState("connecting"),
                        !0
                      );
                    }),
                    (t.prototype.close = function () {
                      return !!this.socket && (this.socket.close(), !0);
                    }),
                    (t.prototype.send = function (e) {
                      var t = this;
                      return (
                        "open" === this.state &&
                        (K(function () {
                          t.socket && t.socket.send(e);
                        }),
                        !0)
                      );
                    }),
                    (t.prototype.ping = function () {
                      "open" === this.state &&
                        this.supportsPing() &&
                        this.socket.ping();
                    }),
                    (t.prototype.onOpen = function () {
                      (this.hooks.beforeOpen &&
                        this.hooks.beforeOpen(
                          this.socket,
                          this.hooks.urls.getPath(this.key, this.options),
                        ),
                        this.changeState("open"),
                        (this.socket.onopen = void 0));
                    }),
                    (t.prototype.onError = function (e) {
                      (this.emit("error", { type: "WebSocketError", error: e }),
                        this.timeline.error(
                          this.buildTimelineMessage({ error: e.toString() }),
                        ));
                    }),
                    (t.prototype.onClose = function (e) {
                      (e
                        ? this.changeState("closed", {
                            code: e.code,
                            reason: e.reason,
                            wasClean: e.wasClean,
                          })
                        : this.changeState("closed"),
                        this.unbindListeners(),
                        (this.socket = void 0));
                    }),
                    (t.prototype.onMessage = function (e) {
                      this.emit("message", e);
                    }),
                    (t.prototype.onActivity = function () {
                      this.emit("activity");
                    }),
                    (t.prototype.bindListeners = function () {
                      var e = this;
                      ((this.socket.onopen = function () {
                        e.onOpen();
                      }),
                        (this.socket.onerror = function (t) {
                          e.onError(t);
                        }),
                        (this.socket.onclose = function (t) {
                          e.onClose(t);
                        }),
                        (this.socket.onmessage = function (t) {
                          e.onMessage(t);
                        }),
                        this.supportsPing() &&
                          (this.socket.onactivity = function () {
                            e.onActivity();
                          }));
                    }),
                    (t.prototype.unbindListeners = function () {
                      this.socket &&
                        ((this.socket.onopen = void 0),
                        (this.socket.onerror = void 0),
                        (this.socket.onclose = void 0),
                        (this.socket.onmessage = void 0),
                        this.supportsPing() &&
                          (this.socket.onactivity = void 0));
                    }),
                    (t.prototype.changeState = function (e, t) {
                      ((this.state = e),
                        this.timeline.info(
                          this.buildTimelineMessage({ state: e, params: t }),
                        ),
                        this.emit(e, t));
                    }),
                    (t.prototype.buildTimelineMessage = function (e) {
                      return Q({ cid: this.id }, e);
                    }),
                    t
                  );
                })(ex),
                ey = (function () {
                  function e(e) {
                    this.hooks = e;
                  }
                  return (
                    (e.prototype.isSupported = function (e) {
                      return this.hooks.isSupported(e);
                    }),
                    (e.prototype.createConnection = function (e, t, n, r) {
                      return new eb(this.hooks, e, t, n, r);
                    }),
                    e
                  );
                })(),
                ej = new ey({
                  urls: {
                    getInitial: function (e, t) {
                      var n = (t.httpPath || "") + ef(e, "flash=false");
                      return em("ws", t, n);
                    },
                  },
                  handlesActivityChecks: !1,
                  supportsPing: !1,
                  isInitialized: function () {
                    return !!tm.getWebSocketAPI();
                  },
                  isSupported: function () {
                    return !!tm.getWebSocketAPI();
                  },
                  getSocket: function (e) {
                    return tm.createWebSocket(e);
                  },
                }),
                eC = {
                  urls: {
                    getInitial: function (e, t) {
                      var n = (t.httpPath || "/pusher") + ef(e);
                      return em("http", t, n);
                    },
                  },
                  handlesActivityChecks: !1,
                  supportsPing: !0,
                  isInitialized: function () {
                    return !0;
                  },
                },
                ew = Q(
                  {
                    getSocket: function (e) {
                      return tm.HTTPFactory.createStreamingSocket(e);
                    },
                  },
                  eC,
                ),
                ek = Q(
                  {
                    getSocket: function (e) {
                      return tm.HTTPFactory.createPollingSocket(e);
                    },
                  },
                  eC,
                ),
                eN = {
                  isSupported: function () {
                    return tm.isXHRSupported();
                  },
                },
                eM = {
                  ws: ej,
                  xhr_streaming: new ey(Q({}, ew, eN)),
                  xhr_polling: new ey(Q({}, ek, eN)),
                },
                eS = new ey({
                  file: "sockjs",
                  urls: {
                    getInitial: function (e, t) {
                      return em("http", t, t.httpPath || "/pusher");
                    },
                    getPath: function (e, t) {
                      return ef(e);
                    },
                  },
                  handlesActivityChecks: !0,
                  supportsPing: !1,
                  isSupported: function () {
                    return !0;
                  },
                  isInitialized: function () {
                    return void 0 !== window.SockJS;
                  },
                  getSocket: function (e, t) {
                    return new window.SockJS(e, null, {
                      js_path: w.getPath("sockjs", { useTLS: t.useTLS }),
                      ignore_null_origin: t.ignoreNullOrigin,
                    });
                  },
                  beforeOpen: function (e, t) {
                    e.send(JSON.stringify({ path: t }));
                  },
                }),
                eI = {
                  isSupported: function (e) {
                    return tm.isXDRSupported(e.useTLS);
                  },
                },
                eL = new ey(Q({}, ew, eI)),
                eT = new ey(Q({}, ek, eI));
              ((eM.xdr_streaming = eL),
                (eM.xdr_polling = eT),
                (eM.sockjs = eS));
              var eE =
                  ((a = function (e, t) {
                    return (a =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (a(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                e_ = new ((function (e) {
                  function t() {
                    var t = e.call(this) || this;
                    return (
                      void 0 !== window.addEventListener &&
                        (window.addEventListener(
                          "online",
                          function () {
                            t.emit("online");
                          },
                          !1,
                        ),
                        window.addEventListener(
                          "offline",
                          function () {
                            t.emit("offline");
                          },
                          !1,
                        )),
                      t
                    );
                  }
                  return (
                    eE(t, e),
                    (t.prototype.isOnline = function () {
                      return (
                        void 0 === window.navigator.onLine ||
                        window.navigator.onLine
                      );
                    }),
                    t
                  );
                })(ex))(),
                eA = (function () {
                  function e(e, t, n) {
                    ((this.manager = e),
                      (this.transport = t),
                      (this.minPingDelay = n.minPingDelay),
                      (this.maxPingDelay = n.maxPingDelay),
                      (this.pingDelay = void 0));
                  }
                  return (
                    (e.prototype.createConnection = function (e, t, n, r) {
                      var s = this;
                      r = Q({}, r, { activityTimeout: this.pingDelay });
                      var i = this.transport.createConnection(e, t, n, r),
                        a = null,
                        l = function () {
                          (i.unbind("open", l), i.bind("closed", o), (a = Y()));
                        },
                        o = function (e) {
                          if (
                            (i.unbind("closed", o),
                            1002 === e.code || 1003 === e.code)
                          )
                            s.manager.reportDeath();
                          else if (!e.wasClean && a) {
                            var t = Y() - a;
                            t < 2 * s.maxPingDelay &&
                              (s.manager.reportDeath(),
                              (s.pingDelay = Math.max(t / 2, s.minPingDelay)));
                          }
                        };
                      return (i.bind("open", l), i);
                    }),
                    (e.prototype.isSupported = function (e) {
                      return (
                        this.manager.isAlive() && this.transport.isSupported(e)
                      );
                    }),
                    e
                  );
                })(),
                eR = {
                  decodeMessage: function (e) {
                    try {
                      var t = JSON.parse(e.data),
                        n = t.data;
                      if ("string" == typeof n)
                        try {
                          n = JSON.parse(t.data);
                        } catch (e) {}
                      var r = { event: t.event, channel: t.channel, data: n };
                      return (t.user_id && (r.user_id = t.user_id), r);
                    } catch (t) {
                      throw {
                        type: "MessageParseError",
                        error: t,
                        data: e.data,
                      };
                    }
                  },
                  encodeMessage: function (e) {
                    return JSON.stringify(e);
                  },
                  processHandshake: function (e) {
                    var t = eR.decodeMessage(e);
                    if ("pusher:connection_established" === t.event) {
                      if (!t.data.activity_timeout)
                        throw "No activity timeout specified in handshake";
                      return {
                        action: "connected",
                        id: t.data.socket_id,
                        activityTimeout: 1e3 * t.data.activity_timeout,
                      };
                    }
                    if ("pusher:error" === t.event)
                      return {
                        action: this.getCloseAction(t.data),
                        error: this.getCloseError(t.data),
                      };
                    throw "Invalid handshake";
                  },
                  getCloseAction: function (e) {
                    if (e.code < 4e3)
                      if (e.code >= 1002 && e.code <= 1004) return "backoff";
                      else return null;
                    if (4e3 === e.code) return "tls_only";
                    if (e.code < 4100) return "refused";
                    if (e.code < 4200) return "backoff";
                    if (e.code < 4300) return "retry";
                    else return "refused";
                  },
                  getCloseError: function (e) {
                    return 1e3 !== e.code && 1001 !== e.code
                      ? {
                          type: "PusherError",
                          data: {
                            code: e.code,
                            message: e.reason || e.message,
                          },
                        }
                      : null;
                  },
                },
                eP =
                  ((l = function (e, t) {
                    return (l =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (l(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eD = (function (e) {
                  function t(t, n) {
                    var r = e.call(this) || this;
                    return (
                      (r.id = t),
                      (r.transport = n),
                      (r.activityTimeout = n.activityTimeout),
                      r.bindListeners(),
                      r
                    );
                  }
                  return (
                    eP(t, e),
                    (t.prototype.handlesActivityChecks = function () {
                      return this.transport.handlesActivityChecks();
                    }),
                    (t.prototype.send = function (e) {
                      return this.transport.send(e);
                    }),
                    (t.prototype.send_event = function (e, t, n) {
                      var r = { event: e, data: t };
                      return (
                        n && (r.channel = n),
                        ed.debug("Event sent", r),
                        this.send(eR.encodeMessage(r))
                      );
                    }),
                    (t.prototype.ping = function () {
                      this.transport.supportsPing()
                        ? this.transport.ping()
                        : this.send_event("pusher:ping", {});
                    }),
                    (t.prototype.close = function () {
                      this.transport.close();
                    }),
                    (t.prototype.bindListeners = function () {
                      var e = this,
                        t = {
                          message: function (t) {
                            var n;
                            try {
                              n = eR.decodeMessage(t);
                            } catch (n) {
                              e.emit("error", {
                                type: "MessageParseError",
                                error: n,
                                data: t.data,
                              });
                            }
                            if (void 0 !== n) {
                              switch ((ed.debug("Event recd", n), n.event)) {
                                case "pusher:error":
                                  e.emit("error", {
                                    type: "PusherError",
                                    data: n.data,
                                  });
                                  break;
                                case "pusher:ping":
                                  e.emit("ping");
                                  break;
                                case "pusher:pong":
                                  e.emit("pong");
                              }
                              e.emit("message", n);
                            }
                          },
                          activity: function () {
                            e.emit("activity");
                          },
                          error: function (t) {
                            e.emit("error", t);
                          },
                          closed: function (t) {
                            (n(),
                              t && t.code && e.handleCloseEvent(t),
                              (e.transport = null),
                              e.emit("closed"));
                          },
                        },
                        n = function () {
                          en(t, function (t, n) {
                            e.transport.unbind(n, t);
                          });
                        };
                      en(t, function (t, n) {
                        e.transport.bind(n, t);
                      });
                    }),
                    (t.prototype.handleCloseEvent = function (e) {
                      var t = eR.getCloseAction(e),
                        n = eR.getCloseError(e);
                      (n && this.emit("error", n),
                        t && this.emit(t, { action: t, error: n }));
                    }),
                    t
                  );
                })(ex),
                eV = (function () {
                  function e(e, t) {
                    ((this.transport = e),
                      (this.callback = t),
                      this.bindListeners());
                  }
                  return (
                    (e.prototype.close = function () {
                      (this.unbindListeners(), this.transport.close());
                    }),
                    (e.prototype.bindListeners = function () {
                      var e = this;
                      ((this.onMessage = function (t) {
                        var n;
                        e.unbindListeners();
                        try {
                          n = eR.processHandshake(t);
                        } catch (t) {
                          (e.finish("error", { error: t }),
                            e.transport.close());
                          return;
                        }
                        "connected" === n.action
                          ? e.finish("connected", {
                              connection: new eD(n.id, e.transport),
                              activityTimeout: n.activityTimeout,
                            })
                          : (e.finish(n.action, { error: n.error }),
                            e.transport.close());
                      }),
                        (this.onClosed = function (t) {
                          e.unbindListeners();
                          var n = eR.getCloseAction(t) || "backoff",
                            r = eR.getCloseError(t);
                          e.finish(n, { error: r });
                        }),
                        this.transport.bind("message", this.onMessage),
                        this.transport.bind("closed", this.onClosed));
                    }),
                    (e.prototype.unbindListeners = function () {
                      (this.transport.unbind("message", this.onMessage),
                        this.transport.unbind("closed", this.onClosed));
                    }),
                    (e.prototype.finish = function (e, t) {
                      this.callback(
                        Q({ transport: this.transport, action: e }, t),
                      );
                    }),
                    e
                  );
                })(),
                e$ = (function () {
                  function e(e, t) {
                    this.channel = e;
                    var n = t.authTransport;
                    if (void 0 === tm.getAuthorizers()[n])
                      throw "'" + n + "' is not a recognized auth transport";
                    ((this.type = n),
                      (this.options = t),
                      (this.authOptions = t.auth || {}));
                  }
                  return (
                    (e.prototype.composeQuery = function (e) {
                      var t =
                        "socket_id=" +
                        encodeURIComponent(e) +
                        "&channel_name=" +
                        encodeURIComponent(this.channel.name);
                      for (var n in this.authOptions.params)
                        t +=
                          "&" +
                          encodeURIComponent(n) +
                          "=" +
                          encodeURIComponent(this.authOptions.params[n]);
                      return t;
                    }),
                    (e.prototype.authorize = function (t, n) {
                      ((e.authorizers = e.authorizers || tm.getAuthorizers()),
                        e.authorizers[this.type].call(this, tm, t, n));
                    }),
                    e
                  );
                })(),
                eF = (function () {
                  function e(e, t) {
                    ((this.timeline = e), (this.options = t || {}));
                  }
                  return (
                    (e.prototype.send = function (e, t) {
                      this.timeline.isEmpty() ||
                        this.timeline.send(
                          tm.TimelineTransport.getAgent(this, e),
                          t,
                        );
                    }),
                    e
                  );
                })(),
                ez =
                  ((o = function (e, t) {
                    return (o =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (o(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eH = (function (e) {
                  function t(t, n) {
                    var r =
                      e.call(this, function (e, n) {
                        ed.debug("No callbacks on " + t + " for " + e);
                      }) || this;
                    return (
                      (r.name = t),
                      (r.pusher = n),
                      (r.subscribed = !1),
                      (r.subscriptionPending = !1),
                      (r.subscriptionCancelled = !1),
                      r
                    );
                  }
                  return (
                    ez(t, e),
                    (t.prototype.authorize = function (e, t) {
                      return t(null, { auth: "" });
                    }),
                    (t.prototype.trigger = function (e, t) {
                      if (0 !== e.indexOf("client-"))
                        throw new S(
                          "Event '" + e + "' does not start with 'client-'",
                        );
                      if (!this.subscribed) {
                        var n = N("triggeringClientEvents");
                        ed.warn(
                          "Client event triggered before channel 'subscription_succeeded' event . " +
                            n,
                        );
                      }
                      return this.pusher.send_event(e, t, this.name);
                    }),
                    (t.prototype.disconnect = function () {
                      ((this.subscribed = !1), (this.subscriptionPending = !1));
                    }),
                    (t.prototype.handleEvent = function (e) {
                      var t = e.event,
                        n = e.data;
                      "pusher_internal:subscription_succeeded" === t
                        ? this.handleSubscriptionSucceededEvent(e)
                        : 0 !== t.indexOf("pusher_internal:") &&
                          this.emit(t, n, {});
                    }),
                    (t.prototype.handleSubscriptionSucceededEvent = function (
                      e,
                    ) {
                      ((this.subscriptionPending = !1),
                        (this.subscribed = !0),
                        this.subscriptionCancelled
                          ? this.pusher.unsubscribe(this.name)
                          : this.emit("pusher:subscription_succeeded", e.data));
                    }),
                    (t.prototype.subscribe = function () {
                      var e = this;
                      this.subscribed ||
                        ((this.subscriptionPending = !0),
                        (this.subscriptionCancelled = !1),
                        this.authorize(
                          this.pusher.connection.socket_id,
                          function (t, n) {
                            t
                              ? ((e.subscriptionPending = !1),
                                ed.error(t.toString()),
                                e.emit(
                                  "pusher:subscription_error",
                                  Object.assign(
                                    {},
                                    { type: "AuthError", error: t.message },
                                    t instanceof R ? { status: t.status } : {},
                                  ),
                                ))
                              : e.pusher.send_event("pusher:subscribe", {
                                  auth: n.auth,
                                  channel_data: n.channel_data,
                                  channel: e.name,
                                });
                          },
                        ));
                    }),
                    (t.prototype.unsubscribe = function () {
                      ((this.subscribed = !1),
                        this.pusher.send_event("pusher:unsubscribe", {
                          channel: this.name,
                        }));
                    }),
                    (t.prototype.cancelSubscription = function () {
                      this.subscriptionCancelled = !0;
                    }),
                    (t.prototype.reinstateSubscription = function () {
                      this.subscriptionCancelled = !1;
                    }),
                    t
                  );
                })(ex),
                eB =
                  ((c = function (e, t) {
                    return (c =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (c(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eO = (function (e) {
                  function t() {
                    return (null !== e && e.apply(this, arguments)) || this;
                  }
                  return (
                    eB(t, e),
                    (t.prototype.authorize = function (e, t) {
                      return e0
                        .createAuthorizer(this, this.pusher.config)
                        .authorize(e, t);
                    }),
                    t
                  );
                })(eH),
                eU = (function () {
                  function e() {
                    this.reset();
                  }
                  return (
                    (e.prototype.get = function (e) {
                      return Object.prototype.hasOwnProperty.call(
                        this.members,
                        e,
                      )
                        ? { id: e, info: this.members[e] }
                        : null;
                    }),
                    (e.prototype.each = function (e) {
                      var t = this;
                      en(this.members, function (n, r) {
                        e(t.get(r));
                      });
                    }),
                    (e.prototype.setMyID = function (e) {
                      this.myID = e;
                    }),
                    (e.prototype.onSubscription = function (e) {
                      ((this.members = e.presence.hash),
                        (this.count = e.presence.count),
                        (this.me = this.get(this.myID)));
                    }),
                    (e.prototype.addMember = function (e) {
                      return (
                        null === this.get(e.user_id) && this.count++,
                        (this.members[e.user_id] = e.user_info),
                        this.get(e.user_id)
                      );
                    }),
                    (e.prototype.removeMember = function (e) {
                      var t = this.get(e.user_id);
                      return (
                        t && (delete this.members[e.user_id], this.count--),
                        t
                      );
                    }),
                    (e.prototype.reset = function () {
                      ((this.members = {}),
                        (this.count = 0),
                        (this.myID = null),
                        (this.me = null));
                    }),
                    e
                  );
                })(),
                eW =
                  ((d = function (e, t) {
                    return (d =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (d(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eZ = (function (e) {
                  function t(t, n) {
                    var r = e.call(this, t, n) || this;
                    return ((r.members = new eU()), r);
                  }
                  return (
                    eW(t, e),
                    (t.prototype.authorize = function (t, n) {
                      var r = this;
                      e.prototype.authorize.call(this, t, function (e, t) {
                        if (!e) {
                          if (void 0 === t.channel_data) {
                            var s = N("authenticationEndpoint");
                            (ed.error(
                              "Invalid auth response for channel '" +
                                r.name +
                                "',expected 'channel_data' field. " +
                                s,
                            ),
                              n("Invalid auth response"));
                            return;
                          }
                          var i = JSON.parse(t.channel_data);
                          r.members.setMyID(i.user_id);
                        }
                        n(e, t);
                      });
                    }),
                    (t.prototype.handleEvent = function (e) {
                      var t = e.event;
                      if (0 === t.indexOf("pusher_internal:"))
                        this.handleInternalEvent(e);
                      else {
                        var n = e.data,
                          r = {};
                        (e.user_id && (r.user_id = e.user_id),
                          this.emit(t, n, r));
                      }
                    }),
                    (t.prototype.handleInternalEvent = function (e) {
                      var t = e.event,
                        n = e.data;
                      switch (t) {
                        case "pusher_internal:subscription_succeeded":
                          this.handleSubscriptionSucceededEvent(e);
                          break;
                        case "pusher_internal:member_added":
                          var r = this.members.addMember(n);
                          this.emit("pusher:member_added", r);
                          break;
                        case "pusher_internal:member_removed":
                          var s = this.members.removeMember(n);
                          s && this.emit("pusher:member_removed", s);
                      }
                    }),
                    (t.prototype.handleSubscriptionSucceededEvent = function (
                      e,
                    ) {
                      ((this.subscriptionPending = !1),
                        (this.subscribed = !0),
                        this.subscriptionCancelled
                          ? this.pusher.unsubscribe(this.name)
                          : (this.members.onSubscription(e.data),
                            this.emit(
                              "pusher:subscription_succeeded",
                              this.members,
                            )));
                    }),
                    (t.prototype.disconnect = function () {
                      (this.members.reset(), e.prototype.disconnect.call(this));
                    }),
                    t
                  );
                })(eO),
                eG = n(1),
                eq = n(0),
                eX =
                  ((u = function (e, t) {
                    return (u =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (u(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eY = (function (e) {
                  function t(t, n, r) {
                    var s = e.call(this, t, n) || this;
                    return ((s.key = null), (s.nacl = r), s);
                  }
                  return (
                    eX(t, e),
                    (t.prototype.authorize = function (t, n) {
                      var r = this;
                      e.prototype.authorize.call(this, t, function (e, t) {
                        if (e) return void n(e, t);
                        var s = t.shared_secret;
                        s
                          ? ((r.key = Object(eq.decode)(s)),
                            delete t.shared_secret,
                            n(null, t))
                          : n(
                              Error(
                                "No shared_secret key in auth payload for encrypted channel: " +
                                  r.name,
                              ),
                              null,
                            );
                      });
                    }),
                    (t.prototype.trigger = function (e, t) {
                      throw new E(
                        "Client events are not currently supported for encrypted channels",
                      );
                    }),
                    (t.prototype.handleEvent = function (t) {
                      var n = t.event,
                        r = t.data;
                      0 === n.indexOf("pusher_internal:") ||
                      0 === n.indexOf("pusher:")
                        ? e.prototype.handleEvent.call(this, t)
                        : this.handleEncryptedEvent(n, r);
                    }),
                    (t.prototype.handleEncryptedEvent = function (e, t) {
                      var n = this;
                      if (!this.key)
                        return void ed.debug(
                          "Received encrypted event before key has been retrieved from the authEndpoint",
                        );
                      if (!t.ciphertext || !t.nonce)
                        return void ed.error(
                          "Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " +
                            t,
                        );
                      var r = Object(eq.decode)(t.ciphertext);
                      if (r.length < this.nacl.secretbox.overheadLength)
                        return void ed.error(
                          "Expected encrypted event ciphertext length to be " +
                            this.nacl.secretbox.overheadLength +
                            ", got: " +
                            r.length,
                        );
                      var s = Object(eq.decode)(t.nonce);
                      if (s.length < this.nacl.secretbox.nonceLength)
                        return void ed.error(
                          "Expected encrypted event nonce length to be " +
                            this.nacl.secretbox.nonceLength +
                            ", got: " +
                            s.length,
                        );
                      var i = this.nacl.secretbox.open(r, s, this.key);
                      if (null === i) {
                        (ed.debug(
                          "Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...",
                        ),
                          this.authorize(
                            this.pusher.connection.socket_id,
                            function (t, a) {
                              t
                                ? ed.error(
                                    "Failed to make a request to the authEndpoint: " +
                                      a +
                                      ". Unable to fetch new key, so dropping encrypted event",
                                  )
                                : null ===
                                    (i = n.nacl.secretbox.open(r, s, n.key))
                                  ? ed.error(
                                      "Failed to decrypt event with new key. Dropping encrypted event",
                                    )
                                  : n.emit(e, n.getDataToEmit(i));
                            },
                          ));
                        return;
                      }
                      this.emit(e, this.getDataToEmit(i));
                    }),
                    (t.prototype.getDataToEmit = function (e) {
                      var t = Object(eG.decode)(e);
                      try {
                        return JSON.parse(t);
                      } catch (e) {
                        return t;
                      }
                    }),
                    t
                  );
                })(eO),
                eK =
                  ((h = function (e, t) {
                    return (h =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (h(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                eJ = (function (e) {
                  function t(t, n) {
                    var r = e.call(this) || this;
                    ((r.state = "initialized"),
                      (r.connection = null),
                      (r.key = t),
                      (r.options = n),
                      (r.timeline = r.options.timeline),
                      (r.usingTLS = r.options.useTLS),
                      (r.errorCallbacks = r.buildErrorCallbacks()),
                      (r.connectionCallbacks = r.buildConnectionCallbacks(
                        r.errorCallbacks,
                      )),
                      (r.handshakeCallbacks = r.buildHandshakeCallbacks(
                        r.errorCallbacks,
                      )));
                    var s = tm.getNetwork();
                    return (
                      s.bind("online", function () {
                        (r.timeline.info({ netinfo: "online" }),
                          ("connecting" === r.state ||
                            "unavailable" === r.state) &&
                            r.retryIn(0));
                      }),
                      s.bind("offline", function () {
                        (r.timeline.info({ netinfo: "offline" }),
                          r.connection && r.sendActivityCheck());
                      }),
                      r.updateStrategy(),
                      r
                    );
                  }
                  return (
                    eK(t, e),
                    (t.prototype.connect = function () {
                      if (!this.connection && !this.runner) {
                        if (!this.strategy.isSupported())
                          return void this.updateState("failed");
                        (this.updateState("connecting"),
                          this.startConnecting(),
                          this.setUnavailableTimer());
                      }
                    }),
                    (t.prototype.send = function (e) {
                      return !!this.connection && this.connection.send(e);
                    }),
                    (t.prototype.send_event = function (e, t, n) {
                      return (
                        !!this.connection && this.connection.send_event(e, t, n)
                      );
                    }),
                    (t.prototype.disconnect = function () {
                      (this.disconnectInternally(),
                        this.updateState("disconnected"));
                    }),
                    (t.prototype.isUsingTLS = function () {
                      return this.usingTLS;
                    }),
                    (t.prototype.startConnecting = function () {
                      var e = this,
                        t = function (n, r) {
                          n
                            ? (e.runner = e.strategy.connect(0, t))
                            : "error" === r.action
                              ? (e.emit("error", {
                                  type: "HandshakeError",
                                  error: r.error,
                                }),
                                e.timeline.error({ handshakeError: r.error }))
                              : (e.abortConnecting(),
                                e.handshakeCallbacks[r.action](r));
                        };
                      this.runner = this.strategy.connect(0, t);
                    }),
                    (t.prototype.abortConnecting = function () {
                      this.runner &&
                        (this.runner.abort(), (this.runner = null));
                    }),
                    (t.prototype.disconnectInternally = function () {
                      (this.abortConnecting(),
                        this.clearRetryTimer(),
                        this.clearUnavailableTimer(),
                        this.connection && this.abandonConnection().close());
                    }),
                    (t.prototype.updateStrategy = function () {
                      this.strategy = this.options.getStrategy({
                        key: this.key,
                        timeline: this.timeline,
                        useTLS: this.usingTLS,
                      });
                    }),
                    (t.prototype.retryIn = function (e) {
                      var t = this;
                      (this.timeline.info({ action: "retry", delay: e }),
                        e > 0 &&
                          this.emit("connecting_in", Math.round(e / 1e3)),
                        (this.retryTimer = new q(e || 0, function () {
                          (t.disconnectInternally(), t.connect());
                        })));
                    }),
                    (t.prototype.clearRetryTimer = function () {
                      this.retryTimer &&
                        (this.retryTimer.ensureAborted(),
                        (this.retryTimer = null));
                    }),
                    (t.prototype.setUnavailableTimer = function () {
                      var e = this;
                      this.unavailableTimer = new q(
                        this.options.unavailableTimeout,
                        function () {
                          e.updateState("unavailable");
                        },
                      );
                    }),
                    (t.prototype.clearUnavailableTimer = function () {
                      this.unavailableTimer &&
                        this.unavailableTimer.ensureAborted();
                    }),
                    (t.prototype.sendActivityCheck = function () {
                      var e = this;
                      (this.stopActivityCheck(),
                        this.connection.ping(),
                        (this.activityTimer = new q(
                          this.options.pongTimeout,
                          function () {
                            (e.timeline.error({
                              pong_timed_out: e.options.pongTimeout,
                            }),
                              e.retryIn(0));
                          },
                        )));
                    }),
                    (t.prototype.resetActivityCheck = function () {
                      var e = this;
                      (this.stopActivityCheck(),
                        this.connection &&
                          !this.connection.handlesActivityChecks() &&
                          (this.activityTimer = new q(
                            this.activityTimeout,
                            function () {
                              e.sendActivityCheck();
                            },
                          )));
                    }),
                    (t.prototype.stopActivityCheck = function () {
                      this.activityTimer && this.activityTimer.ensureAborted();
                    }),
                    (t.prototype.buildConnectionCallbacks = function (e) {
                      var t = this;
                      return Q({}, e, {
                        message: function (e) {
                          (t.resetActivityCheck(), t.emit("message", e));
                        },
                        ping: function () {
                          t.send_event("pusher:pong", {});
                        },
                        activity: function () {
                          t.resetActivityCheck();
                        },
                        error: function (e) {
                          t.emit("error", e);
                        },
                        closed: function () {
                          (t.abandonConnection(),
                            t.shouldRetry() && t.retryIn(1e3));
                        },
                      });
                    }),
                    (t.prototype.buildHandshakeCallbacks = function (e) {
                      var t = this;
                      return Q({}, e, {
                        connected: function (e) {
                          ((t.activityTimeout = Math.min(
                            t.options.activityTimeout,
                            e.activityTimeout,
                            e.connection.activityTimeout || 1 / 0,
                          )),
                            t.clearUnavailableTimer(),
                            t.setConnection(e.connection),
                            (t.socket_id = t.connection.id),
                            t.updateState("connected", {
                              socket_id: t.socket_id,
                            }));
                        },
                      });
                    }),
                    (t.prototype.buildErrorCallbacks = function () {
                      var e = this,
                        t = function (t) {
                          return function (n) {
                            (n.error &&
                              e.emit("error", {
                                type: "WebSocketError",
                                error: n.error,
                              }),
                              t(n));
                          };
                        };
                      return {
                        tls_only: t(function () {
                          ((e.usingTLS = !0), e.updateStrategy(), e.retryIn(0));
                        }),
                        refused: t(function () {
                          e.disconnect();
                        }),
                        backoff: t(function () {
                          e.retryIn(1e3);
                        }),
                        retry: t(function () {
                          e.retryIn(0);
                        }),
                      };
                    }),
                    (t.prototype.setConnection = function (e) {
                      for (var t in ((this.connection = e),
                      this.connectionCallbacks))
                        this.connection.bind(t, this.connectionCallbacks[t]);
                      this.resetActivityCheck();
                    }),
                    (t.prototype.abandonConnection = function () {
                      if (this.connection) {
                        for (var e in (this.stopActivityCheck(),
                        this.connectionCallbacks))
                          this.connection.unbind(
                            e,
                            this.connectionCallbacks[e],
                          );
                        var t = this.connection;
                        return ((this.connection = null), t);
                      }
                    }),
                    (t.prototype.updateState = function (e, t) {
                      var n = this.state;
                      if (((this.state = e), n !== e)) {
                        var r = e;
                        ("connected" === r &&
                          (r += " with new socket ID " + t.socket_id),
                          ed.debug("State changed", n + " -> " + r),
                          this.timeline.info({ state: e, params: t }),
                          this.emit("state_change", {
                            previous: n,
                            current: e,
                          }),
                          this.emit(e, t));
                      }
                    }),
                    (t.prototype.shouldRetry = function () {
                      return (
                        "connecting" === this.state ||
                        "connected" === this.state
                      );
                    }),
                    t
                  );
                })(ex),
                eQ = (function () {
                  function e() {
                    this.channels = {};
                  }
                  return (
                    (e.prototype.add = function (e, t) {
                      return (
                        this.channels[e] ||
                          (this.channels[e] = (function (e, t) {
                            if (0 === e.indexOf("private-encrypted-")) {
                              if (t.config.nacl)
                                return e0.createEncryptedChannel(
                                  e,
                                  t,
                                  t.config.nacl,
                                );
                              throw new E(
                                "Tried to subscribe to a private-encrypted- channel but no nacl implementation available. " +
                                  N("encryptedChannelSupport"),
                              );
                            }
                            return 0 === e.indexOf("private-")
                              ? e0.createPrivateChannel(e, t)
                              : 0 === e.indexOf("presence-")
                                ? e0.createPresenceChannel(e, t)
                                : e0.createChannel(e, t);
                          })(e, t)),
                        this.channels[e]
                      );
                    }),
                    (e.prototype.all = function () {
                      var e, t;
                      return (
                        (e = this.channels),
                        (t = []),
                        en(e, function (e) {
                          t.push(e);
                        }),
                        t
                      );
                    }),
                    (e.prototype.find = function (e) {
                      return this.channels[e];
                    }),
                    (e.prototype.remove = function (e) {
                      var t = this.channels[e];
                      return (delete this.channels[e], t);
                    }),
                    (e.prototype.disconnect = function () {
                      en(this.channels, function (e) {
                        e.disconnect();
                      });
                    }),
                    e
                  );
                })(),
                e0 = {
                  createChannels: function () {
                    return new eQ();
                  },
                  createConnectionManager: function (e, t) {
                    return new eJ(e, t);
                  },
                  createChannel: function (e, t) {
                    return new eH(e, t);
                  },
                  createPrivateChannel: function (e, t) {
                    return new eO(e, t);
                  },
                  createPresenceChannel: function (e, t) {
                    return new eZ(e, t);
                  },
                  createEncryptedChannel: function (e, t, n) {
                    return new eY(e, t, n);
                  },
                  createTimelineSender: function (e, t) {
                    return new eF(e, t);
                  },
                  createAuthorizer: function (e, t) {
                    return t.authorizer ? t.authorizer(e, t) : new e$(e, t);
                  },
                  createHandshake: function (e, t) {
                    return new eV(e, t);
                  },
                  createAssistantToTheTransportManager: function (e, t, n) {
                    return new eA(e, t, n);
                  },
                },
                e1 = (function () {
                  function e(e) {
                    ((this.options = e || {}),
                      (this.livesLeft = this.options.lives || 1 / 0));
                  }
                  return (
                    (e.prototype.getAssistant = function (e) {
                      return e0.createAssistantToTheTransportManager(this, e, {
                        minPingDelay: this.options.minPingDelay,
                        maxPingDelay: this.options.maxPingDelay,
                      });
                    }),
                    (e.prototype.isAlive = function () {
                      return this.livesLeft > 0;
                    }),
                    (e.prototype.reportDeath = function () {
                      this.livesLeft -= 1;
                    }),
                    e
                  );
                })(),
                e2 = (function () {
                  function e(e, t) {
                    ((this.strategies = e),
                      (this.loop = !!t.loop),
                      (this.failFast = !!t.failFast),
                      (this.timeout = t.timeout),
                      (this.timeoutLimit = t.timeoutLimit));
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return eo(this.strategies, J("isSupported"));
                    }),
                    (e.prototype.connect = function (e, t) {
                      var n = this,
                        r = this.strategies,
                        s = 0,
                        i = this.timeout,
                        a = null,
                        l = function (o, c) {
                          c
                            ? t(null, c)
                            : ((s += 1),
                              n.loop && (s %= r.length),
                              s < r.length
                                ? (i &&
                                    ((i *= 2),
                                    n.timeoutLimit &&
                                      (i = Math.min(i, n.timeoutLimit))),
                                  (a = n.tryStrategy(
                                    r[s],
                                    e,
                                    { timeout: i, failFast: n.failFast },
                                    l,
                                  )))
                                : t(!0));
                        };
                      return (
                        (a = this.tryStrategy(
                          r[s],
                          e,
                          { timeout: i, failFast: this.failFast },
                          l,
                        )),
                        {
                          abort: function () {
                            a.abort();
                          },
                          forceMinPriority: function (t) {
                            ((e = t), a && a.forceMinPriority(t));
                          },
                        }
                      );
                    }),
                    (e.prototype.tryStrategy = function (e, t, n, r) {
                      var s = null,
                        i = null;
                      return (
                        n.timeout > 0 &&
                          (s = new q(n.timeout, function () {
                            (i.abort(), r(!0));
                          })),
                        (i = e.connect(t, function (e, t) {
                          (!(e && s && s.isRunning()) || n.failFast) &&
                            (s && s.ensureAborted(), r(e, t));
                        })),
                        {
                          abort: function () {
                            (s && s.ensureAborted(), i.abort());
                          },
                          forceMinPriority: function (e) {
                            i.forceMinPriority(e);
                          },
                        }
                      );
                    }),
                    e
                  );
                })(),
                e5 = (function () {
                  function e(e) {
                    this.strategies = e;
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return eo(this.strategies, J("isSupported"));
                    }),
                    (e.prototype.connect = function (e, t) {
                      var n, r, s, i;
                      return (
                        (n = this.strategies),
                        (r = e),
                        (s = function (e, n) {
                          return function (r, s) {
                            if (((n[e].error = r), r)) {
                              (function (e) {
                                for (var t, n = 0; n < e.length; n++) {
                                  if (((t = e[n]), !t.error)) return !1;
                                }
                                return !0;
                              })(n) && t(!0);
                              return;
                            }
                            (es(n, function (e) {
                              e.forceMinPriority(s.transport.priority);
                            }),
                              t(null, s));
                          };
                        }),
                        (i = ei(n, function (e, t, n, i) {
                          return e.connect(r, s(t, i));
                        })),
                        {
                          abort: function () {
                            es(i, e3);
                          },
                          forceMinPriority: function (e) {
                            es(i, function (t) {
                              t.forceMinPriority(e);
                            });
                          },
                        }
                      );
                    }),
                    e
                  );
                })();
              function e3(e) {
                e.error || e.aborted || (e.abort(), (e.aborted = !0));
              }
              var e4 = (function () {
                function e(e, t, n) {
                  ((this.strategy = e),
                    (this.transports = t),
                    (this.ttl = n.ttl || 18e5),
                    (this.usingTLS = n.useTLS),
                    (this.timeline = n.timeline));
                }
                return (
                  (e.prototype.isSupported = function () {
                    return this.strategy.isSupported();
                  }),
                  (e.prototype.connect = function (e, t) {
                    var n = this.usingTLS,
                      r = (function (e) {
                        var t = tm.getLocalStorage();
                        if (t)
                          try {
                            var n = t[e6(e)];
                            if (n) return JSON.parse(n);
                          } catch (t) {
                            e7(e);
                          }
                        return null;
                      })(n),
                      s = [this.strategy];
                    if (r && r.timestamp + this.ttl >= Y()) {
                      var i = this.transports[r.transport];
                      i &&
                        (this.timeline.info({
                          cached: !0,
                          transport: r.transport,
                          latency: r.latency,
                        }),
                        s.push(
                          new e2([i], {
                            timeout: 2 * r.latency + 1e3,
                            failFast: !0,
                          }),
                        ));
                    }
                    var a = Y(),
                      l = s.pop().connect(e, function r(i, o) {
                        i
                          ? (e7(n),
                            s.length > 0
                              ? ((a = Y()), (l = s.pop().connect(e, r)))
                              : t(i))
                          : ((function (e, t, n) {
                              var r = tm.getLocalStorage();
                              if (r)
                                try {
                                  r[e6(e)] = ec({
                                    timestamp: Y(),
                                    transport: t,
                                    latency: n,
                                  });
                                } catch (e) {}
                            })(n, o.transport.name, Y() - a),
                            t(null, o));
                      });
                    return {
                      abort: function () {
                        l.abort();
                      },
                      forceMinPriority: function (t) {
                        ((e = t), l && l.forceMinPriority(t));
                      },
                    };
                  }),
                  e
                );
              })();
              function e6(e) {
                return "pusherTransport" + (e ? "TLS" : "NonTLS");
              }
              function e7(e) {
                var t = tm.getLocalStorage();
                if (t)
                  try {
                    delete t[e6(e)];
                  } catch (e) {}
              }
              var e9 = (function () {
                  function e(e, t) {
                    var n = t.delay;
                    ((this.strategy = e), (this.options = { delay: n }));
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return this.strategy.isSupported();
                    }),
                    (e.prototype.connect = function (e, t) {
                      var n,
                        r = this.strategy,
                        s = new q(this.options.delay, function () {
                          n = r.connect(e, t);
                        });
                      return {
                        abort: function () {
                          (s.ensureAborted(), n && n.abort());
                        },
                        forceMinPriority: function (t) {
                          ((e = t), n && n.forceMinPriority(t));
                        },
                      };
                    }),
                    e
                  );
                })(),
                e8 = (function () {
                  function e(e, t, n) {
                    ((this.test = e),
                      (this.trueBranch = t),
                      (this.falseBranch = n));
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return (
                        this.test() ? this.trueBranch : this.falseBranch
                      ).isSupported();
                    }),
                    (e.prototype.connect = function (e, t) {
                      return (
                        this.test() ? this.trueBranch : this.falseBranch
                      ).connect(e, t);
                    }),
                    e
                  );
                })(),
                te = (function () {
                  function e(e) {
                    this.strategy = e;
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return this.strategy.isSupported();
                    }),
                    (e.prototype.connect = function (e, t) {
                      var n = this.strategy.connect(e, function (e, r) {
                        (r && n.abort(), t(e, r));
                      });
                      return n;
                    }),
                    e
                  );
                })();
              function tt(e) {
                return function () {
                  return e.isSupported();
                };
              }
              var tn = {
                  getRequest: function (e) {
                    var t = new window.XDomainRequest();
                    return (
                      (t.ontimeout = function () {
                        (e.emit("error", new I()), e.close());
                      }),
                      (t.onerror = function (t) {
                        (e.emit("error", t), e.close());
                      }),
                      (t.onprogress = function () {
                        t.responseText &&
                          t.responseText.length > 0 &&
                          e.onChunk(200, t.responseText);
                      }),
                      (t.onload = function () {
                        (t.responseText &&
                          t.responseText.length > 0 &&
                          e.onChunk(200, t.responseText),
                          e.emit("finished", 200),
                          e.close());
                      }),
                      t
                    );
                  },
                  abortRequest: function (e) {
                    ((e.ontimeout = e.onerror = e.onprogress = e.onload = null),
                      e.abort());
                  },
                },
                tr =
                  ((p = function (e, t) {
                    return (p =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      })(e, t);
                  }),
                  function (e, t) {
                    function n() {
                      this.constructor = e;
                    }
                    (p(e, t),
                      (e.prototype =
                        null === t
                          ? Object.create(t)
                          : ((n.prototype = t.prototype), new n())));
                  }),
                ts = (function (e) {
                  function t(t, n, r) {
                    var s = e.call(this) || this;
                    return ((s.hooks = t), (s.method = n), (s.url = r), s);
                  }
                  return (
                    tr(t, e),
                    (t.prototype.start = function (e) {
                      var t = this;
                      ((this.position = 0),
                        (this.xhr = this.hooks.getRequest(this)),
                        (this.unloader = function () {
                          t.close();
                        }),
                        tm.addUnloadListener(this.unloader),
                        this.xhr.open(this.method, this.url, !0),
                        this.xhr.setRequestHeader &&
                          this.xhr.setRequestHeader(
                            "Content-Type",
                            "application/json",
                          ),
                        this.xhr.send(e));
                    }),
                    (t.prototype.close = function () {
                      (this.unloader &&
                        (tm.removeUnloadListener(this.unloader),
                        (this.unloader = null)),
                        this.xhr &&
                          (this.hooks.abortRequest(this.xhr),
                          (this.xhr = null)));
                    }),
                    (t.prototype.onChunk = function (e, t) {
                      for (;;) {
                        var n = this.advanceBuffer(t);
                        if (n) this.emit("chunk", { status: e, data: n });
                        else break;
                      }
                      this.isBufferTooLong(t) && this.emit("buffer_too_long");
                    }),
                    (t.prototype.advanceBuffer = function (e) {
                      var t = e.slice(this.position),
                        n = t.indexOf("\n");
                      return -1 !== n
                        ? ((this.position += n + 1), t.slice(0, n))
                        : null;
                    }),
                    (t.prototype.isBufferTooLong = function (e) {
                      return this.position === e.length && e.length > 262144;
                    }),
                    t
                  );
                })(ex);
              (((m = g || (g = {}))[(m.CONNECTING = 0)] = "CONNECTING"),
                (m[(m.OPEN = 1)] = "OPEN"),
                (m[(m.CLOSED = 3)] = "CLOSED"));
              var ti = g,
                ta = 1,
                tl = (function () {
                  function e(e, t) {
                    var n, r;
                    ((this.hooks = e),
                      (this.session =
                        tc(1e3) +
                        "/" +
                        (function (e) {
                          for (var t = [], n = 0; n < 8; n++)
                            t.push(tc(32).toString(32));
                          return t.join("");
                        })(8)),
                      (this.location =
                        ((n = t),
                        {
                          base: (r = /([^\?]*)\/*(\??.*)/.exec(n))[1],
                          queryString: r[2],
                        })),
                      (this.readyState = ti.CONNECTING),
                      this.openStream());
                  }
                  return (
                    (e.prototype.send = function (e) {
                      return this.sendRaw(JSON.stringify([e]));
                    }),
                    (e.prototype.ping = function () {
                      this.hooks.sendHeartbeat(this);
                    }),
                    (e.prototype.close = function (e, t) {
                      this.onClose(e, t, !0);
                    }),
                    (e.prototype.sendRaw = function (e) {
                      if (this.readyState !== ti.OPEN) return !1;
                      try {
                        var t, n;
                        return (
                          tm
                            .createSocketRequest(
                              "POST",
                              to(
                                ((t = this.location),
                                (n = this.session),
                                t.base + "/" + n + "/xhr_send"),
                              ),
                            )
                            .start(e),
                          !0
                        );
                      } catch (e) {
                        return !1;
                      }
                    }),
                    (e.prototype.reconnect = function () {
                      (this.closeStream(), this.openStream());
                    }),
                    (e.prototype.onClose = function (e, t, n) {
                      (this.closeStream(),
                        (this.readyState = ti.CLOSED),
                        this.onclose &&
                          this.onclose({ code: e, reason: t, wasClean: n }));
                    }),
                    (e.prototype.onChunk = function (e) {
                      if (200 === e.status) {
                        var t;
                        switch (
                          (this.readyState === ti.OPEN && this.onActivity(),
                          e.data.slice(0, 1))
                        ) {
                          case "o":
                            ((t = JSON.parse(e.data.slice(1) || "{}")),
                              this.onOpen(t));
                            break;
                          case "a":
                            t = JSON.parse(e.data.slice(1) || "[]");
                            for (var n = 0; n < t.length; n++)
                              this.onEvent(t[n]);
                            break;
                          case "m":
                            ((t = JSON.parse(e.data.slice(1) || "null")),
                              this.onEvent(t));
                            break;
                          case "h":
                            this.hooks.onHeartbeat(this);
                            break;
                          case "c":
                            ((t = JSON.parse(e.data.slice(1) || "[]")),
                              this.onClose(t[0], t[1], !0));
                        }
                      }
                    }),
                    (e.prototype.onOpen = function (e) {
                      var t, n, r;
                      this.readyState === ti.CONNECTING
                        ? (e &&
                            e.hostname &&
                            (this.location.base =
                              ((t = this.location.base),
                              (n = e.hostname),
                              (r = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(
                                t,
                              ))[1] +
                                n +
                                r[3])),
                          (this.readyState = ti.OPEN),
                          this.onopen && this.onopen())
                        : this.onClose(1006, "Server lost session", !0);
                    }),
                    (e.prototype.onEvent = function (e) {
                      this.readyState === ti.OPEN &&
                        this.onmessage &&
                        this.onmessage({ data: e });
                    }),
                    (e.prototype.onActivity = function () {
                      this.onactivity && this.onactivity();
                    }),
                    (e.prototype.onError = function (e) {
                      this.onerror && this.onerror(e);
                    }),
                    (e.prototype.openStream = function () {
                      var e = this;
                      ((this.stream = tm.createSocketRequest(
                        "POST",
                        to(
                          this.hooks.getReceiveURL(this.location, this.session),
                        ),
                      )),
                        this.stream.bind("chunk", function (t) {
                          e.onChunk(t);
                        }),
                        this.stream.bind("finished", function (t) {
                          e.hooks.onFinished(e, t);
                        }),
                        this.stream.bind("buffer_too_long", function () {
                          e.reconnect();
                        }));
                      try {
                        this.stream.start();
                      } catch (t) {
                        K(function () {
                          (e.onError(t),
                            e.onClose(1006, "Could not start streaming", !1));
                        });
                      }
                    }),
                    (e.prototype.closeStream = function () {
                      this.stream &&
                        (this.stream.unbind_all(),
                        this.stream.close(),
                        (this.stream = null));
                    }),
                    e
                  );
                })();
              function to(e) {
                var t = -1 === e.indexOf("?") ? "?" : "&";
                return e + t + "t=" + +new Date() + "&n=" + ta++;
              }
              function tc(e) {
                return Math.floor(Math.random() * e);
              }
              var td = {
                  getReceiveURL: function (e, t) {
                    return e.base + "/" + t + "/xhr_streaming" + e.queryString;
                  },
                  onHeartbeat: function (e) {
                    e.sendRaw("[]");
                  },
                  sendHeartbeat: function (e) {
                    e.sendRaw("[]");
                  },
                  onFinished: function (e, t) {
                    e.onClose(1006, "Connection interrupted (" + t + ")", !1);
                  },
                },
                tu = {
                  getReceiveURL: function (e, t) {
                    return e.base + "/" + t + "/xhr" + e.queryString;
                  },
                  onHeartbeat: function () {},
                  sendHeartbeat: function (e) {
                    e.sendRaw("[]");
                  },
                  onFinished: function (e, t) {
                    200 === t
                      ? e.reconnect()
                      : e.onClose(
                          1006,
                          "Connection interrupted (" + t + ")",
                          !1,
                        );
                  },
                },
                th = {
                  getRequest: function (e) {
                    var t = new (tm.getXHRAPI())();
                    return (
                      (t.onreadystatechange = t.onprogress =
                        function () {
                          switch (t.readyState) {
                            case 3:
                              t.responseText &&
                                t.responseText.length > 0 &&
                                e.onChunk(t.status, t.responseText);
                              break;
                            case 4:
                              (t.responseText &&
                                t.responseText.length > 0 &&
                                e.onChunk(t.status, t.responseText),
                                e.emit("finished", t.status),
                                e.close());
                          }
                        }),
                      t
                    );
                  },
                  abortRequest: function (e) {
                    ((e.onreadystatechange = null), e.abort());
                  },
                },
                tp = {
                  createStreamingSocket: function (e) {
                    return this.createSocket(td, e);
                  },
                  createPollingSocket: function (e) {
                    return this.createSocket(tu, e);
                  },
                  createSocket: function (e, t) {
                    return new tl(e, t);
                  },
                  createXHR: function (e, t) {
                    return this.createRequest(th, e, t);
                  },
                  createRequest: function (e, t, n) {
                    return new ts(e, t, n);
                  },
                };
              tp.createXDR = function (e, t) {
                return this.createRequest(tn, e, t);
              };
              var tm = {
                nextAuthCallbackID: 1,
                auth_callbacks: {},
                ScriptReceivers: b,
                DependenciesReceivers: C,
                getDefaultStrategy: function (e, t, n) {
                  var r,
                    s = {};
                  function i(t, r, i, a, l) {
                    var o = n(e, t, r, i, a, l);
                    return ((s[t] = o), o);
                  }
                  var a = Object.assign({}, t, {
                      hostNonTLS: e.wsHost + ":" + e.wsPort,
                      hostTLS: e.wsHost + ":" + e.wssPort,
                      httpPath: e.wsPath,
                    }),
                    l = Object.assign({}, a, { useTLS: !0 }),
                    o = Object.assign({}, t, {
                      hostNonTLS: e.httpHost + ":" + e.httpPort,
                      hostTLS: e.httpHost + ":" + e.httpsPort,
                      httpPath: e.httpPath,
                    }),
                    c = { loop: !0, timeout: 15e3, timeoutLimit: 6e4 },
                    d = new e1({
                      lives: 2,
                      minPingDelay: 1e4,
                      maxPingDelay: e.activityTimeout,
                    }),
                    u = new e1({
                      lives: 2,
                      minPingDelay: 1e4,
                      maxPingDelay: e.activityTimeout,
                    }),
                    h = i("ws", "ws", 3, a, d),
                    p = i("wss", "ws", 3, l, d),
                    m = i("sockjs", "sockjs", 1, o),
                    f = i("xhr_streaming", "xhr_streaming", 1, o, u),
                    g = i("xdr_streaming", "xdr_streaming", 1, o, u),
                    x = i("xhr_polling", "xhr_polling", 1, o),
                    v = i("xdr_polling", "xdr_polling", 1, o),
                    b = new e2([h], c),
                    y = new e2([p], c),
                    j = new e2([m], c),
                    C = new e2([new e8(tt(f), f, g)], c),
                    w = new e2([new e8(tt(x), x, v)], c),
                    k = new e2(
                      [
                        new e8(
                          tt(C),
                          new e5([C, new e9(w, { delay: 4e3 })]),
                          w,
                        ),
                      ],
                      c,
                    ),
                    N = new e8(tt(k), k, j);
                  return (
                    (r = new e5(
                      t.useTLS
                        ? [b, new e9(N, { delay: 2e3 })]
                        : [
                            b,
                            new e9(y, { delay: 2e3 }),
                            new e9(N, { delay: 5e3 }),
                          ],
                    )),
                    new e4(new te(new e8(tt(h), r, N)), s, {
                      ttl: 18e5,
                      timeline: t.timeline,
                      useTLS: t.useTLS,
                    })
                  );
                },
                Transports: eM,
                transportConnectionInitializer: function () {
                  var e = this;
                  (e.timeline.info(
                    e.buildTimelineMessage({
                      transport: e.name + (e.options.useTLS ? "s" : ""),
                    }),
                  ),
                    e.hooks.isInitialized()
                      ? e.changeState("initialized")
                      : e.hooks.file
                        ? (e.changeState("initializing"),
                          w.load(
                            e.hooks.file,
                            { useTLS: e.options.useTLS },
                            function (t, n) {
                              e.hooks.isInitialized()
                                ? (e.changeState("initialized"), n(!0))
                                : (t && e.onError(t), e.onClose(), n(!1));
                            },
                          ))
                        : e.onClose());
                },
                HTTPFactory: tp,
                TimelineTransport: {
                  name: "jsonp",
                  getAgent: function (e, t) {
                    return function (n, r) {
                      var s =
                          "http" +
                          (t ? "s" : "") +
                          "://" +
                          (e.host || e.options.host) +
                          e.options.path,
                        i = tm.createJSONPRequest(s, n),
                        a = tm.ScriptReceivers.create(function (t, n) {
                          (b.remove(a),
                            i.cleanup(),
                            n && n.host && (e.host = n.host),
                            r && r(t, n));
                        });
                      i.send(a);
                    };
                  },
                },
                getXHRAPI: function () {
                  return window.XMLHttpRequest;
                },
                getWebSocketAPI: function () {
                  return window.WebSocket || window.MozWebSocket;
                },
                setup: function (e) {
                  var t = this;
                  window.Pusher = e;
                  var n = function () {
                    t.onDocumentBody(e.ready);
                  };
                  window.JSON ? n() : w.load("json2", {}, n);
                },
                getDocument: function () {
                  return document;
                },
                getProtocol: function () {
                  return this.getDocument().location.protocol;
                },
                getAuthorizers: function () {
                  return { ajax: P, jsonp: eu };
                },
                onDocumentBody: function (e) {
                  var t = this;
                  document.body
                    ? e()
                    : setTimeout(function () {
                        t.onDocumentBody(e);
                      }, 0);
                },
                createJSONPRequest: function (e, t) {
                  return new ep(e, t);
                },
                createScriptRequest: function (e) {
                  return new eh(e);
                },
                getLocalStorage: function () {
                  try {
                    return window.localStorage;
                  } catch (e) {
                    return;
                  }
                },
                createXHR: function () {
                  return this.getXHRAPI()
                    ? this.createXMLHttpRequest()
                    : this.createMicrosoftXHR();
                },
                createXMLHttpRequest: function () {
                  return new (this.getXHRAPI())();
                },
                createMicrosoftXHR: function () {
                  return new ActiveXObject("Microsoft.XMLHTTP");
                },
                getNetwork: function () {
                  return e_;
                },
                createWebSocket: function (e) {
                  return new (this.getWebSocketAPI())(e);
                },
                createSocketRequest: function (e, t) {
                  if (this.isXHRSupported())
                    return this.HTTPFactory.createXHR(e, t);
                  if (this.isXDRSupported(0 === t.indexOf("https:")))
                    return this.HTTPFactory.createXDR(e, t);
                  throw "Cross-origin HTTP requests are not supported";
                },
                isXHRSupported: function () {
                  var e = this.getXHRAPI();
                  return !!e && void 0 !== new e().withCredentials;
                },
                isXDRSupported: function (e) {
                  var t = this.getProtocol();
                  return (
                    !!window.XDomainRequest && t === (e ? "https:" : "http:")
                  );
                },
                addUnloadListener: function (e) {
                  void 0 !== window.addEventListener
                    ? window.addEventListener("unload", e, !1)
                    : void 0 !== window.attachEvent &&
                      window.attachEvent("onunload", e);
                },
                removeUnloadListener: function (e) {
                  void 0 !== window.addEventListener
                    ? window.removeEventListener("unload", e, !1)
                    : void 0 !== window.detachEvent &&
                      window.detachEvent("onunload", e);
                },
              };
              (((f = x || (x = {}))[(f.ERROR = 3)] = "ERROR"),
                (f[(f.INFO = 6)] = "INFO"),
                (f[(f.DEBUG = 7)] = "DEBUG"));
              var tf = x,
                tg = (function () {
                  function e(e, t, n) {
                    ((this.key = e),
                      (this.session = t),
                      (this.events = []),
                      (this.options = n || {}),
                      (this.sent = 0),
                      (this.uniqueID = 0));
                  }
                  return (
                    (e.prototype.log = function (e, t) {
                      e <= this.options.level &&
                        (this.events.push(Q({}, t, { timestamp: Y() })),
                        this.options.limit &&
                          this.events.length > this.options.limit &&
                          this.events.shift());
                    }),
                    (e.prototype.error = function (e) {
                      this.log(tf.ERROR, e);
                    }),
                    (e.prototype.info = function (e) {
                      this.log(tf.INFO, e);
                    }),
                    (e.prototype.debug = function (e) {
                      this.log(tf.DEBUG, e);
                    }),
                    (e.prototype.isEmpty = function () {
                      return 0 === this.events.length;
                    }),
                    (e.prototype.send = function (e, t) {
                      var n = this,
                        r = Q(
                          {
                            session: this.session,
                            bundle: this.sent + 1,
                            key: this.key,
                            lib: "js",
                            version: this.options.version,
                            cluster: this.options.cluster,
                            features: this.options.features,
                            timeline: this.events,
                          },
                          this.options.params,
                        );
                      return (
                        (this.events = []),
                        e(r, function (e, r) {
                          (!e && n.sent++, t && t(e, r));
                        }),
                        !0
                      );
                    }),
                    (e.prototype.generateUniqueID = function () {
                      return (this.uniqueID++, this.uniqueID);
                    }),
                    e
                  );
                })(),
                tx = (function () {
                  function e(e, t, n, r) {
                    ((this.name = e),
                      (this.priority = t),
                      (this.transport = n),
                      (this.options = r || {}));
                  }
                  return (
                    (e.prototype.isSupported = function () {
                      return this.transport.isSupported({
                        useTLS: this.options.useTLS,
                      });
                    }),
                    (e.prototype.connect = function (e, t) {
                      var n = this;
                      if (!this.isSupported()) return tv(new A(), t);
                      if (this.priority < e) return tv(new L(), t);
                      var r = !1,
                        s = this.transport.createConnection(
                          this.name,
                          this.priority,
                          this.options.key,
                          this.options,
                        ),
                        i = null,
                        a = function () {
                          (s.unbind("initialized", a), s.connect());
                        },
                        l = function () {
                          i = e0.createHandshake(s, function (e) {
                            ((r = !0), d(), t(null, e));
                          });
                        },
                        o = function (e) {
                          (d(), t(e));
                        },
                        c = function () {
                          (d(), t(new T(ec(s))));
                        },
                        d = function () {
                          (s.unbind("initialized", a),
                            s.unbind("open", l),
                            s.unbind("error", o),
                            s.unbind("closed", c));
                        };
                      return (
                        s.bind("initialized", a),
                        s.bind("open", l),
                        s.bind("error", o),
                        s.bind("closed", c),
                        s.initialize(),
                        {
                          abort: function () {
                            r || (d(), i ? i.close() : s.close());
                          },
                          forceMinPriority: function (e) {
                            !r && n.priority < e && (i ? i.close() : s.close());
                          },
                        }
                      );
                    }),
                    e
                  );
                })();
              function tv(e, t) {
                return (
                  K(function () {
                    t(e);
                  }),
                  { abort: function () {}, forceMinPriority: function () {} }
                );
              }
              var tb = tm.Transports,
                ty = function (e, t, n, r, s, i) {
                  var a,
                    l = tb[n];
                  if (!l) throw new _(n);
                  return (
                    (e.enabledTransports &&
                      -1 === et(e.enabledTransports, t)) ||
                    (e.disabledTransports && -1 !== et(e.disabledTransports, t))
                      ? (a = tj)
                      : ((s = Object.assign(
                          { ignoreNullOrigin: e.ignoreNullOrigin },
                          s,
                        )),
                        (a = new tx(t, r, i ? i.getAssistant(l) : l, s))),
                    a
                  );
                },
                tj = {
                  isSupported: function () {
                    return !1;
                  },
                  connect: function (e, t) {
                    var n = K(function () {
                      t(new A());
                    });
                    return {
                      abort: function () {
                        n.ensureAborted();
                      },
                      forceMinPriority: function () {},
                    };
                  },
                };
              function tC(e) {
                return "ws-" + e + ".pusher.com";
              }
              var tw = (function () {
                  function e(t, n) {
                    var r,
                      s,
                      i,
                      a,
                      l,
                      o = this;
                    if (
                      ((function (e) {
                        if (null == e)
                          throw "You must pass your app key when you instantiate Pusher.";
                      })(t),
                      !(n = n || {}).cluster && !(n.wsHost || n.httpHost))
                    ) {
                      var c = N("javascriptQuickStart");
                      ed.warn(
                        "You should always specify a cluster when connecting. " +
                          c,
                      );
                    }
                    ("disableStats" in n &&
                      ed.warn(
                        "The disableStats option is deprecated in favor of enableStats",
                      ),
                      (this.key = t),
                      (this.config =
                        ((l = {
                          activityTimeout: (a = n).activityTimeout || 12e4,
                          authEndpoint: a.authEndpoint || "/pusher/auth",
                          authTransport: a.authTransport || "ajax",
                          cluster: a.cluster || "mt1",
                          httpPath: a.httpPath || "/pusher",
                          httpPort: a.httpPort || 80,
                          httpsPort: a.httpsPort || 443,
                          pongTimeout: a.pongTimeout || 3e4,
                          statsHost: a.statsHost || "stats.pusher.com",
                          unavailableTimeout: a.unavailableTimeout || 1e4,
                          wsPath: a.wsPath || "",
                          wsPort: a.wsPort || 80,
                          wssPort: a.wssPort || 443,
                          enableStats:
                            "enableStats" in (r = a)
                              ? r.enableStats
                              : "disableStats" in r && !r.disableStats,
                          httpHost: (s = a).httpHost
                            ? s.httpHost
                            : s.cluster
                              ? "sockjs-" + s.cluster + ".pusher.com"
                              : "sockjs.pusher.com",
                          useTLS: (function (e) {
                            if ("https:" === tm.getProtocol());
                            else if (!1 === e.forceTLS) return !1;
                            return !0;
                          })(a),
                          wsHost: (i = a).wsHost
                            ? i.wsHost
                            : i.cluster
                              ? tC(i.cluster)
                              : tC("mt1"),
                        }),
                        "auth" in a && (l.auth = a.auth),
                        "authorizer" in a && (l.authorizer = a.authorizer),
                        "disabledTransports" in a &&
                          (l.disabledTransports = a.disabledTransports),
                        "enabledTransports" in a &&
                          (l.enabledTransports = a.enabledTransports),
                        "ignoreNullOrigin" in a &&
                          (l.ignoreNullOrigin = a.ignoreNullOrigin),
                        "timelineParams" in a &&
                          (l.timelineParams = a.timelineParams),
                        "nacl" in a && (l.nacl = a.nacl),
                        l)),
                      (this.channels = e0.createChannels()),
                      (this.global_emitter = new ex()),
                      (this.sessionID = Math.floor(1e9 * Math.random())),
                      (this.timeline = new tg(this.key, this.sessionID, {
                        cluster: this.config.cluster,
                        features: e.getClientFeatures(),
                        params: this.config.timelineParams || {},
                        limit: 50,
                        level: tf.INFO,
                        version: y,
                      })),
                      this.config.enableStats &&
                        (this.timelineSender = e0.createTimelineSender(
                          this.timeline,
                          {
                            host: this.config.statsHost,
                            path: "/timeline/v2/" + tm.TimelineTransport.name,
                          },
                        )),
                      (this.connection = e0.createConnectionManager(this.key, {
                        getStrategy: function (e) {
                          return tm.getDefaultStrategy(o.config, e, ty);
                        },
                        timeline: this.timeline,
                        activityTimeout: this.config.activityTimeout,
                        pongTimeout: this.config.pongTimeout,
                        unavailableTimeout: this.config.unavailableTimeout,
                        useTLS: !!this.config.useTLS,
                      })),
                      this.connection.bind("connected", function () {
                        (o.subscribeAll(),
                          o.timelineSender &&
                            o.timelineSender.send(o.connection.isUsingTLS()));
                      }),
                      this.connection.bind("message", function (e) {
                        var t = 0 === e.event.indexOf("pusher_internal:");
                        if (e.channel) {
                          var n = o.channel(e.channel);
                          n && n.handleEvent(e);
                        }
                        t || o.global_emitter.emit(e.event, e.data);
                      }),
                      this.connection.bind("connecting", function () {
                        o.channels.disconnect();
                      }),
                      this.connection.bind("disconnected", function () {
                        o.channels.disconnect();
                      }),
                      this.connection.bind("error", function (e) {
                        ed.warn(e);
                      }),
                      e.instances.push(this),
                      this.timeline.info({ instances: e.instances.length }),
                      e.isReady && this.connect());
                  }
                  return (
                    (e.ready = function () {
                      e.isReady = !0;
                      for (var t = 0, n = e.instances.length; t < n; t++)
                        e.instances[t].connect();
                    }),
                    (e.getClientFeatures = function () {
                      return er(
                        el({ ws: tm.Transports.ws }, function (e) {
                          return e.isSupported({});
                        }),
                      );
                    }),
                    (e.prototype.channel = function (e) {
                      return this.channels.find(e);
                    }),
                    (e.prototype.allChannels = function () {
                      return this.channels.all();
                    }),
                    (e.prototype.connect = function () {
                      if (
                        (this.connection.connect(),
                        this.timelineSender && !this.timelineSenderTimer)
                      ) {
                        var e = this.connection.isUsingTLS(),
                          t = this.timelineSender;
                        this.timelineSenderTimer = new X(6e4, function () {
                          t.send(e);
                        });
                      }
                    }),
                    (e.prototype.disconnect = function () {
                      (this.connection.disconnect(),
                        this.timelineSenderTimer &&
                          (this.timelineSenderTimer.ensureAborted(),
                          (this.timelineSenderTimer = null)));
                    }),
                    (e.prototype.bind = function (e, t, n) {
                      return (this.global_emitter.bind(e, t, n), this);
                    }),
                    (e.prototype.unbind = function (e, t, n) {
                      return (this.global_emitter.unbind(e, t, n), this);
                    }),
                    (e.prototype.bind_global = function (e) {
                      return (this.global_emitter.bind_global(e), this);
                    }),
                    (e.prototype.unbind_global = function (e) {
                      return (this.global_emitter.unbind_global(e), this);
                    }),
                    (e.prototype.unbind_all = function (e) {
                      return (this.global_emitter.unbind_all(), this);
                    }),
                    (e.prototype.subscribeAll = function () {
                      var e;
                      for (e in this.channels.channels)
                        this.channels.channels.hasOwnProperty(e) &&
                          this.subscribe(e);
                    }),
                    (e.prototype.subscribe = function (e) {
                      var t = this.channels.add(e, this);
                      return (
                        t.subscriptionPending && t.subscriptionCancelled
                          ? t.reinstateSubscription()
                          : t.subscriptionPending ||
                            "connected" !== this.connection.state ||
                            t.subscribe(),
                        t
                      );
                    }),
                    (e.prototype.unsubscribe = function (e) {
                      var t = this.channels.find(e);
                      t && t.subscriptionPending
                        ? t.cancelSubscription()
                        : (t = this.channels.remove(e)) &&
                          t.subscribed &&
                          t.unsubscribe();
                    }),
                    (e.prototype.send_event = function (e, t, n) {
                      return this.connection.send_event(e, t, n);
                    }),
                    (e.prototype.shouldUseTLS = function () {
                      return this.config.useTLS;
                    }),
                    (e.instances = []),
                    (e.isReady = !1),
                    (e.logToConsole = !1),
                    (e.Runtime = tm),
                    (e.ScriptReceivers = tm.ScriptReceivers),
                    (e.DependenciesReceivers = tm.DependenciesReceivers),
                    (e.auth_callbacks = tm.auth_callbacks),
                    e
                  );
                })(),
                tk = (t.default = tw);
              tm.setup(tw);
            },
          ],
          t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var s = (t[r] = { i: r, l: !1, exports: {} });
          return (e[r].call(s.exports, s, s.exports, n), (s.l = !0), s.exports);
        }
        return (
          (n.m = e),
          (n.c = t),
          (n.d = function (e, t, r) {
            n.o(e, t) ||
              Object.defineProperty(e, t, { enumerable: !0, get: r });
          }),
          (n.r = function (e) {
            ("undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e, "__esModule", { value: !0 }));
          }),
          (n.t = function (e, t) {
            if (
              (1 & t && (e = n(e)),
              8 & t || (4 & t && "object" == typeof e && e && e.__esModule))
            )
              return e;
            var r = Object.create(null);
            if (
              (n.r(r),
              Object.defineProperty(r, "default", { enumerable: !0, value: e }),
              2 & t && "string" != typeof e)
            )
              for (var s in e)
                n.d(
                  r,
                  s,
                  function (t) {
                    return e[t];
                  }.bind(null, s),
                );
            return r;
          }),
          (n.n = function (e) {
            var t =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return (n.d(t, "a", t), t);
          }),
          (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (n.p = ""),
          n((n.s = 2))
        );
      })()));
  },
  576163,
  (e) => {
    e.v({
      actions: "header-module__XxgZea__actions",
      header: "header-module__XxgZea__header",
      toggle: "header-module__XxgZea__toggle",
      url: "header-module__XxgZea__url",
    });
  },
  900547,
  (e) => {
    "use strict";
    let t, n, r, s, i;
    var a = e.i(324834);
    e.i(563948);
    var l = e.i(407562),
      o = e.i(576191),
      c = e.i(226368),
      d = e.i(209819),
      u = e.i(304649),
      h = e.i(696871),
      p = e.i(532822),
      m = e.i(449381),
      f = e.i(846139),
      g = e.i(296046),
      x = e.i(301331),
      v = e.i(92479),
      b = e.i(767373),
      y = e.i(729602),
      j = e.i(296900),
      C = e.i(295224);
    e.i(439235);
    var w = e.i(163060);
    let k = null,
      N = () => (
        k || (k = new w.default("dc5054126c8a894f78e9", { cluster: "us3" })),
        k
      );
    var M = e.i(472166),
      S = e.i(521598),
      I = e.i(418625),
      L = e.i(53223),
      T = e.i(919012),
      E = (0, T.createServerReference)(
        "402b6b7cd342f10c90d6913e32b771e16b644d3f4e",
        T.callServer,
        void 0,
        T.findSourceMapURL,
        "deleteMessage",
      ),
      _ = e.i(307778),
      A = e.i(604448),
      R = e.i(246300),
      P = e.i(686832),
      D = e.i(176248),
      V = e.i(120485),
      $ = e.i(297239),
      F = e.i(70165),
      z = e.i(848258);
    function H() {
      let { data: e, mutate: t } = (0, I.default)(
        "showDeleteMessageDialog",
        null,
        { fallbackData: null },
      );
      return { showConfirmDelete: e, setConfirmDelete: t };
    }
    function B({ messages: e, targetMessageId: t }) {
      let n = e.find((e) => "user" === e.role && e.id === t);
      if (!n) return null;
      let r =
          (0, b.computeForkKeyOptions)(e).get(
            n.parentId || b.ROOT_MESSAGE_KEY,
          ) || [],
        s = r.findIndex((e) => e && e.some((e) => e === n.id)),
        i = r[s];
      return r.length > 1
        ? (0, b.getLeafNodeForkKey)([...e], r[0 === s ? 1 : s - 1], "right")
        : n.parentId && i
          ? i.slice(0, -1)
          : null;
    }
    function O() {
      let e = (0, m.useActiveBlockState)(),
        { history: t } = (0, x.useBlockHistory)({
          blockId: e?.id,
          searchAll: !0,
        }),
        { scrollToHash: n } = (0, z.useScrollToMessage)(),
        { setPulsePreview: r } = (0, x.useSetPulsePreview)(),
        s = (0, m.useSetActiveBlockView)(),
        { ensureBlockSource: i } = (0, x.useBlockSource)();
      return {
        switchToBlock: (0, o.useCallback)(
          (a) => {
            if (e?.messageId && a.includes(e.messageId)) return;
            let l = { forkKeyIx: -1, block: null };
            for (let e of t) {
              let t = a.findIndex((t) => t === e.messageId);
              !(t < 0) &&
                (t < l.forkKeyIx || ((l.forkKeyIx = t), (l.block = e)));
            }
            let { block: o } = l;
            o &&
              (o.isLoading && i(o.id),
              s(!0, o),
              r({ blockId: o.id }),
              n(o.messageId, 150, !0, a));
          },
          [t, n, i, s, r, e?.messageId],
        ),
      };
    }
    function U() {
      let {
          chatId: e,
          messages: t,
          activeForkKey: n,
        } = (0, v.useChatMessages)(),
        { isStreaming: r, isLoading: s } = (0, v.useChatLoadingState)(),
        i = (0, v.useSetChatState)(),
        d = (0, m.useActiveBlockState)(),
        { showConfirmDelete: u, setConfirmDelete: h } = H(),
        { setData: p, data: f } = (0, R.useChatHistory)(),
        [g, x] = (0, o.useTransition)(),
        y = (0, m.useSetActiveBlockView)(),
        { stopLlmResponse: j } = (0, M.useV0Chat)(),
        C = (0, c.useRouter)(),
        w = (0, F.useIsMobile)(),
        k = (0, $.useT)(),
        { switchToBlock: N } = O(),
        S = (0, o.useMemo)(
          () => (u ? B({ messages: t, targetMessageId: u }) : null),
          [t, u],
        ),
        I = (0, o.useCallback)(() => {
          u &&
            !g &&
            (h(null),
            (r || s) && j(),
            x(async () => {
              let r = f ? [...f] : [],
                s = [...t],
                a = d ? { ...d } : null;
              if (!t.find((e) => "user" === e.role && e.id === u))
                return void l.toast.error(
                  "Message not found. Please try again.",
                );
              try {
                if (
                  ((0, L.track)("SubmitDeleteUserMessage", { messageId: u }), S)
                ) {
                  w ||
                    setTimeout(() => {
                      document.getElementById("chat-main-textarea")?.focus();
                    }, 0);
                  let n = new Set(
                      (0, b.getChildMessageIds)(
                        t.map((e) => ({ ...e, messageId: e.id })),
                        u,
                      ),
                    ),
                    r = t.filter(
                      (e) =>
                        !(("user" === e.role && e.id === u) || n.has(e.id)),
                    ),
                    s = await E({ payload: { messageId: u, chatId: e } });
                  if (s?.error) throw Error(s.error);
                  (N(S),
                    i({ messages: r, activeForkKey: S, saveLeafMessageId: !0 }),
                    l.toast.success("Messages successfully deleted."));
                } else {
                  (y(!1), p((t) => t.filter((t) => t.chatId !== e)));
                  let t = await (0, A.deleteChat)({ payload: { chatId: e } });
                  if (t?.error) throw Error(t.error);
                  (l.toast.success("Messages successfully deleted."),
                    C.push("/chat"));
                }
                h(void 0);
              } catch (t) {
                let e = (0, V.handleChatError)(t);
                (p((e) => r),
                  i({ messages: s, activeForkKey: n }),
                  a && y(!0, a),
                  e ||
                    l.toast.error("Something went wrong. Please try again."));
              }
            }));
        }, [d, n, f, e, s, w, g, r, t, S, C, y, p, i, h, u, j, N]),
        T =
          null !== S
            ? {
                TITLE: k("deleteMessageDialog.deleteMessageTitle"),
                DESCRIPTION: k("deleteMessageDialog.deleteMessageDescription"),
              }
            : {
                TITLE: k("deleteMessageDialog.deleteChatTitle"),
                DESCRIPTION: k("deleteMessageDialog.deleteChatDescription"),
              };
      return (0, a.jsxs)(P.Modal, {
        onOpenChange: (e) => {
          e || h(null);
        },
        open: null !== u,
        children: [
          (0, a.jsxs)(P.ModalHeader, {
            children: [
              (0, a.jsx)(P.ModalTitle, { children: T.TITLE }),
              (0, a.jsx)(P.ModalDescription, { children: T.DESCRIPTION }),
            ],
          }),
          (0, a.jsxs)(P.ModalFooter, {
            children: [
              (0, a.jsx)(P.ModalClose, {
                asChild: !0,
                children: (0, a.jsx)(D.Button, {
                  size: "sm",
                  variant: "secondary",
                  children: k("deleteMessageDialog.cancel"),
                }),
              }),
              (0, a.jsx)(D.Button, {
                "data-testid": "confirm-delete-message",
                disabled: g,
                onClick: I,
                size: "sm",
                variant: "destructive",
                children: g
                  ? (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(_.IconSpinner, { className: "size-4" }),
                        k("deleteMessageDialog.deleting"),
                      ],
                    })
                  : k("deleteMessageDialog.delete"),
              }),
            ],
          }),
        ],
      });
    }
    var W = e.i(32170),
      Z = e.i(242759);
    let G = h.PUSHER_EVENTS.latestChat.getEventName();
    var q = e.i(7284),
      X = e.i(707827);
    function Y() {
      let { chatId: e } = (0, v.useChatId)(),
        { data: t } = (0, I.default)(
          null,
          (e) => fetch(e).then((e) => e.text()),
          { refreshInterval: 5e3, fallbackData: "OK" },
        );
      return null;
    }
    var K = e.i(323194),
      J = e.i(726718),
      Q = e.i(389140),
      ee = e.i(654335),
      et = e.i(479273),
      en = e.i(556355),
      er = e.i(905732),
      es = e.i(990131),
      ei = e.i(276302),
      ea = e.i(889610),
      el = e.i(347853),
      eo = e.i(120282);
    let ec = ({ href: e, children: t, external: n, ...r }) =>
      n
        ? (0, a.jsx)("a", { href: e, ...r, children: t })
        : (0, a.jsx)(ee.default, { href: e, ...r, children: t });
    function ed({ className: e, ...t }) {
      let n = (0, $.useT)(),
        { locale: r } = (0, et.useLocale)(),
        { expectUser: s } = (0, W.useUser)(),
        [i, l] = (0, o.useState)(!1);
      (0, o.useEffect)(() => {
        let e = (0, ei.getAnonId)();
        !s && e && l(!0);
      }, [s]);
      let c = (0, o.useMemo)(
        () => [
          { href: "/pricing", title: n("footer.pricing") },
          { href: "/enterprise", title: n("footer.enterprise"), external: !0 },
          { href: "/faq", title: n("footer.faq"), external: !0 },
          {
            key: "legal",
            title: (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsxs)(es.Drawer, {
                  children: [
                    (0, a.jsx)(es.DrawerTrigger, {
                      className: "block sm:hidden",
                      children: n("footer.legal"),
                    }),
                    (0, a.jsxs)(es.DrawerContent, {
                      className: "flex h-fit flex-col gap-2",
                      children: [
                        (0, a.jsx)(D.Button, {
                          asChild: !0,
                          variant: "ghost",
                          className: "mt-2 w-full",
                          children: (0, a.jsx)(ec, {
                            href: "/policy",
                            external: !0,
                            children: n("footer.policy"),
                          }),
                        }),
                        (0, a.jsx)(D.Button, {
                          asChild: !0,
                          variant: "ghost",
                          className: "mb-2 w-full",
                          children: (0, a.jsx)(ee.default, {
                            href: "http://vercel.com/terms",
                            target: "_blank",
                            children: n("footer.terms"),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)(en.DropdownMenu, {
                  children: [
                    (0, a.jsx)(er.DropdownMenuTrigger, {
                      className: "hidden sm:block",
                      children: n("footer.legal"),
                    }),
                    (0, a.jsxs)(en.DropdownMenuContent, {
                      sideOffset: 8,
                      className: "min-w-20 rounded-md p-1",
                      children: [
                        (0, a.jsx)(en.DropdownMenuItem, {
                          className: "h-6 rounded-[2px] text-xs",
                          asChild: !0,
                          children: (0, a.jsx)(ec, {
                            href: "/policy",
                            external: !0,
                            children: (0, a.jsx)("span", {
                              children: n("footer.policy"),
                            }),
                          }),
                        }),
                        (0, a.jsx)(en.DropdownMenuItem, {
                          className: "h-6 rounded-[2px] text-xs",
                          asChild: !0,
                          children: (0, a.jsx)(ee.default, {
                            href: "https://vercel.com/legal/terms",
                            target: "_blank",
                            children: (0, a.jsx)("span", {
                              children: n("footer.terms"),
                            }),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          },
          {
            href: "https://vercel.com/legal/privacy-policy",
            title: n("footer.privacy"),
          },
          {
            href: h.VERCEL_COMMUNITY_V0_SECTION_URL,
            title: "Vercel Community",
            hiddenOnMobile: !0,
          },
          {
            href: "https://vercel.com/?utm_source=v0-site&utm_medium=banner&utm_campaign=home",
            title: (0, a.jsxs)(a.Fragment, {
              children: [
                "Vercel",
                (0, a.jsx)("span", {
                  className:
                    r === ea.jaLocaleInfo.iso639 ? "hidden md:inline" : "",
                  children: (0, a.jsx)(Q.External, {
                    className: "size-[10px]",
                  }),
                }),
              ],
            }),
          },
        ],
        [r, n],
      );
      return (0, a.jsxs)("footer", {
        className: (0, u.cn)(
          {
            "text-xs": r === el.enLocaleInfo.iso639,
            "text-[11px] tracking-tighter md:text-xs md:tracking-normal":
              r === ea.jaLocaleInfo.iso639 || r === eo.esLocaleInfo.iso639,
          },
          e,
          "flex flex-col items-center gap-2",
        ),
        ...t,
        children: [
          (0, a.jsxs)("div", {
            "aria-hidden": !i,
            className: (0, u.cn)(
              i ? "opacity-100" : "opacity-0",
              "text-v0-gray-900 transition-opacity",
            ),
            children: [
              "By messaging v0, you agree to our",
              " ",
              (0, a.jsx)(ee.default, {
                className: "underline underline-offset-2",
                href: "/agreement",
                children: n("footer.terms"),
              }),
              " ",
              "and",
              " ",
              (0, a.jsx)(ec, {
                className: "underline underline-offset-2",
                href: "/policy",
                external: !0,
                children: n("footer.policy"),
              }),
              ".",
            ],
          }),
          (0, a.jsx)("nav", {
            className: "flex h-4 divide-x",
            children: c.map((e) => {
              let t = e.href,
                n = t && !e.href.startsWith("/"),
                s = (0, u.cn)(
                  "flex items-center gap-1 text-gray-600 transition-colors hover:text-gray-900",
                  {
                    "px-2": r !== ea.jaLocaleInfo.iso639,
                    "px-1 md:px-2": r === ea.jaLocaleInfo.iso639,
                  },
                  e.hidden && "hidden",
                  e.hiddenOnMobile && "hidden sm:flex",
                );
              if (!t)
                return (0, a.jsx)(
                  "div",
                  { className: s, children: e.title },
                  e.key,
                );
              let i = n || e.external ? "a" : ee.default;
              return (0, a.jsx)(
                i,
                {
                  className: s,
                  href: e.href,
                  target: n ? "_blank" : void 0,
                  children: e.title,
                },
                e.href,
              );
            }),
          }),
        ],
      });
    }
    var eu = e.i(589654),
      eh = e.i(657736),
      ep = e.i(120668),
      em = e.i(183673),
      ef = e.i(745197),
      eg = e.i(492526),
      ex = e.i(391236),
      ev = e.i(79259),
      eb = e.i(435153),
      ey = e.i(2072),
      ej = e.i(707555),
      eC = e.i(93089);
    let ew = [
        {
          prompt:
            "Please recreate the UI shown in the attached screenshot as accurately as possible.",
          title: "cloneScreenshot",
          icon: (0, a.jsx)(eb.Camera, { className: "size-[14px]" }),
        },
        {
          prompt:
            "Please recreate the UI shown in the attached Figma frame as accurately as possible.",
          title: "importFromFigma",
          icon: (0, a.jsx)(
            function ({ className: e }) {
              return (0, a.jsx)("svg", {
                width: "16",
                height: "18",
                viewBox: "0 0 16 18",
                className: e,
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: (0, a.jsx)("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M2.25 4.15129C2.25 5.1233 2.6869 5.99327 3.37503 6.57554C2.6869 7.1578 2.25 8.02777 2.25 8.99978C2.25 9.97179 2.6869 10.8418 3.37503 11.424C2.6869 12.0063 2.25 12.8763 2.25 13.8483C2.25 15.6013 3.67116 17.0225 5.42424 17.0225H5.5C7.29493 17.0225 8.75 15.5674 8.75 13.7725V12.174V11.6971C9.23602 11.9994 9.80974 12.174 10.4242 12.174H10.5758C12.3288 12.174 13.75 10.7529 13.75 8.99978C13.75 8.02777 13.3131 7.1578 12.625 6.57554C13.3131 5.99327 13.75 5.1233 13.75 4.15129C13.75 2.39821 12.3288 0.977051 10.5758 0.977051H8.75H8H7.25H5.42424C3.67116 0.977051 2.25 2.39821 2.25 4.15129ZM10.5758 5.82554C11.5004 5.82554 12.25 5.07595 12.25 4.15129C12.25 3.22663 11.5004 2.47705 10.5758 2.47705H8.75V5.82554H10.4242H10.5758ZM7.25 8.99978V7.32554H5.42424C4.49958 7.32554 3.75 8.07512 3.75 8.99978C3.75 9.92444 4.49958 10.674 5.42424 10.674H7.25V8.99978ZM8.75 8.99978C8.75 9.92444 9.49958 10.674 10.4242 10.674H10.5758C11.5004 10.674 12.25 9.92444 12.25 8.99978C12.25 8.07512 11.5004 7.32554 10.5758 7.32554H10.4242C9.49958 7.32554 8.75 8.07512 8.75 8.99978ZM5.42424 12.174L7.25 12.174V13.7725C7.25 14.739 6.4665 15.5225 5.5 15.5225H5.42424C4.49958 15.5225 3.75 14.7729 3.75 13.8483C3.75 12.9236 4.49958 12.174 5.42424 12.174ZM7.25 5.82554H5.42424C4.49958 5.82554 3.75 5.07595 3.75 4.15129C3.75 3.22663 4.49958 2.47705 5.42424 2.47705H7.25V5.82554Z",
                  fill: "currentColor",
                }),
              });
            },
            { className: "size-[14px]" },
          ),
        },
        {
          prompt: "Please upload a project.",
          title: "uploadProject",
          icon: (0, a.jsx)(ey.FileZip, { className: "size-[14px]" }),
        },
        {
          prompt: `Create a modern, responsive landing page for a fictional SaaS company. The landing page should include the following sections:

- A header with the company logo, navigation links, and a call-to-action button.
- A hero section with a catchy headline, brief description, and a prominent call-to-action.
- A features section highlighting 3-4 key features of StreamLine.
- A testimonials section with quotes from satisfied customers.
- A pricing section with different plan options.
- A final call-to-action section to encourage sign-ups.
- A footer with important links and social media icons.`,
          title: "landingPage",
          icon: (0, a.jsx)(ej.Layout, { className: "size-[14px]" }),
        },
      ],
      ek = {
        prompt: "Please select a GitHub repository.",
        title: "importFromGitHub",
        icon: (0, a.jsx)(eC.LogoGithub, { className: "size-[14px]" }),
      };
    var eN = e.i(996548);
    e.i(904347);
    var eM = e.i(37737),
      eS = e.i(851994);
    e.i(168204);
    var eI = e.i(225695),
      eL = e.i(667660),
      eT = e.i(803799);
    function eE({
      className: e,
      width: t = 642,
      height: n = 212,
      idSuffix: r,
    }) {
      let s = `mask0_603_1196${r ? `-${r}` : ""}`,
        i = `paint0_linear_603_1196${r ? `-${r}` : ""}`;
      return (0, a.jsxs)("svg", {
        width: t,
        height: n,
        viewBox: "0 0 642 212",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: e,
        preserveAspectRatio: "xMidYMid meet",
        children: [
          (0, a.jsx)("mask", {
            id: s,
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "642",
            height: "212",
            children: (0, a.jsx)("rect", {
              width: "642",
              height: "212",
              fill: `url(#${i})`,
            }),
          }),
          (0, a.jsx)("g", {
            mask: `url(#${s})`,
            children: (0, a.jsx)("path", {
              d: "M114.193 56.7002L247.3 189.807V56.7002H297.5V225C297.5 244.606 281.606 260.5 262 260.5C252.632 260.5 243.391 256.887 236.754 250.25L43.207 56.7002H114.193ZM507.6 5.5C547.088 5.5 579.1 37.5116 579.1 77V209.3H528.9V91.3926L409.993 210.3H527.9V260.5H395.6C356.111 260.5 324.1 228.488 324.1 189V56.7002H374.3V175.007L375.153 174.153L492.754 56.5537L493.607 55.7002H375.3V5.5H507.6Z",
              stroke: "currentColor",
              strokeOpacity: "0.1",
            }),
          }),
          (0, a.jsx)("defs", {
            children: (0, a.jsxs)("linearGradient", {
              id: i,
              x1: "321",
              y1: "212",
              x2: "321",
              y2: "0",
              gradientUnits: "userSpaceOnUse",
              children: [
                (0, a.jsx)("stop", { stopColor: "white", stopOpacity: "0" }),
                (0, a.jsx)("stop", { offset: "0.987475", stopColor: "white" }),
              ],
            }),
          }),
        ],
      });
    }
    let e_ = "empty-screen-import-figma";
    function eA({
      isMobile: e,
      onSubmit: t,
      isRecentsHomepageEnabled: n = !1,
      children: r,
      ref: s,
      ...i
    }) {
      let l = (0, $.useT)(),
        { expectUser: d, user: h } = (0, W.useUser)(),
        { setShowSignInDialog: p } = (0, K.useSignInDialog)(),
        { submit: m, stopLlmResponse: f } = (0, M.useV0Chat)({ onSubmit: t }),
        [x] = (0, ef.useRateLimit)(),
        v = !!(x?.remaining !== void 0 && x.remaining <= 0),
        b = (0, ei.getAnonId)(),
        y = !!(!d && b),
        [j, C] = (0, o.useState)(!1),
        w = (0, c.usePathname)(),
        k = (0, g.useIsChatPage)(),
        N = (0, J.isHome)(w),
        { hasWritePermission: S } = (0, eL.useActiveScope)(),
        { hce: I } = (0, Z.useFlags)(),
        L = (0, o.useCallback)(
          (e) => {
            p({ content: "new" === e.action && (e.content || !1) });
          },
          [p],
        );
      if (!S)
        return (0, a.jsx)("div", {
          className: "overflow-auto px-6 pt-16",
          children: r,
        });
      let T = !k && !d && I;
      return (0, a.jsx)("div", {
        className: "flex h-full flex-col items-center justify-center gap-8",
        ...i,
        children: (0, a.jsxs)(T ? "main" : "div", {
          className: (0, u.cn)(
            "z-0 flex w-full flex-col  px-6",
            !T && "flex-1 overflow-auto",
            n && d ? "gap-9" : "gap-24",
          ),
          ref: s,
          children: [
            (0, a.jsxs)("div", {
              className: (0, u.cn)(
                "relative mx-auto flex w-full flex-col gap-4",
                n && d ? "pt-18 lg:pt-25" : "pt-32 lg:pt-48",
              ),
              children: [
                (!n || !d) &&
                  (0, a.jsx)("div", {
                    "aria-hidden": !0,
                    className:
                      "pointer-events-none absolute select-none -z-10 left-1/2 -translate-x-1/2",
                    style: {
                      top: "clamp(24px, 6vw, 72px)",
                      width: "clamp(340px, 50vw, 642px)",
                      height: "clamp(162px, 20vw, 212px)",
                      opacity: 1,
                    },
                    children: (0, a.jsx)(eE, {
                      idSuffix: "responsive",
                      width: 642,
                      height: 212,
                      className: "w-full h-full text-current",
                    }),
                  }),
                (0, a.jsx)("h1", {
                  "data-testid": "app-title",
                  className: "text-heading-48 text-center text-v0-gray-1000",
                  children:
                    !d && I
                      ? "What do you want to create?"
                      : l("emptyScreen.title.hce"),
                }),
                (0, a.jsx)(eT.ConditionalNavigationMarker, {
                  enabled: N,
                  phase: "content",
                  label: d
                    ? "Chat.EmptyScreen.Authenticated"
                    : "Chat.EmptyScreen.Anonymous",
                  children: (0, a.jsx)(ep.PromptForm, {
                    className: "relative mx-auto w-full max-w-196",
                    isMobile: e,
                    isNewChat: !k,
                    isSignedIn: d,
                    isAnonymous: y,
                    stop: f,
                    clearOnSubmit: !!(d || (b && !v)),
                    submit: d || (b && !v) ? m : L,
                    isTemplateLoading: j,
                    useSimpleTextarea: !0,
                  }),
                }),
                !n &&
                  d &&
                  (0, a.jsx)("div", {
                    className:
                      "flex min-h-0 shrink-0 items-center justify-center",
                    children: (0, a.jsx)(eR, {
                      show: !0,
                      setIsTemplateLoading: C,
                      isMobile: e,
                    }),
                  }),
              ],
            }),
            (0, a.jsx)("div", {
              className: (0, u.cn)(
                "mx-auto flex w-full max-w-[1264px] flex-1 flex-col",
                n ? "gap-9" : "gap-4",
              ),
              children: r,
            }),
            k &&
              (0, a.jsx)("div", {
                className: "py-4",
                children: (0, a.jsx)(ed, {}),
              }),
          ],
        }),
      });
    }
    function eR({ show: e, setIsTemplateLoading: t, isMobile: n }) {
      let r = (0, $.useT)(),
        [s, i] = (0, o.useState)(!1),
        { expectUser: l, user: c } = (0, W.useUser)(),
        { gwe: d } = (0, Z.useFlags)();
      (0, o.useEffect)(() => {
        t(s);
      }, [s, t]);
      let u = (0, o.useMemo)(() => {
        if (!l && !c) return [];
        let e = [...ew];
        return (
          d && e.unshift(ek),
          n ? e.filter((e) => "uploadProject" !== e.title) : e
        );
      }, [n, l, c, d]);
      return (0, a.jsx)(eu.AnimatePresence, {
        mode: "wait",
        children:
          e && u.length
            ? (0, a.jsxs)(
                eh.motion.div,
                {
                  animate: { opacity: 1 },
                  className:
                    "flex max-w-[1000px] flex-wrap justify-center gap-3",
                  exit: { opacity: 0 },
                  initial: !1,
                  role: "list",
                  children: [
                    (0, a.jsx)("h2", {
                      className: "sr-only",
                      children: r("emptyScreen.suggestedChatMessages"),
                    }),
                    (0, a.jsx)(eP, {
                      suggestion: u[0],
                      isAnyLoading: s,
                      setIsAnyLoading: i,
                      setIsTemplateLoading: t,
                    }),
                    (0, a.jsx)(eP, {
                      suggestion: u[1],
                      isAnyLoading: s,
                      setIsAnyLoading: i,
                      setIsTemplateLoading: t,
                    }),
                    (0, a.jsx)("div", {
                      className: "hidden md:block",
                      children: (0, a.jsx)(eP, {
                        suggestion: u[2],
                        isAnyLoading: s,
                        setIsAnyLoading: i,
                        setIsTemplateLoading: t,
                      }),
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex justify-center gap-3",
                      children: [
                        (0, a.jsx)("div", {
                          className: "md:hidden",
                          children: (0, a.jsx)(eP, {
                            suggestion: u[2],
                            isAnyLoading: s,
                            setIsAnyLoading: i,
                            setIsTemplateLoading: t,
                          }),
                        }),
                        u.length > 3
                          ? (0, a.jsx)(eP, {
                              suggestion: u[3],
                              isAnyLoading: s,
                              setIsAnyLoading: i,
                              setIsTemplateLoading: t,
                            })
                          : null,
                      ],
                    }),
                  ],
                },
                "suggestions",
              )
            : null,
      });
    }
    function eP({
      suggestion: e,
      isAnyLoading: t,
      setIsAnyLoading: n,
      setIsTemplateLoading: r,
    }) {
      let s = (0, $.useT)(),
        { submit: i } = (0, M.useV0Chat)(),
        { user: l } = (0, W.useUser)(),
        { setShowSignInDialog: d } = (0, K.useSignInDialog)(),
        { selectedProjectId: u } = (0, em.useProjectsForUser)(),
        [h] = (0, ef.useRateLimit)(),
        p = h?.remaining === 0,
        m = (0, o.useMemo)(() => (0, ei.getAnonId)(), []),
        f = o.useRef(null),
        { setSignInWithFigmaModalOpen: g } = (0, eS.useSignInWithFigmaModal)(),
        { setImportFigmaModalOpen: x } = (0, eg.useImportFromFigmaModal)(),
        {
          handleFigmaUrl: v,
          isFigmaUrl: b,
          getNodeContext: y,
          userData: j,
        } = (0, ex.useFigmaIntegration)(),
        [C, w] = (0, o.useState)(!1),
        k = (0, o.useRef)(void 0),
        { setShowZipModal: N } = (0, eN.useZipModal)(),
        {
          isUploading: S,
          onInputChange: I,
          uploadFiles: T,
        } = (0, ev.default)({
          isSignedIn: !!l,
          onFinish: () => {
            (w(!1), n(!1), r(!1));
          },
          canUpload: () => ({ ok: !0 }),
          onUploadStart: () => {
            (w(!0), n(!0), r(!0));
          },
          onSuccess: async (t) => {
            ((0, L.track)("SubmitNewUserMessage", {
              text: e.prompt,
              imageOnly: !1,
              index: 0,
              projectId: u,
              anonId: m,
              suggestion: e.title,
              messageMode: "build",
            }),
              await i({
                action: "new",
                content: (0, eI.createMDXMessageContent)(e.prompt),
                attachments: t,
                figmaContext: k.current,
                messageMode: "build",
              }));
          },
          disableDrag: !0,
          disablePaste: !0,
        }),
        E = (0, o.useCallback)(
          async (e) => {
            if (!b(e)) return;
            let [t, n] = await Promise.all([v(e), y(e)]);
            if (!t.success) return;
            let r = n.nodes.colors.map((e) => `${e.hex})`).join(", ") || "",
              s = n.nodes.designTokens.map((e) => `${e.hex})`).join(", ") || "";
            k.current = [r && `Colors: ${r}`, s && `Design tokens: ${s}`]
              .filter(Boolean)
              .join(", ");
            let { base64: i, originalUrl: a, fileName: l } = t.data,
              o = l.replace(/[^a-zA-Z0-9.]/g, "_"),
              c = i.split(",")[1],
              d = window.atob(c),
              u = new Uint8Array(d.length);
            for (let e = 0; e < d.length; e++) u[e] = d.charCodeAt(e);
            let h = new File(
              [new Blob([u], { type: "image/png" })],
              `${o}.png`,
              { type: "image/png" },
            );
            ((h.isFigmaFile = !0),
              (h.figmaUrl = a),
              (h.v0Type = "figma"),
              await T([h]));
          },
          [b, v, y, T],
        ),
        _ = (0, c.useSearchParams)();
      (0, o.useEffect)(() => {
        if (_.get("modal") === e_ && j?.isSignedIn && l) {
          ((0, L.track)("FigmaModalOpen", { source: "url" }),
            x({ open: !0, onImport: E }));
          let e = new URLSearchParams(_.toString());
          (e.delete("modal"),
            window.history.replaceState(
              {},
              "",
              `${window.location.pathname}?${e.toString()}`,
            ));
        }
      }, [_, x, j?.isSignedIn, l, E]);
      let A = async () => {
          ((0, L.track)("ClickSuggestion", { suggestion: e.title }), l || m)
            ? p
              ? m
                ? d({
                    content: !1,
                    customMessage:
                      "To continue using the chat, create a Vercel account or log into an existing one.",
                  })
                : (0, eM.openDialog)({ type: "upgradePlan" })
              : "cloneScreenshot" === e.title
                ? l
                  ? f.current?.click()
                  : d({
                      content: !1,
                      customMessage:
                        "To upload screenshots to your chat, create a Vercel account or log into an existing one.",
                    })
                : "importFromGitHub" === e.title
                  ? l
                    ? ((0, L.track)("GitHubModalOpen", { source: "button" }),
                      (0, eM.openDialog)({ type: "gitImport" }))
                    : d({
                        content: !1,
                        customMessage:
                          "To import from GitHub, create a Vercel account or log into an existing one.",
                      })
                  : "importFromFigma" === e.title
                    ? l
                      ? "v0-level0" === l.v0plan
                        ? (0, eM.openDialog)({ type: "upgradePlan" })
                        : j?.isSignedIn
                          ? ((0, L.track)("FigmaModalOpen", { source: "url" }),
                            x({ open: !0, onImport: E }))
                          : g({ open: !0, oauthUrlSearchParams: { modal: e_ } })
                      : d({
                          content: !1,
                          customMessage:
                            "To import from Figma, create a Vercel account or log into an existing one.",
                        })
                    : "uploadProject" === e.title
                      ? l
                        ? N(!0)
                        : d({
                            content: !1,
                            customMessage:
                              "To upload a project, create a Vercel account or log into an existing one.",
                          })
                      : ((0, L.track)("SubmitNewUserMessage", {
                          text: e.prompt,
                          imageOnly: !1,
                          index: 0,
                          projectId: u,
                          anonId: m,
                          suggestion: e.title,
                          messageMode: "build",
                        }),
                        await i({
                          action: "new",
                          content: (0, eI.createMDXMessageContent)(e.prompt),
                          messageMode: "build",
                        }))
            : d({ content: (0, eI.createMDXMessageContent)(e.prompt) });
        },
        [R, P] = (0, o.useState)({ x: 0, y: 0 }),
        [V, F] = (0, o.useState)(!1),
        z = (0, o.useCallback)((e) => {
          let t = e.currentTarget.getBoundingClientRect();
          P({
            x: ((e.clientX - t.left) / t.width) * 100,
            y: ((e.clientY - t.top) / t.height) * 100,
          });
        }, []);
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsxs)("div", {
            className: "relative",
            children: [
              (0, a.jsx)("div", {
                className:
                  "pointer-events-none absolute -inset-px rounded-full",
                style: {
                  opacity: +!!V,
                  background: "transparent",
                  transition: "opacity 0.15s ease",
                },
                children: (0, a.jsx)("div", {
                  className:
                    "absolute inset-0 rounded-full border border-[rgba(68,225,211,0.9)] dark:border-[rgba(68,225,211,0.5)]",
                  style: {
                    background: "transparent",
                    clipPath: "inset(0px round 9999px)",
                    maskImage:
                      "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
                    "--mouse-x": `${R.x}%`,
                    "--mouse-y": `${R.y}%`,
                  },
                }),
              }),
              (0, a.jsxs)(D.Button, {
                variant: "secondary",
                size: "sm",
                onClick: A,
                onMouseMove: z,
                onMouseEnter: () => F(!0),
                onMouseLeave: () => F(!1),
                className:
                  "border-none text-[13px] text-v0-gray-900 shadow-sm hover:text-v0-gray-1000",
                disabled: C || S || t,
                "aria-label": s(`emptyScreen.suggestions.${e.title}`),
                rounded: !0,
                children: [
                  (0, a.jsx)("span", {
                    className: (C, "text-v0-gray-900"),
                    children:
                      (C || S) &&
                      ("cloneScreenshot" === e.title ||
                        "importFromFigma" === e.title)
                        ? (0, a.jsx)(X.Spinner, { size: 14 })
                        : e.icon,
                  }),
                  s(`emptyScreen.suggestions.${e.title}`),
                ],
              }),
            ],
          }),
          (0, a.jsx)("input", {
            ref: f,
            type: "file",
            accept: "image/*",
            className: "sr-only",
            onChange: (e) => {
              I(e);
            },
            disabled: C || S || t,
            tabIndex: -1,
            "aria-hidden": "true",
          }),
        ],
      });
    }
    var eD = e.i(318727),
      eV = e.i(849402),
      e$ = e.i(418929),
      eF = e.i(494266),
      ez = e.i(864924),
      eH = e.i(273207);
    let eB = (0, o.memo)(function ({
      forkKeyOptions: e,
      message: t,
      className: n,
    }) {
      let { messages: r } = (0, v.useChatMessages)(),
        s = (0, v.useSetChatState)(),
        { actions: i } = (0, e$.useCurrentChatPrompt)(),
        { clearEditingMessage: l } = i,
        c = (e || []).findIndex((e) => e && e.some((e) => e === t.id)),
        d = (0, m.useCloseActiveBlock)(),
        { forkKeyCache: h } = (0, eH.useLeafMessage)(),
        p = (0, C.useLatest)(r),
        f = (0, o.useCallback)(
          (n) => {
            let r = e[n];
            if (!r) return;
            let i = (0, b.getLeafMessageIdFromForkKey)(r),
              a = i ? h[i] : void 0;
            if (a) {
              let e = new Set(p.current.map((e) => e.id)),
                t = !0;
              for (let n of a) e.has(n) || (t = !1);
              t && (r = a);
            }
            let o = (0, b.getLeafNodeForkKey)([...p.current], r);
            (d(t.id, o), s({ activeForkKey: o }), l());
          },
          [e, h, p, d, t.id, s, l],
        );
      return !e || e.length < 2
        ? null
        : (0, a.jsxs)("div", {
            className: (0, u.cn)(
              "flex items-center gap-0.5 text-sm font-medium",
              n,
            ),
            children: [
              (0, a.jsx)(D.Button, {
                "aria-label": "Previous message version",
                className:
                  "disabled:bg-v0-background-100 size-6 rounded-md disabled:border-none",
                disabled: 0 === c,
                onClick: () => {
                  ((0, L.track)("MessageForkPrevious"), f(c - 1));
                },
                size: "xs",
                variant: "ghost",
                children: (0, a.jsx)(ez.ChevronLeftSmall, {}),
              }),
              (0, a.jsxs)("span", {
                className: "whitespace-nowrap",
                children: [c + 1, " / ", e.length],
              }),
              (0, a.jsx)(D.Button, {
                "aria-label": "Next message version",
                className:
                  "disabled:bg-v0-background-100 size-6 rounded-md disabled:border-none",
                disabled: c === e.length - 1,
                onClick: () => f(c + 1),
                size: "xs",
                variant: "ghost",
                children: (0, a.jsx)(eF.ChevronRightSmall, {}),
              }),
            ],
          });
    });
    var eO = e.i(469780),
      eU = e.i(608499),
      eW = e.i(659563),
      eZ = e.i(605177),
      eG = e.i(383790),
      eq = e.i(147675),
      eX = e.i(988118),
      eY = e.i(504066),
      eK = e.i(351853),
      eJ = e.i(889938),
      eQ = e.i(330136),
      e0 = e.i(577247),
      e1 = e.i(443148),
      e2 = e.i(794593),
      e5 = e.i(668887),
      e3 = e.i(973817),
      e4 = e.i(84079);
    let e6 = [
        "gap",
        "space",
        "flex",
        "flexColumn",
        "grid",
        "showGap",
        "size",
      ].reduce((e, t) => ((e[t] = !1), e), {}),
      e7 = ["2xl", "xl", "lg", "md", "sm"];
    var e9 = e.i(877318);
    let e8 = (0,
      e9.withNewIcon)(`<circle cx="8" cy="8" r="7.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="transparent" />
  <path opacity="0.33" fill-rule="evenodd" clip-rule="evenodd" d="M5 1H7V3H5V1ZM5 5V3H3V5H1V7H3V9H1V11H3V13H5V15H7V13H9V15H11V13H13V11H15V9H13V7H15V5H13V3H11V1H9V3H7V5H5ZM5 7H3V5H5V7ZM7 7V5H9V7H7ZM7 9V7H5V9H3V11H5V13H7V11H9V13H11V11H13V9H11V7H13V5H11V3H9V5H11V7H9V9H7ZM9 9H11V11H9V9ZM7 9V11H5V9H7Z" fill="currentColor"/>`),
      te = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 1H5H13.75H14.5V2.5H13.75H10.5475L7.02746 13.5H11H11.75V15H11H2.25H1.5V13.5H2.25H5.45254L8.97254 2.5H5H4.25V1Z" fill="currentColor"/>',
      ),
      tt = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 0.583374C6.15186 0.583374 4.89601 1.20742 4.10921 2.08165C3.34402 2.93186 3.08334 3.95168 3.08334 4.66671C3.08334 5.30246 3.25446 5.98764 3.73035 6.62516C3.82673 6.75427 3.934 6.8793 4.05254 7H1.75H1V8.5H1.75H14.25H15V7H14.25H7.01815L6.51769 6.8024C5.6688 6.46724 5.19511 6.07985 4.93239 5.72789C4.67477 5.38278 4.58334 5.0232 4.58334 4.66671C4.58334 4.27063 4.73934 3.62378 5.22415 3.0851C5.68734 2.57044 6.51483 2.08337 8.00001 2.08337C9.99003 2.08337 10.8295 2.95573 11.1785 3.6895L11.5006 4.36679L12.8552 3.72252L12.5331 3.04522C11.9243 1.76535 10.5425 0.583374 8.00001 0.583374ZM12.9167 11.25V10.5H11.4167V11.25C11.4167 11.6491 11.2587 12.3206 10.7686 12.8815C10.302 13.4155 9.47586 13.9167 8.00001 13.9167C6.13953 13.9167 5.27285 13.0402 4.87848 12.3L4.52584 11.638L3.20199 12.3433L3.55464 13.0053C4.18889 14.1958 5.54264 15.4167 8.00001 15.4167C9.85749 15.4167 11.1147 14.7652 11.8981 13.8685C12.658 12.9988 12.9167 11.9621 12.9167 11.25Z" fill="currentColor"/>',
      );
    var tn = e.i(507989);
    let tr = (0, e9.withNewIcon)(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.21968 3.46975L3.68935 4.00008L4.75001 5.06074L5.28034 4.53041L7.24999 2.56076L7.24999 13.4393L5.28031 11.4697L4.74998 10.9393L3.68932 12L4.21965 12.5303L7.29288 15.6036C7.6834 15.9941 8.31657 15.9941 8.70709 15.6036L11.7803 12.5303L12.3106 12L11.25 10.9393L10.7197 11.4697L8.74999 13.4393L8.74999 2.56072L10.7197 4.53041L11.25 5.06075L12.3107 4.00009L11.7803 3.46975L8.70712 0.396531C8.31659 0.00600645 7.68343 0.00600637 7.2929 0.396531L4.21968 3.46975Z" fill="currentColor"/>',
    );
    var ts = e.i(558856);
    let ti = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM3.5 7.25H4.25H11.75H12.5V8.75H11.75H4.25H3.5V7.25ZM2.5 12.5H3.25H12.75H13.5V14H12.75H3.25H2.5V12.5Z" fill="currentColor"/>',
      ),
      ta = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM6 7.25H6.75H14.25H15V8.75H14.25H6.75H6V7.25ZM4 12.5H4.75H14.25H15V14H14.25H4.75H4V12.5Z" fill="currentColor"/>',
      ),
      tl = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z" fill="currentColor"/>',
      );
    var to = e.i(569175),
      tc = e.i(907735),
      td = e.i(685419),
      tu = e.i(211976),
      th = e.i(675120),
      tp = e.i(592258),
      tm = e.i(996174),
      tf = e.i(969372),
      tg = e.i(270692),
      tx = e.i(443219),
      tv = e.i(802008),
      tb = e.i(292029),
      ty = e.i(792437),
      tj = e.i(940393),
      tC = e.i(763480),
      tw = e.i(574768),
      tk = e.i(405193);
    function tN({ children: e }) {
      return "undefined" == typeof document
        ? null
        : (0, tk.createPortal)(e, document.body);
    }
    function tM({
      title: e,
      value: t,
      presets: n,
      onChange: r,
      step: s = 1,
      min: i,
      max: l,
      prefix: c,
      suffix: d,
      disabled: u,
      allowNegative: h = !1,
      allowIconSliding: p = !1,
      placeholder: m,
    }) {
      let f = o.useRef(null),
        [g, x] = o.useState(!1),
        v = o.useMemo(() => {
          let e = {};
          return (
            n.forEach(([, t], n) => {
              e[t] = n;
            }),
            e
          );
        }, [n]),
        b = (e) => {
          if (f.current) {
            let t = !1,
              n = r(v[e] ?? e, f.current, () => {
                t = !0;
              });
            t || !1 === n || (f.current.value = e);
          }
        },
        y = o.useRef(null),
        j = y.current ?? t,
        w = "number" == typeof j && n[j] ? n[j][1] : String(j),
        [k, N] = (function (e) {
          let [t, n] = o.useState(e);
          return (
            o.useEffect(() => {
              n(e);
            }, [e]),
            [t, n]
          );
        })(w),
        M = () => {
          null !== y.current &&
            (b(
              "number" == typeof y.current && n[y.current]
                ? n[y.current][1]
                : String(y.current),
            ),
            (y.current = null));
        },
        S = (0, C.useLatest)(w),
        I = (0, C.useLatest)(r),
        L = o.useCallback(
          (e, t) => {
            if (!f.current) return;
            let n = !1,
              r = f.current.value;
            N(e);
            let s = I.current(
              v[e] ?? e,
              f.current,
              () => {
                n = !0;
              },
              t,
            );
            n || !1 === s ? N(r) : (f.current.value = e);
          },
          [N],
        );
      return (0, a.jsxs)("div", {
        className: "w-full relative",
        children: [
          !c && p
            ? (0, a.jsx)(tS, {
                valueRef: S,
                setValueTo: L,
                step: s,
                min: i,
                max: l,
                children: null,
              })
            : null,
          (0, a.jsx)(tw.Popover, {
            open: g,
            onOpenChange: x,
            children: (0, a.jsxs)(tj.Command, {
              className: "rounded-none",
              children: [
                (0, a.jsx)(tb.Anchor, {
                  children: (0, a.jsx)(ty.Command.Input, {
                    asChild: !0,
                    value: "",
                    onKeyDown: () => x(!1),
                    onMouseDown: () => x((e) => !e),
                    onFocus: () => x(!0),
                    "data-cmdk-input-name": e,
                    children: (0, a.jsx)(tC.Input, {
                      ref: f,
                      placeholder: m,
                      size: "sm",
                      "aria-label": e,
                      type: "text",
                      className:
                        "[&>input]:tabular-nums [&>input]:tracking-normal",
                      value: k,
                      onChange: (e) => {
                        (N(e.currentTarget.value),
                          r(
                            v[e.currentTarget.value] ?? e.currentTarget.value,
                            e.currentTarget,
                            e.preventDefault.bind(e),
                          ));
                      },
                      prefix:
                        c && p
                          ? (0, a.jsx)(tS, {
                              valueRef: S,
                              setValueTo: L,
                              step: s,
                              min: i,
                              max: l,
                              children: c,
                            })
                          : null,
                      suffix: d,
                      disabled: u,
                      onKeyDown: (e) => {
                        if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
                          x(!1);
                          let t = parseFloat(e.currentTarget.value);
                          if (isNaN(t)) return;
                          let n = e.currentTarget.value.replace(
                              /^[0-9.-]+/,
                              "",
                            ),
                            r =
                              Math.round(
                                (t + ("ArrowUp" === e.key ? s : -s)) * 1e3,
                              ) / 1e3;
                          if (!1 === h && r < 0) return void e.preventDefault();
                          let i = `${r}${n}`;
                          (N(i), b(i), e.preventDefault());
                        }
                      },
                      spellCheck: "false",
                      autoComplete: "off",
                      autoCorrect: "off",
                    }),
                  }),
                }),
                !g &&
                  (0, a.jsx)(tj.CommandList, {
                    "aria-hidden": "true",
                    className: "hidden",
                  }),
                (0, a.jsx)(tw.PopoverContent, {
                  side: "bottom",
                  align: "start",
                  sideOffset: 4,
                  alignOffset: 0,
                  onOpenAutoFocus: (e) => e.preventDefault(),
                  onInteractOutside: (t) => {
                    (M(),
                      t.target instanceof Element &&
                        t.target.getAttribute("data-cmdk-input-name") === e &&
                        t.preventDefault());
                  },
                  className:
                    "p-0 w-(--radix-popover-trigger-width) min-w-32 max-w-80 rounded",
                  onPointerLeave: M,
                  children: (0, a.jsxs)(tj.CommandList, {
                    children: [
                      (0, a.jsx)(tj.CommandEmpty, {
                        className: "p-1",
                        children: "No value found.",
                      }),
                      (0, a.jsx)(tj.CommandGroup, {
                        className: "p-1",
                        children: g
                          ? n.map(([e, n]) =>
                              (0, a.jsx)(
                                tj.CommandItem,
                                {
                                  value: e,
                                  onMouseDown: (e) => e.preventDefault(),
                                  onSelect: () => {
                                    ((y.current = null), b(n), x(!1));
                                  },
                                  className:
                                    "px-2 py-1 rounded-sm tabular-nums",
                                  onPointerEnter: () => {
                                    (null === y.current && (y.current = t),
                                      f.current &&
                                        r(v[n] ?? n, f.current, () => {}, !0));
                                  },
                                  children:
                                    n.endsWith("%") && e.includes("/") ? e : n,
                                },
                                e,
                              ),
                            )
                          : null,
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    function tS({
      children: e,
      valueRef: t,
      setValueTo: n,
      step: r,
      min: s,
      max: i,
      factor: l = 0.05,
    }) {
      let [c, d] = o.useState(!1),
        u = o.useRef(null),
        h = (0, C.useLatest)(c),
        p = o.useRef(null),
        m = o.useRef(null),
        f = o.useRef(null),
        g = o.useRef(null),
        x = o.useRef(null),
        v = o.useRef(null),
        b = o.useCallback((e) => {
          x.current = null;
          let n = t.current.match(/^-?[.\d]+/);
          n &&
            ((m.current = e.pageX),
            (f.current = e.pageY),
            (g.current = [parseFloat(n[0]), t.current.slice(n[0].length)]),
            e.currentTarget.setPointerCapture(e.pointerId),
            e.preventDefault(),
            document.pointerLockElement ||
              p.current
                ?.requestPointerLock({ unadjustedMovement: !0 })
                .then(() => {
                  d(!0);
                })
                .catch((e) => {
                  "NotSupportedError" === e.name &&
                    p.current?.requestPointerLock().then(() => {
                      d(!0);
                    });
                }));
        }, []),
        y = o.useMemo(() => {
          let e = String(r),
            t = e.indexOf(".");
          return -1 === t ? 0 : e.length - t - 1;
        }, [r]),
        j = o.useCallback(
          (e) => {
            if (null === m.current || null === g.current) return;
            if (((m.current += e), u.current && h.current)) {
              if ("number" != typeof m.current || "number" != typeof f.current)
                return;
              let e = m.current,
                t = window.innerWidth;
              (e < 0 ? (e += t) : e >= t && (e -= t),
                (u.current.style.transform =
                  "translate(" + e + "px," + f.current + "px)"));
            }
            let t = Math.round(m.current * l) * r,
              a = g.current[0] + t;
            ("number" == typeof s && a < s && (a = s),
              "number" == typeof i && a > i && (a = i));
            let o = a.toFixed(y);
            if (o.includes(".")) {
              for (; o.endsWith("0"); ) o = o.slice(0, -1);
              o.endsWith(".") && (o = o.slice(0, -1));
            }
            if (o === x.current) return;
            x.current = o;
            let c = o + g.current[1];
            ((v.current = c), n(c, !0));
          },
          [n, l, r, y, s, i],
        ),
        w = (0, C.useLatest)(j),
        k = o.useCallback((e) => {
          w.current(e.movementX);
        }, []),
        N = o.useCallback(
          (e) => {
            ((m.current = null),
              (g.current = null),
              e.currentTarget.releasePointerCapture(e.pointerId),
              v.current && (n(v.current, !1), (v.current = null)),
              document.exitPointerLock(),
              d(!1));
          },
          [n],
        );
      return (
        o.useEffect(() => {
          let e = !1,
            t = !1,
            n = (e) => {
              w.current(e.movementX);
            },
            r = () => {
              if (document.pointerLockElement === p.current)
                e || ((e = !0), document.addEventListener("mousemove", n, !1));
              else {
                if (t) return;
                ((t = !0),
                  d(!1),
                  document.removeEventListener("mousemove", n, !1));
              }
            };
          return (
            document.addEventListener("pointerlockchange", r, !1),
            () => {
              (document.removeEventListener("pointerlockchange", r, !1),
                t || document.removeEventListener("mousemove", n, !1));
            }
          );
        }, []),
        (0, a.jsxs)("span", {
          ref: p,
          className: "cursor-ew-resize",
          onPointerDown: b,
          onPointerMove: k,
          onPointerUp: N,
          style:
            null === e
              ? {
                  position: "absolute",
                  display: "block",
                  width: ".75em",
                  height: "100%",
                  left: "-.25em",
                }
              : {},
          children: [
            e,
            c
              ? (0, a.jsx)(tN, {
                  children: (0, a.jsx)("svg", {
                    height: "32",
                    viewBox: "0 0 32 32",
                    width: "32",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "fixed pointer-events-none",
                    style: { zIndex: 0x7fffffff, top: -16, left: -16 },
                    ref: u,
                    children: (0, a.jsxs)("g", {
                      fill: "none",
                      transform: "translate(8 10)",
                      children: [
                        (0, a.jsx)("path", {
                          d: "m0 6.9907v.005l5.997 5.996.001-3.999h1.999 2.02v4l5.98-6.001-5.98-5.999.001 4.019-2.021.002h-2l.001-4.022zm1.411.003 3.587-3.588-.001 2.587h3.5 2.521v-2.585l3.565 3.586-3.564 3.585-.001-2.585h-2.521l-3.499-.001-.001 2.586z",
                          fill: "#fff",
                        }),
                        (0, a.jsx)("path", {
                          d: "m8.497 7.993h2.521v2.586l3.565-3.586-3.565-3.585v2.605h-2.521-3.5v-2.607l-3.586 3.587 3.586 3.586v-2.587z",
                          fill: "#000",
                        }),
                      ],
                    }),
                  }),
                })
              : null,
          ],
        })
      );
    }
    var tI = e.i(610726),
      tL = e.i(4876),
      tL = tL,
      tT = e.i(457684),
      tE = e.i(644471),
      t_ = e.i(227152),
      tA = e.i(216445),
      tR = e.i(375582);
    let tP = (e, t) => {
        if ("number" == typeof e) {
          if (3 === t)
            return {
              mode: "rgb",
              r: (((e >> 8) & 15) | ((e >> 4) & 240)) / 255,
              g: (((e >> 4) & 15) | (240 & e)) / 255,
              b: ((15 & e) | ((e << 4) & 240)) / 255,
            };
          if (4 === t)
            return {
              mode: "rgb",
              r: (((e >> 12) & 15) | ((e >> 8) & 240)) / 255,
              g: (((e >> 8) & 15) | ((e >> 4) & 240)) / 255,
              b: (((e >> 4) & 15) | (240 & e)) / 255,
              alpha: ((15 & e) | ((e << 4) & 240)) / 255,
            };
          if (6 === t)
            return {
              mode: "rgb",
              r: ((e >> 16) & 255) / 255,
              g: ((e >> 8) & 255) / 255,
              b: (255 & e) / 255,
            };
          if (8 === t)
            return {
              mode: "rgb",
              r: ((e >> 24) & 255) / 255,
              g: ((e >> 16) & 255) / 255,
              b: ((e >> 8) & 255) / 255,
              alpha: (255 & e) / 255,
            };
        }
      },
      tD = {
        aliceblue: 0xf0f8ff,
        antiquewhite: 0xfaebd7,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 0xf0ffff,
        beige: 0xf5f5dc,
        bisque: 0xffe4c4,
        black: 0,
        blanchedalmond: 0xffebcd,
        blue: 255,
        blueviolet: 9055202,
        brown: 0xa52a2a,
        burlywood: 0xdeb887,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 0xd2691e,
        coral: 0xff7f50,
        cornflowerblue: 6591981,
        cornsilk: 0xfff8dc,
        crimson: 0xdc143c,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 0xb8860b,
        darkgray: 0xa9a9a9,
        darkgreen: 25600,
        darkgrey: 0xa9a9a9,
        darkkhaki: 0xbdb76b,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 0xff8c00,
        darkorchid: 0x9932cc,
        darkred: 9109504,
        darksalmon: 0xe9967a,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 0xff1493,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 0xb22222,
        floralwhite: 0xfffaf0,
        forestgreen: 2263842,
        fuchsia: 0xff00ff,
        gainsboro: 0xdcdcdc,
        ghostwhite: 0xf8f8ff,
        gold: 0xffd700,
        goldenrod: 0xdaa520,
        gray: 8421504,
        green: 32768,
        greenyellow: 0xadff2f,
        grey: 8421504,
        honeydew: 0xf0fff0,
        hotpink: 0xff69b4,
        indianred: 0xcd5c5c,
        indigo: 4915330,
        ivory: 0xfffff0,
        khaki: 0xf0e68c,
        lavender: 0xe6e6fa,
        lavenderblush: 0xfff0f5,
        lawngreen: 8190976,
        lemonchiffon: 0xfffacd,
        lightblue: 0xadd8e6,
        lightcoral: 0xf08080,
        lightcyan: 0xe0ffff,
        lightgoldenrodyellow: 0xfafad2,
        lightgray: 0xd3d3d3,
        lightgreen: 9498256,
        lightgrey: 0xd3d3d3,
        lightpink: 0xffb6c1,
        lightsalmon: 0xffa07a,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 0xb0c4de,
        lightyellow: 0xffffe0,
        lime: 65280,
        limegreen: 3329330,
        linen: 0xfaf0e6,
        magenta: 0xff00ff,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 0xba55d3,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 0xc71585,
        midnightblue: 1644912,
        mintcream: 0xf5fffa,
        mistyrose: 0xffe4e1,
        moccasin: 0xffe4b5,
        navajowhite: 0xffdead,
        navy: 128,
        oldlace: 0xfdf5e6,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 0xffa500,
        orangered: 0xff4500,
        orchid: 0xda70d6,
        palegoldenrod: 0xeee8aa,
        palegreen: 0x98fb98,
        paleturquoise: 0xafeeee,
        palevioletred: 0xdb7093,
        papayawhip: 0xffefd5,
        peachpuff: 0xffdab9,
        peru: 0xcd853f,
        pink: 0xffc0cb,
        plum: 0xdda0dd,
        powderblue: 0xb0e0e6,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 0xff0000,
        rosybrown: 0xbc8f8f,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 0xfa8072,
        sandybrown: 0xf4a460,
        seagreen: 3050327,
        seashell: 0xfff5ee,
        sienna: 0xa0522d,
        silver: 0xc0c0c0,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 0xfffafa,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 0xd2b48c,
        teal: 32896,
        thistle: 0xd8bfd8,
        tomato: 0xff6347,
        turquoise: 4251856,
        violet: 0xee82ee,
        wheat: 0xf5deb3,
        white: 0xffffff,
        whitesmoke: 0xf5f5f5,
        yellow: 0xffff00,
        yellowgreen: 0x9acd32,
      },
      tV = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,
      t$ = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)",
      tF = `${t$}%`,
      tz = `(?:${t$}%|${t$})`,
      tH = `(?:${t$}%|${t$}|none)`,
      tB = `(?:${t$}(deg|grad|rad|turn)|${t$})`,
      tO = "\\s*,\\s*";
    RegExp("^" + tH + "$");
    let tU = RegExp(
        `^rgba?\\(\\s*${t$}${tO}${t$}${tO}${t$}\\s*(?:,\\s*${tz}\\s*)?\\)$`,
      ),
      tW = RegExp(
        `^rgba?\\(\\s*${tF}${tO}${tF}${tO}${tF}\\s*(?:,\\s*${tz}\\s*)?\\)$`,
      ),
      tZ = (e, t) =>
        void 0 === e
          ? void 0
          : "object" != typeof e
            ? no(e)
            : void 0 !== e.mode
              ? e
              : t
                ? { ...e, mode: t }
                : void 0,
      tG =
        (e = "rgb") =>
        (t) =>
          void 0 !== (t = tZ(t, e))
            ? t.mode === e
              ? t
              : tq[t.mode][e]
                ? tq[t.mode][e](t)
                : "rgb" === e
                  ? tq[t.mode].rgb(t)
                  : tq.rgb[e](tq[t.mode].rgb(t))
            : void 0,
      tq = {},
      tX = {},
      tY = [],
      tK = {},
      tJ = (e) => e,
      tQ = (e) => (
        (tq[e.mode] = { ...tq[e.mode], ...e.toMode }),
        Object.keys(e.fromMode || {}).forEach((t) => {
          (tq[t] || (tq[t] = {}), (tq[t][e.mode] = e.fromMode[t]));
        }),
        e.ranges || (e.ranges = {}),
        e.difference || (e.difference = {}),
        e.channels.forEach((t) => {
          if (
            (void 0 === e.ranges[t] && (e.ranges[t] = [0, 1]),
            !e.interpolate[t])
          )
            throw Error(`Missing interpolator for: ${t}`);
          ("function" == typeof e.interpolate[t] &&
            (e.interpolate[t] = { use: e.interpolate[t] }),
            e.interpolate[t].fixup || (e.interpolate[t].fixup = tJ));
        }),
        (tX[e.mode] = e),
        (e.parse || []).forEach((t) => {
          t1(t, e.mode);
        }),
        tG(e.mode)
      ),
      t0 = (e) => tX[e],
      t1 = (e, t) => {
        if ("string" == typeof e) {
          if (!t) throw Error("'mode' required when 'parser' is a string");
          tK[e] = t;
        } else "function" == typeof e && 0 > tY.indexOf(e) && tY.push(e);
      },
      t2 = /[^\x00-\x7F]|[a-zA-Z_]/,
      t5 = /[^\x00-\x7F]|[-\w]/,
      t3 = "function",
      t4 = "ident",
      t6 = "number",
      t7 = "percentage",
      t9 = "none",
      t8 = "alpha",
      ne = 0;
    function nt(e) {
      let t = e[ne],
        n = e[ne + 1];
      return "-" === t || "+" === t
        ? /\d/.test(n) || ("." === n && /\d/.test(e[ne + 2]))
        : "." === t
          ? /\d/.test(n)
          : /\d/.test(t);
    }
    function nn(e) {
      if (ne >= e.length) return !1;
      let t = e[ne];
      if (t2.test(t)) return !0;
      if ("-" === t) {
        if (e.length - ne < 2) return !1;
        let t = e[ne + 1];
        if ("-" === t || t2.test(t)) return !0;
      }
      return !1;
    }
    let nr = { deg: 1, rad: 180 / Math.PI, grad: 0.9, turn: 360 };
    function ns(e) {
      let t = "";
      if (
        (("-" === e[ne] || "+" === e[ne]) && (t += e[ne++]),
        (t += ni(e)),
        "." === e[ne] && /\d/.test(e[ne + 1]) && (t += e[ne++] + ni(e)),
        ("e" === e[ne] || "E" === e[ne]) &&
          (("-" === e[ne + 1] || "+" === e[ne + 1]) && /\d/.test(e[ne + 2])
            ? (t += e[ne++] + e[ne++] + ni(e))
            : /\d/.test(e[ne + 1]) && (t += e[ne++] + ni(e))),
        nn(e))
      ) {
        let n = na(e);
        return "deg" === n || "rad" === n || "turn" === n || "grad" === n
          ? { type: "hue", value: t * nr[n] }
          : void 0;
      }
      return "%" === e[ne]
        ? (ne++, { type: t7, value: +t })
        : { type: t6, value: +t };
    }
    function ni(e) {
      let t = "";
      for (; /\d/.test(e[ne]); ) t += e[ne++];
      return t;
    }
    function na(e) {
      let t = "";
      for (; ne < e.length && t5.test(e[ne]); ) t += e[ne++];
      return t;
    }
    function nl(e, t) {
      let n,
        r = [];
      for (; e._i < e.length; ) {
        if (
          (n = e[e._i++]).type === t9 ||
          n.type === t6 ||
          n.type === t8 ||
          n.type === t7 ||
          (t && "hue" === n.type)
        ) {
          r.push(n);
          continue;
        }
        if (")" === n.type) {
          if (e._i < e.length) return;
          continue;
        }
        return;
      }
      if (!(r.length < 3) && !(r.length > 4)) {
        if (4 === r.length) {
          if (r[3].type !== t8) return;
          r[3] = r[3].value;
        }
        return (
          3 === r.length && r.push({ type: t9, value: void 0 }),
          r.every((e) => e.type !== t8) ? r : void 0
        );
      }
    }
    let no = (e) => {
        let t;
        if ("string" != typeof e) return;
        let n = (function (e = "") {
            let t,
              n = e.trim(),
              r = [];
            for (ne = 0; ne < n.length; ) {
              if ("\n" === (t = n[ne++]) || "	" === t || " " === t) {
                for (
                  ;
                  ne < n.length &&
                  ("\n" === n[ne] || "	" === n[ne] || " " === n[ne]);

                )
                  ne++;
                continue;
              }
              if ("," === t) return;
              if (")" === t) {
                r.push({ type: ")" });
                continue;
              }
              if ("+" === t) {
                if ((ne--, nt(n))) {
                  r.push(ns(n));
                  continue;
                }
                return;
              }
              if ("-" === t) {
                if ((ne--, nt(n))) {
                  r.push(ns(n));
                  continue;
                }
                if (nn(n)) {
                  r.push({ type: t4, value: na(n) });
                  continue;
                }
                return;
              }
              if ("." === t) {
                if ((ne--, nt(n))) {
                  r.push(ns(n));
                  continue;
                }
                return;
              }
              if ("/" === t) {
                let e;
                for (
                  ;
                  ne < n.length &&
                  ("\n" === n[ne] || "	" === n[ne] || " " === n[ne]);

                )
                  ne++;
                if (nt(n) && "hue" !== (e = ns(n)).type) {
                  r.push({ type: t8, value: e });
                  continue;
                }
                if (nn(n) && "none" === na(n)) {
                  r.push({ type: t8, value: { type: t9, value: void 0 } });
                  continue;
                }
                return;
              }
              if (/\d/.test(t)) {
                (ne--, r.push(ns(n)));
                continue;
              }
              if (t2.test(t)) {
                (ne--,
                  r.push(
                    (function (e) {
                      let t = na(e);
                      return "(" === e[ne]
                        ? (ne++, { type: t3, value: t })
                        : "none" === t
                          ? { type: t9, value: void 0 }
                          : { type: t4, value: t };
                    })(n),
                  ));
                continue;
              }
              return;
            }
            return r;
          })(e),
          r = n
            ? (function (e, t) {
                e._i = 0;
                let n = e[e._i++];
                if (!n || n.type !== t3) return;
                let r = nl(e, t);
                if (r) return (r.unshift(n.value), r);
              })(n, !0)
            : void 0,
          s = 0,
          i = tY.length;
        for (; s < i; ) if (void 0 !== (t = tY[s++](e, r))) return t;
        return n
          ? (function (e) {
              e._i = 0;
              let t = e[e._i++];
              if (
                !t ||
                t.type !== t3 ||
                "color" !== t.value ||
                (t = e[e._i++]).type !== t4
              )
                return;
              let n = tK[t.value];
              if (!n) return;
              let r = { mode: n },
                s = nl(e, !1);
              if (!s) return;
              let i = t0(n).channels;
              for (let e = 0, t, n; e < i.length; e++)
                ((t = s[e]),
                  (n = i[e]),
                  t.type !== t9 &&
                    ((r[n] = t.type === t6 ? t.value : t.value / 100),
                    "alpha" === n && (r[n] = Math.max(0, Math.min(1, r[n])))));
              return r;
            })(n)
          : void 0;
      },
      nc =
        ((t = (e, t, n) => e + n * (t - e)),
        (e) => {
          let n = ((e) => {
            let t = [];
            for (let n = 0; n < e.length - 1; n++) {
              let r = e[n],
                s = e[n + 1];
              void 0 === r && void 0 === s
                ? t.push(void 0)
                : void 0 !== r && void 0 !== s
                  ? t.push([r, s])
                  : t.push(void 0 !== r ? [r, r] : [s, s]);
            }
            return t;
          })(e);
          return (e) => {
            let r = e * n.length,
              s = e >= 1 ? n.length - 1 : Math.max(Math.floor(r), 0),
              i = n[s];
            return void 0 === i ? void 0 : t(i[0], i[1], r - s);
          };
        }),
      nd = (e) => {
        let t = !1,
          n = e.map((e) => (void 0 !== e ? ((t = !0), e) : 1));
        return t ? n : e;
      },
      nu = {
        mode: "rgb",
        channels: ["r", "g", "b", "alpha"],
        parse: [
          function (e, t) {
            if (!t || ("rgb" !== t[0] && "rgba" !== t[0])) return;
            let n = { mode: "rgb" },
              [, r, s, i, a] = t;
            if ("hue" !== r.type && "hue" !== s.type && "hue" !== i.type)
              return (
                r.type !== t9 &&
                  (n.r = r.type === t6 ? r.value / 255 : r.value / 100),
                s.type !== t9 &&
                  (n.g = s.type === t6 ? s.value / 255 : s.value / 100),
                i.type !== t9 &&
                  (n.b = i.type === t6 ? i.value / 255 : i.value / 100),
                a.type !== t9 &&
                  (n.alpha = Math.min(
                    1,
                    Math.max(0, a.type === t6 ? a.value : a.value / 100),
                  )),
                n
              );
          },
          (e) => {
            let t;
            return (t = e.match(tV))
              ? tP(parseInt(t[1], 16), t[1].length)
              : void 0;
          },
          (e) => {
            let t,
              n = { mode: "rgb" };
            if ((t = e.match(tU)))
              (void 0 !== t[1] && (n.r = t[1] / 255),
                void 0 !== t[2] && (n.g = t[2] / 255),
                void 0 !== t[3] && (n.b = t[3] / 255));
            else {
              if (!(t = e.match(tW))) return;
              (void 0 !== t[1] && (n.r = t[1] / 100),
                void 0 !== t[2] && (n.g = t[2] / 100),
                void 0 !== t[3] && (n.b = t[3] / 100));
            }
            return (
              void 0 !== t[4]
                ? (n.alpha = Math.max(0, Math.min(1, t[4] / 100)))
                : void 0 !== t[5] &&
                  (n.alpha = Math.max(0, Math.min(1, +t[5]))),
              n
            );
          },
          (e) => tP(tD[e.toLowerCase()], 6),
          (e) =>
            "transparent" === e
              ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 }
              : void 0,
          "srgb",
        ],
        serialize: "srgb",
        interpolate: { r: nc, g: nc, b: nc, alpha: { use: nc, fixup: nd } },
        gamut: !0,
        white: { r: 1, g: 1, b: 1 },
        black: { r: 0, g: 0, b: 0 },
      },
      nh = (e = 0) => Math.pow(Math.abs(e), 563 / 256) * Math.sign(e),
      np = (e) => {
        let t = nh(e.r),
          n = nh(e.g),
          r = nh(e.b),
          s = {
            mode: "xyz65",
            x:
              0.5766690429101305 * t +
              0.1855582379065463 * n +
              0.1882286462349947 * r,
            y:
              0.297344975250536 * t +
              0.6273635662554661 * n +
              0.0752914584939979 * r,
            z:
              0.0270313613864123 * t +
              0.0706888525358272 * n +
              0.9913375368376386 * r,
          };
        return (void 0 !== e.alpha && (s.alpha = e.alpha), s);
      },
      nm = (e) => Math.pow(Math.abs(e), 256 / 563) * Math.sign(e),
      nf = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = {
          mode: "a98",
          r: nm(
            2.0415879038107465 * e -
              0.5650069742788597 * t -
              0.3447313507783297 * n,
          ),
          g: nm(
            -0.9692436362808798 * e +
              1.8759675015077206 * t +
              0.0415550574071756 * n,
          ),
          b: nm(
            0.0134442806320312 * e -
              0.1183623922310184 * t +
              1.0151749943912058 * n,
          ),
        };
        return (void 0 !== r && (s.alpha = r), s);
      },
      ng = (e = 0) => {
        let t = Math.abs(e);
        return t <= 0.04045
          ? e / 12.92
          : (Math.sign(e) || 1) * Math.pow((t + 0.055) / 1.055, 2.4);
      },
      nx = ({ r: e, g: t, b: n, alpha: r }) => {
        let s = { mode: "lrgb", r: ng(e), g: ng(t), b: ng(n) };
        return (void 0 !== r && (s.alpha = r), s);
      },
      nv = (e) => {
        let { r: t, g: n, b: r, alpha: s } = nx(e),
          i = {
            mode: "xyz65",
            x:
              0.4123907992659593 * t +
              0.357584339383878 * n +
              0.1804807884018343 * r,
            y:
              0.2126390058715102 * t +
              0.715168678767756 * n +
              0.0721923153607337 * r,
            z:
              0.0193308187155918 * t +
              0.119194779794626 * n +
              0.9505321522496607 * r,
          };
        return (void 0 !== s && (i.alpha = s), i);
      },
      nb = (e = 0) => {
        let t = Math.abs(e);
        return t > 0.0031308
          ? (Math.sign(e) || 1) * (1.055 * Math.pow(t, 1 / 2.4) - 0.055)
          : 12.92 * e;
      },
      ny = ({ r: e, g: t, b: n, alpha: r }, s = "rgb") => {
        let i = { mode: s, r: nb(e), g: nb(t), b: nb(n) };
        return (void 0 !== r && (i.alpha = r), i);
      },
      nj = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = ny({
          r:
            3.2409699419045226 * e -
            1.537383177570094 * t -
            0.4986107602930034 * n,
          g:
            -0.9692436362808796 * e +
            1.8759675015077204 * t +
            0.0415550574071756 * n,
          b:
            0.0556300796969936 * e -
            0.2039769588889765 * t +
            1.0569715142428784 * n,
        });
        return (void 0 !== r && (s.alpha = r), s);
      },
      nC = {
        ...nu,
        mode: "a98",
        parse: ["a98-rgb"],
        serialize: "a98-rgb",
        fromMode: { rgb: (e) => nf(nv(e)), xyz65: nf },
        toMode: { rgb: (e) => nj(np(e)), xyz65: np },
      },
      nw = (e) => ((e %= 360) < 0 ? e + 360 : e),
      nk = (e) => {
        let t;
        return (
          (t = (e) => (180 >= Math.abs(e) ? e : e - 360 * Math.sign(e))),
          e
            .map((n, r, s) => {
              if (void 0 === n) return n;
              let i = nw(n);
              return 0 === r || void 0 === e[r - 1] ? i : t(i - nw(s[r - 1]));
            })
            .reduce(
              (e, t) => (
                e.length && void 0 !== t && void 0 !== e[e.length - 1]
                  ? e.push(t + e[e.length - 1])
                  : e.push(t),
                e
              ),
              [],
            )
        );
      },
      nN = Math.PI / 180,
      nM = 180 / Math.PI,
      nS = -1.78277 * 0.29227 - 0.1347134789,
      nI = (e, t) => {
        if (void 0 === e.h || void 0 === t.h || !e.s || !t.s) return 0;
        let n = nw(e.h),
          r = Math.sin((((nw(t.h) - n + 360) / 2) * Math.PI) / 180);
        return 2 * Math.sqrt(e.s * t.s) * r;
      },
      nL = (e, t) => {
        if (void 0 === e.h || void 0 === t.h || !e.c || !t.c) return 0;
        let n = nw(e.h),
          r = Math.sin((((nw(t.h) - n + 360) / 2) * Math.PI) / 180);
        return 2 * Math.sqrt(e.c * t.c) * r;
      },
      nT = (e) => {
        let t = e.reduce(
            (e, t) => {
              if (void 0 !== t) {
                let n = (t * Math.PI) / 180;
                ((e.sin += Math.sin(n)), (e.cos += Math.cos(n)));
              }
              return e;
            },
            { sin: 0, cos: 0 },
          ),
          n = (180 * Math.atan2(t.sin, t.cos)) / Math.PI;
        return n < 0 ? 360 + n : n;
      },
      nE = {
        mode: "cubehelix",
        channels: ["h", "s", "l", "alpha"],
        parse: ["--cubehelix"],
        serialize: "--cubehelix",
        ranges: { h: [0, 360], s: [0, 4.614], l: [0, 1] },
        fromMode: {
          rgb: ({ r: e, g: t, b: n, alpha: r }) => {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s =
                (nS * n + -1.7884503806 * e - 3.5172982438 * t) /
                (nS + -1.7884503806 - 3.5172982438),
              i = n - s,
              a = -((1.97294 * (t - s) - -0.29227 * i) / 0.90649),
              l = {
                mode: "cubehelix",
                l: s,
                s:
                  0 === s || 1 === s
                    ? void 0
                    : Math.sqrt(i * i + a * a) / (1.97294 * s * (1 - s)),
              };
            return (
              l.s && (l.h = Math.atan2(a, i) * nM - 120),
              void 0 !== r && (l.alpha = r),
              l
            );
          },
        },
        toMode: {
          rgb: ({ h: e, s: t, l: n, alpha: r }) => {
            let s = { mode: "rgb" };
            void 0 === n && (n = 0);
            let i = void 0 === t ? 0 : t * n * (1 - n),
              a = Math.cos((e = (void 0 === e ? 0 : e + 120) * nN)),
              l = Math.sin(e);
            return (
              (s.r = n + i * (-0.14861 * a + 1.78277 * l)),
              (s.g = n + i * (-0.29227 * a + -0.90649 * l)),
              (s.b = n + i * (1.97294 * a + 0 * l)),
              void 0 !== r && (s.alpha = r),
              s
            );
          },
        },
        interpolate: {
          h: { use: nc, fixup: nk },
          s: nc,
          l: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nI },
        average: { h: nT },
      },
      n_ = ({ l: e, a: t, b: n, alpha: r }, s = "lch") => {
        (void 0 === t && (t = 0), void 0 === n && (n = 0));
        let i = Math.sqrt(t * t + n * n),
          a = { mode: s, l: e, c: i };
        return (
          i && (a.h = nw((180 * Math.atan2(n, t)) / Math.PI)),
          void 0 !== r && (a.alpha = r),
          a
        );
      },
      nA = ({ l: e, c: t, h: n, alpha: r }, s = "lab") => {
        void 0 === n && (n = 0);
        let i = {
          mode: s,
          l: e,
          a: t ? t * Math.cos((n / 180) * Math.PI) : 0,
          b: t ? t * Math.sin((n / 180) * Math.PI) : 0,
        };
        return (void 0 !== r && (i.alpha = r), i);
      },
      nR = { X: 0.3457 / 0.3585, Y: 1, Z: 0.8251046025104602 },
      nP = { X: 0.3127 / 0.329, Y: 1, Z: 1.0890577507598784 },
      nD = (e) =>
        Math.pow(e, 3) > 0.008856451679035631
          ? Math.pow(e, 3)
          : (116 * e - 16) / 903.2962962962963,
      nV = ({ l: e, a: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = (e + 16) / 116,
          i = t / 500 + s,
          a = s - n / 200,
          l = {
            mode: "xyz65",
            x: nD(i) * nP.X,
            y: nD(s) * nP.Y,
            z: nD(a) * nP.Z,
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      n$ = (e) => nj(nV(e)),
      nF = (e) =>
        e > 0.008856451679035631
          ? Math.cbrt(e)
          : (903.2962962962963 * e + 16) / 116,
      nz = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = nF(e / nP.X),
          i = nF(t / nP.Y),
          a = {
            mode: "lab65",
            l: 116 * i - 16,
            a: 500 * (s - i),
            b: 200 * (i - nF(n / nP.Z)),
          };
        return (void 0 !== r && (a.alpha = r), a);
      },
      nH = (e) => {
        let t = nz(nv(e));
        return (e.r === e.b && e.b === e.g && (t.a = t.b = 0), t);
      },
      nB = (26 / 180) * Math.PI,
      nO = Math.cos(nB),
      nU = Math.sin(nB),
      nW = 100 / Math.log(1.39),
      nZ = ({ l: e, c: t, h: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = { mode: "lab65", l: (Math.exp(e / nW) - 1) / 0.0039 },
          i = (Math.exp(0.0435 * t * 1) - 1) / 0.075,
          a = i * Math.cos((n / 180) * Math.PI - nB),
          l = i * Math.sin((n / 180) * Math.PI - nB);
        return (
          (s.a = a * nO - (l / 0.83) * nU),
          (s.b = a * nU + (l / 0.83) * nO),
          void 0 !== r && (s.alpha = r),
          s
        );
      },
      nG = ({ l: e, a: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = t * nO + n * nU,
          i = 0.83 * (n * nO - t * nU),
          a = {
            mode: "dlch",
            l: (nW / 1) * Math.log(1 + 0.0039 * e),
            c: Math.log(1 + 0.075 * Math.sqrt(s * s + i * i)) / 0.0435,
          };
        return (
          a.c && (a.h = nw(((Math.atan2(i, s) + nB) / Math.PI) * 180)),
          void 0 !== r && (a.alpha = r),
          a
        );
      },
      nq = (e) => nZ(n_(e, "dlch")),
      nX = (e) => nA(nG(e), "dlab"),
      nY = RegExp(
        `^hsla?\\(\\s*${tB}${tO}${tF}${tO}${tF}\\s*(?:,\\s*${tz}\\s*)?\\)$`,
      ),
      nK = {
        mode: "hsl",
        toMode: {
          rgb: function ({ h: e, s: t, l: n, alpha: r }) {
            let s;
            ((e = nw(void 0 !== e ? e : 0)),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let i = n + t * (n < 0.5 ? n : 1 - n),
              a = i - (i - n) * 2 * Math.abs(((e / 60) % 2) - 1);
            switch (Math.floor(e / 60)) {
              case 0:
                s = { r: i, g: a, b: 2 * n - i };
                break;
              case 1:
                s = { r: a, g: i, b: 2 * n - i };
                break;
              case 2:
                s = { r: 2 * n - i, g: i, b: a };
                break;
              case 3:
                s = { r: 2 * n - i, g: a, b: i };
                break;
              case 4:
                s = { r: a, g: 2 * n - i, b: i };
                break;
              case 5:
                s = { r: i, g: 2 * n - i, b: a };
                break;
              default:
                s = { r: 2 * n - i, g: 2 * n - i, b: 2 * n - i };
            }
            return ((s.mode = "rgb"), void 0 !== r && (s.alpha = r), s);
          },
        },
        fromMode: {
          rgb: function ({ r: e, g: t, b: n, alpha: r }) {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s = Math.max(e, t, n),
              i = Math.min(e, t, n),
              a = {
                mode: "hsl",
                s: s === i ? 0 : (s - i) / (1 - Math.abs(s + i - 1)),
                l: 0.5 * (s + i),
              };
            return (
              s - i != 0 &&
                (a.h =
                  (s === e
                    ? (t - n) / (s - i) + (t < n) * 6
                    : s === t
                      ? (n - e) / (s - i) + 2
                      : (e - t) / (s - i) + 4) * 60),
              void 0 !== r && (a.alpha = r),
              a
            );
          },
        },
        channels: ["h", "s", "l", "alpha"],
        ranges: { h: [0, 360] },
        gamut: "rgb",
        parse: [
          function (e, t) {
            if (!t || ("hsl" !== t[0] && "hsla" !== t[0])) return;
            let n = { mode: "hsl" },
              [, r, s, i, a] = t;
            if (r.type !== t9) {
              if (r.type === t7) return;
              n.h = r.value;
            }
            if (s.type !== t9) {
              if ("hue" === s.type) return;
              n.s = s.value / 100;
            }
            if (i.type !== t9) {
              if ("hue" === i.type) return;
              n.l = i.value / 100;
            }
            return (
              a.type !== t9 &&
                (n.alpha = Math.min(
                  1,
                  Math.max(0, a.type === t6 ? a.value : a.value / 100),
                )),
              n
            );
          },
          (e) => {
            let t = e.match(nY);
            if (!t) return;
            let n = { mode: "hsl" };
            return (
              void 0 !== t[3]
                ? (n.h = +t[3])
                : void 0 !== t[1] &&
                  void 0 !== t[2] &&
                  (n.h = ((e, t) => {
                    switch (t) {
                      case "deg":
                        return +e;
                      case "rad":
                        return (e / Math.PI) * 180;
                      case "grad":
                        return (e / 10) * 9;
                      case "turn":
                        return 360 * e;
                    }
                  })(t[1], t[2])),
              void 0 !== t[4] && (n.s = Math.min(Math.max(0, t[4] / 100), 1)),
              void 0 !== t[5] && (n.l = Math.min(Math.max(0, t[5] / 100), 1)),
              void 0 !== t[6]
                ? (n.alpha = Math.max(0, Math.min(1, t[6] / 100)))
                : void 0 !== t[7] &&
                  (n.alpha = Math.max(0, Math.min(1, +t[7]))),
              n
            );
          },
        ],
        serialize: (e) =>
          `hsl(${void 0 !== e.h ? e.h : "none"} ${void 0 !== e.s ? 100 * e.s + "%" : "none"} ${void 0 !== e.l ? 100 * e.l + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
        interpolate: {
          h: { use: nc, fixup: nk },
          s: nc,
          l: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nI },
        average: { h: nT },
      };
    function nJ({ h: e, s: t, v: n, alpha: r }) {
      let s;
      ((e = nw(void 0 !== e ? e : 0)),
        void 0 === t && (t = 0),
        void 0 === n && (n = 0));
      let i = Math.abs(((e / 60) % 2) - 1);
      switch (Math.floor(e / 60)) {
        case 0:
          s = { r: n, g: n * (1 - t * i), b: n * (1 - t) };
          break;
        case 1:
          s = { r: n * (1 - t * i), g: n, b: n * (1 - t) };
          break;
        case 2:
          s = { r: n * (1 - t), g: n, b: n * (1 - t * i) };
          break;
        case 3:
          s = { r: n * (1 - t), g: n * (1 - t * i), b: n };
          break;
        case 4:
          s = { r: n * (1 - t * i), g: n * (1 - t), b: n };
          break;
        case 5:
          s = { r: n, g: n * (1 - t), b: n * (1 - t * i) };
          break;
        default:
          s = { r: n * (1 - t), g: n * (1 - t), b: n * (1 - t) };
      }
      return ((s.mode = "rgb"), void 0 !== r && (s.alpha = r), s);
    }
    function nQ({ r: e, g: t, b: n, alpha: r }) {
      (void 0 === e && (e = 0),
        void 0 === t && (t = 0),
        void 0 === n && (n = 0));
      let s = Math.max(e, t, n),
        i = Math.min(e, t, n),
        a = { mode: "hsv", s: 0 === s ? 0 : 1 - i / s, v: s };
      return (
        s - i != 0 &&
          (a.h =
            (s === e
              ? (t - n) / (s - i) + (t < n) * 6
              : s === t
                ? (n - e) / (s - i) + 2
                : (e - t) / (s - i) + 4) * 60),
        void 0 !== r && (a.alpha = r),
        a
      );
    }
    let n0 = {
      mode: "hsv",
      toMode: { rgb: nJ },
      parse: ["--hsv"],
      serialize: "--hsv",
      fromMode: { rgb: nQ },
      channels: ["h", "s", "v", "alpha"],
      ranges: { h: [0, 360] },
      gamut: "rgb",
      interpolate: {
        h: { use: nc, fixup: nk },
        s: nc,
        v: nc,
        alpha: { use: nc, fixup: nd },
      },
      difference: { h: nI },
      average: { h: nT },
    };
    function n1(e) {
      if (e < 0) return 0;
      let t = Math.pow(e, 0.012683313515655966);
      return (
        1e4 *
        Math.pow(
          Math.max(0, t - 0.8359375) / (18.8515625 - 18.6875 * t),
          6.277394636015326,
        )
      );
    }
    function n2(e) {
      if (e < 0) return 0;
      let t = Math.pow(e / 1e4, 0.1593017578125);
      return Math.pow(
        (0.8359375 + 18.8515625 * t) / (1 + 18.6875 * t),
        78.84375,
      );
    }
    let n5 = (e) => Math.max(e / 203, 0),
      n3 = ({ i: e, t, p: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = n1(e + 0.008609037037932761 * t + 0.11102962500302593 * n),
          i = n1(e - 0.00860903703793275 * t - 0.11102962500302599 * n),
          a = n1(e + 0.5600313357106791 * t - 0.32062717498731885 * n),
          l = {
            mode: "xyz65",
            x: n5(
              2.070152218389422 * s -
                1.3263473389671556 * i +
                0.2066510476294051 * a,
            ),
            y: n5(
              0.3647385209748074 * s +
                0.680566024947227 * i -
                0.0453045459220346 * a,
            ),
            z: n5(
              -0.049747207535812 * s -
                0.0492609666966138 * i +
                1.1880659249923042 * a,
            ),
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      n4 = (e = 0) => Math.max(203 * e, 0),
      n6 = ({ x: e, y: t, z: n, alpha: r }) => {
        let s = n4(e),
          i = n4(t),
          a = n4(n),
          l = n2(
            0.3592832590121217 * s +
              0.6976051147779502 * i -
              0.0358915932320289 * a,
          ),
          o = n2(
            -0.1920808463704995 * s +
              1.1004767970374323 * i +
              0.0753748658519118 * a,
          ),
          c = n2(
            0.0070797844607477 * s +
              0.0748396662186366 * i +
              0.8433265453898765 * a,
          ),
          d = {
            mode: "itp",
            i: 0.5 * l + 0.5 * o,
            t: 1.61376953125 * l - 3.323486328125 * o + 1.709716796875 * c,
            p: 4.378173828125 * l - 4.24560546875 * o - 0.132568359375 * c,
          };
        return (void 0 !== r && (d.alpha = r), d);
      },
      n7 = (e) => {
        if (e < 0) return 0;
        let t = Math.pow(e / 1e4, 0.1593017578125);
        return Math.pow(
          (0.8359375 + 18.8515625 * t) / (1 + 18.6875 * t),
          134.03437499999998,
        );
      },
      n9 = (e = 0) => Math.max(203 * e, 0),
      n8 = ({ x: e, y: t, z: n, alpha: r }) => {
        ((e = n9(e)), (t = n9(t)));
        let s = 1.15 * e - 0.15 * (n = n9(n)),
          i = 0.66 * t + 0.34 * e,
          a = n7(0.41478972 * s + 0.579999 * i + 0.014648 * n),
          l = n7(-0.20151 * s + 1.120649 * i + 0.0531008 * n),
          o = n7(-0.0166008 * s + 0.2648 * i + 0.6684799 * n),
          c = (a + l) / 2,
          d = {
            mode: "jab",
            j: (0.44 * c) / (1 - 0.56 * c) - 16295499532821565e-27,
            a: 3.524 * a - 4.066708 * l + 0.542708 * o,
            b: 0.199076 * a + 1.096799 * l - 1.295875 * o,
          };
        return (void 0 !== r && (d.alpha = r), d);
      },
      re = (e) => {
        if (e < 0) return 0;
        let t = Math.pow(e, 0.007460772656268216);
        return (
          1e4 *
          Math.pow(
            (0.8359375 - t) / (18.6875 * t - 18.8515625),
            6.277394636015326,
          )
        );
      },
      rt = ({ j: e, a: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s =
            (e + 16295499532821565e-27) /
            (0.44 + 0.56 * (e + 16295499532821565e-27)),
          i = re(s + 0.13860504 * t + 0.058047316 * n),
          a = re(s - 0.13860504 * t - 0.058047316 * n),
          l = re(s - 0.096019242 * t - 0.8118919 * n),
          o = {
            mode: "xyz65",
            x:
              (1.661373024652174 * i -
                0.914523081304348 * a +
                0.23136208173913045 * l) /
              203,
            y:
              (-0.3250758611844533 * i +
                1.571847026732543 * a -
                0.21825383453227928 * l) /
              203,
            z: (-0.090982811 * i - 0.31272829 * a + 1.5227666 * l) / 203,
          };
        return (void 0 !== r && (o.alpha = r), o);
      },
      rn = (e) => {
        let t = n8(nv(e));
        return (e.r === e.b && e.b === e.g && (t.a = t.b = 0), t);
      },
      rr = (e) => nj(rt(e)),
      rs = ({ j: e, a: t, b: n, alpha: r }) => {
        (void 0 === t && (t = 0), void 0 === n && (n = 0));
        let s = Math.sqrt(t * t + n * n),
          i = { mode: "jch", j: e, c: s };
        return (
          s && (i.h = nw((180 * Math.atan2(n, t)) / Math.PI)),
          void 0 !== r && (i.alpha = r),
          i
        );
      },
      ri = ({ j: e, c: t, h: n, alpha: r }) => {
        void 0 === n && (n = 0);
        let s = {
          mode: "jab",
          j: e,
          a: t ? t * Math.cos((n / 180) * Math.PI) : 0,
          b: t ? t * Math.sin((n / 180) * Math.PI) : 0,
        };
        return (void 0 !== r && (s.alpha = r), s);
      },
      ra = (e) =>
        Math.pow(e, 3) > 0.008856451679035631
          ? Math.pow(e, 3)
          : (116 * e - 16) / 903.2962962962963,
      rl = ({ l: e, a: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = (e + 16) / 116,
          i = t / 500 + s,
          a = s - n / 200,
          l = {
            mode: "xyz50",
            x: ra(i) * nR.X,
            y: ra(s) * nR.Y,
            z: ra(a) * nR.Z,
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      ro = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = ny({
          r:
            3.1341359569958707 * e -
            1.6173863321612538 * t -
            0.4906619460083532 * n,
          g:
            -0.978795502912089 * e +
            1.916254567259524 * t +
            0.03344273116131949 * n,
          b:
            0.07195537988411677 * e -
            0.2289768264158322 * t +
            1.405386058324125 * n,
        });
        return (void 0 !== r && (s.alpha = r), s);
      },
      rc = (e) => ro(rl(e)),
      rd = (e) => {
        let { r: t, g: n, b: r, alpha: s } = nx(e),
          i = {
            mode: "xyz50",
            x:
              0.436065742824811 * t +
              0.3851514688337912 * n +
              0.14307845442264197 * r,
            y:
              0.22249319175623702 * t +
              0.7168870538238823 * n +
              0.06061979053616537 * r,
            z:
              0.013923904500943465 * t +
              0.09708128566574634 * n +
              0.7140993584005155 * r,
          };
        return (void 0 !== s && (i.alpha = s), i);
      },
      ru = (e) =>
        e > 0.008856451679035631
          ? Math.cbrt(e)
          : (903.2962962962963 * e + 16) / 116,
      rh = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = ru(e / nR.X),
          i = ru(t / nR.Y),
          a = {
            mode: "lab",
            l: 116 * i - 16,
            a: 500 * (s - i),
            b: 200 * (i - ru(n / nR.Z)),
          };
        return (void 0 !== r && (a.alpha = r), a);
      },
      rp = (e) => {
        let t = rh(rd(e));
        return (e.r === e.b && e.b === e.g && (t.a = t.b = 0), t);
      },
      rm = {
        mode: "lab",
        toMode: { xyz50: rl, rgb: rc },
        fromMode: { xyz50: rh, rgb: rp },
        channels: ["l", "a", "b", "alpha"],
        ranges: { l: [0, 100], a: [-125, 125], b: [-125, 125] },
        parse: [
          function (e, t) {
            if (!t || "lab" !== t[0]) return;
            let n = { mode: "lab" },
              [, r, s, i, a] = t;
            if ("hue" !== r.type && "hue" !== s.type && "hue" !== i.type)
              return (
                r.type !== t9 && (n.l = Math.min(Math.max(0, r.value), 100)),
                s.type !== t9 &&
                  (n.a = s.type === t6 ? s.value : (125 * s.value) / 100),
                i.type !== t9 &&
                  (n.b = i.type === t6 ? i.value : (125 * i.value) / 100),
                a.type !== t9 &&
                  (n.alpha = Math.min(
                    1,
                    Math.max(0, a.type === t6 ? a.value : a.value / 100),
                  )),
                n
              );
          },
        ],
        serialize: (e) =>
          `lab(${void 0 !== e.l ? e.l : "none"} ${void 0 !== e.a ? e.a : "none"} ${void 0 !== e.b ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
        interpolate: { l: nc, a: nc, b: nc, alpha: { use: nc, fixup: nd } },
      },
      rf = {
        ...rm,
        mode: "lab65",
        parse: ["--lab-d65"],
        serialize: "--lab-d65",
        toMode: { xyz65: nV, rgb: n$ },
        fromMode: { xyz65: nz, rgb: nH },
        ranges: { l: [0, 100], a: [-125, 125], b: [-125, 125] },
      },
      rg = {
        mode: "lch",
        toMode: { lab: nA, rgb: (e) => rc(nA(e)) },
        fromMode: { rgb: (e) => n_(rp(e)), lab: n_ },
        channels: ["l", "c", "h", "alpha"],
        ranges: { l: [0, 100], c: [0, 150], h: [0, 360] },
        parse: [
          function (e, t) {
            if (!t || "lch" !== t[0]) return;
            let n = { mode: "lch" },
              [, r, s, i, a] = t;
            if (r.type !== t9) {
              if ("hue" === r.type) return;
              n.l = Math.min(Math.max(0, r.value), 100);
            }
            if (
              (s.type !== t9 &&
                (n.c = Math.max(
                  0,
                  s.type === t6 ? s.value : (150 * s.value) / 100,
                )),
              i.type !== t9)
            ) {
              if (i.type === t7) return;
              n.h = i.value;
            }
            return (
              a.type !== t9 &&
                (n.alpha = Math.min(
                  1,
                  Math.max(0, a.type === t6 ? a.value : a.value / 100),
                )),
              n
            );
          },
        ],
        serialize: (e) =>
          `lch(${void 0 !== e.l ? e.l : "none"} ${void 0 !== e.c ? e.c : "none"} ${void 0 !== e.h ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
        interpolate: {
          h: { use: nc, fixup: nk },
          c: nc,
          l: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nL },
        average: { h: nT },
      },
      rx = {
        ...rg,
        mode: "lch65",
        parse: ["--lch-d65"],
        serialize: "--lch-d65",
        toMode: {
          lab65: (e) => nA(e, "lab65"),
          rgb: (e) => n$(nA(e, "lab65")),
        },
        fromMode: {
          rgb: (e) => n_(nH(e), "lch65"),
          lab65: (e) => n_(e, "lch65"),
        },
        ranges: { l: [0, 100], c: [0, 150], h: [0, 360] },
      },
      rv = ({ l: e, u: t, v: n, alpha: r }) => {
        (void 0 === t && (t = 0), void 0 === n && (n = 0));
        let s = Math.sqrt(t * t + n * n),
          i = { mode: "lchuv", l: e, c: s };
        return (
          s && (i.h = nw((180 * Math.atan2(n, t)) / Math.PI)),
          void 0 !== r && (i.alpha = r),
          i
        );
      },
      rb = ({ l: e, c: t, h: n, alpha: r }) => {
        void 0 === n && (n = 0);
        let s = {
          mode: "luv",
          l: e,
          u: t ? t * Math.cos((n / 180) * Math.PI) : 0,
          v: t ? t * Math.sin((n / 180) * Math.PI) : 0,
        };
        return (void 0 !== r && (s.alpha = r), s);
      },
      ry = (e, t, n) => (4 * e) / (e + 15 * t + 3 * n),
      rj = (e, t, n) => (9 * t) / (e + 15 * t + 3 * n),
      rC = ry(nR.X, nR.Y, nR.Z),
      rw = rj(nR.X, nR.Y, nR.Z),
      rk = ({ x: e, y: t, z: n, alpha: r }) => {
        let s;
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let i =
            (s = t / nR.Y) <= 0.008856451679035631
              ? 903.2962962962963 * s
              : 116 * Math.cbrt(s) - 16,
          a = ry(e, t, n),
          l = rj(e, t, n);
        isFinite(a) && isFinite(l)
          ? ((a = 13 * i * (a - rC)), (l = 13 * i * (l - rw)))
          : (i = a = l = 0);
        let o = { mode: "luv", l: i, u: a, v: l };
        return (void 0 !== r && (o.alpha = r), o);
      },
      rN = ((n = nR.X), (4 * n) / (n + 15 * nR.Y + 3 * nR.Z)),
      rM = ((r = nR.X), (9 * (s = nR.Y)) / (r + 15 * s + 3 * nR.Z)),
      rS = ({ l: e, u: t, v: n, alpha: r }) => {
        if ((void 0 === e && (e = 0), 0 === e))
          return { mode: "xyz50", x: 0, y: 0, z: 0 };
        (void 0 === t && (t = 0), void 0 === n && (n = 0));
        let s = t / (13 * e) + rN,
          i = n / (13 * e) + rM,
          a =
            nR.Y *
            (e <= 8 ? e / 903.2962962962963 : Math.pow((e + 16) / 116, 3)),
          l = {
            mode: "xyz50",
            x: (9 * s * a) / (4 * i),
            y: a,
            z: (a * (12 - 3 * s - 20 * i)) / (4 * i),
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      rI = {
        ...nu,
        mode: "lrgb",
        toMode: { rgb: ny },
        fromMode: { rgb: nx },
        parse: ["srgb-linear"],
        serialize: "srgb-linear",
      },
      rL = ({ r: e, g: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = Math.cbrt(
            0.412221469470763 * e +
              0.5363325372617348 * t +
              0.0514459932675022 * n,
          ),
          i = Math.cbrt(
            0.2119034958178252 * e +
              0.6806995506452344 * t +
              0.1073969535369406 * n,
          ),
          a = Math.cbrt(
            0.0883024591900564 * e +
              0.2817188391361215 * t +
              0.6299787016738222 * n,
          ),
          l = {
            mode: "oklab",
            l:
              0.210454268309314 * s +
              0.7936177747023054 * i -
              0.0040720430116193 * a,
            a:
              1.9779985324311684 * s -
              2.42859224204858 * i +
              0.450593709617411 * a,
            b:
              0.0259040424655478 * s +
              0.7827717124575296 * i -
              0.8086757549230774 * a,
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      rT = (e) => {
        let t = rL(nx(e));
        return (e.r === e.b && e.b === e.g && (t.a = t.b = 0), t);
      },
      rE = ({ l: e, a: t, b: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = Math.pow(
            e + 0.3963377773761749 * t + 0.2158037573099136 * n,
            3,
          ),
          i = Math.pow(e - 0.1055613458156586 * t - 0.0638541728258133 * n, 3),
          a = Math.pow(e - 0.0894841775298119 * t - 1.2914855480194092 * n, 3),
          l = {
            mode: "lrgb",
            r:
              4.076741636075957 * s -
              3.3077115392580616 * i +
              0.2309699031821044 * a,
            g:
              -1.2684379732850317 * s +
              2.6097573492876887 * i -
              0.3413193760026573 * a,
            b:
              -0.0041960761386756 * s -
              0.7034186179359362 * i +
              1.7076146940746117 * a,
          };
        return (void 0 !== r && (l.alpha = r), l);
      },
      r_ = (e) => ny(rE(e));
    function rA(e) {
      return (
        0.5 *
        ((1.206 / 1.03) * e -
          0.206 +
          Math.sqrt(
            ((1.206 / 1.03) * e - 0.206) * ((1.206 / 1.03) * e - 0.206) +
              (1.206 / 1.03) * 0.12 * e,
          ))
      );
    }
    function rR(e) {
      return (e * e + 0.206 * e) / ((1.206 / 1.03) * (e + 0.03));
    }
    function rP(e, t) {
      let n,
        r,
        s,
        i,
        a,
        l,
        o,
        c,
        d,
        u,
        h,
        p,
        m,
        f,
        g,
        x,
        v,
        b =
          (-1.88170328 * e - 0.80936493 * t > 1
            ? ((n = 1.19086277),
              (r = 1.76576728),
              (s = 0.59662641),
              (i = 0.75515197),
              (a = 0.56771245),
              (l = 4.0767416621),
              (o = -3.3077115913),
              (c = 0.2309699292))
            : 1.81444104 * e - 1.19445276 * t > 1
              ? ((n = 0.73956515),
                (r = -0.45954404),
                (s = 0.08285427),
                (i = 0.1254107),
                (a = 0.14503204),
                (l = -1.2684380046),
                (o = 2.6097574011),
                (c = -0.3413193965))
              : ((n = 1.35733652),
                (r = -0.00915799),
                (s = -1.1513021),
                (i = -0.50559606),
                (a = 0.00692167),
                (l = -0.0041960863),
                (o = -0.7034186147),
                (c = 1.707614701)),
          (d = n + r * e + s * t + i * e * e + a * e * t),
          (u = 0.3963377774 * e + 0.2158037573 * t),
          (h = -0.1055613458 * e - 0.0638541728 * t),
          (p = -0.0894841775 * e - 1.291485548 * t),
          (x =
            l * ((m = 1 + d * u) * m * m) +
            o * ((f = 1 + d * h) * f * f) +
            c * ((g = 1 + d * p) * g * g)),
          (d -=
            (x *
              (v = 3 * u * m * m * l + 3 * h * f * f * o + 3 * p * g * g * c)) /
            (v * v -
              0.5 *
                x *
                (6 * u * u * m * l + 6 * h * h * f * o + 6 * p * p * g * c)))),
        y = rE({ l: 1, a: b * e, b: b * t }),
        j = Math.cbrt(1 / Math.max(y.r, y.g, y.b));
      return [j, j * b];
    }
    function rD(e, t, n = null) {
      n || (n = rP(e, t));
      let r = n[0],
        s = n[1];
      return [s / r, s / (1 - r)];
    }
    function rV(e, t, n) {
      let r = rP(t, n),
        s = (function (e, t, n, r, s, i = null) {
          let a;
          if ((i || (i = rP(e, t)), (n - s) * i[1] - (i[0] - s) * 1 <= 0))
            a = (i[1] * s) / (+i[0] + i[1] * (s - n));
          else {
            a = (i[1] * (s - 1)) / (+(i[0] - 1) + i[1] * (s - n));
            {
              let r = n - s,
                i = 0.3963377774 * e + 0.2158037573 * t,
                l = -0.1055613458 * e - 0.0638541728 * t,
                o = -0.0894841775 * e - 1.291485548 * t,
                c = r + +i,
                d = r + +l,
                u = r + +o;
              {
                let e = s * (1 - a) + a * n,
                  t = +a,
                  r = e + t * i,
                  h = e + t * l,
                  p = e + t * o,
                  m = r * r * r,
                  f = h * h * h,
                  g = p * p * p,
                  x = 3 * c * r * r,
                  v = 3 * d * h * h,
                  b = 3 * u * p * p,
                  y = 6 * c * c * r,
                  j = 6 * d * d * h,
                  C = 6 * u * u * p,
                  w =
                    4.0767416621 * m - 3.3077115913 * f + 0.2309699292 * g - 1,
                  k = 4.0767416621 * x - 3.3077115913 * v + 0.2309699292 * b,
                  N =
                    k /
                    (k * k -
                      0.5 *
                        w *
                        (4.0767416621 * y -
                          3.3077115913 * j +
                          0.2309699292 * C)),
                  M = -w * N,
                  S =
                    -1.2684380046 * m + 2.6097574011 * f - 0.3413193965 * g - 1,
                  I = -1.2684380046 * x + 2.6097574011 * v - 0.3413193965 * b,
                  L =
                    I /
                    (I * I -
                      0.5 *
                        S *
                        (-1.2684380046 * y +
                          2.6097574011 * j -
                          0.3413193965 * C)),
                  T = -S * L,
                  E =
                    -0.0041960863 * m - 0.7034186147 * f + 1.707614701 * g - 1,
                  _ = -0.0041960863 * x - 0.7034186147 * v + 1.707614701 * b,
                  A =
                    _ /
                    (_ * _ -
                      0.5 *
                        E *
                        (-0.0041960863 * y -
                          0.7034186147 * j +
                          1.707614701 * C)),
                  R = -E * A;
                a += Math.min(
                  (M = N >= 0 ? M : 1e6),
                  Math.min((T = L >= 0 ? T : 1e6), (R = A >= 0 ? R : 1e6)),
                );
              }
            }
          }
          return a;
        })(t, n, e, 0, e, r),
        i = rD(t, n, r),
        a =
          0.11516993 +
          1 /
            (7.4477897 +
              4.1590124 * n +
              t *
                (-2.19557347 +
                  1.75198401 * n +
                  t *
                    (-2.13704948 -
                      10.02301043 * n +
                      t * (-4.24894561 + 5.38770819 * n + 4.69891013 * t)))),
        l =
          0.11239642 +
          1 /
            (1.6132032 -
              0.68124379 * n +
              t *
                (0.40370612 +
                  0.90148123 * n +
                  t *
                    (-0.27087943 +
                      0.6122399 * n +
                      t * (0.00299215 - 0.45399568 * n - 0.14661872 * t)))),
        o = s / Math.min(e * i[0], (1 - e) * i[1]),
        c = e * a,
        d = (1 - e) * l,
        u =
          0.9 *
          o *
          Math.sqrt(Math.sqrt(1 / (1 / (c * c * c * c) + 1 / (d * d * d * d))));
      return [
        Math.sqrt(
          1 / (1 / ((c = 0.4 * e) * c) + 1 / ((d = (1 - e) * 0.8) * d)),
        ),
        u,
        s,
      ];
    }
    function r$(e) {
      let t,
        n = void 0 !== e.l ? e.l : 0,
        r = void 0 !== e.a ? e.a : 0,
        s = void 0 !== e.b ? e.b : 0,
        i = { mode: "okhsl", l: rA(n) };
      void 0 !== e.alpha && (i.alpha = e.alpha);
      let a = Math.sqrt(r * r + s * s);
      if (!a) return ((i.s = 0), i);
      let [l, o, c] = rV(n, r / a, s / a);
      if (a < o) {
        let e = 0.8 * l;
        t = ((a - 0) / (e + (1 - e / o) * (a - 0))) * 0.8;
      } else {
        let e = (0.2 * o * o * 1.5625) / l;
        t = 0.8 + 0.2 * ((a - o) / (e + (1 - e / (c - o)) * (a - o)));
      }
      return (
        t && ((i.s = t), (i.h = nw((180 * Math.atan2(s, r)) / Math.PI))),
        i
      );
    }
    function rF(e) {
      let t,
        n,
        r,
        s,
        i = void 0 !== e.h ? e.h : 0,
        a = void 0 !== e.s ? e.s : 0,
        l = void 0 !== e.l ? e.l : 0,
        o = { mode: "oklab", l: rR(l) };
      if ((void 0 !== e.alpha && (o.alpha = e.alpha), !a || 1 === l))
        return ((o.a = o.b = 0), o);
      let c = Math.cos((i / 180) * Math.PI),
        d = Math.sin((i / 180) * Math.PI),
        [u, h, p] = rV(o.l, c, d);
      a < 0.8
        ? ((t = 1.25 * a), (n = 0), (s = 1 - (r = 0.8 * u) / h))
        : ((t = 5 * (a - 0.8)),
          (n = h),
          (s = 1 - (r = (0.2 * h * h * 1.5625) / u) / (p - h)));
      let m = n + (t * r) / (1 - s * t);
      return ((o.a = m * c), (o.b = m * d), o);
    }
    let rz = {
      ...nK,
      mode: "okhsl",
      channels: ["h", "s", "l", "alpha"],
      parse: ["--okhsl"],
      serialize: "--okhsl",
      fromMode: { oklab: r$, rgb: (e) => r$(rT(e)) },
      toMode: { oklab: rF, rgb: (e) => r_(rF(e)) },
    };
    function rH(e) {
      let t = void 0 !== e.l ? e.l : 0,
        n = void 0 !== e.a ? e.a : 0,
        r = void 0 !== e.b ? e.b : 0,
        s = Math.sqrt(n * n + r * r),
        i = s ? n / s : 1,
        a = s ? r / s : 1,
        [l, o] = rD(i, a),
        c = o / (s + t * o),
        d = c * t,
        u = c * s,
        h = rR(d),
        p = (u * h) / d,
        m = rE({ l: h, a: i * p, b: a * p }),
        f = Math.cbrt(1 / Math.max(m.r, m.g, m.b, 0));
      t /= f;
      let g = {
        mode: "okhsv",
        s: (s = ((s / f) * rA(t)) / t)
          ? ((0.5 + o) * u) / (0.5 * o + o * (1 - 0.5 / l) * u)
          : 0,
        v: (t = rA(t)) ? t / d : 0,
      };
      return (
        g.s && (g.h = nw((180 * Math.atan2(r, n)) / Math.PI)),
        void 0 !== e.alpha && (g.alpha = e.alpha),
        g
      );
    }
    function rB(e) {
      let t = { mode: "oklab" };
      void 0 !== e.alpha && (t.alpha = e.alpha);
      let n = void 0 !== e.h ? e.h : 0,
        r = void 0 !== e.s ? e.s : 0,
        s = void 0 !== e.v ? e.v : 0,
        i = Math.cos((n / 180) * Math.PI),
        a = Math.sin((n / 180) * Math.PI),
        [l, o] = rD(i, a),
        c = 1 - 0.5 / l,
        d = 1 - (0.5 * r) / (0.5 + o - o * c * r),
        u = (r * o * 0.5) / (0.5 + o - o * c * r),
        h = rR(d),
        p = (u * h) / d,
        m = rE({ l: h, a: i * p, b: a * p }),
        f = Math.cbrt(1 / Math.max(m.r, m.g, m.b, 0)),
        g = rR(s * d),
        x = (u * g) / d;
      return ((t.l = g * f), (t.a = x * i * f), (t.b = x * a * f), t);
    }
    let rO = {
        ...n0,
        mode: "okhsv",
        channels: ["h", "s", "v", "alpha"],
        parse: ["--okhsv"],
        serialize: "--okhsv",
        fromMode: { oklab: rH, rgb: (e) => rH(rT(e)) },
        toMode: { oklab: rB, rgb: (e) => r_(rB(e)) },
      },
      rU = {
        ...rm,
        mode: "oklab",
        toMode: { lrgb: rE, rgb: r_ },
        fromMode: { lrgb: rL, rgb: rT },
        ranges: { l: [0, 1], a: [-0.4, 0.4], b: [-0.4, 0.4] },
        parse: [
          function (e, t) {
            if (!t || "oklab" !== t[0]) return;
            let n = { mode: "oklab" },
              [, r, s, i, a] = t;
            if ("hue" !== r.type && "hue" !== s.type && "hue" !== i.type)
              return (
                r.type !== t9 &&
                  (n.l = Math.min(
                    Math.max(0, r.type === t6 ? r.value : r.value / 100),
                    1,
                  )),
                s.type !== t9 &&
                  (n.a = s.type === t6 ? s.value : (0.4 * s.value) / 100),
                i.type !== t9 &&
                  (n.b = i.type === t6 ? i.value : (0.4 * i.value) / 100),
                a.type !== t9 &&
                  (n.alpha = Math.min(
                    1,
                    Math.max(0, a.type === t6 ? a.value : a.value / 100),
                  )),
                n
              );
          },
        ],
        serialize: (e) =>
          `oklab(${void 0 !== e.l ? e.l : "none"} ${void 0 !== e.a ? e.a : "none"} ${void 0 !== e.b ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
      },
      rW = {
        ...rg,
        mode: "oklch",
        toMode: {
          oklab: (e) => nA(e, "oklab"),
          rgb: (e) => r_(nA(e, "oklab")),
        },
        fromMode: {
          rgb: (e) => n_(rT(e), "oklch"),
          oklab: (e) => n_(e, "oklch"),
        },
        parse: [
          function (e, t) {
            if (!t || "oklch" !== t[0]) return;
            let n = { mode: "oklch" },
              [, r, s, i, a] = t;
            if (r.type !== t9) {
              if ("hue" === r.type) return;
              n.l = Math.min(
                Math.max(0, r.type === t6 ? r.value : r.value / 100),
                1,
              );
            }
            if (
              (s.type !== t9 &&
                (n.c = Math.max(
                  0,
                  s.type === t6 ? s.value : (0.4 * s.value) / 100,
                )),
              i.type !== t9)
            ) {
              if (i.type === t7) return;
              n.h = i.value;
            }
            return (
              a.type !== t9 &&
                (n.alpha = Math.min(
                  1,
                  Math.max(0, a.type === t6 ? a.value : a.value / 100),
                )),
              n
            );
          },
        ],
        serialize: (e) =>
          `oklch(${void 0 !== e.l ? e.l : "none"} ${void 0 !== e.c ? e.c : "none"} ${void 0 !== e.h ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
        ranges: { l: [0, 1], c: [0, 0.4], h: [0, 360] },
      },
      rZ = (e) => {
        let { r: t, g: n, b: r, alpha: s } = nx(e),
          i = {
            mode: "xyz65",
            x:
              0.486570948648216 * t +
              0.265667693169093 * n +
              0.1982172852343625 * r,
            y:
              0.2289745640697487 * t +
              0.6917385218365062 * n +
              0.079286914093745 * r,
            z: 0 * t + 0.0451133818589026 * n + 1.043944368900976 * r,
          };
        return (void 0 !== s && (i.alpha = s), i);
      },
      rG = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = ny(
          {
            r:
              2.4934969119414263 * e -
              0.9313836179191242 * t -
              0.402710784450717 * n,
            g:
              -0.8294889695615749 * e +
              1.7626640603183465 * t +
              0.0236246858419436 * n,
            b:
              0.0358458302437845 * e -
              0.0761723892680418 * t +
              0.9568845240076871 * n,
          },
          "p3",
        );
        return (void 0 !== r && (s.alpha = r), s);
      },
      rq = {
        ...nu,
        mode: "p3",
        parse: ["display-p3"],
        serialize: "display-p3",
        fromMode: { rgb: (e) => rG(nv(e)), xyz65: rG },
        toMode: { rgb: (e) => nj(rZ(e)), xyz65: rZ },
      },
      rX = (e) => {
        let t = Math.abs(e);
        return t >= 1 / 512 ? Math.sign(e) * Math.pow(t, 1 / 1.8) : 16 * e;
      },
      rY = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = {
          mode: "prophoto",
          r: rX(
            1.3457868816471585 * e -
              0.2555720873797946 * t -
              0.0511018649755453 * n,
          ),
          g: rX(
            -0.5446307051249019 * e +
              1.5082477428451466 * t +
              0.0205274474364214 * n,
          ),
          b: rX(0 * e + 0 * t + 1.2119675456389452 * n),
        };
        return (void 0 !== r && (s.alpha = r), s);
      },
      rK = (e = 0) => {
        let t = Math.abs(e);
        return t >= 16 / 512 ? Math.sign(e) * Math.pow(t, 1.8) : e / 16;
      },
      rJ = (e) => {
        let t = rK(e.r),
          n = rK(e.g),
          r = rK(e.b),
          s = {
            mode: "xyz50",
            x:
              0.7977666449006423 * t +
              0.1351812974005331 * n +
              0.0313477341283922 * r,
            y:
              0.2880748288194013 * t +
              0.7118352342418731 * n +
              899369387256e-16 * r,
            z: 0 * t + 0 * n + 0.8251046025104602 * r,
          };
        return (void 0 !== e.alpha && (s.alpha = e.alpha), s);
      },
      rQ = {
        ...nu,
        mode: "prophoto",
        parse: ["prophoto-rgb"],
        serialize: "prophoto-rgb",
        fromMode: { xyz50: rY, rgb: (e) => rY(rd(e)) },
        toMode: { xyz50: rJ, rgb: (e) => ro(rJ(e)) },
      },
      r0 = (e) => {
        let t = Math.abs(e);
        return t > 0.018053968510807
          ? (Math.sign(e) || 1) *
              (1.09929682680944 * Math.pow(t, 0.45) - (1.09929682680944 - 1))
          : 4.5 * e;
      },
      r1 = ({ x: e, y: t, z: n, alpha: r }) => {
        (void 0 === e && (e = 0),
          void 0 === t && (t = 0),
          void 0 === n && (n = 0));
        let s = {
          mode: "rec2020",
          r: r0(
            1.7166511879712683 * e -
              0.3556707837763925 * t -
              0.2533662813736599 * n,
          ),
          g: r0(
            -0.6666843518324893 * e +
              1.6164812366349395 * t +
              0.0157685458139111 * n,
          ),
          b: r0(
            0.0176398574453108 * e -
              0.0427706132578085 * t +
              0.9421031212354739 * n,
          ),
        };
        return (void 0 !== r && (s.alpha = r), s);
      },
      r2 = (e = 0) => {
        let t = Math.abs(e);
        return t < 0.08124285829863151
          ? e / 4.5
          : (Math.sign(e) || 1) *
              Math.pow((t + 1.09929682680944 - 1) / 1.09929682680944, 1 / 0.45);
      },
      r5 = (e) => {
        let t = r2(e.r),
          n = r2(e.g),
          r = r2(e.b),
          s = {
            mode: "xyz65",
            x:
              0.6369580483012911 * t +
              0.1446169035862083 * n +
              0.1688809751641721 * r,
            y:
              0.262700212011267 * t +
              0.6779980715188708 * n +
              0.059301716469862 * r,
            z: 0 * t + 0.0280726930490874 * n + 1.0609850577107909 * r,
          };
        return (void 0 !== e.alpha && (s.alpha = e.alpha), s);
      },
      r3 = {
        ...nu,
        mode: "rec2020",
        fromMode: { xyz65: r1, rgb: (e) => r1(nv(e)) },
        toMode: { xyz65: r5, rgb: (e) => nj(r5(e)) },
        parse: ["rec2020"],
        serialize: "rec2020",
      },
      r4 = Math.cbrt(0.0037930732552754493),
      r6 = (e) => Math.cbrt(e) - r4,
      r7 = (e) => Math.pow(e + r4, 3),
      r9 = {
        mode: "xyb",
        channels: ["x", "y", "b", "alpha"],
        parse: ["--xyb"],
        serialize: "--xyb",
        toMode: {
          rgb: ({ x: e, y: t, b: n, alpha: r }) => {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s = r7(e + t) - 0.0037930732552754493,
              i = r7(t - e) - 0.0037930732552754493,
              a = r7(n + t) - 0.0037930732552754493,
              l = ny({
                r:
                  11.031566904639861 * s -
                  9.866943908131562 * i -
                  0.16462299650829934 * a,
                g:
                  -3.2541473810744237 * s +
                  4.418770377582723 * i -
                  0.16462299650829934 * a,
                b:
                  -3.6588512867136815 * s +
                  2.7129230459360922 * i +
                  1.9459282407775895 * a,
              });
            return (void 0 !== r && (l.alpha = r), l);
          },
        },
        fromMode: {
          rgb: (e) => {
            let { r: t, g: n, b: r, alpha: s } = nx(e),
              i = r6(0.3 * t + 0.622 * n + 0.078 * r + 0.0037930732552754493),
              a = r6(0.23 * t + 0.692 * n + 0.078 * r + 0.0037930732552754493),
              l = {
                mode: "xyb",
                x: (i - a) / 2,
                y: (i + a) / 2,
                b:
                  r6(
                    0.2434226892454782 * t +
                      0.2047674442449682 * n +
                      0.5518098665095535 * r +
                      0.0037930732552754493,
                  ) -
                  (i + a) / 2,
              };
            return (void 0 !== s && (l.alpha = s), l);
          },
        },
        ranges: { x: [-0.0154, 0.0281], y: [0, 0.8453], b: [-0.2778, 0.388] },
        interpolate: { x: nc, y: nc, b: nc, alpha: { use: nc, fixup: nd } },
      },
      r8 = {
        mode: "yiq",
        toMode: {
          rgb: ({ y: e, i: t, q: n, alpha: r }) => {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s = {
              mode: "rgb",
              r: e + 0.95608445 * t + 0.6208885 * n,
              g: e - 0.27137664 * t - 0.6486059 * n,
              b: e - 1.10561724 * t + 1.70250126 * n,
            };
            return (void 0 !== r && (s.alpha = r), s);
          },
        },
        fromMode: {
          rgb: ({ r: e, g: t, b: n, alpha: r }) => {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s = {
              mode: "yiq",
              y: 0.29889531 * e + 0.58662247 * t + 0.11448223 * n,
              i: 0.59597799 * e - 0.2741761 * t - 0.32180189 * n,
              q: 0.21147017 * e - 0.52261711 * t + 0.31114694 * n,
            };
            return (void 0 !== r && (s.alpha = r), s);
          },
        },
        channels: ["y", "i", "q", "alpha"],
        parse: ["--yiq"],
        serialize: "--yiq",
        ranges: { i: [-0.595, 0.595], q: [-0.522, 0.522] },
        interpolate: { y: nc, i: nc, q: nc, alpha: { use: nc, fixup: nd } },
      };
    (tQ(nC),
      tQ(nE),
      tQ({
        mode: "dlab",
        parse: ["--din99o-lab"],
        serialize: "--din99o-lab",
        toMode: { lab65: nq, rgb: (e) => n$(nq(e)) },
        fromMode: { lab65: nX, rgb: (e) => nX(nH(e)) },
        channels: ["l", "a", "b", "alpha"],
        ranges: { l: [0, 100], a: [-40.09, 45.501], b: [-40.469, 44.344] },
        interpolate: { l: nc, a: nc, b: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ({
        mode: "dlch",
        parse: ["--din99o-lch"],
        serialize: "--din99o-lch",
        toMode: {
          lab65: nZ,
          dlab: (e) => nA(e, "dlab"),
          rgb: (e) => n$(nZ(e)),
        },
        fromMode: {
          lab65: nG,
          dlab: (e) => n_(e, "dlch"),
          rgb: (e) => nG(nH(e)),
        },
        channels: ["l", "c", "h", "alpha"],
        ranges: { l: [0, 100], c: [0, 51.484], h: [0, 360] },
        interpolate: {
          l: nc,
          c: nc,
          h: { use: nc, fixup: nk },
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nL },
        average: { h: nT },
      }),
      tQ({
        mode: "hsi",
        toMode: {
          rgb: function ({ h: e, s: t, i: n, alpha: r }) {
            let s;
            ((e = nw(void 0 !== e ? e : 0)),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let i = Math.abs(((e / 60) % 2) - 1);
            switch (Math.floor(e / 60)) {
              case 0:
                s = {
                  r: n * (1 + t * (3 / (2 - i) - 1)),
                  g: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                  b: n * (1 - t),
                };
                break;
              case 1:
                s = {
                  r: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                  g: n * (1 + t * (3 / (2 - i) - 1)),
                  b: n * (1 - t),
                };
                break;
              case 2:
                s = {
                  r: n * (1 - t),
                  g: n * (1 + t * (3 / (2 - i) - 1)),
                  b: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                };
                break;
              case 3:
                s = {
                  r: n * (1 - t),
                  g: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                  b: n * (1 + t * (3 / (2 - i) - 1)),
                };
                break;
              case 4:
                s = {
                  r: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                  g: n * (1 - t),
                  b: n * (1 + t * (3 / (2 - i) - 1)),
                };
                break;
              case 5:
                s = {
                  r: n * (1 + t * (3 / (2 - i) - 1)),
                  g: n * (1 - t),
                  b: n * (1 + t * ((3 * (1 - i)) / (2 - i) - 1)),
                };
                break;
              default:
                s = { r: n * (1 - t), g: n * (1 - t), b: n * (1 - t) };
            }
            return ((s.mode = "rgb"), void 0 !== r && (s.alpha = r), s);
          },
        },
        parse: ["--hsi"],
        serialize: "--hsi",
        fromMode: {
          rgb: function ({ r: e, g: t, b: n, alpha: r }) {
            (void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0));
            let s = Math.max(e, t, n),
              i = Math.min(e, t, n),
              a = {
                mode: "hsi",
                s: e + t + n === 0 ? 0 : 1 - (3 * i) / (e + t + n),
                i: (e + t + n) / 3,
              };
            return (
              s - i != 0 &&
                (a.h =
                  (s === e
                    ? (t - n) / (s - i) + (t < n) * 6
                    : s === t
                      ? (n - e) / (s - i) + 2
                      : (e - t) / (s - i) + 4) * 60),
              void 0 !== r && (a.alpha = r),
              a
            );
          },
        },
        channels: ["h", "s", "i", "alpha"],
        ranges: { h: [0, 360] },
        gamut: "rgb",
        interpolate: {
          h: { use: nc, fixup: nk },
          s: nc,
          i: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nI },
        average: { h: nT },
      }));
    let se = tQ(nK),
      st = tQ(n0);
    (tQ({
      mode: "hwb",
      toMode: {
        rgb: function ({ h: e, w: t, b: n, alpha: r }) {
          if ((void 0 === t && (t = 0), void 0 === n && (n = 0), t + n > 1)) {
            let e = t + n;
            ((t /= e), (n /= e));
          }
          return nJ({
            h: e,
            s: 1 === n ? 1 : 1 - t / (1 - n),
            v: 1 - n,
            alpha: r,
          });
        },
      },
      fromMode: {
        rgb: function (e) {
          let t = nQ(e);
          if (void 0 === t) return;
          let n = void 0 !== t.s ? t.s : 0,
            r = void 0 !== t.v ? t.v : 0,
            s = { mode: "hwb", w: (1 - n) * r, b: 1 - r };
          return (
            void 0 !== t.h && (s.h = t.h),
            void 0 !== t.alpha && (s.alpha = t.alpha),
            s
          );
        },
      },
      channels: ["h", "w", "b", "alpha"],
      ranges: { h: [0, 360] },
      gamut: "rgb",
      parse: [
        function (e, t) {
          if (!t || "hwb" !== t[0]) return;
          let n = { mode: "hwb" },
            [, r, s, i, a] = t;
          if (r.type !== t9) {
            if (r.type === t7) return;
            n.h = r.value;
          }
          if (s.type !== t9) {
            if ("hue" === s.type) return;
            n.w = s.value / 100;
          }
          if (i.type !== t9) {
            if ("hue" === i.type) return;
            n.b = i.value / 100;
          }
          return (
            a.type !== t9 &&
              (n.alpha = Math.min(
                1,
                Math.max(0, a.type === t6 ? a.value : a.value / 100),
              )),
            n
          );
        },
      ],
      serialize: (e) =>
        `hwb(${void 0 !== e.h ? e.h : "none"} ${void 0 !== e.w ? 100 * e.w + "%" : "none"} ${void 0 !== e.b ? 100 * e.b + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
      interpolate: {
        h: { use: nc, fixup: nk },
        w: nc,
        b: nc,
        alpha: { use: nc, fixup: nd },
      },
      difference: {
        h: (e, t) => {
          if (void 0 === e.h || void 0 === t.h) return 0;
          let n = nw(e.h),
            r = nw(t.h);
          return Math.abs(r - n) > 180
            ? n - (r - 360 * Math.sign(r - n))
            : r - n;
        },
      },
      average: { h: nT },
    }),
      tQ({
        mode: "itp",
        channels: ["i", "t", "p", "alpha"],
        parse: ["--ictcp"],
        serialize: "--ictcp",
        toMode: { xyz65: n3, rgb: (e) => nj(n3(e)) },
        fromMode: { xyz65: n6, rgb: (e) => n6(nv(e)) },
        ranges: { i: [0, 0.581], t: [-0.369, 0.272], p: [-0.164, 0.331] },
        interpolate: { i: nc, t: nc, p: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ({
        mode: "jab",
        channels: ["j", "a", "b", "alpha"],
        parse: ["--jzazbz"],
        serialize: "--jzazbz",
        fromMode: { rgb: rn, xyz65: n8 },
        toMode: { rgb: rr, xyz65: rt },
        ranges: { j: [0, 0.222], a: [-0.109, 0.129], b: [-0.185, 0.134] },
        interpolate: { j: nc, a: nc, b: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ({
        mode: "jch",
        parse: ["--jzczhz"],
        serialize: "--jzczhz",
        toMode: { jab: ri, rgb: (e) => rr(ri(e)) },
        fromMode: { rgb: (e) => rs(rn(e)), jab: rs },
        channels: ["j", "c", "h", "alpha"],
        ranges: { j: [0, 0.221], c: [0, 0.19], h: [0, 360] },
        interpolate: {
          h: { use: nc, fixup: nk },
          c: nc,
          j: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nL },
        average: { h: nT },
      }),
      tQ(rm),
      tQ(rf),
      tQ(rg),
      tQ(rx),
      tQ({
        mode: "lchuv",
        toMode: { luv: rb, rgb: (e) => ro(rS(rb(e))) },
        fromMode: { rgb: (e) => rv(rk(rd(e))), luv: rv },
        channels: ["l", "c", "h", "alpha"],
        parse: ["--lchuv"],
        serialize: "--lchuv",
        ranges: { l: [0, 100], c: [0, 176.956], h: [0, 360] },
        interpolate: {
          h: { use: nc, fixup: nk },
          c: nc,
          l: nc,
          alpha: { use: nc, fixup: nd },
        },
        difference: { h: nL },
        average: { h: nT },
      }),
      tQ(rI),
      tQ({
        mode: "luv",
        toMode: { xyz50: rS, rgb: (e) => ro(rS(e)) },
        fromMode: { xyz50: rk, rgb: (e) => rk(rd(e)) },
        channels: ["l", "u", "v", "alpha"],
        parse: ["--luv"],
        serialize: "--luv",
        ranges: { l: [0, 100], u: [-84.936, 175.042], v: [-125.882, 87.243] },
        interpolate: { l: nc, u: nc, v: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ(rz),
      tQ(rO),
      tQ(rU),
      tQ(rW),
      tQ(rq),
      tQ(rQ),
      tQ(r3),
      tQ(nu),
      tQ(r9),
      tQ({
        mode: "xyz50",
        parse: ["xyz-d50"],
        serialize: "xyz-d50",
        toMode: { rgb: ro, lab: rh },
        fromMode: { rgb: rd, lab: rl },
        channels: ["x", "y", "z", "alpha"],
        ranges: { x: [0, 0.964], y: [0, 0.999], z: [0, 0.825] },
        interpolate: { x: nc, y: nc, z: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ({
        mode: "xyz65",
        toMode: {
          rgb: nj,
          xyz50: (e) => {
            let { x: t, y: n, z: r, alpha: s } = e;
            (void 0 === t && (t = 0),
              void 0 === n && (n = 0),
              void 0 === r && (r = 0));
            let i = {
              mode: "xyz50",
              x:
                1.0479298208405488 * t +
                0.0229467933410191 * n -
                0.0501922295431356 * r,
              y:
                0.0296278156881593 * t +
                0.990434484573249 * n -
                0.0170738250293851 * r,
              z:
                -0.0092430581525912 * t +
                0.0150551448965779 * n +
                0.7518742899580008 * r,
            };
            return (void 0 !== s && (i.alpha = s), i);
          },
        },
        fromMode: {
          rgb: nv,
          xyz50: (e) => {
            let { x: t, y: n, z: r, alpha: s } = e;
            (void 0 === t && (t = 0),
              void 0 === n && (n = 0),
              void 0 === r && (r = 0));
            let i = {
              mode: "xyz65",
              x:
                0.9554734527042182 * t -
                0.0230985368742614 * n +
                0.0632593086610217 * r,
              y:
                -0.0283697069632081 * t +
                1.0099954580058226 * n +
                0.021041398966943 * r,
              z:
                0.0123140016883199 * t -
                0.0205076964334779 * n +
                1.3303659366080753 * r,
            };
            return (void 0 !== s && (i.alpha = s), i);
          },
        },
        ranges: { x: [0, 0.95], y: [0, 1], z: [0, 1.088] },
        channels: ["x", "y", "z", "alpha"],
        parse: ["xyz", "xyz-d65"],
        serialize: "xyz-d65",
        interpolate: { x: nc, y: nc, z: nc, alpha: { use: nc, fixup: nd } },
      }),
      tQ(r8),
      (
        (e = 4) =>
        (t) => {
          let n;
          return "number" == typeof t
            ? Math.round(t * (n = Math.pow(10, (n = e)))) / n
            : t;
        }
      )(2));
    let sn = (e) => Math.round(255 * Math.max(0, Math.min(1, e || 0))),
      sr = tG("rgb");
    tG("hsl");
    let ss = (e) =>
      ((e) => {
        if (void 0 !== e)
          return (
            "#" +
            (0x1000000 | (sn(e.r) << 16) | (sn(e.g) << 8) | sn(e.b))
              .toString(16)
              .slice(1)
          );
      })(sr(e));
    var si = e.i(614346);
    let sa = new Set([
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "bmp",
      "tif",
      "tiff",
      "apng",
      "avif",
      "heic",
      "jxl",
      "bpg",
      "flif",
      "icns",
      "jxr",
      "psd",
      "xcf",
      "cr2",
      "cr3",
      "dng",
      "nef",
      "orf",
      "raf",
      "rw2",
      "arw",
      "j2c",
      "jp2",
      "jpm",
      "jpx",
      "jls",
      "mj2",
      "ktx",
    ]);
    function sl() {
      return Array.from(si.supportedExtensions).filter((e) => sa.has(e));
    }
    let so =
        ((i = sl().join("|")),
        [
          RegExp(`src\\s*=\\s*"([^"]*\\.(${i})[^"]*)"`, "i"),
          RegExp(`src\\s*=\\s*'([^']*\\.(${i})[^']*)'`, "i"),
          RegExp(
            `src\\s*=\\s*\\{\\s*["']([^"']*\\.(${i})[^"']*)["']\\s*\\}`,
            "i",
          ),
          RegExp(`src\\s*=\\s*\\{\\s*([^}]*\\.(${i})[^}]*)\\s*\\}`, "i"),
          RegExp(`src\\s*=[\\s\\S]*?["']([^"']*\\.(${i})[^"']*)["']`, "i"),
          /src\s*=\s*"([^"]*placeholder[^"]*)"/i,
          /src\s*=\s*'([^']*placeholder[^"]*)'/i,
          /src\s*=\s*\{\s*["']([^"']*placeholder[^"']*)["']\s*\}/i,
        ]),
      sc = [
        /src\s*=\s*"([^"]*\.svg[^"]*)"/i,
        /src\s*=\s*'([^']*\.svg[^']*)'/i,
        /src\s*=\s*\{\s*`([^`]*\.svg[^`]*)`\s*\}/i,
        /src\s*=\s*\{\s*["']([^"']*\.svg[^"']*)["']\s*\}/i,
        /src\s*=\s*\{\s*([^}]*\.svg[^}]*)\s*\}/i,
        /src\s*=[\s\S]*?["']([^"']*\.svg[^"']*)["']/i,
      ];
    function sd(e) {
      return e.startsWith("motion.");
    }
    function su(e) {
      let t = e.toString(16);
      return 1 === t.length ? "0" + t : t;
    }
    function sh(e) {
      if (!e) return [];
      let t = e7.indexOf(e);
      return -1 === t ? e7 : e7.slice(t);
    }
    function sp(e) {
      return 1 === e.a
        ? `rgb(${e.r}, ${e.g}, ${e.b})`
        : `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a.toFixed(2)})`;
    }
    function sm(e) {
      return !(
        !e ||
        e.startsWith("http://") ||
        e.startsWith("https://") ||
        e.startsWith("data:") ||
        e.startsWith("//")
      );
    }
    function sf(e, t) {
      if (!e.parts) return !1;
      if (e.lib?.props?.src) {
        let t = Array.isArray(e.lib.props.src)
          ? e.lib.props.src[0] || null
          : e.lib.props.src;
        if (t && t.toLowerCase().includes(".svg")) return !0;
      }
      if (e.content?.value)
        for (let t of sc)
          try {
            if (t.test(e.content.value)) return !0;
          } catch (e) {
            continue;
          }
      if (t && e.file && e.start && e.end) {
        let n = t(e.file);
        if (n) {
          let t = Math.max(0, e.start - 500),
            r = Math.min(n.length, e.end + 500),
            s = n.slice(t, r);
          for (let e of sc)
            try {
              if (e.test(s)) return !0;
            } catch (e) {
              continue;
            }
        }
      }
      return !1;
    }
    function sg(e) {
      return !!e && e.includes("placeholder-");
    }
    function sx(e, t, n) {
      let r = 0,
        s = t,
        i = !1,
        a = (e) =>
          ["img", "Image", "input", "br", "hr", "meta", "link"].includes(e),
        l = /<(\w+(?:\.\w+)?)[^>]*>/g,
        o = /<\/(\w+(?:\.\w+)?)>/g;
      for (; s < n.length; ) {
        let c = n.indexOf("/>", s),
          d = n.indexOf("<", s),
          u = n.indexOf("</", s),
          h = -1,
          p = null,
          m = [
            { pos: c, type: "self" },
            { pos: d, type: "open" },
            { pos: u, type: "close" },
          ].filter((e) => -1 !== e.pos);
        if (0 === m.length) break;
        let f = m.reduce((e, t) => (t.pos < e.pos ? t : e));
        if (((h = f.pos), "self" === (p = f.type))) {
          let r = n.lastIndexOf("<", h),
            a = n.slice(r, h + 2).match(/<(\w+(?:\.\w+)?)[^>]*\/>/);
          if (a && a[1]) {
            let r = a[1];
            if (!i && r === e)
              return { content: n.slice(t, h + 2), end: h + 2 };
          }
          s = h + 2;
        } else if ("close" === p) {
          o.lastIndex = h;
          let i = o.exec(n);
          if (i && i[1] && 0 == --r && i[1] === e) {
            let e = o.lastIndex;
            return { content: n.slice(t, e), end: e };
          }
          s = o.lastIndex || h + 1;
        } else if ("open" === p) {
          l.lastIndex = h;
          let t = l.exec(n);
          if (t && t[1]) {
            let n = t[1];
            i || n !== e ? i && !a(n) && r++ : ((i = !0), (r = 1));
          }
          s = l.lastIndex || h + 1;
        }
        s <= h && (s = h + 1);
      }
      return { content: n.slice(t, n.length), end: n.length };
    }
    function sv(e, t) {
      if (!e.parts) return !1;
      if (
        "img" === e.name ||
        "Image" === e.name ||
        "AvatarImage" === e.name ||
        "motion.img" === e.name
      )
        return !sf(e, t);
      if (
        ("Avatar" === e.name || "AvatarImage" === e.name) &&
        e.lib?.source === "@/components/ui/avatar"
      )
        return !0;
      if (
        ("img" === e.name &&
          (function (e, t) {
            if (!e.parts) return !1;
            if (t && e.file && e.start && e.end) {
              let n = t(e.file);
              if (n) {
                let t = Math.max(0, e.start - 200),
                  r = Math.min(n.length, e.end + 200),
                  s = n.slice(t, r);
                return (
                  /<Avatar[^>]*>[\s\S]*<img[\s\S]*>[\s\S]*<\/Avatar>/i.test(
                    s,
                  ) ||
                  /<Avatar[^>]*>[\s\S]*<AvatarImage[\s\S]*>[\s\S]*<\/Avatar>/i.test(
                    s,
                  )
                );
              }
            }
            return !1;
          })(e, t)) ||
        e.lib?.source === "next/image" ||
        e.lib?.name === "Image"
      )
        return !sf(e, t);
      if (sd(e.name) && t && e.file && e.start && e.end) {
        let n = t(e.file);
        if (n) {
          let t = n.slice(e.start, e.end);
          if (
            [
              /<img\s+/i,
              /<Image\s+/i,
              /<motion\.img\s+/i,
              /<AvatarImage\s+/i,
            ].some((e) => e.test(t))
          )
            return !sc.some((e) => e.test(t));
        }
      }
      let n = (e) => {
        if (
          (/<Image\b/i.test(e) || /<img\b/i.test(e)) &&
          sc.some((t) => t.test(e))
        )
          return !1;
        let t = sl().join("|");
        return [
          /<Image\b/i,
          /<img\b/i,
          RegExp(`src\\s*=\\s*["'][^"']*\\.(${t})`, "i"),
          /alt\s*=\s*["'][^"']*"/i,
        ].some((t) => t.test(e));
      };
      if (e.content?.value && n(e.content.value)) return !0;
      for (let t = 0; t < e.parts.length; t++)
        if (n(e.parts[t].value)) return !0;
      if ("div" === e.name || "span" === e.name || "figure" === e.name) {
        let t = [e.content?.value || "", ...e.parts.map((e) => e.value)].join(
          " ",
        );
        if (
          n(t) ||
          [
            /className\s*=\s*["'][^"']*image[^"']*["']/i,
            /className\s*=\s*["'][^"']*img[^"']*["']/i,
            /object-cover|object-contain|object-fill/i,
          ].some((e) => e.test(t))
        )
          return !0;
      }
      if (t && e.file && e.start && e.end) {
        let n = t(e.file);
        if (n) {
          let t = Math.max(0, e.start - 500),
            r = Math.min(n.length, e.end + 500),
            s = n.slice(t, r);
          if (
            (/<Image\s+/i.test(s) || /<img\s+/i.test(s)) &&
            sc.some((e) => e.test(s))
          )
            return !1;
          let i = sl().join("|");
          if (
            [
              /<Image\s+/i,
              /<img\s+/i,
              RegExp(`src\\s*=\\s*["'][^"']*\\.(${i})`, "i"),
              /alt\s*=\s*["'][^"']*"/i,
              /fill\s*=\s*\{?true\}?/i,
              /priority\s*=\s*\{?true\}?/i,
              /width\s*=\s*\{?\d+\}?/i,
              /height\s*=\s*\{?\d+\}?/i,
            ].some((e) => e.test(s))
          )
            return !0;
        }
      }
      return !1;
    }
    var sb = e.i(471964);
    function sy({ tokens: e, open: t, onPointerEnter: n, onSelect: r }) {
      return (0, a.jsxs)(tj.Command, {
        className: "rounded-none",
        children: [
          (0, a.jsx)(tj.CommandInput, {
            placeholder: "Search for a color...",
            divClassName: "px-2 pb-1 gap-2 border-none [&>span]:size-3",
            className: "h-7 py-0 text-sm",
            iconSize: 12,
          }),
          (0, a.jsxs)(tj.CommandList, {
            className: "rounded-none",
            children: [
              (0, a.jsx)(tj.CommandEmpty, {
                children: (0, a.jsx)("span", {
                  className: "text-v0-gray-900",
                  children: "No color found.",
                }),
              }),
              (0, a.jsx)(tj.CommandGroup, {
                className: "p-0",
                children: t
                  ? e.map((e) =>
                      (0, a.jsxs)(
                        tj.CommandItem,
                        {
                          value: e.label,
                          onPointerEnter: () => n(e),
                          onSelect: (t) => r(t, e),
                          className: "gap-2 py-1",
                          children: [
                            e.value
                              ? (0, a.jsx)("span", {
                                  className:
                                    "block size-3 rounded-sm border border-v0-gray-300",
                                  style: { background: e.value },
                                })
                              : (0, a.jsx)("div", {
                                  children: (0, a.jsx)(tR.AlphaSquare, {
                                    className: "size-3",
                                  }),
                                }),
                            e.label,
                          ],
                        },
                        e.label,
                      ),
                    )
                  : null,
              }),
            ],
          }),
        ],
      });
    }
    function sj({
      title: e,
      displayedColorName: t,
      colorTokens: n,
      onColorChange: r,
      onTokensChange: s,
      onPointerEnter: i,
      onPointerLeave: l,
      updateColorNameTextContent: c,
      clearRevertPreview: d,
      parsedColor: u,
      alphaEnabled: h,
      isLoading: p,
      nameInInput: m,
    }) {
      let f = (0, o.useRef)(null),
        g = (0, o.useRef)(null),
        [x, v] = (0, o.useState)(!1),
        b = (0, o.useRef)(null),
        y = (0, tI.useDebounceCallback)(r, 100, { maxWait: 150 }),
        j = (0, tI.useDebounceCallback)(s, 50),
        C = () => {
          ((b.current = null),
            f.current?.style.removeProperty("background"),
            y(null));
        },
        w = (e, t) => {
          (d(),
            "Default" === e
              ? C()
              : (f.current?.style.setProperty("background", t.value),
                void 0 === m && c(g, e),
                j(e)),
            v(!1));
        },
        k = (0, o.useMemo)(() => {
          if (u) {
            let e = tZ(u);
            if (!e) return;
            let t = t0(e.mode);
            if (!t.serialize || "string" == typeof t.serialize) {
              let n = `color(${t.serialize || `--${e.mode}`} `;
              return (
                t.channels.forEach((t, r) => {
                  "alpha" !== t &&
                    (n += (r ? " " : "") + (void 0 !== e[t] ? e[t] : "none"));
                }),
                void 0 !== e.alpha && e.alpha < 1 && (n += ` / ${e.alpha}`),
                n + ")"
              );
            }
            return "function" == typeof t.serialize ? t.serialize(e) : void 0;
          }
          return "color(srgb 1 1 1)";
        }, [u]),
        { tailwindTokens: N, shadcnTokens: M } = (0, o.useMemo)(() => {
          let e = [],
            t = [],
            r = new Set([
              ...Object.keys(sb.initialStyles.common),
              ...Object.keys(sb.initialStyles.light),
              ...Object.keys(sb.initialStyles.dark),
            ]);
          for (let s of n) r.has(s.label) ? t.push(s) : e.push(s);
          return { tailwindTokens: e, shadcnTokens: t };
        }, [n]),
        S = N.length > 0,
        I = M.length > 0,
        L = S || I;
      return p
        ? (0, a.jsx)("div", {
            title: e,
            className: "flex w-full min-w-0",
            children: (0, a.jsx)("div", {
              className: "w-full",
              children: (0, a.jsxs)(D.Button, {
                variant: "secondary",
                size: "sm",
                className: "w-full justify-between rounded-md px-2 font-normal",
                disabled: !0,
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "block size-4 shrink-0 rounded-sm border border-v0-gray-200 bg-v0-gray-100 animate-pulse",
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "h-4 w-16 bg-v0-gray-200 rounded animate-pulse",
                      }),
                    ],
                  }),
                  (0, a.jsx)(tf.ChevronDownSmall, {
                    className: "size-4 text-v0-gray-300",
                  }),
                ],
              }),
            }),
          })
        : (0, a.jsx)("div", {
            title: e,
            className: "flex w-full min-w-0",
            children: (0, a.jsxs)(tw.Popover, {
              open: x,
              onOpenChange: v,
              children: [
                (0, a.jsx)(tw.PopoverTrigger, {
                  asChild: !0,
                  children: (0, a.jsxs)(D.Button, {
                    variant: "secondary",
                    size: "sm",
                    className:
                      "w-full justify-between rounded-md px-2 font-normal",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-center gap-2 min-w-0",
                        children: [
                          u
                            ? (0, a.jsx)("span", {
                                ref: f,
                                className:
                                  "block size-4 shrink-0 rounded-sm border border-v0-gray-200",
                                style: { background: k },
                              })
                            : (0, a.jsx)(tR.AlphaSquare, {
                                className: "size-4 shrink-0",
                              }),
                          t
                            ? (0, a.jsx)("span", {
                                className: "text-v0-gray-1000 truncate",
                                ref: g,
                                children: m ?? t,
                              })
                            : (0, a.jsx)("span", {
                                className: "text-v0-gray-900",
                                children: "Default",
                              }),
                        ],
                      }),
                      (0, a.jsx)(tf.ChevronDownSmall, { className: "size-4" }),
                    ],
                  }),
                }),
                (0, a.jsx)(tw.PopoverContent, {
                  className: "w-auto min-w-[226px] rounded shadow-lg",
                  align: "start",
                  withOverlay: !0,
                  onPointerLeave: l,
                  children: (0, a.jsx)("div", {
                    className: "flex flex-col gap-1 p-1",
                    children: (0, a.jsxs)(tE.Tabs, {
                      defaultValue: L ? (I ? "system" : "tailwind") : "picker",
                      variant: "secondary",
                      className: "flex flex-col gap-1",
                      children: [
                        L
                          ? (0, a.jsxs)(tE.TabsList, {
                              className:
                                "justify-center border-b bg-transparent px-0 pb-1",
                              children: [
                                I
                                  ? (0, a.jsx)(tE.TabsTrigger, {
                                      value: "system",
                                      className:
                                        "flex h-6 w-full items-center text-xs",
                                      children: "System",
                                    })
                                  : null,
                                S
                                  ? (0, a.jsx)(tE.TabsTrigger, {
                                      value: "tailwind",
                                      className:
                                        "flex h-6 w-full items-center text-xs",
                                      children: "Tailwind",
                                    })
                                  : null,
                                (0, a.jsx)(tE.TabsTrigger, {
                                  value: "picker",
                                  className:
                                    "flex h-6 w-full items-center text-xs",
                                  children: "Custom",
                                }),
                              ],
                            })
                          : null,
                        (0, a.jsxs)(tE.TabsContent, {
                          value: "picker",
                          children: [
                            (0, a.jsx)(tT.default, {
                              color: (function (e) {
                                let t = no(e);
                                if (!t) return { h: 0, s: 0, v: 100, a: 1 };
                                let n = st(t);
                                return {
                                  h: Math.round(n.h ?? 0),
                                  s: Math.round(100 * n.s),
                                  v: Math.round(100 * n.v),
                                  a: t.alpha ?? 1,
                                };
                              })(b.current || k),
                              onChange: (e) => {
                                var t, n, r, s;
                                ((b.current = sp(e.rgba)),
                                  f.current?.style.setProperty(
                                    "background",
                                    sp(e.rgba),
                                  ),
                                  g.current &&
                                    void 0 === m &&
                                    (g.current.textContent =
                                      ((t = e.rgba.r),
                                      (n = e.rgba.g),
                                      (r = e.rgba.b),
                                      (s = e.rgba.a),
                                      `#${su(t)}${su(n)}${su(r)}${s < 1 ? su(Math.round(255 * s)) : ""}`)),
                                  y(e.rgba));
                              },
                              disableAlpha: !h,
                              presetColors: !1,
                            }),
                            (0, a.jsxs)("div", {
                              className:
                                "flex items-center justify-end gap-0.5",
                              children: [
                                (0, a.jsx)("button", {
                                  className:
                                    "flex h-6 items-center justify-center rounded-full px-2 text-xs text-v0-gray-900 transition-colors hover:bg-v0-gray-100 hover:text-v0-gray-900",
                                  onClick: C,
                                  children: "Inherit",
                                }),
                                (0, a.jsx)("button", {
                                  className:
                                    "flex h-6 w-6 items-center justify-center rounded-full text-v0-gray-900 transition-colors hover:bg-v0-gray-100",
                                  onClick: async () => {
                                    if ("EyeDropper" in window) {
                                      let e = new EyeDropper(),
                                        t = await e.open();
                                      if (t) {
                                        let e = t.sRGBHex
                                          .match(/[a-f0-9]{2}/g)
                                          .map((e) => parseInt(e, 16));
                                        y({ r: e[0], g: e[1], b: e[2], a: 1 });
                                      }
                                    }
                                  },
                                  children: (0, a.jsx)(tL.default, {
                                    className: "size-3",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        S
                          ? (0, a.jsx)(tE.TabsContent, {
                              value: "tailwind",
                              children: (0, a.jsx)(sy, {
                                tokens: N,
                                open: x,
                                onPointerEnter: i,
                                onSelect: w,
                              }),
                            })
                          : null,
                        I
                          ? (0, a.jsx)(tE.TabsContent, {
                              value: "system",
                              children: (0, a.jsx)(sy, {
                                tokens: M,
                                open: x,
                                onPointerEnter: i,
                                onSelect: w,
                              }),
                            })
                          : null,
                      ],
                    }),
                  }),
                }),
              ],
            }),
          });
    }
    function sC({ text: e, content: t }) {
      return (0, a.jsx)(tm.Tooltip, {
        content:
          t ||
          (0, a.jsx)("div", {
            className: "text-center whitespace-pre-line",
            children: e,
          }),
        side: "right",
        children: (0, a.jsx)(t_.InformationFillSmall, {}),
      });
    }
    function sw({ title: e, children: t, infoIcon: n }) {
      return (0, a.jsxs)("div", {
        className:
          "border-v0-alpha-400 flex flex-col gap-3 border-b p-3 [&_svg]:text-v0-gray-900! [&:is(:last-child)]:border-b-0 [&:is(:last-child)]:pb-6",
        children: [
          (0, a.jsxs)("div", {
            className:
              "text-label-12 select-none font-medium flex items-center gap-1",
            children: [e, n],
          }),
          t,
        ],
      });
    }
    function sk({ value: e, type: t, onUpdate: n }) {
      let r = (0, o.useRef)(null),
        s = (0, o.useRef)(e);
      ((0, tI.useEventListener)("inline-edit-cleanup-decorations", () => {
        s.current = e;
      }),
        (0, o.useEffect)(() => {
          s.current !== e &&
            (r.current && (r.current.value = e.trim()), (s.current = e));
        }, [e]));
      let i = (0, tI.useDebounceCallback)(
        (e) => {
          e || "jsxText" !== t ? n(e) : n('{""}');
        },
        100,
        { maxWait: 50 },
      );
      return (0, a.jsx)(tA.Textarea, {
        ref: r,
        defaultValue: e.trim(),
        onChange: (e) => {
          if ("jsxText" === t) {
            let t = e.currentTarget.value;
            t.includes("\n")
              ? i("{" + JSON.stringify(t) + "}")
              : i(
                  t
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;")
                    .replace(/\{/g, "&#123;")
                    .replace(/\}/g, "&#125;"),
                );
          } else i(e.currentTarget.value);
        },
        rows: 3,
        spellCheck: !1,
      });
    }
    let sN = ["0", "", "2", "4", "8"],
      sM = [
        ["0", "0px"],
        ["", "1px"],
        ["2", "2px"],
        ["4", "4px"],
        ["8", "8px"],
      ],
      sS = ["3", "4", "5", "6", "7", "8", "9", "10"],
      sI = [
        ["3", "0.75rem"],
        ["4", "1rem"],
        ["5", "1.25rem"],
        ["6", "1.5rem"],
        ["7", "1.75rem"],
        ["8", "2rem"],
        ["9", "2.25rem"],
        ["10", "2.5rem"],
      ],
      sL = ["tighter", "tight", "normal", "wide", "wider", "widest"],
      sT = [
        ["tighter", "-0.05em"],
        ["tight", "-0.025em"],
        ["normal", "0em"],
        ["wide", "0.025em"],
        ["wider", "0.05em"],
        ["widest", "0.1em"],
      ],
      sE = [
        "0",
        "px",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "20",
        "24",
        "28",
        "32",
        "36",
        "40",
        "44",
        "48",
        "52",
        "56",
        "60",
        "64",
        "72",
        "80",
        "96",
      ],
      s_ = [
        ["0", "0px"],
        ["px", "1px"],
        ["0.5", "2px"],
        ["1", "4px"],
        ["1.5", "6px"],
        ["2", "8px"],
        ["2.5", "10px"],
        ["3", "12px"],
        ["3.5", "14px"],
        ["4", "16px"],
        ["5", "20px"],
        ["6", "24px"],
        ["7", "28px"],
        ["8", "32px"],
        ["9", "36px"],
        ["10", "40px"],
        ["11", "44px"],
        ["12", "48px"],
        ["14", "56px"],
        ["16", "64px"],
        ["20", "80px"],
        ["24", "96px"],
        ["28", "112px"],
        ["32", "128px"],
        ["36", "144px"],
        ["40", "160px"],
        ["44", "176px"],
        ["48", "192px"],
        ["52", "208px"],
        ["56", "224px"],
        ["60", "240px"],
        ["64", "256px"],
        ["72", "288px"],
        ["80", "320px"],
        ["96", "384px"],
      ],
      sA = [...s_, ["auto", "auto"]],
      sR = [
        ...s_,
        ["auto", "auto"],
        ["1/2", "50%"],
        ["1/3", "33.333333%"],
        ["2/3", "66.666667%"],
        ["1/4", "25%"],
        ["2/4", "50%"],
        ["3/4", "75%"],
        ["1/5", "20%"],
        ["2/5", "40%"],
        ["3/5", "60%"],
        ["4/5", "80%"],
        ["1/6", "16.666667%"],
        ["2/6", "33.333333%"],
        ["3/6", "50%"],
        ["4/6", "66.666667%"],
        ["5/6", "83.333333%"],
        ["1/12", "8.333333%"],
        ["2/12", "16.666667%"],
        ["3/12", "25%"],
        ["4/12", "33.333333%"],
        ["5/12", "41.666667%"],
        ["6/12", "50%"],
        ["7/12", "58.333333%"],
        ["8/12", "66.666667%"],
        ["9/12", "75%"],
        ["10/12", "83.333333%"],
        ["11/12", "91.666667%"],
        ["full", "100%"],
        ["min", "min-content"],
        ["max", "max-content"],
        ["fit", "fit-content"],
      ],
      sP = [
        "white",
        "black",
        "transparent",
        "border",
        "input",
        "ring-3",
        "background",
        "foreground",
        "primary",
        "secondary",
        "destructive",
        "warning",
        "muted",
        "accent",
        "popover",
        "card",
        "sidebar",
      ],
      sD = {
        100: "font-thin",
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black",
      },
      sV = Array.from({ length: 21 }, (e, t) => [String(5 * t), String(5 * t)]);
    function s$({
      title: e,
      options: t,
      type: n,
      classNames: r,
      match: s,
      fallbackValue: i,
      breakpoint: l,
      icon: c,
      showTitle: d,
      onUpdate: h,
    }) {
      let p,
        m = [],
        f = sh(l),
        [g, x] = (0, o.useState)(null),
        v = "",
        b = 0,
        y = !1;
      for (let { display: e, value: i, fallback: l, title: o } of t) {
        let t = !1;
        e: for (let e = 0; e < r.length; e++) {
          for (let n of f)
            if (r[e]?.includes(n + ":" + i)) {
              if (p && e7.indexOf(p) < e7.indexOf(n)) continue;
              ((b = e), (t = !0), (v = i), (p = n));
              break e;
            }
          if (!p && r[e]?.includes(i)) {
            ((b = e), (t = !0), (v = i));
            break;
          }
        }
        if ((l && (y = !0), "dropdown" === n)) {
          m.push(
            (0, a.jsx)(
              tp.SelectItem,
              {
                value: i || " ",
                className: "h-8 w-full",
                onPointerEnter: () => {
                  g || x([r[b].join(" "), v || " "]);
                  let e = r[b].filter(
                    (e) => e !== (p ? p + ":" + v : v) && (!s || !s(e)),
                  );
                  (i && e.push(p ? p + ":" + i : i), h(b, e.join(" "), !0));
                },
                children: e,
              },
              i,
            ),
          );
          continue;
        }
        m.push(
          (0, a.jsx)(
            tm.Tooltip,
            {
              content: o || i,
              delayDuration: 200,
              sideOffset: 0,
              children: (0, a.jsx)("button", {
                className: (0, u.cn)(
                  "flex flex-1 items-center justify-center rounded-sm py-1 transition-colors",
                  t
                    ? "bg-v0-gray-200 [&_svg]:text-v0-gray-1000! hover:bg-v0-gray-300"
                    : "text-v0-gray-900 hover:bg-v0-gray-100",
                ),
                onClick: () => {
                  let e = r[b].filter(
                    (e) => e !== (p ? p + ":" + v : v) && (!s || !s(e)),
                  );
                  (i && e.push(p ? p + ":" + i : i), h(b, e.join(" ")));
                },
                children: e,
              }),
            },
            i,
          ),
        );
      }
      if (!v && !y)
        if (!i) return null;
        else ((v = i), (y = !0));
      let j = (0, a.jsxs)(tp.Select, {
          value: (g?.[1] ?? v) || " ",
          onValueChange: (e) => {
            (x(null), (e = e.trim()));
            let t = r[b].filter(
              (e) => e !== (p ? p + ":" + v : v) && (!s || !s(e)),
            );
            (e && t.push(p ? p + ":" + e : e), h(b, t.join(" "), !1));
          },
          children: [
            (0, a.jsx)(D.Button, {
              size: "sm",
              variant: "secondary",
              asChild: !0,
              className: "justify-between rounded-md font-normal",
              children: (0, a.jsxs)(tp.SelectTrigger, {
                hideChevron: !0,
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      c,
                      v
                        ? (0, a.jsx)(tp.SelectValue, {})
                        : (0, a.jsx)("span", {
                            className: "text-v0-gray-900",
                            children: "Default",
                          }),
                    ],
                  }),
                  (0, a.jsx)(tf.ChevronDownSmall, { className: "size-4" }),
                ],
              }),
            }),
            (0, a.jsx)(tp.SelectContent, {
              onPointerLeave: () => {
                if (g) {
                  let [e] = g;
                  h(b, e, !0);
                }
              },
              children: m,
            }),
          ],
        }),
        C = (0, a.jsx)("div", {
          className:
            "bg-v0-background-300 inline-flex h-8 w-full gap-0.5 rounded-md border border-v0-gray-200 p-[2px] text-sm",
          children: m,
        });
      return "dropdown" !== n
        ? (0, a.jsx)("div", {
            title: e,
            className: "flex flex-1",
            children: (0, a.jsxs)("div", {
              className: "flex w-full flex-col gap-1.5",
              children: [
                (0, a.jsx)("label", {
                  className:
                    "text-label-12 select-none capitalize leading-4 text-v0-gray-900",
                  children: e,
                }),
                C,
              ],
            }),
          })
        : d
          ? (0, a.jsxs)("div", {
              className: "flex w-full flex-col gap-1.5",
              children: [
                (0, a.jsx)("label", {
                  className:
                    "text-label-12 select-none capitalize leading-4 text-v0-gray-900",
                  children: e,
                }),
                j,
              ],
            })
          : (0, a.jsx)("div", {
              title: e,
              className: "flex flex-1",
              children: j,
            });
    }
    function sF({
      title: e,
      options: t,
      classNames: n,
      breakpoint: r,
      onUpdate: s,
    }) {
      let i = [],
        l = sh(r);
      for (let { display: e, value: r, title: o, conflict: c } of t) {
        let t,
          d = "",
          h = 0,
          p = !1;
        e: for (let e = 0; e < n.length; e++) {
          for (let s of l)
            if (n[e]?.includes(s + ":" + r)) {
              if (t && e7.indexOf(t) < e7.indexOf(s)) continue;
              ((h = e), (p = !0), (d = r), (t = s));
              break e;
            }
          if (!t && n[e]?.includes(r)) {
            ((h = e), (p = !0), (d = r));
            break;
          }
        }
        i.push(
          (0, a.jsx)(
            tm.Tooltip,
            {
              content: o || r,
              delayDuration: 200,
              sideOffset: 0,
              children: (0, a.jsx)("button", {
                className: (0, u.cn)(
                  "flex flex-1 items-center justify-center rounded-sm py-1 transition-colors",
                  p
                    ? "bg-v0-gray-200 [&_svg]:text-v0-gray-1000! hover:bg-v0-gray-300"
                    : "text-v0-gray-900 hover:bg-v0-gray-100",
                ),
                onClick: () => {
                  let e = !1,
                    i = n[h].filter((n) =>
                      n !== (t ? t + ":" + d : d)
                        ? !(c && c.includes(n))
                        : ((e = !0), !1),
                    );
                  (r && !e && i.push(t ? t + ":" + r : r), s(h, i.join(" ")));
                },
                children: e,
              }),
            },
            r,
          ),
        );
      }
      return (0, a.jsx)("div", {
        title: e,
        className: "flex flex-1",
        children: (0, a.jsxs)("div", {
          className: "flex w-full flex-col gap-1.5",
          children: [
            (0, a.jsx)("label", {
              className:
                "text-label-12 select-none capitalize leading-4 text-v0-gray-900",
              children: e,
            }),
            (0, a.jsx)("div", {
              className:
                "bg-v0-background-300 inline-flex h-8 w-full gap-0.5 rounded-md border border-v0-gray-200 p-[2px] text-sm",
              children: i,
            }),
          ],
        }),
      });
    }
    function sz({
      title: e,
      icon: t,
      value: n,
      step: r,
      allowNegative: s,
      allowIconSliding: i,
      min: l,
      max: o,
      disabled: c,
      onChange: d,
      suffix: u,
      presets: h = s_,
    }) {
      return (0, a.jsx)(tM, {
        title: e,
        prefix: t,
        suffix: u,
        disabled: c,
        value: n,
        onChange: d,
        step: r,
        min: l,
        max: o,
        allowNegative: s,
        allowIconSliding: i,
        presets: h,
      });
    }
    function sH(e) {
      return e[2] ? e[2] + ":" + e[0] : e[0];
    }
    function sB({
      title: e,
      showTitle: t,
      classNames: n,
      prefix: r,
      prefixX: s,
      prefixY: i,
      prefixT: l,
      prefixR: c,
      prefixB: d,
      prefixL: h,
      icon: p,
      iconX: m,
      iconY: f,
      iconT: g,
      iconR: x,
      iconB: v,
      iconL: b,
      breakpoint: y,
      generate: j,
      match: C,
      min: w,
      max: k,
      allowNegative: N,
      allowIconSliding: M,
      defaultValue: S = 0,
      onUpdate: I,
      presets: L,
    }) {
      let T = sh(y),
        E = {},
        _ = {};
      for (let e = 0; e < n.length; e++)
        for (let t of n[e] || []) {
          for (let n of T)
            if (t.startsWith(n + ":")) {
              let r = t.slice(n.length + 1),
                s = C(r);
              if (null !== s) {
                let t = E[s[0]];
                if (t?.[2] && e7.indexOf(t[2]) < e7.indexOf(n)) continue;
                ((E[s[0]] = [r, s[1], n]), (_[s[0]] = e));
              }
            }
          let n = C(t);
          if (null !== n) {
            let r = E[n[0]];
            r?.[2] || ((E[n[0]] = [t, n[1], void 0]), (_[n[0]] = e));
          }
        }
      let A = (e, t, a) => {
          let o,
            u = j(e, t);
          if (null === u) return;
          let p = _[e] || 0,
            m = new Set();
          E[e]?.[0]
            ? (m.add(sH(E[e])), (o = E[e][2]))
            : e === r ||
              (e === s || e === i
                ? (o = E[r]?.[2])
                : e === l || e === d
                  ? (o = E[i || ""]?.[2] || E[r]?.[2])
                  : (e === c || e === h) && (o = E[s || ""]?.[2] || E[r]?.[2]));
          let f = e.startsWith("gap"),
            g = e.startsWith("space");
          if (f || g) {
            let e = f
              ? [/^gap-/, /^gap-x-/, /^gap-y-/]
              : [/^space-x-/, /^space-y-/];
            for (let t = 0; t < n.length; t++)
              for (let r of n[t] || []) {
                let t = r.includes(":") ? r.split(":")[1] || "" : r;
                e.some((e) => e.test(t)) && m.add(r);
              }
          }
          (e === s || e === i || e === r) &&
            (l && E[l]?.[0] && m.add(sH(E[l])),
            c && E[c]?.[0] && m.add(sH(E[c])),
            d && E[d]?.[0] && m.add(sH(E[d])),
            h && E[h]?.[0] && m.add(sH(E[h])),
            e === r &&
              (s && E[s]?.[0] && m.add(sH(E[s])),
              i && E[i]?.[0] && m.add(sH(E[i]))));
          let x = n[p].filter((e) => !m.has(e));
          (x.push(o ? o + ":" + u : u), I(p, x.join(" "), a));
        },
        R = s ? (E[s] ?? E[r]) : void 0,
        P = i ? (E[i] ?? E[r]) : void 0,
        V = l ? (E[l] ?? (i ? E[i] : void 0) ?? E[r]) : void 0,
        $ = c ? (E[c] ?? (s ? E[s] : void 0) ?? E[r]) : void 0,
        F = d ? (E[d] ?? (i ? E[i] : void 0) ?? E[r]) : void 0,
        z = h ? (E[h] ?? (s ? E[s] : void 0) ?? E[r]) : void 0,
        H = F !== V || z !== $,
        [B, O] = (0, o.useState)(H),
        [U, W] = (0, o.useState)(!1),
        Z = (0, a.jsx)(sz, {
          presets: L,
          title: e,
          allowNegative: N,
          value: E[r]?.[1] ?? S,
          icon: U ? null : p,
          min: N ? void 0 : 0,
          allowIconSliding: M,
          onChange: (e, t, n, s) => {
            if ("number" == typeof e) {
              if (e < w || e > k || isNaN(e)) {
                (n(),
                  e < w && (t.value = w.toString()),
                  e > k && (t.value = k.toString()));
                return;
              }
              A(r, e, s);
            } else A(r, e, s);
          },
        }),
        G = s
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} X`,
              icon: m,
              allowNegative: N,
              value: R?.[1] ?? S,
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, i) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  U ? A(r, e, i) : A(s, e, i);
                } else U ? A(r, e, i) : A(s, e, i);
              },
            })
          : null,
        q = i
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} Y`,
              icon: f,
              allowNegative: N,
              disabled: U,
              value: U ? (R?.[1] ?? S) : (P?.[1] ?? S),
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, r) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  A(i, e, r);
                } else A(i, e, r);
              },
            })
          : null,
        X = l
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} Top`,
              icon: g,
              allowNegative: N,
              value: V?.[1] ?? S,
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, r) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  A(l, e, r);
                } else A(l, e, r);
              },
            })
          : null,
        Y = c
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} Right`,
              icon: x,
              allowNegative: N,
              value: $?.[1] ?? S,
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, r) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  A(c, e, r);
                } else A(c, e, r);
              },
            })
          : null,
        K = d
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} Bottom`,
              icon: v,
              allowNegative: N,
              value: F?.[1] ?? S,
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, r) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  A(d, e, r);
                } else A(d, e, r);
              },
            })
          : null,
        J = h
          ? (0, a.jsx)(sz, {
              presets: L,
              title: `${e} Left`,
              icon: b,
              allowNegative: N,
              value: z?.[1] ?? S,
              min: N ? void 0 : 0,
              allowIconSliding: M,
              onChange: (e, t, n, r) => {
                if ("number" == typeof e) {
                  if (e < w || e > k || isNaN(e)) {
                    (n(),
                      e < w && (t.value = w.toString()),
                      e > k && (t.value = k.toString()));
                    return;
                  }
                  A(h, e, r);
                } else A(h, e, r);
              },
            })
          : null,
        Q = l && c && d && h && !U,
        ee = G && q,
        et = (0, a.jsxs)("div", {
          className: "items-top flex w-full justify-between gap-2",
          children: [
            B
              ? (0, a.jsxs)("div", {
                  className: "flex w-full flex-1 flex-col gap-3",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "flex-1",
                          children: X,
                        }),
                        (0, a.jsx)("span", {
                          className: "flex-1",
                          children: K,
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "flex-1",
                          children: J,
                        }),
                        (0, a.jsx)("span", {
                          className: "flex-1",
                          children: Y,
                        }),
                      ],
                    }),
                  ],
                })
              : U
                ? (0, a.jsx)("div", {
                    className: "flex flex-1 items-center gap-3",
                    children: Z,
                  })
                : G && q
                  ? (0, a.jsxs)("div", {
                      className: "flex flex-1 items-center gap-3",
                      children: [G, q],
                    })
                  : (0, a.jsx)("div", {
                      className: "flex flex-1 items-center gap-3",
                      children: Z,
                    }),
            Q || ee
              ? (0, a.jsxs)("div", {
                  className: "flex gap-1",
                  children: [
                    Q
                      ? (0, a.jsx)(tm.Tooltip, {
                          content: "Toggle all sides",
                          children: (0, a.jsx)(D.Button, {
                            variant: "ghost",
                            size: "sm",
                            className: "w-8",
                            onClick: () => {
                              O(!B);
                            },
                            children: B
                              ? (0, a.jsx)(tx.FullscreenClose, {})
                              : (0, a.jsx)(tg.Fullscreen, {}),
                          }),
                        })
                      : null,
                    ee
                      ? (0, a.jsx)(tm.Tooltip, {
                          content: U ? "Unlock" : "Lock",
                          children: (0, a.jsx)(D.Button, {
                            variant: U ? "blue-ghost" : "ghost",
                            size: "sm",
                            "data-locked": U,
                            className: (0, u.cn)(
                              "w-8",
                              U &&
                                "[&[data-locked=true]_svg]:text-v0-blue-800!",
                            ),
                            onClick: () => {
                              U ? W(!1) : (W(!0), B && O(!1));
                            },
                            children: (0, a.jsx)(tv.LockClosed, {}),
                          }),
                        })
                      : null,
                  ],
                })
              : null,
          ],
        });
      return t
        ? (0, a.jsxs)("div", {
            className: "flex w-full flex-col gap-1.5",
            children: [
              (0, a.jsx)("label", {
                className:
                  "text-label-12 select-none capitalize leading-4 text-v0-gray-900",
                children: e,
              }),
              et,
            ],
          })
        : et;
    }
    function sO({
      title: e,
      classNames: t,
      defaultValue: n,
      step: r,
      allowNegative: s,
      breakpoint: i,
      prefix: l,
      icon: o,
      suffix: c,
      generate: d,
      match: u,
      min: h,
      max: p,
      onUpdate: m,
      presets: f,
    }) {
      let g = sh(i),
        x = {},
        v = {};
      for (let e = 0; e < t.length; e++)
        for (let n of t[e] || []) {
          for (let t of g)
            if (n.startsWith(t + ":")) {
              let r = u(n.slice(t.length + 1));
              if (null !== r) {
                let s = x[r[0]];
                if (s?.[2] && e7.indexOf(s[2]) < e7.indexOf(t)) continue;
                ((x[r[0]] = [n, r[1], t]), (v[r[0]] = e));
              }
            }
          let t = u(n);
          if (null !== t) {
            let r = x[t[0]];
            r?.[2] || ((x[t[0]] = [n, t[1], void 0]), (v[t[0]] = e));
          }
        }
      let b = (e, n, r) => {
        let s,
          i,
          a = d(e, n);
        if (null === a) return !1;
        let l = v[e] || 0;
        x[e]?.[0] && ((s = sH(x[e])), (i = x[e][2]));
        let o = s ? t[l].filter((e) => e !== s) : [...t[l]];
        (o.push(i ? i + ":" + a : a), m(l, o.join(" "), r));
      };
      return (0, a.jsx)("div", {
        className: "items-top flex w-full justify-between gap-2",
        children: (0, a.jsx)("div", {
          className: "flex flex-1 items-center gap-3",
          children: (0, a.jsx)(sz, {
            presets: f,
            title: e,
            value: x[l]?.[1] ?? n,
            icon: o,
            suffix: c,
            step: r,
            min: h,
            max: p,
            allowIconSliding: !0,
            allowNegative: s,
            onChange: (e, t, n, r) => {
              if ("number" != typeof e) return b(l, e, r);
              if (e < h || e > p || isNaN(e)) {
                (n(),
                  e < h && (t.value = h.toString()),
                  e > p && (t.value = p.toString()));
                return;
              }
              return b(l, e, r);
            },
          }),
        }),
      });
    }
    function sU({
      title: e,
      classNames: t,
      computedColor: n,
      tokens: r,
      prefix: s,
      match: i,
      fallback: l,
      onUpdate: c,
    }) {
      let { colorClassName: d, activeIndex: u } = (0, o.useMemo)(() => {
          let e = "",
            n = 0;
          for (let r = 0; r < t.length; r++)
            for (let s = 0; s < (t[r] || []).length; s++) {
              let a = i(t[r]?.[s] || "");
              if (null !== a) {
                ((e = a), (n = r));
                break;
              }
            }
          return { colorClassName: e, activeIndex: n };
        }, [t, i]),
        [h, p] = (0, o.useState)(null),
        m = (0, o.useCallback)(
          (e) => {
            let n = t[u].filter((e) => e !== d);
            if (e) {
              let t = `${s}[rgba(${e.r},${e.g},${e.b},${e.a})]`;
              n.push(t);
            }
            c(u, n.join(" "), !0);
          },
          [u, t, d, c, s],
        ),
        f = (0, o.useCallback)(
          (e) => {
            let n = t[u].filter((e) => e !== d);
            if (e) {
              let t = `${s}${e}`;
              n.push(t);
            }
            c(u, n.join(" "), !1);
          },
          [u, t, d, c, s],
        ),
        g = (0, o.useCallback)(() => {
          if (h) {
            let [e] = h;
            (c(u, e, !0), p(null));
          }
        }, [u, c, h]),
        x = (0, o.useCallback)(
          (e) => {
            h || p([t[u].join(" "), d || " "]);
            let n = t[u].filter((e) => e !== d);
            ("Default" !== e.label && n.push(`${s}${e.label}`),
              c(u, n.join(" "), !0));
          },
          [u, t, d, c, s, h],
        ),
        v = (0, o.useCallback)((e, t) => {
          e.current && (e.current.textContent = t);
        }, []),
        b = (0, o.useMemo)(
          () =>
            r
              ? [
                  { label: "Default", value: "" },
                  ...Object.entries(r).map(([e, t]) => ({
                    label: e,
                    value: t,
                  })),
                ]
              : [],
          [r],
        ),
        { displayedColorName: y, parsedColor: j } = (0, o.useMemo)(() => {
          if (!d) return { displayedColorName: null, parsedColor: null };
          let e = d.startsWith(s) ? d.slice(s.length) : null;
          if (r && e && r[e])
            return { displayedColorName: e, parsedColor: no(r[e]) ?? null };
          if (n) {
            let e = no(n);
            return {
              displayedColorName: e ? ss(e) : null,
              parsedColor: e ?? null,
            };
          }
          return { displayedColorName: null, parsedColor: null };
        }, [d, s, r, n]);
      return d || l
        ? (0, a.jsx)(sj, {
            title: e,
            displayedColorName: y,
            colorTokens: b,
            onColorChange: m,
            onTokensChange: f,
            onPointerEnter: x,
            onPointerLeave: g,
            updateColorNameTextContent: v,
            clearRevertPreview: () => p(null),
            parsedColor: j,
            alphaEnabled: !0,
          })
        : null;
    }
    var sW = e.i(563261);
    function sZ({ source: e, name: t, props: n, onUpdate: r }) {
      let s = [];
      function i(e, t, n) {
        "__v0_dynamic" !== t &&
          s.push({ name: e, active: t ? JSON.parse(t) : n[0], options: n });
      }
      return ("@/components/ui/button" === e && "Button" === t
        ? i("variant", n.variant?.[0], [
            "default",
            "secondary",
            "destructive",
            "outline",
            "ghost",
            "link",
          ])
        : "@/components/ui/badge" === e && "Badge" === t
          ? i("variant", n.variant?.[0], [
              "default",
              "secondary",
              "destructive",
              "outline",
            ])
          : "@/components/ui/alert" === e && "Alert" === t
            ? i("variant", n.variant?.[0], ["default", "destructive"])
            : "@/components/ui/toggle" === e && "Toggle" === t
              ? (i("variant", n.variant?.[0], ["default", "outline"]),
                i("size", n.size?.[0], ["default", "sm", "lg"]))
              : "@/components/ui/sidebar" === e
                ? ("SidebarMenuButton" === t &&
                    i("variant", n.variant?.[0], ["default", "outline"]),
                  ("SidebarMenuButton" === t || "SidebarMenuSubButton" === t) &&
                    i("size", n.size?.[0], ["default", "sm", "lg"]))
                : "@/components/ui/input" === e && "Input" === t
                  ? i("type", n.type?.[0], [
                      "text",
                      "email",
                      "password",
                      "number",
                      "search",
                      "tel",
                      "url",
                    ])
                  : "@/components/ui/select" === e &&
                    "SelectContent" === t &&
                    (i("side", n.side?.[0], ["top", "bottom", "left", "right"]),
                    i("align", n.align?.[0], ["start", "center", "end"])),
      0 === s.length)
        ? null
        : (0, a.jsx)(sw, {
            title: "Component",
            children: (0, a.jsx)("div", {
              className: "flex flex-col gap-2",
              children: s.map(({ name: e, active: t, options: n }) =>
                (0, a.jsxs)(
                  "div",
                  {
                    className: "flex flex-col items-start gap-1",
                    children: [
                      (0, a.jsx)("label", {
                        className: "text-label-12 capitalize opacity-60",
                        children: e,
                      }),
                      (0, a.jsxs)(tp.Select, {
                        onValueChange: (t) => {
                          r(e, t);
                        },
                        value: t,
                        children: [
                          (0, a.jsx)(D.Button, {
                            size: "sm",
                            variant: "secondary",
                            asChild: !0,
                            className:
                              "justify-between font-normal min-w-0 flex-1",
                            children: (0, a.jsx)(tp.SelectTrigger, {
                              children: (0, a.jsx)("div", {
                                className: "flex items-center gap-2 capitalize",
                                children: t,
                              }),
                            }),
                          }),
                          (0, a.jsx)(tp.SelectContent, {
                            children: n.map((e) =>
                              (0, a.jsx)(
                                tp.SelectItem,
                                {
                                  value: e,
                                  className: "h-8 w-full capitalize",
                                  children: e,
                                },
                                e,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  },
                  e,
                ),
              ),
            }),
          });
    }
    var sG = e.i(470259);
    let sq = (0, sW.default)(() => e.A(556530).then((e) => e.DevToolsIcon), {
      loadableGenerated: { modules: [747854] },
    });
    function sX({
      classNames: e,
      classNamesInfo: t,
      handleClassUpdate: n,
      handleContentUpdate: r,
      handleIconUpdate: s,
      handleImageSrcUpdate: i,
      handlePropUpdate: l,
      selected: d,
      imageUpload: u,
      getFileContent: h,
    }) {
      let p,
        { iedm: f } = (0, Z.useFlags)(),
        g = (0, y.useChatId)(),
        x = (0, m.useActiveBlockState)(),
        v = d.info?.twTokens.colors,
        b = d.info?.twVersion || 3,
        j = d.lib?.source === "lucide-react",
        C = (d.lib?.source || "").startsWith("@/components/ui/"),
        w = sv(d, h),
        k = t.size || j,
        { inputFileRef: N, onInputChange: M, isUploading: S, imageSrc: I } = u,
        L = (function ({ currentImageUrl: e, onImageUpdate: t }) {
          let n = (0, c.useRouter)(),
            r = (0, y.useChatId)(),
            s = (0, m.useActiveBlockState)(),
            [i, a] = (0, o.useState)({
              state: "idle",
              originalUrl: null,
              variants: [],
              selectedIndex: null,
            }),
            l = (0, o.useCallback)(
              async (r) => {
                if (!e) return;
                let s = sg(e);
                a({
                  state: "loading",
                  originalUrl: e,
                  variants: [],
                  selectedIndex: null,
                });
                try {
                  let i = await fetch("/api/chat/images/regenerate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      imageUrl: e,
                      modifications: r || void 0,
                      isPlaceholder: s,
                    }),
                  });
                  if (!i.ok) {
                    if (
                      402 === i.status &&
                      (await i.text()) === sG.OUT_OF_CREDITS
                    ) {
                      (a({
                        state: "idle",
                        originalUrl: null,
                        variants: [],
                        selectedIndex: null,
                      }),
                        (0, V.handleChatError)(sG.OUT_OF_CREDITS, n));
                      return;
                    }
                    throw Error(`API error: ${i.status} ${i.statusText}`);
                  }
                  let l = await i.json();
                  if (!l.variants || !Array.isArray(l.variants))
                    throw Error("Invalid API response: missing variants");
                  let o = l.variants.map((e) => e.url);
                  a((e) => {
                    let n = s ? 0 : -1;
                    if (-1 === n) t(e.originalUrl || "", !0);
                    else {
                      let e = o[n];
                      e && t(e, !0);
                    }
                    return {
                      ...e,
                      state: "completed",
                      variants: o,
                      selectedIndex: n,
                    };
                  });
                } catch (r) {
                  let e,
                    { errorType: t, errorMessage: n } =
                      ((e = r instanceof Error ? r.message : String(r)),
                      "TypeError" === r.name && e.includes("fetch")
                        ? {
                            errorType: "network",
                            errorMessage:
                              "Connection failed. Please check your internet and try again.",
                          }
                        : e.includes("401") || e.includes("Authentication")
                          ? {
                              errorType: "auth",
                              errorMessage:
                                "Authentication expired. Please sign in again.",
                            }
                          : e.includes("429") || e.includes("rate limit")
                            ? {
                                errorType: "rate_limit",
                                errorMessage:
                                  "Too many requests. Please wait a moment and try again.",
                              }
                            : e.includes("timeout") ||
                                e.includes("took too long")
                              ? {
                                  errorType: "timeout",
                                  errorMessage:
                                    "Processing is taking too long. Please try again.",
                                }
                              : e.includes("Invalid content type") ||
                                  e.includes("not supported") ||
                                  e.includes("Unsupported")
                                ? {
                                    errorType: "unsupported_file_type",
                                    errorMessage:
                                      "This file type is not supported. Please use image files.",
                                  }
                                : e.includes("too large") ||
                                    e.includes("Image too large") ||
                                    e.includes("max:")
                                  ? {
                                      errorType: "file_too_large",
                                      errorMessage:
                                        "This image is too large. Please use an image under 20MB.",
                                    }
                                  : e.includes("Failed to download") ||
                                      e.includes("HTTP error")
                                    ? {
                                        errorType: "download_failed",
                                        errorMessage:
                                          "Unable to access this image. The URL may be broken or the image may have been deleted.",
                                      }
                                    : e.includes("400") ||
                                        e.includes("Invalid") ||
                                        e.includes("invalid")
                                      ? {
                                          errorType: "validation",
                                          errorMessage:
                                            "Unable to process this image. Please try a different image.",
                                        }
                                      : e.includes("missing variants") ||
                                          e.includes("Invalid API response")
                                        ? {
                                            errorType: "invalid_response",
                                            errorMessage:
                                              "Unexpected server response. Please try again.",
                                          }
                                        : {
                                            errorType: "api",
                                            errorMessage:
                                              "Server error. Please try again in a moment.",
                                          });
                  a((e) => ({
                    ...e,
                    state: "error",
                    errorMessage: n,
                    errorType: t,
                    variants: [],
                    selectedIndex: null,
                  }));
                }
              },
              [e, t, n],
            ),
            d = (0, o.useCallback)(
              (e) => {
                a((n) => {
                  let r = { ...n, selectedIndex: e };
                  if (-1 === e) t(n.originalUrl || "", !0);
                  else {
                    let r = n.variants[e];
                    r && t(r, !0);
                  }
                  return r;
                });
              },
              [t, r, s?.id, e],
            ),
            u = (0, o.useCallback)(() => {
              let { selectedIndex: e } = i;
              if (null === e) return;
              if (-1 === e)
                return void a({
                  state: "idle",
                  originalUrl: null,
                  variants: [],
                  selectedIndex: null,
                });
              let n = i.variants[e];
              (n && t(n, !1),
                a({
                  state: "idle",
                  originalUrl: null,
                  variants: [],
                  selectedIndex: null,
                }));
            }, [i, t, r, s?.id, e]),
            h = (0, o.useCallback)(() => {
              (i.originalUrl && t(i.originalUrl, !0),
                a({
                  state: "idle",
                  originalUrl: null,
                  variants: [],
                  selectedIndex: null,
                }));
            }, [i, t, r, s?.id, e]),
            p = (0, o.useCallback)(async () => {
              await l();
            }, [l]),
            f = (0, o.useCallback)(() => {
              a({
                state: "idle",
                originalUrl: null,
                variants: [],
                selectedIndex: null,
              });
            }, []),
            g = (0, o.useMemo)(
              () =>
                "completed" !== i.state || null === i.selectedIndex
                  ? null
                  : -1 === i.selectedIndex
                    ? i.originalUrl
                    : i.variants[i.selectedIndex],
              [i.state, i.selectedIndex, i.originalUrl, i.variants],
            );
          return (
            (0, o.useEffect)(() => {
              if ("completed" === i.state && i.variants.length > 0) {
                let e = [];
                if (
                  (i.variants.forEach((t) => {
                    let n = new Image();
                    ((n.onerror = () => {
                      console.warn(`Failed to preload variant: ${t}`);
                    }),
                      (n.src = t),
                      e.push(n));
                  }),
                  i.originalUrl)
                ) {
                  let t = new Image();
                  ((t.onerror = () => {
                    console.warn(
                      `Failed to preload original: ${i.originalUrl}`,
                    );
                  }),
                    (t.src = i.originalUrl),
                    e.push(t));
                }
                return () => {
                  e.forEach((e) => {
                    ((e.src = ""), (e.onload = null), (e.onerror = null));
                  });
                };
              }
            }, [i.state, i.variants, i.originalUrl]),
            {
              regenerationState: i,
              regenerateImage: l,
              selectVariant: d,
              acceptRegeneration: u,
              declineRegeneration: h,
              retryRegeneration: p,
              resetToIdle: f,
              isRegenerating: "loading" === i.state,
              hasVariants: "completed" === i.state,
              hasError: "error" === i.state,
              selectedImageUrl: g,
              selectedVariantUrl:
                null === i.selectedIndex
                  ? null
                  : -1 === i.selectedIndex
                    ? i.originalUrl
                    : i.variants[i.selectedIndex],
            }
          );
        })({
          currentImageUrl: I,
          onImageUpdate: (e, t) => {
            sv(d, h) ? i(e, t) : r(e, t);
          },
        }),
        [T, E] = (0, o.useState)(!1),
        [_, A] = (0, o.useState)(!1),
        [R, P] = (0, o.useState)(""),
        $ = (0, o.useRef)(null),
        F = (0, o.useCallback)((e) => {
          ((e.style.height = "auto"), (e.style.height = `${e.scrollHeight}px`));
        }, []),
        z = (0, o.useCallback)(async () => {
          if (!R.trim()) return;
          let e = R.trim();
          (A(!1), P(""), await L.regenerateImage(e));
        }, [R, L, g, x?.id, I]);
      ((0, o.useEffect)(() => {
        E(!1);
      }, [I]),
        (0, o.useEffect)(() => {
          L.isRegenerating && (A(!1), P(""));
        }, [L.isRegenerating]),
        (0, o.useEffect)(() => {
          _ && $.current && F($.current);
        }, [_, F]));
      let H = (0, o.useCallback)(
          (e, t, n, r, s) =>
            (0, a.jsxs)("div", {
              className: `flex-1 aspect-video rounded-md border-2 overflow-hidden cursor-pointer transition-all relative ${r ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
              onClick: s,
              children: [
                (0, a.jsx)("img", {
                  src: "/chat-static/chuckerboard.png",
                  alt: "",
                  className: "absolute inset-0 w-full h-full object-cover",
                }),
                (0, a.jsx)("img", {
                  src: e,
                  alt: t,
                  className: "relative z-10 w-full h-full object-contain",
                  onError: (e) => {
                    let t = e.target;
                    "/chat-static/chuckerboard.png" !== t.src &&
                      (t.src = "/chat-static/chuckerboard.png");
                  },
                }),
              ],
            }),
          [],
        ),
        B = (0, o.useCallback)(
          () =>
            sg(I)
              ? (0, a.jsxs)(D.Button, {
                  variant: "secondary",
                  size: "xs",
                  className: "w-full min-h-[30px] rounded-md",
                  onClick: () => A(!0),
                  disabled: !I || L.isRegenerating,
                  children: [
                    (0, a.jsx)(tR.EditPrompt, {
                      className: "w-2.5 h-2.5 !fill-v0-gray-1000",
                    }),
                    (0, a.jsx)("span", {
                      className: "font-medium",
                      children: "Prompt to Edit",
                    }),
                  ],
                })
              : (0, a.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, a.jsxs)(D.Button, {
                      variant: "secondary",
                      size: "xs",
                      className: "flex-1 min-h-[30px] rounded-md",
                      onClick: () => {
                        L.regenerateImage();
                      },
                      disabled: !I,
                      children: [
                        (0, a.jsx)(tc.RotateCounterClockwise, {
                          className: "w-2.5 h-2.5 !fill-v0-gray-1000",
                        }),
                        (0, a.jsx)("span", {
                          className: "font-medium",
                          children: "Regenerate",
                        }),
                      ],
                    }),
                    (0, a.jsxs)(D.Button, {
                      variant: "secondary",
                      size: "xs",
                      className: "flex-1 min-h-[30px] rounded-md",
                      onClick: () => A(!0),
                      disabled: !I || L.isRegenerating,
                      children: [
                        (0, a.jsx)(tR.EditPrompt, {
                          className: "w-2.5 h-2.5 !fill-v0-gray-1000",
                        }),
                        (0, a.jsx)("span", {
                          className: "font-medium",
                          children: "Prompt to Edit",
                        }),
                      ],
                    }),
                  ],
                }),
          [I, L, A],
        ),
        O = (0, o.useCallback)(() => {
          let e,
            {
              isPlaceholder: t,
              middleThumbnail: n,
              rightThumbnail: r,
            } = {
              isPlaceholder: (e = sg(I)),
              showThreeVariants: e,
              middleThumbnail: e
                ? { index: 1, label: "Variant 2" }
                : { index: -1, label: "Original" },
              rightThumbnail: e
                ? { index: 2, label: "Variant 3" }
                : { index: 1, label: "Variant 2" },
            };
          return (0, a.jsxs)("div", {
            className: "flex gap-2",
            children: [
              H(
                L.regenerationState.variants[0] || "",
                "Variant 1",
                0,
                0 === L.regenerationState.selectedIndex,
                () => L.selectVariant(0),
              ),
              H(
                -1 === n.index
                  ? L.regenerationState.originalUrl || ""
                  : L.regenerationState.variants[n.index] || "",
                n.label,
                n.index,
                L.regenerationState.selectedIndex === n.index,
                () => L.selectVariant(n.index),
              ),
              H(
                L.regenerationState.variants[r.index] || "",
                r.label,
                r.index,
                L.regenerationState.selectedIndex === r.index,
                () => L.selectVariant(r.index),
              ),
            ],
          });
        }, [I, L, H]);
      return (0, a.jsxs)(a.Fragment, {
        children: [
          j
            ? (0, a.jsx)(sw, {
                title: "Icon",
                children: (0, a.jsx)(o.Suspense, {
                  fallback: (0, a.jsx)("div", {
                    className:
                      "h-8 w-full animate-pulse rounded-md bg-v0-gray-200",
                  }),
                  children: (0, a.jsx)(sq, {
                    name: d.lib.name,
                    lib: d.lib.source,
                    onUpdate: s,
                  }),
                }),
              })
            : null,
          C
            ? (0, a.jsx)(sZ, {
                source: d.lib.source,
                name: d.lib.name,
                props: d.lib.props,
                onUpdate: l,
              })
            : null,
          w && f
            ? (0, a.jsx)(sw, {
                title: "Image",
                infoIcon: (0, a.jsx)(sC, {
                  content: (0, a.jsxs)("div", {
                    className: "flex flex-col gap-1",
                    children: [
                      (0, a.jsx)("div", {
                        className: "text-xs font-medium",
                        children: "Generate an image",
                      }),
                      (0, a.jsx)("div", {
                        className: "text-xs",
                        children: "$0.05 per image generation",
                      }),
                    ],
                  }),
                }),
                children: (0, a.jsxs)("div", {
                  className: "space-y-3",
                  children: [
                    (0, a.jsxs)("div", {
                      className:
                        "relative rounded-md border overflow-hidden group",
                      children: [
                        (0, a.jsxs)("div", {
                          className:
                            "w-full aspect-[16/9] flex items-center justify-center relative",
                          children: [
                            (0, a.jsx)("img", {
                              src: "/chat-static/chuckerboard.png",
                              alt: "",
                              className:
                                "absolute inset-0 w-full h-full object-cover",
                            }),
                            (p =
                              L.hasVariants && L.selectedImageUrl
                                ? L.selectedImageUrl
                                : I) && !T
                              ? (0, a.jsx)(
                                  "img",
                                  {
                                    src: p,
                                    alt: "Preview",
                                    className:
                                      "absolute inset-0 w-full h-full relative z-10 object-contain opacity-100",
                                    onError: () => E(!0),
                                  },
                                  p,
                                )
                              : (0, a.jsx)("div", {
                                  className:
                                    "relative z-10 w-16 h-16 bg-v0-gray-300 rounded flex items-center justify-center",
                                  children: (0, a.jsxs)("svg", {
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    children: [
                                      (0, a.jsx)("rect", {
                                        x: "3",
                                        y: "3",
                                        width: "18",
                                        height: "18",
                                        rx: "2",
                                        stroke: "#9CA3AF",
                                        strokeWidth: "2",
                                      }),
                                      (0, a.jsx)("circle", {
                                        cx: "9",
                                        cy: "9",
                                        r: "2",
                                        stroke: "#9CA3AF",
                                        strokeWidth: "2",
                                      }),
                                      (0, a.jsx)("path", {
                                        d: "M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21",
                                        stroke: "#9CA3AF",
                                        strokeWidth: "2",
                                      }),
                                    ],
                                  }),
                                }),
                            L.isRegenerating &&
                              (0, a.jsx)("div", {
                                className:
                                  "absolute inset-0 z-15 overflow-hidden",
                                children: (0, a.jsx)("div", {
                                  className: "absolute inset-0",
                                  style: {
                                    background:
                                      "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                                    width: "200%",
                                    height: "200%",
                                    top: "-50%",
                                    left: "-50%",
                                    animation:
                                      "image-regeneration-shimmer 2s ease-in-out infinite",
                                  },
                                }),
                              }),
                          ],
                        }),
                        !L.isRegenerating &&
                          !L.hasVariants &&
                          !_ &&
                          (0, a.jsx)("div", {
                            className:
                              "absolute inset-0 flex items-center justify-center transition-all bg-black/60 opacity-0 group-hover:opacity-100 duration-300 z-20",
                            children: (0, a.jsxs)(D.Button, {
                              variant: "secondary",
                              size: "sm",
                              onClick: () => {
                                (N.current?.click(),
                                  setTimeout(() => {
                                    document.activeElement instanceof
                                      HTMLElement &&
                                      document.activeElement.blur();
                                  }, 100));
                              },
                              disabled: S,
                              className: "z-30",
                              children: [
                                (0, a.jsx)(to.CloudUpload, {
                                  className: "w-4 h-4 mr-2",
                                }),
                                (0, a.jsx)("span", {
                                  children: S ? "Uploading..." : "Upload File",
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                    (0, a.jsx)("input", {
                      ref: N,
                      type: "file",
                      accept: "image/*",
                      onChange: M,
                      className: "hidden",
                    }),
                    L.isRegenerating
                      ? (0, a.jsx)(th.TransitionNode, {
                          ...th.PRESETS.fade,
                          children: (0, a.jsx)(tu.SpinnerButton, {
                            pending: !0,
                            variant: "default",
                            size: "xs",
                            className: "w-full min-h-[30px] rounded-md",
                            disabled: !0,
                            children: "Regenerating",
                          }),
                        })
                      : L.hasError
                        ? (0, a.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "flex items-center gap-2 p-3 bg-v0-red-200 border border-v0-red-300 rounded-md",
                                children: [
                                  (0, a.jsxs)("svg", {
                                    className:
                                      "w-5 h-5 text-v0-gray-1000 flex-shrink-0",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: [
                                      (0, a.jsx)("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                      }),
                                      (0, a.jsx)("line", {
                                        x1: "15",
                                        y1: "9",
                                        x2: "9",
                                        y2: "15",
                                      }),
                                      (0, a.jsx)("line", {
                                        x1: "9",
                                        y1: "9",
                                        x2: "15",
                                        y2: "15",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm font-medium text-v0-gray-1000",
                                        children: "Regeneration Failed",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-xs text-v0-gray-1000 mt-1",
                                        children:
                                          L.regenerationState.errorMessage ||
                                          "An error occurred while regenerating the image.",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, a.jsxs)(D.Button, {
                                    variant: "secondary",
                                    size: "xs",
                                    className: "flex-1 rounded-md",
                                    onClick: L.retryRegeneration,
                                    disabled: !I,
                                    children: [
                                      (0, a.jsx)(tc.RotateCounterClockwise, {
                                        className:
                                          "w-2.5 h-2.5 !text-v0-gray-900",
                                      }),
                                      "Try Again",
                                    ],
                                  }),
                                  (0, a.jsx)(D.Button, {
                                    variant: "outline",
                                    size: "xs",
                                    className: "flex-1 rounded-md",
                                    onClick: L.resetToIdle,
                                    children: "Cancel",
                                  }),
                                ],
                              }),
                            ],
                          })
                        : !(function (e, t) {
                              if (!e.hasVariants) return !1;
                              let n = sg(t);
                              return (
                                e.regenerationState.variants.length >=
                                (n ? 3 : 2)
                              );
                            })(L, I)
                          ? (0, a.jsx)(th.TransitionNode, {
                              ...th.PRESETS.fade,
                              renderKey: _ ? "prompt" : "buttons",
                              children: _
                                ? (0, a.jsxs)("div", {
                                    className:
                                      "flex w-full items-end rounded-md border !border-v0-alpha-400 bg-v0-background-300 text-sm focus-within:!border-v0-alpha-600 hover:!border-v0-alpha-500 focus-within:hover:!border-v0-alpha-600 min-h-[30px] px-1.5 py-1",
                                    children: [
                                      (0, a.jsx)("textarea", {
                                        ref: $,
                                        value: R,
                                        onChange: (e) => {
                                          (P(e.target.value), F(e.target));
                                        },
                                        onKeyDown: (e) => {
                                          "Enter" === e.key &&
                                          !e.shiftKey &&
                                          R.trim()
                                            ? (e.preventDefault(), z())
                                            : "Escape" === e.key &&
                                              (A(!1), P(""));
                                        },
                                        placeholder: "Describe your changes...",
                                        rows: 1,
                                        className:
                                          "flex-1 bg-transparent border-0 outline-0 text-sm placeholder:text-v0-gray-600 placeholder:font-geist placeholder:font-normal resize-none leading-tighter",
                                        style: { minHeight: "20px" },
                                        autoFocus: !0,
                                      }),
                                      R.trim()
                                        ? (0, a.jsx)("button", {
                                            type: "button",
                                            className:
                                              "ml-2 h-4 w-4 p-0 flex items-center justify-center text-v0-gray-600 hover:text-v0-gray-900 dark:hover:text-v0-gray-100 transition-all duration-200 ease-in-out flex-shrink-0 self-center rounded",
                                            onClick: () => void z(),
                                            children: (0, a.jsx)(td.ArrowUp, {
                                              className: "w-4 h-4",
                                            }),
                                          })
                                        : (0, a.jsx)("kbd", {
                                            className:
                                              "ml-2 h-5 w-auto px-1 py-0 flex items-center justify-center text-v0-gray-600 transition-all duration-200 ease-in-out flex-shrink-0 self-center rounded-md border border-v0-alpha-100 dark:border-v0-alpha-200 bg-v0-background-200 dark:bg-v0-alpha-200 tracking-[-0.1em] cursor-pointer font-mono font-medium text-[11px]",
                                            onClick: () => {
                                              (A(!1), P(""));
                                            },
                                            children: "Esc",
                                          }),
                                    ],
                                  })
                                : B(),
                            })
                          : (0, a.jsxs)("div", {
                              className: "space-y-3",
                              children: [
                                O(),
                                (0, a.jsxs)("div", {
                                  className: "flex gap-2",
                                  children: [
                                    (0, a.jsx)(D.Button, {
                                      variant: "outline",
                                      size: "xs",
                                      className: "flex-1 aspect-square p-0",
                                      onClick: L.declineRegeneration,
                                      children: (0, a.jsxs)("svg", {
                                        className: "w-4 h-4 text-v0-gray-1000",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [
                                          (0, a.jsx)("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18",
                                          }),
                                          (0, a.jsx)("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, a.jsx)(D.Button, {
                                      size: "xs",
                                      className:
                                        "flex-1 aspect-square p-0 bg-v0-blue-700 hover:bg-v0-blue-600 text-v0-white border-0",
                                      onClick: L.acceptRegeneration,
                                      disabled:
                                        null ===
                                        L.regenerationState.selectedIndex,
                                      children: (0, a.jsx)("svg", {
                                        className: "w-4 h-4",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "white",
                                        strokeWidth: "2",
                                        children: (0, a.jsx)("polyline", {
                                          points: "20,6 9,17 4,12",
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                  ],
                }),
              })
            : null,
          d.content
            ? (0, a.jsx)(sw, {
                title: "Content",
                children: (0, a.jsx)(sk, {
                  value: d.content.value,
                  onUpdate: r,
                  type: d.content.type,
                }),
              })
            : null,
          j
            ? null
            : (0, a.jsxs)(sw, {
                title: "Typography",
                children: [
                  (0, a.jsx)(s$, {
                    title: "Font Family",
                    onUpdate: n,
                    classNames: e,
                    breakpoint: d.info?.activeBreakpoint,
                    type: "dropdown",
                    options: [
                      {
                        display: (0, a.jsx)("span", {
                          className: "text-v0-gray-900",
                          children: "Default",
                        }),
                        value: "",
                        fallback: !0,
                      },
                      { display: "Sans Serif", value: "font-sans" },
                      { display: "Serif", value: "font-serif" },
                      { display: "Monospace", value: "font-mono" },
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex w-full gap-3",
                    children: [
                      (0, a.jsx)(s$, {
                        title: "Weight",
                        onUpdate: n,
                        classNames: e,
                        fallbackValue: sD[d.info?.fontWeight || "400"],
                        breakpoint: d.info?.activeBreakpoint,
                        type: "dropdown",
                        options: [
                          { display: "Thin", value: "font-thin" },
                          { display: "Extra Light", value: "font-extralight" },
                          { display: "Light", value: "font-light" },
                          { display: "Regular", value: "font-normal" },
                          { display: "Medium", value: "font-medium" },
                          { display: "Semi Bold", value: "font-semibold" },
                          { display: "Bold", value: "font-bold" },
                          { display: "Extra Bold", value: "font-extrabold" },
                          { display: "Black", value: "font-black" },
                        ],
                      }),
                      (0, a.jsx)(s$, {
                        title: "Size",
                        onUpdate: n,
                        classNames: e,
                        breakpoint: d.info?.activeBreakpoint,
                        type: "dropdown",
                        match: (e) =>
                          /^text-\[[\d.]+(px|em|rem|pt|%)\]$/.test(e),
                        options: [
                          {
                            display: (0, a.jsx)("span", {
                              className: "text-v0-gray-900",
                              children: "Default",
                            }),
                            value: "",
                            fallback: !0,
                          },
                          { display: "xs", value: "text-xs" },
                          { display: "sm", value: "text-sm" },
                          { display: "base", value: "text-base" },
                          { display: "lg", value: "text-lg" },
                          { display: "xl", value: "text-xl" },
                          { display: "2xl", value: "text-2xl" },
                          { display: "3xl", value: "text-3xl" },
                          { display: "4xl", value: "text-4xl" },
                          { display: "5xl", value: "text-5xl" },
                          { display: "6xl", value: "text-6xl" },
                          { display: "7xl", value: "text-7xl" },
                          { display: "8xl", value: "text-8xl" },
                          { display: "9xl", value: "text-9xl" },
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex w-full flex-wrap gap-3",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex flex-1 flex-col gap-1.5",
                        children: [
                          (0, a.jsx)("label", {
                            className:
                              "text-label-12 select-none capitalize leading-4 opacity-60",
                            children: "Line Height",
                          }),
                          (0, a.jsx)(sO, {
                            title: "Line Height",
                            classNames: e,
                            breakpoint: d.info?.activeBreakpoint,
                            presets: sI,
                            icon: null,
                            prefix: "leading",
                            defaultValue: 4,
                            step: 0.05,
                            generate: (e, t) =>
                              `${e}-${"number" == typeof t ? sS[t] : `[${t}]`}`,
                            match: (e) => {
                              let t = e.match(/^leading-(.+)$/);
                              if (t && t[1]) {
                                let e = sS.indexOf(t[1]);
                                if (-1 !== e) return ["leading", e];
                                if (t[1].startsWith("[") && t[1].endsWith("]"))
                                  return ["leading", t[1].slice(1, -1)];
                              }
                              return null;
                            },
                            min: 0,
                            max: sS.length - 1,
                            onUpdate: n,
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex flex-1 flex-col gap-1.5",
                        children: [
                          (0, a.jsx)("label", {
                            className:
                              "text-label-12 select-none capitalize leading-4 opacity-60",
                            children: "Letter Spacing",
                          }),
                          (0, a.jsx)(sO, {
                            title: "Letter Spacing",
                            classNames: e,
                            breakpoint: d.info?.activeBreakpoint,
                            presets: sT,
                            icon: null,
                            prefix: "tracking",
                            defaultValue: 2,
                            step: 0.01,
                            allowNegative: !0,
                            generate: (e, t) =>
                              `${e}-${"number" == typeof t ? sL[t] : `[${t}]`}`,
                            match: (e) => {
                              let t = e.match(/^tracking-(.+)$/);
                              if (t && t[1]) {
                                let e = sL.indexOf(t[1]);
                                if (-1 !== e) return ["tracking", e];
                                if (t[1].startsWith("[") && t[1].endsWith("]"))
                                  return ["tracking", t[1].slice(1, -1)];
                              }
                              return null;
                            },
                            min: 0,
                            max: sL.length - 1,
                            onUpdate: n,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex w-full flex-wrap gap-3",
                    children: [
                      (0, a.jsx)(s$, {
                        title: "Alignment",
                        onUpdate: n,
                        classNames: e,
                        breakpoint: d.info?.activeBreakpoint,
                        options: [
                          {
                            display: (0, a.jsx)(tR.Undo, {
                              className: "opacity-50",
                            }),
                            value: "",
                            fallback: !0,
                            title: "Reset",
                          },
                          {
                            display: (0, a.jsx)(ts.AlignmentLeft, {}),
                            value: "text-left",
                            title: "Align Left",
                          },
                          {
                            display: (0, a.jsx)(ti, {}),
                            value: "text-center",
                            title: "Align Center",
                          },
                          {
                            display: (0, a.jsx)(ta, {}),
                            value: "text-right",
                            title: "Align Right",
                          },
                          {
                            display: (0, a.jsx)(tl, {}),
                            value: "text-justify",
                            title: "Justify",
                          },
                        ],
                      }),
                      (0, a.jsx)(sF, {
                        title: "Decoration",
                        onUpdate: n,
                        classNames: e,
                        breakpoint: d.info?.activeBreakpoint,
                        options: [
                          {
                            display: (0, a.jsx)(te, {}),
                            value: "italic",
                            title: "Italic",
                          },
                          {
                            display: (0, a.jsx)(tt, {}),
                            value: "line-through",
                            title: "Strikethrough",
                            conflict: ["underline", "overline"],
                          },
                          {
                            display: (0, a.jsx)(tR.TextUnderline, {}),
                            value: "underline",
                            title: "Underline",
                            conflict: ["line-through", "overline"],
                          },
                          {
                            display: (0, a.jsx)(tR.TextOverline, {}),
                            value: "overline",
                            title: "Overline",
                            conflict: ["line-through", "underline"],
                          },
                          {
                            display: (0, a.jsx)(tR.TextTabularNumbers, {}),
                            value: "tabular-nums",
                            title: "Tabular Numbers",
                          },
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          (0, a.jsx)(sw, {
            title: "Color",
            children: (0, a.jsx)(sU, {
              title: "Color",
              fallback: !0,
              onUpdate: n,
              classNames: e,
              computedColor: d.info?.color,
              tokens: v,
              prefix: "text-",
              match: (e) => {
                if (!e.startsWith("text-")) return null;
                let t = e.slice(5);
                return (/\/\d+$/.test(t) &&
                  (t = t.slice(0, t.lastIndexOf("/"))),
                sP.includes(t) ||
                  v?.[t] ||
                  (t && /^[a-z]+-(|1|2|3|4|5|6|7|8|9)(00|50)$/.test(t)) ||
                  (t && t.startsWith("[rgb")))
                  ? e
                  : null;
              },
            }),
          }),
          (0, a.jsx)(sw, {
            title: "Background",
            children: (0, a.jsx)("div", {
              className: "flex w-full gap-3",
              children: (0, a.jsx)(sU, {
                title: "Background Color",
                fallback: !0,
                onUpdate: n,
                classNames: e,
                computedColor: d.info?.backgroundColor,
                tokens: v,
                prefix: "bg-",
                match: (e) => {
                  if (!e.startsWith("bg-")) return null;
                  let t = e.slice(3);
                  return (/\/\d+$/.test(t) &&
                    (t = t.slice(0, t.lastIndexOf("/"))),
                  sP.includes(t) ||
                    v?.[t] ||
                    (t && /^[a-z]+-(|1|2|3|4|5|6|7|8|9)(00|50)$/.test(t)) ||
                    (t && t.startsWith("[rgb")))
                    ? e
                    : null;
                },
              }),
            }),
          }),
          (0, a.jsxs)(sw, {
            title: "Layout",
            children: [
              t.flex
                ? (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsx)("div", {
                        className: "flex w-full gap-3",
                        children: (0, a.jsx)(s$, {
                          title: "Direction",
                          onUpdate: n,
                          classNames: e,
                          breakpoint: d.info?.activeBreakpoint,
                          options: [
                            {
                              display: (0, a.jsx)(tn.ArrowLeftRight, {}),
                              value: "flex-row",
                              title: "Row",
                              fallback: !0,
                            },
                            {
                              display: (0, a.jsx)(tr, {}),
                              title: "Column",
                              value: "flex-col",
                            },
                          ],
                        }),
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex w-full flex-wrap gap-3",
                        children: [
                          (0, a.jsx)("div", {
                            className: "flex-1",
                            children: (0, a.jsx)(s$, {
                              title: "Alignment",
                              showTitle: !0,
                              onUpdate: n,
                              classNames: e,
                              breakpoint: d.info?.activeBreakpoint,
                              options: [
                                {
                                  display: t.flexColumn
                                    ? (0, a.jsx)(tR.AlignColStretch, {})
                                    : (0, a.jsx)(tR.AlignRowStretch, {}),
                                  value: "items-stretch",
                                  title: "Align Stretch",
                                  fallback: !0,
                                },
                                {
                                  display: t.flexColumn
                                    ? (0, a.jsx)(tR.AlignColStart, {})
                                    : (0, a.jsx)(tR.AlignRowStart, {}),
                                  value: "items-start",
                                  title: "Align Start",
                                },
                                {
                                  display: t.flexColumn
                                    ? (0, a.jsx)(tR.AlignColCenter, {})
                                    : (0, a.jsx)(tR.AlignRowCenter, {}),
                                  value: "items-center",
                                  title: "Align Center",
                                },
                                {
                                  display: t.flexColumn
                                    ? (0, a.jsx)(tR.AlignColEnd, {})
                                    : (0, a.jsx)(tR.AlignRowEnd, {}),
                                  value: "items-end",
                                  title: "Align End",
                                },
                              ],
                            }),
                          }),
                          (0, a.jsx)("div", {
                            className: "flex-1",
                            children: (0, a.jsx)(s$, {
                              title: "Justification",
                              showTitle: !0,
                              type: "dropdown",
                              onUpdate: n,
                              classNames: e,
                              breakpoint: d.info?.activeBreakpoint,
                              options: [
                                {
                                  display: "Start",
                                  value: "justify-start",
                                  title: "Justify Start",
                                  fallback: !0,
                                },
                                {
                                  display: "Center",
                                  value: "justify-center",
                                  title: "Justify Center",
                                },
                                {
                                  display: "End",
                                  value: "justify-end",
                                  title: "Justify End",
                                },
                                {
                                  display: "Space Between",
                                  value: "justify-between",
                                  title: "Justify Space Between",
                                },
                                {
                                  display: "Space Around",
                                  value: "justify-around",
                                  title: "Justify Space Around",
                                },
                                {
                                  display: "Space Evenly",
                                  value: "justify-evenly",
                                  title: "Justify Space Evenly",
                                },
                                {
                                  display: "Stretch",
                                  value: "justify-stretch",
                                  title: "Justify Stretch",
                                },
                              ],
                            }),
                          }),
                        ],
                      }),
                      t.showGap
                        ? (0, a.jsx)(sB, {
                            title: "Gap",
                            showTitle: !0,
                            allowIconSliding: !0,
                            classNames: e,
                            breakpoint: d.info?.activeBreakpoint,
                            prefix: "gap",
                            ...(t.flexColumn
                              ? { prefixY: "gap-y" }
                              : { prefixX: "gap-x" }),
                            icon: t.flexColumn
                              ? (0, a.jsx)(tR.GapY, {})
                              : (0, a.jsx)(tR.GapX, {}),
                            generate: (e, t) =>
                              `${e}-${"number" == typeof t ? sE[t] : `[${t}]`}`,
                            match: (e) => {
                              let t = e.match(
                                /^(gap|gap-x|gap-y|gap-t|gap-r|gap-b|gap-l)-([^-]+)$/,
                              );
                              if (t && t[1] && t[2]) {
                                let e = t[1],
                                  n = sE.indexOf(t[2]);
                                if (-1 !== n) return [e, n];
                                if (t[2].startsWith("[") && t[2].endsWith("]"))
                                  return [e, t[2].slice(1, -1)];
                              }
                              return null;
                            },
                            min: 0,
                            max: sE.length - 1,
                            onUpdate: n,
                          })
                        : (0, a.jsx)(sB, {
                            title: "Gap",
                            showTitle: !0,
                            classNames: e,
                            breakpoint: d.info?.activeBreakpoint,
                            prefix: t.flexColumn ? "space-y" : "space-x",
                            icon: t.flexColumn
                              ? (0, a.jsx)(tR.GapY, {})
                              : (0, a.jsx)(tR.GapX, {}),
                            generate: (e, t) =>
                              `${e}-${"number" == typeof t ? sE[t] : `[${t}]`}`,
                            match: (e) => {
                              let t = e.match(/^(space-x|space-y)-([^-]+)$/);
                              if (t && t[1] && t[2]) {
                                let e = t[1],
                                  n = sE.indexOf(t[2]);
                                if (-1 !== n) return [e, n];
                                if (t[2].startsWith("[") && t[2].endsWith("]"))
                                  return [e, t[2].slice(1, -1)];
                              }
                              return null;
                            },
                            min: 0,
                            max: sE.length - 1,
                            onUpdate: n,
                          }),
                    ],
                  })
                : (0, a.jsx)(a.Fragment, {
                    children: t.showGap
                      ? (0, a.jsx)(sB, {
                          title: "Gap",
                          showTitle: !0,
                          allowIconSliding: !0,
                          classNames: e,
                          breakpoint: d.info?.activeBreakpoint,
                          prefix: "gap",
                          ...(t.flexColumn
                            ? { prefixY: "gap-y" }
                            : { prefixX: "gap-x" }),
                          icon: t.flexColumn
                            ? (0, a.jsx)(tR.GapY, {})
                            : (0, a.jsx)(tR.GapX, {}),
                          generate: (e, t) =>
                            `${e}-${"number" == typeof t ? sE[t] : `[${t}]`}`,
                          match: (e) => {
                            let t = e.match(
                              /^(gap|gap-x|gap-y|gap-t|gap-r|gap-b|gap-l)-([^-]+)$/,
                            );
                            if (t && t[1] && t[2]) {
                              let e = t[1],
                                n = sE.indexOf(t[2]);
                              if (-1 !== n) return [e, n];
                              if (t[2].startsWith("[") && t[2].endsWith("]"))
                                return [e, t[2].slice(1, -1)];
                            }
                            return null;
                          },
                          min: 0,
                          max: sE.length - 1,
                          onUpdate: n,
                        })
                      : t.space
                        ? (0, a.jsx)(sB, {
                            title: "Gap",
                            showTitle: !0,
                            classNames: e,
                            breakpoint: d.info?.activeBreakpoint,
                            prefix: "space",
                            prefixX: "space-x",
                            prefixY: "space-y",
                            icon: (0, a.jsx)(tR.GapX, {}),
                            iconX: (0, a.jsx)(tR.GapX, {}),
                            iconY: (0, a.jsx)(tR.GapY, {}),
                            allowIconSliding: !0,
                            generate: (e, t) =>
                              `${e}-${"number" == typeof t ? sE[t] : `[${t}]`}`,
                            match: (e) => {
                              let t = e.match(/^(space-x|space-y)-([^-]+)$/);
                              if (t && t[1] && t[2]) {
                                let e = t[1],
                                  n = sE.indexOf(t[2]);
                                if (-1 !== n) return [e, n];
                                if (t[2].startsWith("[") && t[2].endsWith("]"))
                                  return [e, t[2].slice(1, -1)];
                              }
                              return null;
                            },
                            min: 0,
                            max: sE.length - 1,
                            onUpdate: n,
                          })
                        : null,
                  }),
              (0, a.jsx)(sB, {
                title: "Margin",
                showTitle: !0,
                classNames: e,
                breakpoint: d.info?.activeBreakpoint,
                allowNegative: !0,
                prefix: "m",
                prefixX: "mx",
                prefixY: "my",
                prefixT: "mt",
                prefixR: "mr",
                prefixB: "mb",
                prefixL: "ml",
                iconX: (0, a.jsx)(tR.MarginX, {}),
                iconY: (0, a.jsx)(tR.MarginY, {}),
                iconT: (0, a.jsx)(tR.MarginTop, {}),
                iconR: (0, a.jsx)(tR.MarginRight, {}),
                iconB: (0, a.jsx)(tR.MarginBottom, {}),
                iconL: (0, a.jsx)(tR.MarginLeft, {}),
                presets: sA,
                generate: (e, t) =>
                  `${e}-${"number" == typeof t ? sA[t][0] : `[${t}]`}`,
                match: (e) => {
                  let t = e.match(/^(m|mx|my|mt|mr|mb|ml)-(.+)$/);
                  if (t && t[1] && t[2]) {
                    let e = t[1],
                      n = sA.findIndex(([e]) => e === t[2]);
                    if (-1 !== n) return [e, n];
                    if (t[2].startsWith("[") && t[2].endsWith("]"))
                      return [e, t[2].slice(1, -1)];
                  }
                  return null;
                },
                min: 0,
                allowIconSliding: !0,
                max: sA.length - 1,
                onUpdate: n,
              }),
              (0, a.jsx)(sB, {
                title: "Padding",
                showTitle: !0,
                classNames: e,
                breakpoint: d.info?.activeBreakpoint,
                prefix: "p",
                prefixX: "px",
                prefixY: "py",
                prefixT: "pt",
                prefixR: "pr",
                prefixB: "pb",
                prefixL: "pl",
                iconX: (0, a.jsx)(tR.PaddingX, {}),
                iconY: (0, a.jsx)(tR.PaddingY, {}),
                iconT: (0, a.jsx)(tR.PaddingTop, {}),
                iconR: (0, a.jsx)(tR.PaddingRight, {}),
                iconB: (0, a.jsx)(tR.PaddingBottom, {}),
                iconL: (0, a.jsx)(tR.PaddingLeft, {}),
                allowIconSliding: !0,
                generate: (e, t) =>
                  `${e}-${"number" == typeof t ? sE[t] : `[${t}]`}`,
                match: (e) => {
                  let t = e.match(/^(p|px|py|pt|pr|pb|pl)-([^-]+)$/);
                  if (t && t[1] && t[2]) {
                    let e = t[1],
                      n = sE.indexOf(t[2]);
                    if (-1 !== n) return [e, n];
                    if (t[2].startsWith("[") && t[2].endsWith("]"))
                      return [e, t[2].slice(1, -1)];
                  }
                  return null;
                },
                min: 0,
                max: sE.length - 1,
                onUpdate: n,
              }),
            ],
          }),
          k
            ? (0, a.jsx)(sw, {
                title: "Size",
                children: (0, a.jsx)("div", {
                  className: "flex w-full gap-3",
                  children: (0, a.jsx)(sB, {
                    title: "Size",
                    classNames: e,
                    breakpoint: d.info?.activeBreakpoint,
                    presets: sR,
                    prefix: "size",
                    prefixX: "w",
                    prefixY: "h",
                    defaultValue: "auto",
                    iconX: (0, a.jsx)(tn.ArrowLeftRight, {}),
                    iconY: (0, a.jsx)(tn.ArrowLeftRight, {
                      className: "rotate-90",
                    }),
                    generate: (e, t) =>
                      `${e}-${"number" == typeof t ? sR[t][0] : `[${t}]`}`,
                    allowIconSliding: !0,
                    match: (e) => {
                      let t = e.match(/^(size|w|h)-([^-]+)$/);
                      if (t) {
                        let e = t[1],
                          n = sR.findIndex(([e]) => e === t[2]);
                        if (-1 !== n) return [e, n];
                        if (t[2].startsWith("[") && t[2].endsWith("]"))
                          return [e, t[2].slice(1, -1)];
                      }
                      return null;
                    },
                    min: 0,
                    max: sR.length - 1,
                    onUpdate: n,
                  }),
                }),
              })
            : null,
          (0, a.jsxs)(sw, {
            title: "Border",
            children: [
              (0, a.jsxs)("div", {
                className: "flex w-full gap-3",
                children: [
                  (0, a.jsx)(sU, {
                    title: "Border Color",
                    fallback: !0,
                    onUpdate: n,
                    classNames: e,
                    computedColor: d.info?.borderColor,
                    tokens: v,
                    prefix: "border-",
                    match: (e) => {
                      if (!e.startsWith("border-")) return null;
                      let t = e.slice(7);
                      return (/\/\d+$/.test(t) &&
                        (t = t.slice(0, t.lastIndexOf("/"))),
                      sP.includes(t) ||
                        v?.[t] ||
                        (t && /^[a-z]+-(|1|2|3|4|5|6|7|8|9)(00|50)$/.test(t)) ||
                        (t && t.startsWith("[rgba")))
                        ? e
                        : null;
                    },
                  }),
                  (0, a.jsx)(s$, {
                    title: "Border Style",
                    onUpdate: n,
                    classNames: e,
                    breakpoint: d.info?.activeBreakpoint,
                    type: "dropdown",
                    options: [
                      {
                        display: (0, a.jsx)("span", {
                          className: "text-v0-gray-900",
                          children: "Default",
                        }),
                        value: "",
                        fallback: !0,
                      },
                      { display: "None", value: "border-none" },
                      { display: "Solid", value: "border-solid" },
                      { display: "Dashed", value: "border-dashed" },
                      { display: "Dotted", value: "border-dotted" },
                      { display: "Double", value: "border-double" },
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(sB, {
                title: "Border Width",
                classNames: e,
                breakpoint: d.info?.activeBreakpoint,
                presets: sM,
                prefix: "border",
                prefixT: "border-t",
                prefixR: "border-r",
                prefixB: "border-b",
                prefixL: "border-l",
                icon: (0, a.jsx)(tR.BorderWeight, {}),
                iconT: (0, a.jsx)(tR.BorderTop, {}),
                iconR: (0, a.jsx)(tR.BorderRight, {}),
                iconB: (0, a.jsx)(tR.BorderBottom, {}),
                iconL: (0, a.jsx)(tR.BorderLeft, {}),
                allowIconSliding: !0,
                generate: (e, t) =>
                  "number" == typeof t
                    ? sN[t]
                      ? `${e}-${sN[t]}`
                      : e
                    : `${e}-[${t}]`,
                match: (e) => {
                  let t = e.match(
                    /^(border|border-t|border-r|border-b|border-l)-([^-]+)$/,
                  );
                  if (t) {
                    let e = t[1],
                      n = sN.indexOf(t[2]);
                    if (-1 !== n) return [e, n];
                    if (t[2].startsWith("[") && t[2].endsWith("]"))
                      return [e, t[2].slice(1, -1)];
                  }
                  let n = e.match(
                    /^(border|border-t|border-r|border-b|border-l)$/,
                  );
                  if (n) {
                    let e = n[1],
                      t = sN.indexOf("");
                    if (-1 !== t) return [e, t];
                  }
                  return null;
                },
                min: 0,
                max: sN.length - 1,
                onUpdate: n,
              }),
            ],
          }),
          (0, a.jsx)(sw, {
            title: "Appearance",
            children: (0, a.jsxs)("div", {
              className: "flex w-full flex-wrap gap-3",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex flex-1 flex-col gap-1.5",
                  children: [
                    (0, a.jsx)("label", {
                      className:
                        "text-label-12 select-none capitalize leading-4 opacity-60",
                      children: "Opacity",
                    }),
                    (0, a.jsx)(sO, {
                      title: "Opacity",
                      classNames: e,
                      breakpoint: d.info?.activeBreakpoint,
                      prefix: "opacity",
                      defaultValue: 100,
                      step: 1,
                      presets: sV,
                      icon: (0, a.jsx)(e8, {}),
                      suffix: (0, a.jsx)("span", {
                        className: "text-sm text-v0-gray-900",
                        children: "%",
                      }),
                      generate: (e, t) => {
                        if (0 === t) return "opacity-0";
                        if ("number" == typeof t) return `opacity-${5 * t}`;
                        let n = parseFloat(t);
                        return isNaN(n) || n < 0 || n > 100
                          ? null
                          : `opacity-[${n < 1 ? n : n / 100}]`;
                      },
                      match: (e) => {
                        let t = e.match(/^opacity-\[?([.0-9]+)\]?$/);
                        if (t) {
                          let e = Number(t[1]);
                          return [
                            "opacity",
                            String(e < 1 ? Math.floor(100 * e) : e),
                          ];
                        }
                        return null;
                      },
                      min: 0,
                      max: 100,
                      onUpdate: n,
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "flex flex-1 flex-col gap-1.5",
                  children: [
                    (0, a.jsx)("label", {
                      className:
                        "text-label-12 select-none capitalize leading-4 opacity-60",
                      children: "Radius",
                    }),
                    (0, a.jsx)(s$, {
                      title: "Border Radius",
                      onUpdate: n,
                      classNames: e,
                      breakpoint: d.info?.activeBreakpoint,
                      icon: (0, a.jsx)(tR.Radius, {}),
                      type: "dropdown",
                      match: (e) =>
                        /^rounded-\[[\d.]+(px|em|rem|pt|%)\]$/.test(e),
                      options:
                        3 === b
                          ? [
                              {
                                display: (0, a.jsx)("span", {
                                  className: "text-v0-gray-900",
                                  children: "Default",
                                }),
                                value: "",
                                fallback: !0,
                              },
                              { display: "None", value: "rounded-none" },
                              { display: "Small", value: "rounded-sm" },
                              { display: "Normal", value: "rounded" },
                              { display: "Medium", value: "rounded-md" },
                              { display: "Large", value: "rounded-lg" },
                              { display: "Extra Large", value: "rounded-xl" },
                              {
                                display: "Double Extra Large",
                                value: "rounded-2xl",
                              },
                              {
                                display: "Triple Extra Large",
                                value: "rounded-3xl",
                              },
                              { display: "Full", value: "rounded-full" },
                            ]
                          : [
                              {
                                display: (0, a.jsx)("span", {
                                  className: "text-v0-gray-900",
                                  children: "Default",
                                }),
                                value: "",
                                fallback: !0,
                              },
                              { display: "None", value: "rounded-none" },
                              { display: "Extra Small", value: "rounded-xs" },
                              { display: "Small", value: "rounded-sm" },
                              { display: "Medium", value: "rounded-md" },
                              { display: "Large", value: "rounded-lg" },
                              { display: "Extra Large", value: "rounded-xl" },
                              {
                                display: "Double Extra Large",
                                value: "rounded-2xl",
                              },
                              {
                                display: "Triple Extra Large",
                                value: "rounded-3xl",
                              },
                              {
                                display: "Quadruple Extra Large",
                                value: "rounded-4xl",
                              },
                              { display: "Full", value: "rounded-full" },
                            ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, a.jsx)(sw, {
            title: "Shadow",
            children: (0, a.jsx)(s$, {
              title: "Shadow",
              onUpdate: n,
              classNames: e,
              breakpoint: d.info?.activeBreakpoint,
              icon: (0, a.jsx)(tR.Shadow, {}),
              type: "dropdown",
              options:
                3 === b
                  ? [
                      {
                        display: (0, a.jsx)("span", {
                          className: "text-v0-gray-900",
                          children: "Default",
                        }),
                        value: "",
                        fallback: !0,
                      },
                      { display: "None", value: "shadow-none" },
                      { display: "Small", value: "shadow-sm" },
                      { display: "Normal", value: "shadow" },
                      { display: "Medium", value: "shadow-md" },
                      { display: "Large", value: "shadow-lg" },
                      { display: "Extra Large", value: "shadow-xl" },
                      { display: "Double Extra Large", value: "shadow-2xl" },
                      { display: "Inner", value: "shadow-inner" },
                    ]
                  : [
                      {
                        display: (0, a.jsx)("span", {
                          className: "text-v0-gray-900",
                          children: "Default",
                        }),
                        value: "",
                        fallback: !0,
                      },
                      { display: "None", value: "shadow-none" },
                      { display: "Extra Small", value: "shadow-xs" },
                      { display: "Small", value: "shadow-sm" },
                      { display: "Normal", value: "shadow" },
                      { display: "Medium", value: "shadow-md" },
                      { display: "Large", value: "shadow-lg" },
                      { display: "Extra Large", value: "shadow-xl" },
                    ],
            }),
          }),
        ],
      });
    }
    var sY = e.i(127169);
    function sK() {
      let { actions: e } = (0, e5.useCurrentBlockDesignMode)(),
        {
          pushUndoHistory: t,
          popUndoHistory: n,
          popRedoHistory: r,
          clearHistory: s,
        } = e,
        i = (0, o.useCallback)(
          (e, n) => {
            eX.designModeInlineEditRef.current &&
              (n ||
                "string" ==
                  typeof (n =
                    eX.designModeInlineEditRef.current.getContent(e))) &&
              t(e, n);
          },
          [t],
        );
      return (
        (0, tI.useEventListener)("dm-undo", () =>
          n(eX.designModeInlineEditRef),
        ),
        (0, tI.useEventListener)("dm-redo", () =>
          r(eX.designModeInlineEditRef),
        ),
        (0, sY.useShortcut)((e) => {
          (e.metaKey || e.ctrlKey) &&
            ("z" !== e.key || e.shiftKey
              ? ("y" === e.key || ("z" === e.key && e.shiftKey)) &&
                (e.preventDefault(), r(eX.designModeInlineEditRef))
              : (e.preventDefault(), n(eX.designModeInlineEditRef)));
        }),
        {
          pushHistory: i,
          performUndo: () => n(eX.designModeInlineEditRef),
          performRedo: () => r(eX.designModeInlineEditRef),
          clearHistory: s,
        }
      );
    }
    var sJ = e.i(393799);
    function sQ() {
      let { atoms: e, actions: t } = (0, e5.useCurrentBlockDesignMode)(),
        { setLastFileContent: n, setSaveNextState: r, setLastIsPreview: s } = t,
        i = (0, sJ.useAtomValue)(e.currentQueue),
        a = (0, sJ.useAtomValue)(e.lastFileContent),
        l = (0, sJ.useAtomValue)(e.saveNextState),
        c = (0, sJ.useAtomValue)(e.lastIsPreview);
      return {
        queueVersion: (0, o.useCallback)(
          (e, t, n) => {
            (0 !== i.current.length || n()) &&
              (i.current[i.current.length - 1]?.[0] === e
                ? (i.current = [...i.current.slice(0, -1), [e, t, n]])
                : (i.current = [...i.current, [e, t, n]]));
          },
          [i],
        ),
        lastFileContent: a,
        saveNextState: l,
        lastIsPreview: c,
        currentQueue: i,
        setLastFileContent: n,
        setSaveNextState: r,
        setLastIsPreview: s,
      };
    }
    var s0 = e.i(577745),
      s1 = e.i(926224),
      s2 = e.i(602544),
      s5 = e.i(67914),
      s3 = e.i(974980);
    e.i(472428);
    var s4 = e.i(542245),
      s6 = (0, T.createServerReference)(
        "7f721bbdb26929f62f9462e6f94fdbfd38f650e7ca",
        T.callServer,
        void 0,
        T.findSourceMapURL,
        "applyDesignSystemRegistry",
      ),
      s7 = e.i(455552),
      s9 = e.i(204575),
      s8 = e.i(476371),
      ie = e.i(276221);
    function it(e) {
      return e.replace(/\s+/g, " ").trim();
    }
    var ir = e.i(671908);
    let is = ["app/layout.tsx", "src/app/layout.tsx"];
    function ii(e) {
      for (let t of is) if (e.some((e) => e.meta.file === t)) return t;
      return "app/layout.tsx";
    }
    function ia(e) {
      if (!e) return null;
      let t = ii(e);
      return e.find((e) => e.meta.file === t) ?? null;
    }
    let il = `import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={\`font-sans antialiased \${GeistSans.variable} \${GeistMono.variable}\`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

`,
      io = `import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={\`font-sans antialiased\`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

`,
      ic = /([\p{Ll}\d])(\p{Lu})/gu,
      id = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu,
      iu = /(\d)\p{Ll}|(\p{L})\d/u,
      ih = /[^\p{L}\d]+/giu,
      ip = "$1\0$2";
    function im(e) {
      let t = e.trim();
      t = (t = t.replace(ic, ip).replace(id, ip)).replace(ih, "\0");
      let n = 0,
        r = t.length;
      for (; "\0" === t.charAt(n); ) n++;
      if (n === r) return [];
      for (; "\0" === t.charAt(r - 1); ) r--;
      return t.slice(n, r).split(/\0/g);
    }
    function ig(e) {
      let t = im(e);
      for (let e = 0; e < t.length; e++) {
        let n = t[e],
          r = iu.exec(n);
        if (r) {
          let s = r.index + (r[1] ?? r[2]).length;
          t.splice(e, 1, n.slice(0, s), n.slice(s));
        }
      }
      return t;
    }
    function ix(e, t) {
      var n, r;
      let [s, i, a] = ij(e, t),
        l = iv(t?.locale),
        o = ib(t?.locale),
        c = t?.mergeAmbiguousCharacters
          ? iy(l, o)
          : ((n = l),
            (r = o),
            (e, t) => {
              let s = e[0];
              return (
                (t > 0 && s >= "0" && s <= "9" ? "_" + s : r(s)) + n(e.slice(1))
              );
            });
      return (
        s +
        i.map((e, t) => (0 === t ? l(e) : c(e, t))).join(t?.delimiter ?? "") +
        a
      );
    }
    function iv(e) {
      return !1 === e ? (e) => e.toLowerCase() : (t) => t.toLocaleLowerCase(e);
    }
    function ib(e) {
      return !1 === e ? (e) => e.toUpperCase() : (t) => t.toLocaleUpperCase(e);
    }
    function iy(e, t) {
      return (n) => `${t(n[0])}${e(n.slice(1))}`;
    }
    function ij(e, t = {}) {
      let n = t.split ?? (t.separateNumbers ? ig : im),
        r = t.prefixCharacters ?? "",
        s = t.suffixCharacters ?? "",
        i = 0,
        a = e.length;
      for (; i < e.length; ) {
        let t = e.charAt(i);
        if (!r.includes(t)) break;
        i++;
      }
      for (; a > i; ) {
        let t = a - 1,
          n = e.charAt(t);
        if (!s.includes(n)) break;
        a = t;
      }
      return [e.slice(0, i), n(e.slice(i, a)), e.slice(a)];
    }
    var iC = e.i(567407),
      iw = e.i(952946),
      ik = e.i(137134);
    function iN(e, t, n) {
      if (e.split("\n").length < t) throw Error("Line out of bounds");
      let r = e.split("\n"),
        s = r[t];
      return ((r[t] = s + n), r.join("\n"));
    }
    function iM(e) {
      return e
        .replace(
          /(\n)?\/\/ Initialize fonts\n(?:\s*(?:const\s+\w+\s*=\s*)?V0_Font_[A-Za-z0-9_]+\([^)]*\)\s*\n*)+(?:\s*const\s+_v0_fontVariables\s*=\s*`[^`]*`\s*\n*)?/gs,
          "\n",
        )
        .replace(/(\n)?\/\/ Initialize fonts\n/g, "\n");
    }
    function iS(e) {
      return e.replace(/\n{3,}/g, "\n\n");
    }
    function iI(e, t) {
      if (0 === t.length) return e;
      let n = "_v0_fontVariables";
      return e.replace(/<body([^>]*?)>/s, (e, t) => {
        let r = -1,
          s = -1,
          i = !1,
          a = !1,
          l = "",
          o = t.match(/className\s*=\s*/);
        if (!o) return `<body${t} className={${n}}>`;
        let c = t.indexOf(o[0]),
          d = c + o[0].length;
        if ("{" === t[d]) {
          ((i = !0), (r = d));
          let e = 0,
            n = !1,
            a = "";
          for (let r = d; r < t.length; r++) {
            let i = t[r];
            if (n) i === a && "\\" !== t[r - 1] && ((n = !1), (a = ""));
            else if ('"' === i || "'" === i || "`" === i) ((n = !0), (a = i));
            else if ("{" === i) e++;
            else if ("}" === i && 0 == --e) {
              s = r + 1;
              break;
            }
          }
        } else if ('"' === t[d] || "'" === t[d]) {
          ((a = !0), (l = t[d]), (r = d));
          for (let e = d + 1; e < t.length; e++)
            if (t[e] === l && "\\" !== t[e - 1]) {
              s = e + 1;
              break;
            }
        }
        if (-1 === r || -1 === s) return `<body${t} className={${n}}>`;
        let u = t.slice(r, s),
          h = t.slice(0, c),
          p = t.slice(c + o[0].length + u.length);
        if (i) {
          let e = u.slice(1, -1);
          if (e.includes("_v0_fontVariables"));
          else {
            let t = e.trim();
            if ('""' === t || "''" === t) {
              let e = `className={${n}}`;
              return `<body${h}${e}${p}>`;
            }
            if (t.startsWith("`") && t.endsWith("`")) {
              let e = t.slice(1, -1),
                r = `className={\`${e} \${${n}}\`}`;
              return `<body${h}${r}${p}>`;
            }
            {
              let t = `className={${e} + " " + ${n}}`;
              return `<body${h}${t}${p}>`;
            }
          }
        } else if (a) {
          let e = u.slice(1, -1),
            t = e.trim() ? `className={\`${e} \${${n}}\`}` : `className={${n}}`;
          return `<body${h}${t}${p}>`;
        }
        return e;
      });
    }
    function iL({ layoutFile: e, styles: t, isNext14: n }) {
      if (
        !is.includes(e.meta.file) ||
        !iC.SHADCN_FONT_TOKENS.filter((e) => t.common[e]).length
      )
        return { content: e.source, changed: !1 };
      let r = (0, ik.getFontsToApply)(t);
      if (!r.length) return { content: e.source, changed: !1 };
      let s = (function (e) {
          let t = e.split("\n"),
            n = [];
          for (let e = 0; e < t.length; e++) {
            let r = t[e];
            if (!r) continue;
            let s = r.trim();
            if (
              !(!s || s.startsWith("//") || s.startsWith("/*")) &&
              s.startsWith("import ")
            ) {
              let r = e,
                i = s,
                a = e,
                l = t[e];
              if (!l) continue;
              let o = l.indexOf("import");
              if (
                !s.includes(";") &&
                !s.endsWith("}'") &&
                !s.endsWith('}"') &&
                !s.endsWith('"`') &&
                !s.endsWith("'") &&
                !s.endsWith('"')
              ) {
                let n = e + 1;
                for (; n < t.length; ) {
                  let r = t[n];
                  if (!r) {
                    n++;
                    continue;
                  }
                  let s = r.trim();
                  if (
                    ((i += " " + s),
                    (a = n),
                    s.includes(";") ||
                      s.endsWith("}'") ||
                      s.endsWith('}"') ||
                      s.endsWith('"`') ||
                      s.endsWith("'") ||
                      s.endsWith('"'))
                  ) {
                    e = n;
                    break;
                  }
                  n++;
                }
              }
              let c = t[a];
              if (!c) continue;
              let d = c.length;
              (r === a && (d = o + i.length),
                n.push({
                  import: i,
                  startLine: r,
                  endLine: a,
                  startIndex: o,
                  endIndex: d,
                }));
            }
          }
          return n;
        })(e.source),
        i = s.find((e) => e.import.includes("next/font/google")),
        a = e.source,
        l =
          i &&
          (function (e) {
            let t = /^import\s*\{([^}]*)\}\s*from\s*['"](.*)['"]$/,
              n = /^import\s*\*\s*as\s*([a-zA-Z0-9_$]+)\s*from\s*['"](.*)['"]$/,
              r = /^import\s+([a-zA-Z0-9_$]+)\s*from\s*['"](.*)['"]$/;
            if (t.test(e)) {
              let n = e.match(t)[1];
              return n
                ? {
                    type: "named",
                    names: n
                      .split(",")
                      .map((e) => e.trim())
                      .filter(Boolean)
                      .map((e) => {
                        let [t, n] = e.split(/\s+as\s+/).map((e) => e.trim());
                        return t
                          ? n
                            ? { name: t, alias: n }
                            : { name: t }
                          : null;
                      })
                      .filter((e) => null !== e),
                  }
                : { type: "none" };
            }
            if (n.test(e)) {
              let t = e.match(n)[1];
              return t
                ? { type: "namespace", names: { name: t } }
                : { type: "none" };
            }
            if (r.test(e)) {
              let t = e.match(r)[1];
              return t ? { type: "default", name: t } : { type: "none" };
            }
            return (/^import\s+['"](.*)['"]$/.test(e), { type: "none" });
          })(i.import);
      if (l && "named" === l.type) {
        let e = s[s.length - 1],
          t = e ? e.endLine : 0;
        a = (a = (a = iM(a)).replace(
          /const _geist = Geist\(\{[^}]*\}\);?\s*\n?/g,
          "",
        )).replace(/const _geistMono = Geist_Mono\(\{[^}]*\}\);?\s*\n?/g, "");
        let d = new Set();
        for (let e of l.names)
          if (e.alias && e.alias.startsWith("V0_Font_")) {
            var o, c;
            e.alias &&
              e.alias.startsWith("V0_Font_") &&
              ((o = a),
              (c = e.name),
              (a = o
                .replace(
                  RegExp(
                    `(^|\\n)[\\t ]*V0_Font_${c}\\([^)]*\\)[\\t ]*(?:\\n|$)`,
                    "g",
                  ),
                  "$1",
                )
                .replace(
                  RegExp(
                    `(^|\\n)[\\t ]*const\\s+\\w+\\s*=\\s*V0_Font_${c}\\([^)]*\\)[\\t ]*(?:\\n|$)`,
                    "g",
                  ),
                  "$1",
                )));
          } else {
            let t = "Geist" === e.name || "Geist_Mono" === e.name,
              n = r.includes(e.name);
            (!t || n) && d.add(e.name);
          }
        let u = new Set([...d, ...r.map((e) => `${e} as V0_Font_${e}`)]),
          h = `import { ${Array.from(u).join(", ")} } from 'next/font/google'
`,
          p = r
            .map(
              (e) =>
                `const _${ix(e)} = V0_Font_${e}({ subsets: ['latin'], weight: ${JSON.stringify((0, iw.getFontAvailableWeights)(e))}${n ? `, variable: '--v0-font-${e.toLowerCase().replace(/_/g, "-")}'` : ""} })`,
            )
            .join("\n"),
          m = n
            ? `
const _v0_fontVariables = \`${r.map((e) => `\${_${ix(e)}.variable}`).join(" ")}\``
            : "";
        return (
          (a = iS(
            (a = iN(
              (a = iM(
                (a = (function (e, t, n) {
                  let r = e.split("\n");
                  if (t.line === n.line) {
                    let s = r[t.line];
                    if (!s) return e;
                    let i = s.slice(0, t.index),
                      a = s.slice(n.index);
                    "" === i.trim() && "" === a.trim()
                      ? (r[t.line] = "")
                      : (r[t.line] = i + a);
                  } else {
                    let s = r[t.line],
                      i = r[n.line];
                    if (!s || !i) return e;
                    ((r[t.line] = s.slice(0, t.index) + i.slice(n.index)),
                      r.splice(t.line + 1, n.line - t.line),
                      r[t.line]?.trim() === "" && (r[t.line] = ""));
                  }
                  return r.join("\n");
                })(
                  a,
                  { line: i.startLine, index: i.startIndex },
                  { line: i.endLine, index: i.endIndex },
                )),
              )),
              t,
              "\n" + h + "\n// Initialize fonts\n" + p + m + "\n",
            )),
          )),
          n && (a = iI(a, r)),
          { content: a, changed: !0 }
        );
      }
      {
        let t = s[s.length - 1],
          i = 0;
        if (s.length > 0 && t) i = t.endLine;
        else {
          let t = e.source.split("\n"),
            n = t[0]?.trim() || "";
          i = n.startsWith('"use ') || n.startsWith("'use ") ? 1 : 0;
        }
        let l = `import { ${r.map((e) => `${e} as V0_Font_${e}`).join(", ")} } from 'next/font/google'
`,
          o = r
            .map(
              (e) =>
                `const _${ix(e)} = V0_Font_${e}({ subsets: ['latin'], weight: ${JSON.stringify((0, iw.getFontAvailableWeights)(e))}${n ? `, variable: '--v0-font-${e.toLowerCase().replace(/_/g, "-")}'` : ""} })`,
            )
            .join("\n"),
          c = n
            ? `
const _v0_fontVariables = \`${r.map((e) => `\${_${ix(e)}.variable}`).join(" ")}\``
            : "";
        return (
          (a = iS(
            (a = iN(
              (a = iM(a)),
              i,
              "\n" + l + "\n// Initialize fonts\n" + o + c + "\n\n",
            )),
          )),
          n && (a = iI(a, r)),
          { content: a, changed: !0 }
        );
      }
    }
    var iT = e.i(514989),
      iE = e.i(419403),
      i_ = e.i(387040),
      iA = e.i(22344);
    function iR({ chatId: e, designSystems: t }) {
      let n = (0, o.useMemo)(
          () => t.filter(iA.isDesignSystemWithRegistry),
          [t],
        ),
        [r, s] = (0, o.useState)(null),
        [i, a] = (0, o.useState)(null),
        [c, u] = (0, o.useState)(!1),
        h = (0, m.useActiveBlockState)(),
        { latestBlock: p } = (0, x.useBlockHistory)({
          blockId: h?.id,
          searchAll: !0,
        }),
        { actions: f } = (0, e5.useCurrentBlockDesignMode)(),
        { setPendingDesignSystem: g } = f,
        v = (0, d.useChatMetadata)(),
        b = (0, o.useMemo)(
          () => (0, iE.getNextVersionFromChatMetadata)(v),
          [v],
        ),
        y = (0, o.useCallback)(
          () =>
            h
              ? {
                  files:
                    "code-project" === h.type
                      ? (0, s1.parseMultiFileSource)({
                          source: h.source,
                          blockType: "code-project",
                          blockId: h.id,
                        })
                      : [],
                }
              : null,
          [h],
        ),
        j = (0, o.useCallback)(() => {
          if (!h) return null;
          let e =
            "code-project" === h.type
              ? (0, s1.parseMultiFileSource)({
                  source: h.source,
                  blockType: "code-project",
                  blockId: h.id,
                })
              : [];
          if (!e.length) return null;
          let t = {};
          for (let n of e) t[n.meta.file] = n.source;
          return t;
        }, [h]),
        C = (0, o.useMemo)(() => {
          let e = j();
          return !!e && 14 === (0, iE.detectNextVersion)(e, {}, b);
        }, [j, b]),
        w = (0, o.useCallback)(
          (e) => {
            if (!h) return null;
            let t = (0, ir.getGlobalsCssFromFiles)(e),
              n = ia(e),
              r = (0, ir.getGlobalsCssPathFromFiles)(e),
              s = ii(e),
              i = (0, s1.createNewFile)(
                (0, ie.createDefaultGlobals)(),
                r,
                "css",
                h.id,
              ),
              a = (0, s1.createNewFile)(
                (function ({ nextVersion: e }) {
                  return 14 === e ? il : io;
                })({ nextVersion: C ? 14 : 15 }),
                s,
                "typescriptreact",
                h.id,
              );
            return {
              rootLayout: n ?? a,
              globalsCss: t ?? i,
              existingGlobalsCssFile: t,
              existingLayoutFile: n,
              defaultGlobalsCssFile: i,
              defaultLayoutFile: a,
            };
          },
          [h, C],
        ),
        k = (0, o.useCallback)(
          (e) => (e ? n.find((t) => t.designSystemId === e)?.registry : null),
          [n],
        ),
        N = (0, o.useCallback)(
          (e, t) => {
            let n = k(t);
            return n
              ? iL({
                  layoutFile: e,
                  styles: (0, iT.getShadcnStyleFromRegistry)(n),
                  isNext14: C,
                })
              : null;
          },
          [k, C],
        ),
        M = (0, o.useCallback)(async () => {
          if (e && h && !c && !i) {
            u(!0);
            try {
              let t = y();
              if (!t) return;
              let { files: r } = t,
                s = w(r);
              if (!s) return;
              let { globalsCss: i } = s,
                l = [...n.map((e) => e.designSystemId), null].map(async (t) => {
                  try {
                    let e = {
                        designSystemId: t,
                        globalsCss: i.source,
                        isNext14: C,
                      },
                      n = await fetch("/api/design-systems/apply-registry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(e),
                      });
                    if (!n.ok) {
                      let e = await n.text();
                      throw Error(`Failed to apply design system: ${e}`);
                    }
                    let r = await n.json();
                    if (!r.ok) throw r.error;
                    return { id: t || "default", result: r };
                  } catch (n) {
                    return (
                      (0, L.track)("ApplyDesignSystemError", {
                        designSystemId: t,
                        chatId: e,
                        globalsCssContent: it(i.source),
                        error: `Failed to fetch design system registry: ${n instanceof Error ? n.message : "Request failed"}`,
                      }),
                      {
                        id: t || "default",
                        result: (0, i_.err)("Request failed"),
                      }
                    );
                  }
                }),
                o = await Promise.allSettled(l),
                c = {};
              (o.forEach((e) => {
                if ("fulfilled" === e.status) {
                  let { id: t, result: n } = e.value;
                  n.ok && (c[t] = n.value.data);
                }
              }),
                a(c));
            } catch (t) {
              (l.toast.error(
                "There was an error applying the design system. The team has been notified.",
              ),
                (0, L.track)("ApplyDesignSystemError", {
                  designSystemId: null,
                  chatId: e,
                  globalsCssContent: it(""),
                  error: `Failed to precompute globals with design systems: ${t instanceof Error ? t.message : "Unknown error"}`,
                }));
            } finally {
              u(!1);
            }
          }
        }, [e, h, c, i, y, w, n, C]);
      (0, o.useEffect)(() => {
        a(null);
      }, [h?.id]);
      let S = (0, o.useCallback)(
          ({ activeDesignSystemId: e, designSystemId: t }) => {
            if (!i || !h) return;
            let n = y();
            if (!n) return;
            let { files: r } = n,
              a = w(r);
            if (!a) return;
            let { rootLayout: l, globalsCss: o } = a,
              c = (0, s9.getBlockIframeId)(h.resultId || h.id),
              d = document.getElementById(c);
            if (!d) return;
            (0, e4.sendToIframeFromBlockId)(h.id, {
              type: "devtools_revert_design",
            });
            let u = i[t || "default"];
            if (!u) return;
            let p = N(l, t),
              m = { [o.meta.file]: u, [l.meta.file]: p?.content || l.source },
              f = (0, s7.getMultiFileSourceMap)(
                (0, s7.updateFilesInFileList)(m, r),
              );
            ((0, s8.updatePreviewImmediate)(d, f), s([e, t]));
          },
          [i, h, y, w, N],
        ),
        I = (0, o.useCallback)(
          async (t) => {
            if (!e || !h) return;
            let n = ({ trackError: n, uiError: r, globalsCss: s }) => {
                ((0, L.track)("ApplyDesignSystemError", {
                  designSystemId: t,
                  chatId: e,
                  globalsCssContent: it(s),
                  error: n,
                }),
                  l.toast.error(r));
              },
              r = (0, s9.getBlockIframeId)(h.resultId || h.id);
            if (!document.getElementById(r)) return;
            let i = y();
            if (!i)
              return void n({
                globalsCss: "",
                trackError:
                  "Failed to get files and globals CSS: No files found",
                uiError: "Failed to get files and globals CSS: No files found",
              });
            let { files: a } = i,
              o = w(a);
            if (!o)
              return void n({
                globalsCss: "",
                trackError: "Failed to prepare default files",
                uiError: "Failed to prepare default files",
              });
            let { globalsCss: c, rootLayout: d } = o,
              u = await s6({
                designSystemId: t,
                globalsCss: c.source,
                isNext14: C,
              });
            if (!u.ok)
              return void n({
                globalsCss: c.source,
                trackError: `Failed to apply design system registry: ${u.error instanceof Error ? u.error.message : "Unknown registry error"}`,
                uiError:
                  "There was an error applying the design system. The team has been notified.",
              });
            let m = u.value,
              f = N(d, t);
            if (eX.designModeInlineEditRef.current && c.meta.file) {
              let e = [
                { file: c.meta.file, value: m.data },
                ...(f?.changed
                  ? [{ file: d.meta.file, value: f.content }]
                  : []),
              ];
              eX.designModeInlineEditRef.current.bulkFileChange(e);
            }
            (g({ isPending: !0, designSystemId: t }),
              s(null),
              t &&
                (0, L.track)("ApplyDesignSystem", {
                  designSystemId: t,
                  latestBlockId: p?.id || null,
                }));
          },
          [e, h, y, w, N, g, p?.id, C],
        );
      return {
        preloadFontsInFrame: (0, o.useCallback)(() => {
          if (!h) return;
          let e = (0, s9.getBlockIframeId)(h.resultId || h.id);
          if (!document.getElementById(e)) return;
          let t = new Set();
          for (let e of n.map((e) =>
            (0, iT.getShadcnStyleFromRegistry)(e.registry),
          ))
            for (let n of (0, ik.getFontsToApply)(e)) t.add(n);
          for (let e of t)
            (0, e4.sendToIframeFromBlockId)(h.id, {
              type: "preload_google_font",
              fontId: e,
            });
        }, [h, n]),
        globalsCssWithDesignSystem: i,
        isPrecomputingGlobals: c,
        loadGlobalsWithDesignSystem: M,
        previewDesignSystem: S,
        revertPreview: r,
        setRevertPreview: s,
        applyDesignSystem: I,
      };
    }
    var iP = e.i(35863);
    let iD = ['@import "tailwindcss"', "@import 'tailwindcss'"];
    var iV = e.i(819969);
    function i$() {
      let e = (0, m.useActiveBlockState)(),
        { atoms: t } = (0, iV.useCurrentChat)(),
        n = (0, sJ.useAtomValue)(t.attributes),
        r = n.ok && n.value.tailwindV4Default;
      return {
        isTWv4: (0, o.useMemo)(() => {
          var t, n;
          if (e?.type !== "code-project") return !1;
          let s = (0, s1.parseMultiFileSource)({
              source: e.source,
              blockType: "code-project",
              blockId: e.id || "",
            }),
            i = {};
          for (let e of s) i[e.meta.file] = e.source;
          return (
            4 ===
            ((t = i),
            (n = { tailwindV4Default: r }),
            (function (e) {
              let t;
              if (!e) return;
              let n = e["package.json"];
              if (!n) return;
              try {
                t = JSON.parse(n);
              } catch {
                return;
              }
              let r = { ...t.devDependencies, ...t.dependencies }.tailwindcss;
              if ("string" == typeof r) {
                let e = (0, iP.getMajorVersionFromSemver)(r);
                if (4 === e) return 4;
                if (3 === e) return 3;
              }
            })(t) ??
              (function (e) {
                if (!e) return;
                let t = !1,
                  n = !1;
                for (let [r, s] of Object.entries(e)) {
                  if (!r.endsWith(".css")) continue;
                  let e = "string" == typeof s ? s : s.toString("utf-8");
                  if (iD.some((t) => e.includes(t))) {
                    t = !0;
                    break;
                  }
                  e.includes("@tailwind") && (n = !0);
                }
                return t ? 4 : n ? 3 : void 0;
              })(t) ??
              (function (e) {
                if (e && (e["tailwind.config.js"] || e["tailwind.config.ts"]))
                  return 3;
              })(t) ??
              (n.tailwindV4Default ? 4 : 3))
          );
        }, [r, e]),
      };
    }
    var iF = e.i(790288),
      iz = e.i(285945);
    function iH(e) {
      if (e.startsWith("var(--v0-font-") && e.endsWith(")")) {
        let t = e
          .slice(14, -1)
          .split("-")
          .map((e) => {
            let t = e.toLowerCase();
            return "pt" === t
              ? "PT"
              : "ibm" === t
                ? "IBM"
                : "dm" === t
                  ? "DM"
                  : "sc" === t
                    ? "SC"
                    : e.charAt(0).toUpperCase() + e.slice(1);
          })
          .join("_");
        return t && (0, iw.isGoogleFont)(t) ? t : void 0;
      }
      let t = e.split(",")[0].trim().replace(/['"]/g, "").replace(/ /g, "_");
      if (t && (0, iw.isGoogleFont)(t)) return t;
    }
    var iB = e.i(576949),
      iO = e.i(403055);
    function iU({ children: e, className: t = "" }) {
      return (0, a.jsx)("div", {
        className: (0, iO.cn)("border-v0-alpha-400 flex flex-col border-b", t),
        children: e,
      });
    }
    function iW({ children: e, action: t, onClick: n, className: r }) {
      return (0, a.jsxs)("div", {
        className: (0, iO.cn)(
          "flex items-center justify-between px-3 py-3",
          n && "cursor-pointer hover:text-v0-gray-1000 group",
          r,
        ),
        onClick: n,
        children: [
          (0, a.jsx)("p", {
            className: "text-label-12 select-none font-medium",
            children: e,
          }),
          t,
        ],
      });
    }
    function iZ() {
      return (0, a.jsxs)("div", {
        className: "flex items-center gap-1",
        children: [
          (0, a.jsx)("span", {
            className:
              "text-label-12 text-v0-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-v0-gray-1000 transition-all duration-150",
            children: "Edit",
          }),
          (0, a.jsx)(eF.ChevronRightSmall, {
            className:
              "size-4 text-v0-gray-700! group-hover:text-v0-gray-1000!",
          }),
        ],
      });
    }
    function iG({ title: e, onBack: t, action: n, className: r }) {
      return (0, a.jsxs)("div", {
        className: (0, iO.cn)(
          "border-v0-alpha-400 h-13 flex w-full items-center justify-between gap-3 border-b px-3 py-3",
          r,
        ),
        children: [
          (0, a.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, a.jsx)(D.Button, {
                size: "sm",
                variant: "ghost",
                onClick: t,
                className: "size-7 rounded-md p-0",
                children: (0, a.jsx)(iB.ArrowLeft, { className: "size-4" }),
              }),
              (0, a.jsx)("p", {
                className: "text-label-13 text-v0-gray-900 font-medium",
                children: e,
              }),
            ],
          }),
          n &&
            (0, a.jsx)("div", {
              className: "flex items-center gap-2",
              children: n,
            }),
        ],
      });
    }
    var iq = e.i(235009);
    function iX(e) {
      let { atoms: t } = (0, e5.useCurrentBlockDesignMode)(),
        n = (0, sJ.useAtomValue)(t.previewTheme);
      return Object.keys(e[n]).length > 0
        ? e[n]
        : Object.keys(e.light).length > 0
          ? e.light
          : {};
    }
    function iY({ globalsFile: e, fontType: t, fontId: n, isNext14: r }) {
      let s = `--font-${t}`,
        i = n.replace(/_/g, " "),
        a = r
          ? `var(--v0-font-${n.toLowerCase().replace(/_/g, "-")})`
          : `'${i}', '${i} Fallback'`,
        l = e,
        o = !1,
        c = l.match(/@theme inline\s*\{([^}]+)\}/s);
      if (c) {
        let e = (function (e, t, n, r) {
          let s = t[1];
          if (!s) return { updatedContent: e, changed: !1 };
          let i = RegExp(`\\s*${n}:[^;]+;`, "g");
          if (s.includes(n)) {
            let t = s.replace(
              i,
              `
  ${n}: ${r};`,
            );
            return { updatedContent: e.replace(s, t), changed: !0 };
          }
          {
            let t =
              s.trimEnd() +
              `
  ${n}: ${r};`;
            return { updatedContent: e.replace(s, t), changed: !0 };
          }
        })(l, c, s, a);
        ((l = e.updatedContent), (o = e.changed || o));
      } else {
        let e = `
@theme inline {
  ${s}: ${a};
}
`;
        ((l = l.trimEnd() + e), (o = !0));
      }
      return { content: l, changed: o };
    }
    var iK = e.i(982835),
      iJ = e.i(616216);
    function iQ({ onClick: e }) {
      return (0, a.jsx)("div", {
        className:
          "border-b border-v0-gray-200 bg-v0-blue-300 p-3 text-v0-blue-900 mb-4 rounded-md",
        children: (0, a.jsxs)("div", {
          className: "flex-1 min-w-0",
          children: [
            (0, a.jsx)("div", {
              className: "text-sm font-medium mb-1",
              children: "No Default Font",
            }),
            (0, a.jsx)("div", {
              className: "text-sm mb-3",
              children:
                "This generation does not have a default font. Add one to switch font families.",
            }),
            (0, a.jsxs)(D.Button, {
              size: "sm",
              variant: "ghost",
              className:
                "h-7 rounded-md px-2 hover:bg-v0-alpha-500 focus-visible:bg-v0-alpha-500 border-transparent bg-v0-alpha-200 text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-v0-alpha-200 disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-v0-alpha-200 aria-disabled:text-v0-gray-500",
              onClick: e,
              children: [
                (0, a.jsx)("span", { children: "Fix with " }),
                (0, a.jsx)(iJ.V0LoadableLogo, {}),
              ],
            }),
          ],
        }),
      });
    }
    let i0 = { sans: "font-sans", serif: "font-serif", mono: "font-mono" },
      i1 = { "font-sans": "sans", "font-serif": "serif", "font-mono": "mono" },
      i2 = (0, o.createContext)(null);
    function i5({ onClick: e }) {
      let t = (0, o.useContext)(i2);
      if (!t)
        return (0, a.jsxs)(iU, {
          children: [
            (0, a.jsx)(iW, {
              onClick: e,
              className: "group",
              action: (0, a.jsx)(iZ, {}),
              children: "Fonts",
            }),
            (0, a.jsx)("div", {
              className: "px-3 pb-3",
              children: (0, a.jsx)("button", {
                className:
                  "w-full hover:brightness-90 dark:hover:brightness-110 transition-all duration-150",
                onClick: e,
                children: (0, a.jsx)("div", {
                  className:
                    "w-full flex rounded-md overflow-hidden h-8 border border-v0-alpha-400 bg-v0-background-100 items-center justify-center text-v0-gray-900 text-xs",
                  children: "System Font",
                }),
              }),
            }),
          ],
        });
      let {
          activeFontId: n,
          changeActiveFont: r,
          designTokensLoaded: s,
          hasActiveFont: i,
        } = t,
        l = n ? (0, iw.fontIdToName)(n) : "Default";
      return (0, a.jsxs)(iU, {
        children: [
          (0, a.jsx)(iW, {
            onClick: e,
            className: "group",
            action: (0, a.jsx)(iZ, {}),
            children: "Fonts",
          }),
          (0, a.jsx)("div", {
            className: "px-3 pb-3",
            children: (0, a.jsxs)(
              tp.Select,
              {
                value: n || "",
                onValueChange: r,
                disabled: !s || !i,
                children: [
                  (0, a.jsx)(tp.SelectTrigger, {
                    className:
                      "border-v0-alpha-400 text-v0-gray-1000 text-sm h-8",
                    children: (0, a.jsx)(tp.SelectValue, {
                      placeholder: "Select font...",
                      children: (0, a.jsx)("span", {
                        style: { fontFamily: `"${l}"` },
                        children: l,
                      }),
                    }),
                  }),
                  (0, a.jsx)(tp.SelectContent, {
                    children: iw.GoogleFonts.map((e) => {
                      let t = (0, iw.fontIdToName)(e);
                      return (0, a.jsx)(
                        tp.SelectItem,
                        {
                          value: e,
                          children: (0, a.jsx)("span", {
                            style: { fontFamily: t },
                            children: t,
                          }),
                        },
                        e,
                      );
                    }),
                  }),
                ],
              },
              `active-font-${n || "none"}`,
            ),
          }),
        ],
      });
    }
    let i3 = (0, o.memo)(function ({ label: e, blockId: t, fontType: n }) {
      let r = (0, o.useContext)(i2);
      if (!r) throw Error("FontItem must be used within RootEditorContext");
      let {
          changeCategoryFont: s,
          getCurrentFont: i,
          designTokensLoaded: l,
        } = r,
        c = iH(i(n)),
        d = (0, o.useCallback)(
          (e) => {
            s(n, e, !1);
          },
          [n, s],
        );
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-1.5",
        children: [
          (0, a.jsx)("label", {
            className:
              "text-label-12 select-none capitalize leading-4 opacity-60",
            children: e,
          }),
          (0, a.jsxs)(
            tp.Select,
            {
              value: c,
              onValueChange: d,
              disabled: !l,
              children: [
                (0, a.jsx)(tp.SelectTrigger, {
                  className: "border-v0-gray-200 text-v0-gray-1000 text-sm",
                  children: (0, a.jsx)(tp.SelectValue, {
                    placeholder: "Select font...",
                  }),
                }),
                (0, a.jsx)(tp.SelectContent, {
                  children: (0, iw.getFontsByCategory)(
                    "sans" === n ? "sans" : "serif" === n ? "serif" : "mono",
                  ).map((e, n, r) => {
                    let s = (0, iw.fontIdToName)(e),
                      i = (0, iw.getFontCategory)(e),
                      l = n > 0 ? (0, iw.getFontCategory)(r[n - 1]) : null;
                    return (0, a.jsxs)(
                      "div",
                      {
                        children: [
                          "other" === i &&
                            "other" !== l &&
                            (0, a.jsx)("div", {
                              className:
                                "px-2 py-1 text-xs text-v0-gray-900 border-t mt-1 pt-2",
                              children: "Other fonts",
                            }),
                          (0, a.jsx)(tp.SelectItem, {
                            value: e,
                            onMouseEnter: () => {
                              (0, e4.sendToIframeFromBlockId)(t || "", {
                                type: "preload_google_font",
                                fontId: e,
                              });
                            },
                            children: (0, a.jsx)("span", {
                              style: { fontFamily: s },
                              children: s,
                            }),
                          }),
                        ],
                      },
                      e,
                    );
                  }),
                }),
              ],
            },
            `${n}-${c || "none"}`,
          ),
        ],
      });
    });
    function i4({ onBack: e }) {
      let t = (0, m.useActiveBlockState)(),
        n = t?.id || "",
        r = (0, o.useContext)(i2),
        { actions: s } = (0, e$.useCurrentChatPrompt)();
      if (!r)
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(iG, { title: "Fonts", onBack: e }),
            (0, a.jsx)("div", {
              className: "flex-1 overflow-auto",
              children: (0, a.jsx)("div", {
                className: "p-4",
                children: (0, a.jsx)("div", {
                  className: "text-sm text-v0-gray-600",
                  children: "Font context not available",
                }),
              }),
            }),
          ],
        });
      let {
          activeFontClass: i,
          changeActiveFont: l,
          hasActiveFont: c,
          designTokensLoaded: d,
        } = r,
        h = i ? i1[i] : null,
        p = {
          sans: iH(sb.FONTS_INITIAL_STYLES["font-sans"]) ?? "Geist",
          serif: iH(sb.FONTS_INITIAL_STYLES["font-serif"]) ?? "Source_Serif_4",
          mono: iH(sb.FONTS_INITIAL_STYLES["font-mono"]) ?? "Geist_Mono",
        };
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(iG, { title: "Fonts", onBack: e }),
          (0, a.jsx)("div", {
            className: "flex-1 overflow-auto",
            children: (0, a.jsxs)("div", {
              className: "p-4",
              children: [
                !c &&
                  (0, a.jsx)(iQ, {
                    onClick: () => {
                      s.handleInputChange({
                        initialValue:
                          "Add the font-sans class to the root layout body element.",
                      });
                    },
                  }),
                (0, a.jsxs)("div", {
                  className: "flex flex-col gap-4",
                  children: [
                    (0, a.jsxs)("div", {
                      className: (0, u.cn)(
                        "flex flex-col gap-1.5",
                        (!c || !d) && "opacity-30 pointer-events-none",
                      ),
                      children: [
                        (0, a.jsx)("label", {
                          className:
                            "text-label-12 select-none leading-4 opacity-60",
                          children: "Default Font Style",
                        }),
                        (0, a.jsxs)(iq.TabsToggle, {
                          className: "w-full h-8",
                          value: h ?? void 0,
                          onValueChange: (e) => {
                            let t;
                            ((t = iH(r.getCurrentFont(e))),
                              (0, iw.isGoogleFont)(t) ? l(t) : l(p[e]));
                          },
                          children: [
                            (0, a.jsx)(iq.TabsToggleTrigger, {
                              value: "sans",
                              className: "flex-1",
                              children: "Sans",
                            }),
                            (0, a.jsx)(iq.TabsToggleTrigger, {
                              value: "serif",
                              className: "flex-1",
                              children: "Serif",
                            }),
                            (0, a.jsx)(iq.TabsToggleTrigger, {
                              value: "mono",
                              className: "flex-1",
                              children: "Mono",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(i3, {
                      label: "Sans",
                      fontType: "sans",
                      blockId: n,
                    }),
                    (0, a.jsx)(i3, {
                      label: "Serif",
                      fontType: "serif",
                      blockId: n,
                    }),
                    (0, a.jsx)(i3, {
                      label: "Mono",
                      fontType: "mono",
                      blockId: n,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
    }
    function i6({ children: e, designTokens: t }) {
      let n = (0, m.useActiveBlockState)(),
        r = iX(t),
        s = (0, o.useMemo)(() => Object.keys(r).length > 0, [r]),
        { atoms: i } = (0, e5.useCurrentBlockDesignMode)(),
        l = (0, sJ.useAtomValue)(i.previewTheme),
        [c, u] = (0, o.useState)(null),
        [h, p] = (0, o.useState)(null),
        [f, g] = (0, o.useState)(!1),
        x = (0, o.useCallback)(
          (e) => t.theme[i0[e]] || t.light[i0[e]] || "",
          [t],
        );
      (0, o.useEffect)(() => {
        if (!n) return;
        let e =
            "code-project" === n.type
              ? (0, s1.parseMultiFileSource)({
                  source: n.source,
                  blockType: "code-project",
                  blockId: n.id,
                })
              : [],
          t = ia(e)?.source;
        if (eX.designModeInlineEditRef.current && t) {
          let n = ii(e),
            r = eX.designModeInlineEditRef.current.getContent(n);
          r && (t = r);
        }
        if (t) {
          let e = (0, iw.getActiveFontClassFromLayout)(t);
          u(e ?? null);
          let n = x(i1[e ?? "font-sans"]);
          n ? g(!0) : g(!1);
          let r = iH(n);
          (0, iw.isGoogleFont)(r) && p(r);
        } else {
          (u("font-sans"), g(!0));
          let e = iH(x("sans"));
          (0, iw.isGoogleFont)(e)
            ? p(e)
            : p(
                {
                  sans: iH(sb.FONTS_INITIAL_STYLES["font-sans"]) ?? "Geist",
                  serif:
                    iH(sb.FONTS_INITIAL_STYLES["font-serif"]) ??
                    "Source_Serif_4",
                  mono:
                    iH(sb.FONTS_INITIAL_STYLES["font-mono"]) ?? "Geist_Mono",
                }.sans,
              );
        }
      }, [n, x]);
      let v = (0, y.useChatId)(),
        { data: b } = (0, j.useServerQuerySWR)(
          ["chat", "attributes"],
          { chatId: v },
          { stopFetch: !v },
        ),
        C = b?.ok ? b.value.designSystemId : null,
        w = (0, d.useChatMetadata)(),
        k = (0, o.useMemo)(
          () => (0, iE.getNextVersionFromChatMetadata)(w),
          [w.nextVersionDefault, w.nextVersion15Default],
        ),
        N = (0, o.useCallback)(() => {
          if (!n) return null;
          let e =
            "code-project" === n.type
              ? (0, s1.parseMultiFileSource)({
                  source: n.source,
                  blockType: "code-project",
                  blockId: n.id,
                })
              : [];
          if (!e.length) return null;
          let t = {};
          for (let n of e) t[n.meta.file] = n.source;
          return t;
        }, [n]),
        M = (0, o.useMemo)(() => {
          let e = N();
          return !!e && 14 === (0, iE.detectNextVersion)(e, {}, k);
        }, [N, k]),
        S = (0, o.useCallback)(() => {
          if (!n) return null;
          let e =
            "code-project" === n.type
              ? (0, s1.parseMultiFileSource)({
                  source: n.source,
                  blockType: "code-project",
                  blockId: n.id,
                })
              : [];
          if (!e.length) return null;
          let t = (0, ir.getGlobalsCssFromFiles)(e),
            r = ia(e),
            s = (0, ir.getGlobalsCssPathFromFiles)(e),
            i = ii(e),
            a = (0, s1.createNewFile)(
              (0, ie.createDefaultGlobals)(),
              s,
              "css",
              n.id,
            ),
            l = (0, s1.createNewFile)(
              (function ({ nextVersion: e }) {
                return 14 === e ? il : io;
              })({ nextVersion: M ? 14 : 15 }),
              i,
              "typescriptreact",
              n.id,
            );
          return {
            rootLayout: r ?? l,
            globalsCss: t ?? a,
            existingGlobalsCssFile: t,
            existingLayoutFile: r,
            defaultGlobalsCssFile: a,
            defaultLayoutFile: l,
          };
        }, [n, M]),
        I = (0, o.useCallback)(
          (e, r) => {
            if (!n || !eX.designModeInlineEditRef.current) return;
            let s = S();
            if (!s) return;
            let { rootLayout: i, globalsCss: a, existingLayoutFile: o } = s,
              { content: c } = (0, ir.getGlobalsCssWithInlineEdit)(
                eX.designModeInlineEditRef,
              );
            if (!c) return;
            let d = iL({
                layoutFile: i,
                styles: {
                  light: {},
                  dark: {},
                  common: {
                    "font-sans": t.theme["font-sans"] || t.light["font-sans"],
                    "font-serif":
                      t.theme["font-serif"] || t.light["font-serif"],
                    "font-mono": t.theme["font-mono"] || t.light["font-mono"],
                    [i0[e]]: (0, iK.googleFontIdToCssValue)(r, M ? 14 : 15),
                  },
                },
                isNext14: M,
              }),
              u = iY({ globalsFile: c, fontType: e, fontId: r, isNext14: M }),
              h = [];
            ((!o || d.changed) &&
              h.push({ file: i.meta.file, value: d.content }),
              u.changed &&
                a.meta.file &&
                h.push({ file: a.meta.file, value: u.content }),
              0 !== h.length &&
                (eX.designModeInlineEditRef.current.bulkFileChange(h),
                (0, L.track)("EditDesignSystemToken", {
                  designSystemId: C,
                  token: `font-${e}`,
                  value: r,
                  theme: l,
                  editor: "design-mode",
                })));
          },
          [n, C, t, S, l, M],
        ),
        T = (0, o.useCallback)(
          (e) => {
            if (!n || !eX.designModeInlineEditRef.current) return;
            let r = S();
            if (!r) return;
            let { rootLayout: s, existingLayoutFile: i } = r,
              a = (0, iw.getFontCategory)(e),
              o = iw.CATEGORY_TO_CLASS_NAME[a],
              d = s.source,
              h = ii([s]),
              m = eX.designModeInlineEditRef.current.getContent(h);
            m && (d = m);
            let f = { content: d, changed: !1 };
            if (o !== c) {
              let e = (0, iw.updateBodyFontClass)(d, o);
              ((f = { content: e, changed: e !== d }), u(o));
            }
            let x = i1[o],
              { content: v } = (0, ir.getGlobalsCssWithInlineEdit)(
                eX.designModeInlineEditRef,
              );
            if (!v) return;
            let b = {
                light: {},
                dark: {},
                common: {
                  "font-sans": t.theme["font-sans"] || t.light["font-sans"],
                  "font-serif": t.theme["font-serif"] || t.light["font-serif"],
                  "font-mono": t.theme["font-mono"] || t.light["font-mono"],
                  [i0[x]]: (0, iK.googleFontIdToCssValue)(e, M ? 14 : 15),
                },
              },
              y = iL({
                layoutFile: { ...s, source: f.content },
                styles: b,
                isNext14: M,
              }),
              j = iY({ globalsFile: v, fontType: x, fontId: e, isNext14: M }),
              w = [];
            if (
              ((!i || f.changed || y.changed) &&
                w.push({ file: s.meta.file, value: y.content }),
              j.changed)
            ) {
              let e = S();
              e &&
                e.globalsCss.meta.file &&
                w.push({ file: e.globalsCss.meta.file, value: j.content });
            }
            (w.length > 0 &&
              eX.designModeInlineEditRef.current.bulkFileChange(w),
              p(e),
              g(!0),
              (0, L.track)("EditDesignSystemToken", {
                designSystemId: C,
                token: "active-font",
                value: e,
                theme: l,
                editor: "design-mode",
              }));
          },
          [n, c, t.light, t.theme, S, C, l, M],
        ),
        E = (0, o.useMemo)(
          () => ({
            designTokens: t,
            changeCategoryFont: I,
            getCurrentFont: x,
            designTokensLoaded: s,
            activeFontClass: c,
            activeFontId: h,
            changeActiveFont: T,
            hasActiveFont: f,
          }),
          [t, I, x, T, s, c, h, f],
        );
      return (0, a.jsx)(i2.Provider, { value: E, children: e });
    }
    var i7 = e.i(948020),
      i9 = e.i(762585),
      i8 = e.i(343258);
    function ae({
      designSystem: e,
      disabled: t,
      preFetchFunction: n,
      editedValues: r,
      showEditedTag: s = !1,
    }) {
      let { atoms: i } = (0, e5.useCurrentBlockDesignMode)(),
        l = (0, sJ.useAtomValue)(i.previewTheme),
        c = (0, sJ.useAtomValue)(i7.designSystemUnsavedChangesAtom),
        d = (0, o.useMemo)(() => {
          if (!e) return null;
          let t = (0, iT.getShadcnStyleFromRegistry)(e.registry);
          return r
            ? {
                ...t,
                common: {
                  ...t.common,
                  ...Object.fromEntries(
                    Object.entries(r.common).filter(
                      ([e, t]) =>
                        !e.startsWith("font-") ||
                        ("string" == typeof t && t.includes("'")),
                    ),
                  ),
                  ...Object.fromEntries(
                    Object.entries(r.theme).filter(([e]) =>
                      e.startsWith("font-"),
                    ),
                  ),
                },
                light: {
                  ...t.light,
                  ...r.light,
                  ...Object.fromEntries(
                    Object.entries(r.theme).filter(
                      ([e]) =>
                        !e.startsWith("font-") && !e.startsWith("color-"),
                    ),
                  ),
                },
                dark: {
                  ...t.dark,
                  ...r.dark,
                  ...Object.fromEntries(
                    Object.entries(r.theme).filter(
                      ([e]) =>
                        !e.startsWith("font-") && !e.startsWith("color-"),
                    ),
                  ),
                },
              }
            : t;
        }, [e, r]);
      return (0, a.jsxs)("div", {
        className: (0, u.cn)(
          "light:hover:brightness-90 dark:hover:brightness-110 transition-all h-22 w-full rounded-md p-3 flex flex-col gap-4",
          t && "cursor-not-allowed",
          e && d
            ? "border border-v0-gray-300 bg-v0-background-100 text-v0-gray-1000"
            : "bg-transparent text-v0-gray-600 border border-dashed border-v0-gray-300",
        ),
        style: d
          ? { backgroundColor: d[l].background, color: d[l].foreground }
          : void 0,
        onMouseEnter: n,
        onTouchStart: n,
        children: [
          e && d
            ? (0, a.jsxs)("p", {
                className: "text-label-12 w-full text-start font-medium",
                children: [
                  e.name,
                  s &&
                    c.hasUnsavedChanges &&
                    (0, a.jsx)("span", {
                      className: "font-normal text-v0-gray-700",
                      children: " (edited)",
                    }),
                ],
              })
            : (0, a.jsx)("div", {
                className: "flex-1 flex items-center justify-center",
                children: (0, a.jsx)("span", {
                  className: "text-label-12 font-medium text-v0-gray-600",
                  children: "Add a design system",
                }),
              }),
          e &&
            d &&
            (0, a.jsxs)("div", {
              className: "flex gap-2 items-center",
              children: [
                (0, a.jsx)(aa, { shadcnStyle: d }),
                (0, a.jsx)(iF.DesignSystemMiniPreview, {
                  borderAsBorderColor: !0,
                  shadcnStyle: d,
                  size: "long",
                  theme: l,
                }),
                (0, a.jsx)("div", {
                  className:
                    "px-3 h-8 text-[11px] font-medium flex items-center justify-center",
                  style: {
                    borderRadius: d.common.radius,
                    backgroundColor: d[l].primary,
                    color: d[l]["primary-foreground"],
                  },
                  children: "Button",
                }),
              ],
            }),
        ],
      });
    }
    function at({
      designSystem: e,
      isSelected: t,
      onSelect: n,
      disabled: r = !1,
      onPointerEnter: s,
      isCurrentActive: i = !1,
    }) {
      let l = e?.designSystemId || null,
        o = (0, $.useT)(),
        c = e?.name || o("designSystemButton.default"),
        d = !i && !r;
      return (0, a.jsx)(
        tj.CommandItem,
        {
          value: `${c} ${l}`,
          onSelect: () => {
            d && n(l);
          },
          className: (0, u.cn)(
            "p-0 relative",
            r && "cursor-not-allowed pointer-events-none",
            i && "cursor-default",
          ),
          onPointerEnter: d ? s : void 0,
          children: (0, a.jsxs)("div", {
            className: "relative w-full",
            children: [
              (0, a.jsx)(ae, {
                designSystem: e,
                disabled: r,
                showEditedTag: i,
              }),
              t &&
                (0, a.jsx)("div", {
                  className: "absolute top-2 right-2",
                  children: (0, a.jsx)("div", {
                    className:
                      "bg-v0-background-100 rounded-full p-1 border border-v0-alpha-400",
                    children: (0, a.jsx)(s2.Check, {
                      className: "h-3 w-3 text-v0-gray-900",
                    }),
                  }),
                }),
            ],
          }),
        },
        l || "unset",
      );
    }
    function an({ disabled: e = !1, onSubmit: t }) {
      let [n, r] = (0, o.useState)(""),
        s = (e) => {
          (e.preventDefault(), n.trim() && (t(n.trim()), r("")));
        };
      return (0, a.jsx)("div", {
        className: "w-full",
        children: (0, a.jsxs)("div", {
          className: (0, u.cn)(
            "w-full rounded-md border border-v0-gray-300 bg-v0-background-100 p-3 flex flex-col gap-3",
            e && "opacity-50 cursor-not-allowed",
          ),
          children: [
            (0, a.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [
                (0, a.jsx)("span", {
                  className: "text-label-12 font-semibold text-v0-gray-900",
                  children: "Ask",
                }),
                (0, a.jsx)(s3.Logo, { className: "h-4 w-4" }),
              ],
            }),
            (0, a.jsxs)("form", {
              onSubmit: s,
              className: "flex items-center gap-2",
              children: [
                (0, a.jsx)(tC.Input, {
                  placeholder: "Make me a design system that...",
                  value: n,
                  onChange: (e) => r(e.target.value),
                  onKeyDown: (e) => {
                    "Enter" !== e.key ||
                      e.shiftKey ||
                      (e.preventDefault(), s(e));
                  },
                  disabled: e,
                  className: "flex-1",
                }),
                (0, a.jsx)(D.Button, {
                  type: "button",
                  variant: "default",
                  size: "sm",
                  className: "size-8",
                  onClick: () => {
                    n.trim() && (t(n.trim()), r(""));
                  },
                  disabled: e || !n.trim(),
                  children: (0, a.jsx)(s5.ArrowRight, { className: "h-4 w-4" }),
                }),
              ],
            }),
          ],
        }),
      });
    }
    function ar({ className: e, editedValues: t } = {}) {
      return (0, a.jsx)(o.Suspense, {
        fallback: (0, a.jsx)(i9.Skeleton, { className: "w-full h-22" }),
        children: (0, a.jsx)(ai, { className: e, editedValues: t }),
      });
    }
    function as({
      designSystem: e,
      disabled: t,
      tooltip: n,
      preFetchFunction: r,
      editedValues: s,
    }) {
      return (0, a.jsx)(tm.Tooltip, {
        content: n,
        children: (0, a.jsx)(ae, {
          designSystem: e,
          disabled: t,
          preFetchFunction: r,
          editedValues: s,
          showEditedTag: !0,
        }),
      });
    }
    function ai({ className: e, editedValues: t } = {}) {
      let n = (0, y.useChatId)(),
        r = (0, $.useT)(),
        { atoms: s } = (0, e5.useCurrentBlockDesignMode)(),
        i = (0, sJ.useAtomValue)(s.pendingDesignSystem),
        { actions: l } = (0, e$.useCurrentChatPrompt)();
      (0, j.useServerQuerySWR)(["scoped", "designSystems"], {});
      let { data: c, isLoading: d } = (0, j.useServerQuerySWR)(
          ["chat", "attributes"],
          { chatId: n },
          { stopFetch: !n },
        ),
        h = (0, o.useMemo)(
          () =>
            i.isPending
              ? i.designSystemId
              : c?.ok
                ? c.value.designSystemId
                : null,
          [i.isPending, i.designSystemId, c],
        ),
        p = (0, m.useActiveBlockState)(),
        { latestBlock: f } = (0, x.useBlockHistory)({
          blockId: p?.id,
          searchAll: !0,
        }),
        { editValueMap: g } = (0, i8.useEditValueMap)({ blockId: p?.id || "" }),
        v = (0, s4.getDesignSystemThemeAtoms)(),
        b = (0, sJ.useAtomValue)(v.designSystems).filter(
          iA.isDesignSystemWithRegistry,
        ),
        { isTWv4: C } = i$(),
        w = (0, o.useMemo)(() => !f || (!!p && p.id === f.id), [p, f]),
        [k, N] = (0, o.useState)(!1),
        [M, S] = (0, o.useState)(null),
        [I, L] = (0, o.useState)(
          h ? { type: "saved", designSystemId: h } : { type: "none" },
        ),
        [T, E] = (0, o.useState)(h),
        { userDesignSystems: _, exampleDesignSystems: A } = (0,
        o.useMemo)(() => {
          let e = b ?? [],
            t = e.filter(
              (e) => !(0, iz.isExampleDesignSystem)(e.designSystemId),
            ),
            n = e.filter((e) =>
              (0, iz.isExampleDesignSystem)(e.designSystemId),
            );
          return {
            userDesignSystems: [...t].sort((e, t) =>
              e.designSystemId === T ? -1 : +(t.designSystemId === T),
            ),
            exampleDesignSystems: n,
          };
        }, [b, T]),
        {
          globalsCssWithDesignSystem: R,
          isPrecomputingGlobals: P,
          loadGlobalsWithDesignSystem: V,
          revertPreview: F,
          setRevertPreview: z,
          applyDesignSystem: H,
          previewDesignSystem: B,
          preloadFontsInFrame: O,
        } = iR({
          chatId: n || null,
          designSystems: (0, o.useMemo)(() => [..._, ...A], [_, A]),
        });
      ((0, o.useEffect)(() => {
        h ? L({ type: "saved", designSystemId: h }) : L({ type: "none" });
      }, [h]),
        (0, o.useEffect)(() => {
          if (!k) {
            let e = setTimeout(() => {
              E(h);
            }, 150);
            return () => clearTimeout(e);
          }
        }, [k, h]));
      let U = (0, o.useMemo)(
          () => (h && b.find((e) => e.designSystemId === h)) || null,
          [h, b],
        ),
        W = (0, o.useMemo)(
          () => (h && U?.name) || r("designSystemButton.default"),
          [h, U, r],
        ),
        Z = (0, o.useMemo)(() => {
          switch (I.type) {
            case "none":
              return r("designSystemButton.default");
            case "saved":
              let e = b.find((e) => e.designSystemId === I.designSystemId);
              return e?.name || r("designSystemButton.default");
          }
        }, [I, b, r]),
        G = (0, o.useCallback)(
          (e) => {
            (L(e ? { type: "saved", designSystemId: e } : { type: "none" }),
              F ? z([F[0], e]) : z([h, e]),
              H(e),
              N(!1));
          },
          [H, F, h, z],
        ),
        q = (0, o.useCallback)(() => {
          if (M && p) {
            let e = document.getElementById((0, s9.getBlockIframeId)(p.id));
            if (e) {
              let t = (0, s7.getMultiFileSourceMap)(M);
              (0, s8.updatePreviewImmediate)(e, t);
            }
          }
        }, [M, p]),
        X = (0, o.useCallback)(() => {
          (R || V(), O());
        }, [R, V, O]),
        Y = (0, o.useCallback)(
          (e) => {
            N(!1);
            let t = `Make me a new design system by editing globals.css. ${e}`;
            (l.handleInputChange({ initialValue: t, force: !0 }),
              l.focusPrompt());
          },
          [l],
        ),
        K = (0, o.useMemo)(() => d || !w || P || !C, [d, w, P, C]),
        J = (0, o.useCallback)(
          (e) =>
            e.map((e) =>
              (0, a.jsx)(
                at,
                {
                  designSystem: e,
                  isSelected:
                    "saved" === I.type && I.designSystemId === e.designSystemId,
                  onSelect: G,
                  disabled: K,
                  onPointerEnter: () =>
                    B({
                      activeDesignSystemId: h,
                      designSystemId: e.designSystemId,
                    }),
                  isCurrentActive: h === e.designSystemId,
                },
                e.designSystemId,
              ),
            ),
          [I, G, K, B, h],
        );
      return (0, a.jsxs)(tw.Popover, {
        open: k && w && C,
        onOpenChange: (e) => {
          if (w && C)
            if ((N(e), e)) {
              if (p && "code-project" === p.type)
                try {
                  let e = (0, s1.parseMultiFileSource)({
                    source: p.source,
                    blockType: "code-project",
                    blockId: p.id,
                  });
                  for (let t of e) {
                    let e = g[t.meta.file || ""];
                    e && (t.source = e);
                  }
                  S(e);
                } catch (e) {
                  (console.warn("Failed to capture original files:", e),
                    S(null));
                }
              R || P || V();
            } else {
              if (M && p) {
                let e = document.getElementById((0, s9.getBlockIframeId)(p.id));
                if (e) {
                  let t = (0, s7.getMultiFileSourceMap)(M);
                  (0, s8.updatePreviewImmediate)(e, t);
                }
              }
              (S(null),
                h
                  ? L({ type: "saved", designSystemId: h })
                  : L({ type: "none" }),
                F && z(null));
            }
        },
        children: [
          (0, a.jsx)(tw.PopoverTrigger, {
            asChild: !0,
            children: (0, a.jsx)("button", {
              className: (0, u.cn)("w-full", e),
              disabled: !w || !C,
              children: (0, a.jsx)(as, {
                disabled: !w || !C,
                designSystem: U,
                preFetchFunction: X,
                editedValues: t,
                tooltip: k
                  ? void 0
                  : C
                    ? w
                      ? `${r("designSystemButton.designSystem")}: ${W}`
                      : r("designSystemButton.openLatestBlockToApply")
                    : r("designSystemButton.twv4"),
              }),
            }),
          }),
          (0, a.jsx)(tw.PopoverContent, {
            className: "p-0",
            align: "end",
            onPointerLeave: q,
            style: { width: "var(--radix-popper-anchor-width)" },
            children: (0, a.jsxs)("div", {
              className: "flex flex-col",
              children: [
                (0, a.jsxs)(tj.Command, {
                  defaultValue: Z,
                  children: [
                    (0, a.jsx)(tj.CommandInput, {
                      placeholder: r("designSystemButton.searchPlaceholder"),
                    }),
                    (0, a.jsxs)(tj.CommandList, {
                      children: [
                        (0, a.jsx)(tj.CommandEmpty, {
                          children: (0, a.jsx)("div", {
                            className: "text-v0-gray-900 text-sm",
                            children: r(
                              "designSystemButton.noDesignSystemsFound",
                            ),
                          }),
                        }),
                        "none" === I.type &&
                          (0, a.jsxs)(tj.CommandGroup, {
                            className: "p-2",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "px-1 pb-2 text-xs font-medium text-v0-gray-900",
                                children: "No Design System",
                              }),
                              (0, a.jsx)("div", {
                                className: "flex flex-col gap-2",
                                children: (0, a.jsx)(at, {
                                  designSystem: null,
                                  isSelected: !0,
                                  onSelect: G,
                                  disabled: K,
                                  isCurrentActive: null === h,
                                }),
                              }),
                            ],
                          }),
                        (0, a.jsxs)(tj.CommandGroup, {
                          className: "p-2",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "px-1 pb-2 text-xs font-medium text-v0-gray-900",
                              children: "Your Design Systems",
                            }),
                            (0, a.jsxs)("div", {
                              className: "flex flex-col gap-2",
                              children: [
                                J(_),
                                (0, a.jsx)(an, { disabled: K, onSubmit: Y }),
                              ],
                            }),
                          ],
                        }),
                        A.length > 0 &&
                          (0, a.jsxs)(tj.CommandGroup, {
                            className: "p-2",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "px-1 pb-2 text-xs font-medium text-v0-gray-900",
                                children: "Default Design Systems",
                              }),
                              (0, a.jsx)("div", {
                                className: "flex flex-col gap-2",
                                children: J(A),
                              }),
                            ],
                          }),
                        "none" !== I.type &&
                          (0, a.jsxs)(tj.CommandGroup, {
                            className: "p-2",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "px-1 pb-2 text-xs font-medium text-v0-gray-900",
                                children: "No Design System",
                              }),
                              (0, a.jsx)("div", {
                                className: "flex flex-col gap-2",
                                children: (0, a.jsx)(at, {
                                  designSystem: null,
                                  isSelected: !1,
                                  onSelect: G,
                                  disabled: K,
                                  isCurrentActive: null === h,
                                }),
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "border-t p-2 bg-v0-background-200",
                  children: (0, a.jsx)("a", {
                    href: "/chat/design-systems/new/theme",
                    children: (0, a.jsx)(D.Button, {
                      variant: "secondary",
                      size: "sm",
                      className: "w-full",
                      children: "New Design System",
                    }),
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    function aa({ shadcnStyle: e }) {
      let t = (0, m.useActiveBlockState)(),
        n = (0, o.useContext)(i2),
        r = (0, o.useMemo)(() => {
          let r = "font-sans";
          if (n?.activeFontClass) r = n.activeFontClass;
          else if (t && "code-project" === t.type)
            try {
              let e = (0, s1.parseMultiFileSource)({
                  source: t.source,
                  blockType: "code-project",
                  blockId: t.id,
                }),
                n = ia(e),
                s = n?.source,
                i = n ? ii(e) : void 0;
              if (eX.designModeInlineEditRef.current && s && i) {
                let e = eX.designModeInlineEditRef.current.getContent(i);
                e && (s = e);
              }
              s && (r = (0, iw.getActiveFontClassFromLayout)(s) ?? "font-sans");
            } catch (e) {}
          let s = e?.common[r];
          if (!s) return null;
          let i = iH(s);
          return i
            ? { fontId: i, fontName: (0, iw.fontIdToName)(i), fontType: r }
            : null;
        }, [e, t, n]);
      return (0, a.jsx)("p", {
        className: "text-[22px] font-normal",
        style: { fontFamily: r ? r.fontName : void 0 },
        children: "Abc",
      });
    }
    var al = e.i(244008),
      ao = e.i(910427),
      ac = e.i(407371),
      ad = e.i(530135),
      au = e.i(588385),
      ah = e.i(281622);
    function ap({ className: e }) {
      let [t, n] = (0, o.useState)(!1),
        [r, s] = (0, o.useTransition)(),
        i = (0, y.useChatId)(),
        c = (0, m.useActiveBlockState)(),
        d = (0, sJ.useAtomValue)(i7.designSystemUnsavedChangesAtom),
        { data: h } = (0, j.useServerQuerySWR)(
          ["chat", "attributes"],
          { chatId: i },
          { stopFetch: !i },
        ),
        p = (0, s4.getDesignSystemThemeAtoms)(),
        f = (0, sJ.useAtomValue)(p.designSystems),
        { applyDesignSystem: g } = iR({ chatId: i || null, designSystems: f }),
        x = h?.ok ? h.value.designSystemId : null,
        v = f.find((e) => e.designSystemId === x) || null,
        b = (0, o.useCallback)(() => {
          d.hasUnsavedChanges &&
            h?.ok &&
            (0, eM.openDialog)({
              type: "createDesignSystem",
              data: {
                shadcnStyle: d.currentShadcnStyle,
                onSuccess: (e) => {
                  ((0, L.track)("CreateDesignSystemFromUnsavedChanges", {
                    designSystemId: e.designSystemId,
                  }),
                    s(async () => {
                      await g(e.designSystemId);
                    }),
                    d.clearUnsavedChanges(),
                    n(!1));
                },
              },
            });
        }, [h?.ok, d, g, s]),
        C = (0, o.useCallback)(() => {
          d.hasUnsavedChanges &&
            c &&
            ((0, e4.sendToIframeFromBlockId)(c.id, {
              type: "devtools_revert_design",
            }),
            d.clearUnsavedChanges(),
            n(!1),
            s(async () => {
              await g(x);
            }));
        }, [d, g, x, c, s]),
        w = (0, o.useCallback)(() => {
          d.hasUnsavedChanges &&
            v &&
            s(async () => {
              try {
                let e = (0, au.generateRegistryFromStyles)(
                  v.name,
                  "https://v0.app",
                  [{ name: v.name, style: d.currentShadcnStyle }],
                );
                (await (0, ah.updateDesignSystemWithRegistryAction)({
                  designSystemId: v.designSystemId,
                  registry: e,
                }),
                  d.clearUnsavedChanges(),
                  l.toast.success("Design system updated successfully"),
                  n(!1));
              } catch (e) {
                l.toast.error(
                  "Failed to update design system. Please try again.",
                );
              }
            });
        }, [d, v, s]);
      return (0, a.jsxs)(en.DropdownMenu, {
        open: t,
        onOpenChange: n,
        children: [
          (0, a.jsx)(en.DropdownMenuTrigger, {
            asChild: !0,
            children: (0, a.jsx)(D.Button, {
              className: (0, u.cn)("size-7 rounded-md", e),
              tooltip: "Design System Options",
              size: "sm",
              variant: "ghost",
              children: d.hasUnsavedChanges
                ? (0, a.jsx)(am, { className: "text-v0-gray-900!" })
                : (0, a.jsx)(al.SettingsGear, {
                    className: "text-v0-gray-900!",
                  }),
            }),
          }),
          (0, a.jsxs)(en.DropdownMenuContent, {
            side: "bottom",
            align: "end",
            children: [
              (0, a.jsxs)(en.DropdownMenuGroup, {
                children: [
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    className: "cursor-pointer",
                    onSelect: C,
                    disabled: !d.hasUnsavedChanges || r || !v,
                    children: [
                      (0, a.jsx)(ad.UndoIcon, {}),
                      (0, a.jsx)("div", {
                        className: "truncate",
                        children: "Reset Changes",
                      }),
                    ],
                  }),
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    className: "cursor-pointer",
                    onSelect: b,
                    disabled: !d.hasUnsavedChanges || r,
                    children: [
                      (0, a.jsx)(ao.PlusCircle, {}),
                      (0, a.jsx)("div", {
                        className: "truncate",
                        children: "Save as New...",
                      }),
                    ],
                  }),
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    className: "cursor-pointer",
                    onSelect: w,
                    disabled:
                      !d.hasUnsavedChanges ||
                      r ||
                      !v ||
                      (0, iz.isExampleDesignSystem)(v.designSystemId),
                    children: [
                      (0, a.jsx)(ac.FloppyDisk, {}),
                      (0, a.jsxs)("div", {
                        className: "truncate",
                        children: [
                          "Save to ",
                          v?.name ||
                            (0, a.jsx)("span", { children: "Current" }),
                          (0, a.jsx)("span", { children: "..." }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(en.DropdownMenuSeparator, {}),
              (0, a.jsx)(en.DropdownMenuGroup, {
                children: (0, a.jsx)(en.DropdownMenuItem, {
                  asChild: !0,
                  className: "justify-between",
                  children: (0, a.jsxs)(ee.default, {
                    href: x
                      ? `/chat/design-systems/${x}`
                      : "/chat/design-systems",
                    children: ["Open in Editor", (0, a.jsx)(Q.External, {})],
                  }),
                }),
              }),
            ],
          }),
        ],
      });
    }
    let am = (0, e9.withNewIcon)(
      '<g clip-path="url(#clip0_2148_13272)"><circle cx="13.5" cy="2.5" r="2.5" fill="var(--v0-blue-900)"/><path d="M9.72168 1.18555C9.57845 1.5973 9.5 2.03945 9.5 2.5C9.5 2.75569 9.52446 3.00569 9.57031 3.24805C8.94926 3.01023 8.43649 2.46488 8.2998 1.73633L8.25586 1.5H7.74414L7.7002 1.73633C7.55891 2.4894 7.0164 3.04829 6.36719 3.27246C6.27216 3.30527 6.17831 3.34059 6.08594 3.37891L5.69531 3.55469C5.09825 3.8001 4.37631 3.76504 3.7832 3.35938L3.58398 3.22266L3.22266 3.58398L3.35938 3.7832C3.76504 4.37631 3.80009 5.09825 3.55469 5.69531L3.37891 6.08594C3.34059 6.17831 3.30527 6.27216 3.27246 6.36719C3.04829 7.01639 2.4894 7.5589 1.73633 7.7002L1.5 7.74414V8.25488L1.73633 8.2998C2.44245 8.43229 2.97778 8.91747 3.22656 9.5127L3.27246 9.63281L3.37891 9.91406L3.55469 10.3047C3.80009 10.9017 3.76503 11.6237 3.35938 12.2168L3.22266 12.415L3.58398 12.7764L3.7832 12.6406L3.90332 12.5645C4.47191 12.2315 5.13802 12.2163 5.69531 12.4453L6.08594 12.6211C6.17831 12.6594 6.27216 12.6947 6.36719 12.7275C7.0164 12.9517 7.55891 13.5106 7.7002 14.2637L7.74414 14.5H8.25586L8.2998 14.2637L8.33008 14.125C8.50843 13.4421 9.02407 12.9377 9.63281 12.7275C9.72784 12.6947 9.82169 12.6594 9.91406 12.6211L10.3047 12.4453C10.9018 12.1999 11.6237 12.235 12.2168 12.6406L12.415 12.7764L12.7764 12.415L12.6406 12.2168C12.235 11.6237 12.1999 10.9018 12.4453 10.3047L12.6211 9.91406C12.6594 9.82169 12.6947 9.72784 12.7275 9.63281C12.9517 8.9836 13.5106 8.44109 14.2637 8.2998L14.5 8.25488V7.74414L14.2637 7.7002C13.5346 7.56343 12.9886 7.0503 12.751 6.42871C12.9937 6.4747 13.2439 6.5 13.5 6.5C13.9603 6.5 14.4019 6.42045 14.8135 6.27734L16 6.5V9.5L14.54 9.77344C14.3552 9.80814 14.207 9.94438 14.1455 10.1221C14.06 10.3698 13.9603 10.6116 13.8467 10.8447C13.7643 11.0139 13.7726 11.2148 13.8789 11.3701L14.7178 12.5967L12.5957 14.7178L11.3701 13.8789C11.2148 13.7726 11.0139 13.7643 10.8447 13.8467C10.6116 13.9603 10.3698 14.06 10.1221 14.1455C9.94438 14.207 9.80815 14.3552 9.77344 14.54L9.5 16H6.5L6.22656 14.54C6.19619 14.3784 6.08791 14.2449 5.94238 14.1729L5.87793 14.1455C5.63018 14.06 5.38842 13.9603 5.15527 13.8467C4.98607 13.7643 4.78521 13.7726 4.62988 13.8789L3.40332 14.7178L1.28223 12.5967L2.12109 11.3701C2.21409 11.2342 2.23278 11.0632 2.18066 10.9092L2.15332 10.8447C2.03967 10.6116 1.94004 10.3698 1.85449 10.1221C1.80069 9.96654 1.6804 9.8427 1.52734 9.79102L1.45996 9.77344L0 9.5V6.5L1.45996 6.22656C1.62164 6.19619 1.75509 6.08792 1.82715 5.94238L1.85449 5.87793C1.94004 5.63018 2.03968 5.38843 2.15332 5.15527C2.22539 5.00727 2.2279 4.83527 2.15625 4.69043L2.12109 4.62988L1.28223 3.40332L3.40332 1.28223L4.62988 2.12109C4.78521 2.22737 4.98607 2.23572 5.15527 2.15332C5.27178 2.09653 5.39046 2.04307 5.51074 1.99316L5.87793 1.85449C6.03345 1.80069 6.1573 1.6804 6.20898 1.52734L6.22656 1.45996L6.5 0H9.5L9.72168 1.18555ZM8 5C9.65685 5 11 6.34315 11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5ZM8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5Z" fill="currentcolor"/></g><defs><clipPath id="clip0_2148_13272"><rect width="16" height="16" fill="white"/></clipPath></defs>',
    );
    function af({
      tokenName: e,
      designTokens: t,
      onColorChange: n,
      designTokensLoaded: r,
      nameInInput: s,
    }) {
      let i = iX(t),
        l = (0, o.useMemo)(
          () =>
            (function (e, t) {
              let [n, r, s] = ij(e, void 0),
                i = iv(void 0),
                a = ib(void 0);
              return n + r.map(iy(i, a)).join(void 0 ?? " ") + s;
            })(e),
          [e],
        ),
        { displayedColorName: c, parsedColor: d } = (0, o.useMemo)(() => {
          let t = i[e] || "",
            n = no(t);
          return { displayedColorName: n ? ss(n) : t, parsedColor: n ?? null };
        }, [i, e]);
      return (0, a.jsx)(sj, {
        title: l,
        displayedColorName: c,
        parsedColor: d,
        colorTokens: [],
        onColorChange: (t) => {
          n && (null === t ? n(e, i[e] || "", !1) : n(e, sp(t), !0));
        },
        onTokensChange: () => {},
        onPointerEnter: () => {},
        onPointerLeave: () => {},
        updateColorNameTextContent: () => {},
        clearRevertPreview: () => {},
        alphaEnabled: !1,
        isLoading: !r,
        nameInInput: s,
      });
    }
    function ag(e, t, n, r, s = "light") {
      let i,
        a = null,
        { path: l, content: o } = (0, ir.getGlobalsCssWithInlineEdit)(r);
      if (
        (null === l &&
          ((l = "app/globals.css"),
          (o = `\
:root {
  ${e}: ${t};
}

.dark {
  ${e}: ${t};
}
`)),
        o?.includes(e) && ((a = l), (i = o)),
        !a || !i)
      )
        return;
      let c = i.split("\n"),
        d = -1,
        u = "",
        h = !1;
      for (let t = 0; t < c.length; t++) {
        let n = c[t].trim();
        if (("dark" === s ? /^\s*\.dark\s*\{/ : /^\s*:root\s*\{/).test(n)) {
          h = !0;
          continue;
        }
        if (h && n.includes("}")) {
          h = !1;
          continue;
        }
        if (h && c[t].includes(e)) {
          ((d = t), (u = c[t]));
          break;
        }
      }
      if (-1 === d) return;
      let p = RegExp(`(\\s*)(${e}\\s*:\\s*)([^;]+)(;.*)?$`).exec(u);
      if (!p) return;
      let [m, f, g, x, v] = p,
        b = p.index || 0,
        y = `${f}${g}${t}${v || ""}`;
      r.current?.inlineEdit(a, d + 1, b + 1, m.length, y, n);
    }
    let ax = (0, eK.default)(
        ({ token: e, value: t, theme: n, designSystemId: r }) => {
          (0, L.track)("EditDesignSystemToken", {
            designSystemId: r,
            token: e,
            value: t,
            theme: n,
            editor: "design-mode",
          });
        },
        1e3,
      ),
      av = (0, eK.default)(
        ({ token: e, value: t, theme: n, designSystemId: r }) => {
          (0, L.track)("EditDesignSystemToken", {
            designSystemId: r,
            token: e,
            value: t,
            theme: n,
            editor: "design-mode",
          });
        },
        1e3,
      ),
      ab = (0, o.createContext)(null);
    function ay({ children: e, designTokens: t }) {
      let n = iX(t),
        { updateToken: r } = (function () {
          let e = (0, m.useActiveBlockState)(),
            t = e?.id,
            { atoms: n } = (0, e5.useCurrentBlockDesignMode)(),
            r = (0, sJ.useAtomValue)(n.previewTheme),
            {
              queueVersion: s,
              lastIsPreview: i,
              setLastFileContent: a,
              setLastIsPreview: l,
              setSaveNextState: c,
            } = sQ(),
            { pushHistory: d } = sK(),
            u = (0, y.useChatId)(),
            { data: h } = (0, j.useServerQuerySWR)(
              ["chat", "attributes"],
              { chatId: u },
              { stopFetch: !u },
            ),
            p = h?.ok ? h.value.designSystemId : null;
          return {
            updateToken: (0, o.useCallback)(
              (e, n, o) => {
                let u = Date.now(),
                  h = o?.isPreview,
                  m = o?.isHistoryOp ?? !1,
                  f = o?.prevValue ?? "";
                s("CSS:" + e, u, () => {
                  if (!eX.designModeInlineEditRef.current || !t) return;
                  let s = `--${e}`;
                  if (!m) {
                    if ((h && !i) || (!i && !h)) {
                      let { path: e, content: t } = (0,
                      ir.getGlobalsCssWithInlineEdit)(
                        eX.designModeInlineEditRef,
                      );
                      t?.includes(s) && a({ file: e, content: t });
                    }
                    let { path: e } = (0, ir.getGlobalsCssWithInlineEdit)(
                      eX.designModeInlineEditRef,
                    );
                    e && d(e);
                  }
                  (h ? l(!0) : (l(!1), c(!0)),
                    (0, e4.sendToIframeFromBlockId)(t, {
                      type: "devtools_sync_design",
                      payload: {
                        type: "css-var",
                        variable: s,
                        value: n,
                        prev: f,
                      },
                    }),
                    ag(s, n, u, eX.designModeInlineEditRef, r),
                    ax({ token: e, value: n, theme: r, designSystemId: p }));
                });
              },
              [t, s, i, a, d, l, c, r, p],
            ),
          };
        })(),
        { updateMultipleTokens: s } = (function () {
          let e = (0, m.useActiveBlockState)(),
            t = e?.id,
            { atoms: n } = (0, e5.useCurrentBlockDesignMode)(),
            r = (0, sJ.useAtomValue)(n.previewTheme),
            {
              queueVersion: s,
              lastIsPreview: i,
              setLastFileContent: a,
              setLastIsPreview: l,
              setSaveNextState: c,
            } = sQ(),
            { pushHistory: d } = sK(),
            u = (0, y.useChatId)(),
            { data: h } = (0, j.useServerQuerySWR)(
              ["chat", "attributes"],
              { chatId: u },
              { stopFetch: !u },
            ),
            p = h?.ok ? h.value.designSystemId : null;
          return {
            updateMultipleTokens: (0, o.useCallback)(
              (e, n) => {
                if (!t || 0 === e.length) return;
                let o = Date.now(),
                  u = n.isPreview ?? !1,
                  h = n.isHistoryOp ?? !1,
                  m = n.batchName ?? "batch_update",
                  f = n.customTracking;
                s(`CSS:${m}`, o, () => {
                  if (eX.designModeInlineEditRef.current && t) {
                    if (!h) {
                      if ((u && !i) || (!i && !u)) {
                        let { path: e, content: t } = (0,
                        ir.getGlobalsCssWithInlineEdit)(
                          eX.designModeInlineEditRef,
                        );
                        e && t && a({ file: e, content: t });
                      }
                      let { path: e } = (0, ir.getGlobalsCssWithInlineEdit)(
                        eX.designModeInlineEditRef,
                      );
                      e && d(e);
                    }
                    (u ? l(!0) : (l(!1), c(!0)),
                      (function (e, t, n, r = "light") {
                        let s;
                        if (0 === e.length) return;
                        let i = null,
                          { path: a, content: l } = (0,
                          ir.getGlobalsCssWithInlineEdit)(n);
                        if (null === a) {
                          a = "app/globals.css";
                          let r = e
                              .map(
                                ({ cssVariable: e, color: t }) =>
                                  `  ${e}: ${t};`,
                              )
                              .join("\n"),
                            s = e
                              .map(
                                ({ cssVariable: e, color: t }) =>
                                  `  ${e}: ${t};`,
                              )
                              .join("\n");
                          ((l = `\
:root {
${r}
}

.dark {
${s}
}
`),
                            n.current?.inlineEdit(a, 0, 0, 0, l, t));
                          return;
                        }
                        if (!l) return;
                        i = a;
                        let o = (s = l).split("\n"),
                          c = [],
                          d = !1;
                        for (let t = 0; t < o.length; t++) {
                          let n = o[t]?.trim();
                          if (n) {
                            if (
                              ("dark" === r
                                ? /^\s*\.dark\s*\{/
                                : /^\s*:root\s*\{/
                              ).test(n)
                            ) {
                              d = !0;
                              continue;
                            }
                            if (d && n.includes("}")) {
                              d = !1;
                              continue;
                            }
                            if (d && o[t]) {
                              for (let { cssVariable: n, color: r } of e)
                                if (o[t].includes(n)) {
                                  let e = RegExp(
                                    `(\\s*)(${n}\\s*:\\s*)([^;]+)(;.*)?$`,
                                  ).exec(o[t]);
                                  if (e) {
                                    let [n, s, i, a, l] = e,
                                      o = e.index || 0,
                                      d = `${s}${i}${r}${l || ""}`;
                                    c.push({
                                      lineIndex: t,
                                      matchStartIndex: o,
                                      matchLength: n.length,
                                      replacement: d,
                                    });
                                  }
                                  break;
                                }
                            }
                          }
                        }
                        if (0 === c.length) return;
                        c.sort((e, t) => t.lineIndex - e.lineIndex);
                        let u = s;
                        for (let e of c) {
                          let t =
                              s.split("\n").slice(0, e.lineIndex).join("\n")
                                .length +
                              +(e.lineIndex > 0) +
                              e.matchStartIndex,
                            n = t + e.matchLength;
                          u = u.slice(0, t) + e.replacement + u.slice(n);
                        }
                        n.current?.inlineEdit(i, 0, 0, s.length, u, t);
                      })(
                        e.map(({ tokenName: e, value: t }) => ({
                          cssVariable: `--${e}`,
                          color: t,
                        })),
                        o,
                        eX.designModeInlineEditRef,
                        r,
                      ),
                      e.forEach(({ tokenName: e, value: n, prevValue: r }) => {
                        let s = `--${e}`;
                        (0, e4.sendToIframeFromBlockId)(t, {
                          type: "devtools_sync_design",
                          payload: {
                            type: "css-var",
                            variable: s,
                            value: n,
                            prev: r || "",
                          },
                        });
                      }),
                      av({
                        token: f.token,
                        value: f.value,
                        theme: r,
                        designSystemId: p,
                      }));
                  }
                });
              },
              [t, s, i, a, d, l, c, r, p],
            ),
          };
        })(),
        i = (0, o.useMemo)(() => Object.keys(n).length > 0, [n]),
        l = (0, o.useMemo)(
          () => ({
            designTokens: t,
            currentTokens: n,
            updateToken: r,
            updateMultipleTokens: s,
            designTokensLoaded: i,
          }),
          [t, n, r, s, i],
        );
      return (0, a.jsx)(ab.Provider, { value: l, children: e });
    }
    function aj() {
      let e = (0, o.useContext)(ab);
      if (!e)
        throw Error(
          "useRootEditorTokens must be used within RootEditorTokensProvider",
        );
      return e;
    }
    var aC = e.i(840981),
      aw = e.i(494713);
    function ak({
      value: e,
      onValueChange: t,
      onValueChangeStart: n,
      onValueChangeEnd: r,
      max: s,
      min: i,
      step: l,
      className: c = "",
      decimalPlaces: d = 0,
    }) {
      let u = (e) =>
          0 === d ? e.toFixed(0) : e.toFixed(d).replace(/\.?0+$/, ""),
        [h, p] = (0, o.useState)(u(e[0] || 0)),
        [m, f] = (0, o.useState)(!1),
        g = u(e[0] || 0);
      return (
        m || h === g || p(g),
        (0, a.jsxs)("div", {
          className: `flex items-center gap-3 flex-1 ${c}`,
          children: [
            (0, a.jsx)(aw.Slider, {
              value: e,
              onValueChange: t,
              onPointerDown: (e) => {
                (e.stopPropagation(), n?.());
              },
              onPointerUp: (e) => {
                (e.stopPropagation(),
                  setTimeout(() => {
                    r?.();
                  }, 500));
              },
              max: s,
              min: i,
              step: l,
              className: "flex-1",
            }),
            (0, a.jsx)("input", {
              type: "number",
              value: h,
              onChange: (e) => {
                let n = e.target.value;
                p(n);
                let r = parseFloat(n);
                isNaN(r) || t([Math.max(i, Math.min(s, r))]);
              },
              onFocus: () => {
                (f(!0), n?.());
              },
              onBlur: () => {
                (f(!1), p(u(e[0] || 0)), r?.());
              },
              onKeyDown: (e) => {
                "Enter" === e.key && e.currentTarget.blur();
              },
              min: i,
              max: s,
              step: l,
              className:
                "text-label-13 font-mono border rounded-md text-v0-gray-1000 border-v0-alpha-400 bg-v0-background-100 h-8 w-12 text-center focus:outline-none focus:border-v0-blue-500 focus:ring-1 focus:ring-v0-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
            }),
          ],
        })
      );
    }
    let aN = [
        {
          name: "Default",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(222.2 84% 4.9%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(222.2 84% 4.9%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(222.2 84% 4.9%)",
              primary: "hsl(222.2 47.4% 11.2%)",
              "primary-foreground": "hsl(210 40% 98%)",
              secondary: "hsl(210 40% 96%)",
              "secondary-foreground": "hsl(222.2 84% 4.9%)",
              muted: "hsl(210 40% 96%)",
              "muted-foreground": "hsl(215.4 16.3% 46.9%)",
              accent: "hsl(210 40% 96%)",
              "accent-foreground": "hsl(222.2 84% 4.9%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(210 40% 98%)",
              border: "hsl(214.3 31.8% 91.4%)",
              input: "hsl(214.3 31.8% 91.4%)",
              ring: "hsl(222.2 84% 4.9%)",
              "chart-1": "hsl(12 76% 61%)",
              "chart-2": "hsl(173 58% 39%)",
              "chart-3": "hsl(197 37% 24%)",
              "chart-4": "hsl(43 74% 66%)",
              "chart-5": "hsl(27 87% 67%)",
              sidebar: "hsl(0 0% 98%)",
              "sidebar-foreground": "hsl(240 5.3% 26.1%)",
              "sidebar-primary": "hsl(240 5.9% 10%)",
              "sidebar-primary-foreground": "hsl(0 0% 98%)",
              "sidebar-accent": "hsl(240 4.8% 95.9%)",
              "sidebar-accent-foreground": "hsl(240 5.9% 10%)",
              "sidebar-border": "hsl(220 13% 91%)",
              "sidebar-ring": "hsl(217.2 91.2% 59.8%)",
            },
            dark: {
              background: "hsl(222.2 84% 4.9%)",
              foreground: "hsl(210 40% 98%)",
              card: "hsl(222.2 84% 4.9%)",
              "card-foreground": "hsl(210 40% 98%)",
              popover: "hsl(222.2 84% 4.9%)",
              "popover-foreground": "hsl(210 40% 98%)",
              primary: "hsl(210 40% 98%)",
              "primary-foreground": "hsl(222.2 84% 4.9%)",
              secondary: "hsl(217.2 32.6% 17.5%)",
              "secondary-foreground": "hsl(210 40% 98%)",
              muted: "hsl(217.2 32.6% 17.5%)",
              "muted-foreground": "hsl(215 20.2% 65.1%)",
              accent: "hsl(217.2 32.6% 17.5%)",
              "accent-foreground": "hsl(210 40% 98%)",
              destructive: "hsl(0 62.8% 30.6%)",
              "destructive-foreground": "hsl(210 40% 98%)",
              border: "hsl(217.2 32.6% 17.5%)",
              input: "hsl(217.2 32.6% 17.5%)",
              ring: "hsl(212.7 26.8% 83.9%)",
              "chart-1": "hsl(220 70% 50%)",
              "chart-2": "hsl(160 60% 45%)",
              "chart-3": "hsl(30 80% 55%)",
              "chart-4": "hsl(280 65% 60%)",
              "chart-5": "hsl(340 75% 55%)",
              sidebar: "hsl(240 5.9% 10%)",
              "sidebar-foreground": "hsl(240 4.8% 95.9%)",
              "sidebar-primary": "hsl(224.3 76.3% 94.1%)",
              "sidebar-primary-foreground": "hsl(240 5.9% 10%)",
              "sidebar-accent": "hsl(240 3.7% 15.9%)",
              "sidebar-accent-foreground": "hsl(240 4.8% 95.9%)",
              "sidebar-border": "hsl(240 3.7% 15.9%)",
              "sidebar-ring": "hsl(217.2 91.2% 59.8%)",
            },
          },
        },
        {
          name: "Blue",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(222.2 84% 4.9%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(222.2 84% 4.9%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(222.2 84% 4.9%)",
              primary: "hsl(221.2 83.2% 53.3%)",
              "primary-foreground": "hsl(210 40% 98%)",
              secondary: "hsl(210 40% 96%)",
              "secondary-foreground": "hsl(222.2 84% 4.9%)",
              muted: "hsl(210 40% 96%)",
              "muted-foreground": "hsl(215.4 16.3% 46.9%)",
              accent: "hsl(210 40% 96%)",
              "accent-foreground": "hsl(222.2 84% 4.9%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(210 40% 98%)",
              border: "hsl(214.3 31.8% 91.4%)",
              input: "hsl(214.3 31.8% 91.4%)",
              ring: "hsl(221.2 83.2% 53.3%)",
              "chart-1": "hsl(221.2 83.2% 53.3%)",
              "chart-2": "hsl(212 95% 68%)",
              "chart-3": "hsl(216 92% 60%)",
              "chart-4": "hsl(210 98% 78%)",
              "chart-5": "hsl(212 97% 87%)",
              sidebar: "hsl(0 0% 98%)",
              "sidebar-foreground": "hsl(240 5.3% 26.1%)",
              "sidebar-primary": "hsl(221.2 83.2% 53.3%)",
              "sidebar-primary-foreground": "hsl(210 40% 98%)",
              "sidebar-accent": "hsl(214.3 31.8% 91.4%)",
              "sidebar-accent-foreground": "hsl(222.2 84% 4.9%)",
              "sidebar-border": "hsl(214.3 31.8% 91.4%)",
              "sidebar-ring": "hsl(221.2 83.2% 53.3%)",
            },
            dark: {
              background: "hsl(222.2 84% 4.9%)",
              foreground: "hsl(210 40% 98%)",
              card: "hsl(222.2 84% 4.9%)",
              "card-foreground": "hsl(210 40% 98%)",
              popover: "hsl(222.2 84% 4.9%)",
              "popover-foreground": "hsl(210 40% 98%)",
              primary: "hsl(217.2 91.2% 59.8%)",
              "primary-foreground": "hsl(222.2 84% 4.9%)",
              secondary: "hsl(217.2 32.6% 17.5%)",
              "secondary-foreground": "hsl(210 40% 98%)",
              muted: "hsl(217.2 32.6% 17.5%)",
              "muted-foreground": "hsl(215 20.2% 65.1%)",
              accent: "hsl(217.2 32.6% 17.5%)",
              "accent-foreground": "hsl(210 40% 98%)",
              destructive: "hsl(0 62.8% 30.6%)",
              "destructive-foreground": "hsl(210 40% 98%)",
              border: "hsl(217.2 32.6% 17.5%)",
              input: "hsl(217.2 32.6% 17.5%)",
              ring: "hsl(224.3 76.3% 94.1%)",
              "chart-1": "hsl(217.2 91.2% 59.8%)",
              "chart-2": "hsl(212 95% 68%)",
              "chart-3": "hsl(216 92% 60%)",
              "chart-4": "hsl(210 98% 78%)",
              "chart-5": "hsl(212 97% 87%)",
              sidebar: "hsl(240 5.9% 10%)",
              "sidebar-foreground": "hsl(240 4.8% 95.9%)",
              "sidebar-primary": "hsl(217.2 91.2% 59.8%)",
              "sidebar-primary-foreground": "hsl(222.2 84% 4.9%)",
              "sidebar-accent": "hsl(217.2 32.6% 17.5%)",
              "sidebar-accent-foreground": "hsl(210 40% 98%)",
              "sidebar-border": "hsl(217.2 32.6% 17.5%)",
              "sidebar-ring": "hsl(217.2 91.2% 59.8%)",
            },
          },
        },
        {
          name: "Green",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(240 10% 3.9%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(240 10% 3.9%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(240 10% 3.9%)",
              primary: "hsl(142.1 76.2% 36.3%)",
              "primary-foreground": "hsl(355.7 100% 97.3%)",
              secondary: "hsl(240 4.8% 95.9%)",
              "secondary-foreground": "hsl(240 5.9% 10%)",
              muted: "hsl(240 4.8% 95.9%)",
              "muted-foreground": "hsl(240 3.8% 46.1%)",
              accent: "hsl(240 4.8% 95.9%)",
              "accent-foreground": "hsl(240 5.9% 10%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(0 0% 98%)",
              border: "hsl(240 5.9% 90%)",
              input: "hsl(240 5.9% 90%)",
              ring: "hsl(142.1 76.2% 36.3%)",
              "chart-1": "hsl(142.1 76.2% 36.3%)",
              "chart-2": "hsl(159 84% 45%)",
              "chart-3": "hsl(134 61% 41%)",
              "chart-4": "hsl(120 100% 25%)",
              "chart-5": "hsl(103 43% 50%)",
              sidebar: "hsl(0 0% 98%)",
              "sidebar-foreground": "hsl(240 5.3% 26.1%)",
              "sidebar-primary": "hsl(142.1 76.2% 36.3%)",
              "sidebar-primary-foreground": "hsl(355.7 100% 97.3%)",
              "sidebar-accent": "hsl(240 4.8% 95.9%)",
              "sidebar-accent-foreground": "hsl(240 5.9% 10%)",
              "sidebar-border": "hsl(240 5.9% 90%)",
              "sidebar-ring": "hsl(142.1 76.2% 36.3%)",
            },
            dark: {
              background: "hsl(20 14.3% 4.1%)",
              foreground: "hsl(0 0% 95%)",
              card: "hsl(24 9.8% 10%)",
              "card-foreground": "hsl(0 0% 95%)",
              popover: "hsl(0 0% 9%)",
              "popover-foreground": "hsl(0 0% 95%)",
              primary: "hsl(142.1 70.6% 45.3%)",
              "primary-foreground": "hsl(144.9 80.4% 10%)",
              secondary: "hsl(240 3.7% 15.9%)",
              "secondary-foreground": "hsl(0 0% 98%)",
              muted: "hsl(0 0% 15%)",
              "muted-foreground": "hsl(240 5% 64.9%)",
              accent: "hsl(12 6.5% 15.1%)",
              "accent-foreground": "hsl(0 0% 98%)",
              destructive: "hsl(0 62.8% 30.6%)",
              "destructive-foreground": "hsl(0 85.7% 97.3%)",
              border: "hsl(240 3.7% 15.9%)",
              input: "hsl(240 3.7% 15.9%)",
              ring: "hsl(142.4 71.8% 29.2%)",
              "chart-1": "hsl(142.1 70.6% 45.3%)",
              "chart-2": "hsl(159 84% 45%)",
              "chart-3": "hsl(134 61% 41%)",
              "chart-4": "hsl(120 100% 25%)",
              "chart-5": "hsl(103 43% 50%)",
              sidebar: "hsl(240 5.9% 10%)",
              "sidebar-foreground": "hsl(240 4.8% 95.9%)",
              "sidebar-primary": "hsl(142.1 70.6% 45.3%)",
              "sidebar-primary-foreground": "hsl(144.9 80.4% 10%)",
              "sidebar-accent": "hsl(240 3.7% 15.9%)",
              "sidebar-accent-foreground": "hsl(0 0% 98%)",
              "sidebar-border": "hsl(240 3.7% 15.9%)",
              "sidebar-ring": "hsl(142.1 70.6% 45.3%)",
            },
          },
        },
        {
          name: "Red",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(0 0% 3.9%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(0 0% 3.9%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(0 0% 3.9%)",
              primary: "hsl(0 72.2% 50.6%)",
              "primary-foreground": "hsl(0 85.7% 97.3%)",
              secondary: "hsl(0 0% 96.1%)",
              "secondary-foreground": "hsl(0 0% 9%)",
              muted: "hsl(0 0% 96.1%)",
              "muted-foreground": "hsl(0 0% 45.1%)",
              accent: "hsl(0 0% 96.1%)",
              "accent-foreground": "hsl(0 0% 9%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(0 0% 98%)",
              border: "hsl(0 0% 89.8%)",
              input: "hsl(0 0% 89.8%)",
              ring: "hsl(0 72.2% 50.6%)",
              "chart-1": "hsl(0 72.2% 50.6%)",
              "chart-2": "hsl(12 76% 61%)",
              "chart-3": "hsl(25 83% 53%)",
              "chart-4": "hsl(349 89% 60%)",
              "chart-5": "hsl(320 65% 52%)",
              sidebar: "hsl(0 0% 98%)",
              "sidebar-foreground": "hsl(240 5.3% 26.1%)",
              "sidebar-primary": "hsl(0 72.2% 50.6%)",
              "sidebar-primary-foreground": "hsl(0 85.7% 97.3%)",
              "sidebar-accent": "hsl(0 0% 96.1%)",
              "sidebar-accent-foreground": "hsl(0 0% 9%)",
              "sidebar-border": "hsl(0 0% 89.8%)",
              "sidebar-ring": "hsl(0 72.2% 50.6%)",
            },
            dark: {
              background: "hsl(0 0% 3.9%)",
              foreground: "hsl(0 0% 98%)",
              card: "hsl(0 0% 3.9%)",
              "card-foreground": "hsl(0 0% 98%)",
              popover: "hsl(0 0% 3.9%)",
              "popover-foreground": "hsl(0 0% 98%)",
              primary: "hsl(0 72.2% 50.6%)",
              "primary-foreground": "hsl(0 85.7% 97.3%)",
              secondary: "hsl(0 0% 14.9%)",
              "secondary-foreground": "hsl(0 0% 98%)",
              muted: "hsl(0 0% 14.9%)",
              "muted-foreground": "hsl(0 0% 63.9%)",
              accent: "hsl(0 0% 14.9%)",
              "accent-foreground": "hsl(0 0% 98%)",
              destructive: "hsl(0 62.8% 30.6%)",
              "destructive-foreground": "hsl(0 0% 98%)",
              border: "hsl(0 0% 14.9%)",
              input: "hsl(0 0% 14.9%)",
              ring: "hsl(0 72.2% 50.6%)",
              "chart-1": "hsl(0 72.2% 50.6%)",
              "chart-2": "hsl(12 76% 61%)",
              "chart-3": "hsl(25 83% 53%)",
              "chart-4": "hsl(349 89% 60%)",
              "chart-5": "hsl(320 65% 52%)",
              sidebar: "hsl(240 5.9% 10%)",
              "sidebar-foreground": "hsl(240 4.8% 95.9%)",
              "sidebar-primary": "hsl(0 72.2% 50.6%)",
              "sidebar-primary-foreground": "hsl(0 85.7% 97.3%)",
              "sidebar-accent": "hsl(0 0% 14.9%)",
              "sidebar-accent-foreground": "hsl(0 0% 98%)",
              "sidebar-border": "hsl(0 0% 14.9%)",
              "sidebar-ring": "hsl(0 72.2% 50.6%)",
            },
          },
        },
        {
          name: "Rose",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(15 18% 12%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(15 18% 12%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(15 18% 12%)",
              primary: "hsl(350 70% 42%)",
              "primary-foreground": "hsl(352 100% 97%)",
              secondary: "hsl(10 12% 94%)",
              "secondary-foreground": "hsl(15 18% 12%)",
              muted: "hsl(10 12% 94%)",
              "muted-foreground": "hsl(15 10% 48%)",
              accent: "hsl(15 35% 88%)",
              "accent-foreground": "hsl(15 18% 12%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(352 100% 97%)",
              border: "hsl(12 18% 89%)",
              input: "hsl(12 18% 89%)",
              ring: "hsl(350 70% 42%)",
              "chart-1": "hsl(350 70% 42%)",
              "chart-2": "hsl(12 68% 58%)",
              "chart-3": "hsl(25 75% 65%)",
              "chart-4": "hsl(340 85% 62%)",
              "chart-5": "hsl(325 72% 55%)",
              sidebar: "hsl(8 15% 97%)",
              "sidebar-foreground": "hsl(15 18% 12%)",
              "sidebar-primary": "hsl(350 70% 42%)",
              "sidebar-primary-foreground": "hsl(352 100% 97%)",
              "sidebar-accent": "hsl(15 35% 88%)",
              "sidebar-accent-foreground": "hsl(15 18% 12%)",
              "sidebar-border": "hsl(12 18% 89%)",
              "sidebar-ring": "hsl(350 70% 42%)",
            },
            dark: {
              background: "hsl(15 22% 7%)",
              foreground: "hsl(12 12% 93%)",
              card: "hsl(15 22% 7%)",
              "card-foreground": "hsl(12 12% 93%)",
              popover: "hsl(15 22% 7%)",
              "popover-foreground": "hsl(12 12% 93%)",
              primary: "hsl(350 75% 58%)",
              "primary-foreground": "hsl(15 22% 7%)",
              secondary: "hsl(15 15% 16%)",
              "secondary-foreground": "hsl(12 12% 93%)",
              muted: "hsl(15 15% 16%)",
              "muted-foreground": "hsl(12 8% 68%)",
              accent: "hsl(20 25% 22%)",
              "accent-foreground": "hsl(12 12% 93%)",
              destructive: "hsl(0 72.2% 50.6%)",
              "destructive-foreground": "hsl(12 12% 93%)",
              border: "hsl(15 15% 16%)",
              input: "hsl(15 15% 16%)",
              ring: "hsl(350 75% 58%)",
              "chart-1": "hsl(350 75% 58%)",
              "chart-2": "hsl(12 68% 58%)",
              "chart-3": "hsl(25 75% 65%)",
              "chart-4": "hsl(340 85% 62%)",
              "chart-5": "hsl(325 72% 55%)",
              sidebar: "hsl(15 18% 11%)",
              "sidebar-foreground": "hsl(12 12% 93%)",
              "sidebar-primary": "hsl(350 75% 58%)",
              "sidebar-primary-foreground": "hsl(15 22% 7%)",
              "sidebar-accent": "hsl(20 25% 22%)",
              "sidebar-accent-foreground": "hsl(12 12% 93%)",
              "sidebar-border": "hsl(15 15% 16%)",
              "sidebar-ring": "hsl(350 75% 58%)",
            },
          },
        },
        {
          name: "Stone",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(25 20% 15%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(25 20% 15%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(25 20% 15%)",
              primary: "hsl(33 54% 38%)",
              "primary-foreground": "hsl(60 9.1% 97.8%)",
              secondary: "hsl(30 12% 92%)",
              "secondary-foreground": "hsl(25 20% 15%)",
              muted: "hsl(30 12% 92%)",
              "muted-foreground": "hsl(25 8% 45%)",
              accent: "hsl(30 25% 85%)",
              "accent-foreground": "hsl(25 20% 15%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(60 9.1% 97.8%)",
              border: "hsl(30 15% 88%)",
              input: "hsl(30 15% 88%)",
              ring: "hsl(33 54% 38%)",
              "chart-1": "hsl(33 54% 38%)",
              "chart-2": "hsl(28 40% 52%)",
              "chart-3": "hsl(35 35% 68%)",
              "chart-4": "hsl(42 28% 75%)",
              "chart-5": "hsl(25 45% 28%)",
              sidebar: "hsl(30 8% 97%)",
              "sidebar-foreground": "hsl(25 20% 15%)",
              "sidebar-primary": "hsl(33 54% 38%)",
              "sidebar-primary-foreground": "hsl(60 9.1% 97.8%)",
              "sidebar-accent": "hsl(30 25% 85%)",
              "sidebar-accent-foreground": "hsl(25 20% 15%)",
              "sidebar-border": "hsl(30 15% 88%)",
              "sidebar-ring": "hsl(33 54% 38%)",
            },
            dark: {
              background: "hsl(25 15% 8%)",
              foreground: "hsl(30 8% 92%)",
              card: "hsl(25 15% 8%)",
              "card-foreground": "hsl(30 8% 92%)",
              popover: "hsl(25 15% 8%)",
              "popover-foreground": "hsl(30 8% 92%)",
              primary: "hsl(33 54% 58%)",
              "primary-foreground": "hsl(25 15% 8%)",
              secondary: "hsl(25 10% 18%)",
              "secondary-foreground": "hsl(30 8% 92%)",
              muted: "hsl(25 10% 18%)",
              "muted-foreground": "hsl(30 6% 65%)",
              accent: "hsl(28 15% 25%)",
              "accent-foreground": "hsl(30 8% 92%)",
              destructive: "hsl(0 72.2% 50.6%)",
              "destructive-foreground": "hsl(30 8% 92%)",
              border: "hsl(25 10% 18%)",
              input: "hsl(25 10% 18%)",
              ring: "hsl(33 54% 58%)",
              "chart-1": "hsl(33 54% 58%)",
              "chart-2": "hsl(28 40% 52%)",
              "chart-3": "hsl(35 35% 68%)",
              "chart-4": "hsl(42 28% 75%)",
              "chart-5": "hsl(25 45% 38%)",
              sidebar: "hsl(25 12% 12%)",
              "sidebar-foreground": "hsl(30 8% 92%)",
              "sidebar-primary": "hsl(33 54% 58%)",
              "sidebar-primary-foreground": "hsl(25 15% 8%)",
              "sidebar-accent": "hsl(28 15% 25%)",
              "sidebar-accent-foreground": "hsl(30 8% 92%)",
              "sidebar-border": "hsl(25 10% 18%)",
              "sidebar-ring": "hsl(33 54% 58%)",
            },
          },
        },
        {
          name: "Slate",
          shadcnStyle: {
            light: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(215 25% 18%)",
              card: "hsl(0 0% 100%)",
              "card-foreground": "hsl(215 25% 18%)",
              popover: "hsl(0 0% 100%)",
              "popover-foreground": "hsl(215 25% 18%)",
              primary: "hsl(215 45% 32%)",
              "primary-foreground": "hsl(210 40% 98%)",
              secondary: "hsl(215 15% 93%)",
              "secondary-foreground": "hsl(215 25% 18%)",
              muted: "hsl(215 15% 93%)",
              "muted-foreground": "hsl(215 12% 48%)",
              accent: "hsl(215 25% 85%)",
              "accent-foreground": "hsl(215 25% 18%)",
              destructive: "hsl(0 84.2% 60.2%)",
              "destructive-foreground": "hsl(210 40% 98%)",
              border: "hsl(215 18% 88%)",
              input: "hsl(215 18% 88%)",
              ring: "hsl(215 45% 32%)",
              "chart-1": "hsl(215 45% 32%)",
              "chart-2": "hsl(220 38% 45%)",
              "chart-3": "hsl(210 32% 58%)",
              "chart-4": "hsl(205 25% 68%)",
              "chart-5": "hsl(218 52% 22%)",
              sidebar: "hsl(215 12% 97%)",
              "sidebar-foreground": "hsl(215 25% 18%)",
              "sidebar-primary": "hsl(215 45% 32%)",
              "sidebar-primary-foreground": "hsl(210 40% 98%)",
              "sidebar-accent": "hsl(215 25% 85%)",
              "sidebar-accent-foreground": "hsl(215 25% 18%)",
              "sidebar-border": "hsl(215 18% 88%)",
              "sidebar-ring": "hsl(215 45% 32%)",
            },
            dark: {
              background: "hsl(215 28% 9%)",
              foreground: "hsl(215 15% 92%)",
              card: "hsl(215 28% 9%)",
              "card-foreground": "hsl(215 15% 92%)",
              popover: "hsl(215 28% 9%)",
              "popover-foreground": "hsl(215 15% 92%)",
              primary: "hsl(215 45% 62%)",
              "primary-foreground": "hsl(215 28% 9%)",
              secondary: "hsl(215 20% 18%)",
              "secondary-foreground": "hsl(215 15% 92%)",
              muted: "hsl(215 20% 18%)",
              "muted-foreground": "hsl(215 10% 65%)",
              accent: "hsl(215 25% 28%)",
              "accent-foreground": "hsl(215 15% 92%)",
              destructive: "hsl(0 72.2% 50.6%)",
              "destructive-foreground": "hsl(215 15% 92%)",
              border: "hsl(215 20% 18%)",
              input: "hsl(215 20% 18%)",
              ring: "hsl(215 45% 62%)",
              "chart-1": "hsl(215 45% 62%)",
              "chart-2": "hsl(220 38% 55%)",
              "chart-3": "hsl(210 32% 68%)",
              "chart-4": "hsl(205 25% 78%)",
              "chart-5": "hsl(218 52% 42%)",
              sidebar: "hsl(215 25% 12%)",
              "sidebar-foreground": "hsl(215 15% 92%)",
              "sidebar-primary": "hsl(215 45% 62%)",
              "sidebar-primary-foreground": "hsl(215 28% 9%)",
              "sidebar-accent": "hsl(215 25% 28%)",
              "sidebar-accent-foreground": "hsl(215 15% 92%)",
              "sidebar-border": "hsl(215 20% 18%)",
              "sidebar-ring": "hsl(215 45% 62%)",
            },
          },
        },
      ],
      aM = (0, o.memo)(function ({ label: e, tokenName: t }) {
        let {
            designTokens: n,
            currentTokens: r,
            updateToken: s,
            designTokensLoaded: i,
          } = aj(),
          l = (0, o.useCallback)(
            (e, t, n) => {
              let i = r[e] || "";
              s(e, t, { prevValue: i, isPreview: n });
            },
            [r, s],
          );
        return (0, a.jsx)(af, {
          tokenName: t,
          designTokens: n,
          onColorChange: l,
          designTokensLoaded: i,
          nameInInput: e,
        });
      });
    function aS({ children: e }) {
      return (0, a.jsx)("div", {
        className: "grid grid-cols-1 @[400px]/colors:grid-cols-2 gap-3",
        children: e,
      });
    }
    function aI() {
      let [e, t] = (0, o.useState)(!1),
        [n, r] = (0, o.useState)([0]),
        [s, i] = (0, o.useState)([1]),
        [l, c] = (0, o.useState)([1]),
        d = (0, m.useActiveBlockState)(),
        u = d?.id,
        { designTokens: h } = aj(),
        p = iX(h),
        { updateMultipleTokens: f } = aj(),
        g = (0, o.useRef)(null);
      (0, o.useEffect)(() => {
        Object.keys(p).length > 0 && !g.current && (g.current = { ...p });
      }, [p]);
      let x = (0, o.useCallback)(
          (e, t, r) => {
            let i = g.current || p;
            if (!u) return;
            let a = e ?? n[0],
              o = t ?? s[0],
              c = r ?? l[0];
            (0 === a && 1 === o && 1 === c) ||
              f(
                Object.entries(
                  (function (e, t, n, r) {
                    let s = {};
                    for (let [i, a] of Object.entries(e)) {
                      let e = (function (e, t, n, r) {
                        let s = no(e);
                        if (!s) return e;
                        let i = se(s);
                        return ss({
                          ...i,
                          h: void 0 !== i.h ? (i.h + t + 360) % 360 : 0,
                          s: Math.min(1, Math.max(0, (i.s || 0) * n)),
                          l: Math.min(1, Math.max(0, (i.l || 0) * r)),
                        });
                      })(a.trim(), t, n, r);
                      s[i] = e;
                    }
                    return s;
                  })(i, a, o, c),
                ).map(([e, t]) => ({
                  tokenName: e,
                  value: t,
                  prevValue: i[e] || "",
                })),
                {
                  isPreview: !0,
                  batchName: "batch_palette",
                  customTracking: {
                    token: "color-adjustments",
                    value: `hue:${a},saturation:${o},lightness:${c}`,
                  },
                },
              );
          },
          [p, u, n, s, l, f],
        ),
        v = (0, o.useCallback)(() => {
          let e = g.current || p;
          u &&
            f(
              Object.entries(e).map(([e, t]) => ({
                tokenName: e,
                value: t,
                prevValue: t,
              })),
              {
                isPreview: !1,
                batchName: "palette_reset",
                customTracking: { token: "palette-reset", value: "reset" },
              },
            );
        }, [p, u, f]);
      return (0, a.jsxs)(tw.Popover, {
        open: e,
        onOpenChange: (e) => {
          (e &&
            Object.keys(p).length > 0 &&
            ((g.current = { ...p }), r([0]), i([1]), c([1])),
            t(e));
        },
        children: [
          (0, a.jsx)(tw.PopoverTrigger, {
            asChild: !0,
            children: (0, a.jsx)(D.Button, {
              variant: "ghost",
              size: "sm",
              tooltip: "Adjustments",
              className: "gap-2 size-7 rounded-md",
              onClick: () => t(!0),
              children: (0, a.jsx)(aC.SettingsSliders, {}),
            }),
          }),
          (0, a.jsx)(tw.PopoverContent, {
            className: "p-4",
            align: "end",
            side: "bottom",
            children: (0, a.jsxs)("div", {
              className: "flex flex-col gap-4",
              onClick: (e) => e.stopPropagation(),
              children: [
                (0, a.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "text-label-12 text-v0-gray-900",
                          style: { width: "80px" },
                          children: "Hue",
                        }),
                        (0, a.jsx)(ak, {
                          value: n,
                          onValueChange: (e) => {
                            (r(e), x(e[0], s[0], l[0]));
                          },
                          max: 180,
                          min: -180,
                          step: 5,
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "text-label-12 text-v0-gray-900",
                          style: { width: "80px" },
                          children: "Saturation",
                        }),
                        (0, a.jsx)(ak, {
                          value: s.map((e) => 100 * e),
                          onValueChange: (e) => {
                            let t = e[0] / 100;
                            (i([t]), x(n[0], t, l[0]));
                          },
                          max: 200,
                          min: 0,
                          step: 10,
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "text-label-12 text-v0-gray-900",
                          style: { width: "80px" },
                          children: "Lightness",
                        }),
                        (0, a.jsx)(ak, {
                          value: l.map((e) => 100 * e),
                          onValueChange: (e) => {
                            let t = e[0] / 100;
                            (c([t]), x(n[0], s[0], t));
                          },
                          max: 150,
                          min: 50,
                          step: 10,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "flex justify-end",
                  children: (0, a.jsx)(D.Button, {
                    variant: "secondary",
                    size: "sm",
                    onClick: (e) => {
                      (e.preventDefault(),
                        e.stopPropagation(),
                        r([0]),
                        i([1]),
                        c([1]),
                        v());
                    },
                    children: "Reset",
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    function aL({ onBack: e }) {
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(iG, {
            title: "Colors",
            onBack: e,
            action: (0, a.jsx)(aI, {}),
          }),
          (0, a.jsx)("div", {
            className: "flex-1 overflow-auto @container/colors",
            children: (0, a.jsxs)("div", {
              className: "flex flex-col",
              children: [
                (0, a.jsx)(sw, {
                  title: "Primary",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Primary",
                        tokenName: "primary",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Primary Foreground",
                        tokenName: "primary-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Secondary",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Secondary",
                        tokenName: "secondary",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Secondary Foreground",
                        tokenName: "secondary-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Accent",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, { label: "Accent", tokenName: "accent" }),
                      (0, a.jsx)(aM, {
                        label: "Accent Foreground",
                        tokenName: "accent-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Base",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Background",
                        tokenName: "background",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Foreground",
                        tokenName: "foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Card",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, { label: "Card", tokenName: "card" }),
                      (0, a.jsx)(aM, {
                        label: "Card Foreground",
                        tokenName: "card-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Popover",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Popover",
                        tokenName: "popover",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Popover Foreground",
                        tokenName: "popover-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Muted",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, { label: "Muted", tokenName: "muted" }),
                      (0, a.jsx)(aM, {
                        label: "Muted Foreground",
                        tokenName: "muted-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Destructive",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Destructive",
                        tokenName: "destructive",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Destructive Foreground",
                        tokenName: "destructive-foreground",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Border & Input",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, { label: "Border", tokenName: "border" }),
                      (0, a.jsx)(aM, { label: "Input", tokenName: "input" }),
                      (0, a.jsx)(aM, { label: "Ring", tokenName: "ring" }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Chart",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Chart 1",
                        tokenName: "chart-1",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Chart 2",
                        tokenName: "chart-2",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Chart 3",
                        tokenName: "chart-3",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Chart 4",
                        tokenName: "chart-4",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Chart 5",
                        tokenName: "chart-5",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(sw, {
                  title: "Sidebar",
                  children: (0, a.jsxs)(aS, {
                    children: [
                      (0, a.jsx)(aM, {
                        label: "Sidebar",
                        tokenName: "sidebar",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Foreground",
                        tokenName: "sidebar-foreground",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Primary",
                        tokenName: "sidebar-primary",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Primary Foreground",
                        tokenName: "sidebar-primary-foreground",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Accent",
                        tokenName: "sidebar-accent",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Accent Foreground",
                        tokenName: "sidebar-accent-foreground",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Border",
                        tokenName: "sidebar-border",
                      }),
                      (0, a.jsx)(aM, {
                        label: "Sidebar Ring",
                        tokenName: "sidebar-ring",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    function aT({ designTokens: e, onClick: t }) {
      let [n, r] = (0, o.useState)(!1),
        s = (0, m.useActiveBlockState)(),
        i = s?.id,
        l = iX(e),
        { updateMultipleTokens: c } = aj(),
        { atoms: d } = (0, e5.useCurrentBlockDesignMode)(),
        u = (0, sJ.useAtomValue)(d.previewTheme),
        h = (0, o.useMemo)(
          () =>
            0 === Object.keys(l).length
              ? null
              : {
                  light: "light" === u ? l : {},
                  dark: "dark" === u ? l : {},
                  common: { radius: "0.5rem" },
                },
          [l, u],
        ),
        p = (0, o.useMemo)(() => {
          let e = h ? { name: "Current", shadcnStyle: h } : null;
          return e ? [e, ...aN] : aN;
        }, [h]);
      return (0, a.jsxs)(iU, {
        className:
          "hover:has-[.palette-swatch:hover]:bg-transparent dark:hover:has-[.palette-swatch:hover]:bg-transparent",
        children: [
          (0, a.jsx)(iW, {
            onClick: t,
            className: "group",
            action: (0, a.jsx)(iZ, {}),
            children: "Colors",
          }),
          (0, a.jsx)("div", {
            className: "px-3 pb-3",
            children: (0, a.jsxs)(en.DropdownMenu, {
              open: n,
              onOpenChange: r,
              children: [
                (0, a.jsx)(en.DropdownMenuTrigger, {
                  asChild: !0,
                  children: (0, a.jsx)("button", {
                    className:
                      "palette-swatch w-full hover:brightness-90 dark:hover:brightness-110 transition-all duration-150",
                    children: h
                      ? (0, a.jsx)(iF.DesignSystemMiniPreview, {
                          shadcnStyle: h,
                          size: "long",
                          theme: u,
                        })
                      : (0, a.jsx)(iF.EmptyDesignSystemMiniPreview, {
                          size: "long",
                        }),
                  }),
                }),
                (0, a.jsx)(en.DropdownMenuContent, {
                  className: "max-h-80 overflow-y-auto",
                  align: "center",
                  style: { width: "var(--radix-popper-anchor-width)" },
                  children: (0, a.jsx)(en.DropdownMenuGroup, {
                    children: p.map((e) =>
                      (0, a.jsx)(
                        en.DropdownMenuItem,
                        {
                          className: "px-2 py-2 h-auto",
                          onClick: () => {
                            (console.log("Selected palette:", e.name),
                              i &&
                                c(
                                  Object.entries(e.shadcnStyle[u]).map(
                                    ([e, t]) => ({
                                      tokenName: e,
                                      value: t,
                                      prevValue: l[e] || "",
                                    }),
                                  ),
                                  {
                                    isPreview: !1,
                                    batchName: "palette_batch",
                                    customTracking: {
                                      token: "color-preset",
                                      value: e.name,
                                    },
                                  },
                                ),
                              r(!1));
                          },
                          children: (0, a.jsx)(iF.DesignSystemMiniPreview, {
                            shadcnStyle: e.shadcnStyle,
                            size: "long",
                            theme: u,
                          }),
                        },
                        e.name,
                      ),
                    ),
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    let aE = (0, eK.default)((e) => {
      (0, L.track)("EditDesignSystemToken", {
        designSystemId: e.designSystemId,
        token: e.token,
        value: e.value,
        theme: e.theme,
        editor: "design-mode",
      });
    }, 1e3);
    function a_({ designTokens: e }) {
      let t = (0, m.useActiveBlockState)(),
        n = t?.id,
        r = e.common.radius || "0.5rem",
        s = (e) => {
          let t = e.match(/([0-9.]+)\w*rem/),
            n = e.match(/([0-9.]+)\w*(px)?/);
          return t ? parseFloat(t[1]) : n ? parseFloat(n[1]) / 16 : 0.5;
        },
        [i, l] = (0, o.useState)([s(r)]),
        [c, d] = (0, o.useState)(!1),
        { atoms: u } = (0, e5.useCurrentBlockDesignMode)(),
        h = (0, sJ.useAtomValue)(u.previewTheme),
        {
          queueVersion: p,
          lastIsPreview: f,
          setLastFileContent: g,
          setLastIsPreview: x,
          setSaveNextState: v,
        } = sQ(),
        b = (0, y.useChatId)(),
        { pushHistory: C } = sK(),
        { data: w } = (0, j.useServerQuerySWR)(
          ["chat", "attributes"],
          { chatId: b },
          { stopFetch: !b },
        ),
        k = w?.ok ? w.value.designSystemId : null;
      (0, o.useEffect)(() => {
        e.common.radius && !c && l([s(e.common.radius)]);
      }, [e.common.radius, c]);
      let N = (0, o.useCallback)(
        (e, t, s = !1) => {
          let i;
          l(e);
          let a = ((i = e[0].toFixed(3).replace(/\.?0+$/, "")), `${i}rem`),
            o = "radius",
            c = Date.now();
          p("CSS:" + o, c, () => {
            if (!eX.designModeInlineEditRef.current || !n) return;
            let e = `--${o}`;
            if (!s) {
              if ((t && !f) || (!f && !t)) {
                let { path: t, content: n } = (0,
                ir.getGlobalsCssWithInlineEdit)(eX.designModeInlineEditRef);
                n?.includes(e) && g({ file: t, content: n });
              }
              let { path: n } = (0, ir.getGlobalsCssWithInlineEdit)(
                eX.designModeInlineEditRef,
              );
              n && C(n);
            }
            (t ? x(!0) : (x(!1), v(!0)),
              (0, e4.sendToIframeFromBlockId)(n, {
                type: "devtools_sync_design",
                payload: { type: "css-var", variable: e, value: a, prev: r },
              }),
              ag(e, a, c, eX.designModeInlineEditRef, h),
              aE({ token: o, value: a, theme: h, designSystemId: k }));
          });
        },
        [r, p, n, f, g, x, v, C, h, k],
      );
      return (0, a.jsx)(iU, {
        children: (0, a.jsxs)("div", {
          className: "flex items-center gap-3 px-3 py-3",
          children: [
            (0, a.jsx)("div", {
              className: "flex items-center gap-2",
              style: { width: "60px" },
              children: (0, a.jsx)("p", {
                className: "text-label-12 select-none font-medium",
                children: "Radius",
              }),
            }),
            (0, a.jsx)(ak, {
              value: i,
              onValueChange: N,
              onValueChangeStart: () => d(!0),
              onValueChangeEnd: () => d(!1),
              max: 3,
              min: 0,
              step: 0.125,
              decimalPlaces: 3,
            }),
          ],
        }),
      });
    }
    let aA = (0, e9.withNewIcon)(
        '<rect opacity="0.5" x="7.75" y="6.75" width="18.5" height="10.5" rx="2.25" stroke="var(--v0-gray-900)" stroke-width="1.5"/><rect x="7.75" y="5.75" width="18.5" height="10.5" rx="2.25" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      aR = (0, e9.withNewIcon)(
        '<rect opacity="0.5" x="7.75" y="5.75" width="18.5" height="13.5" rx="2.25" fill="var(--v0-gray-900)" stroke="var(--v0-gray-900)" stroke-width="1.5"/><rect x="7.75" y="5.75" width="18.5" height="10.5" rx="2.25" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      aP = (0, e9.withNewIcon)(
        '<rect opacity="0.5" x="7.75" y="6.75" width="18.5" height="14.5" rx="2.25" fill="var(--v0-gray-900)" stroke="var(--v0-gray-900)" stroke-width="1.5"/><rect x="7.75" y="5.75" width="18.5" height="10.5" rx="2.25" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      aD = (0, e9.withNewIcon)(
        '<rect x="6.75" y="6.75" width="18.5" height="10.5" rx="2.25" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      aV = (0, e9.withNewIcon)(
        '<rect opacity="0.5" x="4.75" y="4.75" width="22.5" height="14.5" rx="4.25" fill="var(--v0-gray-900)" stroke="var(--v0-gray-900)" stroke-width="1.5"/><rect x="6.75" y="6.75" width="18.5" height="10.5" rx="2.25" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      a$ = (0, e9.withNewIcon)(
        '<rect opacity="0.5" x="7.75" y="7.75" width="18.5" height="10.5" fill="var(--v0-gray-900)" stroke="var(--v0-gray-900)" stroke-width="1.5"/><rect x="5.75" y="5.75" width="18.5" height="10.5" fill="var(--v0-white)" stroke="var(--v0-gray-900)" stroke-width="1.5"/>',
        { viewBox: "0 0 32 24" },
      ),
      aF = {
        serialize: (e) => `${e}px`,
        deserialize: (e) => (e && parseInt(e.replace("px", ""))) || 0,
      },
      az = [
        { name: "Small", x: 0, y: 1, blur: 4, spread: 0, opacity: 20 },
        { name: "Medium", x: 0, y: 2, blur: 6, spread: 0, opacity: 40 },
        { name: "Large", x: 0, y: 4, blur: 12, spread: -1, opacity: 80 },
        { name: "None", x: 0, y: 0, blur: 0, spread: 0, opacity: 0 },
        { name: "Glow", x: 0, y: 0, blur: 4, spread: 0, opacity: 40 },
        { name: "Solid", x: 4, y: 4, blur: 0, spread: 0, opacity: 15 },
      ];
    function aH({ preset: e, isSelected: t, onClick: n }) {
      let r = ((e) => {
        switch (e) {
          case "Small":
            return aA;
          case "Medium":
            return aR;
          case "Large":
            return aP;
          case "None":
          default:
            return aD;
          case "Glow":
            return aV;
          case "Solid":
            return a$;
        }
      })(e.name);
      return (0, a.jsxs)("button", {
        className: `shadow-card relative flex flex-col items-center justify-start pt-3 pb-2 h-16 rounded-md border transition-all duration-150 ${t ? "border-v0-gray-900 bg-v0-alpha-100" : "border-v0-alpha-400 hover:border-v0-alpha-600 hover:bg-v0-alpha-50"}`,
        onClick: n,
        children: [
          (0, a.jsx)(r, { className: "size-8" }),
          (0, a.jsx)("span", {
            className: "text-label-13 font-medium text-v0-gray-900 mt-1",
            children: e.name,
          }),
        ],
      });
    }
    let aB = {
      "shadow-x": {
        transformer: aF,
        defaultValue: 0,
        min: -20,
        max: 20,
        step: 1,
        label: "X Offset",
      },
      "shadow-y": {
        transformer: aF,
        defaultValue: 0,
        min: -20,
        max: 20,
        step: 1,
        label: "Y Offset",
      },
      "shadow-blur": {
        transformer: aF,
        defaultValue: 4,
        min: 0,
        max: 20,
        step: 1,
        label: "Blur",
      },
      "shadow-spread": {
        transformer: aF,
        defaultValue: 0,
        min: -5,
        max: 10,
        step: 1,
        label: "Spread",
      },
      "shadow-opacity": {
        transformer: {
          serialize: (e) => (e / 100).toString(),
          deserialize: (e) => Math.round(100 * parseFloat(e)),
        },
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 5,
        label: "Opacity",
      },
    };
    function aO({ onClick: e }) {
      let { updateMultipleTokens: t, currentTokens: n } = aj(),
        r = (0, o.useCallback)(
          (e) => {
            let t = (e) => aB[e].transformer.deserialize(n[e]);
            return (
              t("shadow-x") === e.x &&
              t("shadow-y") === e.y &&
              t("shadow-blur") === e.blur &&
              t("shadow-spread") === e.spread &&
              t("shadow-opacity") === e.opacity
            );
          },
          [n],
        );
      return (0, a.jsxs)(iU, {
        className:
          "hover:has-[.shadow-card:hover]:bg-transparent dark:hover:has-[.shadow-card:hover]:bg-transparent",
        children: [
          (0, a.jsx)(iW, {
            onClick: e,
            className: "group",
            action: (0, a.jsx)(iZ, {}),
            children: "Shadows",
          }),
          (0, a.jsx)("div", {
            className: "grid grid-cols-3 gap-3 p-3 pt-0",
            children: az.map((e) =>
              (0, a.jsx)(
                aH,
                {
                  preset: e,
                  isSelected: r(e),
                  onClick: (r) => {
                    (r.stopPropagation(),
                      t(
                        [
                          {
                            tokenName: "shadow-x",
                            value: aB["shadow-x"].transformer.serialize(e.x),
                            prevValue: n["shadow-x"] || "",
                          },
                          {
                            tokenName: "shadow-y",
                            value: aB["shadow-y"].transformer.serialize(e.y),
                            prevValue: n["shadow-y"] || "",
                          },
                          {
                            tokenName: "shadow-blur",
                            value: aB["shadow-blur"].transformer.serialize(
                              e.blur,
                            ),
                            prevValue: n["shadow-blur"] || "",
                          },
                          {
                            tokenName: "shadow-spread",
                            value: aB["shadow-spread"].transformer.serialize(
                              e.spread,
                            ),
                            prevValue: n["shadow-spread"] || "",
                          },
                          {
                            tokenName: "shadow-opacity",
                            value: aB["shadow-opacity"].transformer.serialize(
                              e.opacity,
                            ),
                            prevValue: n["shadow-opacity"] || "",
                          },
                        ],
                        {
                          isPreview: !1,
                          batchName: "batch_shadow_preset",
                          customTracking: {
                            token: "shadow-preset",
                            value: e.name,
                          },
                        },
                      ));
                  },
                },
                e.name,
              ),
            ),
          }),
        ],
      });
    }
    function aU({ onBack: e }) {
      let {
          updateToken: t,
          currentTokens: n,
          designTokens: r,
          designTokensLoaded: s,
        } = aj(),
        i = (0, o.useCallback)(
          (e, n) => {
            let r = aB[e].transformer.serialize(n[0]);
            t(e, r);
          },
          [t],
        ),
        l = (0, o.useCallback)(
          (e, n) => {
            t(e, n);
          },
          [t],
        );
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(iG, { title: "Shadows", onBack: e }),
          (0, a.jsx)("div", {
            className: "flex-1 overflow-auto",
            children: (0, a.jsxs)("div", {
              className: "flex flex-col gap-4 p-4",
              children: [
                Object.entries(aB).map(([e, t]) => {
                  let r = n[e],
                    s = t.transformer.deserialize(r);
                  return (0, a.jsxs)(
                    "div",
                    {
                      className: "flex items-center gap-3",
                      children: [
                        (0, a.jsx)("span", {
                          className: "text-label-12 text-v0-gray-900",
                          style: { width: "80px" },
                          children: t.label,
                        }),
                        (0, a.jsx)(ak, {
                          value: [s],
                          onValueChange: (t) => i(e, t),
                          max: t.max,
                          min: t.min,
                          step: t.step,
                        }),
                      ],
                    },
                    e,
                  );
                }),
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, a.jsx)("label", {
                      className: "text-label-12 text-v0-gray-900",
                      style: { width: "80px" },
                      children: "Color",
                    }),
                    (0, a.jsx)(af, {
                      tokenName: "shadow-color",
                      designTokens: r,
                      onColorChange: l,
                      designTokensLoaded: s,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
    }
    var aW = e.i(636159);
    let aZ = RegExp(
        "-(background|foreground|card|card-foreground|popover|popover-foreground|primary|primary-foreground|secondary|secondary-foreground|muted|muted-foreground|accent|accent-foreground|destructive|destructive-foreground|border|input|ring|chart-1|chart-2|chart-3|chart-4|chart-5|sidebar|sidebar-foreground|sidebar-primary|sidebar-primary-foreground|sidebar-accent|sidebar-accent-foreground|sidebar-border|sidebar-ring)\\b",
        "g",
      ),
      aG = /from\s*['"]@\/components\/ui/g,
      aq = RegExp(
        "-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-",
        "g",
      ),
      aX =
        /-\[(#(?:[0-9a-fA-F]{3,8})|rgba?\([^\]]+\)|hsla?\([^\]]+\)|[a-zA-Z]+\b)\]/g;
    var aY = e.i(343428),
      aK = e.i(686134);
    let aJ = "design-warning-dismissed-";
    function aQ({
      onClick: e,
      title: t,
      description: n,
      onDismiss: r,
      dismissible: s = !0,
    }) {
      return (0, a.jsx)("div", {
        className:
          "border-b border-v0-gray-200 bg-v0-blue-300 p-3 text-v0-blue-900",
        children: (0, a.jsxs)("div", {
          className: "flex justify-between items-start gap-2",
          children: [
            (0, a.jsxs)("div", {
              className: "flex-1 min-w-0",
              children: [
                (0, a.jsx)("div", {
                  className: "text-sm font-medium mb-1",
                  children: t,
                }),
                (0, a.jsx)("div", { className: "text-sm mb-3", children: n }),
                (0, a.jsxs)(D.Button, {
                  size: "sm",
                  variant: "ghost",
                  className:
                    "h-7 rounded-md px-2 hover:bg-v0-alpha-500 focus-visible:bg-v0-alpha-500 border-transparent bg-v0-alpha-200 text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-v0-alpha-200 disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-v0-alpha-200 aria-disabled:text-v0-gray-500",
                  onClick: e,
                  children: [
                    (0, a.jsx)("span", { children: "Fix with " }),
                    (0, a.jsx)(iJ.V0LoadableLogo, {}),
                  ],
                }),
              ],
            }),
            s &&
              r &&
              (0, a.jsx)(D.Button, {
                size: "sm",
                variant: "ghost",
                className: "h-5 w-5 p-0 hover:bg-v0-alpha-500 rounded-sm",
                onClick: r,
                tooltip: "Dismiss",
                children: (0, a.jsx)(aY.XIcon, { className: "h-2.5 w-2.5" }),
              }),
          ],
        }),
      });
    }
    function a0({ title: e, description: t }) {
      return (0, a.jsx)("div", {
        className:
          "border-b border-v0-gray-200 bg-v0-blue-300 p-3 text-v0-blue-900",
        children: (0, a.jsx)("div", {
          className: "flex justify-between items-start gap-2",
          children: (0, a.jsxs)("div", {
            className: "flex-1 min-w-0",
            children: [
              (0, a.jsx)("div", {
                className: "text-sm font-medium mb-1",
                children: e,
              }),
              (0, a.jsx)("div", { className: "text-sm", children: t }),
            ],
          }),
        }),
      });
    }
    function a1({ title: e, onExpand: t }) {
      return (0, a.jsx)("div", {
        className:
          "border-b border-v0-gray-200 bg-v0-blue-300 p-3 text-v0-blue-900",
        children: (0, a.jsxs)("div", {
          className: "flex justify-between items-start gap-2",
          children: [
            (0, a.jsx)("div", {
              className: "flex-1 min-w-0",
              children: (0, a.jsx)("div", {
                className: "text-sm font-medium truncate",
                children: e,
              }),
            }),
            (0, a.jsx)(D.Button, {
              size: "sm",
              variant: "ghost",
              className: "h-5 w-5 p-0 hover:bg-v0-alpha-500 rounded-sm",
              onClick: t,
              tooltip: "Open",
              children: (0, a.jsx)(aK.ChevronDownIcon, {
                className: "h-2.5 w-2.5",
              }),
            }),
          ],
        }),
      });
    }
    function a2(e, t) {
      let n = `${aJ}${t}-${e}`,
        [r, s] = (0, tI.useLocalStorage)(n, !1);
      return {
        isDismissed: r,
        dismiss: () => {
          e && t && s(!0);
        },
        expand: () => {
          e && t && s(!1);
        },
        clearAllDismissedStates: () => {
          try {
            let e = [];
            for (let t = 0; t < localStorage.length; t++) {
              let n = localStorage.key(t);
              n?.startsWith(aJ) && e.push(n);
            }
            for (let t of e) localStorage.removeItem(t);
            s(!1);
          } catch {}
        },
      };
    }
    function a5(e, t) {
      let n = (0, m.useActiveBlockState)(),
        { isTWv4: r } = i$(),
        s = (0, o.useMemo)(
          () =>
            e && n && "code-project" === n.type
              ? (function (e, t) {
                  try {
                    let n = (0, s1.parseMultiFileSource)({
                      source: e,
                      blockType: "code-project",
                      blockId: t,
                    });
                    return (function (e) {
                      let t = 0,
                        n = 0,
                        r = 0,
                        s = 0;
                      for (let i of e.filter((e) =>
                        e.meta.file?.endsWith(".tsx"),
                      )) {
                        let e = i.source;
                        ((t += (e.match(aZ) || []).length),
                          (n += (e.match(aq) || []).length),
                          (r += (e.match(aX) || []).length),
                          (s += (e.match(aG) || []).length));
                      }
                      let i = t + 3 * s,
                        a = n + r,
                        l = i + a,
                        o = 0 === l ? 0 : i / l;
                      return {
                        shadcnCount: t,
                        tailwindCount: n,
                        arbitraryColorCount: r,
                        shadcnImportCount: s,
                        shadcnIndex: i,
                        tailwindIndex: a,
                        percentage: o,
                        needsImprovement: o < 0.5 && l > 0,
                      };
                    })(n);
                  } catch (e) {
                    return (
                      console.warn("Failed to analyze shadcn usage:", e),
                      {
                        shadcnCount: 0,
                        tailwindCount: 0,
                        arbitraryColorCount: 0,
                        shadcnImportCount: 0,
                        shadcnIndex: 0,
                        tailwindIndex: 0,
                        percentage: 0,
                        needsImprovement: !1,
                      }
                    );
                  }
                })(n.source, n.id)
              : null,
          [n, e],
        ),
        i = (0, o.useMemo)(
          () =>
            e
              ? r
                ? !1 === t
                  ? "globals"
                  : s?.needsImprovement
                    ? "colors"
                    : null
                : "tailwind"
              : null,
          [s?.needsImprovement, r, e, t],
        ),
        a = a2(e, "colors"),
        l = a2(e, "tailwind"),
        c = a2(e, "globals"),
        d = (0, o.useMemo)(
          () =>
            ("colors" === i && a.isDismissed) ||
            ("tailwind" === i && l.isDismissed) ||
            ("globals" === i && c.isDismissed)
              ? null
              : i,
          [i, a.isDismissed, l.isDismissed, c.isDismissed],
        ),
        u = "colors" === i ? a : "globals" === i ? c : l;
      return {
        activeWarning: d,
        rawActiveWarning: i,
        shadcnUsage: s,
        warningState: u,
      };
    }
    function a3({ hasGlobalsCss: e }) {
      let t = (0, m.useActiveBlockState)(),
        n = (0, y.useChatId)(),
        { actions: r } = (0, e$.useCurrentChatPrompt)(),
        {
          activeWarning: s,
          rawActiveWarning: i,
          shadcnUsage: l,
          warningState: c,
        } = a5(n, e),
        d = (0, o.useEffectEvent)(() => {
          (0, L.track)(
            "ShowDesignSystemTokenWarning",
            { percent: Math.round(100 * (l?.percentage || 0)) },
            { blockId: t?.id, chatId: n },
          );
        });
      return ((0, o.useEffect)(() => {
        "colors" === s && d();
      }, [s]),
      "tailwind" === s)
        ? (0, a.jsx)(aQ, {
            onClick: () => {
              ((0, L.track)("ClickDesignSystemTailwindWarning"),
                r.handleInputChange({
                  initialValue:
                    'Upgrade to Tailwind v4 (include tw-animate-css). Change both globals.css and package.json. Ensure globals.css contains shadcn :root, .dark, and @theme design tokens. Use those semantic design tokens throughout the generation, not hardcoded colors. Make any other changes as needed to migrate to Tailwind v4. Do NOT wrap :root, .dark, and @theme in "@layer base". If there are shadcn colors using just channel values, wrap them in hsl() for the new version in the :root and .dark sections (if the values are already wrapped in a color function, no need to wrap them again).',
                }));
            },
            title: "Upgrade to Tailwind v4.",
            description: "To use design systems, upgrade to Tailwind v4.",
            dismissible: !1,
          })
        : "globals" === s
          ? (0, a.jsx)(a0, {
              title: "No globals.css file found.",
              description: "Add a design system to customize design tokens.",
            })
          : "colors" === s
            ? (0, a.jsx)(aQ, {
                onClick: () => {
                  n &&
                    ((0, L.track)("ClickDesignSystemTokenWarning", {
                      percent: Math.round(100 * (l?.percentage || 0)),
                    }),
                    r.handleInputChange({
                      initialValue:
                        "Please update this code to use semantic color tokens from your design system instead of hardcoded colors. Replace specific color values (like bg-blue-500, text-red-600, #ffffff, etc.) with semantic tokens (like bg-primary, text-secondary, bg-background, text-foreground, etc.) that will work better with the design system and support proper theming.",
                    }));
                },
                title: "This generation isn't using design system tokens.",
                description:
                  "Modify this generation to use the correct tokens to use design systems.",
                onDismiss: c.dismiss,
              })
            : "colors" === i && c.isDismissed
              ? (0, a.jsx)(a1, {
                  title: "This generation isn't using design system tokens.",
                  onExpand: c.expand,
                })
              : null;
    }
    function a4({ designTokens: e, hasGlobalsCss: t }) {
      let [n, r] = (0, o.useState)("root");
      (0, aW.useLoadRegularNamesGoogleFonts)();
      let { activeWarning: s } = a5((0, y.useChatId)(), t),
        i = !!s && "globals" !== s,
        l = !!s,
        c = (0, o.useMemo)(() => {
          switch (n) {
            case "colors":
              return (0, a.jsx)(aL, { onBack: () => r("root") });
            case "fonts":
              return (0, a.jsx)(i4, {
                onBack: () => r("root"),
                designTokens: e,
              });
            case "shadows":
              return (0, a.jsx)(aU, { onBack: () => r("root") });
            default:
              return (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)(a3, { hasGlobalsCss: t }),
                  (0, a.jsxs)(iU, {
                    className: (0, iO.cn)(
                      "transition-opacity",
                      i && "opacity-30 cursor-default pointer-events-none",
                    ),
                    children: [
                      (0, a.jsx)(iW, {
                        className: "py-2 my-0",
                        action: (0, a.jsx)(ap, {}),
                        children: "Design System",
                      }),
                      (0, a.jsx)("div", {
                        className: "px-3 pb-3",
                        children: (0, a.jsx)(ar, {
                          className: "shrink",
                          editedValues: e,
                        }),
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: (0, iO.cn)(
                      "flex-1 overflow-auto @container/colors flex flex-col transition-opacity",
                      l && "opacity-30 cursor-default pointer-events-none",
                    ),
                    children: [
                      (0, a.jsx)(i5, { onClick: () => r("fonts") }),
                      (0, a.jsx)(aT, {
                        designTokens: e,
                        onClick: () => r("colors"),
                      }),
                      (0, a.jsx)(a_, { designTokens: e }),
                      (0, a.jsx)(aO, { onClick: () => r("shadows") }),
                    ],
                  }),
                ],
              });
          }
        }, [n, e, t, i, l]);
      return (0, a.jsx)(ay, {
        designTokens: e,
        children: (0, a.jsx)(i6, { designTokens: e, children: c }),
      });
    }
    var a6 = e.i(874602),
      a7 = e.i(740889);
    function a9() {
      let { atoms: e, actions: t } = (0, e5.useCurrentBlockDesignMode)(),
        n = (0, sJ.useAtomValue)(e.previewTheme),
        r = () => {
          t.setPreviewTheme(
            "light" === n ? "dark" : "light",
            eX.designModeInlineEditRef,
          );
        };
      return (0, a.jsx)(tE.Tabs, {
        variant: "secondary",
        value: n,
        children: (0, a.jsxs)(tE.TabsList, {
          className: (0, u.cn)(
            "h-6 overflow-hidden rounded-full border p-0 focus-within:overflow-visible [&>[role=tab]]:h-6 [&>[role=tab]]:size-5.5",
            "[&>[role=tab]>.absolute]:-inset-px [&>[role=tab]>.absolute]:rounded-full [&>[role=tab]>.absolute]:border [&>[role=tab]>.absolute]:bg-transparent",
          ),
          children: [
            (0, a.jsx)(tm.Tooltip, {
              content: "Light",
              children: (0, a.jsxs)(tE.TabsTrigger, {
                className: "[&>div]:shrink-0",
                value: "light",
                onClick: r,
                children: [
                  (0, a.jsx)(a6.Sun, { size: 12 }),
                  (0, a.jsx)("span", {
                    className: "sr-only",
                    children: "Light",
                  }),
                ],
              }),
            }),
            (0, a.jsx)(tm.Tooltip, {
              content: "Dark",
              children: (0, a.jsxs)(tE.TabsTrigger, {
                className: "[&>div]:shrink-0",
                value: "dark",
                onClick: r,
                children: [
                  (0, a.jsx)(a7.Moon, { size: 12 }),
                  (0, a.jsx)("span", {
                    className: "sr-only",
                    children: "Dark",
                  }),
                ],
              }),
            }),
          ],
        }),
      });
    }
    var a8 = e.i(411584);
    function le() {
      return (0, e5.useDesignModeEnabled)() ? (0, a.jsx)(lm, {}) : null;
    }
    function lt({ children: e, className: t }) {
      return (0, a.jsx)("div", {
        className: (0, u.cn)(
          "material-medium bg-v0-background-100 border border-v0-alpha-400 rounded-[8px] absolute inset-0 z-10 overflow-auto mb-2 flex flex-col mx-auto w-full max-w-3xl",
          t,
        ),
        "data-design-mode-editor": !0,
        children: e,
      });
    }
    function ln({ icon: e, description: t }) {
      return (0, a.jsxs)("div", {
        className:
          "flex size-full flex-col items-center justify-center gap-4 px-4 text-center",
        children: [
          (0, a.jsx)("div", {
            className:
              "border-v0-alpha-400 material-small flex size-8 flex-col items-center justify-center rounded-md border text-v0-gray-900",
            children: e,
          }),
          (0, a.jsx)("p", {
            className: "text-label-14 max-w-48 text-pretty text-v0-gray-1000",
            children: t,
          }),
        ],
      });
    }
    function lr({ nextVersion: e }) {
      let t = e
        ? `This feature requires Next.js 15.3 or higher (current: ${e}).`
        : "This feature requires Next.js 15.3 or higher.";
      return (0, a.jsxs)("div", {
        className:
          "border-v0-alpha-400 bg-v0-yellow-50 border-b px-3 py-2.5 flex gap-2 items-start",
        children: [
          (0, a.jsx)(eq.Warning, { className: "size-3 mt-1" }),
          (0, a.jsx)("div", {
            className: "flex-1 min-w-0",
            children: (0, a.jsxs)("p", {
              className: "text-label-13 text-v0-gray-1000 leading-relaxed",
              children: [
                (0, a.jsx)("strong", {
                  className: "font-medium",
                  children: "Element selection unavailable.",
                }),
                (0, a.jsxs)("span", { children: [" ", t] }),
              ],
            }),
          }),
        ],
      });
    }
    function ls({ children: e }) {
      return (0, a.jsx)("div", {
        className:
          "border-v0-alpha-400 h-13 flex w-full items-center justify-between gap-3 border-b px-3 py-3",
        children: e,
      });
    }
    function li({ children: e }) {
      return (0, a.jsx)("div", {
        className: "select-none flex items-center gap-1",
        children: e,
      });
    }
    function la({ type: e, name: t, active: n, onClick: r }) {
      let s = "root" === e,
        i = n || "element" === e;
      if ("placeholder" === e)
        return (0, a.jsx)("div", {
          className:
            "border border-dashed border-v0-gray-300 w-[72px] bg-transparent flex items-center justify-center gap-1.5 h-6 whitespace-nowrap rounded-md px-[6px] py-0.5 font-mono text-[13px]",
        });
      let l = s
          ? (0, a.jsx)(e1.DesignSystemsIcon, {})
          : (0, a.jsx)(eQ.Diamond, {}),
        o = (0, a.jsx)(e2.Badge, {
          variant: i ? "blue" : "gray",
          contrast: "subtle",
          size: "medium",
          className: (0, u.cn)(
            "h-6 rounded-[6px] font-mono text-[13px] px-[6px] gap-1.5 border",
            i ? "border-v0-blue-300" : "border-v0-gray-300",
          ),
          prefix: l,
          children: s ? "Page" : t,
        });
      return r
        ? (0, a.jsx)("button", {
            onClick: r,
            className: "flex items-center opacity-80",
            children: o,
          })
        : o;
    }
    function ll(e, t, n, r) {
      return e.slice(0, t) + r + e.slice(t + n);
    }
    let lo = (0, eK.default)(() => {
        (0, L.track)("DesignModeEdit", { type: "className" });
      }, 500),
      lc = (0, eK.default)(() => {
        (0, L.track)("DesignModeEdit", { type: "icon" });
      }, 500),
      ld = (0, eK.default)(() => {
        (0, L.track)("DesignModeEdit", { type: "content" });
      }, 500),
      lu = (0, eK.default)(() => {
        (0, L.track)("DesignModeEdit", { type: "prop" });
      }, 500),
      lh = (0, eK.default)(() => {
        (0, L.track)("DesignModeAction", { type: "select" });
      }, 500);
    function lp() {
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-3 p-3",
        children: [
          (0, a.jsx)(i9.Skeleton, { className: "h-[128px] w-full" }),
          (0, a.jsx)(i9.Skeleton, { className: "h-[73px] w-full" }),
          (0, a.jsx)(i9.Skeleton, { className: "h-[113px] w-full" }),
          (0, a.jsx)(i9.Skeleton, { className: "h-[45px] w-full" }),
          (0, a.jsx)(i9.Skeleton, { className: "h-[183px] w-full" }),
        ],
      });
    }
    function lm() {
      var e;
      let [t, n] = (0, o.useState)({ parts: null, selected: !1, info: void 0 }),
        r = (0, C.useLatest)(t),
        s = (0, o.useRef)(null),
        { designTokens: i } =
          ((e = t.info),
          {
            designTokens: (0, o.useMemo)(() => {
              let t = e?.dsTokens;
              if (
                !(
                  "object" == typeof t &&
                  t &&
                  "default" in t &&
                  "dark" in t &&
                  "theme" in t
                )
              )
                return { common: {}, light: {}, dark: {}, theme: {} };
              let n = (0, au.stripDash)(t.default),
                r = (0, au.stripDash)(t.dark),
                s = (0, au.stripDash)(t.theme),
                i = {};
              for (let e in n) e in r || (i[e] = n[e]);
              for (let e in n) e in r || (r[e] = n[e]);
              return { common: i, light: n, dark: r, theme: s };
            }, [e]),
          }),
        { actions: c } = (0, e5.useCurrentBlockDesignMode)(),
        d = (0, m.useActiveBlockState)(),
        h = d?.id,
        { isTWv4: p } = i$(),
        { isAvailable: f, nextVersion: g } = (0,
        a8.useIsElementSelectionAvailable)(),
        x = (0, o.useMemo)(() => {
          if (!d) return !1;
          let e =
            "code-project" === d.type
              ? (0, s1.parseMultiFileSource)({
                  source: d.source,
                  blockType: "code-project",
                  blockId: d.id,
                })
              : [];
          return !!(0, ir.getGlobalsCssFromFiles)(e);
        }, [d]),
        { pushHistory: v } = sK(),
        {
          queueVersion: b,
          lastFileContent: j,
          saveNextState: w,
          lastIsPreview: k,
          currentQueue: N,
          setLastFileContent: M,
          setLastIsPreview: S,
          setSaveNextState: I,
        } = sQ(),
        T = (0, o.useCallback)(
          (e, t, n, s = !1) => {
            b("C:" + e, Date.now(), () => {
              if (!eX.designModeInlineEditRef.current || !r.current.parts)
                return;
              if (!s && ((n && !k) || (!k && !n))) {
                let e = r.current.file,
                  t = eX.designModeInlineEditRef.current.getContent(e) ?? "";
                M({ file: e, content: t });
              }
              n ? S(!0) : (S(!1), I(!0));
              let i = r.current.parts[e]?.value || "";
              (i.startsWith(" ") && (t = " " + t),
                i.endsWith(" ") && (t += " "));
              let a = r.current.parts[e]?.lineNumber || 1,
                l =
                  (r.current.parts[e]?.columnNumber || 0) +
                  +!!r.current.defined,
                o = r.current.defined ? i.length : 0,
                c = r.current.defined
                  ? t
                  : ` ${r.current.info?.classAttributeName || "className"}=${JSON.stringify(t)}`,
                d = eX.designModeInlineEditRef.current.getContent(
                  r.current.file,
                );
              if (!d) return;
              let u = d.split("\n"),
                h = 0;
              for (let e = 0; e < a - 1; e++) h += (u[e]?.length || 0) + 1;
              let p = d.substring(0, h + l - 1),
                m = d.substring(h + l - 1 + o);
              return (
                eX.designModeInlineEditRef.current.postMessage({
                  type: "devtools_sync_design",
                  payload: { type: "class", prev: i, value: t },
                }),
                eX.designModeInlineEditRef.current.inlineEdit(
                  r.current.file,
                  0,
                  0,
                  0,
                  p + c + m,
                  Date.now(),
                  void 0,
                  [0, d.length],
                ),
                lo(),
                !0
              );
            });
          },
          [b, r, k, M, S, I],
        ),
        E = (0, o.useCallback)(
          (e, t, n) => {
            let s = Date.now();
            b("I", s, () => {
              if (
                !eX.designModeInlineEditRef.current ||
                !r.current.parts ||
                !r.current.content
              )
                return;
              n || t || v(r.current.content.file);
              let i =
                "string" === r.current.content.type
                  ? JSON.stringify(e)
                      .slice(1, -1)
                      .replace(/(?<!\\)['"`$]/g, "\\$&")
                  : "template" === r.current.content.type
                    ? e.replace(/(?<!\\)['"`$]/g, "\\$&")
                    : e;
              return (
                eX.designModeInlineEditRef.current.postMessage({
                  type: "devtools_sync_design",
                  payload: { type: "content", value: e },
                }),
                eX.designModeInlineEditRef.current.inlineEdit(
                  r.current.content.file,
                  r.current.content.line,
                  r.current.content.column,
                  r.current.content.len,
                  i,
                  s,
                  void 0,
                  void 0,
                  t,
                ),
                ld(),
                !0
              );
            });
          },
          [b, r, v],
        ),
        _ = (0, o.useCallback)(
          (e, t) => {
            b("L", Date.now(), () => {
              if (
                !r.current.parts ||
                !r.current.lib ||
                !eX.designModeInlineEditRef.current
              )
                return;
              let n = r.current.lib,
                s = eX.designModeInlineEditRef.current.getContent(
                  r.current.file,
                );
              if (!s) return;
              t || v(r.current.file, s);
              let i = s,
                a = r.current.name.length;
              n.closeAt && (i = ll(s, n.closeAt, a, e));
              let l = (i = ll(i, n.openAt, a, e)).slice(n.declStart, n.declEnd),
                o = RegExp(`${n.name}\\s+as\\s+${r.current.name}`);
              if (n.singleRef) {
                let t = o.test(l) ? l.replace(o, e) : l.replace(n.name, e);
                i = ll(i, n.declStart, l.length, t);
              } else {
                let t = l.match(o)?.index ?? l.indexOf(n.name);
                i = ll(
                  i,
                  n.declStart,
                  l.length,
                  l.slice(0, t) + e + "," + l.slice(t),
                );
              }
              return (
                eX.designModeInlineEditRef.current.inlineEdit(
                  r.current.file,
                  0,
                  0,
                  0,
                  i,
                  Date.now(),
                  void 0,
                  [0, s.length],
                ),
                lc(),
                !0
              );
            });
          },
          [b, r, v],
        ),
        A = (0, o.useCallback)(
          (e, t, n) => {
            b("IMG", Date.now(), () => {
              let s;
              if (
                !r.current.parts ||
                !r.current.start ||
                !r.current.end ||
                !eX.designModeInlineEditRef.current
              )
                return;
              let i = r.current;
              n || t || v(i.file);
              let a = eX.designModeInlineEditRef.current.getContent(i.file);
              if (!a) return;
              let l = sd(r.current.name),
                o = i.start;
              if (
                (l
                  ? ((s = sx(r.current.name, i.start, a).content),
                    (o = i.start))
                  : (s = a.slice(i.start, i.end)),
                l)
              )
                for (let n of so) {
                  let r = s.match(n);
                  if (r && void 0 !== r.index) {
                    let n = r.index,
                      s = r.index + r[0].length,
                      l = o + n,
                      c = o + s;
                    try {
                      let n =
                        a.slice(0, l) + `src=${JSON.stringify(e)}` + a.slice(c);
                      if (0 === n.length) continue;
                      return (
                        eX.designModeInlineEditRef.current.inlineEdit(
                          i.file,
                          0,
                          0,
                          0,
                          n,
                          Date.now(),
                          void 0,
                          [0, a.length],
                          t,
                        ),
                        !0
                      );
                    } catch (e) {
                      continue;
                    }
                  }
                }
              if (s.match(/src=(?:"[^"]*"|'[^']*'|\{[^}]*\})/)) {
                let n = s.replace(
                    /src=(?:"[^"]*"|'[^']*'|\{[^}]*\})/,
                    `src=${JSON.stringify(e)}`,
                  ),
                  r = a.slice(0, i.start) + n + a.slice(i.end);
                return (
                  eX.designModeInlineEditRef.current.inlineEdit(
                    i.file,
                    0,
                    0,
                    0,
                    r,
                    Date.now(),
                    void 0,
                    [0, a.length],
                    t,
                  ),
                  !0
                );
              }
              let c = Math.max(0, i.start - 1e3),
                d = Math.min(a.length, i.end + 1e3),
                u = a.slice(c, d);
              for (let n of so) {
                let r = u.match(n);
                if (r && void 0 !== r.index) {
                  let n = r.index,
                    s = r.index + r[0].length,
                    l = c + n,
                    o = c + s;
                  if (l < 0 || o > a.length) continue;
                  try {
                    let n =
                      a.slice(0, l) + `src=${JSON.stringify(e)}` + a.slice(o);
                    if (0 === n.length) continue;
                    return (
                      eX.designModeInlineEditRef.current.inlineEdit(
                        i.file,
                        0,
                        0,
                        0,
                        n,
                        Date.now(),
                        void 0,
                        [0, a.length],
                        t,
                      ),
                      !0
                    );
                  } catch (e) {
                    continue;
                  }
                }
              }
            });
          },
          [b, r, v, h],
        ),
        R = (0, o.useCallback)(
          (e, t, n) => {
            b("P:" + e, Date.now(), () => {
              if (
                !r.current.parts ||
                !r.current.lib ||
                !eX.designModeInlineEditRef.current
              )
                return;
              n || v(r.current.file);
              let s = r.current.lib;
              if (!s.props) return;
              let i = e in s.props ? s.props[e] : null,
                a = "";
              i || ((i = ["", s.openAt + s.name.length]), (a = ` ${e}=`));
              let l = eX.designModeInlineEditRef.current.getContent(
                r.current.file,
              );
              if (!l) return;
              n || v(r.current.file, l);
              let o = i[0]
                  ? ll(l, i[1], i[0].length, JSON.stringify(t))
                  : l.slice(0, i[1]) + a + JSON.stringify(t) + l.slice(i[1]),
                c = (o.match(/\{/g) || []).length,
                d = (o.match(/\}/g) || []).length,
                u = (o.match(/"/g) || []).length;
              if (c === d && u % 2 == 0)
                return (
                  eX.designModeInlineEditRef.current.inlineEdit(
                    r.current.file,
                    0,
                    0,
                    0,
                    o,
                    Date.now(),
                    void 0,
                    [0, l.length],
                  ),
                  lu(),
                  !0
                );
            });
          },
          [b, r, v],
        ),
        P = (function ({
          selected: e,
          onContentUpdate: t,
          onImageSrcUpdate: n,
          getFileContent: r,
        }) {
          let { user: s } = (0, eL.useActiveScope)(),
            [i, a] = (0, o.useState)(!1),
            l = (0, m.useActiveBlockState)(),
            c = (0, y.useChatId)(),
            d = (0, o.useMemo)(
              () =>
                l && "code-project" === l.type
                  ? (0, s1.parseMultiFileSource)({
                      source: l.source,
                      blockType: "code-project",
                      blockId: l.id,
                    })
                  : [],
              [l],
            ),
            { inputFileRef: u, onInputChange: h } = (0, ev.default)({
              isSignedIn: !!s,
              canUpload: (e) =>
                e.filter((e) => !(0, s0.isInlinableImageType)(e.type)).length >
                0
                  ? {
                      ok: !1,
                      message:
                        "Only image files are allowed (JPEG, PNG, GIF, WebP)",
                    }
                  : { ok: !0 },
              onUploadStart: () => {
                a(!0);
              },
              onSuccess: (i, o) => {
                if (o.length > 0) {
                  let i = o[0].url;
                  if (!e.parts) return;
                  let a = f();
                  if ((sv(e, r) ? n(i) : t(i), s)) {
                    let e = {
                      chatId: c || "",
                      blockId: l?.id || "",
                      originalImageUrl: a || "",
                      newImageUrl: i,
                      isPlaceholder: sg(a),
                    };
                    (0, L.track)("ImageUpload", e);
                  }
                }
                a(!1);
              },
              onError: (e) => {
                (console.error("Image upload failed:", e), a(!1));
              },
              onFinish: () => {
                a(!1);
              },
            }),
            p = (0, o.useMemo)(
              () => (e) => {
                if (!d.length) return e;
                let t = d.find(
                  (t) =>
                    !!t.meta.file &&
                    (t.meta.file === e ||
                      t.meta.file === e.replace(/^\//, "") ||
                      t.meta.file.endsWith(e)),
                );
                return t?.blobUrl || e;
              },
              [d],
            ),
            f = () => {
              if (!e.parts) return null;
              if (e.lib?.props?.src)
                return Array.isArray(e.lib.props.src)
                  ? e.lib.props.src[0] || null
                  : e.lib.props.src;
              if (sv(e, r)) {
                let t = e.content?.value;
                if (!t && r && e.file && e.start && e.end) {
                  let n = r(e.file);
                  n && (t = n.slice(e.start, e.end));
                }
                if (t) {
                  let e = t.match(/src="([^"]*)"/);
                  if (e && e[1]) {
                    let t = e[1];
                    return sm(t) ? p(t) : t;
                  }
                }
                if (r && e.file && e.start && e.end) {
                  let t = r(e.file);
                  if (t) {
                    let n,
                      r = sd(e.name);
                    if (
                      ((n = r
                        ? sx(e.name, e.start, t).content
                        : t.slice(e.start, e.end)),
                      r)
                    )
                      for (let e of so)
                        try {
                          let t = n.match(e);
                          if (t && t[1]) {
                            let e = t[1];
                            if (!e || 0 === e.trim().length) continue;
                            if (sm(e)) return p(e);
                            return e;
                          }
                        } catch (e) {
                          continue;
                        }
                    let s = Math.max(0, e.start - 1e3),
                      i = Math.min(t.length, e.end + 1e3),
                      a = t.slice(s, i);
                    for (let e of so)
                      try {
                        let t = a.match(e);
                        if (t && t[1]) {
                          let e = t[1];
                          if (!e || 0 === e.trim().length) continue;
                          if (sm(e)) return p(e);
                          return e;
                        }
                      } catch (e) {
                        continue;
                      }
                  }
                }
              }
              return e.content?.value ? e.content.value : null;
            };
          return {
            inputFileRef: u,
            onInputChange: h,
            isUploading: i,
            imageSrc: f(),
          };
        })({
          selected: t,
          onContentUpdate: E,
          onImageSrcUpdate: A,
          getFileContent: (e) =>
            eX.designModeInlineEditRef.current?.getContent(e) || null,
        }),
        { actions: V } = (0, e$.useCurrentChatPrompt)(),
        { setRefinementElementSelected: $, clearRefinementElementSelected: F } =
          V,
        z = (0, o.useCallback)(
          (e) => {
            if (
              ((0, L.track)("DesignModeAction", { type: "delete" }),
              eX.designModeInlineEditRef.current && e.file)
            ) {
              let t = eX.designModeInlineEditRef.current.getContent(e.file);
              (v(e.file, t),
                eX.designModeInlineEditRef.current.inlineEdit(
                  e.file,
                  0,
                  0,
                  0,
                  e.jsxRoot ? "null" : "",
                  Date.now(),
                  void 0,
                  [e.start, e.end],
                ));
            }
          },
          [v],
        );
      ((0, e0.useMessage)(
        (e) => {
          let { data: t } = e;
          if (t && "object" == typeof t && t.__v0_remote__)
            switch (t.type) {
              case "devtools_selected_state":
                if (JSON.stringify(t) === JSON.stringify(r.current)) return;
                ((s.current = e.source),
                  n(t),
                  c.initializePreviewTheme(t.info?.currentTheme || "light"),
                  (r.current = t),
                  w && j && (v(j.file, j.content), I(!1), S(!1), M(null)));
                let i = eX.designModeInlineEditRef.current?.getContent(
                  t.file || "never_match",
                );
                if (t.name && i) {
                  lh();
                  let { sourceContext: e, componentName: n } = (0,
                  eJ.structureRefinementData)({
                    event: { data: { line: t.line, column: t.column } },
                    file: { source: i },
                  });
                  $({
                    sourceContext: e,
                    line: t.line,
                    column: t.column,
                    componentName: n,
                    file: t.file,
                  });
                } else F();
                let a = t.version;
                for (; N.current.length && (N.current[0]?.[1] || 0) <= a; )
                  N.current.shift();
                if (N.current.length) {
                  let e = N.current[0];
                  if (e) {
                    let [t, n, r] = e;
                    r();
                  }
                }
                break;
              case "devtools_copy":
                if (
                  ((0, L.track)("DesignModeAction", { type: "copy" }),
                  eX.designModeInlineEditRef.current && t.file)
                ) {
                  let e = eX.designModeInlineEditRef.current.getContent(t.file);
                  if ("string" == typeof e) {
                    ((0, eY.copy)(e.slice(t.start, t.end)),
                      l.toast.success("Component code copied to clipboard"));
                    break;
                  }
                }
                l.toast.error("Failed to copy component code");
                break;
              case "devtools_delete":
                z(t);
                break;
              case "devtools_goto":
                ((0, L.track)("DesignModeAction", { type: "goto" }),
                  eX.designModeInlineEditRef.current &&
                    t.file &&
                    eX.designModeInlineEditRef.current.jumpToFile(
                      t.file,
                      t.line,
                      t.column,
                    ));
                break;
              case "frame_onload":
                if (!h) return;
                (0, e4.sendToIframeFromBlockId)(h, {
                  type: "devtools_enable",
                  enabled: !0,
                });
            }
        },
        [$, F, r, v],
      ),
        (0, o.useEffect)(() => {
          h &&
            null === t.parts &&
            !t.selected &&
            (0, e4.sendToIframeFromBlockId)(h, { type: "devtools_query_root" });
        }, [h, t]));
      let H = (0, o.useMemo)(
          () =>
            t.parts
              ? t.parts.map(({ value: e }) =>
                  e
                    .split(" ")
                    .map((e) => e.trim())
                    .filter(Boolean),
                )
              : [],
          [t.parts],
        ),
        B = (0, o.useMemo)(() => {
          let e = { ...e6 };
          return (
            H.forEach((t) => {
              for (let n of t)
                n.startsWith("gap-")
                  ? (e.gap = !0)
                  : n.startsWith("space-")
                    ? (e.space = !0)
                    : "flex" === n
                      ? (e.flex = !0)
                      : "grid" === n
                        ? (e.grid = !0)
                        : n.startsWith("w-") ||
                            n.startsWith("h-") ||
                            n.startsWith("size-")
                          ? (e.size = !0)
                          : ("flex-col" === n || "flex-col-reverse" === n) &&
                            (e.flexColumn = !0);
            }),
            !e.space && (e.gap || e.flex || e.grid) && (e.showGap = !0),
            e
          );
        }, [H]);
      return null === t.parts
        ? t.selected
          ? (0, a.jsx)(lt, {
              children: (0, a.jsx)(ln, {
                icon: (0, a.jsx)(eU.Question, {}),
                description: "The selected element cannot be edited",
              }),
            })
          : (0, a.jsxs)(lt, {
              children: [
                !f && (0, a.jsx)(lr, { nextVersion: g }),
                (0, a.jsxs)(ls, {
                  children: [
                    (0, a.jsxs)(li, {
                      children: [
                        (0, a.jsx)(la, { type: "root", active: !0 }),
                        (0, a.jsx)(e3.HeaderSlash, {}),
                        (0, a.jsx)(la, { type: "placeholder" }),
                      ],
                    }),
                    p && (0, a.jsx)(a9, {}),
                  ],
                }),
                t.info?.dsTokens
                  ? (0, a.jsx)(a4, { designTokens: i, hasGlobalsCss: x })
                  : (0, a.jsx)(lp, {}),
              ],
            })
        : (0, a.jsxs)(lt, {
            children: [
              !f && (0, a.jsx)(lr, { nextVersion: g }),
              (0, a.jsxs)(
                "div",
                {
                  className: "w-full",
                  children: [
                    (0, a.jsxs)(ls, {
                      children: [
                        (0, a.jsxs)(li, {
                          children: [
                            (0, a.jsx)(la, {
                              type: "root",
                              active: !1,
                              onClick: () => {
                                h &&
                                  (0, e4.sendToIframeFromBlockId)(h, {
                                    type: "devtools_deselect",
                                  });
                              },
                            }),
                            (0, a.jsx)(e3.HeaderSlash, {}),
                            (0, a.jsx)(la, { type: "element", name: t.name }),
                          ],
                        }),
                        (0, a.jsxs)(en.DropdownMenu, {
                          children: [
                            (0, a.jsx)(en.DropdownMenuTrigger, {
                              asChild: !0,
                              className: (0, u.cn)({}),
                              children: (0, a.jsx)(D.Button, {
                                size: "sm",
                                variant: "ghost",
                                className: "size-7 rounded-md",
                                children: (0, a.jsx)(eW.MoreHorizontal, {}),
                              }),
                            }),
                            (0, a.jsx)(en.DropdownMenuContent, {
                              align: "end",
                              side: "bottom",
                              sideOffset: 4,
                              children: (0, a.jsxs)(en.DropdownMenuGroup, {
                                children: [
                                  (0, a.jsx)(en.DropdownMenuItem, {
                                    asChild: !0,
                                    children: (0, a.jsxs)(D.Button, {
                                      size: "sm",
                                      variant: "ghost",
                                      className: "justify-start",
                                      onClick: () => {
                                        ((0, L.track)("DesignModeAction", {
                                          type: "goto",
                                        }),
                                          eX.designModeInlineEditRef.current &&
                                            r.current.parts &&
                                            eX.designModeInlineEditRef.current.jumpToFile(
                                              r.current.file,
                                              r.current.line,
                                              r.current.column,
                                            ));
                                      },
                                      children: [
                                        (0, a.jsx)(eO.CursorClick, {}),
                                        "Go to code",
                                      ],
                                    }),
                                  }),
                                  (0, a.jsx)(en.DropdownMenuItem, {
                                    asChild: !0,
                                    children: (0, a.jsxs)(D.Button, {
                                      size: "sm",
                                      variant: "ghost",
                                      className: "justify-start",
                                      onClick: () => {
                                        if (
                                          eX.designModeInlineEditRef.current &&
                                          r.current.parts
                                        ) {
                                          let e =
                                            eX.designModeInlineEditRef.current.getContent(
                                              r.current.file,
                                            );
                                          if ("string" == typeof e) {
                                            ((0, eY.copy)(
                                              e.slice(
                                                r.current.start,
                                                r.current.end,
                                              ),
                                            ),
                                              l.toast.success(
                                                "Component code copied to clipboard",
                                              ));
                                            return;
                                          }
                                        }
                                        l.toast.error(
                                          "Failed to copy component code",
                                        );
                                      },
                                      children: [
                                        (0, a.jsx)(eZ.Copy, {}),
                                        "Copy Component Code",
                                      ],
                                    }),
                                  }),
                                  (0, a.jsx)(en.DropdownMenuItem, {
                                    asChild: !0,
                                    variant: "destructive",
                                    children: (0, a.jsxs)(D.Button, {
                                      size: "sm",
                                      variant: "ghost",
                                      className: "justify-start",
                                      onClick: () => {
                                        r.current.parts &&
                                          z({
                                            file: r.current.file,
                                            start: r.current.start,
                                            end: r.current.end,
                                            jsxRoot: r.current.jsxRoot,
                                          });
                                      },
                                      children: [
                                        (0, a.jsx)(eG.Trash, {}),
                                        "Delete Component",
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(sX, {
                      classNames: H,
                      classNamesInfo: B,
                      handleClassUpdate: T,
                      handleContentUpdate: E,
                      handleIconUpdate: _,
                      handleImageSrcUpdate: A,
                      handlePropUpdate: R,
                      selected: t,
                      imageUpload: P,
                      getFileContent: (e) =>
                        eX.designModeInlineEditRef.current?.getContent(e) ||
                        null,
                    }),
                  ],
                },
                t.key,
              ),
            ],
          });
    }
    function lf({ className: e }) {
      return (0, a.jsx)("div", {
        className: (0, u.cn)("relative z-10 flex w-full flex-col", e),
        children: (0, a.jsxs)("div", {
          className: (0, u.cn)(
            "@container/textarea p-3 z-20 relative rounded-xl overflow-visible",
            "material-medium bg-v0-background-300 border border-v0-alpha-400",
          ),
          children: [
            (0, a.jsx)("div", {
              className: "max-h-[200px] min-h-[54px] pb-2",
              children: (0, a.jsx)(i9.Skeleton, { className: "h-5 w-3/4" }),
            }),
            (0, a.jsxs)("div", {
              className: "flex items-center justify-between h-[28px]",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, a.jsx)(i9.Skeleton, { className: "h-6 w-6 rounded" }),
                    (0, a.jsx)(i9.Skeleton, { className: "h-6 w-6 rounded" }),
                    (0, a.jsx)(i9.Skeleton, { className: "h-6 w-6 rounded" }),
                  ],
                }),
                (0, a.jsx)(i9.Skeleton, { className: "h-7 w-7 rounded-full" }),
              ],
            }),
          ],
        }),
      });
    }
    var lg = e.i(997974),
      lx = e.i(41209);
    let lv = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49999 0H6.49999L6.22628 1.45975C6.1916 1.64472 6.05544 1.79299 5.87755 1.85441C5.6298 1.93996 5.38883 2.04007 5.15568 2.15371C4.98644 2.2362 4.78522 2.22767 4.62984 2.12136L3.40379 1.28249L1.28247 3.40381L2.12135 4.62986C2.22766 4.78524 2.23619 4.98646 2.1537 5.15569C2.04005 5.38885 1.93995 5.62981 1.8544 5.87756C1.79297 6.05545 1.6447 6.19162 1.45973 6.2263L0 6.5V9.5L1.45973 9.7737C1.6447 9.80838 1.79297 9.94455 1.8544 10.1224C1.93995 10.3702 2.04006 10.6112 2.1537 10.8443C2.23619 11.0136 2.22767 11.2148 2.12136 11.3702L1.28249 12.5962L3.40381 14.7175L4.62985 13.8786C4.78523 13.7723 4.98645 13.7638 5.15569 13.8463C5.38884 13.9599 5.6298 14.06 5.87755 14.1456C6.05544 14.207 6.1916 14.3553 6.22628 14.5403L6.49999 16H9.49999L9.77369 14.5403C9.80837 14.3553 9.94454 14.207 10.1224 14.1456C10.3702 14.06 10.6111 13.9599 10.8443 13.8463C11.0135 13.7638 11.2147 13.7723 11.3701 13.8786L12.5962 14.7175L14.7175 12.5962L13.8786 11.3701C13.7723 11.2148 13.7638 11.0135 13.8463 10.8443C13.9599 10.6112 14.06 10.3702 14.1456 10.1224C14.207 9.94455 14.3553 9.80839 14.5402 9.7737L16 9.5V6.5L14.5402 6.2263C14.3553 6.19161 14.207 6.05545 14.1456 5.87756C14.06 5.62981 13.9599 5.38885 13.8463 5.1557C13.7638 4.98647 13.7723 4.78525 13.8786 4.62987L14.7175 3.40381L12.5962 1.28249L11.3701 2.12137C11.2148 2.22768 11.0135 2.2362 10.8443 2.15371C10.6111 2.04007 10.3702 1.93996 10.1224 1.85441C9.94454 1.79299 9.80837 1.64472 9.77369 1.45974L9.49999 0ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="currentColor"/>',
      ),
      lb = (0, e9.withNewIcon)(`
    <g clip-path="url(#clip0_2228_4371)" fill="none">
      <path d="M2.19418 11.0392C2.29711 11.2988 2.32003 11.5833 2.25998 11.8561L1.51448 14.1591C1.49046 14.2759 1.49667 14.3969 1.53253 14.5106C1.56838 14.6243 1.63269 14.727 1.71935 14.8089C1.80601 14.8908 1.91216 14.9492 2.02772 14.9785C2.14329 15.0079 2.26444 15.0073 2.37968 14.9767L4.76878 14.2781C5.02618 14.227 5.29275 14.2493 5.53808 14.3425C7.03285 15.0405 8.72613 15.1882 10.3192 14.7595C11.9122 14.3307 13.3027 13.3531 14.2452 11.9991C15.1877 10.6451 15.6217 9.00176 15.4706 7.35896C15.3195 5.71616 14.5931 4.17951 13.4194 3.02012C12.2458 1.86073 10.7004 1.15311 9.05584 1.02211C7.41132 0.891114 5.77337 1.34515 4.43099 2.30412C3.08861 3.26309 2.12805 4.66536 1.71881 6.26353C1.30956 7.86169 1.47792 9.55304 2.19418 11.0392Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2228_4371">
        <rect width="16" height="16" fill="currentColor" transform="translate(0.5)"/>
      </clipPath>
    </defs>`),
      ly = (0, e9.withNewIcon)(`
  <path d="M1.69418 11.0392C1.79711 11.2988 1.82003 11.5833 1.75998 11.8561L1.01448 14.1591C0.990463 14.2759 0.996674 14.3969 1.03253 14.5106C1.06838 14.6243 1.13269 14.727 1.21935 14.8089C1.30601 14.8908 1.41216 14.9492 1.52772 14.9785C1.64329 15.0079 1.76444 15.0073 1.87968 14.9767L4.26878 14.2781C4.52618 14.227 4.79275 14.2493 5.03808 14.3425C6.53285 15.0405 8.22613 15.1882 9.81918 14.7595C11.4122 14.3307 12.8027 13.3531 13.7452 11.9991C14.6877 10.6451 15.1217 9.00176 14.9706 7.35896C14.8195 5.71616 14.0931 4.17951 12.9194 3.02012C11.7458 1.86073 10.2004 1.15311 8.55584 1.02211C6.91132 0.891114 5.27337 1.34515 3.93099 2.30412C2.58861 3.26309 1.62805 4.66536 1.21881 6.26353C0.809563 7.86169 0.977922 9.55304 1.69418 11.0392Z" fill="currentColor"/>
  `),
      lj = (0, e9.withNewIcon)(`
  <g clip-path="url(#clip0_2259_2161)">
  <path d="M15.1764 9.01778C16.0741 9.87668 16.1061 11.301 15.2473 12.199L13.1273 14.4158C12.2685 15.3136 10.8441 15.3452 9.94607 14.4867L1.7261 6.62536C0.82809 5.76653 0.796401 4.34223 1.65516 3.44417L3.77523 1.22739C4.6341 0.329335 6.05837 0.29757 6.95642 1.15644L15.1764 9.01778ZM5.91967 2.24049C5.62032 1.9542 5.14557 1.96478 4.85927 2.26413L2.7392 4.48092C2.45303 4.78028 2.46354 5.25506 2.76285 5.54132L10.9828 13.4027C11.2821 13.6886 11.757 13.6781 12.0432 13.379L14.1633 11.1622C14.4495 10.863 14.4387 10.3881 14.1396 10.1018L14.0098 9.97763L12.8509 11.1894L11.9115 10.291L13.0704 9.07925L12.2087 8.25511L10.951 9.46841L10.0488 8.53259L11.2686 7.35606L10.4506 6.57377L9.29172 7.78556L8.35236 6.88718L9.51127 5.67539L8.67001 4.87083L7.43344 6.1624L6.96341 5.71287L6.49475 5.26331L7.73065 3.97245L6.86327 3.14292L5.44525 4.47445L4.55518 3.52593L5.92249 2.24319L5.91967 2.24049Z" fill="currentColor"/>
  </g>
  <defs>
  <clipPath id="clip0_2259_2161">
  <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
  </clipPath>
  </defs>`),
      lC = (0, e9.withNewIcon)(`
  <g clip-path="url(#clip0_2453_5861)">
  <path d="M3.27539 1.22705C4.13428 0.329354 5.55812 0.298021 6.45605 1.15674L14.6768 9.01807C15.5742 9.87697 15.6057 11.3009 14.7471 12.1987L12.627 14.4155C11.7682 15.3133 10.3443 15.3452 9.44629 14.4868L1.22559 6.62549C0.327776 5.76663 0.296581 4.34184 1.15527 3.44385L3.27539 1.22705ZM11.3906 10.313L12.3711 11.1675L13.5127 9.85693L12.5322 9.00244L11.3906 10.313ZM9.53516 8.54541L10 8.99951L10.4648 9.45557L11.708 8.18213L10.7783 7.27393L9.53516 8.54541ZM7.83105 6.90967L8.81152 7.76318L9.9541 6.45264L8.97363 5.59912L7.83105 6.90967ZM5.97559 5.28369L6.95215 6.14111L8.17285 4.75342L7.19629 3.89502L5.97559 5.28369ZM4.04492 3.53662L4.95508 4.46436L6.36035 3.08643L5.9043 2.62256L5.44922 2.15869L4.04492 3.53662Z" fill="currentColor"/>
  </g>
  <defs>
  <clipPath id="clip0_2453_5861">
  <rect width="16" height="16" fill="currentColor"/>
  </clipPath>
  </defs>
  `),
      lw = (0, e9.withNewIcon)(`
  <path d="M12.25 14.25V10L12.9212 10.1119C14.1403 10.315 15.25 9.37496 15.25 8.13908V7.86092C15.25 6.62504 14.1403 5.68496 12.9212 5.88813L12.25 6V1.75H8.235L8.30764 2.50382C8.41075 3.57386 7.56957 4.5 6.49457 4.5C5.42349 4.5 4.58361 3.58031 4.68058 2.51362L4.75 1.75H0.75V14.25H12.25Z" fill="currentColor"/>`),
      lk = (0, e9.withNewIcon)(`
    <path d="M8.4696 8.46973C8.65581 8.28353 8.92604 8.20872 9.18152 8.27246L15.1815 9.77246C15.4859 9.84856 15.7107 10.1061 15.745 10.418C15.7792 10.73 15.6156 11.0305 15.3348 11.1709L13.2665 12.2051L14.5302 13.4697C14.823 13.7626 14.823 14.2374 14.5302 14.5303C14.2373 14.8231 13.7625 14.8231 13.4696 14.5303L12.2059 13.2656L11.1708 15.335C11.0304 15.6157 10.7298 15.7794 10.4178 15.7451C10.106 15.7107 9.84843 15.486 9.77234 15.1816L8.27234 9.18164C8.20857 8.92616 8.28343 8.65595 8.4696 8.46973ZM4.49988 8.5C6.2948 8.5 7.74988 9.95507 7.74988 11.75C7.74988 13.5449 6.2948 15 4.49988 15C2.70501 14.9999 1.24988 13.5449 1.24988 11.75C1.24988 9.95512 2.70501 8.50007 4.49988 8.5ZM3.79285 1.40625C4.12401 0.86945 4.90498 0.871159 5.23425 1.40918L7.86804 5.71289C8.21288 6.27655 7.80717 7 7.14636 7H1.85925C1.19712 7 0.792001 6.27356 1.13953 5.70996L3.79285 1.40625ZM13.9999 1C14.5522 1 14.9999 1.44772 14.9999 2V6C14.9999 6.55228 14.5522 7 13.9999 7H9.99988C9.44765 6.99993 8.99988 6.55224 8.99988 6V2C8.99988 1.44776 9.44765 1.00007 9.99988 1H13.9999Z" fill="currentColor"/>
    `),
      lN = (0, e9.withNewIcon)(`
<g clip-path="url(#clip0_2807_8782)">
<path d="M13 0C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3L2.8457 15.9961C1.26055 15.9158 0 14.6051 0 13V3C0 1.34315 1.34315 0 3 0H13ZM3 1.5C2.17157 1.5 1.5 2.17157 1.5 3V13C1.5 13.8284 2.17157 14.5 3 14.5H13C13.8284 14.5 14.5 13.8284 14.5 13V3C14.5 2.17157 13.8284 1.5 13 1.5H3ZM4.54199 3.14258C6.07579 3.14258 7.44259 4.11249 7.94824 5.56055L8.34668 6.70312L10.9014 3.9375C10.9892 3.83967 11.0883 3.75072 11.1826 3.65918C11.3755 3.47205 11.6387 3.35742 11.9287 3.35742C12.5203 3.35753 13 3.83705 13 4.42871C12.9998 5.02022 12.5202 5.49989 11.9287 5.5C11.5612 5.5 11.1419 5.51515 10.8926 5.78516L8.8125 8.03809L9.83887 10.9756C9.91183 11.1843 10.109 11.3249 10.3301 11.3252C10.468 11.3252 10.6006 11.2693 10.6982 11.1719L11.7549 10.1162L12.8154 11.1768L11.7598 12.2324C11.3808 12.6112 10.8659 12.8252 10.3301 12.8252C9.47117 12.8249 8.70608 12.2806 8.42285 11.4697L7.66016 9.28613L5.09863 12.0635C5.01107 12.161 4.91019 12.2473 4.81641 12.3389C4.62382 12.5267 4.36154 12.6436 4.07129 12.6436C3.47974 12.6435 3.00019 12.1628 3 11.5713C3.00022 10.9798 3.47975 10.5001 4.07129 10.5C4.4384 10.5 4.85743 10.4846 5.10645 10.2148L7.19434 7.95215L6.53223 6.05469C6.23678 5.20891 5.43791 4.64258 4.54199 4.64258H3.71387V3.14258H4.54199Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2807_8782">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
`),
      lM = (0, e9.withNewIcon)(`
<g clip-path="url(#clip0_2807_8804)">
<path d="M13 0C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3C0 1.34315 1.34315 0 3 0H13ZM3.71387 4.64258H4.54199C5.43791 4.64258 6.23678 5.20891 6.53223 6.05469L7.19434 7.95215L5.10645 10.2148C4.85743 10.4846 4.4384 10.5 4.07129 10.5C3.47975 10.5001 3.00022 10.9798 3 11.5713C3.00013 12.1629 3.4797 12.6435 4.07129 12.6436C4.36157 12.6436 4.62381 12.5267 4.81641 12.3389C4.91021 12.2473 5.01106 12.161 5.09863 12.0635L7.66016 9.28613L8.42285 11.4697C8.70608 12.2806 9.47117 12.8249 10.3301 12.8252C10.8659 12.8252 11.3808 12.6112 11.7598 12.2324L12.8154 11.1768L11.7549 10.1162L10.6982 11.1719C10.6006 11.2693 10.468 11.3252 10.3301 11.3252C10.109 11.3249 9.91183 11.1843 9.83887 10.9756L8.8125 8.03809L10.8926 5.78516C11.1419 5.51521 11.5612 5.5 11.9287 5.5C12.5203 5.49989 12.9999 5.02028 13 4.42871C13 3.83705 12.5203 3.35753 11.9287 3.35742C11.6388 3.35742 11.3755 3.47208 11.1826 3.65918C11.0883 3.75072 10.9892 3.83967 10.9014 3.9375L8.34668 6.70312L7.94824 5.56055C7.44259 4.11249 6.07579 3.14258 4.54199 3.14258H3.71387V4.64258Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2807_8804">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
`),
      lS = [
        {
          title: "Chat",
          value: "chat",
          icon: (0, a.jsx)(lb, {}),
          iconFilled: (0, a.jsx)(ly, {}),
          tooltip: "Chat",
        },
        {
          title: "Design",
          value: "design",
          icon: (0, a.jsx)(e1.DesignSystemsIcon, {}),
          iconFilled: (0, a.jsx)(lk, {}),
          tooltip: "Design",
        },
        {
          title: "Git",
          value: "git",
          icon: (0, a.jsx)(eC.LogoGithub, {}),
          iconFilled: (0, a.jsx)(eC.LogoGithub, {}),
          tooltip: "GitHub Connection",
        },
        {
          title: "Connect",
          value: "connect",
          tooltip: "Connect an Integration",
          icon: (0, a.jsx)(lx.Puzzle, {}),
          iconFilled: (0, a.jsx)(lw, {}),
        },
        {
          title: "Vars",
          value: "env-vars",
          icon: (0, a.jsx)(lN, {}),
          iconFilled: (0, a.jsx)(lM, {}),
          tooltip: "Environment Variables",
        },
        {
          title: "Rules",
          value: "rules",
          tooltip: "Project Rules",
          icon: (0, a.jsx)(lj, {}),
          iconFilled: (0, a.jsx)(lC, {}),
        },
        {
          title: "Settings",
          value: "settings",
          icon: (0, a.jsx)(al.SettingsGear, {}),
          iconFilled: (0, a.jsx)(lv, {}),
          tooltip: "Settings",
        },
      ];
    function lI({ width: e = 900, height: t = 120 }) {
      return (0, a.jsxs)("div", {
        className:
          "@container/message group w-full [&_code]:break-all break-words flex flex-col gap-2 origin-right items-end px-4",
        "data-testid": "skeleton-message",
        role: "listitem",
        children: [
          (0, a.jsx)("div", {
            className: "flex items-center gap-1.5 pr-1",
            children: (0, a.jsx)("span", {
              className: "bg-v0-alpha-400 rounded-full size-4 min-w-4",
            }),
          }),
          (0, a.jsx)("div", {
            className:
              "flex items-end sm:max-w-[min(fit-content,80%)] max-w-[90%] origin-top-right",
            children: (0, a.jsxs)("div", {
              className:
                "border border-v0-gray-200 text-left relative rounded-[16px] bg-v0-gray-200 px-3 py-1.5 min-w-0 break-words group/message-bubble",
              children: [
                (0, a.jsx)("svg", {
                  width: "16",
                  height: "16",
                  className: "absolute -top-[6px] right-0",
                  fill: "var(--v0-gray-200)",
                  children: (0, a.jsx)("path", {
                    d: "M-2.70729e-07 6.19355C8 6.19355 12 4.12903 16 6.99382e-07C16 6.70968 16 13.5 10 16L-2.70729e-07 6.19355Z",
                  }),
                }),
                (0, a.jsx)("div", { style: { width: e, height: t } }),
              ],
            }),
          }),
          (0, a.jsx)("div", {
            className:
              "flex items-center gap-1 justify-end flex-row-reverse mr-[-2px] h-6",
          }),
        ],
      });
    }
    function lL() {
      return (0, a.jsxs)("div", {
        className: "h-6 w-full flex flex-row gap-2",
        children: [
          (0, a.jsx)("div", {
            className: "bg-v0-gray-300 min-w-4 h-4 rounded-full",
          }),
          (0, a.jsx)("div", {
            className: "bg-v0-gray-300 h-4 rounded-md w-[70%] max-w-[200px]",
          }),
        ],
      });
    }
    function lT({ lines: e = 5 }) {
      return (0, a.jsx)("div", {
        className: "gap-1 flex flex-col w-full relative",
        children: Array.from({ length: e }).map((t, n) =>
          (0, a.jsx)(
            "div",
            {
              className: "bg-v0-gray-300 h-4 rounded-md",
              style: { width: `${n === e - 1 ? 40 : 100}%` },
            },
            n,
          ),
        ),
      });
    }
    function lE() {
      return (0, a.jsxs)("div", {
        className: "flex flex-col w-full gap-4 px-4",
        children: [
          (0, a.jsx)(lL, {}),
          (0, a.jsx)(lT, {}),
          (0, a.jsx)(lL, {}),
          (0, a.jsx)(lT, { lines: 3 }),
          (0, a.jsx)(lL, {}),
        ],
      });
    }
    function l_() {
      return (0, a.jsxs)("div", {
        className: "max-w-3xl mx-auto w-full flex-col",
        children: [(0, a.jsx)(lI, {}), (0, a.jsx)(lE, {}), (0, a.jsx)(lI, {})],
      });
    }
    e.i(19111);
    var lA = e.i(165336),
      lR = e.i(758118),
      lP = e.i(397036),
      lD = e.i(748819),
      lV = e.i(749299),
      l$ = e.i(926297),
      lF = e.i(594851),
      lz = e.i(633577),
      lH = e.i(85830),
      lB = e.i(465870),
      lB = lB,
      lO = e.i(410883),
      lO = lO;
    function lU({ message: e, className: t }) {
      return (0, a.jsx)(lP.UserMessageLayout, {
        className: t,
        id: e.id,
        messageAuthorId: e.authorId,
        children: (0, a.jsxs)("details", {
          children: [
            (0, a.jsxs)("summary", {
              className:
                "inline-flex items-center gap-1 rounded bg-green-600/15 px-1.5 py-0.5 text-sm text-v0-green-800 cursor-pointer",
              children: [
                (0, a.jsx)(lB.default, { className: "h-3.5 w-3.5" }),
                "Established connection with local v0 dev server.",
              ],
            }),
            (0, a.jsx)("div", {
              className: "p-1",
              children: (0, a.jsx)("p", {
                className:
                  "text-sm whitespace-pre-wrap font-mono bg-v0-gray-100 p-2",
                children: (0, eI.stringifyMessageContent)(e.content, {
                  defaultValue:
                    "Established connection with local v0 dev server.",
                }),
              }),
            }),
          ],
        }),
      });
    }
    function lW({ message: e, className: t }) {
      return (0, a.jsx)(lP.UserMessageLayout, {
        className: t,
        id: e.id,
        messageAuthorId: e.authorId,
        children: (0, a.jsxs)("details", {
          children: [
            (0, a.jsxs)("summary", {
              className:
                "inline-flex items-center gap-1 rounded bg-black/15 px-1.5 py-0.5 text-sm text-v0-black cursor-pointer",
              children: [
                (0, a.jsx)(lO.default, { className: "h-3.5 w-3.5" }),
                "User has made some changes directly to the local project.",
              ],
            }),
            (0, a.jsx)("div", {
              className: "p-1",
              children: (0, a.jsx)("p", {
                className:
                  "text-sm whitespace-pre-wrap font-mono bg-v0-gray-100 p-2",
                children: (0, eI.stringifyMessageContent)(e.content),
              }),
            }),
          ],
        }),
      });
    }
    function lZ(e) {
      let { activeForkKey: t } = (0, v.useChatMessages)(),
        { atoms: n, actions: r } = (0, e$.useCurrentChatPrompt)(),
        { cancelEditingMessage: s } = r,
        i = (0, sJ.useAtomValue)(n.editingMessage),
        a = { effect: void 0, onClick: void 0 };
      if (!i || !t) return a;
      let l = t.indexOf(i.id),
        o = t.indexOf(e.id);
      return (
        o > l && (a.effect = "dimmed"),
        o === l && (a.effect = "pulse"),
        (a.onClick = () => {
          ("pulse" === a.effect || "dimmed" === a.effect) && s();
        }),
        a
      );
    }
    var lG = e.i(236699);
    let lq = (0, e9.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0138 8C13.0138 10.4853 10.999 12.5 8.51376 12.5C6.02848 12.5 4.01376 10.4853 4.01376 8C4.01376 5.51472 6.02848 3.5 8.51376 3.5C10.999 3.5 13.0138 5.51472 13.0138 8ZM14.5138 8C14.5138 11.3137 11.8275 14 8.51376 14C5.20005 14 2.51376 11.3137 2.51376 8C2.51376 4.68629 5.20005 2 8.51376 2C11.8275 2 14.5138 4.68629 14.5138 8ZM9.26376 5.75V5H7.76376V5.75V8V8.75H9.26376V8V5.75Z" fill="currentColor"/>',
      ),
      lX = (0, o.memo)(function ({ createdAt: e, className: t = "" }) {
        let { formattedTime: n, tooltipContent: r } = (0, o.useMemo)(() => {
          if (!e) return { formattedTime: null, tooltipContent: null };
          let t = new Date(e),
            n = new Date(new Date());
          n.setHours(0, 0, 0, 0);
          let r = (0, u.formatMessageTimestamp)(t),
            s = null;
          return (
            t < n &&
              (s = t.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: !0,
              })),
            { formattedTime: r, tooltipContent: s }
          );
        }, [e]);
        return n
          ? (0, a.jsx)(tm.Tooltip, {
              content: r,
              side: "bottom",
              children: (0, a.jsxs)("div", {
                className: `flex items-center gap-1 px-1 text-v0-gray-900 ${t}`,
                children: [
                  (0, a.jsx)(lq, { className: "size-4" }),
                  (0, a.jsx)("span", {
                    className: "text-xs py-1 rounded-md whitespace-nowrap",
                    children: n,
                  }),
                ],
              }),
            })
          : null;
      }),
      lY = [
        "added-environment-variables",
        "added-integration",
        "forked-block",
        "reverted-block",
        "sync-git",
      ],
      lK = (0, o.memo)(function ({
        message: e,
        forkKeyOptions: t,
        isLastMessage: n,
        awaitingResponse: r,
      }) {
        let { setConfirmDelete: s } = H(),
          i = (0, $.useT)(),
          {
            actions: { startEditingMessage: c },
          } = (0, e$.useCurrentChatPrompt)(),
          { isCopied: d, copyToClipboard: u } = (0, eY.useCopyToClipboard)({
            timeout: 2e3,
          }),
          { isCopied: h, copyToClipboard: p } = (0, eY.useCopyToClipboard)({
            timeout: 2e3,
          }),
          m = e.id,
          f = lZ(e),
          [g] = (0, ef.useRateLimit)(),
          x = g?.remaining === 0,
          v = !(0, o.useMemo)(
            () => (0, eI.stringifyMessageContent)(e.content),
            [e.content],
          ),
          b = (0, o.useMemo)(() => {
            let t = {
              ...e.content,
              parts: e.content.parts.filter(
                (e) =>
                  "refinement-element" !== e.type &&
                  "confirmed-permissions" !== e.type,
              ),
            };
            return (0, eI.stringifyMessageContent)(t).length;
          }, [e.content]),
          y = (0, o.useMemo)(
            () =>
              (0, a.jsxs)(a.Fragment, {
                children: [
                  !v &&
                    (0, a.jsx)(lz.Action, {
                      "aria-label": i("userMessage.copyMessage"),
                      tooltipDirection: "bottom",
                      onClick: () => {
                        u((0, eI.stringifyMessageContent)(e.content) || "")
                          .then(() =>
                            l.toast.success(i("userMessage.copiedToClipboard")),
                          )
                          .catch(() =>
                            l.toast.error(
                              "Failed to copy message to clipboard",
                            ),
                          );
                      },
                      tooltip: i("userMessage.copyMessage"),
                      children: (0, a.jsx)(lG.CopyCheck, { isCopied: d }),
                    }),
                  (0, a.jsx)(eB, { forkKeyOptions: t, message: e }),
                ],
              }),
            [i, e, v, d, t, u],
          ),
          j = (0, o.useMemo)(
            () =>
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)(lX, { createdAt: e.createdAt }),
                  (0, a.jsx)(
                    lz.Action,
                    {
                      "aria-label": i("userMessage.shareMessage"),
                      className: "author-action",
                      onClick: () => {
                        p(
                          `${window.location.origin}${window.location.pathname}#${e.id}`,
                        )
                          .then(() => {
                            (l.toast.success(
                              i("userMessage.messageLinkCopied"),
                            ),
                              (0, L.track)("CopyMessageLink", {
                                messageId: e.id,
                              }));
                          })
                          .catch(() =>
                            l.toast.error(
                              "Failed to copy message link to clipboard",
                            ),
                          );
                      },
                      tooltipDirection: "bottom",
                      tooltip: i("userMessage.shareMessage"),
                      children: (0, a.jsx)(lG.CopyCheck, {
                        customIcon: (0, a.jsx)(l$.Link, {}),
                        isCopied: h,
                      }),
                    },
                    e.id + "@share",
                  ),
                  (0, a.jsx)(
                    lz.Action,
                    {
                      "aria-label": i("userMessage.editMessage"),
                      className: "author-action",
                      disabled: x,
                      onClick: () => {
                        (c({ ...e }),
                          (0, L.track)("OpenEditUserMessage", {
                            messageId: e.id,
                          }));
                      },
                      tooltipDirection: "bottom",
                      tooltip: x
                        ? i("userMessage.limitReached")
                        : i("userMessage.editMessage"),
                      children: (0, a.jsx)("span", {
                        "aria-hidden": !0,
                        children: (0, a.jsx)(lV.PencilEdit, {
                          className: "pointer-events-none",
                        }),
                      }),
                    },
                    e.id,
                  ),
                  (0, a.jsx)(
                    lz.Action,
                    {
                      "aria-label": i("userMessage.deleteMessage"),
                      className: "author-action",
                      tooltipDirection: "bottom",
                      onClick: () => {
                        (s(e.id),
                          (0, L.track)("OpenDeleteMessage", {
                            messageId: e.id,
                          }));
                      },
                      tooltip: i("userMessage.deleteMessage"),
                      children: (0, a.jsx)("span", {
                        "aria-hidden": !0,
                        children: (0, a.jsx)(eG.Trash, {
                          className: "pointer-events-none",
                        }),
                      }),
                    },
                    e.id + "@delete",
                  ),
                ],
              }),
            [i, x, e, c, s, p, h],
          ),
          C = (0, o.useMemo)(
            () =>
              (0, a.jsx)(lF.MessageAttachmentPills, {
                refinementElementLabels: (0,
                eJ.getRefinementElementLabelsFromContent)(e.content),
                attachments: e.attachments,
                className: "pb-1 pt-1.5",
              }),
            [e],
          );
        return e.type && lY.includes(e.type)
          ? null
          : (0, lH.isRemoteSessionHandshakeMessage)(e)
            ? (0, a.jsx)(lU, { message: e })
            : (0, lH.isRemoteLocalChangeMessage)(e)
              ? (0, a.jsx)(lW, { message: e })
              : (0, a.jsx)(lP.UserMessageLayout, {
                  id: m,
                  actions: y,
                  hideActions: r,
                  awaitingResponse: r,
                  hoverActions: j,
                  attachments: C,
                  isLastMessage: n,
                  messageAuthorId: e.authorId,
                  effect: f.effect,
                  messageLength: b,
                  onEffectClick: f.onClick,
                  children: v
                    ? (0, a.jsx)("i", {
                        className:
                          "pl-1 -skew-x-10 text-v0-gray-900 text-label-14",
                        children: "No message content",
                      })
                    : (0, a.jsx)(lD.MessageContent, { message: e }),
                });
      });
    function lJ({ label: e, value: t }) {
      return (0, a.jsxs)("div", {
        className: "text-label-12-mono text-[10px] text-v0-gray-900",
        children: [
          e,
          ": ",
          (0, a.jsx)("span", { className: "text-v0-gray-900", children: t }),
        ],
      });
    }
    function lQ({ details: e }) {
      return (0, a.jsx)("div", {
        className: "flex flex-wrap gap-2 py-1",
        children: e
          .filter(Boolean)
          .map((e, t) => (0, a.jsx)(lJ, { label: e.label, value: e.value }, t)),
      });
    }
    var l0 = e.i(346867),
      l1 = e.i(324042),
      l2 = e.i(40114),
      l5 = e.i(233327),
      l3 = e.i(643611),
      l4 = e.i(60339),
      l6 = e.i(545102),
      l7 = e.i(118376);
    function l9({ message: e }) {
      let t = (0, o.useRef)(null),
        n = (0, o.useRef)(null),
        { project: r } = (0, d.useChatMetadata)(),
        s = (0, $.useT)(),
        i = (0, o.useMemo)(
          () => JSON.stringify(e.content).includes("footnoteReference"),
          [e.content],
        );
      return "assistant" === e.role &&
        "context" in e &&
        e.context &&
        0 !== e.context.length &&
        i
        ? (0, a.jsxs)("div", {
            ref: t,
            children: [
              !e.streaming &&
                (0, a.jsxs)("div", {
                  className: "grid gap-1.5",
                  children: [
                    (0, a.jsx)("p", {
                      className:
                        "select-none pl-px text-sm leading-none text-v0-gray-900",
                      children: s("messageCitations.title"),
                    }),
                    (0, a.jsx)("div", {
                      className:
                        "no-scrollbar flex w-full -translate-x-1 gap-2 overflow-x-auto p-1 pb-3",
                      children: e.context.map((e, t) => {
                        let s = new URL(e.url).hostname,
                          i = e.url.includes("vercel-storage") && void 0 !== r;
                        return "ui" === e.type
                          ? null
                          : (0, a.jsx)(
                              D.Button,
                              {
                                asChild: !0,
                                className:
                                  "group/citation flex h-auto w-[210px] flex-col items-start justify-start gap-1 whitespace-normal px-2 py-1.5 text-left text-sm",
                                variant: "secondary",
                                children: (0, a.jsxs)("a", {
                                  className: "min-w-0",
                                  href: e.url,
                                  ref: 0 === t ? n : null,
                                  rel: "noopener noreferrer",
                                  target: "_blank",
                                  title: e.url,
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className:
                                        "flex w-full items-center gap-1.5 font-medium",
                                      children: [
                                        i
                                          ? (0, a.jsx)(l6.ProjectIcon, {
                                              size: "xs",
                                              color: r.settings.color,
                                              icon: (0, l7.cleanIconName)(
                                                r.settings.icon,
                                              ),
                                            })
                                          : (0, a.jsx)(l3.CitationSourceIcon, {
                                              className: "shrink-0",
                                              knowledgeSource: s,
                                            }),
                                        (0, a.jsx)("div", {
                                          className: "truncate",
                                          children: i ? e.title : s,
                                        }),
                                        (0, a.jsxs)("div", {
                                          className:
                                            "relative ml-auto flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-v0-gray-200 text-xs text-v0-gray-900",
                                          children: [
                                            t + 1,
                                            (0, a.jsx)("div", {
                                              className:
                                                "absolute inset-0 flex size-4 shrink-0 items-center justify-center bg-v0-gray-200 text-v0-gray-1000 opacity-0 transition-all group-hover/citation:opacity-100 group-focus/citation:opacity-100 group-focus-visible/citation:opacity-100",
                                              children: (0, a.jsx)(
                                                l4.ArrowUpRightSmall,
                                                {},
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)("div", {
                                      className:
                                        "w-full truncate break-all text-xs font-normal text-v0-gray-900",
                                      children:
                                        r && i
                                          ? r.name
                                          : (0, a.jsxs)(a.Fragment, {
                                              children: [
                                                e.title,
                                                e.description &&
                                                  (0, a.jsxs)(a.Fragment, {
                                                    children: [
                                                      " - ",
                                                      e.description,
                                                    ],
                                                  }),
                                              ],
                                            }),
                                    }),
                                  ],
                                }),
                              },
                              t,
                            );
                      }),
                    }),
                  ],
                }),
              (0, a.jsx)(l5.CitationsPortalRenderer, {
                citations: e.context
                  .filter((e) => !!e)
                  .map((t, n) => ({
                    ...t,
                    knowledgeSource: new URL(t.url).hostname,
                    index: n + 1,
                    messageId: e.id,
                  })),
              }),
            ],
          })
        : null;
    }
    var l8 = e.i(691701);
    function oe({ actions: e, message: t, finishReason: n }) {
      let { user: r } = (0, W.useUser)(),
        s = (function (e) {
          let t = e.length;
          if (!t) return null;
          if (1 === t) {
            if (e.includes("delete-message"))
              return "Please delete your message and try again.";
            if (e.includes("edit-message"))
              return "Please edit your message and try again.";
          }
          let n = 2 === e.length,
            r = n && e.includes("new-chat") && e.includes("delete-message"),
            s = n && e.includes("edit-message") && e.includes("delete-message"),
            i = n && e.includes("delete-message") && e.includes("retry");
          return r
            ? "Please start a new chat or delete your message."
            : s
              ? "Please edit or delete your message and try again."
              : i
                ? "Please delete or retry your message."
                : "Please edit, retry or delete your message.";
        })(e);
      return (0, a.jsxs)("div", {
        className:
          "flex h-[34px] flex-1 items-center gap-2 rounded-md bg-v0-red-200 p-2 text-sm text-v0-red-700",
        children: [
          (0, a.jsx)(l8.Stop, {}),
          t,
          " ",
          s,
          r?.isAdminMode && n
            ? (0, a.jsxs)("p", {
                className: "font-bold",
                children: ["[ADMIN_ONLY]: ", n],
              })
            : null,
        ],
      });
    }
    var ot = e.i(127558),
      on = e.i(1740);
    function or(e) {
      return (0, a.jsx)(ot.AnimatedIcon, {
        variants: {
          hover: { rotate: 60 },
          tap: {
            rotate: 360,
            interruptible: !1,
            transition: { duration: 1, ease: [0.27, 0.34, 0.22, 0.97] },
          },
          idle: { rotate: 0 },
        },
        children: (0, a.jsx)(on.RefreshClockwise, { "aria-hidden": !0, ...e }),
      });
    }
    var os = e.i(850560);
    function oi() {
      return (0, a.jsx)(ot.AnimatedIcon, {
        variants: { hover: { y: -2, x: -1, rotate: -12 } },
        children: (0, a.jsx)(os.ThumbUp, { "aria-hidden": !0 }),
      });
    }
    var oa = e.i(625402),
      ol = e.i(230869);
    let oo = {
      "input-too-long": {
        message:
          "Your message or the text content of your attachment(s) exceeds the maximum length.",
        actions: ["delete-message", "edit-message"],
      },
      "invalid-image": {
        message: "The image(s) attached could not be processed.",
        actions: ["delete-message", "edit-message"],
      },
      "large-image": {
        message: "The image(s) attached exceed the maximum size.",
        actions: ["delete-message", "edit-message"],
      },
      "too-many-attachments": {
        message:
          "You have reached the limit for total attachments in a single chat.",
        actions: ["new-chat", "delete-message", "edit-message"],
      },
      "content-filtering": {
        message: "The response was blocked by the content filtering policy.",
        actions: ["delete-message", "edit-message"],
      },
      "failed-to-process-image": {
        message: "Unable to process image.",
        actions: ["delete-message", "retry"],
      },
      "image-exceeds-dimensions": {
        message:
          "The image(s) attached exceed the maximum width and height allowed.",
        actions: ["delete-message", "edit-message"],
      },
      overloaded: {
        message:
          "We are currently experiencing high traffic. Please try again in a few minutes.",
        actions: [],
      },
      default: {
        message: "Something went wrong.",
        actions: ["retry", "edit-message", "delete-message"],
      },
    };
    var oc = e.i(19922),
      od = e.i(264050);
    let ou = (0, e9.withNewIcon)(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0.189331L9.28033 0.719661L15.2803 6.71966L15.8107 7.24999L15.2803 7.78032L13.7374 9.32322C13.1911 9.8696 12.3733 9.97916 11.718 9.65188L9.54863 13.5568C8.71088 15.0648 7.12143 16 5.39639 16H0.75H0V15.25V10.6036C0 8.87856 0.935237 7.28911 2.4432 6.45136L6.34811 4.28196C6.02084 3.62674 6.13039 2.80894 6.67678 2.26255L8.21967 0.719661L8.75 0.189331ZM7.3697 5.43035L10.5696 8.63029L8.2374 12.8283C7.6642 13.8601 6.57668 14.5 5.39639 14.5H2.56066L5.53033 11.5303L4.46967 10.4697L1.5 13.4393V10.6036C1.5 9.42331 2.1399 8.33579 3.17166 7.76259L7.3697 5.43035ZM12.6768 8.26256C12.5791 8.36019 12.4209 8.36019 12.3232 8.26255L12.0303 7.96966L8.03033 3.96966L7.73744 3.67677C7.63981 3.57914 7.63981 3.42085 7.73744 3.32321L8.75 2.31065L13.6893 7.24999L12.6768 8.26256Z" fill="currentColor"/>',
    );
    var oh = (0, T.createServerReference)(
        "40d454345ef9bf6c94d6311d0eaf4405e49832c622",
        T.callServer,
        void 0,
        T.findSourceMapURL,
        "getRawMessageContent",
      ),
      op = e.i(51940);
    function om() {
      let { data: e, mutate: t } = (0, I.default)(
          "showAdminRetryDialog",
          null,
          { fallbackData: null },
        ),
        { user: n } = (0, W.useUser)();
      return {
        showAdminRetryDialog: n?.isAdminMode ? e : null,
        setAdminRetryDialog: t,
      };
    }
    let of = ({ messageId: e }) => {
        let { setAdminRetryDialog: t } = om();
        return (0, a.jsxs)(en.DropdownMenuItem, {
          onClick: () => t(e),
          children: [(0, a.jsx)(ou, {}), "Edit Response"],
        });
      },
      og = ({ submit: e }) => {
        let { showAdminRetryDialog: t, setAdminRetryDialog: n } = om(),
          [r, s] = (0, tI.useLocalStorage)("admin-retry-message", ""),
          [i, c] = (0, o.useTransition)();
        return t
          ? (0, a.jsxs)(P.Modal, {
              open: !!t,
              onOpenChange: () => n(null),
              children: [
                (0, a.jsx)(P.ModalHeader, {
                  children: (0, a.jsx)(P.ModalTitle, {
                    children: "Retry Message (AI Team Only)",
                  }),
                }),
                (0, a.jsxs)("form", {
                  onSubmit: (s) => {
                    r &&
                      t &&
                      (s.preventDefault(),
                      n(null),
                      e({
                        action: "retry",
                        forceResponse: r,
                        assistantMessageId: t,
                      }));
                  },
                  children: [
                    (0, a.jsx)(P.ModalContent, {
                      children: (0, a.jsx)(tA.Textarea, {
                        asChild: !0,
                        children: (0, a.jsx)(op.ResizableTextArea, {
                          value: r,
                          onChange: (e) => s(e.target.value),
                          placeholder: "Enter your messsage here...",
                          minHeight: 80,
                          maxHeight: 192,
                        }),
                      }),
                    }),
                    (0, a.jsxs)(P.ModalFooter, {
                      className:
                        "mt-4 flex w-full items-center justify-between",
                      children: [
                        (0, a.jsxs)(D.Button, {
                          type: "button",
                          variant: "secondary",
                          onClick: () => {
                            c(async () => {
                              try {
                                if (!t) throw Error("No message id");
                                let e = await oh({ payload: { messageId: t } });
                                if ("error" in e) throw Error(e.error);
                                if (!e.rawContent)
                                  throw Error(
                                    "No raw content saved in message",
                                  );
                                s(e.rawContent);
                              } catch (e) {
                                if (e instanceof Error)
                                  return void l.toast.error(e.message);
                                l.toast.error("An error occurred");
                              }
                            });
                          },
                          disabled: i,
                          children: [
                            "Sync Raw Content",
                            i ? (0, a.jsx)(X.Spinner, {}) : null,
                          ],
                        }),
                        (0, a.jsx)(D.Button, {
                          type: "submit",
                          children: "Submit",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          : null;
      };
    var ox = e.i(329046);
    let ov = (0, e9.withNewIcon)(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.6736V7V2.5H7V7V7.6736L6.49655 8.12111L4.38279 10L11.6172 10L9.50345 8.12111L9 7.6736ZM5.5 2.5H4V1H5.5H7H9H10.5H12V2.5H10.5V7L14.0735 10.1765C14.6628 10.7003 15 11.4511 15 12.2396C15 13.7641 13.7641 15 12.2396 15H3.7604C2.23587 15 1 13.7641 1 12.2396C1 11.4511 1.33718 10.7003 1.92649 10.1765L5.5 7V2.5ZM2.5 12.2396C2.5 11.9717 2.58527 11.7133 2.7398 11.5L13.2602 11.5C13.4147 11.7133 13.5 11.9717 13.5 12.2396C13.5 12.9357 12.9357 13.5 12.2396 13.5H3.7604C3.0643 13.5 2.5 12.9357 2.5 12.2396Z" fill="currentColor" />',
    );
    var ob = (0, T.createServerReference)(
      "401891ed77018dac0d17aaa17f7386cb959f4ae052",
      T.callServer,
      void 0,
      T.findSourceMapURL,
      "permanentlySaveMessageObservability",
    );
    let oy = ({ parentId: e, messageId: t }) => {
      let n = (0, y.useChatId)(),
        [r, s] = (0, o.useTransition)();
      return (0, a.jsxs)(en.DropdownMenuItem, {
        disabled: r,
        onClick: () => {
          s(async () => {
            try {
              let r = await ob({ payload: { messageId: t } });
              if (!("success" in r)) throw Error(r.error);
              let s = `{
  type: 'edit-message',
  chatId: '${n}',
  userMessageId: '${e}',
  assistantMessageId: '${t}',
  description: INSERT_DESCRIPTION_HERE,
  accessWith: 'EVAL_TEAM',
  scorer: output => {
    return { passed: true }
  },
},
`;
              (await navigator.clipboard.writeText(s),
                l.toast.success(
                  "Copied eval, now paste to `packages/evals/lib/chat/data.ts`",
                ));
            } catch (e) {
              if (e instanceof Error) return void l.toast.error(e.message);
              l.toast.error("An error occurred");
            }
          });
        },
        children: [
          r ? (0, a.jsx)(X.Spinner, {}) : (0, a.jsx)(ov, {}),
          (0, a.jsx)("span", { children: "Create Eval" }),
        ],
      });
    };
    var oj = o;
    class oC extends oj.default.Component {
      constructor(e) {
        (super(e), (this.state = { hasError: !1, error: null }));
      }
      static getDerivedStateFromError(e) {
        return { hasError: !0, error: e };
      }
      componentDidCatch(e, t) {
        console.error("ErrorBoundary caught an error:", e, t);
      }
      render() {
        let { hasError: e } = this.state,
          { fallback: t, children: n } = this.props;
        return e
          ? (t ?? (0, a.jsx)("h2", { children: "Something went wrong." }))
          : n;
      }
    }
    var ow = e.i(782742),
      ok = e.i(236808);
    function oN({
      metrics: e,
      creditCost: t,
      imageGenerationCost: n,
      className: r,
      messageId: s,
    }) {
      var i, l, c;
      let d = !(!e && null == t),
        h = (0, o.useCallback)(
          (r) => {
            "open" === r &&
              (0, L.track)("WorkMetricsExpanded", {
                messageId: s,
                hasActions: !!e?.actionsCount,
                hasFiles: !!e?.filesModified,
                hasLinesRead: !!e?.linesRead,
                hasCodeChanges:
                  (e?.codeAdded ?? 0) > 0 || (e?.codeRemoved ?? 0) > 0,
                hasImages: (n ?? 0) > 0,
                hasCreditCost: null != t && (t > 0 || -1 === t),
              });
          },
          [
            s,
            e?.actionsCount,
            e?.filesModified,
            e?.linesRead,
            e?.codeAdded,
            e?.codeRemoved,
            n,
            t,
          ],
        );
      if (!d) return null;
      let p = n ? Math.round(n / 0.05) : 0,
        m = e?.timeWorked ?? 0,
        f = (0, a.jsxs)(a.Fragment, {
          children: [
            e?.actionsCount !== void 0 &&
              e.actionsCount > 0 &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Work done",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children:
                      1 === e.actionsCount
                        ? "1 action"
                        : `${e.actionsCount} actions`,
                  }),
                ],
              }),
            e?.filesModified !== void 0 &&
              e.filesModified > 0 &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Files modified",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children:
                      1 === e.filesModified
                        ? "1 file"
                        : `${e.filesModified} files`,
                  }),
                ],
              }),
            e?.linesRead !== void 0 &&
              e.linesRead > 0 &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Items read",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children:
                      1 === e.linesRead
                        ? "1 line"
                        : `${(i = e.linesRead) < 1e3 ? i.toString() : i < 1e6 ? `${(i / 1e3).toFixed(1)}k` : `${(i / 1e6).toFixed(1)}M`} lines`,
                  }),
                ],
              }),
            ((e?.codeAdded ?? 0) > 0 || (e?.codeRemoved ?? 0) > 0) &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Code changed by agent",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children:
                      ((l = e?.codeAdded),
                      (c = e?.codeRemoved),
                      `+${l ?? 0} -${c ?? 0}`),
                  }),
                ],
              }),
            p > 0 &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Images generated",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children: 1 === p ? "1 image" : `${p} images`,
                  }),
                ],
              }),
            null != t &&
              (t > 0 || -1 === t) &&
              (0, a.jsxs)("div", {
                className: "flex justify-between items-center text-[13px]",
                children: [
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900",
                    children: "Credits used",
                  }),
                  (0, a.jsx)("span", {
                    className: "text-v0-gray-900 font-mono",
                    children: (0, u.formatCreditUsage)(t),
                  }),
                ],
              }),
          ],
        }),
        g = {
          isActive: !1,
          isLast: !1,
          isFirst: !1,
          isLastMessage: !1,
          messageId: "",
          type: "task-start-v1",
          parts: [],
          createdAt: Date.now(),
          finishedAt: Date.now(),
          lastPartSentAt: null,
          taskNameActive: null,
          taskNameComplete: null,
          toolCallId: null,
          id: "work-metrics",
        };
      return (0, a.jsx)(ok.RichTask, {
        ...g,
        Icon: ow.ChartActivity,
        renderedParts: f,
        className: r,
        hideTimeSpent: !0,
        onToggle: h,
        children:
          m > 0
            ? `Worked for ${(function (e) {
                if (e < 60) return `${e}s`;
                if (e < 3600) {
                  let t = Math.floor(e / 60),
                    n = e % 60;
                  return n > 0 ? `${t}m ${n}s` : `${t}m`;
                }
                {
                  let t = Math.floor(e / 3600),
                    n = Math.floor((e % 3600) / 60);
                  return n > 0 ? `${t}h ${n}m` : `${t}h`;
                }
              })(m)}`
            : "Work Metrics",
      });
    }
    function oM(e) {
      if (e.createdAt && e.updatedAt && e.finishReason) {
        let t = new Date(e.createdAt).getTime();
        return Math.max(
          1,
          Math.round((new Date(e.updatedAt).getTime() - t) / 1e3),
        );
      }
      if (e.createdAt && !e.finishReason) {
        let t = new Date(e.createdAt).getTime();
        return Math.max(1, Math.round((Date.now() - t) / 1e3));
      }
      return 0;
    }
    function oS(e) {
      return e.workMetrics?.agentActions || 0;
    }
    function oI(e) {
      return e.workMetrics?.linesRead || 0;
    }
    let oL = (0, o.memo)(function ({
      message: e,
      isLastMessage: t,
      isLoading: n,
      isStreaming: r,
      forkKeyOptions: s,
      submit: i,
      setChatState: c,
    }) {
      let d = (0, $.useT)(),
        u = e.id,
        { chatId: h } = (0, v.useChatId)(),
        { user: p } = (0, W.useUser)(),
        { isCopied: m, copyToClipboard: f } = (0, eY.useCopyToClipboard)({
          timeout: 2e3,
        }),
        { isCopied: g, copyToClipboard: x } = (0, eY.useCopyToClipboard)({
          timeout: 2e3,
        }),
        [b] = (0, ef.useRateLimit)(),
        y = b?.remaining === 0,
        { isLoading: j, canVote: C } = (0, oc.useCanVoteOnMessage)(),
        { scp: w } = (0, Z.useFlags)(),
        k = lZ(e),
        { isLlmError: N, errorCategory: M = "default" } = (0, o.useMemo)(
          () => (0, ol.isLlmError)(e),
          [e],
        ),
        { message: S, actions: I } = oo[M],
        T = I.includes("retry"),
        E = (r && t) || j,
        _ = (0, o.useCallback)(async () => {
          try {
            let e = document
              .getElementById(u)
              ?.querySelector("[data-seg=root]");
            if (!e) throw Error("Root container not found");
            let t = new DocumentFragment();
            e.childNodes.forEach((e) => {
              t.appendChild(e.cloneNode(!0));
            });
            let n = (0, l2.fragmentToMarkdown)(t, e, !1, !1, !1);
            (await f(n), l.toast.success(d("botMessage.copiedToClipboard")));
          } catch (e) {
            (console.error(e),
              l.toast.error("Failed to copy message to clipboard"));
          }
        }, [u, f, d]),
        A = (0, o.useCallback)(async () => {
          await Promise.all([
            i({ action: "retry", assistantMessageId: e.id }),
            (0, L.track)("SubmitRetryBotMessage", { messageId: e.id }),
          ]);
        }, [i, e.id]),
        R = (0, o.useCallback)(() => {
          x(`${window.location.origin}${window.location.pathname}#${e.id}`)
            .then(() => {
              l.toast.success("Bot message link copied to clipboard");
            })
            .catch(() =>
              l.toast.error("Failed to copy bot message link to clipboard"),
            );
        }, [e.id, x]),
        P = (0, o.useMemo)(
          () =>
            (0, a.jsxs)(a.Fragment, {
              children: [
                C
                  ? (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(o_, {
                          botMessage: e,
                          className:
                            "size-6 rounded-md text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000",
                          size: "xs",
                          variant: "ghost",
                          setChatState: c,
                        }),
                        (0, a.jsx)(ox.DownvoteButton, {
                          className:
                            "size-6 rounded-md text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000",
                          messageId: e.id,
                          tooltip: d("botMessage.downvote"),
                          variant: "message",
                        }),
                      ],
                    })
                  : null,
                N
                  ? null
                  : (0, a.jsx)(D.Button, {
                      className:
                        "size-6 rounded-md text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000",
                      size: "xs",
                      onClick: _,
                      tooltip: d("botMessage.copy"),
                      tooltipDirection: "bottom",
                      variant: "ghost",
                      children: (0, a.jsx)(lG.CopyCheck, { isCopied: m }),
                    }),
                "message" !== e.type && "added-integration" !== e.type && e.type
                  ? null
                  : (0, a.jsxs)(a.Fragment, {
                      children: [
                        !N || T
                          ? (0, a.jsxs)(en.DropdownMenu, {
                              children: [
                                (0, a.jsx)(en.DropdownMenuTrigger, {
                                  asChild: !0,
                                  children: (0, a.jsx)(D.Button, {
                                    className:
                                      "size-6 rounded-md text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000",
                                    disabled: n || y,
                                    "aria-label": "More actions",
                                    size: "xs",
                                    tooltip: "More actions",
                                    tooltipDirection: "bottom",
                                    variant: "ghost",
                                    children: (0, a.jsx)(eW.MoreHorizontal, {}),
                                  }),
                                }),
                                (0, a.jsx)(en.DropdownMenuContent, {
                                  align: "start",
                                  side: "bottom",
                                  className: "min-w-38 w-auto",
                                  children: (0, a.jsxs)(en.DropdownMenuGroup, {
                                    children: [
                                      (0, a.jsxs)(en.DropdownMenuItem, {
                                        disabled: n || y,
                                        onClick: A,
                                        className:
                                          "h-8 font-geist font-normal text-sm text-v0-gray-900 hover:text-v0-gray-1000",
                                        "aria-label": "Retry Message",
                                        children: [
                                          (0, a.jsx)(or, {
                                            className: "mr-px size-4",
                                          }),
                                          d("botMessage.retry"),
                                        ],
                                      }),
                                      (0, a.jsxs)(en.DropdownMenuItem, {
                                        onClick: R,
                                        className:
                                          "h-8 font-geist font-normal text-sm text-v0-gray-900 hover:text-v0-gray-1000",
                                        children: [
                                          (0, a.jsx)(l$.Link, {
                                            className: "mr-px size-4",
                                          }),
                                          "Copy Link",
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            })
                          : null,
                        (0, a.jsx)(eB, { forkKeyOptions: s, message: e }),
                      ],
                    }),
                p?.isAdminMode
                  ? (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(og, { submit: i }),
                        (0, a.jsxs)(en.DropdownMenu, {
                          children: [
                            (0, a.jsx)(en.DropdownMenuTrigger, {
                              asChild: !0,
                              className: "max-w-[200px]",
                              children: (0, a.jsxs)(D.Button, {
                                size: "xs",
                                className:
                                  "rounded-md text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000 items-center gap-1 flex",
                                tooltip: "View Internal (AI Team only)",
                                tooltipDirection: "bottom",
                                variant: "ghost",
                                children: [
                                  (0, a.jsx)(tv.LockClosed, {}),
                                  " Admin",
                                ],
                              }),
                            }),
                            (0, a.jsx)(en.DropdownMenuContent, {
                              align: "start",
                              side: "bottom",
                              children: (0, a.jsxs)(en.DropdownMenuGroup, {
                                children: [
                                  (0, a.jsx)(en.DropdownMenuItem, {
                                    asChild: !0,
                                    children: (0, a.jsxs)(ee.default, {
                                      href: `/chat/internal/correct/${h}/new`,
                                      children: [
                                        (0, a.jsx)(od.PreviewEye, {}),
                                        "Submit Correction",
                                      ],
                                    }),
                                  }),
                                  (0, a.jsx)(oa.OpenMessageInInternalButton, {
                                    messageId: e.id,
                                  }),
                                  (0, a.jsx)(
                                    oa.OpenMessageInInternalBrowseButton,
                                    { messageId: e.id },
                                  ),
                                  (0, a.jsx)(
                                    oa.OpenMessageInInternalAgentLogsButton,
                                    { messageId: e.id },
                                  ),
                                  (0, a.jsx)(oa.OpenInBraintrustButton, {
                                    messageId: e.id,
                                    chatId: h,
                                  }),
                                  e.parentId
                                    ? (0, a.jsx)(oy, {
                                        parentId: e.parentId,
                                        messageId: e.id,
                                      })
                                    : null,
                                  (0, a.jsx)(of, { messageId: e.id }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
              ],
            }),
          [C, e, m, i, c, d, N, T, n, y, s, p?.isAdminMode, h, _, A, R],
        ),
        V = (0, a.jsx)(lX, { createdAt: e.createdAt });
      if ("added-integration" === e.type && w) return null;
      let F = "reverted-block" === e.type,
        z =
          !r &&
          !n &&
          Array.isArray(e.content.value) &&
          0 === e.content.value.length &&
          !!e.createdAt &&
          Date.now() - new Date(e.createdAt).getTime() > 2e3,
        H = N || z;
      if (F)
        return (0, a.jsx)(lP.BotMessageLayout, {
          id: u,
          isLastMessage: t,
          effect: k.effect,
          onEffectClick: k.onClick,
          actions: null,
          children: (0, a.jsx)(lD.MessageContent, {
            message: e,
            isLastMessage: t,
          }),
        });
      let B = (0, a.jsx)(oe, {
        actions: I,
        finishReason: e.finishReason,
        message: S,
      });
      return (0, a.jsxs)(lP.BotMessageLayout, {
        id: u,
        isLastMessage: t,
        effect: k.effect,
        onEffectClick: k.onClick,
        actions: P,
        hoverActions: V,
        hideActions: E,
        children: [
          (0, a.jsx)(oC, {
            fallback: B,
            children: (0, a.jsx)(lD.MessageContent, {
              message: e,
              isLastMessage: t,
            }),
          }),
          H ? B : null,
          (0, a.jsx)(l9, { message: e }),
          (0, a.jsx)(oT, { message: e }),
          (0, a.jsx)(oE, { message: e }),
        ],
      });
    });
    function oT({ message: e }) {
      if (
        !e.finishReason ||
        (!(
          (e.workMetrics?.diffMap &&
            Object.keys(e.workMetrics.diffMap).length > 0) ||
          e.workMetrics?.imageGenerationCost !== void 0 ||
          e.workMetrics?.linesRead !== void 0 ||
          e.workMetrics?.agentActions !== void 0
        ) &&
          !e.creditCost &&
          !e.usage)
      )
        return null;
      let t = (function (e) {
        if (e.workMetrics?.diffMap) {
          let { diffMap: t } = e.workMetrics,
            n = Object.keys(t).length,
            r = Object.values(t).reduce((e, t) => e + (t.addedLines || 0), 0),
            s = Object.values(t).reduce((e, t) => e + (t.removedLines || 0), 0);
          return {
            timeWorked: oM(e),
            actionsCount: oS(e),
            linesRead: oI(e),
            codeAdded: r,
            codeRemoved: s,
            filesModified: n,
          };
        }
        return {
          timeWorked: oM(e),
          actionsCount: oS(e),
          linesRead: oI(e),
          codeAdded: 0,
          codeRemoved: 0,
          filesModified: 0,
        };
      })(e);
      return (0, a.jsx)(oN, {
        metrics: t,
        creditCost: e.creditCost,
        imageGenerationCost: e.workMetrics?.imageGenerationCost,
        messageId: e.id,
      });
    }
    function oE({ message: e }) {
      let { user: t } = (0, W.useUser)(),
        n = (0, o.useMemo)(() => {
          if (!t?.isAdminMode) return [];
          let n = [];
          return (
            e.usage &&
              (n.push({ label: "Completion", value: e.usage.outputTokens }),
              n.push({ label: "Prompt", value: e.usage.inputTokens || 0 }),
              n.push({ label: "Total", value: e.usage.totalTokens || 0 })),
            e.estimatedUsage &&
              n.push({ label: "Estimation", value: e.estimatedUsage }),
            e.modelId && n.push({ label: "Model", value: e.modelId }),
            n
          );
        }, [e.estimatedUsage, e.modelId, e.usage, t?.isAdminMode]);
      return t?.isAdminMode ? (0, a.jsx)(lQ, { details: n }) : null;
    }
    function o_({ type: e, botMessage: t, setChatState: n, ...r }) {
      let s = (0, $.useT)(),
        {
          chatId: i,
          messageId: o,
          messageText: c,
          leafMessageId: d,
          userId: u,
          promptMessageId: h,
        } = (0, l1.useVoteOptions)({ messageId: t.id }),
        { isLoading: p, canVote: m } = (0, oc.useCanVoteOnMessage)();
      if (p || !m) return null;
      let f = async () => {
        h &&
          o &&
          c &&
          d &&
          ((0, L.track)("SubmitUpvote", { messageId: o, leafMessageId: d }),
          l.toast.success(s("botMessage.successToast")),
          n((e) => ({
            messages: e.messages.map((e) =>
              "id" in e && e.id === o ? { ...e, vote: "upvote" } : e,
            ),
          })),
          await (0, l0.sendMessageFeedback)({
            feedback: "",
            reasons: [],
            chatId: i,
            messageId: o,
            leafMessageId: d,
            userId: u,
            type: "upvote",
            promptMessageId: h,
          }));
      };
      return (0, a.jsx)(D.Button, {
        "aria-label": s("botMessage.upvote"),
        disabled: "upvote" === t.vote,
        onClick: f,
        tooltip: s("botMessage.upvote"),
        tooltipDirection: "bottom",
        type: e,
        ...r,
        children: (0, a.jsx)(oi, {}),
      });
    }
    var oA = e.i(381434),
      oR = e.i(370912),
      oP = e.i(862664);
    e.i(350097);
    var oD = e.i(76866),
      oV = e.i(723487),
      o$ = e.i(685289);
    e.i(607391);
    var oF = e.i(538553);
    function oz() {
      let { user: e } = (0, W.useUser)(),
        { atoms: t } = (0, iV.useCurrentChat)();
      (0, sJ.useAtomValue)(t.authorId);
      let { messages: n, activeForkKey: r } = (0, v.useChatMessages)();
      ((0, e5.useDesignModeEnabled)(),
        (0, v.useSetChatState)(),
        (0, m.useSetActiveBlockState)());
      let { getBlockCreatedAt: s } = (0, oR.useBlockCreatedAt)(),
        i = (0, m.useActiveBlockState)(),
        a = i?.id,
        { history: d, currentBlockIndex: u } = (0, x.useBlockHistory)({
          blockId: a,
          searchAll: !0,
        }),
        { setPulsePreview: h } = (0, x.useSetPulsePreview)(),
        { getBlockDeployed: p } = (0, oP.useDeployedBlocks)(),
        { scrollToHash: f } = (0, z.useScrollToMessage)(),
        g = (0, c.useRouter)(),
        [b, y] = (0, oV.useHistoryPanel)(),
        [j, C] = (0, o.useState)(null),
        [w, k] = (0, o.useState)(null),
        { restoreVersion: N, isRestoring: M } = (0, oD.useRestoreBlockVersion)(
          a,
        ),
        { hasWritePermission: S } = (0, eL.useActiveScope)();
      return (
        (0, oA.isLatestVersionInProgress)(d),
        (0, o.useCallback)(
          (e, t) => {
            (C(e),
              N(e, t, {
                onSuccess: () => {
                  y(!1);
                },
                onFinally: () => {
                  (C(null), k(null));
                },
              }));
          },
          [N, y],
        ),
        (0, o.useCallback)(
          (e) => {
            try {
              (0, o.startTransition)(async () => {
                let t = await (0, o$.forkBlock)({ blockId: e });
                t.ok
                  ? (g.push(`/chat/${t.value.newChatId}`), y(!1))
                  : l.toast.error(t.error);
              });
            } catch (e) {
              (console.log(e), l.toast.error("error"));
            }
          },
          [g, y],
        ),
        e?.id,
        null
      );
    }
    var oH = e.i(91994);
    function oB({ isMobile: e, justSubmitted: t, onSubmit: n }) {
      let r,
        { messages: s, activeForkKey: i } = (0, v.useChatMessages)(),
        {
          isLoading: l,
          isStreaming: p,
          isRestoring: m,
          initialStreamPromise: f,
        } = (0, v.useChatLoadingState)(),
        { expectUser: x } = (0, W.useUser)(),
        { setShowSignInDialog: y } = (0, K.useSignInDialog)(),
        [j] = (0, ef.useRateLimit)(),
        { atoms: C } = (0, iV.useCurrentChat)(),
        w = (0, sJ.useAtomValue)(C.canWriteToChat),
        k = (0, e5.useDesignModeEnabled)(),
        N = (0, g.useIsChatPage)(),
        S = !!(j?.remaining !== void 0 && j.remaining <= 0),
        I = (0, ei.getAnonId)(),
        L = (0, o.useCallback)(
          (e) => {
            y({ content: "new" === e.action && (e.content || !1) });
          },
          [y],
        ),
        T =
          ((r = (0, o.useRef)(["", null])),
          (0, o.useMemo)(() => {
            let [e, t] = r.current,
              n = s.reduce((e, t) => e + "@" + t.id, "");
            if (e === n) return t;
            let i = (0, b.computeForkKeyOptions)(s);
            return ((r.current = [n, i]), i);
          }, [s])),
        E = (0, o.useCallback)(
          (e) => T.get(e.parentId || b.ROOT_MESSAGE_KEY) || oU,
          [T],
        ),
        _ = (0, o.useMemo)(() => new Map(s.map((e) => [e.id, e])), [s]),
        A = (0, o.useMemo)(() => {
          if (!i || 0 === i.length) return [];
          let e = i
              .filter((e) => !e.startsWith(M.OPT_RETRY_ID))
              .map((e) => _.get(e))
              .filter(Boolean),
            t = e[e.length - 1];
          if (!t) return [];
          let n =
            "assistant" === t.role &&
            (t.content.value || []).some(
              (e) => !!Array.isArray(e) && 0 === e[0],
            );
          if (p || l || m) {
            if ("user" === t.role) return [...e, "spinner"];
            if ("assistant" === t.role && !n)
              return [...e.slice(0, -1), "spinner"];
          }
          return e;
        }, [i, p, l, m, _]),
        {
          vlistRef: R,
          scrollToIndex: P,
          handleScroll: D,
          containerRef: V,
          isAtTop: $,
          isAtBottom: F,
        } = (0, z.useChatScroll)(),
        {
          submit: H,
          stopLlmResponse: B,
          setChatState: O,
        } = (0, M.useV0Chat)({ onSubmit: n }),
        {
          isShifting: Z,
          hasMoreMessages: G,
          loadMoreObserver: q,
        } = (0, oH.useCurrentChatMessagePagination)();
      !(function ({ submit: e, initialStreamPromise: t }) {
        let { prefillOptions: n } = (0, v.useChatPrefillOptions)(),
          r = (0, c.useRouter)(),
          s = (0, o.useRef)(!1),
          i = (0, v.useSetChatState)(),
          { setMetadata: a } = (0, d.useChatMetadata)(),
          { user: l } = (0, W.useUser)(),
          { actions: u } = (0, e$.useCurrentChatPrompt)(),
          h = (0, o.useRef)(!1);
        (0, o.useEffect)(() => {
          let r = !1;
          return (
            (async () => {
              if (!t || s.current || null === l) return;
              let a = await t;
              if (!r) {
                if (!a) return i({ initialStreamPromise: void 0 });
                if (
                  (h.current ||
                    (n?.vercelProjectId &&
                      u.setVercelProjectId(n.vercelProjectId),
                    n?.designSystemId && u.setDesignSystemId(n.designSystemId),
                    (h.current = !0)),
                  (s.current = !0),
                  !r)
                ) {
                  if (n?.templateId) {
                    (e(
                      {
                        action: "new",
                        content: n.query
                          ? (0, eI.createMDXMessageContent)(n.query)
                          : null,
                        templateId: n.templateId,
                      },
                      a,
                    ),
                      i({ initialStreamPromise: void 0 }));
                    return;
                  }
                  (e(
                    {
                      action: "new",
                      content: n?.query
                        ? (0, eI.createMDXMessageContent)(n.query)
                        : null,
                    },
                    a,
                  ),
                    i({ initialStreamPromise: void 0 }));
                }
              }
            })(),
            () => {
              r = !0;
            }
          );
        }, [t, n, r, l, e, i, a, u]);
      })({ submit: H, initialStreamPromise: f });
      let Y = (0, o.useMemo)(() => {
          if (!i || !A.length) return [];
          let e = A.includes("spinner"),
            t = A.filter(Boolean).findLast(
              (e) => "spinner" !== e && "user" === e.role,
            ),
            n = t?.id;
          return A.filter(Boolean).map((t, r) => {
            let s = r === A.length - 1,
              i = "spinner-" + r;
            "spinner" !== t && (i = (0, eV.getUIMessageKey)(t));
            let o = "auto";
            s && (o = "max(200px, 40cqh)");
            let c = null;
            if ("spinner" === t)
              c = (0, a.jsx)(lP.BotMessageLayout, {
                id: i,
                isLastMessage: !0,
                children: (0, a.jsx)(eh.motion.div, {
                  ...(0, lP.motionReplyAnimationIf)(!0, 0.6),
                  children: (0, a.jsx)(lA.MockThinkingV1, {}),
                }),
              });
            else {
              if (t.isContentLoading) return null;
              let r = E(t),
                i = e && n === t.id;
              ("user" === t.role &&
                (c = (0, a.jsx)(
                  lK,
                  {
                    awaitingResponse: i,
                    isLastMessage: s,
                    forkKeyOptions: r,
                    message: t,
                  },
                  `user-message-${t.id}`,
                )),
                "assistant" === t.role &&
                  (c = (0, a.jsx)(
                    oL,
                    {
                      forkKeyOptions: r,
                      isLastMessage: s,
                      isLoading: l,
                      isStreaming: p,
                      message: t,
                      submit: H,
                      setChatState: O,
                    },
                    `bot-message-${t.id}`,
                  )));
            }
            return (0, a.jsx)(
              "div",
              {
                className: (0, u.cn)(
                  "flex w-full empty:hidden [&>div]:w-full flex-col py-1.5 px-3",
                  { "pt-4": 0 === r, "pb-12": s },
                ),
                style: { minHeight: o },
                children: c,
              },
              i,
            );
          });
        }, [i, A, E, l, p, H, O]),
        J = (0, o.useMemo)(
          () =>
            void 0 === w
              ? (0, a.jsx)(lf, {})
              : w
                ? (0, a.jsx)(ep.PromptForm, {
                    isAtBottom: F,
                    isMobile: e,
                    isNewChat: !1,
                    isSignedIn: x,
                    isAnonymous: !!(!x && I),
                    stop: B,
                    clearOnSubmit: !!(x || (I && !S)),
                    submit: x || (I && !S) ? H : L,
                  })
                : (0, a.jsx)(oO, {}),
          [w, F, e, x, I, B, S, H, L],
        ),
        Q = A.length;
      return (
        (0, o.useEffect)(() => {
          let e = Q - 1;
          if ("spinner" !== A[e]) return;
          let t = requestAnimationFrame(() => {
            P(e, !0);
          });
          return () => {
            cancelAnimationFrame(t);
          };
        }, [Q]),
        (0, o.useEffect)(() => {
          let e = requestAnimationFrame(() => {
            let e = Q - 1;
            e >= 0 && P(e, !1);
          });
          return () => {
            cancelAnimationFrame(e);
          };
        }, []),
        (0, a.jsxs)("div", {
          className: "flex flex-col size-full relative",
          children: [
            (0, a.jsx)(eT.ConditionalNavigationMarker, {
              enabled: N && (t || !l),
              phase: "content",
              label: "ChatMessagesWithPrompt",
              routeOverride: "/chat/[slug]",
            }),
            (0, a.jsxs)("div", {
              "aria-roledescription": "chat messages",
              className: "relative size-full",
              "data-testid": "chat-messages-container",
              id: h.SCROLL_CONTAINER_ID,
              role: "list",
              style: { contain: "strict" },
              children: [
                (0, a.jsx)(lg.ScrollFade, {
                  visible: !F,
                  direction: "bottom",
                  color: "muted",
                  orientation: "vertical",
                }),
                (0, a.jsx)(lg.ScrollFade, {
                  visible: !$,
                  direction: "top",
                  color: "muted",
                  orientation: "vertical",
                }),
                (0, a.jsx)("div", {
                  className:
                    "relative h-full w-full overflow-y-scroll visible-scrollbar @container/messages",
                  ref: V,
                  style: {
                    ...(0, lR.visibleStylesIf)(!k),
                    overflowAnchor: "none",
                  },
                  id: h.SCROLL_INNER_CONTAINER_ID,
                  ...(0, lR.a11yHideIf)(k),
                  children: (0, a.jsx)(o.Suspense, {
                    fallback: (0, a.jsx)(l_, {}),
                    children: (0, a.jsxs)("div", {
                      className: "group/message-list mx-auto w-full max-w-3xl",
                      children: [
                        G
                          ? (0, a.jsx)("div", {
                              ref: q,
                              className:
                                "flex justify-center h-8 text-label-14 gap-2 items-center text-v0-text-400 animate-pulse",
                              children: (0, a.jsx)(X.Spinner, { size: 16 }),
                            })
                          : null,
                        (0, a.jsx)(eD.Virtualizer, {
                          ref: R,
                          onScroll: D,
                          scrollRef: V,
                          shift: Z,
                          children: Y,
                        }),
                      ],
                    }),
                  }),
                }),
                (0, a.jsx)(le, {}),
                (0, a.jsx)(oz, {}),
              ],
            }),
            (0, a.jsx)("div", {
              className:
                "group/message-list mx-auto w-full max-w-3xl sm:px-0 sm:pb-0 px-2 pb-2",
              children: J,
            }),
            (0, a.jsx)(U, {}),
          ],
        })
      );
    }
    let oO = (0, o.memo)(function () {
        let { hasWritePermission: e } = (0, eL.useActiveScope)(),
          t = (0, m.useActiveBlockState)(),
          { gwe: n } = (0, Z.useFlags)(),
          { chatId: r } = (0, v.useChatId)();
        return t
          ? (0, a.jsx)("div", {
              className: "@container/readonly-prompt w-full",
              children: (0, a.jsxs)("form", {
                className:
                  "material-medium relative flex items-center justify-between rounded-[12px] pl-3 pr-2 py-2 gap-3 border border-v0-blue-400 bg-v0-blue-100 text-v0-blue-700 @max-[250px]/readonly-prompt:flex-col @max-[250px]/readonly-prompt:items-start",
                onSubmit: (e) => {
                  (e.preventDefault(),
                    t &&
                      r &&
                      (n
                        ? (0, eM.openDialog)({
                            type: "duplicateChat",
                            data: {
                              chatId: r,
                              blockId: t.id,
                              actionType: "duplicate",
                            },
                          })
                        : (0, eM.openDialog)({
                            type: "forkBlock",
                            data: {
                              blockId: t.id,
                              page: "chat",
                              canWriteToChat: !1,
                              actionType: "remix",
                            },
                          })));
                },
                children: [
                  (0, a.jsxs)("span", {
                    className: "text-label-14 text-pretty",
                    children: [
                      "This chat is view-only.",
                      " ",
                      (0, a.jsx)("span", {
                        children: n ? "Duplicate" : "Remix",
                      }),
                      " it to make changes.",
                    ],
                  }),
                  (0, a.jsx)(oF.RbacTooltip, {
                    show: !e,
                    requiredRole: "V0Chatter",
                    children: (0, a.jsx)(D.Button, {
                      variant: "blue",
                      size: "sm",
                      type: "submit",
                      className: "@max-[250px]/readonly-prompt:w-full",
                      disabled: !e,
                      children: n ? "Duplicate" : "Remix chat",
                    }),
                  }),
                ],
              }),
            })
          : null;
      }),
      oU = [];
    var oW = e.i(385671),
      oZ = e.i(581965),
      oG = e.i(679232),
      oq = e.i(35036),
      oX = e.i(262553),
      oY = e.i(519738),
      oK = e.i(117803),
      oJ = e.i(534607),
      oQ = e.i(443265),
      o0 = e.i(86617),
      o1 = e.i(435433),
      o2 = e.i(418270);
    function o5({
      icon: e,
      iconFilled: t,
      title: n,
      selected: r,
      onClick: s,
      tooltip: i,
      disabled: l,
      index: o,
    }) {
      let c = (0, oJ.useMac)();
      (0, sY.useShortcut)(
        (e) => {
          e.code === `Digit${o}` && e.altKey && !l && (e.preventDefault(), s());
        },
        [s, l, o],
      );
      let d =
        void 0 === o || l
          ? i
          : (0, a.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, a.jsx)("span", { children: i }),
                (0, a.jsxs)(oQ.KbdGroup, {
                  children: [
                    (0, a.jsx)(oQ.Kbd, { children: c ? "⌥" : "Alt" }),
                    (0, a.jsx)(oQ.Kbd, { children: o }),
                  ],
                }),
              ],
            });
      return (0, a.jsx)(tm.Tooltip, {
        content: d,
        side: "right",
        children: (0, a.jsxs)("button", {
          disabled: l,
          className: (0, u.cn)(
            "flex flex-col items-center justify-center gap-[2px] text-center text-v0-gray-800 text-[11px] font-medium leading-[16px] group/sidebar-item",
            r && "text-v0-alpha-1000 font-semibold",
            l && "text-v0-gray-500",
          ),
          onClick: () => {
            s();
          },
          children: [
            (0, a.jsx)("div", {
              className: (0, u.cn)(
                "p-1.5 rounded-md",
                l
                  ? "cursor-not-allowed"
                  : "group-hover/sidebar-item:bg-v0-alpha-400",
                r && "group-hover/sidebar-item:bg-v0-alpha-400",
              ),
              children: (0, a.jsx)("div", {
                className:
                  "group-hover/sidebar-item:scale-110 transition-all will-change-transform",
                children: r && t ? t : e,
              }),
            }),
            n,
          ],
        }),
      });
    }
    function o3(e) {
      let {
          isStreaming: t,
          isLoading: n,
          isRestoring: r,
          isSyncing: s,
        } = (0, v.useChatLoadingState)(),
        { isReadOnlyMode: i } = (0, oX.useReadOnlyMode)(),
        l = (0, o.useMemo)(() => t || n || r || s, [t, n, r, s]),
        { currentVersion: c } = (0, oY.useBlockVersionInfo)(),
        { frameLoading: d } = (0, oK.useDesignModeToggle)();
      return (0, a.jsx)(
        o5,
        {
          value: "design",
          icon: (0, a.jsx)(oq.DesignSystemsIcon, {}),
          iconFilled: (0, a.jsx)(lk, {}),
          title: "Design",
          selected: e.selected,
          disabled: l || d,
          onClick: e.onClick,
          index: e.index,
          tooltip: i
            ? `Design mode is only available on the latest version. Currently
            viewing v${c}.`
            : t
              ? "Design mode is not available while streaming."
              : d
                ? "Design mode is not available while the preview is loading"
                : "Design Mode",
        },
        "design",
      );
    }
    function o4(e) {
      let { chatId: t } = (0, d.useChatMetadata)(),
        { data: n } = (0, o0.useGitConnection)(t),
        { data: r, isLoading: s } = (0, j.useServerQuerySWR)(
          ["chat", "gitStatus"],
          { chatId: t },
          { stopFetch: !t || !n?.ok || !n.value.connected },
        ),
        i = (0, oG.getChatSidebarAtoms)(t || ""),
        l = (0, sJ.useAtomValue)(i.gitPullError),
        c = (0, o.useMemo)(() => {
          if (!n?.ok || !n.value.connected) return "none";
          if (s) return "syncing";
          if (r?.ok && r.value.pr?.state === "merged") return "merged";
          if (l) return "error";
          if (r?.ok) {
            let e = r.value.localGitStatus;
            return e && "identical" !== e.status ? "warning" : "synced";
          }
          return "none";
        }, [n, r, l, s]);
      return (0, a.jsx)(
        o5,
        {
          value: "git",
          icon: (0, a.jsx)(o1.LogoGitHubSynced, { status: c }),
          iconFilled: (0, a.jsx)(o1.LogoGitHubSynced, { status: c }),
          title: "Git",
          selected: e.selected,
          onClick: e.onClick,
          index: e.index,
          tooltip: e.tooltip,
        },
        "git",
      );
    }
    function o6(e) {
      let t = (0, m.useActiveBlockId)(),
        n = (0, o2.useWizardApi)({ blockId: t || "", closed: !0 }),
        r = (0, o.useMemo)(
          () =>
            "ready" === n.status &&
            n.data.fingerprint &&
            n.data.bannerDismissed,
          [n],
        );
      return (0, a.jsxs)("div", {
        className: "relative",
        children: [
          r &&
            (0, a.jsx)("div", {
              className:
                "absolute top-1 right-3 w-1 h-1 bg-v0-amber-800 rounded-full",
            }),
          (0, a.jsx)(o5, { ...e }),
        ],
      });
    }
    function o7(e) {
      return "design" === e.value
        ? (0, a.jsx)(
            o3,
            { selected: e.selected, onClick: e.onClick, index: e.index },
            e.value,
          )
        : "git" === e.value
          ? (0, a.jsx)(
              o4,
              {
                selected: e.selected,
                onClick: e.onClick,
                index: e.index,
                tooltip: e.tooltip,
              },
              e.value,
            )
          : "connect" === e.value
            ? (0, a.jsx)(o6, { ...e })
            : (0, a.jsx)(
                o5,
                {
                  icon: e.icon,
                  iconFilled: e.iconFilled,
                  title: e.title,
                  selected: e.selected,
                  onClick: e.onClick,
                  disabled: e.disabled,
                  tooltip: e.tooltip,
                  value: e.value,
                  index: e.index,
                },
                e.value,
              );
    }
    function o9() {
      let e = (0, m.useActiveBlockState)(),
        { atoms: t, actions: n } = (0, oG.useCurrentChatSidebar)(),
        { atoms: r } = (0, oW.useChatLayout)(),
        s = (0, sJ.useAtomValue)(t.activeItem),
        i = (0, sJ.useAtomValue)(r.isChatOnRight),
        { atoms: l } = (0, iV.useCurrentChat)(),
        c = (0, sJ.useAtomValue)(l.canWriteToChat),
        { cvod: h, gwe: p } = (0, Z.useFlags)(),
        { chatId: f } = (0, d.useChatMetadata)();
      return ((0, o0.useGitConnection)(f),
      (0, o.useEffect)(() => {
        c || n.setActiveItem("chat");
      }, [n, c]),
      e || h)
        ? (0, a.jsxs)("div", {
            className: (0, u.cn)(
              "hidden flex-col flex-1 p-2 sm:flex min-w-13",
              i ? "pr-0" : "pl-0",
            ),
            children: [
              (0, a.jsx)("div", {
                className: "flex flex-col gap-[10px]",
                children: lS
                  .filter((e) => "git" !== e.value || !!p)
                  .map((t, r) =>
                    (0, a.jsx)(
                      o7,
                      {
                        icon: t.icon,
                        iconFilled: "iconFilled" in t ? t.iconFilled : void 0,
                        title: t.title,
                        selected: t.value === s,
                        tooltip: t.tooltip,
                        onClick: () =>
                          ((t) => {
                            if (!c) {
                              e?.id &&
                                (0, eM.openDialog)({
                                  type: "forkBlock",
                                  data: {
                                    blockId: e.id,
                                    page: "chat",
                                    canWriteToChat: !!c,
                                    actionType: "remix",
                                  },
                                });
                              return;
                            }
                            if ("settings" === t) {
                              ((0, eM.openDialog)({ type: "settings" }),
                                (0, L.track)("ClickSidebarItem", {
                                  item: t,
                                  previousItem: s,
                                  canWriteToChat: !!c,
                                  chatId: e?.id,
                                  blockId: e?.id,
                                }));
                              return;
                            }
                            ("design" === t &&
                              "design" !== s &&
                              (0, L.track)("EnterDesignMode", {
                                source: "sidebar",
                              }),
                              n.setActiveItem(t),
                              (0, L.track)("ClickSidebarItem", {
                                item: t,
                                previousItem: s,
                                canWriteToChat: !!c,
                                chatId: e?.id,
                                blockId: e?.id,
                              }));
                          })(t.value),
                        value: t.value,
                        index: r + 1,
                      },
                      t.title,
                    ),
                  ),
              }),
              (0, a.jsx)("div", {
                className: "mt-auto flex justify-center",
                children: (0, a.jsx)(o7, {
                  icon: (0, a.jsx)(oZ.Envelope, {}),
                  title: "",
                  tooltip: "Send Feedback",
                  onClick: () => (0, eM.openDialog)({ type: "feedback" }),
                  value: "feedback",
                  selected: !1,
                }),
              }),
            ],
          })
        : null;
    }
    var o8 = e.i(276507);
    function ce(e) {
      return (0, a.jsx)("div", {
        className: (0, u.cn)(
          "material-medium bg-v0-background-100 border border-v0-alpha-400 rounded-[8px] overflow-auto mb-2 flex flex-col size-full",
          e.className,
        ),
        ...e,
        children: e.children,
      });
    }
    function ct(e) {
      return (0, a.jsx)("div", {
        ...e,
        className: (0, u.cn)(
          "sticky top-0 z-20 bg-v0-background-100 flex flex-row items-center justify-between w-full h-12 gap-2 px-3 border-b border-v0-alpha-200 py-4",
          e.className,
        ),
        children: e.children,
      });
    }
    function cn(e) {
      return (0, a.jsx)("div", {
        ...e,
        className: (0, u.cn)(
          "text-sm font-medium text-label-14 text-v0-gray-1000 truncate",
          e.className,
        ),
        children: e.children,
      });
    }
    function cr(e) {
      return (0, a.jsx)("div", {
        ...e,
        className: (0, u.cn)("flex flex-col flex-1 size-full p-4", e.className),
        children: e.children,
      });
    }
    function cs({ title: e, subtitle: t, children: n, className: r }) {
      return (0, a.jsx)(o8.Empty, {
        className: (0, u.cn)(
          "relative h-[156px] rounded-md border border-dashed border-v0-gray-300 px-8",
          r,
        ),
        children: (0, a.jsxs)(o8.EmptyContent, {
          children: [
            e &&
              (0, a.jsx)(o8.EmptyTitle, {
                className: "text-sm text-v0-gray-1000",
                children: e,
              }),
            t &&
              (0, a.jsx)(o8.EmptyDescription, {
                className: "text-pretty text-sm text-v0-gray-900",
                children: t,
              }),
            n,
          ],
        }),
      });
    }
    var ci = e.i(459522);
    e.i(243093);
    var ca = e.i(250288),
      cl = e.i(382741),
      co = e.i(592747);
    function cc() {
      let { vercelProjectId: e } = (0, d.useChatMetadata)(),
        { user: t } = (0, W.useUser)(),
        n = (0, $.useT)(),
        {
          isLoading: r,
          addEnvVariable: s,
          hasVercelWritePermission: i,
          envVarCount: l,
        } = (0, ca.useEnvVariables)(),
        o = t?.isImpersonation;
      return (0, a.jsxs)(ce, {
        children: [
          (0, a.jsxs)(ct, {
            children: [
              (0, a.jsx)(cn, { children: "Environment Variables" }),
              (0, a.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [
                  (l > 0 || r) &&
                    (0, a.jsx)(co.EnvVariablesFilter, { disabled: r }),
                  (0, a.jsx)(oF.RbacTooltip, {
                    show: !i,
                    requiredRole: "V0Builder",
                    children: (0, a.jsxs)(D.Button, {
                      variant: "ghost",
                      size: "mini",
                      onClick: s,
                      disabled: !i || r,
                      children: [
                        (0, a.jsx)(ci.Plus, { className: "size-4" }),
                        (0, a.jsx)("span", {
                          className: "sr-only",
                          children: "Add variable",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
          (0, a.jsx)(cr, {
            children:
              (r && 0 === l) || 0 !== l || r
                ? (0, a.jsx)(cl.EnvVariablesList, {})
                : o
                  ? (0, a.jsx)(cs, {
                      title: "Additional Permissions Required",
                      subtitle:
                        "You are impersonating a user. You do not have permission to view Environment Variables of this project.",
                      className: "h-full",
                    })
                  : (0, a.jsx)(cs, {
                      title: n("projectSettings.noEnvVars"),
                      subtitle: n("projectSettings.envVarSubtitle")(
                        e ?? void 0,
                      ),
                      className: "h-full",
                      children: (0, a.jsx)(oF.RbacTooltip, {
                        show: !i,
                        requiredRole: "V0Builder",
                        children: (0, a.jsxs)(D.Button, {
                          size: "sm",
                          variant: "secondary",
                          onClick: s,
                          disabled: !i,
                          children: [(0, a.jsx)(ci.Plus, {}), "Add"],
                        }),
                      }),
                    }),
          }),
        ],
      });
    }
    function cd() {
      return (0, a.jsx)(ca.EnvVariablesProvider, {
        children: (0, a.jsx)(cc, {}),
      });
    }
    var cu = e.i(950955),
      ch = e.i(854218),
      cp = e.i(614539),
      cm = e.i(707974),
      cf = e.i(66990);
    function cg() {
      let { project: e } = (0, d.useChatMetadata)(),
        t = e?.projectId,
        [n, r] = (0, o.useState)(!1),
        { isLoading: s } = (0, em.useProjectInstructions)(t);
      return t
        ? (0, a.jsxs)(ce, {
            children: [
              (0, a.jsx)(ct, {
                children: (0, a.jsx)(cn, { children: "Project Rules" }),
              }),
              (0, a.jsx)(cr, {
                className: "p-0",
                children: s
                  ? (0, a.jsxs)("div", {
                      className: "flex flex-col gap-3",
                      children: [
                        (0, a.jsx)(i9.Skeleton, { className: "h-36 w-full" }),
                        (0, a.jsx)(D.Button, {
                          disabled: !0,
                          variant: "secondary",
                          size: "sm",
                          className: "h-7 rounded-md",
                          children: "Save Changes",
                        }),
                      ],
                    })
                  : (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(cv, { setSaving: r, projectId: t }),
                        (0, a.jsx)(cf.Separator, {}),
                        (0, a.jsx)(cb, { setSaving: r, projectId: t }),
                      ],
                    }),
              }),
            ],
          })
        : (0, a.jsxs)(ce, {
            children: [
              (0, a.jsx)(ct, {
                children: (0, a.jsx)(cn, { children: "Project Rules" }),
              }),
              (0, a.jsx)(cr, {
                children: (0, a.jsx)(cs, {
                  title: "No Project Connected",
                  subtitle:
                    "Connect your chat to a Vercel Project to get started with project rules.",
                  className: "h-full",
                }),
              }),
            ],
          });
    }
    function cx({ label: e, info: t }) {
      return (0, a.jsxs)("div", {
        className: "flex items-center gap-1",
        children: [
          (0, a.jsx)(cm.Label, { children: e }),
          (0, a.jsx)(tm.Tooltip, {
            content: (0, a.jsx)("div", {
              className: "text-center",
              children: t,
            }),
            children: (0, a.jsx)(t_.InformationFillSmall, {}),
          }),
        ],
      });
    }
    function cv({ setSaving: e, projectId: t }) {
      let { instructions: n, isLoading: r } = (0, em.useProjectInstructions)(t),
        s = (0, em.useCanMakeProjectUpdates)();
      return t
        ? (0, a.jsxs)("div", {
            className: "flex flex-col gap-2 p-4",
            children: [
              (0, a.jsx)("div", {
                className: "flex items-center gap-1",
                children: (0, a.jsx)(cx, {
                  label: "Instructions",
                  info: "Custom instructions and guidelines for v0 to follow in responses.",
                }),
              }),
              r
                ? (0, a.jsxs)("div", {
                    className: "flex flex-col gap-3",
                    children: [
                      (0, a.jsx)(i9.Skeleton, { className: "h-36 w-full" }),
                      (0, a.jsx)(D.Button, {
                        disabled: !0,
                        variant: "secondary",
                        size: "sm",
                        className: "h-7 rounded-md",
                        children: "Save Changes",
                      }),
                    ],
                  })
                : (0, a.jsx)(ch.ProjectInstructions, {
                    readOnly: !s,
                    projectId: t,
                    initialInstructions: n,
                    textAreaMinHeight: 144,
                    buttonVariant: "secondary",
                    onSubmit: () => {
                      e(!0);
                    },
                    onFinish: () => {
                      e(!1);
                    },
                  }),
            ],
          })
        : null;
    }
    function cb({ setSaving: e, projectId: t }) {
      let n = (0, $.useT)(),
        { isLoading: r } = (0, em.useProjectSources)(t);
      return t
        ? r
          ? (0, a.jsx)(cu.SectionListSkeleton, {
              title: n("projectSettings.sources"),
            })
          : (0, a.jsxs)("div", {
              className: "flex flex-col gap-2 p-4",
              children: [
                (0, a.jsx)(cx, {
                  label: n("projectSettings.sources"),
                  info: "Sources let v0 use your files and information in responses.",
                }),
                (0, a.jsx)(cp.ProjectSources, {
                  projectId: t,
                  onSubmit: () => e(!0),
                  onFinish: () => e(!1),
                  emptyStateComponent: cu.EmptyState,
                  showEmptyTitle: !1,
                }),
              ],
            })
        : null;
    }
    var cy = e.i(481498),
      cj = e.i(636282);
    function cC() {
      let e = (0, m.useActiveBlockId)(),
        t = (0, o2.useWizardApi)({ blockId: e || "", closed: !0 }),
        { actions: n } = (0, cj.useWizardAtoms)(),
        [r, s] = (0, o.useTransition)();
      if (
        !(0, o.useMemo)(
          () =>
            "ready" === t.status &&
            t.data.fingerprint &&
            t.data.bannerDismissed,
          [t],
        ) ||
        "ready" !== t.status
      )
        return null;
      let i = t.data.fingerprint;
      return (0, a.jsx)("div", {
        className:
          "border-b border-v0-gray-200 bg-v0-amber-200 p-3 text-v0-amber-900",
        children: (0, a.jsxs)("div", {
          className: "flex items-start gap-2",
          children: [
            (0, a.jsx)(eq.Warning, { className: "size-4 shrink-0 mt-0.5" }),
            (0, a.jsxs)("div", {
              className: "flex-1 min-w-0",
              children: [
                (0, a.jsx)("div", {
                  className: "text-sm font-medium mb-1",
                  children: "This generation may require configuration",
                }),
                (0, a.jsx)("div", {
                  className: "text-sm mb-3",
                  children:
                    "Some integrations or environment variables may need to be set up.",
                }),
                (0, a.jsx)(D.Button, {
                  size: "sm",
                  variant: "ghost",
                  disabled: r,
                  className:
                    "h-7 rounded-md px-2 hover:bg-v0-alpha-500 focus-visible:bg-v0-alpha-500 border-transparent bg-v0-alpha-200 text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-v0-alpha-200 disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-v0-alpha-200 aria-disabled:text-v0-gray-500",
                  onClick: () => {
                    i &&
                      (s(async () => {
                        await t.update({
                          setBannerDismissed: { fingerprint: i, dismissed: !1 },
                        });
                      }),
                      n.setIsOpenIntent(!0));
                  },
                  children: "Open Setup",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function cw() {
      return (0, a.jsxs)(ce, {
        children: [
          (0, a.jsx)(ct, {
            children: (0, a.jsx)(cn, { children: "Integrations" }),
          }),
          (0, a.jsxs)(cr, {
            className: "p-0 @container",
            children: [
              (0, a.jsx)(cC, {}),
              (0, a.jsx)(o.Suspense, {
                fallback: (0, a.jsx)(cy.IntegrationOptionsSkeleton, {}),
                children: (0, a.jsx)(cy.IntegrationOptions, {}),
              }),
            ],
          }),
        ],
      });
    }
    var ck = e.i(878418),
      cN = e.i(666425);
    e.i(624424);
    var cM = e.i(174890),
      cS = e.i(334548),
      cI = e.i(643312);
    function cL({ chatId: e, latestBlockId: t }) {
      let { project: n } = (0, d.useChatMetadata)(),
        { vercelProject: r, status: s } = (0, cI.useIntegrationsApi)();
      return (0, a.jsxs)(ce, {
        children: [
          (0, a.jsx)(ct, {
            children: (0, a.jsx)(cn, { children: "Settings" }),
          }),
          (0, a.jsxs)(cr, {
            className: "@container p-0 flex flex-col",
            children: [
              (0, a.jsx)("div", {
                className: "p-4",
                children: (0, a.jsxs)("div", {
                  className: "grid grid-cols-1 @[320px]:grid-cols-2 gap-3",
                  children: [
                    (0, a.jsx)(ck.VercelProject, {}),
                    n?.projectId &&
                      (0, a.jsx)(cN.Git, {
                        vercelProjectWithDashboard: r ?? null,
                        isLoading: "loading" === s,
                        v0ProjectId: n.projectId,
                        closeSettingsSheet: () => {},
                        chatId: e,
                        latestBlockId: t,
                      }),
                  ],
                }),
              }),
              (0, a.jsxs)(cM.BuiltWithV0Provider, {
                children: [
                  (0, a.jsx)(cf.Separator, {}),
                  (0, a.jsx)("div", {
                    className: "p-4",
                    children: (0, a.jsx)(cS.ToggleSwitch, {}),
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    }
    var cT = e.i(175457),
      cE = e.i(89625);
    function c_({ children: e, variant: t = "gray", className: n }) {
      return (0, a.jsx)("div", {
        className: (0, u.cn)(
          "flex items-center gap-1 px-1.5 py-0.5 rounded-md font-medium font-mono",
          "gray" === t && "bg-v0-gray-300 text-v0-gray-1000",
          "blue" === t && "bg-v0-blue-300 text-v0-blue-900",
          n,
        ),
        children: e,
      });
    }
    var cA = e.i(230766),
      cR = e.i(502398),
      cP = (0, T.createServerReference)(
        "7897babb046f5365482c582e1d985b82b77032cfdc",
        T.callServer,
        void 0,
        T.findSourceMapURL,
        "pullGitChangesToChat",
      ),
      cD = e.i(480187),
      cV = e.i(520234);
    function c$({ chatId: e, latestBlockId: t }) {
      let { data: n, error: r, mutate: s } = (0, o0.useGitConnection)(e);
      return r || !n?.ok
        ? (0, a.jsxs)(ce, {
            children: [
              (0, a.jsx)(ct, {
                children: (0, a.jsx)(cn, { children: "GitHub Connection" }),
              }),
              (0, a.jsx)(cr, {
                className: "p-4 gap-4",
                children: (0, a.jsx)("div", {
                  className: "flex size-full items-center justify-center",
                  children: (0, a.jsx)(o8.Empty, {
                    children: (0, a.jsxs)(o8.EmptyContent, {
                      children: [
                        (0, a.jsx)(o8.EmptyIcon, {
                          className: "[&>svg]:text-v0-red-800!",
                          children: (0, a.jsx)(l8.Stop, {}),
                        }),
                        (0, a.jsx)(o8.EmptyTitle, {
                          children: "Error Loading GitHub Connection",
                        }),
                        (0, a.jsx)(o8.EmptyDescription, {
                          children:
                            r?.message || "Failed to fetch GitHub connection",
                        }),
                        (0, a.jsx)(D.Button, {
                          size: "sm",
                          className: "h-7 rounded-md",
                          onClick: () => {
                            s();
                          },
                          children: "Retry",
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            ],
          })
        : n.value.connected
          ? (0, a.jsxs)(ce, {
              children: [
                (0, a.jsx)(ct, {
                  children: (0, a.jsx)(cn, { children: "GitHub Connection" }),
                }),
                (0, a.jsxs)(cr, {
                  className: "p-4 gap-4",
                  children: [
                    (0, a.jsx)(cz, { ...n.value }),
                    (0, a.jsx)(cO, {
                      isNewGitConnection: n.value.base === n.value.head,
                      org: n.value.org,
                      repo: n.value.repo,
                      branchName: n.value.head,
                      chatId: e,
                    }),
                    (0, a.jsx)(cf.Separator, {}),
                    (0, a.jsx)(cW, { chatId: e }),
                  ],
                }),
              ],
            })
          : (0, a.jsxs)(ce, {
              children: [
                (0, a.jsx)(ct, {
                  children: (0, a.jsx)(cn, { children: "GitHub Connection" }),
                }),
                (0, a.jsx)(cr, {
                  className: "p-4 gap-4",
                  children: (0, a.jsx)(cF, { chatId: e, latestBlockId: t }),
                }),
              ],
            });
    }
    function cF({ chatId: e, latestBlockId: t }) {
      return (0, a.jsxs)("div", {
        className:
          "flex h-full w-full flex-col items-center justify-center gap-4 text-center",
        children: [
          (0, a.jsx)("div", {
            className:
              "flex items-center justify-center size-7 rounded-md border border-v0-alpha-400",
            children: (0, a.jsx)(eC.LogoGithub, {
              className: "text-v0-gray-900!",
            }),
          }),
          (0, a.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [
              (0, a.jsx)("h3", {
                className: "font-medium text-label-14",
                children: "No GitHub Repository",
              }),
              (0, a.jsx)("p", {
                className: "text-label-14 text-v0-gray-900 max-w-[400px]",
                children:
                  "This chat isn't connected to a repository. Select an existing repository or create a new one.",
              }),
            ],
          }),
          (0, a.jsx)(D.Button, {
            variant: "secondary",
            size: "sm",
            onClick: () => {
              (0, eM.openDialog)({
                type: "connectRepo",
                data: { chatId: e, latestBlockId: t },
              });
            },
            children: "Connect",
          }),
        ],
      });
    }
    function cz({ org: e, repo: t, base: n, head: r }) {
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-4",
        children: [
          (0, a.jsx)(cH, {
            variant: "Repository",
            value: `${e}/${t}`,
            url: `https://github.com/${e}/${t}`,
          }),
          (0, a.jsx)(cH, {
            variant: "Base",
            value: n,
            url: `https://github.com/${e}/${t}/tree/${n}`,
          }),
          (0, a.jsx)(cH, {
            variant: "Branch",
            value: r,
            url: `https://github.com/${e}/${t}/tree/${r}`,
          }),
        ],
      });
    }
    function cH({ variant: e, value: t, url: n }) {
      return (0, a.jsxs)("div", {
        className: "flex items-center justify-between gap-2",
        children: [
          (0, a.jsx)("div", {
            className:
              "text-v0-gray-900 font-medium text-label-13 flex-shrink-0",
            children: e,
          }),
          (0, a.jsx)(cR.Link, {
            href: n,
            external: !0,
            className:
              "text-label-12 cursor-pointer hover:opacity-80 transition-opacity min-w-0",
            children: (0, cV.match)(e)
              .with("Repository", () =>
                (0, a.jsxs)(c_, {
                  children: [
                    (0, a.jsx)(eC.LogoGithub, {
                      className: "size-3.5 flex-shrink-0",
                    }),
                    (0, a.jsx)("span", { className: "truncate", children: t }),
                  ],
                }),
              )
              .with("Base", () =>
                (0, a.jsx)(c_, {
                  children: (0, a.jsx)("span", {
                    className: "truncate",
                    children: t,
                  }),
                }),
              )
              .with("Branch", () =>
                (0, a.jsx)(c_, {
                  variant: "blue",
                  children: (0, a.jsx)("span", {
                    className: "truncate",
                    children: t,
                  }),
                }),
              )
              .exhaustive(),
          }),
        ],
      });
    }
    function cB() {
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
          (0, a.jsx)("div", {
            className:
              "h-7 w-full bg-v0-gray-100 rounded-md animate-pulse border border-v0-gray-200",
          }),
          (0, a.jsx)("div", {
            className:
              "h-7 w-full bg-v0-gray-100 rounded-md animate-pulse border border-v0-gray-200",
          }),
        ],
      });
    }
    function cO({
      isNewGitConnection: e,
      org: t,
      repo: n,
      branchName: r,
      chatId: s,
    }) {
      let {
          data: i,
          isLoading: c,
          error: d,
          revalidate: u,
        } = (0, j.useServerQuerySWR)(["chat", "gitStatus"], { chatId: s }),
        h = (0, m.useActiveBlockState)(),
        { setGitPullError: p } = (0, oG.getChatSidebarActions)(s),
        [f, g] = (0, o.useState)(!1),
        x = (0, o.useCallback)(() => {
          h &&
            (0, eM.openDialog)({
              type: "duplicateChat",
              data: { chatId: s, blockId: h.id },
            });
        }, [h, s]);
      if (c || !i) return (0, a.jsx)(cB, {});
      if (d || !i.ok)
        return (0, a.jsxs)("div", {
          className: "flex flex-col gap-2",
          children: [
            (0, a.jsx)(D.Button, {
              size: "xs",
              className: "w-full",
              disabled: !0,
              children: "Error Loading Git Status",
            }),
            (0, a.jsx)(D.Button, {
              size: "xs",
              variant: "secondary",
              className: "w-full",
              onClick: () => {
                u();
              },
              children: "Retry",
            }),
          ],
        });
      let v = async () => {
          if (
            i.value.localGitStatus &&
            "identical" !== i.value.localGitStatus.status &&
            !f
          ) {
            g(!0);
            try {
              let e = await cP(s, r, t, n);
              e.success
                ? (l.toast.success("Successfully pulled changes from GitHub"),
                  p(!1),
                  await u())
                : (l.toast.error(e.error || "Failed to pull changes"), p(!0));
            } catch (t) {
              let e = t instanceof Error ? t.message : "Failed to pull changes";
              (l.toast.error(e), p(!0));
            } finally {
              g(!1);
            }
          }
        },
        { localGitStatus: b, pr: y } = i.value;
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
          (0, a.jsx)(tm.Tooltip, {
            content: b?.status === "identical" && "No changes to pull",
            children: (0, a.jsxs)(D.Button, {
              size: "sm",
              className: "w-full h-7 rounded-md",
              disabled: !b || "identical" === b.status || f,
              onClick: v,
              children: [
                (0, a.jsx)("span", {
                  children: f ? "Pulling Changes..." : "Pull Changes",
                }),
                b?.status !== "identical" &&
                  !f &&
                  (0, a.jsx)("div", {
                    className:
                      "rounded-full bg-v0-gray-900/50 size-4 flex items-center justify-center text-label-11 text-v0-white",
                    children: b?.behind || "!",
                  }),
              ],
            }),
          }),
          (() => {
            let { githubBranchStatus: r, pr: s } = i.value;
            if (!s)
              return r
                ? (0, a.jsx)(tm.Tooltip, {
                    content: e
                      ? "Duplicate chat to create a new branch"
                      : "identical" === r.status && "No changes yet!",
                    children: (0, a.jsxs)(D.Button, {
                      size: "sm",
                      variant: "secondary",
                      className: "h-7 rounded-md",
                      disabled: e || "identical" === r.status,
                      onClick: () =>
                        (0, eM.openDialog)({ type: "createPullRequest" }),
                      children: [
                        (0, a.jsx)(cE.GitPullRequest, {}),
                        "Create a PR",
                      ],
                    }),
                  })
                : (0, a.jsx)(D.Button, {
                    size: "sm",
                    variant: "secondary",
                    disabled: !0,
                    children: "Branch deleted",
                  });
            switch (s.state) {
              case "open":
                return (0, a.jsx)(D.Button, {
                  size: "sm",
                  variant: "secondary",
                  className: "h-7 rounded-md",
                  asChild: !0,
                  children: (0, a.jsxs)(cR.Link, {
                    href: `https://github.com/${t}/${n}/pull/${s.id}`,
                    target: "_blank",
                    children: [
                      (0, a.jsx)(cE.GitPullRequest, {
                        style: { color: "var(--v0-green-900)" },
                      }),
                      "PR #",
                      s.id,
                      (0, a.jsxs)("div", {
                        className: "[&>svg]:size-2",
                        children: [" ", (0, a.jsx)(Q.External, {}), " "],
                      }),
                    ],
                  }),
                });
              case "merged":
                return (0, a.jsx)(D.Button, {
                  size: "sm",
                  variant: "secondary",
                  className: "h-7 rounded-md",
                  asChild: !0,
                  children: (0, a.jsxs)(cR.Link, {
                    href: `https://github.com/${t}/${n}/pull/${s.id}`,
                    target: "_blank",
                    children: [
                      (0, a.jsx)(cT.GitMerge, {
                        style: { color: "var(--v0-purple-900)" },
                      }),
                      "PR #",
                      s.id,
                      (0, a.jsx)("div", {
                        className: "[&>svg]:size-2",
                        children: (0, a.jsx)(Q.External, {}),
                      }),
                    ],
                  }),
                });
              case "closed":
                return (0, a.jsx)(D.Button, {
                  size: "sm",
                  variant: "secondary",
                  className: "h-7 rounded-md",
                  asChild: !0,
                  children: (0, a.jsxs)(cR.Link, {
                    href: `https://github.com/${t}/${n}/pull/${s.id}`,
                    target: "_blank",
                    children: [
                      (0, a.jsx)(cE.GitPullRequest, {
                        style: { color: "var(--v0-red-900)" },
                      }),
                      "PR #",
                      s.id,
                    ],
                  }),
                });
            }
          })(),
          y?.state === "merged" &&
            (0, a.jsxs)("div", {
              className: "flex flex-col gap-3 p-3 rounded-lg bg-v0-blue-100",
              children: [
                (0, a.jsx)("div", {
                  className: "text-label-14 text-v0-blue-900",
                  children:
                    "This chat has entered a read-only state since its branch was merged/deleted. Duplicate this chat to make changes.",
                }),
                (0, a.jsxs)(D.Button, {
                  size: "sm",
                  variant: "blue",
                  className: "h-7 rounded-md",
                  onClick: x,
                  children: [(0, a.jsx)(eZ.Copy, {}), "Duplicate Chat"],
                }),
              ],
            }),
        ],
      });
    }
    function cU() {
      let e = [140, 160, 120, 150];
      return (0, a.jsxs)("div", {
        className: "flex flex-col gap-4",
        children: [
          (0, a.jsx)("div", {
            className: "font-medium text-v0-gray-900 text-label-13",
            children: "Activity",
          }),
          (0, a.jsx)("div", {
            className: "flex flex-col gap-1",
            children: e.map((t, n) =>
              (0, a.jsxs)(
                "div",
                {
                  className: "flex-col flex gap-1",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, a.jsx)("div", {
                          className:
                            "size-3 rounded-full bg-v0-gray-200 animate-pulse",
                        }),
                        (0, a.jsxs)("div", {
                          className: "flex-1 flex items-center gap-1.5",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "h-4 bg-v0-gray-200 rounded animate-pulse",
                              style: { width: `${t}px` },
                            }),
                            (0, a.jsx)("span", {
                              className: "text-label-13 text-v0-gray-400",
                              children: "•",
                            }),
                            (0, a.jsx)("div", {
                              className:
                                "h-4 w-[45px] bg-v0-gray-200 rounded animate-pulse",
                            }),
                          ],
                        }),
                      ],
                    }),
                    n < e.length - 1 &&
                      (0, a.jsx)("div", {
                        className: "w-px ml-1.5 h-2 bg-v0-gray-100",
                      }),
                  ],
                },
                n,
              ),
            ),
          }),
        ],
      });
    }
    function cW({ chatId: e }) {
      let {
          data: t,
          isLoading: n,
          error: r,
          revalidate: s,
        } = (0, j.useServerQuerySWR)(["chat", "gitActivity"], { chatId: e }),
        i = t?.ok && t.value.length > 0 ? t.value : [];
      return n
        ? (0, a.jsx)(cU, {})
        : r || 0 === i.length
          ? (0, a.jsxs)(cs, {
              children: [
                (0, a.jsx)(o8.EmptyTitle, {
                  children: "Error Loading Git Activity",
                }),
                (0, a.jsx)(o8.EmptyDescription, {
                  children: r?.message || "Failed to fetch git activity",
                }),
                (0, a.jsx)(D.Button, {
                  size: "sm",
                  className: "h-7 rounded-md",
                  onClick: () => {
                    s();
                  },
                  children: "Retry",
                }),
              ],
            })
          : (0, a.jsxs)("div", {
              className: "flex flex-col gap-4",
              children: [
                (0, a.jsx)("div", {
                  className: "font-medium text-v0-gray-900 text-label-13",
                  children: "Activity",
                }),
                (0, a.jsx)("div", {
                  className: "flex flex-col gap-1",
                  children: i.map((e, t) =>
                    (0, a.jsxs)(
                      "div",
                      {
                        className: "flex-col flex gap-1",
                        children: [
                          (0, a.jsx)(
                            cZ,
                            {
                              variant: e.variant,
                              activityEntity: e.activityEntity,
                              timestamp: e.timestamp,
                              url: e.url,
                            },
                            t,
                          ),
                          t < i.length - 1 &&
                            (0, a.jsx)("div", {
                              className:
                                "w-[1.5px] ml-[7px] h-2.5 bg-v0-alpha-400",
                            }),
                        ],
                      },
                      t,
                    ),
                  ),
                }),
              ],
            });
    }
    function cZ({ variant: e, activityEntity: t, timestamp: n, url: r }) {
      let s,
        i,
        l,
        o,
        c,
        d,
        u,
        h = ((t, n) => {
          let r = ({ children: e }) =>
            n
              ? (0, a.jsx)(cR.Link, {
                  href: n,
                  external: !0,
                  className: "font-medium hover:underline cursor-pointer",
                  children: e,
                })
              : (0, a.jsx)("span", { className: "font-medium", children: e });
          switch (e) {
            case "create-commit":
              return {
                icon: (0, a.jsx)(cD.GitCommitSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)(r, { children: t.slice(0, 7) }),
                    " committed",
                  ],
                }),
              };
            case "create-branch":
              return {
                icon: (0, a.jsx)(cD.GitBranchSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [(0, a.jsx)(r, { children: t }), " was created"],
                }),
              };
            case "create-chat":
              return {
                icon: (0, a.jsx)(cA.AvatarUser, {
                  username: t,
                  size: "xs",
                  className: "rounded-full size-4",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)(r, { children: t }),
                    " created the chat",
                  ],
                }),
              };
            case "create-pr":
              return {
                icon: (0, a.jsx)(cD.GitPRSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsxs)(r, { children: ["PR #", t] }),
                    " was created",
                  ],
                }),
              };
            case "pull-changes":
              return {
                icon: (0, a.jsx)(cD.GitPullSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [
                    "Pulled changes from ",
                    (0, a.jsx)(r, { children: t }),
                  ],
                }),
              };
            case "create-repo":
              return {
                icon: (0, a.jsx)(eC.LogoGithub, {
                  className: "size-3 text-v0-gray-700",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [(0, a.jsx)(r, { children: t }), " was created"],
                }),
              };
            case "merge-pr":
              return {
                icon: (0, a.jsx)(cD.GitMergeSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsxs)(r, { children: ["PR #", t] }),
                    " was merged",
                  ],
                }),
              };
            case "delete-branch":
              return {
                icon: (0, a.jsx)(cD.CrossCircleSmall, {
                  className: "text-v0-gray-900",
                }),
                message: (0, a.jsxs)(a.Fragment, {
                  children: [(0, a.jsx)(r, { children: t }), " was deleted"],
                }),
              };
          }
        })(t, r);
      return (0, a.jsxs)("div", {
        className: "flex items-center gap-2 text-label-13 text-v0-gray-900",
        children: [
          h.icon,
          (0, a.jsxs)("div", {
            className: "flex-1 flex gap-1.5 min-w-0",
            children: [
              (0, a.jsx)("span", {
                className: "truncate min-w-0",
                children: h.message,
              }),
              (0, a.jsx)("span", { className: "flex-shrink-0", children: "•" }),
              (0, a.jsx)("span", {
                className: "flex-shrink-0 whitespace-nowrap",
                children:
                  ((c = Math.floor(
                    (o = Math.floor(
                      (l = Math.floor(
                        (i = Math.floor(
                          (s = Math.floor((Date.now() - n) / 1e3)) / 60,
                        )) / 60,
                      )) / 24,
                    )) / 7,
                  )),
                  (d = Math.floor(o / 30)),
                  (u = Math.floor(o / 365)) > 0
                    ? `${u}y ago`
                    : d > 0
                      ? `${d}mo ago`
                      : c > 0
                        ? `${c}w ago`
                        : o > 0
                          ? `${o}d ago`
                          : l > 0
                            ? `${l}h ago`
                            : i > 0
                              ? `${i}m ago`
                              : s > 0
                                ? `${s}s ago`
                                : "just now"),
              }),
            ],
          }),
        ],
      });
    }
    function cG({
      isMobile: e,
      isAuthor: t,
      templates: n,
      isRecentsHomepageEnabled: r = !1,
      emptyScreenRef: s,
      recents: i,
    }) {
      let [l, c] = (0, o.useState)(!1),
        d = (0, o.useCallback)(() => {
          (c(!0), setTimeout(() => c(!1), 1e3));
        }, []),
        { initialStreamPromise: u } = (0, v.useChatLoadingState)(),
        h = (0, oW.getChatLayoutAtoms)(),
        p = (0, sJ.useAtomValue)(h.isChatOnRight);
      return (0, g.useIsChatPage)() || void 0 !== u
        ? (0, a.jsxs)("div", {
            className: (0, q.default)(
              "relative flex h-full min-w-0 flex-1 flex-row",
              p ? "sm:pl-2 flex-row-reverse" : "sm:pr-2",
              !t && "[&_.author-action]:hidden",
            ),
            "data-testid": "full-chat",
            children: [
              (0, a.jsx)(o9, {}),
              (0, a.jsx)(cq, { isMobile: e, onSubmit: d, justSubmitted: l }),
              (0, a.jsx)(Y, {}),
            ],
          })
        : (0, a.jsxs)(eA, {
            isMobile: e,
            onSubmit: d,
            ref: s,
            isRecentsHomepageEnabled: r,
            children: [i, n],
          });
    }
    function cq({ isMobile: e, onSubmit: t, justSubmitted: n }) {
      (0, oK.useDesignModeEffects)();
      let r = (0, v.assertChatId)((0, v.useChatId)().chatId),
        { canWriteToChat: s } = (0, d.useChatMetadata)(),
        { atoms: i } = (0, oG.useCurrentChatSidebar)(),
        l = (0, sJ.useAtomValue)(i.activeItem),
        { allBlocks: c } = (0, x.useBlockHistory)({ searchAll: !1 }),
        u = (0, o.useMemo)(
          () => c.findLast((e) => "code-project" === e.type)?.id,
          [c],
        );
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(o.Activity, {
            mode: "chat" === l || "design" === l ? "visible" : "hidden",
            children: (0, a.jsx)(oB, {
              isMobile: e,
              onSubmit: t,
              justSubmitted: n,
            }),
          }),
          s &&
            (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(o.Activity, {
                  mode: "rules" === l ? "visible" : "hidden",
                  children: (0, a.jsx)(cg, {}),
                }),
                (0, a.jsx)(o.Activity, {
                  mode: "env-vars" === l ? "visible" : "hidden",
                  children: (0, a.jsx)(cd, {}),
                }),
                (0, a.jsx)(o.Activity, {
                  mode: "connect" === l ? "visible" : "hidden",
                  children: (0, a.jsx)(cw, {}),
                }),
                (0, a.jsx)(o.Activity, {
                  mode: "git" === l ? "visible" : "hidden",
                  children: (0, a.jsx)(c$, { chatId: r, latestBlockId: u }),
                }),
                (0, a.jsx)(o.Activity, {
                  mode: "settings" === l ? "visible" : "hidden",
                  children: (0, a.jsx)(cL, { chatId: r, latestBlockId: u }),
                }),
              ],
            }),
        ],
      });
    }
    var cX = e.i(162061),
      cY = e.i(147753),
      cK = e.i(184399),
      cJ = e.i(77276),
      cQ = e.i(899488),
      c0 = e.i(745587),
      c1 = e.i(44337),
      c2 = e.i(293060),
      c5 = e.i(284546),
      c3 = e.i(266148),
      c4 = e.i(77878);
    function c6() {
      let { cvod: e } = (0, Z.useFlags)();
      return e
        ? (0, a.jsxs)("div", {
            className: "flex flex-col items-center justify-center h-full",
            children: [
              (0, a.jsx)(c4.RingLogoLoader, {}),
              (0, a.jsxs)("div", {
                className:
                  "flex flex-col items-center justify-center gap-1 text-center mt-4",
                children: [
                  (0, a.jsx)("p", {
                    className: "text-v0-gray-900 text-label-14",
                    children: "Nothing to see here, yet.",
                  }),
                  (0, a.jsx)("p", {
                    className: "text-v0-gray-900 text-label-14",
                    children: "Ask v0 to create some UI to get started.",
                  }),
                ],
              }),
            ],
          })
        : null;
    }
    var c7 = e.i(625500);
    function c9({ activeBlockState: e, renderedBlock: t, remote: n }) {
      let r = e?.id;
      !r && n && (r = "@remote");
      let s = (0, g.useIsChatPage)(),
        { pipl: i } = (0, Z.useFlags)(),
        { isReadOnlyMode: l } = (0, oX.useReadOnlyMode)(),
        { messagesLength: c } = (0, v.useChatMessagesLength)(),
        { isStreaming: d } = (0, v.useChatLoadingState)(),
        { activeTab: p } = (0, c5.useActiveTab)(),
        f = (0, e5.useDesignModeEnabled)(),
        b = (0, oW.getChatLayoutAtoms)(),
        y = (0, oW.getChatLayoutActions)(),
        j = (0, sJ.useAtomValue)(b.isInputPanelOpen),
        C = (0, sJ.useAtomValue)(b.isChatOnRight),
        w = (0, sJ.useAtomValue)(b.isDesktopPreviewSize),
        k = (0, m.useSetActiveBlockView)(),
        N = (0, o.useCallback)(() => k(!1), [k]),
        M = (0, o.useRef)(void 0);
      (0, o.useEffect)(() => {
        if (e && !e.initial && e.id !== M.current?.id) {
          let t = cX.default.get(h.BLOCK_RESIZE_COOKIE);
          ((0, L.track)("ViewBlock", {
            blockType: e.type,
            blockId: e.id,
            messageId: e.messageId,
            blockViewSizePercent: void 0 === t ? null : parseInt(t),
            forkedFromBlockId: e.forkedFromBlockId ?? null,
          }),
            (M.current = e));
        }
      }, [e, N, k]);
      let S = (0, o.useMemo)(
          () =>
            l
              ? (0, a.jsxs)("div", {
                  className:
                    "text-v0-blue-700 text-balance text-center text-label-12 @[52rem]/block-header:text-label-14",
                  children: [
                    (0, a.jsxs)("span", {
                      children: [
                        "Old versions are ",
                        (0, a.jsx)("strong", {
                          className: "font-medium",
                          children: "read-only",
                        }),
                        ".",
                      ],
                    }),
                    (0, a.jsxs)("span", {
                      className: "text-label-10",
                      children: [" ", "Restore or switch to latest to edit."],
                    }),
                  ],
                })
              : null,
          [l],
        ),
        I = (0, o.useMemo)(() => {
          let e = C
            ? (0, a.jsx)(cY.ChevronDoubleLeft, {})
            : (0, a.jsx)(cK.ChevronDoubleRight, {});
          return (0, a.jsx)(D.Button, {
            variant: "ghost",
            size: "sm",
            className: (0, u.cn)("hidden sm:flex text-v0-gray-900 size-7"),
            onClick: y.toggleInputPanel,
            children: j
              ? C
                ? (0, a.jsx)(cK.ChevronDoubleRight, {})
                : (0, a.jsx)(cY.ChevronDoubleLeft, {})
              : e,
          });
        }, [y.toggleInputPanel, C, j]);
      return s
        ? (0, a.jsxs)(
            "div",
            {
              className:
                "bg-v0-background-100 [&_.loader-fade-top]:to-background [&_.loader-fade-bot]:to-background [&_.loader-fade-top]:via-background/90 flex size-full flex-col items-stretch",
              "data-testid": "desktop-block-panel",
              children: [
                (0, a.jsxs)("div", {
                  className:
                    "@container/block-header flex h-12 w-full shrink-0 items-center gap-1 px-2",
                  children: [
                    (0, a.jsxs)("div", {
                      className:
                        "flex w-full sm:max-w-1/4 max-w-fit shrink-1 items-center gap-0.5 sm:gap-1.5",
                      children: [C ? null : I, t.actions],
                    }),
                    (0, a.jsx)("div", {
                      className: "min-w-0 flex-1 px-1",
                      children: t.browserControls
                        ? t.browserControls
                        : l
                          ? S
                          : null,
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "flex min-w-fit sm:w-1/4 items-center justify-end gap-1",
                      children: [
                        (0, a.jsx)(c8, { activeBlock: e }),
                        f
                          ? null
                          : (0, a.jsxs)(a.Fragment, {
                              children: [
                                e?.id &&
                                  (0, a.jsx)("div", {
                                    className: "hidden sm:block",
                                    children: (0, a.jsx)(x.BlockHistorySelect, {
                                      separator: !1,
                                      blockId: e.id,
                                    }),
                                  }),
                                t.consoleToggle,
                                t.moreMenu,
                              ],
                            }),
                        C ? I : null,
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: (0, u.cn)(
                    "h-full min-h-0 w-full min-w-0 @container/block-content justify-center flex overflow-y-auto border-t border-transparent relative",
                    { "border-v0-alpha-400": w },
                  ),
                  children: [
                    (0, a.jsx)(c2.DeviceContainer, {
                      forceFullscreen: "code" === p,
                      children: t.content ?? (0, a.jsx)(c6, {}),
                    }),
                    !f && i
                      ? (0, a.jsx)(c3.Loader, {
                          isGenerating: d,
                          messagesLength: c,
                        })
                      : null,
                  ],
                }),
              ],
            },
            `block-content-${e?.id}`,
          )
        : null;
    }
    function c8({ activeBlock: e }) {
      let { ve: t } = (0, Z.useFlags)(),
        { envVars: n, data: r } = (0, cI.useIntegrationsApi)(),
        s = (0, o.useMemo)(() => {
          var e;
          let t;
          return (
            !!n &&
            (((e = Object.keys(n)),
            (t = [
              ...new Set(
                Array.from(
                  c1.SQL_EXEC_PROVIDERS_TO_EXECUTION_ENV.values(),
                ).flat(),
              ),
            ]),
            e.filter((e) => {
              let n = e.toUpperCase();
              return t.some((e) => n.includes(e.toUpperCase()));
            })).length > 0 ||
              r.some((e) => {
                var t;
                return (
                  (t = e.name),
                  c1.SQL_EXEC_PROVIDERS_TO_EXECUTION_ENV.has(t)
                );
              }))
          );
        }, [n, r]),
        { activeFilePath: i } = (0, c0.useActiveFile)({ blockId: e?.id ?? "" }),
        { activeTab: c } = (0, c5.useActiveTab)(),
        d = i?.includes("scripts/") && "code" === c,
        h = i?.endsWith(".sql"),
        p = i?.endsWith(".py"),
        m = i?.endsWith(".js"),
        f = h && d && s,
        g = d && (p || m),
        { isExecuting: v, handleExecuteScript: b } = (0,
        c7.useExecuteScripts)(),
        y = (0, o.useCallback)(async () => {
          if (v) return;
          let t = (0, s1.parseMultiFileSource)({
            source: e?.source ?? "",
            blockType: "code-project",
            blockId: e?.id ?? "",
          }).find((e) => e.meta.file === i);
          if (!t || !i) return l.toast.error("Script file not found in block");
          await b({
            type: "source",
            source: t.source,
            fileName: i,
            meta: { transaction: t.meta.transaction },
          });
        }, [b, v, e?.source, e?.id, i]);
      return e && e.id
        ? (0, a.jsxs)("div", {
            className: (0, u.cn)("flex items-center gap-1.5"),
            children: [
              ((d && (h || p || m) && t) || v) &&
                (0, a.jsx)(cQ.CodeBlockButton, {
                  "aria-label": "Run Code",
                  onClick: y,
                  disabled: v || (!f && !g),
                  tooltip: {
                    side: "bottom",
                    content: v
                      ? "Running..."
                      : h && !f
                        ? "No database connected"
                        : "Run Code",
                  },
                  children: (0, a.jsx)("span", {
                    "aria-hidden": !0,
                    children: v
                      ? (0, a.jsx)(X.Spinner, { size: 16 })
                      : (0, a.jsx)(cJ.PlayCircle, {}),
                  }),
                }),
              (0, a.jsx)("div", {
                className: "sm:hidden",
                children: e.id
                  ? (0, a.jsx)(x.BlockHistorySelect, {
                      separator: !1,
                      blockId: e.id,
                    })
                  : null,
              }),
            ],
          })
        : null;
    }
    var de = e.i(365290),
      dt = e.i(101486),
      dn = e.i(210045),
      dr = e.i(910888),
      ds = e.i(230222),
      di = e.i(917806),
      da = e.i(759791),
      dl = e.i(252597),
      dc = e.i(988094),
      dd = e.i(930293);
    function du({
      blockId: e,
      chatId: t,
      status: n,
      subdomain: r,
      iframeRef: s,
    }) {
      let { atoms: i } = (0, dr.useCurrentChatVM)(),
        l = (0, sJ.useAtomValue)(i.url),
        c = (0, sJ.useAtomValue)(i.recoveryStatus),
        d = (0, sJ.useAtomValue)(i.runtimeErrors),
        u = (0, dt.useVMStatus)({ enabled: !0, bid: e, cid: t });
      r = u.subdomain || r;
      let h = u.status || n,
        p = u?.substatus,
        { atoms: m } = (0, iV.useCurrentChat)(),
        f = (0, sJ.useAtomValue)(m.canWriteToChat),
        { isStreaming: g } = (0, v.useChatLoadingState)(),
        { messagesLength: x } = (0, v.useChatMessagesLength)(),
        b = (0, s9.getBlockIframeId)(e);
      !(function ({ blockId: e, chatId: t, enabled: n = !0 }) {
        let r = (0, da.getSnapshotCacheKey)(t, e),
          { data: s } = (0, I.default)(r, null, {
            revalidateOnMount: !1,
            revalidateOnFocus: !1,
            revalidateIfStale: !1,
          }),
          i = (0, o.useRef)(void 0);
        void 0 === i.current && void 0 !== s && (i.current = s);
        let a = i.current;
        (0, o.useEffect)(() => {
          if (!n) return;
          let r = async (n) => {
            let r = n.data;
            if (
              !r ||
              "object" != typeof r ||
              !r.__v0_remote__ ||
              "snapshot_capture" !== r.type
            )
              return;
            let s = r.data;
            if (s && "string" == typeof s && (!a?.ok || !a.value.url))
              try {
                await (0, da.uploadSnapshot)(e, t, s);
              } catch (e) {}
          };
          return (
            window.addEventListener("message", r),
            () => {
              window.removeEventListener("message", r);
            }
          );
        }, [e, t, n, a]);
      })({ chatId: t, blockId: e, enabled: "running" === h });
      let [y, j] = (0, o.useState)(new Set()),
        C = (0, o.useMemo)(
          () =>
            d
              .map((e) => ({ ...e, currentURL: l }))
              .filter((e) => !y.has(e.text)),
          [d, l, y],
        );
      (0, o.useEffect)(() => {
        j(new Set());
      }, [e]);
      let { token: w } = (0, dd.useSessionTokenForFrame)(
          r ? { chatId: t, vmId: r } : {},
        ),
        k = (0, o.useMemo)(() => {
          if (!w) return "";
          let e = new URL(l, "http://n");
          return (
            e.searchParams.set("vm_token", w),
            e.pathname + e.search + e.hash
          );
        }, [l, w]);
      return (0, a.jsx)("div", {
        className: "w-full h-full flex flex-col relative",
        children: (0, a.jsxs)("div", {
          className:
            "@container/vm-preview relative flex-1 flex items-center justify-center overflow-y-scroll",
          children: [
            (0, a.jsx)(dl.SnapshotRenderer, {
              blockId: e,
              chatId: t,
              vmStatus: h,
              vmSubstatus: p,
              children: (0, a.jsx)(c2.DeviceContainer, {
                children:
                  c.isRecovering && c.step
                    ? (0, a.jsx)(dh, { step: c.step })
                    : r && "running" === h && w
                      ? (0, a.jsx)(dn.Iframe, {
                          iframeId: b,
                          isPublished: !1,
                          src: k,
                          origin: (0, di.getVMIframeOrigin)(r),
                          iframeRef: s,
                        })
                      : (0, a.jsx)(ds.VMPending, {
                          blockId: e,
                          chatId: t,
                          status: u.status,
                        }),
              }),
            }),
            C.length > 0 &&
              (0, a.jsx)(dc.ErrorsBanner, {
                errors: C,
                blockId: e,
                onDismiss: () => {
                  let e = new Set(y);
                  (C.forEach((t) => e.add(t.text)), j(e));
                },
                canWriteToChat: f,
              }),
            (0, a.jsx)(c3.Loader, { isGenerating: g, messagesLength: x }),
          ],
        }),
      });
    }
    function dh({ step: e }) {
      return (0, a.jsx)("div", {
        className:
          "flex flex-col items-center justify-center w-full h-full bg-v0-background-200",
        children: (0, a.jsxs)("div", {
          className: "flex flex-col items-center gap-4 p-8",
          children: [
            (0, a.jsx)(X.Spinner, { className: "w-8 h-8 text-v0-gray-700" }),
            (0, a.jsx)("div", {
              className: "text-label-14 text-v0-gray-700",
              children: {
                reinstalling: "Installing new dependencies...",
                restarting: "Restarting dev server...",
                refreshing: "Refreshing page...",
              }[e],
            }),
          ],
        }),
      });
    }
    var dp = e.i(741006),
      dm = e.i(796104),
      df = e.i(578318),
      dg = e.i(475337),
      dx = e.i(538096);
    let dv = (0, e9.withNewIcon)(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 8V8.75H8.75V8V0.75V0H7.25V0.75V8ZM2.5 8C2.5 6.20132 3.36262 4.60434 4.69989 3.59962L3.79888 2.40038C2.10074 3.67623 1 5.70968 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 5.70968 13.8993 3.67623 12.2011 2.40038L11.3001 3.59962C12.6374 4.60434 13.5 6.20132 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8Z" fill="currentColor"/>',
    );
    var db = e.i(967122),
      dy = e.i(768619),
      dj = e.i(583965),
      dC = e.i(566274),
      dw = e.i(160769),
      dk = e.i(576163);
    function dN({ blockId: e }) {
      let { atoms: t } = (0, dr.useCurrentChatVM)(),
        n = (0, sJ.useAtomValue)(t.selectedTab),
        r = (0, oW.useChatLayout)(),
        s = (0, sJ.useAtomValue)(r.atoms.isChatOnRight),
        { fullScreenResult: i } = (0, dC.useFullscreenResult)();
      return (0, a.jsxs)("div", {
        className: (0, iO.cn)(
          dk.default.header,
          "py-2.5 px-2 gap-2 border-b border-v0-alpha-400",
        ),
        children: [
          (0, a.jsxs)("div", {
            className: (0, iO.cn)(dk.default.toggle, "flex items-center gap-1"),
            children: [
              s || i ? null : (0, a.jsx)(dE, {}),
              i ? null : (0, a.jsx)(dM, {}),
            ],
          }),
          (0, a.jsx)("div", {
            className: dk.default.url,
            style: {
              ...(0, lR.visibleStylesIf)("preview" === n),
              transform: `scale(${"preview" === n ? 1 : 0.99})`,
              ...(0, de.transitionStyles)(["opacity", "transform"]),
            },
            children: (0, a.jsx)(dS, {}),
          }),
          (0, a.jsx)("div", {
            className: dk.default.actions,
            children: (0, a.jsx)(dI, { blockId: e }),
          }),
        ],
      });
    }
    function dM() {
      let { atoms: e, actions: t } = (0, dr.useCurrentChatVM)(),
        n = (0, sJ.useAtomValue)(e.selectedTab),
        r = (0, o.useCallback)(() => {
          t.setSelectedTab("preview" === n ? "code" : "preview");
        }, [t, n]),
        s = "preview" === n;
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)("div", {
            className: "hidden sm:flex",
            children: (0, a.jsxs)(iq.TabsToggle, {
              defaultValue: "preview",
              atom: e.selectedTab,
              children: [
                (0, a.jsx)(iq.TabsToggleTrigger, {
                  value: "preview",
                  square: !0,
                  children: (0, a.jsx)(dp.Eye, {}),
                }),
                (0, a.jsx)(iq.TabsToggleTrigger, {
                  value: "code",
                  square: !0,
                  children: (0, a.jsx)(dm.CodeWrap, {}),
                }),
              ],
            }),
          }),
          (0, a.jsx)(D.Button, {
            onClick: r,
            className: "sm:hidden size-7",
            size: "sm",
            variant: "secondary",
            tooltip: s ? "Show Code" : "Show Preview",
            children: s ? (0, a.jsx)(dm.CodeWrap, {}) : (0, a.jsx)(dp.Eye, {}),
          }),
        ],
      });
    }
    function dS() {
      let { atoms: e, actions: t } = (0, dr.useCurrentChatVM)();
      ((0, sJ.useAtomValue)(e.url), (0, Z.useFlags)());
      let n = (0, v.useChatId)().chatId,
        r = (0, db.useActiveBlockIdRef)()?.current,
        { subdomain: s } = (0, dt.useVMStatus)({
          enabled: !!r,
          cid: n,
          bid: r,
        }),
        {
          canGoBack: i,
          canGoForward: l,
          href: c,
          setHref: d,
          latestHref: u,
          loading: h,
          setLoading: p,
          refresh: m,
          temporalHref: f,
          setTemporalHref: g,
        } = (0, dj.useBrowserFrame)(),
        x = (0, C.useLatest)(f),
        b = (0, o.useCallback)(() => {
          let e = document.getElementsByTagName("iframe")[0];
          e &&
            e.contentWindow &&
            ((0, e4.sendToIframe)(e.contentWindow, { type: "navigate_back" }),
            g(null));
        }, []),
        y = (0, o.useCallback)(() => {
          let e = document.getElementsByTagName("iframe")[0];
          e &&
            e.contentWindow &&
            ((0, e4.sendToIframe)(e.contentWindow, {
              type: "navigate_forward",
            }),
            g(null));
        }, []),
        j = (0, o.useCallback)(() => {
          let e = document.getElementsByTagName("iframe")[0];
          e &&
            e.contentWindow &&
            ((0, e4.sendToIframe)(e.contentWindow, {
              type: "navigate_to",
              href:
                null === x.current
                  ? u.current
                  : new URL(x.current ?? "", u.current).href,
            }),
            p(!0));
        }, [u, x]),
        w = (0, o.useMemo)(() => {
          if (!c) return "";
          let e = new URL(c, "http://n");
          return e.pathname + e.search + e.hash;
        }, [c]),
        k = (0, o.useMemo)(() => (s ? `https://${s}.vercel.run` : null), [s]);
      return (
        (0, o.useMemo)(
          () => (s ? (s.startsWith("sb-") ? s.slice(3) : s) : null),
          [s],
        ),
        (0, a.jsx)("div", {
          className: "flex flex-1 items-center justify-center",
          children: (0, a.jsxs)("div", {
            className:
              "flex-1 h-[29px] border sm:max-w-[500px] rounded-full flex items-center border-v0-gray-400 px-[2px] group cursor-text overflow-hidden focus-within:border-v0-gray-300 transition-all",
            children: [
              (0, a.jsx)(dR, {
                disabled: !i,
                onClick: b,
                className: "w-5 pl-2 rounded-l-full",
                children: (0, a.jsx)(ez.ChevronLeftSmall, {}),
              }),
              (0, a.jsx)(dR, {
                className: "w-5 pr-2",
                disabled: !l,
                onClick: y,
                children: (0, a.jsx)(eF.ChevronRightSmall, {}),
              }),
              (0, a.jsx)(c2.DeviceDropdown, {}),
              k && !1,
              (0, a.jsx)("input", {
                className:
                  "flex-1 min-w-0 w-10 pl-1 text-v0-gray-900 text-label-14 flex items-center outline-none",
                value: null !== f ? f : w,
                onChange: (e) => void g(e.target.value),
                onFocus: (e) => {
                  e.currentTarget.select();
                },
                placeholder: "/",
                onKeyDown: (e) => {
                  ("Enter" === e.key
                    ? (j(),
                      d(new URL(f ?? "", c).href),
                      g(null),
                      e.stopPropagation(),
                      e.currentTarget.blur())
                    : "Escape" === e.key &&
                      (g(null), e.stopPropagation(), e.currentTarget.blur()),
                    "Enter" === e.key &&
                      f &&
                      (t.setUrl(f), d(f), g(null), e.preventDefault()));
                },
              }),
              (0, a.jsx)(d_, {
                children: (e) =>
                  (0, a.jsx)(dR, {
                    className: "rounded-r-full",
                    children: e
                      ? (0, a.jsx)(e4.BrowserLoadingSpinner, {})
                      : (0, a.jsx)(dP, {}),
                  }),
              }),
            ],
          }),
        })
      );
    }
    function dI({ blockId: e }) {
      let { fullScreenResult: t, setFullscreenResult: n } = (0,
        dC.useFullscreenResult)(),
        r = (0, oW.useChatLayout)(),
        s = (0, sJ.useAtomValue)(r.atoms.isChatOnRight);
      return (0, a.jsx)("div", {
        className: "flex items-center gap-1.5",
        children: t
          ? (0, a.jsx)(dA, {
              onClick: () => n(!1, e),
              tooltip: "Exit Fullscreen",
              children: (0, a.jsx)(tx.FullscreenClose, {}),
            })
          : (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(x.BlockHistorySelect, { blockId: e, separator: !1 }),
                (0, a.jsx)(dL, {}),
                (0, a.jsx)(dT, {
                  blockId: e,
                  children: (0, a.jsx)(dA, {
                    children: (0, a.jsx)(eW.MoreHorizontal, {}),
                  }),
                }),
                s ? (0, a.jsx)(dE, {}) : null,
              ],
            }),
      });
    }
    function dL() {
      let { atoms: e, actions: t } = (0, dr.useCurrentChatVM)(),
        n = (0, sJ.useAtomValue)(e.showConsole)
          ? "Hide Console"
          : "Show Console";
      return (0, a.jsxs)(dA, {
        onClick: t.toggleShowConsole,
        className: "hidden sm:flex",
        tooltip: n,
        children: [
          (0, a.jsx)(dg.Footer, {}),
          (0, a.jsx)("span", { className: "sr-only", children: n }),
        ],
      });
    }
    function dT({ blockId: e, children: t }) {
      let [n, r] = (0, o.useState)(!1),
        s = (0, m.useActiveBlockState)(),
        { setFullscreenResult: i } = (0, dC.useFullscreenResult)(),
        { atoms: l } = (0, dr.useCurrentChatVM)(),
        c = (0, sJ.useAtomValue)(l.selectedTab);
      return (0, a.jsxs)(en.DropdownMenu, {
        open: n,
        onOpenChange: r,
        children: [
          (0, a.jsx)(en.DropdownMenuTrigger, { asChild: !0, children: t }),
          (0, a.jsx)(en.DropdownMenuContent, {
            align: "end",
            className: "w-[150px]",
            sideOffset: 8,
            children: (0, a.jsxs)(en.DropdownMenuGroup, {
              children: [
                "preview" === c &&
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    onSelect: () => i(!0, e),
                    children: [(0, a.jsx)(tg.Fullscreen, {}), "Fullscreen"],
                  }),
                s
                  ? (0, a.jsx)(dw.BlockActionDownloadZip, {
                      blockId: s.id,
                      lang: s.language,
                      source: s.source,
                    })
                  : null,
              ],
            }),
          }),
        ],
      });
    }
    function dE() {
      let e = (0, oW.useChatLayout)(),
        t = (0, sJ.useAtomValue)(e.atoms.isChatOnRight),
        n = (0, sJ.useAtomValue)(e.atoms.isInputPanelOpen),
        r = t
          ? (0, a.jsx)(cY.ChevronDoubleLeft, {})
          : (0, a.jsx)(cK.ChevronDoubleRight, {});
      return (0, a.jsx)(dA, {
        onClick: e.actions.toggleInputPanel,
        className: "hidden sm:flex",
        tooltip: n ? "Collapse Chat" : "Expand Chat",
        children: n
          ? t
            ? (0, a.jsx)(cK.ChevronDoubleRight, {})
            : (0, a.jsx)(cY.ChevronDoubleLeft, {})
          : r,
      });
    }
    function d_({ children: e }) {
      let [t, n] = (0, o.useState)(!1),
        r = (0, v.useChatId)().chatId,
        s = (0, db.useActiveBlockIdRef)()?.current,
        i = (0, o.useCallback)(() => {
          let e = document.querySelector("iframe[data-v0]");
          e &&
            e.contentWindow &&
            e.setAttribute("src", (0, dy.getIframeSrc)(e));
        }, []),
        [l, c] = (0, o.useState)(!1),
        [d, u] = (0, o.useState)(!1),
        { status: h, refresh: p } = (0, dt.useVMStatus)({
          enabled: !!s,
          cid: r,
          bid: s,
        }),
        m = (0, o.useCallback)(async () => {
          c(!0);
          try {
            if (
              !(
                await fetch(
                  `/chat/api/vm/actions?cid=${r}&bid=${s}&type=recreate`,
                  { method: "POST" },
                )
              ).ok
            )
              throw Error("Failed to recreate VM");
            p();
          } catch (e) {
            console.error("Error recreating VM:", e);
          }
          c(!1);
        }, [r, s, p]),
        f = (0, o.useCallback)(async () => {
          (console.log("Reinstall dependencies clicked"), c(!0));
          try {
            if (
              !(
                await fetch(
                  `/chat/api/vm/actions?cid=${r}&bid=${s}&type=reinstall`,
                  { method: "POST" },
                )
              ).ok
            )
              throw Error("Failed to reinstall dependencies");
            p();
          } catch (e) {
            console.error("Error reinstalling dependencies:", e);
          }
          (c(!1), n(!1));
        }, [r, s, p]),
        g = (0, o.useCallback)(async () => {
          (console.log("Restart dev server clicked"), c(!0));
          try {
            if (
              !(
                await fetch(
                  `/chat/api/vm/actions?cid=${r}&bid=${s}&type=restart-dev-server`,
                  { method: "POST" },
                )
              ).ok
            )
              throw Error("Failed to restart dev server");
            (p(), i());
          } catch (e) {
            console.error("Error restarting dev server:", e);
          }
          (c(!1), n(!1));
        }, [r, s, p, i]),
        x =
          "function" == typeof e
            ? e(l || d || "empty" === h || "initializing" === h || !h)
            : e;
      return (0, a.jsxs)(en.DropdownMenu, {
        open: t,
        onOpenChange: n,
        children: [
          (0, a.jsx)(en.DropdownMenuTrigger, { asChild: !0, children: x }),
          (0, a.jsxs)(en.DropdownMenuContent, {
            align: "end",
            className: "w-[200px]",
            side: "bottom",
            sideOffset: 8,
            children: [
              (0, a.jsx)(en.DropdownMenuGroup, {
                children: (0, a.jsxs)(en.DropdownMenuItem, {
                  onSelect: () => {
                    (console.log("Refresh page clicked"),
                      u(!0),
                      i(),
                      setTimeout(() => {
                        u(!1);
                      }, 800),
                      n(!1));
                  },
                  children: [
                    (0, a.jsx)(df.RotateClockwise, {}),
                    "Refresh Page",
                  ],
                }),
              }),
              (0, a.jsx)(en.DropdownMenuSeparator, {}),
              (0, a.jsxs)(en.DropdownMenuGroup, {
                children: [
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    onSelect: f,
                    children: [
                      (0, a.jsx)(dx.Download, {}),
                      "Reinstall Dependencies",
                    ],
                  }),
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    onSelect: g,
                    children: [(0, a.jsx)(dv, {}), "Restart Dev Server"],
                  }),
                  (0, a.jsxs)(en.DropdownMenuItem, {
                    onSelect: () => {
                      (console.log("Kill and restart sandbox clicked"),
                        m(),
                        n(!1));
                    },
                    children: [
                      (0, a.jsx)(cJ.PlayCircle, {}),
                      "Restart Sandbox",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    }
    function dA({ children: e, ...t }) {
      return (0, a.jsx)(D.Button, {
        ...t,
        variant: "ghost",
        size: "xs",
        className: (0, iO.cn)(
          "h-7 w-7 text-v0-gray-900 hover:text-v0-gray-1000 cursor-pointer",
          t.className,
        ),
        children: e,
      });
    }
    function dR({ children: e, ...t }) {
      return (0, a.jsx)(dA, {
        ...t,
        className: (0, iO.cn)("h-[24px] w-[24px] rounded-[5px]", t.className),
        children: e,
      });
    }
    let dP = (0, e9.withNewIcon)(`
<path d="M8.19043 3.08325C9.87133 3.08329 11.3572 3.91951 12.25 5.19849V3.75024H13.75V7.50024C13.7497 7.91423 13.4141 8.25024 13 8.25024H9.25V6.75024H11.3896C10.8877 5.48392 9.64777 4.5833 8.19043 4.58325C6.28638 4.58325 4.75 6.11727 4.75 8.00024C4.75027 9.883 6.28655 11.4163 8.19043 11.4163C9.33683 11.4162 10.3517 10.8606 10.9775 10.0042L11.4199 9.39868L12.6309 10.2834L12.1885 10.8889C11.2911 12.1171 9.83371 12.9162 8.19043 12.9163C5.46614 12.9163 3.25027 10.7194 3.25 8.00024C3.25 5.28085 5.46597 3.08325 8.19043 3.08325Z" fill="currentColor"/>
`);
    var dD = e.i(601673),
      dV = e.i(481556),
      d$ = e.i(797173);
    function dF({ blockId: e, chatId: t }) {
      let n = (0, o.useRef)({ sendFileUpdate: async (e, t, n) => {} });
      return (
        (0, o.useEffect)(() => {
          let r;
          async function s(e, t, n, r) {
            try {
              await fetch(
                `/chat/api/vm/actions?cid=${t}&bid=${n}&type=update_files`,
                {
                  method: "POST",
                  body: JSON.stringify({ filesMap: e, version: r }),
                },
              );
            } catch (e) {
              console.error("Error sending file update:", e);
            }
          }
          let i = {},
            a = (0, eK.default)(async () => {
              let n = { ...i };
              return ((i = {}), await s(n, t, e, r));
            }, 500);
          async function l(e, t, n) {
            ((i[e] = t), (r = n), await a());
          }
          return (
            (n.current.sendFileUpdate = l),
            () => {
              a.cancel();
            }
          );
        }, [e, t]),
        n.current
      );
    }
    var dz = e.i(597932),
      dH = e.i(770858),
      dB = e.i(380105),
      dO = e.i(230905),
      dU = e.i(43116);
    function dW({ block: e, vscodeEditorRef: t, iframeRef: n }) {
      let { atoms: r, actions: s } = (0, dr.useCurrentChatVM)(),
        { chatId: i } = (0, v.useChatLoadingState)(),
        { atoms: l } = (0, iV.useCurrentChat)(),
        c = (0, sJ.useAtomValue)(l.canWriteToChat),
        d = (0, sJ.useAtomValue)(r.activeFilePath),
        u = (0, sJ.useAtomValue)(r.activeFileLocation),
        { ve: p } = (0, Z.useFlags)(),
        m = (0, F.useIsMobile)(),
        { user: f } = (0, W.useUser)(),
        { editValueMap: g, setEditValueMap: x } = (0, i8.useEditValueMap)({
          blockId: e.id,
        }),
        b = dF({ blockId: e.id, chatId: i }),
        {
          files: y,
          loadingPath: j,
          isDiffDataReady: C,
        } = (0, d$.useBlockFiles)({
          blockId: e.id,
          closed: e.closed,
          source: e.source,
          meta: e.meta,
        }),
        w = y || [
          {
            source: e.source,
            meta: e.meta,
            originalCode: e.source,
            lang: e.language,
            isQuickEdit: !1,
            blockId: e.id,
            isEdit: !1,
            isLocked: !1,
            isTerminated: !1,
            isAttachmentQuickEdit: !1,
            isFixed: !1,
            isMerged: !1,
            isDeleted: !1,
            isMoved: !1,
            isRecovered: !1,
          },
        ],
        k = (0, o.useRef)(void 0),
        N = (0, o.useEffectEvent)(() => {
          for (let e in g) {
            let t = w.find((t) => t.meta.file === e);
            t && b.sendFileUpdate(e, t.source);
          }
          x({});
        }),
        M = (0, dO.useUnsavedChanges)({
          blockId: e.id,
          editValueMap: g,
          isAdminSaving: !c && !!f?.isAdminMode,
          source: e.source,
          meta: e.meta,
          files: w,
          clearEditValueMap: N,
          isVSCodeEditor: p && !1 === m,
        }),
        S = !!c || !!f?.isAdminMode,
        I = (t, n) => {
          let r = n || e.meta.file || "";
          x({ ...g, [r]: t });
          let s =
            n ||
            e.meta.file ||
            (() => {
              switch (e.language) {
                case "typescript":
                case "typescriptreact":
                  return "index.ts";
                case "javascript":
                case "javascriptreact":
                default:
                  return "index.js";
                case "python":
                  return "main.py";
              }
            })();
          b.sendFileUpdate(s, t);
        };
      if (p && !1 === m)
        return (0, a.jsxs)("div", {
          className: "h-full w-full relative",
          children: [
            (0, a.jsx)(dU.VSCodeEditorWrapper, {
              blockId: e.id,
              source: e.source,
              files: w,
              activeFilePath: d,
              activeFileLocation: u,
              editValueMap: g,
              onEdit: (e, t) => {
                x({ ...g, [e]: t });
              },
              onActiveFileChange: s.setActiveFilePath,
              reloadIframe: () => {},
              editable: S,
              vmSync: b,
              ref: t || k,
              editorSource: "vm-panel",
              isDiffDataReady: C,
            }),
            S
              ? (0, a.jsx)(dO.UnsavedChanges, {
                  ...M,
                  resetValue: () => {
                    (N(),
                      window.dispatchEvent(
                        new CustomEvent("editor-reset-changes"),
                      ));
                  },
                  mergedFromBlockId: e.id,
                })
              : null,
          ],
        });
      if ("code-project" === e.meta.type && y) {
        let t;
        return (0, a.jsxs)("div", {
          className: "h-full w-full relative",
          children: [
            (0, a.jsx)(dB.MultiFileCode, {
              showDiffInfo: !1,
              activeFilePath: d || y[0]?.meta.file,
              initialFileTreeSize: h.DEFAULT_FILE_TREE_SIZE,
              setActiveFile: s.setActiveFilePath,
              files: y,
              loadingPath: j,
              blockId: e.id,
              source: e.source,
              onChange: () => {},
              children: (t = y.find(
                (e) => e.meta.file === (d || y[0]?.meta.file),
              ))
                ? (0, a.jsx)(dH.CodeBlock, {
                    language: t.lang,
                    value: g[t.meta.file || ""] || t.source,
                    blockId: e.id,
                    originalCode: t.originalCode,
                    closed: !0,
                    editable: S,
                    showLineNumbers: !0,
                    caller: "v0",
                    allowCopyCode: !0,
                    allowDownloadCode: !0,
                    fileName: t.meta.file,
                    showQuickEditAnimation: !1,
                    editValue: g[t.meta.file || ""],
                    onEdit: (e) => {
                      I(e, t.meta.file);
                    },
                    location: u,
                  })
                : (0, a.jsx)("div", {
                    className: "text-v0-gray-900 p-4",
                    children: "Select a file to view",
                  }),
            }),
            S
              ? (0, a.jsx)(dO.UnsavedChanges, {
                  ...M,
                  resetValue: () => {
                    (N(),
                      window.dispatchEvent(
                        new CustomEvent("editor-reset-changes"),
                      ));
                  },
                  mergedFromBlockId: e.id,
                })
              : null,
          ],
        });
      }
      return (0, a.jsxs)("div", {
        className: "h-full w-full relative",
        children: [
          (0, a.jsx)(dH.CodeBlock, {
            language: e.language,
            value: g[e.meta.file || ""] || e.source,
            blockId: e.id,
            originalCode: e.source,
            closed: !0,
            editable: S,
            showLineNumbers: !0,
            caller: "v0",
            allowCopyCode: !0,
            allowDownloadCode: !0,
            showQuickEditAnimation: !1,
            editValue: g[e.meta.file || ""],
            onEdit: (t) => {
              I(t, e.meta.file);
            },
          }),
          S
            ? (0, a.jsx)(dO.UnsavedChanges, {
                ...M,
                resetValue: () => {
                  (N(),
                    window.dispatchEvent(
                      new CustomEvent("editor-reset-changes"),
                    ));
                },
                mergedFromBlockId: e.id,
              })
            : null,
        ],
      });
    }
    function dZ({ blockId: e, chatId: t }) {
      return e && t
        ? (0, a.jsx)(dG, { blockId: e, chatId: t })
        : (0, a.jsx)(c6, {});
    }
    function dG({ blockId: e, chatId: t }) {
      let { atoms: n } = (0, dr.useCurrentChatVM)(),
        r = (0, sJ.useAtomValue)(n.selectedTab),
        s = (0, sJ.useAtomValue)(n.showConsole),
        i = (0, m.useActiveBlockState)(t),
        l = o.default.useRef(null),
        c = (0, o.useRef)(void 0);
      (0, o.useEffect)(() => {
        document
          .querySelectorAll(
            '[data-parent-flow-to-element-id^="webview-editor-element-"]',
          )
          .forEach((e) => {
            e instanceof HTMLElement &&
              (e.style.display = "code" === r ? "" : "none");
          });
      }, [r]);
      let {
          status: d,
          error: u,
          subdomain: h,
        } = (0, dt.useVMPreviewSubdomain)({ enabled: !!t, bid: e, cid: t }),
        p = dF({ blockId: e, chatId: t }),
        { editValueMap: f, setEditValueMap: g } = (0, i8.useEditValueMap)({
          blockId: e,
        }),
        x = (0, o.useEffectEvent)((e, t, n) => {
          (g({ ...f, [e]: t }), p.sendFileUpdate(e, t, n));
        });
      return (0, a.jsx)(dz.VMLogPanel, {
        hide: !s,
        blockId: e,
        chatId: t,
        children: (0, a.jsx)("div", {
          className: "relative min-h-0 w-full flex-1 grow",
          children: (0, a.jsx)(dV.FullscreenContainer, {
            children: (0, a.jsxs)("div", {
              className: "flex flex-col h-full w-full",
              children: [
                (0, a.jsx)(dN, { blockId: e }),
                (0, a.jsxs)("div", {
                  className:
                    "flex w-full h-full justify-center items-center relative overflow-hidden",
                  children: [
                    (0, a.jsxs)(dq, {
                      visible: "preview" === r,
                      children: [
                        (0, a.jsx)(dD.PreviewWizard, {
                          activeBlockId: e,
                          closed: i?.closed ?? !1,
                        }),
                        (0, a.jsx)(du, {
                          subdomain: h,
                          blockId: e,
                          chatId: t,
                          status: d,
                          iframeRef: l,
                        }),
                      ],
                    }),
                    (0, a.jsx)(dq, {
                      className: "z-20",
                      visible: "code" === r,
                      children: i
                        ? (0, a.jsx)(dW, {
                            block: i,
                            vscodeEditorRef: c,
                            iframeRef: l,
                          })
                        : (0, a.jsx)(i9.Skeleton, {
                            className: "w-full h-full",
                          }),
                    }),
                    i
                      ? (0, a.jsx)(dX, {
                          onEdit: x,
                          block: i,
                          iframeRef: l,
                          vscodeEditorRef: c,
                        })
                      : null,
                  ],
                }),
              ],
            }),
          }),
        }),
      });
    }
    function dq({ visible: e, children: t, ...n }) {
      var r;
      return (0, a.jsx)("div", {
        ...n,
        className: (0, iO.cn)(
          "absolute inset-0 z-50 bg-v0-background-200",
          n.className,
        ),
        style: {
          ...((r = e),
          {
            ...(0, lR.visibleStylesIf)(r),
            ...(0, de.transitionStyles)(["opacity", "transform", "filter"], {
              delay: 50 * !!r,
              duration: 100,
            }),
            transform: "scale(1)",
          }),
          ...n.style,
        },
        children: t,
      });
    }
    function dX({ onEdit: e, block: t, iframeRef: n, vscodeEditorRef: r }) {
      let { actions: s } = (0, dr.useCurrentChatVM)(),
        { files: i } = (0, d$.useBlockFiles)({
          blockId: t.id,
          closed: t.closed,
          source: t.source,
          meta: t.meta,
        }),
        { editValueMap: a, setEditValueMap: l } = (0, i8.useEditValueMap)({
          blockId: t.id,
        }),
        c = (0, C.useLatest)(i),
        d = (0, C.useLatest)(a),
        u = (0, o.useEffectEvent)((n, r, s, i, a) => {
          if (!t.closed) return;
          let o = { ...d.current, [r]: n };
          (a || l(o), e(r, n, s));
        }),
        h = (0, o.useEffectEvent)((e, t, n, r, s, i, a, l, o) => {
          if (!c.current) return;
          let h = c.current.findIndex((t) => t.meta.file === e);
          if (-1 === h) return void u(s, e, i, !0, o);
          let p = a ?? d.current[e] ?? c.current[h].source;
          if (l) {
            let [e, t] = l;
            p = p.substring(0, e) + s + p.substring(t);
          } else {
            let e = p.split("\n"),
              i = 0;
            for (let n = 0; n < t - 1; n++) i += e[n].length + 1;
            p = p.substring(0, i + n - 1) + s + p.substring(i + n - 1 + r);
          }
          u(p, e, i, !0, o);
        });
      return (
        (0, o.useEffect)(() => {
          eX.designModeInlineEditRef.current = {
            inlineEdit(e, t, s, i, a, l, o, u) {
              if (
                (n.current &&
                  n.current.contentWindow?.postMessage(
                    { __v0_remote__: !0, type: "sync_version", version: l },
                    "*",
                  ),
                h(e, t, s, i, a, l, o, u),
                r.current)
              ) {
                let n =
                  o ??
                  d.current[e] ??
                  c.current?.find((t) => t.meta.file === e)?.source;
                if (n) {
                  let l;
                  if (u) {
                    let [e, t] = u;
                    l = n.substring(0, e) + a + n.substring(t);
                  } else {
                    let e = n.split("\n"),
                      r = 0;
                    for (let n = 0; n < t - 1; n++) r += e[n].length + 1;
                    l =
                      n.substring(0, r + s - 1) +
                      a +
                      n.substring(r + s - 1 + i);
                  }
                  r.current.updateFileContent(e, l);
                }
              }
            },
            bulkFileChange: (t) => {
              t.forEach(({ file: t, value: n }) => {
                (r.current?.updateFileContent(t, n), e(t, n));
              });
            },
            getContent(e) {
              if (!c.current) return;
              let t = c.current.findIndex((t) => t.meta.file === e);
              if (-1 !== t) return c.current[t]?.source;
            },
            jumpToFile(e, t, n) {
              (s.setSelectedTab("code"), s.setActiveFilePath(e, [t, n]));
            },
            postMessage: (e) => {
              n.current &&
                n.current.contentWindow?.postMessage(
                  { __v0_remote__: !0, ...e },
                  "*",
                );
            },
          };
        }, []),
        null
      );
    }
    var dY = e.i(923510);
    let dK = (0, o.createContext)(null);
    function dJ({ children: e, id: t, noBackground: n, allowAutoCollapse: r }) {
      let s = (0, o.useMemo)(
        () => ({ id: t, noBackground: n, allowAutoCollapse: r }),
        [t, n, r],
      );
      return (0, a.jsx)(dK.Provider, { value: s, children: e });
    }
    let dQ = (0, o.createContext)(null);
    function d0({
      children: e,
      layoutId: t,
      atoms: { panelsLayoutAtom: n, mobilePanelAtom: r },
    }) {
      let s = (0, o.useMemo)(
        () => ({
          atoms: (0, dY.getPanelLayoutAtoms)(t, {
            panelsLayoutAtom: n,
            mobilePanelAtom: r,
          }),
          actions: (0, dY.getPanelLayoutActions)(t, {
            panelsLayoutAtom: n,
            mobilePanelAtom: r,
          }),
          layoutId: t,
        }),
        [t, n, r],
      );
      return (0, a.jsx)(dQ.Provider, { value: s, children: e });
    }
    function d1() {
      let e = (0, o.useContext)(dQ);
      if (!e)
        throw Error("usePanelLayout must be used within a PanelLayoutProvider");
      let { atoms: t, actions: n, layoutId: r } = e;
      return (0, o.useMemo)(
        () => ({ atoms: t, actions: n, layoutId: r }),
        [t, n, r],
      );
    }
    var d2 = e.i(775320),
      d5 = e.i(142219);
    function d3({ gridArea: e, from: t, to: n, containerRef: r }) {
      let { atoms: s, actions: i } = d1(),
        l = (0, sJ.useAtomValue)(s.resizingId),
        c = (0, sJ.useAtomValue)(s.panelOrder),
        {
          setIsResizing: d,
          resizePanel: h,
          closePanel: p,
          openPanel: m,
          isAutoCollapsible: f,
          getPanelMinRatio: g,
          getPanelMinPixelsSize: x,
          setCursorState: v,
        } = i,
        b = (0, o.useCallback)(
          (e, t) => {
            let n = g(e),
              r = x(e);
            return r > 0 && t > 0 ? Math.max(n, r / t) : n;
          },
          [g, x],
        ),
        y = (0, o.useRef)({
          isActive: !1,
          startMouseX: 0,
          containerLeft: 0,
          containerWidth: 0,
          currentMouseX: 0,
          cursorState: "normal",
        }),
        j = !!(t && n),
        C = (0, o.useCallback)(
          (e) => {
            let r = y.current;
            if (!r.isActive || !t || !n) return;
            r.currentMouseX = e.clientX;
            let i = (e.clientX - r.containerLeft) / r.containerWidth,
              a = d5.store.get(s.panelsLayout),
              l = a.find((e) => e.id === t),
              o = a.find((e) => e.id === n);
            if (!l || !o) return;
            let d = c.findIndex((e) => e === t),
              u = 0,
              g = 0;
            for (let e = 0; e < d; e++) {
              let t = a.find((t) => t.id === c[e]);
              (t?.visible && (u += t.ratio), (g += d2.RESIZE_HANDLE_WIDTH));
            }
            let x = i - (u + (g / r.containerWidth || 0)),
              j = l.ratio + o.ratio,
              C = Math.max(0, Math.min(x, j)),
              w = j - C,
              k = b(t, r.containerWidth),
              N = b(n, r.containerWidth);
            if (l.visible && l.ratio <= k + 0.01 && C < 0.7 * k && f(t))
              return void p(t);
            if (o.visible && o.ratio <= N + 0.01 && w < 0.7 * N && f(n))
              return void p(n);
            if (x >= 0 && x <= j) {
              if (!l.visible && C > k) return void m(t);
              if (!o.visible && w > N) return void m(n);
              if (l.visible && o.visible) {
                let e = Math.max(k, Math.min(j - N, C)) - l.ratio;
                Math.abs(e) > 0.001 &&
                  h({ index: d, delta: e, containerWidth: r.containerWidth });
              }
            }
            let M = l.visible && l.ratio <= k + 0.02,
              S = o.visible && o.ratio <= N + 0.02,
              I = d5.store.get(s.cursorState),
              L = "normal";
            (!l.visible && C <= k && f(t)
              ? (L = "expand-right")
              : !o.visible && w <= N && f(n)
                ? (L = "expand-left")
                : M && f(t)
                  ? (L = "collapse-left")
                  : S && f(n) && (L = "collapse-right"),
              L !== I && v(L));
          },
          [t, n, s.panelsLayout, s.cursorState, c, b, f, m, h, v, p],
        ),
        w = (0, o.useCallback)(() => {
          let e = y.current;
          if (
            t &&
            n &&
            e.isActive &&
            Math.abs(e.currentMouseX - e.startMouseX) / e.containerWidth > 0.05
          ) {
            let r = d5.store.get(s.panelsLayout),
              i = r.find((e) => e.id === t),
              a = r.find((e) => e.id === n),
              l = e.currentMouseX > e.startMouseX;
            l && i && !i.visible && f(t)
              ? m(t)
              : !l && a && !a.visible && f(n) && m(n);
          }
          ((y.current.isActive = !1),
            v("normal"),
            d(null),
            window.removeEventListener("mousemove", C),
            window.removeEventListener("mouseup", w));
        }, [d, C, v, t, n, s.panelsLayout, f, m]),
        k = (0, o.useCallback)(
          (s) => {
            if (!j || !t || !n || !r.current) return;
            s.preventDefault();
            let i = r.current.getBoundingClientRect();
            ((y.current = {
              isActive: !0,
              startMouseX: s.clientX,
              containerLeft: i.left,
              containerWidth: i.width,
              currentMouseX: s.clientX,
              cursorState: "normal",
            }),
              v("normal"),
              d(e),
              window.addEventListener("mousemove", C, { passive: !0 }),
              window.addEventListener("mouseup", w));
          },
          [t, n, j, e, d, r, C, w, v],
        ),
        N = (0, o.useMemo)(() => l === e, [l, e]);
      return (0, a.jsxs)("div", {
        role: "separator",
        tabIndex: N ? 0 : -1,
        "aria-orientation": "vertical",
        style: { gridArea: e, width: d2.RESIZE_HANDLE_WIDTH },
        className: (0, u.cn)(
          "group relative z-20 items-center justify-center outline-none sm:flex hidden",
          N ? "pointer-events-none" : "cursor-col-resize",
        ),
        onMouseDown: k,
        "data-testid": "block-resize-handle",
        children: [
          (0, a.jsx)("div", {
            className: (0, u.cn)(
              "absolute h-[80%] w-[1.5px] rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-gray-400 to-transparent ",
              "group-focus-visible:via-blue-500 group-focus-visible:opacity-100",
              "transform-[scaleY(0)] group-hover:transform-[scaleY(1)] group-focus-visible:transform-[scaleY(1)]",
            ),
            style: {
              transform: N ? "scale(1)" : void 0,
              opacity: N ? 1 : void 0,
              ...(0, de.transitionStyles)(
                ["background", "opacity", "scale", "transform"],
                { duration: 300 },
              ),
            },
          }),
          (0, a.jsx)("div", {
            className: (0, u.cn)(
              "absolute inset-y-0 w-6",
              j ? "" : "pointer-events-none",
            ),
          }),
          (0, a.jsx)("div", {
            className: (0, u.cn)(
              "absolute h-full max-h-16 w-1.5 rounded-full",
              "opacity-0 group-hover:opacity-100",
              "transform-[scale(0.75)] group-hover:transform-[scale(1)] group-focus-visible:transform-[scale(1)]",
              N ? "bg-v0-gray-900" : "bg-v0-gray-500",
              !j && "hidden",
            ),
            style: {
              opacity: N ? 1 : void 0,
              maxHeight: N ? 48 : 36,
              transform: N ? "scale(1)" : void 0,
              ...(0, de.transitionStyles)(
                ["max-height", "transform", "background", "opacity"],
                { duration: 100 },
              ),
            },
          }),
        ],
      });
    }
    var d4 = e.i(626085),
      d6 = e.i(154032),
      d7 = e.i(931289);
    function d9({ children: e, mode: t, delay: n = 100 }) {
      let r = (0, d7.useDebouncedValue)(t, "visible" === t ? 0 : n);
      return (0, a.jsx)(o.Activity, { mode: r, children: e });
    }
    let d8 = (0, o.memo)(function ({ className: e }) {
      return (0, a.jsx)("div", {
        className: (0, u.cn)("h-full w-full bg-v0-gray-100", e),
      });
    });
    function ue({
      id: e,
      children: t,
      className: n,
      noBackground: r,
      allowAutoCollapse: s = !1,
      minRatio: i,
      maxRatio: l,
      minPixelsSize: c,
    }) {
      let { atoms: d, actions: h } = d1(),
        p = (0, sJ.useAtomValue)(d.panelOrder),
        m = (0, sJ.useAtomValue)(d.disableLayoutAnimations),
        f = (0, sJ.useAtomValue)(d.visiblePanels),
        g = (0, F.useIsMobile)(un),
        x = (0, sJ.useAtomValue)(d.isResizing),
        v = (0, d6.useIsWindowResizing)(),
        b = (0, sJ.useAtomValue)(d.mobilePanel),
        y = g ? b !== e : !f.includes(e),
        j = f.length > 0,
        C = p.indexOf(e) < p.indexOf(b),
        w = v || x,
        k = (0, o.useMemo)(() => {
          let e = 1;
          y && !g && (e = 0.98);
          let t = 0;
          if (
            (g && (t = y ? (C ? "-100%" : "100%") : "0px"), 1 !== e || 0 !== t)
          )
            return `scale(${e}) translateX(${t})`;
        }, [y, C, g]),
        N = (0, o.useMemo)(() => (y || g || w || m ? 0 : 200), [y, g, w, m]),
        M = (0, o.useMemo)(() => (w ? 0 : g ? 200 : y ? 75 : 200), [y, g, w]);
      (0, o.useEffect)(
        () => (
          s
            ? h.registerAutoCollapsiblePanel(e)
            : h.unregisterAutoCollapsiblePanel(e),
          void 0 !== i && h.setPanelMinRatio(e, i),
          void 0 !== l && h.setPanelMaxRatio(e, l),
          void 0 !== c && h.setPanelMinPixelsSize(e, c),
          () => {
            (h.unregisterAutoCollapsiblePanel(e),
              h.removePanelRatios(e),
              h.removePanelMinPixelsSize(e));
          }
        ),
        [s, i, l, c, e, h],
      );
      let S = (0, o.useMemo)(
        () => (v && b !== e ? "hidden sm:flex" : ""),
        [e, b, v],
      );
      return (0, a.jsxs)(dJ, {
        id: e,
        noBackground: r ?? !1,
        allowAutoCollapse: s,
        children: [
          (0, a.jsx)("div", {
            style: {
              gridArea: e,
              ...(0, lR.visibleStylesIf)(!g && !r && j),
              ...(0, de.transitionStyles)(["opacity"], {
                delay: j && !w ? 200 : 0,
                duration: M,
              }),
            },
            className: (0, u.cn)("relative overflow-hidden", S),
            children: (0, a.jsx)("div", {
              className: "absolute inset-[2px] rounded-md bg-v0-gray-100",
            }),
          }),
          (0, a.jsx)("div", {
            style: {
              gridArea: e,
              transform: k,
              ...(0, lR.visibleStylesIf)(!y),
              ...(0, de.transitionStyles)(["opacity", "transform"], {
                delay: N,
                duration: M,
              }),
              pointerEvents: x ? "none" : void 0,
            },
            className: (0, u.cn)(
              "relative z-10 flex h-full w-full flex-col overflow-hidden",
              r ? "material-hidden" : "material-medium",
              S,
              n,
            ),
            ...(0, lR.a11yHideIf)(y),
            children: (0, a.jsx)(d9, {
              delay: N + M,
              mode: y ? "hidden" : "visible",
              children: t,
            }),
          }),
          x &&
            (0, a.jsx)("div", {
              className: "absolute inset-0 z-20",
              style: { pointerEvents: "all" },
            }),
        ],
      });
    }
    function ut({ children: e, className: t, layoutId: n, atoms: r }) {
      return (0, a.jsx)(d0, {
        layoutId: n,
        atoms: r,
        children: (0, a.jsx)(ur, { className: t, children: e }),
      });
    }
    let un = 640;
    function ur({ children: e, className: t }) {
      let n = (0, o.useId)(),
        r = `panel-group-${n.replace(/[^a-zA-Z0-9]/g, "-")}`,
        { atoms: s } = d1(),
        i = (0, sJ.useAtomValue)(s.isResizing),
        l = (0, d6.useIsWindowResizing)(),
        c = (0, sJ.useAtomValue)(s.cursorState),
        d = (0, sJ.useAtomValue)(s.isReordering),
        h = (0, o.useRef)(null),
        p = (0, sJ.useAtomValue)(s.visiblePanels),
        m = (0, d4.usePrevious)(p),
        f = (0, sJ.useAtomValue)(s.disableLayoutAnimations),
        {
          desktopGridTemplateAreas: g,
          desktopGridTemplateColumns: x,
          desktopGridTemplateColumnsUsingCqw: v,
        } = (0, sJ.useAtomValue)(s.gridProperties),
        b = (0, sJ.useAtomValue)(s.panelOrder),
        y = (0, o.useMemo)(() => m && m.length < p.length, [m, p]),
        j = (0, F.useIsMobile)(),
        C = (0, o.useMemo)(() => !1, []),
        w = (0, o.useMemo)(() => {
          if (i)
            switch (c) {
              case "collapse-left":
              case "expand-left":
                return "w-resize";
              case "collapse-right":
              case "expand-right":
                return "e-resize";
              default:
                return "col-resize";
            }
        }, [i, c]),
        k = (0, o.useMemo)(() => {
          let e = [];
          for (let t = 0; t < b.length - 1; t++) {
            let n = b[t],
              r = b[t + 1],
              s = !!r;
            e.push(
              (0, a.jsx)(
                d3,
                {
                  gridArea: `resize-${t}`,
                  from: s ? n : void 0,
                  to: s ? r : void 0,
                  containerRef: h,
                },
                `resize-${t}`,
              ),
            );
          }
          return e;
        }, [b, h]);
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)("style", {
            children: `
          .${r} {
            container-type: inline-size;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
          }
          @media (max-width: ${un - 1}px) {
            .${r} > * {
              grid-area: 1 / 1 !important;
            }
          }
          @media (min-width: ${un}px) {
            .${r} {
            grid-template-areas: ${g};
              grid-template-columns: ${x};
            }
            @supports (container-type: inline-size) {
              .${r} {
                grid-template-columns: ${C ? v : x};
              }
            }
          }
          
        `,
          }),
          (0, a.jsxs)("div", {
            ref: h,
            className: (0, u.cn)(
              r,
              "relative grid h-full w-full max-w-full contain-strict",
              t,
            ),
            style: {
              cursor: w,
              ...(i || d || l || f
                ? {}
                : (0, de.transitionStyles)(["grid-template-columns"], {
                    duration: 200 * !j,
                    delay: y || j ? 0 : 75,
                  })),
            },
            children: [e, k],
          }),
        ],
      });
    }
    var us = e.i(295191),
      ui = e.i(569543),
      ua = e.i(987761),
      ul = e.i(857371),
      uo = e.i(523968);
    function uc({
      isAuthor: e,
      isMobile: t,
      remote: n,
      isRecentsHomepageEnabled: r = !1,
      templates: s,
      recents: i,
    }) {
      let l = (0, o.useRef)(null),
        { fullScreenResult: c } = (0, dC.useFullscreenResult)(),
        { atoms: d } = (0, iV.useCurrentChat)(),
        b = (0, sJ.useAtomValue)(d.title),
        { expectUser: y } = (0, W.useUser)(),
        { vr: j, cvod: C } = (0, Z.useFlags)(),
        { chatId: w } = (0, v.useChatId)(),
        k = (0, uo.useIsVMEnabledForChat)(w),
        N = (0, m.useActiveBlockState)();
      !N &&
        n &&
        (N = {
          id: "@remote",
          meta: {},
          type: "local",
          messageId: "",
          source: "",
          language: "plaintext",
          closed: !0,
          remoteInfo: void 0,
          forkedFromBlockId: void 0,
        });
      let M = (0, m.useSetActiveBlockState)(),
        { ensureBlockSource: S } = (0, x.useBlockHistory)({ blockId: N?.id });
      (0, o.useEffect)(() => {
        (async () => {
          if (N?.needsBlockSource) {
            let e = await S().catch(() => {
              console.error("Failed to load block source for block", N.id);
            });
            M({ ...N, ...(e ? { source: e } : {}), needsBlockSource: !1 });
          }
        })();
      }, [N, S, M]);
      let I = (0, f.useRenderedBlock)({
          block: N,
          initialSize: h.DEFAULT_BLOCK_SIZE,
          location: "header",
          isAuthor: e,
          title: b ?? void 0,
        }),
        L = (0, g.useIsChatPage)(),
        { atoms: T } = (0, oW.useChatLayout)(),
        E = (0, sJ.useAtomValue)(T.mobilePanel),
        _ = (0, oW.getChatLayoutActions)(),
        A = C && !t;
      return (0, a.jsxs)("div", {
        className: (0, u.cn)(
          "relative flex min-w-0 flex-1 flex-col",
          !L && !y && "overflow-y-auto",
        ),
        ...(0, lR.a11yHideIf)(c),
        children: [
          (0, a.jsx)(o.Suspense, { children: (0, a.jsx)(ud, {}) }),
          L && (N || A)
            ? (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsxs)(iq.TabsToggle, {
                    value: E,
                    onValueChange: (e) => _.setMobilePanel(e),
                    className: "grid grid-cols-2 m-2 flex-shrink-0 sm:hidden",
                    children: [
                      (0, a.jsx)(iq.TabsToggleTrigger, {
                        value: ui.CHAT_INPUT_PANEL_ID,
                        children: "Chat",
                      }),
                      (0, a.jsx)(iq.TabsToggleTrigger, {
                        value: ui.CHAT_OUTPUT_PANEL_ID,
                        children: "Preview",
                      }),
                    ],
                  }),
                  (0, a.jsxs)(ut, {
                    className: "px-2 sm:pb-2",
                    layoutId: "chat",
                    atoms: (0, oW.getWritableChatPanelLayoutAtoms)(),
                    children: [
                      (0, a.jsx)(uu, {}),
                      (0, a.jsx)(ue, {
                        id: ui.CHAT_INPUT_PANEL_ID,
                        className: "relative",
                        noBackground: !0,
                        minRatio: 0.2,
                        maxRatio: 0.8,
                        minPixelsSize: 250,
                        allowAutoCollapse: !0,
                        children: (0, a.jsx)(cG, {
                          isAuthor: e,
                          isMobile: t,
                          isRecentsHomepageEnabled: r,
                          templates: s,
                          recents: i,
                          emptyScreenRef: l,
                        }),
                      }),
                      (0, a.jsx)(ue, {
                        id: ui.CHAT_OUTPUT_PANEL_ID,
                        children: (0, a.jsx)(o.Suspense, {
                          fallback: (0, a.jsx)(d8, {}),
                          children:
                            j || k
                              ? (0, a.jsx)(dZ, {
                                  chatId: w,
                                  blockId: N?.id ?? void 0,
                                })
                              : (0, a.jsx)(c9, {
                                  activeBlockState: N,
                                  renderedBlock: I,
                                  remote: n,
                                }),
                        }),
                      }),
                    ],
                  }),
                ],
              })
            : L || y
              ? (0, a.jsxs)(ua.AppCard, {
                  className: L
                    ? "border-0 bg-transparent shadow-none"
                    : "@container/page-layout",
                  children: [
                    L || !y
                      ? null
                      : (0, a.jsx)(us.PageHeader, {
                          title: null,
                          scrollRef: l,
                          hideBorder: !0,
                          filters: null,
                          actions: null,
                        }),
                    (0, a.jsx)(cG, {
                      isAuthor: e,
                      isMobile: t,
                      templates: s,
                      recents: i,
                      emptyScreenRef: l,
                      isRecentsHomepageEnabled: r,
                    }),
                  ],
                })
              : (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "material-medium relative m-2 mt-0 @container/page-layout",
                      children: (0, a.jsx)(cG, {
                        isAuthor: e,
                        isMobile: t,
                        templates: s,
                        recents: i,
                        emptyScreenRef: l,
                        isRecentsHomepageEnabled: r,
                      }),
                    }),
                    (0, a.jsx)("footer", {
                      className: "py-4 px-6",
                      children: (0, a.jsx)(p.default, {}),
                    }),
                  ],
                }),
        ],
      });
    }
    function ud() {
      return (
        !(function () {
          let { latestRevalidate: e, chatId: t } = (function () {
              let { messages: e, activeForkKey: t } = (0, v.useChatMessages)(),
                {
                  isLoading: n,
                  isStreaming: r,
                  isRestoring: s,
                } = (0, v.useChatLoadingState)(),
                { lastSyncedAt: i } = (0, v.useChatSyncState)(),
                a = (0, y.useChatId)(),
                l = (0, b.getLeafMessageIdFromForkKey)(t),
                { submit: c } = (0, M.useV0Chat)(),
                d = (0, v.useSetChatState)(),
                { switchToBlock: u } = O(),
                h = (0, o.useCallback)(
                  (n) => {
                    let r;
                    if (!n.ok || !t) return;
                    let {
                      deletedMessageIds: s,
                      newMessages: i,
                      syncedAt: a,
                      resumeUserMessageMap: l,
                    } = n.value;
                    if (!s.length && !i.length) return;
                    let o = new Set(e.map((e) => e.id)),
                      h = i.filter((e) => !o.has(e.id)),
                      p = new Map(i.map((e) => [e.id, e])),
                      m = new Set(s),
                      f = [
                        ...e.map((e) => {
                          let t = p.get(e.id);
                          return t || e;
                        }),
                        ...h,
                      ].filter((e) => !m.has(e.id)),
                      g = t.find((e) => m.has(e));
                    g
                      ? u((r = B({ messages: e, targetMessageId: g })) || [])
                      : (r = t);
                    let x = (0, b.getLeafNodeForkKey)(f, r || void 0, "right"),
                      v = (0, b.getLeafMessageIdFromForkKey)(x),
                      y = l[v || "never_match"],
                      j = new Set(Object.keys(l).filter((e) => e !== v));
                    (j.size > 0 && (f = f.filter((e) => !j.has(e.id))),
                      d({ activeForkKey: x, messages: f, lastSyncedAt: a }),
                      !v ||
                        y?.type !== "resumed" ||
                        o.has(y.responseMessageId) ||
                        o.has(v) ||
                        c({ action: "new", content: null }, y, {
                          activeForkKey: x,
                          avoidAutoSwitchingBlock: !0,
                          messages: f,
                        }));
                  },
                  [e, t, d, u, c],
                ),
                p = !t || !l || n || r || s || !a,
                { revalidate: m } = (0, j.useServerQuerySWR)(
                  ["chat", "latest"],
                  { chatId: a, lastSyncedAt: i },
                  {
                    onSuccess: h,
                    stopFetch: p,
                    omitParamsFromFetchKey: !0,
                    suspense: !0,
                  },
                );
              return { latestRevalidate: (0, C.useLatest)(m), chatId: a };
            })(),
            n = (0, o.useRef)(null),
            r = (0, o.useRef)(null),
            s = (0, o.useRef)(!1),
            { user: i } = (0, W.useUser)(),
            { userOnFree: a } = (0, S.useUserOnFree)(),
            { pse: l } = (0, Z.useFlags)(),
            c = i && !a && l,
            d = (0, o.useCallback)(() => {
              if (!c || !t || n.current) return;
              let s = N();
              if (!s) return;
              s.connect();
              let i = h.PUSHER_EVENTS.latestChat.getChannelName(t),
                a = () => {
                  e.current();
                },
                l = s.subscribe(i);
              (l.bind(G, a), (n.current = l), (r.current = a));
            }, [t, e, c]),
            u = (0, o.useCallback)(() => {
              (N()?.disconnect(),
                n.current &&
                  r.current &&
                  (n.current.unbind(G, r.current),
                  n.current.unsubscribe(),
                  (n.current = null),
                  (r.current = null)));
            }, []),
            p = (0, o.useCallback)(() => {
              "visible" === document.visibilityState
                ? s.current && ((s.current = !1), e.current(), d())
                : ((s.current = !0), u());
            }, [e, d, u]);
          (0, o.useEffect)(() => {
            if (t)
              return (
                d(),
                document.addEventListener("visibilitychange", p),
                () => {
                  (document.removeEventListener("visibilitychange", p), u());
                }
              );
          }, [t, d, p, u]);
        })(),
        null
      );
    }
    function uu() {
      let e = (0, F.useIsMobile)(640),
        t = (0, ul.usePreviousValue)(e),
        n = (0, oW.getChatLayoutActions)();
      return (
        (0, o.useEffect)(() => {
          !t && e && n.setMobilePanel("output");
        }, [e, t]),
        null
      );
    }
    function uh({
      isRecentsHomepageEnabled: e = !1,
      initialToast: t,
      isMobile: n,
      isAuthor: r,
      isRemote: s,
      hasSignedIn: i,
      templatesServer: u,
      recentsServer: h,
    }) {
      let p = (0, c.useSearchParams)(),
        m = (0, c.useRouter)(),
        { project: f } = (0, d.useChatMetadata)();
      return ((0, o.useEffect)(() => {
        if (p.get("signout")) {
          let e = "1" === p.get("revoke_failed");
          (m.replace("/chat"),
            setTimeout(() => {
              e
                ? l.toast.info("You have successfully signed out.", {
                    width: 460,
                    style: { maxWidth: "calc(100vw - 2rem)" },
                    description: (0, a.jsxs)(a.Fragment, {
                      children: [
                        "To sign in or sign up with a different Vercel account, first sign out on",
                        " ",
                        (0, a.jsxs)(cR.Link, {
                          className: "inline-flex items-center gap-1 underline",
                          external: !0,
                          href: "https://vercel.com/account",
                          children: [
                            "vercel.com",
                            (0, a.jsx)(Q.External, {
                              className: "inline-block size-3",
                            }),
                          ],
                        }),
                      ],
                    }),
                    action: {
                      children: (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)("span", { children: "Visit" }),
                          (0, a.jsx)("span", {
                            className: "hidden md:inline",
                            children: " Vercel",
                          }),
                        ],
                      }),
                      onClick: () => {
                        window.open(
                          "https://vercel.com/account",
                          "_blank",
                          "noopener,noreferrer",
                        );
                      },
                    },
                    duration: 1e5,
                  })
                : l.toast.success("Successfully signed out");
            }, 0));
        }
      }, [p, m]),
      (0, o.useEffect)(() => {
        if (p.get("env")) {
          let e = new URL(window.location.href);
          (e.searchParams.delete("env"),
            window.history.replaceState({}, "", e.toString()),
            (0, eM.openDialog)({
              type: "createEnvVar",
              data: { mode: "create" },
            }));
        }
      }, [p, f?.projectId]),
      (0, o.useEffect)(() => {
        t && setTimeout(() => l.toast.default(t, { duration: 5e3 }));
      }, [t]),
      s)
        ? (0, a.jsx)(uc, {
            isAuthor: r,
            isMobile: n,
            remote: !0,
            templates: u,
            recents: h,
            isRecentsHomepageEnabled: e,
          })
        : (0, a.jsx)(uc, {
            isAuthor: r,
            isMobile: n,
            remote: !1,
            templates: u,
            recents: h,
            isRecentsHomepageEnabled: e,
          });
    }
    e.s(["FullChat", () => uh], 900547);
  },
  620470,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(576191),
      r = e.i(176248),
      s = e.i(686832),
      i = e.i(226368),
      a = e.i(228141),
      l = e.i(442221),
      o = e.i(389140),
      c = e.i(919012),
      d = (0, c.createServerReference)(
        "40677326dc4ca7c0839c57006847922af443a8cc81",
        c.callServer,
        void 0,
        c.findSourceMapURL,
        "cancelPremiumAfterTeamUpgrade",
      );
    e.i(563948);
    var u = e.i(407562),
      h = e.i(211976);
    function p({ teamName: e, teamSlug: a, showDowngradeCta: l }) {
      let o = (0, i.useRouter)(),
        c = (0, i.usePathname)(),
        d = (0, i.useSearchParams)(),
        [u, h] = (0, n.useState)(!!(e || a)),
        p = (0, n.useCallback)(() => {
          let e = new URLSearchParams(Array.from(d.entries()));
          for (let t of ["teamSlug", "teamName"]) e.delete(t);
          let t = e.toString();
          o.replace(`${c}${t ? `?${t}` : ""}`);
        }, [c, o, d]),
        f = (0, n.useCallback)(() => {
          (p(), h(!1));
        }, [p]);
      return l
        ? (0, t.jsx)(m, { teamName: e, teamSlug: a })
        : (0, t.jsxs)(s.Modal, {
            onOpenChange: f,
            open: u,
            children: [
              (0, t.jsxs)(s.ModalHeader, {
                children: [
                  (0, t.jsx)(s.ModalTitle, { children: "Upgrade Confirmed" }),
                  (0, t.jsxs)(s.ModalDescription, {
                    children: [
                      "Your Team subscription",
                      " ",
                      e
                        ? (0, t.jsxs)(t.Fragment, {
                            children: [
                              "for ",
                              (0, t.jsx)("span", {
                                className: "font-medium",
                                children: e,
                              }),
                              " ",
                            ],
                          })
                        : (0, t.jsx)("span", { children: "" }),
                      (0, t.jsxs)("span", {
                        children: [
                          "has been confirmed! You can invite additional members in your Vercel Team's settings.",
                          " ",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)(s.ModalFooter, {
                children: [
                  (0, t.jsx)(r.Button, {
                    size: "sm",
                    variant: "secondary",
                    children: (0, t.jsx)("a", {
                      target: "_blank",
                      href: a
                        ? `https://vercel.com/${a}/~/settings/members`
                        : "https://vercel.com",
                      children: "Manage Members",
                    }),
                  }),
                  (0, t.jsx)(r.Button, {
                    size: "sm",
                    onClick: f,
                    variant: "default",
                    children: "Start Building",
                  }),
                ],
              }),
            ],
          });
    }
    function m({ teamName: e, teamSlug: c }) {
      let p = (0, i.useRouter)(),
        m = (0, i.usePathname)(),
        f = (0, i.useSearchParams)(),
        [g, x] = (0, n.useState)(!!(e || c)),
        [v, b] = (0, n.useState)(!1),
        [y, j] = (0, n.useState)(!1),
        [C, w] = (0, n.useTransition)(),
        k = (0, n.useCallback)(() => {
          let e = new URLSearchParams(Array.from(f.entries()));
          for (let t of ["teamSlug", "teamName", "cta"]) e.delete(t);
          let t = e.toString();
          p.replace(`${m}${t ? `?${t}` : ""}`);
        }, [m, p, f]),
        N = (0, n.useCallback)(() => {
          (k(), x(!1));
        }, [k]),
        M = (0, n.useCallback)(() => {
          b(!1);
        }, []),
        S = (0, n.useCallback)(() => {
          C ||
            w(async () => {
              "error" in (await d(c))
                ? u.toast.error(
                    "Failed to cancel Premium plan. Please try again or reach out to Customer Support to cancel your Premium plan.",
                  )
                : (j(!0), M());
            });
        }, [C, M, c]);
      return v
        ? (0, t.jsxs)(s.Modal, {
            onOpenChange: N,
            open: g,
            children: [
              (0, t.jsxs)(s.ModalHeader, {
                children: [
                  (0, t.jsx)(s.ModalTitle, {
                    children: "Cancel your Premium Plan",
                  }),
                  (0, t.jsxs)(s.ModalDescription, {
                    children: [
                      "We have successfully created a new Team plan",
                      e
                        ? (0, t.jsxs)(t.Fragment, {
                            children: [
                              " ",
                              "for ",
                              (0, t.jsx)("span", {
                                className: "font-medium",
                                children: e,
                              }),
                              ".",
                            ],
                          })
                        : (0, t.jsx)("span", { children: "." }),
                      " ",
                      (0, t.jsx)("span", {
                        children:
                          "Would you like to cancel your active personal Premium plan? We will apply a credit for the remaining time on your Premium billing period towards your new Team plan.",
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)(s.ModalFooter, {
                children: [
                  (0, t.jsx)(r.Button, {
                    size: "sm",
                    variant: "secondary",
                    onClick: M,
                    children: "Keep Both Plans",
                  }),
                  (0, t.jsx)(h.SpinnerButton, {
                    size: "sm",
                    onClick: S,
                    pending: C,
                    children: "Cancel Premium",
                  }),
                ],
              }),
            ],
          })
        : (0, t.jsxs)(s.Modal, {
            onOpenChange: N,
            open: g,
            children: [
              (0, t.jsxs)(s.ModalHeader, {
                children: [
                  (0, t.jsx)(s.ModalTitle, { children: "Team Plan Confirmed" }),
                  (0, t.jsxs)(s.ModalDescription, {
                    children: [
                      "Your Team subscription",
                      " ",
                      e
                        ? (0, t.jsxs)(t.Fragment, {
                            children: [
                              "for ",
                              (0, t.jsx)("span", {
                                className: "font-medium",
                                children: e,
                              }),
                              " ",
                            ],
                          })
                        : (0, t.jsx)("span", { children: "" }),
                      (0, t.jsx)("span", { children: "has been confirmed!" }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)(s.ModalContent, {
                className: "flex flex-col gap-3",
                children: [
                  (0, t.jsx)(r.Button, {
                    className: "h-fit p-0 text-left",
                    variant: "secondary",
                    children: (0, t.jsxs)("a", {
                      className:
                        "flex w-full items-center justify-between gap-3 p-3 pr-[14px] text-v0-gray-900",
                      target: "_blank",
                      href: c
                        ? `https://vercel.com/${c}/~/settings/members`
                        : "https://vercel.com",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex h-fit flex-col text-sm",
                          children: [
                            (0, t.jsx)("b", {
                              className: "font-medium text-v0-gray-1000",
                              children: "Manage Members",
                            }),
                            (0, t.jsx)("p", {
                              className: "font-normal",
                              children:
                                "Add more members to your team on Vercel.",
                            }),
                          ],
                        }),
                        (0, t.jsx)(o.External, {}),
                      ],
                    }),
                  }),
                  (0, t.jsxs)(r.Button, {
                    className:
                      "flex h-fit w-full items-center justify-between gap-3 p-3 pr-[14px] text-left text-v0-gray-900",
                    variant: "secondary",
                    onClick: () => b(!0),
                    disabled: y,
                    children: [
                      (0, t.jsxs)("div", {
                        className: "flex h-fit flex-col text-sm",
                        children: [
                          (0, t.jsx)("b", {
                            className: "font-medium text-v0-gray-1000",
                            children: y
                              ? "Premium Cancelled"
                              : "Cancel Premium Plan",
                          }),
                          (0, t.jsx)("p", {
                            className: "font-normal",
                            children: y
                              ? "Your Premium plan was canceled."
                              : "Would you like to cancel your existing Premium plan?",
                          }),
                        ],
                      }),
                      y
                        ? (0, t.jsx)(a.CheckCircleFill, {})
                        : (0, t.jsx)(l.ChevronRight, {}),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)(s.ModalFooter, {
                children: (0, t.jsx)(r.Button, {
                  size: "sm",
                  onClick: N,
                  variant: "default",
                  children: "Start Building",
                }),
              }),
            ],
          });
    }
    e.s(["WelcomeModal", () => p], 620470);
  },
  25381,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(919012),
      r = (0, n.createServerReference)(
        "7fab34754b76682046952777e686b34b52978e98c0",
        n.callServer,
        void 0,
        n.findSourceMapURL,
        "getHomepageTemplatesAuthedAction",
      ),
      s = e.i(790958);
    e.s(
      [
        "InfiniteListClient",
        0,
        (e) =>
          (0, t.jsx)(s.TemplateListInfiniteClient, {
            ...e,
            templatesGetter: r,
          }),
      ],
      25381,
    );
  },
  322081,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(502398),
      r = e.i(479273),
      s = e.i(304649),
      i = e.i(120282);
    function a({ children: e }) {
      return (0, t.jsx)("div", {
        className: "text-left text-base font-medium",
        children: e,
      });
    }
    function l({ children: e }) {
      let { locale: n } = (0, r.useLocale)();
      return (0, t.jsx)("div", {
        className: (0, s.cn)(
          "text-sm text-pretty text-v0-gray-900",
          n === i.esLocaleInfo.iso639 && "text-[13px] sm:text-sm",
        ),
        children: e,
      });
    }
    function o({ children: e }) {
      return (0, t.jsx)("span", { className: "hidden md:inline", children: e });
    }
    function c({ className: e, ...r }) {
      return (0, t.jsx)(n.Link, {
        className: (0, s.cn)(
          "flex items-center gap-1.5 text-sm text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000",
          e,
        ),
        ...r,
      });
    }
    e.s([
      "TemplateFeaturedBrowseLink",
      () => c,
      "TemplateFeaturedHeading",
      () => a,
      "TemplateFeaturedSubheading",
      () => l,
      "TemplateFeaturedSubheadingText",
      () => o,
    ]);
  },
  696357,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(576191);
    let r = [
      "icon-01.png",
      "icon-02.png",
      "icon-03.png",
      "icon-04.png",
      "icon-05.png",
      "icon-06.png",
      "icon-07.png",
      "icon-08.png",
      "icon-09.png",
      "icon-10.png",
      "icon-11.png",
      "icon-12.png",
    ];
    function s({ isHovered: e }) {
      let s = (0, n.useRef)(null),
        i = (0, n.useRef)({ x: 0, y: 0 }),
        [a, l] = (0, n.useState)(!1),
        o = e ?? a,
        [, c] = (0, n.useState)(0),
        d = (0, n.useRef)([]),
        u = (0, n.useRef)([]),
        h = (0, n.useRef)([]),
        p = (0, n.useRef)(null),
        m = (0, n.useRef)(void 0),
        f = (() => {
          let e = [];
          for (let t = 0; t < 6; t++) {
            let n = 0.5 * (t % 2 == 1);
            for (let s = 0; s < 10; s++) {
              let i = r[e.length % r.length];
              i && e.push({ icon: i, row: t, col: s + n });
            }
          }
          return e;
        })(),
        g = () => {
          if (!s.current) return;
          let e = s.current.getBoundingClientRect(),
            t = (e.width - 572) / 2,
            n = (e.height - 320) / 2;
          h.current = f.map((e) => ({
            x: t + 56 * e.col + 20,
            y: n + 56 * e.row + 20,
          }));
        };
      return (
        (0, n.useEffect)(() => {
          ((d.current = f.map(() => 1)),
            (u.current = f.map(() => ({ x: 0, y: 0 }))),
            g());
          let e = () => {
            g();
          };
          return (
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
          );
        }, []),
        (0, n.useEffect)(() => {
          let e = () => {
            if (!s.current || 0 === h.current.length) {
              m.current = requestAnimationFrame(e);
              return;
            }
            let t = !1;
            (f.forEach((e, n) => {
              let r = ((e) => {
                  if (!o || !h.current[e]) return 1;
                  let t = h.current[e],
                    n = i.current.x - t.x,
                    r = i.current.y - t.y,
                    s = Math.sqrt(n * n + r * r);
                  return s > 200
                    ? 0.85
                    : 1.15 - (s / 200) * 0.29999999999999993;
                })(n),
                s = ((e) => {
                  if (!o || !h.current[e]) return { x: 0, y: 0 };
                  let t = h.current[e],
                    n = i.current.x - t.x,
                    r = i.current.y - t.y,
                    s = Math.sqrt(n * n + r * r);
                  if (s > 200 || 0 === s) return { x: 0, y: 0 };
                  let a = (1 - s / 200) * 6;
                  return { x: (n / s) * a, y: (r / s) * a };
                })(n),
                a = d.current[n] ?? 1,
                l = u.current[n] ?? { x: 0, y: 0 },
                c = 0.25;
              r < a && (c = o ? 0.03 : 0.04);
              let p = a + (r - a) * c,
                m = o ? 0.2 : 0.08,
                f = l.x + (s.x - l.x) * m,
                g = l.y + (s.y - l.y) * m;
              (Math.abs(p - a) > 0.001 ||
                Math.abs(f - l.x) > 0.001 ||
                Math.abs(g - l.y) > 0.001) &&
                ((d.current[n] = p), (u.current[n] = { x: f, y: g }), (t = !0));
            }),
              t && c((e) => e + 1),
              (m.current = requestAnimationFrame(e)));
          };
          return (
            (m.current = requestAnimationFrame(e)),
            () => {
              m.current && cancelAnimationFrame(m.current);
            }
          );
        }, [o]),
        (0, t.jsxs)("div", {
          ref: s,
          className:
            "relative w-full h-[280px] overflow-hidden bg-v0-background-100",
          onMouseMove: (e) => {
            if (!s.current || !p.current) return;
            let t = s.current.getBoundingClientRect(),
              n = p.current.getBoundingClientRect();
            i.current = { x: e.clientX - t.left, y: e.clientY - t.top };
            let r = n.left - t.left,
              a = n.top - t.top;
            h.current = f.map((e) => ({
              x: r + 56 * e.col + 20,
              y: a + 56 * e.row + 20,
            }));
          },
          onMouseEnter: () => {
            (g(), l(!0));
          },
          onMouseLeave: () => {
            l(!1);
          },
          children: [
            (0, t.jsxs)("div", {
              className: "absolute inset-0 pointer-events-none z-10",
              children: [
                (0, t.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-r from-v0-background-100/80 via-transparent to-v0-background-100/80",
                }),
                (0, t.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-b from-v0-background-100/80 via-transparent to-v0-background-100/80",
                }),
              ],
            }),
            (0, t.jsx)("div", {
              className: "absolute inset-0 flex items-center justify-center",
              children: (0, t.jsx)("div", {
                ref: p,
                className: "relative",
                style: { width: "572px", height: "320px" },
                children: f.map((e, n) => {
                  let r = d.current[n] || 1,
                    s = u.current[n] || { x: 0, y: 0 };
                  return (0, t.jsx)(
                    "div",
                    {
                      className: "absolute",
                      style: {
                        left: `${56 * e.col}px`,
                        top: `${56 * e.row}px`,
                        width: "40px",
                        height: "40px",
                        transform: `translate(${s.x}px, ${s.y}px) scale(${r})`,
                        transformOrigin: "center",
                        willChange: "transform",
                      },
                      children: (0, t.jsx)("div", {
                        className:
                          "w-full h-full rounded-full overflow-hidden bg-v0-background-100 border border-v0-gray-200 shadow-sm",
                        children: (0, t.jsx)("img", {
                          src: `/chat-static/assets/homepage/integrations/${e.icon}`,
                          alt: "",
                          className: "w-full h-full object-cover",
                        }),
                      }),
                    },
                    n,
                  );
                }),
              }),
            }),
          ],
        })
      );
    }
    var i = e.i(657736),
      a = e.i(956562),
      l = e.i(93089);
    function o({ isHovered: e }) {
      let [r, s] = (0, n.useState)(!1),
        o = e ?? r;
      return (0, t.jsxs)("div", {
        className: "w-full h-full flex items-center justify-center",
        children: [
          (0, t.jsx)("svg", {
            "aria-hidden": "true",
            style: { position: "absolute", width: 0, height: 0 },
            children: (0, t.jsx)("defs", {
              children: (0, t.jsxs)("filter", {
                id: "goo-filter",
                colorInterpolationFilters: "sRGB",
                children: [
                  (0, t.jsx)("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: "8",
                    result: "blur",
                  }),
                  (0, t.jsx)("feColorMatrix", {
                    in: "blur",
                    type: "matrix",
                    values: "2 0 0 0 0  0 2 0 0 0  0 0 2 0 0  0 0 0 45 -12",
                    result: "goo",
                  }),
                  (0, t.jsx)("feComposite", {
                    in: "SourceGraphic",
                    in2: "goo",
                    operator: "atop",
                  }),
                ],
              }),
            }),
          }),
          (0, t.jsx)(i.motion.div, {
            className:
              "relative w-[300px] h-[164px] flex items-center justify-center [--shadow-default:drop-shadow(0_4px_12px_rgba(0,0,0,0.04))_drop-shadow(0_8px_24px_rgba(0,0,0,0.06))] [--shadow-hover:drop-shadow(0_8px_20px_rgba(0,0,0,0.10))_drop-shadow(0_16px_40px_rgba(0,0,0,0.11))_drop-shadow(0_32px_72px_rgba(0,0,0,0.1))] dark:[--shadow-default:drop-shadow(0_4px_12px_rgba(255,255,255,0.1))_drop-shadow(0_8px_24px_rgba(255,255,255,0.06))] dark:[--shadow-hover:drop-shadow(0_8px_20px_rgba(255,255,255,0.12))_drop-shadow(0_16px_40px_rgba(255,255,255,0.12))_drop-shadow(0_32px_64px_rgba(255,255,255,0.1))]",
            animate: {
              filter: o ? "var(--shadow-hover)" : "var(--shadow-default)",
            },
            transition: { duration: 0.3 },
            onMouseEnter: () => s(!0),
            onMouseLeave: () => s(!1),
            onTouchStart: () => s(!0),
            onTouchEnd: () => s(!1),
            children: (0, t.jsxs)("div", {
              className:
                "relative w-full h-full flex items-center justify-center",
              style: { filter: "url(#goo-filter)" },
              children: [
                (0, t.jsx)(i.motion.div, {
                  className:
                    "absolute w-[88px] h-[88px] rounded-full bg-v0-background-100 flex items-center justify-center",
                  animate: { x: o ? -50 : -64 },
                  transition: { type: "spring", stiffness: 200, damping: 15 },
                  children: (0, t.jsx)(a.LogoV0, {
                    className: "w-11 h-11 text-v0-gray-1000",
                  }),
                }),
                (0, t.jsx)(i.motion.div, {
                  className:
                    "absolute w-[88px] h-[88px] rounded-full bg-v0-background-100 flex items-center justify-center",
                  animate: { x: o ? 50 : 64 },
                  transition: { type: "spring", stiffness: 200, damping: 15 },
                  children: (0, t.jsx)(l.LogoGithub, {
                    className: "w-8 h-8 text-v0-gray-1000",
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    var c = e.i(35590);
    function d({ isHovered: e }) {
      let [r, s] = n.default.useState(!1),
        i = e ?? r,
        [a, l] = n.default.useState({ x: 0, y: 0 }),
        o = n.default.useRef(null),
        { resolvedTheme: d } = (0, c.useTheme)(),
        u = i ? 35 * a.x : 0,
        h = Math.min(Math.sqrt(a.x * a.x + a.y * a.y), 1),
        p = i ? 60 * Math.pow(h, 1.2) : 0,
        m = -a.x * p,
        f = -a.y * p,
        g = 1.5 * h + 0.3,
        x = i ? -(5 * a.x) : 0,
        v = i ? Math.atan2(a.y, a.x) * (180 / Math.PI) + 90 : 180,
        b = i
          ? `drop-shadow(${0.05 * m}px ${0.05 * f}px ${3 * g}px rgba(0, 0, 0, 0.1)) drop-shadow(${0.2 * m}px ${0.2 * f}px ${8 * g}px rgba(0, 0, 0, 0.08)) drop-shadow(${0.4 * m}px ${0.4 * f}px ${12 * g}px rgba(0, 0, 0, 0.06)) drop-shadow(${0.7 * m}px ${0.7 * f}px ${16 * g}px rgba(0, 0, 0, 0.04)) drop-shadow(${m}px ${f}px ${20 * g}px rgba(0, 0, 0, 0.02))`
          : "none";
      return (0, t.jsx)("div", {
        ref: o,
        className:
          "w-full h-full flex items-center justify-center relative overflow-hidden",
        style: {
          background:
            "linear-gradient(180deg, var(--v0-gray-50) 0%, var(--v0-gray-100) 45%, var(--v0-gray-50) 55%)",
          perspective: "1000px",
        },
        onMouseMove: (e) => {
          if (!o.current) return;
          let t = o.current.getBoundingClientRect();
          l({
            x: ((e.clientX - t.left) / t.width - 0.5) * 2,
            y: ((e.clientY - t.top) / t.height - 0.5) * 2,
          });
        },
        onMouseEnter: () => {
          s(!0);
        },
        onMouseLeave: () => {
          (s(!1), l({ x: 0, y: 0 }));
        },
        children: (0, t.jsxs)("div", {
          className: "flex items-center justify-center relative",
          style: {
            transform: `translateY(-12px) rotateY(${u}deg) scale(${i ? 1.15 : 1})`,
            transformStyle: "preserve-3d",
            filter: b,
            transition: i
              ? "all 0.15s ease-out"
              : "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
          children: [
            (0, t.jsx)("svg", {
              width: "100",
              height: "86",
              viewBox: "0 0 76 65",
              fill: "none",
              className: "absolute",
              style: {
                transform: `translateX(${x}px)`,
                zIndex: -1,
                transition: i
                  ? "transform 0.15s ease-out"
                  : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              },
              children: (0, t.jsx)("path", {
                d: "M37.5274 0L75.0548 65H0L37.5274 0Z",
                className: "text-v0-gray-1000 transition-all duration-200",
                style: {
                  fill: "currentColor",
                  opacity: 0.4,
                  filter: `brightness(${"dark" === d ? 0.85 : 1.15})`,
                },
              }),
            }),
            (0, t.jsxs)("svg", {
              width: "100",
              height: "86",
              viewBox: "0 0 76 65",
              fill: "none",
              children: [
                (0, t.jsx)("defs", {
                  children: (0, t.jsxs)("linearGradient", {
                    id: "triangleGradient",
                    x1: "0%",
                    y1: "0%",
                    x2: "100%",
                    y2: "100%",
                    gradientTransform: `rotate(${v} 0.5 0.5)`,
                    children: [
                      (0, t.jsx)("stop", {
                        offset: "0%",
                        stopColor: "currentColor",
                        stopOpacity: i ? "1" : "0.95",
                      }),
                      (0, t.jsx)("stop", {
                        offset: "100%",
                        stopColor: "currentColor",
                        stopOpacity: i ? "0.7" : "0.95",
                      }),
                    ],
                  }),
                }),
                (0, t.jsx)("path", {
                  d: "M37.5274 0L75.0548 65H0L37.5274 0Z",
                  fill: "url(#triangleGradient)",
                  className: "text-v0-gray-1000 transition-all duration-200",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function u({ isHovered: e }) {
      let { resolvedTheme: r } = (0, c.useTheme)(),
        [s, a] = (0, n.useState)(!1),
        [l, o] = (0, n.useState)(!1);
      (0, n.useEffect)(() => {
        let e = () => {
          o(window.innerWidth < 768);
        };
        return (
          e(),
          window.addEventListener("resize", e),
          () => window.removeEventListener("resize", e)
        );
      }, []);
      let d = "dark" === r ? "-dark" : "",
        u = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 },
        h = l || (e ?? s);
      return (0, t.jsx)("div", {
        className: "w-full h-full flex items-center justify-center",
        onMouseEnter: () => a(!0),
        onMouseLeave: () => a(!1),
        children: (0, t.jsxs)("div", {
          className: "relative w-[280px] h-[195px]",
          children: [
            (0, t.jsx)(
              i.motion.img,
              {
                src: `/chat-static/assets/homepage/design-mode/design-mode-00${d}.svg`,
                alt: "",
                className: "absolute inset-0 w-full h-full object-contain",
                animate: { y: 4 * !h },
                transition: u,
              },
              `layer0${d}`,
            ),
            (0, t.jsx)(
              i.motion.img,
              {
                src: `/chat-static/assets/homepage/design-mode/design-mode-01${d}.svg`,
                alt: "",
                className: "absolute inset-0 w-full h-full object-contain",
                animate: { y: 4 * !h, opacity: +!!h },
                transition: {
                  y: u,
                  opacity: { duration: 0.2, ease: "easeOut" },
                },
              },
              `layer1${d}`,
            ),
            (0, t.jsx)(
              i.motion.img,
              {
                src: `/chat-static/assets/homepage/design-mode/design-mode-02${d}.svg`,
                alt: "",
                className: "absolute inset-0 w-full h-full object-contain",
                animate: { x: 32 * !h, y: 22 * !h, opacity: h ? 1 : 0.8 },
                transition: {
                  x: { type: "spring", stiffness: 40, damping: 12, mass: 1 },
                  y: { type: "spring", stiffness: 280, damping: 28, mass: 0.1 },
                  opacity: u,
                },
              },
              `layer2${d}`,
            ),
            (0, t.jsx)(
              i.motion.img,
              {
                src: `/chat-static/assets/homepage/design-mode/design-mode-03${d}.svg`,
                alt: "",
                className: "absolute inset-0 w-full h-full object-contain",
                animate: {
                  y: h ? 16 : 28,
                  scale: h ? 0.95 : 0.92,
                  opacity: +!!h,
                },
                transition: u,
              },
              `layer3${d}`,
            ),
          ],
        }),
      });
    }
    let h = [
      "/chat-static/assets/homepage/templates/row01.png",
      "/chat-static/assets/homepage/templates/row02.png",
      "/chat-static/assets/homepage/templates/row03.png",
      "/chat-static/assets/homepage/templates/row04.png",
    ];
    function p() {
      let [e, r] = (0, n.useState)(!1);
      return (0, t.jsx)("div", {
        className:
          "w-full h-full flex items-start justify-center overflow-hidden",
        onMouseEnter: () => r(!0),
        onMouseLeave: () => r(!1),
        children: (0, t.jsx)(i.motion.div, {
          className: "w-full h-full flex gap-1 items-start",
          animate: {
            scale: e ? 1 : 1.1,
            filter: e ? "saturate(1) contrast(1)" : "saturate(0) contrast(1.2)",
          },
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          children: h.map((n, r) => {
            let s = 1 === r || 3 === r;
            return (0, t.jsx)(
              i.motion.div,
              {
                className: "flex-1 overflow-hidden rounded-[8px]",
                animate: { y: e && s ? -6 : 0 },
                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                children: (0, t.jsx)("img", {
                  src: n,
                  alt: "",
                  className: "w-full h-auto",
                }),
              },
              r,
            );
          }),
        }),
      });
    }
    function m() {
      let [e, r] = n.default.useState(!1),
        [s, a] = n.default.useState(0),
        l = n.default.useRef(null),
        { resolvedTheme: o } = (0, c.useTheme)(),
        d = "dark" === o,
        u = [
          "theme01.svg",
          "theme02.svg",
          "theme03.svg",
          "theme04.svg",
          "theme05.svg",
          "theme06.svg",
        ],
        h = n.default.useMemo(
          () => ({
            isDark: d,
            getThemeFileName: (e) => (d ? e.replace(".svg", "-dark.svg") : e),
          }),
          [d],
        );
      return (
        n.default.useEffect(
          () => (
            e
              ? (a((e) => (e + 1) % u.length),
                (l.current = setInterval(() => {
                  a((e) => (e + 1) % u.length);
                }, 1200)))
              : l.current && (clearInterval(l.current), (l.current = null)),
            () => {
              l.current && clearInterval(l.current);
            }
          ),
          [e],
        ),
        (0, t.jsx)("div", {
          className:
            "w-full h-full flex items-center justify-center overflow-visible -mt-32",
          onMouseEnter: () => {
            r(!0);
          },
          onMouseLeave: () => {
            r(!1);
          },
          children: (0, t.jsx)("div", {
            className: "relative w-[240px] h-auto",
            children: u.map((e, n) => {
              let r,
                a,
                l =
                  0 == (a = (n - s + (r = u.length)) % r)
                    ? { x: 0, y: 0, rotate: -7, opacity: 1, zIndex: 30 }
                    : 1 === a
                      ? {
                          x: -120,
                          y: -80,
                          rotate: -7,
                          opacity: 0.7,
                          zIndex: 20,
                        }
                      : a === r - 1
                        ? {
                            x: 120,
                            y: 80,
                            rotate: -7,
                            opacity: 0.5,
                            zIndex: 15,
                          }
                        : a === r - 2
                          ? {
                              x: 180,
                              y: 140,
                              rotate: -7,
                              opacity: 0,
                              zIndex: 5,
                            }
                          : {
                              x: -200,
                              y: -140,
                              rotate: -7,
                              opacity: 0,
                              zIndex: 0,
                            };
              return (0, t.jsx)(
                i.motion.div,
                {
                  className: "absolute left-0 top-0 w-full",
                  animate: {
                    x: l.x,
                    y: l.y,
                    rotate: l.rotate,
                    opacity: l.opacity,
                    zIndex: l.zIndex,
                  },
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 0.8,
                  },
                  children: (0, t.jsx)("div", {
                    className:
                      "rounded-xl overflow-hidden bg-v0-white shadow-2xl",
                    children: (0, t.jsx)(
                      "img",
                      {
                        src: `/chat-static/assets/homepage/themes/${h.getThemeFileName(e)}`,
                        alt: "",
                        className: "w-full h-auto",
                      },
                      `${e}-${h.isDark ? "dark" : "light"}`,
                    ),
                  }),
                },
                e,
              );
            }),
          }),
        })
      );
    }
    var f = e.i(965932),
      g = e.i(877318);
    let x = (0, g.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 1H0V1.75V13.25V14H0.75H5.5V12.5H1.5V2.5H5C6.24264 2.5 7.25 3.50736 7.25 4.75V6.5H8.75V4.75C8.75 3.50736 9.75736 2.5 11 2.5H14.5V6.5H16V1.75V1H15.25H11C9.7733 1 8.68417 1.58901 8 2.49963C7.31583 1.58901 6.2267 1 5 1H0.75ZM11.0915 10.2175C11.4564 10.0309 11.7944 9.70265 11.9642 9.25H12.0358C12.2056 9.70265 12.5436 10.0309 12.9085 10.2175C12.9698 10.2488 13.0294 10.2833 13.0871 10.3208C13.4317 10.5446 13.886 10.6736 14.3637 10.5941L14.3994 10.6559C14.0923 11.0289 13.9765 11.4857 13.9973 11.8955C13.9991 11.93 14 11.9649 14 12C14 12.0351 13.9991 12.07 13.9973 12.1044C13.9765 12.5143 14.0923 12.9711 14.3994 13.3441L14.3637 13.4059C13.886 13.3264 13.4317 13.4554 13.0871 13.6792C13.0294 13.7167 12.9698 13.7512 12.9085 13.7825C12.5436 13.9691 12.2056 14.2973 12.0358 14.75H11.9642C11.7944 14.2973 11.4564 13.9691 11.0915 13.7825C11.0302 13.7512 10.9706 13.7167 10.9129 13.6792C10.5683 13.4554 10.114 13.3264 9.63627 13.4059L9.60059 13.3441C9.90769 12.9711 10.0235 12.5144 10.0027 12.1045C10.0009 12.07 10 12.0351 10 12C10 11.9649 10.0009 11.93 10.0027 11.8955C10.0235 11.4856 9.9077 11.0289 9.60061 10.6559L9.63629 10.5941C10.114 10.6736 10.5683 10.5446 10.9129 10.3208C10.9706 10.2833 11.0302 10.2488 11.0915 10.2175ZM15.4037 11.4079L15.9641 10.866L14.9641 9.13398L14.215 9.34827C14.0629 9.39177 13.9006 9.35863 13.7679 9.27247C13.6743 9.21169 13.5774 9.15559 13.4775 9.1045C13.3369 9.03257 13.2272 8.90865 13.1888 8.75537L13 8H11L10.8112 8.75537C10.7728 8.90865 10.6631 9.03257 10.5225 9.1045C10.4226 9.15558 10.3257 9.21168 10.2321 9.27247C10.0994 9.35862 9.93709 9.39176 9.78502 9.34826L9.03591 9.13397L8.03591 10.866L8.5963 11.4079C8.70977 11.5176 8.7623 11.6743 8.75427 11.8319C8.75143 11.8876 8.75 11.9436 8.75 12C8.75 12.0564 8.75143 12.1124 8.75427 12.168C8.7623 12.3257 8.70977 12.4824 8.5963 12.5921L8.03589 13.134L9.03589 14.866L9.78501 14.6517C9.93708 14.6082 10.0994 14.6414 10.2321 14.7275C10.3257 14.7883 10.4226 14.8444 10.5225 14.8955C10.6631 14.9674 10.7728 15.0913 10.8112 15.2446L11 16H13L13.1888 15.2446C13.2272 15.0913 13.3369 14.9674 13.4775 14.8955C13.5774 14.8444 13.6743 14.7883 13.7679 14.7275C13.9006 14.6414 14.0629 14.6082 14.215 14.6517L14.9641 14.866L15.9641 13.134L15.4037 12.5921C15.2902 12.4824 15.2377 12.3257 15.2457 12.168C15.2486 12.1124 15.25 12.0564 15.25 12C15.25 11.9436 15.2486 11.8876 15.2457 11.832C15.2377 11.6743 15.2902 11.5176 15.4037 11.4079Z" fill="currentColor"/>',
      ),
      v = (0, g.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 0H0V0.75V10.5C0 11.8807 1.11929 13 2.5 13H5.25V11.5H2.5C1.94772 11.5 1.5 11.0523 1.5 10.5V1.5H14.5V6H16V0.75V0H15.25H0.75ZM3.75 4.5C4.16421 4.5 4.5 4.16421 4.5 3.75C4.5 3.33579 4.16421 3 3.75 3C3.33579 3 3 3.33579 3 3.75C3 4.16421 3.33579 4.5 3.75 4.5ZM7 3.75C7 4.16421 6.66421 4.5 6.25 4.5C5.83579 4.5 5.5 4.16421 5.5 3.75C5.5 3.33579 5.83579 3 6.25 3C6.66421 3 7 3.33579 7 3.75ZM8.75 4.5C9.16421 4.5 9.5 4.16421 9.5 3.75C9.5 3.33579 9.16421 3 8.75 3C8.33579 3 8 3.33579 8 3.75C8 4.16421 8.33579 4.5 8.75 4.5ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z" fill="currentColor"/>',
      ),
      b = (0, g.withNewIcon)(
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.28497 1.5H13V12C13 12.5523 12.5523 13 12 13H6.28497L6.28497 1.5ZM5.03497 1.5H3V12C3 12.5523 3.44772 13 4 13H5.03497L5.03497 1.5ZM5.03497 14.5H4C2.61929 14.5 1.5 13.3807 1.5 12V1.5V0H3H13H14.5V1.5V12C14.5 13.3807 13.3807 14.5 12 14.5H6.28497V15V15.625H5.03497V15V14.5ZM8.505 3.375H9.13H10.13H10.755V4.625H10.13H9.13H8.505V3.375ZM9.13 6.375H8.505V7.625H9.13H10.13H10.755V6.375H10.13H9.13Z" fill="currentColor"/>',
      );
    var y = e.i(180367),
      j = e.i(223472);
    let C = [
        { id: "web", label: "Web", icon: v, angle: 0 },
        { id: "plan", label: "Plan", icon: b, angle: 60 },
        { id: "db", label: "DB", icon: f.Database, angle: 120 },
        { id: "api", label: "API", icon: x, angle: 180 },
        { id: "deploy", label: "Deploy", icon: y.LogoVercel, angle: 240 },
        { id: "llm", label: "LLM", icon: j.Sparkles, angle: 300 },
      ],
      w = (e, t) => {
        let n = ((e - 90) * Math.PI) / 180;
        return { x: Math.cos(n) * t, y: Math.sin(n) * t };
      };
    function k({ isHovered: e }) {
      let [r, s] = (0, n.useState)(!1),
        l = e ?? r;
      return (0, t.jsx)("div", {
        className:
          "w-full h-full flex items-center justify-center overflow-visible",
        onMouseEnter: () => s(!0),
        onMouseLeave: () => s(!1),
        children: (0, t.jsxs)("div", {
          className: "relative w-[280px] h-[200px] scale-120",
          children: [
            (0, t.jsx)("div", {
              className:
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full border-[1.5px] border-v0-gray-400 bg-v0-background-100 flex items-center justify-center z-10",
              children: (0, t.jsx)(a.LogoV0, {
                className: "text-v0-gray-1000",
                size: 24,
              }),
            }),
            (0, t.jsx)("svg", {
              className:
                "absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none",
              viewBox: "-100 -100 200 200",
              children: C.map((e) => {
                let n = w(e.angle, 75),
                  r = w(e.angle, 90);
                return (0, t.jsx)(
                  i.motion.line,
                  {
                    x1: "0",
                    y1: "0",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeDasharray: "4 4",
                    className: "text-v0-gray-600",
                    animate: {
                      x2: l ? r.x : n.x,
                      y2: l ? r.y : n.y,
                      opacity: l ? 0.8 : 0.6,
                    },
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  },
                  `line-${e.id}`,
                );
              }),
            }),
            C.map((e) => {
              let n = e.icon;
              return (0, t.jsx)(
                i.motion.div,
                {
                  className:
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  animate: {
                    x: l ? w(e.angle, 90).x : w(e.angle, 75).x,
                    y: l ? w(e.angle, 90).y : w(e.angle, 75).y,
                  },
                  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  children: (0, t.jsxs)("div", {
                    className:
                      "px-3 py-1.5 border border-v0-gray-300 bg-v0-background-100 rounded flex items-center justify-center gap-1.5 whitespace-nowrap",
                    children: [
                      (0, t.jsx)(n, {
                        className: "text-v0-gray-1000",
                        size: 12,
                      }),
                      (0, t.jsx)("span", {
                        className: "text-[10px] font-mono text-v0-gray-1000",
                        children: e.label,
                      }),
                    ],
                  }),
                },
                e.id,
              );
            }),
          ],
        }),
      });
    }
    function N({ isHovered: e }) {
      let { resolvedTheme: r } = (0, c.useTheme)(),
        [s, a] = (0, n.useState)(!1),
        l = e ?? s,
        o = "dark" === r;
      return (0, t.jsx)("div", {
        className:
          "w-full h-full flex items-start justify-center overflow-visible scale-110",
        children: (0, t.jsxs)(i.motion.div, {
          className: "relative w-[258px] h-[521px]",
          animate: { y: l ? -20 : 0, scale: l ? 1 : 0.94 },
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          onMouseEnter: () => a(!0),
          onMouseLeave: () => a(!1),
          children: [
            (0, t.jsx)(
              "img",
              {
                src: o
                  ? "/chat-static/assets/homepage/ios/iPhoneDark.png"
                  : "/chat-static/assets/homepage/ios/iPhoneLight.png",
                alt: "iPhone Frame",
                width: 257.77,
                height: 520.88,
                className: "absolute z-0",
              },
              o ? "dark-phone" : "light-phone",
            ),
            (0, t.jsx)("div", {
              className:
                "absolute left-1/2 -translate-x-1/2 top-[14px] w-[226.12px] h-[493px] overflow-hidden z-20",
              style: { isolation: "isolate", borderRadius: "35px" },
              children: (0, t.jsx)(
                "img",
                {
                  src: o
                    ? "/chat-static/assets/homepage/ios/ios-dark.png"
                    : "/chat-static/assets/homepage/ios/ios-light.png",
                  alt: "iOS App",
                  style: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                    mixBlendMode: "normal",
                  },
                },
                o ? "screenshot-dark" : "screenshot-light",
              ),
            }),
          ],
        }),
      });
    }
    function M() {
      let [e, r] = (0, n.useState)(null);
      return (0, t.jsx)("section", {
        className: "w-full pb-12 md:pb-20",
        children: (0, t.jsx)("div", {
          className: "mx-auto max-w-[1264px] px-4 md:px-6",
          children: (0, t.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: [
              (0, t.jsx)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col justify-center overflow-hidden",
                children: (0, t.jsxs)("div", {
                  className: "p-8",
                  children: [
                    (0, t.jsxs)("h3", {
                      className:
                        "text-heading-40 md:text-heading-48 text-v0-gray-1000 mb-4",
                      children: [
                        "Prompt.",
                        (0, t.jsx)("br", {}),
                        "Build. Publish.",
                      ],
                    }),
                    (0, t.jsx)("p", {
                      className: "text-base text-v0-gray-900 max-w-md",
                      children:
                        "Generate working applications in minutes with AI. Publish as live websites in seconds.",
                    }),
                  ],
                }),
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(1),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-2",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Sync with a repo",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Connect to GitHub and push code directly to your repository.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "flex items-center justify-center h-full",
                    children: (0, t.jsx)(o, { isHovered: 1 === e }),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(2),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Integrate with apps",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Build with your favorite tools and APIs. Automatic integration, no accounts required.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[280px] flex items-center justify-center",
                    children: (0, t.jsx)(s, { isHovered: 2 === e }),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(3),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Deploy to Vercel",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Go live instantly with one-click deployment to production in seconds.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[220px] flex items-center justify-center",
                    children: (0, t.jsx)(d, { isHovered: 3 === e }),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(4),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Edit with design mode",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Fine-tune every detail with visual controls and live preview.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[220px] flex items-center justify-center",
                    children: (0, t.jsx)(u, { isHovered: 4 === e }),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Start with templates",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Launch faster with ready-made components and full-page designs.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[220px] flex items-center justify-center",
                    children: (0, t.jsx)(p, {}),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Create design systems",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-md text-v0-gray-900",
                        children:
                          "Define colors, typography, and styles that you can use across projects.",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[280px] flex items-center justify-center",
                    children: (0, t.jsx)(m, {}),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(5),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Agentic by default",
                      }),
                      (0, t.jsxs)("p", {
                        className: "text-md text-v0-gray-900",
                        children: [
                          (0, t.jsx)("span", {
                            style: { fontFeatureSettings: '"ss09"' },
                            children: "v0",
                          }),
                          " plans, creates tasks, and connects to databases as it builds.",
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[280px] flex items-center justify-center",
                    children: (0, t.jsx)(k, { isHovered: 5 === e }),
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "rounded-2xl border border-v0-gray-200 bg-v0-white flex flex-col overflow-hidden",
                onMouseEnter: () => r(6),
                onMouseLeave: () => r(null),
                children: [
                  (0, t.jsxs)("div", {
                    className: "p-8 pb-4",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-heading-20 text-v0-gray-1000 mb-2",
                        children: "Create from your phone",
                      }),
                      (0, t.jsxs)("p", {
                        className: "text-md text-v0-gray-900",
                        children: [
                          "Build anywhere with the",
                          " ",
                          (0, t.jsx)("span", {
                            style: { fontFeatureSettings: '"ss09"' },
                            children: "v0",
                          }),
                          " iOS app. Design on the go.",
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "h-[280px] flex items-start justify-center pt-8",
                    children: (0, t.jsx)(N, { isHovered: 6 === e }),
                  }),
                ],
              }),
            ],
          }),
        }),
      });
    }
    e.s(["BenefitsSection", () => M], 696357);
  },
  917488,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(180261);
    let r = [
      {
        name: "Stripe",
        component: function ({ className: e }) {
          return (0, t.jsxs)("svg", {
            width: "200",
            height: "84",
            viewBox: "0 0 200 84",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: [
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M199.999 43.0011C199.999 28.7788 193.11 17.5566 179.944 17.5566C166.722 17.5566 158.722 28.7788 158.722 42.8899C158.722 59.6122 168.166 68.0566 181.722 68.0566C188.333 68.0566 193.333 66.5566 197.11 64.4455V53.3344C193.333 55.2233 188.999 56.3899 183.499 56.3899C178.11 56.3899 173.333 54.5011 172.722 47.9455H199.888C199.888 47.2233 199.999 44.3344 199.999 43.0011ZM172.555 37.7233C172.555 31.4455 176.388 28.8344 179.888 28.8344C183.277 28.8344 186.888 31.4455 186.888 37.7233H172.555Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M137.278 17.5565C131.833 17.5565 128.333 20.1121 126.389 21.8898L125.666 18.4454H113.444V83.2231L127.333 80.2787L127.389 64.5565C129.389 66.0009 132.333 68.0565 137.222 68.0565C147.166 68.0565 156.222 60.0565 156.222 42.4454C156.166 26.3343 147 17.5565 137.278 17.5565ZM133.944 55.8343C130.666 55.8343 128.722 54.6676 127.389 53.2232L127.333 32.6121C128.778 31.0009 130.778 29.8898 133.944 29.8898C139 29.8898 142.5 35.5565 142.5 42.8343C142.5 50.2787 139.055 55.8343 133.944 55.8343Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M94.333 14.2779L108.277 11.2779V0.00012207L94.333 2.94456V14.2779Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                d: "M108.277 18.5011H94.333V67.1122H108.277V18.5011Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M79.389 22.6112L78.5001 18.5001H66.5001V67.1111H80.389V34.1667C83.6667 29.8889 89.2223 30.6667 90.9445 31.2778V18.5001C89.1667 17.8334 82.6667 16.6112 79.389 22.6112Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M51.6111 6.44531L38.0555 9.3342L38 53.8342C38 62.0564 44.1666 68.1119 52.3889 68.1119C56.9444 68.1119 60.2777 67.2786 62.1111 66.2786V55.0008C60.3333 55.7231 51.5555 58.2786 51.5555 50.0564V30.3342H62.1111V18.5009H51.5555L51.6111 6.44531Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M14.0555 32.6122C14.0555 30.4455 15.8333 29.6122 18.7778 29.6122C23 29.6122 28.3333 30.89 32.5555 33.1677V20.1122C27.9444 18.2789 23.3889 17.5566 18.7778 17.5566C7.5 17.5566 0 23.4455 0 33.2788C0 48.6122 21.1111 46.1677 21.1111 52.7788C21.1111 55.3344 18.8889 56.1677 15.7778 56.1677C11.1667 56.1677 5.27777 54.2788 0.61111 51.7233V64.9455C5.77777 67.1677 11 68.1122 15.7778 68.1122C27.3333 68.1122 35.2778 62.3899 35.2778 52.4455C35.2222 35.8899 14.0555 38.8344 14.0555 32.6122Z",
                fill: "currentColor",
              }),
            ],
          });
        },
        scale: 0.92,
      },
      {
        name: "Pinterest",
        component: function ({ className: e }) {
          return (0, t.jsx)("svg", {
            width: "121",
            height: "120",
            viewBox: "0 0 121 120",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: (0, t.jsx)("path", {
              d: "M37.7256 115.726C36.9768 108.9 37.5 102.377 39 96.0768L45 70.2024C44.0256 67.0536 43.2744 63.4512 43.2744 59.8512C43.2744 51.4512 47.3256 45.4512 53.7 45.4512C58.1256 45.4512 61.3512 48.5256 61.3512 54.4512C61.3512 56.3256 60.9768 58.4256 60.2256 60.8256L57.6 69.4512C57.0744 71.1024 56.8512 72.6768 56.8512 74.0256C56.8512 80.0256 61.4256 83.4 67.2768 83.4C77.7024 83.4 85.128 72.6 85.128 58.5744C85.128 42.9744 74.928 33 59.8536 33C43.0536 33 32.4048 43.9512 32.4048 59.1744C32.4048 65.3232 34.2792 71.0232 37.956 74.9232C36.756 76.9488 35.4816 77.3232 33.5304 77.3232C27.5304 77.3232 21.8304 68.8488 21.8304 57.2976C21.8304 37.3464 37.8048 21.4488 60.2304 21.4488C83.7792 21.4488 98.556 37.8744 98.556 58.1232C98.556 78.372 84.156 93.8232 68.6304 93.8232C62.4792 93.8232 57.0792 91.1976 53.3304 86.472L50.256 98.9232C48.6048 105.372 46.1304 111.449 42.156 117.298C47.7816 119.023 53.3304 119.998 60.0072 119.998C93.156 119.998 120.007 93.1464 120.007 59.9976C120.007 26.8488 93.1512 0 60 0C26.8488 0 0 26.8512 0 60C0 85.1256 15.4512 106.8 37.7256 115.726Z",
              fill: "currentColor",
            }),
          });
        },
      },
      {
        name: "Brex",
        component: function ({ className: e }) {
          return (0, t.jsx)("svg", {
            width: "280",
            height: "74",
            viewBox: "0 0 280 74",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: (0, t.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M177.114 20.6895C180.669 16.9945 184.5 15.2242 189.468 15.2242C191.321 15.2242 193.789 15.4705 196.63 15.9609L189.343 25.5378C188.726 25.4158 187.861 25.2938 186.873 25.2938C181.438 25.2938 177.856 29.0993 177.856 35.1148V61.3917H167.358V16.0852H177.114V20.6895ZM267.895 16.0852H280L262.807 38.9502L280 61.3917H267.525L256.656 47.0584L245.788 61.3917H233.437L250.514 38.9134L233.437 16.0829H245.541L256.718 30.8627L267.895 16.0852ZM58.6831 7.03676C58.9495 6.67771 59.232 6.29695 59.5338 5.89353H59.5315C62.2504 2.21007 66.6958 0 71.2656 0H91.6466V61.3917H39.8941C36.8187 61.3917 36.0205 62.4776 33.5108 65.8923C33.0972 66.455 32.6372 67.0809 32.1128 67.7755C29.2719 71.459 24.8265 73.6691 20.2567 73.6691H0V12.2774H51.6282C54.7947 12.2774 55.7874 10.9395 58.6831 7.03676ZM53.9741 45.5528H75.5891V16.0852H57.4319C54.2426 16.0852 53.2006 17.4338 49.8705 21.7441C49.7199 21.939 49.5647 22.1399 49.4043 22.347C46.5635 26.0305 42.24 28.2406 37.5482 28.2406H15.9332V57.7082H34.2124C37.3449 57.7082 38.248 56.499 41.1458 52.619C41.4468 52.216 41.7693 51.7842 42.118 51.322C44.9589 47.5165 49.28 45.5528 53.9741 45.5528ZM160.935 17.3122C160.935 23.3278 157.725 27.8722 153.153 30.4506C159.825 33.6414 162.417 38.5542 162.417 44.2014C162.417 53.7784 155.007 61.3917 144.262 61.3917H114.62V0H144.262C154.143 0 160.935 8.47194 160.935 17.3122ZM143.397 9.57698H125.118V25.5378H142.78C146.608 25.5378 150.683 22.347 150.683 17.6806C150.683 13.8751 147.967 9.57698 143.397 9.57698ZM125.118 51.8147H142.78C147.103 51.8147 151.919 48.0069 151.919 43.3427C151.919 39.1666 148.091 35.1148 143.397 35.1148H125.118V51.8147ZM214.167 52.6717C217.874 52.6717 221.21 51.0763 222.939 48.3736H234.178C231.832 57.7065 223.68 62.2487 214.416 62.2487C201.199 62.2487 192.679 53.0401 192.679 38.7966C192.679 24.1871 201.57 15.2225 214.17 15.2225C227.013 15.2225 235.536 24.6775 235.536 38.4283C235.536 40.026 235.414 40.8847 234.919 42.7264H203.548C203.548 48.7419 208.366 52.6717 214.167 52.6717ZM224.297 34.0081C224.421 28.4829 219.973 24.7995 214.167 24.7995C208.366 24.7995 203.67 28.6072 203.67 34.0081H224.297Z",
              fill: "currentColor",
            }),
          });
        },
        scale: 0.8,
      },
      {
        name: "Klaviyo",
        component: function ({ className: e }) {
          return (0, t.jsxs)("svg", {
            width: "111",
            height: "34",
            viewBox: "0 0 111 34",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: [
              (0, t.jsx)("path", {
                d: "M63.0274 7.49918C63.6196 7.49918 64.1928 7.26992 64.6131 6.86872C65.0334 6.46751 65.2818 5.89436 65.3009 5.32121C65.3009 4.72896 65.0525 4.15581 64.6322 3.7355C64.2119 3.31519 63.6387 3.06682 63.0465 3.06682C62.4542 3.08593 61.9002 3.31519 61.4799 3.7546C61.0596 4.17491 60.8303 4.74806 60.8494 5.32121C60.8494 5.89436 61.0787 6.44841 61.499 6.86872C61.9002 7.25082 62.4542 7.48008 63.0274 7.49918ZM78.426 9.60073H83.89V10.0401C83.5843 10.0975 83.2978 10.193 83.0303 10.3458C82.5336 10.5751 81.5401 11.7023 80.7568 13.5937C79.4577 16.8606 78.1012 20.7389 76.6683 25.1713L76.1334 26.8525C75.9041 27.6167 75.694 28.1135 75.5985 28.4C75.5029 28.7057 75.3692 29.1642 75.1399 29.7183C75.0062 30.1386 74.8343 30.5589 74.6241 30.941C74.3566 31.4377 73.8599 32.4503 73.4587 32.756C72.8282 33.2909 71.8921 33.8832 70.7267 33.7876C68.4532 33.7876 66.7528 32.1064 66.7337 30.1195C66.7337 28.763 67.5935 27.8651 68.8926 27.8651C69.8287 27.8651 70.6503 28.3618 70.6503 29.4126C70.6503 30.1768 69.8861 30.9601 69.8861 31.3613C69.8861 32.393 70.4783 32.8706 71.6437 32.8706C72.5799 32.8706 73.3441 32.2784 73.9172 31.0938C74.6814 29.7374 74.7578 28.2472 74.1083 26.5851L69.3129 13.9758C68.2048 11.0718 67.3833 10.1166 66.3516 10.0019V9.56252H73.9172V10.0019C73.0193 10.0975 72.5608 10.6324 72.5608 11.5876C72.5608 12.2754 72.8282 13.3453 73.325 14.7018L74.2229 17.1472C75.2546 19.8028 76.0952 22.1145 76.5155 23.5665C77.4898 20.5479 78.3878 17.9114 79.2475 15.5997C79.878 13.8802 80.1837 12.6575 80.1837 11.9315C80.1837 10.6324 79.4768 10.0401 78.426 10.0401V9.60073ZM25.8299 25.7062C24.8556 25.5343 24.0341 24.6746 24.0341 22.8596V0.927063L18.5318 2.11157V2.57009C19.468 2.47457 20.4041 3.29608 20.4041 5.05374V22.8596C20.4041 24.579 19.468 25.5725 18.5318 25.7062C18.4363 25.7253 18.3599 25.7253 18.2644 25.7444C17.7867 25.7827 17.3091 25.6871 16.8697 25.4961C16.1246 25.1713 15.5133 24.5981 14.9974 23.7575L12.4565 19.7264C11.9215 18.8667 11.1191 18.2171 10.183 17.8541C9.24682 17.4911 8.21515 17.4338 7.24079 17.7012L10.1065 14.5489C12.2654 12.1608 14.2714 10.6515 16.1628 10.021V9.58162H9.85818V10.021C11.4821 10.6515 11.3866 12.0462 9.51429 14.2241L5.50224 18.8858V0.927063L0 2.11157V2.57009C0.936145 2.57009 1.87229 3.48713 1.87229 5.11106V22.8405C1.87229 24.8083 0.95525 25.5725 0 25.7062V26.1457H7.29811V25.7062C6.09449 25.5343 5.50224 24.6173 5.50224 22.8596V19.5926L7.06885 17.8732L10.8516 24.0632C11.7496 25.5534 12.5902 26.1457 13.9084 26.1457H26.5941V25.8018C26.6133 25.8018 26.2503 25.7827 25.8299 25.7062ZM40.9611 23.6238V16.2111C40.8847 11.3775 38.8404 9.16131 34.1597 9.16131C32.6695 9.14221 31.2176 9.63894 30.033 10.556C28.7912 11.4921 28.199 12.5429 28.199 13.7656C28.199 14.9501 28.8676 15.8481 29.9566 15.8481C31.122 15.8481 31.9627 15.1794 31.9627 14.2623C31.9627 13.5746 31.5041 12.6002 31.5041 11.9506C31.5041 10.7661 32.4021 9.73446 33.9687 9.73446C35.9747 9.73446 37.4076 11.2247 37.4076 14.5298V16.5167L35.7454 16.9179C34.8857 17.0899 34.1406 17.2618 33.5866 17.4147C33.0134 17.5866 32.2874 17.8159 31.4277 18.1407C29.6892 18.8093 28.7721 19.4398 27.9697 20.6243C27.5685 21.1975 27.3775 21.8852 27.3775 22.573C27.3775 25.3241 29.3071 26.5851 32.0009 26.5851C34.1406 26.5851 36.395 25.4579 37.4267 23.3372C37.4458 24.0059 37.5986 24.6555 37.9043 25.2668C39.0315 27.5403 42.7761 26.203 42.7761 26.203V25.7636C41.0948 26.0119 40.9611 24.0823 40.9611 23.6238ZM37.4076 21.3312C37.4076 22.4202 37.0064 23.3181 36.204 23.9486C35.4398 24.579 34.6373 24.9038 33.7967 24.9038C32.1728 24.9038 31.1029 23.8531 31.1029 21.8852C31.1029 20.9682 31.6188 20.1085 32.0391 19.6117C32.383 19.2679 32.7651 18.9813 33.2045 18.7902C33.7776 18.4846 34.0451 18.3317 34.4463 18.1598L35.9747 17.6057C36.7389 17.3 37.1974 17.1472 37.4076 17.0517V21.3312ZM111 9.60073H98.0468V0.927063H111L108.287 5.2639L111 9.60073ZM84.6542 24.025C83.0494 22.382 82.1515 20.1658 82.1897 17.8541C82.1706 16.7269 82.3807 15.5997 82.801 14.5489C83.2213 13.4981 83.8518 12.5429 84.6542 11.7214C86.2972 10.0019 88.2842 9.14221 90.6341 9.14221C92.9267 9.14221 94.9327 10.0019 96.5757 11.7214C97.3781 12.5238 98.0277 13.479 98.448 14.5298C98.8874 15.5806 99.0976 16.7078 99.0785 17.8541C99.0976 19.0004 98.8874 20.1276 98.448 21.1784C98.0086 22.2291 97.3781 23.2035 96.5757 24.0059C94.9327 25.6871 92.9458 26.566 90.6341 26.566C88.3033 26.5851 86.2972 25.7253 84.6542 24.025ZM93.6336 12.008C92.984 10.7279 92.1052 9.98283 91.0926 9.77267C89.0293 9.35236 87.2143 11.473 86.5265 14.8164C86.2399 16.3257 86.1635 17.8541 86.3164 19.3634C86.4692 20.8918 86.8895 22.3629 87.5773 23.7384C88.246 25.0185 89.1057 25.7636 90.1182 25.9737C92.1816 26.394 94.0539 24.1969 94.7417 20.8154C95.3148 17.9878 95.0282 14.5489 93.6336 12.008Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                d: "M64.957 22.8596V9.60073H53.2265V10.0019C54.7931 10.2312 55.5382 11.4157 54.8313 13.3071C51.1632 23.2035 51.3924 22.7641 51.1632 23.5474C50.9339 22.7832 50.399 20.9109 49.5393 18.561C48.6795 16.2111 48.1064 14.6635 47.8771 13.9567C46.9792 11.2055 47.2849 10.193 48.7368 10.021V9.58162H41.1331V10.021C42.2603 10.2503 43.2728 11.5494 44.0943 13.8611L45.2597 16.8797C46.5398 20.1276 48.0491 24.6172 48.5458 26.1456H51.0677C51.8892 23.7957 55.137 14.3961 55.5764 13.4408C56.0541 12.3518 56.589 11.5303 57.1812 10.9572C57.4678 10.6515 57.8117 10.4031 58.2129 10.2503C58.595 10.0975 59.0153 10.0019 59.4356 10.021C59.4356 10.021 61.2697 10.021 61.2697 11.7787V22.8787C61.2697 24.7319 60.3718 25.5916 59.4356 25.7253V26.1648H66.6955V25.7253C65.7594 25.5725 64.957 24.7128 64.957 22.8596Z",
                fill: "currentColor",
              }),
            ],
          });
        },
      },
      {
        name: "Mercado Libre",
        component: function ({ className: e }) {
          return (0, t.jsxs)("svg", {
            width: "148",
            height: "40",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: [
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M28.333.906c7.748 0 14.796 2.089 19.927 5.503C53.385 9.82 56.666 14.612 56.666 20s-3.281 10.179-8.406 13.59c-5.13 3.414-12.178 5.504-19.927 5.504-7.748 0-14.796-2.09-19.927-5.504C3.281 30.179 0 25.388 0 20S3.28 9.82 8.406 6.41C13.536 2.994 20.584.905 28.333.905ZM1.537 18.326c-.08.552-.121 1.11-.121 1.674 0 4.766 2.903 9.167 7.775 12.41 4.868 3.24 11.634 5.267 19.142 5.267 7.508 0 14.274-2.027 19.142-5.267 4.872-3.243 7.775-7.644 7.775-12.41 0-.36-.019-.718-.052-1.073a33.29 33.29 0 0 0-10.488 3.297c.328.504.395 1.086.3 1.62-.113.635-.45 1.237-.89 1.7-.438.462-1.029.84-1.695.947a2.255 2.255 0 0 1-.906-.037 3.434 3.434 0 0 1-.864 1.581c-.438.462-1.03.84-1.696.947a2.251 2.251 0 0 1-.905-.037 3.431 3.431 0 0 1-.864 1.583c-.438.462-1.03.84-1.696.948a2.232 2.232 0 0 1-1.64-.371 3.98 3.98 0 0 1-2.551 1.103 3.98 3.98 0 0 1-2.62-.814 3.44 3.44 0 0 1-4.747.04 3.454 3.454 0 0 1-.726-.966c-.572.183-1.229.276-1.846.078a2.128 2.128 0 0 1-1.191-.966 3.2 3.2 0 0 1-.358-.928c-1.042.297-2.016.305-2.775-.181-.726-.465-1.073-1.255-1.158-2.207a2.602 2.602 0 0 1-1.031.068c-.674-.097-1.196-.473-1.548-.95-.612-.83-.778-2.043-.425-3.026a25.224 25.224 0 0 0-11.34-4.03ZM15.7 21.752a1.355 1.355 0 0 0-1.231.557.706.706 0 0 1-.096.21c-.017.024-.039.044-.059.066l-.016.041a.76.76 0 0 1-.028.066c-.266.54-.19 1.355.173 1.848.166.225.371.355.61.39.248.035.632-.017 1.17-.352a.71.71 0 0 1 1.08.667c-.121 1.299.192 1.834.502 2.032.348.223 1.067.284 2.326-.233a.71.71 0 0 1 .976.62c.032.603.154.973.284 1.19.12.202.26.296.407.343.354.114.908.004 1.51-.29a.71.71 0 0 1 1.002.472 2.038 2.038 0 0 0 3.709.61l.037-.055c.08-.106.19-.366.222-.742a2.241 2.241 0 0 0-.162-1.079 1.44 1.44 0 0 0-.735-.753c-.372-.17-.946-.264-1.815-.107a.709.709 0 0 1-.753-1.027c.368-.698.328-1.503.015-1.918-.139-.185-.357-.334-.72-.372-.383-.039-.956.047-1.753.416a.709.709 0 0 1-1.002-.566 1.689 1.689 0 0 0-1.33-1.468 1.688 1.688 0 0 0-1.808.81.708.708 0 0 1-1.314-.241 1.354 1.354 0 0 0-1.2-1.135ZM7.752 8.626c-3.023 2.356-5.097 5.206-5.929 8.305a26.644 26.644 0 0 1 11.785 4.21 2.77 2.77 0 0 1 4.206.347 3.104 3.104 0 0 1 2.497-.556 3.105 3.105 0 0 1 2.22 1.828c.63-.208 1.206-.285 1.721-.233.739.076 1.32.416 1.706.928.491.652.614 1.503.482 2.302.58.006 1.091.114 1.53.316a2.857 2.857 0 0 1 1.441 1.468c.259.586.326 1.22.277 1.774-.026.31-.094.624-.202.909a2.557 2.557 0 0 0 3.33-.085 122.63 122.63 0 0 0-1.41-1.374c-.25-.238-.444-.42-.576-.544l-.15-.14a8.518 8.518 0 0 0-.038-.035l-.012-.012a.709.709 0 0 1 .959-1.043v.002l.004.002.01.01.04.037.155.144c.135.127.334.314.586.554.466.446 1.118 1.078 1.902 1.86l.02.02.174.171c.27.271.537.326.79.285.286-.046.61-.226.892-.522.28-.296.466-.653.523-.972.054-.305-.012-.535-.174-.706l-.014-.018a214.448 214.448 0 0 0-2.871-2.794l-.241-.229-.064-.06-.016-.016-.005-.005a.708.708 0 0 1 .974-1.027l.023.021.064.06.244.232.853.82c.7.675 1.617 1.568 2.487 2.439.271.27.537.325.79.285.286-.046.61-.227.892-.523.28-.296.466-.654.522-.972.054-.301-.01-.528-.168-.698-.799-.779-1.78-1.689-2.614-2.45-.493-.45-.933-.846-1.25-1.13l-.373-.332-.1-.09-.026-.024-.007-.005v-.002a.708.708 0 0 1 .939-1.06l.009.009.026.023.102.09.377.337c.318.285.76.685 1.257 1.137.845.77 1.852 1.706 2.676 2.508l.005.004.004.004c.14.137.276.269.404.397.27.27.537.326.79.286.286-.046.61-.227.892-.524.28-.295.467-.653.523-.971.054-.305-.011-.536-.174-.706a120.139 120.139 0 0 0-6.123-5.843c-1.488-1.316-3.029-2.59-4.378-3.53-.676-.47-1.29-.846-1.814-1.102-.542-.265-.917-.364-1.137-.364-1.305 0-2.869.806-4.312 1.782-.703.475-1.343.965-1.872 1.373-.262.201-.503.387-.706.536-.192.14-.394.281-.568.366a3.759 3.759 0 0 1-2.776.207c-.784-.257-1.602-.888-1.603-1.893 0-.218.072-.415.135-.556.069-.153.161-.312.265-.47a9.62 9.62 0 0 1 .84-1.061c.398-.446.884-.938 1.428-1.44a33.025 33.025 0 0 1-3.645.454.714.714 0 0 1-.135-.003 30.228 30.228 0 0 1-9.264-2.706c-.008-.005-.016-.012-.024-.016Zm21.293-.809c-.774 0-1.761.325-2.856.904-1.079.57-2.194 1.35-3.207 2.175-1.011.823-1.902 1.677-2.534 2.384-.317.355-.557.661-.714.899a2.017 2.017 0 0 0-.154.267l-.008.017c.023.128.158.355.625.509.484.159 1.133.149 1.712-.134a3.13 3.13 0 0 0 .353-.236c.186-.136.411-.31.678-.516a38.702 38.702 0 0 1 1.943-1.425c1.45-.98 3.332-2.025 5.106-2.025.55 0 1.163.217 1.759.509.614.3 1.294.72 2.001 1.212 1.415.986 3.003 2.3 4.508 3.63 2.25 1.99 4.347 4.045 5.456 5.16a34.702 34.702 0 0 1 11.271-3.62c-.68-3.168-2.651-6.098-5.613-8.534a12.913 12.913 0 0 1-7.272 1.939c-2.505 0-4.823-.825-6.952-1.599-2.177-.79-4.134-1.516-6.102-1.516Zm-.712-5.495c-7.508 0-14.274 2.027-19.142 5.267l-.125.085a28.81 28.81 0 0 0 8.08 2.258 31.624 31.624 0 0 0 6.113-1.035 19.402 19.402 0 0 1 2.27-1.428c1.169-.618 2.4-1.068 3.516-1.068 2.267 0 4.474.833 6.585 1.6 2.157.784 4.25 1.515 6.469 1.515h.026c2.113.08 4.2-.428 6.034-1.453-.224-.16-.451-.32-.684-.474-4.868-3.24-11.634-5.267-19.142-5.267ZM74.11 22.69c0-2.47 3-2.17 3-2.17v5.42a3.6 3.6 0 0 1 3.08-1.73 4.33 4.33 0 0 1 3.58 1.69 7.3 7.3 0 0 1 1.33 4.6 6.25 6.25 0 0 1-1.35 4.15c-.9 1.09-2.66 1.56-4.24 1.56-5.44 0-5.4-4.725-5.4-4.76v-8.76Zm5.41 4.13c-.55-.01-1.08.19-1.49.54a3.778 3.778 0 0 0-1.05 3 4.22 4.22 0 0 0 .66 2.45 2.153 2.153 0 0 0 1.9.9 2.09 2.09 0 0 0 1.87-.9c.44-.77.66-1.65.61-2.54a4.55 4.55 0 0 0-.6-2.45 2.04 2.04 0 0 0-1.9-1ZM98.38 24.2c.9-.017 1.794.16 2.62.52a4.57 4.57 0 0 1 1.92 1.69c.473.702.781 1.502.9 2.34.09.75.12 1.5.1 2.25h-8.14a2.7 2.7 0 0 0 1.17 2.37c.46.3 1.01.43 1.56.4.59.04 1.17-.13 1.67-.48.155-.129.29-.28.4-.45h.01l3.09-.02c-.19.65-.55 1.24-1.03 1.72a5.35 5.35 0 0 1-4.16 1.65 6.031 6.031 0 0 1-3.94-1.39c-1.14-.91-1.7-2.42-1.7-4.52a6.184 6.184 0 0 1 1.53-4.52 5.372 5.372 0 0 1 4-1.56Zm.03 2.45a2.31 2.31 0 0 0-1.78.66h.01a3.102 3.102 0 0 0-.74 1.76h5.01a2.48 2.48 0 0 0-.77-1.8 2.5 2.5 0 0 0-1.73-.62Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                d: "M71.9 35.95h-3V24.51h3v11.44ZM92.27 24.2v.01l.25.02v3h-.85a2.46 2.46 0 0 0-2.39 1.18 4.72 4.72 0 0 0-.34 2.04v5.5h-2.97v-5.87s-.39-5.88 6.15-5.88h.15ZM66.64 20.55v15.37h-2.8V22.68c0-2.263 2.76-2.132 2.8-2.13ZM71.88 20.5v3h-2.97v-3h2.97Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M117.94 6.58a7.161 7.161 0 0 1 3.32.75 2.904 2.904 0 0 1 1.44 2.8v4.39c-.06.78.02 4.52-6.429 4.22a3.92 3.92 0 0 1-2.571-.9 3.22 3.22 0 0 1-1-2.52 3.254 3.254 0 0 1 1.62-3.06c.82-.41 1.711-.66 2.62-.73l1.01-.13c.4-.04.8-.13 1.18-.26a.9.9 0 0 0 .47-.34c.12-.17.18-.37.18-.57a1.002 1.002 0 0 0-.5-.961c-.44-.21-.94-.299-1.44-.269a1.882 1.882 0 0 0-1.5.52c-.22.31-.37.67-.42 1.06h-2.85c.02-.891.31-1.756.83-2.48.79-1.02 2.141-1.52 4.04-1.52Zm1.79 6.17a3.968 3.968 0 0 1-1.38.49l-.66.13c-.48.06-.94.2-1.36.42a1.378 1.378 0 0 0-.7 1.26 1.315 1.315 0 0 0 .42 1.11 1.6 1.6 0 0 0 1.04.35c.64 0 1.26-.2 1.78-.57a2.443 2.443 0 0 0 .89-2.07l-.03-1.12Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                d: "M106.45 6.66a6.43 6.43 0 0 1 3.67.96 4.5 4.5 0 0 1 1.68 3.42h-3.18c-.06-.43-.21-.84-.46-1.19a1.904 1.904 0 0 0-1.62-.7c-.46-.02-.92.12-1.3.4-.38.26-.67.65-.82 1.1-.22.68-.32 1.4-.3 2.11a5.486 5.486 0 0 0 .3 2.02 2.048 2.048 0 0 0 2.101 1.44 1.924 1.924 0 0 0 1.549-.56c.328-.427.523-.943.56-1.48h3.17a5.042 5.042 0 0 1-5.36 4.55 5.22 5.22 0 0 1-4.22-1.64 6.484 6.484 0 0 1-1.36-4.24 6.517 6.517 0 0 1 1.46-4.55 5.289 5.289 0 0 1 4.13-1.64Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M86.83 6.62a6.26 6.26 0 0 1 2.67.54c.8.364 1.477.95 1.95 1.69.47.71.77 1.517.88 2.36.1.76.13 1.51.1 2.26h-8.2a2.701 2.701 0 0 0 1.2 2.4c.48.28 1.02.41 1.58.38.58.05 1.16-.11 1.66-.45.15-.13.29-.29.4-.46l3.13-.04c-.19.66-.55 1.26-1.03 1.74a5.419 5.419 0 0 1-4.24 1.67 6.08 6.08 0 0 1-3.97-1.41c-1.15-.96-1.72-2.46-1.72-4.57a6.223 6.223 0 0 1 1.55-4.52 5.373 5.373 0 0 1 4.04-1.59Zm.03 2.47a2.353 2.353 0 0 0-1.78.65c-.43.49-.68 1.11-.73 1.76h5.08a2.529 2.529 0 0 0-.78-1.8c-.5-.42-1.14-.64-1.79-.61ZM131.61 5.11c0-2.42 2.991-2.1 2.991-2.1l-.031 10.93c.001.052.03 4.74-5.4 4.74-1.56 0-3.34-.47-4.24-1.54A6.304 6.304 0 0 1 123.6 13a7.444 7.444 0 0 1 1.33-4.67 4.27 4.27 0 0 1 3.57-1.7 3.698 3.698 0 0 1 3.11 1.7V5.11Zm-2.46 4.12a2.077 2.077 0 0 0-1.9 1c-.42.75-.63 1.6-.61 2.46-.04.92.18 1.82.62 2.62a2.053 2.053 0 0 0 1.87.9 2.2 2.2 0 0 0 1.9-.9l.01-.01c.46-.73.69-1.59.65-2.45a3.941 3.941 0 0 0-1.04-3.08 2.34 2.34 0 0 0-1.5-.54ZM141.245 6.521a6.104 6.104 0 0 1 4.335 1.81 6.77 6.77 0 0 1 1.43 4.28 6.724 6.724 0 0 1-1.43 4.3 6.199 6.199 0 0 1-8.67 0 6.736 6.736 0 0 1-1.43-4.3 6.764 6.764 0 0 1 1.43-4.28 6.096 6.096 0 0 1 4.335-1.81Zm1.075 2.76a2.63 2.63 0 0 0-3.08.679c-.5.78-.75 1.71-.7 2.65a4.363 4.363 0 0 0 .7 2.65 2.583 2.583 0 0 0 3.087.683c.344-.16.648-.393.893-.683v.02c.51-.79.76-1.73.7-2.67.05-.94-.2-1.87-.7-2.65-.25-.28-.55-.52-.9-.68Z",
                fill: "currentColor",
              }),
              (0, t.jsx)("path", {
                d: "M68.63 6.58a4.101 4.101 0 0 1 3.36 1.6 4.333 4.333 0 0 1 3.37-1.6c2.96 0 4.7 2.08 4.7 5.02v6.86h-2.67v-6.93a1.95 1.95 0 0 0-1.2-2c-.25-.1-.53-.14-.8-.13a1.97 1.97 0 0 0-1.49.61 2.032 2.032 0 0 0-.56 1.52v6.93h-2.8v-6.93a1.931 1.931 0 0 0-1.16-2c-.25-.1-.53-.14-.8-.13a1.96 1.96 0 0 0-1.936 1.307 2.01 2.01 0 0 0-.114.823v6.93h-2.68V11.6a4.78 4.78 0 0 1 2.88-4.67 4.6 4.6 0 0 1 1.9-.35ZM100.09 6.64h.26v3h-.83a2.442 2.442 0 0 0-2.4 1.17c-.26.64-.38 1.34-.34 2.04v5.61h-2.97v-5.97s-.39-5.855 6.15-5.86l.13.01Z",
                fill: "currentColor",
              }),
            ],
          });
        },
      },
      {
        name: "Vanta",
        component: function ({ className: e }) {
          return (0, t.jsxs)("svg", {
            viewBox: "0 0 2400 935",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: e,
            children: [
              (0, t.jsxs)("g", {
                children: [
                  (0, t.jsx)("path", {
                    d: "M320.97,934.78c185.94,0,282.08-57.59,311.1-115.34,1.67-3.33-1.53-7.1-5.06-5.93-32.73,10.82-57.16-9.28-59.9-32.48,0,0-9.15-98.38-41.88-107.98,1.94-3.99,9.83-35.43-14.56-64.48,6.67-20.55,1.16-34.08-3.83-44.31,6.08-7.45,10.75-17.06,12.77-26.42,.5-2.22,.49-4.18,2.29-6.27,11.5-9.55,24.19-17.43,31.91-31.41,13.91-25.26,4.59-54.11-12.27-75.4-1.71-2.35-3.05-3.48-3.17-9.52,.04-10.32-1.83-20.94-7.38-29.66-2.83-4.43-6.54-8.26-10.43-11.81-16.2-15.1-35.58-26.25-54.19-38.29-2.56-1.64-5.54-3.82-6.65-6.8-5.86-21.8-21.01-38.66-39.85-43.25-.4-14.6-15.8-36.74-39.1-36.74-7.11,0-12.99,3.86-16.66-2.79-8.52-16.15-25.5-19.15-34.36-19.56-1.49-.07-1.91-2.07-.56-2.71,2.84-1.36,7.14-3.24,13.52-5.7,32-15.31,18.76-102.52,5.66-148.54C342.24,52.21,326.7,3.35,288.63,.12c-2.62-.22-5.3-.16-7.83,.57-7.33,2.11-12.76,7.98-16.58,16.11-12.59,25.3-15.74,93.59-20.37,122.79-6.57,41.64-12.52,86.31-33.27,104.62-8.84-23.31-21.63-34.11-28.62-33.7-6.09,1.43,2.15,13.26-1.36,30.71-2.44,10.04-8,19.41-17.47,19.41-27.75,0-52.74-138.73-60.2-222.07-.2-2.18-.41-4.35-.81-6.51C98.46,11.91,87.86,.02,76.66,.02,70.98,.02,50.59-2.05,27.24,34.65,11.19,63.27,.99,93.19,0,148.91c.02,56.15,25.08,93.7,35.23,112.17,41.48,68.19,47.02,91.73,39.17,133.3-7.98,40.3,16.36,62.96,16.36,62.96-3.44,5.33-7.98,19.61-9.03,35.28-.67,9.98,1.37,27.88,6.14,38.96-10.47,22.55-10.22,40.47-10.22,51.77,0,26.18-11.43,36.84-26.29,41.5,4.01,14.28,30.66,21.93,46.08,6.67-4.55,44.85-12.96,85.25-24.7,135.25-7.3,34.23-6.07,53.41-.54,69.65,2.49,7.32,6.39,14.06,11.16,20.14,56.87,72.51,163.58,78.22,237.61,78.22Zm-.09-97.87c-20.49-3.33-39.66-13.54-53.65-29-37.28,12.34-76.04-19.02-64.26-60.42,1.88-5.42,9.96-3.43,9.16,2.22-1.16,7.29,.18,14.75,3.31,21.17,8.33,19.03,33.16,24.15,48.38,10.89,5.63-4.96,13.77-3.07,17.59,3.08,33.33,45.21,102.48,36.73,125.67-14.02,3.4-7.09,5.62-14.6,6.91-22.38,.91-5.52,9.19-5,9.42,.58,1.87,54.62-49.28,96.42-102.54,87.89Z",
                    fill: "currentColor",
                  }),
                  (0, t.jsxs)("g", {
                    className: "[fill:var(--color-v0-background-100)]",
                    children: [
                      (0, t.jsx)("path", {
                        d: "M529.96,446.9c-3.56,0-7.39,4.97-8.37,12.71-2.12,10.91-1.39,31.08-11.12,31.08-6.73,0-7.34-13.52-18.65-25.98-11.73-12.09-28.55-13.32-39.34-22.02-6-4.16-9.57-9.28-9.18-18.07,0,0,1.28-14,20.18-11.44,8.99,.94,23.56,3.13,32.58,4.16,16.11,1.82,20.04-10.16,20.52-14.23,1.03-9.54-9.1-17.44-15.51-23-8.1-7.05-16.93-13.38-26.08-19.06-1.66-1.03-3.35-2.1-5.04-3.18-22.95-14.63-63.75-39.12-86.63-11.16-8.2,10.98-11.76,23.63-14.33,34.11-4.75,19.18-14.72,26.58-21.8,38.28-11.25,18.57-18.98,39.66-19.57,61.36-.1,31.33,19.28,62.02,50.2,81.2,25.66,13.46,38.83,13.46,49.11,10.71,1.88-.64,6-3.51,3.17-8.26-.51-1.01-1.94-3.23-2.81-4.67-2.93-5.39,1.08-10.32,7.02-5.71,3.91,3.06,7.9,6.12,12.5,7.99,3.87,1.57,8.28,2.19,12.28,1.13,0,0,0,0,.01,0,4.68-1.53,7.05-4.6,7.32-8.52,.27-4.68-1.85-8.3-5.36-10.23-5.34-2.6-17.16-9.1-22.15-12.78-5.63-3.94-11.65-9.83-13.74-12.05-6.81-7.24-8.76-14.31-13-14.31-.71,.04-1.4,.44-1.88,.98-2.66,2.84-2.68,7.52-2.81,10.19-.09,1.97,.22,4.97-2.54,4.97-6.84,0-6.82-14.26-6.81-18.13,0-5.3,1.94-19.05,10.13-19.05,2.53,0,5.97,3.39,7.32,4.72,18.05,20.03,39.03,35.61,65.61,35.61,20.35,0,37.35-11.49,48.04-22.26,8.37-8.4,13.88-18.92,14.25-29.79,.23-6.89-3.08-25.29-13.52-25.29Zm-116.6,18.64c-2.47,1.37-5.42-.33-8.11-1.21-5.41-1.78-11.55,.02-16.01,3.56-3.06,2.44-5.4,5.63-7.3,9.07-2.07,3.76-2.46,8.72-6.91,8.72-3.66,0-5.5-5.07-5.9-7.16-2.15-11.35,3.33-23.98,13.52-29.42,10.19-5.44,24.32-2.56,30.91,6.92,1.02,1.47,1.89,3.13,2.01,4.92,.12,1.79-.63,3.73-2.2,4.6Z",
                      }),
                      (0, t.jsx)("path", {
                        d: "M279.28,335.64c-9.73,.14-19.17,4.32-26.05,11.38-3.87,3.97-12.49,16.81-11.65,36.6-.14,2.91-3.97,3.95-5.51,1.47-6.21-11.12-6.57-22.72-4.16-31.28,5.35-17.3,20.46-31.68,40.88-31.68,26.79,0,33.51,17.52,34.85,22.95,.64,2.25-2.14,3.91-3.85,2.31-4.44-4.13-11.29-11.75-24.53-11.75Z",
                      }),
                      (0, t.jsx)("path", {
                        d: "M281.47,374.82c-6.4,.57-11.45-3.56-12.02-9.95-.56-6.28,3.67-11.46,10.07-12.03,6.4-.57,11.59,3.78,12.15,10.06,.57,6.4-3.8,11.35-10.19,11.92Z",
                      }),
                    ],
                  }),
                  (0, t.jsx)("path", {
                    d: "M71.73,255.23c-9.44,0-40.39-50.2-40.39-121.08,0-31.81,8.17-65.76,23.02-65.76,9.14,0,11.21,19.46,11.63,25.23,4.81,60.88-3.04,102.23,8.42,157.38,.76,3.23-1.19,4.24-2.68,4.24Z",
                    className: "[fill:var(--color-v0-background-100)]",
                  }),
                ],
              }),
              (0, t.jsx)("path", {
                d: "M1795.14,708.33c-10.15-12.49-15.69-28.09-15.69-44.18v-116.19c0-82.46-38.87-129.68-107.61-129.68-91.53,0-109.25,49.86-133.62,92.28-1.18,2.05-3.79,2.78-5.88,1.66l-5.09-2.73c-2.18-1.17-2.97-3.9-1.74-6.05l6.95-12.15c4.39-7.54,6.74-16.1,6.74-24.83v-17.53c0-11.31-9.17-20.48-20.48-20.48h-99.67c-15.01,0-23.1,17.62-13.31,29l14.52,16.89c14.64,17.03,22.69,38.74,22.69,61.2v120.61c0,13.38-2.86,26.61-8.39,38.79l-11.54,25.44c-5.27,11.62,3.22,24.81,15.99,24.81h124.52c14.83,0,22.98-17.24,13.57-28.7l-10.08-12.27c-10.28-12.53-15.91-28.23-15.91-44.44v-66.55c0-23.23,5.56-46.29,17.21-66.39,14.14-24.4,32.6-36.87,55.71-36.87,31.1,0,47.81,22.15,47.81,62.16v108.1c0,13.06-2.72,25.97-8,37.92l-9.89,22.39c-5.12,11.61,3.37,24.65,16.06,24.65h118.19c14.79,0,22.95-17.16,13.62-28.63l-6.69-8.23Z M2017.12,698.84c-3.98,.79-7.88,1.34-11.31,1.42-32.12,0-47.58-20.22-47.58-61.81v-165.27h58.49c6.77,0,12.26-5.49,12.26-12.26v-20.02c0-6.77-5.49-12.26-12.26-12.26h-74.85c-2.1,0-3.8-1.7-3.8-3.8v-5.61c0-2.09,1.68-3.79,3.77-3.8h7.6c4.85,.01,8.79-3.92,8.79-8.77v-43.72c0-8.34-6.76-15.09-15.09-15.09h-43.05c-7.84,0-14.78,5.08-17.11,12.57-4.97,16.4-16.93,68.23-55.83,68.23h-11.57c-6.74,0-12.22,5.48-12.22,12.26v20.02c0,6.78,5.48,12.26,12.22,12.26h35.67v169.45c0,68.94,35.08,106.98,98.66,106.98,31.73,0,60.5-11.59,77.93-32.48,6.78-8.16-.28-20.34-10.72-18.29Z M1392.13,686.38c-18.95,3.42-31.77-11.43-31.77-34.73v-112.14c0-79.98-50.69-122.94-149.15-122.94-88.18,0-148.4,33.9-148.56,85.1-.04,9.19,3.41,18.2,8.49,26.87,8.17,12.54,22.93,20.95,39.84,20.95,25.74,0,46.61-19.42,46.61-43.37-.08-24.56-20.82-37.01-27.11-39.35,4.47-3.81,23.78-18.69,52.29-18.69,45.32,0,69.59,34.35,69.59,87.83v21.26c-34.02,0-72.17,3.41-99.01,9.96-65.67,14.35-100.28,51.72-100.28,98.27,0,52.5,41.78,85.3,108,85.3,45.96,0,84.15-16.08,102.05-42.96,11.31,22.7,36.38,37.01,68.62,37.01,41.7,0,63.54-21.76,70.44-47.62,1.78-7.36-3.78-11.98-10.05-10.76Zm-139.77-25.15c-3.55,25.03-20.85,39.97-45.92,39.97-27.47,0-45.96-18.49-45.96-47.73,0-22.67,10.13-42.49,32.24-52.03,14.9-6.58,38.15-10.17,59.64-10.76v70.56Z M2389.61,686.38c-18.95,3.42-31.77-11.43-31.77-34.73v-112.14c0-79.98-50.69-122.94-149.15-122.94-88.18,0-148.4,33.9-148.56,85.1-.04,9.19,3.41,18.2,8.49,26.87,8.17,12.54,22.93,20.95,39.84,20.95,25.74,0,46.61-19.42,46.61-43.37-.08-24.56-20.82-37.01-27.11-39.35,4.47-3.81,23.78-18.69,52.29-18.69,45.32,0,69.59,34.35,69.59,87.83v21.26c-34.02,0-72.17,3.41-99.01,9.96-65.67,14.35-100.28,51.72-100.28,98.27,0,52.5,41.78,85.3,108,85.3,45.96,0,84.15-16.08,102.05-42.96,11.31,22.7,36.38,37.01,68.62,37.01,41.7,0,63.54-21.76,70.44-47.62,1.78-7.36-3.78-11.98-10.05-10.76Zm-139.77-25.15c-3.55,25.03-20.85,39.97-45.92,39.97-27.47,0-45.96-18.49-45.96-47.73,0-22.67,10.13-42.49,32.24-52.03,14.9-6.58,38.15-10.17,59.64-10.76v70.56Z M1070.02,322.88h-54.12c-11.65,0-18.62,12.95-12.22,22.67l9.27,14.09c7.92,12.04,9.47,27.18,4.15,40.57l-97.09,244.21c-4.47,11.76-9,19.82-11.05,21.8-1.1,1.06-2.94,1.38-4.37,.31l-5.12-4.07c-1.63-1.22-1.53-2.99-.04-4.66,2.85-3.78,4.62-8.34,5.61-12.49,1.19-4.98,.79-10.21-1.03-15l-82.22-217.35c-5.43-14.34-5.22-30.21,.59-44.41l8.78-21.46c4.73-11.55-3.77-24.21-16.25-24.21h-132.49c-17.85,0-27.16,21.24-15.06,34.36l8.43,9.15c15.49,16.81,27.73,36.33,36.11,57.59l118.05,308.52c3.09,7.83,10.64,12.97,19.06,12.97h65.37c8.4,0,15.95-5.13,19.04-12.93l152.92-385.62c4.57-11.53-3.92-24.03-16.32-24.03Z",
                fill: "currentColor",
              }),
            ],
          });
        },
        scale: 1.08,
        marginTop: -6,
      },
    ];
    function s() {
      return (0, t.jsxs)("section", {
        className:
          "jsx-d6ef6adf11ebe06a relative w-full overflow-hidden py-12 md:py-20 px-2",
        children: [
          (0, t.jsx)("div", {
            className:
              "jsx-d6ef6adf11ebe06a pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-v0-background-100 to-transparent",
          }),
          (0, t.jsx)("div", {
            className:
              "jsx-d6ef6adf11ebe06a pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-v0-background-100 to-transparent",
          }),
          (0, t.jsx)("div", {
            className:
              "jsx-d6ef6adf11ebe06a flex animate-marquee whitespace-nowrap",
            children: [...Array(12)].map((e, n) =>
              (0, t.jsx)(
                "div",
                {
                  className: "jsx-d6ef6adf11ebe06a flex shrink-0",
                  children: r.map((e, r) => {
                    let s = `logo-${n}-${r}`,
                      i = e.component,
                      a = e.scale || 1,
                      l = e.marginTop || 0;
                    return (0, t.jsx)(
                      "div",
                      {
                        style: {
                          "--logo-scale": a,
                          marginTop: l ? `${l}px` : void 0,
                        },
                        className:
                          "jsx-d6ef6adf11ebe06a logo-container mx-4 inline-flex items-center justify-center transition-all duration-300 ease-out md:mx-8",
                        children: (0, t.jsx)(i, {
                          className:
                            "jsx-d6ef6adf11ebe06a h-6 w-auto opacity-65 transition-opacity duration-300 hover:opacity-100 md:h-10 text-v0-gray-800",
                        }),
                      },
                      s,
                    );
                  }),
                },
                `logo-set-${n}`,
              ),
            ),
          }),
          (0, t.jsx)(n.default, {
            id: "d6ef6adf11ebe06a",
            children:
              "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-8.333%)}}.animate-marquee.jsx-d6ef6adf11ebe06a{animation:10s linear infinite marquee}@media (width>=768px){.animate-marquee.jsx-d6ef6adf11ebe06a{animation:15s linear infinite marquee}}.logo-container.jsx-d6ef6adf11ebe06a{transform:scale(var(--logo-scale,1))}.logo-container.jsx-d6ef6adf11ebe06a:hover{transform:scale(calc(var(--logo-scale,1)*1.1))}",
          }),
        ],
      });
    }
    e.s(["LogosSection", () => s]);
  },
  720061,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(315774),
      r = e.i(507037),
      s = e.i(388503),
      i = e.i(418625),
      a = e.i(176248),
      l = e.i(494266),
      o = e.i(654335);
    let c = [
      {
        templateCanonId: "dashboard-m-o-n-k-y-b7GDYVxuoGC",
        templateVersionId: "v1",
        blockId: "block-1",
        title: "Dashboard – M.O.N.K.Y",
        description: "Modern analytics dashboard with real-time data",
        imageUrl: "",
        videoBasename: "Dashboard-MONKY",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-01"),
        uses: 7500,
        authorId: "joyco",
        category: "dashboard",
        tags: ["analytics", "charts", "dashboard"],
        ownerId: "joyco",
        isTeamTemplate: !1,
        likeCount: 720,
        liked: !1,
      },
      {
        templateCanonId: "garden-city-game-yAouuBHDmnT",
        templateVersionId: "v1",
        blockId: "block-2",
        title: "Garden City Game",
        description: "Interactive city building game interface",
        imageUrl: "",
        videoBasename: "Garden-City-Game",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-10-28"),
        uses: 8,
        authorId: "willierichter123-5121",
        category: "game",
        tags: ["game", "interactive", "animation"],
        ownerId: "willierichter123-5121",
        isTeamTemplate: !1,
        likeCount: 3,
        liked: !1,
      },
      {
        templateCanonId: "3-d-gallery-photography-template-JUFK37Esjlj",
        templateVersionId: "v1",
        blockId: "block-3",
        title: "3D Gallery Photography Template",
        description: "3D photo gallery with stunning visual effects",
        imageUrl: "",
        videoBasename: "3D-gallery-photography",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-10-29"),
        uses: 1800,
        authorId: "user-joelbqz",
        category: "gallery",
        tags: ["3d", "photography", "gallery"],
        ownerId: "user-joelbqz",
        isTeamTemplate: !1,
        likeCount: 397,
        liked: !1,
      },
      {
        templateCanonId: "modern-smart-home-dashboard-t0b0i9Q0jMS",
        templateVersionId: "v1",
        blockId: "block-4",
        title: "Modern Smart Home Dashboard",
        description: "Control your smart home devices with style",
        imageUrl: "",
        videoBasename: "Modern-Smart-Home-Dashboard",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-03"),
        uses: 222,
        authorId: "ultrahive",
        category: "dashboard",
        tags: ["smart-home", "iot", "controls"],
        ownerId: "ultrahive",
        isTeamTemplate: !1,
        likeCount: 81,
        liked: !1,
      },
      {
        templateCanonId: "new-components-shadcn-ui-rjaI1QX2ApZ",
        templateVersionId: "v1",
        blockId: "block-5",
        title: "New Components - shadcn/ui",
        description: "Beautiful component library demonstration",
        imageUrl: "",
        videoBasename: "shadcn",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-10-25"),
        uses: 672,
        authorId: "estebansuarez",
        category: "components",
        tags: ["shadcn", "ui", "components"],
        ownerId: "estebansuarez",
        isTeamTemplate: !1,
        likeCount: 182,
        liked: !1,
      },
      {
        templateCanonId: "v0-icon-qK8iWfx4VMX",
        templateVersionId: "v1",
        blockId: "block-6",
        title: "v0 icon",
        description: "Animated v0 branding showcase",
        imageUrl: "",
        videoBasename: "v0-icon",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-05"),
        uses: 539,
        authorId: "yoheinishitsuji",
        category: "animation",
        tags: ["animation", "branding", "v0"],
        ownerId: "yoheinishitsuji",
        isTeamTemplate: !1,
        likeCount: 73,
        liked: !1,
      },
      {
        templateCanonId: "modern-booking-page-8lNrJsEZHaF",
        templateVersionId: "v1",
        blockId: "block-7",
        title: "Modern Booking Page",
        description: "Sleek appointment booking interface",
        imageUrl: "",
        videoBasename: "Modern-Booking-Page",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-02"),
        uses: 18,
        authorId: "vdimarco",
        category: "forms",
        tags: ["booking", "calendar", "appointments"],
        ownerId: "vdimarco",
        isTeamTemplate: !1,
        likeCount: 5,
        liked: !1,
      },
      {
        templateCanonId: "wadada-run-club-hero-maaLWRPC8Cr",
        templateVersionId: "v1",
        blockId: "block-8",
        title: "Wadada run club hero",
        description: "Dynamic fitness community landing page",
        imageUrl: "",
        videoBasename: "Wadada-Run-Club-Hero",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-10-30"),
        uses: 590,
        authorId: "jondoescodingx",
        category: "landing",
        tags: ["fitness", "community", "hero"],
        ownerId: "jondoescodingx",
        isTeamTemplate: !1,
        likeCount: 95,
        liked: !1,
      },
      {
        templateCanonId: "modern-agency-website-liquid-glass-ezmvVsZJxz8",
        templateVersionId: "v1",
        blockId: "block-9",
        title: "Modern Agency Website - Liquid Glass",
        description: "Stunning agency website with liquid glass effects",
        imageUrl: "",
        videoBasename: "Modern-Agency-Website-Liquid-Glass",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-06"),
        uses: 4200,
        authorId: "theskitbit",
        category: "landing",
        tags: ["agency", "glassmorphism", "landing"],
        ownerId: "theskitbit",
        isTeamTemplate: !1,
        likeCount: 575,
        liked: !1,
      },
      {
        templateCanonId: "sleek-landing-page-R5iD4luh3cv",
        templateVersionId: "v1",
        blockId: "block-10",
        title: "Sleek Landing Page",
        description: "Minimalist and elegant landing page design",
        imageUrl: "",
        videoBasename: "Sleek-Landing-Page",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-07"),
        uses: 103,
        authorId: "rajoninternet",
        category: "landing",
        tags: ["landing", "minimal", "sleek"],
        ownerId: "rajoninternet",
        isTeamTemplate: !1,
        likeCount: 33,
        liked: !1,
      },
      {
        templateCanonId: "the-orb-RumDfOqDMPi",
        templateVersionId: "v1",
        blockId: "block-11",
        title: "The Orb",
        description: "Immersive 3D orb animation showcase",
        imageUrl: "",
        videoBasename: "The-Orb",
        publishedToCommunity: "approved",
        createdAt: new Date("2024-11-08"),
        uses: 3500,
        authorId: "chinpeerapat",
        category: "animation",
        tags: ["3d", "animation", "interactive"],
        ownerId: "chinpeerapat",
        isTeamTemplate: !1,
        likeCount: 81,
        liked: !1,
      },
    ];
    function d() {
      return (0, t.jsx)("section", {
        className: "w-full py-12 md:py-20 max-w-[1440px] mx-auto",
        children: (0, t.jsxs)("div", {
          className: "mx-auto px-4 md:px-6",
          children: [
            (0, t.jsx)("div", {
              className: "mb-12",
              children: (0, t.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, t.jsx)("h2", {
                    className: "text-heading-32 text-v0-gray-1000",
                    children: "Ship mobile sites",
                  }),
                  (0, t.jsx)(a.Button, {
                    variant: "ghost",
                    size: "sm",
                    asChild: !0,
                    className: "hidden md:inline-flex",
                    children: (0, t.jsxs)(o.default, {
                      href: "/templates",
                      children: [
                        "Browse all",
                        (0, t.jsx)(l.ChevronRightSmall, {}),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            (0, t.jsx)(s.ScrollFadeContainer, {
              snap: !0,
              showButtons: !1,
              showFades: !1,
              scrollableClassName: "pb-4 pr-16",
              children: (0, t.jsx)("div", {
                className: "flex gap-4",
                children: c.map((e, s) => {
                  let a = "vercel" === e.authorId,
                    l = `/templates/${e.templateCanonId}`,
                    c = `/chat-static/assets/homepage/videos/${e.videoBasename}`;
                  return (0, t.jsx)(
                    i.SWRConfig,
                    {
                      value: {
                        fallback: {
                          [`template:${e.templateCanonId}:likes`]: {
                            likeCount: e.likeCount,
                            isLiked: e.liked,
                          },
                        },
                      },
                      children: (0, t.jsx)("div", {
                        className: "group flex-shrink-0 snap-start",
                        children: (0, t.jsxs)("div", {
                          className: "w-[240px] md:w-[280px] lg:w-[340px]",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "shadow-base bg-v0-background-200 relative aspect-[4/8.5] w-full rounded-xl overflow-hidden border border-v0-gray-200 transition-all duration-300 group-hover:border-v0-gray-300 group-hover:shadow-lg",
                              children: [
                                (0, t.jsxs)("video", {
                                  className:
                                    "absolute inset-0 w-full h-full object-cover",
                                  autoPlay: !0,
                                  loop: !0,
                                  muted: !0,
                                  playsInline: !0,
                                  preload: s >= 3 ? "none" : "auto",
                                  poster: `${c}-poster.jpg`,
                                  children: [
                                    (0, t.jsx)("source", {
                                      src: `${c}.webm`,
                                      type: "video/webm; codecs=vp9",
                                    }),
                                    (0, t.jsx)("source", {
                                      src: `${c}.mp4`,
                                      type: "video/mp4",
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  className:
                                    "absolute inset-0 flex items-center justify-center bg-linear-to-b from-[hsla(0,0%,100%,0.3)] to-[hsla(0,0%,40%,0.3)] opacity-0 transition-opacity hover:opacity-100",
                                  children: (0, t.jsx)(
                                    r.PrefetchLinkAndRefreshOnHover,
                                    {
                                      href: l,
                                      className: "absolute inset-0",
                                      prefetch: !1,
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex items-center gap-3 pr-1 mt-2",
                              children: [
                                !a &&
                                  (0, t.jsx)(o.default, {
                                    href: `/@${e.authorId}`,
                                    className: "flex-shrink-0",
                                    children: (0, t.jsx)("img", {
                                      src: `https://vercel.com/api/www/avatar?u=${e.authorId}`,
                                      alt: e.authorId,
                                      className:
                                        "size-9 rounded-full object-cover bg-v0-gray-200",
                                      onError: (t) => {
                                        t.currentTarget.src = `https://vercel.com/api/www/avatar/${e.authorId}`;
                                      },
                                    }),
                                  }),
                                (0, t.jsx)(r.PrefetchLinkAndRefreshOnHover, {
                                  className: "flex items-center gap-3",
                                  href: l,
                                  tabIndex: -1,
                                  prefetch: !1,
                                  children: (0, t.jsxs)("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                      (0, t.jsx)("div", {
                                        className:
                                          "line-clamp-1 font-medium leading-none text-v0-gray-1000",
                                        children: e.title,
                                      }),
                                      (0, t.jsx)(n.TemplateCardStats, {
                                        template: e,
                                        interactive: !0,
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    },
                    e.templateCanonId,
                  );
                }),
              }),
            }),
          ],
        }),
      });
    }
    e.s(["VerticalCarouselSection", () => d]);
  },
  406963,
  (e) => {
    "use strict";
    var t = e.i(324834),
      n = e.i(176248),
      r = e.i(323194),
      s = e.i(226368);
    function i() {
      let { loginUrl: e } = (0, r.useSignInDialog)(),
        i = (0, s.useRouter)();
      return (0, t.jsx)("section", {
        className: "w-full py-16 md:py-24 mb-16",
        children: (0, t.jsx)("div", {
          className: "mx-auto max-w-[1264px] px-4 md:px-6",
          children: (0, t.jsxs)("div", {
            className:
              "rounded-2xl bg-v0-gray-50 px-6 py-12 md:px-12 md:py-16 text-center",
            children: [
              (0, t.jsxs)("h2", {
                className: "text-heading-48 text-v0-gray-1000 mb-2",
                children: [
                  "Start building with",
                  " ",
                  (0, t.jsx)("span", {
                    style: { fontFeatureSettings: '"ss09"' },
                    children: "v0",
                  }),
                ],
              }),
              (0, t.jsx)("p", {
                className: "text-lg text-v0-gray-900 max-w-2xl mx-auto mb-8",
                children:
                  "Go from idea to production in seconds with smart, secure infrastructure",
              }),
              (0, t.jsx)("div", {
                className: "flex justify-center",
                children: (0, t.jsx)(n.Button, {
                  rounded: !0,
                  size: "lg",
                  onClick: () => {
                    i.push(e);
                  },
                  children: "Get Started",
                }),
              }),
            ],
          }),
        }),
      });
    }
    e.s(["CtaSection", () => i]);
  },
  487989,
  (e) => {
    "use strict";
    var t = e.i(324834);
    e.i(472428);
    var n = e.i(296900);
    function r({ chatId: e }) {
      let { data: r } = (0, n.useServerQuerySWR)(
          ["chat", "attributes"],
          { chatId: e },
          { suspense: !0 },
        ),
        s = r.ok ? r.value.title : null;
      return "string" == typeof s && s.length > 0
        ? (0, t.jsx)("title", { children: `${s} - v0 by Vercel` })
        : null;
    }
    e.s(["SuspendingKeepTitleUpdated", () => r]);
  },
]);
