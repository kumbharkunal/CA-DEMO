/**
 * Team preview — locked copy (homepage). Portraits are deliberately
 * deferred: monogram monogrammed initials stand in until photography ships,
 * so the grid never rides on empty rectangles.
 */

export type TeamMember = {
  name: string;
  role: string;
  credentials: string;
  initials: string;
  focus: string;
};

export const teamEyebrow = "The partners";
export const teamHeading = "Senior counsel, not delegation.";
export const teamSubheadline =
  "Every engagement is partner-led. You meet the people who sign the file — before you sign with us.";

export const teamMembers: TeamMember[] = [
  {
    name: "Rajesh Sharma",
    role: "Managing Partner",
    credentials: "FCA, DISA",
    initials: "RS",
    focus: "Audit & Assurance · Listed enterprises",
  },
  {
    name: "Meera Kapoor",
    role: "Partner, Tax",
    credentials: "FCA",
    initials: "MK",
    focus: "Direct tax · Litigation & representation",
  },
  {
    name: "Aditya Shroff",
    role: "Partner, Advisory",
    credentials: "CA, CFA",
    initials: "AS",
    focus: "CFO services · Fundraising & due diligence",
  },
];
