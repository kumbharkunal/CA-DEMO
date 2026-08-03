import type { ReactNode } from "react";
import { useConsultationForm } from "@/components/forms/useConsultationForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-md border border-border-default bg-surface px-4 py-3 text-body-m text-text-primary placeholder:text-text-muted outline-none transition-[border-color,box-shadow] duration-150 ease-standard focus:border-brand-brass focus:ring-2 focus:ring-focus-ring/30 aria-invalid:border-error";

/**
 * The full labelled grid used on the Contact page.
 * Lives in its own module so the react-hook-form + zod engine is only
 * fetched when a consultation surface actually mounts.
 */
export function ConsultationFormFields() {
  const { form, onSubmit } = useConsultationForm();
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = form;

  if (isSubmitSuccessful) {
    return (
      <div role="status" className="rounded-xl border border-brand-brass/25 bg-brand-brass/10 p-8 text-center">
        <p className="font-display text-h4 text-brand-brass">Request received.</p>
        <p className="mt-3 text-body-m leading-relaxed text-text-secondary">
          A partner will reply within one working day — from a named address,
          not a noreply.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 text-body-s font-medium text-brand-brass-text underline-offset-4 outline-none transition-colors duration-150 hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name?.message}>
          {(props) => (
            <input
              id="name"
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
              {...props}
              {...register("name")}
            />
          )}
        </Field>
        <Field id="email" label="Email address" error={errors.email?.message}>
          {(props) => (
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className={inputClass}
              {...props}
              {...register("email")}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone (optional)" error={errors.phone?.message}>
          {(props) => (
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 …"
              className={inputClass}
              {...props}
              {...register("phone")}
            />
          )}
        </Field>
        <Field id="practice" label="Practice area" error={errors.practice?.message}>
          {(props) => (
            <select id="practice" className={inputClass} {...props} {...register("practice")}>
              <option>General consultation</option>
              <option>Audit &amp; Assurance</option>
              <option>Tax &amp; Compliance</option>
              <option>Business Advisory</option>
              <option>CFO Services</option>
              <option>International Taxation</option>
              <option>Company Incorporation</option>
            </select>
          )}
        </Field>
      </div>

      <Field id="message" label="Your situation" error={errors.message?.message}>
        {(props) => (
          <textarea
            id="message"
            rows={5}
            placeholder="Two or three lines is enough — the call does the rest."
            className={`${inputClass} resize-none`}
            {...props}
            {...register("message")}
          />
        )}
      </Field>

      <div className="flex items-center justify-between gap-6">
        <p className="text-caption leading-relaxed text-text-muted">
          Replies within one working day · No obligation · Direct to a partner
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants({ variant: "brass" }), "px-6")}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: (props: { "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-body-s font-medium text-text-primary">
        {label}
      </label>
      {children({ "aria-invalid": !!error, "aria-describedby": describedBy })}
      {error && (
        <p id={describedBy} role="alert" className="mt-1.5 text-body-s text-error">
          {error}
        </p>
      )}
    </div>
  );
}
