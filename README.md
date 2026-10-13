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

### Druk and Neuropol

The licensed WOFF2 files live in `public/fonts/` (`DrukTextWideCyr-Medium.woff2`,
`Neuropol-Regular.woff2`). The `.otf` originals are kept outside git in `design-refs/fonts/`
and must never be put into `public/`.

To replace a font: convert it outside the project (e.g. `pip install fonttools brotli` in a temp
venv, then `fonttools ttLib.woff2 compress -o Neuropol-Regular.woff2 Neuropol-Regular.otf`), drop
it into `public/fonts/` under the same name and rebuild. `src/lib/brandFonts.ts` checks the files
at build time and emits `@font-face` (`font-display: swap`) plus a `<link rel="preload">` for each
one; a missing file is simply skipped (fallback stack, no 404).

Positions of the Druk / Neuropol text are calibrated against `design-refs/final/` with the real
fonts (report 15).

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
