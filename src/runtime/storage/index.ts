/**
 * Storage Module
 *
 * Orchestrates sandboxed storage systems (localStorage, cookies)
 * for the v0 preview iframe.
 */

import {
  installSandboxedLocalStorage,
  isSandboxedLocalStorageInstalled,
  type LocalStorageMessage,
} from "./localStorage";

import {
  installCookieDocument,
  isCookieDocumentInstalled,
  type CookieDocument,
} from "./cookies";

// ============================================================================
// Types
// ============================================================================

/**
 * Storage initialization options
 */
export interface StorageOptions {
  /**
   * Install sandboxed localStorage
   * @default true
   */
  installLocalStorage?: boolean;

  /**
   * Install sandboxed cookie document
   * @default true
   */
  installCookies?: boolean;
}

/**
 * Storage status
 */
export interface StorageStatus {
  localStorageInstalled: boolean;
  cookiesInstalled: boolean;
}

// ============================================================================
// Installation
// ============================================================================

/**
 * Initialize all storage systems
 * Sets up sandboxed localStorage and cookie document
 *
 * @param options - Initialization options
 */
export function initializeStorage(options: StorageOptions = {}): void {
  const { installLocalStorage = true, installCookies = true } = options;

  // Install localStorage
  if (installLocalStorage && !isSandboxedLocalStorageInstalled()) {
    installSandboxedLocalStorage();
  }

  // Install cookie document
  if (installCookies && !isCookieDocumentInstalled()) {
    installCookieDocument();
  }
}

/**
 * Get storage system status
 *
 * @returns Storage status object
 */
export function getStorageStatus(): StorageStatus {
  return {
    localStorageInstalled: isSandboxedLocalStorageInstalled(),
    cookiesInstalled: isCookieDocumentInstalled(),
  };
}

/**
 * Check if storage is initialized
 *
 * @returns True if at least localStorage is installed
 */
export function isStorageInitialized(): boolean {
  return isSandboxedLocalStorageInstalled();
}

// ============================================================================
// Re-exports
// ============================================================================

// localStorage
export {
  installSandboxedLocalStorage,
  isSandboxedLocalStorageInstalled,
  sandboxedLocalStorage,
  getAllStorageEntries,
  getStorageSize,
  isStorageInitialized as isLocalStorageInitialized,
  setStorageState,
  exportStorageState,
  type LocalStorageUpdate,
  type LocalStorageStoreUpdate,
} from "./localStorage";

// Cookies
export {
  installCookieDocument,
  isCookieDocumentInstalled,
  __v0_cookie_doc,
  applyCookiesFromMiddleware,
  getAllCookies,
  getAllCookieDetails,
  setCookieState,
  exportCookieState,
  type ParsedCookie,
} from "./cookies";

// Types
export type { LocalStorageMessage, CookieDocument };
