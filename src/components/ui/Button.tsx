import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "lime" | "dark" | "outline";
export type ButtonSize = "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional trailing element, e.g. the round arrow badge used in Figma CTAs. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "href">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-[10px] rounded-pill font-sans font-medium uppercase whitespace-nowrap transition-[background-color,box-shadow,opacity] duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  lime: "bg-lime text-ink hover:brightness-105",
  dark: "bg-page text-white",
  outline: "border border-border-strong bg-transparent text-white",
};

/** Sizes taken from Figma: header CTA (45px) and section CTAs (55px). */
const sizes: Record<ButtonSize, string> = {
  md: "h-[45px] px-[25px] text-nav-18",
  lg: "h-[55px] py-2 pr-[7px] pl-[23px] text-nav-18",
};

/**
 * Text button. Renders a Next.js <Link> when `href` is given, otherwise a
 * <button type="button">, so links and actions keep correct semantics.
 */
export function Button(props: ButtonProps) {
  const { variant = "lime", size = "md", icon, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _variant, size: _size, icon: _icon, className: _className, children: _children, ...linkProps } = props;
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _variant, size: _size, icon: _icon, className: _className, children: _children, type, ...buttonProps } = props;
  return (
    <button {...buttonProps} type={type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
