/**
 * Featured Services — locked content config (homepage preview).
 *
 * References: locked Homepage Experience (services present the firm's
 * *capabilities*, not a menu — the full taxonomy lives in the Services
 * dropdown). Six offerings, each written as an outcome the buyer already
 * wants, followed by the single objection it removes. Icons are abstract
 * glyphs (Lucide), 1.5px stroke — proof, not decoration.
 *
 * Order matters: assurance leads (it's the statutory anchor), advisory
 * closes (it's the aspiration). Tax / CFO / international / incorporation
 * fill the middle in descending order of engagement weight.
 */

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Calculator,
  Compass,
  Globe,
  Rocket,
  TrendingUp,
} from "lucide-react";

export type Service = {
  /** Outcome-led name — what the client gets, not what we do. */
  title: string;
  /** One line, second person; the objection this dissolves. */
  description: string;
  /** Route to the dedicated practice page. */
  href: string;
  /** Abstract proof glyph. */
  icon: LucideIcon;
};

export const servicesEyebrow = "Our services";
export const servicesHeading = "Expertise that moves the needle.";
export const servicesSubheadline =
  "From statutory audit to strategic finance leadership — every engagement is partner-led and built around one outcome: your decision, made with confidence.";
export const servicesCtaLabel = "Explore all services";
export const servicesCtaHref = "/services";
export const serviceCardCta = "Explore";

export const featuredServices: Service[] = [
  {
    title: "Audit & Assurance",
    description:
      "Statutory, internal, and IFC audits that hold up under scrutiny — so nothing surfaces at year-end.",
    href: "/services/audit-assurance",
    icon: BadgeCheck,
  },
  {
    title: "Tax & Compliance",
    description:
      "Direct, indirect, and GST handled end-to-end — deadlines met before you ever think about them.",
    href: "/services/tax-compliance",
    icon: Calculator,
  },
  {
    title: "Business Advisory",
    description:
      "Turn your numbers into decisions on pricing, structure, and growth you can defend.",
    href: "/services/business-advisory",
    icon: Compass,
  },
  {
    title: "CFO Services",
    description:
      "Senior finance leadership on demand, without a full-time hire — from MIS to board reporting.",
    href: "/services/cfo-services",
    icon: TrendingUp,
  },
  {
    title: "International Taxation",
    description:
      "Cross-border tax and transfer pricing managed in both directions, so expansion never surprises.",
    href: "/services/international-taxation",
    icon: Globe,
  },
  {
    title: "Company Incorporation",
    description:
      "Setup done right the first time — entity, registrations, and compliance from day one.",
    href: "/services/company-incorporation",
    icon: Rocket,
  },
];
