import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
  sectionItemVariants,
} from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import {
  processEyebrow,
  processHeading,
  processSubheadline,
  processSteps,
} from "./process";

const trackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/**
 * Our Process — the reassurance arc stated horizontally. Four numbered
 * steps along a hairline that connects them; the numbers are the only
 * "graphic". Desktop runs 4-across, tablet 2, mobile stacks with the
 * connecting rule running vertically down the left of each step.
 */
export function ProcessSection() {
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
  const trackProps = reducedMotion
    ? {}
    : {
        variants: trackVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <Section
      aria-labelledby="process-heading"
      className="border-t border-border-default bg-background"
    >
      <Container>
        <motion.div {...headerProps} className="max-w-2xl">
          <SectionHeader
            id="process-heading"
            eyebrow={processEyebrow}
            heading={processHeading}
            subheadline={processSubheadline}
          />
        </motion.div>

        <motion.ol {...trackProps} className="relative mt-14 grid list-none grid-cols-1 gap-x-10 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-4">
          {/*
           * The connecting rule. On desktop it runs across the tops of the
           * four dots; on mobile it's the left border each dot sits on.
           */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-0 h-full w-px bg-border-default lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto"
          />
          {processSteps.map((step) => (
            <motion.li key={step.number} {...itemProps} className="relative pl-10 lg:pl-0 lg:pt-12">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full border border-border-strong bg-background lg:top-0"
              >
                <span className="size-[5px] rounded-full bg-brand-brass" />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-caption font-medium tracking-[0.12em] text-brand-brass-text"
              >
                {step.number}
              </span>
              <h3 className="mt-3 font-sans text-h5 text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-body-m leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}
