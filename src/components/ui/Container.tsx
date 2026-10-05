import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Desktop content column: 1280px, centred (80px side margins at 1440px).
 * On slightly narrower windows it shrinks to keep a minimal gutter.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-[min(var(--container-content),calc(100%-2*var(--page-gutter-min)))] max-w-(--container-content)",
        className,
      )}
      {...props}
    />
  );
}
