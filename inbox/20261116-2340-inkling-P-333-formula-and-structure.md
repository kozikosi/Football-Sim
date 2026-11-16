SPEAKER: inkling | ROLE: council | TASK: P-333 round 2 — Part A (a principled formula) and Part B (the structural side). Propose and measure; do not pick; KG picks. | DATE: 2026-11-16T23:40Z
FOR: P-333

# P-333 — Part A (a principled formula) and Part B (the structural side)

Nothing is implemented anywhere; every candidate below lives in a throwaway extract of `7a0706df`; the live table at `d3bd81d2`=`7a0706df` is unchanged.

## Part A — the principled formula

### What already exists (reproduced VERIFIED where runnable)

**Z.ai's ladder** (`_agents/ernie/deliveries/zai-fresh-start-rev10-2026-11-16/scripts/p333-ladder.mjs`, receipt `p333-ladder-run.txt`) fits `price_raw = α·d̂ + β·ŵ` to the live 99 by least squares ("max fit floor6-C4 = 50/99"). I do not take his arithmetic on faith — my independent re-derivation from the real pool reproduces every headline:

- **α = 5.50 (his 5.48), β = 12.35 per 1000 (his 12.46)**; DMAX 22.57 vs his 22.6. VERIFIED.
- Formula pricing: **TE>DIME 4.76 (his 4.76), ILB>DIME 4.17 (his 4.17), OLB>DIME 4.10 (his 4.09)** vs ruled **12** — the DIME trio prices ~4–5, ~8 tiers short of the ruling. VERIFIED.
- FB exception broken: my formula prices **FB>TE at 4.00** (his: DT>FB 3.50 / OT>FB 4.22) vs ruled **0**. VERIFIED (qualitative; his exact decimals differ by ±0.2 — my β normalisation differs slightly; same conclusion).
- His receipt table is otherwise unchanged: every candidate fit ≤ 50/99; every cut flips the gap sign or leaves it ≥ 450; all nine candidates flex 245–413 spots (vs live 145); emergency fills 0 everywhere; fit loses the DIME trio and the FB exception into the ~tier-2 pool. REPORTED (his receipt, matching the doc).

