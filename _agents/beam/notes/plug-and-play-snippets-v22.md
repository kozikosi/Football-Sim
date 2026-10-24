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


---

## 24. VL interactive prototype components (P0-18/19/29) — plug-in

Source: `_agents/vl/deliveries/interactive-prototype.html` (VL, 24 Oct). Merged here with Beam's reconciliation notes.

### 24.1 Champion banner (P0-19) — large, centered, 3s+, shimmer + sparkles
CSS:
```css
.champion-banner { position: relative; overflow: hidden; border-radius: 16px; background: linear-gradient(135deg,#78350f,#b45309,#78350f); color: #fff; text-align: center; padding: 34px 24px; margin: 24px auto; max-width: 720px; box-shadow: 0 20px 50px -8px rgba(180,83,9,0.45); animation: shimmer 3s ease-in-out infinite, popIn 0.5s var(--ease-bounce, cubic-bezier(0.34,1.56,0.64,1)) both; background-size: 200% auto; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
.champion-banner h2 { margin: 0 0 6px; font-size: 1.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
.champion-banner p { margin: 0; font-size: 1.05rem; opacity: 0.95; }
.sparkle { position: absolute; width: 6px; height: 6px; background: var(--gold,#fbbf24); border-radius: 50%; animation: sparkle 2s ease-in-out infinite; pointer-events: none; }
@keyframes sparkle { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
```

### 24.2 Playoff bracket (P0-19) — seeded teams, connectors, byes
CSS:
```css
.bracket { max-width: 900px; margin: 32px auto; padding: 0 16px; }
.round { display: flex; gap: 14px; margin-bottom: 26px; align-items: flex-start; }
.matchup { display: flex; flex-direction: column; gap: 8px; min-width: 150px; }
.team-seed { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid var(--border,#273044); border-radius: 8px; background: var(--panel,#141a26); cursor: pointer; transition: border-color var(--motion-fast,150ms), box-shadow var(--motion-fast,150ms); }
.team-seed.winner { border-color: var(--team-primary,#3b82f6); box-shadow: 0 0 0 3px rgba(var(--team-primary-rgb,59,130,246),0.25); background: rgba(var(--team-primary-rgb,59,130,246),0.12); }
.team-seed .seed { font-size: 0.7rem; font-weight: 800; color: var(--text-secondary,#9aa0b8); width: 16px; text-align: center; }
.team-seed .name { flex: 1; font-weight: 700; font-size: 0.85rem; }
.team-seed .tag { font-size: 0.62rem; padding: 1px 6px; border-radius: 10px; background: var(--border,#273044); color: var(--text-secondary,#9aa0b8); }
.connector { width: 14px; height: 2px; background: var(--border,#273044); align-self: center; margin: 6px 0; }
.connector.vertical { width: 2px; height: 46px; margin: 0 auto; }
```

### 24.3 Conference ranked bar charts (P0-19) — 1-16 ranked
CSS:
```css
.conf-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; max-width: 900px; margin: 32px auto; padding: 0 16px; }
.conf-card { background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 12px; padding: 16px; }
.conf-card h4 { margin: 0 0 12px; font-size: 0.9rem; color: var(--text-secondary,#9aa0b8); text-transform: uppercase; letter-spacing: 0.05em; }
.rank-list { display: flex; flex-direction: column; gap: 6px; }
.rank-row { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 8px; background: rgba(255,255,255,0.02); transition: background var(--motion-fast,150ms); cursor: pointer; }
.rank-row:hover { background: rgba(var(--team-primary-rgb,59,130,246),0.1); }
.rank-row .rank { width: 26px; font-size: 0.75rem; font-weight: 800; color: var(--text-secondary,#9aa0b8); }
.rank-row .team { flex: 1; font-weight: 700; font-size: 0.85rem; }
.rank-row .record { width: 44px; font-size: 0.75rem; color: var(--text-secondary,#9aa0b8); text-align: right; font-variant-numeric: tabular-nums; }
.rank-row .bar { flex: 1; height: 8px; background: #1f2937; border-radius: 4px; overflow: hidden; margin: 0 10px; }
.rank-row .fill { height: 100%; border-radius: 4px; transition: width var(--motion-normal,250ms); }
```

