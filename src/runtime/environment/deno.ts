/**
 * Deno Runtime Compatibility Layer
 * Source: module_448763 (Lines 37,326-37,400)
 *
 * Provides a browser-compatible implementation of Deno runtime object.
 * Mirrors Node.js process for Deno compatibility.
 */

import { getCwd, getEnvVar, setEnvVar } from "./process";

// ============================================================================
// Types
// ============================================================================

/**
 * Deno environment interface
 */
interface DenoEnv {
  /**
   * Get environment variable
   * @param key - Variable name
   * @returns Variable value or undefined
   */
  get(key: string): string | undefined;

  /**
   * Set environment variable
   * @param key - Variable name
   * @param value - Variable value
   */
  set(key: string, value: string): void;

  /**
   * Convert environment to object
   * @returns All environment variables as object
   */
  toObject(): Record<string, string | undefined>;

  /**
   * Delete environment variable
   * @param key - Variable name
   */
  delete(key: string): void;

  /**
   * Check if environment variable exists
   * @param key - Variable name
   * @returns True if variable exists
   */
  has(key: string): boolean;
}

/**
 * Deno version information
 */
interface DenoVersion {
  deno: string;
  v8?: string;
  typescript?: string;
}

/**
 * Fake Deno runtime object
 */
interface FakeDeno {
  /**
   * Environment variables
   */
  env: DenoEnv;

  /**
   * Current working directory
   * @returns Directory path
   */
  cwd(): string;

  /**
   * Change working directory
   * @param path - Directory path
   */
  chdir?(path: string): void;

  /**
   * Deno version information
   */
  version: DenoVersion;

  /**
   * Exit the process
   * @param code - Exit code
   */
  exit?(code?: number): never;

  /**
   * Build information
   */
  build?: {
    target: string;
    arch: string;
    os: string;
  };
}

// ============================================================================
// Environment Implementation
// ============================================================================

/**
 * Create Deno environment object
 * Proxies to window.process.env
 *
 * @returns Deno env interface
 */
function createDenoEnv(): DenoEnv {
  return {
    get(key: string): string | undefined {
      return getEnvVar(key);
    },

    set(key: string, value: string): void {
      setEnvVar(key, value);
    },

    toObject(): Record<string, string | undefined> {
      if (typeof window === "undefined" || !window.process?.env) {
        return {};
      }

      // Convert proxy to plain object
      const env: Record<string, string | undefined> = {};
      for (const key in window.process.env) {
        env[key] = window.process.env[key];
      }
      return env;
    },

    delete(key: string): void {
      if (typeof window !== "undefined" && window.process?.env) {
        delete window.process.env[key];
      }
    },

    has(key: string): boolean {
      if (typeof window === "undefined" || !window.process?.env) {
        return false;
      }
      return key in window.process.env;
    },
  };
}

// ============================================================================
// Deno Object Creation
// ============================================================================

/**
 * Create the fake Deno runtime object
 *
 * @returns Fake Deno object
 */
export function createFakeDeno(): FakeDeno {
  const fakeDeno: FakeDeno = {
    // Environment variables (proxies to process.env)
    env: createDenoEnv(),

    // Current working directory (proxies to process.cwd)
    cwd: () => {
      if (typeof window !== "undefined" && window.process?.cwd) {
        return window.process.cwd();
      }
      return getCwd();
    },

    // Change directory (proxies to process.chdir)
    chdir: (path: string) => {
      if (typeof window !== "undefined" && window.process?.chdir) {
        window.process.chdir(path);
      }
    },

    // Version information
    version: {
      deno: "1.40.0",
      v8: "12.0.0",
      typescript: "5.3.0",
    },

    // Exit process (proxies to process.exit)
    exit: (code: number = 0) => {
      if (typeof window !== "undefined" && window.process?.exit) {
        return window.process.exit(code);
      }
      throw new Error(`Deno process exited with code ${code}`);
    },

    // Build information
    build: {
      target: "x86_64-unknown-linux-gnu",
      arch: "x86_64",
      os: "linux",
    },
  };

  return fakeDeno;
}

// ============================================================================
// Global Installation
// ============================================================================

/**
 * Install fake Deno as window.Deno
 * Should be called during initialization
 */
export function installDenoGlobal(): void {
  if (typeof window === "undefined") return;

  // Create and install Deno
  const deno = createFakeDeno();
  (window as any).Deno = deno;

  // Also expose as global for compatibility
  if (typeof globalThis !== "undefined") {
    (globalThis as any).Deno = deno;
  }
}

/**
 * Check if Deno global is installed
 *
 * @returns True if window.Deno exists
 */
export function isDenoInstalled(): boolean {
  return typeof window !== "undefined" && "Deno" in window;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if running in Deno runtime
 * Always returns false in browser (this is a fake)
 *
 * @returns False (not real Deno)
 */
export function isDeno(): boolean {
  return false;
}

/**
 * Get Deno version
 *
 * @returns Version string or undefined
 */
export function getDenoVersion(): string | undefined {
  if (typeof window === "undefined" || !window.Deno) {
    return undefined;
  }

  return window.Deno.version.deno;
}

// ============================================================================
// Type Augmentation
// ============================================================================

declare global {
  interface Window {
    Deno: FakeDeno;
  }

  // Deno namespace for compatibility
  namespace Deno {
    const env: DenoEnv;
    function cwd(): string;
    function chdir(path: string): void;
    function exit(code?: number): never;
    const version: DenoVersion;
    const build: {
      target: string;
      arch: string;
      os: string;
    };
  }
}

export type { FakeDeno, DenoEnv, DenoVersion };
