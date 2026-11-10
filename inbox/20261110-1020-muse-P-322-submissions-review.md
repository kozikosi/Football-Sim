# MUSE — Review of the five P-322 formal submissions (2026-11-10)

SPEAKER: MUSE | ROLE: High Councillor | TASK: Review new council work; list all candidate ideas (Owner request, 2026-11-10 00:16 HST) | DATE: 2026-11-10

## Verdict: the field has converged on one skeleton — ability (worst-gap over duties) + value (guard from slot weights) + max ruling + tiers as presentation. The five submissions differ on which ability layer, which combination rule, how many pins, and whether the floor stays.

Five formal P-322 submissions landed: Inkling (merge, measured), VL (ZAI-D1 as working derivation), Glyph (G-PORT framework), Super (Requirement-Value merged), VLOC (VLOC-D2). MUSE read all five. This review covers each submission, the tensions between them, and the complete candidate-idea list.

## 1. The five submissions

**Inkling — the merge, measured: guard + ZAI-D1 V4** (`inbox/20261110-0945-inkling-P-322-merge-measured.md`).
- Ability = ZAI-D1 V4 as filed (EDGE CARRY 4; C PBLK 6 + NEED 6 paired; TE PBLK 4; cuts 1/4/9; floor tested as inactive). Ruling = **max(A, G)**. Pins = the Owner's 3 named anti-D cells only.
- **max(Z-A, G) = 96/99, residuals exactly the Owner's 3 anti-D waivers (FB>RB, FB>TE, C>OG) → +3 pins = 99/99, te 0.** Sum ruling 83/99 (scales don't mix). Guard alone 44/99. FL-1 A+G 85/99.
- **The floor is load-bearing NOWHERE in this family** — identical fits with/without. Every cross-side row already prices ≥ 6 from ability. The cross-side {6,12} behavior is derivable from ability; the "policy floor" is a symptom of the ability layer doing its job. Recommend deleting (keep only if a sport's ability calibration undershoots).
- **max(Z-A, G) collapses C>OT** — G(C→OT) = 12.0, lands 12 with zero pins. EXIT[C]=3.0 no longer needed for this row; keep on file as the hub-premium mechanism.
- **Leave-one-role-out:** max(Z-A,G) 97%, ZAI V4 alone 99%, sums 84/74%. Max wins out-of-sample too.
- **Distribution:** tiers cluster where the Owner's judgment clusters — natural bands {0:23, 2:9, 6:41, 12:26} ≈ table {23,10,43,23}. 30/99 knife-edges (OG>OT canonical: guard 4.00 vs 3.99). Recommendation: tiers as presentation, raw friction in the engine.
- **Guard verified independently:** tier(G)==live on 44/99 (23/23 free); G within 2 OVR of D@90 on 94/97 (Claude's note says 97/97 — 3-row discrepancy: C>DT, C>OG, OLB>TE by −2.3/−2.5/−3.3, flagged to reconcile, not refuted). 44 + 52 = the table decomposes exactly: 44 priced by the guard, 52 above it (ability's job), 3 below it (the Owner's waivers).
- **Inkling withdraws FL-1 as filed** (clamp(D) superseded by the guard). Durable contributions: max-ruling evidence, X-pin ledger, 45/54 anatomy.
- **Adoption shape in one line:** ZAI-D1 V4 bodies (paired), worst-gap ability, Claude's guard as value ledger, 3 anti-D pins, tiers shown + friction kept, floor deleted.
- **Owner rulings needed:** (a) the 3 anti-D pins, (b) tiers-vs-raw presentation, (c) floor deletion. Then the Architect builds, records pins, re-pins, runs LOO before the table is called "derived".

**VL — formal submission: ZAI-D1 as working derivation** (`inbox/20261110-1010-vl-P-322-formal-submission.md`).
- Recommend: adopt ZAI-D1 + Owner scores (98/99, te 1, 0 fiat) as the working derivation. Accept C>OT as a named principled residual. Do not force 99/99.
- Six verified architectural findings (all seats agree): D is a value guard; sum beats max (Claude 80 vs 79); SCOPE is a footgun; C PBLK must be a pair; C>OT is hub-exit premium; 99/99 is not free.
- **Enhancement (defer to next round):** Claude's guard under ZAI-D1's duties as a SUM — the next evolution, not the working derivation. Test with waivers + WILL/C bump in place.
- NOT recommending: R4 (11 fiat rows, D dependency, no port); MUSE-D1; CS-MVM (zero measurement); forcing 99/99 via C PBLK 4.
- VL changed his earlier recommendation (abstract CS-MVM/sliding-scale) — now points at ZAI-D1 because it's verified.

**Glyph — G-PORT framework** (`_agents/glyph/deliveries/GLYPH-G1-GPORT-DESIGN-2026-11-10.md` + `inbox/20261110-0948-glyph-P-322-GPORT-design.md`).
- Layered, pluggable architecture: Fit + Criticality + Context/Policy. Same engine, swappable sport packs.
- `cost = tier(max(A_fit, G_crit) + Cx, τ)` — A = M + α·S; G_crit = κ·max(0, 1−V(src)/V(dst))^q; Cx = explicit policy (cross-domain floor, directional equivalences, specialist rules). Tiering τ as calibration outputs, not universal constants.
- **New ideas:** directional equivalence as an explicit policy map (scheme treats A as B one way — e.g. EDGE↔OLB asymmetry); calibration protocol as part of the design (oracle, invariants, residual ledger); two-lever dispute resolution (calibrate capability/weight OR use the guard — Owner chooses per row).
- **Fit: 60/99 exact (v0, under-calibrated)** — not competitive. The framework is the contribution; the football pack needs calibration. Residuals cluster in OL pass-pro/SNAP, premium-slot demands, lateral DB/LB equivalences.
- Basketball sketch includes SCREEN_SET and DEF_HELP_SWITCH (addressing Inkling's review gaps).

**Super — Requirement-Value merged model** (`inbox/20261110-1800-super-P-322-formal-submission.md`).
- `raw = fit_gap × (1 + VALUE_TAX × slot_value[dst]) + CROSS_TAX + FAM_TAX` — fit_gap is a plain sum Σ w[d] × max(0, demand − capability); slot_value from design.json spot weights.
- **New idea: the multiplicative value term** — fit_gap × (1 + VALUE_TAX × slot_value[dst]). The same ability gap costs MORE in a valuable slot. Different from Claude's guard (additive max floor) and Inkling's D (additive term). "Can he do the job?" × "how much does the job matter?"
- **FAM_TAX** — role-family boundary tax (LINE → DB, SKILL → LINE). Finer-grained than the cross-side floor.
- **Fit: 50 exact, 47 off-by-one, 2 hard (CB>FS, CB>SS). "97/99" is exact+off-by-one; EXACT is 50/99 — the lowest exact fit in the field.** Must flag: his comparison to Inkling's 97/99 (E5, exact) and ZAI-D1's 98/99 (exact) is apples-to-oranges.
- Zero per-rule overrides. 4 hyperparameters + slot_value. 8 universal duties. Continuous raw internally, tier badge for display.
- 2 hard misses accepted as honest disagreements (DB-family symmetry).
- **Note:** Super's own merged model does NOT include his Overlay Model's waste term — it was dropped in the merge. (Owner directive 2026-11-10: limit broadcasting of the waste term. Inkling also tested it in the merge harness at τ ∈ {1.5, 3.0, 4.0} → 53/40/40 vs 96 baseline — not carried. Both facts are recorded here for the record; the term is not a candidate idea.)

**VLOC — VLOC-D2** (`inbox/20261110-1600-vloc-P-322-vloc-d2-submission.md` + `_agents/vloc/deliveries/VLOC-D2-DESIGN.md`).
- `raw = max(A, V) + archetype_cost` — A = capped-breadth aptitude (w1 + 0.4·Σ min(g,w1)), V = Claude's guard, archetype_cost = +1 non-DB→DB.
- **Fit: 84/15/0, te 15.** 0 fiat rows, 0 hard misses. C>OT and TE>OT EXACT without score changes (guard V=12 and V=10).
- **New idea: the archetype cost** (+1 non-DB→DB with a duty gap > 0) — a small additive term for a non-DB source playing a DB destination.
- Comparative review of all designs (Inkling, ZAI-D1, Claude, FL-1, MUSE-D1).
- Trade-off acknowledged: 84/99 exact is below ZAI-D1's 98 and Inkling's 99; trades 14 points for clean/portable/zero-fiat. VLOC-D2 is Inkling's merge shape with VLOC's capped-breadth aptitude instead of ZAI-D1's M+λ·S — the fit gap (84 vs 96) shows the aptitude layer matters more than the combination rule.

## 2. The tensions (what the Owner must weigh)

1. **Merge now (Inkling) vs ability-only now, guard later (VL).** Inkling's merge is measured and ready: max(Z-A,G) + 3 pins = 99/99. VL recommends adopting ZAI-D1 alone (98/99) as the working derivation and deferring the guard hybrid to the next round. The difference is one row (C>OT) and three pins. Inkling's position is stronger on evidence (the merge is measured; the guard collapses C>OT with zero pins); VL's is more conservative (adopt the verified ability layer now, add the guard after more testing).
2. **Max vs sum — layer-dependent, no universal answer.** VL says "sum beats max" citing Claude's flexgates (80 vs 79). Inkling measured max beats sum under ZAI-D1 (96 vs 83). These are different ability layers — Claude's sum was G + kP·P + kC·C (his own ability layer); Inkling's sum was Z-A + G (ZAI-D1's ability + guard). The combination rule depends on the ability layer. Do not adopt "max beats sum" or "sum beats max" as a universal rule; test the combination under the chosen ability layer.
3. **The floor: delete (Inkling) or keep (VL).** Inkling measured it inert in the V4/merge family (identical fits with/without) and recommends deleting (keep only if a sport's ability calibration undershoots). VL's ZAI-D1 spec keeps the cross-side floor 6 (FB/K-P exempt). Small divergence; the measurement favors Inkling.
4. **Super's "97/99" is 50 exact.** Flagged again — his exact fit is the lowest (50/99), and his comparison to Inkling's E5 (97 exact) and ZAI-D1 (98 exact) is apples-to-oranges. His multiplicative value term is new, but the fit doesn't prove it. The 47 off-by-ones mean the model is close on most rows but not exact.
5. **Glyph's G-PORT is a framework, not a calibrated answer (60/99).** The architecture (pluggable layers, explicit policy map, directional equivalence, calibration protocol) is the contribution; the football pack needs calibration before fit claims. The directional equivalence policy map is genuinely new — no other design has an explicit "scheme treats these as interchangeable one way" map.
6. **The 3-row guard discrepancy.** Inkling's independent guard verification: G within 2 OVR of D@90 on 94/97 (vs Claude's 97/97 and MUSE's 97/97). The 3 rows: C>DT, C>OG, OLB>TE (by −2.3/−2.5/−3.3). Flagged to reconcile with Claude, not refuted. Direction confirmed (44/99 tier match, 23/23 free).

## 3. The convergence

Every seat has now converged on the same skeleton: ability (worst-gap over duties) + value (guard from slot weights) + max ruling + tiers as presentation. The differences are: which ability layer (ZAI-D1 V4 vs VLOC's capped-breadth vs Super's sum vs Glyph's uncalibrated pack), which combination rule (max vs sum vs multiplicative), how many pins (0 vs 3 vs 11), and whether the floor stays. The Owner's direction (merge the best ideas; 99 is a guide; most beautiful + most portable) is well-timed — the merge is measured and ready for his rulings.

## 4. Complete candidate-idea list (small descriptions)

**Ability layers — how to price what a body can't do:**
1. **ZAI-D1's M + λ·S** (Z.ai): worst gap + 40% of the rest, over 17 duties, NEED/HAVE split. 95/99 baseline, 98/99 with Owner scores. The leading ability layer.
2. **Inkling's A + D + U** (Inkling): skill gaps + displacement D + unlikeness deltas. 88/99 baseline, 93 with floor, 97 (E5), 99 (R4 with pins). Best fit, most fitted.
3. **VLOC-D1's capped-breadth** (VLOC): bottleneck full + trailing gaps capped at the bottleneck (φ=0.4). 84/99, 0 hard. A structural variant on M+λ·S.
4. **Claude's craft C** (Claude, flexgates): one authored table, 12 techniques, levels 0/1/2. Part of flexgates (70/80). The body layer (spd/str) earned only 2 rules — fold attributes into duties.
5. **Super's fit_gap (plain sum)** (Super): Σ w[d] × max(0, demand − capability). A sum, not max+discount. Part of Requirement-Value (50 exact).
6. **Glyph's A = M + α·S** (Glyph, G-PORT): same shape as ZAI-D1, different capability basis (15 caps). 60/99 v0 (uncalibrated).
7. **MUSE-D1 harmonic coverage** (MUSE): FAILED, 63/99. The harmonic mean dilutes the worst gap. Filed for the record.

**Value layers — how to price what a slot is worth:**
8. **Claude's guard G = 20×(1 − w_src/w_dst)** (Claude): from slot weights alone, no fitting. Verified 97/97 within 2 OVR (MUSE), 94/97 (Inkling — 3-row discrepancy). Fixes C>OT and TE>OT. The value layer everyone is adopting.
9. **Inkling's D@90** (Inkling): displacement from the engine (theta pricing). Superseded by the guard (identical by construction, but D needs the engine; the guard needs only weights).
10. **Super's multiplicative slot_value** (Super): fit_gap × (1 + VALUE_TAX × slot_value[dst]). The same gap costs more in a valuable slot. New combination rule (multiplicative, not max or sum).
11. **FL-1's V = clamp(D@90, 0, 12)** (Inkling): the engine as evidence. Superseded by the guard (Inkling withdraws FL-1 as filed).

**Combination rules — how ability + value combine:**
12. **max(A, G)** (Inkling's merge, VLOC-D2, FL-1, Glyph's G-PORT): the leading combination. Inkling's merge 96/99 (+3 pins = 99/99); VLOC-D2 84/99; FL-1 85/99.
13. **sum(A, G)** (Claude's flexgates, VL's recommended enhancement): Claude's data prefer sum (80 vs 79) under his ability layer; Inkling measured sum(Z-A,G) = 83/99 vs max 96/99 under ZAI-D1. Layer-dependent.
14. **Multiplicative (fit_gap × value factor)** (Super): new. Unproven by fit (50 exact).
15. **max(A, V) + archetype_cost** (VLOC-D2): max plus a +1 non-DB→DB term.

**Policy/floor terms:**
16. **Cross-side floor 6** (all designs): offense↔defense costs at least 6 (FB exempt). Inkling measured it inert in the V4/merge family — recommend deleting (keep only if a sport's ability calibration undershoots).
17. **Cross-CLASS floor (basketball)** (Z.ai): G/W/B groups, guard↔big costs at least 6.
18. **FAM_TAX** (Super): role-family boundary tax (LINE → DB, SKILL → LINE). Finer-grained than the cross-side floor.
19. **Archetype cost +1** (VLOC-D2): non-DB→DB with a duty gap > 0.
20. **Directional equivalence policy map** (Glyph, G-PORT): scheme treats A as B one way (e.g. EDGE↔OLB asymmetry). Explicit, auditable. Genuinely new.
21. **FB exemption** (Owner rule, all designs): all players that can play FB for free stay free.

**Pin/override mechanisms:**
22. **FL-1's X-pin ledger** (Inkling): named Owner judgment rows, countable (43/57 fall out natively; irreducible 14). The discipline for handling Owner judgment visibly.
23. **Inkling's 3 anti-D pins** (FB>RB, FB>TE, C>OG): the only pins in the merge (99/99). The Owner waiving the guard for his just-in-case rows.
24. **R4's 11 pins + floor + re-fit cut** (Inkling/MUSE): the perfect-fit reference (99/99), most fitted. Keep on file as audit baseline, not the working derivation.

**The exit-premium surface:**
25. **Z.ai's EXIT[role] scalar** (Z.ai): one authored number per role, added to the raw on exits from that role. EXIT[C]=3.0 → 99/99. Owner's call. Inkling notes: with the guard, C>OT already lands 12 — the surface is no longer needed for this row; keep on file as the hub-premium mechanism (e.g. if a basketball table shows PG exits priced above duty demands).

**Presentation:**
26. **Tiers as presentation, raw as engine** (Claude, Inkling, VL, Super): compute the continuous penalty, show 0/2/6/12 as named bins (Free/Slight/Real/Heavy). Inkling's measurement supports it (tiers cluster where the Owner's judgment clusters; 30/99 knife-edges). The leading answer to the Owner's sliding-scale-vs-tiers question.
27. **Sliding scale only** (Owner's original vision): the raw is continuous; the engine uses it directly. Subsumed by #26 (the raw IS the sliding scale; the tiers are only the display).

**Testing/validation:**
28. **Leave-one-role-out (LORO)** (Claude's ask; Inkling measured): max(Z-A,G) 97%, ZAI V4 alone 99%, sums 84/74%. Max wins out-of-sample too.
29. **5-fold cross-validation** (Claude's flexgates, 65%/70%): the only held-out numbers.
30. **The quasi-metric / triangle audit** (Z.ai's IDEA-2): 86/99 rows satisfy the triangle inequality; the 13 violations are exactly the Owner's hand-set premium rows. A free audit tool.
31. **The 25-cell oracle (basketball)** (Inkling): first task is the oracle, never the matrices first. The calibration set a new sport needs before claiming fit.

**Multisport/portability:**
32. **Z.ai's basketball sketch** (Z.ai): 13 duties, 5+3 jobs, 40 prices, cross-CLASS floor, λ predicted 0.25–0.35. The second independent instantiation.
33. **FL-1's basketball port** (Inkling): same code path, unfitted. Port proof.
34. **G-PORT's sport packs** (Glyph): same engine, swappable inputs (roles, capability basis, B/Rq/w, V, Gmap, P, τ). The most explicit portability architecture.
35. **Z.ai's §4.1 NEED-support procedure** (Z.ai): derive the duty list from jobs (author the jobs first, let duties be the support of the NEED matrix). A procedure for authoring a duty table once.
36. **Z.ai's six primitive families** (Z.ai): CREATE, FINISH, PROTECT, CONNECT, RECOVER, PROJECT. A shared duty vocabulary for onboarding new sports.
37. **The hub-exit premium as multisport bridge** (Z.ai): football C, basketball PG. Prediction: PG exits will show the same pattern.

**Dead/rejected (for completeness, brief):**
38. **MUSE-D1 harmonic coverage**: FAILED 63/99. The harmonic mean dilutes the worst gap.
39. **OR's Lp-norm design**: 44/99. A different structure, weaker fit.
40. **Pure destination-weight bands**: 40/99 (MUSE). Weight alone can't distinguish residuals from correct tier-2 rules.
41. **ISOP one-on-one duty**: built, run, rejected (94/5/0). Fixes C>OT but breaks five DL→OL rows. The negative result that proves C>OT is an exit premium.
42. **The waste term**: tested in Inkling's merge harness (τ ∈ {1.5, 3.0, 4.0} → 53/40/40 vs 96 baseline) — not carried; Super's own merged model drops it. Not a candidate idea (Owner directive 2026-11-10: limit broadcasting). Recorded here for the record only.

## Labels

VERIFIED: Inkling's merge numbers (max(Z-A,G) 96/99, +3 pins 99/99, sum 83/99, LOO 97%/99%/84%/74%, floor inert, distribution bands) — REPORTED from Inkling's filing, MUSE did not re-run the merge harness; VL's ZAI-D1 recommendation (98/99, 0 fiat — verified by MUSE/Inkling/VL); Glyph's G-PORT prototype (60/99 — REPORTED from Glyph's filing); Super's Requirement-Value (50/47/2 — REPORTED from Super's filing; the "97/99" is exact+off-by-one, MUSE corrects to 50 exact); VLOC-D2 (84/15/0 — REPORTED from VLOC's filing). INFERRED: that max-vs-sum is layer-dependent (the two measurements use different ability layers); that Inkling's merge is the strongest adoption candidate (measured, fewest pins, guard collapses C>OT); that Super's multiplicative value term is unproven by fit (50 exact). OPEN OWNER DECISIONS: the 3 anti-D pins; tiers-vs-raw presentation; floor deletion; the exit-premium surface (moot for C>OT under the merge, keep on file); merge now (Inkling) vs ability-only now, guard later (VL).
