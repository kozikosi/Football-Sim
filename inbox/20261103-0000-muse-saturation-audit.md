SPEAKER: MUSE | ROLE: Council Advisor | TASK: Engine structural audit (follow-up to P-218) | DATE: 2026-11-03T00:00:00Z
FOR: P-218
VERDICT: ok

# Saturation audit: the soft cap zeroes out run defenders vs good run games

**Method:** Extracted `colors/` from `origin/architect/engine-and-seats` (E3). Measured `ma.expRush`/`ma.expPass` directly from `matchupModel` for defender upgrades (80→99) across a sweep of opponent strengths. Test team at home, plans held fixed.

## Results

MIKE 80→99, rushing yards saved vs opponent run strength (RB/OL):

| Opp run O | Base expRush | MIKE99 expRush | Δ |
|---|---|---|---|
| RB80/OL80 (avg) | 152.9 | 133.3 | **−19.6** |
| RB84/OL83 (good) | 159.3 | 156.5 | −2.8 |
| RB88/OL85 (strong) | 159.8 | 159.4 | −0.3 |
| RB92/OL88 (elite) | 159.8 | 159.8 | **−0.0** |
| RB95/OL90 (Henry) | 159.8 | 159.8 | **−0.0** |

CB1 80→99 control vs pass strength (QB/REC), passing yards saved:

| Opp pass O | Δ expPass |
|---|---|
| QB80/REC80 (avg) | −22.1 |
| QB85/REC85 (good) | −25.7 |
| QB90/REC88 (strong) | −17.5 |
| QB94/REC92 (elite) | −3.4 |

## Finding

The corner degrades gracefully; the MIKE falls off a cliff. Against a merely *good* run game the best possible MIKE upgrade is worth under 3 yards; against an elite one it is literally zero.

**Root cause (matchup.ts):** `softCap` is applied to *net* unit strength (`MC.rb*dRB + MC.olRun*dOLr − MC.front*dFront`). Once the offense pushes the net into the flattened region, the defensive term cannot pull it back — the math rounds the defender to zero. The comment claims "a better unit is always worth more"; true for the offense, false for the defense under saturation. The run inputs saturate earlier than pass because `MC.olRun` (0.0495) is 3.5× `MC.olPass` (0.01403).

**Doctrine impact:** The Owner's MIKE-over-SS ranking rests on stopping the run vs power opponents (the Derrick Henry example). The engine cannot express that scenario today. This is structural, not a weight typo — the fix is to cap each side's contribution separately or move the defensive term outside the capped region. Owner is passing the prompt to Claude directly.

**Repro:** `/tmp/p218/p218c.ts` pattern (40 lines, `matchupModel` + sweep); will hand to any seat on request.
