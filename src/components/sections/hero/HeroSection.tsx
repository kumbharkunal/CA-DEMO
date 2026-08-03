import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { HeroLayers } from "@/components/sections/hero/HeroLayers";
import { FloatingStatCards } from "@/components/sections/hero/FloatingStatCards";
import { useBooking } from "@/components/forms/booking-context";
import { duration, easeOut } from "@/lib/motion";
import {
  heroEyebrow,
  heroHeadline,
  heroPrimaryCta,
  heroSecondaryCta,
  heroSubheadline,
  heroTrustLine,
} from "@/lib/hero";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease: easeOut },
  },
};

/**
 * The Hero — locked as “The Reality Check”.
 * A human face first (the mesh), a question second (the headline), proof
 * third (floating compliance cards), and an invitation last (dual CTAs).
 * Entrance is choreographed: eyebrow → headline → sub → CTAs → trust line.
 * The scroll cue breathes because the next section deserves it.
 *
 * Reduced-motion users follow the exact same code path; their motion
 * variants are simply inert, so layout, landmarks, and semantics are
 * identical for every visitor.
 */
export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const containerProps = reducedMotion ? {} : { variants: containerVariants };
  const itemProps = reducedMotion ? {} : { variants: fadeUpVariants };
  const cueProps = reducedMotion
    ? {}
    : {
        animate: { scaleY: [0.1, 1, 0.1] },
        transition: { duration: 2.6, ease: "easeInOut" as const, repeat: Infinity },
      };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-hidden bg-hero"
    >
      {/* Atmosphere — mesh halo + gradient floor */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/80 via-brand-ink/60 to-brand-ink" />
        <HeroLayers />
      </div>

      {/* The grid — copy left, cards right (desktop); stacked on mobile */}
      <motion.div
        {...containerProps}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col"
      >
        <div className="container-site relative flex flex-1 flex-col justify-end pb-16 pt-32 lg:flex-row lg:items-center lg:justify-between lg:pb-0 lg:pt-24">
          {/* Left column — words, CTAs, trust */}
          <div className="max-w-4xl lg:max-w-3xl">
            <motion.div {...itemProps}>
              <Eyebrow />
            </motion.div>
            <motion.div {...itemProps}>
              <Headline />
            </motion.div>
            <motion.div {...itemProps}>
              <Subheadline />
            </motion.div>
            <motion.div {...itemProps}>
              <CtaGroup />
            </motion.div>
            <motion.div {...itemProps}>
              <TrustLine />
            </motion.div>
          </div>

          {/* Right column — three compliance floats */}
          <div className="relative mt-12 hidden min-h-[420px] flex-1 lg:mt-0 lg:block">
            <FloatingStatCards />
          </div>

          {/* Scroll cue — a breathing hairline, never a bouncing arrow */}
          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-caption uppercase tracking-[0.14em] text-text-inverse-muted">
              Scroll
            </span>
            <div className="h-8 w-px overflow-hidden">
              <motion.div
                aria-hidden="true"
                className="h-full w-px bg-brand-brass"
                style={{ transformOrigin: "top" }}
                {...cueProps}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Typography pieces ───────────────────────────────────────────────── */

function Eyebrow() {
  return (
    <p className="text-eyebrow text-brand-brass-text">
      {heroEyebrow}
    </p>
  );
}

function Headline() {
  return (
    <h1
      id="hero-heading"
      className="mt-5 max-w-[22ch] font-display text-display-l text-text-inverse lg:max-w-[20ch]"
    >
      {heroHeadline}
    </h1>
  );
}

function Subheadline() {
  return (
    <p className="mt-6 max-w-[52ch] text-body-l text-text-inverse-muted">
      {heroSubheadline}
    </p>
  );
}

function CtaGroup() {
  const { openBooking } = useBooking();
  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={openBooking}
        className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-brass px-6 text-button font-medium text-text-inverse outline-none transition-colors duration-150 ease-standard hover:bg-brand-brass-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
      >
        {heroPrimaryCta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      <Link
        to="/process"
        className="inline-flex h-12 items-center rounded-md border border-text-inverse/15 px-6 text-button font-medium text-text-inverse outline-none transition-colors duration-150 ease-standard hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
      >
        {heroSecondaryCta}
      </Link>
    </div>
  );
}

function TrustLine() {
  return (
    <p className="mt-8 text-caption uppercase tracking-[0.12em] text-text-inverse-muted">
      {heroTrustLine}
    </p>
  );
}
