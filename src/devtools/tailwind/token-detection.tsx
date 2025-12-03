/**
 * Tailwind Utilities and Token Detection
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 227-354)
 *
 * Utilities for detecting Tailwind configuration, breakpoints, and design tokens.
 */

import React, { useEffect } from "react";
import { LRUCache } from "lru-cache";
import type {
  ElementExtraInfo,
  TailwindTokens,
  DesignSystemTokens,
} from "@/shared/types/runtime";
import { useLatest } from "./hooks";

// ============================================================================
// Constants
// ============================================================================

const BREAKPOINTS = ["2xl", "xl", "lg", "md", "sm"] as const;

// ============================================================================
// State
// ============================================================================

let cachedColors: TailwindTokens = {};
let cachedConfigVersion = -1;
const dsTokenCache = new LRUCache<string, string>({ max: 2000 });

// ============================================================================
// Token Detection (lines 231-354)
// ============================================================================

/**
 * Gets extra element information including computed styles and Tailwind tokens
 */
export function getExtraElementInfo(
  element: HTMLElement | SVGElement,
  includeDSTokens = false
): ElementExtraInfo {
  const computedStyle = window.getComputedStyle(element);
  const color = computedStyle.color;
  const backgroundColor = computedStyle.backgroundColor;
  const borderColor = computedStyle.borderColor;
  const fontWeight = computedStyle.fontWeight;

  // Detect active breakpoint
  const activeBreakpoint = BREAKPOINTS.find((bp) => {
    const detector = document.getElementById(`__v0_tw_${bp}`);
    if (!detector) return false;
    return window.getComputedStyle(detector).width === "0px";
  });

  // Get Tailwind color tokens
  const twTokens = getTailwindColorTokens();
  const twVersion = getTailwindVersion();

  // Detect current theme
  const currentTheme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  return {
    color,
    backgroundColor,
    borderColor,
    fontWeight,
    activeBreakpoint,
    twTokens,
    dsTokens: includeDSTokens ? getDesignSystemTokens() : undefined,
    twVersion,
    currentTheme,
  };
}

/**
 * Gets Tailwind version from window if available
 */
function getTailwindVersion(): string | undefined {
  return (window as any).__TAILWIND_VERSION__;
}

/**
 * Gets Tailwind config version from window
 */
function getTailwindConfigVersion(): number {
  return (window as any).__TAILWIND_CONFIG_VERSION__ || 0;
}

/**
 * Gets Tailwind config from window
 */
function getTailwindConfig(): any {
  return (window as any).__TAILWIND_CONFIG__;
}

/**
 * Gets Tailwind color tokens from config
 */
function getTailwindColorTokens(): TailwindTokens {
  const configVersion = getTailwindConfigVersion();

  // Return cached if version matches
  if (configVersion === cachedConfigVersion) {
    return cachedColors;
  }

  const config = getTailwindConfig();
  if (!config) return {};

  // Get base colors
  const colors = { ...config.colors };

  // Remove deprecated Tailwind v2 colors
  delete colors.lightBlue;
  delete colors.warmGray;
  delete colors.trueGray;
  delete colors.coolGray;
  delete colors.blueGray;

  // Merge with extended colors
  const extendedColors = config.config.theme?.extend?.colors;
  const allColors = { ...colors, ...extendedColors };

  // Get color detector element
  const colorDetector = document.getElementById("__v0_tw_color");
  if (!colorDetector) return {};

  // Update cache version
  cachedConfigVersion = configVersion;

  // Map color values to CSS custom properties
  let propIndex = 0;
  for (const colorName in allColors) {
    if (colorName === "inherit" || colorName === "current") continue;

    if (typeof allColors[colorName] === "object") {
      for (const shade in allColors[colorName]) {
        if (typeof allColors[colorName][shade] === "string") {
          colorDetector.style.setProperty(
            `--v0-c-${propIndex++}`,
            allColors[colorName][shade]
          );
        }
      }
    } else if (typeof allColors[colorName] === "string") {
      colorDetector.style.setProperty(
        `--v0-c-${propIndex++}`,
        allColors[colorName]
      );
    }
  }

  // Read computed values
  propIndex = 0;
  const resolvedColors: Record<string, string> = {};
  const computedStyle = window.getComputedStyle(colorDetector);

  for (const colorName in allColors) {
    if (colorName === "inherit" || colorName === "current") continue;

    if (typeof allColors[colorName] === "object") {
      for (const shade in allColors[colorName]) {
        if (typeof allColors[colorName][shade] === "string") {
          const value = computedStyle.getPropertyValue(`--v0-c-${propIndex++}`);
          const key = shade === "DEFAULT" ? colorName : `${colorName}-${shade}`;
          resolvedColors[key] = value;
        }
      }
    } else if (typeof allColors[colorName] === "string") {
      const value = computedStyle.getPropertyValue(`--v0-c-${propIndex++}`);
      resolvedColors[colorName] = value;
    }
  }

  // Filter out empty values
  for (const key in resolvedColors) {
    const value = resolvedColors[key];
    if (value === "" || value === "hsl()") {
      delete resolvedColors[key];
    }
  }

  cachedColors = { colors: resolvedColors };
  return cachedColors;
}

