/**
 * Keyboard users' first stop (tab order position 0). Visually hidden
 * until focused, then drops in from the top-left — designed, not defaulted.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-600 -translate-y-24 rounded-md bg-brand-ink px-4 py-2 text-sm font-medium text-text-inverse opacity-0 transition-all duration-150 ease-standard focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none"
    >
      Skip to content
    </a>
  );
}
