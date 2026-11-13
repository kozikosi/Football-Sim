SPEAKER: zai | ROLE: High Councillor, Executor of Z-post-blue and 67 Cakepanz; builder of the merged formula | TASK: λ objective — 0.20 or 0.40 | DATE: 2026-11-12T06:18:00Z
FOR: P-345

# The λ objective: 0.40 ships, 0.20 is reported — and the frontier the council is arguing about is mostly a units artefact

## 1. The recommendation, one sentence

**Ship λ = 0.40 as the default (with V3's per-slot min-collapse as the resolution of C>OG), keep λ = 0.20 dual-reported as the sensitivity column, and stop scoring the dial by raw-price mae against integer labels — the right product metrics are tier membership (the screen), owner-order fidelity (the board), and the Lab's OVR-equivalent gap (the physics), and all three prefer 0.40.**

I did not come to this from the council's filings; I came to it from running my own formula until it confessed. The rest of this filing is the confession, with every number reproducible from the two scripts shipped in this delivery.

## 2. The argument

### 2.1 What each objective does to my formula, mechanically (filing §1.2)

The two objectives do not differ in what the formula *knows* — same duty matrix, same measured E, same guard. They differ in **how far above the 9-cut ten specific raws sit**. The 11 rows the two objectives disagree on (V2, staged E — VERIFIED, this delivery):

| row | Owner | raw @0.2 | tier @0.2 | raw @0.4 | tier @0.4 | v_dst (measured dest value) |
|---|---|---|---|---|---|---|
| SS>RB | 12 | 8.20 | 6 | 9.20 | 12 | 0.613 (RB1) |
| RB>WR | 12 | 8.54 | 6 | 9.28 | 12 | 1.607 (WR1) |
| TE>WR | 12 | 8.42 | 6 | 9.04 | 12 | 1.607 (WR1) |
| TE>DT | 12 | 8.52 | 6 | 9.84 | 12 | 1.316 (DT1) |
| EDGE>SS | 12 | 7.24 | 6 | 9.48 | 12 | 0.789 (SS) |
| OLB>DIME | 12 | 8.82 | 6 | 10.14 | 12 | 0.131 (DIME) |
| FB>TE | **6 (Owner ruling)** | 3.92 | **2** | 4.74 | 6 | 0.618 (TE1) |
| WR>NICKEL | 6 | 3.22 | 2 | 4.04 | 6 | 0.261 (CB3) |
| OLB>NICKEL | 6 | 3.86 | 2 | 4.72 | 6 | 0.261 (CB3) |
| SS>FS | 2 | 0.94 | 0 | 1.08 | 2 | 0.789 (FS) |
| C>OG | **6 (Owner ruling)** | 12.50 | 12 | 12.50 | 12 | 1.000 (OG1) |

Row by row, as football and not as fit:

- **The six Owner-12 rows (SS>RB, RB>WR, TE>WR, TE>DT, EDGE>SS, OLB>DIME).** These are the "you cannot just slot a skill athlete there" rulings — a safety at RB needs CARRY 10 against HAVE 2, a WR at RB needs to pass-block and carry, a TE at DT is a goal-line stunt, not a player. The ability layer itself sees the gap: M (worst duty gap) alone is 7.2 on SS>RB. At 0.20 the accumulation term is discounted until the raw slips under the 9-cut and the board displays **6** — "mid-price move". That is not defensible football: the displayed integer tells the user a safety is half-price at running back. INFERRED (my judgment), but the mechanism is VERIFIED.
- **FB>TE (Owner 6, the ruling).** At 0.40 the formula returns 4.74 → 6, matching the ruling. At 0.20 it returns 3.92 → **2 — the shipped formula contradicts a standing Owner ruling on the board**, and specifically collapses FB>TE to the same displayed price as FB>RB (2.70 → 2). The ruling is scarcity, not the guard (guard value 18 is not used for FB; the exposure guard is 2.27 and silent under both objectives — the row is ability-dominated at both λ). This is the sharpest test case in the prompt, and it is not close: **0.40 respects the ruling, 0.20 overrides it.** VERIFIED.
- **FB>RB (Owner 2).** Respected at both objectives (2.70/3.30 → 2) — λ-robust, because the ability layer alone clears the 1-cut. VERIFIED.
- **C>OG (Owner 6).** Wrong at BOTH objectives under role-level V2 (12.50 → 12, guard-dominated, λ-free) and right at BOTH under V3's per-slot min-collapse (7.49 → 6). **The C>OG row has nothing to do with the objective** — it is bought by the per-slot collapse, which is why V3 is part of the recommendation. VERIFIED.
- **SS>FS (Owner 2).** At 0.20 the raw (0.94) slips under the 1-cut and the board shows 0 — a free move. At 0.40 it shows 2. Small, but the same direction: 0.20 lets near-cut rows bleed downward.

**Where 0.40's gaps are most distorted** (largest |raw − Owner|, V2@0.4): C>OG 12.50 (fixed by V3), TE>EDGE 17.92, QB>FS 17.08, RB>FS 15.72, RB>WR 9.28, TE>WR 9.04, SS>RB 9.20 — every one of them sits *inside the correct tier* except C>OG. At 0.40 the gaps are wrong by being **far above the integer labels**, not by being mis-ordered. That distinction is the whole filing; see 2.2.

**The mae decomposition — where 0.20's mae win actually comes from (VERIFIED, this delivery).** Splitting the 97 rows by where each objective lands:

| bucket | n | Σ|err| @0.4 | Σ|err| @0.2 |
|---|---|---|---|
| exact at BOTH objectives | 86 | 106.47 | 75.39 |
| exact only at 0.40 | 10 | 20.44 | 30.32 |
| exact only at 0.20 | 0 | — | — |
| exact at neither (C>OG under V2) | 1 | 6.50 | 6.50 |

Zero rows are rescued by 0.20. The entire mae advantage (1.375 → 1.157 staged-E; 1.311 → 1.076 C1 static-E — REPORTED, my C1 receipt) is earned on the **86 rows both objectives order correctly** — within-tier raw position, which the integer display never shows — while on the 10 rows 0.20 misorders it is *farther* from the Owner's price (3.03/row vs 2.04/row at 0.40), not closer. 0.20 does not buy accuracy where it matters; it buys proximity where nobody is looking, and pays in tier errors where everybody is.

### 2.2 The mae front is mostly a units artefact (new receipt, VERIFIED)

The Owner's labels are small integers (mean 5.71: twenty-one 0s, ten 2s, forty-three 6s, twenty-three 12s), so **raw-price mae against integer labels is not scale-invariant — it systematically rewards smaller raws**. Test: scale the 0.40 raws by a pure factor c (monotone, tier-preserving, changes no ordering and no football content):

| c | mae(c · raw@0.4) |
|---|---|
| 1.0 | 1.375 |
| 0.9 | **1.187** |
| 0.8 | 1.200 |
| 0.7 | 1.426 |

A 10% rescale — pure units — recovers 86% of the mae gap between the objectives (1.375 → 1.187 vs 0.20's 1.157), leaving a residual of 0.03. And the mechanism checks out: 0.20's raws are on average 11.9% smaller than 0.40's (5.63 vs 6.39) — the mae-optimal rescale of 0.40 (c = 0.9) is almost exactly the shrinkage 0.20 performs. **"0.20 measures gaps ~18% better" is, to first order, "0.20's raws are ~12% smaller and the labels are small."** This is why I say the council is arguing about a units artefact: the mae metric partially measures *how low the dial sits*, not how right the prices are. I am not proposing to ship a rescaled formula (a rescale detunes the raw scale the price-vs-Lab gate lives on — see 2.5); I am saying the metric cannot adjudicate the objective, and the council should stop letting it.

### 2.3 The draft-board test (VL's receipt — run it: filing §1.3)

Run both objectives through the board on held-out season E tables (2023, 2024, 2025 — Glyph's held-out convention; plus staged and decade-mean E for reference), all five scenarios, V2 form. VERIFIED, this delivery:

| scenario | strict inversions between 0.4 and 0.2 | ordering collapses (0.4 strict, 0.2 tie) | board-vs-Owner order errors, 0.4 | board-vs-Owner order errors, 0.2 | (of strict Owner pairs) |
|---|---|---|---|---|---|
| held-out 2023 | **0** | 516 | **23** | 305 | 3,245 |
| held-out 2024 | **0** | 516 | **23** | 305 | 3,245 |
| held-out 2025 | **0** | 572 | **43** | 368 | 3,245 |
| staged E | 0 | 516 | 23 | 305 | 3,245 |
| decade-mean E | 0 | 516 | 23 | 305 | 3,245 |

(a) **There are no strict inversions.** Not one pair of installs is displayed in opposite strict order by the two objectives. Every difference is a **collapse**: 0.20 flattens a strict order into a tie (516–572 pairs). The choice is not "which objective orders the board differently" — it is "how much ordering the board still shows." At 0.20 the board cannot distinguish 6 from 12 on the ten near-cut rows; the user sees "same price" where the Owner sees double.
(b) **Mean gap error on trades.** Raw mae (modeler metric): 1.305–1.325 at 0.40 vs 1.072–1.100 at 0.20 across held-out seasons — the C1 numbers reproduce on every held-out season. But the **visible** gap error (|displayed integer − Owner integer|): **0.062 at 0.40 (one row, C>OG under V2; 0.000 under V3) vs 0.577–0.639 at 0.20** — a 9–10× difference. Value-weighted by the destination slot's measured value (what a trade is actually buying): 0.086 vs 0.692 — the trade-screen error at 0.20 is **8×** the 0.40 error on the slots users actually trade.
(c) **Concentration — VL's guess, tested.** The guess was: inversions concentrated in rarely-seen slots (DIME, TE3, WR4), gap error in constantly-traded slots (RB1, WR2, TE1). **Half right, half inverted.** The gap-error mass IS concentrated on traded slots: the high-value bucket (v ≥ 1.0, 29 of 97 rows) holds 43–48% of the visible error sum at 0.20 (per-season VERIFIED). But the driver rows are NOT concentrated in rarely-seen slots: of the 11 rows that flip, only 3 are sub-package destinations (OLB>DIME, OLB>NICKEL, WR>NICKEL); 8 sit on core slots (WR1 ×2, DT1, SS, FS, RB1, TE1, OG1) — the SS>RB row displays "6" at 0.20, and that is a core-slot mispricing, not a DIME curiosity. The cost of 0.20 is not hiding in corners of the board the user never visits.

### 2.4 The ANOVA bridge (OR's verification — run it: filing §1.4)

DS's variance-components estimator, run exactly as specified on the P-344 file (all 5,522 team-games, 320 team-seasons, points season-demeaned), VERIFIED — reproduces DS's P-347 table to three decimals:

| quantity | mine | DS (REPORTED) |
|---|---|---|
| Var(team-season mean points) | 16.9547 (sample) | 16.955 |
| mean within-team game variance | 87.1484 | 87.148 |
| true between-team variance | 11.9044 (SD 3.4503) | 11.905 (SD 3.45) |
| n̄ | 17.256 | 17.26 |
| season-level dispersion overstatement | ×1.1934 | ×1.193 |
| game-level overstatement (within-var basis / total-var basis) | ×2.7057 / ×2.8988 | ×2.71 |
| per-season overstatement 2016 / 2020 / 2025 | 1.1601 / 1.2079 / 1.1986 | 1.160 / 1.208 / 1.199 |

(REG-only variant: between-variance 12.42, overstatement ×1.1931 — the decomposition is robust to the postseason; robustness column in the results JSON.)

λ̂ on stated rulers (interval = ±26%, the wide end of DS's D4 13–26% at n = 32 clusters): **27.34 [20.2, 34.5] points per team-z; 3.42 [2.53, 4.31] points per team-OVR point; 3.19 [2.36, 4.02] points per slot-win of team advantage.** Var(g) on the z-OVR ruler is computed by me from the engine's own ratings input and cross-checks VL's lambda-ident numbers exactly (Var(team mean OVR) 1.0512, Var(z_team) 0.016438 — his REPORTED, now my VERIFIED).

**And the verdict on OR's test: the bridge holds for the estimator, and cannot adjudicate the objective — because "λ̂ for both objectives" is not well-posed.** The ANOVA identifies ONE number: the between-team signal on the sim's ruler (β-space, points per unit of team strength). There are not two λ̂'s to compare — λ̂_40 and λ̂_20 would be the same computation on the same data, differing only if the *simulator's* team-strength spread were re-generated under each objective, and my lane does not run the play engine (Claude's, frozen). The price-formula λ is a dimensionless dial inside max(M + λ·S, E·G) on a different ruler from the ANOVA's points-per-unit-g; nothing maps one onto the other, which is precisely the non-identifiability VL proved and DS stated in P-347 §1 ("that is a display/steepness choice, not an identification question"). So: the ANOVA is confirmed as the analytic form of the Lab (same moment, model noise subtracted, ×1.19 season-level bias — and the ×2.7–2.9 game-level bias is the reason the game-level estimator must never be used), **and** the objective question is confirmed to live entirely at the display layer, where the data has no vote. The council's converged reading — λ is a dial — is now confirmed *by the estimator itself*. What the ANOVA does bind: Phase 2's gate. Between-team points variance = 11.9 (SD 3.45) is the number the play model must reproduce; if the fitted sim lands materially outside the interval above, the softmax/θ is wrong, per DS's falsification gate.

### 2.5 The physics anchor the council has not been using: the price-vs-Lab gate

The T6 pairs (my P-340 delivery, re-run VERIFIED this session): mean |price − Lab OVR-equivalent| — **4.68 at λ = 0.40, 5.34 at λ = 0.20** (Owner's own table: 6.07). The one metric in the project that prices gaps in *physical* units (OVR-equivalents from the two-gap Lab) prefers 0.40's raw scale. So the three usable metrics triangulate: tier membership prefers 0.40 (97/97 vs 87/97 under V3), owner-order fidelity prefers 0.40 (23–43 vs 305–368 wrong strict pairs), Lab physics prefers 0.40 (4.68 vs 5.34) — and raw-label mae, the one metric preferring 0.20, is the one shown in 2.2 to be scale-biased. I did not pick the metrics to flatter 0.40; the mae front was *the* front until I ran the rescale test on my own formula and watched most of it evaporate.

### 2.6 Out of sample: the "0.40 overfits" finding is an artefact of the refit rule (new receipt, VERIFIED)

MUSE's LOO refits λ per fold **by mean error** — that is the 0.20 objective's own fitting rule. Run the 0.40 objective's own rule (refit by exact tiers, tie-break mae — never previously run), MUSE protocol otherwise unchanged (19 roles, λ grid 0.00–1.00 step 0.05, 194 held-out cases):

| form + refit rule | held-out mae | held-out exact | per-unique-row | fitted λ across folds |
|---|---|---|---|---|
| V0 ability, mae-refit | 1.134 | 170/194 (87.6%) | **85/97** ← the prompt's "0.40 drops to 85/97" | 0.20–0.25 |
| V2 exposure, mae-refit | 1.157 | 172/194 (88.7%) | 86/97 | 0.20 in every fold |
| **V2 exposure, exact-refit** | 1.375 | **192/194 (99.0%)** | 96/97 | **0.40 in every fold** |
| V3min, mae-refit | 1.089 | 174/194 (89.7%) | 87/97 | 0.20–0.25 |
| **V3min, exact-refit** | 1.301 | **194/194 (100%)** | 97/97 | **0.40 in every fold** |

The two objectives are each **stable under their own refit rule** — mae-refit recovers 0.20 in every fold, exact-refit recovers 0.40 in every fold. The famous "0.40 drops to 85/97 out of sample" is what you get when you fit the dial with the *other* objective's rule and then score it on tiers: it is a statement about the mismatch of rule and metric, not about 0.40 overfitting. (Provenance receipt while I was in there: the "the guard damages FB/RB out of sample, 0.34 → 2.63" finding is the **V1 plain-guard** form — MUSE's LOO predates V2. The shipped V2 exposure guard repairs it exactly: FB-fold held-out mae 0.344, identical to ability-only. The prompt's guard-damage number is a receipt for a form that is no longer the shipped form.)

### 2.7 Portability — the basketball test (filing §1.5), answered honestly

Both objectives break; neither breaks less because of its λ value; and the objective question is therefore mostly orthogonal to portability. Mechanically: at 0.40 the guard leans on measured slot values, per-play exposure shares, and the 20× scale — all football-measured. Basketball has none of them (OR's three structural breaks: positions→roles, duty overlap, exposure→minutes×usage — REPORTED, his Q5). With no measured table the guard is not merely weaker, it is **silent** (E·G → 0), and the formula degrades to ability-only — which I have already watched happen inside football: the Q8 new-role pricing shows SS2 with no measured share getting guard-silent ability-only prices at the shipped λ (VERIFIED, this session's re-run). At 0.20 the ability layer dominates, but the duty matrix basketball would feed it is sketchy (2 of 12 duties per position specified — OR's review) and the 0.20 *value itself* is a dial fitted to the football table; porting it inherits a football-fitted number on a sketchy matrix. So: 0.40's failure mode is "no measurement to lean on → silently becomes the ability layer"; 0.20's failure mode is "sketchy authored matrix → prices linearly faithful to a possibly-wrong gap vector." Both real. The honest answer is that **what survives the port is the structure, not the objective**: the worst-gap-plus-accumulation shape, the tier cuts as display law, and DS's ruler principle — a new sport supplies its own measured values and its own E, and the dial is re-fit per sport to whatever ruler that sport's board uses (per-era re-fit is exactly what my C1 machinery already does for football eras). The objective choice does not change any of that. If anything, shipping 0.40 makes the portability contract *cleaner*, because it states plainly that the guard is a measured layer that goes silent without measurement, instead of pretending the dial's football-fitted value travels.

### 2.8 The third way (filing §1.6) — five candidates tested, four killed, one survives, and it is not a formula change

- **(a) V3 per-slot min-collapse at 0.20.** Buys exactly one row (C>OG, λ-free): 86 → 87 exact, mae 1.078. It does not change the frontier; it is already part of both operating points in my recommendation. VERIFIED.
- **(b) Role-family λ** (2 constants: OL-srcs {OT, OG, C} vs the rest; full grid 0.00–0.60 × 0.00–0.60 step 0.05, 169 cells). **Killed with receipt**: best cell (0.15, 0.40) gives 96 exact at mae 1.359 — a marginal 0.016 mae improvement over single-λ V2 @0.40 at the same exact count (1.375), and it still does not beat both operating points (no cell reaches exact ≥ 96 AND mae ≤ 1.076); **no cell** reaches exact ≥ 96 AND mae ≤ 1.076; nothing beats both operating points. The disagreements are not OL-structured: C>OG is guard-dominated (λ-free), the ten flips all want *higher* λ on skill srcs, and the OL rows are already exact at 0.40. A second constant buys nothing.
- **(b') Blend / sum shapes** (price = M + λS + t·E·G, t ∈ [0,1] × λ ∈ {0.2, 0.4}, 22 cells). **Killed with receipt**: the best cell is t = 0 (the blend family degenerates to ability-only at 0.40, 96 exact, mae 1.339); no cell beats both operating points. Summing the layers double-counts and never reaches the max form's exact count.
- **(b'') Tier-preserving recompression** (monotone within-tier remap of the raw scale toward the integer labels; tiers provably unchanged for all inputs). **Killed with receipt**: it *raises* mae (1.375 → 1.543 at 0.40) — the raws sit above the labels near interval tops, and any monotone map that pulls interval tops down pulls cut-adjacent rows up. Combined with the c-rescale result (2.2), the correct conclusion is subtler than "rescale and mae falls": *linear whole-scale moves help, tier-local maps cannot, and the whole game is a units artefact that the display never sees* — which is the argument for changing the metric, not the formula.
- **(c) Per-role choice of which layer binds.** **Killed with receipt**: the guard dominates only **7 of 97 rows at λ = 0.40** (5–11 across the ablation). There is no room for a per-role switch — the max() is already the minimal form of the per-role choice, and it is binding exactly where the Owner's rulings live (C>OG, the FB band).
- **(d) The surviving third way: the frontier dissolves at the screen, not in the formula.** The displayed integer is a monotone function of the tier; at 0.40 + V3 the display shows **zero** user-visible error (97/97, visible integer-gap error 0.000) and the out-of-sample LOO under its own rule shows 194/194 with display error 0. The mae that motivates 0.20 is computed on raws that never reach the user, against labels whose magnitude biases the metric (2.2), and the physics metric prefers 0.40 anyway (2.5). So the product does not have to choose *what the user sees* — it chooses what the modeler optimizes. My recommendation: **0.40 default, 0.20 dual-reported, and re-label the two columns honestly** — 0.40 = "the board column" (tier-true, order-true, Lab-true), 0.20 = "the sensitivity column" (what the prices look like with the accumulation discounted; the portability-review input). That is a change of *labeling and metric*, not of formula — and it is the version of "a display that shows both" (candidate c) that survives the numbers, because showing rank from one objective and gaps from the other is incoherent when the gaps the user sees ARE integers whose only truth is the tier.

### 2.9 The ablation mountain — why the middle is not a compromise

The λ ablation (V3min, VERIFIED): exact-count 87 / 90 / 92 / 93 / **97** / 92 / 88 at λ = 0.15 / 0.25 / 0.30 / 0.35 / **0.40** / 0.45 / 0.50; mae 1.098 / 1.097 / 1.137 / 1.214 / 1.301 / 1.408 / 1.523. The exact peak at 0.40 is a **narrow spike** (±0.05 costs 4–5 rows); the mae basin around 0.20 is **wide** (0.15–0.25 all within 0.02). The two objectives are the two *ends* of the dial's conditioning, and every intermediate λ (e.g. 0.30: 92 exact, mae 1.137) is Pareto-incomparable with both — worse exact than 0.40, worse mae than 0.20. A compromise λ buys neither property. If the Owner wants ordering on the board, the dial has one address; if he wants minimum raw error, it has another; nothing in between is a deal.

## 3. The receipts (reproducible, shipped)

1. **Draft-board inversion/gap table** — `zai_p345_draftboard_and_thirdway.py`, results `results_p345_draftboard.json`: five scenarios (held-out 2023/2024/2025, staged, decade-mean E), strict inversions / collapses / board-vs-owner errors, gap errors unweighted and value-weighted, flip rows by value bucket, the 11-row table, the mae decomposition, the display accounting, the LOO under both refit rules (V0/V2/V3min), the FB-fold provenance (0.344 / 2.63 / 0.344), the full third-way grid (E1–E6).
2. **ANOVA λ̂ table** — `zai_p345_anova_bridge.py`, results `results_p345_anova.json`: DS's decomposition reproduced (all-games and REG-only), λ̂ on three stated rulers with intervals, Var(g) cross-checked against VL's lambda-ident numbers, the scale-bias curve, the spread test.
3. **README.md** — how to re-run both scripts from this folder (inputs shipped: the live 99-rule table, the C1 measured E tables, the P-344 team-game file, the engine ratings input; the formula module as delivered, unmodified).

## 4. What changes in the shipped formula if the Owner picks this recommendation

Almost nothing moves in the code, and that is the point. The default stays λ = 0.40 with V3's per-slot min-collapse (already the merged form's shipped resolution); λ = 0.20 stays dual-reported, standing rule, until the Owner rules — my recommendation does not touch that bound, it argues for one side of it. What changes is *labeling and accounting*: (i) the 0.20 column is re-labeled the sensitivity column (the board column vs the sensitivity column), so the two numbers stop reading as rival fits; (ii) the council's fit tables gain a display-metric column (|displayed − owner| integer gap, plus owner-order fidelity count) beside raw mae, because raw mae against integer labels is scale-biased (2.2) and has been quietly adjudicating the objective question with a units artefact; (iii) the C>OG resolution is stated as part of the default (V3 min-collapse is λ-free and belongs to both objectives — it should stop being listed as a V3-only variant gain); (iv) nothing else: no gate, no floor, no per-player labels, no new constants (the third-way section killed every candidate that added one), the Owner's FB and C rulings untouched, read-only files untouched.

## 5. What I did NOT settle

- **The variance-budget decomposition Glyph asked for** (Claim 3 of his Q3): not attempted — it needs the play engine's residual variance by channel, which is Claude's frozen lane; my lane has no simulator to decompose. What I could and did add: the ANOVA's between/within split on real data (2.4) is the between-vs-within half of his budget on the real side, and the D4/D2 receipts already quantify the dispersion-matching bias — but the rating-responsive-vs-irreducible split on *simulated* folds remains open until Phase 1 emits events.
- **The conditional micro-moments fit** (Glyph's Claim 2): not attempted — it requires the Phase 1 event log (completion% by air-yards bucket, pressure→sack, INT by shell, YAC), which does not exist in my lane yet; my C2 receipt ships the *target table* (conditional SDs, holdout 2023–2025) but the micro-moment identification is Phase-1-blocked, exactly as Glyph's own protocol schedules it.
- **λ̂ under each objective's own simulated dispersion** (the literal reading of OR's test): not attempted — it needs the play engine to regenerate team-game outcomes under each objective; my lane runs the price formula only. I said so in 2.4 rather than approximating it with something that is not that test.
- **The near-cut structure under authored-matrix re-derivation**: my LOO, like MUSE's, holds the authored HAVE/NEED/W matrices fixed and refits only λ (the same caveat Inkling and MUSE stated); a fully blind matrix re-derivation is not mechanically feasible and remains open.

## Evidence labels (every claim above, in order of appearance)

VERIFIED (this delivery, reproducible from the shipped scripts): the 11-row table and all raw prices; the FB/C ruling rows under V2 and V3min at both λ; the mae decomposition; the display accounting; the scale-bias curve; the five draft-board scenarios (inversions, collapses, owner-order errors, weighted/unweighted gap errors, bucket concentrations); the LOO table under both refit rules including the 85/97 provenance and the FB-fold provenance; the third-way kills (E1–E6); the ablation mountain; DS's decomposition reproduced to three decimals on the P-344 file (all-games and REG-only); λ̂ and its intervals on three stated rulers; Var(g) matching VL's lambda-ident numbers; the price-vs-Lab gate numbers from my re-run of the delivered prototype. REPORTED: C1 static-E 96/97 @1.311 and 86/97 @1.076 (my own prior delivery, C1 receipt); MUSE's LOO 172/194, λ 0.20, FB 0.34→2.63 (his filing, reproduced here); VL's lambda-ident receipts (β non-identifiability, Var numbers — now cross-checked); OR's three basketball structural breaks; Glyph's protocol and variance-budget framing; DS's P-347 estimator, D4 intervals, and the ×1.193/×2.71 overstatements (reproduced). INFERRED (my judgment, argued not measured): the row-by-row football defensibility calls in 2.1; the "units artefact" reading of the mae front; the recommendation itself; the sensitivity-column relabeling; the portability degradation modes; the claim that the surviving third way is metric/labeling rather than formula. UNKNOWN: whether per-season ratings 2016–2025 exist in the Owner's possession (DS's blocker); whether a Phase 1 event log will carry the fields the micro-moment fit needs; what the play engine's simulated dispersion would be under each objective.
