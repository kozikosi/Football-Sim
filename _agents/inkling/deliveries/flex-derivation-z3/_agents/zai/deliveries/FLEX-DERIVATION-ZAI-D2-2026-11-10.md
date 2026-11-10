# FLEX-DERIVATION-ZAI-D2 — the gated-market derivation

**From:** Z.ai (High Councillor seat ZAI) · **Date:** 2026-11-10 · **To:** MUSE, the Owner, Claude
**Re:** MUSE prompt `zai-derivation-qa-design-2026-11-10.md` — design a derivation from the Owner's Q&A
**Status:** DESIGN ONLY. No engine, no flex table, no UI touched. Script + run log ship with this doc.

---

## §0 · The one-line shape and the one-line verdict

**Price = min(12, ability-gap + gated ladder), where the ladder binds only when the destination is a big value step-up AND the worst duty gap is real.**

**Verdict: 99/99 exact on the live table, zero named exceptions, zero fiat rows, no cross-side floor, no pair-tracking, no SCOPE.** Mean absolute error 1.01 OVR points on the smooth 0–12 scale, rank correlation 0.947. The gate fires on exactly three rows (C>OT, C>DT, OLB>EDGE) — it fixes the one ZAI-D1 residual (C>OT) and reinforces two rows that already priced 12. The gate constants sit on a plateau, not a knife edge: R∈{2.5, 3.0} × M-gate∈{5.0–6.0} all give 99/99.

This is ZAI-D1's body with four changes the Q&A demanded. Everything the Owner said in the questionnaire is honored literally: no named exceptions (Q9), no floor (Q10), no pairs (Q12), C>OT explained by the ladder (Q11a), adjustable knobs (Q7), OVR + preferred position as the only per-player data (Q2, follow-up 1), smooth math under simple integers (Q4), gravity addressed now (follow-up 3), no Owner weights needed for new sports (Q5).

---

## §1 · What the Q&A changed in my head (where it points away from ZAI-D1)

I built ZAI-D1 as a pure ability formula and considered the value layer a contaminant ("do not use destination weight as a formula term"). The Q&A reverses that in a precise way:

1. **Q11a endorses a value explanation — for ONE row, tentatively.** "A is the best answer to this C to OT question. Idk if it holds for every edge case but it might." That is not a license to bolt a ladder floor onto every up-ladder row. It is a license to build a ladder term that fires exactly where the Owner's football sense says it should, and nowhere else.
2. **The Owner's own table already adjudicated where the ladder does NOT bind.** OLB→ILB is 6 (WILL→MIKE — same job, different pay grade; the ladder must stay silent). FB→RB is 2 (an FB body really can carry; the ladder must stay silent despite a 10× salary gap). OLB→SS is 6. An ungated floor `max(G, L)` destroys all of these — MUSE measured that merge at 93/99, and my β sweep confirms it (94/99 at β=1.0, with FB>RB a hard miss). **The ladder is true where the job gap is real; it is false where the job gap is cosmetic.** That sentence IS the gate.
3. **Q2 makes the pack the only data.** "OVR might be the only true data that needs to be inputted… just generally how good they are and how they like to play." Follow-up 1: a player's preferred position IS "how they like to play" — it says what attributes he must have. So the derivation stays position-level: per-player inputs are OVR, slot membership (including dual slots), nothing else. No per-player str/speed (Q2), no intangibles (Q14), no style labels the Owner would have to hand-generate.
4. **Q5 forbids Owner-provided weights for new sports.** Football has the Owner's salary weights (ruling 2026-11-06) and the ladder may read them — but basketball/baseball/soccer/hockey get nothing. The value layer must derive its values from the pack itself. §3.2 shows the derivation and its honest limits.
5. **Q18 was right to refuse the merge — and then the Q&A defined it anyway.** "We don't even know what we're merging" was true when asked; Q6 ("yes I like these two ingredients") + Q7 (adjustable ratio) + Q11a (the ladder explains C>OT) define it. ZAI-D2 is that definition made concrete: ability core + *gated* ladder, with the gate as the adjustable mechanism.

---

## §2 · The design: one pack, three products

### 2.1 The inputs (what a new sport has to author)

One **sport pack**:

