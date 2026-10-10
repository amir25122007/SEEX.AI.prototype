/**
 * "Часто задаваемые вопросы" — Figma final › Frame 341 (design-refs/final/raw/Main page v4.svg;
 * texts from texts-from-pdf.txt, spaces restored from the PNG).
 *
 * DRAFT: ответы 2–6 не из макета, требуют согласования. They only restate facts already on
 * the page (scenarios, 50+ models, no prompts, START / PRO / MAX and their generations,
 * guest mode from the app mock). Do not publish them as structured data until approved.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** true — the answer is a draft that is not in the design. */
  draft?: boolean;
};

export const faqIntro = {
  title: ["Часто задаваемые", "вопросы"],
  text: "Коротко отвечаем на главные вопросы о платформе,\nподписке и будущем обучении.",
};

export const faqItems: FaqItem[] = [
  {
    id: "beginner",
    question: "Подойдёт ли SeexAI новичку?",
    answer:
      "Да. Платформа рассчитана на понятный старт: вы выбираете задачу или готовый шаблон, а SeexAI помогает пройти путь до результата — без необходимости разбираться во множестве моделей и сложных настройках.",
  },
  {
    id: "prompts",
    question: "Нужно ли разбираться в нейросетях и промптах?",
    answer:
      "Нет. Вы выбираете сценарий и отвечаете на пару вопросов, а модель, промпт и настройки SeexAI подбирает сам.",
    draft: true,
  },
  {
    id: "tasks",
    question: "Какие задачи можно решать на платформе?",
    answer:
      "Готовые сценарии помогают сделать презентацию, карточку товара, резюме, отчёт в Excel и обработать фото. Изображения, видео и тексты создаются в одном месте.",
    draft: true,
  },
  {
    id: "trial",
    question: "Можно ли сначала попробовать платформу?",
    answer: "Да, платформу можно открыть в гостевом режиме и посмотреть сценарии. Пополнять баланс можно после регистрации.",
    draft: true,
  },
  {
    id: "subscription",
    question: "Что входит в подписку?",
    answer:
      "Доступ ко всем моделям — 50+ нейросетей в одной подписке, без отдельных аккаунтов и оплат, — а также объём генераций и возможности выбранного тарифа.",
    draft: true,
  },
  {
    id: "plans",
    question: "Чем отличаются тарифы?",
    answer:
      "Объёмом и возможностями: START — около 3 000 генераций в месяц, PRO — около 8 000 и приоритетная скорость, MAX — около 20 000, приоритетная обработка и ранний доступ к новому. Все модели доступны в каждом тарифе.",
    draft: true,
  },
];
