import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { SectionHeader, sectionHeaderVariants, sectionItemVariants } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/components/sections/team/team";
import { valuePillars, whyHeading, whySubheadline, whyEyebrow } from "@/components/sections/why/why";
import { revealViewport } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

const timeline = [
  { year: "1998", note: "Founded in Nariman Point by two ICAI members with one client and a rented desk." },
  { year: "2005", note: "First listed-company statutory audit; the assurance practice takes its current shape." },
  { year: "2012", note: "Advisory desk opens — numbers begin to inform decisions, not just filings." },
  { year: "2019", note: "Cloud-first workflow adopted firm-wide; clients gain same-day visibility into their file." },
  { year: "2025", note: "12 industries, 450+ engagements, three partners — and a fourth in the making." },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * About — the firm's story told as proof of continuity. Timeline, values,
 * leadership faces from the locked Team registry, closing on the honest
 * question: why a firm like ours, not a bigger or cheaper one.
 */
export default function AboutPage() {
  const reducedMotion = useReducedMotion();

  const headerProps = reducedMotion
    ? {}
    : { variants: sectionHeaderVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };
  const gridProps = reducedMotion
    ? {}
    : { variants: gridVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  return (
    <>
      <Seo title="About" description="Twenty-seven years of standing behind numbers — a senior-only chartered accountancy practice." path="/about" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />}
        eyebrow="The firm"
        heading="Twenty-seven years of standing behind numbers."
        lede={`${siteConfig.legalName} exists for clients who can't afford advice that hedges. We're a senior-only practice: the people you meet are the people who sign.`}
      />

      {/* Timeline */}
      <Section aria-labelledby="timeline-heading" className="mt-16">
        <Container>
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader id="timeline-heading" eyebrow="The story" heading="Built slowly, on purpose." />
          </motion.div>
          <motion.ol {...gridProps} className="mt-14 space-y-0 border-l border-border-default pl-0">
            {timeline.map((t) => (
              <motion.li key={t.year} {...itemProps} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[7px] top-1 flex size-[13px] items-center justify-center rounded-full border border-border-strong bg-background" aria-hidden="true">
                  <span className="size-[5px] rounded-full bg-brand-brass" />
                </span>
                <p className="tnum font-display text-h5 text-brand-brass">{t.year}</p>
                <p className="mt-2 max-w-[60ch] text-body-m leading-relaxed text-text-secondary">{t.note}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* Values — same registry as homepage Why */}
      <Section aria-labelledby="values-heading" className="border-t border-border-default bg-surface">
        <Container>
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader id="values-heading" eyebrow={whyEyebrow} heading={whyHeading} subheadline={whySubheadline} />
          </motion.div>
          <motion.dl {...gridProps} className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-border-default pt-12 md:grid-cols-3">
            {valuePillars.map((pillar, i) => (
              <motion.div key={pillar.title} {...itemProps}>
                <span aria-hidden="true" className="font-display text-caption font-medium tracking-[0.12em] text-brand-brass-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-4 flex items-center gap-3 font-display text-h4 text-text-primary">
                  <pillar.icon className="size-5 shrink-0 text-brand-brass" strokeWidth={1.5} aria-hidden="true" />
                  <span>{pillar.title}</span>
                </dt>
                <dd className="mt-3 text-body-m leading-relaxed text-text-secondary">{pillar.description}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </Container>
      </Section>

      {/* Partnership */}
      <Section aria-labelledby="partnership-heading" className="border-t border-border-default">
        <Container>
          <motion.div {...headerProps} className="max-w-2xl">
            <SectionHeader
              id="partnership-heading"
              eyebrow="The partners"
              heading="You hire partners. You get partners."
              subheadline="No account managers, no juniors passed off as advisors. The three names below are the only ones on your file."
            />
          </motion.div>
          <motion.ul {...gridProps} className="mt-14 grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.li key={member.name} {...itemProps}>
                <article className="rounded-xl border border-border-default bg-surface p-7">
                  <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full border border-border-default bg-background font-display text-h5 text-brand-brass">
                    {member.initials}
                  </span>
                  <h3 className="mt-6 font-sans text-h5 text-text-primary">{member.name}</h3>
                  <p className="mt-1 text-body-s font-medium text-brand-brass-text">
                    {member.role} · {member.credentials}
                  </p>
                  <p className="mt-3 text-body-s leading-relaxed text-text-secondary">{member.focus}</p>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </Section>
    </>
  );
}
