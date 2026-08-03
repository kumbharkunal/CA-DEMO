/**
 * Why Choose Us — locked copy (homepage).
 *
 * References: locked Homepage Experience ("Why Choose Us" as the values
 * section — differentiators stated as principles, not claims). Three
 * pillars; each is a sentence the firm's clients would repeat back.
 */

import type { LucideIcon } from "lucide-react";
import { UserCheck, Zap, FileCheck } from "lucide-react";

export type ValuePillar = {
  /** The principle, as a noun phrase. */
  title: string;
  /** One paragraph proving it — concrete enough to be checked. */
  description: string;
  icon: LucideIcon;
};

export const whyEyebrow = "Why Sharma & Kapoor";
export const whyHeading = "The discipline behind the difference.";
export const whySubheadline =
  "Not every firm treats compliance as a craft. These are the principles our clients name when they refer us.";

export const valuePillars: ValuePillar[] = [
  {
    title: "Partner-led, always",
    description:
      "No handoffs to juniors. A partner owns your file from day one and answers your call — every single time.",
    icon: UserCheck,
  },
  {
    title: "Response within 2 hours",
    description:
      "A statutory question can't wait for a queue. We commit to a reply window you can set your watch by.",
    icon: Zap,
  },
  {
    title: "Zero missed deadlines",
    description:
      "Every filing date lives in our system, not your head. 27 years of practice without a single missed statutory deadline.",
    icon: FileCheck,
  },
];
