import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headerActions } from "@/data/navigation";
import { cn } from "@/lib/cn";
import styles from "./FeaturesBento.module.css";

const DESCRIPTION =
  "Выберите задачу и SeexAI сам подберёт нейросеть\nи настройки. Изображения, видео и тексты создаются\nв одном месте.";

/** Model badges of the "И ещё 50+ инструментов" card, left → right (x 0 / 29 / 55). */
const TOOLS = [
  { src: "/images/features/tool-ai.png", left: 0 },
  { src: "/images/features/tool-sparkle.png", left: 29 },
  { src: "/images/features/tool-v.png", left: 55 },
];

function Tag({ width, children }: { width: number; children: ReactNode }) {
  return (
    <span className={styles.tag} style={{ width }}>
      {children}
    </span>
  );
}

/** Orange round arrow "click" (54×54) — decorative, the cards have no destination yet. */
function OrangeArrow() {
  return (
    <Image
      src="/images/features/arrow-orange.svg"
      alt=""
      aria-hidden="true"
      width={54}
      height={54}
      className={styles.arrow}
    />
  );
}

function CardGlow() {
  return (
    <Image
      src="/images/features/card-glow.svg"
      alt=""
      aria-hidden="true"
      width={414}
      height={375}
      className={styles.cardGlow}
    />
  );
}

/**
 * "От идеи до готового результата" — Figma "Main page v3" › Frame 267 (1394:3355), 1280×838 at y=1845.
 * Static bento: header (text + CTA) right-aligned, then a 628 + 628 grid.
 */
export function FeaturesBento() {
  return (
    <Container as="section" id="features" aria-labelledby="features-title" className={styles.section}>
      <Image src="/images/features/glow-back.svg" alt="" aria-hidden="true" width={1839} height={1521} className={cn(styles.glow, styles.glowBack)} />
      <Image src="/images/features/glow-mid.svg" alt="" aria-hidden="true" width={1460} height={1222} className={cn(styles.glow, styles.glowMid)} />
      <Image src="/images/features/glow-front.svg" alt="" aria-hidden="true" width={1121} height={962} className={cn(styles.glow, styles.glowFront)} />

      <div className={styles.header}>
        {/* Druk 60/106 %; lines placed at x 225 / 1 / 0 and y 0 / 64 / 128 like the Figma grid. */}
        <SectionHeading
          id="features-title"
          size="60-tight"
          className="w-[595px]"
          descriptionClassName="whitespace-pre-line"
          lines={[
            { text: "От идеи", className: "ml-[225px]" },
            { text: "до готового", tone: "orange", className: "mt-[0.4px] ml-px" },
            { text: "результата", tone: "orange", className: "mt-[0.4px]" },
          ]}
          description={DESCRIPTION}
        />
        <Button
          href={headerActions.cta.href}
          variant="lime"
          size="lg"
          icon={<Image src="/images/features/arrow-dark.svg" alt="" aria-hidden="true" width={39} height={39} />}
        >
          Начать создавать
        </Button>
      </div>

      <div className={styles.grid}>
        {/* img 1394:3373 */}
        <article className={styles.imageCard}>
          <Image
            src="/images/features/images-card.png"
            alt="Портрет, созданный нейросетью"
            width={614}
            height={512}
            sizes="614px"
            className={styles.imagePhoto}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.imageStack}>
              <Tag width={72}>Фото</Tag>
              <div className={styles.imageText}>
                <div className={cn(styles.textGroup, "w-[480px] shrink-0")}>
                  <h3 className={cn(styles.title, styles.title22)}>Изображения</h3>
                  <p className={styles.text}>{DESCRIPTION}</p>
                </div>
                <OrangeArrow />
              </div>
            </div>
          </div>
        </article>

        <div className={styles.column}>
          {/* video 1394:3387 — static preview, no player. */}
          <article className={styles.videoCard}>
            <div className={styles.videoContent}>
              <div className={styles.videoInfo}>
                <Tag width={175}>Из текста или фото</Tag>
                <div className={cn(styles.textGroup, "w-full")}>
                  <h3 className={cn(styles.title, styles.title22)}>Видео</h3>
                  <p className={styles.text}>
                    {"Короткие ролики из вашей идеи с готовым сюжетом, визуалом\nи атмосферой всего за пару минут."}
                  </p>
                </div>
              </div>
              <div className={styles.videoPreview}>
                <Image
                  src="/images/features/video-preview.png"
                  alt="Кадр из видео, созданного нейросетью"
                  width={283}
                  height={253}
                  sizes="283px"
                  className={styles.videoImage}
                />
                <span className={styles.play} aria-hidden="true">
                  <Image src="/images/features/play.svg" alt="" width={24} height={24} />
                </span>
              </div>
            </div>
          </article>

          <div className={styles.row}>
            {/* 1394:3407 */}
            <article className={styles.smallCard}>
              <CardGlow />
              <div className={styles.textsContent}>
                <Tag width={195}>Для работы и контента</Tag>
                <div className={styles.textsRow}>
                  <div className={cn(styles.textGroup, styles.textsGroup)}>
                    <h3 className={cn(styles.title, styles.title20)}>Тексты</h3>
                    <p className={cn(styles.text, "w-[240px]")}>От идеи до готовой публикации</p>
                  </div>
                  <OrangeArrow />
                </div>
              </div>
            </article>

            {/* 1394:3422 */}
            <article className={styles.smallCard}>
              <CardGlow />
              <div className={styles.toolsContent}>
                <div className={styles.tools} aria-hidden="true">
                  {TOOLS.map((tool) => (
                    <span key={tool.src} className={styles.tool} style={{ left: tool.left }}>
                      <Image src={tool.src} alt="" width={1254} height={1254} sizes="36px" className={styles.toolImage} />
                    </span>
                  ))}
                </div>
                <div className={cn(styles.textGroup, "w-full")}>
                  <h3 className={cn(styles.title, styles.title20)}>{"И ещё 50+\nинструментов"}</h3>
                  <p className={cn(styles.text, "w-[184px]")}>Нейросети для любых задач</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Container>
  );
}
