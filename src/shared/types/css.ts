/**
 * CSS Type Definitions
 *
 * Type definitions for CSS processing, LightningCSS integration,
 * and Tailwind configuration.
 */

import type { CSSToken } from "@/compiler/css/serialization";

/**
 * LightningCSS parsed stylesheet
 */
export interface ParsedStylesheet {
  rules: CSSRule[];
  sources: string[];
}

/**
 * CSS Rule types
 */
export type CSSRule =
  | StyleRule
  | AtRule
  | ImportRule
  | MediaRule
  | SupportsRule
  | KeyframesRule;

export interface StyleRule {
  type: "style";
  selectors: string[];
  declarations: CSSDeclaration[];
  loc?: SourceLocation;
}

export interface AtRule {
  type: "at-rule";
  name: string;
  prelude?: string;
  block?: CSSRule[];
  loc?: SourceLocation;
}

export interface ImportRule {
  type: "import";
  url: string;
  supports?: string;
  media?: string;
  loc?: SourceLocation;
}

export interface MediaRule {
  type: "media";
  query: string;
  rules: CSSRule[];
  loc?: SourceLocation;
}

export interface SupportsRule {
  type: "supports";
  condition: string;
  rules: CSSRule[];
  loc?: SourceLocation;
}

export interface KeyframesRule {
  type: "keyframes";
  name: string;
  keyframes: Keyframe[];
  loc?: SourceLocation;
}

export interface Keyframe {
  selector: string;
  declarations: CSSDeclaration[];
}

export interface CSSDeclaration {
  property: string;
  value: CSSToken | CSSToken[];
  important?: boolean;
  loc?: SourceLocation;
}

export interface SourceLocation {
  line: number;
  column: number;
  source?: string;
}

/**
 * CSS Module transformation result
 */
export interface CSSModuleResult {
  css: string;
  exports: Record<string, string>; // className -> scopedClassName
  dependencies: string[];
}

/**
 * CSS Processing options
 */
export interface CSSProcessingOptions {
  minify?: boolean;
  modules?: boolean;
  sourceMap?: boolean;
  filename?: string;
  tailwind?: boolean;
}

/**
 * CSS Processing result
 */
export interface CSSProcessingResult {
  code: string;
  map?: string;
  exports?: Record<string, string>;
  dependencies: string[];
  themeVariables?: Record<string, string>;
}

/**
 * Tailwind configuration (v3 format)
 */
export interface TailwindConfigV3 {
  content?: string[] | { files: string[] };
  theme?: {
    extend?: Record<string, any>;
    colors?: Record<string, any>;
    spacing?: Record<string, any>;
    [key: string]: any;
  };
  plugins?: any[];
  darkMode?: "media" | "class" | ["class", string];
  prefix?: string;
  important?: boolean | string;
  separator?: string;
  corePlugins?: Record<string, boolean> | string[];
  [key: string]: any;
}

/**
 * Tailwind configuration (v4 CSS-based format)
 */
export interface TailwindConfigV4 {
  version: 4;
  theme: Record<string, string>; // CSS custom properties
  source: "css";
}

/**
 * Unified Tailwind configuration
 */
export type TailwindConfig = TailwindConfigV3 | TailwindConfigV4;

/**
 * Tailwind version detection result
 */
export interface TailwindVersion {
  version: 3 | 4;
  configPath?: string;
  cssPath?: string;
}

/**
 * Theme variables extracted from Tailwind config
 */
export interface ThemeVariables {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  fontSize: Record<string, string>;
  fontFamily: Record<string, string>;
  borderRadius: Record<string, string>;
  [key: string]: Record<string, string>;
}

/**
 * Global styles configuration
 */
export interface GlobalStylesConfig {
  path: string;
  content: string;
  hasLayout: boolean;
  tailwindConfig?: TailwindConfig;
}

/**
 * Style registry entry (for HMR tracking)
 */
export interface StyleRegistryEntry {
  id: string;
  path: string;
  element: HTMLStyleElement;
  content: string;
  dependencies: string[];
  timestamp: number;
}
