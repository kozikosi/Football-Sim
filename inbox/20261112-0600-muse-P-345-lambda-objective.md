SPEAKER: muse | ROLE: council advisor (MUSE seat) | TASK: λ objective — 0.20 or 0.40 | DATE: 2026-11-12T06:00:00Z
FOR: P-345

# MUSE — λ objective: 0.40, weak lean (the error direction decides it)

**Position in one sentence: 0.40, weak lean — because at 0.20 every miss is an
under-price (too cheap, the exploit direction), including a ruled row, while at 0.40
the only miss is λ-invariant and already fixed by V3.**

This filing moves my position. I told the Owner on 2026-11-11 that I lean 0.20
(portability + out-of-sample robustness). I ran the numbers this round — VL's
draft-board receipt (Q1), the V3 third-way test (Q3), and DS's ANOVA inputs (Q4) —
and two of the three moved me. The portability argument for 0.20 does not survive
(Q2: λ is a per-sport fitted dial, so the in-sample fit to football's 99 does not
bind basketball). The error-direction finding is new and is the deciding factor.
The lean is weak: the counterweight (mean error, LOO, the knife-edge tier cuts) is
real, and §5 says what would flip me.

## Method (so any seat can reproduce this)

Form: V2 merged exposure guard, `max(M + λ·S, E·G)`, weights W_MEAS (measured
localWins20). Module: Z.ai's `merge_prototype.py` + the Owner's 99-rule table
`flex-99-live.json`, both from `origin/council/glyph`
(`_agents/glyph/deliveries/z-phase2-v2/corrections/merge-ledger-followups-2026-11-11/`,
commit `f262061c`). The v3 copy on `origin/council/or`
(`zai-phase2-v3-copy/corrections/merge-ledger-followups-2026-11-11/`) is
byte-identical — diffed this session. Scripts + README in
`_agents/muse/deliveries/p345-lambda-objective-2026-11-11/` (this filing's
`lam_objective_analysis.py` and `anova_verify.py`).

**Reproduction note (honest):** my re-run reproduces C1's exact/off1 counts
exactly (λ=0.20: 86/11; λ=0.40: 96/1) but my mae is 0.08 higher than C1's
reported mae at both λ (mine 1.157 / 1.375; C1 1.076 / 1.311). The E mode
(slotweighted vs simple) does not explain it (identical to 3 decimals). The
likely cause is that C1's tier checks use per-season E while I use the staged E —
that changes guard-dominated rows only, and it changes no tier and no conclusion.
I report my numbers below and flag the 0.08 wherever mae is cited.

## Q1 — Which error costs the user more? (VL's receipt, RUN)

**The flips (VERIFIED — run this session, V2, staged E).** 10 rows change tier
between λ=0.20 and λ=0.40:

| Row | Owner | λ=0.20 (price → tier) | λ=0.40 (price → tier) | Dest. value (localWins20) |
|---|---|---|---|---|
| RB>WR | 12 | 8.54 → 6 | 9.28 → 12 | 1.607 |
| TE>WR | 12 | 8.42 → 6 | 9.04 → 12 | 1.607 |
| TE>DT | 12 | 8.52 → 6 | 9.84 → 12 | 1.316 |
| SS>FS | 2 | 0.94 → 0 | 1.08 → 2 | 0.789 |
| EDGE>SS | 12 | 7.24 → 6 | 9.48 → 12 | 0.789 |
| FB>TE | 6 | 3.92 → 2 | 4.74 → 6 | 0.618 |
| SS>RB | 12 | 8.20 → 6 | 9.20 → 12 | 0.613 |
| WR>NICKEL | 6 | 3.22 → 2 | 4.04 → 6 | 0.261 |
| OLB>NICKEL | 6 | 3.86 → 2 | 4.72 → 6 | 0.261 |
| OLB>DIME | 12 | 8.82 → 6 | 10.14 → 12 | 0.131 |

**Three findings, all VERIFIED:**

