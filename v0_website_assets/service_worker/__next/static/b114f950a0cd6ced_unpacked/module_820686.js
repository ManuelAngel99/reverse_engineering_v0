const r = require(603114 /* wakaru:missing */);
const i = require(626568 /* wakaru:missing */);
const a = require(417288 /* wakaru:missing */);
const o = require(272098 /* wakaru:missing */);
const s = require(707850 /* wakaru:missing */);
const l = require(385370 /* wakaru:missing */);
const c = require(570795 /* wakaru:missing */);
const d = require(713376 /* wakaru:missing */);
const u = Object.prototype.hasOwnProperty;
__unused.exports = (e) => {
  if (e == null) {
    return true;
  }
  if (
    s(e) &&
    (o(e) ||
      typeof e == "string" ||
      typeof e.splice == "function" ||
      l(e) ||
      d(e) ||
      a(e))
  ) {
    return !e.length;
  }
  const t = i(e);
  if (t == "[object Map]" || t == "[object Set]") {
    return !e.size;
  }
  if (c(e)) {
    return !r(e).length;
  }
  for (const n in e) {
    if (u.call(e, n)) {
      return false;
    }
  }
  return true;
};
