/**
 * Crypto Polyfill
 *
 * Browser-compatible crypto module with randomUUID support
 * Original: Lines 60-66 from module_448763
 */

import cryptoBrowserify from "crypto-browserify";

/**
 * Create a crypto polyfill with randomUUID binding
 * @returns Crypto module with browser compatibility
 */
export async function createCryptoPolyfill() {
  return {
    ...cryptoBrowserify,
    randomUUID: crypto.randomUUID.bind(crypto),
  };
}

/**
 * Lazy loader for crypto module
 */
export const cryptoLoader = async () => {
  return createCryptoPolyfill();
};
