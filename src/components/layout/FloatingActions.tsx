import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useScrollPast } from "@/hooks/useScrollPast";
import { duration, easeOut } from "@/lib/motion";

const WHATSAPP_URL =
  "https://wa.me/912248901200?text=" +
  encodeURIComponent(
    "Hello Sharma & Kapoor — I'd like to discuss an engagement. A good time to reach me is…",
  );

/**
 * The floating action cluster — scroll-to-top above WhatsApp, bottom-right,
 * above all page chrome but inside the safe-area. Both appear only after the
 * first screen (trust first, convenience second) and fade under reduced motion.
 * Sized 40/44px: reachable, never oversized, never overlapping.
 */
export function FloatingActions() {
  const visible = useScrollPast(400);
  const reducedMotion = useReducedMotion();

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
      {/* Back to top — quieter, smaller, yields the floor to WhatsApp */}
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

      {/* WhatsApp — the firm's fastest line, in its own brand glass */}
      <AnimatePresence>
        {visible && (
          <motion.a
            key="whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with the firm on WhatsApp — opens in a new tab"
            title="Chat on WhatsApp"
            className="group pointer-events-auto relative flex size-11 items-center justify-center rounded-full bg-whatsapp text-white shadow-e2 outline-none transition-[background-color,box-shadow,transform] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-e3 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.97]"
            {...motionProps}
          >
            <WhatsAppIcon className="size-[22px]" />
            {/* Tooltip — a whisper on hover, never in the way */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border-default bg-surface px-2.5 py-1.5 text-caption font-medium text-text-primary opacity-0 shadow-e2 transition-[opacity,transform] duration-150 ease-standard group-hover:-translate-x-0 group-hover:translate-x-0 group-hover:opacity-100"
            >
              Chat on WhatsApp
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
