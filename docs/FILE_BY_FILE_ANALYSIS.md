## Deep analysis of the files in the v0 preview iframe

### Blobs

#### /blobs/ff74fedc-a966-4e41-ac0a-ddce8c64686a

This blob is the compiled version of a `layout.tsx` file after v0's transformation pipeline. All imports are rewritten to blob URLs, JSX is transformed to `jsxDEV` calls with source mapping metadata (`__v0_e`, `__v0_r`, `__v0_c`), and React Refresh hooks are injected for hot module replacement. The blob is served by the service worker from its virtual file system and enables click-to-edit functionality by tracking element positions back to the original source code.

#### /blobs/f9c3111a-0ed4-47d9-a6b6-1100cd060fdc

This blob is a React Server Components client boundary wrapper that bridges server and client components. It imports the actual client component code (marked with `"use client"`) and wraps it with `createClientRef` to create a serializable reference that RSC can pass across the server/client boundary. This allows server components to reference client components without executing them on the server.

#### /blobs/9acdaddd-f157-4fea-b365-370a0da03ab3

Dynamic import helper that defines `self._d=u=>import(u)` for module loading. This provides a global shorthand for dynamic imports used throughout the compiled code, allowing v0 to intercept and track all dynamic module loads. The service worker can then resolve these imports to blob URLs from its virtual filesystem.

#### /blobs/47f7272e-cb05-45a2-a1fe-9f368317e878

Module shim that exports `jsxDEV` and `Fragment` from `window.__v0_modules__["__v0__/jsx-dev-runtime"]`. This bridges blob imports to pre-loaded React JSX runtime in the iframe's global scope. Instead of bundling React's JSX transform with every component, v0 loads it once in the iframe and all blobs reference it through this shim, reducing bundle size and ensuring a single React instance.

#### /blobs/51e26c0d-b481-4c2a-9aeb-8d921dd2239b

Module shim that exports `createServerRef` and `createClientRef` from `window.__v0_modules__["__v0__/internal"]`. These are React Server Components primitives that create serializable references across the server/client boundary. The shim ensures all RSC boundary wrappers use the same implementation loaded in the iframe.

#### /blobs/54d14d5f-522d-496b-9d60-6962e06c4df5

Module shim that exports `Inter` and `Instrument_Serif` from `window.__v0_modules__["next/font/google"]`. Next.js font optimization normally requires build-time processing, but v0 pre-loads optimized font configurations in the iframe. This shim lets user code import fonts as if they were built with Next.js, maintaining API compatibility without a real build step.

#### /blobs/4520d0ee-6c0a-4c30-aaf4-51dc021d566a

Module shim that exports React components and hooks from `window.__v0_modules__["React"]`. This is the main React library shim that provides `useState`, `useEffect`, `createElement`, and all other React APIs. Like the JSX runtime shim, this ensures a single React instance across all components and avoids bundling React multiple times.

#### /blobs/e3de79ea-e0e2-4a1e-8769-22619bb31b70

Compiled CSS module for `globals.css` that dynamically injects Tailwind styles and design tokens into a `<style>` tag. It includes HMR support with cleanup functions that remove the style tag and design token registry on hot reload.

#### Compiled original source

The following blobs are compiled versions of user-generated TypeScript/React components with HMR hooks and source mapping:

- **0ada8842-345c-4a67-9836-d4410e9e4d9d** → `@v0/components/cta-section.tsx`
- **04dc725d-6024-42dd-83d1-d6fc11b95c77** → Client component
- **6e32a4fb-ef0d-49fc-98b8-df818fe8f1db** → `@v0/components/testimonials-section.tsx`
- **6e7354d8-7c6e-4164-b692-a5a312c9655a** → `@v0/components/numbers-that-speak.tsx`
- **11cf9722-5520-4c15-a532-feb9fa3d1932** → `@v0/components/documentation-section.tsx`
- **71a36298-d8de-4739-9973-4d79bd7fa753** → `@v0/app/page.tsx`
- **80a52a6d-c793-4ae2-b349-5a9a83e135d0** → `@v0/components/smart-simple-brilliant.tsx`
- **0506d13d-51ab-4075-80f0-15699480b48e** → `@v0/components/faq-section.tsx`
- **3294cee3-1f53-4a90-bc3a-5fd61ee91842** → `@v0/components/your-work-in-sync.tsx`
- **69940794-2a03-4984-a250-c238fffc4f72** → `@v0/components/effortless-integration-updated.tsx`
- **f2fffce3-17e1-40e2-b543-c8eb4bdbc640** → `@v0/components/pricing-section.tsx`

### \_next

#### turbopack-deea11d9ec54de85.js

Turbopack's browser-side module runtime that powers the iframe's module system. It implements CommonJS-compatible `require`/`exports`, handles ES modules with top-level `await`, and dynamically loads code-split chunks by injecting `<script>` tags. When chunks load, they call `TURBOPACK.push()` to register module factories into a global Map, which are then instantiated on-demand when required. This runtime bridges v0's compiled blobs (served by the service worker) into executable modules within the preview iframe.

#### fa1e6965ae954a49.js

A Turbopack chunk containing **React 19.3.0-experimental** and browser polyfills.

**Module IDs:**

- **865611**: `process` polyfill — provides `nextTick`, `env`, `cwd`, and other Node.js APIs for browser
- **903664**: Process shim — uses global `process` if available, otherwise falls back to 865611
- **926171**: React core — full development build with hooks, component classes, context, transitions
- **789783**: React re-export — `module.exports = require(926171)`
- **947711**: JSX runtime internals
- **301224**: JSX runtime re-export
- **262799**: Additional React internals
- **546564**: Re-export of 262799

#### ed2584260f898214.js

A shared utilities chunk exporting common helper functions for v0 components.

**Module ID: 403055**

**Exports:**

- **`cn`**: `clsx` + `tailwind-merge` combo — merges Tailwind classes and resolves conflicts (e.g., `cn("p-4", "p-2")` → `"p-2"`)
- **`errorObject`**: Wraps a value in `{ error: value }`
- **`fetcher`**: Fetch wrapper with JSON parsing and error handling
- **`formatDate`**: Long date format (e.g., "December 3, 2025")
- **`formatShortDate`**: Short date format (e.g., "Dec 3, 2025")
- **`formatOrdinalSuffix`**: Adds ordinal suffixes (1st, 2nd, 3rd, etc.)
- **`isNonNullable`**: Type guard that returns `value !== null`
- **`isWithin30Days`**: Checks if date is within 30 days of now
- **`nFormatter`**: Compact number formatting (1000 → "1K", 1000000 → "1M")
- **`nanoid`**: Cryptographically secure ID generator using `window.crypto`
- **`sleep`**: Promise-based delay — `await sleep(1000)`
- **`unsafe_hash_cyrb64`**: Fast non-cryptographic cyrb64 hash function

The tailwind-merge configuration includes the complete Tailwind v4 class group definitions for conflict resolution.

#### ead6a467f3297802.js

A **Node.js core modules polyfill bundle** providing browser-compatible implementations of Node.js built-in APIs. This is entirely composed of well-known npm packages, not custom logic.

**Module ID: 679877** (entry point)

**Bundled Packages:**

| Package               | Purpose                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **events**            | `EventEmitter` polyfill                                                                       |
| **has-symbols**       | Symbol feature detection                                                                      |
| **has-tostringtag**   | `Symbol.toStringTag` detection                                                                |
| **function-bind**     | `Function.prototype.bind` polyfill                                                            |
| **get-intrinsic**     | Access to JS intrinsics (`%Array%`, `%Promise%`, etc.)                                        |
| **call-bind**         | Bound function utilities                                                                      |
| **which-typed-array** | TypedArray detection                                                                          |
| **is-typed-array**    | TypedArray type checking                                                                      |
| **util**              | Node.js `util` module (`format`, `inspect`, `deprecate`)                                      |
| **util/types**        | `isMap`, `isSet`, `isPromise`, `isTypedArray`, etc.                                           |
| **inherits**          | Prototype inheritance helper                                                                  |
| **readable-stream**   | Full Node.js Streams implementation                                                           |
| **string_decoder**    | UTF-8/16 string decoder                                                                       |
| **buffer**            | Node.js Buffer polyfill (references module 259390)                                            |
| **stream**            | Exports: `Readable`, `Writable`, `Duplex`, `Transform`, `PassThrough`, `finished`, `pipeline` |

**Stream Internal Module IDs:**

- **709** — `Readable`
- **337** — `Writable`
- **403** — `Duplex`
- **170** — `Transform`
- **889** — `PassThrough`
- **646** — Stream error codes (`ERR_STREAM_PUSH_AFTER_EOF`, etc.)
- **698** — `stream.finished()`
- **442** — `stream.pipeline()`

This chunk enables Next.js/Node.js code that uses `import { Readable } from 'stream'` or `import { Buffer } from 'buffer'` to work in the browser preview.

#### e13cc2e81c125756.js

**Next.js App Router client-side rendering infrastructure** — internal Next.js code, not custom v0 logic.

**Module ID: 238400** (entry point)

**Key Components:**

| Module ID  | Export                                                 | Purpose                                                                      |
| ---------- | ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **238400** | `disableSmoothScrollDuringRouteTransition`             | Temporarily disables smooth scrolling during navigation                      |
| **334007** | `HTTPAccessFallbackBoundary`                           | Error boundary for 404/403/401 (`notFound`, `forbidden`, `unauthorized`)     |
| **819571** | `useRouterBFCache`                                     | Back-forward cache hook for router state                                     |
| **934541** | LayoutRouter (default)                                 | Main layout router — segment rendering, scroll restoration, focus management |
| **859211** | Template (default)                                     | Template context consumer                                                    |
| **441779** | `createSearchParamsFromClient`                         | Server-side searchParams with prerender/cache context handling               |
| **237229** | `createParamsFromClient`, `createServerParamsForRoute` | Server-side params creation                                                  |
| **803449** | `ClientPageRoot`                                       | Root for client pages — injects `params`/`searchParams` props                |
| **275364** | `ClientSegmentRoot`                                    | Root for client segments (layouts/templates)                                 |

**Work Unit Types Handled:**

- `prerender`, `prerender-client`, `prerender-ppr`, `prerender-legacy` — Static generation
- `prerender-runtime` — Runtime prerender
- `cache`, `private-cache`, `unstable-cache` — Cache contexts
- `request` — Normal request handling

Next.js 15+ async params/searchParams pattern — requires `await` or `React.use()` to access.

#### d077b72dc35765e9.js

**Next.js internal utilities** for static generation and async storage.

**Module ID: 530975** (entry point)

| Module ID  | Export                                                                                          | Purpose                                        |
| ---------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **530975** | `warnOnce`                                                                                      | No-op warning function                         |
| **908635** | `ReflectAdapter`                                                                                | Wrapper around `Reflect` API with auto-binding |
| **896814** | `afterTaskAsyncStorageInstance`                                                                 | AsyncLocalStorage for `after()` tasks          |
| **351618** | `afterTaskAsyncStorage`                                                                         | Re-export of above                             |
| **26563**  | `throwWithStaticGenerationBailoutErrorWithDynamicError`, `throwForSearchParamsAccessInUseCache` | Static generation bailout error throwers       |

#### d25e1f1662990f43.js

**Mixed bundle** containing Buffer polyfill, Radix UI components, and lazy-load chunk definitions.

**Module ID: 31269** (entry point)

**Contents:**

1. **Buffer Polyfill** (internal modules 675, 72, 783)

   - Base64 encoding/decoding (`byteLength`, `toByteArray`, `fromByteArray`)
   - Full `Buffer` implementation for browser

