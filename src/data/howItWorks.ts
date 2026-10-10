/**
 * "Путь к результату" — Figma final › how it works (design-refs/final/raw/Main page v4.svg).
 * Step texts from texts-from-pdf.txt (the layer names are stale), line breaks from the PNG.
 */

export type HowItWorksStep = {
  number: string;
  title: string;
  /** "\n" = Figma line break. */
  description: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "[01]",
    title: "Выберите задачу",
    description: "Презентация, карточка товара, обработка\nфото, резюме или отчёт. Пять готовых\nсценариев, и список растёт.",
  },
  {
    number: "[02]",
    title: "Ответьте на пару вопросов",
    description: "Тема, аудитория, тон или площадка. Без\nпромптов и настроек, всё уже подобрано.",
  },
  {
    number: "[03]",
    title: "Заберите готовый файл",
    description: "PPTX, PDF, JPG или XLSX. Посмотрите\nрезультат, докрутите парой правок и скачайте.",
  },
];

export type HowItWorksSlide = {
  id: string;
  /** "mock" — app screen with its own inside stroke baked in; "raster" — framed 1254² render. */
  kind: "mock" | "raster";
  src: string;
  alt: string;
  /** Figma rect size, px (a raster's 3.15px lime stroke is centred on it). */
  width: number;
  height: number;
  intrinsic: { width: number; height: number };
};

const scenariosScreen: HowItWorksSlide = {
  id: "scenarios",
  kind: "mock",
  // Rendered @2x from the "Frame 373" group of how-it-works.svg (Playwright, transparent corners).
  src: "/images/how-it-works/app-scenarios@2x.png",
  alt: "Экран «Сценарии» в SeexAI: готовые сценарии с ценой в кредитах",
  width: 567.799,
  height: 318.6,
  intrinsic: { width: 1136, height: 638 },
};

// image 27 — right of the first slide in the reference.
const framesScreen: HowItWorksSlide = {
  id: "frames",
  kind: "raster",
  src: "/images/how-it-works/slide-frames.png",
  alt: "Экран «Кадры» в SeexAI: серия обработанных фото товара",
  width: 429.45,
  height: 429.45,
  intrinsic: { width: 1254, height: 1254 },
};

// image 24 — left of the first slide in the reference (cover, anchored to the top).
const productCardScreen: HowItWorksSlide = {
  id: "product-card",
  kind: "raster",
  src: "/images/how-it-works/slide-product-card.png",
  alt: "Экран «Карточка товара» в SeexAI: вопросы о площадке и категории",
  width: 448.35,
  height: 429.45,
  intrinsic: { width: 1254, height: 1254 },
};

/**
 * 5 logical slides (5 pagination dots in Figma). The export holds 3 screens; the
 * start frame shows slide 5 on the left and slide 2 on the right, so slides 4–5
 * repeat 2–3 (with 4–5 = 1–2 the left neighbour would not match the reference).
 * TODO: replace slides 4–5 with real screens when they are designed.
 */
export const howItWorksSlides: HowItWorksSlide[] = [
  scenariosScreen,
  framesScreen,
  productCardScreen,
  { ...framesScreen, id: "frames-repeat" },
  { ...productCardScreen, id: "product-card-repeat" },
];
