import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { Link, useLocation } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useBooking } from "@/components/forms/booking-context";
import { duration, easeOut } from "@/lib/motion";
import {
  ctaLabel,
  isNavGroup,
  primaryNav,
  siteConfig,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose(): void;
};

/**
 * The mobile menu — "The Ink Panel" (locked Navbar spec): full-canvas
 * brand-ink panel, a dark reading room, links in Fraunces with a 40ms
 * stagger, brass CTA pinned at thumb position, sub-menus expand inline.
 * Body scroll locks while open; focus is restored to its opener on close.
 */
export function MobileDrawer({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeIntent = useRef<number | null>(null);
  const { openBooking } = useBooking();

  useLockBodyScroll(open);

  // Close on route change (a link tap commits, then the panel recedes)
  useEffect(() => {
    if (open) onClose();
    setExpanded(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Swipe-right ≥ 40px closes (edge gesture, locked spec)
  function onTouchStart(e: TouchEvent<HTMLElement>) {
    closeIntent.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: TouchEvent<HTMLElement>) {
    if (closeIntent.current === null) return;
    const delta = e.changedTouches[0].clientX - closeIntent.current;
    closeIntent.current = null;
    if (delta > 40) onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && (
          <DialogContent
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={cn(
              "fixed inset-0 z-modal m-0 h-dvh w-full max-w-none p-0",
              "border-0 bg-brand-ink text-text-inverse outline-none",
              "flex flex-col",
            )}
            style={{ borderRadius: 0 }}
          >
            <motion.div
              className="flex h-full flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reducedMotion ? { duration: 0 } : { duration: duration.page, ease: easeOut }
              }
            >
              {/* Screen-reader scaffolding for the dialog */}
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">
                Primary navigation and contact details.
              </DialogDescription>

              {/* Links — Fraunces, large enough to read across a room */}
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-16">
                <ul className="m-0 list-none p-0">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reducedMotion ? 0 : 0.15 + i * 0.04,
                        duration: reducedMotion ? duration.micro : duration.entrance,
                        ease: easeOut,
                      }}
                      className="border-b border-white/10"
                    >
                      {isNavGroup(item) ? (
                        <div>
                          <button
                            type="button"
                            aria-expanded={expanded === item.label}
                            onClick={() =>
                              setExpanded((prev) => (prev === item.label ? null : item.label))
                            }
                            className="flex w-full items-center justify-between py-4 text-left font-display text-[clamp(1.625rem,4vw+0.5rem,2rem)] leading-tight text-text-inverse outline-none focus-visible:text-brand-brass"
                          >
                            {item.label}
                            <motion.span
                              animate={{ rotate: expanded === item.label ? 90 : 0 }}
                              transition={{ duration: duration.standard, ease: easeOut }}
                            >
                              <ChevronRight className="size-5" aria-hidden="true" />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded === item.label && (
                              <motion.ul
                                className="m-0 list-none overflow-hidden p-0"
                                initial={{ height: reducedMotion ? "auto" : 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                transition={{ duration: reducedMotion ? duration.micro : duration.base, ease: easeOut }}
                              >
                                {item.items.map((sub) => (
                                  <li key={sub.href}>
                                    <Link
                                      to={sub.href}
                                      className={cn(
                                        "block py-3 pl-4 text-body-l text-text-inverse-muted outline-none",
                                        "transition-colors duration-150 hover:text-text-inverse",
                                        "focus-visible:text-text-inverse",
                                      )}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    to={item.href}
                                    className="block py-3 pl-4 text-body-s font-medium text-brand-brass-text outline-none focus-visible:underline"
                                  >
                                    All {item.label.toLowerCase()} →
                                  </Link>
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="block py-4 font-display text-[clamp(1.625rem,4vw+0.5rem,2rem)] leading-tight text-text-inverse outline-none transition-colors focus-visible:text-brand-brass"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.15 + primaryNav.length * 0.04,
                      duration: reducedMotion ? duration.micro : duration.entrance,
                      ease: easeOut,
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      to="/search"
                      aria-current={pathname === "/search" ? "page" : undefined}
                      className="block py-4 font-display text-[clamp(1.625rem,4vw+0.5rem,2rem)] leading-tight text-text-inverse outline-none transition-colors focus-visible:text-brand-brass"
                    >
                      Search
                    </Link>
                  </motion.li>
                </ul>
              </nav>

              {/* Thumb zone — contact + the CTA, always reachable */}
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.35,
                  duration: reducedMotion ? duration.micro : duration.entrance,
                  ease: easeOut,
                }}
      className="border-t border-white/10 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4"
              >
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="block text-body-m text-text-inverse-muted outline-none transition-colors hover:text-text-inverse focus-visible:text-text-inverse"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-body-m text-text-inverse-muted outline-none transition-colors hover:text-text-inverse focus-visible:text-text-inverse"
                >
                  {siteConfig.email}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openBooking();
                  }}
                  className={cn(
                    "mt-4 flex h-[52px] w-full items-center justify-center rounded-md bg-brand-brass",
                    "text-button font-medium text-text-inverse outline-none",
                    "transition-colors duration-150 hover:bg-brand-brass-hover",
                    "focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink",
                  )}
                >
                  {ctaLabel}
                </button>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
