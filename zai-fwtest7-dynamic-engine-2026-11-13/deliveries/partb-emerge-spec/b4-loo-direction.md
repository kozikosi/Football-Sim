# B.4 — the LOO direction analysis (RUN this wave; MUSE's "what would change my mind #1", now a receipt)

**Script:** `scripts/b4_loo_direction.py` (deterministic; reuses the shipped P-345 machinery UNMODIFIED — reference points reproduce to the digit). **Output:** `fwtest-7/results/b4-loo-direction.json`. **Date:** 2026-11-13. Labels: VERIFIED (I ran it; the settled LOO totals reproduce exactly: V0 mae 170/194 — the "85/97" per-case rendering — V2 exact 192/194, V3min exact 194/194).

## The question

On the held-out LOO folds, are the display-tier misses **under-priced** (too cheap — the exploit direction) or **over-priced** (too dear — the safe direction)? Per form (V0 ability / V2 exposure-guard / V3min per-slot collapse) × refit rule (mae = MUSE's protocol / exact = the 0.40 objective's own rule), n=194 held-out cases (97 rows × both endpoints).

## The table (form × refit rule × direction)

| key | n | exact | under-priced | over-priced |
|---|---|---|---|---|
| V0_mae_refit | 194 | 170 | **24** | 0 |
| V0_exact_refit | 194 | 192 | 2 | 0 |
| V2_mae_refit | 194 | 172 | **20** | 2 |
| V2_exact_refit | 194 | 192 | 0 | **2** |
| V3min_mae_refit | 194 | 174 | **20** | 0 |
| V3min_exact_refit | 194 | **194** | 0 | 0 |

## The findings

1. **Under the mae refit rule, misses concentrate UNDER-priced — and they ARE the 11 flip rows** (by owner tier: 12-tier ×12 cases, 6-tier ×6, 2-tier ×2; row list = SS>RB, RB>WR, TE>WR, TE>DT, EDGE>SS, OLB>DIME, FB>TE, WR>NICKEL, OLB>NICKEL, SS>FS): when the mae rule misses out of sample, it prices exactly the premium moves too CHEAP — the direction a user can exploit. That is material and the Owner should know it: **the mae rule's error mode is the exploit direction, concentrated on the very rows the dest-premium monitor watches.**
2. **Under the exact refit rule, misses are near-zero and their direction is different** (2 cases, BOTH C>OG, both OVER-priced — the exact rule errs on the safe side for the Owner's per-slot ruling row): V3min+exact is exactly 194/194, confirming the settled record on this machine.
3. **Direction is a property of the RULE, not the λ:** both refit rules fit λ=0.40 in essentially every fold (the settled LOO receipt), yet their miss rows and directions differ — the rule that scores the fit decides the failure mode. Any future fluctuating-dial fitting must specify its refit rule BY NAME when quoting out-of-sample behavior (the standing "name the refit rule" discipline, now with a direction dimension).

## Reproduce

```
python3 scripts/b4_loo_direction.py <lambda-sub-dir> <out-json>
# inputs: the shipped lambda-objective delivery (formula/ + inputs/, unmodified)
```

## Failure mode / guard

The under-priced misses sit in the HIGH tier band (12 and 6), not the cheap end — so the correct reading is "the mae rule under-prices premium moves out of sample", NOT "small prices are noisy". Overstating it as "0.40 is exploitable" without naming the refit rule would repeat the 85/97 mistake with a direction attached; the JSON carries `under_detail` per case so the council can verify the row list itself.
