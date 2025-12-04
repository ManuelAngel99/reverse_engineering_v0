/**
 * Sandboxed localStorage
 * Source: module_448763 (Lines 7789-7898, 43384-43493)
 *
 * Proxy-based localStorage replacement that isolates preview storage from parent window.
 * Syncs with parent via postMessage for persistence across iframe reloads.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * localStorage message types
 */
type LocalStorageMessageType =
  | "localStorage-init-request"
  | "localStorage-update"
  | "localStorage-store-update";

/**
 * Message to request initial localStorage state from parent
 */
interface LocalStorageInitRequest {
  type: "localStorage-init-request";
}

/**
 * Message to send localStorage updates to parent
 */
interface LocalStorageUpdate {
  type: "localStorage-update";
  map: Array<[string, string]>;
}

/**
 * Message from parent with localStorage state
 */
interface LocalStorageStoreUpdate {
  type: "localStorage-store-update";
  map: Array<[string, string]>;
}

/**
 * Union of all localStorage message types
 */
type LocalStorageMessage =
  | LocalStorageInitRequest
  | LocalStorageUpdate
  | LocalStorageStoreUpdate;

// ============================================================================
// Configuration
// ============================================================================

/**
 * Allowed parent origins for localStorage sync
 * Only these origins can send/receive localStorage data
 */
const ALLOWED_ORIGINS = [
  "https://v0.dev",
  "https://v0.app",
  "http://localhost:3000",
  "http://localhost:4444", // Local development
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4444",
];

/**
 * Check if origin is allowed
 *
 * @param origin - Origin to check
 * @returns True if origin is allowed
 */
function isOriginAllowed(origin: string): boolean {
  // Check exact matches
  if (ALLOWED_ORIGINS.includes(origin)) {
    return true;
  }

  // Check wildcard patterns (*.vercel.sh)
  if (origin.endsWith(".vercel.sh")) {
    return true;
  }

  return false;
}

// ============================================================================
// Storage State
// ============================================================================

/**
 * In-memory storage map
 * Replaces real localStorage
 */
const storageMap = new Map<string, string>();

/**
 * Flag to track if initial state has been received
 */
let isInitialized = false;

/**
 * Queue of operations to apply after initialization
 */
const pendingOperations: Array<() => void> = [];

// ============================================================================
// Storage Event Simulation
// ============================================================================

/**
 * Dispatch a storage event to simulate localStorage behavior
 * This allows listeners to react to storage changes
 *
 * @param key - Storage key that changed
 * @param newValue - New value (null if removed)
 * @param oldValue - Previous value (null if new)
 */
function dispatchStorageEvent(
  key: string | null,
  newValue: string | null,
  oldValue: string | null
): void {
  if (typeof window === "undefined") return;

  try {
    const event = new StorageEvent("storage", {
      key,
      newValue,
      oldValue,
      storageArea: null, // Sandboxed, not real localStorage
      url: window.location.href,
    });

    window.dispatchEvent(event);
  } catch (error) {
    console.warn("[v0] Failed to dispatch storage event:", error);
  }
}

// ============================================================================
// Parent Communication
// ============================================================================

/**
 * Send localStorage update to parent window
 * Persists changes across iframe reloads
 */
function notifyParent(): void {
  if (typeof window === "undefined" || !window.parent) return;

  // Convert map to array for serialization
  const mapArray = Array.from(storageMap.entries());

  // Find allowed origin
  const origin = ALLOWED_ORIGINS.find((o) =>
    window.location.ancestorOrigins
      ? Array.from(window.location.ancestorOrigins).includes(o)
      : true
  );

  if (!origin && !window.location.ancestorOrigins) {
    // Fallback: try all allowed origins
    ALLOWED_ORIGINS.forEach((allowedOrigin) => {
      try {
        window.parent.postMessage(
          {
            type: "localStorage-update",
            map: mapArray,
          } as LocalStorageUpdate,
          allowedOrigin
        );
      } catch (error) {
        // Ignore errors for wrong origins
      }
    });
    return;
  }

  try {
    window.parent.postMessage(
      {
        type: "localStorage-update",
        map: mapArray,
      } as LocalStorageUpdate,
      origin || "*"
    );
  } catch (error) {
    console.warn("[v0] Failed to notify parent of localStorage change:", error);
  }
}

/**
 * Request initial localStorage state from parent
 */
function requestInitialState(): void {
  if (typeof window === "undefined" || !window.parent) return;

  ALLOWED_ORIGINS.forEach((origin) => {
    try {
      window.parent.postMessage(
        {
          type: "localStorage-init-request",
        } as LocalStorageInitRequest,
        origin
      );
    } catch (error) {
      // Ignore errors for wrong origins
    }
  });
}

/**
 * Handle localStorage state update from parent
 *
 * @param data - Message data with storage map
 */
