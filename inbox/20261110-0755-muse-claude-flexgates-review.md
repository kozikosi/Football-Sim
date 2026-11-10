# MUSE — Review: Claude's flexgates design (from-scratch, `a26a3da`)

SPEAKER: MUSE | ROLE: High Councillor | TASK: Review Claude's from-scratch derivation design | DATE: 2026-11-10

## Verdict: improved — the decomposition is the contribution, not the fit

Claude built his own design from scratch (flexgates: `tier(G + kP·P + kC·C)`), pushed as `a26a3da` on architect/engine-and-seats. It does NOT beat the other two on fit (v1 70/99, v2 80/99, vs Inkling 88/99 and ZAI-D1 95/99). He says so first. But the design contributes something the other two do not: a **verified decomposition** of what a flex price is, and the only **held-out (generalization) measurement** any design has. The fit is the weakest of the three; the decomposition is the strongest finding in the whole derivation effort.

## What MUSE verified by running Claude's code

**v1 and v2 fits — CONFIRMED.** Ran `node tools/mathlab/flexgates.mjs` against the live 99-rule table (flex.json md5 `428a27f3`, byte-identical to the table MUSE used for all other verifications):
- v1 (craft table pre-registered): **70/99** exact, 20 off-by-one, 9 hard. 5-fold CV **64.9%**, leave-one-role-out **61.3%**.
- v2 (FB craft-free, 3 waivers): **80/99** exact, 18 off-by-one, 1 hard. 5-fold CV **69.8%**, leave-one-role-out **66.5%**.
- Ablations (v2): guard alone 57, + body 59, + craft 78, all three 80. The measured body layer earns 2 rules; craft does the work. Confirmed.

**D is a value guard, not an ability measure — CONFIRMED EXACTLY.** This is the design's central claim, and it reproduces precisely. MUSE computed G = max(0, 20 × (1 − w_src/w_dst)) from the current slot weights (primary-slot mapping: OLB=WILL 150, CB=CB1 400, WR=WR1 650, OG=OG1 400, DT=DT1 500, EDGE=DE1 650, ILB=MIKE 300, TE=TE1 250, C=150, OT=OT1 500, SS=300, FS=300, NICKEL=CB3 100, DIME=50, FB=25, RB=RB1 250, K=50, P=50) and compared it to D@90 from `results/thetaprice-2026-11-09.md`:
- **Within 2 OVR points on 97/97 rules** (Claude's claim: 97/97). Worst diff 1.04 (RB>FS: G 3.33 vs D@90 4.37).
- **Same tier on 91/97** (Claude's claim: 91/97).
- No fitting. The guard is computed from slot weights alone.
- The 6.7 claim also checks: with WILL=200 (the decided P-318 bump), G for OLB>ILB and OLB>SS is 6.67 ≈ 6.7, exactly the Owner's reported post-bump D. With current WILL=150, G is 10.00 vs D@90 10.05 — also within 2.
- The guard-vs-owner breakdown with the WILL=200, C=200 bumps is **44 equal / 52 above / 3 below** — exactly Claude's claim. The 3 below are FB>RB, FB>TE, C>OG (his 3 waivers). With current weights it is 44 / 50 / 5 (OLB>ILB and OLB>SS are the two that move to "equal" under the bump).

**The guard fixes C>OT and TE>OT — CONFIRMED.** C>OT: G=14.0 (current weights) / 12.0 (bumped), tier 12, owner 12. TE>OT: G=10.0, tier 12, owner 12. These are guard rows, and the Owner's reason (OT pass protection is worth more) is slot value, which a duty profile cannot express. MUSE verified this arithmetic independently in the earlier guard verification (same numbers).

**What MUSE did NOT verify (REPORTED, from Claude's relay/design note):** the spec-matrix experiment (U = 1.0 for zero-priced rules, 6-priced rules start at 0.32) — this is about his experiment process, not the final design, and MUSE did not re-run it. The held-out CV numbers were produced by Claude's script (MUSE ran the script and the numbers printed match his results file, but MUSE did not independently re-implement the CV procedure).

## Three things to correct or qualify

1. **The relay's opening ("they combine by max") is superseded by Claude's own testing.** His first message said the guard and the transfer gap "combine by `max`. A sum double-counts." But his design note (§3) reports he TESTED the bottleneck max and REJECTED it: max gives 79 vs the sum's 80, and the fit sets kP = 0, "so no gate-by-gate story survives." The final design uses a SUM (`G + kP·P + kC·C`), not a max. The max was his thinking before building; the sum is what the data preferred. Any discussion of "max vs sum" should use the tested result (sum, 80 vs 79), not the pre-build intuition.

2. **The guard overprices exactly the rules MUSE found earlier — and Claude's design handles them by waiver + bump, not by the guard alone.** In MUSE's earlier guard verification, max(G, ZAI-D1's L) gave 93/99 (WORSE than ZAI-D1's 95/99) because the guard breaks 4 rules: FB>RB, FB>TE, OLB>ILB, OLB>SS. Claude's design resolves them as: FB>RB and FB>TE are waivers (fiat), C>OG is a waiver (fiat), and OLB>ILB/OLB>SS are fixed by the WILL bump (G 10.0 → 6.67, tier 6, owner 6). So the guard is NOT a free addition to Z.ai's design — it needs the waivers and the bump to avoid breaking rules. This is why Claude's recommendation #3 (try G + L under ZAI-D1's duties) must be tested with the waivers and the bump in place, not as a bare max(G, L).

3. **v2's 80 is tuned, and Claude says so.** The FB craft-free change and the 3 waivers were made after reading v1's residuals. v1's 70 is the clean number. Even v1 is optimistic (Claude had seen the Owner's table earlier in the session). The held-out numbers (65–70%) are the honest measure of this design's generalization, and they are the only held-out numbers any design has.

## What this means for the derivation

**The decomposition reframes the other two designs.** Inkling's D term was (unknowingly) a value term — he was summing a value term (D) and an ability term (skill gaps), which double-counts, and that is why he needed the gate and the U-deltas. Z.ai's design has NO value term at all — it is pure ability — which is why it cannot express C>OT and TE>OT (it needs the PBLK score changes instead) and why a re-weighting like P-318 cannot move its prices. Claude's verification (D = guard, 97/97 within 2 OVR, no fitting) makes this precise: D was never an ability measure.

**The fit ranking is not the whole story.** In-sample: ZAI-D1 95 (98 with scores) > Inkling 88 (93 with floor) > Claude v2 80 (v1 70). But only Claude has measured held-out accuracy, and his drops 5–13 points out of sample (70% → 65% 5-fold, 61% leave-one-role-out for v1; 80% → 70% / 67% for v2). Z.ai's and Inkling's out-of-sample numbers are UNKNOWN. If ZAI-D1 drops by a similar amount, its held-out accuracy would be ~85–90% — still the best, but the gap to Claude's v2 (67–70%) is smaller than the in-sample gap (95 vs 80) suggests. The fit advantage may be partly overfitting (ZAI-D1 has 17 duties × 17 roles of scores + 17 weights + λ + cuts; Claude's v2 has 12 craft tags + 5 fitted constants).

