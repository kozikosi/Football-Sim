# Prototype: Remove "Value here" from draft board visual — BOC — 20 Oct 2026

Scope: prototype for Claude. Remove the "Value here" column from the visual draft board while keeping `r.v` (value here) in all background math (priority, bars, flex comparisons, sorting by value).

## Build reference
`NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (merge candidate, not V21).

## What "Value here" is (mathematical role, to be preserved)
`r.v` = `e.v` = `slotWins(slot, effOvr(player, slot))` — the extra wins per season this player adds at the exact spot he would fill on the user's roster, flex penalty included. It feeds:
- Priority: `pri = sim ? e.v - later : e.v` (l.1639)
- Priority bar: `gp = sim ? Math.max(0, Math.min(w, r.pri))` where w = max(r.v,0) (l.1696, 1730)
- Flex value tag: `r.v > bestNat[r.g]+1e-9` (l.1714)
- Best natural: `bestNat[r.g] = r.v` (l.1713)
- Sort: `sortKey==='value' ? (r.v==null?-99:r.v)` (l.1677)
- Max weight: `maxW = Math.max(0.5, ...pri.map(r=>Math.max(r.v,0)))` (l.1690)
- Bar width: `w = Math.max(r.v,0)` (l.1726)
- Alternative comparison: `x.v > r.v - 0.15` (l.1763)
- Group best: `if(!byG[g] || v>byG[g].v+1e-9) byG[g] = {..., v, ...}` (l.1588)
- Count: `c0[k]` where k = vKey(e.g, e.v) (l.1601, 1613, 1623)

All of these must remain. Only the VISUAL column (header + cell + sort option + CSS + guide text) is removed.

## Proposed changes (7 locations, incorporating MOC's verification corrections)

### 1. CSS (l.268 + l.269) — MOC correction: two changes, not one
The `dc-val` rule and the `dc-wins` rule share l.268. A naive edit that ADDS a new `dc-pri{grid-column:7 / 9}` rule at l.268 would be overridden by the EXISTING `dc-pri{grid-column:10 / 13}` rule at l.269 (equal specificity, later rule wins → Priority stays at 10/13, leaving a 4-column hole in grid row 2).

Correct edit:
1a. Delete `#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}` from l.268 (it sits on the same line as `dc-wins`).
1b. Change the EXISTING rule at l.269 from `#draftTable2 td.dc-pri{grid-column:10 / 13;grid-row:2;color:var(--gold);}` to `#draftTable2 td.dc-pri{grid-column:7 / 13;grid-row:2;color:var(--gold);}`.

MOC measured (seed 987654321, live draft, getBoundingClientRect):
- 390px: original row 2: Pos 36-86, Team 90-140, Wins 144-195, Value 199-276, Priority 280-357. After corrected edit: Pos 36-86, Team 90-140, Wins 144-195, Priority 199-357 — contiguous, 4px grid gaps preserved, no hole, no overlap, no page overflow (390/390).
- 1280px: real <table> with visible sticky <thead> (thead{display:none} is inside @media max-width:760px). Header and body cells edge-aligned in 9 columns after the change (74/265/325/382/427/494/581/648/823/890 in both).
- Console errors: 0 in every case.

Note: the visible "VALUE HERE" on phone is the `data-label="Value here"` pseudo-element (`td[data-label]::before{content:attr(data-label)}`), not the hidden <th>. Removing the <td> removes the visible word on phone; the <th> is the visible word on desktop.

Actually l.268: `#draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);} #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}`. Removing dc-val means priority and gone shift left by 3 columns. Claude must reflow the grid template.

### 2. Sort dropdown (l.418)
Remove `<option value="value">Sort: value here</option>`. The sortKey==='value' branch in the sort function (l.1677) can remain (harmless) or be removed. Keep it for safety (no harm).

### 3. Table header (l.426)
Remove `<th data-sort="value" class="sortable" title="...">Value here</th>`.

### 4. Row cell (l.1766)
Remove `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>`.

### 5. Empty-state row colspan (l.1768) — MOC correction 1
Change `colspan="10"` → `colspan="9"` in:
  `document.getElementById('draftBody2').innerHTML = h || '<tr><td colspan="10" class="narr">No players match.</td></tr>';`
After column removal there are 9 columns, not 10.

### 6. Guide text (l.4991) — MOC correction 2
DELETE the `<li><b>Value here</b> ...</li>` entry entirely. Do NOT reword it — rewording creates a second "Priority" bullet because the next bullet is already Priority. Remove the bullet, full stop.

### 7. Section title + Priority header title (l.426, l.5056) — MOC correction 3
- l.426: Priority header `<th data-sort="priority" class="sortable" title="Value here minus what you would probably still find at that position at your next pick. High = waiting costs you.">Priority</th>` — reword the title to remove "Value here": e.g. `title="Wins at this spot minus what you would probably still find at that position at your next pick. High = waiting costs you."`
- l.5056: `+ sec('Reading the draft board (Wins, Value here, Priority, Gone, stars)', board, false)` → `+ sec('Reading the draft board (Wins, Priority, Gone, stars)', board, false)`

## Sort-option decision (MOC asks: one variant, not both)

BOC's original patch drops `<option value="value">Sort: value here</option>` (l.418). MOC's default is to **keep the sort and reword the label**.

**BOC's recommendation: keep the sort, reword the label. One variant, not both.** Reasoning: the underlying `r.v` math is untouched and still computed for every row; the sort option costs nothing visually (it's a dropdown entry, not a column); removing it loses a useful power-user affordance for no gain. Reword to "Sort: raw value" (drop "value here" since the column is gone). This is Claude's or the Owner's call — BOC recommends keeping. Single variant: keep + reword.

## What must NOT change
- `r.v` computation (l.1639–1640, 1690, 1696, 1713–1714, 1726, 1730–1731, 1746–1747, 1763).
- Priority computation and display (l.1639, 1730–1731).
- Flex value tag (l.1714).
- All sorting by `sortKey==='value'` (harmless to keep).
- The underlying slotWins/effOvr math.

## Verification
After changes: node --check on the extracted script; visual check that the draft board renders without the column; priority bars still render; sort dropdown still works (value option removed); no console errors.

## Risk
Low. The column is purely presentational. Priority still conveys the "value here" information indirectly (Priority = value here − expected later). Removing the raw "value here" number may slightly reduce transparency for power users, but the Owner's direction is to remove it from the visual.

## Verification (MOC, seeded A/B on copies of 40233d6b…)
- Headers: 10 → 9. "Value here" cells: 1,148 → 0. Cells per row: 10 → 9. Console errors: 0 → 0.
- Wins column, Priority column, and final draft result: bit-identical.
- `node --check` on extracted script: exit 0.
- Product file not edited (MOC worked on copies).

## What BOC did not check
- Whether any other code reads `dc-val` class or `data-label="Value here"` (grep found only the 7 locations above).
- The grid CSS reflow (needs Claude to verify column alignment after removing 3 grid columns).
