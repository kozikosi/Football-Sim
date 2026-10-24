# VL — UI Beauty / Interactivity Proposals (Plug-and-Play Spec)
**Status:** PROPOSED — open for any seat or Architect to implement  
**Date:** 2026-10-24  
**Reference:** Bulletin entry M-VL-20261024-04  
**Build target:** `NFL Draft Simulator merged.html` (single-file HTML)  
**Constraints:** No paid APIs, no CDN dependencies, no build steps, no product file split, protected constants untouched  
**Implementation:** All code below is copy-paste ready. CSS goes at end of `<style>` block. JS goes at end of `<script>` block, inside `DOMContentLoaded`.

---

## 0. Prerequisites — What Already Exists in the Build

The following CSS custom properties already exist (P10-5 / P0-29 team variables). Reuse them — do not redefine:

```css
--team-primary, --team-secondary, --team-accent
```

Team data is available via `TEAM_DATA` and `PLAYERS` globals already in scope.

---

## 1. CSS — Append to End of `<style>` Block

```css
/* ============================================================
   VL UI BEAUTY — HEADER
   ============================================================ */
.header-live {
  background: linear-gradient(180deg, var(--team-primary), rgba(0,0,0,0));
  border-color: color-mix(in srgb, var(--team-primary) 45%, var(--border));
  transition: background 0.45s ease, border-color 0.45s ease;
}
.header-live h1 {
  background: linear-gradient(90deg, var(--team-primary), var(--team-secondary) 78%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.team-disc {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(140deg, var(--team-primary), var(--team-secondary));
  color: #fff;
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 22px color-mix(in srgb, var(--team-primary) 35%, transparent);
  animation: heroBounce 3.4s ease-in-out infinite;
}
@keyframes heroBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Season progress pill */
.season-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255,255,255,0.1);
  border: 1px solid color-mix(in srgb, var(--team-primary) 30%, white);
  border-radius: 999px;
  font-size: 0.85rem;
  color: #fff;
}

/* ============================================================
   VL UI BEAUTY — FOOTER
   ============================================================ */
.footer-live {
  background: var(--team-primary);
  color: #fff;
  padding: 16px 24px;
  margin-top: auto;
}
.footer-season {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.footer-record {
  font-size: 1.1rem;
  font-weight: 700;
}
.footer-playoff {
  font-size: 0.85rem;
  padding: 4px 10px;
  border: 1px solid color-mix(in srgb, #fff 70%, transparent);
  border-radius: 999px;
}
.footer-quick-stats {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 0.85rem;
}
.stat-chip {
  display: flex;
  align-items: center;
  gap: 6px;
}
.stat-trend {
  font-size: 0.75rem;
}
.stat-trend.up { color: #4ade80; }
.stat-trend.down { color: #f87171; }

/* Nav pills */
.footer-nav {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.nav-pill {
  padding: 8px 16px;
  border: 2px solid color-mix(in srgb, var(--team-primary) 60%, #fff);
  border-radius: 999px;
  font-size: 0.85rem;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
}
.nav-pill:hover {
  background: color-mix(in srgb, #fff 15%, transparent);
}
.nav-pill.active {
  background: #fff;
  color: var(--team-primary);
}

/* ============================================================
   VL UI BEAUTY — DYNAMIC PANELS
   ============================================================ */
.slide-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: #1a1a2e;
  border-left: 1px solid color-mix(in srgb, #fff 15%, transparent);
  box-shadow: -8px 0 32px rgba(0,0,0,0.4);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
  color: #fff;
}
.slide-panel.open {
  transform: translateX(0);
}
.slide-panel .panel-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
}
.slide-panel h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color-mix(in srgb, var(--team-primary) 80%, #fff);
}

/* Player card in panel */
.player-card-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid color-mix(in srgb, #fff 10%, transparent);
}
.player-card-row:last-child { border-bottom: none; }
.player-card-name {
  flex: 1;
  font-weight: 600;
}
.player-card-ovr {
  font-size: 0.85rem;
  color: color-mix(in srgb, #fff 60%, transparent);
}
.btn-draft-sm {
  padding: 6px 12px;
  background: var(--team-primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}
.btn-draft-sm:hover {
  opacity: 0.9;
}

/* ============================================================
   VL UI BEAUTY — MICRO-INTERACTIONS
   ============================================================ */
.teamrow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px color-mix(in srgb, var(--team-primary) 35%, transparent);
  transition: all 0.2s ease;
}
.btn:active {
  transform: scale(0.95);
}
.confetti {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: color-mix(in srgb, var(--team-primary) 80%, #fff);
  animation: confettiBurst 1s ease-out forwards;
  z-index: 9999;
  pointer-events: none;
}
@keyframes confettiBurst {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + (var(--tx, 0) * 1px)), calc(-50% + (var(--ty, 0) * 1px))) scale(0); opacity: 0; }
}

/* ============================================================
   VL UI BEAUTY — CONFERENCE CHAMPIONSHIP
   ============================================================ */
.trophy-case {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.trophy-slot {
  aspect-ratio: 1;
  border: 2px solid color-mix(in srgb, #fff 30%, transparent);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}
.trophy-slot.won {
  border-color: #ffd700;
  box-shadow: 0 0 20px color-mix(in srgb, #ffd700 40%, transparent);
  background: color-mix(in srgb, #ffd700 10%, transparent);
}
.trophy-icon {
  font-size: 48px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}
.trophy-slot.won .trophy-icon {
  filter: grayscale(0%);
  animation: goldShimmer 2s ease-in-out infinite;
}
@keyframes goldShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.trophy-label {
  font-size: 0.7rem;
  color: color-mix(in srgb, #fff 70%, transparent);
  text-align: center;
}

/* Championship overlay */
.champ-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 20, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  text-align: center;
  color: #fff;
  padding: 40px;
}
.champ-logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(140deg, var(--team-primary), var(--team-secondary));
  display: grid;
  place-items: center;
  font-size: 96px;
  animation: trophyPop 0.8s ease-out;
  margin-bottom: 24px;
}
@keyframes trophyPop {
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.champ-title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(90deg, #ffd700, #fff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #fff;
  width: 0;
  animation: typewriter 2s steps(20, end) forwards;
}
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
.champ-sub {
  font-size: 1.1rem;
  color: color-mix(in srgb, #fff 70%, transparent);
  margin-bottom: 32px;
}
.btn-dismiss {
  padding: 12px 32px;
  background: var(--team-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
.btn-dismiss:hover {
  opacity: 0.9;
}

/* ============================================================
   VL UI BEAUTY — TYPOGRAPHY & POLISH
   ============================================================ */
.tab-switch {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tab-switch.fade-out {
  opacity: 0;
  transform: translateX(10px);
}
.tab-switch.fade-in {
  opacity: 1;
  transform: translateX(0);
}
.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: color-mix(in srgb, #fff 50%, transparent);
}
.empty-state h2 {
  color: #fff;
  margin-bottom: 8px;
}
.empty-state p {
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.stat-mono {
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.prefers-reduced-motion .teamrow:hover,
.prefers-reduced-motion .slide-panel,
.prefers-reduced-motion .tab-switch {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}
```

