/**
 * "SeexAI подойдёт, даже если вы только начинаете" — Figma final › Frame 295
 * (design-refs/final/raw/Main page v4.svg; layer names = texts). Section box: page y
 * 4981.76 (bottom of Learning) – 5567.76 (bottom of the stat cards).
 */

export type AudienceGlow = {
  src: string;
  /** Position of the SVG (its Figma filter region), px. */
  x: number;
  y: number;
  width: number;
  height: number;
  screen: boolean;
};

export type AudienceStat = {
  value: string;
  label: string;
  /** "\n" = Figma line break. */
  text: string;
  glows: AudienceGlow[];
};

const glow = (name: string, x: number, y: number, width: number, height: number, screen = true): AudienceGlow => ({
  src: `/images/audience/${name}.svg`,
  x,
  y,
  width,
  height,
  screen,
});

export const audienceIntro = {
  title: ["SeexAI подойдёт,", "даже если вы", "только начинаете"],
  text: "Без промптов и настроек. Вы описываете задачу, остальное SeexAI делает сам.",
};

/**
 * Group 20 (right edge) and Group 19 (left edge): 5 ellipses each, the first one normal,
 * the rest SCREEN. y is relative to the section; the right group is stored as an
 * offset from the right edge so both stay on the viewport edges.
 */
export const audienceSideGlows = {
  right: [
    glow("side-right-1", -417.814, -140.73, 718.624, 967.451, false),
    glow("side-right-2", -328.256, -56.35, 539.506, 798.7),
    glow("side-right-3", -243.518, 38.75, 370.038, 608.497),
    glow("side-right-4", -172.107, 133.5, 227.207, 419.011),
    glow("side-right-5", -117.639, 222.7, 118.269, 240.609),
  ],
  left: [
    glow("side-left-1", -352.746, -84.19, 631.493, 854.373, false),
    glow("side-left-2", -273.81, -9.89, 473.62, 705.787),
    glow("side-left-3", -199.517, 73.69, 325.033, 538.627),
    glow("side-left-4", -136.832, 157.27, 199.663, 371.467),
    glow("side-left-5", -89.005, 236.2, 104.011, 213.593),
  ],
};

/** cardGlow: the same 4 ellipses; base x relative to the card (card 1 has only the first one). */
const cardGlow = (dx: number, count = 4): AudienceGlow[] =>
  [
    glow("card-glow-1", dx, -386.82, 703.636, 599.394, false),
    glow("card-glow-2", dx + 71.666, -328.18, 560.303, 482.121),
    glow("card-glow-3", dx + 136.818, -279.32, 430, 377.879),
    glow("card-glow-4", dx + 214.999, -217.42, 273.637, 247.576),
  ].slice(0, count);

/** statsRow: 4 × 302×198, gap 24. */
export const audienceStats: AudienceStat[] = [
  { value: "0", label: "промптов", text: "Модели и настройки уже\nподобраны под вашу задачу", glows: cardGlow(288.182, 1) },
  { value: "2 мин", label: "до первого результата", text: "Описали задачу, ответили на\nпару вопросов, забрали файл", glows: cardGlow(-37.818) },
  { value: "5", label: "готовых сценариев", text: "Презентация, карточка товара,\nрезюме, отчёт и фото", glows: cardGlow(-146.818) },
  { value: "50+", label: "нейросетей", text: "В одной подписке, без\nотдельных аккаунтов и оплат", glows: cardGlow(-200.818) },
];
