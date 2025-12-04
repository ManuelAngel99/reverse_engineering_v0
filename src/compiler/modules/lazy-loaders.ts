/**
 * Lazy Module Loaders
 * Source: module_448763 (Lines 180-244, 557-592)
 *
 * Lazy loading system for heavy 3rd-party libraries and core runtime shims.
 * Modules are loaded on-demand to reduce initial bundle size.
 */

import type {
  LazyModuleRegistry,
  LazyModuleLoader,
  ModuleExports,
} from "../../shared/types/compiler";

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Mark a module loader as lazy
 *
 * @param loader - Module loader function
 * @returns Loader with __lazy flag
 */
function markAsLazy<T extends () => Promise<ModuleExports>>(
  loader: T
): LazyModuleLoader {
  const lazyLoader = loader as LazyModuleLoader;
  lazyLoader.__lazy = true;
  return lazyLoader;
}

/**
 * Mark module exports as non-slottable
 * Prevents wrapping in Slottable component for tracking
 *
 * @param module - Module exports
 * @returns Module with __slottable flag
 */
function markAsNonSlottable(module: ModuleExports): ModuleExports {
  if (module && typeof module === "object") {
    Object.defineProperty(module, "__slottable", {
      value: false,
      enumerable: false,
      writable: false,
    });
  }
  return module;
}

// ============================================================================
// Heavy 3rd-Party Libraries
// ============================================================================

/**
 * Lazy loaders for heavy 3rd-party libraries
 * These are loaded on-demand to reduce initial bundle size
 *
 * Source: Lines 180-244 (Dp registry)
 */
export const heavyLibraries: LazyModuleRegistry = {
  // Animation
  "framer-motion": markAsLazy(() => import("framer-motion")),
  "motion/react": markAsLazy(() => import("motion/react")),

  // Charts & Data Visualization
  recharts: markAsLazy(() =>
    import("recharts").then((mod) => markAsNonSlottable(mod))
  ),

  // Validation
  zod: markAsLazy(() => import("zod")),

  // 3D Graphics
  "@react-three/fiber": markAsLazy(() => import("@react-three/fiber")),
  "@react-three/drei": markAsLazy(() => import("@react-three/drei")),
  three: markAsLazy(() => import("three")),

  // Payments
  "@stripe/react-stripe-js": markAsLazy(
    () => import("@stripe/react-stripe-js")
  ),
  "@stripe/stripe-js": markAsLazy(() => import("@stripe/stripe-js")),

  // HTTP & Networking
  axios: markAsLazy(() => import("axios")),

  // Forms
  "react-hook-form": markAsLazy(() => import("react-hook-form")),

  // Image Generation
  satori: markAsLazy(() => import("satori")),

  // AI SDK with gateway provider
  ai: markAsLazy(async () => {
    const aiModule = await import("ai");
    // Note: Gateway provider setup would happen here if needed
    // For now, just return the module as-is
    return aiModule;
  }),

  // Crypto polyfill
  crypto: markAsLazy(async () => {
    const { createCryptoPolyfill } = await import("../polyfills/crypto");
    return createCryptoPolyfill();
  }),

  // PDF Rendering
  "@react-pdf/renderer": markAsLazy(() => import("@react-pdf/renderer")),
  "@alexandernanberg/react-pdf-renderer": markAsLazy(
    () => import("@react-pdf/renderer")
  ), // Alias

  // Optimization
  "@optimizely/optimizely-sdk": markAsLazy(
    () => import("@optimizely/optimizely-sdk")
  ),

  // React Aria
  "@react-stately/searchfield": markAsLazy(
    () => import("@react-stately/searchfield")
  ),
  "react-aria-components": markAsLazy(() => import("react-aria-components")),
  "react-stately": markAsLazy(() => import("react-stately")),

  // 3D Physics
  "@react-three/rapier": markAsLazy(() => import("@react-three/rapier")),
  "@react-three/cannon": markAsLazy(() => import("@react-three/cannon")),
  "@react-three/postprocessing": markAsLazy(
    () => import("@react-three/postprocessing")
  ),
  meshline: markAsLazy(() => import("meshline")),

  // Flow Diagrams
  "@xyflow/react": markAsLazy(() => import("@xyflow/react")),
  reactflow: markAsLazy(() => import("reactflow")),
  "reactflow/dist/style.css": markAsLazy(() =>
    import("reactflow/dist/style.css").then(() => ({}))
  ),

  // Form Validation
  "@hookform/resolvers/zod": markAsLazy(
    () => import("@hookform/resolvers/zod")
  ),

  // UI Components
  "lucide-react": markAsLazy(() => import("lucide-react")),
  "@radix-ui/react-toast": markAsLazy(() => import("@radix-ui/react-toast")),
  "input-otp": markAsLazy(() => import("input-otp")),

  // Testing (Playwright stub)
  "@playwright/test": markAsLazy(async () => {
    const { test, expect } = await import("@/compiler/polyfills/playwright");
    return {
      test,
      expect,
      describe: test.describe,
      beforeEach: test.beforeEach,
      afterEach: test.afterEach,
      beforeAll: test.beforeAll,
      afterAll: test.afterAll,
      _baseTest: test,
    };
  }),

  // Date & Time
  "date-fns": markAsLazy(() => import("date-fns")),
  dayjs: markAsLazy(() => import("dayjs")),

  // Utilities
  lodash: markAsLazy(() => import("lodash")),
  "lodash-es": markAsLazy(() => import("lodash-es")),

  // Markdown
  "react-markdown": markAsLazy(() => import("react-markdown")),
  remark: markAsLazy(() => import("remark")),
  "remark-gfm": markAsLazy(() => import("remark-gfm")),

  // Code Highlighting
  "react-syntax-highlighter": markAsLazy(
    () => import("react-syntax-highlighter")
  ),

  // Icons (additional sets)
  "react-icons": markAsLazy(() => import("react-icons")),
  "react-icons/fa": markAsLazy(() => import("react-icons/fa")),
  "react-icons/md": markAsLazy(() => import("react-icons/md")),
  "react-icons/io": markAsLazy(() => import("react-icons/io")),

  // State Management
  zustand: markAsLazy(() => import("zustand")),
  jotai: markAsLazy(() => import("jotai")),
};

