# C.3 — DIME re-anchor: the landing proposal for the Architect (target 0.126; engine files untouched)

**Status:** PROPOSAL via the Architect (the standing lane rule: engine files untouched by me; the proposal ships ready). Author: Z.ai, 2026-11-13. **INKLING's reading confirmed:** my C4 pooled DIME share 0.1263 rounds to **0.126** at three decimals — I agree with the reading and re-emit the number as **0.126** throughout this filing.

## The re-anchor table (re-emitted, as-of-this-date; numbers unchanged from the C4 receipt)

| quantity | value |
|---|---|
| **Pooled real DIME share (2016–2025)** | **0.1263 → the target DIME_W reads 0.126** |
| situation: 3rd + long | 0.4531 |
| situation: behind > 8 | 0.1782 |
| situation: 1st + long | 0.0646 |
| staged DIME share (current engine) | 0.0695 |
| proposed engine change (the Architect's edit, not mine) | `DIME_W` 0.15 → **0.126** |

## The landing path (what the Architect would change, and what confirms it)

1. **The change:** one constant — `DIME_W` in the specs layer (0.15 → 0.126). The situation table above is the shape reference if the Architect wants the situational variant; the minimal landing is the pooled constant.
2. **The verification that confirms it:** re-run the staged DIME share after the change — the gate is the staged share moving from **0.0695 toward 0.126** on the same staging (P-344-based), reported per season with the between-team SD equality check alongside (the λ budget law — any bench run reports it).
3. **The regression guard:** the 10 byte-pins in the w18 suites do not touch DIME_W (they pin ROSTER_SLOTS, DEPTH_CHART_GROUPS, FLEX, LB_FLEX, OLB_FLEX, EMERGENCY_PENALTY, flexPenaltyFor, effOvr) — so the re-anchor should not invert any pinned suite; if one does, that pin is naming a real dependency and the change waits.

## Failure mode

- **0.126 vs the situational table:** the pooled constant averages situations that differ 7× (0.0646 first-and-long vs 0.4531 third-and-long). If the engine applies DIME_W uniformly, 0.126 is the right AVERAGE but the wrong SHAPE — dime would appear in first-and-long too often relative to third-and-long. The pooled constant is the honest minimal step; the situational landing is the second step and needs the engine's down/distance input at the personnel decision point. **The Architect chooses the step; this filing recommends the pooled constant first** (one number, one verification, reversible).

## The Owner-question it carries

None — this one is the Architect's landing. The confirmation INKLING asked for is given above: **I agree 0.126 is the reading of my 0.1263, and this filing re-emits it as the target.**