### 24.4 Game recap score boxes (P0-18) — team-colored
CSS:
```css
.score-row { display: flex; gap: 12px; margin-bottom: 14px; }
.score-box { flex: 1; border-radius: 12px; padding: 14px 16px; color: #fff; position: relative; overflow: hidden; }
.score-box.user { background: linear-gradient(135deg, var(--team-primary,#3b82f6), var(--team-secondary,#9aa0b8)); }
.score-box.opp { background: linear-gradient(135deg, var(--opp-primary,#ef4444), var(--opp-secondary,#f59e0b)); }
.score-box .tname { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.9; }
.score-box .score { font-size: 2.2rem; font-weight: 900; }
.score-box .detail { margin-top: 6px; font-size: 0.78rem; opacity: 0.9; }
```

### 24.5 Player browser cards (P0-8) — ~15/page, yours highlighted
CSS:
```css
.player-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.player-card { background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 10px; padding: 12px; cursor: pointer; transition: transform var(--motion-fast,150ms), box-shadow var(--motion-fast,150ms), border-color var(--motion-fast,150ms); }
.player-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
.player-card.yours { border-left: 4px solid var(--team-primary,#3b82f6); background: rgba(var(--team-primary-rgb,59,130,246),0.08); }
.player-card .ovr { float: right; font-weight: 800; font-size: 0.85rem; }
.player-card .ovr.gold { color: var(--gold,#fbbf24); }
.player-card .ovr.silver { color: #94a3b8; }
.player-card .ovr.bronze { color: #d97706; }
.player-card .name { font-weight: 700; margin-bottom: 2px; }
.player-card .meta { font-size: 0.75rem; color: var(--text-secondary,#9aa0b8); margin-bottom: 6px; }
.player-card .statbar { height: 6px; background: #1f2937; border-radius: 3px; overflow: hidden; margin-top: 4px; }
.player-card .stat-fill { height: 100%; border-radius: 3px; transition: width var(--motion-normal,250ms); }
```

### 24.6 Position rankings combo chips (P0-9)
CSS:
```css
.pos-combos { display: flex; flex-wrap: wrap; gap: 6px; }
.combo-chip { display: inline-block; padding: 6px 12px; border: 1px solid var(--border,#273044); background: var(--panel,#141a26); color: var(--text,#e8ecf3); border-radius: 20px; font-size: 0.8rem; cursor: pointer; transition: all var(--motion-fast,150ms); }
.combo-chip.active { background: var(--team-primary,#3b82f6); color: #fff; border-color: var(--team-primary,#3b82f6); box-shadow: 0 0 0 2px var(--team-primary,#3b82f6); }
```

### 24.7 Team comparison side-by-side (P0-10)
CSS:
```css
.compare-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 12px; padding: 18px; }
.compare-col { display: flex; flex-direction: column; gap: 10px; }
.compare-col.user { border-left: 4px solid var(--team-primary,#3b82f6); padding-left: 10px; }
.compare-col.opp { border-left: 4px solid var(--opp-primary,#ef4444); padding-left: 10px; }
.stat-line { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
```

### 24.8 Live "what-if" win projection (creative)
CSS:
```css
.whatif { background: var(--panel2,#1e2433); border: 1px solid var(--border,#273044); border-radius: 12px; padding: 18px; }
.slider-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.slider-row label { width: 150px; font-size: 0.8rem; color: var(--text-secondary,#9aa0b8); }
input[type=range] { flex: 1; accent-color: var(--team-primary,#3b82f6); }
.proj-meter { height: 10px; background: #1f2937; border-radius: 5px; overflow: hidden; margin-top: 10px; }
.proj-fill { height: 100%; border-radius: 5px; background: linear-gradient(90deg,#ef4444,#fbbf24,#22c55e); transition: width var(--motion-normal,250ms); }
```
JS:
```js
function updateProj() {
  const a = +document.getElementById("pr").value;
  const b = +document.getElementById("sc").value;
  document.getElementById("prv").textContent = a;
  document.getElementById("scv").textContent = b;
  const wins = (10 + (a-50)*0.07 + (b-50)*0.05).toFixed(1);
  document.getElementById("projw").textContent = wins;
  document.getElementById("projfill").style.width = Math.min(100, Math.max(0, 40 + a*0.4 + b*0.25)) + "%";
}
document.getElementById("pr").oninput = document.getElementById("sc").oninput = updateProj;
updateProj();
```

