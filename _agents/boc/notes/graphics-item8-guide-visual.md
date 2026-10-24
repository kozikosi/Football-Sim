# V22 Graphics Round — Item 8: Guide's Visual Language (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Apply the shared component set and visual language to the Guide, making it more graphical while keeping instructional text.

## Current state (guideHTMLCached, l.5053-5056)

The Guide is a series of `<details>` sections with text content:
- How the site works (ordered list)
- Drafting: which positions matter (value tiers + prose)
- Reading the draft board (board math + prose)
- Flexing players (flex explain)
- Position values (slot role table + prose)
- Coaching (personnel table + style lists)
- Math of game plans (planMathHTML)
- Football terms (termsHTML)

## Proposed changes

### GR-8a · Section navigation as visual cards

**WHERE** l.5053 (guide header)
**WHAT** Replace the text intro with a visual card grid:
```html
<div class="guide-nav">
  <div class="guide-nav-card" data-section="how">How the site works</div>
  <div class="guide-nav-card" data-section="draft">Which positions matter</div>
  <div class="guide-nav-card" data-section="board">Reading the draft board</div>
  <div class="guide-nav-card" data-section="flex">Flexing players</div>
  <div class="guide-nav-card" data-section="values">Position values</div>
  <div class="guide-nav-card" data-section="coach">Coaching</div>
  <div class="guide-nav-card" data-section="plans">Game plan math</div>
  <div class="guide-nav-card" data-section="terms">Football terms</div>
</div>
```
**CSS:**
```css
.guide-nav{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:16px;}
.guide-nav-card{background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:0.82rem;font-weight:600;cursor:pointer;text-align:center;transition:background .15s;}
.guide-nav-card:hover{background:var(--accent);color:#fff;}
```
**WHY** Owner: "Short reference sections for the terms the sim uses. Click through only what you need." Visual cards make navigation faster than a text list.
**SAFE ALONE?** Yes — CSS + HTML.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-8b · Value tiers as visual bar chart

**WHERE** l.5037 (`valueTiersHTML()`)
**WHAT** Replace the text value tiers with a horizontal bar chart showing position value:
```html
<div class="value-tier-chart">
  <div class="vt-row"><span class="vt-pos">QB</span><div class="vt-bar"><div class="vt-fill" style="width:100%"></div></div><span class="vt-val">320</span></div>
  <div class="vt-row"><span class="vt-pos">DE</span><div class="vt-bar"><div class="vt-fill" style="width:92%"></div></div><span class="vt-val">350</span></div>
  <!-- ... -->
</div>
```
**CSS:**
```css
.value-tier-chart{display:flex;flex-direction:column;gap:4px;margin:8px 0;}
.vt-row{display:grid;grid-template-columns:40px 1fr 40px;gap:8px;align-items:center;font-size:0.8rem;}
.vt-bar{height:10px;background:var(--border);border-radius:5px;overflow:hidden;}
.vt-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:5px;}
.vt-val{font-weight:600;text-align:right;font-variant-numeric:tabular-nums;}
```
**WHY** Position values are numeric. Bar chart communicates relative importance faster than text tiers.
**SAFE ALONE?** Yes — replaces HTML output.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-8c · Slot role table with visual bars

**WHERE** l.5042 (`slotRoleTableHTML()`)
**WHAT** Add mini-bars to the slot role table showing each slot's contribution:
```html
<tr><td>${slot}</td><td>${role}</td><td><div class="vt-bar" style="width:60px;"><div class="vt-fill" style="width:${pct}%"></div></div></td></tr>
```
**WHY** Slot contributions are numeric. Mini-bars add visual weight to the table.
**SAFE ALONE?** Yes — enhances existing table.
**HOW TO CHECK** `node --check` → exit 0.

### GR-8d · Coaching style cards

