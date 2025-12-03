# Parent-Iframe Communication Protocol

Complete documentation of all communication events between the v0 parent window and the preview iframe.

## Table of Contents

1. [Overview](#overview)
2. [Message Format](#message-format)
3. [Parent → Iframe Messages](#parent--iframe-messages)
4. [Iframe → Parent Messages](#iframe--parent-messages)
5. [DevTools Messages](#devtools-messages)
6. [LocalStorage Messages](#localstorage-messages)
7. [Service Worker Messages](#service-worker-messages)
8. [Implementation Details](#implementation-details)

---

## Overview

v0 uses `postMessage` for bidirectional communication between:
- **Parent window** (v0.dev interface)
- **Preview iframe** (user code execution environment)
- **Service Worker** (virtual file system)

All v0-specific messages are tagged with `__v0_remote__: 1` to identify them.

---

## Message Format

### Standard Message Structure

```typescript
interface BaseMessage {
  __v0_remote__: 1;  // v0 message identifier
  type: string;      // Message type
  [key: string]: any; // Type-specific payload
}
```

### Message Origin

```javascript
// Iframe sends to parent with wildcard origin
window.parent.postMessage({ __v0_remote__: 1, ...message }, "*");

// Parent sends to iframe (validated in iframe)
iframe.contentWindow.postMessage(message, "*");
```

---

## Parent → Iframe Messages

**Source File:** `v0_website_assets/service_worker/__next/static/b114f950a0cd6ced_unpacked/module_448763_wo_first_layer.js`  
**Code Range:** Lines 8134-8342  
**Handler Function:** Event listener registered at line 8342

### Message Handler Implementation

```javascript
window.addEventListener("message", (e) => {
  let e_data = e.data;
  if (!e_data || typeof e_data != "object") return;
  
  // Check for __v0_remote__ tag
  if (e_data.__v0_remote__) {
    switch (e_data.type) {
      // Handle message types...
    }
  }
});
```

### 1. `preview_code` - Full Code Load

**Purpose:** Load complete generation with all files (initial load or full replacement)

**Source Location:** Lines 8141-8190

**Payload:**
```typescript
{
  type: "preview_code";
  code: {
    mapping: Record<string, { type: "file", data: string }>;
  } | Record<string, { type: "file", data: string }>;
  version?: number; // Optional version number
}
```

**Handler Behavior:**
1. Replaces entire file mapping (`C.current`)
2. Compiles all files via `I6()` (TypeScript compilation)
3. Triggers React Fast Refresh via `window.__v0_refreshRuntime.performReactRefresh()`
4. Updates source version counter
5. Wrapped in `act()` for React 18 batching

**Example:**
```javascript
iframe.contentWindow.postMessage({
  type: "preview_code",
  code: {
    "app/page.tsx": { type: "file", data: "export default function Page() { return <div>Hello</div> }" },
    "components/Button.tsx": { type: "file", data: "export function Button() { ... }" }
  },
  version: 1
}, "*");
```

---

### 2. `preview_code_delta` - Hot Module Replacement

**Purpose:** Update single file for HMR (incremental update)

**Source Location:** Lines 8139-8190 (same handler as `preview_code`)

**Payload:**
```typescript
{
  type: "preview_code_delta";
  file: string;      // File path (e.g., "app/page.tsx")
  source: string;    // New file content
  version?: number;  // Optional version number
}
```

**Handler Behavior:**
1. Updates only the specified file in `C.current`
2. Preserves TypeScript compilation project (`A.current`) for incremental compilation
3. Triggers React Fast Refresh for affected components
4. Preserves component state where possible

**Example:**
```javascript
iframe.contentWindow.postMessage({
  type: "preview_code_delta",
  file: "app/page.tsx",
  source: "export default function Page() { return <div>Updated!</div> }",
  version: 2
}, "*");
```

---

### 3. `navigate_back` - Browser History Back

**Purpose:** Navigate to previous URL in browser history

**Source Location:** Lines 8193-8196

**Payload:**
```typescript
{
  type: "navigate_back";
}
```

**Handler Behavior:**
```javascript
window.history.back();
```

---

### 4. `navigate_forward` - Browser History Forward

**Purpose:** Navigate to next URL in browser history

**Source Location:** Lines 8197-8200

**Payload:**
```typescript
{
  type: "navigate_forward";
}
```

**Handler Behavior:**
```javascript
window.history.forward();
```

---

### 5. `navigate_to` - Direct Navigation

**Purpose:** Navigate to specific URL

**Source Location:** Lines 8201-8204

**Payload:**
```typescript
{
  type: "navigate_to";
  href: string; // Target URL
}
```

**Handler Behavior:**
```javascript
window.location.href = e_data.href;
```

---

### 6. `devtools_enable` - Toggle DevTools Mode

**Purpose:** Enable/disable visual editing mode

**Source Location:** Lines 8205-8220

**Payload:**
```typescript
{
  type: "devtools_enable";
  enabled: boolean; // DevTools active state
}
```

**Handler Behavior:**
1. Updates DevTools state via `setB(enabled)`
2. If enabling, sends initial root element info back to parent
3. Sends `devtools_selected_state` with document root info

**Response Message:**
```javascript
sendToParent({
  type: "devtools_selected_state",
  parts: null,
  selected: false,
  info: getExtraElementInfo(document.documentElement, true), // Tailwind tokens, breakpoints
  version: T
});
```

---

### 7. `devtools_query_root` - Query Root Element

**Purpose:** Request current root element information

**Source Location:** Lines 8221-8230

**Payload:**
```typescript
{
  type: "devtools_query_root";
}
```

**Handler Behavior:**
Sends `devtools_selected_state` with document root information.

---

### 8. `devtools_sync_design` - Apply Visual Changes

**Purpose:** Apply optimistic visual changes (class/content/CSS var/image updates)

**Source Location:** Lines 8231-8234

**Payload:**
```typescript
{
  type: "devtools_sync_design";
  payload: {
    type: "class" | "content" | "css-var" | "image";
    // Type-specific fields...
  };
}
```

**Handler Behavior:**
```javascript
optimisticApplyVisualChanges(e_data.payload);
```

**Change Types:**
- `class` — Add/remove Tailwind classes
- `content` — Update element `textContent`
- `css-var` — Set CSS custom property on `:root`
- `image` — Update `<img>.src`

---

### 9. `devtools_revert_design` - Revert Visual Changes

**Purpose:** Undo all pending optimistic visual changes

**Source Location:** Lines 8235-8238

**Payload:**
```typescript
{
  type: "devtools_revert_design";
}
```

**Handler Behavior:**
```javascript
revertOptimisticVisualChanges();
```

---

### 10. `preload_client` - Preload Generation

**Purpose:** Preload another generation's files in background for instant switching

**Source Location:** Lines 8239-8286

**Payload:**
```typescript
{
  type: "preload_client";
  id: string; // Generation ID
}
```

**Handler Behavior:**
1. Checks LRU cache (`I7`) for existing preload
2. Calls `loadClientFiles(id)` to fetch files
3. Compiles with `IV()` (TypeScript compilation)
4. Stores in cache: `I7.set(id, { files, compiled })`
5. Renders in hidden `<Activity mode="hidden">` for warmup
6. Sends `generation_logs` message with compilation results

**Response Message:**
```javascript
sendToParent({
  type: "generation_logs",
  logs: [...],  // Compilation warnings/errors
  id: generation_id,
  preload: true
});
```

---

### 11. `switch_client` - Switch to Different Generation

**Purpose:** Switch from current generation to preloaded one

**Source Location:** Lines 8287-8313

**Payload:**
```typescript
{
  type: "switch_client";
  id: string;          // Target generation ID
  fallbackUrl?: string; // Fallback URL if generation not found
}
```

**Handler Behavior:**
1. Checks if ID is already current (`D.current`)
2. Checks LRU cache for preloaded generation
3. If cached: instant switch via `setU(id)`
4. If not cached: fetch, compile, cache, then switch
5. Falls back to `fallbackUrl` on error

---

### 12. `env_vars` - Update Environment Variables

**Purpose:** Update `process.env` with new environment variables

**Source Location:** Lines 8314-8323

**Payload:**
```typescript
{
  type: "env_vars";
  envVars: Array<{ key: string; value: string }>;
}
```

**Handler Behavior:**
```javascript
if (Array.isArray(e_data.envVars) && 
    typeof window.__v0_updateProcessEnv == "function") {
  window.__v0_updateProcessEnv(e_data.envVars);
}
```

Updates `process.env` via proxy to enforce `NEXT_PUBLIC_*` restrictions on client.

---

### 13. `preload_google_font` - Preload Google Font

**Purpose:** Preload Google Font CSS for faster rendering

**Source Location:** Lines 8324-8338

**Payload:**
```typescript
{
  type: "preload_google_font";
  fontId: string; // Font family name (e.g., "Inter")
}
```

**Handler Behavior:**
1. Validates `fontId` is a string
2. Looks up font weights from `googleFontsMetadata`
3. Injects `<link rel="stylesheet">` with Google Fonts CSS URL
4. Filters out `"variable"` weights, defaults to `["400"]`

---

## Iframe → Parent Messages

**Source File:** `v0_website_assets/service_worker/__next/static/b114f950a0cd6ced_unpacked/module_448763_wo_first_layer.js`  
**Sender Function:** `sendToParent` (implementation in `src/runtime/communication/iframe-comm.ts`)

### Implementation

```javascript
function sendToParent(message) {
  window.parent.postMessage({
    __v0_remote__: 1,
    ...message
  }, "*");
}
```

---

### 1. `location_change` - URL Changed

**Purpose:** Notify parent when URL changes (navigation, pushState, replaceState)

**Source Location:** Lines 8351-8357

**Payload:**
```typescript
{
  type: "location_change";
  href: string;            // Current URL
  canGoForward?: boolean;  // Browser history state
  canGoBack?: boolean;     // Browser history state
}
```

**Trigger:** Monitored via interval check (function `u()` at line 8346)

**Example:**
```javascript
sendToParent({
  type: "location_change",
  href: "http://localhost:3000/dashboard",
  canGoForward: false,
  canGoBack: true
});
```

---

### 2. `app_ready` - App Initialized

**Purpose:** Signal that the iframe has finished initializing

**Source Location:** Line 8405

**Payload:**
```typescript
{
  type: "app_ready";
  id: string; // Generation ID
}
```

**Sent:** After initial compilation and render complete

---

### 3. `app_navigation_state` - Loading State

**Purpose:** Report navigation loading state

**Source Location:** Referenced in analysis (Lines 43,729-43,937 in full bundle)

**Payload:**
```typescript
{
  type: "app_navigation_state";
  loading: boolean;
}
```

---

### 4. `generation_logs` - Compilation Logs

**Purpose:** Send compilation warnings/errors to parent for display

**Source Location:** Lines 8273-8279 (preload context)

**Payload:**
```typescript
{
  type: "generation_logs";
  logs: Array<{
    type: "warning" | "error";
    message: string;
    // ... additional fields
  }>;
  id: string;        // Generation ID
  preload?: boolean; // True if from background preload
}
```

---

## DevTools Messages

**Source Files:**
- Outgoing: `v0_website_assets/service_worker/__next/static/3a384aa7a60f1de8.js`
- Incoming: Same file, lines 1338-1380

---

### Iframe → Parent (DevTools)

#### 1. `devtools_selected_state` - Element Selection State

**Purpose:** Report currently selected element info and computed styles

**Source Location:** Lines 853-1055 (multiple invocation points)

**Payload (Deselected):**
```typescript
{
  type: "devtools_selected_state";
  parts: null;
  selected: false;
  info: {
    color: string;              // Computed text color
    backgroundColor: string;    // Computed background color
    borderColor: string;        // Computed border color
    fontWeight: string;         // Computed font weight
    activeBreakpoint: string;   // Current Tailwind breakpoint
    twTokens: {
      colors: Record<string, string>; // Resolved Tailwind colors
    };
    dsTokens: {                 // Design system tokens
      default: Record<string, string>;
      dark: Record<string, string>;
      theme: Record<string, string>;
    };
    twVersion: string;          // Tailwind CSS version
    currentTheme: "dark" | "light";
  };
  version: number;              // Source version
}
```

**Payload (Element Selected):**
```typescript
{
  type: "devtools_selected_state";
  parts: Array<[line: number, column: number, value: string]>; // className parts
  defined: Record<string, boolean>; // Which classes are defined in Tailwind
  info: ElementInfo;            // Computed styles (same as above)
  file: string;                 // Source file path
  content?: {                   // Inline editable content info
    file: string;
    line: number;
    column: number;
    len: number;
    type: "jsxText" | "string" | "template";
    value: string;
  };
  key: string;                  // Internal element tracking key
  jsxRoot?: boolean;            // Is JSX root element
  name: string;                 // Component/element name
  line: number;                 // Source line number
  column: number;               // Source column number
  lib?: boolean;                // Is library component
  start: number;                // Source start offset
  end: number;                  // Source end offset
  version: number;              // Source version
}
```

**Sent When:**
- Element is clicked/selected
- Element is deselected
- DevTools mode is toggled
- Root element info is queried

---

#### 2. `devtools_goto` - Navigate to Source Code

**Purpose:** Request parent to jump to specific line/column in source code

**Source Location:** Lines 867-873

**Payload:**
```typescript
{
  type: "devtools_goto";
  line: number;    // Line number (1-indexed)
  column: number;  // Column number (1-indexed)
  file: string;    // File path/ID
}
```

**Trigger:** User clicks "Go to code" in context menu

---

#### 3. `devtools_copy` - Copy Component Code

**Purpose:** Request parent to copy component JSX to clipboard

**Source Location:** Lines 852-858

**Payload:**
```typescript
{
  type: "devtools_copy";
  start: number;  // Source start offset
  end: number;    // Source end offset
  file: string;   // File path/ID
}
```

**Trigger:** User clicks "Copy component code" in context menu

---

#### 4. `devtools_delete` - Delete Element

**Purpose:** Request parent to delete element from source code

**Source Location:** Lines 859-866

**Payload:**
```typescript
{
  type: "devtools_delete";
  start: number;       // Source start offset
  end: number;         // Source end offset
  jsxRoot?: boolean;   // Is JSX root element
  file: string;        // File path/ID
}
```

**Trigger:** User presses Backspace with element selected or clicks "Delete element"

---

#### 5. `add-refinement-element` - v3 Refinement Mode Selection

**Purpose:** Add element to refinement target list (v3 feature)

**Source Location:** Lines 884-891

**Payload:**
```typescript
{
  type: "add-refinement-element";
  file: string;   // File path/ID
  line: number;   // Source line number
  column: number; // Source column number
  id: string;     // Unique ID: "${fileName}:${line}:${column}"
}
```

**Trigger:** Element clicked in v3 refinement mode (`isV3` prop = true)

---

#### 6. `inline_edit` - Inline Content Edit

**Purpose:** Send inline text content changes back to source code

**Source Location:** Lines 1123-1132

**Payload:**
```typescript
{
  type: "inline_edit";
  file: string;   // File path/ID
  line: number;   // Source line number
  column: number; // Source column number
  len: number;    // Length of content to replace
  replace: string; // New content (escaped appropriately)
  version: number; // Timestamp of edit
}
```

**Content Escaping:**
- `jsxText` — Raw text
- `string` — JSON escaped (`JSON.stringify().slice(1, -1)`)
- `template` — Escape special chars: `['"\`$]` → `\\$&`

**Trigger:** User edits text inline and focuses out

---

#### 7. `devtools_state` - Toggle DevTools

**Purpose:** Request parent to toggle DevTools enabled state

**Source Location:** Line 1326

**Payload:**
```typescript
{
  type: "devtools_state";
  enabled: boolean; // New enabled state
}
```

**Trigger:** User presses `Alt+D` or `Cmd+D`

---

### Parent → Iframe (DevTools)

**Source Location:** Lines 1338-1380 (message event listener)

#### 1. `devtools_deselect` - Clear Selection

**Payload:**
```typescript
{
  type: "devtools_deselect";
}
```

**Handler Behavior:**
1. Clears locked selection (`m(null)`)
2. Clears hover state (`d(null)`)
3. Exits edit mode if active
4. Sends `devtools_selected_state` with `selected: false`

---

#### 2. `devtools_apply_theme` - Apply Theme

**Payload:**
```typescript
{
  type: "devtools_apply_theme";
  payload: {
    theme: "dark" | "light";
  };
}
```

**Handler Behavior:**
1. Saves original theme state (`__v0-had-dark` or `__v0-no-dark` class)
2. Adds/removes `dark` class on `<html>`
3. Preserves state for cleanup

---

#### 3. `devtools_cleanup_theme` - Restore Original Theme

**Payload:**
```typescript
{
  type: "devtools_cleanup_theme";
}
```

**Handler Behavior:**
1. Checks saved theme state (`__v0-had-dark`, `__v0-no-dark`)
2. Restores original `dark` class state
3. Removes temporary classes

---

## LocalStorage Messages

**Source File:** `v0_website_assets/service_worker/__next/static/b114f950a0cd6ced_unpacked/module_448763_wo_first_layer.js`  
**Code Range:** Lines 7810-7860

### Purpose
v0 uses sandboxed localStorage via postMessage to isolate iframe storage from parent window.

---

### Iframe → Parent

#### 1. `localStorage-init-request` - Request Initial State

**Source Location:** Line 7838

**Payload:**
```typescript
{
  type: "localStorage-init-request";
}
```

**Sent:** On iframe initialization (before localStorage is accessible)

---

#### 2. `localStorage-update` - Persist Changes

**Source Location:** Lines 7832-7836

**Payload:**
```typescript
{
  type: "localStorage-update";
  map: Array<[key: string, value: string]>; // Entries array
}
```

**Sent After:**
- `setItem(key, value)`
- `removeItem(key)`
- `clear()`

**Implementation:**
```javascript
function o() {
  a.then(() => {
    parent.postMessage(
      { type: "localStorage-update", map: Array.from(r.entries()) },
      n
    );
  });
}
```

---

### Parent → Iframe

#### `localStorage-store-update` - Send Storage State

**Source Location:** Lines 7818-7828

**Payload:**
```typescript
{
  type: "localStorage-store-update";
  map: Array<[key: string, value: string]>; // Entries array
}
```

**Purpose:** Send initial localStorage state to iframe

**Handler Behavior:**
```javascript
window.addEventListener("message", (t) => {
  if ((n === "*" || t.origin === n) && 
      t.data.type === "localStorage-store-update") {
    r = new Map(t.data.map);
    i = true; // Mark as initialized
    e();      // Resolve promise
  }
});
```

---

## Service Worker Messages

**Source File:** `v0_website_assets/service_worker/__next/static/b114f950a0cd6ced_unpacked/module_448763_wo_first_layer.js`  
**Code Range:** Lines 7920-7970

### Purpose
Service Worker acts as virtual file system and request interceptor.

---

### Service Worker → Iframe

#### `v0_request_resource` - Request Resource Fetch

**Source Location:** Lines 7923-7966

**Payload:**
```typescript
{
  type: "v0_request_resource";
  id: string;              // Request ID
  url: string;             // Resource URL
  method: string;          // HTTP method
  headers: Array<[string, string]>; // Request headers
  body?: ArrayBuffer;      // Request body (if applicable)
}
```

**Purpose:** Service Worker delegates external fetches to iframe (to bypass CORS via parent's CORS proxy)

---

### Iframe → Service Worker

#### 1. `v0_request_response` - Return Fetched Resource (Success)

**Source Location:** Lines 7939-7947

**Payload:**
```typescript
{
  type: "v0_request_response";
  id: string;          // Request ID (matches request)
  response: {
    status: number;    // HTTP status code
    headers: Record<string, string>; // Response headers
    body: ArrayBuffer; // Response body
  };
}
```

**Sent After:** Successfully fetching resource

---

#### 2. `v0_request_response` - Return Error Response

**Source Location:** Lines 7949-7957

**Payload (Error):**
```typescript
{
  type: "v0_request_response";
  id: string;
  response: {
    status: 500;
    headers: {};
    body: ArrayBuffer; // "internal server error"
  };
}
```

---

#### 3. `v0_request_response` - Route Handler Not Found

**Source Location:** Lines 7960-7964

**Payload:**
```typescript
{
  type: "v0_request_response";
  id: string;
  response: null; // No handler found
}
```

---

#### 4. `v0_init` - Initialize Service Worker

**Source Location:** Referenced in analysis (Lines 43,494-43,566 in full bundle)

**Payload:**
```typescript
{
  type: "v0_init";
  code: any;        // Compiled code
  files: Record<string, any>; // Virtual file system
}
```

**Purpose:** Send compiled code and files to Service Worker on initialization

---

## Implementation Details

### Message Origin Validation

**Allowed Origins:**
```javascript
const ALLOWED_ORIGINS = [
  "https://v0.dev",
  "https://v0.app",
  "*.vercel.sh",
  "http://localhost:3000"
];
```

**Validation (localStorage context):**
```javascript
if (n === "*" || t.origin === n) {
  // Process message
}
```

### Error Handling

All message handlers wrap errors to prevent crashes:

```javascript
try {
  // Handle message
} catch (e) {
  console.error("Message handler error:", e);
}
```

### Message Flow Examples

#### Full Generation Load
```
1. Parent: preview_code → Iframe
2. Iframe: Compiles TypeScript
3. Iframe: Renders React app
4. Iframe: app_ready → Parent
5. Iframe: location_change → Parent
```

#### HMR Update
```
1. User edits file in parent
2. Parent: preview_code_delta → Iframe
3. Iframe: Recompiles single file
4. Iframe: Triggers React Fast Refresh
5. Iframe: Component updates without losing state
```

#### Element Selection & Edit
```
1. User enables DevTools
2. Parent: devtools_enable → Iframe
3. Iframe: devtools_selected_state → Parent (root info)
4. User clicks element in iframe
5. Iframe: devtools_selected_state → Parent (element info)
6. User clicks "Go to code"
7. Iframe: devtools_goto → Parent
8. Parent opens editor at line/column
```

#### Inline Content Edit
```
1. User enters edit mode (double-click or Enter)
2. Element becomes contentEditable
3. User types new content
4. User focuses out (blur event)
5. Iframe: inline_edit → Parent
6. Parent updates source code
7. Parent: preview_code_delta → Iframe
8. Iframe re-renders with updated content
```

#### Generation Preload & Switch
```
1. Parent: preload_client(id=gen2) → Iframe
2. Iframe: Fetches files for gen2
3. Iframe: Compiles gen2 in background
4. Iframe: Renders gen2 hidden (warmup)
5. Iframe: generation_logs → Parent
6. Parent: switch_client(id=gen2) → Iframe
7. Iframe: Instant switch (gen2 visible, gen1 hidden)
```

---

## Message Frequency & Throttling

### High-Frequency Messages

- `location_change` — Debounced via interval check
- `devtools_selected_state` — Sent on state changes only

### Browser Event Tracking

**Source:** `src/runtime/communication/iframe-comm.ts`

Browser events (mouse, keyboard, scroll) are throttled and sent to parent:

```javascript
// Throttle to max 1 event per 100ms
let lastBrowserEventTime = 0;
if (Date.now() - lastBrowserEventTime > 100) {
  sendToParent({ type: "browser_event", data: eventData });
  lastBrowserEventTime = Date.now();
}
```

---

## Security Considerations

1. **Origin Validation:** Messages validated against allowed origins
2. **Message Tagging:** `__v0_remote__: 1` prevents external message injection
3. **Sandboxed Storage:** localStorage isolated via proxy
4. **Environment Variables:** Client can only access `NEXT_PUBLIC_*` vars
5. **CORS Proxy:** External requests routed through v0's CORS proxy

---

## Related Files

| File | Purpose |
|------|---------|
| `src/runtime/communication/iframe-comm.ts` | TypeScript types and `sendToParent` helper |
| `v0_website_assets/service_worker/__next/static/b114f950a0cd6ced_unpacked/module_448763_wo_first_layer.js` | Main message handler (lines 8134-8342) |
| `v0_website_assets/service_worker/__next/static/3a384aa7a60f1de8.js` | DevTools visual editing messages |
| `src/devtools/provider/` | DevTools provider React component |
| `src/runtime/navigation/` | Router and navigation handling |

---

## Summary

The v0 parent-iframe communication protocol enables:

✅ **Code Loading** — Full and incremental (HMR)  
✅ **Navigation Control** — Back, forward, direct navigation  
✅ **Visual Editing** — Element selection, inline editing, theme toggling  
✅ **Sandboxed Storage** — Isolated localStorage via postMessage  
✅ **Service Worker** — Virtual file system and request interception  
✅ **Generation Management** — Preloading and instant switching  
✅ **Environment Variables** — Dynamic env var updates  
✅ **Developer Tools** — Go to code, copy, delete, inspect elements  

This creates a **seamless development experience** where the preview iframe behaves like a full development environment while maintaining complete isolation and control from the parent window.

