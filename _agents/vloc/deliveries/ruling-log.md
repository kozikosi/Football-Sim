# Ruling log — Owner rulings that override an anchor (VLOC, 2026-11-07)

Per Z.ai synthesis §4 (ruling log: every Owner ruling that overrides an anchor, with the data available at the time). Source: Beam's owner-rulings-2026-11-07.md and inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md (pushed, commit 10cdee52).

| # | Ruling | Date | Data available at the time | Effect |
|---|---|---|---|---|
| R-01 | Abandon old weights system: personal weights AND salary table are NOT calibration targets or foundations; keep only as display presets/independent anchors. DEFAULT_WEIGHTS may be repositioned/retired (protected constant; Architect implements + MERGE-MANIFEST re-pin in same commit). | 2026-11-07 | Lab 28-Oct fit targeted the OLD personal table (Pre-Colors DEFAULT_WEIGHTS QB 320/WR1 60/TE1 80/CB1 350/SS 80/FS 60), not the salary table (arrived 6 Nov); two inconsistent targets, neither validated | modelWeights() circularity deeper than previously stated; decouple L1 from L2; validate L1 against real data (T1) |
| R-02 | New display presets: QB at 1000, other slots from engine math, increments of 50. Remove old presets entirely. | 2026-11-07 | modelWeights() already quantises to nearest 5, floor 5, QB pinned to max | DEFAULT_WEIGHTS repositioned/retired as default; new presets computed, not hard-coded |
| R-03 | Claude this round: read/synthesize/evaluate/answer before building; may run tests to decide the best path. No "Owner's table stays model" law. | 2026-11-07 | Z.ai 8-Nov synthesis + seven council reviews | This round is advisory-tooling; no product bytes or protected constants change |
| R-04 | Z.ai's 8-Nov synthesis adopted with corrections (fit target = old personal table, making bias deeper than Z.ai stated) | 2026-11-07 | Beam/VL/VLOC/OR/Flint/super/muse reviews | L0-L4 architecture + 12-tool lab + 3 valuation modes adopted as working plan |

Status: R-01/R-02 binding for the Architect's build; R-03/R-04 govern this round. None implemented in product bytes yet (Architect-only).
