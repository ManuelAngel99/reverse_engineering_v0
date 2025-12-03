/**
 * Section: HTTPS Module Loader
 * Start LOC: 150
 * End LOC: 153
 *
 * Summary:
 * Dynamically loads the HTTPS module for Node.js compatibility in the browser.
 * Returns either the default export or the entire module object depending on
 * the module structure. Used as part of the Node.js polyfill system.
 */

import https from "https";

/**
 * Loads the HTTPS module
 *
 * In the browser environment, this returns a polyfilled version of the Node.js HTTPS module.
 * The actual implementation will be provided by the bundler's polyfills.
 *
 * @returns Promise resolving to the HTTPS module
 */
export async function loadHTTPSModule(): Promise<typeof https> {
  // In the original v0 code, this dynamically loads via module.A(651193)
  // For our decompiled version, we just return the Node.js https module
  // The bundler will handle polyfilling it for browser environments
  return https;
}

/**
 * Default export for convenience
 */
export default loadHTTPSModule;
