function r(e, t, n) {
  if (e instanceof RegExp) {
    e = i(e, n);
  }

  if (t instanceof RegExp) {
    t = i(t, n);
  }

  const r = a(e, t, n);
  return (
    r && {
      start: r[0],
      end: r[1],
      pre: n.slice(0, r[0]),
      body: n.slice(r[0] + e.length, r[1]),
      post: n.slice(r[1] + t.length),
    }
  );
}
function i(e, t) {
  const n = t.match(e);
  return n ? n[0] : null;
}
function a(e, t, n) {
  let r;
  let i;
  let a;
  let o;
  let s;
  let l = n.indexOf(e);
  let c = n.indexOf(t, l + 1);
  let d = l;
  if (l >= 0 && c > 0) {
    if (e === t) {
      return [l, c];
    }
    r = [];

    for (a = n.length; d >= 0 && !s; ) {
      if (d == l) {
        r.push(d);
        l = n.indexOf(e, d + 1);
      } else if (r.length == 1) {
        s = [r.pop(), c];
      } else {
        (i = r.pop()) < a && ((a = i), (o = c));
        c = n.indexOf(t, d + 1);
      }

      d = l < c && l >= 0 ? l : c;
    }

    if (r.length) {
      s = [a, o];
    }
  }
  return s;
}
__unused.exports = r;
r.range = a;
