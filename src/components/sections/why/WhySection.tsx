import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
  sectionItemVariants,
} from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import { whyEyebrow, whyHeading, whySubheadline, valuePillars } from "./why";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/**
 * Why Choose Us — the values section. Three differentiators stated as
 * principles a client would repeat back, not claims. A quieter cadence than
 * the card grids: no boxes, just a hairline-topped three-column argument.
 */
export function WhySection() {
  const reducedMotion = useReducedMotion();

  const headerProps = reducedMotion
    ? {}
    : {
        variants: sectionHeaderVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };
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
      aria-labelledby="why-heading"
      className="border-t border-border-default bg-background"
    >
      <Container>
        <motion.div {...headerProps} className="max-w-2xl">
          <SectionHeader
            id="why-heading"
            eyebrow={whyEyebrow}
            heading={whyHeading}
            subheadline={whySubheadline}
          />
        </motion.div>

        <motion.dl
          {...gridProps}
          className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-border-default pt-12 md:grid-cols-3"
        >
          {valuePillars.map((pillar, i) => (
            <motion.div key={pillar.title} {...itemProps} className="relative">
              <span
                aria-hidden="true"
                className="font-display text-caption font-medium tracking-[0.12em] text-brand-brass-text"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="mt-4 flex items-center gap-3 font-display text-h4 text-text-primary">
                <pillar.icon
                  className="size-5 shrink-0 text-brand-brass"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {pillar.title}
              </dt>
              <dd className="mt-3 text-body-m leading-relaxed text-text-secondary">
                {pillar.description}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </Section>
  );
}