2. **Radix UI Components** (module 57171 → 543921)

   - `@radix-ui/react-context-menu` — Root, Trigger, Content, Item, CheckboxItem, RadioGroup, RadioItem, Separator, Sub, SubTrigger, SubContent, etc.
   - `@radix-ui/react-select` — Select component with all primitives
   - `VisuallyHidden` — Accessibility helper component

3. **Lazy-Load Chunk Definitions** (~30 modules at end)
   - Dynamic import stubs that load additional chunks on demand
   - Pattern: `e.v((t) => Promise.all([...chunks].map(e.l)).then(() => t(moduleId)))`
   - Loads CSS and JS chunks for code-split components

**How Lazy-Loading Works:** Each lazy-load module (like 732801, 590449, etc.) acts as a proxy — when code tries to `import()` that module ID, instead of containing actual code, it contains instructions to fetch the real chunks. The pattern `e.v((t) => Promise.all([...].map(e.l)).then(() => t(moduleId)))` registers a virtual module (`e.v`) that, when requested, loads all dependent chunks in parallel via `e.l()` (which injects `<script>` tags), then resolves to the actual module ID once loaded. This indirection allows the initial page to load with a minimal bundle containing only the chunk manifest, while actual component code (Radix UI Dialog, Tooltip, etc.) lives in separate files fetched on-demand. Some modules share chunks (e.g., `952d80cee03a5181.js` appears multiple times) — Turbopack's deduplication ensures shared dependencies load only once.

#### b4b327466571ac26.js

**Next.js App Router client-side navigation runtime** (~5k lines, minified) — the core routing infrastructure that powers Next.js 13+ client-side behavior.

**Module ID: 52580** (entry point)

**Key Components:**

1. **Router State Management**

   | Module ID  | Export                             | Purpose                                            |
   | ---------- | ---------------------------------- | -------------------------------------------------- |
   | **52580**  | `computeChangedPath`               | Computes URL path changes between router states    |
   | **52580**  | `extractPathFromFlightRouterState` | Extracts pathname from FlightRouterState tree      |
   | **52580**  | `getSelectedParams`                | Extracts dynamic route params from router state    |
   | **514005** | `handleMutable`                    | Processes mutable state updates during navigation  |
   | **335997** | `isNavigatingToNewRootLayout`      | Detects root layout changes requiring full remount |

2. **PPR (Partial Pre-rendering) Navigation**

   | Module ID | Export                                 | Purpose                                     |
   | --------- | -------------------------------------- | ------------------------------------------- |
   | **78529** | `startPPRNavigation`                   | Initiates navigation with PPR-enabled pages |
   | **78529** | `listenForDynamicRequest`              | Streams dynamic content after initial shell |
   | **78529** | `updateCacheNodeOnPopstateRestoration` | Updates cache nodes on browser back/forward |
   | **78529** | `abortTask`                            | Cancels in-flight navigation tasks          |

3. **Prefetch System**

   | Module ID  | Export                   | Purpose                                       |
   | ---------- | ------------------------ | --------------------------------------------- |
   | **671451** | `schedulePrefetchTask`   | Queues background data fetching with priority |
   | **671451** | `cancelPrefetchTask`     | Cancels scheduled prefetch                    |
   | **671451** | `pingPrefetchTask`       | Triggers prefetch task execution              |
   | **671451** | `reschedulePrefetchTask` | Re-queues prefetch with updated params        |
   | **671451** | `isPrefetchTaskDirty`    | Checks if prefetch cache is stale             |

   **Priority Levels:** `Intent` (user hovering link) > `Default` > `Background`

4. **Route & Segment Cache**

   | Module ID  | Export                        | Purpose                           |
   | ---------- | ----------------------------- | --------------------------------- |
   | **176599** | `readRouteCacheEntry`         | Retrieves cached route data       |
   | **176599** | `readOrCreateRouteCacheEntry` | Gets or creates route cache entry |
   | **176599** | `readSegmentCacheEntry`       | Retrieves cached segment data     |
   | **176599** | `revalidateEntireCache`       | Invalidates all cached data       |
   | **176599** | `upgradeToPendingSegment`     | Marks segment as loading          |

5. **Navigation Reducers**

   | Action Type            | Reducer Module      | Purpose                              |
   | ---------------------- | ------------------- | ------------------------------------ |
   | `ACTION_NAVIGATE`      | navigateReducer     | Programmatic `router.push`/`replace` |
   | `ACTION_RESTORE`       | restoreReducer      | Browser back/forward (popstate)      |
   | `ACTION_REFRESH`       | refreshReducer      | Full page refresh                    |
   | `ACTION_HMR_REFRESH`   | hmrRefreshReducer   | Hot module replacement refresh       |
   | `ACTION_SERVER_ACTION` | serverActionReducer | Server action responses              |
   | `ACTION_SERVER_PATCH`  | serverPatchReducer  | RSC streaming patches                |

6. **Public Router API** (exposed as `window.next.router`)

   ```javascript
   {
     back(), // window.history.back()
       forward(), // window.history.forward()
       push(url, opts), // Client-side navigation
       replace(url, opts),
       prefetch(url, opts),
       refresh(), // Re-fetch current route
       hmrRefresh(); // Dev-only HMR trigger
   }
   ```

7. **Error Boundaries**

   | Module ID  | Export                    | Purpose                                             |
   | ---------- | ------------------------- | --------------------------------------------------- |
   | **579140** | `GracefulDegradeBoundary` | Captures errors, falls back to server-rendered HTML |
   | **946435** | Default export            | Bot-aware error boundary wrapper                    |

**Role in v0:** This bundle enables the live iframe preview to behave like a real Next.js app — supporting client-side navigation, link prefetching, RSC streaming, and HMR. The service worker serves this from IndexedDB so the iframe can run the full Next.js App Router without a real backend.

#### a7643d716c4022a1.js

**Radix UI primitives and Toast component bundle** (~1.5k lines) — foundational building blocks for shadcn/ui components.

**Bundled Packages:**

| Package                                  | Module IDs     | Purpose                                              |
| ---------------------------------------- | -------------- | ---------------------------------------------------- |
| `@radix-ui/react-slot`                   | 790456         | Polymorphic `Slot` component for `asChild` pattern   |
| `@radix-ui/react-primitive`              | 504015         | Base elements (`div`, `button`, etc.) with `asChild` |
| `@radix-ui/react-compose-refs`           | 987176         | `composeRefs`, `useComposedRefs`                     |
| `@radix-ui/react-context`                | 633182         | `createContextScope` for nested component contexts   |
| `@radix-ui/react-use-callback-ref`       | 753011         | Stable callback ref hook                             |
| `@radix-ui/react-use-controllable-state` | 28924          | Controlled/uncontrolled state pattern                |
| `@radix-ui/react-use-layout-effect`      | 729094         | SSR-safe `useLayoutEffect`                           |
| `@radix-ui/react-use-escape-keydown`     | 130344         | Escape key handler hook                              |
| `@radix-ui/react-presence`               | 713416         | Animation-aware mount/unmount                        |
| `@radix-ui/react-collection`             | 835098         | DOM-order aware roving focus                         |
| `@radix-ui/react-dismissable-layer`      | 266114         | Outside click, focus escape, Escape key handling     |
| `@radix-ui/react-portal`                 | 266114         | Renders into `document.body`                         |
| `@radix-ui/react-visually-hidden`        | 266114         | Screen-reader only content                           |
| `@radix-ui/react-toast`                  | 266114         | Full Toast component suite                           |
| `lucide-react`                           | 784938, 949002 | `X` (close) icon                                     |

**Toast Exports (Module 266114):** `Provider`, `Viewport`, `Root`, `Toast`, `Title`, `Description`, `Action`, `Close`, `createToastScope`

**Role in v0:** Provides the UI primitives that shadcn/ui components depend on. The `asChild` pattern (`<Button asChild><Link /></Button>`) used throughout shadcn/ui relies on these Radix primitives.

#### a16c47574124823f.js

**Next.js utilities and third-party libraries bundle** (~2.2k lines) — performance monitoring, script/image handling, and v0-specific utilities.

**Bundled Packages:**

| Package              | Module IDs                             | Purpose                                                                           |
| -------------------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| `web-vitals`         | 10378                                  | Core Web Vitals (CLS, FCP, FID, INP, LCP, TTFB)                                   |
| `next/script`        | 620453, 38415                          | Script loading strategies (`beforeInteractive`, `afterInteractive`, `lazyOnload`) |
| `next/head`          | 385598, 846037                         | Document `<head>` management                                                      |
| `next/image` (utils) | 892525, 284985, 620554, 591518, 367359 | Image optimization, blur placeholders, srcSet generation                          |
| `path-browserify`    | ~1650-2000                             | Node.js `path` polyfill (`join`, `dirname`, `basename`, `extname`)                |
| `lucide-react`       | 63594, 819696, 302799, 661555          | Icon components (`ChevronRight`, `ChevronDown`)                                   |

**v0-Specific Utilities:**

| Module ID  | Export                    | Purpose                                                      |
| ---------- | ------------------------- | ------------------------------------------------------------ |
| **310626** | `useReportWebVitals`      | React hook subscribing to all Core Web Vitals                |
| **907128** | `requestIdleCallback`     | Browser polyfill for idle callbacks                          |
| **819757** | `setGlobalTailwindConfig` | Tailwind CSS runtime configuration for v0 preview            |
| **83443**  | `corsProxyFetch`          | Routes external API calls through `/api/cors` to bypass CORS |

**CORS Proxy:** The `corsProxyFetch` function rewrites external API calls to go through v0's `/api/cors` endpoint, adding headers like `x-v0-proxy-method` and `x-v0-proxy-url` to bypass CORS restrictions in the iframe preview.

#### 634860773dc1c87b.js

**React DOM 19.3.0-experimental** (~23.5k lines) — full development build of the React reconciler and DOM renderer.

**Version:** `19.3.0-experimental-fb2177c1-20251114`

**Bundled Packages:**

| Package     | Module IDs     | Purpose                                          |
| ----------- | -------------- | ------------------------------------------------ |
| `scheduler` | 655079, 851319 | React's priority-based task scheduler (min-heap) |
| `react-dom` | 81032, 363875  | Full React DOM reconciler (development build)    |

**React 19 Experimental Features:**

- **View Transitions API** — Fiber tag 30, `<ViewTransition>` component
- **Activity component** — Fiber tag 31, for offscreen rendering
- **`use()` hook** — Suspense-based data fetching
- **Server Components** — RSC boundary handling

**Fiber Tags:**

| Tag      | Type               | Tag    | Type           |
| -------- | ------------------ | ------ | -------------- |
| 0, 1, 15 | Function/Class     | 13     | Suspense       |
| 5, 6     | Host element, Text | 19     | SuspenseList   |
| 7        | Fragment           | 22     | Offscreen      |
| 11       | ForwardRef         | **30** | ViewTransition |
| 9, 10    | Context            | **31** | Activity       |

**Exports:** `createRoot`, `hydrateRoot`, `version`

**Role in v0:** Core React runtime for all component rendering in the iframe preview. The experimental View Transitions feature enables smoother UI updates during HMR.

#### 6482184a1648f519.js

**@radix-ui/react-icons** (Module **754853**, ~10.3k lines) — complete Radix UI icon library with ~300 SVG icon components (15×15 viewBox). Used by shadcn/ui for icons like `Cross2Icon`, `ChevronDownIcon`, `GearIcon`, etc.

#### 1621132a36eb5adc.js

**@radix-ui/react-menu** (Module **728874**, ~1.9k lines) — menu primitive with `DismissableLayer`, `FocusScope`, and `react-remove-scroll`. Exports: `Root`, `Portal`, `Content`, `Item`, `CheckboxItem`, `RadioGroup`, `RadioItem`, `Sub`, `SubTrigger`, `SubContent`, `Separator`, `Label`. Powers shadcn/ui's `DropdownMenu`, `ContextMenu`, and `Menubar`.

