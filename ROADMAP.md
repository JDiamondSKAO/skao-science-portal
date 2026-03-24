# SKAO Science Portal — Improvement Roadmap

Tracked improvements for future iterations, organised by category.

## Visual & UX Enhancements

- [x] Icon consistency — Quick Access icons need more visual consistency in style/weight
- [ ] Recent Updates cards — Add subtle borders or shadows for more card-like, clickable feel
- [ ] Typography hierarchy — Hero title could be slightly larger/bolder for more impact
- [x] Hover states — Ensure all interactive elements have clear hover feedback
- [ ] Spacing refinement — Some sections could benefit from more breathing room

## Functional Improvements

- [x] Search refinement — Make search bar more prominent, improve result links for Viewport URLs
- [x] Recent Updates filtering — Add category filters/tabs (All, Documentation, Software, Announcements)
- [x] Date formatting — Relative dates ("2 days ago") for better scannability
- [x] "View All Updates" link — Commented out until real URL exists (was dead `href="#"`)

## Content & Accessibility

- [ ] Loading states — Plan for skeleton loaders or empty states
- [x] Mobile responsiveness — Quick Access grid stacks nicely on smaller screens ✓
- [x] Accessibility — Focus states for keyboard navigation (WCAG compliance) ✓
- [x] Breadcrumbs — Full ancestor breadcrumb trail on content pages ✓
- [x] Skip-to-content link — Hidden link for keyboard/screen reader users (WCAG 2.1 AA) ✓
- [x] Print stylesheet — `@media print` hiding non-essential UI, showing link URLs ✓

## Additional Features

- [ ] Quick links / "Popular Pages" section
- [ ] Status indicators — Observatory status or upcoming maintenance
- [ ] Newsletter signup in footer
- [ ] Social media links (SKAO official channels)
- [x] Last updated date — Content pages show `$page.lastModificationDate` ✓
- [ ] Personalisation — "Recently viewed" or "Bookmarked" for logged-in users
- [ ] Interactive tutorials or onboarding flow for first-time visitors
- [x] Auto-generated table of contents — Client-side TOC from h2/h3 headings with scroll-spy ✓
- [x] Code block copy-to-clipboard — Hover-reveal copy button on `<pre>` blocks ✓
- [x] Announcement banner persistence — Dismiss remembered via localStorage, keyed to text ✓

## Pending Technical Tasks

- [ ] Upload 20 images to Confluence pages (see docs/PAGE-TREE-MAPPING.md)
- [ ] Replace placeholder Recent Updates with real content
- [ ] Replace placeholder footer links with real Confluence page URLs
- [ ] Clean up `[link TBD]` markers in converted content
- [ ] Test theme after publishing Viewport (fix draft preview session expiry)
- [ ] Unhide Observing & Proposing when Full Operations phase begins

## Easter Eggs 🥚

- [x] Wow! Signal — Type "wow" anywhere on the page
- [x] Hydrogen Line — Type "1420" anywhere on the page
- [x] Pulsar — Type "pulsar" anywhere on the page
- [x] 42 — Click the SKAO logo 42 times rapidly
- [x] "Don't show again" toggle — localStorage-based suppression per egg
- Note: Easter egg files (`eggs.css`, `eggs.js`) are excluded from git via `.gitignore`
