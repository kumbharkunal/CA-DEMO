import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LenisProvider } from "@/app/providers/LenisProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Composition root for every cross-cutting provider.
 * MotionConfig bridges the app's reduced-motion sensing into all
 * framer-motion animations sitewide.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <LenisProvider>{children}</LenisProvider>
      </TooltipProvider>
    </MotionConfig>
  );
}
