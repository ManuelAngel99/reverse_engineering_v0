/**
 * Slottable Component Wrapper
 * Source: 3a384aa7a60f1de8.js (Module 566420, lines 4-21)
 *
 * Wraps Radix UI's Slottable to filter out __v0 metadata props
 * before they reach the DOM.
 */

import React from "react";
import { Slottable as RadixSlottable } from "@radix-ui/react-slot";

interface SlottableProps {
  children: React.ReactElement;
  [key: string]: any;
}

/**
 * Wrapper around Radix Slottable that filters v0 metadata props
 */
export function Slottable({ children, ...props }: SlottableProps) {
  // Check if any props don't start with __v0 (non-metadata props exist)
  const hasRealProps = Object.keys(props).some((key) => !key.startsWith("__v0"));

  if (hasRealProps) {
    // Clone element with props if we have real props
    return (
      <RadixSlottable {...props}>
        {React.cloneElement(children, props)}
      </RadixSlottable>
    );
  }

  // Just pass through if only metadata props
  return <RadixSlottable {...props}>{children}</RadixSlottable>;
}

// Mark as Slottable for Radix
(Slottable as any).__v0_slottable = true;
Slottable.displayName = "Slottable";

