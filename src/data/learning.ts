/**
 * "Обучение" — Figma "Main page v4" › learning block (design-refs/v4/learning.svg).
 * Texts transcribed from learning-ref@1x.png; "\n" = Figma line break.
 */

/** One marquee copy; every phrase is followed by the ✳ star (period 1136px). */
export const learningTicker = ["Скоро в SeexAI", "Обучение AI", "Практика", "Задания"];

export const learningIntro = {
  badge: "Курс по нейросетям",
  soon: "Скоро",
  title: ["От знакомства", "до реальной", "практики"],
  text: "Короткие уроки, практика\nи поддержка помогут разобраться\nв AI и начать применять его\nв реальных задачах.",
  cta: "Следить за запуском",
};

export const learningCards = {
  levels: { icon: "AI", label: "Для всех уровней", title: "AI для каждого", meta: ["Beginner", "Advanced"] },
  waitlist: { label: "Лист ожидания", value: "1 200+", caption: "уже записались" },
};

export type LearningFeature = { number: string; title: string; text: string; x: number; y: number };

/** Frame 281: Union cards 380×166 at Figma x / y. */
export const learningFeatures: LearningFeature[] = [
  {
    number: "[01]",
    title: "Видео и сценарии",
    text: "Короткие уроки и понятные\nпримеры применения AI\nв реальных задачах.",
    x: 980,
    y: 120,
  },
  {
    number: "[02]",
    title: "Практика и задания",
    text: "Закрепляйте знания внутри\nплатформы и сразу пробуйте\nинструменты.",
    x: 890,
    y: 322,
  },
  {
    number: "[03]",
    title: "Куратор и поддержка",
    text: "Куратор поможет разобраться\nв сложных моментах и двигаться\nдальше без остановок.",
    x: 980,
    y: 524,
  },
];
