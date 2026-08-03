import { createContext, useContext } from "react";

export type BookingContextValue = {
  /** Open the site-wide consultation booking dialog. */
  openBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Access the shell-owned booking dialog. Must be used within
 * BookingProvider (mounted once at the app shell).
 */
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within <BookingProvider>");
  return ctx;
}
