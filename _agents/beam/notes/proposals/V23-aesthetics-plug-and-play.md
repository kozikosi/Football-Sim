# Beam — V23 Aesthetics: Plug-and-Play Implementation Guide

**Status:** advisory proposal. No product edits. Self-contained — every block below can be copy-pasted directly into the single-file HTML.
**Companions:** `V23-aesthetics-code-proposal.md` (1), `V23-aesthetics-code-proposal-2.md` (2), `V23-aesthetics-code-proposal-3.md` (3), `V23-aesthetics-code-proposal-index.md` (index)
**Total:** 25 proposals, 1,827 lines of CSS/JS across 3 proposal files. This file consolidates the 8 highest-priority proposals into a single drop-in guide.

---

## Where to insert

1. **CSS block** → paste into the existing `<style>` block, after the last rule (before `</style>`).
2. **JS block** → paste into the existing `<script>` block, after `TEAM_DATA` is defined (or after `PLAYERS` if TEAM_DATA isn't available yet — the JS degrades gracefully).
3. **HTML snippets** → paste into the DOM where noted.

---

## BLOCK 1: TEAM_COLORS data (JS — paste near top of `<script>`)

```js
// ── V23: Team colour theming data (REPORTED: from figma/team-colours.json, GPT table, Owner-supplied 22 Oct) ──
const TEAM_COLORS = {
  'Arizona Cardinals':     { primary: '#97233F', secondary: '#FFB612' },
  'Atlanta Falcons':       { primary: '#A71930', secondary: '#000000' },
  'Baltimore Ravens':      { primary: '#241773', secondary: '#9E7C0C' },
  'Buffalo Bills':         { primary: '#00338D', secondary: '#C60C30' },
  'Carolina Panthers':     { primary: '#0085CA', secondary: '#BFC0BF' },
  'Chicago Bears':         { primary: '#0B162A', secondary: '#C83803' },
  'Cincinnati Bengals':    { primary: '#FB4F14', secondary: '#000000' },
  'Cleveland Browns':      { primary: '#311D00', secondary: '#FF3C00' },
  'Dallas Cowboys':        { primary: '#003594', secondary: '#869397' },
  'Denver Broncos':        { primary: '#FB4F14', secondary: '#002244' },
  'Detroit Lions':         { primary: '#0076B6', secondary: '#B0B7BC' },
  'Green Bay Packers':     { primary: '#203731', secondary: '#FFB612' },
  'Houston Texans':        { primary: '#03202F', secondary: '#A71930' },
  'Indianapolis Colts':    { primary: '#002C5F', secondary: '#FFFFFF' },
  'Jacksonville Jaguars':  { primary: '#006778', secondary: '#D7A22A' },
  'Kansas City Chiefs':    { primary: '#E31837', secondary: '#FFB81C' },
  'Las Vegas Raiders':     { primary: '#000000', secondary: '#A5ACAF' },
  'Los Angeles Chargers':  { primary: '#0080C6', secondary: '#FFC20E' },
  'Los Angeles Rams':      { primary: '#003594', secondary: '#FFA300' },
  'Miami Dolphins':        { primary: '#008E97', secondary: '#F58220' },
  'Minnesota Vikings':     { primary: '#4F2683', secondary: '#FFC62F' },
  'New England Patriots':  { primary: '#002244', secondary: '#C60C30' },
  'New Orleans Saints':    { primary: '#D3BC8D', secondary: '#101820' },
  'New York Giants':       { primary: '#0B2265', secondary: '#A71930' },
  'New York Jets':         { primary: '#125740', secondary: '#FFFFFF' },
  'Philadelphia Eagles':   { primary: '#004C54', secondary: '#A5ACAF' },
  'Pittsburgh Steelers':   { primary: '#FFB612', secondary: '#101820' },
  'San Francisco 49ers':   { primary: '#AA0000', secondary: '#B3995D' },
  'Seattle Seahawks':      { primary: '#002244', secondary: '#69BE28' },
  'Tampa Bay Buccaneers':  { primary: '#D50A0A', secondary: '#34302B' },
  'Tennessee Titans':      { primary: '#0C2340', secondary: '#4B92DB' },
  'Washington Commanders': { primary: '#5A1414', secondary: '#FFB612' },
};
const TEAM_COLORS_DEFAULT = { primary: '#4f8cff', secondary: '#ff6b4a', accent: '#ffd700' };
```

---

## BLOCK 2: Team Color Functions (JS — paste near team selection logic)

```js
// ── V23: Team color theming functions ──
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

## BLOCK 3: All CSS (paste before `</style>`)

```css
/* ── V23: Team color variables ── */
:root {
  --team-primary: #4f8cff;
  --team-secondary: #ff6b4a;
  --team-accent: #ffd700;
  --opp-primary: #8b92a8;
  --opp-secondary: #4f8cff;
}

/* ── V23: Draft board header ── */
.draft-header { border-color: var(--team-primary); }
.draft-header .badge-mono { background: var(--team-primary); color: #fff; }
.draft-header .das-text b { color: var(--team-primary); }

/* ── V23: Tab bar active indicator ── */
.tab.active { border-bottom-color: var(--team-primary); color: var(--team-primary); }

/* ── V23: Position cards left border ── */
.pos-card { border-left: 3px solid var(--team-primary); }

/* ── V23: Badge strip accent ── */
.badge-strip { accent-color: var(--team-primary); }

/* ── V23: Drafting as box ── */
.drafting-as-box {
  border-color: var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary) 0%, transparent 100%);
  opacity: 0.15;
}

