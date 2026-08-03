import { lazy, Suspense } from "react";

/**
 * Lazy boundary for the consultation form. The RHF + zod engine is heavy and
 * only needed when a visitor actually engages a consultation surface, so it
 * is code-split out of the initial bundle and fetched on demand.
 *
 * The skeleton reserves the form's approximate footprint so the lazy load
 * causes no layout shift (CLS). Heights mirror the real field rows:
 * two grid rows, a textarea, and the submit row.
 */
const ConsultationFormFields = lazy(() =>
  import("@/components/forms/ConsultationFormFields").then((m) => ({
    default: m.ConsultationFormFields,
  }))
);

export function ConsultationForm() {
  return (
    <Suspense fallback={<ConsultationFormSkeleton />}>
      <ConsultationFormFields />
    </Suspense>
  );
}

function ConsultationFormSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <div>
        <div className="mb-2 h-4 w-28 animate-pulse rounded bg-disabled-bg" />
        <div className="h-32 w-full animate-pulse rounded-md border border-border-default bg-disabled-bg" />
      </div>
      <div className="flex items-center justify-between gap-6">
        <div className="h-4 w-56 animate-pulse rounded bg-disabled-bg" />
        <div className="h-11 w-36 shrink-0 animate-pulse rounded-md bg-disabled-bg" />
      </div>
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div>
      <div className="mb-2 h-4 w-24 animate-pulse rounded bg-disabled-bg" />
      <div className="h-12 w-full animate-pulse rounded-md border border-border-default bg-disabled-bg" />
    </div>
  );
}
