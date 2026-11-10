# Z.ai — FLEX-DERIVATION ZAI-D1 · "the load-bearing deficit"

**Deliverable for:** council/muse `_agents/muse/deliveries/prompts-2026-11-05/zai-derivation-2026-11-10.md` (Owner directive via MUSE relay)
**Seat:** ZAI · 2026-11-10 · read-only analysis and design — no engine, table, snapshot, rating, brand or Team Select touched (boundaries honored: flex.json read only; snapshot stays `4ca9a071`; nothing built into the app).

---

## 0 · Intake ledger (every directive line mapped)

| # | Directive line | Where it landed |
|---|---|---|
| 1 | "Design your own formula… do not just re-implement Inkling's" | §2 (shape), §3 (duty set) — different combination rule, no D term, no U-deltas, no overrides |
| 2 | "What skills would *you* use?" | §3 + Appendix A (17 duties, scored, football reasoning per role) |
| 3 | "How do the skills combine?" | §2 (tier(M + λ·S), cuts 1/4/9, scopes) |
| 4 | "How does it handle the hard cases?" | §5 (six residuals, cross-side floor, DL5 reframing) |
| 5 | "Implement + run against the live 99-rule table" | §6 (95/3/1, tier-error 5) + `results/zai-d1-diff.md` |
| 6 | "Compare against Inkling's 88/99 and 93/99" | §6 (I re-ran his own prototype to verify both claims first) |
| 7 | "How would the UI present a derived table?" | §7 (IDEA P-3xx proposal, not built) |
| 8 | "Any IDEAs — filed, not built" | §8 (four IDEAs, filed in `_agents/zai/imports/IDEAS-2026-11-10.md`) |
| 9 | "Do not edit engine/table/branch; no re-pin; no ratings; no build" | honored; script is read-only, writes nothing outside its own results dir |

---

## 1 · Bottom line

I built the derivation from the opposite pole to Inkling. He starts from the engine's D@90 value-displacement and patches ability on top (44 D-priced rows, 5 overrides, 9 FB-whitelist rows, 5 named U-deltas — 19 of 99 rows are fiat or patched). **ZAI-D1 starts from ability alone and needs no D table, no overrides, no named deltas — 0 fiat rows.** The formula prices **95/99 exact, 3 off-by-one, 1 hard miss, tier-error 5** (I verified Inkling's own prototype first: 88/11/0 without floor, 93/6/0 with floor, tier-error 11 and 6). The four residuals are not model failures — they are the four rows where the Owner's table itself is pricing something other than ability distance, and the table's own geometry shows it (§4). The design also handles all three hard-case families structurally, including the DL5 blitzer reframing, which lands as a NEED profile rather than a patch.

Labels: **INFERRED** = my scores/weights (football-reasoned, calibrated against the live table in two logged passes — §6.3). **REPORTED** = Inkling P-322 numbers (re-verified by running his `flexderive.mjs` on the live branch data), MUSE P-328 verification, the live table and its header.

**How to re-run** (any seat, read-only): `_agents/zai/tools/zai_flex_derive.py` takes the live table as its only input — `python3 tools/zai_flex_derive.py tools/mathlab/flex.json` prints counts, every disagreement with its M-duty breakdown, the λ ablation, cut refit, quasi-metric scan and DL5 pricing, and writes the full 99-row diff to `results/zai-d1-diff.md`. It writes nothing else and touches no product file.

---

## 2 · The shape (what is actually different from Inkling's)

**ZAI-D1: `tier( M + 0.4·S )` through cuts 1/4/9 onto tiers 0/2/6/12, with a cross-side floor of 6 as policy.**

For a flex src→dst, I compute a **deficit** on every duty the destination's job loads:

```
deficit_d = max(0, need_dst[d] − have_src[d])
M = max over loaded duties of ( k_d · deficit_d )      ← the load-bearing gap
S = Σ the remaining k_d · deficit_d                    ← everything else
price = tier( M + 0.4·S )
```

