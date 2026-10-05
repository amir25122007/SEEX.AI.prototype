/**
 * "Готовые сценарии" cards — Figma "Main page v3" › templates block (1394:3439) › Row 1.
 * Every value below is read from Figma (px).
 *
 * Inner coordinates (scrim, text) are relative to the card's padding box, i.e.
 * inside the 3px lime border, exactly like Figma's generated layout.
 */

export type ScenarioImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Figma CROP: full width, given height and top offset (% of the padding box). */
  crop?: { top: number; height: number };
};

export type Scenario = {
  id: string; // Figma node id
  width: number;
  height: number;
  image: ScenarioImage;
  /** Bottom gradient: black `from` → `to` opacity. */
  scrim: { left: number; top: number; width: number; height: number; from: number; to: number };
  /** Text frame: pill at the top, title + description at the bottom. */
  text: { left: number; top: number; width: number; height: number };
  pill: { label: string; background: string; color: string };
  title: string;
  titleUppercase: boolean;
  /** Fixed title box height: 28 for one line, 56 for two. */
  titleHeight: number;
  description: string;
  descriptionWidth?: number;
};

const LIME_PILL = { background: "#C2EF4B", color: "#000000" } as const;

export const scenarios: Scenario[] = [
  {
    id: "1394:3449",
    width: 284.2,
    height: 342.2,
    image: {
      src: "/images/hero/card-presentation.png",
      width: 736,
      height: 1308,
      alt: "Пример сгенерированной презентации",
    },
    scrim: { left: 37.6, top: 186.95, width: 243.6, height: 152.25, from: 0.08, to: 0.98 },
    text: { left: 14.4, top: 17.3, width: 204.45, height: 301.6 },
    pill: { label: "Документы", ...LIME_PILL },
    title: "Презентация",
    titleUppercase: true,
    titleHeight: 28,
    description: "Структура и текст слайдов",
  },
  {
    id: "1394:3457",
    width: 374.1,
    height: 394.4,
    image: {
      src: "/images/hero/card-product.png",
      width: 720,
      height: 1277,
      alt: "Пример визуала для карточки товара на маркетплейсе",
    },
    scrim: { left: -3, top: 220.3, width: 374.1, height: 171.1, from: 0.04, to: 0.98 },
    text: { left: 14.4, top: 17.3, width: 327.7, height: 355.25 },
    pill: { label: "Маркетплейс", ...LIME_PILL },
    title: "Карточка товара",
    titleUppercase: true,
    titleHeight: 28,
    description: "Продающая карточка\nс инфографикой для WB, Ozon\nи Маркета.",
  },
  {
    id: "1394:3465",
    width: 234.9,
    height: 301.6,
    image: {
      src: "/images/hero/card-resume.png",
      width: 736,
      height: 1349,
      alt: "Человек просматривает вакансии на смартфоне",
      crop: { top: -21.38, height: 142.75 },
    },
    scrim: { left: -3, top: 165.2, width: 234.9, height: 133.4, from: 0, to: 0.9 },
    text: { left: 14.4, top: 15.85, width: 189.95, height: 269.7 },
    pill: { label: "Работа", background: "#E8500F", color: "#FFFFFF" },
    title: "Резюме под вакансию",
    titleUppercase: false,
    titleHeight: 56,
    description: "Подгоним опыт\nпод требования",
  },
  {
    id: "1394:3473",
    width: 414.7,
    height: 368.3,
    image: {
      src: "/images/scenarios/card-report.png",
      width: 736,
      height: 589,
      alt: "Человек работает над отчётом за столом",
    },
    scrim: { left: -3, top: 220.3, width: 414.7, height: 145, from: 0.08, to: 0.98 },
    text: { left: 14.4, top: 17.3, width: 327.7, height: 327.7 },
    pill: { label: "Обучение", ...LIME_PILL },
    title: "Отчёт в Excel",
    titleUppercase: true,
    titleHeight: 28,
    description: "Понятный отчёт с выводами",
  },
  {
    id: "1394:3481",
    width: 298.7,
    height: 330.6,
    image: {
      src: "/images/hero/card-photo.png",
      width: 736,
      height: 736,
      alt: "Пример обработанного портретного фото",
    },
    scrim: { left: -3, top: 197.1, width: 281.3, height: 130.5, from: 0, to: 0.99 },
    text: { left: 14.4, top: 17.3, width: 204.45, height: 295.8 },
    pill: { label: "Изображения", background: "#FF6A00", color: "#FFFFFF" },
    title: "Обработка фото",
    titleUppercase: true,
    titleHeight: 56,
    description: "Ретушь, замена фона, свет и цвет одной командой.",
    descriptionWidth: 204,
  },
];
