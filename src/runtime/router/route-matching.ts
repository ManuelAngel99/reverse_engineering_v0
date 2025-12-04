/**
 * Route Matching
 * Source: module_448763 (Lines 794-873)
 *
 * URL pattern matching with dynamic segments, catch-all routes, and parameter extraction.
 * Implements Next.js App Router file-based routing conventions.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Route segment types in priority order
 * Used to determine which route takes precedence
 */
export type RouteSegmentType =
  | "layout"
  | "template"
  | "error"
  | "loading"
  | "default"
  | "page"
  | "route"
  | "not-found"
  | "opengraph-image";

/**
 * Route parameters extracted from dynamic segments
 */
export type RouteParams = Record<string, string | string[] | undefined>;

/**
 * Route match result
 * Tuple of [params, isExactMatch]
 */
export type RouteMatchResult = [RouteParams, boolean] | null;

// ============================================================================
// Constants
// ============================================================================

/**
 * Route segment types in priority order
 * Lower index = higher priority
 */
const ROUTE_SEGMENT_PRIORITY: RouteSegmentType[] = [
  "layout",
  "template",
  "error",
  "loading",
  "default",
  "page",
  "route",
  "not-found",
  "opengraph-image",
];

// ============================================================================
// Segment Priority
// ============================================================================

/**
 * Calculate priority for a route segment
 *
 * Priority values:
 * - 0-8: Named segments (layout, page, etc.)
 * - -1: Optional catch-all with dot ([[...slug]])
 * - -2: Dynamic with dot ([.slug])
 * - -3: Dynamic segment ([slug])
 * - -4: Static segment
 *
 * @param segment - Route segment name
 * @returns Priority value (lower = higher priority)
 */
export function getSegmentPriority(segment: string): number {
  // Check if it's a named segment type
  const namedIndex = ROUTE_SEGMENT_PRIORITY.indexOf(
    segment as RouteSegmentType
  );

  if (namedIndex !== -1) {
    return namedIndex;
  }

  // Dynamic segments
  if (segment[0] === "[") {
    // Optional catch-all: [[...slug]]
    if (segment[1] === "[" && segment[2] === ".") {
      return -1;
    }

    // Dynamic with dot: [.slug]
    if (segment[1] === ".") {
      return -2;
    }

    // Regular dynamic: [slug] or [...slug]
    return -3;
  }

  // Static segment (lowest priority)
  return -4;
}

// ============================================================================
// Parameter Extraction
// ============================================================================

/**
 * Extract parameter name and value from a dynamic segment
 *
 * @param segment - Route segment (e.g., "[slug]", "[...slug]", "[[...slug]]")
 * @param pathSegments - Remaining path segments to match
 * @returns Tuple of [paramName, paramValue]
 */
function extractParameter(
  segment: string,
  pathSegments: string[]
): [string, string | string[]] {
  // Remove brackets
  const inner = segment.slice(1, -1);

  // Catch-all: [...slug]
  if (inner.startsWith("...")) {
    return [inner.slice(3), pathSegments];
  }

  // Optional catch-all: [[...slug]]
  if (inner.startsWith("[...") && inner.endsWith("]")) {
    return [inner.slice(4, -1), pathSegments];
  }

  // Regular dynamic segment: [slug]
  return [inner, pathSegments[0]];
}

// ============================================================================
// Route Matching
// ============================================================================

/**
 * Match a URL path against a route pattern
 *
 * Supports:
 * - Static segments: /about
 * - Dynamic segments: /posts/[id]
 * - Catch-all: /docs/[...slug]
 * - Optional catch-all: /[[...slug]]
 *
 * @param urlPath - URL path to match (e.g., "/posts/123")
 * @param routePattern - Route pattern (e.g., "/posts/[id]")
 * @returns Match result with params and exact match flag, or null if no match
 *
 * @example
 * ```typescript
 * matchRoute("/posts/123", "/posts/[id]");
 * // Returns: [{ id: "123" }, true]
 *
 * matchRoute("/docs/api/intro", "/docs/[...slug]");
 * // Returns: [{ slug: ["api", "intro"] }, true]
 *
 * matchRoute("/", "/[[...slug]]");
 * // Returns: [{ slug: undefined }, true]
 * ```
 */
