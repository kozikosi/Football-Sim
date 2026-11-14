SPEAKER: glyph | ROLE: seat (work/design proposal) | TASK: P-339 — Gate-free fix so centers don't constantly flex out (design) | DATE: 2026-11-14T05:25Z
FOR: P-339

# P-339: Centers flex-out diagnostic — gate-free fix design

**Owner direction (VERIFIED):** only concern is centers constantly flex out of position; if that happens formula is slightly off. **NO GATES** — fix must come from formula/pack (duty scores, duty weights, a missing duty, or another formula-level change), not from a gate/guard/floor/named exception. Do **not** touch the 99-rule table itself (Owner’s picture). Z.ai designs the solution; this filing provides a concrete gate-free design/proposal for council review.

**Context (REPORTED/VERIFIED in queue):** ability-only ZAI-D1+score changes = 98/99; C>OT prices 6.68→tier 6 (Owner 12). Optimizer can move a center to OT when center OVR exceeds weak OT by >6. Prior census evidence (Claude `playlevel-answer-2026-11-10`, P-341 updates, REPORTED): at C>OT 6 centers do **not** constantly flex on real rosters (5/32 teams, +0.012 wins) but a stacked second elite center exploits; live/guard behavior differs by row (C>OG exposure noted). Owner (P-340 updates): "C>OT at 6 is OK unless centers constantly flex to OT; test is sim behaviour, not the number."

## Diagnosis (INFERRED)
Ability-only price `p(C->OT)=M+λS` underprices key center duties relative to tackle: snapping/exchange, line calls/ID, interior A-gap anchor leverage, and reach/pull-in-space profile differ. If a missing duty or underweighted duty exists, ability gap is too small → frequent flex when a surplus C beats a weak OT.

## Gate-free fix (formula/pack level) — proposed changes

### F1. Add/repair a missing duty in NEED/skill vectors (preferred, minimal)
- **Introduce duty `SNAP` (center exchange + shotgun/pistol snap reliability) or split `IQ_LINE` into `SNAP_EXCH` + `CALLS`.**
  - C NEED: `SNAP` high (e.g. 0.8–1.0 normalized), `CALLS` high.
  - OT NEED: `SNAP` ~0 (or irrelevant), `CALLS` medium.
  - OG NEED: `SNAP` 0, `CALLS` medium.
- **Duty weights:** give `SNAP` sufficient weight `w_SNAP` so that `Δ(C,OT)` increases at the deficiency that matters. Because OT has no snap duty, `d = max(0, NEED_OT,SNAP - ABIL_C,SNAP)` becomes large if C’s modeled ability there is treated as not-transferable (or ABIL for non-centers near 0 for SNAP) — but **OVR-only input constraint** means we cannot assign per-player SNAP skill freely. 
- **OVR-only compatible encoding (INFERRED):** treat position-defined duty fulfillment as `ABIL_r,SNAP = g_r(OVR, position)` with `g_C` high, `g_OT/g_OG` baseline-low for SNAP (position prior), so transferring C to OT loses SNAP contribution: effective penalty rises via `M` term on SNAP. This is a pack/position-prior change, not a gate and not a per-player manual stat.

**Expected effect:** raises `p(C->OT)`, `p(C->OG)` (and slightly others) by making snap/center-specific duty a worst-case deficiency (`M` component) — directly targets center-out moves.

### F2. Reweight existing duties (if SNAP implicit)
- Increase weight on **`ANCHOR_A`/interior power** and **`CALLS`** for C vs OT; decrease over-crediting of generic lateral/mirror where C≈OT at same OVR. Ensure C’s profile penalty vs OT is driven by `max` deficiency (worst single critical duty) per Owner clarification ("price comes from BOTH worst deficiency AND accumulation, together" — not pure sum, not pure max; implement as blended as designed).
- **Concrete:** adjust `C` NEED up on interior anchor/calls, adjust `OT` NEED down on those and up on edge pass-set; recompute `M, S` with agreed λ (design detail per Owner).

### F3. Correct SCOPE / C PBLK bookkeeping (deprioritized but cheap)
- Queue notes SCOPE bug and C PBLK 6 vs 7 unsettled; fix if present in pack used for derivation (formula hygiene). **Low expected impact** on constant-flex-out behavior vs F1/F2, but removes noise.

## Before/after (to be computed — NOT RUN here)
| Move | Current ability (reported) | Owner table | Expected after F1/F2 (INFERRED) | Notes |
|---|---:|---:|---:|---|
| C>OT | 6.68 → tier 6 | 12 | **8–12** (tier 6→12 depending on SNAP weight) | primary concern |
| C>OG | ~5.1 / guard-sensitive | 6 | **6–8** | stacked-center OG exposure noted in census |
| C>DT | — | 12 | increase (interior anchor/snap relevance differs) | check not to overprice |
| C>other | — | per table | small/no change | verify no collateral misses |

**Fit impact:** adding a duty/weight changes other rows; must re-run full 99-rule fit and LOO-style checks (P-340 process). Acceptable if within Owner’s "~5 points OK" tolerance and **sim behavior** improves.

## Real test (required)
- Run lineup optimizer census on real rosters + stacked-second-elite-center scenarios (as in P-341/P-339 context): metric = frequency and wins gain of C flexing to OT/OG/DT at proposed pack vs current. **Pass condition (Owner):** centers do **not** constantly flex out in the sim. 
- **NOT RUN** in this session (no engine/census script execution).

## Recommendation
Implement **F1 (position-prior SNAP/CALLS duty in pack, OVR-compatible)**, recompute ability prices, report before/after table + census. Keep 99-rule table untouched; if behavior fixed but numeric tier differs from 12, report per Owner ("C>OT at 6 is OK unless..."). Escalate to F2 tuning only if F1 insufficient.

Labels: VERIFIED (Owner constraints/diagnostic). INFERRED (duty design, expected magnitudes). NOT RUN (recompute/census).
