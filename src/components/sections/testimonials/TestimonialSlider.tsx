import { useCallback, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "./testimonials";

const slide = {
  enter: (reduced: boolean) => ({ opacity: 0, x: reduced ? 0 : 24 }),
  center: { opacity: 1, x: 0 },
  exit: (reduced: boolean) => ({ opacity: 0, x: reduced ? 0 : -24 }),
};

/** Reduced-motion: opacity-only cross-fade at a shorter duration. */
function slideTransition(reduced: boolean) {
  return reduced
    ? { duration: duration.standard, ease: easeOut }
    : { duration: duration.page, ease: easeOut };
}

/**
 * The premium testimonial slider. One quote at a time — a slider earns its
 * place over a grid only if the interaction is genuinely better, and here
 * the pause-to-read focus is. Arrow-key navigation, labelled controls, a
 * live region announcing the active quote, and reduced-motion falls the
 * slide back to a pure opacity cross-fade. No autoplay: the reader sets
 * the pace (locked motion principles).
 */
export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const paginate = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + testimonials.length) % testimonials.length),
    [testimonials.length],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    },
    [paginate],
  );

  const current = testimonials[index];

  return (
    <div onKeyDown={onKeyDown} className="outline-none" role="group" aria-roledescription="carousel" aria-label="Client testimonials">
      {/* aria-live lets screen readers hear each quote as it activates */}
      <div aria-live="polite" className="relative">
        <AnimatePresence mode="wait" initial={false} custom={reducedMotion}>
          <motion.figure
            key={index}
            custom={reducedMotion}
            variants={{
              enter: slide.enter,
              center: slide.center,
              exit: slide.exit,
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition(Boolean(reducedMotion))}
            className="mx-auto max-w-3xl text-center"
          >
            <blockquote className="font-display text-h3 leading-snug text-text-primary text-balance">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface font-sans text-caption font-medium text-brand-brass"
              >
                {current.initials}
              </span>
              <span className="text-left">
                <span className="block font-sans text-body-m font-medium text-text-primary">
                  {current.name}
                </span>
                <span className="block text-body-s text-text-muted">
                  {current.role} · {current.firm}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls — prev/next + position dots, all reachable by keyboard */}
      <div className="mt-12 flex items-center justify-center gap-6">
        <SliderButton label="Previous testimonial" onClick={() => paginate(-1)}>
          <ArrowLeft className="size-4" aria-hidden="true" />
        </SliderButton>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${testimonials.length}: ${t.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "size-2 rounded-full outline-none transition-all duration-150 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                i === index
                  ? "scale-125 bg-brand-brass"
                  : "bg-border-strong hover:bg-text-muted",
              )}
            />
          ))}
        </div>

        <SliderButton label="Next testimonial" onClick={() => paginate(1)}>
          <ArrowRight className="size-4" aria-hidden="true" />
        </SliderButton>
      </div>
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-border-default text-text-secondary outline-none transition-all duration-150 ease-standard hover:border-border-strong hover:bg-surface hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {children}
    </button>
  );
}
