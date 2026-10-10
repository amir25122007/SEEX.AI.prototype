import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import type {
  HeroAppCard,
  HeroCard,
  HeroCardImage,
  HeroPhotoCard,
  HeroPresentationCard,
} from "@/data/heroCards";
import { cn } from "@/lib/cn";
import styles from "./HeroCards.module.css";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

/** Stable per-card hash so periods / phases differ but never change between renders. */
function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return h >>> 0;
}

type FloatAxis = { duration: number; delay: number; reverse: boolean };

/**
 * Idle float timing: X 9–14 s, Y 7–11 s, never an integer ratio (no repeating
 * Lissajous loop), negative delays for a random phase, random start direction.
 */
function floatTiming(card: HeroCard): { x: FloatAxis; y: FloatAxis } {
  const h = hash(card.id);
  const y = 7 + ((h >>> 8) % 41) / 10;
  let x = 9 + (h % 51) / 10;
  const ratio = x / y;
  if (Math.abs(ratio - Math.round(ratio)) < 0.08) x = x >= 13.5 ? x - 0.7 : x + 0.7;
  return {
    x: { duration: x, delay: -(((h >>> 4) % 1000) / 1000) * x, reverse: ((h >>> 20) & 1) === 1 },
    y: { duration: y, delay: -(((h >>> 14) % 1000) / 1000) * y, reverse: ((h >>> 24) & 1) === 1 },
  };
}

function axisStyle(axis: FloatAxis): CSSProperties {
  return {
    animationDuration: `${axis.duration}s`,
    animationDelay: `${axis.delay.toFixed(3)}s`,
    animationDirection: axis.reverse ? "alternate-reverse" : "alternate",
  };
}

const FLOAT_X = { far: styles.floatXFar, mid: styles.floatXMid, near: styles.floatXNear };
const FLOAT_Y = { far: styles.floatYFar, mid: styles.floatYMid, near: styles.floatYNear };

/** Absolute geometry + Figma effects shared by every card. */
function cardStyle(card: HeroCard): CssVars {
  return {
    borderRadius: card.radius,
    opacity: card.opacity,
    // Figma layer blur R ≈ CSS blur(R / 2).
    filter: `blur(${card.blur / 2}px)`,
    boxShadow: `0 0 ${card.glow.blur}px ${card.glow.spread}px rgb(194 239 75 / 0.94)`,
    "--stroke-w": `${card.stroke.width}px`,
    "--u": `${card.unit}px`,
  };
}

function CardImage({ image, width }: { image: HeroCardImage; width: number }) {
  const sizes = `${Math.ceil(width)}px`;
  if (image.fit === "crop") {
    return (
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={styles.crop}
        style={{ top: `${image.offsetTop ?? 0}%` }}
      />
    );
  }
  return <Image src={image.src} alt="" fill sizes={sizes} className={styles.cover} />;
}

function AppCard({ card }: { card: HeroAppCard }) {
  return (
    <>
      <div className={styles.appShade} />
      <div className={styles.topRow}>
        <span className={cn(styles.pill, styles.pillLime)}>{card.category}</span>
        <span className={cn(styles.pill, styles.pillGlass, styles.frost)}>{card.format}</span>
      </div>
      <div className={styles.bottom}>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.description}>{card.description}</p>
        <div className={styles.metaRow}>
          <span className={styles.meta}>{card.meta}</span>
          <span className={styles.open}>
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </>
  );
}

function PresentationCard({ card }: { card: HeroPresentationCard }) {
  return (
    <>
      <div className={styles.appShade} />
      <div className={styles.topRow}>
        <span className={cn(styles.pill, styles.pillLime)}>{card.category}</span>
        <span className={styles.badges}>
          <span className={cn(styles.pill, styles.pillGlassDark, styles.frost)}>{card.format}</span>
          <span className={cn(styles.pill, styles.pillGlass, styles.frost)}>{card.popular}</span>
        </span>
      </div>
      <div className={styles.bottom}>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.description}>{card.description}</p>
        <div className={styles.chips}>
          {card.chips.map((chip) => (
            <span key={chip} className={cn(styles.pill, styles.pillGlass)}>
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.metaRow}>
          <span className={styles.meta}>{card.meta}</span>
          <span className={styles.cta}>
            {card.cta}
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </>
  );
}

function PhotoCard({ card }: { card: HeroPhotoCard }) {
  const scrimStyle: CssVars = {
    top: card.scrim.top,
    "--scrim-from": card.scrim.from,
    "--scrim-to": card.scrim.to,
  };
  return (
    <>
      <div className={styles.scrim} style={scrimStyle} />
      <div
        className={styles.photoText}
        style={{
          left: card.text.left,
          top: card.text.top,
          width: card.text.width,
          height: card.text.height,
          gap: card.text.gap,
        }}
      >
        <span
          className={styles.photoPill}
          style={{ background: card.pill.background, color: card.pill.color }}
        >
          {card.pill.label}
        </span>
        <div>
          <p
            className={cn(
              card.titleFont === "unbounded" ? styles.photoTitleUnbounded : styles.photoTitle,
              card.titleUppercase && styles.uppercase,
            )}
          >
            {card.title}
          </p>
          <p className={styles.photoDescription}>{card.description}</p>
        </div>
      </div>
    </>
  );
}

/**
 * One decorative floating card (aria-hidden: purely visual composition).
 * Two wrappers carry the idle float (X and Y, independent sine waves) so the
 * card itself — with its blur filter and glow — is never repainted per frame.
 */
export function HeroFloatingCard({ card }: { card: HeroCard }) {
  const timing = floatTiming(card);
  return (
    <div
      className={cn(styles.floatX, FLOAT_X[card.layer])}
      style={{ left: card.x, top: card.y, width: card.width, height: card.height, ...axisStyle(timing.x) }}
    >
      <div className={cn(styles.floatY, FLOAT_Y[card.layer])} style={axisStyle(timing.y)}>
        <div
          className={cn(
            styles.card,
            card.kind !== "photo" && styles.app,
            card.kind === "presentation" && styles.presentation,
            card.stroke.align === "inside" ? styles.strokeInside : styles.strokeOutside,
          )}
          style={cardStyle(card)}
          data-figma-node={card.id}
        >
          <CardImage image={card.image} width={card.width} />
          {card.kind === "app" && <AppCard card={card} />}
          {card.kind === "presentation" && <PresentationCard card={card} />}
          {card.kind === "photo" && <PhotoCard card={card} />}
        </div>
      </div>
    </div>
  );
}

/** A full-canvas layer (like Figma's cardsFar / cardsMid / cardsNear). */
export function HeroCardLayer({ cards, className }: { cards: HeroCard[]; className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 top-0 h-[1040px]", className)} aria-hidden="true">
      {cards.map((card) => (
        <HeroFloatingCard key={card.id} card={card} />
      ))}
    </div>
  );
}
