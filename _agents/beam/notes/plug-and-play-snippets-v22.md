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
