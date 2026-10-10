/**
 * "SeexAI подойдёт, даже если вы только начинаете" — Figma "Main page v4" › Frame 295
 * (design-refs/v4/audience.svg). Texts transcribed from audience-ref@1x.png; "\n" = Figma line break.
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

export type AudienceCard = {
  number: string;
  tag: string;
  title: string;
  points: string[];
  note: string;
  cta: string;
};

export const audienceIntro = {
  title: ["SeexAI подойдёт,", "даже если вы", "только начинаете"],
  text: "Неважно, впервые вы открываете AI-инструменты или уже хотите внедрить их в работу,\nплатформа поможет начать\nс понятного сценария.",
};

export const audienceCards: [AudienceCard, AudienceCard] = [
  {
    number: "01",
    tag: "Первый результат",
    title: "Начинаю с нуля",
    points: [
      "Хочу разобраться, как работает AI",
      "Хочу быстро получить первый результат",
      "Не знаю, какую модель или инструмент выбрать",
    ],
    note: "Начните с готового сценария и платформа\nподскажет следующий шаг.",
    cta: "Начать с простого",
  },
  {
    number: "02",
    tag: "Рабочие задачи",
    title: "Хочу применять\nAI в работе",
    points: [
      "У меня уже есть профессия и реальные задачи",
      "Хочу ускорить рутину и создавать больше",
      "Не хочу отставать от новых технологий",
    ],
    note: "Выберите рабочую задачу и сразу переходите\nк подходящему инструменту.",
    cta: "Выбрать задачу",
  },
];

const glow = (name: string, x: number, y: number, width: number, height: number, screen = true): AudienceGlow => ({
  src: `/images/audience/${name}.svg`,
  x,
  y,
  width,
  height,
  screen,
});

/**
 * Group 20 (right edge) and Group 19 (left edge): 5 ellipses each, the first one normal,
 * the rest SCREEN. y is relative to the section (frame y − 288); the right group is
 * stored as an offset from the right edge so both stay on the viewport edges.
 */
export const audienceSideGlows = {
  right: [
    glow("side-right-1", -638.035, -288, 1159.07, 1560.4, false),
    glow("side-right-2", -493.59, -151.91, 870.17, 1288.23),
    glow("side-right-3", -356.917, 1.479, 596.837, 981.447),
    glow("side-right-4", -241.733, 154.291, 366.463, 675.824),
    glow("side-right-5", -153.876, 298.163, 190.756, 388.079),
  ],
  left: [
    glow("side-left-1", -488.067, -199.364, 902.133, 1220.53, false),
    glow("side-left-2", -375.301, -93.231, 676.6, 1008.27),
    glow("side-left-3", -269.167, 26.169, 464.333, 769.467),
    glow("side-left-4", -179.618, 145.569, 285.233, 530.667),
    glow("side-left-5", -111.294, 258.336, 148.586, 305.133),
  ],
};

/** Group 15 inside each card (same 5 ellipses, clipped by the card); x / y relative to the card. */
export const audienceCardGlows: [AudienceGlow[], AudienceGlow[]] = [
  [
    glow("card-1", -284.04, -538.46, 1108.08, 943.92, false),
    glow("card-2", -171.18, -446.12, 882.36, 759.24),
    glow("card-3", -68.579, -369.17, 677.16, 595.08),
    glow("card-4", 54.541, -271.7, 430.92, 389.88),
    glow("card-5", 168.426, -175.769, 203.147, 187.758),
  ],
  [
    glow("card-1", -227.46, -528.46, 1108.08, 943.92, false),
    glow("card-2", -114.6, -436.12, 882.36, 759.24),
    glow("card-3", -11.999, -359.17, 677.16, 595.08),
    glow("card-4", 111.121, -261.7, 430.92, 389.88),
    glow("card-5", 225.006, -165.769, 203.147, 187.758),
  ],
];
