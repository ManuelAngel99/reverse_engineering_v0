/**
 * Environment Globals Orchestrator
 * Source: module_448763 (Lines 37,326-37,400)
 *
 * Coordinates installation of all fake runtime globals (process, Deno, Buffer, etc.)
 * Provides a single entry point for setting up the browser environment.
 */

import {
  installProcessGlobal,
  isProcessInstalled,
  setExecutionContext,
  updateEnvVars,
  setEnvVarsFromArray,
  type FakeProcess,
} from "./process";

import { installDenoGlobal, isDenoInstalled, type FakeDeno } from "./deno";

// ============================================================================
// Types
// ============================================================================

/**
 * Environment initialization options
 */
export interface EnvironmentOptions {
  /**
   * Execution context (server or client)
   * @default "client"
   */
  context?: "server" | "client";

  /**
   * Initial environment variables
   */
  envVars?: Record<string, string>;

  /**
   * Current working directory
   * @default "/"
   */
  cwd?: string;

  /**
   * Install process global
   * @default true
   */
  installProcess?: boolean;

  /**
   * Install Deno global
   * @default true
   */
  installDeno?: boolean;

  /**
   * Install Buffer global
   * @default false
   */
  installBuffer?: boolean;
}

/**
 * Environment status
 */
export interface EnvironmentStatus {
  processInstalled: boolean;
  denoInstalled: boolean;
  bufferInstalled: boolean;
  context: "server" | "client";
}

// ============================================================================
// Installation
// ============================================================================

/**
 * Initialize all environment globals
 * Sets up fake Node.js and Deno runtime objects
 *
 * @param options - Initialization options
 */
export function initializeEnvironment(options: EnvironmentOptions = {}): void {
  const {
    context = "client",
    envVars = {},
    cwd = "/",
    installProcess = true,
    installDeno = true,
    installBuffer = false,
  } = options;

  // Set execution context
  setExecutionContext(context);

  // Install process global
  if (installProcess && !isProcessInstalled()) {
    installProcessGlobal();
  }

  // Install Deno global
  if (installDeno && !isDenoInstalled()) {
    installDenoGlobal();
  }

  // Install Buffer global (if needed)
  if (installBuffer && typeof window !== "undefined" && !window.Buffer) {
    // Buffer polyfill would go here
    // For now, we'll skip this as it's rarely needed
    console.warn("[v0] Buffer polyfill not yet implemented");
  }

  // Set initial environment variables
  if (Object.keys(envVars).length > 0) {
    updateEnvVars(envVars);
  }

  // Set current working directory
  if (cwd !== "/" && typeof window !== "undefined" && window.process?.chdir) {
    window.process.chdir(cwd);
  }
}

/**
 * Reset all environment globals
 * Removes installed globals and resets state
 */
export function resetEnvironment(): void {
  if (typeof window === "undefined") return;

  // Remove globals
  delete (window as any).process;
  delete (window as any).Deno;
  delete (window as any).Buffer;

  // Also remove from globalThis
  if (typeof globalThis !== "undefined") {
    delete (globalThis as any).process;
    delete (globalThis as any).Deno;
    delete (globalThis as any).Buffer;
  }
}

// ============================================================================
// Status & Inspection
// ============================================================================

/**
 * Get current environment status
 *
 * @returns Environment status object
 */
export function getEnvironmentStatus(): EnvironmentStatus {
  return {
    processInstalled: isProcessInstalled(),
    denoInstalled: isDenoInstalled(),
    bufferInstalled: typeof window !== "undefined" && "Buffer" in window,
    context:
      typeof window !== "undefined" && window.process
        ? "client" // We can't easily detect this, default to client
        : "client",
  };
}

/**
 * Check if environment is initialized
 *
 * @returns True if at least process is installed
 */
export function isEnvironmentInitialized(): boolean {
  return isProcessInstalled();
}

// ============================================================================
// Environment Variable Management
// ============================================================================

/**
 * Update environment variables at runtime
 * Can be called after initialization
 *
 * @param envVars - Environment variables to update
 */
export function updateEnvironmentVars(envVars: Record<string, string>): void {
  updateEnvVars(envVars);
}

/**
 * Set environment variables from parent message
 * Handles array format from postMessage
 *
 * @param envVars - Array of {key, value} objects
 */
export function setEnvironmentVarsFromMessage(
  envVars: Array<{ key: string; value: string }>
): void {
  setEnvVarsFromArray(envVars);
}

// ============================================================================
// Context Management
// ============================================================================

/**
 * Switch execution context
 * Affects environment variable access control
 *
 * @param context - New execution context
 */
export function switchContext(context: "server" | "client"): void {
  setExecutionContext(context);
}

// ============================================================================
// Exports
// ============================================================================

// Re-export from sub-modules for convenience
export {
  // Process
  installProcessGlobal,
  isProcessInstalled,
  setExecutionContext,
  getExecutionContext,
  updateEnvVars,
  setEnvVarsFromArray,
  clearEnvVars,
  getCwd,
  setCwd,
  isServer,
  isClient,
  getEnvVar,
  setEnvVar,
  type FakeProcess,
} from "./process";

export {
  // Deno
  installDenoGlobal,
  isDenoInstalled,
  isDeno,
  getDenoVersion,
  type FakeDeno,
} from "./deno";
