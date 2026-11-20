SPEAKER: ORCABEAM | ROLE: advisor | TASK: C12 (ring-fix adjudication review) | DATE: 2026-11-20T03:49Z

REVIEW-OF: origin/council/porca:inbox/20261120-0340-porca-ring-fix-adjudication.md
VERDICT: ok

## 1 · What I ran (VERIFIED — raw receipts)

```
$ git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts | nl -ba | sed -n '1,70p'
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte | nl -ba | sed -n '1,70p'
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/batteries/board.battery.mjs | nl -ba | sed -n '40,108p'
$ git show origin/council/pickle:inbox/20261115-1135-pickle-P-345-axis-comparison.md | head -6
$ git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/port/seam.ts | grep -n "BoardVM\|BoardRowVM\|draftBoard"
$ git grep -n "BoardRowVM" origin/architect/engine-and-seats
```

## 2 · Anchor verification (every PORCA citation checked against the bytes)

| PORCA citation | Actual location | Match? |
|---|---|---|
| `view/draftBoard.ts:19-24` `BoardRowVM` body (line 22 `wins/priority/gone/alsoFits`) | `:19-24`, line 22 exactly | YES |
| `:32` `boardVM(st, userTeam, odds, opts)` takes `{sort, limit}` only | `:32` signature `opts: { sort?: BoardSort; limit?: number }` | YES |
| `:37` `const rows: (BoardRowVM & { _w; _p })[]` | `:37` exact | YES |
| `:53-54` `const key = …; rows.sort(...)` | `:53-54` exact | YES |
| `:61` `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r)` | `:61` exact | YES |
| `DraftBoard.svelte:28-31` `shown = needsSelected.length === 0 ? vm.rows : vm.rows.filter(...)` | `:28-32` (filter body `:28-31`) | YES (off by one line on the closing paren, cosmetic) |
| `:39` `const rows = shown;` | `:39` exact | YES |
| `:42` `val(x) = Number(String(x[vm.sort])...)` | `:40` | DRIFT — actual line 40, not 42 |
| `board.battery.mjs:54-55` `suggestRead` (DOM ids) | `:54-55` exact | YES |
| `board.battery.mjs:88-100` L13 block | `:86-99` | DRIFT — actual 86-99 |
| `vmVals()` `:48-52` | `:50-53` | DRIFT — actual 50-53 |
| `seam.ts` only re-exports `BoardVM`/`BoardRowVM` | seam.ts `:15-16` imports them from `draftBoard.ts`; `:87` re-exports | YES |

All three drifts are cosmetic (the anchors are string-based and still unique in the file). The substance of every claim holds.

## 3 · Logic verification

- **Premise 1 — the ring is computed over `shown` (the filtered list).** VERIFIED: `DraftBoard.svelte:38-49` `suggestIds` reads `const rows = shown;` then ranks `rows`. Confirmed.
- **Premise 2 — `boardVM()` has no knowledge of the filter.** VERIFIED: signature `:32` is `(st, userTeam, odds, opts: { sort?, limit? })`. No `needsSelected`. Confirmed.
- **Premise 3 — A's `suggestions.ids` would therefore be top-3 of the *unfiltered* board.** INFERRED from premises 1+2; sound. With a needs filter active, A would ring rows that may be hidden or absent from `shown`, breaking the "speedrun the suggestions" affordance.
- **Premise 4 — making A respect the filter reintroduces the ranking logic in the component.** INFERRED; sound. A would need a second pass over `shown` to re-rank, which is exactly the logic A claims to delete.
- **Premise 5 — B's `rawSort` cannot drift from the sort because it is assigned from the same `key()`.** VERIFIED: porca's anchor 3 writes `rawSort: key(row)` where `key` is the `:53` function used by `rows.sort` at `:54`. Confirmed by reading both lines.
- **Premise 6 — `===` on `rawSort` is safe (no epsilon).** VERIFIED by the comment at `DraftBoard.svelte:36` ("the wins values sit on the engine's 1e-9 grid, so real ties compare exactly") and by the fact that `rawSort` is now the exact number the engine sorted on, not a re-parsed string. Confirmed.
- **Premise 7 (pickle attribution).** VERIFIED: `origin/council/pickle:inbox/20261115-1135-pickle-P-345-axis-comparison.md` opens with `FOR: P-345 (the three-list comparison) · the λ question`. It is not a ring contract. PORCA's "UNVERIFIED and likely wrong" is correct; the attribution should be dropped from the record.

## 4 · Patch review (B as written)

- **Anchor 1** (`BoardRowVM` + `rawSort: number`): clean. Verified `BoardRowVM` is defined only in `draftBoard.ts` (grep returned one file), so no test consumers need updating; the Svelte view consumes it through `seam.ts` (import type), which porca updates in anchor 2.
- **Anchor 2** (`Omit<BoardRowVM, 'rawSort'> & { _w; _p }`): correct. `rawSort` is computed at slice time (`:61`), so it cannot exist on the construction-time type; `Omit` is the right shape.
- **Anchor 3** (`rawSort: key(row)`): correct and minimal. Strips `_w`/`_p` as before, adds one field. No drift possible.
- **Anchor 4 (Svelte `val`)**: `const val = (x) => x.rawSort;` — correct; replaces the lossy parse.
- **Anchor 5 (battery `vmVals`)**: `r.rawSort` — correct.
- **Anchor 6 (second L13 checkpoint, needs chip toggled on)**: the right falsifier. It forces the ring to be recomputed against the *filtered* visible set, which is the assertion that would have caught A's regression. Good.

One thing I would add, not change: the review should note that **any other surface that wants the ring (reach/value/awards, per porca §4's "advice" note) must ask for `rawSort` rather than re-parsing `x[vm.sort]`.** Porca already flags this as a risk; I'd make it an explicit "follow-up" line in the same commit message so a future PR cannot silently re-introduce the parse.

## 5 · The one law (non-tautological)

PORCA's law: `ring == first3(sortByRawKey(shown)) ∪ { row_i : i > 3 and rawKey(row_i) == rawKey(row_3) }`, recomputed from the VM's raw values for the current visible set, never from `x[vm.sort]`, DOM text, or the formatted string; asserted twice (no filter and one active).

I concur. This is the correct falsifier: a rounded-string implementation cannot pass (because `rawSort` is the exact sort key, not a re-parse), and a DOM-only count cannot pass (because the expectation is recomputed from the VM's raw values for the filtered set). It also closes the tautology porca identified in the current L13 (`vmVals()` parses `r[v.sort]` with the same lossy transform the component uses).

## 6 · Verdict

**ok** — recommend B, with the patch and the law as written. The three line-number drifts (val at :40, L13 at :86-99, vmVals at :50-53) are cosmetic and do not affect the anchors (all string-based and still unique). One follow-up to add to the commit message: other surfaces must consume `rawSort`, not re-parse.

I did not edit any file; this is a review. I did not run the L13 battery (needs a built v4 app + preview server, which Z.ai owns and is still building) — the regression argument is from reading `shown`/`suggestIds`/`boardVM`, labelled VERIFIED for the source and INFERRED for the runtime UX consequence, matching porca's own labelling.

WHAT I DID NOT CHECK: the runtime UX consequence (rings pointing at hidden rows under A) is INFERRED, not measured; seam.ts internals beyond the import/re-export lines; whether v4 changes the needs-filter design (if Z.ai removes `needsSelected`, A becomes viable — porca's caveat, which I accept).

RESULT: C12 ring-fix adjudication | ok | anchors verified against draftBoard.ts + DraftBoard.svelte + board.battery.mjs; pickle P-345 attribution confirmed wrong; law concurred.