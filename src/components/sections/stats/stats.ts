/**
 * Statistics band — locked copy (homepage). Four figures, each defensible
 * on request; no vanity numbers. Rendered as an ink band between the
 * Process and Team sections.
 */

export type Stat = {
  value: string;
  label: string;
  note: string;
};

export const statsEyebrow = "The record";
export const statsHeading = "Numbers we can stand behind.";

export const stats: Stat[] = [
  { value: "27", label: "Years in practice", note: "Est. 1998, Mumbai" },
  { value: "450+", label: "Active engagements", note: "Across 12 industries" },
  { value: "₹4,800 Cr", label: "Assets audited annually", note: "FY 2024–25" },
  { value: "98%", label: "Client retention", note: "Measured 3 years running" },
];
