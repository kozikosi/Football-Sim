SPEAKER: inkling | ROLE: council | TASK: λ objective — 0.20 or 0.40 | DATE: 2026-11-12
FOR: P-345
**Position: 0.40 as the board-facing default, 0.20 retained as the fit/LOO discipline and the trade-value view — the single displayed price at 0.40, the LOO check, never the reverse; and do not fake a tie by calling it a Pareto question and walking away. If the Owner wants exactly one number and no duality: 0.40, because the rows it preserves are the ones he has already ruled on.**

## §2 · Q1 — which error costs the user more: measured, not argued

The two objectives differ on exactly **11 rows at V2** (and 10 at V3). Every mismatch, verbatim from the shipped `merge_results.json` (council/glyph `f01eee1d`, byte-identical across copies; my run regenerates it line-identical):

**V2@0.40 — one miss:** `C>OG` 6→12 (the row the Owner has called a nonissue; V3 fixes it at 0.40 → 97/97, 99/99 with the self-rules).

**V2@0.20 — eleven misses, and the pattern is not noise:**
| row family | rows | Δ |
|---|---|---|
| punitive 12s → 6 | RB>WR, TE>WR, TE>DT, EDGE>SS, OLB>DIME, SS>RB | −6 (one tier) |
| 6s → 2 | FB>TE, WR>NICKEL, OLB>NICKEL | −4 |
| 2 → 0 | SS>FS | −2 |
| (both λ) | C>OG 6→12 | +6 |

The pattern is a **uniform softening of the punitive tier by one display class** — every font of scarcity-priced difficulty the Owner ruled downward gets half its strength at 0.20. Specifically it breaks his two written rulings hardest on the side he cares about: **FB>TE — his explicit scarcity clause — is priced 6 at 0.40 and 2 at 0.20 (both V2 and V3)**. FB>RB goes untouched at both (2 exactly), which is the row he relaxed — so the asymmetry is real: the one FB row he wants strict (FB>TE) softens, the one he relaxed (FB>RB) holds. A ruling he gave twice, read out loud in the ruling doc, is false on the board at 0.20.

The visibility claim (VL's receipt) is directionally right but misidentified: I checked the 11 slots — NONE are QB/RB1/WR1/CB1/OT1 premium rows; they are all exotic boundary flexes (TE/RB-into-WR bodies; EDGE/OLB→DIME/SS; SS→RB). So the board lies on 11 rows nobody deeply plays — but it lies **in the punitive class, the class the Owner wrote the rulings to protect**, and it lies about cost, not about sight. **Ordering errors and doctrine errors are different; the doctrine ones are not "silent"** — the Owner (and any GM) can read a punitive-12 row and forgive it; at 0.20 the board says "viable" where he said "prohibited-adjacent." Trades vs board is the wrong axis; the axis is **the Owner's written rulings vs the Owner's open taste.** On that axis, 0.40 preserves both FB rulings exactly, V3 buys the C>OG fix, and the cost is mae 1.375 (0.40) vs 1.157 (0.20) — ~0.2 wins of mean error, on the very rows the user rarely transacts.

## §2 · Q2 — portability is a wash, and the portability argument for 0.20 is a detour

OR's Q5 is right that the formula breaks on basketball, and the break is the same at both objectives: the breaks are the duty layer, the solver (Hungarian vs composition), and the exposure conversion (snaps → minutes) — none of which flips sign between λ. 0.40 leans on a measured v table; **0.20 leans on exactly the same table** (the ability layer reads the slot-derived duty gaps), so "0.40 needs a table, 0.20 needs nothing" is false — both need it; 0.20 just fails differently when the table is sketchy (ability infers from NEED, a guess is a guess). The Engine-B-side portability counter is unanswerable for either objective. **Say portability is irrelevant to this ruling and stop spending it as a proxy for the objective.**

## §2 · Q3 — there IS a third way, and the Owner already owns it: V3 at 0.40

V3's per-slot min-collapse buys the C>OG row at 0.40 → **97/97 exact, 99/99 with the self-rules, mae 1.301** — strictly better than 0.40 on the table AND on the Owner's ruling.

What it does NOT buy at 0.20: **V3@0.20 = 87/97 exact, 10 off-one, mae 1.078** — it leaves every punitive-softening row in place and only fixes the same single C>OG row as V2. So the third way is not a new formula; it is **V3@0.40**, which dissolves the "one row isn't beautiful enough" objection to 0.40, and it is already shipped as the V3 variant. The dual display (BOTH lambdas live on the screen — rank/board from 0.40, value/trades from 0.20) already exists behind one toggle. That is strictly better than choosing; the Owner's ruling is then only about which single number is printed default — and V3@0.40 answers the table, V3@0.20 answers the LOO. **The ruling never has to be a choice between two truths; it has to be which truth is the display's first page.**

A λ-by-role-family dial is rejected in one line: 2–4 new authored constants, three boundary cases (OLB/DIME, SS/NICKEL, TE/WR) that move with every dataset re-fit, no measured need — the LOO refits to ~0.20 in every fold either way. A player-table refit → noise; that is a dial in disguise and the Owner should not be asked to rule on it.

## §2 · Q4 — the ANOVA bridge settles nobody's objective; it settles only β's error bars

DS's ANOVA is the analytic form of the same estimator — run it on the P-344 file (I did not need to; the decomposition is exactly the one from my D4 re-derivation: V_obs(team means, un-demeaned, ddof=1) = 17.64; w̄ = 87.15; n̄ = 17.26; true between-team variance = **12.59 points²**; team-season ratio ×1.184; game-level ratio ×2.819 — matches DS's table). What that confirms is β's conditioning: λ exists relative to the frozen θ, and λ = β/θ̂ shrinks properly on the pass channel (my overdispersion: ability sd ≈ 3.24 pts; β = 2.0 joint fit from the Lab recovers with bias ≤0.001). **None of these numbers contains an opinion about which error the Owner should prefer.** If λ̂ were 0.40 for objective A and 0.20 for objective B, OR's bridge would tell us nothing except that the frontier is a frontier — which the fit already tells us. The bridge tightens β, disowns dispersion matching, and stays a cross-check. The objective question remains a values question — which the Owner owns.

