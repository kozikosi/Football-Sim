# "Value here" — verified prototype and the exact change set for Claude

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: verify the prototype, prove the maths is untouched | DATE: 2026-10-21T04:50:00Z**

**Owner request.** Remove "Value here" from being **visual** on the draft board; it may still be used
anywhere in its mathematical role. **Build under test:** `NFL Draft Simulator merged.html`, 657,486 B,
sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae`
— the V20 merge candidate, **not** V21. **BOC owns the prototype** (`_agents/boc/notes/value-here-prototype.md`,
M-351, re-issued M-353); **I verified it** and the change set below corrects two things his version got
wrong. **The product file was not edited** — the patch was applied to copies under the approved temp
directory, and the patches are published beside this note.

## 1 · What "Value here" is, and why the maths is load-bearing

`r.v` is the value at the exact spot the player would fill **on your** roster (flex penalty included). It is
not display-only. The nine consumers in the candidate: Priority (`pri = sim ? e.v - later : e.v`, l.1639),
the Priority bar (l.1690, l.1696, l.1726, l.1730), the flex value tag (l.1713–1714), the best-natural
comparison (l.1588), the group best (l.1588), the value sort key (l.1677) and the alternative-slot
comparison (l.1763). **All of them read `r.v` in JavaScript; none of them read the DOM cell** — so removing
the cell cannot change any of them. The seeded A/B below proves it rather than arguing it.

## 2 · The verified change set — seven edits

| # | where | change |
|---|---|---|
| 1 | l.268 | **delete** `#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}` (keep `dc-wins` on the same line) |
| 2 | l.269 | **change the existing** `#draftTable2 td.dc-pri{grid-column:10 / 13;…}` → **`grid-column:7 / 13`** |
| 3 | l.418 | the sort option: either remove `<option value="value">Sort: value here</option>` (variant **A**) or keep it and reword the label to `Sort: value at my spot` (variant **B**, recommended). The `sortKey==='value'` branch (l.1677) may stay either way |
| 4 | l.426 | remove `<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>` |
| 5 | l.1766 | remove `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>` |
| 6 | l.1768 | the empty-state row's **`colspan="10"` → `colspan="9"`** |
| 7 | l.4991 / l.4992 / l.426 / l.5056 | the **Guide**: **delete** the `<li><b>Value here</b> …</li>` bullet (**never reword it** — the next bullet is already "Priority", so rewording silently creates a **duplicate Priority entry**); reword the surviving Priority bullet to *"the value at the spot he would fill on your roster, minus the best you could expect to still find at that spot at your next pick"*; reword the **Priority header's `title`** the same way; and fix the **section title** `Reading the draft board (Wins, Value here, Priority, Gone, stars)` → `(Wins, Priority, Gone, stars)` |

### The two traps, stated plainly

1. **The CSS.** The first version of this change set added a *new* `dc-pri` rule (`grid-column:7 / 9`)
   instead of editing the existing one. The file already has `#draftTable2 td.dc-pri{grid-column:10 / 13;…}`
   at l.269, and with equal specificity **the later rule wins** — so the new rule would never have applied,
   and grid row 2 would have had an empty hole at columns 7–10. **Edit the existing rule.**
2. **The Guide.** Deleting the "Value here" bullet leaves the next bullet reading "Priority — Value here
   minus…", which names a column that no longer exists; rewording the "Value here" bullet instead creates a
   **second Priority bullet**. Both were caught by rendering the patched build and reading the Guide text
   back — not by reading the diff.

### A third thing worth knowing

The board is **not** one layout. The 12-column card grid (`#draftTable2 tr{display:grid;…}`) lives
**inside `@media (max-width:760px)`**, and above 760 px the board is a plain `<table>` with a visible
sticky `<thead>`. So the **visible** "Value here" is two different things in two different places:
on desktop the `<th>` header, on the phone the `data-label="Value here"` pseudo-element
(`td[data-label]::before{content:attr(data-label)}`). Removing the `<td>` removes the phone's word;
removing the `<th>` removes the desktop's. **Both are needed.**

## 3 · The proof — seeded A/B, identical clicks (VERIFIED)

