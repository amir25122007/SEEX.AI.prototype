import { ScenarioCard } from "@/components/landing/ScenarioCard";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Scenario, scenarioRow1, scenarioRow2 } from "@/data/scenarios";
import { cn } from "@/lib/cn";
import styles from "./Scenarios.module.css";

/** Card 340 + gap 20: one copy of a row is cards × 360 px. */
const CARD_STEP = 360;

function MarqueeRow({
  cards,
  direction,
  className,
}: {
  cards: Scenario[];
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <Marquee
      direction={direction}
      period={cards.length * CARD_STEP}
      className={cn(styles.track, className)}
      // Keep a focused card clear of the 230.4px edge fades.
      focusInset={240}
    >
      {({ index, duplicate }) => (
        <ul key={index} className={styles.list} aria-hidden={duplicate || undefined}>
          {cards.map((scenario) => (
            <li key={scenario.id}>
              <ScenarioCard scenario={scenario} duplicate={duplicate} />
            </li>
          ))}
        </ul>
      )}
    </Marquee>
  );
}

/**
 * "Готовые сценарии" — Figma final › templates block, frame at page y 755.
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
          { text: "под вашу задачу", tone: "lime", className: "-mt-[7px] ml-[0.5px]" },
        ]}
        // SF Pro Text 22/30 → Inter, centred; first baseline at page 1195 (frame 440).
        descriptionClassName={styles.description}
        description={"Не нужно начинать с нуля: выберите сценарий,\nдобавьте свой контент и получите результат за несколько шагов."}
      />

      <div className={styles.rows}>
        <MarqueeRow cards={scenarioRow1} direction="left" className={styles.row1} />
        <MarqueeRow cards={scenarioRow2} direction="right" className={styles.row2} />
      </div>
    </section>
  );
}
