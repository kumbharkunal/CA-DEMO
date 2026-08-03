import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { sectionItemVariants } from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

const asideVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/**
 * Contact — the conversion page. Form left, trust aside right (channels,
 * hours, address, FRN). The aside answers the hesitations the form creates:
 * how fast, who's behind it, where they are.
 */
export default function ContactPage() {
  const reducedMotion = useReducedMotion();
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };
  const asideProps = reducedMotion
    ? {}
    : { variants: asideVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };

  return (
    <>
      <Seo title="Contact" description="Two sentences about your situation is enough. A partner replies — personally, within one working day." path="/contact" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />}
        eyebrow="Contact"
        heading="Start the conversation."
        lede="Two sentences about your situation is enough. A partner replies — personally, within one working day."
      />

      <Section aria-label="Contact form and details" className="mt-16">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
            <div className="rounded-xl border border-border-default bg-surface p-7 sm:p-9">
              <ConsultationForm />
            </div>

            <motion.aside {...asideProps} className="space-y-10">
              <motion.div {...itemProps}>
                <h2 className="text-eyebrow text-text-muted">Preferred channels</h2>
                <ul className="mt-5 space-y-3 text-body-m text-text-secondary">
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="group inline-flex items-center gap-2 text-text-primary underline-offset-4 outline-none transition-colors duration-150 hover:text-brand-brass hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring"
                    >
                      {siteConfig.phone}
                      <ArrowUpRight className="size-3.5 text-text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group inline-flex items-center gap-2 text-text-primary underline-offset-4 outline-none transition-colors duration-150 hover:text-brand-brass hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring"
                    >
                      {siteConfig.email}
                      <ArrowUpRight className="size-3.5 text-text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div {...itemProps} className="border-t border-border-default pt-8">
                <h2 className="text-eyebrow text-text-muted">Office</h2>
                <address className="mt-5 space-y-1.5 text-body-m not-italic text-text-secondary">
                  {siteConfig.address.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
                <p className="mt-4 text-body-s text-text-muted">{siteConfig.hours}</p>
              </motion.div>

              <motion.div {...itemProps} className="border-t border-border-default pt-8">
                <h2 className="text-eyebrow text-text-muted">Standing</h2>
                <p className="mt-4 text-body-m text-text-secondary">
                  ICAI {siteConfig.icaiRegistration} · Est. {siteConfig.established}
                </p>
              </motion.div>

              <motion.div {...itemProps} className="rounded-xl border border-border-default bg-background p-6">
                <p className="text-body-m leading-relaxed text-text-primary">
                  “The first call is free and stays off the record. If we're
                  not the right firm, we'll tell you who is.”
                </p>
                <p className="mt-4 text-body-s text-text-muted">
                  Read the <Link to="/legal/privacy" className="text-brand-brass underline-offset-4 outline-none transition-colors duration-150 hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring">privacy note</Link>.
                </p>
              </motion.div>
            </motion.aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
