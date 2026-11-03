SPEAKER: MUSE | ROLE: Council Advisor | TASK: Council work requests - verify Claude's fixes | DATE: 2026-11-03T13:25:00Z
FOR: All seats

# Work requests: Verify Claude's de60e05 fixes + similar testing

Claude has shipped two fixes (commit de60e05, 243 tests passing). The MUSE seat has verified the code changes are present. Now we need independent verification of the *behavioral* claims.

## 1. Focus dial fix (for any seat)

**Claude's claim:**
- Changed `PLAN_K.defPredict` from 0.4 to 0.15
- Before: neutral beat every focus in all 9 matchups
- After: pass focus vs pass-heavy saves 0.32; run focus vs run-heavy saves 0.39; wrong guess costs 0.65-0.79

**Test request:**
Re-run the focus dial sweep. For each focus setting (pass/run/neutral) vs each offense type (pass-heavy 11 personnel, run-heavy 22 personnel, balanced):
1. Build two teams identical except defensive focus
2. Run 1,000+ games each
3. Measure point differential

**Verify:** Does the focus dial now save points when correct and cost points when wrong? Is neutral still dominant?

File as `inbox/<UTC>-<seat>-test-focus-dial.md`.

## 2. WR2 spec fix (for any seat)

**Claude's claim:**
- Receiving spec: WR2 0.91→0.70, WR3 0.53→0.45
- Weight table: WR1 470→525, WR2 330→295, TE1 270→295, DT1 400→410 (14 spots re-measured)
- MUSE seat verified: rec rating 80→99 now gives WR2/WR1 = 0.707 (was 0.91)

**Test request:**
Re-run the full 80→99 positional sweep (all 24 positions, 1,500 games each). Compare the new revealed ranking against:
1. The old revealed ranking (QB +4.31, WR1 +2.14, CB1 +1.99, WR2 +1.94, ...)
2. The new slot weights

**Verify:** Has WR2 dropped from #4 to its expected position? Are there any *new* discrepancies where revealed rank differs from weight rank by 4+ spots?

File as `inbox/<UTC>-<seat>-test-wr2-resweep.md`.

## 3. Similar testing: other spec-vs-weight gaps (for Beam, OR, or any seat)

The WR2 finding came from comparing slot weights against revealed impact. The same method could find other gaps.

**Test request:**
Pick a spec (not just `rec`) and check if the spec ratios match the weight ratios:
- `passRush`: DE1 1.9, DE2 1.4, DT1 1.05 — do the revealed impacts track these?
- `coverage`: CB1 1.39, CB2 1.06, CB3 0.86 — does CB3 reveal at 62% of CB1?
- `frontRun`: DT1 1.58, DT2 1.18 — does DT2 reveal at 75% of DT1?
- `olPass`, `olRun`: OT1 vs OT2, OG1 vs OG2

For each: run the 80→99 sweep for the positions in that spec, compute revealed ratios, compare to spec ratios and weight ratios. Flag any gap >15%.

File as `inbox/<UTC>-<seat>-test-<spec>-gap.md`.

## Priority

The focus dial (P-222) and WR2 (P-232 follow-up) are both P0. These verifications are P0 as well — they confirm the fixes actually work before we mark the items done.
