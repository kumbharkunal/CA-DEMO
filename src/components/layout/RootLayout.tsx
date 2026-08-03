import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { StickyCta } from "@/components/layout/StickyCta";
import { pageTransition } from "@/lib/motion";

/**
 * App shell: skip-link → fixed header → main landmark → footer.
 * Owns document title management and, on route change, returns the
 * viewport to the top (Lenis-aware) and moves focus into the page.
 */
export function RootLayout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  // Reduced-motion users get the page swap with no fade at all — the
  // transition is the only thing removed; landmarks and focus are identical.
  const pageProps = reducedMotion ? {} : pageTransition;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-text-primary antialiased">
      <SkipLink />
      <SiteHeader />
      <main id="main" className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pathname} className="flex flex-1 flex-col" {...pageProps}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <FloatingActions />
      <StickyCta />
      <ScrollRestoration />
    </div>
  );
}
