import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A button is a promise. Solid ink (default), brass (the one hero
 * action), outline (secondary), ghost (tertiary). Radius-md, generous
 * padding, outcome-stating labels (locked Component Philosophy).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-button font-medium transition-[background-color,border-color,color,box-shadow] duration-150 ease-standard outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled-bg disabled:text-disabled-fg disabled:opacity-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-ink text-text-inverse hover:bg-brand-ink-raised active:scale-[0.98]",
        brass:
          "bg-brand-brass text-text-inverse hover:bg-brand-brass-hover active:scale-[0.98]",
        outline:
          "border border-brand-brass text-text-primary hover:bg-brand-brass-subtle hover:border-brand-brass-hover active:scale-[0.98]",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-hover-bg",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-body-s",
        md: "h-10 px-4",
        lg: "h-[52px] px-6",
        /** 1:1 icon-only action (e.g. form submit arrows). */
        smIcon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
