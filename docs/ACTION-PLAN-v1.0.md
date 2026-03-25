# SKAO Science Portal — v1.0 Action Plan

**Date:** 24 March 2026
**Author:** Joe Diamond, Creative Production Lead
**Current version:** v0.10
**Target version:** v1.0

This document captures all planned improvements for the next major release of the SKAO Science Users Portal, informed by a comparative audit against ESO (eso.org/sci), NRAO (science.nrao.edu), ALMA (almascience.eso.org), and CERN science portals.

The work is organised into four stages, roughly in order of priority and dependency. Each stage can be shipped independently.

---

## Stage 1 — Parity Features

Features that ESO and NRAO both have and that our portal currently lacks. These are table-stakes for a credible science portal and should ship first.

### 1.1 Persistent Help Button

**What:** A floating "Get Help" button (bottom-right, above back-to-top) that links to the SKAO Jira Service Desk. Always visible on every page.

**Why:** ESO links support.eso.org from every page. NRAO has help.nrao.edu in their top nav. Our helpdesk link is buried in the footer. Astronomers who are stuck need one-click access to support, not a scavenger hunt.

**Implementation:**
- Add a fixed-position button to `page.vm` (similar to `.back-to-top`)
- Style as a pill: headset icon + "Get Help" label, collapsing to icon-only on mobile
- Link: `https://jira.skatelescope.org/servicedesk`
- CSS: `.help-btn` in `style.css`, appears after 200px scroll (same as back-to-top)
- Consider adding a tooltip on hover: "SKAO Science Helpdesk"

**Effort:** Small (< 1 hour)

---

### 1.2 Observatory Status Indicators

**What:** A compact status strip below the announcement banner showing the current state of each telescope — e.g. "SKA-Mid: Commissioning · SKA-Low: Construction · SRCNet: Beta"

**Why:** ALMA shows telescope status prominently. Astronomers check this constantly to know if the facility they care about is operational, in maintenance, or offline. This reduces helpdesk load and sets expectations immediately.

**Implementation:**
- New `<section class="status-strip">` in `page.vm`, between announcement banner and `<main>`
- Each facility gets a coloured dot: green (operational), amber (commissioning/maintenance), grey (construction/offline)
- Status data could be:
  - **Phase 1:** Hardcoded in `page.vm` (updated manually per release)
  - **Phase 2:** Pulled from a dedicated Confluence page via REST API (editable by ops team without theme changes)
  - **Phase 3:** Pulled from an external status API if one exists
- Clicking a facility name could link to its dedicated status/info page

**Effort:** Small for Phase 1, Medium for Phase 2

---

### 1.3 Upcoming Deadlines & Events Widget

**What:** A homepage section (alongside or replacing part of Recent Updates) showing time-sensitive items — proposal deadlines, workshops, maintenance windows, key dates.

**Why:** Both ESO and NRAO feature upcoming events on their homepage. ESO has dated event listings in the sidebar. NRAO shows upcoming workshops and conferences. Our portal has no concept of "what's coming up" — only "what recently happened."

**Implementation:**
- New `<section class="upcoming-deadlines">` on the homepage, after Recent Updates
- Each item: date, title, category badge (Deadline / Workshop / Maintenance), brief description, link
- Visual: countdown for items <7 days away ("3 days left"), calendar icon for dates further out
- Data source options:
  - **Phase 1:** Hardcoded cards in `page.vm` (like Recent Updates currently)
  - **Phase 2:** Driven by a Confluence page with a structured table (parsed client-side or via macro)
  - **Phase 3:** REST API pulling from a Confluence calendar or external events system
- Filter tabs: All | Deadlines | Workshops | Maintenance

**Effort:** Medium

---

### 1.4 Tools & Services as First-Class Navigation

**What:** Promote the Sensitivity Calculator, SRCNet Portal, Data Archive, and Proposal Tool from footer links to prominent Quick Access cards and/or a dedicated "Tools & Services" row.

**Why:** ESO treats the Science Archive, Data Portal, and observing tools as top-level navigation with full sub-menus. NRAO has data.nrao.edu as a primary link. Our Sensitivity Calculator and SRCNet links are buried in the Resources section of the footer — astronomers use these daily.

**Implementation:**
- Add a "Tools & Services" section to the homepage, either:
  - As a second row in Quick Access with distinct card styling (darker background, external-link icon)
  - Or as a standalone horizontal strip below Quick Access
