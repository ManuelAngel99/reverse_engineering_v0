import D_, { jsxDEV } from "module-741915.js";
import DS from "module-799425.js";
import DT from "module-673233.js";
import ND from "module-100541.js";
import { default as _default_2 } from "module-820686.js";
import { encode } from "module-926728.js";
import I0 from "module-38364.js";
let t;
let n;
let r;
let i;
let a;
const o = require(301224 /* wakaru:missing */);

const { jsx, jsxs } = o;

const s = require(789783 /* wakaru:missing */);

const {
  useMemo,
  lazy,
  forwardRef,
  useEffect,
  use,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  act,
} = s;

const l = require(546564 /* wakaru:missing */);
const c = require(772025 /* wakaru:missing */);

const { resolve, dirname, join } = c;

let d = ['@import "tailwindcss"', "@import 'tailwindcss'"];
const u = require(277218 /* wakaru:missing */);
const p = require(403055 /* wakaru:missing */);

const { cn: cn_2 } = p;

const w9 = require(418617 /* wakaru:missing */);
const De = require(634826 /* wakaru:missing */);

const { GET_REQ_HEADERS } = De;

let Dt = async () => {
  let { createGatewayProvider } = await module.A(548822);
  let n = await module.A(438194);

  let r = createGatewayProvider({
    apiKey: window.process.env.AI_GATEWAY_API_KEY || De.FAKE_GATEWAY_API_KEY,
  });

  globalThis.AI_SDK_DEFAULT_PROVIDER = r;
  return n;
};

let Dn = async () => {
  let t = await module.A(548910);
  return {
    ...(t.default || t),
    randomUUID: crypto.randomUUID.bind(crypto),
  };
};

async function Dr(e, t, n) {
  if (getCurrentExecutionContext() !== "server") {
    throw Error("The 'dns' module is not available on the client.");
  }
  let r = await fetch("/api/dns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: e, hostname: t, options: n }),
  });
  if (!r.ok) {
    let e = await r.json();
    let t = Error(e.message || "DNS operation failed");
    t.code = e.code;
    throw t;
  }
  return (await r.json()).result;
}
function Di(e, t, n) {
  if (getCurrentExecutionContext() !== "server") {
    throw Error("The 'dns' module is not available on the client.");
  }
  let r = new XMLHttpRequest();
  r.open("POST", "/api/dns", false);
  r.setRequestHeader("Content-Type", "application/json");
  let i = JSON.stringify({ operation: e, hostname: t, options: n });
  try {
    r.send(i);

    if (r.status >= 200 && r.status < 300) {
      return JSON.parse(r.responseText).result;
    }

    {
      let e = JSON.parse(r.responseText);
      let t = Error(e.message || "DNS operation failed");
      t.code = e.code;
      throw t;
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw Error("Invalid response from DNS server");
    }
    throw e;
  }
}

let Da = () => ({
  lookup: (e, t) => Di("lookup", e, t),
  resolve: (e, t) => Di("resolve", e, { rrtype: t }),
  resolve4: (e, t) => Di("resolve4", e, t),
  resolve6: (e, t) => Di("resolve6", e, t),
  resolveMx: (e) => Di("resolveMx", e),
  resolveTxt: (e) => Di("resolveTxt", e),
  resolveNs: (e) => Di("resolveNs", e),
  resolveNaptr: (e) => Di("resolveNaptr", e),
  resolveSrv: (e) => Di("resolveSrv", e),
  resolvePtr: (e) => Di("resolvePtr", e),
  resolveCname: (e) => Di("resolveCname", e),
  reverse: (e) => Di("reverse", e),
  resolveSoa: (e) => Di("resolveSoa", e),
  resolveAny: (e) => Di("resolveAny", e),
  resolveCaa: (e) => Di("resolveCaa", e),
});

let Do = () => {
  let e = Da();
  return Object.keys(e).reduce((t, n) => {
    if (typeof e[n] == "function") {
      t[n] = async (...e) => {
        try {
          let [t, r] = e;
          return await Dr(n, t, r);
        } catch (e) {
          throw e;
        }
      };
    }

    return t;
  }, {});
};

let Ds = async () => {
  let t = await module.A(651193);
  return t.default || t;
};

let Dl = () => {
  console.log("@playwright/test does not currently work in the v0 preview");
};

let Dc = Object.assign(Dl, {
  describe: Dl,
  beforeEach: Dl,
  afterEach: Dl,
  beforeAll: Dl,
  afterAll: Dl,
  step: Dl,
  skip: Dl,
  only: Dl,
  fail: Dl,
  fixme: Dl,
  slow: Dl,
  setTimeout: Dl,
  extend: Dl,
  use: Dl,
});

let Dd = Object.assign(Dl, { extend: Dl, soft: Dl, poll: Dl, configure: Dl });

let Du = () => module.A(460835);

let Dp = {
  "framer-motion": () => module.A(821945),
  "motion/react": () => module.A(917282),
  recharts: () =>
    module.A(559075).then((e) =>
      ((e) => {
        for (let t in e) {
          let e_t = e[t];

          if (e_t) {
            Object.defineProperty(e_t, "__slottable", {
              value: false,
              writable: false,
            });
          }
        }
        return e;
      })(e)
    ),
  zod: () => module.A(929131),
  "@alexandernanberg/react-pdf-renderer": Du,
  "@optimizely/optimizely-sdk": () => module.A(142640),
  "@react-pdf/renderer": Du,
  "@react-stately/searchfield": () => module.A(785650),
  "@react-three/fiber": () => module.A(985518),
  "@react-three/drei": () => module.A(244535),
  "@react-three/rapier": () => module.A(476902),
  "@react-three/cannon": () => module.A(722631),
  "@react-three/postprocessing": () => module.A(562036),
  meshline: () => module.A(125286),
  "@xyflow/react": () => module.A(182469),
  "react-aria-components": () => module.A(102123),
  "react-stately": () => module.A(69250),
  reactflow: () => module.A(537215),
  "reactflow/dist/style.css": () => module.A(788287).then(() => ({})),
  "@stripe/react-stripe-js": () => module.A(791421),
  "@stripe/stripe-js": () => module.A(263883),
  axios: () => module.A(992104),
  "react-hook-form": () => module.A(613765),
  "@hookform/resolvers/zod": () => module.A(170105),
  "lucide-react": () => w9,
  "@radix-ui/react-toast": () => module.A(883539),
  crypto: Dn,
  dns: Da,
  "node:dns": Da,
  "node:dns/promises": Do,
  "dns/promises": Do,
  "node/dns.mjs": Da,
  https: Ds,
  "node:https": Ds,
  "node:https.mjs": Ds,
  satori: () => module.A(44956),
  "input-otp": () => module.A(991359),
  ai: Dt,
  "@playwright/test": () => ({
    test: Dc,
    expect: Dd,
    describe: Dc.describe,
    beforeEach: Dc.beforeEach,
    afterEach: Dc.afterEach,
    beforeAll: Dc.beforeAll,
    afterAll: Dc.afterAll,
    _baseTest: Dc,
  }),
};

Object.values(Dp).forEach((e) => {
  e.__lazy = true;
});
const Df = require(566420 /* wakaru:missing */);
const Dm = require(608367 /* wakaru:missing */);

const {
  staticAssetUrlToResourceUri,
  createAsyncComponentWithCache,
  importEntry,
  relocationWhileBlocking,
  getIsNavigationBlocked,
  findOriginalModuleNameFromURL,
  isFromCDN,
  sendToParent,
  startHMR,
  stopHMR,
  useSendBrowserEvent,
} = Dm;

let Dh = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "avif",
  "bmp",
  "svg",
  "ico",
  "mp4",
  "webm",
  "mp3",
  "wav",
  "ogg",
  "flac",
  "m4a",
  "aac",
  "gltf",
  "glb",
  "obj",
  "fbx",
  "mtl",
  "stl",
  "ttf",
  "woff",
  "woff2",
  "otf",
  "wasm",
  "pdf",
  "exe",
  "dll",
  "bin",
];

const { getGlobals } = require(395873 /* wakaru:missing */);

let Dy = {
  "tsconfig-paths": 1740002400000 /* 17400024e5 */,
  "rsc-boundary-error": Infinity,
  middleware: 1742293376172 /* 0x195a8c71cac */,
  "package-json": 1742370125829 /* 0x195ad5a3805 */,
  "tailwind-config": 1737680400000 /* 17376804e5 */,
  "no-direct-frame-access": 1755302560543 /* 0x198b02f831f */,
  "jsx-strict-types": 1755097280000 /* 175509728e4 */,
  "hardcoded-ai-sdk-override-disabled": new Date(
    1754006400000 /* 17540064e5 */
  ).getTime(),
};

let Dv = (e, t) =>
  !!Dy[e] && (t || getGlobals().internal_ts || window.__v0_ts) > Dy[e];

require(397220 /* wakaru:missing */);
const Db = require(912085 /* wakaru:missing */);
require(133519 /* wakaru:missing */);
const Dx = require(609750 /* wakaru:missing */);
let Dk = {
  className: DS.default.className,
  style: { fontFamily: "'Geist', 'Geist Fallback'", fontStyle: "normal" },
};

if (DS.default.variable != null) {
  Dk.variable = DS.default.variable;
}

let DE = {
  className: DT.default.className,
  style: {
    fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
    fontStyle: "normal",
  },
};

if (DT.default.variable != null) {
  DE.variable = DT.default.variable;
}

let DC = {
  className: cn_2(
    "font-sans antialiased",
    Db.GeistSans.variable,
    Dx.GeistMono.variable,
    Dk.variable,
    DE.variable
  ),
  style: { "--font-serif": "__fallback" },
  lang: "en",
};
function DA(e) {
  useEffect(
    () => () => {
      let e = document.querySelector("html");

      if (e && !e.className) {
        e.lang = DC.lang;
        e.className = DC.className;

        Object.entries(DC.style).forEach(([t, n]) => {
          e.style.setProperty(t, n);
        });
      }
    },
    []
  );

  return <html {...e} />;
}
let Dw = {
  jsxDEV(E_1, t, n, r, i, a) {
    let { __v0_i, __v0_c, __v0_m, __v0_e, __v0_r, ...p } = t || {};
    if (E_1 === "style") {
      if (p.jsx === true) {
        delete p.jsx;
      }

      if (p.global === true) {
        delete p.global;
      }
    } else {
      let { src, ...o } = p;
      if (E_1 !== "link" && typeof src == "string") {
        let p = staticAssetUrlToResourceUri(src);
        o.src = p === null ? src : p;
        let _ = {
          children: (
            <E_1 key={n} {...o}>
              {n}
              {r}
              {i}
              {a}
            </E_1>
          ),
          __v0_s: i,
          __v0_c: __v0_c,
          __v0_m: __v0_m,
          __v0_e: __v0_e,
          __v0_r: __v0_r,
        };

        if (__v0_i !== undefined) {
          _.__v0_i = __v0_i;
        }

        return (
          <Df.Slottable key={n} {..._}>
            {n}
            {i}
            {a}
          </Df.Slottable>
        );
      }
      if (E_1 !== "link") {
        for (let [e, t] of Object.entries(o)) {
          if (
            typeof t == "string" &&
            (t.startsWith("/models/") ||
              t.startsWith("/assets/") ||
              t.startsWith("/textures/") ||
              t.startsWith("/images/")) &&
            Dh.some((e) => t.endsWith(e))
          ) {
            let n = staticAssetUrlToResourceUri(t);
            o[e] = n === null ? t : n;
          }
        }
      }
    }

    if (
      getCurrentExecutionContext() === "server" &&
      (typeof E_1 == "string" ||
        (typeof E_1 == "function" && E_1.__client_ref === true))
    ) {
      ((e) => {
        if (Dv("rsc-boundary-error")) {
          for (let t in e) {
            let e_t = e[t];
            if (typeof e_t == "function") {
              if (e_t.__server_ref === true) {
                continue;
              }
              let e = e_t.toString();
              if (
                !e.includes("use server") &&
                !e.includes("__v0_createServerRef")
              ) {
                throw Error(
                  'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.'
                );
              }
            }
          }
        }
      })(p);
    }

    if (E_1 === "html") {
      E_1 = DA;
    }

    let _ = (
      <E_1 key={n} {...p}>
        {n}
        {r}
        {i}
        {a}
      </E_1>
    );
    if (E_1 === "defs") {
      return _;
    }
    if (
      E_1?.constructor?.name === "AsyncFunction" ||
      (typeof E_1 == "function" && E_1.toString().startsWith("async "))
    ) {
      let t = E_1;

      let N_1 = createAsyncComponentWithCache(
        executeRSC(() => executeInServerContext(() => t({ ...p }))),
        E_1
      );

      _ = <N_1 />;
    }
    if (E_1 && E_1.__slottable === false) {
      return _;
    }
    let f = {
      children: _,
      __v0_s: i,
      __v0_c: __v0_c,
      __v0_m: __v0_m,
      __v0_e: __v0_e,
      __v0_r: __v0_r,
    };

    if (__v0_i !== undefined) {
      f.__v0_i = __v0_i;
    }

    return (
      <Df.Slottable key={n} {...f}>
        {n}
        {i}
        {a}
      </Df.Slottable>
    );
  },
  Fragment: D_.Fragment,
};
async function DD(e, t) {
  let n = {};
  let r = [];
  for (let [i, { type: a, data: o }] of t) {
    if (a === "file") {
      n[i] = o;
    } else if (a === "url") {
      r.push(
        fetch(o).then(async (t) => {
          if (!t.ok) {
            console.error(`Failed to load file ${i} from ${o}.`);
            throw Error(`Failed to load file "${i}" from the file system.`);
          }
          let n = await t.arrayBuffer();

          e.mkdirSync(i.split("/").slice(0, -1).join("/"), {
            recursive: true,
          });

          e.writeFileSync(i, new Uint8Array(n));
        })
      );
    }
  }
  e.reset();
  e.fromJSON(n, "/");
  await Promise.all(r);
}

let DN = () =>
  module.A(242102).then(async (e) => {
    getGlobals().internal_fs_vol = e.vol;

    if (getGlobals().internal_fs) {
      await DD(e.vol, getGlobals().internal_fs);
    }

    return e;
  });

let DI = {
  "react-dom/server": () => module.A(655657),
  "react-dom/client": () => module.A(645021),
  "react/jsx-runtime": () => module.A(443319),
  fs: DN,
  "fs/promises": () =>
    module.A(242102).then(async (e) => {
      getGlobals().internal_fs_vol = e.vol;

      if (getGlobals().internal_fs) {
        await DD(e.vol, getGlobals().internal_fs);
      }

      return e.promises;
    }),
  memfs: DN,
  path: () => module.A(523587),
  "geist/font/sans": () => ({
    GeistSans: nextFontLocalShim({
      src: `${De.ESMSH_BASE_URL}/geist/es2022/font/fonts/geist-sans/Geist-Variable.woff2`,
      variable: "--font-geist-sans",
      weight: "100 900",
    }),
  }),
  "geist/font/mono": () => ({
    GeistMono: nextFontLocalShim({
      src: `${De.ESMSH_BASE_URL}/geist/es2022/font/fonts/geist-mono/GeistMono-Variable.woff2`,
      variable: "--font-geist-mono",
      weight: "100 900",
    }),
  }),
};

Object.values(DI).forEach((e) => {
  e.__lazy = true;
});

let DP = {
  "@react-email/components": "@react-email/components?bundle",
  "@privy-io/react-auth": "@privy-io/react-auth?bundle",
  "@clerk/nextjs": "@clerk/nextjs?bundle",
  "@chakra-ui/react": "@chakra-ui/react?bundle",
  "@chakra-ui/icons": "@chakra-ui/icons?bundle&external=@chakra-ui/react",
  "@mui/material": "@mui/material?bundle",
  "react-tweet": ["react-tweet?bundle", "react-tweet?bundle&css"],
  antd: "antd?bundle",
  "react-confetti": "react-confetti?raw",
  nuqs: "nuqs?no-bundle",
  "nuqs/adapters/next/app": "nuqs/adapters/next/app?no-bundle",
  "swiper/css": "swiper/swiper.css",
  "swiper/css/bundle": "swiper/swiper-bundle.css",
};

let DM = [
  (e) =>
    e.startsWith("swiper/css/") ? `swiper/modules/${e.slice(11)}.css` : null,
  (e) =>
    e === "/@firebase/app@0.10.16/es2022/app.mjs"
      ? "@firebase/app@0.10.17/es2022/app.mjs"
      : null,
  (e) =>
    !e.startsWith("/@ui5/webcomponents-base@") ||
    e.endsWith(".nobundle.mjs") ||
    e.endsWith("?no-bundle")
      ? null
      : e.endsWith("/es2022/webcomponents-base.mjs")
      ? e.slice(1).replace(".mjs", ".nobundle.mjs")
      : `${e.slice(1).replace("/es2022/", "/")}?no-bundle`,
  (e) =>
    e.startsWith("/rxjs@") && !/[?&]bundle/.test(e)
      ? `${e.slice(1) + (e.includes("?") ? "&" : "?")}bundle`
      : null,
  (e, t) =>
    e.startsWith("/#safe-node-apis") && t?.includes("/@clerk/nextjs@")
      ? `${t.slice(
          t.indexOf("@clerk/nextjs@"),
          t.indexOf("/dist/")
        )}/dist/esm/runtime/browser/safe-node-apis.mjs`
      : null,
];

const DL = require(334405 /* wakaru:missing */);

const { useCenteredContainer } = require(86140 /* wakaru:missing */);

let DF = new WeakMap();
function DO({ response }) {
  let t;
  if (!(response instanceof Response)) {
    if ("$$typeof" in response) {
      return response;
    }
    throw Error(
      `Invalid response from server: Expected a Response object but got ${typeof response}`
    );
  }
  let n = response.headers.get("content-type");
  if (n?.startsWith("text/")) {
    let n = DF.get(response) || response.text();
    DF.set(response, n);

    t = <s.Suspense>{<DB data={n} />}</s.Suspense>;
  } else if (n?.startsWith("application/json")) {
    let n = DF.get(response) || response.text();
    DF.set(response, n);

    t = (
      <s.Suspense>
        {
          <DB
            data={n}
            formatter={(e) => {
              try {
                return JSON.stringify(JSON.parse(e), null, 2);
              } catch (t) {
                return e;
              }
            }}
          />
        }
      </s.Suspense>
    );
  } else if (
    n?.startsWith("image/") ||
    n === "application/svg+xml" ||
    n === "application/svg"
  ) {
    let r =
      DF.get(response) ||
      response
        .clone()
        .arrayBuffer()
        .catch(() => new ArrayBuffer(0));
    DF.set(response, r);

    t = <s.Suspense>{<DW data={r} mime={n || "image/png"} />}</s.Suspense>;
  } else {
    t = "No preview available for this content type.";
  }
  return <pre className="font-mono whitespace-pre-wrap text-sm p-1">{t}</pre>;
}
function DB({ data, formatter }) {
  let n = use(data);
  return formatter ? formatter(n) : n;
}
function DW({ data, mime }) {
  let n = btoa(
    new Uint8Array(use(data)).reduce((e, t) => e + String.fromCharCode(t), "")
  );
  return <img src={`data:${mime};base64,${n}`} alt="Image preview" />;
}
const Dj = require(769284 /* wakaru:missing */);
const Dz = require(610621 /* wakaru:missing */);

const { getInitialMiddlewareHeaders } = Dz;

let DV = null;
async function DG(e) {
  if (!Dv("middleware")) {
    return;
  }
  let t = await importEntry(e);
  let n = "proxy" in t ? t.proxy : "middleware" in t ? t.middleware : t.default;

  if (n) {
    DV = { config: t.config, handler: n };
  }
}
let DK = new Set([301, 302, 303, 307, 308]);
function DU(e) {
  let t = e.headers.get("x-middleware-set-cookie");

  if (t) {
    __v0_cookie_doc.cookie = t;
  }
}
async function DH(e) {
  setRequestHeadersFromMiddleware(getInitialMiddlewareHeaders());

  if (!DV) {
    return;
  }

  let t = new os.NextRequest(e.clone());
  t.cookies.clear();

  for (let e of new os.RequestCookie().getAll()) {
    t.cookies.set(e.name, e.value);
  }

  let n = await executeInServerContext(() => DV.handler(t));
  if (!n) {
    return;
  }
  let r = ((e, t) => {
    let n = t.headers.get("x-middleware-override-headers");
    let r = new Headers(e.headers);
    for (let [e, n] of t.headers.entries()) {
      if (
        e !== "x-middleware-override-headers" &&
        e !== "x-middleware-set-cookie" &&
        !e.startsWith("x-middleware-request-")
      ) {
        r.set(e, n);
      }
    }
    if (n) {
      for (let i of n.split(",")) {
        if (i) {
          let n = t.headers.get(`x-middleware-request-${i}`);
          r.set(i, n || "");
          e.headers.set(i, n || "");
        }
      }
    }
    setRequestHeadersFromMiddleware(r);
    return r;
  })(e, n);
  if (n.headers.get("x-middleware-rewrite")) {
    return new Request(n.headers.get("x-middleware-rewrite"), {
      ...e,
      headers: r || e.headers,
    });
  }
  if (n.headers.get("x-middleware-next") === "1") {
    return void DU(n);
  }
  if (DK.has(n.status)) {
    let e = n.headers.get("location");

    if (e) {
      DU(n);
      relocationWhileBlocking(e, r);
    }
  }
}

let Dq = [
  "layout",
  "template",
  "error",
  "loading",
  "default",
  "page",
  "route",
  "not-found",
  "opengraph-image",
];

let DJ = (e) => {
  let t = Dq.indexOf(e);

  if (-1 === t) {
    t =
      e[0] === "["
        ? e[1] === "[" && e[2] === "."
          ? -1
          : e[1] === "."
          ? -2
          : -3
        : -4;
  }

  return t;
};

