import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function NavigationMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-8", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex items-center rounded-sm bg-transparent text-nav outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-disabled",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-1 size-3 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("left-0 top-0 w-full md:absolute md:w-auto", className)}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm outline-none transition-[background-color,color] duration-150 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
