# F1 — `#glue` phone/table synthesis (Architect decision artifact)

**DS · 20 Oct 2026 · Round 4 (M-25 §6; posted as M-28).** Read-only product analysis. Reference v20 `31b7d61f…` 649,032 B; donor `77bb9ed5…` 650,127 B (`shasum -a 256`, re-run this session). No product edit made.

**Pin rule (T-9, Pickle M-27 §3).** All pins below use the canonical extraction: the span's lines joined by `\n`, **no trailing newline**, hashed with SHA-256. The `sed | shasum` values in `glue-receipt.txt` include a trailing newline and are auxiliary fingerprints, not pins; use `canonical-pins.txt` for the gate.

## 1. Spans and pins

`surface-lines.js` was corrected this round: the old phone finder matched the **CSS** comment `/* ---- phone layout: ... */` at line 214 and printed bogus spans 214–939 / 214–913. The finder now requires the **JS** comment `// ---- phone layout:`. Output:

| build | `#glue` span | lines | canonical sha256 (12 hex) | final default-tab line |
|---|---|---|---|---|
| v20 | 6409–6432 | 24 | `078fe4152a4e` | 6433 `setActiveTab('viewDraft','tabDraftBtn');` (`df5c04597278`) |
| donor | 6458–6488 | 31 | `93fef50ce977` | 6489 `setActiveTab('viewSeason','tabSeasonBtn');` (`fc90d34aa00c`) |
| **Variant B — strict donor + v20 tab** | 6458–6488 + 6433 | 32 | `04b90cb68fcf` | v20 `viewDraft` |
| **Variant A — DS recommendation** | donor block + `data-nostack` guard + v20 tab | 33 | `ec6306eb79df` | v20 `viewDraft` |

Full 64-hex pins and the extraction rule: `_agents/ds/reviews/round4/canonical-pins.txt`. Spans: `surface-lines.txt`; auxiliary `sed` fingerprints: `glue-receipt.txt`.

## 2. Line-by-line diff (the exact change)

The unified diff is in `glue-receipt.txt`. Aligned:

| v20 | donor | what happens |
|---|---|---|
| 6409–6416 | 6458–6465 | identical prologue: comment, IIFE, `mq`, `pass`, `busy`, `try`, `forEach`, `!mq.matches` clear-and-return. |
| **6417–6419** | — | v20-only early returns: `mstack || nostack` and the `msChecked` row-count memo (write + check). **Removed.** |
| — | **6466–6472** | donor-only body: `bodyRows`, `cols`, `parentW`, `fits`, `stack`; remove `mstack` and return when it fits with ≤3 columns or no `thead`. |
| 6420–6422 | 6467–6472 | v20 computes `cols` then two separate fits checks; replaced by the donor's single `stack` decision. |
| 6423 | 6473 | identical `heads` extraction. |
| 6424 | 6474–6480 | v20 labels only when `!c.dataset.label`; donor checks the first row for a missing/mismatched label and re-applies every render. |
| 6425–6432 | 6481–6488 | identical `mstack` add, `finally`, `schedule`, `MutationObserver`, `resize`, `schedule()`, IIFE close. |
| **6433** | **6489** | v20 `viewDraft` vs donor `viewSeason`; **keep v20** per the M-25/DS decision. |

Marker counts (v20 / donor): `msChecked` **2 / 0**; `bodyRows` **0 / 3**; `firstRow` **0 / 2**; `data-nostack` **1 / 0**.

## 3. Why the donor is the fix

- The v20 memo records `String(t.rows.length)` and returns when the row count is unchanged. A re-render replaces the cells but keeps the row count, so the labels are never re-applied; after 390→1280→390 the table remains `mstack` and the memo blocks a fresh check. MiniMax measured 7,208 overflowing elements in v20 / 0 in the donor.
- The donor has no memo: it re-evaluates `fits`/`stack`, removes `mstack` when the table genuinely fits, and re-applies labels when the first row shows a missing or mismatched `data-label`.
- The donor's first-row check is a cheap proxy for "this render produced new cells"; it catches the same-row-count re-render that the v20 row-count signature missed.

## 4. The `data-nostack` difference (the synthesis point)

The v20 guard is `if(t.classList.contains('mstack') || t.dataset.nostack) return;`. The donor removes **both** halves. The `mstack` half must stay removed (it is the bug). The `data-nostack` half is a separate v20 feature:

- v20 has exactly one `data-nostack` table: `#draftTable2` at line 425 (`data-nostack="1"`); donor has zero.
- v20 `renderDraftBoard2` pre-sets `data-label` on the data cells at line 1725 (`Pos`, `Team`, `OVR`, `Wins`, `Value here`, `Priority`, `Gone`, `Fills`); the donor render does not. The v20 `#draftTable2` card CSS at lines 259–272 is written for that custom table.
- A strict donor-body swap removes the opt-out, so the donor pass will process `#draftTable2`: the v20 ID-specific card CSS still wins the layout (ID selector beats `table.mstack`), but the donor label pass can overwrite the pre-set labels with the `thead` text (e.g. `Player` on the name cell) and add `mstack`. That is a visual change requiring a browser check.
- **Variant A (DS recommendation):** keep the donor body, add back **only** `if(t.dataset.nostack) return;` (never the `mstack` early return), and keep v20 6433. This preserves the donor re-label fix for every normal table and the v20 custom draft board.
- **Variant B (strict donor; Pickle M-27 §6 baseline):** donor 6458–6488 + v20 6433, canonical pin `04b90cb68fcf`. This is the exact donor block; it removes the opt-out. If the Architect prefers it, verify the draft-board labels in a browser before freezing.

## 5. Proposed merged block — Variant A (DS recommendation)

```js
// ---- phone layout: any table that would need sideways scrolling becomes a stack of labelled cards ----
(function(){
 const mq = window.matchMedia('(max-width:760px)'); let busy = false, queued = false;
 function pass(){
  busy = true;
  try{
   document.querySelectorAll('table').forEach(t=>{
    if(!mq.matches){ if(t.classList.contains('mstack')) t.classList.remove('mstack'); return; }
    if(t.dataset.nostack) return;
    const bodyRows = t.querySelectorAll('tbody tr');
    const cols = t.rows.length ? t.rows[t.rows.length-1].cells.length : 0;
    const parentW = t.parentElement ? t.parentElement.clientWidth : 0;
    const fits = t.scrollWidth <= parentW + 1;
    // Once a table is stacked it stays stacked, unless it genuinely fits with few columns.
    const stack = !(fits && (cols<=3 || !t.tHead));
    if(!stack){ if(t.classList.contains('mstack')) t.classList.remove('mstack'); return; }
    const heads = t.tHead && t.tHead.rows.length ? Array.from(t.tHead.rows[t.tHead.rows.length-1].cells).map(c=>c.textContent.trim()) : [];
    // Every render replaces the cells, so labels have to be reapplied each time. Checking
    // the first row is cheap and catches a re-render that keeps the same row count, which
    // a row-count signature missed: wide tables then showed bare numbers on phones with
    // no way to tell the columns apart.
    const firstRow = bodyRows[0];
    const missing = !!(firstRow && heads.length && Array.from(firstRow.cells).some((c,i)=>heads[i] && c.dataset.label!==heads[i]));
    if(missing) bodyRows.forEach(r=>{ Array.from(r.cells).forEach((c,i)=>{ if(heads[i] && c.dataset.label!==heads[i]) c.dataset.label = heads[i]; }); });
    t.classList.add('mstack');
   });
  } finally { busy = false; }
 }
 function schedule(){ if(queued || busy) return; queued = true; setTimeout(()=>{ queued = false; pass(); }, 150); }
 new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true});
 window.addEventListener('resize', schedule); schedule();
})();
setActiveTab('viewDraft','tabDraftBtn');
```

The block is also saved at `_agents/ds/reviews/round4/merged-primary.txt` (33 lines). Its canonical no-trailing-newline pin is `ec6306eb79df`; the file-level `shasum` `459809e9…` includes the final newline and is not the pin. It differs from Variant B (donor block + v20 tab) by exactly one line: the `data-nostack` guard. Variant B is saved at `_agents/ds/reviews/round4/merged-strict.txt` (32 lines; canonical pin `04b90cb68fcf`).

## 6. Decision

**Architect:** choose Variant A (recommended) or Variant B (Pickle M-27's strict donor baseline). Both keep the default tab v20 `viewDraft` and both preserve the donor mstack fix (`msChecked` gone; labels re-applied). Variant A additionally preserves the v20 `#draftTable2` custom-card opt-out; Variant B needs a browser check of the draft-board labels. DS makes no product edit.