function handleStoreUpdate(data: LocalStorageStoreUpdate): void {
  // Clear existing storage
  storageMap.clear();

  // Load state from parent
  if (data.map && Array.isArray(data.map)) {
    data.map.forEach(([key, value]) => {
      storageMap.set(key, value);
    });
  }

  // Mark as initialized
  isInitialized = true;

  // Apply pending operations
  pendingOperations.forEach((op) => op());
  pendingOperations.length = 0;
}

// ============================================================================
// Sandboxed localStorage Implementation
// ============================================================================

/**
 * Sandboxed localStorage object
 * Implements the Storage interface
 */
const sandboxedLocalStorage: Storage = {
  /**
   * Get item from storage
   *
   * @param key - Storage key
   * @returns Value or null if not found
   */
  getItem(key: string): string | null {
    return storageMap.get(key) ?? null;
  },

  /**
   * Set item in storage
   *
   * @param key - Storage key
   * @param value - Value to store
   */
  setItem(key: string, value: string): void {
    const oldValue = storageMap.get(key) ?? null;
    const newValue = String(value);

    storageMap.set(key, newValue);

    // Notify parent
    notifyParent();

    // Dispatch storage event
    dispatchStorageEvent(key, newValue, oldValue);
  },

  /**
   * Remove item from storage
   *
   * @param key - Storage key
   */
  removeItem(key: string): void {
    const oldValue = storageMap.get(key) ?? null;

    storageMap.delete(key);

    // Notify parent
    notifyParent();

    // Dispatch storage event
    dispatchStorageEvent(key, null, oldValue);
  },

  /**
   * Clear all items from storage
   */
  clear(): void {
    storageMap.clear();

    // Notify parent
    notifyParent();

    // Dispatch storage event (key=null means clear)
    dispatchStorageEvent(null, null, null);
  },

  /**
   * Get storage key at index
   *
   * @param index - Index of key
   * @returns Key or null if index out of bounds
   */
  key(index: number): string | null {
    const keys = Array.from(storageMap.keys());
    return keys[index] ?? null;
  },

  /**
   * Get number of items in storage
   */
  get length(): number {
    return storageMap.size;
  },
};

// ============================================================================
// Message Listener
// ============================================================================

/**
 * Listen for localStorage messages from parent
 */
function setupMessageListener(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("message", (event) => {
    // Validate origin
    if (!isOriginAllowed(event.origin)) {
      return;
    }

    const data = event.data;

    // Handle localStorage store update
    if (data && data.type === "localStorage-store-update") {
      handleStoreUpdate(data as LocalStorageStoreUpdate);
    }
  });
}

// ============================================================================
// Installation
// ============================================================================

/**
 * Install sandboxed localStorage as window.localStorage
 * Replaces the native localStorage with our proxy
 */
export function installSandboxedLocalStorage(): void {
  if (typeof window === "undefined") return;

  try {
    // Replace window.localStorage
    Object.defineProperty(window, "localStorage", {
      value: sandboxedLocalStorage,
      writable: false,
      configurable: false,
      enumerable: true,
    });

    // Setup message listener
    setupMessageListener();

    // Request initial state from parent
    requestInitialState();
  } catch (error) {
    console.error("[v0] Failed to install sandboxed localStorage:", error);
  }
}

/**
 * Check if sandboxed localStorage is installed
 *
 * @returns True if installed
 */
export function isSandboxedLocalStorageInstalled(): boolean {
  if (typeof window === "undefined") return false;

  try {
    // Check if our sandboxed version is installed
    return window.localStorage === sandboxedLocalStorage;
  } catch {
    return false;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all storage entries as an object
 *
 * @returns Object with all key-value pairs
 */
export function getAllStorageEntries(): Record<string, string> {
  const entries: Record<string, string> = {};
  storageMap.forEach((value, key) => {
    entries[key] = value;
  });
  return entries;
}

/**
 * Get storage size in bytes (approximate)
 *
 * @returns Approximate size in bytes
 */
export function getStorageSize(): number {
  let size = 0;
  storageMap.forEach((value, key) => {
    size += key.length + value.length;
  });
  return size * 2; // Approximate (UTF-16)
}

/**
 * Check if storage is initialized
 *
 * @returns True if initial state received from parent
 */
export function isStorageInitialized(): boolean {
  return isInitialized;
}

/**
 * Manually set storage state (for testing)
 *
 * @param entries - Key-value pairs to set
 */
export function setStorageState(entries: Record<string, string>): void {
  storageMap.clear();
  Object.entries(entries).forEach(([key, value]) => {
    storageMap.set(key, value);
  });
  isInitialized = true;
}

/**
 * Export storage state for debugging
 *
 * @returns Array of [key, value] tuples
 */
export function exportStorageState(): Array<[string, string]> {
  return Array.from(storageMap.entries());
}

// ============================================================================
// Exports
// ============================================================================

export { sandboxedLocalStorage };
export type {
  LocalStorageMessage,
  LocalStorageUpdate,
  LocalStorageStoreUpdate,
};
