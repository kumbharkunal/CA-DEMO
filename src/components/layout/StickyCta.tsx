import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollPast } from "@/hooks/useScrollPast";
import { useBooking } from "@/components/forms/booking-context";
import { buttonVariants } from "@/components/ui/button";
import { duration, easeOut } from "@/lib/motion";
import { ctaLabel } from "@/lib/site";

/**
 * The mobile sticky CTA — a bottom bar holding the primary action beneath
 * the thumb on small screens. It appears once the hero is behind the
 * visitor (desktop keeps the navbar CTA instead), and it slips away with an
 * opacity-only fade under reduced motion. Hidden on ≥sm where the header
 * CTA already does the job.
 */
export function StickyCta() {
  const visible = useScrollPast(560);
  const reducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  const motionProps = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: duration.hover },
      }
    : {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: duration.base, ease: easeOut },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border-default bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
          {...motionProps}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <p className="text-body-s text-text-secondary">
              Talk to a partner — <span className="text-text-muted">free, 30 min</span>
            </p>
            <button
              type="button"
              onClick={openBooking}
              className={buttonVariants({ variant: "brass", size: "md" })}
            >
              {ctaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
