<p align="center">
  <img src="theme/images/skao-logo-colour.png" alt="SKAO" width="300">
</p>

<h1 align="center">Science Users Portal</h1>

<p align="center">
  <strong>Custom Scroll Viewport theme for the SKAO Science Users Portal</strong><br>
  Built on Confluence Data Centre 8.5.26 &middot; Scroll Viewport (K15t) &middot; Velocity + Vanilla JS
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.9-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/confluence-8.5.26-0052CC?style=flat-square&logo=confluence&logoColor=white" alt="Confluence">
  <img src="https://img.shields.io/badge/scroll_viewport-K15t-4B5563?style=flat-square" alt="Scroll Viewport">
  <img src="https://img.shields.io/badge/license-internal-lightgrey?style=flat-square" alt="Internal">
</p>

---

## Overview

The SKAO Science Users Portal provides astronomers and researchers with documentation, tools, and guidance for using the Square Kilometre Array Observatory. This repository contains the custom Scroll Viewport theme and all page content in Confluence-ready format.

The portal follows a **phased rollout** aligned with the team's Miro board:

| Phase | Status | Sections |
|-------|--------|----------|
| **Science Verification** | Active | About, Getting Started, Science Verification, Data, Support, SRCNet, Tools |
| **Full Operations** | Content ready, hidden | Observing, Proposing |

## Features

- **Dynamic navigation** — built from the Confluence page tree, no hardcoded links
- **Live search** — real-time results via Confluence REST API (CQL), keyboard navigable
- **Responsive design** — mobile-first header, Quick Access grid, and content layouts
- **Section page templates** — automatic child page listings with sidebar navigation
- **Keyboard shortcuts** — `Ctrl+K` to search, `Esc` to close, arrow keys to navigate results
- **Phased content control** — sections can be shown/hidden by title matching in the template

## Project Structure

```
theme/                          Scroll Viewport custom theme
├── page.vm                     Main Velocity template (all rendering)
├── css/style.css               Complete stylesheet
├── js/main.js                  Interactivity, search, keyboard shortcuts
└── images/                     Logo & header background

content/
├── wiki-markup/                Confluence Wiki Markup (use these)
│   ├── About-the-SKA/          5 pages
│   ├── Science-Verification/   1 page
│   ├── Data/                   4 pages
│   ├── Support/                1 page (FAQ, 22 Q&A pairs)
│   ├── SRCNet/                 1 page
│   ├── Tools/                  3 pages
│   ├── Observing/              6 pages (Full Ops phase)
│   └── Proposing/              2 pages (Full Ops phase)
└── html/                       HTML reference versions

docs/
└── PAGE-TREE-MAPPING.md        Page tree structure & setup guide
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| CMS | Confluence Data Centre 8.5.26 (Community License) |
| Theme engine | Scroll Viewport (K15t) |
| Template language | Apache Velocity 1.6 |
| Frontend | Vanilla JS + CSS (no build tools, no frameworks) |
| Search | Confluence REST API with CQL queries |
| Space key | `SPK` |

## Getting Started

### Deployment

1. Go to **Space Settings → Scroll Viewport → Themes** in Confluence
2. Upload the contents of `theme/` as a custom theme
3. Create the page tree as documented in [`docs/PAGE-TREE-MAPPING.md`](docs/PAGE-TREE-MAPPING.md)
4. Paste content from `content/wiki-markup/` into each page via **Insert → Markup → Confluence wiki**
5. Publish the Viewport

### Local Development

```bash
git clone https://github.com/JDiamondSKAO/skao-science-portal.git
cd skao-science-portal
```

Theme files can be edited directly and uploaded to Scroll Viewport. No build step required.

## Key Technical Notes

| Topic | Detail |
|-------|--------|
| Page URLs | Use `$page.absoluteLink` — not `$page.url` (outputs literal text) |
| Child pages | `{children}` macro doesn't render in Viewport — handled dynamically in `page.vm` |
| Homepage detection | `#set($isHomePage = (!$page.parent))` distinguishes root from section pages |
| Header nav | Always resolves to root-level sections by walking up `$page.parent` chain |
| Content format | Confluence DC's "Insert markup" only supports Wiki Markup and Markdown — not HTML |

## Roadmap

See [`ROADMAP.md`](ROADMAP.md) for planned improvements including visual polish, accessibility enhancements, filtering, personalisation, and additional features.

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| **v0.9** | 2026-03-24 | Category filter tabs, relative date formatting, skeleton loading states, dynamic footer sections |
| **v0.8** | 2026-03-24 | Hero typography, card hover states, WCAG focus states, icon sizing, spacing refinements |
| **v0.7** | 2026-03-24 | Live search, sidebar removed, Quick Access cards matched to Figma, wiki markup content, section page templates |
| **v0.6** | 2026-03 | Initial full theme — hero, Quick Access, Recent Updates, header nav, footer |

---

<p align="center">
  <strong>SKA Observatory</strong> &middot; Jodrell Bank, Cheshire, UK<br>
  <em>Building the world's largest radio telescope</em>
</p>
