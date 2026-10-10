"use client";

import { useEffect, useRef } from "react";

type MarqueeFocusGuardProps = {
  /** Width of one marquee copy, px (the animation moves the track by exactly this). */
  period: number;
  /** Distance kept from the visible edges (e.g. the width of an edge fade mask), px. */
  inset: number;
};

/**
 * Keyboard focus inside a marquee track: the row is already paused (`:focus-within`);
 * when the focused card is outside the visible area, the track is shifted (CSS `translate`)
 * so the card lands inside it. Only `:focus-visible` focus (keyboard) reacts — mouse clicks keep
 * the current behaviour. Renders an empty marker; the track is its parent element.
 */
export function MarqueeFocusGuard({ period, inset }: MarqueeFocusGuardProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = ref.current?.parentElement;
    if (!track) return;
    let offset = 0;

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target.matches(":focus-visible")) return;
      const card = (target.closest("article") ?? target) as HTMLElement;

      // Visible zone: the clipping container ∩ the viewport, minus the edge fades.
      const clip = track.parentElement!.getBoundingClientRect();
      const left = Math.max(clip.left, 0) + inset;
      const right = Math.min(clip.right, window.innerWidth) - inset;
      const box = card.getBoundingClientRect();
      let dx = 0;
      if (box.left < left) dx = left - box.left;
      else if (box.right > right) dx = right - box.right;
      if (dx === 0) return;

      // `translate` composes with the animated `transform`, so this works paused or static
      // and never jumps by a whole period (the real copy stays in place).
      offset += dx;
      track.style.translate = `${offset}px 0`;
    };

    // Leaving the row: fold the offset into (−period/2, period/2]; a whole-period jump is
    // invisible because the copies are identical, and the track never runs out of copies.
    const onFocusOut = (event: FocusEvent) => {
      if (track.contains(event.relatedTarget as Node | null)) return;
      offset -= Math.round(offset / period) * period;
      track.style.translate = offset ? `${offset}px 0` : "";
    };

    track.addEventListener("focusin", onFocusIn);
    track.addEventListener("focusout", onFocusOut);
    return () => {
      track.removeEventListener("focusin", onFocusIn);
      track.removeEventListener("focusout", onFocusOut);
    };
  }, [period, inset]);

  return <span ref={ref} hidden />;
}
