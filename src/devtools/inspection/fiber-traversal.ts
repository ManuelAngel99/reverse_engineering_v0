/**
 * React Fiber Tree Utilities
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 1428-1576)
 *
 * Utilities for traversing and inspecting React's internal fiber tree.
 * Used by DevTools to find source information and related elements.
 */

import type { JSXSourceInfo, ClassNameInfo, InlineEditInfo } from "@/shared/types/runtime";
import { INLINE_EDIT_FORMATS } from "./inlineEditFormats";

// ============================================================================
// Types
// ============================================================================

interface ReactFiber {
  return: ReactFiber | null;
  child: ReactFiber | null;
  sibling: ReactFiber | null;
  alternate: ReactFiber | null;
  stateNode: any;
  memoizedProps: any;
  actualStartTime: number;
}

// Weak map to cache element IDs
const elementIdCache = new WeakMap<HTMLElement | SVGElement, string>();

// Global React root cache
let cachedReactRoot: ReactFiber | null = null;
let relatedElementsCache = new Map<string, Set<HTMLElement | SVGElement>>();

// ============================================================================
// React Fiber Discovery (lines 1428-1441)
// ============================================================================

/**
 * Gets the React fiber node for a DOM element
 * Supports multiple methods: DevTools hook, legacy _reactRootContainer, and __reactFiber keys
 */
export function getFiberFromElement(
  element: HTMLElement | SVGElement
): ReactFiber | null {
  // Try React DevTools hook first
  if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in window) {
    const { renderers } = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    for (const renderer of renderers.values()) {
      try {
        const fiber = renderer.findFiberByHostInstance(element);
        if (fiber) return fiber;
      } catch (e) {
        // Renderer might not support this element
      }
    }
  }

  // Try legacy React root container
  if ("_reactRootContainer" in element) {
    return (element as any)._reactRootContainer._internalRoot.current.child;
  }

  // Try fiber key on element
  for (const key in element) {
    if (key.startsWith("__reactFiber")) {
      return (element as any)[key];
    }
  }

  return null;
}

// ============================================================================
// Tree Traversal (lines 1442-1453)
// ============================================================================

/**
 * Traverses the fiber tree and calls callback for each node
 */
export function traverseFiberTree(
  fiber: ReactFiber | null,
  callback: (fiber: ReactFiber) => void
): null {
  if (!fiber) return null;

  callback(fiber);

  let child = fiber.child;
  while (child) {
    traverseFiberTree(child, callback);
    child = child.sibling;
  }

  return null;
}

/**
 * Finds the root fiber node by traversing up the tree
 */
export function getRootFiber(fiber: ReactFiber | null): ReactFiber | null {
  if (!fiber) return null;
  while (fiber.return) {
    fiber = fiber.return;
  }
  return fiber;
}

// ============================================================================
// Element & State Node Helpers (lines 1454-1462)
// ============================================================================

/**
 * Gets the DOM element (stateNode) from a fiber, traversing children if needed
 */
export function getElementFromFiber(
  fiber: ReactFiber | null
): HTMLElement | SVGElement | null {
  if (!fiber) return null;

  if (fiber.stateNode) {
    return fiber.stateNode;
  }

  if (fiber.child) {
    return getElementFromFiber(fiber.child);
  }

  return null;
}

// ============================================================================
// Source Information Extraction (lines 1563-1570, 1571-1575)
// ============================================================================

/**
 * Extracts JSX source information from fiber props
 * Returns combined __v0_s and __v0_e metadata
 */
export function getSourceFromFiber(fiber: ReactFiber): JSXSourceInfo | null {
  const props = fiber?.memoizedProps;
  if (!props || !props.__v0_s || !props.__v0_e) {
    return null;
  }

  return {
    ...props.__v0_s,
    ...props.__v0_e,
  };
}

/**
 * Gets the most recent fiber version (alternate tracking)
 */
export function getLatestFiber(fiber: ReactFiber): ReactFiber {
  if (
    fiber.alternate &&
    fiber.alternate.actualStartTime > fiber.actualStartTime
  ) {
    return fiber.alternate;
  }
  return fiber;
}

// ============================================================================
// Class Name Information (lines 1546-1559)
// ============================================================================

/**
 * Extracts className metadata from fiber props
 */
export function getClassNameInfo(
  fiber: ReactFiber | null
): ClassNameInfo | null {
  if (!fiber) return null;

  const props = getLatestFiber(fiber).memoizedProps;
  if (!props || !props.__v0_c) {
    return null;
  }

  return {
    defined: !props.__v0_m,
    parts: props.__v0_c.map((part: [number, number, string]) => ({
      lineNumber: Number(part[0]),
      columnNumber: Number(part[1]),
      value: part[2],
    })),
  };
}

// ============================================================================
// Inline Edit Information (lines 1499-1541)
// ============================================================================

// Temporary textarea for HTML entity decoding
let tempTextarea: HTMLTextAreaElement | null = null;

/**
 * Extracts inline edit information from fiber tree
 * Finds editable text content with source mapping
 */
