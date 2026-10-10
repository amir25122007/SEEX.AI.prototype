import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type AudienceGlow, audienceIntro, audienceSideGlows, audienceStats } from "@/data/audience";
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

/**
 * "SeexAI подойдёт, даже если вы только начинаете" — Figma final › Frame 295.
 * Heading, one-line subtitle and four stat cards; the frame also carries the
 * warm backdrop behind Pricing (pricingBackdrop, page y 5147.76–6387.76).
 */
export function Audience() {
  return (
    <section id="audience" aria-labelledby="audience-title" className={styles.section}>
      <div className={styles.decor} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG with blur filters */}
        <img src="/images/audience/backdrop.svg" alt="" className={styles.backdrop} />
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
          descriptionClassName={styles.description}
          lines={[
            { text: audienceIntro.title[0] },
            { text: audienceIntro.title[1] },
            { text: audienceIntro.title[2], tone: "orange" },
          ]}
          description={audienceIntro.text}
        />

        <ul className={styles.stats}>
          {audienceStats.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              {stat.glows.map((glow) => (
                <Glow key={glow.src} glow={glow} style={{ left: glow.x, top: glow.y }} />
              ))}
              <p className={styles.value}>{stat.value}</p>
              <p className={styles.label}>{stat.label}</p>
              <p className={styles.text}>{stat.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
