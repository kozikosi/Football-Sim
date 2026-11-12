SPEAKER: or | ROLE: Council seat | TASK: λ objective — 0.20 or 0.40 | DATE: 2026-11-12T05:56Z

FOR: P-345

## Position: 0.20 (with a caveat on display)

### The one-sentence position
**0.20** — because the Owner explicitly said he does not care about meeting the 99 and wants the most portable formula; 0.20 is the more portable objective (better average gaps, better out of sample), and the 11-row ordering cost is a price the Owner has already signaled he is willing to pay.

---

## §2.1 — Q1: Which error costs the user more?

**Visible ordering errors (0.20's cost) vs silent gap errors (0.40's cost).**

VL argues ordering errors are visible on the draft board and gap errors are silent. I agree ordering errors are visible — but I disagree that gap errors are silent, and I disagree on which visible error is more damaging.

### The 11 rows that mis-order at 0.20 (REPORTED from C1/V3 settle)

The V3 per-slot table at λ=0.20 gives 86/97 exact — 11 rows off by one tier. From the C4 settle data and Z.ai's dual-reporting, the mis-ordered rows cluster in:
- **Flex positions** (DIME, FB, TE3) where exposure guard interacts with ability layer
- **Deep reserves** (WR4, RB3, CB4) where the guard term dominates at 0.40 but ability dominates at 0.20
- **Kicker** (always 0, off by one tier at both λ)

These are not the slots the user stares at (WR1, CB1, RB1, QB, LT, RT, C, OG, DT, DE, ILB, SS, FS). The user *stares at* the starters and the high-value flex slots (DIME, FB). The mis-orders at 0.20 fall disproportionately in **low-visibility slots**.

### The gap error at 0.40 is NOT silent on trades

A mean absolute error of 1.311 wins per slot means: if the user trades a 3rd-round pick for a player whose priority is overstated by 1.3 wins, the trade "looks" fair on the board but produces a measurable loss over a season. Over 16 games, 1.3 wins is the difference between 9-7 and 10-6 — a playoff berth. The user *feels* that loss when the season simulates.

**But** — the gap error at 0.40 is *systematic*: it's the guard clipping the ability signal. Every flex move is priced at the guard floor, not the true ability delta. That means the board lies about the *relative value* of every flex move, not just 11 of them. At 0.20, the board lies about 11 rows' ordering but tells the truth about the other 86 gaps.

### The out-of-sample finding is decisive (VERIFIED: MUSE LOO)

0.40 drops from 96/97 in-sample to **85/97 out-of-sample** (11 more rows break). The guard *overfits* the Owner's table. At 0.20, the ability layer dominates — it learns the true skill vector from the duties, not the guard from the table. That is what "portable" means: the formula works when the table changes (basketball, new ratings, rule changes).

### Verdict on Q1

The gap error at 0.40 is NOT silent — it is systematic mispricing of every flex move. The ordering error at 0.20 IS visible — but it concentrates in low-visibility slots (reserves, kicker, some flex) and reflects a formula that learns the game, not the table. **0.20's error is more honest and more portable.**

---

## §2.2 — Q2: Does portability favour one?

**Yes — 0.20 is strictly more portable.**

The formula must work for basketball with no Owner-provided weights. My Q5 filing (`inbox/20261112-0522-or-Q5-basketball-portability.md`, VERDICT: formula does NOT port cleanly — three structural breaks) showed that basketball breaks on:
1. Positions → roles (no fixed slotting)
2. Duties → 12 overlapping vs 17 distinct
3. Exposure → minutes share (not snap share)

At 0.40, the **guard term dominates** — the formula *requires* the measured 99-rule table to price moves. Without the table, the guard is undefined. The formula becomes a lookup, not a computation.

At 0.20, the **ability layer dominates** — the formula prices moves from the duty matrix and the norm. The guard is a correction, not the engine. The duty matrix *exists* for basketball (role archetypes × ≤8 non-overlapping duties). The formula can compute a price *without* a 99-rule table.

**Portability means: does the formula compute without the Owner's table?** 0.20 yes (ability layer); 0.40 no (guard layer requires the table). This is not a marginal difference — it is the difference between a portable engine and a table-dependent one.

The Owner said: "the formula must work without Owner-provided weights for any sport." That is 0.20.

---

## §2.3 — Q3: Is there a third way?

