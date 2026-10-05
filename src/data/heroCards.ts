/**
 * Floating scenario cards of the Hero — Figma "Main page v3" › heroWrap.
 * Every value below is read from Figma (hero-block coordinates, px).
 *
 * Effects: `blur` and glow values are the raw Figma numbers. Layer blur is
 * converted to CSS as blur/2 (Figma exports blur 180 as stdDeviation 90).
 */

export type HeroCardLayer = "far" | "mid" | "near";

export type HeroCardImage = {
  src: string;
  width: number;
  height: number;
  /**
   * cover — Figma FILL (centred cover).
   * crop  — Figma CROP: full image width, shifted up by `offsetTop` (% of card height).
   */
  fit: "cover" | "crop";
  offsetTop?: number;
};

type HeroCardBase = {
  id: string; // Figma node id
  layer: HeroCardLayer;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  opacity: number;
  blur: number; // Figma layer blur
  glow: { blur: number; spread: number }; // lime #C2EF4B @ 94 %
  stroke: { width: number; align: "inside" | "outside" }; // lime
  image: HeroCardImage;
};

/** "App" cards: category + format pills, title, description, meta + round open button. */
export type HeroAppCard = HeroCardBase & {
  kind: "app";
  /** Base unit = card padding; every inner size is a multiple of it. */
  unit: number;
  category: string;
  format: string;
  title: string;
  description: string;
  meta: string;
};

/** Presentation "app" card: extra badges, feature chips and a CTA pill. */
export type HeroPresentationCard = HeroCardBase & {
  kind: "presentation";
  unit: number;
  category: string;
  format: string;
  popular: string;
  title: string;
  description: string;
  chips: string[];
  meta: string;
  cta: string;
};

/** Photo cards: coloured pill on top, title + description over a bottom scrim. */
export type HeroPhotoCard = HeroCardBase & {
  kind: "photo";
  /** Base unit = body font size; pill, title and paddings scale from it. */
  unit: number;
  text: { left: number; top: number; width: number; height: number; gap: number };
  scrim: { top: number; from: number; to: number };
  pill: { label: string; background: string; color: string };
  title: string;
  titleFont: "druk" | "unbounded";
  titleUppercase: boolean;
  description: string;
};

export type HeroCard = HeroAppCard | HeroPresentationCard | HeroPhotoCard;

const IMG = {
  presentation: { src: "/images/hero/card-presentation.png", width: 736, height: 1308 },
  product: { src: "/images/hero/card-product.png", width: 720, height: 1277 },
  resume: { src: "/images/hero/card-resume.png", width: 736, height: 1349 },
  photo: { src: "/images/hero/card-photo.png", width: 736, height: 736 },
  productApp: { src: "/images/hero/card-product-app.png", width: 736, height: 981 },
  photoApp: { src: "/images/hero/card-photo-app.png", width: 736, height: 912 },
  reportApp: { src: "/images/hero/card-report-app.png", width: 736, height: 548 },
  resumeApp: { src: "/images/hero/card-resume-app.png", width: 736, height: 920 },
} as const;

const PRODUCT_APP = {
  category: "Маркетплейс",
  format: "JPG · PNG",
  title: "Карточка товара",
  description: "Фото со смартфона и готова продающая карточка с инфографикой для WB, Ozon\nи Маркета.",
  meta: "≈ 6 КРЕДИТОВ, 2 МИНУТЫ",
};

const PRESENTATION_APP = {
  category: "Документы",
  format: "PPTX, PDF",
  popular: "Самый популярный",
  title: "Презентация",
  description:
    "Задаёте тему и аудиторию и получаете структуру, текст каждого слайда и заметки спикера. Правите план до генерации.",
  chips: ["10–20 слайдов", "Заметки спикера", "Любая модель"],
  meta: "≈ 30 КРЕДИТОВ, 2 МИНУТЫ",
  cta: "Собрать презентацию",
};

const RESUME_PHOTO = {
  pill: { label: "Работа", background: "#E8500F", color: "#FFFFFF" },
  title: "Резюме под вакансию",
  titleFont: "druk",
  titleUppercase: false,
  description: "Подгоним опыт\nпод требования",
} as const;

