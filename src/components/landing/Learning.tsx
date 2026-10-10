import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { headerActions } from "@/data/navigation";
import { learningCards, learningFeatures, learningIntro, learningTicker } from "@/data/learning";
import { cn } from "@/lib/cn";
import styles from "./Learning.module.css";

/**
 * Animation distance basis: one copy is 4 phrases + 4 × 78px star slots ≈ 1223px in Inter
 * (SF Pro: 1169). The loop itself is width-independent (−20 % of the track per cycle).
 */
const TICKER_PERIOD = 1223;

/** ✳ from runLine › Frame: three 2px strokes, centred in a 78px slot (x 39, y 34.01). */
function TickerStar() {
  return (
    <svg className={styles.star} width="78" height="65" viewBox="0 0 78 65" fill="none" aria-hidden="true" focusable="false">
      <path d="M39 25.51V42.51" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46.361 29.76L31.639 38.26" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.639 29.76L46.361 38.26" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <svg className={styles.soonStroke} width="100" height="39" viewBox="0 0 100 39" fill="none" aria-hidden="true" focusable="false">
              <rect x="0.5" y="0.5" width="99" height="38" rx="19" stroke="white" strokeDasharray="8 8" />
            </svg>
            {learningIntro.soon}
          </span>
        </div>

        <h2 id="learning-title" className={styles.title}>
          {learningIntro.title.map((line, index) => (
            // Final design: lines 2–3 are lime.
            <span key={line} className={cn("block", index > 0 && "text-lime")}>
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
            {levels.meta}
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
