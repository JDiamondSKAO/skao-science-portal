# SKA Science Operations Portal — Confluence Page Tree

Mapped to the team's Miro board phased approach. Pages marked **SV** are Science Verification phase (priority). Pages marked **FO** are Full Operations phase (create now, publish later).

## Space: SPK (Science Portal Knowledge)

```
SKA Science Operations Portal (Homepage)          ← Scroll Viewport homepage
│
├── About the SKA                                  [SV] Section index page
│   ├── About the SKAO                             [SV] 4 images to upload
│   ├── About the SRCNet                           [SV] 1 image to upload
│   ├── SKA Staged Delivery and Array Assemblies   [SV] text only
│   ├── Technical Description                      [SV] 2 images to upload
│   └── User Access                                [SV] text only
│
├── Getting Started                                [SV] Section index page (content TBD)
│   └── (User Access content may cross-link here)
│
├── Science Verification                           [SV] Section index page
│   └── Introduction to Science Verification       [SV] 1 image to upload
│
├── Data                                           [SV] Section index page
│   ├── Introduction to ODPs and ADPs              [SV] text only, 2 tables
│   ├── Pulsar Timing ODP                          [SV] text only, 1 table
│   ├── Detected Filterbank ODP                    [SV] text only, 1 table
│   └── Flowthrough Archive ODP                    [SV] 1 image, 1 table
│
├── Support                                        [SV] Section index page
│   └── FAQ                                        [SV] 22 Q&A pairs
│
├── SRCNet                                         [SV] Section index page
│   └── SKA Regional Centres                       [SV] 8 images to upload
│
├── Tools                                          [SV] Section index page
│   ├── Sensitivity Calculator                     [SV] text only
│   ├── SKA Set Up Validator                       [SV] text only
│   └── SKA Subarray Templates Library             [SV] text only
│
├── Observing                                      [FO] Section index page
│   ├── Capabilities Overview                      [FO] text only
│   ├── Subarrays                                  [FO] 1 image
│   ├── Substations                                [FO] 1 image
│   ├── Commensal Observing                        [FO] 1 image
│   ├── Tied-Array Beams (PST)                     [FO] text only
│   └── VLBI                                       [FO] 1 image
│
└── Proposing                                      [FO] Section index page
    ├── Proposal Types                             [FO] text only
    └── Proposal Attributes                        [FO] text only
```

## How to Create These Pages in Confluence

### Step 1: Create the section parent pages
Create these pages as children of your SPK homepage, in this order:
1. About the SKA ----
2. Getting Started -----
3. Science Verification ---- 
4. Data ---- 
5. Support ----
6. SRCNet -----
7. Tools ---- 
8. Observing (can be created as draft/unpublished for now)
9. Proposing (can be created as draft/unpublished for now)

For each section parent page, paste the content from the corresponding `_index.html` file. This adds a `{children}` macro that auto-lists child pages.

### Step 2: Create child pages under each section
For each child page:
1. Create a new page under the parent section
2. Set the page title to match the name in the tree above
3. Switch to the **Source Editor** (click `<>` in the toolbar, or use the Insert → Markup option)
4. Paste the HTML content from the corresponding `.html` file
5. For pages with **[Image placeholder]** blocks: upload the original images from the docx files and replace the info macro placeholders

### Step 3: Update the Viewport theme
The Quick Access cards in the homepage `page.vm` should link to these section pages. Update the `href` values once pages are created:
- About the SKA → `/wiki/spaces/SPK/pages/XXXXX`
- Getting Started → `/wiki/spaces/SPK/pages/XXXXX`
- Science Verification → `/wiki/spaces/SPK/pages/XXXXX`
- etc.

### Step 4: Update Recent Updates
Replace the 4 placeholder Recent Updates cards with real pages once content is published.

## Content Notes

| Page | Notes |
|------|-------|
| About the SKAO | Contains `[link TBD]` markers where internal cross-links need adding |
| User Access | May also serve Getting Started section (cross-link) |
| Introduction to Science Verification | Scratchpad/working notes removed — original doc had drafting notes at the bottom |
| FAQ | 22 Q&A pairs formatted as h3 questions + paragraph answers. Some answers marked "coming soon" |
| SKA Regional Centres | 8 images — mostly country/institution logos. Heavy image page. |
| Intro to ODPs and ADPs | Two detailed tables — SDP Data Product Types and ADP types |
| All Tools pages | Relatively short — may benefit from screenshots once tools are live |

## Image Upload Checklist
Total images to upload: **20** across 8 pages

- [ ] About the SKAO (4): SKA-Low photo, array layouts ×2, SKA-Mid photo
- [ ] About the SRCNet (1): SRCNet architecture diagram
- [ ] Technical Description (2): telescope technical diagrams
- [ ] Introduction to Science Verification (1): SV process diagram
- [ ] Flowthrough Archive ODP (1): data flow diagram
- [ ] SKA Regional Centres (8): SRC node logos/maps
- [ ] Subarrays (1): subarray configuration diagram
- [ ] Substations (1): substation layout diagram
- [ ] Commensal Observing (1): commensal mode diagram
- [ ] VLBI (1): VLBI network diagram