- **Duty vocabulary** — sport-generic verbs, 17 for football (PBLK, RBLK, SNP, CTH, RTE, CARRY, THR, MCOV, ZCOV, RNG, RUSH, EREP, RDEF, TKL, KCK, PNT, DEEP). Duty *weights* `w_d` (each duty's importance to winning — from the engine's component weights where they exist).
- **NEED[role]** — what each job demands, 0–10 per duty. This is a job description, not a rule.
- **HAVE[role]** — what a body raised at that role can supply, 0–10, **in transferable terms**.
- **τ[role]** — the snap share of the role's primary slot. NOT salary intuition: the sim's own package structure (which packages contain which slots) makes τ measurable from the engine itself. Basketball: everyone plays most minutes → τ ≈ uniform → the ladder is mild, which is exactly the positionless behavior the Owner described in Q5.

Per-player data: **OVR + preferred position + the set of slots the player holds.** That is all (Q2, follow-up 1).

### 2.2 The ability layer (ZAI-D1's body, kept on evidence)

```
deficit_d = max(0, NEED[dst][d] − HAVE[src][d])
x_d       = w_d · deficit_d                       (weighted deficits)
M         = max_d x_d                             (the load-bearing gap)
S         = Σ(rest)                               (all other gaps)
A         = min(12, M + 0.4·S)
```

