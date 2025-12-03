# DevTools Package

This package contains the visual editing and inspection tools for the v0 runtime. It is a complete migration of the `3a384aa7a60f1de8.js` bundle.

## 📦 Contents

### Core Components

- **Provider** (`provider/`): The main `DevToolsProvider` orchestrator that manages state, communication with the parent frame, and event handling.
- **Overlay** (`overlay/`): The visual overlay system that highlights elements on hover/selection and provides context menus.
- **Inspection** (`inspection/`): Utilities for traversing the React Fiber tree to extract source location, component names, and props from DOM elements.

### Features

- **Visual Editing** (`editing/`): Handles optimistic updates for text, classes, styles, and images. Maintains an undo stack for reverting changes.
- **Tailwind Integration** (`tailwind/`): Detects Tailwind configuration, active breakpoints, and design system tokens from the runtime environment.
- **Console Formatting** (`utils/`): Provides printf-style formatting for console messages forwarded to the parent frame.

### UI Components

- **Slottable** (`components/Slottable.tsx`): A wrapper component (based on Radix UI) that filters out internal v0 metadata props before they reach the DOM.

## 🔧 Architecture

The DevTools system runs inside the preview iframe and communicates with the main v0 application via `postMessage`.

1. **Discovery**: When a user hovers an element, `inspection/fiber-traversal.ts` finds the corresponding React Fiber node to get source file/line information.
2. **Selection**: Clicking an element locks the overlay and sends a selection message to the parent.
3. **Editing**: Inline edits or prop changes are applied optimistically via `editing/visual-changes.ts` while the persistent change is processed by the parent.

## 🔍 Source attribution

This package is fully decompiled from bundle `3a384aa7a60f1de8.js`.
See `MIGRATION_VERIFICATION.md` for a detailed line-by-line mapping.
