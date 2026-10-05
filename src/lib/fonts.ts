import { Archivo, IBM_Plex_Mono, Inter, Unbounded } from "next/font/google";

/**
 * Google fonts used by the Figma design. Each exposes a CSS variable that
 * globals.css maps onto a Tailwind font token (font-mono, font-sans, …).
 *
 * Druk Text Wide Cyr and Neuropol are licensed local fonts declared with
 * @font-face in globals.css (expected in /public/fonts).
 */

/** Body, navigation, buttons, labels, marquee, FAQ, steps. */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

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

/** Web replacement for SF Pro (prompt composer, mockup text, footer legal). */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [ibmPlexMono, archivo, unbounded, inter]
  .map((font) => font.variable)
  .join(" ");