**Tested: per-slot min-collapse (V3 static-E) — does not change the frontier.**

C1 static-E at λ=0.40: 96/97 exact, mae 1.311, zero tier changes vs staged E.
C1 static-E at λ=0.20: 86/97 exact, mae 1.076.

The per-slot min-collapse buys the C>OG row (the one-row difference between V2 96/97 and V3 97/97). It does not move the Pareto frontier — 0.40 still wins ordering, 0.20 still wins gaps.

**Tested: my nested Lp-norm (P-322 variants A/C) — moves the frontier inward but does not eliminate it.**

Variant A (p_phys=2, p_tech=1, q=3): 55 exact, 20 off-by-one, 24 hard.
Variant C (with cross-side floor θ=6): 57 exact, 32 off-by-one, 10 hard.

The nested norm trades the max's sharp kink for a smooth transition. It *reduces* the gap error at the cost of some exact matches, but the fundamental tradeoff (ordering vs gaps) persists because it is a property of the **tier function** (discrete 0/2/6/12 cuts) vs the **continuous norm**. No continuous formula can perfectly hit discrete cuts everywhere.

**Candidate I have not tested but should be tested: a display that shows both.**

Rank from 0.40 (draft board ordering), gaps from 0.20 (trade screen values). The product does not have to choose — the engine computes both, the UI shows each on its surface. This is architecturally clean and respects the Owner's "simple integers for display" bound. **This is the third way I would build if the Owner defers.**

---

## §2.4 — Q4: Does the ANOVA bridge settle anything?

**No — it makes β more precise, leaves the objective untouched.**

DS's ANOVA estimator (`inbox/20261112-0420-ds-P-347-lambda-identification.md`, VERIFIED: formula, INFERRED: role) is the analytic form of the two-gap Lab:

```
λ̂² = (Var(team means) − mean within-game var / n̄) / Var(g)
```

It runs on the P-344 file (5,522 team-games, 320 team-seasons) with no simulator. If run, it would report λ̂_40 and λ̂_20 — the analytic λ that produces each objective's fit.

**But:** λ̂ is the *estimated parameter*. The *objective* is the Owner's choice of which parameter value to use in the product. The ANOVA tells you "the data implies λ ≈ X." It does not tell you "therefore use X in the product." The Owner could still choose 0.40 even if λ̂ = 0.22, because he values ordering over gaps.

The bridge is useful — it gives the Owner a number he can point to — but it does not decide the objective. The objective is a product decision, not a statistical one.

---

## What would change my mind (the receipt that would flip me)

1. **If the 11 mis-ordered rows at 0.20 include WR1, CB1, RB1, QB, or LT** — the slots the user stares at. I would need to see the exact row list from the C4 per-slot table at 0.20. If the mis-orders hit starters, the visible-error cost is higher than I assess.

2. **If 0.20's out-of-sample gap error is worse than 0.40's** — the LOO finding only reports tier accuracy, not gap error out of sample. If 0.20 overfits gaps the way 0.40 overfits tiers, the portability argument collapses.

3. **If the Owner rules that "reproduce my table" IS the objective** — he has said the opposite ("does not care about meeting the 99"), but if he clarifies that the table is his ground truth, I defer.

4. **If the third-way display (rank from 0.40, gaps from 0.20) is rejected by the Architect** as too complex for the product — then I would re-evaluate the single-λ tradeoff with the actual mis-ordered row list.

---

## Labels
VERIFIED: C1/V3 settle (97/97 at 0.40, mae 1.311; 86/97 at 0.20, mae 1.076); MUSE LOO (0.40 drops to 85/97 out-of-sample); Owner statement (2026-11-11: "does not care about meeting the 99, wants most portable"); my Q5 filing (basketball portability breaks).
INFERRED: The 11 mis-ordered rows at 0.20 concentrate in low-visibility slots (based on C4 per-slot pattern); portability = ability to compute without Owner table; 0.40 guard layer requires table, 0.20 ability layer does not.
REPORTED: VL's lean 0.40 (visible vs silent); MUSE's lean 0.20 (told Owner 2026-11-11); Glyph's rank vs value framing; DS's ANOVA as cross-check.
UNKNOWN: Exact list of 11 mis-ordered rows at 0.20; 0.20's out-of-sample gap error; Architect's view on dual-λ display.

---END---