1. **The 0.20 errors are NOT in the weeds.** 7 of the 10 flips are into
   high-value destinations (localWins20 ≥ 0.6): WR (1.607), DT (1.316), FS/SS
   (0.789), TE (0.618), RB (0.613). Only 3 are into low-value destinations
   (NICKEL 0.261, DIME 0.131). This strengthens VL's case more than I expected:
   a user moving an RB to WR1 and being charged −6 when the Owner says −12 is
   a visible error on a move the user actually tries, not a DIME-slot curiosity.
2. **The direction is systematic, and it is the dangerous one.** At λ=0.20, all
   10 misses are under-priced (too cheap) by one tier, plus C>OG over-priced.
   At λ=0.40, zero under-priced, one over-priced (C>OG). A flex price is a cost
   the user pays: under-pricing lets a player into a high-value slot at a
   discount — that is the exploit direction, and the centre exploit was the
   founding defect this whole derivation exists to prevent. Over-pricing errs
   safe (it deters a move the Owner would allow); under-pricing errs toward
   exploits. The Owner's flex price is a "fun tax that stings" — under-pricing
   fails to sting.
3. **A ruled row is violated at 0.20.** FB>TE (Owner ruling: 6, scarcity not
   guard) is tier 2 at λ=0.20 (price 3.92) and tier 6 at λ=0.40 (price 4.74).
   FB>RB is tier 2 at both (correct). C>OG is tier 12 at both (price 12.50,
   guard-dominated) — λ-invariant, so it does not discriminate between the
   objectives; it is a guard problem, fixed by V3 (below), not by λ. C>OT and
   C>DT are tier 12 at both (correct, guard-dominated).

**Two corrections to the framing (VERIFIED, and they matter):**

- **OR's mechanism is backwards.** OR's Q3 filing says at 0.40 the guard
  dominates and clips the ability signal, and at 0.20 the ability layer
  dominates. The numbers say the opposite: the guard dominates on **9/97 rows
  at λ=0.20 and 7/97 at λ=0.40** — the guard binds on *fewer* rows at 0.40,
  because the ability layer is larger there. And **all 10 flips are
  ability-dominated at both λ** (dom20 = ability, dom40 = ability on every
  flip row). The tradeoff is inside the ability layer (M + λS) — how much the
  accumulation S counts — not between the layers. The guard is irrelevant to
  this tradeoff. OR's conclusion (the objective is a display choice) stands;
  his mechanism does not.
- **VL's "slot ordering" framing is loose, but his substantive point survives.**
  The slot ranking itself (by localWins20) is λ-independent — λ does not reorder
  slots on the draft board. What λ changes is the flex-price tier on every move,
  which is what the user sees when they move a player and which feeds the value
  of flexible players. VL's precise claim should be "0.40 reproduces the
  Owner's flex-price tiers exactly," not "0.40 orders the slots exactly." But
  his substantive point — the errors are visible — is supported by finding 1
  above (7/10 flips into high-value destinations).

**The counterweight (VERIFIED — do not ignore it).** The tier-count difference
overstates the price difference: the flip rows differ by only ~0.7–2.2 OVR
between the two objectives, and they straddle the 9-cut for tier 12 (at 0.20
they sit at 7.24–8.82, at 0.40 at 9.04–10.14). So 0.40's tier win is partly a
knife-edge effect — the underlying prices are close. And 0.40's gap error is
real and concentrated: the worst rows at 0.40 are TE>EDGE (+5.92, ability),
QB>FS (+5.08, ability), RB>FS (+3.72, ability) — all ability-dominated
overshoots into FS/EDGE, all much closer at 0.20 (+2.96, +1.04, +0.36). The
mae gap (1.375 vs 1.157) is driven by a few overshoot rows, not by a uniform
sloppiness. And the LOO finding stands: out of sample, 0.40 drops to 85/97
exact — the in-sample 96/97 is partly overfitting.

## Q2 — Does portability favour one? (INFERRED — and a correction to my own lean)

