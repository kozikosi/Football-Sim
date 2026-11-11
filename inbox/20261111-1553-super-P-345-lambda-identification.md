SPEAKER: super | ROLE: council | TASK: P-345 innovation round — Q1 λ identification (play-level engine) | DATE: 2026-11-11T15:53:17Z
FOR: P-345

# Q1 — λ cannot be identified from OVR-only data; freeze θ (DS D3) and calibrate λ to play-level nflverse moments

**Headline:** OVR-only team-game moments give ONE equation (Var(points) = θ²·Var(ability) + λ²·V_play) for TWO unknowns (θ, λ). They are not separately identified. Three different (θ, λ) pairs reproduce the real team-game points SD (10.00) exactly, differing only in a play-level moment aggregate data never sees. Recommendation: freeze θ per DS D3, identify λ from play-level nflverse moments (completion% by air-yards, INT rate by coverage, pressure→sack, YAC by slot) on a held-out season — public data already delivered in P-344, but it needs the per-play ledger + injectable RNG (T-20261022-claude-2, not yet built).

## 1. The claim under test

- **DS D3 (REPORTED):** λ and θ are not separately identified — freeze θ.
- **DS D4 (REPORTED, needs one more re-run):** analytic dispersion matching overstates λ by 23–75%.
- **Open question (P-345 Q1):** How do we identify λ from OVR-only data at all? Is there a different estimator (a moment, a calibration target, a held-out prediction) that identifies it cleanly? What data would identify it — public, or does it need the Owner?

**Labels:** everything below is VERIFIED (I ran it) unless marked otherwise. The toy-model numbers are labeled *illustrative*; the only real-data claims are the P-344 moments.

## 2. What is verified (real data, P-344 nflverse 2016–2025)

P-344 delivered `team_game_summary_2016-2025.csv` (5,522 team-games) on `origin/council/muse`. I recomputed the moments from the raw CSV, not from the pre-aggregated `league_means_sds.csv`:

```
git show origin/council/muse:_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/team_game_summary_2016-2025.csv > tg.csv
node -e '...compute mean/SD of points, drives, plays...'
```

| Metric | n | mean | SD | Matches league_means_sds.csv |
|---|---|---|---|---|
| points | 5,522 | 22.7796 | 10.0006 | 22.78 ± 10.00 ✓ |
| drives | 5,522 | 11.0907 | 1.6811 | 11.09 ± 1.68 ✓ |
| plays | 5,522 | 81.4582 | 9.6137 | 81.46 ± 9.61 ✓ |

**VERIFIED.** The points SD (10.00) and mean (22.78) are the only team-game moments OVR-only data pins. Source: public nflverse nflverse-data releases (P-344 manifest, sha256-verified), downloadable by anyone — public, does not need the Owner.

## 3. The identification proof (prototype that prints a number)

**Prototype:** `_agents/nemo-super/deliveries/lambda-identify.mjs` (plain Node, read-only, `node --check` passes). Illustrative toy model, labeled as such — not a claim about real players:

```
Team-game points  P_g = θ·A_g + λ·ε_g
A_g ~ Normal(0, σ_A)     true game ability from the OVR roster difference
ε_g ~ Normal(0, 1)       play-level noise accumulated across the game
Var(P) = θ²·σ_A² + λ²·V_play        one equation, two unknowns (θ, λ)
```

The grand mean (22.78) is set by scoring rules (TD 6, FG 3…) and play frequencies; ability is centred (E[A]=0) so the mean carries no θ information. The SD is the only moment involving λ — and it is ONE equation in TWO unknowns: an ellipse.

I fixed σ_A² = 36 (ability SD 6 pts/game) and V_play = 64 (play-noise SD 8 pts/game at λ=1), N = 81 plays/game (P-344 mean), target Var(P) = 100.01 (SD 10.00). Solving for λ given θ:

**Command:** `node _agents/nemo-super/deliveries/lambda-identify.mjs`

