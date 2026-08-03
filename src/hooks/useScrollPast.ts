import { useEffect, useState } from "react";

/**
 * Whether the page has scrolled past `threshold` px — shared by the floating
 * actions, the sticky CTA, and any reveal-on-scroll chrome. Passive listener,
 * one boolean state, no per-pixel re-renders.
 */
export function useScrollPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
