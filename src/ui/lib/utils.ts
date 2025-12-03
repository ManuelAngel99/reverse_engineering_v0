/**
 * Utility Functions
 * 
 * Standard shadcn/ui utilities for class name merging and variants.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution
 * 
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts.
 * 
 * @example
 * cn("px-2 py-1", "px-4") // => "py-1 px-4" (px-4 wins)
 * cn("px-2 py-1", condition && "bg-red-500") // => "px-2 py-1 bg-red-500" (if condition is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