#### 468106ffe453b040.js

**shadcn/ui Sidebar + Radix primitives** (Modules **739023**, **891269**, ~2k lines) — includes `@radix-ui/react-separator` (739023), `@radix-ui/react-presence` (891269), and the full **shadcn/ui Sidebar** component system. Exports: `Sidebar`, `SidebarProvider`, `SidebarTrigger`, `SidebarContent`, `SidebarHeader`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub`, `SidebarRail`, `useSidebar`, etc.

#### 8240f97a463e4043.js

**react-hook-form** (Module **168034**, ~1.7k lines) — performant form library with validation. Exports: `useForm`, `useController`, `useFieldArray`, `useFormState`, `useWatch`, `useFormContext`, `Controller`, `FormProvider`, `Form`.

#### 851a86b11757c16d.js

**next/navigation + Next.js internals** (~2.1k lines) — App Router navigation hooks and internal utilities.

| Module ID  | Package/Export            | Purpose                                                                            |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------- |
| **481258** | ESModule interop `_`      | Default export helper                                                              |
| **744066** | ESModule interop `_`      | Namespace import helper with WeakMap cache                                         |
| **373507** | `createAsyncLocalStorage` | Request context storage (AsyncLocalStorage polyfill)                               |
| **382169** | RSC headers               | `RSC_HEADER`, `ACTION_HEADER`, `NEXT_ROUTER_STATE_TREE_HEADER`, etc.               |
| **942580** | `BailoutToCSRError`       | Client-side rendering bailout error                                                |
| **779757** | `next/navigation`         | `useRouter`, `usePathname`, `useSearchParams`, `useParams`, `redirect`, `notFound` |

#### 830fa9e84bc1a0f7.js

**React Flight Client + App Router boundaries** (~2.9k lines) — RSC streaming runtime and error boundaries.

| Module ID  | Export                                 | Purpose                                                     |
| ---------- | -------------------------------------- | ----------------------------------------------------------- |
| **721676** | React Flight Client                    | RSC streaming, lazy loading, chunk management, JSON parsing |
| **979941** | `RedirectBoundary`                     | Handles `redirect()` calls in App Router                    |
| **926640** | `MetadataBoundary`, `ViewportBoundary` | Layout boundary components for metadata                     |
| **146516** | `hasInterceptionRouteInCurrentTree`    | Parallel route interception detection (`(..)`patterns)      |

**Role in v0:** This bundle enables the live iframe preview to handle RSC streaming and App Router boundaries, ensuring a seamless user experience.

#### 763d6f37ccd21ab9.js

**ES Module Shims polyfill** (~3.2k lines) — A minified [es-module-shims](https://github.com/guybedford/es-module-shims) library wrapped in a Turbopack chunk.

This file provides browser polyfills for:

- **Import Maps** — Allows `<script type="importmap">` support in all browsers
- **Dynamic `import()`** — Polyfills native ES module loading
- **CSS Modules** — Enables `import styles from './file.css'` syntax
- **JSON Modules** — Enables `import data from './file.json'` syntax
- **WASM Modules** — WebAssembly module import support
- **Module Preloading** — Handles `<link rel="modulepreload">` for optimized loading

Key features:

- Supports both native mode and "shim mode" (`module-shim`, `importmap-shim`)
- Resolves module specifiers using import maps with scope support
- Creates blob URLs for dynamically loaded modules
- Handles integrity checks and CORS credentials

**Role in v0:** Ensures ES modules work consistently across all browsers in the iframe preview. This allows v0's blob URL-based module system to resolve imports through import maps, enabling the virtual file system to serve compiled user code as if it were coming from a real module-aware server.

#### 402ea33e806c6f1f.js

**Floating UI** (~1.6k lines) — The modern positioning library (successor to Popper.js) for tooltips, popovers, dropdowns, and other floating elements.

| Module ID  | Package                  | Purpose                                            |
| ---------- | ------------------------ | -------------------------------------------------- |
| **436035** | `@floating-ui/dom`       | Core positioning engine with DOM platform bindings |
| **323337** | `@floating-ui/react-dom` | React hooks and middleware wrappers                |

**Core exports (436035):**

- `computePosition` — Main async function that calculates optimal x/y coordinates
- `autoUpdate` — Watches scroll, resize, and mutations to reposition automatically
- Middleware: `offset`, `shift`, `flip`, `autoPlacement`, `size`, `hide`, `arrow`, `inline`, `limitShift`

**React exports (323337):**

- `useFloating` — React hook for positioning floating elements
- React-wrapped middleware with ref support

**Role in v0:** Powers all floating UI elements in the preview iframe—tooltips, dropdowns, popovers, context menus, and select components from shadcn/ui and Radix primitives. Essential for any generated UI that requires positioned overlays.

#### 66bddb5522edac95.js

**Recharts utilities & components** (~3.6k lines) — Core utilities, React helpers, and UI components from the [Recharts](https://recharts.org/) charting library.

| Module ID  | Package/Export             | Purpose                                                                                                                         |
| ---------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **32864**  | `lodash/isNaN`             | NaN check utility                                                                                                               |
| **644007** | `recharts/util/DataUtils`  | `isNumber`, `isPercent`, `getPercentValue`, `interpolateNumber`, `getLinearRegression`, `uniqueId`, `mathSign`, `compareValues` |
| **191642** | `warn`                     | Console warning utility                                                                                                         |
| **150987** | `isNil`                    | Null/undefined check                                                                                                            |
| **347739** | `react-is`                 | React element type detection (`isFragment`, `isMemo`, `isLazy`, etc.)                                                           |
| **660067** | `recharts/util/ReactUtils` | SVG attribute filtering, event handler lists, `filterProps`                                                                     |
| **668581** | `TooltipBoundingBox`       | Tooltip positioning with animation and escape detection                                                                         |
| **Legend** | `recharts/Legend`          | Chart legend component with layout positioning                                                                                  |

Key features:

- Complete SVG attribute whitelist (~200 attributes) for safe prop filtering
- React event handler lists for DOM event forwarding
- Tooltip positioning with `translate3d` transforms and animation
- Legend component with horizontal/vertical layouts and alignment options

**Role in v0:** Enables data visualization in generated UIs. Recharts is commonly used for dashboards, analytics pages, and any charts (line, bar, pie, area, etc.) that v0 generates. The utilities handle SVG rendering, tooltip positioning, and legend display.

#### 42ea005479f0e414.js

**Radix UI primitives + shadcn/ui components bundle** (~4.4k lines) — Additional Radix primitives and styled shadcn/ui wrapper components.

| Module ID  | Package/Component             | Purpose                                                   |
| ---------- | ----------------------------- | --------------------------------------------------------- |
| **277218** | `@radix-ui/react-avatar`      | `Avatar`, `AvatarImage`, `AvatarFallback`                 |
| **966864** | `@radix-ui/react-radio-group` | `Radio`, `RadioIndicator`, `RadioGroup`, `RadioGroupItem` |
| **527069** | `clamp` utility               | Number clamping between min/max                           |
| **775453** | `composeEventHandlers`        | Combines event handlers with default prevention control   |
| **273311** | `useDirection`                | RTL/LTR direction context hook                            |
| **609297** | `usePrevious`                 | Previous value tracking hook                              |
| **610902** | `createCollection`            | DOM-order aware collection primitives                     |
| **454389** | `@radix-ui/react-slider`      | Full slider with keyboard nav, horizontal/vertical modes  |

**shadcn/ui Styled Components:**

| Module ID  | Component        | Description                                                       |
| ---------- | ---------------- | ----------------------------------------------------------------- |
| **880996** | `HoverCard`      | Hover-triggered popover with animation                            |
| **806582** | `Progress`       | Progress bar with animated indicator                              |
| **774007** | `Tabs`           | Tab navigation (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) |
| **686636** | `Switch`         | Toggle switch with checked/unchecked states                       |
| _(~4130)_  | `NavigationMenu` | Full navigation menu with viewport, indicator, links              |

**Key Patterns:**

- **Turbopack format**: `(globalThis.TURBOPACK || []).push([...])`
- **Module imports**: `e.i(moduleId)` resolves dependencies
- **Module exports**: `e.s([name, () => value, ...])` registers exports
- **Context scoping**: `createContextScope` for nested component composition
- **Controlled state**: `useControllableState` for controlled/uncontrolled patterns

**Role in v0:** Provides the UI component library that v0-generated code can import. Components like `Avatar`, `RadioGroup`, `Slider`, `Tabs`, `Switch`, `Progress`, `HoverCard`, and `NavigationMenu` are commonly used in generated UIs. The shadcn/ui wrappers add Tailwind styling via the `cn()` utility.

#### 25c64e2d35643714.js

**Core shadcn/ui components + Radix primitives bundle** (~3.9k lines) — The most essential UI component chunk containing Dialog, Button, DropdownMenu, and foundational primitives.

**shadcn/ui Components:**

| Module ID  | Component      | Description                                                            |
| ---------- | -------------- | ---------------------------------------------------------------------- |
| **415659** | `Toggle`       | Toggle button with on/off states, variants (default, outline)          |
| **952375** | `Badge`        | Status badges with variants (default, secondary, destructive, outline) |
| **766660** | `Dialog`       | Modal dialog with overlay, header, footer, title, description          |
| **306261** | `Button`       | Core button with 6 variants and 4 sizes, supports `asChild`            |
| **579890** | `Input`        | Form input with focus ring styling                                     |
| **292948** | `DropdownMenu` | Full dropdown menu system (styled wrapper over Radix)                  |

**Radix UI Primitives:**

| Module ID  | Package/Export                  | Purpose                                                 |
| ---------- | ------------------------------- | ------------------------------------------------------- |
| **35892**  | `@radix-ui/react-toggle`        | Controlled toggle primitive                             |
| **637118** | `@radix-ui/react-dialog`        | Dialog with focus trap, dismissable layer               |
| **905732** | `@radix-ui/react-dropdown-menu` | Full dropdown menu (trigger, content, items, sub-menus) |
| **151879** | `@radix-ui/react-roving-focus`  | Keyboard navigation for grouped elements                |
| **890446** | `@radix-ui/react-slot`          | `Slot`, `Slottable` for `asChild` pattern               |
| **359687** | `@radix-ui/react-context`       | `createContextScope` for nested contexts                |
| **221977** | `@radix-ui/react-compose-refs`  | `composeRefs`, `useComposedRefs`                        |

**Utility Hooks & Helpers:**

| Module ID  | Export             | Purpose                                    |
| ---------- | ------------------ | ------------------------------------------ |
| **968254** | `usePrevious`      | Tracks previous value of a prop            |
| **36102**  | `clamp`            | Clamps number between min/max              |
| **66561**  | `hideOthers`       | aria-hidden management for modal focus     |
| **274662** | `useSize`          | ResizeObserver-based element size tracking |
| **733174** | `useCallbackRef`   | Stable callback reference                  |
| **268024** | `useEscapeKeydown` | Escape key handler hook                    |
| **871598** | `useId`            | Generates unique IDs for accessibility     |
| **62535**  | `VisuallyHidden`   | Screen-reader only content                 |

**Icons (lucide-react):**

| Module ID  | Icon             | Usage                        |
| ---------- | ---------------- | ---------------------------- |
| **559219** | `Ellipsis`       | Three dots (more actions)    |
| **679912** | `MoreHorizontal` | Alias for Ellipsis           |
| **621553** | `Check`          | Checkbox/selection indicator |
| **615793** | `ChevronRight`   | Submenu indicator            |
| **731037** | `Circle`         | Radio item indicator         |

**Why It's Important:** This chunk contains the foundational components (`Button`, `Dialog`, `DropdownMenu`) that almost every v0-generated UI uses. The `Button` component alone is imported in nearly every generated page. The `asChild` pattern (via `Slot`) enables composition like `<Button asChild><Link /></Button>`. This is likely one of the first chunks loaded after the React runtime.

#### 9ac92110f8bf6115.js

**Next.js App Router bootstrap & hydration** (~850 lines) — The entry point that initializes and hydrates the Next.js App Router in the browser. This is the **first chunk executed** after React loads.

**Bootstrap Flow:**

1. **`appBootstrap`** (642499) — Entry point that loads scripts from `self.__next_s` queue, then calls `hydrate()`
2. **`hydrate`** (471009) — Main hydration function that:
   - Parses RSC payload from `self.__next_f` (ReadableStream)
   - Creates initial router state from flight data
   - Renders the app with `React.hydrateRoot()` or `createRoot()` (on error)

**Key Modules:**

| Module ID  | Export                             | Purpose                                                   |
| ---------- | ---------------------------------- | --------------------------------------------------------- |
| **428549** | Entry point                        | Sets `window.next.turbopack = true`, calls `appBootstrap` |
| **642499** | `appBootstrap`                     | Loads scripts, sets `window.next = { version, appDir }`   |
| **471009** | `hydrate`                          | Parses RSC stream, creates router state, hydrates React   |
| **441322** | `createInitialRouterState`         | Builds initial router state from flight data              |
| **713699** | Global error page                  | "Application error" fallback UI                           |
| **492576** | `onCaughtError`, `onUncaughtError` | React 19 error callbacks                                  |
| **901935** | `onRecoverableError`               | Handles recoverable hydration errors                      |

**Path Utilities:**

| Module ID  | Export                | Purpose                             |
| ---------- | --------------------- | ----------------------------------- |
| **946387** | `parsePath`           | Splits URL into pathname/query/hash |
| **144050** | `addPathPrefix`       | Adds base path prefix to URLs       |
| **572450** | `removeTrailingSlash` | Normalizes paths                    |
| **87648**  | `pathHasPrefix`       | Checks if path starts with prefix   |

**Browser Polyfills (826651):**

- `String.prototype.trimStart/trimEnd`
- `Symbol.prototype.description`
- `Array.prototype.flat/flatMap/at`
- `Promise.prototype.finally`
- `Object.fromEntries/hasOwn`
- `URL.canParse`

**RSC Streaming:**

The `hydrate` function reads from `self.__next_f` (populated by inline `<script>` tags in HTML):

- `[0]` — Bootstrap marker
- `[1, string]` — UTF-8 encoded RSC chunk
- `[2, value]` — Form state for hydration
- `[3, base64]` — Binary RSC chunk

**Version:** Sets `window.next = { version: "16.0.2-canary.24", appDir: true }`

**Why It's Critical:** This is the **entry point** for the entire Next.js App Router. Without this chunk, the iframe preview cannot initialize. It parses the RSC payload, creates the router state tree, and hydrates React onto the DOM. The polyfills ensure compatibility across browsers.

#### 8f909de9562b80d5.js

**Extended UI components bundle** (~4k lines) — A comprehensive collection of Radix UI primitives and shadcn/ui components for forms, navigation, overlays, and data visualization.

**Radix UI Primitives:**

| Module ID  | Package                        | Components                                                |
| ---------- | ------------------------------ | --------------------------------------------------------- |
| **130107** | `@radix-ui/react-checkbox`     | `Checkbox`, `CheckboxIndicator` (indeterminate support)   |
| **302714** | `@radix-ui/react-collapsible`  | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| **242512** | `@radix-ui/react-menubar`      | Full menubar with roving focus, keyboard nav              |
| **799336** | `@radix-ui/react-scroll-area`  | Custom scrollbars (hover/scroll/auto/always modes)        |
| **951883** | `@radix-ui/react-popover`      | Popover with focus trap, dismiss layer, positioning       |
| **979001** | `@radix-ui/react-alert-dialog` | Modal alert with cancel/action buttons                    |
| **448155** | `@radix-ui/react-roving-focus` | Keyboard navigation for grouped elements                  |
| **307111** | `@radix-ui/react-aspect-ratio` | Maintains aspect ratio for responsive content             |
| **385553** | `@radix-ui/react-slot`         | `Slot`, `Slottable`, `Primitive.*` elements               |

**shadcn/ui Components:**

| Module ID  | Component     | Description                                                                                                                                                |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **765103** | `Chart*`      | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`                                                               |
| **292533** | `AlertDialog` | Styled alert dialog (overlay, content, header, footer, title, description, action, cancel)                                                                 |
| **517394** | `ToggleGroup` | Group of toggle buttons with shared variant/size context                                                                                                   |
| **513391** | `Form`        | React Hook Form integration (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`)                                |
| **574386** | `Breadcrumb`  | Navigation breadcrumbs (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`) |

