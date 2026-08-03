/**
 * Our Process — locked copy (homepage).
 *
 * References: locked Homepage Experience (process as reassurance — a short,
 * numbered, linear path from first call to steady-state). Four steps;
 * each is one plain-English sentence so the work feels legible, not arcane.
 */

export type ProcessStep = {
  /** 01 · 02 · 03 · 04. */
  number: string;
  /** Verb-led step name. */
  title: string;
  /** One plain-English sentence: what happens, and what you get. */
  description: string;
};

export const processEyebrow = "Our process";
export const processHeading = "From first call to final sign-off.";
export const processSubheadline =
  "Four steps. No black boxes. You always know where your engagement stands.";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery call",
    description:
      "A 30-minute conversation to understand your business, your numbers, and what's actually keeping you up at night.",
  },
  {
    number: "02",
    title: "Scoped proposal",
    description:
      "A fixed scope and a fixed quote — what's included, what it costs, what 'done' looks like. No hourly surprises.",
  },
  {
    number: "03",
    title: "Onboarding & compliance",
    description:
      "We migrate your records, set your compliance calendar, and take over the filings you were managing yourself.",
  },
  {
    number: "04",
    title: "Ongoing partnership",
    description:
      "Quarterly reviews, proactive alerts on deadlines, and a partner who calls you before the tax notice arrives.",
  },
];
