# Plug-and-Play Snippets — V22 / V23 (Beam, advisory)

Copy-pasteable blocks for the Architect. No protected constants touched. All CSS/JS only; no CDN, no build step. Anchors are Pre-Colors line numbers (re-anchor before applying).

---

## 1. Team colour CSS variables + setter

CSS (drop into `:root`):
```css
:root {
  --team-primary: #4f8cff;
  --team-secondary: #8b92a8;
  --team-accent: #ffd700;
  --opp-primary: #8b92a8;
  --opp-secondary: #4f8cff;
}
.team-primary-bg { background: var(--team-primary); }
.team-primary-border { border-color: var(--team-primary); }
.opp-primary-border { border-color: var(--opp-primary); }
```

JS:
```js
const TEAM_COLORS = {
  "Kansas City Chiefs": { primary: "#E31837", secondary: "#FFB612", accent: "#FFFFFF" },
  "Seattle Seahawks": { primary: "#002244", secondary: "#69BE28", accent: "#A5ACAF" }
};
function setTeamColors(name) {
  const p = TEAM_COLORS[name] || { primary: "#4f8cff", secondary: "#8b92a8", accent: "#ffd700" };
  const r = document.documentElement.style;
  r.setProperty("--team-primary", p.primary);
  r.setProperty("--team-secondary", p.secondary);
  r.setProperty("--team-accent", p.accent);
}
function setOppColors(name) {
  const p = TEAM_COLORS[name] || { primary: "#8b92a8", secondary: "#4f8cff" };
  const r = document.documentElement.style;
  r.setProperty("--opp-primary", p.primary);
  r.setProperty("--opp-secondary", p.secondary);
}
```

---

## 2. Global toast system

HTML:
```html
<div id="toastHost" aria-live="polite" style="position:fixed;bottom:12px;left:50%;transform:translateX(-50%);z-index:9999;pointer-events:none;"></div>
```

CSS:
```css
.toast {
  background: rgba(15,19,32,0.92);
  color: #e6e9f2;
  padding: 8px 14px;
  border-radius: 8px;
  margin-top: 6px;
  font-size: 0.85rem;
  border: 1px solid var(--team-primary, #4f8cff);
  animation: toastIn 180ms ease-out;
  pointer-events: auto;
}
@keyframes toastIn { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }
@media (prefers-reduced-motion: reduce) { .toast { animation: none; } }
```

JS:
```js
const toastQueue = [];
let toastBusy = false;
function showToast(msg, ms = 2500) {
  toastQueue.push({ msg, ms });
  if (!toastBusy) drainToast();
}
function drainToast() {
  if (!toastQueue.length) { toastBusy = false; return; }
  toastBusy = true;
  const { msg, ms } = toastQueue.shift();
  const host = document.getElementById("toastHost");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => { el.remove(); drainToast(); }, ms);
}
```

---

## 3. Skeleton loading rows

CSS:
```css
.skel {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #1a1f2e 25%, #2a3148 50%, #1a1f2e 75%);
  background-size: 200% 100%;
  animation: skel 1.2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) { .skel { animation: none; } }
@keyframes skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

Usage:
```js
function skeletonRows(n) {
  return Array.from({ length: n }, () => `<div class="skel" style="width:${60 + Math.random()*30}%;margin:6px 0;"></div>`).join("");
}
```

---

## 4. Reduced-motion guard

CSS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Number counter animation

JS:
```js
function animateCounter(el, from, to, ms = 300) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / ms, 1);
    const v = from + (to - from) * t;
    el.textContent = v.toFixed(2);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

---

## 6. Position-group colour map

CSS:
```css
.pos-qb { border-left: 3px solid #4f8cff; }
.pos-rb { border-left: 3px solid #22c55e; }
.pos-wr { border-left: 3px solid #f97316; }
.pos-te { border-left: 3px solid #a855f7; }
.pos-ol { border-left: 3px solid #6b7280; }
.pos-dl { border-left: 3px solid #ef4444; }
.pos-lb { border-left: 3px solid #14b8a6; }
.pos-cb, .pos-s { border-left: 3px solid #eab308; }
.pos-k, .pos-p { border-left: 3px solid #92400e; }
```

