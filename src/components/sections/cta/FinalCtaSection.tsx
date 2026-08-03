import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { duration, easeOut } from "@/lib/motion";
import { ctaLabel, siteConfig } from "@/lib/site";
import { useBooking } from "@/components/forms/booking-context";

/**
 * Final CTA — the closing argument. Ink panel closes the page with the
 * single action the entire funnel serves; brass button for the primary,
 * ghost-inverse link for the secondary. Motion is one quiet rise, nothing
 * else — by this point the visitor has decided; the section simply
 * confirms.
 */
export function FinalCtaSection() {
  const reducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  return (
    <Section
      aria-labelledby="final-cta-heading"
      className="bg-brand-ink py-24 sm:py-28"
    >
      <Container className="max-w-4xl">
        <div>
          <p className="text-center text-eyebrow text-brand-brass-text">
            Begin the conversation
          </p>
          <motion.h2
            id="final-cta-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: duration.entrance, ease: easeOut }}
            className="mt-4 text-center font-display text-h1 text-text-inverse"
          >
            Clarity starts with one conversation.
          </motion.h2>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: duration.entrance, ease: easeOut, delay: 0.08 }}
            className="mx-auto mt-6 max-w-[58ch] text-center text-body-l leading-relaxed text-text-inverse/70"
          >
            Thirty minutes with a partner who will have read your situation
            before the call. No junior scribes. No proposal theatre. Just the
            answer to whether we should work together.
          </motion.p>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: duration.entrance, ease: easeOut, delay: 0.16 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={openBooking}
            className={buttonVariants({ variant: "brass", size: "lg" })}
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <Link
            to="/contact"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-md border border-text-inverse/25 px-6 text-button font-medium text-text-inverse transition-[border-color,background-color] duration-150 ease-standard hover:border-text-inverse/50 hover:bg-text-inverse/5 focus-visible:ring-2 focus-visible:ring-text-inverse/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
          >
            Ask your question first
          </Link>
        </motion.div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: duration.standard, ease: easeOut, delay: 0.22 }}
          className="mt-8 text-center text-body-s text-text-inverse/50"
        >
          {siteConfig.hours} · {siteConfig.phone}
        </motion.p>
      </Container>
    </Section>
  );
}
