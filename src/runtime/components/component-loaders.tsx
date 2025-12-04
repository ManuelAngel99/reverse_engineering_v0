/**
 * Component Loaders
 * Source: module_448763 (Lines 1279-1356)
 *
 * Dynamic component loading and execution with multiple export strategies.
 * Handles async components, RSC execution, error boundaries, and HMR.
 */

import React, { useRef, Fragment } from "react";
import { executeInServerContext } from "../context/execution-context";

// ============================================================================
// Types
// ============================================================================

/**
 * Module loader function
 */
export type ModuleLoader = () => Promise<any>;

/**
 * Export name matcher
 * Can be a string, array of strings, or RegExp
 */
export type ExportMatcher = string | string[] | RegExp;

/**
 * Component entry
 * Tuple of [loader, exportMatcher, isServerAction]
 */
export type ComponentEntry = [
  loader: ModuleLoader,
  exportMatcher: ExportMatcher,
  isServerAction?: boolean
];

// ============================================================================
// Simple Component Loader
// ============================================================================

/**
 * Load a single component from a module
 * Validates that the component is not async
 *
 * @param loader - Module loader function
 * @param exportName - Name of the export to load
 * @returns Component or error fallback
 *
 * @example
 * ```typescript
 * const Component = await loadSingleComponent(
 *   () => import('./MyComponent'),
 *   'default'
 * );
 * ```
 */
export async function loadSingleComponent(
  loader: ModuleLoader,
  exportName: string
): Promise<React.ComponentType<any>> {
  try {
    const module = await loader();
    const component = module[exportName];

    // Validate component is not async
    if (component.constructor.name === "AsyncFunction") {
      throw new Error(`Component is not allowed to be async: ${component}`);
    }

    return component;
  } catch (error) {
    // Return error fallback component
    return () => {
      const RenderThenable = (globalThis as any).RenderThenable;
      if (RenderThenable) {
        return <RenderThenable render={error} />;
      }
      throw error;
    };
  }
}

// ============================================================================
// Multi-Strategy Component Loader
// ============================================================================

/**
 * Load component with multiple fallback strategies
 * Tries multiple loaders and export names until one succeeds
 *
 * Supports:
 * - String export names: "default", "Component"
 * - RegExp patterns: /^[A-Z][A-Za-z0-9_]+$/
 * - Server actions (RSC execution)
 * - Async components with caching
 *
 * @param entries - Array of component entries to try
 * @param props - Props to pass to the component
 * @returns Loaded component element
 *
 * @example
 * ```typescript
 * const element = await loadComponent([
 *   [() => import('./Page'), 'default'],
 *   [() => import('./Component'), ['Component', 'default']],
 *   [() => import('./ServerAction'), 'GET', true]
 * ], { params: { id: '123' } });
 * ```
 */
export async function loadComponent(
  entries: ComponentEntry[],
  ...props: any[]
): Promise<React.ReactElement> {
  for (let i = 0; i < entries.length; i++) {
    const [loader, exportMatcher, isServerAction] = entries[i];

    try {
      const module = await loader();
      let component: any = null;

      // Try to find matching export
      const matchers = Array.isArray(exportMatcher)
        ? exportMatcher
        : [exportMatcher];

      for (const matcher of matchers) {
        // String export name
        if (typeof matcher === "string") {
          if (module[matcher] && typeof module[matcher] === "function") {
            component = module[matcher];
            break;
          }
        }
        // RegExp pattern
        else if (matcher instanceof RegExp) {
          for (const key of Object.keys(module)) {
            const value = module[key];
            if (
              matcher.test(key) &&
              (typeof value === "function" ||
                (typeof value === "object" && value.$$typeof))
            ) {
              component = value;
              break;
            }
          }
          if (component) break;
        }
      }

      // No matching export found - try next entry
      if (!component) {
        continue;
      }

      // Handle server actions (RSC execution)
      if (isServerAction) {
        return await executeRSC(() =>
          executeInServerContext(() => component(...props))
        );
      }

      // Handle async components
      if (component.constructor.name === "AsyncFunction") {
        const AsyncComponent = createAsyncComponentWithCache(
          executeRSC(() => executeInServerContext(() => component(...props))),
          component
        );

        // Check for HMR replacement
        const replacedComponent = (
          globalThis as any
        ).__v0_replaceRscRefreshComponent?.(component, AsyncComponent);

        if (replacedComponent) {
          return React.createElement(replacedComponent);
        }

        return React.createElement(AsyncComponent);
      }

      // Regular component
      return React.createElement(component, props[0]);
    } catch (error) {
      // If this is the last entry, render error
      if (i === entries.length - 1) {
        const RenderThenable = (globalThis as any).RenderThenable;
        if (RenderThenable) {
          return <RenderThenable render={error} />;
        }
        throw error;
      }
      // Otherwise try next entry
    }
  }

  throw new Error(
    "Component cannot be found. Please make sure it is a default export."
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Execute React Server Component
 * Wraps execution in server context
 *
 * @param fn - Function to execute
 * @returns Promise resolving to result
 */
async function executeRSC<T>(fn: () => T | Promise<T>): Promise<T> {
  if (typeof (globalThis as any).executeRSC === "function") {
    return (globalThis as any).executeRSC(fn);
  }

  // Fallback implementation
  const result = fn();
  return result instanceof Promise ? result : Promise.resolve(result);
}

/**
 * Create async component with caching
 * Wraps async component to enable HMR and caching
 *
 * @param promise - Promise resolving to component
 * @param originalComponent - Original component function
 * @returns Cached component wrapper
 */
function createAsyncComponentWithCache(
  promise: Promise<any>,
  originalComponent: any
): React.ComponentType<any> {
  if (typeof (globalThis as any).createAsyncComponentWithCache === "function") {
    return (globalThis as any).createAsyncComponentWithCache(
      promise,
      originalComponent
    );
  }

  // Fallback implementation - simple wrapper
  return function AsyncComponentWrapper(props: any) {
    const [result, setResult] = React.useState<any>(null);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
      promise.then(setResult).catch(setError);
    }, []);

    if (error) throw error;
    if (!result) return null;

    return result;
  };
}

// ============================================================================
// Utility Components
// ============================================================================

/**
 * Template wrapper component
 * Resets component tree on pathname change
 *
 * @param props - Component props with children
 * @returns Fragment with pathname key
 */
export function TemplateWrapper({ children }: { children: React.ReactNode }) {
  const router = (globalThis as any).useRouter?.();
  const pathname = router?.pathname || "/";

  return <Fragment key={pathname}>{children}</Fragment>;
}

/**
 * Centered container wrapper
 * Centers content and manages container reference
 *
 * @param props - Component props with children
 * @returns Div with centered content
 */
export function CenteredContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use centered container hook if available
  if (typeof (globalThis as any).useCenteredContainer === "function") {
    (globalThis as any).useCenteredContainer(true, containerRef, false, null);
  }

  return (
    <div className="contents" ref={containerRef}>
      {children}
    </div>
  );
}

/**
 * Default 404 page component
 *
 * @returns 404 error page
 */
export function NotFoundPage() {
  const ErrorPage = (globalThis as any).ErrorPage;

  if (ErrorPage) {
    return <ErrorPage code={404} message="This page could not be found." />;
  }

  return (
    <div>
      <h1>404</h1>
      <p>This page could not be found.</p>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default {
  loadSingleComponent,
  loadComponent,
  TemplateWrapper,
  CenteredContainer,
  NotFoundPage,
};
