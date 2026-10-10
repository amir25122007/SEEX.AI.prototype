export const site = {
  name: "SeexAI",
  title: "SeexAI — нейросети для презентаций, фото, видео и текстов",
  description:
    "Выберите задачу — SeexAI сам подберёт нейросеть и настройки. 50+ нейросетей в одной подписке, готовые сценарии и результат за пару минут.",
  locale: "ru_RU",
  /** Production origin for absolute Open Graph URLs (Vercel sets VERCEL_PROJECT_PRODUCTION_URL). */
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
} as const;

/**
 * Search engines are kept out while the page shows preliminary prices and draft FAQ answers.
 * СНЯТЬ ПРИ ЗАПУСКЕ: set to true once prices and FAQ answers are approved.
 */
export const ALLOW_INDEXING = false;
