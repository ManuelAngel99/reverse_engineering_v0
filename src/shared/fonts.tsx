/**
 * Font Configurations - GeistSans and GeistMono
 * Source: 3a384aa7a60f1de8.js (Modules 72508, 827620, 397220, 912085, 133519, 609750)
 * Lines: 24-61
 *
 * Re-exports Geist font configurations for the DevTools UI.
 */

import { GeistSans as GeistSansFont } from "geist/font/sans";
import { GeistMono as GeistMonoFont } from "geist/font/mono";
import type { GeistFontConfig } from "@/core/fonts/types";

/**
 * GeistSans font configuration
 */
export const GeistSans: GeistFontConfig = {
  className: GeistSansFont.className,
  style: {
    fontFamily: GeistSansFont.style.fontFamily || "'Geist Sans', sans-serif",
  },
  variable: GeistSansFont.variable,
};

/**
 * GeistMono font configuration
 */
export const GeistMono: GeistFontConfig = {
  className: GeistMonoFont.className,
  style: {
    fontFamily: GeistMonoFont.style.fontFamily || "'Geist Mono', monospace",
  },
  variable: GeistMonoFont.variable,
};
