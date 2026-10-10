import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  type FeatureGlow,
  type IdeaCard,
  featuresIntro,
  featuresSectionGlows,
  ideaCards,
  postMock,
  resultImages,
  toolsStrip,
} from "@/data/features";
import { headerActions } from "@/data/navigation";
import { cn } from "@/lib/cn";
import styles from "./FeaturesBento.module.css";

function Glow({ glow }: { glow: FeatureGlow }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG with a blur filter
    <img
      src={glow.src}
      alt=""
      aria-hidden="true"
      className={cn(styles.glow, glow.screen && styles.screen)}
      style={{ left: glow.x, top: glow.y, width: glow.width, height: glow.height, opacity: glow.opacity }}
    />
  );
}

/** Figma "click" arrow: the same shape at 14 / 12.31 / 9.03px with its own stroke. */
function Arrow({ size, stroke, className }: { size: number; stroke: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true" focusable="false">
      <path d={`M0 ${size}L${size} 0M${size} ${size * 0.8}V0H${size * 0.2}`} stroke="currentColor" strokeWidth={stroke} />
    </svg>
  );
}

/** Orange round arrow button (48px, gradient #FF7A1A → #D8330E, white 2.2px arrow). */
function CardArrow({ label }: { label: string }) {
  return (
    <Link href={headerActions.cta.href} className={styles.cardArrow} aria-label={label}>
      <Arrow size={12.307} stroke={2.215} />
    </Link>
  );
}

function Result({ card }: { card: IdeaCard }) {
  if (card.id === "text") {
    return (
      <div className={cn(styles.preview, styles.previewText)}>
        <Glow glow={postMock.glow} />
        <div className={styles.post}>
          <p className={styles.postTitle}>{postMock.title}</p>
          <p className={styles.postText}>{postMock.text}</p>
          <p className={styles.postTags}>{postMock.tags}</p>
        </div>
        <span className={styles.tag} style={{ width: card.tagWidth }}>
          {card.tag}
        </span>
      </div>
    );
  }
  const image = resultImages[card.id];
  return (
    <div className={styles.preview}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="369px"
        className={styles.previewImage}
        style={{ top: image.top }}
      />
      <span className={styles.tag} style={{ width: card.tagWidth }}>
        {card.tag}
      </span>
      {card.id === "video" ? (
        // playButton: static preview, no player.
        <span className={styles.play} aria-hidden="true">
          <svg className={styles.playIcon} viewBox="712.6 2447.7 15.3 16.95" fill="none" focusable="false">
            <path
              d="M713.859 2447.83L727.427 2455.46C727.55 2455.53 727.653 2455.63 727.725 2455.76C727.796 2455.88 727.834 2456.02 727.834 2456.16C727.834 2456.3 727.796 2456.44 727.725 2456.56C727.653 2456.69 727.55 2456.79 727.427 2456.86L713.859 2464.49C713.737 2464.56 713.599 2464.59 713.459 2464.59C713.32 2464.59 713.183 2464.55 713.062 2464.48C712.942 2464.41 712.842 2464.31 712.772 2464.19C712.703 2464.07 712.666 2463.93 712.667 2463.79V2448.53C712.667 2448.39 712.703 2448.25 712.773 2448.13C712.842 2448.01 712.942 2447.91 713.063 2447.84C713.183 2447.77 713.32 2447.73 713.46 2447.73C713.599 2447.73 713.737 2447.76 713.859 2447.83Z"
              fill="white"
            />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

/**
 * "От идеи до готового результата" — Figma final › Frame 267, page y 1891.5–2841.2:
 * header row, three "Идея → Результат" cards and the "И ещё 50+ инструментов" strip.
 */
export function FeaturesBento() {
  return (
    <section id="features" aria-labelledby="features-title" className={styles.section}>
      <div className={styles.canvas}>
        {featuresSectionGlows.map((glow) => (
          <Glow key={glow.src} glow={glow} />
        ))}

        {/* Druk 60/106 %, lines at x 225 / 1 / 1 from the block (block x 340). */}
        <SectionHeading
          id="features-title"
          size="60-tight"
          className={styles.heading}
          descriptionClassName={styles.description}
          lines={[
            { text: featuresIntro.title[0], className: "ml-[225px]" },
            { text: featuresIntro.title[1], tone: "lime", className: "mt-[0.4px] ml-px" },
            { text: featuresIntro.title[2], tone: "lime", className: "mt-[1.12px] ml-px" },
          ]}
          description={featuresIntro.text}
        />
        <Link href={headerActions.cta.href} className={styles.cta}>
          {featuresIntro.cta}
          <Arrow size={14} stroke={2} />
        </Link>

        <ul className={styles.cards}>
          {ideaCards.map((card) => (
            <li key={card.id} className={styles.card}>
              {card.glows.map((glow) => (
                <Glow key={glow.src} glow={glow} />
              ))}
              <span className={cn(styles.label, styles.labelIdea)}>Идея</span>
              <div className={styles.prompt}>
                <span className={styles.promptText}>{card.prompt}</span>
                <span className={styles.send} aria-hidden="true">
                  <Arrow size={9.032} stroke={1.29} />
                </span>
              </div>
              <span className={cn(styles.label, styles.labelResult)}>Результат</span>
              <Result card={card} />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText} style={{ maxWidth: card.textWidth }}>
                {card.text}
              </p>
              <CardArrow label={`Создать: ${card.title}`} />
            </li>
          ))}
        </ul>

        <div className={styles.strip}>
          {toolsStrip.glows.map((glow) => (
            <Glow key={glow.src} glow={glow} />
          ))}
          <h3 className={styles.stripTitle}>{toolsStrip.title}</h3>
          <p className={styles.stripText}>{toolsStrip.text}</p>
          <ul className={styles.logos} aria-hidden="true">
            {toolsStrip.logos.map((logo) => (
              <li
                key={logo.src}
                className={cn(styles.logo, logo.rotated && styles.logoRotated)}
                style={{ left: logo.x }}
              >
                <Image src={logo.src} alt="" width={1254} height={1254} sizes="44px" className={styles.logoImage} />
              </li>
            ))}
          </ul>
          <Link href={headerActions.cta.href} className={cn(styles.cardArrow, styles.stripArrow)} aria-label="Все инструменты">
            <Arrow size={12.307} stroke={2.215} />
          </Link>
        </div>
      </div>
    </section>
  );
}