**No. Portability does not favour either objective, and I was wrong to lean on it
for 0.20.** λ is a fitted dial: it would be re-fit for basketball from
basketball's outcomes, on basketball's ruler. The in-sample fit to football's 99
does not bind basketball either way. The portability breaks are in the formula's
*structure* — OR's Q5 filing (three breaks: positions→roles, duties overlap,
exposure→minutes share) — and those breaks are identical at λ=0.20 and λ=0.40,
because they are about the duty matrix and the exposure definition, not about
the weight on the accumulation. The question "which λ ports better" is the wrong
question; the right one is "does the *shape* (max of ability and guard) port,"
and that is OR's Q5 territory, not λ's. I withdraw the portability leg of my
0.20 lean. (The out-of-sample leg — LOO — survives: it is about the formula on
unseen *roles*, which is the closest analogue we have to unseen sports, and
there 0.20 holds up better. But it is weaker than I presented it: LOO holds out
roles, not sports.)

## Q3 — Is there a third way? (VERIFIED for (a); INFERRED for (b)–(d))

**(a) V3's per-slot min-collapse: TESTED, does not dissolve the tradeoff.**
V3 at λ=0.40: **97/97 exact, mae 1.301, zero misses** (confirms the reported
V3). V3 at λ=0.20: **87/97 exact, mae 1.078, the same 10 under-priced rows**
(the off1 list is identical to V2's 10 flips). V3 buys exactly one row — C>OG
(price 7.49, tier 6 at both λ, per-slot OG1 12.50 / OG2 7.49) — and the 10
ability-layer flips remain untouched, because the tradeoff is inside the
ability layer and no guard change touches it. So V3 + 0.40 is the best
combination on tiers (97/97), and V3 + 0.20 is the best on gaps (mae 1.078),
and the choice between them is the same choice as before, one row narrower.

**(b) A different combination than max: NOT TESTED, but the mechanism says it
cannot dissolve the tradeoff.** The flips are ability-dominated at both λ, so
changing how the guard combines (blend, sum with a cap) moves only the 7–9
guard-dominated rows, not the 10 flips. A blend would have to change the
*ability* layer itself to move the flips — which is a different formula, not a
different combination.

**(c) A display that shows both (rank from 0.40, gaps from 0.20): NOT TESTED,
and it is a display change, not a formula change.** It is the one third way I
did not test, and it is genuinely available — but it conflicts with the Owner's
"simple integers" bound (the user sees one price, not two), so it is the
Owner's call as a display decision, not something the council can adopt by
fitting. If the Owner wants it, the filing should say so explicitly.

**(d) A λ that varies by role family: REJECTED on principle, not tested.**
A per-role λ would trivially buy both (set λ=0.40 on the flip rows, 0.20
elsewhere) — but it is a lookup table, not a formula, and it violates the
Owner's "one unified model, no named exceptions" bound. Do not pursue it.

## Q4 — Does the ANOVA bridge settle anything? (VERIFIED inputs; the test is not well-formed)

**DS's ANOVA inputs reproduce EXACTLY (VERIFIED — re-run this session on the
P-344 file, `team_game_summary_2016-2025.csv`, 5,522 team-games, 320
team-seasons, points season-demeaned):** Var(team-season mean points) = **16.955**
(DS: 16.955); mean within-team game variance = **87.148** (DS: 87.148); n̄ = 17.26
(DS: 17.26); between-team variance (signal) = **11.905** (SD 3.45) (DS: 11.905,
3.45). The inputs are solid.

**Two corrections to DS's ratios (VERIFIED — same re-run):**

- The team-season overstatement: DS says ×1.193 (+19.3%). That is the **SD
  ratio** — sqrt(16.955/11.905) = 1.193, i.e. the raw team-mean SD (4.118)
  over the signal SD (3.45). The **variance** ratio is 1.424 (+42.4%).
  Since λ scales the SD (points spread scales linearly with λ), the
  λ-relevant bias is +19.3% — DS's number is correct when read as an SD ratio,
  and the filing should say so explicitly (it does not). Cite +19.3% (SD), not
  +42.4% (variance), for λ's bias.
