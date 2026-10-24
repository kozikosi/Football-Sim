# V22 Graphics Round — Item 1: Shared Component Set (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (V22 working file)

## Objective
Define a shared set of CSS/HTML components that all four review screens (game preview, game review, season review, 100-season review) use instead of bespoke markup. The Owner's criterion: "most of this data can be represented by graphics instead of sentences… only the clutch narration, the star praise and the next-round hype need sentences."

## Four screens and their current format

| Screen | Function | Lines | Current format |
|--------|----------|-------|----------------|
| Game preview | `regularPreview()` / `playoffPreview()` | 5258-5396 | 3 paragraphs of prose + matchup lines + plan preview |
| Game review | `generateGameSummary()` / `playByPlay()` / `starsParagraph()` | 3109-3100 | 3 paragraphs of prose + play-by-play + stars |
| Season review | `renderSeasonTab()` with `showReview=true` | 5890-5910 | Champion banner + awards + stats tables |
| 100-season review | `render100()` | 6043 | Text report with sim results |

## Shared component set (4 components)

### 1. Stat card (`.stat-card`)
A compact card showing a single stat with value, label, and optional mini-bar.

**WHERE:** New CSS class, inserted after `.panel` (l.32) or in the mobile CSS block.
**WHAT:** 
```css
.stat-card{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;text-align:center;min-width:80px;}
.stat-card .sc-val{font-size:1.4rem;font-weight:800;color:var(--accent);line-height:1.1;}
.stat-card .sc-label{font-size:0.7rem;color:var(--sub);text-transform:uppercase;letter-spacing:.04em;margin-top:2px;}
.stat-card .sc-bar{height:4px;background:var(--border);border-radius:2px;margin-top:6px;overflow:hidden;}
.stat-card .sc-bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:2px;}
```
**HTML template:**
```html
<div class="stat-card"><div class="sc-val">34.2</div><div class="sc-label">Exp pts</div><div class="sc-bar"><div class="sc-bar-fill" style="width:68%"></div></div></div>
```
**WHY:** Replaces prose stat mentions (e.g., "roughly +3.2 points a game") with visual bars. Used in game preview (matchup swings), game review (key stats), season review (team stats), 100-season (sim results).

### 2. Bar row (`.bar-row`)
A horizontal two-value comparison bar (offense vs defense, or team A vs team B).

**WHERE:** New CSS class, inserted after `.metricrow` (l.93).
**WHAT:**
```css
.bar-row{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;margin-bottom:6px;font-size:0.82rem;}
.bar-row .br-left{text-align:right;font-weight:600;}
.bar-row .br-center{font-size:0.72rem;color:var(--sub);text-align:center;min-width:60px;}
.bar-row .br-right{text-align:left;font-weight:600;}
.bar-row .br-bar{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:2px;height:6px;}
.bar-row .br-bar-l{background:var(--accent);border-radius:3px 0 0 3px;}
.bar-row .br-bar-r{background:var(--accent2);border-radius:0 3px 3px 0;}
```
**HTML template:**
```html
<div class="bar-row"><div class="br-left">34.2</div><div class="br-center">Exp pts</div><div class="br-right">28.1</div><div class="br-bar"><div class="br-bar-l" style="width:55%"></div><div class="br-bar-r" style="width:45%"></div></div></div>
```
**WHY:** Replaces "The ratings lean X by about Y" prose with visual comparison bars. Used in game preview (matchup swings), game review (team stats comparison).

### 3. Two-column pair (`.two-col-pair`)
A side-by-side comparison layout for two teams/units.

**WHERE:** New CSS class, inserted after `.kp-grid` (l.138).
**WHAT:**
```css
.two-col-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
@media (max-width:760px){.two-col-pair{grid-template-columns:1fr;}}
.two-col-pair .tcp-side{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;}
.two-col-pair .tcp-side.tcp-home{border-left:3px solid var(--accent);}
.two-col-pair .tcp-side.tcp-away{border-left:3px solid var(--accent2);}
.two-col-pair .tcp-title{font-weight:700;font-size:0.85rem;margin-bottom:6px;}
.two-col-pair .tcp-stat{display:flex;justify-content:space-between;font-size:0.8rem;padding:2px 0;}
.two-col-pair .tcp-stat .tcp-val{font-weight:600;font-variant-numeric:tabular-nums;}
```
**HTML template:**
```html
<div class="two-col-pair">
  <div class="tcp-side tcp-home"><div class="tcp-title">Home Team</div><div class="tcp-stat"><span>QB</span><span class="tcp-val">92</span></div></div>
  <div class="tcp-side tcp-away"><div class="tcp-title">Away Team</div><div class="tcp-stat"><span>QB</span><span class="tcp-val">85</span></div></div>
</div>
```
**WHY:** Replaces prose team comparisons. Used in game preview (QB matchup), game review (team stats), season review (team comparison).

### 4. Gold banner (`.gold-banner`)
A highlight banner for champions, awards, and key moments.

**WHERE:** New CSS class, inserted after `.champion-banner` (l.137).
**WHAT:**
```css
.gold-banner{background:linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,165,0,0.1));border:2px solid #ffd700;border-radius:14px;padding:16px 20px;text-align:center;margin-bottom:16px;}
.gold-banner h2{margin:0 0 4px;font-size:1.4rem;color:#ffd700;}
.gold-banner .gb-sub{font-size:0.85rem;color:var(--sub);}
.gold-banner .gb-stat{font-size:1.1rem;font-weight:700;margin-top:6px;}
```
**HTML template:**
```html
<div class="gold-banner"><h2>🏆 Champion</h2><div class="gb-sub">Season complete</div><div class="gb-stat">14-3 · +142 point diff</div></div>
```
**WHY:** Replaces champion banner text with a more visually distinct gold treatment. Used in season review (champion), 100-season review (best team), game review (game ball winner).

## SAFE ALONE?
Yes — all four components are pure CSS additions. No JS changes, no protected constants, no math changes. Can be added independently and used by any screen.

## HOW TO CHECK
1. `node --check` on extracted script block → exit 0 (no JS changes, so this is trivially satisfied).
2. Visual check: each component renders correctly at 390px (no horizontal overflow).
3. Each component is used by at least one screen (verified by grep for class name in the HTML).

## What was deliberately not checked
- Whether the four screens actually use these components (that's items 2-5's job).
- Whether the components look good in dark mode (CSS uses var() tokens, so should adapt automatically).
- Whether the components need animation (deferred to item 8 — Guide's visual language).

## Usage mapping (which screen uses which component)

| Screen | Stat card | Bar row | Two-col pair | Gold banner |
|--------|-----------|---------|--------------|-------------|
| Game preview | ✓ (matchup swings) | ✓ (unit comparison) | ✓ (QB matchup) | — |
| Game review | ✓ (key stats) | ✓ (team comparison) | ✓ (away vs home) | ✓ (game ball) |
| Season review | ✓ (team stats) | ✓ (conference comparison) | ✓ (team comparison) | ✓ (champion) |
| 100-season review | ✓ (sim results) | ✓ (team comparison) | ✓ (best vs worst) | ✓ (best team) |
