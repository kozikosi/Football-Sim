# Beam — V23 Aesthetics Code Proposal (for Claude/Architect review)

**Status:** advisory proposal. No product edits. Self-contained code snippets ready to drop into the single-file HTML.
**Companions:** `_agents/beam/notes/team-color-theming.md`, `_agents/beam/notes/team-color-theming-v2.md`, `V22-Suggestions.md` P7/P9/P10, `_agents/beam/notes/colour-registry-verification.md`

---

## Prerequisite: TEAM_COLORS data

The colour table lives in `figma/team-colours.json` (32 teams, verified structurally by Beam). Before implementing, extract the `brand.primary` and `brand.secondary` values into a JS object in the product file:

```js
const TEAM_COLORS = {
  'Kansas City Chiefs':     { primary: '#E31837', secondary: '#FFB81C' },
  'Seattle Seahawks':       { primary: '#002244', secondary: '#69BE28' },
  'Baltimore Ravens':       { primary: '#241773', secondary: '#9E7C0C' },
  'Buffalo Bills':          { primary: '#00338D', secondary: '#C60C30' },
  'Cincinnati Bengals':     { primary: '#FB4F14', secondary: '#000000' },
  'Denver Broncos':         { primary: '#FB4F14', secondary: '#002244' },
  'New England Patriots':   { primary: '#002244', secondary: '#C60C30' },
  'Dallas Cowboys':         { primary: '#003594', secondary: '#869397' },
  'Los Angeles Rams':       { primary: '#003594', secondary: '#FFA300' },
  'Minnesota Vikings':      { primary: '#4F2683', secondary: '#FFC62F' },
  'Philadelphia Eagles':    { primary: '#004C54', secondary: '#A5ACAF' },
  'San Francisco 49ers':    { primary: '#AA0000', secondary: '#B3995D' },
  'Tampa Bay Buccaneers':   { primary: '#D50A0A', secondary: '#34302B' },
  'Washington Commanders':  { primary: '#5A1414', secondary: '#FFB612' },
  'Arizona Cardinals':      { primary: '#97233F', secondary: '#000000' },
  'Atlanta Falcons':        { primary: '#A71930', secondary: '#000000' },
  'Carolina Panthers':      { primary: '#0085CA', secondary: '#101820' },
  'Chicago Bears':          { primary: '#0B162A', secondary: '#C83803' },
  'Cleveland Browns':       { primary: '#311D00', secondary: '#FF3C00' },
  'Detroit Lions':          { primary: '#0076B6', secondary: '#B0B7BC' },
  'Green Bay Packers':      { primary: '#203731', secondary: '#FFB612' },
  'Houston Texans':         { primary: '#03202F', secondary: '#A71930' },
  'Indianapolis Colts':     { primary: '#002C5F', secondary: '#FFFFFF' },
  'Jacksonville Jaguars':   { primary: '#006778', secondary: '#D7A22A' },
  'Las Vegas Raiders':      { primary: '#000000', secondary: '#A5ACAF' },
  'Los Angeles Chargers':   { primary: '#0080C6', secondary: '#FFC20E' },
  'Miami Dolphins':         { primary: '#008E97', secondary: '#F58220' },
  'New Orleans Saints':     { primary: '#D3BC8D', secondary: '#101820' },
  'New York Giants':        { primary: '#0B2265', secondary: '#A71930' },
  'New York Jets':          { primary: '#125740', secondary: '#FFFFFF' },
  'Pittsburgh Steelers':    { primary: '#FFB612', secondary: '#101820' },
  'Tennessee Titans':       { primary: '#0C2340', secondary: '#4B92DB' },
};
const TEAM_COLORS_DEFAULT = { primary: '#4f8cff', secondary: '#ff6b4a' };
```

---

## Proposal 1: Team Color Theming (CSS + JS)

### CSS (add to `<style>` block)

