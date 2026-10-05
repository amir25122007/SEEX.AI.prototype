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
| IBM Plex Mono | `next/font/google` | body, navigation, buttons, labels, marquee, FAQ |
| Archivo | `next/font/google` | logo, SEEX / SeexAI watermarks |
| Unbounded | `next/font/google` | accents ("AI для каждого", "1 200+") |
| Inter | `next/font/google` | replaces SF Pro (composer, mockups, legal text) |
| Druk Text Wide Cyr | local, licensed | section headings |
| Neuropol | local, licensed | hero title |

The licensed fonts are not in the repository yet. Add them as:

```
public/fonts/DrukTextWideCyr-Medium.woff2
public/fonts/Neuropol-Regular.woff2
```

They are already declared with `@font-face` in `globals.css` and exposed as
`font-druk` / `font-neuropol`, so no component changes are needed.

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