### 24.9 Interactive week timeline (creative) — click to expand
CSS:
```css
.week-item { background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; cursor: pointer; transition: all var(--motion-fast,150ms); }
.week-item:hover { background: rgba(var(--team-primary-rgb,59,130,246),0.1); border-color: var(--team-primary,#3b82f6); }
.week-item.expanded { background: rgba(var(--team-primary-rgb,59,130,246),0.15); border-color: var(--team-primary,#3b82f6); }
.week-item .head { display: flex; justify-content: space-between; align-items: center; font-weight: 700; }
.week-item .detail { display: none; margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary,#9aa0b8); border-top: 1px solid var(--border,#273044); padding-top: 8px; }
.week-item.expanded .detail { display: block; }
.week-item .chevron { font-size: 0.7rem; transition: transform var(--motion-fast,150ms); }
.week-item.expanded .chevron { transform: rotate(180deg); }
```
JS:
```js
function toggleWeek(el) { el.classList.toggle("expanded"); }
```

### 24.10 Animated game ball ceremony (creative)
CSS:
```css
.game-ball-ceremony { text-align: center; }
.football { width: 90px; height: 56px; background: #78350f; border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%; margin: 0 auto 10px; position: relative; box-shadow: 0 8px 24px rgba(0,0,0,0.4); animation: bounce 2.5s ease-in-out infinite; border: 3px solid var(--gold,#fbbf24); }
.football::after { content: ""; position: absolute; inset: 4px; background: #d97706; border-radius: 48% 48% 42% 42% / 55% 55% 45% 45%; }
@keyframes bounce { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(8deg); } }
.ball-label { font-weight: 700; margin-bottom: 4px; }
```

Reconciliation notes (Beam):
- VL's interactive prototype is the most complete single-file demo of P0-18/19/29 + creative extensions. Recommend Claude use it as the reference prototype, layering OR's utility patches (A-1..A-11) and Beam's snippets on top.
- VL uses `--team-primary-rgb` for rgba; keep Beam's `setTeamColors()` with rgb. Good.
- VL uses `--motion-fast/normal/slow` (150/300/500ms) vs OR's `--duration-*` (150/250/400). Recommend unifying on OR's `--duration-*` + `--ease-*` and aliasing `--motion-*` for compat.
- VL's creative what-if slider and week timeline are high-value and not in Beam's earlier snippets; now captured here (24.8, 24.9).
- VL's game ball ceremony (24.10) is more elaborate than Beam's confetti; both can coexist (ceremony for game ball, confetti for championship).


---

## 25. Creative interaction snippets (P7-43..P7-60)

