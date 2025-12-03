/**
 * Visual Editing Utilities
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 419-506)
 *
 * Provides optimistic visual changes for the DevTools inspector.
 * Changes can be applied and reverted without modifying the actual code.
 */

import type { VisualChange, OptimisticVisualChange } from "@/shared/types/runtime";

// ============================================================================
// State Management
// ============================================================================

let globalLockedElement: HTMLElement | SVGElement | null = null;
let changeStack: VisualChange[] = [];

/**
 * Sets the currently locked element for visual editing
 */
export function setGlobalLockedElement(
  element: HTMLElement | SVGElement | null
): void {
  globalLockedElement = element;
}

// ============================================================================
// Optimistic Visual Changes (lines 432-479)
// ============================================================================

/**
 * Applies optimistic visual changes to elements
 * These changes are tracked and can be reverted
 */
export function optimisticApplyVisualChanges(
  change: OptimisticVisualChange
): void {
  if (change.type !== "css-var" && !globalLockedElement) {
    return;
  }

  switch (change.type) {
    case "class": {
      if (!globalLockedElement) return;

      const newClasses = new Set(change.value!.split(" "));
      const oldClasses = new Set(change.prev!.split(" "));
      const addedClasses: string[] = [];
      const removedClasses: string[] = [];

      // Remove old classes
      for (const cls of oldClasses) {
        if (cls.trim() && !newClasses.has(cls)) {
          globalLockedElement.classList.remove(cls);
          removedClasses.push(cls);
        }
      }

      // Add new classes
      for (const cls of newClasses) {
        if (cls.trim() && !oldClasses.has(cls)) {
          globalLockedElement.classList.add(cls);
          addedClasses.push(cls);
        }
      }

      if (addedClasses.length > 0 || removedClasses.length > 0) {
        changeStack.push({
          type: "class",
          element: globalLockedElement,
          addedClasses,
          removedClasses,
        });
      }
      break;
    }

    case "content": {
      if (!globalLockedElement) return;

      const originalContent = globalLockedElement.textContent || "";
      const newContent = change.value!;

      changeStack.push({
        type: "content",
        element: globalLockedElement,
        originalContent,
      });

      globalLockedElement.textContent = newContent;
      break;
    }

    case "css-var": {
      const { variable, value } = change;
      const originalValue =
        document.documentElement.style.getPropertyValue(variable!) || null;

      changeStack.push({
        type: "css-var",
        variable: variable!,
        originalValue,
      });

      document.documentElement.style.setProperty(variable!, value!);
      break;
    }

    case "image": {
      if (!globalLockedElement) return;

      const imgElement = globalLockedElement as HTMLImageElement;
      const originalSrc = imgElement.src || "";
      const newSrc = change.src!;

      changeStack.push({
        type: "image",
        element: globalLockedElement as HTMLImageElement,
        originalSrc,
      });

      imgElement.src = newSrc;
      break;
    }
  }
}

// ============================================================================
// Revert Changes (lines 480-506)
// ============================================================================

/**
 * Reverts all optimistic visual changes in reverse order
 */
export function revertOptimisticVisualChanges(): void {
  // Process changes in reverse order (LIFO)
  for (let i = changeStack.length - 1; i >= 0; i--) {
    const change = changeStack[i];

    switch (change.type) {
      case "css-var":
        if (change.originalValue !== null) {
          document.documentElement.style.setProperty(
            change.variable,
            change.originalValue
          );
        } else {
          document.documentElement.style.removeProperty(change.variable);
        }
        break;

      case "class":
        // Remove added classes
        for (const cls of change.addedClasses) {
          change.element.classList.remove(cls);
        }
        // Restore removed classes
        for (const cls of change.removedClasses) {
          change.element.classList.add(cls);
        }
        break;

      case "content":
        change.element.textContent = change.originalContent;
        break;

      case "image":
        change.element.src = change.originalSrc;
        break;
    }
  }

  // Clear the stack
  changeStack = [];
}

// ============================================================================
// Style Constants (lines 409-418)
// ============================================================================

/**
 * CSS to fix pointer events on SVG elements
 */
export const visualEditingStyles = (
  <style
    dangerouslySetInnerHTML={{
      __html: `\
.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:initial}
div:has(> [data-v0-devtool-dropdown-menu]){z-index:2147483645 !important}`,
    }}
  />
);

/**
 * CSS to show crosshair cursor during element selection
 */
export const visualEditingCursorStyles = (
  <style
    dangerouslySetInnerHTML={{ __html: "*{cursor:crosshair !important}" }}
  />
);
