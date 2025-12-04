/**
 * Hot Module Replacement (HMR) Utilities
 * Source: 0eea3dbce56890c9.js (Lines 4430-4438)
 *
 * Utilities for managing HMR state and async component tracking.
 * Enables hot reloading of components without losing state.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * HMR state tracking
 */
interface HMRState {
  /** Pending async promises during HMR */
  pendingPromises: Promise<any>[] | null;
  /** Whether HMR is currently active */
  isActive: boolean;
}

// ============================================================================
// State
// ============================================================================

/**
 * Global HMR state
 */
const hmrState: HMRState = {
  pendingPromises: null,
  isActive: false,
};

// ============================================================================
// HMR Control Functions
// ============================================================================

/**
 * Start HMR tracking
 *
 * This should be called before loading new code during hot module replacement.
 * It initializes the promise tracking array to collect all async operations
 * that need to complete before the HMR update is considered done.
 *
 * @example
 * ```typescript
 * // Before applying HMR update
 * startHMR();
 *
 * // Load new code...
 * await loadNewModules();
 *
 * // Wait for all async operations
 * await stopHMR();
 * ```
 */
export function startHMR(): void {
  hmrState.pendingPromises = [];
  hmrState.isActive = true;
}

/**
 * Stop HMR tracking and wait for pending operations
 *
 * This should be called after loading new code during hot module replacement.
 * It waits for all tracked async operations to complete, then clears the
 * tracking state.
 *
 * @returns Promise that resolves when all pending operations complete
 *
 * @example
 * ```typescript
 * // After loading new code
 * await stopHMR();
 *
 * // Now safe to render updated components
 * renderApp();
 * ```
 */
export async function stopHMR(): Promise<void> {
  if (hmrState.pendingPromises) {
    // Wait for all pending promises to settle (resolve or reject)
    await Promise.allSettled(hmrState.pendingPromises);

    // Clear tracking state
    hmrState.pendingPromises = null;
  }

  hmrState.isActive = false;
}

/**
 * Track a promise during HMR
 *
 * This is called internally by async component loaders to register
 * promises that need to complete before HMR is done.
 *
 * @param promise - Promise to track
 */
export function trackHMRPromise(promise: Promise<any>): void {
  if (hmrState.pendingPromises) {
    hmrState.pendingPromises.push(promise);
  }
}

/**
 * Check if HMR is currently active
 *
 * @returns True if HMR is in progress
 */
export function isHMRActive(): boolean {
  return hmrState.isActive;
}

/**
 * Get count of pending HMR promises
 *
 * @returns Number of pending promises, or 0 if HMR not active
 */
export function getPendingHMRCount(): number {
  return hmrState.pendingPromises?.length ?? 0;
}

/**
 * Force stop HMR without waiting
 *
 * This immediately clears HMR state without waiting for promises.
 * Use with caution - prefer stopHMR() in most cases.
 */
export function forceStopHMR(): void {
  hmrState.pendingPromises = null;
  hmrState.isActive = false;
}

// ============================================================================
// HMR Lifecycle Hooks
// ============================================================================

/**
 * HMR lifecycle callback type
 */
export type HMRCallback = () => void | Promise<void>;

/**
 * HMR lifecycle hooks
 */
const hmrHooks = {
  beforeUpdate: [] as HMRCallback[],
  afterUpdate: [] as HMRCallback[],
  onError: [] as ((error: Error) => void)[],
};

/**
 * Register a callback to run before HMR update
 *
 * @param callback - Function to call before update
 * @returns Unregister function
 */
export function onBeforeHMRUpdate(callback: HMRCallback): () => void {
  hmrHooks.beforeUpdate.push(callback);
  return () => {
    const index = hmrHooks.beforeUpdate.indexOf(callback);
    if (index > -1) {
      hmrHooks.beforeUpdate.splice(index, 1);
    }
  };
}

/**
 * Register a callback to run after HMR update
 *
 * @param callback - Function to call after update
 * @returns Unregister function
 */
export function onAfterHMRUpdate(callback: HMRCallback): () => void {
  hmrHooks.afterUpdate.push(callback);
  return () => {
    const index = hmrHooks.afterUpdate.indexOf(callback);
    if (index > -1) {
      hmrHooks.afterUpdate.splice(index, 1);
    }
  };
}

/**
 * Register an error handler for HMR failures
 *
 * @param callback - Function to call on error
 * @returns Unregister function
 */
export function onHMRError(callback: (error: Error) => void): () => void {
  hmrHooks.onError.push(callback);
  return () => {
    const index = hmrHooks.onError.indexOf(callback);
    if (index > -1) {
      hmrHooks.onError.splice(index, 1);
    }
  };
}

/**
 * Execute HMR lifecycle hooks
 *
 * @param phase - Lifecycle phase
 * @param error - Error if in error phase
 */
async function executeHMRHooks(
  phase: "before" | "after",
  error?: Error
): Promise<void> {
  const hooks =
    phase === "before" ? hmrHooks.beforeUpdate : hmrHooks.afterUpdate;

  for (const hook of hooks) {
    try {
      await hook();
    } catch (err) {
      console.error(`HMR ${phase} hook error:`, err);
      if (error) {
        hmrHooks.onError.forEach((handler) => handler(error));
      }
    }
  }
}

/**
 * Perform a complete HMR update cycle
 *
 * This is a high-level function that handles the full HMR lifecycle:
 * 1. Execute before hooks
 * 2. Start HMR tracking
 * 3. Execute update function
 * 4. Stop HMR and wait for async operations
 * 5. Execute after hooks
 *
 * @param updateFn - Function that performs the actual update
 * @returns Promise that resolves when update is complete
 *
 * @example
 * ```typescript
 * await performHMRUpdate(async () => {
 *   // Load new modules
 *   await import('./updated-module.js');
 *
 *   // Update component registry
 *   updateComponentRegistry();
 * });
 * ```
 */
export async function performHMRUpdate(
  updateFn: () => Promise<void>
): Promise<void> {
  try {
    // Execute before hooks
    await executeHMRHooks("before");

    // Start HMR tracking
    startHMR();

    // Perform the update
    await updateFn();

    // Wait for all async operations
    await stopHMR();

    // Execute after hooks
    await executeHMRHooks("after");
  } catch (error) {
    // Handle errors
    const err = error instanceof Error ? error : new Error(String(error));
    hmrHooks.onError.forEach((handler) => handler(err));

    // Force stop HMR on error
    forceStopHMR();

    throw error;
  }
}

// ============================================================================
// Exports
// ============================================================================

export { hmrState };
