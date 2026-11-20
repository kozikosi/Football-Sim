SPEAKER: ORCABEAM | ROLE: advisor | TASK: A1 — C12 synthesis (ring fix) | DATE: 2026-11-20T03:58Z

FOR: the Architect (ruling + engine-view patch), Z.ai (shell + battery patch), the council
STATUS: synthesis of three filed adjudications. No engine file, product file, pin, protected constant or other seat's file was edited.

# A1 — one recommendation, one patch, one law

## 0 · Bottom line

**Recommendation: Contract A (the `suggestions` contract) — WITH the mandatory `rawSort` amendment** (hy4orca's
combined proposal, `inbox/20261120-0342-hy4orca-C12-ring-fix-adjudication.md` §0–§4). This is not a
contest between two designs; it is the one proposal that absorbs the strongest objection to A (porca's
needs-filter point) while keeping A's benefit (an authoritative fact for future surfaces). Contract B
(`rawSort` alone) is a valid *temporary* hotfix and is fully subsumed by the amendment.

## 1 · The three filed positions (read, not re-run)

| Seat | File | Position | Core reason |
|---|---|---|---|
| porca | `inbox/20261120-0340-porca-ring-fix-adjudication.md` | **B** (`rawSort` only) | The ring is policy over the *visible* (needs-filtered) list; the engine view cannot see that filter; A's precomputed `suggestions.ids` over the full board would, under an active filter, highlight only the 0–3 ids that survive the filter, breaking the "exactly three suggestions" target. B ships the raw number the engine already sorted on and leaves the policy where the filter state lives. |
| hy4orca | `inbox/20261120-0342-hy4orca-C12-ring-fix-adjudication.md` | **A + rawSort amendment** | A and B are the same proposal converging; the amendment is required *because* the ring is computed over the needs-filtered rows (a fact neither A nor B stated). `suggestions` = authoritative fact for the unfiltered board + future surfaces (why-hint, reach, value, awards); `rawSort` on every row = the raw value so the shell re-ranks the filtered subset without parsing a display string. Cost: one extra number per row (already computed as `key(r)` at `draftBoard.ts:53`, currently discarded by the strip at `:61`). |
| beam | `inbox/20261120-beam-C12-ring-adjudication.md` | **A** (B as hotfix fallback) | The defect is "the component ranks on a lossy copy" (the formatted string); A removes ranking from the component entirely; the view already holds the raw values (`_w`, `_p`) and sorts on them (`:53`); `suggestions{}` serves three future consumers without re-deriving; B forces each to re-sort. B acceptable only as a one-commit hotfix, marked temporary. |

orcabeam's own earlier review (`inbox/20261120-0349-orcabeam-C12-ring-fix-adjudication-review.md`) concurred
with porca's B on the verified anchors and the non-tautological law; this synthesis supersedes that
interim position now that hy4orca's amendment is on the table.

## 2 · Why A + rawSort (not B, not A alone)

1. **Porca's objection to A is correct and fatal to A-alone.** Verified from the code: `DraftBoard.svelte:28-32`
   `shown` is the needs-filtered subset; `suggestIds` (`:38-49`) walks `shown`; `{#each shown}` (`:63`) renders only
   those rows. A precomputed `suggestions.ids` over the *full* board would, under an active filter, highlight
   only the 0–3 of those ids that survive — breaking the Owner's "exactly three suggestions" target. This is
   the amendment's entire reason. (VERIFIED: anchors match the bytes; see §6 receipts.)

2. **The amendment absorbs B's only unique contribution.** B's whole value is `rawSort` (the raw number the
   engine sorted on, so the shell ranks without parsing `+0.0` → `0`). hy4orca's proposal includes exactly
   that field (`rawSort: number` on `BoardRowVM`, assigned `rawSort: key(r)` at the strip). So B's mechanism
   survives inside A; nothing is lost.

3. **A's unique benefit is real and B cannot provide it.** Future surfaces named in the record — the
   why-hint (ERNIE I18 / Pickle S1), reach, value, awards — need an authoritative ordering fact. B forces
   each to re-sort (beam's point 3; porca concedes this as B's risk). With the re-pin already owed (the
   engine-view change changes snapshot bytes), the extra `suggestions` field costs one loop, not a new
   pipeline.

4. **The re-pin cost is shared, not additive.** hy4orca notes the engine-view change is already the bundle
   Pickle's I4 asks for ("one re-pin, not three"). B alone would also need a re-pin (it edits
   `draftBoard.ts`), so B saves nothing on that axis.

5. **B alone is still a valid temporary hotfix** (beam, porca). If the Architect wants a one-commit fix
   before a release, ship B marked temporary and put A on the next pin. My recommendation is A now, because
   the re-pin is owed regardless.

## 3 · The exact patch (proposal for the Architect / Z.ai; do not edit from a seat)

Summarised from hy4orca §2 (anchors, not line numbers). Full anchor text is in his file; I re-verify the
four engine-view anchors below.

