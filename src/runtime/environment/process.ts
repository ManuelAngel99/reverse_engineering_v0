/**
 * Fake Node.js Process Environment
 * Source: module_448763 (Lines 37,326-37,400)
 *
 * Provides a browser-compatible implementation of Node.js process object.
 * Includes environment variable access control and process metadata.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Process environment variables with access control
 */
interface ProcessEnv {
  NODE_ENV: string;
  VERCEL: string;
  NEXT_RUNTIME: string;
  [key: string]: string | undefined;
}

/**
 * Fake Node.js process object
 */
interface FakeProcess {
  env: ProcessEnv;
  cwd: () => string;
  chdir: (dir: string) => void;
  exit: (code?: number) => never;
  version: string;
  platform: string;
  arch: string;
  argv: string[];
  execPath: string;
  pid: number;
}

// ============================================================================
// State
// ============================================================================

/**
 * Current working directory
 * Tracks the simulated CWD for the fake process
 */
let currentDir = "/";

/**
 * User-provided environment variables
 * Merged with default env vars
 */
let userEnvVars: Record<string, string> = {};

/**
 * Execution context (server or client)
 * Determines env var access control
 */
let executionContext: "server" | "client" = "client";

// ============================================================================
// Environment Variable Proxy
// ============================================================================

/**
 * Create a proxied environment object with access control
 * Warns when non-NEXT_PUBLIC_ variables are accessed on the client
 *
 * @param baseEnv - Base environment variables
 * @returns Proxied environment object
 */
function createEnvProxy(baseEnv: Record<string, string>): ProcessEnv {
  return new Proxy(baseEnv, {
    get(target, key) {
      // Allow symbol access (for internal operations)
      if (typeof key === "symbol") {
        return target[key as any];
      }

      // Convert key to string
      const keyStr = String(key);

      // On client, warn if accessing non-NEXT_PUBLIC_ variables
      if (
        executionContext === "client" &&
        !keyStr.startsWith("NEXT_PUBLIC_") &&
        keyStr !== "NODE_ENV" &&
        keyStr !== "VERCEL" &&
        keyStr !== "NEXT_RUNTIME"
      ) {
        console.warn(
          `[v0] Environment variable "${keyStr}" cannot be accessed on the client. ` +
            `Only NEXT_PUBLIC_* variables are available in the browser.`
        );
        return undefined;
      }

      return target[keyStr];
    },

    set(target, key, value) {
      if (typeof key === "string") {
        target[key] = String(value);
        return true;
      }
      return false;
    },

    has(target, key) {
      return typeof key === "string" && key in target;
    },

    ownKeys(target) {
      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  }) as ProcessEnv;
}

// ============================================================================
// Process Object Creation
// ============================================================================

/**
 * Create the fake Node.js process object
 *
 * @returns Fake process object
 */
export function createFakeProcess(): FakeProcess {
  // Base environment variables
  const baseEnv: Record<string, string> = {
    NODE_ENV: "development",
    VERCEL: "1",
    NEXT_RUNTIME: "edge",
    ...userEnvVars,
  };

  const fakeProcess: FakeProcess = {
    // Environment variables with access control
    env: createEnvProxy(baseEnv),

    // Current working directory
    cwd: () => currentDir,

    // Change directory
    chdir: (dir: string) => {
      if (typeof dir !== "string") {
        throw new TypeError("The 'path' argument must be of type string");
      }
      currentDir = dir;
    },

    // Exit process (throws error in browser)
    exit: (code: number = 0) => {
      throw new Error(`Process exited with code ${code}`);
    },

    // Node.js version
    version: "v20.0.0",

    // Platform (fake Linux for consistency)
    platform: "linux",

    // Architecture
    arch: "x64",

    // Command line arguments
    argv: ["/usr/bin/node", "/app/page.tsx"],

    // Executable path
    execPath: "/usr/bin/node",

    // Process ID
    pid: 1,
  };

  return fakeProcess;
}

// ============================================================================
// Environment Management
// ============================================================================

/**
 * Set the execution context (server or client)
 * Affects environment variable access control
 *
 * @param context - Execution context
 */
export function setExecutionContext(context: "server" | "client"): void {
  executionContext = context;
}

/**
 * Get the current execution context
 *
 * @returns Current execution context
 */
export function getExecutionContext(): "server" | "client" {
  return executionContext;
}

/**
 * Update user environment variables
 * Merges with existing env vars
 *
 * @param envVars - Environment variables to add/update
 */
export function updateEnvVars(envVars: Record<string, string>): void {
  Object.assign(userEnvVars, envVars);

  // Update process.env if it exists
  if (typeof window !== "undefined" && window.process?.env) {
    Object.assign(window.process.env, envVars);
  }
}

/**
 * Set environment variables from array format
 * Used by parent window messages
 *
 * @param envVars - Array of {key, value} objects
 */
export function setEnvVarsFromArray(
  envVars: Array<{ key: string; value: string }>
): void {
  const envObj = envVars.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  updateEnvVars(envObj);
}

/**
 * Clear all user environment variables
 */
export function clearEnvVars(): void {
  userEnvVars = {};
}

/**
 * Get current working directory
 *
 * @returns Current directory path
 */
export function getCwd(): string {
  return currentDir;
}

/**
 * Set current working directory
 *
 * @param dir - Directory path
 */
export function setCwd(dir: string): void {
  currentDir = dir;
}

// ============================================================================
// Global Installation
// ============================================================================

/**
 * Install fake process as window.process
 * Should be called during initialization
 */
export function installProcessGlobal(): void {
  if (typeof window === "undefined") return;

  // Create and install process
  const process = createFakeProcess();
  (window as any).process = process;

  // Also expose as global for compatibility
  if (typeof globalThis !== "undefined") {
    (globalThis as any).process = process;
  }
}

/**
 * Check if process global is installed
 *
 * @returns True if window.process exists
 */
export function isProcessInstalled(): boolean {
  return typeof window !== "undefined" && "process" in window;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if running in server context
 * Based on execution context setting
 *
 * @returns True if in server context
 */
export function isServer(): boolean {
  return executionContext === "server";
}

/**
 * Check if running in client context
 *
 * @returns True if in client context
 */
export function isClient(): boolean {
  return executionContext === "client";
}

/**
 * Get environment variable safely
 * Returns undefined if not accessible in current context
 *
 * @param key - Environment variable name
 * @returns Variable value or undefined
 */
export function getEnvVar(key: string): string | undefined {
  if (typeof window === "undefined" || !window.process?.env) {
    return undefined;
  }

  return window.process.env[key];
}

/**
 * Set environment variable
 *
 * @param key - Environment variable name
 * @param value - Variable value
 */
export function setEnvVar(key: string, value: string): void {
  updateEnvVars({ [key]: value });
}

// ============================================================================
// Type Augmentation
// ============================================================================

declare global {
  interface Window {
    process: FakeProcess;
  }

  namespace NodeJS {
    interface Process extends FakeProcess {}
  }
}

export type { FakeProcess, ProcessEnv };
