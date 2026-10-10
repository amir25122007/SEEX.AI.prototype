# SeexAI — desktop landing page

Desktop landing page for SeexAI.

## Source of truth

- Figma file "SpectrAI (Copy)", page **Лендинг**, frame **Main page v3** (node `1394:3268`, 1440×8626).
  https://www.figma.com/design/p7uvqo3CWJzF1SIuP49WnU/SpectrAI--Copy-?node-id=1394-3268
- Target viewport: **1440px**. Content column 1280px with 80px side margins.
- Main page v4 and the Mobile frame in the same file are **not** used.

## Current scope

- Desktop only. Mobile and tablet layouts are not implemented yet.
- The page only needs to stay intact on slightly narrower desktop windows.
- Sections (in Figma order): Header/Hero, Готовые сценарии, Features bento,
  Как это работает, Обучение + marquee, «SeexAI подойдёт…», Тарифы, FAQ,
  Final CTA + Footer.

## Stack

- Next.js 16 (App Router, `src/` directory), React 19
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (tokens in `src/app/globals.css` via `@theme`)
- ESLint (`eslint-config-next`)
- pnpm

## Fonts

| Font | Source | Usage |
|---|---|---|
| SF Pro Text → Inter | system font on Apple devices; Inter via `next/font/google` elsewhere | all body text (`font-sans`) |
| Archivo | `next/font/google` | logo, SEEX / SeexAI watermarks |
| Unbounded | `next/font/google` | accents ("AI для каждого", "1 200+") |
| Druk Text Wide Cyr Medium | local, licensed | section headings (`font-druk`) |
| Neuropol | local, licensed | hero title (`font-neuropol`) |

`font-sans` is `-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif`.
SF Pro files are **never** added to the repo or served (Apple licence): Apple devices use the
installed system font.

### Adding Druk and Neuropol

The licensed files are not in the repository. To enable them:

1. Get the licensed fonts and convert them to WOFF2 if needed (outside the project, e.g.
   `pip install fonttools brotli` in a temp venv, then
   `fonttools ttLib.woff2 compress -o Neuropol-Regular.woff2 Neuropol.otf`).
2. Put them into `public/fonts/` with exactly these names:

   ```
   public/fonts/DrukTextWideCyr-Medium.woff2
   public/fonts/Neuropol-Regular.woff2
   ```

3. Rebuild (`pnpm build`). `src/lib/brandFonts.ts` checks the files at build time and only then
   emits `@font-face` (`font-display: swap`) and `<link rel="preload">` for each one. Without the
   files nothing is requested (no 404s) and the fallback stack is used. No component changes
   are needed.

After adding them, compare the sections with `design-refs/final/` — some positions were tuned
for the fallback fonts (see `docs/PROJECT_CONTEXT.md`).

## Structure

```
src/
  app/                 layout, page, global CSS + design tokens
  components/
    layout/            header, footer (upcoming)
    ui/                primitives: Container, Button, IconButton, GlassCard, SectionHeading
    landing/           page sections (upcoming)
    icons/             SVG icons exported from Figma (upcoming)
  data/                section content (upcoming)
  lib/                 fonts, site config, helpers
public/
  images/              exported Figma assets per section
  fonts/               licensed local fonts
```

## Scripts

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
```
