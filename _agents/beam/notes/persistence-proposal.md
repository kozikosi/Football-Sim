# Persistence Proposal (T5) — Beam, advisory (no product edit)

Target: `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`. Implements `tasks/T5-persistence.md` with anchors re-verified against Pre-Colors. Advisory only — Architect owns the product file.

## 1. Schema
One key: `mds_save_v1` = `{ v:1, savedAt, draftSim, seasonState }`. Only `seasonState` for a completed draft; both during draft-in-progress (draftSim's pool can be rebuilt on load as roster pool minus picks). Keep-list only; strip caches/UI state. Target < 1.5 MB.

## 2. Seeded RNG (draft only)
Introduce `let RNG_SEED = null; function rnd(){ if (RNG_SEED === null) return Math.random(); ... }` (mulberry32). Conversion scope: `cpuPick`, `executePick`, `startDraft2` shuffle. Init seed = user-visible input at draft setup: `Draft seed: <input number>` + "Copy seed" button. Same seed ⇒ same draft. Season stays `Math.random()` for now.

Anchors (Pre-Colors):
- `executePick` at l.1444
- `cpuPick` (search by name)
- `startDraft2` (search by name)

## 3. Save points (each wrapped `try{localStorage.setItem(...)}catch(e){}`, debounced 300ms via shared `scheduleSave()`)
- After each pick: `executePick` end (l.1444 region) and `makeUserPick2` (l.1805)
- Undo path
- After each simulated week: `simulateCurrentWeek` end (l.3543)
- After each playoff game
- After lineup-editor apply
- After preseason selections (`scriptLocked` transitions, l.3544/3556)

## 4. Load path
On init near `setActiveTab(...)` (l.3936), read the blob once. If present, render a toast/card: "Resume your season from <time>?" [Resume] [Start fresh]. Resume restores objects then routes to `goSeason()`; Start fresh discards with one confirm.

## 5. Export / Import
Two small buttons in the Season onboarding panel footer (desktop + mobile):
- Export = `URL.createObjectURL(new Blob([JSON.stringify(save)]))` → download `mds-save-…json`
- Import = `<input type=file>` → `JSON.parse` with version check, restore, render.

## 6. Display
`s (savedAt` in a small line under the Season panel hero (`Season saved locally at …`).

## 7. Done-when
- Refresh mid-preseason → resume restores same week/roster/plans.
- Export → clear storage → import → identical resume.
- Seed demo: two drafts with the same seed produce identical first round (log picks).

## 8. Forbidden
Any key without `mds_` prefix; storing > ~1.5 MB (strip caches/UI state via keep-list).

## 9. Plug-and-play code

### 9.1 Save/load helpers
```js
const SAVE_KEY = "mds_save_v1";
function scheduleSave() { clearTimeout(window.__saveT); window.__saveT = setTimeout(saveNow, 300); }
function saveNow() {
  try {
    const blob = { v: 1, savedAt: new Date().toISOString(), draftSim: (typeof draftSim !== "undefined" ? draftSim : null), seasonState: (typeof seasonState !== "undefined" ? seasonState : null) };
    localStorage.setItem(SAVE_KEY, JSON.stringify(blob));
    const line = document.getElementById("savedAtLine");
    if (line) line.textContent = "Season saved locally at " + new Date().toLocaleTimeString();
  } catch (e) { /* quota or privacy mode */ }
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const b = JSON.parse(raw);
    if (!b || b.v !== 1) return null;
    return b;
  } catch (e) { return null; }
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }
```

### 9.2 Resume prompt (on init)
```js
const saved = loadSave();
if (saved) {
  const toast = document.createElement("div");
  toast.className = "fxtoast";
  toast.innerHTML = `Resume your season from ${new Date(saved.savedAt).toLocaleString()}? <button class="resetbtn" id="resumeBtn">Resume</button> <button class="resetbtn" id="freshBtn">Start fresh</button>`;
  document.body.appendChild(toast);
  document.getElementById("resumeBtn").addEventListener("click", () => {
    if (saved.draftSim) draftSim = saved.draftSim;
    if (saved.seasonState) seasonState = saved.seasonState;
    toast.remove();
    if (typeof goSeason === "function") goSeason();
  });
  document.getElementById("freshBtn").addEventListener("click", () => {
    if (confirm("Discard saved season and start fresh?")) { clearSave(); toast.remove(); }
  });
}
```

### 9.3 Export / Import (Season onboarding footer)
```js
function exportSave() {
  const blob = new Blob([localStorage.getItem(SAVE_KEY) || "{}"], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "mds-save-" + Date.now() + ".json"; a.click();
  URL.revokeObjectURL(url);
}
function importSave(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const b = JSON.parse(r.result);
      if (!b || b.v !== 1) { alert("Unsupported save version"); return; }
      localStorage.setItem(SAVE_KEY, JSON.stringify(b));
      location.reload();
    } catch (e) { alert("Invalid save file"); }
  };
  r.readAsText(file);
}
```

### 9.4 Seeded RNG (mulberry32, draft only)
```js
let RNG_SEED = null;
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
let _rng = Math.random;
function rnd() { return _rng(); }
function setSeed(seed) { RNG_SEED = seed; _rng = seed == null ? Math.random : mulberry32(seed); }
// Init at draft setup: setSeed(userEnteredSeed); // null => Math.random
```

### 9.5 Save-point hooks (insert `scheduleSave();` at end of)
- `executePick` (l.1444)
- `makeUserPick2` (l.1805)
- `simulateCurrentWeek` (l.3543)
- lineup-editor apply
- preseason `scriptLocked` transitions (l.3544/3556)
- undo path

### 9.6 Saved-at line (Season panel hero)
```html
<div class="narr" id="savedAtLine" style="font-size:0.72rem;opacity:0.7;"></div>
```

## 10. Verification
- Refresh mid-preseason → resume restores same week/roster/plans.
- Export → clear storage → import → identical resume.
- Seed demo: two drafts with same seed produce identical first round (log picks).
- `node --check` on extracted script; `tools/lint.mjs product` exit 0; e2e smoke exit 0.

## 11. Open questions for the Architect
1. Should resume be automatic or prompt-based? (Spec says prompt with Resume/Start fresh.)
2. Should the seed be user-visible/editable or auto-generated? (Spec says user-visible input + "Copy seed".)
3. Export format: raw JSON blob vs. zipped? (Spec says JSON download.)
4. Should completed seasons (Super Bowl) auto-save and offer "New season" vs "Continue franchise"? (T5 covers single season; multiseason is separate.)

## 12. What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposal + plug-and-play code only, per AGENTS.md §5.
