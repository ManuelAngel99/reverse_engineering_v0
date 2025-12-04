/**
 * App Router Renderer
 * Source: module_448763 (Lines 1121-1278)
 *
 * Main router component that builds directory tree from entry modules,
 * initializes resolver, and renders the appropriate route or fallback UI.
 * Handles single-component mode, file browser views, and error states.
 */

import React from "react";
import type { DirectoryNode } from "./route-resolution";
import { getSegmentPriority } from "./route-matching";

// ============================================================================
// Types
// ============================================================================

/**
 * App router renderer props
 */
export interface AppRouterRendererProps {
  /** Entry module paths */
  entryModules: string[];
  /** Default path to render */
  defaultPath: string;
  /** Error fallback component */
  ErrorFallback?: React.ComponentType<{ error: Error }>;
  /** Enable HMR mode */
  hmr?: boolean;
  /** Global styles element */
  globalStyles?: React.ReactNode;
}

/**
 * Module loader function
 */
type ModuleLoader = () => Promise<any>;

/**
 * Module loaders map
 */
type ModuleLoadersMap = Record<string, ModuleLoader>;

// ============================================================================
// Directory Tree Building
// ============================================================================

/**
 * Build directory tree from entry modules
 * Converts flat list of module paths into hierarchical directory structure
 *
 * @param entryModules - Array of module paths
 * @returns Directory tree root node
 */
function buildDirectoryTree(entryModules: string[]): DirectoryNode {
  // Create module loaders map
  const loaders: ModuleLoadersMap = entryModules.reduce((acc, modulePath) => {
    acc[modulePath] = () => {
      // Dynamic import would happen here
      // For now, use a placeholder
      if (typeof (globalThis as any).importEntry === "function") {
        return (globalThis as any).importEntry(modulePath);
      }
      return import(modulePath);
    };
    return acc;
  }, {} as ModuleLoadersMap);

  // Parse and sort module paths
  const parsedPaths = entryModules
    .map((modulePath) => {
      const segments = modulePath.split("/");
      // Remove file extension from last segment
      segments[segments.length - 1] = segments[segments.length - 1].replace(
        /\.[^/.]+$/,
        ""
      );
      return segments;
    })
    .sort((a, b) => {
      // Sort by depth first
      if (a.length < b.length) return -1;
      if (a.length > b.length) return 1;

      // Same depth - sort by segment priority
      const aLast = a[a.length - 1];
      const bLast = b[b.length - 1];

      if (aLast === bLast) return 0;

      return getSegmentPriority(aLast) - getSegmentPriority(bLast);
    });

  // Build directory tree
  const root: DirectoryNode = { files: {}, dirs: {} };

  for (const segments of parsedPaths) {
    const fullPath = segments.join("/");
    let currentNode = root;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      // Last segment - add as file
      if (i === segments.length - 1) {
        // Store the full path as the file value (module ID)
        currentNode.files[segment] = fullPath;
      }
      // Intermediate segment - add as directory
      else {
        if (!currentNode.dirs[segment]) {
          currentNode.dirs[segment] = { files: {}, dirs: {} };
        }
        currentNode = currentNode.dirs[segment];
      }
    }
  }

  return root;
}

// ============================================================================
// Route Detection
// ============================================================================

/**
 * Check if entry modules contain app router files
 *
 * @param entryModules - Array of module paths
 * @returns True if app router files are present
 */
function hasAppRouterFiles(entryModules: string[]): boolean {
  return entryModules.some((modulePath) => {
    const isAppDir =
      modulePath.startsWith("@v0/app/") ||
      modulePath.startsWith("@v0/src/app/");

    const isRouteFile =
      modulePath.endsWith("/page") ||
      modulePath.endsWith("/route") ||
      modulePath.endsWith("/not-found") ||
      modulePath.endsWith("/error") ||
      modulePath.endsWith("/global-error");

    return isAppDir && isRouteFile;
  });
}

/**
 * Get non-route entry modules for single component mode
 * Filters out routes, CSS, middleware, and proxy files
 *
 * @param entryModules - Array of module paths
 * @returns Filtered and sorted module paths
 */
function getNonRouteModules(entryModules: string[]): string[] {
  return entryModules
    .filter((modulePath) => {
      return (
        !modulePath.endsWith("/route") &&
        !modulePath.endsWith(".css") &&
        !modulePath.endsWith("/page") &&
        !modulePath.endsWith("/middleware") &&
        !modulePath.endsWith("/proxy")
      );
    })
    .map((modulePath, index) => [modulePath, index] as [string, number])
    .sort(([pathA, indexA], [pathB, indexB]) => {
      const depthA = pathA.split("/").length;
      const depthB = pathB.split("/").length;

      // Sort by depth (shallower first)
      if (depthA < depthB) return -1;
      if (depthA > depthB) return 1;

      // Same depth - preserve original order (reverse)
      return indexB - indexA;
    })
    .map(([modulePath]) => modulePath);
}

// ============================================================================
// Component Loading
// ============================================================================

/**
 * Load component from modules
 * Tries multiple export strategies
 *
 * @param modules - Array of [loader, exportNames] tuples
 * @returns Loaded component
 */
