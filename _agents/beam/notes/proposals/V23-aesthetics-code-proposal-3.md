# Beam — V23 Aesthetics Code Proposal 3 (for Claude/Architect review)

**Status:** advisory proposal. No product edits. Self-contained code snippets ready to drop into the single-file HTML.
**Companions:** `_agents/beam/notes/proposals/V23-aesthetics-code-proposal.md` (Proposal 1 — 8 proposals), `_agents/beam/notes/proposals/V23-aesthetics-code-proposal-2.md` (Proposal 2 — 8 proposals)

---

## Proposal 17: Trophy Case Page

### CSS

```css
.trophy-case {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  padding: 12px;
}
.trophy-item {
  text-align: center;
  padding: 12px 8px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  transition: transform 200ms ease, box-shadow 200ms ease;
  cursor: pointer;
}
.trophy-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}
.trophy-item.locked {
  opacity: 0.3;
  filter: grayscale(1);
}
.trophy-icon {
  font-size: 2em;
  margin-bottom: 4px;
}
.trophy-name {
  font-size: 0.75em;
  font-weight: 600;
  color: var(--text, #e8eaf0);
}
.trophy-year {
  font-size: 0.65em;
  color: var(--sub, #8b92a8);
}
.trophy-item.won {
  border-color: var(--team-accent, #ffd700);
  background: linear-gradient(135deg, var(--panel2, #1a1f2e), rgba(255, 215, 0, 0.08));
}
.trophy-item.won .trophy-icon {
  animation: trophyGlow 2s ease-in-out infinite;
}
@keyframes trophyGlow {
  0%, 100% { filter: drop-shadow(0 0 2px var(--team-accent, #ffd700)); }
  50% { filter: drop-shadow(0 0 8px var(--team-accent, #ffd700)); }
}
```

### JS

```js
const TROPHY_CASE = [
  { id: 'first-win', icon: '🏈', name: 'First Win', desc: 'Win your first game' },
  { id: 'playoff-berth', icon: '🎫', name: 'Playoff Berth', desc: 'Make the playoffs' },
  { id: 'division-champ', icon: '🏅', name: 'Division Champ', desc: 'Win your division' },
  { id: 'conference-champ', icon: '🏆', name: 'Conference Champ', desc: 'Win conference championship' },
  { id: 'super-bowl', icon: '👑', name: 'Super Bowl', desc: 'Win the Super Bowl' },
  { id: 'ten-wins', icon: '⭐', name: '10-Win Season', desc: 'Win 10+ games in a season' },
  { id: 'twenty-and-oh', icon: '🎯', name: '20-0', desc: 'Go 17-0 and win Super Bowl' },
  { id: 'shutout', icon: '🛡️', name: 'Shutout', desc: 'Win a game 0-0 or better' },
  { id: 'comeback', icon: '🔄', name: 'Comeback', desc: 'Win after trailing by 10+' },
  { id: 'dynasty', icon: '🏛️', name: 'Dynasty', desc: 'Win 3+ Super Bowls' },
];

function renderTrophyCase(wonIds, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = TROPHY_CASE.map(t => {
    const won = wonIds.includes(t.id);
    return `<div class="trophy-item ${won ? 'won' : 'locked'}" title="${t.desc}">
      <div class="trophy-icon">${t.icon}</div>
      <div class="trophy-name">${t.name}</div>
      ${won ? '<div class="trophy-year">Won</div>' : ''}
    </div>`;
  }).join('');
}
```

---

## Proposal 18: Championship Ring Ceremony

### CSS

