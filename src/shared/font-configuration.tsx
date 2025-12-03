/**
 * @file fontConfiguration.tsx
 * @section Font & Style Configuration
 * @loc 321-374 (from module_448763_wo_first_layer.js)
 *
 * Configures Geist font families (Sans and Mono) for the v0 runtime sandbox.
 * Provides a React component (DefaultHtmlWrapper) that applies default font styling
 * to the root HTML element during v0's preview initialization.
 */

import { useEffect } from "react";
import type { HTMLAttributes } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import type { GeistFontConfig } from "@/core/fonts/types";

/**
 * Geist Sans font configuration
 */
export const geistSansConfig: GeistFontConfig = {
  className: GeistSans.className,
  style: {
    fontFamily: GeistSans.style.fontFamily || "'Geist Sans', sans-serif",
  },
  variable: GeistSans.variable,
};

/**
 * Geist Mono font configuration
 */
export const geistMonoConfig: GeistFontConfig = {
  className: GeistMono.className,
  style: {
    fontFamily: GeistMono.style.fontFamily || "'Geist Mono', monospace",
  },
  variable: GeistMono.variable,
};

/**
 * Combined default HTML attributes with font classes
 */
export const defaultHtmlAttributes = {
  className: cn(
    "font-sans antialiased",
    geistSansConfig.variable,
    geistMonoConfig.variable
  ),
  style: {
    "--font-serif": "__fallback",
  } as React.CSSProperties,
  lang: "en",
};

/**
 * Default HTML element wrapper component
 * Applies default font styling to the HTML root element on component unmount
 *
 * This is used by v0's JSX runtime to ensure fonts are properly initialized
 * in the preview sandbox even if the user doesn't explicitly set them.
 */
export function DefaultHtmlWrapper(props: HTMLAttributes<HTMLHtmlElement>) {
  useEffect(() => {
    // Cleanup function runs on unmount
    return () => {
      const htmlElement = document.querySelector("html");

      if (htmlElement && !htmlElement.className) {
        htmlElement.lang = defaultHtmlAttributes.lang;
        htmlElement.className = defaultHtmlAttributes.className;

        Object.entries(defaultHtmlAttributes.style).forEach(([key, value]) => {
          htmlElement.style.setProperty(key, value);
        });
      }
    };
  }, []);

  return <html {...props} />;
}