JS (map position code → class):
```js
const POS_GROUP = { QB:"qb", RB:"rb", WR:"wr", TE:"te", OT:"ol", OG:"ol", C:"ol", DE:"dl", DT:"dl", OLB:"lb", ILB:"lb", MLB:"lb", CB:"cb", FS:"s", SS:"s", K:"k", P:"p" };
function posClass(code) { return "pos-" + (POS_GROUP[code] || "ol"); }
```

---

## 7. Dimmed "gone" player

CSS:
```css
.player-gone { opacity: 0.4; text-decoration: line-through; }
```

---

## 8. Glass-morphism modal

CSS:
```css
.modal {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(15, 19, 32, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
}
```

---

## 9. Thin accent scrollbar

CSS:
```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb { background: var(--team-primary, #4f8cff); border-radius: 3px; }
::-webkit-scrollbar-track { background: transparent; }
```

---

## 10. Zebra stripes

CSS:
```css
tr:nth-child(even) { background: rgba(255,255,255,0.02); }
```

---

## 11. Confetti (championship)

CSS:
```css
@keyframes confettiFall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
.confetti-particle { position: fixed; width: 8px; height: 8px; background: var(--team-primary); animation: confettiFall 1s ease-out forwards; }
@media (prefers-reduced-motion: reduce) { .confetti-particle { display: none; } }
```

JS:
```js
function fireConfetti(n = 12) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("div");
    el.className = "confetti-particle";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-10px";
    el.style.background = i % 2 ? "var(--team-accent, #ffd700)" : "var(--team-primary, #4f8cff)";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}
```

---

## 12. Shimmer on gold

CSS:
```css
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.gold-shimmer {
  background: linear-gradient(90deg, #ffd700 0%, #fff 50%, #ffd700 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (prefers-reduced-motion: reduce) { .gold-shimmer { animation: none; } }
```

---

## 13. Undo toast helper

JS:
```js
function undoToast(playerName) {
  showToast("Pick undone — " + playerName);
}
```

---

## 14. Starter-count badge

JS (computed, display-only):
```js
function startersFilled(roster) {
  return Object.values(roster).filter(Boolean).length;
}
function updateStarterBadge(roster, total) {
  const el = document.getElementById("starterBadge");
  if (el) el.textContent = startersFilled(roster) + " of " + total + " starters";
}
```

---

## 15. Mobile primary action bar

CSS:
```css
.action-bar {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(15,19,32,0.95);
  backdrop-filter: blur(6px);
}
.action-bar .primary { flex: 1; }
@media (min-width: 481px) { .action-bar { position: static; } }
```

---

Notes: All snippets are advisory; the Architect decides integration. None touches protected constants or the product file. Re-anchor line numbers against Pre-Colors before applying.

---

## Review of OR and VL contributions (Beam, 24 Oct)

**OR (`_agents/or/V22-Aesthetic-proposals-20261024.md`)** — 5 proposals: expanded 15-color semantic palette with WCAG contrasts + light-mode toggle; typography scale (h1–h4, body-md, caption-sm); unified interactive states with transition tokens; centralized gradient variables; card hover elevation. All SAFE ALONE, CSS-only or CSS+var. Reconciles with Beam's team-colour approach: OR's `--accent/--accent2` become the *default* palette; team colours (`--team-primary`) override `--accent` when a team is selected. Recommendation: adopt OR's variable set as the base, then layer team colours on top.

**VL (`_agents/vl/deliveries/aesthetic-prototype.html`)** — plug-in prototype: P7-1 team theming, P7-2 hover-lift, P7-3 user-pick glow + gone dimming + zebra, P7-4 dark polish, P7-5 pick feedback (flash/badge pop/confetti/counter), P7-6 mobile sticky filter + bottom sheet, P7-8 champions shimmer banner. Good overlap with Beam snippets; VL adds the bottom-sheet and filter-chip patterns which Beam lacked.

