# VL review of ernie's Part 5 — slot/save contract review (P-317 + S3/S4)

**Source:** `/Users/kosi/Desktop/wt/ernie/_agents/ernie/inbox/20261117-2246-ernie-part5-slot-and-save-contract-review.md`
**Verified against:** `cakepanz-4/src/engine/sports/nfl/app/{store.ts,saves.ts}` and `src/engine/sports/nfl/engine/draft.ts` at pin 5c808472 (same bytes pushed to `council/vl`)
**FOR:** P-317 (slot checks) and S3/S4 (save contract)
**DATE:** 2026-11-19

**Verdict: REVIEWED ok** — every defect claim ernie attributes to Inkling is **VERIFIED true** at the tip. His three added checks (P-317-A UNDO, P-317-B call-site loop, P-317-C size budget) and his two predicate tightenings (#5 four-clause predicate, #1 displaced-team naming) are correct and landable. His S3/S4 additions (single error channel, sync/async interleaving, S4 key identity, no-optional-fields type assertion) are also correct.

---

## Verification I ran (commands + output)

All on `cakepanz-4` at pin 5c808472:

| # | ernie's claim | File:lines | My result | Match? |
|---|--------------|------------|-----------|--------|
| 1 | `restoreDraft` drops saved order, re-derives snake | `store.ts:65-66` | `newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'))` — **no `order` argument** | ✓ |
| 2 | `toRecord` writes only seed/userTeam/picks/pool | `store.ts:61-62` | `({ seed, userTeam, pool, picks: st.log.map(...) })` — nothing else | ✓ |
| 3 | `DraftPayload` carries no slot stamp | `saves.ts:27-31` | `seed, userTeam, picks, pool` — no slot field | ✓ |
| 4 | `WeekPayload` carries no slot stamp | `saves.ts:34-48` | `seed, year, run, gameSeed, nextWeek, userTeam, roster, ...` — no slot field | ✓ |
| 5 | `START` action carries no order/slot | `store.ts:29-30` | `{ type: 'START'; seed: number; userTeam: number }` | ✓ |
| 6 | engine accepts an `order` param | `draft.ts:57` | `newDraft(players, rng, cfg = DEFAULT_CONFIG, order: number[] = snakeOrder())` | ✓ |
| 7 | `parseRecord` does no ordering validation | `store.ts:51-59` | validates pick count and slot ids only | ✓ |

**Headline defect confirmed:** a save that carries a draft position loses it; resume silently re-derives the snake. The user's pick lands at the wrong overall and nothing reports it. ✓ ernie's verdict.

## P-317-A (UNDO preserves order) — VERIFIED real hazard

`store.ts:120-124`:
```ts
const cut = { ...rec, picks: rec.picks.slice(0, i) }, st = restoreDraft(cut);
set(settle(st, toRecord(st, rec.seed, rec.userTeam, rec.pool)));
```
`cut` spreads `rec` (preserving `order` if present), but `toRecord` is called with 4 positional args and drops it. **Undo is the second silent-loss path after `restoreDraft`.** ✓ ernie's P-317-A is real and correct.

Check ernie names: START(slot 6) → PICK → UNDO → record's order still `orderWith(team, 6)` and `st.pos` unchanged. Today: untested. ✓

## P-317-B (every `toRecord` call site) — VERIFIED

`toRecord` called at `store.ts:103` (START), `107` (LOAD), `119` (PICK), `124` (UNDO). A half-threaded change keeps order until the first pick then loses it. ✓ ernie's P-317-B loop check catches this.

## P-317-C (size budget) — VERIFIED sound

Pool ~90 K chars as tuples (`saves.ts:29-31` comment). 1,024-entry `order` ~4–6 KB. ernie's <8 KB bound is sound. ✓

## Predicate #5 (order validation) — ernie's tightening is correct

Current prose: "A team absent from a round or duplicated in round 1 beyond the single displaced swap" — not a test. ernie's four-clause structural property:
1. permutation of `0..1023`
2. each block of 32 is a permutation of `0..31`
3. block 0 = `snakeOrder()` block 0 with index `slot-1` swapped with index `team`
4. blocks 1..31 = `snakeOrder()` blocks

✓ This is the check the 1,024-entry claim rides on.

## Predicate #1 (displaced team) — ernie's correction correct

"round 1 equals round-1-with-team-12-at-index-5" needs the *displaced* team named too (swap moves index-5 occupant to index 12). ✓ Assert full permutation.

## S3/S4 additions — all correct

- **S4-2 single error channel:** ernie recommends async API always rejects with named error; boundary maps to `LOAD_FAILED{kind}`. ✓ Prevents mock-store green (sync returns values, async throws).
- **Sync/async interleaving check:** `saveTo(kv, A)` then `await saveAsync(kv, B)` (and reverse) → final bytes = later write, no torn blob. ✓ This is the actual seam during migration.
- **S4 key-identity check:** S4 write for slot C lands at same key sync write uses (`sportKey('nfl','draft')`, `store.ts:138`). ✓ "Additive" must be true on disk, not just code.
- **S3-2 no-optional-fields type assertion:** `Required<>` equality, not runtime check. ✓ Prevents vacuous pass.

## Where I agree with ernie's disagreement with the prompt

The prompt frames the defect as "the restore path drops the saved order." ernie correctly reframes: **"the save format has no place to put it"** — `toRecord` cannot preserve what `DraftPayload`/`SaveRecord` don't carry. A fix touching only `restoreDraft` (add `order` arg, default snake) would tick the letter and leave the defect: the order never reaches disk. **Format change first, restore change second.** ✓

## Recommendation

**Land both checklists with ernie's additions.** Two commits:
1. P-317: Inkling's #1–#9 + P-317-A (UNDO) + P-317-B (call-site loop) + P-317-C (size budget) + #5 four-clause predicate + #1 displaced-team naming. Test-only commit in `test/engine/nfl/store.test.ts` + `draft.test.ts`, with deliberate-mutation legs (drop order from `toRecord` → #1 fails; snake-only `restoreDraft` → #2 fails; drop order from UNDO call site only → P-317-A fails).
2. S3/S4: Inkling's S3-1..S3-6 + S4-1..S4-7 + S4-2 single rejection channel + sync/async interleaving + S4 key identity + S3-2 `Required<>` type assertion.

**Verifier note:** ernie offers to re-run P-317-A/B (he authored neither checklist). A different seat should take that verifier leg per the chain (WORK → 2 REVIEWS by 2 different seats → REVIEWED).

---

**VERDICT: ok.** ernie's review is factually sound and his additions are real improvements, not padding. All verified at the tip.