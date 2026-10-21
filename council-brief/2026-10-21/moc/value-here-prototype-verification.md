# "Value here" — prototype verification and the exact change set for Claude

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: verify the prototype, prove the maths is untouched | DATE: 2026-10-21T03:40:00Z**

**Owner request.** Remove "Value here" from being **visual** on the draft board; it may still be used anywhere
in its mathematical role. **Build under test:** `NFL Draft Simulator merged.html`, 657,486 B, sha256
`40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae` — the
V20 merge candidate, not V21. **BOC owns the prototype** (`_agents/boc/notes/value-here-prototype.md`,
M-351); **I verified it** and found three corrections to his change set. **No product file was edited** — the
patch was applied to a copy under the approved temp directory.

## 1 · What "Value here" is, and that the maths is load-bearing

`r.v` is the value at the exact spot the player would fill **on your** roster (flex penalty included). It is
**not** display-only: BOC's own map of its nine consumers is right, and I confirmed the sites in the
candidate — Priority (`pri = sim ? e.v - later : e.v`, l.1639), the Priority bar (l.1690, l.1696, l.1726,
l.1730), the flex value tag (l.1713–1714), the best-natural comparison (l.1588), the group best (l.1588),
the value sort key (l.1677) and the alternative-slot comparison (l.1763). **All of those must survive**, and
they do: they read `r.v` in JavaScript, none of them read the DOM cell.

## 2 · The verified change set (7 edits; BOC's 6 plus one he did not list)

| # | where | change |
|---|---|---|
| 1 | l.268 CSS | drop `#draftTable2 td.dc-val{grid-column:7 / 10;…}` and re-span the neighbours: `dc-wins` 5/7, `dc-pri` **7 / 9**, `dc-gone` **9 / 10** |
| 2 | l.418 | remove `<option value="value">Sort: value here</option>` (the `sortKey==='value'` branch may stay) |
| 3 | l.426 | remove `<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>` |
| 4 | l.1766 | remove `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>` |
| 5 | l.1768 | **not in BOC's list:** the empty-state row's `colspan="10"` → **`colspan="9"`** (the row loses a cell, so the empty state must lose one too) |
| 6 | l.4991 | **not in BOC's list, and a trap:** the guide bullet `<li><b>Value here</b> — …</li>` must be **deleted, not reworded into a second "Priority" bullet** — the next bullet is already "Priority — Value here minus …", so rewording the first one silently creates a **duplicate Priority entry** in the Guide. Delete the bullet and reword the surviving one to *"the value at the spot he would fill on your roster, minus the best you could expect to still find at that spot at your next pick"* |
| 7 | l.426 / l.4992 / l.5056 | the **Priority header's `title`** and the Guide's **section title** (`Reading the draft board (Wins, Value here, Priority, Gone, stars)`) both still name the removed column — reword them, or a user will look for a column that no longer exists |

**The trap worth stating plainly:** the naive edit of "delete the Value here bullet" leaves the Priority
bullet saying "Value here minus…", and the naive edit of "reword the Value here bullet into Priority"
creates **two** Priority bullets. Both were caught by rendering the patched build and reading the Guide
text back, not by reading the diff.

## 3 · The proof — a seeded A/B, same clicks, same RNG (VERIFIED)

The build has 58 unseeded `Math.random()` sites, so two runs are not comparable. I installed a **seeded**
`Math.random` via `Page.addScriptToEvaluateOnNewDocument` before the page's scripts run, drove the same
clicks in both builds (Start Draft → Instant → Sim to End), and compared.

| measurement | original | patched |
|---|---|---|
| draft-board header cells | **10** | **9** |
| "Value here" header | 1 | **0** |
| "Value here" cells in the body | **1,148** | **0** |
| cells per board row | 10 | **9** |
| console errors | 0 | **0** |
| **Wins column values** | — | **identical** |
| **Priority column values** | — | **identical** |
| **final draft result** | — | **identical** ("Draft Complete … Your draft is in the books") |

A board row before and after (same player, same seed):

```
original: TOP Josh Allen|QB|BUF|99|+3.69|+3.69|+0.83|100%|QB|Draft
patched : TOP Josh Allen|QB|BUF|99|+3.69|      +0.83|100%|QB|Draft
                     name pos team ovr  wins   PRIORITY  gone fills btn
```

**The one column removed; Wins and Priority unchanged; the same draft; no errors.** `node --check` on the
extracted script: **exit 0**.

**The patch as a byte diff against the candidate: 7 changed lines (14 with both sides), 657,486 → 657,347 B.**

## 4 · What I did not check

- I did **not** edit the product file, and I did not run the full E2E gate on the patched copy (only the
  draft flow with a seeded RNG) — the 162-game season, the 100-season report and the playoff path are
  untouched by the diff but were not exercised on the patched build.
- I did **not** verify the **390 px** mobile layout of the nine-column board (the `grid-column` spans and the
  stacked `data-label` view) — that is the one thing that could still be wrong, and it is Ultra's lane.
- I did **not** check the **NBA** build's board (same code path, but a different pool size) — VLOC's lane.
- I did **not** check whether any *other* code path reads the `dc-val` class or the `data-label="Value here"`
  attribute; BOC grepped and found only the seven sites above, and I confirmed the row template's
  `data-label` list has no other consumer.
- I did **not** decide whether the **"Sort: value here"** option should go. BOC removed it (it is a control,
  not a column). Removing it also removes the *ability* to sort by that metric; keeping it would need a
  reworded label. **This is a product decision, and it is Claude's or yours — my default is to keep the
  sort and reword the label, because sorting by a metric you cannot see is still useful, but the choice is
  small either way.**
