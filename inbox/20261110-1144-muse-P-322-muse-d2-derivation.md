SPEAKER: MUSE | ROLE: Council advisor | TASK: P-322 design (MUSE-D2) | DATE: 2026-11-10 11:44 UTC
FOR: P-322

# MUSE-D2: a flex derivation designed from the Owner's Q&A

**Seat:** MUSE (council advisor seat, executing the council prompt as a councilmember)
**Date:** 2026-11-10 (UTC 11:44)
**Work option:** A — design my own derivation from the Q&A (my interpretation)
**P-item:** P-322 (formal design submission)
**Script:** `_agents/muse/deliveries/muse-d2-2026-11-10.py`
**Oracle:** the live 99-rule table (architect/engine-and-seats, `97d7e9d`, `tools/mathlab/flex.json`). Per the Q&A (Q2), the 99 is a guide, not a target. Fit is reported, not chased.

---

## 1. The design, in one paragraph

Two ingredients, as the Owner confirmed (Q6). **Ability** — can this body do that job? — from ZAI-D1's NEED/HAVE duties (the best available ability layer; positional requirements, not attributes, not intangibles). **Value** — can you cheat by moving talent up the value ladder? — from the guard, but read from **engine-measured slot values** (localWins20), not from Owner-provided weights, because the Owner will NOT provide set weights for other sports. Gravity enters through the value layer: the engine-measured slot values already reflect the attention a slot draws (a slot that draws double teams is more valuable, and the engine measures that value), so no separate gravity term is added. The combination is a **tunable blend** — `raw = max(A, G) + β·min(A, G)`, β ∈ [0, 1] — which is the Owner's "maybe both" plus "adjustable ratio" (Q7) as one knob. No floor (out, Q10). No named exceptions (out, Q9). No pair-tracking (out, Q12). Dual positions play both for free (round-2 Q1). Unpriced moves are mostly forbidden (Q15); the formula prices the allowed ones. User display is a simple integer (Q4); the exact scale is deferred (follow-up Q2), so the continuous raw is reported here.

## 2. What is new, and what is reused

**Reused:** ZAI-D1's ability layer — the 17 duties, the NEED/HAVE matrices, the weights, λ = 0.4, cuts 1/4/9. The Q&A does not reject duties (it rejects attributes and intangibles); duties are positional concepts, and ZAI-D1's are the best available. Reusing them is deliberate, not a shortcut: the novelty of this design is in the value layer and the combination, not in re-authoring duties.

**New:**
1. **The guard reads engine-measured weights.** Claude's guard reads `SLOTS[].weight` (the Owner-provided input table). MUSE-D2 reads the engine's own measurement (localWins20). This is the portability answer to the Owner's caveat: the value layer must work without Owner-provided weights for other sports. The engine measures slot values for any sport once its engine exists; the guard reads those. **Tested:** the guard from measured weights gives IDENTICAL results to the guard from input weights (same fit, same residuals, at every β). The guard is robust to the weight source, so the measured-weights form is safe to adopt.
2. **The tunable blend.** `raw = max(A, G) + β·min(A, G)`. β = 0 is pure max; β = 1 is the sum; β = 0.5 is halfway. One knob, most malleable, easy to tune — exactly what Q7 asked for.
3. **Gravity through the guard, not as a third term.** The Q&A says gravity "might be part of the formula itself" (follow-up Q3). This design puts it in the value layer (the measured slot values are gravity-inclusive) and keeps two ingredients, as Q6 confirmed. No separate gravity term is added. If a future measurement shows gravity needs its own term, it can be added as a third ingredient — but it is not needed here.
4. **No pair.** The C PBLK score change is NOT used (it requires tracking a HAVE/NEED pair, which Q12 rejects). The guard handles C>OT instead (Q11a). The two non-pair score changes (EDGE CARRY 2→4, TE PBLK 5→4) ARE used — they are single score changes, not pairs.