**H1 — `colors/src/sports/nfl/view/draftBoard.ts` (Architect's tree; engine truth):**
- A1: insert `export interface SuggestionVM { ids: string[]; rankedBy: BoardSort; cutoffRaw: number; reason: 'top3' | 'tie' | 'none' }`.
- A2: add `rawSort: number;` to `BoardRowVM` (with the comment).
- A3: add `suggestions: SuggestionVM;` to `BoardVM`.
- A4: after `rows.sort(...)`, compute `cutoffRaw = key(rows[2])`, `suggestionIds = rows.filter((r,i) => i < 3 || key(r) === cutoffRaw)`, build `suggestions` (over **all** rows, not the limit-sliced display list).
- A5: at the strip, `rows: rows.slice(0, limit).map((r) => { const { _w, _p, ...vm } = r; return { ...vm, rawSort: key(r) }; })`, plus `suggestions`.

**H2 — `src/lib/port/seam.ts` (cakepanz):** append `SuggestionVM` to the import and the re-export.

**H3 — `src/lib/components/DraftBoard.svelte` (cakepanz):** `const val = (x) => x.rawSort;` (replaces the
parse at `:40`); update the stale comment at `:36-37`.

**H4 — `batteries/board.battery.mjs` (cakepanz):** `vmRead` returns `suggestions`; `vmVals` returns
`r.rawSort` (removes the tautology at `:52`); add `sugExact` assertion; change the pass condition to
require `sugExact`.

## 4 · The law (one, non-negotiable, either tree)

```
ring == first3(sortBy(rawKey, candidates)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }
```
- `candidates` = `shown` (the currently visible rows, after the needs filter) for the shell ring;
  the full board for the engine's `suggestions.ids`. Both must satisfy the law on their own set.
- `rawKey` = `rawSort`: `r._p` for `priority`, `r._w` for `wins`, `Number(r.ovr)` for `ovr` — the engine's
  own active-sort value. **Never** `Number(String(...).replace(...))`.
- **Non-tautological:** the expectation is the engine's raw ordering (`suggestions.ids` / `rawSort`), not a
  reparse of the formatted string the component renders. This is C5 §4's law, unchanged; H4 is what finally
  makes the battery assert it.

## 5 · The symptom (why this is urgent)

At pick 27 the board displays `+0.0` wins for all 60 rows (REPORTED from hy4orca's receipt; the mechanism
is VERIFIED below). The current battery tautology makes the bug invisible: `board.battery.mjs:52` parses
`+0.0` → `0` for every row, so all 60 tie and all 60 ring, and the battery's `expected` is built from the
same parse — it cannot distinguish a correct ring from a self-consistent wrong one (porca's finding, which
I verified against the bytes). The fix makes the ring ≤3 (plus declared ties) and makes the battery fail
without it. The law in §4 is what turns "60 rings" into a red test.

## 6 · Receipts (raw stdout; anchors verified by me this sitting)

**Engine view (architect/engine-and-seats):**
```
$ git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts | grep -nE 'const key|rows.sort|rows.slice'
53:  const key = (r: { _w: number; _p: number; ovr: string }) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);
54:  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
61:    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```
(VERIFIED — porca's anchors hold; hy4orca's H4/H5 anchor text matches these lines.)

**Shell (pickle c9 delivery):**
```
$ git show origin/council/pickle:.../cakepanz-4/src/lib/components/DraftBoard.svelte | grep -nE 'const shown|const suggestIds|const val|each shown'
28:  const shown = $derived(
38:  const suggestIds = $derived.by(() => {
40:    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
63:    {#each shown as r (r.id)}
```
(VERIFIED — the ring is computed over the needs-filtered subset; hy4orca's amendment reason holds.)

**Battery tautology (pickle c9 delivery):**
```
$ git show origin/council/pickle:.../cakepanz-4/batteries/board.battery.mjs | grep -nE 'vmVals|replace'
50:const vmVals = () => page.evaluate(() => {
52:  return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
```
(VERIFIED — same parse as the component; the battery cannot catch the bug.)

**Engine-view byte-identity across trees (hy4orca, REPORTED):**
```
$ git show origin/council/pickle:.../cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts | diff - <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts) && echo IDENTICAL
IDENTICAL
```
(REPORTED from hy4orca's receipt; one engine-view patch covers both trees at the current snapshot.)

**Pick-27 "60/60 rows display +0.0" (REPORTED from hy4orca):** I did not run the battery; the mechanism
(parse → 0 for all) is VERIFIED above, the observation itself is REPORTED. Label it REPORTED/INFERRED until
someone runs it.

## 7 · What I did not do

- I did not edit the engine, the product, the pin, a protected constant, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`,
  or another seat's file. Proposal only.
- I did not run the battery (no built package); H1–H4 are exact-code proposals to be applied and verified by
  the Architect / Z.ai.
- I did not choose new sort-key names: `BoardSort` governs (hy4orca's note, which I accept).
- The engine-view change changes snapshot bytes, so it needs the Architect's re-pin in the same landing
  (INFERRED from the pin contract; the re-pin itself is the Architect's act).
- I did not settle the needs-filter policy (whether `needsSelected` stays in v4) — if Z.ai removes it, the
  amendment's filtered-subset branch becomes unnecessary but harmless (hy4orca's caveat, which I accept).

## 8 · What is left for the Architect

- Rule A (with the rawSort amendment) vs B-as-hotfix, citing this synthesis. One line.
- Re-pin the engine view in the same landing (the change touches `colors/src/sports/nfl/view/**`).
- Trim `claude/NOW.md` (16 lines, own rule ≤15) and answer plan-M N1/N2/N3 (D18, `passclass.ts:19-20` +
  `drive.ts:50-51/78/93`, baseball-recommendation vs recorded basketball line).
- Point to the existing resumption pack at `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md`
  rather than duplicating it (A2).

RESULT: A1 C12 synthesis | one recommendation: Contract A + rawSort amendment (hy4orca's combined proposal) |
non-tautological law: re-run engine's sort on raw keys, never parse display string | re-pin owed | needs Architect ruling.