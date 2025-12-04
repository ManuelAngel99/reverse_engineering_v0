/**
 * Custom JSX Development Runtime
 * Source: module_448763_wo_first_layer.js (LOC 375-516)
 *
 * Custom jsxDEV implementation that wraps React's JSX runtime to:
 * 1. Inject v0 DevTools metadata into elements
 * 2. Transform static asset URLs
 * 3. Handle React Server Components (RSC)
 * 4. Validate server/client component boundaries
 * 5. Apply default font configuration to <html> elements
 */

import { Fragment, jsxDEV as reactJsxDEV } from "react/jsx-dev-runtime";
import type { ReactElement, ComponentType } from "react";
import { Slottable } from "@/devtools/components/Slottable";
import { DefaultHtmlWrapper } from "@/shared/font-configuration";
import {
  STATIC_ASSET_EXTENSIONS,
  isStaticAssetPath,
} from "@/compiler/assets/constants";
import { isFeatureEnabled } from "@/compiler/features/featureFlags";
import type { V0Metadata } from "@/shared/types/runtime";

// Import runtime utilities we just implemented!
import {
  staticAssetUrlToResourceUri,
  createAsyncComponentWithCache,
} from "../../runtime/assets/utilities";
import {
  getCurrentExecutionContext,
  executeRSC,
  executeInServerContext,
} from "../../runtime/context/execution-context";

/**
 * Props that may contain v0 metadata
 */
interface PropsWithMetadata extends V0Metadata {
  [key: string]: any;
}

/**
 * Component with special markers
 */
type ComponentWithMarkers = ComponentType<any> & {
  __slottable?: boolean;
  __client_ref?: boolean;
  __server_ref?: boolean;
};

/**
 * Custom jsxDEV implementation
 *
 * @param type - Element type (string for HTML elements, function for components)
 * @param props - Element props including v0 metadata
 * @param key - React key
 * @param isStaticChildren - Whether children are static
 * @param source - Source location info
 * @param self - Component instance
 */
function customJsxDEV(
  type: any,
  props: PropsWithMetadata | null,
  key: string | number | undefined,
  isStaticChildren: boolean,
  source: any,
  self: any
): ReactElement {
  // Extract v0 metadata from props
  const { __v0_i, __v0_c, __v0_m, __v0_e, __v0_r, ...cleanProps } = props || {};

  // Special handling for <style> elements
  if (type === "style") {
    // Remove Next.js-specific props that shouldn't be on DOM elements
    if ((cleanProps as any).jsx === true) {
      delete (cleanProps as any).jsx;
    }
    if ((cleanProps as any).global === true) {
      delete (cleanProps as any).global;
    }
  } else {
    // Handle src attribute transformation for static assets
    const { src, ...restProps } = cleanProps;

    if (type !== "link" && typeof src === "string") {
      // Transform src URL if it's a static asset
      const transformedSrc = staticAssetUrlToResourceUri(src);
      restProps.src = transformedSrc === null ? src : transformedSrc;

      // Create element with transformed src
      const element = reactJsxDEV(
        type,
        restProps,
        key,
        isStaticChildren,
        source,
        self
      );

      // Wrap in Slottable with metadata
      const slottableProps: any = {
        children: element,
        __v0_s: source,
        __v0_c,
        __v0_m,
        __v0_e,
        __v0_r,
      };

      if (__v0_i !== undefined) {
        slottableProps.__v0_i = __v0_i;
      }

      return reactJsxDEV(
        Slottable,
        slottableProps,
        key,
        isStaticChildren,
        source,
        self
      );
    }

    // Transform other props that might contain static asset URLs
    if (type !== "link") {
      for (const [propName, propValue] of Object.entries(restProps)) {
        if (
          typeof propValue === "string" &&
          isStaticAssetPath(propValue) &&
          STATIC_ASSET_EXTENSIONS.some((ext) => propValue.endsWith(ext))
        ) {
          const transformed = staticAssetUrlToResourceUri(propValue);
          restProps[propName] = transformed === null ? propValue : transformed;
        }
      }
    }

    // Use the cleaned props
    Object.assign(cleanProps, restProps);
  }

  // Validate server/client component boundaries (RSC)
  if (
    getCurrentExecutionContext() === "server" &&
    (typeof type === "string" ||
      (typeof type === "function" &&
        (type as ComponentWithMarkers).__client_ref === true))
  ) {
    validateServerClientBoundary(cleanProps);
  }

  // Replace <html> with DefaultHtmlWrapper to apply fonts
  let actualType = type;
  if (type === "html") {
    actualType = DefaultHtmlWrapper;
  }

  // Create the element
  let element = reactJsxDEV(
    actualType,
    cleanProps,
    key,
    isStaticChildren,
    source,
    self
  );

  // Don't wrap <defs> (SVG definition elements)
  if (type === "defs") {
    return element;
  }

  // Handle async components (React Server Components)
  if (
    actualType?.constructor?.name === "AsyncFunction" ||
    (typeof actualType === "function" &&
      actualType.toString().startsWith("async "))
  ) {
    const asyncComponent = actualType as ComponentType<any> & {
      (props: any): Promise<ReactElement>;
    };
    const AsyncWrapper = createAsyncComponentWithCache(
      executeRSC(() =>
        executeInServerContext(() => asyncComponent(cleanProps))
      ),
      asyncComponent
    );
    element = reactJsxDEV(
      AsyncWrapper,
      {},
      key,
      isStaticChildren,
      source,
      self
    );
  }

  // Don't wrap components marked as non-slottable
  if (
    actualType &&
    (actualType as ComponentWithMarkers).__slottable === false
  ) {
    return element;
  }

  // Wrap in Slottable with metadata for DevTools
  const slottableProps: any = {
    children: element,
    __v0_s: source,
    __v0_c,
    __v0_m,
    __v0_e,
    __v0_r,
  };

  if (__v0_i !== undefined) {
    slottableProps.__v0_i = __v0_i;
  }

  return reactJsxDEV(
    Slottable,
    slottableProps,
    key,
    isStaticChildren,
    source,
    self
  );
}

/**
 * Validate that functions aren't passed directly to client components
 * without being marked as server actions
 */
function validateServerClientBoundary(props: Record<string, any>): void {
  if (!isFeatureEnabled("rsc-boundary-error")) {
    return;
  }

  for (const propName in props) {
    const propValue = props[propName];

    if (typeof propValue === "function") {
      // Allow server refs
      if ((propValue as any).__server_ref === true) {
        continue;
      }

      // Check if function is marked as a server action
      const fnString = propValue.toString();
      if (
        !fnString.includes("use server") &&
        !fnString.includes("__v0_createServerRef")
      ) {
        throw new Error(
          'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.'
        );
      }
    }
  }
}

/**
 * Custom JSX runtime export
 * This replaces React's default jsx-dev-runtime
 */
export const jsxDEV = customJsxDEV;
export { Fragment };

/**
 * Export for use in module system
 */
export default {
  jsxDEV: customJsxDEV,
  Fragment,
};