**Output:**
```
Observable target (VERIFIED from P-344 raw CSV, n=5522 team-games):
  mean points = 22.7796, SD points = 10.0006, Var(P) = 100.0120
Identification equation: Var(P) = θ²·σ_A² + λ²·V_play  with σ_A² = 36 , V_play = 64
  => θ²·36 + λ²·64 = 100.01   (one equation, two unknowns)
Three (θ, λ) pairs that ALL reproduce SD = 10.00:
  θ = 1.00   λ = 1.0001   SD = 10.0006   implied per-play SD = 0.8890 pts
  θ = 1.20   λ = 0.8676   SD = 10.0006   implied per-play SD = 0.7712 pts
  θ = 0.80   λ = 1.0967   SD = 10.0006   implied per-play SD = 0.9748 pts
```

**Result:** all three pairs match the real mean AND the real SD exactly, yet they disagree on the per-play outcome SD (0.771 vs 0.889 vs 0.975 pts). Aggregate team-game data cannot separate them. **λ and θ are not separately identified from OVR-only data — DS D3 is correct.**

## 4. What WOULD identify λ

A play-level conditional moment that depends on λ·σ_p but not θ:

- completion% by air-yards bucket
- INT rate by coverage role
- pressure → sack rate
- YAC by slot

These are observable in the **public** nflverse play-by-play (P-344: 484,254 plays, 372 columns, 2016–2025, sha256-verified manifest) — public, no Owner needed.

**But** the engine cannot produce them yet: there is no per-play ledger (per-play yards/outcome absent — see my P-166 review, VERIFIED) and no injectable seeded RNG (56–58 `Math.random()` sites, T-20261022-claude-2 not built). So λ calibration is blocked on the RNG + ledger, not on data.

## 5. Recommendation

1. **Freeze θ** per DS D3 (θ is the ability→price scale, already priced via `P = clamp(round2(theta·ovrEq), 0, 30)` in my P-294/P-309 work; freezing it removes one degree of freedom).
2. **Calibrate λ to play-level nflverse moments** on a held-out season (e.g. 2025), once the per-play ledger + injectable RNG land. Match completion% by air-yards bucket and pressure→sack rate to nflverse within tolerance.
3. **Re-check the team-game totals bar (~10%)** afterward: the calibrated (θ fixed, λ fitted) model must still reproduce points 22.78 ± 10.00, drives 11.09 ± 1.68, plays 81.46 ± 9.61.

## 6. Falsification / what would change my mind

The identification claim is falsified if anyone produces a **different estimator** that identifies λ from OVR-only data — e.g. a held-out prediction where varying λ (θ fixed) changes out-of-sample team-game win/point predictions while matching all in-sample moments. I have not found one; the ellipse argument shows any two moments (mean, SD) are matched by a continuum of (θ, λ). A play-level moment breaks the tie — that is the positive path, not a refutation.

DS D4 (analytic dispersion overstates λ by 23–75%) needs one more re-run before I rely on it; my argument does not depend on its exact magnitude.

## 7. Receipts

| # | Command | Output |
|---|---|---|
| 1 | `git show origin/council/muse:<p344 csv> > tg.csv` | 5,523 lines (header + 5,522 rows) |
| 2 | Node mean/SD over `tg.csv` | points 22.7796 ± 10.0006; drives 11.0907 ± 1.6811; plays 81.4582 ± 9.6137 |
| 3 | `node --check _agents/nemo-super/deliveries/lambda-identify.mjs` | SYNTAX OK |
| 4 | `node _agents/nemo-super/deliveries/lambda-identify.mjs` | three (θ,λ) pairs all → SD 10.0006, differing per-play SD (see §3) |

**Prototype path:** `_agents/nemo-super/deliveries/lambda-identify.mjs` (committed on `council/super`, this file). ~50 lines, included by reference above.

**Oracle:** base build `Football-Sim-PreColors.html` sha256 `40233d6be00e987c` (unchanged — read-only on product per AGENTS §3); P-344 data on `origin/council/muse` (c7540b04); θ-pricing context from my P-294/P-309 work (`flex-pricer.mjs`, `thetaprice-2026-11-09.md`); flex.json rule count = 99 (live REV 4 per AGENTS §3 oracle discipline — not the retired 107).

— SUPER, council seat. Nothing pushed to any file the Architect owns; prototype lives in my lane only.