- Cards for: Sensitivity Calculator, SRCNet Portal, Data Archive, Proposal Submission, SKAO Helpdesk
- Each card: icon, title, one-line description, `target="_blank"` for external tools
- Also add "Tools" as a nav item in the header bar (linking to an anchor or a dedicated tools page)

**Effort:** Medium

---

### 1.5 Science Announcements Feed (Enhanced)

**What:** Transform the current Recent Updates section into a proper announcements feed with more entries, real content, "View All" link, and RSS.

**Why:** ESO's entire homepage centre column is a dated science announcements feed — each entry has a published date, summary, thumbnail, and "Go to Announcement" link. They also offer RSS and newsletter subscribe links at the bottom. Our Recent Updates has 4 placeholder cards.

**Implementation:**
- Expand Recent Updates to 6–8 cards
- Each card sourced from real Confluence pages (either hardcoded or CQL-driven)
- Add "View All Announcements" link (pointing to a Confluence page that lists all announcements)
- Add RSS icon linking to a feed (Confluence can generate RSS per space via `/spaces/SPK/rss`)
- Add "Subscribe to Newsletter" link alongside RSS
- Consider pulling recent child pages from an "Announcements" parent page via Confluence REST API for auto-updating

**Effort:** Medium (hardcoded) / Large (API-driven)

---

## Stage 2 — Community & Engagement

Features that make the portal feel like a living community hub rather than a static documentation site.

### 2.1 Newsletter / Mailing List Signup

**What:** An inline email signup form on the homepage (and optionally in the footer) for the SKAO Science Newsletter or Contact magazine notifications.

**Why:** ESO has newsletter subscribe links on every page. NRAO has science newsletter signup. An inline form captures more subscriptions than a link to an external page.

**Implementation:**
- Simple form: email input + "Subscribe" button
- If SKAO has a mailing list service (Mailchimp, Campaign Monitor, etc.), POST directly to its API
- If not, link to the existing skao.int/subscribe page but style it as an embedded callout
- Place in a new section between Recent Updates and the footer, or as a slim strip
- Include: "Get the latest science updates, proposal deadlines, and observatory news"

**Effort:** Small (link) / Medium (inline form with API)

---

### 2.2 "Latest from Contact Magazine" Widget

**What:** A homepage sidebar or section featuring the most recent issue of Contact magazine — cover image, issue number, 2–3 article highlights, "Read the full issue" link.

**Why:** ESO prominently features The Messenger (their equivalent magazine) on the sci.html homepage with issue number and article highlights. Contact gets 91k reads per issue — it deserves homepage visibility.

**Implementation:**
- Small card or section on the homepage
- Cover thumbnail, issue title, 2–3 bullet points of key articles
- "Read Contact 19 →" link to the online version
- Updated manually each issue (only ~3–4 times per year)

**Effort:** Small

---

### 2.3 "Cite SKAO Data" & "Pitch Your Research" Callouts

**What:** Two small callout boxes on content pages (or the homepage) guiding researchers on data citation policy and how to share their results with the SKAO comms team.

**Why:** ESO has both of these on their sci.html homepage. "Citing ESO data in research papers" with a link to their data citation policy, and "Pitch Your Research to ESO COMM" encouraging researchers to flag upcoming papers. These are low-effort, high-value additions that serve both the science community and the comms team.

**Implementation:**
- Two styled callout boxes (`.callout-cite`, `.callout-pitch`)
- "Cite SKAO Data": Brief text + link to SKAO data policy page
- "Share Your Research": Brief text + link to a comms submission form or email
- Place on homepage below announcements, or as a sidebar element on content pages

**Effort:** Small

---

### 2.4 Facility Image Cards

**What:** Add thumbnail images to the Quick Access cards (or a separate "Our Facilities" visual row) showing SKA-Mid, SKA-Low, and other key facilities.

**Why:** ESO has a visual row of telescope images at the bottom of their homepage (La Silla, VLT, APEX, Science Archive). NRAO features telescope cards with photographs. Visual recognition of facilities makes the portal feel less generic and more distinctly SKAO.

**Implementation:**
- Source images from Canto DAM (SKA-Mid dishes, SKA-Low dipoles, HQ, etc.)
- Either add `background-image` to existing Quick Access cards, or create a new "Facilities" row
- Ensure images are optimised for web (compressed, lazy-loaded)
- On hover: slight zoom or overlay effect

