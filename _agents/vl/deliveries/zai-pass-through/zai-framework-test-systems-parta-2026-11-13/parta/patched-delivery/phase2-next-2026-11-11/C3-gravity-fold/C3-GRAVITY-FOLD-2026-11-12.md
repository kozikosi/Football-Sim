# C3 — THE GRAVITY FOLD (P-346 Part C3, Z.ai seat, 2026-11-12)

**Scripts:** `c3_gravity_fold.py` (deterministic). **Receipts:** `c3_gravity_results.json`, `c3_gravity_fold_per_team_game.csv` (5,257 team-game rows — the fold output), `run_log_c3.txt`. **Data:** P-344 raw (30/30 sha256-verified) + the Phase 1 `staged.json` (file hash `0f749ea5…`, verified).

**Settle criterion (the Owner's prompt): the real side of the table reproduces `b2_gravity_index.json` exactly. MET — 10/10 seasons to the digit, and the definition is now stated and shipped** (it was an inline script in v2; this is the same defect class B2's missing script was — closed the same way, by shipping the script).

---

## 1 · The recovered definition — and the B3 answer inside it

The shipped index reproduces EXACTLY (10/10) under this definition, now in code:

> **gravity_index = per team-season, the receiver with the most deep targets (pass_attempt = 1, air_yards ≥ 15, REG, pure pbp abbreviated name — NO snap-count join); his share of the team's deep attempts — ALL of them, WR + TE + RB + the unmatched/null-name rows (the denominator stated explicitly: not WR-only, which reads ~0.63); league mean of TEAM MEANS. Ties → name ascending.**

| season | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| shipped (v2 JSON) | 0.325 | 0.335 | 0.310 | 0.304 | 0.309 | 0.313 | 0.313 | 0.331 | 0.327 | 0.315 |
| this script (team means) | **0.325** | **0.335** | **0.310** | **0.304** | **0.309** | **0.313** | **0.313** | **0.331** | **0.327** | **0.315** |

**The B3 mystery resolved:** the v2 filing's "top WR" was in fact the season **deep-target leader** keyed on pure pbp names — the B2 report's "by snaps" WR1 language described a DIFFERENT machine (the snap-count join), and MUSE's recomputation used that machine. Under the snaps-WR1 the 2016 league mean is ~0.26–0.29 (a full variant battery is in the exploration log), so his 0.383 is not reproducible from his description either; under the recovered definition the shipped 0.325 is exact. The stability claim survives on every definition tried — each decade band is ≤ ±0.03 — and the filing's ~1/3 reading is the deep-leader definition's band.

**Which teams/players drive the 2016 divergence (named, as asked):** under the two identifications, **16 of 32 teams** have the deep leader ≠ the snaps-WR1. The named pairs (2016): ARI **J.Nelson** vs Larry Fitzgerald; ATL **J.Jones** vs Mohamed Sanu; CAR **G.Olsen** vs Kelvin Benjamin; CHI **A.Jeffery** vs Cameron Meredith; CIN **A.Green** vs Brandon LaFell; DAL **D.Bryant** vs Terrance Williams; DEN **E.Sanders** vs Demaryius Thomas; HOU **W.Fuller** vs DeAndre Hopkins; KC **J.Maclin** vs Chris Conley; LAC **Ty.Williams** vs Dontrelle Inman; LV **M.Crabtree** vs Amari Cooper; MIA **K.Stills** vs Jarvis Landry; NYG **O.Beckham** vs Sterling Shepard; PHI **J.Matthews** vs Nelson Agholor; TEN **R.Matthews** vs Tajae Sharpe; WAS **D.Jackson** vs Pierre Garcon. The deep-leader definition is **join-free** — that is exactly why it is the stable one: the snaps-WR1 path needs the abbreviated-name join whose 2016 unmatched rate is the decade max (9.5%; the ARI J.Brown John/Jaron collision noted in v2), so every join-based recomputation carries 2016-specific noise. The engine-side fold never has this problem — it knows its own receivers.

## 2 · The fold (the first engine measurement, per the P-345 Q4 filing)