/**
 * Gets design system tokens (custom CSS properties)
 */
function getDesignSystemTokens(): DesignSystemTokens {
  const tokenSets = (window as any).__v0_dst || [];

  if (tokenSets.length === 0) {
    return { default: {}, dark: {}, theme: {} };
  }

  const detector = document.getElementById("__v0_tw_dst");
  if (!detector) {
    return { default: {}, dark: {}, theme: {} };
  }

  // Merge all token sets
  const merged = tokenSets.reduce(
    (acc: DesignSystemTokens, tokens: DesignSystemTokens) => ({
      default: { ...acc.default, ...tokens.default },
      dark: { ...acc.dark, ...tokens.dark },
      theme: { ...acc.theme, ...tokens.theme },
    }),
    { default: {}, dark: {}, theme: {} }
  );

  // Resolve token values using the detector element
  for (const mode of ["default", "dark"] as const) {
    const modeTokens = merged[mode];

    for (const key in modeTokens) {
      const rawValue = modeTokens[key];

      // Check cache first
      if (dsTokenCache.has(rawValue)) {
        modeTokens[key] = dsTokenCache.get(rawValue)!;
        continue;
      }

      // Handle numeric values
      if (typeof CSSNumericValue === "undefined") {
        modeTokens[key] = rawValue.trim();
        dsTokenCache.set(rawValue, modeTokens[key]);
        continue;
      }

      try {
        const numericValue = CSSNumericValue.parse(rawValue);
        let resolvedValue: string;

        if (numericValue.unit === "number" || numericValue.unit === "") {
          // Use opacity to resolve unitless numbers
          detector.style.setProperty("opacity", rawValue);
          resolvedValue = window
            .getComputedStyle(detector)
            .getPropertyValue("opacity");
        } else {
          // Use margin-left to resolve length values
          detector.style.setProperty("margin-left", rawValue);
          resolvedValue = window
            .getComputedStyle(detector)
            .getPropertyValue("margin-left");
        }

        modeTokens[key] = resolvedValue;
        dsTokenCache.set(rawValue, resolvedValue);
      } catch (error) {
        // Fall back to color resolution
        detector.style.setProperty("color", rawValue);
        const resolvedValue = window
          .getComputedStyle(detector)
          .getPropertyValue("color");
        modeTokens[key] = resolvedValue;
        dsTokenCache.set(rawValue, resolvedValue);
      }
    }
  }

  return merged;
}

// ============================================================================
// TailwindVarDetector Component (lines 355-408)
// ============================================================================

interface TailwindVarDetectorProps {
  onViewportChange: () => void;
}

/**
 * Component that detects Tailwind breakpoints and provides token resolution elements
 */
export function TailwindVarDetector({
  onViewportChange,
}: TailwindVarDetectorProps) {
  const latestCallback = useLatest(onViewportChange);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      latestCallback.current();
    });

    const sm = document.getElementById("__v0_tw_sm");
    const md = document.getElementById("__v0_tw_md");
    const lg = document.getElementById("__v0_tw_lg");
    const xl = document.getElementById("__v0_tw_xl");
    const xxl = document.getElementById("__v0_tw_2xl");

    if (sm && md && lg && xl && xxl) {
      observer.observe(sm);
      observer.observe(md);
      observer.observe(lg);
      observer.observe(xl);
      observer.observe(xxl);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 opacity-0 invisible pointer-events-none">
      <span id="__v0_tw_dst" />
      <span id="__v0_tw_color" />
      <span id="__v0_tw_sm" className="inline-block size-1 sm:size-0" />
      <span id="__v0_tw_md" className="inline-block size-1 md:size-0" />
      <span id="__v0_tw_lg" className="inline-block size-1 lg:size-0" />
      <span id="__v0_tw_xl" className="inline-block size-1 xl:size-0" />
      <span id="__v0_tw_2xl" className="inline-block size-1 2xl:size-0" />
    </div>
  );
}

export default TailwindVarDetector;
