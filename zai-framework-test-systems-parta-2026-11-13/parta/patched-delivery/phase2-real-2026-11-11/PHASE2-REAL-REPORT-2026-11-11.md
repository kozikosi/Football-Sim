# PHASE 2 REAL — the harness on the real P-344 data, 2016–2025 (P-346)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner and the council
**Replaces:** the synthetic self-test as the match evidence. The self-test proved the machine (30/30 spots, worst |delta| 2.5 pts CB2 — re-verified this session after the loader fix, §7); **this report runs it on the real thing.**
**Data:** P-344 (council/muse `c7540b04`): all 30 nflverse files fetched from the manifest URLs and **sha256-verified before use** (`fetch_log.txt`, 30/30 OK). Basis: pass+run plays, regular season (`game_type=REG`) primary — the all-games variant (regular+playoffs) was run too and agrees (both JSONs shipped).
**Scripts (deterministic, no RNG):** `phase2_real.py` (real-mode loaders + per-season driver; the mapping/comparison functions are the shipped harness's own, imported unmodified), `report_tables.py` (the tables below). Run logs: `run_log_reg.txt`, `run_log_all.txt`. Machine-readable: `phase2_real_results_reg.json`, `phase2_real_results_all.json`. Owner-readable table: `spot_table_staged_vs_real.csv`.

**Labels:** VERIFIED = my script computed it on the verified files and the receipt re-runs · REPORTED = someone else's number · INFERRED = my reading, needs the Owner or more data.

---

## 0 · Bottom line

**1/30 spots within ±3 points of play-share, pooled 2016–2025 (only RB2).** The tolerance fails — and the way it fails is the finding. Three stories, all measured:

1. **The package structure of the Ledger is real** — offensive and defensive package shares land in the plausible bands all decade (§3, §6). The base/nickel/dime mix, the 11/12/21 package mix, the FB decline: all present in the real data and shaped like the Ledger says.
2. **The seat concentration is not** — the engine stages every every-down seat at 1.0 (no injury, no rotation, no platoon); real football's seat-leaders sit at **0.40–0.88** (§6). This is structural, not tuning: the staging models a full-health ideal game. The Owner's totals bar cannot see it; Phase 2 now measures it.
3. **Two seats are directionally wrong and both matter for the merge's E table** — DIME staged 0.0694 vs real **0.126** per-play (≥6-DB packages; the Ledger under-stages dime roughly 2×, and the engine's DIME_W 0.15 sits right on the real 2018–2021 share); FB staged 0.1265 vs real **0.092** decade mean (the Ledger freezes FB at its ~2017 level; real FB declined 0.143 → 0.081 across the window). **The FB acceptance band (E < 0.2228) holds in all ten real seasons** — the Owner's FB>RB = 2 is consistent with real football everywhere in the window (§5).

**B1 · DIME (settled with data):** the real DIME personnel share is **0.094–0.159 by season, league mean 0.1263** (per-play ≥6 DBs from the participation personnel, both grammar eras unified). Neither published number is right as a static share: the Ledger's 0.069 is below every real season; the engine's 0.15 matches the 2018–2021 peak (0.138–0.159) and overshoots 2022–2025 (0.094–0.117). The trend down after 2019 is a scheme evolution — none of the P-344 rules-regime changes (kickoff/OT/playoff) touch defensive packages, and no seat shows a regime-year jump anywhere (§6). **Settle path: (1) Phase 2 data wins — re-anchor the package tables to ~0.12–0.13 (static) or per-season; (2) the DIME_W-as-rating-weight two-layer reading stands, now with numbers — a 15% rating blend is a *rating weight*, and 0.15 happens to be the real dime share of the era it was plausibly calibrated on; (3) the re-derived situation blend should target 0.126 league-mean, not 0.15.**

