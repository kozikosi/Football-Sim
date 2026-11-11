SPEAKER: MUSE | ROLE: Council member | TASK: P-345 Q8 — a sharper Phase 1 gate: the real margin distribution | DATE: 2026-11-11
FOR: P-345

## The question

The Owner's totals bar is ~10% on team-level means, and the margin distribution is checked for shape only. Is there a sharper gate — one falsifiable prediction that tells us in Phase 1 whether the play-level model is on the right track? This filing computes the real margin distribution from the P-344 data and proposes the gate.

## The numbers (VERIFIED — computed from the P-344 team-game summary)

Script: `_agents/muse/deliveries/p-345-innovation-2026-11-11/p345-margin-gate.py` (reads `team_game_summary_2016-2025.csv`, pairs the 5,522 team-games into 2,761 games by game_id). Game file saved as `p345-games-2016-2025.csv` in the same directory.

**Margin (home − away), 2016–2025, all games (n = 2,761):**
- mean **+1.945**, SD **14.158**, skew **0.052**, excess kurtosis **0.206**
- quantiles: 5% −21, 25% −7, median +3, 75% +10, 95% +26
- home win rate **54.8%**, ties 0.62%
- one-score games: |margin| ≤ 7 → **48.5%**; ≤ 8 → 53.0%; ≤ 3 → 24.3%
- blowouts: |margin| ≥ 21 → **16.1%**; ≥ 28 → 6.6%
- total points per game: 45.56 ± 14.00; drives per game (both teams): 22.18 ± 3.23; plays per game (both): 162.92 ± 12.06

**Regular season only (n = 2,639):** margin mean 1.777, SD 14.206, skew 0.055, home win 54.4%, one-score ≤ 7: 48.5%, blowout ≥ 21: 16.2% — the playoffs do not move the shape.

**Season-to-season stability (the honesty note for the tolerances):** home win rate 49.8–59.2% by season, one-score rate 43.9–52.5%, margin SD 12.42–15.30. Real seasons vary by about ±4 points on the rates. A gate tighter than that would fail real seasons, so the tolerances below are set against the *pooled* 10-season values, for a Phase 1 run of many seasons (whose sampling error is small) — not as a per-season test.

**Team-game shape (not just the mean):** drives 11.09 ± 1.68, skew **0.390**; plays 81.46 ± 9.61, skew 0.184; points 22.78 ± 10.00, skew 0.219; yards 343.67 ± 84.77, skew 0.037. The margin itself is nearly Gaussian (skew 0.05, kurtosis 0.21) — but the drive count is right-skewed (a few very long-drive games), which is a shape fact the model should reproduce.

## The proposed gate (P-345 IDEA — for the Owner/Architect to adopt or reject)

Phase 1 (all λ = 0) passes if, over a multi-season run, it matches the pooled real values:

| check | real value | tolerance | what it falsifies |
|---|---|---|---|
| margin SD | 14.16 | ±10% (12.74–15.57) | the model's variance is wrong even if its means are right (too many/few blowouts) |
| one-score rate (≤7) | 48.5% | ±4 points | the model's closeness is wrong (too chalky or too random) |
| home win rate | 54.8% | ±4 points | the home edge is wrong (the engine's HOME_FIELD 1.7 is the number to watch) |
| blowout rate (≥21) | 16.1% | ±3 points | the tail is wrong (the model's upsets don't happen, or happen too often) |

Plus the Owner's existing ~10% bar on the team-total means. The shape checks add what the means cannot see: a model can hit 22.78 points per team-game while producing a margin distribution that is far too wide (every game a blowout) or far too narrow (every game one score). The margin SD is the single most informative number — it is the variance of the whole game, and it is the one the drive engine's shape shows up in first.

## What would falsify the play-level model in Phase 1

- **Margin SD far outside 12.74–15.57 while the means pass.** That says the play model gets the average right and the spread wrong — the classic signature of a model whose per-play variance is mis-scaled (λ wrong in the direction the two-gap fit is meant to catch; see the companion P-345 filing on λ identification).
- **A one-score rate under 40% or over 57%.** That says the model does not produce real football's closeness — either the favourites win too easily (too little noise) or nobody holds a lead (too much).
- **A drives skew near zero or negative.** The real drive count is right-skewed (0.390). If the model produces a symmetric drive count, its drive-length mechanism is wrong even if the mean drive count is right — and the drive-length mechanism is exactly where Z.ai's PLAYLED gap lives (chain-length), so this check bites on the open question.

## Note for the Architect

The margin mean (+1.945) is the home edge in points. The engine's HOME_FIELD constant is 1.7 — close, and the difference (0.245) is within the noise of 2,761 games (SE of the margin mean ≈ 14.16/√2761 ≈ 0.27). No correction implied; the gate is on the SD and the rates, not the mean.
