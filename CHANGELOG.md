# Changelog

All notable changes to the SKAO Science Operations Portal are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [1.3.0] — 2026-04-15

### Added
- Hero image banner with overlay (inline Velocity URL for theme asset resolution)
- Colour-coded status bar with dividers (SKA-Low, SKA-Mid, SRCNet)
- Two-column announcements and deadlines layout with card-style list items
- Coloured left-accent borders on announcements matched to category badges
- Info bar section (Citing Data, Share Research, Contact, Stay Updated)
- Orange announcement banner with vertical-centred close button
- SCIENCE_GOALS.png hero image

### Changed
- Quick Access reduced to 5 hardcoded cards (Getting Started, Sensitivity Calculator, Science Verification, Science Gateway, SKA Helpdesk)
- Hero section simplified — removed CTA buttons and collapse toggle
- Section heading colour darkened for better light-mode contrast (slate-400 → slate-600)
- Nav hover/active states changed to translucent overlay for consistent light/dark behaviour
- Status bar text colours darkened for WCAG contrast (grey, blue, amber)
- Facility image height reduced from 180px to 140px
- README streamlined for professional presentation

### Removed
- Tools & Services section (merged into Quick Access)
- Community row and newsletter section (replaced by info bar)
- Announcement filter tabs
- Hero collapse/expand functionality
- Associated JavaScript for removed features

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
