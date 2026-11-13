# C4 — THE DIME RE-ANCHOR (P-346 Part C4, Z.ai seat, 2026-11-12)

**Scripts:** `c4_dime_reanchor.py` (deterministic). **Receipts:** `c4_dime_tables.json`, `c4_dime_situation_table.csv` (the per-situation real table), `run_log_c4.txt`. **Data:** P-344 raw (30/30 sha256-verified) + the Phase 1 `staged.json` (file hash `0f749ea5…`, verified). **Constraint honored: the engine files were NOT touched** — `specs.ts:84` (`DIME_W = 0.15`) and `matchup.ts:51` (the blend) are the Architect's; everything here is the measured target + the proposal he can apply.

**Settle criterion (the Owner's prompt): the re-anchored package table's DIME row reads 0.126 pooled and the per-season row matches the B1 table exactly. MET — pooled 0.1263, all ten seasons exact.**

---

## 1 · The re-anchored package table (staged | real | Δ per season — the spot-table shape)

Staged = the Ledger Phase 1 `even80` dpkg counters recomputed from `staged.json` this session: base 25,005 / nickel 36,224 / dime 4,576 → **dime share 0.0695** (the Phase 1 report's 0.0694 stands as REPORTED — the 0.0001 edge is the counter basis vs the R2 seat basis). Real = per-play ≥6-DB share from the participation personnel.

| season | staged | real | Δ pts | re-anchored static 0.126 | Δ vs real |
|---|---|---|---|---|---|
| 2016 | 0.0695 | 0.1252 | +5.57 | 0.1263 | −0.11 |
| 2017 | 0.0695 | 0.1364 | +6.69 | 0.1263 | +1.01 |
| 2018 | 0.0695 | 0.1406 | +7.11 | 0.1263 | +1.43 |
| 2019 | 0.0695 | **0.1589** | +8.94 | 0.1263 | +3.26 |
| 2020 | 0.0695 | 0.1473 | +7.78 | 0.1263 | +2.10 |
| 2021 | 0.0695 | 0.1378 | +6.83 | 0.1263 | +1.15 |
| 2022 | 0.0695 | 0.1064 | +3.69 | 0.1263 | −1.99 |
| 2023 | 0.0695 | 0.1166 | +4.71 | 0.1263 | −0.97 |
| 2024 | 0.0695 | 0.0998 | +3.03 | 0.1263 | −2.65 |
| 2025 | 0.0695 | **0.0936** | +2.41 | 0.1263 | −3.27 |
| **pooled/mean** | **0.0695** | **0.1263** | **+5.68** | — | — |

The per-season row IS the B1 table (strict-6 companion: 0.121…0.091, mean 0.1193). Every season's Δ vs the re-anchored static value is ≤ 3.3 pts — the static anchor is within a dime's worth of movement of every season in the decade; the staged value is 2.4–8.9 pts below EVERY real season.

## 2 · The DIME_W re-derivation target: 0.126 league-mean, not 0.15

The engine's constant (`specs.ts:84 DIME_W = 0.15`) is applied at `matchup.ts:51` as an **unconditional coverage blend**: `coverage = (1−DIME_W)·coverage + DIME_W·covDime`, for both base and nickel plans, league and team alike. The comment there already says what it is: *"a fixed passing-down share of coverage, not a plan option."* Two readings, now with the number attached to each:

- **As a rating weight** (the two-layer reading from the v2 report §3): 0.15 stands on its own — it coincides with the real dime share of 2018–2021 (0.138–0.159), plausibly the era it was set from, and no mechanism makes a rating weight a snap share.
- **As a re-derived situation blend** (settle path 3): the target is **0.126 league-mean** — the measured unconditional share of plays in dime personnel. The per-season vector (0.125/0.136/0.141/0.159/0.147/0.138/0.106/0.117/0.100/0.094) is the same proposal with the trend carried.

**Proposal to the Architect (one line): re-anchor the package table's DIME row 0.0694 → 0.126 (static) or the per-season vector; leave DIME_W alone unless the Owner wants the weight to carry snap meaning, in which case 0.15 → 0.126.**

## 3 · The re-derived situation blend — the measured per-situation table

The blend the engine applies is unconditional; a situation-weighted re-derivation consumes this table (pooled 2016–2025, n ≥ 500; the per-season table is in the CSV):

| situation | dime share | n | | situation | dime share | n |
|---|---|---|---|---|---|---|
| **3rd+long (8+)** | **0.4531** | 26,743 | | 1st+long | 0.0646 | 137,528 |
| 4th+long | 0.4516 | 1,125 | | 1st+med | 0.0436 | 4,287 |
| 3rd+med (4–7) | 0.3590 | 21,707 | | 1st+short (1–3) | 0.0262 | 3,055 |
| 4th+med | 0.3418 | 1,375 | | 2nd+long | 0.1033 | 56,787 |
| 3rd+short | 0.1100 | 18,963 | | 2nd+med | 0.0543 | 34,969 |
| 4th+short | 0.0994 | 4,207 | | 2nd+short | 0.0646 | 17,380 |
| behind (>8) | **0.1782** | 69,494 | | tied/one-score (|d|≤8) | 0.1172 | 215,803 |
| ahead (>8) | 0.0869 | 44,034 | | | | |

The shape is exactly what "a fixed passing-down share of coverage" means: **dime is a 3rd-and-long package (45% of those plays) that leaks into early downs through distance (6.5% of 1st+long) and through script (17.8% when trailing by 9+)**. The frequency-weighted blend of this table reproduces the measured unconditional 0.126 — that IS the re-derived blend's target, and the per-season CSV gives the Architect the same table per season if he wants the trend carried into the blend.

## 4 · The shape question: per-season packages as the default? (the innovation, with the table)

The decade trend (peak 0.159 in 2019 → 0.094 in 2025, −41%) plus the 12-personnel growth (real 12 share 0.167 → 0.220 by 2025 — the v2 report's package table) suggests the package tables' natural shape is **a per-season league-snapshot vector, emitted by the same fold column that C1 built** (`c1_per_team_e_input.csv` is exactly that mechanism for the seats; the dpkg fold emits the package row the same way). The recommendation, with the costs:

- **Static 0.126** (recommended default): zero machinery, every season within 3.3 pts, and the trend stays visible as the monitored receipt. Cost: 2019 over-staged by 3.3 pts, 2025 under-staged by 3.3 — inside the dime's own year-to-year movement.
- **Per-season vectors** (the fold emits them free): exact per season; cost = the staging consumes an era input (one column, same as C1's snapshot) and the label-regime artifact seasons (2020/2025 personnel grammar) need the same caveat C1's E table carries.
- **Per-era (3 eras)**: no better than static for DIME (the trend is smooth, not stepped), with arbitrary boundaries — recommended against, same as C1's verdict for the pricing side. **The difference from C1: in the STAGING, the trend is real and worth watching; in the PRICING, it is era-robust and static is right.** That split — trend into staging, robustness into pricing — is the unified answer the two builds now share.

— Z.ai · the anchor is a number now: 0.126, ten seasons verified, the situation table measured, the proposal in the Architect's hands.
