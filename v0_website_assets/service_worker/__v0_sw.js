function createResolvablePromise() {
  let resolveFunction
  let rejectFunction
  const promise = new Promise((resolve, reject) => {
    resolveFunction = resolve
    rejectFunction = reject
  })
  return {
    promise,
    resolve: resolveFunction,
    reject: rejectFunction,
  }
}

const DB_NAME = '__v0'
const DB_VERSION = 1
const COMPILED_CACHE_NAME = '/__v0_compiled'

let compiled = null

// a promise we'll resolve when compiled data is available
const {
  promise: compiledPromise,
  reject: rejectCompiled,
  resolve: resolveCompiled,
} = createResolvablePromise()

const pendingRouteRequests = new Map()

// Initialize the cache from indexedDB
const db = indexedDB.open(DB_NAME, DB_VERSION)
db.onupgradeneeded = (event) => {
  const db = event.target.result
  db.createObjectStore('data')
}
db.onsuccess = (event) => {
  const db = event.target.result
  const tx = db.transaction('data', 'readonly')
  const store = tx.objectStore('data')
  const request = store.get(COMPILED_CACHE_NAME)
  request.onsuccess = (event) => {
    compiled = compiled || event.target.result
    if (compiled) {
      resolveCompiled()
    }
  }
}

self.addEventListener('install', () => {
  return self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  return event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  fetchHandler(event)
})
self.onfetch = (event) => {
  fetchHandler(event)
}

self.addEventListener('message', (event) => {
  if (!event.data) return
  if (event.data.type === 'v0_init') {
    // Update the compiled data
    compiled = event.data.compiled

    if (compiled) {
      resolveCompiled()
    }

    // Save the compiled data to indexedDB
    const db = indexedDB.open(DB_NAME, DB_VERSION)
    db.onupgradeneeded = (event) => {
      const db = event.target.result
      db.createObjectStore('data')
    }
    db.onsuccess = (event) => {
      const db = event.target.result
      const tx = db.transaction('data', 'readwrite')
      const store = tx.objectStore('data')
      store.put(compiled, COMPILED_CACHE_NAME)
    }
  } else if (event.data.type === 'v0_request_response') {
    // Handle a response to a resource request
    const { id, response } = event.data
    const resolve = pendingRouteRequests.get(id)
    if (resolve) {
      pendingRouteRequests.delete(id)
      resolve(response)
    }
  }
})

const currentOrigin = self.location.origin
function fetchHandler(event) {
  const url = new URL(event.request.url)
  if (url.origin !== currentOrigin) return
  if (url.pathname.startsWith('/_next/')) return

  event.respondWith(
    (async () => {
      await compiledPromise
      if (!compiled) return fetch(event.request)

      return handleStaticFileResponse(event, url)
    })(),
  )
}

async function handleStaticFileResponse(event, url) {
  // { type: 'raw' | 'url'; content: string }
  let maybeResource
  let resourcePath
  if (compiled.staticFiles[url.pathname]) {
    maybeResource = compiled.staticFiles[url.pathname]
    resourcePath = url.pathname
  } else if (compiled.staticFiles[url.pathname + '.html']) {
    maybeResource = compiled.staticFiles[url.pathname + '.html']
    resourcePath = url.pathname + '.html'
  }

  if (maybeResource) {
    if (typeof maybeResource === 'string' || maybeResource.type === 'raw') {
      const content = maybeResource.content || maybeResource
      return new Response(content, {
        headers: { 'Content-Type': getMimeType(resourcePath) },
      })
    }
    if (maybeResource.type === 'url') {
      return fetch(maybeResource.content)
    }
  } else {
    if (event.clientId && isRequestDestinationStaticFile(event.request)) {
      const client = await self.clients.get(event.clientId)
      if (client) {
        const id = event.clientId + '-' + String(Math.random())
        let resolve
        const promise = new Promise((res) => {
          resolve = res
        })
        pendingRouteRequests.set(id, resolve)
        client.postMessage({
          type: 'v0_request_resource',
          id,
          url: event.request.url,
          method: event.request.method,
          headers: Object.fromEntries(event.request.headers.entries()),
          body: event.request.body
            ? await event.request.arrayBuffer()
            : undefined,
        })

        const maybeResponse = await promise
        if (maybeResponse) {
          return new Response(maybeResponse.body, {
            status: maybeResponse.status,
            headers: maybeResponse.headers,
          })
        }
      }
    }
  }

  return fetch(event.request)
}

// Only text-based files for now
function getMimeType(path) {
  path = path.toLowerCase()
  if (path.endsWith('.html')) return 'text/html'
  if (path.endsWith('.js')) return 'text/javascript'
  if (path.endsWith('.css')) return 'text/css'
  if (path.endsWith('.json')) return 'application/json'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  if (path.endsWith('.xml')) return 'application/xml'
  if (path.endsWith('.txt')) return 'text/plain'
  if (path.endsWith('.md')) return 'text/markdown'
  if (path.endsWith('.csv')) return 'text/csv'
  return 'text/plain'
}

// Get the request destination. If it's a static file it's likely from
// <img>, <audio>, <video>, <link rel="stylesheet">, etc.
function isRequestDestinationStaticFile(request) {
  if (request.destination) {
    return ['image', 'audio', 'video', 'style', 'font'].includes(
      request.destination,
    )
  }
}
