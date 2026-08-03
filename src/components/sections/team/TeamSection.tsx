import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
  sectionItemVariants,
} from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import { teamEyebrow, teamHeading, teamSubheadline, teamMembers } from "./team";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * Team preview — partner-led proof. Monogram cards stand in until portrait
 * photography ships; the layout is built so portraits swap into the same
 * frames without touching the grid.
 */
export function TeamSection() {
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
      aria-labelledby="team-heading"
      className="border-t border-border-default bg-surface"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader
              id="team-heading"
              eyebrow={teamEyebrow}
              heading={teamHeading}
              subheadline={teamSubheadline}
            />
          </motion.div>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-body-m font-medium text-brand-brass-text outline-none transition-colors duration-150 ease-standard hover:text-brand-brass-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Meet the firm
            <ArrowRight
              className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.ul
          {...gridProps}
          className="mt-14 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.li key={member.name} {...itemProps}>
              <article className="rounded-xl border border-border-default bg-background p-7 transition-[border-color,box-shadow] duration-150 ease-standard hover:border-border-strong hover:shadow-e2">
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full border border-border-default bg-surface font-display text-h5 text-brand-brass"
                >
                  {member.initials}
                </span>
                <h3 className="mt-6 font-sans text-h5 text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-body-s font-medium text-brand-brass-text">
                  {member.role} · {member.credentials}
                </p>
                <p className="mt-3 text-body-s leading-relaxed text-text-secondary">
                  {member.focus}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
