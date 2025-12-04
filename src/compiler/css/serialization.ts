/**
 * CSS Value Serialization System
 * Source: module_448763_wo_first_layer.js (LOC 3629-3906)
 *
 * Converts CSS AST tokens back to CSS strings. Handles all modern CSS features
 * including color spaces, dimensions, functions, and custom properties.
 */

/**
 * CSS Token Types (from LightningCSS AST)
 *
 * Complete token types matching v0's implementation (LOC 3629-3906)
 */
export type CSSToken =
  // Color values
  | { type: "color"; value: ColorValue }
  | { type: "unresolved-color"; value: any }

  // Numeric values
  | { type: "number"; value: number }
  | { type: "percentage"; value: number }
  | { type: "dimension"; value: DimensionValue }
  | { type: "length"; value: { value: number; unit: string } }
  | { type: "angle"; value: { value: number; type: string } }
  | { type: "time"; value: { value: number; type: "milliseconds" | "seconds" } }
  | { type: "resolution"; value: { value: number; type: string } }

  // String-like values
  | { type: "string"; value: string }
  | { type: "ident"; value: string }
  | { type: "dashed-ident"; value: string }
  | { type: "at-keyword"; value: string }
  | { type: "hash"; value: string }
  | { type: "id-hash"; value: string }
  | { type: "keyword"; value: string }
  | {
      type: "animation-name";
      value: string | { type: "ident"; value: string } | "none";
    }

  // URL values
  | { type: "url"; value: string }
  | { type: "unquoted-url"; value: string }
  | { type: "bad-url"; value: string }
  | { type: "bad-string"; value: string }

  // Functions
  | { type: "function"; name: string; args: CSSToken[] }
  | { type: "var"; name: string; fallback?: CSSToken[] }
  | { type: "env"; name: string; fallback?: CSSToken[] }

  // Delimiters and punctuation
  | { type: "delim"; value: string }
  | { type: "comma" }
  | { type: "colon" }
  | { type: "semicolon" }
  | { type: "white-space"; value: string }
  | { type: "comment"; value: string }

  // HTML comment delimiters
  | { type: "cdc" } // -->
  | { type: "cdo" } // <!--

  // Attribute selectors
  | { type: "include-match" } // ~=
  | { type: "dash-match" } // |=
  | { type: "prefix-match" } // ^=
  | { type: "suffix-match" } // $=
  | { type: "substring-match" } // *=

  // Block tokens
  | { type: "parenthesis-block"; value: CSSToken[] }
  | { type: "square-bracket-block"; value: CSSToken[] }
  | { type: "curly-bracket-block"; value: CSSToken[] }
  | { type: "close-parenthesis" }
  | { type: "close-square-bracket" }
  | { type: "close-curly-bracket" }

  // Wrapper for token arrays
  | { type: "token"; value: CSSToken };

export type ColorValue =
  | { space: "currentcolor" }
  | { space: "rgb" | "rgba"; r: number; g: number; b: number; a?: number }
  | { space: "hsl" | "hsla"; h: number; s: number; l: number; a?: number }
  | { space: "hwb"; h: number; w: number; b: number; a?: number }
  | { space: "lab"; l: number; a: number; b: number; alpha?: number }
  | { space: "lch"; l: number; c: number; h: number; alpha?: number }
  | { space: "oklab"; l: number; a: number; b: number; alpha?: number }
  | { space: "oklch"; l: number; c: number; h: number; alpha?: number }
  | {
      space:
        | "srgb"
        | "srgb-linear"
        | "display-p3"
        | "a98-rgb"
        | "prophoto-rgb"
        | "rec2020";
      r: number;
      g: number;
      b: number;
      alpha?: number;
    }
  | {
      space: "xyz-d50" | "xyz-d65";
      x: number;
      y: number;
      z: number;
      alpha?: number;
    }
  | { space: "light-dark"; light: ColorValue; dark: ColorValue }
  | { space: "hex"; value: string };

export type DimensionValue = {
  value: number;
  unit:
    | "px"
    | "em"
    | "rem"
    | "%"
    | "vh"
    | "vw"
    | "vmin"
    | "vmax"
    | "ch"
    | "ex"
    | "cm"
    | "mm"
    | "in"
    | "pt"
    | "pc"
    | "deg"
    | "rad"
    | "grad"
    | "turn"
    | "s"
    | "ms"
    | "fr"
    | string;
};

