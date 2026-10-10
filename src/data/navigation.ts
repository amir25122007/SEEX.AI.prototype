export type NavItem = {
  label: string;
  href: string;
};

/**
 * Header navigation. "Модели" has no section of its own in the final design: it leads to
 * Features (the "И ещё 50+ инструментов" strip with the model logos) — decision of 2026-10-10.
 */
export const headerNav: NavItem[] = [
  { label: "Сценарии", href: "#scenarios" },
  { label: "Возможности", href: "#features" },
  { label: "Модели", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Как это работает", href: "#how-it-works" },
];

export const headerActions = {
  login: { label: "Войти", href: "#login" },
  cta: { label: "Начать", href: "#create" },
} as const satisfies Record<string, NavItem>;

/** Footer navigation (Final CTA + Footer › tabs), left → right. */
export const footerNav: NavItem[] = [
  { label: "Возможности", href: "#features" },
  { label: "Модели", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Как это работает", href: "#how-it-works" },
];

/** TODO: replace with the real privacy policy URL. */
export const privacyPolicy: NavItem = { label: "Политика конфиденциальности", href: "#privacy" };