The build has 58 unseeded `Math.random()` sites, so two raw runs are not comparable. A seeded
`Math.random` was installed via `Page.addScriptToEvaluateOnNewDocument` **before** the page's scripts ran;
both builds then got the same clicks (Start Draft → Instant → Sim to End) and the same seed
(987654321).

| measurement | original | variant A (drop sort) | variant B (keep sort) |
|---|---|---|---|
| board header cells | 10 | **9** | **9** |
| "Value here" header | 1 | **0** | **0** |
| "Value here" cells in the body | 1,148 | **0** | **0** |
| cells per board row | 10 | **9** | **9** |
| console errors | 0 | **0** | **0** |
| **Wins column values** | — | **identical** | **identical** |
| **Priority column values** | — | **identical** | **identical** |
| **final draft result** | — | **identical** | **identical** |
| value-sort order (first 6) | Kyler Murray, Kirk Cousins, … | — | **identical to original** |

One row, same player, same seed:

```
original: TOP Josh Allen|QB|BUF|99|+3.69|+3.69|+0.83|100%|QB|Draft
variant B: TOP Josh Allen|QB|BUF|99|+3.69|      +0.83|100%|QB|Draft
                  name pos team ovr  wins   PRIORITY  gone fills btn
```

**One column removed; Wins and Priority bit-identical; the same draft; no errors.**
`node --check` on the extracted script of both variants: **exit 0**.

## 4 · The geometry — measured, not assumed (VERIFIED)

`getBoundingClientRect` on the live draft (the board is hidden inside `#draftLive` once the draft ends,
so it must be measured *during* the draft), seed 987654321.

**Phone, 390 × 844** — grid row 2, in px:

| | Pos | Team | Wins | Value | Priority |
|---|---|---|---|---|---|
| original | 36–86 | 90–140 | 144–195 | 199–276 | 280–357 |
| **patched** | 36–86 | 90–140 | 144–195 | — | **199–357** |

Contiguous, the 4 px grid gaps preserved, **no hole, no overlap**, and no page overflow
(`scrollWidth 390 / innerWidth 390`).

**Desktop, 1280 × 900** — the `<thead>` is visible and **edge-aligned with the body in 9 columns**
(header edges 74 / 265 / 325 / 382 / 427 / 494 / 581 / 648 / 823 / 890 = body edges, exactly), no page
overflow (1280 / 1280), console errors 0. The freed width goes to the Player column and the Fills column;
the Priority column keeps its 87 px.

## 5 · The artifacts published for Claude

| file | what it is |
|---|---|
| `council-brief/2026-10-21/moc/value-here-keepsort.patch` | **variant B (recommended)** — `patch -p0` against the candidate; 9,503 B, 6 hunks, 7 edits |
| `council-brief/2026-10-21/moc/value-here-dropsort.patch` | variant A — the same with the sort option removed; 9,450 B, 6 hunks |
| `_agents/moc/prototype/` | the same two patches, in my lane |

Patched build hashes (for reproduction, not for shipping): variant A `7ff09fadd459626c…` (656,964 B),
variant B `7b4f03d6a251d558…` (657,017 B).

**The sort call is Claude's or the Owner's.** BOC and I both recommend **variant B** (keep the sort,
reword the label): the sort is a control, not a column, it costs nothing visually, and sorting by a metric
you cannot see is still useful — the value sort produces the same order as before, which is measured
above. Removing it (variant A) also loses that affordance. The change is one line either way.

## 6 · What I did **not** check

- I did **not** edit the product file, and I did **not** run the full E2E gate on a patched copy (only the
  draft flow with a seeded RNG). The 17-game season, the playoffs and the 100-season report are untouched
  by the diff but were **not** exercised on the patched build.
- I did **not** check the **NBA** build's board (same code path, different pool) — that is VLOC's lane.
- I did **not** judge the **wording** of the reworded strings — that is Super's lane; the strings here are
  placeholders that satisfy the house rules, not a final language pass.
- I did **not** verify the **empty-state** row visually (the "No players match." row with `colspan="9"`) —
  the cell exists in the DOM but I never filtered the board down to zero results to see it rendered.
- I did **not** check whether any code path reads the `dc-val` class or the `data-label="Value here"`
  attribute outside the seven sites above; BOC grepped and found only those, and I confirmed the row
  template's `data-label` list has no other consumer.
