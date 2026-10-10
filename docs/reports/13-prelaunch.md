# 13 — Подготовка к публикации

Дата: 2026-10-10. Секции по макету не менялись (кроме переноса строк в How it works, см. ниже). Figma-запросов не было. Ничего не закоммичено.

## Изменения

| Файл | Изменение |
|---|---|
| `src/lib/site.ts` | title и description по текстам лендинга; `url` из `VERCEL_PROJECT_PRODUCTION_URL` (локально `http://localhost:3000`); `ALLOW_INDEXING = false` (СНЯТЬ ПРИ ЗАПУСКЕ) |
| `src/app/layout.tsx` | `metadataBase`, `robots` (сейчас noindex, nofollow), Open Graph и Twitter (`/og.png` 1200×630); `viewport` width 1440 (на телефонах — уменьшенный desktop), `themeColor` #101010 |
| `public/og.png` | превью 1200×630 для соцсетей |
| `src/app/icon.svg`, `apple-icon.png` | иконка: лаймовая «S» (#C2EF4B) на #101010; `favicon.ico` (стандартный Next) удалён |
| `src/lib/brandFonts.ts`, `globals.css` | `@font-face` Druk / Neuropol добавляется только если `.woff2` лежит в `public/fonts` (на этапе сборки) → нет 404; чтобы подключить шрифт, достаточно положить файл и пересобрать |
| `src/components/ui/MarqueeFocusGuard.tsx`, `Marquee.tsx`, `Scenarios.tsx` | при фокусе с клавиатуры лента сдвигается (`translate`) так, чтобы карточка была в 240 px от краёв (за маской); после ухода фокуса смещение сводится к периоду без видимого скачка |
| `HowItWorks.module.css`, `src/data/howItWorks.ts` | тексты шагов переносятся по колонке 407.5 px (раньше `pre` с переносами из Figma; из-за Inter строка вылезала до ~20 px за правый край контейнера) |
| `src/data/heroCards.ts` | удалён неиспользуемый `heroCardCount` |
| Удалено | неиспользуемые `Container.tsx`, `GlassCard.tsx`, `.gitkeep`, `reference/landing-reference.png` |
| `.gitignore` | `qa-screenshots/` и `reference/` больше не отслеживаются (файлы остаются локально) |

## QA (production build, 1440, DPR 1)

| Проверка | Результат |
|---|---|
| `pnpm lint` / `typecheck` / `build` | без ошибок; маршруты `/`, `/icon.svg`, `/apple-icon.png` статические |
| Сетевые ошибки / ошибки консоли | нет (шрифты-заглушки больше не запрашиваются) |
| `scrollWidth` / высота страницы | 1440 / 8536 |
| `<title>`, robots, og:image, viewport | заданы; robots = noindex, nofollow; og:image абсолютный |
| Tab по «Сценариям» | 9 фокусов подряд: все карточки в пределах x 240–1200 (раньше фокус уходил на x 1550) |
| How it works, тексты шагов | правый край ≤ 1360; 3 / 2 / 3 строки, как в макете |
| Reduced motion, 1440 / 1680 / 1920 / 2560 | 0 запущенных анимаций; `scrollWidth` равен ширине окна; высота 8536 |
| Стыки фона (профиль цвета x 2 / 20 / края канвы 1440 / правый край) | скачки только на контенте (карточки, ленты, слайды карусели How it works у края окна на ≥ 1680); на фоне между секциями швов нет. Скриншоты: `qa-screenshots/prelaunch/page-*-reduced.png` |

## Перед запуском

| Пункт | Где |
|---|---|
| Включить индексацию | `ALLOW_INDEXING = true` в `src/lib/site.ts` (после утверждения цен и ответов FAQ) |
| Домен для OG | на Vercel подставляется сам; на другом хостинге задать `site.url` |
| Цены (TEMP), ответы FAQ 2–6 (DRAFT), `#privacy`, `#login`, `#create` | см. статус секций в `docs/PROJECT_CONTEXT.md` |
| Шрифты Druk / Neuropol | положить `.woff2` в `public/fonts` и пересобрать |
| Safari QA | вручную (пользователь) |
