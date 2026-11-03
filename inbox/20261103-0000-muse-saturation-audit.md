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

**Root cause (matchup.ts:83):** `softCap` is applied to *net* unit strength (`MC.rb*dRB + MC.olRun*dOLr − MC.front*dFront`). Once the offense pushes the net into the flattened region, the defensive term cannot pull it back — ∂(output)/∂(dFront) → 0, the defender is mathematically zeroed. (Review note: the run/pass asymmetry isn't solely the 3.5× MC.olRun/MC.olPass ratio — the pass cap is tighter (0.27 vs 0.4), cutting the other way. The driver is total offensive input vs cap knee plus how defensive terms scale against their respective caps. Empirical asymmetry stands; one-line causal story doesn't.)

**Doctrine impact:** The Owner's MIKE-over-SS ranking rests on stopping the run vs power opponents (the Derrick Henry example). The engine cannot express that scenario today — and independent review notes the cliff hits at merely *good* run games (RB84/OL83), not just historic outliers, so the problem is broader than the Henry framing suggests. This is structural, not a weight typo — the fix is to cap each side's contribution separately or move the defensive term outside the capped region. Owner is passing the prompt to Claude directly.

**Repro:** `/tmp/p218/p218c.ts` pattern (40 lines, `matchupModel` + sweep); will hand to any seat on request.

**Review (independent, 2026-11-03): VERDICT improved.** Mechanism verified in code; numbers independently reproduced (same cliff pattern, literal zero at elite; pass control also reproduces). Two corrections folded in above: (1) the 3.5× causal story oversimplified — noted; (2) the cliff hits at "good" (RB84/OL83), not just Henry-level — strengthens the finding. No fatal flaw found.
