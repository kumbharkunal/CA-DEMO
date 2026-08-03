/**
 * Site configuration — the single source of truth for brand copy,
 * navigation structure, and contact details.
 *
 * Locked references: Homepage Experience (menu: Services, Industries,
 * Process, Insights, About; CTA always present), Navbar (Services &
 * Industries are dropdowns with one-line outcome notes; "All services"
 * footer row inside dropdowns).
 */

const SITE_URL = "https://www.sharmakapoor.in";

export const siteConfig = {
  name: "Sharma & Kapoor",
  legalName: "Sharma & Kapoor, Chartered Accountants",
  established: 1998,
  /** Canonical origin; used for canonical URLs, OG tags and JSON-LD. */
  siteUrl: SITE_URL,
  tagline: "Clarity behind every number. Confidence behind every decision.",
  description:
    "A chartered accountancy firm for founders, families, and enterprises who refuse financial guesswork — audit, tax, and advisory practiced as one discipline.",
  icaiRegistration: "FRN 012345W",
  phone: "+91 22 4890 1200",
  email: "consult@sharmakapoor.in",
  address: {
    lines: ["Level 14, One Marina Heights", "Nariman Point", "Mumbai 400021, India"],
  },
  hours: "Mon–Fri, 9:30–18:30 IST",
  social: {
    linkedin: "https://www.linkedin.com/company/sharma-kapoor",
    x: "https://x.com/sharmakapoorca",
  },
} as const;

export type NavLeaf = {
  label: string;
  href: string;
  /** One-line outcome note shown inside dropdowns (Navbar spec). */
  note?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavLeaf[];
};

export type NavItem = NavLeaf | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

export const servicesNav: NavLeaf[] = [
  { label: "Audit & Assurance", href: "/services/audit-assurance", note: "Audits that stand up to scrutiny" },
  { label: "Tax & Compliance", href: "/services/tax-compliance", note: "Never think about a deadline again" },
  { label: "Business Advisory", href: "/services/business-advisory", note: "Decisions grounded in your numbers" },
  { label: "CFO Services", href: "/services/cfo-services", note: "Senior finance leadership, on demand" },
  { label: "Company Incorporation", href: "/services/company-incorporation", note: "Incorporated correctly, the first time" },
  { label: "International Taxation", href: "/services/international-taxation", note: "Cross-border clarity, in both directions" },
];

export const industriesNav: NavLeaf[] = [
  { label: "Startups & Technology", href: "/industries/startups-technology", note: "From incorporation to ESOPs to exits" },
  { label: "Manufacturing", href: "/industries/manufacturing", note: "Costing, GST, and plant-level controls" },
  { label: "Healthcare", href: "/industries/healthcare", note: "Compliance for clinics and hospitals" },
  { label: "Real Estate", href: "/industries/real-estate", note: "RERA, project accounting, and structures" },
  { label: "Professional Services", href: "/industries/professional-services", note: "Firms that bill for expertise, run on ours" },
  { label: "NRI & Cross-border", href: "/industries/nri-cross-border", note: "Resident status, remittances, and treaties" },
];

/** Primary navigation — capped at five items by the locked Navbar spec. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", items: servicesNav },
  { label: "Industries", href: "/industries", items: industriesNav },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const ctaLabel = "Book a Consultation";
