/**
 * Testimonials — locked copy (homepage). Three partner-level endorsements
 * that carry the exact anxieties the preceding sections surface: audits
 * that hold up, tax that stops surprising, advisory that changes decisions.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  firm: string;
  initials: string;
};

export const testimonialsEyebrow = "What clients say";
export const testimonialsHeading = "Trusted with the numbers that matter.";

export const testimonials: Testimonial[] = [
  {
    quote:
      "For the first time in nine years, our audit closed without a single query from the board. Sharma & Kapoor didn't just file — they anticipated every question before it was asked.",
    name: "Ananya Deshmukh",
    role: "Chief Financial Officer",
    firm: "Meridian Fabrications Pvt. Ltd.",
    initials: "AD",
  },
  {
    quote:
      "We used to brace for tax season. Now we barely notice it. Deadlines are met before we think of them, and someone always answers within the hour.",
    name: "Rohan Iyer",
    role: "Founder",
    firm: "Iyer & Co. Legal Advisors",
    initials: "RI",
  },
  {
    quote:
      "Their advisory work changed how we price. A single structuring decision they recommended has compounded into crores of retained value over three years.",
    name: "Sara Kurien",
    role: "Managing Director",
    firm: "Kurien Healthcare Group",
    initials: "SK",
  },
];
