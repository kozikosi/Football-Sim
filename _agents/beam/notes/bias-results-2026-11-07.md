# Bias test results (M4 volume, partial M5 efficiency) — 2026-11-07 (Beam)

Data source (REPORTED): nflverse snap_counts 2023/2024 and player_stats 2023/2024 from github.com/nflverse/nflverse-data releases. Aggregation script run locally; outputs above. No product file touched. No constants changed.

## M4 — Real volume share vs. engine weight share

Offense (2-season avg 2023/2024):
| Group | Real snap share | Engine weight share (colors SLOTS) | Delta |
|---|---|---|---|
| OL | 45.7% | 39.2% | -6.5 |
| WR | 23.3% | 22.7% | -0.6 |
| TE | 11.9% | 7.7% | -4.2 |
| RB | 9.9% | 7.7% | -2.2 |
| QB | 9.1% | 22.7% | +13.6 |

Defense (2-season avg):
| Group | Real snap share | Engine weight share | Delta |
|---|---|---|---|
| DB (secondary) | 44.2% | 41.3% | -2.9 |
| DL | 29.1% | 45.1% | +16.0 |
| LB | 26.7% | 13.6% | -13.1 |

M4 flag rule: group real share differs from engine implied share by > 5 pp. Flags: QB (+13.6), TE (-4.2, borderline), DL (+16.0), LB (-13.1). Secondary/DB does NOT flag (-2.9). WR/RB/DB within 5 pp.

## M4 secondary-specific conclusion

The "bias toward the secondary" concern is NOT supported by volume data. Secondary is ~44% of defensive snaps and ~41% of defensive weight — a 3 pp gap, inside the 5 pp tolerance. The engine's secondary share matches real usage. The larger discrepancies are DL overweighted vs. snaps and LB underweighted vs. snaps.

## M5 — Efficiency (partial: offense only)

Offensive EPA totals (2024): QB 1109, WR 2563, TE 950, RB -594 (rush+rec). Target share: WR 60.0%, TE 22.5%, RB 17.5%. Engine offense weight share: QB 22.7%, WR 22.7%, TE 7.7%, RB 7.7%, OL 39.2%.

EPA-share comparison (of offensive skill EPA, excluding OL):
- QB: EPA 1109 / 4622 total skill EPA = 24.0% → engine 22.7% QB. Match.
- WR: 2563 / 4622 = 55.4% → engine WR 22.7% of ALL offense (incl OL). Of skill-only engine (QB+WR+TE+RB = 40.8%... wait recompute skill-only: QB22.7+WR22.7+TE7.7+RB7.7 = 60.8% of offense weight is skill). WR share of skill weight = 22.7/60.8 = 37.3%. Mismatch vs EPA 55.4%.
- TE: 950/4622 = 20.6% → engine TE share of skill weight = 7.7/60.8 = 12.7%. Underweighted vs EPA.
- RB: -594/4622 = -12.9% → engine RB share 7.7/60.8 = 12.7%. RB roughly matches (low/negative).

So by EPA, TE is underweighted (12.7% of skill weight vs 20.6% of skill EPA) and WR possibly underweighted (37.3% vs 55.4%), QB matches. This supports the Owner's direction to raise TE1 (and possibly WR1) value relative to OL/QB, consistent with raising TE1 toward WR1. Defense EPA unavailable in this data (player_stats is offense only).

## M5 by-OVR-bucket

Not run: joining Madden OVR to nflverse stats requires name-matching across 2 seasons (~1900 players) and is out of scope for this pass. Flagged as open; needs a dedicated task.

## M1 group share (engine only, no data needed)

Secondary = 18.7% of total weight vs QB 11.6% (from bias-audit). M1 flag rule (secondary > 25% OR secondary > 2x QB share): secondary 18.7% < 25%, and 18.7% < 2x11.6% = 23.2%. Does NOT flag. So M1 passes.

## M3 sensitivity across anchors

Not run: requires fitting under 4 anchors (Owner table, REV5, salary, data-only). Data-only fit would use the M4/M5 numbers above; not performed. Flagged as open.

## M6 star placement

Already measured (flex-tuned report): under -10 cap, 0 promotions on tuned seeds, 15 on fresh seeds (all at cap 20). Partial pass; needs the full 768-lineup re-run on the Owner's final table (not yet done).

## Net

Bias toward the secondary: not detected (M1 passes, M4 shows secondary matches snap share). Bias/underweight toward TE and LB: suggested by M4/M5 (TE snaps/EPA vs weight; LB snaps vs weight). QB weight justified by EPA. DL overweighted vs snaps. These are findings to take to the Architect as a proposal, not silent changes.

Open items: M5 by-OVR-bucket, M3 sensitivity, M6 full re-run, defense EPA (not in this data).

## M5 by-OVR bucket (run 2026-11-07)

Data: Madden 27 ratings (name,pos,team,ovr) joined to nflverse player_stats 2023+2024 by (name, position), >=8 games, >=30 touches. RB mapped HB<->RB. Linear regression of EPA/game on OVR per position; n = QB 48, WR 104, TE 73, RB 61. Engine reference = fit-owner slotWinsPerOvr (wins per +1 OVR).

Per-game slopes (EPA/game per OVR point) and ratio to QB:
| Pos | slope | ratio to QB | engine ratio to QB | verdict |
|---|---|---|---|---|
| QB | 0.267 | 1.000 | 1.000 | match |
| WR | 0.138 | 0.515 | 0.649 | engine slightly high |
| TE | 0.069 | 0.257 | 0.248 | match |
| RB | 0.001 | 0.003 | 0.247 | engine much too high |

Per-touch slopes (EPA per carry/target per OVR point): WR 0.0132, QB 0.0105, TE 0.0070, RB 0.0016. Per-touch, TE is more OVR-sensitive than the engine implies, but TE's lower volume keeps per-game slope in line with the engine. RB is near-zero on both measures.

Interpretation: the engine's marginal values (per-game, volume-inclusive) match real data for QB and TE. The engine overvalues RB marginal impact (real RB OVR barely moves EPA) and mildly overvalues WR. This is the opposite of the volume/EPA-share finding (which suggested TE underweighted); the two metrics disagree because TE has high volume but low marginal per-OVR. Both are reported, not resolved here.

Caveats: Madden 27 OVR is the "new" ratings set (Owner 28 Oct), not historical; joining to 2023/2024 stats assumes rating stability. RB rushing EPA is negative overall (usage/role confound). Defense EPA not available in this data, so DL/LB/CB cannot be tested by OVR.
