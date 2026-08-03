/**
 * Trust Indicators — locked content config.
 *
 * References: locked Homepage Experience ("proof row" between the Hero's
 * reality check and services — one line of measured institutional proof).
 * Five facts, tabular-figures so the numerals never reflow. Copy is
 * quantified because vague trust words erode credibility.
 */

export type TrustMetric = {
  /** Displayed figure (kept string so formatting — +, %, Cr — is explicit). */
  value: string;
  /** The claim being measured. */
  label: string;
  /** One-line qualifier; the reason a spreadsheet-owning reader believes it. */
  sublabel: string;
};

export const trustEyebrow = "By the numbers";

export const trustMetrics: TrustMetric[] = [
  {
    value: "27+",
    label: "Years of practice",
    sublabel: "Statutory focus since 1998",
  },
  {
    value: "500+",
    label: "Clients served",
    sublabel: "Across 12 industries",
  },
  {
    value: "₹2,400Cr+",
    label: "Assets under compliance",
    sublabel: "Audited & represented",
  },
  {
    value: "100%",
    label: "Filing record",
    sublabel: "No missed statutory deadline",
  },
  {
    value: "40+",
    label: "Specialist team",
    sublabel: "CA · CS · CMA · IFRS",
  },
];
