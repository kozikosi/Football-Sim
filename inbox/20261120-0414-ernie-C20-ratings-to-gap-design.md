SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C20 — ratings→gap design note (post-cutover, prepared now) | DATE: 2026-11-20T04:14Z

FOR: the Architect (post-cutover), the council
VERDICT: **design ready; not buildable on the data in the repo.** Formula A is the only candidate that can be built without historical ratings; the weights must come from the measured distribution, not from a fit.

---

## 1 · What exists

| input | where | state |
|---|---|---|
| player ratings (ovr, spd, str, position, team) | `data/madden27-ratings.csv` (1,941 players) | one snapshot, Madden 27 (REPORTED provenance — the Owner's data rule says non-EA ratings; this is a placeholder until his file lands) |
| team-season tilt scores (the labels) | `tools/mathlab/results/passgap-2026-11-20.md` + the tool's output | 320 team-seasons (2016–2025), offense and defense |
| the engine's pass-class model | `colors/src/sports/nfl/sim/passclass.ts` (`theta`, `lambda`), `drive.ts:tilt` | the tilt seam; λ = 0 today |

**There is no per-season ratings history** — Madden 27 is one snapshot, the labels are ten seasons. So a regression of the labels on the ratings is **not fittable** (one X, ten Y). That rules out the obvious candidate and is the single most important fact in this note.

## 2 · The candidates

**A · Weighted z-scores (buildable).** Per team, per side:

```
off = Σ w_i · z(rating_i)     // QB, WR1-3, TE1, RB1, OL1-5
def = Σ w_i · z(rating_i)     // DL1-4, LB1-3, CB1-2, S1-2
gap_off = (off - mean(off)) / sd(off) · 0.0236
```

- `z` is per season (or per the single snapshot's league distribution — with one snapshot, center on the 32 teams).
- The weights `w_i` are **not fitted**; they come from the pass-class participation: each position's share of pass-class snaps (WR/TE/RB receiving, QB dropbacks, OL pass-pro, DL pass-rush, LB/CB/S coverage). The item-6 `coef`/`theta` give the class mix; the participation rates give the position weights.
- The final scaling to `0.0236` is a calibration constant, set so the gap's sd matches the measured tilt. It is not a free dial — it is the same unit conversion as λ.

**B · Pass-class-weighted gaps (a refinement of A).** Weight each team's offensive weapons by the *class* they play (e.g. a WR's garnish by the `pp`/`no` class mix), then take the gap between the team's pass-offense score and the opponent's pass-defense score. Same target, more football meaning.

**C · Regression on the labels (not buildable).** One ratings snapshot, ten seasons of labels; no per-season ratings. Do not attempt it; if a future season of ratings arrives, revisit.

## 3 · The target and the test (from C2)

The gap is right iff:

1. **mean ≈ 0** per season;
2. **sd within ±20% of 0.0236**;
3. **year-to-year correlation ≥ 0.3 offense / ≥ 0.1 defense** (the measured 0.45/0.2, with margin);
4. **points at `|s| = 0.25` stay inside ±4%** (the item-6 scale).

Falsified if (2) is off by more than ~2×, or (3) is below the measured values. A fit that matches mean/sd but fails (3) is overfitting in-season noise.

**Sign convention:** positive = the offense is better. State it in the code comment and in the report.

## 4 · The honest caveats

- **The ratings are a placeholder.** Madden 27 is not the Owner's ratings; any gap built on it is provisional and must be re-derived when his file lands. Label it in the UI if it is ever displayed.
- **The tilt is small.** At the typical gap (sd 0.0236), `s ≈ 0.16` → ~±2.6% points (~1.3 points on a 48-point game); the 95th percentile ≈ ±6.5% (~3 points). That is a field goal, not a touchdown — correct, but it means the feature will not be visible in one game, only over a season.
- **λ stays 0** until the gap exists and passes the four conditions. Turning λ on without the mapping would apply a guessed gap to a real distribution.

## 5 · What I did not do
- I did not build the gap, edit the engine, or fit anything.
- I did not verify the Madden ratings' provenance (the Owner's rule; REPORTED).