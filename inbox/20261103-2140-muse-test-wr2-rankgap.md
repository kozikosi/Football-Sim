SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-224 rank-gap hunt on the weights-vs-impact sweep | DATE: 2026-11-03T21:40:00Z
FOR: P-224

# P-224 test: rank-gap hunt on the weights-vs-impact sweep — only WR2 survives noise discipline

## Method

Took the MUSE seat's 80→99 positional sweep (1,500 games/position, point differential, SE ≈ 0.33 — VERIFIED, posted 2026-11-03T09:40Z) and Claude's ENGINE-MATH-SPEC REV 5 slot weights (REPORTED via Owner relay 2026-11-03). Computed weight-rank vs revealed-rank for all 24 swept positions and applied the 4+ spot criterion from the 09:40 call.

## Result: six positions meet the 4-spot criterion (VERIFIED arithmetic)

| pos | weight # | revealed # | gap | revealed |
|-----|----------|------------|-----|----------|
| WR2 | 10 | 4 | -6 | +1.94 |
| WR3 | 23 | 17 | -6 | +1.12 |
| OG1 | 13 | 19 | +6 | +1.07 |
| OG2 | 14 | 20 | +6 | +1.07 |
| OT2 | 6 | 10 | +4 | +1.50 |
| FS  | 19 | 15 | -4 | +1.22 |

## Noise discipline (INFERRED): five of six are mushy-middle artifacts

SE ≈ 0.33 per estimate ⇒ SE of a pairwise difference ≈ 0.47. The entire DT2→RB1 band spans +1.38→+1.01 (0.37 total) — rank order inside it is below the noise floor:

- WR3 +1.12 sits in a pack (TE1 +1.23 … WILL +1.06, span 0.17): rank 17 vs weight 23 is noise.
- OG1/OG2 +1.07: same pack. Noise.
- OT2 +1.50 vs weight-tier peers OT1 +1.67 / DT1 +1.71 / DE2 +1.66: diffs 0.16–0.21, all <½σ of the difference. Noise.
- FS +1.22 vs SS +1.08: diff 0.14. Noise.
- WR2 +1.94 vs weight-tier peers CB2 +1.52 / C +1.23 / DT2 +1.38: exceeds the whole tier by 0.42–0.71 and sits in the top tier with WR1/CB1/DE1. The rank gap alone is suggestive; the spec-ratio match below is the confirmation. ROBUST.

## Mechanism confirmation (VERIFIED)

Receiving spec, `colors/src/engine/specs.ts:14` on origin/architect/engine-and-seats (read 2026-11-03 ~21:35 UTC):
`rec: { WR1: 0.99, WR2: 0.91, WR3: 0.53, TE1: 0.53, RB1: 0.19, TE3: 0.02, WR4: 0.02 }`

- Spec ratios: WR2/WR1 = 0.919, WR3/WR1 = 0.535
- Revealed ratios: WR2/WR1 = 0.907, WR3/WR1 = 0.523
- Weight ratios: WR2/WR1 = 0.702, WR3/WR1 = 0.404

The revealed impacts track the receiving spec to ~1%, not the slot weights. **The slot weights do not govern receiver value in the engine; the receiving spec does.** WR2's weight (330, 70% of WR1's 470) is fiction — the engine treats it as 92% of WR1.

## Implication (INFERRED)

The discrepancy is structural, not a tuning wobble: any fix must move either the slot weight (WR2 → ~430 to match revealed) or the receiving spec (0.91 → ~0.75 to match the weight). Which one is the Architect's call — the weights table is Owner-approved, and RATING_SPECS is a protected constant.

No new P-IDs proposed; this is a P-224 test result for the record. The Owner has already been briefed on the WR2 discrepancy directly.
