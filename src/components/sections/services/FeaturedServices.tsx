import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Section, Container } from "@/components/layout/Container";
import { duration, easeOut, revealViewport } from "@/lib/motion";
import {
  servicesCtaHref,
  servicesCtaLabel,
  servicesEyebrow,
  servicesHeading,
  servicesSubheadline,
  serviceCardCta,
  featuredServices,
  type Service,
} from "./services";

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
 * Featured Services — the firm's range, told as outcomes. An editorial
 * section head sets the promise; six capability cards deliver the proof,
 * one stagger behind the next. Each card is a full-area link, so the entire
 * surface is the target; focus is routed through the card's ::after ring so
 * keyboard users see the whole region light up. Reduced-motion visitors get
 * the settled grid with no collapse-and-reveal.
 */
export function FeaturedServices() {
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
    <Section aria-labelledby="services-heading" className="bg-background">
      <Container>
        {/* Section head — eyebrow, promise, qualifier (left) · CTA (right) */}
        <motion.div
          {...headerProps}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p {...itemProps} className="text-eyebrow text-brand-brass-text">
              {servicesEyebrow}
            </motion.p>
            <motion.h2
              {...itemProps}
              id="services-heading"
              className="mt-4 font-display text-h2 text-text-primary"
            >
              {servicesHeading}
            </motion.h2>
            <motion.p
              {...itemProps}
              className="mt-5 max-w-[52ch] text-body-l text-text-secondary"
            >
              {servicesSubheadline}
            </motion.p>
          </div>
          <motion.div {...itemProps} className="shrink-0">
            <Link
              to={servicesCtaHref}
              className="group inline-flex h-11 items-center gap-2 rounded-md border border-text-primary/15 px-5 text-button font-medium text-text-primary outline-none transition-colors duration-150 ease-standard hover:bg-hover-bg focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {servicesCtaLabel}
              <ArrowRight
                className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Capability grid — 1 col mobile → 2 tablet → 3 desktop */}
        <motion.ul
          {...gridProps}
          className="mt-14 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredServices.map((service) => (
            <motion.li key={service.href} {...itemProps}>
              <ServiceCard service={service} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}

/**
 * One capability. The whole card is the link (stretched-link via ::after),
 * keeping a single accessible target and a clean tab order. Hover/focus
 * raise the border and sweep in a brass underline from 0 → 100%.
 */
function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      to={service.href}
      className="group relative flex h-full flex-col rounded-xl border border-border-default bg-surface p-7 outline-none transition-[border-color,box-shadow] duration-150 ease-standard after:absolute after:inset-x-7 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand-brass after:transition-transform after:duration-200 after:ease-standard hover:border-border-strong hover:shadow-e2 hover:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:after:scale-x-100"
    >
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-lg border border-border-default bg-background text-brand-ink transition-colors duration-150 ease-standard group-hover:text-brand-brass"
      >
        <Icon className="size-5" strokeWidth={1.5} />
      </span>

      <span className="mt-6 font-display text-h4 text-text-primary">
        {service.title}
      </span>
      <span className="mt-2.5 flex-1 text-body-s leading-snug text-text-secondary">
        {service.description}
      </span>

      <span className="mt-7 inline-flex items-center gap-1.5 text-caption font-medium uppercase tracking-[0.12em] text-text-muted transition-colors duration-150 ease-standard group-hover:text-brand-brass">
        {serviceCardCta}
        <ArrowRight
          className="size-3.5 transition-transform duration-150 ease-standard group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
