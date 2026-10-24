# V22 Graphics Round — Item 6: Playoff Bracket + Conference Charts (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Replace the current bracket list with a March Madness-style visual bracket and add conference ranking charts, per Owner's brief.

## Owner's brief (§4.2)
- "Kansas City Chiefs: 14-3 · 397 PF · 296 PA" → two conference charts ranking the team 1–16, "as beautiful as possible"
- March Madness-style bracket: "showing the byes and both conferences with the Super Bowl contestants meeting in the middle"

## Current state (renderBracketHTML, l.3830-3855)
Current bracket is a vertical list of rounds (wildcard → divisional → champ → superbowl) with game rows. No visual bracket layout. No conference charts.

## Proposed changes

### GR-6a · March Madness bracket layout

**WHERE** l.3830-3855 (`renderBracketHTML()`)
**WHAT** Replace the vertical list with a CSS grid bracket:
```html
<div class="bracket-layout">
  <div class="bracket-conf bracket-afc">
    <h4>AFC</h4>
    <div class="bracket-round bracket-wc">
      <!-- 4 wildcard games, 2 per side -->
      <div class="bracket-game bg3">...</div>
    </div>
    <div class="bracket-round bracket-div">
      <!-- 2 divisional games -->
    </div>
    <div class="bracket-round bracket-champ">
      <!-- 1 conference championship -->
    </div>
  </div>
  <div class="bracket-center">
    <div class="bracket-sb">
      <h4>Super Bowl</h4>
      <!-- championship game -->
    </div>
  </div>
  <div class="bracket-conf bracket-nfc">
    <h4>NFC</h4>
    <!-- mirror of AFC -->
  </div>
</div>
```
**CSS:**
```css
.bracket-layout{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;}
.bracket-conf{display:flex;flex-direction:column;gap:4px;}
.bracket-conf.bracket-afc{align-items:flex-end;}
.bracket-conf.bracket-nfc{align-items:flex-start;}
.bracket-round{display:flex;flex-direction:column;gap:4px;}
.bracket-game{background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:0.8rem;min-width:180px;}
.bracket-game.bg-winner{border-color:var(--good);background:rgba(0,200,100,0.08);}
.bracket-center{display:flex;flex-direction:column;align-items:center;gap:8px;}
.bracket-sb{background:linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,165,0,0.1));border:2px solid #ffd700;border-radius:12px;padding:12px 16px;text-align:center;}
.bracket-sb h4{margin:0 0 6px;color:#ffd700;}
.bracket-bye{opacity:0.4;font-style:italic;font-size:0.75rem;}
@media (max-width:760px){.bracket-layout{grid-template-columns:1fr;}.bracket-conf{align-items:stretch;}}
```
**WHY** Owner: "March Madness-style bracket — showing the byes and both conferences with the Super Bowl contestants meeting in the middle." Current vertical list doesn't show the bracket structure.
**SAFE ALONE?** Yes — replaces HTML output. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px (bracket collapses to single column on mobile).

### GR-6b · Byes display

**WHERE** l.3830-3855 (bracket rendering)
**WHAT** Show byes as empty slots with a "BYE" label:
```html
<div class="bracket-game bracket-bye"><span>${team} (${conf} #${seed})</span><span class="narr">BYE</span></div>
```
**WHY** Owner: "showing the byes." Currently byes are implicit (teams not in wildcard round).
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0. Visual check: byes visible.

### GR-6c · Conference ranking charts

**WHERE** New function, called from renderSeasonCompleteView (l.5893)
**WHAT** Add two horizontal bar charts (AFC and NFC) ranking teams 1-16:
```html
<div class="conf-chart">
  <h4>AFC Rankings</h4>
  ${afcTeams.map((t,i)=>`
    <div class="cc-row">
      <span class="cc-rank">${i+1}</span>
      <span class="cc-team">${t.name}</span>
      <div class="cc-bar"><div class="cc-bar-fill" style="width:${pct}%"></div></div>
      <span class="cc-record">${t.wins}-${t.losses}</span>
    </div>
  `).join('')}
</div>
```
**CSS:**
```css
.conf-chart{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:14px;}
.conf-chart h4{margin:0 0 8px;font-size:0.9rem;}
.cc-row{display:grid;grid-template-columns:24px 1fr 80px 60px;gap:6px;align-items:center;margin-bottom:3px;font-size:0.8rem;}
.cc-rank{font-weight:700;color:var(--accent);text-align:center;}
.cc-team{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cc-bar{height:8px;background:var(--border);border-radius:4px;overflow:hidden;}
.cc-bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:4px;}
.cc-record{font-size:0.75rem;color:var(--sub);text-align:right;}
```
**WHY** Owner: "two conference charts ranking the team 1–16, as beautiful as possible." Current standings table doesn't show conference ranking visually.
**SAFE ALONE?** Yes — new HTML output. No math changes.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-6d · Champion team highlight

**WHERE** Conference charts (GR-6c)
**WHAT** Highlight the champion team in gold:
```html
<div class="cc-row cc-champ">
  <span class="cc-rank">1</span>
  <span class="cc-team">🏆 ${champ}</span>
  <div class="cc-bar"><div class="cc-bar-fill cc-gold" style="width:100%"></div></div>
  <span class="cc-record">${record}</span>
</div>
```
**CSS:**
```css
.cc-row.cc-champ{background:rgba(255,215,0,0.08);border-radius:6px;}
.cc-bar-fill.cc-gold{background:linear-gradient(90deg,#ffd700,#ff8c00);}
```
**WHY** Owner: champion should be visually distinct (gold).
**SAFE ALONE?** Yes.
**HOW TO CHECK** `node --check` → exit 0.

### GR-6e · Bracket connector lines (optional enhancement)

**WHERE** CSS for bracket layout
**WHAT** Add CSS pseudo-elements for bracket connector lines:
```css
.bracket-game::after{content:'';position:absolute;right:-8px;top:50%;width:8px;height:1px;background:var(--border);}
.bracket-round.bracket-div .bracket-game::before{content:'';position:absolute;left:-8px;top:50%;width:8px;height:1px;background:var(--border);}
```
**WHY** Makes the bracket look like a real tournament bracket.
**SAFE ALONE?** Yes — CSS only.
**HOW TO CHECK** Visual check at 390px (may need adjustment on mobile).

## What stays as sentences
- None — the bracket and charts are purely visual.

## SAFE ALONE?
Yes — all changes replace HTML output with visual components. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: bracket renders at 390px (collapses to single column)
3. Visual check: conference charts render at 390px
4. All 14 playoff teams (or 12 + 2 byes) appear in the bracket

## What was deliberately not checked
- Whether the bracket connector lines work on all browsers
- Whether the conference charts should be sortable
- Whether the bracket should show game scores or just winners
