import { useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeaderVariants,
  sectionItemVariants,
} from "@/components/ui/SectionHeader";
import { duration, easeOut, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  faqEyebrow,
  faqHeading,
  faqSubheadline,
  faqItems,
  type FaqItem,
} from "./faq";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/**
 * FAQ — the final objection-clearing block before the closing CTA. Hand-built
 * div disclosure (no accordion dependency): each item is h3 > button with
 * aria-expanded/aria-controls and a role="region" panel, one open at a time,
 * first open by default. The whole list ships FAQPage JSON-LD so answers are
 * eligible for search rich results.
 */
export function FaqSection() {
  const reducedMotion = useReducedMotion();
  const baseId = useId();

  const headerProps = reducedMotion
    ? {}
    : {
        variants: sectionHeaderVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const listProps = reducedMotion
    ? {}
    : {
        variants: listVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section
      aria-labelledby="faq-heading"
      className="border-t border-border-default bg-surface"
    >
      <Container>
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <motion.div {...headerProps} className="max-w-xl">
            <SectionHeader
              id="faq-heading"
              eyebrow={faqEyebrow}
              heading={faqHeading}
              subheadline={faqSubheadline}
            />
          </motion.div>

          <motion.dl {...listProps} className="divide-y divide-border-default border-y border-border-default">
            {faqItems.map((item, i) => (
              <motion.div key={item.id} {...itemProps}>
                <FaqRow
                  item={item}
                  defaultOpen={i === 0}
                  baseId={baseId}
                  reducedMotion={Boolean(reducedMotion)}
                />
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}

function FaqRow({
  item,
  defaultOpen,
  baseId,
  reducedMotion,
}: {
  item: FaqItem;
  defaultOpen: boolean;
  baseId: string;
  reducedMotion: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const buttonId = `${baseId}-${item.id}-button`;
  const panelId = `${baseId}-${item.id}-panel`;

  return (
    <div>
      <dt>
        <h3>
          <button
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <span className="font-sans text-body-l font-medium text-text-primary transition-colors duration-150 ease-standard group-hover:text-brand-brass">
              {item.question}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "size-5 shrink-0 text-text-muted transition-transform duration-200 ease-standard group-hover:text-brand-brass",
                open && "rotate-180 text-brand-brass",
              )}
            />
          </button>
        </h3>
      </dt>
      <AnimatePresence initial={false}>
        {open && (
          <motion.dd
            key="panel"
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : duration.entrance, ease: easeOut }}
            className="overflow-hidden"
          >
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="pb-6 pr-10 text-body-m leading-relaxed text-text-secondary"
            >
              {item.answer}
            </div>
          </motion.dd>
        )}
      </AnimatePresence>
    </div>
  );
}
