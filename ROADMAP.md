# Roadmap

Planned improvements for the SKAO Science Operations Portal, organised by category. Items are indicative and subject to change based on user feedback and telescope commissioning timelines.

## Visual and UX refinements

- Spacing and rhythm pass across all sections for consistent vertical flow
- Card depth and shadow refinement for Recent Updates and Quick Access
- Hero section scaling options for different viewport aspect ratios

## Functional enhancements

- Quick links or "Popular Pages" surface based on analytics data
- Observatory status widget — live or near-live telescope status indicator
- Personalisation layer — recently viewed pages and bookmarks for authenticated users
- Interactive onboarding flow for first-time visitors
- Newsletter signup integration in the footer
- Social media links to SKAO official channels

## Accessibility and internationalisation

- Loading skeleton states for dynamically fetched content (announcements, search)
- Screen reader testing pass with NVDA and VoiceOver
- Right-to-left (RTL) layout support if required by future SKAO member states
- High contrast mode option beyond standard dark mode

## Content and operations

- Upload remaining ~20 images to Confluence pages (see `docs/PAGE-TREE-MAPPING.md`)
- Replace placeholder footer links with real Confluence page URLs
- Resolve `[link TBD]` markers in converted content
- Enable Observing and Proposing sections when Full Operations phase begins
- Memo Series archive — 151 SKA Memos migrated to portal pages

## Technical debt

- Automated visual regression tests for theme updates
- Performance audit (Lighthouse) with target scores documented
- Content delivery optimisation for large facility images
- Structured logging for search queries to inform content gaps
