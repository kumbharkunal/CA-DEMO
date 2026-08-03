import { Link } from "react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { sectionItemVariants } from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import { industries, industriesEyebrow, industriesHeading, industriesSubheadline } from "@/components/sections/industries/industries";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/**
 * Industries index — all six sectors we embed in. Same card grammar as the
 * homepage preview; every tile routes to the sector's page.
 */
export default function IndustriesPage() {
  const reducedMotion = useReducedMotion();
  const gridProps = reducedMotion
    ? {}
    : { variants: gridVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  return (
    <>
      <Seo title="Industries" description={industriesSubheadline} path="/industries" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />}
        eyebrow={industriesEyebrow}
        heading={industriesHeading}
        lede={industriesSubheadline}
      />
      <Section aria-label="All industries" className="mt-16">
        <Container>
          <motion.ul {...gridProps} className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <motion.li key={industry.href} {...itemProps}>
                <Link
                  to={industry.href}
                  className="group flex h-full flex-col rounded-xl border border-border-default bg-surface p-7 outline-none transition-[border-color,box-shadow] duration-150 ease-standard hover:border-border-strong hover:shadow-e2 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border-default bg-background text-brand-brass">
                      <industry.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted transition-[transform,color] duration-150 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-sans text-h5 text-text-primary">{industry.title}</h2>
                  <p className="mt-2 flex-1 text-body-m leading-relaxed text-text-secondary">{industry.description}</p>
                  <span className="mt-5 text-body-s font-medium text-brand-brass-text">The sector practice</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </Section>
    </>
  );
}