**B2 · WR1 gravity (the denominator verified; the doubles still not public):** the real top WR takes **7.0–7.7 targets/team-game** (by snaps or by targets — the two WR1 definitions agree in aggregate, concordance 0.63–0.78 per team-season) and **2.0–2.2 deep (≥15 air-yd) targets/team-game**, every season 2016–2025. The staged trigger's deep-target denominator (1.75/tg at τ=15) is real-order — ~15% low, same shape. **The staged WR1 target VOLUME is over-concentrated: the engine stages ~12.4 WR1 targets/tg (~33% of team passes) against the real ~7.3 (~20%).** The re-trigger's P values were calibrated against the real 3–6 doubles band, not the volume — the band constraint stands; what changes is the numerator feeding it. **Real double-team rates are NOT in the public release** — the missing data, named exactly: per-play double-team/bracket/pressure-scheme flags (PFF/SIS-class charting, paid) or raw NGS tracking frames (public only for the Big-Data-Bowl week windows, not full seasons). What IS measurable from the public files, proposed as the gravity stat: **the top WR takes a stable 30.4–33.5% of his team's deep targets, every season** (`b2_gravity_index.json`) — one number per game, stable for a decade, computable from the manifest files with no join beyond a name normalization.

**B3 · FB scarcity (confirmed, and sharpened):** real FB-labeled play share declined **0.1426 (2016) → 0.0814 (2025)**, decade mean 0.098; only **11 of 32 teams** fielded any FB-labeled player in 2025 (median among those 11: 0.2168 — the seat is now a niche role with heavy team-level variance). The staged 0.1265 equals real football circa 2017 — the Ledger freezes the FB at the front of its decline. Scarcity reading: **confirmed** — a rostered position under 10% play share, declining. The scarcity→design rule this supports (IDEA, §8): the merge's E table should be **re-measured per era** rather than frozen; on every season's real E_FB, the Owner's FB>RB = 2 and FB>TE = 6 both land unchanged, so the ruling is era-robust — the formula inherits that robustness for free.

**What changed in the Ledger Phase 1 conclusions:** nothing retracts; three entries sharpen (companion addendum: `LEDGER-PHASE1-ADDENDUM-2026-11-11.md`).

---

## 1 · What ran, and the receipts

- **Fetch:** all 30 files from the manifest URLs, sha256 + byte-size verified against the manifest before any use (`fetch_log.txt`, `fetch_progress.log`). 30/30 OK, ~235 MB.
- **Schema findings the council should have (verified on the files):**
  1. **`personnel_o`/`personnel_d` do not exist in the pbp release in any season 2016–2025** — they live only in `pbp_participation` (join `game_id+play_id`). The harness's §1 schema maps onto the participation join; the loaders do exactly that.
  2. **`snap_counts` carries `game_type` (REG/WC/DIV/CON/SB)** — the P-344 INDEX's "derive season_type by joining game_id to pbp" workaround is unnecessary; the column is right there. (Both paths agree where checked.)
  3. **The personnel strings have two grammar eras**: 2016–2022 grouped ("4 DL, 2 LB, 5 DB"), 2023–2025 NGS per-position lists ("3 CB, 2 DE, 2 DT, 1 FS, 1 MLB, 1 OLB, 1 SS"). One unified parser handles both (DL/LB/DB label sets, DB = CB+FS+SS+S+DB+NB+SAF).
  4. **The P-344 participation caveat is a non-issue for the personnel checks**: on pass+run plays the unknown-personnel rate is **0.0–0.04% every season** (the ~7% participation gap in 2023–2025 is concentrated in non-scrimmage rows). Explicitly accounted: `missing_participation` per season in the results JSON.
  5. **2023+ offense_personnel lists FB as its own label** (2016–2022 folded it into RB), so the RB/TE/WR compact labels are not grammar-comparable across the boundary for 2-back shapes: the real 21/22 shares crash at exactly 2023 because the FB stops counting as RB. Verdicts on 21/22 use the comparable 2016–2022 era only; 11/12/13 are robust across the boundary.
- **Machine checks:** the real seat-fill adapter reproduces the shipped `map_spots` on the shipped synthetic snaps **exactly** (max share diff 0.000000, `loader_equivalence_check`); the self-test re-run after the loader fix is 30/30 within ±3 pts (§7).
- **Determinism:** both full runs re-run byte-identically (verified twice); no RNG anywhere in the pipeline.

## 2 · The at-a-glance table (staged vs real, pooled 2016–2025, ±3 pts)