/**
 * Format a number with precision control and repeating digit detection
 *
 * Detects repeating patterns like 0.333333 → 0.33 or 0.999999 → 1
 * Strips trailing zeros: 1.5000 → 1.5
 */
export function formatNumber(value: number): string {
  // Handle special cases
  if (value === 0) return "0";
  if (!isFinite(value)) return String(value);
  if (Number.isInteger(value)) return String(value);

  const str = value.toString();
  const [integer, decimal] = str.split(".");

  if (!decimal) return integer;

  // Detect repeating 9s (round up)
  if (/^9{6,}/.test(decimal)) {
    const rounded = Math.round(value);
    return String(rounded);
  }

  // Detect repeating digits (e.g., 333333 or 666666)
  const match = decimal.match(/^(\d)\1{5,}/);
  if (match) {
    // Keep only 2 instances of the repeating digit
    return `${integer}.${match[1]}${match[1]}`;
  }

  // Strip trailing zeros
  const trimmed = decimal.replace(/0+$/, "");
  if (trimmed === "") return integer;

  // Limit to reasonable precision (6 decimal places)
  const limited = parseFloat(`${integer}.${trimmed}`).toFixed(6);
  return limited.replace(/\.?0+$/, "");
}

/**
 * Serialize a color value to CSS string
 */
