/**
 * Insights preview — locked copy (homepage). Three featured briefings; the
 * full Insights page shares this type.
 */

export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  /** Full briefing body — paragraphs. Optional so the preview can list a
   *  piece whose full text isn't published yet. */
  body?: string[];
};

export const insightsEyebrow = "Insights";
export const insightsHeading = "Freethinking on tax, audit, and money.";
export const insightsSubheadline =
  "Briefings written by the partners — no filler, no recycled news.";

export const featuredInsights: InsightPost[] = [
  {
    slug: "budget-2026-founder-briefing",
    category: "Tax",
    title: "Budget 2026: what founders must change before March 31",
    excerpt:
      "Three changes that alter cash planning for FY 27 — and the two that look big but aren't.",
    date: "2026-02-04",
    readingMinutes: 6,
    body: [
      "The 2026 budget moves three levers that change founder cash planning before the financial year closes. The expansion of presumptive thresholds is the quiet one: it pulls a band of growing services firms into a simpler regime and out of the audit-and-advance-tax treadmill — but only for those who elect in correctly by the deadline.",
      "Two changes look large and are not. The headlined surcharge adjustment affects a narrow band of income most founders' salary-plus-dividend mix never touches. And the much-shared 'startup exemption' is a renewal of a window that already existed — useful, but not the planning reset some commentary made it out to be.",
      "The one that matters most: revised TDS rates on digital payments land mid-year, not on April 1. If your March cash-flow model assumed the old rate, re-run it now. That single line moves working capital more than any other change in the document.",
    ],
  },
  {
    slug: "audit-committee-questions",
    category: "Audit",
    title: "The seven questions a good audit committee asks",
    excerpt:
      "If your auditor only hears 'all good?', something is wrong. Questions that surface real risk.",
    date: "2026-01-18",
    readingMinutes: 8,
    body: [
      "Most audit committees ask an auditor one question: 'All good?' The honest answer to that is almost always yes, and it tells you nothing. The committee's job is to ask the questions that make 'all good' mean something — questions that surface estimation risk, cut-off pressure, and the places management's judgment bends the numbers.",
      "The first question is also the simplest: 'What did you argue about?' Every audit has at least one contention with management. A committee that never hears about the disagreements is being shown a summary, not an audit. The second: 'What would you do if this were your money?' It changes the register from professional to personal and is where a careful auditor's real reservations surface.",
      "The remaining five probe the same ground from different angles — related-party transactions, going-concern headroom, the two estimates with the widest error band, the control that failed its walkthrough, and which number in the pack the auditor would defend hardest under oath. Used together, they turn a rubber stamp into a control.",
    ],
  },
  {
    slug: "esop-tax-trap",
    category: "Advisory",
    title: "The ESOP tax trap that catches second-time founders",
    excerpt:
      "Exercise timing, dual taxation, and the one clause to negotiate before your next grant.",
    date: "2025-12-12",
    readingMinutes: 5,
    body: [
      "Second-time founders are caught by ESOP taxation more often than first-timers, precisely because they know enough to be confident. The trap is the interaction of two taxable events: exercise, taxed as salary perquisite at slab rate, and later sale, taxed as capital gains. Exercise late and at a high fair value, and the first event alone can cost more than the second.",
      "The fix is timing, not avoidance. Exercising early — when fair value is low and the spread is thin — converts most of the eventual upside into capital gains rather than salary. It also starts the holding clock earlier, which matters at exit. The cost is cash now against value that is not yet certain.",
      "Before the next grant, negotiate one clause: the right to early-exercise, paired with a fair-value mechanism that resets at each round. It is a single sentence in the option agreement, and it changes the after-tax outcome of the entire grant.",
    ],
  },
];

/** URL segment → briefing. Powers the article template's route guard. */
export function findInsight(slug: string): InsightPost | undefined {
  return featuredInsights.find((p) => p.slug === slug);
}
