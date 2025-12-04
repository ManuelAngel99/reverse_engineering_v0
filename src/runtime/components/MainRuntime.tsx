/**
 * Main Runtime Component (ClientEntry)
 * Source: module_448763 (Lines 8014-8470)
 *
 * The main orchestrator component for the v0 preview runtime.
 * Handles file compilation, HMR updates, navigation, DevTools integration,
 * font preloading, environment variables, and generation switching.
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  Fragment,
  type ReactNode,
} from "react";

import { PreloadSystem } from "./PreloadSystem";
import {
  sendToParent,
  useSendBrowserEvent,
} from "../communication/iframe-comm";
import { startHMR, stopHMR } from "../hmr/utilities";
import {
  extractStaticFilesForSW,
  buildFilePathMapping,
  buildCache,
  getOrCreatePendingPromise,
  type CachedBuild,
} from "../../compiler/pipeline/build-helpers";
import type { SealedBuild } from "../../compiler/pipeline/build-seal";
import { sealBuild } from "../../compiler/pipeline/build-seal";
import type { CompilationContext } from "../../compiler/pipeline/compilation-pipeline";
import { DevToolsProvider } from "../../devtools/provider/DevToolsProvider";
import { getExtraElementInfo } from "../../devtools/tailwind/token-detection";
import {
  optimisticApplyVisualChanges,
  revertOptimisticVisualChanges,
} from "../../devtools/editing/visual-changes";
import { compileFiles } from "../../compiler/pipeline/compilation-pipeline";
import { processModules } from "../../compiler/pipeline/module-processor";
import { waitForSWReady } from "../service-worker/registration";
import { getGlobals, setGlobals } from "../assets/utilities";
import { createErrorPage } from "../error-boundaries/error-page";

// ============================================================================
// Types
// ============================================================================

export interface MainRuntimeProps {
  /** Generation ID */
  id: string;
  /** Source files */
  files: Array<[string, { type: string; data: string }]>;
  /** Function to load client files for a generation */
  loadClientFiles?: (
    id: string
  ) => Promise<Array<[string, { type: string; data: string }]>>;
  /** Creation timestamp */
  createdAt: number;
  /** Promise resolving to environment variables */
  envPromise: Promise<Array<{ key: string; value: string }>>;
  /** Default path for routing */
  defaultPath?: string;
  /** Whether using v3 mode */
  isV3?: boolean;
  /** Chat metadata */
  chatMetadata?: Record<string, unknown>;
}

export interface FileMapping {
  [compiledPath: string]: string;
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to get the latest value without causing re-renders
 */
function useLatest<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

// ============================================================================
// Helper Functions
// ============================================================================

// Helper to seal build and return tuple
async function sealBuildTuple(
  context: CompilationContext,
  envPromise: Promise<Array<{ key: string; value: string }>>,
  chatMetadata?: Record<string, unknown>
): Promise<[SealedBuild, CompilationContext]> {
  const envs = await envPromise;
  const sealed = await sealBuild(
    context.project,
    context.modules,
    {}, // staticFiles - would be extracted from context
    envs.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}),
    [],
    { skipEmit: false }
  );
  return [sealed, context];
}

// ============================================================================
// Main Runtime Component
// ============================================================================

/**
 * Main Runtime Component
 *
 * This is the heart of the v0 preview system. It:
 * 1. Compiles source files on mount
 * 2. Sends compiled code to the service worker
 * 3. Renders the compiled application
 * 4. Handles HMR updates from the parent
 * 5. Manages generation preloading and switching
 * 6. Integrates with DevTools
 * 7. Reports status to the parent frame
 */