**ScrollArea Implementation:**

The ScrollArea primitive (~500 lines) is particularly sophisticated:

- **4 visibility modes**: `hover`, `scroll`, `auto`, `always`
- **State machine** for scroll visibility: `hidden` → `scrolling` → `interacting` → `idle` → `hidden`
- **Custom thumb sizing** via CSS variables: `--radix-scroll-area-thumb-width/height`
- **RTL support** with directional positioning

**Chart Components:**

Built on top of Recharts, provides:

- `ChartContainer` — Wrapper with responsive container and CSS variable injection
- `ChartTooltip` / `ChartTooltipContent` — Styled tooltip with color indicators (dot/line/dashed)
- `ChartLegend` / `ChartLegendContent` — Legend with configurable icons and labels

**Form Integration:**

Wraps `react-hook-form` with:

- Context-based field state management
- Automatic `aria-describedby` and `aria-invalid` attributes
- Error message display from validation

**Role in v0:** This chunk provides the extended component library for more complex UIs — forms with validation, data visualization charts, navigation breadcrumbs, scrollable containers, alert dialogs, and collapsible panels. These are commonly used in dashboards, settings pages, and data-heavy interfaces.

#### 08d589c3b5dc22c8.js

**Radix UI primitives + scroll-locking utilities** (~1.8k lines) — Foundational building blocks for modal dialogs, focus management, and scroll prevention.

**Bundled Packages:**

| Module ID  | Package                                  | Purpose                                           |
| ---------- | ---------------------------------------- | ------------------------------------------------- |
| **373630** | `@radix-ui/react-presence`               | Animation-aware mount/unmount for components      |
| **824627** | `tslib`                                  | TypeScript runtime helpers (`__assign`, `__rest`) |
| **992330** | `react-remove-scroll-bar`                | CSS class names for scroll bar removal            |
| **816370** | `use-sidecar`                            | Ref merging utilities (`useMergeRefs`)            |
| **906606** | `use-sidecar`                            | Sidecar medium pattern (`createSidecarMedium`)    |
| **946382** | `use-sidecar`                            | Sidecar export helper (`exportSidecar`)           |
| **769126** | `react-style-singleton`                  | Injects singleton `<style>` tags                  |
| **494643** | `react-remove-scroll-bar`                | `RemoveScrollBar` component                       |
| **645751** | `aria-hidden`                            | `hideOthers()` — hides siblings for accessibility |
| **889655** | `@radix-ui/react-context`                | `createContext`, `createContextScope`             |
| **867645** | `@radix-ui/react-use-callback-ref`       | Stable callback ref hook                          |
| **674180** | `@radix-ui/react-use-layout-effect`      | SSR-safe `useLayoutEffect`                        |
| **45616**  | `@radix-ui/react-compose-refs`           | `composeRefs`, `useComposedRefs`                  |
| **436836** | `@radix-ui/react-primitive`              | Base `Primitive` elements with `asChild` support  |
| **851279** | `@radix-ui/react-slot`                   | Polymorphic `Slot` component                      |
| **551150** | `@radix-ui/react-compose-event-handlers` | `composeEventHandlers`                            |
| **633439** | `@radix-ui/react-use-controllable-state` | Controlled/uncontrolled state pattern             |
| **803040** | `@radix-ui/react-id`                     | `useId` hook                                      |
| **659671** | `@radix-ui/react-dismissable-layer`      | Outside click, escape key, focus escape handling  |
| **291239** | `@radix-ui/react-use-escape-keydown`     | Escape key listener                               |
| **32885**  | `@radix-ui/react-focus-scope`            | Focus trapping for modals/dialogs                 |
| **391110** | `@radix-ui/react-portal`                 | Renders content into `document.body`              |
| **973309** | `@radix-ui/react-focus-guards`           | Focus guard elements                              |
| **115479** | `react-remove-scroll`                    | Full scroll lock implementation                   |

**Key Components:**

1. **Presence** (373630) — Animation-aware presence detection with state machine (`mounted` → `unmountSuspended` → `unmounted`) that delays unmounting until exit animations complete.

2. **DismissableLayer** (659671) — Handles dismissal interactions:

   - Outside click detection via `pointerdown`/`click` events
   - Focus escape detection via `focusin`/`focusout`
   - Escape key handling via `keydown`
   - Supports stacked layers with proper event propagation

3. **FocusScope** (32885) — Focus trapping for modal dialogs:

   - Tab key navigation within scope
   - Auto-focus on mount, focus restoration on unmount
   - MutationObserver for dynamic content changes

4. **RemoveScroll** (115479) — Prevents background scrolling when modals are open:

   - Handles mouse wheel and touch events
   - Supports `shards` (elements that should still scroll)
   - Manages scroll bar gap compensation

5. **Primitive** (436836) — Base elements (`div`, `button`, `span`, etc.) with the `asChild` pattern for composition.

**Role in v0:** This chunk provides the **foundational UI primitives** that all shadcn/ui overlay components depend on. When v0 generates components using `<Dialog>`, `<Popover>`, `<Dropdown>`, `<Tooltip>`, or any modal/floating UI, this chunk provides the underlying infrastructure for proper accessibility (focus trapping, aria-hidden), keyboard navigation (Escape to close), scroll locking, and animation handling. This is a critical dependency loaded early in the component hierarchy.

#### 5ed90d5453ebbe05.js

**Lodash utilities + D3 math constants** (~1.4k lines) — A comprehensive bundle of Lodash internal utilities and D3 visualization math helpers.

**Chunk ID:** `272098`

**Lodash Core Utilities:**

| Module ID  | Function       | Purpose                                       |
| ---------- | -------------- | --------------------------------------------- |
| **272098** | `isArray`      | `Array.isArray` wrapper                       |
| **555221** | `isString`     | Checks if value is a string                   |
| **363883** | `isFunction`   | Checks for Function, GeneratorFunction, Proxy |
| **791606** | `isObject`     | Checks if value is object type                |
| **819674** | `isObjectLike` | Checks if value is object-like                |
| **248664** | `isSymbol`     | Checks if value is a Symbol                   |
| **707850** | `isArrayLike`  | Checks if value has length property           |
| **145373** | `isLength`     | Checks if value is valid array length         |
| **417288** | `isArguments`  | Checks for arguments object                   |
| **385370** | `isBuffer`     | Checks for Buffer object                      |
| **713376** | `isTypedArray` | Checks for TypedArray types                   |

**Path & Property Access:**

| Module ID  | Function       | Purpose                                   |
| ---------- | -------------- | ----------------------------------------- |
| **461317** | `get`          | Gets value at path of object (`_.get`)    |
| **498814** | `has`          | Checks if path exists in object (`_.has`) |
| **462931** | `isKey`        | Checks if value is a property key         |
| **659461** | `stringToPath` | Converts string path to array (memoized)  |
| **660575** | `castPath`     | Casts value to property path array        |
| **747449** | `baseGet`      | Base implementation of `get`              |
| **728359** | `toKey`        | Converts value to string key              |