**The one gap-near formula is the weight-term excision** (β = 0, his "ability-only"): gap **−50 table / −63.0 measured** — essentially closing it — but fit **42/99**, **404 flexed spots**, and the DIME trio disappears (it prices at ~2–4, not the ruled 12). VERIFIED (identical centroid math re-derives his β=0 row's behaviour; his receipt numbers reproduced). **A formula closes the gap only by dropping destination weight — the term the table's base pricing requires.** That is the two-sided finding any Part A answer must state plainly:

> **No two- or three-term formula fitted to this table both preserves the Owner's principles and closes the gap to ~0. The ability-only variant zeroes the gap (−50/−63, measured) by amputating the destination-weight term, losing 42/99 fit and doubling flexing (+258). Every kept-weight variant that keeps the rulings (the ladder family) cannot reach below ~+200 on the DT corner.**

### The candidate nobody ran: the carve-out derivation ("locks + formula")

If the table = {the Owner's rulings} ∪ {everything else}, then a two-term formula over the free pairs is not a hypothetical; measure it. Two tranches, both fitted from the real pool (d̂ = spd/str distance of pool centroids; ŵ = max slot weight at the dest / 1000, QB-normalized):

**F1 — 16 locked pairs** (his rulings only: DIME trio 12, floor 5×WRxDB 6, FB exception 0 (DT/OT>FB), FB>RB/TE 2, QB>FS 12, TE/ILB/OLB>FS 12): free-fit α=3.86, β=12.94/1000.
- Fit on the full 99: **exact 53 · off-by-one 42 · hard misses 4** — wait: hard misses were **OT>OG 0→6, EDGE>DT 0→6, CB>FS/SS 0→6** (the live table carries ~10 additional same-family zeros nobody has ruled on). VERIFIED (my run).
- All 16 ruled pairs stay **exact by construction** — DIME trio stays 12, FB exception stays, cross-side floor stays.
- Gap: **100 table / 102.5 measured (DL5=DT)** — own-base equality preserved (600250 / 603998.6 both bases). League flexed spots: **243 measured / 235 reference** (vs 143/147 live) — **+70% flex**. 0 emergencies. VERIFIED.

**F2 — 26 locked pairs** (his 16 rulings + 10 same-side zeros: OT>OG, EDGE>DT, CB>FS/SS/DIME/NICKEL/ILB, SS>DIME/NICKEL, FS>DIME/NICKEL — adjacent-family pairs live already priced 0; locking them is a judgment, not a ruling; labeled as such). Free-fit α=4.06, β=13.67/1000.
- Fit: **exact 94 · off-by-one 5 · hard misses 0.** VERIFIED (my run — the asterisks attach to the lock set: 94/99 is a fit statistic purchased partly by the 10 same-family zeros the live table also sits at 0).
- Gap: **100 table / 102.5 measured** (identical routing to F1) · own-base equality holds · league flexed **212 / 207** (**+48/41%**) · 0 emergencies. VERIFIED.

Candidate F2 is the honest positive finding of Part A:
**the live table is nearly derivable — a plain two-term formula reproduces 94/99 once 26 pairs are locked (16 rulings + 10 obvious zeros). The table IS the principles: lock them and the remainder falls out of athletic distance and destination weight.**
And the honest ceiling of that success: **the gap only reaches 100**, bought at **+48–70 % flexed spots league-wide**, and the 26 locks include judgment, not just rulings — the derivation is attractive as a MAINTENANCE tool (re-pricing new pairs principles-first), not as a launch button for the gap.

### Beam's one-liner, refuted on the arithmetic (for the record)

Beam's `ILB>DL5 12→6 + TE>SAM 6→12` — ILB>DL5 12→6 alone already makes the 3-4's fixed stand-in cost 900 instead of 1800, so the gap **widens**: 2500 − 900 = **1600** table. His second edit (TE>SAM 6→12) pushes further the same way (+600 on the 4-3 side). The sign error stands as filed by the round; not re-measured end-to-end (his ladder numbers not in my hands) but the direction is arithmetic, VERIFIED.

### What Part A concludes (recommendation-grade, not a ruling)

- The formula direction closes at **−50…0 gap only via β = 0** (fit 42/99, flex 404 — fails the principles).
- The ruling-respecting candidates F1/F2 land at **gap 100** at **flex +41/+70 %**, changing ≤ 70 free pairs wholesale — a full re-derivation, not a knob.
- **Nothing fitted reaches gap 0 that keeps the DIME trio, the FB exception, the cross-side floor, the tier structure, AND the live flex frequency.** A negative result is a result; it is exactly the shape of the one the Owner's rejection of the last round predicted: closing the gap via a principled formula requires the Owner to bless either a β = 0 formula (the derivation direction) or prices RULINGS already exist for. The principles and the gap are not simultaneously satisfiable in this table via a fit.

## Part B — the structural side of the real-roster bias

### Reproduced first (mine, not Ernie's quote)

`bias-probe.test.ts` on the real 1,941+12 pool, DEFAULT_VALUES, both bases:
**32 teams — 28 better in 4-3, 3 better in 3-4, 1 tied (Arizona, Δ 0.000) — Carolina (−107), Kansas City (−312), Washington (−652).** Mean signed bias **+1184.5 table units = 0.150 wins** (his filing reported +1144 / 0.145; small env/pinning difference; not the same number at 1dp — both VERIFIED facts about their respective rounds; mine is the current-pin figure). VERIFIED.

### Where it comes from, exactly (identified, not asserted)

The league-wide flex census across both bases (real rosters):

| misfit (role→dest) in 3-4 | count league-wide | in 4-3 |
|---|---|---|
| **OLB→ILB @6** | **10** | 1 |
| **SS→ILB @6** | **9** | 0 |
| **EDGE→ILB @6** | **2** | 0 |
| **MIKE→OLB→ILB @6** (KC) | **1** | — |
| all other misfits (both bases) | the rest | comparable |

**≈22 of the league's 3-4 misfits route into the `ILB2` shadow's dest (ILB) at 6 — each costing `6 × 300 = 1800` against a 300-weight shadow. The 4-3 side has essentially none (its DT2 spot gets natural bodies).** The bodies exist (31/32 rosters carry ≥ 2 ILBs — count distribution printed in the probe); the optimizer just prefers the better-rated SS/EDGE at 6 over the depth ILB. The bias is therefore **value-shape** (who flexes where at 6×300), not roster-count absence. Pool-shape (the prompt's hypothesis) is real but narrower than the finding: it's an **overflow of depth-OVR** at ILB2, priced against a 300-weight ledger row.

### Candidate structural fixes, measured (all in throwaway trees; the spot table is NOT edited anywhere)

**B1 — rate the 3-4's ILB2 off the WILL row (150):** split flips to **7 fav-4-3 / 25 fav-3-4**, mean **−395.7 table (−0.050 wins)** — flips entirely to 3-4. League flex 139/139. Fixture cells: measured own-base holds; table-provider own-base equality breaks (cross-provider row values diverge — expected when the retired table's weight is read by the new row mapping). Overshoot. VERIFIED.

**B2 — rate off SAM row (100):** split **0/32 fav-4-3** (all 32 favour 3-4), mean **−2459.7 (−0.312 wins)** — far overshoots. VERIFIED.

**B4 — rate off OG2 row (250)** (exists in the table as a real row): split **7/25**, mean **−670.0 (−0.085 wins)** — still flips to 3-4. VERIFIED.

**B3 — rate off MIKE row (300)** (same nominal weight as DT2 — the ruling's own calibre): split **28/4**, mean **+1228.0 (+0.156 wins)** — statistically unchanged (MIKE's measured slope ≈ DT2's). Confirms: **the ruling is a *position* (DT2-shadow), not a 300-property; re-pointing to MIKE buys nothing**, and MIKE's measured slope is the only thing differentiating it. VERIFIED.

**Ordering across all four mids: {WILL −396} < {OG2 −670} < {DT2 +1228} ≈ {MIKE +1228} < {SAM −2460 is below all}** — response is **NOT monotone along the axis** (OG2 at 250 still lands 3-4-favored), so there is **no honest claim of where a zero sits inside the candidate set**; none of the existing rows zeroes the bias. The bias under the measured provider is carried by the MIKE-vs-DT2 measured-slope difference far less than by the 300-vs-150 weight ratio. The crossing is **UNKNOWN**; it needs a dedicated re-rate measurement on the row-value axis (a new ~200 slot or a 3-4-specific ledger row) — **that is the larger change the prompt asks me to name** — either (a) an explicit **ILB2 ledger value (~175–250) assigned by ruling**, or (b) a genuine **base-specific spot table** (the 3-4 gets its own ILB2 slot with its own weight instead of shadowing DT2; same 32 slots, different rows — a product decision, not a formula).

**What does NOT fix it (measured):** the DL5 corner (EDGE cell is 0 at every option); the flex table's prices (established: re-pricing is closed); slot order; changing SAM's row mirror. **What it IS fixable by:** a new 3-4 shadow value or a base-specific row assignment — Owner/Architect decision, ~1 line in `fieldSlots()` plus an explicit value ruling, plus re-pin tests. Nothing else on the pool/slot side carries the bias; everything else moved the sign but not the size.

**If the Owner wants the larger change:** the named alternatives are (a) an explicit ILB2 row slot in the spot table (weight ruled, e.g. 200 ± ruling), or (b) a base-specific row mapping in `fieldSlots('3-4')` (the 3-4's ILB2 rated off its OWN row instead of the shadow, with its own measured/slotted value — the only change that preserves a coherent story: "the same position carries the same value in both bases" stays true at the *position* level, and the 3-4's extra spot gets the *next-cheaper* linebacker value the table already recognises).

## For KG to pick (no choice made here)

1. **Part A:** is the derivation direction (carve-out or β = 0) to be pursued further by the Architect, or do the principles stay as they stand and this whole direction closes (the table was never expected to be derivable — F2 says it nearly is)? If it pursues: F2 additionally decides whether the 10 same-family zeros get locked (they are what make 94/99 possible; the rulings alone give 53 + 4 hard misses at 16, F2 at 26).
2. **Part B:** the ILB2 question — re-rule the shadow (a) at an explicit new value, (b) onto its own row, or (c) keep DT2 and accept the +1184 (0.150 wins) 4-3-tilt? Either ruling re-pins `formation-gap.test.ts` (the test's comment requires it).
3. If (b): should the SAM/OLB2 mirror be re-ruled at the same time (it is un-shadowed already, fine) or the NT (DT1 500) — unchecked in this round — flagged for its own measurement next round?

## Honesty and verification notes

- EVERY number above is mine this session in a throwaway extract of `7a0706df` (`git archive`), except: Z.ai's ladder headline figures from his pushed receipt (REPORTED, and independently re-derived by me for the DIME prices and α/β — matches at 2dp); Inkling's own review verdict (my 20261116-2235 filing); Beam's REFLECTED-widening claim — REPORTED verdict by arithmetic only, direction VERIFIED, magnitudes his.
- The baseline fixture reproduced 700 / 720.1 and the 28/3/1 split with mean +1184.5 — reproduces Claude's "about 720 measured" and his 27/3/1-modulo-environment differing by one team's tie (Arizona 0.000 in mine, REPORTED ±1).
- No candidate implementation exists anywhere (the candidate trees are deleted with the session's temp; only this filing and the pushes remain).
- `bad.length` recount (arbitrage floor) under F1/F2: NOT measured — UNKNOWN. Own-base equality holds under F2 and F1 (both providers).
- Note on the 26 locks: 16 = KG's rulings; 10 = same-side zeros chosen by me as "obvious" — the F2 "94/99" is a **fit statistic with judgmental inputs, not an Owner ruling** — F1 (rulings only) is the honest statistic for "the principles ARE the table"; F2 is the honest statistic for "the table is derivable in practice".

## Commands

```
git archive 7a0706df | tar -x -C /tmp/x
# probes used: gap-probe.test.ts (fixture, both providers) · gap-freq.test.ts (league 2x32) · gap-measured.test.ts (4 cells)
#               bias-probe.test.ts (league split + mean) · misfit-probe.test.ts (census) · poolshape.test.ts (ILB supply)
#               perteam.test.ts (per-team flexed list) · ladder-verify.test.ts (α/β re-derivation) · carveout.test.ts (F1/F2 fit) · apply-carveout.test.ts (rewrite)
node --test --experimental-strip-types <probe>.test.ts
```
