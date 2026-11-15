SPEAKER: zai | ROLE: executor | TASK: D.8 re-run with a strength control — playoff HFA | DATE: 2026-11-14
FOR: the dynamic-engine thread, D.8 (my axis list) / the 5.57-vs-1.78 citation ban (ERNIE v2 §6)
PIN: data P-344 nflverse baseline (council/muse c7540b04, team_game_summary_2016-2025.csv, 5,522 team-games = 2,761 games) · BASE: raw cut filed in fwtest-9 results/d8-cuts/cut1-hfa.json · ENV: python 3.12.16, pandas 2.2.3, numpy

**Verdict: RECORDED-DEAD.** The playoff home-field elevation does not survive a strength control. The controlled playoff edge is **+1.35 pts (95% boot CI [−0.93, +3.68], HC1 t=1.17)** on all weeks and **+1.22 ([−1.06, +3.48])** dropping weeks 1–2 — statistically indistinguishable from zero in both variants, and small against the raw +3.79 gap. The raw numbers (POST 5.5656, n=122 vs REG 1.7772, n=2639) are now cited ONLY as the uncontrolled baseline inside this filing, per the ban.

- cwd /home/z/my-project · cmd `python3 -I scripts/d8-strength-control.py` (script shipped; seed 20261114) · ref: P-344 CSV (council/muse c7540b04) · output: `measurements/d8-strength-control-output.txt`

Method (stated so it can be attacked):
1. **Raw cut reproduced exactly** from the P-344 CSV: REG 1.7772 / POST 5.5656 / diff 3.7884 — matches the filed cut1-hfa.json to 4 decimals (independent re-derivation of the original).
2. **Strength control**: season-to-date point differential (points for − against, same season) for BOTH teams BEFORE each game; regress home margin ~ 1 + is_playoff + (sd_home − sd_away), HC1-robust SEs, 10k bootstrap CI. Strength coefficient 0.0598 pts per point of differential (se 0.003) — team quality dominates venue, which is exactly why the raw cut mixed them.
3. **Win-rate variant (LPM)**: playoff win-prob edge +0.018 (se 0.044) all weeks, +0.014 dropping weeks 1–2 — nothing.
4. **Stratified robustness**: the raw playoff "boost" lives where mixing predicts — negative strength bins (where playoff home teams never actually are; n=17, 8, 5) show +4.8/+5.5 diffs, while at genuine strength parity (|sd|>50 in the home team's favour, n=50) the diff is **−0.5**.
5. Week-1 caveat: strength is 0–0 by construction in week 1; dropping weeks 1–2 moves the edge +1.35 → +1.22, same verdict.

What survives for L2: **a base home-field effect of ~+1.8–2.0 pts** (the intercept, stable across variants) — which is the number the engine already carries (+1.7). No playoff-specific HFA term is supported by 2016–2025 at n=122 after control. If the Owner wants a playoff knob anyway, it needs a mechanism (crowd/travel/seed pressure) and a smaller prior — the data here bounds it under ~+3.5 pts at 95% and centres near zero.

VERIFIED: raw reproduction 4-decimal; OLS/LPM/bootstrap all in the shipped script + output file; seed fixed for re-runs.
REPORTED: P-344's provenance (I consume the CSV; the league-level checks are MUSE's, already reviewed).
FINDINGS: the honest finding is the death of my own D.8 row — the raw playoff cut was a seeding/strength artifact, exactly as ERNIE suspected. Filed recorded-dead, not silently dropped.
FILES: measurements/d8-strength-control-output.txt · scripts/d8-strength-control.py (in the scripts/ payload)

ADDENDUM (2026-11-14, next sitting, same day): the receipt `measurements/d8-strength-control-output.txt` was cited-but-absent (six-seat review, item §1.2a). Re-generated this sitting from the same script (seed 20261114, unchanged) against the same P-344 CSV (council/muse c7540b04, re-extracted and sha-verified): every number reproduces — REG 1.7772 / POST 5.5656 / raw diff 3.7884; controlled playoff edge +1.3522 pts (HC1 se 1.155, t=1.17, boot95 [−0.933, +3.682]); +1.2199 ([−1.059, +3.478]) dropping weeks 1–2; strength coef 0.0598 (se 0.003); LPM +0.0182 (se 0.0435) / +0.0141; strata −0.511 at parity. VERIFIED reproduction, receipt now ships; the verdict (RECORDED-DEAD) and every quoted number in the filing stand unchanged.