async function loadComponent(
  modules: Array<[ModuleLoader, any]>
): Promise<React.ComponentType<any>> {
  // This would normally call D0 function
  // For now, return a placeholder
  if (typeof (globalThis as any).D0 === "function") {
    return (globalThis as any).D0(modules);
  }

  // Fallback implementation
  for (const [loader, exportNames] of modules) {
    try {
      const module = await loader();

      // Handle array of export names
      if (Array.isArray(exportNames)) {
        for (const name of exportNames) {
          if (typeof name === "string" && module[name]) {
            return module[name];
          } else if (name instanceof RegExp) {
            for (const key of Object.keys(module)) {
              if (name.test(key) && module[key]) {
                return module[key];
              }
            }
          }
        }
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error("Failed to load component");
}

// ============================================================================
// Main Renderer
// ============================================================================

/**
 * App Router Renderer Component
 * Main entry point for rendering the app router
 *
 * @param props - Router renderer props
 * @returns Rendered router or fallback UI
 */
export async function AppRouterRenderer({
  entryModules,
  defaultPath,
  ErrorFallback,
  hmr,
  globalStyles,
}: AppRouterRendererProps): Promise<React.ReactElement | null> {
  // Build directory tree
  const directoryTree = buildDirectoryTree(entryModules);

  // Create resolver function
  const resolver = async (path: string, type?: string) => {
    // This would normally call DY (resolveRoute)
    if (typeof (globalThis as any).DY === "function") {
      return (globalThis as any).DY(
        entryModules,
        !!hmr,
        directoryTree,
        path,
        type
      );
    }
    return null;
  };

  // Update global resolver
  if (typeof (globalThis as any).updateGlobalResolver === "function") {
    (globalThis as any).updateGlobalResolver(resolver);
  }

  // Try to resolve the default path
  const resolvedRoute = await resolver(defaultPath, "all");

  // No route found - handle fallback cases
  if (!resolvedRoute) {
    const url = new URL(defaultPath, "http://n");
    const pathname = url.pathname;

    const hasAppFiles = hasAppRouterFiles(entryModules);

    let componentError: Error | null = null;

    // Try single component mode for root path
    if (!hasAppFiles && pathname === "/") {
      const nonRouteModules = getNonRouteModules(entryModules);

      if (nonRouteModules.length > 0) {
        try {
          const component = await loadComponent(
            nonRouteModules.map((modulePath) => [
              () => {
                if (typeof (globalThis as any).importEntry === "function") {
                  return (globalThis as any).importEntry(modulePath);
                }
                return import(modulePath);
              },
              ["default", "Component", /^[A-Z][A-Za-z0-9_.]+$/],
            ])
          );

          // In HMR mode, don't render
          if (hmr) {
            return null;
          }

          // Render with Router wrapper
          const Router = (globalThis as any).Router || React.Fragment;
          const D2 = (globalThis as any).D2 || React.Fragment;

          return (
            <D2>
              <Router
                defaultParams={{}}
                defaultRoute={defaultPath}
                fallback={ErrorFallback}
                potentialEntries={nonRouteModules}
                resolver={resolver}
                singleComponent
              >
                {globalStyles}
                {React.createElement(component)}
              </Router>
            </D2>
          );
        } catch (error) {
          componentError = error as Error;
        }
      }
    }

    // Show file browser if app files exist
    if (entryModules.length > 0 && hasAppFiles) {
      const SimpleV0FileBrowser = (globalThis as any).SimpleV0FileBrowser;
      if (SimpleV0FileBrowser) {
        return (
          <SimpleV0FileBrowser
            currentRoute={defaultPath}
            rawPaths={entryModules}
          />
        );
      }
    }

    // Show single component file browser
    if (entryModules.length === 1) {
      const SimpleV0FileBrowserSingleComponent = (globalThis as any)
        .SimpleV0FileBrowserSingleComponent;
      if (SimpleV0FileBrowserSingleComponent) {
        return (
          <SimpleV0FileBrowserSingleComponent
            currentRoute={defaultPath}
            rawPath={entryModules[0]}
          />
        );
      }
    }

    // Show error if component loading failed
    if (componentError) {
      const ErrorPage = (globalThis as any).ErrorPage;
      if (ErrorPage) {
        return <ErrorPage code="Error" message={String(componentError)} />;
      }
      throw componentError;
    }

    // Default 404
    const ErrorPage = (globalThis as any).ErrorPage;
    if (ErrorPage) {
      return <ErrorPage code={404} message="Page not found." />;
    }

    return null;
  }

  // Route found - render it
  const [pathname, params, routeHandler, renderer] = resolvedRoute;

  // Render the route
  const routeContent = hmr
    ? await renderer()
    : React.createElement(
        (globalThis as any).RenderThenable || React.Fragment,
        { render: renderer() }
      );

  // In HMR mode, return content directly
  if (hmr) {
    return routeContent as React.ReactElement;
  }

  // Wrap in Router
  const Router = (globalThis as any).Router || React.Fragment;

  return (
    <Router
      defaultParams={params}
      defaultRoute={pathname}
      fallback={ErrorFallback}
      potentialEntries={entryModules}
      resolver={resolver}
    >
      {globalStyles}
      {routeContent}
    </Router>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default AppRouterRenderer;

export {
  buildDirectoryTree,
  hasAppRouterFiles,
  getNonRouteModules,
  loadComponent,
};
