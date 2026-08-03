import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/layout/navbar/BrandLogo";
import { ConsultButton } from "@/components/layout/navbar/ConsultButton";
import { Hamburger } from "@/components/layout/navbar/Hamburger";
import { MobileDrawer } from "@/components/layout/navbar/MobileDrawer";
import { NavDropdown } from "@/components/layout/navbar/NavDropdown";
import { NavLinkItem } from "@/components/layout/navbar/NavLinkItem";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useScrollState } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isNavGroup, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

const GLASS_THRESHOLD = 24; // scroll px before glass + condense engage
const HIDE_THRESHOLD = 160; // navbar never hides inside the hero's welcome zone
const INTENT_DELTA = 4; // minimal upward intent that recalls the navbar

/**
 * The Navbar (locked spec). Three acts while scrolling, then full life:
 *   Act I  (0–24px)   — transparent, 72px, belongs to the hero
 *   Act II (>24px)    — glass + E3, condenses 72→64 (GLASS_THRESHOLD)
 *   Act III (↓>160px) — hides on descent; any upward intent (≥INTENT_DELTA)
 *                       recalls it instantly; hides again when a footer
 *                       CTA owns the viewport (Constitution #2)
 * Mobile/tablet: bar + hamburger; drawer is "The Ink Panel".
 */
export function SiteHeader() {
  const { pathname } = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const hasHero = pathname === "/"; // transparent-over-gradient only where a hero exists
  const { scrollY, isScrolling } = useScrollState();

  const [glass, setGlass] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [footerHasFocus, setFooterHasFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  // Act II/III state machine — driven by the shared scroll feed,
  // honoring upward intent (even 4px returns the navbar)
  useEffect(() => {
    setGlass(scrollY > GLASS_THRESHOLD);
    if (footerHasFocus) return;

    if (scrollY <= HIDE_THRESHOLD) {
      setHidden(false);
    } else if (isScrolling) {
      const goingDown = scrollY > lastScrollY.current;
      const upwardIntent = lastScrollY.current - scrollY >= INTENT_DELTA;
      if (goingDown) setHidden(true);
      else if (upwardIntent) setHidden(false);
    }
    lastScrollY.current = scrollY;
  }, [scrollY, isScrolling, footerHasFocus]);

  // Never compete with the footer CTA for brass attention
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterHasFocus(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Return focus to the hamburger only when the drawer trapped it
  // (closes via Esc / backdrop / overlay-unmount remove it from the DOM)
  useEffect(() => {
    if (!menuOpen && menuButtonRef.current) {
      const button = menuButtonRef.current.querySelector("button");
      if (document.activeElement && !document.body.contains(document.activeElement)) {
        button?.focus();
      }
    }
  }, [menuOpen]);

  const onHero = hasHero && !glass && !menuOpen; // transparent, over gradient

  return (
    <>
      {/* The ghost edge — the nav steps back but never leaves the room */}
      {hidden && !footerHasFocus && <span className="ghost-edge z-sticky" aria-hidden="true" />}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-sticky transition-transform duration-300 ease-out",
          (hidden || footerHasFocus) && !menuOpen && "-translate-y-full",
        )}
        style={{
          // Gate the compositing hint so the header only holds a layer while
          // it's actually sliding — a permanent will-change burns memory 24/7.
          transform: (hidden || footerHasFocus) && !menuOpen ? undefined : "translateY(0)",
          willChange: hidden || footerHasFocus ? "transform" : undefined,
        }}
      >
        {/* Glass material — appears only after scroll, blur fixed at 12px */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-all duration-250 ease-standard",
            glass
              ? cn(
                  "border-b border-border-default shadow-e3",
                  onHero
                    ? "bg-brand-ink/80 backdrop-blur-md"
                    : "bg-background/72 backdrop-blur-[12px]",
                )
              : "border-b border-transparent",
            menuOpen && "border-transparent bg-transparent shadow-none backdrop-blur-0",
          )}
        />

        <Container
          data-condensed={glass ? "" : undefined}
          className="group relative flex items-center justify-between transition-[height] duration-250 ease-standard"
          style={{ height: glass ? 64 : 72 }}
        >
          {/* Logo — Fraunces wordmark, clear space, always routes home */}
          <div className="flex items-center gap-4">
            <BrandLogo />
            <span
              className={cn(
                "hidden font-sans text-caption tracking-[0.02em] lg:inline",
                onHero ? "text-text-inverse-muted" : "text-text-muted",
              )}
            >
              Chartered Accountants
            </span>
          </div>

          {/* Desktop menu — five items, never more. gap-4/mx-4 keep the cluster
              breathing at 800px without ever crowding the CTA. */}
          <nav aria-label="Primary" className="hidden min-w-0 items-center min-[800px]:flex">
            <NavigationMenu delayDuration={80} skipDelayDuration={200}>
              <NavigationMenuList className="gap-4 xl:gap-6">
                {primaryNav.map((item) =>
                  isNavGroup(item) ? (
                    <NavDropdown key={item.label} group={item} reducedMotion={reducedMotion} />
                  ) : (
                    <NavLinkItem key={item.label} label={item.label} href={item.href} />
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-4 flex items-center gap-3 xl:ml-6 xl:gap-4">
              <HeaderSearchLink onHero={onHero} />
              <ConsultButton
                compact={false}
                className={cn(onHero && "[&_button]:text-text-inverse [&_button]:hover:bg-white/10")}
              />
            </div>
          </nav>

          {/* Mobile / tablet cluster — CTA always present, then the icon */}
          <div className="flex items-center gap-3 min-[800px]:hidden">
            <ConsultButton
              compact
              className={cn(onHero && "[&_button]:text-text-inverse [&_button]:hover:bg-white/10")}
            />
            <div
              ref={menuButtonRef}
              className={cn(onHero && "[&_button]:text-text-inverse [&_span]:!bg-text-inverse")}
            >
              <Hamburger
                open={menuOpen}
                onToggle={() => setMenuOpen((v) => !v)}
                label={menuOpen ? "Close menu" : "Open menu"}
              />
            </div>
          </div>
        </Container>

        {/* The Ink Panel */}
        <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>

      {/* Spacer so non-hero pages clear the fixed bar */}
      {!hasHero && <div aria-hidden="true" style={{ height: 72 }} />}
    </>
  );
}

/**
 * Quiet search affordance in the desktop cluster — a 44px icon target that
 * routes to the search surface. Icon-only by design: search is a utility,
 * not a CTA, so it borrows the header's text/chrome instead of a border.
 */
function HeaderSearchLink({ onHero }: { onHero: boolean }) {
  return (
    <Link
      to="/search"
      aria-label="Search the site"
      className={cn(
        "flex size-11 items-center justify-center rounded-md outline-none transition-colors duration-150 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        onHero ? "text-text-inverse hover:bg-white/10" : "text-text-secondary hover:text-text-primary hover:bg-hover-bg",
        onHero && "focus-visible:ring-offset-brand-ink",
      )}
    >
      <Search className="size-[18px]" aria-hidden="true" />
    </Link>
  );
}
