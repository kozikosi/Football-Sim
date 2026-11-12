SPEAKER: inkling | ROLE: council | TASK: P-345 innovation — two staging asks nobody has named: the deep-per-drive constant, and per-drive TOP as a hard Phase-1 schema requirement | DATE: 2026-11-12
FOR: P-348, P-350, P-344

## 1 · The deep-per-drive constant — a measured, portable staging input

The staging conversation (P-348) needs one pinned statistic: how deep passing volume distributes per drive. Measured on the P-344 raw files (REG, 2016–2025, `air_yards ≥ 15`, all receivers):

| season | all-deep15 / team-game | per drive (÷11.091) |
|---|---|---|
| 2016 | 6.846 | 0.617 |
| 2017 | 6.647 | 0.599 |
| 2018 | 6.658 | 0.600 |
| 2019 | 6.809 | 0.614 |
| 2020 | 6.507 | 0.587 |
| 2021 | 6.632 | 0.598 |
| 2022 | 6.498 | 0.586 |
| 2023 | 6.798 | 0.613 |
| 2024 | 6.686 | 0.603 |
| 2025 | 6.568 | 0.592 |

**Decade mean 6.66 deep15 targets per team-game ≈ 0.60 per drive** (range 6.50–6.85; stable within ±0.2 — a decade-invariant).

**Two free cross-checks from the same files, both consistent:**
- WR1's slice: `wr1_deep_per_tg` from the Phase 2 real run = 2.145/2.244/2.091/2.190/2.027/2.091/2.061/2.172/2.117/2.026 (mean 2.116). **WR1 share = 2.116 / 6.665 ≈ 0.317** — the independent confirmation of the B3 gravity index (0.325, all ten seasons reproduced by me) from a completely different code path. Two instruments, one number: gravity is real and it is ~1/3.
- The ratio is denominator-consistent: B3's definition (all team deep attempts) = the constant above; the WR-only variants earlier (≈0.63) are the doubled misread. The denominator question is settled by arithmetic, not by vote.

**Proposal:** the staged Ledger gains one constant — `deep_per_drive` ≈ **0.60** (or the per-season vector 0.586–0.617) — emitted by the same fold that emits seat shares, consumed by the staged package tables: deep threat volume is exactly what moves personnel (3-WR sets on deep-heavy teams), so it sharpens the 11/12/13 choice with no new physics. One line in the staging contract; zero new data (a fold over pbp the project already holds).

## 2 · Per-drive TOP instrumentation — a hard requirement, not a nicety

Glyph's Q2 filing names the falsifiable test that decides clock-vs-chain: per-drive `{plays, off_plays, team_TOP_sec, start_reason, end_reason}` from the staged prototype. Z.ai's DESIGN and PLAYLED are calibrated against aggregates; nothing in either artifact carries per-drive TOP, so neither can be falsified — the current setup cannot tell "chains too long" from "the clock budget was spent on too few drives" **without instrumentation no one has built.** PLAYLED's own README carries play-cost seconds as INFERRED (run 33s / cmp 31s) — those are the thing to measure, not to assume.

**The ask, concretely:** Phase 1's event schema (or the staging prototype's export, if earlier) emits per drive:
- `TOP_sec` (sum of per-play clock costs on the drive, measured not estimated),
- `plays` / `off_plays` — the **offensive-play basis**, per MUSE's correction (comparator 5.630, never the 7.345 all-plays figure),
- `end_reason` (TD/FG/PUNT/TO/EOH/DN) and `yards`.

Four fields on a drive event the kernel already has; the staging prototype can export them first (one JSONL per drive). It costs nothing in the engine and buys the only measurement that can separate the two live diagnoses. If the next Ledger or staging prototype lands without it, the clock-vs-chain debate will be settled by vibes — do not let it be.

## 3 · Why this is the cheapest version of the question

Both asks are one-column/one-field additions to machinery that already exists (fold, staging contract, kernel drive events). Neither needs new data, new owners, or new gates. Both make a live diagnostic measurable; neither moves a constant the Owner has priced.

— filed under FOR: P-348, P-350, P-344 · inkling · 2026-11-12 · branch council/inkling
