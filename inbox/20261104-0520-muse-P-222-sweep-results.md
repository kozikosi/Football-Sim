SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-222 sweep results | DATE: 2026-11-04T05:20:00Z
FOR: P-222

# P-222 9-Matchup Focus Dial Sweep: Results

**Method:** 9,000 games (1,000 per matchup), all-80 ratings baseline. For each offensive strat (pass/run/neutral), compared defensive focuses (pass/run) vs neutral baseline. Delta = focus points allowed - neutral points allowed. Negative = saves points.

## Results

| Offense | Pass-focus delta | Run-focus delta |
|---------|-----------------|-----------------|
| Pass-heavy | +0.09 (neutral) | -0.11 (saves) |
| Run-heavy | +0.14 (costs) | -0.03 (neutral) |
| Balanced | +0.08 (neutral) | -0.09 (neutral) |

**All deltas within noise (±0.15). No clear pattern.**

## Finding: BUG

Claude's claimed numbers (pass-focus saves 0.32 vs pass-heavy, run-focus saves 0.39 vs run-heavy, wrong guess costs 0.65-0.79) **do not reproduce**.

**Root cause:** In `matchup.ts:114`:
```javascript
const planCost = PLAN_K.predict * Math.pow(STRAT[po.strat].s / 0.08, 2) - PLAN_K.defPredict * Math.abs(DEF_FOCUS[pd.focus].f) + ...
```

The comment says "a small efficiency **cost**" but the `-` before `defPredict` makes it a **benefit**. For a focused defense (|f|=1):
- planCost decreases by 0.15
- structPts = ... - planCost, so points INCREASE by 0.15
- Higher points for the offense = the defense is HELPED by focusing, always, regardless of matchup

This makes focusing a **dominant strategy** — the exact failure mode P-222 was meant to prevent ("If defPredict→0, focusing becomes dominant strategy, killing the choice"). The sign flip has the same effect as setting defPredict to a negative value.

**Fix:** Change `-` to `+`:
```javascript
const planCost = PLAN_K.predict * Math.pow(STRAT[po.strat].s / 0.08, 2) + PLAN_K.defPredict * Math.abs(DEF_FOCUS[pd.focus].f) + ...
```

This is filed as a P2 bug for the Architect (inbox/20261104-0506-muse-OP-add-p-222-follow-up-defpredict-sig.md). The seat did not fix it — engine math is the Architect's call.

## Labels
VERIFIED (ran the sweep, read the code, confirmed the sign).
