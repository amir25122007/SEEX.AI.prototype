import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingSize = "60" | "60-tight" | "56" | "41";
export type HeadingTone = "white" | "orange";

export type HeadingLine = {
  text: ReactNode;
  tone?: HeadingTone;
  /** Per-line offset/alignment, e.g. Figma indents the second line. */
  className?: string;
};

type SectionHeadingProps = {
  lines: HeadingLine[];
  description?: ReactNode;
  size?: HeadingSize;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  descriptionClassName?: string;
};

/** Druk sizes from Figma: 60/110 %, 60/106 %, 56/104 %, 41/110 %. */
const sizes: Record<HeadingSize, string> = {
  "60": "text-display-60",
  "60-tight": "text-display-60-tight",
  "56": "text-display-56",
  "41": "text-display-41",
};

const tones: Record<HeadingTone, string> = {
  white: "text-white",
  orange: "text-orange",
};

/**
 * Two-tone stacked heading (white + orange lines) with an optional
 * IBM Plex Mono description, as used by every v3 section header.
 */
export function SectionHeading({
  lines,
  description,
  size = "60",
  as: Tag = "h2",
  id,
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-[10px]", className)}>
      <Tag id={id} className={cn("font-druk font-medium uppercase", sizes[size])}>
        {lines.map((line, index) => (
          <span key={index} className={cn("block", tones[line.tone ?? "white"], line.className)}>
            {line.text}
          </span>
        ))}
      </Tag>
      {description ? (
        <p className={cn("text-body-18 text-white", descriptionClassName)}>{description}</p>
      ) : null}
    </div>
  );
}
