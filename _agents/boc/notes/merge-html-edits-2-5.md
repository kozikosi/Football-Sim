# Copy-Pasteable Edits: Items 2–5 (MOC request) — BOC — 21 Oct 2026

Build: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (merge candidate, not V21). Claude is sole implementer; BOC proposes.

## Item 2 — Remove "MORE" from tab footer

### Edit 2a
File: `NFL Draft Simulator merged.html` (or `merged.html`)
Line: 439
Old:
```
 <nav class="footnav" aria-label="More tools"><span class="footlabel">More</span>
```
New:
```
 <nav class="footnav" aria-label="More tools">
```
(Remove the `<span class="footlabel">More</span>` element. The nav keeps its aria-label.)

## Item 3 — Move badges to bottom of page under weights buttons

### Analysis (MOC asked: what can and cannot mean)
The badges ("Can't Run", "Weak D", "Can't Pass") are per-team chips built at l.624–627 and rendered inside the rankings table row at l.631 (`<td><div class="team">${row.team}${badges}</div>...`). The weights controls (modelWBtn/personalWBtn) are at l.548 in the same view. The 32-row rankings table sits between the weights buttons (top) and the bottom of the view.

Option (a): Pull the badge chips out of the table rows into one strip below the weights buttons. This means removing badges from l.631 and rendering a single badge strip (e.g., a `<div id="badgeStrip">` below the weights buttons at l.548). The badges are per-team, so the strip would need to show which team each badge belongs to, or aggregate counts. This is the more literal reading of "move them to the bottom of the page under Back to my weights."

Option (b): Move a legend/penalty note (a key explaining what "Can't Run" means) below the weights buttons. The badges stay in the table rows but a legend appears below.

**BOC recommendation: (a) with aggregation.** Move the per-team badge chips out of the table rows into a single strip below the weights buttons, showing team name + badge. This declutters the 32-row table and keeps the penalty information visible. Implementation: remove `badges` from l.631's row template, collect badges into an array during the row loop, and render a `<div id="badgeStrip">` after the weights buttons (l.548) showing the aggregated badges per team. If no team has badges, show "No penalty badges."

### Edit 3a (remove badges from table row, l.631)
Old:
```
   <td><div class="team">${row.team}${badges}</div><div class="narr">${narr}${penaltyNote}</div><div class="bar-bg"><div class="bar-fill" style="width:${pct.toFixed(1)}%"></div></div></td>
```
New:
```
   <td><div class="team">${row.team}</div><div class="narr">${narr}${penaltyNote}</div><div class="bar-bg"><div class="bar-fill" style="width:${pct.toFixed(1)}%"></div></div></td>
```

### Edit 3b (add badge strip below weights buttons, l.548)
Old:
```
 <button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button><button class="resetbtn" id="personalWBtn">Back to my weights</button>`;
```
New:
```
 <button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button><button class="resetbtn" id="personalWBtn">Back to my weights</button>
 <div id="badgeStrip" style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;"></div>`;
```
Plus: during the row loop, collect badges into an array and populate `#badgeStrip` after `el.innerHTML = h;`. Claude must wire this up in the render function.

**What BOC did not check:** whether badge CSS (`.badge`, `.badge-run`, etc.) needs adjustment for the strip layout; whether the strip should be collapsible.

## Item 4 — "Use model weights" → "Default"

### Edit 4a (l.548)
Old:
```
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button>
```
New:
```
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Default</button>
```

## Item 5 — "Back to my weights" → "Save My Weights" with conditional visibility

### Edit 5a (l.548, initial render)
Old:
```
<button class="resetbtn" id="personalWBtn">Back to my weights</button>
```
New:
```
<button class="resetbtn" id="personalWBtn" style="opacity:0.45;pointer-events:none;">Save My Weights</button>
```

### Edit 5b (l.548, dirty-flag wiring — add after the existing input listeners)
The existing code at l.549–556 wires input listeners that call `render()`. Add a dirty-flag check inside the `render()` function or as a separate listener. The state machine:

**State machine:**
- `weights` = current working weights (live, edited by inputs).
- `DEFAULT_WEIGHTS` = the model weights (constant).
- `personalWeights` = saved user weights (currently `{...weights}` on "Use model weights" click, l.564).
- Dirty flag: `weightsDirty = JSON.stringify(weights) !== JSON.stringify(modelWeights())`.

**Rules:**
1. On page load / render: if `weightsDirty` is false, `personalWBtn` is transparent (opacity 0.45, pointer-events none) and reads "Save My Weights".
2. If the user edits any weight input (l.549–556 input listener fires), set `weightsDirty = true`. Re-render: `personalWBtn` becomes blue (remove opacity/pointer-events) and text changes to "My Weights".
3. Clicking "My Weights" (personalWBtn): saves current weights as `personalWeights = {...weights}`, then resets `weightsDirty = false`, re-renders (button goes transparent "Save My Weights" again). This mirrors the existing l.565 handler.
4. Clicking "Default" (modelWBtn): sets `weights = modelWeights()`, saves `personalWeights = {...weights}` (existing l.564), resets `weightsDirty = false`.
5. Persistence: currently `personalWeights` is in-memory only (l.457 `let personalWeights = null;`). No localStorage. The Owner said "delete any record of my user weights" (item 7), so do NOT persist. `personalWeights` resets on page reload.

**Edit 5c (handler, l.565)**
Old:
```
 document.getElementById('personalWBtn').addEventListener('click', ()=>{ weights = {...(personalWeights||DEFAULT_WEIGHTS)}; refresh(); });
```
New:
```
 document.getElementById('personalWBtn').addEventListener('click', ()=>{ if(!weightsDirty) return; personalWeights = {...weights}; weightsDirty = false; refresh(); });
```

**Edit 5d (dirty flag initialization, add near l.457)**
After `let personalWeights = null;` (l.457), add:
```
let weightsDirty = false;
```

**Edit 5e (dirty flag update, inside input listener, l.549–556)**
Inside `inp.addEventListener('input', ()=>{ ... render(); });`, after setting `weights[inp.dataset.slot]`, add:
```
weightsDirty = true;
```
And inside `render()`, add logic to update the button:
```
const pwBtn = document.getElementById('personalWBtn');
if(pwBtn){ pwBtn.textContent = weightsDirty ? 'My Weights' : 'Save My Weights'; pwBtn.style.opacity = weightsDirty ? '1' : '0.45'; pwBtn.style.pointerEvents = weightsDirty ? 'auto' : 'none'; }
```

## Item 6 — Weights table label correction (l.548)
Old:
```
The default is the <b>model weights</b>: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set; the buttons switch between the two.
```
New:
```
Default is how the draft simulator sees the game.
```
(Per Owner: "That's it. How the buttons function is obvious visually.")

## Verification
- `node --check` on extracted script (exit 0).
- Visual: footer has no "More" label; badges appear in strip below weights buttons; "Default" and "Save My Weights" buttons render correctly; "Save My Weights" is transparent until a weight is edited, then blue "My Weights"; Player browser shows ~15 per page on desktop; footer tabs always visible.
- No console errors.

## What BOC did not check
- Whether badge CSS needs adjustment for strip layout.
- Whether the player browser pagination already exists or needs new code.
- Whether `DEFAULT_WEIGHTS` values match the Owner's provided table exactly (BOC transcribed from the Owner's message; Claude should verify against the Owner's source).