Staged = Ledger Phase 1 `even80` play-shares. Real = league mean of per-team-season seat shares over 320 team-seasons (regular season). **Every seat key is emitted for every team** (0.0 when the seat never took the field) — the shipped comparator's mean-over-teams-that-have-the-spot would otherwise select-bias the partial seats (§7, fix 9). DIME/DL5 rows use the per-play package measures (the snap-leftover "seat-hours" are the rotation measure, reported in §6 — they can exceed 1.0 and are not seat-occupancy shares).

| spot | staged | real | Δ pts | | spot | staged | real | Δ pts |
|---|---|---|---|---|---|---|---|---|
| DE2 | 1.000 | 0.403 | −59.7 | | QB | 1.000 | 0.823 | −17.7 |
| DE1 | 1.000 | 0.576 | −42.4 | | OG1 | 1.000 | 0.831 | −16.9 |
| OG2 | 1.000 | 0.623 | −37.7 | | CB1 | 1.000 | 0.856 | −14.4 |
| TE1 | 1.000 | 0.628 | −37.2 | | CB3 | 0.619 | 0.491 | −12.8 |
| OT2 | 1.000 | 0.661 | −33.9 | | OT1 | 1.000 | 0.881 | −11.9 |
| WR1 | 1.000 | 0.689 | −31.1 | | MIKE | 1.000 | 0.884 | −11.6 |
| CB2 | 1.000 | 0.694 | −30.6 | | SAM | 0.381 | 0.494 | **+11.3** |
| DL5 | 0.311 | 0.023⁺ | −28.8 | | TE3 | 0.090 | 0.193 | **+10.3** |
| DT2 | 0.689 | 0.415 | −27.4 | | WR4 | 0.203 | 0.298 | **+9.5** |
| RB1 | 0.780 | 0.524 | −25.6 | | WR3 | 0.427 | 0.485 | **+5.8** |
| SS | 1.000 | 0.749 | −25.1 | | DIME | 0.069 | 0.126⁺ | **+5.7** |
| DT1 | 1.000 | 0.760 | −24.0 | | FB | 0.126 | 0.092 | **−3.4** |
| WR2 | 0.868 | 0.639 | −22.9 | | **RB2** | **0.306** | **0.285** | **−2.1 OK** |
| FS | 1.000 | 0.774 | −22.6 | | | | | |
| WILL | 0.931 | 0.709 | −22.2 | | | | | |
| C | 1.000 | 0.781 | −21.9 | | | | | |
| TE2 | 0.201 | 0.380 | **+17.9** | | | | | |

⁺ per-play package share (DL5 = ≥5-DL packages, mapping-limited; DIME = ≥6-DB packages). Full per-season table: `spot_table_staged_vs_real.csv`; per-season within-rates and rows in the results JSONs.

**The offensive package table** (share / run-rate, real vs staged even80; 21/22 verdicts on the grammar-comparable 2016–2022 era — see §1 finding 5):

| package | staged share | real share 2016–22 | real 2025 | staged run | real run 2016–22 | verdict |
|---|---|---|---|---|---|---|
| 11 | 0.630 | 0.582–0.630 | 0.560 | 0.269 | 0.31–0.33 | lands (real runs it slightly more) |
| 12 | 0.124 | 0.167–0.203 | **0.220** | 0.550 | 0.48–0.53 | **staged under-stages 12 — and it grew to 22% by 2025** |
| 13 | 0.034 | 0.029–0.040 | 0.049 | 0.601 | 0.60–0.65 | lands |
| 21 | 0.114 | 0.068–0.078 | (n.c.) | 0.663 | 0.53–0.57 | staged over-stages 2-back sets ~1.6× and over-runs them |
| 22 | 0.098 | 0.018–0.029 | (n.c.) | 0.630 | 0.70–0.81 | staged over-stages 22 ~4× |

The package mix explains the seat blocks below it: the real league lives in 11 (56–62%) with **12 personnel growing to 22% by 2025** and 10-personnel (104) a 1.6–2.5% residual — so real TE2/TE3/WR3/WR4 seat shares run above the staged ones (the engine leans 21/22 instead), and real RB1 runs below the staged 0.780.

