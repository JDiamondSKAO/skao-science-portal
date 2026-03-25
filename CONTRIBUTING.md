# Contributing

This repository is maintained by the SKAO Communications and Creative Production team. Contributions from the wider SKAO organisation are welcome, particularly for content accuracy and accessibility improvements.

## Repository structure

The portal has two distinct layers:

- **Theme** (`theme/`) — Velocity template, CSS, and JavaScript that control how Confluence content is rendered through Scroll Viewport.
- **Content** (`content/`) — Source material in Confluence Wiki Markup format, ready to paste into Confluence pages.

Changes to the theme affect all portal pages. Changes to content affect individual pages.

## Development workflow

### Theme changes

1. Create a feature branch from `main`
2. Edit files in `theme/` locally
3. Test by uploading the modified file(s) to Scroll Viewport in the `SPK` space
4. Verify in both light and dark mode, and at mobile and desktop widths
5. Commit with a descriptive message and open a pull request

### Content changes

1. Edit the relevant `.txt` file in `content/wiki-markup/`
2. Paste the updated content into the corresponding Confluence page via **Insert → Markup → Confluence wiki**
3. Verify the rendered output in Scroll Viewport
4. Commit the source file change

## Commit conventions

Commits should follow this format:

```
<type>: <short description>

<optional body with context>
```

Types:

| Type | Usage |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `style` | Visual/CSS changes with no functional impact |
| `content` | Content additions or corrections |
| `docs` | Documentation changes (README, CHANGELOG, etc.) |
| `refactor` | Code restructuring with no behaviour change |
| `a11y` | Accessibility improvement |
| `chore` | Maintenance (dependencies, config, cleanup) |

Example:

```
feat: add dynamic announcements from blog posts

Fetches labelled blog posts via CQL REST API and renders
them in the Recent Updates section with category badges.
```

## Code standards

### Velocity (`page.vm`)

- Use `##` comments to mark section boundaries
- Guard all variable access with `#if` null checks
- Prefer `$page.absoluteLink` over `$page.url`

### CSS (`style.css`)

- Use CSS custom properties defined in `:root` for colours and spacing
- Dark mode overrides use `html.dark` selector
- Use `!important` sparingly — only where Confluence base styles require it
- Group related rules under comment headers matching the Velocity sections

### JavaScript (`main.js`)

- Vanilla JS only — no libraries except Matter.js (conditionally loaded for 404)
- All code runs inside a single `DOMContentLoaded` listener
- Use `var` for compatibility with older Confluence-embedded browsers
- Guard DOM queries with `if (element)` before attaching listeners

## Accessibility

All changes must maintain WCAG 2.1 AA compliance:

- Interactive elements must have visible focus indicators
- Colour contrast ratios must meet 4.5:1 for normal text, 3:1 for large text
- All images must have meaningful `alt` text
- Form controls must have associated labels
- Keyboard navigation must work without a mouse

## Review checklist

Before merging, confirm:

- [ ] Renders correctly in Scroll Viewport (not just raw Confluence)
- [ ] Light mode and dark mode both tested
- [ ] Responsive at 360px, 768px, and 1440px widths
- [ ] No hardcoded page URLs (use Velocity variables or relative links)
- [ ] No console errors in browser developer tools
- [ ] CHANGELOG.md updated if user-facing

## Questions

For questions about the portal architecture or deployment, contact the Creative Production team or raise an issue in this repository.
