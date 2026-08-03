import { motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
} from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import {
  testimonialsEyebrow,
  testimonialsHeading,
  testimonials,
} from "./testimonials";
import { TestimonialSlider } from "./TestimonialSlider";

/**
 * Testimonials — social proof, delivered as one voice at a time. A quiet
 * centred reading stage with the slider beneath; the pause to read is the
 * point. Header reveals, then the first quote.
 */
export function TestimonialsSection() {
  const reducedMotion = useReducedMotion();

  const headerProps = reducedMotion
    ? {}
    : {
        variants: sectionHeaderVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <Section
      aria-labelledby="testimonials-heading"
      className="border-t border-border-default bg-background"
    >
      <Container>
        <motion.div {...headerProps} className="mx-auto max-w-2xl text-center">
          <SectionHeader
            id="testimonials-heading"
            eyebrow={testimonialsEyebrow}
            heading={testimonialsHeading}
            subheadline=""
            /* centered variant lede handled by slider focus */
          />
        </motion.div>

        <div className="mt-14">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </Container>
    </Section>
  );
}
