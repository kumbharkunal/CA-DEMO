import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useBooking } from "@/components/forms/booking-context";
import { useScrollPast } from "@/hooks/useScrollPast";
import { duration, easeOut } from "@/lib/motion";

/**
 * The floating action cluster — back-to-top above a "talk to us" contact
 * action, bottom-right, above all page chrome but inside the safe-area. Both
 * appear only after the first screen (trust first, convenience second) and
 * fade under reduced motion. Reachable, never oversized, never overlapping.
 */
export function FloatingActions() {
  const visible = useScrollPast(400);
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
        initial: { opacity: 0, y: 10, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.9 },
        transition: { duration: duration.base, ease: easeOut },
      };

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-sticky flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {/* Back to top — quiet, yields the floor to the primary contact action */}
      <AnimatePresence>
        {visible && (
          <motion.button
            key="to-top"
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            title="Back to top"
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-border-default bg-surface text-text-secondary shadow-e2 outline-none transition-[color,border-color,box-shadow,transform] duration-150 ease-standard hover:-translate-y-0.5 hover:border-border-strong hover:text-text-primary hover:shadow-e3 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 active:translate-y-0"
            {...motionProps}
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact — opens the consultation dialog, the firm's front door */}
      <AnimatePresence>
        {visible && (
          <motion.button
            key="contact"
            type="button"
            onClick={openBooking}
            aria-label="Request a consultation"
            title="Request a consultation"
            className="group pointer-events-auto relative flex size-12 items-center justify-center rounded-full bg-brand-brass text-text-inverse shadow-e2 outline-none transition-[background-color,box-shadow,transform] duration-200 ease-standard hover:-translate-y-0.5 hover:bg-brand-brass-hover hover:shadow-e3 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.97]"
            {...motionProps}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {/* Tooltip — a whisper on hover, never in the way */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border-default bg-surface px-2.5 py-1.5 text-caption font-medium text-text-primary opacity-0 shadow-e2 transition-opacity duration-150 ease-standard group-hover:opacity-100"
            >
              Request a consultation
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
