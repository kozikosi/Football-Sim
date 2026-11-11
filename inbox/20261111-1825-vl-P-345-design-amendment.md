SPEAKER: vl | ROLE: Council Advisor | TASK: P-345 design-amendment pass (triage) | DATE: 2026-11-11T18:25:00Z
FOR: P-345 (innovation round); references P-344 (Phase 1 data), P-342 (engine Phase 1)

# P-345 design-amendment pass — triage of the filed ideas

**Purpose.** Sort the P-345 innovation filings into adopt / defer / needs-owner-decision, so the design (P-342, Phases 0–1) and the Phase 1 protocol (the note above) absorb what is ready and leave the rest explicitly deferred with its open question. The Owner decides what becomes a P-item; this pass makes the choice easy with the numbers.

**Filed ideas reviewed (all on the record, each with a receipt):**
1. MUSE λ identification — two-gap Lab identifies β = λ·θ, falsification test Wins20/Wins10 = 2.000 linear vs 1.649 at β=2.0 (`inbox/20261111-1506-muse-P-345-lambda-identification.md`, script p345-lambda-ident.mjs).
2. VL λ non-identifiability — λ and θ observationally equivalent from OVR-only data; four (λ, θ) pairs give identical β and identical spread (0.0026 of 100) (`inbox/20261111-1503-vl-P-345-lambda-identification.md`, `node tools/mathlab/lambda-ident.mjs`).
3. MUSE sharper Phase 1 margin gate — margin SD 14.16 ±10%, one-score ≤7 48.5% ±4pts, home win 54.8% ±4pts, blowout ≥21 16.1% ±3pts (`inbox/20261111-1506-muse-P-345-phase1-margin-gate.md`).
4. Z.ai conditional-moment λ gate — Var(points \| drives=N): 2023 REG N=10 → 8.28 (n=117), N=11 → 7.64 (n=136), unconditional 8.47 (`inbox/.../inbox/20261111-1638-zai-P-345-lambda-identification-by-conditioning.md`, p345_lambda_conditioning.json).
5. Glyph chain-length / drive-budgeted staging — PLAYLED gap is possession-budget/clock (7.49 plays/drive but 7.99 drives, −27.95% vs nflverse); stage micro-plays inside macro drive budgets (`inbox/20261111-1502-glyph-P-345-chain-length-budget.md`).
6. Z.ai gravity first measurement — top-WR deep-target share stable 30.4–33.5% across 2016–2025 (~1/3, a decade-long constant) (`inbox/.../inbox/20261111-1621-zai-P-345-gravity-first-measurement.md`, b2_gravity_index.json).

## Triage table

| # | Idea | Source | Disposition | Evidence / numbers | Open question |
|---|---|---|---|---|---|
| A | Sharper Phase 1 margin gate | MUSE (Q8) | **ADOPT into Phase 1 protocol** | Table in protocol note above; means recompute from P-344 CSV | Tolerances pooled over 10 seasons, not per-season |
| B | Conditional-SD λ validation gate | Z.ai (Q1) | **ADOPT into Phase 1 protocol** (check #6) | 2023 REG conditional SDs reproduced; n=572 vs 544 needs one-line explanation | Z.ai to explain n (572 vs 544 team-games) |
| C | Possession-budget Phase 1 checks | Glyph (Q2) | **ADOPT into Phase 1 protocol** | drives 11.09 ± 1.68, plays/drive 7.345, TOP/drive 163.7s, TOP/play 22.29s (P-344); PLAYLED 7.99 drives vs 11.09 target (−27.95%) | per-drive TOP trace not shipped; diagnosis from aggregates only |
| D | Gravity deep-target share (~1/3) | Z.ai (Q4) | **ADOPT as first formula-ready product stat** | stable 30.4–33.5% decade range; real WR1 deep volume 2.0–2.2/tg vs staged 12.4 over-concentrated | double_team flag needs charting data (PFF/SIS paid; NGS public only for Big-Data-Bowl windows) |
| E | λ identification from OVR-only data | MUSE + VL + Z.ai | **DEFER (cannot be done)** | β = λ·θ identifiable at most; λ and θ equivalent; DS D4 overstatement band reproduced (25–75%) | historical Madden→outcome join needed; Owner ruled it out (design-13d) |
| F | Margin-PMF GoF at λ = 0 | DS D2 / GLM F2 | **DEFER to Phase 2** | cannot pass at λ = 0; GoF moves to Phase 2 | — |
| G | Folds as product surface (recap/standings/counterfactual over event log) | P-345 Q9 | **ADOPT as Phase 1 product surface** | Phase 0 kernel already folds event log → GameResult/BoxScore; drive-budgeted staging (C) makes "game after play N" well-defined | exact play-event schema TBD (Architect Phase 1 schema choices) |
| H | C weight 200 (sport-football.json) vs 150 (engine slots) | P-341 / open | **NEEDS OWNER DECISION** | C>OG guard 9.0 under JSON vs 12.5 under engine weights; rolesurplus uses JSON, census uses engine slots | which base does the Owner mean |

## Design amendments (concrete changes to fold into P-342 Phase 1 spec)

1. **Phase 1 gate = the six-check protocol** (totals bar + margin SD + one-score + home win + blowout + conditional-SD). Replaces the scattered margin gate / conditional-moment / ~10% bar as separate filings. See the protocol note (`inbox/20261111-1810-vl-P-344-phase1-protocol-note.md`).
2. **Add possession-budget checks** to Phase 1 (drives/team-game, plays/drive, TOP/drive) so a model can hit points/yards while missing drive count — exactly the PLAYLED failure mode (−27.95% drives) the current bar would not catch.
3. **λ stays an Owner-visible dial**, freeze θ (DS D3), do not present dispersion-matching output as identified λ; validate only via held-out conditional-SD predictions (check B).
4. **Gravity enters as a measured stat first** (deep-target share ~1/3, check D), usable in advanced stats and as a candidate formula term once `double_team` / coverage data exists. Do not wire it into the flex formula until the schema flag lands.
5. **Folds are the Phase 1 product surface** (check G): recap, standings, stat leaders fold from the Phase 0 event log; drive-budgeted staging (check C) keeps replay/counterfactual "game after play N" consistent with the authoritative drive totals until cutover.

## What is intentionally NOT amended
- No change to protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS, the modelWeights/slotWinsPerOvr contract).
- No product/engine file touched — this is ideas + numbers only.
- No new data sourcing: everything above runs on the delivered P-344 files (or states exactly what is missing).

## Evidence label
VERIFIED (P-344 recomputation, lambda-ident.mjs output, margin-gate arithmetic, Glyph derived arithmetic from P-344 + totals_final.json) · REPORTED (DS D2/D3/D4, GLM F2/F4, MUSE two-gap band, Z.ai receipts from the P-346 delivery) · INFERRED (dispositions, the chain-length→possession-budget reframing, tolerance rationale)
