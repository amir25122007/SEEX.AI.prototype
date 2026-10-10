"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/cn";
import styles from "./Faq.module.css";

/** Group 18: three blurred ellipses, the same in every row, anchored to the row top. */
const GLOWS = [
  { src: "/images/faq/glow-1.svg", x: -275.678, y: -174.95, width: 1703.35, height: 639.907, screen: false },
  { src: "/images/faq/glow-2.svg", x: -35.175, y: -89.06, width: 1222.68, height: 464.136, screen: true },
  { src: "/images/faq/glow-3.svg", x: 167.516, y: -19.48, width: 817.802, height: 318.995, screen: true },
];

/** mynaui plus / minus, 19px lime strokes (1.5px, round). */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg className={styles.icon} width="21" height="21" viewBox="-1 -1 21 21" fill="none" aria-hidden="true" focusable="false">
      <path d="M0 9.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path className={cn(styles.iconVertical, open && styles.iconVerticalHidden)} d="M9.5 19V0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * FAQ accordion: several rows can be open at once, the first one is open by default.
 * Each question is a <button aria-expanded aria-controls> inside an <h3>; the answer
 * panel is a labelled region that animates its height (grid rows 0fr → 1fr).
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([faqItems[0]!.id]));

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className={styles.list}>
      {faqItems.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `faq-q-${item.id}`;
        const panelId = `faq-a-${item.id}`;
        return (
          <li key={item.id} className={cn(styles.item, isOpen && styles.itemOpen)}>
            {GLOWS.map((glow) => (
              // eslint-disable-next-line @next/next/no-img-element -- decorative SVG with a blur filter
              <img
                key={glow.src}
                src={glow.src}
                alt=""
                aria-hidden="true"
                className={cn(styles.glow, glow.screen && styles.screen)}
                style={{ left: glow.x, top: glow.y, width: glow.width, height: glow.height }}
              />
            ))}
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <ToggleIcon open={isOpen} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
