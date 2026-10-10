"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpThinIcon } from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import { Pagination } from "@/components/ui/Pagination";
import { type HowItWorksSlide, howItWorksSlides } from "@/data/howItWorks";
import { cn } from "@/lib/cn";
import styles from "./HowItWorks.module.css";

const SLIDES = howItWorksSlides;
const COUNT = SLIDES.length;
/** Clones on each side so neighbours are visible at the ends and wrapping can animate. */
const CLONES = 3;
const STRIP = [...SLIDES.slice(-CLONES), ...SLIDES, ...SLIDES.slice(0, CLONES)];

const GAP = 24; // between the outer edges (stroke included), Frame 372
const STROKE = 3.15; // raster stroke, centred on the rect
/** Canvas x of the active slide's centre: the "Сценарии" screen sits at x 445.55 … 1013.35. */
const ANCHOR = 445.551 + 567.799 / 2;

const outerWidth = (slide: HowItWorksSlide) => slide.width + (slide.kind === "raster" ? STROKE : 0);
const LEFTS = STRIP.reduce<number[]>((acc, slide, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1]! + outerWidth(STRIP[i - 1]!) + GAP);
  return acc;
}, []);
const offsetFor = (pos: number) => ANCHOR - (LEFTS[pos]! + outerWidth(STRIP[pos]!) / 2);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wrap = (index: number) => ((index % COUNT) + COUNT) % COUNT;

/**
 * "How it works" carousel: a strip of 5 logical slides moved by the arrows or
 * dots, looping in both directions (400 ms ease-out; instant with reduced motion).
 */
export function HowItWorksCarousel() {
  // Strip index; real slides live at CLONES … CLONES + COUNT − 1.
  const [pos, setPos] = useState(CLONES);
  const [animate, setAnimate] = useState(true);
  const active = wrap(pos - CLONES);

  const goTo = (target: number) => {
    // Ignore input while a wrap is settling (strip parked on a clone for ≤ 400 ms).
    if (pos !== CLONES + active) return;
    // Stepping onto a clone animates there first, then jumps to the real slide.
    const reduce = prefersReducedMotion();
    setAnimate(!reduce);
    setPos(reduce ? CLONES + wrap(target - CLONES) : target);
  };

  const settle = () => {
    const real = CLONES + wrap(pos - CLONES);
    if (real !== pos) {
      setAnimate(false);
      setPos(real);
    }
  };

  return (
    <div className={styles.carousel} role="region" aria-roledescription="карусель" aria-label="Экраны SeexAI">
      <div className={styles.viewport}>
        <div
          className={cn(styles.strip, animate && styles.stripAnimated)}
          style={{ transform: `translate3d(${offsetFor(pos)}px, 0, 0)` }}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget) settle();
          }}
        >
          {STRIP.map((slide, i) => {
            const current = i === pos;
            return (
              <div
                key={`${slide.id}-${i}`}
                className={cn(styles.slide, slide.kind === "raster" ? styles.slideRaster : styles.slideMock)}
                style={{ width: slide.width, height: slide.height }}
                role="group"
                aria-roledescription="слайд"
                aria-label={`${wrap(i - CLONES) + 1} из ${COUNT}`}
                aria-hidden={!current || undefined}
              >
                <Image
                  src={slide.src}
                  alt={current ? slide.alt : ""}
                  width={slide.intrinsic.width}
                  height={slide.intrinsic.height}
                  sizes={`${Math.ceil(slide.width)}px`}
                  className={styles.slideImage}
                />
              </div>
            );
          })}
        </div>
      </div>

      <IconButton label="Предыдущий слайд" className={cn(styles.arrow, styles.arrowPrev)} onClick={() => goTo(pos - 1)}>
        <ArrowUpThinIcon className="-rotate-90" />
      </IconButton>
      <IconButton label="Следующий слайд" className={cn(styles.arrow, styles.arrowNext)} onClick={() => goTo(pos + 1)}>
        <ArrowUpThinIcon className="rotate-90" />
      </IconButton>

      <Pagination
        className={styles.pagination}
        count={COUNT}
        active={active}
        onSelect={(index) => goTo(CLONES + index)}
        label={(index) => `Слайд ${index + 1}`}
      />
      <p className="sr-only" aria-live="polite">
        {`Слайд ${active + 1} из ${COUNT}`}
      </p>
    </div>
  );
}
