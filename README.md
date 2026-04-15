<p align="center">
  <img src="theme/images/skao-logo-colour.png" alt="SKA Observatory" width="280">
</p>

<h2 align="center">Science Operations Portal</h2>

<p align="center">
  Documentation portal for astronomers and researchers using the<br>
  SKA Observatory's telescope facilities, data products, and computing infrastructure.
</p>

<p align="center">
  <a href="https://github.com/JDiamondSKAO/skao-science-portal/releases"><img src="https://img.shields.io/badge/release-v1.3-0052CC?style=flat-square" alt="Release"></a>
  <img src="https://img.shields.io/badge/confluence-8.5-0052CC?style=flat-square&logo=confluence&logoColor=white" alt="Confluence">
  <img src="https://img.shields.io/badge/viewport-K15t-4a5568?style=flat-square" alt="Scroll Viewport">
  <img src="https://img.shields.io/badge/WCAG-2.1_AA-green?style=flat-square" alt="WCAG 2.1 AA">
</p>

---

## Overview

The Science Operations Portal is the primary reference for the international science community engaging with the Square Kilometre Array. It covers telescope access, observing procedures, data products, science verification, and the SRCNet distributed computing infrastructure.

Built as a custom [Scroll Viewport](https://www.k15t.com/software/scroll-viewport) theme for Confluence Data Centre — a single Velocity template, vanilla CSS, and dependency-free JavaScript. No build tools or frameworks required.

## Features

- Responsive layout with full dark mode support
- Search via Confluence REST API with keyboard navigation
- Auto-generated table of contents with scroll-spy
- Dynamic announcements from labelled blog posts
- WCAG 2.1 AA compliant throughout
- Interactive 404 page (Matter.js)

## Deployment

1. Navigate to **Space Settings → Scroll Viewport → Themes** in Confluence
2. Upload the contents of `theme/` as a custom theme
3. Create the page tree per [`docs/PAGE-TREE-MAPPING.md`](docs/PAGE-TREE-MAPPING.md)
4. Publish the Viewport

Theme files can be edited locally and uploaded directly — changes take effect on publish.

## Repository

```
theme/          Scroll Viewport theme (upload as-is)
content/        Source content in Confluence wiki markup
docs/           Setup guides and reference
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for development workflow and code standards.
See [`CHANGELOG.md`](CHANGELOG.md) for release history.

---

<p align="center">
  <strong>SKA Observatory</strong> · Jodrell Bank, Cheshire, UK · <a href="https://www.skao.int">skao.int</a>
</p>
