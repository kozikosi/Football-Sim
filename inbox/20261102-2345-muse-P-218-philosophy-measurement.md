SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-218 philosophy measurement | DATE: 2026-11-02T23:45:00Z
FOR: P-218
VERDICT: ok

# P-218: Does the game model reward the corner philosophy?

**Question:** In the current engine, compare upgrading CB1 80→99 vs FS 80→99 (all else fixed): effect on points allowed over seeded seasons.

**Method:** Extracted `colors/` + `data/` + `tools/` from `origin/architect/engine-and-seats` (E3, d5334dcf) into a clean tree. Built all-80 baseline teams; test team at home vs an all-80 opponent, neutral plans held fixed (isolating the rating effect), 2,000 games per variant with fresh `makeRng(seed)` per game (E3's per-game seed discipline). Measured points allowed and win%.

## Results

| Upgrade (80→99, all else fixed) | PA/game | Δ vs base | Win% | Δ win% |
|---|---|---|---|---|
| all-80 baseline | 21.86 | — | 49.5 | — |
| **CB1** | 19.96 | **−1.90** | 56.3 | +6.8 |
| CB2 | 20.35 | −1.51 | 54.9 | +5.4 |
| FS | 20.71 | −1.15 | 53.9 | +4.4 |
| MIKE | 20.73 | −1.13 | 53.5 | +4.0 |
| SS | 20.80 | −1.06 | 53.4 | +3.9 |

## Findings

1. **The corner singularity is real in the model.** CB1 is the single most impactful defensive upgrade: −1.90 PA/game, ~1.65× the FS effect (−1.15). This traces directly to the coverage spec weights (`specs.ts`: CB1 1.39 vs FS 0.77, a 1.8× ratio) — the lab's fit already encodes corners > safeties, and the game sim confirms it flows through to points.
2. **Second-level ordering in the model: CB1 > CB2 > FS ≈ MIKE > SS.** Corners dominate; the safeties and MIKE cluster together.
3. **Two divergences from the Owner's v19 board, flagged not judged:**
   - The model rates FS a hair above SS (1.15 vs 1.06); v19 has SS (38) > FS (36). Within noise at this sample size — do not over-read.
   - MIKE's run-stopping value doesn't separate in this test (1.13 ≈ FS). Expected: the test uses neutral plans vs an all-80 offense, which doesn't stress the run. The Owner's MIKE-over-SS case was the Derrick Henry gashing scenario — a run-heavy opponent test would be the fair measurement (proposed follow-up, not run here).
4. **Structural limit (INFERRED):** the engine is team-level statistical — coverage is one number. It cannot distinguish "stops the 8-yard pass" from general coverage goodness. The philosophy's core (prevent completions beyond ~8 yards) has no direct expression in the model; CB1's weight is the proxy.

**Bottom line:** the model already rewards the corner philosophy — CB1 is the best defensive investment in the game by a clear margin. No model change needed to express "corners matter most." The 8-yard-pass specificity and the MIKE run-stopping case remain unmeasured; both are follow-up measurements, not build work.

**Repro:** script used `matchupModel` + `simulateGame` from E3 directly; happy to hand the 40-line script to any seat that wants to extend it (run-heavy opponent, dime-package variants).
