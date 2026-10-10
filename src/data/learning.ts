/**
 * "Обучение" — Figma final › learning block (design-refs/final/raw/Main page v4.svg).
 * Texts from the layer names / texts-from-pdf.txt; "\n" = line break as in the final PNG.
 */

/** One marquee copy; every phrase is followed by the ✳ star (period 1136px). */
export const learningTicker = ["Скоро в SeexAI", "Обучение AI", "Практика", "Задания"];

export const learningIntro = {
  badge: "Курс по нейросетям",
  soon: "Скоро",
  title: ["От знакомства", "до реальной", "практики"],
  text: "Короткие уроки, практика и поддержка\nпомогут разобраться в AI и начать применять\nего в реальных задачах.",
  cta: "Следить за запуском",
};

export const learningCards = {
  levels: { icon: "AI", label: "Для всех уровней", title: "AI для каждого", meta: "Beginner → Advanced" },
  waitlist: { label: "Лист ожидания", value: "1 200+", caption: "уже записались" },
};

export type LearningFeature = { number: string; title: string; text: string; x: number; y: number };

/** Frame 281: Union cards 380×166 at Figma x / y. */
export const learningFeatures: LearningFeature[] = [
  {
    number: "[01]",
    title: "Видео и сценарии",
    text: "Короткие уроки и понятные примеры\nприменения AI в реальных задачах.",
    x: 980,
    y: 120,
  },
  {
    number: "[02]",
    title: "Практика и задания",
    text: "Закрепляйте знания внутри платформы\nи сразу пробуйте инструменты.",
    x: 890,
    y: 322,
  },
  {
    number: "[03]",
    title: "Куратор и поддержка",
    text: "Куратор поможет разобраться в\nсложных моментах и двигаться дальше\nбез остановок.",
    x: 980,
    y: 524,
  },
];
