/**
 * Console Message Formatter
 * Source: 3a384aa7a60f1de8.js (Module 717035, lines 1579-1649)
 *
 * Utilities for formatting console messages with printf-style placeholders.
 */

import type { ConsoleFormatType } from "@/shared/types/runtime";

/**
 * Converts any value to a string representation suitable for console output
 */
function valueToString(value: any): string {
  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === undefined ||
    typeof value === "symbol" ||
    typeof value === "bigint" ||
    value === null
  ) {
    return String(value);
  }

  if (typeof value === "function") {
    return value.toString();
  }

  if (value instanceof Error) {
    if (value.stack) {
      return value.stack;
    }
    if (typeof value.toString === "function") {
      return value.toString();
    }
    return value.message || String(value);
  }

  if (value && typeof value.toString === "function") {
    return value.toString();
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (e) {
      // Circular reference or other error
    }
  }

  return String(value);
}

/**
 * Formats a console message with printf-style format specifiers
 *
 * Supported format specifiers:
 * - %s: String
 * - %i, %d: Integer
 * - %f: Float
 * - %o, %O: Object (JSON stringified)
 * - %c: CSS (ignored in this implementation)
 *
 * @param formatString - Format string with placeholders
 * @param args - Arguments to substitute into placeholders
 * @returns Formatted string
 */
export function formatConsoleMessage(
  formatString: any,
  ...args: any[]
): string {
  // If first argument is not a string, just join all arguments
  if (typeof formatString !== "string") {
    if (args.length === 0) {
      return valueToString(formatString);
    }
    return [formatString, ...args].reduce(
      (acc, val) => (acc ? acc + " " : "") + valueToString(val),
      ""
    );
  }

  let argIndex = 0;

  // Replace format specifiers
  const formatted = formatString.replace(
    /%([sidfoOc])/g,
    (match: string, type: ConsoleFormatType) => {
      if (argIndex >= args.length) {
        return match; // No more arguments, keep the placeholder
      }

      const arg = args[argIndex++];

      switch (type) {
        case "s":
          return String(arg);
        case "i":
        case "d":
          return parseInt(arg).toString();
        case "f":
          return parseFloat(arg).toString();
        case "o":
        case "O":
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        default:
          return match;
      }
    }
  );

  // Handle remaining arguments
  const remainingArgs = args.slice(argIndex);

  if (remainingArgs.length > 0) {
    const remaining = remainingArgs
      .map((arg) => {
        if (typeof arg === "object") {
          try {
            // Special handling for error objects
            if (arg !== null && "message" in arg) {
              return arg.message;
            }
            return JSON.stringify(arg);
          } catch (e) {
            // Ignore stringify errors
          }
        }
        return String(arg);
      })
      .join(" ");

    return `${formatted} ${remaining}`;
  }

  return formatted;
}

export default formatConsoleMessage;
