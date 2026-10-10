/**
 * "Выберите свой формат доступа" — Figma final › pricing (design-refs/final/raw/Main page v4.svg;
 * texts from the layer names / texts-from-pdf.txt).
 *
 * PRICES ARE PRELIMINARY: the price layers are marked TEMP in the design. Update them here.
 */

export type PricingPlan = {
  id: "start" | "pro" | "max";
  name: string;
  tone: "orange" | "lime";
  subtitle: string;
  discount: string;
  /** ₽ per month, before / after the discount (TEMP). */
  oldPrice: number;
  price: number;
  /** Lime price box width in Figma, px. */
  priceBoxWidth: number;
  period: string;
  generations: string;
  features: string[];
  models: string[];
  popular?: string;
};

export const pricingIntro = {
  title: ["Выберите свой", "формат доступа"],
  text: "Тарифы отличаются объёмом использования и доступными возможностями.\nНачните с подходящего и переходите на следующий по мере роста задач.",
  cta: "Выбрать тариф",
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "start",
    name: "START",
    tone: "orange",
    subtitle: "Для первых шагов с AI",
    discount: "−17%",
    oldPrice: 590,
    price: 490,
    priceBoxWidth: 126,
    period: "при оплате за квартал",
    generations: "≈ 3 000 генераций/мес",
    features: ["Основные AI-инструменты", "Готовые шаблоны", "Стандартная скорость"],
    models: ["Все модели"],
  },
  {
    id: "pro",
    name: "PRO",
    tone: "lime",
    subtitle: "Для активного использования",
    discount: "−33%",
    oldPrice: 1490,
    price: 990,
    priceBoxWidth: 127,
    period: "при оплате за квартал",
    generations: "≈ 8 000 генераций/мес",
    features: ["Расширенные возможности", "Приоритетная скорость", "Больше объёма генераций", "Обучающие материалы"],
    models: ["Все модели"],
    popular: "Популярный",
  },
  {
    id: "max",
    name: "MAX",
    tone: "orange",
    // Same subtitle as PRO in the design (see report 06).
    subtitle: "Для активного использования",
    discount: "−33%",
    oldPrice: 2990,
    price: 1990,
    priceBoxWidth: 143,
    period: "при оплате за квартал",
    generations: "≈ 20 000 генераций/мес",
    features: ["Максимальный объём", "Приоритетная обработка", "Ранний доступ к новому"],
    models: ["Все модели"],
  },
];
