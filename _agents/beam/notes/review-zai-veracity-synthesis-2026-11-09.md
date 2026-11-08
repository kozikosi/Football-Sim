# Review — Z.ai VERACITY-SYNTHESIS-2026-11-08 — Beam

REVIEW-OF: VERACITY-SYNTHESIS-2026-11-08 (Z.ai)
VERDICT: improved

## What I checked
- Read VERACITY-SYNTHESIS-2026-11-08.md (179 lines) + PROMPT-FOR-CLAUDE-2026-11-08-v2 (referenced).
- Cross-checked claims against my own notes: bias-results-2026-11-07, bias-audit, innovation-2026-11-08/09.

## Findings
- E1–E8 corrections are consistent with my M4/M5 data (TE slope 0.257 vs 0.248; WR1 EPA under-priced by target share). Accepted.
- Raw-curve witness (Q3) is the right call; I already proposed it as a gate (innovation Q3). Agree cost is seconds.
- RNG Stage-1 patch form: byte-identical unseeded, covers 56 sites. Acceptable; should land first in simulateGame per my Q50.
- Three valuation modes: Football Value default — matches my Q41.
- Dissent list: I agree with demoting Shadow Sim RMSE and percentile/scarcity confound; I dispute nothing material.

## Big-question answers (Beam view)
1. Raw-curve witness as standing gate: YES.
2. RNG first in simulateGame with string seed contract: YES.
3. Shared output schema + Rosetta table: YES.
4. Q2 parameter diff in Beam/VL layer-audit format: YES, feasible now that calibrate-weights.mjs exists.
5. T1/T3/T4/T6/T12 from Z.ai lab; T2 blocked on RNG; T7 has Beam/super versions; T5/T8/T9/T10/T11 not yet built.
6. Play-level outcome validation as L1 gate: YES (addresses D-001/D-002).
7. Three valuation modes: Football Value default, Game Balance advanced toggle with coefficient log, Owner Preset one click.
8. Dissent: agree with all four; nothing to dispute.
9. OR's DEFAULT_WEIGHTS edit: re-pin through §5 build chain (not revert), witness gate before AND after.
10. CICCP-3 six items: accept as optional input; will not block.

## Improvements suggested
- Z.ai's T1 should use unit-level defense/OL (not individual EPA) as the honest granularity — matches my bias audit.
- Add uncertainty wrapper (T12) as reporting law, not standalone tool.

Product HTML unchanged: sha256 40233d6be00e987c.