**Effort:** Medium (requires image selection, optimisation, and upload to Viewport theme)

---

## Stage 3 — Developer & Power-User Features

Features for the more technical audience — pipeline users, software developers, data analysts.

### 3.1 Documentation Versioning & Changelog

**What:** A visible version indicator on documentation pages (e.g. "Pipeline v2.3.1 — Updated 15 Mar 2026") and a "What's New" changelog page.

**Why:** Scientific software docs at ALMA, ESO, and CERN typically show version numbers. Astronomers need to know if they're reading current documentation or something outdated. This becomes critical when pipeline versions change between observing cycles.

**Implementation:**
- Add a Confluence page property or label convention for versioned docs (e.g. label `pipeline-v2.3`)
- Display version badge in the article header (next to the last-updated date)
- Create a "Changelog" or "Release Notes" parent page in Confluence
- Style version badges: `.version-badge` with colour coding (latest = green, older = grey)

**Effort:** Medium

---

### 3.2 Contextual "Was this helpful?" Feedback

**What:** A thumbs up/down widget at the bottom of every content page, with an optional one-line text field for comments.

**Why:** Standard on Stripe, GitHub, ReadTheDocs, and other modern documentation sites. Helps identify which pages need improvement without relying on helpdesk tickets or guesswork. Not yet common on observatory portals — SKAO could be an early adopter.

**Implementation:**
- Widget at the bottom of `.content-body`: "Was this page helpful?" + 👍 / 👎 buttons
- On click: expand a small textarea for optional comments + "Submit" button
- Data destination options:
  - **Phase 1:** POST to a Google Form or Confluence form macro (no backend needed)
  - **Phase 2:** Write to a Confluence page comment or Jira ticket via REST API
  - **Phase 3:** Dedicated analytics/feedback service
- Show a "Thank you" confirmation after submission
- Track page title + feedback + optional comment

**Effort:** Medium

---

### 3.3 Enhanced Search (Faceted)

**What:** Add search result facets — filter by section (Getting Started, Data, Tools, etc.), content type (page, attachment, blog post), and date range.

**Why:** ESO's search has a "current section only" toggle. As portal content grows, astronomers will need to narrow results quickly. The current search is already good but will need faceting at scale.

**Implementation:**
- Add filter chips below the search input in the modal
- Use CQL parameters to filter by ancestor page, label, or content type
- Highlight which section each result belongs to (already showing breadcrumbs — extend this to clickable filters)

**Effort:** Large

---

## Stage 4 — Future / Post-Operations

Features that depend on SKAO reaching operational milestones or require infrastructure beyond the current Confluence + Viewport setup.

### 4.1 User Authentication & Personalisation

**What:** Logged-in user features — "Recently Viewed," "My Bookmarks," "My Proposals," personalised dashboard.

**Why:** ESO has the User Portal. NRAO has my.nrao.edu. Once SKAO has authenticated science users submitting proposals, the portal should surface their personal workflow state.

**Dependencies:** Confluence user accounts for external scientists, or SSO integration with the SKAO User Portal.

**Effort:** Large

---

### 4.2 Proposal Submission Workflow Pages

**What:** A structured "Observing with SKAO" section mirroring ESO's Phase 1 → Phase 2 → Phase 3 workflow — from proposal submission through observation preparation to data products.

**Why:** ESO's observing section is the most-visited part of their science portal. It covers policies, time allocation, proposal preparation, observation scheduling, data processing, and publication support. Even during commissioning, having this skeleton in place signals operational readiness.

**Implementation:**
- Create the Confluence page tree: Observing → Policies → Proposals → Preparation → Data Products → Publication Support
- Populate with "Coming Soon" content and expected timelines
- Unhide the currently hidden "Observing & Proposing" pages in the nav

**Effort:** Medium (structure) / Large (content)

---

### 4.3 Live Observatory Status API

**What:** Replace the hardcoded status strip (from 1.2) with a live feed from an observatory status API showing real-time telescope state, weather conditions, and current observations.

**Dependencies:** Operations team providing a status API endpoint.

**Effort:** Large

---

### 4.4 Interactive Data Archive Browser

