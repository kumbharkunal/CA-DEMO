import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { Link, useLocation } from "react-router";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { duration, easeOut } from "@/lib/motion";
import type { NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  group: NavGroup;
  reducedMotion: boolean;
};

/**
 * Services / Industries dropdown (locked spec): 320px single column,
 * radius-lg, E3, glassy surface; name (H5) + one-line outcome note;
 * footer row "All X →". Caret rotates 180° over 200ms; panel opens with
 * 4px rise + fade over 250ms and closes in 150ms (exits are faster).
 */
export function NavDropdown({ group, reducedMotion }: Props) {
  const { pathname } = useLocation();
  const active = group.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
  );

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  }

  return (
    <NavigationMenuItem className="list-none">
      <NavigationMenuTrigger
        onKeyDown={onKeyDown}
        className={cn(
          "py-3 text-nav transition-colors duration-150 group-data-[condensed]:py-2.5",
          active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
        )}
      >
        {group.label}
      </NavigationMenuTrigger>

      <NavigationMenuContent
        className="left-1/2 top-full z-dropdown w-[min(320px,calc(100vw-2.5rem))] -translate-x-1/2 overflow-hidden rounded-lg bg-surface shadow-e3 hairline-b"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <motion.ul
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 2 }}
          transition={
            reducedMotion
              ? { duration: duration.micro }
              : { duration: duration.base, ease: easeOut }
          }
          className="dropdown-scroll m-0 max-h-[min(60vh,480px)] list-none overflow-y-auto p-1"
        >
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="block rounded-md px-3 py-2.5 outline-none transition-colors duration-150 hover:bg-hover-bg focus-visible:bg-hover-bg focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <span className="block text-h5 text-text-primary">{item.label}</span>
                {item.note && (
                  <span className="mt-0.5 block text-caption text-text-muted">{item.note}</span>
                )}
              </Link>
            </li>
          ))}
          <li className="sticky-b mt-1 border-t border-border-default bg-surface px-3 pb-1.5 pt-2.5">
            <Link
              to={group.href}
              className="inline-block text-caption font-medium text-text-primary outline-none transition-colors duration-150 hover:text-brand-brass focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              All {group.label.toLowerCase()} →
            </Link>
          </li>
        </motion.ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
