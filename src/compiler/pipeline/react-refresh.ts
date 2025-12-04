/**
 * React Refresh Runtime Wrapper
 * Source: module_448763 (Lines 809-826)
 *
 * Wraps compiled code with React Refresh (HMR) runtime for hot module replacement.
 * Preserves component state during development.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Options for generating React Refresh wrapper
 */
export interface ReactRefreshWrapperOptions {
  /** Module path/ID */
  modulePath: string;
  /** Compiled code to wrap */
  code: string;
  /** Whether to include source map comment */
  includeSourceMap?: boolean;
  /** Source map (base64 encoded) */
  sourceMap?: string;
}

// ============================================================================
// Runtime Wrapper Generation
// ============================================================================

/**
 * Generate React Refresh runtime wrapper
 * Wraps compiled code with HMR registration and signature functions
 *
 * @param options - Wrapper options
 * @returns Wrapped code with HMR runtime
 */
export function generateReactRefreshWrapper(
  options: ReactRefreshWrapperOptions
): string {
  const { modulePath, code, includeSourceMap = false, sourceMap } = options;

  // Escape module path for JSON
  const escapedPath = JSON.stringify(modulePath);

  // Build wrapper
  const wrapper = `
// React Refresh Runtime Wrapper
var prevRefreshReg = self.__v0_$RefreshReg$;
var prevRefreshSig = self.__v0_$RefreshSig$;

self.__v0_$RefreshReg$ = (type, id) => {
  id = ${escapedPath} + ' ' + id;
  self.__v0_rscRefreshRegister(type, id);
  self.__v0_refreshRuntime.register(type, id);
};

self.__v0_$RefreshSig$ = typeof __v0_refreshRuntime !== 'undefined' 
  ? __v0_refreshRuntime.createSignatureFunctionForTransform 
  : () => (type) => type;

${code}

self.__v0_$RefreshReg$ = prevRefreshReg;
self.__v0_$RefreshSig$ = prevRefreshSig;
`.trim();

  // Add source map if provided
  if (includeSourceMap && sourceMap) {
    return `${wrapper}\n//# sourceMappingURL=data:application/json;base64,${sourceMap}`;
  }

  return wrapper;
}

/**
 * Generate minimal HMR preamble for non-React files
 * Provides no-op functions for files that don't use React
 *
 * @param modulePath - Module path/ID
 * @returns Minimal preamble code
 */
export function generateMinimalHMRPreamble(modulePath: string): string {
  const escapedPath = JSON.stringify(modulePath);

  return `
// Minimal HMR Preamble
self.__v0_$RefreshReg$ = self.__v0_$RefreshReg$ || (() => {});
self.__v0_$RefreshSig$ = self.__v0_$RefreshSig$ || (() => (type) => type);
`.trim();
}

// ============================================================================
// React Refresh Detection
// ============================================================================

/**
 * Check if code contains React components that need HMR
 * Looks for common React patterns
 *
 * @param code - Source code to check
 * @returns True if code appears to use React
 */
export function needsReactRefresh(code: string): boolean {
  // Check for React imports
  if (
    code.includes("from 'react'") ||
    code.includes('from "react"') ||
    code.includes("require('react')") ||
    code.includes('require("react")')
  ) {
    return true;
  }

  // Check for JSX
  if (code.includes("jsxDEV") || code.includes("jsx(")) {
    return true;
  }

  // Check for React hooks
  const reactHooks = [
    "useState",
    "useEffect",
    "useContext",
    "useReducer",
    "useCallback",
    "useMemo",
    "useRef",
    "useImperativeHandle",
    "useLayoutEffect",
    "useDebugValue",
  ];

  for (const hook of reactHooks) {
    if (code.includes(hook)) {
      return true;
    }
  }

  // Check for component exports
  if (
    /export\s+(default\s+)?function\s+[A-Z]/.test(code) ||
    /export\s+(default\s+)?const\s+[A-Z]/.test(code)
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// HMR Accept/Decline
// ============================================================================

/**
 * Generate HMR accept code
 * Allows module to be hot-reloaded
 *
 * @param modulePath - Module path
 * @param callback - Optional callback on accept
 * @returns HMR accept code
 */
export function generateHMRAccept(
  modulePath: string,
  callback?: string
): string {
  const escapedPath = JSON.stringify(modulePath);

  if (callback) {
    return `
if (module.hot) {
  module.hot.accept(${escapedPath}, ${callback});
}
`.trim();
  }

  return `
if (module.hot) {
  module.hot.accept();
}
`.trim();
}

/**
 * Generate HMR decline code
 * Prevents module from being hot-reloaded
 *
 * @param modulePath - Module path
 * @returns HMR decline code
 */
export function generateHMRDecline(modulePath: string): string {
  const escapedPath = JSON.stringify(modulePath);

  return `
if (module.hot) {
  module.hot.decline(${escapedPath});
}
`.trim();
}

// ============================================================================
// RSC Refresh Registration
// ============================================================================

/**
 * Generate RSC (React Server Components) refresh registration
 * Registers server components for HMR
 *
 * @param modulePath - Module path
 * @param componentName - Component name
 * @returns RSC registration code
 */
export function generateRSCRefreshRegistration(
  modulePath: string,
  componentName: string
): string {
  const escapedPath = JSON.stringify(modulePath);
  const escapedName = JSON.stringify(componentName);

  return `
if (typeof self.__v0_rscRefreshRegister === 'function') {
  self.__v0_rscRefreshRegister(${escapedName}, ${escapedPath});
}
`.trim();
}

// ============================================================================
// Refresh Runtime Initialization
// ============================================================================

/**
 * Generate code to initialize React Refresh runtime
 * Should be called once at application startup
 *
 * @returns Initialization code
 */
export function generateRefreshRuntimeInit(): string {
  return `
// Initialize React Refresh Runtime
if (typeof window !== 'undefined' && !window.__v0_refreshRuntime) {
  // Refresh runtime should be loaded separately
  console.warn('[v0] React Refresh runtime not found');
}

// Initialize registration functions
if (typeof self.__v0_$RefreshReg$ === 'undefined') {
  self.__v0_$RefreshReg$ = () => {};
}

if (typeof self.__v0_$RefreshSig$ === 'undefined') {
  self.__v0_$RefreshSig$ = () => (type) => type;
}

// Initialize RSC registration
if (typeof self.__v0_rscRefreshRegister === 'undefined') {
  self.__v0_rscRefreshRegister = () => {};
}
`.trim();
}

/**
 * Generate code to perform React Refresh
 * Triggers a refresh of all registered components
 *
 * @returns Refresh trigger code
 */
export function generateRefreshTrigger(): string {
  return `
// Trigger React Refresh
if (typeof window !== 'undefined' && window.__v0_refreshRuntime) {
  window.__v0_refreshRuntime.performReactRefresh();
}
`.trim();
}

// ============================================================================
// Exports
// ============================================================================

// All exports are already declared above with export keyword
