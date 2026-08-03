import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

/**
 * Disclaimer — a short, ICAI-aligned note on the boundary between
 * information and professional engagement.
 */
export default function DisclaimerPage() {
  return (
    <>
      <Seo title="Disclaimer" description="One page, plainly, on where the information on this site ends and professional engagement begins." path="/legal/disclaimer" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />}
        eyebrow="Legal"
        heading="Disclaimer"
        lede="One page, plainly, on where the information on this site ends and professional engagement begins."
      />
      <Section aria-label="Disclaimer" className="mt-16">
        <Container className="max-w-3xl space-y-8 text-body-m leading-relaxed text-text-secondary">
          <p>
            The contents of this website are for general information only.
            They are not, and do not constitute, professional advice of any
            kind — tax, audit, accounting, legal, or otherwise. No reader
            should act or refrain from acting on the basis of anything on
            this site without seeking advice specific to their facts.
          </p>
          <p>
            {siteConfig.legalName} (ICAI {siteConfig.icaiRegistration}) takes
            care to keep information current, but statutes, rules, and
            judicial interpretation change frequently. We make no
            representation that content on this site reflects the law as it
            stands on the day it is read.
          </p>
          <p>
            Use of this website, or communication through it, does not
            create a client relationship. A client relationship arises only
            on execution of a signed engagement letter. Communications sent
            before engagement are received on the understanding that they
            carry no privilege until an engagement exists.
          </p>
          <p>
            The firm accepts no liability for any loss or damage arising
            from reliance on the contents of this website.
          </p>
          <p className="text-body-s text-text-muted">
            Issued in accordance with the Code of Ethics of the Institute of
            Chartered Accountants of India.
          </p>
        </Container>
      </Section>
    </>
  );
}
