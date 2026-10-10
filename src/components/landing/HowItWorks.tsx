import { HowItWorksCarousel } from "@/components/landing/HowItWorksCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksSteps } from "@/data/howItWorks";
import { cn } from "@/lib/cn";
import styles from "./HowItWorks.module.css";

/** Group 17: two rotated, blurred ellipses (exported with their filter regions). */
const GLOWS = [
  { src: "/images/how-it-works/glow-back.svg", className: styles.glowBack },
  { src: "/images/how-it-works/glow-mid.svg", className: styles.glowMid },
];

/**
 * "Путь к результату" — Figma final › how it works, 1440×1560 at page y 2521.45.
 * Heading, three steps and the screens carousel; the frame overlaps the bottom of Features.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className={styles.section}>
      {GLOWS.map((glow) => (
        // eslint-disable-next-line @next/next/no-img-element -- decorative SVG with filters, no optimisation needed
        <img key={glow.src} src={glow.src} alt="" aria-hidden="true" className={cn(styles.glow, glow.className)} />
      ))}

      <SectionHeading
        id="how-it-works-title"
        size="56"
        className={styles.heading}
        descriptionClassName={styles.description}
        lines={[
          { text: "Путь к результату" },
          { text: "всего за 3 шага", tone: "orange", className: "-mt-[0.4px] ml-[229.5px]" },
        ]}
        description={"Выберите задачу, добавьте свой контент и получите готовый результат.\nSeexAI поможет подобрать модель, промпт и настройки."}
      />

      <ol className={styles.steps}>
        {howItWorksSteps.map((step) => (
          <li key={step.number} className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
            <p className={styles.stepText}>{step.description}</p>
          </li>
        ))}
      </ol>

      <HowItWorksCarousel />
    </section>
  );
}
