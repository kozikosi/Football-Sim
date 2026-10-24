SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-7 "Value here" inventory | DATE: 2026-10-24T22:20Z

FOR: QUEUE-7

WHERE: Football-Sim-PreColors.html

old -> new: N/A (inventory task, no code change). Removal plan per P0-1 + Q-V23-1.

WHY: QUEUE-7 asks for every occurrence of "Value here" in the product (labels, sort options, help text) with line numbers and exact string. Also includes Q-V23-1 "also fits" since it's a related visual removal.

SAFE ALONE?: N/A (no edit here; removal is P0-1/Q-V23-1).

HOW TO CHECK: grep -ni "value here" Football-Sim-PreColors.html (6 occurrences on 5 lines); grep -ni "also fits" (1 occurrence).

EVIDENCE: VERIFIED (grep run; lines and exact strings below).

--- "Value here" occurrences ---

L418 (draftSort2 <select>):
  <option value="value">Sort: value here</option>
  → sort option label. Remove this option (or rename to "Sort: slot value" per V23 owner request).

L426 (<thead> <th>):
  <th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>
  → column header. Remove this <th>.

L1766 (draft table row render):
  <td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>
  → cell. Remove this <td> and the corresponding `dc-val` CSS.

L4991 (Guide, bullet):
  <li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. ...
  → Guide help text. Remove this bullet (or move to "background calculation" note).

L4992 (Guide, bullet):
  <li><b>Priority</b> — Value here minus the best you could expect ... (references "Value here" in prose)
  → Update prose to say "slot value" instead of "Value here".

L5056 (Guide, section title):
  + sec('Reading the draft board (Wins, Value here, Priority, Gone, stars)', board, false)
  → Update section title to remove "Value here".

--- "also fits" occurrence (Q-V23-1) ---

L1764:
  const altTxt = alt ? `<div class="narr" title="The other spot he could fill, with the value he would have there">also fits: ${LABELS[alt.slot]||alt.slot} ${fmtWar(alt.v)}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>` : '';
  → Remove this line entirely (the `altTxt` variable and its render in the row).

--- background calculation (keep, never display) ---
  r.v (the value calculation) is still computed in the row data (r.v) and used for Priority (r.pri = r.v - expectedNext). Keep the computation; only remove display.

--- summary ---
Visual "Value here" occurrences: 4 (sort option L418, column header L426, cell L1766, guide bullet L4991, section title L5056). Plus 1 prose reference (L4992). Plus "also fits" at L1764.
Total lines touched for removal: 5 (L418, L426, L1764, L1766, L4991, L4992, L5056) = 7 lines.
r.v computation retained as background calc only.

Notes:
- P0-1 already proposed removing "Value Here" from visuals; this inventory confirms the exact sites.
- Q-V23-1 adds "also fits" removal (L1764).
- The `dc-val` CSS class (l.~57 region) should also be removed once the column is gone.
