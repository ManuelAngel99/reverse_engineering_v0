/**
 * CSS Compiler Module Exports
 *
 * Central export point for all CSS-related functionality
 */

// CSS Value Serialization
export {
  formatNumber,
  serializeColor,
  serializeDimension,
  serializeFunction,
  serializeCSSValue,
  serializeCSSValues,
  serializeCSSDeclaration,
  type CSSToken,
  type ColorValue,
  type DimensionValue,
} from "./serialization";

// LightningCSS Integration
export {
  initializeLightningCSS,
  getLightningCSSTransform,
  parseCSS,
  minifyCSS,
  transformCSSModule,
  resolveCSSImports,
  processCSS,
  clearParseCache,
  isInitialized,
} from "./lightning";

// Tailwind Configuration
export {
  detectTailwindVersion,
  getTailwindVersion,
  loadV3Config,
  loadV4Config,
  extractThemeVariables, // Extracts from global design tokens (v0 compatible)
  extractThemeVariables as extractThemeVariablesFromConfig, // Alias for clarity
  mergeTailwindConfigs,
  loadTailwindConfig,
  setGlobalTailwindConfig,
  getGlobalTailwindConfig,
  validateTailwindConfig,
  getDefaultTailwindConfig,
} from "./tailwind-config";

// Global Styles Handler
export {
  findGlobalStyles,
  hasLayout,
  loadGlobalStyles,
  injectStyles,
  cleanupStyles,
  cleanupAllStyles,
  getStyleRegistry,
  updateStyleDependencies,
  invalidateStylesByDependency,
  injectDefaultGlobalStyles,
  getStylePriority,
  sortStylesByPriority,
} from "./global-styles";

// CSS Processing Pipeline
export { processCSSFile } from "./pipeline";

// Design System Tokens
export {
  initializeDesignTokenRegistry,
  registerDesignTokens,
  unregisterDesignTokens,
  extractThemeVariables as extractThemeVariablesFromTokens,
  getAllDesignTokens,
  clearDesignTokens,
  getDesignTokensCount,
  type DesignSystemTokens,
} from "./design-tokens";

// Google Fonts
export {
  getNextFontGoogleMod,
  type GoogleFontOptions,
  type NextFont,
} from "./google-fonts";