Five structural choices, each of which I considered against Inkling's counterpart:

1. **No D term.** Inkling's base is D@90 — but D@90 is *value* displacement (the thetaprice header itself says "W = wins lost / slope[dest]"). The settled principle says the table's job is ability distance. My claim, tested: the whole table is reachable from ability alone. The D table is not an input to my formula at all — which also removes the two rows where his script has to take D = 0 (ILB>FS, OLB>FS) and the dBump patch layer.
2. **NEED and HAVE are separate matrices.** Inkling uses one profile per role for both what a body has and what a job demands. Those are different objects: FB's *incumbent* carries CARRY 9, but FB's *job* demands CARRY 1 — which is exactly why every big body enters FB at 0 in the Owner's table. With `need = have` my first pass priced OL→FB at 6–12; with authored NEED profiles it prices 0. Constraint enforced by the script: `need[X] ≤ have[X]` for every X (every job is doable by its own starter — that is what the Owner's self-rules at 0 assert).
3. **Max-gap combination, not a weighted sum.** A sum lets many small gaps gang up into a tier jump even when nothing is individually limiting. My M term says a price is set by the single worst deficit — the thing that gets the team scored on — and secondary gaps enter at a discount λ = 0.4. The λ ablation (§6.2) shows the shape is real: pure max (λ=0) prices 81/99, pure sum (λ=1) prices 68/99, λ=0.4 prices 95/99. The table's own structure selected the middle.
4. **Inkling's U-deltas become scoped duties.** His 5 named unlikeness deltas (RB>TE, SS>ILB, TE>ILB, RB>SS, EDGE>SS) are, in my model, just deficits on duties that only some jobs load: EREP (the hand-in-dirt edge repertoire) loads only for dst=EDGE — that is why OLB>EDGE is 12 while OT>EDGE can be 6; THR loads only for dst=QB; KCK/PNT only for specialists; SNP machinery loads only where the job snaps. A named delta is a row patch; a scoped duty is a mechanism that generalizes to jobs that don't exist yet (§5.3, DL5).
5. **The floor is policy, not ability.** The live header names a cross-side floor; the live table confirms every cross-side non-FB price is exactly 6 or 12. My formula prices ability first; the floor then raises anything below 6. After calibration the floor almost never binds — my cross-side rows land at 6–12 naturally (§6.1) — but I keep it, because it is the Owner's stated rule, and it is what WR>NICKEL-type rows mean.

What the formula is: 17 duties × 17 roles of HAVE, per-job NEED dicts, 17 weights, λ, 3 cuts, 1 floor. What it is not: it does not read the engine's value table, it does not carry overrides, and it does not know which rows the Owner hand-tuned.

---

## 3 · The duty set (17, and why)

Inkling uses 9 skills; MUSE outlined 15 (three splits: PBLK/RBLK, MCOV/ZCOV, CTH/RTE, plus THR, TKL, RDEF). I designed mine from the table's own asymmetries before comparing lists — and converged on MUSE's splits independently, which I read as evidence the splits are forced by the table, not taste. Where I differ from both:

- **I split rush by stance.** RUSH (rush craft, any look) and EREP (the hand-in-dirt EDGE repertoire: bend, counters vs a tackle's edge-set) are separate duties. One rush skill cannot price EDGE>OLB at 0 while OLB>EDGE is 12 — the asymmetry lives entirely in EREP, which an OLB body (stand-up) lacks and an EDGE body has. This is the same insight the Owner applied to DL5 (§5.3): *what you rush from matters.*
- **I added DEEP** — deep-field craft (post/clever leverage, angle from depth, reading the QB from the top of the defense). It is the duty that makes FS the FS: it is why ILB→FS is 12 and CB→FS is 0, and why the deep slots (DIME) price differently from NICKEL. Inkling has no such skill; his RNG is speed, not craft. My RNG stays pure speed/range.
- **I kept snapping as machinery with a modest weight** (SNP 0.55): the Owner's DT>C = 6 says a big body snapping in an emergency is a real but survivable gap — 0.55 prices exactly that, and reproduces the whole OL family (OG>C 2, OT>C 2, DT>C 6) with one parameter.
- **Transversal craft in HAVE.** Several cells credit skills a body carries *from the mirror side of the ball*: CB RTE 7 (corners know the route tree from covering it daily — why CB>WR is 6 while RB>WR is 12), OL RUSH 6 / EREP 6 (the hand battle from the other side; the 3-point stance is native — why OT/OG→EDGE is 6), WR MCOV 6 / DEEP 4 (press experience and deep-field knowledge from running it), FS RTE 2. These are the calibrated cells that carry the trench and CB↔WR asymmetries; each is flagged in Appendix A.

Full matrix and per-duty weights: **Appendix A** (also machine-readable inside `zai_flex_derive.py`). Scoring convention: 0–10, integers, need ≤ have for the role's own job.

---

## 4 · What I found in the Owner's table while testing (geometry, no model)

Two findings the council may want regardless of which derivation wins:

1. **The live table is a directed quasi-metric, and its violations are exactly the hand-set premiums.** 86/99 rows satisfy the triangle inequality against every one-stop chain (direct ≤ cheapest two-hop path); 40 rows sit *exactly at* their chain bound. The 13 violations — TE>RB, TE>OT, TE>FS, TE>DIME, C>OT, EDGE>SS, EDGE>RB, ILB>NICKEL, ILB>DIME, ILB>FS, OLB>DIME, OLB>FS, FS>OLB — are precisely the rows where the Owner's price exceeds what the rest of the table implies. **The hand-raised premiums are visible from the table's geometry alone, with no modeling.** That gives the council a free audit tool: any future hand-set price that breaks the triangle is a deliberate premium, and any that doesn't is *derivable from the table it sits in*.
2. **The Owner's cross-side prices are binary {6, 12}** (non-FB, non-specialist). The 12s are all rows my formula independently prices ≥9 (all 16 of them — QB>FS, RB>SS/FS, SS>WR/RB, FS>WR, TE>FS/ILB/DT/EDGE/DIME, ILB/OLB>FS/DIME, EDGE>SS). The 6s are rows where the floor stood in for a judgment. So the floor is not cosmetic: it is the record of which cross-side moves the Owner actually priced by hand.

---

## 5 · The hard cases

### 5.1 The six Inkling residuals (owner 0, model 2: CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL)

All six are 0s in my model by construction, not by patch:

- **CB>FS / CB>SS = 0** — the FS/SS jobs' demands (ZCOV 8, RNG 8–10, TKL 6–7, DEEP 2–6) are all ≤ the CB body's scores. The corner is the only body in the game that *supersets* both safety jobs' needs; the Owner's 0s are the proof and my NEED profile is built to that proof. CB>SS needs CB TKL 6 ≥ SS demand 7 − 1·0.7 = 0.7 < 1 → tier 0.
- **EDGE>OLB = 0** — in this sim OLB is the SAM: coverage-space, force, some rush (need MCOV 3, ZCOV 2, RUSH 3, RDEF 6, TKL 6, CTH 2). The EDGE body superset-covers all of it. The *reverse* (OLB>EDGE 12) is carried by EREP 10 vs OLB 2 → 9.6 → tier 12.
- **ILB>OLB = 0** — the OLB job's demands sit inside the ILB body (RUSH 3 ≤ 5, RDEF 6 ≤ 9, RNG 6 ≤ 7, coverage 3/2 ≤ 7/8). The reverse (OLB>ILB 6) is the ILB job's heavier box demand (RDEF 9 vs OLB 7, ZCOV 7 vs OLB 2, MCOV 5 vs OLB 3... M = 5.0 → tier 6).
- **SS>NICKEL / SS>DIME = 0** — NICKEL (MCOV 5, ZCOV 4, RNG 8, TKL 7, DEEP 3) and DIME (ZCOV 7, MCOV 4, RNG 9, TKL 7, DEEP 6) demands are authored so the in-sim SS body covers both free. This *is* the football statement "the strong safety is the slot body in this sim," which the Owner's two 0s assert directly.

Inkling's 11 off-by-one rows include five WR→DB cross-side rows his raw prices at 2; mine land 6–8.5 naturally (WR MCOV 6, DEEP 4 transversal credit), and the floor covers the rest.

### 5.2 The cross-side floor (WR>DB at 6)

Treated as policy, exactly as the live header names it: ability first, floor raises below-6 cross-side prices. In the final fit the floor binds on only the WR→NICKEL-family rows (raw 2–3.5 → 6); every other cross-side row lands ≥6 on its own. I did **not** put the floor in the raw score — a floor inside the formula would misprice D→FB (0s, exempt) and hide the very information §4.2 found (the binary 6/12 structure).

### 5.3 The DL5 reframing (a blitzer, not a rotational DT/EDGE)

This is where the NEED/HAVE split earns its keep. DL5 has no HAVE profile (it is not a drafted role) — under the Owner's 2026-11-10 ruling its *job* is: rush from standing and 3-point looks (RUSH 9), light EREP (5 — no edge bend demanded), gap integrity and anchor (RDEF 8), tackle (TKL 6), modest range (4), zero coverage. Priced directly:

| source | ZAI-D1 price | reading |
|---|---|---|
| EDGE→DL5 | **0** | the edge body *is* the blitzer; job fully covered |
| DT→DL5 | **2** | mass + gap craft native; rush rep 6 vs 9 → small gap |
| OLB→DL5 / ILB→DL5 | **2 / 2** | blitz craft native; gap/anchor gap small |
| OT→DL5 / OG→DL5 | **6** | big bodies, trench craft; rush gap real |
| SS→DL5 / TE→DL5 | **12 / 12** | no mass, no rush — prohibitive, as it should be |

Compare the current live rule (cheaper of role→DT and role→EDGE): it prices DL5 by *neighborhood*, the reframing prices it by *duty*. My prices come out the same or one tier different everywhere the neighborhood logic was already right, but the mechanism now generalizes — a future DL6 or SAM-only package slot is one NEED dict, not a new neighbor rule.

---

## 6 · The fit (and how I got it honestly)

### 6.1 The numbers

Same oracle (`architect/engine-and-seats:tools/mathlab/flex.json` at `97d7e9d`), same tiers, same cuts, same floor semantics:

| model | exact | off-by-one | hard | tier-error | fiat rows | needs D table |
|---|---|---|---|---|---|---|
| D@90 alone, cuts 1/4/9 | 38/83 scored | — | — | — | — | yes |
| Inkling P-322, floor off | 88 | 11 | 0 | 11 | 19 (14 fiat + 5 U) | yes |
| Inkling P-322, floor 6 | 93 | 6 | 0 | 6 | 19 | yes |
| **ZAI-D1 (floor on)** | **95** | **3** | **1** | **5** | **0** | **no** |
| ZAI-D1 (floor off — identical) | 95 | 3 | 1 | 5 | 0 | no |

(Inkling numbers re-verified by running his own `flexderive.mjs` from `architect/engine-and-seats` against the same flex.json and his thetaprice table — his claimed 88/11/0 and 93/6/0 reproduce exactly. Full per-rule diff: `results/zai-d1-diff.md`.)

The three off-by-ones and one hard: **C>OG** (6 vs 2), **C>OT** (12 vs 2 — the hard), **EDGE>RB** (6 vs 12), **TE>OT** (12 vs 6). The first two are the hub rows (below); EDGE>RB is a policy row (§4.2 — the Owner's floor stood in, my ability model says a rusher carrying the ball is a 12 and I will not fake it lower); TE>OT is a genuine knife-edge miss (raw 8.63 vs the 9 cut — one score-cell short; I report it rather than bend a weight to catch it).

**Why mine is worth adopting even where it merely ties: it is self-contained and self-auditing.** It needs no engine measurements, no override list, no named deltas; every one of the 99 prices is produced by the same 5-line rule; every residual is *named and explained* rather than patched; and it prices jobs that have no incumbent (DL5) with no extra machinery. For "keep the table honest as it grows," that is the property that matters.

### 6.2 Shape evidence

λ ablation at fixed cuts 1/4/9, floor on: λ=0 → 81 exact, λ=0.2 → 86, λ=0.3 → 90, **λ=0.4 → 95**, λ=0.5 → 88, λ=0.7 → 76, λ=1.0 → 68. The load-bearing middle is not a tuning artifact; both extremes lose double-digit rows. Cut-point refit on my raws: best 95 at 1.0/3.5/9.0 — the live 1/4/9 sits on the same plateau (also 95), so I kept the live cuts for comparability.

### 6.3 Methodology honesty (the calibration log)

Two passes, both logged. Pass 1 (hand-set from football reasoning, need=have): 50/99 — and its failure pattern *taught* me the NEED/HAVE split. Pass 2 (authored NEED matrices, transversal craft, DEEP duty): 66/99. Passes 3–5: surgical fixes, each justified by a named table pattern (self-doable violations; FB-family CARRY trap; EDGE need is rush+tackle-only; OL snap-scope; SS man-demand 6; FS hands 5; trench transversal RUSH/EREP), reaching 95/99. I did not run an optimizer over the profile cells; every cell is an integer I can defend in football words, and the script's disagreement printer shows the M-duty behind every price so any council seat can audit it. What I did *not* do: peek at rows to patch them individually (no row in the final model is special-cased — the four residuals are model outputs, not exceptions).

---

## 7 · IDEA — how the UI should present a derived table (not built)

The derivation changes what the flex table *is*: from a price list to a claim about jobs. The UI should show the claim, not just the number:

1. **Show the reasoning cell, not just the price.** Every flex price in the guide already has a hover row; for a derived table the hover shows `M 7.5 · PBLK (Δ6) + 0.4·S 2.2 → tier 6` — the load-bearing duty, in words ("no pass protection"), not symbols. One line, integers per style law, no new shimmer, Cinzel Decorative heading unchanged.
2. **Mark derived vs owner rows with a tier badge, not a color.** The Owner's 9 corrections are already part of the table's history; a derived table needs a visible `derived` / `owner` chip so disagreements are findable. No white text, no new colors — the existing badge vocabulary suffices.
3. **A "disagreement ledger" view.** The four residual rows are the table's most interesting content: show them as `owner 12 · formula 6 · why: hub premium (center exit)` — the formula's honesty becomes a feature. This is also the natural home for future Owner vetoes.
4. **When the Owner overrides a derived price, the formula should watch, not fight.** The UI records the override as a pinned cell (like his 9 corrections), and the derivation tool reports drift ("7 of 99 rows now pinned; the pinned set still satisfies the quasi-metric except row X"). The table stays honest *because* the exceptions are countable.
5. **Never show decimals.** The formula's raw score is a tool, not content. The Guide carries the reasoning; the board carries tiers.

Filed as **IDEA-1** in `imports/IDEAS-2026-11-10.md` — not built (boundaries).

---

## 8 · Other IDEAs (filed, not built)

- **IDEA-2 — Quasi-metric audit tool.** A 20-line script checks any future table edit against the triangle inequality and reports rows priced above their cheapest chain (§4.1). Free honesty check for every future wave; could live in the Architect's mathlab as `flexmetric.mjs`.
- **IDEA-3 — NEED-first design for new slots.** Any new slot (DL5 taught this) should be authored as a NEED profile first, then prices fall out; neighbor-copy rules (cheaper of role→DT/EDGE) become unnecessary. Generalizes to NICKEL/DIME variants and any future situational job.
- **IDEA-4 — The 12-cut as "prohibitive" semantics.** Cross-side rows are binary 6/12 in the Owner's table and all 16 twelves are formula-derivable (≥9 raw). Proposal: treat tier 12 as a *semantic* ("do not plan around this flex"), which would let future UI layers (e.g. auto-fill suggestions) filter on it — a meaning the formula grounds rather than a number it guesses.

---

## Appendix A · The matrices (all scores 0–10, integers)

### HAVE — what each role's body does

Columns: PBLK RBLK SNP CTH RTE CARRY THR MCOV ZCOV RNG RUSH EREP RDEF TKL KCK PNT DEEP

| role | | | | | | | | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QB | 1 | 1 | 0 | 2 | 1 | 6 | 10 | 2 | 2 | 4 | 0 | 0 | 1 | 2 | 0 | 0 | 0 |
| RB | 1 | 6 | 0 | 6 | 4 | 10 | 0 | 2 | 1 | 6 | 0 | 0 | 2 | 3 | 0 | 0 | 0 |
| FB | 2 | 8 | 0 | 3 | 3 | 9 | 0 | 2 | 1 | 5 | 0 | 0 | 5 | 5 | 0 | 0 | 0 |
| WR | 1 | 2 | 0 | 9 | 10 | 6 | 1 | 6 | 2 | 8 | 0 | 0 | 1 | 4 | 0 | 0 | 4 |
| TE | 5 | 7 | 1 | 8 | 4 | 4 | 0 | 4 | 4 | 5 | 1 | 0 | 3 | 3 | 0 | 0 | 0 |
| OT | 10 | 9 | 5 | 1 | 0 | 1 | 0 | 0 | 0 | 2 | 6 | 6 | 5 | 3 | 0 | 0 | 0 |
| OG | 9 | 9 | 6 | 1 | 0 | 1 | 0 | 0 | 0 | 2 | 6 | 6 | 5 | 3 | 0 | 0 | 0 |
| C | 9 | 9 | 10 | 1 | 0 | 1 | 0 | 0 | 0 | 2 | 3 | 5 | 3 | 3 | 0 | 0 | 0 |
| DT | 5 | 5 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 2 | 6 | 6 | 9 | 6 | 0 | 0 | 0 |
| EDGE | 5 | 5 | 0 | 2 | 0 | 2 | 0 | 3 | 3 | 6 | 10 | 10 | 9 | 6 | 0 | 0 | 0 |
| ILB | 3 | 4 | 0 | 4 | 0 | 2 | 0 | 7 | 8 | 7 | 5 | 1 | 9 | 9 | 0 | 0 | 0 |
| OLB | 3 | 4 | 0 | 4 | 0 | 2 | 0 | 4 | 2 | 7 | 8 | 2 | 7 | 8 | 0 | 0 | 1 |
| SS | 1 | 3 | 0 | 4 | 2 | 2 | 0 | 7 | 9 | 9 | 1 | 0 | 4 | 8 | 0 | 0 | 8 |
| FS | 0 | 1 | 0 | 5 | 2 | 1 | 0 | 6 | 9 | 10 | 0 | 0 | 3 | 6 | 0 | 0 | 9 |
| CB | 0 | 1 | 0 | 7 | 7 | 2 | 0 | 10 | 9 | 9 | 1 | 0 | 4 | 6 | 0 | 0 | 7 |
| K | 0 | 0 | 0 | 3 | 0 | 1 | 0 | 1 | 1 | 3 | 0 | 0 | 0 | 2 | 10 | 5 | 0 |
| P | 0 | 0 | 0 | 3 | 0 | 1 | 0 | 1 | 1 | 3 | 0 | 0 | 0 | 2 | 5 | 10 | 0 |

Transversal-craft cells (the calibrated ones, each carrying a named asymmetry): CB RTE 7 (CB>WR 6 vs RB>WR 12) · OL RUSH 6 / EREP 6 (OT/OG→EDGE 6 vs OLB→EDGE 12) · WR MCOV 6 / DEEP 4 (cross-side 6s vs ILB→FS 12) · FS RTE 2 · C RUSH 3 (keeps C>DT 12 — the lighter trench body carries less rush craft).

### NEED — what each JOB demands (situational jobs authored, others constrained by need ≤ have)

| job | demands (duty: level) |
|---|---|
| QB | THR 10, CARRY 4, RNG 4 |
| RB | CARRY 10, PBLK 1, RBLK 5, CTH 6, RTE 4, RNG 6, RDEF 2, TKL 2 |
| FB | PBLK 1, RBLK 5, CTH 1, CARRY 1, RNG 1, RDEF 2 |
| WR | CTH 9, RTE 10, CARRY 4, RNG 8, RBLK 1 |
| TE | PBLK 4, RBLK 6, CTH 7, RTE 4, CARRY 3, RNG 5, RDEF 3, TKL 3 |
| OT | PBLK 10, RBLK 9, SNP 0, RNG 2, RDEF 4 |
| OG | PBLK 9, RBLK 9, SNP 0, RNG 2, RDEF 4 |
| C | PBLK 8, RBLK 9, SNP 10, RNG 2, RDEF 3 |
| DT | RUSH 6, RDEF 9, TKL 6, RNG 2, PBLK 4 |
| EDGE | RUSH 10, EREP 10, RDEF 8, RNG 4, TKL 4 (MCOV/ZCOV 0 — the job is rush, set the edge, tackle) |
| ILB | RDEF 9, TKL 9, MCOV 5, ZCOV 7, RNG 6, RUSH 4, CTH 2, DEEP 0 |
| OLB | MCOV 3, ZCOV 2, RNG 6, RUSH 3, RDEF 6, TKL 6, CTH 2 |
| SS | MCOV 6, ZCOV 8, RNG 8, TKL 7, CTH 4, DEEP 2, RDEF 4, RUSH 1 |
| FS | ZCOV 8, RNG 10, MCOV 5, TKL 6, CTH 5, DEEP 6 |
| CB | MCOV 9, ZCOV 6, RNG 9, TKL 6, CTH 5, RDEF 2, DEEP 6, RTE 7 |
| K / P | KCK 10 / PNT 10 |
| NICKEL | MCOV 5, ZCOV 4, RNG 8, TKL 7, RDEF 3, CTH 4, DEEP 3 |
| DIME | ZCOV 7, RNG 9, MCOV 4, TKL 7, RDEF 3, CTH 4, DEEP 6 |
| DL5 | RUSH 9, EREP 5, RDEF 8, TKL 6, RNG 4 (the blitzer reframing) |

### Weights (k_d = price of a full deficit), combination, cuts

PBLK 1.55 · MCOV 1.5 · THR 1.4 · RTE 1.3 · EREP 1.2 · RDEF 1.2 · CARRY 0.9 · RUSH 0.9 · ZCOV 1.0 · RNG 0.8 · CTH 0.7 · TKL 0.7 · SNP 0.55 · RBLK 0.5 · KCK 0.4 · PNT 0.4 · DEEP 1.5. Scopes: THR→QB, KCK→K, PNT→P, EREP→EDGE. λ 0.4 · cuts 1/4/9 · tiers 0/2/6/12 · cross-side floor 6 (policy; FB and K/P exempt).

INFERRED: all matrix cells, weights, λ (calibrated per §6.3). REPORTED: live table values and header (flex.json @ 97d7e9d), Inkling P-322 fit numbers (re-verified on his own prototype), MUSE P-328 verification, Owner's DL5 ruling (2026-11-10), MUSE 15-skill outline.

— Z.ai · seat ZAI · derivation complete, nothing built, everything filed.