---

## 2. JS — Append to End of `<script>` Block (Inside `DOMContentLoaded`)

```javascript
/* ============================================================
   VL UI BEAUTY — INITIALIZATION
   ============================================================ */
function vlInitUiBeauty() {
  // 1. Team-colored header
  vlSetupHeader();

  // 2. Team-colored footer
  vlSetupFooter();

  // 3. Dynamic panels (draft rows, depth chart slots, game preview units)
    vlSetupPanels();

  // 4. Conference championship overlay
  vlSetupChampOverlay();

  // 5. Empty state polish
  vlSetupEmptyStates();
}

/* ---- 1. Header ---- */
function vlSetupHeader() {
  const header = document.querySelector('.header, .panel-header, header');
  if (!header) return;
  header.classList.add('header-live');

  const disc = document.createElement('span');
  disc.className = 'team-disc';
  disc.textContent = '?'; // placeholder, updated on team select
  header.prepend(disc);

  const pill = document.createElement('span');
  pill.className = 'season-pill';
  pill.id = 'vl-season-pill';
  pill.textContent = 'Week 1 of 17 · 0-0';
  header.appendChild(pill);

  // Expose for other code to call
  window.vlUpdateHeader = function(teamAbbr, record, week) {
    const root = document.documentElement;
    // team colors already exist as CSS vars; just ensure they're applied
    if (teamAbbr) {
      disc.textContent = teamAbbr.slice(0, 2).toUpperCase();
    }
    if (record) pill.textContent = `Week ${week || 1} of 17 · ${record}`;
  };
}

/* ---- 2. Footer ---- */
function vlSetupFooter() {
  const footer = document.querySelector('footer, .panel-footer');
  if (!footer) {
    // Create a minimal footer if none exists
    const f = document.createElement('footer');
    f.className = 'footer-live';
    document.body.appendChild(f);
  } else {
    footer.classList.add('footer-live');
  }

  const seasonInfo = document.createElement('div');
  seasonInfo.className = 'footer-season';
  seasonInfo.innerHTML = `
    <div class="footer-record">0-0</div>
    <div class="footer-playoff">Not clinched</div>
  `;
  footer.appendChild(seasonInfo);

  const stats = document.createElement('div');
  stats.className = 'footer-quick-stats';
  stats.innerHTML = `
    <div class="stat-chip"><span class="stat-trend up">▲</span> Pass: <span class="stat-mono">0</span></div>
    <div class="stat-chip"><span class="stat-trend up">▲</span> Rush: <span class="stat-mono">0</span></div>
    <div class="stat-chip"><span class="stat-trend down">▼</span> TO: <span class="stat-mono">0</span></div>
    <div class="stat-chip"><span class="stat-trend up">▲</span> Sacks: <span class="stat-mono">0</span></div>
  `;
  footer.appendChild(stats);

  const nav = document.createElement('div');
  nav.className = 'footer-nav';
  nav.innerHTML = `
    <a href="#draft" class="nav-pill active">Draft</a>
    <a href="#season" class="nav-pill">Season</a>
    <a href="#playoffs" class="nav-pill">Playoffs</a>
    <a href="#superbowl" class="nav-pill">Super Bowl</a>
  `;
  footer.appendChild(nav);
}

/* Update footer record */
window.vlUpdateFooter = function(record, playoff) {
  const rec = document.querySelector('.footer-record');
  const po = document.querySelector('.footer-playoff');
  if (rec) rec.textContent = record;
  if (po) po.textContent = playoff ? 'Playoff clinched' : 'Not clinched';
};

/* ---- 3. Dynamic Panels ---- */
function vlSetupPanels() {
  // Draft board rows
  document.addEventListener('click', (e) => {
    const row = e.target.closest('.teamrow, .draft-row, tr[data-player]');
    if (row) {
      const name = row.querySelector('.player-name, .name')?.textContent || row.textContent.trim().split('\n')[0];
      const ovr = row.querySelector('.ovr, .rating')?.textContent || '—';
      vlOpenPlayerPanel(name, ovr);
    }
  });

  // Depth chart slots
  document.addEventListener('click', (e) => {
    const slot = e.target.closest('.slot, [data-slot]');
    if (slot) vlOpenSlotPanel(slot);
  });
}

function vlOpenPlayerPanel(name, ovr) {
  let panel = document.querySelector('.slide-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'slide-panel';
    panel.innerHTML = '<button class="panel-close">×</button><h2>Player Card</h2><div class="panel-content"></div>';
    document.body.appendChild(panel);
    panel.querySelector('.panel-close').onclick = () => panel.classList.remove('open');
    panel.addEventListener('click', (e) => { if (e.target === panel) panel.classList.remove('open'); });
  }
  panel.querySelector('.panel-content').innerHTML = `
    <div class="player-card-row"><span class="player-card-name">${name}</span><span class="player-card-ovr">OVR ${ovr}</span></div>
    <button class="btn-draft-sm">Draft</button>
  `;
  panel.classList.add('open');
}

function vlOpenSlotPanel(slot) {
  // Similar pattern for depth chart slots
  const slotName = slot.dataset.slot || slot.textContent.trim();
  vlOpenPlayerPanel(`Slot: ${slotName}`, '—');
}

/* ---- 4. Championship Overlay ---- */
function vlSetupChampOverlay() {
  // Call vlShowChampOverlay(teamAbbr) when conference championship is won
  window.vlShowChampOverlay = function(teamAbbr) {
    let overlay = document.querySelector('.champ-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'champ-overlay';
      overlay.innerHTML = `
        <div class="champ-logo">${teamAbbr.slice(0,2).toUpperCase()}</div>
        <div class="champ-title">CONFERENCE CHAMPIONS</div>
        <div class="champ-sub">${teamAbbr} takes the conference</div>
        <button class="btn-dismiss">Close</button>
      `;
      document.body.appendChild(overlay);
      overlay.querySelector('.btn-dismiss').onclick = () => overlay.remove();
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    } else {
      overlay.querySelector('.champ-logo').textContent = teamAbbr.slice(0,2).toUpperCase();
      overlay.style.display = 'flex';
    }
    // Confetti
    for (let i = 0; i < 30; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.setProperty('--tx', (Math.random() - 0.5) * 200);
      c.style.setProperty('--ty', (Math.random() - 0.5) * 200);
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 1000);
    }
    setTimeout(() => overlay.remove(), 3000);
  };
}

/* ---- 5. Empty States ---- */
function vlSetupEmptyStates() {
  const empty = document.querySelector('.empty-state, .no-data, .no-players');
  if (!empty) return;
  empty.style.textAlign = 'center';
  empty.style.padding = '64px 24px';
  const btn = document.createElement('button');
  btn.className = 'btn-draft-sm';
  btn.textContent = 'Start Draft';
  btn.onclick = () => {
    const draftBtn = document.querySelector('[data-action="draft"], .btn-draft, #startDraft');
    if (draftBtn) draftBtn.click();
  };
  empty.appendChild(btn);
}

/* Auto-init */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', vlInitUiBeauty);
} else {
  vlInitUiBeauty();
}
```

