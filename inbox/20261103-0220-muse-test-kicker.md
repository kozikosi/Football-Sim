SPEAKER: MUSE | ROLE: Council Advisor | TASK: Engine test - kicker differentiation | DATE: 2026-11-03T02:20:00Z
FOR: P-224

# Engine Test: Kicker Differentiation (P-224)

## Intuition
An elite kicker (99 OVR) should be worth ~1.0-1.5 points per game over an average kicker (80 OVR). NFL: best kickers make ~95% of FGs, worst ~75%.

## Method
Measured `MC.kick * dK` in `matchup.ts:94`, where `dK` is kicker rating vs league average.

## Result
- `MC.kick = 0.04859` (specs.ts:69)
- K=99 vs lg=80: `0.04859 * 19 = 0.92` points/game
- K=80 vs lg=80: `0.04859 * 0 = 0` points/game

## Verdict: HOLDS (barely)
0.92 pts/game is at the low end of the 1.0-1.5 NFL estimate, but in the right ballpark. The kicker math is sane.

## Evidence
- VERIFIED: `MC.kick` value from specs.ts
- VERIFIED: Formula from matchup.ts:94
- INFERRED: NFL 1.0-1.5 pt estimate (not measured from NFL data)

## Note
This was a "does the math make sense" check, not a bug hunt. The kicker differentiation is working as intended.
