# Beam — V23 Aesthetics Code Proposal 2 (for Claude/Architect review)

**Status:** advisory proposal. No product edits. Self-contained code snippets ready to drop into the single-file HTML.
**Companion:** `_agents/beam/notes/proposals/V23-aesthetics-code-proposal.md` (Proposal 1 — 8 proposals)

---

## Proposal 9: Score Bug (Live Game Ticker)

### CSS

```css
.score-bug {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 9990;
  background: var(--panel, #151922);
  border: 1px solid var(--border, #2a3142);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.75em;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease;
}
.score-bug.visible { opacity: 1; }
.score-bug .sb-team { font-weight: 700; }
.score-bug .sb-score { font-size: 1.2em; font-variant-numeric: tabular-nums; }
.score-bug .sb-quarter { color: var(--sub, #8b92a8); font-size: 0.85em; }
.score-bug .sb-possession { width: 6px; height: 6px; border-radius: 50%; background: var(--team-primary); }
```

### JS

```js
function showScoreBug(userTeam, oppTeam, userScore, oppScore, quarter, time, userHasBall) {
  let bug = document.getElementById('scoreBug');
  if (!bug) {
    bug = document.createElement('div');
    bug.id = 'scoreBug';
    bug.className = 'score-bug';
    document.body.appendChild(bug);
  }
  bug.innerHTML = `
    <span class="sb-team" style="color:var(--team-primary)">${userTeam}</span>
    <span class="sb-score">${userScore}</span>
    <span style="color:var(--sub)">—</span>
    <span class="sb-score">${oppScore}</span>
    <span class="sb-team" style="color:var(--opp-primary)">${oppTeam}</span>
    <span class="sb-quarter">Q${quarter} ${time}</span>
    ${userHasBall ? '<span class="sb-possession"></span>' : ''}
  `;
  bug.classList.add('visible');
}

function hideScoreBug() {
  const bug = document.getElementById('scoreBug');
  if (bug) bug.classList.remove('visible');
}
```

---

## Proposal 10: Play-by-Play Ticker

### CSS

```css
.play-ticker {
  max-height: 120px;
  overflow-y: auto;
  font-size: 0.75em;
  line-height: 1.4;
  padding: 6px 8px;
  background: var(--panel2, #1a1f2e);
  border-radius: 6px;
  border: 1px solid var(--border, #2a3142);
}
.play-entry {
  padding: 2px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  animation: slideIn 200ms ease-out;
}
.play-entry.gain { color: var(--good, #22c55e); }
.play-entry.loss { color: var(--bad, #ef4444); }
.play-entry.score { color: var(--team-accent, #ffd700); font-weight: 600; }
.play-entry.turnover { color: var(--bad, #ef4444); font-weight: 700; }
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### JS

```js
function addPlayEntry(text, type = 'gain') {
  const ticker = document.getElementById('playTicker');
  if (!ticker) return;
  const entry = document.createElement('div');
  entry.className = 'play-entry ' + type;
  entry.textContent = text;
  ticker.appendChild(entry);
  ticker.scrollTop = ticker.scrollHeight;
}

