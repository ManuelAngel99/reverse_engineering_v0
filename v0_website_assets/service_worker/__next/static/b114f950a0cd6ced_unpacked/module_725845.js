export const escapeForWithinString = (e, t) => {
  let n = "";
  for (let r = 0; r < e.length; r++) {
    if (e[r] === t) {
      n += "\\";
    } else if (e[r] === "\r" && e[r + 1] === "\n") {
      n += "\\r\\n\\";
      r++;
    } else if (e[r] === "\n") {
      n += "\\n\\";
    } else if (e[r] === "\\") {
      n += "\\";
    }

    n += e[r];
  }
  return n;
};

export const getStringFromStrOrFunc = (e) => (e instanceof Function ? e() : e);
