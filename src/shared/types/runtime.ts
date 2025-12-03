/**
 * Runtime Types
 *
 * Type definitions for the v0 runtime system including JSX, React components,
 * error boundaries, and communication.
 *
 * Source: module_448763 and module_608367
 */

import type { ReactNode, ReactElement, ComponentType } from "react";

// ============================================================================
// JSX & Metadata Types
// ============================================================================

/**
 * v0 DevTools metadata attached to JSX elements
 * These props are injected during compilation and used by DevTools
 */
export interface V0Metadata {
  /** Element information for DevTools (element name, source, etc) */
  __v0_e?: Record<string, any>;
  /** className locations in source code */
  __v0_c?: Array<[number, number, string]>;
  /** Missing className marker */
  __v0_m?: string;
  /** className ranges */
  __v0_r?: [number, number, number];
  /** Inner text locations */
  __v0_i?: string;
  /** Source location info */
  __v0_s?: any;
}

/**
 * Props for Slottable wrapper component
 */
export interface SlottableProps extends V0Metadata {
  children: ReactElement;
  key?: string | number;
}

/**
 * Marker interface for components that should not be wrapped in Slottable
 */
export interface NonSlottableComponent {
  __slottable?: false;
}

/**
 * Marker interface for client/server refs
 */
export interface ComponentRef {
  __client_ref?: boolean;
  __server_ref?: boolean;
}

/**
 * JSX element information
 */
export interface JSXElementInfo {
  start: number;
  end: number;
  name: string;
  jsxRoot?: boolean;
  lib?: {
    name: string;
    source: string;
    singleRef: boolean;
    declStart: number;
    declEnd: number;
    openAt: number;
    closeAt?: number;
    props?: Record<string, [string, number]>;
  };
}

// ============================================================================
// Error Handling Types
// ============================================================================

/**
 * Error boundary fallback props
 */
export interface ErrorFallbackProps {
  error: Error;
}

/**
 * Error boundary props
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ComponentType<ErrorFallbackProps>;
  id?: string;
}

/**
 * Thenable render props
 */
export interface RenderThenableProps {
  render: any; // Can be a promise, error, or value
}

// ============================================================================
// Communication Types
// ============================================================================

/**
 * Browser event data
 */
export interface BrowserEventData {
  type: string;
  key?: string;
}

/**
 * Parent message payload
 */
export interface ParentMessage {
  __v0_remote__: number;
  type: string;
  [key: string]: any;
}

// ============================================================================
// React 19 Specific Types
// ============================================================================

/**
 * Action state for useActionState hook (React 19)
 */
export type ActionState<T> = {
  pending: boolean;
  data?: T;
  error?: Error;
};

/**
 * Form action result type
 */
export type FormActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Optimistic state update function
 */
export type OptimisticUpdate<T> = (currentState: T, optimisticValue: T) => T;

// ============================================================================
// DevTools Types
// ============================================================================

/**
 * JSX source information from DevTools metadata
 */
export interface JSXSourceInfo {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  name: string;
  start: number;
  end: number;
  jsxRoot?: boolean;
  lib?: any;
}

/**
 * Class name information for DevTools
 */
export interface ClassNameInfo {
  defined: boolean;
  parts: Array<{
    lineNumber: number;
    columnNumber: number;
    value: string;
  }>;
}

/**
 * Inline edit information for DevTools
 */
export interface InlineEditInfo {
  source: JSXSourceInfo;
  format: string;
}

/**
 * Element overlay state for DevTools
 */
export interface ElementOverlayState {
  bounds: DOMRect;
  margin: [number, number, number, number];
  padding: [number, number, number, number];
  element: HTMLElement | SVGElement;
  parent: HTMLElement | null;
  id: string;
  source: JSXSourceInfo;
  inlineEdit?: InlineEditInfo | null;
  className?: ClassNameInfo | null;
  relatedElements: Set<HTMLElement | SVGElement>;
}

/**
 * DevTools context menu ref interface
 */
export interface DevToolsContextMenuRef {
  open: boolean;
  copy: (source: JSXSourceInfo) => void;
  goto: (source: JSXSourceInfo) => void;
  delete: (source: JSXSourceInfo) => void;
  edit: () => void;
}

/**
 * Console format type
 */
export type ConsoleFormatType = "s" | "i" | "d" | "f" | "o" | "O" | "c";

/**
 * Tailwind tokens
 */
export interface TailwindTokens {
  colors?: Record<string, string>;
}

/**
 * Design system tokens
 */
export interface DesignSystemTokens {
  default: Record<string, string>;
  dark: Record<string, string>;
  theme: Record<string, any>;
}

/**
 * Extra element information including computed styles
 */
export interface ElementExtraInfo {
  color: string;
  backgroundColor: string;
  borderColor: string;
  fontWeight: string;
  activeBreakpoint?: string;
  twTokens: TailwindTokens;
  dsTokens?: DesignSystemTokens;
  twVersion?: string;
  currentTheme: "light" | "dark";
}

/**
 * Visual change types for optimistic updates
 */
export type VisualChange =
  | {
      type: "class";
      element: HTMLElement | SVGElement;
      addedClasses: string[];
      removedClasses: string[];
    }
  | {
      type: "content";
      element: HTMLElement | SVGElement;
      originalContent: string;
    }
  | {
      type: "css-var";
      variable: string;
      originalValue: string | null;
    }
  | {
      type: "image";
      element: HTMLImageElement;
      originalSrc: string;
    };

/**
 * Optimistic visual change payload from parent
 */
export type OptimisticVisualChange =
  | {
      type: "class";
      value?: string;
      prev?: string;
    }
  | {
      type: "content";
      value?: string;
    }
  | {
      type: "css-var";
      variable?: string;
      value?: string;
    }
  | {
      type: "image";
      src?: string;
    };
