/**
 * Feature Flags System
 * Source: module_448763_wo_first_layer.js (LOC 303-317)
 *
 * Timestamp-based feature gating system. Features are enabled when the
 * current timestamp (from globals or window.__v0_ts) exceeds the feature's
 * activation timestamp.
 */

/**
 * Feature flag activation timestamps
 * Features are enabled when current time > timestamp
 */
export const FEATURE_FLAGS = {
  /** TypeScript path mapping support (tsconfig paths) */
  "tsconfig-paths": 1740002400000,

  /** RSC boundary error validation (always enabled) */
  "rsc-boundary-error": Infinity,

  /** Next.js middleware support */
  middleware: 1742293376172,

  /** package.json dependency resolution */
  "package-json": 1742370125829,

  /** Tailwind CSS configuration support */
  "tailwind-config": 1737680400000,

  /** Prevent direct iframe access */
  "no-direct-frame-access": 1755302560543,

  /** Strict JSX type checking */
  "jsx-strict-types": 1755097280000,

  /** Disable hardcoded AI SDK version override */
  "hardcoded-ai-sdk-override-disabled": new Date(1754006400000).getTime(),
} as const;

/**
 * Feature flag names
 */
export type FeatureFlag = keyof typeof FEATURE_FLAGS;

/**
 * Global state interface for feature flags
 */
export interface FeatureFlagGlobals {
  internal_ts?: number;
}

/**
 * Get globals object (should be implemented by runtime)
 */
declare function getGlobals(): FeatureFlagGlobals;

/**
 * Check if a feature flag is enabled
 *
 * @param flag - Feature flag name
 * @param timestamp - Optional timestamp to check against (defaults to current time)
 * @returns true if feature is enabled
 */
export function isFeatureEnabled(
  flag: FeatureFlag,
  timestamp?: number
): boolean {
  const flagTimestamp = FEATURE_FLAGS[flag];

  // Get current timestamp from various sources
  const currentTime =
    timestamp ||
    (typeof getGlobals === "function" && getGlobals().internal_ts) ||
    (typeof window !== "undefined" && (window as any).__v0_ts) ||
    Date.now();

  return !!flagTimestamp && currentTime > flagTimestamp;
}

/**
 * Get all enabled features at a given timestamp
 *
 * @param timestamp - Optional timestamp (defaults to current time)
 * @returns Array of enabled feature flag names
 */
export function getEnabledFeatures(timestamp?: number): FeatureFlag[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlag[]).filter((flag) =>
    isFeatureEnabled(flag, timestamp)
  );
}

/**
 * Check multiple feature flags at once
 *
 * @param flags - Array of feature flag names
 * @param timestamp - Optional timestamp
 * @returns Object mapping flag names to enabled status
 */
export function checkFeatures(
  flags: FeatureFlag[],
  timestamp?: number
): Record<FeatureFlag, boolean> {
  return flags.reduce((acc, flag) => {
    acc[flag] = isFeatureEnabled(flag, timestamp);
    return acc;
  }, {} as Record<FeatureFlag, boolean>);
}
