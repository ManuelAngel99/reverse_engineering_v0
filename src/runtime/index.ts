/**
 * Runtime Bundle
 * Source: 0eea3dbce56890c9.js (module_608367 + module_342947)
 *
 * The v0 runtime system providing Next.js compatibility, routing,
 * error handling, and communication infrastructure.
 */

// Communication (LOC 4307-4429)
export * from "./communication/iframe-comm";
export {
  initChannel,
  createNamespacedChannel,
  getChannel,
  send,
  receive,
  type Channel,
} from "./communication/bidc";

// Error Boundaries
export { createErrorPage, ErrorPage } from "./error-boundaries/error-page";

// Logging
export { interceptConsole } from "./logging/console-intercept";
export { initErrorReporter } from "./logging/error-reporter";

// Service Worker
export {
  registerServiceWorker,
  sendInitToSW,
  waitForSWReady,
  type ResourceRequest,
  type ResourceResponse,
} from "./service-worker/registration";

// Environment (LOC 37,326-37,400) ✅ COMPLETED
// Note: Execution context functions moved to context/execution-context
export {
  initializeEnvironment,
  switchContext,
  type EnvironmentOptions,
} from "./environment/globals";
export {
  installProcessGlobal,
  isProcessInstalled,
  updateEnvVars,
  setEnvVarsFromArray,
  type FakeProcess,
} from "./environment/process";
export * from "./environment/deno";

// Storage (LOC 7789-7898, 36,200-36,306) ✅ COMPLETED
export * from "./storage";

// Asset Utilities (LOC 4470-4517) ✅ COMPLETED
export * from "./assets/utilities";

// HMR Utilities (LOC 4430-4469) ✅ COMPLETED
export * from "./hmr/utilities";

// Module Utilities (includes navigation utilities)
export * from "./modules/utilities";

// Components
export * from "./components/boundaries";

// Preload System (LOC 8003-8013) ✅ Phase 5
export {
  PreloadSystem,
  createInitialPreloadState,
  switchGeneration,
  setPreloadedContent,
  setCurrentRuntime,
  type PreloadSystemProps,
  type PreloadState,
} from "./components/PreloadSystem";

// Main Runtime (LOC 8014-8470) ✅ Phase 5
export {
  MainRuntime,
  ClientEntry,
  type MainRuntimeProps,
  type FileMapping,
} from "./components/MainRuntime";

// Execution Context ✅ COMPLETED
export * from "./context/execution-context";
