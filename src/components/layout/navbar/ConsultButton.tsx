import { motion } from "framer-motion";
import { ctaLabel } from "@/lib/site";
import { useBooking } from "@/components/forms/booking-context";
import { cn } from "@/lib/utils";

type Props = {
  compact: boolean;
  className?: string;
};

/**
 * The navbar's sacred CTA — always visible, on every breakpoint and
 * scroll state. Opens the booking dialog in place; outline + brass border
 * by default (the hero's solid primary stays loudest). Hover warms to a
 * brass-tinted wash. Pressed: scale 0.98 over 100ms. No translate on hover.
 */
export function ConsultButton({ compact, className }: Props) {
  const { openBooking } = useBooking();
  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }} className={className}>
      <button
        type="button"
        onClick={openBooking}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-brand-brass text-button font-medium text-text-primary outline-none transition-[background-color,border-color] duration-150 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
          compact ? "h-10 px-4" : "h-11 px-5",
          "hover:border-brand-brass-hover hover:bg-brand-brass-subtle",
        )}
      >
        {/* Shortens only <375px — never truncates, it rewords (locked) */}
        <span className={compact ? "max-[374px]:hidden" : undefined}>{ctaLabel}</span>
        {compact && (
          <span aria-hidden="true" className="hidden max-[374px]:inline">
            Consult
          </span>
        )}
      </button>
    </motion.div>
  );
}
