import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext, LenisScrollContext } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Smooth scrolling, user-owned. The scrollbar always belongs to the
 * visitor (locked Motion Principle): no easing curve distortions, no
 * scroll-jacking — Lenis only smooths wheel/trackpad input, and is
 * disabled entirely for reduced-motion users.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scroll, setScroll] = useState({ scrollY: 0, isScrolling: false });

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      // 1 = native pacing. Luxury here is smoothness, not heaviness.
      lerp: 0.12,
      smoothWheel: true,
    });
    setLenis(lenis);

    const onScroll = ({ scroll: scrollY, isScrolling }: Lenis) => {
      setScroll({ scrollY, isScrolling: isScrolling !== false });
    };
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setScroll({ scrollY: window.scrollY, isScrolling: false }));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      };
    }
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      <LenisScrollContext.Provider value={scroll}>{children}</LenisScrollContext.Provider>
    </LenisContext.Provider>
  );
}
