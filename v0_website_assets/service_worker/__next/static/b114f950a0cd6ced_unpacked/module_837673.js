export const assertValidPattern = (e) => {
  if (typeof e != "string") {
    throw TypeError("invalid pattern");
  }
  if (e.length > 65536) {
    throw TypeError("pattern is too long");
  }
};