**Data Structures:**

| Module ID  | Class/Function | Purpose                                      |
| ---------- | -------------- | -------------------------------------------- |
| **804937** | `Hash`         | Hash map using `Object.create(null)`         |
| **922416** | `ListCache`    | Array-based key-value cache                  |
| **141177** | `MapCache`     | Map-based cache with hash/string/map buckets |
| **875266** | `Stack`        | Stack data structure for deep operations     |
| **25964**  | `SetCache`     | Set-like cache for array uniqueness checks   |

**Deep Equality (`_.isEqual`):**

| Module ID  | Function          | Purpose                                     |
| ---------- | ----------------- | ------------------------------------------- |
| **733698** | `baseIsEqual`     | Base deep equality comparison               |
| **954525** | `baseIsEqualDeep` | Deep comparison for objects/arrays          |
| **275483** | `equalArrays`     | Array equality with customizer support      |
| **339965** | `equalByTag`      | Equality for typed objects (Map, Set, etc.) |
| **703206** | `equalObjects`    | Object equality with key comparison         |

**Memoization & Caching:**

| Module ID  | Function        | Purpose                              |
| ---------- | --------------- | ------------------------------------ |
| **297230** | `memoize`       | Creates memoized function with cache |
| **43096**  | `memoizeCapped` | Memoize with 500-entry cache limit   |

**Array & Object Utilities:**

| Module ID  | Function      | Purpose                         |
| ---------- | ------------- | ------------------------------- |
| **777735** | `baseFlatten` | Recursive array flattening      |
| **166536** | `arrayMap`    | Array map implementation        |
| **577484** | `arraySome`   | Array some implementation       |
| **419519** | `arrayFilter` | Array filter implementation     |
| **833089** | `keys`        | Gets enumerable property names  |
| **896852** | `getSymbols`  | Gets enumerable symbols         |
| **628423** | `getAllKeys`  | Gets all keys including symbols |
| **610673** | `baseForOwn`  | Iterates own properties         |

**Native Function Detection:**

| Module ID  | Function       | Purpose                            |
| ---------- | -------------- | ---------------------------------- |
| **622280** | `getNative`    | Gets native function by key        |
| **732150** | `baseIsNative` | Checks if value is native function |
| **763803** | `isMasked`     | Checks for core-js masking         |
| **395331** | `toSource`     | Converts function to source string |

**D3 Math Utilities (Module 424885):**

| Export    | Value/Function   | Purpose                         |
| --------- | ---------------- | ------------------------------- |
| `abs`     | `Math.abs`       | Absolute value                  |
| `acos`    | Custom (clamped) | Arc cosine with bounds checking |
| `asin`    | Custom (clamped) | Arc sine with bounds checking   |
| `atan2`   | `Math.atan2`     | Two-argument arc tangent        |
| `cos`     | `Math.cos`       | Cosine                          |
| `sin`     | `Math.sin`       | Sine                            |
| `sqrt`    | `Math.sqrt`      | Square root                     |
| `max`     | `Math.max`       | Maximum value                   |
| `min`     | `Math.min`       | Minimum value                   |
| `pi`      | `Math.PI`        | Pi constant                     |
| `halfPi`  | `Math.PI / 2`    | Half pi                         |
| `tau`     | `Math.PI * 2`    | Tau (2π)                        |
| `epsilon` | `1e-12`          | Small epsilon for comparisons   |

**Role in v0:** This chunk provides the utility foundation for data manipulation and comparison used throughout v0's component library and charting tools. The `get` and `has` functions enable safe deep property access in generated code, `isEqual` powers form state comparison and memoization, and the D3 math utilities support the Recharts-based data visualization components. These lodash utilities are dependencies for many higher-level libraries in the v0 runtime.

#### 3c5a50b846ef9dd1.js

**Next.js core utilities + `next/dynamic` + `next/link` + lazy-load orchestration** (~870 lines) — A critical infrastructure bundle containing Next.js internals, dynamic imports, client-side navigation, error classes, and v0's chunk loading definitions.

**Chunk ID:** `530975`

**Next.js Internal Utilities:**

| Module ID  | Export                                                  | Purpose                                         |
| ---------- | ------------------------------------------------------- | ----------------------------------------------- |
| **530975** | `warnOnce`                                              | No-op warning function (stripped in production) |
| **908635** | `ReflectAdapter`                                        | Wrapper around `Reflect` API with auto-binding  |
| **896814** | `afterTaskAsyncStorageInstance`                         | AsyncLocalStorage for `after()` tasks           |
| **351618** | `afterTaskAsyncStorage`                                 | Re-export of above                              |
| **26563**  | `throwWithStaticGenerationBailoutErrorWithDynamicError` | Static generation bailout error thrower         |
| **26563**  | `throwForSearchParamsAccessInUseCache`                  | Error for searchParams in "use cache"           |
| **26563**  | `isRequestAPICallableInsideAfter`                       | Checks if request API callable in after()       |
| **175682** | `useMergedRef`                                          | Merges two refs into one callback ref           |
| **597999** | `encodeURIPath`                                         | URL-encodes each path segment                   |
| **57889**  | `errorOnce`                                             | No-op error logging (stripped in production)    |

**`next/dynamic` Implementation:**

| Module ID  | Export          | Purpose                                             |
| ---------- | --------------- | --------------------------------------------------- |
| **344814** | `BailoutToCSR`  | Forces client-side rendering bailout                |
| **55599**  | `PreloadChunks` | Preloads CSS/JS chunks for dynamic imports          |
| **592376** | (internal)      | Core loadable component with `React.lazy()` wrapper |
| **936885** | `default`       | Public `next/dynamic` API with SSR control          |

How `next/dynamic` works:

1. Wraps `React.lazy()` with SSR support
2. Uses `PreloadChunks` to inject `<link>` tags for CSS and `preload()` for JS
3. `BailoutToCSR` throws on server when `ssr: false`
4. Supports `loading` component for Suspense fallback

**URL & Query Utilities:**

| Module ID  | Export                   | Purpose                                  |
| ---------- | ------------------------ | ---------------------------------------- |
| **200133** | `searchParamsToUrlQuery` | Converts URLSearchParams to query object |
| **200133** | `urlQueryToSearchParams` | Converts query object to URLSearchParams |
| **200133** | `assign`                 | Merges URLSearchParams                   |
| **4326**   | `formatUrl`              | Formats URL object to string             |
| **4326**   | `urlObjectKeys`          | List of valid URL object properties      |
| **211871** | `isLocalURL`             | Checks if URL is local (same origin)     |

**Error Classes (Module 873001):**

| Export                    | Purpose                             |
| ------------------------- | ----------------------------------- |
| `DecodeError`             | URL decoding error                  |
| `NormalizeError`          | URL normalization error             |
| `PageNotFoundError`       | 404 page not found (code: `ENOENT`) |
| `MissingStaticPage`       | Static page generation failure      |
| `MiddlewareNotFoundError` | Missing middleware module           |

**Utility Functions (Module 873001):**

| Export                     | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `WEB_VITALS`               | `["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]` |
| `execOnce`                 | Ensures function runs only once               |
| `isAbsoluteUrl`            | Regex check for absolute URLs                 |
| `getLocationOrigin`        | Returns `protocol://hostname:port`            |
| `getURL`                   | Returns current URL path                      |
| `getDisplayName`           | Gets component display name                   |
| `isResSent`                | Checks if response headers sent               |
| `loadGetInitialProps`      | Calls `getInitialProps` with error handling   |
| `normalizeRepeatedSlashes` | Normalizes `//` to `/` in paths               |
| `stringifyError`           | JSON stringifies error with stack             |
| `SP`                       | `typeof performance !== 'undefined'`          |
| `ST`                       | Performance timing API available              |

**`next/link` Implementation (Module 803334):**

Full implementation of the `<Link>` component with:

- **Prefetching** via `FetchStrategy.PPR` (Partial Pre-rendering) or `FetchStrategy.Full`
- **Navigation** with `router.push`/`replace` via `dispatchNavigateAction`
- **Scroll restoration** control via `scroll` prop
- **Legacy behavior** support (`legacyBehavior` prop for wrapping `<a>` tags)
- **Link status** tracking via `useLinkStatus` hook and React context
- **Event handlers**: `onClick`, `onMouseEnter`, `onTouchStart` for navigation intent
- **`onNavigate`** callback with `preventDefault()` support

Props handled: `href`, `as`, `prefetch`, `passHref`, `replace`, `shallow`, `scroll`, `onClick`, `onMouseEnter`, `onTouchStart`, `legacyBehavior`, `onNavigate`, `ref`, `unstable_dynamicOnHover`

**v0-Specific Utilities:**

| Module ID  | Export                  | Purpose                                          |
| ---------- | ----------------------- | ------------------------------------------------ |
| **697391** | `TailwindVersionSetter` | Sets Tailwind version via `setTailwindVersion()` |
| **232993** | `ClientEntryWrapper`    | Lazy-loads `ClientEntry` with SSR disabled       |
| **720104** | `MissingEnvs`           | Reports missing environment variables to parent  |

**Lazy-Load Chunk Definitions:**

**Module 365731** — Loads 3 chunks for module `86735`:

```
ce490cc65ffaff99.js, 6371359c377ffbc8.js, 952723a7420f8193.js
```

**Module 575733** — Loads **17 chunks** for `ClientEntry` (module `189715`):

| Chunk                 | Content                            |
| --------------------- | ---------------------------------- |
| `3a384aa7a60f1de8.js` | (additional code)                  |
| `402ea33e806c6f1f.js` | Floating UI positioning            |
| `ed2584260f898214.js` | Shared utilities (`cn`, `nanoid`)  |
| `8240f97a463e4043.js` | react-hook-form                    |
| `66bddb5522edac95.js` | Recharts utilities                 |
| `ead6a467f3297802.js` | Node.js polyfills (Buffer, Stream) |
| `08d589c3b5dc22c8.js` | Radix UI primitives                |
| `25c64e2d35643714.js` | shadcn/ui core (Button, Dialog)    |
| `5ed90d5453ebbe05.js` | Lodash + D3 math                   |
| `6482184a1648f519.js` | Radix icons                        |
| `1621132a36eb5adc.js` | Radix menu                         |
| `b114f950a0cd6ced.js` | Extended UI components             |
| `8f909de9562b80d5.js` | Charts, forms, ScrollArea          |
| `468106ffe453b040.js` | Sidebar component                  |
| `a7643d716c4022a1.js` | Toast component                    |
| `42ea005479f0e414.js` | More Radix primitives              |
| `d25e1f1662990f43.js` | Buffer polyfill + Select           |

**Role in v0:** This is one of the most **critical infrastructure bundles** in the v0 runtime. It provides:

1. **Dynamic imports** (`next/dynamic`) — Enables code-splitting for v0-generated components with SSR control
2. **Link component** (`next/link`) — Full client-side navigation with prefetching and scroll management
3. **Error handling** — Standard Next.js error classes for 404s, middleware errors, static generation failures
4. **Chunk orchestration** — The `ClientEntryWrapper` defines the loading order for the entire v0 component library (17 chunks totaling the full UI toolkit)

The lazy-load definition in module 575733 is essentially the **manifest for v0's entire UI component system** — when the preview iframe needs to render user-generated code, this module triggers the parallel loading of all shadcn/ui components, Radix primitives, form libraries, charting tools, and utilities.

#### 4f7c02ce1aa015db.js

**Node.js Buffer polyfill** (~1.5k lines) — Full browser implementation of Node.js `Buffer` API with base64 and IEEE 754 float support.

**Module IDs:**

