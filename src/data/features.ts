/**
 * "От идеи до готового результата" — Figma final › Frame 267
 * (design-refs/final/raw/Main page v4.svg; layer names = texts). Page y 1891.5–2841.2.
 * Glow positions are the Figma filter regions of each blurred ellipse, px.
 */

export type FeatureGlow = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  screen?: boolean;
  /** Parent group opacity (leftGlow 80 %). */
  opacity?: number;
};

const g = (name: string, x: number, y: number, width: number, height: number, screen = true, opacity?: number): FeatureGlow => ({
  src: `/images/features/final/${name}.svg`,
  x,
  y,
  width,
  height,
  screen,
  opacity,
});

export const featuresIntro = {
  title: ["От идеи", "до готового", "результата"],
  text: "Выберите задачу и SeexAI сам подберёт нейросеть и настройки.\nИзображения, видео и тексты создаются в одном месте.",
  cta: "Начать создавать",
};

/** Group 15 (right) and leftGlow; x on the 1440 canvas, y relative to the section top (page 1891.54). */
export const featuresSectionGlows: FeatureGlow[] = [
  g("glow-right-1", 318.778, -364.44, 1837.84, 1522.17, false),
  g("glow-right-2", 507.989, -214.68, 1459.42, 1222.67),
  g("glow-right-3", 676.679, -94.75, 1120.78, 962.939),
  g("glow-left-1", -321.107, 152.32, 1139.46, 943.748, false, 0.8),
  g("glow-left-2", -203.796, 245.17, 904.84, 758.052, true, 0.8),
  g("glow-left-3", -99.208, 319.53, 694.884, 597.022, true, 0.8),
];

/** cardGlow: the same 4 ellipses in every idea card, at a different x; relative to the card. */
const cardGlow = (dx: number): FeatureGlow[] => [
  g("card-glow-1", dx - 288.182, -478.18, 916.364, 780.606, false),
  g("card-glow-2", dx - 194.848, -401.82, 729.697, 627.879),
  g("card-glow-3", dx - 110, -338.18, 560, 492.121),
  g("card-glow-4", dx - 8.182, -257.58, 356.364, 322.424),
];

export type IdeaCard = {
  id: "image" | "video" | "text";
  prompt: string;
  tag: string;
  tagWidth: number;
  title: string;
  /** "\n" = Figma line break. */
  text: string;
  /** Text column, px (default: up to the arrow button, 320.8). */
  textWidth?: number;
  glows: FeatureGlow[];
};

/** ideaCards: 3 × 410.667×481.16, gap 24. Glow centre x: 90 / 205 / 321 from the card's left edge. */
export const ideaCards: IdeaCard[] = [
  {
    id: "image",
    prompt: "Неоновый портрет для обложки",
    tag: "Фото",
    tagWidth: 64,
    title: "Изображения",
    text: "Обложки, баннеры и иллюстрации\nпо описанию или референсу.",
    glows: cardGlow(-80),
  },
  {
    id: "video",
    prompt: "Ролик 15 секунд для запуска продукта",
    tag: "Видео, 15 сек",
    tagWidth: 119,
    title: "Видео",
    // No forced break: in Inter (≈5 % wider than SF Pro Text) the first Figma line would touch the
    // arrow button, so the text wraps naturally, keeping the Figma 17px gap before the button.
    text: "Короткие ролики с сюжетом и атмосферой из текста или фото.",
    textWidth: 303.8,
    glows: cardGlow(34.999),
  },
  {
    id: "text",
    prompt: "Пост о запуске новой коллекции",
    tag: "Пост",
    tagWidth: 64,
    title: "Тексты",
    text: "Посты, статьи и письма, от первой мысли\nдо публикации.",
    glows: cardGlow(150.997),
  },
];

export const resultImages = {
  image: { src: "/images/features/final/result-photo.png", width: 736, height: 946, top: -120.93, alt: "Неоновый портрет, созданный нейросетью" },
  video: { src: "/images/features/final/result-video.png", width: 736, height: 920, top: -114.42, alt: "Кадр ролика для запуска продукта" },
};

export const postMock = {
  title: "Новая коллекция уже здесь",
  text: "Встречайте осень в цвете. Двенадцать\nмоделей, которые собираются в образ за\nминуту. Предзаказ открыт до пятницы.",
  tags: "#новинки #осень #предзаказ",
  glow: g("post-glow", -30, -10, 460, 360, false),
};

export const toolsStrip = {
  title: "И ещё 50+\nинструментов",
  text: "Нейросети для любых задач",
  /** cardGlow_4, relative to the strip. */
  glows: [
    g("strip-glow-1", -441.818, -681.82, 1243.64, 1059.39, false),
    g("strip-glow-2", -315.151, -578.18, 990.303, 852.121),
    g("strip-glow-3", -200, -491.82, 760, 667.879),
    g("strip-glow-4", -61.818, -382.42, 483.637, 437.576),
  ],
  /** modelLogo ×9: 56px circles, some turned 5.8° around their top-left corner; relative to the strip. */
  logos: [
    { src: "/images/features/final/logo-1.png", x: 425.727, rotated: true },
    { src: "/images/features/final/logo-2.png", x: 499.1, rotated: true },
    { src: "/images/features/final/logo-3.png", x: 572.474, rotated: true },
    { src: "/images/features/final/logo-4.png", x: 640.187, rotated: false },
    { src: "/images/features/final/logo-5.png", x: 708.187, rotated: false },
    { src: "/images/features/final/logo-6.png", x: 776.187, rotated: false },
    { src: "/images/features/final/logo-7.png", x: 849.847, rotated: true },
    { src: "/images/features/final/logo-8.png", x: 923.22, rotated: true },
    { src: "/images/features/final/logo-9.png", x: 990.93, rotated: false },
  ],
};
