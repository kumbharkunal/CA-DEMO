import { HeroSection } from "@/components/sections/hero/HeroSection";
import { TrustSection } from "@/components/sections/trust/TrustSection";
import { FeaturedServices } from "@/components/sections/services/FeaturedServices";
import { IndustriesSection } from "@/components/sections/industries/IndustriesSection";
import { WhySection } from "@/components/sections/why/WhySection";
import { ProcessSection } from "@/components/sections/process/ProcessSection";
import { StatsSection } from "@/components/sections/stats/StatsSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { InsightsPreview } from "@/components/sections/insights/InsightsPreview";
import { FinalCtaSection } from "@/components/sections/cta/FinalCtaSection";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

/**
 * HomePage — the locked funnel:
 * attention (Hero) → credibility (Trust) → range (Services, Industries)
 * → conviction (Why, Process, Stats) → proof (Team, Testimonials, FAQ)
 * → freshness (Insights) → the close (Final CTA).
 * Light sections alternate breathing with ink bands (Stats, Final CTA) so
 * the page has tempo, not monotony.
 */
export function HomePage() {
  return (
    <>
      <Seo
        title="Chartered Accountants"
        description={siteConfig.description}
        path="/"
      />
      <HeroSection />
      <TrustSection />
      <FeaturedServices />
      <IndustriesSection />
      <WhySection />
      <ProcessSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <InsightsPreview />
      <FinalCtaSection />
    </>
  );
}