| Module ID  | Package     | Purpose                                          |
| ---------- | ----------- | ------------------------------------------------ |
| **210102** | `base64-js` | Base64 encoding/decoding                         |
| **962866** | `ieee754`   | IEEE 754 float read/write operations             |
| **259390** | `buffer`    | Full Node.js `Buffer` implementation for browser |

**Module 210102 — Base64 (`base64-js`):**

| Export          | Purpose                                |
| --------------- | -------------------------------------- |
| `byteLength`    | Calculate byte length of base64 string |
| `toByteArray`   | Decode base64 string → Uint8Array      |
| `fromByteArray` | Encode Uint8Array → base64 string      |

**Module 962866 — IEEE 754:**

| Export  | Purpose                                                        |
| ------- | -------------------------------------------------------------- |
| `read`  | Read float/double from buffer (`buf, offset, isLE, mLen, len`) |
| `write` | Write float/double to buffer (`buf, val, offset, isLE, mLen`)  |

**Module 259390 — Buffer (Main Export):**

**Static Methods:**

| Method                 | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `Buffer.from()`        | Create buffer from string/array/ArrayBuffer |
| `Buffer.alloc()`       | Allocate zero-filled buffer                 |
| `Buffer.allocUnsafe()` | Allocate uninitialized buffer               |
| `Buffer.concat()`      | Concatenate array of buffers                |
| `Buffer.isBuffer()`    | Check if value is a Buffer                  |
| `Buffer.compare()`     | Compare two buffers                         |
| `Buffer.isEncoding()`  | Check if encoding is supported              |
| `Buffer.byteLength()`  | Get byte length of string in encoding       |

**Supported Encodings:** `utf8`, `utf-8`, `ascii`, `latin1`, `binary`, `base64`, `hex`, `ucs2`, `ucs-2`, `utf16le`, `utf-16le`

**Read Methods:**

| Method                       | Purpose                        |
| ---------------------------- | ------------------------------ |
| `readUInt8/16/32LE/BE`       | Read unsigned integers         |
| `readInt8/16/32LE/BE`        | Read signed integers           |
| `readBigUInt64LE/BE`         | Read unsigned 64-bit BigInt    |
| `readBigInt64LE/BE`          | Read signed 64-bit BigInt      |
| `readFloatLE/BE`             | Read 32-bit float              |
| `readDoubleLE/BE`            | Read 64-bit double             |
| `readUIntLE/BE(offset, len)` | Read arbitrary-length unsigned |
| `readIntLE/BE(offset, len)`  | Read arbitrary-length signed   |

**Write Methods:**

| Method                          | Purpose                         |
| ------------------------------- | ------------------------------- |
| `writeUInt8/16/32LE/BE`         | Write unsigned integers         |
| `writeInt8/16/32LE/BE`          | Write signed integers           |
| `writeBigUInt64LE/BE`           | Write unsigned 64-bit BigInt    |
| `writeBigInt64LE/BE`            | Write signed 64-bit BigInt      |
| `writeFloatLE/BE`               | Write 32-bit float              |
| `writeDoubleLE/BE`              | Write 64-bit double             |
| `writeUIntLE/BE(val, off, len)` | Write arbitrary-length unsigned |
| `writeIntLE/BE(val, off, len)`  | Write arbitrary-length signed   |

**Instance Methods:**

| Method             | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `toString(enc)`    | Convert to string with encoding           |
| `slice(start,end)` | Return new buffer referencing same memory |
| `copy(target)`     | Copy bytes to target buffer               |
| `fill(value)`      | Fill buffer with value                    |
| `indexOf(val)`     | Find first occurrence of value            |
| `lastIndexOf(val)` | Find last occurrence of value             |
| `includes(val)`    | Check if buffer contains value            |
| `compare(target)`  | Compare with another buffer               |
| `equals(other)`    | Check equality with another buffer        |
| `swap16/32/64()`   | Swap byte order in place                  |
| `toJSON()`         | Return `{ type: "Buffer", data: [...] }`  |

**Error Classes:**

| Error                      | Purpose                      |
| -------------------------- | ---------------------------- |
| `ERR_BUFFER_OUT_OF_BOUNDS` | Access outside buffer bounds |
| `ERR_INVALID_ARG_TYPE`     | Invalid argument type        |
| `ERR_OUT_OF_RANGE`         | Value out of valid range     |

**Role in v0:** This chunk enables Node.js code that uses `Buffer` to run in the browser. Many npm packages (streams, crypto utilities, binary parsers) depend on Buffer APIs. The polyfill extends `Uint8Array` with the full Node.js Buffer interface, allowing code like `Buffer.from('hello').toString('base64')` to work seamlessly in the iframe preview. This is a foundational dependency loaded early, as other polyfills (like `stream` in `ead6a467f3297802.js`) depend on it.

#### 0b72ca69c897003b.js

**v0 Runtime Utilities: Google Fonts + Chroma.js + Generation Logs + LRU Cache** (~3.7k lines) — Core runtime utilities bundle containing font loading, color manipulation, security scanning, caching, and v0 constants.

**Chunk ID:** `219094`

---

**1. Google Fonts Loader (Module 219094)**

**Export:** `getNextFontGoogleMod`

Dynamically loads Google Fonts at runtime:

1. Builds Google Fonts CSS URL with weight/style/display params
2. Injects `<link rel="stylesheet">` into `<head>`
3. Creates CSS classes for font application
4. Returns `{ className, style, variable }`

---

**2. v0 Generation Logs & Runtime Analyzer (Modules 970422 + 249875)**

| Export                          | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `FatalRendererError`            | Custom error class with error code            |
| `addGenerationLog`              | Adds warning/error to generation log (max 10) |
| `getGenerationLogs`             | Returns collected logs array                  |
| `startCollectingGenerationLogs` | Resets and enables log collection             |
| `stopCollectingGenerationLogs`  | Disables collection, processes analyzer logs  |
| `withNewGenerationLogsReport`   | Wraps promise with log collection lifecycle   |
| `collectRuntimeAnalyzerLogs`    | Returns runtime analyzer messages             |
| `trackRuntimeModuleCreation`    | **Security scanner** for exposed secrets      |

**Secret Detection:** Detects `NEXT_PUBLIC_*_KEY`, `NEXT_PUBLIC_*_SECRET`, `NEXT_PUBLIC_*_TOKEN`, `NEXT_PUBLIC_*_OAUTH` — EXCEPT safe ones like `SUPABASE_PUBLIC`, `STRIPE_PUBLISHABLE`, `FIREBASE_API`, `CLERK_PUBLISHABLE`, `VAPID_PUBLIC`, `MIXPANEL_TOKEN`, `PAYSTACK_PUBLIC`.

---

**3. Chroma.js Color Library (v3.1.2)**

A complete color manipulation library (~2000+ lines) for v0's theming system.

**Color Spaces:**

| Space       | Method              | Notes                                   |
| ----------- | ------------------- | --------------------------------------- |
| RGB/RGBA    | `.rgb()`, `.rgba()` | 0-255 integer values                    |
| Hex         | `.hex()`            | `#RGB`, `#RRGGBB`, `#RRGGBBAA`          |
| HSL/HSLA    | `.hsl()`            | Hue 0-360, Sat/Light 0-1                |
| HSV         | `.hsv()`            | Hue/Saturation/Value                    |
| HSI         | `.hsi()`            | Hue/Saturation/Intensity                |
| HCG         | `.hcg()`            | Hue/Chroma/Greyness                     |
| LAB         | `.lab()`            | CIE L\*a\*b\* with D50/D65 white points |
| LCH         | `.lch()`, `.hcl()`  | CIE L\*C\*h cylindrical                 |
| OkLAB       | `.oklab()`          | Perceptually uniform                    |
| OkLCH       | `.oklch()`          | Modern CSS color space                  |
| CMYK        | `.cmyk()`           | Cyan/Magenta/Yellow/Key                 |
| Temperature | `.temperature()`    | Kelvin to RGB conversion                |

**Color Operations:**

| Method                 | Purpose                    |
| ---------------------- | -------------------------- |
| `.darken(n)`           | Darken by n × 18 LAB units |
| `.brighten(n)`         | Lighten color              |
| `.saturate(n)`         | Increase chroma            |
| `.desaturate(n)`       | Decrease chroma            |
| `.alpha(a)`            | Get/set alpha channel      |
| `.luminance(l)`        | Get/set relative luminance |
| `.mix(color, ratio)`   | Interpolate between colors |
| `.tint(ratio)`         | Mix with white             |
| `.shade(ratio)`        | Mix with black             |
| `.set(channel, value)` | Modify specific channel    |

**Blend Modes:** `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `dodge`, `burn`

**ColorBrewer Palettes:**

- **Sequential:** `OrRd`, `PuBu`, `BuPu`, `Oranges`, `BuGn`, `YlOrBr`, `YlGn`, `Reds`, `RdPu`, `Greens`, `YlGnBu`, `Purples`, `GnBu`, `Greys`, `YlOrRd`, `PuRd`, `Blues`, `PuBuGn`, `Viridis`
- **Diverging:** `Spectral`, `RdYlGn`, `RdBu`, `PiYG`, `PRGn`, `RdYlBu`, `BrBG`, `RdGy`, `PuOr`
- **Qualitative:** `Set1`, `Set2`, `Set3`, `Pastel1`, `Pastel2`, `Dark2`, `Accent`, `Paired`

**Analysis & Utilities:**

| Function                       | Purpose                                                |
| ------------------------------ | ------------------------------------------------------ |
| `chroma.contrast(a, b)`        | WCAG contrast ratio                                    |
| `chroma.contrastAPCA(a, b)`    | APCA contrast (modern accessibility)                   |
| `chroma.deltaE(a, b)`          | CIE ΔE\*00 color difference                            |
| `chroma.distance(a, b)`        | Euclidean distance in color space                      |
| `chroma.scale([colors])`       | Create color scale                                     |
| `chroma.bezier([colors])`      | Bezier-interpolated scale                              |
| `chroma.analyze(data)`         | Analyze array for scale creation                       |
| `chroma.limits(data, mode, n)` | Calculate class breaks (equal, log, quantile, k-means) |
| `chroma.valid(color)`          | Check if color string is parseable                     |
| `chroma.random()`              | Generate random color                                  |

---

**4. v0 Constants (Module 634826)**

| Constant               | Value                | Purpose                                   |
| ---------------------- | -------------------- | ----------------------------------------- |
| `ESMSH_BASE_URL`       | `https://esm.v0.app` | ESM package CDN for imports               |
| `FAKE_GATEWAY_API_KEY` | `vck_abc123`         | Mock API key for preview                  |
| `GET_REQ_HEADERS`      | Function             | Returns simulated browser request headers |
| `LITE_PASS_THROUGH`    | RegExp               | Paths bypassing lite runtime              |

**`LITE_PASS_THROUGH` matches:** `/_next/`, `/api/esm`, `/api/cors`, `/api/dns`, `/api/encrypt-npm-token`, `/api/static-resource`, `/assets/...` (WASM, Tailwind, 3D libs, Stripe), `/favicon.ico`, `/__v0_sw.js`, `/placeholder.*`, `/fonts/`

---

**5. LRU Cache (Module 5743)**

**Export:** `LRUCache`

A full-featured Least Recently Used cache with:

- **TTL support** with auto-purge
- **Size-based eviction** (`maxSize`, `maxEntrySize`)
- **Stale-while-revalidate** pattern
- **Async fetch method** for loading
- **AbortController** integration
- **TypedArray-backed storage** (Uint8/16/32Array based on max size)

