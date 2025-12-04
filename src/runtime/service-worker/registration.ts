/**
 * Service Worker Registration
 * Source: v0_website_assets/service_worker/__v0_sw.js
 *
 * Registers the v0 service worker and handles resource request proxying.
 * The SW sends v0_request_resource messages when it needs assets not in staticFiles.
 * This module responds with v0_request_response messages.
 */

import { channelManager } from "../communication/channel-manager";

export interface ResourceRequest {
  type: "v0_request_resource";
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: ArrayBuffer;
}

export interface ResourceResponse {
  body: string | ArrayBuffer;
  status: number;
  headers: Record<string, string>;
}

export async function registerServiceWorker(): Promise<
  ServiceWorkerRegistration | undefined
> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/__v0_sw.js", {
      scope: "/",
    });

    // Listen for resource requests from the SW
    navigator.serviceWorker.addEventListener("message", handleSWMessage);

    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
}

async function handleSWMessage(event: MessageEvent): Promise<void> {
  const data = event.data as ResourceRequest;
  if (!data || data.type !== "v0_request_resource") return;

  try {
    // Ask parent for the resource via the resource channel
    const response = await channelManager.resource.send({
      id: data.id,
      url: data.url,
      method: data.method,
      headers: data.headers,
    });

    // Send response back to SW
    sendResponseToSW(data.id, response);
  } catch (err) {
    console.error("Failed to proxy resource request:", err);
    // Send null response so SW falls back to network
    sendResponseToSW(data.id, null);
  }
}

function sendResponseToSW(id: string, response: ResourceResponse | null): void {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "v0_request_response",
      id,
      response,
    });
  }
}

export function sendInitToSW(compiled: {
  staticFiles: Record<
    string,
    string | { type: "raw" | "url"; content: string }
  >;
}): void {
  if (typeof navigator !== "undefined" && navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "v0_init",
      compiled,
    });
  }
}

/**
 * Wait for the service worker to be ready and controlling the page.
 */
export async function waitForSWReady(): Promise<ServiceWorkerRegistration> {
  return navigator.serviceWorker.ready;
}
