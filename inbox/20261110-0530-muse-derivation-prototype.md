# MUSE — Derivation prototype (Claude's path step 2, run by MUSE)

SPEAKER: MUSE | ROLE: High Councillor | TASK: Derivation prototype | DATE: 2026-11-10

## Bottom line

Claude's proposed derivation — one function from (from-role, to-role) to a penalty tier, using the skill-profile D through the cut points 1/4/9, checked against the Owner's table as the oracle — **works against the live 99-rule table: 88 exact, 11 off-by-one-tier, 0 hard misses.** The 11 disagreements split cleanly into two groups, both of which Claude predicted: 5 are the cross-side floor (an explicit Owner override the formula should not reproduce without the floor term), and 6 are Inkling's known residuals (owner 0, model 2). This is the prototype Claude asked for, run by MUSE first (per the "do the work yourself first" rule). The script is `_agents/muse/deliveries/derive-prototype-2026-11-10.py`.

## What I ran (VERIFIED)

- **The live 99-rule table** (architect `97d7e9d`, read via `git show`): 99 rules, tiers {0: 23, 2: 10, 6: 43, 12: 23}. Confirmed.
- **Thetaprice D@90** (architect, `tools/mathlab/results/thetaprice-2026-11-09.md`): 104 rows, 40 nonzero. D_bumped with the Owner-estimated 6.7 for OLB>ILB and OLB>SS (Inkling's design, REPORTED).
- **Inkling's P-322 skill-profile formula** (from the P-328 verification script, which reproduced Inkling's 97/105 exactly): `model_price = tier(D_bumped + A + U)`, with the A-term (beta-weighted skill gaps, with the design's modifiers), the U-term, the gate (D>=5 → A=0; 4<=D<5 → A×0.5), and the cut points 1/4/9. SAM alias, FB discount, Owner OVERRIDE dict, no-op rules.
- **Result: exact 88, off-by-one-tier 11, hard misses 0, no-profile 0.**

## The 11 disagreements (the formula-versus-table diff)

**Group 1 — the cross-side floor (5 rules, owner 6, model 2):** WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS. The model predicts 2 (the D-based price); the Owner's floor raised them to 6. These are NOT model failures. They are the explicit Owner override Claude predicted: "a sign of a missing term, such as the cross-side floor." The formula needs the floor term added (if cross-side and price < 6, raise to 6, except FB) to reproduce them. With the floor term, these 5 become exact.

**Group 2 — Inkling's known residuals (6 rules, owner 0, model 2):** CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL. These are the same 6 non-SAM residuals from P-328 (the 8 P-328 residuals minus the 2 SAM mirrors, which do not exist in the 99-rule table since SAM adds no rules). The model predicts 2; the Owner says 0. These are the genuine open disagreements — either explicit exceptions (the Owner prices these as free for reasons the skill profiles do not capture) or signs of a missing term in the skill model.

**With the floor term added, the fit would be 93/99 exact, 6 off-by-one-tier, 0 hard.** The 6 remaining residuals are Inkling's known 6.

## What this means for Claude's path

- **The derivation works.** 88/99 exact with 0 hard misses, using Inkling's P-322 design and the existing D@90, is a strong prototype. It confirms Claude's principle (ability distance, weight left out) and his approach (one function, Owner's table as oracle).
- **The cross-side floor is a missing term, not a model failure.** The 5 WR>DB disagreements are exactly the floor rules. Adding the floor term to the formula (as a post-processing step, or as a term in the derivation) would reproduce them. This is the cleanest next step for the derivation.
- **The 6 Inkling residuals remain open.** They are the same 6 from P-328. Whether they are explicit exceptions or signs of a missing skill term is a design question (for P-322, or for the derivation work).
- **Option B is held, as Claude proposed.** The prototype does not change the flex table; it is read-only. KG decides Option B after seeing the prototype and the DL5 pin.

## Open questions (for the Owner / the derivation work)

- **The DL5 reframing (Owner, 2026-11-10):** KG directs that DL5 be thought of as a player who comes in for blitzes and heavier defensive sets, not as a rotational substitute for a DT or EDGE — and since there are no injuries in the sim, all players are starters, even if DL5 does not play every snap. This reframes the DL5 question. It bears on the flex-dl5 derivation (currently the cheaper of role→DT and role→EDGE — if DL5 is a blitzer/heavy-set player, the cost to fill it should reflect blitzing ability, not DT/EDGE similarity) and on the formation-gap measurement (the DL5=DT vs DL5=EDGE cells). The derivation prototype above does not address DL5 specifically; the flex-dl5.json derivation is a separate piece of work. Verbatim: `_agents/owner-notes/2026-11-10-dl5-blitzer-heavy-sets-verbatim.txt`.
- **P-321 recomputation:** The flex.json header says "D is NOT recomputed here (P-321 does that)." The prototype uses the existing D@90 (thetaprice). When P-321 recomputes D from the localWins20 measurement, the prototype should be re-run against the new D to see if the fit improves or the disagreements change.
- **The 15-skill outline (MUSE, 2026-11-10):** MUSE outlined 15 skills (splitting BLK into pass/run, COV into man/zone, CTH into catching/routes; adding THR and TKL) as a proposal to extend Inkling's 9-skill design. Scoring all 19 roles on 15 skills (285 scores) is a calibration task for the council and the Owner. If the 15-skill version is scored, the derivation prototype should be re-run with it to see if it beats 88/99 and fixes any of the 6 residuals.

## Labels

VERIFIED: the live 99-rule table (99 rules, tiers {0: 23, 2: 10, 6: 43, 12: 23}); thetaprice D@90 (104 rows, 40 nonzero); the model fit (exact 88, off-by-one 11, hard 0) — all run by MUSE against the Architect's branch. REPORTED: Inkling's P-322 design (the formula, the D_bumped 6.7 overrides, the skill scores) — from Inkling's design file, P-328-verified by MUSE. INFERRED: that adding the floor term would give 93/99 (arithmetic from the 5 floor rules, not yet run); that the 6 residuals are explicit exceptions or missing terms (Claude's framing, not yet decided).
