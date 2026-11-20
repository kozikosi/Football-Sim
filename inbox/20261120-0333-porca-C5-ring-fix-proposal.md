SPEAKER: PORCA | ROLE: advisor | TASK: C5 | DATE: 2026-11-20T03:33Z

# C5 — the ring fix: two contracts, one recommendation, one law (design, not build)

VERDICT: ok — the root cause is confirmed in source; the decision reduces to one shape choice.

## ROOT CAUSE (VERIFIED — read both sides)

- `colors/src/sports/nfl/view/draftBoard.ts:53` sorts on raw `_w` / `_p`.
- `:61` strips them before shipping the VM: `rows.slice(0,limit).map(({_w,_p,...r}) => r)`.
- `DraftBoard.svelte:38-47` (pickle's c9) rebuilds the rank from the *display string*:
  `const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0`, then takes the first
  three and extends while `val(rows[i]) === third`. Rounded-string ties therefore ring up to 60 rows.
  The ring is a view decision made from a lossy display value; it must be made from the raw key.

## CONTRACT A — `suggestions` (Pickle's shape)

Engine view returns, on `BoardVM`: `suggestions: { ids: string[]; rankedBy: BoardSort; cutoffRaw: number; reason: string }`.
- **Files:** `view/draftBoard.ts` (compute from `_w`/`_p` before the strip), cakepanz port `seam.ts`
  (add the field to the VM type), `DraftBoard.svelte` (delete the local `suggestIds` derivation; use
  `vm.suggestions.ids`).
- **Breaks:** every `BoardVM` producer must supply the field; a non-NFL sport must supply a default;
  `reason` becomes product copy that must be kept in step with the visual treatment.
- **Battery law:** ring set equals `vm.suggestions.ids` exactly; the engine-side oracle below proves
  those ids correct. Two-layer law (engine computes truth, component renders a fact).

## CONTRACT B — generic `rawSort` (minimal)

Add `rawSort: number` to `BoardRowVM`, set from the active key in the view before the strip; the
component ranks on `r.rawSort` instead of the parsed string.
- **Files:** same three. No new top-level object; the existing `vm.sort` switch stays the single
  source of which key is active.
- **Breaks:** exposes one raw engine number to the view-model (the view-model already carried `_w`/`_p`
  internally, so this is a rename-and-keep, not a new leak); `rawSort` must be recomputed whenever
  `sort` changes; ties need the same id tiebreak as `:54`.
- **Battery law:** ring set equals the raw-key oracle below. One-layer law, easier to state and to
  fail loudly.

## RECOMMENDATION (one paragraph)

Build against **B** for the fix. The defect is precisely a lossy re-derivation of a value the view
already had; the smallest correct change is to hand that value over unchanged and delete the parse.
B keeps the component generic over `vm.sort` (the sort key already selects the raw column), needs no
new coupled object, and makes the law identical to the engine's own sort law. Choose A instead only
if the ring is about to become a product-level concept with its own copy, cutoff explanation and
other surfaces — then `reason`/`cutoffRaw` earn their keep. The Architect decides; this is one
advisor's preference, not an instruction.

## THE NON-TAUTOLOGICAL LAW (must not parse the DOM)

Compute the expected ring independently from the **raw** keys, never from rendered text:

```
const keyOf = (r) => sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w;
const sorted = [...rows].sort((a,b) => keyOf(b) - keyOf(a) || (a.id < b.id ? -1 : 1));
const cutoff = keyOf(sorted[2]);
const expected = sorted.filter((r,i) => i < 3 || (i >= 3 && keyOf(r) === cutoff)).map(r => r.id);
```

The battery compares `expected` to the VM-supplied ring ids (A: `vm.suggestions.ids`; B: the component
set derived from `rawSort`). Because `expected` is built from `_w`/`_p` in the engine view and the
assertion reads the VM/prop — not `.cp-suggest` nodes — a rounded-string implementation cannot make
the test pass. A DOM-based assertion would be tautological here: it would measure the same parse it
is meant to catch.

**Migration:** add the field to `BoardVM` and the port type, delete the local derivation, then
re-record the *dist* hash (`76de5658…` changes); the **engine pin `d3bd81d2` does not move** — this is
a view change, not an engine change. Do not re-measure the C′1 ring a fourth time (fence).

## WHAT I DID NOT CHECK

- I did not run the battery or build the component (design proposal only); the parse line numbers are
  read from the c9 tree, not executed.
- I did not inspect Z.ai's in-flight T8 view work; his build owns the cakepanz changes.
