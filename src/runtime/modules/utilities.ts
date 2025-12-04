/**
 * Module Utilities
 *
 * Additional module-related utilities that don't fit in navigation
 */

// Re-export navigation utilities for backward compatibility
export {
  importEntry,
  relocationWhileBlocking,
  getIsNavigationBlocked,
  findOriginalModuleNameFromURL,
  isFromCDN,
  getModuleNameFromBlob,
  registerBlobToModuleName,
  resolveUrl,
} from "../navigation/utilities";
