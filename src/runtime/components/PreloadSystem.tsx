/**
 * Preload System
 * Source: module_448763 (Lines 8003-8013)
 *
 * Implements generation preloading using React's Activity component.
 * Allows preloading the next generation in the background while
 * keeping the current generation visible.
 */

import React, { Suspense, Fragment, type ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

export interface PreloadSystemProps {
  /** Current generation ID */
  currentId: string;
  /** Preloaded generation ID */
  preloadedId: string;
  /** Current generation runtime content */
  currentRuntime: ReactNode;
  /** Preloaded generation runtime content */
  preloadedRuntime: ReactNode;
}

// ============================================================================
// Activity Component Polyfill
// ============================================================================

/**
 * Activity component for managing visibility of preloaded content
 *
 * React's experimental Activity component keeps content in memory
 * while hiding it from the DOM. This allows instant switching
 * between generations.
 *
 * If Activity is not available, we fall back to conditional rendering.
 */
interface ActivityProps {
  mode: "visible" | "hidden";
  children: ReactNode;
}

// Check if React has Activity (experimental)
const Activity =
  (React as any).Activity ||
  (({ mode, children }: ActivityProps) => {
    // Fallback: use CSS visibility for hidden mode
    if (mode === "hidden") {
      return (
        <div style={{ display: "none" }} aria-hidden="true">
          {children}
        </div>
      );
    }
    return <>{children}</>;
  });

// ============================================================================
// Preload System Component
// ============================================================================

/**
 * Preload System Component
 *
 * Manages two generations simultaneously:
 * - Current: The actively displayed generation
 * - Preloaded: The next generation being prepared in the background
 *
 * When currentId matches preloadedId, the preloaded content becomes visible
 * and the current content is hidden (instant switch).
 *
 * @param props - Preload system props
 * @returns Array of Activity-wrapped content
 */
export function PreloadSystem({
  currentId,
  preloadedId,
  currentRuntime,
  preloadedRuntime,
}: PreloadSystemProps): ReactNode[] {
  // Check if we should show the preloaded content
  const showPreloaded = currentId === preloadedId;

  return [
    // Current generation
    <Activity
      key={showPreloaded ? "_" : currentId}
      mode={showPreloaded ? "hidden" : "visible"}
    >
      <Suspense fallback={null}>{currentRuntime}</Suspense>
    </Activity>,

    // Preloaded generation
    <Activity key={preloadedId} mode={showPreloaded ? "visible" : "hidden"}>
      <Suspense fallback={null}>{preloadedRuntime}</Suspense>
    </Activity>,
  ];
}

// ============================================================================
// Preload Hooks
// ============================================================================

/**
 * State for preload management
 */
export interface PreloadState {
  /** Current generation ID */
  currentId: string;
  /** Preloaded generation ID (empty if none) */
  preloadedId: string;
  /** Current runtime content */
  currentRuntime: ReactNode;
  /** Preloaded runtime content */
  preloadedRuntime: ReactNode;
}

/**
 * Create initial preload state
 *
 * @param initialId - Initial generation ID
 * @returns Initial preload state
 */
export function createInitialPreloadState(initialId: string): PreloadState {
  return {
    currentId: initialId,
    preloadedId: "",
    currentRuntime: null,
    preloadedRuntime: null,
  };
}

/**
 * Switch to a preloaded generation
 *
 * @param state - Current preload state
 * @param newId - ID of generation to switch to
 * @returns Updated preload state
 */
export function switchGeneration(
  state: PreloadState,
  newId: string
): PreloadState {
  // If switching to the preloaded generation, make it current
  if (newId === state.preloadedId) {
    return {
      currentId: newId,
      preloadedId: "",
      currentRuntime: state.preloadedRuntime,
      preloadedRuntime: null,
    };
  }

  // Otherwise just update the current ID
  return {
    ...state,
    currentId: newId,
  };
}

/**
 * Set preloaded content
 *
 * @param state - Current preload state
 * @param preloadedId - Preloaded generation ID
 * @param preloadedRuntime - Preloaded runtime content
 * @returns Updated preload state
 */
export function setPreloadedContent(
  state: PreloadState,
  preloadedId: string,
  preloadedRuntime: ReactNode
): PreloadState {
  return {
    ...state,
    preloadedId,
    preloadedRuntime,
  };
}

/**
 * Set current runtime content
 *
 * @param state - Current preload state
 * @param currentRuntime - Current runtime content
 * @returns Updated preload state
 */
export function setCurrentRuntime(
  state: PreloadState,
  currentRuntime: ReactNode
): PreloadState {
  return {
    ...state,
    currentRuntime,
  };
}

// ============================================================================
// Exports
// ============================================================================

export default PreloadSystem;
