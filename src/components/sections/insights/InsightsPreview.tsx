import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
  sectionItemVariants,
} from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import {
  insightsEyebrow,
  insightsHeading,
  insightsSubheadline,
  featuredInsights,
} from "./insights";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Insights preview — editorial proof of thinking. Hairline-separated
 * article rows behave like an index in a journal, not a card grid; the
 * full piece is one tap away. Dates use semantic <time>.
 */
export function InsightsPreview() {
  const reducedMotion = useReducedMotion();

  const headerProps = reducedMotion
    ? {}
    : {
        variants: sectionHeaderVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const gridProps = reducedMotion
    ? {}
    : {
        variants: gridVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  return (
    <Section
      aria-labelledby="insights-heading"
      className="border-t border-border-default bg-background"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader
              id="insights-heading"
              eyebrow={insightsEyebrow}
              heading={insightsHeading}
              subheadline={insightsSubheadline}
            />
          </motion.div>
          <Link
            to="/insights"
            className="group inline-flex items-center gap-2 text-body-m font-medium text-brand-brass-text outline-none transition-colors duration-150 ease-standard hover:text-brand-brass-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            All insights
            <ArrowRight
              className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.ul
          {...gridProps}
          className="mt-14 list-none divide-y divide-border-default border-y border-border-default p-0"
        >
          {featuredInsights.map((post) => (
            <motion.li key={post.slug} {...itemProps}>
              <Link
                to={`/insights/${post.slug}`}
                className="group grid grid-cols-1 gap-3 py-8 outline-none transition-colors duration-150 ease-standard focus-visible:bg-surface md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <span className="flex items-baseline gap-3 text-body-s text-text-muted md:block md:space-y-1">
                  <span className="text-caption font-medium uppercase tracking-[0.12em] text-brand-brass-text">
                    {post.category}
                  </span>
                  <time dateTime={post.date} className="block">
                    {dateFmt.format(new Date(post.date))}
                  </time>
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-h5 text-text-primary transition-colors duration-150 ease-standard group-hover:text-brand-brass group-focus-visible:text-brand-brass">
                    {post.title}
                  </span>
                  <span className="mt-2 block max-w-[62ch] text-body-m leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-body-s text-text-muted">
                  {post.readingMinutes} min
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-text-muted transition-[transform,color] duration-150 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass-text"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
