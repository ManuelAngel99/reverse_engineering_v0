/**
 * React Hooks for DevTools
 * Source: 3a384aa7a60f1de8.js (Module 295224, lines 215-223)
 */

import { useRef, useEffect } from "react";

/**
 * Hook that returns a ref that always points to the latest value
 * Useful for avoiding stale closures in event handlers
 */
export function useLatest<T>(value: T): React.RefObject<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref as React.RefObject<T>;
}
