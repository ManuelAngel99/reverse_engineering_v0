import r, { parseClass } from "module-675897.js";
import i, { unescape } from "module-17462.js";
let a = new Set(["!", "?", "+", "*", "@"]);

let o = (e) => a.has(e);

let s = "(?!\\.)";
let l = new Set(["[", "."]);
let c = new Set(["..", "."]);
let d = new Set("().*{}+?[]^$\\!");

let u = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

let p = "[^/]";
let _ = `${p}*?`;
let f = `${p}+?`;

export class AST {
  type;
  #e;
  #t;
  #n = false;
  #r = [];
  #i;
  #a;
  #o;
  #s = false;
  #l;
  #c;
  #d = false;
  constructor(e, t, n = {}) {
    this.type = e;

    if (e) {
      this.#t = true;
    }

    this.#i = t;
    this.#e = this.#i ? this.#i.#e : this;
    this.#l = this.#e === this ? n : this.#e.#l;
    this.#o = this.#e === this ? [] : this.#e.#o;

    if (e === "!" && !this.#e.#s) {
      this.#o.push(this);
    }

    this.#a = this.#i ? this.#i.#r.length : 0;
  }
  get hasMagic() {
    if (this.#t !== undefined) {
      return this.#t;
    }
    for (let e of this.#r) {
      if (typeof e != "string" && (e.type || e.hasMagic)) {
        return (this.#t = true);
      }
    }
    return this.#t;
  }
  toString() {
    if (this.#c !== undefined) {
      return this.#c;
    }

    if (this.type) {
      return (this.#c = `${this.type}(${this.#r
        .map((e) => String(e))
        .join("|")})`);
    }

    return (this.#c = this.#r.map((e) => String(e)).join(""));
  }
  #u() {
    let e;
    if (this !== this.#e) {
      throw Error("should only call on root");
    }
    if (this.#s) {
      return this;
    }
    this.toString();

    for (this.#s = true; (e = this.#o.pop()); ) {
      if (e.type !== "!") {
        continue;
      }
      let t = e;
      let n = t.#i;

      while (n) {
        for (let r = t.#a + 1; !n.type && r < n.#r.length; r++) {
          for (let t of e.#r) {
            if (typeof t == "string") {
              throw Error("string part in extglob AST??");
            }
            t.copyIn(n.#r[r]);
          }
        }
        n = (t = n).#i;
      }
    }

    return this;
  }
  push(...e) {
    for (let t of e) {
      if (t !== "") {
        if (typeof t != "string" && !(t instanceof AST && t.#i === this)) {
          throw Error(`invalid part: ${t}`);
        }
        this.#r.push(t);
      }
    }
  }
  toJSON() {
    let e =
      this.type === null
        ? this.#r.slice().map((e) => (typeof e == "string" ? e : e.toJSON()))
        : [this.type, ...this.#r.map((e) => e.toJSON())];

    if (this.isStart() && !this.type) {
      e.unshift([]);
    }

    if (
      this.isEnd() &&
      (this === this.#e || (this.#e.#s && this.#i?.type === "!"))
    ) {
      e.push({});
    }

    return e;
  }
  isStart() {
    if (this.#e === this) {
      return true;
    }
    if (!this.#i?.isStart()) {
      return false;
    }
    if (this.#a === 0) {
      return true;
    }
    let e = this.#i;
    for (let t = 0; t < this.#a; t++) {
      let n = e.#r[t];
      if (!(n instanceof AST && n.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    if (this.#e === this || this.#i?.type === "!") {
      return true;
    }
    if (!this.#i?.isEnd()) {
      return false;
    }
    if (!this.type) {
      return this.#i?.isEnd();
    }
    let e = this.#i ? this.#i.#r.length : 0;
    return this.#a === e - 1;
  }
  copyIn(e) {
    if (typeof e == "string") {
      this.push(e);
    } else {
      this.push(e.clone(this));
    }
  }
  clone(e) {
    let t = new AST(this.type, e);
    for (let e of this.#r) {
      t.copyIn(e);
    }
    return t;
  }
  static #p(e, t, n, r) {
    let i = false;
    let a = false;
    let s = -1;
    let l = false;
    if (t.type === null) {
      let c = n;
      let d = "";

      while (c < e.length) {
        let n = e.charAt(c++);
        if (i || n === "\\") {
          i = !i;
          d += n;
          continue;
        }
        if (a) {
          if (c === s + 1) {
            if (n === "^" || n === "!") {
              l = true;
            }
          } else if (n === "]" && (c !== s + 2 || !l)) {
            a = false;
          }

          d += n;
          continue;
        }
        if (n === "[") {
          a = true;
          s = c;
          l = false;
          d += n;
          continue;
        }
        if (!r.noext && o(n) && e.charAt(c) === "(") {
          t.push(d);
          d = "";
          let i = new AST(n, t);
          c = AST.#p(e, i, c, r);
          t.push(i);
          continue;
        }
        d += n;
      }

      t.push(d);
      return c;
    }
    let c = n + 1;
    let d = new AST(null, t);
    let u = [];
    let p = "";

    while (c < e.length) {
      let n = e.charAt(c++);
      if (i || n === "\\") {
        i = !i;
        p += n;
        continue;
      }
      if (a) {
        if (c === s + 1) {
          if (n === "^" || n === "!") {
            l = true;
          }
        } else if (n === "]" && (c !== s + 2 || !l)) {
          a = false;
        }

        p += n;
        continue;
      }
      if (n === "[") {
        a = true;
        s = c;
        l = false;
        p += n;
        continue;
      }
      if (o(n) && e.charAt(c) === "(") {
        d.push(p);
        p = "";
        let t = new AST(n, d);
        d.push(t);
        c = AST.#p(e, t, c, r);
        continue;
      }
      if (n === "|") {
        d.push(p);
        p = "";
        u.push(d);
        d = new AST(null, t);
        continue;
      }
      if (n === ")") {
        if (p === "" && t.#r.length === 0) {
          t.#d = true;
        }

        d.push(p);
        p = "";
        t.push(...u, d);
        return c;
      }
      p += n;
    }

    t.type = null;
    t.#t = undefined;
    t.#r = [e.substring(n - 1)];
    return c;
  }
  static fromGlob(e, t = {}) {
    let n = new AST(null, undefined, t);
    AST.#p(e, n, 0, t);
    return n;
  }
  toMMPattern() {
    if (this !== this.#e) {
      return this.#e.toMMPattern();
    }
    let e = this.toString();
    let [t, n, r, i] = this.toRegExpSource();
    return r ||
      this.#t ||
      (this.#l.nocase &&
        !this.#l.nocaseMagicOnly &&
        e.toUpperCase() !== e.toLowerCase())
      ? Object.assign(
          RegExp(`^${t}$`, (this.#l.nocase ? "i" : "") + (i ? "u" : "")),
          { _src: t, _glob: e }
        )
      : n;
  }
  get options() {
    return this.#l;
  }
  toRegExpSource(e) {
    let t = e ?? !!this.#l.dot;

    if (this.#e === this) {
      this.#u();
    }

    if (!this.type) {
      let n = this.isStart() && this.isEnd();

      let r = this.#r
        .map((t) => {
          let [r, i, a, o] =
            typeof t == "string" ? AST.#_(t, this.#t, n) : t.toRegExpSource(e);
          this.#t = this.#t || a;
          this.#n = this.#n || o;
          return r;
        })
        .join("");

      let a = "";
      if (
        this.isStart() &&
        typeof this.#r[0] == "string" &&
        !(this.#r.length === 1 && c.has(this.#r[0]))
      ) {
        let n =
          (t && l.has(r.charAt(0))) ||
          (r.startsWith("\\.") && l.has(r.charAt(2))) ||
          (r.startsWith("\\.\\.") && l.has(r.charAt(4)));

        let i = !t && !e && l.has(r.charAt(0));
        a = n ? "(?!(?:^|/)\\.\\.?(?:$|/))" : i ? s : "";
      }
      let o = "";

      if (this.isEnd() && this.#e.#s && this.#i?.type === "!") {
        o = "(?:$|\\/)";
      }

      return [a + r + o, unescape(r), (this.#t = !!this.#t), this.#n];
    }

    let n = this.type === "*" || this.type === "+";
    let r = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let a = this.#f(t);
    if (this.isStart() && this.isEnd() && !a && this.type !== "!") {
      let e = this.toString();
      this.#r = [e];
      this.type = null;
      this.#t = undefined;
      return [e, unescape(this.toString()), false, false];
    }
    let o = !n || e || t || !s ? "" : this.#f(true);

    if (o === a) {
      o = "";
    }

    if (o) {
      a = `(?:${a})(?:${o})*?`;
    }

    return [
      this.type === "!" && this.#d
        ? (this.isStart() && !t ? s : "") + f
        : r +
          a +
          (this.type === "!"
            ? `))${!this.isStart() || t || e ? "" : s}${_})`
            : this.type === "@"
            ? ")"
            : this.type === "?"
            ? ")?"
            : this.type === "+" && o
            ? ")"
            : this.type === "*" && o
            ? ")?"
            : `)${this.type}`),
      unescape(a),
      (this.#t = !!this.#t),
      this.#n,
    ];
  }
  #f(e) {
    return this.#r
      .map((t) => {
        if (typeof t == "string") {
          throw Error("string type in extglob ast??");
        }
        let [n, r, i, a] = t.toRegExpSource(e);
        this.#n = this.#n || a;
        return n;
      })
      .filter((e) => !(this.isStart() && this.isEnd()) || !!e)
      .join("|");
  }
  static #_(e, t, n = false) {
    let a = false;
    let o = "";
    let s = false;
    for (let i = 0; i < e.length; i++) {
      let l = e.charAt(i);
      if (a) {
        a = false;
        o += (d.has(l) ? "\\" : "") + l;
        continue;
      }
      if (l === "\\") {
        if (i === e.length - 1) {
          o += "\\\\";
        } else {
          a = true;
        }

        continue;
      }
      if (l === "[") {
        let [n, a, l, c] = parseClass(e, i);
        if (l) {
          o += n;
          s = s || a;
          i += l - 1;
          t = t || c;
          continue;
        }
      }
      if (l === "*") {
        if (n && e === "*") {
          o += f;
        } else {
          o += _;
        }

        t = true;
        continue;
      }
      if (l === "?") {
        o += p;
        t = true;
        continue;
      }
      o += u(l);
    }
    return [o, unescape(e), !!t, s];
  }
}
