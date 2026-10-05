import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type IconButtonVariant = "light" | "orange" | "lime" | "dark";
export type IconButtonSize = 39 | 40 | 54 | 56;

type CommonProps = {
  /** Required: icon-only controls need an accessible name. */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    keyof CommonProps | "href" | "aria-label"
  >;
type AsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof CommonProps | "aria-label"
  >;

export type IconButtonProps = AsLink | AsButton;

const variants: Record<IconButtonVariant, string> = {
  light: "bg-white/70 text-ink shadow-control", // carousel arrows
  orange: "bg-(image:--gradient-orange-button) text-white", // card arrow buttons
  lime: "bg-lime text-ink",
  dark: "bg-ink text-white",
};

const sizes: Record<IconButtonSize, string> = {
  39: "size-[39px]",
  40: "size-10",
  54: "size-[54px]",
  56: "size-14",
};

/** Round icon-only control (link or button). */
export function IconButton(props: IconButtonProps) {
  const { label, variant = "light", size = 56, className, children } = props;
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-pill transition-opacity duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
  const icon = <span aria-hidden="true">{children}</span>;

  if (props.href !== undefined) {
    const { label: _label, variant: _variant, size: _size, className: _className, children: _children, ...linkProps } = props;
    return (
      <Link {...linkProps} aria-label={label} className={classes}>
        {icon}
      </Link>
    );
  }

  const { label: _label, variant: _variant, size: _size, className: _className, children: _children, type, ...buttonProps } = props;
  return (
    <button {...buttonProps} type={type ?? "button"} aria-label={label} className={classes}>
      {icon}
    </button>
  );
}
