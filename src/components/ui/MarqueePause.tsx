"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses the parent marquee track while the pointer is over it or focus is inside it.
 * Uses the Web Animations API (`pause()` / `play()` on the track's own CSS animation)
 * instead of `animation-play-state`: in WebKit the CSS pause does not hold the animation
 * time, so on resume the track jumped ahead by the paused distance. The animation is
 * never restarted or replaced, so it resumes exactly where it stopped. Renders an empty
 * marker; the track is its parent element.
 */
export function MarqueePause() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = ref.current?.parentElement;
    if (!track) return;
    let hovered = false;
    let focused = false;

    // Own animations only (not the cards' hover transitions inside the track).
    const sync = () => {
      const paused = hovered || focused;
      for (const animation of track.getAnimations()) {
        if (paused && animation.playState === "running") animation.pause();
        else if (!paused && animation.playState === "paused") animation.play();
      }
    };

    const onEnter = () => {
      hovered = true;
      sync();
    };
    const onLeave = () => {
      hovered = false;
      sync();
    };
    const onFocusIn = () => {
      focused = true;
      sync();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (track.contains(event.relatedTarget as Node | null)) return;
      focused = false;
      sync();
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("focusin", onFocusIn);
    track.addEventListener("focusout", onFocusOut);
    return () => {
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("focusin", onFocusIn);
      track.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return <span ref={ref} hidden />;
}
