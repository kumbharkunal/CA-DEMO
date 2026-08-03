/**
 * Motion presets — one choreography system for the entire site.
 *
 * Locked references (Design System §11):
 *  - Durations: micro 100ms / hover 150ms / standard 250ms / entrances 300ms
 *    / page 400ms — nothing exceeds 500ms.
 *  - Entrances use expo-out; elements move only via transform & opacity.
 *  - Scroll reveals fire once: fade + 16px rise; sibling stagger ≤ 60ms.
 *  - Reduced-motion users get instant opacity-only cross-fades; consumers
 *    should pair these presets with `useReducedMotion()` where custom
 *    variants are written.
 */

import type { Transition, Variants } from "framer-motion";

export const duration = {
  micro: 0.1,
  hover: 0.15,
  base: 0.25, // standard
  standard: 0.25,
  entrance: 0.3,
  page: 0.4,
} as const;

/** Expo-out — the only entrance ease on this site. */
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const entranceTransition: Transition = {
  duration: duration.entrance,
  ease: easeOut,
};

/** Scroll reveal: fade + 16px rise, exactly once. */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
};

/** Parent variant — sibling stagger of 60ms. */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/** Viewport config shared by every scroll reveal. */
export const revealViewport = { once: true, amount: 0.3 } as const;

/**
 * Page transition — a single opacity cross-fade, nothing more.
 * Applied once at the Outlet level (keyed on pathname); reduced-motion
 * users get an instant swap, not a fade. Never moves; the exit is faster
 * than the entrance (leaving should feel lighter than arriving).
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.page, ease: easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.base, ease: easeOut },
  },
} as const;
