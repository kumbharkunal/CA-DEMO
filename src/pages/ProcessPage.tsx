import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { SectionHeader, sectionHeaderVariants, sectionItemVariants } from "@/components/ui/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { revealViewport } from "@/lib/motion";
import { processSteps, processEyebrow, processHeading, processSubheadline } from "@/components/sections/process/process";
import { ctaLabel } from "@/lib/site";
import { useBooking } from "@/components/forms/booking-context";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const assurances = [
  {
    number: "01",
    title: "Fixed scope, fixed fee",
    body: "Every engagement begins with a signed scope and a fixed quote. If the work grows, we tell you before it does — never after. No hourly meters running in the background.",
  },
  {
    number: "02",
    title: "One named partner",
    body: "The partner you meet on the first call is the one who signs your work. Your file is never handed down to a junior you haven't met.",
  },
  {
    number: "03",
    title: "A calendar you can see",
    body: "Within the first week you get a shared compliance calendar — every filing, every deadline, every owner. Nothing lives only in our heads.",
  },
];

/**
 * Our Process — the reassurance page the nav promises. The homepage's
 * horizontal four-step arc becomes a vertical timeline here so each step
 * can breathe and carry a week-one detail. Closes on what working with us
 * guarantees, then the consultation CTA.
 */
export default function ProcessPage() {
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
      <Seo title="Our Process" description={processSubheadline} path="/process" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process" }]} />}
        eyebrow={processEyebrow}
        heading={processHeading}
        lede={processSubheadline}
      />

      {/* The four steps, as a vertical timeline */}
      <Section aria-label="The four steps" className="mt-16">
        <Container>
          <motion.ol {...gridProps} className="relative list-none space-y-0 border-l border-border-default p-0 pl-12 md:pl-16">
            {processSteps.map((step) => (
              <motion.li key={step.number} {...itemProps} className="relative pb-14 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1.5 flex size-[15px] items-center justify-center rounded-full border border-border-strong bg-background"
                >
                  <span className="size-[5px] rounded-full bg-brand-brass" />
                </span>
                <span aria-hidden="true" className="tnum font-display text-caption font-medium tracking-[0.12em] text-brand-brass-text">
                  Step {step.number}
                </span>
                <h2 className="mt-3 font-sans text-h4 text-text-primary">{step.title}</h2>
                <p className="mt-3 max-w-[62ch] text-body-m leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* What working with us guarantees */}
      <Section aria-labelledby="assurances-heading" className="border-t border-border-default bg-surface">
        <Container>
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader
              id="assurances-heading"
              eyebrow="The guarantee"
              heading="What working with us actually means."
              subheadline="Three commitments, no fine print. They're why clients stay for a decade."
            />
          </motion.div>
          <motion.ul {...gridProps} className="mt-14 grid grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {assurances.map((a) => (
              <motion.li key={a.number} {...itemProps} className="rounded-xl border border-border-default bg-background p-7">
                <span aria-hidden="true" className="font-display text-caption font-medium tracking-[0.12em] text-brand-brass-text">
                  {a.number}
                </span>
                <h3 className="mt-4 font-sans text-h5 text-text-primary">{a.title}</h3>
                <p className="mt-3 text-body-m leading-relaxed text-text-secondary">{a.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </Section>

      {/* Close */}
      <Section aria-labelledby="process-close-heading" className="border-t border-border-default">
        <Container className="max-w-3xl text-center">
          <motion.div {...headerProps}>
            <SectionHeader
              id="process-close-heading"
              eyebrow="Step zero"
              heading="It starts with one thirty-minute call."
              subheadline="No preparation needed. Bring the situation; we'll map it to a step above — or tell you honestly if you don't need us."
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