| Method                              | Purpose                          |
| ----------------------------------- | -------------------------------- |
| `get(key)`                          | Get value, updates recency       |
| `set(key, val)`                     | Set value with optional TTL/size |
| `has(key)`                          | Check existence                  |
| `delete(key)`                       | Remove entry                     |
| `peek(key)`                         | Get without updating recency     |
| `pop()`                             | Remove and return oldest         |
| `fetch(key)`                        | Async get with fetchMethod       |
| `clear()`                           | Remove all entries               |
| `dump()` / `load()`                 | Serialize/deserialize cache      |
| `forEach()`                         | Iterate entries                  |
| `entries()` / `keys()` / `values()` | Iterators                        |

---

**Role in v0:** This chunk is the **core runtime utilities bundle** for v0's preview iframe:

1. **Font loading** — Enables `next/font/google` in generated components by dynamically injecting Google Fonts CSS
2. **Security scanning** — `trackRuntimeModuleCreation` detects exposed API keys/secrets in user code and warns developers
3. **Theming & Visualization** — Chroma.js powers color manipulation for dynamic themes, chart colors, accessibility contrast checks, and color scale generation
4. **Caching** — LRU cache for ESM module resolution and compiled code caching with TTL support
5. **Request simulation** — `GET_REQ_HEADERS` simulates server request headers in the browser for middleware/API route testing

This is loaded early in the v0 runtime to support the full component rendering pipeline.

#### 0eea3dbce56890c9.js

**v0 Lite Runtime Router & Next.js API Shims** (~4.5k lines) — The most critical chunk in v0's architecture containing the complete client-side router, Next.js API implementations, and all infrastructure for the preview iframe.

**Chunk ID:** `464143`

---

**1. js-cookie (Module 464143)**

Cookie manipulation library:

| Export                      | Purpose                                                 |
| --------------------------- | ------------------------------------------------------- |
| `get(name)`                 | Get cookie value                                        |
| `set(name, value, options)` | Set cookie with expires, path, domain, secure, sameSite |
| `remove(name)`              | Delete cookie                                           |
| `withAttributes()`          | Create instance with default attributes                 |
| `withConverter()`           | Custom encode/decode functions                          |

---

**2. Stack Trace Parser (Module 6216)**

**Export:** `parse`

Parses error stack traces across browsers (Chrome, Firefox, Safari, Opera, IE). Returns array of `{ function, file, line, col, raw, args }`. Used for error reporting and determining execution context (client vs server layer).

---

**3. Next.js i18n Utilities (Modules 489417–74757)**

| Module | Export                   | Purpose                                      |
| ------ | ------------------------ | -------------------------------------------- |
| 489417 | `detectDomainLocale`     | Match domain to locale config                |
| 876728 | `normalizeLocalePath`    | Extract locale from pathname                 |
| 816199 | `removePathPrefix`       | Strip prefix from path                       |
| 74757  | `getNextPathnameInfo`    | Parse pathname for basePath, locale, buildId |
| 260348 | `formatNextPathnameInfo` | Reconstruct pathname with locale/basePath    |
| 242066 | `addLocale`              | Add locale prefix to path                    |

---

**4. NextURL Class (Module 667789)**

**Export:** `NextURL`

Extended URL class for Next.js:

- **`locale`** / **`defaultLocale`** — i18n support
- **`basePath`** — Application base path
- **`buildId`** — `_next/data` build ID extraction
- **`domainLocale`** — Domain-based locale detection
- Automatic localhost/127.0.0.1 normalization

---

**5. Next.js Constants (Module 766052)**

All Next.js framework constants:

| Constant                 | Value                                      |
| ------------------------ | ------------------------------------------ |
| `RSC_SUFFIX`             | `.rsc`                                     |
| `RSC_PREFETCH_SUFFIX`    | `.prefetch.rsc`                            |
| `ACTION_SUFFIX`          | `.action`                                  |
| `NEXT_DATA_SUFFIX`       | `.json`                                    |
| `MIDDLEWARE_FILENAME`    | `middleware`                               |
| `CACHE_ONE_YEAR`         | `31536000`                                 |
| `NEXT_CACHE_TAGS_HEADER` | `x-next-cache-tags`                        |
| `SERVER_RUNTIME`         | `{ edge, nodejs, experimentalEdge }`       |
| `WEBPACK_LAYERS`         | `{ shared, rsc, ssr, actionBrowser, ... }` |

Plus all error messages for SSG/SSR conflicts (`SSG_GET_INITIAL_PROPS_CONFLICT`, `SERVER_PROPS_SSG_CONFLICT`, etc.).

---

**6. Middleware Utilities (Module 334127)**

| Export                        | Purpose                             |
| ----------------------------- | ----------------------------------- |
| `fromNodeOutgoingHttpHeaders` | Convert Node headers → Headers      |
| `toNodeOutgoingHttpHeaders`   | Convert Headers → Node headers      |
| `splitCookiesString`          | Parse `Set-Cookie` header           |
| `validateURL`                 | Validate URL, throw with error code |
| `normalizeNextQueryParam`     | Strip `nxtP`/`nxtI` prefixes        |

---

**7. @edge-runtime/cookies (Module 432631)**

| Export            | Purpose                             |
| ----------------- | ----------------------------------- |
| `RequestCookies`  | Cookie access for incoming requests |
| `ResponseCookies` | Cookie management for responses     |
| `parseCookie`     | Parse cookie string → Map           |
| `parseSetCookie`  | Parse Set-Cookie → cookie object    |
| `stringifyCookie` | Serialize cookie to string          |

---

**8. NextRequest / NextResponse (Modules 696809, 680404)**

**`NextRequest`** extends `Request`:

- **`cookies`** — `RequestCookies` instance
- **`nextUrl`** — `NextURL` instance with locale/basePath

**`NextResponse`** extends `Response`:

- **`cookies`** — `ResponseCookies` instance
- **`NextResponse.json()`** — JSON response helper
- **`NextResponse.redirect(url, status)`** — Redirect with middleware headers
- **`NextResponse.rewrite(url)`** — URL rewrite with `x-middleware-rewrite`
- **`NextResponse.next()`** — Continue with `x-middleware-next`

---

**9. UA Parser (Module 522823)**

**ua-parser-js v1.0.35** — Full user agent parser:

| Method         | Returns                                                            |
| -------------- | ------------------------------------------------------------------ |
| `getBrowser()` | `{ name, version, major }`                                         |
| `getDevice()`  | `{ vendor, model, type }` — mobile/tablet/smarttv/wearable/console |
| `getEngine()`  | `{ name, version }` — WebKit, Blink, Gecko                         |
| `getOS()`      | `{ name, version }` — Windows, macOS, iOS, Android                 |
| `getCPU()`     | `{ architecture }` — amd64, arm64, ia32                            |

Plus `isBot(ua)` detection for crawlers (Googlebot, Bingbot, Twitterbot, etc.).

---

**10. v0 Error Page (Module 334405)**

**Export:** `ErrorPage`

Styled error component handling:

- Import errors (`Failed to fetch dynamically imported module`)
- Module resolution errors (`Failed to resolve module specifier`)
- Missing exports (`does not provide an export named`)
- HTTP errors (404, 403, 401, 500)
- Redirect handling

---

**11. v0 File Browser (Module 769284)**

| Export                               | Purpose                               |
| ------------------------------------ | ------------------------------------- |
| `SimpleV0FileBrowser`                | Route picker when no page matches URL |
| `SimpleV0FileBrowserSingleComponent` | Single component mode picker          |

Shows tree view of `app/`, `pages/`, `api/` routes with click-to-navigate.

---

**12. v0 Lite Runtime Router (Module 342947) ⭐**

**The core of v0's preview system:**

| Export                       | Purpose                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `Router`                     | React router component with suspense/error boundaries             |
| `useRouter`                  | `{ pathname, push, replace, refresh, back, forward }`             |
| `NextRequest`                | Extended NextRequest with v0 cookie fixes                         |
| `ROUTER_ERRORS`              | Error types: `NOT_FOUND`, `FORBIDDEN`, `UNAUTHORIZED`, `REDIRECT` |
| `executeInServerContext`     | Run code in simulated server context                              |
| `executeRSC`                 | Execute React Server Component                                    |
| `patchFetch`                 | Intercept fetch for route handlers                                |
| `internals.createServerRef`  | Create server action wrapper                                      |
| `internals.createClientRef`  | Mark client component                                             |
| `getCurrentExecutionContext` | Returns `"server"` or `"client"` based on stack                   |

**Next.js API Shims (`default` export object):**

| Import Path        | Implementation                                                                     |
| ------------------ | ---------------------------------------------------------------------------------- |
| `next/link`        | Client-side navigation with `useOptimistic` for pending state                      |
| `next/font/google` | Google Fonts loader via CSS injection                                              |
| `next/font/local`  | Local font loader with blob URL generation                                         |
| `next/cache`       | `revalidatePath`, `revalidateTag`, `expirePath`, `expireTag`, `unstable_cache`     |
| `next/navigation`  | `notFound`, `redirect`, `useRouter`, `useParams`, `useSearchParams`, `usePathname` |
| `next/headers`     | `cookies()`, `headers()`, `draftMode()`                                            |
| `next/server`      | `NextRequest`, `NextResponse`, `after`, `connection`, `userAgent`                  |
| `next/image`       | Passthrough with `unoptimized: true`                                               |
| `next/script`      | Script loader component                                                            |
| `next/form`        | Form component                                                                     |
| `next/dynamic`     | Dynamic import wrapper                                                             |
| `next/og`          | Lazy-loaded OG image generation                                                    |
| `server-only`      | Throws error in client layer                                                       |
| `client-only`      | Throws error in server layer                                                       |

**Fetch Interception (`patchFetch`):**

- Routes same-origin requests to route handlers via `resolveRouteHandler`
- Uses LRU cache (100 entries) for duplicate requests during SSR simulation
- Proxies external requests through CORS proxy (`corsProxyFetch`)
- Patches `XMLHttpRequest.prototype.open` for CORS compatibility

**Cookie Handling:**

- `RequestCookie` class wrapping js-cookie
- Automatically adds `SameSite=None; Secure` for iframe compatibility
- `draftMode()` implementation with `__prerender_bypass` cookie
- Cookie mutations trigger `revalidateCookies` flag for router refresh

**Server Context Simulation:**

- `serverContext.enabled` tracks if running in "server" mode
- `serverContext.stackDepth` for nested server calls
- `serverContext.headers` provides request headers
- `serverContext.middlewareHeaders` for middleware response headers

---

**13. v0 Utilities (Module 608367)**

| Export                          | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `ErrorBoundary`                 | React error boundary with fallback rendering        |
| `NotFoundBoundary`              | Catches `notFound()` throws specifically            |
| `RenderThenable`                | Renders async components with React `use()`         |
| `sendToParent`                  | PostMessage to parent frame (`__v0_remote__`)       |
| `resolveUrl`                    | URL resolution helper                               |
| `shouldIgnoreCorsProxy`         | Skip CORS proxy for allowed domains                 |
| `getModuleNameFromBlob`         | Resolve blob URL to module name via importShim      |
| `findOriginalModuleNameFromURL` | Map CDN URLs to package names                       |
| `staticAssetUrlToResourceUri`   | Resolve static assets from virtual file system      |
| `startHMR` / `stopHMR`          | Hot module replacement control                      |
| `createAsyncComponentWithCache` | Cache async component results                       |
| `useSendBrowserEvent`           | Report user interactions to parent frame            |
| `blobToModuleName`              | Blob URL → module name mapping                      |
| `importEntry`                   | Import module with `?server_layer` suffix           |
| `isFromCDN`                     | Check if URL is from `esm.v0.app`                   |
| `getIsNavigationBlocked`        | Check if navigation is blocked                      |
| `relocationWhileBlocking`       | Navigate while preserving headers in sessionStorage |

**CORS Bypass Allowlist:**

