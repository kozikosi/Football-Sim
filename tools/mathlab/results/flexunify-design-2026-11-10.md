# flexunify: one operator for flex prices (Architect design from the Owner's Q&A, 10 Nov 2026)

Design plus read-only prototype `tools/mathlab/flexunify.mjs` (profiles `flexunify-profiles.json`, run output `results/flexunify-2026-11-10.md`). No engine, `flex.json` or `flex.ts` change; no test suite run. Duty tables are Z.ai's ZAI-D1 Appendix A plus the Owner's three score changes; I authored none.

## 1. Shape

`price(src>dst) = || ( s·W_d·max(0, need_dst[d] − have_src[d]) for each loaded duty d , G(src,dst) ) ||_k`

- `G = 20·(1 − v_src/v_dst)` when v_dst > v_src, else 0. `v` is the engine-measured marginal value of the slot (bump the slot's OVR by 1 in the sim, record the change in win probability). 20 is the star convention. Owner supplies no weights for any sport: the sim is the oracle.
- The guard is **one more coordinate** of the same soft-max as the duty gaps. `k=1` adds constraints, `k=∞` takes the worst. One operator, one dial (Q7). No gate, floor, exception or pair table.
- Because the guard is a coordinate, every price is ≥ G for any k: centre-out arbitrage is impossible by construction.

## 2. Evidence (97 Owner rules, same-role rows excluded)

| model | mean error (OVR) | Spearman | exact tiers 0/2/6/12 | held-out |
|---|---|---|---|---|
| ZAI-D1, 3 score changes (no guard) | 1.34 | 0.931 | 96/97 | UNMEASURED |
| ZAI-D1 ability, max(L, G) | 1.53 | 0.897 | 94/97 | UNMEASURED |
| **flexunify** (p-norm duties + G; fit k=∞, s=1.2) | 1.38 | 0.876 | 84/97 | leave-one-role-out 1.44 error, 168/194 exact |
| flexunify-self (no NEED table, single vector) | 2.28 | 0.669 | 66/97 | LORO 2.43, 125/194 |

- **VERIFIED (ran it):** flexunify does not beat ZAI-D1 on fit. It is fit to continuous error, not to tier cuts, so exact-tier counts understate it; its in-sample to held-out gap is 0.06 OVR (two constants).
- **VERIFIED:** k is weakly identified: error 1.50 at k=3, 1.38 at k=∞, 2.80 at k=1. Adding the constraints (k=1) is clearly worse; "worst binds" is data-preferred. Expose the dial, default ∞.
- Dial with ZAI-D1 ability unchanged, `||(L, a·G)||_q`: q=∞, a=1 gives 94/97 with 0 centre arbitrage rows; a≤0.75 leaves 4. Partial guards do not protect the centre; it is all or nothing under max.

## 3. Hard points

**Centre diagnostic (VERIFIED arithmetic, not the sim).** Ability-only ZAI-D1 under-prices every centre-out move that goes up the value ladder: C>OT 6.7 vs guard 12.0, C>DT 9.1 vs 12.0, C>OG 5.1 vs 10.0, C>EDGE 12.0 vs 13.8. That is the Owner's feared exploit (4 rows; 38 of 306 pairs in total, most of them FB/K/P sources). flexunify has 0. **UNKNOWN:** whether sim centres actually flex out; that needs the engine run, which I did not do.
**Cost I am not hiding:** the guard prices C>OG at 10 (Owner 6), and FB>RB and FB>TE at 18 (Owner 2 and 6). These three are exactly the rows where the Owner's table sits below the guard. Largest disagreements are the same set plus EDGE>SS (12 vs 6.0) and RB>SS (12 vs 8.4). The FB rows are an artefact of v_FB = 25 (snap-weighted, not quality-weighted); I would rather the Owner rule on them than add a waiver.

**Gravity.** It belongs in `v`, not in the price. If the engine credits double-team effects (a WR1 lifting teammates, a rim protector deterring shots), the measured marginal value of that slot includes them, and the guard and any future re-weighting follow automatically. Example: v_OT +10% moves C>OT's guard from 12.0 to 12.7. No separate gravity term; one input. I did not build or measure gravity (**UNKNOWN**). The exit premium (value lost at the old slot) I reject, as the Owner suggested: it is a hub-specific patch and the guard already covers the C>OT case.

**Dual positions.** Holdings H; price to play role t = min over h∈H of price(h>t); own positions are 0. Demo for {CB, WR}: WR 0, CB 0, NICKEL 0.8, FS 1.0, RB 4.3. No new rule.

**Emergence.** A slot is a demand mix of existing roles' needs. DL5 blitzer (0.7 EDGE + 0.3 DT): EDGE 0.0, DT 3.0, OG 4.8, OLB 8.0, ILB 8.6, with no DL5 rule. Big nickel (0.5 SS + 0.3 OLB + 0.2 CB): SS 0.4, CB 0.4, FS 1.7, TE 4.0, OLB 4.6, WR 4.6. **Caveat:** the mix coefficients are mine and arbitrary. True emergence needs the slot's demand read from the formation in the sim (which duties its snaps load), not authored; not done.

**Which flexes exist (Q15, mostly b).** Prices do not separate allowed from forbidden (allowed iff price < 8: 72.5% vs 68.3% for "all forbidden"). A formula-native rule does: forbidden iff the source has under half of the destination's core duty (argmax of W·need): 84.0% right over 306 pairs, one constant, 81.7% at 0.6 and 80.1% at 0.3. In-sample, not cross-validated, 16% wrong; authored allow-list remains the safer product call.

**Displayed integers (Follow-up 2).** Natural output on the Owner's 97 rules rounds to 0–14, with two 18s (FB). Over all 306 pairs it runs to 19–20, which is the forbidden zone. Spread is smooth, no clustering at 0/2/6/12; the scale and cap decision is the Owner's after seeing it.

## 4. What I considered and rejected
- **No NEED table (single vector, duty importance = own level):** 66/97, LORO error 2.43. NEED carries real information (which duties a job loads). Q12's "no pairs" is only half met: NEED and HAVE are per-role, but C's NEED PBLK 8 vs HAVE 6 remains. Deriving NEED from the sim's duty usage is the way out; untested.
- **Adding constraints (k=1), partial guard, gates, cross-side floor (not added; unchecked whether cross-side prices all clear 6), attribute-based (OR), exit premium:** see above and the Q&A.

## 5. What the Q&A points to, vs my merged design
It points to less authored content, not a better fit: v from the sim (zero Owner weights), duty tables authored once and later read from sim usage, one operator with one dial, prohibition from core-duty absence, dual as min-over-holdings. Where I changed course: I now reuse Z.ai's duty tables rather than my own soft-max over a 12-duty list, because the fit gap is large and the tables are the Owner's football reasoning.

## 6. Next (needs the Owner)
1. Rule on the three below-guard rows (C>OG, FB>RB, FB>TE): accept guard prices, or measure v_FB by quality instead of snaps.
2. Leave-one-role-out on ZAI-D1's tables (its held-out fit is the missing comparison).
3. Engine run of the centre diagnostic, once building is allowed.
