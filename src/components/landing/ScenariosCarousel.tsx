"use client";

import { useState } from "react";
import { ArrowUpThinIcon } from "@/components/icons";
import { ScenarioCard } from "@/components/landing/ScenarioCard";
import { IconButton } from "@/components/ui/IconButton";
import { scenarios } from "@/data/scenarios";
import { cn } from "@/lib/cn";
import styles from "./Scenarios.module.css";

const count = scenarios.length;

/**
 * Quick templates 1394:3447 + Pagination 1394:3496.
 * Figma has no prototype connections, so the carousel simply rotates the
 * card order: state N starts the row with card N. Arrows wrap around.
 */
export function ScenariosCarousel() {
  const [index, setIndex] = useState(0);
  const ordered = scenarios.map((_, offset) => scenarios[(index + offset) % count]!);
  const step = (delta: number) => setIndex((current) => (current + delta + count) % count);

  return (
    <div role="region" aria-roledescription="карусель" aria-label="Сценарии">
      <div className={styles.carousel}>
        {/* Remount on change so the short fade-in replays (disabled by prefers-reduced-motion). */}
        <ul key={index} className={styles.row}>
          {ordered.map((scenario) => (
            <li key={scenario.id}>
              <ScenarioCard scenario={scenario} />
            </li>
          ))}
        </ul>

        {/* Arrow - left 1394:3489: icon black 70 %. Right 1394:3492: mirrored copy, icon black 100 %. */}
        <IconButton
          label="Предыдущий сценарий"
          onClick={() => step(-1)}
          className={cn(styles.arrow, styles.arrowPrev, "hover:bg-white/85")}
        >
          <ArrowUpThinIcon className="-rotate-90 text-black/70" />
        </IconButton>
        <IconButton
          label="Следующий сценарий"
          onClick={() => step(1)}
          className={cn(styles.arrow, styles.arrowNext, "hover:bg-white/85")}
        >
          <ArrowUpThinIcon className="rotate-90 text-black" />
        </IconButton>
      </div>

      <div className={styles.pagination} aria-hidden="true">
        {scenarios.map((scenario, dot) => (
          <span key={scenario.id} className={cn(styles.dot, dot === index && styles.dotActive)} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {`Позиция ${index + 1} из ${count}`}
      </p>
    </div>
  );
}
