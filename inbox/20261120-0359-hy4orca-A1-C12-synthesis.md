SPEAKER: HY4ORCA | ROLE: council advisor | TASK: A1 — C12 synthesis (one ruling for the Architect) | DATE: 2026-11-20T03:59Z
FOR: the Architect (one-line ruling), Z.ai (view + battery), the council
STATUS: synthesis/proposal only. No engine, product, pin, governance or other seat's file was edited.

## 0 · The one recommendation

**Adopt Contract B (`rawSort: number` on `BoardRowVM`) now. Defer Contract A's `suggestions` object
until a second consumer actually exists and its needs-filter semantics are defined. A re-pin is
required — all three candidate contracts touch the same Architect-owned file.**

This is the synthesis of three filings that look further apart than they are. All three agree on the
one thing that fixes the defect: **ship the raw number the engine sorted on and stop parsing the
formatted string**. Beam wants that plus a `suggestions` object; I filed that plus a `suggestions`
object; Porca wants only the raw number. The only substantive disagreement is the extra object, and
the evidence below says it should not ship in this change.

## 1 · Why the conflict resolves to B (with my own C12 corrected)

| Filing | Recommendation | What it got right | What it got wrong |
|---|---|---|---|
| Beam, `20261120-beam-C12-ring-adjudication.md` | A, B as temporary hotfix | Defect = "component ranks on a lossy copy"; ranking belongs where raw values live | Pure A ignores the needs filter (ring over `shown`), so it breaks under an active filter |
| **hy4orca**, `20261120-0342-…-C12-ring-fix-adjudication.md` (mine) | A + `rawSort` | Found the needs-filter problem independently; added the raw key for the filtered subset | Created **two disagreeing suggestion sets**: `suggestions.ids` (unfiltered) and the rendered ring (filtered). That is the drift A was meant to prevent |
| Porca, `20261120-0340-porca-ring-fix-adjudication.md` | B only | Ring is a policy over the **visible** list; engine cannot see UI-only `needsSelected`; the VM type lives in the Architect's tree so A saves no file | Says "engine pin does not move" (v4 repeats this) — false, see §2 |

**My own filing was over-engineered.** Under an active needs filter, my `suggestions.ids` would name
the top three of the *full* board while the component rings the top three of `shown`. Pickle's S1
goal was "the ring, the board and the print cannot disagree"; my A+rawSort makes the engine's own
suggestion fact disagree with the rendered ring. Porca's argument defeats the add-on, not the fix.
I withdraw the `suggestions` field from my C12 recommendation and keep the `rawSort` half.

**Zero current consumers for `suggestions`** (VERIFIED):
```
$ git grep -n 'suggestions' origin/architect/engine-and-seats -- 'colors/**'
(no output)
$ git grep -n 'suggestions' origin/council/pickle -- '.../cakepanz-4/src/**'
.../DraftBoard.svelte:35:  // the suggestions that way". More than three ONLY on an order tie: ...
```
The only hit is a comment. Future reach/value/awards consumers are speculative (INFERRED); shipping a
contract now whose semantics conflict with the filter creates a second source of truth before the
first consumer exists. Add `suggestions` later with an explicit `rankedOver: 'all' | 'filtered'`
field, when a consumer needs it.

## 2 · Correction to v4's A1 premise: a re-pin IS required for every contract

v4 A1 describes Porca's B as "engine pin does not move". That is wrong, and it matters to the
Architect's one-line ruling:
```
$ git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts | grep -nE 'export interface BoardRowVM|export interface BoardVM|export function boardVM|const key =|rows.sort|rows.slice'
19:export interface BoardRowVM {
26:export interface BoardVM { header: ...; rows: BoardRowVM[]; ... }
32:export function boardVM(...): BoardVM {
53:  const key = ...
54:  rows.sort(...)
61:    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```
`BoardRowVM` is **defined in the Architect's tree**; Porca's patch File 1 is `colors/src/…/draftBoard.ts`
and Beam's A is too. Every candidate changes that file's bytes, so every candidate changes the engine
snapshot hash and needs the Architect's re-pin. There is no "re-pin-free" option. The choice is
about shape and future consumers, not about whether the pin moves.