function D$(e, t) {
  if (e.endsWith("/")) {
    e = e.slice(0, -1);
  }

  if (t.endsWith("/")) {
    t = t.slice(0, -1);
  }

  let n = e.split("/");
  let r = t.split("/");
  if (n.length < r.length) {
    let e = false;

    if (n.length === r.length - 1 && r[r.length - 1].startsWith("[[...")) {
      e = true;
    }

    if (!e) {
      return null;
    }
  }
  let i = n.length === r.length;
  let a = {};
  for (let e = 0; e < r.length; e++) {
    if (r[e].startsWith("[") && r[e].endsWith("]")) {
      let [t, o] = ((e, t) => {
        let n = e.slice(1, -1);

        if (n.startsWith("...")) {
          return [n.slice(3), t];
        }

        if (n.startsWith("[...") && n.endsWith("]")) {
          return [n.slice(4, -1), t];
        }

        return [n, t[0]];
      })(r[e], n.slice(e));
      a[t] = o;

      if (Array.isArray(o)) {
        i = true;
        o.length === 0 && (a[t] = undefined);
      }
    } else if (r[e] !== n[e]) {
      return null;
    }
  }
  return [a, i];
}
function DX(e) {
  return e.startsWith("blob:") || e.startsWith("data:");
}
async function DY(e, t, n, r, i = "page") {
  let a;
  if ((typeof r == "string" && DX(r)) || (typeof r == "object" && DX(r.url))) {
    return null;
  }
  if (!r) {
    for (let t of e) {
      let e = ((e) => {
        let t = "/";
        let n = e.split("/");
        if (n[n.length - 1] !== "page") {
          return null;
        }
        n.pop();

        if (n[0] === "@v0") {
          n.shift();
        }

        if (n[0] === "app") {
          n.shift();
        }

        for (let e of n) {
          if (!(e.startsWith("(") && e.endsWith(")"))) {
            if (!e.startsWith("@")) {
              t += `${e}/`;
            }
          }
        }

        return t;
      })(t);
      if (e) {
        r = e;
        break;
      }
    }
  }
  if (!r) {
    return null;
  }
  let l = await DH(
    typeof r == "string"
      ? new Request(r, {
          method: "GET",
          headers: new Headers(GET_REQ_HEADERS()),
          mode: "cors",
        })
      : r
  );

  if (l) {
    r = l;
  }

  if (typeof r == "string") {
    a = r;
  } else {
    let e = new URL(r.url);
    a = e.pathname + e.search;
  }

  let c = new URL(a, "http://n");
  let c_pathname = c.pathname;
  let u = Object.fromEntries(c.searchParams.entries());
  let p = { segments: {}, params: {} };
  let _ = n;
  let f = null;
  let m = null;

  if (_.dirs["@v0"]) {
    _ = _.dirs["@v0"];
  }

  if (_.dirs.app) {
    _ = _.dirs.app;
  }

  if (_.dirs.src?.dirs.app) {
    _ = _.dirs.src.dirs.app;
  }

  (function e(t, n, r) {
    let i = false;
    for (let [a, o] of Object.entries(n.dirs)) {
      let n = r;
      let s = "";

      if (!a.startsWith("(") || !a.endsWith(")")) {
        if (a.startsWith("@")) {
          s = a.slice(1);
        } else {
          n = `${n + a}/`;
          s = "children";
        }
      }

      let l = D$(c_pathname, n);
      if (l) {
        let r = { segments: {}, params: {} };
        r.params = { ...t.params, ...l[0] };
        let a = e(r, o, n);
        i ||= a;

        if (a) {
          if (s === "") {
            t.segments.children = r;
          } else {
            t.segments[s] = r;
          }
        }
      }
    }
    let a = D$(c_pathname, r);
    for (let [e, o] of Object.entries(n.files)) {
      let n = e.split("/");
      let s = n[n.length - 1];
      if (s === "layout") {
        t.layout = o;
      } else if (s === "template") {
        t.template = o;
      } else if (s === "error") {
        t.error = o;
      } else if (s === "not-found") {
        t.notFound = o;
      } else if (s === "loading") {
        t.loading = o;
      } else if (s === "default") {
        t.default = o;
      } else if (s === "page") {
        if (a?.[1]) {
          f = a[0];
          t.page = o;
          i = true;
        }
      } else if (s === "route") {
        if (a?.[1]) {
          f = a[0];
          m = o;
          t.route = o;
          i = true;
        }
      } else if (s === "opengraph-image") {
        let e = D$(c_pathname, `${r}opengraph-image`);

        if (e?.[1]) {
          f = e[0];
          m = o;
          t.opengraphImage = o;
          i = true;
        }
      }
    }
    return i;
  })(p, _, "/");

  let h = Symbol("BAIL_OUT_LAYOUTS");
  async function g(e) {
    let n = null;
    let r = {};
    for (let [i, a] of Object.entries(e.segments)) {
      let e = g(a).catch((e) => {
        if (e && "type" in e && e.type === h) {
          return e.node;
        }
        throw e;
      });

      if (t) {
        r[i] = await e;
      } else {
        r[i] = <Dm.RenderThenable render={e} />;
      }

      if (i === "children") {
        n = r[i];
      }
    }
    let i = e.page || e.default;
    if (i) {
      let a = D0([[i, "default"]], { params: e.params, searchParams: u });
      r.children = n = t ? await a : <Dm.RenderThenable render={a} />;
    }
    if (e.route) {
      throw {
        type: h,
        node: (
          <DO
            response={await D0(
              [[e.route, "GET", true]],
              new Request(c.pathname + c.search),
              { params: e.params }
            )}
          />
        ),
      };
    }
    if (e.opengraphImage) {
      throw {
        type: h,
        node: (
          <DO
            response={await D0([[e.opengraphImage, "default", true]], {
              params: e.params,
            })}
          />
        ),
      };
    }

    if (e.template) {
      r.children = n = <D1>{await D0([[e.template, "default"]], { ...r })}</D1>;
    }

    if (e.layout) {
      n = await D0([[e.layout, "default"]], { ...r, params: e.params });
    }

    if (e.loading) {
      let T_1 = await DZ(e.loading, "default");
      n = <s.Suspense fallback={<T_1 />}>{n}</s.Suspense>;
    }

    if (e.notFound) {
      let t = await DZ(e.notFound, "default");
      n = <Dm.NotFoundBoundary fallback={t}>{n}</Dm.NotFoundBoundary>;
    }
    if (e.error) {
      let t = await DZ(e.error, "default");
      n = <Dm.ErrorBoundary fallback={t}>{n}</Dm.ErrorBoundary>;
    }
    return n;
  }
  return !f || (i === "page" && m) || getIsNavigationBlocked()
    ? null
    : [
        c_pathname,
        f,
        m,
        () =>
          g(p).catch((e) => (e && "type" in e && e.type === h ? e.node : e)),
      ];
}
async function DQ({
  entryModules,
  defaultPath,
  ErrorFallback,
  hmr,
  globalStyles,
}) {
  let a = ((e) => {
    let t = e.reduce((e, t) => {
      e[t] = () => importEntry(t);

      return e;
    }, {});

    let n = e
      .map((e) => {
        let t = e.split("/");
        t[t.length - 1] = t[t.length - 1].replace(/\.[^/.]+$/, "");
        return t;
      })
      .sort((e, t) => {
        if (e.length < t.length) {
          return -1;
        }
        if (e.length > t.length) {
          return 1;
        }
        let n = e[e.length - 1];
        let r = t[t.length - 1];
        return n === r ? 0 : DJ(n) - DJ(r);
      });

    let r = { files: {}, dirs: {} };
    for (let e of n) {
      let n = e.join("/");
      let i = r;
      for (let r = 0; r < e.length; r++) {
        let e_r = e[r];

        if (r === e.length - 1) {
          i.files[e_r] = t[n];
        } else {
          i.dirs[e_r] || (i.dirs[e_r] = { files: {}, dirs: {} });
          i = i.dirs[e_r];
        }
      }
    }
    return { root: r };
  })(entryModules).root;

  let s = DY.bind(null, entryModules, !!hmr, a);
  updateGlobalResolver(s);
  let l = await s(defaultPath, "all");
  if (!l) {
    let a = new URL(defaultPath, "http://n").pathname;

    let l = entryModules.some(
      (e) =>
        (e.startsWith("@v0/app/") || e.startsWith("@v0/src/app/")) &&
        (e.endsWith("/page") ||
          e.endsWith("/route") ||
          e.endsWith("/not-found") ||
          e.endsWith("/error") ||
          e.endsWith("/global-error"))
    );

    let c = null;
    if (!l && a === "/") {
      let a = entryModules
        .filter(
          (e) =>
            !e.endsWith("/route") &&
            !e.endsWith(".css") &&
            !e.endsWith("/page") &&
            !e.endsWith("/middleware") &&
            !e.endsWith("/proxy")
        )
        .map((e, t) => [e, t])
        .sort((e, t) => {
          let n = e[0].split("/").length;
          let r = t[0].split("/").length;
          return n < r ? -1 : n > r ? 1 : t[1] - e[1];
        })
        .map(([e]) => e);
      if (a.length) {
        try {
          let e = await D0(
            a.map((e) => [
              () => importEntry(e),
              ["default", "Component", /^[A-Z][A-Za-z0-9_.]+$/],
            ])
          );
          if (hmr) {
            return;
          }
          return (
            <D2>
              {
                <os.Router
                  defaultParams={{}}
                  defaultRoute={defaultPath}
                  fallback={ErrorFallback}
                  potentialEntries={a}
                  resolver={s}
                  singleComponent
                >
                  {globalStyles}
                  {e}
                </os.Router>
              }
            </D2>
          );
        } catch (e) {
          c = e;
        }
      }
    }

    if (entryModules.length && l) {
      return (
        <Dj.SimpleV0FileBrowser
          currentRoute={defaultPath}
          rawPaths={entryModules}
        />
      );
    }

    if (entryModules.length === 1) {
      return (
        <Dj.SimpleV0FileBrowserSingleComponent
          currentRoute={defaultPath}
          rawPath={entryModules[0]}
        />
      );
    }

    if (c) {
      return <DL.ErrorPage code="Error" message={String(c)} />;
    }

    return <DL.ErrorPage code={404} message="Page not found." />;
  }
  let c = hmr ? await l[3]() : <Dm.RenderThenable render={l[3]()} />;
  if (!hmr) {
    return (
      <os.Router
        defaultParams={l[1]}
        defaultRoute={l[0]}
        fallback={ErrorFallback}
        potentialEntries={entryModules}
        resolver={s}
      >
        {globalStyles}
        {c}
      </os.Router>
    );
  }
}
async function DZ(e, t) {
  try {
    let n = (await e())[t];
    if (n.constructor.name === "AsyncFunction") {
      throw Error(`Component is not allowed to be async: ${n}`);
    }
    return n;
  } catch (e) {
    return () => <Dm.RenderThenable render={e} />;
  }
}
async function D0(e, ...t) {
  for (let n = 0; n < e.length; n++) {
    let [r, i, a] = e[n];
    try {
      let e = await r();
      let N_1 = null;
      for (let t of Array.isArray(i) ? i : [i]) {
        if (typeof t == "string" && e[t] && typeof e[t] == "function") {
          N_1 = e[t];
          break;
        } else if (t instanceof RegExp) {
          for (let r of Object.keys(e)) {
            if (
              t.test(r) &&
              (typeof e[r] == "function" ||
                (typeof e[r] == "object" && e[r].$$typeof))
            ) {
              N_1 = e[r];
              break;
            }
          }
        }
      }
      if (!N_1) {
        continue;
      }
      if (a) {
        return await executeRSC(() => executeInServerContext(() => N_1(...t)));
      }
      if (N_1.constructor.name === "AsyncFunction") {
        let E_1 = createAsyncComponentWithCache(
          executeRSC(() => executeInServerContext(() => N_1(...t))),
          N_1
        );

        let R_1 = globalThis.__v0_replaceRscRefreshComponent?.(N_1, E_1);
        if (R_1) {
          return <R_1 />;
        }
        return <E_1 />;
      }
      return <N_1 {...t[0]} />;
    } catch (t) {
      if (n === e.length - 1) {
        return <Dm.RenderThenable render={t} />;
      }
    }
  }
  throw Error(
    "Component cannot be found. Please make sure it is a default export."
  );
}
function D1({ children }) {
  let { pathname } = useRouter();
  return <s.Fragment key={pathname}>{children}</s.Fragment>;
}
function D2({ children }) {
  let tRef = useRef(null);
  useCenteredContainer(true, tRef, false, null);
  return (
    <div className="contents" ref={tRef}>
      {children}
    </div>
  );
}
function D4() {
  return <DL.ErrorPage code={404} message="This page could not be found." />;
}

let D3 = new Set([
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/server",
  "react-dom/client",
  "next",
  "axios",
  "server-only",
  "client-only",
  "path",
  "fs",
  "fs/promises",
  "dns",
  "dns/promises",
  "node:fs",
  "node:fs/promises",
  "node:dns",
  "node:dns/promises",
  "node:path",
  ...Object.keys(os.default),
  ...Object.keys(oo),
]);

let D6 = new Map([
  ["node_fs.js", "fs"],
  ["node_path.js", "path"],
  ["node_https.js", "https"],
  ["node_crypto.js", "crypto"],
  ["node/fs.mjs", "fs"],
  ["node/path.mjs", "path"],
  ["node/https.mjs", "https"],
  ["node/crypto.mjs", "crypto"],
]);

let D8 = new Set(["/react", "/react-dom", "/server-only", "/client-only"]);

let D5 = new Set([
  "react",
  "react-dom",
  "react-dom/server",
  "react-dom/client",
  "next",
]);

let D7 = new Map([["ai", "4"]]);
function D9(...e) {
  return ((e, t) =>
    `${De.ESMSH_BASE_URL}/${
      t ? `${e}@(${encodeURIComponent(t)})` : e.replace(/^node:/, "")
    }`)(...e);
}
let Ne = /document\.cookie\s*=/g;

const {
  getTailwindVersion,
  setGlobalTailwindConfig,
  extractThemeVariables,
} = require(819757 /* wakaru:missing */);

const { trackRuntimeModuleCreation } = require(249875 /* wakaru:missing */);

let Nr = null;
let Ni = {};
function Na(e, t, n) {
  return (
    `import * as __mod from ${JSON.stringify(e)}
` +
    (n
      ? `${n.import}
`
      : "") +
    Array.from(t)
      .map((e) =>
        e === "default"
          ? `export default ${n ? `${n.api}(__mod.default)` : "__mod.default"}`
          : `export const ${e} = ${
              n
                ? `${n.api}(__mod[${JSON.stringify(e)}])`
                : `__mod[${JSON.stringify(e)}]`
            }`
      )
      .join("\n")
  );
}
async function No(e, t = false, n, r) {
  Ni = { ...oa(n, r), ...Dp, ...DI, ...os.default };
  let i = Nr || {
    react: Nd("React", s),
    "react-dom": Nd("ReactDOM", l),
    "react/jsx-runtime": Nd("ReactJSXRuntime", o),
    __v0__: Nd("__v0__", s),
    "__v0__/internal": Nd("__v0__/internal", os.internals),
    "__v0__/jsx-dev-runtime": Nd("__v0__/jsx-dev-runtime", Dw),
    ...Object.fromEntries(
      Object.entries(os.default)
        .map(([e, t]) =>
          t && ("__dynamic" in t || "__lazy" in t)
            ? null
            : t && "__runtime" in t
            ? [e, Np(e, t.__runtime, true)]
            : [e, Nd(e, t)]
        )
        .filter(p.isNonNullable)
    ),
  };
  function a(e, t, n = false) {
    Dm.blobToModuleName[t] = e;

    if (!i[e] || n) {
      i[e] = t;
    }
  }
  let c = [];
  let d = [];

  let u = (e) => {
    d.push(async () => {
      try {
        await window.importShim(e);
      } catch (t) {
        console.info(`Failed to apply HMR update for ${e}:`, t);
      }
    });
  };

  let _ = new Set(Object.keys(window.importShim.getImportMap().imports));
  async function f(e, n, r, i = false) {
    let o = r?.__dynamic ? r(n.used) : r?.__lazy ? await r() : r;
    if (o?.__runtime) {
      a(e, Np(e, o.__runtime, t, u), true);
    } else {
      let n = Nd(e, o, t || r?.__dynamic || i);
      a(e, n, t || r?.__dynamic || i);

      if (_.has(`${e}?server_layer`)) {
        a(`${e}?server_layer`, n, t || r?.__dynamic || i);
      }

      if (_.has(`${e}?client_layer`)) {
        a(`${e}?client_layer`, n, t || r?.__dynamic || i);
      }
    }
  }
  for (let [n, r] of Object.entries(e)) {
    if (r.type !== "script" || ["react", "react-dom"].includes(n)) {
      continue;
    }
    if (n.startsWith("@v0/")) {
      if (typeof r.runtime == "string") {
        if (r.meta.topLevelUseServer) {
          let e = `${n}?server_layer`;

          let i = {
            import: "import { createServerRef } from '__v0__/internal'",
            api: "createServerRef",
          };

          a(e, Np(e, r.runtime, t, u), true);

          a(
            `${n}?client_layer`,
            Np(`${n}?client_layer`, Na(e, r.exported, i), t, u),
            true
          );

          a(n, Np(n, Na(e, r.exported, i), t, u), true);
        } else if (r.meta.topLevelUseClient) {
          let e = `${n}?client_layer`;

          let i = {
            import: "import { createClientRef } from '__v0__/internal'",
            api: "createClientRef",
          };

          a(e, Np(e, r.runtime, t, u), true);

          a(
            `${n}?server_layer`,
            Np(`${n}?server_layer`, Na(e, r.exported, i), t, u),
            true
          );

          a(n, Np(n, Na(e, r.exported, i), t, u), true);
        } else {
          a(n, Np(n, r.runtime, t, u), true);

          a(
            `${n}?server_layer`,
            Np(`${n}?server_layer`, r.runtime, t, u),
            true
          );

          a(
            `${n}?client_layer`,
            Np(`${n}?client_layer`, r.runtime, t, u),
            true
          );
        }
        continue;
      } else if (!Ni[n]) {
        continue;
      }
    }
    let Ni_n = Ni[n];

    if (Ni_n) {
      c.push(f(n, r, Ni_n, !t));
    } else {
      a(n, Nf(n, { used: r.used }));
    }
  }
  await Promise.all(c);
  Nr = i;
  window.importShim.addImportMap({ imports: i });

  if (t) {
    await Promise.all(d.map((e) => e()));
  }
}
async function Ns(e, t) {
  if (Dv("tailwind-config", t)) {
    try {
      let t = getTailwindVersion();
      if (t == 3) {
        if (e["@v0/tailwind.config"]) {
          let e = await importEntry("@v0/tailwind.config");

          if (e.default) {
            setGlobalTailwindConfig(e.default);
          }
        }
      } else {
        setGlobalTailwindConfig({
          theme: { extend: { colors: extractThemeVariables() } },
        });
      }
    } catch (e) {
      console.warn("Failed to load global configs:", e);
    }
  }
}
async function Nl(e, t) {
  let n =
    "@v0/app/globals.css" in e
      ? "@v0/app/globals.css"
      : "@v0/src/app/globals.css" in e
      ? "@v0/src/app/globals.css"
      : null;

  let r = !!(e["@v0/app/layout"] || e["@v0/src/app/layout"]);
  let i = n ? (r ? null : (await importEntry(n)).default) : null;
  if (n && !r) {
    let e = document.getElementById("default-global-styles");

    if (e) {
      e.innerHTML = "";
      e.remove();
    }
  }
  Ns(e, t);
  return i;
}
window.__v0_modules__ = {};
window.React = s;
let Nc = {};
function Nd(e, t, n = false) {
  if (Nc[e]) {
    if (!n) {
      return Nc[e];
    } else {
      URL.revokeObjectURL(Nc[e]);
    }
  }
  window.__v0_modules__[e] = t;
  let r = new Blob(
    [
      `\
const mod = window.__v0_modules__[${JSON.stringify(e)}];
${"default" in t ? "export default mod.default;" : "export { mod as default };"}
${Object.keys(t)
  .map((e, t) =>
    e === "default"
      ? ""
      : `const __v0_${t} = mod[${JSON.stringify(
          e
        )}]; export { __v0_${t} as ${JSON.stringify(e)} };`
  )
  .join("\n")}

//# sourceFileName=${e.replace(/^@v0\//, "")}
`,
    ],
    { type: "application/javascript" }
  );
  Nc[e] = URL.createObjectURL(r);
  Dm.blobToModuleName[Nc[e]] = e;
  return Nc[e];
}
let Nu = new Map();
function Np(e, t, n = false, r) {
  trackRuntimeModuleCreation(e, t);

  if (Nc[e]) {
    if (n && Nu.get(e) === t) {
      return Nc[e];
    }
    r?.(e);
    URL.revokeObjectURL(Nc[e]);
  }

  let i = new Blob([t], { type: "application/javascript" });
  Nc[e] = URL.createObjectURL(i);
  Nu.set(e, t);
  Dm.blobToModuleName[Nc[e]] = e;
  return Nc[e];
}
let N_ = {
  phaser: () =>
    Np(
      "phaser",
      `\
import * as phaser from '${D9("phaser")}'
export * from '${D9("phaser")}'
export default phaser
`,
      true
    ),
};
function Nf(e, { used: t, version: n } = {}) {
  return e.startsWith("http://") || e.startsWith("https://")
    ? `${De.ESMSH_BASE_URL}/${encodeURIComponent(e)}`
    : t && e in N_
    ? N_[e](t)
    : e.startsWith("recharts@2.")
    ? D9("recharts@latest")
    : D9(e, n);
}
let Nm = new Set(["mdx-components"]);
async function Nh({
  result,
  rawFiles,
  envPromise,
  defaultPath,
  hmr,
  createdAt,
  chatMetadata,
}) {
  let c;
  let d;
  let u;

  let p = result.entryModules.filter((e) => {
    let t = e.split("/").pop();
    return t && !Nm.has(t);
  });

  if (!p.length) {
    for (let e of Object.keys(result.modules)) {
      if (
        (e.startsWith("@v0/app/") && e.endsWith("/page")) ||
        (e.startsWith("@v0/src/app/") && e.endsWith("/page"))
      ) {
        p = [e];
        break;
      }
    }
  }
  if (!p.length) {
    return <D4 />;
  }

  ((e) => {
    if (Ny) {
      return;
    }
    Ny = true;

    let t = e.reduce((e, { key, value }) => {
      e[key] = value;
      return e;
    }, {});

    let n = {
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_TARGET_ENV: "preview",
      VERCEL_URL: window.location.host,
      VERCEL_BRANCH_URL: window.location.host,
      VERCEL_REGION: "cdg1",
      VERCEL_DEPLOYMENT_ID: "",
      VERCEL_PROJECT_ID: "",
      VERCEL_SKEW_PROTECTION_ENABLED: "0",
    };

    let r = new Set();
    window.process = {};

    window.process.env = new Proxy(
      { NODE_ENV: "development", ...n, ...t },
      {
        get(e, t) {
          let n = getCurrentExecutionContext() === "client";
          if (typeof t == "string" && n && !t.startsWith("NEXT_PUBLIC_")) {
            if (!r.has(t)) {
              r.add(t);
              console.warn(`${t} cannot be accessed on the client.`);
            }

            return;
          }
          return e[t];
        },
      }
    );

    let i = "/";

    window.process.cwd = () => i;

    window.process.chdir = (e) => {
      i = e;
    };

    window.process.exit = (e) => {
      throw Error(`Process exited with code ${e}`);
    };

    window.process.on = () => {};
    window.process.version = "v20.0.0";
    window.process.versions = { node: "20.0.0" };
    window.process.platform = "linux";
    window.process.ppid = 0;

    window.Deno = {
      ...window.process,
      env: {
        get: (e) => window.process.env[e],
        set(e, t) {
          window.process.env[e] = t;
        },
        toObject: () => window.process.env,
      },
      pid: 0,
      build: { arch: "unknown", platform: "browser" },
      mainModule: "",
      args: [],
      argv: [],
    };
  })([
    ...(await envPromise),
    ...Object.entries(result.envs).map(([e, t]) => ({
      key: e,
      value: t,
    })),
  ]);

  c = rawFiles;
  getGlobals().internal_fs = c;

  if ((d = getGlobals().internal_fs_vol)) {
    d.reset();
    d.fromJSON(Object.fromEntries(c), "/");
  }

  await module.A(545447);

  await No(
    result.modules,
    hmr,
    Object.fromEntries(
      rawFiles.filter((e) => e[1].type === "file").map((e) => [e[0], e[1].data])
    ),
    chatMetadata
  );

  if (result.modules["@v0/proxy"]) {
    await DG("@v0/proxy");
  } else if (result.modules["@v0/middleware"]) {
    await DG("@v0/middleware");
  }

  try {
    u = await DQ({
      entryModules: p,
      defaultPath: defaultPath,
      ErrorFallback: DL.ErrorPage,
      hmr: hmr,
      globalStyles: await Nl(result.modules, createdAt),
    });
  } catch (e) {
    u = <DL.ErrorPage error={e} />;
  }
  return (
    <>
      {u}
      {hmr ? null : <Ng />}
    </>
  );
}
function Ng() {
  s.useEffect(() => {
    let e;
    let t = { ...globalThis.__v0_hmr };

    setTimeout(() => {
      e = () => {
        for (let e of Object.values(t)) {
          try {
            e();
          } catch {}
        }
      };
    }, 0);

    return () => {
      e?.();
    };
  }, []);

  return null;
}
let Ny = false;
window.__v0_updateProcessEnv = (e) => {
  if (!window.process || !window.process.env) {
    return;
  }
  let t = e.reduce((e, { key, value }) => {
    e[key] = value;
    return e;
  }, {});
  Object.assign(window.process.env, t);
};
let Nv = new Map();
let Nb = /^(text|application)\/css(;|$)/;
let Nx = /^(text|application)\/javascript(;|$)/;
let NS = /^(application|text)\/json(;|$)/;
let Nk = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
function NT(e) {
  if (e in Ni) {
    if (Nv.has(e)) {
      return Nv.get(e);
    }
    let Ni_e = Ni[e];
    if (typeof Ni_e == "function" && Ni_e.__lazy) {
      let t = Ni[e]().then((t) => {
        let n = Nd(e, t);
        window.importShim.addImportMap({ imports: { [e]: n } });
        return n;
      });
      Nv.set(e, t);
      return t;
    }
    {
      let n = Nd(e, Ni_e);
      window.importShim.addImportMap({ imports: { [e]: n } });
      Nv.set(e, n);
      return n;
    }
  }
}
window.esmsInitOptions = {
  mapOverrides: true,
  shimMode: true,
  async resolve(e, t, n) {
    if (e in DP) {
      let DP_e = DP[e];
      return typeof DP_e == "string"
        ? Nf(DP_e)
        : Np(e, DP_e.map((e) => `export * from '${D9(e)}'`).join("\n"));
    }
    for (let n of DM) {
      let r = n(e, t);
      if (r) {
        return Nf(r);
      }
    }
    let r = ((e, t) => {
      let n = t.startsWith(De.ESMSH_BASE_URL);
      if (!n) {
        return;
      }
      let r =
        (n
          ? e.match(/\/(@?[^@]+)(@|$)/)?.[1]
          : e.match(/\/[^/]+\/(@?[^@]+)(@|$)/)?.[1]) || "";
      r = r.replace(/\?.+/, "");

      let i =
        (D3.has(r) &&
          e.match(
            n
              ? e.includes("@^") ||
                e.includes("@~") ||
                e.includes("@>") ||
                e.includes("@<") ||
                e.includes("@=")
                ? /(\/[^/]+)(\/.+)\?.+$/
                : /(\/[^/]+){2}(\/.+)\.m?js$/
              : /(\/[^/]+){3}(\/.+)\.m?js$/
          )?.[2]) ||
        "";

      let a = r + (D8.has(i) ? "" : i);
      return D6.has(a) ? D6.get(a) : a && D3.has(a) ? a : undefined;
    })(e, t);

    if (r) {
      e = r;
    }

    let i = Dv("hardcoded-ai-sdk-override-disabled");
    if (Dv("package-json") || !i) {
      let t = (() => {
        let e = {};
        try {
          let t = getGlobals().internal_fs.find(
            (e) => e[0] === "package.json"
          )?.[1].data;
          if (!t) {
            return {};
          }
          let n = JSON.parse(t);
          let r = { ...n.dependencies, ...n.devDependencies };
          for (let [t, n] of Object.entries(r)) {
            if (!D5.has(t) && t in DP && !t.startsWith("@types/")) {
              e[t] = n;
            }
          }
        } catch (t) {
          e = {};
        }
        return e;
      })();
      if (e.includes("/")) {
        let [n, r] = e.split("/");
        let t_n = t[n];
        if (t_n) {
          return Nf(`${n}@${t_n}/${r}`);
        }
        if (D7.has(n) && !i) {
          return Nf(`${n}@${D7.get(n)}/${r}`);
        }
      } else {
        let t_e = t[e];
        if (t_e) {
          if (
            e === "ai" &&
            (t_e === "latest" ||
              ((e, t) => {
                let n = e.replace(/[^0-9.]/g, "");
                let r = t.replace(/[^0-9.]/g, "");
                let i = n.split(".").map(Number);
                let a = r.split(".").map(Number);
                for (let e = 0; e < Math.max(i.length, a.length); e++) {
                  let t = i[e] || 0;
                  let n = a[e] || 0;
                  if (t > n) {
                    break;
                  }
                  if (t < n) {
                    return false;
                  }
                }
                return true;
              })(t_e, "5.0.62"))
          ) {
            let Dp_ai = Dp.ai;
            return Dp_ai?.__lazy ? Nd(e, await Dp_ai()) : Nd(e, Dp_ai);
          }
          return Nf(`${e}@${t_e}`);
        }
        if (D7.has(e) && !i) {
          return Nf(`${e}@${D7.get(e)}`);
        }
      }
    }
    try {
      let r = findOriginalModuleNameFromURL(t, true);
      let i = r.match(/\?(server_layer|client_layer)$/)?.[1];
      if (e === "server-only" || e === "client-only") {
        return n(`${e}?${i || "server_layer"}`, t);
      }
      if (e.startsWith("@v0/")) {
        let r = e.match(/\?(server_layer|client_layer)$/)?.[1];
        if (i && !r) {
          try {
            return n(`${e}?${i}`, t);
          } catch {}
        }
      }
      return n(e, t);
    } catch (r) {
      if (e in Ni) {
        try {
          await NT(e);
          return n(e, t);
        } catch {}
        return e;
      }
      if (e in Dp) {
        let Dp_e = Dp[e];
        return Dp_e?.__lazy ? Nd(e, await Dp_e()) : Nd(e, Dp_e);
      }
      if (Nk.test(e)) {
        return Nf(e);
      }
      throw r;
    }
  },
  onimport: NT,
  async fetch(e, t) {
    if (
      typeof e == "string" &&
      e.startsWith(De.ESMSH_BASE_URL) &&
      (window.process.env.NPM_RC || window.process.env.NPM_TOKEN)
    ) {
      let t = JSON.stringify({
        NPM_RC: window.process.env.NPM_RC,
        NPM_TOKEN: window.process.env.NPM_TOKEN,
        NPM_REGISTRY: window.process.env.NPM_REGISTRY,
      });
      try {
        let n = await fetch("/api/encrypt-npm-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenData: t }),
        });
        if (n.ok) {
          let { encryptedToken } = await n.json();
          let r = new URL(e);
          r.searchParams.set("nt", encryptedToken);
          e = r.toString();
        }
      } catch (e) {}
    }
    let n = await fetch(e, t);
    if (!n.ok) {
      return n;
    }
    if (!(typeof e == "string" && e.startsWith("blob:"))) {
      let e = n.headers.get("content-type") || "";
      if (Nb.test(e)) {
        let e = n.clone();
        let t = await e.text();

        let r = `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify(
          t
        )});document.adoptedStyleSheets.push(s)`;

        if (t !== r) {
          return new Response(r, {
            headers: {
              ...n.headers,
              "content-type": "application/javascript",
            },
            status: n.status,
          });
        }
      } else if (Nx.test(e)) {
        let e = n.text.bind(n);
        n.text = async () => {
          let t;
          t = await e();

          if (Ne.test(t)) {
            t = t.replace(Ne, "__v0_cookie_doc.cookie=");
          }

          return t;
        };
      } else if (NS.test(e)) {
        let e = n.clone();
        return new Response(
          ((e) => {
            let t = {};
            try {
              t = JSON.parse(e);
            } catch (t) {
              console.error(
                "addJSONDependency: Invalid JSON",
                t,
                ". Source:",
                e
              );
            }
            return `\
const v = ${e};
export default v;
${Object.keys(t)
  .map((e, t) => {
    let n = JSON.stringify(e);
    return `const v_${t} = v[${n}]; export { v_${t} as ${n} };`;
  })
  .join("\n")}`;
          })(await e.text()),
          {
            headers: {
              ...n.headers,
              "content-type": "application/javascript",
            },
            status: n.status,
          }
        );
      }
    }
    return n;
  },
};
let NE = /\.(ts|tsx|js|jsx|mjs|cjs)$/i;
let window_URL = window.URL;
window.URL = class extends window_URL {
  constructor(e, t) {
    if (t && typeof t == "string" && t.startsWith("blob:")) {
      const n = window.importShim.getImportMap().imports;
      for (const r in n) {
        if (t === n[r]) {
          const t = resolve(dirname(r), e);
          const i = n[t.replace(NE, "")] || n[t];
          if (i) {
            return void super(i);
          }
        }
      }
    }
    super(e, t);
  }
  get [Symbol.toStringTag]() {
    return "URL";
  }
};
const NA = require(807442 /* wakaru:missing */);

