import { useLayoutEffect } from "react";

/**
 * Locks body scroll while `locked` is true (mobile menu, dialogs).
 * Restores the previous overflow on release and on unmount.
 * Uses direct overflow (not Lenis' class) so it is safe before the
 * Lenis runtime initializes.
 */
export function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