**Improvements / merges:**
- OR's `--transition-fast/--transition-normal` tokens should replace Beam's ad-hoc `180ms`/`300ms` literals.
- VL's `--team-primary-rgb` (needed for `rgba(var(--team-primary-rgb),0.10)`) should be set alongside `--team-primary` in `setTeamColors()`; add `rgb` to `TEAM_COLORS`.
- VL's bottom sheet is a better mobile pattern than Beam's modal for player details (touch-friendly, swipe-to-dismiss candidate).
- Conflict: OR sets `--panel2:#1b2230`, VL sets `#1e2433`, Beam's demo uses `#1a1f2e`. Recommend VL's `#1e2433` (softer, matches P7-4 request). Single source of truth: pick one and document.

---

## 16. Merged team-colour setter (includes RGB for rgba usage)

JS:
```js
const TEAM_COLORS = {
  "Kansas City Chiefs": { primary: "#E31837", secondary: "#FFB612", accent: "#FFFFFF", rgb: "227,24,55" },
  "Seattle Seahawks": { primary: "#002244", secondary: "#69BE28", accent: "#A5ACAF", rgb: "0,34,68" },
  "Dallas Cowboys": { primary: "#003594", secondary: "#869397", accent: "#FFFFFF", rgb: "0,53,148" }
};
function setTeamColors(name) {
  const p = TEAM_COLORS[name] || { primary: "#4f8cff", secondary: "#8b92a8", accent: "#ffd700", rgb: "79,140,255" };
  const r = document.documentElement.style;
  r.setProperty("--team-primary", p.primary);
  r.setProperty("--team-secondary", p.secondary);
  r.setProperty("--team-accent", p.accent);
  r.setProperty("--team-primary-rgb", p.rgb);
}
```

---

## 17. Bottom sheet (mobile player details) — from VL, improved

CSS:
```css
.bottom-sheet { position: fixed; inset: auto 0 0 0; z-index: 80; background: var(--panel2,#1e2433); border-top: 1px solid var(--border,#2a3142); border-top-left-radius: 16px; border-top-right-radius: 16px; transform: translateY(100%); transition: transform var(--transition-normal,250ms) ease; max-height: 60vh; overflow: auto; padding: 12px 16px; }
.bottom-sheet.open { transform: translateY(0); }
.sheet-handle { width: 32px; height: 4px; background: #374151; border-radius: 2px; margin: 0 auto 8px; }
@media (prefers-reduced-motion: reduce) { .bottom-sheet { transition: none; } }
```

JS:
```js
function openSheet() { document.getElementById("sheet").classList.add("open"); }
function closeSheet() { document.getElementById("sheet").classList.remove("open"); }
```

---

## 18. OR's semantic colour system + typography scale (plug-in)

CSS (drop into `:root`; overrides defaults, team colours layer on top):
```css
:root {
  --bg: #0b0e14; --panel: #141922; --panel2: #1e2433; --alt: #222936;
  --text: #e8ecf3; --sub: #9fb0c0; --muted: #6a7a8a;
  --accent: #4f8cff; --accent-hover: #6bb0ff;
  --accent2: #ff6b4a; --accent2-hover: #ff8762;
  --border: #2a3142; --border-hover: #404a5e;
  --good: #3ecf8e; --good-bg: rgba(62,207,142,.12);
  --bad: #ff6b6b; --bad-bg: rgba(255,107,107,.12);
  --warn: #ffb347; --warn-bg: rgba(255,179,71,.12);
  --gold: #ffd75e; --gold-bg: rgba(255,215,94,.12);
  --radius: 12px; --radius-sm: 8px; --radius-full: 9999px;
  --shadow: 0 4px 16px rgba(0,0,0,.35); --shadow-lg: 0 8px 32px rgba(0,0,0,.45);
  --transition-fast: 150ms ease; --transition-normal: 250ms ease;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --bg: #f4f6fa; --panel: #ffffff; --panel2: #eef1f6; --alt: #e3e8ef;
    --text: #161b22; --sub: #5a6472; --muted: #7a8595;
    --border: #dde2ea; --border-hover: #b8c1d1;
    --good-bg: rgba(62,207,142,.08); --bad-bg: rgba(255,107,107,.08);
    --warn-bg: rgba(255,179,71,.10); --gold-bg: rgba(255,215,94,.10);
  }
}
h1 { font-size: 1.4rem; margin: 0 0 4px; font-weight: 700; line-height: 1.2; }
h2 { font-size: 1.15rem; margin: 0 0 6px; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1rem; margin: 0 0 4px; font-weight: 600; line-height: 1.3; }
h4 { font-size: 0.8rem; margin: 14px 0 6px; text-transform: uppercase; letter-spacing: .04em; color: var(--sub); font-weight: 600; }
.body-md { font-size: 0.85rem; line-height: 1.5; }
.caption-sm { font-size: 0.68rem; line-height: 1.4; color: var(--sub); text-transform: uppercase; letter-spacing: .04em; }
```

