import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Section, Container } from "@/components/layout/Container";
import { duration, easeOut, revealViewport } from "@/lib/motion";
import {
  industriesEyebrow,
  industriesHeading,
  industriesSubheadline,
  industries,
  type Industry,
} from "./industries";

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease: easeOut },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/**
 * Industries We Serve — the recognition section. Where Services answered
 * "what do you do?", this answers "do you get *my* business?". Six sector
 * tiles in a 2-2-2 / 3-2-1 cascade, each a stretched link, each with one
 * line of sector-specific fluency. A quiet band after the service wall.
 */
export function IndustriesSection() {
  const reducedMotion = useReducedMotion();

  const headerProps = reducedMotion
    ? {}
    : {
        variants: headerVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const itemProps = reducedMotion ? {} : { variants: itemVariants };
  const gridProps = reducedMotion
    ? {}
    : {
        variants: gridVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <Section
      aria-labelledby="industries-heading"
      className="border-t border-border-default bg-background"
    >
      <Container>
        {/* Section head — same editorial cadence as Services */}
        <motion.div {...headerProps} className="max-w-2xl">
          <motion.p {...itemProps} className="text-eyebrow text-brand-brass-text">
            {industriesEyebrow}
          </motion.p>
          <motion.h2
            {...itemProps}
            id="industries-heading"
            className="mt-4 font-display text-h2 text-text-primary"
          >
            {industriesHeading}
          </motion.h2>
          <motion.p
            {...itemProps}
            className="mt-5 max-w-[52ch] text-body-l text-text-secondary"
          >
            {industriesSubheadline}
          </motion.p>
        </motion.div>

        {/* Sector grid — 1 col mobile → 2 tablet → 3 desktop */}
        <motion.ul
          {...gridProps}
          className="mt-14 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.li key={industry.href} {...itemProps}>
              <IndustryCard industry={industry} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}

/**
 * One sector tile — quieter than a service card: no floating CTA row, just
 * a glyph, the sector, and one line of fluency. The arrow lives top-right,
 * appearing + moving on hover/focus. Whole tile is the link via ::after.
 */
function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <Link
      to={industry.href}
      className="group relative flex h-full flex-col rounded-xl border border-border-default bg-surface p-7 outline-none transition-[border-color,box-shadow] duration-150 ease-standard after:absolute after:inset-0 after:rounded-xl hover:border-border-strong hover:shadow-e2 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-lg border border-border-default bg-background text-brand-ink transition-colors duration-150 ease-standard group-hover:text-brand-brass"
      >
        <Icon className="size-5" strokeWidth={1.5} />
      </span>

      <span className="mt-6 font-display text-h4 text-text-primary">
        {industry.title}
      </span>
      <span className="mt-2.5 text-body-s leading-snug text-text-secondary">
        {industry.description}
      </span>

      {/* Quiet affordance — appears on intent, never rests visible */}
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-6 top-6 size-4 text-text-muted opacity-0 transition-[opacity,transform,color] duration-150 ease-standard group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:text-brand-brass group-hover:opacity-100 -translate-x-1 translate-y-1 motion-reduce:transition-none"
      />
    </Link>
  );
}
