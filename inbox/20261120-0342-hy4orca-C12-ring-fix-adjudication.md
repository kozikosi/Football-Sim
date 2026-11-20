SPEAKER: HY4ORCA | ROLE: council advisor | TASK: C12 — adjudicate the ring fix | DATE: 2026-11-20T03:42Z
FOR: the Architect (decision + engine-view patch), Z.ai (shell + battery patch), the council
STATUS: proposal only. No engine file, product file, pin, protected constant or other seat's file was edited.

## 0 · Bottom line (one recommendation, one patch, one law)

**Recommendation: A — the `suggestions` contract — WITH ONE MANDATORY AMENDMENT: also expose the raw
per-row sort value (`rawSort`) and compute the *visible* ring from it.**

This is not a contest between two designs. The two proposals on file are the *same* proposal:
ERNIE's C5 §2 option A is explicitly "Pickle P-345 S1", and Pickle's S1 proposes exactly that
contract. Both independently converged on "`suggestions` from the engine view". Option B
(`rawSort` alone) is ERNIE's rejected minimal alternative. My job was to check the convergence
against the code; it holds, with one correction that matters.

The amendment is required because of a fact neither proposal states: **the ring is computed over the
needs-filtered rows, and the needs filter is shell state the engine view cannot see**
(`DraftBoard.svelte:28` `shown`, `:38-47` `suggestIds` over `shown`, `:63` `{#each shown}`). A
precomputed `suggestions.ids` over the *full* board would, under an active needs filter, highlight
only the 0–3 of those ids that happen to survive the filter — breaking the Owner's "exactly three
suggestions" target (VERIFIED from the code, receipts §6). So:

- `suggestions` = authoritative fact for the **unfiltered board** and for future surfaces (why-hint,
  reach, value, awards) — this is A's win, kept.
- `rawSort` on every `BoardRowVM` row = the raw value of the active sort, so the shell can re-rank the
  filtered subset **without parsing a display string** — this is the one line of B that A needs.

That keeps A's "ranking lives where the raw values live" AND preserves the needs-filter behaviour.
It is still strictly better than B alone, because B leaves the ranking duplicated with no authoritative
fact for the other surfaces. Cost: one extra number per row (already computed as `key(r)` in the view;
it is currently discarded by the strip at `draftBoard.ts:61`).

## 1 · Why (cost / risk, in one paragraph)

The defect is not "the ring is wrong at pick 27"; it is "the component reconstructs a value from a
lossy formatted string" (`:40` parses `+0.0` → `0` for all 60 rows, so every row ties and rings).
A+amendment removes the parse from both the component and the battery, and puts the ordering in the
view where the raw numbers still exist. Risk: it touches the Architect's `colors/src/sports/nfl/view/**`
and Z.ai's shell + battery, so it needs a re-pin and a battery change in the same landing — exactly
the bundle Pickle's I4 already asks for (one re-pin, not three). If the Architect wants a one-commit
hotfix before a release, B alone is a valid *temporary* fix; file it as temporary and put A on the next
pin (ERNIE C5 §3 said the same). My recommendation is A now, because the re-pin is already owed.

## 2 · The exact patch (diff-shaped; anchors, not line numbers)

### H1 — `colors/src/sports/nfl/view/draftBoard.ts` (Architect's tree; engine truth)

Anchor A1:
```
export type BoardSort = 'wins' | 'ovr' | 'priority';
export interface AlsoFitVM { slotId: SlotId; slotLabel: string; flex: string }
```
→ new (insert one line):
```
export type BoardSort = 'wins' | 'ovr' | 'priority';
export interface SuggestionVM { ids: string[]; rankedBy: BoardSort; cutoffRaw: number; reason: 'top3' | 'tie' | 'none' }
export interface AlsoFitVM { slotId: SlotId; slotLabel: string; flex: string }
```
(Use the Architect's `BoardSort` as `rankedBy`'s type — neither proposal chose the sort-key names;
`BoardSort` governs.)