export function matchRoute(
  urlPath: string,
  routePattern: string
): RouteMatchResult {
  // Normalize paths (remove trailing slashes)
  if (urlPath.endsWith("/")) {
    urlPath = urlPath.slice(0, -1);
  }

  if (routePattern.endsWith("/")) {
    routePattern = routePattern.slice(0, -1);
  }

  // Split into segments
  const urlSegments = urlPath.split("/");
  const routeSegments = routePattern.split("/");

  // Check if URL has fewer segments than route
  if (urlSegments.length < routeSegments.length) {
    // Only valid if route ends with optional catch-all
    const lastSegment = routeSegments[routeSegments.length - 1];
    const isOptionalCatchAll =
      routeSegments.length === urlSegments.length + 1 &&
      lastSegment.startsWith("[[...");

    if (!isOptionalCatchAll) {
      return null;
    }
  }

  // Track if this is an exact match (same number of segments)
  let isExactMatch = urlSegments.length === routeSegments.length;

  // Extract parameters
  const params: RouteParams = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];

    // Dynamic segment
    if (routeSegment.startsWith("[") && routeSegment.endsWith("]")) {
      const [paramName, paramValue] = extractParameter(
        routeSegment,
        urlSegments.slice(i)
      );

      params[paramName] = paramValue;

      // Catch-all segments consume remaining path
      if (Array.isArray(paramValue)) {
        isExactMatch = true;

        // Optional catch-all with no segments
        if (paramValue.length === 0) {
          params[paramName] = undefined;
        }
      }
    }
    // Static segment - must match exactly
    else if (routeSegment !== urlSegments[i]) {
      return null;
    }
  }

  return [params, isExactMatch];
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a route pattern is dynamic
 *
 * @param routePattern - Route pattern to check
 * @returns True if pattern contains dynamic segments
 */
export function isDynamicRoute(routePattern: string): boolean {
  return routePattern.includes("[") && routePattern.includes("]");
}

/**
 * Check if a route pattern is a catch-all
 *
 * @param routePattern - Route pattern to check
 * @returns True if pattern is a catch-all route
 */
export function isCatchAllRoute(routePattern: string): boolean {
  return routePattern.includes("[...");
}

/**
 * Check if a route pattern is an optional catch-all
 *
 * @param routePattern - Route pattern to check
 * @returns True if pattern is an optional catch-all route
 */
export function isOptionalCatchAllRoute(routePattern: string): boolean {
  return routePattern.includes("[[...");
}

/**
 * Extract all dynamic segment names from a route pattern
 *
 * @param routePattern - Route pattern
 * @returns Array of parameter names
 *
 * @example
 * ```typescript
 * getRouteParams("/posts/[id]/comments/[commentId]");
 * // Returns: ["id", "commentId"]
 * ```
 */
export function getRouteParams(routePattern: string): string[] {
  const params: string[] = [];
  const segments = routePattern.split("/");

  for (const segment of segments) {
    if (segment.startsWith("[") && segment.endsWith("]")) {
      const inner = segment.slice(1, -1);

      // Extract param name from various formats
      if (inner.startsWith("...")) {
        params.push(inner.slice(3));
      } else if (inner.startsWith("[...") && inner.endsWith("]")) {
        params.push(inner.slice(4, -1));
      } else {
        params.push(inner);
      }
    }
  }

  return params;
}

/**
 * Compare two route patterns by priority
 * Used for sorting routes (most specific first)
 *
 * @param a - First route pattern
 * @param b - Second route pattern
 * @returns Comparison result (-1, 0, 1)
 */
export function compareRoutePriority(a: string, b: string): number {
  const aSegments = a.split("/");
  const bSegments = b.split("/");

  // More segments = higher priority
  if (aSegments.length !== bSegments.length) {
    return bSegments.length - aSegments.length;
  }

  // Compare segment by segment
  for (let i = 0; i < aSegments.length; i++) {
    const aPriority = getSegmentPriority(aSegments[i]);
    const bPriority = getSegmentPriority(bSegments[i]);

    if (aPriority !== bPriority) {
      // Lower priority value = higher priority
      return aPriority - bPriority;
    }
  }

  return 0;
}

// ============================================================================
// Exports
// ============================================================================

export default {
  matchRoute,
  getSegmentPriority,
  isDynamicRoute,
  isCatchAllRoute,
  isOptionalCatchAllRoute,
  getRouteParams,
  compareRoutePriority,
};
