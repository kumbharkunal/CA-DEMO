import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { DownloadCentreSection } from "@/components/sections/insights/DownloadCentreSection";

/**
 * Resources — the firm's public library. Hosts the Download Centre; as
 * templates and guides ship, they join this page without a redesign.
 */
export default function ResourcesPage() {
  return (
    <>
      <Seo title="Resource Library" description="Checklists and planners distilled from two decades of engagements — the same artefacts we open with, free to keep." path="/resources" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />}
        eyebrow="Resources"
        heading="The firm's working papers."
        lede="Checklists and planners distilled from two decades of engagements — the same artefacts we open with, free to keep."
      />
      <DownloadCentreSection className="mt-4 border-t-0" />
    </>
  );
}
