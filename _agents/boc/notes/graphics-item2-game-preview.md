# V22 Graphics Round — Item 2: Game Preview (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Convert the game preview's data-heavy sections to graphics, keeping only clutch narration as sentences.

## Current structure (regularPreview, l.5258-5330)

| Paragraph | Content | Keep/Convert |
|-----------|---------|--------------|
| P1 | Stakes, storylines, records, streaks, seeds, H2H | KEEP AS SENTENCES (clutch narration) |
| P2 | QB matchup, hot/cold form, top starters | CONVERT TO GRAPHICS |
| P3 | Matchup swings, projected score, verdict | CONVERT TO GRAPHICS |
| Plan preview | Game plan explanation | CONVERT TO GRAPHICS (bar) |

## Proposed changes

### GR-2a · QB matchup card (replaces P2 QB text)

**WHERE** l.5272-5274 (`bits.push` for QB matchup)
**WHAT** Replace:
```js
bits.push(`Under center it is ${A.qbE.name} (${A.qbE.ovr}${sl(A)}) against ${H.qbE.name} (${H.qbE.ovr}${sl(H)}).`);
```
With a two-col-pair component:
```html
<div class="two-col-pair">
  <div class="tcp-side tcp-away">
    <div class="tcp-title">${A.qbE.name} (QB, ${A.qbE.ovr})</div>
    <div class="tcp-stat"><span>Pass TD</span><span class="tcp-val">${A.qbRec?.st?.passTD||0}</span></div>
    <div class="tcp-stat"><span>INT</span><span class="tcp-val">${A.qbRec?.st?.int||0}</span></div>
    <div class="tcp-stat"><span>Pass Yds</span><span class="tcp-val">${A.qbRec?.st?.passYds||0}</span></div>
  </div>
  <div class="tcp-side tcp-home">
    <div class="tcp-title">${H.qbE.name} (QB, ${H.qbE.ovr})</div>
    <div class="tcp-stat"><span>Pass TD</span><span class="tcp-val">${H.qbRec?.st?.passTD||0}</span></div>
    <div class="tcp-stat"><span>INT</span><span class="tcp-val">${H.qbRec?.st?.int||0}</span></div>
    <div class="tcp-stat"><span>Pass Yds</span><span class="tcp-val">${H.qbRec?.st?.passYds||0}</span></div>
  </div>
</div>
```
**WHY** QB stats are data, not narration. Visual card is faster to read than "Under center it is X (92, 12 TD against 3 INT) against Y (88, 8 TD against 5 INT)."
**SAFE ALONE?** Yes — replaces string concatenation with HTML component. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-2b · Form indicators (hot/cold) as badges

**WHERE** l.5275 (`[A,H].forEach(c=>{ const b = qbBeat(c); if(b) bits.push(b); });`)
**WHAT** Replace prose hot/cold bits with badge components:
```html
<span class="badge badge-hot">🔥 ${c.N} ${c.hot ? 'on a hot streak' : 'cold'}</span>
```
**WHY** Form status is a binary state (hot/cold/neutral). A badge communicates it faster than a sentence.
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0.

### GR-2c · Matchup swings as bar rows (replaces P3 prose)

**WHERE** l.5282-5284 (`const lines = matchupLines(g, sw, false);`)
**WHAT** Replace the prose `matchupLines()` output with bar-row components showing unit ratings side by side:
```html
<div class="bar-row">
  <div class="br-left">${S.unitRatings[away][unit].toFixed(1)}</div>
  <div class="br-center">${shortUnit(unit)}</div>
  <div class="br-right">${S.unitRatings[home][unit].toFixed(1)}</div>
  <div class="br-bar">
    <div class="br-bar-l" style="width:${awayPct}%"></div>
    <div class="br-bar-r" style="width:${homePct}%"></div>
  </div>
</div>
```
**WHY** Unit ratings are numeric comparisons. Bar rows communicate relative strength faster than "X's passing game is a real weapon here — roughly +3.2 points a game."
**SAFE ALONE?** Yes — replaces string output with HTML component. `matchupLines()` can remain for the detailed (l.5284 `detailed=true`) version.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-2d · Projected score as stat cards

**WHERE** l.5283 (`const verdict = gap<1 ? ... : ...`)
**WHAT** Replace the verdict prose with stat cards showing projected scores:
```html
<div class="two-col-pair">
  <div class="stat-card"><div class="sc-val">${ap.toFixed(1)}</div><div class="sc-label">${A.N} proj</div></div>
  <div class="stat-card"><div class="sc-val">${hp.toFixed(1)}</div><div class="sc-label">${H.N} proj</div></div>
</div>
```
Keep the verdict sentence ("coin flip" / "leans X by Y") as a short caption below.
**WHY** Projected scores are numbers. Stat cards communicate them faster than "The ratings lean X by about Y."
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0.

### GR-2e · Plan preview as compact bar

**WHERE** l.5285 (`parts.push(planPreviewParagraph(g));`)
**WHAT** Replace the prose plan preview with a compact bar showing offensive/defensive plan lean:
```html
<div class="bar-row">
  <div class="br-left">${po.pers}</div>
  <div class="br-center">Plan</div>
  <div class="br-right">${pd.pkg}</div>
</div>
```
Keep the plan explanation as a collapsible `<details>` below.
**WHY** Plan is a label (11, 12, 21, 22) and a package (base/nickel). Compact bar communicates it instantly.
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0.

## What stays as sentences (per Owner's criterion)
- P1 (stakes, storylines, records, streaks, seeds, H2H) — clutch narration
- The verdict caption ("coin flip" / "leans X") — short hype
- Plan explanation — collapsible detail

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. Game preview still shows all information (no data loss)

## What was deliberately not checked
- Whether the playoff preview (l.5331) needs the same treatment (it does — but that's a separate pass)
- Whether the `matchupLines()` function should be kept for the detailed (game review) version
- Whether the hot/cold form should use the same badge style as the game review stars
