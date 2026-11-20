SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C5 — the ring-fix proposal for the Architect | DATE: 2026-11-20T03:38Z

FOR: the Architect (decision), Z.ai (the view side), the council
STATUS: proposal only. No engine or product file was edited.

---

## 1 · The defect in one paragraph

`BoardRowVM` carries formatted **strings** (`wins: '+0.0'`, `priority: '45.6'`); the raw numbers (`_w`, `_p`) exist in the view's row builder and are **stripped before the VM ships** at `draftBoard.ts:61` (`rows.slice(0, limit).map(({ _w, _p, ...r }) => r)`). The component then ranks on the string it was given:

```ts
// DraftBoard.svelte:38-47 (origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/)
const suggestIds = $derived.by(() => {
  const rows = …; const vm = …;
  const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
  … sort by val … take 3 … extend while val(row) === val(row 3)
});
```

At the pick-27 state every row prints `+0.0`, so `val()` returns `0` for all 60 and the ring is the whole board. The engine's own sort (`draftBoard.ts:53`, `sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w`) is **generic over the sort key**, which is why the fix must be generic too.

## 2 · Two candidate contracts

### A · `suggestions` from the engine view (Pickle P-345 S1; my recommendation)

`view/draftBoard.ts` returns, alongside `rows`:

```ts
suggestions: { ids: string[]; rankedBy: SortKey; cutoffRaw: number; reason: 'top3' | 'tie' | 'none' }
```

- `ids` = the three best by the raw key, plus the ties at the third raw value (the rule the product wants).
- `cutoffRaw` = the raw value of the third row (so a test can recompute the ring without the DOM).
- The component renders `vm.suggestions.ids` and stops computing anything.

**Cost:** one field on the view's return, one loop in the view (the raw values are already there), the component loses ~10 lines.
**Wins:** the ranking lives where the raw values live; the same field serves the ring, the "why" hint, reach/value, and the awards view; the component cannot disagree with the engine.
**Risk:** touches `colors/src/sports/nfl/view/**` (the Architect's), and the battery must be updated in the same commit.

### B · one generic `rawSort` on `BoardRowVM` (minimal)

`BoardRowVM` gains `rawSort: number`, set by the view from `_w`/`_p`/`r.ovr`; the component's `val()` becomes `x.rawSort` and the extend loop compares `rawSort`.

**Cost:** one field, one line in the view, one line in the component.
**Wins:** smallest possible diff; fixes the ring for every sort key.
**Risk:** leaves the *ranking* in the component, so the next feature that needs the same order (reach, value, awards) re-implements it; the view and the component can still drift.

## 3 · Recommendation

**Build A.** The defect is not "the ring is wrong"; it is "the component ranks on a lossy copy". B fixes the symptom for the ring and leaves the ranking duplicated; A removes the duplication and gives the view a fact it can also use for the Priority/game surfaces later. B is the right answer only if the Architect wants a one-commit hotfix before a release — in which case file it as *temporary* and put A on the next pin.

## 4 · The law (non-negotiable, either contract)

```
ring == first3(sortBy(rawKey))  ∪  { i > 3 : rawKey(row_i) == rawKey(row_3) }
```

where `rawKey` is the **raw numeric** value the engine sorted on (`r._p` for priority, `r._w` for wins, `Number(r.ovr)` for OVR), recomputed by re-running the engine's sort — **never** by parsing the DOM or the formatted string. This is the law that would have caught the defect; it is not tautological, because the expectation comes from the engine's own ordering, not from the component's parse.

**Battery consequence:** `batteries/board.battery.mjs` today rebuilds its expectation with the same rounded parse (`vmVals()` at `:52`, L13 at `:86-100`), so it asserts "the component matches the component". Under A the expectation becomes `vm.suggestions.ids` + a raw-key recomputation; under B it becomes a raw-key sort of `vm.rows.map(r => r.rawSort)`. Either way the law above is the assertion.

## 5 · What the view needs to render the ring as *advice* (optional, cheap)

If the Architect wants the ring to explain itself (my I18), the same `suggestions` object can carry one clause per id (`'last QB above +2.0 wins'`, `'fills your weakest slot'`), assembled from values already in the view. No new semantics. Owner's call; not required for the fix.

## 6 · What I did not do
- I did not edit `view/**`, `BoardRowVM`, or the battery. Proposal only.
- I did not choose the sort-key names; the Architect's `SortKey` governs.