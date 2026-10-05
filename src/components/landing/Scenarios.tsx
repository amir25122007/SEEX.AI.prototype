import { ScenariosCarousel } from "@/components/landing/ScenariosCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Scenarios.module.css";

/**
 * "Готовые сценарии" — Figma "Main page v3" › templates block (1394:3439), 1280×645 at y=1120.
 * Heading 60/110 % with the second line pulled up to 59px (Figma overlapping grid);
 * the description wraps at the heading width.
 */
export function Scenarios() {
  return (
    <Container as="section" id="scenarios" aria-labelledby="scenarios-title" className={styles.section}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG with filters, no optimisation needed */}
      <img src="/images/scenarios/glow.svg" alt="" aria-hidden="true" className={styles.glow} />

      <div className="relative flex flex-col gap-10">
        <SectionHeading
          id="scenarios-title"
          className="mx-auto w-fit"
          descriptionClassName="w-0 min-w-full"
          lines={[
            { text: "Готовые сценарии" },
            { text: "под вашу задачу", tone: "orange", className: "-mt-[7px] ml-[0.5px]" },
          ]}
          description="Не нужно начинать с нуля, выберите шаблон, добавьте свой контент и получите результат за несколько шагов."
        />
        <ScenariosCarousel />
      </div>
    </Container>
  );
}