export function serializeColor(color: ColorValue): string {
  switch (color.space) {
    case "currentcolor":
      return "currentColor";

    case "hex":
      return color.value;

    case "rgb":
    case "rgba": {
      const { r, g, b, a } = color;
      if (a !== undefined && a !== 1) {
        return `rgba(${formatNumber(r)}, ${formatNumber(g)}, ${formatNumber(
          b
        )}, ${formatNumber(a)})`;
      }
      return `rgb(${formatNumber(r)}, ${formatNumber(g)}, ${formatNumber(b)})`;
    }

    case "hsl":
    case "hsla": {
      const { h, s, l, a } = color;
      if (a !== undefined && a !== 1) {
        return `hsla(${formatNumber(h)}, ${formatNumber(s)}%, ${formatNumber(
          l
        )}%, ${formatNumber(a)})`;
      }
      return `hsl(${formatNumber(h)}, ${formatNumber(s)}%, ${formatNumber(
        l
      )}%)`;
    }

    case "hwb": {
      const { h, w, b, a } = color;
      const alpha = a !== undefined && a !== 1 ? ` / ${formatNumber(a)}` : "";
      return `hwb(${formatNumber(h)} ${formatNumber(w)}% ${formatNumber(
        b
      )}%${alpha})`;
    }

    case "lab": {
      const { l, a, b, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `lab(${formatNumber(l)}% ${formatNumber(a)} ${formatNumber(
        b
      )}${alphaStr})`;
    }

    case "lch": {
      const { l, c, h, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `lch(${formatNumber(l)}% ${formatNumber(c)} ${formatNumber(
        h
      )}${alphaStr})`;
    }

    case "oklab": {
      const { l, a, b, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `oklab(${formatNumber(l)} ${formatNumber(a)} ${formatNumber(
        b
      )}${alphaStr})`;
    }

    case "oklch": {
      const { l, c, h, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `oklch(${formatNumber(l)} ${formatNumber(c)} ${formatNumber(
        h
      )}${alphaStr})`;
    }

    case "srgb":
    case "srgb-linear":
    case "display-p3":
    case "a98-rgb":
    case "prophoto-rgb":
    case "rec2020": {
      const { r, g, b, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `color(${color.space} ${formatNumber(r)} ${formatNumber(
        g
      )} ${formatNumber(b)}${alphaStr})`;
    }

    case "xyz-d50":
    case "xyz-d65": {
      const { x, y, z, alpha } = color;
      const alphaStr =
        alpha !== undefined && alpha !== 1 ? ` / ${formatNumber(alpha)}` : "";
      return `color(${color.space} ${formatNumber(x)} ${formatNumber(
        y
      )} ${formatNumber(z)}${alphaStr})`;
    }

    case "light-dark": {
      const { light, dark } = color;
      return `light-dark(${serializeColor(light)}, ${serializeColor(dark)})`;
    }

    default:
      return "transparent";
  }
}

/**
 * Serialize a dimension value to CSS string
 */
export function serializeDimension(dimension: DimensionValue): string {
  const { value, unit } = dimension;

  // Special case: 0 doesn't need a unit (except for time and angles)
  if (
    value === 0 &&
    !["s", "ms", "deg", "rad", "grad", "turn"].includes(unit)
  ) {
    return "0";
  }

  return `${formatNumber(value)}${unit}`;
}

/**
 * Serialize a CSS function
 */
export function serializeFunction(name: string, args: CSSToken[]): string {
  const serializedArgs = args.map((arg) => serializeCSSValue(arg)).join(", ");
  return `${name}(${serializedArgs})`;
}

/**
 * Main CSS value serializer
 *
 * Converts any CSS token back to a valid CSS string
 */
export function serializeCSSValue(token: CSSToken): string {
  switch (token.type) {
    case "color":
      return serializeColor(token.value);

    case "dimension":
      return serializeDimension(token.value);

    case "number":
      return formatNumber(token.value);

    case "percentage":
      return `${formatNumber(token.value)}%`;

    case "function":
      return serializeFunction(token.name, token.args);

    case "url":
      return `url(${token.value})`;

    case "string":
      return `"${token.value.replace(/"/g, '\\"')}"`;

    case "ident":
      return token.value;

    case "var": {
      const fallback = token.fallback
        ? `, ${serializeCSSValues(token.fallback)}`
        : "";
      return `var(${token.name}${fallback})`;
    }

    case "env": {
      const fallback = token.fallback
        ? `, ${serializeCSSValues(token.fallback)}`
        : "";
      return `env(${token.name}${fallback})`;
    }

    case "keyword":
      return token.value;

    // String-like tokens
    case "at-keyword":
    case "bad-string":
    case "bad-url":
    case "hash":
    case "id-hash":
    case "unquoted-url":
    case "white-space":
    case "comment":
    case "delim":
    case "dashed-ident":
      return token.value;

    // Punctuation
    case "comma":
      return ",";
    case "colon":
      return ":";
    case "semicolon":
      return ";";

    // HTML comment delimiters
    case "cdc":
      return "-->";
    case "cdo":
      return "<!--";

    // Attribute selectors
    case "include-match":
      return "~=";
    case "dash-match":
      return "|=";
    case "prefix-match":
      return "^=";
    case "suffix-match":
      return "$=";
    case "substring-match":
      return "*=";

    // Block tokens
    case "parenthesis-block":
      return `(${serializeCSSValues(token.value)})`;
    case "square-bracket-block":
      return `[${serializeCSSValues(token.value)}]`;
    case "curly-bracket-block":
      return `{${serializeCSSValues(token.value)}}`;
    case "close-parenthesis":
      return ")";
    case "close-square-bracket":
      return "]";
    case "close-curly-bracket":
      return "}";

    // Length, angle, time, resolution
    case "length":
      return `${formatNumber(token.value.value)}${token.value.unit}`;
    case "angle":
      return `${formatNumber(token.value.value)}${token.value.type}`;
    case "time": {
      const unit = token.value.type === "milliseconds" ? "ms" : "s";
      return `${formatNumber(token.value.value)}${unit}`;
    }
    case "resolution":
      return `${formatNumber(token.value.value)}${token.value.type}`;

    // Animation name
    case "animation-name":
      if (typeof token.value === "string") {
        return token.value;
      }
      if (typeof token.value === "object" && token.value.type === "ident") {
        return token.value.value;
      }
      return "none";

    // Unresolved color (fallback)
    case "unresolved-color":
      return `unresolved-color(${JSON.stringify(token.value)})`;

    // Token wrapper
    case "token":
      return serializeCSSValue(token.value);

    default:
      return "";
  }
}

/**
 * Serialize multiple CSS values (for properties with multiple values)
 */
export function serializeCSSValues(tokens: CSSToken[]): string {
  return tokens.map(serializeCSSValue).join(" ");
}

/**
 * Serialize a CSS declaration
 */
export function serializeCSSDeclaration(
  property: string,
  value: CSSToken | CSSToken[]
): string {
  const valueStr = Array.isArray(value)
    ? serializeCSSValues(value)
    : serializeCSSValue(value);
  return `${property}: ${valueStr}`;
}
