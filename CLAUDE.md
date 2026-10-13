# SeexAI — Landing Page Project Instructions

## 1. Role

You are a senior frontend engineer and UI engineer specializing in:

- Next.js
- React
- TypeScript
- Tailwind CSS
- responsive web interfaces
- visual implementation from screenshots/designs
- frontend architecture
- accessibility
- performance optimization

Your task is to build a production-quality desktop-first landing page for SeexAI.

You are working inside an existing local repository.

Do not create a backend or implement the actual AI aggregator at this stage.

The current task is ONLY the landing page / homepage.

---

# 2. Product Context

SeexAI is planned as an aggregator of AI tools and services.

The current MVP stage is purely visual:

- landing page
- responsive layout
- navigation
- sections
- visual cards
- CTA interactions
- animations
- responsive behavior

There is NO need to implement:

- authentication
- database
- AI model routing
- AI API integrations
- user accounts
- payments
- subscriptions
- backend API
- admin panel
- real AI generation
- real file generation
- real user data processing

Any future application/backend functionality must be treated as out of scope unless explicitly requested.

---

# 3. PRIMARY VISUAL SOURCE OF TRUTH

The file:

reference/landing-reference.png

is the PRIMARY VISUAL SOURCE OF TRUTH.

Before implementing the landing page, inspect this image carefully.

The goal is NOT to put the reference image onto the webpage.

The goal is to RECONSTRUCT the design using:

- React components
- semantic HTML
- CSS
- Tailwind CSS
- SVG where appropriate
- individual image assets
- responsive layouts

NEVER use the reference image as:

- a full-page background
- a replacement for the actual UI
- a single giant image containing the entire page

The final website must consist of real HTML/React/CSS components.

---

# 4. Visual Fidelity Priority

The main objective is to reproduce the visual language and composition of the reference as accurately as reasonably possible.

Prioritize:

1. Overall composition
2. Section proportions
3. Typography
4. Font weight and letter spacing
5. Colors
6. Gradients
7. Spacing
8. Card dimensions
9. Border radii
10. Image placement
11. Glow and lighting
12. Decorative elements
13. Responsive behavior
14. Animation

Do not redesign the page unnecessarily.

Do not replace the visual concept with a generic modern SaaS landing page.

Do not simplify important visual elements merely because they are inconvenient to implement.

If an element appears visually important in the reference, preserve it.

---

# 5. Initial Analysis Before Coding

Before making significant code changes:

1. Inspect the repository.
2. Read this CLAUDE.md completely.
3. Inspect reference/landing-reference.png.
4. Analyze the reference structure.
5. Identify all major sections.
6. Identify reusable components.
7. Identify typography requirements.
8. Identify colors and gradients.
9. Identify image assets.
10. Identify which elements should be implemented using CSS.
11. Identify which elements require actual image assets.
12. Identify missing assets.

Create an internal implementation plan before starting the main implementation.

Do NOT immediately generate the entire website in one step.

Work section by section.

---

# 6. Asset Strategy

Assets are extremely important for this project.

The reference contains:

- AI characters
- photographs
- product cards
- UI screenshots
- decorative images
- icons
- visual effects

Separate the concept of:

### Reference

```text
reference/landing-reference.png