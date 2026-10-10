import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { footerNav, headerActions, privacyPolicy } from "@/data/navigation";
import { cn } from "@/lib/cn";
import styles from "./FinalCta.module.css";

/** Group 19: five horizontal ellipses below the frame (the first normal, the rest SCREEN). */
/**
 * Layers that cross the frame top fade in over 48px there: Figma clips them at the frame
 * edge (a visible line in the reference), the page needs a seamless join with FAQ.
 */
const topFade = (y: number) => `linear-gradient(180deg, transparent ${-y}px, #000 ${-y + 48}px)`;

const GLOWS = [
  { src: "/images/final-cta/glow-1.svg", x: -1132.07, y: -539.07, width: 3704.53, height: 2738.13, screen: false },
  { src: "/images/final-cta/glow-2.svg", x: -809.934, y: -196.8, width: 3060.27, height: 2053.6, screen: true },
  { src: "/images/final-cta/glow-3.svg", x: -447.533, y: 125.33, width: 2335.47, height: 1409.33, screen: true },
  { src: "/images/final-cta/glow-4.svg", x: -85.133, y: 397.13, width: 1610.67, height: 865.733, screen: true },
  { src: "/images/final-cta/glow-5.svg", x: 257.134, y: 604.51, width: 926.133, height: 450.987, screen: true },
];

/** Figma "click" arrow, 14px, 2px stroke. */
function ArrowIcon() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M0 14L14 0M14 11.2V0H2.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * "Начните создавать с AI уже сегодня" + footer — Figma final › Final CTA + Footer,
 * 1440×779 at page y 7756.76; the page ends with it (y 8535.76).
 */
export function FinalCta() {
  return (
    <div className={styles.frame}>
      <div className={styles.decor} aria-hidden="true">
        {GLOWS.map((glow) => (
          // eslint-disable-next-line @next/next/no-img-element -- decorative SVG with a blur filter
          <img
            key={glow.src}
            src={glow.src}
            alt=""
            className={cn(styles.layer, glow.screen && styles.screen)}
            style={{
              left: `calc(50% - 720px + ${glow.x}px)`,
              top: glow.y,
              width: glow.width,
              height: glow.height,
              ...(glow.y < 0 ? { maskImage: topFade(glow.y), WebkitMaskImage: topFade(glow.y) } : null),
            }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element -- outlined "SeexAI" watermark from the design */}
        <img src="/images/final-cta/watermark.svg" alt="" className={cn(styles.layer, styles.watermark)} />
        <Image
          src="/images/hero/ai-character.png"
          alt=""
          width={941}
          height={1672}
          sizes="490px"
          quality={90}
          className={cn(styles.layer, styles.character)}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG with a blur filter */}
        <img src="/images/final-cta/rim-light.svg" alt="" className={cn(styles.layer, styles.rim)} />
      </div>

      <section aria-labelledby="final-cta-title" className={styles.canvas}>
        <SectionHeading
          id="final-cta-title"
          size="56"
          className={styles.heading}
          descriptionClassName={styles.description}
          lines={[
            { text: "Начните создавать" },
            { text: "с AI уже сегодня", tone: "lime", className: "-mt-[0.24px]" },
          ]}
          description={"Выберите готовый шаблон или инструмент,\nзарегистрируйтесь и получите первый\nрезультат внутри SeexAI."}
        />
        <Button href={headerActions.cta.href} variant="lime" size="xl" className={styles.cta} icon={<ArrowIcon />}>
          Начать создавать
        </Button>
      </section>

      <footer className={styles.footer}>
        <nav aria-label="Навигация в подвале" className={styles.canvasFooter}>
          <ul className={styles.nav}>
            {footerNav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={cn(styles.canvasFooter, styles.legal)}>
          <p className={styles.copyright}>2026 © Все права защищены</p>
          {/* TODO: replace #privacy with the real privacy policy URL (src/data/navigation.ts). */}
          <a href={privacyPolicy.href} className={styles.legalLink}>
            {privacyPolicy.label}
          </a>
        </div>
      </footer>
    </div>
  );
}
