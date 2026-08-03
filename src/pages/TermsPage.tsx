import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

/**
 * Terms of Use — the conditions of using this website. Concise, accurate,
 * and aligned with the firm's professional obligations.
 */
export default function TermsPage() {
  return (
    <>
      <Seo title="Terms of Use" description="The conditions under which this website is offered. Last reviewed FY 2025–26." path="/legal/terms" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />}
        eyebrow="Legal"
        heading="Terms of Use"
        lede="The conditions under which this website is offered. Last reviewed FY 2025–26."
      />
      <Section aria-label="Terms of use" className="mt-16">
        <Container className="max-w-3xl space-y-10 text-body-m leading-relaxed text-text-secondary">
          {[
            {
              title: "1. Scope",
              body: "These terms govern use of this website. Engagements with the firm are governed solely by a signed engagement letter; nothing on this site constitutes professional advice.",
            },
            {
              title: "2. Not advice",
              body: `Content on this site — including briefings and the monthly letter — is general information, not advice tailored to your facts. Do not act on it without speaking to ${siteConfig.legalName} or your own professional adviser.`,
            },
            {
              title: "3. Intellectual property",
              body: "All copy, design, and code on this site are the property of the firm. Briefing excerpts may be quoted with attribution and a link; wholesale reproduction requires written permission.",
            },
            {
              title: "4. Accuracy",
              body: "We take care that figures, dates, and statutory references are correct at publication. Statutes and rules change; always confirm against the current text before relying on them.",
            },
            {
              title: "5. Third-party links",
              body: "External links are provided for convenience. We are not responsible for the content or practices of any linked site.",
            },
            {
              title: "6. Liability",
              body: "To the extent permitted by law, the firm accepts no liability for loss arising from use of this website. Nothing in these terms limits liability that cannot lawfully be limited.",
            },
            {
              title: "7. Governing law",
              body: "These terms are governed by the laws of India; courts at Mumbai have exclusive jurisdiction.",
            },
            {
              title: "8. Contact",
              body: `Questions about these terms: ${siteConfig.email} · ${siteConfig.phone}.`,
            },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="font-sans text-h5 text-text-primary">{s.title}</h2>
              <p className="mt-3">{s.body}</p>
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
