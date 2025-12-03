/**
 * DevTools Provider Component
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 790-1427)
 *
 * Main orchestrator for the v0 DevTools system. Handles:
 * - Element selection and hover tracking
 * - Keyboard shortcuts
 * - Inline content editing
 * - Parent frame communication
 * - Theme switching
 * - Context menu management
 */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { sendToParent } from "@/runtime/communication/iframe-comm";
import { ElementOverlay } from "../overlay/ElementOverlay";
import { TailwindVarDetector } from "../tailwind/token-detection";
import { getExtraElementInfo } from "../tailwind/token-detection";
import { getElementInfo, resetCaches, getElementId, setElementId } from "../inspection/element-info";
import { getElementBounds } from "../overlay/elementUtils";
import { visualEditingStyles, visualEditingCursorStyles } from "../editing/visual-changes";
import type { 
  ElementOverlayState, 
  JSXSourceInfo, 
  DevToolsContextMenuRef,
  ElementInspectionResult 
} from "@/shared/types/runtime";
import { startFetchCache, stopFetchCache } from "./fetchCache";

// ============================================================================
// Types
// ============================================================================

interface DevToolsProviderProps {
  enabled: boolean;
  fileMapping: Record<string, string>;
  sourceVersion: number;
  children: React.ReactNode;
  isV3?: boolean;
}

// Inline edit format type mapping
const INLINE_EDIT_TYPE_MAP: Record<string, "jsxText" | "string" | "template"> = {
  "0": "jsxText",
  "1": "string",
  "2": "template",
};

// Arrow keys for navigation
const ARROW_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

// Check if one rect is fully contained by another
const isContainedBy = (inner: DOMRect, outer: DOMRect): boolean =>
  inner.top >= outer.top &&
  inner.left >= outer.left &&
  inner.bottom <= outer.bottom &&
  inner.right <= outer.right;

// ============================================================================
// DevToolsProvider Component
// ============================================================================

