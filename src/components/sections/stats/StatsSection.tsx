import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { sectionItemVariants } from "@/components/ui/SectionHeader";
import { duration, easeOut, revealViewport } from "@/lib/motion";
import { stats, statsEyebrow, statsHeading } from "./stats";

const bandVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const figureVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease: easeOut },
  },
};

/**
 * Statistics — the ink band that changes the page's tempo. After two
 * light sections (Why, Process), a full-ink interlude carries the four
 * provable numbers. Tabular numerals, display type, no charts: the figures
 * themselves are the graphic.
 */
export function StatsSection() {
  const reducedMotion = useReducedMotion();
  const itemProps = reducedMotion ? {} : { variants: figureVariants };
  const bandProps = reducedMotion
    ? {}
    : {
        variants: bandVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <Section
      aria-labelledby="stats-heading"
      className="bg-brand-ink text-text-inverse"
    >
      <Container>
        <motion.div {...(reducedMotion ? {} : { variants: sectionItemVariants })} className="max-w-2xl">
          <p className="text-eyebrow text-brand-brass-text">{statsEyebrow}</p>
          <h2
            id="stats-heading"
            className="mt-4 font-display text-h2 text-text-inverse"
          >
            {statsHeading}
          </h2>
        </motion.div>

        <motion.dl
          {...bandProps}
          className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} {...itemProps}>
              <dd className="tnum font-display text-[2.75rem] leading-none text-brand-brass">
                {stat.value}
              </dd>
              <dt className="mt-3 font-sans text-body-m font-medium text-text-inverse">
                {stat.label}
              </dt>
              <p className="mt-1 text-body-s text-text-inverse/60">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </Section>
  );
}