**What:** An embedded or linked data archive interface (similar to ESO's Science Archive Portal) allowing astronomers to search, preview, and download SKAO data products.

**Dependencies:** SKAO data archive infrastructure, SRCNet integration.

**Effort:** Very large (separate project)

---

## Implementation Summary

| Stage | Feature | Effort | Files Affected |
|-------|---------|--------|----------------|
| **1.1** | Persistent Help Button | Small | page.vm, style.css |
| **1.2** | Observatory Status Strip | Small–Med | page.vm, style.css |
| **1.3** | Upcoming Deadlines Widget | Medium | page.vm, style.css, main.js |
| **1.4** | Tools as First-Class Nav | Medium | page.vm, style.css |
| **1.5** | Enhanced Announcements Feed | Medium–Large | page.vm, style.css, main.js |
| **2.1** | Newsletter Signup | Small–Med | page.vm, style.css |
| **2.2** | Contact Magazine Widget | Small | page.vm, style.css |
| **2.3** | Cite Data / Pitch Research | Small | page.vm, style.css |
| **2.4** | Facility Image Cards | Medium | page.vm, style.css, images/ |
| **3.1** | Doc Versioning & Changelog | Medium | page.vm, style.css |
| **3.2** | "Was this helpful?" Feedback | Medium | page.vm, style.css, main.js |
| **3.3** | Faceted Search | Large | main.js, style.css |
| **4.1** | User Auth & Personalisation | Large | All files + infrastructure |
| **4.2** | Proposal Workflow Pages | Medium–Large | Confluence content |
| **4.3** | Live Status API | Large | main.js, page.vm |
| **4.4** | Data Archive Browser | Very large | Separate project |

---

## Suggested Sprint Plan

**Sprint 1 (v0.11):** Stage 1.1 + 1.2 + 1.4 — Help button, status strip, tools promotion. Small scope, high visibility.

**Sprint 2 (v0.12):** Stage 1.3 + 1.5 — Deadlines widget and enhanced announcements. These reshape the homepage significantly.

**Sprint 3 (v0.13):** Stage 2.1 + 2.2 + 2.3 — Newsletter, Contact widget, cite/pitch callouts. Community engagement quick wins.

**Sprint 4 (v0.14):** Stage 2.4 + 3.1 — Facility images and doc versioning. Visual and structural maturity.

**Sprint 5 (v1.0):** Stage 3.2 + 3.3 + polish — Feedback widget, faceted search, final QA pass. Ship as v1.0.

**Post-v1.0:** Stage 4 features as operational milestones are reached.

---

## Benchmarking Reference

| Feature | ESO | NRAO | SKAO (current) | SKAO (v1.0 target) |
|---------|-----|------|-----------------|---------------------|
| Helpdesk link (persistent) | ✅ support.eso.org | ✅ help.nrao.edu | ❌ Footer only | ✅ Floating button |
| Observatory status | ✅ (via ALMA) | ⚠️ Limited | ❌ | ✅ Status strip |
| Event/deadline calendar | ✅ Sidebar | ✅ Homepage | ❌ | ✅ Homepage widget |
| Tools as top-level nav | ✅ Full sub-menus | ✅ Top nav | ❌ Footer links | ✅ Quick Access row |
| Science announcements feed | ✅ Homepage centre | ✅ Homepage | ⚠️ 4 placeholders | ✅ Full feed + RSS |
| Newsletter signup | ✅ Every page | ✅ Homepage | ⚠️ Footer link | ✅ Inline form |
| Magazine highlights | ✅ The Messenger | ❌ | ❌ | ✅ Contact widget |
| Data citation guidance | ✅ Homepage | ⚠️ | ❌ | ✅ Callout box |
| Doc versioning | ⚠️ Some pages | ⚠️ | ❌ | ✅ Version badges |
| Page feedback | ❌ | ❌ | ❌ | ✅ Thumbs up/down |
| Faceted search | ✅ Section filter | ⚠️ | ❌ | ✅ Facets |
| User personalisation | ✅ User Portal | ✅ my.nrao.edu | ❌ | ⚠️ Post-v1.0 |
| Proposal workflow | ✅ Phase 1/2/3 | ✅ Full pipeline | ❌ (hidden) | ⚠️ Skeleton pages |
| Print stylesheet | ❌ | ❌ | ✅ | ✅ |
| Skip-to-content (a11y) | ✅ | ❌ | ✅ | ✅ |
| TOC with scroll-spy | ❌ | ❌ | ✅ | ✅ |
| Code copy button | ❌ | ❌ | ✅ | ✅ |
| Easter eggs | ❌ | ❌ | ✅ 🥚 | ✅ 🥚 |
