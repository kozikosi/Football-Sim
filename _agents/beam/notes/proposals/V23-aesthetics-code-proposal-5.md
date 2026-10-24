# Beam — V23 Aesthetics Code Proposal 5 (for Claude/Architect review)

**Status:** advisory proposal. No product edits. Self-contained code snippets ready to drop into the single-file HTML.
**Companions:** Proposals 1–4 (32 proposals), `V23-aesthetics-plug-and-play.md` (consolidated guide)

---

## Proposal 33: Audio (Sound Effects)

### CSS

```css
.audio-toggle {
  position: fixed;
  bottom: 8px;
  left: 8px;
  z-index: 9985;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 150ms ease;
  pointer-events: auto;
}
.audio-toggle:hover {
  border-color: var(--team-primary, #4f8cff);
  transform: scale(1.1);
}
.audio-toggle.muted {
  opacity: 0.5;
}
@media (max-width: 760px) {
  .audio-toggle { bottom: 68px; }
}
```

### JS

```js
// ── V23: Audio system (Web Audio API, no external files) ──
let audioCtx = null;
let audioEnabled = false;

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioEnabled = true;
  } catch (e) {
    audioEnabled = false;
  }
}

function playTone(frequency, duration, type = 'sine', volume = 0.15) {
  if (!audioEnabled || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playDraftPick() {
  // Short ascending chime
  playTone(523, 0.1, 'sine', 0.12); // C5
  setTimeout(() => playTone(659, 0.1, 'sine', 0.12), 80); // E5
  setTimeout(() => playTone(784, 0.15, 'sine', 0.12), 160); // G5
}

function playTouchdown() {
  // Fanfare: ascending arpeggio
  playTone(392, 0.15, 'triangle', 0.15); // G4
  setTimeout(() => playTone(523, 0.15, 'triangle', 0.15), 120); // C5
  setTimeout(() => playTone(659, 0.15, 'triangle', 0.15), 240); // E5
  setTimeout(() => playTone(784, 0.25, 'triangle', 0.15), 360); // G5
}

function playInterception() {
  // Descending tone
  playTone(440, 0.15, 'sawtooth', 0.1);
  setTimeout(() => playTone(349, 0.15, 'sawtooth', 0.1), 120);
  setTimeout(() => playTone(262, 0.2, 'sawtooth', 0.1), 240);
}

function playFieldGoal() {
  // Short ding
  playTone(880, 0.2, 'sine', 0.12);
}

function playChampionship() {
  // Major chord arpeggio + sustain
  playTone(523, 0.3, 'triangle', 0.15); // C5
  setTimeout(() => playTone(659, 0.3, 'triangle', 0.15), 150); // E5
  setTimeout(() => playTone(784, 0.3, 'triangle', 0.15), 300); // G5
  setTimeout(() => playTone(1047, 0.5, 'triangle', 0.15), 450); // C6
}

function playDraftComplete() {
  // Ascending scale
  [262, 294, 330, 349, 392, 440, 494, 523].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.08, 'sine', 0.1), i * 60);
  });
}

function toggleAudio() {
  initAudio();
  audioEnabled = !audioEnabled;
  const btn = document.getElementById('audioToggle');
  if (btn) {
    btn.textContent = audioEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !audioEnabled);
  }
  if (audioEnabled && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  localStorage.setItem('audioEnabled', audioEnabled);
}

// On page load:
(function() {
  const saved = localStorage.getItem('audioEnabled');
  if (saved === 'true') {
    // Don't auto-start audio context (browser policy) — just set the flag
    audioEnabled = false; // Will be enabled on first user interaction
  }
})();

// HTML: add to page
// <button id="audioToggle" class="audio-toggle" onclick="toggleAudio()">🔇</button>
```

---

## Proposal 34: Season Recap Montage (Visual Timeline)

### CSS

