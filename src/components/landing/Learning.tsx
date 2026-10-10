import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { headerActions } from "@/data/navigation";
import { learningCards, learningFeatures, learningIntro, learningTicker } from "@/data/learning";
import { cn } from "@/lib/cn";
import styles from "./Learning.module.css";

/** One ticker copy: 4 phrases + 4 stars = 1136px (phrases advance 21px per glyph at 35px). */
const TICKER_PERIOD = 1136;

/** ✳ from runLine › Frame: three 2px strokes, centred in a 74px slot (x 37, y 33.01). */
function TickerStar() {
  return (
    <svg className={styles.star} width="74" height="65" viewBox="0 0 74 65" fill="none" aria-hidden="true" focusable="false">
      <path d="M37 24.5115V41.5115" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44.361 28.7615L29.639 37.2615" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.639 28.7615L44.361 37.2615" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Lime runLine; the bottom band repeats the top one, so it is hidden from assistive tech. */
function Ticker({ direction, className, hidden }: { direction: "left" | "right"; className?: string; hidden?: boolean }) {
  return (
    <div className={cn(styles.band, className)} aria-hidden={hidden || undefined}>
      <Marquee direction={direction} period={TICKER_PERIOD} className={styles.ticker}>
        {({ index, duplicate }) => (
          <p key={index} className={styles.tickerCopy} aria-hidden={duplicate || undefined}>
            {learningTicker.map((phrase) => (
              <span key={phrase} className={styles.tickerItem}>
                {phrase}
                <TickerStar />
              </span>
            ))}
          </p>
        )}
      </Marquee>
    </div>
  );
}

/**
 * "→" of "BEGINNER → ADVANCED", cut from the outlined Figma text: the web subsets of
 * IBM Plex Mono have no arrows. One 7.46px monospace cell (12px + 0.26 tracking);
 * the transform undoes the card's −4° so the glyph sits in the card's own frame.
 */
function LevelsArrow() {
  return (
    <svg className={styles.levelsArrow} width="7.46" height="15.6" viewBox="91.14 112.48 7.46 15.6" fill="none" aria-hidden="true" focusable="false">
      <path
        transform="rotate(4) translate(-80 -544.954)"
        d="M183.758 661.077L183.143 660.543L184.101 659.441L184.664 658.897L184.65 658.862L183.506 659.014L179.483 659.295L179.426 658.481L183.449 658.2L184.603 658.191L184.612 658.155L183.979 657.694L182.877 656.736L183.412 656.121L186.063 658.426L183.758 661.077Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Arrow from the Figma "click" icons (14×14, 2px stroke). */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M0 14L14 0M14 11.2V0H2.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * "От знакомства до реальной практики" — Figma "Main page v4" › learning block,
 * 1440×900 at page y 4036. An opaque frame (its edges sit under the lime
 * tickers); the background is full-bleed, content stays in the 1440 canvas.
 */
export function Learning() {
  const { levels, waitlist } = learningCards;
  return (
    <section id="learning" aria-labelledby="learning-title" className={styles.section}>
      {/* ---------- Background (bg group) ---------- */}
      <div className={styles.decor} aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element -- decorative SVGs with filters, no optimisation needed */}
        <img src="/images/learning/bg-back.svg" alt="" className={cn(styles.layer, styles.bgBack)} />
        <img src="/images/learning/halo.svg" alt="" className={cn(styles.layer, styles.halo)} />
        <img src="/images/learning/curve-lime.svg" alt="" className={cn(styles.layer, styles.curveLime)} />
        {/* eslint-enable @next/next/no-img-element */}
        <Image
          src="/images/hero/ai-character.png"
          alt=""
          width={941}
          height={1672}
          sizes="646px"
          quality={90}
          className={cn(styles.layer, styles.character)}
        />
        <div className={styles.bottomShade} />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG with filters */}
        <img src="/images/learning/curve-orange.svg" alt="" className={cn(styles.layer, styles.curveOrange)} />
      </div>

      <Ticker direction="left" className={styles.bandTop} />
      <Ticker direction="right" className={styles.bandBottom} hidden />

      <div className={styles.canvas}>
        {/* ---------- Left column (Frame 343) ---------- */}
        <div className={styles.badges}>
          <span className={styles.badge}>{learningIntro.badge}</span>
          <span className={styles.soon}>
            {/* Dashed inside stroke (dash 8 / gap 8) — CSS dashes cannot be sized. */}
            <svg className={styles.soonStroke} width="95" height="38" viewBox="0 0 95 38" fill="none" aria-hidden="true" focusable="false">
              <rect x="0.5" y="0.5" width="94" height="37" rx="18.5" stroke="white" strokeDasharray="8 8" />
            </svg>
            {learningIntro.soon}
          </span>
        </div>

        <h2 id="learning-title" className={styles.title}>
          {learningIntro.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.text}>{learningIntro.text}</p>
        <Link href={headerActions.cta.href} className={styles.cta}>
          {learningIntro.cta}
          <ArrowIcon />
        </Link>

        {/* ---------- Rotated cards ---------- */}
        <div className={styles.levelsCard}>
          <span className={styles.levelsIcon} aria-hidden="true">
            {levels.icon}
          </span>
          <span className={styles.levelsLabel}>{levels.label}</span>
          <p className={styles.levelsTitle}>{levels.title}</p>
          <p className={styles.levelsMeta}>
            {levels.meta[0]} <LevelsArrow /><span className="sr-only">→</span> {levels.meta[1]}
          </p>
        </div>

        <div className={styles.waitlistCard}>
          <span className={styles.waitlistLabel}>{waitlist.label}</span>
          <span className={styles.waitlistArrow} aria-hidden="true">
            <ArrowIcon className={styles.waitlistArrowIcon} />
          </span>
          <p className={styles.waitlistValue}>{waitlist.value}</p>
          <p className={styles.waitlistCaption}>{waitlist.caption}</p>
        </div>

        {/* ---------- Features (Frame 281) ---------- */}
        <ul className={styles.features}>
          {learningFeatures.map((feature) => (
            <li key={feature.number} className={styles.feature} style={{ left: feature.x, top: feature.y }}>
              <span className={styles.featureBlur} />
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG shape with filters */}
              <img src="/images/learning/union.svg" alt="" aria-hidden="true" className={styles.featureShape} />
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
              <span className={styles.featureNumber} aria-hidden="true">
                {feature.number}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
