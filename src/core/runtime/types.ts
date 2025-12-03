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

