import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqIntro } from "@/data/faq";
import styles from "./Faq.module.css";

/**
 * "Часто задаваемые вопросы" — Figma final › Frame 341 (x 80), page y 6618.06 (heading)
 * – 7656.76 (bottom of the last row in the start state). Answers 2–6 are drafts (see data).
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={styles.section}>
      <div className={styles.canvas}>
        <SectionHeading
          id="faq-title"
          className={styles.heading2}
          descriptionClassName={styles.description}
          lines={[
            { text: faqIntro.title[0] },
            { text: faqIntro.title[1], tone: "orange", className: "-mt-[7px] ml-[2.7px]" },
          ]}
          description={faqIntro.text}
        />
        <FaqAccordion />
      </div>
    </section>
  );
}
