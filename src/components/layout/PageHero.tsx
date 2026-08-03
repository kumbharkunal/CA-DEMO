import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { duration, easeOut } from "@/lib/motion";

/**
 * The one editorial page opener used by every sub-page: brass eyebrow,
 * display headline, lede. Renders `breadcrumb` (any React node — typically
 * the Breadcrumbs component) above the eyebrow when provided.
 */
export function PageHero({
  eyebrow,
  heading,
  lede,
  breadcrumb,
}: {
  eyebrow: string;
  heading: string;
  lede?: string;
  breadcrumb?: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const item = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 as const, y: 14 as const },
          animate: { opacity: 1 as const, y: 0 as const },
          transition: { duration: duration.entrance, ease: easeOut, delay },
        };

  return (
    <div className="container-site pt-12 sm:pt-16">
      <motion.div {...item(0)}>
        {breadcrumb}
      </motion.div>
      <motion.p {...item(0.05)} className="text-eyebrow text-brand-brass-text">
        {eyebrow}
      </motion.p>
      <motion.h1
        {...item(0.1)}
        className="mt-4 max-w-[26ch] font-display text-h1 text-text-primary"
      >
        {heading}
      </motion.h1>
      {lede && (
        <motion.p
          {...item(0.16)}
          className="mt-6 max-w-[64ch] text-body-l leading-relaxed text-text-secondary"
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
