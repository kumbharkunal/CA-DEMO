/**
 * Download Centre — the firm's public-kit checklist library.
 *
 * `ready: false` entries render disabled ("Available shortly") rather than
 * linking to non-existent files — no 404s, no fake downloads. When the
 * client supplies real PDFs, place them in public/resources/, set
 * ready: true, and point href at the file. Nothing else changes.
 */

export type DownloadItem = {
  title: string;
  blurb: string;
  /** PDF path under /resources once the file exists. */
  href: string;
  /** False until the actual PDF ships with the site. */
  ready: boolean;
  /** Expected reading time for the checklist. */
  minutes: number;
};

export const downloadCentre: DownloadItem[] = [
  {
    title: "Statutory Audit Readiness Checklist",
    blurb: "The 24 artefacts we ask for in week one — close packs, reconciliations, confirmations — so fieldwork starts on day one.",
    href: "/resources/audit-readiness-checklist.pdf",
    ready: false,
    minutes: 6,
  },
  {
    title: "GST Annual Compliance Planner",
    blurb: "A month-by-month calendar of GSTR filings, reconciliations, and reversal checkpoints for the full financial year.",
    href: "/resources/gst-compliance-planner.pdf",
    ready: false,
    minutes: 5,
  },
  {
    title: "Startup Financial Hygiene Checklist",
    blurb: "ESOP registers, ROC events, books cleanup, and investor-readiness — the order in which to fix each.",
    href: "/resources/startup-financial-hygiene.pdf",
    ready: false,
    minutes: 7,
  },
  {
    title: "Due Diligence Data-Room Index",
    blurb: "The folder structure acquirers and VCs expect — with the documents that stall deals flagged in advance.",
    href: "/resources/data-room-index.pdf",
    ready: false,
    minutes: 8,
  },
  {
    title: "NRI Tax Residency Starter Guide",
    blurb: "Residential status, FEMA basics, and the first-five actions for returning NRIs and cross-border families.",
    href: "/resources/nri-residency-guide.pdf",
    ready: false,
    minutes: 9,
  },
  {
    title: "Incorporation Day-One Pack",
    blurb: "Entity choice, DIN/PAN/TAN sequencing, and the 12-month compliance calendar every new company needs.",
    href: "/resources/incorporation-day-one-pack.pdf",
    ready: false,
    minutes: 6,
  },
];