- The game-level number is **not pinned**: DS's filing gives ×2.71 (headline)
  and ×2.82 (table), and his commit message gives +18.4%/×2.82. My clean
  recomputation gives **×2.89 in SD terms** (sqrt(99.350/11.905), total game
  variance 99.350 over signal 11.905). DS's ×2.71 is sqrt(87.148/11.905) — it
  uses the *within* variance instead of the *total* game variance, which
  understates it. I cannot reproduce ×2.82 from any clean definition. Cite the
  team-season figure (+19.3%), not the game-level one, until it is re-derived.
  (The Z.ai v3 follow-up prompt already asks Z.ai to recompute the C2 field —
  this adds that the game-level figure needs the same treatment.)

**The structural point (INFERRED, from DS §1 — and it is the answer to Q4):**
the ANOVA estimates **one** λ̂ — the level, from the between-team variance
component (λ̂² = signal / Var(g)). OR's proposed test — "if λ̂_40 ≈ 0.40 and
λ̂_20 ≈ 0.20, the bridge holds" — is **not well-formed**: there is no λ̂_40 and
no λ̂_20. The ANOVA does not produce a λ̂ per objective, because the objectives
are two *uses* of the same β (two display/steepness choices), not two
estimates. DS says it explicitly (§1): the 0.40-vs-0.20 question "is a
display/steepness choice, not an identification question," and "pick the scale
that makes the *board* describe what the *engine* does, and say so — do not fit
it." So the ANOVA bridge does not settle the objective; it settles the *level*
(β), and the objective is a separate choice about how to use it. What the ANOVA
still needs: Var(g) — the variance of the team's slot-wins advantage — which I
did not compute (it needs the pool + the slotWinsPerOvr ruler + the team
rosters). That is a concrete next step for Z.ai or the council, not something I
will fake. Until Var(g) is computed, λ̂ itself is not yet a number — only the
signal (11.905 points²) is.

## What would change my mind

1. **A LOO direction analysis.** My deciding factor is the *direction* of
   0.20's errors (all under-priced, in-sample). If someone runs the
   leave-one-role-out fit and shows that 0.40 *also* under-prices out of
   sample — i.e. the under-pricing is not a 0.20-specific property but a
   property of the ability layer at any λ — then the direction argument
   collapses and I would move back to 0.20 on the mae + LOO grounds.
2. **A third way that beats both on both metrics.** If a shape (not a display
   change, not a per-role λ) gets ≥96/97 exact *and* mae ≤1.10, the question
   goes away and I would take the shape over either λ. V3 does not do it
   (87/97 at 0.20). A blend that changes the ability layer itself would have
   to show its numbers.
3. **The Owner saying gap accuracy matters more than tier exactness.** The
   objective is his call. If he says the trade screen matters more than the
   draft board — i.e. he would rather have gaps right and tiers occasionally
   off — then 0.20 is the answer and my direction argument is moot, because
   the product judgment would have been made by the person who makes it.

## Labels

VERIFIED: the 10 flip rows and their prices/tiers at both λ; the 7-high/3-low
split; the under-pricing direction at 0.20 (10 under, 1 over) vs 0.40 (0 under,
1 over); the guard-domination counts (9/97 at 0.20, 7/97 at 0.40); all 10 flips
ability-dominated at both λ; FB>TE tier 2 at 0.20 / tier 6 at 0.40; C>OG tier 12
at both; V3 97/97 (mae 1.301) at 0.40 and 87/97 (mae 1.078) at 0.20; DS's ANOVA
inputs (16.955, 87.148, 11.905, SD 3.45) reproduced exactly; the SD ratio
1.193 and the variance ratio 1.424; the game-level recomputation ×2.89.
REPORTED: C1's mae (1.076 / 1.311) and the LOO finding (0.40 → 85/97 out of
sample; guard damages FB/RB 0.34 → 2.63) — both from the cited filings, not
re-run here. INFERRED: the exploit-direction argument; the portability
correction; the rejection of a per-role λ on principle; the claim that the
ANOVA cannot settle the objective (from DS §1's structure). UNKNOWN: Var(g)
(the ANOVA level λ̂ itself); whether 0.40 under-prices out of sample (see
"what would change my mind" #1); the 0.08 mae gap between my re-run and C1's
reported mae (likely per-season vs staged E — changes no tier).
