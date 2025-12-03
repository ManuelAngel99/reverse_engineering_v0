export const unescape = (e, { windowsPathsNoEscape: t = false } = {}) =>
  t
    ? e.replace(/\[([^\/\\])\]/g, "$1")
    : e
        .replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2")
        .replace(/\\([^\/])/g, "$1");
