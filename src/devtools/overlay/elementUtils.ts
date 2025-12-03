/**
 * Element Utility Functions
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 554-567)
 *
 * Helper functions for element measurements and bounds
 */

interface ElementBounds {
  bounds: DOMRect;
  margin: [number, number, number, number];
  padding: [number, number, number, number];
}

/**
 * Gets the bounding box and computed padding for an element
 */
export function getElementBounds(
  element: HTMLElement | SVGElement
): ElementBounds {
  const computedStyle = window.getComputedStyle(element);

  const padding: [number, number, number, number] = [
    parseFloat(computedStyle.paddingTop),
    parseFloat(computedStyle.paddingRight),
    parseFloat(computedStyle.paddingBottom),
    parseFloat(computedStyle.paddingLeft),
  ];

  return {
    bounds: element.getBoundingClientRect(),
    margin: [0, 0, 0, 0], // Margin not currently tracked
    padding,
  };
}
