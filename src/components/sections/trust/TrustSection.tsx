import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { duration, easeOut, revealViewport } from "@/lib/motion";
import { trustEyebrow, trustMetrics } from "./trust";

const trackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease: easeOut },
  },
};

/**
 * Trust Indicators — the quiet proof row that walks the visitor out of the
 * Hero and into the firm's credibility. One calm strip of measured facts,
 * each separated by a hairline, connected as one institutional statement.
 * Figures animate once as they scroll into view; tabular-nums keep the
 * numerals perfectly still. Reduced-motion users get the final state with no
 * collapse-and-reveal (variants are simply never engaged).
 */
export function TrustSection() {
  const reducedMotion = useReducedMotion();

  // Reduced motion: don't pass the variants at all — leaving initial/animate
  // in place with inert `{}` variants would still hide the strip at opacity 0.
  const trackProps = reducedMotion
    ? {}
    : {
        variants: trackVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const cellProps = reducedMotion ? {} : { variants: cellVariants };

  return (
    <Section
      aria-labelledby="trust-heading"
      className="border-b border-border-default bg-background"
    >
      <Container>
        <h2 id="trust-heading" className="sr-only">
          {trustEyebrow}
        </h2>

        <motion.dl
          {...trackProps}
          className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-0"
        >
          {trustMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              {...cellProps}
              className={cn(
                "flex flex-col",
                // Hairline separators only once the row truly runs horizontal
                i > 0 && "lg:border-l lg:border-border-default lg:pl-8",
              )}
            >
              {/*
               * Visual order = figure, label, qualifier (dd/dt/p via order-*).
               * Source order = label, figure, qualifier — so screen readers and
               * the DL's name→value semantics announce "label, value" correctly.
               * The qualifier is a <p>, not a definition term — the dl stays valid.
               */}
              <dt className="order-2 mt-2 text-caption uppercase tracking-[0.12em] text-text-muted">
                {m.label}
              </dt>
              <dd className="order-1 font-display text-h4 text-text-primary tnum lg:text-h3">
                {m.value}
              </dd>
              <p className="order-3 mt-1.5 text-body-s leading-snug text-text-secondary">
                {m.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </Section>
  );
}