/* ── V23: Team comparison headers ── */
.team-a-header { background: var(--team-primary); }
.team-b-header { background: var(--opp-primary); }

/* ── V23: Roster strip left edge ── */
.roster-strip { border-left: 3px solid var(--team-primary); }

/* ── V23: Weight sliders ── */
input[type="range"] { accent-color: var(--team-primary); }

/* ── V23: Save My Weights button ── */
.save-my-weights-active {
  background: var(--team-primary);
  border-color: var(--team-primary);
}

/* ── V23: Championship banner ── */
.champion-banner { border-color: var(--team-primary); }
.champion-banner h2 {
  background: linear-gradient(90deg, var(--team-primary), var(--team-accent), #fff, var(--team-accent), var(--team-primary));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s ease-in-out infinite;
  font-size: 1.4em;
  font-weight: 700;
}

/* ── V23: Conference chart bars ── */
.conf-chart-bar { background: var(--team-primary); }

/* ── V23: Playoff bracket ── */
.bracket-team.user-team {
  border-left: 3px solid var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary), transparent);
  opacity: 0.1;
}

/* ── V23: Matchup chart bars ── */
.matchup-bar.user { background: var(--team-primary); }
.matchup-bar.opp { background: var(--opp-primary); }

/* ── V23: Opponent elements ── */
.opp-card { border-left: 3px solid var(--opp-primary); }
.opp-header { background: var(--opp-primary); }
.opp-badge { accent-color: var(--opp-primary); }