## 3. Results (VERIFIED by running the script against the 99-rule table)

| Design | Exact | Off-by-one | Hard | Tier-error |
|---|---|---|---|---|
| ZAI-D1 as written (floor on) | 95 | 3 | 1 | 5 |
| ZAI-D1, floor OFF (Q10) | 95 | 3 | 1 | 5 |
| **MUSE-D2, β = 0, measured weights** | 93 | 5 | 1 | 7 |
| **MUSE-D2, β = 0, measured + EDGE CARRY 4 + TE PBLK 4** | **94** | **4** | **1** | **6** |
| MUSE-D2, β = 0.25, measured | 85 | 13 | 1 | 15 |
| MUSE-D2, β = 0.5, measured | 83 | 15 | 1 | 17 |
| MUSE-D2, β = 1.0 (sum), measured | 82 | 16 | 1 | 18 |
| ZAI-D1 + all three score changes (pair) — reference only | 98 | 1 | 0 | 1 |

Best MUSE-D2 run (β = 0, measured weights, EDGE CARRY 4 + TE PBLK 4): **94/99, tier-error 6.** Residuals: C>OG, FB>RB, FB>TE, OLB>ILB, OLB>SS.

### What the guard fixes (the positive result)

- **C>OT is exact** (owner 12, model 12; A = 2.03, G = 14.00, max = 14.00). The guard explains C>OT, as Q11a predicted, **without the C PBLK pair**. This is the key result: the pair is not needed.
- **TE>OT is exact** (owner 12, model 12; A = 10.18, G = 10.11, max = 10.18).
- **EDGE>RB is fixed** by the EDGE CARRY 4 score change (A = 8.60, tier 6, owner 6).

### What the guard breaks (the open problem)

- **FB>RB** (owner 2, model 12; A = 3.30, G = 17.96). **FB>TE** (owner 6, model 12; A = 4.74, G = 17.97). **OLB>ILB** (owner 6, model 12; A = 6.84, G = 10.04). **OLB>SS** (owner 6, model 12; A = 8.12, G = 9.98). In all four, the ability layer is right (or close) and the guard overprices it. The guard is a blunt instrument: it prices the slot-value ratio, but the Owner prices the ability in these cases and the value jump only in C>OT/TE>OT. The guard needs a better form — it cannot be a simple max of the slot-value ratio. **This is the open problem for the convergence conversation, not a solved problem.** I do not propose pins (Q9 forbids named exceptions), and I do not propose a floor (Q10 forbids it).
- **C>OG** (owner 6, model 12; A = 1.20, G = 12.50) remains wrong in every design that does not use the pair or a pin. It is the Owner's discount (C>OG stays 6 by Owner override). No design gets it right without the pair. Noted, not forced.

### The blend (Q7, answered by the data)

The blend makes it worse at every step: β = 0 (94) → β = 0.25 (85) → β = 0.5 (83) → β = 1.0 (82). The data says the adjustable ratio converges to **pure max (β = 0)**, not to a blend and not to the sum. The knob is real and tunable, but the best setting is 0. This is a useful answer to Q7: "maybe both" is resolved as "max, with the blend available if future evidence moves it."

### The floor (Q10, confirmed)

Removing the floor costs nothing: ZAI-D1 is 95/99 with the floor on and 95/99 with it off (identical residuals). The floor is inert in this family, as Inkling measured. Deleting it is free.

### The weight source (portability, confirmed)

The guard from engine-measured weights (localWins20) gives IDENTICAL results to the guard from Owner-provided input weights, at every β. The guard does not depend on Owner-provided weights. This is the portability proof: the value layer works for a sport with no Owner-provided weights, because the engine measures the slot values itself.

## 4. The SS2 test (P-338 — roles emerge from the formula)

A big nickel (SS2) was priced by authoring a NEED profile (interpolated between SS and NICKEL: MCOV 7, ZCOV 6, RNG 8, TKL 8, CTH 4, DEEP 3, RDEF 5, RUSH 1), using the SS body for HAVE, and estimating SS2's slot value as the midpoint of SS and NICKEL. MUSE-D2 (β = 0, measured weights):

