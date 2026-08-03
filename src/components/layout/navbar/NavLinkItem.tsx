import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One nav link. Hover: brass underline draws L→R, text warms to ink.
 * Active: permanent gold gradient underline (hairline), full-ink text,
 * `aria-current="page"` for assistive tech. Padding condenses with the
 * bar via the header's `data-condensed` attribute (group selector).
 */
export function NavLinkItem({ label, href }: { label: string; href: string }) {
  const { pathname } = useLocation();
  const active = pathname === href || pathname.startsWith(href + "/");

  const underlineBase = "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left";
  const underline = active ? (
    <span className={cn(underlineBase, "bg-gradient-to-r from-brand-brass to-brand-brass/60")} />
  ) : (
    <motion.span
      className={cn(underlineBase, "bg-brand-brass")}
      initial={false}
      variants={{
        rest: { scaleX: 0, originX: 1, transition: { duration: 0.2, ease: easeOut } },
        hover: { scaleX: 1, originX: 0, transition: { duration: 0.2, ease: easeOut } },
      }}
    />
  );

  return (
    <NavigationMenuLink asChild>
      <motion.span className="inline-block" initial="rest" animate="rest" whileHover="hover">
        <Link
          to={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "relative inline-block py-3 text-nav outline-none transition-colors duration-150 group-data-[condensed]:py-2.5",
            active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
          )}
        >
          {label}
          {underline}
        </Link>
      </motion.span>
    </NavigationMenuLink>
  );
}
