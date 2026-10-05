import Image from "next/image";
import type { CSSProperties } from "react";
import type { Scenario } from "@/data/scenarios";
import { cn } from "@/lib/cn";
import styles from "./Scenarios.module.css";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

/** One scenario preview card: image, bottom scrim, pill, title and description. */
export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const { image, scrim, text } = scenario;
  const sizes = `${Math.ceil(scenario.width)}px`;
  const scrimStyle: CssVars = {
    left: scrim.left,
    top: scrim.top,
    width: scrim.width,
    height: scrim.height,
    "--scrim-from": scrim.from,
    "--scrim-to": scrim.to,
  };

  return (
    <article
      className={styles.card}
      style={{ width: scenario.width, height: scenario.height }}
      data-figma-node={scenario.id}
    >
      {image.crop ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className={styles.crop}
          style={{ top: `${image.crop.top}%`, height: `${image.crop.height}%` }}
        />
      ) : (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className={styles.cover} />
      )}

      <div className={styles.scrim} style={scrimStyle} aria-hidden="true" />

      <div
        className={styles.text}
        style={{ left: text.left, top: text.top, width: text.width, height: text.height }}
      >
        <span
          className={styles.pill}
          style={{ background: scenario.pill.background, color: scenario.pill.color }}
        >
          {scenario.pill.label}
        </span>
        <div className={styles.textGroup}>
          <h3
            className={cn(styles.title, scenario.titleUppercase && styles.uppercase)}
            style={{ height: scenario.titleHeight }}
          >
            {scenario.title}
          </h3>
          <p className={styles.description} style={{ width: scenario.descriptionWidth }}>
            {scenario.description}
          </p>
        </div>
      </div>
    </article>
  );
}
