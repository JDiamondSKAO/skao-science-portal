# SKAO Science Users Portal

Custom Scroll Viewport theme and content for the SKAO Science Users Portal, built on Confluence Data Centre 8.5.26 with Scroll Viewport (K15t).

## Project Structure

```
skao-science-portal/
├── theme/                    # Scroll Viewport custom theme files
│   ├── page.vm               # Main Velocity template (all page rendering)
│   ├── BACKUP-navigate-sidebar.vm  # Removed sidebar nav (kept for reference)
│   ├── css/
│   │   └── style.css         # Complete theme stylesheet
│   ├── js/
│   │   └── main.js           # Client-side interactivity & search
│   └── images/
│       ├── skao-logo-white.png   # SKAO logo (300px, white)
│       └── header-bg.jpg        # Telescope background (1920px)
├── content/
│   ├── wiki-markup/          # Confluence Wiki Markup pages (use these)
│   │   ├── About-the-SKA/
│   │   ├── Science-Verification/
│   │   ├── Data/
│   │   ├── Support/
│   │   ├── SRCNet/
│   │   ├── Tools/
│   │   ├── Observing/        # Full Operations phase (hidden for now)
│   │   └── Proposing/        # Full Operations phase (hidden for now)
│   └── html/                 # HTML versions (reference only)
│       └── [same structure]
├── docs/
│   └── PAGE-TREE-MAPPING.md  # Confluence page tree structure & setup guide
└── README.md
```

## Stack

- **Confluence Data Centre** 8.5.26 (Community License)
- **Scroll Viewport** (K15t) — custom theme rendering
- **Velocity Template Language** 1.6 — `page.vm` template
- **Vanilla JS + CSS** — no build tools, no framework dependencies
- **Space key:** `SPK`

## Theme Features (v0.7)

- Responsive homepage with hero, Quick Access cards, Recent Updates
- Dynamic navigation from Confluence page tree (no hardcoded links)
- Title-based icon/description matching for section cards
- Live search via Confluence REST API (CQL)
- Section page templates with child page listings
- Breadcrumb navigation for content pages
- Keyboard shortcuts (Ctrl+K search, Esc close)
- Mobile-responsive header and navigation

## Phased Content Approach

The portal follows a phased rollout aligned with the team's Miro board:

- **Science Verification (SV) phase** — Currently active. Sections: About, Getting Started, Science Verification, Data, Support, SRCNet, Tools
- **Full Operations phase** — Content ready but hidden from homepage. Sections: Observing & Proposing

## Deployment

1. In Confluence, go to **Space Settings → Scroll Viewport → Themes**
2. Upload the contents of `theme/` as a custom theme
3. Create the Confluence page tree as documented in `docs/PAGE-TREE-MAPPING.md`
4. Paste wiki markup content from `content/wiki-markup/` into each page using **Insert → Markup → Confluence wiki**
5. Publish the Viewport

## Key Technical Notes

- Scroll Viewport uses `$page.absoluteLink` (NOT `$page.url`) for page URLs
- The `{children}` Confluence macro does NOT render in Viewport — child pages are rendered dynamically in `page.vm`
- Homepage detection uses `#set($isHomePage = (!$page.parent))` to distinguish root from section pages
- Header nav always resolves to root-level sections by walking up `$page.parent` chain
- Confluence DC's "Insert markup" dialog only supports Wiki Markup and Markdown — not raw HTML

## Version History

| Version | Date       | Changes |
|---------|------------|---------|
| v0.7    | 2026-03-24 | Live search, navigate sidebar removed, Quick Access Figma match, wiki markup content, section page templates |
| v0.6    | 2026-03    | Initial full theme — hero, Quick Access, Recent Updates, header nav, footer |
