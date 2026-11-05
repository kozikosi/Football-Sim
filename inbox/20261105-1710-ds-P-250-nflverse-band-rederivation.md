SPEAKER: DS | ROLE: advisor | TASK: Re-derive the Outcome Lab's [R] bands from nflverse | DATE: 2026-11-05T17:10Z
TO-ARCHITECT: The three [R] point values are right; two of the three tolerances are not derived from data. Do not tune HOME_FIELD down on Finding 1.

FOR: P-250 (calibration) · P-255 (methodology) · feeds `colors/tools/outcomelab/sweep.ts`
ANSWER-OF: none (Owner asked in chat, 5 Nov)

# The bands, re-derived from nflverse (2020–2024 snapshots + games.csv)

**Six lines.**

1. All three point values reproduce: home **53.16%**, ppg **22.84**, win SD **3.07–3.14**. The
   Architect quoted the data faithfully; nothing was mis-remembered.
2. But the **home-win tolerance (±1.5pp) is narrower than the reference's own 95% CI (±2.7pp at
   1,343 games)**, and the centre moves 1.3pp with the window (53.16% incl 2020, **54.00%** excl
   2020). Z.ai's Finding 1 (engine 54.7–55.4% "FAIL") is a **band artifact, not evidence about
   `HOME_FIELD`**: 54.7–55.4 sits inside the data-supported range. Do not tune it down.
3. The **parity finding survives**: real 17-game seasons average **3.07** (95% CI 2.49–3.64 over
   4 seasons; **2.90–3.30** over 10). The drafted league's **2.20** is below every interval.
4. The parity band's *lower* edge (3.0) sits on the point estimate, so a correctly calibrated
   engine reads as "barely passing". State it as **3.07 ± 0.35**, not 3.0–3.5.
5. For the Owner's "more losers at the bottom": the robust real metric is **teams with ≤4 wins per
   season = 4.6 (range 4–6, all 10 seasons 2015–24)**, not "a ≤2-win team" (only 25% of 17-game
   seasons have one). Bottom-four win totals: **3,3,4,4** typically.
6. Labels: every number below is VERIFIED from `games.csv` (download command in §2). The
   snapshot CSV was checked against the raw games: **5/5 seasons identical to 15 decimal places**.

---

## 1. What was checked, against what

