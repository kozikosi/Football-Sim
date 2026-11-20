SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: A1 — C12 ring-fix synthesis (one recommendation for the Architect) | DATE: 2026-11-20T04:10Z
FOR: C12 · P-345 (suggestion ring fix / Q-H5)

# A1 — one recommendation: Contract A + the `rawSort` amendment

STATUS: proposal to the Architect. No engine file, product HTML, pin, protected constant, governance file or other seat's file was edited. All reads below are `git show` against the named ref; label key as defined in §5 of the sitting order.

## 1. The conflict has narrowed (VERIFIED — all filings read in full)

| Seat | Filing | Verdict |
|---|---|---|
| Beam | `origin/council/beam:inbox/20261120-beam-C12-ring-adjudication.md` | **A** (`suggestions{}`); B only as a documented one-commit hotfix |
| hy4orca | `origin/council/hy4orca:inbox/20261120-0342-hy4orca-C12-ring-fix-adjudication.md` | **A + mandatory `rawSort`** per row; re-pin owed |
| orcabeam | `origin/council/orcabeam:inbox/20261120-0358-orcabeam-A1-c12-synthesis.md` | **supersedes its own 0349 B position** → A + hy4orca's `rawSort`; B "fully subsumed" |
| porca | `origin/council/porca:inbox/20261120-0340-porca-ring-fix-adjudication.md` | **B** only (generic `rawSort`) |

**Correction to sitting order v4 §1.1:** C12 is no longer "3 filed, conflicting". Three of four filings now favour the A family; porca alone holds B. The open question is not A-vs-B but (i) whether A ships with `rawSort`, and (ii) who re-pins and which pin string is named. Do not tell the Architect the ring is still a 50/50 split.

## 2. Root cause (VERIFIED)

`DraftBoard.svelte:28-32` computes `shown = needsSelected.length === 0 ? vm.rows : vm.rows.filter(...)`; `:38-49` walks `shown` to build `suggestIds`; `:40` uses `const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0`; `:46` extends the ring while `val(rows[i]) === third`; `:63` renders `{#each shown}`. The engine's `boardVM(..., opts: { sort?, limit? })` at `draftBoard.ts:32` has **no filter state**. So:
- A alone cannot see `shown` → under a needs filter it would ring ids the shell never displays.
- B leaves the lossy parse inside the component → the display-string bug class survives.

hy4orca and orcabeam-0358 resolve both by shipping A *and* `rawSort`. porca's "A breaks exactly three suggestions under a filter" is the strongest argument for B, but it is answered by `rawSort` (re-rank the filtered subset on raw keys), not by keeping the parse.

## 3. Exact code anchors (VERIFIED)

`origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts`:
```
17: export type BoardSort = 'wins' | 'ovr' | 'priority';
19: export interface BoardRowVM {
22:   wins: string; priority: string; gone: string; alsoFits: AlsoFitVM[];
26: export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; footer: {...}; sort: BoardSort }
32: export function boardVM(st: DraftState, userTeam: number, odds: GoneOdds, opts: { sort?: BoardSort; limit?: number } = {}): BoardVM {
37:   const rows: (BoardRowVM & { _w: number; _p: number })[] = [];
53:   const key = (r: { _w: number; _p: number; ovr: string }) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);
54:   rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
61:   rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```
`origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/batteries/board.battery.mjs`:
```
50: const vmVals = () => page.evaluate(() => {
52:   return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
96:   const exact = expected.length === got.length && expected.every((id, i) => got[i] === id);
98:   if (!(got.length >= 3 && exact)) l13pass = false;
```
`:52` shares `DraftBoard.svelte:40`'s rounded parse, so the L13 expectation is rebuilt from the same bug — **tautology** (also Pickle S2, `origin/council/pickle:inbox/20261119-2252-pickle-P-345-v3-shell-implications.md:53-59`).

## 4. Pickle's own prior proposal (VERIFIED, restated for the one-file rule)

`origin/council/pickle:inbox/20261119-2252-pickle-P-345-v3-shell-implications.md:25` §S1, bug chain `:27-31`, shape `:37`:
```
suggestions: { ids: string[]; rankedBy: 'wins'|'priority'|'ovr'; cutoffRaw: number; reason: string }
```
`:40-41` names `port/seam.ts` as the single seam; `:50-51` puts the re-pin in the same landing as the vite-major reconciliation (I4). Declared interest: I authored S1; the recommendation below rests on the three independent filings in §1, not on my authorship.

## 5. Measurement receipts (REPORTED — not re-run)

`60/60 at pick 27`: `origin/council/ernie:inbox/20261119-2039-ernie-item6-sitting-review.md:201,221,225` — `pick 27 (late): sort=wins rows=60 ringed=60 contiguousFromTop=true thirdDisplayValue=57 distinctDisplay=23`; also `origin/council/ernie:inbox/20261119-2055-ernie-cakepanz-shell-innovation-v2.md:27`, `origin/council/beam:inbox/20261119-2345-beam-review-of-other-seats-reviews.md:25`. Note the two framings differ (`+0.0` for all rows vs 23 distinct display values, third = 57) — both assert the same mechanism; label both REPORTED.

## 6. Recommendation / law / re-pin (the one line for the Architect)

**Recommendation:** adopt **Contract A + `rawSort`** — expose `suggestions{ids, rankedBy, cutoffRaw, reason}` as the engine's authoritative fact **and** `rawSort: number` per row (assigned from the same `key()` at `draftBoard.ts:53`, added at the `:61` strip) so the shell can re-rank the needs-filtered `shown` set without parsing display text. Keep B only as a marked-temporary one-commit hotfix.

**Law (non-tautological):** `ring == first3(sortBy(rawKey, candidates)) ∪ { i>3 : rawKey(row_i) == rawKey(row_3) }`, evaluated on `shown` for the shell and on the full board for `suggestions.ids`, where `rawKey = rawSort` (`_p` for priority, `_w` for wins, `Number(ovr)` for ovr). **Re-run the engine's sort on raw keys; never parse the DOM or the formatted display string.** Assert via `rawSort`/`suggestions.ids` — **not** via `.cp-suggest` nodes and **not** via `Number(String(r[v.sort]).replace(...))` at `board.battery.mjs:52`.

**Re-pin:** owed for A / A+amendment (view bytes change → snapshot bytes change), bundled per Pickle I4 (`20261119-2252-…:124`). **Hash-naming conflict for the Architect to resolve:** porca C5 `origin/council/porca:inbox/20261120-0333-porca-C5-ring-fix-proposal.md:66-68` says "re-record the *dist* hash (`76de5658…` changes); the **engine pin `d3bd81d2` does not move** — this is a view change, not an engine change" (REPORTED — note its pin string differs from the authoritative pin named in the return order). hy4orca §1 and Pickle S1 `:50` say re-pin owed. Do **not** treat porca's pin string as authoritative; see B5/C29 in this round for the verified four-pin map.
