/**
 * Section: Iframe Communication
 * Source: 0eea3dbce56890c9.js
 * Start LOC: 4307, 4405-4429
 * End LOC: 4309, 4429
 *
 * Summary:
 * Handles communication between iframe and parent window. Provides sendToParent
 * for posting messages to parent frame and useSendBrowserEvent hook for tracking
 * user interactions (mouse, keyboard, focus, scroll). Implements throttling to
 * prevent excessive event messages.
 */

import { useEffect } from "react";
import type { ParentMessage, BrowserEventData } from "./types";

/**
 * Sends a message to the parent window
 *
 * All messages are tagged with __v0_remote__: 1 to identify them as v0 messages.
 * Uses postMessage with wildcard origin (*) for maximum compatibility.
 *
 * @param message - Message object to send to parent
 */
export function sendToParent(
  message: Omit<ParentMessage, "__v0_remote__">
): void {
  window.parent.postMessage(
    {
      __v0_remote__: 1,
      ...message,
    },
    "*"
  );
}

/**
 * Last browser event timestamp (for throttling)
 */
let lastBrowserEventTime = 0;

/**
 * Handles browser events and sends them to parent
 * Throttles events to max one per 4 seconds (except Escape key)
 */
function handleBrowserEvent(event: Event): void {
  // Special handling for Escape key - always send immediately
  if (event.type === "keydown" && (event as KeyboardEvent).key === "Escape") {
    sendToParent({
      type: "escape_key_event",
      event: {
        type: event.type,
        key: (event as KeyboardEvent).key,
      },
    });
    return;
  }

  // Throttle other events to one per 4 seconds
  if (Date.now() - lastBrowserEventTime < 4000) {
    return;
  }

  lastBrowserEventTime = Date.now();
  sendToParent({
    type: "browser_event",
    event: { type: event.type },
  });
}

/**
 * React hook that sends browser events to parent window
 *
 * Tracks user interactions (mouse, keyboard, focus, scroll) and forwards
 * them to the parent frame. Useful for analytics and user activity tracking.
 * Events are throttled to prevent spam.
 */
export function useSendBrowserEvent(): void {
  useEffect(() => {
    // Add event listeners with capture and passive options
    window.addEventListener("mousedown", handleBrowserEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", handleBrowserEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener("focusin", handleBrowserEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener("scroll", handleBrowserEvent, {
      capture: true,
      passive: true,
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousedown", handleBrowserEvent, {
        capture: true,
      });
      window.removeEventListener("keydown", handleBrowserEvent, {
        capture: true,
      });
      window.removeEventListener("focusin", handleBrowserEvent, {
        capture: true,
      });
      window.removeEventListener("scroll", handleBrowserEvent, {
        capture: true,
      });
    };
  }, []);
}