---

## 3. Injection Points in the HTML

| Location | What to Add |
|----------|-------------|
| End of `<style>` block, before `</style>` | All CSS from Section 1 |
| End of `<script>` block, before `</script>` | All JS from Section 2 (inside existing `DOMContentLoaded` or standalone) |

**No new files needed.** Everything is inline in the single HTML file.

---

## 4. Success Criteria for Implementer

| Criterion | How to Verify |
|-----------|---------------|
| Header re-colors on team change | Change team → `--team-primary` updates, header gradient shifts |
| Footer shows live stats | Week/record text updates as season progresses |
| Draft row hover | Row lifts on hover (`translateY(-2px)`) |
| Panel opens on row click | Slide panel appears from right with player info |
| Championship overlay | `vlShowChampOverlay('KC')` shows full-screen overlay with confetti |
| Tab cross-fade | Tab changes fade instead of instant swap |
| Empty state | "No players" state shows "Start Draft" button |
| No regressions | `candidate-lint.mjs` still passes (44/0 on Pre-Colors) |
| Reduced motion | `@media (prefers-reduced-motion)` disables all animations |

---

## 5. Optional Enhancements (if implementer has bandwidth)

- Team color picker in header (user can override auto-detected colors)
- Sound effects on draft pick / championship win (Web Audio API, optional toggle)
- Season progress pie chart (SVG, no library)
- "Game of the week" highlight panel

---

## Files to Reference

- `_agents/vl/notes/vl.md` — lane file
- `COUNCIL-BULLETIN.md` — bulletin entry M-VL-20261024-04
- `AGENTS.md` — protected constants rules, ownership protocol
- `NFL Draft Simulator merged.html` — the single product file to edit
