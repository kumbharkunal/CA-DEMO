import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's single container. Max content width 1280px (locked grid),
 * page gutters: 16px mobile, 24px tablet, auto-centered beyond.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-site", className)} {...props} />;
}

/**
 * Vertical section rhythm (locked grid): 64px mobile, 80px tablet,
 * 96px desktop. Sections own their background; this owns the breathing.
 */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("section", className)} {...props} />;
}
