(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  219094,
  (e) => {
    "use strict";
    function t(e) {
      let t = {};
      for (let r of e) {
        let e = r.replace(/_/g, " ");
        t[r] = (t) => {
          let {
              weight: r,
              style: s,
              display: a = "swap",
              variable: n,
            } = t || {},
            l = s ? [...new Set(Array.isArray(s) ? s : [s])] : [],
            o = r
              ? [...new Set(Array.isArray(r) ? r : [r])]
              : ["100;200;300;400;500;600;700;800;900"],
            h = l.includes("italic"),
            f = l.includes("normal"),
            c = (function (e, t, r) {
              let s = [];
              if (t.wght)
                for (let e of t.wght)
                  if (t.ital)
                    for (let i of t.ital)
                      s.push([
                        ["ital", i],
                        ["wght", e],
                        ...(t.variableAxes ?? []),
                      ]);
                  else s.push([["wght", e], ...(t.variableAxes ?? [])]);
              else t.variableAxes && s.push([...t.variableAxes]);
              t.variableAxes &&
                s.forEach((e) => {
                  e.sort(([e], [t]) => {
                    let i = e.charCodeAt(0) > 96,
                      r = t.charCodeAt(0) > 96;
                    return i && !r ? -1 : (r && !i) || e > t ? 1 : -1;
                  });
                });
              let a = `https://fonts.googleapis.com/css2?family=${e.replace(/ /g, "+")}`;
              return (
                s.length > 0 &&
                  (a = `${a}:${s[0].map(([e]) => e).join(",")}@${s
                    .map((e) => e.map(([, e]) => e).join(","))
                    .sort(i)
                    .join(";")}`),
                (a = `${a}&display=${r}`)
              );
            })(
              e,
              { wght: o, ital: h ? [...(f ? ["0"] : []), "1"] : void 0 },
              a,
            ),
            u = (function (e) {
              let t = btoa(e);
              return `f_${t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")}`;
            })(e);
          if (
            "undefined" != typeof document &&
            !document.querySelector(`link[href="${c}"]`)
          ) {
            let t = document.createElement("link");
            ((t.href = c),
              (t.rel = "stylesheet"),
              document.head.appendChild(t));
            let i = document.createElement("style");
            ((i.innerHTML = `.${u}{
            font-family: '${e}';
          }${n ? `.v_${u}{${n}:'${e}';}` : ""}`),
              document.head.appendChild(i));
          }
          return {
            className: u,
            style: { fontFamily: `'${e}'` },
            variable: "v_" + u,
          };
        };
      }
      return t;
    }
    function i(e, t) {
      if (e.includes(",") && t.includes(",")) {
        let [i, r] = e.split(",", 2),
          [s, a] = t.split(",", 2);
        return i === s ? parseInt(r) - parseInt(a) : parseInt(i) - parseInt(s);
      }
      return parseInt(e) - parseInt(t);
    }
    e.s(["getNextFontGoogleMod", () => t]);
  },
  970422,
  249875,
  (e) => {
    "use strict";
    function t(e) {
      return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    (e.s(
      [
        "FatalRendererError",
        () => tz,
        "addGenerationLog",
        () => tT,
        "getGenerationLogs",
        () => tO,
        "startCollectingGenerationLogs",
        () => tC,
        "stopCollectingGenerationLogs",
        () => tN,
        "withNewGenerationLogsReport",
        () => tj,
      ],
      970422,
    ),
      e.s(
        [
          "collectRuntimeAnalyzerLogs",
          () => tx,
          "trackRuntimeModuleCreation",
          () => tE,
        ],
        249875,
      ));
    let i = [
        "_SUPABASE_ANON",
        "_SUPABASE_PUBLIC",
        "_STRIPE_PUBLISHABLE",
        "_STRIPE_PUBLIC",
        "_PAYSTACK_PUBLIC",
        "_FIREBASE_API",
        "_CLERK_PUBLISHABLE",
        "_VAPID_PUBLIC",
        "_MIXPANEL_TOKEN",
      ]
        .map(t)
        .join("|"),
      r = ["_KEY", "_OAUTH", "_SECRET", "_TOKEN"].map(t).join("|"),
      s = RegExp(`NEXT_PUBLIC(?!${i})\\S*(${r})`),
      { min: a, max: n } = Math,
      l = (e, t = 0, i = 1) => a(n(t, e), i),
      o = (e) => {
        ((e._clipped = !1), (e._unclipped = e.slice(0)));
        for (let t = 0; t <= 3; t++)
          t < 3
            ? ((e[t] < 0 || e[t] > 255) && (e._clipped = !0),
              (e[t] = l(e[t], 0, 255)))
            : 3 === t && (e[t] = l(e[t], 0, 1));
        return e;
      },
      h = {};
    for (let e of [
      "Boolean",
      "Number",
      "String",
      "Function",
      "Array",
      "Date",
      "RegExp",
      "Undefined",
      "Null",
    ])
      h[`[object ${e}]`] = e.toLowerCase();
    function f(e) {
      return h[Object.prototype.toString.call(e)] || "object";
    }
    let c = (e, t = null) =>
        e.length >= 3
          ? Array.prototype.slice.call(e)
          : "object" == f(e[0]) && t
            ? t
                .split("")
                .filter((t) => void 0 !== e[0][t])
                .map((t) => e[0][t])
            : e[0].slice(0),
      u = (e) => {
        if (e.length < 2) return null;
        let t = e.length - 1;
        return "string" == f(e[t]) ? e[t].toLowerCase() : null;
      },
      { PI: d, min: g, max: p } = Math,
      b = (e) => Math.round(100 * e) / 100,
      m = (e) => Math.round(100 * e) / 100,
      y = 2 * d,
      v = d / 3,
      w = d / 180,
      k = 180 / d;
    function _(e) {
      return [...e.slice(0, 3).reverse(), ...e.slice(3)];
    }
    let A = { format: {}, autodetect: [] },
      S = class {
        constructor(...e) {
          if (
            "object" === f(e[0]) &&
            e[0].constructor &&
            e[0].constructor === this.constructor
          )
            return e[0];
          let t = u(e),
            i = !1;
          if (!t) {
            for (let r of ((i = !0),
            A.sorted ||
              ((A.autodetect = A.autodetect.sort((e, t) => t.p - e.p)),
              (A.sorted = !0)),
            A.autodetect))
              if ((t = r.test(...e))) break;
          }
          if (A.format[t]) {
            const r = A.format[t].apply(null, i ? e : e.slice(0, -1));
            this._rgb = o(r);
          } else throw Error("unknown format: " + e);
          3 === this._rgb.length && this._rgb.push(1);
        }
        toString() {
          return "function" == f(this.hex)
            ? this.hex()
            : `[${this._rgb.join(",")}]`;
        }
      },
      L = (...e) => new S(...e);
    L.version = "3.1.2";
    let x = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
      },
      E = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      z = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,
      M = (e) => {
        if (e.match(E)) {
          ((4 === e.length || 7 === e.length) && (e = e.substr(1)),
            3 === e.length &&
              (e = (e = e.split(""))[0] + e[0] + e[1] + e[1] + e[2] + e[2]));
          let t = parseInt(e, 16);
          return [t >> 16, (t >> 8) & 255, 255 & t, 1];
        }
        if (e.match(z)) {
          ((5 === e.length || 9 === e.length) && (e = e.substr(1)),
            4 === e.length &&
              (e =
                (e = e.split(""))[0] +
                e[0] +
                e[1] +
                e[1] +
                e[2] +
                e[2] +
                e[3] +
                e[3]));
          let t = parseInt(e, 16),
            i = Math.round(((255 & t) / 255) * 100) / 100;
          return [(t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, i];
        }
        throw Error(`unknown hex color: ${e}`);
      },
      { round: F } = Math,
      T = (...e) => {
        let [t, i, r, s] = c(e, "rgba"),
          a = u(e) || "auto";
        (void 0 === s && (s = 1),
          "auto" === a && (a = s < 1 ? "rgba" : "rgb"),
          (t = F(t)));
        let n =
          "000000" + ((t << 16) | ((i = F(i)) << 8) | (r = F(r))).toString(16);
        n = n.substr(n.length - 6);
        let l = "0" + F(255 * s).toString(16);
        switch (((l = l.substr(l.length - 2)), a.toLowerCase())) {
          case "rgba":
            return `#${n}${l}`;
          case "argb":
            return `#${l}${n}`;
          default:
            return `#${n}`;
        }
      };
    ((S.prototype.name = function () {
      let e = T(this._rgb, "rgb");
      for (let t of Object.keys(x)) if (x[t] === e) return t.toLowerCase();
      return e;
    }),
      (A.format.named = (e) => {
        if (x[(e = e.toLowerCase())]) return M(x[e]);
        throw Error("unknown color name: " + e);
      }),
      A.autodetect.push({
        p: 5,
        test: (e, ...t) => {
          if (!t.length && "string" === f(e) && x[e.toLowerCase()])
            return "named";
        },
      }),
      (S.prototype.alpha = function (e, t = !1) {
        return void 0 !== e && "number" === f(e)
          ? t
            ? ((this._rgb[3] = e), this)
            : new S([this._rgb[0], this._rgb[1], this._rgb[2], e], "rgb")
          : this._rgb[3];
      }),
      (S.prototype.clipped = function () {
        return this._rgb._clipped || !1;
      }));
    let O = {
        Kn: 18,
        labWhitePoint: "d65",
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452,
        kE: 216 / 24389,
        kKE: 8,
        kK: 24389 / 27,
        RefWhiteRGB: { X: 0.95047, Y: 1, Z: 1.08883 },
        MtxRGB2XYZ: {
          m00: 0.4124564390896922,
          m01: 0.21267285140562253,
          m02: 0.0193338955823293,
          m10: 0.357576077643909,
          m11: 0.715152155287818,
          m12: 0.11919202588130297,
          m20: 0.18043748326639894,
          m21: 0.07217499330655958,
          m22: 0.9503040785363679,
        },
        MtxXYZ2RGB: {
          m00: 3.2404541621141045,
          m01: -0.9692660305051868,
          m02: 0.055643430959114726,
          m10: -1.5371385127977166,
          m11: 1.8760108454466942,
          m12: -0.2040259135167538,
          m20: -0.498531409556016,
          m21: 0.041556017530349834,
          m22: 1.0572251882231791,
        },
        As: 0.9414285350000001,
        Bs: 1.040417467,
        Cs: 1.089532651,
        MtxAdaptMa: {
          m00: 0.8951,
          m01: -0.7502,
          m02: 0.0389,
          m10: 0.2664,
          m11: 1.7135,
          m12: -0.0685,
          m20: -0.1614,
          m21: 0.0367,
          m22: 1.0296,
        },
        MtxAdaptMaI: {
          m00: 0.9869929054667123,
          m01: 0.43230526972339456,
          m02: -0.008528664575177328,
          m10: -0.14705425642099013,
          m11: 0.5183602715367776,
          m12: 0.04004282165408487,
          m20: 0.15996265166373125,
          m21: 0.0492912282128556,
          m22: 0.9684866957875502,
        },
      },
      R = new Map([
        ["a", [1.0985, 0.35585]],
        ["b", [1.0985, 0.35585]],
        ["c", [0.98074, 1.18232]],
        ["d50", [0.96422, 0.82521]],
        ["d55", [0.95682, 0.92149]],
        ["d65", [0.95047, 1.08883]],
        ["e", [1, 1, 1]],
        ["f2", [0.99186, 0.67393]],
        ["f7", [0.95041, 1.08747]],
        ["f11", [1.00962, 0.6435]],
        ["icc", [0.96422, 0.82521]],
      ]);
    function C(e) {
      let t = R.get(String(e).toLowerCase());
      if (!t) throw Error("unknown Lab illuminant " + e);
      ((O.labWhitePoint = e), (O.Xn = t[0]), (O.Zn = t[1]));
    }
    function N() {
      return O.labWhitePoint;
    }
    let j = (e) => {
        let t = Math.sign(e);
        return (
          ((e = Math.abs(e)) <= 0.0031308
            ? 12.92 * e
            : 1.055 * Math.pow(e, 1 / 2.4) - 0.055) * t
        );
      },
      B = (e, t, i) => {
        let {
            MtxAdaptMa: r,
            MtxAdaptMaI: s,
            MtxXYZ2RGB: a,
            RefWhiteRGB: n,
            Xn: l,
            Yn: o,
            Zn: h,
          } = O,
          f = l * r.m00 + o * r.m10 + h * r.m20,
          c = l * r.m01 + o * r.m11 + h * r.m21,
          u = l * r.m02 + o * r.m12 + h * r.m22,
          d = n.X * r.m00 + n.Y * r.m10 + n.Z * r.m20,
          g = n.X * r.m01 + n.Y * r.m11 + n.Z * r.m21,
          p = n.X * r.m02 + n.Y * r.m12 + n.Z * r.m22,
          b = (e * r.m00 + t * r.m10 + i * r.m20) * (d / f),
          m = (e * r.m01 + t * r.m11 + i * r.m21) * (g / c),
          y = (e * r.m02 + t * r.m12 + i * r.m22) * (p / u),
          v = b * s.m00 + m * s.m10 + y * s.m20,
          w = b * s.m01 + m * s.m11 + y * s.m21,
          k = b * s.m02 + m * s.m12 + y * s.m22;
        return [
          255 * j(v * a.m00 + w * a.m10 + k * a.m20),
          255 * j(v * a.m01 + w * a.m11 + k * a.m21),
          255 * j(v * a.m02 + w * a.m12 + k * a.m22),
        ];
      },
      $ = (...e) => {
        let [t, i, r] = (e = c(e, "lab")),
          [s, a, n] = ((e, t, i) => {
            let { kE: r, kK: s, kKE: a, Xn: n, Yn: l, Zn: o } = O,
              h = (e + 16) / 116,
              f = 0.002 * t + h,
              c = h - 0.005 * i,
              u = f * f * f,
              d = c * c * c,
              g = e > a ? Math.pow((e + 16) / 116, 3) : e / s;
            return [
              (u > r ? u : (116 * f - 16) / s) * n,
              g * l,
              (d > r ? d : (116 * c - 16) / s) * o,
            ];
          })(t, i, r),
          [l, o, h] = B(s, a, n);
        return [l, o, h, e.length > 3 ? e[3] : 1];
      };
    function I(e) {
      let t = Math.sign(e);
      return (
        ((e = Math.abs(e)) <= 0.04045
          ? e / 12.92
          : Math.pow((e + 0.055) / 1.055, 2.4)) * t
      );
    }
    let P = (e, t, i) => {
        ((e = I(e / 255)), (t = I(t / 255)), (i = I(i / 255)));
        let {
            MtxRGB2XYZ: r,
            MtxAdaptMa: s,
            MtxAdaptMaI: a,
            Xn: n,
            Yn: l,
            Zn: o,
            As: h,
            Bs: f,
            Cs: c,
          } = O,
          u = e * r.m00 + t * r.m10 + i * r.m20,
          d = e * r.m01 + t * r.m11 + i * r.m21,
          g = e * r.m02 + t * r.m12 + i * r.m22,
          p = n * s.m00 + l * s.m10 + o * s.m20,
          b = n * s.m01 + l * s.m11 + o * s.m21,
          m = n * s.m02 + l * s.m12 + o * s.m22,
          y = u * s.m00 + d * s.m10 + g * s.m20,
          v = u * s.m01 + d * s.m11 + g * s.m21,
          w = u * s.m02 + d * s.m12 + g * s.m22;
        return (
          (y *= p / h),
          (v *= b / f),
          (w *= m / c),
          (u = y * a.m00 + v * a.m10 + w * a.m20),
          [
            u,
            (d = y * a.m01 + v * a.m11 + w * a.m21),
            (g = y * a.m02 + v * a.m12 + w * a.m22),
          ]
        );
      },
      D = (...e) => {
        let [t, i, r, ...s] = c(e, "rgb"),
          [a, n, l] = P(t, i, r),
          [o, h, f] = (function (e, t, i) {
            let { Xn: r, Yn: s, Zn: a, kE: n, kK: l } = O,
              o = e / r,
              h = t / s,
              f = i / a,
              c = o > n ? Math.pow(o, 1 / 3) : (l * o + 16) / 116,
              u = h > n ? Math.pow(h, 1 / 3) : (l * h + 16) / 116;
            return [
              116 * u - 16,
              500 * (c - u),
              200 * (u - (f > n ? Math.pow(f, 1 / 3) : (l * f + 16) / 116)),
            ];
          })(a, n, l);
        return [o, h, f, ...(s.length > 0 && s[0] < 1 ? [s[0]] : [])];
      };
    ((S.prototype.lab = function () {
      return D(this._rgb);
    }),
      Object.assign(L, {
        lab: (...e) => new S(...e, "lab"),
        getLabWhitePoint: N,
        setLabWhitePoint: C,
      }),
      (A.format.lab = $),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "lab"))) && 3 === e.length) return "lab";
        },
      }),
      (S.prototype.darken = function (e = 1) {
        let t = this.lab();
        return ((t[0] -= O.Kn * e), new S(t, "lab").alpha(this.alpha(), !0));
      }),
      (S.prototype.brighten = function (e = 1) {
        return this.darken(-e);
      }),
      (S.prototype.darker = S.prototype.darken),
      (S.prototype.brighter = S.prototype.brighten),
      (S.prototype.get = function (e) {
        let [t, i] = e.split("."),
          r = this[t]();
        if (!i) return r;
        {
          let e = t.indexOf(i) - 2 * ("ok" === t.substr(0, 2));
          if (e > -1) return r[e];
          throw Error(`unknown channel ${i} in mode ${t}`);
        }
      }));
    let { pow: U } = Math;
    S.prototype.luminance = function (e, t = "rgb") {
      if (void 0 !== e && "number" === f(e)) {
        if (0 === e) return new S([0, 0, 0, this._rgb[3]], "rgb");
        if (1 === e) return new S([255, 255, 255, this._rgb[3]], "rgb");
        let i = this.luminance(),
          r = 20,
          s = (i, a) => {
            let n = i.interpolate(a, 0.5, t),
              l = n.luminance();
            return !(1e-7 > Math.abs(e - l)) && r--
              ? l > e
                ? s(i, n)
                : s(n, a)
              : n;
          },
          a = (
            i > e ? s(new S([0, 0, 0]), this) : s(this, new S([255, 255, 255]))
          ).rgb();
        return new S([...a, this._rgb[3]]);
      }
      return W(...this._rgb.slice(0, 3));
    };
    let W = (e, t, i) => (
        (e = G(e)),
        0.2126 * e + 0.7152 * (t = G(t)) + 0.0722 * (i = G(i))
      ),
      G = (e) =>
        (e /= 255) <= 0.03928 ? e / 12.92 : U((e + 0.055) / 1.055, 2.4),
      q = {},
      Y = (e, t, i = 0.5, ...r) => {
        let s = r[0] || "lrgb";
        if ((q[s] || r.length || (s = Object.keys(q)[0]), !q[s]))
          throw Error(`interpolation mode ${s} is not defined`);
        return (
          "object" !== f(e) && (e = new S(e)),
          "object" !== f(t) && (t = new S(t)),
          q[s](e, t, i).alpha(e.alpha() + i * (t.alpha() - e.alpha()))
        );
      };
    ((S.prototype.mix = S.prototype.interpolate =
      function (e, t = 0.5, ...i) {
        return Y(this, e, t, ...i);
      }),
      (S.prototype.premultiply = function (e = !1) {
        let t = this._rgb,
          i = t[3];
        return e
          ? ((this._rgb = [t[0] * i, t[1] * i, t[2] * i, i]), this)
          : new S([t[0] * i, t[1] * i, t[2] * i, i], "rgb");
      }));
    let { sin: X, cos: H } = Math,
      K = (...e) => {
        let [t, i, r] = c(e, "lch");
        return (isNaN(r) && (r = 0), [t, H((r *= w)) * i, X(r) * i]);
      },
      V = (...e) => {
        let [t, i, r] = (e = c(e, "lch")),
          [s, a, n] = K(t, i, r),
          [l, o, h] = $(s, a, n);
        return [l, o, h, e.length > 3 ? e[3] : 1];
      },
      { sqrt: Z, atan2: Q, round: J } = Math,
      ee = (...e) => {
        let [t, i, r] = c(e, "lab"),
          s = Z(i * i + r * r),
          a = (Q(r, i) * k + 360) % 360;
        return (0 === J(1e4 * s) && (a = NaN), [t, s, a]);
      },
      et = (...e) => {
        let [t, i, r, ...s] = c(e, "rgb"),
          [a, n, l] = D(t, i, r),
          [o, h, f] = ee(a, n, l);
        return [o, h, f, ...(s.length > 0 && s[0] < 1 ? [s[0]] : [])];
      };
    ((S.prototype.lch = function () {
      return et(this._rgb);
    }),
      (S.prototype.hcl = function () {
        return _(et(this._rgb));
      }),
      Object.assign(L, {
        lch: (...e) => new S(...e, "lch"),
        hcl: (...e) => new S(...e, "hcl"),
      }),
      (A.format.lch = V),
      (A.format.hcl = (...e) => V(..._(c(e, "hcl")))),
      ["lch", "hcl"].forEach((e) =>
        A.autodetect.push({
          p: 2,
          test: (...t) => {
            if ("array" === f((t = c(t, e))) && 3 === t.length) return e;
          },
        }),
      ),
      (S.prototype.saturate = function (e = 1) {
        let t = this.lch();
        return (
          (t[1] += O.Kn * e),
          t[1] < 0 && (t[1] = 0),
          new S(t, "lch").alpha(this.alpha(), !0)
        );
      }),
      (S.prototype.desaturate = function (e = 1) {
        return this.saturate(-e);
      }),
      (S.prototype.set = function (e, t, i = !1) {
        let [r, s] = e.split("."),
          a = this[r]();
        if (!s) return a;
        {
          let e = r.indexOf(s) - 2 * ("ok" === r.substr(0, 2));
          if (e > -1) {
            if ("string" == f(t))
              switch (t.charAt(0)) {
                case "+":
                case "-":
                  a[e] += +t;
                  break;
                case "*":
                  a[e] *= t.substr(1);
                  break;
                case "/":
                  a[e] /= t.substr(1);
                  break;
                default:
                  a[e] = +t;
              }
            else if ("number" === f(t)) a[e] = t;
            else throw Error("unsupported value for Color.set");
            let s = new S(a, r);
            return i ? ((this._rgb = s._rgb), this) : s;
          }
          throw Error(`unknown channel ${s} in mode ${r}`);
        }
      }),
      (S.prototype.tint = function (e = 0.5, ...t) {
        return Y(this, "white", e, ...t);
      }),
      (S.prototype.shade = function (e = 0.5, ...t) {
        return Y(this, "black", e, ...t);
      }),
      (q.rgb = (e, t, i) => {
        let r = e._rgb,
          s = t._rgb;
        return new S(
          r[0] + i * (s[0] - r[0]),
          r[1] + i * (s[1] - r[1]),
          r[2] + i * (s[2] - r[2]),
          "rgb",
        );
      }));
    let { sqrt: ei, pow: er } = Math;
    ((q.lrgb = (e, t, i) => {
      let [r, s, a] = e._rgb,
        [n, l, o] = t._rgb;
      return new S(
        ei(er(r, 2) * (1 - i) + er(n, 2) * i),
        ei(er(s, 2) * (1 - i) + er(l, 2) * i),
        ei(er(a, 2) * (1 - i) + er(o, 2) * i),
        "rgb",
      );
    }),
      (q.lab = (e, t, i) => {
        let r = e.lab(),
          s = t.lab();
        return new S(
          r[0] + i * (s[0] - r[0]),
          r[1] + i * (s[1] - r[1]),
          r[2] + i * (s[2] - r[2]),
          "lab",
        );
      }));
    let es = (e, t, i, r) => {
        let s, a, n, l, o, h, f, c, u, d, g, p;
        return (
          "hsl" === r
            ? ((s = e.hsl()), (a = t.hsl()))
            : "hsv" === r
              ? ((s = e.hsv()), (a = t.hsv()))
              : "hcg" === r
                ? ((s = e.hcg()), (a = t.hcg()))
                : "hsi" === r
                  ? ((s = e.hsi()), (a = t.hsi()))
                  : "lch" === r || "hcl" === r
                    ? ((r = "hcl"), (s = e.hcl()), (a = t.hcl()))
                    : "oklch" === r &&
                      ((s = e.oklch().reverse()), (a = t.oklch().reverse())),
          ("h" === r.substr(0, 1) || "oklch" === r) &&
            (([n, o, f] = s), ([l, h, c] = a)),
          isNaN(n) || isNaN(l)
            ? isNaN(n)
              ? isNaN(l)
                ? (d = NaN)
                : ((d = l), (1 == f || 0 == f) && "hsv" != r && (u = h))
              : ((d = n), (1 == c || 0 == c) && "hsv" != r && (u = o))
            : ((p =
                l > n && l - n > 180
                  ? l - (n + 360)
                  : l < n && n - l > 180
                    ? l + 360 - n
                    : l - n),
              (d = n + i * p)),
          void 0 === u && (u = o + i * (h - o)),
          (g = f + i * (c - f)),
          "oklch" === r ? new S([g, u, d], r) : new S([d, u, g], r)
        );
      },
      ea = (e, t, i) => es(e, t, i, "lch");
    ((q.lch = ea),
      (q.hcl = ea),
      (S.prototype.num = function () {
        return ((...e) => {
          let [t, i, r] = c(e, "rgb");
          return (t << 16) + (i << 8) + r;
        })(this._rgb);
      }),
      Object.assign(L, { num: (...e) => new S(...e, "num") }),
      (A.format.num = (e) => {
        if ("number" == f(e) && e >= 0 && e <= 0xffffff)
          return [e >> 16, (e >> 8) & 255, 255 & e, 1];
        throw Error("unknown num color: " + e);
      }),
      A.autodetect.push({
        p: 5,
        test: (...e) => {
          if (
            1 === e.length &&
            "number" === f(e[0]) &&
            e[0] >= 0 &&
            e[0] <= 0xffffff
          )
            return "num";
        },
      }),
      (q.num = (e, t, i) => {
        let r = e.num();
        return new S(r + i * (t.num() - r), "num");
      }));
    let { floor: en } = Math;
    ((S.prototype.hcg = function () {
      return ((...e) => {
        let t,
          [i, r, s] = c(e, "rgb"),
          a = g(i, r, s),
          n = p(i, r, s),
          l = n - a;
        return (
          0 === l
            ? (t = NaN)
            : (i === n && (t = (r - s) / l),
              r === n && (t = 2 + (s - i) / l),
              s === n && (t = 4 + (i - r) / l),
              (t *= 60) < 0 && (t += 360)),
          [t, (100 * l) / 255, (a / (255 - l)) * 100]
        );
      })(this._rgb);
    }),
      (L.hcg = (...e) => new S(...e, "hcg")),
      (A.format.hcg = (...e) => {
        let t,
          i,
          r,
          [s, a, n] = (e = c(e, "hcg"));
        n *= 255;
        let l = 255 * a;
        if (0 === a) t = i = r = n;
        else {
          (360 === s && (s = 0), s > 360 && (s -= 360), s < 0 && (s += 360));
          let e = en((s /= 60)),
            o = s - e,
            h = n * (1 - a),
            f = h + l * (1 - o),
            c = h + l * o,
            u = h + l;
          switch (e) {
            case 0:
              [t, i, r] = [u, c, h];
              break;
            case 1:
              [t, i, r] = [f, u, h];
              break;
            case 2:
              [t, i, r] = [h, u, c];
              break;
            case 3:
              [t, i, r] = [h, f, u];
              break;
            case 4:
              [t, i, r] = [c, h, u];
              break;
            case 5:
              [t, i, r] = [u, h, f];
          }
        }
        return [t, i, r, e.length > 3 ? e[3] : 1];
      }),
      A.autodetect.push({
        p: 1,
        test: (...e) => {
          if ("array" === f((e = c(e, "hcg"))) && 3 === e.length) return "hcg";
        },
      }),
      (q.hcg = (e, t, i) => es(e, t, i, "hcg")));
    let { cos: el } = Math,
      { min: eo, sqrt: eh, acos: ef } = Math;
    ((S.prototype.hsi = function () {
      return ((...e) => {
        let t,
          [i, r, s] = c(e, "rgb"),
          a = eo((i /= 255), (r /= 255), (s /= 255)),
          n = (i + r + s) / 3,
          l = n > 0 ? 1 - a / n : 0;
        return (
          0 === l
            ? (t = NaN)
            : ((t = ef(
                (t =
                  (i - r + (i - s)) /
                  2 /
                  eh((i - r) * (i - r) + (i - s) * (r - s))),
              )),
              s > r && (t = y - t),
              (t /= y)),
          [360 * t, l, n]
        );
      })(this._rgb);
    }),
      (L.hsi = (...e) => new S(...e, "hsi")),
      (A.format.hsi = (...e) => {
        let t,
          i,
          r,
          [s, a, n] = (e = c(e, "hsi"));
        return (
          isNaN(s) && (s = 0),
          isNaN(a) && (a = 0),
          s > 360 && (s -= 360),
          s < 0 && (s += 360),
          (s /= 360) < 1 / 3
            ? (i =
                1 -
                ((r = (1 - a) / 3) +
                  (t = (1 + (a * el(y * s)) / el(v - y * s)) / 3)))
            : s < 2 / 3
              ? ((s -= 1 / 3),
                (r =
                  1 -
                  ((t = (1 - a) / 3) +
                    (i = (1 + (a * el(y * s)) / el(v - y * s)) / 3))))
              : ((s -= 2 / 3),
                (t =
                  1 -
                  ((i = (1 - a) / 3) +
                    (r = (1 + (a * el(y * s)) / el(v - y * s)) / 3)))),
          (t = l(n * t * 3)),
          [
            255 * t,
            255 * (i = l(n * i * 3)),
            255 * (r = l(n * r * 3)),
            e.length > 3 ? e[3] : 1,
          ]
        );
      }),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "hsi"))) && 3 === e.length) return "hsi";
        },
      }),
      (q.hsi = (e, t, i) => es(e, t, i, "hsi")));
    let ec = (...e) => {
        let t,
          i,
          r,
          [s, a, n] = (e = c(e, "hsl"));
        if (0 === a) t = i = r = 255 * n;
        else {
          let e = [0, 0, 0],
            l = [0, 0, 0],
            o = n < 0.5 ? n * (1 + a) : n + a - n * a,
            h = 2 * n - o,
            f = s / 360;
          ((e[0] = f + 1 / 3), (e[1] = f), (e[2] = f - 1 / 3));
          for (let t = 0; t < 3; t++)
            (e[t] < 0 && (e[t] += 1),
              e[t] > 1 && (e[t] -= 1),
              6 * e[t] < 1
                ? (l[t] = h + (o - h) * 6 * e[t])
                : 2 * e[t] < 1
                  ? (l[t] = o)
                  : 3 * e[t] < 2
                    ? (l[t] = h + (o - h) * (2 / 3 - e[t]) * 6)
                    : (l[t] = h));
          [t, i, r] = [255 * l[0], 255 * l[1], 255 * l[2]];
        }
        return e.length > 3 ? [t, i, r, e[3]] : [t, i, r, 1];
      },
      eu = (...e) => {
        let t,
          i,
          [r, s, a] = (e = c(e, "rgba")),
          n = g((r /= 255), (s /= 255), (a /= 255)),
          l = p(r, s, a),
          o = (l + n) / 2;
        return (l === n
          ? ((t = 0), (i = NaN))
          : (t = o < 0.5 ? (l - n) / (l + n) : (l - n) / (2 - l - n)),
        r == l
          ? (i = (s - a) / (l - n))
          : s == l
            ? (i = 2 + (a - r) / (l - n))
            : a == l && (i = 4 + (r - s) / (l - n)),
        (i *= 60) < 0 && (i += 360),
        e.length > 3 && void 0 !== e[3])
          ? [i, t, o, e[3]]
          : [i, t, o];
      };
    ((S.prototype.hsl = function () {
      return eu(this._rgb);
    }),
      (L.hsl = (...e) => new S(...e, "hsl")),
      (A.format.hsl = ec),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "hsl"))) && 3 === e.length) return "hsl";
        },
      }),
      (q.hsl = (e, t, i) => es(e, t, i, "hsl")));
    let { floor: ed } = Math,
      { min: eg, max: ep } = Math;
    function eb(e, t) {
      let i = e.length;
      (Array.isArray(e[0]) || (e = [e]),
        Array.isArray(t[0]) || (t = t.map((e) => [e])));
      let r = t[0].length,
        s = t[0].map((e, i) => t.map((e) => e[i])),
        a = e.map((e) =>
          s.map((t) =>
            Array.isArray(e)
              ? e.reduce((e, i, r) => e + i * (t[r] || 0), 0)
              : t.reduce((t, i) => t + i * e, 0),
          ),
        );
      return (1 === i && (a = a[0]), 1 === r) ? a.map((e) => e[0]) : a;
    }
    ((S.prototype.hsv = function () {
      return ((...e) => {
        let t,
          i,
          [r, s, a] = (e = c(e, "rgb")),
          n = eg(r, s, a),
          l = ep(r, s, a),
          o = l - n;
        return (
          0 === l
            ? ((t = NaN), (i = 0))
            : ((i = o / l),
              r === l && (t = (s - a) / o),
              s === l && (t = 2 + (a - r) / o),
              a === l && (t = 4 + (r - s) / o),
              (t *= 60) < 0 && (t += 360)),
          [t, i, l / 255]
        );
      })(this._rgb);
    }),
      (L.hsv = (...e) => new S(...e, "hsv")),
      (A.format.hsv = (...e) => {
        let t,
          i,
          r,
          [s, a, n] = (e = c(e, "hsv"));
        if (((n *= 255), 0 === a)) t = i = r = n;
        else {
          (360 === s && (s = 0), s > 360 && (s -= 360), s < 0 && (s += 360));
          let e = ed((s /= 60)),
            l = s - e,
            o = n * (1 - a),
            h = n * (1 - a * l),
            f = n * (1 - a * (1 - l));
          switch (e) {
            case 0:
              [t, i, r] = [n, f, o];
              break;
            case 1:
              [t, i, r] = [h, n, o];
              break;
            case 2:
              [t, i, r] = [o, n, f];
              break;
            case 3:
              [t, i, r] = [o, h, n];
              break;
            case 4:
              [t, i, r] = [f, o, n];
              break;
            case 5:
              [t, i, r] = [n, o, h];
          }
        }
        return [t, i, r, e.length > 3 ? e[3] : 1];
      }),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "hsv"))) && 3 === e.length) return "hsv";
        },
      }),
      (q.hsv = (e, t, i) => es(e, t, i, "hsv")));
    let em = (...e) => {
        var t;
        let [i, r, s, ...a] = (e = c(e, "lab")),
          [n, l, o] =
            ((t = eb(
              [
                [1, 0.3963377773761749, 0.2158037573099136],
                [1, -0.1055613458156586, -0.0638541728258133],
                [1, -0.0894841775298119, -1.2914855480194092],
              ],
              [i, r, s],
            )),
            eb(
              [
                [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
                [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
                [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816],
              ],
              t.map((e) => e ** 3),
            )),
          [h, f, u] = B(n, l, o);
        return [h, f, u, ...(a.length > 0 && a[0] < 1 ? [a[0]] : [])];
      },
      ey = (...e) => {
        let t,
          [i, r, s, ...a] = c(e, "rgb");
        return [
          ...((t = eb(
            [
              [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
              [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
              [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
            ],
            P(i, r, s),
          )),
          eb(
            [
              [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
              [1.9779985324311684, -2.42859224204858, 0.450593709617411],
              [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
            ],
            t.map((e) => Math.cbrt(e)),
          )),
          ...(a.length > 0 && a[0] < 1 ? [a[0]] : []),
        ];
      };
    ((S.prototype.oklab = function () {
      return ey(this._rgb);
    }),
      Object.assign(L, { oklab: (...e) => new S(...e, "oklab") }),
      (A.format.oklab = em),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "oklab"))) && 3 === e.length)
            return "oklab";
        },
      }),
      (q.oklab = (e, t, i) => {
        let r = e.oklab(),
          s = t.oklab();
        return new S(
          r[0] + i * (s[0] - r[0]),
          r[1] + i * (s[1] - r[1]),
          r[2] + i * (s[2] - r[2]),
          "oklab",
        );
      }),
      (q.oklch = (e, t, i) => es(e, t, i, "oklch")));
    let { pow: ev, sqrt: ew, PI: ek, cos: e_, sin: eA, atan2: eS } = Math,
      { pow: eL } = Math;
    function ex(e) {
      let t = "rgb",
        i = L("#ccc"),
        r = 0,
        s = [0, 1],
        a = [],
        n = [0, 0],
        o = !1,
        h = [],
        c = !1,
        u = 0,
        d = 1,
        g = !1,
        p = {},
        b = !0,
        m = 1,
        y = function (e) {
          if (
            ("string" === f((e = e || ["#fff", "#000"])) &&
              L.brewer &&
              L.brewer[e.toLowerCase()] &&
              (e = L.brewer[e.toLowerCase()]),
            "array" === f(e))
          ) {
            (1 === e.length && (e = [e[0], e[0]]), (e = e.slice(0)));
            for (let t = 0; t < e.length; t++) e[t] = L(e[t]);
            a.length = 0;
            for (let t = 0; t < e.length; t++) a.push(t / (e.length - 1));
          }
          return (A(), (h = e));
        },
        v = function (e) {
          if (null != o) {
            let t = o.length - 1,
              i = 0;
            for (; i < t && e >= o[i]; ) i++;
            return i - 1;
          }
          return 0;
        },
        w = (e) => e,
        k = (e) => e,
        _ = function (e, r) {
          let s, c;
          if ((null == r && (r = !1), isNaN(e) || null === e)) return i;
          ((c = r
            ? e
            : o && o.length > 2
              ? v(e) / (o.length - 2)
              : d !== u
                ? (e - u) / (d - u)
                : 1),
            (c = k(c)),
            r || (c = w(c)),
            1 !== m && (c = eL(c, m)));
          let g = Math.floor(
            1e4 * (c = l((c = n[0] + c * (1 - n[0] - n[1])), 0, 1)),
          );
          if (b && p[g]) s = p[g];
          else {
            if ("array" === f(h))
              for (let e = 0; e < a.length; e++) {
                let i = a[e];
                if (c <= i || (c >= i && e === a.length - 1)) {
                  s = h[e];
                  break;
                }
                if (c > i && c < a[e + 1]) {
                  ((c = (c - i) / (a[e + 1] - i)),
                    (s = L.interpolate(h[e], h[e + 1], c, t)));
                  break;
                }
              }
            else "function" === f(h) && (s = h(c));
            b && (p[g] = s);
          }
          return s;
        };
      var A = () => (p = {});
      y(e);
      let S = function (e) {
        let t = L(_(e));
        return c && t[c] ? t[c]() : t;
      };
      return (
        (S.classes = function (e) {
          if (null != e) {
            if ("array" === f(e)) ((o = e), (s = [e[0], e[e.length - 1]]));
            else {
              let t = L.analyze(s);
              o = 0 === e ? [t.min, t.max] : L.limits(t, "e", e);
            }
            return S;
          }
          return o;
        }),
        (S.domain = function (e) {
          if (!arguments.length) return s;
          ((u = e[0]), (d = e[e.length - 1]), (a = []));
          let t = h.length;
          if (e.length === t && u !== d)
            for (let t of Array.from(e)) a.push((t - u) / (d - u));
          else {
            for (let e = 0; e < t; e++) a.push(e / (t - 1));
            if (e.length > 2) {
              let t = e.map((t, i) => i / (e.length - 1)),
                i = e.map((e) => (e - u) / (d - u));
              i.every((e, i) => t[i] === e) ||
                (k = (e) => {
                  if (e <= 0 || e >= 1) return e;
                  let r = 0;
                  for (; e >= i[r + 1]; ) r++;
                  let s = (e - i[r]) / (i[r + 1] - i[r]);
                  return t[r] + s * (t[r + 1] - t[r]);
                });
            }
          }
          return ((s = [u, d]), S);
        }),
        (S.mode = function (e) {
          return arguments.length ? ((t = e), A(), S) : t;
        }),
        (S.range = function (e, t) {
          return (y(e, t), S);
        }),
        (S.out = function (e) {
          return ((c = e), S);
        }),
        (S.spread = function (e) {
          return arguments.length ? ((r = e), S) : r;
        }),
        (S.correctLightness = function (e) {
          return (
            null == e && (e = !0),
            (g = e),
            A(),
            (w = g
              ? function (e) {
                  let t = _(0, !0).lab()[0],
                    i = _(1, !0).lab()[0],
                    r = t > i,
                    s = _(e, !0).lab()[0],
                    a = t + (i - t) * e,
                    n = s - a,
                    l = 0,
                    o = 1,
                    h = 20;
                  for (; Math.abs(n) > 0.01 && h-- > 0; )
                    (r && (n *= -1),
                      n < 0
                        ? ((l = e), (e += (o - e) * 0.5))
                        : ((o = e), (e += (l - e) * 0.5)),
                      (n = (s = _(e, !0).lab()[0]) - a));
                  return e;
                }
              : (e) => e),
            S
          );
        }),
        (S.padding = function (e) {
          return null != e
            ? ("number" === f(e) && (e = [e, e]), (n = e), S)
            : n;
        }),
        (S.colors = function (t, i) {
          arguments.length < 2 && (i = "hex");
          let r = [];
          if (0 == arguments.length) r = h.slice(0);
          else if (1 === t) r = [S(0.5)];
          else if (t > 1) {
            let e = s[0],
              i = s[1] - e;
            r = (function (e, t, i) {
              let r = [],
                s = 0 < t,
                a = i ? (s ? t + 1 : t - 1) : t;
              for (let e = 0; s ? e < a : e > a; s ? e++ : e--) r.push(e);
              return r;
            })(0, t, !1).map((r) => S(e + (r / (t - 1)) * i));
          } else {
            e = [];
            let t = [];
            if (o && o.length > 2)
              for (
                let e = 1, i = o.length, r = 1 <= i;
                r ? e < i : e > i;
                r ? e++ : e--
              )
                t.push((o[e - 1] + o[e]) * 0.5);
            else t = s;
            r = t.map((e) => S(e));
          }
          return (L[i] && (r = r.map((e) => e[i]())), r);
        }),
        (S.cache = function (e) {
          return null != e ? ((b = e), S) : b;
        }),
        (S.gamma = function (e) {
          return null != e ? ((m = e), S) : m;
        }),
        (S.nodata = function (e) {
          return null != e ? ((i = L(e)), S) : i;
        }),
        S
      );
    }
    let eE = function (e) {
        let t = [1, 1];
        for (let i = 1; i < e; i++) {
          let e = [1];
          for (let i = 1; i <= t.length; i++) e[i] = (t[i] || 0) + t[i - 1];
          t = e;
        }
        return t;
      },
      ez = function (e) {
        let t, i, r, s;
        if (2 === (e = e.map((e) => new S(e))).length)
          (([i, r] = e.map((e) => e.lab())),
            (t = function (e) {
              return new S(
                [0, 1, 2].map((t) => i[t] + e * (r[t] - i[t])),
                "lab",
              );
            }));
        else if (3 === e.length)
          (([i, r, s] = e.map((e) => e.lab())),
            (t = function (e) {
              return new S(
                [0, 1, 2].map(
                  (t) =>
                    (1 - e) * (1 - e) * i[t] +
                    2 * (1 - e) * e * r[t] +
                    e * e * s[t],
                ),
                "lab",
              );
            }));
        else if (4 === e.length) {
          let a;
          (([i, r, s, a] = e.map((e) => e.lab())),
            (t = function (e) {
              return new S(
                [0, 1, 2].map(
                  (t) =>
                    (1 - e) * (1 - e) * (1 - e) * i[t] +
                    3 * (1 - e) * (1 - e) * e * r[t] +
                    3 * (1 - e) * e * e * s[t] +
                    e * e * e * a[t],
                ),
                "lab",
              );
            }));
        } else if (e.length >= 5) {
          let i, r, s;
          ((i = e.map((e) => e.lab())),
            (r = eE((s = e.length - 1))),
            (t = function (e) {
              let t = 1 - e;
              return new S(
                [0, 1, 2].map((a) =>
                  i.reduce(
                    (i, n, l) => i + r[l] * t ** (s - l) * e ** l * n[a],
                    0,
                  ),
                ),
                "lab",
              );
            }));
        } else
          throw RangeError("No point in running bezier with only one color.");
        return t;
      },
      { round: eM } = Math;
    ((S.prototype.rgb = function (e = !0) {
      return !1 === e ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(eM);
    }),
      (S.prototype.rgba = function (e = !0) {
        return this._rgb
          .slice(0, 4)
          .map((t, i) => (i < 3 ? (!1 === e ? t : eM(t)) : t));
      }),
      Object.assign(L, { rgb: (...e) => new S(...e, "rgb") }),
      (A.format.rgb = (...e) => {
        let t = c(e, "rgba");
        return (void 0 === t[3] && (t[3] = 1), t);
      }),
      A.autodetect.push({
        p: 3,
        test: (...e) => {
          if (
            "array" === f((e = c(e, "rgba"))) &&
            (3 === e.length ||
              (4 === e.length && "number" == f(e[3]) && e[3] >= 0 && e[3] <= 1))
          )
            return "rgb";
        },
      }));
    let eF = (e, t, i) => {
        if (!eF[i]) throw Error("unknown blend mode " + i);
        return eF[i](e, t);
      },
      eT = (e) => (t, i) => {
        let r = L(i).rgb(),
          s = L(t).rgb();
        return L.rgb(e(r, s));
      },
      eO = (e) => (t, i) => {
        let r = [];
        return (
          (r[0] = e(t[0], i[0])),
          (r[1] = e(t[1], i[1])),
          (r[2] = e(t[2], i[2])),
          r
        );
      };
    ((eF.normal = eT(eO((e) => e))),
      (eF.multiply = eT(eO((e, t) => (e * t) / 255))),
      (eF.screen = eT(eO((e, t) => 255 * (1 - (1 - e / 255) * (1 - t / 255))))),
      (eF.overlay = eT(
        eO((e, t) =>
          t < 128
            ? (2 * e * t) / 255
            : 255 * (1 - 2 * (1 - e / 255) * (1 - t / 255)),
        ),
      )),
      (eF.darken = eT(eO((e, t) => (e > t ? t : e)))),
      (eF.lighten = eT(eO((e, t) => (e > t ? e : t)))),
      (eF.dodge = eT(
        eO((e, t) =>
          255 === e || (e = ((t / 255) * 255) / (1 - e / 255)) > 255 ? 255 : e,
        ),
      )),
      (eF.burn = eT(eO((e, t) => 255 * (1 - (1 - t / 255) / (e / 255))))));
    let { pow: eR, sin: eC, cos: eN } = Math,
      { floor: ej, random: eB } = Math,
      { log: e$, pow: eI, floor: eP, abs: eD } = Math;
    function eU(e, t = null) {
      let i = {
        min: Number.MAX_VALUE,
        max: -1 * Number.MAX_VALUE,
        sum: 0,
        values: [],
        count: 0,
      };
      return (
        "object" === f(e) && (e = Object.values(e)),
        e.forEach((e) => {
          (t && "object" === f(e) && (e = e[t]),
            null == e ||
              isNaN(e) ||
              (i.values.push(e),
              (i.sum += e),
              e < i.min && (i.min = e),
              e > i.max && (i.max = e),
              (i.count += 1)));
        }),
        (i.domain = [i.min, i.max]),
        (i.limits = (e, t) => eW(i, e, t)),
        i
      );
    }
    function eW(e, t = "equal", i = 7) {
      "array" == f(e) && (e = eU(e));
      let { min: r, max: s } = e,
        a = e.values.sort((e, t) => e - t);
      if (1 === i) return [r, s];
      let n = [];
      if (
        ("c" === t.substr(0, 1) && (n.push(r), n.push(s)),
        "e" === t.substr(0, 1))
      ) {
        n.push(r);
        for (let e = 1; e < i; e++) n.push(r + (e / i) * (s - r));
        n.push(s);
      } else if ("l" === t.substr(0, 1)) {
        if (r <= 0)
          throw Error("Logarithmic scales are only possible for values > 0");
        let e = Math.LOG10E * e$(r),
          t = Math.LOG10E * e$(s);
        n.push(r);
        for (let r = 1; r < i; r++) n.push(eI(10, e + (r / i) * (t - e)));
        n.push(s);
      } else if ("q" === t.substr(0, 1)) {
        n.push(r);
        for (let e = 1; e < i; e++) {
          let t = ((a.length - 1) * e) / i,
            r = eP(t);
          if (r === t) n.push(a[r]);
          else {
            let e = t - r;
            n.push(a[r] * (1 - e) + a[r + 1] * e);
          }
        }
        n.push(s);
      } else if ("k" === t.substr(0, 1)) {
        let e,
          t = a.length,
          l = Array(t),
          o = Array(i),
          h = !0,
          f = 0,
          c = null;
        (c = []).push(r);
        for (let e = 1; e < i; e++) c.push(r + (e / i) * (s - r));
        for (c.push(s); h; ) {
          for (let e = 0; e < i; e++) o[e] = 0;
          for (let e = 0; e < t; e++) {
            let t,
              r = a[e],
              s = Number.MAX_VALUE;
            for (let a = 0; a < i; a++) {
              let i = eD(c[a] - r);
              (i < s && ((s = i), (t = a)), o[t]++, (l[e] = t));
            }
          }
          let r = Array(i);
          for (let e = 0; e < i; e++) r[e] = null;
          for (let i = 0; i < t; i++)
            null === r[(e = l[i])] ? (r[e] = a[i]) : (r[e] += a[i]);
          for (let e = 0; e < i; e++) r[e] *= 1 / o[e];
          h = !1;
          for (let e = 0; e < i; e++)
            if (r[e] !== c[e]) {
              h = !0;
              break;
            }
          ((c = r), ++f > 200 && (h = !1));
        }
        let u = {};
        for (let e = 0; e < i; e++) u[e] = [];
        for (let i = 0; i < t; i++) u[(e = l[i])].push(a[i]);
        let d = [];
        for (let e = 0; e < i; e++)
          (d.push(u[e][0]), d.push(u[e][u[e].length - 1]));
        ((d = d.sort((e, t) => e - t)), n.push(d[0]));
        for (let e = 1; e < d.length; e += 2) {
          let t = d[e];
          isNaN(t) || -1 !== n.indexOf(t) || n.push(t);
        }
      }
      return n;
    }
    function eG(e, t, i) {
      return (
        0.2126729 * Math.pow(e / 255, 2.4) +
        0.7151522 * Math.pow(t / 255, 2.4) +
        0.072175 * Math.pow(i / 255, 2.4)
      );
    }
    let {
        sqrt: eq,
        pow: eY,
        min: eX,
        max: eH,
        atan2: eK,
        abs: eV,
        cos: eZ,
        sin: eQ,
        exp: eJ,
        PI: e0,
      } = Math,
      e1 = {
        OrRd: [
          "#fff7ec",
          "#fee8c8",
          "#fdd49e",
          "#fdbb84",
          "#fc8d59",
          "#ef6548",
          "#d7301f",
          "#b30000",
          "#7f0000",
        ],
        PuBu: [
          "#fff7fb",
          "#ece7f2",
          "#d0d1e6",
          "#a6bddb",
          "#74a9cf",
          "#3690c0",
          "#0570b0",
          "#045a8d",
          "#023858",
        ],
        BuPu: [
          "#f7fcfd",
          "#e0ecf4",
          "#bfd3e6",
          "#9ebcda",
          "#8c96c6",
          "#8c6bb1",
          "#88419d",
          "#810f7c",
          "#4d004b",
        ],
        Oranges: [
          "#fff5eb",
          "#fee6ce",
          "#fdd0a2",
          "#fdae6b",
          "#fd8d3c",
          "#f16913",
          "#d94801",
          "#a63603",
          "#7f2704",
        ],
        BuGn: [
          "#f7fcfd",
          "#e5f5f9",
          "#ccece6",
          "#99d8c9",
          "#66c2a4",
          "#41ae76",
          "#238b45",
          "#006d2c",
          "#00441b",
        ],
        YlOrBr: [
          "#ffffe5",
          "#fff7bc",
          "#fee391",
          "#fec44f",
          "#fe9929",
          "#ec7014",
          "#cc4c02",
          "#993404",
          "#662506",
        ],
        YlGn: [
          "#ffffe5",
          "#f7fcb9",
          "#d9f0a3",
          "#addd8e",
          "#78c679",
          "#41ab5d",
          "#238443",
          "#006837",
          "#004529",
        ],
        Reds: [
          "#fff5f0",
          "#fee0d2",
          "#fcbba1",
          "#fc9272",
          "#fb6a4a",
          "#ef3b2c",
          "#cb181d",
          "#a50f15",
          "#67000d",
        ],
        RdPu: [
          "#fff7f3",
          "#fde0dd",
          "#fcc5c0",
          "#fa9fb5",
          "#f768a1",
          "#dd3497",
          "#ae017e",
          "#7a0177",
          "#49006a",
        ],
        Greens: [
          "#f7fcf5",
          "#e5f5e0",
          "#c7e9c0",
          "#a1d99b",
          "#74c476",
          "#41ab5d",
          "#238b45",
          "#006d2c",
          "#00441b",
        ],
        YlGnBu: [
          "#ffffd9",
          "#edf8b1",
          "#c7e9b4",
          "#7fcdbb",
          "#41b6c4",
          "#1d91c0",
          "#225ea8",
          "#253494",
          "#081d58",
        ],
        Purples: [
          "#fcfbfd",
          "#efedf5",
          "#dadaeb",
          "#bcbddc",
          "#9e9ac8",
          "#807dba",
          "#6a51a3",
          "#54278f",
          "#3f007d",
        ],
        GnBu: [
          "#f7fcf0",
          "#e0f3db",
          "#ccebc5",
          "#a8ddb5",
          "#7bccc4",
          "#4eb3d3",
          "#2b8cbe",
          "#0868ac",
          "#084081",
        ],
        Greys: [
          "#ffffff",
          "#f0f0f0",
          "#d9d9d9",
          "#bdbdbd",
          "#969696",
          "#737373",
          "#525252",
          "#252525",
          "#000000",
        ],
        YlOrRd: [
          "#ffffcc",
          "#ffeda0",
          "#fed976",
          "#feb24c",
          "#fd8d3c",
          "#fc4e2a",
          "#e31a1c",
          "#bd0026",
          "#800026",
        ],
        PuRd: [
          "#f7f4f9",
          "#e7e1ef",
          "#d4b9da",
          "#c994c7",
          "#df65b0",
          "#e7298a",
          "#ce1256",
          "#980043",
          "#67001f",
        ],
        Blues: [
          "#f7fbff",
          "#deebf7",
          "#c6dbef",
          "#9ecae1",
          "#6baed6",
          "#4292c6",
          "#2171b5",
          "#08519c",
          "#08306b",
        ],
        PuBuGn: [
          "#fff7fb",
          "#ece2f0",
          "#d0d1e6",
          "#a6bddb",
          "#67a9cf",
          "#3690c0",
          "#02818a",
          "#016c59",
          "#014636",
        ],
        Viridis: [
          "#440154",
          "#482777",
          "#3f4a8a",
          "#31678e",
          "#26838f",
          "#1f9d8a",
          "#6cce5a",
          "#b6de2b",
          "#fee825",
        ],
        Spectral: [
          "#9e0142",
          "#d53e4f",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#ffffbf",
          "#e6f598",
          "#abdda4",
          "#66c2a5",
          "#3288bd",
          "#5e4fa2",
        ],
        RdYlGn: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#ffffbf",
          "#d9ef8b",
          "#a6d96a",
          "#66bd63",
          "#1a9850",
          "#006837",
        ],
        RdBu: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#f7f7f7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac",
          "#053061",
        ],
        PiYG: [
          "#8e0152",
          "#c51b7d",
          "#de77ae",
          "#f1b6da",
          "#fde0ef",
          "#f7f7f7",
          "#e6f5d0",
          "#b8e186",
          "#7fbc41",
          "#4d9221",
          "#276419",
        ],
        PRGn: [
          "#40004b",
          "#762a83",
          "#9970ab",
          "#c2a5cf",
          "#e7d4e8",
          "#f7f7f7",
          "#d9f0d3",
          "#a6dba0",
          "#5aae61",
          "#1b7837",
          "#00441b",
        ],
        RdYlBu: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#ffffbf",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4",
          "#313695",
        ],
        BrBG: [
          "#543005",
          "#8c510a",
          "#bf812d",
          "#dfc27d",
          "#f6e8c3",
          "#f5f5f5",
          "#c7eae5",
          "#80cdc1",
          "#35978f",
          "#01665e",
          "#003c30",
        ],
        RdGy: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#ffffff",
          "#e0e0e0",
          "#bababa",
          "#878787",
          "#4d4d4d",
          "#1a1a1a",
        ],
        PuOr: [
          "#7f3b08",
          "#b35806",
          "#e08214",
          "#fdb863",
          "#fee0b6",
          "#f7f7f7",
          "#d8daeb",
          "#b2abd2",
          "#8073ac",
          "#542788",
          "#2d004b",
        ],
        Set2: [
          "#66c2a5",
          "#fc8d62",
          "#8da0cb",
          "#e78ac3",
          "#a6d854",
          "#ffd92f",
          "#e5c494",
          "#b3b3b3",
        ],
        Accent: [
          "#7fc97f",
          "#beaed4",
          "#fdc086",
          "#ffff99",
          "#386cb0",
          "#f0027f",
          "#bf5b17",
          "#666666",
        ],
        Set1: [
          "#e41a1c",
          "#377eb8",
          "#4daf4a",
          "#984ea3",
          "#ff7f00",
          "#ffff33",
          "#a65628",
          "#f781bf",
          "#999999",
        ],
        Set3: [
          "#8dd3c7",
          "#ffffb3",
          "#bebada",
          "#fb8072",
          "#80b1d3",
          "#fdb462",
          "#b3de69",
          "#fccde5",
          "#d9d9d9",
          "#bc80bd",
          "#ccebc5",
          "#ffed6f",
        ],
        Dark2: [
          "#1b9e77",
          "#d95f02",
          "#7570b3",
          "#e7298a",
          "#66a61e",
          "#e6ab02",
          "#a6761d",
          "#666666",
        ],
        Paired: [
          "#a6cee3",
          "#1f78b4",
          "#b2df8a",
          "#33a02c",
          "#fb9a99",
          "#e31a1c",
          "#fdbf6f",
          "#ff7f00",
          "#cab2d6",
          "#6a3d9a",
          "#ffff99",
          "#b15928",
        ],
        Pastel2: [
          "#b3e2cd",
          "#fdcdac",
          "#cbd5e8",
          "#f4cae4",
          "#e6f5c9",
          "#fff2ae",
          "#f1e2cc",
          "#cccccc",
        ],
        Pastel1: [
          "#fbb4ae",
          "#b3cde3",
          "#ccebc5",
          "#decbe4",
          "#fed9a6",
          "#ffffcc",
          "#e5d8bd",
          "#fddaec",
          "#f2f2f2",
        ],
      },
      e2 = Object.keys(e1),
      e5 = new Map(e2.map((e) => [e.toLowerCase(), e])),
      e3 =
        "function" == typeof Proxy
          ? new Proxy(e1, {
              get(e, t) {
                let i = t.toLowerCase();
                if (e5.has(i)) return e[e5.get(i)];
              },
              getOwnPropertyNames: () => Object.getOwnPropertyNames(e2),
            })
          : e1,
      { max: e6 } = Math;
    ((S.prototype.cmyk = function () {
      return ((...e) => {
        let [t, i, r] = c(e, "rgb"),
          s = 1 - e6((t /= 255), e6((i /= 255), (r /= 255))),
          a = s < 1 ? 1 / (1 - s) : 0;
        return [(1 - t - s) * a, (1 - i - s) * a, (1 - r - s) * a, s];
      })(this._rgb);
    }),
      Object.assign(L, { cmyk: (...e) => new S(...e, "cmyk") }),
      (A.format.cmyk = (...e) => {
        let [t, i, r, s] = (e = c(e, "cmyk")),
          a = e.length > 4 ? e[4] : 1;
        return 1 === s
          ? [0, 0, 0, a]
          : [
              t >= 1 ? 0 : 255 * (1 - t) * (1 - s),
              i >= 1 ? 0 : 255 * (1 - i) * (1 - s),
              r >= 1 ? 0 : 255 * (1 - r) * (1 - s),
              a,
            ];
      }),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "cmyk"))) && 4 === e.length)
            return "cmyk";
        },
      }));
    let e4 = (...e) => {
        let [t, i, r, ...s] = c(e, "rgb"),
          [a, n, l] = ey(t, i, r),
          [o, h, f] = ee(a, n, l);
        return [o, h, f, ...(s.length > 0 && s[0] < 1 ? [s[0]] : [])];
      },
      { round: e8 } = Math,
      e9 = (...e) => {
        let [t, i, r, ...s] = (e = c(e, "lch")),
          [a, n, l] = K(t, i, r),
          [o, h, f] = em(a, n, l);
        return [o, h, f, ...(s.length > 0 && s[0] < 1 ? [s[0]] : [])];
      },
      e7 = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,
      te = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,
      tt = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,
      ti = /\s*/.source,
      tr = /\s+/.source,
      ts = /\s*,\s*/.source,
      ta = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,
      tn = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,
      tl = RegExp("^rgba?\\(" + ti + [e7, e7, e7].join(tr) + tn + "\\)$"),
      to = RegExp("^rgb\\(" + ti + [e7, e7, e7].join(ts) + ti + "\\)$"),
      th = RegExp("^rgba\\(" + ti + [e7, e7, e7, te].join(ts) + ti + "\\)$"),
      tf = RegExp("^hsla?\\(" + ti + [ta, tt, tt].join(tr) + tn + "\\)$"),
      tc = RegExp("^hsl?\\(" + ti + [ta, tt, tt].join(ts) + ti + "\\)$"),
      tu =
        /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,
      td = RegExp("^lab\\(" + ti + [te, te, te].join(tr) + tn + "\\)$"),
      tg = RegExp("^lch\\(" + ti + [te, te, ta].join(tr) + tn + "\\)$"),
      tp = RegExp("^oklab\\(" + ti + [te, te, te].join(tr) + tn + "\\)$"),
      tb = RegExp("^oklch\\(" + ti + [te, te, ta].join(tr) + tn + "\\)$"),
      { round: tm } = Math,
      ty = (e) => e.map((e, t) => (t <= 2 ? l(tm(e), 0, 255) : e)),
      tv = (e, t = 0, i = 100, r = !1) => (
        "string" == typeof e &&
          e.endsWith("%") &&
          ((e = parseFloat(e.substring(0, e.length - 1)) / 100),
          (e = r ? t + (e + 1) * 0.5 * (i - t) : t + e * (i - t))),
        +e
      ),
      tw = (e, t) => ("none" === e ? t : e),
      tk = (e) => {
        let t;
        if ("transparent" === (e = e.toLowerCase().trim())) return [0, 0, 0, 0];
        if (A.format.named)
          try {
            return A.format.named(e);
          } catch (e) {}
        if ((t = e.match(tl)) || (t = e.match(to))) {
          let e = t.slice(1, 4);
          for (let t = 0; t < 3; t++) e[t] = +tv(tw(e[t], 0), 0, 255);
          e = ty(e);
          let i = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((e[3] = i), e);
        }
        if ((t = e.match(th))) {
          let e = t.slice(1, 5);
          for (let t = 0; t < 4; t++) e[t] = +tv(e[t], 0, 255);
          return e;
        }
        if ((t = e.match(tf)) || (t = e.match(tc))) {
          let e = t.slice(1, 4);
          ((e[0] = +tw(e[0].replace("deg", ""), 0)),
            (e[1] = 0.01 * tv(tw(e[1], 0), 0, 100)),
            (e[2] = 0.01 * tv(tw(e[2], 0), 0, 100)));
          let i = ty(ec(e)),
            r = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((i[3] = r), i);
        }
        if ((t = e.match(tu))) {
          let e = t.slice(1, 4);
          ((e[1] *= 0.01), (e[2] *= 0.01));
          let i = ec(e);
          for (let e = 0; e < 3; e++) i[e] = tm(i[e]);
          return ((i[3] = +t[4]), i);
        }
        if ((t = e.match(td))) {
          let e = t.slice(1, 4);
          ((e[0] = tv(tw(e[0], 0), 0, 100)),
            (e[1] = tv(tw(e[1], 0), -125, 125, !0)),
            (e[2] = tv(tw(e[2], 0), -125, 125, !0)));
          let i = N();
          C("d50");
          let r = ty($(e));
          C(i);
          let s = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((r[3] = s), r);
        }
        if ((t = e.match(tg))) {
          let e = t.slice(1, 4);
          ((e[0] = tv(e[0], 0, 100)),
            (e[1] = tv(tw(e[1], 0), 0, 150, !1)),
            (e[2] = +tw(e[2].replace("deg", ""), 0)));
          let i = N();
          C("d50");
          let r = ty(V(e));
          C(i);
          let s = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((r[3] = s), r);
        }
        if ((t = e.match(tp))) {
          let e = t.slice(1, 4);
          ((e[0] = tv(tw(e[0], 0), 0, 1)),
            (e[1] = tv(tw(e[1], 0), -0.4, 0.4, !0)),
            (e[2] = tv(tw(e[2], 0), -0.4, 0.4, !0)));
          let i = ty(em(e)),
            r = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((i[3] = r), i);
        }
        if ((t = e.match(tb))) {
          let e = t.slice(1, 4);
          ((e[0] = tv(tw(e[0], 0), 0, 1)),
            (e[1] = tv(tw(e[1], 0), 0, 0.4, !1)),
            (e[2] = +tw(e[2].replace("deg", ""), 0)));
          let i = ty(e9(e)),
            r = void 0 !== t[4] ? +tv(t[4], 0, 1) : 1;
          return ((i[3] = r), i);
        }
      };
    ((tk.test = (e) =>
      tl.test(e) ||
      tf.test(e) ||
      td.test(e) ||
      tg.test(e) ||
      tp.test(e) ||
      tb.test(e) ||
      to.test(e) ||
      th.test(e) ||
      tc.test(e) ||
      tu.test(e) ||
      "transparent" === e),
      (S.prototype.css = function (e) {
        return ((...e) => {
          let t = c(e, "rgba"),
            i = u(e) || "rgb";
          if ("hsl" === i.substr(0, 3))
            return ((...e) => {
              let t = c(e, "hsla"),
                i = u(e) || "lsa";
              return (
                (t[0] = b(t[0] || 0) + "deg"),
                (t[1] = b(100 * t[1]) + "%"),
                (t[2] = b(100 * t[2]) + "%"),
                "hsla" === i || (t.length > 3 && t[3] < 1)
                  ? ((t[3] = "/ " + (t.length > 3 ? t[3] : 1)), (i = "hsla"))
                  : (t.length = 3),
                `${i.substr(0, 3)}(${t.join(" ")})`
              );
            })(eu(t), i);
          if ("lab" === i.substr(0, 3)) {
            let e = N();
            C("d50");
            let r = ((...e) => {
              let t = c(e, "lab"),
                i = u(e) || "lab";
              return (
                (t[0] = b(t[0]) + "%"),
                (t[1] = b(t[1])),
                (t[2] = b(t[2])),
                "laba" === i || (t.length > 3 && t[3] < 1)
                  ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1))
                  : (t.length = 3),
                `lab(${t.join(" ")})`
              );
            })(D(t), i);
            return (C(e), r);
          }
          if ("lch" === i.substr(0, 3)) {
            let e = N();
            C("d50");
            let r = ((...e) => {
              let t = c(e, "lch"),
                i = u(e) || "lab";
              return (
                (t[0] = b(t[0]) + "%"),
                (t[1] = b(t[1])),
                (t[2] = isNaN(t[2]) ? "none" : b(t[2]) + "deg"),
                "lcha" === i || (t.length > 3 && t[3] < 1)
                  ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1))
                  : (t.length = 3),
                `lch(${t.join(" ")})`
              );
            })(et(t), i);
            return (C(e), r);
          }
          return "oklab" === i.substr(0, 5)
            ? ((...e) => {
                let t = c(e, "lab");
                return (
                  (t[0] = b(100 * t[0]) + "%"),
                  (t[1] = m(t[1])),
                  (t[2] = m(t[2])),
                  t.length > 3 && t[3] < 1
                    ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1))
                    : (t.length = 3),
                  `oklab(${t.join(" ")})`
                );
              })(ey(t))
            : "oklch" === i.substr(0, 5)
              ? ((...e) => {
                  let t = c(e, "lch");
                  return (
                    (t[0] = b(100 * t[0]) + "%"),
                    (t[1] = m(t[1])),
                    (t[2] = isNaN(t[2]) ? "none" : b(t[2]) + "deg"),
                    t.length > 3 && t[3] < 1
                      ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1))
                      : (t.length = 3),
                    `oklch(${t.join(" ")})`
                  );
                })(e4(t))
              : ((t[0] = e8(t[0])),
                (t[1] = e8(t[1])),
                (t[2] = e8(t[2])),
                ("rgba" === i || (t.length > 3 && t[3] < 1)) &&
                  ((t[3] = "/ " + (t.length > 3 ? t[3] : 1)), (i = "rgba")),
                `${i.substr(0, 3)}(${t.slice(0, "rgb" === i ? 3 : 4).join(" ")})`);
        })(this._rgb, e);
      }),
      (L.css = (...e) => new S(...e, "css")),
      (A.format.css = tk),
      A.autodetect.push({
        p: 5,
        test: (e, ...t) => {
          if (!t.length && "string" === f(e) && tk.test(e)) return "css";
        },
      }),
      (A.format.gl = (...e) => {
        let t = c(e, "rgba");
        return ((t[0] *= 255), (t[1] *= 255), (t[2] *= 255), t);
      }),
      (L.gl = (...e) => new S(...e, "gl")),
      (S.prototype.gl = function () {
        let e = this._rgb;
        return [e[0] / 255, e[1] / 255, e[2] / 255, e[3]];
      }),
      (S.prototype.hex = function (e) {
        return T(this._rgb, e);
      }),
      (L.hex = (...e) => new S(...e, "hex")),
      (A.format.hex = M),
      A.autodetect.push({
        p: 4,
        test: (e, ...t) => {
          if (
            !t.length &&
            "string" === f(e) &&
            [3, 4, 5, 6, 7, 8, 9].indexOf(e.length) >= 0
          )
            return "hex";
        },
      }));
    let { log: t_ } = Math,
      tA = (e) => {
        let t,
          i,
          r,
          s = e / 100;
        return (
          s < 66
            ? ((t = 255),
              (i =
                s < 6
                  ? 0
                  : -155.25485562709179 -
                    0.44596950469579133 * (i = s - 2) +
                    104.49216199393888 * t_(i)),
              (r =
                s < 20
                  ? 0
                  : -254.76935184120902 +
                    0.8274096064007395 * (r = s - 10) +
                    115.67994401066147 * t_(r)))
            : ((t =
                351.97690566805693 +
                0.114206453784165 * (t = s - 55) -
                40.25366309332127 * t_(t)),
              (i =
                325.4494125711974 +
                0.07943456536662342 * (i = s - 50) -
                28.0852963507957 * t_(i)),
              (r = 255)),
          [t, i, r, 1]
        );
      },
      { round: tS } = Math;
    S.prototype.temp =
      S.prototype.kelvin =
      S.prototype.temperature =
        function () {
          return ((...e) => {
            let t,
              i = c(e, "rgb"),
              r = i[0],
              s = i[2],
              a = 1e3,
              n = 4e4;
            for (; n - a > 0.4; ) {
              let e = tA((t = (n + a) * 0.5));
              e[2] / e[0] >= s / r ? (n = t) : (a = t);
            }
            return tS(t);
          })(this._rgb);
        };
    let tL = (...e) => new S(...e, "temp");
    function tx() {
      return [];
    }
    function tE(e, t) {
      if (e.endsWith("?client_layer")) {
        let i,
          { match: r } = { match: (i = t.match(s)) ? i[0] : null };
        null !== r &&
          tT(`Warning: A sensitive environment "${r}" is exposed to the client in file "${e.replace(/(^v0\/|\?client_layer$)/, "")}", which can be a potential security risk. 
Please remove the sensitive environment variable from the client code – either completely or by using a server component/action to fetch the value.`);
      }
    }
    (Object.assign(L, { temp: tL, kelvin: tL, temperature: tL }),
      (A.format.temp = A.format.kelvin = A.format.temperature = tA),
      (S.prototype.oklch = function () {
        return e4(this._rgb);
      }),
      Object.assign(L, { oklch: (...e) => new S(...e, "oklch") }),
      (A.format.oklch = e9),
      A.autodetect.push({
        p: 2,
        test: (...e) => {
          if ("array" === f((e = c(e, "oklch"))) && 3 === e.length)
            return "oklch";
        },
      }),
      Object.assign(L, {
        analyze: eU,
        average: (e, t = "lrgb", i = null) => {
          let r = e.length;
          i || (i = Array.from(Array(r)).map(() => 1));
          let s =
            r /
            i.reduce(function (e, t) {
              return e + t;
            });
          if (
            (i.forEach((e, t) => {
              i[t] *= s;
            }),
            (e = e.map((e) => new S(e))),
            "lrgb" === t)
          )
            return ((e, t) => {
              let i = e.length,
                r = [0, 0, 0, 0];
              for (let s = 0; s < e.length; s++) {
                let a = e[s],
                  n = t[s] / i,
                  l = a._rgb;
                ((r[0] += ev(l[0], 2) * n),
                  (r[1] += ev(l[1], 2) * n),
                  (r[2] += ev(l[2], 2) * n),
                  (r[3] += l[3] * n));
              }
              return (
                (r[0] = ew(r[0])),
                (r[1] = ew(r[1])),
                (r[2] = ew(r[2])),
                r[3] > 0.9999999 && (r[3] = 1),
                new S(o(r))
              );
            })(e, i);
          let a = e.shift(),
            n = a.get(t),
            l = [],
            h = 0,
            f = 0;
          for (let e = 0; e < n.length; e++)
            if (
              ((n[e] = (n[e] || 0) * i[0]),
              l.push(isNaN(n[e]) ? 0 : i[0]),
              "h" === t.charAt(e) && !isNaN(n[e]))
            ) {
              let t = (n[e] / 180) * ek;
              ((h += e_(t) * i[0]), (f += eA(t) * i[0]));
            }
          let c = a.alpha() * i[0];
          e.forEach((e, r) => {
            let s = e.get(t);
            c += e.alpha() * i[r + 1];
            for (let e = 0; e < n.length; e++)
              if (!isNaN(s[e]))
                if (((l[e] += i[r + 1]), "h" === t.charAt(e))) {
                  let t = (s[e] / 180) * ek;
                  ((h += e_(t) * i[r + 1]), (f += eA(t) * i[r + 1]));
                } else n[e] += s[e] * i[r + 1];
          });
          for (let e = 0; e < n.length; e++)
            if ("h" === t.charAt(e)) {
              let t = (eS(f / l[e], h / l[e]) / ek) * 180;
              for (; t < 0; ) t += 360;
              for (; t >= 360; ) t -= 360;
              n[e] = t;
            } else n[e] = n[e] / l[e];
          return ((c /= r), new S(n, t).alpha(c > 0.99999 ? 1 : c, !0));
        },
        bezier: (e) => {
          let t = ez(e);
          return ((t.scale = () => ex(t)), t);
        },
        blend: eF,
        brewer: e3,
        Color: S,
        colors: x,
        contrast: (e, t) => {
          ((e = new S(e)), (t = new S(t)));
          let i = e.luminance(),
            r = t.luminance();
          return i > r ? (i + 0.05) / (r + 0.05) : (r + 0.05) / (i + 0.05);
        },
        contrastAPCA: (e, t) => {
          ((e = new S(e)),
            (t = new S(t)),
            1 > e.alpha() && (e = Y(t, e, e.alpha(), "rgb")));
          let i = eG(...e.rgb()),
            r = eG(...t.rgb()),
            s = i >= 0.022 ? i : i + Math.pow(0.022 - i, 1.414),
            a = r >= 0.022 ? r : r + Math.pow(0.022 - r, 1.414),
            n = Math.pow(a, 0.56) - Math.pow(s, 0.57),
            l = Math.pow(a, 0.65) - Math.pow(s, 0.62),
            o = 5e-4 > Math.abs(a - s) ? 0 : s < a ? 1.14 * n : 1.14 * l;
          return 100 * (0.1 > Math.abs(o) ? 0 : o > 0 ? o - 0.027 : o + 0.027);
        },
        cubehelix: function (e = 300, t = -1.5, i = 1, r = 1, s = [0, 1]) {
          let a = 0,
            n;
          "array" === f(s) ? (n = s[1] - s[0]) : ((n = 0), (s = [s, s]));
          let l = function (l) {
            let h = y * ((e + 120) / 360 + t * l),
              f = eR(s[0] + n * l, r),
              c = ((0 !== a ? i[0] + l * a : i) * f * (1 - f)) / 2,
              u = eN(h),
              d = eC(h);
            return L(
              o([
                255 * (f + c * (-0.14861 * u + 1.78277 * d)),
                255 * (f + c * (-0.29227 * u - 0.90649 * d)),
                255 * (f + 1.97294 * u * c),
                1,
              ]),
            );
          };
          return (
            (l.start = function (t) {
              return null == t ? e : ((e = t), l);
            }),
            (l.rotations = function (e) {
              return null == e ? t : ((t = e), l);
            }),
            (l.gamma = function (e) {
              return null == e ? r : ((r = e), l);
            }),
            (l.hue = function (e) {
              return null == e
                ? i
                : ("array" === f((i = e))
                    ? 0 == (a = i[1] - i[0]) && (i = i[1])
                    : (a = 0),
                  l);
            }),
            (l.lightness = function (e) {
              return null == e
                ? s
                : ("array" === f(e)
                    ? ((s = e), (n = e[1] - e[0]))
                    : ((s = [e, e]), (n = 0)),
                  l);
            }),
            (l.scale = () => L.scale(l)),
            l.hue(i),
            l
          );
        },
        deltaE: function (e, t, i = 1, r = 1, s = 1) {
          var a = function (e) {
              return (360 * e) / (2 * e0);
            },
            n = function (e) {
              return (2 * e0 * e) / 360;
            };
          ((e = new S(e)), (t = new S(t)));
          let [l, o, h] = Array.from(e.lab()),
            [f, c, u] = Array.from(t.lab()),
            d = (l + f) / 2,
            g = (eq(eY(o, 2) + eY(h, 2)) + eq(eY(c, 2) + eY(u, 2))) / 2,
            p = 0.5 * (1 - eq(eY(g, 7) / (eY(g, 7) + eY(25, 7)))),
            b = o * (1 + p),
            m = c * (1 + p),
            y = eq(eY(b, 2) + eY(h, 2)),
            v = eq(eY(m, 2) + eY(u, 2)),
            w = (y + v) / 2,
            k = a(eK(h, b)),
            _ = a(eK(u, m)),
            A = k >= 0 ? k : k + 360,
            L = _ >= 0 ? _ : _ + 360,
            x = eV(A - L) > 180 ? (A + L + 360) / 2 : (A + L) / 2,
            E =
              1 -
              0.17 * eZ(n(x - 30)) +
              0.24 * eZ(n(2 * x)) +
              0.32 * eZ(n(3 * x + 6)) -
              0.2 * eZ(n(4 * x - 63)),
            z = L - A;
          ((z = 180 >= eV(z) ? z : L <= A ? z + 360 : z - 360),
            (z = 2 * eq(y * v) * eQ(n(z) / 2)));
          let M = v - y,
            F = 1 + (0.015 * eY(d - 50, 2)) / eq(20 + eY(d - 50, 2)),
            T = 1 + 0.045 * w,
            O = 1 + 0.015 * w * E,
            R = 30 * eJ(-eY((x - 275) / 25, 2)),
            C = -(2 * eq(eY(w, 7) / (eY(w, 7) + eY(25, 7)))) * eQ(2 * n(R));
          return eH(
            0,
            eX(
              100,
              eq(
                eY((f - l) / (i * F), 2) +
                  eY(M / (r * T), 2) +
                  eY(z / (s * O), 2) +
                  (M / (r * T)) * C * (z / (s * O)),
              ),
            ),
          );
        },
        distance: function (e, t, i = "lab") {
          ((e = new S(e)), (t = new S(t)));
          let r = e.get(i),
            s = t.get(i),
            a = 0;
          for (let e in r) {
            let t = (r[e] || 0) - (s[e] || 0);
            a += t * t;
          }
          return Math.sqrt(a);
        },
        input: A,
        interpolate: Y,
        limits: eW,
        mix: Y,
        random: () => {
          let e = "#";
          for (let t = 0; t < 6; t++)
            e += "0123456789abcdef".charAt(ej(16 * eB()));
          return new S(e, "hex");
        },
        scale: ex,
        scales: {
          cool: () => ex([L.hsl(180, 1, 0.9), L.hsl(250, 0.7, 0.4)]),
          hot: () =>
            ex(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode(
              "rgb",
            ),
        },
        valid: (...e) => {
          try {
            return (new S(...e), !0);
          } catch (e) {
            return !1;
          }
        },
      }));
    class tz extends Error {
      code;
      constructor(e, t = "FATAL_RENDERER_ERROR") {
        (super(e),
          (this.name = "FatalRendererError"),
          (this.code = t),
          Object.setPrototypeOf(this, tz.prototype));
      }
    }
    let tM = [],
      tF = !0;
    function tT(e) {
      tF && tM.length < 10 && tM[tM.length - 1] !== e && tM.push(e);
    }
    function tO() {
      return tM;
    }
    function tR() {
      tM.length = 0;
    }
    function tC() {
      (tR(), (tF = !0));
    }
    function tN(e = !0) {
      if (e) for (let e of tx()) tT(e);
      tF = !1;
    }
    function tj(e, t, i) {
      return (
        tC(),
        e.finally(() => {
          (t(tM), tN(i), tR());
        })
      );
    }
  },
  634826,
  (e) => {
    "use strict";
    e.s([
      "ESMSH_BASE_URL",
      0,
      "https://esm.v0.app",
      "FAKE_GATEWAY_API_KEY",
      0,
      "vck_abc123",
      "GET_REQ_HEADERS",
      0,
      () =>
        Object.entries({
          "User-Agent": navigator.userAgent,
          Host: window.location.host,
          Origin: window.location.origin,
          Referer: document.referrer,
          "Accept-Language": navigator.language,
          "X-Forwarded-Proto": window.location.protocol.slice(0, -1),
          "X-Forwarded-Host": window.location.host,
          "X-Forwarded-For": "127.0.0.1",
          "Sec-Ch-Ua": navigator.userAgent.replace(/\/|\)/g, ""),
          "Sec-Ch-Ua-Mobile":
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent,
            )
              ? "?1"
              : "?0",
          "Sec-Ch-Ua-Platform": navigator.platform,
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-User": "?1",
          "Sec-Fetch-Dest": window.parent !== window ? "iframe" : "document",
          Accept: "*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          Cookie: document.cookie,
        }),
      "LITE_PASS_THROUGH",
      0,
      /^\/(_next\/|api\/esm|api\/cors|api\/dns|api\/encrypt-npm-token|cors-proxy-test-page|api\/static-resource|_app\/|assets\/(lightningcss_node\.wasm|tailwind-v3\.js|tailwind-v4\.js|lite-runtime.js|libs\.js|3d\/|stripe\/)|favicon\.ico|__v0_sw\.js|__nextjs_original-stack-frame|placeholder\.(svg|jpg)|placeholder-(logo|user)\.(svg|png|jpg)|r3f\/|fonts\/)/,
    ]);
  },
  5743,
  (e) => {
    "use strict";
    var t = e.i(903664);
    let i =
        "object" == typeof performance &&
        performance &&
        "function" == typeof performance.now
          ? performance
          : Date,
      r = new Set(),
      s = "object" == typeof t.default && t.default ? t.default : {},
      a = (e, t, i, r) => {
        "function" == typeof s.emitWarning
          ? s.emitWarning(e, t, i, r)
          : console.error(`[${i}] ${t}: ${e}`);
      },
      n = globalThis.AbortController,
      l = globalThis.AbortSignal;
    if (void 0 === n) {
      ((l = class {
        onabort;
        _onabort = [];
        reason;
        aborted = !1;
        addEventListener(e, t) {
          this._onabort.push(t);
        }
      }),
        (n = class {
          constructor() {
            t();
          }
          signal = new l();
          abort(e) {
            if (!this.signal.aborted) {
              for (let t of ((this.signal.reason = e),
              (this.signal.aborted = !0),
              this.signal._onabort))
                t(e);
              this.signal.onabort?.(e);
            }
          }
        }));
      let e = s.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
        t = () => {
          e &&
            ((e = !1),
            a(
              "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
              "NO_ABORT_CONTROLLER",
              "ENOTSUP",
              t,
            ));
        };
    }
    Symbol("type");
    let o = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
      h = (e) =>
        o(e)
          ? e <= 256
            ? Uint8Array
            : e <= 65536
              ? Uint16Array
              : e <= 0x100000000
                ? Uint32Array
                : e <= Number.MAX_SAFE_INTEGER
                  ? f
                  : null
          : null;
    class f extends Array {
      constructor(e) {
        (super(e), this.fill(0));
      }
    }
    class c {
      heap;
      length;
      static #e = !1;
      static create(e) {
        let t = h(e);
        if (!t) return [];
        c.#e = !0;
        let i = new c(e, t);
        return ((c.#e = !1), i);
      }
      constructor(e, t) {
        if (!c.#e) throw TypeError("instantiate Stack using Stack.create(n)");
        ((this.heap = new t(e)), (this.length = 0));
      }
      push(e) {
        this.heap[this.length++] = e;
      }
      pop() {
        return this.heap[--this.length];
      }
    }
    class u {
      #t;
      #i;
      #r;
      #s;
      #a;
      ttl;
      ttlResolution;
      ttlAutopurge;
      updateAgeOnGet;
      updateAgeOnHas;
      allowStale;
      noDisposeOnSet;
      noUpdateTTL;
      maxEntrySize;
      sizeCalculation;
      noDeleteOnFetchRejection;
      noDeleteOnStaleGet;
      allowStaleOnFetchAbort;
      allowStaleOnFetchRejection;
      ignoreFetchAbort;
      #n;
      #l;
      #o;
      #h;
      #f;
      #c;
      #u;
      #d;
      #g;
      #p;
      #b;
      #m;
      #y;
      #v;
      #w;
      #k;
      #_;
      static unsafeExposeInternals(e) {
        return {
          starts: e.#y,
          ttls: e.#v,
          sizes: e.#m,
          keyMap: e.#o,
          keyList: e.#h,
          valList: e.#f,
          next: e.#c,
          prev: e.#u,
          get head() {
            return e.#d;
          },
          get tail() {
            return e.#g;
          },
          free: e.#p,
          isBackgroundFetch: (t) => e.#A(t),
          backgroundFetch: (t, i, r, s) => e.#S(t, i, r, s),
          moveToTail: (t) => e.#L(t),
          indexes: (t) => e.#x(t),
          rindexes: (t) => e.#E(t),
          isStale: (t) => e.#z(t),
        };
      }
      get max() {
        return this.#t;
      }
      get maxSize() {
        return this.#i;
      }
      get calculatedSize() {
        return this.#l;
      }
      get size() {
        return this.#n;
      }
      get fetchMethod() {
        return this.#a;
      }
      get dispose() {
        return this.#r;
      }
      get disposeAfter() {
        return this.#s;
      }
      constructor(e) {
        const {
          max: t = 0,
          ttl: i,
          ttlResolution: s = 1,
          ttlAutopurge: n,
          updateAgeOnGet: l,
          updateAgeOnHas: f,
          allowStale: d,
          dispose: g,
          disposeAfter: p,
          noDisposeOnSet: b,
          noUpdateTTL: m,
          maxSize: y = 0,
          maxEntrySize: v = 0,
          sizeCalculation: w,
          fetchMethod: k,
          noDeleteOnFetchRejection: _,
          noDeleteOnStaleGet: A,
          allowStaleOnFetchRejection: S,
          allowStaleOnFetchAbort: L,
          ignoreFetchAbort: x,
        } = e;
        if (0 !== t && !o(t))
          throw TypeError("max option must be a nonnegative integer");
        const E = t ? h(t) : Array;
        if (!E) throw Error("invalid max value: " + t);
        if (
          ((this.#t = t),
          (this.#i = y),
          (this.maxEntrySize = v || this.#i),
          (this.sizeCalculation = w),
          this.sizeCalculation)
        ) {
          if (!this.#i && !this.maxEntrySize)
            throw TypeError(
              "cannot set sizeCalculation without setting maxSize or maxEntrySize",
            );
          if ("function" != typeof this.sizeCalculation)
            throw TypeError("sizeCalculation set to non-function");
        }
        if (void 0 !== k && "function" != typeof k)
          throw TypeError("fetchMethod must be a function if specified");
        if (
          ((this.#a = k),
          (this.#k = !!k),
          (this.#o = new Map()),
          (this.#h = Array(t).fill(void 0)),
          (this.#f = Array(t).fill(void 0)),
          (this.#c = new E(t)),
          (this.#u = new E(t)),
          (this.#d = 0),
          (this.#g = 0),
          (this.#p = c.create(t)),
          (this.#n = 0),
          (this.#l = 0),
          "function" == typeof g && (this.#r = g),
          "function" == typeof p
            ? ((this.#s = p), (this.#b = []))
            : ((this.#s = void 0), (this.#b = void 0)),
          (this.#w = !!this.#r),
          (this.#_ = !!this.#s),
          (this.noDisposeOnSet = !!b),
          (this.noUpdateTTL = !!m),
          (this.noDeleteOnFetchRejection = !!_),
          (this.allowStaleOnFetchRejection = !!S),
          (this.allowStaleOnFetchAbort = !!L),
          (this.ignoreFetchAbort = !!x),
          0 !== this.maxEntrySize)
        ) {
          if (0 !== this.#i && !o(this.#i))
            throw TypeError("maxSize must be a positive integer if specified");
          if (!o(this.maxEntrySize))
            throw TypeError(
              "maxEntrySize must be a positive integer if specified",
            );
          this.#M();
        }
        if (
          ((this.allowStale = !!d),
          (this.noDeleteOnStaleGet = !!A),
          (this.updateAgeOnGet = !!l),
          (this.updateAgeOnHas = !!f),
          (this.ttlResolution = o(s) || 0 === s ? s : 1),
          (this.ttlAutopurge = !!n),
          (this.ttl = i || 0),
          this.ttl)
        ) {
          if (!o(this.ttl))
            throw TypeError("ttl must be a positive integer if specified");
          this.#F();
        }
        if (0 === this.#t && 0 === this.ttl && 0 === this.#i)
          throw TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.#t && !this.#i) {
          const e = "LRU_CACHE_UNBOUNDED";
          r.has(e) ||
            (r.add(e),
            a(
              "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
              "UnboundedCacheWarning",
              e,
              u,
            ));
        }
      }
      getRemainingTTL(e) {
        return this.#o.has(e) ? 1 / 0 : 0;
      }
      #F() {
        let e = new f(this.#t),
          t = new f(this.#t);
        ((this.#v = e),
          (this.#y = t),
          (this.#T = (r, s, a = i.now()) => {
            if (
              ((t[r] = 0 !== s ? a : 0),
              (e[r] = s),
              0 !== s && this.ttlAutopurge)
            ) {
              let e = setTimeout(() => {
                this.#z(r) && this.delete(this.#h[r]);
              }, s + 1);
              e.unref && e.unref();
            }
          }),
          (this.#O = (r) => {
            t[r] = 0 !== e[r] ? i.now() : 0;
          }),
          (this.#R = (i, a) => {
            if (e[a]) {
              let n = e[a],
                l = t[a];
              if (!n || !l) return;
              ((i.ttl = n), (i.start = l), (i.now = r || s()));
              let o = i.now - l;
              i.remainingTTL = n - o;
            }
          }));
        let r = 0,
          s = () => {
            let e = i.now();
            if (this.ttlResolution > 0) {
              r = e;
              let t = setTimeout(() => (r = 0), this.ttlResolution);
              t.unref && t.unref();
            }
            return e;
          };
        ((this.getRemainingTTL = (i) => {
          let a = this.#o.get(i);
          if (void 0 === a) return 0;
          let n = e[a],
            l = t[a];
          return n && l ? n - ((r || s()) - l) : 1 / 0;
        }),
          (this.#z = (i) => {
            let a = t[i],
              n = e[i];
            return !!n && !!a && (r || s()) - a > n;
          }));
      }
      #O = () => {};
      #R = () => {};
      #T = () => {};
      #z = () => !1;
      #M() {
        let e = new f(this.#t);
        ((this.#l = 0),
          (this.#m = e),
          (this.#C = (t) => {
            ((this.#l -= e[t]), (e[t] = 0));
          }),
          (this.#N = (e, t, i, r) => {
            if (this.#A(t)) return 0;
            if (!o(i))
              if (r) {
                if ("function" != typeof r)
                  throw TypeError("sizeCalculation must be a function");
                if (!o((i = r(t, e))))
                  throw TypeError(
                    "sizeCalculation return invalid (expect positive integer)",
                  );
              } else
                throw TypeError(
                  "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
                );
            return i;
          }),
          (this.#j = (t, i, r) => {
            if (((e[t] = i), this.#i)) {
              let i = this.#i - e[t];
              for (; this.#l > i; ) this.#B(!0);
            }
            ((this.#l += e[t]),
              r && ((r.entrySize = i), (r.totalCalculatedSize = this.#l)));
          }));
      }
      #C = (e) => {};
      #j = (e, t, i) => {};
      #N = (e, t, i, r) => {
        if (i || r)
          throw TypeError(
            "cannot set size without setting maxSize or maxEntrySize on cache",
          );
        return 0;
      };
      *#x({ allowStale: e = this.allowStale } = {}) {
        if (this.#n)
          for (
            let t = this.#g;
            this.#$(t) && ((e || !this.#z(t)) && (yield t), t !== this.#d);

          )
            t = this.#u[t];
      }
      *#E({ allowStale: e = this.allowStale } = {}) {
        if (this.#n)
          for (
            let t = this.#d;
            this.#$(t) && ((e || !this.#z(t)) && (yield t), t !== this.#g);

          )
            t = this.#c[t];
      }
      #$(e) {
        return void 0 !== e && this.#o.get(this.#h[e]) === e;
      }
      *entries() {
        for (let e of this.#x())
          void 0 === this.#f[e] ||
            void 0 === this.#h[e] ||
            this.#A(this.#f[e]) ||
            (yield [this.#h[e], this.#f[e]]);
      }
      *rentries() {
        for (let e of this.#E())
          void 0 === this.#f[e] ||
            void 0 === this.#h[e] ||
            this.#A(this.#f[e]) ||
            (yield [this.#h[e], this.#f[e]]);
      }
      *keys() {
        for (let e of this.#x()) {
          let t = this.#h[e];
          void 0 === t || this.#A(this.#f[e]) || (yield t);
        }
      }
      *rkeys() {
        for (let e of this.#E()) {
          let t = this.#h[e];
          void 0 === t || this.#A(this.#f[e]) || (yield t);
        }
      }
      *values() {
        for (let e of this.#x())
          void 0 === this.#f[e] || this.#A(this.#f[e]) || (yield this.#f[e]);
      }
      *rvalues() {
        for (let e of this.#E())
          void 0 === this.#f[e] || this.#A(this.#f[e]) || (yield this.#f[e]);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      [Symbol.toStringTag] = "LRUCache";
      find(e, t = {}) {
        for (let i of this.#x()) {
          let r = this.#f[i],
            s = this.#A(r) ? r.__staleWhileFetching : r;
          if (void 0 !== s && e(s, this.#h[i], this))
            return this.get(this.#h[i], t);
        }
      }
      forEach(e, t = this) {
        for (let i of this.#x()) {
          let r = this.#f[i],
            s = this.#A(r) ? r.__staleWhileFetching : r;
          void 0 !== s && e.call(t, s, this.#h[i], this);
        }
      }
      rforEach(e, t = this) {
        for (let i of this.#E()) {
          let r = this.#f[i],
            s = this.#A(r) ? r.__staleWhileFetching : r;
          void 0 !== s && e.call(t, s, this.#h[i], this);
        }
      }
      purgeStale() {
        let e = !1;
        for (let t of this.#E({ allowStale: !0 }))
          this.#z(t) && (this.delete(this.#h[t]), (e = !0));
        return e;
      }
      info(e) {
        let t = this.#o.get(e);
        if (void 0 === t) return;
        let r = this.#f[t],
          s = this.#A(r) ? r.__staleWhileFetching : r;
        if (void 0 === s) return;
        let a = { value: s };
        if (this.#v && this.#y) {
          let e = this.#v[t],
            r = this.#y[t];
          e && r && ((a.ttl = e - (i.now() - r)), (a.start = Date.now()));
        }
        return (this.#m && (a.size = this.#m[t]), a);
      }
      dump() {
        let e = [];
        for (let t of this.#x({ allowStale: !0 })) {
          let r = this.#h[t],
            s = this.#f[t],
            a = this.#A(s) ? s.__staleWhileFetching : s;
          if (void 0 === a || void 0 === r) continue;
          let n = { value: a };
          if (this.#v && this.#y) {
            n.ttl = this.#v[t];
            let e = i.now() - this.#y[t];
            n.start = Math.floor(Date.now() - e);
          }
          (this.#m && (n.size = this.#m[t]), e.unshift([r, n]));
        }
        return e;
      }
      load(e) {
        for (let [t, r] of (this.clear(), e)) {
          if (r.start) {
            let e = Date.now() - r.start;
            r.start = i.now() - e;
          }
          this.set(t, r.value, r);
        }
      }
      set(e, t, i = {}) {
        if (void 0 === t) return (this.delete(e), this);
        let {
            ttl: r = this.ttl,
            start: s,
            noDisposeOnSet: a = this.noDisposeOnSet,
            sizeCalculation: n = this.sizeCalculation,
            status: l,
          } = i,
          { noUpdateTTL: o = this.noUpdateTTL } = i,
          h = this.#N(e, t, i.size || 0, n);
        if (this.maxEntrySize && h > this.maxEntrySize)
          return (
            l && ((l.set = "miss"), (l.maxEntrySizeExceeded = !0)),
            this.delete(e),
            this
          );
        let f = 0 === this.#n ? void 0 : this.#o.get(e);
        if (void 0 === f)
          ((f =
            0 === this.#n
              ? this.#g
              : 0 !== this.#p.length
                ? this.#p.pop()
                : this.#n === this.#t
                  ? this.#B(!1)
                  : this.#n),
            (this.#h[f] = e),
            (this.#f[f] = t),
            this.#o.set(e, f),
            (this.#c[this.#g] = f),
            (this.#u[f] = this.#g),
            (this.#g = f),
            this.#n++,
            this.#j(f, h, l),
            l && (l.set = "add"),
            (o = !1));
        else {
          this.#L(f);
          let i = this.#f[f];
          if (t !== i) {
            if (this.#k && this.#A(i)) {
              i.__abortController.abort(Error("replaced"));
              let { __staleWhileFetching: t } = i;
              void 0 !== t &&
                !a &&
                (this.#w && this.#r?.(t, e, "set"),
                this.#_ && this.#b?.push([t, e, "set"]));
            } else
              !a &&
                (this.#w && this.#r?.(i, e, "set"),
                this.#_ && this.#b?.push([i, e, "set"]));
            if ((this.#C(f), this.#j(f, h, l), (this.#f[f] = t), l)) {
              l.set = "replace";
              let e = i && this.#A(i) ? i.__staleWhileFetching : i;
              void 0 !== e && (l.oldValue = e);
            }
          } else l && (l.set = "update");
        }
        if (
          (0 === r || this.#v || this.#F(),
          this.#v && (o || this.#T(f, r, s), l && this.#R(l, f)),
          !a && this.#_ && this.#b)
        ) {
          let e,
            t = this.#b;
          for (; (e = t?.shift()); ) this.#s?.(...e);
        }
        return this;
      }
      pop() {
        try {
          for (; this.#n; ) {
            let e = this.#f[this.#d];
            if ((this.#B(!0), this.#A(e))) {
              if (e.__staleWhileFetching) return e.__staleWhileFetching;
            } else if (void 0 !== e) return e;
          }
        } finally {
          if (this.#_ && this.#b) {
            let e,
              t = this.#b;
            for (; (e = t?.shift()); ) this.#s?.(...e);
          }
        }
      }
      #B(e) {
        let t = this.#d,
          i = this.#h[t],
          r = this.#f[t];
        return (
          this.#k && this.#A(r)
            ? r.__abortController.abort(Error("evicted"))
            : (this.#w || this.#_) &&
              (this.#w && this.#r?.(r, i, "evict"),
              this.#_ && this.#b?.push([r, i, "evict"])),
          this.#C(t),
          e && ((this.#h[t] = void 0), (this.#f[t] = void 0), this.#p.push(t)),
          1 === this.#n
            ? ((this.#d = this.#g = 0), (this.#p.length = 0))
            : (this.#d = this.#c[t]),
          this.#o.delete(i),
          this.#n--,
          t
        );
      }
      has(e, t = {}) {
        let { updateAgeOnHas: i = this.updateAgeOnHas, status: r } = t,
          s = this.#o.get(e);
        if (void 0 !== s) {
          let e = this.#f[s];
          if (this.#A(e) && void 0 === e.__staleWhileFetching) return !1;
          if (!this.#z(s))
            return (i && this.#O(s), r && ((r.has = "hit"), this.#R(r, s)), !0);
          r && ((r.has = "stale"), this.#R(r, s));
        } else r && (r.has = "miss");
        return !1;
      }
      peek(e, t = {}) {
        let { allowStale: i = this.allowStale } = t,
          r = this.#o.get(e);
        if (void 0 === r || (!i && this.#z(r))) return;
        let s = this.#f[r];
        return this.#A(s) ? s.__staleWhileFetching : s;
      }
      #S(e, t, i, r) {
        let s = void 0 === t ? void 0 : this.#f[t];
        if (this.#A(s)) return s;
        let a = new n(),
          { signal: l } = i;
        l?.addEventListener("abort", () => a.abort(l.reason), {
          signal: a.signal,
        });
        let o = { signal: a.signal, options: i, context: r },
          h = (r, s = !1) => {
            let { aborted: n } = a.signal,
              l = i.ignoreFetchAbort && void 0 !== r;
            return (i.status &&
              (n && !s
                ? ((i.status.fetchAborted = !0),
                  (i.status.fetchError = a.signal.reason),
                  l && (i.status.fetchAbortIgnored = !0))
                : (i.status.fetchResolved = !0)),
            !n || l || s)
              ? (this.#f[t] === u &&
                  (void 0 === r
                    ? u.__staleWhileFetching
                      ? (this.#f[t] = u.__staleWhileFetching)
                      : this.delete(e)
                    : (i.status && (i.status.fetchUpdated = !0),
                      this.set(e, r, o.options))),
                r)
              : f(a.signal.reason);
          },
          f = (r) => {
            let { aborted: s } = a.signal,
              n = s && i.allowStaleOnFetchAbort,
              l = n || i.allowStaleOnFetchRejection,
              o = l || i.noDeleteOnFetchRejection;
            if (
              (this.#f[t] === u &&
                (o && void 0 !== u.__staleWhileFetching
                  ? n || (this.#f[t] = u.__staleWhileFetching)
                  : this.delete(e)),
              l)
            )
              return (
                i.status &&
                  void 0 !== u.__staleWhileFetching &&
                  (i.status.returnedStale = !0),
                u.__staleWhileFetching
              );
            if (u.__returned === u) throw r;
          },
          c = (t, r) => {
            let n = this.#a?.(e, s, o);
            (n &&
              n instanceof Promise &&
              n.then((e) => t(void 0 === e ? void 0 : e), r),
              a.signal.addEventListener("abort", () => {
                (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) &&
                  (t(void 0),
                  i.allowStaleOnFetchAbort && (t = (e) => h(e, !0)));
              }));
          };
        i.status && (i.status.fetchDispatched = !0);
        let u = new Promise(c).then(
            h,
            (e) => (
              i.status &&
                ((i.status.fetchRejected = !0), (i.status.fetchError = e)),
              f(e)
            ),
          ),
          d = Object.assign(u, {
            __abortController: a,
            __staleWhileFetching: s,
            __returned: void 0,
          });
        return (
          void 0 === t
            ? (this.set(e, d, { ...o.options, status: void 0 }),
              (t = this.#o.get(e)))
            : (this.#f[t] = d),
          d
        );
      }
      #A(e) {
        return (
          !!this.#k &&
          !!e &&
          e instanceof Promise &&
          e.hasOwnProperty("__staleWhileFetching") &&
          e.__abortController instanceof n
        );
      }
      async fetch(e, t = {}) {
        let {
          allowStale: i = this.allowStale,
          updateAgeOnGet: r = this.updateAgeOnGet,
          noDeleteOnStaleGet: s = this.noDeleteOnStaleGet,
          ttl: a = this.ttl,
          noDisposeOnSet: n = this.noDisposeOnSet,
          size: l = 0,
          sizeCalculation: o = this.sizeCalculation,
          noUpdateTTL: h = this.noUpdateTTL,
          noDeleteOnFetchRejection: f = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection: c = this.allowStaleOnFetchRejection,
          ignoreFetchAbort: u = this.ignoreFetchAbort,
          allowStaleOnFetchAbort: d = this.allowStaleOnFetchAbort,
          context: g,
          forceRefresh: p = !1,
          status: b,
          signal: m,
        } = t;
        if (!this.#k)
          return (
            b && (b.fetch = "get"),
            this.get(e, {
              allowStale: i,
              updateAgeOnGet: r,
              noDeleteOnStaleGet: s,
              status: b,
            })
          );
        let y = {
            allowStale: i,
            updateAgeOnGet: r,
            noDeleteOnStaleGet: s,
            ttl: a,
            noDisposeOnSet: n,
            size: l,
            sizeCalculation: o,
            noUpdateTTL: h,
            noDeleteOnFetchRejection: f,
            allowStaleOnFetchRejection: c,
            allowStaleOnFetchAbort: d,
            ignoreFetchAbort: u,
            status: b,
            signal: m,
          },
          v = this.#o.get(e);
        if (void 0 === v) {
          b && (b.fetch = "miss");
          let t = this.#S(e, v, y, g);
          return (t.__returned = t);
        }
        {
          let t = this.#f[v];
          if (this.#A(t)) {
            let e = i && void 0 !== t.__staleWhileFetching;
            return (
              b && ((b.fetch = "inflight"), e && (b.returnedStale = !0)),
              e ? t.__staleWhileFetching : (t.__returned = t)
            );
          }
          let s = this.#z(v);
          if (!p && !s)
            return (
              b && (b.fetch = "hit"),
              this.#L(v),
              r && this.#O(v),
              b && this.#R(b, v),
              t
            );
          let a = this.#S(e, v, y, g),
            n = void 0 !== a.__staleWhileFetching && i;
          return (
            b &&
              ((b.fetch = s ? "stale" : "refresh"),
              n && s && (b.returnedStale = !0)),
            n ? a.__staleWhileFetching : (a.__returned = a)
          );
        }
      }
      get(e, t = {}) {
        let {
            allowStale: i = this.allowStale,
            updateAgeOnGet: r = this.updateAgeOnGet,
            noDeleteOnStaleGet: s = this.noDeleteOnStaleGet,
            status: a,
          } = t,
          n = this.#o.get(e);
        if (void 0 !== n) {
          let t = this.#f[n],
            l = this.#A(t);
          return (a && this.#R(a, n), this.#z(n))
            ? (a && (a.get = "stale"), l)
              ? (a &&
                  i &&
                  void 0 !== t.__staleWhileFetching &&
                  (a.returnedStale = !0),
                i ? t.__staleWhileFetching : void 0)
              : (s || this.delete(e),
                a && i && (a.returnedStale = !0),
                i ? t : void 0)
            : (a && (a.get = "hit"), l)
              ? t.__staleWhileFetching
              : (this.#L(n), r && this.#O(n), t);
        }
        a && (a.get = "miss");
      }
      #I(e, t) {
        ((this.#u[t] = e), (this.#c[e] = t));
      }
      #L(e) {
        e !== this.#g &&
          (e === this.#d
            ? (this.#d = this.#c[e])
            : this.#I(this.#u[e], this.#c[e]),
          this.#I(this.#g, e),
          (this.#g = e));
      }
      delete(e) {
        let t = !1;
        if (0 !== this.#n) {
          let i = this.#o.get(e);
          if (void 0 !== i)
            if (((t = !0), 1 === this.#n)) this.clear();
            else {
              this.#C(i);
              let t = this.#f[i];
              if (
                (this.#A(t)
                  ? t.__abortController.abort(Error("deleted"))
                  : (this.#w || this.#_) &&
                    (this.#w && this.#r?.(t, e, "delete"),
                    this.#_ && this.#b?.push([t, e, "delete"])),
                this.#o.delete(e),
                (this.#h[i] = void 0),
                (this.#f[i] = void 0),
                i === this.#g)
              )
                this.#g = this.#u[i];
              else if (i === this.#d) this.#d = this.#c[i];
              else {
                let e = this.#u[i];
                this.#c[e] = this.#c[i];
                let t = this.#c[i];
                this.#u[t] = this.#u[i];
              }
              (this.#n--, this.#p.push(i));
            }
        }
        if (this.#_ && this.#b?.length) {
          let e,
            t = this.#b;
          for (; (e = t?.shift()); ) this.#s?.(...e);
        }
        return t;
      }
      clear() {
        for (let e of this.#E({ allowStale: !0 })) {
          let t = this.#f[e];
          if (this.#A(t)) t.__abortController.abort(Error("deleted"));
          else {
            let i = this.#h[e];
            (this.#w && this.#r?.(t, i, "delete"),
              this.#_ && this.#b?.push([t, i, "delete"]));
          }
        }
        if (
          (this.#o.clear(),
          this.#f.fill(void 0),
          this.#h.fill(void 0),
          this.#v && this.#y && (this.#v.fill(0), this.#y.fill(0)),
          this.#m && this.#m.fill(0),
          (this.#d = 0),
          (this.#g = 0),
          (this.#p.length = 0),
          (this.#l = 0),
          (this.#n = 0),
          this.#_ && this.#b)
        ) {
          let e,
            t = this.#b;
          for (; (e = t?.shift()); ) this.#s?.(...e);
        }
      }
    }
    e.s(["LRUCache", () => u]);
  },
]);
