export type NavItem = {
  label: string;
  href: string;
};

/** Header navigation (Figma 1394:4364). Destinations are placeholders. */
export const headerNav: NavItem[] = [
  { label: "Сценарии", href: "#scenarios" },
  { label: "Возможности", href: "#features" },
  { label: "Модели", href: "#models" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Как это работает", href: "#how-it-works" },
];

export const headerActions = {
  login: { label: "Войти", href: "#login" },
  cta: { label: "Начать", href: "#create" },
} as const satisfies Record<string, NavItem>;