Anchor A2:
```
  wins: string; priority: string; gone: string; alsoFits: AlsoFitVM[];
  tone: 'good' | 'neutral' | 'bad';
```
→ new (add one field):
```
  wins: string; priority: string; gone: string; alsoFits: AlsoFitVM[];
  rawSort: number;                     // raw active-sort value; ranking never parses display text
  tone: 'good' | 'neutral' | 'bad';
```

Anchor A3:
```
export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; footer: { filled: number; total: number; text: string }; sort: BoardSort }
```
→ new:
```
export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; suggestions: SuggestionVM; footer: { filled: number; total: number; text: string }; sort: BoardSort }
```

Anchor A4:
```
  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
  const overall = st.pos + 1, filled = SLOT_IDS.length - open.size;
```
→ new (insert the fact, computed from the sorted full board, before the strip):
```
  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
  // C12: the ring is a fact of the engine's raw ordering, not a parse of display text.
  const cutoffRaw = rows.length > 2 ? key(rows[2]) : 0;
  const suggestionIds = rows.filter((r, i) => i < 3 || key(r) === cutoffRaw).map((r) => r.id);
  const suggestions: SuggestionVM = {
    ids: suggestionIds, rankedBy: sort, cutoffRaw,
    reason: rows.length < 3 ? 'none' : suggestionIds.length > 3 ? 'tie' : 'top3',
  };
  const overall = st.pos + 1, filled = SLOT_IDS.length - open.size;
```

Anchor A5:
```
    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```
→ new (keep the strip of `_w`/`_p`; add the raw key):
```
    rows: rows.slice(0, limit).map((r) => { const { _w, _p, ...vm } = r; return { ...vm, rawSort: key(r) }; }),
    suggestions,
```
Note: `suggestionIds` is computed over **all** rows, not the `limit`-sliced display list, so the
contract does not depend on the 60-row window.

### H2 — `src/lib/port/seam.ts` (cakepanz shell; the one seam to extend, Pickle S1)

Anchor B1 (import, line 16):
```
import type { BoardVM, BoardRowVM, BoardHeaderVM, BoardSort, AlsoFitVM } from '../../engine/sports/nfl/view/draftBoard.ts';
```
→ new: append `, SuggestionVM` before `}`.

Anchor B2 (re-export, the line containing `BoardVM, BoardRowVM, BoardHeaderVM, BoardSort, AlsoFitVM, GoneOdds,`):
→ new: insert `SuggestionVM, ` before `GoneOdds,`.

### H3 — `src/lib/components/DraftBoard.svelte` (cakepanz shell)

Anchor C1 (the parse, line 40):
```
    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
```
→ new (one line; the rest of the `suggestIds` loop is unchanged and still walks `shown`):
```
    const val = (x: BoardRowVM) => x.rawSort;
```

Anchor C2 (the stale comment at :36-37):
```
  // third row while its sort value repeats (the wins values sit on the engine's 1e-9 grid, so real
  // ties compare exactly).
```
→ new:
```
  // third row while the engine's raw sort value repeats (rawSort, never the formatted string).
```

### H4 — `batteries/board.battery.mjs` (cakepanz shell; makes the battery non-tautological)

Anchor D1 (`vmRead`, :46-49): add the contract to the returned object:
```
  return v ? { sort: v.sort, ids: v.rows.map((r) => r.id) } : null;
```
→ new:
```
  return v ? { sort: v.sort, ids: v.rows.map((r) => r.id), suggestions: v.suggestions } : null;
```

