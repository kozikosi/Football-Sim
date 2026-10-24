# V22 Graphics Round — Item 5: 100-Season Review (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Convert the 100-season review from text-heavy to graphics-first, per Owner's brief: "a lot more graphical. Only a few sentences here and there."

## Current structure (render100, l.6043-6160)

| Section | Current format | Keep/Convert |
|---------|----------------|--------------|
| Header | Title + description | KEEP |
| Stat row | 6 stat cards (avg wins, playoffs, division, #1 seed, SB, title) | KEEP (already graphical) |
| Narrative | 4 paragraphs of prose | KEEP AS SENTENCES (analysis) |
| Win distribution | Histogram bars | IMPROVE (better alignment) |
| Playoff path | Table (missed WC, div, champ, SB, won) | CONVERT TO GRAPHICS (progress bars) |
| League table | 32-team table | KEEP AS TABLE (data-dense) |
| What drove winning | Unit correlation table + group table | KEEP AS TABLE (data-dense) |
| Game plans | Personnel × strategy table | KEEP AS TABLE |
| Your draft critique | Table | KEEP AS TABLE |
| Your players: avg season | Table with grades | CONVERT TO STAT CARDS |
| Realism audit | Table | REMOVE (Owner ruling) |
| Model prediction | Table + prose | REMOVE (Owner ruling) |
| Award patterns | Function output | MOVE HIGHER (Owner ruling) |

## Proposed changes

### GR-5a · Win distribution → improved bar chart

**WHERE** l.6046 (`histHTML`)
**WHAT** Replace the inline-styled bars with the `.bar-row`-style component:
```css
.win-dist{display:grid;grid-template-columns:36px 1fr 24px;gap:6px;align-items:center;margin-bottom:3px;}
.win-dist .wd-label{text-align:right;font-size:0.75rem;color:var(--sub);}
.win-dist .wd-bar{height:14px;background:var(--border);border-radius:3px;overflow:hidden;}
.win-dist .wd-bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:3px;}
.win-dist .wd-count{font-size:0.75rem;font-weight:600;text-align:left;}
```
**WHY** Owner: "Seasons by Win total — The Left alignment is poor. That whole chart could be made more beautiful."
**SAFE ALONE?** Yes — CSS + HTML restructure.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-5b · Playoff path → progress bars

**WHERE** l.6068-6078 (How far you got table)
**WHAT** Replace the table with progress bars:
```html
<div class="playoff-path">
  <div class="pp-row"><span class="pp-label">Missed playoffs</span><div class="pp-bar"><div class="pp-fill" style="width:${pct}%"></div></div><span class="pp-pct">${pct}%</span></div>
  <div class="pp-row"><span class="pp-label">Lost Wild Card</span><div class="pp-bar"><div class="pp-fill" style="width:${pct}%"></div></div><span class="pp-pct">${pct}%</span></div>
  <!-- ... etc -->
  <div class="pp-row pp-won"><span class="pp-label">🏆 Won Super Bowl</span><div class="pp-bar"><div class="pp-fill pp-gold" style="width:${pct}%"></div></div><span class="pp-pct">${pct}%</span></div>
</div>
```
**CSS:**
```css
.playoff-path{display:flex;flex-direction:column;gap:4px;}
.pp-row{display:grid;grid-template-columns:140px 1fr 40px;gap:8px;align-items:center;font-size:0.8rem;}
.pp-bar{height:10px;background:var(--border);border-radius:5px;overflow:hidden;}
.pp-fill{height:100%;background:var(--accent);border-radius:5px;}
.pp-fill.pp-gold{background:linear-gradient(90deg,#ffd700,#ff8c00);}
.pp-pct{font-weight:600;text-align:right;font-variant-numeric:tabular-nums;}
.pp-row.pp-won .pp-label{font-weight:700;color:#ffd700;}
```
**WHY** Progress bars communicate distribution faster than a table. Gold fill for "Won Super Bowl" matches the champion theme.
**SAFE ALONE?** Yes — replaces table with HTML components.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-5c · "Your players: average season" → stat cards

**WHERE** l.6130-6135 (`uplHTML` and the section)
**WHAT** Replace the table with a grid of player cards:
```html
<div class="player-card-grid">
  <div class="player-card">
    <div class="pc-name">${p.name}</div>
    <div class="pc-pos">${p.group}</div>
    <div class="pc-stats">
      <div class="stat-card"><div class="sc-val">${gr.o}</div><div class="sc-label">OVR</div></div>
      <div class="stat-card"><div class="sc-val">${gr.g}</div><div class="sc-label">Grade</div></div>
      <div class="stat-card"><div class="sc-val">${fmtWar(gr.w)}</div><div class="sc-label">Wins</div></div>
    </div>
    <div class="pc-avg">${avgLine(p)}</div>
  </div>
</div>
```
**CSS:**
```css
.player-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;}
.player-card{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;}
.pc-name{font-weight:700;font-size:0.9rem;margin-bottom:2px;}
.pc-pos{font-size:0.75rem;color:var(--sub);margin-bottom:8px;}
.pc-stats{display:flex;gap:6px;margin-bottom:8px;}
.pc-avg{font-size:0.78rem;color:var(--sub);line-height:1.4;}
```
**WHY** Owner: "Each player highlighted should be on their own line." Cards make each player's stats visual.
**SAFE ALONE?** Yes — replaces table with card grid.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-5d · "Realism audit" and "Model prediction" → remove from screen

**WHERE** l.6140-6145 (two `sec()` calls)
**WHAT** Remove these two sections from the rendered output. Keep the functions and data computation. Add comment.
**WHY** Owner: "'Realism audit' and 'Does the model predict real results?' leave the screen; the numbers are still computed and stored."
**SAFE ALONE?** Yes — removes HTML output, keeps computation.
**HOW TO CHECK** `node --check` → exit 0. Grep for function calls to confirm removal.

### GR-5e · "Award patterns" → higher up, visible by default

**WHERE** l.6146 (`sec('Award patterns', ...)`) — currently near the bottom
**WHAT** Move to after the narrative section, before "Win distribution". Make it visible by default (open=true).
**WHY** Owner: "'Your players; average season' and 'Award patterns' — higher up and automatically visible."
**SAFE ALONE?** Yes — reorders `sec()` calls.
**HOW TO CHECK** `node --check` → exit 0.

### GR-5f · Narrative → keep as sentences, but indent

**WHERE** l.6118-6122 (`nar.map(...)`)
**WHAT** Add indentation and spacing:
```html
<div class="narr-block">
  ${nar.map(t=>`<p class="detail-item narr-indented">${t}</p>`).join('')}
</div>
```
**CSS:**
```css
.narr-block{margin:12px 0;}
.narr-indented{margin-left:1.2em;margin-bottom:10px;line-height:1.6;}
```
**WHY** Owner: "Indent a lot more. The first sentence should be its own paragraph."
**SAFE ALONE?** Yes — CSS + HTML wrapper.
**HOW TO CHECK** `node --check` → exit 0.

### GR-5g · Gold banner for best team

**WHERE** l.6060 (header)
**WHAT** Add a gold banner showing the best team:
```html
<div class="gold-banner">
  <h2>🏆 ${best} — Best in the League</h2>
  <div class="gb-sub">${avgW[best].toFixed(1)} avg wins over ${N} seasons</div>
  <div class="gb-stat">${pctS(T[best].champ/N,1)} title rate · ${pctS(T[best].sbApp/N)} SB rate</div>
</div>
```
**WHY** Owner: champion banner should be gold and shimmer. Best team in 100-season sim deserves the same treatment.
**SAFE ALONE?** Yes — adds HTML.
**HOW TO CHECK** `node --check` → exit 0.

## What stays as sentences (per Owner's criterion)
- Narrative paragraphs — analysis
- "What actually drove winning" table — data-dense
- Game plans table — data-dense
- "Your draft: pick-by-pick critique" — detailed analysis
- "Reading this report: what the terms mean" — explainer

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components or reorder/remove sections. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. 100-season review still shows all information (except realism audit and model prediction per Owner's ruling)

## What was deliberately not checked
- Whether the win distribution histogram should use a different color scale
- Whether the player cards should link to season stats
- Whether the gold banner shimmer works on all browsers
