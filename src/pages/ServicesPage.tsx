import { Link } from "react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { SectionHeader, sectionHeaderVariants, sectionItemVariants } from "@/components/ui/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { revealViewport } from "@/lib/motion";
import { featuredServices, servicesHeading, servicesSubheadline } from "@/components/sections/services/services";
import { ctaLabel } from "@/lib/site";
import { useBooking } from "@/components/forms/booking-context";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/**
 * Services index — all practices as one listable surface. Grid reuses the
 * homepage card grammar; every tile routes to its dedicated practice page.
 */
export default function ServicesPage() {
  const reducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  const headerProps = reducedMotion
    ? {}
    : { variants: sectionHeaderVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };
  const gridProps = reducedMotion
    ? {}
    : { variants: gridVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  return (
    <>
      <Seo title="Services" description={servicesSubheadline} path="/services" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />}
        eyebrow="Services"
        heading={servicesHeading}
        lede={servicesSubheadline}
      />
      <Section aria-label="All practices" className="mt-16">
        <Container>
          <motion.ul {...gridProps} className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <motion.li key={service.href} {...itemProps}>
                <Link
                  to={service.href}
                  className="group flex h-full flex-col rounded-xl border border-border-default bg-surface p-7 outline-none transition-[border-color,box-shadow] duration-150 ease-standard hover:border-border-strong hover:shadow-e2 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border-default bg-background text-brand-brass">
                      <service.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted transition-[transform,color] duration-150 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-sans text-h5 text-text-primary">{service.title}</h2>
                  <p className="mt-2 flex-1 text-body-m leading-relaxed text-text-secondary">{service.description}</p>
                  <span className="mt-5 text-body-s font-medium text-brand-brass-text">Explore the practice</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </Section>

      <Section aria-labelledby="services-extra-heading" className="border-t border-border-default bg-surface">
        <Container className="max-w-3xl text-center">
          <motion.div {...headerProps}>
            <SectionHeader
              id="services-extra-heading"
              eyebrow="Not sure which fits"
              heading="Tell us the problem — not the practice."
              subheadline="Most engagements span more than one discipline. Start with the situation; we'll shape the mandate."
            />
          </motion.div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={openBooking}
              className={buttonVariants({ variant: "brass", size: "lg" })}
            >
              {ctaLabel}
            </button>
          </div>
        </Container>
      </Section>
    </>
  );
}
