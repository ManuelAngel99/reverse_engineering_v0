/**
 * Execution Context
 * Source: Various modules (runtime utilities)
 *
 * Manages the execution context (server vs client) for React Server Components
 * and other runtime features that need to know where code is executing.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Execution context type
 */
export type ExecutionContext = "server" | "client";

// ============================================================================
// Context State
// ============================================================================

/**
 * Current execution context
 * Can be overridden for testing or special execution modes
 */
let currentContext: ExecutionContext | null = null;

// ============================================================================
// Context Detection
// ============================================================================

/**
 * Get the current execution context
 *
 * This determines whether code is running in a server context (RSC, middleware)
 * or client context (browser). This is used to:
 * - Validate server-only operations (like DNS, file system)
 * - Enforce RSC boundaries
 * - Enable/disable certain features based on context
 *
 * @returns Current execution context ("server" or "client")
 *
 * @example
 * ```typescript
 * if (getCurrentExecutionContext() === "server") {
 *   // Safe to use Node.js APIs
 *   const data = await fs.readFile('data.json');
 * } else {
 *   // Must use browser APIs
 *   const data = await fetch('/api/data');
 * }
 * ```
 */
export function getCurrentExecutionContext(): ExecutionContext {
  // If context was explicitly set, use that
  if (currentContext !== null) {
    return currentContext;
  }

  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    return "client";
  }

  // Check if we're in a Node.js environment
  if (typeof process !== "undefined" && process.versions?.node) {
    return "server";
  }

  // Default to client for safety (most restrictive)
  return "client";
}

/**
 * Set the execution context explicitly
 *
 * This is useful for:
 * - Testing (force server/client context)
 * - Special execution modes (SSR, middleware)
 * - Overriding automatic detection
 *
 * @param context - Context to set, or null to reset to automatic detection
 *
 * @example
 * ```typescript
 * // Force server context for testing
 * setExecutionContext("server");
 * // ... run tests ...
 * setExecutionContext(null); // Reset
 * ```
 */
export function setExecutionContext(context: ExecutionContext | null): void {
  currentContext = context;
}

/**
 * Check if currently in server context
 *
 * @returns True if in server context
 */
export function isServerContext(): boolean {
  return getCurrentExecutionContext() === "server";
}

/**
 * Check if currently in client context
 *
 * @returns True if in client context
 */
export function isClientContext(): boolean {
  return getCurrentExecutionContext() === "client";
}

/**
 * Execute a function in a specific context
 *
 * This temporarily sets the context, executes the function,
 * then restores the previous context.
 *
 * @param context - Context to execute in
 * @param fn - Function to execute
 * @returns Result of the function
 *
 * @example
 * ```typescript
 * const result = executeInContext("server", () => {
 *   // This code thinks it's running on the server
 *   return performServerOperation();
 * });
 * ```
 */
export function executeInContext<T>(context: ExecutionContext, fn: () => T): T {
  const previousContext = currentContext;
  currentContext = context;

  try {
    return fn();
  } finally {
    currentContext = previousContext;
  }
}

/**
 * Execute a function in server context
 *
 * @param fn - Function to execute
 * @returns Result of the function
 */
export function executeInServerContext<T>(fn: () => T): T {
  return executeInContext("server", fn);
}

/**
 * Execute a function in client context
 *
 * @param fn - Function to execute
 * @returns Result of the function
 */
export function executeInClientContext<T>(fn: () => T): T {
  return executeInContext("client", fn);
}

// ============================================================================
// RSC Execution
// ============================================================================

/**
 * Execute a React Server Component function
 *
 * This wraps the execution in a server context and handles
 * any special RSC requirements.
 *
 * @param fn - RSC function to execute
 * @returns Promise resolving to the result
 *
 * @example
 * ```typescript
 * const result = await executeRSC(async () => {
 *   const data = await fetchData();
 *   return <Component data={data} />;
 * });
 * ```
 */
export async function executeRSC<T>(fn: () => T | Promise<T>): Promise<T> {
  return executeInServerContext(() => {
    const result = fn();
    return result instanceof Promise ? result : Promise.resolve(result);
  });
}

// ============================================================================
// Context Guards
// ============================================================================

/**
 * Assert that code is running in server context
 *
 * @param message - Error message if assertion fails
 * @throws Error if not in server context
 */
export function assertServerContext(message?: string): void {
  if (!isServerContext()) {
    throw new Error(
      message || "This operation can only be performed in server context"
    );
  }
}

/**
 * Assert that code is running in client context
 *
 * @param message - Error message if assertion fails
 * @throws Error if not in client context
 */
export function assertClientContext(message?: string): void {
  if (!isClientContext()) {
    throw new Error(
      message || "This operation can only be performed in client context"
    );
  }
}
