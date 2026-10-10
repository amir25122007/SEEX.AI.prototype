import { Archivo, Inter, Unbounded } from "next/font/google";

/**
 * Google fonts used by the Figma design. Each exposes a CSS variable that
 * globals.css maps onto a Tailwind font token (font-sans, font-archivo, …).
 *
 * Druk Text Wide Cyr and Neuropol are licensed local fonts declared with
 * @font-face in globals.css (expected in /public/fonts).
 */

/** Logo wordmark and the large SEEX / SeexAI watermarks. */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["200", "700"],
  variable: "--font-archivo-google",
  display: "swap",
});

/** Accent elements: "AI для каждого", "1 200+". */
export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700", "800"],
  variable: "--font-unbounded-google",
  display: "swap",
});

/** Web replacement for SF Pro Text — the body font of the final design (all text except Druk headings). */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [archivo, unbounded, inter]
  .map((font) => font.variable)
  .join(" ");
