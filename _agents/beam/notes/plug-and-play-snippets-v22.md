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