// Usage:
// addPlayEntry('Mahomes pass to Kelce for 12 yards', 'gain');
// addPlayEntry('Interception by Sneed', 'turnover');
// addPlayEntry('Touchdown! Chiefs 24, Raiders 17', 'score');
```

---

## Proposal 11: Heat Map Calendar (Season View)

Already proposed in Proposal 1. Expanded with legend and accessibility:

### CSS (additions)

```css
.cal-legend {
  display: flex;
  gap: 12px;
  font-size: 0.7em;
  color: var(--sub, #8b92a8);
  margin-top: 4px;
}
.cal-legend span {
  display: flex;
  align-items: center;
  gap: 4px;
}
.cal-legend .swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
```

### JS (additions)

```js
function renderCalendarLegend(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <span><span class="swatch cal-win"></span> Win</span>
    <span><span class="swatch cal-loss"></span> Loss</span>
    <span><span class="swatch cal-tie"></span> Tie</span>
    <span><span class="swatch cal-bye"></span> Bye</span>
    <span><span class="swatch cal-upcoming"></span> Upcoming</span>
  `;
}
```

---

## Proposal 12: Achievement Badges

### CSS

```css
.achievement-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75em;
  font-weight: 600;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  color: var(--sub, #8b92a8);
  transition: all 200ms ease;
}
.achievement-badge.unlocked {
  background: linear-gradient(135deg, var(--team-primary), var(--team-accent));
  border-color: var(--team-primary);
  color: #fff;
  box-shadow: 0 0 8px var(--team-primary);
}
.achievement-badge .badge-icon {
  font-size: 1.1em;
}
@keyframes badgePop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.achievement-badge.newly-unlocked {
  animation: badgePop 300ms ease-out;
}
```

### JS

```js
const ACHIEVEMENTS = [
  { id: 'first-win', icon: '🏆', name: 'First Win', check: (s) => s.wins >= 1 },
  { id: 'playoff-berth', icon: '🎫', name: 'Playoff Berth', check: (s) => s.playoff },
  { id: 'ten-wins', icon: '⭐', name: '10-Win Season', check: (s) => s.wins >= 10 },
  { id: 'conference-champ', icon: '🏅', name: 'Conference Champ', check: (s) => s.confChamp },
  { id: 'super-bowl', icon: '🏆', name: 'Super Bowl', check: (s) => s.superBowl },
  { id: 'twenty-and-oh', icon: '👑', name: '20-0', check: (s) => s.wins === 17 && s.playoff && s.superBowl },
  { id: 'shutout', icon: '🛡️', name: 'Shutout', check: (s) => s.shutout },
  { id: 'comeback', icon: '🔄', name: 'Comeback Win', check: (s) => s.comeback },
];

function renderAchievements(stats, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = a.check(stats);
    return `<span class="achievement-badge ${unlocked ? 'unlocked' : ''}">
      <span class="badge-icon">${a.icon}</span> ${a.name}
    </span>`;
  }).join('');
}

function checkNewAchievements(stats, previousIds) {
  const newOnes = ACHIEVEMENTS.filter(a => a.check(stats) && !previousIds.includes(a.id));
  newOnes.forEach(a => {
    showToast(`Achievement unlocked: ${a.icon} ${a.name}`);
  });
  return newOnes.map(a => a.id);
}
```

---

## Proposal 13: Loading Skeletons

### CSS

```css
.skeleton {
  background: linear-gradient(90deg, var(--panel2, #1a1f2e) 25%, var(--panel, #151922) 50%, var(--panel2, #1a1f2e) 75%);
  background-size: 200% 100%;
  animation: skeletonPulse 1.5s ease-in-out infinite;
  border-radius: 4px;
}
@keyframes skeletonPulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton-text { height: 12px; margin: 4px 0; }
.skeleton-card { height: 60px; margin: 8px 0; }
.skeleton-row { height: 24px; margin: 2px 0; }
```

### JS

```js
function showSkeleton(containerId, type = 'card', count = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array(count).fill(`<div class="skeleton skeleton-${type}"></div>`).join('');
}

function hideSkeleton(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}
```

---

## Proposal 14: Mobile Bottom Navigation

### CSS

```css
@media (max-width: 760px) {
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9980;
    background: var(--panel, #151922);
    border-top: 1px solid var(--border, #2a3142);
    display: flex;
    justify-content: space-around;
    padding: 4px 0;
    padding-bottom: env(safe-area-inset-bottom, 4px);
  }
  .bottom-nav button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 4px 2px;
    font-size: 0.65em;
    color: var(--sub, #8b92a8);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 150ms ease;
  }
  .bottom-nav button.active {
    color: var(--team-primary, #4f8cff);
  }
  .bottom-nav button .nav-icon {
    font-size: 1.3em;
  }
  /* Push content up so bottom nav doesn't overlap */
  .main-content {
    padding-bottom: 60px;
  }
}
@media (min-width: 761px) {
  .bottom-nav { display: none; }
}
```

### HTML (add to page)

```html
<nav class="bottom-nav" id="bottomNav">
  <button class="active" onclick="switchTab('season')"><span class="nav-icon">🏈</span>Season</button>
  <button onclick="switchTab('draft')"><span class="nav-icon">📋</span>Draft</button>
  <button onclick="switchTab('rankings')"><span class="nav-icon">📊</span>Rankings</button>
  <button onclick="switchTab('browser')"><span class="nav-icon">🔍</span>Browser</button>
  <button onclick="switchTab('compare')"><span class="nav-icon">⚖️</span>Compare</button>
</nav>
```

---

## Proposal 15: Print/Export

### CSS

```css
@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  body { background: #fff; color: #000; }
  .card { border: 1px solid #ccc; box-shadow: none; }
  .tab-content { display: block !important; }
  .bottom-nav { display: none !important; }
}
```

### JS

```js
function printRoster() {
  window.print();
}

function exportRosterCSV(slotmap, teamName) {
  let csv = 'Slot,Player,OVR,Position\n';
  for (const [slot, player] of Object.entries(slotmap)) {
    csv += `${slot},"${player.name}",${player.ovr},${player.pos}\n`;
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${teamName}-roster.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## Proposal 16: Opponent Color in Matchup Preview

### CSS

```css
.matchup-preview {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
}
.matchup-team {
  flex: 1;
  text-align: center;
  padding: 8px;
  border-radius: 6px;
}
.matchup-team.user {
  border: 2px solid var(--team-primary);
  background: linear-gradient(135deg, var(--team-primary), transparent);
  opacity: 0.12;
}
.matchup-team.opp {
  border: 2px solid var(--opp-primary);
  background: linear-gradient(135deg, var(--opp-primary), transparent);
  opacity: 0.12;
}
.matchup-vs {
  font-weight: 700;
  color: var(--sub, #8b92a8);
  font-size: 0.8em;
}
.matchup-record {
  font-size: 0.7em;
  color: var(--sub, #8b92a8);
}
```

### JS

```js
function renderMatchupPreview(userTeam, oppTeam, userRecord, oppRecord, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  setOpponentColors(oppTeam);
  el.innerHTML = `
    <div class="matchup-team user">
      <div style="font-weight:700;color:var(--team-primary)">${userTeam}</div>
      <div class="matchup-record">${userRecord}</div>
    </div>
    <div class="matchup-vs">VS</div>
    <div class="matchup-team opp">
      <div style="font-weight:700;color:var(--opp-primary)">${oppTeam}</div>
      <div class="matchup-record">${oppRecord}</div>
    </div>
  `;
}
```

---

## Implementation Priority (updated)

1. **Team color theming** (CSS + JS) — highest visual impact, data already in `figma/team-colours.json`
2. **Championship banner + confetti** — already proposed, just needs wiring
3. **Tab transitions** (CSS-only) — low risk, instant polish
4. **Heat map calendar** — simple CSS grid, high info density
5. **Player card flip** — high engagement, moderate effort
6. **Toast notifications** — moderate effort, high value
7. **Dark/light mode toggle** — tokens exist, just needs switch + persistence
8. **Micro-interactions** (button press, hover lift, focus rings) — CSS-only polish
9. **Score bug + play-by-play ticker** — high value for game day feel
10. **Achievement badges** — high engagement, moderate effort
11. **Loading skeletons** — low effort, better UX
12. **Mobile bottom nav** — moderate effort, mobile UX improvement
13. **Opponent color in matchup preview** — moderate effort, high visual impact
14. **Print/export** — low priority, nice-to-have
15. **Audio** — lowest priority, optional

## Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review
- Proposal 1 (team-color-theming.md) covers the full 32-team table and mermaid diagram
- This proposal (Proposal 2) adds 8 more proposals with code
- Combined, these 16 proposals cover the full brainstorm

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
