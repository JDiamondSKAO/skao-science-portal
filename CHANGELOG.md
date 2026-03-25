# Changelog

All notable changes to the SKAO Science Operations Portal are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [1.1.0] — 2026-03-25

### Added
- Dark mode with toggle, localStorage persistence, and FOUC prevention
- Dynamic announcements sourced from Confluence blog posts via CQL REST API
- Interactive 404 error page with Matter.js physics and SKAO pictorial marks
- Auto-generated table of contents with scroll-spy on content pages
- "Was this page helpful?" feedback widget on all content pages
- Client-side date formatting (replacing unavailable `$dateTool`)
- Code block copy-to-clipboard buttons
- Announcement banner with dismiss persistence

### Changed
- Events section redesigned as compact inline timeline with category filter tabs
- Contact Magazine card enlarged with updated cover image and description
- Section page child listings use `<span>` titles to prevent TOC duplication
- Sidebar navigation no longer duplicates on section pages
- Content body conditionally rendered to prevent empty white box on navigation pages

### Fixed
- Filter tabs retaining white background in dark mode (CSS specificity)
- Contact cover image path updated from `.jpg` to `.png`
- Events container width alignment with adjacent sections
- Feedback widget appearing at top of page instead of bottom
- 404 detection for Scroll Viewport (routes through `page.vm`, not a separate template)

## [1.0.1] — 2026-03-24

### Fixed
- Deadline filter tab alignment
- Status strip centering on content pages
- Minor spacing inconsistencies

## [1.0.0] — 2026-03-24

### Added
- Full feature parity with ESO, NRAO, and ALMA science portals
- Persistent "Get Help" button linking to SKAO Jira Service Desk
- Facility status strip with live indicators
- Breadcrumb navigation on all content pages
- Print stylesheet with clean page breaks and visible URLs
- Skip-to-content link (WCAG 2.1 AA)
- ARIA landmarks and focus management throughout

### Changed
- Complete visual overhaul of homepage layout
- Quick Access cards redesigned with iconography
- Header navigation restructured for clarity

## [0.10.0] — 2026-03-24

### Added
- Accessibility improvements (WCAG focus states, skip links)
- Developer documentation and deployment guide

## [0.9.0] — 2026-03-24

### Added
- Category filter tabs on Recent Updates and Events sections
- Relative date formatting ("2 days ago")
- Skeleton loading states for dynamic content
- Dynamic footer sections

## [0.8.0] — 2026-03-24

### Changed
- Hero typography and spacing refinements
- Card hover states across all interactive elements
- WCAG-compliant focus indicators
- Icon sizing and spacing consistency pass

## [0.7.0] — 2026-03-24

### Added
- Live search via Confluence REST API with CQL queries
- Quick Access card grid matched to Figma designs
- Section page templates with sidebar navigation
- Wiki markup content for all Science Verification pages

### Removed
- Sidebar removed from homepage (replaced by Quick Access grid)

## [0.6.0] — 2026-03

### Added
- Initial theme implementation
- Hero section, Quick Access grid, Recent Updates, header navigation, footer
- Responsive layout (mobile through desktop)
- Basic page rendering via Scroll Viewport
