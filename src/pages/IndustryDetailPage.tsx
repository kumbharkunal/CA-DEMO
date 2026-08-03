import { Navigate, useParams, Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { PracticeCtaRow } from "@/components/sections/services/PracticeCtaRow";
import { duration, easeOut } from "@/lib/motion";
import { industryBySlug } from "@/components/sections/industries/industries";
import { practices } from "@/lib/practices";

/**
 * Industry practice template. Route-guards by slug; unknown slugs fall
 * through to 404. Body, challenges, and engaged-in render from the
 * industries registry — each page is data, not duplication.
 */
export default function IndustryDetailPage() {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();
  const industry = slug ? industryBySlug(slug) : undefined;

  if (!industry) return <Navigate to="/404" replace />;

  const item = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 as const, y: 14 as const },
          animate: { opacity: 1 as const, y: 0 as const },
          transition: { duration: duration.entrance, ease: easeOut, delay },
        };

  // Match the sector's engaged services to real practice pages (fall back
  // to the services index if a label drifts from the registry).
  const engagedServices = industry.servicesIn.map((label) => {
    const practice = practices.find((p) => p.name === label);
    return { label, href: practice ? `/services/${practice.slug}` : "/services" };
  });

  return (
    <>
      <Seo title={industry.title} description={industry.description} path={industry.href} />
      <PageHero
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: industry.title },
            ]}
          />
        }
        eyebrow="Industries"
        heading={industry.title}
        lede={industry.description}
      />

      <Section aria-label={`${industry.title} practice`} className="mt-16">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <motion.div {...item(0.05)}>
                <h2 className="text-eyebrow text-brand-brass-text">How we work here</h2>
                <p className="mt-4 max-w-[62ch] text-body-l leading-relaxed text-text-secondary">
                  {industry.body}
                </p>
              </motion.div>

              <motion.div {...item(0.12)} className="mt-12">
                <h2 className="text-eyebrow text-brand-brass-text">What we manage for you</h2>
                <ul className="mt-6 space-y-3.5 p-0">
                  {industry.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-body-m text-text-secondary">
                      <Check className="mt-1 size-4 shrink-0 text-brand-brass" strokeWidth={2} aria-hidden="true" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <PracticeCtaRow name={industry.title.toLowerCase()} />
              </motion.div>
            </div>

            {/* Where this sector meets our practices */}
            <motion.aside {...item(0.18)} className="h-fit rounded-xl border border-border-default bg-surface p-7 lg:sticky lg:top-28">
              <h3 className="text-eyebrow text-text-muted">Most engaged services</h3>
              <p className="mt-3 text-body-s leading-relaxed text-text-muted">
                The work in this sector most often draws on these practices.
              </p>
              <ul className="mt-5 space-y-1.5">
                {engagedServices.map((s) => (
                  <li key={s.label}>
                    <Link
                      to={s.href}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 -mx-3 text-body-m text-text-primary outline-none transition-colors duration-150 ease-standard hover:bg-background focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-focus-ring"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-text-muted transition-[transform,color] duration-150 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-border-default pt-6">
                <p className="text-body-m italic leading-relaxed text-text-primary">
                  “We already speak {industry.title === "NRI & Cross-border" ? "cross-border" : "your industry's"} numbers. You stop translating your business to your accountant.”
                </p>
              </div>
            </motion.aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