const PHOTO_PHOTO = {
  pill: { label: "Изображения", background: "#FF6A00", color: "#FFFFFF" },
  title: "Обработка фото",
  titleFont: "druk",
  titleUppercase: true,
  description: "Ретушь, замена фона, свет и цвет одной командой.",
} as const;

/** Far layer — cardsFar (1394:4168) + the two farPresentationApp frames. */
export const heroCardsFar: HeroCard[] = [
  {
    id: "1394:4169",
    kind: "app",
    layer: "far",
    x: -20,
    y: 650,
    width: 157.2,
    height: 135,
    radius: 9.9,
    opacity: 0.38,
    blur: 3.5,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 4, align: "inside" },
    image: { ...IMG.productApp, fit: "cover" },
    unit: 9,
    ...PRODUCT_APP,
  },
  {
    id: "1394:4182",
    kind: "app",
    layer: "far",
    x: 1245,
    y: 667,
    width: 208.44,
    height: 179,
    radius: 13.13,
    opacity: 0.38,
    blur: 4.64,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 4, align: "inside" },
    image: { ...IMG.productApp, fit: "cover" },
    unit: 11.93,
    ...PRODUCT_APP,
  },
  {
    id: "1394:4195",
    kind: "app",
    layer: "far",
    x: 175,
    y: 519,
    width: 150,
    height: 128.82,
    radius: 9.45,
    opacity: 0.45,
    blur: 3.5,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 4, align: "inside" },
    image: { ...IMG.photoApp, fit: "crop", offsetTop: -5.8 },
    unit: 8.59,
    category: "Изображения",
    format: "JPG, PNG",
    title: "Обработка фото",
    description: "Ретушь, замена фона, свет и цвет одной командой.",
    meta: "≈ 4 КРЕДИТА / ФОТО",
  },
];

/** Mid layer — cardsMid (1394:4208). */
export const heroCardsMid: HeroCard[] = [
  {
    id: "1394:4209",
    kind: "photo",
    layer: "mid",
    x: 384.45,
    y: 272,
    width: 115.27,
    height: 148,
    radius: 9.81,
    opacity: 0.55,
    blur: 1.9,
    glow: { blur: 24.82, spread: 1.67 },
    stroke: { width: 2.62, align: "inside" },
    image: { ...IMG.resume, fit: "crop", offsetTop: -21.43 },
    unit: 8.54,
    text: { left: 8.54, top: 9.25, width: 93.21, height: 132.35, gap: 2.13 },
    scrim: { top: 82.54, from: 0, to: 0.9 },
    ...RESUME_PHOTO,
  },
  {
    id: "1394:4217",
    kind: "photo",
    layer: "mid",
    x: 184,
    y: 812,
    width: 115.27,
    height: 148,
    radius: 9.81,
    opacity: 0.55,
    blur: 1.9,
    glow: { blur: 24.82, spread: 1.67 },
    stroke: { width: 2.62, align: "inside" },
    image: { ...IMG.resume, fit: "crop", offsetTop: -21.43 },
    unit: 8.54,
    text: { left: 8.54, top: 9.25, width: 93.21, height: 132.35, gap: 2.13 },
    scrim: { top: 82.54, from: 0, to: 0.9 },
    ...RESUME_PHOTO,
  },
  {
    id: "1394:4225",
    kind: "photo",
    layer: "mid",
    x: 1116,
    y: 621.85,
    width: 171,
    height: 189.26,
    radius: 11.45,
    opacity: 0.55,
    blur: 1.64,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 3.4, align: "inside" },
    image: { ...IMG.photo, fit: "cover" },
    unit: 9.96,
    text: { left: 9.96, top: 11.62, width: 117.04, height: 169.34, gap: 2.49 },
    scrim: { top: 114.59, from: 0, to: 0.99 },
    ...PHOTO_PHOTO,
  },
  {
    id: "1394:4233",
    kind: "photo",
    layer: "mid",
    x: 914,
    y: 211,
    width: 69.81,
    height: 77.26,
    radius: 4.67,
    opacity: 0.55,
    blur: 2.5,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 1.39, align: "inside" },
    image: { ...IMG.photo, fit: "cover" },
    unit: 4.07,
    text: { left: 4.07, top: 4.74, width: 47.78, height: 69.13, gap: 1.02 },
    scrim: { top: 46.78, from: 0, to: 0.99 },
    ...PHOTO_PHOTO,
  },
  {
    id: "1394:4241",
    kind: "app",
    layer: "mid",
    x: 112.91,
    y: 133,
    width: 210.76,
    height: 181,
    radius: 13.27,
    opacity: 0.55,
    blur: 2.66,
    glow: { blur: 26.44, spread: 1.77 },
    stroke: { width: 3.55, align: "outside" },
    image: { ...IMG.reportApp, fit: "cover" },
    unit: 12.07,
    category: "Документы",
    format: "XLSX",
    title: "Отчёт в Excel",
    description: "Таблица с формулами, сводкой и выводами из ваших данных.",
    meta: "≈ 12 КРЕДИТОВ, 2 МИН",
  },
  {
    id: "1394:4254",
    kind: "app",
    layer: "mid",
    x: 1099.39,
    y: 143,
    width: 178.41,
    height: 199.4,
    radius: 11.54,
    opacity: 0.55,
    blur: 1.81,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 3.62, align: "inside" },
    image: { ...IMG.resumeApp, fit: "cover" },
    unit: 10.49,
    category: "Работа и карьера",
    format: "PDF, DOCX",
    title: "Резюме под вакансию",
    description: "Подгоним опыт под конкретную вакансию: акценты, ключевые слова, структура.",
    meta: "≈ 8 КРЕДИТОВ, 1 МИН",
  },
];

