import { Navigate, useParams } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { findPractice } from "@/lib/practices";
import { PracticeCtaRow } from "@/components/sections/services/PracticeCtaRow";
import { duration, easeOut } from "@/lib/motion";

/**
 * Individual practice template. Route-guards by slug; unknown slugs fall
 * through to 404. Scope, approach, and the aside render from the single
 * practices registry — each page is data, not duplication.
 */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();
  const practice = slug ? findPractice(slug) : undefined;

  if (!practice) return <Navigate to="/404" replace />;

  const practiceSeo = (
    <Seo title={practice.name} description={practice.lede} path={`/services/${practice.slug}`} />
  );

  const item = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 as const, y: 14 as const },
          animate: { opacity: 1 as const, y: 0 as const },
          transition: { duration: duration.entrance, ease: easeOut, delay },
        };

  return (
    <>
      {practiceSeo}
      <PageHero
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: practice.name },
            ]}
          />
        }
        eyebrow="Services"
        heading={practice.name}
        lede={practice.lede}
      />

      <Section aria-label={`${practice.name} detail`} className="mt-16">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <motion.div {...item(0.05)}>
                <h2 className="text-eyebrow text-brand-brass-text">What's covered</h2>
                <ul className="mt-6 space-y-3.5 p-0">
                  {practice.scope.map((line) => (
                    <li key={line} className="flex gap-3 text-body-m text-text-secondary">
                      <Check className="mt-1 size-4 shrink-0 text-brand-brass" strokeWidth={2} aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...item(0.12)} className="mt-12">
                <h2 className="text-eyebrow text-brand-brass-text">How it runs</h2>
                <p className="mt-4 max-w-[62ch] text-body-l leading-relaxed text-text-secondary">
                  {practice.approach}
                </p>
                <PracticeCtaRow name={practice.name} />
              </motion.div>
            </div>

            {/* Trust aside */}
            <motion.aside {...item(0.18)} className="h-fit rounded-xl border border-border-default bg-surface p-7 lg:sticky lg:top-28">
              <h3 className="text-eyebrow text-text-muted">Who it's for</h3>
              <ul className="mt-4 space-y-2.5 text-body-m text-text-secondary">
                {practice.aside.idealFor.map((who) => (
                  <li key={who} className="flex gap-2.5">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-brass" aria-hidden="true" />
                    {who}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-border-default pt-6">
                <h3 className="text-eyebrow text-text-muted">Engaged in</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {practice.aside.engagedIn.map((mode) => (
                    <span
                      key={mode}
                      className="rounded-full border border-border-default bg-background px-3 py-1 text-body-s text-text-secondary"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7 border-t border-border-default pt-6">
                <p className="text-body-m italic leading-relaxed text-text-primary">
                  “{practice.aside.outcome}”
                </p>
              </div>
            </motion.aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
