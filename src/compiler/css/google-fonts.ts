/**
 * Google Fonts Loader
 * Source: module_219094 (0b72ca69c897003b.js)
 *
 * Handles dynamic loading of Google Fonts with support for:
 * - Variable axes (wght, ital, etc.)
 * - Display strategies (swap, etc.)
 * - Next.js font object generation
 */

export interface GoogleFontOptions {
  weight?: string | string[];
  style?: string | string[];
  display?: string;
  variable?: string;
  variableAxes?: string[];
}

export interface NextFont {
  className: string;
  style: {
    fontFamily: string;
  };
  variable?: string;
}

/**
 * Get Next.js Font object and inject Google Fonts
 * Matches v0's getNextFontGoogleMod (module 219094)
 *
 * @param fontName - Name of the font family
 * @returns Function that accepts options and returns NextFont object
 */
export function getNextFontGoogleMod(fontName: string) {
  // Clean font name (replace underscores with spaces)
  const family = fontName.replace(/_/g, " ");

  return (options?: GoogleFontOptions): NextFont => {
    const { weight, style, display = "swap", variable } = options || {};

    // Normalize style and weight to arrays
    const styles = style
      ? [...new Set(Array.isArray(style) ? style : [style])]
      : [];

    const weights = weight
      ? [...new Set(Array.isArray(weight) ? weight : [weight])]
      : ["100;200;300;400;500;600;700;800;900"];

    const hasItalic = styles.includes("italic");
    const hasNormal = styles.includes("normal");

    // Generate Google Fonts URL
    // Matches internal function `c` in module 219094
    const generateUrl = (
      font: string,
      axes: { wght?: string[]; ital?: string[]; variableAxes?: string[] },
      displayStr: string
    ) => {
      const axisParams: [string, string][] = [];

      if (axes.wght) {
        for (const w of axes.wght) {
          if (axes.ital) {
            for (const i of axes.ital) {
              axisParams.push(["ital", i], ["wght", w]);
              if (axes.variableAxes) {
                // Flatten variable axes if needed
                // In original code: ...(t.variableAxes ?? [])
              }
            }
          } else {
            axisParams.push(["wght", w]);
          }
        }
      }

      // Sort axes alphabetically
      // Matches original sorting logic: e.sort(([e], [t]) => ...)
      const sortedParams = axisParams.map((param) => {
        // This is a simplification of the complex sorting in original
        // The original sorts based on key char codes
        return param;
      });

      // Construct URL
      let url = `https://fonts.googleapis.com/css2?family=${font.replace(
        / /g,
        "+"
      )}`;

      // Use a simplified logic for axis construction matching the pattern:
      // :ital,wght@0,100;0,300;1,100...
      if (axisParams.length > 0) {
        // Group by axis names
        const axisNames = ["ital", "wght"]; // Hardcoded order from observation

        // Re-implementing the exact original logic:
        const tuples: any[] = [];
        if (axes.wght) {
          for (const w of axes.wght) {
            if (axes.ital) {
              for (const i of axes.ital) {
                tuples.push([
                  ["ital", i],
                  ["wght", w],
                ]);
              }
            } else {
              tuples.push([["wght", w]]);
            }
          }
        }

        if (tuples.length > 0) {
          // Sort tuple keys
          tuples.forEach((tuple) => {
            tuple.sort(([k1]: any, [k2]: any) => {
              const isLower1 = k1.charCodeAt(0) > 96;
              const isLower2 = k2.charCodeAt(0) > 96;
              if (isLower1 && !isLower2) return -1;
              if (isLower2 && !isLower1) return 1;
              return k1 > k2 ? 1 : -1;
            });
          });

          const axisKeys = tuples[0].map(([k]: any) => k).join(",");
          const axisValues = tuples
            .map((tuple) => tuple.map(([, v]: any) => v).join(","))
            .join(";");

          url = `${url}:${axisKeys}@${axisValues}`;
        }
      }

      return `${url}&display=${displayStr}`;
    };

    const url = generateUrl(
      family,
      {
        wght: weights,
        ital: hasItalic ? [...(hasNormal ? ["0"] : []), "1"] : undefined,
      },
      display
    );

    // Generate class name hash
    // Matches internal function `u` in module 219094
    const hash = btoa(family)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const className = `f_${hash}`;
    const variableName = `v_${hash}`;

    // Inject into DOM
    if (typeof document !== "undefined") {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const styleTag = document.createElement("style");
        styleTag.innerHTML = `.${className}{
            font-family: '${family}';
          }${variable ? `.${variableName}{${variable}:'${family}';}` : ""}`;
        document.head.appendChild(styleTag);
      }
    }

    return {
      className,
      style: { fontFamily: `'${family}'` },
      variable: variable ? variableName : undefined,
    };
  };
}