/**
 * The two farPresentationApp frames sit directly in the hero block,
 * above cardsMid and below the character (Figma layer order).
 */
export const heroCardsPresentation: HeroCard[] = [
  {
    id: "1394:4267",
    kind: "presentation",
    layer: "far",
    x: 838.64,
    y: 316,
    width: 202.26,
    height: 105,
    radius: 6.08,
    opacity: 0.38,
    blur: 3.45,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 2.96, align: "inside" },
    image: { ...IMG.presentation, fit: "cover" },
    unit: 5.53,
    ...PRESENTATION_APP,
  },
  {
    id: "1394:4291",
    kind: "presentation",
    layer: "far",
    x: 489,
    y: 170,
    width: 156.66,
    height: 81.33,
    radius: 4.71,
    opacity: 0.38,
    blur: 2.68,
    glow: { blur: 21.95, spread: 1.47 },
    stroke: { width: 2.29, align: "inside" },
    image: { ...IMG.presentation, fit: "cover" },
    unit: 4.28,
    ...PRESENTATION_APP,
  },
];

/** Near layer — cardsNear (1394:4316), above the character. */
export const heroCardsNear: HeroCard[] = [
  {
    id: "1394:4317",
    kind: "photo",
    layer: "near",
    x: -32.97,
    y: 337,
    width: 200.32,
    height: 211.19,
    radius: 10.71,
    opacity: 0.75,
    blur: 3.07,
    glow: { blur: 23.09, spread: 1.55 },
    stroke: { width: 3.15, align: "inside" },
    image: { ...IMG.product, fit: "cover" },
    unit: 9.32,
    text: { left: 9.32, top: 10.87, width: 175.48, height: 190.23, gap: 2.33 },
    scrim: { top: 119.57, from: 0.04, to: 0.98 },
    pill: { label: "Маркетплейс", background: "#C2EF4B", color: "#000000" },
    title: "Карточка товара",
    titleFont: "druk",
    titleUppercase: true,
    description: "Продающая карточка\nс инфографикой для WB, Ozon\nи Маркета.",
  },
  {
    id: "1394:4325",
    kind: "photo",
    layer: "near",
    x: 1244.02,
    y: 262,
    width: 199.32,
    height: 240,
    radius: 14.03,
    opacity: 0.75,
    blur: 2.1,
    glow: { blur: 28.34, spread: 1.9 },
    stroke: { width: 3.51, align: "inside" },
    image: { ...IMG.presentation, fit: "cover" },
    unit: 12.2,
    text: { left: 12.2, top: 14.24, width: 143.39, height: 211.53, gap: 3.05 },
    scrim: { top: 133.22, from: 0.08, to: 0.98 },
    pill: { label: "Документы", background: "#C2EF4B", color: "#000000" },
    title: "Презентация",
    titleFont: "unbounded",
    titleUppercase: true,
    description: "Структура и текст слайдов",
  },
];

export const heroCardCount =
  heroCardsFar.length + heroCardsMid.length + heroCardsPresentation.length + heroCardsNear.length;