- `.amazonaws.com`, `esm.sh`, `.v0.dev`, `.localhost`
- `fal.run`, `.fal.run`, `bsky.social`, `.bsky.social`, `bsky.network`, `.bsky.network`

---

**Role in v0:** This chunk is the **heart of v0's lite runtime**:

1. **Router** — Full client-side router with React 18 transitions, suspense boundaries, and error handling
2. **Next.js Compatibility** — Complete shims for `next/navigation`, `next/headers`, `next/cache`, `next/server`
3. **Server Components** — `executeInServerContext` enables RSC-like patterns in browser
4. **Server Actions** — `createServerRef` wraps async functions as callable server actions
5. **Route Handlers** — `patchFetch` intercepts API route requests and executes them client-side
6. **Cookie/Header APIs** — Full `cookies()` and `headers()` implementation for server context
7. **Error Handling** — Catches `notFound()`, `redirect()`, `forbidden()`, `unauthorized()` throws
8. **CORS Proxy** — Transparent proxying for external API calls with allowlist bypass
9. **HMR Infrastructure** — `startHMR`/`stopHMR` for hot module replacement
10. **Static Assets** — `staticAssetUrlToResourceUri` resolves assets from virtual file system
11. **User Agent Parsing** — Full device/browser/OS detection for `userAgent()` API

This is loaded immediately after the service worker initializes and is required for any v0 preview to function.

#### 3a384aa7a60f1de8.js

**v0 DevTools Provider & Visual Editing System** (~1.6k lines) — The complete visual inspection and inline editing system that powers v0's "click to select" element highlighting, code navigation, and real-time content editing.

**Chunk ID:** `566420`

---

**1. Slottable Wrapper (Module 566420)**

Custom wrapper around Radix's `Slottable` component that filters v0-internal props:

```js
function Slottable({ children, ...props }) {
  // Only pass through props that don't start with "__v0"
  return Object.keys(props).some((key) => !key.startsWith("__v0")) ? (
    <RadixSlottable {...props}>
      {React.cloneElement(children, props)}
    </RadixSlottable>
  ) : (
    <RadixSlottable {...props}>{children}</RadixSlottable>
  );
}
```

Marks components with `__v0_slottable = true` for identification.

---

**2. Geist Font Modules (Modules 72508, 827620, 912085, 609750)**

Pre-configured Geist font definitions:

| Export      | Font Family                                      | CSS Variable                                  |
| ----------- | ------------------------------------------------ | --------------------------------------------- |
| `GeistSans` | `'GeistSans', 'GeistSans Fallback'`              | `geistsans_d5a4f12f-module__NFD_JW__variable` |
| `GeistMono` | `'GeistMono', ui-monospace, SFMono-Regular, ...` | `geistmono_157ca88a-module__mYul6G__variable` |

---

**3. Context Menu Components (Module 871209)**

shadcn/ui-style Context Menu built on `@radix-ui/react-context-menu`:

| Export               | Purpose                          |
| -------------------- | -------------------------------- |
| `ContextMenu`        | Root wrapper                     |
| `ContextMenuTrigger` | Right-click trigger area         |
| `ContextMenuContent` | Dropdown content with animations |
| `ContextMenuItem`    | Individual menu items            |

Styled with Tailwind animations (`animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`).

---

**4. useLatest Hook (Module 295224)**

```js
function useLatest(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
```

Returns a ref that always contains the latest value — essential for callbacks that need current state without re-renders.

---

**5. Tailwind Token Detection (Module 13072)**

**`getExtraElementInfo(element, skipTokens)`** — Extracts computed styles and Tailwind configuration:

| Property           | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `color`            | Computed text color                                              |
| `backgroundColor`  | Computed background color                                        |
| `borderColor`      | Computed border color                                            |
| `fontWeight`       | Computed font weight                                             |
| `activeBreakpoint` | Current Tailwind breakpoint (`sm`, `md`, `lg`, `xl`, `2xl`)      |
| `twTokens.colors`  | Resolved Tailwind color palette (with CSS variable resolution)   |
| `dsTokens`         | Design system tokens from `window.__v0_dst` (default/dark/theme) |
| `twVersion`        | Tailwind CSS version                                             |
| `currentTheme`     | `"dark"` or `"light"` based on `<html class="dark">`             |

**Breakpoint Detection:**
Uses hidden probe elements (`#__v0_tw_sm`, `#__v0_tw_md`, etc.) with conditional `size-0` classes to detect active breakpoint via `getComputedStyle`.

**Color Resolution:**
Iterates Tailwind config colors, sets them as CSS variables on probe element, reads computed values to resolve HSL/RGB.

**`TailwindVarDetector` Component:**
Renders hidden probe elements and observes breakpoint changes via `ResizeObserver`.

---

**6. Optimistic Visual Changes (Module 13072)**

| Export                                 | Purpose                                               |
| -------------------------------------- | ----------------------------------------------------- |
| `setGlobalLockedElement(el)`           | Set currently selected element                        |
| `optimisticApplyVisualChanges(change)` | Apply class/content/css-var/image changes immediately |
| `revertOptimisticVisualChanges()`      | Undo all pending changes                              |
| `visualEditingStyles`                  | CSS to fix SVG pointer events + dropdown z-index      |
| `visualEditingCursorStyles`            | CSS for crosshair cursor during selection             |

**Change Types:**

- `class` — Add/remove Tailwind classes on element
- `content` — Update `textContent`
- `css-var` — Set CSS custom property on `:root`
- `image` — Update `<img>.src`

Changes are tracked in a stack for rollback.

---

**7. Element Overlay Component (`T` / Internal)**

Renders the blue selection overlay with:

- **Border** — 2px solid `#60a5fa` (blue-400)
- **Padding indicator** — Dotted inner border showing padding
- **Component label** — Shows component name with dropdown menu
- **Related elements** — Dotted overlay on sibling instances

**Dropdown Menu Actions:**

- "Go to code" → `devtools_goto` message
- "Edit content" → Enter inline edit mode
- "Copy component code" → `devtools_copy` message
- "Delete element" → `devtools_delete` message

---

**8. DevToolsProvider Component (Module 807442) ⭐**

**The core visual editing orchestrator.**

**Props:**
| Prop | Type | Description |
| ---- | ---- | ----------- |
| `enabled` | boolean | DevTools active state |
| `fileMapping` | object | Map of source file names to IDs |
| `sourceVersion` | number | Version counter for change tracking |
| `children` | ReactNode | App content |
| `isV3` | boolean | v3 refinement mode flag |

**State:**

- `hovered` — Currently hovered element info
- `locked` — Currently selected (locked) element info
- `editing` — Inline content editing active
- `stale` — Version mismatch (code changed, waiting for re-render)

**Key Behaviors:**

1. **Element Selection:**

   - `pointermove` → Update hover overlay
   - `click` → Lock selection to element
   - `Escape` → Deselect or exit edit mode
   - `Backspace` → Delete selected element
   - `Enter` → Enter inline edit mode
   - `Arrow keys` → Navigate to adjacent elements

2. **Inline Editing:**

   - Sets `contentEditable="plaintext-only"` on element
   - Tracks original content for diffing
   - Sends `inline_edit` message on blur with new content
   - Handles JSX text, string literals, and template literals differently

3. **Parent Communication:**

   - `devtools_goto` — Navigate to source line/column
   - `devtools_copy` — Copy component JSX
   - `devtools_delete` — Remove element from source
   - `devtools_selected_state` — Report selection info + computed styles
   - `add-refinement-element` — v3 refinement mode selection
   - `inline_edit` — Send content changes

4. **Incoming Messages:**

   - `devtools_deselect` — Clear selection
   - `devtools_apply_theme` — Toggle dark/light mode
   - `devtools_cleanup_theme` — Restore original theme

5. **Keyboard Shortcuts:**
   - `Alt+D` / `Cmd+D` → Toggle DevTools enabled state

---

**9. React Fiber Traversal Utilities**

| Function             | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `V(element)`         | Find React Fiber from DOM element via `__reactFiber*` or DevTools hook |
| `G(fiber, callback)` | Traverse fiber tree (depth-first)                                      |
| `B(fiber)`           | Find root fiber (walk up `.return` chain)                              |
| `A(fiber)`           | Get DOM node (`stateNode`) from fiber                                  |
| `F(element)`         | Extract full element info (source, className, inlineEdit)              |
| `$(fiber)`           | Extract `__v0_s` (source) and `__v0_e` (extra) props                   |
| `H(fiber)`           | Get most recent fiber (current vs alternate)                           |

**v0 Source Props:**

- `__v0_s` — Source location `{ fileName, lineNumber, columnNumber, start, end, name, lib }`
- `__v0_e` — Extra info `{ jsxRoot }`
- `__v0_c` — Class name parts `[[line, column, value], ...]`
- `__v0_i` — Inline editable content format string
- `__v0_m` — Merged className flag

---

**10. Element Reconnection Logic**

When source code changes and elements re-render:

1. Check if selected element is still connected
2. If not, search fiber tree for element with same source location
3. Match by `textContent`, `className`, `tagName`, `id` similarity
4. Preserve selection ID (`M` WeakMap) across re-renders

---

**11. Console Message Formatter (Module 717035)**

**`formatConsoleMessage(format, ...args)`**

Printf-style formatter for console output:

- `%s` — String
- `%d` / `%i` — Integer
- `%f` — Float
- `%o` / `%O` — JSON object
- `%c` — (ignored, CSS styling)

Handles Error objects (extracts stack), functions (`.toString()`), and circular objects gracefully.

---

**Role in v0:** This chunk is the **visual editing brain** of v0:

1. **Element Inspection** — Click any element to see its React source location
2. **Inline Content Editing** — Double-click text to edit directly, synced back to source
3. **Code Navigation** — "Go to code" jumps to exact line/column in editor
4. **Delete/Copy Operations** — Right-click menu for component manipulation
5. **Tailwind Token Extraction** — Reports active breakpoints, colors, design tokens
6. **Theme Switching** — Toggle dark/light mode in preview
7. **Fiber Tree Analysis** — Deep React integration for accurate source mapping
8. **Optimistic Updates** — Apply visual changes instantly before source update
9. **Cross-Frame Communication** — All actions sent via `postMessage` to parent

This is what makes v0's "click to edit" experience possible — it bridges the rendered preview with the source code editor.

#### b114f950a0cd6ced.js

**The complete v0 preview sandbox runtime** (~16.7 MB, 29 modules) — This is the most critical bundle in v0's architecture, containing the entire execution environment for user-generated code. At its core is module 448763 (1 MB, 44,067 lines), which includes 50+ shadcn/ui components, a custom JSX runtime that intercepts every element for visual tracking, TypeScript 5.7.3 compiler (12.3 MB running entirely in-browser), React 19+ with experimental features, time-gated feature flags, sandboxed storage APIs, Next.js middleware support, and a complete fake Node.js environment. The module system uses blob URLs for dynamic imports, with React Fast Refresh enabling hot module replacement that preserves component state.

The architecture is a masterpiece of browser-based development: user code is compiled by the in-browser TypeScript compiler, transformed with React Refresh hooks for HMR, wrapped with v0's custom JSX runtime for element tracking, converted to blob URLs with source maps, stored in the Service Worker's virtual filesystem, and executed in a sandboxed iframe with isolated localStorage, cookies, and environment variables. Every JSX element receives special props (`__v0_i`, `__v0_c`, `__v0_m`, `__v0_e`, `__v0_r`, `__v0_s`) that enable v0's visual editor to map rendered elements back to source code, powering the click-to-edit functionality. For a comprehensive breakdown of all 29 modules, dependency chains, message protocols, security layers, and implementation details, see **[docs/b114f950a0cd6ced_ANALYSIS.md](docs/b114f950a0cd6ced_ANALYSIS.md)**.