export function MainRuntime({
  id: initialId,
  files: initialFiles,
  loadClientFiles,
  createdAt,
  envPromise,
  defaultPath,
  isV3,
  chatMetadata,
}: MainRuntimeProps): ReactNode {
  // ============================================================================
  // State
  // ============================================================================

  // Current generation ID
  const [currentId, setCurrentId] = useState(initialId);

  // Current rendered content
  const [currentRuntime, setCurrentRuntime] = useState<ReactNode>(null);

  // Preloaded generation ID
  const [preloadedId, setPreloadedId] = useState("");

  // Preloaded content
  const [preloadedRuntime, setPreloadedRuntime] = useState<ReactNode>(null);

  // DevTools enabled state
  const [devToolsEnabled, setDevToolsEnabled] = useState(false);

  // File path mapping for source maps
  const [fileMapping, setFileMapping] = useState<FileMapping>({});

  // Source version for DevTools
  const [sourceVersion, setSourceVersion] = useState(0);

  // Refs for latest values
  const filesRef = useLatest(initialFiles);
  const compilerRef = useLatest<unknown>(null);
  const currentIdRef = useLatest(currentId);
  const preloadedIdRef = useLatest(preloadedId);
  const preloadedRuntimeRef = useLatest(preloadedRuntime);

  // ============================================================================
  // Compilation Handler
  // ============================================================================

  /**
   * Process compiled result and render
   */
  const processCompilation = useCallback(
    async (
      result: SealedBuild,
      rawFiles: Array<[string, { type: string; data: string }]>,
      isHMR: boolean
    ): Promise<ReactNode> => {
      // Send static files to service worker
      if (
        typeof navigator !== "undefined" &&
        navigator.serviceWorker?.controller
      ) {
        navigator.serviceWorker.controller.postMessage({
          type: "v0_init",
          compiled: extractStaticFilesForSW(result),
        });
      }

      // Update global static files registry
      const staticFiles = extractStaticFilesForSW(result).staticFiles;
      const staticRegistry: Record<string, [string, string]> = {};

      for (const [path, entry] of Object.entries(staticFiles)) {
        staticRegistry[path] = [entry.type, entry.content];
      }

      setGlobals({ internal_static: staticRegistry as any });

      // Process modules and render
      try {
        const rendered = await processModules({
          result,
          rawFiles,
          envPromise,
          defaultPath,
          hmr: isHMR,
          createdAt: (result.createdAt as number) || Date.now(),
          chatMetadata,
        });
        return rendered;
      } catch (error) {
        return createErrorPage(error as Error);
      }
    },
    [envPromise, defaultPath, chatMetadata]
  );

  // ============================================================================
  // Initial Compilation
  // ============================================================================

  // Get or create compiled result
  let compiledPromise: Promise<[SealedBuild, unknown]>;

  if (buildCache.has(currentId)) {
    const cached = buildCache.get(currentId)!;
    compiledPromise = cached.compiled;
    filesRef.current = cached.files;
  } else {
    const contextPromise = compileFiles(
      filesRef.current,
      { timestamp: createdAt },
      createdAt
    );
    compiledPromise = contextPromise.then((ctx) =>
      sealBuildTuple(ctx, envPromise, chatMetadata)
    );
    buildCache.set(currentId, {
      files: filesRef.current,
      compiled: compiledPromise,
    });
  }

  // ============================================================================
  // Mount Effect - Initial Render
  // ============================================================================

  useLayoutEffect(() => {
    // Notify parent that frame is loading
    sendToParent({ type: "frame_onload" });

    let cancelled = false;

    // Wait for service worker and compilation
    Promise.resolve(waitForSWReady())
      .then(() => compiledPromise)
      .then(async ([result, compiler]) => {
        if (cancelled) return;

        // Store compiler reference
        compilerRef.current = compiler;

        // Update file mapping
        setFileMapping(buildFilePathMapping(result.modules));

        // Check if we should use preloaded content
        if (currentIdRef.current === preloadedIdRef.current) {
          setCurrentRuntime(preloadedRuntimeRef.current);
          return;
        }

        // Process and render
        const rendered = await processCompilation(
          result,
          filesRef.current,
          false
        );
        if (!cancelled) {
          setCurrentRuntime(<Fragment key={Date.now()}>{rendered}</Fragment>);
        }
      })
      .then(() => {
        if (!cancelled) {
          // Remove loading class
          document.body.classList.remove("v0-loading");
          // Notify parent that frame is ready
          sendToParent({ type: "frame_ready" });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setCurrentRuntime(createErrorPage(error));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [compiledPromise]);

  // ============================================================================
  // Message Handler Effect
  // ============================================================================

  useLayoutEffect(() => {
    // Clean up URL parameters
    const url = new URL(window.location.href);
    const originalSearch = url.searchParams.toString();

    // Remove v0 internal parameters
    ["__v0_token", "__v0", "__v0_vercel_project_id", "mql", "isV3"].forEach(
      (param) => url.searchParams.delete(param)
    );

    if (originalSearch !== url.searchParams.toString()) {
      window.history.replaceState({}, "", url.toString());
      (window as any).can_redirect = true;
    }

    // Message handler
    const handleMessage = async (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      // Handle code updates
      if (data.type === "preview_code" || data.type === "preview_code_delta") {
        const isDelta = data.type === "preview_code_delta";
        let updatedFiles: Array<[string, { type: string; data: string }]> = [];

        if (data.type === "preview_code") {
          // Full code update
          const codeMapping =
            data.code && typeof data.code.mapping === "object"
              ? data.code.mapping
              : data.code;
          filesRef.current = Object.entries(codeMapping).map(
            ([path, content]) => [
              path,
              content as { type: string; data: string },
            ]
          );
          updatedFiles = filesRef.current;
        } else {
          // Delta update
          let found = false;
          filesRef.current = filesRef.current.map((entry) => {
            if (entry[0] === data.file) {
              found = true;
              const updated: [string, { type: string; data: string }] = [
                entry[0],
                { ...entry[1], data: data.source },
              ];
              updatedFiles = [updated];
              return updated;
            }
            return entry;
          });

          if (!found) {
            const newFile: [string, { type: string; data: string }] = [
              data.file,
              { type: "file", data: data.source },
            ];
            updatedFiles = [newFile];
            filesRef.current.push(newFile);
          }
        }

        if (updatedFiles.length) {
          try {
            // Compile updated files
            const context = await compileFiles(
              updatedFiles,
              { timestamp: createdAt },
              isDelta ? compilerRef.current : undefined
            );
            const [result, compiler] = await sealBuildTuple(
              context,
              envPromise,
              chatMetadata
            );
            compilerRef.current = compiler;

            // Start HMR
            startHMR();

            // Process and render
            await processCompilation(result, filesRef.current, true);

            // Perform React Refresh
            (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
            const { act } = await import("react");
            act(() => {
              (window as any).__v0_refreshRuntime?.performReactRefresh();
            });
            (globalThis as any).IS_REACT_ACT_ENVIRONMENT = false;

            // Stop HMR
            await stopHMR();

            // Update state
            setFileMapping(buildFilePathMapping(result.modules));
            setSourceVersion(data.version || ((v: number) => v + 1));
          } catch (error) {
            setCurrentRuntime(createErrorPage(error as Error));
          }
        }
        return;
      }

      // Handle v0 remote messages
      if (!data.__v0_remote__) return;

      switch (data.type) {
        case "navigate_back":
          window.history.back();
          break;

        case "navigate_forward":
          window.history.forward();
          break;

        case "navigate_to":
          window.location.href = data.href;
          break;

        case "devtools_enable":
          setDevToolsEnabled(data.enabled);
          if (data.enabled) {
            sendToParent({
              type: "devtools_selected_state",
              parts: null,
              selected: false,
              info: getExtraElementInfo(document.documentElement, true),
              version: sourceVersion,
            });
          }
          break;

        case "devtools_query_root":
          sendToParent({
            type: "devtools_selected_state",
            parts: null,
            selected: false,
            info: getExtraElementInfo(document.documentElement, true),
            version: sourceVersion,
          });
          break;

        case "devtools_sync_design":
          optimisticApplyVisualChanges(data.payload);
          break;

        case "devtools_revert_design":
          revertOptimisticVisualChanges();
          break;

        case "preload_client":
          if (!buildCache.has(data.id)) {
            if (!loadClientFiles) {
              throw new Error(
                "loadClientFiles function is required to preload clients."
              );
            }

            getOrCreatePendingPromise(data.id, loadClientFiles)
              .then(async (files) => {
                const contextPromise = compileFiles(
                  files,
                  { timestamp: createdAt },
                  createdAt
                );
                const compiled = contextPromise.then((ctx) =>
                  sealBuildTuple(ctx, envPromise, chatMetadata)
                );
                buildCache.set(data.id, { files, compiled });

                try {
                  const [result] = await compiled;
                  const rendered = await processCompilation(
                    result,
                    files,
                    false
                  );
                  if (!rendered) return;

                  setPreloadedId(data.id);
                  setPreloadedRuntime(
                    <Fragment key={Date.now()}>{rendered}</Fragment>
                  );

                  // Wait a bit for rendering
                  await new Promise((r) => setTimeout(r, 500));
                } catch (error) {
                  console.error(error);
                }
              })
              .catch(() => {});
          }
          break;

        case "switch_client":
          if (data.id !== currentIdRef.current) {
            currentIdRef.current = data.id;

            if (buildCache.has(data.id)) {
              setCurrentId(data.id);
            } else {
              if (!loadClientFiles) {
                throw new Error(
                  "loadClientFiles function is required to switch clients."
                );
              }

              getOrCreatePendingPromise(data.id, loadClientFiles)
                .then((files) => {
                  buildCache.set(data.id, {
                    files,
                    compiled: compileFiles(
                      files,
                      { timestamp: createdAt },
                      createdAt
                    ).then((ctx) =>
                      sealBuildTuple(ctx, envPromise, chatMetadata)
                    ),
                  });
                  setCurrentId(data.id);
                })
                .catch(() => {
                  window.location.href = data.fallbackUrl;
                });
            }
          }
          break;

        case "env_vars":
          if (Array.isArray(data.envVars)) {
            (window as any).__v0_updateProcessEnv?.(data.envVars);
          }
          break;

        case "preload_google_font":
          // Font preloading would be handled here
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    // Location change tracking
    let lastHref = "";
    let lastHash = document.location.hash;
    const isInIframe = window.self !== window.top;

    function trackLocationChange() {
      if (lastHref !== document.location.href) {
        lastHref = document.location.href;
        sendToParent({
          type: "location_change",
          href: lastHref,
          canGoForward: (window as any).navigation?.canGoForward,
          canGoBack: (window as any).navigation?.canGoBack,
        });
      }

      // Handle hash changes in iframe
      if (isInIframe) {
        const hash = window.location.hash;
        if (hash !== lastHash && hash && hash !== "#") {
          lastHash = hash;
          const target = document.querySelector(hash);
          target?.scrollIntoView();
        }
      }
    }

    // Store for global access
    setGlobals({ internal_location_change: trackLocationChange });

    // Observe DOM changes
    const observer = new MutationObserver(trackLocationChange);
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    trackLocationChange();
    window.addEventListener("popstate", trackLocationChange);
    window.addEventListener("hashchange", trackLocationChange);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("popstate", trackLocationChange);
      window.removeEventListener("hashchange", trackLocationChange);
      observer.disconnect();
    };
  }, [
    processCompilation,
    loadClientFiles,
    defaultPath,
    createdAt,
    sourceVersion,
  ]);

  // ============================================================================
  // Ready State Effects
  // ============================================================================

  const isReady = !!currentRuntime;

  // Send navigation state when ready
  useEffect(() => {
    if (isReady) {
      sendToParent({ type: "app_navigation_state", loading: false });
    }
  }, [isReady]);

  // Use browser event hook
  useSendBrowserEvent();

  // Send app ready and generation logs
  useEffect(() => {
    if (!isReady) return;

    sendToParent({ type: "app_ready", id: currentId });

    const timeout = setTimeout(() => {
      sendToParent({
        type: "generation_logs",
        logs: [],
        id: currentId,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [isReady, currentId]);

  // Periodic navigation state updates
  useEffect(() => {
    if (currentRuntime) {
      sendToParent({ type: "app_navigation_state", loading: false });
    }

    const interval = setInterval(() => {
      sendToParent({ type: "app_navigation_state", loading: false });
    }, 1000);

    return () => {
      clearInterval(interval);
      sendToParent({ type: "app_navigation_state", loading: true });
    };
  }, [currentRuntime]);

  // Set loaded attribute
  useEffect(() => {
    if (isReady) {
      document.documentElement.setAttribute("data-loaded", "true");
    }
  }, [isReady]);

  // ============================================================================
  // Render
  // ============================================================================

  // Note: DevToolsProvider would be imported from devtools module
  // For now, we render without it if not available
  const content = (
    <PreloadSystem
      currentId={currentId}
      preloadedId={preloadedId}
      currentRuntime={currentRuntime}
      preloadedRuntime={preloadedRuntime}
    />
  );

  // Wrap with DevToolsProvider if available
  if (typeof DevToolsProvider !== "undefined") {
    return (
      <DevToolsProvider
        enabled={devToolsEnabled}
        isV3={isV3}
        fileMapping={fileMapping}
        sourceVersion={sourceVersion}
      >
        {content}
      </DevToolsProvider>
    );
  }

  return <>{content}</>;
}

// ============================================================================
// Export as ClientEntry
// ============================================================================

export { MainRuntime as ClientEntry };
export default MainRuntime;
