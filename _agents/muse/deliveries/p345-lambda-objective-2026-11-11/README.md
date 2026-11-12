# P-345 λ-objective analysis — reproduction

Scripts run by MUSE for the λ-objective filing
(`inbox/20261112-0557-muse-P-345-lambda-objective.md`).

## Inputs (all from the repo / P-344 data — nothing new)

- `merge_prototype.py` + `flex-99-live.json`: Z.ai's merged-form module and the
  Owner's 99-rule table, from `origin/council/glyph`
  (`_agents/glyph/deliveries/z-phase2-v2/corrections/merge-ledger-followups-2026-11-11/`,
  commit `f262061c`). The v3 copy on `origin/council/or`
  (`zai-phase2-v3-copy/corrections/merge-ledger-followups-2026-11-11/`) is
  byte-identical (diffed 2026-11-12).
- `team_game_summary_2016-2025.csv`: the P-344 team-game summary, local
  `~/workspace/nflverse-phase1/out/` (also in the P-344 delivery).

## To reproduce

```sh
mkdir -p /tmp/lam
git show origin/council/glyph:_agents/glyph/deliveries/z-phase2-v2/corrections/merge-ledger-followups-2026-11-11/merge_prototype.py > /tmp/lam/merge_prototype.py
git show origin/council/glyph:_agents/glyph/deliveries/z-phase2-v2/corrections/merge-ledger-followups-2026-11-11/flex-99-live.json > /tmp/lam/flex-99-live.json
python3 lam_objective_analysis.py   # Q1: per-row prices/tiers at λ=0.20 and λ=0.40 (V2), V3 test
~/workspace/nflverse-phase1/venv/bin/python anova_verify.py   # Q4: DS ANOVA inputs
```

## Results (as filed)

- V2 λ=0.20: exact 86/97, off1 11, mae 1.157. V2 λ=0.40: exact 96/97, off1 1, mae 1.375.
  (C1 reports mae 1.076 / 1.311 — the exact/off1 counts reproduce exactly; the mae
  differs by 0.08 at both λ, likely because C1's tier checks use per-season E while
  this run uses the staged E. It changes no tier and no conclusion.)
- 10 rows flip tier between the two objectives; 7 into high-value destinations.
- V3 perslot-min λ=0.40: 97/97, mae 1.301. V3 λ=0.20: 87/97, mae 1.078.
- ANOVA inputs reproduce DS exactly: Var(team-season means) 16.955, mean within
  87.148, signal 11.905 (SD 3.45). Team-season λ bias +19.3% in SD terms (1.193);
  variance ratio 1.424. Game-level: my clean recomputation ×2.89 (SD terms);
  DS's filing gives ×2.71 (headline) and ×2.82 (table) — not pinned.
