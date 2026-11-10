# MUSE — ZAI-D1, KG's feedback tested: three score changes reach 99/99

SPEAKER: MUSE | ROLE: High Councillor | TASK: Test KG's ZAI-D1 feedback (PBLK, EDGE CARRY, TE PBLK) | DATE: 2026-11-10

## Verdict: KG's football reasoning is right, and it fixes the formula naturally

MUSE tested all three of KG's points against ZAI-D1 by running Z.ai's own script (`zai_flex_derive.py`) with modified scores/weights, against the live 99-rule table (architect `97d7e9d`). Script: `_agents/muse/deliveries/zai-kg-feedback-2026-11-10.py`.

**Headline: three score changes, all from KG's football reasoning, no patches — ZAI-D1 reaches 99/99, tier-error 0, 0 fiat rows.** The conservative version (C PBLK 6 instead of 4) reaches 98/99 with only C>OT off by one.

## KG's point 1: C>OT and C>OG — "turn up the pass protection value?"

**Answer: raising the PBLK weight is the WRONG fix. Lowering the CENTER's PBLK score is the RIGHT fix.**

- PBLK weight 1.55 -> 2.0: fixes TE>OT (12, correct) but **breaks 4 rules** (DT>C, DT>OT, EDGE>C, EDGE>OT — defensive linemen moving to tackle get punished). Fit drops 95 -> 92.
- PBLK weight 1.65: fixes TE>OT but breaks DT>OT and EDGE>OT. Fit drops 95 -> 94. Even a small increase breaks rules.
- The weight is not the lever — it punishes every PBLK deficit, including DL→OL moves that are priced correctly.
- **C's PBLK HAVE 9 -> 6:** fixes C>OG (6, correct) and moves C>OT from hard miss (2) to off-by-one (6). Fit 96/3/0, tier-error 3, **no hard misses**. KG's point is about the BODY (centers are shorter and much worse in one-on-one pass protection than the model credits — C's PBLK 9 is nearly as high as OT's 10), not the weight.
- **C's PBLK HAVE 9 -> 4:** fixes C>OT fully (12, raw 9.78). Fit 98/1/0 with EDGE CARRY 4 (only TE>OT remains).

## KG's point 2: EDGE>RB — "edges are the best athletes, 6 is more accurate"

**Answer: raise EDGE's CARRY (2 -> 4). Fixes it naturally, breaks nothing.**

- EDGE CARRY 4: EDGE>RB goes 12 -> 6 (raw 8.60, M 5.40 CARRY), correct. Fit improves 95 -> 96. Breaks 0 rules.
- EDGE CARRY 5 and 6 give the same fit (96). CARRY 4 is the minimal change.
- The reasoning is KG's: edges are the best athletes on the field — they carry the ball better than the model credits (CARRY 2). This is a score change, not a patch. The formula still derives the price; the score now reflects the athleticism.

## KG's point 3: TE>OT — "OT pass protection must be more heavily prioritized"

**Answer: lower TE's PBLK (5 -> 4). Fixes it, breaks nothing.**

- TE PBLK 4: TE>OT goes 6 -> 12 (raw 10.18, M 9.30 PBLK), correct. TEs are poor pass blockers against the opponent's best athletes (OTs face the best pass rushers).
- Combined with EDGE CARRY 4 + C PBLK 6: **98/1/0, tier-error 1** (only C>OT remains, owner 12, model 6).

## The combinations

| Variant | Exact | Off-by-one | Hard | Tier-error | Residuals |
|---|---|---|---|---|---|
| ZAI-D1 baseline | 95 | 3 | 1 | 5 | C>OG, C>OT, EDGE>RB, TE>OT |
| EDGE CARRY 4 | 96 | 2 | 1 | 4 | C>OG, C>OT, TE>OT |
| C PBLK 6 | 96 | 3 | 0 | 3 | C>OT, EDGE>RB, TE>OT |
| EDGE CARRY 4 + C PBLK 6 | 97 | 2 | 0 | 2 | C>OT, TE>OT |
| EDGE CARRY 4 + C PBLK 6 + TE PBLK 4 | 98 | 1 | 0 | 1 | C>OT |
| EDGE CARRY 4 + C PBLK 4 | 98 | 1 | 0 | 1 | TE>OT |
| **EDGE CARRY 4 + C PBLK 4 + TE PBLK 4** | **99** | **0** | **0** | **0** | **none** |

## The open question for the Owner

C's PBLK: **4 or 6?** At 4, ZAI-D1 is a perfect 99/99. At 6, it's 98/99 with only C>OT off by one (6 vs 12). A center with PBLK 4 is a big gap from OT's 10 — is that honest (centers really are that much worse in one-on-one pass protection, and it's worth $10M/year), or is 6 the honest score with C>OT accepted as the one off-by-one? KG to decide. Either way, the formula needs no patches — three score cells, all from his football reasoning.

## Labels

VERIFIED: all variants above, run by importing Z.ai's script and overriding W["PBLK"] / HAVE scores, against the live flex.json (97d7e9d). The PBLK-weight increases breaking DL>OL rules; the C PBLK and EDGE CARRY and TE PBLK fixes; the 99/99 and 98/99 combinations. INFERRED: that C PBLK 4 vs 6 is a judgment call for the Owner (the fit differs by one rule); that the three score changes are defensible on KG's stated football grounds.