`c3_gravity_fold_per_team_game.csv` emits the fold output shape — one row per team-game: `season, team, game, leader_abbr, leader_deep_targets, team_deep_targets, gravity_index`. When the play model stages receiver-level passes, the same fold runs over the staged event log and the staged value lands in this table's staged column. **The event-schema ask (as the filing listed, with the one addition C3 forces):**

| field | what | availability |
|---|---|---|
| `double_team` (bool) | the doubles flag | **CHARTING-CLASS — not in any public release** (PFF/SIS paid; NGS frames public only for Big-Data-Bowl week windows). Stated, per the ask. |
| `coverage_assignment` | nearest-defender id + type | public pbp has `defense_man_zone_type`/`defense_coverage_type` for 2023+ only |
| `usage_share` | designed receiver per play | `route` in the 2023+ NGS columns; earlier seasons not public |
| **`air_yards` (the deep flag)** | pass depth | **THE FIELD THE STAGED LEDGER IS MISSING — see §3** |

## 3 · The staged side — said exactly, and not faked

The staged Ledger **does** emit receiver-level pass events per seat (`staged.json → games → even80 → gravity → WR1|catch / WR1|inc / WR1|int_thrown_to`, verified this session). What it does **not** emit is **any depth axis: there is no `air_yards` or deep-target flag on a staged pass event**, so the staged deep-target share (the gravity index at τ=15) is **not computable** and is not faked here. The fold emits it the day the play model stages pass depth — which is the same event-schema addition as `air_yards` above.

What IS computable on both sides — the volume comparator (the v2 over-concentration finding, now on a shared basis):

| | real (most-targeted WR share of team pass attempts) | staged (WR1 share of staged pass events) |
|---|---|---|
| 2016 | 0.2133 | 0.3287 |
| 2019 | 0.2043 | 0.3287 |
| 2023 | 0.2147 | 0.3287 |
| 2025 | 0.2066 | 0.3287 |

Real ~20–21%, staged 32.9% — the engine funnels ~1.6× the real alpha-share into one seat, stable across the decade. (The staged 1.75 deep targets/tg at τ=15 from the v2 report stays the staged deep-side number; its denominator's staged counterpart is the missing field.)

## 4 · The second gravity stat — the Herfindahl (the innovation, with receipts)

Deep-target concentration has a priceable shape beyond the leader's share: **HHI = Σ (receiver share of team deep targets)², with the unmatched share as one lump** — one number per team-season, computed from the same files, no new join:

| season | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| HHI league mean | 0.2089 | 0.2055 | 0.1915 | 0.1820 | 0.1899 | 0.1894 | 0.1921 | 0.2042 | 0.2023 | 0.1937 |
| within-league SD | 0.041 | 0.050 | 0.042 | 0.034 | 0.044 | 0.040 | 0.042 | 0.048 | 0.054 | 0.047 |
| WR2 deep share | 0.220 | 0.203 | 0.209 | 0.207 | 0.216 | 0.208 | 0.206 | 0.222 | 0.204 | 0.212 |
| TE1 deep share | 0.107 | 0.119 | 0.113 | 0.103 | 0.120 | 0.115 | 0.108 | 0.100 | 0.098 | 0.103 |

- **Stable like the leader share** (decade band 0.182–0.209) and **complementary**: the leader share is the margin over the field; the HHI is the whole concentration structure (leader + WR2 + TE1 + the field). The WR2 share is as stable as the WR1 share (~0.20–0.22, a ±0.01 band) — the deep corps is a two-head structure, which is exactly what a gravity TERM in the formula wants (a second measured seed, and a falsifier: if WR2's share ever collapses toward the corps average, the two-head reading was era-specific).
- Supporting numbers (WR2/TE1 shares) are in the JSON per season; the HHI is the proposed second engine stat (same fold, free from the event log once depth is staged).

## 5 · What Phase 1 does with this

1. Stage pass depth (`air_yards` or a `deep` flag) on the play events — the one missing field.
2. Emit `gravity_index` per team-game in the fold (the CSV above is the output shape).
3. Compare staged vs real per season (the table gets its staged column; the settle bar: the staged index lands in the real 0.30–0.34 band).
4. Optionally emit `hhi_deep` beside it (§4) — one line in the same fold.

— Z.ai · the definition recovered and shipped, the fold stub built, the staged gap named, the second stat filed with receipts.