/* ── V23: Glow on user's pick row ── */
.user-pick-row {
  box-shadow: 0 0 8px var(--team-primary);
  transform: scale(1.02);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* ── V23: Dimmed "gone" players ── */
.player-gone { opacity: 0.4; text-decoration: line-through; }

/* ── V23: Zebra stripes on tables ── */
tr:nth-child(even) { background: rgba(255, 255, 255, 0.02); }

/* ── V23: Better scrollbar ── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb {
  background: var(--team-primary);
  border-radius: 3px;
}

/* ── V23: Position group color-coding ── */
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

/* ── V23: Tab transitions ── */
.tab-content { animation: fadeIn 150ms ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── V23: Shimmer animation ── */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ── V23: Confetti ── */
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.confetti-particle {
  position: fixed;
  width: 8px;
  height: 8px;
  animation: confetti 1s ease-out forwards;
  pointer-events: none;
  z-index: 9999;
}

/* ── V23: Gold shimmer for awards ── */
.gold-shimmer {
  background: linear-gradient(90deg, #ffd700 0%, #fff 50%, #ffd700 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── V23: Heat map calendar ── */
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

/* ── V23: Player card flip ── */
.player-card { perspective: 800px; cursor: pointer; }
.player-card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 300ms ease;
}
.player-card.flipped .player-card-inner { transform: rotateY(180deg); }
.player-card-front, .player-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0; left: 0; width: 100%;
}
.player-card-back { transform: rotateY(180deg); }

/* ── V23: Toast notifications ── */
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
.toast.show { opacity: 1; transform: translateX(0); }
.toast.fade-out { opacity: 0; transform: translateX(100%); }

/* ── V23: Dark/light mode ── */
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
[data-theme="light"] body { background: var(--bg); color: var(--text); }

/* ── V23: Micro-interactions ── */
button, .btn { transition: transform 100ms ease, box-shadow 100ms ease; }
button:active, .btn:active { transform: scale(0.95); }
@media (hover: hover) {
  .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
}
button:focus-visible, .btn:focus-visible, input:focus-visible {
  outline: 2px solid var(--team-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
.counter { font-variant-numeric: tabular-nums; transition: color 200ms ease; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79, 140, 255, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(79, 140, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 140, 255, 0); }
}
.save-my-weights-active { animation: pulse 1.5s infinite; }

/* ── V23: Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .tab-content { animation: none !important; }
  .confetti-particle { animation: none !important; }
}

/* ── V23: Score bug ── */
.score-bug {
  position: fixed; top: 8px; right: 8px; z-index: 9990;
  background: var(--panel, #151922); border: 1px solid var(--border, #2a3142);
  border-radius: 8px; padding: 6px 10px; font-size: 0.75em;
  display: flex; align-items: center; gap: 8px;
  pointer-events: none; opacity: 0; transition: opacity 200ms ease;
}
.score-bug.visible { opacity: 1; }
.score-bug .sb-team { font-weight: 700; }
.score-bug .sb-score { font-size: 1.2em; font-variant-numeric: tabular-nums; }
.score-bug .sb-quarter { color: var(--sub, #8b92a8); font-size: 0.85em; }
.score-bug .sb-possession { width: 6px; height: 6px; border-radius: 50%; background: var(--team-primary); }

/* ── V23: Play-by-play ticker ── */
.play-ticker {
  max-height: 120px; overflow-y: auto; font-size: 0.75em; line-height: 1.4;
  padding: 6px 8px; background: var(--panel2, #1a1f2e);
  border-radius: 6px; border: 1px solid var(--border, #2a3142);
}
.play-entry { padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.03); animation: slideIn 200ms ease-out; }
.play-entry.gain { color: var(--good, #22c55e); }
.play-entry.loss { color: var(--bad, #ef4444); }
.play-entry.score { color: var(--team-accent, #ffd700); font-weight: 600; }
.play-entry.turnover { color: var(--bad, #ef4444); font-weight: 700; }
@keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }

/* ── V23: Achievement badges ── */
.achievement-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 12px; font-size: 0.75em; font-weight: 600;
  background: var(--panel2, #1a1f2e); border: 1px solid var(--border, #2a3142);
  color: var(--sub, #8b92a8); transition: all 200ms ease;
}
.achievement-badge.unlocked {
  background: linear-gradient(135deg, var(--team-primary), var(--team-accent));
  border-color: var(--team-primary); color: #fff;
  box-shadow: 0 0 8px var(--team-primary);
}
.achievement-badge .badge-icon { font-size: 1.1em; }
@keyframes badgePop { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
.achievement-badge.newly-unlocked { animation: badgePop 300ms ease-out; }

/* ── V23: Loading skeletons ── */
.skeleton {
  background: linear-gradient(90deg, var(--panel2, #1a1f2e) 25%, var(--panel, #151922) 50%, var(--panel2, #1a1f2e) 75%);
  background-size: 200% 100%;
  animation: skeletonPulse 1.5s ease-in-out infinite;
  border-radius: 4px;
}
@keyframes skeletonPulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.skeleton-text { height: 12px; margin: 4px 0; }
.skeleton-card { height: 60px; margin: 8px 0; }
.skeleton-row { height: 24px; margin: 2px 0; }

/* ── V23: Mobile bottom nav ── */
@media (max-width: 760px) {
  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9980;
    background: var(--panel, #151922); border-top: 1px solid var(--border, #2a3142);
    display: flex; justify-content: space-around; padding: 4px 0;
    padding-bottom: env(safe-area-inset-bottom, 4px);
  }
  .bottom-nav button {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 4px 2px; font-size: 0.65em; color: var(--sub, #8b92a8);
    background: none; border: none; cursor: pointer; transition: color 150ms ease;
  }
  .bottom-nav button.active { color: var(--team-primary, #4f8cff); }
  .bottom-nav button .nav-icon { font-size: 1.3em; }
  .main-content { padding-bottom: 60px; }
}
@media (min-width: 761px) { .bottom-nav { display: none; } }

/* ── V23: Print/export ── */
@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  body { background: #fff; color: #000; }
  .card { border: 1px solid #ccc; box-shadow: none; }
  .tab-content { display: block !important; }
  .bottom-nav { display: none !important; }
}

/* ── V23: Matchup preview ── */
.matchup-preview {
  display: flex; gap: 8px; align-items: center; padding: 8px;
  border-radius: 8px; background: var(--panel2, #1a1f2e);
}
.matchup-team { flex: 1; text-align: center; padding: 8px; border-radius: 6px; }
.matchup-team.user {
  border: 2px solid var(--team-primary);
  background: linear-gradient(135deg, var(--team-primary), transparent); opacity: 0.12;
}
.matchup-team.opp {
  border: 2px solid var(--opp-primary);
  background: linear-gradient(135deg, var(--opp-primary), transparent); opacity: 0.12;
}
.matchup-vs { font-weight: 700; color: var(--sub, #8b92a8); font-size: 0.8em; }
.matchup-record { font-size: 0.7em; color: var(--sub, #8b92a8); }

/* ── V23: Trophy case ── */
.trophy-case {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px; padding: 12px;
}
.trophy-item {
  text-align: center; padding: 12px 8px; border-radius: 8px;
  background: var(--panel2, #1a1f2e); border: 1px solid var(--border, #2a3142);
  transition: transform 200ms ease, box-shadow 200ms ease; cursor: pointer;
}
.trophy-item:hover { transform: translateY(-4px); box-shadow: 0 6px 16px rgba(0,0,0,0.3); }
.trophy-item.locked { opacity: 0.3; filter: grayscale(1); }
.trophy-icon { font-size: 2em; margin-bottom: 4px; }
.trophy-name { font-size: 0.75em; font-weight: 600; color: var(--text, #e8eaf0); }
.trophy-year { font-size: 0.65em; color: var(--sub, #8b92a8); }
.trophy-item.won {
  border-color: var(--team-accent, #ffd700);
  background: linear-gradient(135deg, var(--panel2, #1a1f2e), rgba(255, 215, 0, 0.08));
}
.trophy-item.won .trophy-icon { animation: trophyGlow 2s ease-in-out infinite; }
@keyframes trophyGlow {
  0%, 100% { filter: drop-shadow(0 0 2px var(--team-accent, #ffd700)); }
  50% { filter: drop-shadow(0 0 8px var(--team-accent, #ffd700)); }
}

/* ── V23: Ring ceremony ── */
.ring-ceremony {
  text-align: center; padding: 24px 16px;
  background: linear-gradient(135deg, var(--panel2, #1a1f2e), var(--panel, #151922));
  border-radius: 12px; border: 2px solid var(--team-accent, #ffd700); margin: 12px 0;
}
.ring-graphic {
  width: 80px; height: 80px; margin: 0 auto 12px; border-radius: 50%;
  background: radial-gradient(circle, var(--team-accent, #ffd700) 30%, var(--team-primary) 70%);
  box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center; font-size: 2em;
  animation: ringPulse 2s ease-in-out infinite; position: relative;
}
.ring-graphic::before, .ring-graphic::after {
  content: ''; position: absolute; left: 50%; transform: translateX(-50%);
  width: 40px; height: 4px; background: var(--team-accent, #ffd700); border-radius: 2px;
}
.ring-graphic::before { top: 8px; }
.ring-graphic::after { bottom: 8px; }
@keyframes ringPulse {
  0%, 100% { box-shadow: 0 0 20px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
  50% { box-shadow: 0 0 30px var(--team-accent, #ffd700), inset 0 0 10px rgba(0,0,0,0.3); }
}
.ring-team-name { font-size: 1.2em; font-weight: 700; color: var(--team-primary); margin-bottom: 4px; }
.ring-season { font-size: 0.8em; color: var(--sub, #8b92a8); }
.ring-players { margin-top: 12px; font-size: 0.75em; color: var(--sub, #8b92a8); }
.ring-players span {
  display: inline-block; margin: 2px 4px; padding: 2px 6px; border-radius: 4px;
  background: var(--panel2, #1a1f2e); border: 1px solid var(--border, #2a3142);
}

/* ── V23: Leaderboard podium ── */
.podium { display: flex; align-items: flex-end; justify-content: center; gap: 8px; padding: 16px 8px; min-height: 140px; }
.podium-slot { text-align: center; flex: 1; max-width: 100px; }
.podium-bar {
  border-radius: 4px 4px 0 0; margin: 0 auto;
  transition: height 400ms ease-out; display: flex; align-items: flex-end;
  justify-content: center; padding-bottom: 4px; font-weight: 700; font-size: 0.7em; color: #fff;
}
.podium-1 .podium-bar { background: var(--team-accent, #ffd700); height: 80px; }
.podium-2 .podium-bar { background: var(--sub, #8b92a8); height: 60px; }
.podium-3 .podium-bar { background: #cd7f32; height: 40px; }
.podium-name { font-size: 0.7em; font-weight: 600; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.podium-stat { font-size: 0.65em; color: var(--sub, #8b92a8); }
.podium-medal { font-size: 1.2em; margin-bottom: 4px; }

/* ── V23: Weather overlay ── */
.weather-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 9970; overflow: hidden; }
.weather-rain .rain-drop { position: absolute; width: 1px; height: 12px; background: rgba(174, 194, 224, 0.4); animation: rainFall 0.8s linear infinite; }
@keyframes rainFall { 0% { transform: translateY(-20px); opacity: 0.6; } 100% { transform: translateY(100vh); opacity: 0.2; } }
.weather-snow .snow-flake { position: absolute; width: 3px; height: 3px; background: rgba(255, 255, 255, 0.7); border-radius: 50%; animation: snowFall 2s linear infinite; }
@keyframes snowFall { 0% { transform: translateY(-20px) translateX(0); opacity: 0.8; } 50% { transform: translateY(50vh) translateX(10px); } 100% { transform: translateY(100vh) translateX(-5px); opacity: 0.2; } }
.weather-fog { background: radial-gradient(ellipse at center, rgba(200,200,200,0.15) 0%, transparent 70%); animation: fogPulse 3s ease-in-out infinite; }
@keyframes fogPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.9; } }
@media (prefers-reduced-motion: reduce) {
  .weather-rain .rain-drop, .weather-snow .snow-flake, .weather-fog { animation: none !important; }
}

/* ── V23: Field graphic ── */
.field-graphic { width: 100%; max-width: 320px; margin: 8px auto; background: #1a3a1a; border-radius: 6px; overflow: hidden; }
.field-graphic svg { width: 100%; height: auto; }
.field-yard-line { stroke: rgba(255,255,255,0.3); stroke-width: 1; }
.field-endzone { fill: var(--team-primary, #4f8cff); opacity: 0.3; }
.field-ball { fill: #8B4513; stroke: #fff; stroke-width: 1; transition: cx 300ms ease, cy 300ms ease; }
.field-play-arrow { stroke: var(--team-primary, #4f8cff); stroke-width: 2; }

/* ── V23: Season ticker ── */
.season-ticker { overflow: hidden; white-space: nowrap; background: var(--panel2, #1a1f2e); border: 1px solid var(--border, #2a3142); border-radius: 6px; padding: 4px 0; font-size: 0.75em; color: var(--sub, #8b92a8); }
.season-ticker-track { display: inline-block; animation: tickerScroll 20s linear infinite; padding-left: 100%; }
@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
.season-ticker-item { display: inline-block; margin-right: 24px; }
.season-ticker-item .ticker-team { color: var(--team-primary, #4f8cff); font-weight: 600; }
.season-ticker-item .ticker-score { color: var(--text, #e8eaf0); }
@media (prefers-reduced-motion: reduce) { .season-ticker-track { animation: none; } }

/* ── V23: Sticky sub-header ── */
.sticky-subheader {
  position: sticky; top: 0; z-index: 9975; background: var(--panel, #151922);
  border-bottom: 1px solid var(--border, #2a3142); padding: 4px 8px; font-size: 0.8em;
  display: flex; align-items: center; gap: 8px; transition: transform 200ms ease;
}
.sticky-subheader .sh-team { font-weight: 700; color: var(--team-primary, #4f8cff); }
.sticky-subheader .sh-record { color: var(--sub, #8b92a8); }
.sticky-subheader .sh-week { margin-left: auto; color: var(--sub, #8b92a8); font-size: 0.85em; }
.sticky-subheader.collapsed { transform: translateY(-100%); }

/* ── V23: Achievement legend ── */
.cal-legend { display: flex; gap: 12px; font-size: 0.7em; color: var(--sub, #8b92a8); margin-top: 4px; }
.cal-legend span { display: flex; align-items: center; gap: 4px; }
.cal-legend .swatch { width: 10px; height: 10px; border-radius: 2px; }
```

---

## BLOCK 4: All JS (paste before `</script>`)

```js
// ── V23: Team color theming functions ──
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

// ── V23: Confetti ──
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

// ── V23: Toast notifications ──
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
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

// ── V23: Achievement badges ──
const ACHIEVEMENTS = [
  { id: 'first-win', icon: '🏈', name: 'First Win', check: (s) => s.wins >= 1 },
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
    return `<span class="achievement-badge ${unlocked ? 'unlocked' : ''}"><span class="badge-icon">${a.icon}</span> ${a.name}</span>`;
  }).join('');
}
function checkNewAchievements(stats, previousIds) {
  const newOnes = ACHIEVEMENTS.filter(a => a.check(stats) && !previousIds.includes(a.id));
  newOnes.forEach(a => showToast(`Achievement unlocked: ${a.icon} ${a.name}`));
  return newOnes.map(a => a.id);
}

// ── V23: Heat map calendar ──
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
function renderCalendarLegend(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `
    <span><span class="swatch cal-win"></span> Win</span>
    <span><span class="swatch cal-loss"></span> Loss</span>
    <span><span class="swatch cal-tie"></span> Tie</span>
    <span><span class="swatch cal-bye"></span> Bye</span>
    <span><span class="swatch cal-upcoming"></span> Upcoming</span>`;
}

// ── V23: Player card flip ──
function togglePlayerCard(cardEl) {
  if (cardEl) cardEl.classList.toggle('flipped');
}

// ── V23: Loading skeletons ──
function showSkeleton(containerId, type = 'card', count = 3) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = Array(count).fill(`<div class="skeleton skeleton-${type}"></div>`).join('');
}
function hideSkeleton(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}

// ── V23: Score bug ──
function showScoreBug(userTeam, oppTeam, userScore, oppScore, quarter, time, userHasBall) {
  let bug = document.getElementById('scoreBug');
  if (!bug) { bug = document.createElement('div'); bug.id = 'scoreBug'; bug.className = 'score-bug'; document.body.appendChild(bug); }
  bug.innerHTML = `
    <span class="sb-team" style="color:var(--team-primary)">${userTeam}</span>
    <span class="sb-score">${userScore}</span>
    <span style="color:var(--sub)">—</span>
    <span class="sb-score">${oppScore}</span>
    <span class="sb-team" style="color:var(--opp-primary)">${oppTeam}</span>
    <span class="sb-quarter">Q${quarter} ${time}</span>
    ${userHasBall ? '<span class="sb-possession"></span>' : ''}`;
  bug.classList.add('visible');
}
function hideScoreBug() {
  const bug = document.getElementById('scoreBug');
  if (bug) bug.classList.remove('visible');
}

// ── V23: Play-by-play ticker ──
function addPlayEntry(text, type = 'gain') {
  const ticker = document.getElementById('playTicker');
  if (!ticker) return;
  const entry = document.createElement('div');
  entry.className = 'play-entry ' + type;
  entry.textContent = text;
  ticker.appendChild(entry);
  ticker.scrollTop = ticker.scrollHeight;
}

// ── V23: Trophy case ──
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

// ── V23: Ring ceremony ──
function renderRingCeremony(teamName, season, mvpName, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="ring-ceremony">
      <div class="ring-graphic">💍</div>
      <div class="ring-team-name">${teamName}</div>
      <div class="ring-season">${season} Season Champions</div>
      ${mvpName ? `<div class="ring-players">MVP: <span>${mvpName}</span></div>` : ''}
    </div>`;
}

// ── V23: Leaderboard podium ──
function renderPodium(players, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !players || players.length < 3) return;
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['podium-1', 'podium-2', 'podium-3'];
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

// ── V23: Weather overlay ──
function setWeather(condition) {
  let overlay = document.getElementById('weatherOverlay');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'weatherOverlay'; overlay.className = 'weather-overlay'; document.body.appendChild(overlay); }
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

// ── V23: Field graphic (SVG) ──
function renderFieldGraphic(yardLine, possession, plays, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const fieldWidth = 320, fieldHeight = 120;
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
    <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="var(--team-primary, #4f8cff)" /></marker></defs>
    <rect x="0" y="0" width="${fieldWidth}" height="${fieldHeight}" fill="#1a3a1a" />
    <rect x="0" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    <rect x="${90*pxPerYard}" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    ${[10,20,30,40,50,60,70,80,90].map(y => `<line x1="${y*pxPerYard}" y1="0" x2="${y*pxPerYard}" y2="${fieldHeight}" class="field-yard-line" />`).join('')}
    ${playArrows}
    <circle cx="${ballX}" cy="${ballY}" r="4" class="field-ball" />
    <text x="${ballX}" y="${ballY - 8}" text-anchor="middle" fill="#fff" font-size="8">${yardLine}</text>
  </svg>`;
}

// ── V23: Season ticker ──
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

// ── V23: Sticky sub-header ──
function updateStickySubheader(teamName, record, week, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<span class="sh-team">${teamName}</span><span class="sh-record">${record}</span><span class="sh-week">Week ${week}</span>`;
}
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const sh = document.getElementById('stickySubheader');
  if (!sh) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 60) sh.classList.add('collapsed');
  else sh.classList.remove('collapsed');
  lastScrollY = currentY;
});

// ── V23: Dynamic favicon ──
function setDynamicFavicon(teamName) {
  const tc = TEAM_COLORS[teamName];
  if (!tc) return;
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = tc.primary;
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(teamName.charAt(0), 16, 16);
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/png');
  document.getElementsByTagName('head')[0].appendChild(link);
}

// ── V23: Ring ceremony ──
function renderRingCeremony(teamName, season, mvpName, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="ring-ceremony">
      <div class="ring-graphic">💍</div>
      <div class="ring-team-name">${teamName}</div>
      <div class="ring-season">${season} Season Champions</div>
      ${mvpName ? `<div class="ring-players">MVP: <span>${mvpName}</span></div>` : ''}
    </div>`;
}

// ── V23: Leaderboard podium ──
function renderPodium(players, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !players || players.length < 3) return;
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['podium-1', 'podium-2', 'podium-3'];
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

// ── V23: Weather overlay ──
function setWeather(condition) {
  let overlay = document.getElementById('weatherOverlay');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'weatherOverlay'; overlay.className = 'weather-overlay'; document.body.appendChild(overlay); }
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

// ── V23: Field graphic (SVG) ──
function renderFieldGraphic(yardLine, possession, plays, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const fieldWidth = 320, fieldHeight = 120;
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
    <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="var(--team-primary, #4f8cff)" /></marker></defs>
    <rect x="0" y="0" width="${fieldWidth}" height="${fieldHeight}" fill="#1a3a1a" />
    <rect x="0" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    <rect x="${90*pxPerYard}" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    ${[10,20,30,40,50,60,70,80,90].map(y => `<line x1="${y*pxPerYard}" y1="0" x2="${y*pxPerYard}" y2="${fieldHeight}" class="field-yard-line" />`).join('')}
    ${playArrows}
    <circle cx="${ballX}" cy="${ballY}" r="4" class="field-ball" />
    <text x="${ballX}" y="${ballY - 8}" text-anchor="middle" fill="#fff" font-size="8">${yardLine}</text>
  </svg>`;
}

// ── V23: Season ticker ──
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

// ── V23: Sticky sub-header ──
function updateStickySubheader(teamName, record, week, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<span class="sh-team">${teamName}</span><span class="sh-record">${record}</span><span class="sh-week">Week ${week}</span>`;
}
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const sh = document.getElementById('stickySubheader');
  if (!sh) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 60) sh.classList.add('collapsed');
  else sh.classList.remove('collapsed');
  lastScrollY = currentY;
});

// ── V23: Matchup preview ──
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
    </div>`;
}

// ── V23: Dark/light mode toggle ──
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// ── V23: Trophy case ──
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

// ── V23: Ring ceremony ──
function renderRingCeremony(teamName, season, mvpName, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="ring-ceremony">
      <div class="ring-graphic">💍</div>
      <div class="ring-team-name">${teamName}</div>
      <div class="ring-season">${season} Season Champions</div>
      ${mvpName ? `<div class="ring-players">MVP: <span>${mvpName}</span></div>` : ''}
    </div>`;
}

// ── V23: Leaderboard podium ──
function renderPodium(players, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !players || players.length < 3) return;
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['podium-1', 'podium-2', 'podium-3'];
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

// ── V23: Season ticker ──
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

// ── V23: Dynamic favicon ──
function setDynamicFavicon(teamName) {
  const tc = TEAM_COLORS[teamName];
  if (!tc) return;
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = tc.primary;
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(teamName.charAt(0), 16, 16);
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/png');
  document.getElementsByTagName('head')[0].appendChild(link);
}

// ── V23: Print/export ──
function printRoster() { window.print(); }
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

// ── V23: Number counter animation ──
function animateCounter(element, from, to, duration = 300) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = from + (to - from) * progress;
    element.textContent = value.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── V23: Sticky sub-header ──
function updateStickySubheader(teamName, record, week, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<span class="sh-team">${teamName}</span><span class="sh-record">${record}</span><span class="sh-week">Week ${week}</span>`;
}
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const sh = document.getElementById('stickySubheader');
  if (!sh) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 60) sh.classList.add('collapsed');
  else sh.classList.remove('collapsed');
  lastScrollY = currentY;
});

// ── V23: Season ticker ──
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

// ── V23: Calendar legend ──
function renderCalendarLegend(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `
    <span><span class="swatch cal-win"></span> Win</span>
    <span><span class="swatch cal-loss"></span> Loss</span>
    <span><span class="swatch cal-tie"></span> Tie</span>
    <span><span class="swatch cal-bye"></span> Bye</span>
    <span><span class="swatch cal-upcoming"></span> Upcoming</span>`;
}

// ── V23: Season calendar ──
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

// ── V23: Player card flip ──
function togglePlayerCard(cardEl) {
  if (cardEl) cardEl.classList.toggle('flipped');
}

// ── V23: Loading skeletons ──
function showSkeleton(containerId, type = 'card', count = 3) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = Array(count).fill(`<div class="skeleton skeleton-${type}"></div>`).join('');
}
function hideSkeleton(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}

// ── V23: Score bug ──
function showScoreBug(userTeam, oppTeam, userScore, oppScore, quarter, time, userHasBall) {
  let bug = document.getElementById('scoreBug');
  if (!bug) { bug = document.createElement('div'); bug.id = 'scoreBug'; bug.className = 'score-bug'; document.body.appendChild(bug); }
  bug.innerHTML = `
    <span class="sb-team" style="color:var(--team-primary)">${userTeam}</span>
    <span class="sb-score">${userScore}</span>
    <span style="color:var(--sub)">—</span>
    <span class="sb-score">${oppScore}</span>
    <span class="sb-team" style="color:var(--opp-primary)">${oppTeam}</span>
    <span class="sb-quarter">Q${quarter} ${time}</span>
    ${userHasBall ? '<span class="sb-possession"></span>' : ''}`;
  bug.classList.add('visible');
}
function hideScoreBug() {
  const bug = document.getElementById('scoreBug');
  if (bug) bug.classList.remove('visible');
}

// ── V23: Play-by-play ticker ──
function addPlayEntry(text, type = 'gain') {
  const ticker = document.getElementById('playTicker');
  if (!ticker) return;
  const entry = document.createElement('div');
  entry.className = 'play-entry ' + type;
  entry.textContent = text;
  ticker.appendChild(entry);
  ticker.scrollTop = ticker.scrollHeight;
}

// ── V23: Weather overlay ──
function setWeather(condition) {
  let overlay = document.getElementById('weatherOverlay');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'weatherOverlay'; overlay.className = 'weather-overlay'; document.body.appendChild(overlay); }
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

// ── V23: Field graphic (SVG) ──
function renderFieldGraphic(yardLine, possession, plays, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const fieldWidth = 320, fieldHeight = 120;
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
    <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="var(--team-primary, #4f8cff)" /></marker></defs>
    <rect x="0" y="0" width="${fieldWidth}" height="${fieldHeight}" fill="#1a3a1a" />
    <rect x="0" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    <rect x="${90*pxPerYard}" y="0" width="${10*pxPerYard}" height="${fieldHeight}" class="field-endzone" />
    ${[10,20,30,40,50,60,70,80,90].map(y => `<line x1="${y*pxPerYard}" y1="0" x2="${y*pxPerYard}" y2="${fieldHeight}" class="field-yard-line" />`).join('')}
    ${playArrows}
    <circle cx="${ballX}" cy="${ballY}" r="4" class="field-ball" />
    <text x="${ballX}" y="${ballY - 8}" text-anchor="middle" fill="#fff" font-size="8">${yardLine}</text>
  </svg>`;
}

// ── V23: Matchup preview ──
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
    </div>`;
}

// ── V23: Print/export ──
function printRoster() { window.print(); }
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

// ── V23: Dynamic favicon ──
function setDynamicFavicon(teamName) {
  const tc = TEAM_COLORS[teamName];
  if (!tc) return;
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = tc.primary;
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(teamName.charAt(0), 16, 16);
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/png');
  document.getElementsByTagName('head')[0].appendChild(link);
}
```

---

## BLOCK 5: HTML snippets (paste where noted)

```html
<!-- Mobile bottom nav — paste before closing </body> -->
<nav class="bottom-nav" id="bottomNav">
  <button class="active" onclick="switchTab('season')"><span class="nav-icon">🏈</span>Season</button>
  <button onclick="switchTab('draft')"><span class="nav-icon">📋</span>Draft</button>
  <button onclick="switchTab('rankings')"><span class="nav-icon">📊</span>Rankings</button>
  <button onclick="switchTab('browser')"><span class="nav-icon">🔍</span>Browser</button>
  <button onclick="switchTab('compare')"><span class="nav-icon">⚖️</span>Compare</button>
</nav>

<!-- Toast container — paste before closing </body> -->
<div id="toastContainer" class="toast-container"></div>

<!-- Sticky sub-header — paste at top of main content area -->
<div id="stickySubheader" class="sticky-subheader"></div>

<!-- Score bug — created dynamically by showScoreBug() -->

<!-- Weather overlay — created dynamically by setWeather() -->
```

---

## Integration notes for Claude (Architect)

### Where to call the JS functions:

| Function | When to call | Example call site |
|----------|-------------|-------------------|
| `setTeamColors(teamName)` | When user selects their team (draft start) | `setTeamColors(userTeamName)` |
| `setOpponentColors(teamName)` | Before each matchup preview | `setOpponentColors(opponentTeamName)` |
| `setDynamicFavicon(teamName)` | When user selects their team | `setDynamicFavicon(userTeamName)` |
| `fireConfetti(30)` | On Super Bowl win | `fireConfetti(30)` |
| `showToast(message)` | On any notable event | `showToast('Chiefs traded for Mahomes')` |
| `renderSeasonCalendar(games, id)` | On season tab render | `renderSeasonCalendar(seasonGames, 'calContainer')` |
| `renderCalendarLegend(id)` | After calendar render | `renderCalendarLegend('calLegend')` |
| `renderTrophyCase(wonIds, id)` | On awards/trophy page | `renderTrophyCase(['first-win', 'super-bowl'], 'trophyCase')` |
| `renderRingCeremony(team, season, mvp, id)` | After Super Bowl win | `renderRingCeremony('Chiefs', '2026', 'Mahomes', 'ringContainer')` |
| `renderPodium(players, id)` | On leaderboard display | `renderPodium([{name:'Mahomes',stat:'Pass Yds',value:4500}], 'podiumContainer')` |
| `setWeather(condition)` | At game start based on stadium/weather | `setWeather('rain')` |
| `clearWeather()` | After game ends | `clearWeather()` |
| `renderFieldGraphic(yardLine, possession, plays, id)` | In game recap | `renderFieldGraphic(45, 'home', plays, 'fieldContainer')` |
| `renderMatchupPreview(user, opp, userRec, oppRec, id)` | In matchup preview | `renderMatchupPreview('Chiefs', 'Raiders', '10-2', '5-7', 'matchupContainer')` |
| `renderSeasonTicker(results, id)` | On season tab | `renderSeasonTicker(weekResults, 'tickerContainer')` |
| `updateStickySubheader(team, record, week, id)` | On scroll/tab change | `updateStickySubheader('Chiefs', '10-2', 12, 'stickySubheader')` |
| `showScoreBug(...)` | During game simulation | `showScoreBug('Chiefs', 'Raiders', 24, 17, 3, '2:45', true)` |
| `hideScoreBug()` | After game ends | `hideScoreBug()` |
| `addPlayEntry(text, type)` | During game simulation | `addPlayEntry('Mahomes pass to Kelce for 12 yards', 'gain')` |
| `renderTrophyCase(wonIds, id)` | On awards page | `renderTrophyCase(['first-win'], 'trophyCase')` |
| `checkNewAchievements(stats, prevIds)` | After season completes | `checkNewAchievements(seasonStats, previousAchievementIds)` |
| `togglePlayerCard(cardEl)` | On player card click | `togglePlayerCard(document.getElementById('playerCard1'))` |
| `showSkeleton(id, type, count)` | Before data loads | `showSkeleton('rosterContainer', 'card', 5)` |
| `hideSkeleton(id)` | After data loads | `hideSkeleton('rosterContainer')` |
| `printRoster()` | On print button click | `printRoster()` |
| `exportRosterCSV(slotmap, teamName)` | On export button click | `exportRosterCSV(roster, 'Chiefs')` |
| `toggleTheme()` | On theme toggle button | `toggleTheme()` |
| `setDynamicFavicon(teamName)` | When user selects team | `setDynamicFavicon('Chiefs')` |

### Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review
- 3 proposal files cover 25 items from the brainstorm
- This plug-and-play guide consolidates the 8 highest-priority proposals into a single drop-in format

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