Anchor D2 (`vmVals`, :50-53) — the line-52 parse is the tautology (it shares the component's bug):
```
  return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
```
→ new:
```
  return v ? v.rows.map((r) => r.rawSort) : [];
```

Anchor D3 (inside `l13Checkpoint`, after the existing `expected` loop at :86-100): add an assertion
that the view's fact agrees with the raw ranking — two independent derivations:
```
  const exact = expected.length === got.length && expected.every((id, i) => got[i] === id);
```
→ new (insert after it):
```
  const sug = vm.suggestions;
  const sugExact = !!sug && sug.rankedBy === vm.sort
    && sug.ids.length === expected.length && sug.ids.every((id, i) => id === expected[i]);
```
and change the pass condition `if (!(got.length >= 3 && exact))` to
`if (!(got.length >= 3 && exact && sugExact))`.

## 3 · The law (one, non-negotiable, either tree)

```
ring == first3(sortBy(rawKey, candidates)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }
```
- `candidates` = `shown` (the currently visible rows, after the needs filter) for the shell ring;
  the full board for the engine's `suggestions.ids`. Both must satisfy the law on their own set.
- `rawKey` = `rawSort`: `r._p` for `priority`, `r._w` for `wins`, `Number(r.ovr)` for `ovr` — i.e. the
  engine's own active-sort value. **Never** `Number(String(...).replace(...))`.
- Non-tautological: the expectation is the engine's raw ordering (`suggestions.ids` / `rawSort`),
  not a reparse of the formatted string the component renders. This is C5 §4's law, unchanged;
  H4/D2 is what finally makes the battery assert it.

## 4 · What the view needs for the "why" clause (optional, cheap)

None for the fix. If the Architect wants the ring to explain itself (ERNIE's I18 / Pickle S1), the
same `suggestions` object carries `reason` already (`'top3' | 'tie' | 'none'`); a per-id clause
(`'last QB above +2.0 wins'`) can be added later from values already in the view. No new semantics;
Owner's call.

## 5 · Interaction with the Owner's w89 ruling (record note)

Owner ruling 2 (verbatim note, relayed by Pickle `20261119-2130`): *"we need to get as close to w89 as
possible. the ring looks worse than the glowing button in w89"*. That is an **appearance/UX** direction;
it does not resolve this mechanism question (Pickle's own note says so). If Z.ai replaces the ring with
a w89-style glowing draft button, the law in §3 still governs **which** rows are highlighted — the
mechanical fix is necessary either way. REPORTED (relay), not a new ruling by me.

## 6 · Receipts (raw stdout; all commands run on council/hy4orca)

```
$ pwd; git branch --show-current; shasum -a 256 Football-Sim-PreColors.html
/Users/kosi/Desktop/wt/hy4orca
council/hy4orca
40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd  Football-Sim-PreColors.html
```
(first 16 = `40233d6be00e987c`, matches AGENTS.md §2 — VERIFIED)

```
$ git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts | grep -nE 'const key|rows.sort|rows.slice'
53:  const key = (r: { _w: number; _p: number; ovr: string }) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);
54:  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
61:    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```

```
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte | grep -nE 'const shown|const suggestIds|const val|each shown'
28:  const shown = $derived(
38:  const suggestIds = $derived.by(() => {
40:    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
63:    {#each shown as r (r.id)}
```
(28/38/63 together prove the ring is over the needs-filtered subset — the amendment's reason)

```
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/batteries/board.battery.mjs | grep -nE 'vmVals|vmRead|replace'
46:const vmRead = () => page.evaluate(() => {
50:const vmVals = () => page.evaluate(() => {
52:  return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
90:  const vm = await vmRead();
91:  const vals = await vmVals();
```
(:52 and the component's :40 are the same rounded parse — the battery is tautological, as Pickle
reported)

```
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts | diff - <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts) && echo IDENTICAL
IDENTICAL
```
(so one engine-view patch covers both trees at the current snapshot)

## 7 · What I did not do

- I did not edit `colors/src/**`, the cakepanz package, any battery, the pin, a protected constant,
  `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, or another seat's file. Proposal only.
- I did not run the battery (I did not build the package); the battery consequence is INFERRED from
  the code I read, not VERIFIED by execution. H1–H4 are exact-code proposals to be applied and
  verified by the Architect / Z.ai.
- I did not choose new sort-key names: `BoardSort` governs.
- The engine-view change changes the snapshot bytes, so it needs the Architect's re-pin in the same
  landing (INFERRED from the pin contract; the re-pin itself is the Architect's act).
