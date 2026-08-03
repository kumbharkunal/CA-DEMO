/**
 * Industries We Serve — locked copy (homepage).
 *
 * References: locked Homepage Experience (industries as "we already speak
 * your language" — a grid of sector tiles, each collapses to one line of
 * domain specificity, each linking to its practice page). Sectors are the
 * six the firm wins in most; copy is written to a founder/CFO who wants to
 * be recognized on first read.
 */

import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Cpu,
  Factory,
  Globe,
  HeartPulse,
  Building2,
} from "lucide-react";

export type Industry = {
  /** Sector name (noun, not adjective). */
  title: string;
  /** One line naming the sector-specific compliance pressure we absorb. */
  description: string;
  /** Route to the sector practice page. */
  href: string;
  /** Sector glyph. */
  icon: LucideIcon;
  /** Detail page: expanded sector opening (the PageHero lede + approach). */
  body: string;
  /** Detail page: the specific pressures we own for this sector. */
  challenges: string[];
  /** Detail page: firm services most engaged here (labels mirror practices). */
  servicesIn: string[];
};

/** URL segment → industry. Derived from href so nav and route never drift. */
export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((ind) => ind.href === `/industries/${slug}`);
}

export const industriesEyebrow = "Industries we serve";
export const industriesHeading = "Fluent in your industry's numbers.";
export const industriesSubheadline =
  "Tax law is national, but compliance is sectoral. We embed in six industries so your filings reflect how your business actually works.";

export const industries: Industry[] = [
  {
    title: "Startups & Technology",
    description:
      "ESOPs, SaaS revenue recognition, and gov’t incentives handled so founders ship, not file.",
    href: "/industries/startups-technology",
    icon: Cpu,
    body: "We embed with funded and bootstrapped tech companies from the first cheque onward — structuring for scale, keeping ESOP and incentive positions defensible, and turning the ledger into something an investor can read.",
    challenges: ["ESOP structuring & 409A-style valuation windows", "SaaS & subscription revenue recognition", "R&D and government incentive claims", "Cap-table & secondary-transaction tax", "Burn, runway & board-pack reporting"],
    servicesIn: ["CFO Services", "Business Advisory", "Company Incorporation", "Tax & Compliance"],
  },
  {
    title: "Manufacturing",
    description:
      "Costing, GST on goods movement, and plant-level internal controls that hold at audit.",
    href: "/industries/manufacturing",
    icon: Factory,
    body: "Manufacturing margins live and die in costing data. We build plant-level controls that survive an audit, keep GST on goods movement clean across states, and make working capital predictable enough to plan capex against.",
    challenges: ["Multi-state GST on goods movement & stock transfers", "Costing systems that hold up at audit", "Plant-level internal financial controls", "Working-capital & inventory financing", "Excise, customs & PLI scheme filings"],
    servicesIn: ["Audit & Assurance", "Tax & Compliance", "CFO Services"],
  },
  {
    title: "Healthcare",
    description:
      "Clinics, hospitals, and diagnostics — medical Council / Drugs & Cosmetics compliance without the noise.",
    href: "/industries/healthcare",
    icon: HeartPulse,
    body: "Clinics, hospitals, and diagnostic chains carry a compliance load most firms treat as noise. We run it quietly — from medical-establishment registrations to the revenue and payroll structures a growing practice actually needs.",
    challenges: ["Medical Council & establishment registrations", "Drugs & Cosmetics Act touches on procurement", "Revenue & payroll structures for practices", "Capital-equipment financing & depreciation", "Insurance & TPA receivable reconciliation"],
    servicesIn: ["Tax & Compliance", "CFO Services", "Company Incorporation"],
  },
  {
    title: "Real Estate",
    description:
      "RERA, project-wise accounting, and joint-development structures for builders and investors.",
    href: "/industries/real-estate",
    icon: Building2,
    body: "Real estate pairs long project cycles with the heaviest regulatory surface in Indian business. We keep RERA accounts clean, structure joint developments so every party's tax position is defensible, and govern project-wise cash.",
    challenges: ["RERA registration & project-wise escrow accounts", "Joint-development & JDA tax structures", "GST on construction & input-credit rules", "Project accounting across phases", "Capital-gains planning on asset exits"],
    servicesIn: ["Audit & Assurance", "Tax & Compliance", "Business Advisory"],
  },
  {
    title: "Professional Services",
    description:
      "Lawyers, consultants, agencies — expertise firms that bill for judgment, not hours.",
    href: "/industries/professional-services",
    icon: Briefcase,
    body: "Law firms, consultancies, and agencies sell judgment and get paid late. We run partnership books properly, manage retainer and milestone revenue, and keep partner tax — often the firm's largest silent cost — planned, not discovered.",
    challenges: ["Partnership & LLP structures and profit shares", "Partner tax planning & drawings", "Retainer vs. milestone revenue recognition", "Work-in-progress & receivable hygiene", "Succession & retirement accounting"],
    servicesIn: ["Tax & Compliance", "Business Advisory", "Audit & Assurance"],
  },
  {
    title: "NRI & Cross-border",
    description:
      "Residential status, remittances, and treaty relief for lives and capital that cross borders.",
    href: "/industries/nri-cross-border",
    icon: Globe,
    body: "For lives and capital that cross borders, the rules run in both directions at once. We fix residential status precisely, move remittances through the correct channel, and use treaties as intended — so money crosses borders cleanly and filings hold in both countries.",
    challenges: ["Residential-status determination each year", "FEMA & repatriation of funds", "DTAA relief & foreign-tax credits", "Foreign-asset & Schedule FA reporting", "NRE/NRO account structuring"],
    servicesIn: ["International Taxation", "Tax & Compliance", "Business Advisory"],
  },
];
