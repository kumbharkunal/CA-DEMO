import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Props = {
  open: boolean;
  onToggle(): void;
  /** Same for menu-open and menu-close — the icon communicates state. */
  label: string;
};

/**
 * Two-line icon (the bar holds only two ideas: logo and action). On
 * open, both lines converge to a dead-center × over 250ms, then hold.
 */
export function Hamburger({ open, onToggle, label }: Props) {
  const transition = { duration: 0.25, ease: easeOut };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* Top line */}
        <motion.span
          className="absolute left-0 top-[4px] block h-[2px] w-full rounded-full bg-text-primary"
          initial={false}
          animate={open ? { top: 8, rotate: 45, transition } : { top: 4, rotate: 0, transition }}
        />
        {/* Bottom line */}
        <motion.span
          className="absolute left-0 top-[12px] block h-[2px] w-full rounded-full bg-text-primary"
          initial={false}
          animate={
            open
              ? { top: 8, rotate: -45, transition }
              : { top: 12, rotate: 0, transition }
          }
        />
      </span>
    </button>
  );
}