### 25.1 Parallax tilt on champion banner — P7-43
JS:
```js
const banner = document.querySelector(".champion-banner");
if (banner && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(pointer: fine)").matches) {
  banner.addEventListener("mousemove", (e) => {
    const r = banner.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    banner.style.transform = `perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
  });
  banner.addEventListener("mouseleave", () => { banner.style.transform = ""; });
}
```

### 25.2 Count-up on scroll into view — P7-44
JS:
```js
function countUp(el, to, ms = 900) {
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const t = Math.min((now - start) / ms, 1);
    el.textContent = Math.round(from + (to - from) * t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = "1";
      countUp(e.target, +e.target.dataset.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll("[data-countup]").forEach((el) => io.observe(el));
```
HTML: `<span data-countup data-target="14">0</span>`

### 25.3 Momentum / hot-hand indicator — P7-45
CSS:
```css
.momentum { display: inline-flex; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; }
.momentum.hot { background: rgba(251,191,36,0.15); color: #fbbf24; }
.momentum.cold { background: rgba(96,165,250,0.15); color: #60a5fa; }
```
JS:
```js
function momentumBadge(streak) {
  if (streak >= 3) return `<span class="momentum hot">🔥 Hot (${streak})</span>`;
  if (streak <= -3) return `<span class="momentum cold">❄️ Cold (${Math.abs(streak)})</span>`;
  return "";
}
```

### 25.4 Loading progress bar (100-season) — P7-48
HTML:
```html
<div class="sim-progress"><div class="sim-fill" id="simFill"></div></div>
<div class="sim-label" id="simLabel">Simulating season 0 of 100</div>
```
CSS:
```css
.sim-progress { height: 8px; background: #1f2937; border-radius: 4px; overflow: hidden; }
.sim-fill { height: 100%; background: linear-gradient(90deg, var(--team-primary,#3b82f6), var(--gold,#fbbf24)); border-radius: 4px; transition: width 200ms ease; width: 0%; }
.sim-label { font-size: 0.8rem; color: var(--text-secondary,#9aa0b8); margin-top: 6px; }
@media (prefers-reduced-motion: reduce) { .sim-fill { transition: none; } }
```
JS:
```js
function setSimProgress(i, total) {
  document.getElementById("simFill").style.width = (i / total * 100) + "%";
  document.getElementById("simLabel").textContent = `Simulating season ${i} of ${total}`;
}
```

### 25.5 View Transitions API tab swaps — P7-49
JS:
```js
function switchTab(name) {
  const doSwap = () => { /* render tab content */ };
  if (document.startViewTransition) document.startViewTransition(doSwap);
  else doSwap();
}
```
CSS:
```css
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }
```

### 25.6 Weather tint — P7-50
CSS:
```css
.weather-rain { background: linear-gradient(180deg, rgba(96,165,250,0.12), transparent); }
.weather-snow { background: linear-gradient(180deg, rgba(255,255,255,0.10), transparent); }
.weather-sun { background: linear-gradient(180deg, rgba(251,191,36,0.12), transparent); }
```

### 25.7 Stadium gradient per team — P7-51
CSS:
```css
.stadium-header { background: linear-gradient(135deg, var(--team-primary,#3b82f6), var(--team-secondary,#9aa0b8)); position: relative; overflow: hidden; }
.stadium-header::after { content: ""; position: absolute; inset: 0; background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'><path d='M0 60 L20 40 L40 50 L60 35 L80 45 L100 30 L120 42 L140 38 L160 48 L180 36 L200 60 Z' fill='rgba(255,255,255,0.06)'/></svg>") bottom/cover no-repeat; pointer-events: none; }
```

### 25.8 Guided tour overlay — P7-52
JS:
```js
const TOUR_STEPS = [
  { sel: "#draftBoard", text: "This is your draft board — pick players to fill your roster." },
  { sel: "#weightsTable", text: "Adjust weights to value positions your way." },
  { sel: "#playSeasonBtn", text: "Play the season once your roster is set." },
  { sel: "#seasonReview", text: "Review results, awards, and the playoff bracket." },
];
function startTour() {
  if (localStorage.getItem("tourDone")) return;
  let i = 0;
  const overlay = document.getElementById("tourOverlay");
  function show() {
    if (i >= TOUR_STEPS.length) { overlay.remove(); localStorage.setItem("tourDone", "1"); return; }
    const step = TOUR_STEPS[i];
    const el = document.querySelector(step.sel);
    overlay.querySelector(".tour-text").textContent = step.text;
    // position spotlight...
    i++;
  }
  show();
}
```
CSS:
```css
.tour-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.tour-card { background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 12px; padding: 20px; max-width: 320px; text-align: center; }
```

### 25.9 Density toggle — P7-53
JS:
```js
function setDensity(mode) {
  document.body.classList.toggle("compact", mode === "compact");
  localStorage.setItem("density", mode);
}
```
CSS:
```css
body.compact { font-size: 0.9em; }
body.compact .card, body.compact .panel { padding: 8px 10px; }
body.compact .stat-card { padding: 6px 8px; }
```

### 25.10 Colorblind-friendly palette — P7-54
JS:
```js
function setColorblind(on) {
  document.body.classList.toggle("cb", on);
  localStorage.setItem("cb", on ? "1" : "0");
}
```
CSS:
```css
body.cb { --good: #0072B2; --bad: #E69F00; --warn: #56B4E9; }
```

### 25.11 High-contrast mode — P7-55
CSS:
```css
body.hc { --border: #fff; --sub: #fff; --muted: #ccc; --panel: #000; --panel2: #111; }
body.hc .card, body.hc .panel { border-width: 2px; }
```
JS:
```js
function setHC(on) { document.body.classList.toggle("hc", on); localStorage.setItem("hc", on ? "1" : "0"); }
```

### 25.12 Konami code easter egg — P7-56
JS:
```js
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let ki = 0;
document.addEventListener("keydown", (e) => {
  if (e.key === KONAMI[ki]) { ki++; if (ki === KONAMI.length) { document.body.classList.toggle("retro"); ki = 0; localStorage.setItem("retro", document.body.classList.contains("retro") ? "1" : "0"); } }
  else ki = 0;
});
if (localStorage.getItem("retro") === "1") document.body.classList.add("retro");
```
CSS:
```css
body.retro { font-family: "Courier New", monospace; }
body.retro .card, body.retro .panel { border: 3px solid var(--team-primary,#3b82f6); border-radius: 0; }
```

### 25.13 Highlight reel carousel — P7-57
JS:
```js
let hrIdx = 0;
function hrNext() {
  const items = document.querySelectorAll(".hr-item");
  items.forEach((el, i) => el.classList.toggle("active", i === hrIdx));
  hrIdx = (hrIdx + 1) % items.length;
}
setInterval(hrNext, 3500);
```
CSS:
```css
.hr-item { display: none; }
.hr-item.active { display: block; animation: fadeIn 300ms ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

### 25.14 "Your pick vs CPU best" — P7-58
JS:
```js
function showCpuBest(cpuPick) {
  const el = document.getElementById("cpuBest");
  if (el && cpuPick) el.textContent = `CPU would have taken ${cpuPick.name} (${cpuPick.ovr} OVR)`;
}
```

### 25.15 Achievement badge system — P7-60
JS:
```js
const ACHIEVEMENTS = [
  { id: "firstwin", label: "First Win", test: (s) => s.wins >= 1 },
  { id: "tenwin", label: "10-Win Season", test: (s) => s.wins >= 10 },
  { id: "playoff", label: "Playoff Clinch", test: (s) => s.playoffs },
  { id: "sb", label: "Super Bowl", test: (s) => s.champion },
  { id: "undefeated", label: "Undefeated", test: (s) => s.wins === 17 },
];
function unlockAchievements(state) {
  const unlocked = JSON.parse(localStorage.getItem("ach") || "[]");
  ACHIEVEMENTS.forEach((a) => {
    if (!unlocked.includes(a.id) && a.test(state)) {
      unlocked.push(a.id);
      showToast("🏆 Achievement unlocked: " + a.label);
    }
  });
  localStorage.setItem("ach", JSON.stringify(unlocked));
}
```


---

## 26. Achievement badge system (P7-60..P7-80) — plug-in

### 26.1 Rarity tiers + badge CSS
CSS:
```css
.ach-badge { display: inline-flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px; border-radius: 12px; background: var(--panel,#141a26); border: 1px solid var(--border,#273044); transition: transform var(--motion-fast,150ms), box-shadow var(--motion-fast,150ms); }
.ach-badge .icon { font-size: 1.8rem; line-height: 1; }
.ach-badge .label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary,#9aa0b8); }
.ach-badge.bronze { border-color: #d97706; }
.ach-badge.silver { border-color: #94a3b8; }
.ach-badge.gold { border-color: #fbbf24; box-shadow: 0 0 12px rgba(251,191,36,0.25); }
.ach-badge.platinum { border-color: #e5e7eb; background: linear-gradient(135deg, #1f2937, #374151); animation: platinumShimmer 3s ease-in-out infinite; }
@keyframes platinumShimmer { 0%,100% { box-shadow: 0 0 12px rgba(255,255,255,0.15); } 50% { box-shadow: 0 0 24px rgba(255,255,255,0.35); } }
.ach-badge.locked { opacity: 0.3; filter: grayscale(1); }
.ach-badge:hover { transform: translateY(-2px) scale(1.03); }
.ach-badge.unlock { animation: achUnlock 600ms var(--ease-bounce,cubic-bezier(0.34,1.56,0.64,1)) both; }
@keyframes achUnlock { 0% { transform: scale(0.3) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.15) rotate(5deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .ach-badge.unlock, .ach-badge.platinum { animation: none; } }
```

### 26.2 Achievement data + unlock logic
JS:
```js
const ACHIEVEMENTS = [
  { id: "firstwin", label: "First Win", icon: "🏈", rarity: "bronze", test: (s) => s.wins >= 1 },
  { id: "tenwin", label: "10-Win Season", icon: "🔟", rarity: "silver", test: (s) => s.wins >= 10 },
  { id: "shutout", label: "Shutout", icon: "🔒", rarity: "silver", test: (s) => s.shutout },
  { id: "blowout", label: "Blowout", icon: "⚡", rarity: "silver", test: (s) => s.blowout },
  { id: "perfect", label: "Perfect Game", icon: "💎", rarity: "gold", test: (s) => s.perfectGame },
  { id: "giantkiller", label: "Giant Killer", icon: "⚔️", rarity: "gold", test: (s) => s.giantKiller },
  { id: "comeback", label: "Comeback Kid", icon: "📈", rarity: "blue", test: (s) => s.comeback },
  { id: "ironman", label: "Iron Man", icon: "🛡️", rarity: "bronze", test: (s) => s.noInjuries },
  { id: "roadwarrior", label: "Road Warrior", icon: "🚌", rarity: "bronze", test: (s) => s.roadWins >= 8 },
  { id: "divsweep", label: "Division Sweep", icon: "🧹", rarity: "silver", test: (s) => s.divisionSweep },
  { id: "draftsteal", label: "Draft Steal", icon: "🔍", rarity: "gold", test: (s) => s.draftSteal },
  { id: "franchiseqb", label: "Franchise QB", icon: "🏈", rarity: "gold", test: (s) => s.franchiseQB },
  { id: "defmaster", label: "Defensive Mastermind", icon: "🧱", rarity: "silver", test: (s) => s.topDefense },
  { id: "offjugg", label: "Offensive Juggernaut", icon: "🔥", rarity: "silver", test: (s) => s.topOffense },
  { id: "clutch", label: "Clutch", icon: "⏰", rarity: "gold", test: (s) => s.gwd >= 5 },
  { id: "underdog", label: "Underdog", icon: "⭐", rarity: "gold", test: (s) => s.wildcardSB },
  { id: "dynasty", label: "Dynasty", icon: "👑", rarity: "platinum", test: (s) => s.backToBack },
  { id: "rebuilder", label: "Rebuilder", icon: "♻️", rarity: "gold", test: (s) => s.rebuild },
  { id: "scoutguru", label: "Scouting Guru", icon: "👁️", rarity: "silver", test: (s) => s.threeStarters },
  { id: "capgenius", label: "Cap Genius", icon: "💰", rarity: "gold", test: (s) => s.lowRatedWin },
  { id: "ironcurtain", label: "Iron Curtain", icon: "🛡️", rarity: "platinum", test: (s) => s.shutouts >= 3 },
  { id: "century", label: "Century", icon: "💯", rarity: "platinum", test: (s) => s.pointsInGame >= 100 },
];
function unlockAchievements(state) {
  const unlocked = JSON.parse(localStorage.getItem("ach") || "[]");
  ACHIEVEMENTS.forEach((a) => {
    if (!unlocked.includes(a.id) && a.test(state)) {
      unlocked.push(a.id);
      showToast("🏆 " + a.label + " unlocked!");
      const badge = document.querySelector(`[data-ach="${a.id}"]`);
      if (badge) { badge.classList.remove("locked"); badge.classList.add("unlock"); }
    }
  });
  localStorage.setItem("ach", JSON.stringify(unlocked));
}
function renderTrophyCase() {
  const unlocked = JSON.parse(localStorage.getItem("ach") || "[]");
  const host = document.getElementById("trophyCase");
  if (!host) return;
  host.innerHTML = ACHIEVEMENTS.map((a) => {
    const isUnlocked = unlocked.includes(a.id);
    return `<div class="ach-badge ${a.rarity} ${isUnlocked ? "" : "locked"}" data-ach="${a.id}" title="${a.label}">
      <div class="icon">${a.icon}</div>
      <div class="label">${a.label}</div>
    </div>`;
  }).join("");
}
```

### 26.3 Trophy case layout
CSS:
```css
.trophy-case { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; padding: 12px; background: var(--panel,#141a26); border: 1px solid var(--border,#273044); border-radius: 12px; }
.trophy-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.trophy-header .count { font-size: 0.8rem; color: var(--text-secondary,#9aa0b8); }
```
HTML:
```html
<div class="trophy-header"><h3>Trophy Case</h3><span class="count" id="achCount"></span></div>
<div class="trophy-case" id="trophyCase"></div>
```

---

## 27. Review of OR V23 patches (mistakes / improvements)

Source: `_agents/or/V23-Interactive-Beauty-20261024.md` (OR, 24 Oct). Overall solid; minor issues:

- **V23-6 (skeleton)** defines `@keyframes shimmer` again — duplicates OR A-7's shimmer. Duplicate keyframes are allowed (last wins) but fragile. Recommend: reuse the existing shimmer name; don't redefine.
- **V23-7 (high-contrast)** sets `box-shadow:none!important` on `:root` — `box-shadow` is not an inherited property, so this does nothing. Move the rule to `.panel` / universal selector, or remove. Also changes `.panel` to `border:2px solid var(--border)` which removes the box-shadow entirely — acceptable but confirm intent.
- **V23-8 (toast stack)** uses `:nth-child(2)/(3)` with `bottom:76px/126px` — fragile if toasts are removed/re-added out of order. Recommend: use a CSS variable `--toast-offset` set by JS per toast, or flex column with gap. Beam's toast system (snippets §2) uses a queue and is more robust; recommend adopting Beam's queue + OR's stacking visuals.
- **V23-1 (team glow)** references `--team-glow` and `--pick-x/--pick-y` which need JS setters; document them. Otherwise fine.
- **V23-2 (staggered reveal)** requires `style="--i:0"` on children; document the requirement or auto-set via JS.
- **V23-5 (win-prob dot)** `calc(800ms/(1+var(--wp-vol,0)*3))` works but ensure `--wp-vol` is a number. Fine.

Recommendation: adopt OR's V23 patches as-is except V23-6 (reuse shimmer) and V23-7 (fix box-shadow placement) and V23-8 (use Beam's queue). All SAFE ALONE, CSS-only.

---

## 28. Review of VL plugin kit (mistakes / improvements)

Source: `_agents/vl/deliveries/PLUGIN-KIT.md` + prototypes (VL, 24 Oct). Overall excellent manifest. Minor issues:

- **Motion token mismatch**: VL uses `--motion-fast/normal/slow` (150/300/500ms); OR uses `--duration-*` (150/250/400ms) + `--ease-*`; Beam uses `--transition-*`. Three parallel token families. Recommend unifying on OR's `--duration-*` + `--ease-*` and aliasing the others for compat (documented in snippets §21 reconciliation notes).
- **Panel colour**: VL `#1e2433` matches P7-4 request; adopt as `--panel2` (already done in snippets). Good.
- **Team palette**: VL uses `.team-palette.<abbr>` CSS classes; Beam uses `setTeamColors()` JS. Recommend JS setter (covers all 32 teams without 32 CSS rules) + keep VL's palette map as the data source. VL's manifest doesn't flag this; document it.
- **No mistakes in CSS itself** — VL's tokens are clean and well-organized. The interactive prototype's `rank-row div1` selector (typo: should be `.rank`) is a harmless no-op. Minor.
- VL's manifest is the best single reference for Claude; recommend Claude read it alongside Beam's integration guide.

Recommendation: adopt VL's manifest as the canonical block index; layer Beam's snippets and OR's patches on top. No conflicts.

