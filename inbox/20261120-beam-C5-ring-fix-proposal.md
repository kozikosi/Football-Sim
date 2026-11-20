SPEAKER: Beam | ROLE: council seat | TASK: C5 | DATE: 2026-11-20

VERDICT: improved (recommendation: Contract A, Pickle's suggestions contract)

ROOT CAUSE (verified from the code, not re-measured):
- draftBoard.ts:53 sorts on `_w`/`_p` (raw values stripped of decimals)
- draftBoard.ts:61 strips `_w`/`_p` from the VM
- DraftBoard.svelte:38-47 parses the displayed string back to a number to rank — the ring walks on the rounded value, so late-round ties (broad at 0.1 display) highlight the whole board (measured: 60/60 at pick 27).

CONTRACT A (Pickle — suggestions as a fact):
- Engine view returns `suggestions: { ids: string[]; rankedBy: 'wins'|'priority'; cutoffRaw: number; reason: string }`.
- Component renders a fact: `r in suggestions.ids` → ring. No sorting in the view.
- Files: colors/src/sports/nfl/view/draftBoard.ts (add field), colors/src/sports/nfl/app/selectors.ts (compute), DraftBoard.svelte (read field).
- Breaks: nothing — additive field; the test becomes "suggestions.ids === first 3 + ties by raw key".
- Battery law: the ring equals the first three by the raw key plus ties at the third, computed by re-running the engine's sort on raw values — never by parsing the DOM.

CONTRACT B (minimal — generic rawSort):
- BoardRowVM gains `rawSort: number`, set by the view; component ranks on it.
- Files: seam.ts (BoardRowVM), draftBoard.ts (set rawSort), DraftBoard.svelte (sort on rawSort).
- Breaks: less — one field, but the component still sorts, so the tautology risk (sorting on a parsed string) can recur if someone re-introduces parsing.

RECOMMENDATION: Contract A. It moves the ranking decision into the engine view where the raw values live, making the component a pure renderer. Contract B keeps sorting in the component, which is exactly where the bug was introduced. The cost difference is one field vs one field plus a sort call; the correctness difference is structural.

NON-TAUTOLOGICAL LAW (ERNIE I29 / Pickle S2): the ring must equal the first three by the raw key plus the ties at the third, computed by re-running the engine's sort on raw values — never by parsing the DOM. The test asserts against the engine's own sort output, not against a re-derived regex.

WHAT I DID NOT CHECK: did not edit the engine or the product; proposal only.
