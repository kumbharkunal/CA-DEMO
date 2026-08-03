import { useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { useScrollState } from "@/hooks/useLenis";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fraunces wordmark only — never a generic icon. Clear space = its own
 * cap-height. Hover: opacity 1→0.8 over 150ms. On the homepage it
 * returns to the top (smoothly; instantly for reduced-motion users);
 * elsewhere it routes home.
 */
export function BrandLogo({ mobile }: { mobile?: boolean }) {
  const { pathname } = useLocation();
  const { scrollY } = useScrollState();
  const reducedMotion = useReducedMotion();
  const onHome = pathname === "/";

  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name} — home`}
      onClick={(e) => {
        if (onHome && scrollY > 0) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        }
      }}
      className={cn(
        "shrink-0 rounded-sm font-display tracking-[-0.01em] text-text-primary outline-none transition-opacity duration-150 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        mobile ? "text-[1.625rem]" : "text-[1.375rem] lg:text-2xl",
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