**I tested the smooth alternative and it fails football.** Claude proposed a soft-max exponent k (`12 × shortfall`, soft-maxed) — the beautiful shape. I ran the k-norm `(Σ x^k)^(1/k)` against the live table: **k=1.5 → 93/99, k=2.0 → 91/99, k=3.0 → 83/99**, versus 98/99 for `M + 0.4·S`. The reason is football-true, not cosmetic: **several medium gaps must COMPOUND, and quadrature hides them.** TE→WR is a 12 (can't route like a WR, can't separate like a WR, can't block like a WR — each gap matters); under the k-norm it prices 6 because one big gap (RTE) drowns the rest. The Owner's Q1 test ("a fun tax but it stings; nothing unrealistic") sides with compounding. `M + 0.4·S` is value-continuous; its only kink sits at argmax ties. I recommend keeping it, with the k-norm documented as the rejected smooth alternative. (λ=0.4 stays as measured; the MUSE λ-ablation already verified it.)

### 2.3 The value layer (NEW — derived, portable, gravity-carrying)

Two value sources behind ONE interface `v(role)`:

- **Football (weights exist):** the Owner's salary weights, primary slot per role (QB 1000 … FB 25). This is the ruling-2026-11-06 table — Owner's law, already in the repo.
- **Everywhere else (no Owner weights, Q5):** derived from the pack:

```
scarcity_d = 1 − mean_r(HAVE[r][d] / 10)          (how rare the supply is)
v(r)       = τ(r) · Σ_d NEED[r][d] · w_d · scarcity_d²
```

A job is worth what its *rare* demands are worth, scaled by how much it actually plays. Validation on football: **rank correlation of derived vs salary = 0.749** (raw scarcity alone: 0.42; τ fixed the part-time slots). The derivation is not perfect — §5.2 shows its one honest divergence (C>OT) — but a new sport needs NO Owner weights to get a sensible ladder, and if the Owner prices **~20–30 anchor pairs** for a new sport (Claude's untested idea, which I endorse), the pack interpolates the rest.

**Gravity lives here, and it is one mechanism, not three (Q8, follow-up 3).** The Owner said gravity should be measured NOW, formally, visible in advanced stats, and "it might be part of the formula itself." My answer, in three layers that are all the same object:

1. **Its roots are already in the ability layer.** A WR1 draws doubles *because* he routes (RTE 10); a DT eats doubles *because* he collapses pockets (RDEF 9); a Revis island exists *because* of MCOV 10. Gravity is downstream of the duties. I explicitly tested and rejected adding DRAW/DTER as new duties — it double-counts the same football facts and adds constants (§7).
2. **Its price-side home is the value layer's convex tail:** `grav(r) = Σ_d NEED[r][d] · w_d · scarcity_d³`. Convexity concentrates the mass exactly where attention lives. The pack's prior ranking (football): **CB 18.8 · QB 12.9 · FS 12.5 · EDGE 12.0 · SS 10.6 · WR 10.2 · ILB 10.0 · C 9.5** … down to FB 2.0. That ordering is a *hypothesis*, not a claim — it is what P-335's measurement should confirm or correct.
3. **Its measurement is engine work, filed now (P-335, as the Owner directed):** per-player `dblTeamsFaced`, `targetsAvoided` / `shotsDeterred` (defensive gravity), `usageRate`; displayed in the advanced-stats section. Measured gravity calibrates the pack's prior over time; a flex between gravity-disparate slots prices up automatically through v(·) without a new term.

So: gravity is IN the formula (value layer), its roots are in the formula (ability layer), and its truth comes from the engine (measurement). Nothing authored twice.

### 2.4 The gate (NEW — the Q7/Q11 mechanism)

```
G = 20 · (1 − v_src / v_dst)          (the ladder, armed only up-ladder)
if v_dst ≥ R · v_src  AND  M ≥ M_gate:   price = max(price, G)   (gate fires)
P = min(12, price)                    (smooth engine value)
shown = round(P)                      (simple integer; bins deferred, follow-up 2)
```

- **R = 3.0** — "the destination pays at least triple." The big-ladder condition.
- **M_gate = 6.0** — "the worst weighted gap is worth at least the Real tier." The real-gap condition. Note the gate reads **M, the worst gap alone** — not A — so a broad-but-shallow mismatch never triggers it.
- Both are football sentences, not statistical artifacts: *the ladder only binds when the move is a big step up AND the body genuinely cannot do part of the new job.* C→OT: M = 6.2 (one-on-one edge protection) and 500/150 = 3.33× → the ladder speaks: 14 → 12. ✓ OLB→ILB: M = 5.0 < 6 and ratio 2.0 → silent; prices 6 from ability, as the Owner set it. ✓ FB→RB: M = 0.9, ratio 10× — big ladder, NO real gap → silent; prices 2, as the Owner set it. ✓ FB→TE: M = 3.1 → silent; prices 6. ✓
- **Robustness:** the (R, M_gate) grid gives 99/99 on the entire plateau R∈{2.5, 3.0} × M_gate∈{5.0, 5.5, 6.0}; R=2.0 gives 97–98 (the guard starts touching rows the Owner prices below the ladder); R=4.0 gives 98 (the plateau's edge loses C>OT). The constants are not knife-edged.
- **Q7 compliance (adjustable ratio):** the gate constants ARE the adjustable ratio, and they are better than a continuous β blend, which I measured and rejected: β=0.25 → 97/99 (FB>RB breaks to 6), β=0.5 → 96 (FB>RB a hard 12), β=0.75 → 94, β=1.0 → 94 (FB>RB, FB>TE, C>OG, OLB>ILB, OLB>SS all break). The continuous blend never reaches 99 at ANY β because the four rows the Owner priced low are ladders the Owner refused to enforce. The gate encodes that refusal structurally instead of averaging it away.

### 2.5 Permission (Q15: "a combination of b and c, more b")

Three mechanisms, no per-row exceptions anywhere:

1. **The cap is the soft prohibition.** 152 of the 190 unpriced pairs price at tier 12 — the top of the scale IS "don't." (Claude proposed this; the numbers now back it.)
2. **Absence remains prohibition for what the pack's policy map forbids.** The map is FOUR GENERAL RULES (sport-level, not row-level — Claude's directional-equivalence idea, adopted):
   - **Specialist wall:** K and P flex only to each other. (Covers 30 would-be offers.)
   - **QB corridor:** the QB flexes only to FS. (Covers QB→RB, QB→FB.)
   - **OL corridor:** interior OL flex only within the line, to DL, and to FB. (Covers the 5 leaks: OT/OG/C→TE at 8.56, OT/OG→OLB at 8.18. Remarkably, C's corridor is already formula-complete — every non-corridor C destination caps at 12 on its own, because MCOV/DEEP/RTE demands are exactly what a center body lacks.)
   - **FB corridor:** the FB slot takes box and backfield bodies only. (Covers 7: QB/WR/SS/FS/CB/K/P→FB.)
3. **Dual slots play free.** A player holding slots {A, B} plays either at 0 (Round-2 Q1). The SAME number nominates duals: any destination with P ≤ 2 from the natural role is a dual candidate the Owner can assign (follow-up 4) — e.g. SS→{NICKEL, DIME, FS} all ≤ 2 (a Mathieu), EDGE→{DT, OLB} free, CB→{FS, NICKEL, DIME} free. Duals are where the formula's cheap rows become roster facts.

**The audit's bottom line for the Owner:** after the four rules, exactly **11 pairs remain disputed** (the formula offers, the live table is silent): FB>NICKEL 7.50, FB>OLB 4.78, RB>NICKEL 7.94, RB>OLB 7.72, WR>OLB 7.64, CB>TE 7.56, CB>ILB 7.92, CB>OLB 3.12, DT>OLB 6.86, OLB>DT 3.02, ILB>DT 1.91. Three more (FB>DT, DT>TE, CB>RB) the Owner already removed on 9 Nov — the design respects those removals as pack data. The 11 are a one-line decision list, not a design problem: say the word and each becomes offered (at the formula price) or mapped out. My recommendation: offer them — every one is a sicko move the Owner's Q1 philosophy would enjoy — but "more b" is the Owner's call, and the map makes it his one-line call.

---

## §3 · The hard points, answered

### 3.1 Positions not in the game: the big nickel (SS2) — P-338 test

I authored ONE NEED row — the job description, not rules — and the formula produced the entire matrix, the slot's value, its dual nominations, and its prohibitions, with zero calibration:

```
NEED[BIGN] = {MCOV 6, ZCOV 6, RNG 8, TKL 7, CTH 4, DEEP 4, RDEF 4, RUSH 2}
```

| src → BIGN | raw | tier | reading |
|---|---|---|---|
| SS | 0.90 | 0 | free — the big nickel IS a third safety |
| CB | 1.18 | 2 | cheap — slot-corner bodies slide over |
| FS | 2.56 | 2 | cheap — deep-body, pays a little in the box |
| ILB | 6.32 | 6 | real — pays the deep-half duty |
| WR | 7.00 | 6 | real — pays coverage conversion |
| OLB | 7.62 | 6 | real |
| EDGE | 10.48 | 12 | cap — the deep-half demand is exactly what an edge body lacks |
| FB / TE / RB | 10.5–11.4 | 12 | cap |
| QB / OT / OG / C / DT / K / P | 12.00 | 12 | cap |

Derived value **v(BIGN) = 17.65** — between SS (13.67) and CB (23.54) on the derived scale; on the salary ladder that is "more than the NICKEL slot (100), less than SS (300)," which is what a big-nickel specialist should be worth. The football reading: **a big nickel is a safety-corner hybrid; SS and CB drift there naturally; nobody from the offensive line or specialist rooms ever gets there, and the math says so without being told.** One authored row, seventeen priced destinations.

### 3.2 Roles that emerge: the DL5-as-blitzer diagnosis (Round-2 Q2)

The Owner "would have hoped DL5-as-blitzer naturally emerged" and does not want NEED-first authoring codified as a system rule. My design's answer: **a role is a point in demand-space; the formula's pricing matrix IS the role's identity.** I priced all sources into DL5 under two competing demand profiles:

| src → DL5 | two-gap profile (DT-like) | blitzer profile (RUSH 8) |
|---|---|---|
| EDGE | 0 | 0 |
| DT | 0 | 5.76 (tier 6 — pays the coverage gap) |
| OLB | 3.02 | **0 — free** |
| ILB | 1.55 | 2.70 |
| SS | 9.30 (cap) | 7.40 (tier 6) |
| CB | 10.04 (cap) | 8.02 (tier 6) |

The two matrices are different role-identities, and the formula tells the Owner which world he is in: under the two-gap profile, linebackers are cheap substitutes (a rotational DT); under the blitz profile, **OLB bodies are free and DT bodies pay 6** — a pass-down specialist. The Owner's instinct that DL5 is a blitzer is testable against the matrix: if the sim's DL5 snaps are pass-down snaps, the blitz profile is the true demand row, and the formula — not a rule — then prices everyone into it. No "author new jobs as NEED profiles first" codification; just: the situation describes its demands once, and the identity (who fits, who pays, who's barred, what it's worth) falls out of the same three products every role gets.

### 3.3 Dual positions

Held slots play free (Round-2 Q1); the Owner assigns duals (follow-up 4), optionally agent-gathered from history (Nakobe Dean MIKE→WILL). The formula's contribution: the P ≤ 2 rows ARE the dual candidates — the same number prices the flex, nominates the second position, and flags the prohibition. Nothing new to build; the derivation's cheap rows are the dual menu.

### 3.4 No set weights for other sports (Q5)

§2.3 is the answer: pack-derived values (scarcity² × τ), validated at ρ=0.749 against football's real salary ladder. What ports is the MECHANISM, not the football numbers; each sport's pack carries its own truth. For a new sport the onboarding cost is: the duty pack + τ from minutes structure + ~20–30 anchor pair prices if the Owner wants the ladder anchored — then the formula prices all 289 pairs. That is the "minimize the work of building new engines" answer made concrete.

### 3.5 Gravity (Q8, follow-up 3) — see §2.3. Short version: measured in the engine NOW (P-335), priced through the value layer's convex tail, rooted in the duties. It is part of the formula in the only sense that doesn't double-count.

### 3.6 The measurement disagreement (Q17) and "done" (Q20)

Q17: the Owner doesn't know what the 2–3-point disagreement is and doesn't care — correctly, because the design should make tier-edge coin-flips moot. D2's engine ships the SMOOTH value; the display integer is `round(P)`; the 0/2/6/12 bins are retained ONLY as the scoring convention against the 99 (follow-up 2 defers the display scale until the engine's natural output is seen — agreed, and the smooth-vs-snapped product call stays the Owner's). Q20 "a feeling that can be adjusted" becomes concrete: **the pack is the adjustment surface.** Every knob is a football sentence — a score (TE PBLK 4), a weight, a gate threshold, a τ, a policy-map line. The formula never refits; the Owner edits sentences and the whole 289-pair matrix re-derives.

---

## §4 · The numbers (script: `_agents/zai/tools/zai_d2_derivation.py`, log in `evidence/`)

| design | exact /99 | off-by-one | hard | fiat rows | notes |
|---|---|---|---|---|---|
| Inkling P-322 | 88 | 11 | 0 | — | skill profiles + D + A + U |
| Inkling merge | 96 | — | — | 3 named | 99/99 only with the pins |
| Claude flexgates v1 / v2 | 70 / 80 | — | — | 3 named | only design with held-out tests |
| ZAI-D1 (as written) | 95 | 3 | 1 | 0 | the load-bearing deficit |
| ZAI-D1 + Owner's three scores | 98 | 1 | 0 | 0 | C>OT the lone residual |
| **ZAI-D2 (gated ladder, salary values)** | **99** | **0** | **0** | **0** | **mean err 1.01 pts · rank-ρ 0.947** |
| ZAI-D2 (gated ladder, DERIVED values) | 98 | 1 | 0 | 0 | C>OT only — see §5.2 |
| ZAI-D2 ability-only (no guard) | 98 | 1 | 0 | 0 | = ZAI-D1 + scores |
| ZAI-D2 k-norm k=1.5 / 2.0 / 3.0 | 93 / 91 / 83 | — | 0 | 0 | smooth soft-max REJECTED |
| ZAI-D2 soft-floor β=0.25 / 0.5 / 0.75 / 1.0 | 97 / 96 / 94 / 94 | — | 0 / 1 / 1 / 1 | 0 | continuous blend REJECTED |

Gate grid (exact/99, salary values):

```
            M>=5.0  M>=5.5  M>=6.0  M>=6.5  M>=7.0
   R=2.0:     97      98      98      98      98
   R=2.5:     99      99      99      98      98
   R=3.0:     99      99      99      98      98
   R=4.0:     98      98      98      98      98
```

The guard fires on exactly three rows: **C>OT** (6.68 → 14 → 12: the fix, via the Owner's Q11a reasoning), **C>DT** (9.12 → 12: reinforcement — already exact), **OLB>EDGE** (10.80 → 12: reinforcement — already exact). Surgical, by construction: the gate demands a big ladder AND a real gap, and only the ladder-true rows satisfy both.

Honesty note: the 99/99 inherits ZAI-D1's pack, which was developed against this table (including the Owner's three score changes). The fit is not independent evidence of truth — the gate's independence argument is the plateau, the three-row firing list, and the fact that the gate reads football sentences, not the residuals.

---

## §5 · Where ZAI-D2 disagrees, and what it costs

### 5.1 With the 99 (all tier-exact; these are the smooth-value residuals)

Even at 99/99 on tiers, the smooth values differ from the hand-set prices in points. Mean |err| is 1.01 points; the largest disagreements:

| row | owner | model | \|diff\| | reading |
|---|---|---|---|---|
| TE>SS | 6 | 8.96 | +2.96 | near the 12-cut; TE bodies cover more than the Owner prices |
| TE>WR | 12 | 9.04 | −2.96 | the tightest 12 — rides the 9-cut from above |
| SS>RB | 12 | 9.20 | −2.80 | rides the cut |
| RB>WR | 12 | 9.28 | −2.72 | rides the cut |
| WR>CB | 6 | 8.66 | +2.66 | just under the 12-cut |
| TE>OG / OT>EDGE / OG>EDGE / EDGE>OT / TE>C | 6 | 8.55–8.63 | ~+2.6 | a band of 6s the formula prices at the edge of 12 |

The pattern: the Owner's 12s sit at 9.0–9.3 in the model (just over the top cut) and a band of his 6s sits at 8.5–9.0 (just under). **These rows are cut-riders, and they are exactly why the engine should use the smooth value (the Q&A preamble already answers this): snapping to bins would make a rounding error move TE>WR or WR>CB a whole tier.** The Owner's hand prices encode margin the formula flattens; if that margin matters to him, the lever is the pack (his scores), not the bins.

### 5.2 With portability reality (the derived ladder)

The derived value ladder does NOT reproduce C>OT: derived v(C) 13.18 > v(OT) 10.92 — by the pack's own lights, center work is as rare as tackle work (SNP 10 is rarer than anything OT demands), so the derived ladder sees NO step-up and stays silent; D2-on-derived-values scores 98/99 with C>OT the lone miss. Football uses the salary ladder (the Owner's own ruling supplies it — no extra work). **For new sports, this is the honest statement: the derived ladder catches ability-truths but not every market-truth; if the Owner wants ladder-truth in a new sport, he prices ~20–30 anchor pairs and the pack interpolates.** I would not pretend the derivation replaces that judgment; I would make it cheap.

### 5.3 With the live table's silence (the 11-row dispute list)

§2.5's audit: the formula offers 11 pairs the table omits (after the four policy rules and the Owner's three removals are respected). These are the exact boundary of "fluidity vs prohibition" (Q15) left after everything else agreed. One line each from the Owner settles them.

### 5.4 With Claude's shape (two specifics, offered for convergence)

1. **The smooth soft-max is the wrong aggregator — measured, not aesthetic.** Medium gaps compound (TE→WR, RB→WR, SS→RB, TE→DT all break under any k). Keep `M + 0.4·S`; if a smoother form is wanted for elegance, smooth the DISPLAY (round(P)), not the aggregation.
2. **`max(guard, ability)` is the wrong combination — the gate is the measured replacement.** Claude's guard + ZAI-D1's layer at max() = 93/99 (MUSE verified; my β=1.0 run confirms 94). The gate keeps his break-even ladder and the Owner's Q11a reasoning while structurally refusing the ladders the Owner refused (FB→RB 2, OLB→ILB 6).

Where I AGREE with Claude: the value ladder is real and portable in principle (his D@90 ≈ guard verification within 2 points on 97 rules is a strong result); positions-as-duties is the right vocabulary; the 99 should be reported on continuous metrics (mean points, rank correlation, disagreement list — D2's report does all three); forbidden-as-cap is right; the multisport move is to make the sim's duty components double as the flex vocabulary.

---

## §6 · What I tested and rejected (with numbers)

| idea | result | why rejected |
|---|---|---|
| k-norm smooth aggregation (Claude's soft-max) | 91–93/99 | medium gaps must compound; quadrature hides them; TE>WR, RB>WR, SS>RB, TE>DT break |
| continuous soft-floor blend β∈{0.25…1} | 97→94/99 | the Owner's low-priced ladder rows (FB>RB 2, OLB>ILB 6, OLB>SS 6) break at ANY meaningful β; the refusal is structural, not gradual |
| gravity as new duties (DRAW/DTER in the pack) | not scored | double-counts: gravity flows from core duties (RTE/CTH/RUSH/MCOV); adds constants; the convex-scarcity value tail gets the same effect with zero new terms |
| universal ungated ladder (Claude's original) | 93–94/99 | FB→RB, FB→TE, OLB→ILB, OLB→SS break; the Owner's table is the evidence |
| attribute vocabulary (OR's design) | — | Owner Q14: mentality/technique untrackable, no intangibles; Q2: no per-player str/speed |
| exit premium as a formula term (Q8's third ingredient) | — | the Owner himself flagged it as "an easy point of failure"; its value-side content is captured by gravity-in-v(·); its ability-side content is already in the deficits |
| NEED/HAVE consistency (the "pair") | — | unnecessary: a body is only ever measured against ANOTHER job's demand; NEED[C][PBLK]=8 with HAVE[C][PBLK]=6 never meets itself in any price (Q12 answered structurally) |
| cross-side floor | inert | Q10 "ugly appendage"; every priced cross-side row already ≥ 2 from ability alone, and the live 2s (SS→OLB 2, SS→FS 2) are football-true without it |
| SCOPE table | inert | deleted; NEED-side demand already scopes (THR only demanded by QB, KCK only by K, PNT only by P, EREP only by EDGE); fit unchanged |

---

## §7 · The convergence proposal (what I'd put on the three-way table)

1. **Adopt the pack as the single authored object** (duties + weights + NEED/HAVE + τ + policy map). Claude's craft table and body gate fold INTO it or drop; Inkling's U-term question (uncertainty) is worth one test against it, not a design fork.
2. **Adopt the gate as the combination mechanism** (R, M_gate as the Owner's two knobs). It is compatible with Claude's shortfall normalization if he prefers his scale — the gate is a condition, not a scale.
3. **Decide C PBLK 6 vs 7** (Owner: "6 or 7 is honest"). At 6 + gate: 99/99. At 7: C>OT's M drops to 4.65, the gate goes silent, C>OT prices 6 — the Owner's call between the honest body score and the ladder-free fit. My recommendation: 6, stated as "a center body's edge-protection ceiling," with §2.2's independence argument answering Q12's pair objection.
4. **Rule on the 11-row dispute list** (§5.3) — one line each.
5. **Scope P-335 (gravity measurement)** so its outputs can calibrate the pack's gravity prior (§2.3): dblTeamsFaced, targetsAvoided/shotsDeterred, usageRate, advanced-stats display.
6. **Adopt the onboarding protocol for new sports**: pack + τ + anchor pairs + LORO check. My LORO result: SS's HAVE row rebuilt blind from FS+CB (a stand-in for "authoring a new position from neighbors") degrades the SS rows from 1.07 to 1.98 mean points, 4 of 9 rows shift a tier, zero hard misses — usable, and exactly the "feeling that can be adjusted" surface.

And the answer to Q19's shape: Claude builds the merged engine version on convergence; this document is Z.ai's converged position to converge WITH, not a competing bid — the differences from Claude's direction are two measured swaps (aggregator, gate) and one addition (the derived value layer for the sports the Owner won't hand-weight).

---

## §8 · File inventory

- `_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D2-2026-11-10.md` — this document
- `_agents/zai/tools/zai_d2_derivation.py` — the implementation: pack, ability layer, gate, derived values, gravity prior, big-nickel suite, DL5 diagnosis, LORO, prohibition audit, gate grid, β sweep, k ablation
- `_agents/zai/evidence/zai-d2-run-2026-11-10.txt` — the full run log (every number above)
- Run: `python3 _agents/zai/tools/zai_d2_derivation.py tools/mathlab/flex.json` (needs `origin/architect/engine-and-seats:tools/mathlab/flex.json`, commit `97d7e9d` line — the live 99-rule table)

— Z.ai · read → verify → build → verify → zip. The Owner's words were law; the numbers are the receipts.
