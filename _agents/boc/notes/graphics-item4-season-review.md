# V22 Graphics Round — Item 4: Season Review (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Convert the season review's text walls to graphics, per Owner's detailed brief. Keep clutch narration and award citations as sentences.

## Owner's brief (§4.2)
- "Indent a lot more. The first sentence should be its own paragraph."
- "Biggest win and ugliest win should be their own indentations and presented more like stats instead of full sentences."
- "Each player highlighted should be on their own line."
- "Why better or worse than the ratings?" — "Three lines of prose become three bars."
- "Seasons by Win total" — "The Left alignment is poor. That whole chart could be made more beautiful."
- "Your players; average season" and "Award patterns" — "higher up and automatically visible."
- "Realism audit" and "Does the model predict real results?" leave the screen (numbers still computed).
- Season review button after playoffs: blue, near top, next to 100-season sim.

## Current structure (renderSeasonCompleteView, l.5886-5910)

| Section | Function | Current format |
|---------|----------|----------------|
| Champion banner | champion-banner | Text banner |
| Game result | renderGameResultHTML | Box score |
| Bracket | renderBracketHTML | Bracket |
| Season review text | generateSeasonReview() | 7 paragraphs of prose (fragFinalVerdict, fragPlayoffDeep, etc.) |
| Playoff awards | renderPlayoffAwardsHTML | Table |
| Regular awards | renderRegularAwardsHTML | Table |
| Report card | renderReportCardHTML | Table with unit grades |
| Pick critique | pickCritiqueHTML | Table |
| Field table | renderFieldTableHTML | Table |
| Stats tabs | renderStatsTabsHTML | Tabs |
| Team advanced | teamAdvancedHTML | Prose |
| Advanced stats | advancedStatsHTML | Prose |
| Bracket | renderBracketHTML | Bracket |
| User schedule | renderUserScheduleHTML | Table |
| Standings | renderStandingsHTML | Table |
| Season options | seasonOptionsHTML | Buttons |

## Proposed changes

### GR-4a · Champion banner → gold banner

**WHERE** l.5889 (`champion-banner`)
**WHAT** Replace with `.gold-banner` from item 1:
```html
<div class="gold-banner">
  <h2>🏆 ${champ} — Super Bowl Champions</h2>
  <div class="gb-sub">${won ? 'Champions from draft day to the final whistle' : 'A season that fell short of the ultimate goal'}</div>
  <div class="gb-stat">${champRecord} · ${champPF} PF · ${champPA} PA</div>
</div>
```
**WHY** Gold banner from item 1 is more visually distinct. Shimmer/sparkle effect per Owner's brief.
**SAFE ALONE?** Yes — replaces existing banner markup.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-4b · Season review text → indented paragraphs with stat cards

**WHERE** l.5700 (`generateSeasonReviewRaw()`) and l.5892 (`generateSeasonReview()`)
**WHAT** Restructure the 7 frag paragraphs:
1. **First sentence as own paragraph** (fragFinalVerdict) — larger font, own `<p>` with distinct styling.
2. **Biggest win / ugliest win as stat cards** — replace prose with:
```html
<div class="two-col-pair">
  <div class="stat-card"><div class="sc-val">${biggestWinScore}</div><div class="sc-label">Biggest win</div><div class="sc-bar"><div class="sc-bar-fill" style="width:${pct}%"></div></div></div>
  <div class="stat-card"><div class="sc-val">${ugliestWinScore}</div><div class="sc-label">Ugliest win</div><div class="sc-bar"><div class="sc-bar-fill" style="width:${pct}%"></div></div></div>
</div>
```
3. **Each player highlighted on own line** — replace `playerBlurb()` inline mentions with `<div class="player-highlight">` blocks.
4. **"Why better or worse than the ratings?" → three bars** — replace prose with `.bar-row` components:
```html
<div class="bar-row">
  <div class="br-left">${unit}</div>
  <div class="br-center">${rating.toFixed(1)}</div>
  <div class="br-right">#${rank}</div>
  <div class="br-bar"><div class="br-bar-l" style="width:${pct}%"></div><div class="br-bar-r" style="width:0%"></div></div>
</div>
```
**WHY** Owner: "Indent a lot more. The first sentence should be its own paragraph. Biggest win and ugliest win should be their own indentations and presented more like stats instead of full sentences. Each player highlighted should be on their own line."
**SAFE ALONE?** Yes — replaces string concatenation with HTML. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-4c · Report card → enhanced with bar rows

