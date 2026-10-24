# V22 Graphics Round — Item 3: Game Review (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Convert the game review's data-heavy sections to graphics, keeping clutch narration, star praise, and game ball as sentences.

## Current structure (generateGameSummary, l.3109-3210)

| Section | Content | Keep/Convert |
|---------|---------|--------------|
| P1 | Game flow narrative (opening, half, 3rd, finish, OT) | KEEP AS SENTENCES (clutch narration) |
| Play-by-play | Chronological scoring events | CONVERT TO GRAPHICS (score progression) |
| Turnovers | Turnover list with player names | CONVERT TO GRAPHICS (turnover cards) |
| Stars | Stars of the game | KEEP AS SENTENCES (star praise) |
| Game ball | Game ball winner | KEEP AS SENTENCE (star praise) |
| P3 (factors) | Real factors in the math | CONVERT TO GRAPHICS (unit comparison bars) |
| Game plans | Plan explanation | CONVERT TO GRAPHICS (plan comparison) |

## Proposed changes

### GR-3a · Score progression chart (replaces play-by-play prose)

**WHERE** l.3056-3108 (`playByPlay()` function)
**WHAT** Replace the text play-by-play with a horizontal score progression chart:
```html
<div class="score-prog">
  <div class="sp-team sp-away">${awayTeam}</div>
  <div class="sp-bar">
    <div class="sp-away-fill" style="width:${awayPct}%"></div>
    <div class="sp-home-fill" style="width:${homePct}%"></div>
  </div>
  <div class="sp-team sp-home">${homeTeam}</div>
</div>
<div class="sp-events">
  <!-- each scoring event as a dot on the timeline -->
  <div class="sp-event sp-td" style="left:${pct}%" title="Q1 8:32 — TD"></div>
  <div class="sp-event sp-fg" style="left:${pct}%" title="Q2 3:15 — FG"></div>
</div>
<div class="sp-labels">
  <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>OT</span>
</div>
```
**CSS:**
```css
.score-prog{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;margin-bottom:8px;}
.sp-bar{height:8px;background:var(--border);border-radius:4px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;}
.sp-away-fill{background:var(--accent2);border-radius:4px 0 0 4px;}
.sp-home-fill{background:var(--accent);border-radius:0 4px 4px 0;}
.sp-events{position:relative;height:20px;margin:4px 0;}
.sp-event{position:absolute;width:8px;height:8px;border-radius:50%;transform:translateX(-50%);}
.sp-event.sp-td{background:var(--good);}
.sp-event.sp-fg{background:var(--accent);}
.sp-event.sp-saf{background:var(--bad);}
.sp-labels{display:flex;justify-content:space-between;font-size:0.7rem;color:var(--sub);}
```
**WHY** Scoring events are sequential data. A visual timeline communicates the game's flow faster than "Q1 8:32 — Ravens TD (7-0); Q2 3:15 — Bengals FG (7-3)."
**SAFE ALONE?** Yes — replaces text output with HTML. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-3b · Turnover cards (replaces turnoverParagraph prose)

**WHERE** l.2748 (`turnoverParagraph()`) and l.3190 (`p2full`)
**WHAT** Replace the prose turnover list with compact cards:
```html
<div class="turnover-card">
  <span class="tc-icon">🔄</span>
  <span class="tc-player">${player.name}</span>
  <span class="tc-detail">${player.group} · ${player.st.int||player.st.fumLost||0} ${type}</span>
  <span class="tc-impact">${impact} pts swing</span>
</div>
```
**CSS:**
```css
.turnover-card{display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;margin-bottom:4px;font-size:0.82rem;}
.tc-icon{font-size:1rem;}
.tc-player{font-weight:600;flex:1;}
.tc-detail{color:var(--sub);font-size:0.75rem;}
.tc-impact{font-weight:700;color:var(--bad);font-variant-numeric:tabular-nums;}
```
**WHY** Turnovers are discrete events with player attribution. Cards communicate who, what, and impact faster than prose.
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-3c · Factor bars (replaces factorParagraph prose)

**WHERE** l.2748 (`factorParagraph()`) and l.3207 (`p3`)
**WHAT** Replace the prose factor list with bar rows showing each factor's contribution:
```html
<div class="bar-row">
  <div class="br-left">${factor.name}</div>
  <div class="br-center">${factor.pts.toFixed(1)}</div>
  <div class="br-right"></div>
  <div class="br-bar">
    <div class="br-bar-l" style="width:${pct}%"></div>
    <div class="br-bar-r" style="width:0%"></div>
  </div>
</div>
```
**WHY** Factors are numeric contributions. Bar rows show relative importance faster than "The passing game was the difference: +4.2 points."
**SAFE ALONE?** Yes — `factorParagraph()` returns strings; replace with HTML.
**HOW TO CHECK** `node --check` → exit 0.

### GR-3d · Game plan comparison (replaces planParagraph prose)

**WHERE** l.3208 (`planParagraph(g, true)`)
**WHAT** Replace prose plan explanation with a two-col-pair:
```html
<div class="two-col-pair">
  <div class="tcp-side tcp-away">
    <div class="tcp-title">${awayTeam} Plan</div>
    <div class="tcp-stat"><span>Offense</span><span class="tcp-val">${awayPlan.off.pers} ${awayPlan.off.strat}</span></div>
    <div class="tcp-stat"><span>Defense</span><span class="tcp-val">${awayPlan.def.pkg} ${awayPlan.def.focus}</span></div>
  </div>
  <div class="tcp-side tcp-home">
    <div class="tcp-title">${homeTeam} Plan</div>
    <div class="tcp-stat"><span>Offense</span><span class="tcp-val">${homePlan.off.pers} ${homePlan.off.strat}</span></div>
    <div class="tcp-stat"><span>Defense</span><span class="tcp-val">${homePlan.def.pkg} ${homePlan.def.focus}</span></div>
  </div>
</div>
```
Keep the plan explanation as collapsible `<details>` below.
**WHY** Plans are label comparisons (11 vs 12, base vs nickel). Two-col-pair communicates them instantly.
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0.

### GR-3e · Key players as stat cards (replaces Key Players card)

**WHERE** l.3743 (`kp-grid` / `kp-card`)
**WHAT** Enhance the existing key players card with stat cards for each player:
```html
<div class="kp-card">
  <div class="kp-title">${player.name} (${player.group})</div>
  <div class="stat-card-row">
    <div class="stat-card"><div class="sc-val">${player.st.passYds||player.st.rushYds||player.st.recYds||0}</div><div class="sc-label">Yards</div></div>
    <div class="stat-card"><div class="sc-val">${player.st.passTD||player.st.rushTD||player.st.recTD||player.st.sack||0}</div><div class="sc-label">TD/Sacks</div></div>
    <div class="stat-card"><div class="sc-val">${player.st.tkl||0}</div><div class="sc-label">Tackles</div></div>
  </div>
</div>
```
**WHY** Key players are already in a card layout. Adding stat cards makes the numbers visual.
**SAFE ALONE?** Yes — enhances existing markup.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

## What stays as sentences (per Owner's criterion)
- P1 (game flow narrative) — clutch narration
- Stars of the game — star praise
- Game ball winner — star praise
- Verdict/implication ("X move to 5-2") — short hype

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. Game review still shows all information (no data loss)

## What was deliberately not checked
- Whether the `playByPlay()` function should be kept for a "detailed view" toggle
- Whether the turnover cards should link to the player's season stats
- Whether the factor bars should use the same color scale as the game preview bar rows