**MUSE-D1 (63/99) is not a contender.** MUSE's own from-scratch design (harmonic coverage) failed and is filed for the record. It does not enter the comparison.

## MUSE's recommendation (for the Owner's call on direction)

1. **Take the guard, whichever ability layer wins.** It is verified (97/97 within 2 OVR, no fitting), constant-free, portable across sports, and it is the piece P-318 and any re-weighting need. A derived table without it can silently become exploitable when weights change. This is Claude's recommendation #1, and MUSE endorses it.
2. **Run leave-one-role-out on ZAI-D1's script before choosing an ability layer on fit alone.** This is Claude's recommendation #2, and it is the critical test. If ZAI-D1 holds up out of sample (~85–90%), it is the ability layer. If it drops to ~70%, the fit advantage is mostly overfitting and the choice is closer. MUSE can run this (it is a verification of Z.ai's script, not MUSE's own math — allowed under the own-math constraint, since MUSE is testing Z.ai's design, not MUSE's).
3. **Try G + L under ZAI-D1's duties (Claude's recommendation #3), with the waivers and the WILL bump in place.** The combination to test is Z.ai's ability layer (L, the best-fitting ability model) + Claude's guard (G, the verified value term), as a SUM (Claude's data prefer the sum over the max, 80 vs 79). MUSE's earlier bare max(G, L) test (93/99) does NOT settle this — it lacked the waivers and the bump. If G + L gives 98–99/99, that is the derivation.
4. **Do not choose on in-sample fit alone.** The in-sample numbers (88 / 95 / 80) are all optimistic. The held-out numbers are the real test, and only one design has them.

## Labels

VERIFIED: v1 70/99 and v2 80/99 (ran flexgates.mjs); 5-fold CV and leave-one-role-out numbers as printed by the script; D-is-a-value-guard (97/97 within 2 OVR, 91/97 same tier, no fitting); the 44/52/3 guard-vs-owner breakdown with the WILL/C bumps; the guard fixes C>OT and TE>OT (G=12/10, owner 12); the max-vs-sum test result (79 vs 80, from Claude's design note and results file). REPORTED: the spec-matrix experiment (U values); the held-out CV procedure itself (ran the script, did not re-implement it). INFERRED: that ZAI-D1's held-out accuracy would drop by a similar amount to Claude's (unmeasured — the test in recommendation #2 would answer it); that the guard needs the waivers and the bump to avoid breaking rules (from MUSE's earlier max(G, L) test + Claude's waiver/bump structure).