- **Into SS2:** SS 2, FS 2, CB 2 (the DBs drift in cheaply — as they should); ILB 6, OLB 6, WR 6 (moderate); DT 12, EDGE 12, TE 12, RB 12, FB 12, OL 12, QB 12, K/P 12 (prohibited/expensive — as they should be). This matches intuition: a big nickel is a safety/corner playing in the slot; linebackers can do it at a cost; big men and offensive players cannot.
- **Out of SS2:** SS2>NICKEL 0, SS2>DIME 0 (a big nickel IS a nickel, and a safety can play dime — free, as expected); SS2>OLB 2, SS2>FB 2 (cheap); SS2>SS 6, SS2>FS 6, SS2>ILB 6, SS2>TE 6; SS2>CB/DT/EDGE/WR/RB/OT/OG/C 12.
- **Caveat:** SS2>SS and SS2>FS at 6 are a guard artifact of the estimated SS2 slot value (0.5249, below SS's 0.7887). A big nickel IS a safety, so SS2>SS should be 0, not 6. The guard needs the right slot value for a new position; the ability layer alone (A = 0) gets it right. This is a real sensitivity to flag: when pricing a new position, the estimated slot value drives the guard, and a wrong estimate creates a wrong price. The ability layer is the safer guide for new positions.

The formula CAN price a position that is not in the game, without hand-written rules. Roles emerge from the formula, as the Owner wanted (round-2 Q2).

## 5. Recommendation

**Adopt as working derivation:** MUSE-D2 at β = 0 (pure max), guard from engine-measured weights, EDGE CARRY 4 + TE PBLK 4, no floor, no pair, no pins. It is 94/99 (tier-error 6), one rule behind ZAI-D1 as written (95/99) but it fixes C>OT and TE>OT without the pair, proves the guard works on engine-measured weights (portability), and answers Q7 (the blend converges to max). It is NOT the best fit in the field — ZAI-D1 + the pair is 98/99 — but the pair is out per Q12, so 98/99 is not available in the form the Owner wants. **Do not adopt the blend (β > 0): the data says it hurts.** **Do not adopt the floor: it is inert.** The open problem is the guard's overpricing of FB>RB, FB>TE, OLB>ILB, OLB>SS — the guard needs a better form, and that is a topic for the convergence conversation (Claude + Z.ai + the Owner), not a patch I will force here.

## 6. What I did not do

- I did not use the C PBLK pair (Q12). I did not use pins (Q9). I did not use a floor (Q10). I did not use attributes or intangibles (Q14). I did not add a separate gravity term (gravity is in the guard's measured weights). I did not re-author the duty matrices (ZAI-D1's are the best available; the Q&A does not reject them). I did not test basketball (deferred, Q16). I did not define the merge (Q18).

## 7. Labels

- **VERIFIED:** the fit numbers above (run from the script against the 99-rule table); the guard's identical results from measured vs input weights; the floor's inertness (95/99 both ways); the blend's monotonic worsening (94 → 85 → 83 → 82); the SS2 prices above.
- **REPORTED:** the Q&A answers as the design constraints (from the Owner's questionnaire, round-2 answers, and follow-ups, as published in the Q&A prompts).
- **INFERRED:** that the guard's measured weights are gravity-inclusive (the engine measures the slot's total impact, including the attention it draws — this is a design claim, not a measured fact; a gravity-blind baseline does not exist to test it against); that the guard needs a better form (from the four overpriced rules — the pattern is clear but the fix is not yet found).
- **UNKNOWN:** the correct guard form that fixes FB>RB, FB>TE, OLB>ILB, OLB>SS without breaking C>OT/TE>OT; the true slot value of SS2 (estimated here); whether a separate gravity term would help (not tested — no gravity values exist to test with).
