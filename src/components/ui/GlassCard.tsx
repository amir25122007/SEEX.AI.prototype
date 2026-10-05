import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

export type GlassTone = "light" | "dark";

type GlassCardProps<T extends ElementType> = {
  as?: T;
  tone?: GlassTone;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const tones: Record<GlassTone, string> = {
  /** Header-style glass: white 5 % fill, white 9 % stroke. */
  light: "bg-glass border-border-glass",
  /** Learning-block glass: #0D0805 ~60 %, white 18 % stroke. */
  dark: "bg-glass-dark border-border-subtle",
};

/**
 * Translucent surface with backdrop blur. Radius, padding and size come from
 * the caller because they differ per Figma instance.
 */
export function GlassCard<T extends ElementType = "div">({
  as,
  tone = "light",
  className,
  ...props
}: GlassCardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("border backdrop-blur-[20px]", tones[tone], className)}
      {...props}
    />
  );
}
