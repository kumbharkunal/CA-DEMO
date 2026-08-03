import { ArrowRight, Clock3, Download, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { SectionHeader, sectionItemVariants, sectionHeaderVariants } from "@/components/ui/SectionHeader";
import { revealViewport } from "@/lib/motion";
import { downloadCentre } from "@/lib/downloads";
import { cn } from "@/lib/utils";

/**
 * Download Centre — the firm's public working papers, offered as checklist
 * PDFs. Entries that don't have a final file yet render disabled rather
 * than fake-link to a 404: the card explains availability instead of lying.
 */
export function DownloadCentreSection({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };
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
        variants: sectionHeaderVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <Section aria-labelledby="download-centre-heading" className={cn("border-t border-border-default bg-background", className)}>
      <Container>
        <motion.div {...headerProps} className="max-w-2xl">
          <SectionHeader
            id="download-centre-heading"
            eyebrow="Download centre"
            heading="Our working papers, as checklists."
            subheadline="The same artefacts we open an engagement with — audit readiness, GST calendars, data-room indexes — free to keep, no email gate."
          />
        </motion.div>

        <motion.ul {...listProps} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {downloadCentre.map((item) => (
            <motion.li key={item.title} {...itemProps}>
              <article className="group flex h-full flex-col rounded-xl border border-border-default bg-surface p-7 transition-[border-color,box-shadow] duration-150 ease-standard hover:border-border-strong hover:shadow-e2">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-md border border-border-default bg-background text-brand-brass" aria-hidden="true">
                    <FileText className="size-4" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-caption text-text-muted">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    {item.minutes} min
                  </span>
                </div>
                <h3 className="mt-5 font-display text-h5 text-text-primary">{item.title}</h3>
                <p className="mt-2 flex-1 text-body-s leading-relaxed text-text-secondary">{item.blurb}</p>

                {item.ready ? (
                  <a
                    href={item.href}
                    download
                    className="mt-6 inline-flex items-center gap-2 text-body-s font-medium text-brand-brass-text outline-none transition-colors duration-150 ease-standard hover:text-brand-brass-hover focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    Download PDF
                    <Download className="size-4 transition-transform duration-150 ease-standard group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="mt-6 inline-flex cursor-not-allowed items-center gap-2 text-body-s font-medium text-text-muted" aria-disabled="true">
                    Available shortly
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </p>
                )}
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