const {
  getExtraElementInfo,
  optimisticApplyVisualChanges,
  revertOptimisticVisualChanges,
} = require(13072 /* wakaru:missing */);

let NN = require("module-198764.js").default.default;
let NP = /\.(ts|tsx|js|jsx|mjs|cjs)$/i;
function NM(e, t = true, n) {
  if (!n || _default_2(n)) {
    e = e.replace(/^@\//, "@v0/");
  } else {
    for (let [t, r] of Object.entries(n)) {
      let n = t.replace("*", "");
      if (!r[0]) {
        continue;
      }
      let i = r[0].replace("*", "");
      if (e.startsWith(n) || e.startsWith(`/${n}`)) {
        e = e.replace(n, i);
        e = c.default.resolve("/@v0", e).slice(1);
        break;
      }
    }
  }

  if (t) {
    e = e.replace(NP, "");
  }

  return e;
}
function NL(e, t) {
  let t_e = t[e];
  if (t_e) {
    return t_e;
  }
  let r = {
    dependencies: {},
    type: "script",
    exported: [],
    used: [],
    meta: {},
    path: "",
  };
  t[e] = r;
  return r;
}
function NR(e, t) {
  if (t.startsWith("@v0/") || t === "@v0") {
    if (e.includes(t)) {
      return t;
    }
    if (e.includes(`${t}/index`)) {
      return `${t}/index`;
    }
  }
  return t;
}
let NF = { bcrypt: "bcryptjs" };
function NO(e, t, n) {
  let NF_t = NF[t];
  return (NF_t && (t = NF_t), t.startsWith(".") || t.startsWith("/"))
    ? (t.startsWith("/") && !t.startsWith("/@v0/") && (t = `/@v0${t}`),
      c.default
        .resolve(
          c.default.dirname(e),
          NM(t, true, n),
          ...(t.endsWith("/") ? ["index"] : [])
        )
        .slice(1))
    : NM(t, false, n);
}
function NB(e, t) {
  if (e.dependencies[t]) {
    return e.dependencies[t];
  }
  let n = [];
  e.dependencies[t] = n;
  return n;
}
let NW = /(\.css|\.json|\/middleware)$/;
function Nj(e) {
  if (!e) {
    return false;
  }
  if ("getStatements" in e && typeof e.getStatements == "function") {
    for (let t of e.getStatements()) {
      if (t.isKind(ND.ts.SyntaxKind.ExpressionStatement)) {
        if (/^['"]use server['"]$/.test(t.getText())) {
          return true;
        } else {
          break;
        }
      }
    }
  }
  return false;
}
function Nz(e, t) {
  let n = t.getFirstModifierByKind(ND.ts.SyntaxKind.DefaultKeyword);
  if (n) {
    let r = n.getEnd();
    let i = t.getEnd();
    e.appendRight(r, " __v0_createServerRef(");
    e.appendRight(i, ")");
  } else {
    let n = t.getStart();
    let r = t.getEnd();
    e.appendRight(n, " __v0_createServerRef(");
    e.appendRight(r, ")");
  }
}

let NV = `It is not allowed to define inline "use server" annotated Server Actions in Client Components.
To use Server Actions in a Client Component, you can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.`;

let NG = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  BigInt64Array,
  BigUint64Array,
];

let NK = [];
class NU {
  scopes = [];
  referenceId = 1;
  references = new Map();
  wrappedObjects = new WeakMap();
  externalObjects = new WeakMap();
  buffers = new Map();
  instanceData = 0;
  pendingException = null;
  constructor(e) {
    this.id = NK.length;
    NK.push(this);
    this.instance = e;
    this.table = e.exports.__indirect_function_table;
    this.exports = {};
    this.pushScope();
    let t = this.scopes[this.scopes.length - 1];
    let t_length = t.length;
    t.push(this.exports);
    try {
      this.instance.exports.napi_register_module_v1(this.id, t_length);

      if (this.instance.exports.napi_register_wasm_v1) {
        this.instance.exports.napi_register_wasm_v1(this.id, t_length);
      }
    } finally {
      this.popScope();

      if (this.pendingException) {
        let e = this.pendingException;
        this.pendingException = null;
        throw e;
      }
    }
  }
  destroy() {
    NK[this.id] = undefined;
  }
  getString(e, t = N2(this.memory, e)) {
    return NH.decode(this.memory.subarray(e, e + t));
  }
  pushScope() {
    let e = this.scopes.length;
    this.scopes.push([undefined, null, globalThis, true, false]);
    return e;
  }
  popScope() {
    this.scopes.pop();

    for (let [e, t] of this.buffers) {
      if (e.byteLength && t.byteLength) {
        e.set(t);
      }
    }

    this.buffers.clear();
  }
  get(e) {
    return this.scopes[this.scopes.length - 1][e];
  }
  set(e, t) {
    this.scopes[this.scopes.length - 1][e] = t;
  }
  pushValue(e) {
    let t = this.scopes[this.scopes.length - 1];
    let t_length = t.length;
    t.push(e);
    return t_length;
  }
  createValue(e, t) {
    if (typeof e == "boolean") {
      this.setPointer(t, e ? 3 : 4);
      return 0;
    }
    if (e === undefined) {
      this.setPointer(t, 0);
      return 0;
    }
    if (e === null) {
      this.setPointer(t, 1);
      return 0;
    }
    if (e === globalThis) {
      this.setPointer(t, 2);
      return 0;
    }
    let n = this.pushValue(e);
    this.setPointer(t, n);
    return 0;
  }
  setPointer(e, t) {
    this.u32[e >> 2] = t;
    return 0;
  }
  _u32 = new Uint32Array();
  get u32() {
    if (this._u32.byteLength === 0) {
      this._u32 = new Uint32Array(this.instance.exports.memory.buffer);
    }

    return this._u32;
  }
  _i32 = new Int32Array();
  get i32() {
    if (this._i32.byteLength === 0) {
      this._i32 = new Int32Array(this.instance.exports.memory.buffer);
    }

    return this._i32;
  }
  _u16 = new Uint16Array();
  get u16() {
    if (this._u16.byteLength === 0) {
      this._u16 = new Uint16Array(this.instance.exports.memory.buffer);
    }

    return this._u16;
  }
  _u64 = new BigUint64Array();
  get u64() {
    if (this._u64.byteLength === 0) {
      this._u64 = new BigUint64Array(this.instance.exports.memory.buffer);
    }

    return this._u64;
  }
  _i64 = new BigInt64Array();
  get i64() {
    if (this._i64.byteLength === 0) {
      this._i64 = new BigInt64Array(this.instance.exports.memory.buffer);
    }

    return this._i64;
  }
  _f64 = new Float64Array();
  get f64() {
    if (this._f64.byteLength === 0) {
      this._f64 = new Float64Array(this.instance.exports.memory.buffer);
    }

    return this._f64;
  }
  _buf = new Uint8Array();
  get memory() {
    if (this._buf.byteLength === 0) {
      this._buf = new Uint8Array(this.instance.exports.memory.buffer);
    }

    return this._buf;
  }
  getBufferInfo(e, t) {
    if (this.buffers.has(e)) {
      let n = this.buffers.get(e);
      this.setPointer(t, n.byteOffset);
      return n.byteLength;
    }
    if (e instanceof ArrayBuffer) {
      let n = this.copyBuffer(new Uint8Array(e));
      this.setPointer(t, n.byteOffset);
      return n.byteLength;
    }
    if (e.buffer === this.instance.exports.memory.buffer) {
      this.setPointer(t, e.byteOffset);
      return e.byteLength;
    }
    let n = this.copyBuffer(
      new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
    );
    this.setPointer(t, n.byteOffset);
    return n.byteLength;
  }
  copyBuffer(e) {
    let t = this.instance.exports.napi_wasm_malloc(e.byteLength);
    let n = this.memory;
    n.set(e, t);
    let r = n.subarray(t, t + e.byteLength);
    this.buffers.set(e, r);
    return r;
  }
  createFunction(e, t) {
    let n = this;
    let r = n.table.get(e);
    return function (...e) {
      let i = n.pushScope();
      try {
        let a = n.scopes[i];
        let a_length = a.length;
        a.push({ thisArg: this, args: e, data: t, newTarget: new.target });
        let s = r(n.id, a_length);
        return n.get(s);
      } finally {
        n.popScope();

        if (n.pendingException) {
          let n_pendingException = n.pendingException;
          n.pendingException = null;
          throw n_pendingException;
        }
      }
    };
  }
  readPropertyDescriptor(e) {
    let t = this.u32;
    let n = t[e++];
    let r = t[e++];
    let i = t[e++];
    let a = t[e++];
    let o = t[e++];
    let s = t[e++];
    let l = t[e++];
    let c = t[e++];
    let d = n ? this.getString(n) : this.get(r);
    let u = a ? this.createFunction(a, c) : undefined;
    let p = o ? this.createFunction(o, c) : undefined;
    let _ = i ? this.createFunction(i, c) : s ? this.get(s) : undefined;

    let f = {
      name: d,
      static: !!(1024 & l),
      configurable: !!(4 & l),
      enumerable: !!(2 & l),
    };

    if (u || p) {
      f.get = u;
      f.set = p;
    } else if (_) {
      f.writable = !!(1 & l);
      f.value = _;
    }

    return f;
  }
}
let NH = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
let Nq = new TextDecoder("latin1");
let NJ = new TextDecoder("utf-16");
let N$ = new TextEncoder();
class NX {
  constructor(e, t, n, r) {
    this.env = e;
    this.finalize = t;
    this.hint = n;
    this.data = r;
  }
}
let NY = new FinalizationRegistry((e) => {
  if (e.finalize) {
    e.finalize(e.env, e.data, e.hint);
  }
});
class NQ {}
let NZ = [];
class N0 {
  constructor(e, t, n, r) {
    this.env = e;
    this.fn = t;
    this.nativeFn = n;
    this.context = r;
    this.id = NZ.length;
    NZ.push(this);
  }
}
let N1 = {
  napi_open_handle_scope(e, t) {
    let NK_e = NK[e];
    let r = NK_e.pushScope();
    return NK_e.setPointer(t, r);
  },
  napi_close_handle_scope(e, t) {
    let NK_e = NK[e];
    return t !== NK_e.scopes.length - 1 ? 13 : (NK_e.popScope(), 0);
  },
  napi_open_escapable_handle_scope(e, t) {
    throw Error("not implemented");
  },
  napi_close_escapable_handle_scope(e, t) {
    throw Error("not implemented");
  },
  napi_escape_handle(e, t, n, r) {
    throw Error("not implemented");
  },
  napi_create_object: (e, t) => NK[e].createValue({}, t),
  napi_set_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    let s = NK_e.get(r);
    a[o] = s;
    return 0;
  },
  napi_get_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    return NK_e.createValue(a[o], r);
  },
  napi_delete_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    let s = false;
    try {
      s = delete a[o];
    } catch (e) {}

    if (r) {
      NK_e.memory[r] = +!!s;
    }

    return 0;
  },
  napi_has_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    NK_e.memory[r] = +(o in a);
    return 0;
  },
  napi_has_own_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    NK_e.memory[r] = +!!a.hasOwnProperty(o);
    return 0;
  },
  napi_set_named_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(r);
    a[NK_e.getString(n)] = o;
    return 0;
  },
  napi_get_named_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.getString(n);
    return NK_e.createValue(a[o], r);
  },
  napi_has_named_property(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.getString(n);
    NK_e.memory[r] = +(o in a);
    return 0;
  },
  napi_get_property_names(e, t, n) {
    let NK_e = NK[e];
    let i = Object.keys(NK_e.get(t));
    return NK_e.createValue(i, n);
  },
  napi_get_all_property_names(e, t, n, r, i, a) {
    throw Error("not implemented");
  },
  napi_define_properties(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = r >> 2;
    for (let e = 0; e < n; e++) {
      let e = NK_e.readPropertyDescriptor(o);
      Object.defineProperty(a, e.name, e);
      o += 8;
    }
    return 0;
  },
  napi_object_freeze: (e, t) => {
    Object.freeze(NK[e].get(t));
    return 0;
  },
  napi_object_seal: (e, t) => {
    Object.seal(NK[e].get(t));
    return 0;
  },
  napi_get_prototype(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.createValue(Object.getPrototypeOf(i), n);
  },
  napi_define_class(e, t, n, r, i, a, o, s) {
    let NK_e = NK[e];
    let c = NK_e.createFunction(r, i);
    Object.defineProperty(c, "name", {
      value: NK_e.getString(t, n),
      configurable: true,
    });
    let d = o >> 2;
    for (let e = 0; e < a; e++) {
      let e = NK_e.readPropertyDescriptor(d);

      if (e.static) {
        Object.defineProperty(c, e.name, e);
      } else {
        Object.defineProperty(c.prototype, e.name, e);
      }

      d += 8;
    }
    return NK_e.createValue(c, s);
  },
  napi_create_reference(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.referenceId++;
    NK_e.references.set(a, { value: NK_e.get(t), refcount: n });
    return NK_e.setPointer(r, a);
  },
  napi_delete_reference: (e, t) => {
    NK[e].references.delete(t);
    return 0;
  },
  napi_get_reference_value(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.references.get(t);
    return NK_e.createValue(i.value, n);
  },
  napi_reference_ref(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.references.get(t);
    i.refcount++;
    return NK_e.setPointer(n, i.refcount);
  },
  napi_reference_unref(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.references.get(t);
    return i.refcount === 0
      ? 9
      : (i.refcount--, NK_e.setPointer(n, i.refcount));
  },
  napi_add_env_cleanup_hook: () => 0,
  napi_remove_env_cleanup_hook: () => 0,
  napi_add_async_cleanup_hook: () => 0,
  napi_remove_async_cleanup_hook: () => 0,
  napi_set_instance_data: (e, t, n, r) => {
    NK[e].instanceData = t;
    return 0;
  },
  napi_get_instance_data(e, t) {
    let NK_e = NK[e];
    return NK_e.setPointer(t, NK_e.instanceData);
  },
  napi_get_boolean: (e, t, n) => NK[e].setPointer(n, t ? 3 : 4),
  napi_get_value_bool(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +!!i;
    return 0;
  },
  napi_create_int32: (e, t, n) => NK[e].createValue(t, n),
  napi_get_value_int32(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.i32[n >> 2] = i;
    return 0;
  },
  napi_create_uint32: (e, t, n) => NK[e].createValue(t, n),
  napi_get_value_uint32(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.setPointer(n, i);
  },
  napi_create_int64: (e, t, n) => NK[e].createValue(Number(t), n),
  napi_get_value_int64(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.i64[n >> 3] = i;
    return 0;
  },
  napi_create_double: (e, t, n) => NK[e].createValue(t, n),
  napi_get_value_double(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.f64[n >> 3] = i;
    return 0;
  },
  napi_create_bigint_int64: (e, t, n) =>
    NK[e].createValue(BigInt.asIntN(64, t), n),
  napi_get_value_bigint_int64(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    NK_e.i64[n >> 3] = a;

    if (r) {
      NK_e.memory[r] = +(BigInt.asIntN(64, a) === a);
    }

    return 0;
  },
  napi_create_bigint_uint64: (e, t, n) =>
    NK[e].createValue(BigInt.asUintN(64, t), n),
  napi_get_value_bigint_uint64(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    NK_e.u64[n >> 3] = a;

    if (r) {
      NK_e.memory[r] = +(BigInt.asUintN(64, a) === a);
    }

    return 0;
  },
  napi_create_bigint_words(e, t, n, r, i) {
    let NK_e = NK[e];
    let NK_e_u64 = NK_e.u64;
    let s = r >> 3;
    let l = 0n;
    let c = 0n;
    for (let e = 0; e < n; e++) {
      l += NK_e_u64[s++] << c;
      c += 64n;
    }
    l *= BigInt((-1) ** t);
    return NK_e.createValue(l, i);
  },
  napi_get_value_bigint_words(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.get(t);
    let s = NK_e.u32[r >> 2];

    if (n) {
      NK_e.i32[n] = +(o < 0n);
    }

    let l = 0;
    if (i) {
      let e = (1n << 64n) - 1n;
      let NK_e_u64 = NK_e.u64;
      let n = i >> 3;
      for (o < 0n && (o = -o); l < s && 0n !== o; l++) {
        NK_e_u64[n++] = o & e;
        o >>= 64n;
      }
    }

    while (o > 0n) {
      l++;
      o >>= 64n;
    }

    return NK_e.setPointer(r, l);
  },
  napi_get_null: (e, t) => NK[e].setPointer(t, 1),
  napi_create_array: (e, t) => NK[e].createValue([], t),
  napi_create_array_with_length: (e, t, n) => NK[e].createValue(Array(t), n),
  napi_set_element(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(r);
    a[n] = o;
    return 0;
  },
  napi_get_element(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t)[n];
    return NK_e.createValue(a, r);
  },
  napi_has_element(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    NK_e.memory[r] = +!!a.hasOwnProperty(n);
    return 0;
  },
  napi_delete_element(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = false;
    try {
      o = delete a[n];
    } catch (e) {}

    if (r) {
      NK_e.memory[r] = +!!o;
    }

    return 0;
  },
  napi_get_array_length(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.setPointer(n, i.length);
  },
  napi_get_undefined: (e, t) => NK[e].setPointer(t, 0),
  napi_create_function(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.createFunction(r, i);

    Object.defineProperty(s, "name", {
      value: NK_e.getString(t, n),
      configurable: true,
    });

    return NK_e.createValue(s, a);
  },
  napi_call_function(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.get(t);
    let l = NK_e.get(n);
    let c = Array(r);
    let NK_e_u32 = NK_e.u32;
    for (let e = 0; e < r; e++) {
      c[e] = NK_e.get(NK_e_u32[i >> 2]);
      i += 4;
    }
    try {
      let e = l.apply(s, c);
      return NK_e.createValue(e, a);
    } catch (e) {
      NK_e.pendingException = e;
      return 10;
    }
  },
  napi_new_instance(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.get(t);
    let s = Array(n);
    let NK_e_u32 = NK_e.u32;
    for (let e = 0; e < n; e++) {
      s[e] = NK_e.get(NK_e_u32[r >> 2]);
      r += 4;
    }
    try {
      let e = new o(...s);
      return NK_e.createValue(e, i);
    } catch (e) {
      NK_e.pendingException = e;
      return 10;
    }
  },
  napi_get_cb_info(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.get(t);
    NK_e.setPointer(n, s.args.length);
    for (let e = 0; e < s.args.length; e++) {
      NK_e.createValue(s.args[e], r);
      r += 4;
    }
    NK_e.createValue(s.thisArg, i);
    NK_e.setPointer(a, s.data);
    return 0;
  },
  napi_get_new_target(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.createValue(i.newTarget, n);
  },
  napi_create_threadsafe_function(e, t, n, r, i, a, o, s, l, c, d) {
    let NK_e = NK[e];
    let p = t ? NK_e.get(t) : undefined;
    let _ = c ? NK_e.table.get(c) : undefined;
    let f = new N0(NK_e, p, _, l);
    if (s) {
      let t = NK_e.table.get(s);
      NY.register(f, new NX(e, t, 0, f.id));
    }
    NK_e.setPointer(d, f.id);
    return 0;
  },
  napi_ref_threadsafe_function: () => 0,
  napi_unref_threadsafe_function: () => 0,
  napi_acquire_threadsafe_function: () => 0,
  napi_release_threadsafe_function: (e, t) => {
    NZ[e] = undefined;
    return 0;
  },
  napi_call_threadsafe_function(e, t, n) {
    let NZ_e = NZ[e];
    NZ_e.env.pushScope();
    try {
      if (NZ_e.nativeFn) {
        let e = NZ_e.fn ? NZ_e.env.pushValue(NZ_e.fn) : 0;
        NZ_e.nativeFn(NZ_e.env.id, e, NZ_e.context, t);
      } else {
        if (NZ_e.fn) {
          NZ_e.fn();
        }
      }
    } finally {
      NZ_e.env.popScope();
    }
  },
  napi_get_threadsafe_function_context(e, t) {
    let NZ_e = NZ[e];
    NZ_e.env.setPointer(t, NZ_e.context);
    return 0;
  },
  napi_throw(e, t) {
    let NK_e = NK[e];
    NK_e.pendingException = NK_e.get(t);
    return 0;
  },
  napi_throw_error(e, t, n) {
    let NK_e = NK[e];
    let i = Error(NK_e.getString(n));
    i.code = t;
    NK_e.pendingException = i;
    return 0;
  },
  napi_throw_type_error(e, t, n) {
    let NK_e = NK[e];
    let i = TypeError(NK_e.getString(n));
    i.code = t;
    NK_e.pendingException = i;
    return 0;
  },
  napi_throw_range_error(e, t, n) {
    let NK_e = NK[e];
    let i = RangeError(NK_e.getString(n));
    i.code = t;
    NK_e.pendingException = i;
    return 0;
  },
  napi_create_error(e, t, n, r) {
    let NK_e = NK[e];
    let a = Error(NK_e.get(n));
    a.code = NK_e.get(t);
    return NK_e.createValue(a, r);
  },
  napi_create_type_error(e, t, n, r) {
    let NK_e = NK[e];
    let a = TypeError(NK_e.get(n));
    a.code = NK_e.get(t);
    return NK_e.createValue(a, r);
  },
  napi_create_range_error(e, t, n, r) {
    let NK_e = NK[e];
    let a = RangeError(NK_e.get(n));
    a.code = NK_e.get(t);
    return NK_e.createValue(a, r);
  },
  napi_get_and_clear_last_exception(e, t) {
    let NK_e = NK[e];
    let NK_e_pendingException = NK_e.pendingException;
    NK_e.pendingException = null;
    return NK_e.createValue(NK_e_pendingException, t);
  },
  napi_is_exception_pending(e, t) {
    let NK_e = NK[e];
    NK_e.memory[t] = +!!NK_e.pendingException;
    return 0;
  },
  napi_fatal_exception(e, t) {
    throw Error("not implemented");
  },
  napi_fatal_error(e, t, n, r) {
    throw Error("not implemented");
  },
  napi_get_global: (e, t) => NK[e].setPointer(t, 2),
  napi_create_buffer(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.instance.exports.napi_wasm_malloc(t);

    if (n) {
      NK_e.setPointer(n, a);
    }

    let o =
      globalThis.Buffer !== undefined
        ? globalThis.Buffer.from(NK_e.memory.buffer, a, t)
        : NK_e.memory.subarray(a, a + t);
    return NK_e.createValue(o, r);
  },
  napi_create_buffer_copy(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.instance.exports.napi_wasm_malloc(t);
    NK_e.memory.set(NK_e.memory.subarray(n, n + t), o);

    if (r) {
      NK_e.setPointer(r, o);
    }

    let s =
      globalThis.Buffer !== undefined
        ? globalThis.Buffer.from(NK_e.memory.buffer, o, t)
        : buf;
    return NK_e.createValue(s, i);
  },
  napi_create_external_buffer(e, t, n, r, i, a) {
    let NK_e = NK[e];

    let s =
      globalThis.Buffer !== undefined
        ? globalThis.Buffer.from(NK_e.memory.buffer, n, t)
        : NK_e.memory.subarray(n, n + t);

    if (r) {
      let t = NK_e.table.get(r);
      NY.register(s, new NX(e, t, i, n));
    }
    return NK_e.createValue(s, a);
  },
  napi_get_buffer_info(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.getBufferInfo(a, n);
    return NK_e.setPointer(r, o);
  },
  napi_create_arraybuffer(e, t, n, r) {
    let NK_e = NK[e];
    let a = new ArrayBuffer(t);

    if (n) {
      NK_e.getBufferInfo(a, ptr);
    }

    return NK_e.createValue(a, r);
  },
  napi_create_external_arraybuffer: (e, t, n, r, i, a) => 22,
  napi_get_arraybuffer_info(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.getBufferInfo(NK_e.get(t), n);
    return NK_e.setPointer(r, a);
  },
  napi_detach_arraybuffer(e, t) {
    let n = NK[e].get(t);

    if (typeof structuredClone == "function") {
      structuredClone(n, { transfer: [n] });
    }

    return 0;
  },
  napi_is_detached_arraybuffer(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +(i.byteLength === 0);
    return 0;
  },
  napi_create_typedarray(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = new NG[t](NK_e.get(r), i, n);
    return NK_e.createValue(s, a);
  },
  napi_create_dataview(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = new DataView(NK_e.get(n), r, t);
    return NK_e.createValue(o, i);
  },
  napi_get_typedarray_info(e, t, n, r, i, a, o) {
    let NK_e = NK[e];
    let l = NK_e.get(t);
    NK_e.setPointer(n, NG.indexOf(l.constructor));
    NK_e.setPointer(r, l.length);
    NK_e.getBufferInfo(l, i);
    NK_e.createValue(l.buffer, a);
    return NK_e.setPointer(o, l.byteOffset);
  },
  napi_get_dataview_info(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.get(t);
    NK_e.setPointer(n, s.byteLength);
    NK_e.getBufferInfo(s, r);
    NK_e.createValue(s.buffer, i);
    return NK_e.setPointer(a, s.byteOffset);
  },
  napi_create_string_utf8(e, t, n, r) {
    let NK_e = NK[e];
    let a = NH.decode(NK_e.memory.subarray(t, t + n));
    return NK_e.createValue(a, r);
  },
  napi_get_value_string_utf8(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.get(t);
    if (n == 0) {
      return NK_e.setPointer(
        i,
        ((e) => {
          let t = 0;
          for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
            if (r >= 55296 && r <= 56319 && n < e.length - 1) {
              let t = e.charCodeAt(++n);

              if ((64512 & t) == 56320) {
                r = ((1023 & r) << 10) + (1023 & t) + 65536;
              } else {
                n--;
              }
            }

            if ((4294967168 /* 0xffffff80 */ & r) == 0) {
              t++;
            } else if ((4294965248 /* 0xfffff800 */ & r) == 0) {
              t += 2;
            } else if ((4294901760 /* 0xffff0000 */ & r) == 0) {
              t += 3;
            } else if ((4292870144 /* 0xffe00000 */ & r) == 0) {
              t += 4;
            }
          }
          return t;
        })(o)
      );
    }
    let s = N$.encodeInto(o, NK_e.memory.subarray(n, n + r - 1));
    NK_e.memory[n + s.written] = 0;
    return NK_e.setPointer(i, s.written);
  },
  napi_create_string_latin1(e, t, n, r) {
    let NK_e = NK[e];
    let a = Nq.decode(NK_e.memory.subarray(t, t + n));
    return NK_e.createValue(a, r);
  },
  napi_get_value_string_latin1(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.get(t);
    if (n == 0) {
      return NK_e.setPointer(i, o.length);
    }
    let NK_e_memory = NK_e.memory;
    let l = Math.min(o.length, r - 1);
    for (let e = 0; e < l; e++) {
      let t = o.charCodeAt(e);
      NK_e_memory[n++] = t;
    }
    NK_e_memory[n] = 0;
    return NK_e.setPointer(i, l);
  },
  napi_create_string_utf16(e, t, n, r) {
    let NK_e = NK[e];
    let a = NJ.decode(NK_e.memory.subarray(t, t + 2 * n));
    return NK_e.createValue(a, r);
  },
  napi_get_value_string_utf16(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = NK_e.get(t);
    if (n == 0) {
      return NK_e.setPointer(i, o.length);
    }
    let NK_e_u16 = NK_e.u16;
    let l = n >> 1;
    let c = Math.min(o.length, r - 1);
    for (let e = 0; e < c; e++) {
      let t = o.charCodeAt(e);
      NK_e_u16[l++] = t;
    }
    NK_e_u16[l] = 0;
    return NK_e.setPointer(i, c);
  },
  napi_create_date: (e, t, n) => NK[e].createValue(new Date(t), n),
  napi_get_date_value(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.f64[n >> 3] = i.valueOf();
  },
  napi_create_symbol(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.createValue(Symbol(i), n);
  },
  napi_coerce_to_bool(e, t, n) {
    let NK_e = NK[e];
    return NK_e.createValue(!!NK_e.get(t), n);
  },
  napi_coerce_to_number(e, t, n) {
    let NK_e = NK[e];
    return NK_e.createValue(Number(NK_e.get(t)), n);
  },
  napi_coerce_to_object(e, t, n) {
    let NK_e = NK[e];
    return NK_e.createValue(Object(NK_e.get(t)), n);
  },
  napi_coerce_to_string(e, t, n) {
    let NK_e = NK[e];
    return NK_e.createValue(String(NK_e.get(t)), n);
  },
  napi_typeof(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    return NK_e.setPointer(
      n,
      (() => {
        switch (typeof i) {
          case "undefined": {
            return 0;
          }
          case "boolean": {
            return 2;
          }
          case "number": {
            return 3;
          }
          case "string": {
            return 4;
          }
          case "symbol": {
            return 5;
          }
          case "object": {
            if (i === null) {
              return 1;
            }
            if (i instanceof NQ) {
              return 8;
            }
            return 6;
          }
          case "function": {
            return 7;
          }
          case "bigint": {
            return 9;
          }
        }
      })()
    );
  },
  napi_instanceof(e, t, n, r) {
    let NK_e = NK[e];
    let a = NK_e.get(t);
    let o = NK_e.get(n);
    NK_e.memory[r] = +(a instanceof o);
    return 0;
  },
  napi_is_array(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +!!Array.isArray(i);
    return 0;
  },
  napi_is_buffer(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);

    NK_e.memory[n] = +(globalThis.Buffer !== undefined
      ? !!globalThis.Buffer.isBuffer(i)
      : i instanceof Uint8Array);

    return 0;
  },
  napi_is_date(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +(i instanceof Date);
    return 0;
  },
  napi_is_error(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +(i instanceof Error);
    return 0;
  },
  napi_is_typedarray(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = !ArrayBuffer.isView(i) || i instanceof DataView ? 0 : 1;
    return 0;
  },
  napi_is_dataview(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +(i instanceof DataView);
    return 0;
  },
  napi_strict_equals(e, t, n, r) {
    let NK_e = NK[e];
    NK_e.memory[r] = +(NK_e.get(t) === NK_e.get(n));
    return 0;
  },
  napi_wrap(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.get(t);
    NK_e.wrappedObjects.set(s, n);

    if (r) {
      let t = NK_e.table.get(r);
      NY.register(s, new NX(e, t, i, n));
    }

    return a ? N1.napi_create_reference(e, t, 1, a) : 0;
  },
  napi_unwrap(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    let a = NK_e.wrappedObjects.get(i);
    NK_e.setPointer(n, a);
    return 0;
  },
  napi_remove_wrap(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    let a = NK_e.wrappedObjects.get(i);
    NY.unregister(i);
    NK_e.wrappedObjects.delete(i);
    return NK_e.setPointer(n, a);
  },
  napi_type_tag_object(e, t, n) {
    throw Error("not implemented");
  },
  napi_check_object_type_tag(e, t, n) {
    throw Error("not implemented");
  },
  napi_add_finalizer(e, t, n, r, i, a) {
    let NK_e = NK[e];
    let s = NK_e.get(t);
    let l = NK_e.table.get(r);
    return (NY.register(s, new NX(e, l, i, n)), a)
      ? N1.napi_create_reference(e, t, 1, a)
      : 0;
  },
  napi_create_promise(e, t, n) {
    let NK_e = NK[e];

    let i = new Promise((e, n) => {
      NK_e.createValue({ resolve: e, reject: n }, t);
    });

    return NK_e.createValue(i, n);
  },
  napi_resolve_deferred(e, t, n) {
    let NK_e = NK[e];
    let { resolve: resolve_1 } = NK_e.get(t);
    resolve_1(NK_e.get(n));
    NK_e.set(t, undefined);
    return 0;
  },
  napi_reject_deferred(e, t, n) {
    let NK_e = NK[e];
    let { reject } = NK_e.get(t);
    reject(NK_e.get(n));
    NK_e.set(t, undefined);
    return 0;
  },
  napi_is_promise(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    NK_e.memory[n] = +(i instanceof Promise);
    return 0;
  },
  napi_run_script(e, t, n) {
    let NK_e = NK[e];
    let i = (0, eval)(NK_e.get(t));
    return NK_e.createValue(i, n);
  },
  napi_create_external(e, t, n, r, i) {
    let NK_e = NK[e];
    let o = new NQ();
    NK_e.externalObjects.set(o, t);

    if (n) {
      let i = NK_e.table.get(n);
      NY.register(o, new NX(e, i, r, t));
    }

    return NK_e.createValue(o, i);
  },
  napi_get_value_external(e, t, n) {
    let NK_e = NK[e];
    let i = NK_e.get(t);
    let a = NK_e.externalObjects.get(i);
    return NK_e.setPointer(n, a);
  },
  napi_adjust_external_memory: () => 0,
};
function N2(e, t) {
  let n = 0;

  while (e[t] !== 0) {
    n++;
    t++;
  }

  return n;
}
function N4(e, n, r) {
  t(e, n, r);
}
async function N3(a) {
  let o;
  if (!n) {
    if (r) {
      return void (await r);
    }

    if (
      "string" == typeof (a = a ?? new module.U(require("module-672832.js"))) ||
      (typeof Request == "function" && a instanceof Request) ||
      (typeof URL == "function" && a instanceof URL)
    ) {
      a = N8(a);
    }

    r = a
      .then((e) =>
        N6(e, {
          env: {
            ...N1,
            await_promise_sync: N4,
            __getrandom_custom: (e, t) => {
              let n = o.memory.subarray(e, e + t);
              crypto.getRandomValues(n);
            },
          },
        })
      )
      .then(({ instance }) => {
        instance.exports.register_module();

        i = ((e) => {
          let n;
          let r;
          let i;
          let { instance, exports } = e;

          let {
            asyncify_get_state,
            asyncify_start_unwind,
            asyncify_stop_unwind,
            asyncify_start_rewind,
            asyncify_stop_rewind,
          } = instance.exports;

          let p = instance.exports.napi_wasm_malloc(4104);
          function _() {
            if (asyncify_get_state() !== 0) {
              throw Error(
                `Invalid async state ${asyncify_get_state()}, expected 0.`
              );
            }
          }
          new Int32Array(e.memory.buffer, p).set([p + 8, p + 8 + 4096]);

          t = (t, a, o) => {
            if (asyncify_get_state() === 2) {
              asyncify_stop_rewind();

              if (r != null) {
                e.createValue(r, a);
              }

              if (i != null) {
                e.createValue(i, o);
              }

              n = null;
              r = null;
              i = null;
              return;
            }
            _();
            n = e.get(t);
            asyncify_start_unwind(p);
          };

          return async (e) => {
            _();
            let t = exports.bundle(e);

            while (asyncify_get_state() === 1) {
              asyncify_stop_unwind();
              try {
                r = await n;
              } catch (e) {
                i = e;
              }
              _();
              asyncify_start_rewind(p);
              t = exports.bundle(e);
            }

            _();
            return t;
          };
        })((o = new NU(instance)));

        n = o.exports;
      });

    await r;
  }
}
async function N6(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") {
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (t) {
        if (e.headers.get("Content-Type") != "application/wasm") {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            t
          );
        } else {
          throw t;
        }
      }
    }
    let n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  }
  {
    let n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
async function N8(e) {
  try {
    return (
      await (() => {
        let e = Error("Cannot find module 'fs'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
      })()
    ).readFileSync(e);
  } catch {
    return fetch(e);
  }
}
function N5(e) {
  let t;
  let n;
  let r;
  let i;
  let a;
  if (e.length === 0) {
    return "";
  }
  let o = "";
  for (let s of e) {
    if (s.type === "token") {
      switch (s.value.type) {
        case "string":
        case "at-keyword":
        case "bad-string":
        case "bad-url":
        case "function":
        case "ident":
        case "delim":
        case "hash":
        case "id-hash":
        case "unquoted-url":
        case "white-space":
        case "comment": {
          o += s.value.value;
          break;
        }
        case "number": {
          o += N7(s.value.value);
          break;
        }
        case "percentage": {
          o += `${N7(100 * s.value.value)}%`;
          break;
        }
        case "dimension": {
          o += `${N7(s.value.value)}${s.value.unit}`;
          break;
        }
        case "comma": {
          o += ",";
          break;
        }
        case "colon": {
          o += ":";
          break;
        }
        case "semicolon": {
          o += ";";
          break;
        }
        case "cdc": {
          o += "-->";
          break;
        }
        case "cdo": {
          o += "<!--";
          break;
        }
        case "include-match": {
          o += "~=";
          break;
        }
        case "dash-match": {
          o += "|=";
          break;
        }
        case "prefix-match": {
          o += "^=";
          break;
        }
        case "suffix-match": {
          o += "$=";
          break;
        }
        case "substring-match": {
          o += "*=";
          break;
        }
        case "parenthesis-block": {
          o += "(";
          break;
        }
        case "square-bracket-block": {
          o += "[";
          break;
        }
        case "curly-bracket-block": {
          o += "{";
          break;
        }
        case "close-curly-bracket": {
          o += "}";
          break;
        }
        case "close-square-bracket": {
          o += "]";
          break;
        }
        case "close-parenthesis": {
          o += ")";
        }
      }
    } else if (s.type === "var") {
      o += `var(${s.value.name.ident}`;

      if (s.value.fallback && s.value.fallback.length > 0) {
        o += `, ${N5(s.value.fallback)}`;
      }

      o += ")";
    } else if (s.type === "color") {
      o += (function e(t) {
        if (typeof t == "string") {
          return t;
        }
        switch (t.type) {
          case "currentcolor": {
            return "currentColor";
          }
          case "rgb": {
            let { r: r_1, g: g_1, b: b_1, alpha } = t;
            if (alpha === 1) {
              return `rgb(${r_1}, ${g_1}, ${b_1})`;
            }
            return `rgba(${r_1}, ${g_1}, ${b_1}, ${N7(alpha)})`;
          }
          case "lab": {
            return `lab(${N7(t.l)} ${N7(t.a)} ${N7(t.b)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "lch": {
            return `lch(${N7(t.l)} ${N7(t.c)} ${N7(t.h)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "oklab": {
            return `oklab(${N7(t.l)} ${N7(t.a)} ${N7(t.b)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "oklch": {
            return `oklch(${N7(t.l)} ${N7(t.c)} ${N7(t.h)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "hsl": {
            return `hsl(${N7(t.h)} ${N7(100 * t.s)}% ${N7(100 * t.l)}%${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "hwb": {
            return `hwb(${N7(t.h)} ${N7(100 * t.w)}% ${N7(100 * t.b)}%${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "srgb":
          case "srgb-linear":
          case "display-p3":
          case "a98-rgb":
          case "prophoto-rgb":
          case "rec2020": {
            return `color(${t.type} ${N7(t.r)} ${N7(t.g)} ${N7(t.b)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "xyz-d50":
          case "xyz-d65": {
            return `color(${t.type} ${N7(t.x)} ${N7(t.y)} ${N7(t.z)}${
              t.alpha !== 1 ? ` / ${N7(t.alpha)}` : ""
            })`;
          }
          case "light-dark": {
            return `light-dark(${e(t.light)}, ${e(t.dark)})`;
          }
        }
      })(s.value);
    } else if (s.type === "unresolved-color") {
      o += ((t = s.value), `unresolved-color(${JSON.stringify(t)})`);
    } else if (s.type === "url") {
      o += `url(${s.value.url})`;
    } else if (s.type === "env") {
      let e =
        s.value.name.type === "custom"
          ? s.value.name.ident
          : s.value.name.value;
      o += `env(${e}`;

      if (s.value.fallback && s.value.fallback.length > 0) {
        o += `, ${N5(s.value.fallback)}`;
      }

      o += ")";
    } else {
      switch (s.type) {
        case "function":
          o += `${s.value.name}(${N5(s.value.arguments)})`;
          break;
        case "length":
          o += ((n = s.value), `${N7(n.value)}${n.unit}`);
          break;
        case "angle":
          o += ((r = s.value), `${N7(r.value)}${r.type}`);
          break;
        case "time":
          o += ((e) => {
            let t = e.type === "milliseconds" ? "ms" : "s";
            return `${N7(e.value)}${t}`;
          })(s.value);

          break;
        case "resolution":
          o += ((i = s.value), `${N7(i.value)}${i.type}`);
          break;
        case "dashed-ident":
          o += s.value;
          break;
        case "animation-name":
          o +=
            "string" == typeof (a = s.value)
              ? a
              : a.type === "ident"
              ? a.value
              : "none";

          break;
      }
    }
  }
  return o;
}
function N7(e, t = {}) {
  let { threshold = 3, maxDecimals = 10 } = t;
  if (Number.isNaN(e)) {
    return "NaN";
  }
  if (!isFinite(e) || Number.isInteger(e)) {
    return e.toString();
  }
  let i = e.toFixed(maxDecimals);
  let a = -1;
  let o = "";
  for (let e = 0; e < i.length; e++) {
    let i_e = i[e];
    if (i_e === "0" || i_e === "9") {
      let r = 1;
      let s = e + 1;

      while (s < i.length && i[s] === i_e) {
        r++;
        s++;
      }

      if (r >= threshold) {
        a = e;
        o = i_e;
        break;
      }
      e = s - 1;
    }
  }
  if (-1 !== a) {
    let e = i.substring(0, a);
    if (o === "9") {
      let t = e;

      let n = Number.parseFloat(t) + 10 ** -(t.length - t.indexOf(".") - 1);

      if (n.toString().length <= t.length) {
        e = n.toString();
      }
    }
    return e.replace(/\.?0+$/, "");
  }
  return i.replace(/\.?0+$/, "");
}
require(606861 /* wakaru:missing */);
class N9 extends Error {
  constructor(e, t) {
    super(e);
    this.name = "DevalueError";
    this.path = t.join("");
  }
}
function Ie(e) {
  return Object(e) !== e;
}
let It = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function In(e) {
  let t = "";
  let n = 0;
  let e_length = e.length;
  for (let i = 0; i < e_length; i += 1) {
    let r = ((e) => {
      switch (e) {
        case '"': {
          return '\\"';
        }
        case "<": {
          return "\\u003C";
        }
        case "\\": {
          return "\\\\";
        }
        case "\n": {
          return "\\n";
        }
        case "\r": {
          return "\\r";
        }
        case "	": {
          return "\\t";
        }
        case "\b": {
          return "\\b";
        }
        case "\f": {
          return "\\f";
        }
        case "\u2028": {
          return "\\u2028";
        }
        case "\u2029": {
          return "\\u2029";
        }
        default: {
          return e < " "
            ? `\\u${e.charCodeAt(0).toString(16).padStart(4, "0")}`
            : "";
        }
      }
    })(e[i]);

    if (r) {
      t += e.slice(n, i) + r;
      n = i + 1;
    }
  }
  return `"${n === 0 ? e : t + e.slice(n)}"`;
}
let Ir = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function Ii(e) {
  return Ir.test(e) ? `.${e}` : `[${JSON.stringify(e)}]`;
}
let Ia = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Io(e) {
  let t = typeof e;
  return t === "string"
    ? In(e)
    : e instanceof String
    ? In(e.toString())
    : e === undefined
    ? "-1"
    : e === 0 && 1 / e < 0
    ? "-6"
    : t === "bigint"
    ? `["BigInt","${e}"]`
    : String(e);
}
let Is = new Map();
let Il = new Map();
function Ic(e, t) {
  return ((e, t) => {
    let n = [];
    let r = new Map();
    let i = [];
    if (t) {
      for (let e of Object.getOwnPropertyNames(t)) {
        i.push({ key: e, fn: t[e] });
      }
    }
    let a = [];
    let o = 0;

    let s = (function e(t) {
      if (t === undefined) {
        return -1;
      }
      if (Number.isNaN(t)) {
        return -3;
      }
      if (t === Infinity) {
        return -4;
      }
      if (t === -Infinity) {
        return -5;
      }
      if (t === 0 && 1 / t < 0) {
        return -6;
      }
      if (r.has(t)) {
        return r.get(t);
      }
      let s = o++;
      r.set(t, s);

      for (let { key, fn: fn_1 } of i) {
        let r = fn_1(t);
        if (r) {
          n[s] = `["${key}",${e(r)}]`;
          return s;
        }
      }

      let l = "";
      if (Ie(t)) {
        l = Io(t);
      } else {
        let n = Object.prototype.toString.call(t).slice(8, -1);
        switch (n) {
          case "Number":
          case "String":
          case "Boolean": {
            l = `["Object",${Io(t)}]`;
            break;
          }
          case "BigInt": {
            l = `["BigInt",${t}]`;
            break;
          }
          case "Date": {
            let r = !isNaN(t.getDate());
            l = `["Date","${r ? t.toISOString() : ""}"]`;
            break;
          }
          case "URL": {
            l = `["URL",${In(t.toString())}]`;
            break;
          }
          case "URLSearchParams": {
            l = `["URLSearchParams",${In(t.toString())}]`;
            break;
          }
          case "RegExp": {
            let { source, flags } = t;
            l = flags
              ? `["RegExp",${In(source)},"${flags}"]`
              : `["RegExp",${In(source)}]`;
            break;
          }
          case "Array": {
            l = "[";
            for (let n = 0; n < t.length; n += 1) {
              if (n > 0) {
                l += ",";
              }

              if (n in t) {
                a.push(`[${n}]`);
                l += e(t[n]);
                a.pop();
              } else {
                l += -2;
              }
            }
            l += "]";
            break;
          }
          case "Set": {
            l = '["Set"';

            for (let n of t) {
              l += `,${e(n)}`;
            }

            l += "]";
            break;
          }
          case "Map": {
            l = '["Map"';

            for (let [n, r] of t) {
              a.push(`.get(${Ie(n) ? Io(n) : "..."})`);
              l += `,${e(n)},${e(r)}`;
              a.pop();
            }

            l += "]";
            break;
          }
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            l = `["${n}",${e(t.buffer)}`;
            let t_byteOffset = t.byteOffset;
            let i = t_byteOffset + t.byteLength;
            if (t_byteOffset > 0 || i !== t.buffer.byteLength) {
              let e = /(\d+)/.exec(n)[1] / 8;
              l += `,${t_byteOffset / e},${i / e}`;
            }
            l += "]";
            break;
          }
          case "ArrayBuffer": {
            let e = ((e) => {
              let t = new DataView(e);
              let n = "";
              for (let r = 0; r < e.byteLength; r++) {
                n += String.fromCharCode(t.getUint8(r));
              }
              var r = n;
              let i = "";
              for (let e = 0; e < r.length; e += 3) {
                let t = [undefined, undefined, undefined, undefined];
                t[0] = r.charCodeAt(e) >> 2;
                t[1] = (3 & r.charCodeAt(e)) << 4;

                if (r.length > e + 1) {
                  t[1] |= r.charCodeAt(e + 1) >> 4;
                  t[2] = (15 & r.charCodeAt(e + 1)) << 2;
                }

                if (r.length > e + 2) {
                  t[2] |= r.charCodeAt(e + 2) >> 6;
                  t[3] = 63 & r.charCodeAt(e + 2);
                }

                for (let e = 0; e < t.length; e++) {
                  if (t[e] === undefined) {
                    i += "=";
                  } else {
                    i += Ia[t[e]];
                  }
                }
              }
              return i;
            })(t);
            l = `["ArrayBuffer","${e}"]`;
            break;
          }
          case "Temporal.Duration":
          case "Temporal.Instant":
          case "Temporal.PlainDate":
          case "Temporal.PlainTime":
          case "Temporal.PlainDateTime":
          case "Temporal.PlainMonthDay":
          case "Temporal.PlainYearMonth":
          case "Temporal.ZonedDateTime": {
            l = `["${n}",${In(t.toString())}]`;
            break;
          }
          default: {
            let s;
            if (
              (s = Object.getPrototypeOf(t)) !== Object.prototype &&
              s !== null &&
              Object.getPrototypeOf(s) !== null &&
              Object.getOwnPropertyNames(s).sort().join("\0") !== It
            ) {
              throw new N9("Cannot stringify arbitrary non-POJOs", a);
            }
            if (
              Object.getOwnPropertySymbols(t).filter(
                (e) => Object.getOwnPropertyDescriptor(t, e).enumerable
              ).length > 0
            ) {
              throw new N9("Cannot stringify POJOs with symbolic keys", a);
            }
            if (Object.getPrototypeOf(t) === null) {
              l = '["null"';

              for (let n in t) {
                a.push(Ii(n));
                l += `,${In(n)},${e(t[n])}`;
                a.pop();
              }

              l += "]";
            } else {
              l = "{";
              let n = false;
              for (let r in t) {
                if (n) {
                  l += ",";
                }

                n = true;
                a.push(Ii(r));
                l += `${In(r)}:${e(t[r])}`;
                a.pop();
              }
              l += "}";
            }
          }
        }
      }
      n[s] = l;
      return s;
    })(e);

    return s < 0 ? `${s}` : `[${n.join(",")}]`;
  })(e, {
    F: (e) => {
      if (typeof e == "function") {
        if (!Is.has(e)) {
          let t = Is.size.toString();
          Is.set(e, t);
          Il.set(t, e);

          if (Is.size > 50000 /* 5e4 */) {
            console.warn(
              "Function reference store is getting large, it is not recommended to send anonymous and inline functions through the channel as they cannot be cached."
            );
          }
        }
        return Is.get(e);
      }
    },
    P: (e) => {
      if (e && typeof e == "object" && typeof e.then == "function") {
        if (!t.has(e)) {
          t.set(e, t.size.toString());
        }

        return t.get(e);
      }
    },
  });
}
function Id(e, t, n) {
  let r;

  r = {
    F: (e) =>
      n ? async (...t) => n({ $$type: `bidc-fn:${e}`, args: t }) : null,
    P: (e) => {
      let n;
      let r;
      if (t.has(e)) {
        return t.get(e).promise;
      }
      let i = new Promise((e, t) => {
        n = e;
        r = t;
      });
      t.set(e, { resolve: n, reject: r, promise: i });
      return i;
    },
  };

  return ((e, t) => {
    if (typeof e == "number") {
      return r(e, true);
    }
    if (!Array.isArray(e) || e.length === 0) {
      throw Error("Invalid input");
    }
    let n = Array(e.length);
    function r(i, a = false) {
      if (-1 === i) {
        return;
      }
      if (-3 === i) {
        return NaN;
      }
      if (-4 === i) {
        return Infinity;
      }
      if (-5 === i) {
        return -Infinity;
      }
      if (-6 === i) {
        return -0;
      }
      if (a || typeof i != "number") {
        throw Error("Invalid input");
      }
      if (i in n) {
        return n[i];
      }
      let e_i = e[i];
      if (e_i && typeof e_i == "object") {
        if (Array.isArray(e_i)) {
          if (typeof e_i[0] == "string") {
            let [e] = e_i;
            let a = t?.[e];
            if (a) {
              return (n[i] = a(r(e_i[1])));
            }
            switch (e) {
              case "Date": {
                n[i] = new Date(e_i[1]);
                break;
              }
              case "Set": {
                let s = new Set();
                n[i] = s;
                for (let e = 1; e < e_i.length; e += 1) {
                  s.add(r(e_i[e]));
                }
                break;
              }
              case "Map": {
                let l = new Map();
                n[i] = l;
                for (let e = 1; e < e_i.length; e += 2) {
                  l.set(r(e_i[e]), r(e_i[e + 1]));
                }
                break;
              }
              case "RegExp": {
                n[i] = new RegExp(e_i[1], e_i[2]);
                break;
              }
              case "Object": {
                n[i] = Object(e_i[1]);
                break;
              }
              case "BigInt": {
                n[i] = BigInt(e_i[1]);
                break;
              }
              case "null": {
                let c = Object.create(null);
                n[i] = c;
                for (let e = 1; e < e_i.length; e += 2) {
                  c[e_i[e]] = r(e_i[e + 1]);
                }
                break;
              }
              case "Int8Array":
              case "Uint8Array":
              case "Uint8ClampedArray":
              case "Int16Array":
              case "Uint16Array":
              case "Int32Array":
              case "Uint32Array":
              case "Float32Array":
              case "Float64Array":
              case "BigInt64Array":
              case "BigUint64Array": {
                let t = new globalThis[e](r(e_i[1]));
                n[i] = e_i[2] !== undefined ? t.subarray(e_i[2], e_i[3]) : t;
                break;
              }
              case "ArrayBuffer": {
                let e = ((e) => {
                  let t = ((e) => {
                    if (e.length % 4 == 0) {
                      e = e.replace(/==?$/, "");
                    }

                    let t = "";
                    let n = 0;
                    let r = 0;
                    for (let i = 0; i < e.length; i++) {
                      n <<= 6;
                      n |= Ia.indexOf(e[i]);

                      if (24 === (r += 6)) {
                        t += String.fromCharCode(
                          (16711680 /* 0xff0000 */ & n) >> 16
                        );
                        t += String.fromCharCode((65280 & n) >> 8);
                        t += String.fromCharCode(255 & n);
                        n = r = 0;
                      }
                    }

                    if (r === 12) {
                      n >>= 4;
                      t += String.fromCharCode(n);
                    } else if (r === 18) {
                      n >>= 2;
                      t += String.fromCharCode((65280 & n) >> 8);
                      t += String.fromCharCode(255 & n);
                    }

                    return t;
                  })(e);

                  let n = new ArrayBuffer(t.length);
                  let r = new DataView(n);
                  for (let e = 0; e < n.byteLength; e++) {
                    r.setUint8(e, t.charCodeAt(e));
                  }
                  return n;
                })(e_i[1]);
                n[i] = e;
                break;
              }
              case "Temporal.Duration":
              case "Temporal.Instant":
              case "Temporal.PlainDate":
              case "Temporal.PlainTime":
              case "Temporal.PlainDateTime":
              case "Temporal.PlainMonthDay":
              case "Temporal.PlainYearMonth":
              case "Temporal.ZonedDateTime": {
                let t = e.slice(9);
                n[i] = Temporal[t].from(e_i[1]);
                break;
              }
              case "URL": {
                let e = new URL(e_i[1]);
                n[i] = e;
                break;
              }
              case "URLSearchParams": {
                let e = new URLSearchParams(e_i[1]);
                n[i] = e;
                break;
              }
              default: {
                throw Error(`Unknown type ${e}`);
              }
            }
          } else {
            let e = Array(e_i.length);
            n[i] = e;
            for (let t = 0; t < e_i.length; t += 1) {
              let e_i_t = e_i[t];

              if (-2 !== e_i_t) {
                e[t] = r(e_i_t);
              }
            }
          }
        } else {
          let e = {};
          n[i] = e;

          for (let t in e_i) {
            if (t === "__proto__") {
              throw Error("Cannot parse an object with a `__proto__` property");
            }
            let e_i_t = e_i[t];
            e[t] = r(e_i_t);
          }
        }
      } else {
        n[i] = e_i;
      }
      return n[i];
    }
    return r(0);
  })(JSON.parse(e), r);
}
async function* Iu(e) {
  let t = new Map();
  let n = new Map();
  let r = new Set();
  let i = Ic(e, n);

  yield `r:${i}
`;

  for (let [e, r] of n.entries()) {
    t.set(r, e);
  }

  while (t.size > 0) {
    let e = Array.from(t.entries()).map(async ([e, t]) => {
      try {
        let n = await t;
        return { promiseId: e, status: "fulfilled", value: n };
      } catch (t) {
        return { promiseId: e, status: "rejected", reason: t };
      }
    });

    let i = await Promise.race(e);
    t.delete(i.promiseId);
    r.add(i.promiseId);

    if (i.status === "fulfilled") {
      let e = Ic(i.value, n);

      yield `p${i.promiseId}:${e}
`;

      for (let [a, o] of n.entries()) {
        if (!t.has(o) && !r.has(o)) {
          t.set(o, a);
        }
      }
    } else {
      let e = i.reason instanceof Error ? i.reason.message : String(i.reason);
      yield `e${i.promiseId}:${Ic(e, n)}
`;
    }
  }
}
async function Ip(e, t) {
  let n;
  let r = new Map();
  let i = e[Symbol.asyncIterator]();
  let a = await i.next();
  if (a.done) {
    throw Error("Stream ended without any chunks");
  }
  let a_value = a.value;
  if (!a_value.startsWith("r")) {
    throw Error("First chunk must start with 'r' (return data)");
  }
  let s = a_value.indexOf(":");
  if (-1 === s) {
    throw Error("Invalid first chunk format - missing colon");
  }
  n = Id(a_value.slice(s + 1), r, t?.send);

  (async () => {
    try {
      let e = await i.next();

      while (!e.done) {
        let e_value = e.value;
        if (e_value.startsWith("p")) {
          let e = e_value.indexOf(":");
          let i = e_value.slice(1, e);
          let a = Id(e_value.slice(e + 1), r, t?.send);
          let o = r.get(i);

          if (o) {
            o.resolve(a);
          }
        } else if (e_value.startsWith("e")) {
          let e = e_value.indexOf(":");
          let i = e_value.slice(1, e);
          let a = Id(e_value.slice(e + 1), r, t?.send);
          let o = r.get(i);

          if (o) {
            o.reject(Error(a));
          }
        }
        e = await i.next();
      }
    } catch (e) {
      for (let t of r.values()) {
        t.reject(e);
      }
    }
  })();

  return n;
}
let I_ = new WeakMap();
function If(e, t) {
  let n;

  if (t === undefined && typeof e == "string") {
    t = e;
    n = undefined;
  } else if (typeof e == "object") {
    n = e;
  }

  t = `bidc_${t ?? "default"}`;
  let r = n || self;
  let i = [];
  function a() {
    if (!I_.has(r)) {
      I_.set(
        r,
        (() => {
          let e = false;
          let a = null;

          let o = new Promise((e) => {
            a = e;
          });

          let s = new MessageChannel();

          let l = {
            type: "bidc-connect",
            channelId: t,
            timestamp: Date.now(),
          };

          let c = { type: "bidc-confirm", channelId: t };
          function d(n) {
            let o = n.ports[0];
            if (!o) {
              return;
            }
            let n_data = n.data;

            if (n_data?.channelId === t) {
              if (n_data.type === l.type && l.timestamp <= n_data.timestamp) {
                o.postMessage(c);

                e
                  ? (I_.set(r, Promise.resolve(o)), i.forEach((e) => e(o)))
                  : (a(o), (e = true));
              }
            }
          }

          if (n && typeof Worker != "undefined" && n instanceof Worker) {
            n.addEventListener("message", d);
          } else if (typeof window != "undefined") {
            window.addEventListener("message", d);
          } else if (typeof self != "undefined") {
            self.addEventListener("message", d);
          }

          s.port1.addEventListener("message", function n(r) {
            if (r.data?.type === c.type && r.data.channelId === t) {
              a(s.port1);
              e = true;
              s.port1.removeEventListener("message", n);
            }
          });

          s.port1.start();
          const s_port2 = s.port2;
          if (n) {
            if ("self" in n && n.self === n) {
              n.postMessage(l, "*", [s_port2]);
            } else {
              n.postMessage(l, [s_port2]);
            }
          } else if (
            typeof window == "undefined" &&
            typeof self != "undefined"
          ) {
            self.postMessage(l, [s_port2]);
          } else if (
            typeof window != "undefined" &&
            window.parent &&
            window.parent !== window
          ) {
            window.parent.postMessage(l, "*", [s_port2]);
          } else {
            throw Error("No target provided and no global context available");
          }
          return o;
        })()
      );
    }

    return I_.get(r);
  }
  let o = new Map();

  let s = async (e) => {
    let t;
    let n = await a();

    let r =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

    for await (let t of Iu(e)) {
      let e = `${r}@${t}`;
      n.postMessage(e);
    }
    let i = new Promise((e) => {
      t = e;
    });
    o.set(r, [t, i]);
    return i;
  };

  let l = new Map();
  let c = false;
  let d = [];
  let u = null;

  let p = async (e) => {
    await a();

    if (!c) {
      u = e;
    }
  };

  a().then((e) => {
    if (c) {
      return;
    }
    let t = async (e) => {
      let e_data = e.data;
      if (typeof e_data != "string") {
        return;
      }
      let r = e_data.indexOf("@");
      if (-1 === r) {
        return void console.error(
          "Invalid chunk format - missing @ delimiter:",
          e_data
        );
      }
      let i = e_data.slice(0, r);
      let a = e_data.slice(r + 1);
      if (a.startsWith("r:")) {
        l?.set(i, { pendingChunks: [], chunkResolver: null });

        (async () => {
          try {
            let e = await Ip(
              (async function* () {
                for (yield a; ; ) {
                  let e = await n(i);
                  if (e === null) {
                    break;
                  }
                  yield e;
                }
                l?.delete(i);
              })(),
              { send: s }
            );
            if (
              typeof e == "object" &&
              e !== null &&
              typeof e.$$type == "string" &&
              e.$$type.startsWith("bidc-fn:")
            ) {
              let t = e.$$type.slice(8);
              let n = Il.get(t);
              if (n) {
                let t = n(...e.args);
                s({ $$type: `bidc-res:${i}`, response: t });
              } else {
                console.error(`Function reference not found for ID: ${t}`);
              }
            } else if (
              typeof e == "object" &&
              e !== null &&
              typeof e.$$type == "string" &&
              e.$$type.startsWith("bidc-res:")
            ) {
              let t = e.$$type.slice(9);
              let e_response = e.response;
              let r = o.get(t);

              if (r) {
                r[0](e_response);
                o.delete(t);
              }
            } else {
              if (!u) {
                throw Error(
                  "Global receive callback is not set. This is a bug in BIDC."
                );
              }
              try {
                let t = u(e);
                s({ $$type: `bidc-res:${i}`, response: t });
              } catch (e) {
                console.error(e);
              }
            }
          } catch (e) {
            console.error(`Error decoding stream for ID ${i}:`, e);
            l?.delete(i);
          }
        })();
      } else {
        let e = l?.get(i);

        if (e) {
          e.pendingChunks.push(a);
          e.chunkResolver?.();
        } else {
          console.warn(`No active decoding found for ID: ${i}`);
        }
      }
    };
    async function n(e) {
      let t = l?.get(e);
      return t
        ? t.pendingChunks.length > 0
          ? t.pendingChunks.shift()
          : (await new Promise((e) => {
              t.chunkResolver = e;
            }),
            t.pendingChunks.length === 0)
          ? null
          : t.pendingChunks.shift()
        : null;
    }
    e.addEventListener("message", t);

    d.push(() => {
      e.removeEventListener("message", t);
    });

    e.start();

    i.push((n) => {
      if (!c) {
        e.removeEventListener("message", t);
        (e = n).addEventListener("message", t);
        e.start();
      }
    });
  });

  return {
    send: s,
    receive: p,
    cleanup: () => {
      c = true;

      d.forEach((e) => e());

      d.length = 0;
    },
  };
}
let Im = null;
function Ih() {
  if (!Im) {
    let e;
    let t;
    e = null;
    t = {};

    (Im = {
      registerTarget(n) {
        if (e) {
          e.cleanup();
        }

        if (n || (window.parent && window.parent !== window)) {
          (e = n ? If(n) : If()).receive(async (e) => {
            let n;
            if (!e || typeof e != "object" || !("method" in e)) {
              return void console.warn("Received invalid message:", e);
            }
            let { method } = e;
            let t_r = t[method];
            if (!t_r) {
              return;
            }
            let a = await t_r(...e.args);

            if (a !== undefined) {
              n = a;
            }

            return n;
          });
        }
      },
      sendToTarget(t) {
        return e
          ? e.send(t)
          : void console.warn("No iframe registered for communication.");
      },
      registerMessage(e, n) {
        t[e] = n;
      },
      hasChannel() {
        return !!e;
      },
    }).registerTarget();
  }
  return Im;
}
let Ig = null;
const Iy = require(31269 /* wakaru:missing */);
class Ib {
  constructor(e) {
    this.bits = e instanceof Ib ? e.bits.slice() : [];
  }
  add(e) {
    this.bits[e >> 5] |= 1 << (31 & e);
  }
  has(e) {
    return !!(this.bits[e >> 5] & (1 << (31 & e)));
  }
}
class Ix {
  constructor(e, t, n) {
    this.start = e;
    this.end = t;
    this.original = n;
    this.intro = "";
    this.outro = "";
    this.content = n;
    this.storeName = false;
    this.edited = false;
    this.previous = null;
    this.next = null;
  }
  appendLeft(e) {
    this.outro += e;
  }
  appendRight(e) {
    this.intro = this.intro + e;
  }
  clone() {
    let e = new Ix(this.start, this.end, this.original);
    e.intro = this.intro;
    e.outro = this.outro;
    e.content = this.content;
    e.storeName = this.storeName;
    e.edited = this.edited;
    return e;
  }
  contains(e) {
    return this.start < e && e < this.end;
  }
  eachNext(e) {
    let t = this;

    while (t) {
      e(t);
      t = t.next;
    }
  }
  eachPrevious(e) {
    let t = this;

    while (t) {
      e(t);
      t = t.previous;
    }
  }
  edit(e, t, n) {
    this.content = e;

    if (!n) {
      this.intro = "";
      this.outro = "";
    }

    this.storeName = t;
    this.edited = true;
    return this;
  }
  prependLeft(e) {
    this.outro = e + this.outro;
  }
  prependRight(e) {
    this.intro = e + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";

    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(e) {
    let t = e - this.start;
    let n = this.original.slice(0, t);
    let r = this.original.slice(t);
    this.original = n;
    let i = new Ix(e, this.end, r);
    i.outro = this.outro;
    this.outro = "";
    this.end = e;

    if (this.edited) {
      i.edit("", false);
      this.content = "";
    } else {
      this.content = n;
    }

    i.next = this.next;

    if (i.next) {
      i.next.previous = i;
    }

    i.previous = this;
    this.next = i;
    return i;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(e) {
    this.outro = this.outro.replace(e, "");

    if (this.outro.length) {
      return true;
    }

    let t = this.content.replace(e, "");
    return t.length
      ? (t !== this.content &&
          (this.split(this.start + t.length).edit("", undefined, true),
          this.edited && this.edit(t, this.storeName, true)),
        true)
      : (this.edit("", undefined, true),
        (this.intro = this.intro.replace(e, "")),
        !!this.intro.length || undefined);
  }
  trimStart(e) {
    this.intro = this.intro.replace(e, "");

    if (this.intro.length) {
      return true;
    }

    let t = this.content.replace(e, "");
    if (t.length) {
      if (t !== this.content) {
        let e = this.split(this.end - t.length);

        if (this.edited) {
          e.edit(t, this.storeName, true);
        }

        this.edit("", undefined, true);
      }
      return true;
    }
    this.edit("", undefined, true);
    this.outro = this.outro.replace(e, "");

    if (this.outro.length) {
      return true;
    }
  }
}
let IS =
  typeof globalThis != "undefined" && typeof globalThis.btoa == "function"
    ? (e) => globalThis.btoa(unescape(encodeURIComponent(e)))
    : typeof Iy.Buffer == "function"
    ? (e) => Iy.Buffer.from(e, "utf-8").toString("base64")
    : () => {
        throw Error(
          "Unsupported environment: `window.btoa` or `Buffer` should be supported."
        );
      };
class Ik {
  constructor(e) {
    this.version = 3;
    this.file = e.file;
    this.sources = e.sources;
    this.sourcesContent = e.sourcesContent;
    this.names = e.names;
    this.mappings = encode(e.mappings);

    if (e.x_google_ignoreList !== undefined) {
      this.x_google_ignoreList = e.x_google_ignoreList;
    }

    if (e.debugId !== undefined) {
      this.debugId = e.debugId;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return `data:application/json;charset=utf-8;base64,${IS(this.toString())}`;
  }
}
let IT = Object.prototype.toString;
function IE(e) {
  let t = e.split("\n");
  let n = [];
  for (let e = 0, r = 0; e < t.length; e++) {
    n.push(r);
    r += t[e].length + 1;
  }
  return (e) => {
    let t = 0;
    let n_length = n.length;

    while (t < n_length) {
      let i = (t + n_length) >> 1;

      if (e < n[i]) {
        n_length = i;
      } else {
        t = i + 1;
      }
    }

    let i = t - 1;
    let a = e - n[i];
    return { line: i, column: a };
  };
}
let IC = /\w/;
class IA {
  constructor(e) {
    this.hires = e;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(e, t, n, r) {
    if (t.length) {
      let i = t.length - 1;
      let a = t.indexOf("\n", 0);
      let o = -1;

      while (a >= 0 && i > a) {
        let i = [this.generatedCodeColumn, e, n.line, n.column];

        if (r >= 0) {
          i.push(r);
        }

        this.rawSegments.push(i);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        o = a;
        a = t.indexOf("\n", a + 1);
      }

      let s = [this.generatedCodeColumn, e, n.line, n.column];

      if (r >= 0) {
        s.push(r);
      }

      this.rawSegments.push(s);
      this.advance(t.slice(o + 1));
    } else {
      if (this.pending) {
        this.rawSegments.push(this.pending);
        this.advance(t);
      }
    }
    this.pending = null;
  }
  addUneditedChunk(e, t, n, r, i) {
    let t_start = t.start;
    let o = true;
    let s = false;

    while (t_start < t.end) {
      if (n[t_start] === "\n") {
        r.line += 1;
        r.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        o = true;
      } else {
        if (this.hires || o || i.has(t_start)) {
          let t = [this.generatedCodeColumn, e, r.line, r.column];

          if (this.hires === "boundary") {
            if (IC.test(n[t_start])) {
              if (!s) {
                this.rawSegments.push(t);
                s = true;
              }
            } else {
              this.rawSegments.push(t);
              s = false;
            }
          } else {
            this.rawSegments.push(t);
          }
        }
        r.column += 1;
        this.generatedCodeColumn += 1;
        o = false;
      }
      t_start += 1;
    }

    this.pending = null;
  }
  advance(e) {
    if (!e) {
      return;
    }
    let t = e.split("\n");
    if (t.length > 1) {
      for (let e = 0; e < t.length - 1; e++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += t[t.length - 1].length;
  }
}
let Iw = { insertLeft: false, insertRight: false, storeName: false };
class ID {
  constructor(e, t = {}) {
    const n = new Ix(0, e.length, e);

    Object.defineProperties(this, {
      original: { writable: true, value: e },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: n },
      lastChunk: { writable: true, value: n },
      lastSearchedChunk: { writable: true, value: n },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: t.filename },
      indentExclusionRanges: {
        writable: true,
        value: t.indentExclusionRanges,
      },
      sourcemapLocations: { writable: true, value: new Ib() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: undefined },
      ignoreList: { writable: true, value: t.ignoreList },
    });

    this.byStart[0] = n;
    this.byEnd[e.length] = n;
  }
  addSourcemapLocation(e) {
    this.sourcemapLocations.add(e);
  }
  append(e) {
    if (typeof e != "string") {
      throw TypeError("outro content must be a string");
    }
    this.outro += e;
    return this;
  }
  appendLeft(e, t) {
    if (typeof t != "string") {
      throw TypeError("inserted content must be a string");
    }
    this._split(e);
    let n = this.byEnd[e];

    if (n) {
      n.appendLeft(t);
    } else {
      this.intro += t;
    }

    return this;
  }
  appendRight(e, t) {
    if (typeof t != "string") {
      throw TypeError("inserted content must be a string");
    }
    this._split(e);
    let n = this.byStart[e];

    if (n) {
      n.appendRight(t);
    } else {
      this.outro += t;
    }

    return this;
  }
  clone() {
    let e = new ID(this.original, { filename: this.filename });
    let t = this.firstChunk;
    let n = (e.firstChunk = e.lastSearchedChunk = t.clone());

    while (t) {
      e.byStart[n.start] = n;
      e.byEnd[n.end] = n;
      let t_next = t.next;
      let i = t_next && t_next.clone();

      if (i) {
        n.next = i;
        i.previous = n;
        n = i;
      }

      t = t_next;
    }

    e.lastChunk = n;

    if (this.indentExclusionRanges) {
      e.indentExclusionRanges = this.indentExclusionRanges.slice();
    }

    e.sourcemapLocations = new Ib(this.sourcemapLocations);
    e.intro = this.intro;
    e.outro = this.outro;
    return e;
  }
  generateDecodedMap(e) {
    e = e || {};
    let t = Object.keys(this.storedNames);
    let n = new IA(e.hires);
    let r = IE(this.original);

    if (this.intro) {
      n.advance(this.intro);
    }

    this.firstChunk.eachNext((e) => {
      let i = r(e.start);

      if (e.intro.length) {
        n.advance(e.intro);
      }

      if (e.edited) {
        n.addEdit(0, e.content, i, e.storeName ? t.indexOf(e.original) : -1);
      } else {
        n.addUneditedChunk(0, e, this.original, i, this.sourcemapLocations);
      }

      if (e.outro.length) {
        n.advance(e.outro);
      }
    });

    return {
      file: e.file ? e.file.split(/[/\\]/).pop() : undefined,
      sources: [
        e.source
          ? ((e, t) => {
              let n = e.split(/[/\\]/);
              let r = t.split(/[/\\]/);
              for (n.pop(); n[0] === r[0]; ) {
                n.shift();
                r.shift();
              }
              if (n.length) {
                let n_length = n.length;

                while (n_length--) {
                  n[n_length] = "..";
                }
              }
              return n.concat(r).join("/");
            })(e.file || "", e.source)
          : e.file || "",
      ],
      sourcesContent: e.includeContent ? [this.original] : undefined,
      names: t,
      mappings: n.raw,
      x_google_ignoreList: this.ignoreList ? [0] : undefined,
    };
  }
  generateMap(e) {
    return new Ik(this.generateDecodedMap(e));
  }
  _ensureindentStr() {
    let e;
    let t;
    let n;

    if (this.indentStr === undefined) {
      this.indentStr =
        ((t = (e = this.original.split("\n")).filter((e) => /^\t+/.test(e))),
        (n = e.filter((e) => /^ {2,}/.test(e))),
        t.length === 0 && n.length === 0
          ? null
          : t.length >= n.length
          ? "	"
          : Array(
              n.reduce(
                (e, t) => Math.min(/^ +/.exec(t)[0].length, e),
                Infinity
              ) + 1
            ).join(" "));
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(e, t) {
    let n;
    let r = /^[^\r\n]/gm;
    n = e;

    if (IT.call(n) === "[object Object]") {
      t = e;
      e = undefined;
    }

    if (e === undefined) {
      this._ensureindentStr();
      e = this.indentStr || "	";
    }

    if (e === "") {
      return this;
    }

    let i = {};

    if ((t = t || {}).exclude) {
      (typeof t.exclude[0] == "number" ? [t.exclude] : t.exclude).forEach(
        (e) => {
          for (let t = e[0]; t < e[1]; t += 1) {
            i[t] = true;
          }
        }
      );
    }

    let a = t.indentStart !== false;

    let o = (t) => (a ? `${e}${t}` : ((a = true), t));

    this.intro = this.intro.replace(r, o);
    let s = 0;
    let l = this.firstChunk;

    while (l) {
      let l_end = l.end;
      if (l.edited) {
        if (!i[s]) {
          l.content = l.content.replace(r, o);
          l.content.length && (a = l.content[l.content.length - 1] === "\n");
        }
      } else {
        for (s = l.start; s < l_end; ) {
          if (!i[s]) {
            let t = this.original[s];

            if (t === "\n") {
              a = true;
            } else if (t !== "\r" && a) {
              a = false;

              s === l.start
                ? l.prependRight(e)
                : (this._splitChunk(l, s), (l = l.next).prependRight(e));
            }
          }
          s += 1;
        }
      }
      s = l.end;
      l = l.next;
    }

    this.outro = this.outro.replace(r, o);
    return this;
  }
  insert() {
    throw Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(e, t) {
    if (!Iw.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );

      Iw.insertLeft = true;
    }

    return this.appendLeft(e, t);
  }
  insertRight(e, t) {
    if (!Iw.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );

      Iw.insertRight = true;
    }

    return this.prependRight(e, t);
  }
  move(e, t, n) {
    if (n >= e && n <= t) {
      throw Error("Cannot move a selection inside itself");
    }
    this._split(e);
    this._split(t);
    this._split(n);
    let r = this.byStart[e];
    let i = this.byEnd[t];
    let r_previous = r.previous;
    let i_next = i.next;
    let s = this.byStart[n];
    if (!s && i === this.lastChunk) {
      return this;
    }
    let l = s ? s.previous : this.lastChunk;

    if (r_previous) {
      r_previous.next = i_next;
    }

    if (i_next) {
      i_next.previous = r_previous;
    }

    if (l) {
      l.next = r;
    }

    if (s) {
      s.previous = i;
    }

    if (!r.previous) {
      this.firstChunk = i.next;
    }

    if (!i.next) {
      this.lastChunk = r.previous;
      this.lastChunk.next = null;
    }

    r.previous = l;
    i.next = s || null;

    if (!l) {
      this.firstChunk = r;
    }

    if (!s) {
      this.lastChunk = i;
    }

    return this;
  }
  overwrite(e, t, n, r) {
    r = r || {};
    return this.update(e, t, n, { ...r, overwrite: !r.contentOnly });
  }
  update(e, t, n, r) {
    if (typeof n != "string") {
      throw TypeError("replacement content must be a string");
    }
    if (this.original.length !== 0) {
      while (e < 0) {
        e += this.original.length;
      }

      while (t < 0) {
        t += this.original.length;
      }
    }
    if (t > this.original.length) {
      throw Error("end is out of bounds");
    }
    if (e === t) {
      throw Error(
        "Cannot overwrite a zero-length range – use appendLeft or prependRight instead"
      );
    }
    this._split(e);
    this._split(t);

    if (r === true) {
      Iw.storeName ||
        (console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        ),
        (Iw.storeName = true));

      r = { storeName: true };
    }

    let i = r !== undefined && r.storeName;
    let a = r !== undefined && r.overwrite;
    if (i) {
      let n = this.original.slice(e, t);
      Object.defineProperty(this.storedNames, n, {
        writable: true,
        value: true,
        enumerable: true,
      });
    }
    let o = this.byStart[e];
    let s = this.byEnd[t];
    if (o) {
      let e = o;

      while (e !== s) {
        if (e.next !== this.byStart[e.end]) {
          throw Error("Cannot overwrite across a split point");
        }
        (e = e.next).edit("", false);
      }

      o.edit(n, i, !a);
    } else {
      let r = new Ix(e, t, "").edit(n, i);
      s.next = r;
      r.previous = s;
    }
    return this;
  }
  prepend(e) {
    if (typeof e != "string") {
      throw TypeError("outro content must be a string");
    }
    this.intro = e + this.intro;
    return this;
  }
  prependLeft(e, t) {
    if (typeof t != "string") {
      throw TypeError("inserted content must be a string");
    }
    this._split(e);
    let n = this.byEnd[e];

    if (n) {
      n.prependLeft(t);
    } else {
      this.intro = t + this.intro;
    }

    return this;
  }
  prependRight(e, t) {
    if (typeof t != "string") {
      throw TypeError("inserted content must be a string");
    }
    this._split(e);
    let n = this.byStart[e];

    if (n) {
      n.prependRight(t);
    } else {
      this.outro = t + this.outro;
    }

    return this;
  }
  remove(e, t) {
    if (this.original.length !== 0) {
      while (e < 0) {
        e += this.original.length;
      }

      while (t < 0) {
        t += this.original.length;
      }
    }
    if (e === t) {
      return this;
    }
    if (e < 0 || t > this.original.length) {
      throw Error("Character is out of bounds");
    }
    if (e > t) {
      throw Error("end must be greater than start");
    }
    this._split(e);
    this._split(t);
    let n = this.byStart[e];

    while (n) {
      n.intro = "";
      n.outro = "";
      n.edit("");
      n = t > n.end ? this.byStart[n.end] : null;
    }

    return this;
  }
  reset(e, t) {
    if (this.original.length !== 0) {
      while (e < 0) {
        e += this.original.length;
      }

      while (t < 0) {
        t += this.original.length;
      }
    }
    if (e === t) {
      return this;
    }
    if (e < 0 || t > this.original.length) {
      throw Error("Character is out of bounds");
    }
    if (e > t) {
      throw Error("end must be greater than start");
    }
    this._split(e);
    this._split(t);
    let n = this.byStart[e];

    while (n) {
      n.reset();
      n = t > n.end ? this.byStart[n.end] : null;
    }

    return this;
  }
  lastChar() {
    if (this.outro.length) {
      return this.outro[this.outro.length - 1];
    }
    let e = this.lastChunk;
    do {
      if (e.outro.length) {
        return e.outro[e.outro.length - 1];
      }
      if (e.content.length) {
        return e.content[e.content.length - 1];
      }
      if (e.intro.length) {
        return e.intro[e.intro.length - 1];
      }
    } while ((e = e.previous));
    return this.intro.length ? this.intro[this.intro.length - 1] : "";
  }
  lastLine() {
    let e = this.outro.lastIndexOf("\n");
    if (-1 !== e) {
      return this.outro.substr(e + 1);
    }
    let t = this.outro;
    let n = this.lastChunk;
    do {
      if (n.outro.length > 0) {
        if (-1 !== (e = n.outro.lastIndexOf("\n"))) {
          return n.outro.substr(e + 1) + t;
        }
        t = n.outro + t;
      }
      if (n.content.length > 0) {
        if (-1 !== (e = n.content.lastIndexOf("\n"))) {
          return n.content.substr(e + 1) + t;
        }
        t = n.content + t;
      }
      if (n.intro.length > 0) {
        if (-1 !== (e = n.intro.lastIndexOf("\n"))) {
          return n.intro.substr(e + 1) + t;
        }
        t = n.intro + t;
      }
    } while ((n = n.previous));
    return -1 !== (e = this.intro.lastIndexOf("\n"))
      ? this.intro.substr(e + 1) + t
      : this.intro + t;
  }
  slice(e = 0, t = this.original.length) {
    if (this.original.length !== 0) {
      while (e < 0) {
        e += this.original.length;
      }

      while (t < 0) {
        t += this.original.length;
      }
    }
    let n = "";
    let r = this.firstChunk;

    while (r && (r.start > e || r.end <= e)) {
      if (r.start < t && r.end >= t) {
        return n;
      }
      r = r.next;
    }

    if (r && r.edited && r.start !== e) {
      throw Error(`Cannot use replaced character ${e} as slice start anchor.`);
    }
    let i = r;

    while (r) {
      if (r.intro && (i !== r || r.start === e)) {
        n += r.intro;
      }

      let a = r.start < t && r.end >= t;
      if (a && r.edited && r.end !== t) {
        throw Error(`Cannot use replaced character ${t} as slice end anchor.`);
      }
      let o = i === r ? e - r.start : 0;
      let s = a ? r.content.length + t - r.end : r.content.length;
      n += r.content.slice(o, s);

      if (r.outro && (!a || r.end === t)) {
        n += r.outro;
      }

      if (a) {
        break;
      }

      r = r.next;
    }

    return n;
  }
  snip(e, t) {
    let n = this.clone();
    n.remove(0, e);
    n.remove(t, n.original.length);
    return n;
  }
  _split(e) {
    if (this.byStart[e] || this.byEnd[e]) {
      return;
    }
    let t = this.lastSearchedChunk;
    let n = e > t.end;

    while (t) {
      if (t.contains(e)) {
        return this._splitChunk(t, e);
      }
      t = n ? this.byStart[t.end] : this.byEnd[t.start];
    }
  }
  _splitChunk(e, t) {
    if (e.edited && e.content.length) {
      let n = IE(this.original)(t);
      throw Error(
        `Cannot split a chunk that has already been edited (${n.line}:${n.column} – "${e.original}")`
      );
    }
    let n = e.split(t);
    this.byEnd[t] = e;
    this.byStart[t] = n;
    this.byEnd[n.end] = n;

    if (e === this.lastChunk) {
      this.lastChunk = n;
    }

    this.lastSearchedChunk = e;
    return true;
  }
  toString() {
    let e = this.intro;
    let t = this.firstChunk;

    while (t) {
      e += t.toString();
      t = t.next;
    }

    return e + this.outro;
  }
  isEmpty() {
    let e = this.firstChunk;
    do {
      if (
        (e.intro.length && e.intro.trim()) ||
        (e.content.length && e.content.trim()) ||
        (e.outro.length && e.outro.trim())
      ) {
        return false;
      }
    } while ((e = e.next));
    return true;
  }
  length() {
    let e = this.firstChunk;
    let t = 0;
    do {
      t += e.intro.length + e.content.length + e.outro.length;
    } while ((e = e.next));
    return t;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(e) {
    return this.trimStart(e).trimEnd(e);
  }
  trimEndAborted(e) {
    let t = RegExp(`${e || "\\s"}+$`);
    this.outro = this.outro.replace(t, "");

    if (this.outro.length) {
      return true;
    }

    let n = this.lastChunk;
    do {
      let n_end = n.end;
      let r = n.trimEnd(t);

      if (n.end !== n_end) {
        this.lastChunk === n && (this.lastChunk = n.next);
        this.byEnd[n.end] = n;
        this.byStart[n.next.start] = n.next;
        this.byEnd[n.next.end] = n.next;
      }

      if (r) {
        return true;
      }

      n = n.previous;
    } while (n);
    return false;
  }
  trimEnd(e) {
    this.trimEndAborted(e);
    return this;
  }
  trimStartAborted(e) {
    let t = RegExp(`^${e || "\\s"}+`);
    this.intro = this.intro.replace(t, "");

    if (this.intro.length) {
      return true;
    }

    let n = this.firstChunk;
    do {
      let n_end = n.end;
      let r = n.trimStart(t);

      if (n.end !== n_end) {
        n === this.lastChunk && (this.lastChunk = n.next);
        this.byEnd[n.end] = n;
        this.byStart[n.next.start] = n.next;
        this.byEnd[n.next.end] = n.next;
      }

      if (r) {
        return true;
      }

      n = n.next;
    } while (n);
    return false;
  }
  trimStart(e) {
    this.trimStartAborted(e);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(e, t) {
    function n(e, n) {
      return typeof t == "string"
        ? t.replace(/\$(\$|&|\d+)/g, (t, n) =>
            n === "$"
              ? "$"
              : n === "&"
              ? e[0]
              : Number(n) < e.length
              ? e[Number(n)]
              : `$${n}`
          )
        : t(...e, e.index, n, e.groups);
    }
    if (e.global) {
      ((e, t) => {
        let n;
        let r = [];

        while ((n = e.exec(t))) {
          r.push(n);
        }

        return r;
      })(e, this.original).forEach((e) => {
        if (e.index != null) {
          let t = n(e, this.original);

          if (t !== e[0]) {
            this.overwrite(e.index, e.index + e[0].length, t);
          }
        }
      });
    } else {
      let t = this.original.match(e);
      if (t && t.index != null) {
        let e = n(t, this.original);

        if (e !== t[0]) {
          this.overwrite(t.index, t.index + t[0].length, e);
        }
      }
    }
    return this;
  }
  _replaceString(e, t) {
    let { original } = this;
    let r = original.indexOf(e);

    if (-1 !== r) {
      this.overwrite(r, r + e.length, t);
    }

    return this;
  }
  replace(e, t) {
    return typeof e == "string"
      ? this._replaceString(e, t)
      : this._replaceRegexp(e, t);
  }
  _replaceAllString(e, t) {
    let { original } = this;
    let e_length = e.length;
    for (
      let i = original.indexOf(e);
      -1 !== i;
      i = original.indexOf(e, i + e_length)
    ) {
      if (original.slice(i, i + e_length) !== t) {
        this.overwrite(i, i + e_length, t);
      }
    }
    return this;
  }
  replaceAll(e, t) {
    if (typeof e == "string") {
      return this._replaceAllString(e, t);
    }
    if (!e.global) {
      throw TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(e, t);
  }
}
Object.prototype.hasOwnProperty;
let IN = "@/components/ui/";

let II = {
  button: ["Button"],
  card: [
    "Card",
    "CardTitle",
    "CardHeader",
    "CardDescription",
    "CardContent",
    "CardFooter",
  ],
  sidebar: [
    "Sidebar",
    "SidebarContent",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarGroupContent",
    "SidebarMenu",
    "SidebarMenuItem",
    "SidebarMenuAction",
    "SidebarMenuButton",
    "SidebarMenuSub",
    "SidebarMenuSubItem",
    "SidebarMenuSubButton",
    "SidebarInput",
    "SidebarInset",
    "SidebarRail",
    "SidebarTrigger",
    "SidebarHeader",
    "SidebarFooter",
  ],
  dialog: [
    "DialogContent",
    "DialogHeader",
    "DialogFooter",
    "DialogTitle",
    "DialogDescription",
  ],
  label: ["Label"],
  input: ["Input"],
  toggle: ["Toggle"],
  switch: ["Switch"],
  textarea: ["Textarea"],
  form: ["FormItem", "FormLabel", "FormDescription", "FormMessage"],
  accordion: ["AccordionItem", "AccordionTrigger", "AccordionContent"],
  badge: ["Badge"],
  tabs: ["TabsList", "TabsTrigger", "TabsContent"],
  "dropdown-menu": [
    "DropdownMenuLabel",
    "DropdownMenuShortcut",
    "DropdownMenuSubTrigger",
    "DropdownMenuSubContent",
    "DropdownMenuContent",
    "DropdownMenuItem",
    "DropdownMenuCheckboxItem",
    "DropdownMenuRadioItem",
    "DropdownMenuTrigger",
  ],
  menubar: [
    "Menubar",
    "MenubarTrigger",
    "MenubarSubTrigger",
    "MenubarSubContent",
    "MenubarContent",
    "MenubarItem",
    "MenubarCheckboxItem",
    "MenubarRadioItem",
    "MenubarLabel",
    "MenubarSeparator",
    "MenubarShortcut",
  ],
  collapsible: ["CollapsibleTrigger", "CollapsibleContent"],
  breadcrumb: [
    "Breadcrumb",
    "BreadcrumbList",
    "BreadcrumbItem",
    "BreadcrumbLink",
    "BreadcrumbPage",
    "BreadcrumbSeparator",
    "BreadcrumbEllipsis",
  ],
  select: [
    "Select",
    "SelectTrigger",
    "SelectValue",
    "SelectScrollUpButton",
    "SelectScrollDownButton",
    "SelectContent",
    "SelectLabel",
    "SelectItem",
    "SelectSeparator",
  ],
  avatar: ["Avatar", "AvatarImage", "AvatarFallback"],
};

let IP = /\.(js|ts|jsx|tsx|cjs)$/;
let IM = /require\(|exports/;
let IL = /^[A-Z]$/;
let IR = new Set([1381, 1382, 1179]);

let IF =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

let IO = /\/([^/]+\.[^/]+)$/;
let IB = /(favicon|icon|apple-icon|manifest|robots|sitemap)\.[^/]+?$/;
let IW = /^\/[^/+]\/route\.m?(t|j)sx?$/;
let Ij = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

let Iz = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  svg: "image/svg+xml",
};

async function IV(e, t, n, r) {
  var a;
  let o;
  let s;
  let l;
  let d;
  let u;

  let p =
    r ||
    ((a = ((e, t) => {
      let n = e.find((e) => e[0].toLowerCase() === "tsconfig.json")?.[1].data;

      let r = {};
      if (n && Dv("tsconfig-paths", t)) {
        try {
          r = JSON.parse(n);
        } catch (e) {
          console.warn("Failed to parse tsconfig.json", e);
        }
      }
      let i = new ND.Project({
        compilerOptions: {
          target: ND.ScriptTarget.ESNext,
          jsx: ND.ts.JsxEmit.ReactJSXDev,
          jsxImportSource: "__v0__",
          skipDefaultLibCheck: true,
          skipLibCheck: true,
          lib: ["lib.es5.d.ts"],
          noEmitHelpers: true,
          allowJs: true,
          checkJs: true,
          noResolve: true,
          paths: r.compilerOptions?.paths || { "@/*": ["./*"] },
          types: [],
          isolatedDeclarations: true,
          isolatedModules: true,
        },
        useInMemoryFileSystem: true,
        skipFileDependencyResolution: true,
        skipAddingFilesFromTsConfig: true,
        manipulationSettings: { usePrefixAndSuffixTextForRename: true },
      });

      i.createSourceFile(
        "__v0.d.ts",
        `\
type __V0TaintedString<T> = string & {__v0tag:T}

declare module 'react' {
export function use<T>(p: Promise<T>): T
export function useState<T>(initial: T | (() => T)): [T, (v: T) => void]
export function useRef<T>(initial: T): {current: T}
export function useReducer<S, A>(reducer: (s: S, a: A) => S, initial: S): [S, (a: A) => void]
export function useMemo<T>(fn: () => T, deps: any[]): T
export function useCallback<T>(fn: T, deps: any[]): T
}
`
      );

      return i;
    })(e, n)),
    (o = {}),
    (s = {}),
    (l = []),
    (d = {}),
    (u = {}),
    {
      project: a,
      add: (e, t, n, r) =>
        ((e, t, n, r, i, a) => {
          let o = e.getCompilerOptions().paths;
          if (!o) {
            return;
          }
          let s = NL(NM(r, true, o).slice(1), t);
          s.path = r;
          s.originalPath = n;

          if (a) {
            return;
          }

          let l = e
            .getSourceFiles()
            .map((e) => NM(e.getFilePath(), true, o).slice(1));

          let c = new ID(i.getFullText());

          i.getDescendantsOfKind(
            ND.ts.SyntaxKind.PropertyAccessExpression
          ).forEach((e) => {
            if (e.getText() !== "document.cookie") {
              return;
            }
            let t = e.getStart();
            let n = e.getEnd();
            c.overwrite(t, n, "__v0_cookie_doc.cookie");
          });

          i.getImportDeclarations().forEach((e) => {
            let n = e.getModuleSpecifierValue();

            let i =
              n.startsWith("http://") || n.startsWith("https://")
                ? n
                : NR(l, NO(r, n, o));

            let a = NB(s, i);
            let d = e.getModuleSpecifier();
            c.overwrite(d.getStart(), d.getEnd(), JSON.stringify(i));
            let u = NL(i, t);

            e.getNamedImports().forEach((e) => {
              let t = e.getName();

              if (!a.includes(t)) {
                a.push(e.getName());
              }
            });

            if (e.getNamespaceImport() && !a.includes("*")) {
              a.push("*");
            }

            if (e.getDefaultImport() && !a.includes("default")) {
              a.push("default");
            }

            if (u) {
              a.forEach((e) => {
                if (!u.used.includes(e)) {
                  u.used.push(e);
                }
              });
            }
          });

          i.getDescendantsOfKind(ND.ts.SyntaxKind.CallExpression).forEach(
            (e) => {
              let n = e.getExpression();
              if (!n || !n.isKind(ND.ts.SyntaxKind.ImportKeyword)) {
                return;
              }
              let i = e.getArguments();
              if (i.length !== 1) {
                return;
              }
              let [a] = i;
              if (!a || !a.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                return;
              }
              let d = a.getLiteralText();

              let u =
                d.startsWith("http://") || d.startsWith("https://")
                  ? d
                  : NR(l, NO(r, d, o));

              let p = NB(s, u);
              c.overwrite(a.getStart(), a.getEnd(), JSON.stringify(u));
              let _ = NL(u, t);
              p.push("*");

              if (_) {
                p.forEach((e) => {
                  if (!_.used.includes(e)) {
                    _.used.push(e);
                  }
                });
              }
            }
          );

          let d = [];
          try {
            d = e.getProgram().getSyntacticDiagnostics(i) || [];
          } catch {}
          for (let e of d) {
            if (IR.has(e.getCode())) {
              let t = e.getMessageText();
              let r = typeof t == "string" ? t : t.getMessageText();
              let a = "";
              let o = e.getStart();
              if (typeof o == "number") {
                let t = i.getFullText();
                let { line, column } = i.getLineAndColumnAtPos(o);
                let s = t.split("\n");
                a = `> ${s[line - 1]}
> ${" ".repeat(column - 1)}${"^".repeat(e.getLength() || 1)}`;
              }
              let s = `throw new Error(${JSON.stringify(
                r
              )}, { cause: ${JSON.stringify(a)} })`;

              i.replaceWithText(
                `${s}\n\nexport * from "__v0__/internal";export default from "__v0__/internal"`
              );

              console.error(`[compiler error] Syntax error in ${n}:
${r}
${a}`);

              return;
            }
          }

          if (s) {
            s.meta = ((e, t) => {
              let n = false;
              let r = false;
              let i = t.getFullText();
              let a = i.includes('"use server"') || i.includes("'use server'");
              if (a || i.includes("use client")) {
                if (
                  i.startsWith('"use server"') ||
                  i.startsWith("'use server'")
                ) {
                  n = true;
                } else if (
                  i.startsWith('"use client"') ||
                  i.startsWith("'use client'")
                ) {
                  r = true;
                } else {
                  for (let e of t.getStatements()) {
                    if (e.isKind(ND.ts.SyntaxKind.ExpressionStatement)) {
                      if (/^['"]use server['"]$/.test(e.getText())) {
                        n = true;
                        break;
                      } else if (/^['"]use client['"]$/.test(e.getText())) {
                        r = true;
                        break;
                      }
                    } else {
                      break;
                    }
                  }
                }
                let o = false;
                let s = 0;
                if (a) {
                  for (let n of t.getDescendantsOfKind(
                    ND.ts.SyntaxKind.FunctionDeclaration
                  )) {
                    let t = n.getBody();
                    let r = n.getNameNode();
                    if (t && Nj(t)) {
                      o = true;

                      if (r === undefined) {
                        Nz(e, n);
                      } else {
                        let t = r.getText();
                        let i = `__v0_action_${s++}`;
                        e.overwrite(r.getStart(), r.getEnd(), i);

                        e.appendRight(
                          n.getEnd(),
                          `function ${t}(...args) { return __v0_createServerRef(${i})(...args) }`
                        );
                      }
                    }
                  }
                  for (let n of t.getDescendantsOfKind(
                    ND.ts.SyntaxKind.FunctionExpression
                  )) {
                    let t = n.getBody();

                    if (t && Nj(t)) {
                      o = true;
                      Nz(e, n);
                    }
                  }
                  for (let n of t.getDescendantsOfKind(
                    ND.ts.SyntaxKind.ArrowFunction
                  )) {
                    let t = n.getBody();

                    if (t && Nj(t)) {
                      o = true;
                      Nz(e, n);
                    }
                  }
                }

                if (o) {
                  e.append(`
    import { createServerRef as __v0_createServerRef } from '__v0__/internal'
    `);

                  r &&
                    e.append(`
  throw new Error(${JSON.stringify(NV)})
  `);
                }
              }
              return { topLevelUseServer: n, topLevelUseClient: r };
            })(c, i);

            i.getExportSymbols().forEach((e) => {
              let t = e.getName();

              if (!s.exported.includes(t)) {
                s.exported.push(t);
              }
            });
          }

          ((e, t) => {
            let n = [];
            let r = t.getFilePath();
            let e_original = e.original;
            let a = {};
            let o = {};
            function s(t, s) {
              var l;
              let c;
              let d;
              let u;
              let p = t.isKind(ND.ts.SyntaxKind.JsxSelfClosingElement);

              let _ = p
                ? t.getTagNameNode()
                : t.getOpeningElement().getTagNameNode();

              let f = _.getText();
              if (f.length) {
                let [e] = f;
                if (e && IL.test(e)) {
                  let e = ((e, t) => {
                    if (a[e] !== undefined) {
                      return a[e];
                    }
                    let n = t.getSymbol();
                    if (n) {
                      let t = n.getDeclarations();
                      if (t.length > 0) {
                        let [n] = t;
                        if (n && n.isKind(ND.ts.SyntaxKind.ImportSpecifier)) {
                          a[e] = n;
                          return n;
                        }
                      }
                    }
                    a[e] = null;
                  })(f, _);
                  if (e) {
                    let n = e.getParent().getParent().getParent();
                    if (n.isKind(ND.ts.SyntaxKind.ImportDeclaration)) {
                      let a = n.getModuleSpecifier().getLiteralValue();
                      if (!a) {
                        return;
                      }
                      let s = e.getName();

                      let l =
                        a === "lucide-react" &&
                        ((e, t, n) => {
                          if (o[e] !== undefined) {
                            return o[e];
                          }
                          if (
                            ((e, t) => {
                              let n = 0;
                              let r = e.indexOf(t);

                              while (-1 !== r) {
                                n++;
                                r = e.indexOf(t, r + t.length);
                              }

                              return n;
                            })(e_original, e) === n
                          ) {
                            o[e] = true;
                            return true;
                          }
                          let a = 0;
                          let s = false;
                          if (t.isKind(ND.ts.SyntaxKind.Identifier)) {
                            for (let e of t.findReferences()) {
                              let t = ((e) => {
                                let t =
                                  e.getDefinition().getKind() ===
                                  ND.ts.ScriptElementKind.alias;

                                let n = e.getReferences();
                                for (let e = 0; e < n.length; e++) {
                                  let n_e = n[e];
                                  if (
                                    n_e &&
                                    (t || !n_e.isDefinition() || e > 0)
                                  ) {
                                    return n_e.getNode();
                                  }
                                }
                              })(e);
                              if (t?.getSourceFile().getFilePath() === r) {
                                let e = t.getParent();
                                if (e) {
                                  if (
                                    e.isKind(
                                      ND.ts.SyntaxKind.JsxSelfClosingElement
                                    ) ||
                                    e.isKind(ND.ts.SyntaxKind.JsxOpeningElement)
                                  ) {
                                    if (++a > 1) {
                                      break;
                                    }
                                  } else if (
                                    !e.isKind(ND.ts.SyntaxKind.ImportSpecifier)
                                  ) {
                                    s = true;
                                    break;
                                  }
                                }
                              }
                            }
                          }
                          let l = a === 1 && !s;
                          o[e] = l;
                          return l;
                        })(f, _, p ? 2 : 3);

                      u = {
                        name: s,
                        source: a,
                        singleRef: l,
                        declStart: n.getStart(false),
                        declEnd: n.getEnd(),
                        openAt: _.getStart(false),
                        closeAt: t.isKind(
                          ND.ts.SyntaxKind.JsxSelfClosingElement
                        )
                          ? undefined
                          : t.getClosingElement()?.getStart(false),
                      };
                    }
                  }
                }
              }
              if (f.length) {
                let r = {
                  start: t.getStart(true),
                  end: t.getEnd(),
                  name: f,
                  jsxRoot: s,
                };

                l = u?.source;

                let i =
                  l === "lucide-react"
                    ? []
                    : (l === "@/components/ui/badge" && f === "Badge") ||
                      (l === "@/components/ui/button" && f === "Button") ||
                      (l === "@/components/ui/alert" && f === "Alert")
                    ? ["variant"]
                    : (l === "@/components/ui/toggle" && f === "Toggle") ||
                      (l === "@/components/ui/sidebar" &&
                        f === "SidebarMenuButton")
                    ? ["variant", "size"]
                    : l === "@/components/ui/sidebar" &&
                      f === "SidebarMenuSubButton"
                    ? ["size"]
                    : (l === "@/components/ui/input" && f === "Input") ||
                      (l === undefined && f === "input")
                    ? ["type"]
                    : l === "@/components/ui/select" && f === "SelectContent"
                    ? ["side", "align"]
                    : l === "@/components/ui/avatar" && f === "AvatarImage"
                    ? []
                    : null;

                if (i) {
                  let e = {};

                  let n = t.isKind(ND.ts.SyntaxKind.JsxSelfClosingElement)
                    ? t
                    : t.getOpeningElement();

                  i.forEach((t) => {
                    let r = n.getAttribute(t);
                    if (r && r.isKind(ND.ts.SyntaxKind.JsxAttribute)) {
                      let n = r.getInitializer();

                      if (n) {
                        if (n.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                          e[t] = [n.getText(true), n.getStart(true)];
                        } else {
                          e[t] = ["__v0_dynamic", -1];
                        }
                      }
                    }
                  });

                  r.lib = { ...u, props: e };
                }
                let a = _.getEnd();
                n.push(() => {
                  e.appendRight(a, ` __v0_e={${JSON.stringify(r)}}`);
                });
              }
              let m = p
                ? t.getAttribute("className")
                : t.getOpeningElement().getAttribute("className");
              if (m && m.isKind(ND.ts.SyntaxKind.JsxAttribute)) {
                let t = m.getInitializer();
                let r = [];
                let i = false;
                let a = -1;
                if (t?.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                  a = 0;
                  i = true;

                  r.push([
                    t.getStartLineNumber(true),
                    t.getStart() - t.getStartLinePos(true) + 1,
                    t.getLiteralValue(),
                  ]);
                } else if (t?.isKind(ND.ts.SyntaxKind.JsxExpression)) {
                  a = 1;
                  let e = t.getExpression();
                  if (e) {
                    if (e.isKind(ND.ts.SyntaxKind.CallExpression)) {
                      let t = e.getArguments();

                      if (t.length > 0) {
                        t.forEach((e) => {
                          if (e.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                            i = true;

                            r.push([
                              e.getStartLineNumber(true),
                              e.getStart() - e.getStartLinePos(true) + 1,
                              e.getLiteralValue(),
                            ]);
                          }
                        });
                      }
                    } else if (e.isKind(ND.ts.SyntaxKind.BinaryExpression)) {
                      let t = e;
                      function h(e) {
                        if (
                          e.isKind(ND.ts.SyntaxKind.StringLiteral) ||
                          e.isKind(
                            ND.ts.SyntaxKind.NoSubstitutionTemplateLiteral
                          )
                        ) {
                          i = true;

                          r.push([
                            e.getStartLineNumber(true),
                            e.getStart() - e.getStartLinePos(true) + 1,
                            e.getLiteralValue(),
                          ]);

                          return true;
                        }
                      }
                      function g(e) {
                        while (
                          e.isKind(ND.ts.SyntaxKind.ParenthesizedExpression)
                        ) {
                          e = e.getExpression();
                        }

                        return e;
                      }

                      while (t.getOperatorToken().getText() === "+") {
                        let e = g(t.getLeft());
                        h(g(t.getRight()));

                        if (h(e)) {
                          break;
                        }

                        if (
                          e.isKind(ND.ts.SyntaxKind.BinaryExpression) &&
                          e.getOperatorToken().getText() === "+"
                        ) {
                          t = e;
                        } else {
                          break;
                        }
                      }
                    } else if (e.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                      i = true;

                      r.push([
                        e.getStartLineNumber(true),
                        e.getStart() - e.getStartLinePos(true) + 1,
                        e.getLiteralValue(),
                      ]);
                    } else if (
                      e.isKind(ND.ts.SyntaxKind.NoSubstitutionTemplateLiteral)
                    ) {
                      i = true;

                      r.push([
                        e.getStartLineNumber(true),
                        e.getStart() - e.getStartLinePos(true) + 1,
                        e.getLiteralText(),
                      ]);
                    } else if (e.isKind(ND.ts.SyntaxKind.TemplateExpression)) {
                      let t = e.getHead();
                      let n = t.getLiteralText();

                      if (n.trim() !== "") {
                        i = true;

                        r.push([
                          t.getStartLineNumber(true),
                          t.getStart() - t.getStartLinePos(true) + 1,
                          n,
                        ]);
                      }

                      for (let a of e.getTemplateSpans()) {
                        let e = a.getLiteral();
                        if (
                          e.isKind(ND.ts.SyntaxKind.TemplateMiddle) ||
                          e.isKind(ND.ts.SyntaxKind.TemplateTail)
                        ) {
                          let t = e.getLiteralText();

                          if (t.trim() !== "") {
                            i = true;

                            r.push([
                              e.getStartLineNumber(true),
                              e.getStart() - e.getStartLinePos(true) + 1,
                              t,
                            ]);
                          }
                        }
                      }
                    }
                  }
                }
                if (t && -1 !== a) {
                  let o = m.getEnd();
                  let s = [a, t.getStart(false), t.getEnd()];
                  n.push(() => {
                    e.appendRight(o, ` __v0_r={${JSON.stringify(s)}}`);

                    if (i) {
                      e.appendRight(o, ` __v0_c={${JSON.stringify(r)}}`);
                    }
                  });
                }
              } else if (!m && f.length) {
                let [t] = f;
                if (t && /^[a-z]$/.test(t)) {
                  let t = _.getEnd();

                  let r = [
                    [
                      _.getStartLineNumber(true),
                      _.getEnd() - _.getStartLinePos(true) + 1,
                      "",
                    ],
                  ];

                  n.push(() => {
                    e.appendRight(
                      t,
                      ` __v0_m="1" __v0_c={${JSON.stringify(r)}}`
                    );
                  });
                } else if (
                  u &&
                  ((c = u.name),
                  "lucide-react" === (d = u.source) ||
                    d === "next/image" ||
                    d === "next/link" ||
                    (d.startsWith(IN) &&
                      (II[d.slice(IN.length)] ?? []).includes(c)))
                ) {
                  let t = _.getEnd();

                  let r = [
                    [
                      _.getStartLineNumber(true),
                      _.getEnd() - _.getStartLinePos(true) + 1,
                      "",
                    ],
                  ];

                  n.push(() => {
                    e.appendRight(
                      t,
                      ` __v0_m="1" __v0_c={${JSON.stringify(r)}}`
                    );
                  });
                }
              }
            }
            function l(e) {
              let t = e?.getParent();

              while (t) {
                let e = t.getKind();
                if (
                  e === ND.ts.SyntaxKind.JsxElement ||
                  e === ND.ts.SyntaxKind.JsxSelfClosingElement
                ) {
                  return true;
                }
                if (
                  e === ND.ts.SyntaxKind.Block ||
                  e === ND.ts.SyntaxKind.SourceFile ||
                  e === ND.ts.SyntaxKind.FunctionDeclaration ||
                  e === ND.ts.SyntaxKind.ArrowFunction ||
                  e === ND.ts.SyntaxKind.FunctionExpression
                ) {
                  break;
                }
                t = t.getParent();
              }

              return false;
            }

            t.forEachDescendant((t) => {
              switch (t.getKind()) {
                case ND.ts.SyntaxKind.JsxElement: {
                  s(t, !l(t));

                  ((t) => {
                    let r = t.getChildSyntaxList();
                    if (!r) {
                      return;
                    }
                    let i = r.getChildren();
                    let a = [];

                    i.forEach((e) => {
                      if (
                        e.isKind(ND.ts.SyntaxKind.JsxText) &&
                        e.getText().trim() !== ""
                      ) {
                        a.push(e);
                      } else if (e.isKind(ND.ts.SyntaxKind.JsxExpression)) {
                        let t = e.getExpression();

                        if (t?.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                          a.push(t);
                        } else if (
                          t?.isKind(
                            ND.ts.SyntaxKind.NoSubstitutionTemplateLiteral
                          )
                        ) {
                          a.push(t);
                        }
                      }
                    });

                    if (a.length !== 1) {
                      return;
                    }

                    let [o] = a;
                    if (o) {
                      if (o.isKind(ND.ts.SyntaxKind.JsxText)) {
                        let r = `${o.getStartLineNumber(true)}:${
                          o.getStart() - o.getStartLinePos(true) + 1
                        }`;

                        let i = t.getOpeningElement();
                        let a = o.getText().trim();
                        let s = `0:${r}:${a}`;
                        let l = i.getAttributes();

                        let c =
                          l.length === 0
                            ? i.getTagNameNode().getEnd()
                            : l[l.length - 1]?.getEnd() ||
                              i.getTagNameNode().getEnd();

                        n.push(() => {
                          e.appendRight(c, ` __v0_i={${JSON.stringify(s)}}`);
                        });
                      } else if (o.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                        let r = `${o.getStartLineNumber(true)}:${
                          o.getStart() - o.getStartLinePos(true) + 2
                        }`;

                        let i = t.getOpeningElement();
                        let a = o.getText();
                        let s = `1:${r}:${a}`;
                        let l = i.getAttributes();

                        let c =
                          l.length === 0
                            ? i.getTagNameNode().getEnd()
                            : l[l.length - 1]?.getEnd() ||
                              i.getTagNameNode().getEnd();

                        n.push(() => {
                          e.appendRight(c, ` __v0_i={${JSON.stringify(s)}}`);
                        });
                      } else if (
                        o.isKind(ND.ts.SyntaxKind.NoSubstitutionTemplateLiteral)
                      ) {
                        let r = `${o.getStartLineNumber(true)}:${
                          o.getStart() - o.getStartLinePos(true) + 2
                        }`;

                        let i = t.getOpeningElement();
                        let a = o.getText();
                        let s = `2:${r}:${a}`;
                        let l = i.getAttributes();

                        let c =
                          l.length === 0
                            ? i.getTagNameNode().getEnd()
                            : l[l.length - 1]?.getEnd() ||
                              i.getTagNameNode().getEnd();

                        n.push(() => {
                          e.appendRight(c, ` __v0_i={${JSON.stringify(s)}}`);
                        });
                      }
                    }
                  })(t);

                  break;
                }
                case ND.ts.SyntaxKind.JsxSelfClosingElement: {
                  s(t, !l(t));
                }
              }
            });

            n.forEach((e) => e());
          })(c, i);

          let u = c.toString();
          i.replaceWithText(u);

          if (IP.test(n) && IM.test(u)) {
            i.getDescendantsOfKind(
              ND.ts.SyntaxKind.ExpressionStatement
            ).forEach((e) => {
              let t = e.getExpression();

              if (
                t.isKind(ND.ts.SyntaxKind.BinaryExpression) &&
                t.getLeft().getText() === "module.exports"
              ) {
                e.replaceWithText(`export default ${t.getRight().getText()}`);

                s &&
                  !s.exported.includes("default") &&
                  s.exported.push("default");
              }
            });
            let n = 0;
            i.getDescendantsOfKind(ND.ts.SyntaxKind.CallExpression).forEach(
              (a) => {
                let o = a.getExpression();
                if (
                  !o.isKind(ND.ts.SyntaxKind.Identifier) ||
                  o.getText() !== "require"
                ) {
                  return;
                }
                let s = a.getArguments();
                if (s.length !== 1) {
                  return;
                }
                let [c] = s;
                if (!c || !c.isKind(ND.ts.SyntaxKind.StringLiteral)) {
                  return;
                }
                let d = c.getLiteralText();

                let u =
                  d.startsWith("http://") || d.startsWith("https://")
                    ? d
                    : NR(l, NO(r, d, e.getCompilerOptions().paths));

                if (
                  !a
                    .getAncestors()
                    .some((e) => e.isKind(ND.ts.SyntaxKind.Block))
                ) {
                  n++;
                  try {
                    a.replaceWithText(
                      `(__req_mod_${n}.default || __req_mod_${n})`
                    );

                    i.addImportDeclaration({
                      moduleSpecifier: u,
                      namespaceImport: `__req_mod_${n}`,
                    });
                  } catch (e) {
                    console.warn(
                      `[compiler error] Failed to add import declaration for ${u}:`,
                      e instanceof Error ? e.message : String(e)
                    );
                  }
                  NL(u, t).used.push("*");
                }
              }
            );
          }
        })(a, o, e, t, n, r),
      addStyle: ({ path, source }) =>
        (({
          modules,
          path: path_1,
          source: source_1,
          context,
          callbacks,
          tsconfigPaths,
        }) => {
          let s = NM(path_1, true, tsconfigPaths).slice(1);
          let l = NL(s, modules);
          let d = path_1.endsWith(".module.css");
          context.cssModuleRawContent = context.cssModuleRawContent || {};
          context.cssModuleRawContent[s] = source_1;

          callbacks.push(async () => {
            let t = new Set();
            let a = new Set();
            await Ig;
            let p = { dark: {}, default: {}, theme: {} };

            let _ = source_1.match(
              /@theme\s+(?:inline\s*)?\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/s
            );

            if (_) {
              let e;
              let [, t] = _;
              if (!t) {
                return;
              }
              let n = /--([^:]+):\s*([^;]+);/g;

              while (null !== (e = n.exec(t))) {
                if (e[1] && e[2]) {
                  let t = `--${e[1].trim()}`;
                  let n = e[2].trim();
                  p.theme[t] = n;
                }
              }
            }

            let { code, exports, warnings } = await i({
              filename: s,
              cssModules: d,
              minify: true,
              sourceMap: false,
              errorRecovery: true,
              resolver: {
                read: (e) => (e && context.cssModuleRawContent[e]) || "",
                resolve(n, r) {
                  if (n.startsWith("https://fonts.googleapis.com")) {
                    a.add(n);
                    return "";
                  }
                  if (n.startsWith("http://") || n.startsWith("https://")) {
                    return "";
                  }
                  if (!n.startsWith(".") && !n.startsWith("@/")) {
                    let r = NL(n, modules);
                    NB(l, n).push("*");

                    if (!r.used.includes("*")) {
                      r.used.push("*");
                    }

                    t.add(n);
                    return n;
                  }
                  return n.startsWith("@/")
                    ? `@v0/${n.slice(2)}`
                    : join(dirname(r), n);
                },
              },
              visitor: d
                ? undefined
                : {
                    Selector(e) {
                      if (
                        e.length === 1 &&
                        e[0] &&
                        e[0].type === "pseudo-class" &&
                        e[0].kind === "root"
                      ) {
                        o = true;
                        u = false;
                      } else if (
                        e.length === 1 &&
                        e[0] &&
                        e[0].type === "class" &&
                        e[0].name === "dark"
                      ) {
                        u = true;
                        o = false;
                      } else {
                        o = false;
                        u = false;
                      }
                    },
                    Declaration(e) {
                      if (e.property === "custom") {
                        if (o) {
                          p.default[e.value.name] = N5(e.value.value);
                        } else if (u) {
                          p.dark[e.value.name] = N5(e.value.value);
                        }
                      }
                    },
                  },
            });

            let g = "";
            let y = "";

            a.forEach((e) => {
              let t = JSON.stringify(e);
              y += `
// Inject Google Fonts link tag
if (!document.querySelector('link[href=${t}]')) {
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = ${t}
document.head.appendChild(link)
}
`;
            });

            t.forEach((e) => {
              if (e !== "tailwindcss" && e !== "tw-animate-css") {
                g += `import '${e}';`;
              }
            });

            let b = `\
${g}${y}
const styleTag = document.createElement('style')
styleTag.setAttribute('type', 'text/tailwindcss')
styleTag.innerHTML = ${JSON.stringify(code.toString())}
document.head.appendChild(styleTag)
`;

            let x = d
              ? ""
              : `\
var __dst = ${JSON.stringify(p)}
globalThis.__v0_dst.push(__dst)`;

            let S = d
              ? ""
              : `\
var index = globalThis.__v0_dst.indexOf(__dst)
if (index !== -1) globalThis.__v0_dst.splice(index, 1)`;

            let k = `\
var __mod_id=${JSON.stringify(s)}
globalThis.__v0_hmr=globalThis.__v0_hmr||{}
globalThis.__v0_dst=globalThis.__v0_dst||[]
${x}
var __unload=globalThis.__v0_hmr[__mod_id]
if (__unload) __unload()

globalThis.__v0_hmr[__mod_id]=()=>{
styleTag.innerHTML = ''
styleTag.remove()
${S}
}
`;

            l.type = "script";

            l.runtime = exports
              ? b +
                k +
                `
export default {
${Object.entries(exports)
  .sort(([e], [t]) => (e < t ? -1 : 1))
  .map(([e, t]) => `${JSON.stringify(e)}: ${JSON.stringify(t.name)}`)
  .join(",\n")}
}`
              : b + k;
          });
        })({
          modules: o,
          path: path,
          source: source,
          context: d,
          callbacks: l,
          tsconfigPaths: a.getCompilerOptions().paths,
        }),
      addStaticFile: (e, t) => {
        if (t[1].type === "url") {
          s[e] = { type: "url", content: t[1].data };
          return;
        }
        s[e] = { type: "raw", content: t[1].data };
      },
      addEnvFile: (e, t) => {
        Object.assign(
          u,
          ((e) => {
            let t;
            let n = {};
            let r = e.replace(/\r\n?/gm, "\n");

            while (null != (t = IF.exec(r))) {
              let [, e] = t;
              if (!e) {
                continue;
              }
              let r = t[2] || "";
              let i = (r = r.trim())[0];
              r = r.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

              if (i === '"') {
                r = (r = r.replace(/\\n/g, "\n")).replace(/\\r/g, "\r");
              }

              n[e] = r;
            }

            return n;
          })(t)
        );
      },
      addJSON: (e, t) => {
        !(({ modules, path, source, tsconfigPaths }) => {
          let i = NL(NM(path, true, tsconfigPaths).slice(1), modules);
          let a = {};
          try {
            a = JSON.parse(source);
          } catch (e) {
            console.error(
              `addJSONDependency: Invalid JSON in ${path}:`,
              e,
              ". Source:",
              source
            );
          }
          source = source
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
          i.type = "script";

          i.runtime = `\
const v = ${source}
export default v
${Object.keys(a)
  .map((e, t) => {
    let n = JSON.stringify(e);
    return `const v_${t} = v[${n}]; export { v_${t} as ${n} };`;
  })
  .join("\n")}`;
        })({
          modules: o,
          path: e,
          source: t,
          tsconfigPaths: a.getCompilerOptions().paths,
        });
      },
      seal: async (e) => {
        if (!e) {
          a.emitToMemory({
            customTransformers: {
              before: [
                NN({
                  refreshReg: "__v0_$RefreshReg$",
                  refreshSig: "__v0_$RefreshSig$",
                  ts: ND.ts,
                }),
              ],
            },
          })
            .getFiles()
            .forEach((e) => {
              let t = NM(e.filePath, true, a.getCompilerOptions().paths).slice(
                1
              );
              NL(t, o).runtime = `\
var prevRefreshReg = self.__v0_$RefreshReg$
var prevRefreshSig = self.__v0_$RefreshSig$
self.__v0_$RefreshReg$ = (type, id) => {
id = ${JSON.stringify(t)} + ' ' + id
self.__v0_rscRefreshRegister(type, id)
self.__v0_refreshRuntime.register(type, id)
}
self.__v0_$RefreshSig$ = typeof __v0_refreshRuntime !== 'undefined' ? __v0_refreshRuntime.createSignatureFunctionForTransform : () => {}

${e.text}

self.__v0_$RefreshReg$ = prevRefreshReg
self.__v0_$RefreshSig$ = prevRefreshSig`;
            });

          for (let e of l) {
            await e();
          }

          l.length = 0;
        }
        return {
          entryModules: ((e) => {
            let t = new Set(Object.keys(e));
            for (let [n, r] of Object.entries(e)) {
              if (NW.test(n)) {
                t.delete(n);
                continue;
              }
              Object.keys(r.dependencies).forEach((e) => {
                if (!e.endsWith("page") && !e.endsWith("route")) {
                  t.delete(e);
                }
              });
            }
            return Array.from(t);
          })(o),
          modules: o,
          staticFiles: s,
          envs: u,
        };
      },
    });

  let _ = [];

  let f = !!(
    t &&
    !((e, t) => {
      let n = new URL(e, "http://n").pathname;
      if (n === "/") {
        return true;
      }
      let r = n.match(IO);
      if (!r) {
        return true;
      }
      let [, i] = r;
      if (!i || IB.test(i)) {
        return true;
      }
      for (let [e] of t) {
        if (e) {
          if (e.startsWith("public/")) {
            if (e === `public${n}`) {
              return true;
            }
            continue;
          }
          if (
            (e.startsWith("app/") || e.startsWith("src/app/")) &&
            (IW.test(e) || e.includes(`/${i}/route.`))
          ) {
            return true;
          }
        }
      }
      return false;
    })(t, e)
  );

  for (let t of e) {
    if (!t[0]) {
      continue;
    }
    let [e] = t;

    let r = NP.test(e)
      ? "script"
      : /\.css$/i.test(e)
      ? "style"
      : /\.html$/i.test(e)
      ? "html"
      : /\.json$/i.test(e)
      ? "json"
      : "unknown";

    let i = c.default.join("/@v0", e);
    let a = Ij.test(i);
    let o = i.startsWith("/@v0/public/");
    if (o || a) {
      if (o) {
        _.push(() => p.addStaticFile(i.slice(11), t));
      }

      if (a) {
        let n = p.project.createSourceFile(
          `${i}.tsx`,
          `\
export default {
src: ${JSON.stringify(
            t[1].type === "url"
              ? t[1].data
              : `data:${Iz[i.slice(i.lastIndexOf(".") + 1)]};base64,${btoa(
                  t[1].data
                )}`
          )},
height: 100,
width: 100,
blurDataURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
}`,
          { scriptKind: ND.ScriptKind.TSX, overwrite: true }
        );
        _.push(() => p.add(e, i, n, f));
      }
    } else if (r === "json") {
      _.push(() => p.addJSON(i, t[1].data));
    } else if (r === "script") {
      let r = /\.(tsx|jsx)$/i.test(e);

      let a = p.project.createSourceFile(
        i.replace(/\.jsx?$/, ".tsx"),
        t[1].data,
        {
          scriptKind: Dv("jsx-strict-types", n)
            ? r
              ? ND.ScriptKind.TSX
              : ND.ScriptKind.TS
            : ND.ScriptKind.TSX,
          overwrite: true,
        }
      );

      let o = /\.jsx?/.test(i) ? i.replace(/\.jsx?$/, ".tsx") : a.getFilePath();
      _.push(() => p.add(e, o, a, f));
    } else {
      if (r === "style") {
        !(() => {
          let e = window.location.href.includes("demo-");

          if (!Ig) {
            Ig = e
              ? N3("/assets/lightningcss_node.wasm").catch((e) => {
                  console.error("Failed to initialize LightningCSS:", e);
                  throw e;
                })
              : N3(
                  (Ih().hasChannel() &&
                    ((e, ...t) => Ih().sendToTarget({ method: e, args: t }))(
                      "getLightningCSSWASMArrayBuffer"
                    )) ||
                    "/assets/lightningcss_node.wasm"
                ).catch((e) => {
                  console.error("Failed to initialize LightningCSS:", e);
                  throw e;
                });
          }
        })();

        _.push(() => p.addStyle({ path: i, source: t[1].data }));
      } else if (r === "html") {
        _.push(() => p.addStaticFile(i.slice(4), t));
      } else if (/\/@v0\/\.env(?!.*\.example$)($|\..+)/.test(i)) {
        p.addEnvFile(i, t[1].data);
      }
    }
  }

  _.forEach((e) => e());

  return [await p.seal(f), p];
}

const { useLatest } = require(295224 /* wakaru:missing */);

const { parse } = require(6216 /* wakaru:missing */);

const { formatConsoleMessage } = require(717035 /* wakaru:missing */);

const IH = require(970422 /* wakaru:missing */);

const {
  addGenerationLog,
  withNewGenerationLogsReport,
  stopCollectingGenerationLogs,
  getGenerationLogs,
  startCollectingGenerationLogs,
} = IH;

function Iq({ message, stack, isServer, isFatal }) {
  let i = window.location.pathname;
  let a = Error();

  if (stack) {
    a.stack = stack;
  } else {
    Error?.captureStackTrace?.(a, Iq);
  }

  let o = parse(a, { slice: 15 })
    .filter((e) => {
      let e_file = e.file;
      return !!e_file && (!!e_file.startsWith("blob:") || !!isFromCDN(e_file));
    })
    .map((e) => {
      let t = "  at ";

      if (e.function) {
        t += `${e.function} `;
      }

      if (e.file) {
        t += `(${findOriginalModuleNameFromURL(e.file).replace(IJ, "")})`;
      }

      return t;
    })
    .join("\n");

  addGenerationLog(`${message}

${o}`);

  sendToParent({
    type: "error",
    error: message,
    stack: o,
    isServer: isServer,
    isFatal: isFatal,
    currentURL: i || undefined,
  });
}
let IJ = /\?(server|client)_layer$/;

let I$ = {
  error: [
    "Encountered two children with the same key",
    'Each child in a list should have a unique "key" prop.',
    "<button> cannot contain a nested <button>",
    "In HTML, <button> cannot be a descendant of <button>",
    "<p> cannot contain a nested <div>",
    "In HTML, <div> cannot be a descendant of <p>",
    "├─ ⚠︎  Error  Invalid color",
    "React does not recognize the",
  ],
};

let IX = {
  error: [
    "In HTML, <html> cannot be a child of <body>.",
    "In HTML, <html> cannot be a child of <div>.",
    "<body> cannot contain a nested <html>.",
    "<div> cannot contain a nested <html>.",
    "You are mounting a new html component when a previous one has not first unmounted",
    "You are mounting a new body component when a previous one has not first unmounted",
    "[Fast Refresh]",
    "Accessing element.ref was removed",
    "`DialogContent` requires a `DialogTitle` for the component to be accessible",
    "[next-auth][error][NO_SECRET]",
    'module "../src/build/Release/sharp--.node"',
    "You are mounting a new head component",
  ],
  warn: ["Multiple GoTrueClient instances detected"],
  log: [],
  info: [],
  debug: [],
};

function IY(e, t, n) {
  let r = new StorageEvent("storage", {
    key: e,
    newValue: t,
    oldValue: n,
    storageArea: null,
    url: window.location.href,
  });
  window.dispatchEvent(r);
}
a = { ...console };

["log", "info", "warn", "error", "debug"].forEach((e) => {
  console[e] = (...t) => {
    let n = t[0] instanceof IH.FatalRendererError;
    let r = formatConsoleMessage(t[0], ...t.slice(1));
    if (!(e in IX && IX[e].some((e) => r.startsWith(e)))) {
      if (e in I$ && I$[e].some((e) => r.startsWith(e))) {
        a.warn(...t);

        sendToParent({
          type: "console",
          method: "warn",
          message: r,
          isServer: Dz.serverContext.enabled,
          timestamp: new Date().toISOString(),
        });

        return;
      }
      a[e](...t);

      if (e === "error") {
        if (typeof t[0] == "object" && t[0] instanceof Error) {
          let [e] = t;

          Iq({
            message:
              (n || (t[0] && t[0] instanceof Error) ? t[0].message : r) +
              (typeof e.cause == "string" ? `\n\n${e.cause}` : ""),
            stack: e.stack,
            isServer: Dz.serverContext.enabled,
            isFatal: n,
          });

          if (n) {
            return;
          }
        } else {
          Iq({ message: r, isServer: Dz.serverContext.enabled });
        }
      }

      if (!r.includes("[Fast Refresh]")) {
        sendToParent({
          type: "console",
          method: e,
          message: r,
          isServer: Dz.serverContext.enabled,
          timestamp: new Date().toISOString(),
        });
      }
    }
  };
});

window.onerror = (e, t, n, r, i) => {
  let a = `Uncaught error: ${String(e)}`;

  Iq({
    message: a,
    stack: i?.stack,
    isServer: Dz.serverContext.enabled,
  });

  sendToParent({
    type: "console",
    method: "error",
    message: a,
    isServer: Dz.serverContext.enabled,
    timestamp: new Date().toISOString(),
  });

  return false;
};

window.onunhandledrejection = (e) => {
  let t = `Unhandled promise rejection: ${String(e.reason)}`;

  Iq({
    message: t,
    stack: e.reason?.stack,
    isServer: Dz.serverContext.enabled,
  });

  sendToParent({
    type: "console",
    method: "error",
    message: t,
    isServer: Dz.serverContext.enabled,
    timestamp: new Date().toISOString(),
  });
};

const { resolveRouteHandler } = require(123314 /* wakaru:missing */);

const IZ = require(5743 /* wakaru:missing */);
function I1(e) {
  return e.replace(/[_ ]/g, " ");
}
async function I2(
  e,
  t,
  n = `https://fonts.googleapis.com/css2?family=${e.replace(
    /[_ ]/g,
    "+"
  )}:wght@${t.join(";")}&display=swap`
) {
  return new Promise((r, i) => {
    let a = document.createElement("link");
    a.rel = "stylesheet";
    a.href = n;
    a.dataset.fontId = e;

    a.onload = () => {
      let n = [];
      for (let r of t) {
        n.push(document.fonts.load(`${r} 1em "${I1(e)}"`));
      }
      Promise.all(n)
        .then(() => {
          r();
        })
        .catch((e) => {
          i(e);
        });
    };

    a.onerror = () => {
      i(Error(`Failed to load font: ${e}`));
    };

    document.head.appendChild(a);
  });
}
!(() => {
  let e;
  let t;

  let n = (() => {
    if (!("ancestorOrigins" in location)) {
      return window.parent !== window ? "*" : undefined;
    }
    let location_ancestorOrigins = location.ancestorOrigins;
    if (location_ancestorOrigins.length === 1) {
      let t;
      if (
        "https://v0.dev" === (t = location_ancestorOrigins[0]) ||
        t === "https://v0.app" ||
        t.endsWith(".vercel.sh") ||
        t === "http://localhost:3000"
      ) {
        return location_ancestorOrigins[0];
      }
    }
  })();

  if (!n) {
    return;
  }
  let r = new Map();
  let i = false;

  let a = new Promise((e) => {
    window.addEventListener("message", (t) => {
      if (
        (n === "*" || t.origin === n) &&
        t.data.type === "localStorage-store-update"
      ) {
        r = new Map(t.data.map);
        i = true;
        e();
      }
    });
  });

  function o() {
    a.then(() => {
      parent.postMessage(
        { type: "localStorage-update", map: Array.from(r.entries()) },
        n
      );
    });
  }
  parent.postMessage({ type: "localStorage-init-request" }, n);

  e = {
    setItem: (e, t) => {
      let n = r.get(e);
      r.set(e, t);
      o();
      IY(e, t, n ?? null);
    },
    getItem: (e) => (i ? r.get(e) ?? null : null),
    removeItem: (e) => {
      let t = r.get(e);
      r.delete(e);
      o();
      IY(e, null, t ?? null);
    },
    clear: () => {
      r.clear();
      o();
      IY(null, null, null);
    },
    get length() {
      return r.size;
    },
    key: (e) => Array.from(r.keys())[e] ?? null,
  };

  t = new Proxy(window.localStorage, {
    get: (t, n) =>
      n === "length"
        ? e.length
        : n === "getItem"
        ? e.getItem
        : n === "setItem"
        ? e.setItem
        : n === "removeItem"
        ? e.removeItem
        : n === "clear"
        ? e.clear
        : n === "key"
        ? e.key
        : typeof t[n] == "function"
        ? t[n].bind(t)
        : t.getItem(n),
    set: (e, t, n) => {
      e.setItem(t, n);
      return true;
    },
    deleteProperty: (e, t) => {
      e.removeItem(t);
      return true;
    },
    has: (e, t) => e.getItem(t) !== null,
  });

  Object.defineProperty(window, "localStorage", {
    value: t,
    writable: false,
    configurable: false,
  });
})();
let I4 = new Promise((e, t) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.controller
      ? e()
      : navigator.serviceWorker
          .register("/__v0_sw.js", { scope: "/" })
          .then((t) => {
            let n = t.installing || t.waiting;

            if (n) {
              n.onstatechange = () => {
                if (n.state === "activated") {
                  e();
                }
              };
            }

            return t;
          })
          .catch((e) => {
            t(e);
          });

    navigator.serviceWorker.addEventListener("message", async (e) => {
      let e_data = e.data;
      if (
        e_data &&
        typeof e_data == "object" &&
        e_data.type === "v0_request_resource"
      ) {
        let e = await resolveRouteHandler(
          e_data.method,
          new Request(e_data.url, {
            method: e_data.method,
            headers: e_data.headers,
            body: e_data.body,
          })
        );
        if (e) {
          try {
            navigator.serviceWorker.controller.postMessage({
              type: "v0_request_response",
              id: e_data.id,
              response: {
                status: e.status,
                headers: Object.fromEntries(e.headers.entries()),
                body: await e.arrayBuffer(),
              },
            });
          } catch (e) {
            navigator.serviceWorker.controller.postMessage({
              type: "v0_request_response",
              id: e_data.id,
              response: {
                status: 500,
                headers: {},
                body: new TextEncoder().encode("internal server error").buffer,
              },
            });
          }
        } else {
          navigator.serviceWorker.controller.postMessage({
            type: "v0_request_response",
            id: e_data.id,
            response: null,
          });
        }
      }
    });
  } else {
    e();
  }
});
function I3(e) {
  return { staticFiles: e.staticFiles };
}
async function I6(e, t) {
  return await IV(e, undefined, getGlobals().internal_ts || Date.now(), t);
}
function I8(e) {
  let t = `Failed to initialize v0: ${e.message || "An error occurred"}`;
  return <DL.ErrorPage code="Application Error" message={t} error={e} />;
}
function I5(e) {
  let t = {};
  for (let n of Object.values(e.modules)) {
    if (n.originalPath !== undefined) {
      t[n.path] = n.originalPath;
    }
  }
  return t;
}
let I7 = new IZ.LRUCache({ max: 50 });
let I9 = new Map();
function Pe(e, t) {
  if (I9.has(e)) {
    return I9.get(e);
  }
  let n = t(e).finally(() => {
    I9.delete(e);
  });
  I9.set(e, n);
  return n;
}
function Pt({ currentId, preloadedId, currentRuntime, preloadedRuntime }) {
  let i = currentId === preloadedId;
  return [
    <s.Activity key={i ? "_" : currentId} mode={i ? "hidden" : "visible"}>
      {<s.Suspense>{currentRuntime}</s.Suspense>}
    </s.Activity>,
    <s.Activity key={preloadedId} mode={i ? "visible" : "hidden"}>
      {<s.Suspense>{preloadedRuntime}</s.Suspense>}
    </s.Activity>,
  ];
}
function Pn({
  id: id_1,
  files,
  loadClientFiles,
  createdAt,
  envPromise,
  defaultPath,
  isV3,
  chatMetadata,
}) {
  let d;
  let [u, setU] = useState(id_1);
  let [_, set] = useState(null);
  let [m, setM] = useState("");
  let [g, setG] = useState(null);
  let [b, setB] = useState(false);
  let [S, setS] = useState({});
  let [T, setT] = useState(0);
  let C = useLatest(files);
  let A = useLatest(null);

  let w = useCallback(
    (e, t, n) => {
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "v0_init",
          compiled: I3(e),
        });
      }

      getGlobals().internal_static = Object.entries(I3(e).staticFiles).reduce(
        (e, [t, n]) => {
          e[t] = [n.type, n.content];
          return e;
        },
        {}
      );

      return Nh({
        result: e,
        rawFiles: t,
        envPromise: envPromise,
        defaultPath: defaultPath,
        hmr: n,
        createdAt: e.createdAt || Date.now(),
        chatMetadata: chatMetadata,
      }).catch(I8);
    },
    [defaultPath, envPromise, chatMetadata]
  );

  if (I7.has(u)) {
    let e = I7.get(u);
    d = e.compiled;
    files = e.files;
    C.current = e.files;
  } else {
    d = IV(C.current, defaultPath, createdAt);
    I7.set(u, { files: C.current, compiled: d });
  }
  let D = useLatest(u);
  let N = useLatest(m);
  let I = useLatest(g);

  useLayoutEffect(() => {
    sendToParent({ type: "frame_onload" });
    let e = false;

    I4.then(() => d)
      .then((t) => {
        if (!e) {
          return (setS(I5(t[0])), (A.current = t[1]), D.current === N.current)
            ? void set(I.current)
            : w(t[0], C.current, false).then((t) => {
                if (!e) {
                  set(<s.Fragment key={Date.now()}>{t}</s.Fragment>);
                }
              });
        }
      })
      .then(() => {
        if (!e) {
          document.body.classList.remove("v0-loading");
          sendToParent({ type: "frame_ready" });
        }
      })
      .catch(I8);

    return () => {
      e = true;
    };
  }, [d]);

  useLayoutEffect(() => {
    let e = new URL(window.location.href);
    let t = e.searchParams.toString();

    if (
      e.searchParams.has("__v0_token") ||
      e.searchParams.has("__v0") ||
      e.searchParams.has("__v0_vercel_project_id")
    ) {
      e.searchParams.delete("__v0_token");
      e.searchParams.delete("__v0");
      e.searchParams.delete("__v0_vercel_project_id");
    }

    if (e.searchParams.has("mql")) {
      e.searchParams.delete("mql");
    }

    if (e.searchParams.has("isV3")) {
      e.searchParams.delete("isV3");
    }

    if (t !== e.searchParams.toString()) {
      window.history.replaceState({}, "", e.toString());
      window.can_redirect = true;
    }

    let i = (e) => {
      let e_data = e.data;
      if (!e_data || typeof e_data != "object") {
        return;
      }
      let i = e_data.type === "preview_code_delta";
      let l = [];
      if (e_data.type === "preview_code") {
        C.current = l = Object.entries(
          e_data.code && typeof e_data.code.mapping == "object"
            ? e_data.code.mapping
            : e_data.code
        ).map(([e, t]) => [e, t]);
      } else if (i) {
        let e = false;

        C.current = C.current.map((n) => {
          if (n[0] === e_data.file) {
            e = true;
            let r = [n[0], { ...n[1], data: e_data.source }];
            l = [r];
            return r;
          }
          return n;
        });

        if (!e) {
          l = [[e_data.file, { type: "file", data: e_data.source }]];
          C.current.push(l[0]);
        }
      }
      if (l.length) {
        return void I6(l, i ? A.current : undefined)
          .then((e) => {
            A.current = e[1];
            startHMR();

            return w(e[0], C.current, true).then(async () => {
              globalThis.IS_REACT_ACT_ENVIRONMENT = true;

              act(() => {
                window.__v0_refreshRuntime.performReactRefresh();
              });

              globalThis.IS_REACT_ACT_ENVIRONMENT = false;
              await stopHMR();
              setS(I5(e[0]));

              if (e_data.version) {
                setT(e_data.version);
              } else {
                setT((e) => e + 1);
              }
            });
          })
          .catch(I8);
      }
      if (e_data.__v0_remote__) {
        switch (e_data.type) {
          case "navigate_back": {
            window.history.back();
            break;
          }
          case "navigate_forward": {
            window.history.forward();
            break;
          }
          case "navigate_to": {
            window.location.href = e_data.href;
            break;
          }
          case "devtools_enable": {
            let e_data_enabled = e_data.enabled;
            setB(e_data_enabled);

            if (e_data_enabled) {
              sendToParent({
                type: "devtools_selected_state",
                parts: null,
                selected: false,
                info: getExtraElementInfo(document.documentElement, true),
                version: T,
              });
            }

            break;
          }
          case "devtools_query_root": {
            sendToParent({
              type: "devtools_selected_state",
              parts: null,
              selected: false,
              info: getExtraElementInfo(document.documentElement, true),
              version: T,
            });
            break;
          }
          case "devtools_sync_design": {
            optimisticApplyVisualChanges(e_data.payload);
            break;
          }
          case "devtools_revert_design": {
            revertOptimisticVisualChanges();
            break;
          }
          case "preload_client": {
            let e_data_id = e_data.id;
            if (!I7.has(e_data_id)) {
              if (!loadClientFiles) {
                throw Error(
                  "loadClientFiles function is required to preload clients."
                );
              }
              Pe(e_data_id, loadClientFiles)
                .then((e) => {
                  let t = IV(e, defaultPath, createdAt).catch((e) => {
                    console.error(e);
                    throw e;
                  });
                  I7.set(e_data_id, { files: e, compiled: t });

                  withNewGenerationLogsReport(
                    (async () => {
                      try {
                        let n = await t;
                        let r = await w(n[0], e, false);
                        if (!r) {
                          return;
                        }
                        setM(e_data_id);

                        setG(<s.Fragment key={Date.now()}>{r}</s.Fragment>);

                        await new Promise((e) => setTimeout(e, 500));
                      } catch (e) {
                        console.error(e);
                      }
                    })(),
                    (e) => {
                      sendToParent({
                        type: "generation_logs",
                        logs: e,
                        id: e_data_id,
                        preload: true,
                      });
                    },
                    false
                  );
                })
                .catch(() => {});
            }
            break;
          }
          case "switch_client": {
            if (e_data.id !== D.current) {
              D.current = e_data.id;

              if (I7.has(e_data.id)) {
                setU(e_data.id);
              } else {
                if (!loadClientFiles) {
                  throw Error(
                    "loadClientFiles function is required to preload clients."
                  );
                }
                Pe(e_data.id, loadClientFiles)
                  .then((e) => {
                    I7.set(e_data.id, {
                      files: e,
                      compiled: IV(e, defaultPath, createdAt),
                    });
                    setU(e_data.id);
                  })
                  .catch(() => {
                    window.location.href = e_data.fallbackUrl;
                  });
              }
            }
            break;
          }
          case "env_vars": {
            if (
              Array.isArray(e_data.envVars) &&
              typeof window.__v0_updateProcessEnv == "function"
            ) {
              window.__v0_updateProcessEnv(e_data.envVars);
            }

            break;
          }
          case "preload_google_font": {
            if (e_data.fontId && typeof e_data.fontId == "string") {
              try {
                let u;
                let e;
                I2(
                  e_data.fontId,
                  ((u = e_data.fontId),
                  (e = I0.googleFontsMetadata[I1(u)])
                    ? e.weights.filter((e) => e !== "variable")
                    : ["400"])
                );
              } catch {}
            }
          }
        }
      }
    };
    window.addEventListener("message", i);
    let l = "";
    let c = document.location.hash;
    let d = window.self !== window.top;
    function u() {
      if (l !== document.location.href) {
        var e;
        e = l = document.location.href;

        sendToParent({
          type: "location_change",
          href: e,
          canGoForward: window.navigation?.canGoForward,
          canGoBack: window.navigation?.canGoBack,
        });
      }
      if (d) {
        let e = window.location.hash;
        if (e !== c && ((c = e), e && e !== "#")) {
          let t = document.querySelector(e);

          if (t) {
            t.scrollIntoView();
          }
        }
      }
    }
    getGlobals().internal_location_change = u;
    let _ = new MutationObserver(u);

    _.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    u();
    window.addEventListener("popstate", u);
    window.addEventListener("hashchange", u);

    return () => {
      window.removeEventListener("message", i);
      window.removeEventListener("popstate", u);
      window.removeEventListener("hashchange", u);
      _.disconnect();
    };
  }, [w, loadClientFiles]);

  let P = !!_;

  useEffect(() => {
    if (P) {
      sendToParent({ type: "app_navigation_state", loading: false });
    }
  }, [P]);

  useSendBrowserEvent();

  useEffect(() => {
    if (!P) {
      return;
    }
    sendToParent({ type: "app_ready", id: u });
    let e = false;

    let t = setTimeout(() => {
      stopCollectingGenerationLogs();

      sendToParent({
        type: "generation_logs",
        logs: getGenerationLogs(),
        id: u,
      });

      e = true;
    }, 500);

    return () => {
      clearTimeout(t);

      if (e) {
        startCollectingGenerationLogs();
      }
    };
  }, [P, u]);

  useEffect(() => {
    if (_) {
      sendToParent({ type: "app_navigation_state", loading: false });
    }

    let e = setInterval(() => {
      sendToParent({ type: "app_navigation_state", loading: false });
    }, 1000 /* 1e3 */);
    return () => {
      clearInterval(e);

      sendToParent({
        type: "app_navigation_state",
        loading: true,
      });
    };
  }, [_]);

  useEffect(() => {
    if (P) {
      document.documentElement.setAttribute("data-loaded", "true");
    }
  }, [P]);

  return (
    <NA.DevToolsProvider
      enabled={b}
      isV3={isV3}
      fileMapping={S}
      sourceVersion={T}
    >
      {
        <Pt
          currentId={u}
          preloadedId={m}
          currentRuntime={_}
          preloadedRuntime={g}
        />
      }
    </NA.DevToolsProvider>
  );
}
module.s(["ClientEntry", () => Pn], 448763);
