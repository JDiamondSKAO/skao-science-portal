<p align="center">
  <img src="theme/images/skao-logo-colour.png" alt="SKA Observatory" width="280">
</p>

<h2 align="center">Science Operations Portal</h2>

<p align="center">
  The public-facing documentation portal for astronomers and researchers<br>
  using the SKA Observatory's telescope facilities and data products.
</p>

<p align="center">
  <a href="https://github.com/JDiamondSKAO/skao-science-portal/releases"><img src="https://img.shields.io/badge/release-v1.1-0052CC?style=flat-square" alt="Release"></a>
  <img src="https://img.shields.io/badge/confluence-8.5.26-0052CC?style=flat-square&logo=confluence&logoColor=white" alt="Confluence 8.5.26">
  <img src="https://img.shields.io/badge/viewport-K15t-4a5568?style=flat-square" alt="Scroll Viewport">
  <img src="https://img.shields.io/badge/WCAG-2.1_AA-green?style=flat-square" alt="WCAG 2.1 AA">
  <img src="https://img.shields.io/badge/license-SKAO_internal-lightgrey?style=flat-square" alt="License">
</p>

---

## About

The SKAO Science Operations Portal serves as the primary reference for the international science community engaging with the Square Kilometre Array. It provides documentation on telescope access, observing procedures, data products, science verification activities, and the SRCNet distributed computing infrastructure.

The portal is built as a custom [Scroll Viewport](https://www.k15t.com/software/scroll-viewport) theme for Confluence Data Centre, transforming internal wiki content into a polished, publicly accessible documentation site. All rendering, navigation, and interactivity are handled through a single Velocity template, a vanilla CSS stylesheet, and a dependency-free JavaScript layer — no build tools or frameworks required.

### Key capabilities

- Dynamic navigation derived from the Confluence page tree (no hardcoded links)
- Full-text search via Confluence REST API with CQL, keyboard-navigable results
- Auto-generated table of contents with scroll-spy for content pages
- Responsive layout from mobile through to wide desktop
- Dark mode with FOUC prevention
- Dynamic announcements sourced from labelled blog posts
- Interactive physics-based 404 page (Matter.js)
- WCAG 2.1 AA compliant (skip links, focus management, print styles, ARIA)
- Phased content visibility — sections toggled by title matching in the template

## Architecture

```
theme/                              Scroll Viewport theme (upload as-is)
├── page.vm                         Velocity template — all page rendering
├── css/style.css                   Complete stylesheet (light + dark mode)
├── js/main.js                      Search, navigation, interactivity
└── images/                         Logos, facility photos, assets

content/
├── wiki-markup/                    Source content (paste via Insert → Markup)
│   ├── About-the-SKA/              5 pages
│   ├── Science-Verification/       1 page
│   ├── Data/                       4 pages (ODP documentation)
│   ├── Support/                    1 page (22 Q&A pairs)
│   ├── SRCNet/                     1 page
│   ├── Tools/                      3 pages
│   ├── Observing/                  6 pages (Full Operations phase)
│   └── Proposing/                  2 pages (Full Operations phase)
└── html/                           HTML reference copies

docs/
├── PAGE-TREE-MAPPING.md            Confluence page tree and setup guide
└── ACTION-PLAN-v1.0.md             v1.0 feature audit and implementation plan
```

## Technology

| Layer | Implementation |
|---|---|
| CMS | Confluence Data Centre 8.5.26 (Community License) |
| Theme engine | Scroll Viewport (K15t) |
| Templates | Apache Velocity 1.6 |
| Frontend | Vanilla JS + CSS — no build step, no dependencies |
| Search | Confluence REST API with CQL queries |
| Physics (404) | [Matter.js](https://brm.io/matter-js/) 0.19.0 (CDN, loaded conditionally) |
| Space key | `SPK` |

## Getting started

### Prerequisites

- Confluence Data Centre 8.5.26+ with Scroll Viewport installed
- Space-level admin access to the `SPK` space

### Deployment

1. Navigate to **Space Settings → Scroll Viewport → Themes** in Confluence
2. Upload the contents of `theme/` as a custom theme
3. Create the page tree as documented in [`docs/PAGE-TREE-MAPPING.md`](docs/PAGE-TREE-MAPPING.md)
4. Paste content from `content/wiki-markup/` into each page via **Insert → Markup → Confluence wiki**
5. Publish the Viewport

### Local development

```bash
git clone https://github.com/JDiamondSKAO/skao-science-portal.git
cd skao-science-portal
```

Theme files can be edited locally and uploaded directly to Scroll Viewport. There is no build step — changes to `page.vm`, `style.css`, and `main.js` take effect on publish.

## Content phases

The portal follows a phased rollout aligned with telescope commissioning milestones:

| Phase | Status | Sections |
|---|---|---|
| Science Verification | **Active** | About, Getting Started, Science Verification, Data, Support, SRCNet, Tools |
| Full Operations | Content ready, hidden | Observing, Proposing |

Visibility is controlled in `page.vm` via title matching — no content deletion required to toggle phases.

## Technical notes

| Topic | Detail |
|---|---|
| Page URLs | Use `$page.absoluteLink` — `$page.url` outputs literal text in Viewport |
| Child pages | Confluence `{children}` macro does not render in Viewport — handled dynamically in `page.vm` |
| Homepage detection | `#set($isHomePage = (!$page.parent))` distinguishes root from section pages |
| Date formatting | `$dateTool` is unavailable in Viewport — dates are formatted client-side via JS |
| 404 handling | Viewport routes errors through `page.vm`, not a dedicated template — detected by `$page.title` |
| Content format | Confluence DC "Insert markup" supports Wiki Markup and Markdown only, not raw HTML |

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for development conventions, commit standards, and the review process.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for a full release history.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md) for planned improvements across accessibility, personalisation, and content expansion.

---

<p align="center">
  <strong>SKA Observatory</strong><br>
  Jodrell Bank, Cheshire, United Kingdom<br>
  <a href="https://www.skao.int">skao.int</a>
</p>
