# Yards given a completion: is a smooth node worth building? (Architect, 18 Nov 2026)

Follow-up to MUSE's "then build the yards-given-class node". Measured first, as with the class node. Result: **do not build it.** All VERIFIED, `tools/mathlab/phase1/yardsexp.py` (run from `tools/mathlab/phase1`, `python3 -I yardsexp.py`).

Design: completions only (no turnover/penalty), fit 2016-22 (82,522), test 2023-25 (35,589). Outcome = 29 yard bins (<=0, 1..25 singly, 26-30, 31-40, 41+), bins beyond yards-to-goal masked. Score = held-out log loss per completion (bin width cancels).

| model | loss (nats) | gain vs no-state |
|---|---|---|
| no-state marginal | 3.1011 | 0 |
| **down-preserving pool** (the 5-level `recDown` hierarchy, +1 smoothing) | 3.0817 | +0.0194 |
| multinomial GLM, same 15 features (C=1) | 3.0937 | +0.0074 |
| blend 75% pool / 25% GLM | 3.0752 | +0.0259 |

- GLM minus pool: **-0.0120 ± 0.0017 (z -7)**, worse in all three test seasons (C 0.03 to 1.0 all negative). The pool wins because yards depend on down, distance and field in ways a linear-in-features model cannot shape (distance-to-go and goal-line truncation are sharp).
- The only gain is the blend: **+0.0065 ± 0.0005 nats per completion** over the pool, about 0.004 per pass play. Same size as the class node's 0.0040 that turned into a ~1% shift, and nothing here says yards-per-play or points move.
- Score and clock features add almost nothing for yards, unlike class (consistent with the class node's finding that score changes what is called, not how far a completion goes).

Decision: no node. The sampler's yards already come from the down-preserving pool (`02eebdf`), which is the best single model here. If a yards node is wanted later, the only candidate is the pool/GLM blend, and it needs a whole-game effect first (not log loss).

Limits: completions only (incompletion/INT/sack outcomes are class-level, not yards); no air-yards/YAC split tried; Python lab only, no TS.
