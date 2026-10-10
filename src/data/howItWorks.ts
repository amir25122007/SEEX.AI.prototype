/**
 * "Путь к результату" — Figma "Main page v4" › how it works (design-refs/v4/how-it-works.svg).
 * Texts transcribed from how-it-works-ref@1x.png.
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
    description: "Презентация, карточка товара, обработка фото, резюме или отчёт. Пять готовых сценариев, и список растёт.",
  },
  {
    number: "[02]",
    title: "Ответьте на пару вопросов",
    description: "Тема, аудитория, тон или площадка. Без промптов и настроек, всё уже подобрано.",
  },
  {
    number: "[03]",
    title: "Заберите готовый файл",
    // Explicit break: both lines are 35 characters, Figma wraps only before "и".
    description: "PPTX, PDF, JPG или XLSX. Посмотрите результат, докрутите парой правок\nи скачайте.",
  },
];

export type HowItWorksSlide = {
  id: string;
  /** "mock" — app screen with its own inside stroke; "raster" — framed 1254² render. */
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
  src: "/images/how-it-works/app-scenarios.svg",
  alt: "Экран «Сценарии» в SeexAI: готовые сценарии с ценой в кредитах",
  width: 567.799,
  height: 318.6,
  intrinsic: { width: 568, height: 319 },
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
