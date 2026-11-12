# P-345 — the λ objective: 0.20 or 0.40 (Z.ai, 2026-11-12)

One filing, two scripts, every number reproducible from this folder.

## What is in here

| file | what it is |
|---|---|
| `inbox/20261112-0618-zai-P-345-lambda-objective.md` | THE FILING — recommendation (0.40 ships, 0.20 dual-reported as the sensitivity column), the §1 argument with labels, the §3 innovate section, what changes, what is not settled |
| `zai_p345_draftboard_and_thirdway.py` | Receipt 1: the draft-board inversion/gap test on held-out season E (2023/2024/2025 + staged + decade-mean), the mae decomposition, the display accounting, the LOO under BOTH refit rules (mae = the 0.20 objective's rule, exact = the 0.40 objective's rule — the second had never been run), the FB-fold provenance (0.344 / 2.63 / 0.344), the third-way grid (family λ, blend, recompression, guard-binding census, full λ ablation) |
| `zai_p345_anova_bridge.py` | Receipt 2: DS's variance-components ANOVA on the P-344 team-game file (decomposition reproduced to three decimals, REG-only robustness variant), λ̂ on three stated rulers with the ±26% interval, Var(g) cross-checked against VL's lambda-ident numbers, the mae scale-bias test, the price-spread test |
| `results/results_p345_draftboard.json` | machine-readable output of receipt 1 (as shipped, re-runnable) |
| `results/results_p345_anova.json` | machine-readable output of receipt 2 |
| `run_log_draftboard.txt`, `run_log_anova.txt` | the console logs of the shipped runs |
| `formula/merge_prototype.py` | the P-340 merged formula AS DELIVERED (unmodified; both scripts import it) |
| `inputs/flex-99-live.json` | the live 99-rule table (architect/engine-and-seats) |
| `inputs/c1_era_e_table.json` | the C1 measured per-season E tables + FB/DIME/DL5 corrected bases (my Phase 2 v3 receipt) |
| `inputs/team_game_summary_2016-2025.csv` | the P-344 team-game file (MUSE delivery c7540b04, 5,522 team-games) |
| `inputs/madden27-ratings.csv` | the engine's own ratings input (READ-ONLY use: Var(g) for the ANOVA, the same file tools/mathlab/lambda-ident.mjs parses) |
| `START-OF-CHAT-ZAI.md` | the start-of-chat file with §2 updated at end of chat (per its §6) |
| `CHECKSUMS.txt` | sha256, labelled, computed on the shipped bytes; CHECKSUMS.txt self-excluded |

## How to re-run

```bash
python3 zai_p345_draftboard_and_thirdway.py inputs results/my_draftboard.json
python3 zai_p345_anova_bridge.py        inputs results/my_anova.json
```

- Both scripts are deterministic: no RNG, no network, no engine edits.
- Defaults are the shipped layout: `inputs/` next to the script, `formula/` on the import path — run from this folder with no arguments to reproduce the shipped results byte-for-byte (modulo float repr).
- Requires only the Python standard library plus `merge_prototype.py` (stdlib only too).
- The two JSONs in `results/` are what the shipped runs produced; diff yours against them to verify.

## What the two receipts say (one line each)

1. Between the two objectives there are ZERO strict ordering inversions on the board in every scenario — the entire difference is 0.20 collapsing strict orders into ties (516–572 pairs) — and the mae advantage of 0.20 is earned entirely on the 86 rows both objectives order correctly, 87% of it reproducible by a pure 10% rescale of the 0.40 raws (a units artefact of scoring raw prices against small integer labels).
2. The ANOVA reproduces DS's table exactly (between-team variance 11.9044, SD 3.45, overstatement ×1.1934) and identifies ONE λ̂ — 27.34 points per team-z / 3.42 per team-OVR / 3.19 per slot-win — which cannot adjudicate 0.20-vs-0.40: the objective is a display-layer choice, exactly as the council converged.

## Bounds respected

FB>RB = 2, FB>TE = 6, C>OG = 6 (Owner rulings, untouched — FB>TE is respected at 0.40 and contradicted at 0.20, which is receipt, not re-litigation). No gates, no floor, no per-player labels, no intangibles. No new fitted constants (every third-way candidate that added one was tested and killed). λ stays dual-reported (0.40 default, 0.20 alongside) until the Owner rules. V3 stays a variant. Read-only on `colors/src`, `flex.json`, `flex.ts` — the ratings CSV was read (not modified) for the ANOVA's Var(g), the same read lambda-ident.mjs performs.
