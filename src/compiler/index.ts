/**
 * Compiler Bundle
 * Source: b114f950a0cd6ced.js (module_448763)
 *
 * The v0 compiler system that transforms user code into executable modules.
 * Includes TypeScript compilation, JSX transformation, and Node.js polyfills.
 */

// Polyfills (LOC 48-153)
export * from "./polyfills/dns";
export * from "./polyfills/https";

// Asset Constants (LOC 266-299) ✅ COMPLETED
export * from "./assets/constants";

// Feature Flags (LOC 303-317) ✅ COMPLETED
export * from "./features/featureFlags";

// Font Configuration (LOC 323-373)
// See: src/shared/font-configuration.tsx

// Custom JSX Runtime (LOC 375-516)
export * from "./jsx-runtime/jsxDevRuntime";

// Module System (LOC 557-608, 1622-1696)
export * from "./modules/registry";
export * from "./modules/lazy-loaders";
export * from "./modules/font-shims";

// ES Module Shim Config (LOC 1920-2167) ✅ Phase 4
export * from "./modules/esm-shim-config";

// URL Override (LOC 2168-2189) ✅ Phase 4
export * from "./modules/url-override";

// Compilation Pipeline
export * from "./pipeline/react-refresh";
export * from "./pipeline/transformers";
export * from "./pipeline/source-maps";
export * from "./pipeline/commonjs-transform";
export * from "./pipeline/jsx-metadata-injection";
export * from "./pipeline/lucide-optimization";

// Filesystem Hydration (LOC 517-555) ✅ COMPLETED
export * from "./filesystem/hydration";

// CSS Processing System (Phase 1 - COMPLETED)
// Use the CSS index which handles export conflicts properly
export * from "./css";

// Compilation Pipeline (LOC 6175-8472) - V2 Complete Implementation
export {
  createCompilationPipeline,
  type CompilationPipeline,
  type ModuleResult,
  type StaticFileResult,
} from "./pipeline/compilation-pipeline";
export {
  sealBuild,
  type SealedBuild,
  type SealOptions,
} from "./pipeline/build-seal";
export {
  buildCache,
  getOrCreatePendingPromise,
  extractStaticFilesForSW,
  buildFilePathMapping,
  type CachedBuild,
} from "./pipeline/build-helpers";
// "use server" / "use client" directive handling
export {
  processDirectives,
  hasUseServerDirective,
  hasUseClientDirective,
  type DirectiveMetadata,
} from "./pipeline/use-server-transform";

// Static Assets & JSON (LOC 7269-7346)
export * from "./pipeline/static-assets-json";

// Build Sealing (LOC 7347-7547)
export * from "./pipeline/build-seal";

// Build Helpers (LOC 7972-8002)
export * from "./pipeline/build-helpers";
