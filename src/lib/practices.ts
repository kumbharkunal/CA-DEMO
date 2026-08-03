/** A single deliverable inside an engagement. */
export type Deliverable = string;

/** The collapsible trust block beside the practice detail body. */
export type PracticeAside = {
  idealFor: string[];
  engagedIn: string[];
  outcome: string;
};

export type Practice = {
  slug: string;
  name: string;
  /** Page hero lede — the one-sentence mandate. */
  lede: string;
  /** What the engagement covers, expressed as client outcomes. */
  scope: Deliverable[];
  /** How the engagement runs; three sentences max. */
  approach: string;
  aside: PracticeAside;
};

export const practices: Practice[] = [
  {
    slug: "audit-assurance",
    name: "Audit & Assurance",
    lede:
      "Statutory, internal, and IFC audits that hold up — to the board, the bank, and the regulator.",
    scope: [
      "Statutory audit under the Companies Act",
      "Internal financial controls (IFC) review",
      "Special-purpose & transaction audits",
      "Management letters a board can act on",
    ],
    approach:
      "We audit to the standard of a diligence file, not a checkbox. Fieldwork is planned around your close calendar, queries arrive batched rather than drip-fed, and the final letter names issues plainly — with the fix, not just the finding.",
    aside: {
      idealFor: ["Listed & unlisted companies", "Funded startups pre-diligence", "Businesses seeking credit"],
      engagedIn: ["Statutory", "Internal", "IFC", "Special purpose"],
      outcome: "An audit that survives scrutiny, delivered without hijacking your quarter.",
    },
  },
  {
    slug: "tax-compliance",
    name: "Tax & Compliance",
    lede:
      "Every deadline met before you think about it — direct, indirect, GST, and the calendar between.",
    scope: [
      "Corporate & personal income tax",
      "GST registration, returns & reconciliation",
      "TDS compliance & lower-deduction certificates",
      "Advance-tax & cash-flow planning",
    ],
    approach:
      "Compliance is run as a calendar, not a scramble. We own the dates, reconcile in the background, and surface decisions only where one exists. You receive a short monthly position note — what's filed, what's next, what needs you.",
    aside: {
      idealFor: ["Operating companies", "Professionals & partnerships", "Groups with multi-state GST"],
      engagedIn: ["Advance tax", "GST", "TDS", "Assessments"],
      outcome: "Zero missed deadlines — and no surprises at year-end.",
    },
  },
  {
    slug: "business-advisory",
    name: "Business Advisory",
    lede:
      "Your numbers, converted into decisions on pricing, structure, and growth you can defend.",
    scope: [
      "Unit-economics & pricing reviews",
      "Restructuring for tax efficiency",
      "Working-capital & margin diagnosis",
      "Bank- and investor-ready projections",
    ],
    approach:
      "Advisory starts from your actual ledger, not a template. We build the model around how your business earns, test the decision both ways, and leave you with a one-page recommendation — and the reasoning behind it.",
    aside: {
      idealFor: ["Founders at a fork", "Family businesses professionalising", "CFOs needing a second brain"],
      engagedIn: ["Quarterly", "Per-decision", "Pre-transaction"],
      outcome: "One decision page per question — defensible, dated, done.",
    },
  },
  {
    slug: "cfo-services",
    name: "CFO Services",
    lede:
      "Senior finance leadership on demand — MIS, controls, and board reporting, without a full-time hire.",
    scope: [
      "Monthly MIS & board packs",
      "Controls design & delegation frameworks",
      "Budgeting, forecasting & variance",
      "Bank & investor relationship management",
    ],
    approach:
      "We sit inside your leadership rhythm — monthly close, review, board. The operating cadence is built in the first 30 days; after that, the numbers simply arrive, explained, on time, every time.",
    aside: {
      idealFor: ["Growth-stage companies", "Promoter-led businesses", "Pre-CFO organisations"],
      engagedIn: ["Retainership", "Interim", "Project"],
      outcome: "A functioning finance office, run until you hire one of your own.",
    },
  },
  {
    slug: "international-taxation",
    name: "International Taxation",
    lede:
      "Cross-border tax and transfer pricing managed in both directions — expansion without surprises.",
    scope: [
      "Inbound & outbound structuring",
      "Transfer-pricing documentation & audits",
      "DTAA positions & foreign-tax credits",
      "Expat payroll & resident-status planning",
    ],
    approach:
      "Cross-border work lives on substance, not treaty shopping. We document the commercial reasoning, model the all-in rate, and file defensibly in both jurisdictions — so an expansion never becomes a controversy.",
    aside: {
      idealFor: ["Exporters & importers", "Foreign subsidiaries in India", "Indian groups going abroad"],
      engagedIn: ["Per-transaction", "Annual TP file", "Advisory retainers"],
      outcome: "A cross-border structure that answers scrutiny in both directions.",
    },
  },
  {
    slug: "company-incorporation",
    name: "Company Incorporation",
    lede:
      "Incorporated correctly the first time — entity, registrations, and compliance from day one.",
    scope: [
      "Entity selection & structuring",
      "Incorporation, DIN, PAN, TAN",
      "GST, Shops & Establishments, IEC",
      "First-year compliance calendar",
    ],
    approach:
      "The structure is chosen once — we make it deliberately. We map your funding, tax, and exit paths first, then incorporate, register, and hand you a 12-month compliance calendar so nothing in year one surprises you.",
    aside: {
      idealFor: ["First-time founders", "Foreign entrants to India", "Family offices forming SPVs"],
      engagedIn: ["One-time", "With compliance retainer"],
      outcome: "A clean structure and a compliant first year — no retrofits.",
    },
  },
];

export function findPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
