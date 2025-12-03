let r = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false],
};

let i = (e) => e.replace(/[[\]\\-]/g, "\\$&");

export const parseClass = (e, t) => {
  if (e.charAt(t) !== "[") {
    throw Error("not in a brace expression");
  }
  let n = [];
  let a = [];
  let o = t + 1;
  let s = false;
  let l = false;
  let c = false;
  let d = false;
  let u = t;
  let p = "";
  s: while (o < e.length) {
    let _ = e.charAt(o);
    if ((_ === "!" || _ === "^") && o === t + 1) {
      d = true;
      o++;
      continue;
    }
    if (_ === "]" && s && !c) {
      u = o + 1;
      break;
    }
    s = true;

    if (_ === "\\" && !c) {
      c = true;
      o++;
      continue;
    }

    if (_ === "[" && !c) {
      for (let [i, [s, c, d]] of Object.entries(r)) {
        if (e.startsWith(i, o)) {
          if (p) {
            return ["$.", false, e.length - t, true];
          }
          o += i.length;

          if (d) {
            a.push(s);
          } else {
            n.push(s);
          }

          l = l || c;
          continue s;
        }
      }
    }
    c = false;

    if (p) {
      if (_ > p) {
        n.push(`${i(p)}-${i(_)}`);
      } else if (_ === p) {
        n.push(i(_));
      }

      p = "";
      o++;
      continue;
    }

    if (e.startsWith("-]", o + 1)) {
      n.push(i(`${_}-`));
      o += 2;
      continue;
    }
    if (e.startsWith("-", o + 1)) {
      p = _;
      o += 2;
      continue;
    }
    n.push(i(_));
    o++;
  }
  if (u < o) {
    return ["", false, 0, false];
  }
  if (!n.length && !a.length) {
    return ["$.", false, e.length - t, true];
  }
  if (a.length === 0 && n.length === 1 && /^\\?.$/.test(n[0]) && !d) {
    return [
      (n[0].length === 2 ? n[0].slice(-1) : n[0]).replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      ),
      false,
      u - t,
      false,
    ];
  }
  let _ = `[${d ? "^" : ""}${n.join("")}]`;
  let f = `[${d ? "" : "^"}${a.join("")}]`;
  return [
    n.length && a.length ? `(${_}|${f})` : n.length ? _ : f,
    l,
    u - t,
    true,
  ];
};