**Reading the three blocks:**
- **Under-staged concentration (the −20s and −30s):** every seat the engine stages at 1.0 sits at 0.4–0.88 real — injuries, platoons, rotations, and the 3-4 labeling effect (real edge rushers carry OLB/LB labels, which pulls the DE seats down; the staged Ledger's DE1/DE2 are every-down 4-3 ends). The engine has no injury/rotation layer; the Ledger's staging is an ideal-healthy structure.
- **Over-staged support seats (+6 to +18):** TE2, SAM, TE3, WR4, WR3 — the engine's personnel mix (12/13/21/22 at 12.4/3.4/11.4/9.8%) rotates in more TE/RB/LB bodies than the real league, which lives in 11 and 12 (the real 12-personnel share, 0.17–0.22, exceeds the staged 0.124 — which is why real TE2 runs above staged TE2). The engine's 2-back sets are the outlier: staged 21+22 = 21.2% of plays vs real 2016–22 = 8.8–10.7%.
- **In-band or near-band:** RB2 (−2.1, the one pass), FB (−3.4, just out, §5), DIME (+5.7, §3), WR3 (+5.8).

## 3 · B1 — DIME, settled with data

Real DIME personnel share per season (per-play ≥6 DBs; strict-6 in parens — 7-DB "quarter" packages add ~0.5–1 pt):

| season | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | mean |
|---|---|---|---|---|---|---|---|---|---|---|---|
| real dime | 0.125 | 0.136 | 0.141 | 0.159 | 0.147 | 0.138 | 0.106 | 0.117 | 0.100 | 0.094 | **0.1263** |
| (strict 6) | 0.121 | 0.126 | 0.130 | 0.150 | 0.137 | 0.134 | 0.098 | 0.109 | 0.097 | 0.091 | 0.119 |

Against the two published numbers: the **Ledger's staged 0.0694 is below every real season** (the min is 0.094) — the Ledger under-stages dime roughly 2×; the **engine's DIME_W 0.15 is the real 2018–2021 share** (real 0.138–0.159 in those seasons) and overshoots 2022–2025 (0.094–0.117). The trend peaks in 2019 and declines through 2025 — a scheme evolution; the nickel share runs the other way (0.52–0.67, peaking 2023), and the 4-LB "3-4-ish front" share rises to 0.437 by 2025 (`lb4_front_share`, reliable only 2023+ where the NGS labels distinguish OLB/ILB).

**Verdict on the three settle paths** (from the Part B report's framing, now with the data): (1) **Phase 2 data wins** — re-anchor the package tables to the measured share (static ~0.12–0.13, or per-season if the Owner wants the trend); my recommendation, one measurement closes it. (2) The **two-layer reading stands with numbers**: DIME_W = 0.15 is a rating weight (matchup.ts:51 blend, unconditional), and 0.15 coincides with the real dime share of 2018–2021 — plausibly the era it was set from — but a rating weight is not a snap share and no mechanism makes it one. (3) If DIME_W is re-derived as the situation-weighted blend, the target is **0.126 league-mean, not 0.15**.

## 4 · B2 — WR1 gravity: the denominator verified, the doubles still not public

Real top-WR receiving volume (league means; "by snaps" = the snap-count WR1; "by targets" = the most-targeted WR — they agree in aggregate):

| season | targets/tg (by snaps) | deep15/tg | deep12/tg | deep20/tg | targets/tg (most-targeted) | deep15/tg |
|---|---|---|---|---|---|---|
| 2016 | 7.6 | 2.15 | 2.85 | 1.17 | 7.9 | 2.16 |
| 2019 | 7.7 | 2.19 | 3.03 | 1.32 | 7.4 | 1.99 |
| 2025 | 7.0 | 2.03 | 2.69 | 1.14 | 6.7 | 1.85 |

(Full decade in the JSONs.) **The staged trigger's deep-target denominator is real-order:** the Ledger stages 1.75 WR1 deep targets/tg at τ=15; real top-WR deep15 is 2.0–2.2 — ~15% higher, same shape, stable across the decade. **The staged WR1 target volume is over-concentrated:** staged ~12.4 targets/tg (~33% of team passes) vs real ~7.0–7.7 (~20%) — the engine funnels the WR corps' alpha into one seat. The re-triggered doubles rate (4.37/team-game at τ=15, inside the real 3–6 band) was calibrated to the band, not to the volume; with the real denominator the band constraint stands, and the short/intermediate bracket term (~3.0 of the 4.37) remains the right reading — real deep volume alone cannot carry 3–6 doubles.

**What is missing for real doubles, named exactly:** a per-play double-team/bracket flag (who was doubled, by whom, in what coverage). Not present in pbp, participation, or snap_counts in any season. The public paths: NFL Big-Data-Bowl tracking frames (weeks-limited windows, not full seasons — enough for a rate prototype, not for 2016–2025) or paid charting (PFF/SIS). Until then the 3–6 band stays REPORTED, and the trigger stays band-calibrated with verified denominators.

**The gravity stat this data does support** (the P-335 ask, one number per game): **the top WR takes 30.4–33.5% of his team's deep targets, stable every season 2016–2025** (`b2_gravity_index.json`). It is measurable from the manifest files alone, stable across ten seasons and two rules regimes, and it says "deep-ball gravity is real and constant" — the exact shape a gravity term inside the formula would ride.

## 5 · B3 — FB: scarcity confirmed, and the ruling is era-robust

Real FB-labeled play share (league mean over ALL 32 teams; zero when the team fields none):

| season | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | mean |
|---|---|---|---|---|---|---|---|---|---|---|---|
| real FB | 0.1426 | 0.1259 | 0.0881 | 0.0899 | 0.0996 | 0.0898 | 0.0952 | 0.0852 | 0.0819 | 0.0814 | **0.0980** |
| in band E<0.2228 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |

- The staged 0.1265 equals real football **circa 2017** — the Ledger freezes the FB at the front of a real decline (−43% across the window; the step-down at 2018 is scheme, not any listed rules change).
- **Every real season sits inside the FB acceptance band** (E < 0.2228) — the Owner's FB>RB = 2 straddle resolves to the Owner's 2 on every season's real measurement, and FB>TE = 6 rides the ability layer (unchanged). **FB = scarcity is confirmed on the real data: a rostered position under 10% play share in the modern game, now 11/32 teams fielding one at all.**
- Label caveat (stated, not tuned away): the release's position label is the player's listed position and some de facto backs carry it (e.g. KC 2016: Spencer Ware, 544 FB-labeled snaps — a lead-back season). The measure is "share of plays with an FB-labeled player on the field" — the real counterpart of the engine's FB seat; the distribution stats (n_teams_with_fb, median, max per season) are in the results JSON so the label noise is visible rather than hidden.

## 6 · Spot shares generally, and the regimes

- **No regime jumps:** no spot's staged-vs-real |delta| moves ≥2 points at any of the P-344 regime years (2018 kickoff/helmet, 2021 17-game, 2024 DK trial, 2025 permanent) — the listed regimes touch kickoffs/OT/playoff structure, not offensive/defensive package seats. The seat shares drift smoothly; the only step-shaped change in the data is the FB 2018 step-down, which is a scheme trend, not a rules regime. A regime-adjusted tolerance (the INNOVATE ask) is **not needed for the seat table** — the honest finding is that the ±3 pt gate fails for structural reasons, not regime ones.
- **The rotation the staging doesn't model:** real DL rotations put ~0.9–1.1 plays-worth of line snaps beyond the four named line seats per play (`dime_dl5_seat_hours_pooled.DL5 = 1.076` seat-hours; DIME seat-hours 1.270) — the engine's DL5 seat (0.311, a DT2-substitution seat) and DIME seat (0.069) are far thinner than the real rotation. The per-play package comparators (≥5 DL: 0.012–0.034; ≥6 DB: 0.094–0.159) show the engine's DL5-as-package is rare in reality — the real "5th lineman" is a rotation body, not a package.
- **The 3-4 labeling effect** (ties to the B3 follow-up): real edge rushers on 3-4 teams carry OLB/LB labels, so the DE seat shares (real 0.576/0.403) mix 4-3 ends and 3-4 DL; the LB seats are depth-order (no MIKE/WILL/SAM labels exist in the release outside a few seasons). This is a stated mapping limit, not a Ledger error — the report does not tune it away.

## 7 · What the real run fixed in the machine (the report tells the council what to fix)

1. **`phase2_harness.load_snaps` aggregated per player per team-GAME (was: last-row-wins).** The shipped loader overwrote the dict per row, silently keeping one game per player on any real per-game file. The synthetic self-test could not see it (weekly rows are scale-uniform — shares are scale-invariant), the real data caught it. Fixed in the corrected harness copy; the self-test re-run is still **30/30 within ±3 pts** (worst |delta| 2.3, CB2), `phase2_results.json` regenerated (numbers moved slightly — different jitter aggregation; documented in the corrections note, fix 8).
2. **Seat-exclusion selection bias (found by the real data, fixed in the real adapter, flagged for the shipped comparator):** the shipped `compare_spot_shares` means over teams that HAVE the spot key. On the synthetic data every team has every seat; on real data 21 of 32 teams (2025) have no FB-labeled snaps — the FB mean would have been the FB-heavy teams' mean (0.2034, 2016) instead of the league mean (0.1335→0.1426 all-FB). The real adapter now emits every staged seat key (0.0 when the seat never took the field) so every spot's mean is over all 32 teams. The shipped `compare_spot_shares` itself is unchanged (the synthetic receipt stays byte-compatible); the fix lives in the real adapter and is documented for the next harness revision.
3. **Loaders for the real schema** (isolated, per the design): snap_counts columns (`offense_snaps`/`defense_snaps`/`st_snaps`, `game_type`), the real position vocabulary (generic OL/DL/DB/S routed to the rotation/extra seats, combos by first token), and the participation join for personnel (both grammar eras). The mapping/comparison functions are the shipped harness's own, imported unmodified; the adapter is equivalence-checked against them (max diff 0.000000).

## 8 · IDEA (the innovation the prompt asked for)

- **IDEA: the merge's E table should be era-anchored, not frozen.** The real data shows E_FB moving 0.14 → 0.08 in a decade while the Owner's tiers never moved. A merge that re-measures E per era (or per league snapshot) inherits the era-robustness the ruling already has; one column in the fold produces it (the per-team base input from the Part B report, generalized to a league snapshot).
- **IDEA: the deep-target gravity index is the first formula-ready gravity stat.** Top-WR share of team deep targets: 30–34%, stable, one join, no charting vendor. If gravity enters v (Q6), this is the measured seed; the doubles term enters later, when the flags exist.
- **IDEA: the λ calibration target should be conditional, not total.** Real 2023: points/team-game SD 8.47 unconditional, **7.6–8.3 at fixed drive count** — the drives→points feedback channel the analytic estimator ignores is worth ~10–20% of the variance, exactly the 23–75% λ overstatement DS D4 found. Matching Var(points | drives=N) at two or three N values is a sharper, feedback-free moment than the unconditional SD, and it is computable from the P-344 files today (`p345_lambda_conditioning.json`).
- **IDEA: the per-spot table format above is the deliverable shape for the Owner** — staged | real | Δ in one glance, tolerance flags in-line, per-season detail one CSV away. Regime labels attached per season in the results JSON for any future regime question.

## 9 · Caveats (stated, not hidden)

- Position labels are PFR's listed positions; FB/DE/LB carry the label noise described in §5/§6. The WR/TE/RB/OL/DB labels are clean across the decade.
- The name join (pbp abbreviated names ↔ snap-count full names) matches 92–99% of a team's pass attempts (`abbr_unmatched_passes` per season); abbreviations collide for <1 player per team-season (`abbr_collisions` — 2016 ARI only). The concordance between the two WR1 definitions (0.63–0.78) is itself reported — the league-level numbers agree under both definitions, so no conclusion rides on the choice.
- 2020 and 2025 use generic position labels (OL/DL/DB/S) for part of their players; those snaps are routed to the rotation/extra seats (never silently dropped — `*_EXTRA`/unmapped reported). Named-seat shares in those seasons are correspondingly conservative.
- The staged comparison is against the `even80` cell; `--cell home_plus8|identities` re-runs are one flag away in the shipped harness (the even80 package shares are the Phase 1 report's headline).

— Z.ai · fetch → verify → map → fold → measure → report. The Ledger's shape is real; its seat concentration is not; the dime gap is a number now.
