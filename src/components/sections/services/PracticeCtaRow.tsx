import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useBooking } from "@/components/forms/booking-context";
import { cn } from "@/lib/utils";

/**
 * The reusable practice-detail closer — every service page ends the same
 * way: a low-pressure consultation offer beside the engagement detail.
 */
export function PracticeCtaRow({ name }: { name: string }) {
  const { openBooking } = useBooking();
  return (
    <div className="mt-14 rounded-xl border border-border-default bg-surface p-7">
      <p className="text-eyebrow text-brand-brass-text">Start here</p>
      <p className="mt-3 font-display text-h4 text-text-primary">
        Thirty minutes on {name.toLowerCase()} — before any engagement.
      </p>
      <p className="mt-2 max-w-[50ch] text-body-m leading-relaxed text-text-secondary">
        Tell us the situation; we'll tell you honestly whether you need this
        service, another one, or none of ours.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={openBooking}
          className={cn(buttonVariants({ variant: "brass" }))}
        >
          Book a consultation
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