export function DevToolsProvider({
  enabled,
  fileMapping,
  sourceVersion,
  children,
  isV3 = false,
}: DevToolsProviderProps) {
  // State: hover element (preview)
  const [hoverElement, setHoverElement] = useState<ElementOverlayState | null>(null);
  const hoverElementRef = useRef(hoverElement);

  // State: selected element (locked)
  const [selectedElement, setSelectedElement] = useState<ElementOverlayState | null>(null);
  const selectedElementRef = useRef(selectedElement);

  // State: content editing mode
  const [isContentEditing, setIsContentEditing] = useState(false);
  const isContentEditingRef = useRef(isContentEditing);

  // Ref: last hovered DOM element
  const lastHoveredDOMElement = useRef<HTMLElement | SVGElement | null>(null);

  // State: stale version tracking
  const [localVersion, setLocalVersion] = useState(0);
  const isStale = sourceVersion < localVersion;

  // Ref: prevent double inline edit submission
  const isSubmittingEdit = useRef(true);

  // Ref: context menu actions
  const contextMenuRef = useRef<DevToolsContextMenuRef>({
    open: false,
    copy: () => {},
    goto: () => {},
    delete: () => {},
    edit: () => {},
  });

  // State: hide overlay briefly after source version change
  const [hideOverlay, setHideOverlay] = useState(false);

  // Ref: file mapping
  const fileMappingRef = useRef(fileMapping);

  // Sync refs with state
  useEffect(() => {
    fileMappingRef.current = fileMapping;
  }, [fileMapping]);

  useEffect(() => {
    hoverElementRef.current = hoverElement;
  }, [hoverElement]);

  useEffect(() => {
    selectedElementRef.current = selectedElement;
  }, [selectedElement]);

  useEffect(() => {
    isContentEditingRef.current = isContentEditing;
  }, [isContentEditing]);

  // Reset caches and show overlay fade when source version changes
  useEffect(() => {
    resetCaches();
    const timer = setTimeout(() => setHideOverlay(false), 1500);
    setHideOverlay(true);
    return () => {
      clearTimeout(timer);
      setHideOverlay(false);
    };
  }, [sourceVersion]);

  // ========================================================================
  // Edit Mode Handlers
  // ========================================================================

  const handleStartEdit = useCallback(() => {
    const element = selectedElementRef.current || hoverElementRef.current;
    if (!element) return;

    const { inlineEdit, element: domElement } = element;

    if (selectedElementRef.current) {
      disableContentEditing(selectedElementRef.current.element);
    }

    if (inlineEdit) {
      setIsContentEditing(true);
      enableContentEditing(domElement);

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(domElement);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setTimeout(() => domElement.focus(), 0);
    } else {
      setIsContentEditing(false);
    }

    handleLockElement(element);
  }, []);

  // ========================================================================
  // Context Menu Actions
  // ========================================================================

  useEffect(() => {
    contextMenuRef.current.copy = (source: JSXSourceInfo) =>
      sendToParent({
        type: "devtools_copy",
        start: source.start,
        end: source.end,
        file: fileMappingRef.current[source.fileName],
      });

    contextMenuRef.current.delete = (source: JSXSourceInfo) =>
      sendToParent({
        type: "devtools_delete",
        start: source.start,
        end: source.end,
        jsxRoot: source.jsxRoot,
        file: fileMappingRef.current[source.fileName],
      });

    contextMenuRef.current.goto = (source: JSXSourceInfo) =>
      sendToParent({
        type: "devtools_goto",
        line: source.lineNumber,
        column: source.columnNumber,
        file: fileMappingRef.current[source.fileName],
      });

    contextMenuRef.current.edit = () => handleStartEdit();
  }, [handleStartEdit]);

  // ========================================================================
  // Fetch Cache Management
  // ========================================================================

  useEffect(() => {
    if (!enabled) {
      contextMenuRef.current.open = false;
    }
    if (enabled) {
      startFetchCache();
    } else {
      stopFetchCache();
    }
  }, [enabled]);

  // ========================================================================
  // Element Locking (Selection)
  // ========================================================================

  const handleLockElement = useCallback(
    (element: ElementOverlayState) => {
      if (isV3) {
        const { fileName, lineNumber, columnNumber } = element.source;
        sendToParent({
          type: "add-refinement-element",
          file: fileMappingRef.current[fileName],
          line: lineNumber,
          column: columnNumber,
          id: `${fileName}:${lineNumber}:${columnNumber}`,
        });
        return;
      }
      setSelectedElement(element);
    },
    [isV3]
  );

  // ========================================================================
  // Dev Mode Class Toggle
  // ========================================================================

  useEffect(() => {
    const body = document.body;
    if (enabled) {
      body.classList.add("v0-lite-dev");
    } else {
      body.classList.remove("v0-lite-dev");
    }
  }, [enabled]);

  // ========================================================================
  // Selected Element Recovery (after re-render)
  // ========================================================================

  useEffect(() => {
    if (!selectedElementRef.current) return;

    const { element, parent, source } = selectedElementRef.current;

    // If element still connected, no recovery needed
    if (element.isConnected) return;

    // Try to find element by source info (using Fiber)
    const recoveredInfo = getElementInfo(document.body);
    // ... (recovery logic would go here, simplified for now)

    // If we can't recover, deselect
    if (!recoveredInfo) {
      sendToParent({
        type: "devtools_selected_state",
        parts: null,
        selected: false,
        info: getExtraElementInfo(document.documentElement, true),
        version: sourceVersion,
      });
    }
  }, [sourceVersion]);

  // ========================================================================
  // Selected State Sync
  // ========================================================================

  const syncSelectedState = useCallback(() => {
    const source = selectedElement?.source;
    const domElement = selectedElement?.element;

    function sendDeselected() {
      const hasSelection = !!domElement;
      sendToParent({
        type: "devtools_selected_state",
        parts: null,
        selected: hasSelection,
        version: sourceVersion,
        info: getExtraElementInfo(document.documentElement, !hasSelection),
      });
    }

    if (source && domElement) {
      const file = fileMappingRef.current[source.fileName];
      const elementInfo = getElementInfo(domElement);
      const isDisconnected = !domElement.isConnected;

      if (!elementInfo) {
        if (!isDisconnected) sendDeselected();
        return;
      }

      const classInfo = elementInfo.className;
      if (!classInfo) {
        if (!isDisconnected) sendDeselected();
        return;
      }

      let contentInfo;
      if (elementInfo.inlineEdit) {
        const [typeCode, line, column, len, ...rest] = elementInfo.inlineEdit.format.split(":");
        contentInfo = {
          file: fileMappingRef.current[elementInfo.inlineEdit.source.fileName],
          line: Number(line),
          column: Number(column),
          len: Number(len),
          type: INLINE_EDIT_TYPE_MAP[typeCode],
          value: rest.join(":"),
        };
      }

      const currentSource = getElementInfo(domElement)?.source || source;
      sendToParent({
        type: "devtools_selected_state",
        parts: classInfo.parts,
        defined: classInfo.defined,
        info: getExtraElementInfo(domElement),
        file,
        content: contentInfo,
        key: getElementId(domElement),
        jsxRoot: currentSource.jsxRoot,
        name: currentSource.name,
        line: currentSource.lineNumber,
        column: currentSource.columnNumber,
        lib: currentSource.lib,
        start: currentSource.start,
        end: currentSource.end,
        version: sourceVersion,
      });
      return;
    }

    sendDeselected();
  }, [selectedElement, sourceVersion]);

  useEffect(() => {
    syncSelectedState();
  }, [syncSelectedState]);

  // ========================================================================
  // Bounds Update
  // ========================================================================

  const updateElementBounds = useCallback(() => {
    if (hoverElementRef.current) {
      const bounds = getElementBounds(hoverElementRef.current.element);
      setHoverElement((prev) =>
        prev ? { ...prev, ...bounds } : null
      );
    }
    if (selectedElementRef.current) {
      const bounds = getElementBounds(selectedElementRef.current.element);
      setSelectedElement((prev) =>
        prev ? { ...prev, ...bounds } : null
      );
    }
  }, []);

  useEffect(() => {
    updateElementBounds();
    setTimeout(updateElementBounds, 100);
  }, [sourceVersion]);

  // ========================================================================
  // Inline Edit Handlers
  // ========================================================================

  const handleClickDuringEdit = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleInputDuringEdit = useCallback(() => {
    updateElementBounds();
  }, [updateElementBounds]);

  const handleSpacebarInButton = useCallback((e: KeyboardEvent) => {
    if (e.key !== " " || e.defaultPrevented) return;
    e.preventDefault();
    e.stopPropagation();
    document.execCommand("insertText", false, " ");
  }, []);

  const submitInlineEdit = useCallback(() => {
    const element = selectedElementRef.current;
    if (!element) return;

    const { inlineEdit } = element;
    if (!inlineEdit || isSubmittingEdit.current) return;

    isSubmittingEdit.current = true;

    const { source, format } = inlineEdit;
    const [typeCode, line, column, len] = format.split(":");
    const file = fileMappingRef.current[source.fileName];
    const editType = INLINE_EDIT_TYPE_MAP[typeCode];

    let content =
      editType === "jsxText"
        ? element.element.innerHTML
        : editType === "string" || editType === "template"
        ? element.element.textContent
        : "";
    content = content || "";

    const timestamp = Date.now();
    setLocalVersion(timestamp);

    // Encode based on type
    let encoded = "";
    if (editType === "jsxText") {
      encoded = content;
    } else if (editType === "string") {
      encoded = JSON.stringify(content).slice(1, -1);
    } else if (editType === "template") {
      encoded = content.replace(/(?<!\\)['"`$]/g, "\\$&");
    }

    sendToParent({
      type: "inline_edit",
      file,
      line: Number(line),
      column: Number(column),
      len: Number(len),
      replace: encoded,
      version: timestamp,
    });

    setSelectedElement((prev) => {
      if (prev) disableContentEditing(prev.element);
      return null;
    });
  }, []);

  const disableContentEditing = useCallback(
    (element: HTMLElement | SVGElement) => {
      submitInlineEdit();
      if (element instanceof SVGElement) return;

      element.contentEditable =
        element.dataset.v0DevContentEditableOldValue || "false";
      window.getSelection()?.removeAllRanges();
      delete element.dataset.v0DevEditing;
      delete element.dataset.v0DevContentEditableOldValue;
      element.removeEventListener("click", handleClickDuringEdit);
      element.removeEventListener("focusout", submitInlineEdit);
      element.removeEventListener("input", handleInputDuringEdit);
      if (element.tagName === "BUTTON") {
        element.removeEventListener("keydown", handleSpacebarInButton);
      }
    },
    [handleClickDuringEdit, submitInlineEdit, handleInputDuringEdit, handleSpacebarInButton]
  );

  const enableContentEditing = useCallback(
    (element: HTMLElement | SVGElement) => {
      isSubmittingEdit.current = false;
      if (element instanceof SVGElement) return;

      element.dataset.v0DevContentEditableOldValue = element.contentEditable;
      element.contentEditable = "plaintext-only";
      element.dataset.v0DevEditing = "1";
      element.addEventListener("click", handleClickDuringEdit, { capture: true });
      element.addEventListener("focusout", submitInlineEdit);
      element.addEventListener("input", handleInputDuringEdit);
      if (element.tagName === "BUTTON") {
        element.addEventListener("keydown", handleSpacebarInButton);
      }
    },
    [handleClickDuringEdit, submitInlineEdit, handleInputDuringEdit, handleSpacebarInButton]
  );

  // ========================================================================
  // Element Discovery
  // ========================================================================

  const discoverElement = useCallback((domElement: HTMLElement | SVGElement) => {
    const info = getElementInfo(domElement);
    if (!info) return false;

    const { source, targetElement, inlineEdit, className, relatedElements } = info;

    if (
      targetElement !== hoverElementRef.current?.element &&
      (targetElement instanceof HTMLElement || targetElement instanceof SVGElement)
    ) {
      const bounds = getElementBounds(targetElement);
      return {
        ...bounds,
        source,
        inlineEdit,
        className,
        relatedElements,
      };
    }

    return undefined;
  }, []);

  // ========================================================================
  // Mouse/Touch Event Handlers
  // ========================================================================

  useEffect(() => {
    if (!enabled) {
      setHoverElement(null);
      setSelectedElement((prev) => {
        if (prev) disableContentEditing(prev.element);
        return null;
      });
      hoverElementRef.current = null;
      selectedElementRef.current = null;
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (hideOverlay) setHideOverlay(false);
      if (contextMenuRef.current.open) return;

      const target = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((el) => !el.getAttribute("data-v0-devtool-overlay"));

      if (!target) {
        setHoverElement(null);
        return;
      }

      if (lastHoveredDOMElement.current === target) return;
      lastHoveredDOMElement.current = target as HTMLElement | SVGElement;

      const discovered = discoverElement(target as HTMLElement | SVGElement);
      if (discovered === false) {
        setHoverElement(null);
      } else if (discovered !== undefined) {
        setHoverElement(discovered);
        hoverElementRef.current = discovered;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (contextMenuRef.current.open) return;
      const target = e.relatedTarget as Node;
      if (target && target.nodeName !== "HTML") return;

      setHoverElement(null);
      hoverElementRef.current = null;
      lastHoveredDOMElement.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (contextMenuRef.current.open) return;

      if (e.key === "Escape") {
        const element = selectedElementRef.current;
        if (element) {
          disableContentEditing(element.element);
          if (isContentEditingRef.current) {
            setIsContentEditing(false);
          } else {
            setSelectedElement(null);
          }
          e.preventDefault();
          e.stopPropagation();
        }
      } else if (e.key === "Backspace") {
        if (isContentEditingRef.current) return;
        const element = selectedElementRef.current;
        if (element) {
          setIsContentEditing(false);
          setSelectedElement(null);
          contextMenuRef.current.delete(element.source);
        }
      } else if (ARROW_KEYS.has(e.key)) {
        if (isContentEditingRef.current) return;
        const element = selectedElementRef.current;
        if (!element) return;

        e.preventDefault();
        const rect = element.element.getBoundingClientRect();
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let dx = 0;
        let dy = 0;

        switch (e.key) {
          case "ArrowUp":
            y = rect.top;
            dy = -5;
            break;
          case "ArrowDown":
            y = rect.bottom;
            dy = 5;
            break;
          case "ArrowLeft":
            x = rect.left;
            dx = -5;
            break;
          case "ArrowRight":
            x = rect.right;
            dx = 5;
            break;
        }

        const maxW = window.innerWidth;
        const maxH = window.innerHeight;
        const boundsCache = new WeakMap<Element, DOMRect>();

        for (let i = 0; i < 100; i++) {
          x += dx;
          y += dy;
          if (x < 0 || y < 0 || x > maxW || y > maxH) break;

          const elements = document.elementsFromPoint(x, y);
          if (elements.length === 0) continue;

          const target = elements[0];
          if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) continue;

          let targetRect = boundsCache.get(target);
          if (!targetRect) {
            targetRect = target.getBoundingClientRect();
            boundsCache.set(target, targetRect);
          }

          if (isContainedBy(targetRect, rect)) continue;

          const discovered = discoverElement(target);
          if (!discovered) break;

          setHoverElement(null);
          hoverElementRef.current = null;
          setSelectedElement(discovered);
          selectedElementRef.current = discovered;
          break;
        }
      } else if (e.key === "Enter") {
        if (isContentEditingRef.current) return;
        const element = selectedElementRef.current;
        if (!element) return;

        if (element.inlineEdit) {
          setIsContentEditing(true);
          enableContentEditing(element.element);
          element.element.focus();

          const range = document.createRange();
          range.selectNodeContents(element.element);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateElementBounds, { passive: true });
    window.addEventListener("scroll", updateElementBounds, { passive: true });

    const isTouchDevice = window.matchMedia("(hover:none)").matches;
    if (isTouchDevice) {
      document.addEventListener("pointerdown", handlePointerMove, { passive: true });
    } else {
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("mouseout", handleMouseOut, { passive: true });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateElementBounds);
      window.removeEventListener("scroll", updateElementBounds);

      if (isTouchDevice) {
        document.removeEventListener("pointerdown", handlePointerMove);
      } else {
        document.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [enabled, disableContentEditing, updateElementBounds, discoverElement, enableContentEditing, hideOverlay]);

  // ========================================================================
  // Global Keyboard Shortcut (Cmd/Alt + D)
  // ========================================================================

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "KeyD" &&
        (e.altKey || e.metaKey) &&
        (!(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) ||
          (e.target as HTMLElement).hasAttribute("data-v0-devtool-refinement"))
      ) {
        e.preventDefault();
        sendToParent({ type: "devtools_state", enabled: !enabled });
        return false;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [enabled]);

  // ========================================================================
  // Parent Message Listener
  // ========================================================================

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object" || !data.__v0_remote__) return;

      if (data.type === "devtools_deselect") {
        const element = selectedElementRef.current;
        if (element) {
          if (isContentEditingRef.current) {
            setIsContentEditing(false);
            disableContentEditing(element.element);
          }
          setSelectedElement(null);
        }
        setHoverElement(null);
        sendToParent({
          type: "devtools_selected_state",
          parts: null,
          selected: false,
          info: getExtraElementInfo(document.documentElement, true),
          version: sourceVersion,
        });
      } else if (data.type === "devtools_apply_theme") {
        const theme = data.payload?.theme;
        const root = document.documentElement;

        if (root.classList.contains("dark")) {
          root.classList.add("__v0-had-dark");
        } else {
          root.classList.add("__v0-no-dark");
        }

        if (theme === "dark" && !root.classList.contains("dark")) {
          root.classList.add(theme);
        } else if (theme === "light" && root.classList.contains("dark")) {
          root.classList.remove("dark");
        }
      } else if (data.type === "devtools_cleanup_theme") {
        const root = document.documentElement;
        const hadDark = root.classList.contains("__v0-had-dark");
        const noDark = root.classList.contains("__v0-no-dark");

        if (hadDark && !root.classList.contains("dark")) {
          root.classList.add("dark");
        } else if (noDark && root.classList.contains("dark")) {
          root.classList.remove("dark");
        }

        root.classList.remove("__v0-had-dark", "__v0-no-dark");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [disableContentEditing, sourceVersion]);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <>
      {children}
      {enabled && visualEditingStyles}
      {enabled && !isContentEditing && visualEditingCursorStyles}
      {isStale && (
        <style
          dangerouslySetInnerHTML={{
            __html: "*{cursor:progress !important}body{opacity:.8}",
          }}
        />
      )}
      {enabled && selectedElement && (
        <ElementOverlay
          {...selectedElement}
          contentEditingElement={isContentEditing ? selectedElement : null}
          fileMapping={fileMapping}
          locked={true}
          allowRefinement={!isContentEditing}
          contextMenuRef={contextMenuRef}
          hide={hideOverlay}
        />
      )}
      {enabled && hoverElement && (
        <ElementOverlay
          {...hoverElement}
          contentEditingElement={isContentEditing ? selectedElement : null}
          hoverStyle={hoverElement.element !== selectedElement?.element}
          locked={false}
          onClick={() => {
            if (selectedElement) {
              disableContentEditing(selectedElement.element);
            }
            if (isContentEditing) {
              setIsContentEditing(false);
            }
            handleLockElement(hoverElement);
          }}
          onDoubleClick={() => {
            handleStartEdit();
          }}
          contextMenuRef={contextMenuRef}
          hide={hideOverlay}
        />
      )}
      <TailwindVarDetector
        onViewportChange={() => {
          syncSelectedState();
        }}
      />
    </>
  );
}

export default DevToolsProvider;

