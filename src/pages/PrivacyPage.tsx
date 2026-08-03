import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

/**
 * Privacy Policy — the binding promise. Plain sections, no legalese where
 * a clear sentence exists; written to the standard a partner would honour.
 */
export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Policy" description="What we collect, why, and exactly what we never do. Last reviewed FY 2025–26." path="/legal/privacy" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />}
        eyebrow="Legal"
        heading="Privacy Policy"
        lede="What we collect, why, and exactly what we never do. Last reviewed FY 2025–26."
      />
      <Section aria-label="Privacy policy" className="mt-16">
        <Container className="max-w-3xl space-y-10 text-body-m leading-relaxed text-text-secondary">
          {[
            {
              title: "1. Controller",
              body: `${siteConfig.legalName} (ICAI ${siteConfig.icaiRegistration}) is the data controller for all information on this site. Contact: ${siteConfig.email}.`,
            },
            {
              title: "2. What we collect",
              body: "Only what you volunteer: name, email, phone and message via the consultation form; email for the monthly letter; and standard server logs (IP, browser) for security. We do not run advertising trackers.",
            },
            {
              title: "3. Why",
              body: "To respond to your enquiry, deliver the letter, and meet our professional obligations under the ICAI Code of Ethics. We never sell or rent data.",
            },
            {
              title: "4. Retention",
              body: "Enquiry records are retained while the engagement is live, then archived in line with statutory requirements. Newsletter consent can be withdrawn any time; we delete the subscription within 7 days of your unsubscribe.",
            },
            {
              title: "5. Your rights",
              body: "You may request access, correction, deletion, or a copy of anything we hold about you by writing to the address above. We respond within one working day and do not require a reason.",
            },
            {
              title: "6. Cookies",
              body: "We use one strictly-necessary session cookie to keep the site responsive. No analytics, no cross-site tracking, no advertising pixels.",
            },
            {
              title: "7. Changes",
              body: "Policy changes are posted here and dated. Material changes are announced to newsletter subscribers before they take effect.",
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
