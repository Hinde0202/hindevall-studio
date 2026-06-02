# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

A single-page marketing/portfolio website for **Noah Hindevall**, a Swedish web
developer & designer. It advertises his web-development services and showcases
client/personal projects. The site copy and UI are written in **Swedish**
(`<html lang="sv">`); keep all user-facing text in Swedish unless asked otherwise.

It is a **static site** — there is no framework, no build step, no package
manager, no backend. Just three hand-written files served as-is.

## Project structure

```
index.html      Entire page markup — one HTML file, all sections inline
styles.css      All styling — design tokens + component styles, no preprocessor
script.js       All behavior — vanilla JS, no dependencies
*.png / *.svg   Image assets (portfolio screenshots, hero/section graphics)
```

There is **no** `package.json`, `node_modules`, bundler, linter, or test suite.
Do not introduce one unless explicitly requested — the simplicity is intentional.

### Page sections (in `index.html`, top to bottom)

`nav` → `#hero` → `#tjanster` (services) → `#portfolio` → `#om-mig` (about) →
`#kontakt` (contact) → `footer`. Nav links and the footer anchor to these IDs
via in-page smooth scrolling.

### Image assets

- `inci.png`, `inci2.png` — INCI e-commerce project (featured portfolio card slider)
- `golf1.png`–`golf4.png` — Golf League project (portfolio card slider)
- `noah.jpg.png` — personal/about photo
- `img-golf.svg`, `img-kosmetika.svg` — illustrative graphics
- The hero illustration is an **inline SVG** in `index.html`, not a file

## How to run

Open `index.html` directly in a browser, or serve the folder with any static
server, e.g.:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

No install, build, or compile step exists. Changes are visible on browser reload.

## Conventions

### CSS (`styles.css`)
- **Design tokens** live in `:root` as CSS custom properties — colors
  (`--accent: #1C3FD8`, `--bg: #F6F4EF`, …), `--radius`, `--font`. Reuse these
  variables; do not hardcode hex values that duplicate an existing token.
- File is organized into commented sections (`/* ─── Hero ─── */`, etc.) that
  mirror the page sections. Add new styles under the matching section.
- Responsive design uses two breakpoints at the bottom of the file:
  `@media (max-width: 900px)` and `@media (max-width: 640px)`.
- Fluid sizing via `clamp()` is used heavily for typography and spacing.

### JavaScript (`script.js`)
- Vanilla DOM JS, no semicolons in some places (mixed) — match the existing
  terse style. Features: sticky-nav scroll effect, mobile menu toggle, image
  sliders (`[data-slider]`), and contact-form submission.
- The image **slider** is generic: any `.slider[data-slider]` with a
  `.slider-track` of `<img>` elements and a `.slider-dots` container gets wired
  up automatically (prev/next buttons + dots). Add a new gallery by following
  that markup pattern — no JS changes needed.

### HTML (`index.html`)
- Sections are delimited with box-drawing comment banners
  (`<!-- ─── Hero ─── -->`). Keep that style when adding sections.
- Inline SVGs are used for all icons (Feather-style, `stroke="currentColor"`).

## Known placeholders (need real values before going live)

These contain literal placeholder text and are intentionally non-functional:

- **Contact form** (`index.html`): `data-formspree="https://formspree.io/f/[ DITT_FORMSPREE_ID ]"`.
  Until a real Formspree ID is set, `script.js` detects the placeholder and
  **falls back to a `mailto:` link** to `noah.hindevall@gmail.com`.
- **LinkedIn link**: `https://www.linkedin.com/in/[ ditt-linkedin-handle ]` and
  the visible "LinkedIn — [ ditt namn ]" label.

If asked to "make the form work" or "connect LinkedIn", replace these
placeholders rather than rewriting the logic.

## Git workflow

- Default branch is `main`. Active development branch for this work:
  `claude/claude-md-docs-ZhSZD`.
- **Commit messages are written in Swedish** and are short and descriptive
  (e.g. `slider fix, golf contain`, `INCI uppdaterad till e-handel`). Follow
  this convention.
- Do **not** open a pull request unless explicitly asked.
