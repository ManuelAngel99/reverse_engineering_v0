/**
 * v0 Service Worker
 * Source: v0_website_assets/service_worker/__v0_sw.js
 *
 * Handles virtual file system serving and resource proxying.
 */

/// <reference lib="webworker" />

export type {};
declare const self: ServiceWorkerGlobalScope;

interface ResolvablePromise<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

function createResolvablePromise<T>(): ResolvablePromise<T> {
  let resolveFunction!: (value: T) => void;
  let rejectFunction!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveFunction = resolve;
    rejectFunction = reject;
  });
  return {
    promise,
    resolve: resolveFunction,
    reject: rejectFunction,
  };
}

const DB_NAME = "__v0";
const DB_VERSION = 1;
const COMPILED_CACHE_NAME = "/__v0_compiled";

interface CompiledData {
  staticFiles: Record<
    string,
    string | { type: "raw" | "url"; content: string }
  >;
}

let compiled: CompiledData | null = null;

// Promise resolved when compiled data is available
const { promise: compiledPromise, resolve: resolveCompiled } =
  createResolvablePromise<void>();

// Pending resource requests waiting for main thread response
const pendingRouteRequests = new Map<string, (response: any) => void>();

// Initialize cache from IndexedDB
const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
dbRequest.onupgradeneeded = (event) => {
  const db = (event.target as IDBOpenDBRequest).result;
  db.createObjectStore("data");
};
dbRequest.onsuccess = (event) => {
  const db = (event.target as IDBOpenDBRequest).result;
  const tx = db.transaction("data", "readonly");
  const store = tx.objectStore("data");
  const request = store.get(COMPILED_CACHE_NAME);
  request.onsuccess = (event) => {
    compiled = compiled || (event.target as IDBRequest).result;
    if (compiled) {
      resolveCompiled();
    }
  };
};

self.addEventListener("install", () => {
  return self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  return event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  fetchHandler(event);
});

self.addEventListener("message", (event) => {
  if (!event.data) return;

  if (event.data.type === "v0_init") {
    // Update compiled data
    compiled = event.data.compiled;

    if (compiled) {
      resolveCompiled();
    }

    // Persist to IndexedDB
    const db = indexedDB.open(DB_NAME, DB_VERSION);
    db.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      database.createObjectStore("data");
    };
    db.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      const tx = database.transaction("data", "readwrite");
      const store = tx.objectStore("data");
      store.put(compiled, COMPILED_CACHE_NAME);
    };
  } else if (event.data.type === "v0_request_response") {
    // Handle response from main thread for a resource request
    const { id, response } = event.data;
    const resolve = pendingRouteRequests.get(id);
    if (resolve) {
      pendingRouteRequests.delete(id);
      resolve(response);
    }
  }
});

const currentOrigin = self.location.origin;

function fetchHandler(event: FetchEvent) {
  const url = new URL(event.request.url);

  // Skip cross-origin and Next.js internal requests
  if (url.origin !== currentOrigin) return;
  if (url.pathname.startsWith("/_next/")) return;

  event.respondWith(
    (async () => {
      await compiledPromise;
      if (!compiled) return fetch(event.request);

      return handleStaticFileResponse(event, url);
    })()
  );
}

async function handleStaticFileResponse(
  event: FetchEvent,
  url: URL
): Promise<Response> {
  let maybeResource:
    | string
    | { type: "raw" | "url"; content: string }
    | undefined;
  let resourcePath: string = "";

  // Check for exact path or .html extension
  if (compiled!.staticFiles[url.pathname]) {
    maybeResource = compiled!.staticFiles[url.pathname];
    resourcePath = url.pathname;
  } else if (compiled!.staticFiles[url.pathname + ".html"]) {
    maybeResource = compiled!.staticFiles[url.pathname + ".html"];
    resourcePath = url.pathname + ".html";
  }

  if (maybeResource) {
    if (typeof maybeResource === "string" || maybeResource.type === "raw") {
      const content =
        typeof maybeResource === "string"
          ? maybeResource
          : maybeResource.content;
      return new Response(content, {
        headers: { "Content-Type": getMimeType(resourcePath) },
      });
    }
    if (maybeResource.type === "url") {
      return fetch(maybeResource.content);
    }
  } else {
    // Resource not in staticFiles - ask main thread if it's a static asset
    if (event.clientId && isRequestDestinationStaticFile(event.request)) {
      const client = await self.clients.get(event.clientId);
      if (client) {
        const id = event.clientId + "-" + String(Math.random());
        const promise = new Promise<any>((resolve) => {
          pendingRouteRequests.set(id, resolve);
        });

        client.postMessage({
          type: "v0_request_resource",
          id,
          url: event.request.url,
          method: event.request.method,
          headers: Object.fromEntries(event.request.headers.entries()),
          body: event.request.body
            ? await event.request.arrayBuffer()
            : undefined,
        });

        const maybeResponse = await promise;
        if (maybeResponse) {
          return new Response(maybeResponse.body, {
            status: maybeResponse.status,
            headers: maybeResponse.headers,
          });
        }
      }
    }
  }

  // Fallback to network
  return fetch(event.request);
}

function getMimeType(path: string): string {
  const lowerPath = path.toLowerCase();
  if (lowerPath.endsWith(".html")) return "text/html";
  if (lowerPath.endsWith(".js")) return "text/javascript";
  if (lowerPath.endsWith(".css")) return "text/css";
  if (lowerPath.endsWith(".json")) return "application/json";
  if (lowerPath.endsWith(".svg")) return "image/svg+xml";
  if (lowerPath.endsWith(".xml")) return "application/xml";
  if (lowerPath.endsWith(".txt")) return "text/plain";
  if (lowerPath.endsWith(".md")) return "text/markdown";
  if (lowerPath.endsWith(".csv")) return "text/csv";
  return "text/plain";
}

function isRequestDestinationStaticFile(request: Request): boolean {
  if (request.destination) {
    return ["image", "audio", "video", "style", "font"].includes(
      request.destination
    );
  }
  return false;
}