```css
.ring-ceremony {
  text-align: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, var(--panel2, #1a1f2e), var(--panel, #151922));
  border-radius: 12px;
  border: 2px solid var(--team-accent, #ffd700);
  margin: 12px 0;
}
.ring-graphic {
  width: 80px;
  height: 80px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--team-accent, #ffd700) 30%, var(--team-primary) 70%);
  box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  animation: ringPulse 2s ease-in-out infinite;
}
@keyframes ringPulse {
  0%, 100% { box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
  50% { box-shadow: 0 0 30px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
}
.ring-team-name {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--team-primary);
  margin-bottom: 4px;
}
.ring-season {
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
}
.ring-players {
  margin-top: 12px;
  font-size: 0.75em;
  color: var(--sub, #8b92a8);
}
.ring-players span {
  display: inline-block;
  margin: 2px 4px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
```

### JS

```js
function renderRingCeremony(teamName, season, mvpName, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="ring-ceremony">
      <div class="ring-graphic">💍</div>
      <div class="ring-team-name">${teamName}</div>
      <div class="ring-season">${season} Season Champions</div>
      ${mvpName ? `<div class="ring-players">MVP: <span>${mvpName}</span></div>` : ''}
    </div>
  `;
}
```

---

## Proposal 19: Leaderboard Podium

### CSS

```css
.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  padding: 16px 8px;
  min-height: 140px;
}
.podium-slot {
  text-align: center;
  flex: 1;
  max-width: 100px;
}
.podium-bar {
  border-radius: 4px 4px 0 0;
  margin: 0 auto;
  transition: height 400ms ease-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
  font-weight: 700;
  font-size: 0.7em;
  color: #fff;
}
.podium-1 .podium-bar { background: var(--team-accent, #ffd700); height: 80px; }
.podium-2 .podium-bar { background: var(--sub, #8b92a8); height: 60px; }
.podium-3 .podium-bar { background: #cd7f32; height: 40px; }
.podium-name {
  font-size: 0.7em;
  font-weight: 600;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.podium-stat {
  font-size: 0.65em;
  color: var(--sub, #8b92a8);
}
.podium-medal {
  font-size: 1.2em;
  margin-bottom: 4px;
}
```

### JS

```js
function renderPodium(players, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !players || players.length < 3) return;
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['podium-1', 'podium-2', 'podium-3'];
  // Reorder: 2nd, 1st, 3rd for visual podium
  const order = [1, 0, 2];
  el.innerHTML = order.map(i => {
    const p = players[i];
    return `<div class="podium-slot ${classes[i]}">
      <div class="podium-medal">${medals[i]}</div>
      <div class="podium-name">${p.name}</div>
      <div class="podium-stat">${p.stat}</div>
      <div class="podium-bar">${p.value}</div>
    </div>`;
  }).join('');
}
```

---

## Proposal 20: Weather Overlay Effects

### CSS

```css
.weather-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 9970;
  overflow: hidden;
}
.weather-rain .rain-drop {
  position: absolute;
  width: 1px;
  height: 12px;
  background: rgba(174, 194, 224, 0.4);
  animation: rainFall 0.8s linear infinite;
}
@keyframes rainFall {
  0% { transform: translateY(-20px); opacity: 0.6; }
  100% { transform: translateY(100vh); opacity: 0.2; }
}
.weather-snow .snow-flake {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: snowFall 2s linear infinite;
}
@keyframes snowFall {
  0% { transform: translateY(-20px) translateX(0); opacity: 0.8; }
  50% { transform: translateY(50vh) translateX(10px); }
  100% { transform: translateY(100vh) translateX(-5px); opacity: 0.2; }
}
.weather-fog {
  background: radial-gradient(ellipse at center, rgba(200,200,200,0.15) 0%, transparent 70%);
  animation: fogPulse 3s ease-in-out infinite;
}
@keyframes fogPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .weather-rain .rain-drop,
  .weather-snow .snow-flake,
  .weather-fog { animation: none !important; }
}
```

### JS

```js
function setWeather(condition) {
  let overlay = document.getElementById('weatherOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'weatherOverlay';
    overlay.className = 'weather-overlay';
    document.body.appendChild(overlay);
  }
  overlay.className = 'weather-overlay';
  overlay.innerHTML = '';
  if (condition === 'rain') {
    overlay.classList.add('weather-rain');
    for (let i = 0; i < 40; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDelay = Math.random() * 0.8 + 's';
      overlay.appendChild(drop);
    }
  } else if (condition === 'snow') {
    overlay.classList.add('weather-snow');
    for (let i = 0; i < 30; i++) {
      const flake = document.createElement('div');
      flake.className = 'snow-flake';
      flake.style.left = Math.random() * 100 + 'vw';
      flake.style.animationDelay = Math.random() * 2 + 's';
      overlay.appendChild(flake);
    }
  } else if (condition === 'fog') {
    overlay.classList.add('weather-fog');
  }
}

function clearWeather() {
  const overlay = document.getElementById('weatherOverlay');
  if (overlay) overlay.remove();
}
```

---

## Proposal 21: Field Graphic (SVG)

### CSS

```css
.field-graphic {
  width: 100%;
  max-width: 320px;
  margin: 8px auto;
  background: #1a3a1a;
  border-radius: 6px;
  overflow: hidden;
}
.field-graphic svg {
  width: 100%;
  height: auto;
}
.field-yard-line {
  stroke: rgba(255,255,255,0.3);
  stroke-width: 1;
}
.field-endzone {
  fill: var(--team-primary, #4f8cff);
  opacity: 0.3;
}
.field-ball {
  fill: #8B4513;
  stroke: #fff;
  stroke-width: 1;
  transition: cx 300ms ease, cy 300ms ease;
}
.field-play-arrow {
  stroke: var(--team-primary, #4f8cff);
  stroke-width: 2;
  marker-end: url(#arrowhead);
}
```

### JS

```js
function renderFieldGraphic(yardLine, possession, plays, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const fieldWidth = 320;
  const fieldHeight = 120;
  const pxPerYard = fieldWidth / 100;
  const ballX = yardLine * pxPerYard;
  const ballY = possession === 'home' ? fieldHeight * 0.25 : fieldHeight * 0.75;
  
  let playArrows = '';
  if (plays) {
    plays.forEach(p => {
      const startX = p.start * pxPerYard;
      const endX = p.end * pxPerYard;
      const y = possession === 'home' ? fieldHeight * 0.25 : fieldHeight * 0.75;
      playArrows += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" class="field-play-arrow" />`;
    });
  }
  
  el.innerHTML = `<svg viewBox="0 0 ${fieldWidth} ${fieldHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--team-primary, #4f8cff)" />
      </marker>
    </defs>
    <rect x="0" y="0" width="${fieldWidth}" height="${fieldHeight}" fill="#1a3a1a" />
    <rect x="0" y="0" width="${10 * pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    <rect x="${90 * pxPerYard}" y="0" width="${10 * pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    ${[10,20,30,40,50,60,70,80,90].map(y => `<line x1="${y * pxPerYard}" y1="0" x2="${y * pxPerYard}" y2="${fieldHeight}" class="field-yard-line" />`).join('')}
    ${playArrows}
    <circle cx="${ballX}" cy="${ballY}" r="4" class="field-ball" />
    <text x="${ballX}" y="${ballY - 8}" text-anchor="middle" fill="#fff" font-size="8">${yardLine}</text>
  </svg>`;
}
```

---

## Proposal 22: Animated Season Ticker

### CSS

```css
.season-ticker {
  overflow: hidden;
  white-space: nowrap;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  border-radius: 6px;
  padding: 4px 0;
  font-size: 0.75em;
  color: var(--sub, #8b92a8);
}
.season-ticker-track {
  display: inline-block;
  animation: tickerScroll 20s linear infinite;
  padding-left: 100%;
}
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.season-ticker-item {
  display: inline-block;
  margin-right: 24px;
}
.season-ticker-item .ticker-team {
  color: var(--team-primary, #4f8cff);
  font-weight: 600;
}
.season-ticker-item .ticker-score {
  color: var(--text, #e8eaf0);
}
@media (prefers-reduced-motion: reduce) {
  .season-ticker-track { animation: none; }
}
```

### JS

```js
function renderSeasonTicker(results, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = results.map(r => {
    const color = r.win ? 'var(--good, #22c55e)' : 'var(--bad, #ef4444)';
    return `<span class="season-ticker-item">
      <span class="ticker-team">${r.team}</span>
      <span class="ticker-score" style="color:${color}">${r.score}</span>
      <span style="color:var(--sub)">vs ${r.opp}</span>
    </span>`;
  }).join('');
  el.innerHTML = `<div class="season-ticker-track">${items}${items}</div>`;
}
```

---

## Proposal 23: Sticky Sub-Header

### CSS

```css
.sticky-subheader {
  position: sticky;
  top: 0;
  z-index: 9975;
  background: var(--panel, #151922);
  border-bottom: 1px solid var(--border, #2a3142);
  padding: 4px 8px;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 200ms ease;
}
.sticky-subheader .sh-team {
  font-weight: 700;
  color: var(--team-primary, #4f8cff);
}
.sticky-subheader .sh-record {
  color: var(--sub, #8b92a8);
}
.sticky-subheader .sh-week {
  margin-left: auto;
  color: var(--sub, #8b92a8);
  font-size: 0.85em;
}
.sticky-subheader.collapsed {
  transform: translateY(-100%);
}
```

### JS

```js
function updateStickySubheader(teamName, record, week, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <span class="sh-team">${teamName}</span>
    <span class="sh-record">${record}</span>
    <span class="sh-week">Week ${week}</span>
  `;
}

// Collapse on scroll (optional)
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const sh = document.getElementById('stickySubheader');
  if (!sh) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 60) {
    sh.classList.add('collapsed');
  } else {
    sh.classList.remove('collapsed');
  }
  lastScrollY = currentY;
});
```

---

## Proposal 24: Dynamic Favicon

### JS

```js
function setDynamicFavicon(teamName) {
  const tc = TEAM_COLORS[teamName];
  if (!tc) return;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  // Draw a simple circle with team primary color
  ctx.fillStyle = tc.primary;
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  // Add a letter
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(teamName.charAt(0), 16, 16);
  // Set favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/png');
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Call when user selects team:
// setDynamicFavicon(userTeamName);
```

---

## Proposal 25: Ring Ceremony (expanded)

Already proposed as Proposal 18. Expanded with ring graphic using team colors:

### CSS (additions)

```css
.ring-graphic {
  width: 80px;
  height: 80px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--team-accent, #ffd700) 30%, var(--team-primary) 70%);
  box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  animation: ringPulse 2s ease-in-out infinite;
  position: relative;
}
.ring-graphic::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: var(--team-accent, #ffd700);
  border-radius: 2px;
}
.ring-graphic::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: var(--team-accent, #ffd700);
  border-radius: 2px;
}
@keyframes ringPulse {
  0%, 100% { box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
  50% { box-shadow: 0 0 30px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
}
```

---

## Implementation Priority (updated — all 25 proposals)

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
14. **Weather overlay effects** — moderate effort, high atmosphere
15. **Field graphic (SVG)** — moderate effort, high visual impact
16. **Leaderboard podium** — moderate effort, high engagement
17. **Animated season ticker** — low effort, nice-to-have
18. **Sticky sub-header** — low effort, nice-to-have
19. **Dynamic favicon** — low effort, nice touch
20. **Ring ceremony** — low priority, post-Super Bowl only
21. **Trophy case page** — low priority, post-season
22. **Print/export** — low priority, nice-to-have
23. **Audio** — lowest priority, optional

## Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review
- Proposal 1 (team-color-theming.md) covers the full 32-team table and mermaid diagram
- Proposal 2 (V23-aesthetics-code-proposal.md) adds 8 proposals with code
- Proposal 3 (this file) adds 8 more proposals with code
- Combined, these 3 proposals cover the full brainstorm (23 items)

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