---

## 19. Unified interactive states (from OR, improved)

CSS:
```css
button, .tabbtn, .posbtn, .resetbtn, .closebtn, .qgbtn, .slider-tog, .rank {
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
}
.tabbtn:hover { background: var(--panel2); }
.tabbtn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.posbtn:hover { border-color: var(--accent); }
.resetbtn:hover { background: var(--accent-hover); }
.rank:hover { filter: brightness(1.1); }
.panel:hover, .matchup-card:hover, .synergy-box:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
.panel:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## 20. Centralized gradients (from OR, improved)

CSS:
```css
:root {
  --gradient-accent: linear-gradient(90deg, var(--accent), var(--accent2));
  --gradient-accent-alt: linear-gradient(100deg, var(--gold), #fff6c4 30%, var(--accent2) 50%, #fff6c4 70%, var(--gold));
  --gradient-sf: linear-gradient(90deg, rgba(255,196,60,.22), rgba(255,196,60,.04));
}
.bar-fill { background: var(--gradient-accent); height: 100%; }
.metricrow .mbar-fill { height: 100%; background: var(--gradient-accent); }
.sfrow.sf90 { background: var(--gradient-sf); border-left: 3px solid var(--gold); }
```


---

## 21. VL graphics-round design tokens (P8 shared + screens) — plug-in

Source: `_agents/vl/deliveries/design-tokens.css` (VL, 24 Oct). Merged here with Beam's improvements (unified motion tokens, OVR tiers, team palette map).

CSS (append to product `<style>`; product file untouched):
```css
:root {
  --motion-fast: 150ms ease;
  --motion-normal: 250ms ease;
  --motion-slow: 400ms ease;
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --panel2: #1e2433;
  --text-secondary: #9aa0b8;
  --border: #273044;
  --accent: #3b82f6;
  --accent2: #8b5cf6;
  --gold: #fbbf24;
  --silver: #94a3b8;
  --bronze: #d97706;
  --ovr-gold: #fbbf24;
  --ovr-silver: #94a3b8;
  --ovr-bronze: #d97706;
}
.ovr-tier-gold { color: var(--ovr-gold); }
.ovr-tier-silver { color: var(--ovr-silver); }
.ovr-tier-bronze { color: var(--ovr-bronze); }
```

Stat card (P8 shared):
```css
.stat-card { display: flex; align-items: center; gap: 12px; background: var(--panel,#141a26); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; }
.stat-card .ovr { font-size: 1.35rem; font-weight: 800; width: 44px; text-align: center; }
.stat-card .bar { flex: 1; height: 8px; background: #1f2937; border-radius: 4px; overflow: hidden; }
.stat-card .bar-fill { height: 100%; border-radius: 4px; transition: width var(--motion-normal); }
.stat-card .label { font-size: 0.75rem; color: var(--text-secondary,#9aa0b8); }
```

Bar row (P8 shared):
```css
.bar-row { display: flex; flex-direction: column; gap: 6px; }
.bar-row .row { display: flex; align-items: center; gap: 10px; }
.bar-row .name { width: 120px; font-size: 0.8rem; color: var(--text-secondary,#9aa0b8); }
.bar-row .track { flex: 1; height: 10px; background: #1f2937; border-radius: 5px; overflow: hidden; }
.bar-row .fill { height: 100%; border-radius: 5px; transition: width var(--motion-normal); }
.bar-row .val { width: 44px; font-size: 0.8rem; font-weight: 700; text-align: right; color: var(--text,#e8ecf3); }
```

Two-column pair (P8 shared):
```css
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.unit-card { background: var(--panel,#141a26); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
.unit-card .meter { height: 10px; background: #1f2937; border-radius: 5px; margin-top: 6px; overflow: hidden; }
.unit-card .meter-fill { height: 100%; border-radius: 5px; transition: width var(--motion-normal); }
```

Gold banner (P8 shared / P7-8):
```css
.gold-banner { position: relative; overflow: hidden; border-radius: 10px; background: linear-gradient(90deg,#78350f,#b45309,#78350f); color: #fff; padding: 12px 16px; font-weight: 700; letter-spacing: 0.04em; animation: shimmer 2.5s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
```

Quarter bars (P8-g.3):
```css
.qtr-bars { display: flex; gap: 8px; }
.qtr-bar { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.qtr-bar .track { width: 100%; height: 10px; background: #1f2937; border-radius: 5px; overflow: hidden; }
.qtr-bar .fill { height: 100%; border-radius: 5px; transition: width var(--motion-normal); }
.qtr-bar .label { font-size: 0.7rem; color: var(--text-secondary,#9aa0b8); }
```

Turnover icon grid (P8-g.3):
```css
.turnover-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 8px; }
.to-icon { aspect-ratio: 1; border-radius: 8px; border: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.5rem; gap: 4px; background: var(--panel,#141a26); }
.to-icon .glyph { font-size: 1.4rem; }
.to-icon .tag { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
```

Star card (P8-g.3/g.4/g.7):
```css
.star-card { background: var(--panel,#141a26); border: 1px solid var(--border); border-radius: 12px; padding: 14px; text-align: center; }
.star-card .portrait { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 8px; border: 2px solid var(--border); object-fit: cover; background: #1f2937; }
.star-card .name { font-weight: 700; margin-bottom: 4px; }
.star-card .stat { font-size: 0.75rem; color: var(--text-secondary,#9aa0b8); }
.star-card .grade { margin-top: 6px; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 10px; }
```

Game ball showpiece (P8-g.7):
```css
.game-ball { display: inline-flex; align-items: center; gap: 10px; border: 3px solid var(--gold); border-radius: 12px; background: #78350f; color: #fff; padding: 10px 14px; font-weight: 800; animation: pulseGlow 2.5s ease-in-out infinite; }
@keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.4); } 50% { box-shadow: 0 0 0 10px rgba(251,191,36,0.25); } }
```

Record banner (P8-g.4):
```css
.record-banner { display: flex; gap: 18px; align-items: baseline; background: var(--panel,#141a26); border: 1px solid var(--border); border-radius: 12px; padding: 18px 22px; }
.record-digit { font-size: 3rem; font-weight: 900; line-height: 1; }
.record-digit.win { color: var(--ovr-gold); }
.record-digit.loss { color: var(--text-secondary,#9aa0b8); }
.record-diff { font-size: 0.85rem; color: var(--text-secondary,#9aa0b8); }
```

Sparkline (P8-g.4):
```css
.sparkline { height: 60px; display: flex; align-items: flex-end; gap: 3px; padding: 4px 0; }
.spark-bar { flex: 1; min-height: 2px; border-radius: 2px 2px 0 0; transition: height var(--motion-normal); }
.spark-bar.pos { background: #22c55e; }
.spark-bar.neg { background: #ef4444; }
```

Awards carousel card (P8-g.4/g.6/g.7):
```css
.award-card { background: var(--panel,#141a26); border: 1px solid var(--border); border-radius: 12px; padding: 14px; text-align: center; }
.award-badge { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; margin: 0 auto 8px; font-weight: 800; font-size: 1.1rem; color: #fff; }
.award-badge.gold { background: var(--ovr-gold); color: #0b0e14; }
.award-badge.silver { background: var(--ovr-silver); }
.award-badge.bronze { background: var(--ovr-bronze); }
```

Team tags (P8-g.1):
```css
.team-tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; border: 1px solid var(--border); background: var(--panel,#141a26); color: var(--text,#e8ecf3); }
.team-tag .dot { width: 10px; height: 10px; border-radius: 50%; }
```

Matchup advantage meter (P8-g.1):
```css
.matchup-meter { height: 10px; background: #1f2937; border-radius: 5px; overflow: hidden; margin-top: 6px; position: relative; }
.matchup-meter .fill { height: 100%; border-radius: 5px; transition: width var(--motion-normal); }
```

Reconciliation notes (Beam):
- Motion tokens: VL uses `--motion-fast/normal/slow`; OR uses `--duration-fast/normal/slow` + `--ease-*`; Beam used `--transition-fast/normal`. Recommend unifying on `--duration-*` + `--ease-*` (OR's richer set) and aliasing `--motion-*` → `--duration-*` for VL compat. Avoid three parallel token families.
- Panel colour: VL `#1e2433` matches P7-4 request; adopt as `--panel2` (OR also uses `#1e2433`). Single source of truth.
- Team palette: VL uses `.team-palette.<abbr>` classes; Beam uses `setTeamColors()` JS. Recommend JS setter (covers all 32 teams without 32 CSS rules) + keep VL's palette map as the data source for `TEAM_COLORS`.
- OR's A-1..A-11 patches are the granular utility layer (shadows, animation tokens, spacing, text, layout, badges, progress, separators, forms, tooltips, focus). Recommend adopting OR's patches as the base utility layer, with Beam's snippets + VL's tokens as the higher-level components on top. No conflicts — different CSS regions.
- OVR tier colours (gold/silver/bronze) are new and valuable for P8 stat cards / stars; adopt as-is.

---

## 22. OR patch A-1..A-11 summary (review, advisory)

OR's `_agents/or/V22-Aesthetic-Patches-20261024.md` provides 11 pluggable CSS patches (shadow system, animation tokens, spacing utilities, text utilities, layout utilities, badge system, progress/loading, separators, form fields, tooltips, focus-visible). All SAFE ALONE, CSS-only, no JS, no protected constants. Recommendation: adopt as the base utility layer; Beam's snippets and VL's tokens layer on top. Patch A-1 (shadows) overlaps Beam snippet #? (none) — new. Patch A-2 (animation tokens) overlaps VL/OR motion tokens — reconcile per note above. Patches A-3/A-4/A-5 (spacing/text/layout utilities) are new and high-value for the beauty pass. Patch A-11 (focus-visible) supersedes Beam's P7-17 focus rings in CSS terms.


---

## 23. Creative interaction snippets (P7-31..P7-42)

### 23.1 Synthesized sound (Web Audio, no assets) — P7-31
JS:
```js
let audioCtx = null;
function getAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
function tone(freq, dur, type = "sine", gain = 0.15) {
  if (localStorage.getItem("sound") !== "on") return;
  const ctx = getAudio();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g).connect(ctx.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.stop(ctx.currentTime + dur);
}
function soundPick() { tone(523, 0.08); setTimeout(() => tone(659, 0.12), 90); }
function soundTD() { tone(392, 0.15, "triangle"); }
function soundChamp() { [523,659,784,1047].forEach((f,i) => setTimeout(() => tone(f, 0.18, "sawtooth", 0.12), i*110)); }
function soundToggle() { localStorage.setItem("sound", localStorage.getItem("sound") === "on" ? "off" : "on"); }
```

### 23.2 Keyboard shortcuts — P7-32
JS:
```js
document.addEventListener("keydown", (e) => {
  if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
  if (e.key === "j" || e.key === "ArrowDown") { moveFocus(1); e.preventDefault(); }
  else if (e.key === "k" || e.key === "ArrowUp") { moveFocus(-1); e.preventDefault(); }
  else if (e.key === "Enter") { draftFocused(); }
  else if (e.key === "u") { undoPick(); }
  else if (e.key === "/") { document.getElementById("searchBox")?.focus(); e.preventDefault(); }
  else if (e.key === "?") { toggleShortcutHelp(); }
  else if (e.key === "Escape") { closeAllDrawers(); }
});
```

### 23.3 Haptic feedback — P7-34
JS:
```js
function haptic(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
// pick: haptic(10); TD: haptic(30); champ: haptic([50,30,50,30,100]);
```

### 23.4 Hover "what-if" preview — P7-33
JS:
```js
function showWhatIf(el, r) {
  const tip = document.createElement("div");
  tip.className = "whatif-tip";
  tip.textContent = "+" + (r.v || 0).toFixed(2) + " wins here" + (r.flex ? " (" + r.flex + " flex)" : "");
  el.appendChild(tip);
}
function hideWhatIf(el) { el.querySelector(".whatif-tip")?.remove(); }
```
CSS:
```css
.whatif-tip { position: absolute; top: -28px; left: 50%; transform: translateX(-50%); background: var(--panel,#141922); border: 1px solid var(--border,#2a3142); padding: 2px 8px; border-radius: 6px; font-size: 0.7rem; white-space: nowrap; z-index: 5; }
```

### 23.5 Season progress stepper — P7-36
HTML:
```html
<div class="stepper" id="seasonStepper"></div>
```
JS:
```js
function renderStepper(weeks, current) {
  const host = document.getElementById("seasonStepper");
  host.innerHTML = weeks.map((w, i) => {
    const cls = i < current ? (w.win ? "done win" : "done loss") : (i === current ? "current" : "future");
    return `<span class="step ${cls}" title="Week ${i+1}"></span>`;
  }).join("");
}
```
CSS:
```css
.stepper { display: flex; gap: 3px; }
.step { flex: 1; height: 6px; border-radius: 3px; background: #1f2937; transition: background var(--motion-normal,250ms); }
.step.done.win { background: #22c55e; }
.step.done.loss { background: #ef4444; }
.step.current { background: var(--gold,#fbbf24); animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
```

### 23.6 Dark/light theme toggle — P7-38
JS:
```js
function applyTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = saved ? saved === "dark" : prefersDark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  localStorage.setItem("theme", cur === "dark" ? "light" : "dark");
  applyTheme();
}
applyTheme();
```
CSS:
```css
body { transition: background 200ms ease, color 200ms ease; }
```

### 23.7 Player comparison modal — P7-39
JS:
```js
function comparePlayers(a, b) {
  const rows = [
    ["Ovr", a.ovr, b.ovr],
    ["Wins", a.wins, b.wins],
    ["Value", a.val, b.val],
  ];
  const html = rows.map(([label, va, vb]) => {
    const better = va > vb ? "a" : (vb > va ? "b" : "tie");
    return `<tr><td>${label}</td><td class="${better==="a"?"better":""}">${va}</td><td class="${better==="b"?"better":""}">${vb}</td></tr>`;
  }).join("");
  document.getElementById("compareBody").innerHTML = html;
  document.getElementById("compareModal").classList.add("open");
}
```
CSS:
```css
.compare-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: none; align-items: center; justify-content: center; z-index: 90; }
.compare-modal.open { display: flex; }
.compare-modal .panel { background: var(--panel,#141922); border: 1px solid var(--border,#2a3142); border-radius: 12px; padding: 16px; min-width: 280px; }
.compare-modal td.better { color: var(--gold,#fbbf24); font-weight: 700; }
```

### 23.8 Draft grade card — P7-40
JS:
```js
function draftGrade(roster, slotValues) {
  const filled = Object.values(roster).filter(Boolean).length;
  const total = Object.keys(roster).length;
  const coverage = filled / total;
  const valueSum = Object.entries(roster).reduce((s, [slot, p]) => s + (p ? (slotValues[slot] || 0) : 0), 0);
  const maxVal = Object.values(slotValues).reduce((a,b) => a+b, 0);
  const valueRatio = maxVal ? valueSum / maxVal : 0;
  const score = (coverage * 0.5 + valueRatio * 0.5) * 100;
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
  return { grade, score: score.toFixed(0), coverage: (coverage*100).toFixed(0), valueRatio: (valueRatio*100).toFixed(0) };
}
```

### 23.9 Aria-live draft announcements — P7-41
HTML:
```html
<div id="draftAnnounce" aria-live="polite" aria-atomic="true" style="position:absolute;left:-9999px;"></div>
```
JS:
```js
function announcePick(player, pos, ovr, idx, total) {
  const el = document.getElementById("draftAnnounce");
  if (el) el.textContent = `You drafted ${player}, ${pos}, ${ovr} overall. Pick ${idx} of ${total}.`;
}
```

### 23.10 Print-friendly recap — P7-42
CSS:
```css
@media print {
  body { background: #fff; color: #000; }
  .tabbar, .action-bar, button, .toast { display: none !important; }
  .recap { page-break-inside: avoid; }
  .quarter { page-break-after: always; }
}
```
JS:
```js
function printRecap() { window.print(); }
```

