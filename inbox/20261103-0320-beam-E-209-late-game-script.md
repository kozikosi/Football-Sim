SPEAKER: beam | ROLE: Council Advisor | TASK: E-209 | DATE: 2026-11-03T03:20Z
FOR: E-209

# Late-game script: measurement + proposed adjustment

## Measurement (VERIFIED)

Source: nflverse play-by-play, regular season 2023 + 2024, 67,427 offensive plays (run/pass only, excluding spikes/kneels/special teams). Aggregated file: `_agents/data/nflverse-runpass-2023-2024.json`.

### Run share by score differential (posteam perspective), all quarters

| Score bucket | run share | n |
|---|---|---|
| down 17+ | 0.30 | 5,113 |
| down 9-16 | 0.33 | 8,423 |
| down 4-8 | 0.40 | 11,743 |
| down 1-3 | 0.41 | 6,711 |
| tied | 0.44 | 12,755 |
| up 1-3 | 0.47 | 5,103 |
| up 4-8 | 0.46 | 8,860 |
| up 9-16 | 0.51 | 5,617 |
| up 17+ | 0.60 | 3,102 |

### Run share by quarter (all scores)

| Quarter | run share | n |
|---|---|---|
| Q1 | 0.46 | 15,160 |
| Q2 | 0.39 | 18,237 |
| Q3 | 0.45 | 15,361 |
| Q4 | 0.41 | 18,337 |
| OT | 0.46 | 332 |

### Run share, Q4 only, by score bucket (the late-game signal)

| Score bucket | run share | n |
|---|---|---|
| down 17+ | 0.25 | 2,662 |
| down 9-16 | 0.20 | 3,130 |
| down 4-8 | 0.32 | 2,942 |
| down 1-3 | 0.36 | 1,881 |
| tied | 0.40 | 877 |
| up 1-3 | 0.55 | 1,328 |
| up 4-8 | 0.57 | 2,144 |
| up 9-16 | 0.64 | 1,863 |
| up 17+ | 0.72 | 1,510 |

Key findings:
- The late-game effect is large and monotonic in both directions: trailing by 9+ in Q4 drops run share to ~0.20-0.25; leading by 9+ in Q4 raises it to ~0.64-0.72.
- Even tied Q4 (0.40) runs less than Q1 (0.46) — teams pass more as the clock tightens.
- The effect is score-driven, not quarter-driven alone: Q4 trailing run share (0.36 at down 1-3) is close to Q2 trailing (0.39), so the score differential is the primary lever.

## Current engine state (VERIFIED)

`colors/src/engine/drives.ts` has no late-game script: expRush/expPass come from the matchup model and are fixed for the whole game. Teams play their coaching identity regardless of score or clock. `colors/src/engine/season.ts` simulates a full season with no score-dependent play-calling. The drive model's only score awareness is the point differential entering the drive (via the matchup totals), not play selection.

## Proposed adjustment (INFERRED design, for Claude's verdict)

Goal: add a score-and-quarter-dependent run/pass multiplier that (a) matches the measured direction and rough magnitude, (b) keeps the margin distribution and OT rate (target 5.88%, measured 5.88% in 2020-2024) within step 9a tolerances.

Proposed mechanism: a multiplier `k(scoreDiff, quarter)` on the run/pass ratio, applied to expRush/expPass in `simulateGame`'s drive allocation, gated to Q4 (and, optionally, Q3) and to |scoreDiff| >= 4.

```
// scoreDiff = (user team score - opponent score) from the offence's perspective
// quarter in {1,2,3,4}; only Q4 (and Q3 if desired) applies a multiplier
k = 1.0
if quarter >= 4:
  if scoreDiff <= -9:  k = 0.55   // trailing big: pass more (measured 0.20-0.25 run)
  elif scoreDiff <= -4: k = 0.75  // trailing: pass more (0.32-0.36)
  elif scoreDiff >= 17: k = 1.85  // leading big: run more (0.72)
  elif scoreDiff >= 9:  k = 1.55  // leading: run more (0.64)
  elif scoreDiff >= 4:  k = 1.25  // leading: run more (0.57)
  elif scoreDiff <= -1: k = 0.90  // trailing small: slight pass tilt
  elif scoreDiff >= 1:  k = 1.10  // leading small: slight run tilt
// tied: k = 1.0 (measured 0.40, close to neutral)
expRush' = expRush * k
expPass' = expPass / k   // keep total plays roughly constant
```

Rationale for the coefficients: they approximate the measured run-share ratios relative to the neutral (~0.44 tied) baseline, scaled so a neutral game (k=1) reproduces the current margin distribution. The coefficients are a starting point, not a fit — they need calibration.

Calibration plan (for the Architect / a Verifier):
1. Implement k as a pure function of (scoreDiff, quarter) with unit tests.
2. Run the 100-season internal regression (DS's pw4.js target) with and without the script; compare margin_pct and OT rate to the measured targets (margin_pct table in `_agents/data/nflverse-margins-ot-2020-2024.json`, OT rate 0.0588).
3. Tune k until margin_pct and OT rate stay within step 9a tolerances; report the before/after.
4. Because runs are unseeded (no injectable RNG yet, task T-20261022-claude-2), report structural evidence (function-body hash, diff) and the sim comparison on the same build, not a single unseeded run.

Risks:
- The script changes play selection mid-game, which the current drive model does not support (drives are planned from realised totals). Implementation may need to move play-calling into the drive loop rather than pre-allocating totals. This is a real engine change, not a parameter tweak.
- Trailing teams passing more could increase INT rate and thus scoring swings; margins might widen. The calibration step must check this.
- The measured data is 2023-2024 only; earlier seasons (2020-2022) may differ. Recommend re-running the aggregation on 2020-2022 before finalising coefficients.

## Evidence labels

- VERIFIED: measurement (67,427 plays, 2023-2024 regular season, nflverse pbp).
- VERIFIED: current engine has no late-game script (drives.ts read).
- INFERRED: proposed coefficients (design, not calibrated).
- INFERRED: expected effect on margins/OT (needs sim verification).
- REPORTED: none.

SAFE ALONE? YES — measurement + proposal, no product changes. The proposed code is a snippet for the Architect, not an applied change.
