import { motion, useReducedMotion, type Variants } from "framer-motion";
import { duration, easeOut } from "@/lib/motion";

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease: easeOut },
  },
};

/**
 * The one editorial section opener used across the site: brass eyebrow,
 * display heading, supporting lede. `id` should match the wrapping
 * section's `aria-labelledby`. Presentational only; the parent section
 * owns the whileInView trigger by passing these variants down.
 */
export function SectionHeader({
  id,
  eyebrow,
  heading,
  subheadline,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  subheadline?: string;
}) {
  const reducedMotion = useReducedMotion();
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  return (
    <>
      <motion.p {...itemProps} className="text-eyebrow text-brand-brass-text">
        {eyebrow}
      </motion.p>
      <motion.h2
        {...itemProps}
        id={id}
        className="mt-4 font-display text-h2 text-text-primary"
      >
        {heading}
      </motion.h2>
      {subheadline && (
        <motion.p
          {...itemProps}
          className="mt-5 max-w-[52ch] text-body-l text-text-secondary"
        >
          {subheadline}
        </motion.p>
      )}
    </>
  );
}

export { headerVariants as sectionHeaderVariants };
