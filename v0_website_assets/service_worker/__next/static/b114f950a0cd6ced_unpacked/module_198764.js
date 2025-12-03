const r =
  (module.e && module.e.__importDefault) ||
  ((e) => (e && e.__esModule ? e : { default: e }));
let i = r(require("module-972453.js"));
let a = r(require("module-185161.js"));
let o = r(require("module-124263.js"));

let s = (e = {}) =>
  (0, i.default)({
    ts: a.default,
    hashSignature: (e) =>
      o.default.createHash("sha1").update(e).digest("base64"),
    ...e,
  });

Object.assign(s, { default: s, __esModule: true });
export default s;
