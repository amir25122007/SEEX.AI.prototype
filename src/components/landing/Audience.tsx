import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  type AudienceCard,
  type AudienceGlow,
  audienceCardGlows,
  audienceCards,
  audienceIntro,
  audienceSideGlows,
} from "@/data/audience";
import { headerActions } from "@/data/navigation";
import { cn } from "@/lib/cn";
import styles from "./Audience.module.css";

function Glow({ glow, style }: { glow: AudienceGlow; style: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG with a blur filter
    <img
      src={glow.src}
      alt=""
      aria-hidden="true"
      className={cn(styles.glow, glow.screen && styles.screen)}
      style={{ width: glow.width, height: glow.height, ...style }}
    />
  );
}

/** ✳ bullet: three 1px lime strokes, 7.8×9 plus the round caps (Frame 285). */
function PointStar() {
  return (
    <svg className={styles.star} width="8.8" height="10" viewBox="107.6 844.7 8.8 10" fill="none" aria-hidden="true" focusable="false">
      <path d="M112 845.202V854.202" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M115.898 847.452L108.104 851.952" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108.104 847.452L115.898 851.952" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** CTA arrow (1.8px stroke, 14.1×11.3). */
function CtaArrow() {
  return (
    <svg className={styles.ctaArrow} width="16" height="13.2" viewBox="293.1 1015.1 16 13.2" fill="none" aria-hidden="true" focusable="false">
      <path d="M294 1021.67L308.142 1021.73M302.46 1027.37L308.142 1021.73L302.511 1016.05" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Card({ card, glows, className }: { card: AudienceCard; glows: AudienceGlow[]; className?: string }) {
  return (
    <li className={cn(styles.card, className)}>
      {glows.map((glow) => (
        <Glow key={glow.src} glow={glow} style={{ left: glow.x, top: glow.y }} />
      ))}
      <span className={styles.number} aria-hidden="true">
        {card.number}
      </span>
      <span className={styles.tag}>{card.tag}</span>
      <h3 className={styles.title}>{card.title}</h3>
      <ul className={styles.points}>
        {card.points.map((point) => (
          <li key={point} className={styles.point}>
            <PointStar />
            {point}
          </li>
        ))}
      </ul>
      <p className={styles.note}>{card.note}</p>
      <Link href={headerActions.cta.href} className={styles.cta}>
        {card.cta}
        <CtaArrow />
      </Link>
    </li>
  );
}

/**
 * "SeexAI подойдёт, даже если вы только начинаете" — Figma "Main page v4" › Frame 295,
 * 1440×1561 at page y 4648. The frame has no background; its top 288px lie under
 * Learning, so the section starts at y 4936 and only the edge glows reach above / below.
 */
export function Audience() {
  return (
    <section id="audience" aria-labelledby="audience-title" className={styles.section}>
      <div className={styles.sideGlows} aria-hidden="true">
        {audienceSideGlows.right.map((glow) => (
          <Glow key={glow.src} glow={glow} style={{ right: glow.x, top: glow.y }} />
        ))}
        {audienceSideGlows.left.map((glow) => (
          <Glow key={glow.src} glow={glow} style={{ left: glow.x, top: glow.y }} />
        ))}
      </div>

      <div className={styles.canvas}>
        <SectionHeading
          id="audience-title"
          size="60-tight"
          className={styles.heading}
          // +3px: the measured first text row of the reference (5223) vs the baseline estimate.
          descriptionClassName="mt-[3px] whitespace-pre-line"
          lines={[
            { text: audienceIntro.title[0] },
            { text: audienceIntro.title[1] },
            { text: audienceIntro.title[2], tone: "orange" },
          ]}
          description={audienceIntro.text}
        />

        <ul className={styles.cards}>
          <Card card={audienceCards[0]} glows={audienceCardGlows[0]} className={styles.card1} />
          <Card card={audienceCards[1]} glows={audienceCardGlows[1]} className={styles.card2} />
        </ul>
        <span className={styles.divider} aria-hidden="true" />
      </div>
    </section>
  );
}
