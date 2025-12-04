/**
 * Communication Types
 * Types for iframe-parent window communication
 */

// ============================================================================
// Parent Message Types
// ============================================================================

export interface ParentMessage {
  type: string;
  [key: string]: unknown;
}

export interface BrowserEventData {
  type: "mouse" | "keyboard" | "focus" | "scroll";
  timestamp: number;
  data: unknown;
}

export interface LocationChangeMessage extends ParentMessage {
  type: "location_change";
  href: string;
  canGoForward?: boolean;
  canGoBack?: boolean;
}

export interface FrameOnloadMessage extends ParentMessage {
  type: "frame_onload";
}

export interface FrameReadyMessage extends ParentMessage {
  type: "frame_ready";
}

export interface AppReadyMessage extends ParentMessage {
  type: "app_ready";
  id: string;
}

export interface AppNavigationStateMessage extends ParentMessage {
  type: "app_navigation_state";
  loading: boolean;
}

export interface ErrorMessage extends ParentMessage {
  type: "error";
  error: string;
  stack: string;
  isServer?: boolean;
  isFatal?: boolean;
  currentURL?: string;
}

export interface DevToolsSelectedStateMessage extends ParentMessage {
  type: "devtools_selected_state";
  parts: unknown;
  selected: boolean;
  info: unknown;
  version: number;
}

export interface GenerationLogsMessage extends ParentMessage {
  type: "generation_logs";
  logs: unknown[];
  id: string;
  preload?: boolean;
}

// ============================================================================
// Child Message Types
// ============================================================================

export interface PreviewCodeMessage {
  type: "preview_code";
  code: unknown;
}

export interface PreviewCodeDeltaMessage {
  type: "preview_code_delta";
  file: string;
  source: string;
  version?: number;
}

export interface NavigateBackMessage {
  type: "navigate_back";
  __v0_remote__: true;
}

export interface NavigateForwardMessage {
  type: "navigate_forward";
  __v0_remote__: true;
}

export interface NavigateToMessage {
  type: "navigate_to";
  href: string;
  __v0_remote__: true;
}

export interface DevToolsEnableMessage {
  type: "devtools_enable";
  enabled: boolean;
  __v0_remote__: true;
}

export interface DevToolsQueryRootMessage {
  type: "devtools_query_root";
  __v0_remote__: true;
}

export interface DevToolsSyncDesignMessage {
  type: "devtools_sync_design";
  payload: unknown;
  __v0_remote__: true;
}

export interface DevToolsRevertDesignMessage {
  type: "devtools_revert_design";
  __v0_remote__: true;
}

export interface PreloadClientMessage {
  type: "preload_client";
  id: string;
  __v0_remote__: true;
}

export interface SwitchClientMessage {
  type: "switch_client";
  id: string;
  fallbackUrl?: string;
  __v0_remote__: true;
}

export interface EnvVarsMessage {
  type: "env_vars";
  envVars: Array<{ key: string; value: string }>;
  __v0_remote__: true;
}

export interface PreloadGoogleFontMessage {
  type: "preload_google_font";
  fontId: string;
  __v0_remote__: true;
}

// Union type for all messages from parent
export type ParentToChildMessage =
  | PreviewCodeMessage
  | PreviewCodeDeltaMessage
  | NavigateBackMessage
  | NavigateForwardMessage
  | NavigateToMessage
  | DevToolsEnableMessage
  | DevToolsQueryRootMessage
  | DevToolsSyncDesignMessage
  | DevToolsRevertDesignMessage
  | PreloadClientMessage
  | SwitchClientMessage
  | EnvVarsMessage
  | PreloadGoogleFontMessage;
