import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import type { Scenario } from "@/data/scenarios";
import { headerActions } from "@/data/navigation";
import { cn } from "@/lib/cn";
import styles from "./Scenarios.module.css";

type ScenarioCardProps = {
  scenario: Scenario;
  /** Marquee copies are aria-hidden; their links are also inert (not focusable or clickable). */
  duplicate?: boolean;
};

/** One 340×250 scenario card: raster, category / format pills, title, meta and open link. */
export function ScenarioCard({ scenario, duplicate = false }: ScenarioCardProps) {
  const { image } = scenario;
  const title = scenario.title.replace("\n", " ");

  return (
    <article
      className={cn(styles.card, scenario.accent === "orange" ? styles.orange : styles.lime)}
      data-figma-node={scenario.id}
    >
      <div className={styles.media}>
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="340px"
          className={styles.image}
          style={{ top: image.top }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={cn(styles.pill, styles.category)}>{scenario.category}</span>
          <span className={cn(styles.pill, styles.format)}>{scenario.format}</span>
        </div>
        <div className={styles.bottom}>
          <h3 className={styles.title}>{scenario.title}</h3>
          <div className={styles.metaRow}>
            <p className={styles.meta}>{scenario.meta}</p>
            <a
              href={headerActions.cta.href}
              className={styles.open}
              aria-label={`Открыть сценарий: ${title}`}
              inert={duplicate}
            >
              <ArrowUpRightIcon className={styles.openIcon} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