// ============================================================================
// Node.js Polyfills
// ============================================================================

/**
 * Node.js module polyfills
 * These provide browser-compatible implementations of Node.js built-in modules
 */
export const nodePolyfills: LazyModuleRegistry = {
  // Crypto
  crypto: markAsLazy(() => import("crypto-browserify")),

  // DNS
  dns: markAsLazy(() => import("@/compiler/polyfills/dns").then((m) => m.dns)),
  "node:dns": markAsLazy(() =>
    import("@/compiler/polyfills/dns").then((m) => m.dns)
  ),
  "node:dns/promises": markAsLazy(() =>
    import("@/compiler/polyfills/dns").then((m) => m.dnsPromises)
  ),
  "dns/promises": markAsLazy(() =>
    import("@/compiler/polyfills/dns").then((m) => m.dnsPromises)
  ),
  "node/dns.mjs": markAsLazy(() =>
    import("@/compiler/polyfills/dns").then((m) => m.dns)
  ),

  // HTTPS
  https: markAsLazy(() => import("@/compiler/polyfills/https")),
  "node:https": markAsLazy(() => import("@/compiler/polyfills/https")),
  "node:https.mjs": markAsLazy(() => import("@/compiler/polyfills/https")),
};

// ============================================================================
// Core Runtime Shims
// ============================================================================

/**
 * Lazy loaders for core runtime shims
 * These provide Node.js and Next.js compatibility in the browser
 *
 * Source: Lines 557-592 (DI registry)
 */
