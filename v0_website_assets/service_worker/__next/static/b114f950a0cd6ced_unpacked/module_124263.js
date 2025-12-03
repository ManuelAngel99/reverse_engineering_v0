var r = require(31269 /* wakaru:missing */);
var i = require(903664 /* wakaru:missing */);

var a = {
  7160: function (e, t, n) {
    t.bignum = n(711);
    t.define = n(495).define;
    t.base = n(853);
    t.constants = n(7335);
    t.decoders = n(6701);
    t.encoders = n(3418);
  },
  495: function (e, t, n) {
    var r = n(7160);
    var i = n(3782);
    function a(e, t) {
      this.name = e;
      this.body = t;
      this.decoders = {};
      this.encoders = {};
    }

    t.define = function (e, t) {
      return new a(e, t);
    };

    a.prototype._createNamed = function (e) {
      var t;
      try {
        t = n(6144).runInThisContext(
          "(function " +
            this.name +
            "(entity) {\n  this._initNamed(entity);\n})"
        );
      } catch (e) {
        t = function (e) {
          this._initNamed(e);
        };
      }
      i(t, e);

      t.prototype._initNamed = function (t) {
        e.call(this, t);
      };

      return new t(this);
    };

    a.prototype._getDecoder = function (e) {
      e = e || "der";

      if (!this.decoders.hasOwnProperty(e)) {
        this.decoders[e] = this._createNamed(r.decoders[e]);
      }

      return this.decoders[e];
    };

    a.prototype.decode = function (e, t, n) {
      return this._getDecoder(t).decode(e, n);
    };

    a.prototype._getEncoder = function (e) {
      e = e || "der";

      if (!this.encoders.hasOwnProperty(e)) {
        this.encoders[e] = this._createNamed(r.encoders[e]);
      }

      return this.encoders[e];
    };

    a.prototype.encode = function (e, t, n) {
      return this._getEncoder(t).encode(e, n);
    };
  },
  6483: function (e, t, n) {
    var r = n(3782);
    var i = n(853).Reporter;
    var a = n(4300).Buffer;
    function o(e, t) {
      i.call(this, t);

      if (a.isBuffer(e)) {
        this.base = e;
        this.offset = 0;
        this.length = e.length;
      } else {
        this.error("Input not Buffer");
      }
    }
    function s(e, t) {
      if (Array.isArray(e)) {
        this.length = 0;

        this.value = e.map(function (e) {
          if (e instanceof s) {
            e = new s(e, t);
          }

          this.length += e.length;
          return e;
        }, this);
      } else if (typeof e == "number") {
        if (!(e >= 0 && e <= 255)) {
          return t.error("non-byte EncoderBuffer value");
        }
        this.value = e;
        this.length = 1;
      } else if (typeof e == "string") {
        this.value = e;
        this.length = a.byteLength(e);
      } else {
        if (!a.isBuffer(e)) {
          return t.error("Unsupported type: " + typeof e);
        }
        this.value = e;
        this.length = e.length;
      }
    }
    r(o, i);
    t.C = o;

    o.prototype.save = function () {
      return {
        offset: this.offset,
        reporter: i.prototype.save.call(this),
      };
    };

    o.prototype.restore = function (e) {
      var t = new o(this.base);
      t.offset = e.offset;
      t.length = this.offset;
      this.offset = e.offset;
      i.prototype.restore.call(this, e.reporter);
      return t;
    };

    o.prototype.isEmpty = function () {
      return this.offset === this.length;
    };

    o.prototype.readUInt8 = function (e) {
      return this.offset + 1 <= this.length
        ? this.base.readUInt8(this.offset++, true)
        : this.error(e || "DecoderBuffer overrun");
    };

    o.prototype.skip = function (e, t) {
      if (!(this.offset + e <= this.length)) {
        return this.error(t || "DecoderBuffer overrun");
      }
      var n = new o(this.base);
      n._reporterState = this._reporterState;
      n.offset = this.offset;
      n.length = this.offset + e;
      this.offset += e;
      return n;
    };

    o.prototype.raw = function (e) {
      return this.base.slice(e ? e.offset : this.offset, this.length);
    };

    t.R = s;

    s.prototype.join = function (e, t) {
      if (!e) {
        e = new a(this.length);
      }

      if (!t) {
        t = 0;
      }

      if (this.length !== 0) {
        if (Array.isArray(this.value)) {
          this.value.forEach(function (n) {
            n.join(e, t);
            t += n.length;
          });
        } else {
          typeof this.value == "number"
            ? (e[t] = this.value)
            : typeof this.value == "string"
            ? e.write(this.value, t)
            : a.isBuffer(this.value) && this.value.copy(e, t);

          t += this.length;
        }
      }

      return e;
    };
  },
  853: function (e, t, n) {
    t.Reporter = n(1293).b;
    t.DecoderBuffer = n(6483).C;
    t.EncoderBuffer = n(6483).R;
    t.Node = n(9374);
  },
  9374: function (e, t, n) {
    var r = n(853).Reporter;
    var i = n(853).EncoderBuffer;
    var a = n(853).DecoderBuffer;
    var o = n(3523);

    var s = [
      "seq",
      "seqof",
      "set",
      "setof",
      "objid",
      "bool",
      "gentime",
      "utctime",
      "null_",
      "enum",
      "int",
      "objDesc",
      "bitstr",
      "bmpstr",
      "charstr",
      "genstr",
      "graphstr",
      "ia5str",
      "iso646str",
      "numstr",
      "octstr",
      "printstr",
      "t61str",
      "unistr",
      "utf8str",
      "videostr",
    ];

    var l = [
      "key",
      "obj",
      "use",
      "optional",
      "explicit",
      "implicit",
      "def",
      "choice",
      "any",
      "contains",
    ].concat(s);

    function c(e, t) {
      var n = {};
      this._baseState = n;
      n.enc = e;
      n.parent = t || null;
      n.children = null;
      n.tag = null;
      n.args = null;
      n.reverseArgs = null;
      n.choice = null;
      n.optional = false;
      n.any = false;
      n.obj = false;
      n.use = null;
      n.useDecoder = null;
      n.key = null;
      n.default = null;
      n.explicit = null;
      n.implicit = null;
      n.contains = null;

      if (!n.parent) {
        n.children = [];
        this._wrap();
      }
    }
    e.exports = c;
    var d = [
      "enc",
      "parent",
      "children",
      "tag",
      "args",
      "reverseArgs",
      "choice",
      "optional",
      "any",
      "obj",
      "use",
      "alteredUse",
      "key",
      "default",
      "explicit",
      "implicit",
      "contains",
    ];

    c.prototype.clone = function () {
      var e = this._baseState;
      var t = {};
      d.forEach(function (n) {
        t[n] = e[n];
      });
      var n = new this.constructor(t.parent);
      n._baseState = t;
      return n;
    };

    c.prototype._wrap = function (...args) {
      var e = this._baseState;
      l.forEach(function (t) {
        this[t] = function () {
          var n = new this.constructor(this);
          e.children.push(n);
          return n[t](...args);
        };
      }, this);
    };

    c.prototype._init = function (e) {
      var t = this._baseState;
      o(t.parent === null);
      e.call(this);

      t.children = t.children.filter(function (e) {
        return e._baseState.parent === this;
      }, this);

      o.equal(t.children.length, 1, "Root node can have only one child");
    };

    c.prototype._useArgs = function (e) {
      var t = this._baseState;

      var n = e.filter(function (e) {
        return e instanceof this.constructor;
      }, this);

      e = e.filter(function (e) {
        return !(e instanceof this.constructor);
      }, this);

      if (n.length !== 0) {
        o(t.children === null);
        t.children = n;

        n.forEach(function (e) {
          e._baseState.parent = this;
        }, this);
      }

      if (e.length !== 0) {
        o(t.args === null);
        t.args = e;

        t.reverseArgs = e.map(function (e) {
          if (typeof e != "object" || e.constructor !== Object) {
            return e;
          }
          var t = {};

          Object.keys(e).forEach(function (n) {
            if (n == (0 | n)) {
              n |= 0;
            }

            t[e[n]] = n;
          });

          return t;
        });
      }
    };

    [
      "_peekTag",
      "_decodeTag",
      "_use",
      "_decodeStr",
      "_decodeObjid",
      "_decodeTime",
      "_decodeNull",
      "_decodeInt",
      "_decodeBool",
      "_decodeList",
      "_encodeComposite",
      "_encodeStr",
      "_encodeObjid",
      "_encodeTime",
      "_encodeNull",
      "_encodeInt",
      "_encodeBool",
    ].forEach(function (e) {
      c.prototype[e] = function () {
        throw Error(
          e + " not implemented for encoding: " + this._baseState.enc
        );
      };
    });

    s.forEach(function (e) {
      c.prototype[e] = function (...args) {
        var t = this._baseState;
        var n = Array.prototype.slice.call(args);
        o(t.tag === null);
        t.tag = e;
        this._useArgs(n);
        return this;
      };
    });

    c.prototype.use = function (e) {
      o(e);
      var t = this._baseState;
      o(t.use === null);
      t.use = e;
      return this;
    };

    c.prototype.optional = function () {
      this._baseState.optional = true;
      return this;
    };

    c.prototype.def = function (e) {
      var t = this._baseState;
      o(t.default === null);
      t.default = e;
      t.optional = true;
      return this;
    };

    c.prototype.explicit = function (e) {
      var t = this._baseState;
      o(t.explicit === null && t.implicit === null);
      t.explicit = e;
      return this;
    };

    c.prototype.implicit = function (e) {
      var t = this._baseState;
      o(t.explicit === null && t.implicit === null);
      t.implicit = e;
      return this;
    };

    c.prototype.obj = function (...args) {
      var e = this._baseState;
      var t = Array.prototype.slice.call(args);
      e.obj = true;

      if (t.length !== 0) {
        this._useArgs(t);
      }

      return this;
    };

    c.prototype.key = function (e) {
      var t = this._baseState;
      o(t.key === null);
      t.key = e;
      return this;
    };

    c.prototype.any = function () {
      this._baseState.any = true;
      return this;
    };

    c.prototype.choice = function (e) {
      var t = this._baseState;
      o(t.choice === null);
      t.choice = e;

      this._useArgs(
        Object.keys(e).map(function (t) {
          return e[t];
        })
      );

      return this;
    };

    c.prototype.contains = function (e) {
      var t = this._baseState;
      o(t.use === null);
      t.contains = e;
      return this;
    };

    c.prototype._decode = function (e, t) {
      var n;
      var r = this._baseState;
      if (r.parent === null) {
        return e.wrapResult(r.children[0]._decode(e, t));
      }
      var r_default = r.default;
      var o = true;
      var s = null;

      if (r.key !== null) {
        s = e.enterKey(r.key);
      }

      if (r.optional) {
        var l = null;

        if (r.explicit !== null) {
          l = r.explicit;
        } else if (r.implicit !== null) {
          l = r.implicit;
        } else if (r.tag !== null) {
          l = r.tag;
        }

        if (l !== null || r.any) {
          o = this._peekTag(e, l, r.any);

          if (e.isError(o)) {
            return o;
          }
        } else {
          var c = e.save();
          try {
            if (r.choice === null) {
              this._decodeGeneric(r.tag, e, t);
            } else {
              this._decodeChoice(e, t);
            }

            o = true;
          } catch (e) {
            o = false;
          }
          e.restore(c);
        }
      }

      if (r.obj && o) {
        n = e.enterObject();
      }

      if (o) {
        if (r.explicit !== null) {
          var d = this._decodeTag(e, r.explicit);
          if (e.isError(d)) {
            return d;
          }
          e = d;
        }
        var e_offset = e.offset;
        if (r.use === null && r.choice === null) {
          if (r.any) var c = e.save();
          var p = this._decodeTag(
            e,
            r.implicit !== null ? r.implicit : r.tag,
            r.any
          );
          if (e.isError(p)) {
            return p;
          }

          if (r.any) {
            r_default = e.raw(c);
          } else {
            e = p;
          }
        }

        if (t && t.track && r.tag !== null) {
          t.track(e.path(), e_offset, e.length, "tagged");
        }

        if (t && t.track && r.tag !== null) {
          t.track(e.path(), e.offset, e.length, "content");
        }

        if (!r.any) {
          r_default =
            r.choice === null
              ? this._decodeGeneric(r.tag, e, t)
              : this._decodeChoice(e, t);
        }

        if (e.isError(r_default)) {
          return r_default;
        }

        if (!r.any && r.choice === null && r.children !== null) {
          r.children.forEach(function (n) {
            n._decode(e, t);
          });
        }

        if (r.contains && (r.tag === "octstr" || r.tag === "bitstr")) {
          var _ = new a(r_default);
          r_default = this._getUse(r.contains, e._reporterState.obj)._decode(
            _,
            t
          );
        }
      }

      if (r.obj && o) {
        r_default = e.leaveObject(n);
      }

      if (r.key !== null && (r_default !== null || o === true)) {
        e.leaveKey(s, r.key, r_default);
      } else if (s !== null) {
        e.exitKey(s);
      }

      return r_default;
    };

    c.prototype._decodeGeneric = function (e, t, n) {
      var r = this._baseState;
      if (e === "seq" || e === "set") {
        return null;
      }
      if (e === "seqof" || e === "setof") {
        return this._decodeList(t, e, r.args[0], n);
      }
      if (/str$/.test(e)) {
        return this._decodeStr(t, e, n);
      }
      if (e === "objid" && r.args) {
        return this._decodeObjid(t, r.args[0], r.args[1], n);
      }
      if (e === "objid") {
        return this._decodeObjid(t, null, null, n);
      }
      if (e === "gentime" || e === "utctime") {
        return this._decodeTime(t, e, n);
      } else if (e === "null_") {
        return this._decodeNull(t, n);
      } else if (e === "bool") {
        return this._decodeBool(t, n);
      } else if (e === "objDesc") {
        return this._decodeStr(t, e, n);
      } else if (e === "int" || e === "enum") {
        return this._decodeInt(t, r.args && r.args[0], n);
      }
      return r.use !== null
        ? this._getUse(r.use, t._reporterState.obj)._decode(t, n)
        : t.error("unknown tag: " + e);
    };

    c.prototype._getUse = function (e, t) {
      var n = this._baseState;
      n.useDecoder = this._use(e, t);
      o(n.useDecoder._baseState.parent === null);
      n.useDecoder = n.useDecoder._baseState.children[0];

      if (n.implicit !== n.useDecoder._baseState.implicit) {
        n.useDecoder = n.useDecoder.clone();
        n.useDecoder._baseState.implicit = n.implicit;
      }

      return n.useDecoder;
    };

    c.prototype._decodeChoice = function (e, t) {
      var n = this._baseState;
      var r = null;
      var i = false;
      return (Object.keys(n.choice).some(function (a) {
        var o = e.save();
        var s = n.choice[a];
        try {
          var l = s._decode(e, t);
          if (e.isError(l)) {
            return false;
          }
          r = { type: a, value: l };
          i = true;
        } catch (t) {
          e.restore(o);
          return false;
        }
        return true;
      }, this),
      i)
        ? r
        : e.error("Choice not matched");
    };

    c.prototype._createEncoderBuffer = function (e) {
      return new i(e, this.reporter);
    };

    c.prototype._encode = function (e, t, n) {
      var r = this._baseState;
      if (r.default === null || r.default !== e) {
        var i = this._encodeValue(e, t, n);
        if (i !== undefined && !this._skipDefault(i, t, n)) {
          return i;
        }
      }
    };

    c.prototype._encodeValue = function (e, t, n) {
      var i;
      var a = this._baseState;
      if (a.parent === null) {
        return a.children[0]._encode(e, t || new r());
      }
      var i = null;
      this.reporter = t;

      if (a.optional && e === undefined) {
        if (a.default === null) {
          return;
        } else {
          e = a.default;
        }
      }

      var o = null;
      var s = false;
      if (a.any) {
        i = this._createEncoderBuffer(e);
      } else if (a.choice) {
        i = this._encodeChoice(e, t);
      } else if (a.contains) {
        o = this._getUse(a.contains, n)._encode(e, t);
        s = true;
      } else if (a.children) {
        o = a.children
          .map(function (n) {
            if (n._baseState.tag === "null_") {
              return n._encode(null, t, e);
            }
            if (n._baseState.key === null) {
              return t.error("Child should have a key");
            }
            var r = t.enterKey(n._baseState.key);
            if (typeof e != "object") {
              return t.error("Child expected, but input is not object");
            }
            var i = n._encode(e[n._baseState.key], t, e);
            t.leaveKey(r);
            return i;
          }, this)
          .filter(function (e) {
            return e;
          });

        o = this._createEncoderBuffer(o);
      } else if (a.tag === "seqof" || a.tag === "setof") {
        if (!(a.args && a.args.length === 1)) {
          return t.error("Too many args for : " + a.tag);
        }
        if (!Array.isArray(e)) {
          return t.error("seqof/setof, but data is not Array");
        }
        var l = this.clone();
        l._baseState.implicit = null;

        o = this._createEncoderBuffer(
          e.map(function (n) {
            var r = this._baseState;
            return this._getUse(r.args[0], e)._encode(n, t);
          }, l)
        );
      } else {
        if (a.use !== null) {
          i = this._getUse(a.use, n)._encode(e, t);
        } else {
          o = this._encodePrimitive(a.tag, e);
          s = true;
        }
      }
      if (!a.any && a.choice === null) {
        var c = a.implicit !== null ? a.implicit : a.tag;
        var d = a.implicit === null ? "universal" : "context";

        if (c === null) {
          if (a.use === null) {
            t.error("Tag could be omitted only for .use()");
          }
        } else if (a.use === null) {
          i = this._encodeComposite(c, s, d, o);
        }
      }

      if (a.explicit !== null) {
        i = this._encodeComposite(a.explicit, false, "context", i);
      }

      return i;
    };

    c.prototype._encodeChoice = function (e, t) {
      var n = this._baseState;
      var r = n.choice[e.type];

      if (!r) {
        o(
          false,
          e.type + " not found in " + JSON.stringify(Object.keys(n.choice))
        );
      }

      return r._encode(e.value, t);
    };

    c.prototype._encodePrimitive = function (e, t) {
      var n = this._baseState;
      if (/str$/.test(e)) {
        return this._encodeStr(t, e);
      }
      if (e === "objid" && n.args) {
        return this._encodeObjid(t, n.reverseArgs[0], n.args[1]);
      }
      if (e === "objid") {
        return this._encodeObjid(t, null, null);
      }
      if (e === "gentime" || e === "utctime") {
        return this._encodeTime(t, e);
      }
      if (e === "null_") {
        return this._encodeNull();
      } else if (e === "int" || e === "enum") {
        return this._encodeInt(t, n.args && n.reverseArgs[0]);
      } else if (e === "bool") {
        return this._encodeBool(t);
      } else if (e === "objDesc") {
        return this._encodeStr(t, e);
      } else {
        throw Error("Unsupported tag: " + e);
      }
    };

    c.prototype._isNumstr = function (e) {
      return /^[0-9 ]*$/.test(e);
    };

    c.prototype._isPrintstr = function (e) {
      return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e);
    };
  },
  1293: function (e, t, n) {
    var r = n(3782);
    function i(e) {
      this._reporterState = {
        obj: null,
        path: [],
        options: e || {},
        errors: [],
      };
    }
    function a(e, t) {
      this.path = e;
      this.rethrow(t);
    }
    t.b = i;

    i.prototype.isError = function (e) {
      return e instanceof a;
    };

    i.prototype.save = function () {
      var e = this._reporterState;
      return { obj: e.obj, pathLen: e.path.length };
    };

    i.prototype.restore = function (e) {
      var t = this._reporterState;
      t.obj = e.obj;
      t.path = t.path.slice(0, e.pathLen);
    };

    i.prototype.enterKey = function (e) {
      return this._reporterState.path.push(e);
    };

    i.prototype.exitKey = function (e) {
      var t = this._reporterState;
      t.path = t.path.slice(0, e - 1);
    };

    i.prototype.leaveKey = function (e, t, n) {
      var r = this._reporterState;
      this.exitKey(e);

      if (r.obj !== null) {
        r.obj[t] = n;
      }
    };

    i.prototype.path = function () {
      return this._reporterState.path.join("/");
    };

    i.prototype.enterObject = function () {
      var e = this._reporterState;
      var e_obj = e.obj;
      e.obj = {};
      return e_obj;
    };

    i.prototype.leaveObject = function (e) {
      var t = this._reporterState;
      var t_obj = t.obj;
      t.obj = e;
      return t_obj;
    };

    i.prototype.error = function (e) {
      var t;
      var n = this._reporterState;
      var r = e instanceof a;

      t = r
        ? e
        : new a(
            n.path
              .map(function (e) {
                return "[" + JSON.stringify(e) + "]";
              })
              .join(""),
            e.message || e,
            e.stack
          );

      if (!n.options.partial) {
        throw t;
      }

      if (!r) {
        n.errors.push(t);
      }

      return t;
    };

    i.prototype.wrapResult = function (e) {
      var t = this._reporterState;
      return t.options.partial
        ? { result: this.isError(e) ? null : e, errors: t.errors }
        : e;
    };

    r(a, Error);

    a.prototype.rethrow = function (e) {
      this.message = e + " at: " + (this.path || "(shallow)");

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, a);
      }

      if (!this.stack) {
        try {
          throw Error(this.message);
        } catch (e) {
          this.stack = e.stack;
        }
      }

      return this;
    };
  },
  9791: function (e, t, n) {
    var r = n(7335);

    t.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private",
    };

    t.tagClassByName = r._reverse(t.tagClass);

    t.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr",
    };

    t.tagByName = r._reverse(t.tag);
  },
  7335: function (e, t, n) {
    t._reverse = function (e) {
      var t = {};

      Object.keys(e).forEach(function (n) {
        if ((0 | n) == n) {
          n |= 0;
        }

        t[e[n]] = n;
      });

      return t;
    };

    t.der = n(9791);
  },
  2259: function (e, t, n) {
    var r = n(3782);
    var i = n(7160);

    var { base, bignum } = i;

    var s = i.constants.der;
    function l(e) {
      this.enc = "der";
      this.name = e.name;
      this.entity = e;
      this.tree = new c();
      this.tree._init(e.body);
    }
    function c(e) {
      base.Node.call(this, "der", e);
    }
    function d(e, t) {
      var n = e.readUInt8(t);
      if (e.isError(n)) {
        return n;
      }
      var r = s.tagClass[n >> 6];
      var i = (32 & n) == 0;
      if ((31 & n) == 31) {
        var a = n;
        for (n = 0; (128 & a) == 128; ) {
          a = e.readUInt8(t);

          if (e.isError(a)) {
            return a;
          }

          n <<= 7;
          n |= 127 & a;
        }
      } else {
        n &= 31;
      }
      var o = s.tag[n];
      return { cls: r, primitive: i, tag: n, tagStr: o };
    }
    function u(e, t, n) {
      var r = e.readUInt8(n);
      if (e.isError(r)) {
        return r;
      }
      if (!t && r === 128) {
        return null;
      }
      if ((128 & r) == 0) {
        return r;
      }
      var i = 127 & r;
      if (i > 4) {
        return e.error("length octect is too long");
      }
      r = 0;
      for (var a = 0; a < i; a++) {
        r <<= 8;
        var o = e.readUInt8(n);
        if (e.isError(o)) {
          return o;
        }
        r |= o;
      }
      return r;
    }
    e.exports = l;

    l.prototype.decode = function (e, t) {
      if (e instanceof base.DecoderBuffer) {
        e = new base.DecoderBuffer(e, t);
      }

      return this.tree._decode(e, t);
    };

    r(c, base.Node);

    c.prototype._peekTag = function (e, t, n) {
      if (e.isEmpty()) {
        return false;
      }
      var r = e.save();
      var i = d(e, 'Failed to peek tag: "' + t + '"');
      return e.isError(i)
        ? i
        : (e.restore(r),
          i.tag === t || i.tagStr === t || i.tagStr + "of" === t || n);
    };

    c.prototype._decodeTag = function (e, t, n) {
      var r = d(e, 'Failed to decode tag of "' + t + '"');
      if (e.isError(r)) {
        return r;
      }
      var i = u(e, r.primitive, 'Failed to get length of "' + t + '"');
      if (e.isError(i)) {
        return i;
      }
      if (!n && r.tag !== t && r.tagStr !== t && r.tagStr + "of" !== t) {
        return e.error('Failed to match tag: "' + t + '"');
      }
      if (r.primitive || i !== null) {
        return e.skip(i, 'Failed to match body of: "' + t + '"');
      }
      var a = e.save();

      var o = this._skipUntilEnd(
        e,
        'Failed to skip indefinite length body: "' + this.tag + '"'
      );

      return e.isError(o)
        ? o
        : ((i = e.offset - a.offset),
          e.restore(a),
          e.skip(i, 'Failed to match body of: "' + t + '"'));
    };

    c.prototype._skipUntilEnd = function (e, t) {
      while (true) {
        var n;
        var r = d(e, t);
        if (e.isError(r)) {
          return r;
        }
        var i = u(e, r.primitive, t);
        if (e.isError(i)) {
          return i;
        }

        n = r.primitive || i !== null ? e.skip(i) : this._skipUntilEnd(e, t);

        if (e.isError(n)) {
          return n;
        }

        if (r.tagStr === "end") {
          break;
        }
      }
    };

    c.prototype._decodeList = function (e, t, n, r) {
      for (var i = []; !e.isEmpty(); ) {
        var a = this._peekTag(e, "end");
        if (e.isError(a)) {
          return a;
        }
        var o = n.decode(e, "der", r);
        if (e.isError(o) && a) {
          break;
        }
        i.push(o);
      }
      return i;
    };

    c.prototype._decodeStr = function (e, t) {
      if (t === "bitstr") {
        var n = e.readUInt8();
        return e.isError(n) ? n : { unused: n, data: e.raw() };
      }
      if (t === "bmpstr") {
        var r = e.raw();
        if (r.length % 2 == 1) {
          return e.error("Decoding of string type: bmpstr length mismatch");
        }
        for (var i = "", a = 0; a < r.length / 2; a++) {
          i += String.fromCharCode(r.readUInt16BE(2 * a));
        }
        return i;
      }
      if (t === "numstr") {
        var o = e.raw().toString("ascii");
        return this._isNumstr(o)
          ? o
          : e.error("Decoding of string type: numstr unsupported characters");
      }
      if (t === "octstr") {
        return e.raw();
      }
      if (t === "objDesc") {
        return e.raw();
      } else if (t === "printstr") {
        var s = e.raw().toString("ascii");
        return this._isPrintstr(s)
          ? s
          : e.error("Decoding of string type: printstr unsupported characters");
      } else if (/str$/.test(t)) {
        return e.raw().toString();
      } else {
        return e.error("Decoding of string type: " + t + " unsupported");
      }
    };

    c.prototype._decodeObjid = function (e, t, n) {
      for (var r, i = [], a = 0; !e.isEmpty(); ) {
        var o = e.readUInt8();
        a <<= 7;
        a |= 127 & o;

        if ((128 & o) == 0) {
          i.push(a);
          a = 0;
        }
      }

      if (128 & bignum) {
        i.push(base);
      }

      var s = (i[0] / 40) | 0;
      var l = i[0] % 40;
      r = n ? i : [s, l].concat(i.slice(1));

      if (t) {
        var c = t[r.join(" ")];

        if (c === undefined) {
          c = t[r.join(".")];
        }

        if (c !== undefined) {
          r = c;
        }
      }

      return r;
    };

    c.prototype._decodeTime = function (e, t) {
      var n = e.raw().toString();
      if (t === "gentime") {
        var r = 0 | n.slice(0, 4);
        var i = 0 | n.slice(4, 6);
        var a = 0 | n.slice(6, 8);
        var o = 0 | n.slice(8, 10);
        var s = 0 | n.slice(10, 12);
        var l = 0 | n.slice(12, 14);
      } else {
        if (t !== "utctime") {
          return e.error("Decoding " + t + " time is not supported yet");
        }
        var r = 0 | n.slice(0, 2);
        var i = 0 | n.slice(2, 4);
        var a = 0 | n.slice(4, 6);
        var o = 0 | n.slice(6, 8);
        var s = 0 | n.slice(8, 10);
        var l = 0 | n.slice(10, 12);
        r = r < 70 ? 2000 /* 2e3 */ + r : 1900 + r;
      }
      return Date.UTC(r, i - 1, base, bignum, s, l, 0);
    };

    c.prototype._decodeNull = function (e) {
      return null;
    };

    c.prototype._decodeBool = function (e) {
      var t = e.readUInt8();
      return e.isError(t) ? t : t !== 0;
    };

    c.prototype._decodeInt = function (e, t) {
      var n = new bignum(e.raw());

      if (t) {
        n = t[n.toString(10)] || n;
      }

      return n;
    };

    c.prototype._use = function (e, t) {
      if (typeof e == "function") {
        e = e(t);
      }

      return e._getDecoder("der").tree;
    };
  },
  6701: function (e, t, n) {
    t.der = n(2259);
    t.pem = n(8527);
  },
  8527: function (e, t, n) {
    var r = n(3782);
    var i = n(4300).Buffer;
    var a = n(2259);
    function o(e) {
      a.call(this, e);
      this.enc = "pem";
    }
    r(o, a);
    e.exports = o;

    o.prototype.decode = function (e, t) {
      for (
        var n = e.toString().split(/[\r\n]+/g),
          r = t.label.toUpperCase(),
          o = /^-----(BEGIN|END) ([^-]+)-----$/,
          s = -1,
          l = -1,
          c = 0;
        c < n.length;
        c++
      ) {
        var d = n[c].match(o);
        if (d !== null && d[2] === r) {
          if (-1 === s) {
            if (d[1] !== "BEGIN") {
              break;
            }
            s = c;
          } else {
            if (d[1] !== "END") {
              break;
            }
            l = c;
            break;
          }
        }
      }
      if (-1 === s || -1 === l) {
        throw Error("PEM section not found for: " + r);
      }
      var u = n.slice(s + 1, l).join("");
      u.replace(/[^a-z0-9\+\/=]+/gi, "");
      var p = new i(u, "base64");
      return a.prototype.decode.call(this, p, t);
    };
  },
  7804: function (e, t, n) {
    var r = n(3782);
    var i = n(4300).Buffer;
    var a = n(7160);
    var a_base = a.base;
    var s = a.constants.der;
    function l(e) {
      this.enc = "der";
      this.name = e.name;
      this.entity = e;
      this.tree = new c();
      this.tree._init(e.body);
    }
    function c(e) {
      a_base.Node.call(this, "der", e);
    }
    function d(e) {
      return e < 10 ? "0" + e : e;
    }
    e.exports = l;

    l.prototype.encode = function (e, t) {
      return this.tree._encode(e, t).join();
    };

    r(c, a_base.Node);

    c.prototype._encodeComposite = function (e, t, n, r) {
      var a = (function (e, t, n, r) {
        var i;

        if (e === "seqof") {
          e = "seq";
        } else if (e === "setof") {
          e = "set";
        }

        if (s.tagByName.hasOwnProperty(e)) {
          i = s.tagByName[e];
        } else {
          if (typeof e != "number" || (0 | e) !== e) {
            return r.error("Unknown tag: " + e);
          }
          i = e;
        }

        return i >= 31
          ? r.error("Multi-octet tag encoding unsupported")
          : (t || (i |= 32), (i |= s.tagClassByName[n || "universal"] << 6));
      })(e, t, n, this.reporter);
      if (r.length < 128) {
        var o = new i(2);
        o[0] = a;
        o[1] = r.length;
        return this._createEncoderBuffer([o, r]);
      }
      for (var l = 1, c = r.length; c >= 256; c >>= 8) {
        l++;
      }
      var o = new i(2 + l);
      o[0] = a;
      o[1] = 128 | l;
      for (var c = 1 + l, d = r.length; d > 0; c--, d >>= 8) {
        o[c] = 255 & d;
      }
      return this._createEncoderBuffer([o, r]);
    };

    c.prototype._encodeStr = function (e, t) {
      if (t === "bitstr") {
        return this._createEncoderBuffer([0 | e.unused, e.data]);
      }
      if (t === "bmpstr") {
        for (var n = new i(2 * e.length), r = 0; r < e.length; r++) {
          n.writeUInt16BE(e.charCodeAt(r), 2 * r);
        }
        return this._createEncoderBuffer(n);
      }
      if (t === "numstr") {
        return this._isNumstr(e)
          ? this._createEncoderBuffer(e)
          : this.reporter.error(
              "Encoding of string type: numstr supports only digits and space"
            );
      }
      if (t === "printstr") {
        return this._isPrintstr(e)
          ? this._createEncoderBuffer(e)
          : this.reporter.error(
              "Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"
            );
      }
      if (/str$/.test(t)) {
        return this._createEncoderBuffer(e);
      } else if (t === "objDesc") {
        return this._createEncoderBuffer(e);
      } else {
        return this.reporter.error(
          "Encoding of string type: " + t + " unsupported"
        );
      }
    };

    c.prototype._encodeObjid = function (e, t, n) {
      if (typeof e == "string") {
        if (!t) {
          return this.reporter.error(
            "string objid given, but no values map found"
          );
        }
        if (!t.hasOwnProperty(e)) {
          return this.reporter.error("objid not found in values map");
        }
        e = t[e].split(/[\s\.]+/g);
        for (var r = 0; r < e.length; r++) {
          e[r] |= 0;
        }
      } else if (Array.isArray(e)) {
        e = e.slice();
        for (var r = 0; r < e.length; r++) {
          e[r] |= 0;
        }
      }
      if (!Array.isArray(e)) {
        return this.reporter.error(
          "objid() should be either array or string, got: " + JSON.stringify(e)
        );
      }
      if (!n) {
        if (e[1] >= 40) {
          return this.reporter.error("Second objid identifier OOB");
        }
        e.splice(0, 2, 40 * e[0] + e[1]);
      }
      for (var a = 0, r = 0; r < e.length; r++) {
        var e_r = e[r];
        for (a++; e_r >= 128; e_r >>= 7) {
          a++;
        }
      }
      for (var s = new i(a), l = s.length - 1, r = e.length - 1; r >= 0; r--) {
        var e_r = e[r];
        for (s[l--] = 127 & e_r; (e_r >>= 7) > 0; ) {
          s[l--] = 128 | (127 & e_r);
        }
      }
      return this._createEncoderBuffer(s);
    };

    c.prototype._encodeTime = function (e, t) {
      var n;
      var r = new Date(e);

      if (t === "gentime") {
        n =
          "" +
          d(r.getFullYear()) +
          d(r.getUTCMonth() + 1) +
          d(r.getUTCDate()) +
          d(r.getUTCHours()) +
          d(r.getUTCMinutes()) +
          d(r.getUTCSeconds()) +
          "Z";
      } else if (t === "utctime") {
        n =
          "" +
          d(r.getFullYear() % 100) +
          d(r.getUTCMonth() + 1) +
          d(r.getUTCDate()) +
          d(r.getUTCHours()) +
          d(r.getUTCMinutes()) +
          d(r.getUTCSeconds()) +
          "Z";
      } else {
        this.reporter.error("Encoding " + t + " time is not supported yet");
      }

      return this._encodeStr(n, "octstr");
    };

    c.prototype._encodeNull = function () {
      return this._createEncoderBuffer("");
    };

    c.prototype._encodeInt = function (e, t) {
      if (typeof e == "string") {
        if (!t) {
          return this.reporter.error(
            "String int or enum given, but no values map"
          );
        }
        if (!t.hasOwnProperty(e)) {
          return this.reporter.error(
            "Values map doesn't contain: " + JSON.stringify(e)
          );
        }
        e = t[e];
      }
      if (typeof e != "number" && !i.isBuffer(e)) {
        var n = e.toArray();

        if (!e.sign && 128 & n[0]) {
          n.unshift(0);
        }

        e = new i(n);
      }
      if (i.isBuffer(e)) {
        var e_length = e.length;

        if (e.length === 0) {
          e_length++;
        }

        var a = new i(e_length);
        e.copy(a);

        if (e.length === 0) {
          a[0] = 0;
        }

        return this._createEncoderBuffer(a);
      }
      if (e < 128) {
        return this._createEncoderBuffer(e);
      }
      if (e < 256) {
        return this._createEncoderBuffer([0, e]);
      }
      for (var r = 1, o = e; o >= 256; o >>= 8) {
        r++;
      }
      for (var a = Array(r), o = a.length - 1; o >= 0; o--) {
        a[o] = 255 & e;
        e >>= 8;
      }

      if (128 & a[0]) {
        a.unshift(0);
      }

      return this._createEncoderBuffer(new i(a));
    };

    c.prototype._encodeBool = function (e) {
      return this._createEncoderBuffer(255 * !!e);
    };

    c.prototype._use = function (e, t) {
      if (typeof e == "function") {
        e = e(t);
      }

      return e._getEncoder("der").tree;
    };

    c.prototype._skipDefault = function (e, t, n) {
      var r;
      var i = this._baseState;
      if (i.default === null) {
        return false;
      }
      var a = e.join();

      if (i.defaultBuffer === undefined) {
        i.defaultBuffer = this._encodeValue(i.default, t, n).join();
      }

      if (a.length !== i.defaultBuffer.length) {
        return false;
      }

      for (r = 0; r < a.length; r++) {
        if (a[r] !== i.defaultBuffer[r]) {
          return false;
        }
      }
      return true;
    };
  },
  3418: function (e, t, n) {
    t.der = n(7804);
    t.pem = n(1564);
  },
  1564: function (e, t, n) {
    var r = n(3782);
    var i = n(7804);
    function a(e) {
      i.call(this, e);
      this.enc = "pem";
    }
    r(a, i);
    e.exports = a;

    a.prototype.encode = function (e, t) {
      for (
        var n = i.prototype.encode.call(this, e).toString("base64"),
          r = ["-----BEGIN " + t.label + "-----"],
          a = 0;
        a < n.length;
        a += 64
      ) {
        r.push(n.slice(a, a + 64));
      }
      r.push("-----END " + t.label + "-----");
      return r.join("\n");
    };
  },
  711: function (e, t, n) {
    !(function (e, t) {
      function r(e, t) {
        if (!e) {
          throw Error(t || "Assertion failed");
        }
      }
      function i(e, t) {
        e.super_ = t;
        var n = function () {};
        n.prototype = t.prototype;
        e.prototype = new n();
        e.prototype.constructor = e;
      }
      function a(e, t, n) {
        if (a.isBN(e)) {
          return e;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;

        if (e !== null) {
          (t === "le" || t === "be") && ((n = t), (t = 10));
          this._init(e || 0, t || 10, n || "be");
        }
      }

      if (typeof e == "object") {
        e.exports = a;
      } else {
        t.BN = a;
      }

      a.BN = a;
      a.wordSize = 26;
      try {
        l = n(4300).Buffer;
      } catch (e) {}
      function o(e, t, n) {
        for (var r = 0, i = Math.min(e.length, n), a = t; a < i; a++) {
          var o = e.charCodeAt(a) - 48;
          r <<= 4;

          if (o >= 49 && o <= 54) {
            r |= o - 49 + 10;
          } else if (o >= 17 && o <= 22) {
            r |= o - 17 + 10;
          } else {
            r |= 15 & o;
          }
        }
        return r;
      }
      function s(e, t, n, r) {
        for (var i = 0, a = Math.min(e.length, n), o = t; o < a; o++) {
          var s = e.charCodeAt(o) - 48;
          i *= r;

          if (s >= 49) {
            i += s - 49 + 10;
          } else if (s >= 17) {
            i += s - 17 + 10;
          } else {
            i += s;
          }
        }
        return i;
      }

      a.isBN = function (e) {
        return (
          e instanceof a ||
          (e !== null &&
            typeof e == "object" &&
            e.constructor.wordSize === a.wordSize &&
            Array.isArray(e.words))
        );
      };

      a.max = function (e, t) {
        return e.cmp(t) > 0 ? e : t;
      };

      a.min = function (e, t) {
        return e.cmp(t) < 0 ? e : t;
      };

      a.prototype._init = function (e, t, n) {
        if (typeof e == "number") {
          return this._initNumber(e, t, n);
        }
        if (typeof e == "object") {
          return this._initArray(e, t, n);
        }

        if (t === "hex") {
          t = 16;
        }

        r(t === (0 | t) && t >= 2 && t <= 36);
        var i = 0;

        if ((e = e.toString().replace(/\s+/g, ""))[0] === "-") {
          i++;
        }

        if (t === 16) {
          this._parseHex(e, i);
        } else {
          this._parseBase(e, t, i);
        }

        if (e[0] === "-") {
          this.negative = 1;
        }

        this.strip();

        if (n === "le") {
          this._initArray(this.toArray(), t, n);
        }
      };

      a.prototype._initNumber = function (e, t, n) {
        if (e < 0) {
          this.negative = 1;
          e = -e;
        }

        if (e < 67108864 /* 0x4000000 */) {
          this.words = [67108863 /* 0x3ffffff */ & e];
          this.length = 1;
        } else if (e < 4503599627370496 /* 0x10000000000000 */) {
          this.words = [
            67108863 /* 0x3ffffff */ & e,
            (e / 67108864) /* 0x4000000 */ & 67108863 /* 0x3ffffff */,
          ];
          this.length = 2;
        } else {
          r(e < 9007199254740992 /* 0x20000000000000 */);

          this.words = [
            67108863 /* 0x3ffffff */ & e,
            (e / 67108864) /* 0x4000000 */ & 67108863 /* 0x3ffffff */,
            1,
          ];

          this.length = 3;
        }

        if (n === "le") {
          this._initArray(this.toArray(), t, n);
        }
      };

      a.prototype._initArray = function (e, t, n) {
        r(typeof e.length == "number");

        if (e.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }

        this.length = Math.ceil(e.length / 3);
        this.words = Array(this.length);
        for (var i, a, o = 0; o < this.length; o++) {
          this.words[o] = 0;
        }
        var s = 0;
        if (n === "be") {
          o = e.length - 1;

          for (i = 0; o >= 0; o -= 3) {
            a = e[o] | (e[o - 1] << 8) | (e[o - 2] << 16);
            this.words[i] |= (a << s) & 67108863 /* 0x3ffffff */;
            this.words[i + 1] = (a >>> (26 - s)) & 67108863 /* 0x3ffffff */;

            if ((s += 24) >= 26) {
              s -= 26;
              i++;
            }
          }
        } else if (n === "le") {
          o = 0;

          for (i = 0; o < e.length; o += 3) {
            a = e[o] | (e[o + 1] << 8) | (e[o + 2] << 16);
            this.words[i] |= (a << s) & 67108863 /* 0x3ffffff */;
            this.words[i + 1] = (a >>> (26 - s)) & 67108863 /* 0x3ffffff */;

            if ((s += 24) >= 26) {
              s -= 26;
              i++;
            }
          }
        }
        return this.strip();
      };

      a.prototype._parseHex = function (e, t) {
        this.length = Math.ceil((e.length - t) / 6);
        this.words = Array(this.length);
        for (var n, r, i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var a = 0;
        i = e.length - 6;

        for (n = 0; i >= t; i -= 6) {
          r = o(e, i, i + 6);
          this.words[n] |= (r << a) & 67108863 /* 0x3ffffff */;
          this.words[n + 1] |= (r >>> (26 - a)) & 4194303;

          if ((a += 24) >= 26) {
            a -= 26;
            n++;
          }
        }

        if (i + 6 !== t) {
          r = o(e, t, i + 6);
          this.words[n] |= (r << a) & 67108863 /* 0x3ffffff */;
          this.words[n + 1] |= (r >>> (26 - a)) & 4194303;
        }

        this.strip();
      };

      a.prototype._parseBase = function (e, t, n) {
        this.words = [0];
        this.length = 1;
        for (var r = 0, i = 1; i <= 67108863 /* 0x3ffffff */; i *= t) {
          r++;
        }
        r--;
        i = (i / t) | 0;
        for (
          var a = e.length - n,
            o = a % r,
            l = Math.min(a, a - o) + n,
            c = 0,
            d = n;
          d < l;
          d += r
        ) {
          c = s(e, d, d + r, t);
          this.imuln(i);

          if (this.words[0] + c < 67108864 /* 0x4000000 */) {
            this.words[0] += c;
          } else {
            this._iaddn(c);
          }
        }
        if (o !== 0) {
          var u = 1;
          c = s(e, d, e.length, t);

          for (d = 0; d < o; d++) {
            u *= t;
          }

          this.imuln(u);

          if (this.words[0] + c < 67108864 /* 0x4000000 */) {
            this.words[0] += c;
          } else {
            this._iaddn(c);
          }
        }
      };

      a.prototype.copy = function (e) {
        e.words = Array(this.length);
        for (var t = 0; t < this.length; t++) {
          e.words[t] = this.words[t];
        }
        e.length = this.length;
        e.negative = this.negative;
        e.red = this.red;
      };

      a.prototype.clone = function () {
        var e = new a(null);
        this.copy(e);
        return e;
      };

      a.prototype._expand = function (e) {
        while (this.length < e) {
          this.words[this.length++] = 0;
        }

        return this;
      };

      a.prototype.strip = function () {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }

        return this._normSign();
      };

      a.prototype._normSign = function () {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }

        return this;
      };

      a.prototype.inspect = function () {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };

      var l;

      var c = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000",
      ];

      var d = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ];

      var u = [
        0, 0, 33554432 /* 0x2000000 */, 43046721 /* 0x290d741 */,
        16777216 /* 0x1000000 */, 48828125 /* 0x2e90edd */,
        60466176 /* 0x39aa400 */, 40353607 /* 0x267bf47 */,
        16777216 /* 0x1000000 */, 43046721 /* 0x290d741 */, 10000000 /* 1e7 */,
        19487171 /* 0x12959c3 */, 35831808 /* 0x222c000 */,
        62748517 /* 0x3bd7765 */, 7529536, 11390625 /* 0xadcea1 */,
        16777216 /* 0x1000000 */, 24137569 /* 0x1704f61 */,
        34012224 /* 0x206fc40 */, 47045881 /* 0x2cddcf9 */, 64000000 /* 64e6 */,
        4084101, 5153632, 6436343, 7962624, 9765625, 11881376 /* 0xb54ba0 */,
        14348907 /* 0xdaf26b */, 17210368 /* 0x1069c00 */,
        20511149 /* 0x138f9ad */, 24300000 /* 243e5 */,
        28629151 /* 0x1b4d89f */, 33554432 /* 0x2000000 */,
        39135393 /* 0x25528a1 */, 45435424 /* 0x2b54a20 */,
        52521875 /* 0x3216b93 */, 60466176 /* 0x39aa400 */,
      ];

      function p(e, t, n) {
        n.negative = t.negative ^ e.negative;
        var r = (e.length + t.length) | 0;
        n.length = r;
        r = (r - 1) | 0;
        var i = 0 | e.words[0];
        var a = 0 | t.words[0];
        var o = i * a;
        var s = 67108863 /* 0x3ffffff */ & o;
        var l = (o / 67108864) /* 0x4000000 */ | 0;
        n.words[0] = s;
        for (var c = 1; c < r; c++) {
          for (
            var d = l >>> 26,
              u = 67108863 /* 0x3ffffff */ & l,
              p = Math.min(c, t.length - 1),
              _ = Math.max(0, c - e.length + 1);
            _ <= p;
            _++
          ) {
            var f = (c - _) | 0;

            d +=
              ((o = (i = 0 | e.words[f]) * (a = 0 | t.words[_]) + u) /
                67108864) /* 0x4000000 */ |
              0;

            u = 67108863 /* 0x3ffffff */ & o;
          }
          n.words[c] = 0 | u;
          l = 0 | d;
        }

        if (l !== 0) {
          n.words[c] = 0 | l;
        } else {
          n.length--;
        }

        return n.strip();
      }

      a.prototype.toString = function (e, t) {
        t = 0 | t || 1;

        if (16 === (e = e || 10) || e === "hex") {
          for (var n = "", i = 0, a = 0, o = 0; o < this.length; o++) {
            var s = this.words[o];
            var l = (((s << i) | a) & 16777215) /* 0xffffff */
              .toString(16);

            n =
              0 != (a = (s >>> (24 - i)) & 16777215) /* 0xffffff */ ||
              o !== this.length - 1
                ? c[6 - l.length] + l + n
                : l + n;

            if ((i += 2) >= 26) {
              i -= 26;
              o--;
            }
          }
          for (a !== 0 && (n = a.toString(16) + n); n.length % t != 0; ) {
            n = "0" + n;
          }

          if (this.negative !== 0) {
            n = "-" + n;
          }

          return n;
        }

        if (e === (0 | e) && e >= 2 && e <= 36) {
          var d_e = d[e];
          var u_e = u[e];
          n = "";
          var f = this.clone();
          for (f.negative = 0; !f.isZero(); ) {
            var m = f.modn(u_e).toString(e);
            n = (f = f.idivn(u_e)).isZero() ? m + n : c[d_e - m.length] + m + n;
          }
          for (this.isZero() && (n = "0" + n); n.length % t != 0; ) {
            n = "0" + n;
          }

          if (this.negative !== 0) {
            n = "-" + n;
          }

          return n;
        }
        r(false, "Base should be between 2 and 36");
      };

      a.prototype.toNumber = function () {
        var e = this.words[0];

        if (this.length === 2) {
          e += 67108864 /* 0x4000000 */ * this.words[1];
        } else if (this.length === 3 && this.words[2] === 1) {
          e +=
            4503599627370496 /* 0x10000000000000 */ +
            67108864 /* 0x4000000 */ * this.words[1];
        } else if (this.length > 2) {
          r(false, "Number can only safely store up to 53 bits");
        }

        return this.negative !== 0 ? -e : e;
      };

      a.prototype.toJSON = function () {
        return this.toString(16);
      };

      a.prototype.toBuffer = function (e, t) {
        r(l !== undefined);
        return this.toArrayLike(l, e, t);
      };

      a.prototype.toArray = function (e, t) {
        return this.toArrayLike(Array, e, t);
      };

      a.prototype.toArrayLike = function (e, t, n) {
        var i;
        var a;
        var o = this.byteLength();
        var s = n || Math.max(1, o);
        r(o <= s, "byte array longer than desired length");
        r(s > 0, "Requested array length <= 0");
        this.strip();
        var l = new e(s);
        var c = this.clone();
        if (t === "le") {
          for (a = 0; !c.isZero(); a++) {
            i = c.andln(255);
            c.iushrn(8);
            l[a] = i;
          }
          for (; a < s; a++) {
            l[a] = 0;
          }
        } else {
          for (a = 0; a < s - o; a++) {
            l[a] = 0;
          }
          for (a = 0; !c.isZero(); a++) {
            i = c.andln(255);
            c.iushrn(8);
            l[s - a - 1] = i;
          }
        }
        return l;
      };

      if (Math.clz32) {
        a.prototype._countBits = function (e) {
          return 32 - Math.clz32(e);
        };
      } else {
        a.prototype._countBits = function (e) {
          var t = e;
          var n = 0;

          if (t >= 4096) {
            n += 13;
            t >>>= 13;
          }

          if (t >= 64) {
            n += 7;
            t >>>= 7;
          }

          if (t >= 8) {
            n += 4;
            t >>>= 4;
          }

          if (t >= 2) {
            n += 2;
            t >>>= 2;
          }

          return n + t;
        };
      }

      a.prototype._zeroBits = function (e) {
        if (e === 0) {
          return 26;
        }
        var t = e;
        var n = 0;

        if ((8191 & t) == 0) {
          n += 13;
          t >>>= 13;
        }

        if ((127 & t) == 0) {
          n += 7;
          t >>>= 7;
        }

        if ((15 & t) == 0) {
          n += 4;
          t >>>= 4;
        }

        if ((3 & t) == 0) {
          n += 2;
          t >>>= 2;
        }

        if ((1 & t) == 0) {
          n++;
        }

        return n;
      };

      a.prototype.bitLength = function () {
        var e = this.words[this.length - 1];
        var t = this._countBits(e);
        return (this.length - 1) * 26 + t;
      };

      a.prototype.zeroBits = function () {
        if (this.isZero()) {
          return 0;
        }
        for (var e = 0, t = 0; t < this.length; t++) {
          var n = this._zeroBits(this.words[t]);
          e += n;

          if (n !== 26) {
            break;
          }
        }
        return e;
      };

      a.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      };

      a.prototype.toTwos = function (e) {
        return this.negative !== 0
          ? this.abs().inotn(e).iaddn(1)
          : this.clone();
      };

      a.prototype.fromTwos = function (e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      };

      a.prototype.isNeg = function () {
        return this.negative !== 0;
      };

      a.prototype.neg = function () {
        return this.clone().ineg();
      };

      a.prototype.ineg = function () {
        if (!this.isZero()) {
          this.negative ^= 1;
        }

        return this;
      };

      a.prototype.iuor = function (e) {
        while (this.length < e.length) {
          this.words[this.length++] = 0;
        }

        for (var t = 0; t < e.length; t++) {
          this.words[t] = this.words[t] | e.words[t];
        }
        return this.strip();
      };

      a.prototype.ior = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuor(e);
      };

      a.prototype.or = function (e) {
        return this.length > e.length
          ? this.clone().ior(e)
          : e.clone().ior(this);
      };

      a.prototype.uor = function (e) {
        return this.length > e.length
          ? this.clone().iuor(e)
          : e.clone().iuor(this);
      };

      a.prototype.iuand = function (e) {
        var t;
        t = this.length > e.length ? e : this;
        for (var n = 0; n < t.length; n++) {
          this.words[n] = this.words[n] & e.words[n];
        }
        this.length = t.length;
        return this.strip();
      };

      a.prototype.iand = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuand(e);
      };

      a.prototype.and = function (e) {
        return this.length > e.length
          ? this.clone().iand(e)
          : e.clone().iand(this);
      };

      a.prototype.uand = function (e) {
        return this.length > e.length
          ? this.clone().iuand(e)
          : e.clone().iuand(this);
      };

      a.prototype.iuxor = function (e) {
        if (this.length > e.length) {
          t = this;
          n = e;
        } else {
          t = e;
          n = this;
        }

        for (var t, n, r = 0; r < n.length; r++) {
          this.words[r] = t.words[r] ^ n.words[r];
        }
        if (this !== t) {
          for (; r < t.length; r++) {
            this.words[r] = t.words[r];
          }
        }
        this.length = t.length;
        return this.strip();
      };

      a.prototype.ixor = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuxor(e);
      };

      a.prototype.xor = function (e) {
        return this.length > e.length
          ? this.clone().ixor(e)
          : e.clone().ixor(this);
      };

      a.prototype.uxor = function (e) {
        return this.length > e.length
          ? this.clone().iuxor(e)
          : e.clone().iuxor(this);
      };

      a.prototype.inotn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = 0 | Math.ceil(e / 26);
        var n = e % 26;
        this._expand(t);

        if (n > 0) {
          t--;
        }

        for (var i = 0; i < t; i++) {
          this.words[i] = 67108863 /* 0x3ffffff */ & ~this.words[i];
        }

        if (n > 0) {
          this.words[i] =
            ~this.words[i] & (67108863 /* 0x3ffffff */ >> (26 - n));
        }

        return this.strip();
      };

      a.prototype.notn = function (e) {
        return this.clone().inotn(e);
      };

      a.prototype.setn = function (e, t) {
        r(typeof e == "number" && e >= 0);
        var n = (e / 26) | 0;
        var i = e % 26;
        this._expand(n + 1);

        if (t) {
          this.words[n] = this.words[n] | (1 << i);
        } else {
          this.words[n] = this.words[n] & ~(1 << i);
        }

        return this.strip();
      };

      a.prototype.iadd = function (e) {
        if (this.negative !== 0 && e.negative === 0) {
          this.negative = 0;
          t = this.isub(e);
          this.negative ^= 1;
          return this._normSign();
        }
        if (this.negative === 0 && e.negative !== 0) {
          e.negative = 0;
          t = this.isub(e);
          e.negative = 1;
          return t._normSign();
        }

        if (this.length > e.length) {
          n = this;
          r = e;
        } else {
          n = e;
          r = this;
        }

        for (var t, n, r, i = 0, a = 0; a < r.length; a++) {
          t = (0 | n.words[a]) + (0 | r.words[a]) + i;
          this.words[a] = 67108863 /* 0x3ffffff */ & t;
          i = t >>> 26;
        }
        for (; i !== 0 && a < n.length; a++) {
          t = (0 | n.words[a]) + i;
          this.words[a] = 67108863 /* 0x3ffffff */ & t;
          i = t >>> 26;
        }
        this.length = n.length;

        if (i !== 0) {
          this.words[this.length] = i;
          this.length++;
        } else if (n !== this) {
          for (; a < n.length; a++) {
            this.words[a] = n.words[a];
          }
        }

        return this;
      };

      a.prototype.add = function (e) {
        var t;

        if (e.negative !== 0 && this.negative === 0) {
          e.negative = 0;
          t = this.sub(e);
          e.negative ^= 1;
          return t;
        }

        if (e.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          t = e.sub(this);
          this.negative = 1;
          return t;
        }

        if (this.length > e.length) {
          return this.clone().iadd(e);
        }

        return e.clone().iadd(this);
      };

      a.prototype.isub = function (e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var t;
          var n;
          var r = this.iadd(e);
          e.negative = 1;
          return r._normSign();
        }
        if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(e);
          this.negative = 1;
          return this._normSign();
        }
        var i = this.cmp(e);
        if (i === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }

        if (i > 0) {
          t = this;
          n = e;
        } else {
          t = e;
          n = this;
        }

        for (var a = 0, o = 0; o < n.length; o++) {
          a = (r = (0 | t.words[o]) - (0 | n.words[o]) + a) >> 26;
          this.words[o] = 67108863 /* 0x3ffffff */ & r;
        }
        for (; a !== 0 && o < t.length; o++) {
          a = (r = (0 | t.words[o]) + a) >> 26;
          this.words[o] = 67108863 /* 0x3ffffff */ & r;
        }
        if (a === 0 && o < t.length && t !== this) {
          for (; o < t.length; o++) {
            this.words[o] = t.words[o];
          }
        }
        this.length = Math.max(this.length, o);

        if (t !== this) {
          this.negative = 1;
        }

        return this.strip();
      };

      a.prototype.sub = function (e) {
        return this.clone().isub(e);
      };

      var _ = function (e, t, n) {
        var r;
        var i;
        var a;
        var e_words = e.words;
        var t_words = t.words;
        var n_words = n.words;
        var c = 0;
        var d = 0 | e_words[0];
        var u = 8191 & d;
        var p = d >>> 13;
        var _ = 0 | e_words[1];
        var f = 8191 & _;
        var m = _ >>> 13;
        var h = 0 | e_words[2];
        var g = 8191 & h;
        var y = h >>> 13;
        var b = 0 | e_words[3];
        var x = 8191 & b;
        var S = b >>> 13;
        var k = 0 | e_words[4];
        var T = 8191 & k;
        var E = k >>> 13;
        var C = 0 | e_words[5];
        var A = 8191 & C;
        var w = C >>> 13;
        var D = 0 | e_words[6];
        var N = 8191 & D;
        var I = D >>> 13;
        var P = 0 | e_words[7];
        var M = 8191 & P;
        var L = P >>> 13;
        var R = 0 | e_words[8];
        var F = 8191 & R;
        var O = R >>> 13;
        var B = 0 | e_words[9];
        var W = 8191 & B;
        var j = B >>> 13;
        var z = 0 | t_words[0];
        var V = 8191 & z;
        var G = z >>> 13;
        var K = 0 | t_words[1];
        var U = 8191 & K;
        var H = K >>> 13;
        var q = 0 | t_words[2];
        var J = 8191 & q;
        var $ = q >>> 13;
        var X = 0 | t_words[3];
        var Y = 8191 & X;
        var Q = X >>> 13;
        var Z = 0 | t_words[4];
        var ee = 8191 & Z;
        var et = Z >>> 13;
        var en = 0 | t_words[5];
        var er = 8191 & en;
        var ei = en >>> 13;
        var ea = 0 | t_words[6];
        var eo = 8191 & ea;
        var es = ea >>> 13;
        var el = 0 | t_words[7];
        var ec = 8191 & el;
        var ed = el >>> 13;
        var eu = 0 | t_words[8];
        var ep = 8191 & eu;
        var e_ = eu >>> 13;
        var ef = 0 | t_words[9];
        var em = 8191 & ef;
        var eh = ef >>> 13;
        n.negative = e.negative ^ t.negative;
        n.length = 19;
        r = Math.imul(u, V);
        var eg =
          (((c + r) | 0) +
            ((8191 & (i = ((i = Math.imul(u, G)) + Math.imul(p, V)) | 0)) <<
              13)) |
          0;
        c = ((((a = Math.imul(p, G)) + (i >>> 13)) | 0) + (eg >>> 26)) | 0;
        eg &= 67108863 /* 0x3ffffff */;
        r = Math.imul(f, V);
        i = ((i = Math.imul(f, G)) + Math.imul(m, V)) | 0;
        a = Math.imul(m, G);
        r = (r + Math.imul(u, U)) | 0;
        var ey =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, H)) | 0) + Math.imul(p, U)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, H)) | 0) + (i >>> 13)) | 0) + (ey >>> 26)) |
          0;

        ey &= 67108863 /* 0x3ffffff */;
        r = Math.imul(g, V);
        i = ((i = Math.imul(g, G)) + Math.imul(y, V)) | 0;
        a = Math.imul(y, G);
        r = (r + Math.imul(f, U)) | 0;
        i = ((i = (i + Math.imul(f, H)) | 0) + Math.imul(m, U)) | 0;
        a = (a + Math.imul(m, H)) | 0;
        r = (r + Math.imul(u, J)) | 0;
        var ev =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, $)) | 0) + Math.imul(p, J)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, $)) | 0) + (i >>> 13)) | 0) + (ev >>> 26)) |
          0;

        ev &= 67108863 /* 0x3ffffff */;
        r = Math.imul(x, V);
        i = ((i = Math.imul(x, G)) + Math.imul(S, V)) | 0;
        a = Math.imul(S, G);
        r = (r + Math.imul(g, U)) | 0;
        i = ((i = (i + Math.imul(g, H)) | 0) + Math.imul(y, U)) | 0;
        a = (a + Math.imul(y, H)) | 0;
        r = (r + Math.imul(f, J)) | 0;
        i = ((i = (i + Math.imul(f, $)) | 0) + Math.imul(m, J)) | 0;
        a = (a + Math.imul(m, $)) | 0;
        r = (r + Math.imul(u, Y)) | 0;
        var eb =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, Q)) | 0) + Math.imul(p, Y)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, Q)) | 0) + (i >>> 13)) | 0) + (eb >>> 26)) |
          0;

        eb &= 67108863 /* 0x3ffffff */;
        r = Math.imul(T, V);
        i = ((i = Math.imul(T, G)) + Math.imul(E, V)) | 0;
        a = Math.imul(E, G);
        r = (r + Math.imul(x, U)) | 0;
        i = ((i = (i + Math.imul(x, H)) | 0) + Math.imul(S, U)) | 0;
        a = (a + Math.imul(S, H)) | 0;
        r = (r + Math.imul(g, J)) | 0;
        i = ((i = (i + Math.imul(g, $)) | 0) + Math.imul(y, J)) | 0;
        a = (a + Math.imul(y, $)) | 0;
        r = (r + Math.imul(f, Y)) | 0;
        i = ((i = (i + Math.imul(f, Q)) | 0) + Math.imul(m, Y)) | 0;
        a = (a + Math.imul(m, Q)) | 0;
        r = (r + Math.imul(u, ee)) | 0;
        var ex =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, et)) | 0) + Math.imul(p, ee)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, et)) | 0) + (i >>> 13)) | 0) +
            (ex >>> 26)) |
          0;

        ex &= 67108863 /* 0x3ffffff */;
        r = Math.imul(A, V);
        i = ((i = Math.imul(A, G)) + Math.imul(w, V)) | 0;
        a = Math.imul(w, G);
        r = (r + Math.imul(T, U)) | 0;
        i = ((i = (i + Math.imul(T, H)) | 0) + Math.imul(E, U)) | 0;
        a = (a + Math.imul(E, H)) | 0;
        r = (r + Math.imul(x, J)) | 0;
        i = ((i = (i + Math.imul(x, $)) | 0) + Math.imul(S, J)) | 0;
        a = (a + Math.imul(S, $)) | 0;
        r = (r + Math.imul(g, Y)) | 0;
        i = ((i = (i + Math.imul(g, Q)) | 0) + Math.imul(y, Y)) | 0;
        a = (a + Math.imul(y, Q)) | 0;
        r = (r + Math.imul(f, ee)) | 0;
        i = ((i = (i + Math.imul(f, et)) | 0) + Math.imul(m, ee)) | 0;
        a = (a + Math.imul(m, et)) | 0;
        r = (r + Math.imul(u, er)) | 0;
        var eS =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, ei)) | 0) + Math.imul(p, er)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, ei)) | 0) + (i >>> 13)) | 0) +
            (eS >>> 26)) |
          0;

        eS &= 67108863 /* 0x3ffffff */;
        r = Math.imul(N, V);
        i = ((i = Math.imul(N, G)) + Math.imul(I, V)) | 0;
        a = Math.imul(I, G);
        r = (r + Math.imul(A, U)) | 0;
        i = ((i = (i + Math.imul(A, H)) | 0) + Math.imul(w, U)) | 0;
        a = (a + Math.imul(w, H)) | 0;
        r = (r + Math.imul(T, J)) | 0;
        i = ((i = (i + Math.imul(T, $)) | 0) + Math.imul(E, J)) | 0;
        a = (a + Math.imul(E, $)) | 0;
        r = (r + Math.imul(x, Y)) | 0;
        i = ((i = (i + Math.imul(x, Q)) | 0) + Math.imul(S, Y)) | 0;
        a = (a + Math.imul(S, Q)) | 0;
        r = (r + Math.imul(g, ee)) | 0;
        i = ((i = (i + Math.imul(g, et)) | 0) + Math.imul(y, ee)) | 0;
        a = (a + Math.imul(y, et)) | 0;
        r = (r + Math.imul(f, er)) | 0;
        i = ((i = (i + Math.imul(f, ei)) | 0) + Math.imul(m, er)) | 0;
        a = (a + Math.imul(m, ei)) | 0;
        r = (r + Math.imul(u, eo)) | 0;
        var ek =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, es)) | 0) + Math.imul(p, eo)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, es)) | 0) + (i >>> 13)) | 0) +
            (ek >>> 26)) |
          0;

        ek &= 67108863 /* 0x3ffffff */;
        r = Math.imul(M, V);
        i = ((i = Math.imul(M, G)) + Math.imul(L, V)) | 0;
        a = Math.imul(L, G);
        r = (r + Math.imul(N, U)) | 0;
        i = ((i = (i + Math.imul(N, H)) | 0) + Math.imul(I, U)) | 0;
        a = (a + Math.imul(I, H)) | 0;
        r = (r + Math.imul(A, J)) | 0;
        i = ((i = (i + Math.imul(A, $)) | 0) + Math.imul(w, J)) | 0;
        a = (a + Math.imul(w, $)) | 0;
        r = (r + Math.imul(T, Y)) | 0;
        i = ((i = (i + Math.imul(T, Q)) | 0) + Math.imul(E, Y)) | 0;
        a = (a + Math.imul(E, Q)) | 0;
        r = (r + Math.imul(x, ee)) | 0;
        i = ((i = (i + Math.imul(x, et)) | 0) + Math.imul(S, ee)) | 0;
        a = (a + Math.imul(S, et)) | 0;
        r = (r + Math.imul(g, er)) | 0;
        i = ((i = (i + Math.imul(g, ei)) | 0) + Math.imul(y, er)) | 0;
        a = (a + Math.imul(y, ei)) | 0;
        r = (r + Math.imul(f, eo)) | 0;
        i = ((i = (i + Math.imul(f, es)) | 0) + Math.imul(m, eo)) | 0;
        a = (a + Math.imul(m, es)) | 0;
        r = (r + Math.imul(u, ec)) | 0;
        var eT =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, ed)) | 0) + Math.imul(p, ec)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, ed)) | 0) + (i >>> 13)) | 0) +
            (eT >>> 26)) |
          0;

        eT &= 67108863 /* 0x3ffffff */;
        r = Math.imul(F, V);
        i = ((i = Math.imul(F, G)) + Math.imul(O, V)) | 0;
        a = Math.imul(O, G);
        r = (r + Math.imul(M, U)) | 0;
        i = ((i = (i + Math.imul(M, H)) | 0) + Math.imul(L, U)) | 0;
        a = (a + Math.imul(L, H)) | 0;
        r = (r + Math.imul(N, J)) | 0;
        i = ((i = (i + Math.imul(N, $)) | 0) + Math.imul(I, J)) | 0;
        a = (a + Math.imul(I, $)) | 0;
        r = (r + Math.imul(A, Y)) | 0;
        i = ((i = (i + Math.imul(A, Q)) | 0) + Math.imul(w, Y)) | 0;
        a = (a + Math.imul(w, Q)) | 0;
        r = (r + Math.imul(T, ee)) | 0;
        i = ((i = (i + Math.imul(T, et)) | 0) + Math.imul(E, ee)) | 0;
        a = (a + Math.imul(E, et)) | 0;
        r = (r + Math.imul(x, er)) | 0;
        i = ((i = (i + Math.imul(x, ei)) | 0) + Math.imul(S, er)) | 0;
        a = (a + Math.imul(S, ei)) | 0;
        r = (r + Math.imul(g, eo)) | 0;
        i = ((i = (i + Math.imul(g, es)) | 0) + Math.imul(y, eo)) | 0;
        a = (a + Math.imul(y, es)) | 0;
        r = (r + Math.imul(f, ec)) | 0;
        i = ((i = (i + Math.imul(f, ed)) | 0) + Math.imul(m, ec)) | 0;
        a = (a + Math.imul(m, ed)) | 0;
        r = (r + Math.imul(u, ep)) | 0;
        var eE =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, e_)) | 0) + Math.imul(p, ep)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, e_)) | 0) + (i >>> 13)) | 0) +
            (eE >>> 26)) |
          0;

        eE &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, V);
        i = ((i = Math.imul(W, G)) + Math.imul(j, V)) | 0;
        a = Math.imul(j, G);
        r = (r + Math.imul(F, U)) | 0;
        i = ((i = (i + Math.imul(F, H)) | 0) + Math.imul(O, U)) | 0;
        a = (a + Math.imul(O, H)) | 0;
        r = (r + Math.imul(M, J)) | 0;
        i = ((i = (i + Math.imul(M, $)) | 0) + Math.imul(L, J)) | 0;
        a = (a + Math.imul(L, $)) | 0;
        r = (r + Math.imul(N, Y)) | 0;
        i = ((i = (i + Math.imul(N, Q)) | 0) + Math.imul(I, Y)) | 0;
        a = (a + Math.imul(I, Q)) | 0;
        r = (r + Math.imul(A, ee)) | 0;
        i = ((i = (i + Math.imul(A, et)) | 0) + Math.imul(w, ee)) | 0;
        a = (a + Math.imul(w, et)) | 0;
        r = (r + Math.imul(T, er)) | 0;
        i = ((i = (i + Math.imul(T, ei)) | 0) + Math.imul(E, er)) | 0;
        a = (a + Math.imul(E, ei)) | 0;
        r = (r + Math.imul(x, eo)) | 0;
        i = ((i = (i + Math.imul(x, es)) | 0) + Math.imul(S, eo)) | 0;
        a = (a + Math.imul(S, es)) | 0;
        r = (r + Math.imul(g, ec)) | 0;
        i = ((i = (i + Math.imul(g, ed)) | 0) + Math.imul(y, ec)) | 0;
        a = (a + Math.imul(y, ed)) | 0;
        r = (r + Math.imul(f, ep)) | 0;
        i = ((i = (i + Math.imul(f, e_)) | 0) + Math.imul(m, ep)) | 0;
        a = (a + Math.imul(m, e_)) | 0;
        r = (r + Math.imul(u, em)) | 0;
        var eC =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, eh)) | 0) + Math.imul(p, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, eh)) | 0) + (i >>> 13)) | 0) +
            (eC >>> 26)) |
          0;

        eC &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, U);
        i = ((i = Math.imul(W, H)) + Math.imul(j, U)) | 0;
        a = Math.imul(j, H);
        r = (r + Math.imul(F, J)) | 0;
        i = ((i = (i + Math.imul(F, $)) | 0) + Math.imul(O, J)) | 0;
        a = (a + Math.imul(O, $)) | 0;
        r = (r + Math.imul(M, Y)) | 0;
        i = ((i = (i + Math.imul(M, Q)) | 0) + Math.imul(L, Y)) | 0;
        a = (a + Math.imul(L, Q)) | 0;
        r = (r + Math.imul(N, ee)) | 0;
        i = ((i = (i + Math.imul(N, et)) | 0) + Math.imul(I, ee)) | 0;
        a = (a + Math.imul(I, et)) | 0;
        r = (r + Math.imul(A, er)) | 0;
        i = ((i = (i + Math.imul(A, ei)) | 0) + Math.imul(w, er)) | 0;
        a = (a + Math.imul(w, ei)) | 0;
        r = (r + Math.imul(T, eo)) | 0;
        i = ((i = (i + Math.imul(T, es)) | 0) + Math.imul(E, eo)) | 0;
        a = (a + Math.imul(E, es)) | 0;
        r = (r + Math.imul(x, ec)) | 0;
        i = ((i = (i + Math.imul(x, ed)) | 0) + Math.imul(S, ec)) | 0;
        a = (a + Math.imul(S, ed)) | 0;
        r = (r + Math.imul(g, ep)) | 0;
        i = ((i = (i + Math.imul(g, e_)) | 0) + Math.imul(y, ep)) | 0;
        a = (a + Math.imul(y, e_)) | 0;
        r = (r + Math.imul(f, em)) | 0;
        var eA =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(f, eh)) | 0) + Math.imul(m, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(m, eh)) | 0) + (i >>> 13)) | 0) +
            (eA >>> 26)) |
          0;

        eA &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, J);
        i = ((i = Math.imul(W, $)) + Math.imul(j, J)) | 0;
        a = Math.imul(j, $);
        r = (r + Math.imul(F, Y)) | 0;
        i = ((i = (i + Math.imul(F, Q)) | 0) + Math.imul(O, Y)) | 0;
        a = (a + Math.imul(O, Q)) | 0;
        r = (r + Math.imul(M, ee)) | 0;
        i = ((i = (i + Math.imul(M, et)) | 0) + Math.imul(L, ee)) | 0;
        a = (a + Math.imul(L, et)) | 0;
        r = (r + Math.imul(N, er)) | 0;
        i = ((i = (i + Math.imul(N, ei)) | 0) + Math.imul(I, er)) | 0;
        a = (a + Math.imul(I, ei)) | 0;
        r = (r + Math.imul(A, eo)) | 0;
        i = ((i = (i + Math.imul(A, es)) | 0) + Math.imul(w, eo)) | 0;
        a = (a + Math.imul(w, es)) | 0;
        r = (r + Math.imul(T, ec)) | 0;
        i = ((i = (i + Math.imul(T, ed)) | 0) + Math.imul(E, ec)) | 0;
        a = (a + Math.imul(E, ed)) | 0;
        r = (r + Math.imul(x, ep)) | 0;
        i = ((i = (i + Math.imul(x, e_)) | 0) + Math.imul(S, ep)) | 0;
        a = (a + Math.imul(S, e_)) | 0;
        r = (r + Math.imul(g, em)) | 0;
        var ew =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(g, eh)) | 0) + Math.imul(y, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(y, eh)) | 0) + (i >>> 13)) | 0) +
            (ew >>> 26)) |
          0;

        ew &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, Y);
        i = ((i = Math.imul(W, Q)) + Math.imul(j, Y)) | 0;
        a = Math.imul(j, Q);
        r = (r + Math.imul(F, ee)) | 0;
        i = ((i = (i + Math.imul(F, et)) | 0) + Math.imul(O, ee)) | 0;
        a = (a + Math.imul(O, et)) | 0;
        r = (r + Math.imul(M, er)) | 0;
        i = ((i = (i + Math.imul(M, ei)) | 0) + Math.imul(L, er)) | 0;
        a = (a + Math.imul(L, ei)) | 0;
        r = (r + Math.imul(N, eo)) | 0;
        i = ((i = (i + Math.imul(N, es)) | 0) + Math.imul(I, eo)) | 0;
        a = (a + Math.imul(I, es)) | 0;
        r = (r + Math.imul(A, ec)) | 0;
        i = ((i = (i + Math.imul(A, ed)) | 0) + Math.imul(w, ec)) | 0;
        a = (a + Math.imul(w, ed)) | 0;
        r = (r + Math.imul(T, ep)) | 0;
        i = ((i = (i + Math.imul(T, e_)) | 0) + Math.imul(E, ep)) | 0;
        a = (a + Math.imul(E, e_)) | 0;
        r = (r + Math.imul(x, em)) | 0;
        var eD =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(x, eh)) | 0) + Math.imul(S, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(S, eh)) | 0) + (i >>> 13)) | 0) +
            (eD >>> 26)) |
          0;

        eD &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ee);
        i = ((i = Math.imul(W, et)) + Math.imul(j, ee)) | 0;
        a = Math.imul(j, et);
        r = (r + Math.imul(F, er)) | 0;
        i = ((i = (i + Math.imul(F, ei)) | 0) + Math.imul(O, er)) | 0;
        a = (a + Math.imul(O, ei)) | 0;
        r = (r + Math.imul(M, eo)) | 0;
        i = ((i = (i + Math.imul(M, es)) | 0) + Math.imul(L, eo)) | 0;
        a = (a + Math.imul(L, es)) | 0;
        r = (r + Math.imul(N, ec)) | 0;
        i = ((i = (i + Math.imul(N, ed)) | 0) + Math.imul(I, ec)) | 0;
        a = (a + Math.imul(I, ed)) | 0;
        r = (r + Math.imul(A, ep)) | 0;
        i = ((i = (i + Math.imul(A, e_)) | 0) + Math.imul(w, ep)) | 0;
        a = (a + Math.imul(w, e_)) | 0;
        r = (r + Math.imul(T, em)) | 0;
        var eN =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(T, eh)) | 0) + Math.imul(E, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(E, eh)) | 0) + (i >>> 13)) | 0) +
            (eN >>> 26)) |
          0;

        eN &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, er);
        i = ((i = Math.imul(W, ei)) + Math.imul(j, er)) | 0;
        a = Math.imul(j, ei);
        r = (r + Math.imul(F, eo)) | 0;
        i = ((i = (i + Math.imul(F, es)) | 0) + Math.imul(O, eo)) | 0;
        a = (a + Math.imul(O, es)) | 0;
        r = (r + Math.imul(M, ec)) | 0;
        i = ((i = (i + Math.imul(M, ed)) | 0) + Math.imul(L, ec)) | 0;
        a = (a + Math.imul(L, ed)) | 0;
        r = (r + Math.imul(N, ep)) | 0;
        i = ((i = (i + Math.imul(N, e_)) | 0) + Math.imul(I, ep)) | 0;
        a = (a + Math.imul(I, e_)) | 0;
        r = (r + Math.imul(A, em)) | 0;
        var eI =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(A, eh)) | 0) + Math.imul(w, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(w, eh)) | 0) + (i >>> 13)) | 0) +
            (eI >>> 26)) |
          0;

        eI &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, eo);
        i = ((i = Math.imul(W, es)) + Math.imul(j, eo)) | 0;
        a = Math.imul(j, es);
        r = (r + Math.imul(F, ec)) | 0;
        i = ((i = (i + Math.imul(F, ed)) | 0) + Math.imul(O, ec)) | 0;
        a = (a + Math.imul(O, ed)) | 0;
        r = (r + Math.imul(M, ep)) | 0;
        i = ((i = (i + Math.imul(M, e_)) | 0) + Math.imul(L, ep)) | 0;
        a = (a + Math.imul(L, e_)) | 0;
        r = (r + Math.imul(N, em)) | 0;
        var eP =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(N, eh)) | 0) + Math.imul(I, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(I, eh)) | 0) + (i >>> 13)) | 0) +
            (eP >>> 26)) |
          0;

        eP &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ec);
        i = ((i = Math.imul(W, ed)) + Math.imul(j, ec)) | 0;
        a = Math.imul(j, ed);
        r = (r + Math.imul(F, ep)) | 0;
        i = ((i = (i + Math.imul(F, e_)) | 0) + Math.imul(O, ep)) | 0;
        a = (a + Math.imul(O, e_)) | 0;
        r = (r + Math.imul(M, em)) | 0;
        var eM =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(M, eh)) | 0) + Math.imul(L, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(L, eh)) | 0) + (i >>> 13)) | 0) +
            (eM >>> 26)) |
          0;

        eM &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ep);
        i = ((i = Math.imul(W, e_)) + Math.imul(j, ep)) | 0;
        a = Math.imul(j, e_);
        r = (r + Math.imul(F, em)) | 0;
        var eL =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(F, eh)) | 0) + Math.imul(O, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(O, eh)) | 0) + (i >>> 13)) | 0) +
            (eL >>> 26)) |
          0;

        eL &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, em);
        var eR =
          (((c + r) | 0) +
            ((8191 & (i = ((i = Math.imul(W, eh)) + Math.imul(j, em)) | 0)) <<
              13)) |
          0;
        c = ((((a = Math.imul(j, eh)) + (i >>> 13)) | 0) + (eR >>> 26)) | 0;
        eR &= 67108863 /* 0x3ffffff */;
        n_words[0] = eg;
        n_words[1] = ey;
        n_words[2] = ev;
        n_words[3] = eb;
        n_words[4] = ex;
        n_words[5] = eS;
        n_words[6] = ek;
        n_words[7] = eT;
        n_words[8] = eE;
        n_words[9] = eC;
        n_words[10] = eA;
        n_words[11] = ew;
        n_words[12] = eD;
        n_words[13] = eN;
        n_words[14] = eI;
        n_words[15] = eP;
        n_words[16] = eM;
        n_words[17] = eL;
        n_words[18] = eR;

        if (c !== 0) {
          n_words[19] = c;
          n.length++;
        }

        return n;
      };
      function f(e, t, n) {
        return new m().mulp(e, t, n);
      }
      function m(e, t) {
        this.x = e;
        this.y = t;
      }

      if (!Math.imul) {
        _ = p;
      }

      a.prototype.mulTo = function (e, t) {
        var n = this.length + e.length;

        if (this.length === 10 && e.length === 10) {
          return _(this, e, t);
        }

        if (n < 63) {
          return p(this, e, t);
        }

        if (n < 1024) {
          return (function (e, t, n) {
            n.negative = t.negative ^ e.negative;
            n.length = e.length + t.length;
            for (var r = 0, i = 0, a = 0; a < n.length - 1; a++) {
              var o = i;
              i = 0;
              for (
                var s = 67108863 /* 0x3ffffff */ & r,
                  l = Math.min(a, t.length - 1),
                  c = Math.max(0, a - e.length + 1);
                c <= l;
                c++
              ) {
                var d = a - c;
                var u = (0 | e.words[d]) * (0 | t.words[c]);
                var p = 67108863 /* 0x3ffffff */ & u;
                o = (o + ((u / 67108864) /* 0x4000000 */ | 0)) | 0;
                s = 67108863 /* 0x3ffffff */ & (p = (p + s) | 0);
                i += (o = (o + (p >>> 26)) | 0) >>> 26;
                o &= 67108863 /* 0x3ffffff */;
              }
              n.words[a] = s;
              r = o;
              o = i;
            }

            if (r !== 0) {
              n.words[a] = r;
            } else {
              n.length--;
            }

            return n.strip();
          })(this, e, t);
        }

        return f(this, e, t);
      };

      m.prototype.makeRBT = function (e) {
        for (
          var t = Array(e), n = a.prototype._countBits(e) - 1, r = 0;
          r < e;
          r++
        ) {
          t[r] = this.revBin(r, n, e);
        }
        return t;
      };

      m.prototype.revBin = function (e, t, n) {
        if (e === 0 || e === n - 1) {
          return e;
        }
        for (var r = 0, i = 0; i < t; i++) {
          r |= (1 & e) << (t - i - 1);
          e >>= 1;
        }
        return r;
      };

      m.prototype.permute = function (e, t, n, r, i, a) {
        for (var o = 0; o < a; o++) {
          r[o] = t[e[o]];
          i[o] = n[e[o]];
        }
      };

      m.prototype.transform = function (e, t, n, r, i, a) {
        this.permute(a, e, t, n, r, i);
        for (var o = 1; o < i; o <<= 1) {
          for (
            var s = o << 1,
              l = Math.cos((2 * Math.PI) / s),
              c = Math.sin((2 * Math.PI) / s),
              d = 0;
            d < i;
            d += s
          ) {
            for (var u = l, p = c, _ = 0; _ < o; _++) {
              var f = n[d + _];
              var m = r[d + _];
              var h = n[d + _ + o];
              var g = r[d + _ + o];
              var y = u * h - p * g;
              g = u * g + p * h;
              h = y;
              n[d + _] = f + h;
              r[d + _] = m + g;
              n[d + _ + o] = f - h;
              r[d + _ + o] = m - g;

              if (_ !== s) {
                y = l * u - c * p;
                p = l * p + c * u;
                u = y;
              }
            }
          }
        }
      };

      m.prototype.guessLen13b = function (e, t) {
        var n = 1 | Math.max(t, e);
        var r = 1 & n;
        var i = 0;
        for (n = (n / 2) | 0; n; n >>>= 1) {
          i++;
        }
        return 1 << (i + 1 + r);
      };

      m.prototype.conjugate = function (e, t, n) {
        if (!(n <= 1)) {
          for (var r = 0; r < n / 2; r++) {
            var e_r = e[r];
            e[r] = e[n - r - 1];
            e[n - r - 1] = e_r;
            e_r = t[r];
            t[r] = -t[n - r - 1];
            t[n - r - 1] = -e_r;
          }
        }
      };

      m.prototype.normalize13b = function (e, t) {
        for (var n = 0, r = 0; r < t / 2; r++) {
          var i =
            8192 * Math.round(e[2 * r + 1] / t) + Math.round(e[2 * r] / t) + n;
          e[r] = 67108863 /* 0x3ffffff */ & i;
          n =
            i < 67108864 /* 0x4000000 */
              ? 0
              : (i / 67108864) /* 0x4000000 */ | 0;
        }
        return e;
      };

      m.prototype.convert13b = function (e, t, n, i) {
        for (var a = 0, o = 0; o < t; o++) {
          a += 0 | e[o];
          n[2 * o] = 8191 & a;
          a >>>= 13;
          n[2 * o + 1] = 8191 & a;
          a >>>= 13;
        }
        for (o = 2 * t; o < i; ++o) {
          n[o] = 0;
        }
        r(a === 0);
        r((-8192 & a) == 0);
      };

      m.prototype.stub = function (e) {
        for (var t = Array(e), n = 0; n < e; n++) {
          t[n] = 0;
        }
        return t;
      };

      m.prototype.mulp = function (e, t, n) {
        var r = 2 * this.guessLen13b(e.length, t.length);
        var i = this.makeRBT(r);
        var a = this.stub(r);
        var o = Array(r);
        var s = Array(r);
        var l = Array(r);
        var c = Array(r);
        var d = Array(r);
        var u = Array(r);
        var n_words = n.words;
        n_words.length = r;
        this.convert13b(e.words, e.length, o, r);
        this.convert13b(t.words, t.length, c, r);
        this.transform(o, a, s, l, r, i);
        this.transform(c, a, d, u, r, i);
        for (var _ = 0; _ < r; _++) {
          var f = s[_] * d[_] - l[_] * u[_];
          l[_] = s[_] * u[_] + l[_] * d[_];
          s[_] = f;
        }
        this.conjugate(s, l, r);
        this.transform(s, l, n_words, a, r, i);
        this.conjugate(n_words, a, r);
        this.normalize13b(n_words, r);
        n.negative = e.negative ^ t.negative;
        n.length = e.length + t.length;
        return n.strip();
      };

      a.prototype.mul = function (e) {
        var t = new a(null);
        t.words = Array(this.length + e.length);
        return this.mulTo(e, t);
      };

      a.prototype.mulf = function (e) {
        var t = new a(null);
        t.words = Array(this.length + e.length);
        return f(this, e, t);
      };

      a.prototype.imul = function (e) {
        return this.clone().mulTo(e, this);
      };

      a.prototype.imuln = function (e) {
        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);
        for (var t = 0, n = 0; n < this.length; n++) {
          var i = (0 | this.words[n]) * e;
          var a =
            (67108863 /* 0x3ffffff */ & i) + (67108863 /* 0x3ffffff */ & t);
          t >>= 26;
          t += ((i / 67108864) /* 0x4000000 */ | 0) + (a >>> 26);
          this.words[n] = 67108863 /* 0x3ffffff */ & a;
        }

        if (t !== 0) {
          this.words[n] = t;
          this.length++;
        }

        return this;
      };

      a.prototype.muln = function (e) {
        return this.clone().imuln(e);
      };

      a.prototype.sqr = function () {
        return this.mul(this);
      };

      a.prototype.isqr = function () {
        return this.imul(this.clone());
      };

      a.prototype.pow = function (e) {
        var t = (function (e) {
          for (var t = Array(e.bitLength()), n = 0; n < t.length; n++) {
            var r = (n / 26) | 0;
            var i = n % 26;
            t[n] = (e.words[r] & (1 << i)) >>> i;
          }
          return t;
        })(e);
        if (t.length === 0) {
          return new a(1);
        }
        for (
          var n = this, r = 0;
          r < t.length && t[r] === 0;
          r++, n = n.sqr()
        ) {}
        if (++r < t.length) {
          for (var i = n.sqr(); r < t.length; r++, i = i.sqr()) {
            if (t[r] !== 0) {
              n = n.mul(i);
            }
          }
        }
        return n;
      };

      a.prototype.iushln = function (e) {
        r(typeof e == "number" && e >= 0);
        var t;
        var n = e % 26;
        var i = (e - n) / 26;
        var a = (67108863 /* 0x3ffffff */ >>> (26 - n)) << (26 - n);
        if (n !== 0) {
          var o = 0;
          for (t = 0; t < this.length; t++) {
            var s = this.words[t] & a;
            var l = ((0 | this.words[t]) - s) << n;
            this.words[t] = l | o;
            o = s >>> (26 - n);
          }

          if (o) {
            this.words[t] = o;
            this.length++;
          }
        }
        if (i !== 0) {
          for (t = this.length - 1; t >= 0; t--) {
            this.words[t + i] = this.words[t];
          }
          for (t = 0; t < i; t++) {
            this.words[t] = 0;
          }
          this.length += i;
        }
        return this.strip();
      };

      a.prototype.ishln = function (e) {
        r(this.negative === 0);
        return this.iushln(e);
      };

      a.prototype.iushrn = function (e, t, n) {
        r(typeof e == "number" && e >= 0);
        var i = t ? (t - (t % 26)) / 26 : 0;
        var a = e % 26;
        var o = Math.min((e - a) / 26, this.length);
        var s =
          67108863 /* 0x3ffffff */ ^ ((67108863 /* 0x3ffffff */ >>> a) << a);
        i -= o;
        i = Math.max(0, i);

        if (n) {
          for (var l = 0; l < o; l++) {
            n.words[l] = this.words[l];
          }
          n.length = o;
        }

        if (o === 0) {
        } else if (this.length > o) {
          this.length -= o;

          for (l = 0; l < this.length; l++) {
            this.words[l] = this.words[l + o];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var c = 0;
        for (l = this.length - 1; l >= 0 && (c !== 0 || l >= i); l--) {
          var d = 0 | this.words[l];
          this.words[l] = (c << (26 - a)) | (d >>> a);
          c = d & s;
        }

        if (n && c !== 0) {
          n.words[n.length++] = c;
        }

        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }

        return this.strip();
      };

      a.prototype.ishrn = function (e, t, n) {
        r(this.negative === 0);
        return this.iushrn(e, t, n);
      };

      a.prototype.shln = function (e) {
        return this.clone().ishln(e);
      };

      a.prototype.ushln = function (e) {
        return this.clone().iushln(e);
      };

      a.prototype.shrn = function (e) {
        return this.clone().ishrn(e);
      };

      a.prototype.ushrn = function (e) {
        return this.clone().iushrn(e);
      };

      a.prototype.testn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = e % 26;
        var n = (e - t) / 26;
        return !(this.length <= n) && !!(this.words[n] & (1 << t));
      };

      a.prototype.imaskn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = e % 26;
        var n = (e - t) / 26;
        return (r(
          this.negative === 0,
          "imaskn works only with positive numbers"
        ),
        this.length <= n)
          ? this
          : (t !== 0 && n++,
            (this.length = Math.min(n, this.length)),
            t !== 0 &&
              (this.words[this.length - 1] &=
                67108863 /* 0x3ffffff */ ^
                ((67108863 /* 0x3ffffff */ >>> t) << t)),
            this.strip());
      };

      a.prototype.maskn = function (e) {
        return this.clone().imaskn(e);
      };

      a.prototype.iaddn = function (e) {
        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);

        if (e < 0) {
          return this.isubn(-e);
        }

        if (this.negative !== 0) {
          this.length === 1 && (0 | this.words[0]) < e
            ? ((this.words[0] = e - (0 | this.words[0])), (this.negative = 0))
            : ((this.negative = 0), this.isubn(e), (this.negative = 1));

          return this;
        }

        return this._iaddn(e);
      };

      a.prototype._iaddn = function (e) {
        this.words[0] += e;
        for (
          var t = 0;
          t < this.length && this.words[t] >= 67108864 /* 0x4000000 */;
          t++
        ) {
          this.words[t] -= 67108864 /* 0x4000000 */;

          if (t === this.length - 1) {
            this.words[t + 1] = 1;
          } else {
            this.words[t + 1]++;
          }
        }
        this.length = Math.max(this.length, t + 1);
        return this;
      };

      a.prototype.isubn = function (e) {
        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);

        if (e < 0) {
          return this.iaddn(-e);
        }

        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(e);
          this.negative = 1;
          return this;
        }
        this.words[0] -= e;

        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var t = 0; t < this.length && this.words[t] < 0; t++) {
            this.words[t] += 67108864 /* 0x4000000 */;
            this.words[t + 1] -= 1;
          }
        }

        return this.strip();
      };

      a.prototype.addn = function (e) {
        return this.clone().iaddn(e);
      };

      a.prototype.subn = function (e) {
        return this.clone().isubn(e);
      };

      a.prototype.iabs = function () {
        this.negative = 0;
        return this;
      };

      a.prototype.abs = function () {
        return this.clone().iabs();
      };

      a.prototype._ishlnsubmul = function (e, t, n) {
        var i;
        var a;
        var o = e.length + n;
        this._expand(o);
        var s = 0;
        for (i = 0; i < e.length; i++) {
          a = (0 | this.words[i + n]) + s;
          var l = (0 | e.words[i]) * t;
          a -= 67108863 /* 0x3ffffff */ & l;
          s = (a >> 26) - ((l / 67108864) /* 0x4000000 */ | 0);
          this.words[i + n] = 67108863 /* 0x3ffffff */ & a;
        }
        for (; i < this.length - n; i++) {
          s = (a = (0 | this.words[i + n]) + s) >> 26;
          this.words[i + n] = 67108863 /* 0x3ffffff */ & a;
        }
        if (s === 0) {
          return this.strip();
        }
        r(-1 === s);
        s = 0;

        for (i = 0; i < this.length; i++) {
          s = (a = -(0 | this.words[i]) + s) >> 26;
          this.words[i] = 67108863 /* 0x3ffffff */ & a;
        }

        this.negative = 1;
        return this.strip();
      };

      a.prototype._wordDiv = function (e, t) {
        var n;
        var r = this.length - e.length;
        var i = this.clone();
        var o = e;
        var s = 0 | o.words[o.length - 1];

        if (0 != (r = 26 - this._countBits(s))) {
          o = o.ushln(r);
          i.iushln(r);
          s = 0 | o.words[o.length - 1];
        }

        var l = i.length - o.length;
        if (t !== "mod") {
          n = new a(null);
          n.length = l + 1;
          n.words = Array(n.length);
          for (var c = 0; c < n.length; c++) {
            n.words[c] = 0;
          }
        }
        var d = i.clone()._ishlnsubmul(o, 1, l);

        if (d.negative === 0) {
          i = d;
          n && (n.words[l] = 1);
        }

        for (var u = l - 1; u >= 0; u--) {
          var p =
            (0 | i.words[o.length + u]) * 67108864 /* 0x4000000 */ +
            (0 | i.words[o.length + u - 1]);
          p = Math.min((p / s) | 0, 67108863 /* 0x3ffffff */);
          i._ishlnsubmul(o, p, u);

          while (i.negative !== 0) {
            p--;
            i.negative = 0;
            i._ishlnsubmul(o, 1, u);

            if (!i.isZero()) {
              i.negative ^= 1;
            }
          }

          if (n) {
            n.words[u] = p;
          }
        }

        if (n) {
          n.strip();
        }

        i.strip();

        if (t !== "div" && r !== 0) {
          i.iushrn(r);
        }

        return { div: n || null, mod: i };
      };

      a.prototype.divmod = function (e, t, n) {
        var i;
        var o;
        var s;
        r(!e.isZero());

        if (this.isZero()) {
          return { div: new a(0), mod: new a(0) };
        }

        if (this.negative !== 0 && e.negative === 0) {
          s = this.neg().divmod(e, t);
          t !== "mod" && (i = s.div.neg());

          t !== "div" &&
            ((o = s.mod.neg()), n && o.negative !== 0 && o.iadd(e));

          return { div: i, mod: o };
        }

        if (this.negative === 0 && e.negative !== 0) {
          s = this.divmod(e.neg(), t);
          t !== "mod" && (i = s.div.neg());
          return { div: i, mod: s.mod };
        }

        if ((this.negative & e.negative) != 0) {
          s = this.neg().divmod(e.neg(), t);

          t !== "div" &&
            ((o = s.mod.neg()), n && o.negative !== 0 && o.isub(e));

          return { div: s.div, mod: o };
        }

        if (e.length > this.length || this.cmp(e) < 0) {
          return { div: new a(0), mod: this };
        }

        if (e.length === 1) {
          if (t === "div") {
            return { div: this.divn(e.words[0]), mod: null };
          }

          if (t === "mod") {
            return {
              div: null,
              mod: new a(this.modn(e.words[0])),
            };
          }

          return {
            div: this.divn(e.words[0]),
            mod: new a(this.modn(e.words[0])),
          };
        }

        return this._wordDiv(e, t);
      };

      a.prototype.div = function (e) {
        return this.divmod(e, "div", false).div;
      };

      a.prototype.mod = function (e) {
        return this.divmod(e, "mod", false).mod;
      };

      a.prototype.umod = function (e) {
        return this.divmod(e, "mod", true).mod;
      };

      a.prototype.divRound = function (e) {
        var t = this.divmod(e);
        if (t.mod.isZero()) {
          return t.div;
        }
        var n = t.div.negative !== 0 ? t.mod.isub(e) : t.mod;
        var r = e.ushrn(1);
        var i = e.andln(1);
        var a = n.cmp(r);

        if (a < 0 || (i === 1 && a === 0)) {
          return t.div;
        }

        if (t.div.negative !== 0) {
          return t.div.isubn(1);
        }

        return t.div.iaddn(1);
      };

      a.prototype.modn = function (e) {
        r(e <= 67108863 /* 0x3ffffff */);
        for (
          var t = 67108864 /* 0x4000000 */ % e, n = 0, i = this.length - 1;
          i >= 0;
          i--
        ) {
          n = (t * n + (0 | this.words[i])) % e;
        }
        return n;
      };

      a.prototype.idivn = function (e) {
        r(e <= 67108863 /* 0x3ffffff */);
        for (var t = 0, n = this.length - 1; n >= 0; n--) {
          var i = (0 | this.words[n]) + 67108864 /* 0x4000000 */ * t;
          this.words[n] = (i / e) | 0;
          t = i % e;
        }
        return this.strip();
      };

      a.prototype.divn = function (e) {
        return this.clone().idivn(e);
      };

      a.prototype.egcd = function (e) {
        r(e.negative === 0);
        r(!e.isZero());
        var t = this;
        var n = e.clone();
        t = t.negative !== 0 ? t.umod(e) : t.clone();
        for (
          var i = new a(1), o = new a(0), s = new a(0), l = new a(1), c = 0;
          t.isEven() && n.isEven();

        ) {
          t.iushrn(1);
          n.iushrn(1);
          ++c;
        }
        for (var d = n.clone(), u = t.clone(); !t.isZero(); ) {
          for (
            var p = 0, _ = 1;
            (t.words[0] & _) == 0 && p < 26;
            ++p, _ <<= 1
          ) {}
          if (p > 0) {
            for (t.iushrn(p); p-- > 0; ) {
              if (i.isOdd() || o.isOdd()) {
                i.iadd(d);
                o.isub(u);
              }

              i.iushrn(1);
              o.iushrn(1);
            }
          }
          for (
            var f = 0, m = 1;
            (n.words[0] & m) == 0 && f < 26;
            ++f, m <<= 1
          ) {}
          if (f > 0) {
            for (n.iushrn(f); f-- > 0; ) {
              if (s.isOdd() || l.isOdd()) {
                s.iadd(d);
                l.isub(u);
              }

              s.iushrn(1);
              l.iushrn(1);
            }
          }

          if (t.cmp(n) >= 0) {
            t.isub(n);
            i.isub(s);
            o.isub(l);
          } else {
            n.isub(t);
            s.isub(i);
            l.isub(o);
          }
        }
        return { a: s, b: l, gcd: n.iushln(c) };
      };

      a.prototype._invmp = function (e) {
        r(e.negative === 0);
        r(!e.isZero());
        var t;
        var n = this;
        var i = e.clone();
        n = n.negative !== 0 ? n.umod(e) : n.clone();
        for (
          var o = new a(1), s = new a(0), l = i.clone();
          n.cmpn(1) > 0 && i.cmpn(1) > 0;

        ) {
          for (
            var c = 0, d = 1;
            (n.words[0] & d) == 0 && c < 26;
            ++c, d <<= 1
          ) {}
          if (c > 0) {
            for (n.iushrn(c); c-- > 0; ) {
              if (o.isOdd()) {
                o.iadd(l);
              }

              o.iushrn(1);
            }
          }
          for (
            var u = 0, p = 1;
            (i.words[0] & p) == 0 && u < 26;
            ++u, p <<= 1
          ) {}
          if (u > 0) {
            for (i.iushrn(u); u-- > 0; ) {
              if (s.isOdd()) {
                s.iadd(l);
              }

              s.iushrn(1);
            }
          }

          if (n.cmp(i) >= 0) {
            n.isub(i);
            o.isub(s);
          } else {
            i.isub(n);
            s.isub(o);
          }
        }

        if ((t = n.cmpn(1) === 0 ? o : s).cmpn(0) < 0) {
          t.iadd(e);
        }

        return t;
      };

      a.prototype.gcd = function (e) {
        if (this.isZero()) {
          return e.abs();
        }
        if (e.isZero()) {
          return this.abs();
        }
        var t = this.clone();
        var n = e.clone();
        t.negative = 0;
        n.negative = 0;
        for (var r = 0; t.isEven() && n.isEven(); r++) {
          t.iushrn(1);
          n.iushrn(1);
        }

        while (true) {
          while (t.isEven()) {
            t.iushrn(1);
          }

          while (n.isEven()) {
            n.iushrn(1);
          }

          var i = t.cmp(n);
          if (i < 0) {
            var a = t;
            t = n;
            n = a;
          } else if (i === 0 || n.cmpn(1) === 0) {
            break;
          }
          t.isub(n);
        }

        return n.iushln(r);
      };

      a.prototype.invm = function (e) {
        return this.egcd(e).a.umod(e);
      };

      a.prototype.isEven = function () {
        return (1 & this.words[0]) == 0;
      };

      a.prototype.isOdd = function () {
        return (1 & this.words[0]) == 1;
      };

      a.prototype.andln = function (e) {
        return this.words[0] & e;
      };

      a.prototype.bincn = function (e) {
        r(typeof e == "number");
        var t = e % 26;
        var n = (e - t) / 26;
        var i = 1 << t;
        if (this.length <= n) {
          this._expand(n + 1);
          this.words[n] |= i;
          return this;
        }
        for (var a = i, o = n; a !== 0 && o < this.length; o++) {
          var s = 0 | this.words[o];
          s += a;
          a = s >>> 26;
          s &= 67108863 /* 0x3ffffff */;
          this.words[o] = s;
        }

        if (a !== 0) {
          this.words[o] = a;
          this.length++;
        }

        return this;
      };

      a.prototype.isZero = function () {
        return this.length === 1 && this.words[0] === 0;
      };

      a.prototype.cmpn = function (e) {
        var t;
        var n = e < 0;
        if (this.negative !== 0 && !n) {
          return -1;
        }
        if (this.negative === 0 && n) {
          return 1;
        }
        this.strip();

        if (this.length > 1) {
          t = 1;
        } else {
          if (n) {
            e = -e;
          }

          r(e <= 67108863 /* 0x3ffffff */, "Number is too big");
          var i = 0 | this.words[0];
          t = i === e ? 0 : i < e ? -1 : 1;
        }

        return this.negative !== 0 ? 0 | -t : t;
      };

      a.prototype.cmp = function (e) {
        if (this.negative !== 0 && e.negative === 0) {
          return -1;
        }
        if (this.negative === 0 && e.negative !== 0) {
          return 1;
        }
        var t = this.ucmp(e);
        return this.negative !== 0 ? 0 | -t : t;
      };

      a.prototype.ucmp = function (e) {
        if (this.length > e.length) {
          return 1;
        }
        if (this.length < e.length) {
          return -1;
        }
        for (var t = 0, n = this.length - 1; n >= 0; n--) {
          var r = 0 | this.words[n];
          var i = 0 | e.words[n];
          if (r !== i) {
            if (r < i) {
              t = -1;
            } else if (r > i) {
              t = 1;
            }

            break;
          }
        }
        return t;
      };

      a.prototype.gtn = function (e) {
        return this.cmpn(e) === 1;
      };

      a.prototype.gt = function (e) {
        return this.cmp(e) === 1;
      };

      a.prototype.gten = function (e) {
        return this.cmpn(e) >= 0;
      };

      a.prototype.gte = function (e) {
        return this.cmp(e) >= 0;
      };

      a.prototype.ltn = function (e) {
        return -1 === this.cmpn(e);
      };

      a.prototype.lt = function (e) {
        return -1 === this.cmp(e);
      };

      a.prototype.lten = function (e) {
        return this.cmpn(e) <= 0;
      };

      a.prototype.lte = function (e) {
        return this.cmp(e) <= 0;
      };

      a.prototype.eqn = function (e) {
        return this.cmpn(e) === 0;
      };

      a.prototype.eq = function (e) {
        return this.cmp(e) === 0;
      };

      a.red = function (e) {
        return new k(e);
      };

      a.prototype.toRed = function (e) {
        r(!this.red, "Already a number in reduction context");
        r(this.negative === 0, "red works only with positives");
        return e.convertTo(this)._forceRed(e);
      };

      a.prototype.fromRed = function () {
        r(this.red, "fromRed works only with numbers in reduction context");

        return this.red.convertFrom(this);
      };

      a.prototype._forceRed = function (e) {
        this.red = e;
        return this;
      };

      a.prototype.forceRed = function (e) {
        r(!this.red, "Already a number in reduction context");
        return this._forceRed(e);
      };

      a.prototype.redAdd = function (e) {
        r(this.red, "redAdd works only with red numbers");
        return this.red.add(this, e);
      };

      a.prototype.redIAdd = function (e) {
        r(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, e);
      };

      a.prototype.redSub = function (e) {
        r(this.red, "redSub works only with red numbers");
        return this.red.sub(this, e);
      };

      a.prototype.redISub = function (e) {
        r(this.red, "redISub works only with red numbers");
        return this.red.isub(this, e);
      };

      a.prototype.redShl = function (e) {
        r(this.red, "redShl works only with red numbers");
        return this.red.shl(this, e);
      };

      a.prototype.redMul = function (e) {
        r(this.red, "redMul works only with red numbers");
        this.red._verify2(this, e);
        return this.red.mul(this, e);
      };

      a.prototype.redIMul = function (e) {
        r(this.red, "redMul works only with red numbers");
        this.red._verify2(this, e);
        return this.red.imul(this, e);
      };

      a.prototype.redSqr = function () {
        r(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };

      a.prototype.redISqr = function () {
        r(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };

      a.prototype.redSqrt = function () {
        r(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };

      a.prototype.redInvm = function () {
        r(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };

      a.prototype.redNeg = function () {
        r(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };

      a.prototype.redPow = function (e) {
        r(this.red && !e.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, e);
      };

      var h = { k256: null, p224: null, p192: null, p25519: null };
      function g(e, t) {
        this.name = e;
        this.p = new a(t, 16);
        this.n = this.p.bitLength();
        this.k = new a(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      function y() {
        g.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      function b() {
        g.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      function x() {
        g.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      function S() {
        g.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      function k(e) {
        if (typeof e == "string") {
          var t = a._prime(e);
          this.m = t.p;
          this.prime = t;
        } else {
          r(e.gtn(1), "modulus must be greater than 1");
          this.m = e;
          this.prime = null;
        }
      }
      function T(e) {
        k.call(this, e);
        this.shift = this.m.bitLength();

        if (this.shift % 26 != 0) {
          this.shift += 26 - (this.shift % 26);
        }

        this.r = new a(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }

      g.prototype._tmp = function () {
        var e = new a(null);
        e.words = Array(Math.ceil(this.n / 13));
        return e;
      };

      g.prototype.ireduce = function (e) {
        var t;
        var n = e;
        do {
          this.split(n, this.tmp);
          t = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength();
        } while (t > this.n);
        var r = t < this.n ? -1 : n.ucmp(this.p);

        if (r === 0) {
          n.words[0] = 0;
          n.length = 1;
        } else if (r > 0) {
          n.isub(this.p);
        } else if (n.strip !== undefined) {
          n.strip();
        } else {
          n._strip();
        }

        return n;
      };

      g.prototype.split = function (e, t) {
        e.iushrn(this.n, 0, t);
      };

      g.prototype.imulK = function (e) {
        return e.imul(this.k);
      };

      i(y, g);

      y.prototype.split = function (e, t) {
        for (var n = Math.min(e.length, 9), r = 0; r < n; r++) {
          t.words[r] = e.words[r];
        }
        t.length = n;

        if (e.length <= 9) {
          e.words[0] = 0;
          e.length = 1;
          return;
        }

        var i = e.words[9];
        r = 10;

        for (t.words[t.length++] = 4194303 & i; r < e.length; r++) {
          var a = 0 | e.words[r];
          e.words[r - 10] = ((4194303 & a) << 4) | (i >>> 22);
          i = a;
        }

        i >>>= 22;
        e.words[r - 10] = i;

        if (i === 0 && e.length > 10) {
          e.length -= 10;
        } else {
          e.length -= 9;
        }
      };

      y.prototype.imulK = function (e) {
        e.words[e.length] = 0;
        e.words[e.length + 1] = 0;
        e.length += 2;
        for (var t = 0, n = 0; n < e.length; n++) {
          var r = 0 | e.words[n];
          t += 977 * r;
          e.words[n] = 67108863 /* 0x3ffffff */ & t;
          t = 64 * r + ((t / 67108864) /* 0x4000000 */ | 0);
        }

        if (e.words[e.length - 1] === 0) {
          e.length--;
          e.words[e.length - 1] === 0 && e.length--;
        }

        return e;
      };

      i(b, g);
      i(x, g);
      i(S, g);

      S.prototype.imulK = function (e) {
        for (var t = 0, n = 0; n < e.length; n++) {
          var r = (0 | e.words[n]) * 19 + t;
          var i = 67108863 /* 0x3ffffff */ & r;
          r >>>= 26;
          e.words[n] = i;
          t = r;
        }

        if (t !== 0) {
          e.words[e.length++] = t;
        }

        return e;
      };

      a._prime = function (e) {
        var t;
        if (h[e]) {
          return h[e];
        }
        if (e === "k256") {
          t = new y();
        } else if (e === "p224") {
          t = new b();
        } else if (e === "p192") {
          t = new x();
        } else if (e === "p25519") {
          t = new S();
        } else {
          throw Error("Unknown prime " + e);
        }
        h[e] = t;
        return t;
      };

      k.prototype._verify1 = function (e) {
        r(e.negative === 0, "red works only with positives");
        r(e.red, "red works only with red numbers");
      };

      k.prototype._verify2 = function (e, t) {
        r((e.negative | t.negative) == 0, "red works only with positives");
        r(e.red && e.red === t.red, "red works only with red numbers");
      };

      k.prototype.imod = function (e) {
        return this.prime
          ? this.prime.ireduce(e)._forceRed(this)
          : e.umod(this.m)._forceRed(this);
      };

      k.prototype.neg = function (e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      };

      k.prototype.add = function (e, t) {
        this._verify2(e, t);
        var n = e.add(t);

        if (n.cmp(this.m) >= 0) {
          n.isub(this.m);
        }

        return n._forceRed(this);
      };

      k.prototype.iadd = function (e, t) {
        this._verify2(e, t);
        var n = e.iadd(t);

        if (n.cmp(this.m) >= 0) {
          n.isub(this.m);
        }

        return n;
      };

      k.prototype.sub = function (e, t) {
        this._verify2(e, t);
        var n = e.sub(t);

        if (n.cmpn(0) < 0) {
          n.iadd(this.m);
        }

        return n._forceRed(this);
      };

      k.prototype.isub = function (e, t) {
        this._verify2(e, t);
        var n = e.isub(t);

        if (n.cmpn(0) < 0) {
          n.iadd(this.m);
        }

        return n;
      };

      k.prototype.shl = function (e, t) {
        this._verify1(e);
        return this.imod(e.ushln(t));
      };

      k.prototype.imul = function (e, t) {
        this._verify2(e, t);
        return this.imod(e.imul(t));
      };

      k.prototype.mul = function (e, t) {
        this._verify2(e, t);
        return this.imod(e.mul(t));
      };

      k.prototype.isqr = function (e) {
        return this.imul(e, e.clone());
      };

      k.prototype.sqr = function (e) {
        return this.mul(e, e);
      };

      k.prototype.sqrt = function (e) {
        if (e.isZero()) {
          return e.clone();
        }
        var t = this.m.andln(3);
        r(t % 2 == 1);

        if (t === 3) {
          var n = this.m.add(new a(1)).iushrn(2);
          return this.pow(e, n);
        }

        for (var i = this.m.subn(1), o = 0; !i.isZero() && i.andln(1) === 0; ) {
          o++;
          i.iushrn(1);
        }
        r(!i.isZero());
        var s = new a(1).toRed(this);
        var l = s.redNeg();
        var c = this.m.subn(1).iushrn(1);
        var d = this.m.bitLength();
        for (d = new a(2 * d * d).toRed(this); this.pow(d, c).cmp(l) !== 0; ) {
          d.redIAdd(l);
        }
        for (
          var u = this.pow(d, i),
            p = this.pow(e, i.addn(1).iushrn(1)),
            _ = this.pow(e, i),
            f = o;
          _.cmp(s) !== 0;

        ) {
          for (var m = _, h = 0; m.cmp(s) !== 0; h++) {
            m = m.redSqr();
          }
          r(h < f);
          var g = this.pow(u, new a(1).iushln(f - h - 1));
          p = p.redMul(g);
          u = g.redSqr();
          _ = _.redMul(u);
          f = h;
        }
        return p;
      };

      k.prototype.invm = function (e) {
        var t = e._invmp(this.m);
        return t.negative !== 0
          ? ((t.negative = 0), this.imod(t).redNeg())
          : this.imod(t);
      };

      k.prototype.pow = function (e, t) {
        if (t.isZero()) {
          return new a(1).toRed(this);
        }
        if (t.cmpn(1) === 0) {
          return e.clone();
        }
        var n = Array(16);
        n[0] = new a(1).toRed(this);
        n[1] = e;
        for (var r = 2; r < n.length; r++) {
          n[r] = this.mul(n[r - 1], e);
        }
        var [i] = n;
        var o = 0;
        var s = 0;
        var l = t.bitLength() % 26;

        if (l === 0) {
          l = 26;
        }

        for (r = t.length - 1; r >= 0; r--) {
          for (var c = t.words[r], d = l - 1; d >= 0; d--) {
            var u = (c >> d) & 1;

            if (i !== n[0]) {
              i = this.sqr(i);
            }

            if (u === 0 && o === 0) {
              s = 0;
              continue;
            }

            o <<= 1;
            o |= u;

            if (4 == ++s || (r === 0 && d === 0)) {
              i = this.mul(i, n[o]);
              s = 0;
              o = 0;
            }
          }
          l = 26;
        }

        return i;
      };

      k.prototype.convertTo = function (e) {
        var t = e.umod(this.m);
        return t === e ? t.clone() : t;
      };

      k.prototype.convertFrom = function (e) {
        var t = e.clone();
        t.red = null;
        return t;
      };

      a.mont = function (e) {
        return new T(e);
      };

      i(T, k);

      T.prototype.convertTo = function (e) {
        return this.imod(e.ushln(this.shift));
      };

      T.prototype.convertFrom = function (e) {
        var t = this.imod(e.mul(this.rinv));
        t.red = null;
        return t;
      };

      T.prototype.imul = function (e, t) {
        if (e.isZero() || t.isZero()) {
          e.words[0] = 0;
          e.length = 1;
          return e;
        }
        var n = e.imul(t);

        var r = n
          .maskn(this.shift)
          .mul(this.minv)
          .imaskn(this.shift)
          .mul(this.m);

        var i = n.isub(r).iushrn(this.shift);
        var a = i;

        if (i.cmp(this.m) >= 0) {
          a = i.isub(this.m);
        } else if (i.cmpn(0) < 0) {
          a = i.iadd(this.m);
        }

        return a._forceRed(this);
      };

      T.prototype.mul = function (e, t) {
        if (e.isZero() || t.isZero()) {
          return new a(0)._forceRed(this);
        }
        var n = e.mul(t);

        var r = n
          .maskn(this.shift)
          .mul(this.minv)
          .imaskn(this.shift)
          .mul(this.m);

        var i = n.isub(r).iushrn(this.shift);
        var o = i;

        if (i.cmp(this.m) >= 0) {
          o = i.isub(this.m);
        } else if (i.cmpn(0) < 0) {
          o = i.iadd(this.m);
        }

        return o._forceRed(this);
      };

      T.prototype.invm = function (e) {
        return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
      };
    })((e = n.nmd(e)), this);
  },
  1670: function (e, t, n) {
    !(function (e, t) {
      function r(e, t) {
        if (!e) {
          throw Error(t || "Assertion failed");
        }
      }
      function i(e, t) {
        e.super_ = t;
        var n = function () {};
        n.prototype = t.prototype;
        e.prototype = new n();
        e.prototype.constructor = e;
      }
      function a(e, t, n) {
        if (a.isBN(e)) {
          return e;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;

        if (e !== null) {
          (t === "le" || t === "be") && ((n = t), (t = 10));
          this._init(e || 0, t || 10, n || "be");
        }
      }

      if (typeof e == "object") {
        e.exports = a;
      } else {
        t.BN = a;
      }

      a.BN = a;
      a.wordSize = 26;
      try {
        d = n(4300).Buffer;
      } catch (e) {}
      function o(e, t, n) {
        for (var i = 0, a = Math.min(e.length, n), o = 0, s = t; s < a; s++) {
          var l;
          var c = e.charCodeAt(s) - 48;
          i <<= 4;

          i |= l =
            c >= 49 && c <= 54
              ? c - 49 + 10
              : c >= 17 && c <= 22
              ? c - 17 + 10
              : c;

          o |= l;
        }
        r(!(240 & o), "Invalid character in " + e);
        return i;
      }
      function s(e, t, n, i) {
        for (var a = 0, o = 0, s = Math.min(e.length, n), l = t; l < s; l++) {
          var c = e.charCodeAt(l) - 48;
          a *= i;
          o = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c;
          r(c >= 0 && o < i, "Invalid character");
          a += o;
        }
        return a;
      }
      function l(e, t) {
        e.words = t.words;
        e.length = t.length;
        e.negative = t.negative;
        e.red = t.red;
      }
      function c() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }

      a.isBN = function (e) {
        return (
          e instanceof a ||
          (e !== null &&
            typeof e == "object" &&
            e.constructor.wordSize === a.wordSize &&
            Array.isArray(e.words))
        );
      };

      a.max = function (e, t) {
        return e.cmp(t) > 0 ? e : t;
      };

      a.min = function (e, t) {
        return e.cmp(t) < 0 ? e : t;
      };

      a.prototype._init = function (e, t, n) {
        if (typeof e == "number") {
          return this._initNumber(e, t, n);
        }
        if (typeof e == "object") {
          return this._initArray(e, t, n);
        }

        if (t === "hex") {
          t = 16;
        }

        r(t === (0 | t) && t >= 2 && t <= 36);
        var i = 0;

        if ((e = e.toString().replace(/\s+/g, ""))[0] === "-") {
          i++;
        }

        if (t === 16) {
          this._parseHex(e, i);
        } else {
          this._parseBase(e, t, i);
        }

        if (e[0] === "-") {
          this.negative = 1;
        }

        this._strip();

        if (n === "le") {
          this._initArray(this.toArray(), t, n);
        }
      };

      a.prototype._initNumber = function (e, t, n) {
        if (e < 0) {
          this.negative = 1;
          e = -e;
        }

        if (e < 67108864 /* 0x4000000 */) {
          this.words = [67108863 /* 0x3ffffff */ & e];
          this.length = 1;
        } else if (e < 4503599627370496 /* 0x10000000000000 */) {
          this.words = [
            67108863 /* 0x3ffffff */ & e,
            (e / 67108864) /* 0x4000000 */ & 67108863 /* 0x3ffffff */,
          ];
          this.length = 2;
        } else {
          r(e < 9007199254740992 /* 0x20000000000000 */);

          this.words = [
            67108863 /* 0x3ffffff */ & e,
            (e / 67108864) /* 0x4000000 */ & 67108863 /* 0x3ffffff */,
            1,
          ];

          this.length = 3;
        }

        if (n === "le") {
          this._initArray(this.toArray(), t, n);
        }
      };

      a.prototype._initArray = function (e, t, n) {
        r(typeof e.length == "number");

        if (e.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }

        this.length = Math.ceil(e.length / 3);
        this.words = Array(this.length);
        for (var i, a, o = 0; o < this.length; o++) {
          this.words[o] = 0;
        }
        var s = 0;
        if (n === "be") {
          o = e.length - 1;

          for (i = 0; o >= 0; o -= 3) {
            a = e[o] | (e[o - 1] << 8) | (e[o - 2] << 16);
            this.words[i] |= (a << s) & 67108863 /* 0x3ffffff */;
            this.words[i + 1] = (a >>> (26 - s)) & 67108863 /* 0x3ffffff */;

            if ((s += 24) >= 26) {
              s -= 26;
              i++;
            }
          }
        } else if (n === "le") {
          o = 0;

          for (i = 0; o < e.length; o += 3) {
            a = e[o] | (e[o + 1] << 8) | (e[o + 2] << 16);
            this.words[i] |= (a << s) & 67108863 /* 0x3ffffff */;
            this.words[i + 1] = (a >>> (26 - s)) & 67108863 /* 0x3ffffff */;

            if ((s += 24) >= 26) {
              s -= 26;
              i++;
            }
          }
        }
        return this._strip();
      };

      a.prototype._parseHex = function (e, t) {
        this.length = Math.ceil((e.length - t) / 6);
        this.words = Array(this.length);
        for (var n, r, i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var a = 0;
        i = e.length - 6;

        for (n = 0; i >= t; i -= 6) {
          r = o(e, i, i + 6);
          this.words[n] |= (r << a) & 67108863 /* 0x3ffffff */;
          this.words[n + 1] |= (r >>> (26 - a)) & 4194303;

          if ((a += 24) >= 26) {
            a -= 26;
            n++;
          }
        }

        if (i + 6 !== t) {
          r = o(e, t, i + 6);
          this.words[n] |= (r << a) & 67108863 /* 0x3ffffff */;
          this.words[n + 1] |= (r >>> (26 - a)) & 4194303;
        }

        this._strip();
      };

      a.prototype._parseBase = function (e, t, n) {
        this.words = [0];
        this.length = 1;
        for (var r = 0, i = 1; i <= 67108863 /* 0x3ffffff */; i *= t) {
          r++;
        }
        r--;
        i = (i / t) | 0;
        for (
          var a = e.length - n,
            o = a % r,
            l = Math.min(a, a - o) + n,
            c = 0,
            d = n;
          d < l;
          d += r
        ) {
          c = s(e, d, d + r, t);
          this.imuln(i);

          if (this.words[0] + c < 67108864 /* 0x4000000 */) {
            this.words[0] += c;
          } else {
            this._iaddn(c);
          }
        }
        if (o !== 0) {
          var u = 1;
          c = s(e, d, e.length, t);

          for (d = 0; d < o; d++) {
            u *= t;
          }

          this.imuln(u);

          if (this.words[0] + c < 67108864 /* 0x4000000 */) {
            this.words[0] += c;
          } else {
            this._iaddn(c);
          }
        }
      };

      a.prototype.copy = function (e) {
        e.words = Array(this.length);
        for (var t = 0; t < this.length; t++) {
          e.words[t] = this.words[t];
        }
        e.length = this.length;
        e.negative = this.negative;
        e.red = this.red;
      };

      a.prototype._move = function (e) {
        l(e, this);
      };

      a.prototype.clone = function () {
        var e = new a(null);
        this.copy(e);
        return e;
      };

      a.prototype._expand = function (e) {
        while (this.length < e) {
          this.words[this.length++] = 0;
        }

        return this;
      };

      a.prototype._strip = function () {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }

        return this._normSign();
      };

      a.prototype._normSign = function () {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }

        return this;
      };

      if (typeof Symbol != "undefined" && typeof Symbol.for == "function") {
        a.prototype[Symbol.for("nodejs.util.inspect.custom")] = c;
      } else {
        a.prototype.inspect = c;
      }

      var d;

      var u = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000",
      ];

      var p = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ];

      var _ = [
        0, 0, 33554432 /* 0x2000000 */, 43046721 /* 0x290d741 */,
        16777216 /* 0x1000000 */, 48828125 /* 0x2e90edd */,
        60466176 /* 0x39aa400 */, 40353607 /* 0x267bf47 */,
        16777216 /* 0x1000000 */, 43046721 /* 0x290d741 */, 10000000 /* 1e7 */,
        19487171 /* 0x12959c3 */, 35831808 /* 0x222c000 */,
        62748517 /* 0x3bd7765 */, 7529536, 11390625 /* 0xadcea1 */,
        16777216 /* 0x1000000 */, 24137569 /* 0x1704f61 */,
        34012224 /* 0x206fc40 */, 47045881 /* 0x2cddcf9 */, 64000000 /* 64e6 */,
        4084101, 5153632, 6436343, 7962624, 9765625, 11881376 /* 0xb54ba0 */,
        14348907 /* 0xdaf26b */, 17210368 /* 0x1069c00 */,
        20511149 /* 0x138f9ad */, 24300000 /* 243e5 */,
        28629151 /* 0x1b4d89f */, 33554432 /* 0x2000000 */,
        39135393 /* 0x25528a1 */, 45435424 /* 0x2b54a20 */,
        52521875 /* 0x3216b93 */, 60466176 /* 0x39aa400 */,
      ];

      function f(e, t, n) {
        n.negative = t.negative ^ e.negative;
        var r = (e.length + t.length) | 0;
        n.length = r;
        r = (r - 1) | 0;
        var i = 0 | e.words[0];
        var a = 0 | t.words[0];
        var o = i * a;
        var s = 67108863 /* 0x3ffffff */ & o;
        var l = (o / 67108864) /* 0x4000000 */ | 0;
        n.words[0] = s;
        for (var c = 1; c < r; c++) {
          for (
            var d = l >>> 26,
              u = 67108863 /* 0x3ffffff */ & l,
              p = Math.min(c, t.length - 1),
              _ = Math.max(0, c - e.length + 1);
            _ <= p;
            _++
          ) {
            var f = (c - _) | 0;

            d +=
              ((o = (i = 0 | e.words[f]) * (a = 0 | t.words[_]) + u) /
                67108864) /* 0x4000000 */ |
              0;

            u = 67108863 /* 0x3ffffff */ & o;
          }
          n.words[c] = 0 | u;
          l = 0 | d;
        }

        if (l !== 0) {
          n.words[c] = 0 | l;
        } else {
          n.length--;
        }

        return n._strip();
      }

      a.prototype.toString = function (e, t) {
        t = 0 | t || 1;

        if (16 === (e = e || 10) || e === "hex") {
          for (var n = "", i = 0, a = 0, o = 0; o < this.length; o++) {
            var s = this.words[o];
            var l = (((s << i) | a) & 16777215) /* 0xffffff */
              .toString(16);

            n =
              0 != (a = (s >>> (24 - i)) & 16777215) /* 0xffffff */ ||
              o !== this.length - 1
                ? u[6 - l.length] + l + n
                : l + n;

            if ((i += 2) >= 26) {
              i -= 26;
              o--;
            }
          }
          for (a !== 0 && (n = a.toString(16) + n); n.length % t != 0; ) {
            n = "0" + n;
          }

          if (this.negative !== 0) {
            n = "-" + n;
          }

          return n;
        }

        if (e === (0 | e) && e >= 2 && e <= 36) {
          var p_e = p[e];
          var _e = _[e];
          n = "";
          var f = this.clone();
          for (f.negative = 0; !f.isZero(); ) {
            var m = f.modrn(_e).toString(e);
            n = (f = f.idivn(_e)).isZero() ? m + n : u[p_e - m.length] + m + n;
          }
          for (this.isZero() && (n = "0" + n); n.length % t != 0; ) {
            n = "0" + n;
          }

          if (this.negative !== 0) {
            n = "-" + n;
          }

          return n;
        }
        r(false, "Base should be between 2 and 36");
      };

      a.prototype.toNumber = function () {
        var e = this.words[0];

        if (this.length === 2) {
          e += 67108864 /* 0x4000000 */ * this.words[1];
        } else if (this.length === 3 && this.words[2] === 1) {
          e +=
            4503599627370496 /* 0x10000000000000 */ +
            67108864 /* 0x4000000 */ * this.words[1];
        } else if (this.length > 2) {
          r(false, "Number can only safely store up to 53 bits");
        }

        return this.negative !== 0 ? -e : e;
      };

      a.prototype.toJSON = function () {
        return this.toString(16, 2);
      };

      if (d) {
        a.prototype.toBuffer = function (e, t) {
          return this.toArrayLike(d, e, t);
        };
      }

      a.prototype.toArray = function (e, t) {
        return this.toArrayLike(Array, e, t);
      };

      a.prototype.toArrayLike = function (e, t, n) {
        this._strip();
        var i = this.byteLength();
        var a = n || Math.max(1, i);
        r(i <= a, "byte array longer than desired length");
        r(a > 0, "Requested array length <= 0");
        var o = e.allocUnsafe ? e.allocUnsafe(a) : new e(a);
        this["_toArrayLike" + (t === "le" ? "LE" : "BE")](o, i);
        return o;
      };

      a.prototype._toArrayLikeLE = function (e, t) {
        for (var n = 0, r = 0, i = 0, a = 0; i < this.length; i++) {
          var o = (this.words[i] << a) | r;
          e[n++] = 255 & o;

          if (n < e.length) {
            e[n++] = (o >> 8) & 255;
          }

          if (n < e.length) {
            e[n++] = (o >> 16) & 255;
          }

          if (a === 6) {
            n < e.length && (e[n++] = (o >> 24) & 255);
            r = 0;
            a = 0;
          } else {
            r = o >>> 24;
            a += 2;
          }
        }
        if (n < e.length) {
          for (e[n++] = r; n < e.length; ) {
            e[n++] = 0;
          }
        }
      };

      a.prototype._toArrayLikeBE = function (e, t) {
        for (var n = e.length - 1, r = 0, i = 0, a = 0; i < this.length; i++) {
          var o = (this.words[i] << a) | r;
          e[n--] = 255 & o;

          if (n >= 0) {
            e[n--] = (o >> 8) & 255;
          }

          if (n >= 0) {
            e[n--] = (o >> 16) & 255;
          }

          if (a === 6) {
            n >= 0 && (e[n--] = (o >> 24) & 255);
            r = 0;
            a = 0;
          } else {
            r = o >>> 24;
            a += 2;
          }
        }
        if (n >= 0) {
          for (e[n--] = r; n >= 0; ) {
            e[n--] = 0;
          }
        }
      };

      if (Math.clz32) {
        a.prototype._countBits = function (e) {
          return 32 - Math.clz32(e);
        };
      } else {
        a.prototype._countBits = function (e) {
          var t = e;
          var n = 0;

          if (t >= 4096) {
            n += 13;
            t >>>= 13;
          }

          if (t >= 64) {
            n += 7;
            t >>>= 7;
          }

          if (t >= 8) {
            n += 4;
            t >>>= 4;
          }

          if (t >= 2) {
            n += 2;
            t >>>= 2;
          }

          return n + t;
        };
      }

      a.prototype._zeroBits = function (e) {
        if (e === 0) {
          return 26;
        }
        var t = e;
        var n = 0;

        if ((8191 & t) == 0) {
          n += 13;
          t >>>= 13;
        }

        if ((127 & t) == 0) {
          n += 7;
          t >>>= 7;
        }

        if ((15 & t) == 0) {
          n += 4;
          t >>>= 4;
        }

        if ((3 & t) == 0) {
          n += 2;
          t >>>= 2;
        }

        if ((1 & t) == 0) {
          n++;
        }

        return n;
      };

      a.prototype.bitLength = function () {
        var e = this.words[this.length - 1];
        var t = this._countBits(e);
        return (this.length - 1) * 26 + t;
      };

      a.prototype.zeroBits = function () {
        if (this.isZero()) {
          return 0;
        }
        for (var e = 0, t = 0; t < this.length; t++) {
          var n = this._zeroBits(this.words[t]);
          e += n;

          if (n !== 26) {
            break;
          }
        }
        return e;
      };

      a.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      };

      a.prototype.toTwos = function (e) {
        return this.negative !== 0
          ? this.abs().inotn(e).iaddn(1)
          : this.clone();
      };

      a.prototype.fromTwos = function (e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      };

      a.prototype.isNeg = function () {
        return this.negative !== 0;
      };

      a.prototype.neg = function () {
        return this.clone().ineg();
      };

      a.prototype.ineg = function () {
        if (!this.isZero()) {
          this.negative ^= 1;
        }

        return this;
      };

      a.prototype.iuor = function (e) {
        while (this.length < e.length) {
          this.words[this.length++] = 0;
        }

        for (var t = 0; t < e.length; t++) {
          this.words[t] = this.words[t] | e.words[t];
        }
        return this._strip();
      };

      a.prototype.ior = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuor(e);
      };

      a.prototype.or = function (e) {
        return this.length > e.length
          ? this.clone().ior(e)
          : e.clone().ior(this);
      };

      a.prototype.uor = function (e) {
        return this.length > e.length
          ? this.clone().iuor(e)
          : e.clone().iuor(this);
      };

      a.prototype.iuand = function (e) {
        var t;
        t = this.length > e.length ? e : this;
        for (var n = 0; n < t.length; n++) {
          this.words[n] = this.words[n] & e.words[n];
        }
        this.length = t.length;
        return this._strip();
      };

      a.prototype.iand = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuand(e);
      };

      a.prototype.and = function (e) {
        return this.length > e.length
          ? this.clone().iand(e)
          : e.clone().iand(this);
      };

      a.prototype.uand = function (e) {
        return this.length > e.length
          ? this.clone().iuand(e)
          : e.clone().iuand(this);
      };

      a.prototype.iuxor = function (e) {
        if (this.length > e.length) {
          t = this;
          n = e;
        } else {
          t = e;
          n = this;
        }

        for (var t, n, r = 0; r < n.length; r++) {
          this.words[r] = t.words[r] ^ n.words[r];
        }
        if (this !== t) {
          for (; r < t.length; r++) {
            this.words[r] = t.words[r];
          }
        }
        this.length = t.length;
        return this._strip();
      };

      a.prototype.ixor = function (e) {
        r((this.negative | e.negative) == 0);
        return this.iuxor(e);
      };

      a.prototype.xor = function (e) {
        return this.length > e.length
          ? this.clone().ixor(e)
          : e.clone().ixor(this);
      };

      a.prototype.uxor = function (e) {
        return this.length > e.length
          ? this.clone().iuxor(e)
          : e.clone().iuxor(this);
      };

      a.prototype.inotn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = 0 | Math.ceil(e / 26);
        var n = e % 26;
        this._expand(t);

        if (n > 0) {
          t--;
        }

        for (var i = 0; i < t; i++) {
          this.words[i] = 67108863 /* 0x3ffffff */ & ~this.words[i];
        }

        if (n > 0) {
          this.words[i] =
            ~this.words[i] & (67108863 /* 0x3ffffff */ >> (26 - n));
        }

        return this._strip();
      };

      a.prototype.notn = function (e) {
        return this.clone().inotn(e);
      };

      a.prototype.setn = function (e, t) {
        r(typeof e == "number" && e >= 0);
        var n = (e / 26) | 0;
        var i = e % 26;
        this._expand(n + 1);

        if (t) {
          this.words[n] = this.words[n] | (1 << i);
        } else {
          this.words[n] = this.words[n] & ~(1 << i);
        }

        return this._strip();
      };

      a.prototype.iadd = function (e) {
        if (this.negative !== 0 && e.negative === 0) {
          this.negative = 0;
          t = this.isub(e);
          this.negative ^= 1;
          return this._normSign();
        }
        if (this.negative === 0 && e.negative !== 0) {
          e.negative = 0;
          t = this.isub(e);
          e.negative = 1;
          return t._normSign();
        }

        if (this.length > e.length) {
          n = this;
          r = e;
        } else {
          n = e;
          r = this;
        }

        for (var t, n, r, i = 0, a = 0; a < r.length; a++) {
          t = (0 | n.words[a]) + (0 | r.words[a]) + i;
          this.words[a] = 67108863 /* 0x3ffffff */ & t;
          i = t >>> 26;
        }
        for (; i !== 0 && a < n.length; a++) {
          t = (0 | n.words[a]) + i;
          this.words[a] = 67108863 /* 0x3ffffff */ & t;
          i = t >>> 26;
        }
        this.length = n.length;

        if (i !== 0) {
          this.words[this.length] = i;
          this.length++;
        } else if (n !== this) {
          for (; a < n.length; a++) {
            this.words[a] = n.words[a];
          }
        }

        return this;
      };

      a.prototype.add = function (e) {
        var t;

        if (e.negative !== 0 && this.negative === 0) {
          e.negative = 0;
          t = this.sub(e);
          e.negative ^= 1;
          return t;
        }

        if (e.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          t = e.sub(this);
          this.negative = 1;
          return t;
        }

        if (this.length > e.length) {
          return this.clone().iadd(e);
        }

        return e.clone().iadd(this);
      };

      a.prototype.isub = function (e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var t;
          var n;
          var r = this.iadd(e);
          e.negative = 1;
          return r._normSign();
        }
        if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(e);
          this.negative = 1;
          return this._normSign();
        }
        var i = this.cmp(e);
        if (i === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }

        if (i > 0) {
          t = this;
          n = e;
        } else {
          t = e;
          n = this;
        }

        for (var a = 0, o = 0; o < n.length; o++) {
          a = (r = (0 | t.words[o]) - (0 | n.words[o]) + a) >> 26;
          this.words[o] = 67108863 /* 0x3ffffff */ & r;
        }
        for (; a !== 0 && o < t.length; o++) {
          a = (r = (0 | t.words[o]) + a) >> 26;
          this.words[o] = 67108863 /* 0x3ffffff */ & r;
        }
        if (a === 0 && o < t.length && t !== this) {
          for (; o < t.length; o++) {
            this.words[o] = t.words[o];
          }
        }
        this.length = Math.max(this.length, o);

        if (t !== this) {
          this.negative = 1;
        }

        return this._strip();
      };

      a.prototype.sub = function (e) {
        return this.clone().isub(e);
      };

      var m = function (e, t, n) {
        var r;
        var i;
        var a;
        var e_words = e.words;
        var t_words = t.words;
        var n_words = n.words;
        var c = 0;
        var d = 0 | e_words[0];
        var u = 8191 & d;
        var p = d >>> 13;
        var _ = 0 | e_words[1];
        var f = 8191 & _;
        var m = _ >>> 13;
        var h = 0 | e_words[2];
        var g = 8191 & h;
        var y = h >>> 13;
        var b = 0 | e_words[3];
        var x = 8191 & b;
        var S = b >>> 13;
        var k = 0 | e_words[4];
        var T = 8191 & k;
        var E = k >>> 13;
        var C = 0 | e_words[5];
        var A = 8191 & C;
        var w = C >>> 13;
        var D = 0 | e_words[6];
        var N = 8191 & D;
        var I = D >>> 13;
        var P = 0 | e_words[7];
        var M = 8191 & P;
        var L = P >>> 13;
        var R = 0 | e_words[8];
        var F = 8191 & R;
        var O = R >>> 13;
        var B = 0 | e_words[9];
        var W = 8191 & B;
        var j = B >>> 13;
        var z = 0 | t_words[0];
        var V = 8191 & z;
        var G = z >>> 13;
        var K = 0 | t_words[1];
        var U = 8191 & K;
        var H = K >>> 13;
        var q = 0 | t_words[2];
        var J = 8191 & q;
        var $ = q >>> 13;
        var X = 0 | t_words[3];
        var Y = 8191 & X;
        var Q = X >>> 13;
        var Z = 0 | t_words[4];
        var ee = 8191 & Z;
        var et = Z >>> 13;
        var en = 0 | t_words[5];
        var er = 8191 & en;
        var ei = en >>> 13;
        var ea = 0 | t_words[6];
        var eo = 8191 & ea;
        var es = ea >>> 13;
        var el = 0 | t_words[7];
        var ec = 8191 & el;
        var ed = el >>> 13;
        var eu = 0 | t_words[8];
        var ep = 8191 & eu;
        var e_ = eu >>> 13;
        var ef = 0 | t_words[9];
        var em = 8191 & ef;
        var eh = ef >>> 13;
        n.negative = e.negative ^ t.negative;
        n.length = 19;
        r = Math.imul(u, V);
        var eg =
          (((c + r) | 0) +
            ((8191 & (i = ((i = Math.imul(u, G)) + Math.imul(p, V)) | 0)) <<
              13)) |
          0;
        c = ((((a = Math.imul(p, G)) + (i >>> 13)) | 0) + (eg >>> 26)) | 0;
        eg &= 67108863 /* 0x3ffffff */;
        r = Math.imul(f, V);
        i = ((i = Math.imul(f, G)) + Math.imul(m, V)) | 0;
        a = Math.imul(m, G);
        r = (r + Math.imul(u, U)) | 0;
        var ey =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, H)) | 0) + Math.imul(p, U)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, H)) | 0) + (i >>> 13)) | 0) + (ey >>> 26)) |
          0;

        ey &= 67108863 /* 0x3ffffff */;
        r = Math.imul(g, V);
        i = ((i = Math.imul(g, G)) + Math.imul(y, V)) | 0;
        a = Math.imul(y, G);
        r = (r + Math.imul(f, U)) | 0;
        i = ((i = (i + Math.imul(f, H)) | 0) + Math.imul(m, U)) | 0;
        a = (a + Math.imul(m, H)) | 0;
        r = (r + Math.imul(u, J)) | 0;
        var ev =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, $)) | 0) + Math.imul(p, J)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, $)) | 0) + (i >>> 13)) | 0) + (ev >>> 26)) |
          0;

        ev &= 67108863 /* 0x3ffffff */;
        r = Math.imul(x, V);
        i = ((i = Math.imul(x, G)) + Math.imul(S, V)) | 0;
        a = Math.imul(S, G);
        r = (r + Math.imul(g, U)) | 0;
        i = ((i = (i + Math.imul(g, H)) | 0) + Math.imul(y, U)) | 0;
        a = (a + Math.imul(y, H)) | 0;
        r = (r + Math.imul(f, J)) | 0;
        i = ((i = (i + Math.imul(f, $)) | 0) + Math.imul(m, J)) | 0;
        a = (a + Math.imul(m, $)) | 0;
        r = (r + Math.imul(u, Y)) | 0;
        var eb =
          (((c + r) | 0) +
            ((8191 &
              (i = ((i = (i + Math.imul(u, Q)) | 0) + Math.imul(p, Y)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, Q)) | 0) + (i >>> 13)) | 0) + (eb >>> 26)) |
          0;

        eb &= 67108863 /* 0x3ffffff */;
        r = Math.imul(T, V);
        i = ((i = Math.imul(T, G)) + Math.imul(E, V)) | 0;
        a = Math.imul(E, G);
        r = (r + Math.imul(x, U)) | 0;
        i = ((i = (i + Math.imul(x, H)) | 0) + Math.imul(S, U)) | 0;
        a = (a + Math.imul(S, H)) | 0;
        r = (r + Math.imul(g, J)) | 0;
        i = ((i = (i + Math.imul(g, $)) | 0) + Math.imul(y, J)) | 0;
        a = (a + Math.imul(y, $)) | 0;
        r = (r + Math.imul(f, Y)) | 0;
        i = ((i = (i + Math.imul(f, Q)) | 0) + Math.imul(m, Y)) | 0;
        a = (a + Math.imul(m, Q)) | 0;
        r = (r + Math.imul(u, ee)) | 0;
        var ex =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, et)) | 0) + Math.imul(p, ee)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, et)) | 0) + (i >>> 13)) | 0) +
            (ex >>> 26)) |
          0;

        ex &= 67108863 /* 0x3ffffff */;
        r = Math.imul(A, V);
        i = ((i = Math.imul(A, G)) + Math.imul(w, V)) | 0;
        a = Math.imul(w, G);
        r = (r + Math.imul(T, U)) | 0;
        i = ((i = (i + Math.imul(T, H)) | 0) + Math.imul(E, U)) | 0;
        a = (a + Math.imul(E, H)) | 0;
        r = (r + Math.imul(x, J)) | 0;
        i = ((i = (i + Math.imul(x, $)) | 0) + Math.imul(S, J)) | 0;
        a = (a + Math.imul(S, $)) | 0;
        r = (r + Math.imul(g, Y)) | 0;
        i = ((i = (i + Math.imul(g, Q)) | 0) + Math.imul(y, Y)) | 0;
        a = (a + Math.imul(y, Q)) | 0;
        r = (r + Math.imul(f, ee)) | 0;
        i = ((i = (i + Math.imul(f, et)) | 0) + Math.imul(m, ee)) | 0;
        a = (a + Math.imul(m, et)) | 0;
        r = (r + Math.imul(u, er)) | 0;
        var eS =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, ei)) | 0) + Math.imul(p, er)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, ei)) | 0) + (i >>> 13)) | 0) +
            (eS >>> 26)) |
          0;

        eS &= 67108863 /* 0x3ffffff */;
        r = Math.imul(N, V);
        i = ((i = Math.imul(N, G)) + Math.imul(I, V)) | 0;
        a = Math.imul(I, G);
        r = (r + Math.imul(A, U)) | 0;
        i = ((i = (i + Math.imul(A, H)) | 0) + Math.imul(w, U)) | 0;
        a = (a + Math.imul(w, H)) | 0;
        r = (r + Math.imul(T, J)) | 0;
        i = ((i = (i + Math.imul(T, $)) | 0) + Math.imul(E, J)) | 0;
        a = (a + Math.imul(E, $)) | 0;
        r = (r + Math.imul(x, Y)) | 0;
        i = ((i = (i + Math.imul(x, Q)) | 0) + Math.imul(S, Y)) | 0;
        a = (a + Math.imul(S, Q)) | 0;
        r = (r + Math.imul(g, ee)) | 0;
        i = ((i = (i + Math.imul(g, et)) | 0) + Math.imul(y, ee)) | 0;
        a = (a + Math.imul(y, et)) | 0;
        r = (r + Math.imul(f, er)) | 0;
        i = ((i = (i + Math.imul(f, ei)) | 0) + Math.imul(m, er)) | 0;
        a = (a + Math.imul(m, ei)) | 0;
        r = (r + Math.imul(u, eo)) | 0;
        var ek =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, es)) | 0) + Math.imul(p, eo)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, es)) | 0) + (i >>> 13)) | 0) +
            (ek >>> 26)) |
          0;

        ek &= 67108863 /* 0x3ffffff */;
        r = Math.imul(M, V);
        i = ((i = Math.imul(M, G)) + Math.imul(L, V)) | 0;
        a = Math.imul(L, G);
        r = (r + Math.imul(N, U)) | 0;
        i = ((i = (i + Math.imul(N, H)) | 0) + Math.imul(I, U)) | 0;
        a = (a + Math.imul(I, H)) | 0;
        r = (r + Math.imul(A, J)) | 0;
        i = ((i = (i + Math.imul(A, $)) | 0) + Math.imul(w, J)) | 0;
        a = (a + Math.imul(w, $)) | 0;
        r = (r + Math.imul(T, Y)) | 0;
        i = ((i = (i + Math.imul(T, Q)) | 0) + Math.imul(E, Y)) | 0;
        a = (a + Math.imul(E, Q)) | 0;
        r = (r + Math.imul(x, ee)) | 0;
        i = ((i = (i + Math.imul(x, et)) | 0) + Math.imul(S, ee)) | 0;
        a = (a + Math.imul(S, et)) | 0;
        r = (r + Math.imul(g, er)) | 0;
        i = ((i = (i + Math.imul(g, ei)) | 0) + Math.imul(y, er)) | 0;
        a = (a + Math.imul(y, ei)) | 0;
        r = (r + Math.imul(f, eo)) | 0;
        i = ((i = (i + Math.imul(f, es)) | 0) + Math.imul(m, eo)) | 0;
        a = (a + Math.imul(m, es)) | 0;
        r = (r + Math.imul(u, ec)) | 0;
        var eT =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, ed)) | 0) + Math.imul(p, ec)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, ed)) | 0) + (i >>> 13)) | 0) +
            (eT >>> 26)) |
          0;

        eT &= 67108863 /* 0x3ffffff */;
        r = Math.imul(F, V);
        i = ((i = Math.imul(F, G)) + Math.imul(O, V)) | 0;
        a = Math.imul(O, G);
        r = (r + Math.imul(M, U)) | 0;
        i = ((i = (i + Math.imul(M, H)) | 0) + Math.imul(L, U)) | 0;
        a = (a + Math.imul(L, H)) | 0;
        r = (r + Math.imul(N, J)) | 0;
        i = ((i = (i + Math.imul(N, $)) | 0) + Math.imul(I, J)) | 0;
        a = (a + Math.imul(I, $)) | 0;
        r = (r + Math.imul(A, Y)) | 0;
        i = ((i = (i + Math.imul(A, Q)) | 0) + Math.imul(w, Y)) | 0;
        a = (a + Math.imul(w, Q)) | 0;
        r = (r + Math.imul(T, ee)) | 0;
        i = ((i = (i + Math.imul(T, et)) | 0) + Math.imul(E, ee)) | 0;
        a = (a + Math.imul(E, et)) | 0;
        r = (r + Math.imul(x, er)) | 0;
        i = ((i = (i + Math.imul(x, ei)) | 0) + Math.imul(S, er)) | 0;
        a = (a + Math.imul(S, ei)) | 0;
        r = (r + Math.imul(g, eo)) | 0;
        i = ((i = (i + Math.imul(g, es)) | 0) + Math.imul(y, eo)) | 0;
        a = (a + Math.imul(y, es)) | 0;
        r = (r + Math.imul(f, ec)) | 0;
        i = ((i = (i + Math.imul(f, ed)) | 0) + Math.imul(m, ec)) | 0;
        a = (a + Math.imul(m, ed)) | 0;
        r = (r + Math.imul(u, ep)) | 0;
        var eE =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, e_)) | 0) + Math.imul(p, ep)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, e_)) | 0) + (i >>> 13)) | 0) +
            (eE >>> 26)) |
          0;

        eE &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, V);
        i = ((i = Math.imul(W, G)) + Math.imul(j, V)) | 0;
        a = Math.imul(j, G);
        r = (r + Math.imul(F, U)) | 0;
        i = ((i = (i + Math.imul(F, H)) | 0) + Math.imul(O, U)) | 0;
        a = (a + Math.imul(O, H)) | 0;
        r = (r + Math.imul(M, J)) | 0;
        i = ((i = (i + Math.imul(M, $)) | 0) + Math.imul(L, J)) | 0;
        a = (a + Math.imul(L, $)) | 0;
        r = (r + Math.imul(N, Y)) | 0;
        i = ((i = (i + Math.imul(N, Q)) | 0) + Math.imul(I, Y)) | 0;
        a = (a + Math.imul(I, Q)) | 0;
        r = (r + Math.imul(A, ee)) | 0;
        i = ((i = (i + Math.imul(A, et)) | 0) + Math.imul(w, ee)) | 0;
        a = (a + Math.imul(w, et)) | 0;
        r = (r + Math.imul(T, er)) | 0;
        i = ((i = (i + Math.imul(T, ei)) | 0) + Math.imul(E, er)) | 0;
        a = (a + Math.imul(E, ei)) | 0;
        r = (r + Math.imul(x, eo)) | 0;
        i = ((i = (i + Math.imul(x, es)) | 0) + Math.imul(S, eo)) | 0;
        a = (a + Math.imul(S, es)) | 0;
        r = (r + Math.imul(g, ec)) | 0;
        i = ((i = (i + Math.imul(g, ed)) | 0) + Math.imul(y, ec)) | 0;
        a = (a + Math.imul(y, ed)) | 0;
        r = (r + Math.imul(f, ep)) | 0;
        i = ((i = (i + Math.imul(f, e_)) | 0) + Math.imul(m, ep)) | 0;
        a = (a + Math.imul(m, e_)) | 0;
        r = (r + Math.imul(u, em)) | 0;
        var eC =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(u, eh)) | 0) + Math.imul(p, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(p, eh)) | 0) + (i >>> 13)) | 0) +
            (eC >>> 26)) |
          0;

        eC &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, U);
        i = ((i = Math.imul(W, H)) + Math.imul(j, U)) | 0;
        a = Math.imul(j, H);
        r = (r + Math.imul(F, J)) | 0;
        i = ((i = (i + Math.imul(F, $)) | 0) + Math.imul(O, J)) | 0;
        a = (a + Math.imul(O, $)) | 0;
        r = (r + Math.imul(M, Y)) | 0;
        i = ((i = (i + Math.imul(M, Q)) | 0) + Math.imul(L, Y)) | 0;
        a = (a + Math.imul(L, Q)) | 0;
        r = (r + Math.imul(N, ee)) | 0;
        i = ((i = (i + Math.imul(N, et)) | 0) + Math.imul(I, ee)) | 0;
        a = (a + Math.imul(I, et)) | 0;
        r = (r + Math.imul(A, er)) | 0;
        i = ((i = (i + Math.imul(A, ei)) | 0) + Math.imul(w, er)) | 0;
        a = (a + Math.imul(w, ei)) | 0;
        r = (r + Math.imul(T, eo)) | 0;
        i = ((i = (i + Math.imul(T, es)) | 0) + Math.imul(E, eo)) | 0;
        a = (a + Math.imul(E, es)) | 0;
        r = (r + Math.imul(x, ec)) | 0;
        i = ((i = (i + Math.imul(x, ed)) | 0) + Math.imul(S, ec)) | 0;
        a = (a + Math.imul(S, ed)) | 0;
        r = (r + Math.imul(g, ep)) | 0;
        i = ((i = (i + Math.imul(g, e_)) | 0) + Math.imul(y, ep)) | 0;
        a = (a + Math.imul(y, e_)) | 0;
        r = (r + Math.imul(f, em)) | 0;
        var eA =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(f, eh)) | 0) + Math.imul(m, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(m, eh)) | 0) + (i >>> 13)) | 0) +
            (eA >>> 26)) |
          0;

        eA &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, J);
        i = ((i = Math.imul(W, $)) + Math.imul(j, J)) | 0;
        a = Math.imul(j, $);
        r = (r + Math.imul(F, Y)) | 0;
        i = ((i = (i + Math.imul(F, Q)) | 0) + Math.imul(O, Y)) | 0;
        a = (a + Math.imul(O, Q)) | 0;
        r = (r + Math.imul(M, ee)) | 0;
        i = ((i = (i + Math.imul(M, et)) | 0) + Math.imul(L, ee)) | 0;
        a = (a + Math.imul(L, et)) | 0;
        r = (r + Math.imul(N, er)) | 0;
        i = ((i = (i + Math.imul(N, ei)) | 0) + Math.imul(I, er)) | 0;
        a = (a + Math.imul(I, ei)) | 0;
        r = (r + Math.imul(A, eo)) | 0;
        i = ((i = (i + Math.imul(A, es)) | 0) + Math.imul(w, eo)) | 0;
        a = (a + Math.imul(w, es)) | 0;
        r = (r + Math.imul(T, ec)) | 0;
        i = ((i = (i + Math.imul(T, ed)) | 0) + Math.imul(E, ec)) | 0;
        a = (a + Math.imul(E, ed)) | 0;
        r = (r + Math.imul(x, ep)) | 0;
        i = ((i = (i + Math.imul(x, e_)) | 0) + Math.imul(S, ep)) | 0;
        a = (a + Math.imul(S, e_)) | 0;
        r = (r + Math.imul(g, em)) | 0;
        var ew =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(g, eh)) | 0) + Math.imul(y, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(y, eh)) | 0) + (i >>> 13)) | 0) +
            (ew >>> 26)) |
          0;

        ew &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, Y);
        i = ((i = Math.imul(W, Q)) + Math.imul(j, Y)) | 0;
        a = Math.imul(j, Q);
        r = (r + Math.imul(F, ee)) | 0;
        i = ((i = (i + Math.imul(F, et)) | 0) + Math.imul(O, ee)) | 0;
        a = (a + Math.imul(O, et)) | 0;
        r = (r + Math.imul(M, er)) | 0;
        i = ((i = (i + Math.imul(M, ei)) | 0) + Math.imul(L, er)) | 0;
        a = (a + Math.imul(L, ei)) | 0;
        r = (r + Math.imul(N, eo)) | 0;
        i = ((i = (i + Math.imul(N, es)) | 0) + Math.imul(I, eo)) | 0;
        a = (a + Math.imul(I, es)) | 0;
        r = (r + Math.imul(A, ec)) | 0;
        i = ((i = (i + Math.imul(A, ed)) | 0) + Math.imul(w, ec)) | 0;
        a = (a + Math.imul(w, ed)) | 0;
        r = (r + Math.imul(T, ep)) | 0;
        i = ((i = (i + Math.imul(T, e_)) | 0) + Math.imul(E, ep)) | 0;
        a = (a + Math.imul(E, e_)) | 0;
        r = (r + Math.imul(x, em)) | 0;
        var eD =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(x, eh)) | 0) + Math.imul(S, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(S, eh)) | 0) + (i >>> 13)) | 0) +
            (eD >>> 26)) |
          0;

        eD &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ee);
        i = ((i = Math.imul(W, et)) + Math.imul(j, ee)) | 0;
        a = Math.imul(j, et);
        r = (r + Math.imul(F, er)) | 0;
        i = ((i = (i + Math.imul(F, ei)) | 0) + Math.imul(O, er)) | 0;
        a = (a + Math.imul(O, ei)) | 0;
        r = (r + Math.imul(M, eo)) | 0;
        i = ((i = (i + Math.imul(M, es)) | 0) + Math.imul(L, eo)) | 0;
        a = (a + Math.imul(L, es)) | 0;
        r = (r + Math.imul(N, ec)) | 0;
        i = ((i = (i + Math.imul(N, ed)) | 0) + Math.imul(I, ec)) | 0;
        a = (a + Math.imul(I, ed)) | 0;
        r = (r + Math.imul(A, ep)) | 0;
        i = ((i = (i + Math.imul(A, e_)) | 0) + Math.imul(w, ep)) | 0;
        a = (a + Math.imul(w, e_)) | 0;
        r = (r + Math.imul(T, em)) | 0;
        var eN =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(T, eh)) | 0) + Math.imul(E, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(E, eh)) | 0) + (i >>> 13)) | 0) +
            (eN >>> 26)) |
          0;

        eN &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, er);
        i = ((i = Math.imul(W, ei)) + Math.imul(j, er)) | 0;
        a = Math.imul(j, ei);
        r = (r + Math.imul(F, eo)) | 0;
        i = ((i = (i + Math.imul(F, es)) | 0) + Math.imul(O, eo)) | 0;
        a = (a + Math.imul(O, es)) | 0;
        r = (r + Math.imul(M, ec)) | 0;
        i = ((i = (i + Math.imul(M, ed)) | 0) + Math.imul(L, ec)) | 0;
        a = (a + Math.imul(L, ed)) | 0;
        r = (r + Math.imul(N, ep)) | 0;
        i = ((i = (i + Math.imul(N, e_)) | 0) + Math.imul(I, ep)) | 0;
        a = (a + Math.imul(I, e_)) | 0;
        r = (r + Math.imul(A, em)) | 0;
        var eI =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(A, eh)) | 0) + Math.imul(w, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(w, eh)) | 0) + (i >>> 13)) | 0) +
            (eI >>> 26)) |
          0;

        eI &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, eo);
        i = ((i = Math.imul(W, es)) + Math.imul(j, eo)) | 0;
        a = Math.imul(j, es);
        r = (r + Math.imul(F, ec)) | 0;
        i = ((i = (i + Math.imul(F, ed)) | 0) + Math.imul(O, ec)) | 0;
        a = (a + Math.imul(O, ed)) | 0;
        r = (r + Math.imul(M, ep)) | 0;
        i = ((i = (i + Math.imul(M, e_)) | 0) + Math.imul(L, ep)) | 0;
        a = (a + Math.imul(L, e_)) | 0;
        r = (r + Math.imul(N, em)) | 0;
        var eP =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(N, eh)) | 0) + Math.imul(I, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(I, eh)) | 0) + (i >>> 13)) | 0) +
            (eP >>> 26)) |
          0;

        eP &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ec);
        i = ((i = Math.imul(W, ed)) + Math.imul(j, ec)) | 0;
        a = Math.imul(j, ed);
        r = (r + Math.imul(F, ep)) | 0;
        i = ((i = (i + Math.imul(F, e_)) | 0) + Math.imul(O, ep)) | 0;
        a = (a + Math.imul(O, e_)) | 0;
        r = (r + Math.imul(M, em)) | 0;
        var eM =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(M, eh)) | 0) + Math.imul(L, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(L, eh)) | 0) + (i >>> 13)) | 0) +
            (eM >>> 26)) |
          0;

        eM &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, ep);
        i = ((i = Math.imul(W, e_)) + Math.imul(j, ep)) | 0;
        a = Math.imul(j, e_);
        r = (r + Math.imul(F, em)) | 0;
        var eL =
          (((c + r) | 0) +
            ((8191 &
              (i =
                ((i = (i + Math.imul(F, eh)) | 0) + Math.imul(O, em)) | 0)) <<
              13)) |
          0;

        c =
          ((((a = (a + Math.imul(O, eh)) | 0) + (i >>> 13)) | 0) +
            (eL >>> 26)) |
          0;

        eL &= 67108863 /* 0x3ffffff */;
        r = Math.imul(W, em);
        var eR =
          (((c + r) | 0) +
            ((8191 & (i = ((i = Math.imul(W, eh)) + Math.imul(j, em)) | 0)) <<
              13)) |
          0;
        c = ((((a = Math.imul(j, eh)) + (i >>> 13)) | 0) + (eR >>> 26)) | 0;
        eR &= 67108863 /* 0x3ffffff */;
        n_words[0] = eg;
        n_words[1] = ey;
        n_words[2] = ev;
        n_words[3] = eb;
        n_words[4] = ex;
        n_words[5] = eS;
        n_words[6] = ek;
        n_words[7] = eT;
        n_words[8] = eE;
        n_words[9] = eC;
        n_words[10] = eA;
        n_words[11] = ew;
        n_words[12] = eD;
        n_words[13] = eN;
        n_words[14] = eI;
        n_words[15] = eP;
        n_words[16] = eM;
        n_words[17] = eL;
        n_words[18] = eR;

        if (c !== 0) {
          n_words[19] = c;
          n.length++;
        }

        return n;
      };
      function h(e, t, n) {
        n.negative = t.negative ^ e.negative;
        n.length = e.length + t.length;
        for (var r = 0, i = 0, a = 0; a < n.length - 1; a++) {
          var o = i;
          i = 0;
          for (
            var s = 67108863 /* 0x3ffffff */ & r,
              l = Math.min(a, t.length - 1),
              c = Math.max(0, a - e.length + 1);
            c <= l;
            c++
          ) {
            var d = a - c;
            var u = (0 | e.words[d]) * (0 | t.words[c]);
            var p = 67108863 /* 0x3ffffff */ & u;
            o = (o + ((u / 67108864) /* 0x4000000 */ | 0)) | 0;
            s = 67108863 /* 0x3ffffff */ & (p = (p + s) | 0);
            i += (o = (o + (p >>> 26)) | 0) >>> 26;
            o &= 67108863 /* 0x3ffffff */;
          }
          n.words[a] = s;
          r = o;
          o = i;
        }

        if (r !== 0) {
          n.words[a] = r;
        } else {
          n.length--;
        }

        return n._strip();
      }
      function g(e, t) {
        this.x = e;
        this.y = t;
      }

      if (!Math.imul) {
        m = f;
      }

      a.prototype.mulTo = function (e, t) {
        var n;
        var r = this.length + e.length;

        if (this.length === 10 && e.length === 10) {
          n = m(this, e, t);
        } else if (r < 63) {
          n = f(this, e, t);
        } else {
          n = h(this, e, t);
        }

        return n;
      };

      g.prototype.makeRBT = function (e) {
        for (
          var t = Array(e), n = a.prototype._countBits(e) - 1, r = 0;
          r < e;
          r++
        ) {
          t[r] = this.revBin(r, n, e);
        }
        return t;
      };

      g.prototype.revBin = function (e, t, n) {
        if (e === 0 || e === n - 1) {
          return e;
        }
        for (var r = 0, i = 0; i < t; i++) {
          r |= (1 & e) << (t - i - 1);
          e >>= 1;
        }
        return r;
      };

      g.prototype.permute = function (e, t, n, r, i, a) {
        for (var o = 0; o < a; o++) {
          r[o] = t[e[o]];
          i[o] = n[e[o]];
        }
      };

      g.prototype.transform = function (e, t, n, r, i, a) {
        this.permute(a, e, t, n, r, i);
        for (var o = 1; o < i; o <<= 1) {
          for (
            var s = o << 1,
              l = Math.cos((2 * Math.PI) / s),
              c = Math.sin((2 * Math.PI) / s),
              d = 0;
            d < i;
            d += s
          ) {
            for (var u = l, p = c, _ = 0; _ < o; _++) {
              var f = n[d + _];
              var m = r[d + _];
              var h = n[d + _ + o];
              var g = r[d + _ + o];
              var y = u * h - p * g;
              g = u * g + p * h;
              h = y;
              n[d + _] = f + h;
              r[d + _] = m + g;
              n[d + _ + o] = f - h;
              r[d + _ + o] = m - g;

              if (_ !== s) {
                y = l * u - c * p;
                p = l * p + c * u;
                u = y;
              }
            }
          }
        }
      };

      g.prototype.guessLen13b = function (e, t) {
        var n = 1 | Math.max(t, e);
        var r = 1 & n;
        var i = 0;
        for (n = (n / 2) | 0; n; n >>>= 1) {
          i++;
        }
        return 1 << (i + 1 + r);
      };

      g.prototype.conjugate = function (e, t, n) {
        if (!(n <= 1)) {
          for (var r = 0; r < n / 2; r++) {
            var e_r = e[r];
            e[r] = e[n - r - 1];
            e[n - r - 1] = e_r;
            e_r = t[r];
            t[r] = -t[n - r - 1];
            t[n - r - 1] = -e_r;
          }
        }
      };

      g.prototype.normalize13b = function (e, t) {
        for (var n = 0, r = 0; r < t / 2; r++) {
          var i =
            8192 * Math.round(e[2 * r + 1] / t) + Math.round(e[2 * r] / t) + n;
          e[r] = 67108863 /* 0x3ffffff */ & i;
          n =
            i < 67108864 /* 0x4000000 */
              ? 0
              : (i / 67108864) /* 0x4000000 */ | 0;
        }
        return e;
      };

      g.prototype.convert13b = function (e, t, n, i) {
        for (var a = 0, o = 0; o < t; o++) {
          a += 0 | e[o];
          n[2 * o] = 8191 & a;
          a >>>= 13;
          n[2 * o + 1] = 8191 & a;
          a >>>= 13;
        }
        for (o = 2 * t; o < i; ++o) {
          n[o] = 0;
        }
        r(a === 0);
        r((-8192 & a) == 0);
      };

      g.prototype.stub = function (e) {
        for (var t = Array(e), n = 0; n < e; n++) {
          t[n] = 0;
        }
        return t;
      };

      g.prototype.mulp = function (e, t, n) {
        var r = 2 * this.guessLen13b(e.length, t.length);
        var i = this.makeRBT(r);
        var a = this.stub(r);
        var o = Array(r);
        var s = Array(r);
        var l = Array(r);
        var c = Array(r);
        var d = Array(r);
        var u = Array(r);
        var n_words = n.words;
        n_words.length = r;
        this.convert13b(e.words, e.length, o, r);
        this.convert13b(t.words, t.length, c, r);
        this.transform(o, a, s, l, r, i);
        this.transform(c, a, d, u, r, i);
        for (var _ = 0; _ < r; _++) {
          var f = s[_] * d[_] - l[_] * u[_];
          l[_] = s[_] * u[_] + l[_] * d[_];
          s[_] = f;
        }
        this.conjugate(s, l, r);
        this.transform(s, l, n_words, a, r, i);
        this.conjugate(n_words, a, r);
        this.normalize13b(n_words, r);
        n.negative = e.negative ^ t.negative;
        n.length = e.length + t.length;
        return n._strip();
      };

      a.prototype.mul = function (e) {
        var t = new a(null);
        t.words = Array(this.length + e.length);
        return this.mulTo(e, t);
      };

      a.prototype.mulf = function (e) {
        var t = new a(null);
        t.words = Array(this.length + e.length);
        return h(this, e, t);
      };

      a.prototype.imul = function (e) {
        return this.clone().mulTo(e, this);
      };

      a.prototype.imuln = function (e) {
        var t = e < 0;

        if (t) {
          e = -e;
        }

        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);
        for (var n = 0, i = 0; i < this.length; i++) {
          var a = (0 | this.words[i]) * e;
          var o =
            (67108863 /* 0x3ffffff */ & a) + (67108863 /* 0x3ffffff */ & n);
          n >>= 26;
          n += ((a / 67108864) /* 0x4000000 */ | 0) + (o >>> 26);
          this.words[i] = 67108863 /* 0x3ffffff */ & o;
        }

        if (n !== 0) {
          this.words[i] = n;
          this.length++;
        }

        return t ? this.ineg() : this;
      };

      a.prototype.muln = function (e) {
        return this.clone().imuln(e);
      };

      a.prototype.sqr = function () {
        return this.mul(this);
      };

      a.prototype.isqr = function () {
        return this.imul(this.clone());
      };

      a.prototype.pow = function (e) {
        var t = (function (e) {
          for (var t = Array(e.bitLength()), n = 0; n < t.length; n++) {
            var r = (n / 26) | 0;
            var i = n % 26;
            t[n] = (e.words[r] >>> i) & 1;
          }
          return t;
        })(e);
        if (t.length === 0) {
          return new a(1);
        }
        for (
          var n = this, r = 0;
          r < t.length && t[r] === 0;
          r++, n = n.sqr()
        ) {}
        if (++r < t.length) {
          for (var i = n.sqr(); r < t.length; r++, i = i.sqr()) {
            if (t[r] !== 0) {
              n = n.mul(i);
            }
          }
        }
        return n;
      };

      a.prototype.iushln = function (e) {
        r(typeof e == "number" && e >= 0);
        var t;
        var n = e % 26;
        var i = (e - n) / 26;
        var a = (67108863 /* 0x3ffffff */ >>> (26 - n)) << (26 - n);
        if (n !== 0) {
          var o = 0;
          for (t = 0; t < this.length; t++) {
            var s = this.words[t] & a;
            var l = ((0 | this.words[t]) - s) << n;
            this.words[t] = l | o;
            o = s >>> (26 - n);
          }

          if (o) {
            this.words[t] = o;
            this.length++;
          }
        }
        if (i !== 0) {
          for (t = this.length - 1; t >= 0; t--) {
            this.words[t + i] = this.words[t];
          }
          for (t = 0; t < i; t++) {
            this.words[t] = 0;
          }
          this.length += i;
        }
        return this._strip();
      };

      a.prototype.ishln = function (e) {
        r(this.negative === 0);
        return this.iushln(e);
      };

      a.prototype.iushrn = function (e, t, n) {
        r(typeof e == "number" && e >= 0);
        var i = t ? (t - (t % 26)) / 26 : 0;
        var a = e % 26;
        var o = Math.min((e - a) / 26, this.length);
        var s =
          67108863 /* 0x3ffffff */ ^ ((67108863 /* 0x3ffffff */ >>> a) << a);
        i -= o;
        i = Math.max(0, i);

        if (n) {
          for (var l = 0; l < o; l++) {
            n.words[l] = this.words[l];
          }
          n.length = o;
        }

        if (o === 0) {
        } else if (this.length > o) {
          this.length -= o;

          for (l = 0; l < this.length; l++) {
            this.words[l] = this.words[l + o];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var c = 0;
        for (l = this.length - 1; l >= 0 && (c !== 0 || l >= i); l--) {
          var d = 0 | this.words[l];
          this.words[l] = (c << (26 - a)) | (d >>> a);
          c = d & s;
        }

        if (n && c !== 0) {
          n.words[n.length++] = c;
        }

        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }

        return this._strip();
      };

      a.prototype.ishrn = function (e, t, n) {
        r(this.negative === 0);
        return this.iushrn(e, t, n);
      };

      a.prototype.shln = function (e) {
        return this.clone().ishln(e);
      };

      a.prototype.ushln = function (e) {
        return this.clone().iushln(e);
      };

      a.prototype.shrn = function (e) {
        return this.clone().ishrn(e);
      };

      a.prototype.ushrn = function (e) {
        return this.clone().iushrn(e);
      };

      a.prototype.testn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = e % 26;
        var n = (e - t) / 26;
        return !(this.length <= n) && !!(this.words[n] & (1 << t));
      };

      a.prototype.imaskn = function (e) {
        r(typeof e == "number" && e >= 0);
        var t = e % 26;
        var n = (e - t) / 26;
        return (r(
          this.negative === 0,
          "imaskn works only with positive numbers"
        ),
        this.length <= n)
          ? this
          : (t !== 0 && n++,
            (this.length = Math.min(n, this.length)),
            t !== 0 &&
              (this.words[this.length - 1] &=
                67108863 /* 0x3ffffff */ ^
                ((67108863 /* 0x3ffffff */ >>> t) << t)),
            this._strip());
      };

      a.prototype.maskn = function (e) {
        return this.clone().imaskn(e);
      };

      a.prototype.iaddn = function (e) {
        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);

        if (e < 0) {
          return this.isubn(-e);
        }

        if (this.negative !== 0) {
          this.length === 1 && (0 | this.words[0]) <= e
            ? ((this.words[0] = e - (0 | this.words[0])), (this.negative = 0))
            : ((this.negative = 0), this.isubn(e), (this.negative = 1));

          return this;
        }

        return this._iaddn(e);
      };

      a.prototype._iaddn = function (e) {
        this.words[0] += e;
        for (
          var t = 0;
          t < this.length && this.words[t] >= 67108864 /* 0x4000000 */;
          t++
        ) {
          this.words[t] -= 67108864 /* 0x4000000 */;

          if (t === this.length - 1) {
            this.words[t + 1] = 1;
          } else {
            this.words[t + 1]++;
          }
        }
        this.length = Math.max(this.length, t + 1);
        return this;
      };

      a.prototype.isubn = function (e) {
        r(typeof e == "number");
        r(e < 67108864 /* 0x4000000 */);

        if (e < 0) {
          return this.iaddn(-e);
        }

        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(e);
          this.negative = 1;
          return this;
        }
        this.words[0] -= e;

        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var t = 0; t < this.length && this.words[t] < 0; t++) {
            this.words[t] += 67108864 /* 0x4000000 */;
            this.words[t + 1] -= 1;
          }
        }

        return this._strip();
      };

      a.prototype.addn = function (e) {
        return this.clone().iaddn(e);
      };

      a.prototype.subn = function (e) {
        return this.clone().isubn(e);
      };

      a.prototype.iabs = function () {
        this.negative = 0;
        return this;
      };

      a.prototype.abs = function () {
        return this.clone().iabs();
      };

      a.prototype._ishlnsubmul = function (e, t, n) {
        var i;
        var a;
        var o = e.length + n;
        this._expand(o);
        var s = 0;
        for (i = 0; i < e.length; i++) {
          a = (0 | this.words[i + n]) + s;
          var l = (0 | e.words[i]) * t;
          a -= 67108863 /* 0x3ffffff */ & l;
          s = (a >> 26) - ((l / 67108864) /* 0x4000000 */ | 0);
          this.words[i + n] = 67108863 /* 0x3ffffff */ & a;
        }
        for (; i < this.length - n; i++) {
          s = (a = (0 | this.words[i + n]) + s) >> 26;
          this.words[i + n] = 67108863 /* 0x3ffffff */ & a;
        }
        if (s === 0) {
          return this._strip();
        }
        r(-1 === s);
        s = 0;

        for (i = 0; i < this.length; i++) {
          s = (a = -(0 | this.words[i]) + s) >> 26;
          this.words[i] = 67108863 /* 0x3ffffff */ & a;
        }

        this.negative = 1;
        return this._strip();
      };

      a.prototype._wordDiv = function (e, t) {
        var n;
        var r = this.length - e.length;
        var i = this.clone();
        var o = e;
        var s = 0 | o.words[o.length - 1];

        if (0 != (r = 26 - this._countBits(s))) {
          o = o.ushln(r);
          i.iushln(r);
          s = 0 | o.words[o.length - 1];
        }

        var l = i.length - o.length;
        if (t !== "mod") {
          n = new a(null);
          n.length = l + 1;
          n.words = Array(n.length);
          for (var c = 0; c < n.length; c++) {
            n.words[c] = 0;
          }
        }
        var d = i.clone()._ishlnsubmul(o, 1, l);

        if (d.negative === 0) {
          i = d;
          n && (n.words[l] = 1);
        }

        for (var u = l - 1; u >= 0; u--) {
          var p =
            (0 | i.words[o.length + u]) * 67108864 /* 0x4000000 */ +
            (0 | i.words[o.length + u - 1]);
          p = Math.min((p / s) | 0, 67108863 /* 0x3ffffff */);
          i._ishlnsubmul(o, p, u);

          while (i.negative !== 0) {
            p--;
            i.negative = 0;
            i._ishlnsubmul(o, 1, u);

            if (!i.isZero()) {
              i.negative ^= 1;
            }
          }

          if (n) {
            n.words[u] = p;
          }
        }

        if (n) {
          n._strip();
        }

        i._strip();

        if (t !== "div" && r !== 0) {
          i.iushrn(r);
        }

        return { div: n || null, mod: i };
      };

      a.prototype.divmod = function (e, t, n) {
        var i;
        var o;
        var s;
        r(!e.isZero());

        if (this.isZero()) {
          return { div: new a(0), mod: new a(0) };
        }

        if (this.negative !== 0 && e.negative === 0) {
          s = this.neg().divmod(e, t);
          t !== "mod" && (i = s.div.neg());

          t !== "div" &&
            ((o = s.mod.neg()), n && o.negative !== 0 && o.iadd(e));

          return { div: i, mod: o };
        }

        if (this.negative === 0 && e.negative !== 0) {
          s = this.divmod(e.neg(), t);
          t !== "mod" && (i = s.div.neg());
          return { div: i, mod: s.mod };
        }

        if ((this.negative & e.negative) != 0) {
          s = this.neg().divmod(e.neg(), t);

          t !== "div" &&
            ((o = s.mod.neg()), n && o.negative !== 0 && o.isub(e));

          return { div: s.div, mod: o };
        }

        if (e.length > this.length || this.cmp(e) < 0) {
          return { div: new a(0), mod: this };
        }

        if (e.length === 1) {
          if (t === "div") {
            return { div: this.divn(e.words[0]), mod: null };
          }

          if (t === "mod") {
            return {
              div: null,
              mod: new a(this.modrn(e.words[0])),
            };
          }

          return {
            div: this.divn(e.words[0]),
            mod: new a(this.modrn(e.words[0])),
          };
        }

        return this._wordDiv(e, t);
      };

      a.prototype.div = function (e) {
        return this.divmod(e, "div", false).div;
      };

      a.prototype.mod = function (e) {
        return this.divmod(e, "mod", false).mod;
      };

      a.prototype.umod = function (e) {
        return this.divmod(e, "mod", true).mod;
      };

      a.prototype.divRound = function (e) {
        var t = this.divmod(e);
        if (t.mod.isZero()) {
          return t.div;
        }
        var n = t.div.negative !== 0 ? t.mod.isub(e) : t.mod;
        var r = e.ushrn(1);
        var i = e.andln(1);
        var a = n.cmp(r);

        if (a < 0 || (i === 1 && a === 0)) {
          return t.div;
        }

        if (t.div.negative !== 0) {
          return t.div.isubn(1);
        }

        return t.div.iaddn(1);
      };

      a.prototype.modrn = function (e) {
        var t = e < 0;

        if (t) {
          e = -e;
        }

        r(e <= 67108863 /* 0x3ffffff */);
        for (
          var n = 67108864 /* 0x4000000 */ % e, i = 0, a = this.length - 1;
          a >= 0;
          a--
        ) {
          i = (n * i + (0 | this.words[a])) % e;
        }
        return t ? -i : i;
      };

      a.prototype.modn = function (e) {
        return this.modrn(e);
      };

      a.prototype.idivn = function (e) {
        var t = e < 0;

        if (t) {
          e = -e;
        }

        r(e <= 67108863 /* 0x3ffffff */);
        for (var n = 0, i = this.length - 1; i >= 0; i--) {
          var a = (0 | this.words[i]) + 67108864 /* 0x4000000 */ * n;
          this.words[i] = (a / e) | 0;
          n = a % e;
        }
        this._strip();
        return t ? this.ineg() : this;
      };

      a.prototype.divn = function (e) {
        return this.clone().idivn(e);
      };

      a.prototype.egcd = function (e) {
        r(e.negative === 0);
        r(!e.isZero());
        var t = this;
        var n = e.clone();
        t = t.negative !== 0 ? t.umod(e) : t.clone();
        for (
          var i = new a(1), o = new a(0), s = new a(0), l = new a(1), c = 0;
          t.isEven() && n.isEven();

        ) {
          t.iushrn(1);
          n.iushrn(1);
          ++c;
        }
        for (var d = n.clone(), u = t.clone(); !t.isZero(); ) {
          for (
            var p = 0, _ = 1;
            (t.words[0] & _) == 0 && p < 26;
            ++p, _ <<= 1
          ) {}
          if (p > 0) {
            for (t.iushrn(p); p-- > 0; ) {
              if (i.isOdd() || o.isOdd()) {
                i.iadd(d);
                o.isub(u);
              }

              i.iushrn(1);
              o.iushrn(1);
            }
          }
          for (
            var f = 0, m = 1;
            (n.words[0] & m) == 0 && f < 26;
            ++f, m <<= 1
          ) {}
          if (f > 0) {
            for (n.iushrn(f); f-- > 0; ) {
              if (s.isOdd() || l.isOdd()) {
                s.iadd(d);
                l.isub(u);
              }

              s.iushrn(1);
              l.iushrn(1);
            }
          }

          if (t.cmp(n) >= 0) {
            t.isub(n);
            i.isub(s);
            o.isub(l);
          } else {
            n.isub(t);
            s.isub(i);
            l.isub(o);
          }
        }
        return { a: s, b: l, gcd: n.iushln(c) };
      };

      a.prototype._invmp = function (e) {
        r(e.negative === 0);
        r(!e.isZero());
        var t;
        var n = this;
        var i = e.clone();
        n = n.negative !== 0 ? n.umod(e) : n.clone();
        for (
          var o = new a(1), s = new a(0), l = i.clone();
          n.cmpn(1) > 0 && i.cmpn(1) > 0;

        ) {
          for (
            var c = 0, d = 1;
            (n.words[0] & d) == 0 && c < 26;
            ++c, d <<= 1
          ) {}
          if (c > 0) {
            for (n.iushrn(c); c-- > 0; ) {
              if (o.isOdd()) {
                o.iadd(l);
              }

              o.iushrn(1);
            }
          }
          for (
            var u = 0, p = 1;
            (i.words[0] & p) == 0 && u < 26;
            ++u, p <<= 1
          ) {}
          if (u > 0) {
            for (i.iushrn(u); u-- > 0; ) {
              if (s.isOdd()) {
                s.iadd(l);
              }

              s.iushrn(1);
            }
          }

          if (n.cmp(i) >= 0) {
            n.isub(i);
            o.isub(s);
          } else {
            i.isub(n);
            s.isub(o);
          }
        }

        if ((t = n.cmpn(1) === 0 ? o : s).cmpn(0) < 0) {
          t.iadd(e);
        }

        return t;
      };

      a.prototype.gcd = function (e) {
        if (this.isZero()) {
          return e.abs();
        }
        if (e.isZero()) {
          return this.abs();
        }
        var t = this.clone();
        var n = e.clone();
        t.negative = 0;
        n.negative = 0;
        for (var r = 0; t.isEven() && n.isEven(); r++) {
          t.iushrn(1);
          n.iushrn(1);
        }

        while (true) {
          while (t.isEven()) {
            t.iushrn(1);
          }

          while (n.isEven()) {
            n.iushrn(1);
          }

          var i = t.cmp(n);
          if (i < 0) {
            var a = t;
            t = n;
            n = a;
          } else if (i === 0 || n.cmpn(1) === 0) {
            break;
          }
          t.isub(n);
        }

        return n.iushln(r);
      };

      a.prototype.invm = function (e) {
        return this.egcd(e).a.umod(e);
      };

      a.prototype.isEven = function () {
        return (1 & this.words[0]) == 0;
      };

      a.prototype.isOdd = function () {
        return (1 & this.words[0]) == 1;
      };

      a.prototype.andln = function (e) {
        return this.words[0] & e;
      };

      a.prototype.bincn = function (e) {
        r(typeof e == "number");
        var t = e % 26;
        var n = (e - t) / 26;
        var i = 1 << t;
        if (this.length <= n) {
          this._expand(n + 1);
          this.words[n] |= i;
          return this;
        }
        for (var a = i, o = n; a !== 0 && o < this.length; o++) {
          var s = 0 | this.words[o];
          s += a;
          a = s >>> 26;
          s &= 67108863 /* 0x3ffffff */;
          this.words[o] = s;
        }

        if (a !== 0) {
          this.words[o] = a;
          this.length++;
        }

        return this;
      };

      a.prototype.isZero = function () {
        return this.length === 1 && this.words[0] === 0;
      };

      a.prototype.cmpn = function (e) {
        var t;
        var n = e < 0;
        if (this.negative !== 0 && !n) {
          return -1;
        }
        if (this.negative === 0 && n) {
          return 1;
        }
        this._strip();

        if (this.length > 1) {
          t = 1;
        } else {
          if (n) {
            e = -e;
          }

          r(e <= 67108863 /* 0x3ffffff */, "Number is too big");
          var i = 0 | this.words[0];
          t = i === e ? 0 : i < e ? -1 : 1;
        }

        return this.negative !== 0 ? 0 | -t : t;
      };

      a.prototype.cmp = function (e) {
        if (this.negative !== 0 && e.negative === 0) {
          return -1;
        }
        if (this.negative === 0 && e.negative !== 0) {
          return 1;
        }
        var t = this.ucmp(e);
        return this.negative !== 0 ? 0 | -t : t;
      };

      a.prototype.ucmp = function (e) {
        if (this.length > e.length) {
          return 1;
        }
        if (this.length < e.length) {
          return -1;
        }
        for (var t = 0, n = this.length - 1; n >= 0; n--) {
          var r = 0 | this.words[n];
          var i = 0 | e.words[n];
          if (r !== i) {
            if (r < i) {
              t = -1;
            } else if (r > i) {
              t = 1;
            }

            break;
          }
        }
        return t;
      };

      a.prototype.gtn = function (e) {
        return this.cmpn(e) === 1;
      };

      a.prototype.gt = function (e) {
        return this.cmp(e) === 1;
      };

      a.prototype.gten = function (e) {
        return this.cmpn(e) >= 0;
      };

      a.prototype.gte = function (e) {
        return this.cmp(e) >= 0;
      };

      a.prototype.ltn = function (e) {
        return -1 === this.cmpn(e);
      };

      a.prototype.lt = function (e) {
        return -1 === this.cmp(e);
      };

      a.prototype.lten = function (e) {
        return this.cmpn(e) <= 0;
      };

      a.prototype.lte = function (e) {
        return this.cmp(e) <= 0;
      };

      a.prototype.eqn = function (e) {
        return this.cmpn(e) === 0;
      };

      a.prototype.eq = function (e) {
        return this.cmp(e) === 0;
      };

      a.red = function (e) {
        return new E(e);
      };

      a.prototype.toRed = function (e) {
        r(!this.red, "Already a number in reduction context");
        r(this.negative === 0, "red works only with positives");
        return e.convertTo(this)._forceRed(e);
      };

      a.prototype.fromRed = function () {
        r(this.red, "fromRed works only with numbers in reduction context");

        return this.red.convertFrom(this);
      };

      a.prototype._forceRed = function (e) {
        this.red = e;
        return this;
      };

      a.prototype.forceRed = function (e) {
        r(!this.red, "Already a number in reduction context");
        return this._forceRed(e);
      };

      a.prototype.redAdd = function (e) {
        r(this.red, "redAdd works only with red numbers");
        return this.red.add(this, e);
      };

      a.prototype.redIAdd = function (e) {
        r(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, e);
      };

      a.prototype.redSub = function (e) {
        r(this.red, "redSub works only with red numbers");
        return this.red.sub(this, e);
      };

      a.prototype.redISub = function (e) {
        r(this.red, "redISub works only with red numbers");
        return this.red.isub(this, e);
      };

      a.prototype.redShl = function (e) {
        r(this.red, "redShl works only with red numbers");
        return this.red.shl(this, e);
      };

      a.prototype.redMul = function (e) {
        r(this.red, "redMul works only with red numbers");
        this.red._verify2(this, e);
        return this.red.mul(this, e);
      };

      a.prototype.redIMul = function (e) {
        r(this.red, "redMul works only with red numbers");
        this.red._verify2(this, e);
        return this.red.imul(this, e);
      };

      a.prototype.redSqr = function () {
        r(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };

      a.prototype.redISqr = function () {
        r(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };

      a.prototype.redSqrt = function () {
        r(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };

      a.prototype.redInvm = function () {
        r(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };

      a.prototype.redNeg = function () {
        r(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };

      a.prototype.redPow = function (e) {
        r(this.red && !e.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, e);
      };

      var y = { k256: null, p224: null, p192: null, p25519: null };
      function b(e, t) {
        this.name = e;
        this.p = new a(t, 16);
        this.n = this.p.bitLength();
        this.k = new a(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      function x() {
        b.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      function S() {
        b.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      function k() {
        b.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      function T() {
        b.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      function E(e) {
        if (typeof e == "string") {
          var t = a._prime(e);
          this.m = t.p;
          this.prime = t;
        } else {
          r(e.gtn(1), "modulus must be greater than 1");
          this.m = e;
          this.prime = null;
        }
      }
      function C(e) {
        E.call(this, e);
        this.shift = this.m.bitLength();

        if (this.shift % 26 != 0) {
          this.shift += 26 - (this.shift % 26);
        }

        this.r = new a(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }

      b.prototype._tmp = function () {
        var e = new a(null);
        e.words = Array(Math.ceil(this.n / 13));
        return e;
      };

      b.prototype.ireduce = function (e) {
        var t;
        var n = e;
        do {
          this.split(n, this.tmp);
          t = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength();
        } while (t > this.n);
        var r = t < this.n ? -1 : n.ucmp(this.p);

        if (r === 0) {
          n.words[0] = 0;
          n.length = 1;
        } else if (r > 0) {
          n.isub(this.p);
        } else if (n.strip !== undefined) {
          n.strip();
        } else {
          n._strip();
        }

        return n;
      };

      b.prototype.split = function (e, t) {
        e.iushrn(this.n, 0, t);
      };

      b.prototype.imulK = function (e) {
        return e.imul(this.k);
      };

      i(x, b);

      x.prototype.split = function (e, t) {
        for (var n = Math.min(e.length, 9), r = 0; r < n; r++) {
          t.words[r] = e.words[r];
        }
        t.length = n;

        if (e.length <= 9) {
          e.words[0] = 0;
          e.length = 1;
          return;
        }

        var i = e.words[9];
        r = 10;

        for (t.words[t.length++] = 4194303 & i; r < e.length; r++) {
          var a = 0 | e.words[r];
          e.words[r - 10] = ((4194303 & a) << 4) | (i >>> 22);
          i = a;
        }

        i >>>= 22;
        e.words[r - 10] = i;

        if (i === 0 && e.length > 10) {
          e.length -= 10;
        } else {
          e.length -= 9;
        }
      };

      x.prototype.imulK = function (e) {
        e.words[e.length] = 0;
        e.words[e.length + 1] = 0;
        e.length += 2;
        for (var t = 0, n = 0; n < e.length; n++) {
          var r = 0 | e.words[n];
          t += 977 * r;
          e.words[n] = 67108863 /* 0x3ffffff */ & t;
          t = 64 * r + ((t / 67108864) /* 0x4000000 */ | 0);
        }

        if (e.words[e.length - 1] === 0) {
          e.length--;
          e.words[e.length - 1] === 0 && e.length--;
        }

        return e;
      };

      i(S, b);
      i(k, b);
      i(T, b);

      T.prototype.imulK = function (e) {
        for (var t = 0, n = 0; n < e.length; n++) {
          var r = (0 | e.words[n]) * 19 + t;
          var i = 67108863 /* 0x3ffffff */ & r;
          r >>>= 26;
          e.words[n] = i;
          t = r;
        }

        if (t !== 0) {
          e.words[e.length++] = t;
        }

        return e;
      };

      a._prime = function (e) {
        var t;
        if (y[e]) {
          return y[e];
        }
        if (e === "k256") {
          t = new x();
        } else if (e === "p224") {
          t = new S();
        } else if (e === "p192") {
          t = new k();
        } else if (e === "p25519") {
          t = new T();
        } else {
          throw Error("Unknown prime " + e);
        }
        y[e] = t;
        return t;
      };

      E.prototype._verify1 = function (e) {
        r(e.negative === 0, "red works only with positives");
        r(e.red, "red works only with red numbers");
      };

      E.prototype._verify2 = function (e, t) {
        r((e.negative | t.negative) == 0, "red works only with positives");
        r(e.red && e.red === t.red, "red works only with red numbers");
      };

      E.prototype.imod = function (e) {
        return this.prime
          ? this.prime.ireduce(e)._forceRed(this)
          : (l(e, e.umod(this.m)._forceRed(this)), e);
      };

      E.prototype.neg = function (e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      };

      E.prototype.add = function (e, t) {
        this._verify2(e, t);
        var n = e.add(t);

        if (n.cmp(this.m) >= 0) {
          n.isub(this.m);
        }

        return n._forceRed(this);
      };

      E.prototype.iadd = function (e, t) {
        this._verify2(e, t);
        var n = e.iadd(t);

        if (n.cmp(this.m) >= 0) {
          n.isub(this.m);
        }

        return n;
      };

      E.prototype.sub = function (e, t) {
        this._verify2(e, t);
        var n = e.sub(t);

        if (n.cmpn(0) < 0) {
          n.iadd(this.m);
        }

        return n._forceRed(this);
      };

      E.prototype.isub = function (e, t) {
        this._verify2(e, t);
        var n = e.isub(t);

        if (n.cmpn(0) < 0) {
          n.iadd(this.m);
        }

        return n;
      };

      E.prototype.shl = function (e, t) {
        this._verify1(e);
        return this.imod(e.ushln(t));
      };

      E.prototype.imul = function (e, t) {
        this._verify2(e, t);
        return this.imod(e.imul(t));
      };

      E.prototype.mul = function (e, t) {
        this._verify2(e, t);
        return this.imod(e.mul(t));
      };

      E.prototype.isqr = function (e) {
        return this.imul(e, e.clone());
      };

      E.prototype.sqr = function (e) {
        return this.mul(e, e);
      };

      E.prototype.sqrt = function (e) {
        if (e.isZero()) {
          return e.clone();
        }
        var t = this.m.andln(3);
        r(t % 2 == 1);

        if (t === 3) {
          var n = this.m.add(new a(1)).iushrn(2);
          return this.pow(e, n);
        }

        for (var i = this.m.subn(1), o = 0; !i.isZero() && i.andln(1) === 0; ) {
          o++;
          i.iushrn(1);
        }
        r(!i.isZero());
        var s = new a(1).toRed(this);
        var l = s.redNeg();
        var c = this.m.subn(1).iushrn(1);
        var d = this.m.bitLength();
        for (d = new a(2 * d * d).toRed(this); this.pow(d, c).cmp(l) !== 0; ) {
          d.redIAdd(l);
        }
        for (
          var u = this.pow(d, i),
            p = this.pow(e, i.addn(1).iushrn(1)),
            _ = this.pow(e, i),
            f = o;
          _.cmp(s) !== 0;

        ) {
          for (var m = _, h = 0; m.cmp(s) !== 0; h++) {
            m = m.redSqr();
          }
          r(h < f);
          var g = this.pow(u, new a(1).iushln(f - h - 1));
          p = p.redMul(g);
          u = g.redSqr();
          _ = _.redMul(u);
          f = h;
        }
        return p;
      };

      E.prototype.invm = function (e) {
        var t = e._invmp(this.m);
        return t.negative !== 0
          ? ((t.negative = 0), this.imod(t).redNeg())
          : this.imod(t);
      };

      E.prototype.pow = function (e, t) {
        if (t.isZero()) {
          return new a(1).toRed(this);
        }
        if (t.cmpn(1) === 0) {
          return e.clone();
        }
        var n = Array(16);
        n[0] = new a(1).toRed(this);
        n[1] = e;
        for (var r = 2; r < n.length; r++) {
          n[r] = this.mul(n[r - 1], e);
        }
        var [i] = n;
        var o = 0;
        var s = 0;
        var l = t.bitLength() % 26;

        if (l === 0) {
          l = 26;
        }

        for (r = t.length - 1; r >= 0; r--) {
          for (var c = t.words[r], d = l - 1; d >= 0; d--) {
            var u = (c >> d) & 1;

            if (i !== n[0]) {
              i = this.sqr(i);
            }

            if (u === 0 && o === 0) {
              s = 0;
              continue;
            }

            o <<= 1;
            o |= u;

            if (4 == ++s || (r === 0 && d === 0)) {
              i = this.mul(i, n[o]);
              s = 0;
              o = 0;
            }
          }
          l = 26;
        }

        return i;
      };

      E.prototype.convertTo = function (e) {
        var t = e.umod(this.m);
        return t === e ? t.clone() : t;
      };

      E.prototype.convertFrom = function (e) {
        var t = e.clone();
        t.red = null;
        return t;
      };

      a.mont = function (e) {
        return new C(e);
      };

      i(C, E);

      C.prototype.convertTo = function (e) {
        return this.imod(e.ushln(this.shift));
      };

      C.prototype.convertFrom = function (e) {
        var t = this.imod(e.mul(this.rinv));
        t.red = null;
        return t;
      };

      C.prototype.imul = function (e, t) {
        if (e.isZero() || t.isZero()) {
          e.words[0] = 0;
          e.length = 1;
          return e;
        }
        var n = e.imul(t);

        var r = n
          .maskn(this.shift)
          .mul(this.minv)
          .imaskn(this.shift)
          .mul(this.m);

        var i = n.isub(r).iushrn(this.shift);
        var a = i;

        if (i.cmp(this.m) >= 0) {
          a = i.isub(this.m);
        } else if (i.cmpn(0) < 0) {
          a = i.iadd(this.m);
        }

        return a._forceRed(this);
      };

      C.prototype.mul = function (e, t) {
        if (e.isZero() || t.isZero()) {
          return new a(0)._forceRed(this);
        }
        var n = e.mul(t);

        var r = n
          .maskn(this.shift)
          .mul(this.minv)
          .imaskn(this.shift)
          .mul(this.m);

        var i = n.isub(r).iushrn(this.shift);
        var o = i;

        if (i.cmp(this.m) >= 0) {
          o = i.isub(this.m);
        } else if (i.cmpn(0) < 0) {
          o = i.iadd(this.m);
        }

        return o._forceRed(this);
      };

      C.prototype.invm = function (e) {
        return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
      };
    })((e = n.nmd(e)), this);
  },
  3500: function (e, t, n) {
    var r;
    function i(e) {
      this.rand = e;
    }

    e.exports = function (e) {
      if (!r) {
        r = new i(null);
      }

      return r.generate(e);
    };

    e.exports.Rand = i;

    i.prototype.generate = function (e) {
      return this._rand(e);
    };

    i.prototype._rand = function (e) {
      if (this.rand.getBytes) {
        return this.rand.getBytes(e);
      }
      for (var t = new Uint8Array(e), n = 0; n < t.length; n++) {
        t[n] = this.rand.getByte();
      }
      return t;
    };

    if (typeof self == "object") {
      if (self.crypto && self.crypto.getRandomValues) {
        i.prototype._rand = function (e) {
          var t = new Uint8Array(e);
          self.crypto.getRandomValues(t);
          return t;
        };
      } else if (self.msCrypto && self.msCrypto.getRandomValues) {
        i.prototype._rand = function (e) {
          var t = new Uint8Array(e);
          self.msCrypto.getRandomValues(t);
          return t;
        };
      } else if (typeof window == "object") {
        i.prototype._rand = function () {
          throw Error("Not implemented yet");
        };
      }
    } else {
      try {
        var a = n(6113);
        if (typeof a.randomBytes != "function") {
          throw Error("Not supported");
        }
        i.prototype._rand = function (e) {
          return a.randomBytes(e);
        };
      } catch (e) {}
    }
  },
  1387: function (e, t, n) {
    var r = n(6911).Buffer;
    function i(e) {
      if (!r.isBuffer(e)) {
        e = r.from(e);
      }

      for (var t = (e.length / 4) | 0, n = Array(t), i = 0; i < t; i++) {
        n[i] = e.readUInt32BE(4 * i);
      }
      return n;
    }
    function a(e) {
      for (; e.length > 0; e++) {
        e[0] = 0;
      }
    }
    function o(e, t, n, r, i) {
      for (
        var a,
          o,
          s,
          l,
          c = n[0],
          d = n[1],
          u = n[2],
          p = n[3],
          _ = e[0] ^ t[0],
          f = e[1] ^ t[1],
          m = e[2] ^ t[2],
          h = e[3] ^ t[3],
          g = 4,
          y = 1;
        y < i;
        y++
      ) {
        a =
          c[_ >>> 24] ^
          d[(f >>> 16) & 255] ^
          u[(m >>> 8) & 255] ^
          p[255 & h] ^
          t[g++];

        o =
          c[f >>> 24] ^
          d[(m >>> 16) & 255] ^
          u[(h >>> 8) & 255] ^
          p[255 & _] ^
          t[g++];

        s =
          c[m >>> 24] ^
          d[(h >>> 16) & 255] ^
          u[(_ >>> 8) & 255] ^
          p[255 & f] ^
          t[g++];

        l =
          c[h >>> 24] ^
          d[(_ >>> 16) & 255] ^
          u[(f >>> 8) & 255] ^
          p[255 & m] ^
          t[g++];

        _ = a;
        f = o;
        m = s;
        h = l;
      }

      a =
        ((r[_ >>> 24] << 24) |
          (r[(f >>> 16) & 255] << 16) |
          (r[(m >>> 8) & 255] << 8) |
          r[255 & h]) ^
        t[g++];

      o =
        ((r[f >>> 24] << 24) |
          (r[(m >>> 16) & 255] << 16) |
          (r[(h >>> 8) & 255] << 8) |
          r[255 & _]) ^
        t[g++];

      s =
        ((r[m >>> 24] << 24) |
          (r[(h >>> 16) & 255] << 16) |
          (r[(_ >>> 8) & 255] << 8) |
          r[255 & f]) ^
        t[g++];

      return [
        (a >>>= 0),
        (o >>>= 0),
        (s >>>= 0),
        (l =
          (((r[h >>> 24] << 24) |
            (r[(_ >>> 16) & 255] << 16) |
            (r[(f >>> 8) & 255] << 8) |
            r[255 & m]) ^
            t[g++]) >>>
          0),
      ];
    }
    var s = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];

    var l = (function () {
      for (var e = Array(256), t = 0; t < 256; t++) {
        if (t < 128) {
          e[t] = t << 1;
        } else {
          e[t] = (t << 1) ^ 283;
        }
      }
      for (
        var n = [],
          r = [],
          i = [[], [], [], []],
          a = [[], [], [], []],
          o = 0,
          s = 0,
          l = 0;
        l < 256;
        ++l
      ) {
        var c = s ^ (s << 1) ^ (s << 2) ^ (s << 3) ^ (s << 4);
        c = (c >>> 8) ^ (255 & c) ^ 99;
        n[o] = c;
        r[c] = o;
        var d = e[o];
        var u = e[d];
        var p = e[u];
        var _ = (257 * e[c]) ^ (16843008 /* 0x1010100 */ * c);
        i[0][o] = (_ << 24) | (_ >>> 8);
        i[1][o] = (_ << 16) | (_ >>> 16);
        i[2][o] = (_ << 8) | (_ >>> 24);
        i[3][o] = _;
        _ =
          (16843009 /* 0x1010101 */ * p) ^
          (65537 * u) ^
          (257 * d) ^
          (16843008 /* 0x1010100 */ * o);
        a[0][c] = (_ << 24) | (_ >>> 8);
        a[1][c] = (_ << 16) | (_ >>> 16);
        a[2][c] = (_ << 8) | (_ >>> 24);
        a[3][c] = _;

        if (o === 0) {
          o = s = 1;
        } else {
          o = d ^ e[e[e[p ^ d]]];
          s ^= e[e[s]];
        }
      }
      return { SBOX: n, INV_SBOX: r, SUB_MIX: i, INV_SUB_MIX: a };
    })();

    function c(e) {
      this._key = i(e);
      this._reset();
    }
    c.blockSize = 16;
    c.keySize = 32;
    c.prototype.blockSize = c.blockSize;
    c.prototype.keySize = c.keySize;

    c.prototype._reset = function () {
      for (
        var e = this._key,
          t = e.length,
          n = t + 6,
          r = (n + 1) * 4,
          i = [],
          a = 0;
        a < t;
        a++
      ) {
        i[a] = e[a];
      }
      for (a = t; a < r; a++) {
        var o = i[a - 1];

        if (a % t == 0) {
          o = (o << 8) | (o >>> 24);

          o =
            ((l.SBOX[o >>> 24] << 24) |
              (l.SBOX[(o >>> 16) & 255] << 16) |
              (l.SBOX[(o >>> 8) & 255] << 8) |
              l.SBOX[255 & o]) ^
            (s[(a / t) | 0] << 24);
        } else if (t > 6 && a % t == 4) {
          o =
            (l.SBOX[o >>> 24] << 24) |
            (l.SBOX[(o >>> 16) & 255] << 16) |
            (l.SBOX[(o >>> 8) & 255] << 8) |
            l.SBOX[255 & o];
        }

        i[a] = i[a - t] ^ o;
      }
      for (var c = [], d = 0; d < r; d++) {
        var u = r - d;
        var p = i[u - (d % 4 ? 0 : 4)];

        if (d < 4 || u <= 4) {
          c[d] = p;
        } else {
          c[d] =
            l.INV_SUB_MIX[0][l.SBOX[p >>> 24]] ^
            l.INV_SUB_MIX[1][l.SBOX[(p >>> 16) & 255]] ^
            l.INV_SUB_MIX[2][l.SBOX[(p >>> 8) & 255]] ^
            l.INV_SUB_MIX[3][l.SBOX[255 & p]];
        }
      }
      this._nRounds = n;
      this._keySchedule = i;
      this._invKeySchedule = c;
    };

    c.prototype.encryptBlockRaw = function (e) {
      return o((e = i(e)), this._keySchedule, l.SUB_MIX, l.SBOX, this._nRounds);
    };

    c.prototype.encryptBlock = function (e) {
      var t = this.encryptBlockRaw(e);
      var n = r.allocUnsafe(16);
      n.writeUInt32BE(t[0], 0);
      n.writeUInt32BE(t[1], 4);
      n.writeUInt32BE(t[2], 8);
      n.writeUInt32BE(t[3], 12);
      return n;
    };

    c.prototype.decryptBlock = function (e) {
      var t = (e = i(e))[1];
      e[1] = e[3];
      e[3] = t;

      var n = o(
        e,
        this._invKeySchedule,
        l.INV_SUB_MIX,
        l.INV_SBOX,
        this._nRounds
      );

      var a = r.allocUnsafe(16);
      a.writeUInt32BE(n[0], 0);
      a.writeUInt32BE(n[3], 4);
      a.writeUInt32BE(n[2], 8);
      a.writeUInt32BE(n[1], 12);
      return a;
    };

    c.prototype.scrub = function () {
      a(this._keySchedule);
      a(this._invKeySchedule);
      a(this._key);
    };

    e.exports.AES = c;
  },
  6624: function (e, t, n) {
    var r = n(1387);
    var i = n(6911).Buffer;
    var a = n(1043);
    var o = n(3782);
    var s = n(7225);
    var l = n(4734);
    var c = n(598);
    function d(e, t, n, o) {
      a.call(this);
      var l = i.alloc(4, 0);
      this._cipher = new r.AES(t);
      var d = this._cipher.encryptBlock(l);
      this._ghash = new s(d);

      n = (function (e, t, n) {
        if (t.length === 12) {
          e._finID = i.concat([t, i.from([0, 0, 0, 1])]);
          return i.concat([t, i.from([0, 0, 0, 2])]);
        }
        var r = new s(n);
        var t_length = t.length;
        var o = t_length % 16;
        r.update(t);

        if (o) {
          o = 16 - o;
          r.update(i.alloc(o, 0));
        }

        r.update(i.alloc(8, 0));
        var l = i.alloc(8);
        l.writeUIntBE(8 * t_length, 0, 8);
        r.update(l);
        e._finID = r.state;
        var d = i.from(e._finID);
        c(d);
        return d;
      })(this, n, d);

      this._prev = i.from(n);
      this._cache = i.allocUnsafe(0);
      this._secCache = i.allocUnsafe(0);
      this._decrypt = o;
      this._alen = 0;
      this._len = 0;
      this._mode = e;
      this._authTag = null;
      this._called = false;
    }
    o(d, a);

    d.prototype._update = function (e) {
      if (!this._called && this._alen) {
        var t = 16 - (this._alen % 16);

        if (t < 16) {
          t = i.alloc(t, 0);
          this._ghash.update(t);
        }
      }
      this._called = true;
      var n = this._mode.encrypt(this, e);

      if (this._decrypt) {
        this._ghash.update(e);
      } else {
        this._ghash.update(n);
      }

      this._len += e.length;
      return n;
    };

    d.prototype._final = function () {
      if (this._decrypt && !this._authTag) {
        throw Error("Unsupported state or unable to authenticate data");
      }
      var e = l(
        this._ghash.final(8 * this._alen, 8 * this._len),
        this._cipher.encryptBlock(this._finID)
      );
      if (
        this._decrypt &&
        (function (e, t) {
          var n = 0;

          if (e.length !== t.length) {
            n++;
          }

          for (var r = Math.min(e.length, t.length), i = 0; i < r; ++i) {
            n += e[i] ^ t[i];
          }
          return n;
        })(e, this._authTag)
      ) {
        throw Error("Unsupported state or unable to authenticate data");
      }
      this._authTag = e;
      this._cipher.scrub();
    };

    d.prototype.getAuthTag = function () {
      if (this._decrypt || !i.isBuffer(this._authTag)) {
        throw Error("Attempting to get auth tag in unsupported state");
      }
      return this._authTag;
    };

    d.prototype.setAuthTag = function (e) {
      if (!this._decrypt) {
        throw Error("Attempting to set auth tag in unsupported state");
      }
      this._authTag = e;
    };

    d.prototype.setAAD = function (e) {
      if (this._called) {
        throw Error("Attempting to set AAD in unsupported state");
      }
      this._ghash.update(e);
      this._alen += e.length;
    };

    e.exports = d;
  },
  6594: function (e, t, n) {
    var r = n(2);
    var i = n(2598);
    var a = n(5866);
    t.createCipher = t.Cipher = r.createCipher;
    t.createCipheriv = t.Cipheriv = r.createCipheriv;
    t.createDecipher = t.Decipher = i.createDecipher;
    t.createDecipheriv = t.Decipheriv = i.createDecipheriv;

    t.listCiphers = t.getCiphers = function () {
      return Object.keys(a);
    };
  },
  2598: function (e, t, n) {
    var r = n(6624);
    var i = n(6911).Buffer;
    var a = n(6370);
    var o = n(126);
    var s = n(1043);
    var l = n(1387);
    var c = n(8368);
    function d(e, t, n) {
      s.call(this);
      this._cache = new u();
      this._last = undefined;
      this._cipher = new l.AES(t);
      this._prev = i.from(n);
      this._mode = e;
      this._autopadding = true;
    }
    function u() {
      this.cache = i.allocUnsafe(0);
    }
    function p(e, t, n) {
      var s = a[e.toLowerCase()];
      if (!s) {
        throw TypeError("invalid suite type");
      }

      if (typeof n == "string") {
        n = i.from(n);
      }

      if (s.mode !== "GCM" && n.length !== s.iv) {
        throw TypeError("invalid iv length " + n.length);
      }

      if (typeof t == "string") {
        t = i.from(t);
      }

      if (t.length !== s.key / 8) {
        throw TypeError("invalid key length " + t.length);
      }

      if (s.type === "stream") {
        return new o(s.module, t, n, true);
      }

      if (s.type === "auth") {
        return new r(s.module, t, n, true);
      }

      return new d(s.module, t, n);
    }
    n(3782)(d, s);

    d.prototype._update = function (e) {
      this._cache.add(e);
      for (var t, n, r = []; (t = this._cache.get(this._autopadding)); ) {
        n = this._mode.decrypt(this, t);
        r.push(n);
      }
      return i.concat(r);
    };

    d.prototype._final = function () {
      var e = this._cache.flush();
      if (this._autopadding) {
        var t = this._mode.decrypt(this, e);
        var n = t[15];
        if (n < 1 || n > 16) {
          throw Error("unable to decrypt data");
        }
        for (var r = -1; ++r < n; ) {
          if (t[r + (16 - n)] !== n) {
            throw Error("unable to decrypt data");
          }
        }
        return n !== 16 ? t.slice(0, 16 - n) : undefined;
      }
      if (e) {
        throw Error("data not multiple of block length");
      }
    };

    d.prototype.setAutoPadding = function (e) {
      this._autopadding = !!e;
      return this;
    };

    u.prototype.add = function (e) {
      this.cache = i.concat([this.cache, e]);
    };

    u.prototype.get = function (e) {
      var t;
      if (e) {
        if (this.cache.length > 16) {
          t = this.cache.slice(0, 16);
          this.cache = this.cache.slice(16);
          return t;
        }
      } else if (this.cache.length >= 16) {
        t = this.cache.slice(0, 16);
        this.cache = this.cache.slice(16);
        return t;
      }
      return null;
    };

    u.prototype.flush = function () {
      if (this.cache.length) {
        return this.cache;
      }
    };

    t.createDecipher = function (e, t) {
      var n = a[e.toLowerCase()];
      if (!n) {
        throw TypeError("invalid suite type");
      }
      var r = c(t, false, n.key, n.iv);
      return p(e, r.key, r.iv);
    };

    t.createDecipheriv = p;
  },
  2: function (e, t, n) {
    var r = n(6370);
    var i = n(6624);
    var a = n(6911).Buffer;
    var o = n(126);
    var s = n(1043);
    var l = n(1387);
    var c = n(8368);
    function d(e, t, n) {
      s.call(this);
      this._cache = new p();
      this._cipher = new l.AES(t);
      this._prev = a.from(n);
      this._mode = e;
      this._autopadding = true;
    }
    n(3782)(d, s);

    d.prototype._update = function (e) {
      this._cache.add(e);
      for (var t, n, r = []; (t = this._cache.get()); ) {
        n = this._mode.encrypt(this, t);
        r.push(n);
      }
      return a.concat(r);
    };

    var u = a.alloc(16, 16);
    function p() {
      this.cache = a.allocUnsafe(0);
    }
    function _(e, t, n) {
      var s = r[e.toLowerCase()];
      if (!s) {
        throw TypeError("invalid suite type");
      }

      if (typeof t == "string") {
        t = a.from(t);
      }

      if (t.length !== s.key / 8) {
        throw TypeError("invalid key length " + t.length);
      }

      if (typeof n == "string") {
        n = a.from(n);
      }

      if (s.mode !== "GCM" && n.length !== s.iv) {
        throw TypeError("invalid iv length " + n.length);
      }

      if (s.type === "stream") {
        return new o(s.module, t, n);
      }

      if (s.type === "auth") {
        return new i(s.module, t, n);
      }

      return new d(s.module, t, n);
    }

    d.prototype._final = function () {
      var e = this._cache.flush();
      if (this._autopadding) {
        e = this._mode.encrypt(this, e);
        this._cipher.scrub();
        return e;
      }
      if (!e.equals(u)) {
        this._cipher.scrub();
        throw Error("data not multiple of block length");
      }
    };

    d.prototype.setAutoPadding = function (e) {
      this._autopadding = !!e;
      return this;
    };

    p.prototype.add = function (e) {
      this.cache = a.concat([this.cache, e]);
    };

    p.prototype.get = function () {
      if (this.cache.length > 15) {
        var e = this.cache.slice(0, 16);
        this.cache = this.cache.slice(16);
        return e;
      }
      return null;
    };

    p.prototype.flush = function () {
      for (
        var e = 16 - this.cache.length, t = a.allocUnsafe(e), n = -1;
        ++n < e;

      ) {
        t.writeUInt8(e, n);
      }
      return a.concat([this.cache, t]);
    };

    t.createCipheriv = _;

    t.createCipher = function (e, t) {
      var n = r[e.toLowerCase()];
      if (!n) {
        throw TypeError("invalid suite type");
      }
      var i = c(t, false, n.key, n.iv);
      return _(e, i.key, i.iv);
    };
  },
  7225: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = r.alloc(16, 0);
    function a(e) {
      var t = r.allocUnsafe(16);
      t.writeUInt32BE(e[0] >>> 0, 0);
      t.writeUInt32BE(e[1] >>> 0, 4);
      t.writeUInt32BE(e[2] >>> 0, 8);
      t.writeUInt32BE(e[3] >>> 0, 12);
      return t;
    }
    function o(e) {
      this.h = e;
      this.state = r.alloc(16, 0);
      this.cache = r.allocUnsafe(0);
    }

    o.prototype.ghash = function (e) {
      for (var t = -1; ++t < e.length; ) {
        this.state[t] ^= e[t];
      }
      this._multiply();
    };

    o.prototype._multiply = function () {
      for (
        var e,
          t,
          n,
          r = [
            (e = this.h).readUInt32BE(0),
            e.readUInt32BE(4),
            e.readUInt32BE(8),
            e.readUInt32BE(12),
          ],
          i = [0, 0, 0, 0],
          o = -1;
        ++o < 128;

      ) {
        if ((this.state[~~(o / 8)] & (1 << (7 - (o % 8)))) != 0) {
          i[0] ^= r[0];
          i[1] ^= r[1];
          i[2] ^= r[2];
          i[3] ^= r[3];
        }

        n = (1 & r[3]) != 0;

        for (t = 3; t > 0; t--) {
          r[t] = (r[t] >>> 1) | ((1 & r[t - 1]) << 31);
        }

        r[0] = r[0] >>> 1;

        if (n) {
          r[0] = -520093696 /* -0x1f000000 */ ^ r[0];
        }
      }
      this.state = a(i);
    };

    o.prototype.update = function (e) {
      var t;
      for (this.cache = r.concat([this.cache, e]); this.cache.length >= 16; ) {
        t = this.cache.slice(0, 16);
        this.cache = this.cache.slice(16);
        this.ghash(t);
      }
    };

    o.prototype.final = function (e, t) {
      if (this.cache.length) {
        this.ghash(r.concat([this.cache, i], 16));
      }

      this.ghash(a([0, e, 0, t]));
      return this.state;
    };

    e.exports = o;
  },
  598: function (e) {
    e.exports = function (e) {
      for (var t, n = e.length; n--; ) {
        if (255 === (t = e.readUInt8(n))) {
          e.writeUInt8(0, n);
        } else {
          t++;
          e.writeUInt8(t, n);
          break;
        }
      }
    };
  },
  9825: function (e, t, n) {
    var r = n(4734);

    t.encrypt = function (e, t) {
      var n = r(t, e._prev);
      e._prev = e._cipher.encryptBlock(n);
      return e._prev;
    };

    t.decrypt = function (e, t) {
      var e_prev = e._prev;
      e._prev = t;
      return r(e._cipher.decryptBlock(t), e_prev);
    };
  },
  321: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(4734);
    function a(e, t, n) {
      var t_length = t.length;
      var o = i(t, e._cache);
      e._cache = e._cache.slice(t_length);
      e._prev = r.concat([e._prev, n ? t : o]);
      return o;
    }
    t.encrypt = function (e, t, n) {
      for (var i, o = r.allocUnsafe(0); t.length; ) {
        if (e._cache.length === 0) {
          e._cache = e._cipher.encryptBlock(e._prev);
          e._prev = r.allocUnsafe(0);
        }

        if (e._cache.length <= t.length) {
          i = e._cache.length;
          o = r.concat([o, a(e, t.slice(0, i), n)]);
          t = t.slice(i);
        } else {
          o = r.concat([o, a(e, t, n)]);
          break;
        }
      }
      return o;
    };
  },
  3147: function (e, t, n) {
    var r = n(6911).Buffer;
    t.encrypt = function (e, t, n) {
      for (var i = t.length, a = r.allocUnsafe(i), o = -1; ++o < i; ) {
        a[o] = (function (e, t, n) {
          for (var i, a, o, s = -1, l = 0; ++s < 8; ) {
            i = e._cipher.encryptBlock(e._prev);
            a = t & (1 << (7 - s)) ? 128 : 0;
            l += (128 & (o = i[0] ^ a)) >> s % 8;

            e._prev = (function (e, t) {
              var e_length = e.length;
              var i = -1;
              var a = r.allocUnsafe(e.length);
              for (e = r.concat([e, r.from([t])]); ++i < e_length; ) {
                a[i] = (e[i] << 1) | (e[i + 1] >> 7);
              }
              return a;
            })(e._prev, n ? a : o);
          }
          return l;
        })(e, t[o], n);
      }
      return a;
    };
  },
  2430: function (e, t, n) {
    var r = n(6911).Buffer;
    t.encrypt = function (e, t, n) {
      for (var i = t.length, a = r.allocUnsafe(i), o = -1; ++o < i; ) {
        a[o] = (function (e, t, n) {
          var i = e._cipher.encryptBlock(e._prev)[0] ^ t;
          e._prev = r.concat([e._prev.slice(1), r.from([n ? t : i])]);
          return i;
        })(e, t[o], n);
      }
      return a;
    };
  },
  3361: function (e, t, n) {
    var r = n(4734);
    var i = n(6911).Buffer;
    var a = n(598);
    t.encrypt = function (e, t) {
      var n = Math.ceil(t.length / 16);
      var o = e._cache.length;
      e._cache = i.concat([e._cache, i.allocUnsafe(16 * n)]);
      for (var s = 0; s < n; s++) {
        var l = (function (e) {
          var t = e._cipher.encryptBlockRaw(e._prev);
          a(e._prev);
          return t;
        })(e);

        var c = o + 16 * s;
        e._cache.writeUInt32BE(l[0], c + 0);
        e._cache.writeUInt32BE(l[1], c + 4);
        e._cache.writeUInt32BE(l[2], c + 8);
        e._cache.writeUInt32BE(l[3], c + 12);
      }
      var d = e._cache.slice(0, t.length);
      e._cache = e._cache.slice(t.length);
      return r(t, d);
    };
  },
  1590: function (e, t) {
    t.encrypt = function (e, t) {
      return e._cipher.encryptBlock(t);
    };

    t.decrypt = function (e, t) {
      return e._cipher.decryptBlock(t);
    };
  },
  6370: function (e, t, n) {
    var r = {
      ECB: n(1590),
      CBC: n(9825),
      CFB: n(321),
      CFB8: n(2430),
      CFB1: n(3147),
      OFB: n(3412),
      CTR: n(3361),
      GCM: n(3361),
    };

    var i = n(5866);
    for (var a in i) {
      i[a].module = r[i[a].mode];
    }
    e.exports = i;
  },
  3412: function (e, t, n) {
    var i = n(4734);
    t.encrypt = function (e, t) {
      while (e._cache.length < t.length) {
        e._cache = r.Buffer.concat([
          e._cache,
          ((e._prev = e._cipher.encryptBlock(e._prev)), e._prev),
        ]);
      }

      var n = e._cache.slice(0, t.length);
      e._cache = e._cache.slice(t.length);
      return i(t, n);
    };
  },
  126: function (e, t, n) {
    var r = n(1387);
    var i = n(6911).Buffer;
    var a = n(1043);
    function o(e, t, n, o) {
      a.call(this);
      this._cipher = new r.AES(t);
      this._prev = i.from(n);
      this._cache = i.allocUnsafe(0);
      this._secCache = i.allocUnsafe(0);
      this._decrypt = o;
      this._mode = e;
    }
    n(3782)(o, a);

    o.prototype._update = function (e) {
      return this._mode.encrypt(this, e, this._decrypt);
    };

    o.prototype._final = function () {
      this._cipher.scrub();
    };

    e.exports = o;
  },
  8996: function (e, t, n) {
    var r = n(5238);
    var i = n(6594);
    var a = n(6370);
    var o = n(6280);
    var s = n(8368);
    function l(e, t, n) {
      if (a[(e = e.toLowerCase())]) {
        return i.createCipheriv(e, t, n);
      }
      if (o[e]) {
        return new r({ key: t, iv: n, mode: e });
      }
      throw TypeError("invalid suite type");
    }
    function c(e, t, n) {
      if (a[(e = e.toLowerCase())]) {
        return i.createDecipheriv(e, t, n);
      }
      if (o[e]) {
        return new r({ key: t, iv: n, mode: e, decrypt: true });
      }
      throw TypeError("invalid suite type");
    }

    t.createCipher = t.Cipher = function (e, t) {
      if (a[(e = e.toLowerCase())]) {
        n = a[e].key;
        r = a[e].iv;
      } else if (o[e]) {
        n = 8 * o[e].key;
        r = o[e].iv;
      } else {
        throw TypeError("invalid suite type");
      }
      var n;
      var r;
      var i = s(t, false, n, r);
      return l(e, i.key, i.iv);
    };

    t.createCipheriv = l;
    t.Cipheriv = l;

    t.createDecipher = t.Decipher = function (e, t) {
      if (a[(e = e.toLowerCase())]) {
        n = a[e].key;
        r = a[e].iv;
      } else if (o[e]) {
        n = 8 * o[e].key;
        r = o[e].iv;
      } else {
        throw TypeError("invalid suite type");
      }
      var n;
      var r;
      var i = s(t, false, n, r);
      return c(e, i.key, i.iv);
    };

    t.createDecipheriv = c;
    t.Decipheriv = c;

    t.listCiphers = t.getCiphers = function () {
      return Object.keys(o).concat(i.getCiphers());
    };
  },
  5238: function (e, t, n) {
    var r = n(1043);
    var i = n(9536);
    var a = n(3782);
    var o = n(6911).Buffer;

    var s = {
      "des-ede3-cbc": i.CBC.instantiate(i.EDE),
      "des-ede3": i.EDE,
      "des-ede-cbc": i.CBC.instantiate(i.EDE),
      "des-ede": i.EDE,
      "des-cbc": i.CBC.instantiate(i.DES),
      "des-ecb": i.DES,
    };

    function l(e) {
      r.call(this);
      var t;
      var n = e.mode.toLowerCase();
      var s_n = s[n];
      t = e.decrypt ? "decrypt" : "encrypt";

      var { key, iv } = e;

      if (!o.isBuffer(key)) {
        key = o.from(key);
      }

      if (n === "des-ede" || n === "des-ede-cbc") {
        key = o.concat([key, key.slice(0, 8)]);
      }

      if (!o.isBuffer(iv)) {
        iv = o.from(iv);
      }

      this._des = s_n.create({ key: key, iv: iv, type: t });
    }
    s.des = s["des-cbc"];
    s.des3 = s["des-ede3-cbc"];
    e.exports = l;
    a(l, r);

    l.prototype._update = function (e) {
      return o.from(this._des.update(e));
    };

    l.prototype._final = function () {
      return o.from(this._des.final());
    };
  },
  6280: function (e, t) {
    t["des-ecb"] = { key: 8, iv: 0 };
    t["des-cbc"] = t.des = { key: 8, iv: 8 };
    t["des-ede3-cbc"] = t.des3 = { key: 24, iv: 8 };
    t["des-ede3"] = { key: 24, iv: 0 };
    t["des-ede-cbc"] = { key: 16, iv: 8 };
    t["des-ede"] = { key: 16, iv: 0 };
  },
  7166: function (e, t, n) {
    var i = n(711);
    var a = n(7223);
    function o(e, t) {
      var n;

      var a = {
        blinder: (n = s(t))
          .toRed(i.mont(t.modulus))
          .redPow(new i(t.publicExponent))
          .fromRed(),
        unblinder: n.invm(t.modulus),
      };

      var o = t.modulus.byteLength();
      i.mont(t.modulus);
      var l = new i(e).mul(a.blinder).umod(t.modulus);
      var c = l.toRed(i.mont(t.prime1));
      var d = l.toRed(i.mont(t.prime2));

      var { coefficient, prime1, prime2 } = t;

      var f = c.redPow(t.exponent1);
      var m = d.redPow(t.exponent2);
      f = f.fromRed();
      m = m.fromRed();
      var h = f.isub(m).imul(coefficient).umod(prime1);
      h.imul(prime2);
      m.iadd(h);
      return new r.Buffer(
        m.imul(a.unblinder).umod(t.modulus).toArray(false, o)
      );
    }
    function s(e) {
      for (
        var t = e.modulus.byteLength(), n = new i(a(t));
        n.cmp(e.modulus) >= 0 || !n.umod(e.prime1) || !n.umod(e.prime2);

      ) {
        n = new i(a(t));
      }
      return n;
    }
    e.exports = o;
    o.getr = s;
  },
  9276: function (e, t, n) {
    e.exports = n(2908);
  },
  4078: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(9739);
    var a = n(3726);
    var o = n(3782);
    var s = n(9807);
    var l = n(4013);
    var c = n(2908);
    function d(e) {
      a.Writable.call(this);
      var c_e = c[e];
      if (!c_e) {
        throw Error("Unknown message digest");
      }
      this._hashType = c_e.hash;
      this._hash = i(c_e.hash);
      this._tag = c_e.id;
      this._signType = c_e.sign;
    }
    function u(e) {
      a.Writable.call(this);
      var c_e = c[e];
      if (!c_e) {
        throw Error("Unknown message digest");
      }
      this._hash = i(c_e.hash);
      this._tag = c_e.id;
      this._signType = c_e.sign;
    }
    function p(e) {
      return new d(e);
    }
    function _(e) {
      return new u(e);
    }

    Object.keys(c).forEach(function (e) {
      c[e].id = r.from(c[e].id, "hex");
      c[e.toLowerCase()] = c[e];
    });

    o(d, a.Writable);

    d.prototype._write = function (e, t, n) {
      this._hash.update(e);
      n();
    };

    d.prototype.update = function (e, t) {
      if (typeof e == "string") {
        e = r.from(e, t);
      }

      this._hash.update(e);
      return this;
    };

    d.prototype.sign = function (e, t) {
      this.end();
      var n = s(
        this._hash.digest(),
        e,
        this._hashType,
        this._signType,
        this._tag
      );
      return t ? n.toString(t) : n;
    };

    o(u, a.Writable);

    u.prototype._write = function (e, t, n) {
      this._hash.update(e);
      n();
    };

    u.prototype.update = function (e, t) {
      if (typeof e == "string") {
        e = r.from(e, t);
      }

      this._hash.update(e);
      return this;
    };

    u.prototype.verify = function (e, t, n) {
      if (typeof t == "string") {
        t = r.from(t, n);
      }

      this.end();
      return l(t, this._hash.digest(), e, this._signType, this._tag);
    };

    e.exports = {
      Sign: p,
      Verify: _,
      createSign: p,
      createVerify: _,
    };
  },
  9807: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(4873);
    var a = n(7166);
    var o = n(949).ec;
    var s = n(1670);
    var l = n(9902);
    var c = n(9267);
    function d(e, t, n, a) {
      if ((e = r.from(e.toArray())).length < t.byteLength()) {
        var o = r.alloc(t.byteLength() - e.length);
        e = r.concat([o, e]);
      }
      var n_length = n.length;

      var l = (function (e, t) {
        e = (e = u(e, t)).mod(t);
        var n = r.from(e.toArray());
        if (n.length < t.byteLength()) {
          var i = r.alloc(t.byteLength() - n.length);
          n = r.concat([i, n]);
        }
        return n;
      })(n, t);

      var c = r.alloc(n_length);
      c.fill(1);
      var d = r.alloc(n_length);

      d = i(a, d)
        .update(c)
        .update(r.from([0]))
        .update(e)
        .update(l)
        .digest();

      c = i(a, d).update(c).digest();

      d = i(a, d)
        .update(c)
        .update(r.from([1]))
        .update(e)
        .update(l)
        .digest();

      c = i(a, d).update(c).digest();
      return { k: d, v: c };
    }
    function u(e, t) {
      var n = new s(e);
      var r = (e.length << 3) - t.bitLength();

      if (r > 0) {
        n.ishrn(r);
      }

      return n;
    }
    function p(e, t, n) {
      var a;
      var o;
      do {
        for (a = r.alloc(0); 8 * a.length < e.bitLength(); ) {
          t.v = i(n, t.k).update(t.v).digest();
          a = r.concat([a, t.v]);
        }
        o = u(a, e);

        t.k = i(n, t.k)
          .update(t.v)
          .update(r.from([0]))
          .digest();

        t.v = i(n, t.k).update(t.v).digest();
      } while (-1 !== o.cmp(e));
      return o;
    }

    e.exports = function (e, t, n, i, _) {
      var f = l(t);
      if (f.curve) {
        if (i !== "ecdsa" && i !== "ecdsa/rsa") {
          throw Error("wrong private key type");
        }
        var m = e;
        var h = f;
        var g = c[h.curve.join(".")];
        if (!g) {
          throw Error("unknown curve " + h.curve.join("."));
        }
        var y = new o(g).keyFromPrivate(h.privateKey).sign(m);
        return r.from(y.toDER());
      }
      if (f.type === "dsa") {
        if (i !== "dsa") {
          throw Error("wrong private key type");
        }
        return (function (e, t, n) {
          for (
            var i,
              a,
              o,
              l,
              c,
              _,
              f,
              m,
              h = t.params.priv_key,
              g = t.params.p,
              y = t.params.q,
              b = t.params.g,
              x = new s(0),
              S = u(e, y).mod(y),
              k = false,
              T = d(h, y, e, n);
            k === false;

          ) {
            i = b;
            a = m = p(y, T, n);
            o = g;
            l = y;
            x = i.toRed(s.mont(o)).redPow(a).fromRed().mod(l);

            if (
              (k = m
                .invm(y)
                .imul(S.add(h.mul(x)))
                .mod(y)).cmpn(0) === 0
            ) {
              k = false;
              x = new s(0);
            }
          }
          c = x;
          _ = k;
          c = c.toArray();
          _ = _.toArray();

          if (128 & c[0]) {
            c = [0].concat(c);
          }

          if (128 & _[0]) {
            _ = [0].concat(_);
          }

          f = (f = [48, c.length + _.length + 4, 2, c.length]).concat(
            c,
            [2, _.length],
            _
          );

          return r.from(f);
        })(e, f, n);
      }
      if (i !== "rsa" && i !== "ecdsa/rsa") {
        throw Error("wrong private key type");
      }
      e = r.concat([_, e]);
      for (
        var b = f.modulus.byteLength(), x = [0, 1];
        e.length + x.length + 1 < b;

      ) {
        x.push(255);
      }
      x.push(0);
      for (var S = -1; ++S < e.length; ) {
        x.push(e[S]);
      }
      return a(x, f);
    };

    e.exports.getKey = d;
    e.exports.makeKey = p;
  },
  4013: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(1670);
    var a = n(949).ec;
    var o = n(9902);
    var s = n(9267);
    function l(e, t) {
      if (e.cmpn(0) <= 0 || e.cmp(t) >= t) {
        throw Error("invalid sig");
      }
    }
    e.exports = function (e, t, n, c, d) {
      var u;
      var p;
      var _;
      var f;
      var m;
      var h;
      var g;
      var y;
      var b;
      var x;
      var S;
      var k;
      var T = o(n);
      if (T.type === "ec") {
        if (c !== "ecdsa" && c !== "ecdsa/rsa") {
          throw Error("wrong public key type");
        }
        var E = e;
        var C = t;
        var A = T;
        var w = s[A.data.algorithm.curve.join(".")];
        if (!w) {
          throw Error("unknown curve " + A.data.algorithm.curve.join("."));
        }
        var D = new a(w);
        var N = A.data.subjectPrivateKey.data;
        return D.verify(C, E, N);
      }
      if (T.type === "dsa") {
        if (c !== "dsa") {
          throw Error("wrong public key type");
        }
        u = e;
        p = t;
        f = (_ = T).data.p;
        m = _.data.q;
        h = _.data.g;
        g = _.data.pub_key;
        b = (y = o.signature.decode(u, "der")).s;
        x = y.r;
        l(b, m);
        l(x, m);
        S = i.mont(f);
        k = b.invm(m);

        return (
          h
            .toRed(S)
            .redPow(new i(p).mul(k).mod(m))
            .fromRed()
            .mul(g.toRed(S).redPow(x.mul(k).mod(m)).fromRed())
            .mod(f)
            .mod(m)
            .cmp(x) === 0
        );
      }
      if (c !== "rsa" && c !== "ecdsa/rsa") {
        throw Error("wrong public key type");
      }
      t = r.concat([d, t]);
      for (
        var I = T.modulus.byteLength(), P = [1], M = 0;
        t.length + P.length + 2 < I;

      ) {
        P.push(255);
        M++;
      }
      P.push(0);
      for (var L = -1; ++L < t.length; ) {
        P.push(t[L]);
      }
      P = r.from(P);
      var R = i.mont(T.modulus);
      e = (e = new i(e).toRed(R)).redPow(new i(T.publicExponent));
      var F = +(M < 8);
      I = Math.min((e = r.from(e.fromRed().toArray())).length, P.length);

      if (e.length !== P.length) {
        F = 1;
      }

      for (L = -1; ++L < I; ) {
        F |= e[L] ^ P[L];
      }

      return F === 0;
    };
  },
  4734: function (e) {
    e.exports = function (e, t) {
      for (
        var n = Math.min(e.length, t.length), i = new r.Buffer(n), a = 0;
        a < n;
        ++a
      ) {
        i[a] = e[a] ^ t[a];
      }
      return i;
    };
  },
  1043: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(2781).Transform;
    var a = n(1576).StringDecoder;
    function o(e) {
      i.call(this);
      this.hashMode = typeof e == "string";

      if (this.hashMode) {
        this[e] = this._finalOrDigest;
      } else {
        this.final = this._finalOrDigest;
      }

      if (this._final) {
        this.__final = this._final;
        this._final = null;
      }

      this._decoder = null;
      this._encoding = null;
    }
    n(3782)(o, i);

    o.prototype.update = function (e, t, n) {
      if (typeof e == "string") {
        e = r.from(e, t);
      }

      var i = this._update(e);
      return this.hashMode ? this : (n && (i = this._toString(i, n)), i);
    };

    o.prototype.setAutoPadding = function () {};

    o.prototype.getAuthTag = function () {
      throw Error("trying to get auth tag in unsupported state");
    };

    o.prototype.setAuthTag = function () {
      throw Error("trying to set auth tag in unsupported state");
    };

    o.prototype.setAAD = function () {
      throw Error("trying to set aad in unsupported state");
    };

    o.prototype._transform = function (e, t, n) {
      var r;
      try {
        if (this.hashMode) {
          this._update(e);
        } else {
          this.push(this._update(e));
        }
      } catch (e) {
        r = e;
      } finally {
        n(r);
      }
    };

    o.prototype._flush = function (e) {
      var t;
      try {
        this.push(this.__final());
      } catch (e) {
        t = e;
      }
      e(t);
    };

    o.prototype._finalOrDigest = function (e) {
      var t = this.__final() || r.alloc(0);

      if (e) {
        t = this._toString(t, e, true);
      }

      return t;
    };

    o.prototype._toString = function (e, t, n) {
      if (!this._decoder) {
        this._decoder = new a(t);
        this._encoding = t;
      }

      if (this._encoding !== t) {
        throw Error("can't switch encodings");
      }

      var r = this._decoder.write(e);

      if (n) {
        r += this._decoder.end();
      }

      return r;
    };

    e.exports = o;
  },
  9942: function (e, t, n) {
    var i = n(949);
    var a = n(711);
    e.exports = function (e) {
      return new s(e);
    };
    var o = {
      secp256k1: { name: "secp256k1", byteLength: 32 },
      secp224r1: { name: "p224", byteLength: 28 },
      prime256v1: { name: "p256", byteLength: 32 },
      prime192v1: { name: "p192", byteLength: 24 },
      ed25519: { name: "ed25519", byteLength: 32 },
      secp384r1: { name: "p384", byteLength: 48 },
      secp521r1: { name: "p521", byteLength: 66 },
    };
    function s(e) {
      this.curveType = o[e];

      if (!this.curveType) {
        this.curveType = { name: e };
      }

      this.curve = new i.ec(this.curveType.name);
      this.keys = undefined;
    }
    function l(e, t, n) {
      if (!Array.isArray(e)) {
        e = e.toArray();
      }

      var i = new r.Buffer(e);
      if (n && i.length < n) {
        var a = new r.Buffer(n - i.length);
        a.fill(0);
        i = r.Buffer.concat([a, i]);
      }
      return t ? i.toString(t) : i;
    }
    o.p224 = o.secp224r1;
    o.p256 = o.secp256r1 = o.prime256v1;
    o.p192 = o.secp192r1 = o.prime192v1;
    o.p384 = o.secp384r1;
    o.p521 = o.secp521r1;

    s.prototype.generateKeys = function (e, t) {
      this.keys = this.curve.genKeyPair();
      return this.getPublicKey(e, t);
    };

    s.prototype.computeSecret = function (e, t, n) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      return l(
        this.curve
          .keyFromPublic(e)
          .getPublic()
          .mul(this.keys.getPrivate())
          .getX(),
        n,
        this.curveType.byteLength
      );
    };

    s.prototype.getPublicKey = function (e, t) {
      var n = this.keys.getPublic(t === "compressed", true);

      if (t === "hybrid") {
        if (n[n.length - 1] % 2) {
          n[0] = 7;
        } else {
          n[0] = 6;
        }
      }

      return l(n, e);
    };

    s.prototype.getPrivateKey = function (e) {
      return l(this.keys.getPrivate(), e);
    };

    s.prototype.setPublicKey = function (e, t) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      this.keys._importPublic(e);
      return this;
    };

    s.prototype.setPrivateKey = function (e, t) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      var n = new a(e);
      n = n.toString(16);
      this.keys = this.curve.genKeyPair();
      this.keys._importPrivate(n);
      return this;
    };
  },
  9739: function (e, t, n) {
    var r = n(3782);
    var i = n(3533);
    var a = n(3225);
    var o = n(4371);
    var s = n(1043);
    function l(e) {
      s.call(this, "digest");
      this._hash = e;
    }
    r(l, s);

    l.prototype._update = function (e) {
      this._hash.update(e);
    };

    l.prototype._final = function () {
      return this._hash.digest();
    };

    e.exports = function (e) {
      if ("md5" === (e = e.toLowerCase())) {
        return new i();
      }

      if (e === "rmd160" || e === "ripemd160") {
        return new a();
      }

      return new l(o(e));
    };
  },
  450: function (e, t, n) {
    var r = n(3533);
    e.exports = function (e) {
      return new r().update(e).digest();
    };
  },
  4873: function (e, t, n) {
    var r = n(3782);
    var i = n(8119);
    var a = n(1043);
    var o = n(6911).Buffer;
    var s = n(450);
    var l = n(3225);
    var c = n(4371);
    var d = o.alloc(128);
    function u(e, t) {
      a.call(this, "digest");

      if (typeof t == "string") {
        t = o.from(t);
      }

      var n = e === "sha512" || e === "sha384" ? 128 : 64;
      this._alg = e;
      this._key = t;

      if (t.length > n) {
        t = (e === "rmd160" ? new l() : c(e)).update(t).digest();
      } else if (t.length < n) {
        t = o.concat([t, d], n);
      }

      for (
        var r = (this._ipad = o.allocUnsafe(n)),
          i = (this._opad = o.allocUnsafe(n)),
          s = 0;
        s < n;
        s++
      ) {
        r[s] = 54 ^ t[s];
        i[s] = 92 ^ t[s];
      }
      this._hash = e === "rmd160" ? new l() : c(e);
      this._hash.update(r);
    }
    r(u, a);

    u.prototype._update = function (e) {
      this._hash.update(e);
    };

    u.prototype._final = function () {
      var e = this._hash.digest();
      return (this._alg === "rmd160" ? new l() : c(this._alg))
        .update(this._opad)
        .update(e)
        .digest();
    };

    e.exports = function (e, t) {
      if ("rmd160" === (e = e.toLowerCase()) || e === "ripemd160") {
        return new u("rmd160", t);
      }

      if (e === "md5") {
        return new i(s, t);
      }

      return new u(e, t);
    };
  },
  8119: function (e, t, n) {
    var r = n(3782);
    var i = n(6911).Buffer;
    var a = n(1043);
    var o = i.alloc(128);
    function s(e, t) {
      a.call(this, "digest");

      if (typeof t == "string") {
        t = i.from(t);
      }

      this._alg = e;
      this._key = t;

      if (t.length > 64) {
        t = e(t);
      } else if (t.length < 64) {
        t = i.concat([t, o], 64);
      }

      for (
        var n = (this._ipad = i.allocUnsafe(64)),
          r = (this._opad = i.allocUnsafe(64)),
          s = 0;
        s < 64;
        s++
      ) {
        n[s] = 54 ^ t[s];
        r[s] = 92 ^ t[s];
      }
      this._hash = [n];
    }
    r(s, a);

    s.prototype._update = function (e) {
      this._hash.push(e);
    };

    s.prototype._final = function () {
      var e = this._alg(i.concat(this._hash));
      return this._alg(i.concat([this._opad, e]));
    };

    e.exports = s;
  },
  9536: function (e, t, n) {
    t.utils = n(5334);
    t.Cipher = n(9876);
    t.DES = n(1016);
    t.CBC = n(8641);
    t.EDE = n(6159);
  },
  8641: function (e, t, n) {
    var r = n(3523);
    var i = n(3782);
    var a = {};
    function o(e) {
      r.equal(e.length, 8, "Invalid IV length");
      this.iv = Array(8);
      for (var t = 0; t < this.iv.length; t++) {
        this.iv[t] = e[t];
      }
    }

    t.instantiate = function (e) {
      function t(t) {
        e.call(this, t);
        this._cbcInit();
      }
      i(t, e);
      for (var n = Object.keys(a), r = 0; r < n.length; r++) {
        var n_r = n[r];
        t.prototype[n_r] = a[n_r];
      }

      t.create = function (e) {
        return new t(e);
      };

      return t;
    };

    a._cbcInit = function () {
      var e = new o(this.options.iv);
      this._cbcState = e;
    };

    a._update = function (e, t, n, r) {
      var i = this._cbcState;
      var a = this.constructor.super_.prototype;
      var i_iv = i.iv;
      if (this.type === "encrypt") {
        for (var s = 0; s < this.blockSize; s++) {
          i_iv[s] ^= e[t + s];
        }
        a._update.call(this, i_iv, 0, n, r);
        for (var s = 0; s < this.blockSize; s++) {
          i_iv[s] = n[r + s];
        }
      } else {
        a._update.call(this, e, t, n, r);
        for (var s = 0; s < this.blockSize; s++) {
          n[r + s] ^= i_iv[s];
        }
        for (var s = 0; s < this.blockSize; s++) {
          i_iv[s] = e[t + s];
        }
      }
    };
  },
  9876: function (e, t, n) {
    var r = n(3523);
    function i(e) {
      this.options = e;
      this.type = this.options.type;
      this.blockSize = 8;
      this._init();
      this.buffer = Array(this.blockSize);
      this.bufferOff = 0;
    }
    e.exports = i;
    i.prototype._init = function () {};

    i.prototype.update = function (e) {
      if (e.length === 0) {
        return [];
      }

      if (this.type === "decrypt") {
        return this._updateDecrypt(e);
      }

      return this._updateEncrypt(e);
    };

    i.prototype._buffer = function (e, t) {
      for (
        var n = Math.min(this.buffer.length - this.bufferOff, e.length - t),
          r = 0;
        r < n;
        r++
      ) {
        this.buffer[this.bufferOff + r] = e[t + r];
      }
      this.bufferOff += n;
      return n;
    };

    i.prototype._flushBuffer = function (e, t) {
      this._update(this.buffer, 0, e, t);
      this.bufferOff = 0;
      return this.blockSize;
    };

    i.prototype._updateEncrypt = function (e) {
      var t = 0;
      var n = 0;

      var r = Array(
        (((this.bufferOff + e.length) / this.blockSize) | 0) * this.blockSize
      );

      if (this.bufferOff !== 0) {
        t += this._buffer(e, t);

        this.bufferOff === this.buffer.length && (n += this._flushBuffer(r, n));
      }

      for (
        var i = e.length - ((e.length - t) % this.blockSize);
        t < i;
        t += this.blockSize
      ) {
        this._update(e, t, r, n);
        n += this.blockSize;
      }
      for (; t < e.length; t++, this.bufferOff++) {
        this.buffer[this.bufferOff] = e[t];
      }
      return r;
    };

    i.prototype._updateDecrypt = function (e) {
      for (
        var t = 0,
          n = 0,
          r = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1,
          i = Array(r * this.blockSize);
        r > 0;
        r--
      ) {
        t += this._buffer(e, t);
        n += this._flushBuffer(i, n);
      }
      t += this._buffer(e, t);
      return i;
    };

    i.prototype.final = function (e) {
      var t;
      var n;
      return (e && (t = this.update(e)),
      (n =
        this.type === "encrypt" ? this._finalEncrypt() : this._finalDecrypt()),
      t)
        ? t.concat(n)
        : n;
    };

    i.prototype._pad = function (e, t) {
      if (t === 0) {
        return false;
      }

      while (t < e.length) {
        e[t++] = 0;
      }

      return true;
    };

    i.prototype._finalEncrypt = function () {
      if (!this._pad(this.buffer, this.bufferOff)) {
        return [];
      }
      var e = Array(this.blockSize);
      this._update(this.buffer, 0, e, 0);
      return e;
    };

    i.prototype._unpad = function (e) {
      return e;
    };

    i.prototype._finalDecrypt = function () {
      r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
      var e = Array(this.blockSize);
      this._flushBuffer(e, 0);
      return this._unpad(e);
    };
  },
  1016: function (e, t, n) {
    var r = n(3523);
    var i = n(3782);
    var a = n(5334);
    var o = n(9876);
    function s() {
      this.tmp = Array(2);
      this.keys = null;
    }
    function l(e) {
      o.call(this, e);
      var t = new s();
      this._desState = t;
      this.deriveKeys(t, e.key);
    }
    i(l, o);
    e.exports = l;

    l.create = function (e) {
      return new l(e);
    };

    var c = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    l.prototype.deriveKeys = function (e, t) {
      e.keys = Array(32);
      r.equal(t.length, this.blockSize, "Invalid key length");
      var n = a.readUInt32BE(t, 0);
      var i = a.readUInt32BE(t, 4);
      a.pc1(n, i, e.tmp, 0);
      n = e.tmp[0];
      i = e.tmp[1];
      for (var o = 0; o < e.keys.length; o += 2) {
        var s = c[o >>> 1];
        n = a.r28shl(n, s);
        i = a.r28shl(i, s);
        a.pc2(n, i, e.keys, o);
      }
    };

    l.prototype._update = function (e, t, n, r) {
      var i = this._desState;
      var o = a.readUInt32BE(e, t);
      var s = a.readUInt32BE(e, t + 4);
      a.ip(o, s, i.tmp, 0);
      o = i.tmp[0];
      s = i.tmp[1];

      if (this.type === "encrypt") {
        this._encrypt(i, o, s, i.tmp, 0);
      } else {
        this._decrypt(i, o, s, i.tmp, 0);
      }

      o = i.tmp[0];
      s = i.tmp[1];
      a.writeUInt32BE(n, o, r);
      a.writeUInt32BE(n, s, r + 4);
    };

    l.prototype._pad = function (e, t) {
      for (var n = e.length - t, r = t; r < e.length; r++) {
        e[r] = n;
      }
      return true;
    };

    l.prototype._unpad = function (e) {
      for (var t = e[e.length - 1], n = e.length - t; n < e.length; n++) {
        r.equal(e[n], t);
      }
      return e.slice(0, e.length - t);
    };

    l.prototype._encrypt = function (e, t, n, r, i) {
      for (var o = t, s = n, l = 0; l < e.keys.length; l += 2) {
        var c = e.keys[l];
        var d = e.keys[l + 1];
        a.expand(s, e.tmp, 0);
        c ^= e.tmp[0];
        d ^= e.tmp[1];
        var u = a.substitute(c, d);
        var p = a.permute(u);
        var _ = s;
        s = (o ^ p) >>> 0;
        o = _;
      }
      a.rip(s, o, r, i);
    };

    l.prototype._decrypt = function (e, t, n, r, i) {
      for (var o = n, s = t, l = e.keys.length - 2; l >= 0; l -= 2) {
        var c = e.keys[l];
        var d = e.keys[l + 1];
        a.expand(o, e.tmp, 0);
        c ^= e.tmp[0];
        d ^= e.tmp[1];
        var u = a.substitute(c, d);
        var p = a.permute(u);
        var _ = o;
        o = (s ^ p) >>> 0;
        s = _;
      }
      a.rip(o, s, r, i);
    };
  },
  6159: function (e, t, n) {
    var r = n(3523);
    var i = n(3782);
    var a = n(9876);
    var o = n(1016);
    function s(e, t) {
      r.equal(t.length, 24, "Invalid key length");
      var n = t.slice(0, 8);
      var i = t.slice(8, 16);
      var a = t.slice(16, 24);

      if (e === "encrypt") {
        this.ciphers = [
          o.create({ type: "encrypt", key: n }),
          o.create({ type: "decrypt", key: i }),
          o.create({ type: "encrypt", key: a }),
        ];
      } else {
        this.ciphers = [
          o.create({ type: "decrypt", key: a }),
          o.create({ type: "encrypt", key: i }),
          o.create({ type: "decrypt", key: n }),
        ];
      }
    }
    function l(e) {
      a.call(this, e);
      var t = new s(this.type, this.options.key);
      this._edeState = t;
    }
    i(l, a);
    e.exports = l;

    l.create = function (e) {
      return new l(e);
    };

    l.prototype._update = function (e, t, n, r) {
      var i = this._edeState;
      i.ciphers[0]._update(e, t, n, r);
      i.ciphers[1]._update(n, r, n, r);
      i.ciphers[2]._update(n, r, n, r);
    };

    l.prototype._pad = o.prototype._pad;
    l.prototype._unpad = o.prototype._unpad;
  },
  5334: function (e, t) {
    t.readUInt32BE = function (e, t) {
      return (
        ((e[0 + t] << 24) | (e[1 + t] << 16) | (e[2 + t] << 8) | e[3 + t]) >>> 0
      );
    };

    t.writeUInt32BE = function (e, t, n) {
      e[0 + n] = t >>> 24;
      e[1 + n] = (t >>> 16) & 255;
      e[2 + n] = (t >>> 8) & 255;
      e[3 + n] = 255 & t;
    };

    t.ip = function (e, t, n, r) {
      for (var i = 0, a = 0, o = 6; o >= 0; o -= 2) {
        for (var s = 0; s <= 24; s += 8) {
          i <<= 1;
          i |= (t >>> (s + o)) & 1;
        }
        for (var s = 0; s <= 24; s += 8) {
          i <<= 1;
          i |= (e >>> (s + o)) & 1;
        }
      }
      for (var o = 6; o >= 0; o -= 2) {
        for (var s = 1; s <= 25; s += 8) {
          a <<= 1;
          a |= (t >>> (s + o)) & 1;
        }
        for (var s = 1; s <= 25; s += 8) {
          a <<= 1;
          a |= (e >>> (s + o)) & 1;
        }
      }
      n[r + 0] = i >>> 0;
      n[r + 1] = a >>> 0;
    };

    t.rip = function (e, t, n, r) {
      for (var i = 0, a = 0, o = 0; o < 4; o++) {
        for (var s = 24; s >= 0; s -= 8) {
          i <<= 1;
          i |= (t >>> (s + o)) & 1;
          i <<= 1;
          i |= (e >>> (s + o)) & 1;
        }
      }
      for (var o = 4; o < 8; o++) {
        for (var s = 24; s >= 0; s -= 8) {
          a <<= 1;
          a |= (t >>> (s + o)) & 1;
          a <<= 1;
          a |= (e >>> (s + o)) & 1;
        }
      }
      n[r + 0] = i >>> 0;
      n[r + 1] = a >>> 0;
    };

    t.pc1 = function (e, t, n, r) {
      for (var i = 0, a = 0, o = 7; o >= 5; o--) {
        for (var s = 0; s <= 24; s += 8) {
          i <<= 1;
          i |= (t >> (s + o)) & 1;
        }
        for (var s = 0; s <= 24; s += 8) {
          i <<= 1;
          i |= (e >> (s + o)) & 1;
        }
      }
      for (var s = 0; s <= 24; s += 8) {
        i <<= 1;
        i |= (t >> (s + o)) & 1;
      }
      for (var o = 1; o <= 3; o++) {
        for (var s = 0; s <= 24; s += 8) {
          a <<= 1;
          a |= (t >> (s + o)) & 1;
        }
        for (var s = 0; s <= 24; s += 8) {
          a <<= 1;
          a |= (e >> (s + o)) & 1;
        }
      }
      for (var s = 0; s <= 24; s += 8) {
        a <<= 1;
        a |= (e >> (s + o)) & 1;
      }
      n[r + 0] = i >>> 0;
      n[r + 1] = a >>> 0;
    };

    t.r28shl = function (e, t) {
      return ((e << t) & 268435455) /* 0xfffffff */ | (e >>> (28 - t));
    };

    var n = [
      14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21,
      1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22,
      3, 10, 14, 6, 20, 27, 24,
    ];

    t.pc2 = function (e, t, r, i) {
      for (var a = 0, o = 0, s = n.length >>> 1, l = 0; l < s; l++) {
        a <<= 1;
        a |= (e >>> n[l]) & 1;
      }
      for (var l = s; l < n.length; l++) {
        o <<= 1;
        o |= (t >>> n[l]) & 1;
      }
      r[i + 0] = a >>> 0;
      r[i + 1] = o >>> 0;
    };

    t.expand = function (e, t, n) {
      var r = 0;
      var i = 0;
      r = ((1 & e) << 5) | (e >>> 27);
      for (var a = 23; a >= 15; a -= 4) {
        r <<= 6;
        r |= (e >>> a) & 63;
      }
      for (var a = 11; a >= 3; a -= 4) {
        i |= (e >>> a) & 63;
        i <<= 6;
      }
      i |= ((31 & e) << 1) | (e >>> 31);
      t[n + 0] = r >>> 0;
      t[n + 1] = i >>> 0;
    };

    var r = [
      14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6,
      12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6,
      9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15,
      3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13,
      10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15,
      13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13,
      0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14,
      11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8,
      0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13,
      8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1,
      12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13,
      8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4,
      2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0,
      9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15,
      6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15,
      2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3,
      11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14,
      4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4,
      0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6,
      1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0,
      8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3,
      11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2,
      11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13,
      0, 15, 3, 3, 5, 5, 6, 8, 11,
    ];
    t.substitute = function (e, t) {
      for (var n = 0, i = 0; i < 4; i++) {
        var a = (e >>> (18 - 6 * i)) & 63;
        var o = r[64 * i + a];
        n <<= 4;
        n |= o;
      }
      for (var i = 0; i < 4; i++) {
        var a = (t >>> (18 - 6 * i)) & 63;
        var o = r[256 + 64 * i + a];
        n <<= 4;
        n |= o;
      }
      return n >>> 0;
    };
    var i = [
      16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18,
      0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7,
    ];

    t.permute = function (e) {
      for (var t = 0, n = 0; n < i.length; n++) {
        t <<= 1;
        t |= (e >>> i[n]) & 1;
      }
      return t >>> 0;
    };

    t.padSplit = function (e, t, n) {
      for (var r = e.toString(2); r.length < t; ) {
        r = "0" + r;
      }
      for (var i = [], a = 0; a < t; a += n) {
        i.push(r.slice(a, a + n));
      }
      return i.join(" ");
    };
  },
  6587: function (e, t, n) {
    var i = n(296);
    var a = n(7992);
    var o = n(373);
    var s = { binary: true, hex: true, base64: true };

    t.DiffieHellmanGroup =
      t.createDiffieHellmanGroup =
      t.getDiffieHellman =
        function (e) {
          return new o(
            new r.Buffer(a[e].prime, "hex"),
            new r.Buffer(a[e].gen, "hex")
          );
        };

    t.createDiffieHellman = t.DiffieHellman = function e(t, n, a, l) {
      if (r.Buffer.isBuffer(n) || s[n] === undefined) {
        return e(t, "binary", n, a);
      }

      n = n || "binary";
      l = l || "binary";
      a = a || new r.Buffer([2]);
      r.Buffer.isBuffer(a) || (a = new r.Buffer(a, l));

      if (typeof t == "number") {
        return new o(i(t, a), a, true);
      }

      r.Buffer.isBuffer(t) || (t = new r.Buffer(t, n));
      return new o(t, a, true);
    };
  },
  373: function (e, t, n) {
    var i = n(711);
    var a = new (n(1354))();
    var o = new i(24);
    var s = new i(11);
    var l = new i(10);
    var c = new i(3);
    var d = new i(7);
    var u = n(296);
    var p = n(7223);
    function _(e, t) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      this._pub = new i(e);
      return this;
    }
    function f(e, t) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      this._priv = new i(e);
      return this;
    }
    e.exports = h;
    var m = {};
    function h(e, t, n) {
      this.setGenerator(t);
      this.__prime = new i(e);
      this._prime = i.mont(this.__prime);
      this._primeLen = e.length;
      this._pub = undefined;
      this._priv = undefined;
      this._primeCode = undefined;

      if (n) {
        this.setPublicKey = _;
        this.setPrivateKey = f;
      } else {
        this._primeCode = 8;
      }
    }
    function g(e, t) {
      var n = new r.Buffer(e.toArray());
      return t ? n.toString(t) : n;
    }

    Object.defineProperty(h.prototype, "verifyError", {
      enumerable: true,
      get: function () {
        if (typeof this._primeCode != "number") {
          this._primeCode = (function (e, t) {
            var n;
            var r = t.toString("hex");
            var i = [r, e.toString(16)].join("_");
            if (i in m) {
              return m[i];
            }
            var p = 0;
            if (
              e.isEven() ||
              !u.simpleSieve ||
              !u.fermatTest(e) ||
              !a.test(e)
            ) {
              p += 1;

              if (r === "02" || r === "05") {
                p += 8;
              } else {
                p += 4;
              }

              m[i] = p;
              return p;
            }

            if (!a.test(e.shrn(1))) {
              p += 2;
            }

            switch (r) {
              case "02": {
                if (e.mod(o).cmp(s)) {
                  p += 8;
                }

                break;
              }
              case "05": {
                if ((n = e.mod(l)).cmp(c) && n.cmp(d)) {
                  p += 8;
                }

                break;
              }
              default: {
                p += 4;
              }
            }

            m[i] = p;
            return p;
          })(this.__prime, this.__gen);
        }

        return this._primeCode;
      },
    });

    h.prototype.generateKeys = function () {
      if (!this._priv) {
        this._priv = new i(p(this._primeLen));
      }

      this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();

      return this.getPublicKey();
    };

    h.prototype.computeSecret = function (e) {
      var t = (e = (e = new i(e)).toRed(this._prime))
        .redPow(this._priv)
        .fromRed();

      var n = new r.Buffer(t.toArray());
      var a = this.getPrime();
      if (n.length < a.length) {
        var o = new r.Buffer(a.length - n.length);
        o.fill(0);
        n = r.Buffer.concat([o, n]);
      }
      return n;
    };

    h.prototype.getPublicKey = function (e) {
      return g(this._pub, e);
    };

    h.prototype.getPrivateKey = function (e) {
      return g(this._priv, e);
    };

    h.prototype.getPrime = function (e) {
      return g(this.__prime, e);
    };

    h.prototype.getGenerator = function (e) {
      return g(this._gen, e);
    };

    h.prototype.setGenerator = function (e, t) {
      t = t || "utf8";

      if (!r.Buffer.isBuffer(e)) {
        e = new r.Buffer(e, t);
      }

      this.__gen = e;
      this._gen = new i(e);
      return this;
    };
  },
  296: function (e, t, n) {
    var r = n(7223);
    e.exports = g;
    g.simpleSieve = m;
    g.fermatTest = h;
    var i = n(711);
    var a = new i(24);
    var o = new (n(1354))();
    var s = new i(1);
    var l = new i(2);
    var c = new i(5);
    new i(16);
    new i(8);
    var d = new i(10);
    var u = new i(3);
    new i(7);
    var p = new i(11);
    var _ = new i(4);
    new i(12);
    var f = null;
    function m(e) {
      for (
        var t = (function () {
            if (f !== null) {
              return f;
            }
            var e = [];
            e[0] = 2;
            for (var t = 1, n = 3; n < 1048576; n += 2) {
              for (
                var r = Math.ceil(Math.sqrt(n)), i = 0;
                i < t && e[i] <= r && n % e[i] != 0;
                i++
              ) {}

              if (t === i || e[i] > r) {
                e[t++] = n;
              }
            }
            f = e;
            return e;
          })(),
          n = 0;
        n < t.length;
        n++
      ) {
        if (e.modn(t[n]) === 0) {
          if (e.cmpn(t[n]) !== 0) {
            return false;
          } else {
            break;
          }
        }
      }
      return true;
    }
    function h(e) {
      var t = i.mont(e);
      return l.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1) === 0;
    }
    function g(e, t) {
      var n;
      var f;
      if (e < 16) {
        if (t === 2 || t === 5) {
          return new i([140, 123]);
        } else {
          return new i([140, 39]);
        }
      }
      for (t = new i(t); ; ) {
        for (n = new i(r(Math.ceil(e / 8))); n.bitLength() > e; ) {
          n.ishrn(1);
        }

        if (n.isEven()) {
          n.iadd(s);
        }

        if (!n.testn(1)) {
          n.iadd(l);
        }

        if (t.cmp(l)) {
          if (!t.cmp(c)) {
            while (n.mod(d).cmp(u)) {
              n.iadd(_);
            }
          }
        } else {
          while (n.mod(a).cmp(p)) {
            n.iadd(_);
          }
        }

        if (
          m((f = n.shrn(1))) &&
          m(n) &&
          h(f) &&
          h(n) &&
          o.test(f) &&
          o.test(n)
        ) {
          return n;
        }
      }
    }
  },
  949: function (e, t, n) {
    t.version = n(2531).i8;
    t.utils = n(4401);
    t.rand = n(3500);
    t.curve = n(9359);
    t.curves = n(6226);
    t.ec = n(4088);
    t.eddsa = n(8511);
  },
  2727: function (e, t, n) {
    var r = n(711);
    var i = n(4401);

    var { getNAF, getJSF, assert } = i;

    function l(e, t) {
      this.type = e;
      this.p = new r(t.p, 16);
      this.red = t.prime ? r.red(t.prime) : r.mont(this.p);
      this.zero = new r(0).toRed(this.red);
      this.one = new r(1).toRed(this.red);
      this.two = new r(2).toRed(this.red);
      this.n = t.n && new r(t.n, 16);
      this.g = t.g && this.pointFromJSON(t.g, t.gRed);
      this._wnafT1 = Array(4);
      this._wnafT2 = Array(4);
      this._wnafT3 = Array(4);
      this._wnafT4 = Array(4);
      this._bitLength = this.n ? this.n.bitLength() : 0;
      var n = this.n && this.p.div(this.n);

      if (!n || n.cmpn(100) > 0) {
        this.redN = null;
      } else {
        this._maxwellTrick = true;
        this.redN = this.n.toRed(this.red);
      }
    }
    function c(e, t) {
      this.curve = e;
      this.type = t;
      this.precomputed = null;
    }
    e.exports = l;

    l.prototype.point = function () {
      throw Error("Not implemented");
    };

    l.prototype.validate = function () {
      throw Error("Not implemented");
    };

    l.prototype._fixedNafMul = function (e, t) {
      assert(e.precomputed);
      var n = e._getDoubles();
      var r = getNAF(t, 1, this._bitLength);
      var i = (1 << (n.step + 1)) - (n.step % 2 == 0 ? 2 : 1);
      i /= 3;
      for (var o = [], l = 0; l < r.length; l += n.step) {
        for (var c = 0, t = l + n.step - 1; t >= l; t--) {
          c = (c << 1) + r[t];
        }
        o.push(c);
      }
      for (
        var d = this.jpoint(null, null, null),
          u = this.jpoint(null, null, null),
          p = i;
        p > 0;
        p--
      ) {
        for (var l = 0; l < getJSF.length; l++) {
          var getJSF_l = getJSF[l];

          if (getJSF_l === p) {
            u = u.mixedAdd(n.points[l]);
          } else if (getJSF_l === -p) {
            u = u.mixedAdd(n.points[l].neg());
          }
        }
        d = d.add(u);
      }
      return d.toP();
    };

    l.prototype._wnafMul = function (e, t) {
      var n = 4;
      var r = e._getNAFPoints(n);
      n = r.wnd;
      for (
        var i = r.points,
          o = getNAF(t, n, this._bitLength),
          l = this.jpoint(null, null, null),
          c = o.length - 1;
        c >= 0;
        c--
      ) {
        for (var t = 0; c >= 0 && o[c] === 0; c--) {
          t++;
        }

        if (c >= 0) {
          t++;
        }

        l = l.dblp(t);

        if (c < 0) {
          break;
        }

        var o_c = o[c];
        assert(o_c !== 0);

        l =
          e.type === "affine"
            ? o_c > 0
              ? l.mixedAdd(i[(o_c - 1) >> 1])
              : l.mixedAdd(i[(-o_c - 1) >> 1].neg())
            : o_c > 0
            ? l.add(i[(o_c - 1) >> 1])
            : l.add(i[(-o_c - 1) >> 1].neg());
      }
      return e.type === "affine" ? l.toP() : l;
    };

    l.prototype._wnafMulAdd = function (e, t, n, r, i) {
      var d = 0;
      for (
        var s = this._wnafT1, l = this._wnafT2, c = this._wnafT3, u = 0;
        u < r;
        u++
      ) {
        var t_u = t[u];
        var _ = t_u._getNAFPoints(e);
        s[u] = _.wnd;
        l[u] = _.points;
      }
      for (var u = r - 1; u >= 1; u -= 2) {
        var f = u - 1;
        var m = u;
        if (assert[f] !== 1 || assert[m] !== 1) {
          c[f] = getNAF(n[f], assert[f], this._bitLength);
          c[m] = getNAF(n[m], assert[m], this._bitLength);
          d = Math.max(c[f].length, d);
          d = Math.max(c[m].length, d);
          continue;
        }
        var h = [t[f], null, null, t[m]];

        if (t[f].y.cmp(t[m].y) === 0) {
          h[1] = t[f].add(t[m]);
          h[2] = t[f].toJ().mixedAdd(t[m].neg());
        } else if (t[f].y.cmp(t[m].y.redNeg()) === 0) {
          h[1] = t[f].toJ().mixedAdd(t[m]);
          h[2] = t[f].add(t[m].neg());
        } else {
          h[1] = t[f].toJ().mixedAdd(t[m]);
          h[2] = t[f].toJ().mixedAdd(t[m].neg());
        }

        var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3];
        var y = getJSF(n[f], n[m]);
        d = Math.max(y[0].length, d);
        c[f] = Array(d);
        c[m] = Array(d);
        for (var b = 0; b < d; b++) {
          var x = 0 | y[0][b];
          var S = 0 | y[1][b];
          c[f][b] = g[(x + 1) * 3 + (S + 1)];
          c[m][b] = 0;
          l[f] = h;
        }
      }
      for (
        var k = this.jpoint(null, null, null), T = this._wnafT4, u = d;
        u >= 0;
        u--
      ) {
        for (var E = 0; u >= 0; ) {
          for (var C = true, b = 0; b < r; b++) {
            T[b] = 0 | c[b][u];

            if (T[b] !== 0) {
              C = false;
            }
          }
          if (!C) {
            break;
          }
          E++;
          u--;
        }

        if (u >= 0) {
          E++;
        }

        k = k.dblp(E);

        if (u < 0) {
          break;
        }

        for (var b = 0; b < r; b++) {
          var p;
          var T_b = T[b];

          if (T_b !== 0) {
            T_b > 0
              ? (p = l[b][(T_b - 1) >> 1])
              : T_b < 0 && (p = l[b][(-T_b - 1) >> 1].neg());

            k = p.type === "affine" ? k.mixedAdd(p) : k.add(p);
          }
        }
      }
      for (var u = 0; u < r; u++) {
        l[u] = null;
      }
      return i ? k : k.toP();
    };

    l.BasePoint = c;

    c.prototype.eq = function () {
      throw Error("Not implemented");
    };

    c.prototype.validate = function () {
      return this.curve.validate(this);
    };

    l.prototype.decodePoint = function (e, t) {
      e = i.toArray(e, t);
      var n = this.p.byteLength();
      if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 == 2 * n) {
        if (e[0] === 6) {
          assert(e[e.length - 1] % 2 == 0);
        } else if (e[0] === 7) {
          assert(e[e.length - 1] % 2 == 1);
        }

        return this.point(e.slice(1, 1 + n), e.slice(1 + n, 1 + 2 * n));
      }
      if ((e[0] === 2 || e[0] === 3) && e.length - 1 === n) {
        return this.pointFromX(e.slice(1, 1 + n), e[0] === 3);
      }
      throw Error("Unknown point format");
    };

    c.prototype.encodeCompressed = function (e) {
      return this.encode(e, true);
    };

    c.prototype._encode = function (e) {
      var t = this.curve.p.byteLength();
      var n = this.getX().toArray("be", t);
      return e
        ? [this.getY().isEven() ? 2 : 3].concat(n)
        : [4].concat(n, this.getY().toArray("be", t));
    };

    c.prototype.encode = function (e, t) {
      return i.encode(this._encode(t), e);
    };

    c.prototype.precompute = function (e) {
      if (this.precomputed) {
        return this;
      }
      var t = { doubles: null, naf: null, beta: null };
      t.naf = this._getNAFPoints(8);
      t.doubles = this._getDoubles(4, e);
      t.beta = this._getBeta();
      this.precomputed = t;
      return this;
    };

    c.prototype._hasDoubles = function (e) {
      if (!this.precomputed) {
        return false;
      }
      var t = this.precomputed.doubles;
      return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step);
    };

    c.prototype._getDoubles = function (e, t) {
      if (this.precomputed && this.precomputed.doubles) {
        return this.precomputed.doubles;
      }
      for (var n = [this], r = this, i = 0; i < t; i += e) {
        for (var a = 0; a < e; a++) {
          r = r.dbl();
        }
        n.push(r);
      }
      return { step: e, points: n };
    };

    c.prototype._getNAFPoints = function (e) {
      if (this.precomputed && this.precomputed.naf) {
        return this.precomputed.naf;
      }
      for (
        var t = [this],
          n = (1 << e) - 1,
          r = n === 1 ? null : this.dbl(),
          i = 1;
        i < n;
        i++
      ) {
        t[i] = t[i - 1].add(r);
      }
      return { wnd: e, points: t };
    };

    c.prototype._getBeta = function () {
      return null;
    };

    c.prototype.dblp = function (e) {
      for (var t = this, n = 0; n < e; n++) {
        t = t.dbl();
      }
      return t;
    };
  },
  2705: function (e, t, n) {
    var r = n(4401);
    var i = n(711);
    var a = n(3782);
    var o = n(2727);
    var r_assert = r.assert;
    function l(e) {
      this.twisted = (0 | e.a) != 1;
      this.mOneA = this.twisted && (0 | e.a) == -1;
      this.extended = this.mOneA;
      o.call(this, "edwards", e);
      this.a = new i(e.a, 16).umod(this.red.m);
      this.a = this.a.toRed(this.red);
      this.c = new i(e.c, 16).toRed(this.red);
      this.c2 = this.c.redSqr();
      this.d = new i(e.d, 16).toRed(this.red);
      this.dd = this.d.redAdd(this.d);
      r_assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
      this.oneC = (0 | e.c) == 1;
    }
    function c(e, t, n, r, a) {
      o.BasePoint.call(this, e, "projective");

      if (t === null && n === null && r === null) {
        this.x = this.curve.zero;
        this.y = this.curve.one;
        this.z = this.curve.one;
        this.t = this.curve.zero;
        this.zOne = true;
      } else {
        this.x = new i(t, 16);
        this.y = new i(n, 16);
        this.z = r ? new i(r, 16) : this.curve.one;
        this.t = a && new i(a, 16);
        this.x.red || (this.x = this.x.toRed(this.curve.red));
        this.y.red || (this.y = this.y.toRed(this.curve.red));
        this.z.red || (this.z = this.z.toRed(this.curve.red));
        this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red));
        this.zOne = this.z === this.curve.one;

        this.curve.extended &&
          !this.t &&
          ((this.t = this.x.redMul(this.y)),
          this.zOne || (this.t = this.t.redMul(this.z.redInvm())));
      }
    }
    a(l, o);
    e.exports = l;

    l.prototype._mulA = function (e) {
      return this.mOneA ? e.redNeg() : this.a.redMul(e);
    };

    l.prototype._mulC = function (e) {
      return this.oneC ? e : this.c.redMul(e);
    };

    l.prototype.jpoint = function (e, t, n, r) {
      return this.point(e, t, n, r);
    };

    l.prototype.pointFromX = function (e, t) {
      if (!(e = new i(e, 16)).red) {
        e = e.toRed(this.red);
      }

      var n = e.redSqr();
      var r = this.c2.redSub(this.a.redMul(n));
      var a = this.one.redSub(this.c2.redMul(this.d).redMul(n));
      var o = r.redMul(a.redInvm());
      var s = o.redSqrt();
      if (s.redSqr().redSub(o).cmp(this.zero) !== 0) {
        throw Error("invalid point");
      }
      var l = s.fromRed().isOdd();

      if ((t && !l) || (!t && l)) {
        s = s.redNeg();
      }

      return this.point(e, s);
    };

    l.prototype.pointFromY = function (e, t) {
      if (!(e = new i(e, 16)).red) {
        e = e.toRed(this.red);
      }

      var n = e.redSqr();
      var r = n.redSub(this.c2);
      var a = n.redMul(this.d).redMul(this.c2).redSub(this.a);
      var o = r.redMul(a.redInvm());
      if (o.cmp(this.zero) === 0) {
        if (!t) {
          return this.point(this.zero, e);
        } else {
          throw Error("invalid point");
        }
      }
      var s = o.redSqrt();
      if (s.redSqr().redSub(o).cmp(this.zero) !== 0) {
        throw Error("invalid point");
      }

      if (s.fromRed().isOdd() !== t) {
        s = s.redNeg();
      }

      return this.point(s, e);
    };

    l.prototype.validate = function (e) {
      if (e.isInfinity()) {
        return true;
      }
      e.normalize();
      var t = e.x.redSqr();
      var n = e.y.redSqr();
      var r = t.redMul(this.a).redAdd(n);
      var i = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(n)));
      return r.cmp(i) === 0;
    };

    a(c, o.BasePoint);

    l.prototype.pointFromJSON = function (e) {
      return c.fromJSON(this, e);
    };

    l.prototype.point = function (e, t, n, r) {
      return new c(this, e, t, n, r);
    };

    c.fromJSON = function (e, t) {
      return new c(e, t[0], t[1], t[2]);
    };

    c.prototype.inspect = function () {
      return this.isInfinity()
        ? "<EC Point Infinity>"
        : "<EC Point x: " +
            this.x.fromRed().toString(16, 2) +
            " y: " +
            this.y.fromRed().toString(16, 2) +
            " z: " +
            this.z.fromRed().toString(16, 2) +
            ">";
    };

    c.prototype.isInfinity = function () {
      return (
        this.x.cmpn(0) === 0 &&
        (this.y.cmp(this.z) === 0 ||
          (this.zOne && this.y.cmp(this.curve.c) === 0))
      );
    };

    c.prototype._extDbl = function () {
      var e = this.x.redSqr();
      var t = this.y.redSqr();
      var n = this.z.redSqr();
      n = n.redIAdd(n);
      var r = this.curve._mulA(e);
      var i = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t);
      var a = r.redAdd(t);
      var o = a.redSub(n);
      var s = r.redSub(t);
      var l = i.redMul(o);
      var c = a.redMul(s);
      var d = i.redMul(s);
      var u = o.redMul(a);
      return this.curve.point(l, c, u, d);
    };

    c.prototype._projDbl = function () {
      var e;
      var t;
      var n;
      var r = this.x.redAdd(this.y).redSqr();
      var i = this.x.redSqr();
      var a = this.y.redSqr();
      if (this.curve.twisted) {
        var o = this.curve._mulA(i);
        var s = o.redAdd(a);
        if (this.zOne) {
          e = r.redSub(i).redSub(a).redMul(s.redSub(this.curve.two));
          t = s.redMul(o.redSub(a));
          n = s.redSqr().redSub(s).redSub(s);
        } else {
          var l = this.z.redSqr();
          var c = s.redSub(l).redISub(l);
          e = r.redSub(i).redISub(a).redMul(c);
          t = s.redMul(o.redSub(a));
          n = s.redMul(c);
        }
      } else {
        var o = i.redAdd(a);
        var l = this.curve._mulC(this.z).redSqr();
        var c = o.redSub(l).redSub(l);
        e = this.curve._mulC(r.redISub(o)).redMul(c);
        t = this.curve._mulC(o).redMul(i.redISub(a));
        n = o.redMul(c);
      }
      return this.curve.point(e, t, n);
    };

    c.prototype.dbl = function () {
      if (this.isInfinity()) {
        return this;
      }

      if (this.curve.extended) {
        return this._extDbl();
      }

      return this._projDbl();
    };

    c.prototype._extAdd = function (e) {
      var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x));
      var n = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x));
      var r = this.t.redMul(this.curve.dd).redMul(e.t);
      var i = this.z.redMul(e.z.redAdd(e.z));
      var a = n.redSub(t);
      var o = i.redSub(r);
      var s = i.redAdd(r);
      var l = n.redAdd(t);
      var c = a.redMul(o);
      var d = s.redMul(l);
      var u = a.redMul(l);
      var p = o.redMul(s);
      return this.curve.point(c, d, p, u);
    };

    c.prototype._projAdd = function (e) {
      var t;
      var n;
      var r = this.z.redMul(e.z);
      var i = r.redSqr();
      var a = this.x.redMul(e.x);
      var o = this.y.redMul(e.y);
      var s = this.curve.d.redMul(a).redMul(o);
      var l = i.redSub(s);
      var c = i.redAdd(s);

      var d = this.x
        .redAdd(this.y)
        .redMul(e.x.redAdd(e.y))
        .redISub(a)
        .redISub(o);

      var u = r.redMul(l).redMul(d);

      if (this.curve.twisted) {
        t = r.redMul(c).redMul(o.redSub(this.curve._mulA(a)));
        n = l.redMul(c);
      } else {
        t = r.redMul(c).redMul(o.redSub(a));
        n = this.curve._mulC(l).redMul(c);
      }

      return this.curve.point(u, t, n);
    };

    c.prototype.add = function (e) {
      return this.isInfinity()
        ? e
        : e.isInfinity()
        ? this
        : this.curve.extended
        ? this._extAdd(e)
        : this._projAdd(e);
    };

    c.prototype.mul = function (e) {
      return this._hasDoubles(e)
        ? this.curve._fixedNafMul(this, e)
        : this.curve._wnafMul(this, e);
    };

    c.prototype.mulAdd = function (e, t, n) {
      return this.curve._wnafMulAdd(1, [this, t], [e, n], 2, false);
    };

    c.prototype.jmulAdd = function (e, t, n) {
      return this.curve._wnafMulAdd(1, [this, t], [e, n], 2, true);
    };

    c.prototype.normalize = function () {
      if (this.zOne) {
        return this;
      }
      var e = this.z.redInvm();
      this.x = this.x.redMul(e);
      this.y = this.y.redMul(e);

      if (this.t) {
        this.t = this.t.redMul(e);
      }

      this.z = this.curve.one;
      this.zOne = true;
      return this;
    };

    c.prototype.neg = function () {
      return this.curve.point(
        this.x.redNeg(),
        this.y,
        this.z,
        this.t && this.t.redNeg()
      );
    };

    c.prototype.getX = function () {
      this.normalize();
      return this.x.fromRed();
    };

    c.prototype.getY = function () {
      this.normalize();
      return this.y.fromRed();
    };

    c.prototype.eq = function (e) {
      return (
        this === e ||
        (this.getX().cmp(e.getX()) === 0 && this.getY().cmp(e.getY()) === 0)
      );
    };

    c.prototype.eqXToP = function (e) {
      var t = e.toRed(this.curve.red).redMul(this.z);
      if (this.x.cmp(t) === 0) {
        return true;
      }
      for (var n = e.clone(), r = this.curve.redN.redMul(this.z); ; ) {
        n.iadd(this.curve.n);

        if (n.cmp(this.curve.p) >= 0) {
          return false;
        }

        t.redIAdd(r);

        if (this.x.cmp(t) === 0) {
          return true;
        }
      }
    };

    c.prototype.toP = c.prototype.normalize;
    c.prototype.mixedAdd = c.prototype.add;
  },
  9359: function (e, t, n) {
    t.base = n(2727);
    t.short = n(4720);
    t.mont = n(6653);
    t.edwards = n(2705);
  },
  6653: function (e, t, n) {
    var r = n(711);
    var i = n(3782);
    var a = n(2727);
    var o = n(4401);
    function s(e) {
      a.call(this, "mont", e);
      this.a = new r(e.a, 16).toRed(this.red);
      this.b = new r(e.b, 16).toRed(this.red);
      this.i4 = new r(4).toRed(this.red).redInvm();
      this.two = new r(2).toRed(this.red);
      this.a24 = this.i4.redMul(this.a.redAdd(this.two));
    }
    function l(e, t, n) {
      a.BasePoint.call(this, e, "projective");

      if (t === null && n === null) {
        this.x = this.curve.one;
        this.z = this.curve.zero;
      } else {
        this.x = new r(t, 16);
        this.z = new r(n, 16);
        this.x.red || (this.x = this.x.toRed(this.curve.red));
        this.z.red || (this.z = this.z.toRed(this.curve.red));
      }
    }
    i(s, a);
    e.exports = s;

    s.prototype.validate = function (e) {
      var t = e.normalize().x;
      var n = t.redSqr();
      var r = n.redMul(t).redAdd(n.redMul(this.a)).redAdd(t);
      return r.redSqrt().redSqr().cmp(r) === 0;
    };

    i(l, a.BasePoint);

    s.prototype.decodePoint = function (e, t) {
      return this.point(o.toArray(e, t), 1);
    };

    s.prototype.point = function (e, t) {
      return new l(this, e, t);
    };

    s.prototype.pointFromJSON = function (e) {
      return l.fromJSON(this, e);
    };

    l.prototype.precompute = function () {};

    l.prototype._encode = function () {
      return this.getX().toArray("be", this.curve.p.byteLength());
    };

    l.fromJSON = function (e, t) {
      return new l(e, t[0], t[1] || e.one);
    };

    l.prototype.inspect = function () {
      return this.isInfinity()
        ? "<EC Point Infinity>"
        : "<EC Point x: " +
            this.x.fromRed().toString(16, 2) +
            " z: " +
            this.z.fromRed().toString(16, 2) +
            ">";
    };

    l.prototype.isInfinity = function () {
      return this.z.cmpn(0) === 0;
    };

    l.prototype.dbl = function () {
      var e = this.x.redAdd(this.z).redSqr();
      var t = this.x.redSub(this.z).redSqr();
      var n = e.redSub(t);
      var r = e.redMul(t);
      var i = n.redMul(t.redAdd(this.curve.a24.redMul(n)));
      return this.curve.point(r, i);
    };

    l.prototype.add = function () {
      throw Error("Not supported on Montgomery curve");
    };

    l.prototype.diffAdd = function (e, t) {
      var n = this.x.redAdd(this.z);
      var r = this.x.redSub(this.z);
      var i = e.x.redAdd(e.z);
      var a = e.x.redSub(e.z).redMul(n);
      var o = i.redMul(r);
      var s = t.z.redMul(a.redAdd(o).redSqr());
      var l = t.x.redMul(a.redISub(o).redSqr());
      return this.curve.point(s, l);
    };

    l.prototype.mul = function (e) {
      for (
        var t = e.clone(), n = this, r = this.curve.point(null, null), i = [];
        t.cmpn(0) !== 0;
        t.iushrn(1)
      ) {
        i.push(t.andln(1));
      }
      for (var a = i.length - 1; a >= 0; a--) {
        if (i[a] === 0) {
          n = n.diffAdd(r, this);
          r = r.dbl();
        } else {
          r = n.diffAdd(r, this);
          n = n.dbl();
        }
      }
      return r;
    };

    l.prototype.mulAdd = function () {
      throw Error("Not supported on Montgomery curve");
    };

    l.prototype.jumlAdd = function () {
      throw Error("Not supported on Montgomery curve");
    };

    l.prototype.eq = function (e) {
      return this.getX().cmp(e.getX()) === 0;
    };

    l.prototype.normalize = function () {
      this.x = this.x.redMul(this.z.redInvm());
      this.z = this.curve.one;
      return this;
    };

    l.prototype.getX = function () {
      this.normalize();
      return this.x.fromRed();
    };
  },
  4720: function (e, t, n) {
    var r = n(4401);
    var i = n(711);
    var a = n(3782);
    var o = n(2727);
    var r_assert = r.assert;
    function l(e) {
      o.call(this, "short", e);
      this.a = new i(e.a, 16).toRed(this.red);
      this.b = new i(e.b, 16).toRed(this.red);
      this.tinv = this.two.redInvm();
      this.zeroA = this.a.fromRed().cmpn(0) === 0;
      this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
      this.endo = this._getEndomorphism(e);
      this._endoWnafT1 = Array(4);
      this._endoWnafT2 = Array(4);
    }
    function c(e, t, n, r) {
      o.BasePoint.call(this, e, "affine");

      if (t === null && n === null) {
        this.x = null;
        this.y = null;
        this.inf = true;
      } else {
        this.x = new i(t, 16);
        this.y = new i(n, 16);

        r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red));

        this.x.red || (this.x = this.x.toRed(this.curve.red));
        this.y.red || (this.y = this.y.toRed(this.curve.red));
        this.inf = false;
      }
    }
    function d(e, t, n, r) {
      o.BasePoint.call(this, e, "jacobian");

      if (t === null && n === null && r === null) {
        this.x = this.curve.one;
        this.y = this.curve.one;
        this.z = new i(0);
      } else {
        this.x = new i(t, 16);
        this.y = new i(n, 16);
        this.z = new i(r, 16);
      }

      if (!this.x.red) {
        this.x = this.x.toRed(this.curve.red);
      }

      if (!this.y.red) {
        this.y = this.y.toRed(this.curve.red);
      }

      if (!this.z.red) {
        this.z = this.z.toRed(this.curve.red);
      }

      this.zOne = this.z === this.curve.one;
    }
    a(l, o);
    e.exports = l;

    l.prototype._getEndomorphism = function (e) {
      if (this.zeroA && this.g && this.n && this.p.modn(3) === 1) {
        if (e.beta) {
          t = new i(e.beta, 16).toRed(this.red);
        } else {
          var t;
          var n;
          var r;
          var a = this._getEndoRoots(this.p);
          t = (t = a[0].cmp(a[1]) < 0 ? a[0] : a[1]).toRed(this.red);
        }
        if (e.lambda) {
          n = new i(e.lambda, 16);
        } else {
          var o = this._getEndoRoots(this.n);

          if (this.g.mul(o[0]).x.cmp(this.g.x.redMul(t)) === 0) {
            n = o[0];
          } else {
            n = o[1];
            r_assert(this.g.mul(n).x.cmp(this.g.x.redMul(t)) === 0);
          }
        }

        r = e.basis
          ? e.basis.map(function (e) {
              return { a: new i(e.a, 16), b: new i(e.b, 16) };
            })
          : this._getEndoBasis(n);

        return { beta: t, lambda: n, basis: r };
      }
    };

    l.prototype._getEndoRoots = function (e) {
      var t = e === this.p ? this.red : i.mont(e);
      var n = new i(2).toRed(t).redInvm();
      var r = n.redNeg();
      var a = new i(3).toRed(t).redNeg().redSqrt().redMul(n);
      return [r.redAdd(a).fromRed(), r.redSub(a).fromRed()];
    };

    l.prototype._getEndoBasis = function (e) {
      for (
        var t,
          n,
          r,
          a,
          o,
          s,
          l,
          c,
          d,
          u = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
          p = e,
          _ = this.n.clone(),
          f = new i(1),
          m = new i(0),
          h = new i(0),
          g = new i(1),
          y = 0;
        p.cmpn(0) !== 0;

      ) {
        var b = _.div(p);
        c = _.sub(b.mul(p));
        d = h.sub(b.mul(f));
        var x = g.sub(b.mul(m));
        if (!r && c.cmp(u) < 0) {
          t = l.neg();
          n = f;
          r = c.neg();
          a = d;
        } else if (r && 2 == ++y) {
          break;
        }
        l = c;
        _ = p;
        p = c;
        h = f;
        f = d;
        g = m;
        m = x;
      }
      o = c.neg();
      r_assert = d;
      var S = r.sqr().add(a.sqr());

      if (o.sqr().add(r_assert.sqr()).cmp(S) >= 0) {
        o = t;
        r_assert = n;
      }

      if (r.negative) {
        r = r.neg();
        a = a.neg();
      }

      if (o.negative) {
        o = o.neg();
        r_assert = r_assert.neg();
      }

      return [
        { a: r, b: a },
        { a: o, b: r_assert },
      ];
    };

    l.prototype._endoSplit = function (e) {
      var t = this.endo.basis;
      var [n, r] = t;
      var i = r.b.mul(e).divRound(this.n);
      var a = n.b.neg().mul(e).divRound(this.n);
      var o = i.mul(n.a);
      var s = a.mul(r.a);
      var l = i.mul(n.b);
      var c = a.mul(r.b);
      return { k1: e.sub(o).sub(s), k2: l.add(c).neg() };
    };

    l.prototype.pointFromX = function (e, t) {
      if (!(e = new i(e, 16)).red) {
        e = e.toRed(this.red);
      }

      var n = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b);

      var r = n.redSqrt();
      if (r.redSqr().redSub(n).cmp(this.zero) !== 0) {
        throw Error("invalid point");
      }
      var a = r.fromRed().isOdd();

      if ((t && !a) || (!t && a)) {
        r = r.redNeg();
      }

      return this.point(e, r);
    };

    l.prototype.validate = function (e) {
      if (e.inf) {
        return true;
      }

      var { x, y } = e;

      var r = this.a.redMul(x);
      var i = x.redSqr().redMul(x).redIAdd(r).redIAdd(this.b);
      return y.redSqr().redISub(i).cmpn(0) === 0;
    };

    l.prototype._endoWnafMulAdd = function (e, t, n) {
      for (
        var r = this._endoWnafT1, i = this._endoWnafT2, a = 0;
        a < e.length;
        a++
      ) {
        var o = this._endoSplit(t[a]);
        var e_a = e[a];
        var l = e_a._getBeta();

        if (o.k1.negative) {
          o.k1.ineg();
          e_a = e_a.neg(true);
        }

        if (o.k2.negative) {
          o.k2.ineg();
          l = l.neg(true);
        }

        r[2 * a] = e_a;
        r[2 * a + 1] = l;
        i[2 * a] = o.k1;
        i[2 * a + 1] = o.k2;
      }
      for (var c = this._wnafMulAdd(1, r, i, 2 * a, n), d = 0; d < 2 * a; d++) {
        r[d] = null;
        i[d] = null;
      }
      return c;
    };

    a(c, o.BasePoint);

    l.prototype.point = function (e, t, n) {
      return new c(this, e, t, n);
    };

    l.prototype.pointFromJSON = function (e, t) {
      return c.fromJSON(this, e, t);
    };

    c.prototype._getBeta = function () {
      if (this.curve.endo) {
        var e = this.precomputed;
        if (e && e.beta) {
          return e.beta;
        }
        var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
        if (e) {
          var n = this.curve;

          var r = function (e) {
            return n.point(e.x.redMul(n.endo.beta), e.y);
          };

          e.beta = t;

          t.precomputed = {
            beta: null,
            naf: e.naf && {
              wnd: e.naf.wnd,
              points: e.naf.points.map(r),
            },
            doubles: e.doubles && {
              step: e.doubles.step,
              points: e.doubles.points.map(r),
            },
          };
        }
        return t;
      }
    };

    c.prototype.toJSON = function () {
      return this.precomputed
        ? [
            this.x,
            this.y,
            this.precomputed && {
              doubles: this.precomputed.doubles && {
                step: this.precomputed.doubles.step,
                points: this.precomputed.doubles.points.slice(1),
              },
              naf: this.precomputed.naf && {
                wnd: this.precomputed.naf.wnd,
                points: this.precomputed.naf.points.slice(1),
              },
            },
          ]
        : [this.x, this.y];
    };

    c.fromJSON = function (e, t, n) {
      if (typeof t == "string") {
        t = JSON.parse(t);
      }

      var r = e.point(t[0], t[1], n);
      if (!t[2]) {
        return r;
      }
      function i(t) {
        return e.point(t[0], t[1], n);
      }
      var [, , a] = t;

      r.precomputed = {
        beta: null,
        doubles: a.doubles && {
          step: a.doubles.step,
          points: [r].concat(a.doubles.points.map(i)),
        },
        naf: a.naf && {
          wnd: a.naf.wnd,
          points: [r].concat(a.naf.points.map(i)),
        },
      };

      return r;
    };

    c.prototype.inspect = function () {
      return this.isInfinity()
        ? "<EC Point Infinity>"
        : "<EC Point x: " +
            this.x.fromRed().toString(16, 2) +
            " y: " +
            this.y.fromRed().toString(16, 2) +
            ">";
    };

    c.prototype.isInfinity = function () {
      return this.inf;
    };

    c.prototype.add = function (e) {
      if (this.inf) {
        return e;
      }
      if (e.inf) {
        return this;
      }
      if (this.eq(e)) {
        return this.dbl();
      }
      if (this.neg().eq(e) || this.x.cmp(e.x) === 0) {
        return this.curve.point(null, null);
      }
      var t = this.y.redSub(e.y);

      if (t.cmpn(0) !== 0) {
        t = t.redMul(this.x.redSub(e.x).redInvm());
      }

      var n = t.redSqr().redISub(this.x).redISub(e.x);
      var r = t.redMul(this.x.redSub(n)).redISub(this.y);
      return this.curve.point(n, r);
    };

    c.prototype.dbl = function () {
      if (this.inf) {
        return this;
      }
      var e = this.y.redAdd(this.y);
      if (e.cmpn(0) === 0) {
        return this.curve.point(null, null);
      }
      var t = this.curve.a;
      var n = this.x.redSqr();
      var r = e.redInvm();
      var i = n.redAdd(n).redIAdd(n).redIAdd(t).redMul(r);
      var a = i.redSqr().redISub(this.x.redAdd(this.x));
      var o = i.redMul(this.x.redSub(a)).redISub(this.y);
      return this.curve.point(a, o);
    };

    c.prototype.getX = function () {
      return this.x.fromRed();
    };

    c.prototype.getY = function () {
      return this.y.fromRed();
    };

    c.prototype.mul = function (e) {
      e = new i(e, 16);

      if (this.isInfinity()) {
        return this;
      }

      if (this._hasDoubles(e)) {
        return this.curve._fixedNafMul(this, e);
      }

      if (this.curve.endo) {
        return this.curve._endoWnafMulAdd([this], [e]);
      }

      return this.curve._wnafMul(this, e);
    };

    c.prototype.mulAdd = function (e, t, n) {
      var r = [this, t];
      var i = [e, n];
      return this.curve.endo
        ? this.curve._endoWnafMulAdd(r, i)
        : this.curve._wnafMulAdd(1, r, i, 2);
    };

    c.prototype.jmulAdd = function (e, t, n) {
      var r = [this, t];
      var i = [e, n];
      return this.curve.endo
        ? this.curve._endoWnafMulAdd(r, i, true)
        : this.curve._wnafMulAdd(1, r, i, 2, true);
    };

    c.prototype.eq = function (e) {
      return (
        this === e ||
        (this.inf === e.inf &&
          (this.inf || (this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0)))
      );
    };

    c.prototype.neg = function (e) {
      if (this.inf) {
        return this;
      }
      var t = this.curve.point(this.x, this.y.redNeg());
      if (e && this.precomputed) {
        var n = this.precomputed;

        var r = function (e) {
          return e.neg();
        };

        t.precomputed = {
          naf: n.naf && { wnd: n.naf.wnd, points: n.naf.points.map(r) },
          doubles: n.doubles && {
            step: n.doubles.step,
            points: n.doubles.points.map(r),
          },
        };
      }
      return t;
    };

    c.prototype.toJ = function () {
      return this.inf
        ? this.curve.jpoint(null, null, null)
        : this.curve.jpoint(this.x, this.y, this.curve.one);
    };

    a(d, o.BasePoint);

    l.prototype.jpoint = function (e, t, n) {
      return new d(this, e, t, n);
    };

    d.prototype.toP = function () {
      if (this.isInfinity()) {
        return this.curve.point(null, null);
      }
      var e = this.z.redInvm();
      var t = e.redSqr();
      var n = this.x.redMul(t);
      var r = this.y.redMul(t).redMul(e);
      return this.curve.point(n, r);
    };

    d.prototype.neg = function () {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };

    d.prototype.add = function (e) {
      if (this.isInfinity()) {
        return e;
      }
      if (e.isInfinity()) {
        return this;
      }
      var t = e.z.redSqr();
      var n = this.z.redSqr();
      var r = this.x.redMul(t);
      var i = e.x.redMul(n);
      var a = this.y.redMul(t.redMul(e.z));
      var o = e.y.redMul(n.redMul(this.z));
      var s = r.redSub(i);
      var l = a.redSub(o);
      if (s.cmpn(0) === 0) {
        if (l.cmpn(0) !== 0) {
          return this.curve.jpoint(null, null, null);
        } else {
          return this.dbl();
        }
      }
      var c = s.redSqr();
      var d = c.redMul(s);
      var u = r.redMul(c);
      var p = l.redSqr().redIAdd(d).redISub(u).redISub(u);
      var _ = l.redMul(u.redISub(p)).redISub(a.redMul(d));
      var f = this.z.redMul(e.z).redMul(s);
      return this.curve.jpoint(p, _, f);
    };

    d.prototype.mixedAdd = function (e) {
      if (this.isInfinity()) {
        return e.toJ();
      }
      if (e.isInfinity()) {
        return this;
      }
      var t = this.z.redSqr();
      var n = this.x;
      var r = e.x.redMul(t);
      var i = this.y;
      var a = e.y.redMul(t).redMul(this.z);
      var o = n.redSub(r);
      var s = i.redSub(a);
      if (o.cmpn(0) === 0) {
        if (s.cmpn(0) !== 0) {
          return this.curve.jpoint(null, null, null);
        } else {
          return this.dbl();
        }
      }
      var l = o.redSqr();
      var c = l.redMul(o);
      var d = n.redMul(l);
      var u = s.redSqr().redIAdd(c).redISub(d).redISub(d);
      var p = s.redMul(d.redISub(u)).redISub(i.redMul(c));
      var _ = this.z.redMul(o);
      return this.curve.jpoint(u, p, _);
    };

    d.prototype.dblp = function (e) {
      if (e === 0 || this.isInfinity()) {
        return this;
      }
      if (!e) {
        return this.dbl();
      }
      if (this.curve.zeroA || this.curve.threeA) {
        for (var t = this, n = 0; n < e; n++) {
          t = t.dbl();
        }
        return t;
      }
      for (
        var r = this.curve.a,
          i = this.curve.tinv,
          a = this.x,
          o = this.y,
          s = this.z,
          l = s.redSqr().redSqr(),
          c = o.redAdd(o),
          n = 0;
        n < e;
        n++
      ) {
        var d = a.redSqr();
        var u = c.redSqr();
        var p = u.redSqr();
        var _ = d.redAdd(d).redIAdd(d).redIAdd(r.redMul(l));
        var f = a.redMul(u);
        var m = _.redSqr().redISub(f.redAdd(f));
        var h = f.redISub(m);
        var g = _.redMul(h);
        g = g.redIAdd(g).redISub(p);
        var y = c.redMul(s);

        if (n + 1 < e) {
          l = l.redMul(p);
        }

        a = m;
        s = y;
        c = g;
      }
      return this.curve.jpoint(a, c.redMul(i), r_assert);
    };

    d.prototype.dbl = function () {
      if (this.isInfinity()) {
        return this;
      }

      if (this.curve.zeroA) {
        return this._zeroDbl();
      }

      if (this.curve.threeA) {
        return this._threeDbl();
      }

      return this._dbl();
    };

    d.prototype._zeroDbl = function () {
      if (this.zOne) {
        var e;
        var t;
        var n;
        var r = this.x.redSqr();
        var i = this.y.redSqr();
        var a = i.redSqr();
        var o = this.x.redAdd(i).redSqr().redISub(r).redISub(a);
        o = o.redIAdd(o);
        var s = r.redAdd(r).redIAdd(r);
        var l = s.redSqr().redISub(o).redISub(o);
        var c = a.redIAdd(a);
        c = (c = c.redIAdd(c)).redIAdd(c);
        e = l;
        t = s.redMul(o.redISub(l)).redISub(c);
        n = this.y.redAdd(this.y);
      } else {
        var d = this.x.redSqr();
        var u = this.y.redSqr();
        var p = u.redSqr();
        var _ = this.x.redAdd(u).redSqr().redISub(d).redISub(p);
        _ = _.redIAdd(_);
        var f = d.redAdd(d).redIAdd(d);
        var m = f.redSqr();
        var h = p.redIAdd(p);
        h = (h = h.redIAdd(h)).redIAdd(h);
        e = m.redISub(_).redISub(_);
        t = f.redMul(_.redISub(e)).redISub(h);
        n = (n = this.y.redMul(this.z)).redIAdd(n);
      }
      return this.curve.jpoint(e, t, n);
    };

    d.prototype._threeDbl = function () {
      if (this.zOne) {
        var e;
        var t;
        var n;
        var r = this.x.redSqr();
        var i = this.y.redSqr();
        var a = i.redSqr();
        var o = this.x.redAdd(i).redSqr().redISub(r).redISub(a);
        o = o.redIAdd(o);
        var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a);
        var l = s.redSqr().redISub(o).redISub(o);
        e = l;
        var c = a.redIAdd(a);
        c = (c = c.redIAdd(c)).redIAdd(c);
        t = s.redMul(o.redISub(l)).redISub(c);
        n = this.y.redAdd(this.y);
      } else {
        var d = this.z.redSqr();
        var u = this.y.redSqr();
        var p = this.x.redMul(u);
        var _ = this.x.redSub(d).redMul(this.x.redAdd(d));
        _ = _.redAdd(_).redIAdd(_);
        var f = p.redIAdd(p);
        var m = (f = f.redIAdd(f)).redAdd(f);
        e = _.redSqr().redISub(m);
        n = this.y.redAdd(this.z).redSqr().redISub(u).redISub(d);
        var h = u.redSqr();
        h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h);
        t = _.redMul(f.redISub(e)).redISub(h);
      }
      return this.curve.jpoint(e, t, n);
    };

    d.prototype._dbl = function () {
      var e = this.curve.a;
      var t = this.x;
      var n = this.y;
      var r = this.z;
      var i = r.redSqr().redSqr();
      var a = t.redSqr();
      var o = n.redSqr();
      var s = a.redAdd(a).redIAdd(a).redIAdd(e.redMul(i));
      var l = t.redAdd(t);
      var c = (l = l.redIAdd(l)).redMul(o);
      var d = s.redSqr().redISub(c.redAdd(c));
      var u = c.redISub(d);
      var p = o.redSqr();
      p = (p = (p = p.redIAdd(p)).redIAdd(p)).redIAdd(p);
      var _ = s.redMul(u).redISub(p);
      var f = n.redAdd(n).redMul(r);
      return this.curve.jpoint(d, _, f);
    };

    d.prototype.trpl = function () {
      if (!this.curve.zeroA) {
        return this.dbl().add(this);
      }
      var e = this.x.redSqr();
      var t = this.y.redSqr();
      var n = this.z.redSqr();
      var r = t.redSqr();
      var i = e.redAdd(e).redIAdd(e);
      var a = i.redSqr();
      var o = this.x.redAdd(t).redSqr().redISub(e).redISub(r);

      var s = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(
        a
      )).redSqr();

      var l = r.redIAdd(r);
      l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
      var c = i.redIAdd(o).redSqr().redISub(a).redISub(s).redISub(l);
      var d = t.redMul(c);
      d = (d = d.redIAdd(d)).redIAdd(d);
      var u = this.x.redMul(s).redISub(d);
      u = (u = u.redIAdd(u)).redIAdd(u);
      var p = this.y.redMul(c.redMul(l.redISub(c)).redISub(o.redMul(s)));
      p = (p = (p = p.redIAdd(p)).redIAdd(p)).redIAdd(p);
      var _ = this.z.redAdd(o).redSqr().redISub(n).redISub(s);
      return this.curve.jpoint(u, p, _);
    };

    d.prototype.mul = function (e, t) {
      e = new i(e, t);
      return this.curve._wnafMul(this, e);
    };

    d.prototype.eq = function (e) {
      if (e.type === "affine") {
        return this.eq(e.toJ());
      }
      if (this === e) {
        return true;
      }
      var t = this.z.redSqr();
      var n = e.z.redSqr();
      if (this.x.redMul(n).redISub(e.x.redMul(t)).cmpn(0) !== 0) {
        return false;
      }
      var r = t.redMul(this.z);
      var i = n.redMul(e.z);
      return this.y.redMul(i).redISub(e.y.redMul(r)).cmpn(0) === 0;
    };

    d.prototype.eqXToP = function (e) {
      var t = this.z.redSqr();
      var n = e.toRed(this.curve.red).redMul(t);
      if (this.x.cmp(n) === 0) {
        return true;
      }
      for (var r = e.clone(), i = this.curve.redN.redMul(t); ; ) {
        r.iadd(this.curve.n);

        if (r.cmp(this.curve.p) >= 0) {
          return false;
        }

        n.redIAdd(i);

        if (this.x.cmp(n) === 0) {
          return true;
        }
      }
    };

    d.prototype.inspect = function () {
      return this.isInfinity()
        ? "<EC JPoint Infinity>"
        : "<EC JPoint x: " +
            this.x.toString(16, 2) +
            " y: " +
            this.y.toString(16, 2) +
            " z: " +
            this.z.toString(16, 2) +
            ">";
    };

    d.prototype.isInfinity = function () {
      return this.z.cmpn(0) === 0;
    };
  },
  6226: function (e, t, n) {
    var r;
    var i = n(7028);
    var a = n(9359);
    var o = n(4401).assert;
    function s(e) {
      if (e.type === "short") {
        this.curve = new a.short(e);
      } else if (e.type === "edwards") {
        this.curve = new a.edwards(e);
      } else {
        this.curve = new a.mont(e);
      }

      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = e.hash;
      o(this.g.validate(), "Invalid curve");
      o(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    function l(e, n) {
      Object.defineProperty(t, e, {
        configurable: true,
        enumerable: true,
        get: function () {
          var r = new s(n);

          Object.defineProperty(t, e, {
            configurable: true,
            enumerable: true,
            value: r,
          });

          return r;
        },
      });
    }
    t.PresetCurve = s;

    l("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: i.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
      ],
    });

    l("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: i.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
      ],
    });

    l("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: i.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
      ],
    });

    l("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: i.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
      ],
    });

    l("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: i.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
      ],
    });

    l("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: i.sha256,
      gRed: false,
      g: ["9"],
    });

    l("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: i.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        "6666666666666666666666666666666666666666666666666666666666666658",
      ],
    });

    try {
      r = n(9702);
    } catch (e) {
      r = undefined;
    }
    l("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: i.sha256,
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda:
        "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3",
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15",
        },
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        r,
      ],
    });
  },
  4088: function (e, t, n) {
    var r = n(711);
    var i = n(4910);
    var a = n(4401);
    var o = n(6226);
    var s = n(3500);
    var a_assert = a.assert;
    var c = n(4724);
    var d = n(7526);
    function u(e) {
      if (!(this instanceof u)) {
        return new u(e);
      }

      if (typeof e == "string") {
        a_assert(o.hasOwnProperty(e), "Unknown curve " + e);
        e = o[e];
      }

      if (e instanceof o.PresetCurve) {
        e = { curve: e };
      }

      this.curve = e.curve.curve;
      this.n = this.curve.n;
      this.nh = this.n.ushrn(1);
      this.g = this.curve.g;
      this.g = e.curve.g;
      this.g.precompute(e.curve.n.bitLength() + 1);
      this.hash = e.hash || e.curve.hash;
    }
    e.exports = u;

    u.prototype.keyPair = function (e) {
      return new c(this, e);
    };

    u.prototype.keyFromPrivate = function (e, t) {
      return c.fromPrivate(this, e, t);
    };

    u.prototype.keyFromPublic = function (e, t) {
      return c.fromPublic(this, e, t);
    };

    u.prototype.genKeyPair = function (e) {
      if (!e) {
        e = {};
      }

      for (
        var t = new i({
            hash: this.hash,
            pers: e.pers,
            persEnc: e.persEnc || "utf8",
            entropy: e.entropy || s(this.hash.hmacStrength),
            entropyEnc: (e.entropy && e.entropyEnc) || "utf8",
            nonce: this.n.toArray(),
          }),
          n = this.n.byteLength(),
          a = this.n.sub(new r(2));
        ;

      ) {
        var o = new r(t.generate(n));
        if (!(o.cmp(a) > 0)) {
          o.iaddn(1);
          return this.keyFromPrivate(o);
        }
      }
    };

    u.prototype._truncateToN = function (e, t) {
      var n = 8 * e.byteLength() - this.n.bitLength();
      return (n > 0 && (e = e.ushrn(n)), !t && e.cmp(this.n) >= 0)
        ? e.sub(this.n)
        : e;
    };

    u.prototype.sign = function (e, t, n, a) {
      if (typeof n == "object") {
        a = n;
        n = null;
      }

      if (!a) {
        a = {};
      }

      t = this.keyFromPrivate(t, n);
      e = this._truncateToN(new r(e, 16));
      for (
        var o = this.n.byteLength(),
          s = t.getPrivate().toArray("be", o),
          l = e.toArray("be", o),
          c = new i({
            hash: this.hash,
            entropy: s,
            nonce: l,
            pers: a.pers,
            persEnc: a.persEnc || "utf8",
          }),
          u = this.n.sub(new r(1)),
          p = 0;
        ;
        p++
      ) {
        var _ = a.k ? a.k(p) : new r(c.generate(this.n.byteLength()));
        if ((_ = this._truncateToN(_, true)).cmpn(1) <= 0 || _.cmp(u) >= 0) {
          continue;
        }
        var f = this.g.mul(_);
        if (!f.isInfinity()) {
          var m = f.getX();
          var h = m.umod(this.n);
          if (h.cmpn(0) !== 0) {
            var g = _.invm(this.n).mul(h.mul(t.getPrivate()).iadd(e));
            if ((g = g.umod(this.n)).cmpn(0) !== 0) {
              var y = !!f.getY().isOdd() | (2 * (m.cmp(h) !== 0));

              if (a.canonical && g.cmp(this.nh) > 0) {
                g = this.n.sub(g);
                y ^= 1;
              }

              return new d({ r: h, s: g, recoveryParam: y });
            }
          }
        }
      }
    };

    u.prototype.verify = function (e, t, n, i) {
      e = this._truncateToN(new r(e, 16));
      n = this.keyFromPublic(n, i);
      var a = (t = new d(t, "hex")).r;
      var t_s = t.s;
      if (
        a.cmpn(1) < 0 ||
        a.cmp(this.n) >= 0 ||
        t_s.cmpn(1) < 0 ||
        t_s.cmp(this.n) >= 0
      ) {
        return false;
      }
      var s = t_s.invm(this.n);
      var l = s.mul(e).umod(this.n);
      var c = s.mul(a).umod(this.n);
      if (!this.curve._maxwellTrick) {
        var u = this.g.mulAdd(l, n.getPublic(), c);
        return !u.isInfinity() && u.getX().umod(this.n).cmp(a) === 0;
      }
      var u = this.g.jmulAdd(l, n.getPublic(), c);
      return !u.isInfinity() && u.eqXToP(a);
    };

    u.prototype.recoverPubKey = function (e, t, n, i) {
      a_assert((3 & n) === n, "The recovery param is more than two bits");
      t = new d(t, i);
      var a = this.n;
      var o = new r(e);

      var { r: r_2, s: s_2 } = t;

      var u = 1 & n;
      var p = n >> 1;
      if (r_2.cmp(this.curve.p.umod(this.curve.n)) >= 0 && p) {
        throw Error("Unable to find sencond key candinate");
      }
      r_2 = p
        ? this.curve.pointFromX(r_2.add(this.curve.n), u)
        : this.curve.pointFromX(r_2, u);
      var _ = t.r.invm(a);
      var f = a.sub(o).mul(_).umod(a);
      var m = s_2.mul(_).umod(a);
      return this.g.mulAdd(f, r_2, m);
    };

    u.prototype.getKeyRecoveryParam = function (e, t, n, r) {
      if ((t = new d(t, r)).recoveryParam !== null) {
        return t.recoveryParam;
      }
      for (var i, a = 0; a < 4; a++) {
        try {
          i = this.recoverPubKey(e, t, a);
        } catch (e) {
          continue;
        }
        if (i.eq(n)) {
          return a;
        }
      }
      throw Error("Unable to find valid recovery factor");
    };
  },
  4724: function (e, t, n) {
    var r = n(711);
    var i = n(4401).assert;
    function a(e, t) {
      this.ec = e;
      this.priv = null;
      this.pub = null;

      if (t.priv) {
        this._importPrivate(t.priv, t.privEnc);
      }

      if (t.pub) {
        this._importPublic(t.pub, t.pubEnc);
      }
    }
    e.exports = a;

    a.fromPublic = function (e, t, n) {
      return t instanceof a ? t : new a(e, { pub: t, pubEnc: n });
    };

    a.fromPrivate = function (e, t, n) {
      return t instanceof a ? t : new a(e, { priv: t, privEnc: n });
    };

    a.prototype.validate = function () {
      var e = this.getPublic();

      if (e.isInfinity()) {
        return { result: false, reason: "Invalid public key" };
      }

      if (e.validate()) {
        if (e.mul(this.ec.curve.n).isInfinity()) {
          return { result: true, reason: null };
        }

        return { result: false, reason: "Public key * N != O" };
      }

      return { result: false, reason: "Public key is not a point" };
    };

    a.prototype.getPublic = function (e, t) {
      return (typeof e == "string" && ((t = e), (e = null)),
      this.pub || (this.pub = this.ec.g.mul(this.priv)),
      t)
        ? this.pub.encode(t, e)
        : this.pub;
    };

    a.prototype.getPrivate = function (e) {
      return e === "hex" ? this.priv.toString(16, 2) : this.priv;
    };

    a.prototype._importPrivate = function (e, t) {
      this.priv = new r(e, t || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };

    a.prototype._importPublic = function (e, t) {
      if (e.x || e.y) {
        if (this.ec.curve.type === "mont") {
          i(e.x, "Need x coordinate");
        } else if (
          this.ec.curve.type === "short" ||
          this.ec.curve.type === "edwards"
        ) {
          i(e.x && e.y, "Need both x and y coordinate");
        }

        this.pub = this.ec.curve.point(e.x, e.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(e, t);
    };

    a.prototype.derive = function (e) {
      return e.mul(this.priv).getX();
    };

    a.prototype.sign = function (e, t, n) {
      return this.ec.sign(e, this, t, n);
    };

    a.prototype.verify = function (e, t) {
      return this.ec.verify(e, t, this);
    };

    a.prototype.inspect = function () {
      return (
        "<Key priv: " +
        (this.priv && this.priv.toString(16, 2)) +
        " pub: " +
        (this.pub && this.pub.inspect()) +
        " >"
      );
    };
  },
  7526: function (e, t, n) {
    var r = n(711);
    var i = n(4401);
    var i_assert = i.assert;
    function o(e, t) {
      if (e instanceof o) {
        return e;
      }

      if (!this._importDER(e, t)) {
        i_assert(e.r && e.s, "Signature without r or s");
        this.r = new r(e.r, 16);
        this.s = new r(e.s, 16);

        e.recoveryParam === undefined
          ? (this.recoveryParam = null)
          : (this.recoveryParam = e.recoveryParam);
      }
    }
    function s() {
      this.place = 0;
    }
    function l(e, t) {
      var n = e[t.place++];
      if (!(128 & n)) {
        return n;
      }
      var r = 15 & n;
      if (r === 0 || r > 4) {
        return false;
      }
      for (var i = 0, a = 0, o = t.place; a < r; a++, o++) {
        i <<= 8;
        i |= e[o];
        i >>>= 0;
      }
      return !(i <= 127) && ((t.place = o), i);
    }
    function c(e) {
      for (var t = 0, n = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < n; ) {
        t++;
      }
      return t === 0 ? e : e.slice(t);
    }
    function d(e, t) {
      if (t < 128) {
        return void e.push(t);
      }
      var n = 1 + ((Math.log(t) / Math.LN2) >>> 3);
      for (e.push(128 | n); --n; ) {
        e.push((t >>> (n << 3)) & 255);
      }
      e.push(t);
    }
    e.exports = o;

    o.prototype._importDER = function (e, t) {
      e = i.toArray(e, t);
      var n = new s();
      if (e[n.place++] !== 48) {
        return false;
      }
      var a = l(e, n);
      if (a === false || a + n.place !== e.length || e[n.place++] !== 2) {
        return false;
      }
      var o = l(e, n);
      if (o === false) {
        return false;
      }
      var c = e.slice(n.place, o + n.place);
      n.place += o;

      if (e[n.place++] !== 2) {
        return false;
      }

      var d = l(e, n);
      if (d === false || e.length !== d + n.place) {
        return false;
      }
      var u = e.slice(n.place, d + n.place);
      if (c[0] === 0) {
        if (!(128 & c[1])) {
          return false;
        } else {
          c = c.slice(1);
        }
      }
      if (u[0] === 0) {
        if (!(128 & u[1])) {
          return false;
        } else {
          u = u.slice(1);
        }
      }
      this.r = new r(c);
      this.s = new r(u);
      this.recoveryParam = null;
      return true;
    };

    o.prototype.toDER = function (e) {
      var t = this.r.toArray();
      var n = this.s.toArray();

      if (128 & t[0]) {
        t = [0].concat(t);
      }

      if (128 & n[0]) {
        n = [0].concat(n);
      }

      t = c(t);

      for (n = c(n); !n[0] && !(128 & n[1]); ) {
        n = n.slice(1);
      }

      var r = [2];
      d(r, t.length);
      (r = r.concat(t)).push(2);
      d(r, n.length);
      var a = r.concat(n);
      var o = [48];
      d(o, a.length);
      o = o.concat(a);
      return i.encode(o, e);
    };
  },
  8511: function (e, t, n) {
    var r = n(7028);
    var i = n(6226);
    var a = n(4401);

    var { assert, parseBytes } = a;

    var l = n(9917);
    var c = n(9314);
    function d(e) {
      assert(e === "ed25519", "only tested with ed25519 so far");

      if (!(this instanceof d)) {
        return new d(e);
      }

      var e = i[e].curve;
      this.curve = e;
      this.g = e.g;
      this.g.precompute(e.n.bitLength() + 1);
      this.pointClass = e.point().constructor;
      this.encodingLength = Math.ceil(e.n.bitLength() / 8);
      this.hash = r.sha512;
    }
    e.exports = d;

    d.prototype.sign = function (e, t) {
      e = parseBytes(e);
      var n = this.keyFromSecret(t);
      var r = this.hashInt(n.messagePrefix(), e);
      var i = this.g.mul(r);
      var a = this.encodePoint(i);
      var o = this.hashInt(a, n.pubBytes(), e).mul(n.priv());
      var l = r.add(o).umod(this.curve.n);
      return this.makeSignature({ R: i, S: l, Rencoded: a });
    };

    d.prototype.verify = function (e, t, n) {
      e = parseBytes(e);
      t = this.makeSignature(t);
      var r = this.keyFromPublic(n);
      var i = this.hashInt(t.Rencoded(), r.pubBytes(), e);
      var a = this.g.mul(t.S());
      return t.R().add(r.pub().mul(i)).eq(a);
    };

    d.prototype.hashInt = function (...args) {
      for (var e = this.hash(), t = 0; t < args.length; t++) {
        e.update(args[t]);
      }
      return a.intFromLE(e.digest()).umod(this.curve.n);
    };

    d.prototype.keyFromPublic = function (e) {
      return l.fromPublic(this, e);
    };

    d.prototype.keyFromSecret = function (e) {
      return l.fromSecret(this, e);
    };

    d.prototype.makeSignature = function (e) {
      return e instanceof c ? e : new c(this, e);
    };

    d.prototype.encodePoint = function (e) {
      var t = e.getY().toArray("le", this.encodingLength);
      t[this.encodingLength - 1] |= 128 * !!e.getX().isOdd();
      return t;
    };

    d.prototype.decodePoint = function (e) {
      var t = (e = a.parseBytes(e)).length - 1;
      var n = e.slice(0, t).concat(-129 & e[t]);
      var r = (128 & e[t]) != 0;
      var i = a.intFromLE(n);
      return this.curve.pointFromY(i, r);
    };

    d.prototype.encodeInt = function (e) {
      return e.toArray("le", this.encodingLength);
    };

    d.prototype.decodeInt = function (e) {
      return a.intFromLE(e);
    };

    d.prototype.isPoint = function (e) {
      return e instanceof this.pointClass;
    };
  },
  9917: function (e, t, n) {
    var r = n(4401);

    var { assert, parseBytes, cachedProperty } = r;

    function s(e, t) {
      this.eddsa = e;
      this._secret = parseBytes(t.secret);

      if (e.isPoint(t.pub)) {
        this._pub = t.pub;
      } else {
        this._pubBytes = parseBytes(t.pub);
      }
    }

    s.fromPublic = function (e, t) {
      return t instanceof s ? t : new s(e, { pub: t });
    };

    s.fromSecret = function (e, t) {
      return t instanceof s ? t : new s(e, { secret: t });
    };

    s.prototype.secret = function () {
      return this._secret;
    };

    cachedProperty(s, "pubBytes", function () {
      return this.eddsa.encodePoint(this.pub());
    });

    cachedProperty(s, "pub", function () {
      return this._pubBytes
        ? this.eddsa.decodePoint(this._pubBytes)
        : this.eddsa.g.mul(this.priv());
    });

    cachedProperty(s, "privBytes", function () {
      var e = this.eddsa;
      var t = this.hash();
      var n = e.encodingLength - 1;
      var r = t.slice(0, e.encodingLength);
      r[0] &= 248;
      r[n] &= 127;
      r[n] |= 64;
      return r;
    });

    cachedProperty(s, "priv", function () {
      return this.eddsa.decodeInt(this.privBytes());
    });

    cachedProperty(s, "hash", function () {
      return this.eddsa.hash().update(this.secret()).digest();
    });

    cachedProperty(s, "messagePrefix", function () {
      return this.hash().slice(this.eddsa.encodingLength);
    });

    s.prototype.sign = function (e) {
      assert(this._secret, "KeyPair can only verify");
      return this.eddsa.sign(e, this);
    };

    s.prototype.verify = function (e, t) {
      return this.eddsa.verify(e, t, this);
    };

    s.prototype.getSecret = function (e) {
      assert(this._secret, "KeyPair is public only");
      return r.encode(this.secret(), e);
    };

    s.prototype.getPublic = function (e) {
      return r.encode(this.pubBytes(), e);
    };

    e.exports = s;
  },
  9314: function (e, t, n) {
    var r = n(711);
    var i = n(4401);

    var { assert, cachedProperty, parseBytes } = i;

    function l(e, t) {
      this.eddsa = e;

      if (typeof t != "object") {
        t = parseBytes(t);
      }

      if (Array.isArray(t)) {
        t = {
          R: t.slice(0, e.encodingLength),
          S: t.slice(e.encodingLength),
        };
      }

      assert(t.R && t.S, "Signature without R or S");

      if (e.isPoint(t.R)) {
        this._R = t.R;
      }

      if (t.S instanceof r) {
        this._S = t.S;
      }

      this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded;
      this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded;
    }

    cachedProperty(l, "S", function () {
      return this.eddsa.decodeInt(this.Sencoded());
    });

    cachedProperty(l, "R", function () {
      return this.eddsa.decodePoint(this.Rencoded());
    });

    cachedProperty(l, "Rencoded", function () {
      return this.eddsa.encodePoint(this.R());
    });

    cachedProperty(l, "Sencoded", function () {
      return this.eddsa.encodeInt(this.S());
    });

    l.prototype.toBytes = function () {
      return this.Rencoded().concat(this.Sencoded());
    };

    l.prototype.toHex = function () {
      return i.encode(this.toBytes(), "hex").toUpperCase();
    };

    e.exports = l;
  },
  9702: function (e) {
    e.exports = {
      doubles: {
        step: 4,
        points: [
          [
            "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
            "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
          ],
          [
            "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
            "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
          ],
          [
            "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
            "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
          ],
          [
            "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
            "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
          ],
          [
            "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
            "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
          ],
          [
            "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
            "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
          ],
          [
            "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
            "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
          ],
          [
            "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
            "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
          ],
          [
            "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
            "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
          ],
          [
            "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
            "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
          ],
          [
            "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
            "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
          ],
          [
            "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
            "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
          ],
          [
            "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
            "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
          ],
          [
            "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
            "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
          ],
          [
            "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
            "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
          ],
          [
            "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
            "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
          ],
          [
            "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
            "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
          ],
          [
            "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
            "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
          ],
          [
            "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
            "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
          ],
          [
            "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
            "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
          ],
          [
            "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
            "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
          ],
          [
            "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
            "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
          ],
          [
            "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
            "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
          ],
          [
            "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
            "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
          ],
          [
            "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
            "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
          ],
          [
            "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
            "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
          ],
          [
            "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
            "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
          ],
          [
            "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
            "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
          ],
          [
            "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
            "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
          ],
          [
            "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
            "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
          ],
          [
            "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
            "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
          ],
          [
            "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
            "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
          ],
          [
            "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
            "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
          ],
          [
            "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
            "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
          ],
          [
            "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
            "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
          ],
          [
            "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
            "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
          ],
          [
            "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
            "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
          ],
          [
            "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
            "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
          ],
          [
            "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
            "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
          ],
          [
            "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
            "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
          ],
          [
            "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
            "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
          ],
          [
            "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
            "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
          ],
          [
            "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
            "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
          ],
          [
            "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
            "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
          ],
          [
            "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
            "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
          ],
          [
            "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
            "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
          ],
          [
            "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
            "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
          ],
          [
            "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
            "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
          ],
          [
            "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
            "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
          ],
          [
            "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
            "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
          ],
          [
            "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
            "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
          ],
          [
            "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
            "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
          ],
          [
            "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
            "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
          ],
          [
            "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
            "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
          ],
          [
            "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
            "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
          ],
          [
            "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
            "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
          ],
          [
            "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
            "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
          ],
          [
            "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
            "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
          ],
          [
            "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
            "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
          ],
          [
            "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
            "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
          ],
          [
            "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
            "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
          ],
          [
            "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
            "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
          ],
          [
            "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
            "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
          ],
          [
            "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
            "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
          ],
          [
            "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
            "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
          ],
        ],
      },
      naf: {
        wnd: 7,
        points: [
          [
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
            "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
          ],
          [
            "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
            "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
          ],
          [
            "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
            "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
          ],
          [
            "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
            "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
          ],
          [
            "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
            "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
          ],
          [
            "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
            "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
          ],
          [
            "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
            "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
          ],
          [
            "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
            "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
          ],
          [
            "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
            "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
          ],
          [
            "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
            "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
          ],
          [
            "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
            "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
          ],
          [
            "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
            "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
          ],
          [
            "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
            "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
          ],
          [
            "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
            "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
          ],
          [
            "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
            "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
          ],
          [
            "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
            "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
          ],
          [
            "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
            "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
          ],
          [
            "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
            "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
          ],
          [
            "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
            "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
          ],
          [
            "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
            "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
          ],
          [
            "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
            "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
          ],
          [
            "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
            "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
          ],
          [
            "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
            "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
          ],
          [
            "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
            "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
          ],
          [
            "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
            "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
          ],
          [
            "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
            "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
          ],
          [
            "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
            "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
          ],
          [
            "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
            "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
          ],
          [
            "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
            "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
          ],
          [
            "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
            "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
          ],
          [
            "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
            "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
          ],
          [
            "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
            "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
          ],
          [
            "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
            "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
          ],
          [
            "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
            "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
          ],
          [
            "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
            "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
          ],
          [
            "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
            "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
          ],
          [
            "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
            "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
          ],
          [
            "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
            "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
          ],
          [
            "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
            "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
          ],
          [
            "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
            "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
          ],
          [
            "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
            "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
          ],
          [
            "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
            "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
          ],
          [
            "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
            "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
          ],
          [
            "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
            "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
          ],
          [
            "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
            "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
          ],
          [
            "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
            "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
          ],
          [
            "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
            "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
          ],
          [
            "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
            "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
          ],
          [
            "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
            "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
          ],
          [
            "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
            "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
          ],
          [
            "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
            "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
          ],
          [
            "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
            "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
          ],
          [
            "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
            "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
          ],
          [
            "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
            "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
          ],
          [
            "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
            "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
          ],
          [
            "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
            "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
          ],
          [
            "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
            "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
          ],
          [
            "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
            "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
          ],
          [
            "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
            "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
          ],
          [
            "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
            "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
          ],
          [
            "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
            "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
          ],
          [
            "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
            "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
          ],
          [
            "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
            "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
          ],
          [
            "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
            "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
          ],
          [
            "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
            "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
          ],
          [
            "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
            "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
          ],
          [
            "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
            "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
          ],
          [
            "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
            "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
          ],
          [
            "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
            "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
          ],
          [
            "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
            "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
          ],
          [
            "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
            "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
          ],
          [
            "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
            "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
          ],
          [
            "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
            "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
          ],
          [
            "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
            "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
          ],
          [
            "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
            "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
          ],
          [
            "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
            "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
          ],
          [
            "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
            "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
          ],
          [
            "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
            "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
          ],
          [
            "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
            "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
          ],
          [
            "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
            "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
          ],
          [
            "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
            "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
          ],
          [
            "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
            "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
          ],
          [
            "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
            "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
          ],
          [
            "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
            "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
          ],
          [
            "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
            "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
          ],
          [
            "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
            "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
          ],
          [
            "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
            "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
          ],
          [
            "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
            "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
          ],
          [
            "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
            "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
          ],
          [
            "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
            "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
          ],
          [
            "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
            "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
          ],
          [
            "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
            "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
          ],
          [
            "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
            "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
          ],
          [
            "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
            "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
          ],
          [
            "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
            "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
          ],
          [
            "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
            "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
          ],
          [
            "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
            "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
          ],
          [
            "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
            "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
          ],
          [
            "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
            "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
          ],
          [
            "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
            "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
          ],
          [
            "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
            "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
          ],
          [
            "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
            "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
          ],
          [
            "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
            "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
          ],
          [
            "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
            "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
          ],
          [
            "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
            "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
          ],
          [
            "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
            "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
          ],
          [
            "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
            "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
          ],
          [
            "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
            "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
          ],
          [
            "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
            "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
          ],
          [
            "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
            "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
          ],
          [
            "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
            "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
          ],
          [
            "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
            "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
          ],
          [
            "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
            "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
          ],
          [
            "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
            "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
          ],
          [
            "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
            "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
          ],
          [
            "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
            "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
          ],
          [
            "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
            "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
          ],
          [
            "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
            "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
          ],
          [
            "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
            "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
          ],
          [
            "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
            "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
          ],
          [
            "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
            "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
          ],
          [
            "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
            "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
          ],
          [
            "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
            "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
          ],
          [
            "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
            "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
          ],
          [
            "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
            "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
          ],
          [
            "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
            "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
          ],
          [
            "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
            "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
          ],
        ],
      },
    };
  },
  4401: function (e, t, n) {
    var r = n(711);
    var i = n(3523);
    var a = n(6545);
    t.assert = i;
    t.toArray = a.toArray;
    t.zero2 = a.zero2;
    t.toHex = a.toHex;
    t.encode = a.encode;

    t.getNAF = function (e, t, n) {
      var r = Array(Math.max(e.bitLength(), n) + 1);
      r.fill(0);
      for (var i = 1 << (t + 1), a = e.clone(), o = 0; o < r.length; o++) {
        var s;
        var l = a.andln(i - 1);

        if (a.isOdd()) {
          s = l > (i >> 1) - 1 ? (i >> 1) - l : l;
          a.isubn(s);
        } else {
          s = 0;
        }

        r[o] = s;
        a.iushrn(1);
      }
      return r;
    };

    t.getJSF = function (e, t) {
      var n = [[], []];
      e = e.clone();
      t = t.clone();
      for (var r = 0, i = 0; e.cmpn(-r) > 0 || t.cmpn(-i) > 0; ) {
        var a;
        var o;
        var s = (e.andln(3) + r) & 3;
        var l = (t.andln(3) + i) & 3;

        if (s === 3) {
          s = -1;
        }

        if (l === 3) {
          l = -1;
        }

        if ((1 & s) == 0) {
          a = 0;
        } else {
          var c = (e.andln(7) + r) & 7;
          a = (c === 3 || c === 5) && l === 2 ? -s : s;
        }

        n[0].push(a);

        if ((1 & l) == 0) {
          o = 0;
        } else {
          var c = (t.andln(7) + i) & 7;
          o = (c === 3 || c === 5) && s === 2 ? -l : l;
        }

        n[1].push(o);

        if (2 * r === a + 1) {
          r = 1 - r;
        }

        if (2 * i === o + 1) {
          i = 1 - i;
        }

        e.iushrn(1);
        t.iushrn(1);
      }
      return n;
    };

    t.cachedProperty = function (e, t, n) {
      var r = "_" + t;
      e.prototype[t] = function () {
        return this[r] !== undefined ? this[r] : (this[r] = n.call(this));
      };
    };

    t.parseBytes = function (e) {
      return typeof e == "string" ? t.toArray(e, "hex") : e;
    };

    t.intFromLE = function (e) {
      return new r(e, "hex", "le");
    };
  },
  8368: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(3533);
    e.exports = function (e, t, n, a) {
      if (!r.isBuffer(e)) {
        e = r.from(e, "binary");
      }

      if (t && (r.isBuffer(t) || (t = r.from(t, "binary")), t.length !== 8)) {
        throw RangeError("salt should be Buffer with 8 byte length");
      }

      for (
        var o = n / 8, s = r.alloc(o), l = r.alloc(a || 0), c = r.alloc(0);
        o > 0 || a > 0;

      ) {
        var d = new i();
        d.update(c);
        d.update(e);

        if (t) {
          d.update(t);
        }

        c = d.digest();
        var u = 0;
        if (o > 0) {
          var p = s.length - o;
          u = Math.min(o, c.length);
          c.copy(s, p, 0, u);
          o -= u;
        }
        if (u < c.length && a > 0) {
          var _ = l.length - a;
          var f = Math.min(a, c.length - u);
          c.copy(l, _, u, u + f);
          a -= f;
        }
      }
      c.fill(0);
      return { key: s, iv: l };
    };
  },
  9029: function (e, t, n) {
    var r = n(6911).Buffer;
    var i = n(3726).Transform;
    function a(e) {
      i.call(this);
      this._block = r.allocUnsafe(e);
      this._blockSize = e;
      this._blockOffset = 0;
      this._length = [0, 0, 0, 0];
      this._finalized = false;
    }
    n(3782)(a, i);

    a.prototype._transform = function (e, t, n) {
      var r = null;
      try {
        this.update(e, t);
      } catch (e) {
        r = e;
      }
      n(r);
    };

    a.prototype._flush = function (e) {
      var t = null;
      try {
        this.push(this.digest());
      } catch (e) {
        t = e;
      }
      e(t);
    };

    a.prototype.update = function (e, t) {
      var n = e;
      if (!r.isBuffer(n) && typeof n != "string") {
        throw TypeError("Data must be a string or a buffer");
      }
      if (this._finalized) {
        throw Error("Digest already called");
      }

      if (!r.isBuffer(e)) {
        e = r.from(e, t);
      }

      for (
        var i = this._block, a = 0;
        this._blockOffset + e.length - a >= this._blockSize;

      ) {
        for (var o = this._blockOffset; o < this._blockSize; ) {
          i[o++] = e[a++];
        }
        this._update();
        this._blockOffset = 0;
      }

      while (a < e.length) {
        i[this._blockOffset++] = e[a++];
      }

      for (var s = 0, l = 8 * e.length; l > 0; ++s) {
        this._length[s] += l;

        if ((l = (this._length[s] / 4294967296) /* 0x100000000 */ | 0) > 0) {
          this._length[s] -= 4294967296 /* 0x100000000 */ * l;
        }
      }
      return this;
    };

    a.prototype._update = function () {
      throw Error("_update is not implemented");
    };

    a.prototype.digest = function (e) {
      if (this._finalized) {
        throw Error("Digest already called");
      }
      this._finalized = true;
      var t = this._digest();

      if (e !== undefined) {
        t = t.toString(e);
      }

      this._block.fill(0);
      this._blockOffset = 0;
      for (var n = 0; n < 4; ++n) {
        this._length[n] = 0;
      }
      return t;
    };

    a.prototype._digest = function () {
      throw Error("_digest is not implemented");
    };

    e.exports = a;
  },
  7028: function (e, t, n) {
    t.utils = n(263);
    t.common = n(1330);
    t.sha = n(301);
    t.ripemd = n(3079);
    t.hmac = n(3092);
    t.sha1 = t.sha.sha1;
    t.sha256 = t.sha.sha256;
    t.sha224 = t.sha.sha224;
    t.sha384 = t.sha.sha384;
    t.sha512 = t.sha.sha512;
    t.ripemd160 = t.ripemd.ripemd160;
  },
  1330: function (e, t, n) {
    var r = n(263);
    var i = n(3523);
    function a() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    t.BlockHash = a;

    a.prototype.update = function (e, t) {
      e = r.toArray(e, t);

      if (this.pending) {
        this.pending = this.pending.concat(e);
      } else {
        this.pending = e;
      }

      this.pendingTotal += e.length;

      if (this.pending.length >= this._delta8) {
        var n = (e = this.pending).length % this._delta8;
        this.pending = e.slice(e.length - n, e.length);

        if (this.pending.length === 0) {
          this.pending = null;
        }

        e = r.join32(e, 0, e.length - n, this.endian);
        for (var i = 0; i < e.length; i += this._delta32) {
          this._update(e, i, i + this._delta32);
        }
      }

      return this;
    };

    a.prototype.digest = function (e) {
      this.update(this._pad());
      i(this.pending === null);
      return this._digest(e);
    };

    a.prototype._pad = function () {
      var e = this.pendingTotal;
      var t = this._delta8;
      var n = t - ((e + this.padLength) % t);
      var r = Array(n + this.padLength);
      r[0] = 128;
      for (var i = 1; i < n; i++) {
        r[i] = 0;
      }
      e <<= 3;

      if (this.endian === "big") {
        for (var a = 8; a < this.padLength; a++) {
          r[i++] = 0;
        }
        r[i++] = 0;
        r[i++] = 0;
        r[i++] = 0;
        r[i++] = 0;
        r[i++] = (e >>> 24) & 255;
        r[i++] = (e >>> 16) & 255;
        r[i++] = (e >>> 8) & 255;
        r[i++] = 255 & e;
      } else {
        a = 8;
        r[i++] = 255 & e;
        r[i++] = (e >>> 8) & 255;
        r[i++] = (e >>> 16) & 255;
        r[i++] = (e >>> 24) & 255;
        r[i++] = 0;
        r[i++] = 0;
        r[i++] = 0;

        for (r[i++] = 0; a < this.padLength; a++) {
          r[i++] = 0;
        }
      }

      return r;
    };
  },
  3092: function (e, t, n) {
    var r = n(263);
    var i = n(3523);
    function a(e, t, n) {
      if (!(this instanceof a)) {
        return new a(e, t, n);
      }
      this.Hash = e;
      this.blockSize = e.blockSize / 8;
      this.outSize = e.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(r.toArray(t, n));
    }
    e.exports = a;

    a.prototype._init = function (e) {
      if (e.length > this.blockSize) {
        e = new this.Hash().update(e).digest();
      }

      i(e.length <= this.blockSize);
      for (var t = e.length; t < this.blockSize; t++) {
        e.push(0);
      }
      for (t = 0; t < e.length; t++) {
        e[t] ^= 54;
      }
      t = 0;

      for (this.inner = new this.Hash().update(e); t < e.length; t++) {
        e[t] ^= 106;
      }

      this.outer = new this.Hash().update(e);
    };

    a.prototype.update = function (e, t) {
      this.inner.update(e, t);
      return this;
    };

    a.prototype.digest = function (e) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(e);
    };
  },
  3079: function (e, t, n) {
    var r = n(263);
    var i = n(1330);

    var { rotl32, sum32, sum32_3, sum32_4 } = r;

    var i_BlockHash = i.BlockHash;
    function d() {
      if (!(this instanceof d)) {
        return new d();
      }
      i_BlockHash.call(this);

      this.h = [
        1732584193 /* 0x67452301 */, 4023233417 /* 0xefcdab89 */,
        2562383102 /* 0x98badcfe */, 271733878 /* 0x10325476 */,
        3285377520 /* 0xc3d2e1f0 */,
      ];

      this.endian = "little";
    }
    function u(e, t, n, r) {
      if (e <= 15) {
        return t ^ n ^ r;
      }

      if (e <= 31) {
        return (t & n) | (~t & r);
      }

      if (e <= 47) {
        return (t | ~n) ^ r;
      }

      if (e <= 63) {
        return (t & r) | (n & ~r);
      }

      return t ^ (n | ~r);
    }
    r.inherits(d, i_BlockHash);
    t.ripemd160 = d;
    d.blockSize = 512;
    d.outSize = 160;
    d.hmacStrength = 192;
    d.padLength = 64;

    d.prototype._update = function (e, t) {
      for (
        var n = this.h[0],
          r = this.h[1],
          i = this.h[2],
          c = this.h[3],
          d = this.h[4],
          h = n,
          g = r,
          y = i,
          b = c,
          x = d,
          S = 0;
        S < 80;
        S++
      ) {
        var k;
        var T;

        var E = sum32(
          rotl32(
            sum32_4(
              n,
              u(S, r, i, c),
              e[p[S] + t],
              (k = S) <= 15
                ? 0
                : k <= 31
                ? 1518500249 /* 0x5a827999 */
                : k <= 47
                ? 1859775393 /* 0x6ed9eba1 */
                : k <= 63
                ? 2400959708 /* 0x8f1bbcdc */
                : 2840853838 /* 0xa953fd4e */
            ),
            f[S]
          ),
          d
        );

        n = d;
        d = c;
        c = rotl32(i, 10);
        i = r;
        r = E;

        E = sum32(
          rotl32(
            sum32_4(
              h,
              u(79 - S, g, y, b),
              e[_[S] + t],
              (T = S) <= 15
                ? 1352829926 /* 0x50a28be6 */
                : T <= 31
                ? 1548603684 /* 0x5c4dd124 */
                : T <= 47
                ? 1836072691 /* 0x6d703ef3 */
                : 2053994217 /* 0x7a6d76e9 */ * !!(T <= 63)
            ),
            m[S]
          ),
          x
        );

        h = x;
        x = b;
        b = rotl32(y, 10);
        y = g;
        g = E;
      }
      E = sum32_3(this.h[1], i, b);
      this.h[1] = sum32_3(this.h[2], i_BlockHash, x);
      this.h[2] = sum32_3(this.h[3], d, h);
      this.h[3] = sum32_3(this.h[4], n, g);
      this.h[4] = sum32_3(this.h[0], r, y);
      this.h[0] = E;
    };

    d.prototype._digest = function (e) {
      return e === "hex"
        ? r.toHex32(this.h, "little")
        : r.split32(this.h, "little");
    };

    var p = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
      15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6,
      13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0,
      5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
    ];

    var _ = [
      5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13,
      5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2,
      10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12,
      15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
    ];

    var f = [
      11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
      9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8,
      13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5,
      12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
    ];

    var m = [
      8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12,
      8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13,
      5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15,
      8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
    ];
  },
  301: function (e, t, n) {
    t.sha1 = n(2742);
    t.sha224 = n(7105);
    t.sha256 = n(1525);
    t.sha384 = n(9948);
    t.sha512 = n(1319);
  },
  2742: function (e, t, n) {
    var r = n(263);
    var i = n(1330);
    var a = n(2975);

    var { rotl32, sum32, sum32_5 } = r;

    var a_ft_1 = a.ft_1;
    var i_BlockHash = i.BlockHash;
    var u = [
      1518500249 /* 0x5a827999 */, 1859775393 /* 0x6ed9eba1 */,
      2400959708 /* 0x8f1bbcdc */, 3395469782 /* 0xca62c1d6 */,
    ];
    function p() {
      if (!(this instanceof p)) {
        return new p();
      }
      i_BlockHash.call(this);

      this.h = [
        1732584193 /* 0x67452301 */, 4023233417 /* 0xefcdab89 */,
        2562383102 /* 0x98badcfe */, 271733878 /* 0x10325476 */,
        3285377520 /* 0xc3d2e1f0 */,
      ];

      this.W = Array(80);
    }
    r.inherits(p, i_BlockHash);
    e.exports = p;
    p.blockSize = 512;
    p.outSize = 160;
    p.hmacStrength = 80;
    p.padLength = 64;

    p.prototype._update = function (e, t) {
      for (var n = this.W, r = 0; r < 16; r++) {
        n[r] = e[t + r];
      }
      for (; r < n.length; r++) {
        n[r] = rotl32(n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16], 1);
      }
      var i = this.h[0];
      var a = this.h[1];
      var d = this.h[2];
      var p = this.h[3];
      var _ = this.h[4];
      for (r = 0; r < n.length; r++) {
        var f = ~~(r / 20);
        var m = sum32_5(rotl32(i, 5), a_ft_1(f, a, d, p), _, n[r], u[f]);
        _ = p;
        p = d;
        d = rotl32(a, 30);
        a = i;
        i = m;
      }
      this.h[0] = sum32(this.h[0], i);
      this.h[1] = sum32(this.h[1], a);
      this.h[2] = sum32(this.h[2], d);
      this.h[3] = sum32(this.h[3], p);
      this.h[4] = sum32(this.h[4], _);
    };

    p.prototype._digest = function (e) {
      return e === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
    };
  },
  7105: function (e, t, n) {
    var r = n(263);
    var i = n(1525);
    function a() {
      if (!(this instanceof a)) {
        return new a();
      }
      i.call(this);

      this.h = [
        3238371032 /* 0xc1059ed8 */, 914150663 /* 0x367cd507 */,
        812702999 /* 0x3070dd17 */, 4144912697 /* 0xf70e5939 */,
        4290775857 /* 0xffc00b31 */, 1750603025 /* 0x68581511 */,
        1694076839 /* 0x64f98fa7 */, 3204075428 /* 0xbefa4fa4 */,
      ];
    }
    r.inherits(a, i);
    e.exports = a;
    a.blockSize = 512;
    a.outSize = 224;
    a.hmacStrength = 192;
    a.padLength = 64;

    a.prototype._digest = function (e) {
      return e === "hex"
        ? r.toHex32(this.h.slice(0, 7), "big")
        : r.split32(this.h.slice(0, 7), "big");
    };
  },
  1525: function (e, t, n) {
    var r = n(263);
    var i = n(1330);
    var a = n(2975);
    var o = n(3523);

    var { sum32, sum32_4, sum32_5 } = r;

    var { ch32, maj32, s0_256, s1_256, g0_256, g1_256 } = a;

    var i_BlockHash = i.BlockHash;

    var g = [
      1116352408 /* 0x428a2f98 */, 1899447441 /* 0x71374491 */,
      3049323471 /* 0xb5c0fbcf */, 3921009573 /* 0xe9b5dba5 */,
      961987163 /* 0x3956c25b */, 1508970993 /* 0x59f111f1 */,
      2453635748 /* 0x923f82a4 */, 2870763221 /* 0xab1c5ed5 */,
      3624381080 /* 0xd807aa98 */, 310598401 /* 0x12835b01 */,
      607225278 /* 0x243185be */, 1426881987 /* 0x550c7dc3 */,
      1925078388 /* 0x72be5d74 */, 2162078206 /* 0x80deb1fe */,
      2614888103 /* 0x9bdc06a7 */, 3248222580 /* 0xc19bf174 */,
      3835390401 /* 0xe49b69c1 */, 4022224774 /* 0xefbe4786 */,
      264347078 /* 0xfc19dc6 */, 604807628 /* 0x240ca1cc */,
      770255983 /* 0x2de92c6f */, 1249150122 /* 0x4a7484aa */,
      1555081692 /* 0x5cb0a9dc */, 1996064986 /* 0x76f988da */,
      2554220882 /* 0x983e5152 */, 2821834349 /* 0xa831c66d */,
      2952996808 /* 0xb00327c8 */, 3210313671 /* 0xbf597fc7 */,
      3336571891 /* 0xc6e00bf3 */, 3584528711 /* 0xd5a79147 */,
      113926993 /* 0x6ca6351 */, 338241895 /* 0x14292967 */,
      666307205 /* 0x27b70a85 */, 773529912 /* 0x2e1b2138 */,
      1294757372 /* 0x4d2c6dfc */, 1396182291 /* 0x53380d13 */,
      1695183700 /* 0x650a7354 */, 1986661051 /* 0x766a0abb */,
      2177026350 /* 0x81c2c92e */, 2456956037 /* 0x92722c85 */,
      2730485921 /* 0xa2bfe8a1 */, 2820302411 /* 0xa81a664b */,
      3259730800 /* 0xc24b8b70 */, 3345764771 /* 0xc76c51a3 */,
      3516065817 /* 0xd192e819 */, 3600352804 /* 0xd6990624 */,
      4094571909 /* 0xf40e3585 */, 275423344 /* 0x106aa070 */,
      430227734 /* 0x19a4c116 */, 506948616 /* 0x1e376c08 */,
      659060556 /* 0x2748774c */, 883997877 /* 0x34b0bcb5 */,
      958139571 /* 0x391c0cb3 */, 1322822218 /* 0x4ed8aa4a */,
      1537002063 /* 0x5b9cca4f */, 1747873779 /* 0x682e6ff3 */,
      1955562222 /* 0x748f82ee */, 2024104815 /* 0x78a5636f */,
      2227730452 /* 0x84c87814 */, 2361852424 /* 0x8cc70208 */,
      2428436474 /* 0x90befffa */, 2756734187 /* 0xa4506ceb */,
      3204031479 /* 0xbef9a3f7 */, 3329325298 /* 0xc67178f2 */,
    ];

    function y() {
      if (!(this instanceof y)) {
        return new y();
      }
      i_BlockHash.call(this);

      this.h = [
        1779033703 /* 0x6a09e667 */, 3144134277 /* 0xbb67ae85 */,
        1013904242 /* 0x3c6ef372 */, 2773480762 /* 0xa54ff53a */,
        1359893119 /* 0x510e527f */, 2600822924 /* 0x9b05688c */,
        528734635 /* 0x1f83d9ab */, 1541459225 /* 0x5be0cd19 */,
      ];

      this.k = g;
      this.W = Array(64);
    }
    r.inherits(y, i_BlockHash);
    e.exports = y;
    y.blockSize = 512;
    y.outSize = 256;
    y.hmacStrength = 192;
    y.padLength = 64;

    y.prototype._update = function (e, t) {
      for (var n = this.W, r = 0; r < 16; r++) {
        n[r] = e[t + r];
      }
      for (; r < n.length; r++) {
        n[r] = sum32_4(
          g1_256(n[r - 2]),
          n[r - 7],
          g0_256(n[r - 15]),
          n[r - 16]
        );
      }
      var i = this.h[0];
      var a = this.h[1];
      var h = this.h[2];
      var g = this.h[3];
      var y = this.h[4];
      var b = this.h[5];
      var x = this.h[6];
      var S = this.h[7];
      o(this.k.length === n.length);

      for (r = 0; r < n.length; r++) {
        var k = sum32_5(S, s1_256(y), ch32(y, b, x), this.k[r], n[r]);
        var T = sum32(s0_256(i), maj32(i, a, h));
        S = x;
        x = b;
        b = y;
        y = sum32(g, k);
        g = h;
        h = a;
        a = i;
        i = sum32(k, T);
      }

      this.h[0] = sum32(this.h[0], i);
      this.h[1] = sum32(this.h[1], a);
      this.h[2] = sum32(this.h[2], h);
      this.h[3] = sum32(this.h[3], g);
      this.h[4] = sum32(this.h[4], y);
      this.h[5] = sum32(this.h[5], b);
      this.h[6] = sum32(this.h[6], x);
      this.h[7] = sum32(this.h[7], S);
    };

    y.prototype._digest = function (e) {
      return e === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
    };
  },
  9948: function (e, t, n) {
    var r = n(263);
    var i = n(1319);
    function a() {
      if (!(this instanceof a)) {
        return new a();
      }
      i.call(this);

      this.h = [
        3418070365 /* 0xcbbb9d5d */, 3238371032 /* 0xc1059ed8 */,
        1654270250 /* 0x629a292a */, 914150663 /* 0x367cd507 */,
        2438529370 /* 0x9159015a */, 812702999 /* 0x3070dd17 */,
        355462360 /* 0x152fecd8 */, 4144912697 /* 0xf70e5939 */,
        1731405415 /* 0x67332667 */, 4290775857 /* 0xffc00b31 */,
        2394180231 /* 0x8eb44a87 */, 1750603025 /* 0x68581511 */,
        3675008525 /* 0xdb0c2e0d */, 1694076839 /* 0x64f98fa7 */,
        1203062813 /* 0x47b5481d */, 3204075428 /* 0xbefa4fa4 */,
      ];
    }
    r.inherits(a, i);
    e.exports = a;
    a.blockSize = 1024;
    a.outSize = 384;
    a.hmacStrength = 192;
    a.padLength = 128;

    a.prototype._digest = function (e) {
      return e === "hex"
        ? r.toHex32(this.h.slice(0, 12), "big")
        : r.split32(this.h.slice(0, 12), "big");
    };
  },
  1319: function (e, t, n) {
    var r = n(263);
    var i = n(1330);
    var a = n(3523);

    var {
      rotr64_hi,
      rotr64_lo,
      shr64_hi,
      shr64_lo,
      sum64,
      sum64_hi,
      sum64_lo,
      sum64_4_hi,
      sum64_4_lo,
      sum64_5_hi,
      sum64_5_lo,
    } = r;

    var i_BlockHash = i.BlockHash;

    var y = [
      1116352408 /* 0x428a2f98 */, 3609767458 /* 0xd728ae22 */,
      1899447441 /* 0x71374491 */, 602891725 /* 0x23ef65cd */,
      3049323471 /* 0xb5c0fbcf */, 3964484399 /* 0xec4d3b2f */,
      3921009573 /* 0xe9b5dba5 */, 2173295548 /* 0x8189dbbc */,
      961987163 /* 0x3956c25b */, 4081628472 /* 0xf348b538 */,
      1508970993 /* 0x59f111f1 */, 3053834265 /* 0xb605d019 */,
      2453635748 /* 0x923f82a4 */, 2937671579 /* 0xaf194f9b */,
      2870763221 /* 0xab1c5ed5 */, 3664609560 /* 0xda6d8118 */,
      3624381080 /* 0xd807aa98 */, 2734883394 /* 0xa3030242 */,
      310598401 /* 0x12835b01 */, 1164996542 /* 0x45706fbe */,
      607225278 /* 0x243185be */, 1323610764 /* 0x4ee4b28c */,
      1426881987 /* 0x550c7dc3 */, 3590304994 /* 0xd5ffb4e2 */,
      1925078388 /* 0x72be5d74 */, 4068182383 /* 0xf27b896f */,
      2162078206 /* 0x80deb1fe */, 991336113 /* 0x3b1696b1 */,
      2614888103 /* 0x9bdc06a7 */, 633803317 /* 0x25c71235 */,
      3248222580 /* 0xc19bf174 */, 3479774868 /* 0xcf692694 */,
      3835390401 /* 0xe49b69c1 */, 2666613458 /* 0x9ef14ad2 */,
      4022224774 /* 0xefbe4786 */, 944711139 /* 0x384f25e3 */,
      264347078 /* 0xfc19dc6 */, 2341262773 /* 0x8b8cd5b5 */,
      604807628 /* 0x240ca1cc */, 2007800933 /* 0x77ac9c65 */,
      770255983 /* 0x2de92c6f */, 1495990901 /* 0x592b0275 */,
      1249150122 /* 0x4a7484aa */, 1856431235 /* 0x6ea6e483 */,
      1555081692 /* 0x5cb0a9dc */, 3175218132 /* 0xbd41fbd4 */,
      1996064986 /* 0x76f988da */, 2198950837 /* 0x831153b5 */,
      2554220882 /* 0x983e5152 */, 3999719339 /* 0xee66dfab */,
      2821834349 /* 0xa831c66d */, 766784016 /* 0x2db43210 */,
      2952996808 /* 0xb00327c8 */, 2566594879 /* 0x98fb213f */,
      3210313671 /* 0xbf597fc7 */, 3203337956 /* 0xbeef0ee4 */,
      3336571891 /* 0xc6e00bf3 */, 1034457026 /* 0x3da88fc2 */,
      3584528711 /* 0xd5a79147 */, 2466948901 /* 0x930aa725 */,
      113926993 /* 0x6ca6351 */, 3758326383 /* 0xe003826f */,
      338241895 /* 0x14292967 */, 168717936 /* 0xa0e6e70 */,
      666307205 /* 0x27b70a85 */, 1188179964 /* 0x46d22ffc */,
      773529912 /* 0x2e1b2138 */, 1546045734 /* 0x5c26c926 */,
      1294757372 /* 0x4d2c6dfc */, 1522805485 /* 0x5ac42aed */,
      1396182291 /* 0x53380d13 */, 2643833823 /* 0x9d95b3df */,
      1695183700 /* 0x650a7354 */, 2343527390 /* 0x8baf63de */,
      1986661051 /* 0x766a0abb */, 1014477480 /* 0x3c77b2a8 */,
      2177026350 /* 0x81c2c92e */, 1206759142 /* 0x47edaee6 */,
      2456956037 /* 0x92722c85 */, 344077627 /* 0x1482353b */,
      2730485921 /* 0xa2bfe8a1 */, 1290863460 /* 0x4cf10364 */,
      2820302411 /* 0xa81a664b */, 3158454273 /* 0xbc423001 */,
      3259730800 /* 0xc24b8b70 */, 3505952657 /* 0xd0f89791 */,
      3345764771 /* 0xc76c51a3 */, 106217008 /* 0x654be30 */,
      3516065817 /* 0xd192e819 */, 3606008344 /* 0xd6ef5218 */,
      3600352804 /* 0xd6990624 */, 1432725776 /* 0x5565a910 */,
      4094571909 /* 0xf40e3585 */, 1467031594 /* 0x5771202a */,
      275423344 /* 0x106aa070 */, 851169720 /* 0x32bbd1b8 */,
      430227734 /* 0x19a4c116 */, 3100823752 /* 0xb8d2d0c8 */,
      506948616 /* 0x1e376c08 */, 1363258195 /* 0x5141ab53 */,
      659060556 /* 0x2748774c */, 3750685593 /* 0xdf8eeb99 */,
      883997877 /* 0x34b0bcb5 */, 3785050280 /* 0xe19b48a8 */,
      958139571 /* 0x391c0cb3 */, 3318307427 /* 0xc5c95a63 */,
      1322822218 /* 0x4ed8aa4a */, 3812723403 /* 0xe3418acb */,
      1537002063 /* 0x5b9cca4f */, 2003034995 /* 0x7763e373 */,
      1747873779 /* 0x682e6ff3 */, 3602036899 /* 0xd6b2b8a3 */,
      1955562222 /* 0x748f82ee */, 1575990012 /* 0x5defb2fc */,
      2024104815 /* 0x78a5636f */, 1125592928 /* 0x43172f60 */,
      2227730452 /* 0x84c87814 */, 2716904306 /* 0xa1f0ab72 */,
      2361852424 /* 0x8cc70208 */, 442776044 /* 0x1a6439ec */,
      2428436474 /* 0x90befffa */, 593698344 /* 0x23631e28 */,
      2756734187 /* 0xa4506ceb */, 3733110249 /* 0xde82bde9 */,
      3204031479 /* 0xbef9a3f7 */, 2999351573 /* 0xb2c67915 */,
      3329325298 /* 0xc67178f2 */, 3815920427 /* 0xe372532b */,
      3391569614 /* 0xca273ece */, 3928383900 /* 0xea26619c */,
      3515267271 /* 0xd186b8c7 */, 566280711 /* 0x21c0c207 */,
      3940187606 /* 0xeada7dd6 */, 3454069534 /* 0xcde0eb1e */,
      4118630271 /* 0xf57d4f7f */, 4000239992 /* 0xee6ed178 */,
      116418474 /* 0x6f067aa */, 1914138554 /* 0x72176fba */,
      174292421 /* 0xa637dc5 */, 2731055270 /* 0xa2c898a6 */,
      289380356 /* 0x113f9804 */, 3203993006 /* 0xbef90dae */,
      460393269 /* 0x1b710b35 */, 320620315 /* 0x131c471b */,
      685471733 /* 0x28db77f5 */, 587496836 /* 0x23047d84 */,
      852142971 /* 0x32caab7b */, 1086792851 /* 0x40c72493 */,
      1017036298 /* 0x3c9ebe0a */, 365543100 /* 0x15c9bebc */,
      1126000580 /* 0x431d67c4 */, 2618297676 /* 0x9c100d4c */,
      1288033470 /* 0x4cc5d4be */, 3409855158 /* 0xcb3e42b6 */,
      1501505948 /* 0x597f299c */, 4234509866 /* 0xfc657e2a */,
      1607167915 /* 0x5fcb6fab */, 987167468 /* 0x3ad6faec */,
      1816402316 /* 0x6c44198c */, 1246189591 /* 0x4a475817 */,
    ];

    function b() {
      if (!(this instanceof b)) {
        return new b();
      }
      i_BlockHash.call(this);

      this.h = [
        1779033703 /* 0x6a09e667 */, 4089235720 /* 0xf3bcc908 */,
        3144134277 /* 0xbb67ae85 */, 2227873595 /* 0x84caa73b */,
        1013904242 /* 0x3c6ef372 */, 4271175723 /* 0xfe94f82b */,
        2773480762 /* 0xa54ff53a */, 1595750129 /* 0x5f1d36f1 */,
        1359893119 /* 0x510e527f */, 2917565137 /* 0xade682d1 */,
        2600822924 /* 0x9b05688c */, 725511199 /* 0x2b3e6c1f */,
        528734635 /* 0x1f83d9ab */, 4215389547 /* 0xfb41bd6b */,
        1541459225 /* 0x5be0cd19 */, 327033209 /* 0x137e2179 */,
      ];

      this.k = y;
      this.W = Array(160);
    }
    r.inherits(b, i_BlockHash);
    e.exports = b;
    b.blockSize = 1024;
    b.outSize = 512;
    b.hmacStrength = 192;
    b.padLength = 128;

    b.prototype._prepareBlock = function (e, t) {
      for (var n = this.W, r = 0; r < 32; r++) {
        n[r] = e[t + r];
      }
      for (; r < n.length; r += 2) {
        var i = (function (e, t) {
          var n = rotr64_hi(e, t, 19) ^ rotr64_hi(t, e, 29) ^ shr64_hi(e, t, 6);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(n[r - 4], n[r - 3]);

        var a = (function (e, t) {
          var n = rotr64_lo(e, t, 19) ^ rotr64_lo(t, e, 29) ^ shr64_lo(e, t, 6);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(n[r - 4], n[r - 3]);

        var d = n[r - 14];
        var u = n[r - 13];

        var p = (function (e, t) {
          var n = rotr64_hi(e, t, 1) ^ rotr64_hi(e, t, 8) ^ shr64_hi(e, t, 7);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(n[r - 30], n[r - 29]);

        var m = (function (e, t) {
          var n = rotr64_lo(e, t, 1) ^ rotr64_lo(e, t, 8) ^ shr64_lo(e, t, 7);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(n[r - 30], n[r - 29]);

        var h = n[r - 32];
        var g = n[r - 31];
        n[r] = sum64_4_hi(i, a, d, u, p, m, h, g);
        n[r + 1] = sum64_4_lo(i, a, d, u, p, m, h, g);
      }
    };

    b.prototype._update = function (e, t) {
      this._prepareBlock(e, t);
      var n = this.W;
      var r = this.h[0];
      var i = this.h[1];
      var l = this.h[2];
      var c = this.h[3];
      var _ = this.h[4];
      var f = this.h[5];
      var g = this.h[6];
      var y = this.h[7];
      var b = this.h[8];
      var x = this.h[9];
      var S = this.h[10];
      var k = this.h[11];
      var T = this.h[12];
      var E = this.h[13];
      var C = this.h[14];
      var A = this.h[15];
      a(this.k.length === n.length);
      for (var w = 0; w < n.length; w += 2) {
        var D = C;
        var N = A;

        var I = (function (e, t) {
          var n =
            rotr64_hi(e, t, 14) ^ rotr64_hi(e, t, 18) ^ rotr64_hi(t, e, 9);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(b, x);

        var P = (function (e, t) {
          var n =
            rotr64_lo(e, t, 14) ^ rotr64_lo(e, t, 18) ^ rotr64_lo(t, e, 9);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(b, x);

        var M = (function (e, t, n, r, i) {
          var a = (e & n) ^ (~e & i);

          if (a < 0) {
            a += 4294967296 /* 0x100000000 */;
          }

          return a;
        })(b, 0, S, 0, T, E);

        var L = (function (e, t, n, r, i, a) {
          var o = (t & r) ^ (~t & a);

          if (o < 0) {
            o += 4294967296 /* 0x100000000 */;
          }

          return o;
        })(0, x, 0, k, 0, E);

        var R = this.k[w];
        var F = this.k[w + 1];
        var n_w = n[w];
        var B = n[w + 1];
        var W = sum64_5_hi(D, N, I, P, M, L, R, F, n_w, B);
        var j = sum64_5_lo(D, N, I, P, M, L, R, F, n_w, B);

        D = (function (e, t) {
          var n = rotr64_hi(e, t, 28) ^ rotr64_hi(t, e, 2) ^ rotr64_hi(t, e, 7);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(r, i);

        N = (function (e, t) {
          var n = rotr64_lo(e, t, 28) ^ rotr64_lo(t, e, 2) ^ rotr64_lo(t, e, 7);

          if (n < 0) {
            n += 4294967296 /* 0x100000000 */;
          }

          return n;
        })(r, i);

        var z = sum64_hi(
          D,
          N,
          (I = (function (e, t, n, r, i) {
            var a = (e & n) ^ (e & i) ^ (n & i);

            if (a < 0) {
              a += 4294967296 /* 0x100000000 */;
            }

            return a;
          })(r, 0, l, 0, _, f)),
          (P = (function (e, t, n, r, i, a) {
            var o = (t & r) ^ (t & a) ^ (r & a);

            if (o < 0) {
              o += 4294967296 /* 0x100000000 */;
            }

            return o;
          })(0, i, 0, c, 0, f))
        );

        var V = sum64_lo(D, N, I, P);
        C = T;
        A = E;
        T = S;
        E = k;
        S = b;
        k = x;
        b = sum64_hi(g, y, W, j);
        x = sum64_lo(y, y, W, j);
        g = _;
        y = f;
        _ = l;
        f = c;
        l = r;
        c = i;
        r = sum64_hi(W, j, z, V);
        i = sum64_lo(W, j, z, V);
      }
      sum64(this.h, 0, r, i);
      sum64(this.h, 2, l, c);
      sum64(this.h, 4, _, f);
      sum64(this.h, 6, g, y);
      sum64(this.h, 8, b, x);
      sum64(this.h, 10, S, k);
      sum64(this.h, 12, T, E);
      sum64(this.h, 14, C, A);
    };

    b.prototype._digest = function (e) {
      return e === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
    };
  },
  2975: function (e, t, n) {
    var r = n(263).rotr32;
    function i(e, t, n) {
      return (e & t) ^ (e & n) ^ (t & n);
    }

    t.ft_1 = function (e, t, n, r) {
      var a;
      return e === 0
        ? ((a = t) & n) ^ (~a & r)
        : e === 1 || e === 3
        ? t ^ n ^ r
        : e === 2
        ? i(t, n, r)
        : undefined;
    };

    t.ch32 = function (e, t, n) {
      return (e & t) ^ (~e & n);
    };

    t.maj32 = i;

    t.p32 = function (e, t, n) {
      return e ^ t ^ n;
    };

    t.s0_256 = function (e) {
      return r(e, 2) ^ r(e, 13) ^ r(e, 22);
    };

    t.s1_256 = function (e) {
      return r(e, 6) ^ r(e, 11) ^ r(e, 25);
    };

    t.g0_256 = function (e) {
      return r(e, 7) ^ r(e, 18) ^ (e >>> 3);
    };

    t.g1_256 = function (e) {
      return r(e, 17) ^ r(e, 19) ^ (e >>> 10);
    };
  },
  263: function (e, t, n) {
    var r = n(3523);
    function i(e) {
      return (
        ((e >>> 24) |
          ((e >>> 8) & 65280) |
          ((e << 8) & 16711680) /* 0xff0000 */ |
          ((255 & e) << 24)) >>>
        0
      );
    }
    function a(e) {
      return e.length === 1 ? "0" + e : e;
    }
    function o(e) {
      if (e.length === 7) {
        return "0" + e;
      }
      if (e.length === 6) {
        return "00" + e;
      }
      if (e.length === 5) {
        return "000" + e;
      }
      if (e.length === 4) {
        return "0000" + e;
      }
      if (e.length === 3) {
        return "00000" + e;
      } else if (e.length === 2) {
        return "000000" + e;
      } else if (e.length === 1) {
        return "0000000" + e;
      } else {
        return e;
      }
    }
    t.inherits = n(3782);

    t.toArray = function (e, t) {
      if (Array.isArray(e)) {
        return e.slice();
      }
      if (!e) {
        return [];
      }
      var n = [];
      if (typeof e == "string") {
        if (t) {
          if (t === "hex") {
            if ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0) {
              e = "0" + e;
            }

            for (i = 0; i < e.length; i += 2) {
              n.push(parseInt(e[i] + e[i + 1], 16));
            }
          }
        } else {
          for (var r = 0, i = 0; i < e.length; i++) {
            var a;
            var o;
            var s = e.charCodeAt(i);

            if (s < 128) {
              n[r++] = s;
            } else {
              s < 2048
                ? (n[r++] = (s >> 6) | 192)
                : (((a = e),
                  (o = i),
                  (64512 & a.charCodeAt(o)) != 55296 ||
                  o < 0 ||
                  o + 1 >= a.length
                    ? 1
                    : (64512 & a.charCodeAt(o + 1)) != 56320)
                    ? (n[r++] = (s >> 12) | 224)
                    : ((s =
                        65536 +
                        ((1023 & s) << 10) +
                        (1023 & e.charCodeAt(++i))),
                      (n[r++] = (s >> 18) | 240),
                      (n[r++] = ((s >> 12) & 63) | 128)),
                  (n[r++] = ((s >> 6) & 63) | 128));

              n[r++] = (63 & s) | 128;
            }
          }
        }
      } else {
        for (i = 0; i < e.length; i++) {
          n[i] = 0 | e[i];
        }
      }
      return n;
    };

    t.toHex = function (e) {
      for (var t = "", n = 0; n < e.length; n++) {
        t += a(e[n].toString(16));
      }
      return t;
    };

    t.htonl = i;

    t.toHex32 = function (e, t) {
      for (var n = "", r = 0; r < e.length; r++) {
        var e_r = e[r];

        if (t === "little") {
          e_r = i(e_r);
        }

        n += o(e_r.toString(16));
      }
      return n;
    };

    t.zero2 = a;
    t.zero8 = o;

    t.join32 = function (e, t, n, i) {
      var a;
      var o = n - t;
      r(o % 4 == 0);
      for (var s = Array(o / 4), l = 0, c = t; l < s.length; l++, c += 4) {
        a =
          i === "big"
            ? (e[c] << 24) | (e[c + 1] << 16) | (e[c + 2] << 8) | e[c + 3]
            : (e[c + 3] << 24) | (e[c + 2] << 16) | (e[c + 1] << 8) | e[c];

        s[l] = a >>> 0;
      }
      return s;
    };

    t.split32 = function (e, t) {
      for (
        var n = Array(4 * e.length), r = 0, i = 0;
        r < e.length;
        r++, i += 4
      ) {
        var e_r = e[r];

        if (t === "big") {
          n[i] = e_r >>> 24;
          n[i + 1] = (e_r >>> 16) & 255;
          n[i + 2] = (e_r >>> 8) & 255;
          n[i + 3] = 255 & e_r;
        } else {
          n[i + 3] = e_r >>> 24;
          n[i + 2] = (e_r >>> 16) & 255;
          n[i + 1] = (e_r >>> 8) & 255;
          n[i] = 255 & e_r;
        }
      }
      return n;
    };

    t.rotr32 = function (e, t) {
      return (e >>> t) | (e << (32 - t));
    };

    t.rotl32 = function (e, t) {
      return (e << t) | (e >>> (32 - t));
    };

    t.sum32 = function (e, t) {
      return (e + t) >>> 0;
    };

    t.sum32_3 = function (e, t, n) {
      return (e + t + n) >>> 0;
    };

    t.sum32_4 = function (e, t, n, r) {
      return (e + t + n + r) >>> 0;
    };

    t.sum32_5 = function (e, t, n, r, i) {
      return (e + t + n + r + i) >>> 0;
    };

    t.sum64 = function (e, t, n, r) {
      var e_t = e[t];
      var a = (r + e[t + 1]) >>> 0;
      e[t] = (+(a < r) + n + e_t) >>> 0;
      e[t + 1] = a;
    };

    t.sum64_hi = function (e, t, n, r) {
      return (+((t + r) >>> 0 < t) + e + n) >>> 0;
    };

    t.sum64_lo = function (e, t, n, r) {
      return (t + r) >>> 0;
    };

    t.sum64_4_hi = function (e, t, n, r, i, a, o, s) {
      var l;
      var c = t;
      return (
        (e +
          n +
          i +
          o +
          (l =
            0 +
            +((c = (c + r) >>> 0) < t) +
            +((c = (c + a) >>> 0) < a) +
            +((c = (c + s) >>> 0) < s))) >>>
        0
      );
    };

    t.sum64_4_lo = function (e, t, n, r, i, a, o, s) {
      return (t + r + a + s) >>> 0;
    };

    t.sum64_5_hi = function (e, t, n, r, i, a, o, s, l, c) {
      var d;
      var u = t;
      return (
        (e +
          n +
          i +
          o +
          l +
          (d =
            0 +
            +((u = (u + r) >>> 0) < t) +
            +((u = (u + a) >>> 0) < a) +
            +((u = (u + s) >>> 0) < s) +
            +((u = (u + c) >>> 0) < c))) >>>
        0
      );
    };

    t.sum64_5_lo = function (e, t, n, r, i, a, o, s, l, c) {
      return (t + r + a + s + c) >>> 0;
    };

    t.rotr64_hi = function (e, t, n) {
      return ((t << (32 - n)) | (e >>> n)) >>> 0;
    };

    t.rotr64_lo = function (e, t, n) {
      return ((e << (32 - n)) | (t >>> n)) >>> 0;
    };

    t.shr64_hi = function (e, t, n) {
      return e >>> n;
    };

    t.shr64_lo = function (e, t, n) {
      return ((e << (32 - n)) | (t >>> n)) >>> 0;
    };
  },
  4910: function (e, t, n) {
    var r = n(7028);
    var i = n(6545);
    var a = n(3523);
    function o(e) {
      if (!(this instanceof o)) {
        return new o(e);
      }
      this.hash = e.hash;
      this.predResist = !!e.predResist;
      this.outLen = this.hash.outSize;
      this.minEntropy = e.minEntropy || this.hash.hmacStrength;
      this._reseed = null;
      this.reseedInterval = null;
      this.K = null;
      this.V = null;
      var t = i.toArray(e.entropy, e.entropyEnc || "hex");
      var n = i.toArray(e.nonce, e.nonceEnc || "hex");
      var r = i.toArray(e.pers, e.persEnc || "hex");

      a(
        t.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );

      this._init(t, n, r);
    }
    e.exports = o;

    o.prototype._init = function (e, t, n) {
      var r = e.concat(t).concat(n);
      this.K = Array(this.outLen / 8);
      this.V = Array(this.outLen / 8);
      for (var i = 0; i < this.V.length; i++) {
        this.K[i] = 0;
        this.V[i] = 1;
      }
      this._update(r);
      this._reseed = 1;
      this.reseedInterval = 281474976710656 /* 0x1000000000000 */;
    };

    o.prototype._hmac = function () {
      return new r.hmac(this.hash, this.K);
    };

    o.prototype._update = function (e) {
      var t = this._hmac().update(this.V).update([0]);

      if (e) {
        t = t.update(e);
      }

      this.K = t.digest();
      this.V = this._hmac().update(this.V).digest();

      if (e) {
        this.K = this._hmac().update(this.V).update([1]).update(e).digest();

        this.V = this._hmac().update(this.V).digest();
      }
    };

    o.prototype.reseed = function (e, t, n, r) {
      if (typeof t != "string") {
        r = n;
        n = t;
        t = null;
      }

      e = i.toArray(e, t);
      n = i.toArray(n, r);

      a(
        e.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );

      this._update(e.concat(n || []));
      this._reseed = 1;
    };

    o.prototype.generate = function (e, t, n, r) {
      if (this._reseed > this.reseedInterval) {
        throw Error("Reseed is required");
      }

      if (typeof t != "string") {
        r = n;
        n = t;
        t = null;
      }

      if (n) {
        n = i.toArray(n, r || "hex");
        this._update(n);
      }

      for (var a = []; a.length < e; ) {
        this.V = this._hmac().update(this.V).digest();
        a = a.concat(this.V);
      }
      var o = a.slice(0, e);
      this._update(n);
      this._reseed++;
      return i.encode(o, t);
    };
  },
  3782: function (e) {
    if (typeof Object.create == "function") {
      e.exports = function (e, t) {
        if (t) {
          e.super_ = t;

          e.prototype = Object.create(t.prototype, {
            constructor: {
              value: e,
              enumerable: false,
              writable: true,
              configurable: true,
            },
          });
        }
      };
    } else {
      e.exports = function (e, t) {
        if (t) {
          e.super_ = t;
          var n = function () {};
          n.prototype = t.prototype;
          e.prototype = new n();
          e.prototype.constructor = e;
        }
      };
    }
  },
  3533: function (e, t, n) {
    var r = n(3782);
    var i = n(9029);
    var a = n(6911).Buffer;
    var o = Array(16);
    function s() {
      i.call(this, 64);
      this._a = 1732584193 /* 0x67452301 */;
      this._b = 4023233417 /* 0xefcdab89 */;
      this._c = 2562383102 /* 0x98badcfe */;
      this._d = 271733878 /* 0x10325476 */;
    }
    function l(e, t) {
      return (e << t) | (e >>> (32 - t));
    }
    function c(e, t, n, r, i, a, o) {
      return (l((e + ((t & n) | (~t & r)) + i + a) | 0, o) + t) | 0;
    }
    function d(e, t, n, r, i, a, o) {
      return (l((e + ((t & r) | (n & ~r)) + i + a) | 0, o) + t) | 0;
    }
    function u(e, t, n, r, i, a, o) {
      return (l((e + (t ^ n ^ r) + i + a) | 0, o) + t) | 0;
    }
    function p(e, t, n, r, i, a, o) {
      return (l((e + (n ^ (t | ~r)) + i + a) | 0, o) + t) | 0;
    }
    r(s, i);

    s.prototype._update = function () {
      for (var e = 0; e < 16; ++e) {
        o[e] = this._block.readInt32LE(4 * e);
      }
      var t = this._a;
      var n = this._b;
      var r = this._c;
      var i = this._d;
      t = c(t, n, r, i, o[0], 3614090360 /* 0xd76aa478 */, 7);
      i = c(i, t, n, r, o[1], 3905402710 /* 0xe8c7b756 */, 12);
      r = c(r, i, t, n, o[2], 606105819 /* 0x242070db */, 17);
      n = c(n, r, i, t, o[3], 3250441966 /* 0xc1bdceee */, 22);
      t = c(t, n, r, i, o[4], 4118548399 /* 0xf57c0faf */, 7);
      i = c(i, t, n, r, o[5], 1200080426 /* 0x4787c62a */, 12);
      r = c(r, i, t, n, o[6], 2821735955 /* 0xa8304613 */, 17);
      n = c(n, r, i, t, o[7], 4249261313 /* 0xfd469501 */, 22);
      t = c(t, n, r, i, o[8], 1770035416 /* 0x698098d8 */, 7);
      i = c(i, t, n, r, o[9], 2336552879 /* 0x8b44f7af */, 12);
      r = c(r, i, t, n, o[10], 4294925233 /* 0xffff5bb1 */, 17);
      n = c(n, r, i, t, o[11], 2304563134 /* 0x895cd7be */, 22);
      t = c(t, n, r, i, o[12], 1804603682 /* 0x6b901122 */, 7);
      i = c(i, t, n, r, o[13], 4254626195 /* 0xfd987193 */, 12);
      r = c(r, i, t, n, o[14], 2792965006 /* 0xa679438e */, 17);
      n = c(n, r, i, t, o[15], 1236535329 /* 0x49b40821 */, 22);
      t = d(t, n, r, i, o[1], 4129170786 /* 0xf61e2562 */, 5);
      i = d(i, t, n, r, o[6], 3225465664 /* 0xc040b340 */, 9);
      r = d(r, i, t, n, o[11], 643717713 /* 0x265e5a51 */, 14);
      n = d(n, r, i, t, o[0], 3921069994 /* 0xe9b6c7aa */, 20);
      t = d(t, n, r, i, o[5], 3593408605 /* 0xd62f105d */, 5);
      i = d(i, t, n, r, o[10], 38016083 /* 0x2441453 */, 9);
      r = d(r, i, t, n, o[15], 3634488961 /* 0xd8a1e681 */, 14);
      n = d(n, r, i, t, o[4], 3889429448 /* 0xe7d3fbc8 */, 20);
      t = d(t, n, r, i, o[9], 568446438 /* 0x21e1cde6 */, 5);
      i = d(i, t, n, r, o[14], 3275163606 /* 0xc33707d6 */, 9);
      r = d(r, i, t, n, o[3], 4107603335 /* 0xf4d50d87 */, 14);
      n = d(n, r, i, t, o[8], 1163531501 /* 0x455a14ed */, 20);
      t = d(t, n, r, i, o[13], 2850285829 /* 0xa9e3e905 */, 5);
      i = d(i, t, n, r, o[2], 4243563512 /* 0xfcefa3f8 */, 9);
      r = d(r, i, t, n, o[7], 1735328473 /* 0x676f02d9 */, 14);
      n = d(n, r, i, t, o[12], 2368359562 /* 0x8d2a4c8a */, 20);
      t = u(t, n, r, i, o[5], 4294588738 /* 0xfffa3942 */, 4);
      i = u(i, t, n, r, o[8], 2272392833 /* 0x8771f681 */, 11);
      r = u(r, i, t, n, o[11], 1839030562 /* 0x6d9d6122 */, 16);
      n = u(n, r, i, t, o[14], 4259657740 /* 0xfde5380c */, 23);
      t = u(t, n, r, i, o[1], 2763975236 /* 0xa4beea44 */, 4);
      i = u(i, t, n, r, o[4], 1272893353 /* 0x4bdecfa9 */, 11);
      r = u(r, i, t, n, o[7], 4139469664 /* 0xf6bb4b60 */, 16);
      n = u(n, r, i, t, o[10], 3200236656 /* 0xbebfbc70 */, 23);
      t = u(t, n, r, i, o[13], 681279174 /* 0x289b7ec6 */, 4);
      i = u(i, t, n, r, o[0], 3936430074 /* 0xeaa127fa */, 11);
      r = u(r, i, t, n, o[3], 3572445317 /* 0xd4ef3085 */, 16);
      n = u(n, r, i, t, o[6], 76029189 /* 0x4881d05 */, 23);
      t = u(t, n, r, i, o[9], 3654602809 /* 0xd9d4d039 */, 4);
      i = u(i, t, n, r, o[12], 3873151461 /* 0xe6db99e5 */, 11);
      r = u(r, i, t, n, o[15], 530742520 /* 0x1fa27cf8 */, 16);
      n = u(n, r, i, t, o[2], 3299628645 /* 0xc4ac5665 */, 23);
      t = p(t, n, r, i, o[0], 4096336452 /* 0xf4292244 */, 6);
      i = p(i, t, n, r, o[7], 1126891415 /* 0x432aff97 */, 10);
      r = p(r, i, t, n, o[14], 2878612391 /* 0xab9423a7 */, 15);
      n = p(n, r, i, t, o[5], 4237533241 /* 0xfc93a039 */, 21);
      t = p(t, n, r, i, o[12], 1700485571 /* 0x655b59c3 */, 6);
      i = p(i, t, n, r, o[3], 2399980690 /* 0x8f0ccc92 */, 10);
      r = p(r, i, t, n, o[10], 4293915773 /* 0xffeff47d */, 15);
      n = p(n, r, i, t, o[1], 2240044497 /* 0x85845dd1 */, 21);
      t = p(t, n, r, i, o[8], 1873313359 /* 0x6fa87e4f */, 6);
      i = p(i, t, n, r, o[15], 4264355552 /* 0xfe2ce6e0 */, 10);
      r = p(r, i, t, n, o[6], 2734768916 /* 0xa3014314 */, 15);
      n = p(n, r, i, t, o[13], 1309151649 /* 0x4e0811a1 */, 21);
      t = p(t, n, r, i, o[4], 4149444226 /* 0xf7537e82 */, 6);
      i = p(i, t, n, r, o[11], 3174756917 /* 0xbd3af235 */, 10);
      r = p(r, i, t, n, o[2], 718787259 /* 0x2ad7d2bb */, 15);
      n = p(n, r, i, t, o[9], 3951481745 /* 0xeb86d391 */, 21);
      this._a = (this._a + t) | 0;
      this._b = (this._b + n) | 0;
      this._c = (this._c + r) | 0;
      this._d = (this._d + i) | 0;
    };

    s.prototype._digest = function () {
      this._block[this._blockOffset++] = 128;

      if (this._blockOffset > 56) {
        this._block.fill(0, this._blockOffset, 64);
        this._update();
        this._blockOffset = 0;
      }

      this._block.fill(0, this._blockOffset, 56);
      this._block.writeUInt32LE(this._length[0], 56);
      this._block.writeUInt32LE(this._length[1], 60);
      this._update();
      var e = a.allocUnsafe(16);
      e.writeInt32LE(this._a, 0);
      e.writeInt32LE(this._b, 4);
      e.writeInt32LE(this._c, 8);
      e.writeInt32LE(this._d, 12);
      return e;
    };

    e.exports = s;
  },
  1354: function (e, t, n) {
    var r = n(711);
    var i = n(3500);
    function a(e) {
      this.rand = e || new i.Rand();
    }
    e.exports = a;

    a.create = function (e) {
      return new a(e);
    };

    a.prototype._randbelow = function (e) {
      var t = Math.ceil(e.bitLength() / 8);
      do var n = new r(this.rand.generate(t));
      while (n.cmp(e) >= 0);
      return n;
    };

    a.prototype._randrange = function (e, t) {
      var n = t.sub(e);
      return e.add(this._randbelow(n));
    };

    a.prototype.test = function (e, t, n) {
      var i = e.bitLength();
      var a = r.mont(e);
      var o = new r(1).toRed(a);

      if (!t) {
        t = Math.max(1, (i / 48) | 0);
      }

      for (var s = e.subn(1), l = 0; !s.testn(l); l++) {}
      for (var c = e.shrn(l), d = s.toRed(a); t > 0; t--) {
        var u = this._randrange(new r(2), s);

        if (n) {
          n(u);
        }

        var p = u.toRed(a).redPow(c);
        if (p.cmp(o) !== 0 && p.cmp(d) !== 0) {
          for (var _ = 1; _ < l; _++) {
            if ((p = p.redSqr()).cmp(o) === 0) {
              return false;
            }
            if (p.cmp(d) === 0) {
              break;
            }
          }
          if (_ === l) {
            return false;
          }
        }
      }
      return true;
    };

    a.prototype.getDivisor = function (e, t) {
      var n = e.bitLength();
      var i = r.mont(e);
      var a = new r(1).toRed(i);

      if (!t) {
        t = Math.max(1, (n / 48) | 0);
      }

      for (var o = e.subn(1), s = 0; !o.testn(s); s++) {}
      for (var l = e.shrn(s), c = o.toRed(i); t > 0; t--) {
        var d = this._randrange(new r(2), o);
        var u = e.gcd(d);
        if (u.cmpn(1) !== 0) {
          return u;
        }
        var p = d.toRed(i).redPow(l);
        if (p.cmp(a) !== 0 && p.cmp(c) !== 0) {
          for (var _ = 1; _ < s; _++) {
            if ((p = p.redSqr()).cmp(a) === 0) {
              return p.fromRed().subn(1).gcd(e);
            }
            if (p.cmp(c) === 0) {
              break;
            }
          }
          if (_ === s) {
            return (p = p.redSqr()).fromRed().subn(1).gcd(e);
          }
        }
      }
      return false;
    };
  },
  3523: function (e) {
    function t(e, t) {
      if (!e) {
        throw Error(t || "Assertion failed");
      }
    }
    e.exports = t;

    t.equal = function (e, t, n) {
      if (e != t) {
        throw Error(n || "Assertion failed: " + e + " != " + t);
      }
    };
  },
  6545: function (e, t) {
    function n(e) {
      return e.length === 1 ? "0" + e : e;
    }
    function r(e) {
      for (var t = "", r = 0; r < e.length; r++) {
        t += n(e[r].toString(16));
      }
      return t;
    }

    t.toArray = function (e, t) {
      if (Array.isArray(e)) {
        return e.slice();
      }
      if (!e) {
        return [];
      }
      var n = [];
      if (typeof e != "string") {
        for (var r = 0; r < e.length; r++) {
          n[r] = 0 | e[r];
        }
        return n;
      }
      if (t === "hex") {
        if ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0) {
          e = "0" + e;
        }

        for (var r = 0; r < e.length; r += 2) {
          n.push(parseInt(e[r] + e[r + 1], 16));
        }
      } else {
        for (var r = 0; r < e.length; r++) {
          var i = e.charCodeAt(r);
          var a = i >> 8;
          var o = 255 & i;

          if (a) {
            n.push(a, o);
          } else {
            n.push(o);
          }
        }
      }
      return n;
    };

    t.zero2 = n;
    t.toHex = r;

    t.encode = function (e, t) {
      return t === "hex" ? r(e) : e;
    };
  },
  8687: function (e, t, n) {
    var r = n(7160);
    t.certificate = n(8782);

    t.RSAPrivateKey = r.define("RSAPrivateKey", function () {
      this.seq().obj(
        this.key("version").int(),
        this.key("modulus").int(),
        this.key("publicExponent").int(),
        this.key("privateExponent").int(),
        this.key("prime1").int(),
        this.key("prime2").int(),
        this.key("exponent1").int(),
        this.key("exponent2").int(),
        this.key("coefficient").int()
      );
    });

    t.RSAPublicKey = r.define("RSAPublicKey", function () {
      this.seq().obj(
        this.key("modulus").int(),
        this.key("publicExponent").int()
      );
    });

    t.PublicKey = r.define("SubjectPublicKeyInfo", function () {
      this.seq().obj(
        this.key("algorithm").use(i),
        this.key("subjectPublicKey").bitstr()
      );
    });

    var i = r.define("AlgorithmIdentifier", function () {
      this.seq().obj(
        this.key("algorithm").objid(),
        this.key("none").null_().optional(),
        this.key("curve").objid().optional(),
        this.key("params")
          .seq()
          .obj(this.key("p").int(), this.key("q").int(), this.key("g").int())
          .optional()
      );
    });

    t.PrivateKey = r.define("PrivateKeyInfo", function () {
      this.seq().obj(
        this.key("version").int(),
        this.key("algorithm").use(i),
        this.key("subjectPrivateKey").octstr()
      );
    });

    t.EncryptedPrivateKey = r.define("EncryptedPrivateKeyInfo", function () {
      this.seq().obj(
        this.key("algorithm")
          .seq()
          .obj(
            this.key("id").objid(),
            this.key("decrypt")
              .seq()
              .obj(
                this.key("kde")
                  .seq()
                  .obj(
                    this.key("id").objid(),
                    this.key("kdeparams")
                      .seq()
                      .obj(this.key("salt").octstr(), this.key("iters").int())
                  ),
                this.key("cipher")
                  .seq()
                  .obj(this.key("algo").objid(), this.key("iv").octstr())
              )
          ),
        this.key("subjectPrivateKey").octstr()
      );
    });

    t.DSAPrivateKey = r.define("DSAPrivateKey", function () {
      this.seq().obj(
        this.key("version").int(),
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int(),
        this.key("pub_key").int(),
        this.key("priv_key").int()
      );
    });

    t.DSAparam = r.define("DSAparam", function () {
      this.int();
    });

    t.ECPrivateKey = r.define("ECPrivateKey", function () {
      this.seq().obj(
        this.key("version").int(),
        this.key("privateKey").octstr(),
        this.key("parameters").optional().explicit(0).use(a),
        this.key("publicKey").optional().explicit(1).bitstr()
      );
    });

    var a = r.define("ECParameters", function () {
      this.choice({ namedCurve: this.objid() });
    });
    t.signature = r.define("signature", function () {
      this.seq().obj(this.key("r").int(), this.key("s").int());
    });
  },
  8782: function (e, t, n) {
    var r = n(7160);

    var i = r.define("Time", function () {
      this.choice({
        utcTime: this.utctime(),
        generalTime: this.gentime(),
      });
    });

    var a = r.define("AttributeTypeValue", function () {
      this.seq().obj(this.key("type").objid(), this.key("value").any());
    });

    var o = r.define("AlgorithmIdentifier", function () {
      this.seq().obj(
        this.key("algorithm").objid(),
        this.key("parameters").optional(),
        this.key("curve").objid().optional()
      );
    });

    var s = r.define("SubjectPublicKeyInfo", function () {
      this.seq().obj(
        this.key("algorithm").use(o),
        this.key("subjectPublicKey").bitstr()
      );
    });

    var l = r.define("RelativeDistinguishedName", function () {
      this.setof(a);
    });

    var c = r.define("RDNSequence", function () {
      this.seqof(l);
    });

    var d = r.define("Name", function () {
      this.choice({ rdnSequence: this.use(c) });
    });

    var u = r.define("Validity", function () {
      this.seq().obj(this.key("notBefore").use(i), this.key("notAfter").use(i));
    });

    var p = r.define("Extension", function () {
      this.seq().obj(
        this.key("extnID").objid(),
        this.key("critical").bool().def(false),
        this.key("extnValue").octstr()
      );
    });

    var _ = r.define("TBSCertificate", function () {
      this.seq().obj(
        this.key("version").explicit(0).int().optional(),
        this.key("serialNumber").int(),
        this.key("signature").use(o),
        this.key("issuer").use(d),
        this.key("validity").use(u),
        this.key("subject").use(d),
        this.key("subjectPublicKeyInfo").use(s),
        this.key("issuerUniqueID").implicit(1).bitstr().optional(),
        this.key("subjectUniqueID").implicit(2).bitstr().optional(),
        this.key("extensions").explicit(3).seqof(p).optional()
      );
    });

    e.exports = r.define("X509Certificate", function () {
      this.seq().obj(
        this.key("tbsCertificate").use(_),
        this.key("signatureAlgorithm").use(o),
        this.key("signatureValue").bitstr()
      );
    });
  },
  6501: function (e, t, n) {
    var r =
      /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m;

    var i = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m;

    var a =
      /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m;

    var o = n(8368);
    var s = n(6594);
    var l = n(6911).Buffer;
    e.exports = function (e, t) {
      var n;
      var c = e.toString();
      var d = c.match(r);
      if (d) {
        var u = "aes" + d[1];
        var p = l.from(d[2], "hex");
        var _ = l.from(d[3].replace(/[\r\n]/g, ""), "base64");
        var f = o(t, p.slice(0, 8), parseInt(d[1], 10)).key;
        var m = [];
        var h = s.createDecipheriv(u, f, p);
        m.push(h.update(_));
        m.push(h.final());
        n = l.concat(m);
      } else {
        n = new l(c.match(a)[2].replace(/[\r\n]/g, ""), "base64");
      }
      return { tag: c.match(i)[1], data: n };
    };
  },
  9902: function (e, t, n) {
    var r = n(8687);
    var i = n(2510);
    var a = n(6501);
    var o = n(6594);
    var s = n(4978);
    var l = n(6911).Buffer;
    function c(e) {
      if (typeof e == "object" && !l.isBuffer(e)) {
        y = e.passphrase;
        e = e.key;
      }

      if (typeof e == "string") {
        e = l.from(e);
      }

      var t;
      var n;
      var c;
      var d;
      var u;
      var p;
      var _;
      var f;
      var m;
      var h;
      var g;
      var y;
      var b;
      var x;
      var S = a(e, y);

      var { tag, data } = S;

      switch (tag) {
        case "CERTIFICATE": {
          x = r.certificate.decode(data, "der").tbsCertificate
            .subjectPublicKeyInfo;
        }
        case "PUBLIC KEY": {
          if (!x) {
            x = r.PublicKey.decode(data, "der");
          }

          switch ((b = x.algorithm.algorithm.join("."))) {
            case "1.2.840.113549.1.1.1": {
              return r.RSAPublicKey.decode(x.subjectPublicKey.data, "der");
            }
            case "1.2.840.10045.2.1": {
              x.subjectPrivateKey = x.subjectPublicKey;
              return { type: "ec", data: x };
            }
            case "1.2.840.10040.4.1": {
              x.algorithm.params.pub_key = r.DSAparam.decode(
                x.subjectPublicKey.data,
                "der"
              );

              return { type: "dsa", data: x.algorithm.params };
            }
            default: {
              throw Error("unknown key id " + b);
            }
          }
        }
        case "ENCRYPTED PRIVATE KEY": {
          t = data = r.EncryptedPrivateKey.decode(data, "der");
          n = y;
          c = t.algorithm.decrypt.kde.kdeparams.salt;

          d = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10);

          u = i[t.algorithm.decrypt.cipher.algo.join(".")];
          p = t.algorithm.decrypt.cipher.iv;
          _ = t.subjectPrivateKey;
          f = parseInt(u.split("-")[1], 10) / 8;
          m = s.pbkdf2Sync(n, c, d, f, "sha1");
          h = o.createDecipheriv(u, m, p);
          (g = []).push(h.update(_));
          g.push(h.final());
          data = l.concat(g);
        }
        case "PRIVATE KEY": {
          switch (
            (b = (x = r.PrivateKey.decode(
              data,
              "der"
            )).algorithm.algorithm.join("."))
          ) {
            case "1.2.840.113549.1.1.1": {
              return r.RSAPrivateKey.decode(x.subjectPrivateKey, "der");
            }
            case "1.2.840.10045.2.1": {
              return {
                curve: x.algorithm.curve,
                privateKey: r.ECPrivateKey.decode(x.subjectPrivateKey, "der")
                  .privateKey,
              };
            }
            case "1.2.840.10040.4.1": {
              x.algorithm.params.priv_key = r.DSAparam.decode(
                x.subjectPrivateKey,
                "der"
              );

              return { type: "dsa", params: x.algorithm.params };
            }
            default: {
              throw Error("unknown key id " + b);
            }
          }
        }
        case "RSA PUBLIC KEY": {
          return r.RSAPublicKey.decode(data, "der");
        }
        case "RSA PRIVATE KEY": {
          return r.RSAPrivateKey.decode(data, "der");
        }
        case "DSA PRIVATE KEY": {
          return {
            type: "dsa",
            params: r.DSAPrivateKey.decode(data, "der"),
          };
        }
        case "EC PRIVATE KEY": {
          return {
            curve: (data = r.ECPrivateKey.decode(data, "der")).parameters.value,
            privateKey: data.privateKey,
          };
        }
        default: {
          throw Error("unknown key type " + tag);
        }
      }
    }
    e.exports = c;
    c.signature = r.signature;
  },
  4978: function (e, t, n) {
    var r = n(6113);
    var i = n(5349);
    var a = n(7007);
    var o = n(5407);

    if (
      r.pbkdf2Sync &&
      -1 !== r.pbkdf2Sync.toString().indexOf("keylen, digest")
    ) {
      t.pbkdf2Sync = function (e, t, n, s, l) {
        i(n, s);
        e = o(e, a, "Password");
        t = o(t, a, "Salt");
        l = l || "sha1";
        return r.pbkdf2Sync(e, t, n, s, l);
      };

      t.pbkdf2 = function (e, t, n, s, l, c) {
        i(n, s);
        e = o(e, a, "Password");
        t = o(t, a, "Salt");

        if (typeof l == "function") {
          c = l;
          l = "sha1";
        }

        if (typeof c != "function") {
          throw Error("No callback provided to pbkdf2");
        }

        return r.pbkdf2(e, t, n, s, l, c);
      };
    } else {
      t.pbkdf2Sync = n(2127);
      t.pbkdf2 = n(9601);
    }
  },
  9601: function (t, n, r) {
    var a;
    var o = r(6911).Buffer;
    var s = r(5349);
    var l = r(7007);
    var c = r(2127);
    var d = r(5407);
    var u = module.g.crypto && module.g.crypto.subtle;

    var p = {
      sha: "SHA-1",
      "sha-1": "SHA-1",
      sha1: "SHA-1",
      sha256: "SHA-256",
      "sha-256": "SHA-256",
      sha384: "SHA-384",
      "sha-384": "SHA-384",
      "sha-512": "SHA-512",
      sha512: "SHA-512",
    };

    var _ = [];
    function f(e, t, n, r, i) {
      return u
        .importKey("raw", e, { name: "PBKDF2" }, false, ["deriveBits"])
        .then(function (e) {
          return u.deriveBits(
            { name: "PBKDF2", salt: t, iterations: n, hash: { name: i } },
            e,
            r << 3
          );
        })
        .then(function (e) {
          return o.from(e);
        });
    }
    t.exports = function (t, n, r, m, h, g) {
      if (typeof h == "function") {
        g = h;
        h = undefined;
      }

      var y;
      var b;
      var x = p[(h = h || "sha1").toLowerCase()];
      if (!x || typeof module.g.Promise != "function") {
        return i.default.nextTick(function () {
          var e;
          try {
            e = c(t, n, r, m, h);
          } catch (e) {
            return g(e);
          }
          g(null, e);
        });
      }
      s(r, m);
      t = d(t, l, "Password");
      n = d(n, l, "Salt");

      if (typeof g != "function") {
        throw Error("No callback provided to pbkdf2");
      }

      y = (function (t) {
        if (
          (module.g.process && !module.g.process.browser) ||
          !u ||
          !u.importKey ||
          !u.deriveBits
        ) {
          return Promise.resolve(false);
        }
        if (_[t] !== undefined) {
          return _[t];
        }
        var n = f((a = a || o.alloc(8)), a, 10, 128, t)
          .then(function () {
            return true;
          })
          .catch(function () {
            return false;
          });
        _[t] = n;
        return n;
      })(x).then(function (e) {
        return e ? f(t, n, r, m, x) : c(t, n, r, m, h);
      });

      b = g;

      y.then(
        function (e) {
          i.default.nextTick(function () {
            b(null, e);
          });
        },
        function (e) {
          i.default.nextTick(function () {
            b(e);
          });
        }
      );
    };
  },
  7007: function (e) {
    e.exports = "utf-8";
  },
  5349: function (e) {
    e.exports = function (e, t) {
      if (typeof e != "number") {
        throw TypeError("Iterations not a number");
      }
      if (e < 0) {
        throw TypeError("Bad iterations");
      }
      if (typeof t != "number") {
        throw TypeError("Key length not a number");
      }
      if (t < 0 || t > 1073741823 /* 0x3fffffff */ || t != t) {
        throw TypeError("Bad key length");
      }
    };
  },
  2127: function (e, t, n) {
    var r = {
      md5: 16,
      sha1: 20,
      sha224: 28,
      sha256: 32,
      sha384: 48,
      sha512: 64,
      rmd160: 20,
      ripemd160: 20,
    };

    var i = n(4873);
    var a = n(6911).Buffer;
    var o = n(5349);
    var s = n(7007);
    var l = n(5407);
    e.exports = function (e, t, n, c, d) {
      o(n, c);
      e = l(e, s, "Password");
      t = l(t, s, "Salt");
      d = d || "sha1";
      var u = a.allocUnsafe(c);
      var p = a.allocUnsafe(t.length + 4);
      t.copy(p, 0, 0, t.length);
      for (var _ = 0, f = r[d], m = Math.ceil(c / f), h = 1; h <= m; h++) {
        p.writeUInt32BE(h, t.length);
        for (var g = i(d, e).update(p).digest(), y = g, b = 1; b < n; b++) {
          y = i(d, e).update(y).digest();
          for (var x = 0; x < f; x++) {
            g[x] ^= y[x];
          }
        }
        g.copy(u, _);
        _ += f;
      }
      return u;
    };
  },
  5407: function (e, t, n) {
    var r = n(6911).Buffer;
    e.exports = function (e, t, n) {
      if (r.isBuffer(e)) {
        return e;
      }
      if (typeof e == "string") {
        return r.from(e, t);
      }
      if (ArrayBuffer.isView(e)) {
        return r.from(e.buffer);
      }
      throw TypeError(
        n + " must be a string, a Buffer, a typed array or a DataView"
      );
    };
  },
  9783: function (e, t, n) {
    t.publicEncrypt = n(3995);
    t.privateDecrypt = n(4366);

    t.privateEncrypt = function (e, n) {
      return t.publicEncrypt(e, n, true);
    };

    t.publicDecrypt = function (e, n) {
      return t.privateDecrypt(e, n, true);
    };
  },
  5520: function (e, t, n) {
    var r = n(9739);
    var i = n(6911).Buffer;
    e.exports = function (e, t) {
      for (var n, a = i.alloc(0), o = 0; a.length < t; ) {
        n = (function (e) {
          var t = i.allocUnsafe(4);
          t.writeUInt32BE(e, 0);
          return t;
        })(o++);

        a = i.concat([a, r("sha1").update(e).update(n).digest()]);
      }
      return a.slice(0, t);
    };
  },
  4366: function (e, t, n) {
    var r = n(9902);
    var i = n(5520);
    var a = n(6386);
    var o = n(711);
    var s = n(7166);
    var l = n(9739);
    var c = n(1607);
    var d = n(6911).Buffer;
    e.exports = function (e, t, n) {
      var u;
      var p = e.padding ? e.padding : n ? 1 : 4;
      var _ = r(e);
      var f = _.modulus.byteLength();
      if (t.length > f || new o(t).cmp(_.modulus) >= 0) {
        throw Error("decryption error");
      }
      u = n ? c(new o(t), _) : s(t, _);
      var m = d.alloc(f - u.length);
      u = d.concat([m, u], f);

      if (p === 4) {
        return (function (e, t) {
          var n = e.modulus.byteLength();
          var r = l("sha1").update(d.alloc(0)).digest();
          var r_length = r.length;
          if (t[0] !== 0) {
            throw Error("decryption error");
          }
          var s = t.slice(1, r_length + 1);
          var c = t.slice(r_length + 1);
          var u = a(s, i(c, r_length));
          var p = a(c, i(u, n - r_length - 1));
          if (
            (function (e, t) {
              e = d.from(e);
              t = d.from(t);
              var n = 0;
              var e_length = e.length;

              if (e.length !== t.length) {
                n++;
                e_length = Math.min(e.length, t.length);
              }

              for (var i = -1; ++i < e_length; ) {
                n += e[i] ^ t[i];
              }
              return n;
            })(r, p.slice(0, r_length))
          ) {
            throw Error("decryption error");
          }
          for (var _ = r_length; p[_] === 0; ) {
            _++;
          }
          if (p[_++] !== 1) {
            throw Error("decryption error");
          }
          return p.slice(_);
        })(_, u);
      }

      if (p === 1) {
        var g = n;
        var y = h.slice(0, 2);
        for (var h = u, b = 2, x = 0; h[b++] !== 0; ) {
          if (b >= h.length) {
            x++;
            break;
          }
        }
        var S = h.slice(2, b - 1);

        if (
          (y.toString("hex") !== "0002" && !g) ||
          (y.toString("hex") !== "0001" && g)
        ) {
          x++;
        }

        if (S.length < 8) {
          x++;
        }

        if (x) {
          throw Error("decryption error");
        }

        return h.slice(b);
      }
      if (p === 3) {
        return u;
      }
      throw Error("unknown padding");
    };
  },
  3995: function (e, t, n) {
    var r = n(9902);
    var i = n(7223);
    var a = n(9739);
    var o = n(5520);
    var s = n(6386);
    var l = n(711);
    var c = n(1607);
    var d = n(7166);
    var u = n(6911).Buffer;
    e.exports = function (e, t, n) {
      var p;
      var _ = e.padding ? e.padding : n ? 1 : 4;
      var f = r(e);
      if (_ === 4) {
        p = (function (e, t) {
          var n = e.modulus.byteLength();
          var t_length = t.length;
          var c = a("sha1").update(u.alloc(0)).digest();
          var c_length = c.length;
          var p = 2 * c_length;
          if (t_length > n - p - 2) {
            throw Error("message too long");
          }
          var _ = u.alloc(n - t_length - p - 2);
          var f = n - c_length - 1;
          var m = i(c_length);
          var h = s(u.concat([c, _, u.alloc(1, 1), t], f), o(m, f));
          var g = s(m, o(h, c_length));
          return new l(u.concat([u.alloc(1), g, h], n));
        })(f, t);
      } else if (_ === 1) {
        p = (function (e, t, n) {
          var r;
          var t_length = t.length;
          var o = e.modulus.byteLength();
          if (t_length > o - 11) {
            throw Error("message too long");
          }

          r = n
            ? u.alloc(o - t_length - 3, 255)
            : (function (e) {
                for (
                  var t, n = u.allocUnsafe(e), r = 0, a = i(2 * e), o = 0;
                  r < e;

                ) {
                  if (o === a.length) {
                    a = i(2 * e);
                    o = 0;
                  }

                  if ((t = a[o++])) {
                    n[r++] = t;
                  }
                }
                return n;
              })(o - t_length - 3);

          return new l(u.concat([u.from([0, n ? 1 : 2]), r, u.alloc(1), t], o));
        })(f, t, n);
      } else if (_ === 3) {
        if ((p = new l(t)).cmp(f.modulus) >= 0) {
          throw Error("data too long for modulus");
        }
      } else {
        throw Error("unknown padding");
      }
      return n ? d(p, f) : c(p, f);
    };
  },
  1607: function (e, t, n) {
    var r = n(711);
    var i = n(6911).Buffer;
    e.exports = function (e, t) {
      return i.from(
        e
          .toRed(r.mont(t.modulus))
          .redPow(new r(t.publicExponent))
          .fromRed()
          .toArray()
      );
    };
  },
  6386: function (e) {
    e.exports = function (e, t) {
      for (var n = e.length, r = -1; ++r < n; ) {
        e[r] ^= t[r];
      }
      return e;
    };
  },
  7223: function (t, n, r) {
    var a = r(6911).Buffer;
    var o = module.g.crypto || module.g.msCrypto;

    if (o && o.getRandomValues) {
      t.exports = function (e, t) {
        if (e > 4294967295 /* 0xffffffff */) {
          throw RangeError("requested too many random bytes");
        }
        var n = a.allocUnsafe(e);
        if (e > 0) {
          if (e > 65536) {
            for (var r = 0; r < e; r += 65536) {
              o.getRandomValues(n.slice(r, r + 65536));
            }
          } else {
            o.getRandomValues(n);
          }
        }
        return typeof t == "function"
          ? i.default.nextTick(function () {
              t(null, n);
            })
          : n;
      };
    } else {
      t.exports = function () {
        throw Error(
          "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11"
        );
      };
    }
  },
  6445: function (t, n, r) {
    function a() {
      throw Error(
        "secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11"
      );
    }
    var o = r(6911);
    r(7223);

    var { Buffer, kMaxLength } = o;

    var c = module.g.crypto || module.g.msCrypto;
    function d(e, t) {
      if (typeof e != "number" || e != e) {
        throw TypeError("offset must be a number");
      }
      if (e > 4294967295 /* 0xffffffff */ || e < 0) {
        throw TypeError("offset must be a uint32");
      }
      if (e > kMaxLength || e > t) {
        throw RangeError("offset out of range");
      }
    }
    function u(e, t, n) {
      if (typeof e != "number" || e != e) {
        throw TypeError("size must be a number");
      }
      if (e > 4294967295 /* 0xffffffff */ || e < 0) {
        throw TypeError("size must be a uint32");
      }
      if (e + t > n || e > kMaxLength) {
        throw RangeError("buffer too small");
      }
    }
    function p(e, t, n, r) {
      var a = new Uint8Array(e.buffer, t, n);
      return (c.getRandomValues(a), r)
        ? void i.default.nextTick(function () {
            r(null, e);
          })
        : e;
    }

    if (c && c.getRandomValues) {
      n.randomFill = function (t, n, r, i) {
        if (!Buffer.isBuffer(t) && !(t instanceof module.g.Uint8Array)) {
          throw TypeError('"buf" argument must be a Buffer or Uint8Array');
        }
        if (typeof n == "function") {
          i = n;
          n = 0;
          r = t.length;
        } else if (typeof r == "function") {
          i = r;
          r = t.length - n;
        } else if (typeof i != "function") {
          throw TypeError('"cb" argument must be a function');
        }
        d(n, t.length);
        u(r, n, t.length);
        return p(t, n, r, i);
      };

      n.randomFillSync = function (t, n = 0, r = t.length - n) {
        if (!Buffer.isBuffer(t) && !(t instanceof module.g.Uint8Array)) {
          throw TypeError('"buf" argument must be a Buffer or Uint8Array');
        }

        d(n, t.length);
        u(r, n, t.length);
        return p(t, n, r);
      };
    } else {
      n.randomFill = a;
      n.randomFillSync = a;
    }
  },
  4646: function (e) {
    let t = {};
    function n(e, n, r) {
      if (!r) {
        r = Error;
      }

      class i extends r {
        constructor(e, t, r) {
          super(typeof n == "string" ? n : n(e, t, r));
        }
      }
      i.prototype.name = r.name;
      i.prototype.code = e;
      t[e] = i;
    }
    function r(e, t) {
      if (!Array.isArray(e)) {
        return `of ${t} ${String(e)}`;
      }
      {
        let e_length = e.length;
        return ((e = e.map((e) => {
          return String(e);
        })),
        e_length > 2)
          ? `one of ${t} ${e.slice(0, e_length - 1).join(", ")}, or ` +
              e[e_length - 1]
          : e_length === 2
          ? `one of ${t} ${e[0]} or ${e[1]}`
          : `of ${t} ${e[0]}`;
      }
    }

    n(
      "ERR_INVALID_OPT_VALUE",
      function (e, t) {
        return 'The value "' + t + '" is invalid for option "' + e + '"';
      },
      TypeError
    );

    n(
      "ERR_INVALID_ARG_TYPE",
      function (e, t, n) {
        var i;
        var a;
        var o;
        var s;
        let l;
        let c;

        if (
          typeof t == "string" &&
          ((i = "not "), t.substr(0, i.length) === i)
        ) {
          l = "must not be";
          t = t.replace(/^not /, "");
        } else {
          l = "must be";
        }

        a = " argument";

        if (o === undefined || o > e.length) {
          o = e.length;
        }

        if (e.substring(o - a.length, o) === a) {
          c = `The ${e} ${l} ${r(t, "type")}`;
        } else {
          let n = (typeof s != "number" && (s = 0),
          s + 1 > e.length || -1 === e.indexOf(".", s))
            ? "argument"
            : "property";
          c = `The "${e}" ${n} ${l} ${r(t, "type")}`;
        }

        return c + `. Received type ${typeof n}`;
      },
      TypeError
    );

    n("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");

    n("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
      return "The " + e + " method is not implemented";
    });

    n("ERR_STREAM_PREMATURE_CLOSE", "Premature close");

    n("ERR_STREAM_DESTROYED", function (e) {
      return "Cannot call " + e + " after a stream was destroyed";
    });

    n("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    n("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    n("ERR_STREAM_WRITE_AFTER_END", "write after end");

    n(
      "ERR_STREAM_NULL_VALUES",
      "May not write null values to stream",
      TypeError
    );

    n(
      "ERR_UNKNOWN_ENCODING",
      function (e) {
        return "Unknown encoding: " + e;
      },
      TypeError
    );

    n("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");

    e.exports.q = t;
  },
  2403: function (e, t, n) {
    var r =
      Object.keys ||
      function (e) {
        var t = [];
        for (var n in e) {
          t.push(n);
        }
        return t;
      };
    e.exports = d;
    var a = n(1709);
    var o = n(7337);
    n(3782)(d, a);
    for (var s = r(o.prototype), l = 0; l < s.length; l++) {
      var s_l = s[l];

      if (!d.prototype[s_l]) {
        d.prototype[s_l] = o.prototype[s_l];
      }
    }
    function d(e) {
      if (!(this instanceof d)) {
        return new d(e);
      }
      a.call(this, e);
      o.call(this, e);
      this.allowHalfOpen = true;

      if (e) {
        e.readable === false && (this.readable = false);
        e.writable === false && (this.writable = false);

        e.allowHalfOpen === false &&
          ((this.allowHalfOpen = false), this.once("end", u));
      }
    }
    function u() {
      if (!this._writableState.ended) {
        i.default.nextTick(p, this);
      }
    }
    function p(e) {
      e.end();
    }

    Object.defineProperty(d.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: function () {
        return this._writableState.highWaterMark;
      },
    });

    Object.defineProperty(d.prototype, "writableBuffer", {
      enumerable: false,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });

    Object.defineProperty(d.prototype, "writableLength", {
      enumerable: false,
      get: function () {
        return this._writableState.length;
      },
    });

    Object.defineProperty(d.prototype, "destroyed", {
      enumerable: false,
      get: function () {
        return (
          this._readableState !== undefined &&
          this._writableState !== undefined &&
          this._readableState.destroyed &&
          this._writableState.destroyed
        );
      },
      set: function (e) {
        if (
          this._readableState !== undefined &&
          this._writableState !== undefined
        ) {
          this._readableState.destroyed = e;
          this._writableState.destroyed = e;
        }
      },
    });
  },
  7889: function (e, t, n) {
    e.exports = i;
    var r = n(1170);
    function i(e) {
      if (!(this instanceof i)) {
        return new i(e);
      }
      r.call(this, e);
    }
    n(3782)(i, r);

    i.prototype._transform = function (e, t, n) {
      n(null, e);
    };
  },
  1709: function (t, n, r) {
    t.exports = A;
    A.ReadableState = C;
    r(2361).EventEmitter;
    var a;
    var o;
    var s;
    var l;
    var c;

    var d = function (e, t) {
      return e.listeners(t).length;
    };

    var u = r(4678);
    var p = r(4300).Buffer;
    var _ = module.g.Uint8Array || function () {};
    var f = r(3837);
    o = f && f.debuglog ? f.debuglog("stream") : function () {};
    var m = r(4379);
    var h = r(7025);
    var g = r(6776).getHighWaterMark;
    var y = r(4646).q;

    var {
      ERR_INVALID_ARG_TYPE,
      ERR_STREAM_PUSH_AFTER_EOF,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    } = y;

    r(3782)(A, u);
    var h_errorOrDestroy = h.errorOrDestroy;
    var E = ["error", "close", "destroy", "pause", "resume"];
    function C(e, t, n) {
      a = a || r(2403);
      e = e || {};

      if (typeof n != "boolean") {
        n = t instanceof a;
      }

      this.objectMode = !!e.objectMode;

      if (n) {
        this.objectMode = this.objectMode || !!e.readableObjectMode;
      }

      this.highWaterMark = g(this, e, "readableHighWaterMark", n);
      this.buffer = new m();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = e.emitClose !== false;
      this.autoDestroy = !!e.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = e.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;

      if (e.encoding) {
        s || (s = r(3704).s);
        this.decoder = new s(e.encoding);
        this.encoding = e.encoding;
      }
    }
    function A(e) {
      a = a || r(2403);

      if (!(this instanceof A)) {
        return new A(e);
      }

      var t = this instanceof a;
      this._readableState = new C(e, this, t);
      this.readable = true;

      if (e) {
        typeof e.read == "function" && (this._read = e.read);
        typeof e.destroy == "function" && (this._destroy = e.destroy);
      }

      u.call(this);
    }
    function w(e, t, n, r, i) {
      o("readableAddChunk", t);
      var s;
      var e_readableState = e._readableState;
      if (t === null) {
        e_readableState.reading = false;

        (function (e, t) {
          o("onEofChunk");

          if (!t.ended) {
            if (t.decoder) {
              var n = t.decoder.end();

              if (n && n.length) {
                t.buffer.push(n);
                t.length += t.objectMode ? 1 : n.length;
              }
            }
            t.ended = true;

            if (t.sync) {
              I(e);
            } else {
              t.needReadable = false;
              t.emittedReadable || ((t.emittedReadable = true), P(e));
            }
          }
        })(e, e_readableState);
      } else {
        if (!i) {
          s = (function (e, t) {
            var n;

            if (
              !p.isBuffer(t) &&
              t instanceof _ &&
              typeof t != "string" &&
              t !== undefined &&
              !e.objectMode
            ) {
              n = new ERR_INVALID_ARG_TYPE(
                "chunk",
                ["string", "Buffer", "Uint8Array"],
                t
              );
            }

            return n;
          })(e_readableState, t);
        }

        if (s) {
          h_errorOrDestroy(e, s);
        } else if (e_readableState.objectMode || (t && t.length > 0)) {
          if (
            typeof t != "string" &&
            !e_readableState.objectMode &&
            Object.getPrototypeOf(t) !== p.prototype
          ) {
            a = t;
            t = p.from(a);
          }

          if (r) {
            if (e_readableState.endEmitted) {
              h_errorOrDestroy(e, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            } else {
              D(e, e_readableState, t, true);
            }
          } else if (e_readableState.ended) {
            h_errorOrDestroy(e, new ERR_STREAM_PUSH_AFTER_EOF());
          } else {
            if (e_readableState.destroyed) {
              return false;
            }
            e_readableState.reading = false;

            if (e_readableState.decoder && !n) {
              t = e_readableState.decoder.write(t);
              e_readableState.objectMode || t.length !== 0
                ? D(e, e_readableState, t, false)
                : M(e, e_readableState);
            } else {
              D(e, e_readableState, t, false);
            }
          }
        } else {
          if (!r) {
            e_readableState.reading = false;
            M(e, e_readableState);
          }
        }
      }
      return (
        !e_readableState.ended &&
        (e_readableState.length < e_readableState.highWaterMark ||
          e_readableState.length === 0)
      );
    }
    function D(e, t, n, r) {
      if (t.flowing && t.length === 0 && !t.sync) {
        t.awaitDrain = 0;
        e.emit("data", n);
      } else {
        t.length += t.objectMode ? 1 : n.length;
        r ? t.buffer.unshift(n) : t.buffer.push(n);
        t.needReadable && I(e);
      }

      M(e, t);
    }
    function N(e, t) {
      var n;
      if (e <= 0 || (t.length === 0 && t.ended)) {
        return 0;
      }
      if (t.objectMode) {
        return 1;
      }
      if (e != e) {
        if (t.flowing && t.length) {
          return t.buffer.head.data.length;
        } else {
          return t.length;
        }
      }
      return (e > t.highWaterMark &&
        ((n = e) >= 1073741824 /* 0x40000000 */
          ? (n = 1073741824) /* 0x40000000 */
          : (n--,
            (n |= n >>> 1),
            (n |= n >>> 2),
            (n |= n >>> 4),
            (n |= n >>> 8),
            (n |= n >>> 16),
            n++),
        (t.highWaterMark = n)),
      e <= t.length)
        ? e
        : t.ended
        ? t.length
        : ((t.needReadable = true), 0);
    }
    function I(e) {
      var e_readableState = e._readableState;
      o(
        "emitReadable",
        e_readableState.needReadable,
        e_readableState.emittedReadable
      );
      e_readableState.needReadable = false;

      if (!e_readableState.emittedReadable) {
        o("emitReadable", e_readableState.flowing);
        e_readableState.emittedReadable = true;
        i.default.nextTick(P, e);
      }
    }
    function P(e) {
      var e_readableState = e._readableState;
      o(
        "emitReadable_",
        e_readableState.destroyed,
        e_readableState.length,
        e_readableState.ended
      );

      if (
        !e_readableState.destroyed &&
        (e_readableState.length || e_readableState.ended)
      ) {
        e.emit("readable");
        e_readableState.emittedReadable = false;
      }

      e_readableState.needReadable =
        !e_readableState.flowing &&
        !e_readableState.ended &&
        e_readableState.length <= e_readableState.highWaterMark;
      B(e);
    }
    function M(e, t) {
      if (!t.readingMore) {
        t.readingMore = true;
        i.default.nextTick(L, e, t);
      }
    }
    function L(e, t) {
      while (
        !t.reading &&
        !t.ended &&
        (t.length < t.highWaterMark || (t.flowing && t.length === 0))
      ) {
        var t_length = t.length;
        o("maybeReadMore read 0");
        e.read(0);

        if (t_length === t.length) {
          break;
        }
      }

      t.readingMore = false;
    }
    function R(e) {
      var e_readableState = e._readableState;
      e_readableState.readableListening = e.listenerCount("readable") > 0;

      if (e_readableState.resumeScheduled && !e_readableState.paused) {
        e_readableState.flowing = true;
      } else if (e.listenerCount("data") > 0) {
        e.resume();
      }
    }
    function F(e) {
      o("readable nexttick read 0");
      e.read(0);
    }
    function O(e, t) {
      o("resume", t.reading);

      if (!t.reading) {
        e.read(0);
      }

      t.resumeScheduled = false;
      e.emit("resume");
      B(e);

      if (t.flowing && !t.reading) {
        e.read(0);
      }
    }
    function B(e) {
      var e_readableState = e._readableState;
      for (
        o("flow", e_readableState.flowing);
        e_readableState.flowing && e.read() !== null;

      ) {}
    }
    function W(e, t) {
      return t.length === 0
        ? null
        : (t.objectMode
            ? (n = t.buffer.shift())
            : !e || e >= t.length
            ? ((n = t.decoder
                ? t.buffer.join("")
                : t.buffer.length === 1
                ? t.buffer.first()
                : t.buffer.concat(t.length)),
              t.buffer.clear())
            : (n = t.buffer.consume(e, t.decoder)),
          n);
    }
    function j(e) {
      var e_readableState = e._readableState;
      o("endReadable", e_readableState.endEmitted);

      if (!e_readableState.endEmitted) {
        e_readableState.ended = true;
        i.default.nextTick(z, e_readableState, e);
      }
    }
    function z(e, t) {
      o("endReadableNT", e.endEmitted, e.length);

      if (
        !e.endEmitted &&
        e.length === 0 &&
        ((e.endEmitted = true),
        (t.readable = false),
        t.emit("end"),
        e.autoDestroy)
      ) {
        var t_writableState = t._writableState;

        if (
          !t_writableState ||
          (t_writableState.autoDestroy && t_writableState.finished)
        ) {
          t.destroy();
        }
      }
    }
    function V(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) {
          return n;
        }
      }
      return -1;
    }

    Object.defineProperty(A.prototype, "destroyed", {
      enumerable: false,
      get: function () {
        return (
          this._readableState !== undefined && this._readableState.destroyed
        );
      },
      set: function (e) {
        if (this._readableState) {
          this._readableState.destroyed = e;
        }
      },
    });

    A.prototype.destroy = h.destroy;
    A.prototype._undestroy = h.undestroy;

    A.prototype._destroy = function (e, t) {
      t(e);
    };

    A.prototype.push = function (e, t) {
      var n;
      var r = this._readableState;

      if (r.objectMode) {
        n = true;
      } else if (typeof e == "string") {
        (t = t || r.defaultEncoding) !== r.encoding &&
          ((e = p.from(e, t)), (t = ""));

        n = true;
      }

      return w(this, e, t, false, n);
    };

    A.prototype.unshift = function (e) {
      return w(this, e, null, true, false);
    };

    A.prototype.isPaused = function () {
      return this._readableState.flowing === false;
    };

    A.prototype.setEncoding = function (e) {
      if (!s) {
        s = r(3704).s;
      }

      var t = new s(e);
      this._readableState.decoder = t;
      this._readableState.encoding = this._readableState.decoder.encoding;
      for (var n = this._readableState.buffer.head, i = ""; n !== null; ) {
        i += t.write(n.data);
        n = n.next;
      }
      this._readableState.buffer.clear();

      if (i !== "") {
        this._readableState.buffer.push(i);
      }

      this._readableState.length = i.length;
      return this;
    };

    A.prototype.read = function (e) {
      o("read", e);
      e = parseInt(e, 10);
      var t;
      var n = this._readableState;
      var r = e;

      if (e !== 0) {
        n.emittedReadable = false;
      }

      if (
        e === 0 &&
        n.needReadable &&
        ((n.highWaterMark !== 0 ? n.length >= n.highWaterMark : n.length > 0) ||
          n.ended)
      ) {
        o("read: emitReadable", n.length, n.ended);

        if (n.length === 0 && n.ended) {
          j(this);
        } else {
          I(this);
        }

        return null;
      }

      if (0 === (e = N(e, n)) && n.ended) {
        if (n.length === 0) {
          j(this);
        }

        return null;
      }
      var n_needReadable = n.needReadable;
      o("need readable", n_needReadable);

      if (n.length === 0 || n.length - e < n.highWaterMark) {
        o("length less than watermark", (n_needReadable = true));
      }

      if (n.ended || n.reading) {
        o("reading or ended", (n_needReadable = false));
      } else if (n_needReadable) {
        o("do read");
        n.reading = true;
        n.sync = true;
        n.length === 0 && (n.needReadable = true);
        this._read(n.highWaterMark);
        n.sync = false;
        n.reading || (e = N(r, n));
      }

      if (null === (t = e > 0 ? W(e, n) : null)) {
        n.needReadable = n.length <= n.highWaterMark;
        e = 0;
      } else {
        n.length -= e;
        n.awaitDrain = 0;
      }

      if (n.length === 0) {
        n.ended || (n.needReadable = true);
        r !== e && n.ended && j(this);
      }

      if (t !== null) {
        this.emit("data", t);
      }

      return t;
    };

    A.prototype._read = function (e) {
      h_errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };

    A.prototype.pipe = function (e, t) {
      var n;
      var r = this;
      var a = this._readableState;
      switch (a.pipesCount) {
        case 0: {
          a.pipes = e;
          break;
        }
        case 1: {
          a.pipes = [a.pipes, e];
          break;
        }
        default: {
          a.pipes.push(e);
        }
      }
      a.pipesCount += 1;
      o("pipe count=%d opts=%j", a.pipesCount, t);
      var s =
        (t && t.end === false) ||
        e === i.default.stdout ||
        e === i.default.stderr
          ? h
          : l;
      function l() {
        o("onend");
        e.end();
      }

      if (a.endEmitted) {
        i.default.nextTick(s);
      } else {
        r.once("end", s);
      }

      e.on("unpipe", function t(n, i) {
        o("onunpipe");

        if (n === r && i && i.hasUnpiped === false) {
          i.hasUnpiped = true;
          o("cleanup");
          e.removeListener("close", f);
          e.removeListener("finish", m);
          e.removeListener("drain", c);
          e.removeListener("error", _);
          e.removeListener("unpipe", t);
          r.removeListener("end", l);
          r.removeListener("end", h);
          r.removeListener("data", p);
          u = true;

          a.awaitDrain &&
            (!e._writableState || e._writableState.needDrain) &&
            c();
        }
      });

      n = r;

      var c = function () {
        var n_readableState = n._readableState;
        o("pipeOnDrain", n_readableState.awaitDrain);

        if (n_readableState.awaitDrain) {
          n_readableState.awaitDrain--;
        }

        if (n_readableState.awaitDrain === 0 && d(n, "data")) {
          n_readableState.flowing = true;
          B(n);
        }
      };

      e.on("drain", c);
      var u = false;
      function p(t) {
        o("ondata");
        var n = e.write(t);
        o("dest.write", n);

        if (n === false) {
          ((a.pipesCount === 1 && a.pipes === e) ||
            (a.pipesCount > 1 && -1 !== V(a.pipes, e))) &&
            !u &&
            (o("false write response, pause", a.awaitDrain), a.awaitDrain++);

          r.pause();
        }
      }
      function _(t) {
        o("onerror", t);
        h();
        e.removeListener("error", _);

        if (d(e, "error") === 0) {
          h_errorOrDestroy(e, t);
        }
      }
      function f() {
        e.removeListener("finish", m);
        h();
      }
      function m() {
        o("onfinish");
        e.removeListener("close", f);
        h();
      }
      function h() {
        o("unpipe");
        r.unpipe(e);
      }
      r.on("data", p);

      !(function (e, t, n) {
        if (typeof e.prependListener == "function") {
          return e.prependListener(t, n);
        }

        if (e._events && e._events[t]) {
          if (Array.isArray(e._events[t])) {
            e._events[t].unshift(n);
          } else {
            e._events[t] = [n, e._events[t]];
          }
        } else {
          e.on(t, n);
        }
      })(e, "error", _);

      e.once("close", f);
      e.once("finish", m);
      e.emit("pipe", r);

      if (!a.flowing) {
        o("pipe resume");
        r.resume();
      }

      return e;
    };

    A.prototype.unpipe = function (e) {
      var t = this._readableState;
      var n = { hasUnpiped: false };
      if (t.pipesCount === 0) {
        return this;
      }
      if (t.pipesCount === 1) {
        if (!e || e === t.pipes) {
          e || (e = t.pipes);
          t.pipes = null;
          t.pipesCount = 0;
          t.flowing = false;
          e && e.emit("unpipe", this, n);
        }

        return this;
      }
      if (!e) {
        var { pipes, pipesCount } = t;

        t.pipes = null;
        t.pipesCount = 0;
        t.flowing = false;
        for (var a = 0; a < pipesCount; a++) {
          pipes[a].emit("unpipe", this, { hasUnpiped: false });
        }
        return this;
      }
      var o = V(t.pipes, e);

      if (-1 !== o) {
        t.pipes.splice(o, 1);
        t.pipesCount -= 1;
        t.pipesCount === 1 && (t.pipes = t.pipes[0]);
        e.emit("unpipe", this, n);
      }

      return this;
    };

    A.prototype.on = function (e, t) {
      var n = u.prototype.on.call(this, e, t);
      var r = this._readableState;

      if (e === "data") {
        r.readableListening = this.listenerCount("readable") > 0;
        r.flowing !== false && this.resume();
      } else if (e === "readable" && !r.endEmitted && !r.readableListening) {
        r.readableListening = r.needReadable = true;
        r.flowing = false;
        r.emittedReadable = false;
        o("on readable", r.length, r.reading);
        r.length ? I(this) : r.reading || i.default.nextTick(F, this);
      }

      return n;
    };

    A.prototype.addListener = A.prototype.on;

    A.prototype.removeListener = function (e, t) {
      var n = u.prototype.removeListener.call(this, e, t);

      if (e === "readable") {
        i.default.nextTick(R, this);
      }

      return n;
    };

    A.prototype.removeAllListeners = function (e) {
      var t = u.prototype.removeAllListeners.apply(this, arguments);

      if (e === "readable" || e === undefined) {
        i.default.nextTick(R, this);
      }

      return t;
    };

    A.prototype.resume = function () {
      var n = this._readableState;

      if (!n.flowing) {
        o("resume");
        n.flowing = !n.readableListening;
        e = this;

        (t = n).resumeScheduled ||
          ((t.resumeScheduled = true), i.default.nextTick(O, e, t));
      }

      n.paused = false;
      return this;
    };

    A.prototype.pause = function () {
      o("call pause flowing=%j", this._readableState.flowing);

      if (this._readableState.flowing !== false) {
        o("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }

      this._readableState.paused = true;
      return this;
    };

    A.prototype.wrap = function (e) {
      var t = this;
      var n = this._readableState;
      var r = false;

      e.on("end", function () {
        o("wrapped end");

        if (n.decoder && !n.ended) {
          var e = n.decoder.end();

          if (e && e.length) {
            t.push(e);
          }
        }

        t.push(null);
      });

      e.on("data", function (i) {
        o("wrapped data");

        if (n.decoder) {
          i = n.decoder.write(i);
        }

        if (!n.objectMode || i != null) {
          if (n.objectMode || (i && i.length)) {
            if (!t.push(i)) {
              r = true;
              e.pause();
            }
          }
        }
      });

      for (var i in e) {
        if (this[i] === undefined && typeof e[i] == "function") {
          this[i] = (function (t) {
            return function (...args) {
              return e[t](...args);
            };
          })(i);
        }
      }

      for (var a = 0; a < E.length; a++) {
        e.on(E[a], this.emit.bind(this, E[a]));
      }

      this._read = function (t) {
        o("wrapped _read", t);

        if (r) {
          r = false;
          e.resume();
        }
      };

      return this;
    };

    if (typeof Symbol == "function") {
      A.prototype[Symbol.asyncIterator] = function (l = r(6871)) {
        return l(this);
      };
    }

    Object.defineProperty(A.prototype, "readableHighWaterMark", {
      enumerable: false,
      get: function () {
        return this._readableState.highWaterMark;
      },
    });

    Object.defineProperty(A.prototype, "readableBuffer", {
      enumerable: false,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    });

    Object.defineProperty(A.prototype, "readableFlowing", {
      enumerable: false,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (e) {
        if (this._readableState) {
          this._readableState.flowing = e;
        }
      },
    });

    A._fromList = W;

    Object.defineProperty(A.prototype, "readableLength", {
      enumerable: false,
      get: function () {
        return this._readableState.length;
      },
    });

    if (typeof Symbol == "function") {
      A.from = function (e, t, c = r(9727)) {
        return c(A, e, t);
      };
    }
  },
  1170: function (e, t, n) {
    e.exports = d;
    var r = n(4646).q;

    var {
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_MULTIPLE_CALLBACK,
      ERR_TRANSFORM_ALREADY_TRANSFORMING,
      ERR_TRANSFORM_WITH_LENGTH_0,
    } = r;

    var l = n(2403);
    function c(e, t) {
      var n = this._transformState;
      n.transforming = false;
      var n_writecb = n.writecb;
      if (n_writecb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      n.writechunk = null;
      n.writecb = null;

      if (t != null) {
        this.push(t);
      }

      n_writecb(e);
      var i = this._readableState;
      i.reading = false;

      if (i.needReadable || i.length < i.highWaterMark) {
        this._read(i.highWaterMark);
      }
    }
    function d(e) {
      if (!(this instanceof d)) {
        return new d(e);
      }
      l.call(this, e);

      this._transformState = {
        afterTransform: c.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      };

      this._readableState.needReadable = true;
      this._readableState.sync = false;

      if (e) {
        typeof e.transform == "function" && (this._transform = e.transform);

        typeof e.flush == "function" && (this._flush = e.flush);
      }

      this.on("prefinish", u);
    }
    function u() {
      var e = this;

      if (typeof this._flush != "function" || this._readableState.destroyed) {
        p(this, null, null);
      } else {
        this._flush(function (t, n) {
          p(e, t, n);
        });
      }
    }
    function p(e, t, n) {
      if (t) {
        return e.emit("error", t);
      }

      if (n != null) {
        e.push(n);
      }

      if (e._writableState.length) {
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      }

      if (e._transformState.transforming) {
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      }
      return e.push(null);
    }
    n(3782)(d, l);

    d.prototype.push = function (e, t) {
      this._transformState.needTransform = false;
      return l.prototype.push.call(this, e, t);
    };

    d.prototype._transform = function (e, t, n) {
      n(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };

    d.prototype._write = function (e, t, n) {
      var r = this._transformState;
      r.writecb = n;
      r.writechunk = e;
      r.writeencoding = t;

      if (!r.transforming) {
        var i = this._readableState;

        if (r.needTransform || i.needReadable || i.length < i.highWaterMark) {
          this._read(i.highWaterMark);
        }
      }
    };

    d.prototype._read = function (e) {
      var t = this._transformState;

      if (t.writechunk === null || t.transforming) {
        t.needTransform = true;
      } else {
        t.transforming = true;
        this._transform(t.writechunk, t.writeencoding, t.afterTransform);
      }
    };

    d.prototype._destroy = function (e, t) {
      l.prototype._destroy.call(this, e, function (e) {
        t(e);
      });
    };
  },
  7337: function (t, n, r) {
    function a(e) {
      var t = this;
      this.next = null;
      this.entry = null;

      this.finish = function () {
        var n = t;
        var r = e;
        var n_entry = n.entry;
        for (n.entry = null; n_entry; ) {
          var n_entry_callback = n_entry.callback;
          r.pendingcb--;
          n_entry_callback(undefined);
          n_entry = n_entry.next;
        }
        r.corkedRequestsFree.next = n;
      };
    }
    t.exports = A;
    A.WritableState = C;
    var o;
    var s;
    var l = { deprecate: r(6769) };
    var c = r(4678);
    var d = r(4300).Buffer;
    var u = module.g.Uint8Array || function () {};
    var p = r(7025);
    var _ = r(6776).getHighWaterMark;
    var f = r(4646).q;

    var {
      ERR_INVALID_ARG_TYPE,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_MULTIPLE_CALLBACK,
      ERR_STREAM_CANNOT_PIPE,
      ERR_STREAM_DESTROYED,
      ERR_STREAM_NULL_VALUES,
      ERR_STREAM_WRITE_AFTER_END,
      ERR_UNKNOWN_ENCODING,
    } = f;

    var p_errorOrDestroy = p.errorOrDestroy;
    function E() {}
    function C(e, t, n) {
      o = o || r(2403);
      e = e || {};

      if (typeof n != "boolean") {
        n = t instanceof o;
      }

      this.objectMode = !!e.objectMode;

      if (n) {
        this.objectMode = this.objectMode || !!e.writableObjectMode;
      }

      this.highWaterMark = _(this, e, "writableHighWaterMark", n);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var s = e.decodeStrings === false;
      this.decodeStrings = !s;
      this.defaultEncoding = e.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;

      this.onwrite = function (e) {
        !(function (e, t) {
          var e_writableState = e._writableState;

          var { sync, writecb } = e_writableState;

          if (typeof writecb != "function") {
            throw new ERR_MULTIPLE_CALLBACK();
          }
          e_writableState.writing = false;
          e_writableState.writecb = null;
          e_writableState.length -= e_writableState.writelen;
          e_writableState.writelen = 0;

          if (t) {
            --e_writableState.pendingcb;

            if (sync) {
              i.default.nextTick(writecb, t);
              i.default.nextTick(M, e, e_writableState);
              e._writableState.errorEmitted = true;
              p_errorOrDestroy(e, t);
            } else {
              writecb(t);
              e._writableState.errorEmitted = true;
              p_errorOrDestroy(e, t);
              M(e, e_writableState);
            }
          } else {
            var o = I(e_writableState) || e.destroyed;

            if (
              !o &&
              !e_writableState.corked &&
              !e_writableState.bufferProcessing &&
              e_writableState.bufferedRequest
            ) {
              N(e, e_writableState);
            }

            if (sync) {
              i.default.nextTick(D, e, e_writableState, o, writecb);
            } else {
              D(e, e_writableState, o, writecb);
            }
          }
        })(t, e);
      };

      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = e.emitClose !== false;
      this.autoDestroy = !!e.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new a(this);
    }
    r(3782)(A, c);

    C.prototype.getBuffer = function () {
      for (var e = this.bufferedRequest, t = []; e; ) {
        t.push(e);
        e = e.next;
      }
      return t;
    };

    try {
      Object.defineProperty(C.prototype, "buffer", {
        get: l.deprecate(
          function () {
            return this.getBuffer();
          },
          "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
          "DEP0003"
        ),
      });
    } catch (e) {}
    function A(e) {
      var t = this instanceof (o = o || r(2403));
      if (!t && !s.call(A, this)) {
        return new A(e);
      }
      this._writableState = new C(e, this, t);
      this.writable = true;

      if (e) {
        typeof e.write == "function" && (this._write = e.write);
        typeof e.writev == "function" && (this._writev = e.writev);
        typeof e.destroy == "function" && (this._destroy = e.destroy);
        typeof e.final == "function" && (this._final = e.final);
      }

      c.call(this);
    }
    function w(e, t, n, r, i, a, o) {
      t.writelen = r;
      t.writecb = o;
      t.writing = true;
      t.sync = true;

      if (t.destroyed) {
        t.onwrite(new ERR_STREAM_DESTROYED("write"));
      } else if (n) {
        e._writev(i, t.onwrite);
      } else {
        e._write(i, a, t.onwrite);
      }

      t.sync = false;
    }
    function D(e, t, n, r) {
      if (!n) {
        i = e;

        (a = t).length === 0 &&
          a.needDrain &&
          ((a.needDrain = false), i.emit("drain"));
      }

      t.pendingcb--;
      r();
      M(e, t);
    }
    function N(e, t) {
      t.bufferProcessing = true;
      var t_bufferedRequest = t.bufferedRequest;
      if (e._writev && t_bufferedRequest && t_bufferedRequest.next) {
        var r = Array(t.bufferedRequestCount);
        var t_corkedRequestsFree = t.corkedRequestsFree;
        t_corkedRequestsFree.entry = t_bufferedRequest;
        for (var o = 0; t_bufferedRequest; ) {
          r[o] = t_bufferedRequest;

          if (!t_bufferedRequest.isBuf) {
            s = false;
          }

          t_bufferedRequest = t_bufferedRequest.next;
          o += 1;
        }
        r.allBuffers = s;
        w(e, t, true, t.length, r, "", t_corkedRequestsFree.finish);
        t.pendingcb++;
        t.lastBufferedRequest = null;

        if (t_corkedRequestsFree.next) {
          t.corkedRequestsFree = t_corkedRequestsFree.next;
          t_corkedRequestsFree.next = null;
        } else {
          t.corkedRequestsFree = new a(t);
        }

        t.bufferedRequestCount = 0;
      } else {
        while (t_bufferedRequest) {
          var { chunk, encoding, callback } = t_bufferedRequest;

          var u = t.objectMode ? 1 : chunk.length;
          w(e, t, false, u, chunk, encoding, callback);
          t_bufferedRequest = t_bufferedRequest.next;
          t.bufferedRequestCount--;

          if (t.writing) {
            break;
          }
        }

        if (t_bufferedRequest === null) {
          t.lastBufferedRequest = null;
        }
      }
      t.bufferedRequest = t_bufferedRequest;
      t.bufferProcessing = false;
    }
    function I(e) {
      return (
        e.ending &&
        e.length === 0 &&
        e.bufferedRequest === null &&
        !e.finished &&
        !e.writing
      );
    }
    function P(e, t) {
      e._final(function (n) {
        t.pendingcb--;

        if (n) {
          p_errorOrDestroy(e, n);
        }

        t.prefinished = true;
        e.emit("prefinish");
        M(e, t);
      });
    }
    function M(e, t) {
      var n = I(t);
      if (
        n &&
        (t.prefinished ||
          t.finalCalled ||
          (typeof e._final != "function" || t.destroyed
            ? ((t.prefinished = true), e.emit("prefinish"))
            : (t.pendingcb++,
              (t.finalCalled = true),
              i.default.nextTick(P, e, t))),
        t.pendingcb === 0 &&
          ((t.finished = true), e.emit("finish"), t.autoDestroy))
      ) {
        var e_readableState = e._readableState;

        if (
          !e_readableState ||
          (e_readableState.autoDestroy && e_readableState.endEmitted)
        ) {
          e.destroy();
        }
      }
      return n;
    }

    if (
      typeof Symbol == "function" &&
      Symbol.hasInstance &&
      typeof Function.prototype[Symbol.hasInstance] == "function"
    ) {
      s = Function.prototype[Symbol.hasInstance];

      Object.defineProperty(A, Symbol.hasInstance, {
        value: function (e) {
          return (
            !!s.call(this, e) ||
            (this === A && e && e._writableState instanceof C)
          );
        },
      });
    } else {
      s = function (e) {
        return e instanceof this;
      };
    }

    A.prototype.pipe = function () {
      p_errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };

    A.prototype.write = function (e, t, n) {
      var r;
      var a;
      var o;
      var s;
      var _ = this._writableState;
      var f = false;
      var h = !_.objectMode && ((r = e), d.isBuffer(r) || r instanceof u);

      h && !d.isBuffer(e) && ((a = e), (e = d.from(a)));
      typeof t == "function" && ((n = t), (t = null));
      h ? (t = "buffer") : t || (t = _.defaultEncoding);
      typeof n != "function" && (n = E);

      if (_.ending) {
        o = n;
        p_errorOrDestroy(this, (s = new ERR_STREAM_WRITE_AFTER_END()));
        i.default.nextTick(o, s);
      } else if (
        h ||
        ((l = e),
        (c = n),
        l === null
          ? (p = new ERR_STREAM_NULL_VALUES())
          : typeof l == "string" ||
            _.objectMode ||
            (p = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], l)),
        !p || (p_errorOrDestroy(this, p), i.default.nextTick(c, p), 0))
      ) {
        _.pendingcb++;

        f = (function (e, t, n, r, i, a) {
          if (!n) {
            var o;
            var s;

            o = r;
            s = i;

            if (
              !t.objectMode &&
              t.decodeStrings !== false &&
              typeof o == "string"
            ) {
              o = d.from(o, s);
            }

            var l = o;

            if (r !== l) {
              n = true;
              i = "buffer";
              r = l;
            }
          }
          var c = t.objectMode ? 1 : r.length;
          t.length += c;
          var u = t.length < t.highWaterMark;

          if (!u) {
            t.needDrain = true;
          }

          if (t.writing || t.corked) {
            var t_lastBufferedRequest = t.lastBufferedRequest;

            t.lastBufferedRequest = {
              chunk: r,
              encoding: i,
              isBuf: n,
              callback: a,
              next: null,
            };

            if (t_lastBufferedRequest) {
              t_lastBufferedRequest.next = t.lastBufferedRequest;
            } else {
              t.bufferedRequest = t.lastBufferedRequest;
            }

            t.bufferedRequestCount += 1;
          } else {
            w(e, t, false, c, r, i, a);
          }

          return u;
        })(this, _, h, e, t, n);
      }

      return f;
    };

    A.prototype.cork = function () {
      this._writableState.corked++;
    };

    A.prototype.uncork = function () {
      var e = this._writableState;

      if (e.corked) {
        e.corked--;

        e.writing ||
          e.corked ||
          e.bufferProcessing ||
          !e.bufferedRequest ||
          N(this, e);
      }
    };

    A.prototype.setDefaultEncoding = function (e) {
      if (typeof e == "string") {
        e = e.toLowerCase();
      }

      if (
        !(
          [
            "hex",
            "utf8",
            "utf-8",
            "ascii",
            "binary",
            "base64",
            "ucs2",
            "ucs-2",
            "utf16le",
            "utf-16le",
            "raw",
          ].indexOf(String(e).toLowerCase()) > -1
        )
      ) {
        throw new ERR_UNKNOWN_ENCODING(e);
      }

      this._writableState.defaultEncoding = e;
      return this;
    };

    Object.defineProperty(A.prototype, "writableBuffer", {
      enumerable: false,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });

    Object.defineProperty(A.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: function () {
        return this._writableState.highWaterMark;
      },
    });

    A.prototype._write = function (e, t, n) {
      n(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };

    A.prototype._writev = null;

    A.prototype.end = function (e, t, n) {
      var s = this._writableState;

      if (typeof e == "function") {
        n = e;
        e = null;
        t = null;
      } else if (typeof t == "function") {
        n = t;
        t = null;
      }

      if (e != null) {
        this.write(e, t);
      }

      if (s.corked) {
        s.corked = 1;
        this.uncork();
      }

      if (!s.ending) {
        r = this;
        a = s;
        o = n;
        a.ending = true;
        M(r, a);
        o && (a.finished ? i.default.nextTick(o) : r.once("finish", o));
        a.ended = true;
        r.writable = false;
      }

      return this;
    };

    Object.defineProperty(A.prototype, "writableLength", {
      enumerable: false,
      get: function () {
        return this._writableState.length;
      },
    });

    Object.defineProperty(A.prototype, "destroyed", {
      enumerable: false,
      get: function () {
        return (
          this._writableState !== undefined && this._writableState.destroyed
        );
      },
      set: function (e) {
        if (this._writableState) {
          this._writableState.destroyed = e;
        }
      },
    });

    A.prototype.destroy = p.destroy;
    A.prototype._undestroy = p.undestroy;

    A.prototype._destroy = function (e, t) {
      t(e);
    };
  },
  6871: function (e, t, n) {
    function r(e, t, n) {
      if (t in e) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        e[t] = n;
      }

      return e;
    }
    var a;
    var o = n(9698);
    var s = Symbol("lastResolve");
    var l = Symbol("lastReject");
    var c = Symbol("error");
    var d = Symbol("ended");
    var u = Symbol("lastPromise");
    var p = Symbol("handlePromise");
    var _ = Symbol("stream");
    function f(e, t) {
      return { value: e, done: t };
    }
    function m(e) {
      var e_s = e[s];
      if (e_s !== null) {
        var n = e[_].read();

        if (n !== null) {
          e[u] = null;
          e[s] = null;
          e[l] = null;
          e_s(f(n, false));
        }
      }
    }
    function h(e) {
      i.default.nextTick(m, e);
    }
    var g = Object.getPrototypeOf(function () {});

    var y = Object.setPrototypeOf(
      (r(
        (a = {
          get stream() {
            return this[_];
          },
          next: function () {
            var e;
            var t;
            var n = this;
            var r = this[c];
            if (r !== null) {
              return Promise.reject(r);
            }
            if (this[d]) {
              return Promise.resolve(f(undefined, true));
            }
            if (this[_].destroyed) {
              return new Promise(function (e, t) {
                i.default.nextTick(function () {
                  if (n[c]) {
                    t(n[c]);
                  } else {
                    e(f(undefined, true));
                  }
                });
              });
            }
            var a = this[u];
            if (a) {
              t = new Promise(
                ((e = this),
                function (t, n) {
                  a.then(function () {
                    if (e[d]) {
                      t(f(undefined, true));
                    } else {
                      e[p](t, n);
                    }
                  }, n);
                })
              );
            } else {
              var o = this[_].read();
              if (o !== null) {
                return Promise.resolve(f(o, false));
              }
              t = new Promise(this[p]);
            }
            this[u] = t;
            return t;
          },
        }),
        Symbol.asyncIterator,
        function () {
          return this;
        }
      ),
      r(a, "return", function () {
        var e = this;
        return new Promise(function (t, n) {
          e[_].destroy(null, function (e) {
            if (e) {
              n(e);
            } else {
              t(f(undefined, true));
            }
          });
        });
      }),
      a),
      g
    );

    e.exports = function (e) {
      var t;

      var n = Object.create(
        y,
        (r((t = {}), _, { value: e, writable: true }),
        r(t, s, { value: null, writable: true }),
        r(t, l, { value: null, writable: true }),
        r(t, c, { value: null, writable: true }),
        r(t, d, { value: e._readableState.endEmitted, writable: true }),
        r(t, p, {
          value: function (e, t) {
            var r = n[_].read();

            if (r) {
              n[u] = null;
              n[s] = null;
              n[l] = null;
              e(f(r, false));
            } else {
              n[s] = e;
              n[l] = t;
            }
          },
          writable: true,
        }),
        t)
      );

      n[u] = null;

      o(e, function (e) {
        if (e && e.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var n_l = n[l];

          if (n_l !== null) {
            n[u] = null;
            n[s] = null;
            n[l] = null;
            n_l(e);
          }

          n[c] = e;
          return;
        }
        var n_s = n[s];

        if (n_s !== null) {
          n[u] = null;
          n[s] = null;
          n[l] = null;
          n_s(f(undefined, true));
        }

        n[d] = true;
      });

      e.on("readable", h.bind(null, n));
      return n;
    };
  },
  4379: function (e, t, n) {
    function r(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);

        if (t) {
          r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          });
        }

        n.push(...r);
      }
      return n;
    }
    var i = n(4300).Buffer;
    var a = n(3837).inspect;
    var o = (a && a.custom) || "inspect";
    e.exports = (function (...args) {
      var e;
      function t() {
        if (!(this instanceof t)) {
          throw TypeError("Cannot call a class as a function");
        }
        this.head = null;
        this.tail = null;
        this.length = 0;
      }

      e = [
        {
          key: "push",
          value: function (e) {
            var t = { data: e, next: null };

            if (this.length > 0) {
              this.tail.next = t;
            } else {
              this.head = t;
            }

            this.tail = t;
            ++this.length;
          },
        },
        {
          key: "unshift",
          value: function (e) {
            var t = { data: e, next: this.head };

            if (this.length === 0) {
              this.tail = t;
            }

            this.head = t;
            ++this.length;
          },
        },
        {
          key: "shift",
          value: function () {
            if (this.length !== 0) {
              var e = this.head.data;

              if (this.length === 1) {
                this.head = this.tail = null;
              } else {
                this.head = this.head.next;
              }

              --this.length;
              return e;
            }
          },
        },
        {
          key: "clear",
          value: function () {
            this.head = null;
            this.tail = null;
            this.length = 0;
          },
        },
        {
          key: "join",
          value: function (e) {
            if (this.length === 0) {
              return "";
            }
            for (var t = this.head, n = "" + t.data; (t = t.next); ) {
              n += e + t.data;
            }
            return n;
          },
        },
        {
          key: "concat",
          value: function (e) {
            if (this.length === 0) {
              return i.alloc(0);
            }
            for (
              var t, n, r = i.allocUnsafe(e >>> 0), a = this.head, o = 0;
              a;

            ) {
              t = a.data;
              n = o;
              i.prototype.copy.call(t, r, n);
              o += a.data.length;
              a = a.next;
            }
            return r;
          },
        },
        {
          key: "consume",
          value: function (e, t) {
            var n;

            if (e < this.head.data.length) {
              n = this.head.data.slice(0, e);
              this.head.data = this.head.data.slice(e);
            } else {
              n =
                e === this.head.data.length
                  ? this.shift()
                  : t
                  ? this._getString(e)
                  : this._getBuffer(e);
            }

            return n;
          },
        },
        {
          key: "first",
          value: function () {
            return this.head.data;
          },
        },
        {
          key: "_getString",
          value: function (e) {
            var t = this.head;
            var n = 1;
            var t_data = t.data;
            for (e -= t_data.length; (t = t.next); ) {
              var t_data_1 = t.data;
              var a = e > t_data_1.length ? t_data_1.length : e;

              if (a === t_data_1.length) {
                t_data += t_data_1;
              } else {
                t_data += t_data_1.slice(0, e);
              }

              if (0 == (e -= a)) {
                if (a === t_data_1.length) {
                  ++n;

                  t.next
                    ? (this.head = t.next)
                    : (this.head = this.tail = null);
                } else {
                  this.head = t;
                  t.data = t_data_1.slice(a);
                }

                break;
              }

              ++n;
            }
            this.length -= n;
            return t_data;
          },
        },
        {
          key: "_getBuffer",
          value: function (e) {
            var t = i.allocUnsafe(e);
            var n = this.head;
            var r = 1;
            n.data.copy(t);

            for (e -= n.data.length; (n = n.next); ) {
              var n_data = n.data;
              var o = e > n_data.length ? n_data.length : e;
              n_data.copy(t, t.length - e, 0, o);

              if (0 == (e -= o)) {
                if (o === n_data.length) {
                  ++r;

                  n.next
                    ? (this.head = n.next)
                    : (this.head = this.tail = null);
                } else {
                  this.head = n;
                  n.data = n_data.slice(o);
                }

                break;
              }

              ++r;
            }

            this.length -= r;
            return t;
          },
        },
        {
          key: o,
          value: function (e, t) {
            return a(
              this,
              (function (e) {
                for (var t = 1; t < args.length; t++) {
                  var n = args[t] != null ? args[t] : {};

                  if (t % 2) {
                    r(Object(n), true).forEach(function (t) {
                      var r;
                      var i;
                      var a;
                      r = e;
                      i = t;
                      a = n[t];

                      if (i in r) {
                        Object.defineProperty(r, i, {
                          value: a,
                          enumerable: true,
                          configurable: true,
                          writable: true,
                        });
                      } else {
                        r[i] = a;
                      }
                    });
                  } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(n)
                    );
                  } else {
                    r(Object(n)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(n, t)
                      );
                    });
                  }
                }
                return e;
              })({}, t, { depth: 0, customInspect: false })
            );
          },
        },
      ];

      (function (e, t) {
        for (var n = 0; n < t.length; n++) {
          var t_n = t[n];
          t_n.enumerable = t_n.enumerable || false;
          t_n.configurable = true;

          if ("value" in t_n) {
            t_n.writable = true;
          }

          Object.defineProperty(e, t_n.key, t_n);
        }
      })(t.prototype, e);

      return t;
    })();
  },
  7025: function (e) {
    function t(e, t) {
      r(e, t);
      n(e);
    }
    function n(e) {
      if (!e._writableState || e._writableState.emitClose) {
        if (!e._readableState || e._readableState.emitClose) {
          e.emit("close");
        }
      }
    }
    function r(e, t) {
      e.emit("error", t);
    }
    e.exports = {
      destroy: function (e, a) {
        var o = this;
        var s = this._readableState && this._readableState.destroyed;
        var l = this._writableState && this._writableState.destroyed;

        if (s || l) {
          if (a) {
            a(e);
          } else if (e) {
            if (this._writableState) {
              if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                i.default.nextTick(r, this, e);
              }
            } else {
              i.default.nextTick(r, this, e);
            }
          }
        } else {
          this._readableState && (this._readableState.destroyed = true);
          this._writableState && (this._writableState.destroyed = true);

          this._destroy(e || null, function (e) {
            if (!a && e) {
              if (o._writableState) {
                if (o._writableState.errorEmitted) {
                  i.default.nextTick(n, o);
                } else {
                  o._writableState.errorEmitted = true;
                  i.default.nextTick(t, o, e);
                }
              } else {
                i.default.nextTick(t, o, e);
              }
            } else if (a) {
              i.default.nextTick(n, o);
              a(e);
            } else {
              i.default.nextTick(n, o);
            }
          });
        }

        return this;
      },
      undestroy: function () {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }

        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finalCalled = false;
          this._writableState.prefinished = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      },
      errorOrDestroy: function (e, t) {
        var { _readableState, _writableState } = e;

        if (
          (_readableState && _readableState.autoDestroy) ||
          (_writableState && _writableState.autoDestroy)
        ) {
          e.destroy(t);
        } else {
          e.emit("error", t);
        }
      },
    };
  },
  9698: function (e, t, n) {
    var r = n(4646).q.ERR_STREAM_PREMATURE_CLOSE;
    function i() {}
    e.exports = function e(t, n, a) {
      if (typeof n == "function") {
        return e(t, null, n);
      }

      if (!n) {
        n = {};
      }

      o = a || i;
      s = false;

      a = function (...args) {
        if (!s) {
          s = true;
          for (var e = args.length, t = Array(e), n = 0; n < e; n++) {
            t[n] = args[n];
          }
          o.apply(this, t);
        }
      };

      var o;
      var s;
      var l = n.readable || (n.readable !== false && t.readable);
      var c = n.writable || (n.writable !== false && t.writable);

      var d = function () {
        if (!t.writable) {
          p();
        }
      };

      var u = t._writableState && t._writableState.finished;

      var p = function () {
        c = false;
        u = true;

        if (!l) {
          a.call(t);
        }
      };

      var _ = t._readableState && t._readableState.endEmitted;

      var f = function () {
        l = false;
        _ = true;

        if (!c) {
          a.call(t);
        }
      };

      var m = function (e) {
        a.call(t, e);
      };

      var h = function () {
        var e;
        return l && !_
          ? ((t._readableState && t._readableState.ended) || (e = new r()),
            a.call(t, e))
          : c && !u
          ? ((t._writableState && t._writableState.ended) || (e = new r()),
            a.call(t, e))
          : undefined;
      };

      var g = function () {
        t.req.on("finish", p);
      };

      if (t.setHeader && typeof t.abort == "function") {
        t.on("complete", p);
        t.on("abort", h);
        t.req ? g() : t.on("request", g);
      } else if (c && !t._writableState) {
        t.on("end", d);
        t.on("close", d);
      }

      t.on("end", f);
      t.on("finish", p);

      if (n.error !== false) {
        t.on("error", m);
      }

      t.on("close", h);

      return function () {
        t.removeListener("complete", p);
        t.removeListener("abort", h);
        t.removeListener("request", g);

        if (t.req) {
          t.req.removeListener("finish", p);
        }

        t.removeListener("end", d);
        t.removeListener("close", d);
        t.removeListener("finish", p);
        t.removeListener("end", f);
        t.removeListener("error", m);
        t.removeListener("close", h);
      };
    };
  },
  9727: function (e, t, n) {
    function r(e, t, n, r, i, a, o) {
      try {
        var s = e[a](o);
        var s_value = s.value;
      } catch (e) {
        n(e);
        return;
      }

      if (s.done) {
        t(l);
      } else {
        Promise.resolve(l).then(r, i);
      }
    }
    function i(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);

        if (t) {
          r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          });
        }

        n.push(...r);
      }
      return n;
    }
    var a = n(4646).q.ERR_INVALID_ARG_TYPE;
    e.exports = function (e, t, n) {
      if (t && typeof t.next == "function") {
        o = t;
      } else if (t && t[Symbol.asyncIterator]) {
        o = t[Symbol.asyncIterator]();
      } else if (t && t[Symbol.iterator]) {
        o = t[Symbol.iterator]();
      } else {
        throw new a("iterable", ["Iterable"], t);
      }
      var o;

      var s = new e(
        (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};

            if (t % 2) {
              i(Object(n), true).forEach(function (t) {
                var r;
                var i;
                var a;
                r = e;
                i = t;
                a = n[t];

                if (i in r) {
                  Object.defineProperty(r, i, {
                    value: a,
                    enumerable: true,
                    configurable: true,
                    writable: true,
                  });
                } else {
                  r[i] = a;
                }
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
            } else {
              i(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
            }
          }
          return e;
        })({ objectMode: true }, n)
      );

      var l = false;
      function c(...args) {
        return d.apply(this, args);
      }
      function d(...args) {
        var e;

        e = function* () {
          try {
            var e = yield o.next();
            var e_value = e.value;

            if (e.done) {
              s.push(null);
            } else if (s.push(yield e_value)) {
              c();
            } else {
              l = false;
            }
          } catch (e) {
            s.destroy(e);
          }
        };

        return (d = function (...args) {
          var t = this;
          var n = args;
          return new Promise(function (i, a) {
            var o = e.apply(t, n);
            function s(e) {
              r(o, i, a, s, l, "next", e);
            }
            function l(e) {
              r(o, i, a, s, l, "throw", e);
            }
            s(undefined);
          });
        }).apply(this, args);
      }

      s._read = function () {
        if (!l) {
          l = true;
          c();
        }
      };

      return s;
    };
  },
  8442: function (e, t, n) {
    var r;
    var i = n(4646).q;

    var { ERR_MISSING_ARGS, ERR_STREAM_DESTROYED } = i;

    function s(e) {
      if (e) {
        throw e;
      }
    }
    function l(e) {
      e();
    }
    function c(e, t) {
      return e.pipe(t);
    }
    e.exports = function (...args) {
      for (var e, t, i = args.length, d = Array(i), u = 0; u < i; u++) {
        d[u] = args[u];
      }
      var p =
        (e = d).length && typeof e[e.length - 1] == "function" ? e.pop() : s;

      if (Array.isArray(d[0])) {
        d = d[0];
      }

      if (d.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }

      var _ = d.map(function (e, i, r = n(9698)) {
        var a;
        var s;
        var c;
        var u;
        var f;
        var m;
        var h = i < d.length - 1;
        a = i > 0;

        c = s = function (e) {
          if (!t) {
            t = e;
          }

          if (e) {
            _.forEach(l);
          }

          if (!h) {
            _.forEach(l);
            p(t);
          }
        };

        u = false;

        s = function () {
          if (!u) {
            u = true;
            c(...args);
          }
        };

        f = false;

        e.on("close", function () {
          f = true;
        });

        r(e, { readable: h, writable: a }, function (e) {
          if (e) {
            return s(e);
          }
          f = true;
          s();
        });

        m = false;

        return function (t) {
          if (!f && !m) {
            m = true;

            if (e.setHeader && typeof e.abort == "function") {
              return e.abort();
            }

            if (typeof e.destroy == "function") {
              return e.destroy();
            }
            s(t || new ERR_STREAM_DESTROYED("pipe"));
          }
        };
      });
      return d.reduce(c);
    };
  },
  6776: function (e, t, n) {
    var r = n(4646).q.ERR_INVALID_OPT_VALUE;
    e.exports = {
      getHighWaterMark: function (e, t, n, i) {
        var a = t.highWaterMark != null ? t.highWaterMark : i ? t[n] : null;
        if (a != null) {
          if (!(isFinite(a) && Math.floor(a) === a) || a < 0) {
            throw new r(i ? n : "highWaterMark", a);
          }
          return Math.floor(a);
        }
        return e.objectMode ? 16 : 16384;
      },
    };
  },
  4678: function (e, t, n) {
    e.exports = n(2781);
  },
  3726: function (e, t, n) {
    var r = n(2781);

    if (i.default.env.READABLE_STREAM === "disable" && r) {
      e.exports = r.Readable;
      Object.assign(e.exports, r);
      e.exports.Stream = r;
    } else {
      t = e.exports = n(1709);
      t.Stream = r || t;
      t.Readable = t;
      t.Writable = n(7337);
      t.Duplex = n(2403);
      t.Transform = n(1170);
      t.PassThrough = n(7889);
      t.finished = n(9698);
      t.pipeline = n(8442);
    }
  },
  3225: function (e, t, n) {
    var r = n(4300).Buffer;
    var i = n(3782);
    var a = n(9029);
    var o = Array(16);

    var s = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
      15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6,
      13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0,
      5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
    ];

    var l = [
      5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13,
      5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2,
      10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12,
      15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
    ];

    var c = [
      11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
      9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8,
      13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5,
      12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
    ];

    var d = [
      8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12,
      8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13,
      5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15,
      8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
    ];

    function u() {
      a.call(this, 64);
      this._a = 1732584193 /* 0x67452301 */;
      this._b = 4023233417 /* 0xefcdab89 */;
      this._c = 2562383102 /* 0x98badcfe */;
      this._d = 271733878 /* 0x10325476 */;
      this._e = 3285377520 /* 0xc3d2e1f0 */;
    }
    function p(e, t) {
      return (e << t) | (e >>> (32 - t));
    }
    i(u, a);

    u.prototype._update = function () {
      var _;
      var f;
      var m;
      var h;
      var g;
      var y;
      var b;
      var x;
      var S;
      var k;
      var T;
      var E;
      var C;
      var A;
      var w;
      var D;
      var N;
      var I;
      var P;
      var M;
      var L;
      var R;
      var F;
      var O;
      var B;
      var W;
      var j;
      var z;
      var V;
      var G;
      var K;
      var U;
      var H;
      var q;
      var J;
      var $;
      var X;
      var Y;
      var Q;
      var Z;
      var ee;
      var et;
      var en;
      var er;
      var ei;
      for (var e, t, n, r, i, a, u, ea = 0; ea < 16; ++ea) {
        o[ea] = this._block.readInt32LE(4 * ea);
      }
      for (
        var eo = 0 | this._a,
          es = 0 | this._b,
          el = 0 | this._c,
          ec = 0 | this._d,
          ed = 0 | this._e,
          eu = 0 | this._a,
          ep = 0 | this._b,
          e_ = 0 | this._c,
          ef = 0 | this._d,
          em = 0 | this._e,
          eh = 0;
        eh < 80;
        eh += 1
      ) {
        if (eh < 16) {
          e = eo;
          t = es;
          n = el;
          r = ec;
          i = ed;
          er = (p((e + (t ^ n ^ r) + o[s[eh]] + 0) | 0, c[eh]) + i) | 0;
          a = eu;
          u = ep;
          _ = e_;
          f = ef;
          m = em;

          ei =
            (p(
              (a + (u ^ (_ | ~f)) + o[l[eh]] + 1352829926) /* 0x50a28be6 */ | 0,
              d[eh]
            ) +
              m) |
            0;
        } else if (eh < 32) {
          h = eo;
          g = es;
          y = el;
          b = ec;
          x = ed;

          er =
            (p(
              (h +
                ((g & y) | (~g & b)) +
                o[s[eh]] +
                1518500249) /* 0x5a827999 */ |
                0,
              c[eh]
            ) +
              x) |
            0;

          S = eu;
          k = ep;
          T = e_;
          E = ef;
          C = em;

          ei =
            (p(
              (S +
                ((k & E) | (T & ~E)) +
                o[l[eh]] +
                1548603684) /* 0x5c4dd124 */ |
                0,
              d[eh]
            ) +
              C) |
            0;
        } else if (eh < 48) {
          A = eo;
          w = es;
          D = el;
          N = ec;
          I = ed;

          er =
            (p(
              (A + ((w | ~D) ^ N) + o[s[eh]] + 1859775393) /* 0x6ed9eba1 */ | 0,
              c[eh]
            ) +
              I) |
            0;

          P = eu;
          M = ep;
          L = e_;
          R = ef;
          F = em;

          ei =
            (p(
              (P + ((M | ~L) ^ R) + o[l[eh]] + 1836072691) /* 0x6d703ef3 */ | 0,
              d[eh]
            ) +
              F) |
            0;
        } else if (eh < 64) {
          O = eo;
          B = es;
          W = el;
          j = ec;
          z = ed;

          er =
            (p(
              (O +
                ((B & j) | (W & ~j)) +
                o[s[eh]] +
                2400959708) /* 0x8f1bbcdc */ |
                0,
              c[eh]
            ) +
              z) |
            0;

          V = eu;
          G = ep;
          K = e_;
          U = ef;
          H = em;

          ei =
            (p(
              (V +
                ((G & K) | (~G & U)) +
                o[l[eh]] +
                2053994217) /* 0x7a6d76e9 */ |
                0,
              d[eh]
            ) +
              H) |
            0;
        } else {
          q = eo;
          J = es;
          $ = el;
          X = ec;
          Y = ed;

          er =
            (p(
              (q + (J ^ ($ | ~X)) + o[s[eh]] + 2840853838) /* 0xa953fd4e */ | 0,
              c[eh]
            ) +
              Y) |
            0;

          Q = eu;
          Z = ep;
          ee = e_;
          et = ef;
          en = em;
          ei = (p((Q + (Z ^ ee ^ et) + o[l[eh]] + 0) | 0, d[eh]) + en) | 0;
        }

        eo = ed;
        ed = ec;
        ec = p(el, 10);
        el = es;
        es = er;
        eu = em;
        em = ef;
        ef = p(e_, 10);
        e_ = ep;
        ep = ei;
      }
      var eg = (this._b + el + ef) | 0;
      this._b = (this._c + ec + em) | 0;
      this._c = (this._d + ed + eu) | 0;
      this._d = (this._e + eo + ep) | 0;
      this._e = (this._a + es + e_) | 0;
      this._a = eg;
    };

    u.prototype._digest = function () {
      this._block[this._blockOffset++] = 128;

      if (this._blockOffset > 56) {
        this._block.fill(0, this._blockOffset, 64);
        this._update();
        this._blockOffset = 0;
      }

      this._block.fill(0, this._blockOffset, 56);
      this._block.writeUInt32LE(this._length[0], 56);
      this._block.writeUInt32LE(this._length[1], 60);
      this._update();
      var e = r.alloc ? r.alloc(20) : new r(20);
      e.writeInt32LE(this._a, 0);
      e.writeInt32LE(this._b, 4);
      e.writeInt32LE(this._c, 8);
      e.writeInt32LE(this._d, 12);
      e.writeInt32LE(this._e, 16);
      return e;
    };

    e.exports = u;
  },
  5055: function (e, t, n) {
    var r = n(4300);
    var r_Buffer = r.Buffer;
    function a(e, t) {
      for (var n in e) {
        t[n] = e[n];
      }
    }
    function o(e, t, n) {
      return r_Buffer(e, t, n);
    }

    if (
      r_Buffer.from &&
      r_Buffer.alloc &&
      r_Buffer.allocUnsafe &&
      r_Buffer.allocUnsafeSlow
    ) {
      e.exports = r;
    } else {
      a(r, t);
      t.Buffer = o;
    }

    o.prototype = Object.create(r_Buffer.prototype);
    a(r_Buffer, o);

    o.from = function (e, t, n) {
      if (typeof e == "number") {
        throw TypeError("Argument must not be a number");
      }
      return r_Buffer(e, t, n);
    };

    o.alloc = function (e, t, n) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      var r = r_Buffer(e);

      if (t !== undefined) {
        if (typeof n == "string") {
          r.fill(t, n);
        } else {
          r.fill(t);
        }
      } else {
        r.fill(0);
      }

      return r;
    };

    o.allocUnsafe = function (e) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      return r_Buffer(e);
    };

    o.allocUnsafeSlow = function (e) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      return r.SlowBuffer(e);
    };
  },
  6911: function (e, t, n) {
    var r = n(4300);
    var r_Buffer = r.Buffer;
    function a(e, t) {
      for (var n in e) {
        t[n] = e[n];
      }
    }
    function o(e, t, n) {
      return r_Buffer(e, t, n);
    }

    if (
      r_Buffer.from &&
      r_Buffer.alloc &&
      r_Buffer.allocUnsafe &&
      r_Buffer.allocUnsafeSlow
    ) {
      e.exports = r;
    } else {
      a(r, t);
      t.Buffer = o;
    }

    o.prototype = Object.create(r_Buffer.prototype);
    a(r_Buffer, o);

    o.from = function (e, t, n) {
      if (typeof e == "number") {
        throw TypeError("Argument must not be a number");
      }
      return r_Buffer(e, t, n);
    };

    o.alloc = function (e, t, n) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      var r = r_Buffer(e);

      if (t !== undefined) {
        if (typeof n == "string") {
          r.fill(t, n);
        } else {
          r.fill(t);
        }
      } else {
        r.fill(0);
      }

      return r;
    };

    o.allocUnsafe = function (e) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      return r_Buffer(e);
    };

    o.allocUnsafeSlow = function (e) {
      if (typeof e != "number") {
        throw TypeError("Argument must be a number");
      }
      return r.SlowBuffer(e);
    };
  },
  2858: function (e, t, n) {
    var r = n(6911).Buffer;
    function i(e, t) {
      this._block = r.alloc(e);
      this._finalSize = t;
      this._blockSize = e;
      this._len = 0;
    }

    i.prototype.update = function (e, t) {
      if (typeof e == "string") {
        t = t || "utf8";
        e = r.from(e, t);
      }

      for (
        var n = this._block,
          i = this._blockSize,
          a = e.length,
          o = this._len,
          s = 0;
        s < a;

      ) {
        for (var l = o % i, c = Math.min(a - s, i - l), d = 0; d < c; d++) {
          n[l + d] = e[s + d];
        }
        o += c;
        s += c;

        if (o % i == 0) {
          this._update(n);
        }
      }
      this._len += a;
      return this;
    };

    i.prototype.digest = function (e) {
      var t = this._len % this._blockSize;
      this._block[t] = 128;
      this._block.fill(0, t + 1);

      if (t >= this._finalSize) {
        this._update(this._block);
        this._block.fill(0);
      }

      var n = 8 * this._len;
      if (n <= 4294967295 /* 0xffffffff */) {
        this._block.writeUInt32BE(n, this._blockSize - 4);
      } else {
        var r = n >>> 0;

        this._block.writeUInt32BE(
          (n - r) / 4294967296 /* 0x100000000 */,
          this._blockSize - 8
        );

        this._block.writeUInt32BE(r, this._blockSize - 4);
      }
      this._update(this._block);
      var i = this._hash();
      return e ? i.toString(e) : i;
    };

    i.prototype._update = function () {
      throw Error("_update must be implemented by subclass");
    };

    e.exports = i;
  },
  4371: function (e, t, n) {
    var r = (e.exports = function (e) {
      var t = r[(e = e.toLowerCase())];
      if (!t) {
        throw Error(e + " is not supported (we accept pull requests)");
      }
      return new t();
    });
    r.sha = n(4018);
    r.sha1 = n(4179);
    r.sha224 = n(532);
    r.sha256 = n(1843);
    r.sha384 = n(7455);
    r.sha512 = n(9934);
  },
  4018: function (e, t, n) {
    var r = n(3782);
    var i = n(2858);
    var a = n(6911).Buffer;
    var o = [
      1518500249 /* 0x5a827999 */, 1859775393 /* 0x6ed9eba1 */,
      -1894007588 /* -0x70e44324 */, -899497514 /* -0x359d3e2a */,
    ];
    var s = Array(80);
    function l() {
      this.init();
      this._w = s;
      i.call(this, 64, 56);
    }
    r(l, i);

    l.prototype.init = function () {
      this._a = 1732584193 /* 0x67452301 */;
      this._b = 4023233417 /* 0xefcdab89 */;
      this._c = 2562383102 /* 0x98badcfe */;
      this._d = 271733878 /* 0x10325476 */;
      this._e = 3285377520 /* 0xc3d2e1f0 */;
      return this;
    };

    l.prototype._update = function (e) {
      for (
        var t = this._w,
          n = 0 | this._a,
          r = 0 | this._b,
          i = 0 | this._c,
          a = 0 | this._d,
          s = 0 | this._e,
          l = 0;
        l < 16;
        ++l
      ) {
        t[l] = e.readInt32BE(4 * l);
      }
      for (; l < 80; ++l) {
        t[l] = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16];
      }
      for (var c = 0; c < 80; ++c) {
        var d;
        var u;
        var p;
        var _;
        var f;
        var m = ~~(c / 20);

        var h =
          ((((d = n) << 5) | (d >>> 27)) +
            ((u = r),
            (p = i),
            (_ = a),
            m === 0
              ? (u & p) | (~u & _)
              : m === 2
              ? (u & p) | (u & _) | (p & _)
              : u ^ p ^ _) +
            s +
            t[c] +
            o[m]) |
          0;

        s = a;
        a = i;
        i = ((f = r) << 30) | (f >>> 2);
        r = n;
        n = h;
      }
      this._a = (n + this._a) | 0;
      this._b = (r + this._b) | 0;
      this._c = (i + this._c) | 0;
      this._d = (a + this._d) | 0;
      this._e = (s + this._e) | 0;
    };

    l.prototype._hash = function () {
      var e = a.allocUnsafe(20);
      e.writeInt32BE(0 | this._a, 0);
      e.writeInt32BE(0 | this._b, 4);
      e.writeInt32BE(0 | this._c, 8);
      e.writeInt32BE(0 | this._d, 12);
      e.writeInt32BE(0 | this._e, 16);
      return e;
    };

    e.exports = l;
  },
  4179: function (e, t, n) {
    var r = n(3782);
    var i = n(2858);
    var a = n(6911).Buffer;
    var o = [
      1518500249 /* 0x5a827999 */, 1859775393 /* 0x6ed9eba1 */,
      -1894007588 /* -0x70e44324 */, -899497514 /* -0x359d3e2a */,
    ];
    var s = Array(80);
    function l() {
      this.init();
      this._w = s;
      i.call(this, 64, 56);
    }
    r(l, i);

    l.prototype.init = function () {
      this._a = 1732584193 /* 0x67452301 */;
      this._b = 4023233417 /* 0xefcdab89 */;
      this._c = 2562383102 /* 0x98badcfe */;
      this._d = 271733878 /* 0x10325476 */;
      this._e = 3285377520 /* 0xc3d2e1f0 */;
      return this;
    };

    l.prototype._update = function (e) {
      for (
        var t = this._w,
          n = 0 | this._a,
          r = 0 | this._b,
          i = 0 | this._c,
          a = 0 | this._d,
          s = 0 | this._e,
          l = 0;
        l < 16;
        ++l
      ) {
        t[l] = e.readInt32BE(4 * l);
      }
      for (; l < 80; ++l) {
        t[l] =
          ((d = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16]) << 1) | (d >>> 31);
      }
      for (var c = 0; c < 80; ++c) {
        var d;
        var u;
        var p;
        var _;
        var f;
        var m;
        var h = ~~(c / 20);

        var g =
          ((((u = n) << 5) | (u >>> 27)) +
            ((p = r),
            (_ = i),
            (f = a),
            h === 0
              ? (p & _) | (~p & f)
              : h === 2
              ? (p & _) | (p & f) | (_ & f)
              : p ^ _ ^ f) +
            s +
            t[c] +
            o[h]) |
          0;

        s = a;
        a = i;
        i = ((m = r) << 30) | (m >>> 2);
        r = n;
        n = g;
      }
      this._a = (n + this._a) | 0;
      this._b = (r + this._b) | 0;
      this._c = (i + this._c) | 0;
      this._d = (a + this._d) | 0;
      this._e = (s + this._e) | 0;
    };

    l.prototype._hash = function () {
      var e = a.allocUnsafe(20);
      e.writeInt32BE(0 | this._a, 0);
      e.writeInt32BE(0 | this._b, 4);
      e.writeInt32BE(0 | this._c, 8);
      e.writeInt32BE(0 | this._d, 12);
      e.writeInt32BE(0 | this._e, 16);
      return e;
    };

    e.exports = l;
  },
  532: function (e, t, n) {
    var r = n(3782);
    var i = n(1843);
    var a = n(2858);
    var o = n(6911).Buffer;
    var s = Array(64);
    function l() {
      this.init();
      this._w = s;
      a.call(this, 64, 56);
    }
    r(l, i);

    l.prototype.init = function () {
      this._a = 3238371032 /* 0xc1059ed8 */;
      this._b = 914150663 /* 0x367cd507 */;
      this._c = 812702999 /* 0x3070dd17 */;
      this._d = 4144912697 /* 0xf70e5939 */;
      this._e = 4290775857 /* 0xffc00b31 */;
      this._f = 1750603025 /* 0x68581511 */;
      this._g = 1694076839 /* 0x64f98fa7 */;
      this._h = 3204075428 /* 0xbefa4fa4 */;
      return this;
    };

    l.prototype._hash = function () {
      var e = o.allocUnsafe(28);
      e.writeInt32BE(this._a, 0);
      e.writeInt32BE(this._b, 4);
      e.writeInt32BE(this._c, 8);
      e.writeInt32BE(this._d, 12);
      e.writeInt32BE(this._e, 16);
      e.writeInt32BE(this._f, 20);
      e.writeInt32BE(this._g, 24);
      return e;
    };

    e.exports = l;
  },
  1843: function (e, t, n) {
    var r = n(3782);
    var i = n(2858);
    var a = n(6911).Buffer;

    var o = [
      1116352408 /* 0x428a2f98 */, 1899447441 /* 0x71374491 */,
      3049323471 /* 0xb5c0fbcf */, 3921009573 /* 0xe9b5dba5 */,
      961987163 /* 0x3956c25b */, 1508970993 /* 0x59f111f1 */,
      2453635748 /* 0x923f82a4 */, 2870763221 /* 0xab1c5ed5 */,
      3624381080 /* 0xd807aa98 */, 310598401 /* 0x12835b01 */,
      607225278 /* 0x243185be */, 1426881987 /* 0x550c7dc3 */,
      1925078388 /* 0x72be5d74 */, 2162078206 /* 0x80deb1fe */,
      2614888103 /* 0x9bdc06a7 */, 3248222580 /* 0xc19bf174 */,
      3835390401 /* 0xe49b69c1 */, 4022224774 /* 0xefbe4786 */,
      264347078 /* 0xfc19dc6 */, 604807628 /* 0x240ca1cc */,
      770255983 /* 0x2de92c6f */, 1249150122 /* 0x4a7484aa */,
      1555081692 /* 0x5cb0a9dc */, 1996064986 /* 0x76f988da */,
      2554220882 /* 0x983e5152 */, 2821834349 /* 0xa831c66d */,
      2952996808 /* 0xb00327c8 */, 3210313671 /* 0xbf597fc7 */,
      3336571891 /* 0xc6e00bf3 */, 3584528711 /* 0xd5a79147 */,
      113926993 /* 0x6ca6351 */, 338241895 /* 0x14292967 */,
      666307205 /* 0x27b70a85 */, 773529912 /* 0x2e1b2138 */,
      1294757372 /* 0x4d2c6dfc */, 1396182291 /* 0x53380d13 */,
      1695183700 /* 0x650a7354 */, 1986661051 /* 0x766a0abb */,
      2177026350 /* 0x81c2c92e */, 2456956037 /* 0x92722c85 */,
      2730485921 /* 0xa2bfe8a1 */, 2820302411 /* 0xa81a664b */,
      3259730800 /* 0xc24b8b70 */, 3345764771 /* 0xc76c51a3 */,
      3516065817 /* 0xd192e819 */, 3600352804 /* 0xd6990624 */,
      4094571909 /* 0xf40e3585 */, 275423344 /* 0x106aa070 */,
      430227734 /* 0x19a4c116 */, 506948616 /* 0x1e376c08 */,
      659060556 /* 0x2748774c */, 883997877 /* 0x34b0bcb5 */,
      958139571 /* 0x391c0cb3 */, 1322822218 /* 0x4ed8aa4a */,
      1537002063 /* 0x5b9cca4f */, 1747873779 /* 0x682e6ff3 */,
      1955562222 /* 0x748f82ee */, 2024104815 /* 0x78a5636f */,
      2227730452 /* 0x84c87814 */, 2361852424 /* 0x8cc70208 */,
      2428436474 /* 0x90befffa */, 2756734187 /* 0xa4506ceb */,
      3204031479 /* 0xbef9a3f7 */, 3329325298 /* 0xc67178f2 */,
    ];

    var s = Array(64);
    function l() {
      this.init();
      this._w = s;
      i.call(this, 64, 56);
    }
    r(l, i);

    l.prototype.init = function () {
      this._a = 1779033703 /* 0x6a09e667 */;
      this._b = 3144134277 /* 0xbb67ae85 */;
      this._c = 1013904242 /* 0x3c6ef372 */;
      this._d = 2773480762 /* 0xa54ff53a */;
      this._e = 1359893119 /* 0x510e527f */;
      this._f = 2600822924 /* 0x9b05688c */;
      this._g = 528734635 /* 0x1f83d9ab */;
      this._h = 1541459225 /* 0x5be0cd19 */;
      return this;
    };

    l.prototype._update = function (e) {
      var c = 0 | this._g;
      var d = 0 | this._h;
      for (
        var t = this._w,
          n = 0 | this._a,
          r = 0 | this._b,
          i = 0 | this._c,
          a = 0 | this._d,
          s = 0 | this._e,
          l = 0 | this._f,
          u = 0;
        u < 16;
        ++u
      ) {
        t[u] = e.readInt32BE(4 * u);
      }
      for (; u < 64; ++u) {
        t[u] =
          (((((_ = t[u - 2]) >>> 17) | (_ << 15)) ^
            ((_ >>> 19) | (_ << 13)) ^
            (_ >>> 10)) +
            t[u - 7] +
            ((((f = t[u - 15]) >>> 7) | (f << 25)) ^
              ((f >>> 18) | (f << 14)) ^
              (f >>> 3)) +
            t[u - 16]) |
          0;
      }
      for (var p = 0; p < 64; ++p) {
        var _;
        var f;
        var m;
        var h;
        var g;
        var y;
        var b;
        var x;
        var S;

        var k =
          (d +
            ((((m = s) >>> 6) | (m << 26)) ^
              ((m >>> 11) | (m << 21)) ^
              ((m >>> 25) | (m << 7))) +
            ((h = s), (g = l), (y = c) ^ (h & (g ^ y))) +
            o[p] +
            t[p]) |
          0;

        var T =
          (((((b = n) >>> 2) | (b << 30)) ^
            ((b >>> 13) | (b << 19)) ^
            ((b >>> 22) | (b << 10))) +
            (((x = n) & (S = r)) | (i & (x | S)))) |
          0;

        d = c;
        c = l;
        l = s;
        s = (a + k) | 0;
        a = i;
        i = r;
        r = n;
        n = (k + T) | 0;
      }
      this._a = (n + this._a) | 0;
      this._b = (r + this._b) | 0;
      this._c = (i + this._c) | 0;
      this._d = (a + this._d) | 0;
      this._e = (s + this._e) | 0;
      this._f = (l + this._f) | 0;
      this._g = (c + this._g) | 0;
      this._h = (d + this._h) | 0;
    };

    l.prototype._hash = function () {
      var e = a.allocUnsafe(32);
      e.writeInt32BE(this._a, 0);
      e.writeInt32BE(this._b, 4);
      e.writeInt32BE(this._c, 8);
      e.writeInt32BE(this._d, 12);
      e.writeInt32BE(this._e, 16);
      e.writeInt32BE(this._f, 20);
      e.writeInt32BE(this._g, 24);
      e.writeInt32BE(this._h, 28);
      return e;
    };

    e.exports = l;
  },
  7455: function (e, t, n) {
    var r = n(3782);
    var i = n(9934);
    var a = n(2858);
    var o = n(6911).Buffer;
    var s = Array(160);
    function l() {
      this.init();
      this._w = s;
      a.call(this, 128, 112);
    }
    r(l, i);

    l.prototype.init = function () {
      this._ah = 3418070365 /* 0xcbbb9d5d */;
      this._bh = 1654270250 /* 0x629a292a */;
      this._ch = 2438529370 /* 0x9159015a */;
      this._dh = 355462360 /* 0x152fecd8 */;
      this._eh = 1731405415 /* 0x67332667 */;
      this._fh = 2394180231 /* 0x8eb44a87 */;
      this._gh = 3675008525 /* 0xdb0c2e0d */;
      this._hh = 1203062813 /* 0x47b5481d */;
      this._al = 3238371032 /* 0xc1059ed8 */;
      this._bl = 914150663 /* 0x367cd507 */;
      this._cl = 812702999 /* 0x3070dd17 */;
      this._dl = 4144912697 /* 0xf70e5939 */;
      this._el = 4290775857 /* 0xffc00b31 */;
      this._fl = 1750603025 /* 0x68581511 */;
      this._gl = 1694076839 /* 0x64f98fa7 */;
      this._hl = 3204075428 /* 0xbefa4fa4 */;
      return this;
    };

    l.prototype._hash = function () {
      var e = o.allocUnsafe(48);
      function t(t, n, r) {
        e.writeInt32BE(t, r);
        e.writeInt32BE(n, r + 4);
      }
      t(this._ah, this._al, 0);
      t(this._bh, this._bl, 8);
      t(this._ch, this._cl, 16);
      t(this._dh, this._dl, 24);
      t(this._eh, this._el, 32);
      t(this._fh, this._fl, 40);
      return e;
    };

    e.exports = l;
  },
  9934: function (e, t, n) {
    var r = n(3782);
    var i = n(2858);
    var a = n(6911).Buffer;

    var o = [
      1116352408 /* 0x428a2f98 */, 3609767458 /* 0xd728ae22 */,
      1899447441 /* 0x71374491 */, 602891725 /* 0x23ef65cd */,
      3049323471 /* 0xb5c0fbcf */, 3964484399 /* 0xec4d3b2f */,
      3921009573 /* 0xe9b5dba5 */, 2173295548 /* 0x8189dbbc */,
      961987163 /* 0x3956c25b */, 4081628472 /* 0xf348b538 */,
      1508970993 /* 0x59f111f1 */, 3053834265 /* 0xb605d019 */,
      2453635748 /* 0x923f82a4 */, 2937671579 /* 0xaf194f9b */,
      2870763221 /* 0xab1c5ed5 */, 3664609560 /* 0xda6d8118 */,
      3624381080 /* 0xd807aa98 */, 2734883394 /* 0xa3030242 */,
      310598401 /* 0x12835b01 */, 1164996542 /* 0x45706fbe */,
      607225278 /* 0x243185be */, 1323610764 /* 0x4ee4b28c */,
      1426881987 /* 0x550c7dc3 */, 3590304994 /* 0xd5ffb4e2 */,
      1925078388 /* 0x72be5d74 */, 4068182383 /* 0xf27b896f */,
      2162078206 /* 0x80deb1fe */, 991336113 /* 0x3b1696b1 */,
      2614888103 /* 0x9bdc06a7 */, 633803317 /* 0x25c71235 */,
      3248222580 /* 0xc19bf174 */, 3479774868 /* 0xcf692694 */,
      3835390401 /* 0xe49b69c1 */, 2666613458 /* 0x9ef14ad2 */,
      4022224774 /* 0xefbe4786 */, 944711139 /* 0x384f25e3 */,
      264347078 /* 0xfc19dc6 */, 2341262773 /* 0x8b8cd5b5 */,
      604807628 /* 0x240ca1cc */, 2007800933 /* 0x77ac9c65 */,
      770255983 /* 0x2de92c6f */, 1495990901 /* 0x592b0275 */,
      1249150122 /* 0x4a7484aa */, 1856431235 /* 0x6ea6e483 */,
      1555081692 /* 0x5cb0a9dc */, 3175218132 /* 0xbd41fbd4 */,
      1996064986 /* 0x76f988da */, 2198950837 /* 0x831153b5 */,
      2554220882 /* 0x983e5152 */, 3999719339 /* 0xee66dfab */,
      2821834349 /* 0xa831c66d */, 766784016 /* 0x2db43210 */,
      2952996808 /* 0xb00327c8 */, 2566594879 /* 0x98fb213f */,
      3210313671 /* 0xbf597fc7 */, 3203337956 /* 0xbeef0ee4 */,
      3336571891 /* 0xc6e00bf3 */, 1034457026 /* 0x3da88fc2 */,
      3584528711 /* 0xd5a79147 */, 2466948901 /* 0x930aa725 */,
      113926993 /* 0x6ca6351 */, 3758326383 /* 0xe003826f */,
      338241895 /* 0x14292967 */, 168717936 /* 0xa0e6e70 */,
      666307205 /* 0x27b70a85 */, 1188179964 /* 0x46d22ffc */,
      773529912 /* 0x2e1b2138 */, 1546045734 /* 0x5c26c926 */,
      1294757372 /* 0x4d2c6dfc */, 1522805485 /* 0x5ac42aed */,
      1396182291 /* 0x53380d13 */, 2643833823 /* 0x9d95b3df */,
      1695183700 /* 0x650a7354 */, 2343527390 /* 0x8baf63de */,
      1986661051 /* 0x766a0abb */, 1014477480 /* 0x3c77b2a8 */,
      2177026350 /* 0x81c2c92e */, 1206759142 /* 0x47edaee6 */,
      2456956037 /* 0x92722c85 */, 344077627 /* 0x1482353b */,
      2730485921 /* 0xa2bfe8a1 */, 1290863460 /* 0x4cf10364 */,
      2820302411 /* 0xa81a664b */, 3158454273 /* 0xbc423001 */,
      3259730800 /* 0xc24b8b70 */, 3505952657 /* 0xd0f89791 */,
      3345764771 /* 0xc76c51a3 */, 106217008 /* 0x654be30 */,
      3516065817 /* 0xd192e819 */, 3606008344 /* 0xd6ef5218 */,
      3600352804 /* 0xd6990624 */, 1432725776 /* 0x5565a910 */,
      4094571909 /* 0xf40e3585 */, 1467031594 /* 0x5771202a */,
      275423344 /* 0x106aa070 */, 851169720 /* 0x32bbd1b8 */,
      430227734 /* 0x19a4c116 */, 3100823752 /* 0xb8d2d0c8 */,
      506948616 /* 0x1e376c08 */, 1363258195 /* 0x5141ab53 */,
      659060556 /* 0x2748774c */, 3750685593 /* 0xdf8eeb99 */,
      883997877 /* 0x34b0bcb5 */, 3785050280 /* 0xe19b48a8 */,
      958139571 /* 0x391c0cb3 */, 3318307427 /* 0xc5c95a63 */,
      1322822218 /* 0x4ed8aa4a */, 3812723403 /* 0xe3418acb */,
      1537002063 /* 0x5b9cca4f */, 2003034995 /* 0x7763e373 */,
      1747873779 /* 0x682e6ff3 */, 3602036899 /* 0xd6b2b8a3 */,
      1955562222 /* 0x748f82ee */, 1575990012 /* 0x5defb2fc */,
      2024104815 /* 0x78a5636f */, 1125592928 /* 0x43172f60 */,
      2227730452 /* 0x84c87814 */, 2716904306 /* 0xa1f0ab72 */,
      2361852424 /* 0x8cc70208 */, 442776044 /* 0x1a6439ec */,
      2428436474 /* 0x90befffa */, 593698344 /* 0x23631e28 */,
      2756734187 /* 0xa4506ceb */, 3733110249 /* 0xde82bde9 */,
      3204031479 /* 0xbef9a3f7 */, 2999351573 /* 0xb2c67915 */,
      3329325298 /* 0xc67178f2 */, 3815920427 /* 0xe372532b */,
      3391569614 /* 0xca273ece */, 3928383900 /* 0xea26619c */,
      3515267271 /* 0xd186b8c7 */, 566280711 /* 0x21c0c207 */,
      3940187606 /* 0xeada7dd6 */, 3454069534 /* 0xcde0eb1e */,
      4118630271 /* 0xf57d4f7f */, 4000239992 /* 0xee6ed178 */,
      116418474 /* 0x6f067aa */, 1914138554 /* 0x72176fba */,
      174292421 /* 0xa637dc5 */, 2731055270 /* 0xa2c898a6 */,
      289380356 /* 0x113f9804 */, 3203993006 /* 0xbef90dae */,
      460393269 /* 0x1b710b35 */, 320620315 /* 0x131c471b */,
      685471733 /* 0x28db77f5 */, 587496836 /* 0x23047d84 */,
      852142971 /* 0x32caab7b */, 1086792851 /* 0x40c72493 */,
      1017036298 /* 0x3c9ebe0a */, 365543100 /* 0x15c9bebc */,
      1126000580 /* 0x431d67c4 */, 2618297676 /* 0x9c100d4c */,
      1288033470 /* 0x4cc5d4be */, 3409855158 /* 0xcb3e42b6 */,
      1501505948 /* 0x597f299c */, 4234509866 /* 0xfc657e2a */,
      1607167915 /* 0x5fcb6fab */, 987167468 /* 0x3ad6faec */,
      1816402316 /* 0x6c44198c */, 1246189591 /* 0x4a475817 */,
    ];

    var s = Array(160);
    function l() {
      this.init();
      this._w = s;
      i.call(this, 128, 112);
    }
    function c(e, t) {
      return (
        ((e >>> 28) | (t << 4)) ^
        ((t >>> 2) | (e << 30)) ^
        ((t >>> 7) | (e << 25))
      );
    }
    function d(e, t) {
      return (
        ((e >>> 14) | (t << 18)) ^
        ((e >>> 18) | (t << 14)) ^
        ((t >>> 9) | (e << 23))
      );
    }
    function u(e, t) {
      return +(e >>> 0 < t >>> 0);
    }
    r(l, i);

    l.prototype.init = function () {
      this._ah = 1779033703 /* 0x6a09e667 */;
      this._bh = 3144134277 /* 0xbb67ae85 */;
      this._ch = 1013904242 /* 0x3c6ef372 */;
      this._dh = 2773480762 /* 0xa54ff53a */;
      this._eh = 1359893119 /* 0x510e527f */;
      this._fh = 2600822924 /* 0x9b05688c */;
      this._gh = 528734635 /* 0x1f83d9ab */;
      this._hh = 1541459225 /* 0x5be0cd19 */;
      this._al = 4089235720 /* 0xf3bcc908 */;
      this._bl = 2227873595 /* 0x84caa73b */;
      this._cl = 4271175723 /* 0xfe94f82b */;
      this._dl = 1595750129 /* 0x5f1d36f1 */;
      this._el = 2917565137 /* 0xade682d1 */;
      this._fl = 725511199 /* 0x2b3e6c1f */;
      this._gl = 4215389547 /* 0xfb41bd6b */;
      this._hl = 327033209 /* 0x137e2179 */;
      return this;
    };

    l.prototype._update = function (e) {
      var p = 0 | this._gh;
      var _ = 0 | this._hh;
      var f = 0 | this._al;
      var m = 0 | this._bl;
      var h = 0 | this._cl;
      var g = 0 | this._dl;
      var y = 0 | this._el;
      var b = 0 | this._fl;
      var x = 0 | this._gl;
      var S = 0 | this._hl;
      for (
        var t = this._w,
          n = 0 | this._ah,
          r = 0 | this._bh,
          i = 0 | this._ch,
          a = 0 | this._dh,
          s = 0 | this._eh,
          l = 0 | this._fh,
          k = 0;
        k < 32;
        k += 2
      ) {
        t[k] = e.readInt32BE(4 * k);
        t[k + 1] = e.readInt32BE(4 * k + 4);
      }
      for (; k < 160; k += 2) {
        var T;
        var E;
        var C;
        var A;
        var w;
        var D;
        var N;
        var I;
        var P = t[k - 30];
        var M = t[k - 30 + 1];

        var L =
          (((T = P) >>> 1) | ((E = M) << 31)) ^
          ((T >>> 8) | (E << 24)) ^
          (T >>> 7);

        var R =
          (((C = M) >>> 1) | ((A = P) << 31)) ^
          ((C >>> 8) | (A << 24)) ^
          ((C >>> 7) | (A << 25));

        P = t[k - 4];
        M = t[k - 4 + 1];

        var F =
          (((w = P) >>> 19) | ((D = M) << 13)) ^
          ((D >>> 29) | (w << 3)) ^
          (w >>> 6);

        var O =
          (((N = M) >>> 19) | ((I = P) << 13)) ^
          ((I >>> 29) | (N << 3)) ^
          ((N >>> 6) | (I << 26));

        var B = t[k - 14];
        var W = t[k - 14 + 1];
        var j = t[k - 32];
        var z = t[k - 32 + 1];
        var V = (R + W) | 0;
        var G = (L + B + u(V, R)) | 0;

        G =
          ((G = (G + F + u((V = (V + O) | 0), O)) | 0) +
            j +
            u((V = (V + z) | 0), z)) |
          0;

        t[k] = G;
        t[k + 1] = V;
      }
      for (var K = 0; K < 160; K += 2) {
        G = t[K];
        V = t[K + 1];
        var U;
        var H;
        var q;
        var J;
        var $;
        var X;
        var Y;
        var Q;
        var Z;
        var ee;
        var et = ((U = n) & (H = r)) | (i & (U | H));
        var en = ((q = f) & (J = m)) | (h & (q | J));
        var er = c(n, f);
        var ei = c(f, n);
        var ea = d(s, y);
        var eo = d(y, s);
        var o_K = o[K];
        var el = o[K + 1];
        $ = s;
        X = l;
        var ec = (Y = p) ^ ($ & (X ^ Y));
        Q = y;
        Z = b;
        var ed = (ee = x) ^ (Q & (Z ^ ee));
        var eu = (S + eo) | 0;
        var ep = (_ + ea + u(eu, S)) | 0;
        ep =
          ((ep =
            ((ep = (ep + ec + u((eu = (eu + ed) | 0), ed)) | 0) +
              o_K +
              u((eu = (eu + el) | 0), el)) |
            0) +
            G +
            u((eu = (eu + V) | 0), V)) |
          0;
        var e_ = (ei + en) | 0;
        var ef = (er + et + u(e_, ei)) | 0;
        _ = p;
        S = x;
        p = l;
        x = b;
        l = s;
        b = y;
        s = (a + ep + u((y = (g + eu) | 0), g)) | 0;
        a = i;
        g = h;
        i = r;
        h = m;
        r = n;
        m = f;
        n = (ep + ef + u((f = (eu + e_) | 0), eu)) | 0;
      }
      this._al = (this._al + f) | 0;
      this._bl = (this._bl + m) | 0;
      this._cl = (this._cl + h) | 0;
      this._dl = (this._dl + g) | 0;
      this._el = (this._el + y) | 0;
      this._fl = (this._fl + b) | 0;
      this._gl = (this._gl + x) | 0;
      this._hl = (this._hl + S) | 0;
      this._ah = (this._ah + n + u(this._al, f)) | 0;
      this._bh = (this._bh + r + u(this._bl, m)) | 0;
      this._ch = (this._ch + i + u(this._cl, h)) | 0;
      this._dh = (this._dh + a + u(this._dl, g)) | 0;
      this._eh = (this._eh + s + u(this._el, y)) | 0;
      this._fh = (this._fh + l + u(this._fl, b)) | 0;
      this._gh = (this._gh + p + u(this._gl, x)) | 0;
      this._hh = (this._hh + _ + u(this._hl, S)) | 0;
    };

    l.prototype._hash = function () {
      var e = a.allocUnsafe(64);
      function t(t, n, r) {
        e.writeInt32BE(t, r);
        e.writeInt32BE(n, r + 4);
      }
      t(this._ah, this._al, 0);
      t(this._bh, this._bl, 8);
      t(this._ch, this._cl, 16);
      t(this._dh, this._dl, 24);
      t(this._eh, this._el, 32);
      t(this._fh, this._fl, 40);
      t(this._gh, this._gl, 48);
      t(this._hh, this._hl, 56);
      return e;
    };

    e.exports = l;
  },
  3704: function (e, t, n) {
    var r = n(5055).Buffer;

    var i =
      r.isEncoding ||
      function (e) {
        switch ((e = "" + e) && e.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw": {
            return true;
          }
          default: {
            return false;
          }
        }
      };

    function a(e) {
      var t;

      this.encoding = (function (e) {
        var t = (function (e) {
          var t;
          if (!e) {
            return "utf8";
          }

          while (true) {
            switch (e) {
              case "utf8":
              case "utf-8": {
                return "utf8";
              }
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le": {
                return "utf16le";
              }
              case "latin1":
              case "binary": {
                return "latin1";
              }
              case "base64":
              case "ascii":
              case "hex": {
                return e;
              }
              default: {
                if (t) {
                  return;
                }
                e = ("" + e).toLowerCase();
                t = true;
              }
            }
          }
        })(e);
        if (typeof t != "string" && (r.isEncoding === i || !i(e))) {
          throw Error("Unknown encoding: " + e);
        }
        return t || e;
      })(e);

      switch (this.encoding) {
        case "utf16le": {
          this.text = l;
          this.end = c;
          t = 4;
          break;
        }
        case "utf8": {
          this.fillLast = s;
          t = 4;
          break;
        }
        case "base64": {
          this.text = d;
          this.end = u;
          t = 3;
          break;
        }
        default: {
          this.write = p;
          this.end = _;
          return;
        }
      }

      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = r.allocUnsafe(t);
    }
    function o(e) {
      return e <= 127
        ? 0
        : e >> 5 == 6
        ? 2
        : e >> 4 == 14
        ? 3
        : e >> 3 == 30
        ? 4
        : e >> 6 == 2
        ? -1
        : -2;
    }
    function s(e) {
      var t = this.lastTotal - this.lastNeed;

      var n = (function (e, t, n) {
        if ((192 & t[0]) != 128) {
          e.lastNeed = 0;
          return "�";
        }
        if (e.lastNeed > 1 && t.length > 1) {
          if ((192 & t[1]) != 128) {
            e.lastNeed = 1;
            return "�";
          }
          if (e.lastNeed > 2 && t.length > 2 && (192 & t[2]) != 128) {
            e.lastNeed = 2;
            return "�";
          }
        }
      })(this, e, 0);

      return n !== undefined
        ? n
        : this.lastNeed <= e.length
        ? (e.copy(this.lastChar, t, 0, this.lastNeed),
          this.lastChar.toString(this.encoding, 0, this.lastTotal))
        : void (e.copy(this.lastChar, t, 0, e.length),
          (this.lastNeed -= e.length));
    }
    function l(e, t) {
      if ((e.length - t) % 2 == 0) {
        var n = e.toString("utf16le", t);
        if (n) {
          var r = n.charCodeAt(n.length - 1);
          if (r >= 55296 && r <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = e[e.length - 2];
            this.lastChar[1] = e[e.length - 1];
            return n.slice(0, -1);
          }
        }
        return n;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = e[e.length - 1];
      return e.toString("utf16le", t, e.length - 1);
    }
    function c(e) {
      var t = e && e.length ? this.write(e) : "";
      if (this.lastNeed) {
        var n = this.lastTotal - this.lastNeed;
        return t + this.lastChar.toString("utf16le", 0, n);
      }
      return t;
    }
    function d(e, t) {
      var n = (e.length - t) % 3;
      return n === 0
        ? e.toString("base64", t)
        : ((this.lastNeed = 3 - n),
          (this.lastTotal = 3),
          n === 1
            ? (this.lastChar[0] = e[e.length - 1])
            : ((this.lastChar[0] = e[e.length - 2]),
              (this.lastChar[1] = e[e.length - 1])),
          e.toString("base64", t, e.length - n));
    }
    function u(e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed
        ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
        : t;
    }
    function p(e) {
      return e.toString(this.encoding);
    }
    function _(e) {
      return e && e.length ? this.write(e) : "";
    }
    t.s = a;

    a.prototype.write = function (e) {
      var t;
      var n;
      if (e.length === 0) {
        return "";
      }
      if (this.lastNeed) {
        if (undefined === (t = this.fillLast(e))) {
          return "";
        }
        n = this.lastNeed;
        this.lastNeed = 0;
      } else {
        n = 0;
      }
      return n < e.length
        ? t
          ? t + this.text(e, n)
          : this.text(e, n)
        : t || "";
    };

    a.prototype.end = function (e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed ? t + "�" : t;
    };

    a.prototype.text = function (e, t) {
      var n = (function (e, t, n) {
        var r = t.length - 1;
        if (r < n) {
          return 0;
        }
        var i = o(t[r]);
        return i >= 0
          ? (i > 0 && (e.lastNeed = i - 1), i)
          : --r < n || -2 === i
          ? 0
          : (i = o(t[r])) >= 0
          ? (i > 0 && (e.lastNeed = i - 2), i)
          : --r < n || -2 === i
          ? 0
          : (i = o(t[r])) >= 0
          ? (i > 0 && (i === 2 ? (i = 0) : (e.lastNeed = i - 3)), i)
          : 0;
      })(this, e, t);
      if (!this.lastNeed) {
        return e.toString("utf8", t);
      }
      this.lastTotal = n;
      var r = e.length - (n - this.lastNeed);
      e.copy(this.lastChar, 0, r);
      return e.toString("utf8", t, r);
    };

    a.prototype.fillLast = function (e) {
      if (this.lastNeed <= e.length) {
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);

        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length);
      this.lastNeed -= e.length;
    };
  },
  6769: function (t) {
    t.exports = function (e, t) {
      if (n("noDeprecation")) {
        return e;
      }
      var r = false;
      return function (...args) {
        if (!r) {
          if (n("throwDeprecation")) {
            throw Error(t);
          }

          if (n("traceDeprecation")) {
            console.trace(t);
          } else {
            console.warn(t);
          }

          r = true;
        }
        return e.apply(this, args);
      };
    };
    function n(t) {
      try {
        if (!module.g.localStorage) {
          return false;
        }
      } catch (e) {
        return false;
      }
      var n = module.g.localStorage[t];
      return n != null && String(n).toLowerCase() === "true";
    }
  },
  4300: function (t) {
    t.exports = require(259390 /* wakaru:missing */);
  },
  6113: function (t) {
    t.exports = require("module-124263.js");
  },
  2361: function (t) {
    t.exports = require(679877 /* wakaru:missing */);
  },
  2781: function (t) {
    t.exports = require(359548 /* wakaru:missing */);
  },
  1576: function (t) {
    t.exports = require(826733 /* wakaru:missing */);
  },
  3837: function (t) {
    t.exports = require(824885 /* wakaru:missing */);
  },
  6144: function (t) {
    t.exports = require(991807 /* wakaru:missing */);
  },
  5866: function (e) {
    e.exports = JSON.parse(
      '{"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}'
    );
  },
  2908: function (e) {
    e.exports = JSON.parse(
      '{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}'
    );
  },
  9267: function (e) {
    e.exports = JSON.parse(
      '{"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}'
    );
  },
  7992: function (e) {
    e.exports = JSON.parse(
      '{"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}'
    );
  },
  2531: function (e) {
    e.exports = { i8: "6.5.3" };
  },
  2510: function (e) {
    e.exports = JSON.parse(
      '{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}'
    );
  },
};

var o = {};
function s(e) {
  var o_e = o[e];
  if (o_e !== undefined) {
    return o_e.exports;
  }
  var n = (o[e] = { id: e, loaded: false, exports: {} });
  var r = true;
  try {
    a[e].call(n.exports, n, n.exports, s);
    r = false;
  } finally {
    if (r) {
      delete o[e];
    }
  }
  n.loaded = true;
  return n.exports;
}

s.nmd = function (e) {
  e.paths = [];

  if (!e.children) {
    e.children = [];
  }

  return e;
};

s.ab =
  "/ROOT/node_modules/.pnpm/next@16.0.2-canary.24_patch_hash=gcu3wxnuyfwkkf5xpr5q3nci24_@babel+core@7.28.3_@opentelemetry_igsvcqjw6qpqi3bfxmrpsujan4/node_modules/next/dist/compiled/crypto-browserify/";
var l = {};

!(function () {
  l.randomBytes = l.rng = l.pseudoRandomBytes = l.prng = s(7223);
  l.createHash = l.Hash = s(9739);
  l.createHmac = l.Hmac = s(4873);
  var e = [
    "sha1",
    "sha224",
    "sha256",
    "sha384",
    "sha512",
    "md5",
    "rmd160",
  ].concat(Object.keys(s(9276)));
  l.getHashes = function () {
    return e;
  };
  var t = s(4978);
  l.pbkdf2 = t.pbkdf2;
  l.pbkdf2Sync = t.pbkdf2Sync;
  var n = s(8996);
  l.Cipher = n.Cipher;
  l.createCipher = n.createCipher;
  l.Cipheriv = n.Cipheriv;
  l.createCipheriv = n.createCipheriv;
  l.Decipher = n.Decipher;
  l.createDecipher = n.createDecipher;
  l.Decipheriv = n.Decipheriv;
  l.createDecipheriv = n.createDecipheriv;
  l.getCiphers = n.getCiphers;
  l.listCiphers = n.listCiphers;
  var r = s(6587);
  l.DiffieHellmanGroup = r.DiffieHellmanGroup;
  l.createDiffieHellmanGroup = r.createDiffieHellmanGroup;
  l.getDiffieHellman = r.getDiffieHellman;
  l.createDiffieHellman = r.createDiffieHellman;
  l.DiffieHellman = r.DiffieHellman;
  var i = s(4078);
  l.createSign = i.createSign;
  l.Sign = i.Sign;
  l.createVerify = i.createVerify;
  l.Verify = i.Verify;
  l.createECDH = s(9942);
  var a = s(9783);
  l.publicEncrypt = a.publicEncrypt;
  l.privateEncrypt = a.privateEncrypt;
  l.publicDecrypt = a.publicDecrypt;
  l.privateDecrypt = a.privateDecrypt;
  var o = s(6445);
  l.randomFill = o.randomFill;
  l.randomFillSync = o.randomFillSync;

  l.createCredentials = function () {
    throw Error(
      "sorry, createCredentials is not implemented yet\nwe accept pull requests\nhttps://github.com/crypto-browserify/crypto-browserify"
    );
  };

  l.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6,
  };
})();

__unused.exports = l;
