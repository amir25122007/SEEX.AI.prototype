import { ScenarioCard } from "@/components/landing/ScenarioCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Scenario, scenarioRow1, scenarioRow2 } from "@/data/scenarios";
import { cn } from "@/lib/cn";
import styles from "./Scenarios.module.css";

/** Marquee copies per row; copy 2 is the real list, drawn at the Figma start frame. */
const COPIES = 5;
const REAL_COPY = 2;

function MarqueeRow({ cards, className }: { cards: Scenario[]; className?: string }) {
  return (
    <div className={cn(styles.track, className)}>
      {Array.from({ length: COPIES }, (_, copy) => {
        const duplicate = copy !== REAL_COPY;
        return (
          <ul key={copy} className={styles.list} aria-hidden={duplicate || undefined}>
            {cards.map((scenario) => (
              <li key={scenario.id}>
                <ScenarioCard scenario={scenario} duplicate={duplicate} />
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

/**
 * "Готовые сценарии" — Figma "Main page v4" › templates block, 1440×1190 at y 850.
 * The frame overlaps the Hero (0–1500); two marquee rows of 340×250 cards
 * run in opposite directions under an edge mask.
 */
export function Scenarios() {
  return (
    <section id="scenarios" aria-labelledby="scenarios-title" className={styles.section}>
      {/* glowLayer: 5 blurred ellipses, copied from the SVG export (filter bleed included). */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG with filters, no optimisation needed */}
      <img src="/images/scenarios/v4/glow.svg" alt="" aria-hidden="true" className={styles.glow} />

      <SectionHeading
        id="scenarios-title"
        className={styles.heading}
        lines={[
          { text: "Готовые сценарии" },
          { text: "под вашу задачу", tone: "orange", className: "-mt-[7px] ml-[0.5px]" },
        ]}
        description="Не нужно начинать с нуля, выберите шаблон, добавьте свой контент и получите результат за несколько шагов."
      />

      <div className={styles.rows}>
        <MarqueeRow cards={scenarioRow1} className={styles.row1} />
        <MarqueeRow cards={scenarioRow2} className={styles.row2} />
      </div>
    </section>
  );
}
