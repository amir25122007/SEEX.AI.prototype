import type { ReactNode } from "react";
import { MarqueeFocusGuard } from "@/components/ui/MarqueeFocusGuard";
import { MarqueePause } from "@/components/ui/MarqueePause";
import { cn } from "@/lib/cn";
import styles from "./Marquee.module.css";

/** Copies of the content; copy 2 is the real one, drawn at the design's start frame. */
export const MARQUEE_COPIES = 5;
export const MARQUEE_REAL_COPY = 2;

type MarqueeProps = {
  direction: "left" | "right";
  /** Width of one copy, px — each copy must be exactly this wide (trailing gap included). */
  period: number;
  /** px per second. */
  speed?: number;
  /** Positions the track; place it 2 periods left of the design x so copy 2 lands on it. */
  className?: string;
  /**
   * For tracks with focusable content: keyboard focus shifts the track so the focused
   * item stays this many px inside the visible edges (see MarqueeFocusGuard).
   */
  focusInset?: number;
  /** Renders one copy; `duplicate` copies must hide themselves from assistive tech. */
  children: (copy: { index: number; duplicate: boolean }) => ReactNode;
};

/**
 * Infinite, seamless marquee: 5 identical copies moved by exactly one copy
 * (20 % of the track) per cycle. Pauses on hover and focus (MarqueePause, Web
 * Animations API); static with reduced motion. Only `transform` is animated.
 */
export function Marquee({ direction, period, speed = 40, className, focusInset, children }: MarqueeProps) {
  return (
    <div
      className={cn(styles.track, direction === "left" ? styles.left : styles.right, className)}
      style={{ animationDuration: `${period / speed}s` }}
    >
      {Array.from({ length: MARQUEE_COPIES }, (_, index) =>
        children({ index, duplicate: index !== MARQUEE_REAL_COPY }),
      )}
      <MarqueePause />
      {focusInset !== undefined ? <MarqueeFocusGuard period={period} inset={focusInset} /> : null}
    </div>
  );
}
