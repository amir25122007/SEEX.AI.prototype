/**
 * Rotating Hero title: the lime first line cycles through the scenarios every 12 s,
 * the white second line stays. `chip` is the matching quick-prompt chip under the
 * composer (highlighted while its word is shown). The first entry is the SSR frame
 * and the only one shown with reduced motion.
 */

export type HeroTitle = {
  word: string;
  chip: string;
};

export const heroTitles: HeroTitle[] = [
  { word: "ПРЕЗЕНТАЦИЯ", chip: "Презентация" },
  { word: "КАРТОЧКА ТОВАРА", chip: "Карточка товара" },
  { word: "РЕЗЮМЕ", chip: "Резюме" },
  { word: "ОТЧЁТ В EXCEL", chip: "Отчёт в Excel" },
  { word: "ОБРАБОТКА ФОТО", chip: "Обработка фото" },
];

export const heroTitleSecondLine = "ЗА ПАРУ МИНУТ";

/** Static h1 text for screen readers and search engines (the animated part is aria-hidden). */
export const heroTitleAccessible = "Презентация за пару минут";

export const HERO_TITLE_INTERVAL_MS = 12_000;