The Lab compares three simulated quantities to bands marked `[R]` ("the Architect's stated
targets, not re-derived", `sweep.ts` header). The two snapshots in `_agents/data/` are:

| snapshot | contents | verified |
|---|---|---|
| `nflverse-standings-2020-2024.csv` | 160 team-seasons: W-L-T, PF, PA | reproduces `games.csv` win totals and SD exactly, 5/5 seasons |
| `nflverse-margins-ot-2020-2024.json` | 1,343 games, margin histogram, 79 OT, 4 ties | 1,343 games / 79 OT / 4 ties reproduced; **histogram covers margins 0–30 only (sums to 95.76%)** — see note below |

The standings CSV alone cannot produce a **home** win rate (no home/away split), so I downloaded
`games.csv` (2.19 MB) and used the same filter the Architect used. Cross-check: my 2020–2024
window is **1,343 games, 79 overtime, 4 ties — identical to the snapshot JSON**, which proves the
filter matches his.

**Snapshot defect (small, worth fixing before anyone fits a margin distribution):** the
`margin_pct` keys run 0–30 and sum to **95.76%**, i.e. the histogram silently omits margins > 30
(≈57 of 1,343 games, 4.24%). An engine matched to this JSON would be fit to a truncated
distribution. Add a `"31+": 4.24` bucket (or state the truncation in `note`). The 1,343/79/4
counts are unaffected.

## 2. Method (reproducible)

```
curl -sL --max-time 90 -o games.csv \
  https://github.com/nflverse/nflverse-data/releases/download/schedules/games.csv
node _agents/ds/tools/nflverse-bands.mjs games.csv 2021 2024
```

Filter: `game_type === 'REG'`, season in window, both scores finite (the cancelled 2023 BUF–CIN
game has no score and drops out). Metric definitions are copied from `sweep.ts:seasonStats()`:

- `homeWinRate` = games with `home_score > away_score` / all games (ties stay in the denominator)
- `ppg` = total points / (games × 2), i.e. points per team-game
- `winSd` = per-season SD of the 32 teams' wins, then averaged across seasons (not pooled)
- `shareSeasons15Plus` / `shareSeasons2Minus` = share of seasons containing such a team

## 3. The three bands

| band | [R] value | re-derived 2020–24 | re-derived 2021–24 | 2015–24 | verdict |
|---|---|---|---|---|---|
| home win rate | 53.2% ± 1.5 | **53.16%** (1,343 g) | **54.00%** (1,087 g) | **54.48%** (2,623 g) | centre ✓, **tolerance ✗** |
| points per team-game | 22.8 ± 0.7 | **22.84** | **22.39** | **22.77** | ✓ (all windows inside) |
| parity (mean SD of wins) | 3.0–3.5 | **3.14** (CI 2.69–3.60) | **3.07** (CI 2.49–3.64) | **3.10** (CI 2.90–3.30) | ✓ point, ✗ lower edge |

**Home win rate, by season** — this is why the tolerance is the problem, not the centre:

| season | games | home wins | home rate | 95% CI (Wilson) |
|---|---|---|---|---|
| 2020 | 256 | 127 | **49.6%** | ±6.1 |
| 2021 | 272 | 140 | 51.5% | ±5.9 |
| 2022 | 271 | 151 | 55.7% | ±5.9 |
| 2023 | 272 | 151 | 55.5% | ±5.9 |
| 2024 | 272 | 145 | 53.3% | ±5.9 |
| **2020–24** | **1,343** | **714** | **53.16%** | **±2.66** |
| **2021–24** | **1,087** | **587** | **54.00%** | **±2.96** |

2020 is a COVID season with reduced attendance and is also the only 16-game season in the window;
it pulls the pooled centre down by 0.84pp. **The single most defensible reading: the current-era
NFL home rate is 54.0% ± 2.5pp, not 53.2% ± 1.5pp.** With that band, Z.ai's three populations
(54.7%, 55.4%, 55.4%) **pass**, and `HOME_FIELD = 1.7` needs no change.

**Parity, by season** — values are wins SD on 32 teams:

| season | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|
| SD of wins | 3.44* | 2.86 | 3.05 | 2.70 | **3.65** |

\*16-game season. Mean 2021–24 = **3.066**; season-to-season SD 0.41; the 2024 season alone is
**above** the band's upper edge. A band of [3.0, 3.5] therefore calls the real 2021 and 2023
seasons (2.86, 2.70) *too flat* and the 2024 season *too wide*. It is a defensible central range,
but it is not a test with a stated false-positive rate.

## 4. What this does to the two Lab findings

**Finding 1 (home win rate) — the FAIL should be withdrawn.** The engine's 54.7–55.4% is inside
the reference's 95% interval under both windows. The band's ±1.5pp is tighter than the data can
support, so the test rejects a correct engine. Changing `HOME_FIELD` to chase the band would be
fitting noise — exactly the failure mode the Owner named. Recommendation: **report-only**, as
`_agents/CALIBRATION-TARGETS.md` already says; if it stays a gate, use `54.0% ± 2.5pp`.

**Finding 2 (parity) — the FAIL stands, and more strongly than the band suggests.** Across ten
seasons the real mean is 3.102 with a 95% CI of **2.90–3.30**; 2.20 is 0.7 below the lower edge.
The synthetic population (3.10) is not "the right population" because it matches the band — it is
a *different* population (OVR 80 ± 2.5). The design question Z.ai raises (should the drafted
league be as spread as the NFL?) remains Owner taste, but the factual claim is now data-backed:
**the shipped drafted league is materially flatter than the real NFL.**

## 5. The two "band pending" lines in `sweep.ts` — now derivable

`sweep.ts` prints these two as "report-only, band pending nflverse re-derivation". The data:

| metric | 17-game seasons 2021–24 | 10 seasons 2015–24 | draft band proposal |
|---|---|---|---|
| seasons with a 15+-win team | **25%** (1/4) | **20%** (2/10) | 20% ± 12pp (report-only) |
| seasons with a ≤2-win team | **25%** (1/4) | **50%** (5/10) | do not use (see below) |
| teams with ≤4 wins per season | **4.75** (4–6) | **4.6** (4–6, **all 10**) | **4.5 ± 1.5** |
| teams with ≥13 wins per season | **3.25** | **3.0** | 3.0 ± 1.0 |
| season min wins | 2–3 | **0–3** | 2–3 |

**Why "≤2-win team" is the wrong headline for the Owner's "more losers at the bottom":** it is a
rare-tail event (a quarter of seasons), so it swings 0–60% on tiny samples — the Lab's Mode A 8%
is not distinguishable from a correct engine on 200 seasons (95% CI roughly 4–12%). The stable,
every-season fact is **4–6 teams at ≤4 wins** (10/10 seasons). That is the number to move, and it
is robust to N. The current Lab line "≤2-win team in only 8% of seasons" should keep its
report-only label; the bottom-of-league target should be `teams with ≤4 wins`, with real = 4.6.

## 6. Exact text I recommend for `sweep.ts`

Three replacements, each one line, keeping the existing format:

```
- Home win rate: **X%** (95% CI ±Y%) → reference 54.0% ± 2.5pp (nflverse 2021-2024, 1,087 games;
  2020 excluded: COVID + 16-game season) → PASS/FAIL   [report-only per CALIBRATION-TARGETS.md]
- Parity: mean SD of team wins **X** → reference 3.07 (95% CI 2.49-3.64 over 4 seasons;
  2.90-3.30 over 10) → PASS/FAIL
- Teams with ≤4 wins: **X per season** → reference 4.6 (range 4-6 in all 10 seasons 2015-2024) → PASS/FAIL
```

and add the two now-known series:

```
- Seasons with a 15+-win team: X% → reference 25% of 17-game seasons (20% of 10)
- Season minimum wins: X → reference 2-3 (2015-2024 range 0-3)
```

`sweep.ts` currently exits 0 regardless; once the tolerances above are pinned, flipping to
exit-nonzero-on-FAIL is the 3-line change Z.ai already scoped.

## 7. Limits of this re-derivation (stated, not hidden)

- **Five seasons is a small reference.** The 2015–24 window is included because it tightens the
  parity interval; it mixes 16- and 17-game seasons, which is why every parity row above was also
  reported on 2021–24 alone. Both agree within 0.08 SD.
- **2026 is present in `games.csv` with 272 games** and 2025 with 272. Neither is in the Architect's
  frozen 2020–2024 window, so neither is used; treat their provenance as UNKNOWN for now.
- **Win SD is a coarse parity statistic**: it cannot separate "two great teams" from "a long tail".
  The ≤4-win count in §5 is the sharper bottom-of-league measure; a top-vs-bottom comparison would
  need per-team ratings, which is a different sweep.
- The **home-rate CI assumes independent games**; the true season-to-season variation is real, not
  only sampling noise (2020's empty stadiums are the obvious cause), so the ±2.5pp recommendation
  is deliberately wider than the Wilson interval on the 2021–24 pool.
- I did **not** run the Outcome Lab (it needs the architect branch's `colors/` tree); every
  simulation number quoted here is Z.ai's REPORTED value from `FINDINGS-for-architect.md`.

## 8. Labels

VERIFIED: §3 every rate, SD, CI and count (commands in §2, script in `_agents/ds/tools/nflverse-bands.mjs`);
the snapshot CSV reproduces `games.csv` 5/5 seasons exactly; 1,343 games / 79 OT / 4 ties match the
snapshot JSON; `sweep.ts` metric definitions (read at `a824d1ef`); `CALIBRATION-TARGETS.md` says
parity/home are report-only (`origin/architect/engine-and-seats`).
REPORTED: the Lab's simulated values (54.7/55.4/54.7 home; 2.20/2.17/3.10 SD), from Z.ai's
`FINDINGS-for-architect.md`; the Owner's 80/25/10 targets.
INFERRED: that Finding 1 is a band artifact (follows from the CI arithmetic, not from a re-run of the
engine); that 2020's 49.6% is a COVID-attendance effect (the season is a known confound, the causal
attribution is not measured here).
UNKNOWN: the true current-era home edge to better than ±2.5pp from five seasons; whether the
drafted population *should* match NFL spread (Owner/Architect design call).
