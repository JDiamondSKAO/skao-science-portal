# Confluence Content Markup Guide

Best practices for writing content pages in the SKAO Science Operations Portal. These patterns take advantage of the custom theme styling to produce clean, scannable, professional pages.

---

## Key Principles

1. **Break up long text** — no paragraph should be more than 3–4 sentences. If a section runs longer than a screen height, split it with subheadings.
2. **Use Confluence macros** — Info, Note, Tip, and Warning panels are styled by the theme and add visual variety.
3. **Add excerpts to every page** — the Excerpt macro powers the section page card descriptions.
4. **Use Status lozenges** for milestones, phases, and lifecycle states.
5. **Use Expand macros** for reference detail that not everyone needs.

---

## Example: "About the SKAO" Page

Below is the Confluence Storage Format (XML) for a reworked version of the About the SKAO page. Copy this into the Confluence editor (switch to source/storage format mode) or adapt it in the visual editor.

```xml
<ac:structured-macro ac:name="excerpt">
  <ac:parameter ac:name="atlassian-macro-output-type">BLOCK</ac:parameter>
  <ac:rich-text-body>
    <p>An overview of the SKA Observatory — its mission, member countries, host nations, and telescope facilities.</p>
  </ac:rich-text-body>
</ac:structured-macro>

<p>The SKA Observatory (SKAO) is an intergovernmental organisation tasked with building and operating the world's two largest radio telescope arrays. Established by treaty in 2021, it represents a global effort to answer fundamental questions about the universe.</p>

<ac:structured-macro ac:name="info">
  <ac:rich-text-body>
    <p><strong>Key facts:</strong> 16 member countries · Headquarters at Jodrell Bank, UK · Two telescope sites in Australia and South Africa · €2.1bn total investment</p>
  </ac:rich-text-body>
</ac:structured-macro>

<p>The telescopes are being built in two configurations — SKA-Low in Western Australia and SKA-Mid in South Africa — each optimised for different frequency ranges. Together they will form an array with a total collecting area of approximately one square kilometre.</p>

<h2>Member Countries</h2>

<p>The SKAO was established as an intergovernmental organisation in July 2021. Its current members and host countries are:</p>

<table>
  <tbody>
    <tr>
      <th>Country</th>
      <th>Role</th>
      <th>Joined</th>
    </tr>
    <tr>
      <td>Australia</td>
      <td><ac:structured-macro ac:name="status"><ac:parameter ac:name="colour">Blue</ac:parameter><ac:parameter ac:name="title">Host — SKA-Low</ac:parameter></ac:structured-macro></td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>South Africa</td>
      <td><ac:structured-macro ac:name="status"><ac:parameter ac:name="colour">Blue</ac:parameter><ac:parameter ac:name="title">Host — SKA-Mid</ac:parameter></ac:structured-macro></td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>United Kingdom</td>
      <td><ac:structured-macro ac:name="status"><ac:parameter ac:name="colour">Green</ac:parameter><ac:parameter ac:name="title">HQ Host</ac:parameter></ac:structured-macro></td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Canada</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>China</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>France</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Germany</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>India</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Italy</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Japan</td>
      <td>Member</td>
      <td>2024</td>
    </tr>
    <tr>
      <td>The Netherlands</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Portugal</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>South Korea</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Spain</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Sweden</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
    <tr>
      <td>Switzerland</td>
      <td>Member</td>
      <td>Founding member</td>
    </tr>
  </tbody>
</table>

<ac:structured-macro ac:name="tip">
  <ac:rich-text-body>
    <p>Prospective members include Finland, Israel, and the African nations. For more detail on governance, see <a href="https://www.skao.int/en/governance">skao.int/governance</a>.</p>
  </ac:rich-text-body>
</ac:structured-macro>

<h2>Host Countries</h2>

<p>The SKAO is a truly global observatory, operating two telescope sites on three continents. Each site is supported by a Science Operations Centre (SOC) and an Engineering Operations Centre (EOC) in its host country.</p>

<h3>Australia — SKA-Low</h3>

<p>SKA-Low is located at the CSIRO Murchison Radio-astronomy Observatory in Western Australia, on Wajarri Yamaji Country. The site will host 131,072 individual Christmas tree-shaped antennas arranged in 512 stations, operating at frequencies from 50 to 350 MHz.</p>

<ac:structured-macro ac:name="expand">
  <ac:parameter ac:name="title">SKA-Low technical summary</ac:parameter>
  <ac:rich-text-body>
    <ul>
      <li><strong>Frequency range:</strong> 50–350 MHz</li>
      <li><strong>Antennas:</strong> 131,072 (in 512 stations)</li>
      <li><strong>Maximum baseline:</strong> ~65 km</li>
      <li><strong>SOC:</strong> Perth, Western Australia</li>
      <li><strong>Status:</strong> <ac:structured-macro ac:name="status"><ac:parameter ac:name="colour">Yellow</ac:parameter><ac:parameter ac:name="title">Construction</ac:parameter></ac:structured-macro></li>
    </ul>
  </ac:rich-text-body>
</ac:structured-macro>

<h3>South Africa — SKA-Mid</h3>

<p>SKA-Mid is located in the Karoo region of the Northern Cape province. The array will consist of 197 dishes — the 64 existing MeerKAT dishes plus 133 new SKA dishes — operating from 350 MHz to at least 15.4 GHz.</p>

<ac:structured-macro ac:name="expand">
  <ac:parameter ac:name="title">SKA-Mid technical summary</ac:parameter>
  <ac:rich-text-body>
    <ul>
      <li><strong>Frequency range:</strong> 350 MHz – 15.4 GHz</li>
      <li><strong>Dishes:</strong> 197 (64 MeerKAT + 133 new SKA)</li>
      <li><strong>Maximum baseline:</strong> ~150 km</li>
      <li><strong>SOC:</strong> Cape Town, South Africa</li>
      <li><strong>Status:</strong> <ac:structured-macro ac:name="status"><ac:parameter ac:name="colour">Yellow</ac:parameter><ac:parameter ac:name="title">Commissioning</ac:parameter></ac:structured-macro></li>
    </ul>
  </ac:rich-text-body>
</ac:structured-macro>

<h3>United Kingdom — Global Headquarters</h3>

<p>The SKAO's global headquarters is at Jodrell Bank in Cheshire, UK — home of the iconic Lovell Telescope and a UNESCO World Heritage Site. The HQ hosts the Observatory's leadership, central services, and programme management teams.</p>

<h2>The Telescopes</h2>

<p>Once complete, the SKAO telescopes will be the two most advanced radio telescopes on Earth. Together with the SRCNet data network, they will enable science across cosmology, fundamental physics, and the search for life.</p>

<ac:structured-macro ac:name="note">
  <ac:rich-text-body>
    <p><strong>Data scale:</strong> The SKA telescopes will generate approximately 710 petabytes of data per year — more than the entire global internet traffic of 2008.</p>
  </ac:rich-text-body>
</ac:structured-macro>

<h2>Our Locations</h2>

<table>
  <tbody>
    <tr>
      <th>Location</th>
      <th>Function</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Jodrell Bank</td>
      <td>Global Headquarters</td>
      <td>United Kingdom</td>
    </tr>
    <tr>
      <td>Murchison, WA</td>
      <td>SKA-Low telescope site</td>
      <td>Australia</td>
    </tr>
    <tr>
      <td>Perth</td>
      <td>SKA-Low SOC</td>
      <td>Australia</td>
    </tr>
    <tr>
      <td>Karoo, Northern Cape</td>
      <td>SKA-Mid telescope site</td>
      <td>South Africa</td>
    </tr>
    <tr>
      <td>Cape Town</td>
      <td>SKA-Mid SOC</td>
      <td>South Africa</td>
    </tr>
  </tbody>
</table>

<p>You can find out more about our locations and how to contact us at <a href="https://www.skao.int/en/about-us/our-locations">skao.int/our-locations</a>.</p>
```