**WHERE** l.5044 (`styleListsHTML()`)
**WHAT** Replace the text style list with visual cards:
```html
<div class="style-card">
  <div class="sc-name">${styleName}</div>
  <div class="sc-desc">${description}</div>
  <div class="sc-stats">
    <div class="stat-card"><div class="sc-val">${util.toFixed(1)}</div><div class="sc-label">Util</div></div>
  </div>
</div>
```
**CSS:**
```css
.style-card{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;}
.style-card .sc-name{font-weight:700;font-size:0.9rem;margin-bottom:4px;}
.style-card .sc-desc{font-size:0.8rem;color:var(--sub);margin-bottom:8px;}
.style-card .sc-stats{display:flex;gap:6px;}
```
**WHY** Coaching styles have utility values. Cards make them visual.
**SAFE ALONE?** Yes — replaces HTML output.
**HOW TO CHECK** `node --check` → exit 0.

### GR-8e · Game plan math as visual flow

**WHERE** l.4908 (`planMathHTML()`)
**WHAT** Replace the prose math explanation with a visual flow diagram:
```html
<div class="plan-flow">
  <div class="pf-step"><div class="pf-label">Offense</div><div class="pf-bar"><div class="pf-fill" style="width:${pct}%"></div></div></div>
  <div class="pf-arrow">→</div>
  <div class="pf-step"><div class="pf-label">Defense</div><div class="pf-bar"><div class="pf-fill" style="width:${pct}%"></div></div></div>
  <div class="pf-arrow">→</div>
  <div class="pf-step"><div class="pf-label">Result</div><div class="pf-bar"><div class="pf-fill" style="width:${pct}%"></div></div></div>
</div>
```
**CSS:**
```css
.plan-flow{display:flex;align-items:center;gap:8px;margin:8px 0;flex-wrap:wrap;}
.pf-step{flex:1;min-width:80px;text-align:center;}
.pf-label{font-size:0.75rem;font-weight:600;margin-bottom:4px;}
.pf-bar{height:8px;background:var(--border);border-radius:4px;overflow:hidden;}
.pf-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:4px;}
.pf-arrow{font-size:1.2rem;color:var(--sub);}
```
**WHY** Game plan math is a flow (offense → defense → result). Visual flow communicates it faster than prose.
**SAFE ALONE?** Yes — replaces HTML output.
**HOW TO CHECK** `node --check` → exit 0.

### GR-8f · Terms as visual cards

**WHERE** l.4999 (`termsHTML()`)
**WHAT** Replace the text terms list with visual term cards:
```html
<div class="term-card">
  <div class="tc-term">${term}</div>
  <div class="tc-def">${definition}</div>
</div>
```
**CSS:**
```css
.term-card{background:var(--panel2);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:8px 12px;margin-bottom:6px;}
.tc-term{font-weight:700;font-size:0.85rem;margin-bottom:2px;}
.tc-def{font-size:0.8rem;color:var(--sub);line-height:1.4;}
```
**WHY** Terms are definitions. Cards with left accent border make them visually distinct.
**SAFE ALONE?** Yes — replaces HTML output.
**HOW TO CHECK** `node --check` → exit 0.

### GR-8g · "Value here" removal from Guide

**WHERE** l.4991-4992, l.5056 (Guide text mentioning "Value here")
**WHAT** Remove all visible "Value here" strings from the Guide. The math (`r.v`) stays computed.
**WHY** Owner: "Remove 'Value here' completely from the website."
**SAFE ALONE?** Yes — text change.
**HOW TO CHECK** Grep for "Value here" in Guide → 0 matches.

## What stays as text (per Owner's criterion)
- "How the site works" ordered list — instructions
- "Football terms" definitions — reference text
- "Flexing players" explanation — instructional
- "Drafting: which positions matter" prose — analysis

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components or remove text. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. Guide still shows all information (no data loss)
4. Grep for "Value here" in Guide → 0 matches

## What was deliberately not checked
- Whether the guide nav cards should be clickable (JS needed)
- Whether the value tier chart should be sortable
- Whether the terms should be searchable
