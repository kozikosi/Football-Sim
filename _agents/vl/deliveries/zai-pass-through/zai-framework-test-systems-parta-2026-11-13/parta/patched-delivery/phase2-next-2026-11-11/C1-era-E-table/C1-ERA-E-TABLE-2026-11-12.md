# C1 — THE ERA-ANCHORED E TABLE (P-346 Part C1, Z.ai seat, 2026-11-12)

**Data:** the P-344 release (30/30 files sha256-verified; log in the phase2-real folder). **Scripts:** `c1_era_e_table.py` (deterministic, no RNG; re-runs the Phase 2 real adapter per season, emits every seat key for every team, then re-derives the tiers through the shipped `merge_prototype.py` — imported unmodified, with `E_SLOT`/`E_ROLE` patched to the season's measurements). **Receipts:** `c1_era_e_table.json`, `c1_per_team_e_input.csv` (320 team-seasons × 30 seats — the league-snapshot column), `run_log_c1.txt`.

**Settle criterion (the Owner's prompt): the table's first two rows reproduce the Phase 2 real FB numbers exactly (0.1426 → 0.0814) and the DIME numbers exactly (0.094–0.159, mean 0.1263). MET — both rows land to the digit.**

---

## 1 · E[role][season] — the measured table

Bases (stated): seat roles = the Phase 2 real adapter's play-share (11 × seat snaps / side snaps, league mean over ALL 32 teams, zeros included — the fix-9 discipline); **FB on the B1-corrected per-row basis** (first-token FB, per row — the 2020 adapter value was inflated by last-row-wins + the 2020-only `FB/D`,`FB/R`,`FB/T` combo labels; the correction is 0.0887 in 2020, and the two settle endpoints are EXACT and identical on both bases); **DIME = per-play ≥6-DB share** (occupancy, the B1 basis); **DL5 = per-play ≥5-DL share**; every role through the shipped slot-weight form.

| season | FB | OLB | DIME | RB | WR | TE | NICKEL | CB | DT | EDGE | SS | FS | ILB | C | OT | OG | QB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2016 | 0.1426 | 0.6222 | 0.1252 | 0.4355 | 0.6174 | 0.5056 | 0.5006 | 0.8260 | 0.6576 | 0.5467 | 0.8367 | 0.7829 | 0.8714 | 0.7698 | 0.8715 | 0.7962 | 0.8745 |
| 2017 | 0.1240 | 0.6415 | 0.1364 | 0.4475 | 0.6303 | 0.5018 | 0.5298 | 0.8176 | 0.6481 | 0.5736 | 0.7561 | 0.8504 | 0.8397 | 0.8775 | 0.8237 | 0.7720 | 0.8464 |
| 2018 | 0.0881 | 0.6152 | 0.1406 | 0.4658 | 0.6326 | 0.4848 | 0.4936 | 0.8253 | 0.7096 | 0.6330 | 0.7710 | 0.7725 | 0.8844 | 0.8298 | 0.8563 | 0.7112 | 0.8516 |
| 2019 | 0.0896 | 0.6508 | 0.1589 | 0.4459 | 0.5783 | 0.4575 | 0.5372 | 0.7993 | 0.6904 | 0.5636 | 0.7296 | 0.8147 | 0.8722 | 0.8968 | 0.8321 | 0.8372 | 0.8486 |
| 2020* | 0.0887 | 0.5709 | 0.1473 | 0.4388 | 0.6437 | 0.4767 | 0.1447* | 0.3730* | 0.5863* | 0.5815* | 0.2951* | 0.1837* | 1.0355* | 0.6287* | 0.7665* | 0.6691* | 0.8288 |
| 2021 | 0.0887 | 0.5967 | 0.1378 | 0.4332 | 0.6642 | 0.5015 | 0.4722 | 0.7777 | 0.6912 | 0.5356 | 0.7360 | 0.8132 | 0.8268 | 0.7894 | 0.8196 | 0.7977 | 0.8400 |
| 2022 | 0.0952 | 0.6196 | 0.1064 | 0.4541 | 0.6557 | 0.5024 | 0.3348 | 0.7621 | 0.7251 | 0.5122 | 0.7428 | 0.7247 | 0.8771 | 0.7644 | 0.8255 | 0.8274 | 0.7821 |
| 2023 | 0.0852 | 0.6369 | 0.1166 | 0.4810 | 0.6920 | 0.4966 | 0.4929 | 0.7887 | 0.6437 | 0.5733 | 0.7036 | 0.7810 | 0.8699 | 0.8631 | 0.8214 | 0.8091 | 0.7754 |
| 2024 | 0.0811 | 0.6045 | 0.0998 | 0.4809 | 0.6427 | 0.5198 | 0.4932 | 0.7891 | 0.6840 | 0.5059 | 0.6764 | 0.7050 | 0.8590 | 0.7433 | 0.8231 | 0.7971 | 0.7978 |
| 2025* | 0.0814 | 0.6177 | 0.0936 | 0.4729 | 0.6071 | 0.5210 | 0.4351* | 0.7444* | 0.3952* | 0.3777* | 0.8306* | 0.6633* | 0.8949* | 0.5687* | 0.6824* | 0.5153* | 0.7819 |

\* = **the generic-label artifact seasons (2020 and 2025)**: part of the players carry generic labels (OL/DL/DB/S — the adapter routes them to OL_EXTRA/DL5/DIME), so the named-seat shares in those two seasons are conservative (the v2 report's §9 caveat, now visible in the E table itself: E_C 2020 0.6287 / 2025 0.5687 is the OL routing, not a real decline in center participation — centers play ~100% of games). **Label-clean seasons: 2016–2019, 2021–2024.** DL5 row (not a merge role, reported): 0.012–0.034 per play.

**The two settle rows, to the digit:** FB 0.1426 → 0.0814 (2016/2025, corrected basis = adapter basis on both endpoints); DIME 0.1252…0.0936, mean **0.1263**. The adapter column re-verifies the v2 FB table on all ten seasons (0.1426/0.1259/0.0881/0.0899/0.0996/0.0898/0.0952/0.0852/0.0819/0.0814 — every value exact, including 2020's 0.0996; that column is what B1 diagnoses).

## 2 · The Owner's tiers re-derived on every season's E — era-robust, with one named artifact

The V2 merged form was re-scored (97 cross-role rules) with each season's E, at the operating point λ=0.4 and the reported λ=0.2, diffed against the same form on the staged E table:

| season | λ=0.4 exact | tier changes vs staged E | λ=0.2 exact | tier changes |
|---|---|---|---|---|
| 2016–2019 (×4) | 96/97 | **none** | 86/97 | **none** |
| 2020 | 96/97 | C>OG, C>OT | 85/97 | C>OG, C>OT, C>DT |
| 2021–2024 (×4) | 96/97 | **none** | 86/97 | **none** |
| 2025 | 96/97 | C>OG, C>OT | 85/97 | C>OG, C>OT, C>DT |

- **FB>RB = 2 and FB>TE = 6 on every season's measurement** (all ten, both λ columns — `owner_rows_by_season` in the JSON). The Owner's ruling is era-robust; the merged form inherits it.
- **The FB acceptance band (E < 0.2228) holds on every season's corrected E** (max 0.1426, 2016; 2020's corrected 0.0887).
- The only tier changes in the decade are **C>OG / C>OT / C>DT in exactly the two generic-label seasons (2020, 2025)** — and they move because the measured E_C collapses (0.63 → 0.57) when OL generic labels route away from the C seat. That is a LABEL artifact, not an era effect: on the eight label-clean seasons, **zero** tier changes. (The merge's per-slot C>OG open question is unaffected — V2 role-level pricing is unchanged in every clean season.)

## 3 · The variants, and the recommendation

| variant | λ=0.4 exact | tier changes vs staged E | mae λ=0.4 | mae λ=0.2 | cost |
|---|---|---|---|---|---|
| **static (decade-mean E)** | 96/97 | **none** | **1.311** | **1.076** | none — one number per role, refreshed when the Owner wants |
| per-season E | 96/97 (×10) | 0 in clean seasons; label artifacts in 2020/2025 | varies | varies | a re-measure per season AND the label-regime artifacts corrupt the C rows in exactly the seasons with generic labels |
| per-era E (3 eras: 16–19 / 20–22 / 23–25) | 96/97 (×3) | **none** | — | — | era boundaries are arbitrary; buys zero tier changes |
| staged E (v2, as shipped) | 96/97 | baseline | 1.375 | 1.157 | none |

**Recommendation: static E at the decade mean, with per-season E as the monitored receipt and the league snapshot as the fold column.** The receipts: (a) zero tier changes on the static variant at BOTH λ columns — the pricing is era-robust for free; (b) the static variant's fit is BETTER than the staged E (mae 1.311 vs 1.375 at λ=0.4; 1.076 vs 1.157 at λ=0.2) — re-measuring E from real data improves the merge's own fit with zero tier cost; (c) per-era buys nothing (zero changes) and costs two arbitrary boundaries; (d) **if the Owner wants the trend, the trend belongs in the STAGING (the package tables — C4), not in the pricing**: the pricing's exposure factor is era-robust (that is what FB>RB=2 all-decade means), while the staging's package shares demonstrably move (DIME 0.159→0.094). The league-snapshot column (`c1_per_team_e_input.csv`, one row per team-season) is the mechanism the fold emits for free — per-era or per-season staging needs no new machinery.

## 4 · What this needs from the Owner

Nothing. The E table is a measurement; the recommendation (static E + monitored per-season receipt + snapshot column) changes no constant the Owner has priced. If he adopts it, the Architect swaps one table (the E_SLOT values → the decade-mean column) — the merged form's proposal (V2) is untouched.

— Z.ai · measure per season, price on the decade, watch the trend in the staging.
