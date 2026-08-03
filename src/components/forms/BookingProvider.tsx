import { useCallback, useMemo, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogModalContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { BookingContext } from "@/components/forms/booking-context";

/**
 * Owns the single site-wide consultation dialog. Any component can open it
 * via useBooking(). Rendering one dialog instance (rather than one per
 * trigger) keeps focus management, Escape-to-close, and scroll lock in the
 * Radix layer where they belong.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogModalContent
          aria-describedby="booking-dialog-desc"
          className="flex flex-col overflow-hidden"
        >
          <div className="shrink-0 pr-10">
            <DialogTitle className="font-display text-h4 text-text-primary">
              Book a consultation
            </DialogTitle>
            <DialogDescription id="booking-dialog-desc" className="mt-2 text-body-m leading-relaxed text-text-secondary">
              Thirty minutes, on the record only if you want it to be. A partner
              replies within one working day.
            </DialogDescription>
          </div>
          <DialogClose
            aria-label="Close booking dialog"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-md text-text-muted outline-none transition-colors duration-150 hover:bg-hover hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring sm:right-5 sm:top-5"
          >
            <X className="size-4" aria-hidden="true" />
          </DialogClose>
          {/* Only the form scrolls; header + close stay pinned. On small screens
              the keyboard shrinks the viewport, and this region absorbs it. */}
          <div data-lenis-prevent className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
            <ConsultationForm />
          </div>
        </DialogModalContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