---

## Macro Reference

### Excerpt (required on every page)

Wrap the first line of every page in an Excerpt macro. This powers the description shown on section page cards.

```xml
<ac:structured-macro ac:name="excerpt">
  <ac:parameter ac:name="atlassian-macro-output-type">BLOCK</ac:parameter>
  <ac:rich-text-body>
    <p>One-line summary of this page shown on the parent section card.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

### Info / Note / Warning / Tip Panels

Use these to highlight key information, caveats, or helpful context.

```xml
<!-- Blue info panel -->
<ac:structured-macro ac:name="info">
  <ac:rich-text-body><p>Informational callout.</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Yellow note panel -->
<ac:structured-macro ac:name="note">
  <ac:rich-text-body><p>Important note or caveat.</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Red warning panel -->
<ac:structured-macro ac:name="warning">
  <ac:rich-text-body><p>Critical warning.</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Green tip panel -->
<ac:structured-macro ac:name="tip">
  <ac:rich-text-body><p>Helpful tip or suggestion.</p></ac:rich-text-body>
</ac:structured-macro>
```

### Status Lozenges

Coloured badges for lifecycle states, milestones, or categorisation.

```xml
<ac:structured-macro ac:name="status">
  <ac:parameter ac:name="colour">Green</ac:parameter>
  <ac:parameter ac:name="title">Complete</ac:parameter>
</ac:structured-macro>
```

Available colours: `Green`, `Yellow`, `Red`, `Blue`, `Grey`

### Expand (Collapsible Sections)

Use for detailed reference content that would otherwise make the page too long.

```xml
<ac:structured-macro ac:name="expand">
  <ac:parameter ac:name="title">Click to expand details</ac:parameter>
  <ac:rich-text-body>
    <p>Detailed content hidden by default.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

---

## Content Writing Guidelines

### Headings

- **h1** — auto-generated from page title (don't add another h1 in content)
- **h2** — major sections (the theme adds a subtle top border for visual separation)
- **h3** — subsections within an h2
- Keep heading text concise (under 8 words)

### Paragraphs

- Maximum 3–4 sentences per paragraph
- Lead with the most important information
- Use bold for key terms on first mention

### Tables

- Always include a header row (`<th>`)
- Keep to 3–5 columns maximum
- Use Status lozenges in table cells for visual scanning

### Links

- Use descriptive link text (not "click here")
- External links should open in new tab
- Internal portal links use relative Confluence URLs

### Images

- Always add alt text
- Use the theme's image macro for responsive sizing
- Place images after the paragraph that references them, not before
