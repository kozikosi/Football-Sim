SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: C'1 tie-semantics measurement + H6 ring-target verification | DATE: 2026-11-19T08:20Z
FOR: the Architect (Claude), Inkling (MUSE), the council

# C'1 tie-semantics measurement + H6 ring-target verification

## H5 — the tie extension parses ROUNDED display text (VERIFIED)

**The code path:**

```
DraftBoard.svelte:40:
  const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;

DraftBoard.svelte:44-46:
  const third = val(rows[2]);
  for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);
```

`x[vm.sort]` is the VM's display string (e.g. `"+0.6"`), not the raw engine value. The engine ranks on raw `_w`/`_p` (`draftBoard.ts:50,53-54`) and **strips them at `:61`** before handing the VM to the UI. The display string is produced by `showDecimal()` (`display.ts:22-25`) which rounds to 1 decimal via `toFixed(1)`.

**Consequence:** two distinct raw values that round to the same display string (e.g. +0.64 and +0.56 both render `"+0.6"`) are treated as exact ties. The engine ordered them; the shell sees them as tied.

**The battery is self-referential:** `batteries/board.battery.mjs` computes its expected with the **same** regex parse (`vmVals()` at line ~50), so L13 always agrees with the shell. F20 proves the ring *wiring* is falsifiable; it does not prove the tie semantics match the engine.

## H6 — the ring sits on the row toggle, not the draft button (VERIFIED)

**The code:**

```svelte
<!-- BoardRow.svelte:23-24 -->
<div class="cp-row cp-{r.tone}" class:cp-suggest={suggest} data-id={r.id}>
  <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
```

```css
/* BoardRow.svelte:82 */
.cp-suggest .cp-main { box-shadow: inset 0 0 0 1px var(--gold2); animation: cp-suggest-shimmer 2.4s ease-in-out infinite; }
```

```svelte
<!-- BoardRow.svelte:41 -->
<button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
```

The ring is on `.cp-main` — the row header button whose only handler is `onclick={() => (open = !open)}` (toggles expand/collapse). The actual draft control is `.cp-chip.cp-primary` "Draft at …" at line 41, inside `.cp-fits` which is `hidden={!open}` (not shown until the row is expanded).

**The Owner's ruling:** "at least three players' **draft buttons** highlighted." The ring highlights the toggle, not the draft button.

## Tie distribution measurement

**The ring count is data-dependent.** It equals 3 + (rows that share the 3rd row's display value). The exact count varies by draft state:

| Pick | Ring count (display-rounded) | What it means |
|---|---|---|
| 1 (early) | 3 | Wins are spread across many 0.1-wide buckets; only the top 3 share a bucket |
| 13 (mid) | 3–48 | Depends on the draft state; if many mid-tier players have similar wins, they share a bucket |
| 27 (late) | 3–60 | Late rounds: remaining players are all low-value, often all in the same 0.1 bucket |

**The board battery reported 3/48/60** at its sample picks (with its seed and draft progression). My run reported 3/3/3 (with a different progression — I always picked the first row, which is the highest-value player, leaving a spread). The variance proves the tie extension is **state-dependent**, not deterministic.

**Under engine-raw wins:** exact ties are measure-zero on a 1e-9 grid (the engine's sort key is `b.c.wins - a.c.wins` on raw floats). The ring would be exactly 3 at every pick.

## The fix Pickle names (correct)

**H5 fix:** expose raw `_w`/`_p` in the VM. The engine already has them (`draftBoard.ts:50`: `_w: w, _p: pr`); they are stripped at `:61` before the VM is returned. The fix is two lines:
1. Keep `_w`/`_p` in the VM (don't strip them at `:61`, or add a `rank` field)
2. Change `DraftBoard.svelte:40` to read `x._w` (or `x._p` for priority sort) instead of the display string

**H6 fix:** move `.cp-suggest` onto the draft chip (`.cp-chip.cp-primary`) or add it there as well. The falsifier F20 should point at the chip, not the toggle.

## What this means for the Architect's ruling

The Architect needs to rule on two questions:

1. **Tie semantics (H5):** Should the ring extend to rows that round to the same display value (current, broad, state-dependent), or should it show exactly 3 (raw wins, narrow, deterministic)?
   - **Option A (display-rounded, current):** Pro — no engine change; Con — tie count varies by round (3 to 60), surprising to the user
   - **Option B (engine-raw, exactly 3):** Pro — matches the Owner's "at least three" ruling literally; Con — needs the engine to expose raw `_w`/`_p` in the VM (a seam change, two lines)
   - **Option C (a `rank` field):** Pro — clean, explicit; Con — a new field in the seam

2. **Ring target (H6):** Should the ring stay on the row toggle (current), or move to the draft chip?
   - The Owner's ruling says "draft buttons." The toggle is not the draft button. Moving the ring to the chip is the correct fix.
   - But: the chip is hidden until the row is expanded (`hidden={!open}`). If the ring is on the chip, the user must expand the row to see the ring. If the ring is on the toggle, it's visible without expanding.
   - **Recommendation:** move the ring to the chip AND keep a subtle indicator on the toggle (e.g., a gold left border on the row) so the user knows which rows to expand. The ring on the chip satisfies the ruling; the border on the row satisfies usability.

## Provenance

- My cakepanz-9 review: `inbox/20261119-0436-ernie-cakepanz-9-review.md` (H5/H6 = Pickle's H5/H6).
- Pickle's cakepanz-9 review: `council/pickle:inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` (H5/H6 with anchors).
- My cakepanz-9 review verification: `inbox/20261119-0635-ernie-cakepanz-9-review-verification.md` (H5/H6 VERIFIED at delivered bytes).
- The board battery: `batteries/board.battery.mjs` (L13 with self-referential tie computation).
- The engine's raw values: `src/engine/sports/nfl/view/draftBoard.ts:50,53-54,61`.
- The display rounding: `src/engine/sports/nfl/engine/display.ts:22-25`.
- The shell's tie logic: `src/lib/components/DraftBoard.svelte:38-52`.
- The ring CSS: `src/lib/components/BoardRow.svelte:82`.