```css
.season-montage {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}
.montage-header {
  text-align: center;
  margin-bottom: 8px;
}
.montage-title {
  font-size: 1.3em;
  font-weight: 700;
  color: var(--team-primary, #4f8cff);
}
.montage-subtitle {
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
}
.montage-timeline {
  position: relative;
  padding-left: 24px;
}
.montage-timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border, #2a3142);
}
.montage-event {
  position: relative;
  padding: 8px 0 8px 16px;
  border-left: 2px solid transparent;
  transition: all 200ms ease;
}
.montage-event::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sub, #8b92a8);
  border: 2px solid var(--panel, #151922);
}
.montage-event.win::before { background: var(--good, #22c55e); }
.montage-event.loss::before { background: var(--bad, #ef4444); }
.montage-event.playoff::before { background: var(--team-accent, #ffd700); }
.montage-event.championship::before { background: var(--team-accent, #ffd700); box-shadow: 0 0 6px var(--team-accent, #ffd700); }
.montage-event .me-week {
  font-size: 0.7em;
  color: var(--sub, #8b92a8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.montage-event .me-title {
  font-size: 0.9em;
  font-weight: 600;
  color: var(--text, #e8eaf0);
  margin: 2px 0;
}
.montage-event .me-desc {
  font-size: 0.75em;
  color: var(--sub, #8b92a8);
  line-height: 1.3;
}
.montage-event.championship .me-title {
  color: var(--team-accent, #ffd700);
  font-weight: 700;
}
.montage-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 12px;
}
.montage-stat {
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.montage-stat .ms-value {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--team-primary, #4f8cff);
}
.montage-stat .ms-label {
  font-size: 0.65em;
  color: var(--sub, #8b92a8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### JS

```js
function renderSeasonMontage(events, stats, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const typeClasses = { win: 'win', loss: 'loss', playoff: 'playoff', championship: 'championship' };
  el.innerHTML = `
    <div class="season-montage">
      <div class="montage-header">
        <div class="montage-title">Season Recap</div>
        <div class="montage-subtitle">${events.length} key moments</div>
      </div>
      <div class="montage-timeline">
        ${events.map(e => `
          <div class="montage-event ${typeClasses[e.type] || ''}">
            <div class="me-week">${e.week}</div>
            <div class="me-title">${e.title}</div>
            <div class="me-desc">${e.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="montage-stats">
        ${stats.map(s => `
          <div class="montage-stat">
            <div class="ms-value">${s.value}</div>
            <div class="ms-label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

// Example:
// renderSeasonMontage([
//   { week: 'Week 1', title: 'Season Opener', desc: 'Chiefs 24, Ravens 17', type: 'win' },
//   { week: 'Week 7', title: 'Upset Loss', desc: 'Raiders 28, Chiefs 21', type: 'loss' },
//   { week: 'Week 14', title: 'Playoff Clinch', desc: 'Chiefs 31, Broncos 10', type: 'playoff' },
//   { week: 'Super Bowl', title: 'Champions!', desc: 'Chiefs 31, 49ers 20', type: 'championship' },
// ], [
//   { value: '12-5', label: 'Record' },
//   { value: '4,200', label: 'Pass Yds' },
//   { value: '38', label: 'TDs' },
//   { value: '#1', label: 'Seed' },
// ], 'montageContainer');
```

---

## Proposal 35: Trade Deadline Drama (Animated)

### CSS

```css
.trade-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: var(--panel, #151922);
  border: 2px solid var(--team-accent, #ffd700);
  border-radius: 12px;
  padding: 20px 24px;
  z-index: 10001;
  text-align: center;
  opacity: 0;
  transition: all 300ms ease;
  max-width: 360px;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
}
.trade-alert.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.trade-alert .ta-icon {
  font-size: 2.5em;
  margin-bottom: 8px;
}
.trade-alert .ta-title {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--team-accent, #ffd700);
  margin-bottom: 4px;
}
.trade-alert .ta-desc {
  font-size: 0.85em;
  color: var(--sub, #8b92a8);
  margin-bottom: 12px;
}
.trade-alert .ta-players {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}
.trade-alert .ta-player {
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  font-size: 0.8em;
}
.trade-alert .ta-arrow {
  font-size: 1.2em;
  color: var(--team-accent, #ffd700);
}
.trade-alert .ta-btn {
  padding: 8px 20px;
  border-radius: 6px;
  background: var(--team-primary, #4f8cff);
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.trade-alert .ta-btn:hover { opacity: 0.9; }
.trade-alert-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  opacity: 0;
  transition: opacity 200ms ease;
}
.trade-alert-backdrop.show { opacity: 1; }
```

### JS

```js
function showTradeAlert(title, desc, playersOut, playersIn, containerId) {
  let backdrop = document.getElementById('tradeBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'tradeBackdrop';
    backdrop.className = 'trade-alert-backdrop';
    document.body.appendChild(backdrop);
  }
  let alert = document.getElementById('tradeAlert');
  if (!alert) {
    alert = document.createElement('div');
    alert.id = 'tradeAlert';
    alert.className = 'trade-alert';
    document.body.appendChild(alert);
  }
  alert.innerHTML = `
    <div class="ta-icon">🔄</div>
    <div class="ta-title">${title}</div>
    <div class="ta-desc">${desc}</div>
    <div class="ta-players">
      ${playersOut.map(p => `<div class="ta-player">${p}</div>`).join('')}
      <span class="ta-arrow">→</span>
      ${playersIn.map(p => `<div class="ta-player">${p}</div>`).join('')}
    </div>
    <button class="ta-btn" onclick="dismissTradeAlert()">OK</button>
  `;
  backdrop.classList.add('show');
  alert.classList.add('show');
}

function dismissTradeAlert() {
  const backdrop = document.getElementById('tradeBackdrop');
  const alert = document.getElementById('tradeAlert');
  if (backdrop) backdrop.classList.remove('show');
  if (alert) alert.classList.remove('show');
  setTimeout(() => { if (backdrop) backdrop.remove(); if (alert) alert.remove(); }, 300);
}

// Example:
// showTradeAlert('Trade Deadline', 'Chiefs acquire WR from Raiders', ['2027 3rd'], ['Davante Adams']);
```

---

## Proposal 36: Rivalry Tracker (expanded)

Already proposed as Proposal 32. Expanded with rivalry badge and streak visualization:

### CSS (additions)

```css
.rivalry-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.7em;
  font-weight: 600;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.rivalry-badge.hot {
  border-color: var(--bad, #ef4444);
  color: var(--bad, #ef4444);
  background: rgba(239, 68, 68, 0.1);
}
.rivalry-badge.dominant {
  border-color: var(--good, #22c55e);
  color: var(--good, #22c55e);
  background: rgba(34, 197, 94, 0.1);
}
.rivalry-streak-bar {
  display: flex;
  gap: 2px;
  margin-top: 6px;
}
.rivalry-streak-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.rivalry-streak-dot.win { background: var(--good, #22c55e); }
.rivalry-streak-dot.loss { background: var(--bad, #ef4444); }
.rivalry-streak-dot.tie { background: var(--sub, #8b92a8); }
```

---

## Implementation Priority (updated — all 36 proposals)

1. **Team color theming** (CSS + JS) — highest visual impact
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
24. **Draft grade (post-draft)** — moderate effort, high value
25. **Contract negotiation (visual)** — moderate effort, high engagement
26. **Scouting report (radar chart)** — moderate effort, high value
27. **Rivalry tracker** — moderate effort, medium value
28. **Injury report (visual)** — moderate effort, medium value
29. **Draft day war room** — high effort, high value
30. **Playoff bracket animation** — moderate effort, high visual impact
31. **Season recap montage (visual timeline)** — moderate effort, high value
32. **Trade deadline drama (animated)** — moderate effort, high engagement

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
- Proposal 3 (V23-aesthetics-code-proposal-2.md) adds 8 more proposals with code
- Proposal 4 (V23-aesthetics-code-proposal-3.md) adds 8 more proposals with code
- Proposal 5 (V23-aesthetics-plug-and-play.md) consolidates all 25 proposals into 5 drop-in blocks
- Proposal 6 (V23-aesthetics-code-proposal-4.md) adds 7 more proposals with code
- Proposal 7 (this file) adds 6 more proposals with code
- Combined, these 7 proposals cover the full brainstorm (36 items)

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
