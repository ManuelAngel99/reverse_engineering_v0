import r from "module-969803.js";
__unused.exports = (e) =>
  e
    ? (e.substr(0, 2) === "{}" && (e = `\\{\\}${e.substr(2)}`),
      (function e(t, n) {
        const i = [];
        const a = r("{", "}", t);
        if (!a) {
          return [t];
        }
        const a_pre = a.pre;
        const l = a.post.length ? e(a.post, false) : [""];
        if (/\$$/.test(a.pre)) {
          for (var d = 0; d < l.length; d++) {
            var m = `${a_pre}{${a.body}}${l[d]}`;
            i.push(m);
          }
        } else {
          const h = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(a.body);
          const g = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(a.body);
          const y = h || g;
          const b = a.body.includes(",");
          if (!y && !b) {
            return a.post.match(/,(?!,).*\}/)
              ? e((t = `${a.pre}{${a.body}${o}${a.post}`))
              : [t];
          }
          if (y) {
            x = a.body.split(/\.\./);
          } else if (
            (x = (function e(t) {
              if (!t) {
                return [""];
              }
              const n = [];
              const i = r("{", "}", t);
              if (!i) {
                return t.split(",");
              }

              const { pre, body, post } = i;

              const l = pre.split(",");
              l[l.length - 1] += `{${body}}`;
              const c = e(post);

              if (post.length) {
                l[l.length - 1] += c.shift();
                l.push(...c);
              }

              n.push(...l);
              return n;
            })(a.body)).length === 1 &&
            (x = e(x[0], false).map(u)).length === 1
          ) {
            return l.map((e) => a.pre + x[0] + e);
          }
          if (y) {
            var x;
            var S;
            let k;
            const T = c(x[0]);
            const E = c(x[1]);
            const C = Math.max(x[0].length, x[1].length);
            let A = x.length == 3 ? Math.abs(c(x[2])) : 1;
            let w = _;

            if (E < T) {
              A *= -1;
              w = f;
            }

            const D = x.some(p);
            S = [];
            for (let N = T; w(N, E); N += A) {
              if (g) {
                if ("\\" === (k = String.fromCharCode(N))) {
                  k = "";
                }
              } else {
                k = String(N);

                if (D) {
                  const I = C - k.length;
                  if (I > 0) {
                    const P = Array(I + 1).join("0");
                    k = N < 0 ? `-${P}${k.slice(1)}` : P + k;
                  }
                }
              }
              S.push(k);
            }
          } else {
            S = [];
            for (var M = 0; M < x.length; M++) {
              S.push(...e(x[M], false));
            }
          }
          for (var M = 0; M < S.length; M++) {
            for (var d = 0; d < l.length; d++) {
              var m = a_pre + S[M] + l[d];

              if (!n || y || m) {
                i.push(m);
              }
            }
          }
        }
        return i;
      })(
        e
          .split("\\\\")
          .join(i)
          .split("\\{")
          .join(a)
          .split("\\}")
          .join(o)
          .split("\\,")
          .join(s)
          .split("\\.")
          .join(l),
        true
      ).map(d))
    : [];
var i = `\0SLASH${Math.random()}\0`;
var a = `\0OPEN${Math.random()}\0`;
var o = `\0CLOSE${Math.random()}\0`;
var s = `\0COMMA${Math.random()}\0`;
var l = `\0PERIOD${Math.random()}\0`;
function c(e) {
  return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
}
function d(e) {
  return e
    .split(i)
    .join("\\")
    .split(a)
    .join("{")
    .split(o)
    .join("}")
    .split(s)
    .join(",")
    .split(l)
    .join(".");
}
function u(e) {
  return `{${e}}`;
}
function p(e) {
  return /^-?0\d/.test(e);
}
function _(e, t) {
  return e <= t;
}
function f(e, t) {
  return e >= t;
}
