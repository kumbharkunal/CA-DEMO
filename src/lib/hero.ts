/**
 * Hero — locked content config.
 *
 * References: locked Hero spec ("The Reality Check" concept, Lusion-grade
 * entrance, breathing mesh background, floating compliance timeline cards,
 * dual CTA + ICAI trust row, hairline scroll cue).
 */

export type HeroTrustItem = {
  value: string;
  label: string;
  sublabel: string;
};

export const heroEyebrow = "ICAI-REGISTERED CHARTERED ACCOUNTANTS";
export const heroHeadline = "Clarity behind every number. Confidence behind every decision.";
export const heroSubheadline =
  "A chartered accountancy firm for founders, families, and enterprises who refuse financial guesswork — audit, tax, and advisory practiced as one discipline.";
export const heroPrimaryCta = "Book a Consultation";
export const heroSecondaryCta = "See How We Work";
export const heroTrustLine = "27 years · Partner-led engagements · Response within 2 hours";

export const heroStats: HeroTrustItem[] = [
  { value: "27+", label: "Years of practice", sublabel: "Since 1998" },
  { value: "500+", label: "Clients served", sublabel: "Across 12 industries" },
  { value: "₹2,400Cr+", label: "Assets under compliance", sublabel: "Audited & represented" },
];
