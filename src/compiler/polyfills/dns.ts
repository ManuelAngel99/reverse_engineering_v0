/**
 * Section: DNS Operations
 * Start LOC: 68
 * End LOC: 148
 *
 * Summary:
 * Implements DNS operations including async and synchronous DNS operations using fetch API
 * and XMLHttpRequest. Creates DNS lookup, resolve, and reverse operations. Includes comprehensive
 * DNS method wrappers for both sync and async contexts. Provides browser-compatible DNS API
 * that proxies requests through a backend API endpoint.
 */

import type { DNSLookupOptions, DNSResolveOptions, DNSResult } from "./types";
import { getCurrentExecutionContext } from "../../runtime/context/execution-context";

// ============================================================================
// Async DNS Operations
// ============================================================================

/**
 * Performs asynchronous DNS operations via fetch API
 *
 * @param operation - The DNS operation to perform (lookup, resolve, etc.)
 * @param hostname - The hostname to query
 * @param options - Options for the DNS operation
 * @returns Promise resolving to the DNS result
 * @throws Error if DNS operation fails or if called from client context
 */
async function performAsyncDNSOperation(
  operation: string,
  hostname: string,
  options?: any
): Promise<any> {
  if (getCurrentExecutionContext() !== "server") {
    throw new Error("The 'dns' module is not available on the client.");
  }

  const response = await fetch("/api/dns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation, hostname, options }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: any = new Error(errorData.message || "DNS operation failed");
    error.code = errorData.code;
    throw error;
  }

  const data = await response.json();
  return data.result;
}

// ============================================================================
// Synchronous DNS Operations
// ============================================================================

/**
 * Performs synchronous DNS operations via XMLHttpRequest
 *
 * @param operation - The DNS operation to perform
 * @param hostname - The hostname to query
 * @param options - Options for the DNS operation
 * @returns The DNS result
 * @throws Error if DNS operation fails or if called from client context
 */
function performSyncDNSOperation(
  operation: string,
  hostname: string,
  options?: any
): any {
  if (getCurrentExecutionContext() !== "server") {
    throw new Error("The 'dns' module is not available on the client.");
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/dns", false); // false = synchronous
  xhr.setRequestHeader("Content-Type", "application/json");

  const requestBody = JSON.stringify({ operation, hostname, options });

  try {
    xhr.send(requestBody);

    if (xhr.status >= 200 && xhr.status < 300) {
      return JSON.parse(xhr.responseText).result;
    } else {
      const errorData = JSON.parse(xhr.responseText);
      const error: any = new Error(errorData.message || "DNS operation failed");
      error.code = errorData.code;
      throw error;
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Invalid response from DNS server");
    }
    throw error;
  }
}

// ============================================================================
// Synchronous DNS API
// ============================================================================

/**
 * Creates synchronous DNS methods
 * These are synchronous wrappers that block execution
 */
export function createSyncDNS() {
  return {
    /**
     * Resolve a hostname to an IP address (synchronous)
     */
    lookup: (hostname: string, options?: DNSLookupOptions) =>
      performSyncDNSOperation("lookup", hostname, options),

    /**
     * Resolve a hostname to array of resource records (synchronous)
     */
    resolve: (hostname: string, rrtype?: string) =>
      performSyncDNSOperation("resolve", hostname, { rrtype }),

    /**
     * Resolve IPv4 addresses (synchronous)
     */
    resolve4: (hostname: string, options?: DNSResolveOptions) =>
      performSyncDNSOperation("resolve4", hostname, options),

    /**
     * Resolve IPv6 addresses (synchronous)
     */
    resolve6: (hostname: string, options?: DNSResolveOptions) =>
      performSyncDNSOperation("resolve6", hostname, options),

    /**
     * Resolve mail exchange records (synchronous)
     */
    resolveMx: (hostname: string) =>
      performSyncDNSOperation("resolveMx", hostname),

    /**
     * Resolve text records (synchronous)
     */
    resolveTxt: (hostname: string) =>
      performSyncDNSOperation("resolveTxt", hostname),

    /**
     * Resolve name server records (synchronous)
     */
    resolveNs: (hostname: string) =>
      performSyncDNSOperation("resolveNs", hostname),

    /**
     * Resolve NAPTR records (synchronous)
     */
    resolveNaptr: (hostname: string) =>
      performSyncDNSOperation("resolveNaptr", hostname),

    /**
     * Resolve service records (synchronous)
     */
    resolveSrv: (hostname: string) =>
      performSyncDNSOperation("resolveSrv", hostname),

    /**
     * Resolve pointer records (synchronous)
     */
    resolvePtr: (hostname: string) =>
      performSyncDNSOperation("resolvePtr", hostname),

    /**
     * Resolve canonical name records (synchronous)
     */
    resolveCname: (hostname: string) =>
      performSyncDNSOperation("resolveCname", hostname),

    /**
     * Reverse resolve an IP to hostname (synchronous)
     */
    reverse: (ip: string) => performSyncDNSOperation("reverse", ip),

    /**
     * Resolve start of authority records (synchronous)
     */
    resolveSoa: (hostname: string) =>
      performSyncDNSOperation("resolveSoa", hostname),

    /**
     * Resolve all record types (synchronous)
     */
    resolveAny: (hostname: string) =>
      performSyncDNSOperation("resolveAny", hostname),

    /**
     * Resolve certification authority authorization records (synchronous)
     */
    resolveCaa: (hostname: string) =>
      performSyncDNSOperation("resolveCaa", hostname),
  };
}

// ============================================================================
// Asynchronous DNS API
// ============================================================================

/**
 * Creates asynchronous DNS methods
 * These return promises and don't block execution
 */
export function createAsyncDNS() {
  const syncDNS = createSyncDNS();

  // Convert all sync methods to async
  const asyncDNS: Record<string, (...args: any[]) => Promise<any>> = {};

  for (const methodName of Object.keys(syncDNS) as Array<
    keyof typeof syncDNS
  >) {
    asyncDNS[methodName] = async (...args: any[]) => {
      try {
        const [hostname, options] = args;
        return await performAsyncDNSOperation(methodName, hostname, options);
      } catch (error) {
        throw error;
      }
    };
  }

  return asyncDNS;
}

// ============================================================================
// Exports
// ============================================================================

/**
 * Synchronous DNS methods (for 'dns' module)
 */
export const dns = createSyncDNS();

/**
 * Asynchronous DNS methods (for 'dns/promises' module)
 */
export const dnsPromises = createAsyncDNS();

/**
 * Default export provides synchronous DNS
 */
export default dns;
