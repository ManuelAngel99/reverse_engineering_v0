const r = require(31269 /* wakaru:missing */);
module.e;

((exports) => {
  let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let n = new Uint8Array(64);
  let i = new Uint8Array(128);
  for (let e = 0; e < t.length; e++) {
    let r = t.charCodeAt(e);
    n[e] = r;
    i[r] = e;
  }
  function a(e, t) {
    let n = 0;
    let r = 0;
    let a = 0;
    do {
      n |= (31 & (a = i[e.next()])) << r;
      r += 5;
    } while (32 & a);
    let o = 1 & n;
    n >>>= 1;

    if (o) {
      n = -2147483648 /* -0x80000000 */ | -n;
    }

    return t + n;
  }
  function o(e, t, r) {
    let i = t - r;
    i = i < 0 ? (-i << 1) | 1 : i << 1;
    do {
      let t = 31 & i;

      if ((i >>>= 5) > 0) {
        t |= 32;
      }

      e.write(n[t]);
    } while (i > 0);
    return t;
  }
  function s(e, t) {
    return !(e.pos >= t) && e.peek() !== 44;
  }
  let l =
    typeof TextDecoder != "undefined"
      ? new TextDecoder()
      : r.Buffer !== undefined
      ? {
          decode: (e) =>
            r.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString(),
        }
      : {
          decode(e) {
            let t = "";
            for (let n = 0; n < e.length; n++) {
              t += String.fromCharCode(e[n]);
            }
            return t;
          },
        };
  class c {
    constructor() {
      this.pos = 0;
      this.out = "";
      this.buffer = new Uint8Array(16384);
    }
    write(e) {
      let { buffer } = this;
      buffer[this.pos++] = e;

      if (this.pos === 16384) {
        this.out += l.decode(buffer);
        this.pos = 0;
      }
    }
    flush() {
      let { buffer, out, pos } = this;
      return pos > 0 ? out + l.decode(buffer.subarray(0, pos)) : out;
    }
  }
  class d {
    constructor(e) {
      this.pos = 0;
      this.buffer = e;
    }
    next() {
      return this.buffer.charCodeAt(this.pos++);
    }
    peek() {
      return this.buffer.charCodeAt(this.pos);
    }
    indexOf(e) {
      let { buffer, pos } = this;
      let r = buffer.indexOf(e, pos);
      return -1 === r ? buffer.length : r;
    }
  }
  let u = [];
  function p(e, t, n) {
    do {
      e.write(59);
    } while (++t < n);
  }
  function _(e, t) {
    return e[0] - t[0];
  }

  exports.decode = (e) => {
    let { length } = e;
    let n = new d(e);
    let r = [];
    let i = 0;
    let o = 0;
    let l = 0;
    let c = 0;
    let u = 0;
    do {
      let e = n.indexOf(";");
      let t = [];
      let d = true;
      let p = 0;
      for (i = 0; n.pos < e; ) {
        let r;

        if ((i = a(n, i)) < p) {
          d = false;
        }

        p = i;

        if (s(n, e)) {
          o = a(n, o);
          l = a(n, l);
          c = a(n, c);
          r = s(n, e) ? [i, o, l, c, (u = a(n, u))] : [i, o, l, c];
        } else {
          r = [i];
        }

        t.push(r);
        n.pos++;
      }

      if (!d) {
        t.sort(_);
      }

      r.push(t);
      n.pos = e + 1;
    } while (n.pos <= length);
    return r;
  };

  exports.decodeGeneratedRanges = (e) => {
    let { length } = e;
    let n = new d(e);
    let r = [];
    let i = [];
    let o = 0;
    let l = 0;
    let c = 0;
    let p = 0;
    let _ = 0;
    let f = 0;
    let m = 0;
    let h = 0;
    do {
      let e = n.indexOf(";");
      let t = 0;
      for (; n.pos < e; n.pos++) {
        let d;
        t = a(n, t);

        if (!s(n, e)) {
          let e = i.pop();
          e[2] = o;
          e[3] = t;
          continue;
        }

        let g = a(n, 0);
        let y = 1 & g;
        let b = 2 & g;
        let x = 4 & g;
        let S = null;
        let k = u;
        if (y) {
          let e = a(n, l);
          c = a(n, l === e ? c : 0);
          l = e;
          d = [o, t, 0, 0, e, c];
        } else {
          d = [o, t, 0, 0];
        }
        d.isScope = !!x;

        if (b) {
          let e = _;
          let t = p === (p = a(n, p));
          _ = a(n, t ? _ : 0);
          f = a(n, t && e === _ ? f : 0);
          S = [p, _, f];
        }

        d.callsite = S;

        if (s(n, e)) {
          k = [];
          do {
            let e;
            m = o;
            h = t;
            let r = a(n, 0);
            if (r < -1) {
              e = [[a(n, 0)]];
              for (let t = -1; t > r; t--) {
                let t = m;
                m = a(n, m);
                h = a(n, m === t ? h : 0);
                let r = a(n, 0);
                e.push([r, m, h]);
              }
            } else {
              e = [[r]];
            }
            k.push(e);
          } while (s(n, e));
        }

        d.bindings = k;
        r.push(d);
        i.push(d);
      }
      o++;
      n.pos = e + 1;
    } while (n.pos < length);
    return r;
  };

  exports.decodeOriginalScopes = (e) => {
    let { length } = e;
    let n = new d(e);
    let r = [];
    let i = [];
    let o = 0;
    for (; n.pos < length; n.pos++) {
      o = a(n, o);
      let e = a(n, 0);
      if (!s(n, length)) {
        let t = i.pop();
        t[2] = o;
        t[3] = e;
        continue;
      }
      let l = a(n, 0);
      let c = 1 & a(n, 0) ? [o, e, 0, 0, l, a(n, 0)] : [o, e, 0, 0, l];
      let d = u;
      if (s(n, length)) {
        d = [];
        do {
          let e = a(n, 0);
          d.push(e);
        } while (s(n, length));
      }
      c.vars = d;
      r.push(c);
      i.push(c);
    }
    return r;
  };

  exports.encode = (e) => {
    let t = new c();
    let n = 0;
    let r = 0;
    let i = 0;
    let a = 0;
    for (let s = 0; s < e.length; s++) {
      let e_s = e[s];

      if (s > 0) {
        t.write(59);
      }

      if (e_s.length === 0) {
        continue;
      }

      let c = 0;
      for (let e = 0; e < e_s.length; e++) {
        let e_s_e = e_s[e];

        if (e > 0) {
          t.write(44);
        }

        c = o(t, e_s_e[0], c);

        if (e_s_e.length !== 1) {
          n = o(t, e_s_e[1], n);
          r = o(t, e_s_e[2], r);
          i = o(t, e_s_e[3], i);
          e_s_e.length !== 4 && (a = o(t, e_s_e[4], a));
        }
      }
    }
    return t.flush();
  };

  exports.encodeGeneratedRanges = (e) => {
    if (e.length === 0) {
      return "";
    }
    let t = new c();
    for (let n = 0; n < e.length; ) {
      n = (function e(t, n, r, i) {
        let t_n = t[n];

        let { 0: s, 1: l, 2: c, 3: d, isScope, callsite, bindings } = t_n;

        if (i[0] < s) {
          p(r, i[0], s);
          i[0] = s;
          i[1] = 0;
        } else if (n > 0) {
          r.write(44);
        }

        i[1] = o(r, t_n[1], i[1]);
        o(r, (t_n.length === 6) | (2 * !!callsite) | (4 * !!isScope), 0);

        if (t_n.length === 6) {
          let { 4: e, 5: t } = t_n;

          if (e !== i[2]) {
            i[3] = 0;
          }

          i[2] = o(r, e, i[2]);
          i[3] = o(r, t, i[3]);
        }

        if (callsite) {
          let { 0: e, 1: t, 2: n } = t_n.callsite;

          if (e !== i[4]) {
            i[5] = 0;
            i[6] = 0;
          } else if (t !== i[5]) {
            i[6] = 0;
          }

          i[4] = o(r, e, i[4]);
          i[5] = o(r, t, i[5]);
          i[6] = o(r, n, i[6]);
        }
        if (bindings) {
          for (let e of bindings) {
            if (e.length > 1) {
              o(r, -e.length, 0);
            }

            o(r, e[0][0], 0);
            let t = s;
            let n = l;
            for (let i = 1; i < e.length; i++) {
              let e_i = e[i];
              t = o(r, e_i[1], t);
              n = o(r, e_i[2], n);
              o(r, e_i[0], 0);
            }
          }
        }
        for (n++; n < t.length; ) {
          let { 0: a, 1: o } = t[n];
          if (a > c || (a === c && o >= d)) {
            break;
          }
          n = e(t, n, r, i);
        }

        if (i[0] < c) {
          p(r, i[0], c);
          i[0] = c;
          i[1] = 0;
        } else {
          r.write(44);
        }

        i[1] = o(r, d, i[1]);
        return n;
      })(e, n, t, [0, 0, 0, 0, 0, 0, 0]);
    }
    return t.flush();
  };

  exports.encodeOriginalScopes = (e) => {
    let t = new c();
    for (let n = 0; n < e.length; ) {
      n = (function e(t, n, r, i) {
        let t_n = t[n];
        let { 0: s, 1: l, 2: c, 3: d, 4: u, vars } = t_n;

        if (n > 0) {
          r.write(44);
        }

        i[0] = o(r, s, i[0]);
        o(r, l, 0);
        o(r, u, 0);
        o(r, +(t_n.length === 6), 0);

        if (t_n.length === 6) {
          o(r, t_n[5], 0);
        }

        for (let e of vars) {
          o(r, e, 0);
        }

        for (n++; n < t.length; ) {
          let { 0: a, 1: o } = t[n];
          if (a > c || (a === c && o >= d)) {
            break;
          }
          n = e(t, n, r, i);
        }
        r.write(44);
        i[0] = o(r, c, i[0]);
        o(r, d, 0);
        return n;
      })(e, n, t, [0]);
    }
    return t.flush();
  };

  Object.defineProperty(exports, "__esModule", { value: true });
})(exports);
