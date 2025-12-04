/**
 * Route Resolution
 * Source: module_448763 (Lines 874-1120)
 *
 * Resolves routes from file structure, handling app directory structure,
 * middleware processing, and route file discovery. Recursively builds
 * component tree with layouts, templates, errors, loading states, and not-found handlers.
 */

import { matchRoute, type RouteParams } from "./route-matching";
import { executeMiddleware } from "../middleware/middleware-system";

// ============================================================================
// Types
// ============================================================================

/**
 * Directory structure node
 */
export interface DirectoryNode {
  /** Subdirectories */
  dirs: Record<string, DirectoryNode>;
  /** Files in this directory */
  files: Record<string, string>;
}

/**
 * Route segment with nested structure
 */
export interface RouteSegment {
  /** Nested segments (children, slots) */
  segments: Record<string, RouteSegment>;
  /** Route parameters */
  params: RouteParams;
  /** Layout component */
  layout?: string;
  /** Template component */
  template?: string;
  /** Error boundary component */
  error?: string;
  /** Loading component */
  loading?: string;
  /** Not found component */
  notFound?: string;
  /** Default component */
  default?: string;
  /** Page component */
  page?: string;
  /** Route handler */
  route?: string;
  /** OpenGraph image */
  opengraphImage?: string;
}

/**
 * Route resolution result
 * Tuple of [pathname, params, routeHandler, renderer]
 */
export type RouteResolutionResult =
  | [
      pathname: string,
      params: RouteParams,
      routeHandler: string | null,
      renderer: () => Promise<React.ReactNode>
    ]
  | null;

/**
 * Route type for resolution
 */
export type RouteType = "page" | "route" | "opengraph-image";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if URL is a blob or data URL
 *
 * @param url - URL to check
 * @returns True if blob or data URL
 */
function isBlobOrDataUrl(url: string): boolean {
  return url.startsWith("blob:") || url.startsWith("data:");
}

/**
 * Extract pathname from entry modules
 * Converts file path to URL path
 *
 * @param modulePath - Module file path
 * @returns URL pathname or null
 */
function extractPathnameFromModule(modulePath: string): string | null {
  let pathname = "/";
  const segments = modulePath.split("/");

  // Must end with "page"
  if (segments[segments.length - 1] !== "page") {
    return null;
  }

  // Remove "page" segment
  segments.pop();

  // Remove @v0 prefix if present
  if (segments[0] === "@v0") {
    segments.shift();
  }

  // Remove app directory
  if (segments[0] === "app") {
    segments.shift();
  }

  // Build pathname, skipping route groups and parallel routes
  for (const segment of segments) {
    // Skip route groups: (group)
    if (segment.startsWith("(") && segment.endsWith(")")) {
      continue;
    }

    // Skip parallel routes: @slot
    if (segment.startsWith("@")) {
      continue;
    }

    pathname += `${segment}/`;
  }

  return pathname;
}

/**
 * Find app directory in directory tree
 * Checks for @v0/app, app, or src/app
 *
 * @param root - Root directory node
 * @returns App directory node or root
 */
function findAppDirectory(root: DirectoryNode): DirectoryNode {
  let current = root;

  // Check for @v0 wrapper
  if (current.dirs["@v0"]) {
    current = current.dirs["@v0"];
  }

  // Check for app directory
  if (current.dirs.app) {
    return current.dirs.app;
  }

  // Check for src/app
  if (current.dirs.src?.dirs.app) {
    return current.dirs.src.dirs.app;
  }

  return current;
}

// ============================================================================
// Route Tree Building
// ============================================================================

/**
 * Recursively build route segment tree from directory structure
 *
 * @param segment - Current route segment
 * @param dir - Current directory node
 * @param pattern - Current route pattern
 * @param pathname - Target pathname to match
 * @returns True if any routes matched
 */
