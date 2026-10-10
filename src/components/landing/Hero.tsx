import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { HeroCardLayer } from "@/components/landing/HeroCards";
import { HeroScenarioProvider, HeroTitle } from "@/components/landing/HeroTitle";
import { PromptComposer } from "@/components/landing/PromptComposer";
import { heroCardsFar, heroCardsMid, heroCardsNear, heroCardsPresentation } from "@/data/heroCards";
import { cn } from "@/lib/cn";
import styles from "./Hero.module.css";

/**
 * Desktop Hero — Figma "Main page v3" › heroWrap (1404:3413), 1440×1040.
 * DOM order follows the Figma layer order (bottom → top), so no z-index juggling.
 * Content sits in centred 1440 canvases; background layers are full-bleed
 * (`.bleed`) so wide windows show no seams. Only the section clips (1500 tall).
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.base} aria-hidden="true" />

      {/* Glow ellipses + side darkening — full-bleed, anchored to the viewport edges. */}
      <div className={styles.bleed} aria-hidden="true">
        <div className={cn(styles.ellipse, styles.glowLeft)} />
        <div className={cn(styles.ellipse, styles.glowRight)} />
        <div className={cn(styles.layer, styles.sideRight)} />
        <div className={cn(styles.layer, styles.sideLeft)} />
      </div>

      <div className={styles.canvas}>
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
      </div>

      {/* Lower domes — full-bleed, widened by the extra viewport width beyond 1440. */}
      <div className={styles.bleed} aria-hidden="true">
        <div className={cn(styles.ellipse, styles.ember)} />
        <div className={cn(styles.ellipse, styles.hotRim)} />
        <div className={cn(styles.ellipse, styles.lightHaze)} />
        <div className={cn(styles.ellipse, styles.burgundy)} />
        <div className={cn(styles.ellipse, styles.darkDome)} />
      </div>

      <div className={styles.fade} aria-hidden="true" />

      {/* Title and chips share the current scenario (the chip of the shown word is lit). */}
      <HeroScenarioProvider>
        <div className={styles.canvas}>
          <div className={styles.composer}>
            <PromptComposer />
          </div>
        </div>

        <div className={styles.bleed} aria-hidden="true">
          <div className={cn(styles.layer, styles.titleBand)} />
        </div>

        <div className={styles.canvas}>
          <HeroTitle />
        </div>
      </HeroScenarioProvider>

      <Header />
    </section>
  );
}