export const runtimeShims: LazyModuleRegistry = {
  // React Runtime
  "react-dom/server": markAsLazy(() => import("react-dom/server")),
  "react-dom/client": markAsLazy(() => import("react-dom/client")),
  "react/jsx-runtime": markAsLazy(() => import("react/jsx-runtime")),
  "react/jsx-dev-runtime": markAsLazy(() => import("react/jsx-dev-runtime")),

  // Virtual File System
  fs: markAsLazy(async () => {
    const { Volume } = await import("memfs");
    return Volume;
  }),
  "fs/promises": markAsLazy(async () => {
    const { Volume } = await import("memfs");
    return Volume.promises;
  }),
  memfs: markAsLazy(() => import("memfs")),

  // Path utilities
  path: markAsLazy(() => import("path-browserify")),
  "path/posix": markAsLazy(async () => {
    const path = await import("path-browserify");
    return path.posix;
  }),
  "path/win32": markAsLazy(async () => {
    const path = await import("path-browserify");
    return path.win32;
  }),

  // Fonts (Geist)
  "geist/font/sans": markAsLazy(async () => {
    const { createNextFontShim } = await import("./font-shims");
    return {
      GeistSans: createNextFontShim({
        family: "var(--font-geist-sans)",
        variable: "--font-geist-sans",
      }),
    };
  }),
  "geist/font/mono": markAsLazy(async () => {
    const { createNextFontShim } = await import("./font-shims");
    return {
      GeistMono: createNextFontShim({
        family: "var(--font-geist-mono)",
        variable: "--font-geist-mono",
      }),
    };
  }),

  // Next.js Font System
  "next/font/google": markAsLazy(async () => {
    const { createGoogleFontLoader } = await import("./font-shims");
    return { default: createGoogleFontLoader };
  }),
  "next/font/local": markAsLazy(async () => {
    const { createLocalFontLoader } = await import("./font-shims");
    return { default: createLocalFontLoader };
  }),

  // Next.js Core
  "next/link": markAsLazy(async () => {
    const { Link } = await import("../../runtime/next-shims/link");
    return { default: Link };
  }),
  "next/image": markAsLazy(async () => {
    const { Image } = await import("../../runtime/next-shims/image");
    return { default: Image };
  }),
  "next/navigation": markAsLazy(async () => {
    return import("../../runtime/next-shims/navigation");
  }),
  "next/headers": markAsLazy(async () => {
    return import("../../runtime/next-shims/headers");
  }),
  "next/server": markAsLazy(async () => {
    return import("../../runtime/next-shims/server");
  }),
};

// ============================================================================
// Combined Registry
// ============================================================================

/**
 * Combined lazy module registry
 * Merges heavy libraries and runtime shims
 */
export const lazyModules: LazyModuleRegistry = {
  ...heavyLibraries,
  ...runtimeShims,
};

// ============================================================================
// Module Resolution
// ============================================================================

/**
 * Resolve a module by name
 * Checks if it's a lazy module and loads it on-demand
 *
 * @param moduleName - Module name to resolve
 * @returns Promise resolving to module exports
 */
export async function resolveModule(
  moduleName: string
): Promise<ModuleExports | null> {
  const loader = lazyModules[moduleName];

  if (!loader) {
    return null;
  }

  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load module "${moduleName}":`, error);
    return null;
  }
}

/**
 * Check if a module is available (lazy or otherwise)
 *
 * @param moduleName - Module name
 * @returns True if module can be loaded
 */
export function isModuleAvailable(moduleName: string): boolean {
  return moduleName in lazyModules;
}

/**
 * Preload a module without waiting for it
 * Useful for prefetching modules that will be needed soon
 *
 * @param moduleName - Module name
 */
export function preloadModule(moduleName: string): void {
  const loader = lazyModules[moduleName];
  if (loader) {
    loader().catch((error) => {
      console.warn(`Failed to preload module "${moduleName}":`, error);
    });
  }
}

/**
 * Preload multiple modules in parallel
 *
 * @param moduleNames - Array of module names
 */
export async function preloadModules(moduleNames: string[]): Promise<void> {
  await Promise.allSettled(
    moduleNames.map((name) => {
      const loader = lazyModules[name];
      return loader ? loader() : Promise.resolve();
    })
  );
}