export function getInlineEditInfo(
  fiber: ReactFiber,
  element: HTMLElement | SVGElement | null
): [ReactFiber, string] | null {
  if (!fiber) return null;

  element = fiber.stateNode || element;

  const props = getLatestFiber(fiber).memoizedProps;

  // Check if this fiber has inline edit metadata
  if (props?.__v0_i && props?.__v0_s) {
    const formatData = props.__v0_i;
    const formats =
      typeof formatData === "string"
        ? [formatData]
        : Array.isArray(formatData)
        ? formatData
        : null;
    const textContent = element?.textContent;
    let matchedFormat: string | null = null;

    if (typeof textContent === "string" && formats) {
      for (const format of formats) {
        const [typeCode, line, column, ...rest] = format.split(":");
        const rawValue = rest.join(":").trim();
        const formatType = INLINE_EDIT_FORMATS[parseInt(typeCode)];

        // Decode the expected value based on format type
        let expectedValue: string;
        if (formatType === "jsxText") {
          // Decode HTML entities
          if (!tempTextarea) {
            tempTextarea = document.createElement("textarea");
          }
          tempTextarea.innerHTML = rawValue;
          expectedValue = tempTextarea.value;
        } else if (formatType === "string") {
          // Unescape string literal
          expectedValue = rawValue.slice(1, -1).replace(/\\n/g, "\n");
        } else {
          // Template literal
          expectedValue = rawValue.slice(1, -1);
        }

        // Normalize and unescape
        expectedValue = expectedValue
          .replace(/(?<!\\)\\(['"`$])/g, "$1")
          .trim();
        if (formatType === "jsxText") {
          expectedValue = expectedValue.replace(/\n\s+/g, " ").trim();
        }

        // Check if content matches
        if (textContent.trim() === expectedValue) {
          const length =
            formatType === "jsxText" ? rawValue.length : rawValue.length - 2;
          matchedFormat = [typeCode, line, column, length, expectedValue].join(
            ":"
          );
          break;
        }
      }
    }

    if (matchedFormat) {
      return [getLatestFiber(fiber), matchedFormat];
    }
  }

  // Recurse up the tree
  return getInlineEditInfo(fiber.return!, element);
}

// ============================================================================
// Main Element Information Getter (lines 1463-1562)
// ============================================================================

export interface ElementInspectionResult {
  source: JSXSourceInfo;
  targetElement: HTMLElement | SVGElement;
  inlineEdit: InlineEditInfo | null;
  className: ClassNameInfo | null;
  relatedElements: Set<HTMLElement | SVGElement>;
}

/**
 * Gets comprehensive information about an element for DevTools
 */
export function getElementInfo(
  element: HTMLElement | SVGElement
): ElementInspectionResult | null {
  // Find fiber with __v0_s metadata
  const fiberResult = (function findSourceFiber(
    fiber: ReactFiber | null,
    targetElement: HTMLElement | SVGElement | null
  ): [ReactFiber, HTMLElement | SVGElement] | null {
    if (!fiber) return null;

    // Track closest stateNode as we traverse
    if (
      fiber.stateNode &&
      (fiber.stateNode instanceof HTMLElement ||
        fiber.stateNode instanceof SVGElement)
    ) {
      targetElement = fiber.stateNode;
    }

    const props = getLatestFiber(fiber).memoizedProps;
    if (props?.__v0_s) {
      return [getLatestFiber(fiber), targetElement!];
    }

    return findSourceFiber(fiber.return, targetElement);
  })(getFiberFromElement(element), null);

  if (!fiberResult) return null;

  const [fiber, targetElement] = fiberResult;
  const source = getSourceFromFiber(fiber);
  if (!source) return null;

  // Build cache key
  const cacheKey = `${source.fileName}:${source.lineNumber}:${source.columnNumber}`;

  // Get or build related elements set
  let relatedElements: Set<HTMLElement | SVGElement>;
  if (relatedElementsCache.has(cacheKey)) {
    relatedElements = relatedElementsCache.get(cacheKey)!;
  } else {
    const root = cachedReactRoot || (cachedReactRoot = getRootFiber(fiber));
    relatedElements = new Set();
    relatedElementsCache.set(cacheKey, relatedElements);
    relatedElements.add(targetElement);

    // Find all elements with same source location
    traverseFiberTree(root, (currentFiber) => {
      const currentSource = getSourceFromFiber(currentFiber);
      if (
        currentSource &&
        currentSource.fileName === source.fileName &&
        currentSource.lineNumber === source.lineNumber &&
        currentSource.columnNumber === source.columnNumber
      ) {
        const elem = getElementFromFiber(currentFiber);
        if (elem && elem.isConnected) {
          relatedElements.add(elem);
        }
      }
    });
  }

  // Get inline edit info
  const inlineEditData = getInlineEditInfo(fiber, targetElement);
  const inlineEdit =
    inlineEditData && inlineEditData[1]
      ? {
          source: getSourceFromFiber(inlineEditData[0])!,
          format: inlineEditData[1],
        }
      : null;

  return {
    source,
    targetElement,
    inlineEdit,
    className: getClassNameInfo(fiber),
    relatedElements,
  };
}

// ============================================================================
// Cache Management
// ============================================================================

/**
 * Resets all caches (called when component tree changes)
 */
export function resetCaches(): void {
  cachedReactRoot = null;
  relatedElementsCache = new Map();
}

/**
 * Gets or creates a stable ID for an element
 */
export function getElementId(element: HTMLElement | SVGElement): string {
  let id = elementIdCache.get(element);
  if (!id) {
    id = Math.random().toString(36).slice(2);
    elementIdCache.set(element, id);
  }
  return id;
}

/**
 * Sets a specific ID for an element (used when tracking moved elements)
 */
export function setElementId(
  element: HTMLElement | SVGElement,
  id: string
): void {
  elementIdCache.set(element, id);
}
