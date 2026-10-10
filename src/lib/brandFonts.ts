import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Licensed brand fonts. They are not in the repo yet: drop the files into /public/fonts
 * with exactly these names and rebuild — every `font-druk` / `font-neuropol` element picks
 * them up. Until then no @font-face is emitted, so the browser does not request missing
 * files (no 404s) and the fallback stack is used.
 */
const BRAND_FONTS = [
  { family: "Druk Text Wide Cyr", file: "DrukTextWideCyr-Medium.woff2", weight: 500 },
  { family: "Neuropol", file: "Neuropol-Regular.woff2", weight: 400 },
] as const;

/** Brand font files present in /public/fonts (evaluated at build time). */
function presentBrandFonts() {
  return BRAND_FONTS.filter((font) => existsSync(join(process.cwd(), "public", "fonts", font.file)));
}

/** @font-face rules for the brand fonts present in /public/fonts (font-display: swap). */
export function brandFontFaces(): string {
  return presentBrandFonts()
    .map(
      (font) =>
        `@font-face{font-family:"${font.family}";src:url("/fonts/${font.file}") format("woff2");font-weight:${font.weight};font-style:normal;font-display:swap}`,
    )
    .join("");
}

/** URLs to preload: both faces are used above the fold or right below it (hero title, headings). */
export function brandFontPreloads(): string[] {
  return presentBrandFonts().map((font) => `/fonts/${font.file}`);
}
