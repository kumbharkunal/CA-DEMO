/**
 * FAQ — locked copy (homepage). The six questions a serious prospect
 * actually asks before booking, answered plainly. Each answer ends the
 * objection rather than deflecting it.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqEyebrow = "Questions, answered";
export const faqHeading = "Everything on your mind, plainly answered.";
export const faqSubheadline =
  "If your question isn't here, a partner will answer it personally within one working day.";

export const faqItems: FaqItem[] = [
  {
    id: "fees",
    question: "How are your fees structured?",
    answer:
      "Every engagement is scoped and quoted before work begins. You receive a fixed fee for a fixed scope — what's included, what's not, and what 'done' looks like. We do not bill by the hour, and there are no surprise line items.",
  },
  {
    id: "who-handles",
    question: "Who actually works on my account?",
    answer:
      "A named partner owns your file from the first call. Behind them, a dedicated team of CAs and specialists handles execution, but you always have one senior point of contact who knows your numbers and answers your call.",
  },
  {
    id: "software",
    question: "Do we need to change our accounting software?",
    answer:
      "No. We work inside the systems you already use — Tally, Zoho, QuickBooks, SAP, or a well-kept spreadsheet. Where a change would genuinely save you money or risk, we'll recommend it with the reasoning laid out; the decision stays yours.",
  },
  {
    id: "switching",
    question: "We're with another CA. How hard is it to switch?",
    answer:
      "Simpler than most expect. We manage the entire handover: the professional courtesy letter, collection of records and past filings, and reconciliation of opening balances. Most transitions complete within a fortnight, with zero disruption to your filings.",
  },
  {
    id: "size",
    question: "Are we too small — or too large — for your firm?",
    answer:
      "We work with funded startups, family businesses, and listed enterprises. Engagements are scoped to need, not headcount. If a requirement sits outside our practice areas, we'll say so and point you to the right specialist.",
  },
  {
    id: "notices",
    question: "What happens if we receive a tax notice?",
    answer:
      "You forward it to us and stop worrying. We assess the notice, draft the response, represent you before the authority, and keep you informed in plain language at every step. Representation is a core part of our practice, not an add-on.",
  },
];