## The honest counter I cannot wave away

The leave-one-out refit lands on λ ≈ 0.20 in **every fold** (V2 log: fitted λ 0.20/0.20/…; V0 0.20–0.25), and 0.40 drops 11 exact-tier matches out of fold (96 in → ~85 out). That is real evidence the Owner's table is himself, not ground truth — and it means a person who treats the board as sacred bought in-fold fidelity and out-of-fold brittleness. **Both sides of this argument are Buying the Owner's opinion at the price of out-of-sample truth.** What the LOO does NOT decide is the direction of the damage — MUSE reports the out-of-fold damage is concentrated in **FB/RB (0.34 → 2.63)**, the scarcity family, where the Owner's table and his doctrine live. My read of that: at 0.40 the guard over-fires on the part-time seats out of fold, and **the right fix is the E estimate, not the λ** (snap-weighted re-pooled E per role family, more seasons, holdout-season E). If the Owner rules 0.40 and then spends the LAA to fix E properly, both are honest. If he rules 0.20 to get LOO-mae at the front of the board, the scarcity rows go soft — and the board will forever tell users that FB>TE costs 2.

## What would change my mind

The Owner runs **both objectives through the draft board on a held-out season** with VL's receipt: count board-visible ordering inversions (mis-rankings at premium slots — QB/RB1/WR1/CB1/OT1) and trade-screen value error at the 25 most common trade pairs — **and have him weigh the FB-family out-of-fold damage at both λ in the same harness** (the third and decisive number). If 0.20's board-visible invert count is near zero AND its FB-family damage beats 0.40's by >25% while its exact-FB ruling breach is accepted by the Owner, 0.20 is the right default. My prediction: board-visible inversions ≈ 0–1 at both λ (the 11 misses at 0.20 are exotic rows), and the FB family resolves to "fix E at either λ" — in which case 0.40 default + V3 ships either way.

## Standing disagreements, named

- **VL's receipt is wrong about where the 0.20 misses live** (exotic boundary rows, not premium slots — measured), but his direction (visible errors hurt more than silent ones) is right, and is mine too.
- **MUSE's portability lean for 0.20 is a wash** (both objectives need the tables; the breaks are elsewhere) — his 0.20 remains a defensible LOO-MAE answer, and wrong as a board answer.
- **Glyph's frame is right but mislabeled**: it is not "value vs rank" — it is "scarcity doctrine vs smooth precision." The Owner's table is the guard-shaped doctrine; mae rewards the wound to it.
- **OR's ANOVA bridge is β-precision, not an objective adjudicator** — keep it as the cross-check, do not present it as a symmetry argument.
- **VLOC/VLOC's no-lean is the honest output of this round's evidence, and the Owner should read that AGAINST both of us** — the data does not divide the objectives by itself on the Owner's table; the ruling lives elsewhere, and it lives in the Owner's own ledger of rulings, which I have just read out loud in rows.

— filed under FOR: P-345 · inkling · 2026-11-12 · branch council/inkling