**WHERE** l.5709-5730 (`renderReportCardHTML()`)
**WHAT** Add a `.bar-row` for each unit showing the rating vs league average:
```html
<div class="bar-row">
  <div class="br-left">${UNIT_INFO[u].label}</div>
  <div class="br-center">${R[u].toFixed(1)}</div>
  <div class="br-right">#${U[u]}</div>
  <div class="br-bar"><div class="br-bar-l" style="width:${pct}%"></div><div class="br-bar-r" style="width:${avgPct}%"></div></div>
</div>
```
Keep the table for detailed stats, but add the bar rows above it.
**WHY** Owner: "Why better or worse than the ratings? This is great but again the ui is ugly. Could be more graphical."
**SAFE ALONE?** Yes — adds HTML, doesn't remove existing table.
**HOW TO CHECK** `node --check` → exit 0.

### GR-4d · "Your players; average season" and "Award patterns" → higher up, visible

**WHERE** l.5893 (renderSeasonCompleteView — order of sections)
**WHAT** Move `renderReportCardHTML()` and award highlights before `pickCritiqueHTML()` and `renderFieldTableHTML()`. Make them visible by default (not collapsed).
**WHY** Owner: "'Your players; average season' and 'Award patterns' — higher up and automatically visible."
**SAFE ALONE?** Yes — reorders HTML concatenation. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check: sections appear in correct order.

### GR-4e · "Realism audit" and "Does the model predict real results?" → leave screen

**WHERE** l.4281 (`teamAdvancedHTML()`) and l.4317 (`advancedStatsHTML()`)
**WHAT** Remove these from the season review render (l.5893). Keep the functions and their data computation — only remove from the rendered output. Add a comment: `// realism audit and model prediction: computed but not displayed (Owner ruling 22 Oct)`.
**WHY** Owner: "'Realism audit' and 'Does the model predict real results?' leave the screen; the numbers are still computed and stored."
**SAFE ALONE?** Yes — removes HTML output, keeps computation.
**HOW TO CHECK** `node --check` → exit 0. Grep for function calls to confirm removal from render.

### GR-4f · "Seasons by Win total" → improved bar chart

**WHERE** Find the "Seasons by Win total" rendering (search for "Seasons by Win")
**WHAT** Fix left alignment and make the chart more beautiful:
```css
.win-total-chart{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;margin-bottom:4px;}
.win-total-chart .wt-label{font-weight:600;font-size:0.8rem;text-align:right;min-width:40px;}
.win-total-chart .wt-bar{height:12px;background:var(--border);border-radius:6px;overflow:hidden;}
.win-total-chart .wt-bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;}
.win-total-chart .wt-count{font-size:0.75rem;color:var(--sub);min-width:30px;}
```
**WHY** Owner: "The Left alignment is poor. That whole chart could be made more beautiful."
**SAFE ALONE?** Yes — CSS + HTML restructure.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-4g · Season review button → blue, near top, next to 100-season sim

**WHERE** l.5891 (`seasonReviewBtn`) and l.6142 (`sim100Btn`)
**WHAT** Move the season review button to the top of the season complete view, next to the 100-season simulation button. Style it blue:
```html
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;">
  <button class="resetbtn" id="seasonReviewBtn" style="width:auto;background:var(--accent);">Season Review →</button>
  <button class="tabbtn" id="sim100Btn">Run 100-season simulation</button>
</div>
```
**WHY** Owner: "The season review button after the playoffs: blue, near the top, next to the 100-season simulation."
**SAFE ALONE?** Yes — moves existing button, changes color.
**HOW TO CHECK** `node --check` → exit 0. Visual check: button appears at top.

### GR-4h · Motion: champion banner shimmer

**WHERE** l.5889 (champion-banner) and CSS
**WHAT** Add a shimmer animation to the gold banner:
```css
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
.gold-banner{background:linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,165,0,0.1),rgba(255,215,0,0.15));background-size:200% 100%;animation:shimmer 3s ease-in-out infinite;}
@media (prefers-reduced-motion: reduce){.gold-banner{animation:none;}}
```
**WHY** Owner: "it would be cool if that graphic could also land on the screen somewhere after it shows and continue to shimmer/sparkle."
**SAFE ALONE?** Yes — CSS animation with reduced-motion guard.
**HOW TO CHECK** `node --check` → exit 0. Visual check: shimmer visible, stops with reduced motion.

## What stays as sentences (per Owner's criterion)
- Season review prose (fragFinalVerdict, etc.) — clutch narration and analysis
- Player highlights — star praise
- Award citations — star praise
- Pick critique verdicts — short hype

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components or reorder existing sections. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. Season review still shows all information (no data loss, except realism audit and model prediction per Owner's ruling)

## What was deliberately not checked
- Whether the 100-season review (item 5) needs the same treatment
- Whether the shimmer animation works in all browsers
- Whether the section reordering breaks any event listeners
