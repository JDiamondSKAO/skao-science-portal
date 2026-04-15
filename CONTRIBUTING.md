# Contributing

Maintained by the SKAO Communications and Creative Production team. Contributions welcome, particularly for content accuracy and accessibility.

## Structure

- **`theme/`** — Velocity template, CSS, and JavaScript controlling how Confluence content renders through Scroll Viewport. Changes here affect all portal pages.
- **`content/`** — Source material in Confluence Wiki Markup format. Changes here affect individual pages.

## Workflow

**Theme changes:** create a branch → edit files in `theme/` → upload to Scroll Viewport in the `SPK` space → test light/dark mode and mobile/desktop → commit and open a PR.

**Content changes:** edit the relevant `.txt` file in `content/wiki-markup/` → paste into the corresponding Confluence page via Insert → Markup → Confluence wiki → verify in Viewport → commit.

## Commits

```
<type>: <short description>
```

Types: `feat`, `fix`, `style`, `content`, `docs`, `refactor`, `a11y`, `chore`

## Code standards

- **Velocity:** `##` section comments, `#if` null checks, `$page.absoluteLink` over `$page.url`
- **CSS:** custom properties for colours/spacing, `html.dark` for dark mode, minimal `!important`
- **JavaScript:** vanilla JS only, all code inside `DOMContentLoaded`, `var` for compatibility, guard DOM queries with null checks

## Before merging

- Renders correctly in Scroll Viewport (not raw Confluence)
- Tested in light and dark mode
- Responsive at 360px, 768px, and 1440px
- No hardcoded page URLs
- No console errors
- CHANGELOG updated if user-facing
