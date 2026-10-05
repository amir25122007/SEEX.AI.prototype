import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { HeroCardLayer } from "@/components/landing/HeroCards";
import { PromptComposer } from "@/components/landing/PromptComposer";
import { heroCardsFar, heroCardsMid, heroCardsNear, heroCardsPresentation } from "@/data/heroCards";
import { cn } from "@/lib/cn";
import styles from "./Hero.module.css";

/**
 * Desktop Hero — Figma "Main page v3" › heroWrap (1404:3413), 1440×1040.
 * DOM order follows the Figma layer order (bottom → top), so no z-index juggling.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.base} aria-hidden="true" />

      <div className={styles.canvas}>
        {/* Glow ellipses + side darkening */}
        <div className={cn(styles.ellipse, styles.glowLeft)} aria-hidden="true" />
        <div className={cn(styles.ellipse, styles.glowRight)} aria-hidden="true" />
        <div className={cn(styles.layer, styles.sideRight)} aria-hidden="true" />
        <div className={cn(styles.layer, styles.sideLeft)} aria-hidden="true" />

        <p className={styles.watermark} aria-hidden="true">
          SEEX
        </p>

        {/* Floating cards: far → mid → presentation (far) → character → near */}
        <HeroCardLayer cards={heroCardsFar} />
        <HeroCardLayer cards={heroCardsMid} />
        <HeroCardLayer cards={heroCardsPresentation} />

        <div className={styles.character}>
          <Image
            src="/images/hero/ai-character.png"
            alt="AI-ассистент SeexAI"
            width={941}
            height={1672}
            sizes="482px"
            quality={90}
            loading="eager"
            fetchPriority="high"
            className={styles.characterImage}
          />
        </div>

        <HeroCardLayer cards={heroCardsNear} />

        {/* Lower domes */}
        <div className={cn(styles.ellipse, styles.ember)} aria-hidden="true" />
        <div className={cn(styles.ellipse, styles.hotRim)} aria-hidden="true" />
        <div className={cn(styles.ellipse, styles.lightHaze)} aria-hidden="true" />
        <div className={cn(styles.ellipse, styles.burgundy)} aria-hidden="true" />
        <div className={cn(styles.ellipse, styles.darkDome)} aria-hidden="true" />
      </div>

      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.canvas}>
        <div className={styles.composer}>
          <PromptComposer />
        </div>

        <div className={cn(styles.layer, styles.titleBand)} aria-hidden="true" />

        <h1 id="hero-title" className={styles.title}>
          <span className={cn(styles.titleLine, styles.titleLime)}>Презентация</span>
          <span className={cn(styles.titleLine, styles.titleWhite)}>за пару минут</span>
        </h1>
      </div>

      <Header />
    </section>
  );
}