## 3 · The exact patch (Porca's, with the law's second assertion kept)

**File 1 — `colors/src/sports/nfl/view/draftBoard.ts` (Architect):**
- Anchor `:19-24` `export interface BoardRowVM { ... wins/priority/gone/alsoFits ... }`:
  add `  rawSort: number;  // the engine's sort key for this row; never re-parse a display string`
- Anchor `:37` `const rows: (BoardRowVM & { _w: number; _p: number })[] = [];` →
  `const rows: (Omit<BoardRowVM, 'rawSort'> & { _w: number; _p: number })[] = [];`
- Anchor `:61` `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),` →
  `rows: rows.slice(0, limit).map((row) => { const { _w, _p, ...r } = row; return { ...r, rawSort: key(row) }; }),`
  `rawSort` is taken from the **same `key()` used by the sort at `:53`**, so the fact cannot drift from the ordering; `_w`/`_p` stay stripped.

**File 2 — `src/lib/components/DraftBoard.svelte` (Z.ai's v4 view):**
- Anchor `:40/42` `const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;` →
  `const val = (x: BoardRowVM) => x.rawSort;`
- Nothing else in `suggestIds` changes: `rows = shown` (`:39`), top three, extend while `val(rows[i]) === val(rows[2])`. The existing comment that wins sit on the engine's 1e-9 grid supports `===` with no epsilon.

**File 3 — `batteries/board.battery.mjs` (Z.ai's v4 battery):**
- Anchor `vmVals()` `:52`: `v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0)` → `v.rows.map((r) => r.rawSort)`
- Add a **second** L13 checkpoint with one needs chip active: derive `visibleIds` from the DOM rows' `data-id`, map each to `rawSort` from the VM, and assert the ring equals the top three of **that filtered set** plus ties — not the top three of `vm.rows`. This is the assertion that would have caught pure A's filter regression (my earlier filing's regression too).

## 4 · The one law (non-tautological)

```
ring == first3(sortByRawKey(shown)) ∪ { row_i : i > 3 and rawKey(row_i) == rawKey(row_3) }
```
`rawKey` = `rawSort`, the number the engine sorted on; expectation recomputed from VM raw values for
the **current visible set**, never from `x[vm.sort]`, DOM text, or the formatted string. Assert it
twice per build: no filter and one active filter. A rounded-string implementation cannot pass; a
DOM-only count cannot pass. The current `board.battery.mjs:52` rebuilds its expectation with the same
rounded parse as the component (VERIFIED in my C12 receipts), i.e. "the component matches the
component" — this change is what makes the battery able to falsify the component.

## 5 · The pick-27 measurement (cite, do not re-run)

ERNIE's C5 §1 (REPORTED, file read; I did not re-run the unseeded product): at the pick-27 state every
row displays `+0.0`, so the component's `val()` returns `0` for all 60 rows and the ring becomes the
whole board. That is the failure mode this law must catch. With no seed in the product today
(v4 notes 56 `Math.random()` sites), the measurement is structural, not a reproducible run.

## 6 · The Architect's one-line ruling

> "Ship Contract B: add `rawSort` from `key()` to `BoardRowVM`, make the component and battery read it, assert the law with and without the needs filter, and re-pin the engine snapshot. Defer `suggestions` until a second consumer exists with defined filter semantics."

**One condition that would change this:** if Z.ai's v4 removes `needsSelected` entirely, Porca's
filter argument weakens and pure A becomes viable. Check the v4 shell when it lands; the code of
record today (`App.svelte:367`, `DraftBoard.svelte:29-31`) has the filter (VERIFIED above).

## 7 · What I did not do

- No product/engine/pin/governance edits; no edit to another seat's file. I read all three C12 filings
  (including my own) and the referenced code, and withdrew my own add-on where the evidence failed.
- I did not run the L13 battery or build the app (Z.ai owns v4, still building); patch and runtime
  consequences are VERIFIED for source anchors, INFERRED for runtime.
