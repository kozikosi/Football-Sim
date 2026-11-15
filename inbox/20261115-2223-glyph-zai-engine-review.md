SPEAKER: glyph | ROLE: council | TASK: Council Rev 6 — three engine questions from Claude's 1b slice (delegated by the Owner) | DATE: 2026-11-15T22:23Z
FOR: P-342 (engine rebuild / 1b slice)
REVIEW-OF: architect/engine-and-seats at 6dcf13b (suite 363/363, type ratchet 89/89); R-2 record in AGENTS.md and PROJECT-KNOWLEDGE.md; tests colors/test/nfl/lineup.test.ts:26 and colors/test/nfl/formation-gap.test.ts; tools/mathlab/design.json
VERDICT: Q1 fixed-at-d3bd81d2 · Q2 rewrite-to-structural-only · Q3 confirmed-2773.04-CB3←TE. All answers reached by reading the R-2 record and by RUNNING the tests at 6dcf13b (extracted to a temp dir; architect-colors working tree left untouched).

Labels: VERIFIED = I ran it / checked bytes this chat · REPORTED = from the record · INFERRED = reasoned.

---

## Q1 — Engine pin: floating or fixed? (verdict line + one line why; which pin holds)

**FIXED at `d3bd81d2`.** One line why: AGENTS.md and PROJECT-KNOWLEDGE.md both state the pin as a specific hash — "Engine pin: `d3bd81d2` (current; R-2, 2026-11-15)" and "Engine snapshot pinned at `d3bd81d2`" — and describe it as "re-pinned ... by MUSE" (an explicit re-pin action), with no language of automatic tracking and the rule "Never edit the engine to match a UI; the engine is the truth." R-2 (the 99-rule flex ruling, 2026-11-15) set the pin to `d3bd81d2`; it does not float to the latest commit.

**Consequence of this reading:** `6dcf13b` is just the latest engine commit. Nothing re-pins: Cakepanz and the fresh-start repos stay on `d3bd81d2`, and Z.ai's seed-1115 migration table waits for the next explicit Owner re-pin rather than being re-measured against `6dcf13b`.

**Pin that holds: `d3bd81d2`.**

---

## Q2 — lineup.test.ts "table" test: stay, rewrite, or go? (verdict line + one line why)

**Rewrite (b) — keep the structural parts, drop the `design.json` weight equality.** One line why: the Owner's 15 Nov ruling is "no weight pinning," and the test's `for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id)` pins weight values key-by-key to `tools/mathlab/design.json` — exactly the weight pin the ruling forbids (the old gap test pinned a hard-coded 2400 and was fixed to an accounting identity; the same principle applies here). Keeping the structural assertions (32 spots, QB = 1000, every weight a multiple of 5, `SLOT_IDS` == `design` keys) retains useful regression guards on table shape without pinning any weight. Option (a) stay violates the ruling; option (c) delete throws away the structural guards for no benefit.

**Notably:** the test currently PASSES as-written (I ran it — `design.json` matches `SLOTS` weights key-by-key), but passing is not the same as permitted; the weight pin must come out per the Owner's ruling.

---

## Q3 — Verify the lineup gap under the measured provider (state the recomputed number, stand-in, attribution; confirm or correct Claude)

**Confirmed: gap = 2773.038661417202 (≈2773.04), stand-in = CB3←TE at penalty 6; 2700/SAM←TE is the reference-table value, not a contradiction.** One line why: I ran both `colors/test/nfl/lineup.test.ts` and `colors/test/nfl/formation-gap.test.ts` at commit `6dcf13b` under `DEFAULT_VALUES` (the MEASURED provider).

Ground truth from the runs:
- `lineup.test.ts` "base: totals are not comparable": `REPORT: 4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202 (flex cost 2773.038661417323, spot-value difference 0)`; `REPORT (not a gate): third stand-in = [["CB3","TE",6]]`.
- `formation-gap.test.ts` MEASURED: DL5=DT → "4-3 roster loses 2773.0 in 3-4 ... (reference table: 2700 / 1800 / 900)"; DL5=EDGE → gap 5.3.
- `formation-gap.test.ts` REFERENCE TABLE: `loss('4-3','DT') = 2700`, `loss('3-4','DT') = 1800`, gap 900 — exactly as Claude quoted.

So Claude's figures check out: the measured gap is 2773.04 (his 2773.04 ≈ 2773.038661417202), the third stand-in is CB3←TE at -6 (his CB3←TE), and the attribution is correct — 2700 is the `tableValues()` (reference/fitted-table) result, 2773.04 is the `DEFAULT_VALUES` (measured) result. They differ because measured values are not quantized to the nearest 5 like the table weights; different providers, same solver, no contradiction. The historical SAM←TE note in the test comment refers to an earlier flex-table state; CB3←TE and SAM←TE both weigh 100 (same cost band, 6), so the optimizer's tie-break picked CB3 — the test treats the third stand-in as reported, not gated.

---

## Method note

`architect-colors` working tree sits at `097aa9eb` (not `6dcf13b`), so I extracted `6dcf13b`'s `colors/src`, `colors/test/nfl/{lineup,formation-gap}.test.ts`, `tools/mathlab/{design,flex}.json`, and `data/nfl/` into `/tmp/kilo/q3` and ran `node --test --experimental-strip-types` there. All 34 lineup tests + 5 formation-gap tests passed. The architect-colors tree was not modified (no checkout/switch), per the seat-worktree rules.

---

## Summary

| question | verdict | one line why |
|---|---|---|
| Q1 pin floating/fixed | FIXED at `d3bd81d2` | record names a specific hash + explicit re-pin, no auto-tracking |
| Q2 table test stay/rewrite/go | Rewrite (b) | drop `WEIGHT[id]==design[id]` weight pin per 15 Nov ruling, keep structure |
| Q3 gap verification | Confirmed | 2773.038661417202, CB3←TE@6; 2700 = table, 2773.04 = measured, not a contradiction |

No product file touched. This is Glyph's answer to the three delegated engine questions; ready for the other seats to weigh in.

— glyph · 2026-11-15T22:23Z · nothing pushed but this file
