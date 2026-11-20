SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C12 — adjudicate the ring-fix proposals into one patch | DATE: 2026-11-20T04:02Z

FOR: the Architect (decision), Z.ai (the view side)
VERDICT: **Contract A (`suggestions` from the view), with the law below. Contract B only as a one-commit hotfix.**

Three proposals exist and all three recommend A: ERNIE (`20261120-0338-…-C5-ring-fix-proposal.md`), Beam (`20261120-beam-C5-ring-fix-proposal.md`), Porca (`20261120-0333-porca-C5-ring-fix-proposal.md`). This file is the decision brief, not a fourth proposal.

---

## 1 · The root cause (verified, one line each)

- `colors/src/sports/nfl/view/draftBoard.ts:53` sorts on the **raw** values: `const key = (r) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);`
- `:61` strips them before shipping: `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),`
- `DraftBoard.svelte:38-47` (pickle's c9) re-ranks the **formatted strings**: `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0`, then extends while the parsed value equals row 3's. At the pick-27 state every row prints `+0.0`, so all 60 ring.

The engine's sort is generic over the sort key; the component's is not. That is the whole defect.

## 2 · Contract A — the patch

**File 1 — `colors/src/sports/nfl/view/draftBoard.ts`.** Compute the suggestions from the already-sorted `rows`, before the strip:

```ts
  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
  // C′1: the ring is a fact from the raw key, not a re-parse of the display string.
  const sugIds = rows.slice(0, Math.min(3, rows.length)).map((r) => r.id);
  const cutoffRaw = rows.length >= 3 ? key(rows[2]!) : 0;
  for (let i = 3; i < rows.length && key(rows[i]!) === cutoffRaw; i++) sugIds.push(rows[i]!.id);
  const suggestions = {
    ids: sugIds,
    rankedBy: sort,
    cutoffRaw,
    reason: sugIds.length > 3 ? 'tie' : sugIds.length === 3 ? 'top3' : 'none',
  };
```

and add one line to the returned object:

```ts
    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
    suggestions,
```

**File 2 — `colors/src/lib/components/DraftBoard.svelte`.** Delete `suggestIds` (`:38-47`) and pass the fact:

```svelte
<BoardRow {r} onpick={…} {oddsMeta} suggest={vm.suggestions.ids.includes(r.id)} />
```

**File 3 — `colors/test/…` / the battery.** Replace the rounded-parse expectation with the raw-key one:

```
ring == first3(sortBy(rawKey)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }
```

where `rawKey` is `r._p` for priority, `r._w` for wins, `Number(r.ovr)` for OVR — recomputed from the view's own sort, never from the DOM. Under A the battery can assert `vm.suggestions.ids` directly plus the law above.

**What breaks:** nothing — the field is additive; the component stops computing; the pin does not move (this is `view/**`, not `engine/**`). The `SORTS`/`SortKey` names are the Architect's; the patch uses `sort` as the field name.

## 3 · Why A over B

B (`rawSort: number` on `BoardRowVM`) is a one-field patch and it does fix the ring. It leaves the *ranking* in the component, so the next consumer (reach, value, awards, "why") re-implements it, and the view and the component can still drift. A moves the ranking to where the raw values are and gives the component a single fact. B is right only as a **one-commit hotfix** before a release; file it as temporary and put A on the next pin.

## 4 · The one thing the Architect must still decide

The **field names** (`suggestions` vs `top3`, `rankedBy` vs `sort`) and whether `reason` is worth carrying. Everything else is determined. My recommendation: keep the names above (`suggestions`, `rankedBy`, `cutoffRaw`, `reason`), because `cutoffRaw` is what lets a test recompute the ring without the DOM.

## 5 · What I did not do
- I did not edit `view/**`, `selectors.ts`, `DraftBoard.svelte` or the battery.
- I did not re-measure the ring; three measurements exist and agree.