export const escape = (e, { windowsPathsNoEscape: t = false } = {}) =>
  t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&");