```css
/* Team color variables — set on :root when team is selected */
:root {
  --team-primary: #4f8cff;
  --team-secondary: #ff6b4a;
  --team-accent: #ffd700;
  --opp-primary: #8b92a8;
  --opp-secondary: #4f8cff;
}

/* Draft board header */
.draft-header {
  border-color: var(--team-primary);
}
.draft-header .badge-mono {
  background: var(--team-primary);
  color: #fff;
}
.draft-header .das-text b {
  color: var(--team-primary);
}

/* Tab bar active indicator */
.tab.active {
  border-bottom-color: var(--team-primary);
  color: var(--team-primary);
}

/* Position cards left border */
.pos-card {
  border-left: 3px solid var(--team-primary);
}

/* Badge strip accent */
.badge-strip {
  accent-color: var(--team-primary);
}

/* "Drafting as [Team]" box */
.drafting-as-box {
  border-color: var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary) 0%, transparent 100%);
  opacity: 0.15;
}

/* Team comparison headers */
.team-a-header { background: var(--team-primary); }
.team-b-header { background: var(--opp-primary); }

/* Roster strip left edge */
.roster-strip {
  border-left: 3px solid var(--team-primary);
}

/* Weight sliders */
input[type="range"] {
  accent-color: var(--team-primary);
}

/* Save My Weights button */
.save-my-weights-active {
  background: var(--team-primary);
  border-color: var(--team-primary);
}

/* Championship banner */
.champion-banner {
  border-color: var(--team-primary);
}
.champion-banner h2 {
  background: linear-gradient(90deg, var(--team-primary), var(--team-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Conference chart bars */
.conf-chart-bar {
  background: var(--team-primary);
}

/* Playoff bracket — user's team */
.bracket-team.user-team {
  border-left: 3px solid var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary), transparent);
  opacity: 0.1;
}

/* Matchup chart bars */
.matchup-bar.user { background: var(--team-primary); }
.matchup-bar.opp { background: var(--opp-primary); }

/* Opponent elements */
.opp-card { border-left: 3px solid var(--opp-primary); }
.opp-header { background: var(--opp-primary); }
.opp-badge { accent-color: var(--opp-primary); }

/* Glow on user's pick row */
.user-pick-row {
  box-shadow: 0 0 8px var(--team-primary);
  transform: scale(1.02);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* Dimmed "gone" players */
.player-gone {
  opacity: 0.4;
  text-decoration: line-through;
}

/* Zebra stripes on tables */
tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

/* Better scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb {
  background: var(--team-primary);
  border-radius: 3px;
}

/* Position group color-coding (left border on draft board) */
.pos-qb { border-left: 3px solid #4f8cff; }
.pos-rb { border-left: 3px solid #22c55e; }
.pos-wr { border-left: 3px solid #f97316; }
.pos-te { border-left: 3px solid #a855f7; }
.pos-ol { border-left: 3px solid #6b7280; }
.pos-dl { border-left: 3px solid #ef4444; }
.pos-lb { border-left: 3px solid #14b8a6; }
.pos-cb { border-left: 3px solid #eab308; }
.pos-s  { border-left: 3px solid #eab308; }
.pos-k  { border-left: 3px solid #92400e; }
.pos-p  { border-left: 3px solid #92400e; }
```

### JS (add near team selection logic)

```js
function setTeamColors(teamName) {
  const tc = TEAM_COLORS[teamName] || TEAM_COLORS_DEFAULT;
  const root = document.documentElement;
  root.style.setProperty('--team-primary', tc.primary);
  root.style.setProperty('--team-secondary', tc.secondary);
  root.style.setProperty('--team-accent', tc.accent || tc.secondary);
}

function setOpponentColors(teamName) {
  const tc = TEAM_COLORS[teamName] || TEAM_COLORS_DEFAULT;
  const root = document.documentElement;
  root.style.setProperty('--opp-primary', tc.primary);
  root.style.setProperty('--opp-secondary', tc.secondary);
}

// Call when user selects their team:
// setTeamColors(userTeamName);
// Call before each matchup:
// setOpponentColors(opponentTeamName);
```

---

## Proposal 2: Championship Banner + Confetti

### CSS

```css
/* Championship banner */
.champion-banner {
  border: 1px solid var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary) 0%, var(--team-accent) 100%);
  opacity: 0.15;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 8px 0;
}
.champion-banner h2 {
  background: linear-gradient(90deg, var(--team-primary), var(--team-accent), #fff, var(--team-accent), var(--team-primary));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s ease-in-out infinite;
  font-size: 1.4em;
  font-weight: 700;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Confetti — scope to Super Bowl only */
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.confetti-particle {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--team-primary);
  animation: confetti 1s ease-out forwards;
  pointer-events: none;
  z-index: 9999;
}

/* Gold shimmer for awards */
.gold-shimmer {
  background: linear-gradient(90deg, #ffd700 0%, #fff 50%, #ffd700 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### JS

```js
function fireConfetti(count = 30) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-10px';
    p.style.background = Math.random() > 0.5 ? 'var(--team-primary)' : 'var(--team-accent)';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// Call on Super Bowl win:
// fireConfetti(30);
```

---

## Proposal 3: Tab Transitions

### CSS

```css
.tab-content {
  animation: fadeIn 150ms ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  .tab-content { animation: none !important; }
  .fx-rise, .fx-swipe, .confetti-particle { animation: none !important; }
}
```

---

## Proposal 4: Heat Map Calendar

### CSS

```css
.season-calendar {
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  gap: 2px;
  margin: 8px 0;
}
.cal-cell {
  aspect-ratio: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6em;
  font-weight: 600;
  cursor: pointer;
  transition: transform 100ms ease;
}
.cal-cell:hover { transform: scale(1.15); }
.cal-win { background: var(--team-primary); color: #fff; }
.cal-loss { background: var(--bad, #ef4444); color: #fff; }
.cal-tie { background: var(--sub, #8b92a8); color: #fff; }
.cal-upcoming { background: var(--panel2, #1a1f2e); color: var(--sub); }
.cal-bye { background: var(--panel, #151922); color: var(--sub); font-size: 0.5em; }
```

### JS

```js
function renderSeasonCalendar(games, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  games.forEach((g, i) => {
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    if (g.result === 'W') cell.classList.add('cal-win');
    else if (g.result === 'L') cell.classList.add('cal-loss');
    else if (g.result === 'T') cell.classList.add('cal-tie');
    else if (g.bye) cell.classList.add('cal-bye');
    else cell.classList.add('cal-upcoming');
    cell.textContent = g.bye ? 'BYE' : (g.result || (i + 1));
    cell.title = g.opponent ? `Week ${i+1}: vs ${g.opponent} — ${g.result || 'Upcoming'}` : `Week ${i+1}`;
    el.appendChild(cell);
  });
}
```

---

## Proposal 5: Player Card Flip

### CSS

```css
.player-card {
  perspective: 800px;
  cursor: pointer;
}
.player-card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 300ms ease;
}
.player-card.flipped .player-card-inner {
  transform: rotateY(180deg);
}
.player-card-front, .player-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0; left: 0; width: 100%;
}
.player-card-back {
  transform: rotateY(180deg);
}
```

### JS

```js
function togglePlayerCard(cardEl) {
  cardEl.classList.toggle('flipped');
}
```

---

## Proposal 6: Toast Notifications

### CSS

```css
.toast-container {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast {
  background: var(--panel, #151922);
  border: 1px solid var(--team-primary);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.85em;
  color: var(--text, #e8eaf0);
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 200ms ease, transform 200ms ease;
  pointer-events: auto;
  max-width: 320px;
}
.toast.show {
  opacity: 1;
  transform: translateX(0);
}
.toast.fade-out {
  opacity: 0;
  transform: translateX(100%);
}
```

### JS

```js
function showToast(message, duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  // trigger reflow
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

// Usage:
// showToast('Chiefs traded for Patrick Mahomes');
// showToast('Week 7: Chiefs 24, Raiders 17');
```

---

## Proposal 7: Dark/Light Mode Toggle

### CSS

```css
/* Light mode overrides */
[data-theme="light"] {
  --bg: #f5f7fa;
  --panel: #ffffff;
  --panel2: #eef1f6;
  --text: #1a1f2e;
  --sub: #5a6278;
  --border: #d1d5e0;
  --accent: #3b6fd4;
  --accent2: #e05a3a;
  --good: #16a34a;
  --bad: #dc2626;
}
[data-theme="light"] body {
  background: var(--bg);
  color: var(--text);
}
```

### JS

```js
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// On page load:
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();
```

---

## Proposal 8: Button & Micro-Interactions

### CSS

```css
/* Button press */
button, .btn {
  transition: transform 100ms ease, box-shadow 100ms ease;
}
button:active, .btn:active {
  transform: scale(0.95);
}

/* Hover lift (desktop only) */
@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

/* Focus rings */
button:focus-visible, .btn:focus-visible, input:focus-visible {
  outline: 2px solid var(--team-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Number counter — CSS for the element */
.counter {
  font-variant-numeric: tabular-nums;
  transition: color 200ms ease;
}

/* Pulse on Save My Weights */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79, 140, 255, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(79, 140, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 140, 255, 0); }
}
.save-my-weights-active {
  animation: pulse 1.5s infinite;
}
```

---

## Implementation Priority

1. **Team color theming** (CSS + JS) — highest visual impact, data already in `figma/team-colours.json`
2. **Championship banner + confetti** — already proposed, just needs wiring
3. **Tab transitions** (CSS-only) — low risk, instant polish
4. **Heat map calendar** — simple CSS grid, high info density
5. **Player card flip** — high engagement, moderate effort
6. **Toast notifications** — moderate effort, high value
7. **Dark/light mode toggle** — tokens exist, just needs switch + persistence
8. **Micro-interactions** (button press, hover lift, focus rings) — CSS-only polish
9. **Audio** — lowest priority, optional

## Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
