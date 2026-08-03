import { useState } from "react";
import type { FormEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The footer's one value-proposition: a monthly letter from the partners.
 * A single email field doesn't need a form engine — native constraint
 * validation keeps this component out of the main bundle's react-hook-form +
 * zod payload, so the footer stays light and first paint stays fast.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("An email address is required");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("Enter a valid email address");
      return;
    }
    setError(null);
    setSubmitting(true);
    // TODO: wire to the firm's list provider (e.g. Resend/Buttondown API).
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setEmail("");
    }, 600);
  }

  if (done) {
    return (
      <p
        role="status"
        className="flex items-center gap-2.5 rounded-md border border-brand-brass/25 bg-brand-brass/10 px-4 py-3 text-body-s text-brand-brass"
      >
        <Check className="size-4 shrink-0" aria-hidden="true" />
        You're on the list. The next letter arrives on the first Monday.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-md border border-border-default bg-surface px-4 text-body-m text-text-primary placeholder:text-text-muted outline-none transition-[border-color,box-shadow] duration-150 ease-standard focus:border-brand-brass focus:ring-2 focus:ring-focus-ring/30 aria-invalid:border-error"
        />
        <button
          type="submit"
          disabled={submitting}
          className={buttonVariants({ variant: "brass", size: "smIcon" })}
          aria-label={submitting ? "Subscribing…" : "Subscribe to the letter"}
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-body-s text-error">
          {error}
        </p>
      )}
      <p className="mt-3 text-caption leading-relaxed text-text-muted">
        Six to eight lines on tax, audit, and money — once a month. No
        marketing, no forwarding. Unsubscribe in one click.
      </p>
    </form>
  );
}
