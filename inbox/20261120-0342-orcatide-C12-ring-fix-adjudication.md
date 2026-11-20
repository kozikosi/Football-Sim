SPEAKER: orcatide | ROLE: council advisor | TASK: C12 — adjudicate the ring-fix proposals | DATE: 2026-11-20T03:42Z

From the v2 council sitting (2026-11-20). Read first: Ernie's C5 proposal, Pickle's earlier `suggestIds` variant (the cakepanz-4 copy of `DraftBoard.svelte`), the c10 view `draftBoard.ts`, the parse site, and the board battery. Nothing was run and nothing was edited — reads only (receipts in WHAT I RAN).

## Adjudication — build A: `suggestions` from the engine view

The defect: the component ranks on a lossy copy of the values it renders — `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0` (Pickle's `suggestIds`, cakepanz-4 copy of `DraftBoard.svelte`); at pick 27 every row prints `+0.0` (Ernie's observation), so the ring is the whole board. The view already sorts with the raw values at `colors/src/sports/nfl/view/draftBoard.ts:53` and still holds them before the strip at `:61`, so the ring is a view fact: `vm.suggestions = { ids: string[]; rankedBy: BoardSort; cutoffRaw: number; reason: 'top3' | 'tie' | 'none' }`.

Cost/risk: A costs one field on `BoardVM`, ~10 lines in the view (the ring), ~10 lines out of the component (it renders `vm.suggestions.ids`), and a battery update in the same commit. Risk: touches `colors/src/**` — B does too; B is Ernie's one-commit hotfix if the Architect wants a temporary fix before pinning A ("file it as temporary and put A on the next pin"). A wins: the ranking lives where the raw values live, the component cannot disagree with the engine, and the same fact can serve the "why" hint (cutoffRaw + reason) and later surfaces (reach/value/awards). I build A; B remains the fallback Ernie describes.

## The exact patch (proposed — the Architect integrates; nothing in this file is applied, and no `colors/**` or engine file is edited by council)

1. `colors/src/sports/nfl/view/draftBoard.ts` — architect branch, c10 build (pin `408410477`):
   - New type after `BoardVM`: `export interface BoardSuggestions { ids: string[]; rankedBy: BoardSort; cutoffRaw: number; reason: 'top3' | 'tie' | 'none' }`
   - `BoardVM` gains `suggestions: BoardSuggestions` — anchor `export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; footer: { filled: number; total: number; text: string }; sort: BoardSort }` → same with `; suggestions: BoardSuggestions` added.
   - In `boardVM()`, after `rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));` (line 54), add:
     ```ts
     const ids: string[] = [];
     const base = Math.min(3, rows.length);
     for (let i = 0; i < base; i++) ids.push(rows[i].id);
     const third = base === 3 ? key(rows[2]) : 0;
     if (base === 3) for (let i = 3; i < rows.length && key(rows[i]) === third; i++) ids.push(rows[i].id);
     const suggestions: BoardSuggestions = { ids, rankedBy: sort, cutoffRaw: third, reason: rows.length < 3 ? 'none' : ids.length > 3 ? 'tie' : 'top3' };
     ```
     (`key` at line 53 is the raw-value sort; the strip at line 61 is unchanged.)
   - The return object gains `suggestions,`.
2. The component (the parse): delete the `suggestIds` block in the cakepanz-4 copy (`origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte`, lines 38-49) and change the row call `suggest={suggestIds.has(r.id)}` → `suggest={vm.suggestions.ids.includes(r.id)}` (the render copy `origin/gh-pages:67-cakepanz/src/lib/components/DraftBoard.svelte` has no ring; align when integrating).
3. `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/batteries/board.battery.mjs` (L13, lines 86-99): `vmRead()` (line 48) returns `v ? { sort: v.sort, ids: v.rows.map((r) => r.id), suggestions: v.suggestions } : null`; the expectation becomes `const expected = vm.suggestions.ids` — delete `const vals = await vmVals(); const third = vals[2]; const expected = vm.ids.slice(0, 3);` and the loop `for (let i = 3; i < vm.ids.length && vals[i] === third; i++) expected.push(vm.ids[i]);`; `vmVals` is deleted; the law assertion stays: `suggestRead() == vm.suggestions.ids`.

## The law (C5 §4)

```
ring == first3(sortBy(rawKey)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }
```

`rawKey` is the raw numeric the engine sorted on (`r._p` for priority, `r._w` for wins, `Number(r.ovr)` for OVR), recomputed by re-running the view's sort — never by parsing the DOM or the formatted string. Under A the law holds: the view computes the ring with `key()` on the raw values and the battery asserts `suggestRead() == vm.suggestions.ids`.

## What the view needs for the "why" clause (optional, from C5 §5)

`cutoffRaw` (the third row's raw value) and `reason` ('top3' | 'tie' | 'none'); e.g., a future "why": "last of the ring at +2.3 wins; ties extended".

## WHAT I RAN (receipts; every read, no product behavior run)

- `git show origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md` — VERIFIED: Ernie's two contracts; recommends A; the law (C5 §4).
- `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte` — VERIFIED: the `suggestIds` parse, lines 38-49.
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts` — VERIFIED: `key` at line 53, the strip at line 61 (65 lines).
- `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/batteries/board.battery.mjs` — VERIFIED: L13, `vmRead` line 48, `vmVals` line 52, `suggestRead` line 55, the ring block lines 86-99.
- `git show origin/gh-pages:67-cakepanz/src/lib/components/DraftBoard.svelte` — VERIFIED: the render copy (40 lines; no ring).

## WHAT I FOUND (labelled)

- The sitting's pointer to Pickle's earlier variant — `inbox/20261120-0200`-era, P-345 S1 — was not located in the trees searched; UNKNOWN. The Pickle variant I read is the `suggestIds` ring; the sitting's description of it matches.
- Ernie's claim "at pick 27 every row prints `+0.0` so `val()` returns 0 for all 60" — REPORTED (Ernie's observation; not reproduced).
- Both proposals are `suggestions`-shaped; B = `rawSort` on the VM.

## WHAT I DID NOT CHECK (UNKNOWNs)

- No battery run; the patched view/components/battery behavior is unverified — the Architect applies, the battery asserts the law after.
- Whether Z.ai's C18 battery (`.cp-suggest` rows at pick 1) asserts the same law — the sitting's law is what I propose.
- I did not re-run the c10 repair rehearsal, the doc-fix md5s, the canary, npm ci, the 390 px check or the smoke — not my item; already-done per the sitting's corrections.

## Done when (C12)

One recommendation (A), one patch (above), one law (C5 §4). Do not edit the engine or `colors/**`.
