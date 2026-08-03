import type { ReactNode } from "react";

/**
 * Tooltip provider stub. The real Radix-backed implementation arrives
 * with the first component that needs tooltips — the foundation ships
 * no unused primitives (dead code is a trust leak).
 */
export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