function buildRouteTree(
  segment: RouteSegment,
  dir: DirectoryNode,
  pattern: string,
  pathname: string
): boolean {
  let hasMatch = false;

  // Process subdirectories
  for (const [name, subdir] of Object.entries(dir.dirs)) {
    let nextPattern = pattern;
    let slotName = "";

    // Route groups: (group) - don't add to pattern
    if (name.startsWith("(") && name.endsWith(")")) {
      // Skip, don't modify pattern
    }
    // Parallel routes: @slot
    else if (name.startsWith("@")) {
      slotName = name.slice(1);
    }
    // Regular segment
    else {
      nextPattern = `${pattern}${name}/`;
      slotName = "children";
    }

    // Try to match this pattern
    const match = matchRoute(pathname, nextPattern);

    if (match) {
      const childSegment: RouteSegment = {
        segments: {},
        params: { ...segment.params, ...match[0] },
      };

      const childMatch = buildRouteTree(
        childSegment,
        subdir,
        nextPattern,
        pathname
      );
      hasMatch ||= childMatch;

      if (childMatch) {
        if (slotName === "") {
          segment.segments.children = childSegment;
        } else {
          segment.segments[slotName] = childSegment;
        }
      }
    }
  }

  // Check if current pattern matches
  const patternMatch = matchRoute(pathname, pattern);

  // Process files in current directory
  for (const [filePath, moduleId] of Object.entries(dir.files)) {
    const segments = filePath.split("/");
    const fileName = segments[segments.length - 1];

    // Assign files to segment based on name
    switch (fileName) {
      case "layout":
        segment.layout = moduleId;
        break;
      case "template":
        segment.template = moduleId;
        break;
      case "error":
        segment.error = moduleId;
        break;
      case "not-found":
        segment.notFound = moduleId;
        break;
      case "loading":
        segment.loading = moduleId;
        break;
      case "default":
        segment.default = moduleId;
        break;
      case "page":
        // Only assign if exact match
        if (patternMatch?.[1]) {
          segment.page = moduleId;
          hasMatch = true;
        }
        break;
      case "route":
        // Only assign if exact match
        if (patternMatch?.[1]) {
          segment.route = moduleId;
          hasMatch = true;
        }
        break;
      case "opengraph-image":
        // Check opengraph-image specific pattern
        const ogMatch = matchRoute(pathname, `${pattern}opengraph-image`);
        if (ogMatch?.[1]) {
          segment.opengraphImage = moduleId;
          hasMatch = true;
        }
        break;
    }
  }

  return hasMatch;
}

// ============================================================================
// Route Resolution
// ============================================================================

/**
 * Resolve a route from directory structure
 *
 * Handles:
 * - App directory structure discovery
 * - Middleware processing
 * - Route file discovery (page, route, opengraph-image)
 * - Component tree building with layouts, templates, errors, loading, not-found
 *
 * @param entryModules - Array of entry module paths
 * @param directoryTree - Directory structure
 * @param request - Request object or URL string
 * @param routeType - Type of route to resolve
 * @returns Route resolution result or null
 */
export async function resolveRoute(
  entryModules: string[],
  directoryTree: DirectoryNode,
  request?: Request | string,
  routeType: RouteType = "page"
): Promise<RouteResolutionResult> {
  let targetUrl: string;

  // Handle blob/data URLs
  if (typeof request === "string" && isBlobOrDataUrl(request)) {
    return null;
  }
  if (typeof request === "object" && isBlobOrDataUrl(request.url)) {
    return null;
  }

  // Determine target URL
  if (!request) {
    // Find first page in entry modules
    for (const modulePath of entryModules) {
      const pathname = extractPathnameFromModule(modulePath);
      if (pathname) {
        targetUrl = pathname;
        break;
      }
    }

    if (!targetUrl!) {
      return null;
    }
  } else {
    targetUrl = typeof request === "string" ? request : request.url;
  }

  // Execute middleware if request is provided
  let actualRequest: Request | string = request || targetUrl!;
  if (typeof actualRequest !== "string") {
    const middlewareResult = await executeMiddleware(actualRequest);
    if (middlewareResult) {
      // Middleware can return Request or Response
      if (middlewareResult instanceof Response) {
        // If middleware returns a Response, we can't continue routing
        return null;
      }
      actualRequest = middlewareResult;
    }
  }

  // Parse URL
  let pathname: string;
  if (typeof actualRequest === "string") {
    pathname = actualRequest;
  } else {
    const url = new URL(actualRequest.url);
    pathname = url.pathname + url.search;
  }

  const url = new URL(pathname, "http://n");
  const searchParams = Object.fromEntries(url.searchParams.entries());

  // Find app directory
  const appDir = findAppDirectory(directoryTree);

  // Build route tree
  const rootSegment: RouteSegment = {
    segments: {},
    params: {},
  };

  const hasMatch = buildRouteTree(rootSegment, appDir, "/", url.pathname);

  if (!hasMatch) {
    return null;
  }

  // Extract matched params and route handler
  let matchedParams: RouteParams = {};
  let routeHandler: string | null = null;

  // Find the deepest matching segment
  function findDeepestMatch(segment: RouteSegment): void {
    matchedParams = { ...matchedParams, ...segment.params };

    if (segment.route) {
      routeHandler = segment.route;
    }

    // Recurse into children
    for (const child of Object.values(segment.segments)) {
      findDeepestMatch(child);
    }
  }

  findDeepestMatch(rootSegment);

  // Check if we should bail out (route handler takes precedence over page)
  if (routeType === "page" && routeHandler) {
    return null;
  }

  // Create renderer function
  const renderer = async (): Promise<React.ReactNode> => {
    // This would normally call the actual rendering logic
    // For now, return a placeholder
    return null;
  };

  return [url.pathname, matchedParams, routeHandler, renderer];
}

// ============================================================================
// Exports
// ============================================================================

export default {
  resolveRoute,
  extractPathnameFromModule,
  findAppDirectory,
  buildRouteTree,
  isBlobOrDataUrl,
};
